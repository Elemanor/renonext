'use client';

import { LazyMotion, domAnimation, m, useReducedMotion } from 'framer-motion';

const EASE = [0.25, 0.46, 0.45, 0.94] as const;

interface AnimatedProgressProps {
  /** 0–100 */
  value: number;
  barClass?: string;
  trackClass?: string;
  heightClass?: string;
  delay?: number;
  ariaLabel?: string;
}

export function AnimatedProgress({
  value,
  barClass = 'bg-emerald-500',
  trackClass = 'bg-gray-200',
  heightClass = 'h-1.5',
  delay = 0,
  ariaLabel = 'Progress',
}: AnimatedProgressProps) {
  const prefersReduced = useReducedMotion();
  const clamped = Math.max(0, Math.min(100, value));

  if (prefersReduced) {
    return (
      <div
        className={`w-full overflow-hidden rounded-full ${trackClass} ${heightClass}`}
        role="progressbar"
        aria-label={ariaLabel}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(clamped)}
      >
        <div
          className={`${heightClass} rounded-full ${barClass}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <div
        className={`w-full overflow-hidden rounded-full ${trackClass} ${heightClass}`}
        role="progressbar"
        aria-label={ariaLabel}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(clamped)}
      >
        <m.div
          className={`${heightClass} rounded-full ${barClass} will-change-[width]`}
          initial={{ width: '0%' }}
          whileInView={{ width: `${clamped}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.8, delay, ease: EASE as unknown as number[] }}
        />
      </div>
    </LazyMotion>
  );
}
