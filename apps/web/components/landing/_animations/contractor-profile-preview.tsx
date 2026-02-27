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
  Star,
  CheckCircle,
  Shield,
  Clock,
  Camera,
  BadgeCheck,
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
  { id: 'portfolio', label: 'Portfolio', Icon: Camera },
  { id: 'credentials', label: 'Credentials', Icon: Shield },
  { id: 'reviews', label: 'Reviews', Icon: Star },
  { id: 'availability', label: 'Availability', Icon: Clock },
];

/* ── Tab Content Blocks ── */

function PortfolioBlock() {
  const projects = [
    { label: 'Kitchen Reno', color: 'bg-emerald-100' },
    { label: 'Bath Remodel', color: 'bg-violet-100' },
    { label: 'Pipe Repair', color: 'bg-blue-100' },
    { label: 'Tankless HW', color: 'bg-amber-100' },
  ];

  return (
    <m.div variants={stagger} initial="hidden" animate="show" className="p-3">
      <m.div variants={fadeUp} className="mb-2 flex items-center justify-between">
        <span className="text-[10px] font-bold text-gray-800">Recent Projects</span>
        <span className="text-[8px] text-gray-400">12 total</span>
      </m.div>
      <m.div variants={fadeUp} className="grid grid-cols-2 gap-2">
        {projects.map((p) => (
          <div key={p.label} className={`rounded-lg ${p.color} p-3`}>
            <div className="mb-1.5 h-8 rounded bg-white/60" />
            <p className="text-[8px] font-semibold text-gray-700">{p.label}</p>
          </div>
        ))}
      </m.div>
    </m.div>
  );
}

function CredentialsBlock() {
  const creds = [
    { label: 'BCIN Certified', detail: 'Ontario Building Code', color: 'emerald' },
    { label: 'Insured — $2M', detail: 'Liability Coverage', color: 'violet' },
    { label: 'Background Check', detail: 'Verified Clean', color: 'blue' },
  ];

  return (
    <m.div variants={stagger} initial="hidden" animate="show" className="p-3">
      <m.div variants={fadeUp} className="mb-2 flex items-center justify-between">
        <span className="text-[10px] font-bold text-gray-800">Verified Credentials</span>
        <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[7px] font-bold text-emerald-700">All Verified</span>
      </m.div>
      {creds.map((c) => (
        <m.div key={c.label} variants={fadeUp} className={`mb-1.5 rounded-lg border border-${c.color}-200 bg-${c.color}-50/60 p-2`}>
          <div className="flex items-center gap-1.5">
            <div className={`flex h-5 w-5 items-center justify-center rounded bg-${c.color}-500`}>
              <CheckCircle className="h-2.5 w-2.5 text-white" />
            </div>
            <div>
              <p className="text-[8px] font-semibold text-gray-800">{c.label}</p>
              <p className="text-[6px] text-gray-500">{c.detail}</p>
            </div>
          </div>
        </m.div>
      ))}
    </m.div>
  );
}

function ReviewsBlock() {
  const reviews = [
    { name: 'Sarah T.', stars: 5, text: 'Incredible work on our kitchen. Clean, fast, professional.' },
    { name: 'David M.', stars: 5, text: 'Fixed our pipe issue same day. Highly recommend Marcus.' },
  ];

  return (
    <m.div variants={stagger} initial="hidden" animate="show" className="p-3">
      <m.div variants={fadeUp} className="mb-2 flex items-center justify-between">
        <span className="text-[10px] font-bold text-gray-800">Recent Reviews</span>
        <span className="text-[8px] text-gray-400">47 total</span>
      </m.div>
      {reviews.map((r) => (
        <m.div key={r.name} variants={fadeUp} className="mb-1.5 rounded-lg border border-gray-200 bg-white p-2.5">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-[8px] font-semibold text-gray-800">{r.name}</span>
            <div className="flex gap-0.5">
              {Array.from({ length: r.stars }).map((_, i) => (
                <Star key={i} className="h-2 w-2 fill-amber-400 text-amber-400" />
              ))}
            </div>
          </div>
          <p className="text-[7px] leading-relaxed text-gray-600">{r.text}</p>
        </m.div>
      ))}
    </m.div>
  );
}

function AvailabilityBlock() {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const available = [true, true, true, false, true, true, false];

  return (
    <m.div variants={stagger} initial="hidden" animate="show" className="p-3">
      <m.div variants={fadeUp} className="mb-2 flex items-center justify-between">
        <span className="text-[10px] font-bold text-gray-800">This Week</span>
        <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[7px] font-bold text-emerald-700">5 slots open</span>
      </m.div>

      <m.div variants={fadeUp} className="mb-2 grid grid-cols-7 gap-1">
        {days.map((d, i) => (
          <div
            key={d}
            className={`rounded-md py-1.5 text-center text-[6px] font-medium ${
              available[i]
                ? 'bg-emerald-100 text-emerald-700'
                : 'bg-gray-100 text-gray-400'
            }`}
          >
            {d}
          </div>
        ))}
      </m.div>

      <m.div variants={fadeUp} className="rounded-lg border border-violet-200 bg-violet-50/60 p-2">
        <div className="flex items-center gap-1.5">
          <Clock className="h-3 w-3 text-violet-600" />
          <div>
            <p className="text-[8px] font-semibold text-violet-800">Responds in 28 min</p>
            <p className="text-[6px] text-violet-600">Faster than 92% of pros</p>
          </div>
        </div>
      </m.div>

      <m.div variants={fadeUp} className="mt-1.5 rounded-lg border border-emerald-200 bg-emerald-50/60 p-2">
        <div className="flex items-center gap-1.5">
          <CheckCircle className="h-3 w-3 text-emerald-600" />
          <p className="text-[8px] font-semibold text-emerald-800">Next available: Tomorrow, 9 AM</p>
        </div>
      </m.div>
    </m.div>
  );
}

const CONTENT: Record<string, React.ComponentType> = {
  portfolio: PortfolioBlock,
  credentials: CredentialsBlock,
  reviews: ReviewsBlock,
  availability: AvailabilityBlock,
};

/* ── Main Component ── */

export function ContractorProfilePreview() {
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

  if (skip) {
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-200/60 bg-white shadow-xl">
        <div className="border-b border-gray-200 bg-white px-4 py-2">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-400" />
            <span className="h-3 w-3 rounded-full bg-amber-400" />
            <span className="h-3 w-3 rounded-full bg-green-400" />
            <span className="ml-3 text-xs text-gray-400">renonext.com/pros/marcus-johnson</span>
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
              <span className="text-[8px] text-gray-400">renonext.com/pros/marcus-johnson</span>
            </div>
          </div>
        </div>

        {/* Profile header */}
        <div className="border-b border-gray-100 bg-gradient-to-r from-emerald-600 to-violet-600 px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-sm font-bold text-white">
              MJ
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <p className="text-[11px] font-bold text-white">Marcus Johnson</p>
                <BadgeCheck className="h-3 w-3 text-emerald-200" />
              </div>
              <div className="flex items-center gap-2 text-[8px] text-white/80">
                <span>Licensed Plumber</span>
                <span className="flex items-center gap-0.5">
                  <Star className="h-2 w-2 fill-amber-300 text-amber-300" />
                  4.9
                </span>
                <span>47 reviews</span>
              </div>
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
                  ? 'bg-white text-emerald-700 shadow-sm ring-1 ring-gray-200'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              <tab.Icon className="h-2.5 w-2.5" />
              {tab.label}
              {i === activeIndex && !hovered && (
                <m.div
                  key={`bar-${resetKey}-${i}`}
                  className="absolute inset-x-0 bottom-0 h-[2px] rounded-full bg-emerald-400/40"
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
