# Complete Academy Overhaul Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Transform ERAAO into a fully admin-controlled, world-class learning academy with zero dashes/emojis, consistent typography/colors across all pages, live cohort management, lesson resource attachments, and an elevated student classroom player.

**Architecture:** Next.js 16 App Router on frontend with centralized design tokens in `globals.css`; FastAPI backend with AsyncPG PostgreSQL models for courses, cohorts, and enrollments; full admin management suite and tabbed student classroom.

**Tech Stack:** Next.js 16, React 19, TypeScript, Lucide React, FastAPI, SQLAlchemy 2.0, PostgreSQL, Vanilla CSS design tokens.

## Global Constraints

- **No Emojis**: 100% strict Lucide SVG icons across all interfaces, data files, and notifications.
- **No Em/En Dashes**: Eradicate all `—`, `–`, and decorative ` - ` from titles, copy, ranges, and meta descriptions.
- **Consistent Typography**: Plus Jakarta Sans primary across all pages; JetBrains Mono strictly for code/hashes.
- **Type Safety**: All TypeScript interfaces and Pydantic schemas must be strictly typed with no regressions.

---

### Task 1: Complete Dash & Emoji Sanitization Across Frontend & Content

**Files:**
- Modify: `frontend/src/app/layout.tsx`
- Modify: `frontend/src/app/manifest.ts`
- Modify: `frontend/src/app/academy/page.tsx`
- Modify: `frontend/src/app/academy/courses/[slug]/page.tsx`
- Modify: `frontend/src/app/academy/courses/[slug]/layout.tsx`
- Modify: `frontend/src/app/academy/free-bootcamp/page.tsx`
- Modify: `frontend/src/app/academy/free-bootcamp/layout.tsx`
- Modify: `frontend/src/app/verify/[id]/page.tsx`
- Modify: `frontend/src/app/verify/[id]/layout.tsx`
- Modify: `frontend/src/app/services/page.tsx`
- Modify: `frontend/src/app/services/[slug]/layout.tsx`
- Modify: `frontend/src/app/training/page.tsx`
- Modify: `frontend/src/app/quote/page.tsx`
- Modify: `frontend/src/app/quote/layout.tsx`
- Modify: `frontend/src/app/book/page.tsx`
- Modify: `frontend/src/app/book/layout.tsx`
- Modify: `frontend/src/app/careers/layout.tsx`
- Modify: `frontend/src/app/blog/[slug]/layout.tsx`
- Modify: `frontend/src/app/about/page.tsx`
- Modify: `frontend/src/app/about/layout.tsx`
- Modify: `frontend/src/app/contact/page.tsx`
- Modify: `frontend/src/app/contact/layout.tsx`
- Modify: `frontend/src/app/dashboard/Sidebar.tsx`
- Modify: `frontend/src/app/dashboard/student/page.tsx`
- Modify: `frontend/src/app/dashboard/admin/courses/builder/[id]/page.tsx`
- Modify: `frontend/src/components/ServiceWorkerRegister.tsx`
- Modify: `frontend/src/data/courses.ts`
- Modify: `frontend/src/data/servicesData.ts`

- [ ] **Step 1: Sanitize metadata titles, layout descriptions, and headers**
Replace all `—` and `–` with `|`, `:`, or natural text in:
  - `frontend/src/app/layout.tsx`
  - `frontend/src/app/manifest.ts`
  - `frontend/src/app/academy/courses/[slug]/layout.tsx`
  - `frontend/src/app/verify/[id]/layout.tsx`
  - `frontend/src/app/services/[slug]/layout.tsx`
  - `frontend/src/app/quote/layout.tsx`
  - `frontend/src/app/book/layout.tsx`
  - `frontend/src/app/careers/layout.tsx`
  - `frontend/src/app/blog/[slug]/layout.tsx`
  - `frontend/src/app/about/layout.tsx`
  - `frontend/src/app/contact/layout.tsx`

- [ ] **Step 2: Sanitize Academy and Free Bootcamp content and Bengali copy**
Remove em-dashes and hyphens in `frontend/src/app/academy/free-bootcamp/page.tsx` and `frontend/src/app/academy/free-bootcamp/layout.tsx`:
  - `বুঝে নিন—কেন` -> `বুঝে নিন: কেন`
  - `দক্ষতায় নয়—পদ্ধতিতে` -> `দক্ষতায় নয়, পদ্ধতিতে`
  - `রাত ৯:০০ টা - ১১:০০ টা` -> `রাত ৯:০০ টা থেকে ১১:০০ টা`
  - `09:00 - 11:00 PM` -> `09:00 to 11:00 PM`
  - In `frontend/src/app/academy/page.tsx`:
    - `Showing 1–9` -> `Showing 1 to 9`

- [ ] **Step 3: Sanitize course definitions and service data copy**
Replace all `—` and `–` in `frontend/src/data/courses.ts` and `frontend/src/data/servicesData.ts`.

- [ ] **Step 4: Sanitize dashboard headers, comments, and service worker strings**
Replace all `—` in `Sidebar.tsx`, `student/page.tsx`, `builder/[id]/page.tsx`, and `ServiceWorkerRegister.tsx`.

- [ ] **Step 5: Verify zero remaining dashes in user-facing copy**
Run grep check for `—` and `–` to verify clean state.

- [ ] **Step 6: Commit Task 1**
```bash
git add frontend/
git commit -m "style(copy): eliminate all em-dashes, en-dashes, and decorative hyphens across platform"
```

---

### Task 2: Design System, Typography & CSS Standardization

**Files:**
- Modify: `frontend/src/app/globals.css`
- Modify: `frontend/src/app/layout.tsx`

- [ ] **Step 1: Harmonize typography scale and CSS variables in globals.css**
Update font family definitions to guarantee `Plus Jakarta Sans` is the universal main font. Standardize heading utilities (`.page-title`, `.section-title`, `.card-title`, `.text-body-sm`, `.eyebrow-badge`).

- [ ] **Step 2: Standardize color tokens and surface contrasts**
Ensure consistent dark theme cards (`#0f172a` canvas, `#1e293b` surfaces, `rgba(255,255,255,0.08)` borders) and light theme cards (`#ffffff` canvas, `#f8fafc` secondary, `#e2e8f0` borders) across all shared component classes.

- [ ] **Step 3: Verify zero broken layout styles**
Ensure all buttons (`.btn-primary`, `.btn-accent`, `.btn-secondary`, `.btn-danger`) have consistent height, padding, and hover states.

- [ ] **Step 4: Commit Task 2**
```bash
git add frontend/src/app/globals.css frontend/src/app/layout.tsx
git commit -m "style(design-system): harmonize typography tokens, colors, and shared UI classes"
```

---

### Task 3: Backend Model & API Extensions for Complete Admin Controls

**Files:**
- Modify: `backend/app/models/cohort.py`
- Modify: `backend/app/schemas/cohort.py`
- Modify: `backend/app/api/v1/routes/cohorts.py`
- Modify: `backend/app/models/course.py`
- Modify: `backend/app/schemas/course.py`
- Modify: `backend/app/api/v1/routes/courses.py`
- Modify: `backend/app/api/v1/routes/enrollments.py`
- Modify: `backend/app/services/enrollment_service.py`

- [ ] **Step 1: Extend `Cohort` model & schemas with live class fields**
Add `meeting_url`, `meeting_passcode`, `schedule_info`, and `announcement` to `Cohort` model, `CohortCreate`, `CohortUpdate`, and `CohortRead`.

- [ ] **Step 2: Extend `Lesson` model & schemas with attachments**
Add `attachments` (Text JSON) to `Lesson` model, `LessonCreate`, `LessonUpdate`, and `LessonRead`.

- [ ] **Step 3: Add Admin Direct Enrollment & Progress Override endpoints**
In `backend/app/api/v1/routes/enrollments.py`:
  - `POST /api/v1/enrollments/direct`: Admin enrolls user by email or ID directly into course/cohort.
  - `PATCH /api/v1/enrollments/{enrollment_id}/admin-progress`: Admin overrides completion status.

- [ ] **Step 4: Verify backend imports and routes**
Test python syntax and router imports.

- [ ] **Step 5: Commit Task 3**
```bash
git add backend/
git commit -m "feat(backend): add cohort live meeting fields, lesson attachments, and admin direct enrollment APIs"
```

---

### Task 4: Admin Governance Console Upgrades

**Files:**
- Modify: `frontend/src/app/dashboard/admin/cohorts/page.tsx`
- Modify: `frontend/src/app/dashboard/admin/courses/builder/[id]/page.tsx`
- Modify: `frontend/src/app/dashboard/admin/enrollments/page.tsx`

- [ ] **Step 1: Upgrade Admin Cohorts Manager**
Add inputs to cohort creation/editing form: Live Meeting URL (Zoom/Google Meet), Passcode, Class Schedule text, and Announcements. Display live meeting details in the cohorts table.

- [ ] **Step 2: Upgrade Course Syllabus Builder with Attachments & Reordering**
In `frontend/src/app/dashboard/admin/courses/builder/[id]/page.tsx`:
  - Add Resource Attachments editor to the lesson form (add/edit/delete worksheets, audio packs, PDFs).
  - Add Move Up / Move Down buttons to reorder lessons within modules.
  - Add quick Free Preview toggle.

- [ ] **Step 3: Upgrade Admin Enrollments Manager with Direct Enrollment & Completion Override**
In `frontend/src/app/dashboard/admin/enrollments/page.tsx`:
  - Add "Direct Student Enrollment" button and modal.
  - Add "Mark Completed / Issue Certificate" action button for any active enrollment.

- [ ] **Step 4: Commit Task 4**
```bash
git add frontend/src/app/dashboard/admin/
git commit -m "feat(admin): empower admin with live cohort scheduling, lesson attachments builder, and direct enrollments"
```

---

### Task 5: World-Class Student Learning Room & Cohort Live Hub

**Files:**
- Modify: `frontend/src/app/learn/[enrollment_id]/page.tsx`
- Modify: `frontend/src/app/dashboard/student/page.tsx`
- Modify: `frontend/src/app/dashboard/student/courses/page.tsx`

- [ ] **Step 1: Build 4-Tab Student Learning Workspace in `/learn/[enrollment_id]`**
Refactor the classroom viewer below the video/header:
  - Tab 1: **Lecture** (Video with 0.75x-2x speed controls, reading room, or quiz)
  - Tab 2: **Resources & Worksheets** (downloadable cards for attached worksheets and audio packs)
  - Tab 3: **Personal Notes** (in-browser notepad saved automatically to LocalStorage per lesson, with "Export Notes .txt")
  - Tab 4: **Ask Instructor** (direct contextual question form linked to support tickets)

- [ ] **Step 2: Add Live Cohort Classroom Banner**
In `/learn/[enrollment_id]` and `/dashboard/student`:
  - If the student is in a cohort with `meeting_url`, render a banner: "Next Live Session", countdown indicator, and "Join Live Class" button opening the link.

- [ ] **Step 3: Graduation Celebration & Certificate Export**
When progress reaches 100%, trigger celebratory certificate unlock card with direct preview, printable view, and LinkedIn verification link.

- [ ] **Step 4: Verify Frontend Build**
Run `npm run build` in `frontend/` to confirm zero TypeScript or layout errors.

- [ ] **Step 5: Commit Task 5**
```bash
git add frontend/
git commit -m "feat(student): upgrade learning room with 4-tab workspace, live class hub, and graduation celebration"
```
