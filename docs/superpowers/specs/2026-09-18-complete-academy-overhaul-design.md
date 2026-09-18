# ERAAO Complete Academy Overhaul Specification

**Date**: 2026-09-18  
**Status**: Approved by User  
**Target System**: Frontend (Next.js 16 App Router), Backend (FastAPI + AsyncPG PostgreSQL + Redis), Design System (`globals.css`)

---

## 1. Executive Summary & Goals

ERAAO is evolving into a full-scale, enterprise-grade learning academy where:
1. **Administrative Governance is Complete**: The administrator has dynamic, granular control over curriculum, lesson attachments (worksheets, audio packs, guides), cohorts, live meeting links (Zoom/Google Meet), student enrollments, progress adjustments, announcements, and certificates.
2. **Student Learning Experience is World-Class**: Learners have access to a modern classroom player (`/learn/[enrollment_id]`) featuring video and reading materials, downloadable worksheets/audio packs, in-browser auto-saving notes, live cohort class alerts, and one-click contextual support.
3. **Content and Typographic Polish**:
   - Total removal of em-dashes (`—`), en-dashes (`–`), and decorative dashes across user-facing pages, metadata, headers, cards, and data files.
   - Total removal of raw emojis across all components, enforcing 100% crisp Lucide SVG icons.
   - Consistent typography scale and cohesive color tokens across every public, student, and admin view.

---

## 2. Global Design System, Typography & Content Polish

### A. Strict Typographic Rules
* **Primary Sans Font**: `var(--font-plus-jakarta)` (`Plus Jakarta Sans`) applied uniformly to headings, body copy, form controls, and cards.
* **Monospace Font**: `var(--font-jetbrains-mono)` (`JetBrains Mono`) reserved strictly for code snippets, cryptographic ledger signatures, and certificate verification hashes.
* **Typographic Hierarchy**:
  * Page Main Title: `var(--text-3xl)` (1.875rem) to `var(--text-4xl)` (2.25rem), weight 800.
  * Section Header: `var(--text-xl)` (1.25rem) to `var(--text-2xl)` (1.5rem), weight 700.
  * Card Header: `var(--text-base)` (1.0rem) to `var(--text-lg)` (1.125rem), weight 600.
  * Body Text: `var(--text-sm)` (0.875rem), weight 400, line-height 1.6, color `var(--text-secondary)`.
  * Badges and Eyebrows: `var(--text-xs)` (0.75rem), weight 700, uppercase letter-spacing 0.06em.

### B. Color Token Standardization
* **Light Surfaces**: Background `#ffffff`, subtle background `#f8fafc`, borders `var(--border-color)` (`#e2e8f0`).
* **Dark Surfaces**: Background `#0f172a`, card background `#1e293b`, borders `rgba(255, 255, 255, 0.08)`.
* **Brand Accents**: Primary Blue `var(--accent-blue)` (`#0ea5e9`), Success Emerald `var(--color-success)` (`#22c55e`), Warning Amber `var(--color-warning)` (`#f59e0b`).
* Eliminate scattered inline hex definitions (`#94a3b8`, `#64748b`, `rgba(255,255,255,0.7)`) in favor of unified CSS token variables.

### C. Dash and Hyphen Sanitization
* All em-dashes (`—`), en-dashes (`–`), and decorative ` - ` across 33+ files are replaced:
  * Page Titles: `ERAAO — Applied AI & Cybersecurity Academy` -> `ERAAO | Applied AI and Cybersecurity Academy`.
  * Meta descriptions and headers: replaced with colon `:`, vertical pipe `|`, or natural phrasing.
  * Time and Date Ranges: `09:00 - 11:00 PM` -> `09:00 to 11:00 PM`; `Showing 1–9` -> `Showing 1 to 9`.
  * Bengali Content: `বুঝে নিন—কেন` -> `বুঝে নিন: কেন`; `দক্ষতায় নয়—পদ্ধতিতে` -> `দক্ষতায় নয়, পদ্ধতিতে`; `রাত ৯:০০ টা - ১১:০০ টা` -> `রাত ৯:০০ টা থেকে ১১:০০ টা`.

### D. Zero-Emoji Enforcement
* No raw unicode emojis in UI copy, data models, seeds, or system notices.
* All visual anchors utilize Lucide SVG icons (`BookOpen`, `Award`, `Sparkles`, `ShieldCheck`, `Layers`, `Video`, `FileText`, `CheckCircle2`, `Download`, `Edit3`).

---

## 3. Architecture & Data Model Upgrades

### A. Backend Model Extensions

#### 1. `Cohort` Model (`backend/app/models/cohort.py`)
Add fields to support live classrooms:
* `meeting_url: Mapped[str | None]` (String 2048, nullable): Zoom, Google Meet, or Teams URL.
* `meeting_passcode: Mapped[str | None]` (String 100, nullable): Access code or PIN.
* `schedule_info: Mapped[str | None]` (String 500, nullable): Human-readable schedule (e.g. `Every Monday, Wednesday, Friday at 09:00 PM`).
* `announcement: Mapped[str | None]` (Text, nullable): Broadcast message from instructor/admin.

#### 2. `Lesson` Model (`backend/app/models/course.py`)
Add support for lesson attachments:
* `attachments: Mapped[str | None]` (Text, nullable): JSON-encoded list of downloadable resources:
  ```json
  [
    {
      "title": "Module 1 Practice Worksheet",
      "url": "https://assets.eraao.com/worksheets/module-1-worksheet.pdf",
      "type": "pdf",
      "size": "2.4 MB"
    }
  ]
  ```

#### 3. API Routes Extensions
* `POST /api/v1/enrollments/admin/direct-enroll`: Direct enrollment of any student into a course or cohort by admin.
* `PATCH /api/v1/enrollments/admin/{enrollment_id}/progress`: Admin manual progress override and course completion flag.
* `PATCH /api/v1/cohorts/{cohort_id}`: Admin update for meeting URL, passcode, schedule, and announcement.

---

## 4. Admin Governance Console Enhancements

### A. Cohort & Live Session Control (`/dashboard/admin/cohorts`)
* **Create/Edit Cohort Modal**:
  * Inputs for Live Meeting URL (Zoom/Google Meet), Meeting Passcode, Class Schedule text, and Announcement Notice.
* **Cohort Status Overview**:
  * Live status pill, enrolled student count vs capacity, and one-click test link to verify the meeting URL.

### B. Course Builder & Materials Manager (`/dashboard/admin/courses/builder/[id]`)
* **Resource Attachments Section** inside the lesson editor:
  * Admin can add downloadable worksheets, audio packs, PDFs, and cheatsheets.
  * Direct title and URL entry with type selector (`PDF Worksheet`, `Audio Lab`, `Cheat Sheet`, `Starter Code`).
* **Lesson Order Controls**:
  * Move Up / Move Down buttons to reorder lessons within any module seamlessly.
  * Free Preview toggle per lesson.

### C. Student Direct Enrollment & Progress Manager (`/dashboard/admin/enrollments`)
* **Direct Enroll Button**:
  * Modal with user selector / email search and course/cohort selector to bypass checkout for manual payments, scholarships, or corporate learners.
* **Progress Adjustment**:
  * Admin can view detailed lesson progress for any student and trigger "Mark Course Completed" to immediately issue an official certificate.

---

## 5. Student Learning Experience & Classroom Player

### A. Enhanced Classroom Workspace (`/learn/[enrollment_id]`)
Below the lecture video/text/quiz, four responsive tabs provide an all-in-one workstation:
1. **Lecture Tab**:
   * Responsive video player with playback speeds (0.75x, 1x, 1.25x, 1.5x, 2x).
   * Clean typography for markdown guides and interactive quiz player.
2. **Resources & Worksheets Tab**:
   * Interactive download cards for official module worksheets, listening audio packs, and study materials.
   * Direct download triggers and file size indicators.
3. **Personal Notes Tab**:
   * Persistent student scratchpad saved automatically in browser LocalStorage per lesson/course.
   * "Export Notes (.txt)" button for offline study.
4. **Ask Instructor Tab**:
   * Contextual help form allowing students to submit questions on the current lesson directly to the academic helpdesk.

### B. Live Cohort Hub & Announcement Banner
* When a student is enrolled in a live cohort:
  * Prominent Live Session Card at the top of the classroom and student dashboard.
  * "Join Live Class" button opening the admin-configured meeting link.
  * Real-time countdown to next session and instructor notice board.

### C. Student Dashboard (`/dashboard/student`)
* Symmetric layout with active streaks, active courses with percentage completion bars, upcoming live classes, and earned certificates.
* Instant 100% completion celebration banner with direct link to cryptographic ledger verification (`/verify/[id]`).

---

## 6. Verification & Quality Gates

1. **Static Analysis & Linting**:
   * Zero TypeScript or ESLint errors across the frontend build.
   * Zero syntax or schema errors across FastAPI backend models and endpoints.
2. **Dash and Emoji Sanitization Audit**:
   * Automated grep verification confirming 0 instances of em-dash `—` or en-dash `–` in UI strings.
   * Automated grep verification confirming 0 raw emoji characters.
3. **End-to-End Workflow Testing**:
   * Admin updates cohort with live meeting link -> Student sees "Join Live Class" button.
   * Admin adds worksheet attachment to lesson -> Student sees and downloads worksheet in Resources tab.
   * Admin direct-enrolls student -> Student immediately accesses course in `/dashboard/student`.
   * Student completes 100% syllabus -> Certificate automatically unlocks and verifies on `/verify/[id]`.
