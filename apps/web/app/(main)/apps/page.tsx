import type { Metadata } from 'next';
import Link from 'next/link';
import { apps } from '@/lib/data/apps';

export const metadata: Metadata = {
  title: 'RenoNext in Your Pocket — Mobile Apps for Homeowners & Contractors',
  description:
    'Manage your entire renovation from anywhere. Dedicated mobile experiences for homeowners and professional contractors, unified by trust and escrow protection.',
};

export default function AppsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ═══════════════════════════════════════════════════════════════
          Section 1 — Hero: RenoNext in Your Pocket
      ═══════════════════════════════════════════════════════════════ */}
      <header className="relative pt-24 pb-20 md:pt-32 md:pb-28 px-6 overflow-hidden bg-[#f6f8f8]">
        {/* Glow effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2 pointer-events-none" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative">
          {/* Left: Copy */}
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 rounded-full">
              <span
                className="material-symbols-outlined text-primary text-sm"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                stars
              </span>
              <span className="text-xs font-bold text-primary uppercase tracking-wider">
                Now Available
              </span>
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-reno-dark leading-[1.05]">
              RenoNext in Your{' '}
              <span className="text-primary">Pocket</span>
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed max-w-lg">
              Manage your entire renovation from anywhere. Dedicated
              experiences for homeowners and professional contractors, unified
              by trust.
            </p>

            {/* App Store Buttons */}
            <div className="flex flex-wrap gap-4">
              <button className="bg-reno-dark text-white flex items-center gap-3 px-6 py-3 rounded-xl shadow-float hover:shadow-float-hover hover:-translate-y-0.5 transition-all duration-300">
                <span className="material-symbols-outlined text-3xl">
                  phone_iphone
                </span>
                <div className="text-left">
                  <div className="text-[10px] uppercase leading-none opacity-70">
                    Download on the
                  </div>
                  <div className="text-lg font-semibold leading-none">
                    App Store
                  </div>
                </div>
              </button>
              <button className="bg-reno-dark text-white flex items-center gap-3 px-6 py-3 rounded-xl shadow-float hover:shadow-float-hover hover:-translate-y-0.5 transition-all duration-300">
                <span className="material-symbols-outlined text-3xl">
                  shop
                </span>
                <div className="text-left">
                  <div className="text-[10px] uppercase leading-none opacity-70">
                    Get it on
                  </div>
                  <div className="text-lg font-semibold leading-none">
                    Google Play
                  </div>
                </div>
              </button>
            </div>
          </div>

          {/* Right: Dual Phone Mockups */}
          <div className="relative flex justify-center lg:justify-end gap-6 md:gap-10">
            {/* Homeowner Phone */}
            <div className="relative w-56 md:w-64 aspect-[9/19] bg-reno-dark rounded-[2.5rem] p-3 shadow-2xl -rotate-[4deg] translate-y-8">
              <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden relative">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-reno-dark rounded-b-2xl z-10" />

                <div className="relative p-4 pt-8 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                      Homeowner
                    </span>
                    <span className="material-symbols-outlined text-gray-400 text-sm">
                      notifications
                    </span>
                  </div>

                  {/* Escrow balance card */}
                  <div className="p-3 bg-[#f6f8f8] rounded-xl border border-primary/5">
                    <div className="text-[10px] text-gray-500">
                      Escrow Balance
                    </div>
                    <div className="text-lg font-bold text-primary">
                      $45,000.00
                    </div>
                  </div>

                  {/* Milestones */}
                  <div className="space-y-2">
                    <div className="text-[10px] font-bold text-reno-dark uppercase tracking-wider">
                      Milestones
                    </div>
                    <div className="flex gap-2">
                      <div className="h-1.5 bg-primary rounded-full flex-1" />
                      <div className="h-1.5 bg-primary rounded-full flex-1" />
                      <div className="h-1.5 bg-gray-200 rounded-full flex-1" />
                    </div>
                    <div className="flex justify-between text-[8px] text-gray-400">
                      <span>Demo</span>
                      <span>Rough-in</span>
                      <span>Final</span>
                    </div>
                  </div>

                  {/* Quick actions */}
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-primary/5 rounded-lg p-2 text-center">
                      <span className="material-symbols-outlined text-primary text-sm block">
                        photo_camera
                      </span>
                      <span className="text-[8px] font-medium text-reno-dark">
                        Photos
                      </span>
                    </div>
                    <div className="bg-primary/5 rounded-lg p-2 text-center">
                      <span className="material-symbols-outlined text-primary text-sm block">
                        chat
                      </span>
                      <span className="text-[8px] font-medium text-reno-dark">
                        Chat
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contractor Phone */}
            <div className="relative w-56 md:w-64 aspect-[9/19] bg-reno-dark rounded-[2.5rem] p-3 shadow-2xl rotate-[4deg]">
              <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden relative">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-reno-dark rounded-b-2xl z-10" />

                <div className="relative p-4 pt-8 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-[#E8AA42] uppercase tracking-wider">
                      Contractor
                    </span>
                    <span className="material-symbols-outlined text-gray-400 text-sm">
                      person
                    </span>
                  </div>

                  {/* Active bids card */}
                  <div className="p-3 bg-[#f6f8f8] rounded-xl border border-primary/5">
                    <div className="text-[10px] text-gray-500">Active Bids</div>
                    <div className="text-lg font-bold text-reno-dark">
                      12 Projects
                    </div>
                  </div>

                  {/* Schedule */}
                  <div className="space-y-2">
                    <div className="text-[10px] font-bold text-reno-dark uppercase tracking-wider">
                      Schedule
                    </div>
                    <div className="bg-[#E8AA42]/10 p-2.5 rounded-lg border-l-2 border-[#E8AA42]">
                      <div className="text-[8px] font-bold text-reno-dark">
                        Site Visit: 10:00 AM
                      </div>
                      <div className="text-[7px] text-gray-500">
                        42 Oak Street — Kitchen Reno
                      </div>
                    </div>
                    <div className="bg-primary/5 p-2.5 rounded-lg border-l-2 border-primary">
                      <div className="text-[8px] font-bold text-reno-dark">
                        Milestone Review: 2:00 PM
                      </div>
                      <div className="text-[7px] text-gray-500">
                        18 Elm Ave — Foundation
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════
          Obsidian Sentinel Featured Banner
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-12 px-6 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto">
          <Link href="/apps/sentinel" className="group block">
            <div className="relative overflow-hidden bg-reno-dark rounded-2xl p-8 md:p-10 shadow-float hover:shadow-float-hover hover:-translate-y-1 transition-all duration-300">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span
                    className="material-symbols-outlined text-primary text-2xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    security
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display text-2xl font-bold text-white group-hover:text-primary transition-colors">
                      Obsidian Sentinel
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider">
                      Featured
                    </span>
                  </div>
                  <p className="text-gray-400 leading-relaxed max-w-xl">
                    Construction Intelligence Platform — 11 integrated modules for site briefing, budgets, safety, documents, and more.
                  </p>
                </div>
                <span className="material-symbols-outlined text-primary text-2xl group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          The Proof Featured Banner
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-6 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <Link href="/apps/the-proof" className="group block">
            <div className="relative overflow-hidden bg-white rounded-2xl p-8 md:p-10 border border-gray-200 shadow-float hover:shadow-float-hover hover:-translate-y-1 transition-all duration-300">
              <div
                className="absolute inset-0 pointer-events-none opacity-[0.06]"
                style={{
                  backgroundImage: 'radial-gradient(circle, #94a3b8 1px, transparent 1px)',
                  backgroundSize: '32px 32px',
                }}
              />
              <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span
                    className="material-symbols-outlined text-primary text-2xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified_user
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display text-2xl font-bold text-reno-dark group-hover:text-primary transition-colors">
                      The Proof
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                      Verification
                    </span>
                  </div>
                  <p className="text-gray-500 leading-relaxed max-w-xl">
                    Immutable Verification Ledger — GPS-stamped, time-locked, cryptographically secured proof for every delivery and inspection.
                  </p>
                </div>
                <span className="material-symbols-outlined text-primary text-2xl group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          LocalPro Featured Banner
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-6 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <Link href="/apps/local-pro" className="group block">
            <div className="relative overflow-hidden bg-[#f6f8f8] rounded-2xl p-8 md:p-10 border border-primary/10 shadow-float hover:shadow-float-hover hover:-translate-y-1 transition-all duration-300">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/8 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span
                    className="material-symbols-outlined text-primary text-2xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    location_on
                  </span>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-display text-2xl font-bold text-reno-dark group-hover:text-primary transition-colors">
                      LocalPro
                    </h3>
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-[10px] font-bold uppercase tracking-wider">
                      Field Ops
                    </span>
                  </div>
                  <p className="text-gray-500 leading-relaxed max-w-xl">
                    Project Control Platform — GPS check-in, photo compliance logs, escrow vault, and team management in one dashboard.
                  </p>
                </div>
                <span className="material-symbols-outlined text-primary text-2xl group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          Section 2 — Homeowner Experience (Bento Grid)
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6 bg-[#f6f8f8]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-14">
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-reno-dark mb-4">
              Homeowner Experience
            </h2>
            <div className="w-20 h-1.5 bg-primary rounded-full" />
          </div>

          <div className="grid md:grid-cols-12 gap-5">
            {/* Large Feature Card — Smart Escrow */}
            <div className="md:col-span-8 bg-white p-8 md:p-10 rounded-[2rem] shadow-float hover:-translate-y-1 hover:shadow-float-hover transition-all duration-300 relative overflow-hidden min-h-[360px] flex flex-col justify-between">
              <div className="relative z-10 max-w-md">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                  <span
                    className="material-symbols-outlined text-primary text-2xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    account_balance
                  </span>
                </div>
                <h3 className="font-display text-2xl md:text-3xl font-bold text-reno-dark mb-4">
                  Smart Escrow Protection
                </h3>
                <p className="text-gray-500 text-lg leading-relaxed">
                  Your funds are protected. Payments are only released when you
                  sign off on completed milestones, ensuring peace of mind
                  throughout the build.
                </p>
              </div>
              {/* Ghost watermark */}
              <div className="absolute right-6 bottom-6 opacity-[0.04] pointer-events-none">
                <span className="material-symbols-outlined text-[180px] text-reno-dark">
                  shield
                </span>
              </div>
            </div>

            {/* Milestone Tracking — Accent Card */}
            <div className="md:col-span-4 bg-primary text-white p-8 md:p-10 rounded-[2rem] shadow-float flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                  <span
                    className="material-symbols-outlined text-2xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    distance
                  </span>
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  Milestone Tracking
                </h3>
                <p className="text-white/80 leading-relaxed">
                  Real-time visual progress from foundation to finishes.
                </p>
              </div>
              <div className="mt-8 pt-6 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-sm"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                  </div>
                  <span className="text-sm font-medium">
                    Auto-verification
                  </span>
                </div>
              </div>
            </div>

            {/* Three Feature Pills */}
            {[
              {
                icon: 'chat',
                title: 'Instant Chat',
                desc: 'Talk to your pro',
              },
              {
                icon: 'description',
                title: 'Document Vault',
                desc: 'Store all permits',
              },
              {
                icon: 'photo_camera',
                title: 'Photo Logs',
                desc: 'Daily site updates',
              },
            ].map((item) => (
              <div
                key={item.icon}
                className="md:col-span-4 bg-white p-6 md:p-7 rounded-[2rem] border border-primary/5 flex items-center gap-5 hover:-translate-y-0.5 hover:shadow-float transition-all duration-300"
              >
                <div className="w-14 h-14 bg-[#f6f8f8] rounded-full flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-primary text-xl">
                    {item.icon}
                  </span>
                </div>
                <div>
                  <h4 className="font-bold text-reno-dark">{item.title}</h4>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          Section 3 — Contractor Suite
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6 relative overflow-hidden">
        {/* Subtle skew bg */}
        <div className="absolute inset-0 bg-white pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-full bg-primary/[0.02] -skew-y-3 origin-top-right pointer-events-none" />

        <div className="max-w-7xl mx-auto relative">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-14 gap-6">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-reno-dark mb-4">
                Contractor Suite
              </h2>
              <p className="text-gray-500 text-lg max-w-xl leading-relaxed">
                Scale your business with automated workflows that handle the
                heavy lifting of project management.
              </p>
            </div>
            <div className="flex gap-1 bg-[#f6f8f8] p-1 rounded-xl">
              <span className="px-5 py-2 bg-white rounded-lg shadow-sm font-bold text-sm text-reno-dark">
                Dashboard
              </span>
              <span className="px-5 py-2 text-gray-500 font-medium text-sm">
                Bidding
              </span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Layered Card Illustration */}
            <div className="relative aspect-square max-w-lg mx-auto w-full">
              {/* Back card — Active Projects (dark) */}
              <div className="absolute top-0 left-0 w-4/5 h-4/5 bg-reno-dark rounded-[2rem] p-6 shadow-2xl z-20">
                <div className="space-y-5">
                  <div className="flex justify-between items-center text-white">
                    <h4 className="font-bold">Active Projects</h4>
                    <span className="material-symbols-outlined text-gray-500">
                      add
                    </span>
                  </div>

                  {/* Project 1 */}
                  <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                    <div className="flex justify-between mb-2">
                      <span className="text-xs text-white font-medium">
                        Modern Kitchen Reno
                      </span>
                      <span className="text-xs text-primary font-bold">
                        85%
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full">
                      <div
                        className="h-full bg-primary rounded-full"
                        style={{ width: '85%' }}
                      />
                    </div>
                  </div>

                  {/* Project 2 */}
                  <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                    <div className="flex justify-between mb-2">
                      <span className="text-xs text-white font-medium">
                        Oak Street Addition
                      </span>
                      <span className="text-xs text-[#E8AA42] font-bold">
                        30%
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-white/10 rounded-full">
                      <div
                        className="h-full bg-[#E8AA42] rounded-full"
                        style={{ width: '30%' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Front card — Revenue (primary) */}
              <div className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-primary rounded-[2rem] p-8 shadow-2xl z-10 flex items-end">
                <div className="text-white">
                  <div className="text-4xl md:text-5xl font-extrabold tracking-tight">
                    $124k
                  </div>
                  <div className="text-white/70 mt-1">Projected Revenue</div>
                </div>
              </div>
            </div>

            {/* Right: Feature List */}
            <div className="space-y-10">
              {[
                {
                  icon: 'gavel',
                  title: 'Simplified Bidding',
                  desc: 'Generate professional estimates in minutes. RenoNext uses local market data to help you bid competitively and accurately.',
                },
                {
                  icon: 'assignment_turned_in',
                  title: 'Milestone Management',
                  desc: 'Submit photo proof for milestones and get paid immediately upon approval. No more chasing clients for checks.',
                },
                {
                  icon: 'analytics',
                  title: 'Business Insights',
                  desc: 'Track profit margins per job and optimize your team\'s performance with deep analytics tools.',
                },
              ].map((feature) => (
                <div key={feature.icon} className="group flex gap-5">
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary transition-colors duration-300">
                    <span
                      className="material-symbols-outlined text-primary group-hover:text-white text-xl transition-colors duration-300"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {feature.icon}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-reno-dark mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          Section 4 — App Suite Grid (links to individual app pages)
      ═══════════════════════════════════════════════════════════════ */}
      {apps.length > 0 && (
        <section className="py-20 md:py-28 px-6 bg-[#f6f8f8]">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-xs mb-4">
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  apps
                </span>
                Full Suite
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-reno-dark mb-3">
                Purpose-Built Tools
              </h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                Five apps for field crews, project managers, and office teams.
                Offline-first, GPS-verified, built for construction.
              </p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {apps.map((app) => (
                <Link
                  key={app.slug}
                  href={`/apps/${app.slug}`}
                  className="group"
                >
                  <div className="h-full bg-white rounded-2xl border border-primary/5 shadow-float p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-float-hover">
                    {/* Top stripe */}
                    <div
                      className={`h-1 w-12 rounded-full bg-gradient-to-r ${app.color} mb-5`}
                    />

                    <h3 className="font-display text-xl font-bold text-reno-dark group-hover:text-primary transition-colors mb-1.5">
                      {app.name}
                    </h3>
                    <p className="text-sm text-gray-500 mb-4">
                      {app.tagline}
                    </p>

                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#f6f8f8] text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-4">
                      {app.audienceLabel}
                    </span>

                    <p className="text-sm text-gray-600 leading-relaxed mb-5">
                      {app.description}
                    </p>

                    {/* Feature highlights */}
                    <div className="space-y-2">
                      {app.features.slice(0, 3).map((feature, idx) => (
                        <div key={idx} className="flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                          <span className="text-xs text-gray-500">
                            {feature.title}
                          </span>
                        </div>
                      ))}
                    </div>

                    <span className="mt-5 inline-flex items-center gap-1 text-sm font-bold text-primary">
                      Learn more
                      <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">
                        arrow_forward
                      </span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          Section 5 — Why RenoNext Apps (4-card grid)
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-reno-dark mb-3">
              Why RenoNext Apps
            </h2>
            <p className="text-gray-500 text-lg max-w-2xl mx-auto">
              Purpose-built software for construction teams who work in the
              field, not just at a desk.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: 'wifi_off',
                title: 'Offline-First',
                desc: 'Works on remote job sites with no signal. Data syncs automatically when connectivity returns.',
              },
              {
                icon: 'location_on',
                title: 'GPS-Verified',
                desc: 'Location proof on every action. Geofenced check-ins and site-specific data ensure accountability.',
              },
              {
                icon: 'hub',
                title: 'One Ecosystem',
                desc: 'All apps share data through the RenoNext platform. One login, one project database, zero duplicate entry.',
              },
              {
                icon: 'engineering',
                title: 'Built for Gloves',
                desc: 'Designed for field conditions, not office chairs. Large touch targets, simple workflows, and fast input.',
              },
            ].map((item) => (
              <div
                key={item.icon}
                className="bg-white rounded-2xl border border-primary/5 shadow-float p-7 hover:-translate-y-1 hover:shadow-float-hover transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
                  <span
                    className="material-symbols-outlined text-primary text-xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {item.icon}
                  </span>
                </div>
                <h3 className="font-display text-lg font-bold text-reno-dark mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          Section 6 — Final CTA (Dark)
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 bg-reno-dark overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
            Ready to transform your workflow?
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
            Join over 10,000 homeowners and contractors building the future of
            home renovation on RenoNext.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/start-project"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-primary text-white font-bold text-lg rounded-2xl shadow-float hover:-translate-y-1 hover:shadow-float-hover transition-all duration-300"
            >
              Get Started Free
              <span className="material-symbols-outlined text-xl">
                arrow_forward
              </span>
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-lg rounded-2xl hover:bg-white/20 transition-all duration-300"
            >
              Book a Demo
            </Link>
          </div>

          {/* Trust row */}
          <div className="mt-12 flex items-center justify-center gap-6 text-gray-600">
            {[
              { icon: 'verified_user', label: 'Escrow Protected' },
              { icon: 'wifi_off', label: 'Offline-First' },
              { icon: 'location_on', label: 'GPS-Verified' },
            ].map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-1.5 text-xs font-medium"
              >
                <span className="material-symbols-outlined text-primary/60 text-sm">
                  {badge.icon}
                </span>
                {badge.label}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
