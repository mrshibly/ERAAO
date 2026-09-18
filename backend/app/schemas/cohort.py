"""Cohort schemas."""
from __future__ import annotations
from uuid import UUID
from datetime import date
from pydantic import BaseModel, Field

class CohortCreate(BaseModel):
    course_id: UUID
    title: str = Field(max_length=500)
    start_date: date
    end_date: date
    capacity: int = 30
    instructor_id: UUID
    organization_id: UUID | None = None
    meeting_url: str | None = None
    meeting_passcode: str | None = None
    schedule_info: str | None = None
    announcement: str | None = None

class CohortUpdate(BaseModel):
    title: str | None = None
    start_date: date | None = None
    end_date: date | None = None
    capacity: int | None = None
    instructor_id: UUID | None = None
    organization_id: UUID | None = None
    status: str | None = None
    meeting_url: str | None = None
    meeting_passcode: str | None = None
    schedule_info: str | None = None
    announcement: str | None = None

class CohortRead(BaseModel):
    id: UUID
    course_id: UUID
    title: str
    start_date: date
    end_date: date
    capacity: int
    status: str
    meeting_url: str | None = None
    meeting_passcode: str | None = None
    schedule_info: str | None = None
    announcement: str | None = None
    model_config = {"from_attributes": True}

class CohortEnrollRequest(BaseModel):
    user_ids: list[UUID]
