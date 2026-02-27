'use client';

import Image from 'next/image';
import { m, type Variants } from 'framer-motion';
import { CheckCircle2, MapPin, Sparkles, Camera } from 'lucide-react';

/* ═══════════════════════════════════════════════════════════
   Floating Elements — premium glassmorphism badges
   Stagger in after the laptop entrance animation
   ═══════════════════════════════════════════════════════════ */

const ease: [number, number, number, number] = [0.22, 0.68, 0, 1.0];

const glass =
  'border border-white/[0.08] bg-[#0d1117]/80 shadow-2xl shadow-black/40 backdrop-blur-xl';

const toastVariants: Variants = {
  hidden: { opacity: 0, x: 24, scale: 0.92 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.6, ease, delay: 2.5 },
  },
};

const gpsBadgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8, y: 8 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease, delay: 3.0 },
  },
};

const safetyBadgeVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5, y: 12 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.34, 1.56, 0.64, 1],
      delay: 3.5,
    },
  },
};

const photoVariants: Variants = {
  hidden: { opacity: 0, x: -20, scale: 0.9 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { duration: 0.5, ease, delay: 4.0 },
  },
};

const aiVariants: Variants = {
  hidden: { opacity: 0, y: -16, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease, delay: 4.5 },
  },
};

interface HeroFloatingElementsProps {
  siteThumb?: string;
}

export function HeroFloatingElements({ siteThumb }: HeroFloatingElementsProps) {
  return (
    <>
      {/* ── 1. Notification toast — top right ── */}
      <m.div
        variants={toastVariants}
        initial="hidden"
        animate="visible"
        className="absolute -right-6 top-6 z-20 hidden lg:block"
      >
        <div className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 ${glass}`}>
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 ring-1 ring-emerald-500/20">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" />
          </div>
          <div>
            <p className="text-[11px] font-semibold text-white">Inspection Passed</p>
            <p className="text-[9px] text-slate-400">Zone C — Structural</p>
          </div>
          <span className="ml-2 text-[8px] tabular-nums text-slate-500">2m ago</span>
        </div>
      </m.div>

      {/* ── 2. GPS badge — bottom left ── */}
      <m.div
        variants={gpsBadgeVariants}
        initial="hidden"
        animate="visible"
        className="absolute -left-5 bottom-28 z-20 hidden lg:block"
      >
        <div className={`flex items-center gap-2 rounded-xl px-3 py-2 ${glass}`}>
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-blue-500/15 ring-1 ring-blue-500/20">
            <MapPin className="h-3 w-3 text-blue-400" />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-white">GPS Verified</p>
            <p className="text-[8px] text-slate-400">6 crew on-site</p>
          </div>
        </div>
      </m.div>

      {/* ── 3. Safety score ring — bottom right ── */}
      <m.div
        variants={safetyBadgeVariants}
        initial="hidden"
        animate="visible"
        className="absolute -right-3 bottom-24 z-20 hidden lg:block"
      >
        <div className={`flex items-center gap-2.5 rounded-xl px-3 py-2.5 ${glass}`}>
          <div className="relative">
            <svg viewBox="0 0 36 36" className="h-9 w-9">
              <circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                stroke="rgba(255,255,255,0.06)"
                strokeWidth="3"
              />
              <circle
                cx="18"
                cy="18"
                r="14"
                fill="none"
                stroke="url(#safety-ring-grad)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={`${(94 / 100) * 88} 88`}
                transform="rotate(-90 18 18)"
              />
              <defs>
                <linearGradient id="safety-ring-grad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#10B981" />
                  <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[9px] font-extrabold tabular-nums text-emerald-400">94</span>
            </div>
          </div>
          <div>
            <p className="text-[10px] font-semibold text-white">Safety Score</p>
            <p className="text-[8px] text-slate-400">Out of 100</p>
          </div>
        </div>
      </m.div>

      {/* ── 4. Live site photo — left side ── */}
      <m.div
        variants={photoVariants}
        initial="hidden"
        animate="visible"
        className="absolute -left-8 top-16 z-20 hidden lg:block"
      >
        <div className={`overflow-hidden rounded-xl ${glass} p-1.5`}>
          <div className="relative h-[72px] w-[100px] overflow-hidden rounded-lg">
            {siteThumb ? (
              <Image
                src={siteThumb}
                alt="Live site"
                fill
                className="object-cover"
                sizes="100px"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-slate-800 to-slate-900" />
            )}
            {/* Live badge */}
            <div className="absolute left-1 top-1 flex items-center gap-1 rounded bg-red-500/90 px-1 py-0.5">
              <span className="h-1 w-1 animate-pulse rounded-full bg-white" />
              <span className="text-[6px] font-bold text-white">LIVE</span>
            </div>
          </div>
          <div className="mt-1 flex items-center gap-1 px-0.5">
            <Camera className="h-2 w-2 text-slate-500" />
            <span className="text-[7px] text-slate-400">Bay 4 — Foundation</span>
          </div>
        </div>
      </m.div>

      {/* ── 5. AI Estimate badge — top center ── */}
      <m.div
        variants={aiVariants}
        initial="hidden"
        animate="visible"
        className="absolute -top-3 left-1/2 z-20 hidden -translate-x-1/2 lg:block"
      >
        <div className={`flex items-center gap-2 rounded-xl px-3.5 py-2 ${glass}`}>
          <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-violet-500/15 ring-1 ring-violet-500/20">
            <Sparkles className="h-3 w-3 text-violet-400" />
          </div>
          <div>
            <p className="text-[10px] font-semibold text-white">AI Estimate Ready</p>
            <p className="text-[8px] text-slate-400">97% confidence · $4.2M</p>
          </div>
        </div>
      </m.div>
    </>
  );
}
