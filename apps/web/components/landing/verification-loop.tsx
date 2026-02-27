'use client';

import { ClipboardList, MapPin, CircleDollarSign } from 'lucide-react';
import { GradientIcon } from './_shared/gradient-icon';
import { ScrollReveal } from './_animations/scroll-reveal';
import { motion } from 'framer-motion';

/* ── Pure CSS UI Snippet Mockups ── */

function MilestoneTimelineMockup() {
  const milestones = [
    { label: 'Foundation', status: 'done', color: 'bg-blue-500' },
    { label: 'Framing', status: 'done', color: 'bg-blue-500' },
    { label: 'Electrical', status: 'active', color: 'bg-blue-400' },
    { label: 'Finishing', status: 'pending', color: 'bg-gray-200' },
  ];
  return (
    <div className="mx-auto w-full max-w-[200px] rounded-xl border border-gray-200/60 bg-white p-3 shadow-sm">
      <div className="mb-2 text-[9px] font-semibold text-gray-500">Milestone Timeline</div>
      <div className="space-y-2">
        {milestones.map((m, i) => (
          <div key={m.label} className="flex items-center gap-2">
            <div className="flex flex-col items-center">
              <div className={`h-2.5 w-2.5 rounded-full ${m.color} ${m.status === 'active' ? 'ring-2 ring-blue-200' : ''}`} />
              {i < milestones.length - 1 && (
                <div className={`h-3 w-px ${m.status === 'pending' ? 'bg-gray-200' : 'bg-blue-300'}`} />
              )}
            </div>
            <span className={`text-[10px] ${m.status === 'pending' ? 'text-gray-400' : 'font-medium text-gray-700'}`}>
              {m.label}
            </span>
            {m.status === 'done' && (
              <span className="ml-auto text-[8px] font-bold text-emerald-500">DONE</span>
            )}
            {m.status === 'active' && (
              <span className="ml-auto text-[8px] font-bold text-blue-500">IN PROGRESS</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function GPSVerificationMockup() {
  return (
    <div className="mx-auto w-full max-w-[200px] rounded-xl border border-gray-200/60 bg-white p-3 shadow-sm">
      <div className="mb-2 text-[9px] font-semibold text-gray-500">Site Verification</div>
      {/* Mini map placeholder */}
      <div className="relative mb-2 h-16 w-full overflow-hidden rounded-lg bg-gradient-to-br from-emerald-50 to-blue-50">
        <div className="absolute inset-0 bg-blueprint opacity-[0.08]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 shadow-md">
            <MapPin className="h-3 w-3 text-white" />
          </div>
        </div>
      </div>
      {/* Verified badge */}
      <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-2 py-1.5">
        <div className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-500">
          <svg className="h-2.5 w-2.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <p className="text-[9px] font-bold text-emerald-700">GPS Verified</p>
          <p className="text-[8px] text-emerald-600">43.6532N, 79.3832W</p>
        </div>
      </div>
    </div>
  );
}

function PayoutReceiptMockup() {
  return (
    <div className="mx-auto w-full max-w-[200px] rounded-xl border border-gray-200/60 bg-white p-3 shadow-sm">
      <div className="mb-2 text-[9px] font-semibold text-gray-500">Verified Release</div>
      <div className="flex flex-col items-center py-2">
        <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100">
          <svg className="h-5 w-5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Funds Released</p>
        <p className="text-lg font-extrabold tabular-nums text-gray-900">$14,500</p>
        <div className="mt-1.5 rounded-full bg-emerald-50 px-2 py-0.5">
          <span className="text-[8px] font-bold text-emerald-600">MILESTONE 3 COMPLETE</span>
        </div>
      </div>
    </div>
  );
}

const steps = [
  {
    icon: ClipboardList,
    gradient: 'from-blue-400 to-blue-600',
    title: 'The Plan',
    description:
      'AI translates your project into a rigid Bill of Quantities. Every trade and material is calculated — not guessed.',
    Mockup: MilestoneTimelineMockup,
  },
  {
    icon: MapPin,
    gradient: 'from-amber-400 to-amber-600',
    title: 'The Proof',
    description:
      'GPS-stamped photos and OCR-scanned delivery tickets. Every milestone has a physical evidence trail.',
    Mockup: GPSVerificationMockup,
  },
  {
    icon: CircleDollarSign,
    gradient: 'from-emerald-400 to-emerald-600',
    title: 'The Payout',
    description:
      'Money moves only when the site data matches the plan. Funds release automatically when the math checks out.',
    Mockup: PayoutReceiptMockup,
  },
] as const;

export function VerificationLoop() {
  return (
    <section id="verification" className="relative scroll-mt-24 overflow-hidden bg-zinc-100/60 py-20 md:py-24">
      {/* Blueprint overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-blueprint opacity-[0.035]"
      />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Header — left-aligned */}
          <ScrollReveal>
            <div className="mb-14 max-w-2xl">
              <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-zinc-400">
                Verification Infrastructure
              </p>
              <h2 className="text-3xl font-extrabold tracking-tight text-zinc-900 md:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
                Every Dollar Is Verified{' '}
                <br className="hidden sm:block" />
                Before It Moves
              </h2>
            </div>
          </ScrollReveal>

          {/* 3-card grid with dashed connector */}
          <div className="relative grid gap-6 md:grid-cols-3">
            {/* Dashed connector line (desktop) */}
            <div
              className="pointer-events-none absolute left-[16.67%] right-[16.67%] top-[60px] hidden h-[2px] md:block"
              aria-hidden="true"
            >
              <motion.div 
                className="h-full w-full border-t-2 border-dashed border-emerald-400/60"
                initial={{ scaleX: 0, originX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: "easeInOut", delay: 0.5 }}
              />
            </div>

            {steps.map((step, i) => {
              const Mockup = step.Mockup;
              return (
                <ScrollReveal key={step.title} delay={i * 0.12}>
                  <div className="flex flex-col items-center rounded-2xl bg-white px-6 pb-8 pt-8 shadow-sm shadow-zinc-900/[0.04]">
                    {/* Gradient Icon */}
                    <div className="mb-4">
                      <GradientIcon
                        icon={step.icon}
                        gradient={step.gradient}
                        size="md"
                        glow
                      />
                    </div>

                    <h3 className="mb-6 text-lg font-bold text-zinc-900">
                      {step.title}
                    </h3>

                    {/* UI Snippet Mockup */}
                    <div className="mb-6 w-full">
                      <Mockup />
                    </div>

                    <p className="text-center text-sm leading-relaxed text-zinc-500">
                      {step.description}
                    </p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
