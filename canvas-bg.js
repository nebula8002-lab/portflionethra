/**
 * FULL-VIEWPORT CINEMATIC AI/ML ANIMATED BACKGROUND ENGINE
 * Nethra Shree SD Portfolio Website
 * 
 * Architectural Features:
 * 1. Deep Midnight-Navy Base with Atmospheric Ambient Glow Orbs (Violet, Cyan, Electric Blue, Indigo)
 * 2. Multi-Depth 3D Particle Fields:
 *    - Deep Cosmic Star Dust (Depth Z: 0.1 - 0.35) with sinusoidal twinkle & 3D parallax
 *    - Midground Floating AI Glow Nodes (Depth Z: 0.4 - 0.8) with soft luminous aura
 *    - Foreground Interactive Neural Network (Synapse Nodes & Dynamic Gradient Connecting Lines)
 *    - Active Synaptic Data Pulses traversing between connected nodes (Neural Inference Simulation)
 *    - Subtle Floating AI Geometric Accents (Faint holographic wireframe hexagons & telemetry crosshairs)
 * 3. Faint Futuristic Perspective Cyber-Grid at Horizon with 3D vanishing-point tilt
 * 4. Silky-Smooth Mouse-Responsive Parallax with Exponential Damping (Desktop)
 * 5. Retina / High-DPI (DevicePixelRatio) Pin-Sharp Rendering
 * 6. Full Mobile & Touch Optimization with adaptive density & reduced power consumption
 * 7. Battery & Tab Lifecycle Management (Pauses 100% when document.hidden)
 * 8. Strict Accessibility: Respects prefers-reduced-motion with an elegant, static constellation
 */

(function () {
  'use strict';

  const canvas = document.getElementById('globalNeuralCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Viewport Dimensions & DPI
  let width = window.innerWidth;
  let height = window.innerHeight;
  let dpr = Math.min(window.devicePixelRatio || 1, 2);

  // Smooth Mouse Tracking State
  const mouse = {
    x: width * 0.5,
    y: height * 0.35,
    targetX: width * 0.5,
    targetY: height * 0.35,
    normX: 0, // -1 to 1 normalized
    normY: 0,
    isActive: false,
    hoveredOnce: false
  };

  // Tab & Loop State
  let isVisible = true;
  let animId = null;

  // Multi-Depth Entity Collections
  let deepParticles = [];
  let midParticles = [];
  let neuralNodes = [];
  let signalPulses = [];
  let geometricAccents = [];

  // Device-Specific Density & Distance Configuration
  function getResponsiveConfig() {
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth < 1024 && !isMobile;

    return {
      isMobile,
      isTablet,
      deepCount: isMobile ? 24 : isTablet ? 45 : 68,
      midCount: isMobile ? 16 : isTablet ? 28 : 42,
      nodeCount: isMobile ? 24 : isTablet ? 38 : 56,
      connectionDist: isMobile ? 95 : isTablet ? 120 : 142,
      maxConnections: isMobile ? 3 : 4,
      mouseRadius: isMobile ? 0 : 165,
      accentCount: isMobile ? 2 : 4
    };
  }

  let config = getResponsiveConfig();

  // Resize & Retina Canvas Calibration
  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    config = getResponsiveConfig();
    initEntities();

    if (prefersReducedMotion) {
      renderStaticConstellation();
    }
  }

  // =========================================================================
  // Layer 1: Deep Cosmic Star Dust (Depth Z: 0.1 - 0.35)
  // =========================================================================
  class DeepDustParticle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 10;
      this.baseX = this.x;
      this.baseY = this.y;
      this.z = Math.random() * 0.25 + 0.1; // Deep distance
      this.radius = Math.random() * 1.1 + 0.5;
      this.vy = -(Math.random() * 0.22 + 0.08);
      this.vx = (Math.random() - 0.5) * 0.12;
      this.baseAlpha = Math.random() * 0.32 + 0.12;
      this.alpha = this.baseAlpha;
      this.pulseSpeed = Math.random() * 0.02 + 0.01;
      this.pulsePhase = Math.random() * Math.PI * 2;
      this.isViolet = Math.random() > 0.45;
    }

    update(parallaxX, parallaxY) {
      this.baseY += this.vy;
      this.baseX += this.vx;

      if (this.baseY < -15) this.reset(false);
      if (this.baseX < -15) this.baseX = width + 15;
      if (this.baseX > width + 15) this.baseX = -15;

      // Depth-scaled parallax translation
      this.x = this.baseX + parallaxX * this.z * 24;
      this.y = this.baseY + parallaxY * this.z * 24;

      this.pulsePhase += this.pulseSpeed;
      this.alpha = this.baseAlpha + Math.sin(this.pulsePhase) * 0.12;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = this.isViolet
        ? `rgba(168, 85, 247, ${Math.max(0, this.alpha)})`
        : `rgba(56, 189, 248, ${Math.max(0, this.alpha)})`;
      ctx.fill();
    }
  }

  // =========================================================================
  // Layer 2: Midground Floating AI Glow Particles (Depth Z: 0.4 - 0.8)
  // =========================================================================
  class MidGlowParticle {
    constructor() {
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 20;
      this.baseX = this.x;
      this.baseY = this.y;
      this.z = Math.random() * 0.4 + 0.4; // Midground depth
      this.radius = Math.random() * 1.6 + 1.0;
      this.vy = -(Math.random() * 0.32 + 0.14);
      this.vx = (Math.random() - 0.5) * 0.22;
      this.alpha = Math.random() * 0.38 + 0.18;
      this.colorType = Math.random();
      // Cyan, Violet, or Electric Blue
      if (this.colorType < 0.4) {
        this.rgb = '56, 189, 248';
      } else if (this.colorType < 0.75) {
        this.rgb = '168, 85, 247';
      } else {
        this.rgb = '99, 102, 241';
      }
    }

    update(parallaxX, parallaxY) {
      this.baseY += this.vy;
      this.baseX += this.vx;

      if (this.baseY < -20) this.reset(false);
      if (this.baseX < -20) this.baseX = width + 20;
      if (this.baseX > width + 20) this.baseX = -20;

      this.x = this.baseX + parallaxX * this.z * 46;
      this.y = this.baseY + parallaxY * this.z * 46;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.rgb}, ${this.alpha})`;
      ctx.shadowColor = `rgba(${this.rgb}, 0.5)`;
      ctx.shadowBlur = 6;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  // =========================================================================
  // Layer 3: Foreground Neural Network Constellation
  // =========================================================================
  class NeuralNode {
    constructor(id) {
      this.id = id;
      this.reset();
    }

    reset() {
      this.baseX = Math.random() * width;
      this.baseY = Math.random() * height;
      this.x = this.baseX;
      this.y = this.baseY;
      this.vx = (Math.random() - 0.5) * 0.48;
      this.vy = (Math.random() - 0.5) * 0.48;
      this.radius = Math.random() * 1.8 + 1.8;
      this.baseAlpha = Math.random() * 0.4 + 0.38;
      this.alpha = this.baseAlpha;
      this.pulseSpeed = Math.random() * 0.025 + 0.015;
      this.pulsePhase = Math.random() * Math.PI * 2;

      // Color theme: Cyan (60%), Violet (40%)
      this.isCyan = Math.random() > 0.4;
      this.colorRgb = this.isCyan ? '56, 189, 248' : '168, 85, 247';
      this.glowColor = this.isCyan ? 'rgba(56, 189, 248, 0.45)' : 'rgba(168, 85, 247, 0.45)';
    }

    update(parallaxX, parallaxY) {
      this.baseX += this.vx;
      this.baseY += this.vy;

      // Boundary Wrapping
      if (this.baseX < -25) this.baseX = width + 25;
      else if (this.baseX > width + 25) this.baseX = -25;

      if (this.baseY < -25) this.baseY = height + 25;
      else if (this.baseY > height + 25) this.baseY = -25;

      // Base location with desktop mouse parallax
      this.x = this.baseX + parallaxX * 65;
      this.y = this.baseY + parallaxY * 65;

      // Fluid deflection around cursor
      if (mouse.isActive && config.mouseRadius > 0) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < config.mouseRadius && dist > 1) {
          const force = (1 - dist / config.mouseRadius) * 1.1;
          this.baseX -= (dx / dist) * force * 1.3;
          this.baseY -= (dy / dist) * force * 1.3;
        }
      }

      this.pulsePhase += this.pulseSpeed;
      this.currentAlpha = this.baseAlpha + Math.sin(this.pulsePhase) * 0.18;
    }

    draw() {
      // Outer subtle halo
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius * 2.4, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.colorRgb}, ${Math.max(0, this.currentAlpha * 0.18)})`;
      ctx.fill();

      // Core node
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.colorRgb}, ${Math.max(0, this.currentAlpha)})`;
      ctx.shadowColor = this.glowColor;
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  // =========================================================================
  // Layer 4: Synaptic Signal Pulse (Traveling Data Transmission)
  // =========================================================================
  class SynapticSignalPulse {
    constructor(nodeA, nodeB) {
      this.nodeA = nodeA;
      this.nodeB = nodeB;
      this.progress = 0;
      this.speed = Math.random() * 0.016 + 0.009;
      this.color = Math.random() > 0.4 ? '255, 255, 255' : '56, 189, 248';
      this.dead = false;
    }

    update() {
      this.progress += this.speed;
      if (this.progress >= 1) {
        this.dead = true;
      }
    }

    draw() {
      if (this.dead) return;
      const curX = this.nodeA.x + (this.nodeB.x - this.nodeA.x) * this.progress;
      const curY = this.nodeA.y + (this.nodeB.y - this.nodeA.y) * this.progress;

      // Small glowing photon
      ctx.beginPath();
      ctx.arc(curX, curY, 2.0, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color}, 0.95)`;
      ctx.shadowColor = 'rgba(56, 189, 248, 0.95)';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  // =========================================================================
  // Layer 5: Subtle Floating AI Geometric Accents (Hexagons & Crosshairs)
  // =========================================================================
  class GeometricAccent {
    constructor(id) {
      this.id = id;
      this.reset(true);
    }

    reset(initial = false) {
      this.x = Math.random() * width;
      this.y = initial ? Math.random() * height : height + 30;
      this.baseX = this.x;
      this.baseY = this.y;
      this.z = Math.random() * 0.3 + 0.3;
      this.size = Math.random() * 16 + 12;
      this.vy = -(Math.random() * 0.18 + 0.06);
      this.rotation = Math.random() * Math.PI * 2;
      this.rotSpeed = (Math.random() - 0.5) * 0.008;
      this.alpha = Math.random() * 0.14 + 0.06;
      this.isHex = Math.random() > 0.4;
    }

    update(parallaxX, parallaxY) {
      this.baseY += this.vy;
      if (this.baseY < -40) this.reset(false);

      this.rotation += this.rotSpeed;
      this.x = this.baseX + parallaxX * this.z * 36;
      this.y = this.baseY + parallaxY * this.z * 36;
    }

    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rotation);
      ctx.strokeStyle = `rgba(56, 189, 248, ${this.alpha})`;
      ctx.lineWidth = 0.75;

      if (this.isHex) {
        // Wireframe Hexagon
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
          const angle = (i * Math.PI) / 3;
          const px = Math.cos(angle) * this.size;
          const py = Math.sin(angle) * this.size;
          if (i === 0) ctx.moveTo(px, py);
          else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();
      } else {
        // Crosshair / Alignment Marker
        const s = this.size * 0.5;
        ctx.beginPath();
        ctx.moveTo(-s, 0);
        ctx.lineTo(s, 0);
        ctx.moveTo(0, -s);
        ctx.lineTo(0, s);
        ctx.stroke();
      }
      ctx.restore();
    }
  }

  // =========================================================================
  // Faint Perspective Cyber-Grid at Lower Horizon
  // =========================================================================
  function drawPerspectiveCyberGrid(parallaxX, parallaxY) {
    const gridHorizon = height * 0.60;
    const gridBottom = height + 40;
    const gridHeight = gridBottom - gridHorizon;
    if (gridHeight <= 0) return;

    ctx.save();

    // Soft gradient mask so grid dissolves softly without harsh lines
    const grad = ctx.createLinearGradient(0, gridHorizon, 0, gridBottom);
    grad.addColorStop(0, 'rgba(6, 182, 212, 0)');
    grad.addColorStop(0.25, 'rgba(56, 189, 248, 0.05)');
    grad.addColorStop(0.85, 'rgba(147, 51, 234, 0.08)');
    grad.addColorStop(1, 'rgba(3, 7, 18, 0.01)');

    ctx.strokeStyle = grad;
    ctx.lineWidth = 0.8;

    // Perspective vanishing center with subtle parallax tilt
    const vanishingX = width * 0.5 + parallaxX * 85;
    const vanishingY = gridHorizon - 60 + parallaxY * 25;

    // 1. Horizontal Perspective Lines (Exponential distance for realistic 3D depth)
    const lineCount = 14;
    for (let i = 1; i <= lineCount; i++) {
      const t = Math.pow(i / lineCount, 2.3);
      const y = gridHorizon + t * gridHeight;
      const xSpan = width * (0.65 + t * 0.95);
      const xLeft = vanishingX - xSpan * 0.5;
      const xRight = vanishingX + xSpan * 0.5;

      ctx.beginPath();
      ctx.moveTo(xLeft, y);
      ctx.lineTo(xRight, y);
      ctx.stroke();
    }

    // 2. Converging Longitudinal Lines
    const rayCount = config.isMobile ? 12 : 22;
    for (let i = -rayCount / 2; i <= rayCount / 2; i++) {
      const spread = i / (rayCount / 2);
      const bottomX = vanishingX + spread * (width * 0.98);

      ctx.beginPath();
      ctx.moveTo(vanishingX + spread * 35, gridHorizon);
      ctx.lineTo(bottomX, gridBottom);
      ctx.stroke();
    }

    // 3. Delicate Horizon Beacon Line
    const horizonGlow = ctx.createLinearGradient(0, 0, width, 0);
    horizonGlow.addColorStop(0, 'rgba(56, 189, 248, 0)');
    horizonGlow.addColorStop(0.5, 'rgba(56, 189, 248, 0.14)');
    horizonGlow.addColorStop(1, 'rgba(168, 85, 247, 0)');

    ctx.strokeStyle = horizonGlow;
    ctx.lineWidth = 1.0;
    ctx.beginPath();
    ctx.moveTo(width * 0.15, gridHorizon);
    ctx.lineTo(width * 0.85, gridHorizon);
    ctx.stroke();

    ctx.restore();
  }

  // =========================================================================
  // Draw Neural Connections & Cursor Bridges
  // =========================================================================
  function drawNeuralNetworkConnections() {
    let connectionsFormed = 0;
    const activePairs = [];

    for (let i = 0; i < neuralNodes.length; i++) {
      const p1 = neuralNodes[i];
      let nodeConnections = 0;

      for (let j = i + 1; j < neuralNodes.length; j++) {
        const p2 = neuralNodes[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < config.connectionDist) {
          nodeConnections++;
          connectionsFormed++;

          const alpha = (1 - dist / config.connectionDist) * 0.18;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);

          // Dynamic linear gradient connecting the two nodes
          const lineGrad = ctx.createLinearGradient(p1.x, p1.y, p2.x, p2.y);
          lineGrad.addColorStop(0, `rgba(${p1.colorRgb}, ${alpha})`);
          lineGrad.addColorStop(1, `rgba(${p2.colorRgb}, ${alpha})`);

          ctx.strokeStyle = lineGrad;
          ctx.lineWidth = 0.85;
          ctx.stroke();

          if (activePairs.length < 35) {
            activePairs.push([p1, p2]);
          }

          if (nodeConnections >= config.maxConnections) break;
        }
      }

      // Dynamic Connection directly to mouse cursor on desktop
      if (mouse.isActive && config.mouseRadius > 0) {
        const dx = mouse.x - p1.x;
        const dy = mouse.y - p1.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < config.mouseRadius) {
          const mAlpha = (1 - dist / config.mouseRadius) * 0.32;
          ctx.beginPath();
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(56, 189, 248, ${mAlpha})`;
          ctx.lineWidth = 1.0;
          ctx.stroke();
        }
      }
    }

    // Periodically trigger synaptic data signal packet
    if (Math.random() < 0.045 && activePairs.length > 0 && signalPulses.length < 14) {
      const pair = activePairs[Math.floor(Math.random() * activePairs.length)];
      signalPulses.push(new SynapticSignalPulse(pair[0], pair[1]));
    }
  }

  // =========================================================================
  // Ambient Canvas Glow Orbs (Complementing CSS Orbs)
  // =========================================================================
  function drawCanvasAmbientGlow(parallaxX, parallaxY) {
    // 1. Violet Glow in Upper Left
    const vX = width * 0.20 + parallaxX * 45;
    const vY = height * 0.26 + parallaxY * 45;
    const vRad = Math.min(width, height) * 0.48;
    const vGrad = ctx.createRadialGradient(vX, vY, 0, vX, vY, vRad);
    vGrad.addColorStop(0, 'rgba(124, 58, 237, 0.08)');
    vGrad.addColorStop(0.55, 'rgba(139, 92, 246, 0.03)');
    vGrad.addColorStop(1, 'rgba(3, 7, 18, 0)');

    ctx.fillStyle = vGrad;
    ctx.beginPath();
    ctx.arc(vX, vY, vRad, 0, Math.PI * 2);
    ctx.fill();

    // 2. Cyan Glow in Center Right
    const cX = width * 0.82 + parallaxX * 55;
    const cY = height * 0.40 + parallaxY * 55;
    const cRad = Math.min(width, height) * 0.50;
    const cGrad = ctx.createRadialGradient(cX, cY, 0, cX, cY, cRad);
    cGrad.addColorStop(0, 'rgba(6, 182, 212, 0.08)');
    cGrad.addColorStop(0.6, 'rgba(56, 189, 248, 0.025)');
    cGrad.addColorStop(1, 'rgba(3, 7, 18, 0)');

    ctx.fillStyle = cGrad;
    ctx.beginPath();
    ctx.arc(cX, cY, cRad, 0, Math.PI * 2);
    ctx.fill();

    // 3. Deep Blue Glow in Lower Middle
    const bX = width * 0.50 + parallaxX * 32;
    const bY = height * 0.76 + parallaxY * 32;
    const bRad = Math.min(width, height) * 0.54;
    const bGrad = ctx.createRadialGradient(bX, bY, 0, bX, bY, bRad);
    bGrad.addColorStop(0, 'rgba(37, 99, 235, 0.07)');
    bGrad.addColorStop(0.65, 'rgba(15, 23, 42, 0)');
    bGrad.addColorStop(1, 'rgba(3, 7, 18, 0)');

    ctx.fillStyle = bGrad;
    ctx.beginPath();
    ctx.arc(bX, bY, bRad, 0, Math.PI * 2);
    ctx.fill();
  }

  // =========================================================================
  // Initialize Entity Pools
  // =========================================================================
  function initEntities() {
    deepParticles = [];
    for (let i = 0; i < config.deepCount; i++) {
      deepParticles.push(new DeepDustParticle());
    }

    midParticles = [];
    for (let i = 0; i < config.midCount; i++) {
      midParticles.push(new MidGlowParticle());
    }

    neuralNodes = [];
    for (let i = 0; i < config.nodeCount; i++) {
      neuralNodes.push(new NeuralNode(i));
    }

    geometricAccents = [];
    for (let i = 0; i < config.accentCount; i++) {
      geometricAccents.push(new GeometricAccent(i));
    }

    signalPulses = [];
  }

  // =========================================================================
  // Static Constellation Fallback (prefers-reduced-motion)
  // =========================================================================
  function renderStaticConstellation() {
    ctx.clearRect(0, 0, width, height);
    drawCanvasAmbientGlow(0, 0);
    drawPerspectiveCyberGrid(0, 0);

    for (let i = 0; i < 35; i++) {
      const x = (i * 137.5) % width;
      const y = (i * 93.7) % height;
      ctx.beginPath();
      ctx.arc(x, y, 1.6, 0, Math.PI * 2);
      ctx.fillStyle = i % 2 === 0 ? 'rgba(56, 189, 248, 0.35)' : 'rgba(168, 85, 247, 0.35)';
      ctx.fill();
    }
  }

  // =========================================================================
  // Main 60 FPS Animation Loop
  // =========================================================================
  function animate() {
    if (!isVisible) return;

    // Smooth Damped Mouse Tracking
    mouse.x += (mouse.targetX - mouse.x) * 0.055;
    mouse.y += (mouse.targetY - mouse.y) * 0.055;
    mouse.normX = (mouse.x / width) * 2 - 1;
    mouse.normY = (mouse.y / height) * 2 - 1;

    const parallaxX = mouse.normX;
    const parallaxY = mouse.normY;

    ctx.clearRect(0, 0, width, height);

    // 1. Ambient Lighting Gradients
    drawCanvasAmbientGlow(parallaxX, parallaxY);

    // 2. Faint Perspective Cyber-Grid
    drawPerspectiveCyberGrid(parallaxX, parallaxY);

    // 3. Layer 1: Deep Cosmic Star Dust
    for (let i = 0; i < deepParticles.length; i++) {
      deepParticles[i].update(parallaxX, parallaxY);
      deepParticles[i].draw();
    }

    // 4. Layer 2: Midground Floating AI Glow Particles
    for (let i = 0; i < midParticles.length; i++) {
      midParticles[i].update(parallaxX, parallaxY);
      midParticles[i].draw();
    }

    // 5. Layer 5: Floating Geometric AI Accents
    for (let i = 0; i < geometricAccents.length; i++) {
      geometricAccents[i].update(parallaxX, parallaxY);
      geometricAccents[i].draw();
    }

    // 6. Layer 3: Foreground Neural Network Connections
    drawNeuralNetworkConnections();

    // 7. Layer 3: Foreground Neural Network Nodes
    for (let i = 0; i < neuralNodes.length; i++) {
      neuralNodes[i].update(parallaxX, parallaxY);
      neuralNodes[i].draw();
    }

    // 8. Layer 4: Synaptic Data Signal Packets
    for (let i = signalPulses.length - 1; i >= 0; i--) {
      signalPulses[i].update();
      signalPulses[i].draw();
      if (signalPulses[i].dead) {
        signalPulses.splice(i, 1);
      }
    }

    animId = requestAnimationFrame(animate);
  }

  // =========================================================================
  // Event Handlers
  // =========================================================================
  function onMouseMove(e) {
    mouse.targetX = e.clientX;
    mouse.targetY = e.clientY;
    mouse.isActive = true;
    mouse.hoveredOnce = true;
  }

  function onTouchMove(e) {
    if (e.touches && e.touches.length > 0) {
      mouse.targetX = e.touches[0].clientX;
      mouse.targetY = e.touches[0].clientY;
      mouse.isActive = true;
    }
  }

  function onMouseLeave() {
    mouse.targetX = width * 0.5;
    mouse.targetY = height * 0.35;
    mouse.isActive = false;
  }

  // Debounced Resize
  let resizeTimeout;
  function handleResize() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(resizeCanvas, 120);
  }

  // Tab Lifecycle: Pause RAF when hidden to save 100% CPU/Battery
  function handleVisibilityChange() {
    if (document.hidden) {
      isVisible = false;
      if (animId) cancelAnimationFrame(animId);
    } else {
      isVisible = true;
      if (!prefersReducedMotion) {
        animId = requestAnimationFrame(animate);
      }
    }
  }

  // =========================================================================
  // Initialization
  // =========================================================================
  function init() {
    resizeCanvas();

    if (prefersReducedMotion) {
      renderStaticConstellation();
      return;
    }

    animId = requestAnimationFrame(animate);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('mouseleave', onMouseLeave, { passive: true });
    window.addEventListener('resize', handleResize, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
