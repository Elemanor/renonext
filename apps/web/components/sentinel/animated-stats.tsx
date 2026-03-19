'use client';

import { useEffect, useRef, useState } from 'react';

interface AnimatedStatProps {
  value: number;
  suffix?: string;
  label: string;
  duration?: number;
}

function AnimatedStat({
  value,
  suffix = '',
  label,
  duration = 1800,
}: AnimatedStatProps) {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setCount(value);
      setHasStarted(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [value, hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let start: number | null = null;
    let raf: number;

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * value));
      if (progress < 1) {
        raf = requestAnimationFrame(step);
      }
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [hasStarted, value, duration]);

  return (
    <div ref={ref} className="text-center">
      <p className="text-3xl md:text-4xl font-extrabold text-white tabular-nums">
        {count}
        {suffix}
      </p>
      <p className="text-sm text-gray-400 font-medium mt-1">{label}</p>
    </div>
  );
}

interface AnimatedStatsRowProps {
  stats: { value: number; suffix?: string; label: string }[];
}

export function AnimatedStatsRow({ stats }: AnimatedStatsRowProps) {
  return (
    <div className="flex items-center justify-center gap-8 md:gap-14">
      {stats.map((stat, i) => (
        <div key={i} className="flex items-center gap-8 md:gap-14">
          <AnimatedStat
            value={stat.value}
            suffix={stat.suffix}
            label={stat.label}
          />
          {i < stats.length - 1 && (
            <div className="w-px h-10 bg-white/10" />
          )}
        </div>
      ))}
    </div>
  );
}
