"""Payment service : Stripe checkout, webhook handling, order management."""
from __future__ import annotations
from uuid import UUID
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
import stripe
from app.core.config import get_settings
from app.core.exceptions import PaymentError, NotFoundError, ValidationError, ConflictError
from app.models.order import Order, OrderItem, Invoice, OrderStatus, ItemType, InvoiceStatus
from app.models.course import Course

class PaymentService:
    def __init__(self, db: AsyncSession) -> None:
        self.db = db
        settings = get_settings()
        stripe.api_key = settings.STRIPE_SECRET_KEY

    async def create_checkout(self, user_id: UUID, items: list[dict]) -> dict:
        """
        Create a Stripe checkout session and persist a pending Order.

        Args:
            user_id: The authenticated user's ID.
            items: List of dicts with item_type and item_id.

        Returns:
            Dict with checkout_url and order_id.

        Raises:
            NotFoundError: If a referenced item doesn't exist.
            PaymentError: If Stripe session creation fails.
        """
        line_items = []
        order_items_data = []
        total = 0.0
        collected_currency = "USD"
        collected_product_name = "Course Tuition"

        for item in items:
            if item["item_type"] == "course":
                stmt = select(Course).where(Course.id == UUID(str(item["item_id"])))
                result = await self.db.execute(stmt)
                course = result.scalar_one_or_none()
                if course is None:
                    raise NotFoundError(resource="Course")
                line_items.append({
                    "price_data": {
                        "currency": course.currency.lower(),
                        "product_data": {"name": course.title},
                        "unit_amount": int(float(course.price) * 100),
                    },
                    "quantity": 1,
                })
                order_items_data.append({"item_type": ItemType.COURSE, "item_id": course.id, "unit_price": float(course.price), "quantity": 1})
                total += float(course.price)
                collected_currency = course.currency.upper()
                collected_product_name = course.title

        # Create pending order
        order_currency = "BDT" if (len(order_items_data) > 0 and collected_currency == "BDT") else "USD"
        order = Order(user_id=user_id, total_amount=total, currency=order_currency)
        self.db.add(order)
        await self.db.flush()

        for oi_data in order_items_data:
            self.db.add(OrderItem(order_id=order.id, **oi_data))
        await self.db.flush()

        settings = get_settings()
        use_sslcommerz = (
            (order_currency == "BDT")
            or (settings.STRIPE_SECRET_KEY in ("sk_test_xxx", "sk_test_mock") or not settings.STRIPE_SECRET_KEY)
        )

        if use_sslcommerz:
            import httpx
            from app.repositories.user_repository import UserRepository
            user_repo = UserRepository(self.db)
            user = await user_repo.get_by_id(user_id)
            cus_name = user.full_name if user else "Customer"
            cus_email = user.email if user else "customer@academy.dev"

            gateway_url = (
                "https://sandbox.sslcommerz.com/gwprocess/v4/api.php"
                if settings.SSLCOMMERZ_IS_SANDBOX
                else "https://gwprocess.sslcommerz.com/gwprocess/v4/api.php"
            )

            payload = {
                "store_id": settings.SSLCOMMERZ_STORE_ID,
                "store_passwd": settings.SSLCOMMERZ_STORE_PASSWD,
                "total_amount": str(total),
                "currency": order_currency,
                "tran_id": str(order.id),
                "success_url": f"{settings.allowed_origins_list[0]}/api/v1/payments/sslcommerz/success?order_id={order.id}",
                "fail_url": f"{settings.allowed_origins_list[0]}/api/v1/payments/sslcommerz/fail?order_id={order.id}",
                "cancel_url": f"{settings.allowed_origins_list[0]}/api/v1/payments/sslcommerz/cancel?order_id={order.id}",
                "cus_name": cus_name,
                "cus_email": cus_email,
                "cus_phone": "01700000000",
                "cus_add1": "Dhaka",
                "cus_city": "Dhaka",
                "cus_country": "Bangladesh",
                "shipping_method": "NO",
                "product_name": collected_product_name,
                "product_category": "Education",
                "product_profile": "non-physical-goods"
            }

            async with httpx.AsyncClient() as client:
                response = await client.post(gateway_url, data=payload, timeout=10.0)
                if response.status_code != 200:
                    raise PaymentError(message=f"SSLCommerz gateway responded with code {response.status_code}")
                res_data = response.json()
                if res_data.get("status") == "SUCCESS":
                    order.gateway_payment_id = res_data.get("sessionkey")
                    await self.db.commit()
                    return {"checkout_url": res_data.get("GatewayPageURL"), "order_id": str(order.id)}
                else:
                    raise PaymentError(message=res_data.get("failedreason") or "SSLCommerz session creation failed.")
            base_url = settings.allowed_origins_list[0]
            try:
                session = stripe.checkout.Session.create(
                    line_items=line_items,
                    mode="payment",
                    success_url=f"{base_url}/payment/success?order_id={order.id}",
                    cancel_url=f"{base_url}/payment/cancel",
                    metadata={"order_id": str(order.id)},
                )
            except stripe.error.StripeError as e:
                raise PaymentError(message=str(e)) from e

            order.gateway_payment_id = session.id
            await self.db.commit()
            return {"checkout_url": session.url, "order_id": str(order.id)}

    async def handle_webhook(self, payload: bytes, sig_header: str) -> None:
        """
        Process a Stripe webhook event idempotently.

        Checks gateway_event_id to prevent duplicate processing.

        Raises:
            ValidationError: If signature verification fails.
        """
        settings = get_settings()
        try:
            event = stripe.Webhook.construct_event(payload, sig_header, settings.STRIPE_WEBHOOK_SECRET)
        except (ValueError, stripe.error.SignatureVerificationError) as e:
            raise ValidationError(message="Invalid webhook signature.") from e

        # Idempotency: check if we already processed this event
        stmt = select(Order).where(Order.gateway_event_id == event["id"])
        existing = (await self.db.execute(stmt)).scalar_one_or_none()
        if existing is not None:
            return  # Already processed

        if event["type"] == "checkout.session.completed":
            session = event["data"]["object"]
            order_id = session.get("metadata", {}).get("order_id")
            if order_id:
                from sqlalchemy.orm import selectinload
                stmt = select(Order).where(Order.id == UUID(order_id)).options(selectinload(Order.items))
                order = (await self.db.execute(stmt)).scalar_one_or_none()
                if order:
                    order.status = OrderStatus.PAID
                    order.gateway_event_id = event["id"]
                    
                    # Create enrollments
                    from app.services.enrollment_service import EnrollmentService
                    enroll_svc = EnrollmentService(self.db)
                    for item in order.items:
                        if item.item_type == ItemType.COURSE:
                            try:
                                await enroll_svc.enroll(order.user_id, item.item_id, bypass_payment_check=True)
                            except Exception:
                                pass
                                
                    # Queue notification email
                    from app.workers.tasks.email_tasks import send_email_task
                    from app.repositories.user_repository import UserRepository
                    user_repo = UserRepository(self.db)
                    user = await user_repo.get_by_id(order.user_id)
                    if user:
                        send_email_task.delay(
                            to_email=user.email,
                            subject="Payment Confirmation | Academy",
                            body_html=f"<h3>Hello {user.full_name},</h3><p>Your payment for Order #{order.id} was successful! You have been enrolled in your courses.</p>"
                        )
                    await self.db.commit()

    async def submit_manual_bkash(
        self,
        user_id: UUID,
        course_id: UUID,
        sender_number: str,
        trx_id: str,
        amount: float,
        notes: str | None = None
    ) -> dict:
        clean_trx = trx_id.strip().upper()
        clean_sender = sender_number.strip()

        # Check course
        course_stmt = select(Course).where(Course.id == course_id)
        course = (await self.db.execute(course_stmt)).scalar_one_or_none()
        if not course:
            raise NotFoundError(resource="Course")

        # Check if student is already enrolled
        from app.models.enrollment import Enrollment
        enrolled_stmt = select(Enrollment).where(
            Enrollment.user_id == user_id,
            Enrollment.course_id == course_id,
            Enrollment.deleted_at.is_(None)
        )
        already_enrolled = (await self.db.execute(enrolled_stmt)).scalar_one_or_none()
        if already_enrolled:
            raise ConflictError(message="You are already enrolled in this bootcamp track.")

        # Check for duplicate TrxID
        dup_stmt = select(Order).where(Order.gateway_payment_id == clean_trx)
        existing = (await self.db.execute(dup_stmt)).scalar_one_or_none()
        if existing:
            raise ConflictError(message=f"bKash Transaction ID '{clean_trx}' has already been submitted.")

        # Create Order with manual bkash details
        order = Order(
            user_id=user_id,
            status=OrderStatus.PENDING,
            total_amount=amount,
            currency="BDT",
            payment_gateway="bkash_manual",
            gateway_payment_id=clean_trx,
            gateway_event_id=clean_sender,
        )
        self.db.add(order)
        await self.db.flush()

        # Order Item
        item = OrderItem(
            order_id=order.id,
            item_type=ItemType.COURSE,
            item_id=course.id,
            quantity=1,
            unit_price=amount,
        )
        self.db.add(item)

        # Invoice
        short_id = str(order.id)[:8].upper()
        invoice = Invoice(
            order_id=order.id,
            invoice_number=f"INV-BKASH-{short_id}",
            status=InvoiceStatus.DRAFT,
            notes=f"bKash Sender: {clean_sender} | TrxID: {clean_trx} | Note: {notes or 'N/A'}"
        )
        self.db.add(invoice)

        await self.db.commit()
        await self.db.refresh(order)

        return {
            "order_id": order.id,
            "status": order.status.value,
            "course_id": course.id,
            "course_title": course.title,
            "amount": float(order.total_amount),
            "currency": order.currency,
            "sender_number": clean_sender,
            "trx_id": clean_trx,
            "created_at": order.created_at,
            "message": "bKash transaction details submitted successfully. Verification takes 1-2 hours."
        }

    async def get_user_manual_orders(self, user_id: UUID) -> list[dict]:
        from sqlalchemy.orm import selectinload
        stmt = (
            select(Order)
            .where(Order.user_id == user_id, Order.payment_gateway == "bkash_manual")
            .options(selectinload(Order.items), selectinload(Order.invoice))
            .order_by(Order.created_at.desc())
        )
        orders = (await self.db.execute(stmt)).scalars().all()
        result = []
        for o in orders:
            course_title = "Course Tuition"
            course_id = None
            if o.items:
                item = o.items[0]
                course_id = item.item_id
                c_stmt = select(Course.title).where(Course.id == item.item_id)
                t = (await self.db.execute(c_stmt)).scalar_one_or_none()
                if t:
                    course_title = t
            result.append({
                "order_id": o.id,
                "course_id": course_id,
                "course_title": course_title,
                "amount": float(o.total_amount),
                "currency": o.currency,
                "sender_number": o.gateway_event_id or "",
                "trx_id": o.gateway_payment_id or "",
                "status": o.status.value,
                "created_at": o.created_at,
                "notes": o.invoice.notes if o.invoice else None
            })
        return result

    async def list_manual_orders(self, status: str | None = None) -> list[dict]:
        from sqlalchemy.orm import selectinload
        stmt = (
            select(Order)
            .where(Order.payment_gateway == "bkash_manual")
            .options(
                selectinload(Order.user),
                selectinload(Order.items),
                selectinload(Order.invoice)
            )
            .order_by(Order.created_at.desc())
        )
        if status:
            stmt = stmt.where(Order.status == OrderStatus(status))

        orders = (await self.db.execute(stmt)).scalars().all()
        result = []
        for o in orders:
            course_title = "Course Tuition"
            course_id = None
            if o.items:
                item = o.items[0]
                course_id = item.item_id
                c_stmt = select(Course.title).where(Course.id == item.item_id)
                t = (await self.db.execute(c_stmt)).scalar_one_or_none()
                if t:
                    course_title = t

            result.append({
                "order_id": o.id,
                "user_id": o.user_id,
                "user_name": o.user.full_name if o.user else "Unknown Student",
                "user_email": o.user.email if o.user else "unknown@eraao.com",
                "course_id": course_id,
                "course_title": course_title,
                "sender_number": o.gateway_event_id or "",
                "trx_id": o.gateway_payment_id or "",
                "amount": float(o.total_amount),
                "currency": o.currency,
                "status": o.status.value,
                "created_at": o.created_at,
                "notes": o.invoice.notes if o.invoice else None
            })
        return result

    async def approve_manual_order(self, order_id: UUID) -> dict:
        from sqlalchemy.orm import selectinload
        stmt = (
            select(Order)
            .where(Order.id == order_id)
            .options(selectinload(Order.items), selectinload(Order.invoice))
        )
        order = (await self.db.execute(stmt)).scalar_one_or_none()
        if not order:
            raise NotFoundError(resource="Order")

        order.status = OrderStatus.PAID
        if order.invoice:
            order.invoice.status = InvoiceStatus.PAID

        from app.services.enrollment_service import EnrollmentService
        enroll_svc = EnrollmentService(self.db)
        for item in order.items:
            if item.item_type == ItemType.COURSE:
                try:
                    await enroll_svc.enroll(order.user_id, item.item_id, bypass_payment_check=True)
                except Exception:
                    pass

        await self.db.commit()
        return {"message": "bKash payment approved and student enrolled successfully.", "status": "paid"}

    async def reject_manual_order(self, order_id: UUID, reason: str | None = None) -> dict:
        from sqlalchemy.orm import selectinload
        stmt = select(Order).where(Order.id == order_id).options(selectinload(Order.invoice))
        order = (await self.db.execute(stmt)).scalar_one_or_none()
        if not order:
            raise NotFoundError(resource="Order")

        order.status = OrderStatus.FAILED
        if order.invoice:
            order.invoice.status = InvoiceStatus.CANCELLED
            if reason:
                order.invoice.notes = f"{order.invoice.notes or ''} | Rejected: {reason}"

        await self.db.commit()
        return {"message": "Payment rejected.", "status": "failed"}

