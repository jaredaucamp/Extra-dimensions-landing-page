# Design Taste Frontend Skill — Complete Guide

This comprehensive design guide establishes patterns, constraints, and decision frameworks for building anti-slop landing pages, portfolios, and redesigns. Below is the full content as requested.

---

## Core Philosophy

The skill prioritizes **reading the brief first** before touching code. Most AI-generated design fails because systems apply defaults instead of inferring context. This guide forces brief analysis (Section 0), dial calibration (Section 1), and honest system selection (Section 2) before any component ships.

## Key Sections Overview

**Section 0: Brief Inference** requires declaring a one-line design read before generating anything. Example: *"Reading this as: B2B SaaS landing for technical buyers, with Linear-style minimalism, leaning toward Tailwind + Geist + restrained motion."*

**Section 1: The Three Dials** establishes global configuration:
- `DESIGN_VARIANCE: 1-10` (symmetry to asymmetry)
- `MOTION_INTENSITY: 1-10` (static to cinematic)
- `VISUAL_DENSITY: 1-10` (spacious to packed)

These are inference targets, not user inputs. Dial values drive every layout, animation, and spacing decision downstream.

**Section 2: Design System Map** routes the brief to an official system (Material, Fluent, Carbon, shadcn/ui, Tailwind) or documents the aesthetic honestly.

---

## High-Impact Rules (Anti-Tells)

### Typography Discipline
- **Serif is discouraged as default.**
- **Banned serif fonts:** Fraunces, Instrument_Serif (LLM defaults).
- **Default sans-display:** Geist, Outfit, Cabinet Grotesk, Satoshi.
- **NO mixed-family emphasis** (random serif word in sans headline).

### Color Calibration
- **Max one accent color per page.**
- **THE LILA RULE:** Discourage AI-purple gradients and neon glow by default.
- **Premium-consumer palette ban:** Beige+brass+oxblood+espresso is banned.

### Layout Discipline (Mandatory Hard Rules)

**Hero Constraints:**
- Must fit initial viewport (headline <= 2 lines, subtext <= 20 words / 4 lines, CTA visible without scroll)
- Top padding max `pt-24` at desktop
- Stack limit: eyebrow OR brand strip + headline + subtext + CTAs (max 4 text elements)

**Navigation:**
- Must render single line at desktop
- Height cap: 80px max

**Section Layout Repetition:**
- Each section must use a different layout family (4+ families across 8 sections minimum)
- Zigzag alternation cap: max 2 consecutive image+text splits

**Eyebrow Restraint (Mechanical Check):**
- Maximum 1 eyebrow per 3 sections

**NO Duplicate CTA Intent:**
- Pick ONE label per intent, lock it page-wide

---

## Critical AI Tells (Section 9)

### Completely Banned
**EM-DASH:** Zero em-dashes anywhere. Replace with periods, commas, colons, parentheses, or line breaks.

### Strongly Discouraged

**Content & Copy Tells:**
- Generic names like "Jane Doe" - use locale-appropriate names
- Generic avatars - use believable photo placeholders
- Filler verbs: "Elevate", "Seamless", "Unleash", "Next-Gen", "Revolutionize"

**Layout & Section Tells:**
- NO version labels in hero
- NO section-number eyebrows
- NO scrolling cues
- NO decoration text strips

**Visual & CSS Tells:**
- NO neon / outer glows by default
- NO pure black (#000000) or pure white
- NO oversaturated accents
- NO excessive gradient text on large headers

---

## Motion & Animation Discipline

### Motion Must Be Motivated
Before adding any animation, ask: *"What does this communicate?"*

### Forbidden Patterns
- **`window.addEventListener('scroll', ...)`** - banned; jank-prone. Use IntersectionObserver or CSS scroll-driven animations.
- **Custom scroll calculations in React state**

### Reduced Motion (Mandatory for MOTION_INTENSITY > 3)
Wrap any motion above level 3 with `prefers-reduced-motion: reduce`.

---

## Performance & Accessibility

- Animate ONLY `transform` and `opacity`. Never animate `top`, `left`, `width`, `height`.
- Dark mode: Mandatory for consumer-facing pages.
- LCP < 2.5s, INP < 200ms, CLS < 0.1

---

## Pre-Flight Check (Section 14)

- [ ] Zero em-dashes anywhere
- [ ] One accent color used identically across all sections
- [ ] Hero fits viewport
- [ ] No duplicate CTA intent
- [ ] No AI Tells (Inter default, AI-purple, three equal cards, Jane Doe, Acme)
- [ ] Motion motivated
- [ ] Reduced motion wrapped
- [ ] Section-layout-repetition: >= 4 different layout families
- [ ] No filler verbs
- [ ] Locale-appropriate names in testimonials
