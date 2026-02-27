'use client';

import { Shield, ClipboardCheck, Lock, BadgeCheck } from 'lucide-react';
import { GradientIcon } from './_shared/gradient-icon';
import { ScrollReveal } from './_animations/scroll-reveal';

const pills = [
  {
    icon: Shield,
    label: 'WSIB-Ready Workflows',
    gradient: 'from-emerald-400 to-emerald-600',
  },
  {
    icon: ClipboardCheck,
    label: 'Permit & Inspection Tracking',
    gradient: 'from-blue-400 to-blue-600',
  },
  {
    icon: Lock,
    label: 'Milestone-Protected Funds',
    gradient: 'from-amber-400 to-amber-600',
  },
  {
    icon: BadgeCheck,
    label: 'Evidence-Based Verification',
    gradient: 'from-violet-400 to-violet-600',
  },
] as const;

export function TrustBar() {
  return (
    <section className="relative overflow-hidden border-t border-slate-200/60 bg-slate-50">
      {/* Top gradient accent border */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent"
      />

      {/* Blueprint overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-blueprint opacity-[0.04]"
      />

      <div className="container relative z-10 mx-auto px-4 py-10 md:py-12">
        <ScrollReveal>
          <div className="flex flex-col items-center gap-6">
            {/* Pills */}
            <div className="flex flex-wrap items-center justify-center gap-4">
              {pills.map((pill) => (
                <div
                  key={pill.label}
                  className="flex items-center gap-2.5 rounded-full border border-slate-200/80 bg-white/80 px-4 py-2.5 shadow-sm backdrop-blur-sm"
                >
                  <GradientIcon
                    icon={pill.icon}
                    gradient={pill.gradient}
                    size="sm"
                    className="[&>div]:h-7 [&>div]:w-7 [&>div]:rounded-lg [&_svg]:h-3.5 [&_svg]:w-3.5"
                  />
                  <span className="text-sm font-medium text-slate-700">
                    {pill.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Micro-copy */}
            <p className="text-center text-sm text-slate-500">
              Built for GTA permits, inspections, and real jobsite realities.
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
