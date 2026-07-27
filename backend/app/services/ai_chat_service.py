"""
AI Chat Service — Integrates with OpenRouter API to provide ERAAO platform support.
Features robust fallback intent matching if OpenRouter API is unconfigured or unreachable.
"""

from __future__ import annotations

import logging
import httpx
from typing import List, Dict, Any

from app.core.config import get_settings
from app.schemas.chat import ChatMessage, ChatResponse

logger = logging.getLogger(__name__)

# ERAAO Official Knowledge Base System Prompt
ERAAO_SYSTEM_PROMPT = """You are the official AI Assistant for ERAAO (eraao.com), an enterprise platform specializing in AI Development and Cybersecurity Services in Bangladesh.
Your slogan is: "Lighting the future."

Brand & Services Info:
- Company Name: ERAAO (formerly Academy)
- Website: https://eraao.com
- Main Offerings:
  1. AI Engineering: Custom Multi-Agent LLM architectures, RAG solutions, MLOps orchestration.
  2. Cybersecurity Services: Web, Mobile, Cloud, API penetration testing, OSCP/OSCE certified red teaming, ISO 27001 & SOC-2 compliance readiness.
  3. Academy & LMS: Hands-on practitioner training bootcamps (Ethical Hacking, AI Engineering) with verifiable digital certificates.
- Consultation & Quotes: Users can schedule calls at /book or request custom quotes at /quote.
- Certificate Verification: Certificates can be verified online at /verify/[certificate_id].

Instructions:
1. Be helpful, concise, professional, and friendly.
2. Recommend relevant ERAAO pages using markdown links (e.g., [Explore Academy](/academy), [Book Consultation](/book), [View Services](/services)).
3. Keep responses within 2-3 short paragraphs maximum.
"""


class AIChatService:
    """Service to handle AI chatbot interactions via OpenRouter or fallback."""

    @staticmethod
    async def process_chat(messages: List[ChatMessage], context_url: str | None = None) -> ChatResponse:
        settings = get_settings()

        # Build payload history
        formatted_messages = [{"role": "system", "content": ERAAO_SYSTEM_PROMPT}]

        # Add optional context hint
        if context_url:
            formatted_messages.append({
                "role": "system",
                "content": f"The user is currently viewing the page: {context_url}"
            })

        for msg in messages:
            formatted_messages.append({"role": msg.role, "content": msg.content})

        # Check if OpenRouter API Key is configured
        if not settings.OPENROUTER_API_KEY or settings.OPENROUTER_API_KEY.startswith("CHANGE_ME"):
            logger.warning("OPENROUTER_API_KEY not configured. Using local fallback responder.")
            reply = AIChatService._generate_fallback(messages)
            return ChatResponse(reply=reply, model_used="eraao-local-fallback", fallback=True)

        # Call OpenRouter API
        headers = {
            "Authorization": f"Bearer {settings.OPENROUTER_API_KEY}",
            "HTTP-Referer": "https://eraao.com",
            "X-Title": "ERAAO AI Platform",
            "Content-Type": "application/json"
        }

        payload = {
            "model": settings.OPENROUTER_MODEL,
            "messages": formatted_messages,
            "temperature": 0.7,
            "max_tokens": 500
        }

        try:
            async with httpx.AsyncClient(timeout=15.0) as client:
                response = await client.post(
                    f"{settings.OPENROUTER_BASE_URL}/chat/completions",
                    json=payload,
                    headers=headers
                )

                if response.status_code == 200:
                    data = response.json()
                    choices = data.get("choices", [])
                    if choices and "message" in choices[0]:
                        reply_text = choices[0]["message"]["content"]
                        model_used = data.get("model", settings.OPENROUTER_MODEL)
                        usage = data.get("usage", {})
                        return ChatResponse(
                            reply=reply_text,
                            model_used=model_used,
                            fallback=False,
                            usage=usage
                        )

                logger.error(f"OpenRouter API returned error status {response.status_code}: {response.text}")

        except Exception as e:
            logger.error(f"Exception calling OpenRouter API: {e}")

        # Fallback if API fails
        reply = AIChatService._generate_fallback(messages)
        return ChatResponse(reply=reply, model_used="eraao-local-fallback", fallback=True)

    @staticmethod
    def _generate_fallback(messages: List[ChatMessage]) -> str:
        """Smart local intent responder if OpenRouter API is unavailable."""
        last_msg = messages[-1].content.lower() if messages else ""

        if any(w in last_msg for w in ["course", "academy", "training", "learn", "class"]):
            return (
                "Welcome to ERAAO Academy! We offer hands-on practitioner bootcamps in **Ethical Hacking**, "
                "**Penetration Testing**, and **AI System Engineering**. All courses include practical labs "
                "and verifiable certificates.\n\n"
                "👉 [Browse Course Catalog](/academy)"
            )
        elif any(w in last_msg for w in ["pentest", "security", "audit", "cyber", "hack", "soc"]):
            return (
                "ERAAO provides enterprise-grade **Offensive Penetration Testing** (Web, Mobile, Cloud, API), "
                "Red Teaming, and ISO 27001/SOC-2 readiness audits led by OSCP-certified security experts.\n\n"
                "👉 [View Security Services](/services) or [Request a Quote](/quote)"
            )
        elif any(w in last_msg for w in ["book", "consultation", "contact", "call", "meet"]):
            return (
                "You can speak directly with our senior security engineers and AI architects to build custom platforms "
                "or audit your infrastructure.\n\n"
                "👉 [Book a Consultation Call](/book)"
            )
        elif any(w in last_msg for w in ["verify", "certificate", "cert"]):
            return (
                "Every ERAAO completion certificate includes a digital cryptographic ID for online verification.\n\n"
                "👉 [Verify a Certificate](/verify)"
            )
        else:
            return (
                "Hello! I am the **ERAAO AI Assistant** — *Lighting the future.* ⚡\n\n"
                "I can help you explore our **AI Engineering**, **Cybersecurity Services**, and **Academy Bootcamps**.\n\n"
                "How can I assist you today? Feel free to [Book a Consultation](/book) or [Explore Academy](/academy)."
            )
