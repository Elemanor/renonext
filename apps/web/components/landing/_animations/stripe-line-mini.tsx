'use client';

import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion';

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];
const VB_W = 320;
const VB_H = 80;

interface StripeLineMiniProps {
  /** SVG polyline points, e.g. "0,65 45,60 90,52 ..." */
  points: string;
  strokeClass?: string;
  fillClass?: string;
  gridClass?: string;
  className?: string;
}

export function StripeLineMini({
  points,
  strokeClass = 'stroke-emerald-500',
  fillClass = 'fill-emerald-500/10',
  gridClass = 'stroke-gray-200',
  className,
}: StripeLineMiniProps) {
  const prefersReduced = useReducedMotion();

  const pts = points
    .trim()
    .split(/\s+/)
    .map((p) => p.split(',').map(Number))
    .filter(([x, y]) => Number.isFinite(x) && Number.isFinite(y)) as [number, number][];

  if (pts.length < 2) return null;

  const pathD = pts
    .map(([x, y], i) => `${i === 0 ? 'M' : 'L'}${x},${y}`)
    .join(' ');

  const firstX = pts[0][0];
  const lastX = pts[pts.length - 1][0];
  const areaD = `${pathD} L${lastX},${VB_H} L${firstX},${VB_H} Z`;

  const Grid = (
    <>
      {[20, 40, 60].map((y) => (
        <line
          key={y}
          x1="0"
          y1={y}
          x2={VB_W}
          y2={y}
          className={gridClass}
          strokeWidth="0.5"
          strokeDasharray="4 4"
          opacity={0.4}
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </>
  );

  if (prefersReduced) {
    return (
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className={className ?? 'w-full'}
        aria-hidden="true"
        shapeRendering="geometricPrecision"
      >
        {Grid}
        <path d={areaD} className={fillClass} />
        <path
          d={pathD}
          className={strokeClass}
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <svg
        viewBox={`0 0 ${VB_W} ${VB_H}`}
        className={className ?? 'w-full'}
        aria-hidden="true"
        shapeRendering="geometricPrecision"
      >
        {Grid}

        {/* Area fill — fades in slightly after line starts */}
        <m.path
          d={areaD}
          className={fillClass}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay: 0.15, ease: EASE }}
        />

        {/* Line draw-in with simultaneous opacity fade */}
        <m.path
          d={pathD}
          className={strokeClass}
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          initial={{ pathLength: 0, opacity: 0 }}
          whileInView={{ pathLength: 1, opacity: 1 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.05, ease: EASE }}
        />
      </svg>
    </LazyMotion>
  );
}
