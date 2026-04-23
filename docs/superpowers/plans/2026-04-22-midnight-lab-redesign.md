# Midnight Lab Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Complete visual overhaul of larper.ai with a modern, minimalist "Midnight Lab" aesthetic featuring geometric corner frames, single accent color, and subtle animations.

**Architecture:** New CSS design system with CSS custom properties for tokens. JavaScript handles scroll-triggered reveals and corner frame pulse. Each page migrated to use shared components. No build step — vanilla HTML/CSS/JS.

**Tech Stack:** Vanilla HTML5, CSS3 with custom properties, vanilla JavaScript, Lucide icons via CDN, Google Fonts (Space Grotesk, Inter, JetBrains Mono)

---

## File Structure

### New Files
- `css/midnight-lab.css` — Complete design system with all tokens, base styles, components, animations
- `js/midnight-lab.js` — Scroll reveals, corner frame pulse, navigation scroll state, mobile menu
- `assets/corner-tl.svg` — Top-left corner frame
- `assets/corner-tr.svg` — Top-right corner frame
- `assets/corner-bl.svg` — Bottom-left corner frame
- `assets/corner-br.svg` — Bottom-right corner frame

### Modified Files
- `index.html` — Complete rewrite with new structure
- `about.html` — Restyle with new classes
- `larper-knowledge-map.html` — Restyle with new classes

---

## Task 1: Create Corner Frame SVG Assets

**Files:**
- Create: `assets/corner-tl.svg`
- Create: `assets/corner-tr.svg`
- Create: `assets/corner-bl.svg`
- Create: `assets/corner-br.svg`

- [ ] **Step 1: Create top-left corner SVG**

```svg
<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M48 0H0V48" stroke="currentColor" stroke-width="1"/>
</svg>
```

- [ ] **Step 2: Create top-right corner SVG**

```svg
<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 0H48V48" stroke="currentColor" stroke-width="1"/>
</svg>
```

- [ ] **Step 3: Create bottom-left corner SVG**

```svg
<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M48 48H0V0" stroke="currentColor" stroke-width="1"/>
</svg>
```

- [ ] **Step 4: Create bottom-right corner SVG**

```svg
<svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M0 48H48V0" stroke="currentColor" stroke-width="1"/>
</svg>
```

- [ ] **Step 5: Commit**

```bash
git add assets/corner-*.svg
git commit -m "feat: add geometric corner frame SVG assets"
```

---

## Task 2: Create Design System CSS

**Files:**
- Create: `css/midnight-lab.css`

- [ ] **Step 1: Write CSS file with design tokens, base styles, typography, layout, components, animations**

```css
/* ========================================
   MIDNIGHT LAB DESIGN SYSTEM
   ======================================== */

/* ----- Design Tokens ----- */
:root {
  /* Colors */
  --bg-primary: #0a0a0f;
  --bg-elevated: #12121a;
  --bg-hover: #1a1a24;
  --accent: #6366f1;
  --accent-glow: rgba(99, 102, 241, 0.4);
  --text-primary: #fafafa;
  --text-secondary: #a1a1aa;
  --text-tertiary: #71717a;
  --border: rgba(255, 255, 255, 0.08);
  --border-accent: rgba(99, 102, 241, 0.3);
  
  /* Typography Scale */
  --text-hero: 4.5rem;
  --text-h1: 3rem;
  --text-h2: 2rem;
  --text-h3: 1.25rem;
  --text-body: 1rem;
  --text-small: 0.875rem;
  --text-tiny: 0.75rem;
  
  /* Spacing */
  --space-xs: 0.5rem;
  --space-sm: 1rem;
  --space-md: 1.5rem;
  --space-lg: 2rem;
  --space-xl: 3rem;
  --space-2xl: 4rem;
  --space-section: 10rem;
  
  /* Container */
  --container-max: 1400px;
  --container-padding: 1.5rem;
  
  /* Border Radius */
  --radius-sm: 6px;
  --radius-md: 8px;
  --radius-lg: 12px;
  
  /* Transitions */
  --ease-smooth: cubic-bezier(0.16, 1, 0.3, 1);
  --duration-fast: 200ms;
  --duration-medium: 400ms;
  --duration-slow: 600ms;
}

/* ----- Base Styles ----- */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  scroll-behavior: smooth;
}

body {
  background: var(--bg-primary);
  color: var(--text-primary);
  font-family: 'Inter', system-ui, -apple-system, sans-serif;
  font-size: var(--text-body);
  line-height: 1.6;
  min-height: 100vh;
  overflow-x: hidden;
}

/* ----- Typography ----- */
h1, h2, h3, h4, h5, h6 {
  font-family: 'Space Grotesk', sans-serif;
  font-weight: 500;
  letter-spacing: -0.02em;
  line-height: 1.1;
}

.text-hero {
  font-size: var(--text-hero);
}

.text-h1 {
  font-size: var(--text-h1);
}

.text-h2 {
  font-size: var(--text-h2);
}

.text-h3 {
  font-size: var(--text-h3);
}

.text-secondary {
  color: var(--text-secondary);
}

.text-tertiary {
  color: var(--text-tertiary);
}

.label {
  font-size: var(--text-tiny);
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-tertiary);
}

.font-mono {
  font-family: 'JetBrains Mono', monospace;
}

/* ----- Layout ----- */
.container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
}

.section {
  padding: var(--space-section) 0;
}

.grid {
  display: grid;
  gap: var(--space-lg);
}

.grid-2 {
  grid-template-columns: repeat(2, 1fr);
}

.grid-3 {
  grid-template-columns: repeat(3, 1fr);
}

.grid-4 {
  grid-template-columns: repeat(4, 1fr);
}

.flex {
  display: flex;
}

.flex-col {
  flex-direction: column;
}

.items-center {
  align-items: center;
}

.justify-between {
  justify-content: space-between;
}

.gap-sm {
  gap: var(--space-sm);
}

.gap-md {
  gap: var(--space-md);
}

.gap-lg {
  gap: var(--space-lg);
}

/* ----- Geometric Corner Frame ----- */
.corner-frame {
  position: fixed;
  width: 48px;
  height: 48px;
  color: var(--border);
  z-index: 1000;
  pointer-events: none;
  transition: color var(--duration-medium) var(--ease-smooth);
}

.corner-frame.pulse {
  animation: corner-pulse var(--duration-medium) var(--ease-smooth);
}

.corner-tl {
  top: 24px;
  left: 24px;
}

.corner-tr {
  top: 24px;
  right: 24px;
}

.corner-bl {
  bottom: 24px;
  left: 24px;
}

.corner-br {
  bottom: 24px;
  right: 24px;
}

@keyframes corner-pulse {
  0%, 100% {
    color: var(--border);
    transform: scale(1);
  }
  50% {
    color: var(--accent);
    transform: scale(1.02);
  }
}

/* ----- Navigation ----- */
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 72px;
  z-index: 100;
  transition: background var(--duration-medium) var(--ease-smooth),
              border-color var(--duration-medium) var(--ease-smooth);
}

.nav.scrolled {
  background: rgba(10, 10, 15, 0.8);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid var(--border);
}

.nav-container {
  max-width: var(--container-max);
  margin: 0 auto;
  padding: 0 var(--container-padding);
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-logo {
  font-family: 'Space Grotesk', sans-serif;
  font-size: var(--text-h3);
  font-weight: 600;
  color: var(--text-primary);
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: var(--space-lg);
  align-items: center;
}

.nav-link {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: var(--text-small);
  font-weight: 500;
  transition: color var(--duration-fast) ease-out;
}

.nav-link:hover {
  color: var(--text-primary);
}

.nav-link.active {
  color: var(--accent);
}

/* Mobile Menu */
.nav-toggle {
  display: none;
  background: none;
  border: none;
  color: var(--text-primary);
  cursor: pointer;
  padding: var(--space-xs);
}

.nav-mobile {
  display: none;
  position: fixed;
  inset: 0;
  background: var(--bg-primary);
  z-index: 99;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-xl);
}

.nav-mobile.open {
  display: flex;
}

.nav-mobile .nav-link {
  font-size: var(--text-h2);
}

/* ----- Components ----- */

/* Buttons */
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-xs);
  padding: 12px 24px;
  font-family: inherit;
  font-size: var(--text-small);
  font-weight: 500;
  border-radius: var(--radius-sm);
  border: none;
  cursor: pointer;
  text-decoration: none;
  transition: transform var(--duration-fast) ease-out,
              box-shadow var(--duration-fast) ease-out;
}

.btn-primary {
  background: var(--accent);
  color: white;
}

.btn-primary:hover {
  transform: scale(1.02);
  box-shadow: 0 0 20px var(--accent-glow);
}

.btn-secondary {
  background: transparent;
  color: var(--text-primary);
  border: 1px solid var(--border);
}

.btn-secondary:hover {
  border-color: var(--border-accent);
}

/* Cards */
.card {
  background: var(--bg-elevated);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  padding: var(--space-lg);
  transition: transform var(--duration-fast) ease-out,
              border-color var(--duration-fast) ease-out;
}

.card:hover {
  transform: translateY(-2px);
  border-color: var(--border-accent);
}

.card-title {
  font-family: 'Space Grotesk', sans-serif;
  font-size: var(--text-h3);
  font-weight: 500;
  margin-bottom: var(--space-sm);
}

.card-text {
  color: var(--text-secondary);
  font-size: var(--text-small);
}

/* Inputs */
.input {
  width: 100%;
  padding: 12px 16px;
  background: transparent;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  color: var(--text-primary);
  font-family: inherit;
  font-size: var(--text-body);
  transition: border-color var(--duration-fast) ease-out;
}

.input:focus {
  outline: none;
  border-color: var(--accent);
}

.input::placeholder {
  color: var(--text-tertiary);
}

/* ----- Animations ----- */

/* Entrance animations */
[data-animate] {
  opacity: 0;
  transform: translateY(30px);
}

[data-animate].visible {
  animation: fade-in-up var(--duration-slow) var(--ease-smooth) forwards;
}

[data-animate].visible.delay-1 { animation-delay: 100ms; }
[data-animate].visible.delay-2 { animation-delay: 200ms; }
[data-animate].visible.delay-3 { animation-delay: 300ms; }
[data-animate].visible.delay-4 { animation-delay: 400ms; }

@keyframes fade-in-up {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Page load sequence */
.page-load [data-animate="nav"] {
  opacity: 0;
  animation: fade-in var(--duration-slow) var(--ease-smooth) 200ms forwards;
}

.page-load [data-animate="hero"] {
  opacity: 0;
  animation: fade-in-up var(--duration-slow) var(--ease-smooth) 400ms forwards;
}

.page-load [data-animate="hero-sub"] {
  opacity: 0;
  animation: fade-in-up var(--duration-slow) var(--ease-smooth) 500ms forwards;
}

.page-load [data-animate="hero-cta"] {
  opacity: 0;
  animation: fade-in-up var(--duration-slow) var(--ease-smooth) 600ms forwards;
}

@keyframes fade-in {
  to {
    opacity: 1;
  }
}

/* Reduced motion */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  
  [data-animate] {
    opacity: 1;
    transform: none;
  }
}

/* ----- Utility Classes ----- */
.text-center {
  text-align: center;
}

.max-w-2xl {
  max-width: 42rem;
}

.max-w-3xl {
  max-width: 48rem;
}

.mx-auto {
  margin-left: auto;
  margin-right: auto;
}

.mb-sm { margin-bottom: var(--space-sm); }
.mb-md { margin-bottom: var(--space-md); }
.mb-lg { margin-bottom: var(--space-lg); }
.mb-xl { margin-bottom: var(--space-xl); }

/* ----- Responsive ----- */
@media (min-width: 640px) {
  :root {
    --container-padding: 3rem;
  }
}

@media (min-width: 1024px) {
  :root {
    --container-padding: 5rem;
  }
  
  .corner-frame {
    width: 64px;
    height: 64px;
  }
  
  .corner-tl, .corner-bl {
    left: 40px;
  }
  
  .corner-tr, .corner-br {
    right: 40px;
  }
  
  .corner-tl, .corner-tr {
    top: 40px;
  }
  
  .corner-bl, .corner-br {
    bottom: 40px;
  }
}

@media (max-width: 768px) {
  :root {
    --text-hero: 2.5rem;
    --text-h1: 2rem;
    --text-h2: 1.5rem;
    --space-section: 6rem;
  }
  
  .grid-2,
  .grid-3,
  .grid-4 {
    grid-template-columns: 1fr;
  }
  
  .nav-links {
    display: none;
  }
  
  .nav-toggle {
    display: block;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add css/midnight-lab.css
git commit -m "feat: create Midnight Lab design system CSS"
```

---

## Task 3: Create JavaScript for Interactions

**Files:**
- Create: `js/midnight-lab.js`

- [ ] **Step 1: Write JavaScript file with scroll reveals, corner pulse, nav scroll state, mobile menu**

```javascript
/**
 * Midnight Lab - Interactive Behaviors
 */

(function() {
  'use strict';

  // ----- Scroll Reveal Animation -----
  function initScrollReveal() {
    const animatedElements = document.querySelectorAll('[data-animate="scroll"]');
    
    if (!animatedElements.length) return;
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
          // Add staggered delay based on element index
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, index * 100);
          
          // Unobserve after animation
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    });
    
    animatedElements.forEach(el => observer.observe(el));
  }

  // ----- Navigation Scroll State -----
  function initNavScroll() {
    const nav = document.querySelector('.nav');
    if (!nav) return;
    
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
      const currentScroll = window.pageYOffset;
      
      // Add scrolled class when past 50px
      if (currentScroll > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
      
      lastScroll = currentScroll;
    }, { passive: true });
  }

  // ----- Corner Frame Pulse -----
  function initCornerPulse() {
    const corners = document.querySelectorAll('.corner-frame');
    if (!corners.length) return;
    
    let scrollTimeout;
    
    window.addEventListener('scroll', () => {
      // Add pulse class
      corners.forEach(corner => {
        corner.classList.add('pulse');
      });
      
      // Remove pulse class after animation completes
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        corners.forEach(corner => {
          corner.classList.remove('pulse');
        });
      }, 400);
    }, { passive: true });
  }

  // ----- Mobile Menu Toggle -----
  function initMobileMenu() {
    const toggle = document.querySelector('.nav-toggle');
    const mobileMenu = document.querySelector('.nav-mobile');
    
    if (!toggle || !mobileMenu) return;
    
    toggle.addEventListener('click', () => {
      mobileMenu.classList.toggle('open');
      
      // Update aria-expanded
      const isOpen = mobileMenu.classList.contains('open');
      toggle.setAttribute('aria-expanded', isOpen);
    });
    
    // Close mobile menu when clicking a link
    const mobileLinks = mobileMenu.querySelectorAll('.nav-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // ----- Initialize All -----
  function init() {
    initScrollReveal();
    initNavScroll();
    initCornerPulse();
    initMobileMenu();
    
    // Add page-load class for initial animations
    document.body.classList.add('page-load');
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
```

- [ ] **Step 2: Commit**

```bash
git add js/midnight-lab.js
git commit -m "feat: add Midnight Lab interaction behaviors"
```

---

## Task 4: Create New index.html Structure

**Files:**
- Modify: `index.html` (complete rewrite)

- [ ] **Step 1: Replace index.html with new Midnight Lab design**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>larper.ai | Build Reality with AI</title>
  
  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  
  <!-- Styles -->
  <link rel="stylesheet" href="css/midnight-lab.css">
  
  <!-- Lucide Icons -->
  <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>
  <!-- Geometric Corner Frames -->
  <div class="corner-frame corner-tl" aria-hidden="true">
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M48 0H0V48" stroke="currentColor" stroke-width="1"/></svg>
  </div>
  <div class="corner-frame corner-tr" aria-hidden="true">
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M0 0H48V48" stroke="currentColor" stroke-width="1"/></svg>
  </div>
  <div class="corner-frame corner-bl" aria-hidden="true">
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M48 48H0V0" stroke="currentColor" stroke-width="1"/></svg>
  </div>
  <div class="corner-frame corner-br" aria-hidden="true">
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M0 48H48V0" stroke="currentColor" stroke-width="1"/></svg>
  </div>

  <!-- Navigation -->
  <nav class="nav" data-animate="nav">
    <div class="nav-container">
      <a href="index.html" class="nav-logo">larper.ai</a>
      
      <div class="nav-links">
        <a href="about.html" class="nav-link">About</a>
        <a href="larper-knowledge-map.html" class="nav-link">Knowledge</a>
        <a href="#contact" class="btn btn-primary">Get Started</a>
      </div>
      
      <button class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">
        <i data-lucide="menu" style="width: 24px; height: 24px;"></i>
      </button>
    </div>
  </nav>
  
  <!-- Mobile Menu -->
  <div class="nav-mobile">
    <a href="about.html" class="nav-link">About</a>
    <a href="larper-knowledge-map.html" class="nav-link">Knowledge</a>
    <a href="#contact" class="btn btn-primary">Get Started</a>
  </div>

  <!-- Hero Section -->
  <section class="section" style="padding-top: calc(72px + var(--space-section));">
    <div class="container">
      <div class="text-center max-w-3xl mx-auto">
        <p class="label mb-md" data-animate="hero">AI-FIRST SYSTEMS</p>
        <h1 class="text-hero mb-lg" data-animate="hero-sub">Build Reality with AI</h1>
        <p class="text-secondary text-h3" style="font-weight: 400;" data-animate="hero-sub">
          Engineering the future through intelligent systems that learn, adapt, and create.
        </p>
        <div class="flex items-center justify-center gap-md" style="margin-top: var(--space-xl);" data-animate="hero-cta">
          <a href="#features" class="btn btn-primary">Explore Systems</a>
          <a href="about.html" class="btn btn-secondary">Learn More</a>
        </div>
      </div>
    </div>
  </section>

  <!-- Features Section -->
  <section id="features" class="section">
    <div class="container">
      <div class="text-center mb-xl" data-animate="scroll">
        <p class="label mb-sm">CAPABILITIES</p>
        <h2 class="text-h1">Intelligent Systems</h2>
      </div>
      
      <div class="grid grid-3">
        <div class="card" data-animate="scroll">
          <i data-lucide="brain" style="width: 32px; height: 32px; color: var(--accent); margin-bottom: var(--space-md);"></i>
          <h3 class="card-title">Adaptive Intelligence</h3>
          <p class="card-text">Systems that evolve with your needs, learning patterns and optimizing in real-time.</p>
        </div>
        
        <div class="card" data-animate="scroll">
          <i data-lucide="workflow" style="width: 32px; height: 32px; color: var(--accent); margin-bottom: var(--space-md);"></i>
          <h3 class="card-title">Seamless Integration</h3>
          <p class="card-text">Connect with your existing stack. APIs, webhooks, and native integrations.</p>
        </div>
        
        <div class="card" data-animate="scroll">
          <i data-lucide="shield" style="width: 32px; height: 32px; color: var(--accent); margin-bottom: var(--space-md);"></i>
          <h3 class="card-title">Enterprise Security</h3>
          <p class="card-text">SOC 2 compliant, end-to-end encryption, and full audit trails.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section id="contact" class="section">
    <div class="container">
      <div class="card text-center max-w-2xl mx-auto" data-animate="scroll">
        <p class="label mb-sm">GET STARTED</p>
        <h2 class="text-h1 mb-md">Ready to build?</h2>
        <p class="text-secondary mb-lg">Join the teams engineering the next generation of intelligent systems.</p>
        <a href="mailto:hello@larper.ai" class="btn btn-primary">
          <i data-lucide="mail" style="width: 18px; height: 18px;"></i>
          Contact Us
        </a>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="section" style="padding-top: var(--space-lg); padding-bottom: var(--space-lg);">
    <div class="container">
      <div class="flex items-center justify-between" style="border-top: 1px solid var(--border); padding-top: var(--space-lg);">
        <p class="text-tertiary" style="font-size: var(--text-small);">© 2026 larper.ai</p>
        <div class="flex gap-md">
          <a href="#" class="nav-link" aria-label="Twitter">
            <i data-lucide="twitter" style="width: 20px; height: 20px;"></i>
          </a>
          <a href="#" class="nav-link" aria-label="GitHub">
            <i data-lucide="github" style="width: 20px; height: 20px;"></i>
          </a>
          <a href="#" class="nav-link" aria-label="LinkedIn">
            <i data-lucide="linkedin" style="width: 20px; height: 20px;"></i>
          </a>
        </div>
      </div>
    </div>
  </footer>

  <!-- Initialize Icons -->
  <script>lucide.createIcons();</script>
  
  <!-- Scripts -->
  <script src="js/midnight-lab.js"></script>
</body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "feat: redesign index.html with Midnight Lab aesthetic"
```

---

## Task 5: Update about.html

**Files:**
- Modify: `about.html`

- [ ] **Step 1: Read current about.html to preserve content**

```bash
cat about.html | head -100
```

- [ ] **Step 2: Rewrite about.html with new structure keeping existing content**

Replace the file with this structure (adapt content from original):

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>About | larper.ai</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Space+Grotesk:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/midnight-lab.css">
  <script src="https://unpkg.com/lucide@latest"></script>
</head>
<body>
  <!-- Corner Frames -->
  <div class="corner-frame corner-tl" aria-hidden="true">
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M48 0H0V48" stroke="currentColor" stroke-width="1"/></svg>
  </div>
  <div class="corner-frame corner-tr" aria-hidden="true">
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M0 0H48V48" stroke="currentColor" stroke-width="1"/></svg>
  </div>
  <div class="corner-frame corner-bl" aria-hidden="true">
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M48 48H0V0" stroke="currentColor" stroke-width="1"/></svg>
  </div>
  <div class="corner-frame corner-br" aria-hidden="true">
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none"><path d="M0 48H48V0" stroke="currentColor" stroke-width="1"/></svg>
  </div>

  <!-- Navigation -->
  <nav class="nav" data-animate="nav">
    <div class="nav-container">
      <a href="index.html" class="nav-logo">larper.ai</a>
      <div class="nav-links">
        <a href="about.html" class="nav-link active">About</a>
        <a href="larper-knowledge-map.html" class="nav-link">Knowledge</a>
        <a href="index.html#contact" class="btn btn-primary">Get Started</a>
      </div>
      <button class="nav-toggle" aria-label="Toggle navigation" aria-expanded="false">
        <i data-lucide="menu" style="width: 24px; height: 24px;"></i>
      </button>
    </div>
  </nav>
  <div class="nav-mobile">
    <a href="about.html" class="nav-link active">About</a>
    <a href="larper-knowledge-map.html" class="nav-link">Knowledge</a>
    <a href="index.html#contact" class="btn btn-primary">Get Started</a>
  </div>

  <!-- About Content -->
  <section class="section" style="padding-top: calc(72px + var(--space-section));">
    <div class="container">
      <div class="max-w-3xl">
        <p class="label mb-sm" data-animate="scroll">ABOUT</p>
        <h1 class="text-hero mb-lg" data-animate="scroll">Our Mission</h1>
        <div data-animate="scroll">
          <!-- PRESERVE ORIGINAL ABOUT CONTENT HERE -->
          <p class="text-secondary text-h3" style="font-weight: 400; margin-bottom: var(--space-lg);">
            We believe AI should augment human capability, not replace it.
          </p>
          <p class="text-secondary" style="margin-bottom: var(--space-md);">
            larper.ai builds systems that bridge the gap between human intuition and machine precision. 
            Our tools are designed for engineers, researchers, and creators who want to harness AI 
            without losing control.
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="section" style="padding-top: var(--space-lg); padding-bottom: var(--space-lg);">
    <div class="container">
      <div class="flex items-center justify-between" style="border-top: 1px solid var(--border); padding-top: var(--space-lg);">
        <p class="text-tertiary" style="font-size: var(--text-small);">© 2026 larper.ai</p>
        <div class="flex gap-md">
          <a href="#" class="nav-link" aria-label="Twitter"><i data-lucide="twitter" style="width: 20px; height: 20px;"></i></a>
          <a href="#" class="nav-link" aria-label="GitHub"><i data-lucide="github" style="width: 20px; height: 20px;"></i></a>
          <a href="#" class="nav-link" aria-label="LinkedIn"><i data-lucide="linkedin" style="width: 20px; height: 20px;"></i></a>
        </div>
      </div>
    </div>
  </footer>

  <script>lucide.createIcons();</script>
  <script src="js/midnight-lab.js"></script>
</body>
</html>
```

**Note:** Migrate the actual content from the existing about.html into this structure.

- [ ] **Step 3: Commit**

```bash
git add about.html
git commit -m "feat: redesign about.html with Midnight Lab aesthetic"
```

---

## Task 6: Update larper-knowledge-map.html

**Files:**
- Modify: `larper-knowledge-map.html`

- [ ] **Step 1: Read current larper-knowledge-map.html to preserve content**

```bash
cat larper-knowledge-map.html | head -100
```

- [ ] **Step 2: Rewrite with new structure keeping existing content**

Apply the same pattern as Task 5:
- Keep the corner frame divs
- Keep the navigation structure
- Wrap existing content in the new layout classes
- Add `data-animate="scroll"` to content sections
- Include footer
- Add Lucide icons initialization
- Include midnight-lab.css and midnight-lab.js

- [ ] **Step 3: Commit**

```bash
git add larper-knowledge-map.html
git commit -m "feat: redesign knowledge map with Midnight Lab aesthetic"
```

---

## Task 7: Test Responsive Behavior

**Files:**
- Test: All three HTML files

- [ ] **Step 1: Verify mobile viewport**

Check that at < 768px:
- Navigation collapses to hamburger menu
- Grid columns become single column
- Text sizes reduce appropriately
- Corner frames are still visible but smaller

- [ ] **Step 2: Verify tablet viewport**

Check that at 768px - 1024px:
- Two-column grids work
- Navigation is visible
- Spacing is appropriate

- [ ] **Step 3: Verify desktop viewport**

Check that at > 1024px:
- Full layout with 12-column grid
- Larger corner frames
- All navigation links visible

- [ ] **Step 4: Commit if any fixes needed**

```bash
git add -A
git commit -m "fix: responsive adjustments for Midnight Lab design"
```

---

## Task 8: Final Review

- [ ] **Step 1: Check spec compliance**

Verify:
- [ ] Single accent color only (#6366f1)
- [ ] No background gradients
- [ ] Corner frames implemented and visible
- [ ] Animations are subtle (200-600ms, no bounce)
- [ ] Generous whitespace (160px sections)
- [ ] Typography uses Space Grotesk for headlines
- [ ] Hover states are consistent
- [ ] prefers-reduced-motion is respected
- [ ] Mobile menu works

- [ ] **Step 2: Final commit**

```bash
git add -A
git commit -m "feat: complete Midnight Lab redesign implementation"
```

---

## Success Criteria

All tasks complete when:
- [ ] CSS design system created with all tokens
- [ ] JavaScript interactions working (scroll reveal, corner pulse, nav scroll)
- [ ] All three pages migrated
- [ ] Mobile responsive verified
- [ ] No visual regressions from original content
- [ ] Design matches spec: single accent, geometric frames, subtle animations

---

## Notes for Implementer

1. **Content Migration:** When updating about.html and larper-knowledge-map.html, preserve the actual content from the original files. The examples above show placeholder content.

2. **Icons:** The Lucide icons script must load before `lucide.createIcons()` is called.

3. **Testing:** Open each HTML file in a browser and verify:
   - Page loads without console errors
   - Corner frames visible in all four corners
   - Scroll triggers animations
   - Navigation changes on scroll
   - Mobile menu toggles
   - Reduced motion preference respected

4. **Browser Support:** This uses CSS custom properties, backdrop-filter, and IntersectionObserver. All modern browsers support these.
