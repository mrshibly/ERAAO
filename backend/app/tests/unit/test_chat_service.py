"""
Unit tests for AI Chat Service and OpenRouter integration fallback.
"""

import pytest
from app.schemas.chat import ChatMessage
from app.services.ai_chat_service import AIChatService


@pytest.mark.asyncio
async def test_chat_service_fallback_intent():
    messages = [ChatMessage(role="user", content="What cybersecurity training do you offer?")]
    response = await AIChatService.process_chat(messages)

    assert response.reply is not None
    assert len(response.reply) > 10
    assert "Ethical Hacking" in response.reply or "Academy" in response.reply


@pytest.mark.asyncio
async def test_chat_service_consultation_intent():
    messages = [ChatMessage(role="user", content="I want to book a consultation call")]
    response = await AIChatService.process_chat(messages)

    assert response.reply is not None
    assert "/book" in response.reply
