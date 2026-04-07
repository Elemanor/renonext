'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export function HeroFloating() {
  const [showModal, setShowModal] = useState(false)
  const [selectedProjectType, setSelectedProjectType] = useState<string | null>(null)
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null)
  const [postalCode, setPostalCode] = useState('')

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

  const handleSearchPros = () => {
    // TODO: Navigate to pros search with postal code filter
    console.log('Searching pros near:', postalCode)
  }

  return (
    <>
      {/* ── HERO SECTION ── */}
      <section className="relative min-h-[100dvh] flex items-center overflow-hidden bg-reno-dark -mt-[60px]">
        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80')",
          }}
        />

        {/* Gradient Overlays */}
        <div className="absolute inset-0 z-10 bg-gradient-to-r from-reno-dark via-reno-dark/80 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-48 z-10 bg-gradient-to-t from-reno-dark to-transparent" />

        {/* Content */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-12 relative z-20 pt-24 sm:pt-28 pb-24 sm:pb-16">
          <div className="max-w-3xl">
            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold tracking-tighter leading-[0.95] text-white mb-6">
              Renovate with Proof,
              <br />
              <span className="text-[#0fbabd]">Not Promises.</span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg md:text-2xl text-white/80 leading-relaxed mb-8 md:mb-10 max-w-2xl font-light">
              The only renovation platform where your funds are secured in escrow until milestones are met. Verified contractors, transparent pricing.
            </p>

            {/* Search Bar */}
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl shadow-black/20 p-2 sm:p-3 flex flex-col sm:flex-row gap-2 sm:gap-3 mb-6 md:mb-8 max-w-2xl">
              <div className="flex-1 relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-xl">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Enter your postal code (e.g., M5V)"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full h-12 sm:h-14 pl-12 pr-4 text-sm sm:text-base text-slate-900 placeholder:text-slate-400 outline-none rounded-lg sm:rounded-xl focus:ring-2 focus:ring-[#0fbabd]/20 transition-all"
                />
              </div>
              <button
                onClick={handleSearchPros}
                className="group flex items-center justify-center h-12 sm:h-14 px-6 sm:px-8 bg-[#0fbabd] text-white text-sm sm:text-base font-semibold rounded-lg sm:rounded-xl hover:bg-[#0da5a8] transition-all duration-300 shadow-lg shadow-[#0fbabd]/30 hover:shadow-[#0fbabd]/50"
              >
                Search Pros
                <span className="material-symbols-outlined ml-2 text-lg transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </button>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 md:mb-10">
              <button
                onClick={() => setShowModal(true)}
                className="group flex items-center justify-center h-12 sm:h-14 px-6 sm:px-8 bg-[#0fbabd] text-white text-sm sm:text-base font-semibold rounded-xl hover:bg-[#0da5a8] transition-all duration-300 shadow-lg shadow-[#0fbabd]/30 hover:shadow-[#0fbabd]/50"
              >
                Start Your Renovation
                <span className="material-symbols-outlined ml-2 text-lg transition-transform group-hover:translate-x-1">
                  arrow_forward
                </span>
              </button>

              <Link
                href="/join"
                className="group flex items-center justify-center h-12 sm:h-14 px-6 sm:px-8 bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm sm:text-base font-semibold rounded-xl hover:bg-white/15 transition-all duration-300"
              >
                I&apos;m a Contractor
                <span className="material-symbols-outlined ml-2 text-lg transition-transform group-hover:translate-x-1">
                  chevron_right
                </span>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 text-white/70">
              <div className="flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-[#0fbabd] text-xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  shield
                </span>
                <span className="text-sm font-medium">Bank-grade Escrow</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-white/30" />
              <div className="flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-[#0fbabd] text-xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
                <span className="text-sm font-medium">Vetted Pros</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-white/30" />
              <div className="flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-[#0fbabd] text-xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  analytics
                </span>
                <span className="text-sm font-medium">5,000+ Projects</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── PROJECT INITIATION MODAL ── */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Overlay */}
            <div
              className="absolute inset-0 bg-reno-dark/65 animate-fade-in"
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
                      { id: '10-50', label: '$10k–$50k' },
                      { id: '50-100', label: '$50k–$100k' },
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
