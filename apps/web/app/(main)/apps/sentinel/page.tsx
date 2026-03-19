import { Metadata } from 'next';
import Link from 'next/link';
import {
  sentinelModules,
  siteAddress,
  projectDayCount,
  personnelOnSite,
  noiseHeatmap,
  noiseHours,
  alertCards,
  projectPhases,
  phaseTasks,
  phaseTelemetry,
  issueStats,
  issueItems,
  workstreamFilters,
  escrowBalance,
  totalBudget,
  escrowMilestones,
  recentPayments,
  changeOrderImpact,
  changeOrders,
  rfiStats,
  rfiItems,
  storageUsed,
  storageTotal,
  documentFolders,
  recentDocuments,
  safetyStreak,
  complianceScore,
  safetyChecklist,
  safetyIncident,
  safetyFeed,
  heroStats,
  priorityColors,
  statusColors,
} from '@/lib/data/sentinel';
import { ScrollReveal } from '@/components/sentinel/scroll-reveal';
import { AnimatedStatsRow } from '@/components/sentinel/animated-stats';

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title:
    'Obsidian Sentinel | Construction Intelligence Platform | RenoNext',
  description:
    'Command every detail of your construction project. 11 integrated modules for site briefing, budgets, safety, documents, and more — all in one dark-mode platform.',
  openGraph: {
    title: 'Obsidian Sentinel — Construction Intelligence Platform',
    description:
      'Command every detail. 11 modules for site briefing, budgets, safety, and more.',
    type: 'website',
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function formatCurrency(n: number): string {
  return '$' + n.toLocaleString('en-CA');
}

function noiseColor(level: number): string {
  if (level === 0) return 'bg-white/5';
  if (level === 1) return 'bg-primary/20';
  if (level === 2) return 'bg-primary/50';
  return 'bg-primary';
}

const priorityDotSize = 'w-2.5 h-2.5 rounded-full flex-shrink-0';

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function SentinelPage() {
  return (
    <div className="min-h-screen">
      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 1 — HERO
      ═══════════════════════════════════════════════════════════════════ */}
      <header className="relative overflow-hidden bg-reno-dark pt-20 pb-20 md:pt-28 md:pb-28 px-6">
        {/* Glow effects */}
        <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/4 w-[700px] h-[700px] bg-primary/8 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-[500px] h-[500px] bg-[#E8AA42]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
          {/* Left — Copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full text-primary text-xs font-bold tracking-widest uppercase mb-6">
              <span
                className="material-symbols-outlined text-xs"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                security
              </span>
              Construction Intelligence Platform
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05] mb-4">
              Obsidian{' '}
              <span className="text-primary">Sentinel</span>
            </h1>

            <p className="text-xl md:text-2xl text-gray-400 leading-relaxed mb-8 max-w-xl">
              Command every detail of your construction project from a single
              dark-mode dashboard. 11 integrated modules. Zero blind spots.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-float hover:-translate-y-1 hover:shadow-float-hover transition-all duration-300"
              >
                Request Early Access
                <span className="material-symbols-outlined text-lg">
                  arrow_forward
                </span>
              </Link>
              <Link
                href="#command-center"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 text-white font-bold rounded-xl border border-white/10 hover:border-primary/40 hover:bg-white/10 transition-all duration-300"
              >
                See It in Action
                <span className="material-symbols-outlined text-lg">
                  expand_more
                </span>
              </Link>
            </div>

            <AnimatedStatsRow stats={heroStats} />
          </div>

          {/* Right — Phone Mockup: Site Briefing Mini */}
          <div className="relative hidden lg:block">
            <div className="relative z-20 mx-auto max-w-sm">
              {/* Phone frame */}
              <div className="bg-[#0a0a0f] rounded-[2.5rem] p-3 border-2 border-white/[0.08] shadow-2xl">
                <div className="bg-[#0a0a0f] rounded-[2rem] overflow-hidden">
                  {/* Notch */}
                  <div className="flex justify-center pt-3 pb-2">
                    <div className="w-24 h-5 bg-[#141419] rounded-full" />
                  </div>

                  {/* Dashboard content */}
                  <div className="px-4 pb-5 space-y-3">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[9px] text-gray-500 uppercase tracking-wider font-bold">
                          Site Briefing
                        </p>
                        <p className="text-white text-sm font-bold mt-0.5">
                          {siteAddress.split(',')[0]}
                        </p>
                      </div>
                      <div className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[9px] font-bold">
                        Day {projectDayCount}
                      </div>
                    </div>

                    {/* Personnel avatars */}
                    <div className="bg-[#141419] rounded-xl p-3 border border-white/[0.06]">
                      <p className="text-[8px] text-gray-500 uppercase tracking-wider font-bold mb-2">
                        On Site — {personnelOnSite.length}
                      </p>
                      <div className="flex gap-2">
                        {personnelOnSite.map((p) => (
                          <div key={p.initials} className="text-center">
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center text-[9px] font-bold text-white border-2"
                              style={{
                                borderColor: p.statusColor,
                                backgroundColor: `${p.statusColor}20`,
                              }}
                            >
                              {p.initials}
                            </div>
                            <p className="text-[7px] text-gray-500 mt-0.5 truncate w-8">
                              {p.name.split(' ')[0]}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Mini noise heatmap */}
                    <div className="bg-[#141419] rounded-xl p-3 border border-white/[0.06]">
                      <p className="text-[8px] text-gray-500 uppercase tracking-wider font-bold mb-2">
                        Noise Compliance
                      </p>
                      <div className="space-y-1">
                        {noiseHeatmap.slice(0, 5).map((row) => (
                          <div
                            key={row.day}
                            className="flex items-center gap-1"
                          >
                            <span className="text-[7px] text-gray-500 w-5 text-right">
                              {row.day}
                            </span>
                            {row.hours.map((level, hi) => (
                              <div
                                key={hi}
                                className={`w-3 h-2 rounded-sm ${noiseColor(level)}`}
                              />
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Escrow mini card */}
                    <div className="bg-[#141419] rounded-xl p-3 border border-white/[0.06]">
                      <div className="flex items-center justify-between mb-1.5">
                        <p className="text-[8px] text-gray-500 uppercase tracking-wider font-bold">
                          Escrow
                        </p>
                        <p className="text-[10px] text-primary font-bold">
                          {formatCurrency(42500)}
                        </p>
                      </div>
                      <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-primary rounded-full"
                          style={{ width: '65%' }}
                        />
                      </div>
                      <p className="text-[7px] text-gray-500 mt-1">
                        65% of milestone released
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -left-6 top-1/4 z-30 bg-[#141419] rounded-xl p-3 border border-white/[0.08] shadow-float animate-float-in-1">
              <div className="flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-primary text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified_user
                </span>
                <div>
                  <p className="text-[9px] text-white font-bold">Enterprise Grade</p>
                  <p className="text-[7px] text-gray-500">AES-256 encrypted</p>
                </div>
              </div>
            </div>

            <div className="absolute -right-4 bottom-1/4 z-30 bg-[#141419] rounded-xl p-3 border border-white/[0.08] shadow-float animate-float-in-2">
              <div className="flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-[#E8AA42] text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  wifi_off
                </span>
                <div>
                  <p className="text-[9px] text-white font-bold">Offline-Ready</p>
                  <p className="text-[7px] text-gray-500">Full sync when online</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 2 — COMMAND CENTER: Site Briefing
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="command-center" className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left — Copy */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-5">
                  <span
                    className="material-symbols-outlined text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    dashboard
                  </span>
                  Command Center
                </div>

                <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-reno-dark leading-[1.1] mb-4">
                  Your Daily{' '}
                  <span className="text-primary">Site Briefing</span>
                </h2>

                <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg">
                  Start every morning with a complete operational snapshot.
                  Personnel, escrow, noise compliance, and active alerts — one
                  screen, zero guesswork.
                </p>

                <ul className="space-y-4">
                  {sentinelModules[0].features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span
                          className="material-symbols-outlined text-primary text-base"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check
                        </span>
                      </div>
                      <span className="text-gray-600 leading-relaxed pt-1">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right — Dark Mockup */}
              <div className="bg-[#0a0a0f] rounded-2xl border border-white/[0.08] p-5 md:p-6 shadow-float">
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-[10px] text-gray-500 uppercase tracking-wider font-bold">
                      Site Briefing
                    </p>
                    <p className="text-white text-lg font-bold">
                      {siteAddress}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="px-2.5 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-bold">
                      Day {projectDayCount}
                    </div>
                    <div className="px-2.5 py-1 rounded-full bg-[#22c55e]/20 text-[#22c55e] text-[10px] font-bold">
                      Active
                    </div>
                  </div>
                </div>

                {/* Personnel grid */}
                <div className="bg-[#141419] rounded-xl p-4 border border-white/[0.06] mb-4">
                  <p className="text-[9px] text-gray-500 uppercase tracking-wider font-bold mb-3">
                    Personnel on Site — {personnelOnSite.length}
                  </p>
                  <div className="grid grid-cols-4 gap-3">
                    {personnelOnSite.map((p) => (
                      <div key={p.initials} className="text-center">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white mx-auto border-2"
                          style={{
                            borderColor: p.statusColor,
                            backgroundColor: `${p.statusColor}20`,
                          }}
                        >
                          {p.initials}
                        </div>
                        <p className="text-[10px] text-white font-medium mt-1.5">
                          {p.name.split(' ')[0]}
                        </p>
                        <p className="text-[8px] text-gray-500">{p.role.split(' ')[0]}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Noise Heatmap */}
                <div className="bg-[#141419] rounded-xl p-4 border border-white/[0.06] mb-4">
                  <p className="text-[9px] text-gray-500 uppercase tracking-wider font-bold mb-3">
                    Noise Compliance Heatmap
                  </p>
                  {/* Column headers */}
                  <div className="flex items-center gap-1.5 mb-1.5 pl-8">
                    {noiseHours.map((h) => (
                      <span
                        key={h}
                        className="text-[7px] text-gray-600 w-6 text-center"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                  <div className="space-y-1.5">
                    {noiseHeatmap.map((row) => (
                      <div key={row.day} className="flex items-center gap-1.5">
                        <span className="text-[9px] text-gray-500 w-7 text-right font-medium">
                          {row.day}
                        </span>
                        {row.hours.map((level, hi) => (
                          <div
                            key={hi}
                            className={`w-6 h-4 rounded ${noiseColor(level)}`}
                          />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Alert Cards */}
                <div className="space-y-2.5 mb-4">
                  {alertCards.map((alert, i) => (
                    <div
                      key={i}
                      className="bg-[#141419] rounded-xl p-3.5 border border-white/[0.06] flex items-start gap-3"
                    >
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{ backgroundColor: `${alert.color}20` }}
                      >
                        <span
                          className="material-symbols-outlined text-sm"
                          style={{
                            color: alert.color,
                            fontVariationSettings: "'FILL' 1",
                          }}
                        >
                          {alert.icon}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-white font-medium">
                          {alert.title}
                        </p>
                        <p className="text-[10px] text-gray-500 mt-0.5">
                          {alert.description}
                        </p>
                      </div>
                      <span className="text-[9px] text-gray-600 flex-shrink-0">
                        {alert.time}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Escrow bar */}
                <div className="bg-[#141419] rounded-xl p-4 border border-white/[0.06]">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[9px] text-gray-500 uppercase tracking-wider font-bold">
                      Escrow Balance
                    </p>
                    <p className="text-sm text-primary font-bold">
                      {formatCurrency(42500)}
                    </p>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-primary/60"
                      style={{ width: '65%' }}
                    />
                  </div>
                  <div className="flex justify-between mt-1.5">
                    <span className="text-[8px] text-gray-600">
                      Released: {formatCurrency(27625)}
                    </span>
                    <span className="text-[8px] text-gray-600">
                      65% complete
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 3 — PROJECT INTELLIGENCE: Timeline + Phase + Issues
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6 bg-[#f6f8f8]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-5">
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  timeline
                </span>
                Project Intelligence
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-reno-dark leading-[1.1] mb-4">
                Phase-Level{' '}
                <span className="text-primary">Visibility</span>
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                From excavation to finishing — track every phase, task, and
                issue with granular precision.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Timeline Card (7-col) */}
            <ScrollReveal className="md:col-span-7" delay={100}>
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
                  <div>
                    <h3 className="font-bold text-reno-dark text-lg">
                      Project Timeline
                    </h3>
                    <p className="text-xs text-gray-500">
                      3 phases &middot; 54 total tasks
                    </p>
                  </div>
                </div>

                <div className="space-y-5">
                  {projectPhases.map((phase) => (
                    <div key={phase.name}>
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span
                            className="material-symbols-outlined text-sm"
                            style={{
                              color: phase.color,
                              fontVariationSettings: "'FILL' 1",
                            }}
                          >
                            {phase.status === 'complete'
                              ? 'check_circle'
                              : phase.status === 'in-progress'
                                ? 'pending'
                                : 'radio_button_unchecked'}
                          </span>
                          <span className="text-sm font-bold text-reno-dark">
                            {phase.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-[10px] text-gray-400">
                            {phase.completedTasks}/{phase.tasks} tasks
                          </span>
                          <span
                            className="text-sm font-bold"
                            style={{ color: phase.color }}
                          >
                            {phase.progress}%
                          </span>
                        </div>
                      </div>
                      <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full transition-all duration-700"
                          style={{
                            width: `${phase.progress}%`,
                            backgroundColor: phase.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                {/* Health indicators */}
                <div className="mt-6 pt-5 border-t border-gray-100 grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-xs text-gray-400">Schedule</p>
                    <p className="text-sm font-bold text-[#22c55e]">On Track</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400">Budget</p>
                    <p className="text-sm font-bold text-[#22c55e]">Under</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400">Risk</p>
                    <p className="text-sm font-bold text-[#E8AA42]">Medium</p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Phase Details Card (5-col) */}
            <ScrollReveal className="md:col-span-5" delay={200}>
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-float border border-primary/5 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#E8AA42]/10 flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-[#E8AA42]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      assignment
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-reno-dark text-lg">
                      Phase: Foundation
                    </h3>
                    <p className="text-xs text-gray-500">Active tasks</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {phaseTasks.map((task, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-3 p-3 bg-[#f6f8f8] rounded-xl border border-gray-100"
                    >
                      <div
                        className={priorityDotSize}
                        style={{
                          backgroundColor:
                            priorityColors[task.priority],
                          marginTop: '6px',
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-reno-dark">
                          {task.title}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-0.5">
                          {task.assignee} &middot; Due {task.dueDate}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Phase Telemetry */}
                <div className="bg-[#f6f8f8] rounded-xl p-4 border border-gray-100">
                  <p className="text-[9px] text-gray-400 uppercase tracking-wider font-bold mb-3">
                    Phase Telemetry
                  </p>
                  <div className="grid grid-cols-2 gap-3">
                    {phaseTelemetry.map((t) => (
                      <div key={t.label}>
                        <p className="text-lg font-extrabold text-reno-dark">
                          {t.value}
                        </p>
                        <p className="text-[10px] text-gray-400">{t.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Issues Card (12-col full-width) */}
            <ScrollReveal className="md:col-span-12" delay={300}>
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-float border border-primary/5">
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-reno-red/10 flex items-center justify-center">
                      <span
                        className="material-symbols-outlined text-reno-red"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        bug_report
                      </span>
                    </div>
                    <h3 className="font-bold text-reno-dark text-lg">
                      Issue Tracker
                    </h3>
                  </div>

                  {/* Stat pills */}
                  <div className="flex flex-wrap gap-2 md:ml-auto">
                    {issueStats.map((s) => (
                      <div
                        key={s.label}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f6f8f8] border border-gray-100"
                      >
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: s.color }}
                        />
                        <span className="text-xs font-bold text-reno-dark">
                          {s.value}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {s.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Workstream filter pills */}
                <div className="flex flex-wrap gap-2 mb-5">
                  {workstreamFilters.map((f, i) => (
                    <span
                      key={f}
                      className={`px-3 py-1 rounded-full text-xs font-medium border ${
                        i === 0
                          ? 'bg-primary text-white border-primary'
                          : 'bg-white text-gray-500 border-gray-200'
                      }`}
                    >
                      {f}
                    </span>
                  ))}
                </div>

                {/* Issue items */}
                <div className="space-y-3">
                  {issueItems.map((issue) => (
                    <div
                      key={issue.id}
                      className="flex items-start gap-3 p-4 bg-[#f6f8f8] rounded-xl border border-gray-100"
                    >
                      <div
                        className={priorityDotSize}
                        style={{
                          backgroundColor:
                            priorityColors[issue.priority],
                          marginTop: '6px',
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <span className="text-[10px] font-bold text-gray-400">
                            {issue.id}
                          </span>
                          <span className="text-[10px] px-1.5 py-0.5 rounded bg-gray-200 text-gray-500 font-medium">
                            {issue.workstream}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-reno-dark">
                          {issue.title}
                        </p>
                        <p className="text-[10px] text-gray-400 mt-1">
                          {issue.assignee} &middot; Open {issue.daysOpen}d
                        </p>
                      </div>
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full capitalize"
                        style={{
                          backgroundColor: `${priorityColors[issue.priority]}15`,
                          color: priorityColors[issue.priority],
                        }}
                      >
                        {issue.priority}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 4 — FINANCIAL ARCHITECTURE: Budget + Change Orders
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-5">
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  account_balance_wallet
                </span>
                Financial Architecture
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-reno-dark leading-[1.1] mb-4">
                Every Dollar{' '}
                <span className="text-primary">Accounted For</span>
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Milestone-based escrow, real-time budget tracking, and
                structured change order management.
              </p>
            </div>
          </ScrollReveal>

          {/* Top row: Budget + Payment History */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Budget Card */}
            <ScrollReveal delay={100}>
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-float border border-primary/5 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-primary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      account_balance
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-reno-dark text-lg">
                      Budget & Escrow
                    </h3>
                    <p className="text-xs text-gray-500">
                      Total: {formatCurrency(totalBudget)}
                    </p>
                  </div>
                </div>

                {/* Balance display */}
                <div className="bg-[#f6f8f8] rounded-xl p-5 border border-gray-100 mb-6">
                  <p className="text-[10px] text-gray-400 uppercase tracking-wider font-bold mb-1">
                    Escrow Balance
                  </p>
                  <p className="text-3xl font-extrabold text-reno-dark">
                    {formatCurrency(escrowBalance)}
                  </p>
                </div>

                {/* Segmented progress bar */}
                <div className="flex gap-1 h-3 rounded-full overflow-hidden mb-5">
                  {escrowMilestones.map((m) => (
                    <div
                      key={m.name}
                      className="h-full first:rounded-l-full last:rounded-r-full"
                      style={{
                        width: `${m.percentage}%`,
                        backgroundColor:
                          statusColors[m.status],
                        opacity: m.status === 'locked' ? 0.3 : 1,
                      }}
                    />
                  ))}
                  {/* Remaining */}
                  <div
                    className="h-full rounded-r-full bg-gray-200"
                    style={{
                      width: `${100 - escrowMilestones.reduce((a, m) => a + m.percentage, 0)}%`,
                    }}
                  />
                </div>

                {/* Milestone rows */}
                <div className="space-y-3">
                  {escrowMilestones.map((m) => (
                    <div
                      key={m.name}
                      className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{
                            backgroundColor: statusColors[m.status],
                          }}
                        />
                        <span className="text-sm text-reno-dark font-medium">
                          {m.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-bold text-reno-dark">
                          {formatCurrency(m.amount)}
                        </span>
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full capitalize"
                          style={{
                            backgroundColor: `${statusColors[m.status]}15`,
                            color: statusColors[m.status],
                          }}
                        >
                          {m.status.replace('-', ' ')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Payment History Card */}
            <ScrollReveal delay={200}>
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-float border border-primary/5 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#22c55e]/10 flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-[#22c55e]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      receipt_long
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-reno-dark text-lg">
                      Payment History
                    </h3>
                    <p className="text-xs text-gray-500">
                      {recentPayments.length} transactions
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  {recentPayments.map((payment, i) => (
                    <div
                      key={i}
                      className="p-4 bg-[#f6f8f8] rounded-xl border border-gray-100"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-sm font-medium text-reno-dark">
                          {payment.description}
                        </p>
                        <p className="text-sm font-bold text-[#22c55e]">
                          {formatCurrency(payment.amount)}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[10px] text-gray-400">
                          {payment.date}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          &middot;
                        </span>
                        <span className="text-[10px] text-gray-400">
                          {payment.method}
                        </span>
                        <span className="ml-auto text-[10px] text-[#22c55e] font-bold bg-[#22c55e]/10 px-2 py-0.5 rounded-full">
                          Completed
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Full-width Change Order Card */}
          <ScrollReveal delay={300}>
            <div className="bg-white rounded-2xl p-6 md:p-8 shadow-float border border-primary/5">
              <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#E8AA42]/10 flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-[#E8AA42]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      swap_horiz
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-reno-dark text-lg">
                      Change Orders
                    </h3>
                    <p className="text-xs text-gray-500">
                      Scope change management
                    </p>
                  </div>
                </div>

                <div className="md:ml-auto flex items-center gap-2">
                  <span className="text-xs text-gray-400">
                    Cumulative Impact:
                  </span>
                  <span className="text-lg font-extrabold text-[#E8AA42]">
                    +{formatCurrency(changeOrderImpact)}
                  </span>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 mb-6">
                {changeOrders.map((co) => (
                  <div
                    key={co.id}
                    className="p-4 bg-[#f6f8f8] rounded-xl border border-gray-100"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-gray-400">
                        {co.id}
                      </span>
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full capitalize"
                        style={{
                          backgroundColor: `${statusColors[co.status]}15`,
                          color: statusColors[co.status],
                        }}
                      >
                        {co.status.replace('-', ' ')}
                      </span>
                    </div>
                    <p className="text-sm font-medium text-reno-dark mb-1.5">
                      {co.title}
                    </p>
                    <p className="text-lg font-extrabold text-reno-dark">
                      +{formatCurrency(co.amount)}
                    </p>
                    <p className="text-[10px] text-gray-400 mt-1.5">
                      {co.submittedBy} &middot; {co.date}
                    </p>
                  </div>
                ))}
              </div>

              {/* Review queue bars */}
              <div className="bg-[#f6f8f8] rounded-xl p-4 border border-gray-100">
                <p className="text-[9px] text-gray-400 uppercase tracking-wider font-bold mb-3">
                  Review Pipeline
                </p>
                <div className="flex gap-1 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-l-full"
                    style={{
                      width: '33%',
                      backgroundColor: statusColors.draft,
                    }}
                  />
                  <div
                    className="h-full"
                    style={{
                      width: '33%',
                      backgroundColor: statusColors['under-review'],
                    }}
                  />
                  <div
                    className="h-full rounded-r-full"
                    style={{
                      width: '34%',
                      backgroundColor: statusColors.approved,
                    }}
                  />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="text-[9px] text-gray-400">
                    Draft (1)
                  </span>
                  <span className="text-[9px] text-gray-400">
                    Under Review (1)
                  </span>
                  <span className="text-[9px] text-gray-400">
                    Approved (1)
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 5 — TEAM COMMAND: Personnel Registry
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6 bg-[#f6f8f8]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left — Dark Mockup */}
              <div className="bg-[#0a0a0f] rounded-2xl border border-white/[0.08] p-5 md:p-6 shadow-float order-2 lg:order-1">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-primary text-sm"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      badge
                    </span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold">
                      Personnel Registry
                    </p>
                    <p className="text-[9px] text-gray-500">
                      {personnelOnSite.length} team members
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  {personnelOnSite.slice(0, 3).map((person) => (
                    <div
                      key={person.initials}
                      className="bg-[#141419] rounded-xl p-4 border border-white/[0.06]"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div
                          className="w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold text-white border-2"
                          style={{
                            borderColor: person.statusColor,
                            backgroundColor: `${person.statusColor}20`,
                          }}
                        >
                          {person.initials}
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-white font-medium">
                            {person.name}
                          </p>
                          <p className="text-[10px] text-gray-500">
                            {person.role} &middot; {person.trade}
                          </p>
                        </div>
                        <span
                          className="text-[9px] font-bold px-2 py-0.5 rounded-full capitalize"
                          style={{
                            backgroundColor: `${person.statusColor}20`,
                            color: person.statusColor,
                          }}
                        >
                          {person.status.replace('-', ' ')}
                        </span>
                      </div>

                      {/* Cert badges */}
                      <div className="flex flex-wrap gap-1.5 mb-2">
                        {person.certifications.map((cert) => (
                          <span
                            key={cert}
                            className="text-[8px] font-bold px-2 py-0.5 rounded bg-white/5 text-gray-400 border border-white/[0.06]"
                          >
                            {cert}
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-[9px] text-gray-500">
                          {person.hoursThisWeek}h this week
                        </span>
                        <div className="flex items-center gap-1">
                          <span
                            className="material-symbols-outlined text-[10px] text-gray-500"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            schedule
                          </span>
                          <span className="text-[9px] text-gray-500">
                            Since 7:00 AM
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — Copy */}
              <div className="order-1 lg:order-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-5">
                  <span
                    className="material-symbols-outlined text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    badge
                  </span>
                  Team Command
                </div>

                <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-reno-dark leading-[1.1] mb-4">
                  Your Crew,{' '}
                  <span className="text-primary">Fully Documented</span>
                </h2>

                <p className="text-lg text-gray-500 leading-relaxed mb-8 max-w-lg">
                  Every worker, every certification, every hour — tracked and
                  verified in real time. No more paper sign-in sheets.
                </p>

                <ul className="space-y-4">
                  {sentinelModules[5].features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span
                          className="material-symbols-outlined text-primary text-base"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check
                        </span>
                      </div>
                      <span className="text-gray-600 leading-relaxed pt-1">
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
          SECTION 6 — DOCUMENT VAULT: RFI + Files
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-5">
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  folder_open
                </span>
                Document Vault
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-reno-dark leading-[1.1] mb-4">
                RFIs & Files,{' '}
                <span className="text-primary">Organized</span>
              </h2>
              <p className="text-lg text-gray-500 max-w-2xl mx-auto">
                Formal request-for-information workflow plus version-controlled
                document management in one place.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid md:grid-cols-2 gap-6">
            {/* RFI Card */}
            <ScrollReveal delay={100}>
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-float border border-primary/5 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-primary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      help_center
                    </span>
                  </div>
                  <h3 className="font-bold text-reno-dark text-lg">
                    RFI Management
                  </h3>
                </div>

                {/* Stats row */}
                <div className="flex gap-4 mb-6">
                  {rfiStats.map((s) => (
                    <div
                      key={s.label}
                      className="flex-1 bg-[#f6f8f8] rounded-xl p-3 border border-gray-100 text-center"
                    >
                      <p className="text-xl font-extrabold text-reno-dark">
                        {s.value}
                      </p>
                      <p className="text-[10px] text-gray-400">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* RFI items */}
                <div className="space-y-3">
                  {rfiItems.map((rfi) => (
                    <div
                      key={rfi.id}
                      className="p-3.5 bg-[#f6f8f8] rounded-xl border border-gray-100"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <div
                          className={priorityDotSize}
                          style={{
                            backgroundColor:
                              priorityColors[rfi.priority],
                          }}
                        />
                        <span className="text-[10px] font-bold text-gray-400">
                          {rfi.id}
                        </span>
                        <span
                          className="ml-auto text-[10px] font-bold px-2 py-0.5 rounded-full capitalize"
                          style={{
                            backgroundColor: `${statusColors[rfi.status]}15`,
                            color: statusColors[rfi.status],
                          }}
                        >
                          {rfi.status}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-reno-dark">
                        {rfi.subject}
                      </p>
                      <p className="text-[10px] text-gray-400 mt-1">
                        {rfi.assignee} &middot; Open {rfi.daysOpen}d
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* File Repository Card */}
            <ScrollReveal delay={200}>
              <div className="bg-white rounded-2xl p-6 md:p-8 shadow-float border border-primary/5 h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-xl bg-[#E8AA42]/10 flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-[#E8AA42]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      folder_open
                    </span>
                  </div>
                  <h3 className="font-bold text-reno-dark text-lg">
                    File Repository
                  </h3>
                </div>

                {/* Storage bar */}
                <div className="bg-[#f6f8f8] rounded-xl p-4 border border-gray-100 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-500 font-medium">
                      Storage Used
                    </span>
                    <span className="text-xs font-bold text-reno-dark">
                      {storageUsed} / {storageTotal} GB
                    </span>
                  </div>
                  <div className="h-2.5 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-[#E8AA42]"
                      style={{
                        width: `${(storageUsed / storageTotal) * 100}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Folder items */}
                <div className="space-y-2.5 mb-5">
                  {documentFolders.map((folder) => (
                    <div
                      key={folder.name}
                      className="flex items-center gap-3 p-3 bg-[#f6f8f8] rounded-xl border border-gray-100"
                    >
                      <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-primary text-sm">
                          {folder.icon}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-reno-dark">
                          {folder.name}
                        </p>
                        <p className="text-[10px] text-gray-400">
                          {folder.count} files &middot; {folder.size}
                        </p>
                      </div>
                      <span className="material-symbols-outlined text-gray-300 text-sm">
                        chevron_right
                      </span>
                    </div>
                  ))}
                </div>

                {/* Recent files */}
                <p className="text-[9px] text-gray-400 uppercase tracking-wider font-bold mb-2.5">
                  Recently Updated
                </p>
                <div className="space-y-2">
                  {recentDocuments.map((doc) => (
                    <div
                      key={doc.name}
                      className="flex items-center gap-3 p-3 bg-[#f6f8f8] rounded-xl border border-gray-100"
                    >
                      <span className="material-symbols-outlined text-gray-400 text-lg">
                        {doc.icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-reno-dark truncate">
                          {doc.name}
                        </p>
                        <p className="text-[10px] text-gray-400">
                          {doc.type} &middot; {doc.size}
                        </p>
                      </div>
                      <span className="text-[9px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                        {doc.version}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 7 — SAFETY SHIELD: Safety Protocols
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6 bg-reno-dark relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,rgba(15,186,189,0.08),transparent)] pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left — Copy */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary font-semibold text-sm mb-5">
                  <span
                    className="material-symbols-outlined text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    health_and_safety
                  </span>
                  Safety Shield
                </div>

                <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-[1.1] mb-4">
                  Zero Incidents Is{' '}
                  <span className="text-primary">The Only Goal</span>
                </h2>

                <p className="text-lg text-gray-400 leading-relaxed mb-8 max-w-lg">
                  Daily checklists, incident reporting, compliance scoring, and
                  streak tracking — everything you need to keep your site safe.
                </p>

                {/* Hero stats */}
                <div className="flex gap-8 mb-8">
                  <div>
                    <p className="text-4xl font-extrabold text-white">
                      {safetyStreak}
                    </p>
                    <p className="text-sm text-gray-400">
                      Days Without Incident
                    </p>
                  </div>
                  <div className="w-px bg-white/10" />
                  <div>
                    <p className="text-4xl font-extrabold text-primary">
                      {complianceScore}/100
                    </p>
                    <p className="text-sm text-gray-400">Compliance Score</p>
                  </div>
                </div>

                <ul className="space-y-4">
                  {sentinelModules[8].features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span
                          className="material-symbols-outlined text-primary text-base"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check
                        </span>
                      </div>
                      <span className="text-gray-300 leading-relaxed pt-1">
                        {f}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right — Dark Mockup */}
              <div className="bg-[#0a0a0f] rounded-2xl border border-white/[0.08] p-5 md:p-6 shadow-float">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-lg bg-[#22c55e]/20 flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-[#22c55e] text-sm"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      health_and_safety
                    </span>
                  </div>
                  <div>
                    <p className="text-white text-sm font-bold">
                      Safety Protocols
                    </p>
                    <p className="text-[9px] text-gray-500">
                      Today&apos;s checklist
                    </p>
                  </div>
                </div>

                {/* Checklist items */}
                <div className="space-y-2.5 mb-4">
                  {safetyChecklist.map((item, i) => (
                    <div
                      key={i}
                      className="bg-[#141419] rounded-xl p-3.5 border border-white/[0.06] flex items-center gap-3"
                    >
                      <div
                        className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          backgroundColor: `${statusColors[item.status]}20`,
                        }}
                      >
                        <span
                          className="material-symbols-outlined text-xs"
                          style={{
                            color: statusColors[item.status],
                            fontVariationSettings: "'FILL' 1",
                          }}
                        >
                          {item.status === 'pass'
                            ? 'check_circle'
                            : item.status === 'fail'
                              ? 'cancel'
                              : 'schedule'}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-white font-medium">
                          {item.title}
                        </p>
                        <p className="text-[9px] text-gray-500">
                          {item.inspector} &middot; {item.date}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Incident card */}
                <div className="bg-[#141419] rounded-xl p-4 border border-[#E8AA42]/20 mb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className="material-symbols-outlined text-[#E8AA42] text-sm"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      warning
                    </span>
                    <span className="text-[10px] font-bold text-[#E8AA42]">
                      {safetyIncident.id}
                    </span>
                  </div>
                  <p className="text-xs text-white font-medium mb-1">
                    {safetyIncident.title}
                  </p>
                  <p className="text-[10px] text-gray-500">
                    {safetyIncident.date} &middot; {safetyIncident.status}
                  </p>
                </div>

                {/* Feed items */}
                <div className="space-y-2">
                  {safetyFeed.map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 bg-[#141419] rounded-xl p-3 border border-white/[0.06]"
                    >
                      <span
                        className="material-symbols-outlined text-primary text-sm"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {item.icon}
                      </span>
                      <p className="text-[10px] text-gray-400 flex-1">
                        {item.text}
                      </p>
                      <span className="text-[9px] text-gray-600 flex-shrink-0">
                        {item.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 8 — CTA
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 bg-reno-dark overflow-hidden border-t border-white/[0.06]">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_50%,rgba(15,186,189,0.12),transparent)] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <ScrollReveal>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
              Command Every{' '}
              <span className="text-primary">Detail</span>
            </h2>

            <p className="text-lg text-gray-400 leading-relaxed mb-10 max-w-2xl mx-auto">
              Obsidian Sentinel gives your construction team 11 integrated
              modules to manage sites, budgets, safety, and documentation from a
              single platform.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-14">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-float hover:-translate-y-1 hover:shadow-float-hover transition-all duration-300"
              >
                Request Early Access
                <span className="material-symbols-outlined text-lg">
                  arrow_forward
                </span>
              </Link>
              <Link
                href="/apps"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 text-white font-bold rounded-xl border border-white/10 hover:border-primary/40 hover:bg-white/10 transition-all duration-300"
              >
                Book a Demo
                <span className="material-symbols-outlined text-lg">
                  videocam
                </span>
              </Link>
            </div>

            {/* Trust badges row */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              {[
                { icon: 'apps', label: '11 Modules' },
                { icon: 'security', label: 'Enterprise Security' },
                { icon: 'sync', label: 'Real-Time Sync' },
                { icon: 'wifi_off', label: 'Offline-Ready' },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2"
                >
                  <span
                    className="material-symbols-outlined text-primary text-lg"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {badge.icon}
                  </span>
                  <span className="text-sm font-bold text-gray-300">
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
