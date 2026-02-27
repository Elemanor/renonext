'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import {
  Bell,
  Calendar,
  Camera,
  CheckCircle2,
  Circle,
  Clock,
  DollarSign,
  HardHat,
  Lock,
  MapPin,
  Shield,
  TrendingUp,
  Truck,
  Users,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════
   Hi-res bento dashboard — rendered at 960px, CSS-scaled down
   to fit the laptop frame. All sizes are "real" (10-20px).
   ═══════════════════════════════════════════════════════════ */

const NATIVE_W = 960;

const ease: [number, number, number, number] = [0.22, 0.68, 0, 1.0];
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.15 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.4, ease } },
};

const PHOTOS = {
  aerial:
    'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80&auto=format&fit=crop',
  crew: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80&auto=format&fit=crop',
};

const crewMembers = [
  { initials: 'AN', grad: 'from-indigo-500 to-indigo-600', on: true },
  { initials: 'AH', grad: 'from-rose-500 to-rose-600', on: true },
  { initials: 'DP', grad: 'from-amber-500 to-amber-600', on: true },
  { initials: 'ED', grad: 'from-emerald-500 to-emerald-600', on: true },
  { initials: 'KF', grad: 'from-blue-500 to-blue-600', on: false },
  { initials: 'MS', grad: 'from-violet-500 to-violet-600', on: false },
];

const milestones = [
  { label: 'Foundation Pour', status: 'Paid', done: true, amount: '$45,000' },
  { label: 'Framing Complete', status: 'Pending', done: false, amount: '$32,500' },
  { label: 'Rough-in MEP', status: 'Upcoming', done: false, amount: '$28,000' },
];

const tasks = [
  { label: 'City Inspection', sub: 'Inspector · 1-3 PM', icon: Shield, color: 'text-amber-400', bg: 'bg-amber-500/10', border: 'border-amber-500/20', dot: 'bg-amber-400' },
  { label: 'Material Delivery', sub: '14 yd dumpster', icon: Truck, color: 'text-blue-400', bg: 'bg-blue-500/10', border: 'border-blue-500/20', dot: 'bg-blue-400' },
  { label: 'Concrete Pour', sub: 'Bay 4 · Weather OK', icon: HardHat, color: 'text-emerald-400', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', dot: 'bg-emerald-400' },
];

export function HeroDashboardV2() {
  const prefersReduced = useReducedMotion();
  const skip = prefersReduced ?? false;

  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / NATIVE_W);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      {/* Outer wrapper — measures real width, scales inner 960px content */}
      <div
        ref={containerRef}
        className="w-full overflow-hidden bg-[#0a0e17]"
        style={{ aspectRatio: `${NATIVE_W} / 620` }}
      >
        <div
          className="origin-top-left"
          style={{
            width: NATIVE_W,
            transform: `scale(${scale})`,
          }}
        >
          <m.div
            initial={skip ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease }}
            className="select-none text-white"
            style={{ width: NATIVE_W }}
          >
            {/* ── Browser chrome ── */}
            <div className="flex items-center gap-2 border-b border-white/[0.06] bg-[#070a12] px-5 py-2.5">
              <div className="flex gap-[5px]">
                <span className="h-[10px] w-[10px] rounded-full bg-[#ff5f57]/80" />
                <span className="h-[10px] w-[10px] rounded-full bg-[#febc2e]/80" />
                <span className="h-[10px] w-[10px] rounded-full bg-[#28c840]/80" />
              </div>
              <div className="ml-3 flex flex-1 items-center gap-1.5 rounded-lg bg-white/[0.04] px-3 py-1">
                <Lock className="h-3 w-3 text-emerald-400/60" />
                <span className="text-[11px] text-slate-500">
                  app.renonext.com/command-center
                </span>
              </div>
            </div>

            {/* ── App header ── */}
            <div className="flex items-center justify-between border-b border-white/[0.06] px-5 py-2.5">
              <div className="flex items-center gap-2.5">
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-sm shadow-emerald-500/25">
                  <span className="text-[8px] font-black text-white">RN</span>
                </div>
                <span className="text-[13px] font-bold tracking-wide text-white/90">
                  RenoNext
                </span>
                <div className="h-4 w-px bg-white/[0.08]" />
                <span className="text-[11px] font-medium text-slate-400">
                  Command Center
                </span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1.5 text-[10px] text-slate-500">
                  <Clock className="h-3.5 w-3.5" />
                  <span className="tabular-nums">Feb 24, 2026</span>
                </div>
                <div className="relative">
                  <Bell className="h-4 w-4 text-slate-500" />
                  <span className="absolute -right-1 -top-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-blue-500 text-[7px] font-bold text-white ring-2 ring-[#0a0e17]">
                    3
                  </span>
                </div>
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-violet-500 ring-2 ring-white/[0.06]">
                  <span className="text-[8px] font-bold text-white">PV</span>
                </div>
              </div>
            </div>

            {/* ── Dashboard body ── */}
            <m.div
              variants={stagger}
              initial={skip ? 'show' : 'hidden'}
              animate="show"
              className="space-y-3 p-4"
            >
              {/* ─── Row 1: Site photo + Budget ─── */}
              <div className="grid grid-cols-[1.4fr_1fr] gap-3">
                {/* Large aerial photo */}
                <m.div
                  variants={fadeUp}
                  className="relative overflow-hidden rounded-2xl border border-white/[0.06]"
                >
                  <div className="relative h-[180px]">
                    <Image
                      src={PHOTOS.aerial}
                      alt="Project site aerial"
                      fill
                      className="object-cover"
                      sizes="560px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e17] via-[#0a0e17]/30 to-transparent" />
                    {/* LIVE pill */}
                    <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/60 px-2.5 py-1 backdrop-blur-sm">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-60" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-red-400" />
                      </span>
                      <span className="text-[10px] font-bold text-white">LIVE</span>
                    </div>
                    {/* Photo count */}
                    <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/60 px-2 py-1 backdrop-blur-sm">
                      <Camera className="h-3 w-3 text-white/70" />
                      <span className="text-[10px] font-bold text-white/70">24</span>
                    </div>
                    {/* Bottom info */}
                    <div className="absolute inset-x-0 bottom-0 p-3.5">
                      <p className="text-[13px] font-bold text-white">
                        42 Maple Drive — Bay 4 Foundation
                      </p>
                      <div className="mt-1 flex items-center gap-3">
                        <span className="flex items-center gap-1 text-[10px] text-slate-300">
                          <MapPin className="h-3 w-3 text-emerald-400" />
                          Lakeview, Mississauga
                        </span>
                        <span className="text-[10px] text-slate-500">Day 14 of 42</span>
                      </div>
                    </div>
                  </div>
                </m.div>

                {/* Budget overview */}
                <m.div
                  variants={fadeUp}
                  className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4"
                >
                  <div className="mb-3 flex items-center gap-1.5">
                    <DollarSign className="h-4 w-4 text-emerald-400/70" />
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                      Budget Overview
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    {/* Progress ring */}
                    <div className="relative shrink-0">
                      <svg viewBox="0 0 80 80" className="h-[72px] w-[72px]">
                        <circle
                          cx="40" cy="40" r="32"
                          fill="none"
                          stroke="rgba(255,255,255,0.04)"
                          strokeWidth="6"
                        />
                        <circle
                          cx="40" cy="40" r="32"
                          fill="none"
                          stroke="url(#bgt-ring)"
                          strokeWidth="6"
                          strokeLinecap="round"
                          strokeDasharray={`${0.25 * 201} 201`}
                          transform="rotate(-90 40 40)"
                        />
                        <defs>
                          <linearGradient id="bgt-ring" x1="0" y1="0" x2="1" y2="1">
                            <stop offset="0%" stopColor="#3B82F6" />
                            <stop offset="100%" stopColor="#10B981" />
                          </linearGradient>
                        </defs>
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-[16px] font-extrabold tabular-nums text-white">25%</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-[22px] font-extrabold tabular-nums leading-none text-white">
                        $156,400
                      </p>
                      <p className="mt-1 text-[10px] text-slate-500">
                        of $625,000 total budget
                      </p>
                      <div className="mt-2 flex items-center gap-1">
                        <TrendingUp className="h-3 w-3 text-emerald-400" />
                        <span className="text-[10px] font-semibold text-emerald-400">On track</span>
                      </div>
                    </div>
                  </div>
                  {/* Spent / Remaining */}
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {[
                      { label: 'Spent', val: '$156.4K', color: 'text-blue-400', bar: 'bg-blue-500', w: '25%' },
                      { label: 'Remaining', val: '$468.6K', color: 'text-emerald-400', bar: 'bg-emerald-500', w: '75%' },
                    ].map((s) => (
                      <div
                        key={s.label}
                        className="rounded-xl border border-white/[0.04] bg-white/[0.02] px-3 py-2"
                      >
                        <p className="text-[8px] font-semibold uppercase tracking-wider text-slate-600">
                          {s.label}
                        </p>
                        <p className={`text-[14px] font-extrabold tabular-nums ${s.color}`}>
                          {s.val}
                        </p>
                        <div className="mt-1 h-[3px] overflow-hidden rounded-full bg-white/[0.04]">
                          <div className={`h-full rounded-full ${s.bar}`} style={{ width: s.w }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </m.div>
              </div>

              {/* ─── Row 2: On-site Verification + Milestone Payment ─── */}
              <div className="grid grid-cols-2 gap-3">
                {/* On-Site Verification */}
                <m.div
                  variants={fadeUp}
                  className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Users className="h-4 w-4 text-blue-400/70" />
                      <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                        On-Site Verification
                      </p>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                      </span>
                      <span className="text-[10px] font-bold text-emerald-400">
                        4 on site
                      </span>
                    </div>
                  </div>

                  {/* Crew avatars */}
                  <div className="mb-3 flex items-center gap-2">
                    <div className="flex -space-x-2">
                      {crewMembers.map((c) => (
                        <div key={c.initials} className="relative">
                          <div
                            className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${c.grad} ring-2 ring-[#0a0e17]`}
                          >
                            <span className="text-[9px] font-extrabold text-white">
                              {c.initials}
                            </span>
                          </div>
                          {c.on && (
                            <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-emerald-400 ring-[1.5px] ring-[#0a0e17]" />
                          )}
                        </div>
                      ))}
                    </div>
                    <span className="text-[10px] text-slate-500">4/6 verified</span>
                  </div>

                  {/* Crew photo */}
                  <div className="relative mb-3 h-[72px] overflow-hidden rounded-xl">
                    <Image
                      src={PHOTOS.crew}
                      alt="Crew on site"
                      fill
                      className="object-cover"
                      sizes="460px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e17]/60 to-transparent" />
                    <div className="absolute bottom-2 left-2 flex items-center gap-1 rounded-lg border border-emerald-500/25 bg-emerald-500/20 px-2 py-1 backdrop-blur-sm">
                      <CheckCircle2 className="h-3 w-3 text-emerald-400" />
                      <span className="text-[10px] font-bold text-emerald-300">
                        GPS Verified
                      </span>
                    </div>
                    <div className="absolute bottom-2 right-2 flex items-center gap-1 rounded-lg bg-black/50 px-2 py-1 backdrop-blur-sm">
                      <Clock className="h-3 w-3 text-white/60" />
                      <span className="text-[9px] tabular-nums text-white/60">
                        6:02 AM
                      </span>
                    </div>
                  </div>

                  {/* Stat cards */}
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { icon: MapPin, label: 'Location', val: 'On-site', color: 'text-emerald-400' },
                      { icon: Shield, label: 'Safety', val: 'JSA Signed', color: 'text-blue-400' },
                      { icon: Camera, label: 'Photos', val: '24 today', color: 'text-violet-400' },
                    ].map((v) => (
                      <div
                        key={v.label}
                        className="rounded-xl border border-white/[0.04] bg-white/[0.02] px-2 py-2 text-center"
                      >
                        <v.icon className={`mx-auto h-4 w-4 ${v.color}`} />
                        <p className="mt-1 text-[8px] font-semibold uppercase tracking-wider text-slate-600">
                          {v.label}
                        </p>
                        <p className={`text-[10px] font-bold ${v.color}`}>{v.val}</p>
                      </div>
                    ))}
                  </div>
                </m.div>

                {/* Milestone Payment */}
                <m.div
                  variants={fadeUp}
                  className="flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4"
                >
                  <div className="mb-3 flex items-center gap-1.5">
                    <DollarSign className="h-4 w-4 text-emerald-400/70" />
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                      Milestone Payment
                    </p>
                  </div>

                  {/* Hero card */}
                  <div className="relative mb-3 overflow-hidden rounded-xl border border-emerald-500/15 bg-gradient-to-br from-emerald-500/[0.08] via-transparent to-blue-500/[0.04] p-4">
                    <div className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-emerald-500/[0.08] blur-2xl" />
                    <p className="text-[8px] font-semibold uppercase tracking-widest text-slate-500">
                      Next Release
                    </p>
                    <p className="mt-1 text-[32px] font-extrabold tabular-nums leading-none tracking-tight text-white">
                      $32,500
                    </p>
                    <div className="mt-2 flex items-center gap-1.5">
                      <span className="relative flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                      </span>
                      <span className="text-[10px] font-bold text-emerald-400">
                        Funds Secured in Vault
                      </span>
                    </div>
                  </div>

                  {/* Milestones list */}
                  <div className="flex-1 space-y-2">
                    {milestones.map((ms) => (
                      <div
                        key={ms.label}
                        className="flex items-center gap-2.5 rounded-xl border border-white/[0.04] bg-white/[0.02] px-3 py-2"
                      >
                        {ms.done ? (
                          <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" />
                        ) : (
                          <div className="relative flex h-4 w-4 shrink-0 items-center justify-center">
                            <Circle className="h-4 w-4 text-slate-700" />
                            {ms.status === 'Pending' && (
                              <div className="absolute h-1.5 w-1.5 animate-pulse rounded-full bg-amber-400" />
                            )}
                          </div>
                        )}
                        <span className="flex-1 text-[11px] font-medium text-slate-300">
                          {ms.label}
                        </span>
                        <span className="text-[11px] font-bold tabular-nums text-white/70">
                          {ms.amount}
                        </span>
                        <span
                          className={`rounded-md px-1.5 py-0.5 text-[8px] font-bold ${
                            ms.done
                              ? 'bg-emerald-500/15 text-emerald-400'
                              : ms.status === 'Pending'
                                ? 'bg-amber-500/15 text-amber-400'
                                : 'bg-white/[0.04] text-slate-500'
                          }`}
                        >
                          {ms.done ? 'Paid' : ms.status}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Escrow footer */}
                  <div className="mt-3 flex items-center gap-1.5 rounded-xl border border-emerald-500/10 bg-emerald-500/[0.04] px-3 py-2">
                    <Lock className="h-3.5 w-3.5 text-emerald-400/50" />
                    <span className="text-[10px] text-slate-400">
                      Escrow protected · No funds requested today
                    </span>
                  </div>
                </m.div>
              </div>

              {/* ─── Row 3: Today's Schedule ─── */}
              <m.div
                variants={fadeUp}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-4"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-4 w-4 text-violet-400/70" />
                    <p className="text-[10px] font-semibold uppercase tracking-widest text-slate-500">
                      Today&apos;s Schedule
                    </p>
                  </div>
                  <span className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 text-[10px] font-bold tabular-nums text-slate-400">
                    3 tasks · 1 inspection
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2.5">
                  {tasks.map((task) => (
                    <div
                      key={task.label}
                      className={`rounded-xl border ${task.border} ${task.bg} p-3`}
                    >
                      <div className="mb-1.5 flex items-center gap-1.5">
                        <task.icon className={`h-4 w-4 ${task.color}`} />
                        <p className={`text-[11px] font-bold ${task.color}`}>
                          {task.label}
                        </p>
                      </div>
                      <p className="text-[10px] text-slate-400">{task.sub}</p>
                    </div>
                  ))}
                </div>
              </m.div>
            </m.div>

            {/* ── Status bar ── */}
            <div className="flex items-center justify-between border-t border-white/[0.06] px-5 py-2">
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1.5 text-[10px] text-slate-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  All systems online
                </span>
                <span className="text-[10px] tabular-nums text-slate-600">24ms</span>
              </div>
              <span className="text-[10px] text-slate-600">v2.4.1</span>
            </div>
          </m.div>
        </div>
      </div>
    </LazyMotion>
  );
}
