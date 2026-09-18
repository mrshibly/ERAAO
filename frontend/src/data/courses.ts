export interface LessonData {
  id: string;
  title: string;
  order: number;
  content_type: "video" | "text" | "quiz" | "assignment" | "material";
  duration_minutes: number;
  is_free_preview?: boolean;
}

export interface ModuleData {
  id: string;
  title: string;
  order: number;
  description?: string;
  learning_method?: string;
  student_outcome?: string;
  lessons: LessonData[];
}

export interface CourseData {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced";
  category: string;
  category_slug: string;
  duration_weeks: number;
  duration_hours: number;
  classes_count: number;
  classes_per_week: number;
  class_length_minutes: number;
  price: number;
  currency: string;
  thumbnail_url: string;
  weekly_rhythm: string;
  resources_included: string;
  target_audience: {
    title: string;
    description: string;
  }[];
  outcomes: string[];
  modules: ModuleData[];
}

export const ALL_COURSES: CourseData[] = [
  // ─────────────────────────────────────────────────────────────
  // 1. BASIC ENGLISH
  // ─────────────────────────────────────────────────────────────
  {
    id: "c1-basic-english",
    slug: "basic-english-foundation",
    title: "Basic English: Build a Usable Foundation",
    short_description: "Turn fragmented school English into a usable spoken system. Learn through context, pattern building, and real-life practice without memorizing rules.",
    description: "Build a usable English foundation from the English you already half-know. This is not English from A to Z; it turns the student's fragmented school English into one usable system built entirely on the 6-stage ERAAO Learning Cycle: Understand → Notice → Build → Practice → Use → Recall.\n\nOver 12 structured weeks (36 live interactive classes), you will progress from understanding sentence architecture to speaking comfortably in everyday, phone, and workplace situations.",
    level: "beginner",
    category: "English Communication",
    category_slug: "english-communication",
    duration_weeks: 12,
    duration_hours: 36,
    classes_count: 36,
    classes_per_week: 3,
    class_length_minutes: 60,
    price: 12000,
    currency: "BDT",
    thumbnail_url: "/banners/banner-spoken-english.jpg",
    weekly_rhythm: "Mon / Wed / Fri • Class 1: Input (Understand→Notice→Build), Class 2: Speaking (Practice→Use), Class 3: Listening + Recall/Review",
    resources_included: "15 Worksheets & Guides + 7 Self-Made Listening Audio Packs + Official Certificate of Completion",
    target_audience: [
      {
        title: "Beginners & False Beginners",
        description: "Learners who studied English in school but struggle to construct basic sentences spontaneously without freezing or translating word-for-word."
      },
      {
        title: "Students & Job Seekers",
        description: "Individuals needing a clear, reliable foundation for campus interviews, job applications, and daily conversational confidence."
      },
      {
        title: "Aspiring Freelancers",
        description: "Professionals who want to eliminate fear and build basic spoken and written fluency before engaging with international clients."
      }
    ],
    outcomes: [
      "Understand English directly through context rather than translating from your native language",
      "Construct positive, negative, and question sentences dynamically using the SVO framework",
      "Confidently command the Core Verb System (Be, Have, Do, action verbs, and modals)",
      "Express past, present, and future events without confusion over grammar rules",
      "Listen to natural spoken English and extract meaning without needing every single word",
      "Handle real-life telephone, workplace, and social conversations independently"
    ],
    modules: [
      {
        id: "be-m1",
        title: "Module 1: Reset Your English",
        order: 1,
        description: "Knowing vs. using English, the ERAAO Learning Cycle, removing fear of making mistakes, and context-based learning.",
        learning_method: "Understand → Notice → Use",
        student_outcome: "Student can explain their new approach to English and begin learning without depending on memorisation.",
        lessons: [
          { id: "be-l1", title: "Why Knowing English Doesn't Mean Being Able to Use It", order: 1, content_type: "text", duration_minutes: 20 },
          { id: "be-l2", title: "The ERAAO Learning Cycle: From Passive to Active English", order: 2, content_type: "video", duration_minutes: 25 },
          { id: "be-l3", title: "Removing the Fear of Making Mistakes in Speaking", order: 3, content_type: "assignment", duration_minutes: 15 }
        ]
      },
      {
        id: "be-m2",
        title: "Module 2: Building the English Sentence",
        order: 2,
        description: "Subject-Verb-Object (SVO) order, positive/negative sentence creation, question formation, and sentence expansion.",
        learning_method: "Pattern recognition → Sentence construction → Variation",
        student_outcome: "Student creates their own sentences instead of memorising complete sentences.",
        lessons: [
          { id: "be-l4", title: "The SVO Engine: Subject, Verb, Object & Complement", order: 1, content_type: "text", duration_minutes: 20 },
          { id: "be-l5", title: "Transforming Statements: Positive, Negative & Short Answers", order: 2, content_type: "video", duration_minutes: 25 },
          { id: "be-l6", title: "Question Formation Patterns & Expanding Sentences", order: 3, content_type: "assignment", duration_minutes: 25 }
        ]
      },
      {
        id: "be-m3",
        title: "Module 3: The Core Verb System",
        order: 3,
        description: "The big three verbs (Be, Have, Do), basic action verbs, helping verbs, modals (can, must, should), and verb combinations.",
        learning_method: "Repeated exposure to verbs across real situations",
        student_outcome: "Student uses common verbs naturally in different sentence structures.",
        lessons: [
          { id: "be-l7", title: "Mastering the Big Three: Be, Have, and Do in Action", order: 1, content_type: "text", duration_minutes: 20 },
          { id: "be-l8", title: "Action Verbs and Everyday Habitual Combinations", order: 2, content_type: "video", duration_minutes: 25 },
          { id: "be-l9", title: "Modal Verbs: Communicating Ability, Obligation & Advice", order: 3, content_type: "assignment", duration_minutes: 20 }
        ]
      },
      {
        id: "be-m4",
        title: "Module 4: Time & Basic Grammar",
        order: 4,
        description: "Present, past, and future frameworks, continuous states, basic perfect forms, and time expressions in context.",
        learning_method: "Meaning first → Pattern → Grammar explanation → Practice",
        student_outcome: "Student can talk about what is happening, what happened, and what will happen.",
        lessons: [
          { id: "be-l10", title: "Present Simple vs. Present Continuous: State of the Moment", order: 1, content_type: "text", duration_minutes: 20 },
          { id: "be-l11", title: "Narrating the Past and Projecting Future Intentions", order: 2, content_type: "video", duration_minutes: 25 },
          { id: "be-l12", title: "Time Markers & Connecting Sequences Smoothly", order: 3, content_type: "assignment", duration_minutes: 20 }
        ]
      },
      {
        id: "be-m5",
        title: "Module 5: Everyday English Patterns",
        order: 5,
        description: "Introducing yourself, family, routine, work, likes/dislikes, requests, opinions, and personal experiences.",
        learning_method: "One pattern → many contexts → many variations",
        student_outcome: "Student produces personalised English rather than reciting model answers.",
        lessons: [
          { id: "be-l13", title: "High-Frequency Conversational Formulas", order: 1, content_type: "text", duration_minutes: 20 },
          { id: "be-l14", title: "Expressing Preferences, Needs, and Personal Standpoints", order: 2, content_type: "video", duration_minutes: 25 },
          { id: "be-l15", title: "Everyday Q&A Dialogue Drills with Audio Models", order: 3, content_type: "material", duration_minutes: 20 }
        ]
      },
      {
        id: "be-m6",
        title: "Module 6: Listening to Understand",
        order: 6,
        description: "Listening for meaning, recognizing patterns, connected speech, contextual guessing, and eliminating mental translation.",
        learning_method: "Hear → Understand → Hear again → Notice → Reproduce",
        student_outcome: "Student understands increasingly natural everyday English.",
        lessons: [
          { id: "be-l16", title: "Breaking the Translation Habit in Real Time", order: 1, content_type: "text", duration_minutes: 20 },
          { id: "be-l17", title: "Connected Speech Lab: Linking, Blending & Elisions", order: 2, content_type: "video", duration_minutes: 30 },
          { id: "be-l18", title: "Context-Based Inference Practice with Dedicated Audio", order: 3, content_type: "material", duration_minutes: 25 }
        ]
      },
      {
        id: "be-m7",
        title: "Module 7: Speaking from Patterns",
        order: 7,
        description: "Sentence transformation, substitution drills, controlled speaking, spontaneous responses, and conversation building.",
        learning_method: "Copy → Change → Create → Communicate",
        student_outcome: "Student answers questions and creates sentences without memorised scripts.",
        lessons: [
          { id: "be-l19", title: "Substitution Techniques: Rapid Vocabulary Swapping", order: 1, content_type: "text", duration_minutes: 20 },
          { id: "be-l20", title: "Spontaneous Response Drills Under Time Limits", order: 2, content_type: "video", duration_minutes: 25 },
          { id: "be-l21", title: "Building Multi-Turn Dialogues Organically", order: 3, content_type: "assignment", duration_minutes: 25 }
        ]
      },
      {
        id: "be-m8",
        title: "Module 8: Writing Your English",
        order: 8,
        description: "Sentence construction, combining thoughts, paragraph structure, describing, explaining, and basic practical written notes.",
        learning_method: "Sentence → Connected sentences → Paragraph → Real communication",
        student_outcome: "Student writes clear everyday English with coherent paragraph flow.",
        lessons: [
          { id: "be-l22", title: "Structuring Clear, Readable Paragraphs", order: 1, content_type: "text", duration_minutes: 20 },
          { id: "be-l23", title: "Describing Experiences, Explaining Reasons & Stating Opinions", order: 2, content_type: "video", duration_minutes: 25 },
          { id: "be-l24", title: "Practical Written Communication: Messages, Notes & Summaries", order: 3, content_type: "assignment", duration_minutes: 25 }
        ]
      },
      {
        id: "be-m9",
        title: "Module 9: English in Real Life & Final Integration",
        order: 9,
        description: "Handling phone calls, asking for directions, explaining problems, social English, workplace basics, and final speaking assessment.",
        learning_method: "Applying every previous module together in realistic situations",
        student_outcome: "Final outcome: Moves from 'I studied English' to 'I can understand and use basic English.'",
        lessons: [
          { id: "be-l25", title: "Handling Everyday Phone Calls & Clear Enquiries", order: 1, content_type: "text", duration_minutes: 20 },
          { id: "be-l26", title: "Navigating Problems, Explanations & Polite Workplace Scenarios", order: 2, content_type: "video", duration_minutes: 25 },
          { id: "be-l27", title: "Full Course Recall & Capstone Spoken Assessment", order: 3, content_type: "quiz", duration_minutes: 30 }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // 2. ENGLISH FOR FREELANCERS
  // ─────────────────────────────────────────────────────────────
  {
    id: "c2-english-freelancers",
    slug: "english-for-freelancers",
    title: "English for Freelancers: International Client Communication",
    short_description: "Communicate professionally, pitch proposals, run client calls, negotiate deadlines and scope, and win high-ticket international contracts.",
    description: "This is not simply Basic English plus freelance vocabulary: the entire methodology shifts toward professional communication with real international clients.\n\nOver 12 weeks (36 classes), you master how to write compelling project proposals, manage client discovery calls, negotiate pricing and scope changes, and deliver projects professionally. The course culminates in a full 2-week end-to-end client simulation from initial inquiry to final hand-off.",
    level: "intermediate",
    category: "English Communication",
    category_slug: "english-communication",
    duration_weeks: 12,
    duration_hours: 36,
    classes_count: 36,
    classes_per_week: 3,
    class_length_minutes: 70,
    price: 15000,
    currency: "BDT",
    thumbnail_url: "/banners/banner-spoken-english.jpg",
    weekly_rhythm: "Mon / Wed / Fri • Class 1: Professional Input, Class 2: Speaking & Role-Play, Class 3: Listening + Recall",
    resources_included: "16 Worksheets/Guides + 12 Self-Made Listening Audios + Full Client Simulation Script & Rubric + Freelancer Portfolio Pack",
    target_audience: [
      {
        title: "Active Freelancers & Remote Contractors",
        description: "Freelancers losing high-paying international projects due to hesitation in video calls, poorly framed proposals, or awkward client messaging."
      },
      {
        title: "Agency Owners & Service Providers",
        description: "Founders and team leads who need to conduct discovery calls, present roadmaps, and negotiate project scope confidently with overseas clients."
      },
      {
        title: "Tech Practitioners Entering Global Markets",
        description: "Developers, designers, and marketers transitioning from local gigs to global remote platforms (Upwork, LinkedIn, direct outbound)."
      }
    ],
    outcomes: [
      "Conduct professional discovery calls with international clients with clarity and composure",
      "Write high-converting project proposals that clearly articulate problems, solutions, and value",
      "Master polite but firm negotiation: pricing, revisions, milestones, and scope boundaries",
      "Compose crisp, professional emails, follow-ups, and status reports without awkward phrasing",
      "Navigate difficult client situations (delays, unexpected changes, saying no) diplomatically",
      "Execute an end-to-end simulated client project from inquiry to sign-off before real clients"
    ],
    modules: [
      {
        id: "ef-m1",
        title: "Module 1: Thinking in Professional English",
        order: 1,
        description: "Casual vs. professional English, direct vs. indirect communication, tone modulation, and understanding client expectations.",
        learning_method: "Comparison → Analysis → Sentence refinement",
        student_outcome: "Student adopts an internationally accepted professional communication mindset.",
        lessons: [
          { id: "ef-l1", title: "Casual vs. Professional English: Choosing Tone with Intent", order: 1, content_type: "text", duration_minutes: 20 },
          { id: "ef-l2", title: "Direct vs. Indirect Communication in Western Business Contexts", order: 2, content_type: "video", duration_minutes: 25 },
          { id: "ef-l3", title: "Introducing Your Skills, Agency & Services Professionally", order: 3, content_type: "assignment", duration_minutes: 20 }
        ]
      },
      {
        id: "ef-m2",
        title: "Module 2: Freelancer Vocabulary in Context",
        order: 2,
        description: "High-frequency industry terminology: scope, deliverables, revisions, milestones, bottlenecks, and deadlines.",
        learning_method: "Contextual vocabulary mapping → Practical application",
        student_outcome: "Student discusses projects with precise, industry-standard professional terminology.",
        lessons: [
          { id: "ef-l4", title: "Project Lifecycles: Scope, Deliverables, Milestones & Revisions", order: 1, content_type: "text", duration_minutes: 20 },
          { id: "ef-l5", title: "Technical vs. Non-Technical Phrasing for Non-Technical Clients", order: 2, content_type: "video", duration_minutes: 25 },
          { id: "ef-l6", title: "Contextual Flashcards & Mini-Dialogue Drills", order: 3, content_type: "material", duration_minutes: 20 }
        ]
      },
      {
        id: "ef-m3",
        title: "Module 3: Client Conversations & First Discovery Calls",
        order: 3,
        description: "Opening client discussions, active listening, asking clarifying questions, and extracting business requirements.",
        learning_method: "Script analysis → Guided practice → Simulated live calls",
        student_outcome: "Student leads the first 15 minutes of a client discovery call with confidence.",
        lessons: [
          { id: "ef-l7", title: "Setting the Agenda & Opening Discovery Calls Gracefully", order: 1, content_type: "text", duration_minutes: 20 },
          { id: "ef-l8", title: "Asking High-Value Clarifying Questions to Uncover Real Needs", order: 2, content_type: "video", duration_minutes: 30 },
          { id: "ef-l9", title: "Summarizing Client Requirements Back to the Client (The Mirror Technique)", order: 3, content_type: "assignment", duration_minutes: 25 }
        ]
      },
      {
        id: "ef-m4",
        title: "Module 4: Professional Sentence Construction",
        order: 4,
        description: "Polite requests, suggestions, conditional language (would, could, should), and softening direct commands.",
        learning_method: "Direct-to-Polite transformation drills",
        student_outcome: "Student turns blunt or awkward phrasing into diplomatic, respectful business language.",
        lessons: [
          { id: "ef-l10", title: "Softening Direct Statements: Using Modals and Conditionals", order: 1, content_type: "text", duration_minutes: 20 },
          { id: "ef-l11", title: "Making Recommendations and Strategic Suggestions Politely", order: 2, content_type: "video", duration_minutes: 25 },
          { id: "ef-l12", title: "Sentence Transformation Workshop: From Awkward to Executive", order: 3, content_type: "assignment", duration_minutes: 25 }
        ]
      },
      {
        id: "ef-m5",
        title: "Module 5: Client Chat & Async Messaging",
        order: 5,
        description: "Quick updates on Slack/Upwork, explaining technical delays, status reports, and handling async communication professionally.",
        learning_method: "Simulated chat thread construction + Read-aloud practice",
        student_outcome: "Student maintains client trust and clear project velocity via chat messages.",
        lessons: [
          { id: "ef-l13", title: "Daily & Weekly Standup Messages: Concise, Actionable Updates", order: 1, content_type: "text", duration_minutes: 20 },
          { id: "ef-l14", title: "Explaining Technical Roadblocks & Delays Without Panic", order: 2, content_type: "video", duration_minutes: 25 },
          { id: "ef-l15", title: "Slack & Upwork Messaging Template Pack Review", order: 3, content_type: "material", duration_minutes: 20 }
        ]
      },
      {
        id: "ef-m6",
        title: "Module 6: Proposal Writing & Pricing Pitches",
        order: 6,
        description: "Proposal anatomy: opening hook, problem diagnosis, proposed architecture, pricing models, and call-to-action.",
        learning_method: "Deconstructing winning proposals → Live drafting → Verbal pitch",
        student_outcome: "Student writes tailored, high-converting proposals that justify premium pricing.",
        lessons: [
          { id: "ef-l16", title: "The Problem-First Proposal Framework That Hooks Clients", order: 1, content_type: "text", duration_minutes: 25 },
          { id: "ef-l17", title: "Justifying Value & Framing Pricing: Hourly vs. Fixed vs. Retainer", order: 2, content_type: "video", duration_minutes: 30 },
          { id: "ef-l18", title: "Proposal Drafting Workshop & Verbal Pitch Presentation", order: 3, content_type: "assignment", duration_minutes: 30 }
        ]
      },
      {
        id: "ef-m7",
        title: "Module 7: Professional Email English",
        order: 7,
        description: "Effective subject lines, formal proposals, invoice follow-ups, dispute resolution, and polite contract sign-offs.",
        learning_method: "Template deconstruction + Custom drafting across 10 real scenarios",
        student_outcome: "Student writes clean, error-free client emails that command immediate respect.",
        lessons: [
          { id: "ef-l19", title: "Subject Lines & Openers That Prevent Unopened Emails", order: 1, content_type: "text", duration_minutes: 20 },
          { id: "ef-l20", title: "Drafting Formal Submission, Milestone & Invoice Emails", order: 2, content_type: "video", duration_minutes: 25 },
          { id: "ef-l21", title: "The 10-Scenario Email Playbook: Exercises and Reviews", order: 3, content_type: "material", duration_minutes: 25 }
        ]
      },
      {
        id: "ef-m8",
        title: "Module 8: Live Client Meetings & Presentations",
        order: 8,
        description: "Starting meetings smoothly, sharing screen presentations, handling interruptions, and agreeing/disagreeing gracefully.",
        learning_method: "Live simulated client meetings with instructor feedback",
        student_outcome: "Student hosts 30-minute client calls without anxiety or long pauses.",
        lessons: [
          { id: "ef-l22", title: "Opening Zoom/Google Meet Calls & Screen Share Protocols", order: 1, content_type: "text", duration_minutes: 20 },
          { id: "ef-l23", title: "Presenting Deliverables & Walking Clients Through Work", order: 2, content_type: "video", duration_minutes: 30 },
          { id: "ef-l24", title: "Handling Critical Feedback & Client Disagreements on Camera", order: 3, content_type: "assignment", duration_minutes: 25 }
        ]
      },
      {
        id: "ef-m9",
        title: "Module 9: Difficult Situations & Contract Negotiations",
        order: 9,
        description: "Scope creep management, late client payments, boundary enforcement, and saying no professionally.",
        learning_method: "Case-study roleplay → Objection handling drills",
        student_outcome: "Student protects their time, scope, and earnings without burning client relationships.",
        lessons: [
          { id: "ef-l25", title: "Identifying Scope Creep & Replying with Add-On Estimates", order: 1, content_type: "text", duration_minutes: 20 },
          { id: "ef-l26", title: "Following Up on Overdue Invoices Firmly and Diplomatically", order: 2, content_type: "video", duration_minutes: 25 },
          { id: "ef-l27", title: "The Art of Saying No Professionally: Scripts & Role-Plays", order: 3, content_type: "assignment", duration_minutes: 25 }
        ]
      },
      {
        id: "ef-m10",
        title: "Module 10: Full End-to-End Client Simulation",
        order: 10,
        description: "Two-week live capstone simulation: Client Inquiry → Discovery Call → Proposal → Revision → Delivery → Follow-up.",
        learning_method: "Complete simulation across all 9 previous modules + Rubric review",
        student_outcome: "Student operates as an international freelancer with complete communicative fluency.",
        lessons: [
          { id: "ef-l28", title: "Simulation Phase 1: Client Brief, Initial Discovery & Proposal", order: 1, content_type: "assignment", duration_minutes: 30 },
          { id: "ef-l29", title: "Simulation Phase 2: Live Negotiation, Delivery & Final Sign-Off", order: 2, content_type: "video", duration_minutes: 35 },
          { id: "ef-l30", title: "Final Evaluation, Portfolio Packaging & Certificate Award", order: 3, content_type: "quiz", duration_minutes: 30 }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // 3. ADVANCED ENGLISH
  // ─────────────────────────────────────────────────────────────
  {
    id: "c3-advanced-english",
    slug: "advanced-english-fluency",
    title: "Advanced English: Natural Fluency & Nuanced Communication",
    short_description: "Move from consciously constructing English to expressing complex, abstract thoughts naturally with tone, subtlety, and persuasive power.",
    description: "Not harder grammar: this course moves the student from consciously constructing English to expressing complex thought naturally. Built for professionals who can already speak functional English but want to eliminate hesitation, master connected speech, build persuasive arguments, and command executive meetings.\n\nCovers advanced syntax, meaning-based grammar, collocations, natural listening labs, debate structures, cultural nuance, and ends in a full fluency capstone presentation.",
    level: "advanced",
    category: "English Communication",
    category_slug: "english-communication",
    duration_weeks: 12,
    duration_hours: 36,
    classes_count: 36,
    classes_per_week: 3,
    class_length_minutes: 75,
    price: 18000,
    currency: "BDT",
    thumbnail_url: "/banners/banner-spoken-english.jpg",
    weekly_rhythm: "Mon / Wed / Fri • Class 1: Nuance Input, Class 2: Advanced Speaking & Debate, Class 3: Natural Listening + Recall",
    resources_included: "16 Worksheets/Guides + 13 Self-Made Listening Audios + Final Fluency Report + Capstone Presentation",
    target_audience: [
      {
        title: "Senior Engineers & Team Leads",
        description: "Technical leaders communicating with foreign executives, managing distributed teams, and leading technical design reviews."
      },
      {
        title: "Executives, Founders & Product Managers",
        description: "Professionals who pitch to global investors, lead webinars, or represent their companies on global stages."
      },
      {
        title: "Upper-Intermediate English Speakers",
        description: "Learners tired of feeling like their English sounds 'stiff' or 'robotic' who want to express humor, nuance, and sophisticated thought."
      }
    ],
    outcomes: [
      "Express complex, multi-layered ideas spontaneously without falling back on basic sentence structures",
      "Decode fast, connected native speech effortlessly through sound reduction and linking mastery",
      "Structure compelling persuasive arguments, presentations, and constructive debate rebuttals",
      "Incorporate advanced natural collocations, phrasal verbs, and idiomatic register seamlessly",
      "Command subtle cultural nuances: indirect disagreement, executive tone, and professional subtext",
      "Deliver a final executive presentation with spontaneous Q&A defense under evaluation"
    ],
    modules: [
      {
        id: "ae-m1",
        title: "Module 1: Beyond Basic Sentences",
        order: 1,
        description: "Connecting ideas logically, comparative reasoning, providing illustrative evidence, and contrasting stances.",
        learning_method: "Thought mapping → Complex connective synthesis",
        student_outcome: "Student connects multi-part ideas without robotic repetition.",
        lessons: [
          { id: "ae-l1", title: "Logical Connectors That Elevate Spoken Cohesion", order: 1, content_type: "text", duration_minutes: 20 },
          { id: "ae-l2", title: "Comparing and Contrasting Conflicting Viewpoints", order: 2, content_type: "video", duration_minutes: 25 },
          { id: "ae-l3", title: "Substantiating Assertions with Nuanced Examples", order: 3, content_type: "assignment", duration_minutes: 20 }
        ]
      },
      {
        id: "ae-m2",
        title: "Module 2: Advanced Sentence Structure",
        order: 2,
        description: "Compound and complex sentence engineering, relative clauses, participles, and mixed conditional scenarios.",
        learning_method: "Deconstruct → Rebuild aloud → Free variation",
        student_outcome: "Student builds sophisticated clauses smoothly in conversation.",
        lessons: [
          { id: "ae-l4", title: "Relative Clauses and Descriptive Subordination", order: 1, content_type: "text", duration_minutes: 20 },
          { id: "ae-l5", title: "Participle Clauses for Concise, Professional Speech", order: 2, content_type: "video", duration_minutes: 25 },
          { id: "ae-l6", title: "Mixed Conditionals in Real Decision-Making Scenarios", order: 3, content_type: "assignment", duration_minutes: 25 }
        ]
      },
      {
        id: "ae-m3",
        title: "Module 3: Grammar Through Meaning",
        order: 3,
        description: "Perfect aspects, passive voice for diplomacy and objectivity, reported speech, and rhetorical emphasis (inversion).",
        learning_method: "Meaning first → Expressive outcome",
        student_outcome: "Student uses advanced grammatical devices to express subtle shades of meaning.",
        lessons: [
          { id: "ae-l7", title: "Diplomatic Passive: Depersonalizing Problems Gracefully", order: 1, content_type: "text", duration_minutes: 20 },
          { id: "ae-l8", title: "Narrative Mastery: Past Perfect & Continuous Nuances", order: 2, content_type: "video", duration_minutes: 25 },
          { id: "ae-l9", title: "Inversion & Fronting: Adding Impact and Emphasis to Speech", order: 3, content_type: "assignment", duration_minutes: 25 }
        ]
      },
      {
        id: "ae-m4",
        title: "Module 4: Natural Vocabulary, Collocations & Phrasal Verbs",
        order: 4,
        description: "High-level collocations, word families, register shifting (casual vs. executive), and idiomatic phrasal verbs.",
        learning_method: "Collocation clustering → Live situational production",
        student_outcome: "Student speaks naturally with the natural phrasing native speakers expect.",
        lessons: [
          { id: "ae-l10", title: "Essential Business & Technology Collocations Bank", order: 1, content_type: "text", duration_minutes: 20 },
          { id: "ae-l11", title: "Phrasal Verbs in Professional Workplaces (Without Confusion)", order: 2, content_type: "video", duration_minutes: 25 },
          { id: "ae-l12", title: "Register Switching: Adapting from Casual Chat to Boardroom", order: 3, content_type: "material", duration_minutes: 20 }
        ]
      },
      {
        id: "ae-m5",
        title: "Module 5: Natural Listening Deep-Focus Lab",
        order: 5,
        description: "Decoding fast/connected speech, intrusive sounds, reduced forms, and inferring underlying tone and attitude.",
        learning_method: "Acoustic breakdown → Inference drills → Real-time playback",
        student_outcome: "Student follows rapid native-speed discussions effortlessly.",
        lessons: [
          { id: "ae-l13", title: "Decoding Reduced Vowels, Glottal Stops & Intrusive Sounds", order: 1, content_type: "text", duration_minutes: 20 },
          { id: "ae-l14", title: "Extended Audio Lab: Tracking Multi-Speaker Discussions", order: 2, content_type: "video", duration_minutes: 30 },
          { id: "ae-l15", title: "Inference & Subtext: What Isn't Being Said Out Loud", order: 3, content_type: "material", duration_minutes: 25 }
        ]
      },
      {
        id: "ae-m6",
        title: "Module 6: Fluent Speaking & Persuasive Rhetoric",
        order: 6,
        description: "Storytelling frameworks, structured argumentative reasoning, persuasive rhetoric, and defending positions.",
        learning_method: "Speech modeling → Structured debate rounds",
        student_outcome: "Student presents arguments that persuade and captivate listeners.",
        lessons: [
          { id: "ae-l16", title: "The PREP Framework (Point, Reason, Example, Point)", order: 1, content_type: "text", duration_minutes: 20 },
          { id: "ae-l17", title: "Business Storytelling: Hooks, Turning Points & Resolutions", order: 2, content_type: "video", duration_minutes: 25 },
          { id: "ae-l18", title: "Constructive Rebuttal & Defending Stances Under Pressure", order: 3, content_type: "assignment", duration_minutes: 25 }
        ]
      },
      {
        id: "ae-m7",
        title: "Module 7: Expressing Complex & Abstract Ideas",
        order: 7,
        description: "Analyzing cause and effect, articulating abstract concepts, strategic critiques, and high-level debate topics.",
        learning_method: "Abstract concept framing → Live moderated debate",
        student_outcome: "Student articulates nuanced analysis on technical and societal topics.",
        lessons: [
          { id: "ae-l19", title: "Deconstructing Multi-Factor Causality in Technical Systems", order: 1, content_type: "text", duration_minutes: 20 },
          { id: "ae-l20", title: "Articulating Philosophical, Economic & Strategic Tradeoffs", order: 2, content_type: "video", duration_minutes: 25 },
          { id: "ae-l21", title: "Executive Debate Round on AI, Security & Automation", order: 3, content_type: "assignment", duration_minutes: 25 }
        ]
      },
      {
        id: "ae-m8",
        title: "Module 8: Advanced Professional & Academic Writing",
        order: 8,
        description: "Writing executive briefs, persuasive white papers, detailed analytical reports, and rigorous self-editing.",
        learning_method: "Document architecture → Draft review → Peer editing",
        student_outcome: "Student produces publication-quality written briefs and reports.",
        lessons: [
          { id: "ae-l22", title: "Executive Summary Writing: Distilling 20 Pages into 1", order: 1, content_type: "text", duration_minutes: 20 },
          { id: "ae-l23", title: "Analytical Report Writing & Data-Backed Recommendations", order: 2, content_type: "video", duration_minutes: 25 },
          { id: "ae-l24", title: "Self-Editing Protocols: Eliminating Fluff and Ambiguity", order: 3, content_type: "assignment", duration_minutes: 25 }
        ]
      },
      {
        id: "ae-m9",
        title: "Module 9: Natural Communication & Cultural Nuance",
        order: 9,
        description: "Tone, nuance, indirect meanings, professional humor, dealing with cultural subtext in US/UK/EU workforces.",
        learning_method: "Cultural scenario analysis → Nuanced role-play",
        student_outcome: "Student operates with cross-cultural communicative intelligence.",
        lessons: [
          { id: "ae-l25", title: "Indirect Criticism & Giving Constructive Feedback Diplomatically", order: 1, content_type: "text", duration_minutes: 20 },
          { id: "ae-l26", title: "Navigating Humor, Small Talk & Organic Rapport Building", order: 2, content_type: "video", duration_minutes: 25 },
          { id: "ae-l27", title: "Cross-Cultural Subtext & Reading Between the Lines", order: 3, content_type: "material", duration_minutes: 20 }
        ]
      },
      {
        id: "ae-m10",
        title: "Module 10: Fluency Integration & Capstone Defense",
        order: 10,
        description: "End-to-end integration: 15-minute executive presentation followed by spontaneous Q&A defense before the panel.",
        learning_method: "Full input-to-output cycle across all skills + Panel assessment",
        student_outcome: "Final outcome: Moves from 'I can speak English' to 'I can express myself fully in English.'",
        lessons: [
          { id: "ae-l28", title: "Capstone Presentation Preparation & Slide Rehearsal", order: 1, content_type: "assignment", duration_minutes: 25 },
          { id: "ae-l29", title: "Live Presentation & Spontaneous Panel Q&A Defense", order: 2, content_type: "video", duration_minutes: 35 },
          { id: "ae-l30", title: "Final Fluency Diagnostic Report, Portfolio & Diploma Award", order: 3, content_type: "quiz", duration_minutes: 30 }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // 4. AI AUTOMATION & AGENTS
  // ─────────────────────────────────────────────────────────────
  {
    id: "c4-ai-automation",
    slug: "ai-automation-agents",
    title: "Practical AI Automation & Intelligent Agents",
    short_description: "Build autonomous multi-agent workflows, custom LLM pipelines, and no-code client automations with LangChain, Make, and Python.",
    description: "A hands-on practitioner bootcamp focused on building production-grade AI solutions. Master prompt engineering, tool calling, local and cloud LLMs, vector search, and client workflow automation without theoretical fluff.\n\nLearn to build, deploy, and monetize autonomous systems that handle customer workflows, content pipelines, document analysis, and CRM syncs for paying clients.",
    level: "intermediate",
    category: "Artificial Intelligence",
    category_slug: "artificial-intelligence",
    duration_weeks: 12,
    duration_hours: 36,
    classes_count: 36,
    classes_per_week: 3,
    class_length_minutes: 70,
    price: 25000,
    currency: "BDT",
    thumbnail_url: "/banners/banner-ai-automation.jpg",
    weekly_rhythm: "Mon / Wed / Fri • Class 1: Architecture & Tools, Class 2: Live Agent Build, Class 3: Testing & Client Deployment",
    resources_included: "12 Production Templates + GitHub Repos + Cloud Sandboxes + Capstone Client Deliverable",
    target_audience: [
      {
        title: "Developers & Software Engineers",
        description: "Engineers looking to upgrade from traditional CRUD apps to building autonomous LLM agents and multi-system automations."
      },
      {
        title: "Technical Freelancers & Agencies",
        description: "Freelancers aiming to package and sell high-ticket AI automation setups to international small-and-medium businesses."
      },
      {
        title: "No-Code / Low-Code Builders",
        description: "Builders looking to connect Make, n8n, Supabase, and OpenAI into dependable, revenue-generating client workflows."
      }
    ],
    outcomes: [
      "Architect multi-step AI agents with tool-calling, memory persistence, and schema enforcement",
      "Deploy vector retrieval (RAG) pipelines over proprietary client documents and knowledge bases",
      "Automate complex business processes linking Gmail, Slack, HubSpot, and Notion with n8n & Make",
      "Implement robust prompt defense guardrails preventing prompt injection and data leaks",
      "Package AI automation services as recurring monthly retainers for overseas clients",
      "Ship an end-to-end production AI automation capstone to a live cloud host"
    ],
    modules: [
      {
        id: "ai-m1",
        title: "Module 1: Foundations of Modern AI & Agentic Systems",
        order: 1,
        description: "Model families (GPT-4o, Claude 3.5 Sonnet, Llama 3), API architecture, token economics, and setting up the local dev environment.",
        lessons: [
          { id: "ai-l1", title: "Landscape of Modern AI Models & API Token Economics", order: 1, content_type: "text", duration_minutes: 20 },
          { id: "ai-l2", title: "Configuring the Developer Sandbox: Python, Node & API Keys", order: 2, content_type: "video", duration_minutes: 25 },
          { id: "ai-l3", title: "Building Your First Structured JSON Completion Pipeline", order: 3, content_type: "assignment", duration_minutes: 25 }
        ]
      },
      {
        id: "ai-m2",
        title: "Module 2: Advanced Prompt Engineering & Function Calling",
        order: 2,
        description: "System instructions, few-shot prompting, schema-constrained outputs, and OpenAI/Anthropic tool calling.",
        lessons: [
          { id: "ai-l4", title: "Role Framing, Chain-of-Thought & Deterministic Formatting", order: 1, content_type: "text", duration_minutes: 20 },
          { id: "ai-l5", title: "Function Calling & Pydantic Tool Definitions in Python", order: 2, content_type: "video", duration_minutes: 30 },
          { id: "ai-l6", title: "Lab: Building an Autonomous Calendar & Weather Agent", order: 3, content_type: "assignment", duration_minutes: 30 }
        ]
      },
      {
        id: "ai-m3",
        title: "Module 3: Vector Embeddings & Production RAG Pipelines",
        order: 3,
        description: "Chunking strategies, embedding models, vector databases (Qdrant/Pgvector), and semantic search over documents.",
        lessons: [
          { id: "ai-l7", title: "Embedding Models & Document Chunking Best Practices", order: 1, content_type: "text", duration_minutes: 20 },
          { id: "ai-l8", title: "Deploying Vector Search with PostgreSQL pgvector & LangChain", order: 2, content_type: "video", duration_minutes: 30 },
          { id: "ai-l9", title: "Lab: Building a Company Policy & Knowledge Base Assistant", order: 3, content_type: "assignment", duration_minutes: 35 }
        ]
      },
      {
        id: "ai-m4",
        title: "Module 4: Autonomous Multi-Agent Orchestration",
        order: 4,
        description: "State machines, supervisor-worker hierarchies, handoffs, and feedback loops with LangGraph and CrewAI.",
        lessons: [
          { id: "ai-l10", title: "State Management in Multi-Turn Agent Swarms", order: 1, content_type: "text", duration_minutes: 25 },
          { id: "ai-l11", title: "Building a Researcher-Writer-Reviewer Multi-Agent Team", order: 2, content_type: "video", duration_minutes: 35 },
          { id: "ai-l12", title: "Lab: Automated Market Competitor Intelligence Agent", order: 3, content_type: "assignment", duration_minutes: 35 }
        ]
      },
      {
        id: "ai-m5",
        title: "Module 5: Low-Code & No-Code Automations (n8n & Make)",
        order: 5,
        description: "Connecting AI nodes into webhook-driven business pipelines across CRM, email, and databases.",
        lessons: [
          { id: "ai-l13", title: "Self-Hosting n8n & Securing Production Webhooks", order: 1, content_type: "text", duration_minutes: 20 },
          { id: "ai-l14", title: "Building an Inbound Lead Qualification & Auto-Response Flow", order: 2, content_type: "video", duration_minutes: 30 },
          { id: "ai-l15", title: "Lab: Automated Customer Support Ticket Routing with AI", order: 3, content_type: "assignment", duration_minutes: 30 }
        ]
      },
      {
        id: "ai-m6",
        title: "Module 6: Capstone Project & Client Delivery Packaging",
        order: 6,
        description: "Deploying the complete custom automation on cloud infrastructure, writing documentation, and client handover.",
        lessons: [
          { id: "ai-l16", title: "Cloud Deployment on Docker, Render & Supabase", order: 1, content_type: "text", duration_minutes: 20 },
          { id: "ai-l17", title: "Monitoring Token Consumption, Latency & Error Fallbacks", order: 2, content_type: "video", duration_minutes: 25 },
          { id: "ai-l18", title: "Capstone Presentation & Client Proposal Packaging", order: 3, content_type: "assignment", duration_minutes: 35 }
        ]
      }
    ]
  },

  // ─────────────────────────────────────────────────────────────
  // 5. OFFENSIVE CYBER SECURITY & PENETRATION TESTING
  // ─────────────────────────────────────────────────────────────
  {
    id: "c5-cyber-security",
    slug: "offensive-cyber-security",
    title: "Offensive Cyber Security & Practical Penetration Testing",
    short_description: "Master ethical hacking, network reconnaissance, web app exploitation, privilege escalation, and Active Directory penetration in live browser labs.",
    description: "Zero-fluff offensive security training conducted inside browser-based virtual labs. Learn reconnaissance, web app attacks (OWASP Top 10), privilege escalation, network exploitation, and professional pentest report delivery.\n\nTaught by active cybersecurity consultants who perform red teaming and vulnerability audits for enterprise organizations.",
    level: "intermediate",
    category: "Cybersecurity",
    category_slug: "cybersecurity",
    duration_weeks: 12,
    duration_hours: 36,
    classes_count: 36,
    classes_per_week: 3,
    class_length_minutes: 70,
    price: 28000,
    currency: "BDT",
    thumbnail_url: "/banners/banner-cyber-security.jpg",
    weekly_rhythm: "Mon / Wed / Fri • Class 1: Attack Vector Theory, Class 2: Live Target Exploitation, Class 3: Defensive Analysis & Reporting",
    resources_included: "Browser Kali Linux Labs + Target Machine Access + Vulnerability Cheat Sheets + Pentest Report Template",
    target_audience: [
      {
        title: "Aspiring Penetration Testers & SOC Analysts",
        description: "Individuals aiming to break into professional cyber security roles with demonstrable hands-on offensive capabilities."
      },
      {
        title: "System Administrators & Developers",
        description: "Engineers wanting to understand how attackers exploit infrastructure and applications to build resilient defenses."
      },
      {
        title: "Bug Bounty Hunters",
        description: "Security enthusiasts looking to discover and responsibly report high-severity vulnerabilities on HackerOne and Bugcrowd."
      }
    ],
    outcomes: [
      "Perform exhaustive network reconnaissance and service enumeration using Nmap, Masscan, and Wireshark",
      "Exploit modern web application vulnerabilities: SQLi, SSRF, IDOR, XSS, and Authentication Bypasses",
      "Escalate privileges on compromised Linux and Windows targets using misconfigurations and kernels",
      "Navigate Active Directory environments: Kerberoasting, AS-REP roasting, and pass-the-hash attacks",
      "Bypass basic perimeter controls and establish stealthy command-and-control (C2) channels",
      "Write professional executive-ready penetration testing reports that clients pay for"
    ],
    modules: [
      {
        id: "cs-m1",
        title: "Module 1: Offensive Security Foundations & Reconnaissance",
        order: 1,
        description: "Ethical hacking legal boundaries, setting up Kali Linux, OSINT, and active network host discovery.",
        lessons: [
          { id: "cs-l1", title: "Legal Scopes, Ethics & Rules of Engagement in Pentesting", order: 1, content_type: "text", duration_minutes: 20 },
          { id: "cs-l2", title: "Passive & Active Reconnaissance: OSINT, DNS & WHOIS Gathering", order: 2, content_type: "video", duration_minutes: 25 },
          { id: "cs-l3", title: "Lab: Precision Host & Service Discovery with Nmap & Rustscan", order: 3, content_type: "assignment", duration_minutes: 35 }
        ]
      },
      {
        id: "cs-m2",
        title: "Module 2: Web Application Security (OWASP Top 10)",
        order: 2,
        description: "Burp Suite Pro mastery, HTTP request manipulation, SQL injection, Cross-Site Scripting, and broken access controls.",
        lessons: [
          { id: "cs-l4", title: "Burp Suite Workflow: Interception, Intruder & Repeater", order: 1, content_type: "text", duration_minutes: 20 },
          { id: "cs-l5", title: "Exploiting SQL Injection: Union, Error & Blind Exploitation", order: 2, content_type: "video", duration_minutes: 30 },
          { id: "cs-l6", title: "Lab: Bypassing Modern Authentication & Exploiting IDORs", order: 3, content_type: "assignment", duration_minutes: 35 }
        ]
      },
      {
        id: "cs-m3",
        title: "Module 3: Network Exploitation & Vulnerability Assessment",
        order: 3,
        description: "Exploiting vulnerable services (SMB, SSH, FTP, RDP), Metasploit Framework, and crafting custom payloads.",
        lessons: [
          { id: "cs-l7", title: "Vulnerability Scanning & CVE Analysis Methodologies", order: 1, content_type: "text", duration_minutes: 20 },
          { id: "cs-l8", title: "Metasploit Framework & Manual Exploit Adaptation", order: 2, content_type: "video", duration_minutes: 30 },
          { id: "cs-l9", title: "Lab: Remote Code Execution on Legacy & Misconfigured Daemons", order: 3, content_type: "assignment", duration_minutes: 35 }
        ]
      },
      {
        id: "cs-m4",
        title: "Module 4: Linux & Windows Privilege Escalation",
        order: 4,
        description: "SUID binaries, sudo misconfigurations, cron jobs, token impersonation, unquoted service paths, and kernel exploits.",
        lessons: [
          { id: "cs-l10", title: "Linux PrivEsc: SUID, Capabilities, Sudo & Writable Paths", order: 1, content_type: "text", duration_minutes: 25 },
          { id: "cs-l11", title: "Windows PrivEsc: Token Manipulation, DLL Hijacking & Services", order: 2, content_type: "video", duration_minutes: 30 },
          { id: "cs-l12", title: "Lab: Rooting Two Target Enterprise Machines in Sandbox", order: 3, content_type: "assignment", duration_minutes: 40 }
        ]
      },
      {
        id: "cs-m5",
        title: "Module 5: Active Directory Domain Compromise",
        order: 5,
        description: "Kerberos architecture, BloodHound domain mapping, Kerberoasting, DCSync, and lateral movement.",
        lessons: [
          { id: "cs-l13", title: "Active Directory Architecture & Kerberos Protocol Internals", order: 1, content_type: "text", duration_minutes: 25 },
          { id: "cs-l14", title: "Domain Mapping with BloodHound & Identifying Attack Paths", order: 2, content_type: "video", duration_minutes: 30 },
          { id: "cs-l15", title: "Lab: From Low-Priv Domain User to Domain Admin (DCSync)", order: 3, content_type: "assignment", duration_minutes: 45 }
        ]
      },
      {
        id: "cs-m6",
        title: "Module 6: Capstone Pentest & Professional Report Delivery",
        order: 6,
        description: "Full multi-machine network penetration test, vulnerability risk rating (CVSS), and writing an executive deliverable.",
        lessons: [
          { id: "cs-l16", title: "CVSS v3.1 Scoring & Remediation Recommendation Writing", order: 1, content_type: "text", duration_minutes: 20 },
          { id: "cs-l17", title: "The Enterprise Pentest Report Template: Executive vs. Technical", order: 2, content_type: "video", duration_minutes: 25 },
          { id: "cs-l18", title: "Capstone Defense: Presenting Findings to the Security Board", order: 3, content_type: "assignment", duration_minutes: 35 }
        ]
      }
    ]
  }
];

export function getCourseBySlug(slug: string): CourseData | undefined {
  return ALL_COURSES.find((c) => c.slug === slug);
}

export function getCoursesByCategory(categorySlug: string): CourseData[] {
  if (categorySlug === "all") return ALL_COURSES;
  return ALL_COURSES.filter((c) => c.category_slug === categorySlug);
}
