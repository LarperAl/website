(function () {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  var isMobile = window.innerWidth < 768;
  var PARTICLE_COUNT = isMobile ? 20 : 60;
  var CONNECTION_DISTANCE = 120;
  var COLORS = ['#a78bfa', '#22d3ee', '#f472b6', '#60a5fa'];

  var canvas = document.getElementById('particle-canvas');

  var ctx = canvas.getContext('2d');
  var width, height;
  var particles = [];
  var mouseX = -9999, mouseY = -9999;
  var smoothMouseX = -9999, smoothMouseY = -9999;
  var glowRadius = 200;
  var targetGlowRadius = 200;
  var clickPulseTimer = 0;
  var animationId = null;
  var isVisible = true;
  var globalOpacity = 0;
  var fadeRequested = false;

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * width,
      y: Math.random() * height,
      size: 1 + Math.random() * 2,
      opacity: 0.2 + Math.random() * 0.4,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      color: COLORS[Math.floor(Math.random() * COLORS.length)]
    };
  }

  function initParticles() {
    particles = [];
    for (var i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(createParticle());
    }
  }

  function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : { r: 167, g: 139, b: 250 };
  }

  function updateParticle(p) {
    p.x += p.vx;
    p.y += p.vy;

    if (p.x < 0) p.x = width;
    if (p.x > width) p.x = 0;
    if (p.y < 0) p.y = height;
    if (p.y > height) p.y = 0;
  }

  function drawParticle(p) {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.globalAlpha = p.opacity * globalOpacity;
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  function drawCursorGlow() {
    if (isMobile) return;

    var t = smoothMouseX / width;
    t = Math.max(0, Math.min(1, t));

    var violet = { r: 167, g: 139, b: 250 };
    var cyan = { r: 34, g: 211, b: 238 };

    var r = Math.round(violet.r + (cyan.r - violet.r) * t);
    var g = Math.round(violet.g + (cyan.g - violet.g) * t);
    var b = Math.round(violet.b + (cyan.b - violet.b) * t);

    var gradient = ctx.createRadialGradient(
      smoothMouseX, smoothMouseY, 0,
      smoothMouseX, smoothMouseY, glowRadius
    );
    gradient.addColorStop(0, 'rgba(' + r + ',' + g + ',' + b + ',0.15)');
    gradient.addColorStop(1, 'rgba(' + r + ',' + g + ',' + b + ',0)');

    ctx.beginPath();
    ctx.arc(smoothMouseX, smoothMouseY, glowRadius, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.globalAlpha = globalOpacity;
    ctx.fill();
    ctx.globalAlpha = 1;
  }

  function drawConnectionLines() {
    if (isMobile) return;

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      var dx = p.x - smoothMouseX;
      var dy = p.y - smoothMouseY;
      var dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < CONNECTION_DISTANCE) {
        var lineOpacity = (1 - dist / CONNECTION_DISTANCE) * 0.15 * globalOpacity;
        ctx.beginPath();
        ctx.moveTo(smoothMouseX, smoothMouseY);
        ctx.lineTo(p.x, p.y);
        ctx.strokeStyle = 'rgba(167,139,250,' + lineOpacity + ')';
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }

  function animate() {
    if (!isVisible) return;

    ctx.clearRect(0, 0, width, height);

    // Smooth mouse with 0.1s easing lag (approx 10% per frame at 60fps)
    smoothMouseX += (mouseX - smoothMouseX) * 0.1;
    smoothMouseY += (mouseY - smoothMouseY) * 0.1;

    // Handle click pulse
    if (clickPulseTimer > 0) {
      clickPulseTimer -= 16;
      if (clickPulseTimer <= 0) {
        targetGlowRadius = 200;
        clickPulseTimer = 0;
      }
    }
    glowRadius += (targetGlowRadius - glowRadius) * 0.15;

    for (var i = 0; i < particles.length; i++) {
      updateParticle(particles[i]);
      drawParticle(particles[i]);
    }

    drawConnectionLines();
    drawCursorGlow();

    animationId = requestAnimationFrame(animate);
  }

  function onMouseMove(e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
    if (smoothMouseX < -9000) {
      smoothMouseX = mouseX;
      smoothMouseY = mouseY;
    }
  }

  function onMouseDown() {
    if (isMobile) return;
    targetGlowRadius = 280;
    clickPulseTimer = 300;
  }

  function onMouseUp() {
    if (isMobile) return;
    targetGlowRadius = 200;
  }

  function onVisibilityChange() {
    isVisible = !document.hidden;
    if (isVisible) {
      animationId = requestAnimationFrame(animate);
    } else if (animationId) {
      cancelAnimationFrame(animationId);
      animationId = null;
    }
  }

  function onResize() {
    isMobile = window.innerWidth < 768;
    resize();
  }

  // Fade-in support
  window.particleSystem = {
    fadeIn: function () {
      fadeRequested = true;
      var startTime = performance.now();
      function tick(now) {
        var elapsed = now - startTime;
        globalOpacity = Math.min(1, elapsed / 1500);
        if (globalOpacity < 1) {
          requestAnimationFrame(tick);
        }
      }
      requestAnimationFrame(tick);
    }
  };

  // Init
  resize();
  initParticles();

  window.addEventListener('resize', onResize);
  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mousedown', onMouseDown);
  document.addEventListener('mouseup', onMouseUp);
  document.addEventListener('visibilitychange', onVisibilityChange);

  // Start animation; particles start invisible until fadeIn() is called
  animate();
})();