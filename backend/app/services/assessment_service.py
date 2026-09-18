"""
Assessment service : handles quiz grading, assignment submissions, and instructor grading.
"""

from __future__ import annotations

import json
from datetime import datetime, timezone
from uuid import UUID

from sqlalchemy import desc, select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.core.exceptions import BadRequestError, ForbiddenError, NotFoundError
from app.models.assessment import AssignmentSubmission, QuizAttempt, SubmissionStatus
from app.models.course import Course, Lesson, Module
from app.models.enrollment import Enrollment, EnrollmentStatus, ProgressStatus
from app.models.user import User
from app.schemas.assessment import (
    AssignmentGradeRequest,
    AssignmentSubmissionRead,
    AssignmentSubmitRequest,
    QuizClientResponse,
    QuizQuestionClient,
    QuizQuestionResult,
    QuizSubmitRequest,
    QuizSubmitResponse,
)


class AssessmentService:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_sanitized_quiz(self, enrollment_id: UUID, lesson_id: UUID, user_id: UUID) -> QuizClientResponse:
        """Retrieve quiz questions for a lesson with correct answers stripped out."""
        # Verify enrollment and ownership
        enroll_stmt = select(Enrollment).where(Enrollment.id == enrollment_id)
        enrollment = (await self.db.execute(enroll_stmt)).scalar_one_or_none()
        if not enrollment:
            raise NotFoundError(resource="Enrollment")
        if enrollment.user_id != user_id:
            raise ForbiddenError(message="Access denied to this enrollment.")

        # Verify lesson
        lesson_stmt = select(Lesson).where(Lesson.id == lesson_id)
        lesson = (await self.db.execute(lesson_stmt)).scalar_one_or_none()
        if not lesson:
            raise NotFoundError(resource="Lesson")

        if lesson.content_type != "quiz":
            raise BadRequestError(message="Requested lesson is not a quiz assessment.")

        questions: list[QuizQuestionClient] = []
        try:
            raw = json.loads(lesson.content_body or "[]")
            raw_list = raw if isinstance(raw, list) else raw.get("questions", []) if isinstance(raw, dict) else []
            for idx, q in enumerate(raw_list):
                if isinstance(q, dict) and "question" in q and "options" in q:
                    questions.append(
                        QuizQuestionClient(
                            index=idx,
                            question=q["question"],
                            options=q.get("options", []),
                        )
                    )
        except Exception:
            questions = []

        return QuizClientResponse(
            lesson_id=lesson.id,
            title=lesson.title,
            passing_score=70,
            questions=questions,
        )

    async def evaluate_quiz(
        self,
        enrollment_id: UUID,
        lesson_id: UUID,
        user_id: UUID,
        payload: QuizSubmitRequest,
    ) -> QuizSubmitResponse:
        """Evaluate student answers server-side, record attempt, and update progress if passed."""
        enroll_stmt = select(Enrollment).where(Enrollment.id == enrollment_id)
        enrollment = (await self.db.execute(enroll_stmt)).scalar_one_or_none()
        if not enrollment:
            raise NotFoundError(resource="Enrollment")
        if enrollment.user_id != user_id:
            raise ForbiddenError(message="Access denied to this enrollment.")

        lesson_stmt = select(Lesson).where(Lesson.id == lesson_id)
        lesson = (await self.db.execute(lesson_stmt)).scalar_one_or_none()
        if not lesson:
            raise NotFoundError(resource="Lesson")

        if lesson.content_type != "quiz":
            raise BadRequestError(message="Requested lesson is not a quiz assessment.")

        raw_questions: list[dict] = []
        try:
            raw = json.loads(lesson.content_body or "[]")
            raw_questions = raw if isinstance(raw, list) else raw.get("questions", []) if isinstance(raw, dict) else []
        except Exception:
            raw_questions = []

        if not raw_questions:
            raise BadRequestError(message="Quiz questions are not configured for this lesson.")

        total_questions = len(raw_questions)
        correct_count = 0
        results: list[QuizQuestionResult] = []

        for idx, q in enumerate(raw_questions):
            target_ans = q.get("answer") if "answer" in q else q.get("answer_index", 0)
            selected_ans = payload.answers.get(idx)
            is_correct = selected_ans is not None and selected_ans == target_ans

            if is_correct:
                correct_count += 1

            results.append(
                QuizQuestionResult(
                    index=idx,
                    question=q.get("question", f"Question {idx + 1}"),
                    selected_index=selected_ans,
                    correct_index=target_ans,
                    is_correct=is_correct,
                    explanation=q.get("explanation"),
                )
            )

        score = round((correct_count / total_questions) * 100, 1)
        passed = score >= 70.0

        # Record attempt
        attempt = QuizAttempt(
            user_id=user_id,
            enrollment_id=enrollment_id,
            lesson_id=lesson_id,
            score=score,
            passed=passed,
            answers_json=json.dumps(payload.answers),
        )
        self.db.add(attempt)

        # If student passed, update lesson progress to COMPLETED
        if passed:
            from app.services.enrollment_service import EnrollmentService
            enroll_svc = EnrollmentService(self.db)
            await enroll_svc.update_progress(
                enrollment_id=enrollment_id,
                lesson_id=lesson_id,
                status=ProgressStatus.COMPLETED,
                bypass_assessment_check=True,
            )

        await self.db.commit()

        return QuizSubmitResponse(
            score=score,
            passed=passed,
            passing_score=70,
            results=results,
        )

    async def submit_assignment(
        self,
        enrollment_id: UUID,
        lesson_id: UUID,
        user_id: UUID,
        payload: AssignmentSubmitRequest,
    ) -> AssignmentSubmissionRead:
        """Submit or resubmit a project/capstone assignment."""
        enroll_stmt = select(Enrollment).where(Enrollment.id == enrollment_id)
        enrollment = (await self.db.execute(enroll_stmt)).scalar_one_or_none()
        if not enrollment:
            raise NotFoundError(resource="Enrollment")
        if enrollment.user_id != user_id:
            raise ForbiddenError(message="Access denied to this enrollment.")

        lesson_stmt = select(Lesson).where(Lesson.id == lesson_id)
        lesson = (await self.db.execute(lesson_stmt)).scalar_one_or_none()
        if not lesson:
            raise NotFoundError(resource="Lesson")

        if lesson.content_type != "assignment":
            raise BadRequestError(message="Requested lesson is not an assignment.")

        # Check existing submission
        sub_stmt = select(AssignmentSubmission).where(
            AssignmentSubmission.enrollment_id == enrollment_id,
            AssignmentSubmission.lesson_id == lesson_id,
        )
        existing = (await self.db.execute(sub_stmt)).scalar_one_or_none()

        now = datetime.now(timezone.utc)
        if existing:
            existing.submission_url = payload.submission_url.strip()
            existing.notes = payload.notes.strip() if payload.notes else None
            existing.status = SubmissionStatus.SUBMITTED
            existing.submitted_at = now
            sub = existing
        else:
            sub = AssignmentSubmission(
                user_id=user_id,
                enrollment_id=enrollment_id,
                lesson_id=lesson_id,
                submission_url=payload.submission_url.strip(),
                notes=payload.notes.strip() if payload.notes else None,
                status=SubmissionStatus.SUBMITTED,
                submitted_at=now,
            )
            self.db.add(sub)

        await self.db.commit()
        await self.db.refresh(sub)

        return AssignmentSubmissionRead(
            id=sub.id,
            user_id=sub.user_id,
            enrollment_id=sub.enrollment_id,
            lesson_id=sub.lesson_id,
            lesson_title=lesson.title,
            submission_url=sub.submission_url,
            notes=sub.notes,
            status=sub.status.value,
            score=sub.score,
            grade=sub.grade,
            feedback=sub.feedback,
            graded_at=sub.graded_at,
            submitted_at=sub.submitted_at,
        )

    async def get_assignment_submission(
        self,
        enrollment_id: UUID,
        lesson_id: UUID,
        user_id: UUID,
    ) -> AssignmentSubmissionRead | None:
        """Get student's submission status for a specific assignment lesson."""
        enroll_stmt = select(Enrollment).where(Enrollment.id == enrollment_id)
        enrollment = (await self.db.execute(enroll_stmt)).scalar_one_or_none()
        if not enrollment:
            raise NotFoundError(resource="Enrollment")
        if enrollment.user_id != user_id:
            raise ForbiddenError(message="Access denied to this enrollment.")

        lesson_stmt = select(Lesson).where(Lesson.id == lesson_id)
        lesson = (await self.db.execute(lesson_stmt)).scalar_one_or_none()
        if not lesson:
            raise NotFoundError(resource="Lesson")

        sub_stmt = select(AssignmentSubmission).where(
            AssignmentSubmission.enrollment_id == enrollment_id,
            AssignmentSubmission.lesson_id == lesson_id,
        )
        sub = (await self.db.execute(sub_stmt)).scalar_one_or_none()
        if not sub:
            return None

        return AssignmentSubmissionRead(
            id=sub.id,
            user_id=sub.user_id,
            enrollment_id=sub.enrollment_id,
            lesson_id=sub.lesson_id,
            lesson_title=lesson.title,
            submission_url=sub.submission_url,
            notes=sub.notes,
            status=sub.status.value,
            score=sub.score,
            grade=sub.grade,
            feedback=sub.feedback,
            graded_at=sub.graded_at,
            submitted_at=sub.submitted_at,
        )

    async def list_submissions(
        self,
        status: str | None = None,
        course_id: UUID | None = None,
    ) -> list[AssignmentSubmissionRead]:
        """Instructor / Admin queue: list submissions with student and course metadata."""
        stmt = (
            select(
                AssignmentSubmission,
                User.full_name.label("user_name"),
                User.email.label("user_email"),
                Lesson.title.label("lesson_title"),
                Course.title.label("course_title"),
            )
            .join(User, AssignmentSubmission.user_id == User.id)
            .join(Lesson, AssignmentSubmission.lesson_id == Lesson.id)
            .join(Enrollment, AssignmentSubmission.enrollment_id == Enrollment.id)
            .join(Course, Enrollment.course_id == Course.id)
            .order_by(desc(AssignmentSubmission.submitted_at))
        )

        if status:
            stmt = stmt.where(AssignmentSubmission.status == status)
        if course_id:
            stmt = stmt.where(Enrollment.course_id == course_id)

        rows = (await self.db.execute(stmt)).all()
        result: list[AssignmentSubmissionRead] = []
        for sub, u_name, u_email, l_title, c_title in rows:
            result.append(
                AssignmentSubmissionRead(
                    id=sub.id,
                    user_id=sub.user_id,
                    user_name=u_name,
                    user_email=u_email,
                    enrollment_id=sub.enrollment_id,
                    lesson_id=sub.lesson_id,
                    lesson_title=l_title,
                    course_title=c_title,
                    submission_url=sub.submission_url,
                    notes=sub.notes,
                    status=sub.status.value,
                    score=sub.score,
                    grade=sub.grade,
                    feedback=sub.feedback,
                    graded_at=sub.graded_at,
                    submitted_at=sub.submitted_at,
                )
            )
        return result

    async def grade_submission(
        self,
        submission_id: UUID,
        instructor_id: UUID,
        payload: AssignmentGradeRequest,
    ) -> AssignmentSubmissionRead:
        """Instructor / Admin grades an assignment submission."""
        sub_stmt = (
            select(AssignmentSubmission)
            .where(AssignmentSubmission.id == submission_id)
            .options(
                selectinload(AssignmentSubmission.user),
                selectinload(AssignmentSubmission.lesson),
                selectinload(AssignmentSubmission.enrollment),
            )
        )
        sub = (await self.db.execute(sub_stmt)).scalar_one_or_none()
        if not sub:
            raise NotFoundError(resource="Assignment Submission")

        sub.score = payload.score
        sub.grade = payload.grade.strip()
        sub.feedback = payload.feedback.strip()
        sub.status = SubmissionStatus.GRADED
        sub.graded_by_id = instructor_id
        sub.graded_at = datetime.now(timezone.utc)

        # If passing score awarded (score >= 60), mark lesson as completed
        if payload.score >= 60.0:
            from app.services.enrollment_service import EnrollmentService
            enroll_svc = EnrollmentService(self.db)
            await enroll_svc.update_progress(
                enrollment_id=sub.enrollment_id,
                lesson_id=sub.lesson_id,
                status=ProgressStatus.COMPLETED,
                bypass_assessment_check=True,
            )

        await self.db.commit()
        await self.db.refresh(sub)

        return AssignmentSubmissionRead(
            id=sub.id,
            user_id=sub.user_id,
            user_name=sub.user.full_name if sub.user else None,
            user_email=sub.user.email if sub.user else None,
            enrollment_id=sub.enrollment_id,
            lesson_id=sub.lesson_id,
            lesson_title=sub.lesson.title if sub.lesson else None,
            submission_url=sub.submission_url,
            notes=sub.notes,
            status=sub.status.value,
            score=sub.score,
            grade=sub.grade,
            feedback=sub.feedback,
            graded_at=sub.graded_at,
            submitted_at=sub.submitted_at,
        )
