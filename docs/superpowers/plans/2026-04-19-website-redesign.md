# larper.ai Website Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the larper.ai website with a "Refined Dark Luxury" aesthetic — upgraded typography, glassmorphic cards, staggered animations, NewFI case study, mobile hamburger nav, and deploy to GitHub Pages.

**Architecture:** All changes are inline in two self-contained HTML files (`index.html` and `about.html`). No framework, no build step. Each task modifies CSS and/or HTML within these files. Tasks are ordered to build on each other without conflicts.

**Tech Stack:** Vanilla HTML/CSS/JS, Google Fonts (Inter Variable, JetBrains Mono, Space Mono), deployed as static site to GitHub Pages.

---

### Task 1: Initialize Git Repository

**Files:**
- Create: `.gitignore`
- Create: `README.md` (minimal)

- [ ] **Step 1: Initialize git repo**

```bash
cd "C:/Users/Mayank/documents/larperwebsite"
git init
```

Expected: `Initialized empty Git repository`

- [ ] **Step 2: Create .gitignore**

```
.DS_Store
.vscode/
.superpowers/
```

- [ ] **Step 3: Create minimal README.md**

```markdown
# larper.ai

AI-first systems. Build reality with AI.
```

- [ ] **Step 4: Stage and commit**

```bash
git add -A
git commit -m "init: larper.ai website base"
```

Expected: Commit succeeds with all existing files

---

### Task 2: Upgrade Design System — CSS Variables & Typography

**Files:**
- Modify: `my-website.html/index.html:14-27` (CSS variables)
- Modify: `my-website.html/index.html:10-12` (font import)

This task updates the design tokens that all subsequent tasks build on.

- [ ] **Step 1: Update Google Fonts import to include Inter Variable**

Replace the existing `<link>` tag at line 10-12 with:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=Space+Mono:wght@400;700&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet">
```

- [ ] **Step 2: Update CSS custom properties**

Replace the `:root` block (lines 14-27) with:

```css
:root {
  --bg: #0c0c14;
  --bg-elevated: #12121c;
  --bg-card: rgba(255, 255, 255, 0.02);
  --bg-card-hover: rgba(255, 255, 255, 0.04);
  --text: #f1f5f9;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --accent: #a78bfa;
  --accent-alt: #60a5fa;
  --accent-pink: #f472b6;
  --accent-cyan: #22d3ee;
  --accent-green: #34d399;
  --accent-orange: #fb923c;
  --accent-yellow: #fbbf24;
  --border: rgba(255, 255, 255, 0.06);
  --border-hover: rgba(167, 139, 250, 0.25);
  --glass-bg: rgba(255, 255, 255, 0.03);
  --glass-border: rgba(255, 255, 255, 0.08);
  --glass-blur: 16px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-2xl: 24px;
  --section-padding: 120px;
  --transition-smooth: cubic-bezier(0.16, 1, 0.3, 1);
}
```

- [ ] **Step 3: Update body font-family to use variable weight**

Replace `font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;` in the body rule with:

```css
font-family: 'Inter', system-ui, -apple-system, sans-serif;
font-feature-settings: 'cv02', 'cv03', 'cv04', 'cv11';
```

- [ ] **Step 4: Update noise overlay opacity**

In the `.noise` rule (line 90-96), change `opacity: 0.02;` to `opacity: 0.035;`

- [ ] **Step 5: Verify in browser**

Open `index.html` in browser. Confirm text renders with Inter Variable and the color tweaks are visible (slightly warmer white, cooler grays).

- [ ] **Step 6: Commit**

```bash
git add my-website.html/index.html
git commit -m "style: upgrade design tokens and typography to variable weight Inter"
```

---

### Task 3: Upgrade Background — Slower Mesh + Subtle Gradient Zones

**Files:**
- Modify: `my-website.html/index.html:69-76` (mesh-gradient)

- [ ] **Step 1: Make mesh gradient more subtle with additional radial zones**

Replace the `.mesh-gradient` rule with:

```css
.mesh-gradient {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 80% 50% at 15% 35%, rgba(167, 139, 250, 0.07) 0%, transparent 50%),
    radial-gradient(ellipse 50% 40% at 75% 20%, rgba(96, 165, 250, 0.05) 0%, transparent 50%),
    radial-gradient(ellipse 60% 50% at 55% 75%, rgba(244, 114, 182, 0.04) 0%, transparent 50%),
    radial-gradient(ellipse 40% 30% at 90% 60%, rgba(34, 211, 238, 0.03) 0%, transparent 50%);
}
```

- [ ] **Step 2: Verify in browser**

Background should feel slightly richer with the extra cyan zone, but still subtle.

- [ ] **Step 3: Commit**

```bash
git add my-website.html/index.html
git commit -m "style: refine mesh gradient with additional zones"
```

---

### Task 4: Upgrade Scroll Reveal Animations — Staggered Timing

**Files:**
- Modify: `my-website.html/index.html:1086-1108` (reveal CSS)
- Modify: `my-website.html/index.html:1693-1703` (reveal JS)

- [ ] **Step 1: Replace reveal CSS with staggered variant**

Replace the entire `.reveal` block and delay classes (lines 1086-1108) with:

```css
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.7s var(--transition-smooth), transform 0.7s var(--transition-smooth);
}

.reveal.active {
  opacity: 1;
  transform: translateY(0);
}

.reveal-delay-1 { transition-delay: 0.08s; }
.reveal-delay-2 { transition-delay: 0.16s; }
.reveal-delay-3 { transition-delay: 0.24s; }
.reveal-delay-4 { transition-delay: 0.32s; }
```

- [ ] **Step 2: Update IntersectionObserver to stagger siblings**

Replace the scroll reveal JS block (lines 1693-1703) with:

```javascript
// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      // Stagger siblings that don't have an explicit delay
      const parent = entry.target.parentElement;
      const siblings = parent.querySelectorAll('.reveal:not(.active)');
      siblings.forEach((sib, i) => {
        if (!sib.className.includes('reveal-delay-')) {
          sib.style.transitionDelay = `${0.08 * (i + 1)}s`;
        }
        sib.classList.add('active');
      });
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

revealElements.forEach(el => revealObserver.observe(el));
```

- [ ] **Step 3: Verify in browser**

Scroll the page. Elements should fade in with a smooth stagger effect — siblings animate sequentially with 80ms delays.

- [ ] **Step 4: Commit**

```bash
git add my-website.html/index.html
git commit -m "anim: staggered scroll reveal with 80ms sibling delays"
```

---

### Task 5: Upgrade Card Hover Effects — Glass Morphism + Lift

**Files:**
- Modify: `my-website.html/index.html:709-809` (feature card CSS)
- Modify: `my-website.html/index.html:882-908` (stat card CSS)

- [ ] **Step 1: Replace feature card styles with glass morphism**

Replace the `.feature-card` rule (lines 716-743) and its `::before` (lines 726-738) with:

```css
.feature-card {
  position: relative;
  padding: 2.5rem;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition: all 0.4s var(--transition-smooth);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
}

.feature-card::before {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(167, 139, 250, 0.08), transparent 50%);
  opacity: 0;
  transition: opacity 0.4s;
  pointer-events: none;
}

.feature-card:hover::before {
  opacity: 1;
}

.feature-card:hover {
  transform: translateY(-4px);
  border-color: var(--border-hover);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.3),
    0 0 0 1px rgba(167, 139, 250, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.05);
}
```

- [ ] **Step 2: Upgrade stat card hover**

Replace the `.stat-card` rule (lines 882-895) with:

```css
.stat-card {
  text-align: center;
  padding: 2rem 1.5rem;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  transition: all 0.3s var(--transition-smooth);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
}

.stat-card:hover {
  transform: translateY(-4px);
  border-color: var(--border-hover);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.04);
}
```

- [ ] **Step 3: Verify in browser**

Hover over feature cards and stat cards. They should lift 4px, show glass blur, and glow border on hover.

- [ ] **Step 4: Commit**

```bash
git add my-website.html/index.html
git commit -m "style: glass morphism cards with refined hover effects"
```

---

### Task 6: Add Section Dividers — Gradient Fade Lines

**Files:**
- Modify: `my-website.html/index.html` (add CSS + apply to sections)

- [ ] **Step 1: Add section divider CSS**

Add after the `.section-subtitle` rule (after line 707):

```css
/* ===== SECTION DIVIDERS ===== */
.section-divider {
  display: block;
  width: 100%;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(167, 139, 250, 0.15), rgba(96, 165, 250, 0.15), transparent);
  border: none;
  margin: 0;
  position: relative;
  z-index: 10;
}
```

- [ ] **Step 2: Add `<hr class="section-divider">` between major sections**

Add divider HTML between the following sections in the `<body>`:
- After the marquee section (after `</section>` at ~line 1433)
- After the "What We Do" section (after ~line 1510)
- After the "How It Works" section (after ~line 1545)
- After the Stats section (after ~line 1569)
- After the Vision section (after ~line 1581)

Each insertion looks like:

```html
  <hr class="section-divider">
```

- [ ] **Step 3: Verify in browser**

Scroll through the page. Each section boundary should have a subtle gradient line fading from transparent → purple → blue → transparent.

- [ ] **Step 4: Commit**

```bash
git add my-website.html/index.html
git commit -m "style: gradient fade section dividers between major sections"
```

---

### Task 7: Upgrade Scroll Progress Bar

**Files:**
- Modify: `my-website.html/index.html:99-111` (scroll progress CSS)

- [ ] **Step 1: Replace scroll progress CSS**

Replace the `.scroll-progress` rule (lines 99-111) with:

```css
.scroll-progress {
  position: fixed;
  top: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--accent), var(--accent-cyan), var(--accent-green), var(--accent));
  background-size: 300% 100%;
  z-index: 10001;
  transform-origin: left;
  transform: scaleX(0);
  animation: gradientShift 8s linear infinite;
  box-shadow: 0 0 12px var(--accent), 0 0 24px rgba(167, 139, 250, 0.3);
}
```

- [ ] **Step 2: Verify in browser**

Scroll down. Progress bar should show a purple → cyan → green gradient with a softer glow.

- [ ] **Step 3: Commit**

```bash
git add my-website.html/index.html
git commit -m "style: upgrade scroll progress bar with accent gradient and soft glow"
```

---

### Task 8: Add "Trusted By" Client Strip

**Files:**
- Modify: `my-website.html/index.html` (add CSS + HTML section)

- [ ] **Step 1: Add client strip CSS**

Add after the marquee CSS section (after the `.marquee-item::before` rule, around line 647):

```css
/* ===== TRUSTED BY ===== */
.trusted-section {
  padding: 4rem 0 2rem;
  position: relative;
  z-index: 10;
}

.trusted-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.2em;
  color: var(--text-muted);
  text-align: center;
  margin-bottom: 2rem;
}

.trusted-logos {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4rem;
  flex-wrap: wrap;
}

.trusted-logo {
  font-family: 'Inter', sans-serif;
  font-size: 1.4rem;
  font-weight: 800;
  letter-spacing: 0.15em;
  color: var(--text-muted);
  opacity: 0.4;
  transition: opacity 0.4s ease;
  text-transform: uppercase;
}

.trusted-logo:hover {
  opacity: 0.7;
}

.trusted-divider {
  width: 1px;
  height: 24px;
  background: rgba(255, 255, 255, 0.1);
}
```

- [ ] **Step 2: Add "Trusted By" HTML after the marquee section**

After the marquee `</section>` tag (around line 1433), add:

```html
  <!-- Trusted By -->
  <section class="trusted-section">
    <div class="container">
      <div class="reveal">
        <p class="trusted-label">Trusted By</p>
        <div class="trusted-logos">
          <span class="trusted-logo">NewFI</span>
          <div class="trusted-divider"></div>
          <span class="trusted-logo">Apollo</span>
        </div>
      </div>
    </div>
  </section>
```

- [ ] **Step 3: Verify in browser**

After the scrolling marquee, "TRUSTED BY" label and two grayscale client names (NEWFI, APOLLO) should appear. Hovering brightens them slightly.

- [ ] **Step 4: Commit**

```bash
git add my-website.html/index.html
git commit -m "feat: add trusted-by client strip with NewFI and Apollo"
```

---

### Task 9: Add NewFI Case Study Section

**Files:**
- Modify: `my-website.html/index.html` (add CSS + HTML section)

- [ ] **Step 1: Add case study CSS**

Add after the trusted-by CSS block:

```css
/* ===== CASE STUDY ===== */
.case-study-section {
  padding: 4rem 0;
  position: relative;
  z-index: 10;
}

.case-study-card {
  position: relative;
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-2xl);
  padding: 3.5rem 3rem;
  overflow: hidden;
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
}

.case-study-card::before {
  content: '';
  position: absolute;
  top: -60px;
  right: -60px;
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(167, 139, 250, 0.12), transparent 70%);
  pointer-events: none;
}

.case-study-card::after {
  content: '';
  position: absolute;
  bottom: -40px;
  left: -40px;
  width: 150px;
  height: 150px;
  background: radial-gradient(circle, rgba(34, 211, 238, 0.06), transparent 70%);
  pointer-events: none;
}

.case-study-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  color: var(--accent);
  text-transform: uppercase;
  letter-spacing: 0.15em;
  padding: 0.5rem 1.2rem;
  background: rgba(167, 139, 250, 0.08);
  border: 1px solid rgba(167, 139, 250, 0.2);
  border-radius: var(--radius-sm);
  margin-bottom: 1.5rem;
}

.case-study-card h3 {
  font-size: clamp(1.5rem, 3vw, 2rem);
  font-weight: 700;
  color: var(--text);
  margin-bottom: 0.5rem;
  letter-spacing: -0.02em;
  position: relative;
}

.case-study-client {
  font-size: 0.95rem;
  color: var(--accent-cyan);
  margin-bottom: 1.25rem;
  position: relative;
}

.case-study-desc {
  color: var(--text-secondary);
  font-size: 1rem;
  line-height: 1.8;
  max-width: 680px;
  margin-bottom: 2rem;
  position: relative;
}

.case-study-metrics {
  display: flex;
  gap: 3rem;
  flex-wrap: wrap;
  position: relative;
}

.case-study-metric {
  text-align: left;
}

.metric-value {
  font-size: 2rem;
  font-weight: 800;
  letter-spacing: -0.02em;
  line-height: 1;
  margin-bottom: 0.5rem;
}

.metric-value.purple { color: var(--accent); }
.metric-value.cyan { color: var(--accent-cyan); }
.metric-value.green { color: var(--accent-green); }

.metric-label {
  font-size: 0.75rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.1em;
}
```

- [ ] **Step 2: Add case study HTML after the "What We Build" section**

After the closing `</section>` of the "What We Build" section (around line 1510), add:

```html
  <!-- Case Study -->
  <section class="case-study-section">
    <div class="container">
      <div class="case-study-card reveal">
        <div class="case-study-badge">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          Case Study
        </div>
        <h3>Streamlining Non-QM Guideline Comparison</h3>
        <p class="case-study-client">NewFI Lending — backed by Apollo Hedge Fund</p>
        <p class="case-study-desc">Replaced manual lender guideline reviews with an AI-powered comparator that identifies matches, conflicts, and overlays across complex mortgage documents — turning hours of underwriter work into minutes.</p>
        <div class="case-study-metrics">
          <div class="case-study-metric">
            <div class="metric-value purple">10x</div>
            <div class="metric-label">Faster Reviews</div>
          </div>
          <div class="case-study-metric">
            <div class="metric-value cyan">v2.3</div>
            <div class="metric-label">Live in Production</div>
          </div>
          <div class="case-study-metric">
            <div class="metric-value green">100%</div>
            <div class="metric-label">Match Accuracy</div>
          </div>
        </div>
      </div>
    </div>
  </section>
```

- [ ] **Step 3: Verify in browser**

A glassmorphic case study card should appear between "What We Build" and "How It Works" sections with the NewFI project details and three metrics.

- [ ] **Step 4: Commit**

```bash
git add my-website.html/index.html
git commit -m "feat: add NewFI case study section with key metrics"
```

---

### Task 10: Add Mobile Hamburger Menu

**Files:**
- Modify: `my-website.html/index.html` (add CSS + HTML + JS)
- Modify: `my-website.html/about.html` (same changes)

- [ ] **Step 1: Add mobile nav CSS**

Add after the existing `@media (max-width: 768px)` block in `index.html`:

```css
/* ===== MOBILE NAV ===== */
.hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  z-index: 1002;
}

.hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--text);
  border-radius: 2px;
  transition: all 0.3s ease;
}

.hamburger.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
}

.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

.mobile-nav-overlay {
  position: fixed;
  inset: 0;
  z-index: 999;
  background: rgba(12, 12, 20, 0.95);
  backdrop-filter: blur(30px);
  -webkit-backdrop-filter: blur(30px);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s ease;
}

.mobile-nav-overlay.active {
  opacity: 1;
  visibility: visible;
}

.mobile-nav-links {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.mobile-nav-links a {
  color: var(--text);
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: -0.01em;
  transition: color 0.2s ease;
}

.mobile-nav-links a:hover {
  color: var(--accent);
}

@media (max-width: 768px) {
  .hamburger {
    display: flex;
  }
}
```

- [ ] **Step 2: Add hamburger button HTML in the header nav**

In the header's `.nav-inner` div, add after the `.nav-links` nav element:

```html
<button class="hamburger" id="hamburger" aria-label="Toggle menu">
  <span></span>
  <span></span>
  <span></span>
</button>
```

- [ ] **Step 3: Add mobile nav overlay HTML before the closing `</body>` tag**

```html
<div class="mobile-nav-overlay" id="mobile-nav">
  <div class="mobile-nav-links">
    <a href="index.html">Home</a>
    <a href="about.html">About</a>
  </div>
</div>
```

- [ ] **Step 4: Add mobile nav JS**

Add inside the `DOMContentLoaded` event listener:

```javascript
// ===== MOBILE NAV =====
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  mobileNav.classList.toggle('active');
  document.body.classList.toggle('modal-open');
});

mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileNav.classList.remove('active');
    document.body.classList.remove('modal-open');
  });
});
```

- [ ] **Step 5: Verify in browser**

Resize to < 768px. Hamburger icon should appear. Clicking it opens a full-screen overlay with nav links. Clicking a link navigates and closes the overlay. Hamburger animates to X when open.

- [ ] **Step 6: Apply same changes to about.html**

Repeat steps 1-4 for `about.html`, making the same CSS, HTML, and JS additions.

- [ ] **Step 7: Commit**

```bash
git add my-website.html/index.html my-website.html/about.html
git commit -m "feat: mobile hamburger menu with full-screen overlay"
```

---

### Task 11: Improve Responsive Design

**Files:**
- Modify: `my-website.html/index.html` (responsive CSS)
- Modify: `my-website.html/about.html` (responsive CSS)

- [ ] **Step 1: Update responsive breakpoints in index.html**

Replace the `@media (max-width: 1024px)` and `@media (max-width: 768px)` blocks with:

```css
@media (max-width: 1024px) {
  .steps-container {
    grid-template-columns: 1fr;
    gap: 3rem;
  }

  .steps-container::before {
    display: none;
  }

  .showcase-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .case-study-metrics {
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  section {
    padding: 4rem 0;
  }

  .hero {
    padding: 6rem 1.5rem 3rem;
  }

  .hero h1 {
    font-size: clamp(2.5rem, 10vw, 4rem);
  }

  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }

  .btn {
    width: 100%;
    max-width: 320px;
  }

  .features-grid {
    grid-template-columns: 1fr;
  }

  .showcase-grid {
    grid-template-columns: 1fr;
  }

  .vision-card,
  .cta-card {
    padding: 3rem 1.5rem;
  }

  .case-study-card {
    padding: 2.5rem 1.5rem;
  }

  .case-study-metrics {
    gap: 2rem;
  }

  .footer-content {
    flex-direction: column;
    text-align: center;
  }

  .footer-links {
    flex-wrap: wrap;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 0 1rem;
  }

  .feature-card {
    padding: 2rem 1.5rem;
  }

  .trusted-logos {
    gap: 2rem;
  }

  .case-study-metrics {
    flex-direction: column;
    gap: 1.5rem;
  }
}
```

- [ ] **Step 2: Update responsive CSS in about.html**

Update the `@media (max-width: 768px)` block in `about.html` to:

```css
@media (max-width: 768px) {
  .page-hero {
    padding: 8rem 1.5rem 3rem;
  }

  .page-hero h1 {
    font-size: clamp(2.5rem, 10vw, 4.5rem);
  }

  .mission-card {
    padding: 2.5rem 1.5rem;
  }

  .founders-grid {
    grid-template-columns: 1fr;
  }

  .founder-card {
    padding: 2rem 1.5rem;
  }

  .cta-card {
    padding: 3rem 1.5rem;
  }

  .values-grid {
    grid-template-columns: 1fr;
  }

  .footer-content {
    flex-direction: column;
    text-align: center;
  }

  .footer-links {
    flex-wrap: wrap;
    justify-content: center;
  }
}
```

- [ ] **Step 3: Verify in browser**

Test at 1024px, 768px, and 480px widths. Everything should stack, scale, and remain readable.

- [ ] **Step 4: Commit**

```bash
git add my-website.html/index.html my-website.html/about.html
git commit -m "style: improve responsive breakpoints for tablet, mobile, small mobile"
```

---

### Task 12: Apply Design Upgrades to About Page

**Files:**
- Modify: `my-website.html/about.html` (CSS variables + typography + card upgrades)

- [ ] **Step 1: Update about.html CSS variables**

Replace the `:root` block in about.html with the same variables from Task 2:

```css
:root {
  --bg: #0c0c14;
  --bg-elevated: #12121c;
  --bg-card: rgba(255, 255, 255, 0.02);
  --bg-card-hover: rgba(255, 255, 255, 0.04);
  --text: #f1f5f9;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  --accent: #a78bfa;
  --accent-alt: #60a5fa;
  --accent-pink: #f472b6;
  --accent-cyan: #22d3ee;
  --accent-green: #34d399;
  --accent-orange: #fb923c;
  --accent-yellow: #fbbf24;
  --border: rgba(255, 255, 255, 0.06);
  --border-hover: rgba(167, 139, 250, 0.25);
  --glass-bg: rgba(255, 255, 255, 0.03);
  --glass-border: rgba(255, 255, 255, 0.08);
  --glass-blur: 16px;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 20px;
  --radius-2xl: 24px;
  --transition-smooth: cubic-bezier(0.16, 1, 0.3, 1);
}
```

- [ ] **Step 2: Update about.html font import**

Replace the Google Fonts link with the same variable weight import from Task 2.

- [ ] **Step 3: Upgrade founder cards to glass morphism**

Replace the `.founder-card` rule with:

```css
.founder-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  padding: 2rem;
  position: relative;
  overflow: hidden;
  transition: all 0.4s var(--transition-smooth);
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
}

.founder-card:hover {
  transform: translateY(-4px);
  border-color: var(--border-hover);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05);
}
```

- [ ] **Step 4: Upgrade value cards**

Replace the `.value-card` rule with:

```css
.value-card {
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  padding: 2rem;
  text-align: center;
  transition: all 0.3s var(--transition-smooth);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(var(--glass-blur));
  -webkit-backdrop-filter: blur(var(--glass-blur));
}

.value-card:hover {
  transform: translateY(-4px);
  border-color: var(--border-hover);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.04);
}
```

- [ ] **Step 5: Fix the duplicate script bug**

Delete lines 1028-1030 in about.html (the orphaned `revealElements.forEach...` and extra `</script>`):

```html
        revealElements.forEach(el => revealObserver.observe(el));
      });
    </script>
```

- [ ] **Step 6: Update reveal CSS in about.html**

Replace the `.reveal` block with the same staggered version from Task 4.

- [ ] **Step 7: Update noise opacity in about.html**

Change `.noise` opacity from `0.02` to `0.035`.

- [ ] **Step 8: Verify in browser**

Open about.html. Cards should have glass morphism, typography should match the new design system, and no JS errors in console.

- [ ] **Step 9: Commit**

```bash
git add my-website.html/about.html
git commit -m "style: apply design system upgrades and fix script bug on about page"
```

---

### Task 13: Deploy to GitHub Pages

**Files:**
- Create: GitHub repo (via `gh` CLI or manual)

- [ ] **Step 1: Check if GitHub CLI is available**

```bash
gh --version
```

Expected: gh version X.Y.Z

- [ ] **Step 2: Create GitHub repository**

```bash
cd "C:/Users/Mayank/documents/larperwebsite"
gh repo create larper-website --public --source=. --remote=origin
```

Expected: Repository created and remote added.

- [ ] **Step 3: Push to main branch**

```bash
git push -u origin main
```

If the default branch is `master`:

```bash
git branch -M main
git push -u origin main
```

- [ ] **Step 4: Enable GitHub Pages**

```bash
gh api repos/{owner}/larper-website/pages -X POST -f source.branch=main -f source.path=/my-website.html
```

Or manually: Go to repo Settings → Pages → Source: Deploy from branch → `main` → `/my-website.html` folder → Save.

- [ ] **Step 5: Verify deployment**

Wait 1-2 minutes, then check `https://{owner}.github.io/larper-website/`

Expected: The redesigned larper.ai homepage loads with all new sections and effects.

- [ ] **Step 6: Commit (if any deployment config was added)**

```bash
git add -A
git commit -m "deploy: configure GitHub Pages"
git push
```

---

## Self-Review Checklist

- [x] Spec coverage: All sections covered — design tokens, mesh gradient, scroll reveal, card hovers, section dividers, progress bar, trusted-by strip, case study, mobile nav, responsive, about page, deployment
- [x] Placeholder scan: No TBDs, TODOs, or "implement later" patterns
- [x] Type consistency: All CSS class names and JS selectors are consistent across tasks