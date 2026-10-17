/**
 * 3D INTERACTIVE HOLOGRAPHIC NEURAL SPHERE & AI VISUAL
 * Nethra Shree SD Portfolio - Hero Section
 * 
 * Lightweight mathematical 3D perspective projection engine:
 * - 3D Geodesic Icosahedron neural structure with glowing synapse vertices
 * - Depth-cued wireframe edges with dynamic cyan-violet luminance
 * - Pulsating internal energy core
 * - Dual tilted orbital gyroscope rings with orbiting satellites
 * - Interactive cursor tracking and drag-to-spin controls
 * - Zero external library dependencies, 60 FPS, ultra-low CPU footprint
 */

(function () {
  'use strict';

  const canvas = document.getElementById('hero3dCanvas');
  if (!canvas) return;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let parentWidth = canvas.parentElement ? canvas.parentElement.offsetWidth : 360;
  let parentHeight = canvas.parentElement ? canvas.parentElement.offsetHeight : 360;
  let width = parentWidth;
  let height = parentHeight;

  canvas.width = Math.floor(width * dpr);
  canvas.height = Math.floor(height * dpr);
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // 3D Engine State
  const state = {
    rotX: 0.2,
    rotY: 0.3,
    rotZ: 0.1,
    targetRotX: 0.2,
    targetRotY: 0.3,
    velRotX: 0.003,
    velRotY: 0.007,
    scale: Math.min(width, height) * 0.36,
    fov: 400,
    isDragging: false,
    dragStartX: 0,
    dragStartY: 0,
    mouseOver: false,
    corePulse: 0
  };

  // Generate 3D Icosahedron Vertices
  const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio 1.6180339887
  const baseVertices = [
    [-1,  phi, 0], [ 1,  phi, 0], [-1, -phi, 0], [ 1, -phi, 0],
    [ 0, -1,  phi], [ 0,  1,  phi], [ 0, -1, -phi], [ 0,  1, -phi],
    [ phi, 0, -1], [ phi, 0,  1], [-phi, 0, -1], [-phi, 0,  1]
  ];

  // Normalize vertices to unit sphere
  const vertices = baseVertices.map(v => {
    const len = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]);
    return {
      x: v[0] / len,
      y: v[1] / len,
      z: v[2] / len,
      color: Math.random() > 0.4 ? '56, 189, 248' : '168, 85, 247',
      pulse: Math.random() * Math.PI * 2
    };
  });

  // Subdivide and add extra internal neural points for higher density
  const midPoints = [];
  for (let i = 0; i < vertices.length; i++) {
    for (let j = i + 1; j < vertices.length; j++) {
      const v1 = vertices[i];
      const v2 = vertices[j];
      const dx = v1.x - v2.x;
      const dy = v1.y - v2.y;
      const dz = v1.z - v2.z;
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (dist < 1.1) {
        // midpoint
        const mx = (v1.x + v2.x) * 0.5;
        const my = (v1.y + v2.y) * 0.5;
        const mz = (v1.z + v2.z) * 0.5;
        const mlen = Math.sqrt(mx * mx + my * my + mz * mz);
        midPoints.push({
          x: (mx / mlen) * 0.96,
          y: (my / mlen) * 0.96,
          z: (mz / mlen) * 0.96,
          color: Math.random() > 0.5 ? '56, 189, 248' : '139, 92, 246',
          pulse: Math.random() * Math.PI * 2
        });
      }
    }
  }

  // Combine vertices
  const allNodes = vertices.concat(midPoints.slice(0, 16));

  // Precompute edges between nodes
  const edges = [];
  for (let i = 0; i < allNodes.length; i++) {
    for (let j = i + 1; j < allNodes.length; j++) {
      const n1 = allNodes[i];
      const n2 = allNodes[j];
      const edx = n1.x - n2.x;
      const edy = n1.y - n2.y;
      const edz = n1.z - n2.z;
      const d = Math.sqrt(edx * edx + edy * edy + edz * edz);
      if (d < 0.88) {
        edges.push([i, j]);
      }
    }
  }

  // 3D Orbital Gyroscope Rings
  const ring1Points = [];
  const ring2Points = [];
  const RING_RES = 36;
  for (let i = 0; i < RING_RES; i++) {
    const angle = (i / RING_RES) * Math.PI * 2;
    // Ring 1 in XY tilted 45 deg on Y
    ring1Points.push({
      x: Math.cos(angle) * 1.32,
      y: Math.sin(angle) * 1.32,
      z: Math.sin(angle) * 0.35
    });

    // Ring 2 tilted in XZ
    ring2Points.push({
      x: Math.cos(angle) * 1.45,
      y: Math.sin(angle) * 0.42,
      z: Math.sin(angle) * 1.45
    });
  }

  // 3D Rotation Math
  function rotate3D(point, rx, ry, rz) {
    // Rotate Y
    let cosY = Math.cos(ry);
    let sinY = Math.sin(ry);
    let x1 = point.x * cosY + point.z * sinY;
    let y1 = point.y;
    let z1 = -point.x * sinY + point.z * cosY;

    // Rotate X
    let cosX = Math.cos(rx);
    let sinX = Math.sin(rx);
    let x2 = x1;
    let y2 = y1 * cosX - z1 * sinX;
    let z2 = y1 * sinX + z1 * cosX;

    // Rotate Z
    let cosZ = Math.cos(rz);
    let sinZ = Math.sin(rz);
    let x3 = x2 * cosZ - y2 * sinZ;
    let y3 = x2 * sinZ + y2 * cosZ;
    let z3 = z2;

    return { x: x3, y: y3, z: z3 };
  }

  // Perspective projection
  function project(p3, centerX, centerY, scale, fov) {
    const perspective = fov / (fov + p3.z * scale);
    return {
      x: centerX + p3.x * scale * perspective,
      y: centerY + p3.y * scale * perspective,
      z: p3.z,
      scale: perspective
    };
  }

  let animFrameId = null;

  function render() {
    ctx.clearRect(0, 0, width, height);

    const centerX = width * 0.5;
    const centerY = height * 0.5;
    const currentScale = state.scale;
    const fov = state.fov;

    // Smooth rotation updates
    if (!state.isDragging) {
      if (state.mouseOver) {
        state.rotX += (state.targetRotX - state.rotX) * 0.05;
        state.rotY += (state.targetRotY - state.rotY) * 0.05;
      } else {
        state.rotY += state.velRotY;
        state.rotX += state.velRotX * 0.7;
      }
    }
    state.rotZ += 0.0015;
    state.corePulse += 0.035;

    // 1. Draw central glowing energy core
    const coreGrad = ctx.createRadialGradient(
      centerX, centerY, 0,
      centerX, centerY, currentScale * 0.42
    );
    const pulseFactor = 0.5 + Math.sin(state.corePulse) * 0.15;
    coreGrad.addColorStop(0, `rgba(56, 189, 248, ${0.45 * pulseFactor})`);
    coreGrad.addColorStop(0.4, `rgba(168, 85, 247, ${0.25 * pulseFactor})`);
    coreGrad.addColorStop(1, 'rgba(3, 7, 18, 0)');

    ctx.fillStyle = coreGrad;
    ctx.beginPath();
    ctx.arc(centerX, centerY, currentScale * 0.48, 0, Math.PI * 2);
    ctx.fill();

    // 2. Project all nodes
    const projectedNodes = allNodes.map(node => {
      const rot = rotate3D(node, state.rotX, state.rotY, state.rotZ);
      const proj = project(rot, centerX, centerY, currentScale, fov);
      return {
        x: proj.x,
        y: proj.y,
        z: proj.z,
        scale: proj.scale,
        color: node.color,
        pulse: node.pulse
      };
    });

    // 3. Draw 3D Edges
    for (let i = 0; i < edges.length; i++) {
      const [idxA, idxB] = edges[i];
      const pA = projectedNodes[idxA];
      const pB = projectedNodes[idxB];

      // Depth cue: average Z
      const avgZ = (pA.z + pB.z) * 0.5;
      const depthAlpha = Math.max(0.08, Math.min(0.7, (avgZ + 1.2) * 0.32));

      ctx.beginPath();
      ctx.moveTo(pA.x, pA.y);
      ctx.lineTo(pB.x, pB.y);

      const edgeGrad = ctx.createLinearGradient(pA.x, pA.y, pB.x, pB.y);
      edgeGrad.addColorStop(0, `rgba(${pA.color}, ${depthAlpha})`);
      edgeGrad.addColorStop(1, `rgba(${pB.color}, ${depthAlpha})`);

      ctx.strokeStyle = edgeGrad;
      ctx.lineWidth = Math.max(0.6, (avgZ + 1.4) * 0.8);
      ctx.stroke();
    }

    // 4. Draw Orbital Gyroscope Rings
    drawGyroscopeRing(ring1Points, centerX, centerY, currentScale, fov, '56, 189, 248', state.corePulse * 1.2);
    drawGyroscopeRing(ring2Points, centerX, centerY, currentScale, fov, '168, 85, 247', -state.corePulse * 0.9);

    // 5. Draw 3D Synapse Nodes (Sort by Z to render back-to-front correctly)
    const sortedNodes = projectedNodes.slice().sort((a, b) => a.z - b.z);

    for (let i = 0; i < sortedNodes.length; i++) {
      const n = sortedNodes[i];
      // Size and glow modulated by 3D depth
      const depthFactor = (n.z + 1.3) * 0.5; // ~0.1 to 1.3
      const nodeRadius = Math.max(1.4, 2.8 * depthFactor * n.scale);
      const nodeAlpha = Math.max(0.25, Math.min(0.95, (n.z + 1.2) * 0.45));

      ctx.beginPath();
      ctx.arc(n.x, n.y, nodeRadius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${n.color}, ${nodeAlpha})`;

      if (n.z > 0) {
        ctx.shadowColor = `rgba(${n.color}, ${nodeAlpha * 0.8})`;
        ctx.shadowBlur = 8;
      }
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    if (!prefersReducedMotion) {
      animFrameId = requestAnimationFrame(render);
    }
  }

  // Draw 3D Ring with Orbiting Satellite
  function drawGyroscopeRing(ringPoints, centerX, centerY, scale, fov, color, phase) {
    const projRing = ringPoints.map(p => {
      const rot = rotate3D(p, state.rotX * 0.6, state.rotY * 0.8, state.rotZ * 0.5);
      return project(rot, centerX, centerY, scale, fov);
    });

    // Draw ring segments
    ctx.beginPath();
    ctx.moveTo(projRing[0].x, projRing[0].y);
    for (let i = 1; i < projRing.length; i++) {
      ctx.lineTo(projRing[i].x, projRing[i].y);
    }
    ctx.closePath();
    ctx.strokeStyle = `rgba(${color}, 0.18)`;
    ctx.lineWidth = 1;
    ctx.stroke();

    // Satellite beacon traveling on ring
    const satIdx = Math.floor(((phase % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2)) / (Math.PI * 2) * projRing.length) % projRing.length;
    const sat = projRing[satIdx];
    if (sat) {
      ctx.beginPath();
      ctx.arc(sat.x, sat.y, 3 * sat.scale, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, 0.9)`;
      ctx.shadowColor = `rgba(${color}, 0.9)`;
      ctx.shadowBlur = 9;
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  // Interactive Mouse Tracking and Drag Control
  function attachInteractions() {
    const parent = canvas.parentElement || canvas;

    parent.addEventListener('mouseenter', () => {
      state.mouseOver = true;
    });

    parent.addEventListener('mouseleave', () => {
      state.mouseOver = false;
      state.isDragging = false;
    });

    parent.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const normX = (x / width) * 2 - 1;
      const normY = (y / height) * 2 - 1;

      if (state.isDragging) {
        const dx = e.clientX - state.dragStartX;
        const dy = e.clientY - state.dragStartY;
        state.rotY += dx * 0.01;
        state.rotX += dy * 0.01;
        state.dragStartX = e.clientX;
        state.dragStartY = e.clientY;
      } else {
        state.targetRotY = normX * 0.8;
        state.targetRotX = -normY * 0.8;
      }
    });

    parent.addEventListener('mousedown', (e) => {
      state.isDragging = true;
      state.dragStartX = e.clientX;
      state.dragStartY = e.clientY;
    });

    window.addEventListener('mouseup', () => {
      state.isDragging = false;
    });

    // Touch controls for mobile
    parent.addEventListener('touchstart', (e) => {
      if (e.touches.length === 1) {
        state.isDragging = true;
        state.dragStartX = e.touches[0].clientX;
        state.dragStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    parent.addEventListener('touchmove', (e) => {
      if (state.isDragging && e.touches.length === 1) {
        const dx = e.touches[0].clientX - state.dragStartX;
        const dy = e.touches[0].clientY - state.dragStartY;
        state.rotY += dx * 0.012;
        state.rotX += dy * 0.012;
        state.dragStartX = e.touches[0].clientX;
        state.dragStartY = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      state.isDragging = false;
    });

    // Responsive Resize
    window.addEventListener('resize', () => {
      width = parent.offsetWidth || 360;
      height = parent.offsetHeight || 360;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = width + 'px';
      canvas.style.height = height + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      state.scale = Math.min(width, height) * 0.36;
      if (prefersReducedMotion) render();
    }, { passive: true });
  }

  // Init
  function init() {
    width = canvas.parentElement ? canvas.parentElement.offsetWidth : 360;
    height = canvas.parentElement ? canvas.parentElement.offsetHeight : 360;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    state.scale = Math.min(width, height) * 0.36;

    attachInteractions();
    render();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
