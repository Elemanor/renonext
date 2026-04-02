import type { Metadata } from 'next';
import Link from 'next/link';
import { ScrollReveal } from '@/components/sentinel/scroll-reveal';
import {
  fieldForceModules,
  heroStats,
  recentActivity,
  myProjects,
  attendanceLogs,
} from '@/lib/data/field-force';

export const metadata: Metadata = {
  title: 'FieldForce — Field Worker Mobile App | RenoNext',
  description:
    'GPS check-in, identity verification, project briefs, attendance tracking, and safety briefings — the mobile app built for field crews.',
  alternates: {
    canonical: '/apps/field-force',
  },
};

export default function FieldForcePage() {
  return (
    <main className="overflow-hidden">
      {/* ================================================================
          SECTION 1 — HERO
          White bg, emerald/green accent identity
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
                location_on
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Field Worker Mobile App
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-extrabold text-[#102122] leading-[1.05] tracking-tight mb-6">
              Built for the
              <br />
              <span className="text-primary">crew on the ground.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-slate-500 max-w-xl font-light leading-relaxed mb-10">
              GPS check-in, identity verification, project briefs, attendance
              history, and safety briefings — everything a field worker needs
              before, during, and after a shift.
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
          SECTION 2 — WORKER DASHBOARD
          Dark bg with phone mockup of the main dashboard screen
          ================================================================ */}
      <section className="bg-reno-dark py-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-xs font-bold text-primary uppercase tracking-widest">
                Dashboard
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-4 tracking-tight">
                Your Shift at a Glance
              </h2>
              <p className="text-slate-400 mt-4 max-w-2xl mx-auto text-lg">
                One screen shows assigned projects, check-in status, weekly
                progress, weather, and recent activity.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              {/* Phone mockup */}
              <div className="w-full max-w-[320px] flex-shrink-0">
                <div className="bg-zinc-900 rounded-[3rem] p-3 shadow-2xl border-[8px] border-zinc-800">
                  {/* Notch */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-800 rounded-b-2xl" style={{ position: 'relative', margin: '-12px auto 0' }} />

                  <div className="rounded-[2.2rem] overflow-hidden bg-[#f8faf8] flex flex-col min-h-[560px]">
                    {/* App header */}
                    <div className="px-5 pt-6 pb-2 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="text-[8px] font-bold text-primary">AF</span>
                        </div>
                        <span className="text-sm font-extrabold text-[#102122] tracking-tighter">
                          FieldForce
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-slate-400 text-lg">
                        notifications
                      </span>
                    </div>

                    {/* Welcome */}
                    <div className="px-5 pt-2 pb-3">
                      <h3 className="text-xl font-extrabold text-primary tracking-tight">
                        Good Morning, Alex.
                      </h3>
                      <p className="text-[10px] text-slate-500">
                        Ready for your shift at the North Site?
                      </p>
                    </div>

                    {/* Check-in card */}
                    <div className="mx-4 bg-white rounded-2xl p-4 shadow-sm mb-3">
                      <div className="flex items-center gap-1.5 mb-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-reno-green-400" />
                        <span className="text-[7px] font-bold uppercase tracking-widest text-slate-500">
                          Shift Status: Not Started
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-[#102122] mb-0.5">
                        North Industrial Complex
                      </h4>
                      <p className="text-[8px] text-slate-500 mb-3">
                        Active project assigned for today.
                      </p>
                      <div className="flex gap-2">
                        <div className="flex-1 bg-gradient-to-br from-[#27432f] to-[#3e5b45] text-white text-[9px] font-bold py-2 rounded-lg text-center flex items-center justify-center gap-1">
                          <span
                            className="material-symbols-outlined text-xs"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            location_on
                          </span>
                          Check In
                        </div>
                        <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center">
                          <span className="material-symbols-outlined text-slate-500 text-sm">
                            map
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Weekly hours */}
                    <div className="mx-4 bg-slate-100 rounded-2xl p-3 mb-3">
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-[8px] uppercase tracking-widest text-slate-500 font-bold">
                          Weekly Hours
                        </span>
                        <span className="text-[9px] font-bold text-primary">
                          32 / 40h
                        </span>
                      </div>
                      <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[80%] rounded-full" />
                      </div>
                    </div>

                    {/* Projects */}
                    <div className="mx-4 space-y-2 mb-3">
                      <span className="text-[8px] font-bold text-[#102122] uppercase tracking-widest">
                        My Projects
                      </span>
                      {myProjects.map((p) => (
                        <div
                          key={p.name}
                          className="bg-white rounded-xl p-2.5 flex items-center gap-2.5"
                        >
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                            <span className="material-symbols-outlined text-primary text-sm">
                              {p.icon}
                            </span>
                          </div>
                          <div className="flex-1">
                            <p className="text-[10px] font-bold text-[#102122]">
                              {p.name}
                            </p>
                            <p className="text-[8px] text-slate-500">{p.location}</p>
                          </div>
                          <span className="material-symbols-outlined text-slate-300 text-xs">
                            chevron_right
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Bottom nav */}
                    <div className="mt-auto flex justify-around items-center px-2 py-2.5 border-t border-slate-100">
                      {[
                        { icon: 'dashboard', label: 'Dashboard', active: true },
                        { icon: 'inventory_2', label: 'Projects', active: false },
                        { icon: 'location_on', label: 'Check-in', active: false },
                        { icon: 'history', label: 'Profile', active: false },
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

              {/* Right: Feature copy */}
              <div className="flex-1 space-y-8">
                <div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-3">
                    Personalized for every worker
                  </h3>
                  <p className="text-slate-400 leading-relaxed max-w-lg">
                    The dashboard adapts to each crew member — showing their
                    assigned project, shift status, weekly hours, and local
                    weather. No digging through menus.
                  </p>
                </div>
                <div className="space-y-5">
                  {[
                    { icon: 'location_on', label: 'One-tap GPS check-in', desc: 'Start your shift with a single tap. Location verified automatically.' },
                    { icon: 'partly_cloudy_day', label: 'Live site weather', desc: 'Temperature, wind, and conditions for your assigned site.' },
                    { icon: 'done_all', label: 'Activity timeline', desc: 'See your recent shifts, reports, and completed tasks at a glance.' },
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
          SECTION 3 — MODULE SHOWCASE
          4 core modules with feature lists
          ================================================================ */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-xs font-bold text-primary uppercase tracking-widest">
                Core Screens
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#102122] mt-4 tracking-tight">
                Four Screens, Zero Friction
              </h2>
              <p className="text-slate-500 mt-4 max-w-2xl mx-auto text-lg">
                Every screen is designed for field conditions — large touch
                targets, fast workflows, and offline-first reliability.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {fieldForceModules.map((mod, i) => (
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
          SECTION 4 — PROJECT DETAILS + ATTENDANCE
          Two phone mockups showing the deeper screens
          ================================================================ */}
      <section className="bg-[#f6f8f8] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-xs font-bold text-primary uppercase tracking-widest">
                Deep Dive
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#102122] mt-4 tracking-tight">
                Site Intel + Shift Records
              </h2>
              <p className="text-slate-500 mt-4 max-w-2xl mx-auto text-lg">
                Full project details before you step on site. Complete attendance
                logs after every shift.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Project Details phone */}
            <ScrollReveal>
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-extrabold text-[#102122] mb-6 tracking-tight">
                  Project Details
                </h3>
                <div className="w-full max-w-[320px] bg-zinc-900 rounded-[3rem] p-3 shadow-2xl border-[8px] border-zinc-800">
                  <div className="rounded-[2.2rem] overflow-hidden bg-[#f8faf8] flex flex-col min-h-[520px]">
                    {/* Header */}
                    <div className="px-5 pt-6 pb-2 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#102122] text-lg">
                          arrow_back
                        </span>
                        <span className="text-sm font-extrabold text-[#102122] tracking-tighter">
                          FieldForce
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-slate-400 text-lg">
                        notifications
                      </span>
                    </div>

                    {/* Project title */}
                    <div className="px-5 pt-1 pb-3">
                      <span className="text-[7px] font-bold text-slate-500 uppercase tracking-widest bg-slate-100 px-2 py-0.5 rounded-full">
                        Project ID: IRW-9042
                      </span>
                      <h3 className="text-base font-extrabold text-primary tracking-tight mt-2">
                        North Ridge Substation B-4
                      </h3>
                      <div className="flex items-center gap-1 mt-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-reno-green-500" />
                        <span className="text-[8px] font-semibold text-slate-500">
                          Active Site
                        </span>
                      </div>
                    </div>

                    {/* Map placeholder */}
                    <div className="mx-4 h-28 rounded-xl overflow-hidden relative bg-gradient-to-br from-slate-300 via-slate-200 to-slate-300 mb-3">
                      <div className="absolute inset-0 flex items-end p-3">
                        <div className="flex items-center gap-1.5 text-white">
                          <span className="material-symbols-outlined text-xs">
                            location_on
                          </span>
                          <span className="text-[8px] font-medium">
                            8900 Industrial Way, Denver, CO
                          </span>
                        </div>
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                    </div>

                    {/* Supervisor */}
                    <div className="mx-4 bg-white rounded-xl p-3 mb-2 shadow-sm">
                      <span className="text-[7px] font-bold text-slate-500 uppercase tracking-widest">
                        Site Supervisor
                      </span>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <span className="material-symbols-outlined text-primary text-sm">
                            person
                          </span>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-[#102122]">
                            James Miller
                          </p>
                          <p className="text-[8px] text-slate-500">
                            Senior Project Lead
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Safety briefing */}
                    <div className="mx-4 bg-red-50 border-l-2 border-red-300 rounded-lg p-3 mb-2">
                      <div className="flex items-start gap-2">
                        <span
                          className="material-symbols-outlined text-red-600 text-sm mt-0.5"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          warning
                        </span>
                        <div>
                          <p className="text-[9px] font-bold text-red-800">
                            Required Safety Briefing
                          </p>
                          <p className="text-[8px] text-red-600">
                            High-voltage protocols &amp; PPE verification
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Weather */}
                    <div className="mx-4 bg-primary/10 rounded-xl p-3 mb-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-primary text-xl">
                          sunny
                        </span>
                        <div>
                          <span className="text-sm font-extrabold text-[#102122]">
                            64&deg;F
                          </span>
                          <p className="text-[8px] text-slate-500">
                            Clear Skies &bull; Wind: 4mph
                          </p>
                        </div>
                      </div>
                      <span className="text-[7px] font-bold text-primary bg-white/60 px-2 py-0.5 rounded-full">
                        Optimal
                      </span>
                    </div>

                    {/* Check-in button */}
                    <div className="mx-4 mb-4">
                      <div className="bg-gradient-to-br from-[#27432f] to-[#3e5b45] text-white py-3 rounded-xl text-center flex items-center justify-center gap-2">
                        <span
                          className="material-symbols-outlined text-lg"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          location_on
                        </span>
                        <span className="text-xs font-extrabold tracking-tight">
                          Check In to Site
                        </span>
                      </div>
                    </div>

                    {/* Bottom nav */}
                    <div className="mt-auto flex justify-around items-center px-2 py-2.5 border-t border-slate-100">
                      {[
                        { icon: 'dashboard', label: 'Dashboard', active: false },
                        { icon: 'inventory_2', label: 'Projects', active: true },
                        { icon: 'location_on', label: 'Check-in', active: false },
                        { icon: 'history', label: 'Profile', active: false },
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

            {/* Attendance History phone */}
            <ScrollReveal delay={100}>
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-extrabold text-[#102122] mb-6 tracking-tight">
                  Attendance History
                </h3>
                <div className="w-full max-w-[320px] bg-zinc-900 rounded-[3rem] p-3 shadow-2xl border-[8px] border-zinc-800">
                  <div className="rounded-[2.2rem] overflow-hidden bg-[#f8faf8] flex flex-col min-h-[520px]">
                    {/* Header */}
                    <div className="px-5 pt-6 pb-2 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="material-symbols-outlined text-primary text-sm">
                            person
                          </span>
                        </div>
                        <span className="text-sm font-extrabold text-[#102122] tracking-tighter">
                          FieldForce
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-slate-400 text-lg">
                        notifications
                      </span>
                    </div>

                    {/* Title */}
                    <div className="px-5 pt-2 pb-3">
                      <h3 className="text-xl font-extrabold text-primary tracking-tight">
                        Attendance History
                      </h3>
                      <p className="text-[9px] text-slate-500">
                        Reviewing logs for October 2023
                      </p>
                    </div>

                    {/* Summary stats */}
                    <div className="mx-4 grid grid-cols-2 gap-2 mb-3">
                      <div className="bg-white rounded-xl p-3 shadow-sm">
                        <span className="text-[7px] uppercase tracking-widest text-slate-500 font-bold">
                          Total Hours
                        </span>
                        <div className="text-lg font-bold text-primary mt-0.5">
                          164.5
                        </div>
                        <div className="flex items-center gap-0.5 text-reno-green-600 text-[8px] font-medium mt-1">
                          <span className="material-symbols-outlined text-[10px]">
                            trending_up
                          </span>
                          12% from last month
                        </div>
                      </div>
                      <div className="bg-white rounded-xl p-3 shadow-sm">
                        <span className="text-[7px] uppercase tracking-widest text-slate-500 font-bold">
                          Days Active
                        </span>
                        <div className="text-lg font-bold text-primary mt-0.5">
                          21/24
                        </div>
                        <div className="flex items-center gap-0.5 text-slate-500 text-[8px] font-medium mt-1">
                          <span className="material-symbols-outlined text-[10px]">
                            verified
                          </span>
                          All verified
                        </div>
                      </div>
                    </div>

                    {/* Daily logs */}
                    <div className="mx-4 space-y-2 mb-3">
                      <span className="text-[7px] font-bold text-slate-500 uppercase tracking-widest">
                        Daily Logs
                      </span>
                      {attendanceLogs.map((log) => (
                        <div
                          key={log.date}
                          className="bg-white rounded-xl p-3 shadow-sm"
                        >
                          <div className="flex justify-between items-start mb-1.5">
                            <div>
                              <span className="text-[7px] font-bold text-slate-500 uppercase tracking-widest">
                                {log.date}
                              </span>
                              <p className="text-[10px] font-bold text-primary">
                                {log.project}
                              </p>
                            </div>
                            <span className="text-[7px] font-bold bg-primary/10 text-primary px-1.5 py-0.5 rounded-full uppercase">
                              Verified
                            </span>
                          </div>
                          <div className="flex items-center gap-1 text-[8px] text-slate-500 mb-2">
                            <span className="material-symbols-outlined text-[10px]">
                              location_on
                            </span>
                            {log.location}
                          </div>
                          <div className="flex justify-between items-center pt-1.5 border-t border-slate-100">
                            <div className="flex gap-3">
                              <div>
                                <span className="text-[7px] text-slate-400 uppercase">
                                  In
                                </span>
                                <p className="text-[9px] font-semibold text-[#102122]">
                                  {log.inTime}
                                </p>
                              </div>
                              <div>
                                <span className="text-[7px] text-slate-400 uppercase">
                                  Out
                                </span>
                                <p className="text-[9px] font-semibold text-[#102122]">
                                  {log.outTime}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-[7px] text-slate-400 uppercase">
                                Total
                              </span>
                              <p className="text-sm font-bold text-primary">
                                {log.total}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Bottom nav */}
                    <div className="mt-auto flex justify-around items-center px-2 py-2.5 border-t border-slate-100">
                      {[
                        { icon: 'dashboard', label: 'Dashboard', active: false },
                        { icon: 'inventory_2', label: 'Projects', active: false },
                        { icon: 'location_on', label: 'Check-in', active: false },
                        { icon: 'history', label: 'Profile', active: true },
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
          SECTION 5 — GPS CHECK-IN DETAIL
          White bg, two-column with check-in phone + copy
          ================================================================ */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
            {/* Phone mockup */}
            <ScrollReveal>
              <div className="w-full max-w-[300px] flex-shrink-0">
                <div className="bg-zinc-900 rounded-[3rem] p-3 shadow-2xl border-[8px] border-zinc-800">
                  <div className="rounded-[2.2rem] overflow-hidden bg-[#f8faf8] flex flex-col min-h-[480px]">
                    {/* Header */}
                    <div className="px-5 pt-6 pb-2 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="material-symbols-outlined text-primary text-sm">
                            person
                          </span>
                        </div>
                        <span className="text-sm font-extrabold text-[#102122] tracking-tighter">
                          FieldForce
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-slate-400 text-lg">
                        notifications
                      </span>
                    </div>

                    <div className="px-5 pt-1 pb-2">
                      <h3 className="text-xl font-bold text-[#102122] tracking-tight">
                        Check-in
                      </h3>
                      <p className="text-[9px] text-slate-500">
                        Verify your current site presence
                      </p>
                    </div>

                    {/* Map */}
                    <div className="mx-4 rounded-xl overflow-hidden relative bg-gradient-to-br from-slate-300 via-slate-200 to-slate-300 h-32 mb-3">
                      <div className="absolute inset-0 bg-primary/5" />
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                        <div className="w-10 h-10 bg-primary/20 rounded-full" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-primary border-2 border-white rounded-full shadow-md" />
                      </div>
                      <div className="absolute bottom-2 left-2 right-2 bg-white/80 backdrop-blur-sm p-2 rounded-lg flex justify-between items-center">
                        <div>
                          <p className="text-[7px] font-bold text-primary/60 uppercase tracking-widest">
                            Current Site
                          </p>
                          <p className="text-[9px] font-bold text-[#102122]">
                            Sector 7 Construction Hub
                          </p>
                        </div>
                        <span className="text-[7px] font-bold bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                          98%
                        </span>
                      </div>
                    </div>

                    {/* Selfie capture */}
                    <div className="mx-4 grid grid-cols-2 gap-2 mb-3">
                      <div className="aspect-square bg-slate-100 rounded-xl border-2 border-dashed border-slate-300 flex flex-col items-center justify-center">
                        <span className="material-symbols-outlined text-primary text-xl mb-0.5">
                          add_a_photo
                        </span>
                        <span className="text-[8px] font-bold text-slate-500">
                          Take Selfie
                        </span>
                      </div>
                      <div className="aspect-square bg-slate-100 rounded-xl overflow-hidden relative">
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="material-symbols-outlined text-primary text-xl bg-primary/20 p-2 rounded-full">
                            face_retouching_natural
                          </span>
                        </div>
                        <span className="absolute top-1.5 left-1.5 text-[7px] font-bold bg-slate-200 px-1.5 py-0.5 rounded uppercase text-slate-500">
                          Reference
                        </span>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="mx-4 bg-white rounded-xl p-3 shadow-sm space-y-2.5 mb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                          <span className="material-symbols-outlined text-primary text-sm">
                            schedule
                          </span>
                        </div>
                        <div>
                          <p className="text-[8px] text-slate-500">
                            Shift Start Time
                          </p>
                          <p className="text-[10px] font-bold text-[#102122]">
                            08:00 AM &bull; Today
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center">
                          <span className="material-symbols-outlined text-primary text-sm">
                            my_location
                          </span>
                        </div>
                        <div>
                          <p className="text-[8px] text-slate-500">
                            GPS Coordinates
                          </p>
                          <p className="text-[10px] font-bold text-[#102122]">
                            41.8781&deg; N, 87.6298&deg; W
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Verify button */}
                    <div className="mx-4 mb-4">
                      <div className="bg-gradient-to-br from-[#27432f] to-[#3e5b45] text-white py-3 rounded-xl text-center flex flex-col items-center">
                        <span className="text-xs font-extrabold tracking-tight">
                          Verify Location &amp; Identity
                        </span>
                        <span className="text-[7px] text-white/60 uppercase tracking-widest">
                          Secure Authentication Required
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Left copy */}
            <ScrollReveal delay={100}>
              <div className="flex-1 space-y-6">
                <span className="text-xs font-bold text-primary uppercase tracking-widest">
                  Identity + Location
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#102122] tracking-tight">
                  Tamper-Proof
                  <br />
                  Check-in
                </h2>
                <p className="text-slate-500 leading-relaxed max-w-lg">
                  Selfie verification matched against a reference photo, paired
                  with GPS geofence confirmation. Every check-in is
                  cryptographically stamped and impossible to fake.
                </p>
                <div className="space-y-4 pt-4">
                  {[
                    { icon: 'location_on', text: 'GPS geofence with 98% accuracy' },
                    { icon: 'face_retouching_natural', text: 'Selfie vs. reference photo match' },
                    { icon: 'schedule', text: 'Timestamped to the second' },
                    { icon: 'cloud_off', text: 'Works offline, syncs when connected' },
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
              location_on
            </span>

            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mt-4">
              Equip Your Crew
              <br />
              with FieldForce
            </h2>

            <p className="text-slate-400 mt-6 max-w-xl mx-auto text-lg">
              GPS check-in. Identity verification. Project briefs. Attendance
              logs. Safety briefings. One app for your entire field team.
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
                { icon: 'face_retouching_natural', label: 'Identity Match' },
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
