'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

interface CountUpProps {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
  /** Digits after decimal (e.g. 1 for 4.9) */
  decimals?: number;
  /** BCP 47 locale tag, e.g. "en-CA" */
  locale?: string;
  /** Intl.NumberFormat options for currency, notation, etc. */
  formatOptions?: Intl.NumberFormatOptions;
  ariaLabel?: string;
}

export function CountUp({
  target,
  prefix = '',
  suffix = '',
  duration = 1200,
  className,
  decimals = 0,
  locale,
  formatOptions,
  ariaLabel,
}: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.6 });
  const prefersReduced = useReducedMotion();

  const [value, setValue] = useState(() => (prefersReduced ? target : 0));
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (prefersReduced) {
      setValue(target);
      return;
    }
    if (!isInView) return;

    const start = performance.now();
    const factor = Math.pow(10, decimals);

    function tick(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const next = Math.round(eased * target * factor) / factor;

      setValue((prev) => (prev === next ? prev : next));

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    }

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isInView, prefersReduced, target, duration, decimals]);

  const formatted = value.toLocaleString(locale, formatOptions);

  return (
    <span
      ref={ref}
      className={className}
      style={{ fontVariantNumeric: 'tabular-nums' }}
      aria-label={ariaLabel}
      aria-live="off"
    >
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
