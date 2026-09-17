# Zero to Fluent Free English Bootcamp Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and launch a dedicated bilingual landing page at `/academy/free-bootcamp` and an eye-catching spotlight announcement banner on `/academy` for ERAAO Academy's upcoming 1-Day Free English Bootcamp (26 Sep 2026).

**Architecture:** A modern server/client Next.js setup with dedicated SEO and OpenGraph metadata (`layout.tsx`), client-side countdown timer, visual problem/solution grid, curriculum breakdown, mentor credentials, and direct integration with ERAAO's official Telegram club (`https://t.me/+BWxzf8Zk2stmNWY1`).

**Tech Stack:** Next.js (Turbopack, App Router), React 19, TypeScript, Lucide React icons, Vanilla CSS tokens.

## Global Constraints

- Route path: `/academy/free-bootcamp`
- Event Date: `2026-09-26T21:00:00+06:00` (26 September 2026, 09:00 PM – 11:00 PM BST)
- Official Poster: `/banners/zero-to-fluent-free-bootcamp.png` (1024x537 px)
- Telegram Community Link: `https://t.me/+BWxzf8Zk2stmNWY1` (enforce `target="_blank" rel="noopener noreferrer"`)
- WhatsApp Inquiry Link: `https://wa.me/8801700000000`
- Zero placeholders or fake data. Preserve all existing styling tokens and site responsiveness.

---

### Task 1: Dedicated Landing Page Layout & SEO Metadata

**Files:**
- Create: `frontend/src/app/academy/free-bootcamp/layout.tsx`

- [ ] **Step 1: Create layout with OpenGraph and Twitter metadata**
Define title `Zero to Fluent Free English Bootcamp | ERAAO Academy`, description in Bengali/English, OpenGraph image pointing to `/banners/zero-to-fluent-free-bootcamp.png`.

---

### Task 2: High-Conversion Free Bootcamp Landing Page Component

**Files:**
- Create: `frontend/src/app/academy/free-bootcamp/page.tsx`

- [ ] **Step 1: Implement Live Countdown Hook & Component**
Compute accurate countdown to `2026-09-26T21:00:00+06:00`. When remaining <= 0, display "SESSION LIVE NOW" badge.
- [ ] **Step 2: Build Hero Section with Event Poster & Dual CTAs**
Include title "ZERO TO FLUENT", Bengali tagline "মাত্র ২ ঘণ্টায় বুঝে নিন—কেন English পড়েও আপনি English Speaking-এ আটকে যাচ্ছেন!", quick-spec pills (Date, Time, Online, Free), and official poster showcase.
- [ ] **Step 3: Implement Pain Points Section ("Is This You?")**
Present the 4 core English speaking bottlenecks in interactive cards with Bengali copy and the root-cause diagnosis.
- [ ] **Step 4: Implement 2-Hour Curriculum Matrix & Free Resources Showcase**
Detail the 6 high-yield learning modules and the 5 free bonus resources (Practice Module, Native Listening Audio, Grammar Guide, Peer Prompts, Routine Template).
- [ ] **Step 5: Implement Mentor Profile (Ayesha Anika) & Final Conversion CTA**
Highlight Ayesha Anika's 4+ years of mentoring experience, closing with the inspiring quote: *"Fluent English একদিনে তৈরি হয় না। কিন্তু সঠিকভাবে শুরু করার জন্য ১ দিনই যথেষ্ট।"* and the primary Telegram join button.

---

### Task 3: Academy Page Spotlight Integration

**Files:**
- Modify: `frontend/src/app/academy/page.tsx`

- [ ] **Step 1: Add Free Bootcamp Spotlight Card on `/academy`**
Insert an announcement section right below the panoramic header banner:
- Live badge: `FREE LIVE EVENT • 26 SEP 2026`
- Thumbnail preview of the poster
- Quick synopsis & direct CTA buttons: "Join Telegram Club" + "Explore Bootcamp" linking to `/academy/free-bootcamp`.

---

### Task 4: Production Build Validation & Deployment

**Files:**
- Verify: Entire frontend application

- [ ] **Step 1: Run `npm run build`**
Confirm zero TypeScript, layout, or build errors.
- [ ] **Step 2: Commit and push to `origin main`**
Sync with remote repository for automated Vercel deployment.
