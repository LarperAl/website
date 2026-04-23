// js/midnight-lab.js - Midnight Lab Interaction Behaviors
(function () {
  'use strict';

  // Check for reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- Configuration ---
  const CONFIG = {
    easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
    pageLoad: {
      cornerDuration: 600,
      navDelay: 200,
      contentBaseDelay: 400,
      contentStagger: 100,
    },
    scrollReveal: {
      threshold: 0.2,
      duration: 600,
      stagger: 100,
      offsetY: 30,
    },
    navScroll: {
      threshold: 50,
    },
    cornerPulse: {
      scale: 1.02,
      duration: 400,
    },
  };

  // --- Utility Functions ---

  /**
   * Apply CSS transition with proper easing
   */
  function setTransition(element, properties, duration) {
    const transition = properties
      .map(prop => `${prop} ${duration}ms ${CONFIG.easing}`)
      .join(', ');
    element.style.transition = transition;
  }

  /**
   * Animate an element with opacity and transform
   */
  function animateIn(element, delay, offsetY = 0) {
    if (prefersReducedMotion) {
      element.style.opacity = '1';
      element.style.transform = 'none';
      return;
    }

    // Initial state
    element.style.opacity = '0';
    if (offsetY) {
      element.style.transform = `translateY(${offsetY}px)`;
    }

    setTransition(element, ['opacity', 'transform'], CONFIG.pageLoad.contentBaseDelay);

    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, delay);
  }

  // --- Page Load Sequence ---

  function runPageLoadSequence() {
    const cornerFrames = document.querySelectorAll('.corner-frame');
    const nav = document.querySelector('.nav');
    const cornerLines = document.querySelectorAll('.corner-line');

    // Corner frames fade in first (0ms delay, 600ms duration)
    cornerFrames.forEach((frame) => {
      frame.style.opacity = '0';
      setTransition(frame, ['opacity'], CONFIG.pageLoad.cornerDuration);
      requestAnimationFrame(() => {
        frame.style.opacity = '1';
      });
    });

    // Corner lines extend animation
    if (!prefersReducedMotion) {
      cornerLines.forEach((line) => {
        line.style.transform = 'scaleX(0)';
        setTransition(line, ['transform'], 1000);
        setTimeout(() => {
          line.style.transform = 'scaleX(1)';
        }, 800);
      });
    }

    // Navigation fades in (200ms delay)
    if (nav) {
      nav.style.opacity = '0';
      setTransition(nav, ['opacity'], CONFIG.pageLoad.cornerDuration);
      setTimeout(() => {
        nav.style.opacity = '1';
      }, CONFIG.pageLoad.navDelay);
    }

    // Content staggers in from below (400ms base, 100ms stagger)
    const contentSelectors = [
      { selector: '.hero', offsetY: 30 },
      { selector: '.section-header', offsetY: 30 },
      { selector: '.feature-grid', offsetY: 30 },
      { selector: '.card', offsetY: 30 },
    ];

    let currentDelay = CONFIG.pageLoad.contentBaseDelay;

    contentSelectors.forEach((item) => {
      const elements = document.querySelectorAll(item.selector);
      elements.forEach((el) => {
        animateIn(el, currentDelay, item.offsetY);
        currentDelay += CONFIG.pageLoad.contentStagger;
      });
    });
  }

  // --- Scroll Reveal ---

  function initScrollReveal() {
    if (prefersReducedMotion) {
      // Just make elements visible, no animations
      document.querySelectorAll('.reveal').forEach((el) => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    const revealElements = document.querySelectorAll('.reveal, [data-reveal]');

    if (!revealElements.length) return;

    const observerOptions = {
      threshold: CONFIG.scrollReveal.threshold,
      rootMargin: '0px 0px -50px 0px',
    };

    let staggerQueue = [];
    let isProcessingQueue = false;

    function processQueue() {
      if (isProcessingQueue || staggerQueue.length === 0) return;
      isProcessingQueue = true;

      const { element, siblings } = staggerQueue.shift();

      // Apply reveal to the element
      element.style.opacity = '0';
      element.style.transform = `translateY(${CONFIG.scrollReveal.offsetY}px)`;
      setTransition(element, ['opacity', 'transform'], CONFIG.scrollReveal.duration);

      requestAnimationFrame(() => {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      });

      // Stagger siblings
      if (siblings && siblings.length > 0) {
        siblings.forEach((sibling, index) => {
          if (sibling === element) return;
          setTimeout(() => {
            sibling.style.opacity = '0';
            sibling.style.transform = `translateY(${CONFIG.scrollReveal.offsetY}px)`;
            setTransition(sibling, ['opacity', 'transform'], CONFIG.scrollReveal.duration);

            requestAnimationFrame(() => {
              sibling.style.opacity = '1';
              sibling.style.transform = 'translateY(0)';
            });
          }, (index + 1) * CONFIG.scrollReveal.stagger);
        });
      }

      setTimeout(() => {
        isProcessingQueue = false;
        processQueue();
      }, CONFIG.scrollReveal.stagger);
    }

    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target;

          // Find siblings for staggering
          const parent = element.parentElement;
          const siblings = parent ? Array.from(parent.children).filter(
            (child) => child.matches('.reveal, [data-reveal]')
          ) : [];

          staggerQueue.push({ element, siblings });
          processQueue();

          revealObserver.unobserve(element);
        }
      });
    }, observerOptions);

    // Set initial state for all reveal elements
    revealElements.forEach((el) => {
      el.style.opacity = '0';
      if (!prefersReducedMotion) {
        el.style.transform = `translateY(${CONFIG.scrollReveal.offsetY}px)`;
      }
      revealObserver.observe(el);
    });
  }

  // --- Navigation Scroll State ---

  function initNavScrollState() {
    const nav = document.querySelector('.nav');
    if (!nav) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    function updateNavState() {
      const scrollY = window.scrollY;

      if (scrollY > CONFIG.navScroll.threshold) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }

      lastScrollY = scrollY;
      ticking = false;
    }

    window.addEventListener(
      'scroll',
      () => {
        lastScrollY = window.scrollY;
        if (!ticking) {
          window.requestAnimationFrame(updateNavState);
          ticking = true;
        }
      },
      { passive: true }
    );

    // Initial check
    updateNavState();
  }

  // --- Corner Frame Pulse ---

  function initCornerFramePulse() {
    if (prefersReducedMotion) return;

    const cornerFrames = document.querySelectorAll('.corner-frame');
    if (!cornerFrames.length) return;

    let isPulsing = false;

    function pulse() {
      if (isPulsing) return;
      isPulsing = true;

      cornerFrames.forEach((frame) => {
        frame.style.transition = `transform ${CONFIG.cornerPulse.duration}ms ${CONFIG.easing}`;
        frame.style.transform = `scale(${CONFIG.cornerPulse.scale})`;
      });

      setTimeout(() => {
        cornerFrames.forEach((frame) => {
          frame.style.transform = 'scale(1)';
        });
        isPulsing = false;
      }, CONFIG.cornerPulse.duration);
    }

    // Use IntersectionObserver to only pulse when visible
    const visibilityObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            window.addEventListener('scroll', pulse, { passive: true });
          } else {
            window.removeEventListener('scroll', pulse);
          }
        });
      },
      { threshold: 0 }
    );

    cornerFrames.forEach((frame) => visibilityObserver.observe(frame));
  }

  // --- Mobile Menu Toggle ---

  function initMobileMenuToggle() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMobile = document.querySelector('.nav-mobile');

    if (!navToggle || !navMobile) return;

    function toggleMenu() {
      const isOpen = navMobile.classList.contains('open');

      if (isOpen) {
        navMobile.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      } else {
        navMobile.classList.add('open');
        navToggle.setAttribute('aria-expanded', 'true');
      }
    }

    navToggle.addEventListener('click', toggleMenu);

    // Close menu when clicking a link
    const navLinks = navMobile.querySelectorAll('a');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMobile.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });

    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navMobile.classList.contains('open')) {
        navMobile.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --- Initialization ---

  function init() {
    // Run page load sequence
    runPageLoadSequence();

    // Initialize scroll reveal
    initScrollReveal();

    // Initialize navigation scroll state
    initNavScrollState();

    // Initialize corner frame pulse
    initCornerFramePulse();

    // Initialize mobile menu toggle
    initMobileMenuToggle();
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
