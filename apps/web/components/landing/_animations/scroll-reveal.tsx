'use client';

import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
} from 'framer-motion';

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

type Direction = 'up' | 'down' | 'left' | 'right';

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: Direction;
  distance?: number;
  duration?: number;
  className?: string;
  /** Set false for above-the-fold elements to avoid initial flash */
  animate?: boolean;
}

const offsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 1 },
  down: { x: 0, y: -1 },
  left: { x: 1, y: 0 },
  right: { x: -1, y: 0 },
};

export function ScrollReveal({
  children,
  delay = 0,
  direction = 'up',
  distance = 20,
  duration = 0.6,
  className,
  animate = true,
}: ScrollRevealProps) {
  const prefersReduced = useReducedMotion();
  const { x, y } = offsets[direction];

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className={
          className
            ? `will-change-[transform,opacity] ${className}`
            : 'will-change-[transform,opacity]'
        }
        initial={animate ? { opacity: 0, x: x * distance, y: y * distance } : false}
        whileInView={{ opacity: 1, x: 0, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration, delay, ease: EASE }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
