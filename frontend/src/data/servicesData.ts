export interface ServiceDeliverable {
  title: string;
  description?: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  category: "cybersecurity" | "ai-automation" | "software-engineering" | "creative-media";
  categoryLabel: string;
  badge: string;
  shortDescription: string;
  fullDescription: string;
  problemStatement: string;
  deliverables: string[];
  methodology: string[];
  imageUrl: string;
  iconName: string;
  featured?: boolean;
}

export const SERVICE_CATEGORIES = [
  { id: "all", label: "All Services", count: 23 },
  { id: "cybersecurity", label: "Offensive Cybersecurity", count: 11 },
  { id: "ai-automation", label: "AI & Automation", count: 7 },
  { id: "software-engineering", label: "Software & SaaS", count: 4 },
  { id: "creative-media", label: "Video & Creative", count: 1 },
] as const;

export const SERVICES_CATALOG: ServiceItem[] = [
  // ==========================================
  // PILLAR 1: OFFENSIVE CYBERSECURITY (11)
  // ==========================================
  {
    id: "ai-penetration-testing",
    slug: "ai-penetration-testing",
    title: "AI-Powered PenTesting",
    category: "cybersecurity",
    categoryLabel: "Cybersecurity",
    badge: "Next-Gen Offensive",
    shortDescription: "Combines human ethical hacker expertise with proprietary LLM models to accelerate reconnaissance, vulnerability discovery, and exploit path validation.",
    fullDescription: "Our custom AI-driven PenTesting process blends elite ethical hacker intuition with proprietary Large Language Models. It continuously learns from modern attack surfaces to deliver faster, smarter, and more adaptive penetration assessments.",
    problemStatement: "Traditional manual audits are slow, while standard automated vulnerability scanners produce high false-positive rates and miss complex chained vulnerabilities.",
    deliverables: [
      "Automated reconnaissance and threat modeling",
      "AI-assisted exploit path generation & verification",
      "Real-time risk correlation and vulnerability prioritization",
      "Adaptive remediation recommendations & patch validation",
      "Continuous learning from historic adversary tactics"
    ],
    methodology: [
      "Target Reconnaissance & AI Threat Modeling",
      "Automated Attack Surface Mapping",
      "Manual Exploit Verification & Deep PoC",
      "Remediation Roadmapping & Re-testing"
    ],
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
    iconName: "ShieldAlert",
    featured: true
  },
  {
    id: "web-app-pentesting",
    slug: "web-app-pentesting",
    title: "Web Application PenTesting",
    category: "cybersecurity",
    categoryLabel: "Cybersecurity",
    badge: "OWASP Top 10 & ASVS",
    shortDescription: "In-depth manual security assessments uncovering logic flaws, auth bypasses, and injection flaws following OWASP Top 10 and ASVS standards.",
    fullDescription: "Our web application penetration testing identifies critical security vulnerabilities in modern web applications that automated scanners miss. We follow OWASP Top 10 and ASVS frameworks to deliver complete attack vector coverage.",
    problemStatement: "Web applications are the primary target for malicious intrusions, data exfiltration, and business logic exploitation.",
    deliverables: [
      "Manual testing by certified offensive security practitioners",
      "Identification of complex business logic flaws",
      "Authentication and authorization bypass testing",
      "Session management and token security assessment",
      "Input validation, XSS, SQLi, and SSRF sanitization checks"
    ],
    methodology: [
      "Target Reconnaissance & Source Code Review",
      "Authentication & Role Matrix Testing",
      "Business Logic & API Vulnerability Hunting",
      "Executive & Technical Remediation Reporting"
    ],
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    iconName: "Globe",
    featured: true
  },
  {
    id: "mobile-app-pentesting",
    slug: "mobile-app-pentesting",
    title: "Mobile Application Security Testing",
    category: "cybersecurity",
    categoryLabel: "Cybersecurity",
    badge: "iOS & Android",
    shortDescription: "Static (SAST) and dynamic (DAST) analysis uncovering client-side data leaks, insecure keystores, and reverse engineering risks.",
    fullDescription: "Mobile applications handle sensitive biometric and payment data requiring specialized scrutiny. Our testing uncovers vulnerabilities across Android APKs and iOS IPAs through static, dynamic, and binary reverse-engineering analysis.",
    problemStatement: "Compromised mobile clients lead to credential theft, insecure local storage leaks, and reverse-engineered proprietary business logic.",
    deliverables: [
      "Client-side data storage and Keychain/Keystore security audit",
      "Authentication and session token lifecycle verification",
      "Network communication security (SSL Pinning & MitM testing)",
      "Binary protection and reverse engineering resistance checks",
      "Platform-specific vulnerability analysis (Android Intents/iOS URL schemes)"
    ],
    methodology: [
      "Static Binary Decompilation & Hardcoded Secret Extraction",
      "Dynamic Runtime Inspection (Frida & Objection)",
      "Network Traffic Interception & API Endpoint Auditing",
      "Post-Exploitation Local Storage & Memory Dumps"
    ],
    imageUrl: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?auto=format&fit=crop&q=80&w=800",
    iconName: "Smartphone"
  },
  {
    id: "api-security-testing",
    slug: "api-security-testing",
    title: "API Security Testing",
    category: "cybersecurity",
    categoryLabel: "Cybersecurity",
    badge: "REST & GraphQL",
    shortDescription: "Evaluates REST, GraphQL, and microservice APIs for Broken Object Level Authorization (BOLA), parameter tampering, and data leaks.",
    fullDescription: "APIs represent the central nervous system of modern SaaS and cloud platforms. We evaluate API architectures against OWASP API Security Top 10 to uncover authorization loopholes, rate limiting flaws, and backend data exposures.",
    problemStatement: "APIs are often exposed without adequate object-level authorization, allowing malicious users to query or manipulate unauthorized tenant records.",
    deliverables: [
      "Broken Object Level Authorization (BOLA/IDOR) testing",
      "Parameter manipulation and JSON injection testing",
      "Rate limiting and denial-of-service resource exhaustion checks",
      "Mass assignment and business logic vulnerability detection",
      "Sensitive data over-exposure and schema leakage assessment"
    ],
    methodology: [
      "Endpoint Enumeration & Schema Reconstruction",
      "Multi-User Privilege & Tenant Separation Testing",
      "Injection & Payload Fuzzing",
      "Detailed API Hardening & Gateway Rule Recommendations"
    ],
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
    iconName: "Server"
  },
  {
    id: "network-infrastructure-pentesting",
    slug: "network-infrastructure-pentesting",
    title: "Network & Infrastructure PenTesting",
    category: "cybersecurity",
    categoryLabel: "Cybersecurity",
    badge: "Internal & External",
    shortDescription: "Identifies vulnerabilities in corporate networks, cloud subnets, routers, firewalls, and Active Directory domains using MITRE ATT&CK.",
    fullDescription: "Our infrastructure penetration testing evaluates your internal and external network architecture, servers, and devices. Following MITRE ATT&CK and PTES methodologies, we uncover exploitable misconfigurations and privilege escalation vectors.",
    problemStatement: "Perimeter gaps and unpatched internal services allow attackers to gain an initial foothold and move laterally across critical corporate assets.",
    deliverables: [
      "External perimeter scanning and remote service exploitation",
      "Internal network compromise and lateral movement simulation",
      "Server configuration, OS hardening, and patch status assessment",
      "Active Directory, Kerberos, and domain privilege escalation testing",
      "Network device (firewall/router/switch) security configuration review"
    ],
    methodology: [
      "Network Topology Discovery & Port Enumeration",
      "Vulnerability Exploitation & Credential Harvesting",
      "Active Directory Lateral Movement & Domain Dominance",
      "Network Segmentation & Firewall Rule Analysis"
    ],
    imageUrl: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800",
    iconName: "Network"
  },
  {
    id: "red-teaming-exercises",
    slug: "red-teaming-exercises",
    title: "Red Teaming Exercises",
    category: "cybersecurity",
    categoryLabel: "Cybersecurity",
    badge: "Adversarial Simulation",
    shortDescription: "Multi-vector black-box simulations testing people, processes, and technology against determined, goal-oriented threat actors.",
    fullDescription: "Unlike scoped penetration tests, Red Team exercises take a realistic, goal-oriented adversarial approach. We simulate advanced persistent threats (APTs) to challenge and validate your blue team's detection and response capabilities.",
    problemStatement: "Organizations rarely know how their security operations center (SOC) will perform during a coordinated multi-phase cyber assault until it is too late.",
    deliverables: [
      "Black-box adversary simulation with minimal prior knowledge",
      "Multi-vector attack chains (OSINT, Phishing, Payload Delivery)",
      "Objective-based Crown Jewel access verification",
      "Evasion technique and defense bypass testing",
      "SOC detection and incident response capability benchmarking"
    ],
    methodology: [
      "Open-Source Intelligence (OSINT) & Weaponization",
      "Initial Access & Perimeter Breach",
      "Command & Control (C2) Setup & Persistence",
      "Lateral Movement & Objective Exfiltration",
      "Purple Team Collaborative Debrief"
    ],
    imageUrl: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=800",
    iconName: "Skull",
    featured: true
  },
  {
    id: "ai-llm-security",
    slug: "ai-llm-security",
    title: "AI & LLM PenTesting",
    category: "cybersecurity",
    categoryLabel: "Cybersecurity",
    badge: "GenAI Defense",
    shortDescription: "Specialized auditing for AI/LLM models, prompt injection, RAG data leakage, jailbreaks, and adversarial input manipulation.",
    fullDescription: "As enterprise applications integrate LLMs and AI pipelines, new attack vectors emerge. We test how secure your AI models really are against prompt injections, model extraction, training data poisoning, and unsafe tool execution.",
    problemStatement: "Unsanitized AI agent inputs can result in prompt injection jailbreaks, private database exposure, and unintended autonomous actions.",
    deliverables: [
      "Direct and indirect prompt injection & jailbreak simulation",
      "Training data extraction and model poisoning analysis",
      "Adversarial input and output manipulation testing",
      "Agent tool-calling authorization and database access controls",
      "Secure AI deployment, guardrail, and governance validation"
    ],
    methodology: [
      "LLM Architecture & Guardrail Inspection",
      "Fuzzing & Adversarial Prompt Injection Testing",
      "RAG Vector Database Leakage Analysis",
      "Defensive System Prompt & Guardrail Engineering"
    ],
    imageUrl: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=800",
    iconName: "Cpu"
  },
  {
    id: "iot-scada-pentesting",
    slug: "iot-scada-pentesting",
    title: "IoT / ICS / SCADA PenTesting",
    category: "cybersecurity",
    categoryLabel: "Cybersecurity",
    badge: "Industrial & Hardware",
    shortDescription: "Hardware, firmware, and protocol-level security testing for connected smart devices and critical industrial control systems.",
    fullDescription: "Our specialized testing for IoT, Industrial Control Systems (ICS), and SCADA environments ensures operational resilience across smart hardware and critical facilities without disrupting production uptime.",
    problemStatement: "Connected hardware often runs outdated firmware with unencrypted communications, leaving critical physical infrastructure vulnerable to remote sabotage.",
    deliverables: [
      "Firmware binary extraction and vulnerability analysis",
      "Industrial protocol evaluation (MQTT, Modbus, BACnet, CoAP)",
      "Hardware interface probing (UART, JTAG, SPI debugging ports)",
      "Gateway segmentation and operational network access control",
      "Safety-aware operational penetration testing"
    ],
    methodology: [
      "Hardware Teardown & Firmware Extraction",
      "Protocol Reverse Engineering & Fuzzing",
      "Network Segmentation Assessment",
      "Safety-Controlled Exploit Verification"
    ],
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    iconName: "Radio"
  },
  {
    id: "vulnerability-assessment",
    slug: "vulnerability-assessment",
    title: "Vulnerability Assessment",
    category: "cybersecurity",
    categoryLabel: "Cybersecurity",
    badge: "Hygiene & Baseline",
    shortDescription: "Automated scanning combined with rigorous manual verification to eliminate false positives and establish risk-prioritized patching.",
    fullDescription: "Our vulnerability assessment delivers an exhaustive audit of your systems, web servers, and cloud workloads. We combine enterprise automated scanning with hands-on validation to eliminate noise and give clear, prioritized remediation.",
    problemStatement: "Security teams are overwhelmed by thousands of unverified scanner alerts with no clear understanding of true business exploitability.",
    deliverables: [
      "Comprehensive external and internal vulnerability scanning",
      "Manual validation to eliminate 100% of false positives",
      "CVSS v3/v4 scoring mapped to actual business impact",
      "Executive summary and actionable developer remediation guide",
      "Complimentary re-scan verification after patches are applied"
    ],
    methodology: [
      "Asset Inventory & Surface Discovery",
      "High-Coverage Vulnerability Scanning",
      "Manual Verification & Proof-of-Concept Checks",
      "Risk Prioritization & Remediation Roadmap"
    ],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    iconName: "Search"
  },
  {
    id: "managed-security-services",
    slug: "managed-security-services",
    title: "Managed Security Services (MSSP)",
    category: "cybersecurity",
    categoryLabel: "Cybersecurity",
    badge: "24/7 Monitoring",
    shortDescription: "Continuous vulnerability management, proactive threat detection, ongoing security consultation, and rapid incident response.",
    fullDescription: "Our managed security service provides turnkey security operations for your company. We offer ongoing monitoring, regular security reviews, patch advisory, and on-call incident response support tailored to your team's budget.",
    problemStatement: "Hiring an in-house 24/7 security operations team is cost-prohibitive for growing companies.",
    deliverables: [
      "Continuous automated vulnerability monitoring and triage",
      "Quarterly comprehensive application and cloud security reviews",
      "Direct Slack/Discord access to senior offensive security engineers",
      "Incident response support and breach containment guidance",
      "Employee phishing simulation and security awareness training"
    ],
    methodology: [
      "Onboarding & Asset Perimeter Baseline",
      "Continuous Automated Vulnerability Telemetry",
      "Monthly Security Posture & Advisory Briefings",
      "On-Demand Emergency Incident Response Support"
    ],
    imageUrl: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800",
    iconName: "Activity"
  },
  {
    id: "pentest-as-a-service",
    slug: "pentest-as-a-service",
    title: "PenTest-as-a-Service (PTaaS)",
    category: "cybersecurity",
    categoryLabel: "Cybersecurity",
    badge: "Agile CI/CD",
    shortDescription: "On-demand, subscription-based offensive security testing integrated directly into your agile release sprints.",
    fullDescription: "PTaaS transforms traditional once-a-year penetration testing into an agile, subscription-based model. Your engineering team receives continuous security coverage, real-time vulnerability findings, and direct developer-to-hacker re-testing.",
    problemStatement: "Annual pentests leave software releases vulnerable during the remaining 11 months of active feature development.",
    deliverables: [
      "Continuous offensive testing aligned with feature release cycles",
      "Real-time ticket logging directly into Jira, GitHub, or Linear",
      "Zero-wait re-testing as soon as developers commit fixes",
      "On-demand testing requests for new microservices and releases",
      "Consolidated compliance audit reports for SOC 2, ISO 27001, and PCI-DSS"
    ],
    methodology: [
      "CI/CD Pipeline & Repository Integration",
      "Continuous Microservice & Feature Testing",
      "Instant Vulnerability Dispatch into Issue Trackers",
      "1-Click Verification & Continuous Compliance Stamping"
    ],
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    iconName: "RefreshCw"
  },

  // ==========================================
  // PILLAR 2: AI & INTELLIGENT AUTOMATION (7)
  // ==========================================
  {
    id: "ai-chatbots",
    slug: "ai-chatbots",
    title: "AI Chatbots & Conversational AI",
    category: "ai-automation",
    categoryLabel: "AI & Automation",
    badge: "Omnichannel Support",
    shortDescription: "Intelligent 24/7 conversational agents across Website, WhatsApp, and Messenger that qualify leads, answer FAQs, and resolve support tickets.",
    fullDescription: "Businesses lose valuable customers to slow response times and repetitive queries. We engineer trained conversational AI agents that resolve tier-1 support inquiries instantly and seamlessly hand off qualified leads to human representatives.",
    problemStatement: "Customer support queues bottleneck during peak hours, and leads bounce when inquiries aren't answered in seconds.",
    deliverables: [
      "Website, WhatsApp, and Messenger embedded AI support chatbots",
      "AI sales assistants that qualify incoming prospects automatically",
      "Multilingual natural language customer service engines",
      "Internal employee helpdesks connected to Notion/Confluence",
      "Seamless human escalation with full conversation history"
    ],
    methodology: [
      "Knowledge Base Ingestion & Document Processing",
      "Guardrail & Brand Voice Prompt Engineering",
      "Omnichannel Webhook & CRM Integration",
      "Continuous Conversation Analytics & Model Tuning"
    ],
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800",
    iconName: "Bot",
    featured: true
  },
  {
    id: "ai-agents-tool-use",
    slug: "ai-agents-tool-use",
    title: "Autonomous AI Agents with Tool Use",
    category: "ai-automation",
    categoryLabel: "AI & Automation",
    badge: "Action-Oriented AI",
    shortDescription: "Action-executing AI agents that interact with APIs, databases, calendars, and CRMs to automate end-to-end business tasks.",
    fullDescription: "Simple chatbots only chat; autonomous agents take action. We build function-calling AI agents that query live databases, book calendar meetings, update CRM pipelines, and trigger backend workflows autonomously.",
    problemStatement: "Employees spend hours acting as 'human glue' copying data between chat messages, calendar apps, and accounting software.",
    deliverables: [
      "AI calendar booking agents integrated with Google Calendar/Calendly",
      "Live order-tracking & inventory assistants querying SQL databases",
      "Autonomous ticket resolution agents creating Jira/Zendesk tickets",
      "Multi-agent reasoning workflows using LangChain and LangGraph",
      "Strict authorization boundaries preventing unauthorized actions"
    ],
    methodology: [
      "Tool Function Schema Definition & Parameter Mapping",
      "Agentic Decision Loops & Multi-Step Reasoning",
      "Database & Third-Party API Integration",
      "Execution Sandboxing & Verification Logs"
    ],
    imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800",
    iconName: "Zap",
    featured: true
  },
  {
    id: "workflow-automation",
    slug: "workflow-automation",
    title: "Workflow & Business Process Automation",
    category: "ai-automation",
    categoryLabel: "AI & Automation",
    badge: "Operational Efficiency",
    shortDescription: "Eliminate repetitive manual operations through automated invoicing, contract generation, employee onboarding, and document routing.",
    fullDescription: "Employees waste countless hours on repetitive manual workflows—copying data across spreadsheets, drafting standardized proposals, and sending manual receipts. We build end-to-end automations that execute these processes with zero human error.",
    problemStatement: "Manual operational workflows lead to administrative delays, employee burnout, and costly data entry mistakes.",
    deliverables: [
      "Automated client invoicing, payment reconciliation, and reporting",
      "Auto-generated business proposals and legal contracts from templates",
      "Employee and client onboarding automated workflows",
      "Automated document approval and signing pipelines",
      "Custom trigger-based Slack and email operational alerts"
    ],
    methodology: [
      "Process Bottleneck Audit & Workflow Mapping",
      "Automation Architecture Design (Zapier/Make/n8n/Python)",
      "System Integration & Failure Fallback Setup",
      "Testing, Rollout & Operational Staff Training"
    ],
    imageUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800",
    iconName: "Sliders"
  },
  {
    id: "marketing-sales-automation",
    slug: "marketing-sales-automation",
    title: "Marketing & Sales Funnel Automation",
    category: "ai-automation",
    categoryLabel: "AI & Automation",
    badge: "Revenue Growth",
    shortDescription: "Automate lead capture, CRM pipeline synchronization, personalized email drip sequences, and multi-channel marketing campaigns.",
    fullDescription: "Turn cold prospects into closed deals on autopilot. We connect your advertising channels, landing pages, CRM, and email marketing into a synchronized machine that nurtures leads 24/7 without manual intervention.",
    problemStatement: "Inconsistent sales follow-up causes over 60% of inbound marketing leads to go cold before reaching an account executive.",
    deliverables: [
      "Instant lead capture from landing page to HubSpot / Salesforce / Pipedrive",
      "Behavior-triggered email nurture sequences and SMS follow-ups",
      "Automated social media content scheduling and multi-platform distribution",
      "Abandoned-checkout and re-engagement automated campaigns",
      "Sales pipeline stage transition automations and rep assignment"
    ],
    methodology: [
      "Customer Journey & Conversion Funnel Mapping",
      "CRM Architecture & Attribution Setup",
      "Dynamic Copywriting & Email Automation Build",
      "A/B Testing & Conversion Rate Optimization"
    ],
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
    iconName: "TrendingUp"
  },
  {
    id: "data-pipeline-automation",
    slug: "data-pipeline-automation",
    title: "Data Pipeline & Sync Automation",
    category: "ai-automation",
    categoryLabel: "AI & Automation",
    badge: "ETL & Integration",
    shortDescription: "Connect disparate databases and SaaS tools with reliable automated data pipelines, web scrapers, and unified sync engines.",
    fullDescription: "Break down data silos across your organization. We engineer robust ETL pipelines and multi-platform synchronizers using Python, n8n, Make, and cloud queues to ensure every department operates on clean, live data.",
    problemStatement: "Disparate tools leave data fragmented across spreadsheets, accounting software, and CRMs, requiring hours of manual weekly reconciliation.",
    deliverables: [
      "Bi-directional data synchronization between cloud applications",
      "Scheduled web scrapers and competitor intelligence extractors",
      "Automated data cleaning, deduplication, and schema formatting",
      "Automated off-site database backups and cloud sync verification",
      "Webhook processing microservices with error handling and retry queues"
    ],
    methodology: [
      "Data Schema Mapping & Source Audit",
      "ETL Pipeline Engineering & Validation Rules",
      "Asynchronous Worker & Queue Setup",
      "Monitoring, Alerting & Error Fallback Protocols"
    ],
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
    iconName: "Database"
  },
  {
    id: "dashboards-reporting",
    slug: "dashboards-reporting",
    title: "Reporting & Real-Time Dashboards",
    category: "ai-automation",
    categoryLabel: "AI & Automation",
    badge: "Business Intelligence",
    shortDescription: "Auto-updating KPI dashboards and scheduled executive Slack/email reports generated from live business telemetry.",
    fullDescription: "Gain immediate clarity over revenue, operations, and team output. We build custom real-time dashboards and automated executive briefing bots that aggregate data directly from your databases and payment gateways.",
    problemStatement: "Leadership decisions are delayed when management must wait days for analysts to manually compile static slide decks.",
    deliverables: [
      "Custom real-time web dashboards displaying live business KPIs",
      "Scheduled automated daily/weekly email and Slack briefing reports",
      "Consolidated financial and revenue tracking from Stripe / PayPal",
      "Interactive data visualizations with drill-down filters",
      "Role-based dashboard views for executives, managers, and team members"
    ],
    methodology: [
      "Key Metric Definition & Data Source Connection",
      "Interactive Dashboard UI/UX Design",
      "Automated Report Generation Scripting",
      "Role-Based Access & Security Hardening"
    ],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    iconName: "BarChart3"
  },
  {
    id: "applied-ai-solutions",
    slug: "applied-ai-solutions",
    title: "Applied AI Solutions & Custom Models",
    category: "ai-automation",
    categoryLabel: "AI & Automation",
    badge: "Enterprise AI",
    shortDescription: "Custom AI solutions including OCR document extraction, enterprise RAG search engines, and smart recommendation systems.",
    fullDescription: "We build proprietary artificial intelligence systems customized to your industry's specific challenges—from extracting structured data from unstructured invoices to private neural search across millions of documents.",
    problemStatement: "Generic AI tools lack the domain context, accuracy, and security necessary to handle proprietary enterprise documents.",
    deliverables: [
      "Document and OCR data extraction from invoices, contracts, and IDs",
      "Enterprise Retrieval-Augmented Generation (RAG) vector search engines",
      "AI content generation and domain-specific writing assistants",
      "Smart recommendation systems and predictive customer models",
      "Local/Private LLM hosting (vLLM/Ollama) with zero external data sharing"
    ],
    methodology: [
      "Business Use Case & Data Readiness Assessment",
      "Custom Vector Embedding & Indexing Pipeline",
      "Fine-Tuning & Model Evaluation",
      "Private Containerized Deployment with API Endpoints"
    ],
    imageUrl: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=800",
    iconName: "Brain"
  },

  // ====================================================
  // PILLAR 3: SOFTWARE, WEB & MOBILE ENGINEERING (4)
  // ====================================================
  {
    id: "secure-websites",
    slug: "secure-websites",
    title: "Secure Website Building",
    category: "software-engineering",
    categoryLabel: "Software & SaaS",
    badge: "High Performance",
    shortDescription: "Ultra-fast, hardened, SEO-optimized web applications built with Next.js, React, and TypeScript scoring 95+ on Google Lighthouse.",
    fullDescription: "Your website is your primary digital storefront. We build modern, beautifully animated, lightning-fast web applications with built-in zero-trust security headers, responsive design systems, and enterprise SEO optimization.",
    problemStatement: "Vulnerable, slow, bloated WordPress templates suffer from frequent security compromises and poor conversion rates.",
    deliverables: [
      "Next.js App Router / React web application development",
      "Guaranteed 95+ Google Lighthouse score across all metrics",
      "Hardened CSP, Strict-Transport-Security, and anti-clickjacking headers",
      "Custom vanilla CSS design systems with smooth micro-animations",
      "Enterprise SEO metadata, OpenGraph tags, and JSON-LD schema integration"
    ],
    methodology: [
      "UX/UI Architecture & Responsive Design Prototyping",
      "Frontend Component Build with Strict TypeScript",
      "Security Header & Asset Optimization",
      "Automated CI/CD Deployment with Vercel or Docker"
    ],
    imageUrl: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800",
    iconName: "Layout",
    featured: true
  },
  {
    id: "custom-saas",
    slug: "custom-saas",
    title: "Custom SaaS Products & Startup MVPs",
    category: "software-engineering",
    categoryLabel: "Software & SaaS",
    badge: "Full-Stack SaaS",
    shortDescription: "Full-scale multi-tenant SaaS platforms with user auth, role-based permissions, Stripe subscriptions, and investor-ready MVPs.",
    fullDescription: "Turn your software concept into a profitable recurring revenue product. We architect and build scalable, multi-tenant SaaS platforms complete with subscription billing, customer portals, and admin management suites in weeks.",
    problemStatement: "Founders waste critical runway struggling with non-technical agencies that fail to deliver functional subscription software.",
    deliverables: [
      "Multi-tenant database design with tenant data isolation",
      "Stripe / LemonSqueezy subscription billing and customer portal",
      "Role-Based Access Control (RBAC) and enterprise SSO integration",
      "Investor-ready MVP development in 3-4 week focused sprints",
      "Admin telemetry dashboard for user management, churn, and MRR metrics"
    ],
    methodology: [
      "Product Architecture & User Journey Specification",
      "Database Modeling & Secure API Scaffolding",
      "Frontend Dashboard & Billing Integration",
      "Security Penetration Audit & Launch Support"
    ],
    imageUrl: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&q=80&w=800",
    iconName: "Layers",
    featured: true
  },
  {
    id: "custom-mobile-apps",
    slug: "custom-mobile-apps",
    title: "Custom Mobile App Development",
    category: "software-engineering",
    categoryLabel: "Software & SaaS",
    badge: "iOS & Android",
    shortDescription: "Cross-platform iOS and Android mobile apps featuring biometric security, offline synchronization, and real-time backend APIs.",
    fullDescription: "Reach users on their primary devices with native-performance mobile applications. We develop cross-platform apps using React Native and Flutter with biometric authentication, push notifications, and resilient offline-first storage.",
    problemStatement: "Maintaining separate native iOS and Android codebases doubles development costs and slows down feature iteration.",
    deliverables: [
      "Cross-platform iOS and Android mobile application development",
      "Biometric authentication (FaceID/Fingerprint) and secure Keychain storage",
      "Offline-first synchronization with background data syncing",
      "Real-time push notifications via Firebase Cloud Messaging",
      "Apple App Store and Google Play Store submission and approval handling"
    ],
    methodology: [
      "Mobile UX/UI Design & Interactive Figma Prototype",
      "Cross-Platform Core Development & Native Module Bridging",
      "Security Auditing & Dynamic Device Sandbox Testing",
      "Store Submission & Post-Launch Telemetry Setup"
    ],
    imageUrl: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800",
    iconName: "Smartphone",
    featured: true
  },
  {
    id: "backend-api-development",
    slug: "backend-api-development",
    title: "Backend & API Development",
    category: "software-engineering",
    categoryLabel: "Software & SaaS",
    badge: "Python & Cloud",
    shortDescription: "Scalable async backend microservices using Python FastAPI, PostgreSQL, Redis caching, and containerized Docker setups.",
    fullDescription: "Every great application demands an impenetrable, high-speed backend engine. We design and deploy high-throughput async microservices using Python FastAPI, SQLAlchemy, PostgreSQL, and Redis that effortlessly handle enterprise loads.",
    problemStatement: "Monolithic backends fail under high concurrent traffic and lack modular API contracts for third-party integrations.",
    deliverables: [
      "High-throughput REST and GraphQL APIs with FastAPI or Django",
      "PostgreSQL database schema design, indexing, and connection pooling",
      "Redis caching, rate-limiting, and distributed worker queues",
      "Third-party integrations (Stripe, AI APIs, Twilio, OAuth)",
      "Docker Compose containerization and automated cloud CI/CD"
    ],
    methodology: [
      "API Schema & Database ERD Modeling",
      "High-Performance Asynchronous Controller Build",
      "Integration Unit & Load Testing",
      "Containerization & Zero-Downtime Deployment"
    ],
    imageUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=800",
    iconName: "Terminal"
  },

  // ====================================================
  // PILLAR 4: CREATIVE & MEDIA PRODUCTION (1)
  // ====================================================
  {
    id: "video-editing-production",
    slug: "video-editing-production",
    title: "Video Editing & Motion Graphics",
    category: "creative-media",
    categoryLabel: "Video & Creative",
    badge: "4K Media Production",
    shortDescription: "High-impact video production, corporate explainers, tech demos, course lecture post-production, and social media reels.",
    fullDescription: "Elevate your brand with broadcast-grade video editing. We produce high-converting tech product explainers, professional academy course lectures, motion graphic animations, and viral social media clips tailored for high engagement.",
    problemStatement: "Poor video editing and unpolished audio undermine credibility and cause viewers to disengage within seconds.",
    deliverables: [
      "High-end tech product explainer videos and UI screen walkthroughs",
      "Professional course lecture editing with animated lower thirds and slides",
      "Motion graphics, 3D logo reveals, and custom intro/outro animations",
      "Short-form social media reels, TikToks, and YouTube Shorts cutdowns",
      "Studio audio cleanup, noise removal, sound design, and color grading"
    ],
    methodology: [
      "Creative Brief, Scripting & Storyboard Review",
      "Assembly Cut, Pacing & Visual Narrative Structuring",
      "Motion Graphics, VFX & Sound Design Mastering",
      "Final 4K Multi-Format Export & Social Platform Delivery"
    ],
    imageUrl: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=800",
    iconName: "Video",
    featured: true
  }
];

export function getServiceBySlug(slug: string): ServiceItem | undefined {
  return SERVICES_CATALOG.find((s) => s.slug === slug || s.id === slug);
}

export function getFeaturedServices(): ServiceItem[] {
  return SERVICES_CATALOG.filter((s) => s.featured);
}

export function getServicesByCategory(category: string): ServiceItem[] {
  if (category === "all") return SERVICES_CATALOG;
  return SERVICES_CATALOG.filter((s) => s.category === category);
}
