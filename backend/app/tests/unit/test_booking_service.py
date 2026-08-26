"""Unit tests for BookingService."""
from __future__ import annotations
import uuid
import pytest
from datetime import date, time
from sqlalchemy.ext.asyncio import AsyncSession
from app.services.booking_service import BookingService
from app.models.booking import TimeSlot, BookingStatus
from app.core.exceptions import NotFoundError, ConflictError

@pytest.mark.anyio
async def test_create_booking_without_slot(db_session: AsyncSession) -> None:
    svc = BookingService(db_session)
    booking = await svc.create_booking(
        name="Security Director",
        email="director@enterprise.com",
        phone="+8801517835859",
        service_type="AI Security Audit",
        notes="Interested in full infra pentesting"
    )
    assert booking.id is not None
    assert booking.name == "Security Director"
    assert booking.status == BookingStatus.PENDING

@pytest.mark.anyio
async def test_create_booking_with_slot_reserves_slot(db_session: AsyncSession) -> None:
    # 1. Create an available time slot
    slot = TimeSlot(
        date=date(2026, 9, 15),
        start_time=time(14, 0),
        end_time=time(15, 0),
        is_available=True
    )
    db_session.add(slot)
    await db_session.commit()

    # 2. Book the slot
    svc = BookingService(db_session)
    booking = await svc.create_booking(
        name="CTO Client",
        email="cto@startup.dev",
        phone="+8801517835859",
        service_type="LLM Architecture Review",
        time_slot_id=slot.id
    )
    assert booking.time_slot_id == slot.id

    # Verify slot is no longer available
    available_slots = await svc.list_available_slots()
    assert slot.id not in [s.id for s in available_slots]

@pytest.mark.anyio
async def test_create_booking_double_booking_conflict(db_session: AsyncSession) -> None:
    # 1. Create a time slot
    slot = TimeSlot(
        date=date(2026, 9, 16),
        start_time=time(10, 0),
        end_time=time(11, 0),
        is_available=True
    )
    db_session.add(slot)
    await db_session.commit()

    svc = BookingService(db_session)
    # First booking succeeds
    await svc.create_booking(
        name="User One",
        email="user1@academy.dev",
        service_type="Consultation",
        time_slot_id=slot.id
    )

    # Second booking for same slot must raise ConflictError
    with pytest.raises(ConflictError):
        await svc.create_booking(
            name="User Two",
            email="user2@academy.dev",
            service_type="Consultation",
            time_slot_id=slot.id
        )
