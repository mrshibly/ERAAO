# ERAAO Enterprise Services Expansion Specification

- **Date:** 2026-08-18
- **Status:** Approved
- **Scope:** Standalone Landing Page (`landing-page/index.html`) & Next.js Full-Stack Application (`frontend/src/app/services/*`)

---

## 1. Overview & Objectives

Expand ERAAO's service offerings across both the high-converting standalone landing page and the Next.js enterprise web portal. The expanded catalog integrates:
1. **Offensive Cybersecurity & PenTesting** (11 services benchmarked from Beetles.io)
2. **AI & Intelligent Automation** (7 services benchmarked from the AI Automation Overview document)
3. **Software, Web & Mobile Engineering** (Secure Websites, Custom SaaS Products, Custom Mobile Apps, Backend APIs)
4. **Creative Media Production** (Professional Video Editing & Motion Graphics)

Every service includes high-resolution Unsplash imagery, key value propositions, bulleted deliverables scope, and interactive quote/consultation CTAs.

---

## 2. Complete Service Taxonomy

### Pillar 1: Offensive Cybersecurity (`cybersecurity`)
1. **AI-Powered Penetration Testing** (`ai-penetration-testing`)
   - *Description:* Combines ethical hacker expertise with LLM-assisted reconnaissance and exploit path generation for faster discovery.
   - *Key Deliverables:* Automated reconnaissance, AI-assisted exploit path simulation, real-time risk correlation, adaptive remediation roadmaps.
   - *Image:* Unsplash cyber terminal/AI security (`photo-1526374965328-7f61d4dc18c5`)
2. **Web Application PenTesting** (`web-app-pentesting`)
   - *Description:* Deep manual assessment targeting OWASP Top 10, ASVS, business logic flaws, and privilege escalation vulnerabilities.
   - *Key Deliverables:* Business logic testing, authentication & session audits, input injection verification, OWASP ASVS compliance report.
   - *Image:* Web code security inspection (`photo-1555066931-4365d14bab8c`)
3. **Mobile Application Security Testing** (`mobile-app-pentesting`)
   - *Description:* Static and dynamic analysis for iOS and Android applications to uncover data storage, reverse-engineering, and network leakage flaws.
   - *Key Deliverables:* Client-side storage audit, binary reverse-engineering resistance, API communication analysis, keychain/keystore assessment.
   - *Image:* Mobile device security testing (`photo-1555774698-0b77e0d5fac6`)
4. **API Security Testing** (`api-security-testing`)
   - *Description:* Rigorous testing of REST, GraphQL, and WebSocket APIs against authorization flaws, parameter tampering, and data exposures.
   - *Key Deliverables:* BOLA/BFLA detection, rate limiting & resource exhaustion testing, token lifecycle review, sensitive data exposure checks.
   - *Image:* API telemetry & network traffic (`photo-1558494949-ef010cbdcc31`)
5. **Network & Infrastructure PenTesting** (`network-infrastructure-pentesting`)
   - *Description:* Internal and external network assessments following MITRE ATT&CK and PTES methodologies.
   - *Key Deliverables:* External perimeter testing, internal lateral movement simulations, Active Directory audit, server hardening guidance.
   - *Image:* Server rack datacenter (`photo-1544197150-b99a580bb7a8`)
6. **Red Teaming Exercises** (`red-teaming-exercises`)
   - *Description:* Adversarial simulations mimicking real-world threat actors to test organizational detection, defense, and incident response.
   - *Key Deliverables:* Multi-vector black-box attack, physical & social engineering simulations, detection capability benchmarking, executive debrief.
   - *Image:* Hacker operations war room (`photo-1563986768609-322da13575f3`)
7. **AI & LLM Security Auditing** (`ai-llm-security`)
   - *Description:* Specialized evaluation of AI/LLM applications against prompt injections, jailbreaks, training data extraction, and model poisoning.
   - *Key Deliverables:* Prompt injection & jailbreak testing, model extraction vulnerability check, RAG data leakage audit, AI governance review.
   - *Image:* AI neural matrix visualization (`photo-1677442136019-21780efad99a`)
8. **IoT / ICS / SCADA PenTesting** (`iot-scada-pentesting`)
   - *Description:* Hardware, firmware, and protocol-level testing for connected IoT devices, industrial control systems, and SCADA infrastructure.
   - *Key Deliverables:* Firmware reverse engineering, protocol analysis (MQTT/Modbus), gateway security assessment, safety-aware testing.
   - *Image:* Hardware & embedded circuit boards (`photo-1518770660439-4636190af475`)
9. **Vulnerability Assessment & Management** (`vulnerability-assessment`)
   - *Description:* Comprehensive scanning combined with manual verification to eliminate false positives and establish risk-prioritized patching.
   - *Key Deliverables:* Full-perimeter automated scan, manual validation of findings, CVSS scoring & business risk mapping, remediation assistance.
   - *Image:* Security compliance analytics (`photo-1551288049-bebda4e38f71`)
10. **Managed Security Services (MSSP)** (`managed-security-services`)
    - *Description:* Ongoing continuous security monitoring, proactive threat hunting, vulnerability management, and incident response support.
    - *Key Deliverables:* 24/7 continuous threat monitoring, regular scheduled assessments, on-demand security advisory, incident response hotline.
    - *Image:* Security Operations Center (SOC) (`photo-1504384308090-c894fdcc538d`)
11. **PenTest-as-a-Service (PTaaS)** (`pentest-as-a-service`)
    - *Description:* Continuous, subscription-based offensive security integrated directly into CI/CD development pipelines.
    - *Key Deliverables:* Continuous security coverage, real-time vulnerability reporting, developer workflow integration, flexible testing schedule.
    - *Image:* Agile DevOps cloud pipeline (`photo-1460925895917-afdab827c52f`)

---

### Pillar 2: AI & Intelligent Automation (`ai-automation`)
1. **AI Chatbots & Conversational AI** (`ai-chatbots`)
   - *Description:* 24/7 omnichannel conversational bots for customer support, sales qualification, and internal employee helpdesks.
   - *Key Deliverables:* Website / WhatsApp / Messenger bots, automated lead qualification, multilingual conversational AI, seamless human handoff.
   - *Image:* Conversational AI interface (`photo-1531482615713-2afd69097998`)
2. **Autonomous AI Agents with Tool Use** (`ai-agents-tool-use`)
   - *Description:* Action-taking AI agents that execute complex tasks like booking calendar events, updating CRMs, or checking database statuses.
   - *Key Deliverables:* Calendar & appointment scheduling agents, CRM & ERP synchronizers, automated support ticket resolution bots.
   - *Image:* Futuristic AI automation engine (`photo-1618005182384-a83a8bd57fbe`)
3. **Workflow & Business Process Automation** (`workflow-automation`)
   - *Description:* End-to-end automation of repetitive tasks, reducing employee hours spent on data transfer and manual documents.
   - *Key Deliverables:* Automated invoicing & financial reporting, proposal/contract generation, employee onboarding automated workflows.
   - *Image:* Automated workflow digital stream (`photo-1451187580459-43490279c0fa`)
4. **Marketing & Sales Funnel Automation** (`marketing-sales-automation`)
   - *Description:* Automated lead capture, CRM pipeline management, email drip sequences, and multi-channel marketing campaigns.
   - *Key Deliverables:* Lead capture-to-CRM pipeline, automated email nurture sequences, social media distribution, re-engagement automations.
   - *Image:* Digital marketing analytics dashboard (`photo-1460925895917-afdab827c52f`)
5. **Data Pipeline & Sync Automation** (`data-pipeline-automation`)
   - *Description:* Connect fragmented tools via Zapier, Make, n8n, or custom Python pipelines to eliminate manual spreadsheet reconciliation.
   - *Key Deliverables:* Multi-app data synchronization, scheduled web scraping, automated ETL data formatting, automated database backups.
   - *Image:* High-speed data infrastructure (`photo-1518770660439-4636190af475`)
6. **Real-Time Dashboards & Executive Reporting** (`dashboards-reporting`)
   - *Description:* Live executive KPI dashboards with automated scheduled summaries delivered directly to Slack or email.
   - *Key Deliverables:* Real-time executive dashboards, scheduled automated email/Slack reports, custom metric trackers for leadership.
   - *Image:* Business intelligence data wall (`photo-1551288049-bebda4e38f71`)
7. **Applied AI & Custom Solutions** (`applied-ai-solutions`)
   - *Description:* Tailored AI models for OCR document extraction, intelligent vector search/RAG, and personalized recommendation engines.
   - *Key Deliverables:* Invoice & contract document parsing, enterprise RAG search engines, smart product/content recommendation engines.
   - *Image:* Deep learning artificial intelligence (`photo-1677442136019-21780efad99a`)

---

### Pillar 3: Software, Web & Mobile Engineering (`software-engineering`)
1. **Secure Website Building** (`secure-websites`)
   - *Description:* High-performance, SEO-optimized, hardened web applications built with Next.js/React scoring 95+ on Google Lighthouse.
   - *Key Deliverables:* Zero-trust web architecture, 95+ Lighthouse score guarantee, responsive modern UI, built-in security headers & CSP.
   - *Image:* Modern web design showcase (`photo-1498050108023-c5249f4df085`)
2. **Custom SaaS Product Development & Startups MVPs** (`custom-saas`)
   - *Description:* Full-scale multi-tenant SaaS platforms with user authentication, role-based access control, Stripe subscriptions, and investor-ready MVPs.
   - *Key Deliverables:* Multi-tenant database architecture, Stripe/PayPal payment billing, customer portal & admin management, fast MVP delivery.
   - *Image:* SaaS cloud dashboard interface (`photo-1507238691740-187a5b1d37b8`)
3. **Custom Mobile App Development** (`custom-mobile-apps`)
   - *Description:* Cross-platform iOS & Android mobile applications featuring biometric authentication, offline synchronization, and real-time APIs.
   - *Key Deliverables:* iOS & Android native/React Native apps, biometric auth & encryption, real-time push notifications, offline data sync.
   - *Image:* Mobile application interfaces (`photo-1512941937669-90a1b58e7e9c`)
4. **Backend & High-Throughput API Development** (`backend-api-development`)
   - *Description:* Scalable asynchronous backend architectures using Python FastAPI, Django, PostgreSQL, Redis caching, and Docker containerization.
   - *Key Deliverables:* REST/GraphQL API microservices, database schema design & indexing, third-party payment & AI integrations, Docker container setup.
   - *Image:* Backend code and cloud server logs (`photo-1526374965328-7f61d4dc18c5`)

---

### Pillar 4: Creative & Media Production (`creative-media`)
1. **Professional Video Editing & Motion Graphics** (`video-editing-production`)
   - *Description:* High-impact video production, corporate explainers, course lecture post-production, tech demos, and viral social media reels.
   - *Key Deliverables:* 4K tech product explainers, course video post-production, motion graphics & logo animations, multi-platform social cutdowns.
   - *Image:* Professional video editing timeline suite (`photo-1574717024653-61fd2cf4d44d`)

---

## 3. UI/UX & Implementation Design

### A. Landing Page (`landing-page/index.html`)
1. **Category Filter Tabs:**
   - Interactive buttons: `All Services`, `Cybersecurity (11)`, `AI & Automation (7)`, `Software & SaaS (4)`, `Video & Creative (1)`.
   - Instant dynamic filtering with smooth CSS opacity/transform transitions.
2. **Service Cards:**
   - 3-column responsive grid on desktop, 2-column on tablet, 1-column on mobile.
   - Unsplash thumbnail with rounded frame, subtle border hover effect, and category tag badge.
   - Clear typography: Title, concise summary paragraph, 4 bulleted deliverables with cyan checkmarks, and an "Inquire Service ↗" CTA that scrolls to `#contact` and pre-populates the inquiry form.
3. **Harmonized Capabilities & Practice Matrix:**
   - Update the practice areas matrix and ticker to highlight all 4 pillars.

### B. Next.js Portal (`frontend/src/app/services/*`)
1. **Catalog View (`frontend/src/app/services/page.tsx`):**
   - Interactive client-side category filter pills + search input.
   - Rich cards for all 23 services linking to their respective `/services/[slug]`.
   - "Request Quote" and "Book Consultation" action buttons.
2. **Dynamic Detail Route (`frontend/src/app/services/[slug]/page.tsx`):**
   - Full dictionary data for all 23 services with slug matching.
   - Displays Hero, Problem Statement, Technical Deliverables Checklist, Methodology Flow, and Interactive Quote Request Form.
3. **Design System & Metadata:**
   - Ensure responsive layout, accessible contrast, and updated SEO metadata tags in `sitemap.ts` and `layout.tsx`.

---

## 4. Verification Plan
1. **Visual Testing:** Verify responsive layout and interactions in `landing-page/index.html` across all filter tabs.
2. **Next.js Route Testing:** Verify `/services` catalog and `/services/[slug]` dynamic detail pages render without hydration or compile errors.
3. **Docker Stack Testing:** Verify container build passes with `docker compose up -d --build` and all endpoints respond with HTTP 200.
