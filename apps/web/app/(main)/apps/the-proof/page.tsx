import type { Metadata } from 'next';
import Link from 'next/link';
import { ScrollReveal } from '@/components/sentinel/scroll-reveal';
import {
  proofModules,
  recentVerifications,
  ledgerStats,
  verificationFlow,
  integrations,
  statusStyles,
} from '@/lib/data/the-proof';

export const metadata: Metadata = {
  title: 'The Proof — Immutable Verification Ledger | RenoNext',
  description:
    'GPS-stamped, time-locked, cryptographically secured verification for every delivery, inspection, and milestone on your construction site.',
};

export default function TheProofPage() {
  return (
    <main className="overflow-hidden">
      {/* ================================================================
          SECTION 1 — HERO
          White bg with editorial dot-grid pattern overlay
          ================================================================ */}
      <section className="relative bg-white overflow-hidden">
        {/* Dot grid background */}
        <div
          className="absolute inset-0 pointer-events-none z-0"
          style={{
            backgroundImage:
              'radial-gradient(circle, #cbd5e1 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            opacity: 0.15,
          }}
        />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:py-28 flex flex-col lg:flex-row gap-16 items-center">
          {/* Left: Copy */}
          <div className="w-full lg:w-1/2 space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-1.5 rounded-full border border-primary/20">
              <span
                className="material-symbols-outlined text-primary text-sm"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-primary">
                Verified Ticket #4532
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-extrabold text-[#102122] leading-[1.05] tracking-tight">
              Truth in every
              <br />
              <span className="text-primary italic">transaction.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-500 max-w-xl font-light leading-relaxed">
              Our immutable ledger provides crystal-clear verification for
              on-site visual evidence. GPS-stamped, time-locked, and
              cryptographically secured.
            </p>

            {/* Status pills */}
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-gray-400 mb-1.5 font-medium">
                  Status
                </span>
                <div className="bg-gray-100 px-5 py-3 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(15,186,189,0.5)]" />
                  <span className="font-bold text-[#102122] text-sm tracking-wide">
                    IMMUTABLE_RECORD
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] uppercase tracking-widest text-gray-400 mb-1.5 font-medium">
                  Authenticity Score
                </span>
                <div className="bg-gray-100 px-5 py-3 flex items-center gap-3">
                  <span className="font-black text-[#102122] text-xl">
                    99.9%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Phone + Receipt visual */}
          <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[500px] h-[580px]">
              {/* Receipt card (underneath, rotated) */}
              <div className="absolute -left-4 lg:-left-12 top-20 w-60 bg-white p-6 shadow-xl -rotate-[4deg] z-10 border border-gray-100 rounded-sm">
                <div className="flex justify-between items-start mb-5">
                  <span className="material-symbols-outlined text-gray-300 text-2xl">
                    qr_code_2
                  </span>
                  <span className="text-[10px] text-gray-400 font-medium">
                    ID: 9823-XA-4532
                  </span>
                </div>
                <div className="space-y-2.5 border-b border-dashed border-gray-200 pb-4 mb-4">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400 font-medium">LOCATION</span>
                    <span className="text-[#102122] font-bold text-[11px]">
                      40.7128&deg; N, 74.0060&deg; W
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400 font-medium">DATE</span>
                    <span className="text-[#102122] font-bold text-[11px]">
                      OCT 24, 2024
                    </span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400 font-medium">TYPE</span>
                    <span className="text-[#102122] font-bold text-[11px]">
                      CONCRETE_LOG
                    </span>
                  </div>
                </div>
                <div className="text-[9px] text-gray-400 uppercase tracking-widest leading-relaxed">
                  Verification hash: 0x821f...921a
                  <br />
                  Authorized by: ProofNode-04
                </div>
              </div>

              {/* Phone frame */}
              <div className="relative z-20 w-72 h-[540px] bg-zinc-900 rounded-[3rem] p-3 shadow-2xl border-[8px] border-zinc-800 ml-auto lg:mr-8">
                {/* Notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-800 rounded-b-2xl" />

                <div className="h-full w-full rounded-[2.2rem] overflow-hidden bg-white flex flex-col">
                  {/* App header */}
                  <div className="px-5 pt-8 pb-3 flex justify-between items-center">
                    <span className="material-symbols-outlined text-zinc-900 text-xl">
                      arrow_back
                    </span>
                    <span className="font-extrabold text-[10px] tracking-[0.2em] uppercase text-zinc-900">
                      The Proof
                    </span>
                    <span className="material-symbols-outlined text-zinc-900 text-xl">
                      more_vert
                    </span>
                  </div>

                  {/* Photo area */}
                  <div className="flex-1 relative mx-3 mb-3 rounded-xl overflow-hidden bg-gradient-to-br from-zinc-200 via-zinc-100 to-zinc-300">
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage:
                          'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(0,0,0,0.04) 8px, rgba(0,0,0,0.04) 16px)',
                      }}
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="material-symbols-outlined text-zinc-300 text-7xl">
                        construction
                      </span>
                    </div>
                    {/* GPS overlay */}
                    <div className="absolute bottom-3 left-3 right-3 bg-white/70 backdrop-blur-sm p-2.5 rounded-lg flex items-center justify-between">
                      <div>
                        <p className="text-[7px] font-bold text-zinc-900 uppercase tracking-wider">
                          GPS STAMPED
                        </p>
                        <p className="text-[10px] font-medium text-zinc-600">
                          Manhattan, NYC
                        </p>
                      </div>
                      <span
                        className="material-symbols-outlined text-primary text-xl"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        verified_user
                      </span>
                    </div>
                  </div>

                  {/* Ticket info */}
                  <div className="px-5 pb-6 space-y-3">
                    <div className="flex justify-between items-end">
                      <h3 className="font-black text-2xl text-zinc-900">
                        #4532
                      </h3>
                      <span className="bg-zinc-900 text-white text-[9px] px-2.5 py-1 rounded font-bold tracking-wide">
                        VERIFIED
                      </span>
                    </div>
                    <div>
                      <p className="text-[9px] text-zinc-400 font-medium uppercase tracking-wider">
                        Timestamp
                      </p>
                      <p className="text-xs font-bold text-zinc-900">
                        14:22:11 GMT-4
                      </p>
                    </div>
                    <div className="bg-zinc-900 text-white py-2.5 rounded-xl text-center">
                      <span className="font-bold text-[10px] uppercase tracking-widest">
                        View on Ledger
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 2 — BENTO GRID
          Features and stats in editorial bento layout
          ================================================================ */}
      <section className="bg-[#f6f8f8] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 md:min-h-[560px]">
              {/* Large featured bento (2x2) — Zero-Knowledge Protocol */}
              <div className="md:col-span-2 md:row-span-2 bg-white p-10 flex flex-col justify-between shadow-sm border border-gray-100 rounded-xl relative overflow-hidden group">
                <div className="absolute top-4 right-4">
                  <span className="material-symbols-outlined text-gray-100 text-8xl">
                    terminal
                  </span>
                </div>
                <div className="space-y-5 relative z-10">
                  <span className="text-xs font-bold text-primary uppercase tracking-widest">
                    Technological Core
                  </span>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-[#102122] leading-tight">
                    Zero-Knowledge
                    <br />
                    Identity Protocol
                  </h2>
                  <p className="text-gray-500 max-w-sm leading-relaxed">
                    We don&apos;t store your data. We verify its existence and
                    state at a specific point in time without compromising
                    privacy.
                  </p>
                </div>
                <div className="pt-8">
                  <span className="inline-flex items-center gap-2 font-bold text-sm text-[#102122] group-hover:gap-4 transition-all cursor-pointer">
                    Read the Protocol
                    <span className="material-symbols-outlined text-lg">
                      arrow_forward
                    </span>
                  </span>
                </div>
              </div>

              {/* Stats bar (2x1) — dark */}
              <div className="md:col-span-2 bg-[#102122] p-10 flex items-center justify-between rounded-xl">
                <div className="space-y-2">
                  <h3 className="text-white text-3xl font-black">2.4ms</h3>
                  <p className="text-white/50 text-xs uppercase tracking-widest font-medium">
                    Verification Latency
                  </p>
                </div>
                <div className="w-px h-12 bg-white/10" />
                <div className="space-y-2 text-right">
                  <h3 className="text-white text-3xl font-black">Node_014</h3>
                  <p className="text-white/50 text-xs uppercase tracking-widest font-medium">
                    Active Registry
                  </p>
                </div>
              </div>

              {/* Encrypted card (1x1) */}
              <div className="bg-white p-8 rounded-xl flex flex-col justify-between shadow-sm border border-gray-100 min-h-[200px]">
                <span className="material-symbols-outlined text-[#102122] text-2xl">
                  shield
                </span>
                <div className="space-y-1.5 mt-auto">
                  <h4 className="font-bold text-[#102122]">Encrypted</h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    AES-256 standard encryption for all metadata.
                  </p>
                </div>
              </div>

              {/* Permanent card (1x1) — teal accent */}
              <div className="bg-primary p-8 rounded-xl flex flex-col justify-between text-white min-h-[200px]">
                <span className="material-symbols-outlined text-2xl">
                  history_edu
                </span>
                <div className="space-y-1.5 mt-auto">
                  <h4 className="font-bold">Permanent</h4>
                  <p className="text-xs text-white/70 leading-relaxed">
                    Once verified, the record is etched into the ledger forever.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================
          SECTION 3 — VERIFICATION FLOW
          From Capture to Certainty — 4 steps
          ================================================================ */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-xs font-bold text-primary uppercase tracking-widest">
                How It Works
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#102122] mt-4 tracking-tight">
                From Capture to Certainty
              </h2>
              <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
                Four steps. Under three seconds. Every piece of evidence sealed
                into an immutable record.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {verificationFlow.map((step, i) => (
              <ScrollReveal key={step.step} delay={i * 100}>
                <div className="relative">
                  {/* Step number */}
                  <div className="absolute -top-3 -left-3 w-8 h-8 bg-[#102122] text-white rounded-full flex items-center justify-center text-xs font-black z-10">
                    {step.step}
                  </div>

                  <div className="bg-[#f6f8f8] p-8 rounded-xl border border-gray-100 h-full hover:shadow-float transition-shadow">
                    <span className="material-symbols-outlined text-primary text-3xl">
                      {step.icon}
                    </span>
                    <h3 className="font-extrabold text-[#102122] text-xl mt-4 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-500 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>

                  {/* Connector line */}
                  {i < verificationFlow.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 border-t-2 border-dashed border-gray-200" />
                  )}
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 3.5 — INSIDE THE ENGINE
          Forensic Proof Engine dashboard visual (desktop + mobile)
          ================================================================ */}
      <section className="bg-[#102122] py-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-xs font-bold text-primary uppercase tracking-widest">
                Inside the Engine
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-4 tracking-tight">
                Live Data. No Guesswork.
              </h2>
              <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
                The Forensic Proof Engine gives site managers a real-time
                dashboard of GPS attendance, quantity verification, OCR receipts,
                and timestamped photo evidence.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="relative">
              {/* ── Desktop Browser Frame ── */}
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/[0.08]">
                {/* Browser chrome */}
                <div className="bg-[#e6e9e7] px-4 py-3 flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                    <div className="w-3 h-3 rounded-full bg-[#28c840]" />
                  </div>
                  <div className="flex-1 flex justify-center">
                    <div className="bg-white/70 rounded-full px-6 py-1 text-[11px] text-gray-500 font-medium">
                      proof.renonext.com/dashboard
                    </div>
                  </div>
                </div>

                {/* Dashboard body */}
                <div className="bg-[#f8faf8] p-5 lg:p-6">
                  {/* Top header bar */}
                  <div className="flex justify-between items-center mb-5">
                    <div>
                      <h3 className="text-base font-bold text-[#102122] tracking-tight">
                        The Forensic Proof Engine
                      </h3>
                      <p className="text-[11px] text-gray-500">
                        Live, verifiable data from the job site. No guesswork.
                      </p>
                    </div>
                    <div className="hidden md:flex items-center gap-3">
                      <div className="bg-[#f2f4f2] rounded-full px-4 py-1.5 flex items-center gap-2">
                        <span className="material-symbols-outlined text-gray-400 text-sm">
                          search
                        </span>
                        <span className="text-[11px] text-gray-400">
                          Search evidence logs...
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-gray-400 text-xl">
                        notifications
                      </span>
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-[10px] font-bold text-primary">
                          JM
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bento grid */}
                  <div className="grid grid-cols-12 gap-4">
                    {/* ── GPS Site Attendance (8 col) ── */}
                    <div className="col-span-12 lg:col-span-8 bg-white rounded-xl shadow-sm overflow-hidden">
                      <div className="p-4 flex justify-between items-center">
                        <div>
                          <h4 className="text-sm font-bold text-[#102122]">
                            GPS Site Attendance
                          </h4>
                          <p className="text-[10px] text-gray-500">
                            Verified geofence entry/exit logs
                          </p>
                        </div>
                        <span className="px-2.5 py-0.5 bg-primary/10 text-primary text-[9px] font-bold rounded-full flex items-center gap-1">
                          <span
                            className="material-symbols-outlined text-[10px]"
                            style={{
                              fontVariationSettings: "'FILL' 1",
                            }}
                          >
                            check_circle
                          </span>
                          LIVE TRACKING
                        </span>
                      </div>
                      <div className="flex min-h-[200px]">
                        {/* Map placeholder */}
                        <div className="w-3/5 relative bg-gradient-to-br from-gray-200 via-gray-100 to-gray-200 overflow-hidden">
                          <div
                            className="absolute inset-0 opacity-10"
                            style={{
                              backgroundImage:
                                'linear-gradient(rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)',
                              backgroundSize: '20px 20px',
                            }}
                          />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-20 h-20 border-[3px] border-primary/30 bg-primary/10 rounded-full" />
                            <div className="absolute w-3 h-3 bg-primary border-2 border-white rounded-full shadow-sm" />
                          </div>
                          <div className="absolute bottom-3 left-3 bg-white/80 backdrop-blur-sm p-2 rounded text-[9px] font-mono text-[#102122] shadow-sm">
                            LAT: 41.8781&deg; N
                            <br />
                            LON: 87.6298&deg; W
                          </div>
                        </div>
                        {/* Check-in timeline */}
                        <div className="w-2/5 bg-[#f2f4f2] p-4 space-y-4">
                          {[
                            {
                              name: 'J. Miller (Site Super)',
                              time: 'Checked In: 07:02 AM',
                              active: true,
                            },
                            {
                              name: 'D. Vance (Plumbing)',
                              time: 'Checked In: 07:15 AM',
                              active: true,
                            },
                            {
                              name: 'K. Thompson',
                              time: 'Expected: 08:30 AM',
                              active: false,
                            },
                          ].map((entry) => (
                            <div key={entry.name} className="flex gap-2.5">
                              <div className="flex flex-col items-center">
                                <div
                                  className={`w-1.5 h-1.5 rounded-full mt-1.5 ${
                                    entry.active
                                      ? 'bg-primary'
                                      : 'bg-gray-300'
                                  }`}
                                />
                                <div className="w-px flex-1 bg-gray-200 my-0.5" />
                              </div>
                              <div>
                                <div className="text-[10px] font-bold text-[#102122]">
                                  {entry.name}
                                </div>
                                <div className="text-[9px] text-gray-500">
                                  {entry.time}
                                </div>
                              </div>
                            </div>
                          ))}
                          <div className="text-center text-[10px] font-bold text-primary pt-1">
                            View All Logs
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ── Quantity Match (4 col) ── */}
                    <div className="col-span-12 lg:col-span-4 bg-[#e6e9e7] rounded-xl p-5 flex flex-col justify-between">
                      <div>
                        <h4 className="text-sm font-bold text-[#102122] mb-0.5">
                          Quantity Match
                        </h4>
                        <p className="text-[10px] text-gray-500">
                          Design vs. Field Installation
                        </p>
                      </div>
                      <div className="flex flex-col items-center py-3">
                        <div className="relative w-24 h-24">
                          <svg
                            className="w-full h-full -rotate-90"
                            viewBox="0 0 160 160"
                          >
                            <circle
                              cx="80"
                              cy="80"
                              r="66"
                              fill="transparent"
                              stroke="#d1d5db"
                              strokeWidth="10"
                            />
                            <circle
                              cx="80"
                              cy="80"
                              r="66"
                              fill="transparent"
                              stroke="#0fbabd"
                              strokeWidth="10"
                              strokeDasharray="415"
                              strokeDashoffset="0"
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex flex-col items-center justify-center">
                            <span className="text-xl font-black text-primary tracking-tighter">
                              100%
                            </span>
                            <span className="text-[7px] font-bold text-gray-500 uppercase tracking-widest">
                              Match
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="bg-white/50 p-2.5 rounded-lg">
                          <div className="text-[8px] text-gray-500 font-bold uppercase">
                            Target
                          </div>
                          <div className="text-sm font-bold text-primary">
                            1,240
                          </div>
                        </div>
                        <div className="bg-white/50 p-2.5 rounded-lg">
                          <div className="text-[8px] text-gray-500 font-bold uppercase">
                            Verified
                          </div>
                          <div className="text-sm font-bold text-primary">
                            1,240
                          </div>
                        </div>
                      </div>
                      <div className="mt-3 flex items-center justify-center gap-1.5 text-primary text-[10px] font-bold bg-primary/10 py-2 rounded-lg">
                        <span
                          className="material-symbols-outlined text-xs"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          verified
                        </span>
                        ENGINE VERIFIED
                      </div>
                    </div>

                    {/* ── Material Receipt OCR (4 col) ── */}
                    <div className="col-span-12 lg:col-span-4 bg-white rounded-xl shadow-sm overflow-hidden">
                      <div className="p-4 border-b border-gray-100">
                        <h4 className="text-sm font-bold text-[#102122]">
                          Material Receipt OCR
                        </h4>
                        <p className="text-[10px] text-gray-500">
                          Automated validation from scan
                        </p>
                      </div>
                      <div className="p-4">
                        {/* Receipt skeleton with OCR highlight */}
                        <div className="relative bg-gray-50 rounded-lg p-3.5 border border-gray-100 min-h-[100px]">
                          <div className="space-y-2 opacity-40">
                            <div className="h-3 w-2/3 bg-gray-200 rounded" />
                            <div className="h-2 w-1/2 bg-gray-100 rounded" />
                            <div className="h-px w-full bg-gray-100" />
                            <div className="flex justify-between">
                              <div className="h-2.5 w-1/3 bg-gray-200 rounded" />
                              <div className="h-2.5 w-5 bg-primary/30 rounded" />
                            </div>
                            <div className="flex justify-between">
                              <div className="h-2.5 w-1/2 bg-gray-200 rounded" />
                              <div className="h-2.5 w-7 bg-primary/30 rounded" />
                            </div>
                            <div className="h-px w-full bg-gray-100" />
                          </div>
                          {/* OCR validated line */}
                          <div className="absolute top-1/2 -translate-y-1/2 left-2.5 right-2.5 h-5 bg-primary/10 border-y border-primary/30 flex items-center px-2">
                            <span className="text-[8px] font-mono text-primary font-bold">
                              TOTAL: $4,520.12 &mdash; VALIDATED
                            </span>
                          </div>
                        </div>
                        <div className="mt-3 space-y-1">
                          <div className="flex justify-between text-[10px]">
                            <span className="text-gray-500">Vendor</span>
                            <span className="font-bold text-[#102122]">
                              Build-Right Supply Co.
                            </span>
                          </div>
                          <div className="flex justify-between text-[10px]">
                            <span className="text-gray-500">
                              Match Confidence
                            </span>
                            <span className="font-bold text-primary">
                              99.8%
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* ── Timestamped Photo Logs (8 col) ── */}
                    <div className="col-span-12 lg:col-span-8 bg-white rounded-xl shadow-sm overflow-hidden">
                      <div className="p-4 flex justify-between items-center">
                        <div>
                          <h4 className="text-sm font-bold text-[#102122]">
                            Timestamped Photo Logs
                          </h4>
                          <p className="text-[10px] text-gray-500">
                            Forensic visual evidence archive
                          </p>
                        </div>
                        <div className="flex gap-1.5">
                          <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-gray-400 text-xs">
                              chevron_left
                            </span>
                          </div>
                          <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center">
                            <span className="material-symbols-outlined text-gray-400 text-xs">
                              chevron_right
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="px-4 pb-4 flex gap-3">
                        {[
                          {
                            label: 'Foundation Slab 04',
                            time: '14:20:05 UTC',
                            icon: 'foundation',
                          },
                          {
                            label: 'Electrical Riser A',
                            time: '15:45:12 UTC',
                            icon: 'electrical_services',
                          },
                          {
                            label: 'Rebar Inspection',
                            time: '16:10:33 UTC',
                            icon: 'straighten',
                          },
                        ].map((photo) => (
                          <div
                            key={photo.label}
                            className="w-1/3 relative rounded-lg overflow-hidden"
                          >
                            <div className="h-28 bg-gradient-to-br from-gray-300 via-gray-200 to-gray-300 flex items-center justify-center">
                              <span className="material-symbols-outlined text-white/40 text-3xl">
                                {photo.icon}
                              </span>
                            </div>
                            <div className="absolute top-1.5 right-1.5 bg-white/80 backdrop-blur-sm px-1.5 py-0.5 rounded text-[8px] font-bold text-primary">
                              {photo.time}
                            </div>
                            <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-black/70 to-transparent">
                              <span className="text-[9px] font-bold text-white">
                                {photo.label}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Status footer */}
                  <div className="mt-4 flex justify-between items-center py-2 border-t border-gray-200">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">
                          Engine Status: Optimal
                        </span>
                      </div>
                      <div className="hidden md:block h-3 w-px bg-gray-200" />
                      <span className="hidden md:block text-[9px] text-gray-400">
                        Last Audit: 2 minutes ago
                      </span>
                    </div>
                    <div className="bg-gray-100 px-3 py-1 rounded text-[9px] font-bold text-gray-500">
                      Generate Report
                    </div>
                  </div>
                </div>
              </div>

              {/* ── Mobile Phone Overlay (desktop only) ── */}
              <div className="hidden lg:block absolute -bottom-16 -right-2 xl:right-6 z-10">
                <div className="w-56 bg-zinc-900 rounded-[2.5rem] p-2 shadow-2xl border-[6px] border-zinc-800">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-zinc-800 rounded-b-xl" />
                  <div className="h-[380px] rounded-[2rem] overflow-hidden bg-[#f8faf8] flex flex-col">
                    {/* Mobile header */}
                    <div className="px-3.5 pt-6 pb-1.5 flex justify-between items-center">
                      <span className="text-[11px] font-bold text-[#102122] tracking-tight">
                        Proof Engine
                      </span>
                      <span className="material-symbols-outlined text-gray-400 text-sm">
                        notifications
                      </span>
                    </div>

                    {/* Session info */}
                    <div className="px-3.5 py-1.5">
                      <div className="flex items-center gap-1">
                        <span className="text-[7px] font-bold text-primary uppercase tracking-widest">
                          Live Session
                        </span>
                        <div className="w-1 h-1 rounded-full bg-primary" />
                      </div>
                      <h3 className="text-base font-black text-[#102122] tracking-tighter leading-tight">
                        Project Alpha
                      </h3>
                      <p className="text-[8px] text-gray-500">
                        Site 402-B &bull; 12 Oct 2024
                      </p>
                    </div>

                    {/* Quantity Match card */}
                    <div className="mx-3.5 mt-1.5 bg-[#e6e9e7] rounded-lg p-3">
                      <p className="text-[7px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                        Quantity Match
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="relative w-12 h-12">
                          <svg className="w-full h-full" viewBox="0 0 36 36">
                            <circle
                              cx="18"
                              cy="18"
                              r="15"
                              fill="transparent"
                              stroke="#d1d5db"
                              strokeWidth="2.5"
                            />
                            <circle
                              cx="18"
                              cy="18"
                              r="15"
                              fill="transparent"
                              stroke="#0fbabd"
                              strokeWidth="2.5"
                              strokeDasharray="89, 95"
                              strokeLinecap="round"
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-[9px] font-black tracking-tighter">
                              94%
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-base font-black text-primary tracking-tighter">
                            4,280
                          </div>
                          <p className="text-[7px] text-gray-500">
                            Units Verified
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* GPS card */}
                    <div className="mx-3.5 mt-2 bg-[#f2f4f2] rounded-lg p-3 flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded bg-[#e6e9e7] flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-primary text-sm">
                          location_on
                        </span>
                      </div>
                      <div>
                        <h4 className="text-[10px] font-bold text-[#102122]">
                          Geofence: Active
                        </h4>
                        <p className="text-[8px] text-gray-500">
                          42 Personnel on site
                        </p>
                      </div>
                    </div>

                    {/* Map area */}
                    <div className="mx-3.5 mt-2 flex-1 rounded-lg overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300 relative">
                      <div className="absolute bottom-1.5 left-2 flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-primary ring-2 ring-primary/20" />
                        <span className="text-[7px] font-bold text-[#102122]">
                          &plusmn; 2.4m
                        </span>
                      </div>
                    </div>

                    {/* Bottom nav tabs */}
                    <div className="flex justify-around items-center px-1 py-2.5 mt-auto border-t border-gray-100">
                      {['dashboard', 'location_on', 'receipt_long', 'photo_camera', 'fact_check'].map(
                        (icon, idx) => (
                          <span
                            key={icon}
                            className={`material-symbols-outlined text-sm ${
                              idx === 0 ? 'text-primary' : 'text-gray-400'
                            }`}
                            style={
                              idx === 0
                                ? { fontVariationSettings: "'FILL' 1" }
                                : undefined
                            }
                          >
                            {icon}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================
          SECTION 4 — PROOF ARCHIVE
          Recent verifications as receipt-style cards
          ================================================================ */}
      <section className="bg-[#f6f8f8] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
              <div>
                <span className="text-xs font-bold text-primary uppercase tracking-widest">
                  Verification Ledger
                </span>
                <h2 className="text-4xl md:text-5xl font-extrabold text-[#102122] mt-4 tracking-tight">
                  Every Record,
                  <br className="hidden md:block" />
                  Accounted For
                </h2>
              </div>
              <div className="flex flex-wrap gap-6 mt-6 md:mt-0">
                {ledgerStats.map((stat) => (
                  <div key={stat.label} className="text-right">
                    <p className="text-xl font-black text-[#102122]">
                      {stat.value}
                    </p>
                    <p className="text-[10px] text-gray-400 uppercase tracking-widest font-medium">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {recentVerifications.map((ticket, i) => {
              const style = statusStyles[ticket.status];
              return (
                <ScrollReveal key={ticket.ticketId} delay={i * 80}>
                  <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-float transition-shadow">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <span className="font-black text-xl text-[#102122]">
                          {ticket.ticketId}
                        </span>
                        <span className="bg-gray-100 text-[9px] px-2 py-0.5 font-bold text-gray-500 uppercase tracking-wider rounded">
                          {ticket.type}
                        </span>
                      </div>
                      <div
                        className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full ${style.bg}`}
                      >
                        <span
                          className={`material-symbols-outlined text-sm ${style.text}`}
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {style.icon}
                        </span>
                        <span
                          className={`text-[10px] font-bold uppercase ${style.text}`}
                        >
                          {ticket.status}
                        </span>
                      </div>
                    </div>

                    {/* Material */}
                    <p className="text-sm font-medium text-[#102122] mb-3">
                      {ticket.material}
                    </p>

                    {/* Details grid */}
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div>
                        <span className="text-gray-400 font-medium uppercase text-[10px] tracking-wider">
                          Location
                        </span>
                        <p className="text-[#102122] font-medium mt-0.5">
                          {ticket.location}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-400 font-medium uppercase text-[10px] tracking-wider">
                          Coordinates
                        </span>
                        <p className="text-[#102122] font-medium mt-0.5">
                          {ticket.coordinates}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-400 font-medium uppercase text-[10px] tracking-wider">
                          Timestamp
                        </span>
                        <p className="text-[#102122] font-medium mt-0.5">
                          {ticket.date} &middot; {ticket.timestamp}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-400 font-medium uppercase text-[10px] tracking-wider">
                          Hash
                        </span>
                        <p className="text-[#102122] font-mono font-medium mt-0.5">
                          {ticket.hash}
                        </p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-dashed border-gray-100">
                      <span className="text-[10px] text-gray-400 uppercase tracking-widest">
                        {ticket.node}
                      </span>
                      <span className="text-[10px] font-bold text-primary">
                        {ticket.authenticityScore}% Authentic
                      </span>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 5 — MODULE SHOWCASE
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
                Built for Construction Truth
              </h2>
              <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
                Four modules that work together to create an unbreakable chain
                of verification from the moment evidence is captured.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {proofModules.map((mod, i) => (
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
                      <li key={feat} className="flex items-start gap-2 text-sm">
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
          SECTION 6 — INTEGRATIONS
          Connected to your RenoNext workflow
          ================================================================ */}
      <section className="bg-[#f6f8f8] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-xs font-bold text-primary uppercase tracking-widest">
                Ecosystem
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#102122] mt-4 tracking-tight">
                Connected to Your Workflow
              </h2>
              <p className="text-gray-500 mt-4 max-w-xl mx-auto text-lg">
                The Proof plugs directly into your existing RenoNext apps
                &mdash; no extra setup required.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {integrations.map((item, i) => (
              <ScrollReveal key={item.app} delay={i * 100}>
                <Link
                  href={item.href}
                  className="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-float transition-all block h-full group"
                >
                  <div className="w-12 h-12 bg-[#102122] rounded-xl flex items-center justify-center mb-5">
                    <span className="material-symbols-outlined text-primary text-xl">
                      {item.icon}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-[#102122] text-lg mb-2 group-hover:text-primary transition-colors">
                    {item.app}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {item.description}
                  </p>
                  <div className="flex items-center gap-1 mt-4 text-sm font-bold text-primary">
                    Learn more
                    <span className="material-symbols-outlined text-base group-hover:translate-x-1 transition-transform">
                      arrow_forward
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 7 — CTA
          Dark editorial CTA with trust badges
          ================================================================ */}
      <section className="bg-[#102122] py-24">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <ScrollReveal>
            <span
              className="material-symbols-outlined text-primary text-5xl mb-6 inline-block"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified_user
            </span>

            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mt-4">
              Start Proving What Happened
              <br />
              on Site
            </h2>

            <p className="text-gray-400 mt-6 max-w-xl mx-auto text-lg">
              GPS-stamped. Time-locked. Cryptographically secured. The only
              verification layer built for construction.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <Link
                href="/join"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-colors"
              >
                Request Early Access
              </Link>
              <Link
                href="/how-it-works#proof"
                className="border border-white/20 text-white hover:bg-white/5 px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-colors"
              >
                See How It Works
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-8 mt-14 pt-10 border-t border-white/10">
              {[
                { icon: 'apps', label: '4 Modules' },
                { icon: 'shield', label: 'AES-256 Encryption' },
                { icon: 'speed', label: '99.99% Uptime' },
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
