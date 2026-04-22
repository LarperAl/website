# Interactive Elements Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Harmonic.fun-inspired interactive elements to larper.ai — particle field, geometric frames, choreographed entrances, magnetic buttons, and enhanced hovers.

**Architecture:** Hybrid approach: Canvas API for particles/cursor effects (performance-critical 60fps), CSS animations for entrance/transition effects (GPU-accelerated), IntersectionObserver for scroll reveals. All new JS lives in separate files (`js/`), CSS additions go inline in each HTML file's `<style>` block. No external dependencies.

**Tech Stack:** Vanilla JS, Canvas API, CSS animations, IntersectionObserver, SVG for corner frames.

---

## File Structure

### New files
- `js/particles.js` — Canvas particle system, cursor glow orb, connection lines
- `js/magnetic.js` — Magnetic button pull effect
- `js/entrance.js` — Page load sequence orchestration, hero word stagger
- `js/countup.js` — Stat number count-up animation

### Modified files
- `index.html` — Add `<canvas>`, corner frame SVGs, new CSS rules, `<script>` tags for new files, `data-*` attributes on hero elements and stat numbers
- `about.html` — Same structural additions as index.html (corner frames, canvas, scripts, CSS)

---

### Task 1: Canvas Particle System

**Files:**
- Create: `js/particles.js`
- Modify: `index.html` (add canvas element, script tag, CSS for canvas)

- [ ] **Step 1: Create `js/particles.js` with the particle field, cursor glow, and connection lines**

```js
// js/particles.js
(function () {
  'use strict';

  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width, height;
  let mouse = { x: -1000, y: -1000, clicking: false };
  let particles = [];
  let animationId;
  let visible = true;
  let particleOpacity = 0;

  const COLORS = ['#a78bfa', '#22d3ee', '#f472b6', '#60a5fa'];
  const isMobile = window.innerWidth < 768;
  const PARTICLE_COUNT = isMobile ? 20 : 60;
  const CONNECTION_DIST = 120;
  const CURSOR_RADIUS = 100;
  const CURSOR_LERP = 0.1;

  // Smoothed cursor position
  let cursorSmooth = { x: -1000, y: -1000 };
  let pulseRadius = 0;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        opacity: Math.random() * 0.4 + 0.2,
      });
    }
  }

  function drawParticle(p) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.opacity * particleOpacity;
    ctx.fill();
  }

  function drawCursorGlow() {
    if (isMobile) return;
    // Lerp cursor
    cursorSmooth.x += (mouse.x - cursorSmooth.x) * CURSOR_LERP;
    cursorSmooth.y += (mouse.y - cursorSmooth.y) * CURSOR_LERP;

    // Color based on cursor X position
    const t = cursorSmooth.x / width;
    const r = Math.round(167 + (34 - 167) * t);
    const g = Math.round(139 + (211 - 139) * t);
    const b = Math.round(250 + (238 - 250) * t);

    const baseRadius = 100;
    const currentRadius = baseRadius + pulseRadius;

    const gradient = ctx.createRadialGradient(
      cursorSmooth.x, cursorSmooth.y, 0,
      cursorSmooth.x, cursorSmooth.y, currentRadius
    );
    gradient.addColorStop(0, `rgba(${r},${g},${b},0.15)`);
    gradient.addColorStop(0.5, `rgba(${r},${g},${b},0.05)`);
    gradient.addColorStop(1, `rgba(${r},${g},${b},0)`);

    ctx.globalAlpha = particleOpacity;
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(cursorSmooth.x, cursorSmooth.y, currentRadius, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawConnections() {
    if (isMobile) return;
    for (const p of particles) {
      const dx = p.x - cursorSmooth.x;
      const dy = p.y - cursorSmooth.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < CONNECTION_DIST) {
        const alpha = (1 - dist / CONNECTION_DIST) * 0.2 * particleOpacity;
        ctx.strokeStyle = p.color;
        ctx.globalAlpha = alpha;
        ctx.lineWidth = 0.5;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(cursorSmooth.x, cursorSmooth.y);
        ctx.stroke();
      }
    }
  }

  function updateParticles() {
    for (const p of particles) {
      p.x += p.speedX;
      p.y += p.speedY;

      // Wrap around edges
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;
    }

    // Decay pulse
    if (pulseRadius > 0) {
      pulseRadius *= 0.92;
      if (pulseRadius < 1) pulseRadius = 0;
    }
  }

  function animate() {
    if (!visible) {
      animationId = requestAnimationFrame(animate);
      return;
    }

    ctx.clearRect(0, 0, width, height);
    ctx.globalAlpha = 1;

    drawCursorGlow();
    drawConnections();

    for (const p of particles) {
      drawParticle(p);
    }

    updateParticles();

    ctx.globalAlpha = 1;
    animationId = requestAnimationFrame(animate);
  }

  // Event listeners
  window.addEventListener('resize', () => {
    resize();
    createParticles();
  });

  document.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  document.addEventListener('mousedown', () => {
    pulseRadius = 80;
  });

  document.addEventListener('visibilitychange', () => {
    visible = !document.hidden;
  });

  // Public API for entrance animation to control fade-in
  window.particleSystem = {
    fadeIn: function () {
      const start = performance.now();
      const duration = 1000;
      function tick(now) {
        const elapsed = now - start;
        particleOpacity = Math.min(elapsed / duration, 1);
        if (elapsed < duration) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    },
  };

  // Init
  resize();
  createParticles();
  animate();
})();
```

- [ ] **Step 2: Add the canvas element and CSS to `index.html`**

In `index.html`, add the canvas element right after the `<div class="noise"></div>` line (line ~1645) and before the closing `</div>` of `bg-container`:

```html
<canvas id="particle-canvas"></canvas>
```

Add this CSS inside the `<style>` block (after the existing `.noise` rule, around line 110):

```css
/* ===== PARTICLE CANVAS ===== */
#particle-canvas {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
}
```

Add the script tag before the closing `</body>` tag, after the existing inline `<script>`:

```html
<script src="js/particles.js"></script>
```

- [ ] **Step 3: Test in browser**

Open `index.html` in a browser. Expected: ~60 small dots floating across the screen, a purple-to-cyan glow following the mouse cursor, and thin lines connecting nearby particles to the cursor. Clicking should cause the glow to briefly pulse outward. No errors in console.

- [ ] **Step 4: Commit**

```bash
git add js/particles.js index.html
git commit -m "feat: add canvas particle field with cursor glow and connection lines"
```

---

### Task 2: Geometric Corner Frames

**Files:**
- Modify: `index.html` (add corner frame SVGs, CSS)

- [ ] **Step 1: Add corner frame SVGs and CSS to `index.html`**

Add the corner frame HTML right after the `<canvas id="particle-canvas"></canvas>` element inside `bg-container` (before the closing `</div>` of bg-container):

```html
<!-- Geometric corner frames -->
<svg class="corner-frame corner-tl" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
  <line x1="0" y1="1" x2="60" y2="1" stroke="rgba(167,139,250,0.4)" stroke-width="1"/>
  <line x1="1" y1="0" x2="1" y2="60" stroke="rgba(167,139,250,0.4)" stroke-width="1"/>
</svg>
<svg class="corner-frame corner-tr" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
  <line x1="0" y1="1" x2="60" y2="1" stroke="rgba(167,139,250,0.4)" stroke-width="1"/>
  <line x1="59" y1="0" x2="59" y2="60" stroke="rgba(167,139,250,0.4)" stroke-width="1"/>
</svg>
<svg class="corner-frame corner-bl" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
  <line x1="1" y1="60" x2="1" y2="0" stroke="rgba(34,211,238,0.4)" stroke-width="1"/>
  <line x1="0" y1="59" x2="60" y2="59" stroke="rgba(34,211,238,0.4)" stroke-width="1"/>
</svg>
<svg class="corner-frame corner-br" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
  <line x1="59" y1="60" x2="59" y2="0" stroke="rgba(34,211,238,0.4)" stroke-width="1"/>
  <line x1="60" y1="59" x2="0" y2="59" stroke="rgba(34,211,238,0.4)" stroke-width="1"/>
</svg>
<div class="corner-line corner-line-top"></div>
<div class="corner-line corner-line-bottom"></div>
```

Add this CSS inside the `<style>` block (after the particle canvas CSS):

```css
/* ===== CORNER FRAMES ===== */
.corner-frame {
  position: fixed;
  width: 60px;
  height: 60px;
  z-index: 2;
  pointer-events: none;
}
.corner-tl { top: 16px; left: 16px; }
.corner-tr { top: 16px; right: 16px; }
.corner-bl { bottom: 16px; left: 16px; }
.corner-br { bottom: 16px; right: 16px; }

.corner-frame line {
  stroke-dasharray: 60;
  stroke-dashoffset: 60;
  animation: drawCorner 1.5s ease-out forwards;
}
.corner-tr line { animation-delay: 0.15s; }
.corner-bl line { animation-delay: 0.3s; }
.corner-br line { animation-delay: 0.45s; }

@keyframes drawCorner {
  to { stroke-dashoffset: 0; }
}

.corner-line {
  position: fixed;
  left: 76px;
  right: 76px;
  height: 0.5px;
  background: linear-gradient(90deg, transparent, rgba(167,139,250,0.15), rgba(34,211,238,0.15), transparent);
  z-index: 2;
  pointer-events: none;
  transform: scaleX(0);
  animation: extendLine 1s ease-out 0.8s forwards;
}
.corner-line-top { top: 16px; }
.corner-line-bottom { bottom: 16px; }

@keyframes extendLine {
  to { transform: scaleX(1); }
}

@media (max-width: 768px) {
  .corner-frame {
    width: 40px;
    height: 40px;
  }
  .corner-frame line { stroke-width: 0.5; stroke-dasharray: 40; stroke-dashoffset: 40; }
  .corner-tl { top: 10px; left: 10px; }
  .corner-tr { top: 10px; right: 10px; }
  .corner-bl { bottom: 10px; left: 10px; }
  .corner-br { bottom: 10px; right: 10px; }
  .corner-line { display: none; }
  .corner-line-top, .corner-line-bottom { display: none; }
}
```

- [ ] **Step 2: Test in browser**

Open `index.html`. Expected: Four L-shaped corner brackets draw themselves in on page load (top-left first, then clockwise stagger). Two thin horizontal lines extend from center outward at top and bottom. On mobile viewport (<768px), corners should be smaller and lines hidden.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add geometric corner frames with draw-in animation"
```

---

### Task 3: Page Load Entrance Sequence

**Files:**
- Create: `js/entrance.js`
- Modify: `index.html` (add `data-entrance` attributes to hero elements, add script tag)

- [ ] **Step 1: Create `js/entrance.js` with page load choreography and hero word stagger**

```js
// js/entrance.js
(function () {
  'use strict';

  // --- Page Load Sequence ---
  // Existing hero elements use CSS fadeInUp with delays.
  // We replace those with a JS-driven sequence for more control.

  // Add entrance classes after a brief delay to trigger CSS animations
  function runPageSequence() {
    const sequence = [
      { selector: '.site-header', delay: 300, cls: 'entrance-active' },
      { selector: '.hero-badge', delay: 600, cls: 'entrance-active' },
      { selector: '.hero h1', delay: 900, cls: 'entrance-active' },
      { selector: '.hero-tagline', delay: 1200, cls: 'entrance-active' },
      { selector: '.hero-description', delay: 1200, cls: 'entrance-active' },
      { selector: '.hero-buttons', delay: 1500, cls: 'entrance-active' },
    ];

    sequence.forEach(function (item) {
      setTimeout(function () {
        const el = document.querySelector(item.selector);
        if (el) el.classList.add(item.cls);
      }, item.delay);
    });

    // Stagger hero words
    const words = document.querySelectorAll('.hero h1 .word');
    words.forEach(function (word, i) {
      setTimeout(function () {
        word.classList.add('word-active');
      }, 900 + i * 80);
    });

    // Fade in particles at 2s
    setTimeout(function () {
      if (window.particleSystem) {
        window.particleSystem.fadeIn();
      }
    }, 2000);
  }

  // --- Scroll Reveals (enhanced) ---
  // The existing .reveal system uses IntersectionObserver.
  // We enhance it by also adding section-label slide-from-left
  // and stat count-up triggers.

  function initScrollReveals() {
    // Section labels slide from left
    var sectionLabels = document.querySelectorAll('.section-label, .case-study-badge');
    var labelObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('label-active');
            labelObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    sectionLabels.forEach(function (el) {
      el.classList.add('label-entrance');
      labelObserver.observe(el);
    });

    // Headlines fade up with enhanced timing
    var headlines = document.querySelectorAll('h2:not(.hero h1)');
    var headlineObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('headline-active');
            headlineObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    headlines.forEach(function (el) {
      el.classList.add('headline-entrance');
      headlineObserver.observe(el);
    });
  }

  // Run on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      runPageSequence();
      initScrollReveals();
    });
  } else {
    runPageSequence();
    initScrollReveals();
  }
})();
```

- [ ] **Step 2: Add entrance CSS to `index.html`**

Add these CSS rules inside the `<style>` block in `index.html`:

```css
/* ===== ENTRANCE ANIMATIONS ===== */

/* Hide elements initially, reveal via JS */
.site-header,
.hero-badge,
.hero h1,
.hero-tagline,
.hero-description,
.hero-buttons {
  opacity: 0 !important;
  animation: none !important;
}

.site-header.entrance-active {
  opacity: 1 !important;
  animation: entranceFadeDown 0.7s var(--transition-smooth) forwards !important;
}
.hero-badge.entrance-active {
  opacity: 1 !important;
  animation: entranceFadeUp 0.7s var(--transition-smooth) forwards !important;
}
.hero h1.entrance-active {
  opacity: 1 !important;
  animation: none !important;
}
.hero-tagline.entrance-active,
.hero-description.entrance-active {
  opacity: 1 !important;
  animation: entranceFadeUp 0.7s var(--transition-smooth) forwards !important;
}
.hero-buttons.entrance-active {
  opacity: 1 !important;
  animation: entranceFadeUp 0.7s var(--transition-smooth) forwards !important;
}

/* Word stagger */
.hero h1 .word {
  opacity: 0;
  display: inline-block;
  transition: opacity 0.5s var(--transition-smooth), transform 0.5s var(--transition-smooth);
  transform: translateY(20px);
}
.hero h1 .word.word-active {
  opacity: 1;
  transform: translateY(0);
}

/* Section label slide from left */
.label-entrance {
  opacity: 0;
  transform: translateX(-30px);
  transition: opacity 0.7s var(--transition-smooth), transform 0.7s var(--transition-smooth);
}
.label-entrance.label-active {
  opacity: 1;
  transform: translateX(0);
}

/* Headline fade up */
.headline-entrance {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.7s var(--transition-smooth), transform 0.7s var(--transition-smooth);
}
.headline-entrance.headline-active {
  opacity: 1;
  transform: translateY(0);
}

@keyframes entranceFadeUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes entranceFadeDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}

/* Mobile: faster timing */
@media (max-width: 768px) {
  .hero h1 .word { transition-duration: 0.4s; }
  .label-entrance { transition-duration: 0.5s; }
  .headline-entrance { transition-duration: 0.5s; }
}
```

Add the script tag before `</body>`:

```html
<script src="js/entrance.js"></script>
```

- [ ] **Step 3: Test in browser**

Open `index.html`. Expected: On page load, the hero section elements should appear in sequence (nav → badge → headline words one by one → tagline → buttons), starting with the corner frames already animating (from Task 2). Particles should fade in at ~2 seconds. The existing CSS `fadeInUp` animations on hero elements should no longer fire (overridden by `!important`). Scroll down and section labels should slide in from the left.

- [ ] **Step 4: Commit**

```bash
git add js/entrance.js index.html
git commit -m "feat: add choreographed page load entrance sequence"
```

---

### Task 4: Stat Count-Up Animation

**Files:**
- Create: `js/countup.js`
- Modify: `index.html` (add `data-count` attributes to stat numbers, add script tag, add CSS)

- [ ] **Step 1: Create `js/countup.js`**

```js
// js/countup.js
(function () {
  'use strict';

  function animateCountUp(el, target, suffix, duration) {
    var start = 0;
    var startTime = null;

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var elapsed = timestamp - startTime;
      var progress = Math.min(elapsed / duration, 1);
      var easedProgress = easeOutCubic(progress);
      var current = Math.round(easedProgress * target);
      el.textContent = current + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  function animateBounce(el) {
    el.style.opacity = '0';
    el.style.transform = 'scale(0.5)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
    requestAnimationFrame(function () {
      el.style.opacity = '1';
      el.style.transform = 'scale(1)';
    });
  }

  function initCountUp() {
    var stats = document.querySelectorAll('[data-count]');
    if (!stats.length) return;

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            var el = entry.target;
            var target = parseInt(el.getAttribute('data-count'), 10);
            var suffix = el.getAttribute('data-suffix') || '';
            var type = el.getAttribute('data-type') || 'count';

            if (type === 'bounce') {
              animateBounce(el);
            } else {
              animateCountUp(el, target, suffix, 1500);
            }
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.1 }
    );

    stats.forEach(function (el) {
      observer.observe(el);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCountUp);
  } else {
    initCountUp();
  }
})();
```

- [ ] **Step 2: Update stat number HTML in `index.html`**

Find the stats section (around lines 1892-1913) and update the `.stat-number` elements:

Change:
```html
<div class="stat-number">99%</div>
```
To:
```html
<div class="stat-number" data-count="99" data-suffix="%" data-type="count">0%</div>
```

Change:
```html
<div class="stat-number">24/7</div>
```
To:
```html
<div class="stat-number" data-count="24" data-suffix="/7" data-type="bounce">24/7</div>
```

Change:
```html
<div class="stat-number">10x</div>
```
To:
```html
<div class="stat-number" data-count="10" data-suffix="x" data-type="count">0x</div>
```

Change:
```html
<div class="stat-number">100+</div>
```
To:
```html
<div class="stat-number" data-count="100" data-suffix="+" data-type="count">0+</div>
```

- [ ] **Step 3: Add script tag to `index.html`**

Before `</body>`:
```html
<script src="js/countup.js"></script>
```

- [ ] **Step 4: Test in browser**

Scroll down to the stats section. Expected: When the stats come into view, numbers should count up from 0 (99 counts to 99%, 10 counts to 10x, 100 counts to 100+). The "24/7" stat should bounce in with a scale animation. Console should show no errors.

- [ ] **Step 5: Commit**

```bash
git add js/countup.js index.html
git commit -m "feat: add stat count-up animation with IntersectionObserver"
```

---

### Task 5: Magnetic Button Effect

**Files:**
- Create: `js/magnetic.js`
- Modify: `index.html` (add script tag, add `data-magnetic` attributes to CTA buttons)

- [ ] **Step 1: Create `js/magnetic.js`**

```js
// js/magnetic.js
(function () {
  'use strict';

  if (window.matchMedia('(hover: none)').matches) return;

  var buttons = document.querySelectorAll('[data-magnetic]');
  var MAX_SHIFT = 4;
  var LERP = 0.15;

  buttons.forEach(function (btn) {
    var currentX = 0;
    var currentY = 0;
    var targetX = 0;
    var targetY = 0;
    var rafId = null;

    btn.addEventListener('mousemove', function (e) {
      var rect = btn.getBoundingClientRect();
      var centerX = rect.left + rect.width / 2;
      var centerY = rect.top + rect.height / 2;
      var distX = e.clientX - centerX;
      var distY = e.clientY - centerY;
      var dist = Math.sqrt(distX * distX + distY * distY);
      var radius = 80;

      if (dist < radius) {
        var strength = 1 - dist / radius;
        targetX = (distX / radius) * MAX_SHIFT * strength;
        targetY = (distY / radius) * MAX_SHIFT * strength;
      } else {
        targetX = 0;
        targetY = 0;
      }

      if (!rafId) {
        rafId = requestAnimationFrame(animate);
      }
    });

    btn.addEventListener('mouseleave', function () {
      targetX = 0;
      targetY = 0;
      if (!rafId) {
        rafId = requestAnimationFrame(animate);
      }
    });

    function animate() {
      currentX += (targetX - currentX) * LERP;
      currentY += (targetY - currentY) * LERP;

      if (Math.abs(currentX) < 0.01 && Math.abs(currentY) < 0.01) {
        currentX = 0;
        currentY = 0;
        btn.style.transform = '';
        rafId = null;
        return;
      }

      btn.style.transform = 'translate(' + currentX.toFixed(2) + 'px, ' + currentY.toFixed(2) + 'px)';
      rafId = requestAnimationFrame(animate);
    }
  });
})();
```

- [ ] **Step 2: Add `data-magnetic` to CTA buttons in `index.html`**

Find the hero buttons (around lines 1691-1701) and the CTA section button. Add `data-magnetic` attribute:

Change:
```html
<a href="#" class="btn btn-primary" data-cta-open>
```
To:
```html
<a href="#" class="btn btn-primary" data-cta-open data-magnetic>
```

Change:
```html
<a href="#what-we-do" class="btn btn-secondary">
```
To:
```html
<a href="#what-we-do" class="btn btn-secondary" data-magnetic>
```

Find the CTA section button (search for `btn btn-primary` in the CTA section near the bottom of the page) and add `data-magnetic` to it as well.

- [ ] **Step 3: Add script tag to `index.html`**

Before `</body>`:
```html
<script src="js/magnetic.js"></script>
```

- [ ] **Step 4: Test in browser**

Hover over the CTA buttons. Expected: Buttons should subtly shift toward the cursor when within ~80px, up to 4px maximum. The movement should be smooth (lerped). When the cursor leaves, the button should smoothly return to center. On mobile/touch devices, no effect should occur. No console errors.

- [ ] **Step 5: Commit**

```bash
git add js/magnetic.js index.html
git commit -m "feat: add magnetic button pull effect on CTA buttons"
```

---

### Task 6: Enhanced Hover Micro-Interactions

**Files:**
- Modify: `index.html` (CSS additions for card glow pulse, nav underline slide, social icon pulse)

- [ ] **Step 1: Add hover micro-interaction CSS to `index.html`**

Add these CSS rules inside the `<style>` block:

```css
/* ===== ENHANCED HOVER INTERACTIONS ===== */

/* Feature card glow pulse on hover */
.feature-card:hover {
  transform: translateY(-4px) scale(1.02);
}
.feature-card:hover .feature-glow {
  animation: glowPulse 3s ease-in-out infinite;
}
@keyframes glowPulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}

/* Nav link underline slide from left */
.nav-links a span::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: linear-gradient(90deg, var(--accent), var(--accent-cyan));
  transition: width 0.3s var(--transition-smooth);
}
.nav-links a span:hover::after {
  width: 100%;
}

/* Social icon pulse on hover */
.social-links a:hover {
  animation: iconPulse 0.4s ease;
}
@keyframes iconPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}
```

- [ ] **Step 2: Test in browser**

- Hover over feature cards: should lift up 4px, scale to 1.02, and the top glow line should pulse.
- Hover over nav links (Home, About): an underline should slide in from the left.
- Hover over social icons in footer: should pulse scale 1→1.2→1 once.
- No console errors.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add enhanced hover micro-interactions for cards, nav, and social icons"
```

---

### Task 7: Hero Headline Shimmer Effect

**Files:**
- Modify: `index.html` (CSS for gradient shimmer on hero words)

- [ ] **Step 1: Add shimmer CSS to `index.html`**

Add this CSS inside the `<style>` block, near the existing `.hero h1 .word` styles:

```css
/* Hero headline shimmer sweep */
.hero h1 .word-active {
  background-size: 200% 200%;
  animation: gradientText 6s ease infinite, shimmerSweep 6s ease infinite;
}
@keyframes shimmerSweep {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
```

Note: The existing `gradientText` keyframe animation is already defined in the CSS (it animates the gradient text). The `shimmerSweep` adds a position-based shimmer that sweeps across the text, complementing the color shift.

- [ ] **Step 2: Test in browser**

Reload the page. After the hero headline words stagger in, the gradient text should have a shimmering sweep effect that repeats every 6 seconds. The shimmer should be a diagonal highlight sweep across the words.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add shimmer sweep effect to hero headline gradient text"
```

---

### Task 8: Apply Changes to About Page + Final Integration

**Files:**
- Modify: `about.html` (add canvas, corner frames, entrance CSS/JS, particle script, entrance script)

- [ ] **Step 1: Add canvas element, corner frames, and CSS to `about.html`**

Mirror the same structural additions from `index.html` into `about.html`:

1. Add `<canvas id="particle-canvas"></canvas>` inside the bg-container div, after the noise div
2. Add the corner frame SVGs after the canvas element
3. Add the corner line divs after the SVGs
4. Add all new CSS rules to the `<style>` block (particle canvas, corner frames, entrance animations, hover interactions, shimmer)
5. Add the script tags before `</body>`:
```html
<script src="js/particles.js"></script>
<script src="js/entrance.js"></script>
<script src="js/magnetic.js"></script>
<script src="js/countup.js"></script>
```

Note: `about.html` doesn't have hero headline words or stat numbers, so the word stagger and count-up effects won't fire there, but the scripts are safe to include (they check for element existence before running).

- [ ] **Step 2: Verify layer stack z-indexing in both files**

Check that the z-index order is correct in both HTML files:
- `.bg-container`: z-index 0 (existing)
- `#particle-canvas`: z-index 1 (new)
- `.grid-pattern` and `.noise`: these are inside bg-container and stack by DOM order, which puts them above the canvas. This is correct per the spec (canvas between mesh-gradient and grid-pattern). However, since canvas is also inside bg-container, we need the canvas z-index to place it above mesh-gradient but the grid/noise will render on top via DOM order. Verify visually that particles appear behind the grid pattern.

If particles appear on top of the grid, adjust by moving the canvas element before the mesh-gradient div or adding explicit z-indices to the bg-container children:
```css
.mesh-gradient { position: relative; z-index: 0; }
#particle-canvas { z-index: 1; }
.grid-pattern { position: relative; z-index: 2; }
.noise { position: relative; z-index: 3; }
```

- [ ] **Step 3: Test both pages thoroughly in browser**

**index.html:**
- Particles float, cursor glow follows mouse, connection lines appear near cursor
- Corner frames draw in on load
- Hero elements appear in staggered sequence
- Headline words stagger in one by one
- Section labels slide in from left on scroll
- Stat numbers count up when scrolled into view
- CTA buttons have magnetic pull effect
- Feature cards have glow pulse on hover
- Nav links have underline slide
- Social icons pulse on hover

**about.html:**
- Same particle field and corner frames
- Entrance animations work (nav, headings fade in)
- No console errors
- No missing elements or broken layout

**Mobile (<768px viewport):**
- Reduced particles (~20), no connection lines, no cursor glow
- Smaller corner frames, no horizontal lines
- No magnetic button effect
- Faster entrance animations (0.5s vs 0.7s)

- [ ] **Step 4: Commit**

```bash
git add about.html index.html
git commit -m "feat: apply interactive elements to about page and finalize integration"
```

---

### Task 9: Performance and Accessibility Polish

**Files:**
- Modify: `js/particles.js`, `index.html`, `about.html`

- [ ] **Step 1: Add `prefers-reduced-motion` support to CSS**

Add this media query at the end of the `<style>` block in both HTML files:

```css
/* ===== REDUCED MOTION ===== */
@media (prefers-reduced-motion: reduce) {
  .corner-frame line { animation: none; stroke-dashoffset: 0; }
  .corner-line { animation: none; transform: scaleX(1); }
  .site-header, .hero-badge, .hero h1, .hero-tagline, .hero-description, .hero-buttons {
    opacity: 1 !important;
    animation: none !important;
    transform: none !important;
  }
  .hero h1 .word { opacity: 1; transform: none; transition: none; }
  .label-entrance, .headline-entrance { opacity: 1; transform: none; transition: none; }
}
```

- [ ] **Step 2: Add reduced motion check to `js/particles.js`**

Add at the beginning of the IIFE in `js/particles.js`, after the `'use strict'` line:

```js
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  // Respect reduced motion preference — don't animate particles
  return;
}
```

- [ ] **Step 3: Add `aria-hidden="true"` to decorative elements**

In both HTML files, update the canvas and corner frames:

Change:
```html
<canvas id="particle-canvas"></canvas>
```
To:
```html
<canvas id="particle-canvas" aria-hidden="true"></canvas>
```

Add `aria-hidden="true"` to each corner frame SVG and corner line div.

- [ ] **Step 4: Test with reduced motion**

Open browser DevTools, emulate `prefers-reduced-motion: reduce` in rendering settings. Reload the page. Expected: No corner frame animations, no particle canvas, hero elements visible immediately with no animation, entrance CSS disabled.

- [ ] **Step 5: Final commit**

```bash
git add js/particles.js index.html about.html
git commit -m "feat: add prefers-reduced-motion support and accessibility attributes"
```