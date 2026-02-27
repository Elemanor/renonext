'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  LazyMotion,
  domAnimation,
  m,
  AnimatePresence,
  useReducedMotion,
  type Variants,
} from 'framer-motion';
import {
  Activity,
  ArrowUpRight,
  Bell,
  Calendar,
  Camera,
  CheckCircle2,
  Clock,
  DollarSign,
  LayoutDashboard,
  Lock,
  MapPin,
  Shield,
  TrendingUp,
  Users,
  Zap,
  type LucideIcon,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════════
   Animation Tokens
   ═══════════════════════════════════════════════════════════ */

const ease: [number, number, number, number] = [0.22, 0.68, 0, 1.0];
const CYCLE_MS = 5500;

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.04 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease } },
};
const slide = {
  enter: (d: number) => ({ x: d > 0 ? 28 : -28, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.3, ease } },
  exit: (d: number) => ({
    x: d > 0 ? -28 : 28,
    opacity: 0,
    transition: { duration: 0.2, ease },
  }),
};

/* ═══════════════════════════════════════════════════════════
   Module Definitions
   ═══════════════════════════════════════════════════════════ */

interface Mod {
  id: string;
  label: string;
  Icon: LucideIcon;
}

const MODS: Mod[] = [
  { id: 'overview', label: 'Overview', Icon: LayoutDashboard },
  { id: 'schedule', label: 'Schedule', Icon: Calendar },
  { id: 'activity', label: 'Activity', Icon: Activity },
  { id: 'finance', label: 'Finance', Icon: DollarSign },
];

/* ═══════════════════════════════════════════════════════════
   1. OVERVIEW — Command Center
   ═══════════════════════════════════════════════════════════ */

function OverviewModule() {
  return (
    <m.div variants={stagger} initial="hidden" animate="show" className="p-3">
      {/* Project header */}
      <m.div variants={fadeUp} className="mb-2.5 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
            </span>
            <span className="text-[8px] font-bold text-white/90">GE Booth WTP — Phase 2</span>
          </div>
          <p className="mt-0.5 flex items-center gap-1 text-[6px] text-slate-500">
            <MapPin className="h-2 w-2" />
            Lakeview, Mississauga · 14°C Overcast
          </p>
        </div>
        <div className="rounded border border-emerald-500/20 bg-emerald-500/10 px-1.5 py-0.5">
          <span className="text-[6px] font-extrabold tracking-wider text-emerald-400">ON TRACK</span>
        </div>
      </m.div>

      {/* Main metrics row: progress ring + KPIs */}
      <m.div variants={fadeUp} className="mb-2.5 flex gap-2">
        {/* Progress ring */}
        <div className="flex shrink-0 items-center justify-center rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2">
          <div className="relative">
            <svg viewBox="0 0 100 100" className="h-[56px] w-[56px]">
              <circle
                cx="50" cy="50" r="40"
                fill="none"
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="7"
              />
              <circle
                cx="50" cy="50" r="40"
                fill="none"
                stroke="url(#hd-ring)"
                strokeWidth="7"
                strokeLinecap="round"
                strokeDasharray="168.4 251.3"
                transform="rotate(-90 50 50)"
              />
              <defs>
                <linearGradient id="hd-ring" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#10B981" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-[13px] font-extrabold tabular-nums leading-none text-white">67<span className="text-[8px] font-bold text-slate-400">%</span></span>
              <span className="mt-0.5 text-[4.5px] font-semibold uppercase tracking-widest text-slate-500">complete</span>
            </div>
          </div>
        </div>

        {/* KPI grid */}
        <div className="grid flex-1 grid-cols-2 gap-1.5">
          {[
            { label: 'Budget', value: '$2.4M', sub: 'of $4.2M', color: 'text-blue-400', bar: 'bg-blue-500', w: 'w-[57%]' },
            { label: 'Schedule', value: 'Day 145', sub: 'of 280', color: 'text-violet-400', bar: 'bg-violet-500', w: 'w-[52%]' },
            { label: 'Safety', value: '94', sub: '/ 100 score', color: 'text-emerald-400', bar: 'bg-emerald-500', w: 'w-[94%]' },
            { label: 'Quality', value: 'A+', sub: '12 inspections', color: 'text-amber-400', bar: 'bg-amber-500', w: 'w-[96%]' },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-2 py-1.5">
              <p className="text-[5px] font-semibold uppercase tracking-wider text-slate-500">{kpi.label}</p>
              <p className={`text-[11px] font-extrabold tabular-nums leading-tight ${kpi.color}`}>{kpi.value}</p>
              <div className="mt-1 h-[2px] overflow-hidden rounded-full bg-white/[0.06]">
                <div className={`h-full rounded-full ${kpi.bar} ${kpi.w}`} />
              </div>
              <p className="mt-0.5 text-[5px] tabular-nums text-slate-600">{kpi.sub}</p>
            </div>
          ))}
        </div>
      </m.div>

      {/* Recent activity feed */}
      <m.div variants={fadeUp}>
        <p className="mb-1.5 flex items-center gap-1 text-[6.5px] font-bold uppercase tracking-wider text-slate-500">
          <Activity className="h-2.5 w-2.5" />
          Recent Activity
        </p>
        <div className="space-y-[3px]">
          {[
            { t: '11:02', e: 'Concrete pour started — Bay 4 Foundation', dot: 'bg-blue-400' },
            { t: '10:45', e: 'Safety inspection passed — Zone C', dot: 'bg-emerald-400' },
            { t: '09:30', e: 'Rebar delivery received — 24 tonnes', dot: 'bg-amber-400' },
          ].map((a) => (
            <div key={a.t} className="flex items-center gap-1.5 rounded border border-white/[0.04] bg-white/[0.02] px-2 py-[5px]">
              <div className={`h-[5px] w-[5px] shrink-0 rounded-full ${a.dot}`} />
              <p className="min-w-0 flex-1 truncate text-[6.5px] text-slate-300">{a.e}</p>
              <span className="shrink-0 text-[5.5px] tabular-nums text-slate-600">{a.t}</span>
            </div>
          ))}
        </div>
      </m.div>
    </m.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   2. SCHEDULE — Timeline / Gantt
   ═══════════════════════════════════════════════════════════ */

const phases = [
  { name: 'Site Preparation', pct: 100, fill: 'bg-emerald-500', track: 'bg-emerald-500/15', s: 0, e: 18 },
  { name: 'Foundation', pct: 82, fill: 'bg-blue-500', track: 'bg-blue-500/15', s: 12, e: 40 },
  { name: 'Structural Steel', pct: 71, fill: 'bg-violet-500', track: 'bg-violet-500/15', s: 28, e: 58 },
  { name: 'Mechanical', pct: 45, fill: 'bg-cyan-500', track: 'bg-cyan-500/15', s: 42, e: 72 },
  { name: 'Electrical', pct: 34, fill: 'bg-amber-500', track: 'bg-amber-500/15', s: 48, e: 78 },
  { name: 'Finishing', pct: 12, fill: 'bg-rose-500', track: 'bg-rose-500/15', s: 65, e: 100 },
];

function ScheduleModule() {
  return (
    <m.div variants={stagger} initial="hidden" animate="show" className="p-3">
      <m.div variants={fadeUp} className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Calendar className="h-3 w-3 text-violet-400" />
          <span className="text-[8px] font-bold text-white/90">Project Timeline</span>
        </div>
        <span className="rounded border border-white/[0.06] bg-white/[0.03] px-1.5 py-0.5 text-[6px] font-bold tabular-nums text-slate-400">
          Week 21 / 40
        </span>
      </m.div>

      {/* Gantt bars */}
      <div className="mb-3 space-y-[6px]">
        {phases.map((p) => (
          <m.div key={p.name} variants={fadeUp} className="flex items-center gap-2">
            <span className="w-[68px] shrink-0 truncate text-right text-[6px] font-medium text-slate-500">
              {p.name}
            </span>
            <div className="relative h-[12px] flex-1 overflow-hidden rounded-[3px] bg-white/[0.03]">
              {/* Full phase span (translucent) */}
              <div
                className={`absolute inset-y-0 rounded-[3px] ${p.track}`}
                style={{ left: `${p.s}%`, width: `${p.e - p.s}%` }}
              />
              {/* Progress fill */}
              <div
                className={`absolute inset-y-0 rounded-[3px] ${p.fill}`}
                style={{ left: `${p.s}%`, width: `${(p.pct / 100) * (p.e - p.s)}%` }}
              />
              {/* Today marker */}
              <div className="absolute inset-y-0 left-[52%] w-px bg-white/20">
                <div className="absolute -left-[2px] -top-[2px] h-[5px] w-[5px] rotate-45 rounded-[1px] bg-white/40" />
              </div>
            </div>
            <span className={`w-[22px] shrink-0 text-right text-[6.5px] font-extrabold tabular-nums ${p.pct === 100 ? 'text-emerald-400' : 'text-slate-300'}`}>
              {p.pct}%
            </span>
          </m.div>
        ))}
      </div>

      {/* Milestones */}
      <m.div variants={fadeUp}>
        <p className="mb-1.5 text-[6.5px] font-bold uppercase tracking-wider text-slate-500">Upcoming Milestones</p>
        <div className="space-y-[3px]">
          {[
            { name: 'Foundation Complete', date: 'Jan 28', done: true },
            { name: 'Roof Close', date: 'Feb 28', done: false },
            { name: 'Mechanical Rough-in', date: 'Mar 15', done: false },
          ].map((ms) => (
            <div
              key={ms.name}
              className="flex items-center gap-1.5 rounded border border-white/[0.04] bg-white/[0.02] px-2 py-[5px]"
            >
              <div className={`h-[6px] w-[6px] rotate-45 rounded-[1px] ${ms.done ? 'bg-emerald-400' : 'border border-slate-600'}`} />
              <span className="flex-1 text-[6.5px] text-slate-300">{ms.name}</span>
              <span className={`text-[5.5px] font-bold tabular-nums ${ms.done ? 'text-emerald-400' : 'text-slate-500'}`}>
                {ms.done && '✓ '}{ms.date}
              </span>
            </div>
          ))}
        </div>
      </m.div>
    </m.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   3. ACTIVITY — Live Site Feed
   ═══════════════════════════════════════════════════════════ */

function ActivityModule() {
  return (
    <m.div variants={stagger} initial="hidden" animate="show" className="p-3">
      <m.div variants={fadeUp} className="mb-2.5 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <Zap className="h-3 w-3 text-amber-400" />
          <span className="text-[8px] font-bold text-white/90">Live Site Feed</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400/40" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-[6.5px] font-bold text-emerald-400">6 on site</span>
        </div>
      </m.div>

      {/* Crew avatar strip */}
      <m.div variants={fadeUp} className="mb-2.5 flex gap-1">
        {[
          { i: 'AN', g: 'from-indigo-500 to-indigo-600' },
          { i: 'AH', g: 'from-rose-500 to-rose-600' },
          { i: 'DP', g: 'from-amber-500 to-amber-600' },
          { i: 'ED', g: 'from-emerald-500 to-emerald-600' },
          { i: 'KF', g: 'from-blue-500 to-blue-600' },
          { i: 'MS', g: 'from-violet-500 to-violet-600' },
        ].map((w) => (
          <div key={w.i} className="relative">
            <div className={`flex h-[22px] w-[22px] items-center justify-center rounded-full bg-gradient-to-br ${w.g} ring-1 ring-white/[0.08]`}>
              <span className="text-[5px] font-extrabold text-white">{w.i}</span>
            </div>
            <span className="absolute -bottom-px -right-px h-[4px] w-[4px] rounded-full bg-emerald-400 ring-1 ring-[#0B1120]" />
          </div>
        ))}
      </m.div>

      {/* Feed items */}
      <div className="space-y-1">
        {[
          { icon: 'users', name: 'Andre N.', role: 'Foreman', action: 'Clocked in — GPS verified', time: '5:52 AM' },
          { icon: 'camera', name: 'Eduardo D.', role: 'Carpenter', action: 'Uploaded 12 photos — Bay 4', time: '10:15 AM' },
          { icon: 'shield', name: 'Kevin F.', role: 'Safety Lead', action: 'JSA-0214 signed — 6/6 crew', time: '6:30 AM' },
          { icon: 'trend', name: 'David P.', role: 'Labourer', action: 'Material received — Steel centrifuge', time: '9:30 AM' },
        ].map((a) => (
          <m.div
            key={a.time + a.name}
            variants={fadeUp}
            className="flex gap-2 rounded-lg border border-white/[0.04] bg-white/[0.02] p-1.5"
          >
            <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md ${
              a.icon === 'users' ? 'bg-indigo-500/15' :
              a.icon === 'camera' ? 'bg-emerald-500/15' :
              a.icon === 'shield' ? 'bg-amber-500/15' :
              'bg-cyan-500/15'
            }`}>
              {a.icon === 'users' && <Users className="h-2.5 w-2.5 text-indigo-400" />}
              {a.icon === 'camera' && <Camera className="h-2.5 w-2.5 text-emerald-400" />}
              {a.icon === 'shield' && <Shield className="h-2.5 w-2.5 text-amber-400" />}
              {a.icon === 'trend' && <TrendingUp className="h-2.5 w-2.5 text-cyan-400" />}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1">
                <span className="text-[6.5px] font-bold text-white/80">{a.name}</span>
                <span className="text-[5px] text-slate-600">·</span>
                <span className="text-[5.5px] text-slate-500">{a.role}</span>
              </div>
              <p className="truncate text-[6px] text-slate-400">{a.action}</p>
            </div>
            <span className="shrink-0 text-[5.5px] tabular-nums text-slate-600">{a.time}</span>
          </m.div>
        ))}
      </div>
    </m.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   4. FINANCE — Financial Pulse
   ═══════════════════════════════════════════════════════════ */

const cashBars = [38, 52, 65, 78, 61, 45, 72, 88, 54, 67, 82, 93];

function FinanceModule() {
  return (
    <m.div variants={stagger} initial="hidden" animate="show" className="p-3">
      <m.div variants={fadeUp} className="mb-2.5 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <DollarSign className="h-3 w-3 text-emerald-400" />
          <span className="text-[8px] font-bold text-white/90">Financial Overview</span>
        </div>
        <span className="text-[6.5px] text-slate-500">February 2026</span>
      </m.div>

      {/* Contract value hero card */}
      <m.div
        variants={fadeUp}
        className="mb-2.5 rounded-lg border border-white/[0.06] bg-gradient-to-br from-blue-500/[0.08] via-transparent to-violet-500/[0.06] p-2.5"
      >
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[5px] font-semibold uppercase tracking-wider text-slate-500">Contract Value</p>
            <p className="text-[16px] font-extrabold tabular-nums leading-none tracking-tight text-white">
              $4,200<span className="text-[10px] text-slate-400">,000</span>
            </p>
          </div>
          <div className="text-right">
            <p className="text-[5px] font-semibold uppercase tracking-wider text-slate-500">Billed</p>
            <div className="flex items-center gap-0.5">
              <span className="text-[12px] font-extrabold tabular-nums leading-none text-emerald-400">$2.81M</span>
              <ArrowUpRight className="h-2.5 w-2.5 text-emerald-400" />
            </div>
          </div>
        </div>
        <div className="mt-2 h-[4px] overflow-hidden rounded-full bg-white/[0.06]">
          <div className="h-full w-[67%] rounded-full bg-gradient-to-r from-blue-500 to-emerald-500" />
        </div>
        <div className="mt-0.5 flex justify-between text-[4.5px] tabular-nums text-slate-600">
          <span>$0</span>
          <span className="font-bold text-blue-400/60">67% billed</span>
          <span>$4.2M</span>
        </div>
      </m.div>

      {/* Payment milestones */}
      <m.div variants={fadeUp} className="mb-2.5">
        <p className="mb-1.5 text-[6.5px] font-bold uppercase tracking-wider text-slate-500">Payment Milestones</p>
        <div className="space-y-[3px]">
          {[
            { id: 'MS-3', name: 'Foundation', amount: '$450K', status: 'paid' as const },
            { id: 'MS-4', name: 'Structural Steel', amount: '$520K', status: 'due' as const },
            { id: 'MS-5', name: 'Mechanical', amount: '$320K', status: 'upcoming' as const },
          ].map((ms) => (
            <div key={ms.id} className="flex items-center gap-1.5 rounded border border-white/[0.04] bg-white/[0.02] px-2 py-[5px]">
              <span className="w-[24px] shrink-0 text-[5.5px] font-extrabold text-slate-600">{ms.id}</span>
              <span className="flex-1 truncate text-[6.5px] text-slate-300">{ms.name}</span>
              <span className="text-[7px] font-extrabold tabular-nums text-white/80">{ms.amount}</span>
              <span className={`rounded px-1 py-px text-[5px] font-bold ${
                ms.status === 'paid'
                  ? 'bg-emerald-500/15 text-emerald-400'
                  : ms.status === 'due'
                    ? 'bg-amber-500/15 text-amber-400'
                    : 'bg-white/[0.04] text-slate-500'
              }`}>
                {ms.status === 'paid' ? '✓ Paid' : ms.status === 'due' ? 'Due' : 'Upcoming'}
              </span>
            </div>
          ))}
        </div>
      </m.div>

      {/* Cash flow mini chart */}
      <m.div variants={fadeUp}>
        <div className="flex items-center justify-between">
          <p className="text-[6.5px] font-bold uppercase tracking-wider text-slate-500">Cash Flow</p>
          <p className="text-[5.5px] text-slate-500">
            Receivable: <span className="font-bold text-amber-400">$124,500</span>
          </p>
        </div>
        <div className="mt-1.5 flex items-end gap-[2px]">
          {cashBars.map((h, i) => (
            <div
              key={i}
              className={`flex-1 rounded-t-[2px] transition-colors ${
                i === cashBars.length - 1
                  ? 'bg-gradient-to-t from-blue-500 to-blue-400'
                  : i === cashBars.length - 2
                    ? 'bg-blue-500/40'
                    : 'bg-white/[0.06]'
              }`}
              style={{ height: `${h * 0.22}px` }}
            />
          ))}
        </div>
      </m.div>
    </m.div>
  );
}

/* ═══════════════════════════════════════════════════════════
   Module Map
   ═══════════════════════════════════════════════════════════ */

const CONTENT: Record<string, React.ComponentType> = {
  overview: OverviewModule,
  schedule: ScheduleModule,
  activity: ActivityModule,
  finance: FinanceModule,
};

/* ═══════════════════════════════════════════════════════════
   Main Export
   ═══════════════════════════════════════════════════════════ */

export function HeroDashboard() {
  const prefersReduced = useReducedMotion();
  const skip = prefersReduced ?? false;

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [hovered, setHovered] = useState(false);

  const timerRef = useRef<ReturnType<typeof setInterval>>();
  const [cycleReady, setCycleReady] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    if (skip) return;
    const t = setTimeout(() => setCycleReady(true), 2000);
    return () => clearTimeout(t);
  }, [skip]);

  useEffect(() => {
    if (!cycleReady || hovered || skip) return;
    timerRef.current = setInterval(() => {
      setDirection(1);
      setActiveIndex((p) => (p + 1) % MODS.length);
    }, CYCLE_MS);
    return () => clearInterval(timerRef.current);
  }, [cycleReady, hovered, skip, resetKey]);

  const goTo = useCallback(
    (i: number) => {
      setDirection(i > activeIndex ? 1 : -1);
      setActiveIndex(i);
      setResetKey((k) => k + 1);
    },
    [activeIndex],
  );

  const ContentComp = CONTENT[MODS[activeIndex].id];

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={skip ? false : { opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: 0.4 }}
        className="relative overflow-hidden bg-[#0B1120]"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Subtle dot-grid background */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(148,163,184,0.15) 1px, transparent 1px)',
            backgroundSize: '16px 16px',
          }}
        />

        {/* ── Browser chrome ── */}
        <div className="relative flex items-center gap-1.5 border-b border-white/[0.06] bg-[#0a0f1c] px-3 py-1.5">
          <div className="flex gap-1">
            <span className="h-[6px] w-[6px] rounded-full bg-[#ff5f57]/70" />
            <span className="h-[6px] w-[6px] rounded-full bg-[#febc2e]/70" />
            <span className="h-[6px] w-[6px] rounded-full bg-[#28c840]/70" />
          </div>
          <div className="ml-1 flex flex-1 items-center gap-1 rounded bg-white/[0.05] px-2 py-[3px]">
            <Lock className="h-[7px] w-[7px] text-emerald-400/70" />
            <span className="text-[7px] text-slate-500">app.renonext.com/command-center</span>
          </div>
        </div>

        {/* ── App top bar ── */}
        <div className="relative flex items-center justify-between border-b border-white/[0.06] px-3 py-1.5">
          <div className="flex items-center gap-1.5">
            <div className="flex h-3.5 w-3.5 items-center justify-center rounded bg-gradient-to-br from-blue-500 to-violet-500">
              <span className="text-[5px] font-black text-white">L</span>
            </div>
            <span className="text-[8px] font-bold text-white/70">RenoNext</span>
            <span className="text-[6px] text-slate-600">|</span>
            <span className="text-[6px] font-medium text-slate-500">Command Center</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-[6px] text-slate-500">
              <Clock className="h-2 w-2" />
              <span className="tabular-nums">Feb 19, 2026</span>
            </div>
            <div className="relative">
              <Bell className="h-2.5 w-2.5 text-slate-500" />
              <span className="absolute -right-0.5 -top-0.5 flex h-2 w-2 items-center justify-center rounded-full bg-blue-500 text-[4px] font-bold text-white ring-1 ring-[#0B1120]">
                3
              </span>
            </div>
            <div className="flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-blue-400 to-violet-500 ring-1 ring-white/[0.08]">
              <span className="text-[5px] font-bold text-white">PV</span>
            </div>
          </div>
        </div>

        {/* ── Module tabs ── */}
        <m.div
          initial={skip ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.8 }}
          className="relative flex items-center gap-[2px] border-b border-white/[0.06] px-2 py-1"
        >
          {MODS.map((mod, i) => (
            <button
              key={mod.id}
              onClick={() => goTo(i)}
              className={`relative flex items-center gap-1 overflow-hidden rounded px-2 py-[5px] text-[6.5px] font-semibold transition-all duration-200 ${
                i === activeIndex
                  ? 'bg-white/[0.06] text-white shadow-[0_0_12px_rgba(59,130,246,0.08)]'
                  : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              <mod.Icon className="h-2.5 w-2.5" />
              {mod.label}
              {/* Auto-cycle progress bar */}
              {i === activeIndex && cycleReady && !hovered && (
                <m.div
                  key={`bar-${resetKey}-${i}`}
                  className="absolute inset-x-0 bottom-0 h-[1.5px] bg-gradient-to-r from-blue-500 to-emerald-500"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: CYCLE_MS / 1000, ease: 'linear' }}
                  style={{ transformOrigin: 'left' }}
                />
              )}
            </button>
          ))}
        </m.div>

        {/* ── Module content ── */}
        <div className="relative min-h-[320px] overflow-hidden">
          <AnimatePresence mode="wait" custom={direction}>
            <m.div
              key={MODS[activeIndex].id}
              custom={direction}
              variants={slide}
              initial="enter"
              animate="center"
              exit="exit"
            >
              <ContentComp />
            </m.div>
          </AnimatePresence>
        </div>

        {/* ── Bottom status bar ── */}
        <div className="flex items-center justify-between border-t border-white/[0.06] px-3 py-1">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-[5.5px] text-slate-600">
              <span className="h-1 w-1 rounded-full bg-emerald-400" />
              Connected
            </span>
            <span className="text-[5.5px] tabular-nums text-slate-600">Latency: 24ms</span>
          </div>
          <span className="text-[5.5px] text-slate-600">v2.4.1</span>
        </div>
      </m.div>
    </LazyMotion>
  );
}
