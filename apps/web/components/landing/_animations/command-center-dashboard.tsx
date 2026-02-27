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
  CalendarDays,
  FileText,
  Layers,
  Bell,
  Lock,
  Users,
  Clock,
  Eye,
  CheckCircle,
  AlertTriangle,
  Circle,
  Loader2,
  type LucideIcon,
} from 'lucide-react';

const ease = [0.25, 0.46, 0.45, 0.94];
const CYCLE_MS = 4000;

const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.04 } },
};
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.25, ease } },
};

const slide = {
  enter: (d: number) => ({ x: d > 0 ? 30 : -30, opacity: 0 }),
  center: { x: 0, opacity: 1, transition: { duration: 0.3, ease } },
  exit: (d: number) => ({
    x: d > 0 ? -30 : 30,
    opacity: 0,
    transition: { duration: 0.2, ease },
  }),
};

interface Tab {
  id: string;
  label: string;
  Icon: LucideIcon;
}

const TABS: Tab[] = [
  { id: 'schedule', label: 'Schedule', Icon: CalendarDays },
  { id: 'reports', label: 'Reports', Icon: FileText },
  { id: 'progress', label: 'Progress', Icon: Layers },
  { id: 'alerts', label: 'Alerts', Icon: Bell },
];

/* ── Tab Content Blocks ── */

function ScheduleBlock() {
  return (
    <m.div variants={stagger} initial="hidden" animate="show" className="p-3">
      <m.div variants={fadeUp} className="mb-2 flex items-center justify-between">
        <span className="text-[10px] font-bold text-gray-800">Next workday</span>
        <span className="text-[8px] text-gray-400">Wed, Mar 11</span>
      </m.div>

      <m.div variants={fadeUp} className="mb-2 rounded-lg border border-blue-200 bg-blue-50/60 p-2.5">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold text-blue-800">Membrane + Inspector</p>
          <span className="text-[8px] tabular-nums text-blue-600">08:00–15:00</span>
        </div>
        <div className="mt-1.5 flex items-center gap-3 text-[8px] text-gray-500">
          <span className="flex items-center gap-0.5"><Users className="h-2.5 w-2.5" />3 crew</span>
          <span className="flex items-center gap-0.5"><Clock className="h-2.5 w-2.5" />7h</span>
          <span className="flex items-center gap-0.5 text-emerald-600"><Eye className="h-2.5 w-2.5" />Inspection</span>
        </div>
      </m.div>

      <m.div variants={fadeUp} className="flex items-center gap-1 rounded-md bg-amber-50 px-2 py-1.5">
        <AlertTriangle className="h-2.5 w-2.5 text-amber-500" />
        <span className="text-[7px] text-amber-700">Odor expected — close windows</span>
      </m.div>

      <m.div variants={fadeUp} className="mt-2 grid grid-cols-5 gap-1">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((d, i) => (
          <div key={d} className={`rounded-md py-1 text-center text-[6px] font-medium ${i === 2 ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-500'}`}>
            {d}
          </div>
        ))}
      </m.div>
    </m.div>
  );
}

function ReportsBlock() {
  return (
    <m.div variants={stagger} initial="hidden" animate="show" className="p-3">
      <m.div variants={fadeUp} className="mb-2 flex items-center justify-between">
        <span className="text-[10px] font-bold text-gray-800">Latest report</span>
        <span className="text-[8px] text-gray-400">Today, 4:15 PM</span>
      </m.div>

      <m.div variants={fadeUp} className="rounded-lg border border-gray-200 bg-white p-2.5">
        <div className="mb-1.5 flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-100">
            <CheckCircle className="h-3 w-3 text-emerald-600" />
          </div>
          <div>
            <p className="text-[9px] font-semibold text-gray-800">Drainage board — 60%</p>
            <p className="text-[7px] text-gray-500">3 workers · 1 photo</p>
          </div>
        </div>
        <p className="text-[7px] leading-relaxed text-gray-600">
          Protection board going up over waterproof coating. About 60% done — finishing tomorrow.
        </p>
      </m.div>

      <m.div variants={fadeUp} className="mt-2 flex items-center gap-3 text-[7px] text-gray-400">
        <span>6 reports total</span>
        <span>12 photos</span>
      </m.div>
    </m.div>
  );
}

function ProgressBlock() {
  return (
    <m.div variants={stagger} initial="hidden" animate="show" className="p-3">
      <m.div variants={fadeUp} className="mb-2 flex items-center justify-between">
        <span className="text-[10px] font-bold text-gray-800">Stage 2 active</span>
        <span className="rounded-full bg-blue-100 px-1.5 py-0.5 text-[7px] font-bold text-blue-700">45%</span>
      </m.div>

      {[
        { label: 'Preparation & Excavation', pct: 100, status: 'done' },
        { label: 'Waterproofing & Drainage', pct: 45, status: 'active' },
        { label: 'Backfill & Restoration', pct: 0, status: 'pending' },
      ].map((s) => (
        <m.div key={s.label} variants={fadeUp} className="mb-1.5">
          <div className="flex items-center gap-1.5 text-[7px]">
            {s.status === 'done' ? (
              <CheckCircle className="h-2.5 w-2.5 text-emerald-500" />
            ) : s.status === 'active' ? (
              <Loader2 className="h-2.5 w-2.5 text-blue-500" />
            ) : (
              <Circle className="h-2.5 w-2.5 text-gray-300" />
            )}
            <span className={s.status === 'done' ? 'text-gray-400' : 'font-medium text-gray-700'}>{s.label}</span>
            <span className="ml-auto tabular-nums text-gray-400">{s.pct}%</span>
          </div>
          <div className="ml-4 mt-0.5 h-1 overflow-hidden rounded-full bg-gray-100">
            <div
              className={`h-full rounded-full ${s.status === 'done' ? 'bg-emerald-500' : s.status === 'active' ? 'bg-blue-500' : 'bg-gray-200'}`}
              style={{ width: `${s.pct}%` }}
            />
          </div>
        </m.div>
      ))}

      <m.div variants={fadeUp} className="mt-2 rounded-md border border-emerald-100 bg-emerald-50 px-2 py-1.5">
        <div className="flex items-center gap-1">
          <CheckCircle className="h-2.5 w-2.5 text-emerald-500" />
          <span className="text-[7px] font-medium text-emerald-700">Schedule confidence: 88%</span>
        </div>
      </m.div>
    </m.div>
  );
}

function AlertsBlock() {
  return (
    <m.div variants={stagger} initial="hidden" animate="show" className="p-3">
      <m.div variants={fadeUp} className="mb-2 flex items-center justify-between">
        <span className="text-[10px] font-bold text-gray-800">Action needed</span>
        <span className="flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[7px] font-bold text-white">2</span>
      </m.div>

      <m.div variants={fadeUp} className="mb-1.5 rounded-lg border border-red-200 bg-red-50/60 p-2">
        <div className="flex items-center gap-1.5">
          <div className="flex h-5 w-5 items-center justify-center rounded bg-red-500">
            <Bell className="h-2.5 w-2.5 text-white" />
          </div>
          <div>
            <p className="text-[8px] font-semibold text-gray-800">Decision: Board upgrade</p>
            <p className="text-[6px] text-gray-500">+$450 · Exceeds code requirements</p>
          </div>
        </div>
      </m.div>

      <m.div variants={fadeUp} className="mb-1.5 rounded-lg border border-amber-200 bg-amber-50/60 p-2">
        <div className="flex items-center gap-1.5">
          <div className="flex h-5 w-5 items-center justify-center rounded bg-amber-500">
            <AlertTriangle className="h-2.5 w-2.5 text-white" />
          </div>
          <div>
            <p className="text-[8px] font-semibold text-gray-800">Vibration Thu 8–4</p>
            <p className="text-[6px] text-gray-500">Drilling for drainage board</p>
          </div>
        </div>
      </m.div>

      <m.div variants={fadeUp} className="rounded-lg border border-blue-200 bg-blue-50/60 p-2">
        <div className="flex items-center gap-1.5">
          <div className="flex h-5 w-5 items-center justify-center rounded bg-blue-500">
            <Bell className="h-2.5 w-2.5 text-white" />
          </div>
          <div>
            <p className="text-[8px] font-semibold text-gray-800">Payment released: $5,550</p>
            <p className="text-[6px] text-gray-500">Stage 1 milestone</p>
          </div>
        </div>
      </m.div>
    </m.div>
  );
}

const CONTENT: Record<string, React.ComponentType> = {
  schedule: ScheduleBlock,
  reports: ReportsBlock,
  progress: ProgressBlock,
  alerts: AlertsBlock,
};

/* ── Main Component ── */

export function CommandCenterDashboard() {
  const prefersReduced = useReducedMotion();
  const skip = prefersReduced ?? false;

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [hovered, setHovered] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const timerRef = useRef<ReturnType<typeof setInterval>>();

  useEffect(() => {
    if (hovered || skip) return;

    timerRef.current = setInterval(() => {
      setDirection(1);
      setActiveIndex((p) => (p + 1) % TABS.length);
    }, CYCLE_MS);

    return () => clearInterval(timerRef.current);
  }, [hovered, skip, resetKey]);

  const goTo = useCallback(
    (i: number) => {
      setDirection(i > activeIndex ? 1 : -1);
      setActiveIndex(i);
      setResetKey((k) => k + 1);
    },
    [activeIndex],
  );

  const ContentComp = CONTENT[TABS[activeIndex].id];

  // Reduced motion: show all stacked
  if (skip) {
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-200/60 bg-white shadow-xl">
        <div className="border-b border-gray-200 bg-white px-4 py-2">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
            <span className="ml-3 text-xs text-gray-400">renonext.com/dashboard/projects</span>
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {TABS.map((tab) => {
            const Comp = CONTENT[tab.id];
            return (
              <div key={tab.id}>
                <div className="flex items-center gap-1 px-3 pt-2 text-[9px] font-bold text-gray-400">
                  <tab.Icon className="h-3 w-3" />
                  {tab.label}
                </div>
                <Comp />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease }}
        className="overflow-hidden rounded-2xl border border-gray-200/60 bg-white shadow-xl"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        {/* Browser chrome */}
        <div className="border-b border-gray-200 bg-white px-4 py-2">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
            <div className="ml-3 flex flex-1 items-center gap-1 rounded-md bg-gray-100 px-2 py-0.5">
              <Lock className="h-2 w-2 text-emerald-500" />
              <span className="text-[8px] text-gray-400">renonext.com/dashboard/projects</span>
            </div>
          </div>
        </div>

        {/* Dashboard header */}
        <div className="border-b border-gray-100 bg-gradient-to-r from-slate-800 to-slate-900 px-4 py-2.5">
          <p className="text-[9px] font-bold text-white">Basement Waterproofing — 123 Maple Ave</p>
          <p className="text-[7px] text-slate-400">40% complete · On Track</p>
        </div>

        {/* Tab strip */}
        <div className="flex items-center gap-0.5 border-b border-gray-200 bg-gray-50 px-2 py-1">
          {TABS.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => goTo(i)}
              className={`relative flex items-center gap-1 rounded-md px-2 py-1 text-[7px] font-medium transition-all duration-200 ${
                i === activeIndex
                  ? 'bg-white text-blue-700 shadow-sm ring-1 ring-gray-200'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <tab.Icon className="h-2.5 w-2.5" />
              {tab.label}
              {/* Auto-cycle progress bar */}
              {i === activeIndex && !hovered && (
                <m.div
                  key={`bar-${resetKey}-${i}`}
                  className="absolute inset-x-0 bottom-0 h-[2px] rounded-full bg-blue-400/40"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: CYCLE_MS / 1000, ease: 'linear' }}
                  style={{ transformOrigin: 'left' }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Content area — fixed height */}
        <div className="relative h-[200px] overflow-hidden bg-[#f8fafc]">
          <AnimatePresence mode="wait" custom={direction}>
            <m.div
              key={TABS[activeIndex].id}
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
      </m.div>
    </LazyMotion>
  );
}
