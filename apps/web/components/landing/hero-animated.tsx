'use client'

import Link from 'next/link'
import { ArrowRight, ChevronDown } from 'lucide-react'

export function HeroAnimated() {
  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideInUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(10deg); }
          66% { transform: translate(-20px, -60px) rotate(-10deg); }
        }

        @keyframes floatSlow {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          50% { transform: translate(-40px, -80px) rotate(15deg); }
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes borderCycle {
          0%, 100% { border-color: #1D6B3F; }
          50% { border-color: #0D7377; }
        }

        @keyframes iconFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-3px); }
        }

        .hero-headline {
          animation: fadeInUp 0.6s ease-out forwards;
        }

        .hero-subtext {
          animation: fadeInUp 0.6s ease-out 0.3s forwards;
          opacity: 0;
        }

        .hero-ctas {
          animation: fadeInUp 0.6s ease-out 0.6s forwards;
          opacity: 0;
        }

        .hero-trust-strip {
          animation: slideInUp 0.8s ease-out 0.9s forwards;
          opacity: 0;
        }

        .trust-badge {
          animation: fadeIn 0.6s ease-out forwards;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .trust-badge:nth-child(1) { animation-delay: 1s; opacity: 0; }
        .trust-badge:nth-child(2) { animation-delay: 1.1s; opacity: 0; }
        .trust-badge:nth-child(3) { animation-delay: 1.2s; opacity: 0; }
        .trust-badge:nth-child(4) { animation-delay: 1.3s; opacity: 0; }

        .trust-badge-icon {
          animation: iconFloat 4s ease-in-out infinite;
        }

        .trust-badge:nth-child(2) .trust-badge-icon { animation-delay: 1s; }
        .trust-badge:nth-child(3) .trust-badge-icon { animation-delay: 2s; }
        .trust-badge:nth-child(4) .trust-badge-icon { animation-delay: 3s; }

        .trust-badge:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 24px rgba(157, 201, 171, 0.15);
        }

        .scroll-indicator {
          animation: bounce 2s ease-in-out infinite;
        }

        .animated-bg {
          background: linear-gradient(135deg, #1A1A1A 0%, #1D6B3F 50%, #0D7377 100%);
          background-size: 400% 400%;
          animation: gradientShift 15s ease infinite;
        }

        .spotlight {
          background: radial-gradient(circle at 50% 40%, rgba(29, 107, 63, 0.15) 0%, transparent 60%);
        }

        .floating-shape {
          position: absolute;
          opacity: 0.1;
          pointer-events: none;
        }

        .shape-1 {
          width: 100px; height: 100px;
          border: 2px solid #1D6B3F; border-radius: 50%;
          top: 10%; left: 10%;
          animation: float 20s ease-in-out infinite;
        }

        .shape-2 {
          width: 60px; height: 60px;
          border: 2px solid #0D7377;
          top: 60%; right: 15%;
          animation: floatSlow 25s ease-in-out infinite;
        }

        .shape-3 {
          width: 80px; height: 80px;
          border: 2px solid #1D6B3F; border-radius: 50%;
          bottom: 20%; left: 20%;
          animation: float 30s ease-in-out infinite reverse;
        }

        .shape-4 {
          width: 120px; height: 2px;
          background: linear-gradient(90deg, transparent, #0D7377, transparent);
          top: 30%; right: 10%;
          animation: floatSlow 18s ease-in-out infinite;
        }

        .shape-5 {
          width: 40px; height: 40px;
          border: 2px solid #1D6B3F; border-radius: 50%;
          top: 40%; left: 80%;
          animation: float 22s ease-in-out infinite;
        }

        .btn-shine {
          position: relative;
          overflow: hidden;
        }

        .btn-shine::before {
          content: '';
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          transform: translateX(-100%);
          transition: transform 0.6s;
        }

        .btn-shine:hover::before {
          animation: shimmer 1.5s ease-in-out infinite;
        }

        .btn-outline {
          border: 2px solid #1D6B3F;
          animation: borderCycle 3s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-headline, .hero-subtext, .hero-ctas,
          .hero-trust-strip, .trust-badge, .trust-badge-icon,
          .scroll-indicator, .animated-bg, .floating-shape,
          .btn-shine::before, .btn-outline {
            animation: none !important;
            transition: none !important;
          }

          .hero-headline, .hero-subtext, .hero-ctas,
          .hero-trust-strip, .trust-badge {
            opacity: 1 !important;
          }
        }

        @media (max-width: 768px) {
          .shape-2, .shape-4, .shape-5 { display: none; }
        }
      `}</style>

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated Background */}
        <div className="animated-bg absolute inset-0" />
        <div className="spotlight absolute inset-0" />

        {/* Floating Shapes */}
        <div className="floating-shape shape-1" />
        <div className="floating-shape shape-2" />
        <div className="floating-shape shape-3" />
        <div className="floating-shape shape-4" />
        <div className="floating-shape shape-5" />

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
          {/* Headline */}
          <h1 className="hero-headline font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
            Your renovation shouldn't
            <br />
            feel like a{' '}
            <span
              className="text-transparent bg-clip-text bg-gradient-to-r from-[#9DC9AB] via-[#80D8DA] to-[#B3E8E9]"
              style={{ textShadow: '0 0 40px rgba(128,216,218,0.3)' }}
            >
              gamble
            </span>
            .
          </h1>

          {/* Subtext */}
          <p className="hero-subtext text-xl md:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Connect with verified contractors, track every milestone, and only release funds when the work is done right.
          </p>

          {/* CTAs */}
          <div className="hero-ctas flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link
              href="/signup"
              className="btn-shine group px-8 py-4 bg-[#1D6B3F] hover:bg-[#145530] text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2"
            >
              Start a Project
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/join"
              className="btn-outline group px-8 py-4 bg-transparent text-white font-semibold rounded-lg transition-all duration-300 hover:scale-105 hover:bg-white/5 flex items-center gap-2"
            >
              I&apos;m a Contractor
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Trust Strip */}
          <div className="hero-trust-strip inline-block">
            <div
              className="relative backdrop-blur-xl bg-white/[0.08] rounded-2xl border border-white/[0.15] px-6 py-6 md:px-10"
              style={{
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255,255,255,0.06)',
              }}
            >
              {/* Decorative SVG behind badges */}
              <svg className="pointer-events-none absolute inset-0 h-full w-full overflow-visible" aria-hidden>
                {/* Connecting dots between badges */}
                <line x1="25%" y1="50%" x2="50%" y2="50%" stroke="rgba(157,201,171,0.12)" strokeWidth="1" strokeDasharray="3 5" className="hidden md:block" />
                <line x1="50%" y1="50%" x2="75%" y2="50%" stroke="rgba(128,216,218,0.12)" strokeWidth="1" strokeDasharray="3 5" className="hidden md:block" />
                {/* Corner accents */}
                <line x1="8" y1="8" x2="8" y2="28" stroke="rgba(157,201,171,0.2)" strokeWidth="1" />
                <line x1="8" y1="8" x2="28" y2="8" stroke="rgba(157,201,171,0.2)" strokeWidth="1" />
                <line x1="100%" y1="100%" x2="100%" y2="100%" stroke="rgba(128,216,218,0.2)" strokeWidth="1" transform="translate(-8,-8)" />
                <rect x="calc(100% - 28px)" y="calc(100% - 8px)" width="20" height="1" fill="rgba(128,216,218,0.2)" />
                <rect x="calc(100% - 8px)" y="calc(100% - 28px)" width="1" height="20" fill="rgba(128,216,218,0.2)" />
              </svg>

              <div className="relative grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                {/* WSIB Verified */}
                <div className="trust-badge flex flex-col items-center gap-3 rounded-xl px-3 py-3 cursor-default">
                  <div className="trust-badge-icon relative">
                    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                      {/* Outer ring */}
                      <circle cx="28" cy="28" r="27" stroke="rgba(157,201,171,0.2)" strokeWidth="1" />
                      <circle cx="28" cy="28" r="23" stroke="rgba(157,201,171,0.08)" strokeWidth="1" strokeDasharray="3 4" />
                      {/* Badge background */}
                      <circle cx="28" cy="28" r="20" fill="rgba(255,255,255,0.06)" />
                      {/* Shield icon */}
                      <path d="M28 14l10 5v8c0 6.5-4.3 12.5-10 14-5.7-1.5-10-7.5-10-14v-8l10-5z" fill="none" stroke="#9DC9AB" strokeWidth="1.5" strokeLinejoin="round" />
                      <path d="M23 28l3 3 7-7" stroke="#9DC9AB" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <span className="text-sm font-semibold text-white/95 block">WSIB Verified</span>
                    <span className="text-[10px] text-white/40 mt-0.5 block">Insurance covered</span>
                  </div>
                </div>

                {/* Permit Tracking */}
                <div className="trust-badge flex flex-col items-center gap-3 rounded-xl px-3 py-3 cursor-default">
                  <div className="trust-badge-icon relative">
                    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                      <circle cx="28" cy="28" r="27" stroke="rgba(128,216,218,0.2)" strokeWidth="1" />
                      <circle cx="28" cy="28" r="23" stroke="rgba(128,216,218,0.08)" strokeWidth="1" strokeDasharray="3 4" />
                      <circle cx="28" cy="28" r="20" fill="rgba(255,255,255,0.06)" />
                      {/* Document with seal */}
                      <rect x="20" y="15" width="16" height="22" rx="2" fill="none" stroke="#80D8DA" strokeWidth="1.5" />
                      <line x1="24" y1="22" x2="32" y2="22" stroke="#80D8DA" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
                      <line x1="24" y1="26" x2="30" y2="26" stroke="#80D8DA" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
                      <line x1="24" y1="30" x2="28" y2="30" stroke="#80D8DA" strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
                      {/* Stamp/seal */}
                      <circle cx="33" cy="33" r="6" fill="#0e3a3c" stroke="#80D8DA" strokeWidth="1.2" />
                      <path d="M30.5 33l1.5 1.5 3-3" stroke="#80D8DA" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <span className="text-sm font-semibold text-white/95 block">Permit Tracking</span>
                    <span className="text-[10px] text-white/40 mt-0.5 block">Code compliant</span>
                  </div>
                </div>

                {/* Milestone Funds */}
                <div className="trust-badge flex flex-col items-center gap-3 rounded-xl px-3 py-3 cursor-default">
                  <div className="trust-badge-icon relative">
                    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                      <circle cx="28" cy="28" r="27" stroke="rgba(157,201,171,0.2)" strokeWidth="1" />
                      <circle cx="28" cy="28" r="23" stroke="rgba(157,201,171,0.08)" strokeWidth="1" strokeDasharray="3 4" />
                      <circle cx="28" cy="28" r="20" fill="rgba(255,255,255,0.06)" />
                      {/* Vault/safe icon */}
                      <rect x="18" y="19" width="20" height="18" rx="3" fill="none" stroke="#9DC9AB" strokeWidth="1.5" />
                      <rect x="18" y="19" width="20" height="5" rx="3" fill="none" stroke="#9DC9AB" strokeWidth="1.5" />
                      {/* Lock on vault */}
                      <circle cx="28" cy="31" r="3" fill="none" stroke="#9DC9AB" strokeWidth="1.3" />
                      <line x1="28" y1="31" x2="28" y2="34" stroke="#9DC9AB" strokeWidth="1.3" strokeLinecap="round" />
                      {/* Progress ticks */}
                      <rect x="20" y="39" width="4" height="2" rx="1" fill="#9DC9AB" opacity="0.8" />
                      <rect x="26" y="39" width="4" height="2" rx="1" fill="#9DC9AB" opacity="0.5" />
                      <rect x="32" y="39" width="4" height="2" rx="1" fill="#9DC9AB" opacity="0.25" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <span className="text-sm font-semibold text-white/95 block">Milestone Funds</span>
                    <span className="text-[10px] text-white/40 mt-0.5 block">Escrow protected</span>
                  </div>
                </div>

                {/* GPS Verified */}
                <div className="trust-badge flex flex-col items-center gap-3 rounded-xl px-3 py-3 cursor-default">
                  <div className="trust-badge-icon relative">
                    <svg width="56" height="56" viewBox="0 0 56 56" fill="none">
                      <circle cx="28" cy="28" r="27" stroke="rgba(128,216,218,0.2)" strokeWidth="1" />
                      <circle cx="28" cy="28" r="23" stroke="rgba(128,216,218,0.08)" strokeWidth="1" strokeDasharray="3 4" />
                      <circle cx="28" cy="28" r="20" fill="rgba(255,255,255,0.06)" />
                      {/* Pin icon */}
                      <path d="M28 38s-9-7.2-9-13.5a9 9 0 1118 0C37 30.8 28 38 28 38z" fill="none" stroke="#80D8DA" strokeWidth="1.5" />
                      <circle cx="28" cy="24.5" r="3.5" fill="none" stroke="#80D8DA" strokeWidth="1.3" />
                      {/* Satellite rings */}
                      <ellipse cx="28" cy="24.5" rx="8" ry="3" fill="none" stroke="#80D8DA" strokeWidth="0.7" opacity="0.35" transform="rotate(-30 28 24.5)" />
                      <ellipse cx="28" cy="24.5" rx="8" ry="3" fill="none" stroke="#80D8DA" strokeWidth="0.7" opacity="0.25" transform="rotate(30 28 24.5)" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <span className="text-sm font-semibold text-white/95 block">GPS Verified</span>
                    <span className="text-[10px] text-white/40 mt-0.5 block">Photo proof</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="scroll-indicator flex flex-col items-center gap-2 text-white/80 cursor-pointer hover:text-white transition-colors">
            <span className="text-sm font-medium">Scroll to explore</span>
            <ChevronDown className="w-6 h-6" />
          </div>
        </div>
      </section>
    </>
  )
}
