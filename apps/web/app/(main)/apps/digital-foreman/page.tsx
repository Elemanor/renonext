import { Metadata } from 'next';
import Link from 'next/link';
import {
  foremanModules,
  recentDeliveries,
  dailyStats,
  verificationSpecs,
  verificationMetrics,
  invoiceItems,
  fiscalSummary,
  receiptLines,
  receiptTotals,
  heroStats,
  statusStyles,
} from '@/lib/data/digital-foreman';
import { ScrollReveal } from '@/components/sentinel/scroll-reveal';
import { AnimatedStatsRow } from '@/components/sentinel/animated-stats';

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title: 'Digital Foreman | GPS-Verified Material Tracking | RenoNext',
  description:
    'Log deliveries in under 60 seconds. GPS-stamped photo verification, material compliance checks, and automated billing for construction sites.',
  alternates: {
    canonical: '/apps/digital-foreman',
  },
  openGraph: {
    title: 'Digital Foreman — GPS-Verified Material Tracking',
    description:
      'Photo-verified delivery logging, material compliance, and automated invoicing.',
    type: 'website',
  },
};

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function formatCurrency(n: number): string {
  return '$' + n.toLocaleString('en-CA', { minimumFractionDigits: 2 });
}

// Navy palette — matches mockup primary #002547
const navy = {
  900: '#002547',
  800: '#1b3b5f',
  700: '#2a486d',
  600: '#426086',
  100: '#d3e4ff',
  50: '#f7f9fc',
};

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function DigitalForemanPage() {
  return (
    <div className="min-h-screen">
      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 1 — HERO
      ═══════════════════════════════════════════════════════════════════ */}
      <header className="relative overflow-hidden bg-[#002547] pt-20 pb-20 md:pt-28 md:pb-28 px-6">
        <div className="absolute top-0 right-0 -translate-y-1/3 translate-x-1/4 w-[700px] h-[700px] bg-[#d3e4ff]/8 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/3 -translate-x-1/4 w-[500px] h-[500px] bg-[#97f3e2]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative z-10">
          {/* Left — Copy */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full text-[#abc8f4] text-xs font-bold tracking-widest uppercase mb-6">
              <span
                className="material-symbols-outlined text-xs"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                fact_check
              </span>
              GPS-Verified Material Tracking
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05] mb-4">
              Digital{' '}
              <span className="text-[#abc8f4]">Foreman</span>
            </h1>

            <p className="text-xl md:text-2xl text-[#abc8f4]/80 leading-relaxed mb-4 max-w-xl">
              Log deliveries in under 60 seconds. GPS-stamped. Photo-verified.
              Compliance-checked.
            </p>

            <p className="text-base text-primary-200/50 leading-relaxed mb-8 max-w-xl">
              When the trucks are rolling, your foreman needs to log fast — not
              fill out paper forms back at the trailer. Digital Foreman captures
              material type, quantity, supplier, GPS coordinates, and photo proof
              in one screen.
            </p>

            <div className="flex flex-wrap gap-4 mb-10">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#002547] font-bold rounded-xl shadow-lg hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(171,200,244,0.25)] transition-all duration-300"
              >
                Request Early Access
                <span className="material-symbols-outlined text-lg">
                  arrow_forward
                </span>
              </Link>
              <Link
                href="#material-entry"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 text-white font-bold rounded-xl border border-white/10 hover:border-[#abc8f4]/40 hover:bg-white/10 transition-all duration-300"
              >
                See It in Action
                <span className="material-symbols-outlined text-lg">
                  expand_more
                </span>
              </Link>
            </div>

            <AnimatedStatsRow stats={heroStats} />
          </div>

          {/* Right — Phone Mockup: New Material Entry */}
          <div className="relative hidden lg:block">
            <div className="relative z-20 mx-auto max-w-[280px]">
              <div className="bg-[#1b3b5f] rounded-[2.5rem] p-3 border-2 border-white/[0.08] shadow-2xl">
                <div className="bg-[#f7f9fc] rounded-[2rem] overflow-hidden">
                  {/* Notch */}
                  <div className="flex justify-center pt-3 pb-2 bg-[#f2f4f7]">
                    <div className="w-24 h-5 bg-[#e0e3e6] rounded-full" />
                  </div>

                  {/* App header */}
                  <div className="px-4 py-2 bg-[#f2f4f7] flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[#002547] text-sm">
                        menu
                      </span>
                      <span className="text-[10px] font-extrabold text-[#002547] uppercase tracking-tighter">
                        Digital Foreman
                      </span>
                    </div>
                    <div className="w-5 h-5 rounded-full bg-[#1b3b5f] flex items-center justify-center">
                      <span className="text-[6px] font-bold text-white">JD</span>
                    </div>
                  </div>

                  {/* Form content */}
                  <div className="px-4 py-3 space-y-2.5">
                    <h2 className="text-[11px] font-extrabold text-[#002547] tracking-tight">
                      New Delivery Entry
                    </h2>
                    <div className="flex items-center gap-1 bg-[#cfe6f2]/30 px-2 py-1 rounded-sm">
                      <span
                        className="material-symbols-outlined text-[#4c616c] text-[8px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        gps_fixed
                      </span>
                      <span className="text-[6px] font-medium text-[#526772] uppercase tracking-wide">
                        Auto-capture: 40.7128° N, 74.0060° W
                      </span>
                    </div>

                    {/* Material type */}
                    <div className="bg-[#f2f4f7] p-2.5 rounded-sm border-l-2 border-[#002547]">
                      <p className="text-[6px] font-bold text-[#191c1e] uppercase tracking-wider mb-1">
                        Material Type
                      </p>
                      <p className="text-[9px] font-bold text-[#002547]">
                        Structural Steel (Grade 50)
                      </p>
                    </div>

                    {/* Quantity + Truck */}
                    <div className="grid grid-cols-2 gap-1.5">
                      <div className="bg-[#f2f4f7] p-2.5 rounded-sm">
                        <p className="text-[6px] font-bold text-[#191c1e] uppercase tracking-wider mb-1">
                          Quantity
                        </p>
                        <p className="text-[12px] font-extrabold text-[#002547]">
                          14.5{' '}
                          <span className="text-[7px] font-bold text-[#002547]">
                            TONS
                          </span>
                        </p>
                      </div>
                      <div className="bg-[#f2f4f7] p-2.5 rounded-sm">
                        <p className="text-[6px] font-bold text-[#191c1e] uppercase tracking-wider mb-1">
                          Truck ID
                        </p>
                        <div className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[#73777f] text-[8px]">
                            local_shipping
                          </span>
                          <p className="text-[10px] font-extrabold text-[#002547]">
                            TX-9902
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Photo capture */}
                    <div className="bg-[#f2f4f7] p-3 rounded-sm border-2 border-dashed border-[#c3c6cf] text-center">
                      <span
                        className="material-symbols-outlined text-[#002547] text-lg"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        add_a_photo
                      </span>
                      <p className="text-[7px] font-bold text-[#002547] mt-0.5">
                        Capture Proof of Delivery
                      </p>
                    </div>

                    {/* Submit */}
                    <div className="bg-[#002547] rounded-sm py-2 text-center">
                      <span className="text-[7px] text-white font-extrabold uppercase tracking-widest">
                        Finalize &amp; Record Entry
                      </span>
                    </div>
                  </div>

                  {/* Bottom nav */}
                  <div className="bg-white/80 border-t border-slate-200 px-4 py-2">
                    <div className="flex justify-between">
                      {[
                        { icon: 'inventory', label: 'Log', active: false },
                        { icon: 'fact_check', label: 'Verify', active: false },
                        { icon: 'add_a_photo', label: 'New Entry', active: true },
                        { icon: 'receipt_long', label: 'Billing', active: false },
                      ].map((tab) => (
                        <div key={tab.label} className="text-center">
                          <span
                            className={`material-symbols-outlined text-xs ${
                              tab.active ? 'text-[#002547]' : 'text-slate-400'
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
                            className={`text-[6px] font-medium ${
                              tab.active ? 'text-[#002547]' : 'text-slate-400'
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
            <div className="absolute -left-8 top-1/4 z-30 bg-white rounded-xl p-3 border border-slate-100 shadow-lg animate-float-in-1">
              <div className="flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-[#002547] text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  gps_fixed
                </span>
                <div>
                  <p className="text-[9px] text-[#002547] font-bold">GPS Auto-Capture</p>
                  <p className="text-[7px] text-slate-500">Every entry geotagged</p>
                </div>
              </div>
            </div>

            <div className="absolute -right-6 bottom-1/3 z-30 bg-white rounded-xl p-3 border border-slate-100 shadow-lg animate-float-in-2">
              <div className="flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-reno-green-600 text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
                <div>
                  <p className="text-[9px] text-[#002547] font-bold">SHA-256 Hash</p>
                  <p className="text-[7px] text-slate-500">Tamper-proof records</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 2 — MATERIAL ENTRY
      ═══════════════════════════════════════════════════════════════════ */}
      <section id="material-entry" className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left — Copy */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#002547]/5 text-[#002547] font-semibold text-sm mb-5">
                  <span
                    className="material-symbols-outlined text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    add_a_photo
                  </span>
                  Material Entry
                </div>

                <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-reno-dark leading-[1.1] mb-4">
                  Log Deliveries in{' '}
                  <span className="text-[#002547]">Under 60 Seconds</span>
                </h2>

                <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-lg">
                  One screen. Material type, quantity, truck ID, photo proof —
                  GPS coordinates and timestamp captured automatically. No paper
                  forms, no back-at-the-trailer data entry.
                </p>

                <ul className="space-y-4">
                  {foremanModules[0].features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#002547]/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span
                          className="material-symbols-outlined text-[#002547] text-base"
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

              {/* Right — Entry Form Mockup */}
              <div className="bg-[#f7f9fc] rounded-2xl border border-slate-100 p-5 md:p-6 shadow-float">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider font-bold">
                      New Delivery Entry
                    </p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <span
                        className="material-symbols-outlined text-[#4c616c] text-xs"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        gps_fixed
                      </span>
                      <span className="text-[10px] text-[#526772] font-medium uppercase tracking-wide">
                        Auto-capture: 40.7128° N, 74.0060° W
                      </span>
                    </div>
                  </div>
                </div>

                {/* Material type */}
                <div className="bg-white p-5 rounded-xl border-l-4 border-[#002547] mb-4">
                  <p className="text-[9px] text-slate-500 uppercase tracking-wider font-bold mb-2">
                    Material Type
                  </p>
                  <p className="text-lg font-extrabold text-[#002547]">
                    Structural Steel (Grade 50)
                  </p>
                </div>

                {/* Quantity + Truck ID */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-white p-5 rounded-xl">
                    <p className="text-[9px] text-slate-500 uppercase tracking-wider font-bold mb-2">
                      Quantity
                    </p>
                    <p className="text-2xl font-extrabold text-[#002547]">
                      14.5{' '}
                      <span className="text-sm font-bold text-[#002547]/70">
                        TONS
                      </span>
                    </p>
                  </div>
                  <div className="bg-white p-5 rounded-xl">
                    <p className="text-[9px] text-slate-500 uppercase tracking-wider font-bold mb-2">
                      Truck ID
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-slate-400">
                        local_shipping
                      </span>
                      <p className="text-2xl font-extrabold text-[#002547]">
                        TX-9902
                      </p>
                    </div>
                  </div>
                </div>

                {/* Photo capture area */}
                <div className="bg-white p-6 rounded-xl border-2 border-dashed border-slate-200 text-center mb-4">
                  <div className="w-14 h-14 rounded-full bg-[#002547]/5 flex items-center justify-center mx-auto mb-3">
                    <span
                      className="material-symbols-outlined text-[#002547] text-2xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      add_a_photo
                    </span>
                  </div>
                  <p className="text-sm font-bold text-[#002547]">
                    Capture Proof of Delivery
                  </p>
                  <p className="text-xs text-slate-400 mt-1">
                    GPS-stamped verification photo
                  </p>
                </div>

                {/* Metadata */}
                <div className="flex justify-between p-3 bg-[#e6e8eb]/50 rounded-xl mb-4">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#4c616c] text-sm">
                      schedule
                    </span>
                    <div>
                      <p className="text-[8px] text-slate-400 uppercase font-bold">
                        Timestamp
                      </p>
                      <p className="text-[10px] font-bold text-[#002547]">
                        OCT 24, 2023 | 14:32:05 EST
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#4c616c] text-sm">
                      person_pin_circle
                    </span>
                    <div>
                      <p className="text-[8px] text-slate-400 uppercase font-bold">
                        Foreman
                      </p>
                      <p className="text-[10px] font-bold text-[#002547]">
                        J. Anderson (ID: 8821)
                      </p>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <div className="bg-[#002547] rounded-xl py-4 text-center flex items-center justify-center gap-2">
                  <span
                    className="material-symbols-outlined text-white text-lg"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    fact_check
                  </span>
                  <span className="text-sm text-white font-extrabold uppercase tracking-widest">
                    Finalize &amp; Record Entry
                  </span>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 3 — MATERIAL LOG
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6 bg-[#f7f9fc]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#002547]/5 text-[#002547] font-semibold text-sm mb-5">
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  inventory
                </span>
                Material Log
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-reno-dark leading-[1.1] mb-4">
                Every Delivery,{' '}
                <span className="text-[#002547]">Searchable &amp; Verified</span>
              </h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                Bento-style dashboard with daily intake statistics, featured
                entries, and a full searchable delivery log.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Featured entry (8-col) */}
            <ScrollReveal className="md:col-span-8" delay={100}>
              <div className="bg-white rounded-2xl overflow-hidden shadow-float border border-primary/5 flex flex-col md:flex-row h-full">
                {/* Image side */}
                <div className="md:w-1/2 relative h-48 md:h-auto bg-slate-100">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#002547]/20 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#002547]/20 text-[100px]">
                      inventory_2
                    </span>
                  </div>
                  <div className="absolute top-4 left-4">
                    <span className="bg-[#cfe6f2]/80 backdrop-blur-md text-[#526772] px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                      <span
                        className="material-symbols-outlined text-xs"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        verified
                      </span>
                      Verified
                    </span>
                  </div>
                </div>

                {/* Content side */}
                <div className="md:w-1/2 p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                        {recentDeliveries[0].ticketId}
                      </span>
                      <span className="text-[10px] font-mono text-slate-400">
                        {recentDeliveries[0].date} {recentDeliveries[0].time}
                      </span>
                    </div>
                    <h3 className="text-2xl font-extrabold text-[#002547] uppercase tracking-tight mb-4">
                      {recentDeliveries[0].material}
                    </h3>
                    <div className="space-y-2.5">
                      <div className="flex justify-between items-center border-b border-slate-100 py-1.5">
                        <span className="text-xs text-slate-500">Quantity</span>
                        <span className="text-sm font-bold text-[#002547]">
                          {recentDeliveries[0].quantity} {recentDeliveries[0].unit}
                        </span>
                      </div>
                      <div className="flex justify-between items-center border-b border-slate-100 py-1.5">
                        <span className="text-xs text-slate-500">Supplier</span>
                        <span className="text-sm font-bold text-[#002547] uppercase">
                          {recentDeliveries[0].supplier}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 flex items-center gap-2">
                    <span className="material-symbols-outlined text-slate-400 text-sm">
                      location_on
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono uppercase tracking-tight">
                      LAT {recentDeliveries[0].lat}, LONG {recentDeliveries[0].lng}
                    </span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Daily stats (4-col) */}
            <ScrollReveal className="md:col-span-4" delay={200}>
              <div className="bg-[#002547] text-white rounded-2xl p-6 shadow-float h-full flex flex-col justify-between">
                <div>
                  <h3 className="font-bold text-[#abc8f4] text-sm mb-6">
                    Today&apos;s Intake
                  </h3>
                  <p className="text-4xl font-extrabold tracking-tight mb-1">
                    {dailyStats[0].value}
                  </p>
                  <p className="text-[10px] text-[#abc8f4] uppercase tracking-widest mb-6">
                    Total Tonnes Logged
                  </p>
                  <div className="flex gap-6">
                    <div>
                      <p className="text-xl font-bold">{dailyStats[1].value}</p>
                      <p className="text-[9px] text-[#abc8f4] uppercase">
                        Verified
                      </p>
                    </div>
                    <div className="opacity-50">
                      <p className="text-xl font-bold">{dailyStats[2].value}</p>
                      <p className="text-[9px] text-[#abc8f4] uppercase">
                        Pending
                      </p>
                    </div>
                  </div>
                </div>
                <button className="w-full bg-white text-[#002547] font-bold py-3 mt-6 rounded-lg text-sm uppercase tracking-wider">
                  Generate Daily Report
                </button>
              </div>
            </ScrollReveal>

            {/* Delivery list (12-col) */}
            <ScrollReveal className="md:col-span-12" delay={300}>
              <h3 className="font-bold text-[#002547] text-lg mb-4 mt-2">
                Recent Deliveries
              </h3>
              <div className="space-y-3">
                {recentDeliveries.slice(1).map((d) => {
                  const style = statusStyles[d.status];
                  return (
                    <div
                      key={d.ticketId}
                      className="bg-white rounded-xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 shadow-sm border border-slate-50 hover:shadow-float transition-all duration-300"
                    >
                      {/* Icon placeholder */}
                      <div className="w-16 h-16 bg-[#f2f4f7] rounded-lg flex items-center justify-center flex-shrink-0 border border-slate-100">
                        <span className="material-symbols-outlined text-[#002547]/30 text-2xl">
                          inventory_2
                        </span>
                      </div>
                      <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-3 items-center">
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase mb-0.5">
                            Material
                          </p>
                          <p className="text-sm font-bold text-[#002547] uppercase">
                            {d.material}
                          </p>
                        </div>
                        <div>
                          <p className="text-[10px] text-slate-400 font-bold uppercase mb-0.5">
                            Amount
                          </p>
                          <p className="text-sm font-bold text-reno-dark">
                            {d.quantity} {d.unit}
                          </p>
                        </div>
                        <div className="hidden md:block">
                          <p className="text-[10px] text-slate-400 font-bold uppercase mb-0.5">
                            Time
                          </p>
                          <p className="text-xs text-slate-500">
                            {d.time} &middot; {d.date}
                          </p>
                        </div>
                        <div className="flex justify-end">
                          <span
                            className={`${style.bg} ${style.text} px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1`}
                          >
                            <span
                              className="material-symbols-outlined text-xs"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              {style.icon}
                            </span>
                            {d.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 4 — VERIFICATION
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left — Verification mockup */}
              <div className="bg-[#f7f9fc] rounded-2xl border border-slate-100 p-5 md:p-6 shadow-float">
                {/* GPS photo card */}
                <div className="bg-white rounded-xl overflow-hidden mb-4 shadow-sm">
                  <div className="h-48 bg-gradient-to-br from-[#002547]/10 to-[#002547]/5 relative flex items-center justify-center">
                    <span className="material-symbols-outlined text-[#002547]/15 text-[80px]">
                      photo_camera
                    </span>
                    <div className="absolute top-4 right-4">
                      <span className="bg-[#cfe6f2]/80 backdrop-blur-md text-[#526772] px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                        <span
                          className="material-symbols-outlined text-xs"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          verified
                        </span>
                        Verified
                      </span>
                    </div>
                  </div>
                  <div className="p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-3">
                    <div>
                      <p className="text-[9px] text-slate-400 uppercase tracking-widest mb-1">
                        Geospatial Stamp
                      </p>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-extrabold text-[#002547] tracking-tight">
                          {verificationMetrics.gpsCoords}
                        </span>
                        <span className="w-px h-4 bg-slate-200" />
                        <span className="text-sm font-extrabold text-[#002547] tracking-tight">
                          {verificationMetrics.timestamp}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] text-slate-400 uppercase tracking-widest mb-1">
                        Asset Hash
                      </p>
                      <span className="text-xs text-slate-500 font-medium">
                        {verificationMetrics.assetHash}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Specs */}
                <div className="bg-white rounded-xl p-5 mb-4 shadow-sm">
                  <p className="text-[9px] text-slate-400 uppercase tracking-widest font-bold mb-4">
                    Material Specifications
                  </p>
                  <div className="space-y-3">
                    {verificationSpecs.map((s) => (
                      <div
                        key={s.label}
                        className="flex justify-between items-center"
                      >
                        <span className="text-sm text-slate-500">{s.label}</span>
                        <span className="font-bold text-[#002547]">{s.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-white rounded-xl p-5 shadow-sm text-center">
                    <p className="text-3xl font-extrabold text-[#002547] tracking-tight">
                      {verificationMetrics.netTonnage}
                    </p>
                    <p className="text-[10px] text-slate-400 uppercase">
                      Metric Tonnes
                    </p>
                  </div>
                  <div className="bg-white rounded-xl p-5 shadow-sm text-center">
                    <p className="text-3xl font-extrabold text-[#002547] tracking-tight">
                      {verificationMetrics.volume}
                    </p>
                    <p className="text-[10px] text-slate-400 uppercase">
                      Cubic Metres
                    </p>
                  </div>
                </div>

                {/* Compliance */}
                <div className="bg-[#00423a]/5 rounded-xl p-4 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-reno-green-50 flex items-center justify-center flex-shrink-0">
                    <span
                      className="material-symbols-outlined text-reno-green-600 text-sm"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#002547]">
                      {verificationMetrics.compliance}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">
                      {verificationMetrics.complianceNote}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right — Copy */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#002547]/5 text-[#002547] font-semibold text-sm mb-5">
                  <span
                    className="material-symbols-outlined text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    fact_check
                  </span>
                  Verification
                </div>

                <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-reno-dark leading-[1.1] mb-4">
                  GPS-Stamped Proof{' '}
                  <span className="text-[#002547]">You Can Trust</span>
                </h2>

                <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-lg">
                  Every delivery photo is geotagged, timestamped, and SHA-256 hashed.
                  Material specs are cross-checked against project blueprints for
                  automatic compliance verification.
                </p>

                <ul className="space-y-4">
                  {foremanModules[2].features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-xl bg-[#002547]/5 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span
                          className="material-symbols-outlined text-[#002547] text-base"
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
          SECTION 5 — BILLING
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6 bg-[#f7f9fc]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#002547]/5 text-[#002547] font-semibold text-sm mb-5">
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  receipt_long
                </span>
                Billing &amp; Invoicing
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-reno-dark leading-[1.1] mb-4">
                From Delivery to{' '}
                <span className="text-[#002547]">Invoice, Automated</span>
              </h2>
              <p className="text-lg text-slate-500 max-w-2xl mx-auto">
                Auto-generated invoices from verified deliveries, HST
                calculation, and fiscal period summaries.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid lg:grid-cols-12 gap-6">
            {/* Receipt card (5-col) */}
            <ScrollReveal className="lg:col-span-5" delay={100}>
              <div className="bg-white rounded-2xl shadow-float border border-slate-50 p-6 md:p-8">
                <div className="text-center border-b border-dashed border-slate-200 pb-6 mb-6">
                  <h3 className="font-extrabold text-xl text-[#002547] uppercase tracking-tight">
                    Invoice #DF-8829
                  </h3>
                  <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">
                    Authorized Digital Record
                  </p>
                </div>

                {/* Line items */}
                <div className="space-y-4 mb-6">
                  {receiptLines.map((line) => (
                    <div key={line.item} className="flex justify-between items-end">
                      <div>
                        <p className="text-sm font-bold text-[#002547] uppercase">
                          {line.item}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {line.detail}
                        </p>
                      </div>
                      <p className="font-bold text-[#002547]">
                        {formatCurrency(line.amount)}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Totals */}
                <div className="pt-4 border-t border-dashed border-slate-200 space-y-2 mb-6">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">Subtotal</span>
                    <span>{formatCurrency(receiptTotals.subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-500">
                      HST ({(receiptTotals.taxRate * 100).toFixed(0)}%)
                    </span>
                    <span>{formatCurrency(receiptTotals.tax)}</span>
                  </div>
                  <div className="flex justify-between items-center pt-2">
                    <span className="font-extrabold text-lg text-[#002547]">
                      Total Due
                    </span>
                    <span className="font-extrabold text-2xl text-[#002547]">
                      {formatCurrency(receiptTotals.total)}
                    </span>
                  </div>
                </div>

                {/* Barcode placeholder */}
                <div className="bg-[#002547] rounded-lg h-12 flex items-center justify-center mb-2">
                  <div className="flex gap-[2px]">
                    {[1, 3, 1, 2, 4, 1, 2, 1, 3, 1, 5, 1, 2, 1, 4, 2, 1, 3, 1, 1, 2, 3].map(
                      (w, i) => (
                        <div
                          key={i}
                          className="bg-white rounded-[0.5px]"
                          style={{ width: `${w}px`, height: '32px' }}
                        />
                      )
                    )}
                  </div>
                </div>
                <p className="text-center text-[9px] text-slate-400 tracking-widest">
                  002547 882900 139894
                </p>
              </div>
            </ScrollReveal>

            {/* Billing history (7-col) */}
            <ScrollReveal className="lg:col-span-7" delay={200}>
              <div className="space-y-6">
                <h3 className="font-bold text-[#002547] text-lg">
                  Billing History
                </h3>

                <div className="space-y-3">
                  {invoiceItems.map((inv) => {
                    const style = statusStyles[inv.status];
                    return (
                      <div
                        key={inv.invoiceId}
                        className="bg-white rounded-xl p-4 flex items-center justify-between shadow-sm border border-slate-50 hover:shadow-float transition-all duration-300"
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-10 h-10 rounded-lg ${style.bg} flex items-center justify-center`}
                          >
                            <span
                              className={`material-symbols-outlined ${style.text} text-lg`}
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              {style.icon}
                            </span>
                          </div>
                          <div>
                            <p className="font-bold text-[#002547]">
                              #{inv.invoiceId}
                            </p>
                            <p className="text-xs text-slate-400">
                              {inv.date} &middot; {inv.description}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-[#002547]">
                            {formatCurrency(inv.amount)}
                          </p>
                          <span
                            className={`${style.bg} ${style.text} text-[9px] font-bold uppercase tracking-widest px-2 py-0.5 rounded`}
                          >
                            {inv.status}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Fiscal summary */}
                <div className="bg-[#002547] rounded-2xl p-6 relative overflow-hidden">
                  <div className="relative z-10">
                    <p className="text-[10px] text-primary-200/60 uppercase tracking-widest mb-1">
                      Fiscal Summary — {fiscalSummary.month}
                    </p>
                    <p className="text-3xl font-extrabold text-white tracking-tight">
                      {formatCurrency(fiscalSummary.total)}
                    </p>
                    <div className="mt-4 flex gap-8">
                      <div>
                        <p className="text-[9px] text-primary-200/60 uppercase">
                          Paid Total
                        </p>
                        <p className="text-sm font-bold text-white">
                          {formatCurrency(fiscalSummary.paid)}
                        </p>
                      </div>
                      <div>
                        <p className="text-[9px] text-primary-200/60 uppercase">
                          Outstanding
                        </p>
                        <p className="text-sm font-bold text-white">
                          {formatCurrency(fiscalSummary.outstanding)}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute right-0 top-0 h-full w-1/4 opacity-5 flex gap-2">
                    <div className="w-1 bg-white" />
                    <div className="w-4 bg-white" />
                    <div className="w-2 bg-white" />
                    <div className="w-1 bg-white" />
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════
          SECTION 6 — CTA
      ═══════════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 bg-[#002547] overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_50%,rgba(171,200,244,0.1),transparent)] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <ScrollReveal>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
              Stop Losing Deliveries to{' '}
              <span className="text-[#abc8f4]">Paperwork</span>
            </h2>

            <p className="text-lg text-primary-200/60 leading-relaxed mb-10 max-w-2xl mx-auto">
              Digital Foreman gives your site crew GPS-verified material logging,
              automatic compliance checks, and invoice generation — all from one
              app that works offline.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-14">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#002547] font-bold rounded-xl shadow-lg hover:-translate-y-1 hover:shadow-[0_20px_40px_-10px_rgba(171,200,244,0.25)] transition-all duration-300"
              >
                Request Early Access
                <span className="material-symbols-outlined text-lg">
                  arrow_forward
                </span>
              </Link>
              <Link
                href="/apps"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/5 text-white font-bold rounded-xl border border-white/10 hover:border-[#abc8f4]/40 hover:bg-white/10 transition-all duration-300"
              >
                View All Apps
                <span className="material-symbols-outlined text-lg">
                  apps
                </span>
              </Link>
            </div>

            <div className="flex flex-wrap justify-center gap-6 md:gap-10">
              {[
                { icon: 'gps_fixed', label: 'GPS-Verified' },
                { icon: 'photo_camera', label: 'Photo Proof' },
                { icon: 'verified', label: 'SHA-256 Hashed' },
                { icon: 'wifi_off', label: 'Offline-First' },
              ].map((badge) => (
                <div key={badge.label} className="flex items-center gap-2">
                  <span
                    className="material-symbols-outlined text-[#abc8f4] text-lg"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {badge.icon}
                  </span>
                  <span className="text-sm font-bold text-primary-100/70">
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
