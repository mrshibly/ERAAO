"""
FastAPI Route for AI Assistant Chatbot integration.
"""

from __future__ import annotations

from fastapi import APIRouter, Request, Depends
from app.core.rate_limit import limiter
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.ai_chat_service import AIChatService

router = APIRouter()


@router.post("/message", response_model=ChatResponse, summary="Send message to ERAAO AI Chatbot")
@limiter.limit("20/minute")
async def chat_message(request: Request, body: ChatRequest) -> ChatResponse:
    """
    Process chat conversation and return AI assistant reply.
    Rate limited to 20 requests per minute per IP address.
    """
    return await AIChatService.process_chat(messages=body.messages, context_url=body.context_url)
