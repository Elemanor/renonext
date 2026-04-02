import type { Metadata } from 'next';
import Link from 'next/link';
import { ScrollReveal } from '@/components/sentinel/scroll-reveal';
import {
  attendanceModules,
  heroStats,
  crewMembers,
  timesheetEntries,
} from '@/lib/data/attendance';

export const metadata: Metadata = {
  title: 'SiteSafe — GPS Attendance App | RenoNext',
  description:
    'GPS-verified construction attendance with automated timesheets. Clock in with location proof, track crew presence, and export payroll-ready data.',
  alternates: {
    canonical: '/apps/attendance',
  },
};

export default function AttendancePage() {
  return (
    <main className="overflow-hidden">
      {/* ================================================================
          SECTION 1 — HERO
          White bg, teal accent identity
          ================================================================ */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:py-28">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20 mb-8">
              <span
                className="material-symbols-outlined text-primary text-sm"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                schedule
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                GPS Attendance App
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-extrabold text-[#102122] leading-[1.05] tracking-tight mb-6">
              Know who&apos;s on site.
              <br />
              <span className="text-primary">Always.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-slate-500 max-w-xl font-light leading-relaxed mb-10">
              GPS-verified clock-ins, automated timesheets, real-time crew
              boards, and one-click payroll export — the attendance system
              built for construction.
            </p>

            {/* Stat pills */}
            <div className="flex flex-wrap gap-5">
              {heroStats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-slate-400 mb-1 font-medium">
                    {stat.label}
                  </span>
                  <div className="bg-slate-100 px-5 py-2.5">
                    <span className="font-black text-[#102122] text-lg">
                      {stat.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 2 — CREW PRESENCE BOARD
          Dark bg with tablet-style mockup
          ================================================================ */}
      <section className="bg-reno-dark py-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-xs font-bold text-primary uppercase tracking-widest">
                Crew Board
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-4 tracking-tight">
                Who&apos;s On Site Right Now
              </h2>
              <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-lg">
                Real-time headcount across every project. See who clocked in,
                who&apos;s late, and who hasn&apos;t shown up — at a glance.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              {/* Tablet mockup */}
              <div className="w-full max-w-[480px] flex-shrink-0">
                <div className="bg-zinc-900 rounded-[2rem] p-3 shadow-2xl border-[6px] border-zinc-800">
                  <div className="rounded-[1.4rem] overflow-hidden bg-[#f8faf8] flex flex-col min-h-[420px]">
                    {/* App header */}
                    <div className="px-5 pt-5 pb-2 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <span
                            className="material-symbols-outlined text-primary text-sm"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            schedule
                          </span>
                        </div>
                        <span className="text-sm font-extrabold text-[#102122] tracking-tighter">
                          SiteSafe
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-[8px] font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
                          Lakeshore Condos
                        </span>
                        <span className="material-symbols-outlined text-slate-400 text-lg">
                          notifications
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <div className="px-5 pt-2 pb-3">
                      <h3 className="text-lg font-extrabold text-primary tracking-tight">
                        Crew Presence
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <div className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-reno-green-500" />
                          <span className="text-[8px] font-bold text-slate-500">
                            4 On Site
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                          <span className="text-[8px] font-bold text-slate-500">
                            1 Late
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-reno-red-400" />
                          <span className="text-[8px] font-bold text-slate-500">
                            1 Absent
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Crew list */}
                    <div className="mx-4 space-y-1.5 mb-4">
                      {crewMembers.map((m) => (
                        <div
                          key={m.name}
                          className="bg-white rounded-xl p-2.5 flex items-center gap-3"
                        >
                          <div
                            className={`w-8 h-8 rounded-lg ${m.color} flex items-center justify-center`}
                          >
                            <span className="text-[9px] font-bold text-white">
                              {m.initials}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-[10px] font-bold text-[#102122] truncate">
                              {m.name}
                            </p>
                            <p className="text-[8px] text-slate-500">
                              {m.role}
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0">
                            <span
                              className={`text-[7px] font-bold uppercase px-1.5 py-0.5 rounded-full ${
                                m.status === 'on-site'
                                  ? 'bg-reno-green-100 text-reno-green-700'
                                  : m.status === 'late'
                                    ? 'bg-amber-100 text-amber-700'
                                    : 'bg-reno-red-100 text-reno-red-700'
                              }`}
                            >
                              {m.status === 'on-site'
                                ? 'On Site'
                                : m.status === 'late'
                                  ? 'Late'
                                  : 'Absent'}
                            </span>
                            <p className="text-[8px] text-slate-400 mt-0.5">
                              {m.time}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Feature copy */}
              <div className="flex-1 space-y-8">
                <div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-3">
                    One screen. Every crew member.
                  </h3>
                  <p className="text-slate-400 leading-relaxed max-w-lg">
                    Foremen and superintendents see the full picture — who
                    clocked in, who&apos;s running late, and who hasn&apos;t
                    shown up. Filter by site or view all projects at once.
                  </p>
                </div>
                <div className="space-y-5">
                  {[
                    {
                      icon: 'groups',
                      label: 'Live headcount',
                      desc: 'Real-time crew status with on-site, late, and absent badges.',
                    },
                    {
                      icon: 'notifications_active',
                      label: 'No-show alerts',
                      desc: 'Push notification when a scheduled worker hasn\'t clocked in by start time.',
                    },
                    {
                      icon: 'domain',
                      label: 'Multi-site overview',
                      desc: 'Superintendents see headcount across 5, 10, or 50 active projects.',
                    },
                  ].map((item) => (
                    <div key={item.label} className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-primary text-lg">
                          {item.icon}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-sm mb-0.5">
                          {item.label}
                        </h4>
                        <p className="text-slate-500 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================
          SECTION 3 — CORE MODULES
          White bg, 2x3 grid of module cards
          ================================================================ */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-xs font-bold text-primary uppercase tracking-widest">
                Core Modules
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#102122] mt-4 tracking-tight">
                Five Modules, Zero Paper
              </h2>
              <p className="text-slate-500 mt-4 max-w-2xl mx-auto text-lg">
                Every module is designed for field conditions — large touch
                targets, offline reliability, and workflows that finish in
                seconds.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {attendanceModules.map((mod, i) => (
              <ScrollReveal key={mod.id} delay={i * 80}>
                <div className="bg-[#f6f8f8] p-8 rounded-xl border border-slate-100 h-full">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100 flex-shrink-0">
                      <span className="material-symbols-outlined text-primary text-xl">
                        {mod.icon}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-extrabold text-[#102122] text-lg">
                        {mod.name}
                      </h3>
                      <p className="text-xs text-primary font-bold uppercase tracking-wider mt-0.5">
                        {mod.tagline}
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-500 text-sm leading-relaxed mb-5">
                    {mod.description}
                  </p>
                  <ul className="space-y-2">
                    {mod.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-start gap-2 text-sm"
                      >
                        <span
                          className="material-symbols-outlined text-primary text-base mt-0.5 flex-shrink-0"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check_circle
                        </span>
                        <span className="text-slate-600">{feat}</span>
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
          SECTION 4 — GPS CLOCK-IN + WEEKLY TIMESHEET
          Gray bg, two phone mockups side by side
          ================================================================ */}
      <section className="bg-[#f6f8f8] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-xs font-bold text-primary uppercase tracking-widest">
                Deep Dive
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#102122] mt-4 tracking-tight">
                Clock In + Timesheet
              </h2>
              <p className="text-slate-500 mt-4 max-w-2xl mx-auto text-lg">
                One tap to clock in with GPS proof. One screen to review
                and approve your weekly hours.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* GPS Clock-In phone */}
            <ScrollReveal>
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-extrabold text-[#102122] mb-6 tracking-tight">
                  GPS Clock-In
                </h3>
                <div className="w-full max-w-[320px] bg-zinc-900 rounded-[3rem] p-3 shadow-2xl border-[8px] border-zinc-800">
                  <div className="rounded-[2.2rem] overflow-hidden bg-[#f8faf8] flex flex-col min-h-[520px]">
                    {/* Header */}
                    <div className="px-5 pt-6 pb-2 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <span
                            className="material-symbols-outlined text-primary text-sm"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            schedule
                          </span>
                        </div>
                        <span className="text-sm font-extrabold text-[#102122] tracking-tighter">
                          SiteSafe
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-slate-400 text-lg">
                        notifications
                      </span>
                    </div>

                    {/* Title */}
                    <div className="px-5 pt-1 pb-3">
                      <h3 className="text-xl font-extrabold text-primary tracking-tight">
                        Clock In
                      </h3>
                      <p className="text-[9px] text-slate-500">
                        Verify your location to start your shift
                      </p>
                    </div>

                    {/* Map placeholder */}
                    <div className="mx-4 h-32 rounded-xl overflow-hidden relative bg-gradient-to-br from-slate-300 via-slate-200 to-slate-300 mb-3">
                      <div className="absolute inset-0 bg-primary/5" />
                      {/* Geofence ring */}
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="w-20 h-20 border-2 border-dashed border-primary/40 rounded-full" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary border-2 border-white rounded-full shadow-md" />
                      </div>
                      <div className="absolute bottom-2 left-2 right-2 bg-white/80 backdrop-blur-sm p-2 rounded-lg flex justify-between items-center">
                        <div>
                          <p className="text-[7px] font-bold text-primary/60 uppercase tracking-widest">
                            Site Geofence
                          </p>
                          <p className="text-[9px] font-bold text-[#102122]">
                            Lakeshore Condos — Phase 2
                          </p>
                        </div>
                        <span className="text-[7px] font-bold bg-reno-green-100 text-reno-green-700 px-1.5 py-0.5 rounded-full">
                          Inside
                        </span>
                      </div>
                    </div>

                    {/* GPS Info */}
                    <div className="mx-4 bg-white rounded-xl p-3 shadow-sm space-y-2.5 mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                          <span className="material-symbols-outlined text-primary text-sm">
                            my_location
                          </span>
                        </div>
                        <div>
                          <p className="text-[8px] text-slate-500">
                            GPS Accuracy
                          </p>
                          <p className="text-[10px] font-bold text-[#102122]">
                            ±2.4 m &bull; High Confidence
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                          <span className="material-symbols-outlined text-primary text-sm">
                            schedule
                          </span>
                        </div>
                        <div>
                          <p className="text-[8px] text-slate-500">
                            Current Time
                          </p>
                          <p className="text-[10px] font-bold text-[#102122]">
                            07:00 AM &bull; Mon, Mar 16
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Safety sign-off */}
                    <div className="mx-4 bg-amber-50 border-l-2 border-amber-400 rounded-lg p-3 mb-3">
                      <div className="flex items-start gap-2">
                        <span
                          className="material-symbols-outlined text-amber-600 text-sm mt-0.5"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          verified_user
                        </span>
                        <div>
                          <p className="text-[9px] font-bold text-amber-800">
                            Safety Sign-Off Required
                          </p>
                          <p className="text-[8px] text-amber-600">
                            Hard hat, steel toes, hi-vis vest
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Clock-in button */}
                    <div className="mx-4 mb-4">
                      <div className="bg-gradient-to-br from-primary to-teal-600 text-white py-3 rounded-xl text-center flex items-center justify-center gap-2">
                        <span
                          className="material-symbols-outlined text-lg"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          location_on
                        </span>
                        <span className="text-xs font-extrabold tracking-tight">
                          Clock In Now
                        </span>
                      </div>
                    </div>

                    {/* Bottom nav */}
                    <div className="mt-auto flex justify-around items-center px-2 py-2.5 border-t border-slate-100">
                      {[
                        { icon: 'dashboard', label: 'Home', active: false },
                        { icon: 'location_on', label: 'Clock In', active: true },
                        { icon: 'description', label: 'Timesheets', active: false },
                        { icon: 'person', label: 'Profile', active: false },
                      ].map((tab) => (
                        <div
                          key={tab.label}
                          className={`flex flex-col items-center gap-0.5 ${
                            tab.active
                              ? 'bg-primary/10 px-2.5 py-1 rounded-lg'
                              : 'px-2.5 py-1'
                          }`}
                        >
                          <span
                            className={`material-symbols-outlined text-sm ${
                              tab.active ? 'text-primary' : 'text-slate-400'
                            }`}
                            style={
                              tab.active
                                ? { fontVariationSettings: "'FILL' 1" }
                                : undefined
                            }
                          >
                            {tab.icon}
                          </span>
                          <span
                            className={`text-[7px] font-medium ${
                              tab.active ? 'text-primary' : 'text-slate-400'
                            }`}
                          >
                            {tab.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Weekly Timesheet phone */}
            <ScrollReveal delay={100}>
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-extrabold text-[#102122] mb-6 tracking-tight">
                  Weekly Timesheet
                </h3>
                <div className="w-full max-w-[320px] bg-zinc-900 rounded-[3rem] p-3 shadow-2xl border-[8px] border-zinc-800">
                  <div className="rounded-[2.2rem] overflow-hidden bg-[#f8faf8] flex flex-col min-h-[520px]">
                    {/* Header */}
                    <div className="px-5 pt-6 pb-2 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <span
                            className="material-symbols-outlined text-primary text-sm"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            schedule
                          </span>
                        </div>
                        <span className="text-sm font-extrabold text-[#102122] tracking-tighter">
                          SiteSafe
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-slate-400 text-lg">
                        notifications
                      </span>
                    </div>

                    {/* Title */}
                    <div className="px-5 pt-2 pb-3">
                      <h3 className="text-xl font-extrabold text-primary tracking-tight">
                        Weekly Timesheet
                      </h3>
                      <p className="text-[9px] text-slate-500">
                        Week of March 16 — 20, 2026
                      </p>
                    </div>

                    {/* Summary stats */}
                    <div className="mx-4 grid grid-cols-2 gap-2 mb-3">
                      <div className="bg-white rounded-xl p-3 shadow-sm">
                        <span className="text-[7px] uppercase tracking-widest text-slate-500 font-bold">
                          Total Hours
                        </span>
                        <div className="text-lg font-bold text-primary mt-0.5">
                          27.0
                        </div>
                        <div className="flex items-center gap-0.5 text-slate-500 text-[8px] font-medium mt-1">
                          <span className="material-symbols-outlined text-[10px]">
                            calendar_today
                          </span>
                          3 of 5 days logged
                        </div>
                      </div>
                      <div className="bg-white rounded-xl p-3 shadow-sm">
                        <span className="text-[7px] uppercase tracking-widest text-slate-500 font-bold">
                          Overtime
                        </span>
                        <div className="text-lg font-bold text-amber-600 mt-0.5">
                          2.5h
                        </div>
                        <div className="flex items-center gap-0.5 text-amber-600 text-[8px] font-medium mt-1">
                          <span className="material-symbols-outlined text-[10px]">
                            trending_up
                          </span>
                          1.5× multiplier
                        </div>
                      </div>
                    </div>

                    {/* Daily entries */}
                    <div className="mx-4 space-y-2 mb-3">
                      <span className="text-[7px] font-bold text-slate-500 uppercase tracking-widest">
                        Daily Entries
                      </span>
                      {timesheetEntries.map((entry) => (
                        <div
                          key={entry.date}
                          className="bg-white rounded-xl p-3 shadow-sm"
                        >
                          <div className="flex justify-between items-start mb-1.5">
                            <div>
                              <span className="text-[7px] font-bold text-slate-500 uppercase tracking-widest">
                                {entry.date}
                              </span>
                              <p className="text-[10px] font-bold text-primary">
                                {entry.project}
                              </p>
                            </div>
                            {entry.ot ? (
                              <span className="text-[7px] font-bold bg-amber-100 text-amber-700 px-1.5 py-0.5 rounded-full uppercase">
                                OT
                              </span>
                            ) : (
                              <span className="text-[7px] font-bold bg-primary/10 text-primary px-1.5 py-0.5 rounded-full uppercase">
                                Regular
                              </span>
                            )}
                          </div>
                          <div className="flex justify-between items-center pt-1.5 border-t border-slate-100">
                            <div className="flex gap-3">
                              <div>
                                <span className="text-[7px] text-slate-400 uppercase">
                                  In
                                </span>
                                <p className="text-[9px] font-semibold text-[#102122]">
                                  {entry.inTime}
                                </p>
                              </div>
                              <div>
                                <span className="text-[7px] text-slate-400 uppercase">
                                  Out
                                </span>
                                <p className="text-[9px] font-semibold text-[#102122]">
                                  {entry.outTime}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-[7px] text-slate-400 uppercase">
                                Hours
                              </span>
                              <p className="text-sm font-bold text-primary">
                                {entry.hours}h
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Status bar */}
                    <div className="mx-4 mb-3">
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 flex items-center gap-2">
                        <span
                          className="material-symbols-outlined text-amber-600 text-sm"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          pending
                        </span>
                        <span className="text-[9px] font-bold text-amber-700">
                          Draft — Submit for approval when week is complete
                        </span>
                      </div>
                    </div>

                    {/* Bottom nav */}
                    <div className="mt-auto flex justify-around items-center px-2 py-2.5 border-t border-slate-100">
                      {[
                        { icon: 'dashboard', label: 'Home', active: false },
                        { icon: 'location_on', label: 'Clock In', active: false },
                        { icon: 'description', label: 'Timesheets', active: true },
                        { icon: 'person', label: 'Profile', active: false },
                      ].map((tab) => (
                        <div
                          key={tab.label}
                          className={`flex flex-col items-center gap-0.5 ${
                            tab.active
                              ? 'bg-primary/10 px-2.5 py-1 rounded-lg'
                              : 'px-2.5 py-1'
                          }`}
                        >
                          <span
                            className={`material-symbols-outlined text-sm ${
                              tab.active ? 'text-primary' : 'text-slate-400'
                            }`}
                            style={
                              tab.active
                                ? { fontVariationSettings: "'FILL' 1" }
                                : undefined
                            }
                          >
                            {tab.icon}
                          </span>
                          <span
                            className={`text-[7px] font-medium ${
                              tab.active ? 'text-primary' : 'text-slate-400'
                            }`}
                          >
                            {tab.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 5 — PAYROLL EXPORT
          White bg, browser frame mockup + copy
          ================================================================ */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left copy */}
            <ScrollReveal>
              <div className="flex-1 space-y-6">
                <span className="text-xs font-bold text-primary uppercase tracking-widest">
                  Payroll Integration
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#102122] tracking-tight">
                  Approved Hours,
                  <br />
                  Straight to Payroll
                </h2>
                <p className="text-slate-500 leading-relaxed max-w-lg">
                  Once foremen approve the weekly timesheets, export a
                  payroll-ready CSV grouped by contract, cost code, or worker.
                  No re-keying. No disputes. No paper.
                </p>
                <div className="space-y-4 pt-4">
                  {[
                    { icon: 'download', text: 'One-click CSV export' },
                    { icon: 'filter_alt', text: 'Filter by contract, site, or cost code' },
                    { icon: 'calculate', text: 'OT and pay codes pre-calculated' },
                    { icon: 'integration_instructions', text: 'QuickBooks and Sage compatible' },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary text-lg">
                        {item.icon}
                      </span>
                      <span className="text-sm text-slate-600 font-medium">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Browser frame mockup */}
            <ScrollReveal delay={100}>
              <div className="w-full max-w-[500px] flex-shrink-0">
                <div className="bg-zinc-900 rounded-xl overflow-hidden shadow-2xl">
                  {/* Browser chrome */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-zinc-800">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-reno-amber-500/60" />
                      <div className="w-2.5 h-2.5 rounded-full bg-reno-green-500/60" />
                    </div>
                    <div className="flex-1 bg-zinc-700 rounded-md px-3 py-1 text-[10px] text-zinc-400 text-center">
                      app.renonext.com/reports/timesheets
                    </div>
                  </div>

                  {/* Report content */}
                  <div className="bg-white p-5">
                    {/* Report header */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-sm font-extrabold text-[#102122]">
                          Timesheet Report
                        </h4>
                        <p className="text-[9px] text-slate-500">
                          Lakeshore Condos — Week of Mar 16, 2026
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <div className="bg-primary/10 text-primary text-[8px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
                          <span className="material-symbols-outlined text-[10px]">
                            download
                          </span>
                          CSV
                        </div>
                        <div className="bg-slate-100 text-slate-500 text-[8px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
                          <span className="material-symbols-outlined text-[10px]">
                            picture_as_pdf
                          </span>
                          PDF
                        </div>
                      </div>
                    </div>

                    {/* Summary row */}
                    <div className="grid grid-cols-4 gap-3 mb-4">
                      {[
                        { label: 'Workers', value: '6' },
                        { label: 'Total Hours', value: '237.5' },
                        { label: 'Regular', value: '216.0' },
                        { label: 'Overtime', value: '21.5' },
                      ].map((s) => (
                        <div
                          key={s.label}
                          className="bg-[#f6f8f8] rounded-lg p-2"
                        >
                          <span className="text-[7px] uppercase tracking-widest text-slate-400 font-bold">
                            {s.label}
                          </span>
                          <p className="text-sm font-bold text-[#102122]">
                            {s.value}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Table */}
                    <div className="border border-slate-100 rounded-lg overflow-hidden">
                      <div className="grid grid-cols-5 bg-slate-50 px-3 py-2 text-[7px] font-bold text-slate-500 uppercase tracking-widest">
                        <span>Worker</span>
                        <span>Cost Code</span>
                        <span className="text-right">Reg</span>
                        <span className="text-right">OT</span>
                        <span className="text-right">Total</span>
                      </div>
                      {[
                        { name: 'M. Cole', code: 'CC-100', reg: '40.0', ot: '4.5', total: '44.5' },
                        { name: 'D. Reyes', code: 'CC-200', reg: '38.5', ot: '2.0', total: '40.5' },
                        { name: 'J. Okafor', code: 'CC-100', reg: '40.0', ot: '6.0', total: '46.0' },
                        { name: 'T. Banks', code: 'CC-300', reg: '37.5', ot: '0.0', total: '37.5' },
                      ].map((row, idx) => (
                        <div
                          key={row.name}
                          className={`grid grid-cols-5 px-3 py-2 text-[9px] ${
                            idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'
                          }`}
                        >
                          <span className="font-semibold text-[#102122]">
                            {row.name}
                          </span>
                          <span className="text-slate-500">{row.code}</span>
                          <span className="text-right text-slate-600">
                            {row.reg}
                          </span>
                          <span
                            className={`text-right ${
                              row.ot !== '0.0'
                                ? 'text-amber-600 font-semibold'
                                : 'text-slate-400'
                            }`}
                          >
                            {row.ot}
                          </span>
                          <span className="text-right font-bold text-primary">
                            {row.total}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Approved badge */}
                    <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100">
                      <span
                        className="material-symbols-outlined text-reno-green-600 text-lg"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        verified
                      </span>
                      <span className="text-[9px] font-bold text-reno-green-700">
                        Approved by Foreman — Ready for payroll export
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 6 — CTA
          Dark CTA with trust badges
          ================================================================ */}
      <section className="bg-reno-dark py-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <ScrollReveal>
            <span
              className="material-symbols-outlined text-primary text-5xl mb-6 inline-block"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              schedule
            </span>

            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mt-4">
              Eliminate Timesheet
              <br />
              Disputes
            </h2>

            <p className="text-slate-400 mt-6 max-w-xl mx-auto text-lg">
              GPS clock-in. Digital timesheets. Real-time crew boards. Payroll
              export. One app replaces the clipboard, the spreadsheet, and the
              argument.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <Link
                href="/join"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-colors"
              >
                Request Early Access
              </Link>
              <Link
                href="/apps"
                className="border border-white/20 text-white hover:bg-white/5 px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-colors"
              >
                Explore All Apps
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-8 mt-14 pt-10 border-t border-white/10">
              {[
                { icon: 'location_on', label: 'GPS Verified' },
                { icon: 'schedule', label: 'Auto Timesheets' },
                { icon: 'shield', label: 'Encrypted' },
                { icon: 'cloud_off', label: 'Offline-Ready' },
              ].map((badge) => (
                <div key={badge.label} className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-lg">
                    {badge.icon}
                  </span>
                  <span className="text-white/60 text-xs font-bold uppercase tracking-widest">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
