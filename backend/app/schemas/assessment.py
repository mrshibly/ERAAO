"""Assessment schemas for quizzes and assignment submissions."""
from __future__ import annotations

from datetime import datetime
from uuid import UUID
from pydantic import BaseModel, Field


class QuizQuestionClient(BaseModel):
    index: int
    question: str
    options: list[str]


class QuizClientResponse(BaseModel):
    lesson_id: UUID
    title: str
    passing_score: int = 70
    questions: list[QuizQuestionClient]


class QuizSubmitRequest(BaseModel):
    answers: dict[int, int]


class QuizQuestionResult(BaseModel):
    index: int
    question: str
    selected_index: int | None = None
    correct_index: int
    is_correct: bool
    explanation: str | None = None


class QuizSubmitResponse(BaseModel):
    score: float
    passed: bool
    passing_score: int = 70
    results: list[QuizQuestionResult]


class AssignmentSubmitRequest(BaseModel):
    submission_url: str = Field(max_length=2048)
    notes: str | None = None


class AssignmentGradeRequest(BaseModel):
    score: float = Field(ge=0, le=100)
    grade: str = Field(max_length=10)
    feedback: str


class AssignmentSubmissionRead(BaseModel):
    id: UUID
    user_id: UUID
    user_name: str | None = None
    user_email: str | None = None
    enrollment_id: UUID
    lesson_id: UUID
    lesson_title: str | None = None
    course_title: str | None = None
    submission_url: str
    notes: str | None = None
    status: str
    score: float | None = None
    grade: str | None = None
    feedback: str | None = None
    graded_at: datetime | None = None
    submitted_at: datetime

    model_config = {"from_attributes": True}
