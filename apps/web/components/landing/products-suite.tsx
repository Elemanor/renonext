'use client';

import Link from 'next/link';
import { ArrowRight, ClipboardList, Calculator, CalendarCheck } from 'lucide-react';
import { GradientIcon } from './_shared/gradient-icon';
import { ScrollReveal } from './_animations/scroll-reveal';

/* ── Mini UI Mockups (pure CSS, no photos) ── */

function ProjectFormMockup() {
  return (
    <div className="mx-auto w-full max-w-[220px] rounded-xl border border-gray-200/60 bg-white p-3 shadow-sm">
      <div className="mb-2 h-2 w-16 rounded bg-blue-400/30" />
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-blue-400" />
          <div className="h-2 flex-1 rounded bg-gray-200" />
        </div>
        <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-2">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded bg-blue-100 text-[8px] font-bold text-blue-500">+</div>
            <span className="text-[9px] text-gray-400">Upload project photos...</span>
          </div>
        </div>
        <div className="flex gap-2">
          <div className="h-7 flex-1 rounded-md bg-gray-100" />
          <div className="h-7 w-20 rounded-md bg-blue-500" />
        </div>
      </div>
    </div>
  );
}

function BOQMockup() {
  const rows = [
    { item: 'Excavation', qty: '12m\u00B3', cost: '$4,200' },
    { item: 'Concrete', qty: '8m\u00B3', cost: '$3,600' },
    { item: 'Rebar', qty: '340kg', cost: '$6,800' },
  ];
  return (
    <div className="mx-auto w-full max-w-[220px] rounded-xl border border-gray-200/60 bg-white p-3 shadow-sm">
      <div className="mb-2 flex items-center gap-1.5">
        <div className="h-2 w-2 rounded-full bg-violet-400" />
        <span className="text-[9px] font-semibold text-gray-500">AI-Generated BOQ</span>
      </div>
      <div className="space-y-1.5">
        {rows.map((r) => (
          <div key={r.item} className="flex items-center justify-between rounded-md bg-gray-50 px-2 py-1">
            <span className="text-[9px] text-gray-600">{r.item}</span>
            <div className="flex gap-2">
              <span className="text-[9px] tabular-nums text-gray-400">{r.qty}</span>
              <span className="text-[9px] tabular-nums font-semibold text-gray-700">{r.cost}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 border-t border-gray-200/60 pt-1.5 text-right">
        <span className="text-[10px] font-bold text-violet-600">Total: $14,600</span>
      </div>
    </div>
  );
}

function ScheduleMockup() {
  const bars = [
    { label: 'Foundation', w: 'w-[65%]', color: 'bg-emerald-400' },
    { label: 'Framing', w: 'w-[45%]', color: 'bg-emerald-300' },
    { label: 'Electrical', w: 'w-[25%]', color: 'bg-emerald-200' },
  ];
  return (
    <div className="mx-auto w-full max-w-[220px] rounded-xl border border-gray-200/60 bg-white p-3 shadow-sm">
      <div className="mb-2 flex items-center gap-1.5">
        <div className="h-2 w-2 rounded-full bg-emerald-400" />
        <span className="text-[9px] font-semibold text-gray-500">Schedule Progress</span>
      </div>
      <div className="space-y-2">
        {bars.map((b) => (
          <div key={b.label}>
            <div className="mb-0.5 flex items-center justify-between">
              <span className="text-[9px] text-gray-500">{b.label}</span>
              <span className="text-[9px] font-medium text-gray-400">
                {b.w === 'w-[65%]' ? '65%' : b.w === 'w-[45%]' ? '45%' : '25%'}
              </span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-gray-100">
              <div className={`h-1.5 rounded-full ${b.color} ${b.w}`} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-1 rounded-md bg-emerald-50 px-2 py-1">
        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        <span className="text-[9px] font-medium text-emerald-700">On Track</span>
      </div>
    </div>
  );
}

/* ── Card Data ── */
const workflows = [
  {
    icon: ClipboardList,
    gradient: 'from-blue-400 to-blue-600',
    title: 'Post a Project',
    subtitle: 'Homeowner Flow',
    description:
      'Describe your project, upload photos, and receive verified bids from licensed pros — all in minutes.',
    Mockup: ProjectFormMockup,
    href: '/post-job',
    cta: 'Post a Job',
  },
  {
    icon: Calculator,
    gradient: 'from-violet-400 to-violet-600',
    title: 'Bid with BOQ',
    subtitle: 'Pro Flow',
    description:
      'AI generates a Bill of Quantities from project specs. Pros bid on real numbers — no guesswork.',
    Mockup: BOQMockup,
    href: '/for-contractors',
    cta: 'See BOQ Engine',
  },
  {
    icon: CalendarCheck,
    gradient: 'from-emerald-400 to-emerald-600',
    title: 'Run the Site + Closeout',
    subtitle: 'Field Flow',
    description:
      'Schedule, track crew, log safety, and close milestones — everything runs from one mobile app.',
    Mockup: ScheduleMockup,
    href: '/pro-network',
    cta: 'Explore Field',
  },
] as const;

export function ProductsSuite() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-24 md:py-32">
      {/* Blueprint overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-blueprint opacity-[0.04]"
      />

      <div className="container relative z-10 mx-auto px-4">
        <ScrollReveal>
          <div className="mx-auto max-w-2xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-600">
              Three Workflows, One Platform
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl">
              Everything You Need to Build Better
            </h2>
            <p className="mt-4 text-lg text-slate-500">
              Whether you&apos;re a homeowner, project manager, or contractor — RenoNext
              has the right tool for you.
            </p>
          </div>
        </ScrollReveal>

        <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-3">
          {workflows.map((w, i) => {
            const Mockup = w.Mockup;
            return (
              <ScrollReveal key={w.title} delay={i * 0.1}>
                <Link
                  href={w.href}
                  className="group flex h-full flex-col rounded-2xl border border-gray-200/60 bg-white/80 p-6 shadow-sm backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/60"
                >
                  <div className="mb-4 flex items-start justify-between">
                    <GradientIcon icon={w.icon} gradient={w.gradient} size="md" />
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-[11px] font-medium text-slate-500">
                      {w.subtitle}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">{w.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-500">
                    {w.description}
                  </p>

                  {/* UI Mockup */}
                  <div className="my-6 flex-1">
                    <Mockup />
                  </div>

                  <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-700 transition-colors group-hover:text-slate-900">
                    {w.cta}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </Link>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
