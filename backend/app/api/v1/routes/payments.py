"""Payment routes : checkout and Stripe webhook."""
from __future__ import annotations
from fastapi import APIRouter, Depends, Request, Header, Form
from fastapi.responses import RedirectResponse
from uuid import UUID
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from sqlalchemy.ext.asyncio import AsyncSession
from app.db.session import get_db
from app.core.config import get_settings
from app.core.dependencies import get_current_active_user, require_role
from app.core.rate_limit import limiter
from app.models.user import User
from app.models.order import Order, OrderStatus, ItemType
from app.schemas.order import (
    CheckoutRequest,
    CheckoutResponse,
    ManualBkashPaymentRequest,
    ManualBkashPaymentResponse,
    PendingManualPaymentItem,
)
from app.services.payment_service import PaymentService

router = APIRouter()

@router.post("/checkout", response_model=CheckoutResponse, status_code=201)
@limiter.limit("10/minute")
async def checkout(request: Request, data: CheckoutRequest, user: User = Depends(get_current_active_user), db: AsyncSession = Depends(get_db)):
    """Create a Stripe or SSLCommerz checkout session for the given items."""
    svc = PaymentService(db)
    result = await svc.create_checkout(user.id, [item.model_dump() for item in data.items])
    return CheckoutResponse(checkout_url=result["checkout_url"], order_id=result["order_id"])

@router.post("/webhook", status_code=200)
async def stripe_webhook(request: Request, stripe_signature: str = Header(alias="stripe-signature"), db: AsyncSession = Depends(get_db)):
    """Stripe webhook endpoint : no auth required, verified via signature."""
    payload = await request.body()
    svc = PaymentService(db)
    await svc.handle_webhook(payload, stripe_signature)
    return {"received": True}

@router.post("/manual-bkash", response_model=ManualBkashPaymentResponse, status_code=201)
@limiter.limit("5/minute")
async def submit_manual_bkash(
    request: Request,
    data: ManualBkashPaymentRequest,
    user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    """Student: submit manual bKash transaction details for verification."""
    svc = PaymentService(db)
    result = await svc.submit_manual_bkash(
        user_id=user.id,
        course_id=data.course_id,
        sender_number=data.sender_number,
        trx_id=data.trx_id,
        amount=data.amount,
        notes=data.notes
    )
    return ManualBkashPaymentResponse(**result)

@router.get("/manual-bkash/my-submissions", status_code=200)
async def get_my_manual_submissions(
    user: User = Depends(get_current_active_user),
    db: AsyncSession = Depends(get_db)
):
    """Student: view own submitted manual bKash payments and verification statuses."""
    svc = PaymentService(db)
    return await svc.get_user_manual_orders(user.id)

@router.get("/manual-bkash/pending", response_model=list[PendingManualPaymentItem], status_code=200, dependencies=[Depends(require_role("admin"))])
async def list_pending_manual_payments(
    status: str | None = None,
    db: AsyncSession = Depends(get_db)
):
    """Admin: list all manual bKash transactions (filter optional by status: pending, paid, failed)."""
    svc = PaymentService(db)
    items = await svc.list_manual_orders(status=status)
    return [PendingManualPaymentItem(**i) for i in items]

@router.post("/manual-bkash/{order_id}/approve", status_code=200, dependencies=[Depends(require_role("admin"))])
async def approve_manual_payment(
    order_id: UUID,
    db: AsyncSession = Depends(get_db)
):
    """Admin: approve a manual bKash transaction and automatically enroll the student."""
    svc = PaymentService(db)
    return await svc.approve_manual_order(order_id)

@router.post("/manual-bkash/{order_id}/reject", status_code=200, dependencies=[Depends(require_role("admin"))])
async def reject_manual_payment(
    order_id: UUID,
    reason: str | None = None,
    db: AsyncSession = Depends(get_db)
):
    """Admin: reject a manual bKash transaction."""
    svc = PaymentService(db)
    return await svc.reject_manual_order(order_id, reason=reason)


@router.post("/sslcommerz/success")
async def sslcommerz_success(
    order_id: UUID,
    status: str = Form(...),
    val_id: str = Form(...),
    amount: float = Form(...),
    db: AsyncSession = Depends(get_db)
):
    """Callback for successful SSLCommerz transactions.

    Security: Verifies the transaction server-side via SSLCommerz validation API
    instead of trusting the form POST data (which can be forged).
    """
    import httpx
    import structlog

    log = structlog.get_logger()
    settings = get_settings()
    base_url = settings.allowed_origins_list[0]

    if status not in ("VALID", "VALIDATED"):
        return RedirectResponse(url=f"{base_url}/dashboard/student?payment=failed", status_code=303)

    # --- Server-side verification via SSLCommerz Validation API ---
    validation_url = (
        "https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php"
        if settings.SSLCOMMERZ_IS_SANDBOX
        else "https://securepay.sslcommerz.com/validator/api/validationserverAPI.php"
    )
    try:
        async with httpx.AsyncClient(timeout=15) as client:
            resp = await client.get(validation_url, params={
                "val_id": val_id,
                "store_id": settings.SSLCOMMERZ_STORE_ID,
                "store_passwd": settings.SSLCOMMERZ_STORE_PASSWD,
                "format": "json",
            })
            resp.raise_for_status()
            vdata = resp.json()
    except Exception as exc:
        log.error("sslcommerz_validation_failed", val_id=val_id, error=str(exc))
        return RedirectResponse(url=f"{base_url}/dashboard/student?payment=failed", status_code=303)

    if vdata.get("status") not in ("VALID", "VALIDATED"):
        log.warning("sslcommerz_invalid_status", val_id=val_id, api_status=vdata.get("status"))
        return RedirectResponse(url=f"{base_url}/dashboard/student?payment=failed", status_code=303)

    # --- Amount match check ---
    stmt = select(Order).where(Order.id == order_id).options(selectinload(Order.items))
    order = (await db.execute(stmt)).scalar_one_or_none()
    if not order:
        log.warning("sslcommerz_order_not_found", order_id=str(order_id))
        return RedirectResponse(url=f"{base_url}/dashboard/student?payment=failed", status_code=303)

    verified_amount = float(vdata.get("amount", 0))
    if abs(verified_amount - float(order.total_amount)) > 0.01:
        log.warning("sslcommerz_amount_mismatch", expected=float(order.total_amount), got=verified_amount)
        return RedirectResponse(url=f"{base_url}/dashboard/student?payment=failed", status_code=303)

    if order.status != OrderStatus.PAID:
        order.status = OrderStatus.PAID
        order.gateway_event_id = val_id

        from app.services.enrollment_service import EnrollmentService
        enroll_svc = EnrollmentService(db)
        for item in order.items:
            if item.item_type == ItemType.COURSE:
                try:
                    await enroll_svc.enroll(order.user_id, item.item_id, bypass_payment_check=True)
                except Exception:
                    pass
        await db.commit()

    return RedirectResponse(url=f"{base_url}/dashboard/student?payment=success", status_code=303)

@router.post("/sslcommerz/fail")
async def sslcommerz_fail(
    order_id: UUID,
    db: AsyncSession = Depends(get_db)
):
    """Callback for failed SSLCommerz transactions."""
    stmt = select(Order).where(Order.id == order_id)
    order = (await db.execute(stmt)).scalar_one_or_none()
    if order and order.status == OrderStatus.PENDING:
        order.status = OrderStatus.FAILED
        await db.commit()
    settings = get_settings()
    base_url = settings.allowed_origins_list[0]
    return RedirectResponse(url=f"{base_url}/academy?payment=failed", status_code=303)

@router.post("/sslcommerz/cancel")
async def sslcommerz_cancel(
    order_id: UUID,
    db: AsyncSession = Depends(get_db)
):
    """Callback for cancelled SSLCommerz transactions."""
    stmt = select(Order).where(Order.id == order_id)
    order = (await db.execute(stmt)).scalar_one_or_none()
    if order and order.status == OrderStatus.PENDING:
        order.status = OrderStatus.CANCELLED
        await db.commit()
    settings = get_settings()
    base_url = settings.allowed_origins_list[0]
    return RedirectResponse(url=f"{base_url}/academy?payment=cancelled", status_code=303)
