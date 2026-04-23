# Midnight Lab Redesign — Design Specification

## Overview
Complete visual overhaul of larper.ai to achieve a modern, polished, minimalist aesthetic inspired by harmonic.fun. The design prioritizes restraint, geometric precision, and purposeful whitespace.

## Philosophy
- **Near-monochrome**: One accent color only
- **Geometric framing**: Corner accents create viewport boundaries
- **Invisible animations**: Transitions feel like settling, not performing
- **Expensive whitespace**: Generous negative space signals confidence

---

## Color System

| Token | Value | Usage |
|-------|-------|-------|
| `--bg-primary` | `#0a0a0f` | Main canvas |
| `--bg-elevated` | `#12121a` | Cards, elevated surfaces |
| `--bg-hover` | `#1a1a24` | Hover states |
| `--accent` | `#6366f1` | Primary accent (indigo-violet) |
| `--accent-glow` | `rgba(99, 102, 241, 0.4)` | Subtle glows |
| `--text-primary` | `#fafafa` | Headlines, primary content |
| `--text-secondary` | `#a1a1aa` | Body text |
| `--text-tertiary` | `#71717a` | Labels, captions |
| `--border` | `rgba(255, 255, 255, 0.08)` | Subtle dividers |
| `--border-accent` | `rgba(99, 102, 241, 0.3)` | Accent borders on hover |

### Rules
- No background gradients
- No multi-color accents
- Single accent color used sparingly for focus

---

## Typography System

### Font Families
- **Headlines**: `Space Grotesk` (Google Fonts)
- **Body/UI**: `Inter` (system fallback)
- **Mono**: `JetBrains Mono` (code, labels)

### Scale
| Level | Size | Usage |
|-------|------|-------|
| Hero | `4.5rem` / `72px` | Main headline |
| H1 | `3rem` / `48px` | Section headers |
| H2 | `2rem` / `32px` | Card titles |
| H3 | `1.25rem` / `20px` | Subsection headers |
| Body | `1rem` / `16px` | Main content |
| Small | `0.875rem` / `14px` | Captions |
| Tiny | `0.75rem` / `12px` | Labels (uppercase) |

### Styling Rules
- Headlines: weight 500, tracking -0.02em, line-height 1.1
- Body: weight 400, line-height 1.6
- Labels only: uppercase, letter-spacing 0.1em
- No text shadows
- No gradient text

---

## Layout System

### Container
- Max width: `1400px`
- Padding: `24px` mobile / `48px` tablet / `80px` desktop
- Centered with `margin: 0 auto`

### Section Spacing
- Vertical gap between sections: `160px`
- Consistent single-background canvas (no alternating sections)

### Grid
- 12-column underlying grid
- Gap: `24px` standard, `48px` large sections

---

## Geometric Frame (Signature Element)

Four corner accents positioned fixed at viewport corners:
- **Size**: 48×48px
- **Style**: L-shaped SVG lines, 1px stroke
- **Color**: `--border` default, `--accent` on hover/scroll
- **Position**: `fixed`, z-index above content
- **Behavior**: Subtle pulse on scroll, always visible

---

## Navigation

### Structure
- Fixed position, top: 0
- Height: `72px`
- Layout: Logo left, links center (desktop), CTA right

### States
- **Default**: Transparent background
- **Scrolled**: `rgba(10, 10, 15, 0.8)` + `backdrop-blur(12px)` + `border-bottom: 1px solid var(--border)`

### Mobile
- Hamburger menu
- Full-screen overlay with centered links

---

## Components

### Buttons
```
Primary:
- Background: var(--accent)
- Color: white
- Border-radius: 6px
- Padding: 12px 24px
- Font-weight: 500
- Hover: scale(1.02), box-shadow: 0 0 20px var(--accent-glow)
- Transition: 200ms ease-out
```

### Cards
```
- Background: var(--bg-elevated)
- Border: 1px solid var(--border)
- Border-radius: 12px
- Padding: 32px
- Hover: translateY(-2px), border-color: var(--border-accent)
- Transition: 200ms ease-out
```

### Links
```
- Default: var(--text-secondary)
- Hover: var(--text-primary)
- Active: var(--accent)
- No underline, color change only
```

### Inputs
```
- Background: transparent
- Border: 1px solid var(--border)
- Border-radius: 8px
- Focus: border-color: var(--accent)
- Padding: 12px 16px
```

### Labels/Tags
```
- Uppercase, 0.75rem
- Letter-spacing: 0.1em
- Color: var(--text-tertiary)
- Used for: "FEATURES", "ABOUT", etc.
```

---

## Animations & Interactions

### Page Load Sequence
1. **0ms**: Corner frames fade in (600ms duration)
2. **200ms**: Navigation fades in (400ms duration)
3. **400ms**: Hero content staggers in (100ms stagger, 600ms duration each)
4. **Easing**: `cubic-bezier(0.16, 1, 0.3, 1)`

### Scroll Reveal
- Trigger: 20% of element visible
- Effect: opacity 0→1, translateY(30px→0)
- Duration: 600ms
- Easing: `cubic-bezier(0.16, 1, 0.3, 1)`
- Stagger: 100ms between siblings

### Hover States
- Duration: 200ms
- Easing: ease-out
- Buttons: scale(1.02) + glow
- Cards: translateY(-2px) + border color
- Links: color only
- No elastic/spring effects

### Corner Frame Animation
- Subtle pulse on scroll (scale 1→1.02→1)
- Duration: 400ms
- Trigger: any scroll movement

### Reduced Motion
- Respect `prefers-reduced-motion`
- Disable transforms, keep opacity fades only
- Instant transitions for users who prefer

---

## Assets Required

### Fonts (Google Fonts)
```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

### Icons
- Lucide icons (via CDN or npm)
- Stroke width: 1.5
- Default size: 20px

### Corner Frame SVGs
Four L-shaped corner decorations:
- `corner-tl.svg` (top-left)
- `corner-tr.svg` (top-right)
- `corner-bl.svg` (bottom-left)
- `corner-br.svg` (bottom-right)

```svg
<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 48V0H48" stroke="currentColor" stroke-width="1"/>
</svg>
```

---

## Responsive Breakpoints

| Breakpoint | Width | Adjustments |
|------------|-------|-------------|
| Mobile | < 640px | Single column, hamburger nav, reduced spacing |
| Tablet | 640-1024px | 2 columns, condensed nav |
| Desktop | > 1024px | Full layout, 12-column grid |

---

## Current Pages to Migrate

1. **index.html** (Home) — Full implementation
2. **about.html** — Apply new styling, keep content
3. **larper-knowledge-map.html** — Apply new styling

---

## Success Criteria

- [ ] Design matches harmonic.fun-level refinement
- [ ] Single accent color only (no multi-color gradients)
- [ ] Corner frame geometry implemented
- [ ] Animations are subtle and fast (feel "invisible")
- [ ] Generous whitespace throughout
- [ ] Typography hierarchy is clear
- [ ] All hover states consistent
- [ ] Reduced motion respected
- [ ] Mobile experience polished

---

## Out of Scope (Intentionally Excluded)

- Particle systems
- Background animations
- Gradient text
- Multiple accent colors
- Complex scroll effects (parallax, etc.)
- Decorative illustrations
- Heavy 3D effects
- Sound/interaction audio
