'use client';

import { useCallback, useRef, useState } from 'react';
import {
  LazyMotion,
  domAnimation,
  m,
  AnimatePresence,
  useReducedMotion,
} from 'framer-motion';
import {
  Eye,
  Lock,
  FileSearch,
  ShieldCheck,
  CheckCircle,
  Clock,
  Users,
  Banknote,
  Star,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

/* ── Tab definitions ── */

interface BentoTab {
  id: string;
  icon: typeof Eye;
  label: string;
  benefit: string;
  activeColor: string;
  activeBg: string;
  activeBorder: string;
}

const tabs: BentoTab[] = [
  {
    id: 'tracker',
    icon: Eye,
    label: 'Live Tracking',
    benefit: 'See who\u2019s on site, what\u2019s done, and what\u2019s next',
    activeColor: 'text-emerald-600',
    activeBg: 'bg-emerald-50',
    activeBorder: 'border-emerald-300',
  },
  {
    id: 'escrow',
    icon: Lock,
    label: 'Escrow Vault',
    benefit: 'Money locked until milestones are verified and approved',
    activeColor: 'text-blue-600',
    activeBg: 'bg-blue-50',
    activeBorder: 'border-blue-300',
  },
  {
    id: 'vault',
    icon: FileSearch,
    label: 'Home Vault',
    benefit: 'Permanent record of every job done on your property',
    activeColor: 'text-violet-600',
    activeBg: 'bg-violet-50',
    activeBorder: 'border-violet-300',
  },
  {
    id: 'compliance',
    icon: ShieldCheck,
    label: 'Verified Pros',
    benefit: 'Insurance, background checks, and safety certs confirmed',
    activeColor: 'text-amber-600',
    activeBg: 'bg-amber-50',
    activeBorder: 'border-amber-300',
  },
];

/* ── Panel content per tab (light theme) ── */

function TrackerPanel() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
            LIVE DASHBOARD
          </p>
          <p className="text-sm font-bold text-gray-900">
            18 Birch Lane, Markham
          </p>
        </div>
        <Badge className="rounded-full border-transparent bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
          <span className="relative mr-1.5 flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Live
        </Badge>
      </div>

      {/* Active job */}
      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
        <div className="mb-2 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            <span className="text-[10px] font-bold text-emerald-700">
              ACTIVE
            </span>
          </div>
          <span className="text-[10px] text-gray-400">Now</span>
        </div>
        <p className="text-sm font-semibold text-gray-900">
          Bathroom renovation — Tile & fixtures
        </p>
        <div className="mt-2 flex items-center gap-2">
          <img
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&fit=crop&crop=face"
            alt=""
            loading="lazy"
            className="h-5 w-5 rounded-full object-cover"
          />
          <span className="text-xs text-gray-500">
            Sarah M. — Red Seal Plumber
          </span>
        </div>
        <div className="mt-2">
          <div className="flex items-center justify-between text-[10px] text-gray-500">
            <span>Tasks: 3 of 5</span>
            <span>60%</span>
          </div>
          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-1.5 rounded-full bg-emerald-500"
              style={{ width: '60%' }}
            />
          </div>
        </div>
      </div>

      {/* On-site info */}
      <div className="flex items-center gap-3 rounded-lg border border-gray-200 bg-white p-2.5">
        <Users className="h-4 w-4 text-blue-500" />
        <div>
          <p className="text-xs font-medium text-gray-900">2 pros on site</p>
          <p className="text-[10px] text-gray-500">
            GPS verified &bull; Clocked in 9:14 AM
          </p>
        </div>
      </div>
    </div>
  );
}

function EscrowPanel() {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100">
          <Lock className="h-5 w-5 text-emerald-600" />
        </div>
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
            RENONEXT SAFE&trade;
          </p>
          <p className="text-lg font-bold text-gray-900">$18,750.00</p>
        </div>
        <Badge className="ml-auto rounded-full border-transparent bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
          Secured
        </Badge>
      </div>

      {/* Milestones */}
      <div className="space-y-1.5">
        {[
          { name: 'Tear-off', amount: '$4,200', status: 'paid' as const },
          { name: 'Sheathing', amount: '$5,800', status: 'paid' as const },
          { name: 'Shingles', amount: '$8,750', status: 'locked' as const },
        ].map((ms) => (
          <div
            key={ms.name}
            className={`flex items-center justify-between rounded-lg px-3 py-2 text-xs ${
              ms.status === 'paid'
                ? 'border border-emerald-200 bg-emerald-50'
                : 'border border-amber-200 bg-amber-50'
            }`}
          >
            <div className="flex items-center gap-2">
              {ms.status === 'paid' ? (
                <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
              ) : (
                <Clock className="h-3.5 w-3.5 text-amber-500" />
              )}
              <span className="font-medium text-gray-800">{ms.name}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                  ms.status === 'paid'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-amber-100 text-amber-700'
                }`}
              >
                {ms.status === 'paid' ? 'Released' : 'Locked'}
              </span>
            </div>
            <span
              className={`font-semibold ${
                ms.status === 'paid' ? 'text-emerald-700' : 'text-amber-700'
              }`}
            >
              {ms.amount}
            </span>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-2 rounded-lg border border-gray-200 bg-white p-2.5 text-xs text-gray-500">
        <Banknote className="h-4 w-4 shrink-0 text-blue-500" />
        <span>Bonded escrow — funds released on your approval only</span>
      </div>
    </div>
  );
}

function VaultPanel() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
            HOME VAULT
          </p>
          <p className="text-sm font-bold text-gray-900">
            91 Lakeshore Rd, Oakville
          </p>
        </div>
        <Badge className="rounded-full border-transparent bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
          All Clear
        </Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: 'Jobs', value: '8' },
          { label: 'Certs', value: '6' },
          { label: 'Photos', value: '32' },
          { label: 'Reports', value: '8' },
        ].map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg border border-gray-200 bg-white p-2 text-center"
          >
            <p className="text-sm font-bold text-gray-900">{stat.value}</p>
            <p className="text-[9px] text-gray-500">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Recent job — relative timestamp */}
      <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
        <div className="mb-1 flex items-center justify-between">
          <Badge className="rounded-full border-transparent bg-emerald-50 px-2 py-0 text-[9px] font-semibold text-emerald-600">
            Completed &amp; Stamped
          </Badge>
          <span className="text-[10px] text-gray-400">3 days ago</span>
        </div>
        <p className="text-sm font-semibold text-gray-900">
          HVAC system replacement
        </p>
        <div className="mt-2 flex items-center gap-2">
          <img
            src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&fit=crop&crop=face"
            alt=""
            loading="lazy"
            className="h-5 w-5 rounded-full object-cover"
          />
          <span className="text-xs text-gray-500">
            James T. — TSSA Certified
          </span>
          <div className="ml-auto flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="h-2.5 w-2.5 fill-amber-400 text-amber-400"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CompliancePanel() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] font-medium uppercase tracking-wider text-gray-400">
            COMPLIANCE CHECK
          </p>
          <p className="text-sm font-bold text-gray-900">
            All Contractors Verified
          </p>
        </div>
        <Badge className="rounded-full border-transparent bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
          <CheckCircle className="mr-1 h-3 w-3" />
          Passed
        </Badge>
      </div>

      {/* Verification items */}
      <div className="space-y-2">
        {[
          { label: 'WSIB Coverage', status: 'Active', color: 'emerald' as const },
          { label: 'Background Check', status: 'Cleared', color: 'emerald' as const },
          { label: 'Insurance', status: '$2M Policy', color: 'emerald' as const },
          { label: 'Safety Certs', status: 'WHMIS, Heights, First Aid', color: 'blue' as const },
        ].map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between rounded-lg border border-gray-200 bg-white p-2.5"
          >
            <div className="flex items-center gap-2">
              <CheckCircle
                className={`h-3.5 w-3.5 ${
                  item.color === 'emerald'
                    ? 'text-emerald-500'
                    : 'text-blue-500'
                }`}
              />
              <span className="text-xs font-medium text-gray-800">
                {item.label}
              </span>
            </div>
            <span
              className={`text-[10px] font-semibold ${
                item.color === 'emerald'
                  ? 'text-emerald-600'
                  : 'text-blue-600'
              }`}
            >
              {item.status}
            </span>
          </div>
        ))}
      </div>

      {/* Cert badges */}
      <div className="flex flex-wrap gap-1.5">
        {['P.Eng', 'OHSA', 'ESA', 'TSSA', 'Heights'].map((cert) => (
          <span
            key={cert}
            className="rounded-full border border-gray-200 bg-white px-2.5 py-0.5 text-[10px] font-medium text-gray-600"
          >
            {cert}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Panel map ── */

const panels: Record<string, React.ComponentType> = {
  tracker: TrackerPanel,
  escrow: EscrowPanel,
  vault: VaultPanel,
  compliance: CompliancePanel,
};

/* ── Main HeroBento component ── */

export function HeroBento() {
  const [activeTab, setActiveTab] = useState('tracker');
  const prefersReduced = useReducedMotion();
  const ActivePanel = panels[activeTab];
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeIdx = tabs.findIndex((t) => t.id === activeTab);

  /* Keyboard navigation — roving tabindex */
  const onKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      let nextIdx = activeIdx;

      switch (e.key) {
        case 'ArrowRight':
        case 'ArrowDown':
          nextIdx = (activeIdx + 1) % tabs.length;
          break;
        case 'ArrowLeft':
        case 'ArrowUp':
          nextIdx = (activeIdx - 1 + tabs.length) % tabs.length;
          break;
        case 'Home':
          nextIdx = 0;
          break;
        case 'End':
          nextIdx = tabs.length - 1;
          break;
        default:
          return;
      }

      e.preventDefault();
      setActiveTab(tabs[nextIdx].id);
      tabRefs.current[nextIdx]?.focus();
    },
    [activeIdx],
  );

  return (
    <LazyMotion features={domAnimation}>
      <div className="mx-auto max-w-5xl">
        {/* 2-column layout: tiles left, preview right (desktop) */}
        <div className="grid items-start gap-6 lg:grid-cols-[280px_1fr] lg:gap-8">
          {/* Tile column */}
          <div
            role="tablist"
            aria-label="Product features"
            aria-orientation="vertical"
            className="grid grid-cols-2 gap-2 lg:grid-cols-1"
            onKeyDown={onKeyDown}
          >
            {tabs.map((tab, i) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  ref={(el) => { tabRefs.current[i] = el; }}
                  role="tab"
                  id={`bento-tab-${tab.id}`}
                  aria-selected={isActive}
                  aria-controls={`bento-panel-${tab.id}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveTab(tab.id)}
                  className={[
                    'relative rounded-xl border p-3 text-left transition-colors duration-200 lg:p-4',
                    'select-none',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-2',
                    isActive
                      ? 'border-transparent'
                      : 'border-gray-200/60 bg-white/70 hover:bg-white/90',
                  ].join(' ')}
                >
                  {/* layoutId sliding highlight */}
                  {isActive && (
                    <m.div
                      layoutId="bento-highlight"
                      className={`absolute inset-0 rounded-xl border shadow-sm ${tab.activeBorder} ${tab.activeBg}`}
                      transition={{ type: 'spring', stiffness: 280, damping: 35 }}
                      style={{ zIndex: 0 }}
                    />
                  )}

                  <div className="relative z-10">
                    <div className="flex items-center gap-2">
                      <tab.icon
                        className={`h-4 w-4 shrink-0 ${isActive ? tab.activeColor : 'text-gray-400'}`}
                      />
                      <span
                        className={`text-sm font-semibold ${isActive ? 'text-gray-900' : 'text-gray-600'}`}
                      >
                        {tab.label}
                      </span>
                    </div>
                    <p
                      className={`mt-1 text-xs leading-relaxed ${isActive ? 'text-gray-600' : 'text-gray-400'}`}
                    >
                      {tab.benefit}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          <div
            role="tabpanel"
            id={`bento-panel-${activeTab}`}
            aria-labelledby={`bento-tab-${activeTab}`}
            className="relative overflow-hidden rounded-2xl border border-gray-200/60 bg-white/70 p-5 shadow-2xl backdrop-blur lg:p-6"
          >
            {/* Inner ring */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/50" />
            {/* Top hairline */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200/80 to-transparent" />

            <AnimatePresence mode="wait">
              {prefersReduced ? (
                <div key={activeTab}>
                  <ActivePanel />
                </div>
              ) : (
                <m.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, ease: EASE }}
                >
                  <ActivePanel />
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </LazyMotion>
  );
}
