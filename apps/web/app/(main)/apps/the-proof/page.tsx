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
