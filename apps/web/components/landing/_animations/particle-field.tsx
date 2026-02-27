'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const MAX_LINE_SEGMENTS = 1200;

export interface ParticleFieldProps {
  count?: number;
  dotColor?: string;
  lineColor?: string;
  connectionDistance?: number;
  particleSize?: number;
  className?: string;
}

export function ParticleField({
  count = 60,
  dotColor = '#3b82f6',
  lineColor = '#6366f1',
  connectionDistance = 3,
  particleSize = 0.05,
  className,
}: ParticleFieldProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    /* ---- renderer ---- */
    const renderer = new THREE.WebGLRenderer({
      antialias: false,
      alpha: true,
      powerPreference: 'low-power',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    /* ---- scene / camera ---- */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 100);
    camera.position.z = 8;

    /* ---- boundaries ---- */
    const bx = 8, by = 4.5, bz = 2;

    /* ---- particle data ---- */
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * bx * 2;
      positions[i * 3 + 1] = (Math.random() - 0.5) * by * 2;
      positions[i * 3 + 2] = (Math.random() - 0.5) * bz * 2;
      velocities[i * 3] = (Math.random() - 0.5) * 0.008;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.008;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.004;
    }

    /* ---- dots ---- */
    const dotGeom = new THREE.BufferGeometry();
    const dotPosAttr = new THREE.BufferAttribute(positions, 3);
    dotPosAttr.setUsage(THREE.DynamicDrawUsage);
    dotGeom.setAttribute('position', dotPosAttr);
    const dotMat = new THREE.PointsMaterial({
      color: dotColor,
      size: particleSize,
      transparent: true,
      opacity: 0.4,
      sizeAttenuation: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    scene.add(new THREE.Points(dotGeom, dotMat));

    /* ---- lines with per-vertex color for distance fade ---- */
    const maxVerts = MAX_LINE_SEGMENTS * 2;
    const linePositions = new Float32Array(maxVerts * 3);
    const lineColors = new Float32Array(maxVerts * 3);

    const lineGeom = new THREE.BufferGeometry();
    const linePosAttr = new THREE.BufferAttribute(linePositions, 3);
    linePosAttr.setUsage(THREE.DynamicDrawUsage);
    lineGeom.setAttribute('position', linePosAttr);
    const lineColAttr = new THREE.BufferAttribute(lineColors, 3);
    lineColAttr.setUsage(THREE.DynamicDrawUsage);
    lineGeom.setAttribute('color', lineColAttr);
    lineGeom.setDrawRange(0, 0);

    const baseLineColor = new THREE.Color(lineColor);
    const lineMat = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.2,
      depthWrite: false,
    });
    scene.add(new THREE.LineSegments(lineGeom, lineMat));

    /* ---- pointer (only reacts inside container rect) ---- */
    const pointer = { x: 9999, y: 9999 };
    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const inside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      if (!inside) {
        pointer.x = 9999;
        pointer.y = 9999;
        return;
      }
      pointer.x = ((e.clientX - rect.left) / rect.width * 2 - 1) * bx;
      pointer.y = (-(e.clientY - rect.top) / rect.height * 2 + 1) * by;
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    /* ---- resize ---- */
    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    resize();

    /* ---- offscreen pause via IntersectionObserver ---- */
    let isVisible = true;
    const io = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0 }
    );
    io.observe(container);

    /* ---- animation loop ---- */
    let frameCount = 0;
    let rafId = 0;

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const posArr = positions;

      // move particles
      for (let i = 0; i < count; i++) {
        const ix = i * 3, iy = ix + 1, iz = ix + 2;

        posArr[ix] += velocities[ix];
        posArr[iy] += velocities[iy];
        posArr[iz] += velocities[iz];

        // clamp + bounce
        if (posArr[ix] > bx) { posArr[ix] = bx; velocities[ix] *= -1; }
        else if (posArr[ix] < -bx) { posArr[ix] = -bx; velocities[ix] *= -1; }
        if (posArr[iy] > by) { posArr[iy] = by; velocities[iy] *= -1; }
        else if (posArr[iy] < -by) { posArr[iy] = -by; velocities[iy] *= -1; }
        if (posArr[iz] > bz) { posArr[iz] = bz; velocities[iz] *= -1; }
        else if (posArr[iz] < -bz) { posArr[iz] = -bz; velocities[iz] *= -1; }

        // mouse repulsion (squared check first, sqrt only when needed)
        const dx = posArr[ix] - pointer.x;
        const dy = posArr[iy] - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 > 1e-8 && d2 < 4) {
          const dist = Math.sqrt(d2);
          const force = (2 - dist) * 0.003;
          posArr[ix] += (dx / dist) * force;
          posArr[iy] += (dy / dist) * force;
        }
      }
      dotPosAttr.needsUpdate = true;

      // line check throttled to every 3 frames
      frameCount++;
      if (frameCount % 3 === 0) {
        let vertIdx = 0;
        let colorIdx = 0;
        let segCount = 0;
        const cd2 = connectionDistance * connectionDistance;

        for (let i = 0; i < count && segCount < MAX_LINE_SEGMENTS; i++) {
          for (let j = i + 1; j < count && segCount < MAX_LINE_SEGMENTS; j++) {
            const dx = posArr[i * 3] - posArr[j * 3];
            const dy = posArr[i * 3 + 1] - posArr[j * 3 + 1];
            const dz = posArr[i * 3 + 2] - posArr[j * 3 + 2];
            const d2 = dx * dx + dy * dy + dz * dz;

            if (d2 < cd2) {
              // opacity ∝ (1 - dist/threshold)
              const brightness = 1 - Math.sqrt(d2) / connectionDistance;

              linePositions[vertIdx++] = posArr[i * 3];
              linePositions[vertIdx++] = posArr[i * 3 + 1];
              linePositions[vertIdx++] = posArr[i * 3 + 2];
              linePositions[vertIdx++] = posArr[j * 3];
              linePositions[vertIdx++] = posArr[j * 3 + 1];
              linePositions[vertIdx++] = posArr[j * 3 + 2];

              // both vertices of the segment get the same brightness
              lineColors[colorIdx++] = baseLineColor.r * brightness;
              lineColors[colorIdx++] = baseLineColor.g * brightness;
              lineColors[colorIdx++] = baseLineColor.b * brightness;
              lineColors[colorIdx++] = baseLineColor.r * brightness;
              lineColors[colorIdx++] = baseLineColor.g * brightness;
              lineColors[colorIdx++] = baseLineColor.b * brightness;

              segCount++;
            }
          }
        }

        linePosAttr.needsUpdate = true;
        lineColAttr.needsUpdate = true;
        lineGeom.setDrawRange(0, segCount * 2);
      }

      renderer.render(scene, camera);
    };
    animate();

    /* ---- cleanup ---- */
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onPointerMove);
      io.disconnect();
      ro.disconnect();
      renderer.dispose();
      renderer.forceContextLoss();
      dotGeom.dispose();
      dotMat.dispose();
      lineGeom.dispose();
      lineMat.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [count, dotColor, lineColor, connectionDistance, particleSize]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ pointerEvents: 'none' }}
    />
  );
}
