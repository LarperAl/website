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