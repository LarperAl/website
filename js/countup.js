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