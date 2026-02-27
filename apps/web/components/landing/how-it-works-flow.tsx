'use client';

import * as React from 'react';
import {
  Upload,
  SearchCheck,
  Lock,
  UserCheck,
  Camera,
  BadgeDollarSign,
  CheckCircle,
  Clock,
  Shield,
  type LucideIcon,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Step {
  step: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
  ring: string;
  accent: string;
  mock: React.ReactNode;
}

/* ── UI Micro-Screens ── */

function MockPostJob() {
  return (
    <div className="rounded-xl border border-blue-100 border-l-2 border-l-blue-400 bg-blue-50/30 p-3 shadow-sm">
      <div className="mb-2 rounded-lg border border-gray-100 bg-gray-50 px-3 py-2">
        <p className="text-[10px] font-medium text-gray-400">What do you need?</p>
        <p className="text-xs font-semibold text-gray-700">Basement waterproofing — leaking wall</p>
      </div>
      <div className="mb-2 flex gap-1.5">
        {[
          { key: 'photo1', src: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=100&fit=crop' },
          { key: 'photo2', src: 'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=100&fit=crop&crop=bottom' },
        ].map((f) => (
          <img
            key={f.key}
            src={f.src}
            alt=""
            aria-hidden="true"
            loading="lazy"
            className="h-10 w-10 rounded-lg object-cover"
          />
        ))}
        <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-dashed border-gray-300">
          <span className="text-xs text-gray-400">+</span>
        </div>
      </div>
      <div className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-1.5">
        <p className="text-[10px] text-gray-400">42 Maple Dr, Toronto</p>
      </div>
    </div>
  );
}

function MockQsReview() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[10px] font-bold text-emerald-600">QS REVIEW IN PROGRESS</span>
        <Clock className="h-3 w-3 text-amber-500" />
      </div>
      <div className="space-y-1.5">
        {[
          { label: 'Scope verified', done: true },
          { label: 'Cost estimate validated', done: true },
          { label: 'Materials spec checked', done: false },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            <CheckCircle className={`h-3 w-3 ${item.done ? 'text-emerald-500' : 'text-gray-300'}`} />
            <span className={`text-[10px] ${item.done ? 'font-medium text-gray-700' : 'text-gray-400'}`}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-2 text-[9px] text-gray-400">Reviewed by QS — Feb 8, 2:14 PM</p>
    </div>
  );
}

function MockEscrow() {
  return (
    <div className="rounded-xl border border-violet-200 bg-violet-50 p-3 shadow-sm">
      <div className="mb-2 flex items-center gap-2">
        <Lock className="h-3.5 w-3.5 text-violet-600" />
        <span className="text-[10px] font-bold text-violet-700">ESCROW VAULT</span>
      </div>
      <p className="text-lg font-bold text-violet-900">$12,400.00</p>
      <p className="text-[10px] text-violet-600">
        Funds secured — released <span className="font-bold">on your approval only</span>
      </p>
      <div className="mt-2 flex gap-1.5">
        {['Bonded', 'Insured', 'Licensed'].map((t) => (
          <span key={t} className="rounded-full bg-violet-100 px-2 py-0.5 text-[8px] font-semibold text-violet-600">
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

function MockProDispatched() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&fit=crop&crop=face"
            alt="David P."
            loading="lazy"
            className="h-9 w-9 rounded-full object-cover"
          />
          <span className="absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full border border-white bg-emerald-500" />
          </span>
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold text-gray-900">David P.</p>
          <p className="text-[10px] text-gray-500">Licensed Plumber — 4.9 stars</p>
        </div>
      </div>
      <div className="mt-2 flex flex-wrap gap-1">
        {['WSIB', 'Insured', 'ID Verified'].map((badge) => (
          <span
            key={badge}
            className="flex items-center gap-0.5 rounded-full bg-emerald-50 px-1.5 py-0.5 text-[8px] font-semibold text-emerald-600"
          >
            <Shield className="h-2 w-2" />
            {badge}
          </span>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-1.5 rounded-lg bg-blue-50 px-2 py-1">
        <Clock className="h-3 w-3 text-blue-500" />
        <span className="text-[10px] font-medium text-blue-700">ETA: 45 minutes</span>
      </div>
    </div>
  );
}

function MockMilestoneProof() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[10px] font-bold text-blue-600">MILESTONE SUBMITTED</span>
        <Badge className="rounded-full border-transparent bg-amber-50 px-1.5 py-0 text-[8px] font-bold text-amber-600">
          Awaiting QS
        </Badge>
      </div>
      <div className="mb-2 flex gap-1.5">
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100">
          <p className="text-[8px] font-medium text-gray-400">Before</p>
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-emerald-50">
          <p className="text-[8px] font-medium text-emerald-500">After</p>
        </div>
      </div>
      <div className="space-y-1">
        <div className="flex items-center gap-1.5">
          <CheckCircle className="h-3 w-3 text-emerald-500" />
          <span className="text-[10px] text-gray-600">Membrane applied — 4 photos</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Clock className="h-3 w-3 text-amber-500" />
          <span className="text-[10px] text-gray-600">QS verifying scope &amp; requirements</span>
        </div>
      </div>
      <div className="mt-2 flex items-center gap-1.5 rounded-md bg-emerald-100 px-2.5 py-1.5">
        <CheckCircle className="h-3 w-3 text-emerald-600" />
        <span className="text-[10px] font-bold text-emerald-700">Your approval required</span>
      </div>
    </div>
  );
}

function MockApproveRelease() {
  return (
    <div className="rounded-xl border border-emerald-200 border-l-2 border-l-emerald-500 bg-emerald-50 p-3 shadow-sm">
      <div className="mb-2 flex items-center gap-2">
        <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
        <span className="text-[10px] font-bold text-emerald-700">QS VERIFIED</span>
      </div>
      <p className="text-xs font-semibold text-gray-900">Milestone 2: Membrane Applied</p>
      <p className="mt-1 text-[10px] text-gray-500">Scope confirmed. Requirements met.</p>
      <div className="mt-2 flex items-center justify-between rounded-lg bg-emerald-100 px-3 py-2.5">
        <span className="text-xs font-bold text-emerald-800">$2,800.00</span>
        <span className="rounded-full bg-emerald-600 px-4 py-1.5 text-[10px] font-bold text-white shadow-md ring-2 ring-emerald-600/20">
          Approve &amp; Release
        </span>
      </div>
      <p className="mt-2 text-center text-[9px] font-medium text-emerald-600">
        You decide when to release — Pro paid within 24 hrs
      </p>
    </div>
  );
}

/* ── Steps Data ── */

const steps: Step[] = [
  { step: '1', icon: Upload, title: 'Post Your Job', desc: 'Describe what you need — or upload plans and photos.', color: 'bg-blue-100 text-blue-600', ring: 'ring-blue-200', accent: 'bg-blue-500/60', mock: <MockPostJob /> },
  { step: '2', icon: SearchCheck, title: 'We Verify the Scope', desc: 'A Quantity Surveyor reviews scope and cost before work starts.', color: 'bg-emerald-100 text-emerald-600', ring: 'ring-emerald-200', accent: 'bg-emerald-500/60', mock: <MockQsReview /> },
  { step: '3', icon: Lock, title: 'Funds Locked in Escrow', desc: 'Your money moves into a bonded escrow vault. Nobody touches it.', color: 'bg-violet-100 text-violet-600', ring: 'ring-violet-200', accent: 'bg-violet-500/60', mock: <MockEscrow /> },
  { step: '4', icon: UserCheck, title: 'Verified Pro Dispatched', desc: 'An insured, background-checked pro is matched and dispatched.', color: 'bg-amber-100 text-amber-600', ring: 'ring-amber-200', accent: 'bg-amber-500/60', mock: <MockProDispatched /> },
  { step: '5', icon: Camera, title: 'Milestone + Photo Proof', desc: 'Pro completes work, uploads photos. QS verifies scope and milestone requirements.', color: 'bg-blue-100 text-blue-600', ring: 'ring-blue-200', accent: 'bg-blue-500/60', mock: <MockMilestoneProof /> },
  { step: '6', icon: BadgeDollarSign, title: 'You Approve → Pro Paid', desc: 'You review the work. Approve the milestone. Pro gets paid in 24 hrs.', color: 'bg-emerald-100 text-emerald-600', ring: 'ring-emerald-200', accent: 'bg-emerald-500/60', mock: <MockApproveRelease /> },
];

/* ── Component ── */

export function HowItWorksFlow() {
  const [active, setActive] = React.useState(0);
  const hoverRef = React.useRef<number | null>(null);

  React.useEffect(() => {
    return () => {
      if (hoverRef.current) window.clearTimeout(hoverRef.current);
    };
  }, []);

  const preview = (idx: number) => {
    if (hoverRef.current) window.clearTimeout(hoverRef.current);
    hoverRef.current = window.setTimeout(() => setActive(idx), 120);
  };

  return (
    <div>
      {/* Desktop: interactive 2-column */}
      <div className="hidden lg:grid lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        {/* Left: step list */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <p className="text-xs font-semibold text-gray-500">Choose a step</p>
            <p className="text-xs text-gray-400">
              {active + 1} / {steps.length}
            </p>
          </div>
          <div className="mb-5 h-1.5 w-full overflow-hidden rounded-full bg-gray-100">
            <div
              className="h-full rounded-full bg-gray-900/10 transition-all"
              style={{ width: `${((active + 1) / steps.length) * 100}%` }}
            />
          </div>

          <div
            role="listbox"
            aria-label="How it works steps"
            onKeyDown={(e) => {
              if (e.key === 'ArrowDown') {
                e.preventDefault();
                setActive((a) => Math.min(a + 1, steps.length - 1));
              }
              if (e.key === 'ArrowUp') {
                e.preventDefault();
                setActive((a) => Math.max(a - 1, 0));
              }
            }}
            tabIndex={0}
            className="space-y-3 focus:outline-none"
          >
          {steps.map((item, idx) => {
            const Icon = item.icon;
            const isActive = idx === active;

            return (
              <button
                key={item.step}
                type="button"
                role="option"
                aria-selected={isActive}
                onClick={() => {
                  if (hoverRef.current) window.clearTimeout(hoverRef.current);
                  setActive(idx);
                }}
                onMouseEnter={() => preview(idx)}
                className={[
                  'group w-full rounded-2xl border p-4 text-left transition',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40',
                  isActive
                    ? 'border-gray-200 bg-white shadow-sm ring-1 ring-gray-900/5'
                    : 'border-transparent hover:bg-gray-50/70',
                ].join(' ')}
              >
                <div className="relative">
                  {isActive && (
                    <span className={`absolute left-0 top-1/2 h-10 w-1 -translate-y-1/2 rounded-full ${item.accent}`} />
                  )}
                <div className="flex items-start gap-4 pl-3">
                  <div
                    className={`shrink-0 rounded-2xl ring-4 ${item.ring} ${item.color} p-3 transition-transform group-hover:scale-[1.02]`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      Step {item.step}
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-gray-900">{item.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-gray-500">{item.desc}</p>
                  </div>
                </div>
                </div>
              </button>
            );
          })}
          </div>
        </div>

        {/* Right: sticky proof card */}
        <div className="relative">
          <div className="sticky top-24 rounded-3xl border border-gray-200/70 bg-white/70 p-6 shadow-sm backdrop-blur">
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/40" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-t-3xl bg-gradient-to-r from-transparent via-gray-200/80 to-transparent" />

            <p className="relative mb-3 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
              Example in the app
            </p>

            <div className="relative rounded-2xl bg-white p-4 shadow-card">
              <div key={active} className="animate-fade-in">
                {steps[active].mock}
              </div>
            </div>

            <div className="relative mt-4 flex items-center gap-2 text-xs text-gray-500">
              <CheckCircle className="h-4 w-4 text-emerald-600" />
              <span>Each step is verified and logged in your Home Vault.</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile: stacked timeline */}
      <div className="lg:hidden">
        <div className="space-y-6">
          {steps.map((item) => (
            <div key={item.step} className="rounded-2xl p-2 transition hover:bg-gray-50/70">
              <div className="flex gap-4">
                <div className={`shrink-0 rounded-2xl ring-4 ${item.ring} ${item.color} p-3`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                    Step {item.step}
                  </p>
                  <h3 className="mt-1 text-lg font-bold text-gray-900">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-500">{item.desc}</p>
                </div>
              </div>

              <div className="mt-3">
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-gray-400">
                  Example in the app
                </p>
                <div className="rounded-2xl bg-white p-4 shadow-card">
                  {item.mock}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
