"""Unit tests for EnrollmentService."""
from __future__ import annotations
import uuid
import pytest
from sqlalchemy.ext.asyncio import AsyncSession
from app.services.enrollment_service import EnrollmentService
from app.models.user import User
from app.models.course import Course, Module, Lesson, CourseLevel, CourseStatus
from app.models.enrollment import EnrollmentStatus
from app.core.exceptions import ConflictError, NotFoundError
from app.core.security import hash_password

@pytest.mark.anyio
async def test_enroll_student_success(db_session: AsyncSession) -> None:
    # 1. Create a user
    user = User(
        email=f"student_{uuid.uuid4().hex[:6]}@academy.dev",
        hashed_password=hash_password("Pass123!"),
        full_name="Enrolled Student",
        is_active=True,
        is_verified=True
    )
    db_session.add(user)
    await db_session.flush()

    # 2. Create a course
    course = Course(
        title="AI Engineering Bootcamp",
        slug=f"ai-bootcamp-{uuid.uuid4().hex[:6]}",
        short_description="Build production AI systems",
        description="Full LLM engineering curriculum",
        price=120.0,
        currency="USD",
        level=CourseLevel.BEGINNER,
        status=CourseStatus.PUBLISHED,
        instructor_id=user.id
    )
    db_session.add(course)
    await db_session.commit()

    # 3. Enroll student
    svc = EnrollmentService(db_session)
    enrollment = await svc.enroll(user_id=user.id, course_id=course.id)
    assert enrollment.id is not None
    assert enrollment.user_id == user.id
    assert enrollment.course_id == course.id
    assert enrollment.status == EnrollmentStatus.ACTIVE

@pytest.mark.anyio
async def test_enroll_student_duplicate_fails(db_session: AsyncSession) -> None:
    user = User(
        email=f"student_dup_{uuid.uuid4().hex[:6]}@academy.dev",
        hashed_password=hash_password("Pass123!"),
        full_name="Duplicate Enrollee",
        is_active=True,
        is_verified=True
    )
    db_session.add(user)
    await db_session.flush()

    course = Course(
        title="Offensive Security Lab",
        slug=f"offsec-lab-{uuid.uuid4().hex[:6]}",
        short_description="Hands-on hacking",
        description="Penetration testing",
        price=99.0,
        currency="USD",
        level=CourseLevel.ADVANCED,
        status=CourseStatus.PUBLISHED,
        instructor_id=user.id
    )
    db_session.add(course)
    await db_session.commit()

    svc = EnrollmentService(db_session)
    await svc.enroll(user_id=user.id, course_id=course.id)

    with pytest.raises(ConflictError):
        await svc.enroll(user_id=user.id, course_id=course.id)

@pytest.mark.anyio
async def test_update_progress_and_completion(db_session: AsyncSession) -> None:
    # 1. Create user and course
    user = User(
        email=f"completer_{uuid.uuid4().hex[:6]}@academy.dev",
        hashed_password=hash_password("Pass123!"),
        full_name="Graduating Student",
        is_active=True,
        is_verified=True
    )
    db_session.add(user)
    await db_session.flush()

    course = Course(
        title="Micro-Course on LLM Security",
        slug=f"llm-sec-{uuid.uuid4().hex[:6]}",
        short_description="Short course",
        description="Detailed lessons",
        price=50.0,
        currency="USD",
        level=CourseLevel.BEGINNER,
        status=CourseStatus.PUBLISHED,
        instructor_id=user.id
    )
    db_session.add(course)
    await db_session.flush()

    # 2. Add 1 Module and 1 Lesson
    mod = Module(course_id=course.id, title="Module 1: Introduction", order=1)
    db_session.add(mod)
    await db_session.flush()

    lesson = Lesson(
        module_id=mod.id,
        title="Lesson 1: Prompt Injection Basics",
        order=1,
        content_type="text",
        content_body="Prompt injection fundamentals and mitigation strategies."
    )
    db_session.add(lesson)
    await db_session.commit()

    # 3. Enroll user
    svc = EnrollmentService(db_session)
    enrollment = await svc.enroll(user_id=user.id, course_id=course.id)

    # 4. Mark lesson completed (100% completion)
    progress = await svc.update_progress(
        enrollment_id=enrollment.id,
        lesson_id=lesson.id,
        status="completed"
    )
    assert progress.status == "completed"

    # Refresh enrollment from DB
    my_enrollments = await svc.get_my_enrollments(user.id)
    assert len(my_enrollments) == 1
    assert my_enrollments[0].progress == 100.0
