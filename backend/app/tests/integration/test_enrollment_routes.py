"""Integration tests for enrollment routes."""
from __future__ import annotations
import uuid
import pytest
from httpx import AsyncClient, ASGITransport
from app.main import app

@pytest.mark.anyio
async def test_my_enrollments_unauthenticated_rejected() -> None:
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        res = await ac.get("/api/v1/enrollments/me")
        assert res.status_code == 401

@pytest.mark.anyio
async def test_admin_list_enrollments_unauthorized_for_anonymous() -> None:
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as ac:
        res = await ac.get("/api/v1/enrollments")
        assert res.status_code == 401
