# Design Specification: Zero to Fluent Free English Bootcamp Launch

- **Date**: 2026-09-18
- **Topic**: Zero to Fluent 1-Day Free English Bootcamp
- **Author**: Antigravity & ERAAO Engineering
- **Status**: Proposed / Under Review

---

## 1. Overview & Objective

ERAAO Academy is launching an exclusive 1-Day **"ZERO TO FLUENT" Free English Bootcamp** scheduled for **26 September 2026 (09:00 PM – 11:00 PM)** led by Mentor **Ayesha Anika** (4+ years experience).

The platform goal is to maximize student discovery, registrations, and community acquisition by:
1. Providing a dedicated, high-conversion landing page at `/academy/free-bootcamp`.
2. Featuring a prominent, animated launch banner/card on the main Academy page (`/academy`) directing learners to the event and the ERAAO English Club on Telegram (`https://t.me/+BWxzf8Zk2stmNWY1`).
3. Providing bilingual (Bengali & English) persuasive copy, live countdown timer to session kickoff, curriculum breakdown, mentor spotlight, and free bonus resources showcase.

---

## 2. Architecture & Components

### 2.1 Routing & File Structure

```
frontend/
├── public/
│   └── banners/
│       ├── zero-to-fluent-english.jpg         # Existing top panoramic banner
│       └── zero-to-fluent-free-bootcamp.png   # Official 1024x537 event poster
└── src/
    └── app/
        └── academy/
            ├── page.tsx                       # Academy page (updated with Free Bootcamp spotlight card)
            └── free-bootcamp/
                ├── page.tsx                   # Dedicated high-conversion landing page
                └── layout.tsx                 # Dedicated SEO metadata & OpenGraph tags
```

### 2.2 Dedicated Landing Page Components (`/academy/free-bootcamp`)

1. **SEO & Social Meta Header (`layout.tsx`)**:
   - Title: `Zero to Fluent Free English Bootcamp | ERAAO Academy`
   - Description: `মাত্র ২ ঘণ্টায় বুঝে নিন কেন English পড়েও Speaking-এ আটকে যাচ্ছেন। 26 Sep 2026 Live Interactive Session.`
   - OpenGraph image pointing to `/banners/zero-to-fluent-free-bootcamp.png`.

2. **Hero & Live Countdown (`free-bootcamp/page.tsx`)**:
   - Urgent announcement pill: `🎉 100% Free Live Bootcamp • Limited Live Seats`.
   - Dual-language typography: High-contrast English display typography paired with Bengali typography (`Hind Siliguri` / system font fallback).
   - Real-time countdown timer to `2026-09-26T21:00:00+06:00` (Days, Hours, Minutes, Seconds) with automatic "Live Now" fallback when expired.
   - Dual CTA buttons:
     - Primary: `Join Free on Telegram` (links directly to `https://t.me/+BWxzf8Zk2stmNWY1`, opens in new tab with `target="_blank" rel="noopener noreferrer"`).
     - Secondary: `Schedule Reminder / WhatsApp Assistance` (direct link with pre-filled message).
   - Visual display: The official poster image (`zero-to-fluent-free-bootcamp.png`) with ambient blue/teal glow and rounded corners.

3. **Psychological Pain-Point Breakdown ("Is This You? / এই সমস্যাগুলো কি আপনারও?")**:
   - Card 1: Years of studying grammar & vocabulary, yet freezing up during real speech.
   - Card 2: Sentences form in the mind, but hesitate at the mouth.
   - Card 3: Fear of making grammar mistakes during conversation.
   - Card 4: Memorizing textbook rules without real-world conversation application.
   - Resolution Banner: `সমস্যা হয়তো English না জানা নয়—সঠিকভাবে English Practice না করা।`

4. **2-Hour Actionable Curriculum Matrix ("মাত্র ২ ঘণ্টায় যা শিখবেন")**:
   - Module 1: The Modern & Scientific Method to Learn English Naturally.
   - Module 2: Sentence Building Framework without Overthinking Grammar.
   - Module 3: Active Listening & Spontaneous Speaking Drills.
   - Module 4: Transitioning from Textbook Grammar to Daily Conversational Fluency.
   - Module 5: Psychological Strategies to Eliminate English Hesitation.
   - Module 6: Crafting Your Sustainable Daily English Learning Routine.

5. **Complimentary Take-Home Resources ("যা যা ফ্রিতে পাচ্ছেন")**:
   - Daily English Practice Module (PDF Guide).
   - Self-Recorded Native Listening Audio Drills.
   - High-Yield Essential Grammar Cheat-Sheet.
   - Speaking Practice & Pair Prompts.
   - Personal English Learning Routine Planner.

6. **Lead Mentor Profile**:
   - Mentor Name: **Ayesha Anika**
   - Designation: Senior English Communication Mentor (4+ Years Experience)
   - Methodology: Focus on practical application, fear-reduction drills, and confidence building.

7. **Persistent / Final Community Conversion Bar**:
   - Headline: *"Fluent English একদিনে তৈরি হয় না। কিন্তু সঠিকভাবে শুরু করার জন্য ১ দিনই যথেষ্ট।"*
   - Clear CTA to join the Telegram Community immediately.

### 2.3 Academy Page Integration (`/academy`)

On `/academy`, an eye-catching spotlight card will be positioned right below the top panoramic banner and above the Learning Cycle:
- Gradient border (`var(--accent-blue)` to `var(--accent-teal)`).
- Quick specs tag: `FREE LIVE EVENT • 26 SEP 2026, 9:00 PM`.
- Image thumbnail preview of `zero-to-fluent-free-bootcamp.png`.
- Action buttons:
  - `Join Telegram Group` (`https://t.me/+BWxzf8Zk2stmNWY1`)
  - `View Event Details` (navigates to `/academy/free-bootcamp`).

---

## 3. Data Flow & State Management

- **Countdown Timer**: Implemented via a client-side React `useEffect` interval calculating the remaining milliseconds to `1789747200000` (`2026-09-26T21:00:00+06:00`). Runs with 1-second ticks; automatically cleans up on component unmount.
- **Link Security**: All outbound Telegram and WhatsApp links strictly enforce `target="_blank" rel="noopener noreferrer"`.
- **Responsive Adaptability**: Optimized for mobile viewports (down to 320px) up to 4K ultrawide monitors using CSS flexbox/grid and modern clamp functions.

---

## 4. Error Handling & Resiliency

- **Expired Countdown**: If the current time surpasses 26 Sep 2026 21:00, the countdown gracefully transitions into a `SESSION LIVE NOW` badge with a glowing pulse animation instead of showing negative numbers.
- **Image Fallback**: If the local image fails to load or while it is rendering, modern Next.js `placeholder="blur"` or sleek dark gradient backgrounds ensure no layout shift (`CLS = 0`).

---

## 5. Verification & Testing Plan

1. **Static Typing & Compilation**:
   - Run `npm run build` in `frontend/` to ensure zero TypeScript, JSX, or Turbopack errors.
2. **Visual & Responsive Verification**:
   - Validate desktop layout (> 1024px), tablet layout (768px - 1023px), and mobile layout (< 768px).
3. **Link & Interaction Verification**:
   - Click Telegram link: opens `https://t.me/+BWxzf8Zk2stmNWY1`.
   - Click navigation between `/academy` and `/academy/free-bootcamp`.
   - Confirm countdown calculation displays accurate days, hours, and minutes remaining.
