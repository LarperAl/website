// js/entrance.js
(function () {
  'use strict';

  // --- Page Load Sequence ---
  // We replace existing CSS fadeInUp animations with a JS-driven sequence.

  function runPageSequence() {
    var sequence = [
      { selector: '.site-header', delay: 300, cls: 'entrance-active' },
      { selector: '.hero-badge', delay: 600, cls: 'entrance-active' },
      { selector: '.hero h1', delay: 900, cls: 'entrance-active' },
      { selector: '.hero-tagline', delay: 1200, cls: 'entrance-active' },
      { selector: '.hero-description', delay: 1200, cls: 'entrance-active' },
      { selector: '.hero-buttons', delay: 1500, cls: 'entrance-active' },
    ];

    sequence.forEach(function (item) {
      setTimeout(function () {
        var el = document.querySelector(item.selector);
        if (el) el.classList.add(item.cls);
      }, item.delay);
    });

    // Stagger hero words
    var words = document.querySelectorAll('.hero h1 .word');
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