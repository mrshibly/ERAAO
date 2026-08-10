# ERAAO — Cybersecurity & AI Academy Platform

[![Stack](https://img.shields.io/badge/Stack-Next.js%2016%20%7C%20FastAPI%20%7C%20PostgreSQL-0ea5e9)](http://localhost)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

**ERAAO** is an enterprise-grade Cybersecurity and Artificial Intelligence learning platform & B2B consulting suite. Built with Next.js 16 (Turbopack), FastAPI (Python 3.12), PostgreSQL, Redis, and Nginx containerized with Docker Compose.

---

## 🌟 Key Features

### 🎓 Student Learning Portal
- **Command Center Dashboard**: Quick Resume Learning hero banner, weekly study streak heatmap tracker, and upcoming live session calendar.
- **Dynamic In-Portal Catalog (`/dashboard/student/catalog`)**: Browse published bootcamps, view syllabus modules, and enroll with 1-click inside the student portal.
- **Enrolled Courses Vault (`/dashboard/student/courses`)**: Filter syllabi by completion status (*In Progress*, *Completed*) and access interactive lecture modules.
- **Cryptographic Credential Ledger (`/dashboard/student/certificates`)**: Issue and verify cryptographic completion badges with public verification (`/verify/[id]`).
- **Academic Support Desk (`/dashboard/student/tickets`)**: Submit and track technical support requests and lab questions.
- **Student Profile Onboarding**: 2-step setup modal for first-time logins collecting Phone/WhatsApp numbers, skill level, and career goals.

### 🛡️ AI Assistant with Security Guardrails
- Professional support chatbot powered by OpenRouter API with prompt injection defense, input length sanitization, temperature control, and a strict no-emoji policy.

### 🏢 Platform Operations & Administration
- **Operations Center (`/dashboard/admin`)**: Real-time system logs, metrics, user management, and role elevation controls.
- **Instructor Mode (`/dashboard/instructor`)**: Syllabi authoring, lecture publishing, and cohort oversight.
- **B2B Services & Bookings**: Enterprise cybersecurity consulting catalog, booking schedules, and quote request management.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | Next.js 16 (App Router), React 19, Lucide Icons, Vanilla CSS Design System |
| **Backend** | FastAPI (Python 3.12), SQLAlchemy 2.0 (Async), Alembic, Pydantic v2, Passlib (Argon2) |
| **Database & Cache** | PostgreSQL 16, Redis 7 (Rate Limiting & Lockout Guard) |
| **Orchestration** | Docker Compose, Nginx Reverse Proxy |

---

## 🚀 Quickstart Guide

### Prerequisites
- [Docker Desktop](https://www.docker.com/products/docker-desktop/) (v24.0+)
- [Git](https://git-scm.com/)

### 1. Clone & Run Docker Stack
```bash
git clone https://github.com/mrshibly/Academy.aspx.git
cd Academy
docker compose up -d --build
```

### 2. Run Database Migrations & Seed Default Data
```bash
# Run Alembic migrations
docker exec academy-backend-1 sh -c "PYTHONPATH=. alembic upgrade head"

# Seed default roles, permissions, and admin user
docker exec academy-backend-1 sh -c "PYTHONPATH=. python -m scripts.seed"
```

### 3. Default Seed Credentials

| Role | Email | Password | Dashboard Route |
| :--- | :--- | :--- | :--- |
| **Platform Admin** | `admin@academy.dev` | `admin123456` | `/dashboard/admin` |
| **Student** | *Register at `/register`* | *Custom* | `/dashboard/student` |

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
