'use client'

import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import { X, ArrowRight, ChevronRight, Landmark, ShieldCheck, Star } from 'lucide-react'

export function HeroFloating() {
  const [focusedCard, setFocusedCard] = useState<'escrow' | 'contractor' | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [selectedProjectType, setSelectedProjectType] = useState<string | null>(null)
  const [selectedBudget, setSelectedBudget] = useState<string | null>(null)

  // Lock body scroll when modal is open
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [showModal])

  // Close modal on Escape
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
      <style>{`
        @import url('https://api.fontshare.com/v2/css?f[]=clash-display@200,300,400,500,600,700&f[]=general-sans@200,300,400,500,600,700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&display=swap');

        :root {
          --hero-display: 'Clash Display', system-ui, sans-serif;
          --hero-body: 'General Sans', system-ui, sans-serif;
          --hero-mono: 'Space Grotesk', 'SF Mono', monospace;
          --hero-primary: #0F3D3E;
          --hero-bg: #F6F4F0;
          --hero-surface: #FFFFFF;
          --hero-text: #121212;
          --hero-muted: #8A8A8A;
          --hero-accent: #E8AA42;
          --hero-success: #2E7D32;
          --hero-radius: 24px;
          --hero-shadow: 0 20px 40px -10px rgba(15, 61, 62, 0.12),
                         0 8px 16px -8px rgba(15, 61, 62, 0.08);
          --hero-shadow-hover: 0 30px 60px -12px rgba(15, 61, 62, 0.18),
                               0 12px 24px -12px rgba(15, 61, 62, 0.12);
        }

        /* ── Entrance animations ── */
        @keyframes heroFadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes heroCardIn {
          from { opacity: 0; transform: translateY(40px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes heroPulseRing {
          0%, 100% { box-shadow: 0 0 0 0 rgba(37, 99, 235, 0.4); }
          50%      { box-shadow: 0 0 0 8px rgba(37, 99, 235, 0); }
        }
        @keyframes heroSlideIn {
          from { transform: translateX(100%); }
          to   { transform: translateX(0); }
        }
        @keyframes heroOverlayIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes heroStatusPulse {
          0%, 100% { opacity: 1; }
          50%      { opacity: 0.4; }
        }
        @keyframes heroFloatIdle {
          0%, 100% { transform: translateY(0); }
          50%      { transform: translateY(-6px); }
        }

        /* ── Staggered text entries ── */
        .hf-badge    { animation: heroFadeInUp 0.7s cubic-bezier(0.22,0.68,0,1) 0.05s both; }
        .hf-headline { animation: heroFadeInUp 0.7s cubic-bezier(0.22,0.68,0,1) 0.12s both; }
        .hf-sub      { animation: heroFadeInUp 0.7s cubic-bezier(0.22,0.68,0,1) 0.22s both; }
        .hf-ctas     { animation: heroFadeInUp 0.7s cubic-bezier(0.22,0.68,0,1) 0.34s both; }
        .hf-trust    { animation: heroFadeInUp 0.7s cubic-bezier(0.22,0.68,0,1) 0.48s both; }

        /* ── Card entries ── */
        .hf-card-1 { animation: heroCardIn 0.65s cubic-bezier(0.22,0.68,0,1) 0.25s both; }
        .hf-card-2 { animation: heroCardIn 0.65s cubic-bezier(0.22,0.68,0,1) 0.45s both; }

        /* ── Card idle float ── */
        .hf-float-idle-1 { animation: heroFloatIdle 6s ease-in-out infinite; }
        .hf-float-idle-2 { animation: heroFloatIdle 7s ease-in-out 1s infinite; }

        /* ── Interactive transitions ── */
        .hf-card {
          transition: transform 0.5s cubic-bezier(0.22,0.68,0,1),
                      box-shadow 0.5s cubic-bezier(0.22,0.68,0,1),
                      opacity 0.4s ease,
                      width 0.5s cubic-bezier(0.22,0.68,0,1);
        }

        .hf-pulse { animation: heroPulseRing 2s ease-in-out infinite; }
        .hf-status-pulse { animation: heroStatusPulse 2s ease-in-out infinite; }

        /* ── Modal ── */
        .hf-modal-overlay { animation: heroOverlayIn 0.3s ease-out both; }
        .hf-modal-panel   { animation: heroSlideIn 0.4s cubic-bezier(0.22,0.68,0,1) both; }

        .hf-radio {
          transition: border-color 0.2s ease, background 0.2s ease, transform 0.15s ease;
        }
        .hf-radio:hover { border-color: rgba(15,61,62,0.3); }
        .hf-radio:active { transform: scale(0.98); }

        /* ── Expand / collapse for card details ── */
        .hf-expand {
          transition: max-height 0.5s cubic-bezier(0.22,0.68,0,1),
                      opacity 0.4s ease,
                      margin-top 0.4s ease;
        }

        /* ── CTA hover glow ── */
        .hf-cta-primary {
          transition: box-shadow 0.3s ease, transform 0.15s ease;
        }
        .hf-cta-primary:hover {
          box-shadow: 0 8px 30px -6px rgba(15, 61, 62, 0.35);
        }
        .hf-cta-primary:active { transform: scale(0.98); }

        .hf-cta-outline {
          transition: background 0.3s ease, transform 0.15s ease;
        }
        .hf-cta-outline:hover {
          background: rgba(15, 61, 62, 0.04);
        }
        .hf-cta-outline:active { transform: scale(0.98); }

        /* ── Reduced motion ── */
        @media (prefers-reduced-motion: reduce) {
          .hf-badge, .hf-headline, .hf-sub, .hf-ctas, .hf-trust,
          .hf-card-1, .hf-card-2, .hf-float-idle-1, .hf-float-idle-2,
          .hf-pulse, .hf-status-pulse,
          .hf-modal-overlay, .hf-modal-panel {
            animation: none !important;
            opacity: 1 !important;
            transform: none !important;
          }
          .hf-card, .hf-expand, .hf-radio,
          .hf-cta-primary, .hf-cta-outline {
            transition: none !important;
          }
        }
      `}</style>

      {/* ────────────────────────────────────────────────────────────
          HERO SECTION
      ──────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center overflow-hidden"
        style={{ background: 'var(--hero-bg)' }}
      >
        {/* Subtle dot pattern */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(15,61,62,0.06) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        />

        {/* Background dim overlay (for card focus states) */}
        <div
          className="absolute inset-0 z-[5] pointer-events-none"
          style={{
            background: 'rgba(15,15,15,0.3)',
            opacity: focusedCard ? 1 : 0,
            transition: 'opacity 0.5s ease',
          }}
        />

        {/* ── Main content grid ── */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center py-24 lg:py-0 lg:min-h-screen">

            {/* ── LEFT COLUMN (3/5 = 60%) ── */}
            <div className="lg:col-span-3 space-y-7">
              {/* Badge pill */}
              <div
                className="hf-badge inline-flex items-center gap-2.5 px-4 py-2 rounded-full"
                style={{
                  background: 'rgba(15,61,62,0.05)',
                  border: '1px solid rgba(15,61,62,0.08)',
                }}
              >
                <span className="relative flex h-2 w-2">
                  <span
                    className="absolute inline-flex h-full w-full rounded-full opacity-75 hf-status-pulse"
                    style={{ background: 'var(--hero-success)' }}
                  />
                  <span
                    className="relative inline-flex rounded-full h-2 w-2"
                    style={{ background: 'var(--hero-success)' }}
                  />
                </span>
                <span
                  className="text-[13px] tracking-wide"
                  style={{
                    fontFamily: 'var(--hero-body)',
                    fontWeight: 500,
                    color: 'rgba(15,61,62,0.7)',
                  }}
                >
                  Escrow-Secured Platform
                </span>
              </div>

              {/* Headline */}
              <h1
                className="hf-headline leading-[1.08] tracking-[-0.025em]"
                style={{
                  fontFamily: 'var(--hero-display)',
                  fontWeight: 600,
                  fontSize: 'clamp(36px, 5vw, 64px)',
                  color: 'var(--hero-text)',
                }}
              >
                Build with confidence.
                <br />
                <span style={{ color: 'var(--hero-primary)' }}>
                  Pay with certainty.
                </span>
              </h1>

              {/* Subheadline */}
              <p
                className="hf-sub max-w-xl"
                style={{
                  fontFamily: 'var(--hero-body)',
                  fontSize: '18px',
                  lineHeight: 1.7,
                  color: 'var(--hero-muted)',
                }}
              >
                The only renovation platform where your funds are secured in
                escrow until milestones are met. Verified contractors.
                Transparent costs. Zero surprises.
              </p>

              {/* CTAs */}
              <div className="hf-ctas flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowModal(true)}
                  className="hf-cta-primary group inline-flex items-center justify-center gap-2 px-8 text-white"
                  style={{
                    fontFamily: 'var(--hero-body)',
                    fontSize: '16px',
                    fontWeight: 600,
                    height: '56px',
                    background: 'var(--hero-primary)',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Secure Your Renovation
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>

                <Link
                  href="/join"
                  className="hf-cta-outline group inline-flex items-center justify-center gap-2 px-8"
                  style={{
                    fontFamily: 'var(--hero-body)',
                    fontSize: '16px',
                    fontWeight: 600,
                    height: '56px',
                    color: 'var(--hero-primary)',
                    border: '2px solid var(--hero-primary)',
                    borderRadius: '8px',
                  }}
                >
                  I&apos;m a Contractor
                  <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>

              {/* Inline trust indicators */}
              <div className="hf-trust flex flex-wrap items-center gap-x-8 gap-y-3 pt-2">
                <TrustItem icon={<Landmark className="w-3.5 h-3.5" />} label="Bank-held escrow" />
                <TrustItem icon={<ShieldCheck className="w-3.5 h-3.5" />} label="Licensed & insured" />
                <TrustItem icon={<Star className="w-3.5 h-3.5" />} label="4.9/5 homeowner rating" />
              </div>
            </div>

            {/* ── RIGHT COLUMN (2/5 = 40%) — floating cards ── */}
            <div className="lg:col-span-2 relative h-[460px] lg:h-[540px] hidden lg:block">
              {/* Decorative radial glow behind cards */}
              <div
                className="absolute -z-10 pointer-events-none"
                style={{
                  width: '400px',
                  height: '400px',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: 'radial-gradient(circle, rgba(15,61,62,0.04) 0%, transparent 70%)',
                }}
              />

              {/* ── ESCROW CARD ── */}
              <div
                className={`hf-card-1 hf-card absolute ${focusedCard === null ? 'hf-float-idle-1' : ''}`}
                style={{
                  top: '20px',
                  right: '0px',
                  width: focusedCard === 'escrow' ? '380px' : '310px',
                  zIndex: focusedCard === 'escrow' ? 30 : 10,
                  opacity: focusedCard === 'contractor' ? 0.25 : 1,
                  transform: focusedCard === 'escrow'
                    ? 'translateY(-8px)'
                    : undefined,
                  background: 'var(--hero-surface)',
                  borderRadius: 'var(--hero-radius)',
                  padding: '24px',
                  border: '1px solid rgba(15,61,62,0.08)',
                  boxShadow: focusedCard === 'escrow'
                    ? 'var(--hero-shadow-hover)'
                    : 'var(--hero-shadow)',
                  cursor: 'pointer',
                }}
                onMouseEnter={() => setFocusedCard('escrow')}
                onMouseLeave={clearFocus}
              >
                {/* Card header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ background: 'rgba(46,125,50,0.08)' }}
                    >
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                        <path
                          d="M10 2l6 3v5c0 4.5-2.5 8.5-6 10-3.5-1.5-6-5.5-6-10V5l6-3z"
                          stroke="#2E7D32" strokeWidth="1.5" strokeLinejoin="round"
                          fill="rgba(46,125,50,0.06)"
                        />
                        <path
                          d="M7.5 10.5l2 2 3.5-3.5"
                          stroke="#2E7D32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--hero-body)',
                        fontSize: '13px',
                        fontWeight: 500,
                        color: 'var(--hero-muted)',
                      }}
                    >
                      Secured in Escrow
                    </span>
                  </div>
                  <span
                    className="px-2.5 py-1 rounded-md"
                    style={{
                      fontFamily: 'var(--hero-body)',
                      fontSize: '11px',
                      fontWeight: 600,
                      letterSpacing: '0.04em',
                      background: 'rgba(46,125,50,0.08)',
                      color: 'var(--hero-success)',
                    }}
                  >
                    PROTECTED
                  </span>
                </div>

                {/* Amount */}
                <p
                  style={{
                    fontFamily: 'var(--hero-mono)',
                    fontSize: '32px',
                    fontWeight: 500,
                    color: 'var(--hero-text)',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.2,
                  }}
                >
                  $45,000
                </p>
                <p
                  style={{
                    fontFamily: 'var(--hero-body)',
                    fontSize: '13px',
                    color: 'var(--hero-muted)',
                    marginTop: '4px',
                  }}
                >
                  Kitchen renovation &mdash; 3 milestones
                </p>

                {/* ── Expanded timeline (hover) ── */}
                <div
                  className="hf-expand overflow-hidden"
                  style={{
                    maxHeight: focusedCard === 'escrow' ? '240px' : '0px',
                    opacity: focusedCard === 'escrow' ? 1 : 0,
                    marginTop: focusedCard === 'escrow' ? '20px' : '0px',
                  }}
                >
                  <div
                    style={{
                      borderTop: '1px solid rgba(15,61,62,0.06)',
                      paddingTop: '16px',
                    }}
                  >
                    <div className="relative" style={{ paddingLeft: '28px' }}>
                      {/* Vertical connector line */}
                      <div
                        className="absolute"
                        style={{
                          left: '7px',
                          top: '8px',
                          bottom: '8px',
                          width: '2px',
                          background: 'linear-gradient(to bottom, var(--hero-success), #2563EB, #D1D5DB)',
                          borderRadius: '1px',
                        }}
                      />

                      {/* Node 1 — Completed */}
                      <div className="relative flex items-start gap-3 mb-5">
                        <div
                          className="absolute flex items-center justify-center"
                          style={{
                            left: '-21px',
                            top: '2px',
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            background: 'var(--hero-success)',
                          }}
                        >
                          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                            <path d="M1.5 4L3.5 6L6.5 2" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <div>
                          <p style={{ fontFamily: 'var(--hero-body)', fontSize: '13px', fontWeight: 600, color: 'var(--hero-text)' }}>
                            Deposit
                          </p>
                          <p style={{ fontFamily: 'var(--hero-mono)', fontSize: '14px', fontWeight: 500, color: 'var(--hero-success)' }}>
                            $10,000{' '}
                            <span style={{ fontFamily: 'var(--hero-body)', fontSize: '11px', color: 'var(--hero-muted)' }}>
                              Released
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* Node 2 — Active */}
                      <div className="relative flex items-start gap-3 mb-5">
                        <div
                          className="absolute hf-pulse flex items-center justify-center"
                          style={{
                            left: '-21px',
                            top: '2px',
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            background: '#2563EB',
                          }}
                        >
                          <div
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              background: 'white',
                            }}
                          />
                        </div>
                        <div>
                          <p style={{ fontFamily: 'var(--hero-body)', fontSize: '13px', fontWeight: 600, color: 'var(--hero-text)' }}>
                            Demolition
                          </p>
                          <p style={{ fontFamily: 'var(--hero-mono)', fontSize: '14px', fontWeight: 500, color: '#2563EB' }}>
                            $15,000{' '}
                            <span style={{ fontFamily: 'var(--hero-body)', fontSize: '11px', color: 'var(--hero-muted)' }}>
                              Secured
                            </span>
                          </p>
                        </div>
                      </div>

                      {/* Node 3 — Pending */}
                      <div className="relative flex items-start gap-3">
                        <div
                          className="absolute flex items-center justify-center"
                          style={{
                            left: '-21px',
                            top: '2px',
                            width: '16px',
                            height: '16px',
                            borderRadius: '50%',
                            background: '#D1D5DB',
                          }}
                        >
                          <div
                            style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              background: 'white',
                            }}
                          />
                        </div>
                        <div>
                          <p style={{ fontFamily: 'var(--hero-body)', fontSize: '13px', fontWeight: 600, color: 'var(--hero-text)' }}>
                            Final Inspection
                          </p>
                          <p style={{ fontFamily: 'var(--hero-mono)', fontSize: '14px', fontWeight: 500, color: 'var(--hero-muted)' }}>
                            $20,000{' '}
                            <span style={{ fontFamily: 'var(--hero-body)', fontSize: '11px' }}>
                              Pending
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* ── CONTRACTOR CARD ── */}
              <div
                className={`hf-card-2 hf-card absolute ${focusedCard === null ? 'hf-float-idle-2' : ''}`}
                style={{
                  bottom: '30px',
                  right: '50px',
                  width: focusedCard === 'contractor' ? '380px' : '310px',
                  zIndex: focusedCard === 'contractor' ? 30 : 20,
                  opacity: focusedCard === 'escrow' ? 0.25 : 1,
                  transform: focusedCard === 'contractor'
                    ? 'translateY(-8px)'
                    : undefined,
                  background: 'var(--hero-surface)',
                  borderRadius: 'var(--hero-radius)',
                  padding: '24px',
                  border: '1px solid rgba(15,61,62,0.08)',
                  boxShadow: focusedCard === 'contractor'
                    ? 'var(--hero-shadow-hover)'
                    : 'var(--hero-shadow)',
                  cursor: 'pointer',
                }}
                onMouseEnter={() => setFocusedCard('contractor')}
                onMouseLeave={clearFocus}
              >
                {/* Contractor header */}
                <div className="flex items-center gap-3 mb-3">
                  {/* Avatar */}
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, var(--hero-primary), #1a5c5d)',
                      fontFamily: 'var(--hero-display)',
                      fontWeight: 600,
                      fontSize: '18px',
                    }}
                  >
                    A
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      style={{
                        fontFamily: 'var(--hero-display)',
                        fontSize: '18px',
                        fontWeight: 600,
                        color: 'var(--hero-text)',
                        lineHeight: 1.3,
                      }}
                    >
                      Apex Builders
                    </p>
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map(i => (
                        <svg key={i} width="14" height="14" viewBox="0 0 14 14">
                          <path
                            d="M7 1l1.76 3.57 3.94.57-2.85 2.78.67 3.93L7 10.07l-3.52 1.78.67-3.93L1.3 5.14l3.94-.57L7 1z"
                            fill="var(--hero-accent)"
                          />
                        </svg>
                      ))}
                      <span
                        style={{
                          fontFamily: 'var(--hero-body)',
                          fontSize: '13px',
                          color: 'var(--hero-muted)',
                          marginLeft: '4px',
                        }}
                      >
                        5.0
                      </span>
                    </div>
                  </div>
                </div>

                {/* Verified badge */}
                <div
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                  style={{
                    background: 'rgba(15,61,62,0.05)',
                    border: '1px solid rgba(15,61,62,0.08)',
                  }}
                >
                  <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M7 1l1.5 1.2 1.8-.3-.3 1.8L11.2 5 9.7 6.5l.3 1.8-1.8-.3L7 9.2 5.8 8l-1.8.3.3-1.8L3 5l1.5-1.3-.3-1.8 1.8.3L7 1z"
                      fill="var(--hero-primary)"
                    />
                    <path
                      d="M5 7l1.2 1.2L8.5 5.8"
                      stroke="white" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"
                    />
                  </svg>
                  <span
                    style={{
                      fontFamily: 'var(--hero-body)',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: 'var(--hero-primary)',
                    }}
                  >
                    Verified License
                  </span>
                </div>

                {/* ── Expanded details (hover) ── */}
                <div
                  className="hf-expand overflow-hidden"
                  style={{
                    maxHeight: focusedCard === 'contractor' ? '220px' : '0px',
                    opacity: focusedCard === 'contractor' ? 1 : 0,
                    marginTop: focusedCard === 'contractor' ? '16px' : '0px',
                  }}
                >
                  <div
                    style={{
                      borderTop: '1px solid rgba(15,61,62,0.06)',
                      paddingTop: '16px',
                    }}
                  >
                    {/* License & insurance details */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-5 h-5 rounded flex items-center justify-center"
                          style={{ background: 'rgba(46,125,50,0.08)' }}
                        >
                          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                            <path d="M6 1l4 2v3c0 3-1.7 5.7-4 6.7C3.7 11.7 2 9 2 6V3l4-2z" fill="rgba(46,125,50,0.15)" stroke="#2E7D32" strokeWidth="1" />
                            <path d="M4.5 6l1 1 2-2" stroke="#2E7D32" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </div>
                        <span style={{ fontFamily: 'var(--hero-body)', fontSize: '13px', color: 'var(--hero-text)' }}>
                          License #ABC-12345{' '}
                          <span style={{ color: 'var(--hero-success)', fontWeight: 600 }}>(Active)</span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <div
                          className="w-5 h-5 rounded flex items-center justify-center"
                          style={{ background: 'rgba(15,61,62,0.06)' }}
                        >
                          <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                            <rect x="1.5" y="3" width="9" height="7" rx="1" stroke="var(--hero-primary)" strokeWidth="1" fill="rgba(15,61,62,0.06)" />
                            <path d="M1.5 5.5h9" stroke="var(--hero-primary)" strokeWidth="0.8" />
                            <rect x="3" y="7" width="2.5" height="1.5" rx="0.3" fill="var(--hero-primary)" opacity="0.3" />
                          </svg>
                        </div>
                        <span style={{ fontFamily: 'var(--hero-body)', fontSize: '13px', color: 'var(--hero-text)' }}>
                          Insured up to <strong>$2M</strong>
                        </span>
                      </div>
                    </div>

                    {/* Recent projects */}
                    <p
                      style={{
                        fontFamily: 'var(--hero-body)',
                        fontSize: '11px',
                        fontWeight: 600,
                        color: 'var(--hero-muted)',
                        marginTop: '16px',
                        marginBottom: '8px',
                        textTransform: 'uppercase' as const,
                        letterSpacing: '0.06em',
                      }}
                    >
                      Recent Projects
                    </p>
                    <div className="flex gap-2">
                      {[
                        { label: 'Kitchen', gradient: ['#c9bda3', '#b5a892'] },
                        { label: 'Bath', gradient: ['#a8c4cb', '#96b2b9'] },
                        { label: 'Deck', gradient: ['#b3c4a8', '#a1b296'] },
                      ].map(p => (
                        <div
                          key={p.label}
                          className="relative overflow-hidden"
                          style={{
                            width: '64px',
                            height: '64px',
                            borderRadius: '8px',
                            background: `linear-gradient(135deg, ${p.gradient[0]}, ${p.gradient[1]})`,
                          }}
                        >
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span
                              style={{
                                fontFamily: 'var(--hero-body)',
                                fontSize: '10px',
                                fontWeight: 600,
                                color: 'rgba(255,255,255,0.85)',
                                textShadow: '0 1px 2px rgba(0,0,0,0.2)',
                              }}
                            >
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
        </div>

        {/* ────────────────────────────────────────────────────────────
            PROJECT INITIATION MODAL
        ──────────────────────────────────────────────────────────── */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Overlay */}
            <div
              className="hf-modal-overlay absolute inset-0"
              style={{ background: 'rgba(15,61,62,0.65)' }}
              onClick={() => setShowModal(false)}
            />

            {/* Slide-in panel */}
            <div
              className="hf-modal-panel relative h-full overflow-y-auto"
              style={{
                width: 'min(480px, 92vw)',
                background: 'var(--hero-surface)',
              }}
            >
              <div className="p-8 lg:p-12">
                {/* Close */}
                <button
                  onClick={() => setShowModal(false)}
                  className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center"
                  style={{
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.05)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                  aria-label="Close"
                >
                  <X className="w-5 h-5" style={{ color: 'var(--hero-muted)' }} />
                </button>

                {/* Header */}
                <div className="mb-10">
                  <h2
                    style={{
                      fontFamily: 'var(--hero-display)',
                      fontSize: '28px',
                      fontWeight: 600,
                      color: 'var(--hero-text)',
                      marginBottom: '8px',
                      lineHeight: 1.2,
                    }}
                  >
                    Start your secure project
                  </h2>
                  <p
                    style={{
                      fontFamily: 'var(--hero-body)',
                      fontSize: '15px',
                      color: 'var(--hero-muted)',
                      lineHeight: 1.6,
                    }}
                  >
                    Tell us about your renovation and we&apos;ll match you with
                    verified contractors.
                  </p>
                </div>

                {/* ── Project Type ── */}
                <fieldset className="mb-8" style={{ border: 'none', padding: 0, margin: 0 }}>
                  <legend
                    style={{
                      fontFamily: 'var(--hero-body)',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: 'var(--hero-text)',
                      textTransform: 'uppercase' as const,
                      letterSpacing: '0.06em',
                      marginBottom: '12px',
                      display: 'block',
                    }}
                  >
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
                        className="hf-radio text-left p-4"
                        style={{
                          borderRadius: '12px',
                          border: selectedProjectType === opt.id
                            ? '2px solid var(--hero-primary)'
                            : '1px solid rgba(15,61,62,0.1)',
                          background: selectedProjectType === opt.id
                            ? 'rgba(15,61,62,0.03)'
                            : 'transparent',
                          cursor: 'pointer',
                        }}
                        onClick={() => setSelectedProjectType(opt.id)}
                      >
                        <p
                          style={{
                            fontFamily: 'var(--hero-body)',
                            fontSize: '15px',
                            fontWeight: 600,
                            color: 'var(--hero-text)',
                          }}
                        >
                          {opt.label}
                        </p>
                        <p
                          style={{
                            fontFamily: 'var(--hero-body)',
                            fontSize: '13px',
                            color: 'var(--hero-muted)',
                            marginTop: '2px',
                          }}
                        >
                          {opt.desc}
                        </p>
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* ── Budget ── */}
                <fieldset className="mb-10" style={{ border: 'none', padding: 0, margin: 0 }}>
                  <legend
                    style={{
                      fontFamily: 'var(--hero-body)',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: 'var(--hero-text)',
                      textTransform: 'uppercase' as const,
                      letterSpacing: '0.06em',
                      marginBottom: '12px',
                      display: 'block',
                    }}
                  >
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
                        className="hf-radio text-center p-4"
                        style={{
                          borderRadius: '12px',
                          border: selectedBudget === opt.id
                            ? '2px solid var(--hero-primary)'
                            : '1px solid rgba(15,61,62,0.1)',
                          background: selectedBudget === opt.id
                            ? 'rgba(15,61,62,0.03)'
                            : 'transparent',
                          cursor: 'pointer',
                        }}
                        onClick={() => setSelectedBudget(opt.id)}
                      >
                        <p
                          style={{
                            fontFamily: 'var(--hero-mono)',
                            fontSize: '16px',
                            fontWeight: 600,
                            color: 'var(--hero-text)',
                          }}
                        >
                          {opt.label}
                        </p>
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* ── Submit ── */}
                <button
                  className="hf-cta-primary w-full flex items-center justify-center gap-2 text-white"
                  style={{
                    fontFamily: 'var(--hero-body)',
                    fontSize: '16px',
                    fontWeight: 600,
                    height: '56px',
                    background: 'var(--hero-primary)',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  Get Matched with Contractors
                  <ArrowRight className="w-4 h-4" />
                </button>

                <p
                  className="text-center mt-4"
                  style={{
                    fontFamily: 'var(--hero-body)',
                    fontSize: '12px',
                    color: 'var(--hero-muted)',
                  }}
                >
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

/* ── Small helper component ── */
function TrustItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-2" style={{ color: 'rgba(18,18,18,0.4)' }}>
      {icon}
      <span
        style={{
          fontFamily: 'var(--hero-body)',
          fontSize: '13px',
          fontWeight: 500,
          color: 'rgba(18,18,18,0.45)',
        }}
      >
        {label}
      </span>
    </div>
  )
}
