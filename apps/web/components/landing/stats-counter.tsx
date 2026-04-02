'use client';

import { useEffect, useRef, useState } from 'react';
import { HardHat, Star, Clock, ShieldCheck } from 'lucide-react';
import Image from 'next/image';

interface CounterStat {
  icon: React.ReactNode;
  target: number;
  suffix: string;
  label: string;
}

const stats: CounterStat[] = [
  {
    icon: <HardHat className="w-6 h-6" />,
    target: 15000,
    suffix: '+',
    label: 'Projects Completed',
  },
  {
    icon: <Star className="w-6 h-6" />,
    target: 487,
    suffix: '+',
    label: 'Five-Star Reviews',
  },
  {
    icon: <Clock className="w-6 h-6" />,
    target: 25,
    suffix: '+',
    label: 'Years Experience',
  },
  {
    icon: <ShieldCheck className="w-6 h-6" />,
    target: 5,
    suffix: 'M',
    label: 'Insurance Coverage',
  },
];

function AnimatedCounter({
  target,
  suffix,
  isVisible,
  delay,
}: {
  target: number;
  suffix: string;
  isVisible: boolean;
  delay: number;
}) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const timer = setTimeout(() => {
      const duration = 2000;
      const steps = 60;
      const increment = target / steps;
      let current = 0;

      const interval = setInterval(() => {
        current++;
        if (current >= steps) {
          setValue(target);
          clearInterval(interval);
        } else {
          const eased = 1 - Math.pow(1 - current / steps, 3);
          setValue(Math.floor(target * eased));
        }
      }, duration / steps);

      return () => clearInterval(interval);
    }, delay);

    return () => clearTimeout(timer);
  }, [isVisible, target, delay]);

  const formatted =
    suffix === 'M'
      ? `$${value}${suffix}`
      : value >= 1000
        ? `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}K${suffix}`
        : `${value}${suffix}`;

  return (
    <span className="tabular-nums">
      {formatted}
    </span>
  );
}

export function StatsCounter() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-20 overflow-hidden"
    >
      {/* Background image with dark overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/canvas/parallax-bg.jpg"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-reno-dark/90" />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className={`text-center transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-white/10 text-reno-green-light mb-4">
                {stat.icon}
              </div>

              {/* Number */}
              <div className="text-4xl md:text-5xl font-bold text-white mb-2">
                <AnimatedCounter
                  target={stat.target}
                  suffix={stat.suffix}
                  isVisible={isVisible}
                  delay={index * 200}
                />
              </div>

              {/* Label */}
              <p className="text-sm md:text-base text-slate-400 font-medium">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
