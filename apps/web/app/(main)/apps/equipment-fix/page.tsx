import { Metadata } from 'next';
import Link from 'next/link';
import {
  equipmentFixModules,
  dispatchQueue,
  fleetItems,
  partsOnHold,
  mechanics,
  recentDowntime,
  heroStats,
  fleetStats,
  weeklyMetrics,
  severityColors,
  fleetStatusColors,
  partStatusColors,
} from '@/lib/data/equipment-fix';
import { ScrollReveal } from '@/components/sentinel/scroll-reveal';
import { AnimatedStatsRow } from '@/components/sentinel/animated-stats';

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title: 'EquipmentFix | Mechanical Work Center | RenoNext',
  description:
    'Equipment goes down. Your crew shouldn\'t. Real-time dispatch, fleet tracking, and parts management for construction teams.',
  alternates: {
    canonical: '/apps/equipment-fix',
  },
  openGraph: {
    title: 'EquipmentFix — Equipment Maintenance & Dispatch',
    description:
      'Real-time dispatch, fleet tracking, and parts management for construction equipment.',
    type: 'website',
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function formatCurrency(n: number): string {
  return '$' + n.toLocaleString('en-CA');
}

function healthColor(score: number): string {
  if (score >= 80) return '#22c55e';
  if (score >= 50) return '#FFB300';
  return '#ef4444';
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function EquipmentFixPage() {
  return (
    <div className="min-h-screen">
      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 1 — HERO
      ═══════════════════════════════════════════════════════════════════ */}
      <header className="relative overflow-hidden bg-[#0a0a0a] pt-20 pb-20 md:pt-28 md:pb-28 px-6">
        {/* Glow effects — amber tinted */}
        <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/4 w-[700px] h-[700px] bg-[#FFB300]/6 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-[500px] h-[500px] bg-[#ef4444]/4 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
          {/* Left — Copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#FFB300]/10 px-3 py-1 rounded-full text-[#FFB300] text-xs font-bold tracking-widest uppercase mb-6">
              <span
                className="material-symbols-outlined text-xs"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                build
              </span>
              Mechanical Work Center
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05] mb-4">
              Equipment
              <span className="text-[#FFB300]">Fix</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-400 leading-relaxed mb-4 max-w-xl">
              Equipment goes down. Your crew shouldn&apos;t.
            </p>

            <p className="text-base text-slate-500 leading-relaxed mb-8 max-w-xl">
              When a scissor lift dies at 7 AM, every hour matters. EquipmentFix
              lets field crews report issues with photos, dispatchers assign
              mechanics in seconds, and supervisors track resolution in real time.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#FFB300] text-black font-bold rounded-xl shadow-lg hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(255,179,0,0.25)] transition-all duration-300"
              >
                Request Early Access
                <span className="material-symbols-outlined text-lg">
                  arrow_forward
                </span>
              </Link>
              <Link
                href="#dispatch"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 text-white font-bold rounded-xl border border-white/10 hover:border-[#FFB300]/40 hover:bg-white/10 transition-all duration-300"
              >
                See It in Action
                <span className="material-symbols-outlined text-lg">
                  expand_more
                </span>
              </Link>
            </div>

            <AnimatedStatsRow stats={heroStats} />
          </div>

          {/* Right — Phone Mockup: Dispatch Queue */}
          <div className="relative hidden lg:block">
            <div className="relative z-20 mx-auto max-w-[280px]">
              {/* Phone frame */}
              <div className="bg-[#121212] rounded-[2.5rem] p-3 border-2 border-white/[0.06] shadow-2xl">
                <div className="bg-[#0a0a0a] rounded-[2rem] overflow-hidden">
                  {/* Notch */}
                  <div className="flex justify-center pt-3 pb-2">
                    <div className="w-24 h-5 bg-[#1c1c1c] rounded-full" />
                  </div>

                  {/* App header */}
                  <div className="px-4 pb-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="bg-[#FFB300] p-1.5 rounded-lg">
                        <span
                          className="material-symbols-outlined text-black text-xs"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          build
                        </span>
                      </div>
                      <div>
                        <p className="text-white text-[10px] font-bold">SiteFix</p>
                        <p className="text-[7px] text-slate-500">Mechanical Work Center</p>
                      </div>
                      <div className="ml-auto flex items-center gap-1.5">
                        <div className="text-right">
                          <p className="text-[7px] text-slate-500">On Shift</p>
                          <p className="text-[8px] text-white font-semibold">Mark F.</p>
                        </div>
                        <div className="w-6 h-6 rounded-full bg-[#FFB300]/20 border border-[#FFB300]/30 flex items-center justify-center">
                          <span className="text-[7px] font-bold text-[#FFB300]">MF</span>
                        </div>
                      </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex bg-[#121212] p-0.5 rounded-lg gap-0.5 mb-3">
                      <div className="flex-1 py-1 text-center text-[7px] font-semibold text-slate-500">
                        My Work
                      </div>
                      <div className="flex-1 py-1 text-center text-[7px] font-bold text-[#FFB300] bg-[#FFB300]/10 rounded-md border border-[#FFB300]/30">
                        Dispatch
                      </div>
                      <div className="flex-1 py-1 text-center text-[7px] font-semibold text-slate-500">
                        Fleet
                      </div>
                    </div>
                  </div>

                  {/* Dispatch queue items */}
                  <div className="px-4 pb-4 space-y-2.5">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-[9px] text-white font-bold">Dispatch Queue</p>
                      <p className="text-[7px] text-[#FFB300]/70">Updated 3m ago</p>
                    </div>

                    {dispatchQueue.slice(0, 3).map((wo) => {
                      const sev = severityColors[wo.severity];
                      return (
                        <div
                          key={wo.id}
                          className="bg-[#1c1c1c]/60 rounded-lg p-2.5 border border-white/[0.04]"
                        >
                          <div className="flex items-center gap-1.5 mb-1">
                            <span className="text-[10px] font-bold text-white">
                              {wo.id}
                            </span>
                            <span
                              className={`${sev.bg} ${sev.text} text-[7px] font-bold px-1.5 py-0.5 rounded uppercase border ${sev.border}`}
                            >
                              {wo.severity}
                            </span>
                          </div>
                          <p className="text-[9px] text-white font-medium">
                            {wo.equipment}
                          </p>
                          <p className="text-[7px] text-slate-500">
                            {wo.issue}
                          </p>
                        </div>
                      );
                    })}

                    {/* CTA button */}
                    <div className="bg-gradient-to-r from-[#FFB300] to-[#E67E22] rounded-lg py-2 text-center">
                      <span className="text-[8px] text-black font-extrabold uppercase tracking-wide">
                        + Create Work Order
                      </span>
                    </div>
                  </div>

                  {/* Bottom nav */}
                  <div className="bg-[#0a0a0a]/90 border-t border-white/[0.04] px-4 py-2">
                    <div className="flex justify-between">
                      {[
                        { icon: 'home', label: 'Dashboard', active: true },
                        { icon: 'edit', label: 'Tasks', active: false },
                        { icon: 'inventory_2', label: 'Inventory', active: false },
                        { icon: 'tune', label: 'Activity', active: false },
                      ].map((tab) => (
                        <div key={tab.label} className="text-center">
                          <span
                            className={`material-symbols-outlined text-xs ${
                              tab.active ? 'text-[#FFB300]' : 'text-slate-600'
                            }`}
                            style={
                              tab.active
                                ? { fontVariationSettings: "'FILL' 1" }
                                : undefined
                            }
                          >
                            {tab.icon}
                          </span>
                          <p
                            className={`text-[6px] font-bold ${
                              tab.active ? 'text-[#FFB300]' : 'text-slate-600'
                            }`}
                          >
                            {tab.label}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -left-8 top-1/4 z-30 bg-[#1c1c1c] rounded-xl p-3 border border-white/[0.06] shadow-lg animate-float-in-1">
              <div className="flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-[#FFB300] text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  speed
                </span>
                <div>
                  <p className="text-[9px] text-white font-bold">12 min avg</p>
                  <p className="text-[7px] text-slate-500">Response time</p>
                </div>
              </div>
            </div>

            <div className="absolute -right-6 bottom-1/3 z-30 bg-[#1c1c1c] rounded-xl p-3 border border-white/[0.06] shadow-lg animate-float-in-2">
              <div className="flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-[#22c55e] text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  wifi_off
                </span>
                <div>
                  <p className="text-[9px] text-white font-bold">Offline-First</p>
                  <p className="text-[7px] text-slate-500">Sync when online</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 2 — DISPATCH CENTER
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="dispatch" className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left — Copy */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFB300]/10 text-[#FFB300] font-semibold text-sm mb-5">
                  <span
                    className="material-symbols-outlined text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    send
                  </span>
                  Dispatch Center
                </div>

                <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-reno-dark leading-[1.1] mb-4">
                  Assign in{' '}
                  <span className="text-[#FFB300]">Seconds</span>,
                  Not Minutes
                </h2>

                <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-lg">
                  Incoming work orders land in a real-time queue with severity
                  classification. One tap assigns a mechanic with an instant push
                  notification. Auto-escalation handles the rest.
                </p>

                <ul className="space-y-4">
                  {equipmentFixModules[0].features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#FFB300]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span
                          className="material-symbols-outlined text-[#FFB300] text-base"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check
                        </span>
                      </div>
                      <span className="text-slate-600 leading-relaxed pt-1">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right — Dispatch Mockup */}
              <div className="bg-[#0a0a0a] rounded-2xl border border-white/[0.06] p-5 md:p-6 shadow-float">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-[10px] text-slate-500 uppercase tracking-wider font-bold">
                      Dispatch Queue
                    </p>
                    <p className="text-white text-lg font-bold">
                      New &amp; Unassigned
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-[#FFB300]/70 font-medium">
                      Updated 3m ago
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {dispatchQueue.map((wo, i) => {
                    const sev = severityColors[wo.severity];
                    return (
                      <div
                        key={wo.id}
                        className={`flex items-start justify-between ${
                          i < dispatchQueue.length - 1
                            ? 'border-b border-white/[0.04] pb-4'
                            : ''
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-white tracking-tight">
                              {wo.id}
                            </span>
                            <span
                              className={`${sev.bg} ${sev.text} text-[10px] font-bold px-2 py-0.5 rounded uppercase border ${sev.border}`}
                            >
                              {wo.severity}
                            </span>
                          </div>
                          <p className="text-sm text-white font-medium">
                            {wo.equipment}
                          </p>
                          <p className="text-xs text-slate-500">{wo.issue}</p>
                          <p className="text-[10px] text-slate-600 mt-1">
                            Dispatched @ {wo.dispatchedAt}
                          </p>
                        </div>
                        <button className="bg-[#1c1c1c] text-sm text-white font-semibold py-2 px-5 rounded-lg border border-white/[0.06] flex-shrink-0">
                          Assign
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 3 — FLEET OVERVIEW
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6 bg-[#f6f8f8]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFB300]/10 text-[#FFB300] font-semibold text-sm mb-5">
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  local_shipping
                </span>
                Fleet Intelligence
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-reno-dark leading-[1.1] mb-4">
                Every Machine,{' '}
                <span className="text-[#FFB300]">Every Site</span>
              </h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                Bird&apos;s-eye view of your entire fleet. See what&apos;s running,
                what&apos;s down, and where your maintenance bottlenecks are.
              </p>
            </div>
          </ScrollReveal>

          {/* Fleet stats row */}
          <ScrollReveal delay={100}>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              {fleetStats.map((s) => (
                <div
                  key={s.label}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-slate-100 shadow-sm"
                >
                  <span
                    className="w-2.5 h-2.5 rounded-full"
                    style={{ backgroundColor: s.color }}
                  />
                  <span className="text-sm font-bold text-reno-dark">{s.value}</span>
                  <span className="text-xs text-slate-400">{s.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Fleet grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {fleetItems.map((item, i) => (
              <ScrollReveal key={item.id} delay={100 + i * 50}>
                <div className="bg-white rounded-2xl p-5 shadow-float border border-primary/5 hover:-translate-y-1 hover:shadow-float-hover transition-all duration-300">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        {item.id}
                      </p>
                      <h3 className="text-sm font-bold text-reno-dark mt-0.5">
                        {item.name}
                      </h3>
                      <p className="text-xs text-slate-400">{item.type}</p>
                    </div>
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full capitalize"
                      style={{
                        backgroundColor: `${fleetStatusColors[item.status]}15`,
                        color: fleetStatusColors[item.status],
                      }}
                    >
                      {item.status}
                    </span>
                  </div>

                  {/* Health bar */}
                  <div className="mb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-[10px] text-slate-400">Health</span>
                      <span
                        className="text-xs font-bold"
                        style={{ color: healthColor(item.healthScore) }}
                      >
                        {item.healthScore}%
                      </span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${item.healthScore}%`,
                          backgroundColor: healthColor(item.healthScore),
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>{item.site}</span>
                    <span>Service: {item.lastService}</span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 4 — FIELD REPORTING + RESOLUTION
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFB300]/10 text-[#FFB300] font-semibold text-sm mb-5">
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  photo_camera
                </span>
                Field Reporting
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-reno-dark leading-[1.1] mb-4">
                Snap, Tag,{' '}
                <span className="text-[#FFB300]">Submit</span>
              </h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                Field crews report equipment issues with GPS-tagged photos and
                severity levels. No forms, no radio calls, no missed reports.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Reporting flow card */}
            <ScrollReveal delay={100}>
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-float border border-primary/5 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#FFB300]/10 flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-[#FFB300]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      photo_camera
                    </span>
                  </div>
                  <h3 className="font-bold text-reno-dark text-lg">
                    One-Tap Reporting
                  </h3>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      step: '1',
                      icon: 'photo_camera',
                      title: 'Snap a Photo',
                      desc: 'GPS-tagged with timestamp',
                    },
                    {
                      step: '2',
                      icon: 'priority_high',
                      title: 'Select Severity',
                      desc: 'Critical, Urgent, High, Medium, or Low',
                    },
                    {
                      step: '3',
                      icon: 'precision_manufacturing',
                      title: 'Pick Equipment',
                      desc: 'From site inventory list',
                    },
                    {
                      step: '4',
                      icon: 'send',
                      title: 'Submit',
                      desc: 'Dispatcher sees it instantly',
                    },
                  ].map((step) => (
                    <div
                      key={step.step}
                      className="flex items-center gap-4 p-3.5 bg-[#f6f8f8] rounded-xl border border-slate-100"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#FFB300] text-black flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-extrabold">{step.step}</span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-reno-dark">
                          {step.title}
                        </p>
                        <p className="text-[10px] text-slate-400">{step.desc}</p>
                      </div>
                      <span className="material-symbols-outlined text-slate-300 text-lg">
                        {step.icon}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Resolution timeline card */}
            <ScrollReveal delay={200}>
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-float border border-primary/5 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-primary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      timeline
                    </span>
                  </div>
                  <h3 className="font-bold text-reno-dark text-lg">
                    Resolution Timeline
                  </h3>
                </div>

                <div className="relative">
                  {/* Timeline line */}
                  <div className="absolute left-[15px] top-4 bottom-4 w-0.5 bg-slate-100" />

                  <div className="space-y-5">
                    {[
                      {
                        status: 'New',
                        time: '8:53 AM',
                        desc: 'Work order created by field crew',
                        color: '#ef4444',
                        icon: 'fiber_new',
                      },
                      {
                        status: 'Acknowledged',
                        time: '9:05 AM',
                        desc: 'Mechanic Mark F. accepted assignment',
                        color: '#FFB300',
                        icon: 'thumb_up',
                      },
                      {
                        status: 'In Progress',
                        time: '9:22 AM',
                        desc: 'Diagnosis started — hydraulic line inspection',
                        color: '#0fbabd',
                        icon: 'build',
                      },
                      {
                        status: 'Waiting Parts',
                        time: '10:15 AM',
                        desc: 'P-617 Hydraulic Cylinder on backorder',
                        color: '#E8AA42',
                        icon: 'inventory_2',
                      },
                      {
                        status: 'Fixed',
                        time: '—',
                        desc: 'Pending part delivery',
                        color: '#6b7280',
                        icon: 'check_circle',
                      },
                    ].map((step, i) => (
                      <div key={i} className="flex items-start gap-4 relative">
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10"
                          style={{ backgroundColor: `${step.color}20` }}
                        >
                          <span
                            className="material-symbols-outlined text-sm"
                            style={{
                              color: step.color,
                              fontVariationSettings: "'FILL' 1",
                            }}
                          >
                            {step.icon}
                          </span>
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-bold text-reno-dark">
                              {step.status}
                            </p>
                            <span className="text-[10px] text-slate-400">
                              {step.time}
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5">
                            {step.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 5 — PARTS & MECHANICS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6 bg-[#f6f8f8]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left — Dark mockup: Parts */}
              <div className="bg-[#0a0a0a] rounded-2xl border border-white/[0.06] p-5 md:p-6 shadow-float">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-[#FFB300]/20 flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-[#FFB300] text-sm"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      inventory_2
                    </span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold">Parts On Hold</p>
                    <p className="text-[9px] text-slate-500">
                      {partsOnHold.length} critical parts linked to work orders
                    </p>
                  </div>
                </div>

                <div className="space-y-3 mb-5">
                  {partsOnHold.map((part) => (
                    <div
                      key={part.partId}
                      className="bg-[#1c1c1c]/60 rounded-xl p-3.5 border border-white/[0.04] flex items-center gap-3"
                    >
                      <div className="w-10 h-10 bg-[#2a2a2a] rounded-lg flex items-center justify-center flex-shrink-0 border border-white/[0.04]">
                        <span className="material-symbols-outlined text-slate-500 text-lg">
                          settings
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-white font-bold">
                          {part.partId} {part.name}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          Linked: {part.linkedWO} &middot; ETA: {part.eta}
                        </p>
                      </div>
                      <span
                        className="text-[9px] font-bold px-2 py-0.5 rounded capitalize"
                        style={{
                          backgroundColor: `${partStatusColors[part.status]}15`,
                          color: partStatusColors[part.status],
                        }}
                      >
                        {part.status.replace('-', ' ')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Mechanic roster */}
                <div className="border-t border-white/[0.04] pt-4">
                  <p className="text-[9px] text-slate-500 uppercase tracking-wider font-bold mb-3">
                    Mechanic Roster
                  </p>
                  <div className="space-y-2.5">
                    {mechanics.map((mech) => (
                      <div
                        key={mech.initials}
                        className="bg-[#1c1c1c]/60 rounded-xl p-3 border border-white/[0.04] flex items-center gap-3"
                      >
                        <div
                          className="w-9 h-9 rounded-full flex items-center justify-center text-[10px] font-bold text-white border-2"
                          style={{
                            borderColor: mech.statusColor,
                            backgroundColor: `${mech.statusColor}20`,
                          }}
                        >
                          {mech.initials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs text-white font-medium">
                            {mech.name}
                          </p>
                          <p className="text-[9px] text-slate-500">
                            {mech.specialty}
                          </p>
                        </div>
                        <div className="text-right">
                          <span
                            className="text-[9px] font-bold capitalize"
                            style={{ color: mech.statusColor }}
                          >
                            {mech.status.replace('-', ' ')}
                          </span>
                          <p className="text-[8px] text-slate-600">
                            {mech.activeJobs} active
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right — Copy */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFB300]/10 text-[#FFB300] font-semibold text-sm mb-5">
                  <span
                    className="material-symbols-outlined text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    inventory_2
                  </span>
                  Parts &amp; Crew
                </div>

                <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-reno-dark leading-[1.1] mb-4">
                  No Part, No Fix —{' '}
                  <span className="text-[#FFB300]">Track Everything</span>
                </h2>

                <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-lg">
                  Parts on backorder linked to open work orders. Mechanic
                  availability at a glance. Never lose a repair to missing parts
                  or scheduling conflicts.
                </p>

                <ul className="space-y-4">
                  {equipmentFixModules[3].features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#FFB300]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span
                          className="material-symbols-outlined text-[#FFB300] text-base"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check
                        </span>
                      </div>
                      <span className="text-slate-600 leading-relaxed pt-1">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 6 — ANALYTICS & DOWNTIME (Dark)
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6 bg-[#0a0a0a] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(255,179,0,0.06),transparent)] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFB300]/15 text-[#FFB300] font-semibold text-sm mb-5">
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  bar_chart
                </span>
                Analytics
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.1] mb-4">
                Data-Driven{' '}
                <span className="text-[#FFB300]">Maintenance</span>
              </h2>
              <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                Downtime reports, repeat failure analysis, and cost tracking
                across your entire operation.
              </p>
            </div>
          </ScrollReveal>

          {/* Weekly metrics row */}
          <ScrollReveal delay={100}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              {weeklyMetrics.map((m) => (
                <div
                  key={m.label}
                  className="bg-[#1c1c1c]/60 rounded-xl p-5 border border-white/[0.04] text-center"
                >
                  <p className="text-2xl font-extrabold text-white">{m.value}</p>
                  <p className="text-[10px] text-slate-500 mt-1">{m.label}</p>
                </div>
              ))}
            </div>
          </ScrollReveal>

          {/* Downtime table */}
          <ScrollReveal delay={200}>
            <div className="bg-[#121212] rounded-2xl border border-white/[0.06] p-5 md:p-6">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-lg bg-[#ef4444]/20 flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-[#ef4444] text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    warning
                  </span>
                </div>
                <div>
                  <p className="text-white text-sm font-bold">Recent Downtime Events</p>
                  <p className="text-[9px] text-slate-500">This week</p>
                </div>
              </div>

              <div className="space-y-3">
                {recentDowntime.map((event, i) => (
                  <div
                    key={i}
                    className="bg-[#1c1c1c]/60 rounded-xl p-4 border border-white/[0.04] flex flex-col sm:flex-row sm:items-center gap-3"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white font-medium">
                        {event.equipment}
                      </p>
                      <p className="text-[10px] text-slate-500">
                        {event.site} &middot; {event.cause}
                      </p>
                    </div>
                    <div className="flex items-center gap-4 sm:gap-6">
                      <div className="text-center">
                        <p className="text-sm font-bold text-[#ef4444]">
                          {event.hoursDown}h
                        </p>
                        <p className="text-[9px] text-slate-600">Down</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-bold text-[#FFB300]">
                          {formatCurrency(event.cost)}
                        </p>
                        <p className="text-[9px] text-slate-600">Cost</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div className="mt-4 pt-4 border-t border-white/[0.04] flex items-center justify-between">
                <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">
                  Total Impact
                </span>
                <div className="flex items-center gap-6">
                  <span className="text-sm font-bold text-[#ef4444]">
                    {recentDowntime.reduce((a, e) => a + e.hoursDown, 0)}h
                  </span>
                  <span className="text-sm font-bold text-[#FFB300]">
                    {formatCurrency(
                      recentDowntime.reduce((a, e) => a + e.cost, 0)
                    )}
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 7 — CTA
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 bg-[#0a0a0a] overflow-hidden border-t border-white/[0.04]">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_50%,rgba(255,179,0,0.08),transparent)] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <ScrollReveal>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
              Stop Losing Hours to{' '}
              <span className="text-[#FFB300]">Downtime</span>
            </h2>

            <p className="text-lg text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto">
              EquipmentFix gives your construction team real-time dispatch, fleet
              tracking, parts management, and analytics — all from a single
              offline-ready app.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-14">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#FFB300] text-black font-bold rounded-xl shadow-lg hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(255,179,0,0.25)] transition-all duration-300"
              >
                Request Early Access
                <span className="material-symbols-outlined text-lg">
                  arrow_forward
                </span>
              </Link>
              <Link
                href="/apps"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 text-white font-bold rounded-xl border border-white/10 hover:border-[#FFB300]/40 hover:bg-white/10 transition-all duration-300"
              >
                View All Apps
                <span className="material-symbols-outlined text-lg">
                  apps
                </span>
              </Link>
            </div>

            {/* Trust badges row */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              {[
                { icon: 'apps', label: '6 Modules' },
                { icon: 'wifi_off', label: 'Offline-First' },
                { icon: 'location_on', label: 'GPS-Verified' },
                { icon: 'notifications', label: 'Push Alerts' },
              ].map((badge) => (
                <div key={badge.label} className="flex items-center gap-2">
                  <span
                    className="material-symbols-outlined text-[#FFB300] text-lg"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {badge.icon}
                  </span>
                  <span className="text-sm font-bold text-slate-300">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
