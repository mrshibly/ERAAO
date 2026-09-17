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
from app.models.category import Category
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

        # 6. Seed Categories
        categories_data = [
            {"name": "English Communication", "slug": "english-communication"},
            {"name": "Artificial Intelligence", "slug": "artificial-intelligence"},
            {"name": "Cybersecurity", "slug": "cybersecurity"},
        ]
        categories = {}
        for cdata in categories_data:
            cat_stmt = select(Category).where(Category.slug == cdata["slug"])
            cat = (await db.execute(cat_stmt)).scalar_one_or_none()
            if not cat:
                cat = Category(name=cdata["name"], slug=cdata["slug"])
                db.add(cat)
                await db.flush()
            categories[cdata["slug"]] = cat

        # 7. Seed Authentic Bootcamps from Official Curriculum PDFs
        authentic_courses_data = [
            {
                "title": "Basic English: Build a Usable Foundation",
                "slug": "basic-english-foundation",
                "short_description": "Turn fragmented school English into a usable spoken system. Learn through context, pattern building, and real-life practice without memorizing rules.",
                "description": "Build a usable English foundation from the English you already half-know. Built entirely on the 6-stage ERAAO Learning Cycle: Understand -> Notice -> Build -> Practice -> Use -> Recall. 12 weeks, 36 classes.",
                "level": CourseLevel.BEGINNER,
                "price": 12000.00,
                "currency": "BDT",
                "duration_hours": 36.0,
                "thumbnail_url": "/banners/banner-spoken-english.jpg",
                "category_slug": "english-communication",
                "modules": [
                    ("Module 1: Reset Your English", ["Why Knowing English Doesn't Mean Being Able to Use It", "The ERAAO Learning Cycle", "Removing Fear of Mistakes"]),
                    ("Module 2: Building the English Sentence", ["The SVO Engine: Subject, Verb, Object", "Transforming Statements: Positive & Negative", "Question Formation Patterns"]),
                    ("Module 3: The Core Verb System", ["Mastering Be, Have, and Do", "Action Verbs & Everyday Combinations", "Modal Verbs: Can, Must, Should"]),
                    ("Module 4: Time & Basic Grammar", ["Present Simple vs. Continuous", "Narrating Past & Future Plans", "Time Markers & Sequence Linking"]),
                    ("Module 5: Everyday English Patterns", ["High-Frequency Conversational Formulas", "Expressing Preferences & Personal Views", "Everyday Q&A Dialogue Drills"]),
                    ("Module 6: Listening to Understand", ["Breaking the Mental Translation Habit", "Connected Speech & Sound Reduction", "Context-Based Inference Lab"]),
                    ("Module 7: Speaking from Patterns", ["Substitution Techniques & Rapid Swapping", "Spontaneous Response Drills", "Building Multi-Turn Dialogues"]),
                    ("Module 8: Writing Your English", ["Structuring Clear, Readable Paragraphs", "Describing, Explaining & Narrating", "Practical Messages & Written Summaries"]),
                    ("Module 9: English in Real Life & Final Integration", ["Handling Everyday Phone Calls", "Workplace Scenarios & Explaining Problems", "Full Course Recall & Capstone Assessment"])
                ]
            },
            {
                "title": "English for Freelancers: International Client Communication",
                "slug": "english-for-freelancers",
                "short_description": "Communicate professionally, pitch proposals, run client calls, negotiate deadlines and scope, and win high-ticket international contracts.",
                "description": "Professional communication with real international clients. Covers proposal writing, pricing negotiation, client video calls, email protocols, managing scope changes, and ends with a complete 2-week end-to-end client simulation.",
                "level": CourseLevel.INTERMEDIATE,
                "price": 15000.00,
                "currency": "BDT",
                "duration_hours": 36.0,
                "thumbnail_url": "/banners/banner-spoken-english.jpg",
                "category_slug": "english-communication",
                "modules": [
                    ("Module 1: Thinking in Professional English", ["Casual vs. Professional English", "Direct vs. Indirect Business Communication", "Introducing Your Skills Professionally"]),
                    ("Module 2: Freelancer Vocabulary in Context", ["Scope, Deliverables, Milestones & Revisions", "Technical vs. Non-Technical Phrasing", "Contextual Vocabulary Practice"]),
                    ("Module 3: Client Conversations & First Discovery Calls", ["Opening Discovery Calls Gracefully", "Asking High-Value Clarifying Questions", "Summarizing Client Requirements Back"]),
                    ("Module 4: Professional Sentence Construction", ["Softening Direct Commands with Modals", "Making Suggestions Politely", "Sentence Transformation Workshop"]),
                    ("Module 5: Client Chat & Async Messaging", ["Concise, Actionable Standup Updates", "Explaining Roadblocks Without Panic", "Slack & Upwork Messaging Protocols"]),
                    ("Module 6: Proposal Writing & Pricing Pitches", ["The Problem-First Proposal Framework", "Justifying Value & Framing Pricing", "Drafting & Verbal Pitch Presentation"]),
                    ("Module 7: Professional Email English", ["Subject Lines That Get Opened", "Formal Milestone & Invoice Emails", "10-Scenario Email Playbook"]),
                    ("Module 8: Live Client Meetings & Presentations", ["Opening Zoom/Meet Calls Smoothly", "Presenting Work & Screen Sharing", "Handling Critical Feedback on Camera"]),
                    ("Module 9: Difficult Situations & Contract Negotiations", ["Identifying Scope Creep Professionally", "Following Up on Overdue Invoices", "The Art of Saying No Professionally"]),
                    ("Module 10: Full End-to-End Client Simulation", ["Simulation Phase 1: Brief & Proposal", "Simulation Phase 2: Live Negotiation & Sign-Off", "Final Evaluation & Portfolio Packaging"])
                ]
            },
            {
                "title": "Advanced English: Natural Fluency & Nuanced Communication",
                "slug": "advanced-english-fluency",
                "short_description": "Move from consciously constructing English to expressing complex, abstract thoughts naturally with tone, subtlety, and persuasive power.",
                "description": "Not harder grammar — move from constructing English consciously to expressing complex thought naturally. Master collocations, fast connected speech, persuasive rhetoric, cultural subtext, and executive discussions.",
                "level": CourseLevel.ADVANCED,
                "price": 18000.00,
                "currency": "BDT",
                "duration_hours": 36.0,
                "thumbnail_url": "/banners/banner-spoken-english.jpg",
                "category_slug": "english-communication",
                "modules": [
                    ("Module 1: Beyond Basic Sentences", ["Logical Connectors That Elevate Cohesion", "Comparing Conflicting Viewpoints", "Substantiating Assertions with Examples"]),
                    ("Module 2: Advanced Sentence Structure", ["Relative Clauses & Subordination", "Participle Clauses for Concise Speech", "Mixed Conditionals in Decision-Making"]),
                    ("Module 3: Grammar Through Meaning", ["Diplomatic Passive Voice", "Narrative Mastery: Past Perfect Nuance", "Inversion & Fronting for Emphasis"]),
                    ("Module 4: Natural Vocabulary, Collocations & Phrasal Verbs", ["Technology Collocations Bank", "Phrasal Verbs in Professional Settings", "Register Switching: Casual to Boardroom"]),
                    ("Module 5: Natural Listening Deep-Focus Lab", ["Decoding Reduced Vowels & Glottals", "Extended Multi-Speaker Audio Lab", "Inference & Reading Subtext"]),
                    ("Module 6: Fluent Speaking & Persuasive Rhetoric", ["The PREP Framework in Action", "Executive Storytelling Structures", "Constructive Rebuttal Under Pressure"]),
                    ("Module 7: Expressing Complex & Abstract Ideas", ["Multi-Factor Causality Analysis", "Philosophical & Strategic Tradeoffs", "Executive Debate Round"]),
                    ("Module 8: Advanced Professional Writing", ["Executive Summary Writing", "Analytical Report Writing", "Self-Editing Protocols"]),
                    ("Module 9: Natural Communication & Cultural Nuance", ["Indirect Criticism & Constructive Feedback", "Navigating Humor & Organic Rapport", "Cross-Cultural Subtext Mastery"]),
                    ("Module 10: Fluency Integration & Capstone Defense", ["Capstone Presentation Preparation", "Live Presentation & Panel Q&A Defense", "Final Diagnostic Report & Award"])
                ]
            },
            {
                "title": "Practical AI Automation & Intelligent Agents",
                "slug": "ai-automation-agents",
                "short_description": "Build autonomous multi-agent workflows, custom LLM pipelines, and no-code client automations with LangChain, Make, and Python.",
                "description": "A hands-on practitioner bootcamp focused on building production-grade AI solutions. Master prompt engineering, tool calling, local and cloud LLMs, vector search, and client workflow automation without theoretical fluff.",
                "level": CourseLevel.INTERMEDIATE,
                "price": 25000.00,
                "currency": "BDT",
                "duration_hours": 36.0,
                "thumbnail_url": "/banners/banner-ai-automation.jpg",
                "category_slug": "artificial-intelligence",
                "modules": [
                    ("Module 1: Foundations of Modern AI & Agentic Systems", ["Landscape of Modern Models & Token Economics", "Configuring Developer Sandbox", "First Structured JSON Completion Pipeline"]),
                    ("Module 2: Advanced Prompt Engineering & Function Calling", ["Role Framing & Chain-of-Thought", "Function Calling & Pydantic Tool Definitions", "Lab: Autonomous Calendar & Weather Agent"]),
                    ("Module 3: Vector Embeddings & Production RAG Pipelines", ["Embedding Models & Chunking Strategies", "Vector Search with PostgreSQL pgvector", "Lab: Company Policy Knowledge Base Assistant"]),
                    ("Module 4: Autonomous Multi-Agent Orchestration", ["State Management in Multi-Turn Agents", "Building Supervisor-Worker Agent Teams", "Lab: Competitor Intelligence Agent"]),
                    ("Module 5: Low-Code & No-Code Automations (n8n & Make)", ["Self-Hosting n8n & Webhooks", "Inbound Lead Qualification Flow", "Lab: Automated Customer Support Ticket Routing"]),
                    ("Module 6: Capstone Project & Client Delivery Packaging", ["Cloud Deployment on Docker & Supabase", "Monitoring Token Consumption & Latency", "Capstone Presentation & Client Proposal"])
                ]
            },
            {
                "title": "Offensive Cyber Security & Practical Penetration Testing",
                "slug": "offensive-cyber-security",
                "short_description": "Master ethical hacking, network reconnaissance, web app exploitation, privilege escalation, and Active Directory penetration in live browser labs.",
                "description": "Zero-fluff offensive security training conducted inside browser-based virtual labs. Learn reconnaissance, web app attacks (OWASP Top 10), privilege escalation, network exploitation, and professional pentest report delivery.",
                "level": CourseLevel.INTERMEDIATE,
                "price": 28000.00,
                "currency": "BDT",
                "duration_hours": 36.0,
                "thumbnail_url": "/banners/banner-cyber-security.jpg",
                "category_slug": "cybersecurity",
                "modules": [
                    ("Module 1: Offensive Security Foundations & Reconnaissance", ["Legal Scopes, Ethics & Rules of Engagement", "Passive & Active Reconnaissance", "Lab: Precision Host & Service Discovery"]),
                    ("Module 2: Web Application Security (OWASP Top 10)", ["Burp Suite Workflow: Interception & Intruder", "Exploiting SQL Injection: Union & Error", "Lab: Bypassing Auth & Exploiting IDORs"]),
                    ("Module 3: Network Exploitation & Vulnerability Assessment", ["Vulnerability Scanning Methodologies", "Metasploit Framework & Exploit Adaptation", "Lab: Remote Code Execution on Legacy Daemons"]),
                    ("Module 4: Linux & Windows Privilege Escalation", ["Linux PrivEsc: SUID, Capabilities, Sudo", "Windows PrivEsc: Token Manipulation & DLLs", "Lab: Rooting Two Target Enterprise Machines"]),
                    ("Module 5: Active Directory Domain Compromise", ["Active Directory & Kerberos Protocol", "Domain Mapping with BloodHound", "Lab: From Low-Priv User to Domain Admin"]),
                    ("Module 6: Capstone Pentest & Professional Report Delivery", ["CVSS v3.1 Scoring & Remediation Writing", "Enterprise Pentest Report Deliverable", "Capstone Defense Before Security Board"])
                ]
            }
        ]

        created_courses = []
        for cdata in authentic_courses_data:
            c_stmt = select(Course).where(Course.slug == cdata["slug"])
            course = (await db.execute(c_stmt)).scalar_one_or_none()
            cat = categories.get(cdata["category_slug"])
            cat_id = cat.id if cat else None

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
                    category_id=cat_id,
                    instructor_id=admin_user.id
                )
                db.add(course)
                await db.flush()

                # Add modules and lessons
                for m_idx, (m_title, lessons_list) in enumerate(cdata["modules"]):
                    mod = Module(course_id=course.id, title=m_title, order=m_idx + 1)
                    db.add(mod)
                    await db.flush()

                    for l_idx, l_title in enumerate(lessons_list):
                        les = Lesson(
                            module_id=mod.id,
                            title=l_title,
                            content_type="video" if l_idx % 2 == 1 else "text",
                            content_body=f"Curriculum module lecture: {l_title}",
                            duration_minutes=25,
                            order=l_idx + 1
                        )
                        db.add(les)
                    await db.flush()

            created_courses.append(course)

        # 8. Seed Enrollments for Admin and Student
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
        print("[SUCCESS] Seed complete: categories, authentic bootcamps, modules, lessons, and enrollments created.")


if __name__ == "__main__":
    asyncio.run(seed())

