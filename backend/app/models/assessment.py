"""
Assessment models for quizzes and project assignment submissions.
"""

from __future__ import annotations

import enum
import uuid
from datetime import datetime, timezone
from typing import TYPE_CHECKING

from sqlalchemy import Boolean, DateTime, Enum, Float, ForeignKey, Integer, String, Text, Uuid, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.db.base import Base, TimestampMixin, UUIDPrimaryKeyMixin

if TYPE_CHECKING:
    from app.models.user import User
    from app.models.course import Lesson
    from app.models.enrollment import Enrollment


class SubmissionStatus(str, enum.Enum):
    SUBMITTED = "submitted"
    GRADED = "graded"
    RESUBMISSION_REQUESTED = "resubmission_requested"


class QuizAttempt(Base, UUIDPrimaryKeyMixin, TimestampMixin):
    """Tracks a student attempt at a lesson quiz examination."""

    __tablename__ = "quiz_attempts"

    user_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("users.id"), nullable=False, index=True)
    enrollment_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("enrollments.id"), nullable=False, index=True)
    lesson_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("lessons.id"), nullable=False, index=True)

    score: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    passed: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    answers_json: Mapped[str | None] = mapped_column(Text, nullable=True)

    # Relationships
    user: Mapped["User"] = relationship("User")
    enrollment: Mapped["Enrollment"] = relationship("Enrollment")
    lesson: Mapped["Lesson"] = relationship("Lesson")


class AssignmentSubmission(Base, UUIDPrimaryKeyMixin, TimestampMixin):
    """Tracks a student project or capstone submission for instructor grading."""

    __tablename__ = "assignment_submissions"

    user_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("users.id"), nullable=False, index=True)
    enrollment_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("enrollments.id"), nullable=False, index=True)
    lesson_id: Mapped[uuid.UUID] = mapped_column(Uuid, ForeignKey("lessons.id"), nullable=False, index=True)

    submission_url: Mapped[str] = mapped_column(String(2048), nullable=False)
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    status: Mapped[SubmissionStatus] = mapped_column(
        Enum(SubmissionStatus), nullable=False, default=SubmissionStatus.SUBMITTED
    )

    # Grading fields
    score: Mapped[float | None] = mapped_column(Float, nullable=True)
    grade: Mapped[str | None] = mapped_column(String(10), nullable=True)
    feedback: Mapped[str | None] = mapped_column(Text, nullable=True)
    graded_by_id: Mapped[uuid.UUID | None] = mapped_column(Uuid, ForeignKey("users.id"), nullable=True)
    graded_at: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)
    submitted_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        server_default=func.now(),
        nullable=False,
    )

    # Relationships
    user: Mapped["User"] = relationship("User", foreign_keys=[user_id])
    graded_by: Mapped["User | None"] = relationship("User", foreign_keys=[graded_by_id])
    enrollment: Mapped["Enrollment"] = relationship("Enrollment")
    lesson: Mapped["Lesson"] = relationship("Lesson")
