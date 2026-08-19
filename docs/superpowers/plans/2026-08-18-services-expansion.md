# Services Catalog Expansion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand ERAAO's service offerings across `landing-page/index.html` and the Next.js frontend portal (`frontend/src/app/services/*`) with 23+ curated services across Cybersecurity, AI & Automation, Web/Mobile/SaaS Development, and Video Editing.

**Architecture:** 
- In `landing-page/index.html`, implement an interactive category filter bar (`All`, `Cybersecurity`, `AI & Automation`, `Software & SaaS`, `Video & Creative`) with a 3-column responsive card layout, high-res Unsplash imagery, bulleted deliverables, and pre-filling `#contact` inquiry links.
- In `frontend/src/app/services/page.tsx` and `frontend/src/app/services/[slug]/page.tsx`, implement a comprehensive service data dictionary and dynamic detail routing with full problem descriptions, scope checklists, and instant quote CTAs.

**Tech Stack:** HTML5, CSS3, JavaScript (Lenis / GSAP / Vanilla DOM), Next.js 16 (App Router), TypeScript, Lucide Icons, Unsplash CDN.

## Global Constraints

- Preserve all existing branding, colors, dark mode tokens, typography (Inter / Space Grotesk / JetBrains Mono), and animations.
- Use validated, high-quality Unsplash image URLs with query params `auto=format&fit=crop&q=80`.
- Maintain zero build errors in Next.js and ensure Docker container builds pass cleanly.

---

### Task 1: Update Landing Page Services Data & Interactive Category Filter

**Files:**
- Modify: `landing-page/index.html`

- [ ] **Step 1: Replace `#services` and related sections in `landing-page/index.html`**
Add the interactive category filter buttons and 23 rich service cards across:
1. Offensive Cybersecurity (11 services)
2. AI & Intelligent Automation (7 services)
3. Software, Web & Mobile Engineering (4 services)
4. Creative Media & Video Editing (1 service)

- [ ] **Step 2: Add category filtering JavaScript in `landing-page/index.html`**
Implement the filter click handler with active states and card visibility toggle:
```javascript
const filterButtons = document.querySelectorAll('.service-filter-btn');
const serviceCards = document.querySelectorAll('.service-card-item');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const filter = btn.getAttribute('data-filter');
    serviceCards.forEach(card => {
      if (filter === 'all' || card.getAttribute('data-category') === filter) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  });
});
```

- [ ] **Step 3: Test `landing-page/index.html` in browser**
Verify in local preview that all tabs filter smoothly and images render with no broken links.

---

### Task 2: Build Next.js Centralized Services Data Dictionary

**Files:**
- Create: `frontend/src/data/servicesData.ts`

- [ ] **Step 1: Create `servicesData.ts` with all 23 services**
Define the TypeScript interfaces `ServiceItem` and export the full array `SERVICES_CATALOG` and helper `getServiceBySlug(slug: string)`.

- [ ] **Step 2: Verify TypeScript compilation**
Run `npx tsc --noEmit` in `frontend` to verify types.

---

### Task 3: Overhaul Next.js `/services` Catalog Page

**Files:**
- Modify: `frontend/src/app/services/page.tsx`

- [ ] **Step 1: Implement Category Filtering & Search UI**
Render the hero, search bar, category pill tabs, and 3-column responsive card grid displaying all services with Unsplash thumbnails, deliverables, and `/services/[slug]` links.

- [ ] **Step 2: Verify page build**
Run Next.js build or preview `/services` to confirm 0 errors.

---

### Task 4: Upgrade Dynamic `/services/[slug]` Detail Page

**Files:**
- Modify: `frontend/src/app/services/[slug]/page.tsx`

- [ ] **Step 1: Connect `[slug]/page.tsx` to `servicesData.ts`**
Fetch service details using `getServiceBySlug`, render Problem Statement, Technical Scope Checklist, Methodology steps, and Quote CTA with pre-selected service.

- [ ] **Step 2: Add `generateStaticParams` for SSG optimization**
Export `generateStaticParams` mapping all service slugs for high performance.

---

### Task 5: End-to-End Verification & Docker Rebuild

**Files:**
- Test: `landing-page/index.html`
- Test: Next.js dev & Docker container stack

- [ ] **Step 1: Rebuild Docker Stack**
Run `docker compose up -d --build` to ensure production Docker build succeeds.

- [ ] **Step 2: Verify endpoints via curl**
Check `http://localhost/services`, `http://localhost/services/ai-penetration-testing`, and `http://localhost/`.
