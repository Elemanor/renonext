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
  Lock,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  Shield,
  HelpCircle,
  DollarSign,
  CalendarDays,
  ClipboardCheck,
  BarChart3,
  Home,
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
  { id: 'today', label: 'Today', Icon: Home },
  { id: 'week', label: 'This Week', Icon: CalendarDays },
  { id: 'inspections', label: 'Inspections', Icon: ClipboardCheck },
  { id: 'stats', label: 'Stats', Icon: BarChart3 },
];

/* ── Tab Content Blocks ── */

function TodayBlock() {
  const crew = [
    { name: 'Marcus T.', trade: 'Plumbing', status: 'On site', color: 'bg-emerald-100 text-emerald-700' },
    { name: 'Sarah K.', trade: 'Electrical', status: 'On site', color: 'bg-emerald-100 text-emerald-700' },
    { name: 'David R.', trade: 'Framing', status: 'En route', color: 'bg-amber-100 text-amber-700' },
  ];

  return (
    <m.div variants={stagger} initial="hidden" animate="show" className="p-3">
      <m.div variants={fadeUp} className="mb-2 flex items-center justify-between">
        <span className="text-[10px] font-bold text-gray-800">Crew at your home</span>
        <span className="flex items-center gap-1 text-[8px] text-gray-400">
          <Clock className="h-2.5 w-2.5" />
          08:00–16:00
        </span>
      </m.div>

      {crew.map((c) => (
        <m.div key={c.name} variants={fadeUp} className="mb-1.5 flex items-center justify-between rounded-lg border border-gray-200/80 bg-white px-2.5 py-1.5">
          <div className="flex items-center gap-2">
            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-teal-100">
              <Users className="h-2.5 w-2.5 text-teal-600" />
            </div>
            <div>
              <p className="text-[8px] font-semibold text-gray-800">{c.name}</p>
              <p className="text-[6px] text-gray-400">{c.trade}</p>
            </div>
          </div>
          <span className={`rounded-full px-1.5 py-0.5 text-[6px] font-medium ${c.color}`}>
            {c.status}
          </span>
        </m.div>
      ))}

      <m.div variants={fadeUp} className="mt-2 flex items-center gap-3 text-[7px] text-gray-400">
        <span>3 workers</span>
        <span>·</span>
        <span>Est. 24 work-hours today</span>
      </m.div>
    </m.div>
  );
}

function WeekBlock() {
  const days = [
    { day: 'Mon', label: 'Plumbing rough-in', border: 'border-l-emerald-500', bg: 'bg-emerald-50/60' },
    { day: 'Tue', label: 'Electrical + framing', border: 'border-l-emerald-500', bg: 'bg-emerald-50/60' },
    { day: 'Wed', label: 'Inspector visit — be home by 9 AM', border: 'border-l-amber-500', bg: 'bg-amber-50/60' },
    { day: 'Thu', label: 'Drywall delivery — truck blocks drive', border: 'border-l-amber-500', bg: 'bg-amber-50/60' },
    { day: 'Fri', label: 'No work — crew off-site', border: 'border-l-red-400', bg: 'bg-red-50/40' },
  ];

  return (
    <m.div variants={stagger} initial="hidden" animate="show" className="p-3">
      <m.div variants={fadeUp} className="mb-2 flex items-center justify-between">
        <span className="text-[10px] font-bold text-gray-800">Week ahead</span>
        <span className="text-[8px] text-gray-400">Mar 10–14</span>
      </m.div>

      {days.map((d) => (
        <m.div key={d.day} variants={fadeUp} className={`mb-1 flex items-center gap-2 rounded-md border-l-2 ${d.border} ${d.bg} px-2 py-1.5`}>
          <span className="w-6 text-[7px] font-bold text-gray-500">{d.day}</span>
          <span className="text-[7px] text-gray-700">{d.label}</span>
        </m.div>
      ))}
    </m.div>
  );
}

function InspectionsBlock() {
  return (
    <m.div variants={stagger} initial="hidden" animate="show" className="p-3">
      <m.div variants={fadeUp} className="mb-2 flex items-center justify-between">
        <span className="text-[10px] font-bold text-gray-800">Next inspection</span>
        <span className="rounded-full bg-teal-100 px-1.5 py-0.5 text-[7px] font-bold text-teal-700">Wed, Mar 12</span>
      </m.div>

      <m.div variants={fadeUp} className="rounded-lg border border-teal-200 bg-teal-50/60 p-2.5">
        <p className="text-[9px] font-semibold text-teal-800">Plumbing Rough-In Inspection</p>
        <p className="mt-0.5 text-[7px] text-gray-500">City of Portland · Inspector TBD</p>
      </m.div>

      <m.div variants={fadeUp} className="mt-2">
        <p className="mb-1 text-[8px] font-medium text-gray-600">Prerequisites</p>
        {[
          { text: 'All pipes pressure-tested', done: true },
          { text: 'Access panels installed', done: true },
          { text: 'You must be home 9–11 AM', done: false },
        ].map((item) => (
          <div key={item.text} className="mb-0.5 flex items-center gap-1.5 text-[7px]">
            {item.done ? (
              <CheckCircle className="h-2.5 w-2.5 text-emerald-500" />
            ) : (
              <AlertTriangle className="h-2.5 w-2.5 text-amber-500" />
            )}
            <span className={item.done ? 'text-gray-400' : 'font-medium text-gray-700'}>{item.text}</span>
          </div>
        ))}
      </m.div>
    </m.div>
  );
}

function StatsBlock() {
  const stats = [
    { label: 'Safety days', value: '14', sub: 'No incidents', Icon: Shield, color: 'bg-emerald-100 text-emerald-600' },
    { label: 'Total hours', value: '186', sub: 'This month', Icon: Clock, color: 'bg-teal-100 text-teal-600' },
    { label: 'Open questions', value: '2', sub: 'Need your input', Icon: HelpCircle, color: 'bg-amber-100 text-amber-600' },
    { label: 'Budget used', value: '38%', sub: '$15,200 / $40,000', Icon: DollarSign, color: 'bg-blue-100 text-blue-600' },
  ];

  return (
    <m.div variants={stagger} initial="hidden" animate="show" className="p-3">
      <m.div variants={fadeUp} className="mb-2 flex items-center justify-between">
        <span className="text-[10px] font-bold text-gray-800">Project overview</span>
        <span className="text-[8px] text-gray-400">Updated today</span>
      </m.div>

      <div className="grid grid-cols-2 gap-1.5">
        {stats.map((s) => (
          <m.div key={s.label} variants={fadeUp} className="rounded-lg border border-gray-200/80 bg-white p-2">
            <div className="mb-1 flex items-center gap-1.5">
              <div className={`flex h-4 w-4 items-center justify-center rounded ${s.color}`}>
                <s.Icon className="h-2.5 w-2.5" />
              </div>
              <span className="text-[7px] text-gray-400">{s.label}</span>
            </div>
            <p className="text-[11px] font-bold text-gray-800">{s.value}</p>
            <p className="text-[6px] text-gray-400">{s.sub}</p>
          </m.div>
        ))}
      </div>
    </m.div>
  );
}

const CONTENT: Record<string, React.ComponentType> = {
  today: TodayBlock,
  week: WeekBlock,
  inspections: InspectionsBlock,
  stats: StatsBlock,
};

/* ── Main Component ── */

export function HomeownerDashboardPreview() {
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
            <span className="ml-3 text-xs text-gray-400">renonext.com/dashboard/my-project</span>
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
              <span className="text-[8px] text-gray-400">renonext.com/dashboard/my-project</span>
            </div>
          </div>
        </div>

        {/* Dashboard header */}
        <div className="border-b border-gray-100 bg-gradient-to-r from-teal-800 to-slate-900 px-4 py-2.5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[9px] font-bold text-white">Kitchen Renovation — 456 Oak St</p>
              <p className="text-[7px] text-teal-300/80">40% complete · 3 crew at your home</p>
            </div>
            <div className="flex items-center gap-2">
              {/* Tiny progress ring */}
              <svg className="h-6 w-6" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2" className="text-teal-700" />
                <circle
                  cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"
                  className="text-teal-400"
                  strokeDasharray={`${0.4 * 62.83} ${62.83}`}
                  strokeLinecap="round"
                  transform="rotate(-90 12 12)"
                />
                <text x="12" y="13" textAnchor="middle" className="fill-white text-[6px] font-bold">40%</text>
              </svg>
              {/* Pulsing dot */}
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
            </div>
          </div>
        </div>

        {/* Tab strip */}
        <div className="flex items-center gap-0.5 border-b border-gray-200 bg-gray-50 px-2 py-1">
          {TABS.map((tab, i) => (
            <button
              key={tab.id}
              onClick={() => goTo(i)}
              className={`relative flex items-center gap-1 rounded-md px-2 py-1 text-[7px] font-medium transition-all duration-200 ${
                i === activeIndex
                  ? 'bg-white text-teal-700 shadow-sm ring-1 ring-gray-200'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <tab.Icon className="h-2.5 w-2.5" />
              {tab.label}
              {/* Auto-cycle progress bar */}
              {i === activeIndex && !hovered && (
                <m.div
                  key={`bar-${resetKey}-${i}`}
                  className="absolute inset-x-0 bottom-0 h-[2px] rounded-full bg-teal-400/40"
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
