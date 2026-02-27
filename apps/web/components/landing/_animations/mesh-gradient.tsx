'use client';

import { useEffect, useRef } from 'react';

export interface MeshGradientProps {
  /** Hex colors for gradient blobs (default: Stripe-style indigo/violet/cyan/pink/blue) */
  colors?: string[];
  /** Multiple color palettes to interpolate between based on scroll position.
   *  If provided, overrides `colors`. Each entry is a palette of hex colors. */
  colorSets?: string[][];
  /** Animation speed multiplier (default 1) */
  speed?: number;
  /** Extra CSS classes */
  className?: string;
}

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.replace('#', ''), 16);
  return [(n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff];
}

function lerpColor(
  a: [number, number, number],
  b: [number, number, number],
  t: number,
): [number, number, number] {
  return [
    Math.round(a[0] + (b[0] - a[0]) * t),
    Math.round(a[1] + (b[1] - a[1]) * t),
    Math.round(a[2] + (b[2] - a[2]) * t),
  ];
}

export function MeshGradient({
  colors = ['#4338ca', '#7c3aed', '#0891b2', '#db2777', '#2563eb'],
  colorSets,
  speed = 1,
  className,
}: MeshGradientProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Reduced motion check
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    let reducedMotion = mq.matches;

    // Pre-compute RGB for all color sets (or single palette)
    const rgbSets: [number, number, number][][] = colorSets
      ? colorSets.map((set) => set.map(hexToRgb))
      : [colors.map(hexToRgb)];

    const blobCount = rgbSets[0].length;

    // Blob definitions — Lissajous orbital parameters for organic drift
    const blobs = rgbSets[0].map((color, i) => ({
      cx: 0.2 + (i / blobCount) * 0.6,
      cy: 0.2 + ((i * 0.618) % 1) * 0.6,
      ax: 0.12 + (i % 3) * 0.05,
      ay: 0.10 + ((i + 1) % 3) * 0.05,
      fx: 0.15 + i * 0.07,
      fy: 0.12 + i * 0.09,
      px: (i * Math.PI * 2) / blobCount,
      py: (i * Math.PI * 2) / blobCount + Math.PI / 3,
      radius: 0.4 + (i % 2) * 0.15,
      color, // will be overwritten per-frame if colorSets
    }));

    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 1.5);
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    // Pause when offscreen
    let isVisible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    let rafId = 0;
    let t = 0;

    /** Get scroll progress (0→1) through the canvas's parent section */
    const getScrollProgress = (): number => {
      if (rgbSets.length <= 1) return 0;
      const rect = canvas.getBoundingClientRect();
      const sectionH = rect.height;
      if (sectionH <= 0) return 0;
      // How far the top of the section has scrolled past the viewport top
      const scrolled = -rect.top;
      return Math.max(0, Math.min(1, scrolled / (sectionH - window.innerHeight * 0.5)));
    };

    /** Interpolate blob colors based on scroll position */
    const updateColors = () => {
      if (rgbSets.length <= 1) return;
      const progress = getScrollProgress();
      const segments = rgbSets.length - 1;
      const scaled = progress * segments;
      const idx = Math.min(Math.floor(scaled), segments - 1);
      const localT = scaled - idx;

      for (let i = 0; i < blobCount; i++) {
        blobs[i].color = lerpColor(rgbSets[idx][i], rgbSets[idx + 1][i], localT);
      }
    };

    const draw = () => {
      if (w === 0) return;

      updateColors();

      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = 'screen';

      for (const blob of blobs) {
        const bx = reducedMotion
          ? blob.cx * w
          : (blob.cx + blob.ax * Math.sin(blob.fx * t + blob.px)) * w;
        const by = reducedMotion
          ? blob.cy * h
          : (blob.cy + blob.ay * Math.sin(blob.fy * t + blob.py)) * h;
        const r = blob.radius * Math.max(w, h);

        const grad = ctx.createRadialGradient(bx, by, 0, bx, by, r);
        grad.addColorStop(
          0,
          `rgba(${blob.color[0]},${blob.color[1]},${blob.color[2]},0.40)`,
        );
        grad.addColorStop(
          0.5,
          `rgba(${blob.color[0]},${blob.color[1]},${blob.color[2]},0.12)`,
        );
        grad.addColorStop(
          1,
          `rgba(${blob.color[0]},${blob.color[1]},${blob.color[2]},0)`,
        );

        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, w, h);
      }

      ctx.globalCompositeOperation = 'source-over';
    };

    const animate = () => {
      rafId = requestAnimationFrame(animate);
      if (!isVisible) return;
      t += 0.008 * speed;
      draw();
    };

    if (reducedMotion) {
      draw();
    } else {
      animate();
    }

    const onMotionChange = () => {
      reducedMotion = mq.matches;
      if (reducedMotion) {
        cancelAnimationFrame(rafId);
        draw();
      } else {
        animate();
      }
    };

    if (mq.addEventListener) {
      mq.addEventListener('change', onMotionChange);
    } else {
      mq.addListener(onMotionChange);
    }

    return () => {
      cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
      if (mq.removeEventListener) {
        mq.removeEventListener('change', onMotionChange);
      } else {
        mq.removeListener(onMotionChange);
      }
    };
  }, [colors, colorSets, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      aria-hidden="true"
      style={{ pointerEvents: 'none' }}
    />
  );
}
