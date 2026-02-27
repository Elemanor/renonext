'use client';

import { CountUp } from './_animations/count-up';

const metrics: { prefix?: string; target: number; suffix: string; label: string }[] = [
  { target: 1200, suffix: '+', label: 'Projects Tracked Across the GTA' },
  { prefix: '$', target: 2, suffix: 'M+', label: 'Project Value Routed Through Milestone Verification' },
  { target: 500, suffix: '+', label: 'Verified Trade Professionals' },
];

export function MetricsBar() {
  return (
    <section className="border-b border-zinc-200/50 bg-white">
      <div className="container mx-auto px-4 py-5">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-center gap-6 sm:flex-row sm:gap-0">
          {metrics.map((m, i) => (
            <div key={m.label} className="flex items-center gap-0">
              {i > 0 && (
                <div className="mx-8 hidden h-8 w-px bg-zinc-200/70 sm:block" />
              )}
              <div className="text-center">
                <CountUp
                  target={m.target}
                  prefix={m.prefix ?? ''}
                  suffix={m.suffix}
                  className="text-2xl font-extrabold tracking-tight text-gray-900"
                  ariaLabel={`${m.prefix ?? ''}${m.target}${m.suffix} ${m.label}`}
                />
                <p className="mt-0.5 text-xs font-medium uppercase tracking-wider text-gray-500">
                  {m.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
