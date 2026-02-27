'use client';

import {
  Banknote,
  ShieldCheck,
  ClipboardCheck,
  ArrowRight,
  CheckCircle,
  Lock,
  Unlock,
  BadgeCheck,
  Shield,
} from 'lucide-react';
import { GradientIcon } from './_shared/gradient-icon';
import { ScrollReveal } from './_animations/scroll-reveal';

const steps = [
  {
    num: '01',
    icon: Banknote,
    gradient: 'from-blue-400 to-blue-600',
    title: 'Fund the Project',
    desc: 'Client deposits are held in a milestone-protected account. No contractor touches a dollar until work is approved.',
  },
  {
    num: '02',
    icon: ShieldCheck,
    gradient: 'from-amber-400 to-amber-600',
    title: 'Funds Secured',
    desc: 'Money is secured and visible to both parties. The contractor knows it exists — you know it can\'t move without your say.',
  },
  {
    num: '03',
    icon: ClipboardCheck,
    gradient: 'from-violet-400 to-violet-600',
    title: 'Milestone Verified',
    desc: 'GPS photos, delivery receipts, and quantities are cross-checked against the original plan. Math confirms the work — not trust.',
  },
  {
    num: '04',
    icon: CheckCircle,
    gradient: 'from-emerald-400 to-emerald-600',
    title: 'Verified Release',
    desc: 'You review. You approve. The contractor is paid within 24 hours. No chasing. No awkward calls. No delays.',
  },
];

const trustBadges = [
  { icon: Lock, label: 'Bank-Grade Security', gradient: 'from-blue-400 to-blue-600' },
  { icon: ShieldCheck, label: 'Milestone-Protected Funds', gradient: 'from-emerald-400 to-emerald-600' },
  { icon: BadgeCheck, label: 'Licensed & Insured Pros', gradient: 'from-amber-400 to-amber-600' },
  { icon: CheckCircle, label: 'Verified Releases', gradient: 'from-violet-400 to-violet-600' },
];

const trustSignals = [
  'Milestone-Protected Releases',
  'QS-Verified Quantities',
  'Built-In Dispute Resolution',
  'Bank-Grade Encryption',
];

/* ── Vault Diagram SVG ── */
function VaultDiagram() {
  return (
    <div className="mx-auto flex max-w-md items-center justify-center gap-3 py-2">
      {/* Lock */}
      <div className="flex flex-col items-center gap-1">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/20">
          <Lock className="h-5 w-5 text-blue-400" />
        </div>
        <span className="text-[9px] font-medium text-slate-500">Deposit</span>
      </div>

      {/* Arrow */}
      <div className="flex h-px w-8 items-center bg-gradient-to-r from-blue-400/40 to-amber-400/40">
        <ArrowRight className="ml-auto -mr-1.5 h-3 w-3 text-white/30" />
      </div>

      {/* Shield */}
      <div className="flex flex-col items-center gap-1">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/20">
          <Shield className="h-5 w-5 text-amber-400" />
        </div>
        <span className="text-[9px] font-medium text-slate-500">Secured</span>
      </div>

      {/* Arrow */}
      <div className="flex h-px w-8 items-center bg-gradient-to-r from-amber-400/40 to-violet-400/40">
        <ArrowRight className="ml-auto -mr-1.5 h-3 w-3 text-white/30" />
      </div>

      {/* Verify */}
      <div className="flex flex-col items-center gap-1">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-500/20">
          <ClipboardCheck className="h-5 w-5 text-violet-400" />
        </div>
        <span className="text-[9px] font-medium text-slate-500">Verified</span>
      </div>

      {/* Arrow */}
      <div className="flex h-px w-8 items-center bg-gradient-to-r from-violet-400/40 to-emerald-400/40">
        <ArrowRight className="ml-auto -mr-1.5 h-3 w-3 text-white/30" />
      </div>

      {/* Unlock */}
      <div className="flex flex-col items-center gap-1">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20">
          <Unlock className="h-5 w-5 text-emerald-400" />
        </div>
        <span className="text-[9px] font-medium text-slate-500">Released</span>
      </div>
    </div>
  );
}

export function EscrowSafe() {
  return (
    <section className="relative overflow-hidden bg-slate-900 py-20 md:py-28">
      {/* Subtle top/bottom gradient edges */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />

      {/* Blueprint overlay on dark bg */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-blueprint opacity-[0.03]"
      />

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* ── Header ── */}
          <ScrollReveal>
            <div className="mx-auto max-w-3xl text-center">
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-emerald-400">
                Secured Funds Vault
              </p>

              <h2 className="text-3xl font-extrabold tracking-tight text-white md:text-4xl lg:text-[2.75rem] lg:leading-[1.15]">
                Your Money Moves Only When{' '}
                <br className="hidden sm:block" />
                the Work Is Verified.
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-400 md:text-lg">
                Every dollar sits in a milestone-protected vault until site
                data matches the plan. No blind deposits. No premature releases.
                The system verifies — then you decide.
              </p>
            </div>
          </ScrollReveal>

          {/* ── Vault Diagram ── */}
          <ScrollReveal delay={0.1}>
            <div className="mx-auto mt-10 max-w-lg">
              <VaultDiagram />
            </div>
          </ScrollReveal>

          {/* ── 4-Step Flow ── */}
          <div className="mx-auto mt-14 max-w-5xl">
            <div className="relative grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {/* Connector line — desktop */}
              <div
                className="pointer-events-none absolute left-[12.5%] right-[12.5%] top-[52px] hidden h-px bg-gradient-to-r from-white/[0.04] via-white/10 to-white/[0.04] lg:block"
                aria-hidden="true"
              />

              {steps.map((step, i) => (
                <ScrollReveal key={step.num} delay={i * 0.08}>
                  <div className="relative flex flex-col">
                    {/* Arrow between cards — desktop */}
                    {i < 3 && (
                      <div className="pointer-events-none absolute -right-3 top-[48px] z-10 hidden lg:block">
                        <ArrowRight className="h-4 w-4 text-white/20" />
                      </div>
                    )}

                    <div className="flex h-full flex-col rounded-2xl border border-white/[0.06] bg-white/[0.03] px-6 pb-7 pt-6 backdrop-blur-sm transition-colors duration-300 hover:border-white/[0.1] hover:bg-white/[0.05]">
                      {/* Step number + icon */}
                      <div className="mb-5 flex items-center gap-3">
                        <GradientIcon
                          icon={step.icon}
                          gradient={step.gradient}
                          size="sm"
                          glow
                        />
                        <span className="text-xs font-bold tabular-nums tracking-wider text-white/25">
                          STEP {step.num}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="mb-2 text-[15px] font-bold text-white">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm leading-relaxed text-slate-400">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* ── Trust Badge Cards ── */}
          <ScrollReveal delay={0.2}>
            <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4">
              {trustBadges.map((badge) => (
                <div
                  key={badge.label}
                  className="flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-5 backdrop-blur"
                >
                  <GradientIcon
                    icon={badge.icon}
                    gradient={badge.gradient}
                    size="sm"
                  />
                  <span className="text-center text-xs font-medium text-slate-300">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* ── Vault Status Bar ── */}
          <div className="mx-auto mt-8 max-w-5xl">
            <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-white/[0.06] bg-white/[0.02] px-6 py-5 sm:flex-row sm:gap-6 sm:px-8">
              <div className="flex items-center gap-3">
                <GradientIcon
                  icon={ShieldCheck}
                  gradient="from-emerald-400 to-emerald-600"
                  size="sm"
                />
                <div>
                  <p className="text-sm font-bold text-white">
                    Vault Protected
                  </p>
                  <p className="text-xs text-slate-500">
                    Funds secured — pending verification
                  </p>
                </div>
              </div>

              {/* Trust chips */}
              <div className="flex flex-wrap items-center justify-center gap-2">
                {trustSignals.map((signal) => (
                  <span
                    key={signal}
                    className="flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.03] px-3 py-1 text-[11px] font-medium text-slate-400"
                  >
                    <CheckCircle className="h-3 w-3 text-emerald-500/70" />
                    {signal}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* ── Credibility + Emotional Close ── */}
          <div className="mx-auto mt-10 max-w-2xl text-center">
            <p className="text-sm leading-relaxed text-slate-500">
              Structured for Canadian residential construction — permits,
              inspections, municipal holds, and HST-compliant milestone
              releases.
            </p>
            <p className="mt-5 text-lg font-semibold tracking-tight text-white">
              You approve. Then money moves.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
