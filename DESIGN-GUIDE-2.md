# UI/UX Pro Max - Design Intelligence Guide

This comprehensive design framework provides structured guidance for creating professional user interfaces across web and mobile platforms. The guide encompasses 50+ design styles, 161 color palettes, 57 font pairings, and 161 product type patterns, supported by 99 UX guidelines and 25 chart type recommendations.

## Core Purpose

The skill activates when tasks involve "UI structure, visual design decisions, interaction patterns, or user experience quality control."

## Priority-Based Rule Structure

1. **Accessibility (CRITICAL)** - Contrast ratios, focus states, alt text, keyboard navigation, ARIA labels
2. **Touch & Interaction (CRITICAL)** - 44x44px minimum targets, 8px spacing, loading feedback, gesture handling
3. **Performance (HIGH)** - Image optimization, lazy loading, layout shift prevention, responsive images
4. **Style Selection (HIGH)** - Matching product type, consistency, SVG icons (no emojis), platform-specific patterns
5. **Layout & Responsive (HIGH)** - Mobile-first design, viewport configuration, breakpoint systems, safe-area compliance
6. **Typography & Color (MEDIUM)** - Line height 1.5-1.75, semantic tokens, 4.5:1 contrast, accessible color pairs
7. **Animation (MEDIUM)** - 150-300ms durations, transform-only transforms, meaningful motion, reduced-motion support
8. **Forms & Feedback (MEDIUM)** - Visible labels, error placement, progressive disclosure, inline validation
9. **Navigation Patterns (HIGH)** - Bottom nav limits (<= 5 items), deep linking, back behavior, state preservation
10. **Charts & Data (LOW)** - Appropriate chart types, accessible color palettes, tooltips, table alternatives

## Critical Quality Standards

### Visual Elements
- No emojis used as structural icons - use vector-based alternatives
- Consistent icon family and stroke width throughout
- Official brand assets with proper proportions

### Interaction Patterns
- Tap feedback visible within 80-150ms
- Touch targets minimum 44x44px
- Micro-interactions kept to 150-300ms range
- Clear disabled state semantics

### Light/Dark Mode
- Primary text contrast >= 4.5:1 in both themes
- Secondary text contrast >= 3:1
- Interaction states distinguishable in both modes

### Layout & Accessibility
- Safe areas respected for headers and fixed elements
- 4/8px spacing rhythm throughout
- Scroll content not hidden behind fixed bars
- Form fields with labels, hints, and error messages

## Pre-Delivery Verification

Before implementation, confirm:
- Visual consistency (no emoji icons, unified style)
- Interaction quality (touch targets, feedback timing)
- Theme parity (both light/dark tested)
- Layout safety (safe areas, responsive breakpoints)
- Accessibility compliance (contrast, labels, focus order)
