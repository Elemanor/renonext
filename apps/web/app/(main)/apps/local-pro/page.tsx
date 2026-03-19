import type { Metadata } from 'next';
import Link from 'next/link';
import { ScrollReveal } from '@/components/sentinel/scroll-reveal';
import {
  localProModules,
  projectStats,
  teamMembers,
  photoEntries,
  checkInLog,
} from '@/lib/data/local-pro';

export const metadata: Metadata = {
  title: 'LocalPro — Project Control Platform | RenoNext',
  description:
    'GPS-verified attendance, photo compliance logs, escrow-protected vault, and team management — all in one precision project dashboard.',
};

export default function LocalProPage() {
  return (
    <main className="overflow-hidden">
      {/* ================================================================
          SECTION 1 — HERO
          Light bg with green accent identity
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
                dashboard
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Project Management Platform
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-extrabold text-[#102122] leading-[1.05] tracking-tight mb-6">
              Project Control.
              <br />
              <span className="text-primary">Precision Management.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-500 max-w-xl font-light leading-relaxed mb-10">
              GPS-verified attendance, photo compliance logs, escrow-protected
              vault, and team management — everything a site manager needs in
              one dashboard.
            </p>

            {/* Stat pills */}
            <div className="flex flex-wrap gap-5">
              {projectStats.map((stat) => (
                <div key={stat.label} className="flex flex-col">
                  <span className="text-[10px] uppercase tracking-widest text-gray-400 mb-1 font-medium">
                    {stat.label}
                  </span>
                  <div className="bg-gray-100 px-5 py-2.5">
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
          SECTION 2 — FULL DASHBOARD PREVIEW
          Browser frame with complete LocalPro dashboard recreation
          ================================================================ */}
      <section className="bg-[#102122] py-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-xs font-bold text-primary uppercase tracking-widest">
                The Full Dashboard
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-4 tracking-tight">
                Everything at a Glance
              </h2>
              <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
                One dashboard for GPS attendance, photo compliance, financial
                vault, and team management — designed for construction
                professionals.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/[0.08]">
              {/* Browser chrome */}
              <div className="bg-[#e7e8e9] px-4 py-3 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-white/70 rounded-full px-6 py-1 text-[11px] text-gray-500 font-medium">
                    app.renonext.com/local-pro/dashboard
                  </div>
                </div>
              </div>

              {/* Dashboard body */}
              <div className="bg-[#f8f9fa]">
                {/* Top nav */}
                <div className="px-5 py-3 flex justify-between items-center border-b border-gray-100">
                  <div className="flex items-center gap-6">
                    <span className="text-base font-bold text-[#102122] tracking-tight">
                      LocalPro
                    </span>
                    <div className="hidden md:flex gap-4">
                      <span className="text-xs font-semibold text-primary border-b-2 border-primary pb-0.5">
                        Projects
                      </span>
                      <span className="text-xs text-gray-500">Schedule</span>
                      <span className="text-xs text-gray-500">Vault</span>
                      <span className="text-xs text-gray-500">Teams</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-gray-100 rounded-full px-3 py-1 flex items-center gap-1.5 hidden md:flex">
                      <span className="material-symbols-outlined text-gray-400 text-xs">
                        search
                      </span>
                      <span className="text-[10px] text-gray-400">
                        Search projects...
                      </span>
                    </div>
                    <span className="material-symbols-outlined text-gray-400 text-lg">
                      notifications
                    </span>
                    <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                      <span className="text-[8px] font-bold text-primary">
                        MT
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex">
                  {/* Sidebar */}
                  <div className="hidden lg:flex flex-col w-48 bg-[#f3f4f5] p-3 min-h-[480px]">
                    <div className="px-3 py-4 mb-3">
                      <h3 className="text-xs font-black text-[#102122]">
                        Project Control
                      </h3>
                      <p className="text-[7px] uppercase tracking-widest text-gray-500 font-semibold">
                        Precision Management
                      </p>
                    </div>
                    <div className="space-y-0.5">
                      {[
                        { icon: 'dashboard', label: 'Dashboard', active: true },
                        { icon: 'construction', label: 'Active Sites', active: false },
                        { icon: 'payments', label: 'Financials', active: false },
                        { icon: 'folder_shared', label: 'Documents', active: false },
                        { icon: 'history', label: 'Archive', active: false },
                      ].map((item) => (
                        <div
                          key={item.label}
                          className={`flex items-center gap-2 px-3 py-2 rounded-md text-[10px] ${
                            item.active
                              ? 'bg-white text-primary font-bold shadow-sm'
                              : 'text-gray-500'
                          }`}
                        >
                          <span className="material-symbols-outlined text-sm">
                            {item.icon}
                          </span>
                          {item.label}
                        </div>
                      ))}
                    </div>
                    <div className="mt-6 mx-1">
                      <div className="bg-primary text-white text-[9px] font-bold py-2 rounded-md text-center flex items-center justify-center gap-1">
                        <span className="material-symbols-outlined text-xs">
                          add
                        </span>
                        New Project
                      </div>
                    </div>
                    <div className="mt-auto pt-4 border-t border-gray-200 space-y-0.5">
                      <div className="flex items-center gap-2 px-3 py-1.5 text-[10px] text-gray-500">
                        <span className="material-symbols-outlined text-xs">
                          help_center
                        </span>
                        Support
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1.5 text-[10px] text-gray-500">
                        <span className="material-symbols-outlined text-xs">
                          logout
                        </span>
                        Sign Out
                      </div>
                    </div>
                  </div>

                  {/* Main content */}
                  <div className="flex-1 p-5">
                    <div className="flex flex-col lg:flex-row gap-5">
                      {/* Left: Primary feed */}
                      <div className="flex-[2] space-y-5">
                        {/* Project header */}
                        <div className="flex justify-between items-end mb-1">
                          <div>
                            <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-wider">
                              Project Site #882
                            </span>
                            <h2 className="text-xl font-extrabold text-[#102122] tracking-tight">
                              Northwest Logistics Hub
                            </h2>
                          </div>
                          <span className="px-2 py-0.5 bg-primary/10 text-primary rounded-full text-[8px] font-bold uppercase">
                            On Schedule
                          </span>
                        </div>

                        {/* GPS Check-in */}
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <div className="bg-primary/10 p-1.5 rounded-md">
                                <span className="material-symbols-outlined text-primary text-sm">
                                  location_on
                                </span>
                              </div>
                              <div>
                                <h3 className="text-xs font-bold text-[#102122]">
                                  GPS Verified Check-in
                                </h3>
                                <span className="text-[8px] text-gray-500 uppercase tracking-widest">
                                  Precision Tracking
                                </span>
                              </div>
                            </div>
                            <span className="text-[9px] text-gray-400 italic">
                              Today at 07:42 AM
                            </span>
                          </div>
                          <div className="flex gap-4">
                            {/* Map */}
                            <div className="flex-1 h-32 rounded-lg overflow-hidden relative bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200">
                              <div
                                className="absolute inset-0 opacity-10"
                                style={{
                                  backgroundImage:
                                    'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
                                  backgroundSize: '16px 16px',
                                }}
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-12 h-12 border-2 border-primary/30 bg-primary/10 rounded-full" />
                                <div className="absolute w-2 h-2 bg-primary border border-white rounded-full" />
                              </div>
                              <div className="absolute bottom-2 left-2 bg-white/80 backdrop-blur-sm px-1.5 py-0.5 rounded text-[8px] font-mono text-[#102122]">
                                47.6062&deg; N, 122.3321&deg; W
                              </div>
                            </div>
                            {/* Info */}
                            <div className="w-40 space-y-3">
                              <div>
                                <span className="text-[8px] uppercase tracking-widest text-gray-500 font-bold">
                                  Site Manager
                                </span>
                                <p className="text-[11px] font-semibold text-[#102122]">
                                  Marcus Thorne
                                </p>
                              </div>
                              <div>
                                <span className="text-[8px] uppercase tracking-widest text-gray-500 font-bold">
                                  Crew Status
                                </span>
                                <div className="flex items-center gap-1 text-primary text-[11px] font-bold">
                                  <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                                  Active (14 On-site)
                                </div>
                              </div>
                              <div className="border border-gray-200 text-primary text-[9px] font-bold py-1.5 rounded-md text-center">
                                View Full Log
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Photo Log */}
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <div className="bg-primary/10 p-1.5 rounded-md">
                                <span className="material-symbols-outlined text-primary text-sm">
                                  photo_library
                                </span>
                              </div>
                              <div>
                                <h3 className="text-xs font-bold text-[#102122]">
                                  Rebar Inspection Log
                                </h3>
                                <span className="text-[8px] text-gray-500 uppercase tracking-widest">
                                  Compliance Proofs
                                </span>
                              </div>
                            </div>
                            <span className="text-[9px] text-primary font-bold">
                              Upload Daily Photos
                            </span>
                          </div>
                          <div className="grid grid-cols-4 gap-2">
                            {photoEntries.map((photo) => (
                              <div
                                key={photo.label}
                                className="aspect-square rounded-lg overflow-hidden bg-gradient-to-br from-gray-300 via-gray-200 to-gray-300 relative"
                              >
                                <div className="absolute inset-0 flex items-center justify-center">
                                  <span className="material-symbols-outlined text-white/40 text-2xl">
                                    {photo.icon}
                                  </span>
                                </div>
                                <div className="absolute bottom-0 inset-x-0 p-1.5 bg-gradient-to-t from-black/60 to-transparent">
                                  <span className="text-[7px] font-bold text-white">
                                    {photo.label}
                                  </span>
                                </div>
                              </div>
                            ))}
                            <div className="aspect-square rounded-lg bg-gray-100 flex flex-col items-center justify-center text-gray-400">
                              <span className="material-symbols-outlined text-xl">
                                add_a_photo
                              </span>
                              <span className="text-[7px] font-bold mt-0.5">
                                ADD MORE
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right: Sidebar widgets */}
                      <div className="flex-1 space-y-4">
                        {/* Vault Status */}
                        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                          <div className="flex items-center gap-2 mb-4">
                            <span
                              className="material-symbols-outlined text-gray-500 text-lg"
                              style={{
                                fontVariationSettings: "'FILL' 1",
                              }}
                            >
                              account_balance_wallet
                            </span>
                            <h3 className="text-xs font-bold text-[#102122]">
                              Project Vault Status
                            </h3>
                          </div>
                          <div className="mb-3">
                            <div className="flex justify-between items-end mb-1.5">
                              <span className="text-[8px] uppercase tracking-widest text-gray-500 font-bold">
                                Total Disbursed
                              </span>
                              <span className="text-base font-extrabold text-[#102122]">
                                $1,245,000
                              </span>
                            </div>
                            <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden flex gap-[1px]">
                              <div className="h-full bg-primary w-[65%]" />
                              <div className="h-full bg-primary/30 w-[15%]" />
                            </div>
                            <div className="flex justify-between mt-1">
                              <span className="text-[8px] text-gray-500">
                                Phase 1 Complete
                              </span>
                              <span className="text-[8px] font-bold text-primary">
                                80% Utilization
                              </span>
                            </div>
                          </div>
                          <div className="p-2 bg-gray-50 rounded-md flex items-center gap-2">
                            <span className="material-symbols-outlined text-primary text-sm">
                              verified_user
                            </span>
                            <div className="text-[9px] leading-tight">
                              <span className="font-bold text-[#102122] block">
                                Escrow Secured
                              </span>
                              <span className="text-gray-500">
                                Milestone 3 funds held in Vault
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Pending Approval */}
                        <div className="bg-white rounded-xl p-4 shadow-sm border-t-[3px] border-primary">
                          <div className="flex items-center gap-1.5 mb-2">
                            <span className="px-1.5 py-0.5 bg-primary/10 text-primary rounded text-[7px] font-black uppercase tracking-widest">
                              Urgent
                            </span>
                            <span className="text-[8px] uppercase tracking-widest text-gray-500 font-bold">
                              Milestone 2
                            </span>
                          </div>
                          <h3 className="text-xs font-bold text-[#102122] mb-0.5">
                            Foundation Concrete Pour
                          </h3>
                          <p className="text-[9px] text-gray-500 mb-3">
                            Inspection signed off. Awaiting fund release.
                          </p>
                          <div className="bg-primary text-white text-[9px] font-bold py-2 rounded-md text-center flex items-center justify-center gap-1">
                            <span className="material-symbols-outlined text-xs">
                              payments
                            </span>
                            Review Proof &amp; Release
                          </div>
                        </div>

                        {/* Site Team */}
                        <div className="bg-gray-50 rounded-xl p-4">
                          <h3 className="text-[8px] font-bold uppercase tracking-widest text-gray-500 mb-3">
                            Site Team
                          </h3>
                          <div className="space-y-2.5">
                            {teamMembers.map((member) => (
                              <div
                                key={member.name}
                                className="flex items-center gap-2"
                              >
                                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                                  <span className="text-[7px] font-bold text-primary">
                                    {member.initials}
                                  </span>
                                </div>
                                <div className="flex-1">
                                  <p className="text-[10px] font-bold text-[#102122]">
                                    {member.name}
                                  </p>
                                  <p className="text-[8px] text-gray-500">
                                    {member.role}
                                  </p>
                                </div>
                                <span className="material-symbols-outlined text-gray-400 text-xs">
                                  chat_bubble
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
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
          SECTION 3 — MODULE SHOWCASE
          4 core modules with feature lists
          ================================================================ */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-xs font-bold text-primary uppercase tracking-widest">
                Core Modules
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#102122] mt-4 tracking-tight">
                Built for Site Managers
              </h2>
              <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
                Four modules that give you full control over your project site
                &mdash; from who&apos;s on the ground to where every dollar
                goes.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {localProModules.map((mod, i) => (
              <ScrollReveal key={mod.id} delay={i * 80}>
                <div className="bg-[#f6f8f8] p-8 rounded-xl border border-gray-100 h-full">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100 flex-shrink-0">
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
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">
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
                        <span className="text-gray-600">{feat}</span>
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
          SECTION 4 — GPS + VAULT DEEP DIVE
          Two-column visual mockups
          ================================================================ */}
      <section className="bg-[#f6f8f8] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* GPS Check-in Detail */}
            <ScrollReveal>
              <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm h-full">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary">
                      location_on
                    </span>
                  </div>
                  <div>
                    <h3 className="font-extrabold text-[#102122] text-lg">
                      GPS Verified Check-in
                    </h3>
                    <p className="text-xs text-gray-500">
                      Geofenced attendance for your entire crew
                    </p>
                  </div>
                </div>

                {/* Map mockup */}
                <div className="h-40 rounded-xl overflow-hidden relative bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 mb-5">
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
                      backgroundSize: '24px 24px',
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-24 h-24 border-[3px] border-primary/30 bg-primary/10 rounded-full" />
                    <div className="absolute w-4 h-4 bg-primary border-2 border-white rounded-full shadow-md" />
                  </div>
                  <div className="absolute bottom-3 left-3 bg-white/80 backdrop-blur-sm px-2.5 py-1 rounded-lg text-[10px] font-mono text-[#102122] shadow-sm">
                    47.6062&deg; N, 122.3321&deg; W
                  </div>
                  <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded text-[9px] font-bold text-primary flex items-center gap-1">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    LIVE
                  </div>
                </div>

                {/* Check-in log */}
                <div className="space-y-3">
                  {checkInLog.map((entry) => (
                    <div key={entry.name} className="flex items-center gap-3">
                      <div
                        className={`w-2 h-2 rounded-full flex-shrink-0 ${
                          entry.active ? 'bg-primary' : 'bg-gray-300'
                        }`}
                      />
                      <div className="flex-1">
                        <span className="text-sm font-medium text-[#102122]">
                          {entry.name}
                        </span>
                      </div>
                      <span className="text-xs text-gray-500">
                        {entry.time}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Vault & Approval Detail */}
            <ScrollReveal delay={100}>
              <div className="space-y-6 h-full flex flex-col">
                {/* Vault card */}
                <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
                      <span
                        className="material-symbols-outlined text-primary"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        account_balance_wallet
                      </span>
                    </div>
                    <div>
                      <h3 className="font-extrabold text-[#102122] text-lg">
                        Project Vault
                      </h3>
                      <p className="text-xs text-gray-500">
                        Escrow-protected financial dashboard
                      </p>
                    </div>
                  </div>

                  <div className="flex justify-between items-end mb-3">
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 font-bold">
                      Total Disbursed
                    </span>
                    <span className="text-2xl font-extrabold text-[#102122]">
                      $1,245,000
                    </span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden flex gap-[2px] mb-2">
                    <div className="h-full bg-primary w-[65%] rounded-full" />
                    <div className="h-full bg-primary/30 w-[15%] rounded-full" />
                  </div>
                  <div className="flex justify-between mb-4">
                    <span className="text-xs text-gray-500">
                      Phase 1 Complete
                    </span>
                    <span className="text-xs font-bold text-primary">
                      80% Utilization
                    </span>
                  </div>

                  <div className="p-3 bg-[#f6f8f8] rounded-xl flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary">
                      verified_user
                    </span>
                    <div className="text-sm leading-snug">
                      <span className="font-bold text-[#102122] block">
                        Escrow Secured
                      </span>
                      <span className="text-gray-500 text-xs">
                        Milestone 3 funds held in LocalPro Vault
                      </span>
                    </div>
                  </div>
                </div>

                {/* Approval card */}
                <div className="bg-white rounded-2xl p-8 border-t-4 border-primary shadow-sm flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-0.5 bg-primary/10 text-primary rounded text-[9px] font-black uppercase tracking-widest">
                      Urgent
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-gray-500 font-bold">
                      Milestone 2
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-[#102122] mb-1">
                    Foundation Concrete Pour
                  </h3>
                  <p className="text-sm text-gray-500 mb-6">
                    Structural inspection signed off. Contractor awaiting fund
                    release.
                  </p>
                  <div className="bg-primary text-white py-3 rounded-xl font-bold text-sm text-center flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-lg">
                      payments
                    </span>
                    Review Proof &amp; Release
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 4.5 — ADDENDUM & CHANGE ORDERS
          Browser frame showing the change-order approval workflow
          ================================================================ */}
      <section className="bg-white py-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-xs font-bold text-primary uppercase tracking-widest">
                Change Orders
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#102122] mt-4 tracking-tight">
                Handle the Unexpected
              </h2>
              <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
                When unforeseen conditions arise on site, LocalPro documents
                everything &mdash; GPS evidence, cost impact, and escrow funding
                &mdash; so both parties can resolve addendums with full transparency.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
              {/* Browser chrome */}
              <div className="bg-[#e7e8e9] px-4 py-3 flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="flex-1 flex justify-center">
                  <div className="bg-white/70 rounded-full px-6 py-1 text-[11px] text-gray-500 font-medium">
                    app.renonext.com/local-pro/vault/addendum/LP-77241
                  </div>
                </div>
              </div>

              {/* App body */}
              <div className="bg-[#f8f9fa] flex min-h-[580px]">
                {/* Sidebar */}
                <div className="hidden lg:flex flex-col w-48 bg-[#f3f4f5] p-3 border-r border-gray-200/30">
                  <div className="px-3 py-4 mb-3">
                    <h3 className="text-xs font-black text-[#102122]">
                      Project Control
                    </h3>
                    <p className="text-[7px] uppercase tracking-widest text-gray-500 font-semibold">
                      Precision Management
                    </p>
                  </div>
                  <div className="space-y-0.5 flex-1">
                    {[
                      { icon: 'dashboard', label: 'Dashboard', active: false },
                      { icon: 'construction', label: 'Active Sites', active: true },
                      { icon: 'payments', label: 'Financials', active: false },
                      { icon: 'folder_shared', label: 'Documents', active: false },
                      { icon: 'history', label: 'Archive', active: false },
                    ].map((item) => (
                      <div
                        key={item.label}
                        className={`flex items-center gap-2 px-3 py-2 rounded-md text-[10px] ${
                          item.active
                            ? 'bg-white text-primary font-bold shadow-sm'
                            : 'text-gray-500'
                        }`}
                      >
                        <span className="material-symbols-outlined text-sm">
                          {item.icon}
                        </span>
                        {item.label}
                      </div>
                    ))}
                  </div>
                  <div className="mt-auto pt-4 border-t border-gray-200 space-y-0.5">
                    <div className="flex items-center gap-2 px-3 py-1.5 text-[10px] text-gray-500">
                      <span className="material-symbols-outlined text-xs">
                        help_center
                      </span>
                      Support
                    </div>
                    <div className="flex items-center gap-2 px-3 py-1.5 text-[10px] text-gray-500">
                      <span className="material-symbols-outlined text-xs">
                        logout
                      </span>
                      Sign Out
                    </div>
                  </div>
                </div>

                {/* Main content */}
                <div className="flex-1 flex flex-col">
                  {/* Top nav bar */}
                  <div className="px-5 py-3 flex justify-between items-center border-b border-gray-100">
                    <div className="flex items-center gap-6">
                      <span className="text-base font-bold text-[#102122] tracking-tight">
                        LocalPro
                      </span>
                      <div className="hidden md:flex gap-4">
                        <span className="text-xs text-gray-500">Projects</span>
                        <span className="text-xs text-gray-500">Schedule</span>
                        <span className="text-xs font-semibold text-primary border-b-2 border-primary pb-0.5">
                          Vault
                        </span>
                        <span className="text-xs text-gray-500">Teams</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-gray-400 text-lg">
                        notifications
                      </span>
                      <span className="material-symbols-outlined text-gray-400 text-lg">
                        settings
                      </span>
                      <div className="w-7 h-7 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-[8px] font-bold text-primary">
                          MT
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Page content */}
                  <div className="p-5 space-y-5 flex-1">
                    {/* Blueprint grid bg */}
                    <div className="relative">
                      {/* Alert Banner */}
                      <div className="bg-red-50 border border-red-200/60 text-red-800 p-3.5 rounded-xl flex items-center gap-3">
                        <div className="bg-red-500 text-white p-1.5 rounded-lg shrink-0">
                          <span className="material-symbols-outlined text-sm">
                            warning
                          </span>
                        </div>
                        <div>
                          <h3 className="text-xs font-bold">
                            Addendum Requested: Unforeseen Site Condition
                          </h3>
                          <p className="text-[10px] opacity-80">
                            Project ID: #LP-77241-EAST &bull; Priority: High
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bento grid */}
                    <div className="grid grid-cols-12 gap-5">
                      {/* ── Left: Visual Evidence (7 col) ── */}
                      <div className="col-span-12 lg:col-span-7">
                        <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100">
                          {/* Photo with metadata overlays */}
                          <div className="aspect-video w-full relative bg-gradient-to-br from-amber-200 via-amber-100 to-amber-200 overflow-hidden">
                            {/* Construction scene pattern */}
                            <div
                              className="absolute inset-0 opacity-15"
                              style={{
                                backgroundImage:
                                  'repeating-linear-gradient(45deg, transparent, transparent 12px, rgba(0,0,0,0.04) 12px, rgba(0,0,0,0.04) 24px)',
                              }}
                            />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="material-symbols-outlined text-amber-400/40 text-8xl">
                                construction
                              </span>
                            </div>
                            {/* GPS + Time overlays */}
                            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
                              <div className="bg-black/70 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-xs">
                                  location_on
                                </span>
                                <span className="text-[8px] uppercase tracking-widest">
                                  40.7128&deg; N, 74.0060&deg; W (GPS Verified)
                                </span>
                              </div>
                              <div className="bg-black/70 backdrop-blur-sm text-white px-2.5 py-1 rounded-lg flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-xs">
                                  schedule
                                </span>
                                <span className="text-[8px] uppercase tracking-widest">
                                  Oct 24, 2023 - 09:42 AM EST
                                </span>
                              </div>
                            </div>
                          </div>
                          {/* Pro Insight */}
                          <div className="p-4">
                            <div className="flex items-start gap-3">
                              <div className="w-9 h-9 rounded-full bg-primary/20 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-primary text-sm">
                                  person
                                </span>
                              </div>
                              <div>
                                <h4 className="text-xs font-bold text-primary mb-1">
                                  Pro Insight
                                </h4>
                                <p className="text-[11px] text-[#102122] leading-relaxed italic">
                                  &ldquo;Hit an unexpected buried slab while digging the
                                  east wall. Need a breaker to remove it before we can
                                  proceed with foundation forms.&rdquo;
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* ── Right: Financial & Actions (5 col) ── */}
                      <div className="col-span-12 lg:col-span-5 space-y-4">
                        {/* Financial Breakdown */}
                        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
                          <h4 className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-4">
                            Financial Impact
                          </h4>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-gray-400 text-sm">
                                  construction
                                </span>
                                <span className="text-[11px] text-[#102122]">
                                  Machine Breaker Rental (4 hrs)
                                </span>
                              </div>
                              <span className="text-xs font-bold text-[#102122]">
                                $850.00
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <span className="material-symbols-outlined text-gray-400 text-sm">
                                  delete_sweep
                                </span>
                                <span className="text-[11px] text-[#102122]">
                                  Disposal Bin Swap
                                </span>
                              </div>
                              <span className="text-xs font-bold text-[#102122]">
                                $400.00
                              </span>
                            </div>
                            <div className="pt-3 border-t border-gray-100 flex justify-between items-end">
                              <span className="text-[10px] uppercase tracking-widest text-primary font-bold">
                                Total Change Order
                              </span>
                              <span className="text-2xl font-extrabold text-primary">
                                $1,250.00
                              </span>
                            </div>
                          </div>
                          {/* Comparison */}
                          <div className="mt-5 p-3 bg-[#f3f4f5] rounded-lg space-y-1.5">
                            <div className="flex justify-between text-[9px] uppercase tracking-widest text-gray-500">
                              <span>Original Contract</span>
                              <span>$65,000.00</span>
                            </div>
                            <div className="flex justify-between text-xs font-bold text-[#102122]">
                              <span>New Contract Total</span>
                              <span>$66,250.00</span>
                            </div>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="space-y-2">
                          <div className="bg-primary text-white py-3 rounded-xl font-bold text-xs text-center flex items-center justify-center gap-2 shadow-md">
                            <span
                              className="material-symbols-outlined text-sm"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              account_balance_wallet
                            </span>
                            Approve &amp; Fund $1,250 to Escrow
                          </div>
                          <div className="border border-red-200 text-red-600 py-3 rounded-xl font-bold text-xs text-center flex items-center justify-center gap-2">
                            <span className="material-symbols-outlined text-sm">
                              gavel
                            </span>
                            Reject &amp; Request Mediation
                          </div>
                          <p className="text-center text-[8px] text-gray-400 leading-tight px-2">
                            Approving instantly updates the contract and allows work to
                            resume. Funds held in secure escrow until milestone
                            verification.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Footer meta */}
                    <div className="pt-4 flex flex-col md:flex-row justify-between items-center border-t border-gray-200/30 gap-3">
                      <div className="flex items-center gap-5">
                        <div>
                          <span className="text-[8px] uppercase tracking-widest text-gray-500 font-bold block">
                            Review Deadline
                          </span>
                          <span className="text-[11px] font-bold text-[#102122]">
                            22 Oct 2023, 5:00 PM
                          </span>
                        </div>
                        <div className="w-px h-6 bg-gray-200" />
                        <div>
                          <span className="text-[8px] uppercase tracking-widest text-gray-500 font-bold block">
                            Verified Inspector
                          </span>
                          <span className="text-[11px] font-bold text-[#102122] flex items-center gap-1">
                            James R.
                            <span
                              className="material-symbols-outlined text-primary text-xs"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              verified
                            </span>
                          </span>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <span className="text-[8px] uppercase tracking-widest text-gray-400 flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">
                            print
                          </span>
                          Print Proof
                        </span>
                        <span className="text-[8px] uppercase tracking-widest text-gray-400 flex items-center gap-1">
                          <span className="material-symbols-outlined text-xs">
                            download
                          </span>
                          Download PDF
                        </span>
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
          SECTION 5 — CTA
          Dark CTA with trust badges
          ================================================================ */}
      <section className="bg-[#102122] py-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <ScrollReveal>
            <span
              className="material-symbols-outlined text-primary text-5xl mb-6 inline-block"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              dashboard
            </span>

            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mt-4">
              Take Control of
              <br />
              Every Project
            </h2>

            <p className="text-gray-400 mt-6 max-w-xl mx-auto text-lg">
              GPS attendance. Photo compliance. Escrow vault. Team management.
              One dashboard for your entire operation.
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
                { icon: 'verified_user', label: 'Escrow Protected' },
                { icon: 'photo_camera', label: 'Photo Compliance' },
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
