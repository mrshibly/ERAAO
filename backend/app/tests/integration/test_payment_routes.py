"""Integration tests for payment routes."""
from __future__ import annotations
import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app

@pytest.mark.anyio
async def test_checkout_unauthenticated_rejected() -> None:
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        res = await ac.post("/api/v1/payments/checkout", json={"items": []})
        assert res.status_code == 401

@pytest.mark.anyio
async def test_stripe_webhook_empty_payload_rejected() -> None:
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        res = await ac.post(
            "/api/v1/payments/webhook",
            content=b"",
            headers={"stripe-signature": "dummy_sig"}
        )
        assert res.status_code in (400, 422)
