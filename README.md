# ⚡ ERAAO — AI Development & Cybersecurity Platform

> **Slogan:** *Lighting the future.*  
> **Domain:** [eraao.com](https://eraao.com)

A production-grade, enterprise platform for **AI development services, offensive & defensive cybersecurity, practitioner training, and verified LMS certification**. Built with **Next.js (App Router)** on the frontend and **FastAPI** on the backend.

[![Python](https://img.shields.io/badge/Python-3.12+-3776AB?logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.140+-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![Next.js](https://img.shields.io/badge/Next.js-16+-000000?logo=nextdotjs&logoColor=white)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Docker](https://img.shields.io/badge/Docker-Production_Ready-2496ED?logo=docker&logoColor=white)](https://docker.com)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Architecture & Tech Stack](#architecture--tech-stack)
- [Features](#features)
- [Project Structure](#project-structure)
- [Local Development](#local-development)
- [Docker Production Deployment](#docker-production-deployment)
- [Resource & RAM Benchmarks](#resource--ram-benchmarks)
- [Testing](#testing)
- [License](#license)

---

## 🚀 Overview

ERAAO unifies three core product lines into a single, high-performance monorepo:

1. **Enterprise Services Hub** — AI & LLM Agent Architecture, Red Teaming, Web/Mobile/Cloud Pentesting, and ISO 27001 / SOC-2 readiness.
2. **Practitioner Academy & LMS** — Interactive courses, quiz evaluation engine (80% threshold), progress tracking, and verifiable certificates.
3. **Multi-Role Dashboards** — Portals for Students, Instructors, Corporate B2B Clients, and Platform Administrators.

---

## 🏗 Architecture & Tech Stack

```
User Request → Nginx (Port 80/443 Reverse Proxy & Gzip)
                │
                ├── /api/*   → FastAPI Backend (Uvicorn Async, SQLite/PostgreSQL)
                └── /*       → Next.js Standalone Frontend (Edge-optimized)
```

| Layer | Technology | Purpose |
|-------|------------|---------|
| **Frontend** | Next.js 16 (App Router), React 19, TypeScript | High-performance, SSR & Standalone mode |
| **Styling** | Custom Vanilla CSS Design System | Zero-dependency, responsive dark theme |
| **Backend** | FastAPI (Python 3.12+), Pydantic v2 | High-concurrency async REST API |
| **Database** | PostgreSQL 16 (Prod) / SQLite (Dev) | Async SQLAlchemy 2.0 ORM with Alembic |
| **Cache & Queue** | Redis 7 & Celery | Rate limiting, session invalidation, workers |
| **Proxy & SSL** | Nginx Alpine | Reverse proxy, static asset caching, Gzip compression |
| **PDF Engine** | Playwright Chromium & WeasyPrint | Pixel-perfect QR-verifiable PDF certificates |

---

## ✨ Features

- **Iconic Standalone Branding**: Quantum Hex Shield logo mark (`Logo.tsx`) with dynamic slogan integration.
- **Low-RAM Capped Footprint**: Total stack consumes **< 220 MB RAM** in production.
- **Automated Certificate Ledger**: Cryptographic certificate generation and verification (`/verify/{verification_id}`).
- **SEO & Search Console**: Integrated Google Site Verification, dynamic `sitemap.ts`, `robots.ts`, and Schema.org JSON-LD.
- **Multi-Role Governance**: Access Control Matrix for `Student`, `Instructor`, `Corporate Client`, and `Admin`.

---

## 📂 Project Structure

```
Academy/
├── backend/                    # FastAPI Clean Architecture Backend
│   ├── app/
│   │   ├── api/v1/             # REST endpoints (auth, courses, certificates, admin...)
│   │   ├── models/             # SQLAlchemy async ORM models
│   │   ├── repositories/       # Encapsulated data layer queries
│   │   ├── services/           # Business logic & certificate PDF engine
│   │   └── schemas/            # Pydantic v2 request/response schemas
│   ├── tests/                  # Pytest unit & integration suites
│   ├── Dockerfile.prod         # Low-RAM production container config
│   └── pyproject.toml
│
├── frontend/                   # Next.js 16 App Router Frontend
│   ├── src/
│   │   ├── app/                # App pages (marketing, LMS, dashboards)
│   │   ├── components/         # Reusable UI (Logo, JsonLd, Nav...)
│   │   └── context/            # AuthContext provider
│   ├── Dockerfile.prod         # Standalone mode Docker build
│   └── package.json
│
├── nginx/                      # Nginx reverse proxy configuration
│   └── default.conf
│
├── docker-compose.yml          # Production multi-container composition
├── .env.production.example     # Environment template
└── README.md
```

---

## 💻 Local Development

### Prerequisites
- Node.js 18+ & `npm`
- Python 3.11+
- Docker & Docker Compose (optional for local container testing)

### 1. Run Backend (FastAPI)
```bash
cd backend
python -m venv venv
source venv/bin/activate # Linux/Mac (or venv\Scripts\activate on Windows)
pip install -e ".[dev]"
python -m scripts.seed
uvicorn app.main:app --port 8000 --reload
```
> API Docs live at `http://localhost:8000/docs`

### 2. Run Frontend (Next.js)
```bash
cd frontend
npm install
npm run dev
```
> Frontend live at `http://localhost:3000`

---

## 🐳 Docker Production Deployment

To run the complete stack on a **Hostinger KVM 1 (Singapore)** or any VPS:

```bash
# 1. Clone repository
git clone https://github.com/mrshibly/Academy.git eraao
cd eraao

# 2. Configure environment
cp .env.production.example .env.production
nano .env.production # Set passwords and secrets

# 3. Build & start containers
docker compose up -d --build
```
> Platform live at **`http://localhost`** (Port 80)

---

## 📊 Resource & RAM Benchmarks (Measured)

| Service | Container RAM | Memory Limit | RAM Footprint % |
|---------|:-------------:|:------------:|:---------------:|
| **Nginx Proxy** | **8.5 MB** | 32 MB | 27% |
| **Next.js Frontend** | **48.6 MB** | 256 MB | 19% |
| **FastAPI Backend** | **101.1 MB** | 256 MB | 39% |
| **PostgreSQL DB** | **32.4 MB** | 384 MB | 8% |
| **Redis Cache** | **7.4 MB** | 64 MB | 11% |
| **TOTAL** | **~198 MB** | 992 MB | **20%** |

---

## 🧪 Testing

Run backend tests using Pytest:

```bash
cd backend
python -m pytest app/tests
```
> Result: `8 passed, 0 failures`

---

## 📜 License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.

---

<p align="center">
  <b>ERAAO — Lighting the future.</b><br>
  Built with ❤️ using Next.js, FastAPI, PostgreSQL, and Docker
</p>
