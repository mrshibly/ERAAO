# Design Specification: Professional Landing Page Redesign (Option A)

- **Date:** 2026-08-18
- **Topic:** High-End Professional Redesign of `landing-page/index.html`
- **Aesthetic Direction:** Obsidian Glass & Architectural Cyber Hub (Option A)
- **Target File:** `landing-page/index.html`

---

## 1. Aesthetic DNA & Core Design Principles

1. **Dual-Tone Architectural Brutalism**:
   - Primary Backgrounds: Warm architectural paper (`--paper: #efeee9` / `#f4f3ef`) and ultra-deep obsidian space black (`--ink: #07090e`).
   - Accent & Highlights: Luminescent neon cyan (`--acid: #38bdf8`) and precision azure (`--accent: #0284c7`).
   - Borders: Sub-pixel crisp hairline dividers (`rgba(11,11,11,0.12)` on light, `rgba(255,255,255,0.12)` on dark).
2. **Typography Hierarchy**:
   - Display: `Space Grotesk` (tight tracking, punchy geometric letterforms, expressive uppercase and headlines).
   - Body & Navigation: `Inter` (optimal legibility, high contrast, crisp font smoothing).
   - Telemetry & Metadata: `JetBrains Mono` (coordinates, timestamps, status indicators).
3. **Kinetic Editorial Motion**:
   - GSAP ScrollTrigger + Lenis smooth scrolling.
   - Parallax image zoom and scale transitions.
   - Pinned text scrub timelines.
   - Angled kinetic marquee tickers.
   - Magnetic custom cursor with hover label preview.

---

## 2. Section Architecture

### 1. Fixed Pill Navigation
- Centered floating glass pill with `backdrop-filter: blur(20px) saturate(140%)`.
- Brand mark `ERAAO ◈` with glowing LED status.
- Navigation links (`Services`, `About`, `Capabilities`, `Pricing`, `FAQ`, `Contact`).
- Live Dhaka BST clock widget.
- "Initiate Project ↗" CTA button.

### 2. Hero Section (Obsidian Glass Architectural Hub)
- **Background Image**: High-resolution cinematic architectural glass photography (`https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=2400&q=85`) with subtle parallax scrub.
- **Particle & Aura Overlay**: Soft luminous cyber mesh with reduced opacity (`0.35`) for depth.
- **Top-Left Glass HUD**: Status indicator `THREAT TELEMETRY: ACTIVE 🟢 • SYSTEM DEFENDED`, narrative statement, and dual CTA buttons (`Explore 23 Practices ↓` and `Request Architecture Quote ↗`).
- **Top-Right Telemetry**: `DHAKA 23.81°N 90.41°E`, `BST TIMEZONE`, geometric crosshair.
- **Bottom Display Word**: Oversized masked title `ERAAO` spanning full container width.

### 3. Section 01: About & Studio Philosophy (`#about`)
- Diagonal polygon clip path transition (`polygon(0 5vw, 100% 0, 100% 100%, 0 100%)`).
- 4-line display statement with line-mask animations.
- Geometric workspace photograph.
- 4 live animated KPI counters (Code Ownership, Sprint Velocity, Security Zero-Tolerance, Practice Breadth).

### 4. Continuous Marquee Ticker
- Angled cyan strip with continuous infinite ticker loop.

### 5. Section 02: 23-Service Interactive Catalog (`#services`)
- Filter pill bar: `All (23)`, `Cybersecurity (11)`, `AI & Automation (7)`, `Software & SaaS (4)`, `Video & Creative (1)`.
- 3-column responsive card layout with curated 16:9 Unsplash images, badge pills, deliverable checklists, and auto-scroll/pre-fill inquiry hooks.

### 6. Section 03: Capabilities & Architecture (`#capabilities`)
- Pinned text scrub timeline ("Concept becomes architecture. Architecture becomes code. Code becomes defended.").
- 4 capability rows with hover image reveals.

### 7. Section 04: Engagement & Partnership Models (`#engagement`)
- 3 structured cards (Sprint MVP, Continuous Security Retainer, Dedicated Squad).

### 8. Section 05: Engineering Manifesto & Trust Compliance (`#manifesto`)
- Editorial blockquote with compliance badges (OWASP, SOC 2, ISO 27001).

### 9. Section 06: Solutions Matrix & Practice Archive (`#archive`)
- 6 interactive practice area rows with floating magnetic cursor image previews.

### 10. Section 07: Interactive FAQ Accordion (`#faq`)
- Smooth animated accordion items.

### 11. Section 08: Direct Project Inquiry & Footer (`#contact`)
- Two-column obsidian dark contact suite with 23-service selector, budget range pills, and immediate submission feedback.
