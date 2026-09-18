"""Order and payment schemas."""
from __future__ import annotations
from uuid import UUID
from datetime import datetime
from pydantic import BaseModel

class CheckoutItemRequest(BaseModel):
    item_type: str  # course | service
    item_id: UUID

class CheckoutRequest(BaseModel):
    items: list[CheckoutItemRequest]

class CheckoutResponse(BaseModel):
    checkout_url: str
    order_id: UUID

class OrderRead(BaseModel):
    id: UUID
    status: str
    total_amount: float
    currency: str
    created_at: datetime
    model_config = {"from_attributes": True}

class ManualBkashPaymentRequest(BaseModel):
    course_id: UUID
    sender_number: str
    trx_id: str
    amount: float
    notes: str | None = None

class ManualBkashPaymentResponse(BaseModel):
    order_id: UUID
    status: str
    course_id: UUID
    course_title: str
    amount: float
    currency: str
    sender_number: str
    trx_id: str
    created_at: datetime
    message: str

class PendingManualPaymentItem(BaseModel):
    order_id: UUID
    user_id: UUID
    user_name: str
    user_email: str
    course_id: UUID
    course_title: str
    sender_number: str
    trx_id: str
    amount: float
    currency: str
    status: str
    created_at: datetime
    notes: str | None = None

