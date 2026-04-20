---
name: larper-website-redesign
description: Redesign larper.ai website with refined dark luxury aesthetic, NewFI case study, and professional polish
type: project
---

# larper.ai Website Redesign — Refined Dark Luxury

## Goal

Upgrade the larper.ai website from its current state to a polished, professional marketing site with a "Refined Dark Luxury" aesthetic. Add a NewFI/Apollo case study teaser. Improve visual effects, design consistency, content structure, and mobile UX.

## Design Direction

**Refined Dark Luxury** — Evolve the existing dark theme. Tighter typography with variable font weights, subtle grain texture overlays, smoother scroll-triggered reveals with staggered timing, glassmorphic cards with layered depth, refined color palette. Think Linear.app meets Vercel — minimal but rich.

## Changes by Area

### 1. Design System

- **Typography:** Switch to Inter Variable (weights 300-900) for precise hierarchy. Keep JetBrains Mono for code accents. Tighter letter-spacing on headlines (-1.5px to -2px). Larger headline sizes (clamp-based fluid type).
- **Colors:** Keep existing accent palette (purple #a78bfa, blue #60a5fa, cyan #22d3ee, green #34d399, pink #f472b6, amber #fbbf24). Use more consistently — primary accent purple, secondary cyan, tertiary green. Background stays #0c0c14 range but add subtle radial gradient zones.
- **Cards:** Glass morphism with backdrop-filter: blur(16px), semi-transparent backgrounds (rgba with 0.03-0.06 opacity), 1px borders with rgba accent at 0.08-0.15 opacity, layered box-shadows.
- **Spacing:** 8px grid system. Section padding: 120px vertical (desktop), 80px (mobile). Card padding: 32px. Gap between cards: 24px.

### 2. Homepage — New Sections

- **Client Trust Strip:** After the marquee, before "What We Build". Centered row with "Trusted By" label + grayscale client names (NEWFI, APOLLO). Minimal, subtle. Grows as more clients are added.
- **Case Study Section:** After "What We Build", before "How It Works". Single featured case study card:
  - Badge: "CASE STUDY"
  - Title: "Streamlining Non-QM Guideline Comparison"
  - Subtitle: "NewFI Lending — backed by Apollo Hedge Fund"
  - Description: "Replaced manual lender guideline reviews with an AI-powered comparator that identifies matches, conflicts, and overlays across complex mortgage documents — turning hours of underwriter work into minutes."
  - Metrics row: 10x Faster Reviews | v2.3 Live in Production | 100% Match Accuracy
  - Subtle purple radial glow in top-right corner

### 3. Visual Effects

- **Scroll reveals:** Staggered fade-in with 80ms delays between sibling elements. Use IntersectionObserver with threshold 0.1. Elements start opacity: 0, translateY(30px), transition 0.6s cubic-bezier(0.16, 1, 0.3, 1).
- **Card hover:** translateY(-4px), border glow intensifies, subtle box-shadow increase. Transition 0.3s ease.
- **Gradient mesh:** Slow down animation from current speed to 20s cycle. Make more subtle.
- **Typewriter:** Smoother cursor blink (1s ease-in-out), gentler text fade (0.3s).
- **Section dividers:** Gradient fade lines between major sections — 1px line with gradient from transparent → accent → transparent.
- **Progress bar:** Gradient fill using accent palette (purple → cyan).
- **Background noise:** SVG-based subtle noise texture overlay at 3-5% opacity.

### 4. Mobile & UX

- **Mobile nav:** Hamburger menu with slide-in overlay. Glass morphism on overlay.
- **Responsive breakpoints:** 1024px (tablet), 768px (mobile), 480px (small mobile).
- **Touch targets:** Minimum 44px for all interactive elements.
- **Font scaling:** Use clamp() for fluid typography — headlines scale down gracefully.
- **Card layout:** Stack vertically on mobile, maintain horizontal on desktop.

### 5. About Page

- Fix duplicate `</script>` tag bug (lines 1028-1030).
- Apply same design system updates (typography, cards, spacing).
- Founder cards: glass morphism style, consistent with homepage cards.
- Values section: same staggered reveal animations.

### 6. Deployment

- Initialize git repo.
- Push to GitHub Pages (gh-pages branch or main with GitHub Pages enabled).
- No build step needed — static HTML/CSS/JS.

## Out of Scope

- No new pages (blog, docs, etc.).
- No contact form backend.
- No real social media links (keep placeholders until user provides them).
- The larper-knowledge-map.html stays internal — not linked from public pages.
- No framework migration (stays vanilla HTML/CSS/JS).