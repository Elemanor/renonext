import type { Metadata } from 'next';
import Link from 'next/link';
import { ScrollReveal } from '@/components/sentinel/scroll-reveal';
import {
  sitePulseModules,
  heroStats,
  teamPulseStats,
  teamMembers,
  weeklyFocus,
  timesheetSummary,
  projectAllocations,
  dailyEntries,
  adminMetrics,
  weeklyTrends,
  recentStatus,
} from '@/lib/data/site-pulse';

export const metadata: Metadata = {
  title: 'SitePulse — GPS Check-In/Check-Out Time Tracking | RenoNext',
  description:
    'Workers never fill timesheets again. GPS-verified check-in and check-out auto-generates timesheets, overtime, and payroll exports for construction teams.',
  alternates: {
    canonical: '/apps/site-pulse',
  },
};

/* ------------------------------------------------------------------ */
/*  Helper: status dot color                                           */
/* ------------------------------------------------------------------ */
function statusColor(s: 'present' | 'remote' | 'away' | 'on-site' | 'off-site' | 'late') {
  switch (s) {
    case 'present':
    case 'on-site':
      return 'bg-[#22c55e]';
    case 'remote':
    case 'off-site':
      return 'bg-[#005DB7]';
    case 'away':
    case 'late':
      return 'bg-[#FF6D00]';
  }
}

function statusLabel(s: 'on-site' | 'off-site' | 'late') {
  switch (s) {
    case 'on-site':
      return { text: 'On Site', cls: 'bg-[#22c55e]/15 text-[#22c55e]' };
    case 'off-site':
      return { text: 'Off Site', cls: 'bg-[#005DB7]/15 text-[#005DB7]' };
    case 'late':
      return { text: 'Late', cls: 'bg-[#FF6D00]/15 text-[#FF6D00]' };
  }
}

export default function SitePulsePage() {
  const presentMembers = teamMembers.filter((m) => m.status === 'present');
  const remoteMembers = teamMembers.filter((m) => m.status === 'remote');
  const awayMembers = teamMembers.filter((m) => m.status === 'away');

  return (
    <main className="overflow-hidden">
      {/* ================================================================
          SECTION 1 — HERO (Dark bg, phone mockup of Dashboard)
          ================================================================ */}
      <section className="relative bg-reno-dark overflow-hidden">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#FF6D00]/10 rounded-full blur-[150px] -translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Copy + CTAs */}
            <div>
              <div className="inline-flex items-center gap-2 bg-[#FF6D00]/10 px-4 py-1.5 rounded-full border border-[#FF6D00]/30 mb-8">
                <span
                  className="material-symbols-outlined text-[#FF6D00] text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  gps_fixed
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-[#FF6D00]">
                  GPS Attendance Platform
                </span>
              </div>

              <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-6">
                Site
                <span className="text-[#FF6D00]">Pulse</span>
              </h1>

              <p className="text-lg md:text-xl text-slate-400 max-w-xl font-light leading-relaxed mb-10">
                Workers hate filling timesheets. So we killed them. Tap{' '}
                <span className="text-white font-semibold">Check In</span> when
                you arrive,{' '}
                <span className="text-white font-semibold">Check Out</span> when
                you leave. GPS does the rest.
              </p>

              <div className="flex flex-wrap gap-4 mb-12">
                <Link
                  href="#early-access"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-bold shadow-float hover:shadow-float-hover transition-all"
                >
                  Request Early Access
                  <span className="material-symbols-outlined text-lg">
                    arrow_forward
                  </span>
                </Link>
                <Link
                  href="#features"
                  className="inline-flex items-center gap-2 border-2 border-slate-600 hover:border-primary text-white px-8 py-4 rounded-lg font-bold transition-all"
                >
                  See It In Action
                  <span className="material-symbols-outlined text-lg">
                    play_circle
                  </span>
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-slate-500 mb-1 font-medium">
                      {stat.label}
                    </span>
                    <div className="bg-white/5 border border-white/10 px-4 py-2.5 rounded">
                      <span className="font-black text-white text-base">
                        {stat.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Phone mockup — Dashboard screen */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-[340px]">
                {/* Phone frame */}
                <div className="bg-zinc-900 rounded-[2.5rem] p-3 shadow-2xl border-[8px] border-zinc-800 relative">
                  {/* Notch */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-32 h-7 bg-zinc-800 rounded-full z-20" />

                  {/* Screen */}
                  <div className="bg-[#F3FAFF] rounded-[2rem] overflow-hidden relative z-10">
                    {/* Status bar */}
                    <div className="flex justify-between items-center px-8 pt-10 pb-2 text-[#071E27]/50 text-xs">
                      <span className="font-semibold">9:41</span>
                      <div className="flex gap-1 items-center">
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>signal_cellular_alt</span>
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>wifi</span>
                        <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>battery_full</span>
                      </div>
                    </div>

                    {/* Greeting */}
                    <div className="px-5 pt-2 pb-3">
                      <p className="text-[10px] uppercase tracking-[0.2em] text-[#4C616C] font-bold">CONSTRUCTION CENTRAL</p>
                      <h3 className="text-[#071E27] text-lg font-extrabold leading-tight mt-1">Good Morning, James</h3>
                      <p className="text-[#4C616C] text-[10px] mt-0.5">Riverside Tower • 43.6532° N, 79.3832° W</p>
                    </div>

                    {/* Check In / Check Out buttons */}
                    <div className="px-5 grid grid-cols-2 gap-2 mb-3">
                      <div className="bg-[#FF6D00] rounded-lg py-3 text-center">
                        <span className="material-symbols-outlined text-white text-lg block mb-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>login</span>
                        <span className="text-white text-[10px] font-bold uppercase tracking-widest">Check In</span>
                      </div>
                      <div className="bg-[#E6F6FF] border border-[#CFE6F2] rounded-lg py-3 text-center">
                        <span className="material-symbols-outlined text-[#4C616C] text-lg block mb-0.5" style={{ fontVariationSettings: "'FILL' 1" }}>logout</span>
                        <span className="text-[#4C616C] text-[10px] font-bold uppercase tracking-widest">Check Out</span>
                      </div>
                    </div>

                    {/* Team Pulse mini-widget */}
                    <div className="mx-5 bg-white rounded-lg border border-[#CFE6F2] p-3 mb-3">
                      <p className="text-[9px] uppercase tracking-[0.2em] text-[#4C616C] font-bold mb-2">TEAM PULSE</p>
                      <div className="space-y-1.5">
                        {teamMembers.slice(0, 3).map((m) => (
                          <div key={m.initials} className="flex items-center gap-2">
                            <div className={`w-1.5 h-1.5 rounded-full ${statusColor(m.status)}`} />
                            <span className="text-[#071E27] text-[10px] font-semibold flex-1 truncate">{m.name}</span>
                            <span className="text-[#4C616C] text-[9px]">{m.role}</span>
                          </div>
                        ))}
                        <p className="text-[9px] text-[#005DB7] font-semibold mt-1">+{teamMembers.length - 3} more →</p>
                      </div>
                    </div>

                    {/* Weekly Focus */}
                    <div className="mx-5 bg-white rounded-lg border border-[#CFE6F2] p-3 mb-3">
                      <p className="text-[9px] uppercase tracking-[0.2em] text-[#4C616C] font-bold mb-2">WEEKLY FOCUS</p>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="text-center">
                          <span className="text-[#071E27] text-lg font-black leading-none">{weeklyFocus.totalHours}</span>
                          <p className="text-[8px] text-[#4C616C] uppercase tracking-wider mt-0.5">HRS</p>
                        </div>
                        <div className="text-center">
                          <span className="text-[#071E27] text-lg font-black leading-none">{weeklyFocus.avgArrival}</span>
                          <p className="text-[8px] text-[#4C616C] uppercase tracking-wider mt-0.5">AVG ARRIVAL</p>
                        </div>
                        <div className="text-center">
                          <span className="text-[#071E27] text-lg font-black leading-none">{weeklyFocus.efficiency}%</span>
                          <p className="text-[8px] text-[#4C616C] uppercase tracking-wider mt-0.5">EFFICIENCY</p>
                        </div>
                      </div>
                    </div>

                    {/* Active Task + Safety */}
                    <div className="mx-5 grid grid-cols-2 gap-2 mb-4">
                      <div className="bg-white rounded-lg border border-[#CFE6F2] p-2.5">
                        <span className="material-symbols-outlined text-[#FF6D00] text-base" style={{ fontVariationSettings: "'FILL' 1" }}>task_alt</span>
                        <p className="text-[9px] text-[#4C616C] uppercase tracking-wider font-bold mt-1">ACTIVE TASK</p>
                        <p className="text-[10px] text-[#071E27] font-semibold mt-0.5 leading-tight">Pour footings Zone&nbsp;B</p>
                      </div>
                      <div className="bg-white rounded-lg border border-[#CFE6F2] p-2.5">
                        <span className="material-symbols-outlined text-[#22c55e] text-base" style={{ fontVariationSettings: "'FILL' 1" }}>verified_user</span>
                        <p className="text-[9px] text-[#4C616C] uppercase tracking-wider font-bold mt-1">SAFETY</p>
                        <p className="text-[10px] text-[#22c55e] font-semibold mt-0.5">100% Compliant</p>
                      </div>
                    </div>

                    {/* Home indicator */}
                    <div className="flex justify-center pb-2">
                      <div className="w-28 h-1 bg-[#071E27]/20 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 2 — TEAM PULSE (white bg, tablet mockup)
          ================================================================ */}
      <section id="features" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Copy */}
            <ScrollReveal>
              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-widest">
                  Real-Time Crew Board
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#102122] mt-4 tracking-tight">
                  See Every Worker, Every Zone
                </h2>
                <p className="text-slate-600 mt-4 text-lg leading-relaxed">
                  The moment someone checks in, their status appears on the Crew
                  Board. Supervisors see who&apos;s on site, who&apos;s remote,
                  and who hasn&apos;t arrived — in real time.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#FF6D00]/10 rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#FF6D00]" style={{ fontVariationSettings: "'FILL' 1" }}>groups</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#102122] mb-1">
                        Live Headcount
                      </h4>
                      <p className="text-slate-600 text-sm">
                        Present, remote, and away counts update as workers check
                        in and out throughout the day.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>pin_drop</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#102122] mb-1">
                        Zone Tracking
                      </h4>
                      <p className="text-slate-600 text-sm">
                        Every worker shows their current zone assignment. Know
                        exactly where your crew is deployed.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#E8AA42]/10 rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#E8AA42]" style={{ fontVariationSettings: "'FILL' 1" }}>filter_list</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#102122] mb-1">
                        Unit Filters
                      </h4>
                      <p className="text-slate-600 text-sm">
                        Filter by department — Operations, Engineering,
                        Logistics, Safety — to focus on relevant crews.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right: Tablet mockup — Team Pulse */}
            <ScrollReveal>
              <div className="flex justify-center">
                <div className="w-full max-w-[600px]">
                  {/* Tablet frame */}
                  <div className="bg-zinc-900 rounded-[1.5rem] p-2 shadow-2xl border-4 border-zinc-800 relative">
                    {/* Screen */}
                    <div className="bg-[#F3FAFF] rounded-[1rem] overflow-hidden relative z-10">
                      {/* Header bar */}
                      <div className="bg-white border-b border-[#CFE6F2] px-5 py-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-[10px] uppercase tracking-[0.2em] text-[#4C616C] font-bold">TEAM PULSE</p>
                            <p className="text-[#071E27] text-sm font-extrabold mt-0.5">Crew Status Board</p>
                          </div>
                          <div className="text-[10px] text-[#4C616C]">Updated just now</div>
                        </div>
                      </div>

                      {/* Stat cards row */}
                      <div className="px-4 pt-4 grid grid-cols-3 gap-2">
                        <div className="bg-white rounded-lg border border-[#CFE6F2] p-3 text-center">
                          <span className="text-[#22c55e] text-2xl font-black">{teamPulseStats.present}</span>
                          <p className="text-[9px] uppercase tracking-[0.15em] text-[#4C616C] font-bold mt-1">PRESENT</p>
                        </div>
                        <div className="bg-white rounded-lg border border-[#CFE6F2] p-3 text-center">
                          <span className="text-[#005DB7] text-2xl font-black">{teamPulseStats.remote}</span>
                          <p className="text-[9px] uppercase tracking-[0.15em] text-[#4C616C] font-bold mt-1">REMOTE</p>
                        </div>
                        <div className="bg-white rounded-lg border border-[#CFE6F2] p-3 text-center">
                          <span className="text-[#FF6D00] text-2xl font-black">{String(teamPulseStats.away).padStart(2, '0')}</span>
                          <p className="text-[9px] uppercase tracking-[0.15em] text-[#4C616C] font-bold mt-1">AWAY</p>
                        </div>
                      </div>

                      {/* Filter pills */}
                      <div className="px-4 pt-3 flex gap-2 flex-wrap">
                        {['All Units', 'Operations', 'Engineering', 'Logistics'].map((f, i) => (
                          <span
                            key={f}
                            className={`text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                              i === 0
                                ? 'bg-[#FF6D00] text-white'
                                : 'bg-[#E6F6FF] text-[#4C616C] border border-[#CFE6F2]'
                            }`}
                          >
                            {f}
                          </span>
                        ))}
                      </div>

                      {/* Worker cards */}
                      <div className="px-4 pt-3 pb-4 space-y-3">
                        {/* Present */}
                        <div>
                          <p className="text-[9px] uppercase tracking-[0.2em] text-[#22c55e] font-bold mb-1.5">PRESENT ({presentMembers.length})</p>
                          <div className="grid grid-cols-2 gap-2">
                            {presentMembers.map((m) => (
                              <div key={m.initials} className="bg-white rounded-lg border border-[#CFE6F2] p-2.5 flex items-start gap-2">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF6D00] to-[#9F4200] flex items-center justify-center flex-shrink-0">
                                  <span className="text-white text-[10px] font-bold">{m.initials}</span>
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-1">
                                    <span className="text-[10px] font-bold text-[#071E27] truncate">{m.name}</span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] flex-shrink-0" />
                                  </div>
                                  <p className="text-[8px] text-[#4C616C] truncate">{m.role}</p>
                                  <p className="text-[8px] text-[#4C616C] truncate">{m.zone}</p>
                                  <p className="text-[8px] text-[#005DB7] font-semibold mt-0.5">{m.checkIn}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Remote */}
                        <div>
                          <p className="text-[9px] uppercase tracking-[0.2em] text-[#005DB7] font-bold mb-1.5">REMOTE ({remoteMembers.length})</p>
                          <div className="grid grid-cols-2 gap-2">
                            {remoteMembers.map((m) => (
                              <div key={m.initials} className="bg-white rounded-lg border border-[#CFE6F2] p-2.5 flex items-start gap-2">
                                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#005DB7] to-[#003F7A] flex items-center justify-center flex-shrink-0">
                                  <span className="text-white text-[10px] font-bold">{m.initials}</span>
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-1">
                                    <span className="text-[10px] font-bold text-[#071E27] truncate">{m.name}</span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#005DB7] flex-shrink-0" />
                                  </div>
                                  <p className="text-[8px] text-[#4C616C] truncate">{m.role}</p>
                                  <p className="text-[8px] text-[#4C616C] truncate">{m.zone}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Away */}
                        <div>
                          <p className="text-[9px] uppercase tracking-[0.2em] text-[#FF6D00] font-bold mb-1.5">AWAY ({awayMembers.length})</p>
                          <div className="grid grid-cols-2 gap-2">
                            {awayMembers.map((m) => (
                              <div key={m.initials} className="bg-white rounded-lg border border-[#CFE6F2] p-2.5 flex items-start gap-2 opacity-60">
                                <div className="w-8 h-8 rounded-lg bg-[#CFE6F2] flex items-center justify-center flex-shrink-0">
                                  <span className="text-[#4C616C] text-[10px] font-bold">{m.initials}</span>
                                </div>
                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-1">
                                    <span className="text-[10px] font-bold text-[#071E27] truncate">{m.name}</span>
                                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6D00] flex-shrink-0" />
                                  </div>
                                  <p className="text-[8px] text-[#4C616C] truncate">{m.role}</p>
                                  <p className="text-[8px] text-[#4C616C] truncate">{m.zone}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 3 — AUTO-GENERATED TIMESHEETS (bg-[#f6f8f8], browser mockup)
          ================================================================ */}
      <section className="bg-[#f6f8f8] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Browser mockup — Timesheet screen */}
            <ScrollReveal>
              <div className="order-2 lg:order-1">
                {/* Browser frame */}
                <div className="bg-zinc-900 rounded-t-xl shadow-2xl border border-zinc-800">
                  {/* Chrome bar */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-700">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-reno-amber-500" />
                      <div className="w-3 h-3 rounded-full bg-reno-green-500" />
                    </div>
                    <div className="flex-1 ml-4">
                      <div className="bg-zinc-800 rounded px-3 py-1 text-xs text-slate-400">
                        app.sitepulse.com/timesheets
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="bg-[#F3FAFF] p-5 min-h-[460px]">
                    {/* Hero summary */}
                    <div className="bg-white rounded-lg border border-[#CFE6F2] p-4 mb-4">
                      <div className="flex items-center justify-between flex-wrap gap-2">
                        <div>
                          <p className="text-[9px] uppercase tracking-[0.2em] text-[#4C616C] font-bold">THIS WEEK</p>
                          <div className="flex items-baseline gap-2 mt-1">
                            <span className="text-[#071E27] text-3xl font-black">{timesheetSummary.totalHours}</span>
                            <span className="text-[10px] uppercase tracking-widest text-[#4C616C] font-bold">HRS</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[9px] bg-[#FF6D00]/10 text-[#FF6D00] font-bold uppercase tracking-wider px-2.5 py-1 rounded">
                            Pending Approval
                          </span>
                          <span className="text-[9px] bg-[#22c55e]/10 text-[#22c55e] font-bold uppercase tracking-wider px-2.5 py-1 rounded flex items-center gap-1">
                            <span className="material-symbols-outlined text-[10px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                            GPS Verified
                          </span>
                        </div>
                      </div>

                      {/* Regular / OT bars */}
                      <div className="mt-3 flex gap-2 items-center">
                        <div className="flex-1 h-2 bg-[#E6F6FF] rounded-full overflow-hidden flex">
                          <div className="bg-[#005DB7] rounded-full" style={{ width: `${(timesheetSummary.regular / timesheetSummary.totalHours) * 100}%` }} />
                          <div className="bg-[#FF6D00] rounded-full" style={{ width: `${(timesheetSummary.overtime / timesheetSummary.totalHours) * 100}%` }} />
                        </div>
                        <div className="flex gap-3 text-[8px] text-[#4C616C] font-bold">
                          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#005DB7]" />{timesheetSummary.regular}h REG</span>
                          <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[#FF6D00]" />{timesheetSummary.overtime}h OT</span>
                        </div>
                      </div>
                    </div>

                    {/* Project allocation cards */}
                    <p className="text-[9px] uppercase tracking-[0.2em] text-[#4C616C] font-bold mb-2">PROJECT ALLOCATION</p>
                    <div className="space-y-2 mb-4">
                      {projectAllocations.map((p) => (
                        <div
                          key={p.code}
                          className="bg-white rounded-lg border border-[#CFE6F2] p-3 flex items-center gap-3"
                          style={{ borderLeftWidth: 4, borderLeftColor: p.color }}
                        >
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-bold text-[#071E27] truncate">{p.name}</p>
                            <p className="text-[8px] text-[#4C616C] font-mono">{p.code}</p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <span className="text-[#071E27] text-sm font-black">{p.hours}h</span>
                            <p className="text-[8px] text-[#4C616C]">{p.percentage}%</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Daily entries table */}
                    <p className="text-[9px] uppercase tracking-[0.2em] text-[#4C616C] font-bold mb-2">DAILY ENTRIES</p>
                    <div className="bg-white rounded-lg border border-[#CFE6F2] overflow-hidden">
                      <table className="w-full text-[10px]">
                        <thead>
                          <tr className="border-b border-[#CFE6F2]">
                            <th className="text-left text-[#4C616C] font-bold uppercase tracking-wider py-2 px-3">Day</th>
                            <th className="text-left text-[#4C616C] font-bold uppercase tracking-wider py-2 px-3">Project</th>
                            <th className="text-left text-[#4C616C] font-bold uppercase tracking-wider py-2 px-3">In</th>
                            <th className="text-left text-[#4C616C] font-bold uppercase tracking-wider py-2 px-3">Out</th>
                            <th className="text-right text-[#4C616C] font-bold uppercase tracking-wider py-2 px-3">Total</th>
                            <th className="text-center text-[#4C616C] font-bold uppercase tracking-wider py-2 px-3">GPS</th>
                          </tr>
                        </thead>
                        <tbody>
                          {dailyEntries.map((e) => (
                            <tr key={e.day} className="border-b border-[#CFE6F2] last:border-b-0">
                              <td className="py-2 px-3 text-[#071E27] font-semibold">{e.day} <span className="text-[#4C616C] font-normal">{e.date}</span></td>
                              <td className="py-2 px-3 text-[#071E27]">{e.project}</td>
                              <td className="py-2 px-3 text-[#4C616C]">{e.timeIn}</td>
                              <td className="py-2 px-3 text-[#4C616C]">{e.timeOut}</td>
                              <td className="py-2 px-3 text-right text-[#071E27] font-bold">{e.total}h</td>
                              <td className="py-2 px-3 text-center">
                                {e.verified && (
                                  <span className="inline-flex items-center gap-0.5 bg-[#22c55e]/10 text-[#22c55e] rounded px-1.5 py-0.5 text-[8px] font-bold">
                                    <span className="material-symbols-outlined text-[9px]" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                                    OK
                                  </span>
                                )}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right: Copy */}
            <ScrollReveal>
              <div className="order-1 lg:order-2">
                <span className="text-xs font-bold text-primary uppercase tracking-widest">
                  Zero Manual Entry
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#102122] mt-4 tracking-tight">
                  Auto-Generated Timesheets
                </h2>
                <p className="text-slate-600 mt-4 text-lg leading-relaxed">
                  Check-in and check-out times flow directly into timesheets.
                  Project codes, overtime, and GPS verification — all automatic.
                  Your crew never touches a spreadsheet again.
                </p>

                <div className="mt-8 space-y-3">
                  {[
                    'GPS-verified location stamps on every entry',
                    'Auto-split hours across multiple project codes',
                    'Overtime calculated per Ontario ESA and your custom rules',
                    'One-click export to QuickBooks, ADP, Sage, or CSV',
                    'Audit trail for every timesheet change',
                  ].map((feature, idx) => (
                    <div key={idx} className="flex gap-3">
                      <span
                        className="material-symbols-outlined text-primary flex-shrink-0 mt-0.5"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        check_circle
                      </span>
                      <p className="text-slate-600">{feature}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 bg-white border-l-4 border-[#FF6D00] p-4 shadow-sm">
                  <p className="text-[#102122] font-semibold mb-1">
                    Compliant with Ontario ESA & BC Employment Standards
                  </p>
                  <p className="text-slate-600 text-sm">
                    Built-in rules for daily overtime, weekly thresholds, and
                    statutory holiday multipliers. Custom rates for union
                    contracts.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 4 — ADMIN DASHBOARD (white bg, browser mockup)
          ================================================================ */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Copy */}
            <ScrollReveal>
              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-widest">
                  Organization-Wide Visibility
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#102122] mt-4 tracking-tight">
                  Admin Dashboard
                </h2>
                <p className="text-slate-600 mt-4 text-lg leading-relaxed">
                  See the full picture. Total active workers, health index, late
                  arrivals, and weekly trends — all in one view. Export reports
                  for payroll, safety audits, or project billing.
                </p>

                <div className="mt-8 space-y-4">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#FF6D00]/10 rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#FF6D00]" style={{ fontVariationSettings: "'FILL' 1" }}>monitoring</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#102122] mb-1">Health Index</h4>
                      <p className="text-slate-600 text-sm">
                        A single score combining attendance rate, on-time
                        arrivals, and shift completion across your organization.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>bar_chart</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#102122] mb-1">Weekly Trends</h4>
                      <p className="text-slate-600 text-sm">
                        Visualize attendance patterns across the week. Spot
                        under-staffed days before they become problems.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-[#E8AA42]/10 rounded-lg flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#E8AA42]" style={{ fontVariationSettings: "'FILL' 1" }}>download</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-[#102122] mb-1">Export Anything</h4>
                      <p className="text-slate-600 text-sm">
                        CSV, PDF, or direct payroll integration. Generate
                        reports by site, department, or date range.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Right: Browser mockup — Admin Overview */}
            <ScrollReveal>
              <div>
                {/* Browser frame */}
                <div className="bg-zinc-900 rounded-t-xl shadow-2xl border border-zinc-800">
                  {/* Chrome bar */}
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-zinc-700">
                    <div className="flex gap-1.5">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <div className="w-3 h-3 rounded-full bg-reno-amber-500" />
                      <div className="w-3 h-3 rounded-full bg-reno-green-500" />
                    </div>
                    <div className="flex-1 ml-4">
                      <div className="bg-zinc-800 rounded px-3 py-1 text-xs text-slate-400">
                        app.sitepulse.com/admin/overview
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="bg-[#F3FAFF] p-5 min-h-[460px]">
                    {/* Top row: Total Active + Health Index */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {/* Total Active */}
                      <div className="bg-white rounded-lg border border-[#CFE6F2] p-4">
                        <p className="text-[9px] uppercase tracking-[0.2em] text-[#4C616C] font-bold">TOTAL ACTIVE NOW</p>
                        <div className="flex items-baseline gap-2 mt-1">
                          <span className="text-[#071E27] text-4xl font-black">{adminMetrics.totalActive}</span>
                          <span className="text-[9px] bg-[#22c55e]/15 text-[#22c55e] font-bold px-2 py-0.5 rounded">
                            +{adminMetrics.changeVsYesterday}% vs Yesterday
                          </span>
                        </div>
                      </div>

                      {/* Health Index */}
                      <div className="bg-white rounded-lg border border-[#CFE6F2] p-4">
                        <p className="text-[9px] uppercase tracking-[0.2em] text-[#4C616C] font-bold">HEALTH INDEX</p>
                        <div className="flex items-baseline gap-1 mt-1">
                          <span className="text-[#071E27] text-4xl font-black">{adminMetrics.healthIndex}</span>
                          <span className="text-[#4C616C] text-sm font-bold">%</span>
                        </div>
                        <div className="mt-2 h-1.5 bg-[#E6F6FF] rounded-full overflow-hidden">
                          <div className="h-full bg-[#22c55e] rounded-full" style={{ width: `${adminMetrics.healthIndex}%` }} />
                        </div>
                      </div>
                    </div>

                    {/* Grid stats */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                      <div className="bg-white rounded-lg border border-[#CFE6F2] p-3 text-center">
                        <span className="text-[#22c55e] text-xl font-black">{adminMetrics.present}</span>
                        <p className="text-[8px] uppercase tracking-[0.15em] text-[#4C616C] font-bold mt-0.5">PRESENT</p>
                      </div>
                      <div className="bg-white rounded-lg border border-[#CFE6F2] p-3 text-center">
                        <span className="text-[#FF6D00] text-xl font-black">{String(adminMetrics.late).padStart(2, '0')}</span>
                        <p className="text-[8px] uppercase tracking-[0.15em] text-[#4C616C] font-bold mt-0.5">LATE</p>
                      </div>
                      <div className="bg-white rounded-lg border border-[#CFE6F2] p-3 text-center">
                        <span className="text-[#005DB7] text-xl font-black">{adminMetrics.onLeave}</span>
                        <p className="text-[8px] uppercase tracking-[0.15em] text-[#4C616C] font-bold mt-0.5">ON LEAVE</p>
                      </div>
                    </div>

                    {/* Weekly trends bar chart */}
                    <div className="bg-white rounded-lg border border-[#CFE6F2] p-4 mb-4">
                      <p className="text-[9px] uppercase tracking-[0.2em] text-[#4C616C] font-bold mb-3">WEEKLY TRENDS</p>
                      <div className="flex items-end gap-2 h-24">
                        {weeklyTrends.map((d) => (
                          <div key={d.day} className="flex-1 flex flex-col items-center gap-1">
                            <div className="w-full flex flex-col items-center justify-end h-20 relative">
                              {/* Target line */}
                              <div
                                className="absolute w-full border-t border-dashed border-[#CFE6F2]"
                                style={{ bottom: `${(d.target / 100) * 100}%` }}
                              />
                              {/* Actual bar */}
                              <div
                                className="w-full rounded-t"
                                style={{
                                  height: `${(d.actual / 100) * 100}%`,
                                  backgroundColor: d.actual >= d.target ? '#22c55e' : '#FF6D00',
                                }}
                              />
                            </div>
                            <span className="text-[8px] text-[#4C616C] font-bold uppercase">{d.day}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-4 mt-2">
                        <span className="flex items-center gap-1 text-[8px] text-[#4C616C]"><span className="w-2 h-2 rounded-sm bg-[#22c55e]" />Actual</span>
                        <span className="flex items-center gap-1 text-[8px] text-[#4C616C]"><span className="w-2 h-0.5 border-t border-dashed border-[#CFE6F2]" />Target</span>
                      </div>
                    </div>

                    {/* Recent Status list */}
                    <div className="bg-white rounded-lg border border-[#CFE6F2] p-4">
                      <div className="flex items-center justify-between mb-3">
                        <p className="text-[9px] uppercase tracking-[0.2em] text-[#4C616C] font-bold">RECENT STATUS</p>
                        <button className="text-[9px] text-[#005DB7] font-bold">View All →</button>
                      </div>
                      <div className="space-y-2">
                        {recentStatus.map((w) => {
                          const badge = statusLabel(w.status);
                          return (
                            <div key={w.initials} className="flex items-center gap-2">
                              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#FF6D00] to-[#9F4200] flex items-center justify-center flex-shrink-0">
                                <span className="text-white text-[9px] font-bold">{w.initials}</span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-[10px] font-bold text-[#071E27] truncate">{w.name}</p>
                                <p className="text-[8px] text-[#4C616C]">{w.role}</p>
                              </div>
                              <span className={`text-[8px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${badge.cls}`}>
                                {badge.text}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 5 — MODULE GRID (bg-[#f6f8f8])
          ================================================================ */}
      <section className="bg-[#f6f8f8] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-xs font-bold text-primary uppercase tracking-widest">
                Full Platform
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#102122] mt-4 tracking-tight">
                6 Modules, One Platform
              </h2>
              <p className="text-slate-600 mt-4 max-w-2xl mx-auto text-lg">
                Everything you need to track attendance, manage crews, and
                automate payroll — unified in a single mobile-first system.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sitePulseModules.map((module, idx) => (
              <ScrollReveal key={idx}>
                <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-float hover:shadow-float-hover transition-shadow">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <span
                      className="material-symbols-outlined text-primary text-2xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {module.icon}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#102122] mb-2">
                    {module.name}
                  </h3>

                  <p className="text-slate-600 text-sm mb-4">
                    {module.description}
                  </p>

                  <ul className="space-y-2">
                    {module.features.map((feature, fIdx) => (
                      <li key={fIdx} className="flex gap-2 text-xs text-slate-600">
                        <span className="text-primary mt-0.5 flex-shrink-0">
                          •
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 6 — CTA (dark bg)
          ================================================================ */}
      <section id="early-access" className="bg-reno-dark py-24">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <div className="text-center">
              <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
                Ready to kill the timesheet?
              </h2>
              <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
                SitePulse is launching in Q2 2026. Join the early access
                waitlist to get beta pricing and priority onboarding.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <Link
                  href="/join"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-lg font-bold shadow-float hover:shadow-float-hover transition-all"
                >
                  Request Early Access
                  <span className="material-symbols-outlined text-lg">
                    arrow_forward
                  </span>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 border-2 border-slate-600 hover:border-primary text-white px-8 py-4 rounded-lg font-bold transition-all"
                >
                  Talk to Sales
                  <span className="material-symbols-outlined text-lg">
                    support_agent
                  </span>
                </Link>
              </div>

              <div className="flex flex-wrap justify-center gap-8 items-center opacity-60">
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <span
                    className="material-symbols-outlined text-[#FF6D00]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified_user
                  </span>
                  SOC 2 Type II Compliant
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <span
                    className="material-symbols-outlined text-[#FF6D00]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    cloud_done
                  </span>
                  99.9% Uptime SLA
                </div>
                <div className="flex items-center gap-2 text-slate-400 text-sm">
                  <span
                    className="material-symbols-outlined text-[#FF6D00]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    lock
                  </span>
                  AES-256 Encrypted
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
