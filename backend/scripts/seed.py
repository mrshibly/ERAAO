"""
Seed script — populates default roles, permissions, admin/student users, published courses, modules, lessons, and enrollments.
Run via: python -m scripts.seed
"""
import asyncio
import uuid
from datetime import datetime, timezone
from sqlalchemy import select
from app.db.session import async_session_factory, engine
from app.db.base import Base
import app.models  # Ensure all models are loaded
from app.models.role import Role, Permission, RolePermission, UserRole
from app.models.user import User
from app.models.course import Course, Module, Lesson, CourseLevel, CourseStatus, ContentType
from app.models.enrollment import Enrollment, EnrollmentStatus
from app.core.security import hash_password

DEFAULT_ROLES = ["student", "instructor", "corporate_client", "admin"]

RESOURCES = ["users", "courses", "enrollments", "blog", "services", "bookings", "contacts", "quotes", "certificates", "cohorts", "tickets", "careers", "audit_logs", "orders"]
ACTIONS = ["create", "read", "update", "delete"]

ROLE_PERMISSIONS = {
    "admin": [(r, a) for r in RESOURCES for a in ACTIONS],
    "instructor": [("courses", "create"), ("courses", "read"), ("courses", "update"), ("enrollments", "read")],
    "student": [("courses", "read"), ("enrollments", "create"), ("enrollments", "read"), ("tickets", "create"), ("tickets", "read"), ("certificates", "read")],
    "corporate_client": [("enrollments", "read"), ("cohorts", "read"), ("orders", "read")],
}


async def seed() -> None:
    # Ensure tables exist
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

    async with async_session_factory() as db:
        # 1. Create roles
        roles = {}
        for name in DEFAULT_ROLES:
            existing = (await db.execute(select(Role).where(Role.name == name))).scalar_one_or_none()
            if existing:
                roles[name] = existing
            else:
                role = Role(name=name, description=f"Default {name} role")
                db.add(role)
                await db.flush()
                roles[name] = role

        # 2. Create permissions
        perms = {}
        for resource in RESOURCES:
            for action in ACTIONS:
                key = (resource, action)
                existing = (await db.execute(select(Permission).where(Permission.resource == resource, Permission.action == action))).scalar_one_or_none()
                if existing:
                    perms[key] = existing
                else:
                    perm = Permission(resource=resource, action=action)
                    db.add(perm)
                    await db.flush()
                    perms[key] = perm

        # 3. Assign permissions to roles
        for role_name, perm_list in ROLE_PERMISSIONS.items():
            role = roles[role_name]
            for resource, action in perm_list:
                perm = perms[(resource, action)]
                existing = (await db.execute(select(RolePermission).where(RolePermission.role_id == role.id, RolePermission.permission_id == perm.id))).scalar_one_or_none()
                if not existing:
                    db.add(RolePermission(role_id=role.id, permission_id=perm.id))

        # 4. Create default admin user
        admin_email = "admin@academy.dev"
        admin_user = (await db.execute(select(User).where(User.email == admin_email))).scalar_one_or_none()
        if not admin_user:
            admin_user = User(email=admin_email, hashed_password=hash_password("admin123456"), full_name="Platform Admin", is_active=True, is_verified=True)
            db.add(admin_user)
            await db.flush()
            db.add(UserRole(user_id=admin_user.id, role_id=roles["admin"].id))
            await db.flush()

        # 5. Create default student user
        student_email = "student@academy.dev"
        student_user = (await db.execute(select(User).where(User.email == student_email))).scalar_one_or_none()
        if not student_user:
            student_user = User(email=student_email, hashed_password=hash_password("student123456"), full_name="Alex Mercer", is_active=True, is_verified=True)
            db.add(student_user)
            await db.flush()
            db.add(UserRole(user_id=student_user.id, role_id=roles["student"].id))
            await db.flush()

        # 6. Seed Default Published Courses
        sample_courses_data = [
            {
                "title": "Advanced Penetration Testing & Ethical Hacking",
                "slug": "advanced-penetration-testing-ethical-hacking",
                "short_description": "Master real-world offensive security, network exploitation, web app pentesting, and privilege escalation.",
                "description": "Comprehensive hands-on training covering network reconnaissance, vulnerability assessment, web application security testing, Metasploit, Active Directory exploitation, and post-exploitation techniques.",
                "level": CourseLevel.ADVANCED,
                "price": 25000.00,
                "currency": "BDT",
                "duration_hours": 36.0,
                "thumbnail_url": "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=600"
            },
            {
                "title": "AI Systems Architecture & LLM Engineering",
                "slug": "ai-systems-architecture-llm-engineering",
                "short_description": "Build autonomous AI agents, RAG pipelines, fine-tuned LLMs, and scalable machine learning microservices.",
                "description": "Deep dive into production AI development: LangChain, LlamaIndex, vector databases (Qdrant/Pgvector), prompt security, local model deployment, and agent orchestration.",
                "level": CourseLevel.INTERMEDIATE,
                "price": 28000.00,
                "currency": "BDT",
                "duration_hours": 42.0,
                "thumbnail_url": "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=600"
            },
            {
                "title": "Cybersecurity Essentials & Threat Intelligence",
                "slug": "cybersecurity-essentials-threat-intelligence",
                "short_description": "Foundational security concepts, SIEM monitoring, threat hunting, and SOC analyst workflows.",
                "description": "Learn modern defensive security: threat intelligence frameworks (MITRE ATT&CK), log analysis, incident response, network traffic inspection, and malware analysis fundamentals.",
                "level": CourseLevel.BEGINNER,
                "price": 18000.00,
                "currency": "BDT",
                "duration_hours": 24.0,
                "thumbnail_url": "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=600"
            }
        ]

        created_courses = []
        for cdata in sample_courses_data:
            c_stmt = select(Course).where(Course.slug == cdata["slug"])
            course = (await db.execute(c_stmt)).scalar_one_or_none()
            if not course:
                course = Course(
                    title=cdata["title"],
                    slug=cdata["slug"],
                    short_description=cdata["short_description"],
                    description=cdata["description"],
                    level=cdata["level"],
                    price=cdata["price"],
                    currency=cdata.get("currency", "BDT"),
                    duration_hours=cdata["duration_hours"],
                    status=CourseStatus.PUBLISHED,
                    thumbnail_url=cdata["thumbnail_url"],
                    instructor_id=admin_user.id
                )
                db.add(course)
                await db.flush()

                # Add sample modules and lessons
                mod1 = Module(course_id=course.id, title="Module 1: Foundations & Architecture", order=1)
                mod2 = Module(course_id=course.id, title="Module 2: Practical Exploitation & Defense", order=2)
                db.add_all([mod1, mod2])
                await db.flush()

                les1 = Lesson(module_id=mod1.id, title="1.1 Overview & System Architecture", content_type=ContentType.TEXT, content_body="Welcome to the course overview. This lesson lays the foundation.", duration_minutes=15, order=1)
                les2 = Lesson(module_id=mod1.id, title="1.2 Core Security Protocols & Standards", content_type=ContentType.VIDEO, content_url="https://www.youtube.com/embed/dQw4w9WgXcQ", duration_minutes=25, order=2)
                les3 = Lesson(module_id=mod2.id, title="2.1 Vulnerability Assessment Lab", content_type=ContentType.ASSIGNMENT, content_body="Hands-on lab assignment: analyze the target network topology.", duration_minutes=45, order=1)
                db.add_all([les1, les2, les3])
                await db.flush()

            created_courses.append(course)

        # 7. Seed Enrollments for Admin and Student
        for target_user in [admin_user, student_user]:
            for course in created_courses:
                enr_stmt = select(Enrollment).where(Enrollment.user_id == target_user.id, Enrollment.course_id == course.id)
                existing_enr = (await db.execute(enr_stmt)).scalar_one_or_none()
                if not existing_enr:
                    enr = Enrollment(
                        user_id=target_user.id,
                        course_id=course.id,
                        status=EnrollmentStatus.ACTIVE,
                        enrolled_at=datetime.now(timezone.utc)
                    )
                    db.add(enr)

        await db.commit()
        print("[SUCCESS] Seed complete: roles, permissions, admin & student users, published courses, modules, and active enrollments created.")


if __name__ == "__main__":
    asyncio.run(seed())

