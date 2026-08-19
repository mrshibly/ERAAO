# Implementation Plan: Professional Landing Page Redesign (Option A)

Redesign `landing-page/index.html` to achieve a world-class, ultra-professional aesthetic based on Option A (Obsidian Glass Architectural Hub), maintaining the original high-fashion brutalist studio design motivation while elevating visual fidelity, photography, and kinetic animations.

## Proposed Changes

### [MODIFY] [landing-page/index.html](file:///c:/Users/DCL/Downloads/Academy/landing-page/index.html)

1. **Design System & CSS Modernization**:
   - Refine color tokens (`--paper: #efeee9`, `--ink: #07090e`, `--acid: #38bdf8`, `--accent: #0284c7`).
   - Upgrade typography with Google Fonts (`Space Grotesk`, `Inter`, `JetBrains Mono`).
   - Clean up layout utilities, hairline dividers, glassmorphism cards, and badge pills.

2. **Hero Section Overhaul**:
   - Full-bleed cinematic architectural glass background image (`https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=2400&q=85`).
   - Ambient luminous cyber mesh particle canvas with balanced opacity (`0.35`).
   - Floating glass HUD card with status indicator, narrative statement, and dual CTAs (`Explore 23 Practices ↓` and `Request Architecture Quote ↗`).
   - Top-right live telemetry indicators (`DHAKA 23.81°N 90.41°E`, `BST TIMEZONE`, crosshair).
   - Bottom oversized masked brand title `ERAAO`.

3. **Section Enhancements**:
   - **About / Philosophy**: Diagonal polygon clip path, multi-line display title, geometric workspace photo, 4 animated stats counters.
   - **Ticker Marquee**: Angled cyan infinite ticker.
   - **23-Service Catalog Hub**: 5 filter pills, 3-column card grid with curated 16:9 Unsplash images, badge pills, 4 deliverable bullets, and auto-scroll/pre-fill inquiry hooks.
   - **Capabilities**: Pinned text scrub timeline + 4 capability rows with hover image reveals.
   - **Engagement Plans**: 3 brutalist pricing / engagement cards.
   - **Engineering Manifesto**: High-fashion portrait, blockquote, and compliance badges.
   - **Practice Archive**: 6 rows with cursor-following floating image previews.
   - **FAQ**: Smooth GSAP accordions.
   - **Contact & Footer**: Two-column inquiry suite with 23-service dropdown and budget selectors.

4. **JavaScript & GSAP Orchestration**:
   - Lenis smooth scrolling integration.
   - GSAP ScrollTrigger timelines for parallax hero scaling, text line unmasking, pinned scrub, card entrance staggers, and cursor label tracking.
   - Live Dhaka BST clock updates every minute.

---

## Verification Plan

### Manual & Visual Verification
1. Verify `http://localhost:8080` loads with HTTP 200.
2. Confirm hero background image renders with high-resolution clarity and parallax scaling.
3. Test all 5 category filter buttons in the services section.
4. Test clicking "Inquire Service ↗" on cards to verify automatic scroll and pre-fill into `#contact`.
5. Test FAQ accordion toggles.
6. Verify smooth responsiveness across desktop, tablet, and mobile viewport sizes.
