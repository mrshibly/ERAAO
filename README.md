# ERAAO — Applied AI & Cybersecurity Platform

[![Live Production](https://img.shields.io/badge/Live-eraao.com-0ea5e9?style=for-the-badge&logo=vercel)](https://eraao.com)
[![Frontend](https://img.shields.io/badge/Frontend-Vercel%20%7C%20Next.js%2016-black?style=for-the-badge&logo=next.js)](https://eraao.com)
[![Backend](https://img.shields.io/badge/Backend-Render%20%7C%20FastAPI-00E599?style=for-the-badge&logo=render)](https://eraao-backend.onrender.com/healthz)
[![Database](https://img.shields.io/badge/Database-PostgreSQL%20%7C%20Redis-4169E1?style=for-the-badge&logo=postgresql)](https://eraao.com)

**ERAAO** is an enterprise-grade Applied Artificial Intelligence and Offensive Cybersecurity Learning Academy & B2B Consulting Platform. Built with **Next.js 16 (App Router & Turbopack)** on the frontend, **FastAPI (Python 3.12)** on the backend, **PostgreSQL 16**, and **Redis 7** for caching and rate-limiting.

---

## 🚀 Live Production Environment

- **Official Website**: [https://eraao.com](https://eraao.com)
- **API Health Check**: [https://eraao-backend.onrender.com/healthz](https://eraao-backend.onrender.com/healthz)
- **API Readiness Check**: [https://eraao-backend.onrender.com/readyz](https://eraao-backend.onrender.com/readyz)

---

## 🌟 Key Features

### 🎓 Student Learning Portal & Catalog
- **Interactive Student Dashboard**: Streak heatmap, active course progress, and upcoming live session calendar.
- **Course Catalog (`/dashboard/student/catalog`)**: Browse published bootcamps, view syllabi, and enroll with 1-click inside the student portal.
- **Enrolled Courses Vault (`/dashboard/student/courses`)**: Syllabi filtering (*In Progress*, *Completed*) with interactive lecture modules.
- **Cryptographic Credential Ledger (`/dashboard/student/certificates`)**: Public cryptographic completion badge verification (`/verify/[id]`).
- **Academic Support Desk (`/dashboard/student/tickets`)**: Submit and track technical support requests and lab questions.

### 🛡️ AI Assistant with Security Guardrails
- Professional AI support chatbot powered by OpenRouter API with prompt injection defense, input length sanitization, temperature control, and automated context grounding.

### 🏢 Operations & Enterprise Administration
- **Operations Center (`/dashboard/admin`)**: Real-time system logs, metrics, user management, and role elevation controls.
- **Instructor Portal (`/dashboard/instructor`)**: Syllabi authoring, lecture publishing, and cohort oversight.
- **B2B Services & Bookings**: Enterprise cybersecurity consulting catalog, booking schedules, and quote request management.

---

## 🛠️ Architecture & Technology Stack

| Layer | Technologies | Deployment Platform |
| :--- | :--- | :--- |
| **Frontend** | Next.js 16 (App Router), React 19, Lucide Icons, Vanilla CSS | **Vercel** (`eraao.com`) |
| **Backend** | FastAPI (Python 3.12), Async SQLAlchemy 2.0, Alembic, Pydantic v2, Argon2 | **Render** (`eraao-backend.onrender.com`) |
| **Database & Cache** | PostgreSQL 16, Redis 7 (Rate Limiting & Lockout Guard) | Managed Cloud Database |
| **Security & SEO** | HSTS, CSP, CORS Scoping, Schema.org JSON-LD, Robots.txt, Dynamic Sitemap | Automated CI/CD Pipelines |

---

## 📁 Repository Structure

```
├── backend/
│   ├── app/
│   │   ├── api/v1/         # FastAPI API routes (auth, courses, enrollments, users, tickets, etc.)
│   │   ├── core/           # Security, config, logging, rate limiting
│   │   ├── db/             # Database session & migrations
│   │   ├── models/         # SQLAlchemy models
│   │   ├── schemas/        # Pydantic schemas
│   │   └── services/       # Business logic services
│   ├── scripts/            # Seed script (roles, permissions, admin user)
│   └── Dockerfile.prod
├── frontend/
│   ├── src/
│   │   ├── app/            # Next.js 16 App Router pages & layouts
│   │   ├── components/     # Reusable UI components (Logo, Chatbot, OnboardingModal)
│   │   └── context/        # AuthContext state management
│   └── Dockerfile.prod
├── nginx/                  # Nginx reverse proxy configuration
└── docker-compose.yml
```

---

## 📜 License

Licensed under the [MIT License](LICENSE).
