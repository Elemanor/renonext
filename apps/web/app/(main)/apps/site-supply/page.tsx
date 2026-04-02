import { Metadata } from 'next';
import Link from 'next/link';
import {
  siteSupplyModules,
  expectedDeliveries,
  inTransitItems,
  pendingRequests,
  rentalAssets,
  heroStats,
  dailyBurnRate,
  deliveryStatusConfig,
  requestStatusConfig,
  rentalStatusConfig,
} from '@/lib/data/site-supply';
import { ScrollReveal } from '@/components/sentinel/scroll-reveal';
import { Section } from '@/components/ui/section';
import { SectionHeader } from '@/components/ui/section-header';
import { PageHero } from '@/components/ui/page-hero';

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title: 'SiteSupply | Supply Chain Command Center | RenoNext',
  description:
    'Delivery tracking, material requests, rental management, and inventory control — one platform for construction logistics.',
  alternates: {
    canonical: '/apps/site-supply',
  },
  openGraph: {
    title: 'SiteSupply — Supply Chain Command Center',
    description: 'Real-time logistics visibility for construction teams.',
    type: 'website',
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function formatCurrency(n: number): string {
  return '$' + n.toLocaleString('en-CA');
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function SiteSupplyPage() {
  return (
    <div className="min-h-screen">
      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 1 — HERO
      ═══════════════════════════════════════════════════════════════════ */}
      <header className="relative overflow-hidden bg-reno-dark pt-20 pb-20 md:pt-28 md:pb-28 px-6">
        {/* Glow effects — orange tinted */}
        <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/4 w-[700px] h-[700px] bg-[#FF6B00]/8 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-[500px] h-[500px] bg-[#FFDB3C]/6 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
          {/* Left — Copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-[#FF6B00]/10 px-3 py-1 rounded-full text-[#FF6B00] text-xs font-bold tracking-widest uppercase mb-6">
              <span
                className="material-symbols-outlined text-xs"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                warehouse
              </span>
              Supply Chain Command
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05] mb-4">
              Site
              <span className="text-[#FF6B00]">Supply</span>
            </h1>

            <p className="text-xl md:text-2xl text-slate-300 leading-relaxed mb-4 max-w-xl">
              Your supply chain command center. Deliveries, materials, rentals,
              and equipment — unified.
            </p>

            <p className="text-base text-slate-400 leading-relaxed mb-8 max-w-xl">
              When a concrete truck is delayed or a rental is overdue, every
              minute costs money. SiteSupply gives you real-time visibility
              across deliveries, requests, and rentals from one dashboard.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF6B00] text-white font-bold rounded-xl shadow-lg hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(255,107,0,0.25)] transition-all duration-300"
              >
                Request Early Access
                <span className="material-symbols-outlined text-lg">
                  arrow_forward
                </span>
              </Link>
              <Link
                href="#deliveries"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 text-white font-bold rounded-xl border border-white/10 hover:border-[#FF6B00]/40 hover:bg-white/10 transition-all duration-300"
              >
                See It in Action
                <span className="material-symbols-outlined text-lg">
                  expand_more
                </span>
              </Link>
            </div>

            {/* Hero Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
              {heroStats.map((stat, i) => (
                <div key={i}>
                  <p className="text-2xl md:text-3xl font-bold text-white mb-0.5">
                    {stat.value}
                  </p>
                  <p className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Phone Mockup: Delivery Tracking */}
          <div className="relative hidden lg:block">
            <div className="relative z-20 mx-auto max-w-[280px]">
              {/* Phone frame */}
              <div className="bg-[#121212] rounded-[2.5rem] p-3 border-2 border-white/[0.06] shadow-2xl">
                <div className="bg-[#131313] rounded-[2rem] overflow-hidden">
                  {/* Notch */}
                  <div className="flex justify-center pt-3 pb-2">
                    <div className="w-24 h-5 bg-[#1F2020] rounded-full" />
                  </div>

                  {/* App header */}
                  <div className="px-4 pb-2">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="bg-[#FF6B00] p-1.5 rounded-none">
                        <span
                          className="material-symbols-outlined text-black text-xs"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          warehouse
                        </span>
                      </div>
                      <div>
                        <p className="text-white text-[10px] font-bold tracking-wide">
                          SITESUPPLY
                        </p>
                        <p className="text-[7px] text-[#E4E2E1]/60">
                          Shift 1 — Day Crew
                        </p>
                      </div>
                    </div>

                    {/* Quick stats row */}
                    <div className="flex gap-2 mb-3">
                      <div className="flex-1 bg-[#1F2020] rounded-none p-1.5 border border-[#2A2A2A]">
                        <p className="text-[7px] text-[#E4E2E1]/50 uppercase tracking-wider">
                          Scheduled
                        </p>
                        <p className="text-[11px] text-white font-bold">12</p>
                      </div>
                      <div className="flex-1 bg-[#1F2020] rounded-none p-1.5 border border-[#ef4444]/30">
                        <p className="text-[7px] text-[#FFB4AB]/70 uppercase tracking-wider">
                          Delayed
                        </p>
                        <p className="text-[11px] text-[#FFB4AB] font-bold">2</p>
                      </div>
                    </div>
                  </div>

                  {/* Mini delivery card (critical) */}
                  <div className="px-4 pb-3">
                    <div className="bg-[#1F2020] rounded-none p-2.5 border-l-2 border-[#ef4444]">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[8px] font-bold text-white tracking-wide">
                          DEL-1047
                        </span>
                        <span className="text-[7px] font-bold text-[#FFB4AB] bg-[#ef4444]/15 px-1.5 py-0.5 rounded-none border border-[#ef4444]/30">
                          CRITICAL DELAY
                        </span>
                      </div>
                      <p className="text-[9px] text-white font-medium mb-0.5">
                        Pre-cast Concrete Panels
                      </p>
                      <p className="text-[7px] text-[#E4E2E1]/60 mb-2">
                        TITAN LOGISTICS
                      </p>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[7px] text-[#E4E2E1]/50">
                          ETA 10:45 AM
                        </span>
                        <span className="text-[7px] font-bold text-[#FFB4AB]">
                          +45 MIN
                        </span>
                      </div>
                      <div className="h-1 bg-[#2A2A2A] rounded-none overflow-hidden">
                        <div
                          className="h-full bg-[#ef4444]"
                          style={{ width: '62%' }}
                        />
                      </div>
                    </div>

                    {/* QR scan hint */}
                    <div className="mt-3 flex items-center justify-end">
                      <div className="bg-[#FF6B00] rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
                        <span
                          className="material-symbols-outlined text-black text-sm"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          qr_code_scanner
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom nav */}
                  <div className="bg-[#0a0a0a] border-t border-[#2A2A2A] px-4 py-2">
                    <div className="flex justify-between">
                      {[
                        { icon: 'inventory_2', label: 'Inventory' },
                        { icon: 'local_shipping', label: 'Deliveries', active: true },
                        { icon: 'order_approve', label: 'Requests' },
                        { icon: 'precision_manufacturing', label: 'Rentals' },
                      ].map((tab) => (
                        <div key={tab.label} className="text-center">
                          <span
                            className={`material-symbols-outlined text-xs ${
                              tab.active ? 'text-[#FF6B00]' : 'text-[#555]'
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
                              tab.active ? 'text-[#FF6B00]' : 'text-[#555]'
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
                  className="material-symbols-outlined text-[#FF6B00] text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  local_atm
                </span>
                <div>
                  <p className="text-[9px] text-white font-bold">$4.8K/day</p>
                  <p className="text-[7px] text-slate-500">Rental Burn</p>
                </div>
              </div>
            </div>

            <div className="absolute -right-6 bottom-1/3 z-30 bg-[#1c1c1c] rounded-xl p-3 border border-white/[0.06] shadow-lg animate-float-in-2">
              <div className="flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-[#FFDB3C] text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  location_on
                </span>
                <div>
                  <p className="text-[9px] text-white font-bold">GPS Tracked</p>
                  <p className="text-[7px] text-slate-500">All Deliveries</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 2 — DELIVERIES
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="deliveries" className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left — Copy */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B00]/10 text-[#FF6B00] font-semibold text-sm mb-5">
                  <span
                    className="material-symbols-outlined text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    local_shipping
                  </span>
                  Delivery Tracking
                </div>

                <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-reno-dark leading-[1.1] mb-4">
                  Know Where Every{' '}
                  <span className="text-[#FF6B00]">Truck Is</span>
                </h2>

                <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-lg">
                  Live GPS tracking for all inbound deliveries with ETAs, delay
                  alerts, and compliance logging. Critical shipments get
                  auto-escalated when windows slip.
                </p>

                <ul className="space-y-4">
                  {siteSupplyModules[0].features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#FF6B00]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span
                          className="material-symbols-outlined text-[#FF6B00] text-base"
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

              {/* Right — Browser Mockup: Deliveries Dashboard */}
              <div>
                {/* Browser chrome bar */}
                <div className="bg-[#1F2020] rounded-t-xl px-4 py-2.5 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  </div>
                  <div className="flex-1 bg-[#131313] rounded px-3 py-0.5 text-[10px] text-[#E4E2E1]/60 font-mono">
                    app.sitesupply.com/deliveries
                  </div>
                </div>

                {/* Browser content */}
                <div className="bg-[#131313] rounded-b-xl p-6 shadow-float">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <p className="text-[10px] text-[#E4E2E1]/60 uppercase tracking-wider font-bold mb-0.5">
                        Expected Today
                      </p>
                      <div className="flex items-center gap-2">
                        <span className="text-[9px] font-bold text-[#FF6B00] bg-[#FF6B00]/15 px-2 py-0.5 rounded-none border border-[#FF6B00]/30">
                          3 ACTIVE SHIFTS
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    {expectedDeliveries.map((del) => {
                      const statusConfig = deliveryStatusConfig[del.status];
                      return (
                        <div
                          key={del.id}
                          className="bg-[#1F2020] rounded-none p-3 border-l-2"
                          style={{ borderLeftColor: statusConfig.borderColor }}
                        >
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-xs font-bold text-white tracking-wide">
                              {del.id}
                            </span>
                            <span
                              className="text-[9px] font-bold px-2 py-0.5 rounded-none border"
                              style={{
                                color: statusConfig.color,
                                backgroundColor: statusConfig.bgColor,
                                borderColor: statusConfig.borderColor,
                              }}
                            >
                              {statusConfig.label}
                            </span>
                          </div>
                          <p className="text-sm text-white font-medium mb-0.5">
                            {del.material}
                          </p>
                          <p className="text-[10px] text-[#E4E2E1]/60 mb-2">
                            {del.supplier}
                          </p>
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="text-[10px] text-[#E4E2E1]/50">
                              ETA {del.eta}
                            </span>
                            {del.delayMinutes && (
                              <span className="text-[10px] font-bold text-[#FFB4AB]">
                                +{del.delayMinutes} MIN
                              </span>
                            )}
                          </div>
                          <div className="h-1.5 bg-[#2A2A2A] rounded-none overflow-hidden">
                            <div
                              className="h-full"
                              style={{
                                width: `${del.progress}%`,
                                backgroundColor: statusConfig.borderColor,
                              }}
                            />
                          </div>
                          {del.complianceNote && (
                            <p className="text-[9px] text-[#FFDB3C] mt-2 bg-[#FFDB3C]/10 px-2 py-1 rounded-none border border-[#FFDB3C]/30">
                              {del.complianceNote}
                            </p>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* In-Transit sidebar */}
                  <div className="bg-[#1F2020] rounded-none p-3 border border-[#2A2A2A]">
                    <p className="text-[10px] text-[#E4E2E1]/60 uppercase tracking-wider font-bold mb-2">
                      In-Transit
                    </p>
                    {/* GPS placeholder */}
                    <div className="bg-[#2A2A2A] rounded-lg p-4 mb-3 flex items-center justify-center">
                      <span
                        className="material-symbols-outlined text-[#555] text-2xl"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        map
                      </span>
                    </div>
                    <div className="space-y-2">
                      {inTransitItems.map((item) => (
                        <div
                          key={item.id}
                          className="bg-[#2A2A2A] rounded-none p-2"
                        >
                          <p className="text-[9px] text-white font-medium mb-0.5">
                            {item.material}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-[8px] text-[#E4E2E1]/50">
                              {item.distance}
                            </span>
                            <span className="text-[8px] text-[#FFDB3C] font-bold">
                              ETA {item.eta}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 3 — MATERIAL REQUESTS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6 bg-[#f6f8f8]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left — Tablet Mockup: Material Request Form */}
              <div className="relative">
                {/* Tablet frame */}
                <div className="bg-[#1a1a1a] rounded-[1.5rem] p-3 border-2 border-white/[0.08] shadow-2xl">
                  <div className="bg-[#131313] rounded-[1rem] overflow-hidden">
                    {/* Header */}
                    <div className="px-5 py-4 border-b border-[#2A2A2A]">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[9px] font-bold text-[#FF6B00] bg-[#FF6B00]/15 px-2 py-0.5 rounded-none border border-[#FF6B00]/30">
                          NEW ENTRY
                        </span>
                      </div>
                      <h3 className="text-lg text-white font-bold tracking-wide mb-1">
                        MATERIAL REQUEST
                      </h3>
                      <p className="text-[10px] text-[#E4E2E1]/60">
                        PRJ-2024-0847 • Mar 20, 2026 @ 09:15
                      </p>
                    </div>

                    {/* Form bento grid */}
                    <div className="p-5 space-y-4">
                      {/* Material dropdown */}
                      <div className="bg-[#1F2020] rounded-none p-3 border border-[#2A2A2A]">
                        <label className="text-[8px] text-[#E4E2E1]/50 uppercase tracking-wider font-bold block mb-1.5">
                          Material
                        </label>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-white font-medium">
                            Reinforcement Steel Rebar 16mm
                          </span>
                          <span className="material-symbols-outlined text-[#555] text-base">
                            expand_more
                          </span>
                        </div>
                      </div>

                      {/* Quantity */}
                      <div className="bg-[#1F2020] rounded-none p-3 border border-[#2A2A2A]">
                        <label className="text-[8px] text-[#E4E2E1]/50 uppercase tracking-wider font-bold block mb-1.5">
                          Quantity
                        </label>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl text-white font-bold">
                            150
                          </span>
                          <span className="text-[10px] text-[#E4E2E1]/60 font-medium">
                            UNIT
                          </span>
                        </div>
                      </div>

                      {/* Zone selector */}
                      <div>
                        <label className="text-[8px] text-[#E4E2E1]/50 uppercase tracking-wider font-bold block mb-2">
                          Delivery Zone
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {['Zone A — Foundation', 'Zone B — Framing', 'Zone C — Formwork', 'Zone D — MEP'].map(
                            (zone, i) => (
                              <button
                                key={zone}
                                className={`py-2.5 px-3 rounded-none text-[10px] font-bold transition-colors ${
                                  i === 0
                                    ? 'bg-[#FF6B00] text-white border border-[#FF6B00]'
                                    : 'bg-[#1F2020] text-[#E4E2E1]/60 border border-[#2A2A2A] hover:border-[#555]'
                                }`}
                              >
                                {zone}
                              </button>
                            )
                          )}
                        </div>
                      </div>

                      {/* Priority toggle */}
                      <div>
                        <label className="text-[8px] text-[#E4E2E1]/50 uppercase tracking-wider font-bold block mb-2">
                          Priority
                        </label>
                        <div className="flex gap-2">
                          <button className="flex-1 py-2.5 px-3 rounded-none text-[10px] font-bold bg-[#1F2020] text-[#E4E2E1]/60 border border-[#2A2A2A]">
                            STANDARD
                          </button>
                          <button className="flex-1 py-2.5 px-3 rounded-none text-[10px] font-bold bg-[#ef4444] text-white border border-[#ef4444]">
                            URGENT
                          </button>
                        </div>
                      </div>

                      {/* Submit button */}
                      <button className="w-full bg-gradient-to-r from-[#FF6B00] to-[#E67E22] rounded-none py-3.5 flex items-center justify-center gap-2 shadow-lg">
                        <span className="text-xs text-white font-extrabold uppercase tracking-wide">
                          Authorize Material Request
                        </span>
                        <span className="material-symbols-outlined text-white text-base">
                          arrow_forward
                        </span>
                      </button>
                    </div>

                    {/* Pending requests table */}
                    <div className="px-5 pb-5">
                      <p className="text-[9px] text-[#E4E2E1]/60 uppercase tracking-wider font-bold mb-2">
                        Pending Requests
                      </p>
                      <div className="bg-[#1F2020] rounded-none border border-[#2A2A2A] overflow-hidden">
                        {/* Table header */}
                        <div className="grid grid-cols-[1fr,2fr,1fr] gap-2 px-3 py-1.5 bg-[#2A2A2A] border-b border-[#353535]">
                          <span className="text-[8px] text-[#E4E2E1]/50 uppercase tracking-wider font-bold">
                            Request
                          </span>
                          <span className="text-[8px] text-[#E4E2E1]/50 uppercase tracking-wider font-bold">
                            Material
                          </span>
                          <span className="text-[8px] text-[#E4E2E1]/50 uppercase tracking-wider font-bold">
                            Status
                          </span>
                        </div>
                        {/* Table rows */}
                        {pendingRequests.map((req) => {
                          const statusConfig = requestStatusConfig[req.status];
                          return (
                            <div
                              key={req.id}
                              className="grid grid-cols-[1fr,2fr,1fr] gap-2 px-3 py-2 border-b border-[#2A2A2A] last:border-b-0"
                            >
                              <span className="text-[9px] text-white font-medium">
                                {req.id}
                              </span>
                              <span className="text-[9px] text-[#E4E2E1]/80">
                                {req.material}
                              </span>
                              <span
                                className="text-[8px] font-bold px-1.5 py-0.5 rounded-none border self-start"
                                style={{
                                  color: statusConfig.color,
                                  backgroundColor: statusConfig.bg,
                                  borderColor: statusConfig.color + '40',
                                }}
                              >
                                {statusConfig.label}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right — Copy */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B00]/10 text-[#FF6B00] font-semibold text-sm mb-5">
                  <span
                    className="material-symbols-outlined text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    order_approve
                  </span>
                  Material Requests
                </div>

                <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-reno-dark leading-[1.1] mb-4">
                  Request Materials{' '}
                  <span className="text-[#FF6B00]">From the Field</span>
                </h2>

                <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-lg">
                  Field crews submit material requests by zone and priority.
                  Approval workflows route through PMs and procurement
                  automatically.
                </p>

                <ul className="space-y-4">
                  {siteSupplyModules[1].features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#FF6B00]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span
                          className="material-symbols-outlined text-[#FF6B00] text-base"
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
          SECTION 4 — RENTALS & ASSETS
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left — Copy */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF6B00]/10 text-[#FF6B00] font-semibold text-sm mb-5">
                  <span
                    className="material-symbols-outlined text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    precision_manufacturing
                  </span>
                  Rental Management
                </div>

                <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-reno-dark leading-[1.1] mb-4">
                  Every Dollar of{' '}
                  <span className="text-[#FF6B00]">Rental Burn</span> Tracked
                </h2>

                <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-lg">
                  Track daily rental costs, return deadlines, and utilization
                  across sites. Never overpay for idle equipment again.
                </p>

                <ul className="space-y-4">
                  {siteSupplyModules[2].features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#FF6B00]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span
                          className="material-symbols-outlined text-[#FF6B00] text-base"
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

              {/* Right — Browser Mockup: Rentals Dashboard */}
              <div>
                {/* Browser chrome bar */}
                <div className="bg-[#1F2020] rounded-t-xl px-4 py-2.5 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                    <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                  </div>
                  <div className="flex-1 bg-[#131313] rounded px-3 py-0.5 text-[10px] text-[#E4E2E1]/60 font-mono">
                    app.sitesupply.com/rentals
                  </div>
                </div>

                {/* Browser content */}
                <div className="bg-[#131313] rounded-b-xl p-6 shadow-float">
                  {/* Alert banner with safety stripe */}
                  <div className="bg-[#1F2020] rounded-none mb-5 flex items-center gap-3 p-3 border border-[#FFDB3C]/30 relative overflow-hidden">
                    {/* Safety stripe accent */}
                    <div
                      className="absolute left-0 top-0 bottom-0 w-1"
                      style={{
                        background:
                          'repeating-linear-gradient(45deg, #ffdb3c, #ffdb3c 10px, #131313 10px, #131313 20px)',
                      }}
                    />
                    <span
                      className="material-symbols-outlined text-[#FFDB3C] text-lg ml-3"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      warning
                    </span>
                    <span className="text-xs text-white font-bold">
                      3 RENTALS DUE WITHIN 48H
                    </span>
                  </div>

                  {/* Daily burn rate */}
                  <div className="bg-[#1F2020] rounded-none p-4 mb-5 border border-[#2A2A2A]">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-3xl font-bold text-[#FF6B00]">
                        {formatCurrency(dailyBurnRate)}
                      </span>
                      <span className="text-sm text-[#E4E2E1]/60 font-medium">
                        /DAY
                      </span>
                    </div>
                    <p className="text-[9px] text-[#E4E2E1]/50 uppercase tracking-wider font-bold">
                      Daily Burn Rate
                    </p>
                  </div>

                  {/* Search bar */}
                  <div className="bg-[#1F2020] rounded-none p-2.5 mb-4 border border-[#2A2A2A] flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#555] text-base">
                      search
                    </span>
                    <input
                      type="text"
                      placeholder="Search rentals..."
                      className="bg-transparent text-sm text-white placeholder:text-[#555] outline-none flex-1"
                      disabled
                    />
                  </div>

                  {/* Asset cards */}
                  <div className="space-y-3">
                    {rentalAssets.map((asset) => {
                      const statusConfig = rentalStatusConfig[asset.status];
                      return (
                        <div
                          key={asset.assetId}
                          className="bg-[#1F2020] rounded-none p-3 border border-[#2A2A2A]"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-[9px] text-[#E4E2E1]/60 font-mono">
                                  {asset.assetId}
                                </span>
                                <span
                                  className="text-[8px] font-bold px-1.5 py-0.5 rounded-none border"
                                  style={{
                                    color: statusConfig.color,
                                    backgroundColor: statusConfig.bg,
                                    borderColor: statusConfig.color + '40',
                                  }}
                                >
                                  {statusConfig.label}
                                </span>
                              </div>
                              <p className="text-sm text-white font-medium mb-0.5">
                                {asset.name}
                              </p>
                              <p className="text-[10px] text-[#E4E2E1]/60 mb-1">
                                {asset.provider}
                              </p>
                              <div className="flex items-center gap-3 text-[9px] text-[#E4E2E1]/50">
                                <span>Return: {asset.returnDate}</span>
                                <span>•</span>
                                <span>{asset.zone}</span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-lg font-bold text-[#FF6B00]">
                                {formatCurrency(asset.dailyCost)}
                              </p>
                              <p className="text-[8px] text-[#E4E2E1]/60">
                                per day
                              </p>
                            </div>
                          </div>
                          <div className="flex gap-2 mt-2">
                            <button className="flex items-center gap-1 px-2 py-1 bg-[#2A2A2A] rounded-none text-[9px] text-[#E4E2E1]/60 hover:text-white transition-colors">
                              <span className="material-symbols-outlined text-xs">
                                edit
                              </span>
                              Edit
                            </button>
                            <button className="flex items-center gap-1 px-2 py-1 bg-[#2A2A2A] rounded-none text-[9px] text-[#E4E2E1]/60 hover:text-white transition-colors">
                              <span className="material-symbols-outlined text-xs">
                                history
                              </span>
                              History
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 5 — MODULE GRID
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6 bg-[#f6f8f8]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16">
              <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-reno-dark mb-4">
                6 Integrated Modules
              </h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                End-to-end supply chain visibility from one platform. Deliveries,
                requests, rentals, inventory, dispatch, and analytics.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {siteSupplyModules.map((module, i) => (
                <div
                  key={module.id}
                  className="bg-white rounded-2xl p-6 shadow-float hover:shadow-float-hover transition-shadow duration-300"
                >
                  <div className="w-14 h-14 rounded-xl bg-[#FF6B00]/10 flex items-center justify-center mb-4">
                    <span
                      className="material-symbols-outlined text-[#FF6B00] text-2xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {module.icon}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-bold text-reno-dark mb-2">
                    {module.name}
                  </h3>
                  <p className="text-sm text-slate-500 mb-4">{module.tagline}</p>
                  <ul className="space-y-2">
                    {module.features.slice(0, 4).map((feature, fi) => (
                      <li
                        key={fi}
                        className="flex items-start gap-2 text-sm text-slate-600"
                      >
                        <span className="material-symbols-outlined text-[#FF6B00] text-base mt-0.5 flex-shrink-0">
                          check_circle
                        </span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 6 — CTA
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6 bg-[#0a0a0a] relative overflow-hidden">
        {/* Glow effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#FF6B00]/8 rounded-full blur-[180px] pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <ScrollReveal>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1] mb-4">
              Stop Losing Materials to{' '}
              <span className="text-[#FF6B00]">Chaos</span>
            </h2>
            <p className="text-xl text-slate-400 leading-relaxed mb-10 max-w-2xl mx-auto">
              Get real-time visibility across your entire supply chain.
              Deliveries, materials, rentals, and equipment — unified in one
              command center.
            </p>

            <div className="flex flex-wrap gap-4 justify-center mb-12">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#FF6B00] text-white font-bold rounded-xl shadow-lg hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(255,107,0,0.25)] transition-all duration-300"
              >
                Request Early Access
                <span className="material-symbols-outlined text-lg">
                  arrow_forward
                </span>
              </Link>
              <Link
                href="/apps"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 text-white font-bold rounded-xl border border-white/10 hover:border-[#FF6B00]/40 hover:bg-white/10 transition-all duration-300"
              >
                View All Apps
                <span className="material-symbols-outlined text-lg">
                  apps
                </span>
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap justify-center gap-6 text-slate-500 text-sm">
              {[
                { icon: 'apps', label: '6 Modules' },
                { icon: 'location_on', label: 'GPS Tracked' },
                { icon: 'wifi_off', label: 'Offline-First' },
                { icon: 'notifications_active', label: 'Real-Time Alerts' },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2"
                >
                  <span
                    className="material-symbols-outlined text-[#FF6B00] text-base"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {badge.icon}
                  </span>
                  <span>{badge.label}</span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
