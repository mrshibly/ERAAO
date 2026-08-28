"""Unit tests for PaymentService."""
from __future__ import annotations
import uuid
from unittest.mock import patch, AsyncMock, MagicMock
import pytest
from sqlalchemy.ext.asyncio import AsyncSession
from app.services.payment_service import PaymentService
from app.models.course import Course, CourseLevel, CourseStatus
from app.models.user import User
from app.core.exceptions import NotFoundError, ValidationError
from app.core.security import hash_password

@pytest.mark.anyio
async def test_create_checkout_nonexistent_course(db_session: AsyncSession) -> None:
    svc = PaymentService(db_session)
    dummy_user_id = uuid.uuid4()
    with pytest.raises(NotFoundError):
        await svc.create_checkout(
            user_id=dummy_user_id,
            items=[{"item_type": "course", "item_id": str(uuid.uuid4())}]
        )

@pytest.mark.anyio
async def test_create_checkout_success(db_session: AsyncSession) -> None:
    # 1. Create a user
    user = User(
        email=f"payer_{uuid.uuid4().hex[:6]}@academy.dev",
        hashed_password=hash_password("Pass123!"),
        full_name="Payment Tester",
        is_active=True,
        is_verified=True
    )
    db_session.add(user)
    await db_session.flush()

    # 2. Create a course
    course = Course(
        title="Web Penetration Testing Bootcamp",
        slug=f"web-pentest-{uuid.uuid4().hex[:6]}",
        short_description="Learn offensive security",
        description="Full offensive security bootcamp",
        price=150.0,
        currency="USD",
        level=CourseLevel.INTERMEDIATE,
        status=CourseStatus.PUBLISHED,
        instructor_id=user.id
    )
    db_session.add(course)
    await db_session.commit()

    # 3. Mock SSLCommerz HTTP response
    mock_resp = MagicMock()
    mock_resp.status_code = 200
    mock_resp.json.return_value = {
        "status": "SUCCESS",
        "sessionkey": "mock_session_key_123",
        "GatewayPageURL": "https://sandbox.sslcommerz.com/gwprocess/v4/gw.php?Q=mock_session_key_123"
    }

    # 4. Create checkout session with mocked gateway
    svc = PaymentService(db_session)
    with patch("httpx.AsyncClient.post", new_callable=AsyncMock, return_value=mock_resp):
        result = await svc.create_checkout(
            user_id=user.id,
            items=[{"item_type": "course", "item_id": str(course.id)}]
        )

    assert "checkout_url" in result
    assert "order_id" in result
    assert result["checkout_url"] == "https://sandbox.sslcommerz.com/gwprocess/v4/gw.php?Q=mock_session_key_123"

@pytest.mark.anyio
async def test_stripe_webhook_invalid_signature(db_session: AsyncSession) -> None:
    svc = PaymentService(db_session)
    with pytest.raises(ValidationError):
        await svc.handle_webhook(payload=b"{}", sig_header="invalid_sig")
