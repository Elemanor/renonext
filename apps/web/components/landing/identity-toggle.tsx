'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Shield, HardHat, ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { GradientIcon } from './_shared/gradient-icon';

const lanes = [
  {
    icon: Shield,
    gradient: 'from-emerald-400 to-emerald-600',
    label: 'For Property Owners',
    headline: 'Protect your money.\nSee everything happening.',
    secondary: 'Your money moves only after proof.',
    microcopy: 'No blind deposits. No mystery invoices. No guessing.',
    features: [
      'Milestone-Protected Payments',
      'Daily Site Forecasts',
      'GPS-Verified Crew Attendance',
      'Permanent Digital Property Record',
    ],
    cta: 'Start Project Safely',
    ctaSub: 'Free to start. No upfront platform fees.',
    href: '/start-project',
    checkColor: 'text-emerald-500',
    ctaStyle: 'bg-emerald-600 text-white hover:bg-emerald-700',
    photo: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&fit=crop',
    photoAlt: 'Modern home exterior — RenoNext property owner experience',
  },
  {
    icon: HardHat,
    gradient: 'from-zinc-500 to-zinc-700',
    label: 'For Professionals',
    headline: 'Protect your margin.\nRun the job — not the paperwork.',
    secondary: 'Stop unpaid estimating. Stop chasing payment.',
    microcopy: 'Pre-calculated quantities. Secured funds. Next-day payouts.',
    features: [
      'AI-Generated Quantities (BOQ)',
      'Next-Day Payouts',
      'Automated WSIB & Safety Logs',
      'GTA-Specific Reality Logic',
    ],
    cta: 'Join Pro Network',
    ctaSub: 'Free to join. You only pay when you get paid.',
    href: '/for-contractors',
    checkColor: 'text-zinc-400',
    ctaStyle: 'bg-zinc-900 text-white hover:bg-zinc-800',
    photo: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&fit=crop',
    photoAlt: 'Active construction site — RenoNext professional experience',
  },
] as const;

export function IdentityToggle() {
  return (
    <section className="bg-zinc-100/60 py-20 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Bridge headline */}
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl">
              Two very different roles. One system.
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base text-zinc-500">
              Whether you&apos;re funding the project or building it — RenoNext
              protects what matters most.
            </p>
          </div>

          {/* Two-card grid */}
          <div className="grid gap-6 md:grid-cols-2 md:gap-8">
            {lanes.map((lane) => (
              <motion.div
                key={lane.headline}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                className="group relative"
              >
                {/* Glow effect on hover */}
                <div className={`absolute -inset-0.5 rounded-[2rem] bg-gradient-to-r ${lane.gradient} opacity-0 blur transition duration-500 group-hover:opacity-20`} />
                
                <Link
                  href={lane.href}
                  className="relative flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-md shadow-zinc-900/[0.04] transition-shadow duration-300 hover:shadow-xl hover:shadow-zinc-900/[0.08] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-900/20 focus-visible:ring-offset-2"
                >
                  {/* Photo banner */}
                  <div className="relative h-44 w-full overflow-hidden md:h-52">
                    <Image
                      src={lane.photo}
                      alt={lane.photoAlt}
                      fill
                      sizes="(max-width:768px) 100vw, 40vw"
                      quality={80}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Gradient overlay fading to white */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
                  </div>

                  <div className="flex flex-1 flex-col px-10 pb-10 pt-6">
                    {/* Icon */}
                    <div className="mb-6">
                      <GradientIcon
                        icon={lane.icon}
                        gradient={lane.gradient}
                        size="md"
                      />
                    </div>

                    {/* Category label */}
                    <p className="mb-2 text-sm font-medium text-zinc-400">
                      {lane.label}
                    </p>

                    {/* Headline */}
                    <h3 className="whitespace-pre-line text-[1.65rem] font-bold leading-[1.2] tracking-tight text-zinc-900">
                      {lane.headline}
                    </h3>

                    {/* Secondary tagline */}
                    <p className="mt-2 text-sm font-semibold text-emerald-600">
                      {lane.secondary}
                    </p>

                    {/* Emotional microcopy */}
                    <p className="mt-2 text-sm text-zinc-500">
                      {lane.microcopy}
                    </p>

                    {/* Feature list */}
                    <ul className="mt-8 flex-1 space-y-4">
                      {lane.features.map((f) => (
                        <li key={f} className="flex items-center gap-3">
                          <Check className={`h-[18px] w-[18px] shrink-0 ${lane.checkColor}`} strokeWidth={2.5} />
                          <span className="text-[15px] text-zinc-600">{f}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA button */}
                    <div className="mt-6">
                      <span
                        className={`flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-semibold transition-all duration-200 sm:w-auto sm:rounded-full sm:px-8 ${lane.ctaStyle}`}
                      >
                        {lane.cta}
                        <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                      </span>
                      {/* Friction remover */}
                      <p className="mt-2.5 text-center text-xs text-zinc-400 sm:text-left">
                        {lane.ctaSub}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
