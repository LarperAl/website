# Interactive Elements Design Spec

**Date:** 2026-04-22
**Direction:** Organic Flow, Full Send intensity
**Approach:** Hybrid — Canvas for particles/cursor, CSS for animations, IntersectionObserver for reveals

---

## Overview

Add Harmonic.fun-inspired interactive elements to larper.ai: an always-on Canvas particle field with cursor effects, geometric corner frames that draw in on load, choreographed entrance animations, magnetic buttons, and enhanced hover interactions. The result should feel alive, precise, and dramatic.

---

## 1. Canvas Particle Field + Cursor System

A full-viewport `<canvas>` at `z-index: 1` sits between the mesh gradient background and the grid pattern layer. It renders:

### Floating Particles
- ~50-80 dots drifting slowly across the viewport
- Each particle: random size (1-3px), random opacity (0.2-0.6), random drift speed, random color from palette (violet `#a78bfa`, cyan `#22d3ee`, pink `#f472b6`, blue `#60a5fa`)
- Particles wrap around edges seamlessly (position modulo viewport dimensions)
- No physics, just linear position updates per frame

### Cursor Glow Orb
- 200px radial gradient following the mouse with ~0.1s easing lag
- Color shifts between violet and cyan based on cursor X position (left=violet, right=cyan)
- On click: brief outward pulse animation (radius expands to ~280px then contracts back over 0.3s)
- Uses `mousemove` event to track position, lerps toward cursor each frame

### Connection Lines
- When particles drift within ~120px of the cursor, thin lines (0.5px width, opacity 0.15-0.25) connect them to the cursor position
- Lines use the particle's color at low opacity
- Creates a constellation-web effect that follows the mouse

### Performance
- Canvas renders via `requestAnimationFrame`, throttled when tab is hidden (`visibilitychange` event pauses the loop)
- On mobile (viewport < 768px): particle count drops to ~20, connection lines disabled, cursor glow disabled
- All particle position math is simple addition (no physics engine needed)

---

## 2. Geometric Corner Frames

### Frame Design
- Four L-shaped corner brackets positioned fixed at viewport corners
- Top corners: violet (`rgba(167,139,250,0.4)`)
- Bottom corners: cyan (`rgba(34,211,238,0.4)`)
- Arm length: 60px, line width: 1px
- Thin top/bottom horizontal lines (0.5px, opacity 0.15) extending from bracket to bracket

### Entrance Animation
- Frame corners draw in using CSS `stroke-dashoffset` animation on SVG `<line>` elements
- Animation duration: 1.5s, ease-out
- Top-left corner starts first, others stagger by 150ms clockwise
- Horizontal lines extend from center outward (scaleX 0 → 1) starting at 0.8s

### Mobile
- Arm length: 40px, line width: 0.5px, opacity reduced by 30%
- Horizontal lines removed on mobile (< 768px)

### Implementation
- SVG elements with `position: fixed` at each corner
- CSS animations for stroke-dashoffset and scaleX
- `.corner-frame` class for consistent styling

---

## 3. Entrance Animations

### Page Load Sequence
Timed stagger over 3 seconds on first visit:

| Time  | Element              | Animation                          |
|-------|----------------------|------------------------------------|
| 0.0s  | Corner frames        | Draw in (staggered clockwise)      |
| 0.3s  | Navigation           | Fade in from top (translateY -20px)|
| 0.6s  | Hero badge           | Slide up (translateY 30px, fade)   |
| 0.9s  | Hero headline words  | Stagger in one-by-one (80ms each) |
| 1.2s  | Tagline + description| Fade up                            |
| 1.5s  | CTA buttons          | Slide up                           |
| 2.0s  | Particles            | Begin fading in (opacity 0 → 1 over 1s)|

All delays use CSS `animation-delay` with the existing `--transition-smooth` cubic-bezier. The canvas starts rendering immediately but particles start at opacity 0 and fade in at 2.0s.

### Scroll Reveals
- IntersectionObserver with 0.1 threshold, `once: true`
- Section labels: slide in from left (`translateX(-30px)` → `0`)
- Headlines: fade up (`translateY(40px)` → `0`, opacity 0 → 1)
- Cards: stagger at 100ms intervals, fade up
- Stat numbers: count up from 0 to final value over 1.5s
- Duration: 0.7s for each element, easing: `cubic-bezier(0.16, 1, 0.3, 1)`

### Hover Micro-Interactions
- **Feature/founder cards:** existing spotlight effect stays; add subtle glow pulse on border (`box-shadow` animation 3s infinite) and `scale(1.02)` on hover
- **CTA buttons:** magnetic pull — button `translate`s toward cursor when within ~80px radius. Maximum shift: 4px. Disabled on mobile.
- **Nav links:** underline slides in from left (0 → 100% width) over 0.3s
- **Social icons:** single scale pulse (1 → 1.2 → 1) over 0.4s on hover
- **Stat cards:** slight lift (translateY -4px) with glow border on hover (already exists, keep)

---

## 4. Enhanced Existing Elements

### Hero Headline
- "Build Reality" and "with AI" words stagger in one-by-one on page load (80ms delay between each word)
- Gradient text gets an additional shimmer effect: a diagonal highlight sweep (`background-position` animation) that repeats every 6s

### Stat Numbers Count-Up
- Stats section numbers count up from 0 when scrolled into view: 99% (0→99), 10x (0→10), 100+ (0→100)
- "24/7" animates differently: fades in with a scale bounce since it's not a countable number
- Uses `requestAnimationFrame` with easing (slow start, fast middle, slow end)

### Magnetic CTA Buttons
- Track cursor position relative to button center
- When cursor within 80px radius: button translates toward cursor (max 4px)
- Smooth easing: button lerps back to center when cursor leaves radius
- Disabled on touch devices (no `hover` events)

---

## 5. Layer Stack (bottom to top)

1. **Mesh Gradient Background** — existing, unchanged
2. **Canvas (particles + cursor + lines)** — new, `z-index: 1`, `pointer-events: none`
3. **Grid Pattern + Noise** — existing, unchanged
4. **Geometric Corner Frames** — new, `z-index: 2`, `pointer-events: none`
5. **Page Content (HTML)** — existing, `z-index: 3`+ (above frames, below scroll bar). Ensure existing content elements have `position: relative` so they stack above decorative layers without overriding the scroll bar.
6. **Scroll Progress Bar** — existing, `z-index: 50`, unchanged

---

## 6. Mobile Behavior

| Feature              | Desktop                | Mobile (< 768px)          |
|----------------------|------------------------|----------------------------|
| Particle count       | 50-80                  | 20                         |
| Connection lines     | Enabled                | Disabled                   |
| Cursor glow orb      | Enabled                | Disabled                   |
| Corner frame arms    | 60px                   | 40px, thinner lines        |
| Horizontal lines     | Enabled                | Disabled                   |
| Magnetic buttons      | Enabled                | Disabled                   |
| Entrance timing      | 0.7s per element       | 0.5s per element           |
| Canvas when hidden   | Paused                 | Paused                     |

---

## 7. File Changes

### New Files
- `js/particles.js` — Canvas particle system, cursor glow, connection lines
- `js/magnetic.js` — Magnetic button effect
- `js/entrance.js` — Page load sequence and scroll reveal orchestration
- `js/countup.js` — Stat number count-up animation

### Modified Files
- `index.html` — Add canvas element, corner frame SVGs, entrance animation classes, new JS script tags, updated CSS for corner frames and enhanced animations
- `about.html` — Same structural additions as index.html

### No New Dependencies
All effects are vanilla JS + CSS. No external libraries.