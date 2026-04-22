// js/hero-viz.js — Interactive constellation visualization for the hero area
(function () {
  'use strict';

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var canvas = document.getElementById('particle-canvas');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');

  var isMobile = window.innerWidth < 768;
  var width, height;
  var nodes = [];
  var mouseX = -9999, mouseY = -9999;
  var smoothMouseX = -9999, smoothMouseY = -9999;
  var globalOpacity = 0;
  var isVisible = true;
  var time = 0;

  // Configuration
  var NODE_COUNT = isMobile ? 40 : 80;
  var CONNECTION_DIST = isMobile ? 100 : 150;
  var MOUSE_RADIUS = isMobile ? 0 : 200;
  var MOUSE_FORCE = isMobile ? 0 : 0.8;
  var COLORS = ['#a78bfa', '#22d3ee', '#f472b6', '#60a5fa', '#34d399'];

  // Node class
  function Node() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.baseRadius = Math.random() * 2 + 1;
    this.radius = this.baseRadius;
    this.color = COLORS[Math.floor(Math.random() * COLORS.length)];
    this.opacity = Math.random() * 0.4 + 0.2;
    this.pulseOffset = Math.random() * Math.PI * 2;
  }

  Node.prototype.update = function () {
    // Mouse interaction
    if (MOUSE_RADIUS > 0) {
      var dx = this.x - smoothMouseX;
      var dy = this.y - smoothMouseY;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MOUSE_RADIUS && dist > 0) {
        // Gentle attraction toward cursor, then push away when very close
        var force;
        if (dist < MOUSE_RADIUS * 0.3) {
          force = -MOUSE_FORCE * 0.5; // push away when too close
        } else {
          force = MOUSE_FORCE * 0.3 * (1 - dist / MOUSE_RADIUS); // attract from further away
        }
        this.vx += (dx / dist) * force;
        this.vy += (dy / dist) * force;
      }
    }

    // Gentle floating drift
    this.vx += Math.sin(time * 0.001 + this.pulseOffset) * 0.002;
    this.vy += Math.cos(time * 0.0013 + this.pulseOffset) * 0.002;

    // Damping
    this.vx *= 0.99;
    this.vy *= 0.99;

    this.x += this.vx;
    this.y += this.vy;

    // Wrap around edges
    if (this.x < -50) this.x = width + 50;
    if (this.x > width + 50) this.x = -50;
    if (this.y < -50) this.y = height + 50;
    if (this.y > height + 50) this.y = -50;

    // Pulse radius
    this.radius = this.baseRadius + Math.sin(time * 0.003 + this.pulseOffset) * 0.5;

    // Grow near cursor
    if (MOUSE_RADIUS > 0) {
      var dx2 = this.x - smoothMouseX;
      var dy2 = this.y - smoothMouseY;
      var dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
      if (dist2 < MOUSE_RADIUS) {
        this.radius += (1 - dist2 / MOUSE_RADIUS) * 3;
      }
    }
  };

  function init() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    nodes = [];
    for (var i = 0; i < NODE_COUNT; i++) {
      nodes.push(new Node());
    }
  }

  function drawConnections() {
    for (var i = 0; i < nodes.length; i++) {
      for (var j = i + 1; j < nodes.length; j++) {
        var dx = nodes[i].x - nodes[j].x;
        var dy = nodes[i].y - nodes[j].y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < CONNECTION_DIST) {
          var alpha = (1 - dist / CONNECTION_DIST) * 0.15 * globalOpacity;

          // Brighter connections near cursor
          if (MOUSE_RADIUS > 0) {
            var midX = (nodes[i].x + nodes[j].x) / 2;
            var midY = (nodes[i].y + nodes[j].y) / 2;
            var mouseDist = Math.sqrt(
              Math.pow(midX - smoothMouseX, 2) + Math.pow(midY - smoothMouseY, 2)
            );
            if (mouseDist < MOUSE_RADIUS) {
              alpha += (1 - mouseDist / MOUSE_RADIUS) * 0.2 * globalOpacity;
            }
          }

          ctx.strokeStyle = nodes[i].color;
          ctx.globalAlpha = alpha;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function drawMouseConnections() {
    if (MOUSE_RADIUS === 0 || smoothMouseX < -1000) return;

    for (var i = 0; i < nodes.length; i++) {
      var dx = nodes[i].x - smoothMouseX;
      var dy = nodes[i].y - smoothMouseY;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MOUSE_RADIUS * 1.5) {
        var alpha = (1 - dist / (MOUSE_RADIUS * 1.5)) * 0.25 * globalOpacity;
        ctx.strokeStyle = nodes[i].color;
        ctx.globalAlpha = alpha;
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(smoothMouseX, smoothMouseY);
        ctx.stroke();
      }
    }
  }

  function drawCursorGlow() {
    if (MOUSE_RADIUS === 0 || smoothMouseX < -1000) return;

    // Outer glow
    var outerGrad = ctx.createRadialGradient(
      smoothMouseX, smoothMouseY, 0,
      smoothMouseX, smoothMouseY, MOUSE_RADIUS * 1.5
    );
    outerGrad.addColorStop(0, 'rgba(167, 139, 250, 0.08)');
    outerGrad.addColorStop(0.4, 'rgba(34, 211, 238, 0.04)');
    outerGrad.addColorStop(1, 'rgba(167, 139, 250, 0)');
    ctx.globalAlpha = globalOpacity;
    ctx.fillStyle = outerGrad;
    ctx.beginPath();
    ctx.arc(smoothMouseX, smoothMouseY, MOUSE_RADIUS * 1.5, 0, Math.PI * 2);
    ctx.fill();

    // Inner bright core
    var innerGrad = ctx.createRadialGradient(
      smoothMouseX, smoothMouseY, 0,
      smoothMouseX, smoothMouseY, 30
    );
    innerGrad.addColorStop(0, 'rgba(255, 255, 255, 0.15)');
    innerGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.globalAlpha = globalOpacity;
    ctx.fillStyle = innerGrad;
    ctx.beginPath();
    ctx.arc(smoothMouseX, smoothMouseY, 30, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawNodes() {
    for (var i = 0; i < nodes.length; i++) {
      var n = nodes[i];

      // Node glow
      var glowSize = n.radius * 4;
      var glow = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, glowSize);
      glow.addColorStop(0, n.color);
      glow.addColorStop(1, n.color.slice(0, 7) + '00');
      ctx.globalAlpha = n.opacity * 0.2 * globalOpacity;
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(n.x, n.y, glowSize, 0, Math.PI * 2);
      ctx.fill();

      // Node core
      ctx.globalAlpha = n.opacity * globalOpacity;
      ctx.fillStyle = n.color;
      ctx.beginPath();
      ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function animate() {
    if (!isVisible) {
      requestAnimationFrame(animate);
      return;
    }

    time++;
    ctx.clearRect(0, 0, width, height);

    // Smooth cursor
    smoothMouseX += (mouseX - smoothMouseX) * 0.08;
    smoothMouseY += (mouseY - smoothMouseY) * 0.08;

    // Update nodes
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].update();
    }

    // Draw layers
    drawCursorGlow();
    drawConnections();
    drawMouseConnections();
    drawNodes();

    ctx.globalAlpha = 1;
    requestAnimationFrame(animate);
  }

  // Events
  window.addEventListener('resize', function () {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    // Re-scatter nodes that are out of bounds
    for (var i = 0; i < nodes.length; i++) {
      if (nodes[i].x > width || nodes[i].y > height) {
        nodes[i].x = Math.random() * width;
        nodes[i].y = Math.random() * height;
      }
    }
  });

  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  document.addEventListener('mouseleave', function () {
    mouseX = -9999;
    mouseY = -9999;
  });

  document.addEventListener('visibilitychange', function () {
    isVisible = !document.hidden;
  });

  // Public API for entrance animation
  window.particleSystem = {
    fadeIn: function () {
      var start = performance.now();
      var duration = 1500;
      function tick(now) {
        var elapsed = now - start;
        globalOpacity = Math.min(elapsed / duration, 1);
        if (elapsed < duration) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    }
  };

  init();
  animate();
})();