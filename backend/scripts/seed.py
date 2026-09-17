"""
Comprehensive Production Seeder for ERAAO Academy.
Extracts and populates authentic bootcamps from official curriculum PDFs:
- ERAAO_Academy_Ultimate_Course_Module.pdf
- ERAAO_Course_Modules_Only.pdf

Operates directly with asyncpg for blazing-fast, robust PostgreSQL execution.
"""
import asyncio
import os
import uuid
from datetime import date, datetime, timezone
import asyncpg
from dotenv import load_dotenv

# Load backend/.env
load_dotenv(os.path.join(os.path.dirname(__file__), "..", ".env"))

RAW_DATABASE_URL = os.getenv("DATABASE_URL")
if not RAW_DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is required to run seed.py")

# Convert postgresql+asyncpg:// to postgresql:// for asyncpg
DATABASE_URL = RAW_DATABASE_URL.replace("postgresql+asyncpg://", "postgresql://")

DEFAULT_ROLES = [
    ("admin", "Platform administrator with full governance access"),
    ("instructor", "Course and cohort instructor"),
    ("student", "Enrolled learner"),
    ("corporate_client", "Enterprise client and team sponsor")
]

RESOURCES = [
    "users", "courses", "enrollments", "blog", "services", "bookings",
    "contacts", "quotes", "certificates", "cohorts", "tickets", "careers",
    "audit_logs", "orders"
]
ACTIONS = ["create", "read", "update", "delete"]

ROLE_PERMISSIONS = {
    "admin": [(r, a) for r in RESOURCES for a in ACTIONS],
    "instructor": [
        ("courses", "create"), ("courses", "read"), ("courses", "update"),
        ("enrollments", "read"), ("cohorts", "create"), ("cohorts", "read"),
        ("cohorts", "update")
    ],
    "student": [
        ("courses", "read"), ("enrollments", "create"), ("enrollments", "read"),
        ("tickets", "create"), ("tickets", "read"), ("certificates", "read")
    ],
    "corporate_client": [
        ("enrollments", "read"), ("cohorts", "read"), ("orders", "read")
    ],
}

AUTHENTIC_COURSES = [
    # ═══════════════════════════════════════════════════════════════
    # TRACK 1: BASIC ENGLISH
    # ═══════════════════════════════════════════════════════════════
    {
        "title": "Basic English: Build a Usable Foundation",
        "slug": "basic-english-foundation",
        "short_description": "Turn fragmented school English into a usable spoken system. Learn through context, pattern building, and real-life practice without memorizing rules.",
        "description": "Build a usable English foundation from the English you already half-know. Built entirely on the 6-stage ERAAO Learning Cycle: Understand -> Notice -> Build -> Practice -> Use -> Recall. 12 weeks, 36 classes (3 classes per week, 60 mins each). Every week includes 1 free physical worksheet per module and self-made listening audio packs.",
        "level": "BEGINNER",
        "price": 12000.00,
        "currency": "BDT",
        "duration_hours": 36.0,
        "thumbnail_url": "/banners/banner-spoken-english.jpg",
        "category_slug": "english-communication",
        "modules": [
            {
                "title": "Module 1: Reset Your English",
                "description": "Learning Method: Understand -> Notice -> Use. Output: Student explains their new approach to English and begins learning without depending on memorisation.",
                "lessons": [
                    ("Why Knowing English Doesn't Mean Being Able to Use It", True, "Understand the difference between knowing, understanding, and actively using English without mental translation."),
                    ("The ERAAO 6-Stage Learning Cycle", False, "How English should be approached: Understand, Notice, Build, Practice, Use, Recall."),
                    ("Removing Fear of Making Mistakes", False, "Overcoming psychological barriers, hesitation, and fear of judgment in spoken conversation.")
                ]
            },
            {
                "title": "Module 2: Building the English Sentence",
                "description": "Learning Method: Pattern recognition -> Sentence construction -> Variation. Output: Student creates their own sentences instead of memorising complete sentences.",
                "lessons": [
                    ("The SVO Engine: Subject, Verb, Object, Complement", True, "Mastering the foundational English sentence order and grammatical skeleton."),
                    ("Transforming Statements: Positive & Negative", False, "Changing declarative thoughts into negative and emphatic sentence structures."),
                    ("Question Formation Patterns & Short Answers", False, "Building open and closed questions with natural conversational short answers.")
                ]
            },
            {
                "title": "Module 3: The Core Verb System",
                "description": "Learning Method: Repeated exposure to verbs across real situations. Output: Student uses common verbs naturally in different sentence structures.",
                "lessons": [
                    ("Mastering Be, Have, and Do", False, "The three pillars of English verbs and how they function as both main and auxiliary verbs."),
                    ("Action Verbs & Everyday Combinations", False, "High-frequency daily verbs, collocations, and common verb combinations."),
                    ("Modal Verbs: Can, Must, Should, Need", False, "Expressing ability, necessity, obligation, and polite requests.")
                ]
            },
            {
                "title": "Module 4: Time & Basic Grammar",
                "description": "Learning Method: Meaning first -> Pattern -> Grammar explanation -> Practice -> Communication. Output: Student can talk about past, present, and future plans.",
                "lessons": [
                    ("Present Simple vs. Continuous in Real Life", False, "Differentiating habits and general truths from ongoing actions without rule memorization."),
                    ("Narrating Past Events & Future Plans", False, "Talking about what happened yesterday, what is planned for tomorrow, and sequencing."),
                    ("Time Expressions & Aspect Linking", False, "Connecting time markers (ago, since, during, while) with accurate verb structures.")
                ]
            },
            {
                "title": "Module 5: Everyday English Patterns",
                "description": "Learning Method: One pattern -> many contexts -> many variations. Output: Student produces personalised English rather than reciting model answers.",
                "lessons": [
                    ("Introducing Yourself, Family & Daily Routines", False, "Creating personalized conversational introductions that feel authentic and engaging."),
                    ("Discussing Work, Study, Wants & Needs", False, "Expressing personal desires, professional background, and practical requirements."),
                    ("Asking & Answering Spontaneous Questions", False, "Handling rapid everyday dialogue without freezing or translating.")
                ]
            },
            {
                "title": "Module 6: Listening to Understand",
                "description": "Learning Method: Hear -> Understand -> Hear again -> Notice -> Reproduce. Output: Student understands increasingly natural everyday English.",
                "lessons": [
                    ("Breaking the Mental Translation Habit", False, "Techniques for processing English audio directly without translating to native language."),
                    ("Connected Speech & Sound Reductions", False, "Decoding weak forms, contractions, dropped consonants, and linking sounds in fast speech."),
                    ("Context-Based Inference Lab", False, "Extracting primary meaning from audio when encountering unknown words.")
                ]
            },
            {
                "title": "Module 7: Speaking from Patterns",
                "description": "Learning Method: Copy -> Change -> Create -> Communicate. Output: Student answers questions and creates sentences without memorised scripts.",
                "lessons": [
                    ("Sentence Transformation & Rapid Substitution Drills", False, "Swapping subjects, verbs, and objects on the fly to produce hundreds of variations."),
                    ("Moving from Controlled to Personal Speaking", False, "Transferring structured drills into spontaneous personal anecdotes and opinions."),
                    ("Building Multi-Turn Dialogues", False, "Sustaining a conversation past single-sentence responses with follow-up queries.")
                ]
            },
            {
                "title": "Module 8: Writing Your English",
                "description": "Learning Method: Sentence -> Connected sentences -> Paragraph -> Real communication. Output: Student writes clear everyday English.",
                "lessons": [
                    ("Sentence Writing & Smooth Connectors", False, "Combining simple sentences into clear, coherent compound structures."),
                    ("Structuring Clear Everyday Paragraphs", False, "Topic sentences, supporting details, and concluding thoughts in clean English."),
                    ("Practical Messages, Notes & Daily Emails", False, "Writing functional text messages, short work updates, and everyday explanations.")
                ]
            },
            {
                "title": "Module 9: English in Real Life & Capstone",
                "description": "Learning Method: Applying every previous module together in realistic situations. Output: Student handles common English situations confidently.",
                "lessons": [
                    ("Handling Everyday Phone Calls & Inquiries", False, "Phone etiquette, clarifying audio over the phone, and asking for details."),
                    ("Workplace Scenarios & Explaining Problems", False, "Reporting issues, asking for assistance, and social English with colleagues."),
                    ("Full Course Recall & Capstone Speaking Assessment", False, "Comprehensive active recall covering all 9 modules and final oral assessment.")
                ]
            }
        ]
    },

    # ═══════════════════════════════════════════════════════════════
    # TRACK 2: ENGLISH FOR FREELANCERS & REMOTE PROFESSIONALS
    # ═══════════════════════════════════════════════════════════════
    {
        "title": "English for Freelancers: International Client Communication",
        "slug": "english-for-freelancers",
        "short_description": "Communicate professionally, pitch winning proposals, run smooth discovery calls, negotiate rates and scope, and win high-ticket international contracts.",
        "description": "Professional communication with real international clients. Covers proposal writing, pricing negotiation, client video calls, email protocols, managing scope changes, and ends with a complete 2-week end-to-end client simulation. 12 weeks, 36 classes.",
        "level": "INTERMEDIATE",
        "price": 15000.00,
        "currency": "BDT",
        "duration_hours": 36.0,
        "thumbnail_url": "/banners/banner-spoken-english.jpg",
        "category_slug": "english-communication",
        "modules": [
            {
                "title": "Module 1: Thinking in Professional English",
                "description": "Contrast and awareness building: comparing classroom English to real professional English. Output: Student understands how professional English differs from classroom English.",
                "lessons": [
                    ("Casual vs. Professional English: The International Standard", True, "Analyzing client expectations across US, UK, and European business cultures."),
                    ("Direct vs. Indirect Communication Nuances", False, "How direct phrasing can sound demanding and how to soften requests with diplomacy."),
                    ("The Professional Communicator Mindset", False, "Moving from a student answering questions to a trusted consultant providing solutions.")
                ]
            },
            {
                "title": "Module 2: Freelancer Vocabulary in Context",
                "description": "Vocabulary learned inside real situations, never as isolated word lists. Output: Student understands and uses essential freelance vocabulary naturally.",
                "lessons": [
                    ("Scope, Deliverables, Milestones & Revisions", False, "The core terminology of contracts, deliverables, and service boundaries."),
                    ("Technical Phrasing vs. Plain Client Explanations", False, "Translating complex code/design jargon into business value the client cares about."),
                    ("Contextual Vocabulary & Agreement Language", False, "High-stakes terms: SLA, retainer, deposit, sign-off, bottleneck, and turnaround.")
                ]
            },
            {
                "title": "Module 3: Client Conversations & First Discovery Calls",
                "description": "Guided role-play built from real client-conversation situations. Output: Student can open and hold a client discovery conversation without a script.",
                "lessons": [
                    ("Opening Discovery Calls Confidently & Setting Agendas", False, "How to greet the client, establish rapport, and take control of the meeting structure."),
                    ("Asking High-Value Clarifying Questions", False, "Probing deeper into client pain points, timeline constraints, and target outcomes."),
                    ("Summarizing Client Requirements Back", False, "The reflective listening technique that demonstrates immediate authority and competence.")
                ]
            },
            {
                "title": "Module 4: Professional Sentence Construction",
                "description": "The learner is taught the structure behind communication, not isolated lines. Output: Student can turn simple English into professional communication.",
                "lessons": [
                    ("Softening Direct Commands with Modals & Politeness", False, "Converting 'Send the file' into polished, professional requests."),
                    ("Making Constructive Suggestions Politely", False, "Proposing alternative approaches without undermining the client's authority."),
                    ("Conditional Phrasing & Agreement/Disagreement", False, "Using 'If we... then we can...' to protect project boundaries diplomatically.")
                ]
            },
            {
                "title": "Module 5: Client Chat & Async Messaging",
                "description": "Simulated real chat threads with client-style messages. Output: Student communicates through Slack/Upwork chat confidently without freezing.",
                "lessons": [
                    ("Concise, Actionable Standup Updates", False, "Formatting daily and weekly progress updates that clients love reading."),
                    ("Explaining Technical Roadblocks Without Panic", False, "How to report unexpected bugs or delays while presenting clear solutions."),
                    ("Slack, Upwork & WhatsApp Client Etiquette", False, "Response timing, tone calibration, voice note etiquette, and async clarity.")
                ]
            },
            {
                "title": "Module 6: Proposal Writing & Pricing Pitches",
                "description": "Structured writing practice moving from outline to full proposal. Output: Student writes professional proposals instead of copying templates.",
                "lessons": [
                    ("The Problem-First Proposal Framework", False, "Leading with the client's specific problem rather than your personal biography."),
                    ("Justifying Value & Framing Pricing", False, "Communicating value-based fees, package options, and payment milestones."),
                    ("Verbal Pitch Presentation & Closing Hooks", False, "Presenting your proposal verbally on camera and inviting the client to start.")
                ]
            },
            {
                "title": "Module 7: Professional Email English",
                "description": "Model emails deconstructed, then rebuilt by the student for their own situations. Output: Student's emails read as professional, not translated.",
                "lessons": [
                    ("Subject Lines That Get Opened & Read", False, "Crafting high-priority subject lines that avoid spam filters and grab attention."),
                    ("Milestone Delivery & Invoicing Email Protocols", False, "Delivering completed files, requesting sign-off, and sending polite invoices."),
                    ("The 10-Scenario Freelancer Email Playbook", False, "Templates and variations for revisions, out-of-office, referrals, and testimonials.")
                ]
            },
            {
                "title": "Module 8: Live Client Meetings & Presentations",
                "description": "Simulated full-length client meeting practice. Output: Student can participate in an international client meeting with confidence.",
                "lessons": [
                    ("Opening Zoom/Meet Calls Smoothly", False, "Audio check, greeting, establishing connection, and screen sharing transitions."),
                    ("Presenting Work & Live Screen Share Demos", False, "Guiding the client visually through prototypes, codebases, or wireframes."),
                    ("Handling Critical Feedback & Pushback on Camera", False, "Maintaining composure, acknowledging feedback, and documenting action points.")
                ]
            },
            {
                "title": "Module 9: Difficult Client Situations & Scope Negotiation",
                "description": "Realistic conflict scenarios with guided professional responses. Output: Student protects themselves professionally without sounding rude or weak.",
                "lessons": [
                    ("Identifying & Professionally Halting Scope Creep", False, "How to say 'That's outside our initial scope, here is how we can add it'."),
                    ("Following Up on Overdue Invoices Firmly", False, "Escalating payment reminders from gentle inquiries to formal work pauses."),
                    ("The Art of Saying 'No' Professionally", False, "Declining unrealistic deadlines, excessive revisions, or inappropriate requests.")
                ]
            },
            {
                "title": "Module 10: Full End-to-End Client Simulation",
                "description": "Full end-to-end simulation combining every previous module. Output: Student completes an entire freelance project cycle in English.",
                "lessons": [
                    ("Simulation Phase 1: Client Brief & Proposal Drafting", False, "Deconstructing an actual international client brief and writing a proposal."),
                    ("Simulation Phase 2: Live Video Call Negotiation & Sign-Off", False, "Role-playing a live negotiation call handling price objections and timeline."),
                    ("Simulation Phase 3: Final Delivery & Portfolio Packaging", False, "Submitting the final deliverables, collecting a 5-star review, and packaging.")
                ]
            }
        ]
    },

    # ═══════════════════════════════════════════════════════════════
    # TRACK 3: ADVANCED ENGLISH FLUENCY & NUANCED COMMUNICATION
    # ═══════════════════════════════════════════════════════════════
    {
        "title": "Advanced English: Natural Fluency & Nuanced Communication",
        "slug": "advanced-english-fluency",
        "short_description": "Move from consciously constructing English to expressing complex, abstract thoughts naturally with tone, subtlety, and persuasive power.",
        "description": "Not harder grammar — this course moves the student from constructing English consciously to expressing complex thought naturally. Master collocations, fast connected speech, persuasive rhetoric, cultural subtext, and executive discussions. 12 weeks, 36 classes.",
        "level": "ADVANCED",
        "price": 18000.00,
        "currency": "BDT",
        "duration_hours": 36.0,
        "thumbnail_url": "/banners/banner-spoken-english.jpg",
        "category_slug": "english-communication",
        "modules": [
            {
                "title": "Module 1: Beyond Basic Sentences",
                "description": "Guided expansion from single ideas to fuller, reasoned thoughts. Output: Student moves from 'I like it' to expressing why, how, and under what conditions.",
                "lessons": [
                    ("Logical Connectors That Elevate Cohesion", True, "Using discourse markers (furthermore, nonetheless, conversely) naturally."),
                    ("Comparing Conflicting Viewpoints", False, "Synthesizing multi-sided arguments without sounding repetitive or simplistic."),
                    ("Substantiating Assertions with Evidence", False, "Grounding opinions in data, anecdotes, analogies, and logical rationale.")
                ]
            },
            {
                "title": "Module 2: Advanced Sentence Structure",
                "description": "Pattern exposure followed by guided sentence transformation. Output: Student creates sophisticated sentences without memorising complicated formulas.",
                "lessons": [
                    ("Relative Clauses & Elegant Subordination", False, "Eliminating clunky repetitions using non-defining relative clauses."),
                    ("Participle Clauses for Concise Speech & Writing", False, "Condensing complex sentences using present and past participle modifiers."),
                    ("Mixed Conditionals in Strategic Decision-Making", False, "Expressing past hypothetical causes with present real-world consequences.")
                ]
            },
            {
                "title": "Module 3: Grammar Through Meaning",
                "description": "Meaning -> Exposure -> Pattern -> Explanation -> Use. Output: Student understands why advanced structures are used and applies them appropriately.",
                "lessons": [
                    ("Diplomatic Passive Voice in Corporate Contexts", False, "Describing mistakes and delays without assigning personal blame."),
                    ("Narrative Mastery: Past Perfect & Aspect Nuances", False, "Managing complex timelines when explaining background stories and project evolutions."),
                    ("Inversion & Fronting for Rhetorical Emphasis", False, "Using advanced structures like 'Not only did we...' and 'Rarely has...' for executive impact.")
                ]
            },
            {
                "title": "Module 4: Natural Vocabulary, Collocations & Phrasal Verbs",
                "description": "Exposure to natural word pairings instead of isolated word lists. Output: Student stops translating individual words and begins thinking in natural combinations.",
                "lessons": [
                    ("Executive & Technology Collocations Bank", False, "Mastering verb-noun and adjective-noun combinations used in modern leadership."),
                    ("Phrasal Verbs in Professional & Strategic Settings", False, "Natural use of multi-word verbs that sound native and fluent."),
                    ("Register Switching: Casual to Boardroom", False, "Modulating tone from friendly watercooler chat to formal board presentations.")
                ]
            },
            {
                "title": "Module 5: Natural Listening Deep-Focus Lab",
                "description": "Exposure to real, unscripted speaking styles rather than slow classroom audio. Output: Student understands natural English and can follow real conversations.",
                "lessons": [
                    ("Decoding Reduced Vowels, Elision & Glottals", False, "Training the ear to catch words when native speakers swallow syllables and link sounds."),
                    ("Extended Multi-Speaker Audio Lab", False, "Following fast-paced podcasts, debate panels, and multi-speaker panel discussions."),
                    ("Inferring Tone, Subtext, Irony & Speaker Intent", False, "Detecting sarcasm, hesitation, unspoken skepticism, and enthusiasm in voice inflection.")
                ]
            },
            {
                "title": "Module 6: Fluent Speaking & Persuasive Rhetoric",
                "description": "Extended, less-controlled speaking practice. Output: Student maintains longer conversations without mentally constructing every sentence.",
                "lessons": [
                    ("The PREP Framework in Action", False, "Point, Reason, Example, Point: structuring impromptu speeches in 3 seconds."),
                    ("Executive Storytelling & Narrative Arcs", False, "Hooking an audience, creating tension, and delivering memorable takeaways."),
                    ("Constructive Rebuttal Under Pressure", False, "Defending ideas during pushback without sounding defensive or aggressive.")
                ]
            },
            {
                "title": "Module 7: Expressing Complex & Abstract Ideas",
                "description": "Discussion-based practice on real, substantial topics. Output: Student can explain what they actually think — not just memorised opinions.",
                "lessons": [
                    ("Multi-Factor Causality & Systematic Analysis", False, "Breaking down interconnected economic, technological, and ethical dilemmas."),
                    ("Philosophical & Strategic Tradeoffs", False, "Articulating opportunity costs, risk tolerance, and long-term vision."),
                    ("Executive Debate Round", False, "Participating in high-stakes structured debates with real-time peer critiques.")
                ]
            },
            {
                "title": "Module 8: Advanced Professional Writing",
                "description": "Draft -> structure -> refine. Output: Student produces organised, natural written English that reads as considered, not translated.",
                "lessons": [
                    ("Executive Summary Writing", False, "Distilling 30-page documents into high-impact single-page executive briefings."),
                    ("Analytical Report Writing & Synthesis", False, "Drafting whitepapers, business proposals, and architectural assessments."),
                    ("Self-Editing & Precision Protocols", False, "Cutting fluff, tightening passive sprawl, and enhancing punchiness.")
                ]
            },
            {
                "title": "Module 9: Natural Communication & Cultural Nuance",
                "description": "Exposure to subtext and cultural context. Output: Student understands not only what English says, but what English means in context.",
                "lessons": [
                    ("Indirect Criticism & Constructive Feedback", False, "Mastering the British and American diplomatic feedback traditions."),
                    ("Navigating Humor, Irony & Organic Rapport", False, "Understanding cultural references, self-deprecating humor, and situational wit."),
                    ("Cross-Cultural Subtext Mastery", False, "Navigating high-context vs. low-context business cultures seamlessly.")
                ]
            },
            {
                "title": "Module 10: Fluency Integration & Capstone Defense",
                "description": "Everything from the previous nine modules is combined and applied. Output: Student handles varied, unscripted real-life communication situations.",
                "lessons": [
                    ("Capstone Presentation Preparation", False, "Drafting and rehearsing an original 15-minute keynote presentation."),
                    ("Live Presentation & Panel Q&A Defense", False, "Delivering the presentation live before an evaluation panel with unscripted Q&A."),
                    ("Final Diagnostic Report & Certificate of Fluency", False, "Comprehensive evaluation scorecard, personal roadmap, and credential issuance.")
                ]
            }
        ]
    },

    # ═══════════════════════════════════════════════════════════════
    # TRACK 4: PRACTICAL AI AUTOMATION & INTELLIGENT AGENTS
    # ═══════════════════════════════════════════════════════════════
    {
        "title": "Practical AI Automation & Intelligent Agents",
        "slug": "ai-automation-agents",
        "short_description": "Build autonomous multi-agent workflows, custom LLM pipelines, and no-code client automations with LangChain, Make, and Python.",
        "description": "A hands-on practitioner bootcamp focused on building production-grade AI solutions. Master prompt engineering, tool calling, local and cloud LLMs, vector search, and client workflow automation without theoretical fluff. 12 weeks, 36 classes.",
        "level": "INTERMEDIATE",
        "price": 25000.00,
        "currency": "BDT",
        "duration_hours": 36.0,
        "thumbnail_url": "/banners/banner-ai-automation.jpg",
        "category_slug": "artificial-intelligence",
        "modules": [
            {
                "title": "Module 1: Foundations of Modern AI & Agentic Systems",
                "description": "Landscape of modern frontier models, token economics, and local vs. cloud environments.",
                "lessons": [
                    ("Landscape of Modern Frontier Models & Token Economics", True, "Comparing OpenAI, Claude, DeepSeek, and open weights (Llama 3)."),
                    ("Configuring Developer Sandbox & API Tooling", False, "Setting up Python virtual environments, environment keys, and rate-limiting."),
                    ("First Structured JSON Completion Pipeline", False, "Forcing schema conformance with Pydantic and JSON mode.")
                ]
            },
            {
                "title": "Module 2: Advanced Prompt Engineering & Function Calling",
                "description": "Mastering few-shot prompting, structured outputs, and dynamic external tool calling.",
                "lessons": [
                    ("Role Framing, Few-Shot & Chain-of-Thought Patterns", False, "Techniques that reduce hallucinations and enforce reasoning clarity."),
                    ("Function Calling & Pydantic Tool Definitions", False, "Defining API tools and giving models hands to interact with databases and web."),
                    ("Lab: Autonomous Calendar & Weather Agent", False, "Building an agent that checks live weather and reserves calendar slots autonomously.")
                ]
            },
            {
                "title": "Module 3: Vector Embeddings & Production RAG Pipelines",
                "description": "Chunking strategies, embedding models, and hybrid search with PostgreSQL pgvector.",
                "lessons": [
                    ("Embedding Models & Semantic Chunking Strategies", False, "Comparing text-embedding-3-small, BGE, and recursive character splitting."),
                    ("Vector Search with PostgreSQL pgvector", False, "Storing high-dimensional embeddings directly in PostgreSQL with HNSW indexes."),
                    ("Lab: Company Policy Knowledge Base Assistant", False, "Building a zero-hallucination document question-answering assistant.")
                ]
            },
            {
                "title": "Module 4: Autonomous Multi-Agent Orchestration",
                "description": "State machines, supervisor-worker topologies, and multi-turn agent loops with LangGraph.",
                "lessons": [
                    ("State Management in Multi-Turn Agents (LangGraph)", False, "Building cyclic graphs, human-in-the-loop checkpoints, and memory."),
                    ("Building Supervisor-Worker Agent Teams", False, "Coordinating specialized researcher, writer, and editor agent swarms."),
                    ("Lab: Autonomous Competitor Intelligence Agent", False, "An end-to-end agent that scrapes market data, drafts reports, and alerts via email.")
                ]
            },
            {
                "title": "Module 5: Low-Code & No-Code Automations (n8n & Make)",
                "description": "Connecting enterprise APIs, webhooks, and AI nodes inside visual workflow builders.",
                "lessons": [
                    ("Self-Hosting n8n & Setting Production Webhooks", False, "Deploying n8n on Docker, securing webhooks, and managing credentials."),
                    ("Inbound Lead Qualification Flow", False, "Scoring CRM leads using LLM sentiment analysis and enriching LinkedIn data."),
                    ("Lab: Automated Customer Support Ticket Routing", False, "Categorizing support tickets, searching vector docs, and auto-replying.")
                ]
            },
            {
                "title": "Module 6: Capstone Project & Production Deployment",
                "description": "Containerization, telemetry, latency optimization, and packaging solutions for clients.",
                "lessons": [
                    ("Cloud Deployment on Docker & Supabase", False, "Packaging agents into production Docker images with health checks."),
                    ("Monitoring Token Consumption & Latency (LangSmith)", False, "Tracing execution bottlenecks, evaluating agent outputs, and tracking spend."),
                    ("Capstone Presentation & Client Proposal Deliverable", False, "Demonstrating live production agents and packaging client service offerings.")
                ]
            }
        ]
    },

    # ═══════════════════════════════════════════════════════════════
    # TRACK 5: OFFENSIVE CYBER SECURITY & PENETRATION TESTING
    # ═══════════════════════════════════════════════════════════════
    {
        "title": "Offensive Cyber Security & Practical Penetration Testing",
        "slug": "offensive-cyber-security",
        "short_description": "Master ethical hacking, network reconnaissance, web app exploitation, privilege escalation, and Active Directory penetration in live browser labs.",
        "description": "Zero-fluff offensive security training conducted inside browser-based virtual labs. Learn reconnaissance, web app attacks (OWASP Top 10), privilege escalation, network exploitation, and professional pentest report delivery. 12 weeks, 36 classes.",
        "level": "INTERMEDIATE",
        "price": 28000.00,
        "currency": "BDT",
        "duration_hours": 36.0,
        "thumbnail_url": "/banners/banner-cyber-security.jpg",
        "category_slug": "cybersecurity",
        "modules": [
            {
                "title": "Module 1: Offensive Security Foundations & Reconnaissance",
                "description": "Legal rules of engagement, OSINT, and active network mapping techniques.",
                "lessons": [
                    ("Legal Scopes, Ethics & Rules of Engagement", True, "Understanding NDAs, permission letters, and staying within authorized testing limits."),
                    ("Passive & Active Reconnaissance Methodologies", False, "OSINT with Amass, Sublist3r, Shodan, and DNS footprinting."),
                    ("Lab: Precision Host & Service Discovery", False, "Nmap advanced scanning flags, script engine (NSE), and service fingerprinting.")
                ]
            },
            {
                "title": "Module 2: Web Application Security (OWASP Top 10)",
                "description": "Burp Suite workflows, intercepting proxies, SQL injection, and authorization bypasses.",
                "lessons": [
                    ("Burp Suite Workflow: Interception, Intruder & Repeater", False, "Configuring certificates, proxy listeners, and fuzzing payloads."),
                    ("Exploiting SQL Injection: Union, Error & Blind", False, "Manual SQLi payloads, database extraction, and bypassing WAF sanitization."),
                    ("Lab: Bypassing Auth & Exploiting IDORs", False, "Manipulating JSON web tokens and finding broken object-level authorizations.")
                ]
            },
            {
                "title": "Module 3: Network Exploitation & Vulnerability Assessment",
                "description": "Analyzing vulnerable network daemons, buffer overflows basics, and Metasploit usage.",
                "lessons": [
                    ("Vulnerability Scanning Methodologies (Nmap, Nessus)", False, "Running comprehensive scans, eliminating false positives, and prioritizing CVEs."),
                    ("Metasploit Framework & Exploit Adaptation", False, "Selecting payloads, configuring multi-handlers, and adapting public exploit scripts."),
                    ("Lab: Remote Code Execution on Enterprise Daemons", False, "Compromising vulnerable SMB, SSH, and web service daemons in live lab.")
                ]
            },
            {
                "title": "Module 4: Linux & Windows Privilege Escalation",
                "description": "From low-privilege initial access to root / SYSTEM on both major operating systems.",
                "lessons": [
                    ("Linux PrivEsc: SUID, Capabilities, Sudo & Cron", False, "Automated enumeration with LinPEAS and manual binary exploitation."),
                    ("Windows PrivEsc: Token Manipulation, DLLs & Services", False, "Unquoted service paths, always-install-elevated, and potato exploits."),
                    ("Lab: Rooting Two Target Enterprise Machines", False, "Hands-on lab escalating privileges from unprivileged www-data to root.")
                ]
            },
            {
                "title": "Module 5: Active Directory Domain Compromise",
                "description": "Enterprise network penetration: Kerberos authentication, BloodHound, and domain dominance.",
                "lessons": [
                    ("Active Directory Architecture & Kerberos Protocol", False, "Understanding SPNs, TGT, TGS, tickets, and domain controllers."),
                    ("Domain Mapping with BloodHound & Kerberoasting", False, "Extracting AD relationships and cracking Kerberos service tickets with Hashcat."),
                    ("Lab: From Low-Priv User to Domain Admin", False, "Navigating trust relationships and achieving full Active Directory domain compromise.")
                ]
            },
            {
                "title": "Module 6: Capstone Pentest & Professional Report Delivery",
                "description": "Synthesizing findings into an executive-level pentest report with CVSS scoring.",
                "lessons": [
                    ("CVSS v3.1 Scoring & Practical Remediation Writing", False, "Calculating base scores, crafting realistic patches, and strategic advice."),
                    ("Enterprise Pentest Report Deliverable", False, "Structuring executive summaries, technical methodologies, and evidence logs."),
                    ("Capstone Defense Before Executive Security Board", False, "Presenting findings and remediation priorities to simulated C-suite stakeholders.")
                ]
            }
        ]
    }
]


async def seed() -> None:
    print(f"[INFO] Connecting to database: {DATABASE_URL.split('@')[-1]}...")
    conn = await asyncpg.connect(DATABASE_URL)
    print("[INFO] Successfully connected to PostgreSQL database.")

    try:
        now = datetime.now(timezone.utc)

        # 1. Seed Roles
        role_map = {}
        for r_name, r_desc in DEFAULT_ROLES:
            existing = await conn.fetchrow("SELECT id, name FROM roles WHERE name = $1", r_name)
            if existing:
                role_map[r_name] = existing["id"]
            else:
                new_id = uuid.uuid4()
                await conn.execute(
                    "INSERT INTO roles (id, name, description, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)",
                    new_id, r_name, r_desc, now, now
                )
                role_map[r_name] = new_id
                print(f"[INFO] Created role: {r_name}")
        print(f"[INFO] Roles ready: {list(role_map.keys())}")

        # 2. Seed Permissions & Role Permissions
        perm_map = {}
        for resource in RESOURCES:
            for action in ACTIONS:
                existing = await conn.fetchrow(
                    "SELECT id FROM permissions WHERE resource = $1 AND action = $2",
                    resource, action
                )
                if existing:
                    perm_map[(resource, action)] = existing["id"]
                else:
                    new_id = uuid.uuid4()
                    await conn.execute(
                        "INSERT INTO permissions (id, resource, action, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)",
                        new_id, resource, action, now, now
                    )
                    perm_map[(resource, action)] = new_id

        for role_name, perm_list in ROLE_PERMISSIONS.items():
            r_id = role_map[role_name]
            for resource, action in perm_list:
                p_id = perm_map[(resource, action)]
                has_rp = await conn.fetchrow(
                    "SELECT id FROM role_permissions WHERE role_id = $1 AND permission_id = $2",
                    r_id, p_id
                )
                if not has_rp:
                    await conn.execute(
                        "INSERT INTO role_permissions (id, role_id, permission_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)",
                        uuid.uuid4(), r_id, p_id, now, now
                    )
        print("[INFO] Permissions and role assignments verified.")

        # 3. Ensure Mahmudur Rahman (Shibly) has admin + instructor roles
        shibly_email = "mahmudurrahman858@gmail.com"
        shibly_user = await conn.fetchrow("SELECT id, email FROM users WHERE email = $1", shibly_email)
        if not shibly_user:
            shibly_id = uuid.uuid4()
            await conn.execute(
                """
                INSERT INTO users (id, email, full_name, is_active, is_verified, onboarding_completed, created_at, updated_at)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                """,
                shibly_id, shibly_email, "Mahmudur Rahman (Shibly)", True, True, True, now, now
            )
            shibly_user_id = shibly_id
            print(f"[INFO] Created user: {shibly_email}")
        else:
            shibly_user_id = shibly_user["id"]

        # Grant admin and instructor roles to Shibly
        for role_to_grant in ["admin", "instructor", "student"]:
            r_id = role_map[role_to_grant]
            has_ur = await conn.fetchrow(
                "SELECT id FROM user_roles WHERE user_id = $1 AND role_id = $2",
                shibly_user_id, r_id
            )
            if not has_ur:
                await conn.execute(
                    "INSERT INTO user_roles (id, user_id, role_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)",
                    uuid.uuid4(), shibly_user_id, r_id, now, now
                )
                print(f"[INFO] Granted '{role_to_grant}' role to {shibly_email}")

        # 4. Ensure default backup admin (admin@eraao.com) exists
        backup_admin_email = "admin@eraao.com"
        backup_admin = await conn.fetchrow("SELECT id, email FROM users WHERE email = $1", backup_admin_email)
        if not backup_admin:
            backup_admin_id = uuid.uuid4()
            await conn.execute(
                """
                INSERT INTO users (id, email, full_name, is_active, is_verified, onboarding_completed, created_at, updated_at)
                VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                """,
                backup_admin_id, backup_admin_email, "ERAAO Platform Administrator", True, True, True, now, now
            )
            await conn.execute(
                "INSERT INTO user_roles (id, user_id, role_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)",
                uuid.uuid4(), backup_admin_id, role_map["admin"], now, now
            )
            await conn.execute(
                "INSERT INTO user_roles (id, user_id, role_id, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)",
                uuid.uuid4(), backup_admin_id, role_map["instructor"], now, now
            )
            print(f"[INFO] Created backup admin user: {backup_admin_email}")
        else:
            backup_admin_id = backup_admin["id"]

        # 5. Seed Categories
        categories_data = [
            ("English Communication", "english-communication"),
            ("Artificial Intelligence", "artificial-intelligence"),
            ("Cybersecurity", "cybersecurity")
        ]
        category_map = {}
        for cname, cslug in categories_data:
            cat = await conn.fetchrow("SELECT id, slug FROM categories WHERE slug = $1", cslug)
            if cat:
                category_map[cslug] = cat["id"]
            else:
                new_cat_id = uuid.uuid4()
                await conn.execute(
                    "INSERT INTO categories (id, name, slug, created_at, updated_at) VALUES ($1, $2, $3, $4, $5)",
                    new_cat_id, cname, cslug, now, now
                )
                category_map[cslug] = new_cat_id
                print(f"[INFO] Created category: '{cname}'")

        # 6. Seed Bootcamps, Modules, Lessons
        created_courses = []
        for cdata in AUTHENTIC_COURSES:
            existing_course = await conn.fetchrow("SELECT id, title, slug FROM courses WHERE slug = $1", cdata["slug"])
            cat_id = category_map.get(cdata["category_slug"])

            if not existing_course:
                course_id = uuid.uuid4()
                await conn.execute(
                    """
                    INSERT INTO courses (
                        id, title, slug, short_description, description, level, price,
                        currency, duration_hours, status, thumbnail_url, category_id,
                        instructor_id, created_at, updated_at
                    ) VALUES (
                        $1, $2, $3, $4, $5, $6::courselevel, $7,
                        $8, $9, $10::coursestatus, $11, $12,
                        $13, $14, $15
                    )
                    """,
                    course_id, cdata["title"], cdata["slug"], cdata["short_description"],
                    cdata["description"], cdata["level"], cdata["price"], cdata["currency"],
                    cdata["duration_hours"], "PUBLISHED", cdata["thumbnail_url"], cat_id,
                    shibly_user_id, now, now
                )
                print(f"[INFO] Created Course: '{cdata['title']}' (ID: {course_id})")
            else:
                course_id = existing_course["id"]
                await conn.execute(
                    """
                    UPDATE courses SET
                        title = $2, short_description = $3, description = $4,
                        level = $5::courselevel, price = $6, currency = $7,
                        duration_hours = $8, status = $9::coursestatus, thumbnail_url = $10,
                        category_id = $11, instructor_id = $12, updated_at = $13
                    WHERE id = $1
                    """,
                    course_id, cdata["title"], cdata["short_description"], cdata["description"],
                    cdata["level"], cdata["price"], cdata["currency"], cdata["duration_hours"],
                    "PUBLISHED", cdata["thumbnail_url"], cat_id, shibly_user_id, now
                )
                print(f"[INFO] Updated existing Course: '{cdata['title']}' (status='PUBLISHED')")

            # Synchronize modules and lessons for this course
            for m_idx, mod_info in enumerate(cdata["modules"]):
                existing_mod = await conn.fetchrow(
                    "SELECT id FROM modules WHERE course_id = $1 AND (title = $2 OR \"order\" = $3)",
                    course_id, mod_info["title"], m_idx + 1
                )
                if not existing_mod:
                    module_id = uuid.uuid4()
                    await conn.execute(
                        """
                        INSERT INTO modules (id, course_id, title, description, "order", created_at, updated_at)
                        VALUES ($1, $2, $3, $4, $5, $6, $7)
                        """,
                        module_id, course_id, mod_info["title"], mod_info.get("description", ""),
                        m_idx + 1, now, now
                    )
                    print(f"  [+] Added Module {m_idx + 1}: '{mod_info['title']}'")
                else:
                    module_id = existing_mod["id"]
                    await conn.execute(
                        "UPDATE modules SET title = $2, description = $3, \"order\" = $4, updated_at = $5 WHERE id = $1",
                        module_id, mod_info["title"], mod_info.get("description", ""), m_idx + 1, now
                    )

                for l_idx, (l_title, is_preview, l_body) in enumerate(mod_info["lessons"]):
                    existing_lesson = await conn.fetchrow(
                        "SELECT id FROM lessons WHERE module_id = $1 AND (title = $2 OR \"order\" = $3)",
                        module_id, l_title, l_idx + 1
                    )
                    if not existing_lesson:
                        lesson_id = uuid.uuid4()
                        await conn.execute(
                            """
                            INSERT INTO lessons (
                                id, module_id, title, content_type, content_body,
                                duration_minutes, "order", is_free_preview, created_at, updated_at
                            ) VALUES (
                                $1, $2, $3, $4, $5,
                                $6, $7, $8, $9, $10
                            )
                            """,
                            lesson_id, module_id, l_title, "video" if l_idx % 2 == 1 else "text",
                            l_body, 25, l_idx + 1, is_preview, now, now
                        )
                    else:
                        await conn.execute(
                            """
                            UPDATE lessons SET
                                title = $2, content_body = $3, is_free_preview = $4, updated_at = $5
                            WHERE id = $1
                            """,
                            existing_lesson["id"], l_title, l_body, is_preview, now
                        )

            created_courses.append({"id": course_id, "title": cdata["title"], "slug": cdata["slug"]})

        # 7. Seed Scheduled Cohorts
        cohort_start = date(2026, 11, 1)
        cohort_end = date(2027, 1, 24)
        for c in created_courses:
            existing_cohort = await conn.fetchrow(
                "SELECT id FROM cohorts WHERE course_id = $1 AND status = 'UPCOMING'::cohortstatus",
                c["id"]
            )
            if not existing_cohort:
                cohort_id = uuid.uuid4()
                await conn.execute(
                    """
                    INSERT INTO cohorts (
                        id, course_id, title, start_date, end_date, capacity,
                        instructor_id, status, created_at, updated_at
                    ) VALUES (
                        $1, $2, $3, $4, $5, $6, $7, $8::cohortstatus, $9, $10
                    )
                    """,
                    cohort_id, c["id"], f"Cohort 01 — {c['title']}", cohort_start,
                    cohort_end, 30, shibly_user_id, "UPCOMING", now, now
                )
                print(f"[INFO] Scheduled Cohort for '{c['title']}' (Starts: {cohort_start})")

        # 8. Seed Active Enrollments for Mahmudur Rahman (Shibly) & Admin
        for u_id, u_email in [(shibly_user_id, shibly_email), (backup_admin_id, backup_admin_email)]:
            for c in created_courses:
                has_enr = await conn.fetchrow(
                    "SELECT id FROM enrollments WHERE user_id = $1 AND course_id = $2",
                    u_id, c["id"]
                )
                if not has_enr:
                    await conn.execute(
                        """
                        INSERT INTO enrollments (
                            id, user_id, course_id, status, enrolled_at, created_at, updated_at
                        ) VALUES (
                            $1, $2, $3, $4::enrollmentstatus, $5, $6, $7
                        )
                        """,
                        uuid.uuid4(), u_id, c["id"], "ACTIVE", now, now, now
                    )
                    print(f"[INFO] Enrolled {u_email} into '{c['title']}'")

        print("\n[SUCCESS] ========================================================")
        print(f"[SUCCESS] All {len(created_courses)} bootcamps seeded successfully into Neon DB!")
        print(f"[SUCCESS] Instructor assigned: Mahmudur Rahman ({shibly_email})")
        print("[SUCCESS] All bootcamps set to status='PUBLISHED' with live modules & lessons.")
        print("[SUCCESS] ========================================================\n")

    finally:
        await conn.close()
        print("[INFO] Database connection closed.")


if __name__ == "__main__":
    asyncio.run(seed())
