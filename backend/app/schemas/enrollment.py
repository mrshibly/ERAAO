"""Enrollment schemas."""
from __future__ import annotations
from uuid import UUID
from datetime import datetime
from pydantic import BaseModel

from app.schemas.course import CourseRead
from app.schemas.cohort import CohortRead

class EnrollmentCreate(BaseModel):
    course_id: UUID
    cohort_id: UUID | None = None

class LessonProgressUpdate(BaseModel):
    lesson_id: UUID
    status: str  # not_started | in_progress | completed

class EnrollmentRead(BaseModel):
    id: UUID
    user_id: UUID
    course_id: UUID
    cohort_id: UUID | None = None
    status: str
    enrolled_at: datetime
    completed_at: datetime | None = None
    completion_pct: float = 0.0
    progress: float = 0.0
    course: CourseRead | None = None
    cohort: CohortRead | None = None
    model_config = {"from_attributes": True}

class AdminDirectEnrollRequest(BaseModel):
    user_email: str | None = None
    user_id: UUID | None = None
    course_id: UUID
    cohort_id: UUID | None = None

class AdminProgressOverrideRequest(BaseModel):
    status: str  # active | completed
