"""
Assessment routes — quizzes, student assignments, and faculty grading.
"""

from __future__ import annotations

from uuid import UUID

from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.dependencies import get_current_active_user, require_role
from app.db.session import get_db
from app.models.user import User
from app.schemas.assessment import (
    AssignmentGradeRequest,
    AssignmentSubmissionRead,
    AssignmentSubmitRequest,
    QuizClientResponse,
    QuizSubmitRequest,
    QuizSubmitResponse,
)
from app.services.assessment_service import AssessmentService

router = APIRouter()


@router.get(
    "/enrollments/{enrollment_id}/lessons/{lesson_id}/quiz",
    response_model=QuizClientResponse,
    status_code=200,
)
async def get_quiz(
    enrollment_id: UUID,
    lesson_id: UUID,
    user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db),
):
    """Retrieve quiz questions for a lesson with correct answers stripped out."""
    svc = AssessmentService(db)
    return await svc.get_sanitized_quiz(enrollment_id, lesson_id, user.id)


@router.post(
    "/enrollments/{enrollment_id}/lessons/{lesson_id}/quiz/submit",
    response_model=QuizSubmitResponse,
    status_code=200,
)
async def submit_quiz(
    enrollment_id: UUID,
    lesson_id: UUID,
    payload: QuizSubmitRequest,
    user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db),
):
    """Submit quiz answers for server-side evaluation and progress update."""
    svc = AssessmentService(db)
    return await svc.evaluate_quiz(enrollment_id, lesson_id, user.id, payload)


@router.post(
    "/enrollments/{enrollment_id}/lessons/{lesson_id}/assignment",
    response_model=AssignmentSubmissionRead,
    status_code=200,
)
async def submit_assignment(
    enrollment_id: UUID,
    lesson_id: UUID,
    payload: AssignmentSubmitRequest,
    user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db),
):
    """Submit project or capstone assignment for instructor review."""
    svc = AssessmentService(db)
    return await svc.submit_assignment(enrollment_id, lesson_id, user.id, payload)


@router.get(
    "/enrollments/{enrollment_id}/lessons/{lesson_id}/assignment",
    response_model=AssignmentSubmissionRead | None,
    status_code=200,
)
async def get_assignment(
    enrollment_id: UUID,
    lesson_id: UUID,
    user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db),
):
    """Get the current student's assignment submission status and grade."""
    svc = AssessmentService(db)
    return await svc.get_assignment_submission(enrollment_id, lesson_id, user.id)


@router.get(
    "/submissions",
    response_model=list[AssignmentSubmissionRead],
    status_code=200,
    dependencies=[Depends(require_role("instructor", "admin"))],
)
@router.get(
    "/assessments/submissions",
    response_model=list[AssignmentSubmissionRead],
    status_code=200,
    dependencies=[Depends(require_role("instructor", "admin"))],
)
async def list_submissions(
    status: str | None = Query(None),
    course_id: UUID | None = Query(None),
    db: AsyncSession = Depends(get_db),
):
    """Faculty / Admin: list assignment submissions queued for evaluation."""
    svc = AssessmentService(db)
    return await svc.list_submissions(status=status, course_id=course_id)


@router.post(
    "/submissions/{submission_id}/grade",
    response_model=AssignmentSubmissionRead,
    status_code=200,
    dependencies=[Depends(require_role("instructor", "admin"))],
)
@router.post(
    "/assessments/submissions/{submission_id}/grade",
    response_model=AssignmentSubmissionRead,
    status_code=200,
    dependencies=[Depends(require_role("instructor", "admin"))],
)
async def grade_submission(
    submission_id: UUID,
    payload: AssignmentGradeRequest,
    user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db),
):
    """Faculty / Admin: evaluate and grade a student's assignment submission."""
    svc = AssessmentService(db)
    return await svc.grade_submission(submission_id, user.id, payload)
