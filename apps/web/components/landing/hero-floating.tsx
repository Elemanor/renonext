'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'

export function HeroFloating() {
  const [focusedCard, setFocusedCard] = useState<'escrow' | 'contractor' | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedProjectType, setSelectedProjectType] = useState<string | null>(null)
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null)

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [showModal])

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowModal(false)
    }
    if (showModal) {
      window.addEventListener('keydown', handleEsc)
    }
    return () => window.removeEventListener('keydown', handleEsc)
  }, [showModal])

  const clearFocus = useCallback(() => setFocusedCard(null), [])

  return (
    <>
      {/* ── HERO SECTION ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden bg-[#f6f8f8]">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute inset-0 bg-[#f6f8f8]/90 backdrop-blur-[2px] z-10" />
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')",
            }}
          />
          {/* Subtle teal gradient accent */}
          <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#0fbabd]/5 blur-[120px] rounded-full mix-blend-multiply z-10" />
        </div>

        <div className="container mx-auto px-6 lg:px-12 relative z-20 h-full flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 py-16 lg:py-0">
          {/* Left: Typographic Lockup (55%) */}
          <div className="w-full lg:w-[55%] flex flex-col gap-8 text-left pt-10 lg:pt-0">
            <h1 className="text-5xl lg:text-[64px] font-bold leading-[1.1] tracking-tight text-slate-900">
              Build with confidence.
              <br />
              <span className="text-[#0fbabd]">Pay with certainty.</span>
            </h1>

            <p className="text-lg lg:text-xl text-slate-600 font-normal leading-relaxed max-w-xl">
              The only renovation platform where your funds are secured in
              escrow until milestones are met.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setShowModal(true)}
                className="group flex items-center justify-center rounded-lg h-14 px-8 bg-[#0fbabd] text-white text-base font-semibold shadow-lg shadow-[#0fbabd]/30 hover:shadow-[#0fbabd]/50 hover:-translate-y-0.5 transition-all duration-300"
              >
                Secure Your Renovation
                <span className="material-symbols-outlined ml-2 text-lg transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </button>

              <Link
                href="/join"
                className="flex items-center justify-center rounded-lg h-14 px-8 border-2 border-[#0fbabd] text-[#0fbabd] text-base font-semibold hover:bg-[#0fbabd]/5 transition-all duration-300"
              >
                I&apos;m a Contractor
                <span className="material-symbols-outlined ml-2 text-lg">
                  chevron_right
                </span>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center gap-6 pt-4 text-sm text-slate-500 font-medium">
              <div className="flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-[#0fbabd] text-lg"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  shield
                </span>
                <span>Bank-grade Escrow</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-slate-300" />
              <div className="flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-[#0fbabd] text-lg"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
                <span>Vetted Pros</span>
              </div>
            </div>
          </div>

          {/* Right: Floating Cards Composition (45%) */}
          <div className="w-full lg:w-[45%] relative h-[450px] lg:h-[600px] hidden lg:flex items-center justify-center lg:justify-end pr-0 lg:pr-8">
            {/* ── ESCROW CARD ── */}
            <div
              className={`absolute top-[10%] right-[5%] lg:right-[15%] w-[320px] bg-white rounded-2xl p-6 shadow-float hover:shadow-float-hover hover:-translate-y-2 transition-all duration-300 border border-[#0fbabd]/10 z-10 animate-float-in-1 cursor-pointer ${
                focusedCard === 'contractor' ? 'opacity-25' : ''
              }`}
              onMouseEnter={() => setFocusedCard('escrow')}
              onMouseLeave={clearFocus}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-green-50 text-green-600">
                  <span
                    className="material-symbols-outlined text-2xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    shield_locked
                  </span>
                </div>
                <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-200">
                  Secured
                </span>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-slate-500 text-sm font-medium">Secured in Escrow</p>
                <p className="text-slate-900 text-[32px] font-bold tracking-tight font-mono">
                  $45,000
                </p>
              </div>

              {/* Milestone hint / Expanded timeline on hover */}
              <div
                className="overflow-hidden transition-all duration-500 ease-out"
                style={{
                  maxHeight: focusedCard === 'escrow' ? '220px' : '52px',
                }}
              >
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-500 relative">
                    <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-75" />
                  </div>
                  <p className="text-xs text-slate-600 font-medium">
                    Next: Demolition ($15k)
                  </p>
                </div>

                {/* Expanded timeline */}
                <div
                  className="transition-all duration-500"
                  style={{
                    opacity: focusedCard === 'escrow' ? 1 : 0,
                    marginTop: focusedCard === 'escrow' ? '16px' : '0px',
                  }}
                >
                  <div className="relative pl-7">
                    {/* Vertical connector */}
                    <div
                      className="absolute left-[7px] top-2 bottom-2 w-0.5 rounded"
                      style={{
                        background: 'linear-gradient(to bottom, #16a34a, #2563EB, #D1D5DB)',
                      }}
                    />
                    {/* Node 1 — Completed */}
                    <div className="relative flex items-start gap-3 mb-4">
                      <div className="absolute -left-5 top-0.5 w-4 h-4 rounded-full bg-green-600 flex items-center justify-center">
                        <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                          <path d="M1.5 4L3.5 6L6.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-slate-900">Deposit</p>
                        <p className="text-sm font-mono text-green-600">
                          $10,000 <span className="text-[11px] font-sans text-slate-400">Released</span>
                        </p>
                      </div>
                    </div>
                    {/* Node 2 — Active */}
                    <div className="relative flex items-start gap-3 mb-4">
                      <div className="absolute -left-5 top-0.5 w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center animate-pulse">
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-slate-900">Demolition</p>
                        <p className="text-sm font-mono text-blue-600">
                          $15,000 <span className="text-[11px] font-sans text-slate-400">Secured</span>
                        </p>
                      </div>
                    </div>
                    {/* Node 3 — Pending */}
                    <div className="relative flex items-start gap-3">
                      <div className="absolute -left-5 top-0.5 w-4 h-4 rounded-full bg-gray-300 flex items-center justify-center">
                        <div className="w-1.5 h-1.5 rounded-full bg-white" />
                      </div>
                      <div>
                        <p className="text-[13px] font-semibold text-slate-900">Final Inspection</p>
                        <p className="text-sm font-mono text-slate-400">
                          $20,000 <span className="text-[11px] font-sans">Pending</span>
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ── CONTRACTOR CARD ── */}
            <div
              className={`absolute bottom-[15%] left-[5%] lg:left-[5%] w-[320px] bg-white rounded-2xl p-6 shadow-float hover:shadow-float-hover hover:-translate-y-2 transition-all duration-300 border border-[#0fbabd]/10 z-20 animate-float-in-2 cursor-pointer ${
                focusedCard === 'escrow' ? 'opacity-25' : ''
              }`}
              onMouseEnter={() => setFocusedCard('contractor')}
              onMouseLeave={clearFocus}
            >
              <div className="flex items-center gap-4 mb-5">
                <div className="relative">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#0fbabd] to-[#0D9FA1] flex items-center justify-center text-white text-xl font-bold">
                    A
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-white text-[12px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check
                    </span>
                  </div>
                </div>
                <div>
                  <h3 className="text-slate-900 text-lg font-bold">Apex Builders</h3>
                  <p className="text-slate-500 text-xs font-medium">
                    Kitchen &amp; Bath Specialists
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl mb-4">
                <div className="flex items-center gap-1 text-[#E8AA42]">
                  {[1, 2, 3, 4, 5].map(i => (
                    <span
                      key={i}
                      className="material-symbols-outlined text-base"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                  ))}
                </div>
                <span className="text-slate-700 text-sm font-semibold">
                  5.0 <span className="text-slate-400 font-normal">(42)</span>
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-slate-600">
                <span className="material-symbols-outlined text-[#0fbabd] text-[16px]">
                  workspace_premium
                </span>
                <span>Verified License &amp; Insurance</span>
              </div>

              {/* Expanded details on hover */}
              <div
                className="overflow-hidden transition-all duration-500 ease-out"
                style={{
                  maxHeight: focusedCard === 'contractor' ? '200px' : '0px',
                  opacity: focusedCard === 'contractor' ? 1 : 0,
                  marginTop: focusedCard === 'contractor' ? '16px' : '0px',
                }}
              >
                <div className="border-t border-slate-100 pt-4 space-y-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded flex items-center justify-center bg-green-50">
                      <span className="material-symbols-outlined text-green-600 text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        verified_user
                      </span>
                    </div>
                    <span className="text-[13px] text-slate-900">
                      License #ABC-12345 <span className="text-green-600 font-semibold">(Active)</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2.5">
                    <div className="w-5 h-5 rounded flex items-center justify-center bg-[#0fbabd]/10">
                      <span className="material-symbols-outlined text-[#0fbabd] text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        security
                      </span>
                    </div>
                    <span className="text-[13px] text-slate-900">
                      Insured up to <strong>$2M</strong>
                    </span>
                  </div>
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mt-3 mb-2">
                    Recent Projects
                  </p>
                  <div className="flex gap-2">
                    {[
                      { label: 'Kitchen', color: 'from-primary/30 to-primary/50' },
                      { label: 'Bath', color: 'from-[#E8AA42]/30 to-[#E8AA42]/50' },
                      { label: 'Deck', color: 'from-primary/15 to-primary/30' },
                    ].map(p => (
                      <div
                        key={p.label}
                        className={`relative overflow-hidden w-16 h-16 rounded-lg bg-gradient-to-br ${p.color}`}
                      >
                        <div className="absolute inset-0 flex items-center justify-center">
                          <span className="text-[10px] font-semibold text-white/85 drop-shadow-sm">
                            {p.label}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── PROJECT INITIATION MODAL ── */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-[#102122]/65 animate-fade-in"
              onClick={() => setShowModal(false)}
            />

            {/* Slide-in panel */}
            <div
              className="relative h-full overflow-y-auto bg-white animate-slide-in-right"
              style={{ width: 'min(480px, 92vw)' }}
            >
              <div className="p-8 lg:p-12">
                {/* Close */}
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center hover:bg-black/5 transition-colors"
                  aria-label="Close"
                >
                  <span className="material-symbols-outlined text-slate-400">close</span>
                </button>

                {/* Header */}
                <div className="mb-10">
                  <h2 className="text-[28px] font-bold text-slate-900 mb-2 leading-tight">
                    Start your secure project
                  </h2>
                  <p className="text-[15px] text-slate-500 leading-relaxed">
                    Tell us about your renovation and we&apos;ll match you with
                    verified contractors.
                  </p>
                </div>

                {/* Project Type */}
                <fieldset className="mb-8 border-none p-0 m-0">
                  <legend className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 block">
                    Project Type
                  </legend>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      { id: 'kitchen', label: 'Kitchen Renovation', desc: 'Cabinets, countertops, appliances' },
                      { id: 'bath', label: 'Bathroom Remodel', desc: 'Fixtures, tiling, plumbing' },
                      { id: 'full', label: 'Full Home Renovation', desc: 'Multi-room, structural changes' },
                    ].map(opt => (
                      <button
                        key={opt.id}
                        className={`text-left p-4 rounded-xl border-2 transition-all duration-200 hover:border-[#0fbabd]/30 active:scale-[0.98] ${
                          selectedProjectType === opt.id
                            ? 'border-[#0fbabd] bg-[#0fbabd]/5'
                            : 'border-slate-200'
                        }`}
                        onClick={() => setSelectedProjectType(opt.id)}
                      >
                        <p className="text-[15px] font-semibold text-slate-900">{opt.label}</p>
                        <p className="text-[13px] text-slate-500 mt-0.5">{opt.desc}</p>
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* Budget */}
                <fieldset className="mb-10 border-none p-0 m-0">
                  <legend className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 block">
                    Estimated Budget
                  </legend>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { id: '10-50', label: '$10k\u2013$50k' },
                      { id: '50-100', label: '$50k\u2013$100k' },
                      { id: '100+', label: '$100k+' },
                    ].map(opt => (
                      <button
                        key={opt.id}
                        className={`text-center p-4 rounded-xl border-2 transition-all duration-200 hover:border-[#0fbabd]/30 active:scale-[0.98] ${
                          selectedBudget === opt.id
                            ? 'border-[#0fbabd] bg-[#0fbabd]/5'
                            : 'border-slate-200'
                        }`}
                        onClick={() => setSelectedBudget(opt.id)}
                      >
                        <p className="text-[16px] font-semibold text-slate-900 font-mono">
                          {opt.label}
                        </p>
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* Submit */}
                <button className="group w-full flex items-center justify-center gap-2 text-white h-14 rounded-lg bg-[#0fbabd] text-base font-semibold shadow-lg shadow-[#0fbabd]/30 hover:shadow-[#0fbabd]/50 hover:-translate-y-0.5 active:scale-[0.98] transition-all duration-300">
                  Get Matched with Contractors
                  <span className="material-symbols-outlined text-lg transition-transform group-hover:translate-x-1">
                    arrow_forward
                  </span>
                </button>

                <p className="text-center mt-4 text-xs text-slate-400">
                  No commitment. Free estimates from verified pros.
                </p>
              </div>
            </div>
          </div>
        )}
      </section>
    </>
  )
}
