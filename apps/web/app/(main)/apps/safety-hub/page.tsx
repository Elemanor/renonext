import type { Metadata } from 'next';
import Link from 'next/link';
import { ScrollReveal } from '@/components/sentinel/scroll-reveal';
import {
  safetyHubModules,
  heroStats,
  jsaFormFields,
  toolboxTopics,
  certAlerts,
  inspectionTypes,
} from '@/lib/data/safety-hub';

export const metadata: Metadata = {
  title: 'SafetyHub — Construction Safety Management Platform | RenoNext',
  description:
    'JSA forms, toolbox meetings, incident reports, certificate tracking, and OHSA-aligned safety inspections for construction teams.',
  alternates: {
    canonical: '/apps/safety-hub',
  },
};

export default function SafetyHubPage() {
  return (
    <main className="overflow-hidden">
      {/* ================================================================
          SECTION 1 — HERO
          Dark bg, orange accent identity
          ================================================================ */}
      <section className="relative bg-reno-dark overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[700px] h-[700px] bg-[#E8AA42]/10 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: Copy */}
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-[#E8AA42]/20 px-4 py-1.5 rounded-full border border-[#E8AA42]/30 mb-8">
                <span
                  className="material-symbols-outlined text-[#E8AA42] text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  health_and_safety
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-[#E8AA42]">
                  Construction Safety Platform
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-5xl md:text-7xl font-extrabold text-white leading-[1.05] tracking-tight mb-6">
                Safety<span className="text-[#E8AA42]">Hub</span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-slate-400 max-w-xl font-light leading-relaxed mb-10">
                Complete safety management for construction teams — JSA forms,
                toolbox meetings, incident reports, certificate tracking, and
                OHSA-aligned inspections, all in one platform.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/join"
                  className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold shadow-float hover:shadow-float-hover transition-all"
                >
                  Get Started
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </Link>
                <Link
                  href="#features"
                  className="inline-flex items-center gap-2 bg-transparent hover:bg-white/5 text-white px-8 py-4 rounded-xl font-bold border-2 border-white/20 hover:border-white/40 transition-all"
                >
                  See Features
                </Link>
              </div>

              {/* Stats pills */}
              <div className="flex flex-wrap gap-5 mt-12">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-slate-500 mb-1 font-medium">
                      {stat.label}
                    </span>
                    <div className="bg-white/5 px-5 py-2.5 rounded border border-white/10">
                      <span className="font-black text-white text-lg">
                        {stat.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Phone mockup — JSA form */}
            <div className="flex justify-center lg:justify-end">
              <div className="w-full max-w-[360px]">
                <div className="bg-zinc-900 rounded-[2.5rem] p-4 shadow-2xl border-[6px] border-zinc-800">
                  <div className="rounded-[2rem] overflow-hidden bg-[#1a1a1f] flex flex-col min-h-[640px]">
                    {/* Status bar */}
                    <div className="h-7 bg-[#1a1a1f] flex items-center justify-center">
                      <div className="w-24 h-4 bg-black rounded-full" />
                    </div>

                    {/* App header */}
                    <div className="px-5 pt-3 pb-4 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-[#E8AA42]/20 flex items-center justify-center">
                          <span
                            className="material-symbols-outlined text-[#E8AA42] text-sm"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            health_and_safety
                          </span>
                        </div>
                        <span className="text-sm font-extrabold text-white tracking-tighter">
                          SafetyHub
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-slate-500 text-lg">
                        more_vert
                      </span>
                    </div>

                    {/* JSA Form Title */}
                    <div className="px-5 pb-4">
                      <h3 className="text-lg font-extrabold text-[#E8AA42] tracking-tight">
                        Job Safety Analysis
                      </h3>
                      <p className="text-[10px] text-slate-500 mt-1">
                        Foundation Pour — King St Condos
                      </p>
                    </div>

                    {/* JSA Steps */}
                    <div className="flex-1 px-4 space-y-2.5 pb-6 overflow-y-auto">
                      {jsaFormFields.map((field, i) => (
                        <div
                          key={i}
                          className="bg-[#242429] rounded-xl p-3 border border-white/5"
                        >
                          <div className="flex items-start justify-between gap-2 mb-2">
                            <span className="text-[9px] font-bold text-white">
                              Step {i + 1}
                            </span>
                            <span
                              className={`text-[7px] font-bold uppercase px-1.5 py-0.5 rounded-full ${
                                field.riskLevel === 'high'
                                  ? 'bg-reno-red-500/20 text-reno-red-400'
                                  : field.riskLevel === 'medium'
                                    ? 'bg-amber-500/20 text-amber-400'
                                    : 'bg-reno-green-500/20 text-reno-green-400'
                              }`}
                            >
                              {field.riskLevel} risk
                            </span>
                          </div>
                          <p className="text-[8px] text-slate-300 mb-1.5 leading-tight">
                            {field.step}
                          </p>
                          <div className="bg-[#1a1a1f] rounded px-2 py-1.5 mb-1.5">
                            <p className="text-[7px] text-slate-500 uppercase font-bold mb-0.5">
                              Hazard
                            </p>
                            <p className="text-[8px] text-slate-400 leading-tight">
                              {field.hazard}
                            </p>
                          </div>
                          <div className="bg-[#1a1a1f] rounded px-2 py-1.5">
                            <p className="text-[7px] text-slate-500 uppercase font-bold mb-0.5">
                              Control
                            </p>
                            <p className="text-[8px] text-slate-400 leading-tight">
                              {field.control}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Submit button */}
                    <div className="px-4 pb-5">
                      <button className="w-full bg-[#E8AA42] hover:bg-[#E8AA42]/90 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2">
                        Submit JSA
                        <span className="material-symbols-outlined text-base">
                          check_circle
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 2 — JSA & TOOLBOX
          White bg
          ================================================================ */}
      <section className="bg-white py-24" id="features">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left: Copy */}
              <div className="space-y-8">
                <div>
                  <span className="text-xs font-bold text-primary uppercase tracking-widest">
                    JSA Forms & Toolbox Meetings
                  </span>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-[#102122] mt-4 tracking-tight">
                    Safety Documentation, Digitized
                  </h2>
                  <p className="text-slate-500 mt-4 text-lg leading-relaxed max-w-lg">
                    Replace paper JSA forms with mobile-first digital workflows.
                    Pre-task hazard assessments, step-by-step risk breakdown, and
                    crew sign-off verification — all captured with photo proof
                    and GPS location.
                  </p>
                </div>

                <div className="space-y-5">
                  {safetyHubModules[0].features.map((feat, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span
                          className="material-symbols-outlined text-primary text-lg"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check_circle
                        </span>
                      </div>
                      <div>
                        <h4 className="text-[#102122] font-bold text-sm">
                          {feat}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <Link
                    href="/jsa"
                    className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
                  >
                    Try Free JSA Generator
                    <span className="material-symbols-outlined text-base">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>

              {/* Right: Toolbox meeting cards */}
              <div className="space-y-4">
                <div className="bg-[#f6f8f8] rounded-xl p-6 border border-slate-200">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-full bg-[#E8AA42]/20 flex items-center justify-center">
                      <span
                        className="material-symbols-outlined text-[#E8AA42] text-lg"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        group
                      </span>
                    </div>
                    <div>
                      <h3 className="font-extrabold text-[#102122] text-sm">
                        Toolbox Meetings
                      </h3>
                      <p className="text-[10px] text-slate-500">
                        Daily safety talks
                      </p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {toolboxTopics.slice(0, 3).map((topic, i) => (
                      <div
                        key={i}
                        className="bg-white rounded-lg p-3 border border-slate-100"
                      >
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <h4 className="text-[11px] font-bold text-[#102122] leading-tight">
                            {topic.title}
                          </h4>
                          <span className="text-[9px] text-slate-500 flex-shrink-0">
                            {new Date(topic.date).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                            })}
                          </span>
                        </div>
                        <div className="flex items-center gap-3 text-[9px] text-slate-500">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[10px]">
                              person
                            </span>
                            {topic.presenter}
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-[10px]">
                              groups
                            </span>
                            {topic.attendees} crew
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-primary/5 rounded-xl p-5 border border-primary/20">
                  <div className="flex items-center gap-3">
                    <span
                      className="material-symbols-outlined text-primary text-2xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      library_books
                    </span>
                    <div>
                      <p className="text-sm font-bold text-[#102122]">
                        500+ Pre-Written Topics
                      </p>
                      <p className="text-xs text-slate-600 mt-0.5">
                        Fall protection, electrical hazards, heat stress, ladder
                        safety, and more
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================
          SECTION 3 — CERTIFICATE TRACKING
          Light gray bg
          ================================================================ */}
      <section className="bg-[#f6f8f8] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left: Tablet mockup — Certificate alerts */}
              <div className="w-full max-w-[520px] mx-auto lg:mx-0">
                <div className="bg-zinc-900 rounded-[2rem] p-3 shadow-2xl border-[6px] border-zinc-800">
                  <div className="rounded-[1.4rem] overflow-hidden bg-white flex flex-col min-h-[480px]">
                    {/* App header */}
                    <div className="px-5 pt-5 pb-3 flex justify-between items-center border-b border-slate-200">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                          <span
                            className="material-symbols-outlined text-primary text-sm"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            verified
                          </span>
                        </div>
                        <span className="text-sm font-extrabold text-[#102122] tracking-tighter">
                          Certificate Tracker
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-slate-400 text-lg">
                        filter_list
                      </span>
                    </div>

                    {/* Title */}
                    <div className="px-5 pt-4 pb-3">
                      <h3 className="text-base font-extrabold text-primary tracking-tight">
                        Certification Status
                      </h3>
                      <p className="text-[10px] text-slate-500 mt-1">
                        3 expiring soon · 1 expired
                      </p>
                    </div>

                    {/* Certificate alerts table */}
                    <div className="flex-1 overflow-y-auto">
                      <table className="w-full text-left">
                        <thead className="bg-slate-50 sticky top-0">
                          <tr>
                            <th className="px-5 py-2 text-[9px] font-bold uppercase tracking-wider text-slate-600">
                              Worker
                            </th>
                            <th className="px-3 py-2 text-[9px] font-bold uppercase tracking-wider text-slate-600">
                              Certificate
                            </th>
                            <th className="px-3 py-2 text-[9px] font-bold uppercase tracking-wider text-slate-600 text-right">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {certAlerts.map((cert, i) => (
                            <tr key={i} className="hover:bg-slate-50">
                              <td className="px-5 py-3">
                                <p className="text-[10px] font-bold text-[#102122]">
                                  {cert.workerName}
                                </p>
                                <p className="text-[9px] text-slate-500">
                                  Expires{' '}
                                  {new Date(cert.expiryDate).toLocaleDateString(
                                    'en-US',
                                    { month: 'short', day: 'numeric' }
                                  )}
                                </p>
                              </td>
                              <td className="px-3 py-3">
                                <p className="text-[9px] text-slate-700">
                                  {cert.certType}
                                </p>
                              </td>
                              <td className="px-3 py-3 text-right">
                                <span
                                  className={`inline-block text-[7px] font-bold uppercase px-2 py-1 rounded-full ${
                                    cert.status === 'expired'
                                      ? 'bg-reno-red-100 text-reno-red-700'
                                      : cert.status === 'expiring'
                                        ? 'bg-amber-100 text-amber-700'
                                        : 'bg-reno-green-100 text-reno-green-700'
                                  }`}
                                >
                                  {cert.status === 'expired'
                                    ? 'Expired'
                                    : cert.status === 'expiring'
                                      ? `${cert.daysLeft}d left`
                                      : 'Valid'}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    {/* Alert banner */}
                    <div className="px-5 py-4 bg-amber-50 border-t border-amber-200">
                      <div className="flex items-center gap-2">
                        <span
                          className="material-symbols-outlined text-amber-600 text-base"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          warning
                        </span>
                        <p className="text-[9px] text-amber-800 font-medium">
                          3 workers need certification renewal within 14 days
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Copy */}
              <div className="space-y-8">
                <div>
                  <span className="text-xs font-bold text-primary uppercase tracking-widest">
                    Certificate Tracking
                  </span>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-[#102122] mt-4 tracking-tight">
                    Never Miss a Renewal Again
                  </h2>
                  <p className="text-slate-500 mt-4 text-lg leading-relaxed max-w-lg">
                    Centralized worker certification management with automated
                    expiry alerts. WHMIS, First Aid, Fall Arrest, Forklift
                    Operator — track every credential in one place with
                    email/SMS reminders 30, 14, and 7 days before expiration.
                  </p>
                </div>

                <div className="space-y-5">
                  {safetyHubModules[3].features.map((feat, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span
                          className="material-symbols-outlined text-primary text-lg"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check_circle
                        </span>
                      </div>
                      <div>
                        <h4 className="text-[#102122] font-bold text-sm">
                          {feat}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
                  <div className="flex items-start gap-3">
                    <span
                      className="material-symbols-outlined text-primary text-2xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      notifications_active
                    </span>
                    <div>
                      <p className="text-sm font-bold text-[#102122]">
                        Automatic Alerts
                      </p>
                      <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                        Email and SMS notifications sent 30, 14, and 7 days
                        before expiry — to workers, foremen, and safety
                        coordinators.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================
          SECTION 4 — TOOLBOX TALKS
          White bg
          ================================================================ */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              {/* Left: Copy */}
              <div className="space-y-8">
                <div>
                  <span className="text-xs font-bold text-primary uppercase tracking-widest">
                    Toolbox Meetings
                  </span>
                  <h2 className="text-4xl md:text-5xl font-extrabold text-[#102122] mt-4 tracking-tight">
                    Toolbox Meetings That Actually Get Done
                  </h2>
                  <p className="text-slate-500 mt-4 text-lg leading-relaxed max-w-lg">
                    Daily safety talks with pre-written topics, QR code
                    attendance, photo proof, and digital sign-off. Choose from
                    500+ topics covering fall protection, electrical hazards,
                    heat stress, ladder safety, and more.
                  </p>
                </div>

                <div className="space-y-5">
                  {safetyHubModules[1].features.map((feat, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span
                          className="material-symbols-outlined text-primary text-lg"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check_circle
                        </span>
                      </div>
                      <div>
                        <h4 className="text-[#102122] font-bold text-sm">
                          {feat}
                        </h4>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="pt-4">
                  <Link
                    href="/toolbox-talk"
                    className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
                  >
                    Generate Free Toolbox Talk
                    <span className="material-symbols-outlined text-base">
                      arrow_forward
                    </span>
                  </Link>
                </div>
              </div>

              {/* Right: Phone mockup — Toolbox meeting */}
              <div className="flex justify-center lg:justify-end">
                <div className="w-full max-w-[360px]">
                  <div className="bg-zinc-900 rounded-[2.5rem] p-4 shadow-2xl border-[6px] border-zinc-800">
                    <div className="rounded-[2rem] overflow-hidden bg-[#1a1a1f] flex flex-col min-h-[640px]">
                      {/* Status bar */}
                      <div className="h-7 bg-[#1a1a1f] flex items-center justify-center">
                        <div className="w-24 h-4 bg-black rounded-full" />
                      </div>

                      {/* App header */}
                      <div className="px-5 pt-3 pb-4 flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-slate-400 text-lg">
                            arrow_back
                          </span>
                        </div>
                        <span className="text-sm font-extrabold text-white tracking-tighter">
                          Toolbox Meeting
                        </span>
                        <span className="material-symbols-outlined text-slate-500 text-lg">
                          more_vert
                        </span>
                      </div>

                      {/* Meeting info */}
                      <div className="px-5 pb-4 border-b border-white/10">
                        <h3 className="text-base font-extrabold text-[#E8AA42] tracking-tight mb-2">
                          {toolboxTopics[0].title}
                        </h3>
                        <div className="flex items-center gap-4 text-[10px] text-slate-500">
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs">
                              person
                            </span>
                            {toolboxTopics[0].presenter}
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs">
                              groups
                            </span>
                            {toolboxTopics[0].attendees} attendees
                          </span>
                          <span className="flex items-center gap-1">
                            <span className="material-symbols-outlined text-xs">
                              schedule
                            </span>
                            Today 7:15 AM
                          </span>
                        </div>
                      </div>

                      {/* Attendance list */}
                      <div className="flex-1 px-4 py-4 overflow-y-auto">
                        <div className="mb-3">
                          <h4 className="text-[9px] font-bold uppercase tracking-wider text-slate-500 mb-2">
                            Digital Sign-Off ({toolboxTopics[0].attendees}/
                            {toolboxTopics[0].attendees})
                          </h4>
                        </div>
                        <div className="space-y-2">
                          {[
                            {
                              name: 'Mike Torres',
                              role: 'Foreman',
                              color: 'bg-primary-500',
                              time: '7:15 AM',
                            },
                            {
                              name: 'Sarah Chen',
                              role: 'Carpenter',
                              color: 'bg-reno-green-500',
                              time: '7:16 AM',
                            },
                            {
                              name: 'James Park',
                              role: 'Electrician',
                              color: 'bg-purple-500',
                              time: '7:16 AM',
                            },
                            {
                              name: 'David Kim',
                              role: 'Laborer',
                              color: 'bg-amber-500',
                              time: '7:17 AM',
                            },
                            {
                              name: 'Maria Santos',
                              role: 'Plumber',
                              color: 'bg-reno-red-500',
                              time: '7:17 AM',
                            },
                            {
                              name: 'John Ibrahim',
                              role: 'Site Super',
                              color: 'bg-primary-500',
                              time: '7:18 AM',
                            },
                            {
                              name: 'Alex Chen',
                              role: 'Carpenter',
                              color: 'bg-teal-500',
                              time: '7:18 AM',
                            },
                            {
                              name: 'Lisa Wong',
                              role: 'Laborer',
                              color: 'bg-reno-amber-500',
                              time: '7:19 AM',
                            },
                          ]
                            .slice(0, toolboxTopics[0].attendees)
                            .map((person, i) => (
                              <div
                                key={i}
                                className="bg-[#242429] rounded-xl p-3 flex items-center gap-3 border border-white/5"
                              >
                                <div
                                  className={`w-9 h-9 rounded-full ${person.color} flex items-center justify-center flex-shrink-0`}
                                >
                                  <span className="text-[10px] font-bold text-white">
                                    {person.name
                                      .split(' ')
                                      .map((n) => n[0])
                                      .join('')}
                                  </span>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-[10px] font-bold text-white truncate">
                                    {person.name}
                                  </p>
                                  <p className="text-[8px] text-slate-500">
                                    {person.role}
                                  </p>
                                </div>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                  <span className="text-[8px] text-slate-500">
                                    {person.time}
                                  </span>
                                  <span
                                    className="material-symbols-outlined text-reno-green-400 text-base"
                                    style={{
                                      fontVariationSettings: "'FILL' 1",
                                    }}
                                  >
                                    check_circle
                                  </span>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>

                      {/* Complete button */}
                      <div className="px-4 pb-5 pt-3 border-t border-white/10">
                        <button className="w-full bg-[#E8AA42] hover:bg-[#E8AA42]/90 text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2">
                          Complete Meeting
                          <span className="material-symbols-outlined text-base">
                            done_all
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================
          SECTION 5 — SAFETY INSPECTION TYPES GRID
          Light gray bg
          ================================================================ */}
      <section className="bg-[#f6f8f8] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-xs font-bold text-primary uppercase tracking-widest">
                Safety Inspections
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#102122] mt-4 tracking-tight">
                OHSA-Aligned Inspections
              </h2>
              <p className="text-slate-500 mt-4 max-w-2xl mx-auto text-lg">
                Digital inspection checklists for ladders, scaffolds,
                excavations, electrical safety, fall protection, and PPE
                compliance — with pass/fail scoring, photo evidence, and
                ministry-ready PDF reports.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {inspectionTypes.map((inspection, i) => (
              <ScrollReveal key={inspection.name} delay={i * 80}>
                <div className="bg-white rounded-xl p-6 border border-slate-200 hover:shadow-float transition-shadow h-full">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <span
                        className="material-symbols-outlined text-primary text-xl"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {inspection.icon}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-extrabold text-[#102122] text-base mb-1">
                        {inspection.name}
                      </h3>
                      <p className="text-xs text-slate-500">
                        {inspection.checklistCount} checkpoint
                        {inspection.checklistCount !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500">Last completed</span>
                    <span className="font-bold text-[#102122]">
                      {new Date(inspection.lastCompleted).toLocaleDateString(
                        'en-US',
                        {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        }
                      )}
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* Cross-links to free tools */}
          <ScrollReveal>
            <div className="mt-12 flex flex-wrap justify-center gap-4">
              <Link
                href="/jsa"
                className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
              >
                Free JSA Generator
                <span className="material-symbols-outlined text-base">
                  arrow_forward
                </span>
              </Link>
              <span className="text-slate-300">•</span>
              <Link
                href="/safety-inspection"
                className="inline-flex items-center gap-2 text-primary font-bold hover:gap-3 transition-all"
              >
                Free Safety Inspection
                <span className="material-symbols-outlined text-base">
                  arrow_forward
                </span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================
          SECTION 6 — CTA
          Dark bg
          ================================================================ */}
      <section className="bg-reno-dark py-24 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#E8AA42]/10 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <ScrollReveal>
            <div className="mb-8">
              <h2 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight mb-6">
                Safety compliance shouldn&apos;t be paperwork.
              </h2>
              <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Join construction teams across Ontario who are moving their
                safety programs from clipboards to mobile — and getting
                compliant, staying compliant.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <Link
                href="/join"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold shadow-float hover:shadow-float-hover transition-all"
              >
                Get Started
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </Link>
              <Link
                href="/contractors"
                className="inline-flex items-center gap-2 bg-transparent hover:bg-white/5 text-white px-8 py-4 rounded-xl font-bold border-2 border-white/20 hover:border-white/40 transition-all"
              >
                Learn More
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-8 text-slate-500 text-sm">
              <div className="flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
                <span>WSIB Compliant</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  gavel
                </span>
                <span>MOL Ready</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-primary"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  picture_as_pdf
                </span>
                <span>PDF Export</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
