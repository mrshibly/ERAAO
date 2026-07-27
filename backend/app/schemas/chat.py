"""
Pydantic validation models for the AI Chatbot endpoint.
"""

from __future__ import annotations

from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field


class ChatMessage(BaseModel):
    """Single chat message in the conversation trajectory."""
    role: str = Field(..., description="Role of the message author: 'user', 'assistant', or 'system'")
    content: str = Field(..., min_length=1, max_length=4000, description="Text content of the message")


class ChatRequest(BaseModel):
    """Payload sent by the frontend chatbot widget."""
    messages: List[ChatMessage] = Field(..., min_items=1, max_items=20, description="Conversation history")
    context_url: Optional[str] = Field(None, description="Optional active URL path for context-aware assistance")


class ChatResponse(BaseModel):
    """Response returned by the backend chatbot API."""
    reply: str = Field(..., description="AI assistant reply text")
    model_used: str = Field(..., description="AI model used to generate response")
    fallback: bool = Field(False, description="True if local fallback intent responder was used")
    usage: Optional[Dict[str, Any]] = Field(None, description="Optional token usage stats")
