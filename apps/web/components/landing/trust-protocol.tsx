'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export function TrustProtocol() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [vaultAmount, setVaultAmount] = useState(0);
  const [cardVisible, setCardVisible] = useState([false, false, false]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      setVaultAmount(448.2);
      setCardVisible([true, true, true]);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setCardVisible([true, false, false]), 300);
          setTimeout(() => setCardVisible([true, true, false]), 550);
          setTimeout(() => setCardVisible([true, true, true]), 800);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animated vault counter
  useEffect(() => {
    if (!isVisible) return;

    const target = 448.2;
    const duration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 4);
      setVaultAmount(parseFloat((target * easeOut).toFixed(1)));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible]);

  return (
    <>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes tp-flow {
          0% { stroke-dashoffset: 48; }
          100% { stroke-dashoffset: 0; }
        }
        @keyframes tp-pulse-ring {
          0% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.15); opacity: 0; }
          100% { transform: scale(1); opacity: 0; }
        }
        @keyframes tp-glow {
          0%, 100% { box-shadow: 0 0 30px rgba(15,186,189,0.3), 0 0 60px rgba(15,186,189,0.1); }
          50% { box-shadow: 0 0 50px rgba(15,186,189,0.5), 0 0 90px rgba(15,186,189,0.2); }
        }
        @keyframes tp-float-a {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          33% { transform: translateY(-18px) translateX(6px); }
          66% { transform: translateY(-8px) translateX(-4px); }
        }
        @keyframes tp-float-b {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          50% { transform: translateY(-14px) translateX(-8px); }
        }
        @keyframes tp-orbit {
          0% { transform: rotate(0deg) translateX(110px) rotate(0deg); }
          100% { transform: rotate(360deg) translateX(110px) rotate(-360deg); }
        }
        @keyframes tp-node-in {
          from { opacity: 0; transform: scale(0.5) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes tp-badge-in {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes tp-draw {
          from { stroke-dashoffset: 1600; }
          to { stroke-dashoffset: 0; }
        }
        @keyframes tp-bar-glow {
          0%, 100% { box-shadow: 0 0 6px rgba(15,186,189,0.3); }
          50% { box-shadow: 0 0 12px rgba(15,186,189,0.5); }
        }
        @keyframes tp-mobile-pulse {
          0%, 100% { transform: rotate(45deg) scale(1); box-shadow: 0 10px 30px rgba(15,186,189,0.2); }
          50% { transform: rotate(45deg) scale(1.05); box-shadow: 0 10px 40px rgba(15,186,189,0.35); }
        }
        .tp-flow-line { stroke-dasharray: 12 12; animation: tp-flow 1.2s linear infinite; }
        .tp-escrow-glow { animation: tp-glow 3s ease-in-out infinite; }
        .tp-float-a { animation: tp-float-a 7s ease-in-out infinite; }
        .tp-float-b { animation: tp-float-b 9s ease-in-out infinite; }
        .tp-orbit-dot { animation: tp-orbit 12s linear infinite; }
        .tp-node-enter { animation: tp-node-in 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275) both; }
        .tp-node-enter-d1 { animation-delay: 0.2s; }
        .tp-node-enter-d2 { animation-delay: 0.4s; }
        .tp-node-enter-d3 { animation-delay: 0.6s; }
        .tp-badge-enter { animation: tp-badge-in 0.5s ease-out 0.9s both; }
        .tp-draw-line { stroke-dasharray: 1600; animation: tp-draw 1.5s ease-out 0.1s both; }
        .tp-bar-glow { animation: tp-bar-glow 2s ease-in-out infinite; }
        .tp-mobile-hub { animation: tp-mobile-pulse 3s ease-in-out infinite; }
      `,
        }}
      />

      <section
        ref={sectionRef}
        className="relative py-20 md:py-28 overflow-hidden bg-[#f6f8f8]"
      >
        {/* Animated background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

        {/* Floating particles */}
        <div className="absolute top-16 left-[10%] w-2 h-2 rounded-full bg-primary/20 tp-float-a" />
        <div className="absolute top-32 right-[15%] w-3 h-3 rounded-full bg-primary/15 tp-float-b" />
        <div className="absolute bottom-24 left-[25%] w-2.5 h-2.5 rounded-full bg-reno-amber/20 tp-float-a" />
        <div className="absolute bottom-40 right-[30%] w-2 h-2 rounded-full bg-primary/20 tp-float-b" />
        <div className="absolute top-[45%] left-[5%] w-1.5 h-1.5 rounded-full bg-primary/25 tp-float-b" />

        <div className="max-w-7xl mx-auto px-6 relative">
          {/* Section Header */}
          <div
            className={`text-center mb-16 md:mb-20 transition-all duration-700 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            }`}
          >
            <span className="text-primary font-bold tracking-widest text-xs uppercase mb-4 block">
              Architectural Integrity
            </span>
            <h2 className="font-display text-3xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-reno-dark mb-6 leading-[1.1]">
              The Triangulated{' '}
              <br className="hidden md:block" />
              <span className="text-primary">Trust Protocol</span>
            </h2>
            <p className="max-w-2xl mx-auto text-slate-500 text-base md:text-lg leading-relaxed">
              A three-way handshake ensuring every dollar is protected, every
              contractor is verified, and every milestone is visually confirmed.
            </p>
          </div>

          {/* Main Grid: Diagram + Cards */}
          <div className="relative grid grid-cols-1 xl:grid-cols-12 gap-10 xl:gap-12 items-start">
            {/* ===== Triangle Diagram (Desktop) ===== */}
            <div
              className={`hidden xl:flex xl:col-span-8 relative min-h-[520px] items-center justify-center ${
                isVisible ? '' : 'opacity-0'
              }`}
            >
              <div className="relative w-full max-w-3xl aspect-square flex items-center justify-center">
                {/* SVG connecting lines — animated draw + flowing dashes */}
                <svg
                  className="absolute inset-0 w-full h-full"
                  viewBox="0 0 800 800"
                  fill="none"
                >
                  {/* Static faint circles around nodes */}
                  <circle
                    cx="400"
                    cy="150"
                    r="100"
                    stroke="#0fbabd"
                    strokeWidth="1"
                    opacity="0.08"
                  />
                  <circle
                    cx="150"
                    cy="600"
                    r="100"
                    stroke="#0fbabd"
                    strokeWidth="1"
                    opacity="0.08"
                  />
                  <circle
                    cx="650"
                    cy="600"
                    r="100"
                    stroke="#0fbabd"
                    strokeWidth="1"
                    opacity="0.08"
                  />

                  {/* Triangle outline — draws on scroll */}
                  {isVisible && (
                    <path
                      d="M400 150 L150 600 L650 600 Z"
                      stroke="#0fbabd"
                      strokeWidth="2"
                      opacity="0.15"
                      strokeDasharray="8 8"
                      className="tp-draw-line"
                    />
                  )}

                  {/* Animated flowing lines along each edge */}
                  {isVisible && (
                    <>
                      {/* Homeowner → Contractor */}
                      <line
                        x1="400"
                        y1="150"
                        x2="150"
                        y2="600"
                        stroke="#0fbabd"
                        strokeWidth="2.5"
                        opacity="0.35"
                        className="tp-flow-line"
                      />
                      {/* Contractor → Escrow */}
                      <line
                        x1="150"
                        y1="600"
                        x2="650"
                        y2="600"
                        stroke="#0fbabd"
                        strokeWidth="2.5"
                        opacity="0.35"
                        className="tp-flow-line"
                        style={{ animationDelay: '0.4s' }}
                      />
                      {/* Escrow → Homeowner */}
                      <line
                        x1="650"
                        y1="600"
                        x2="400"
                        y2="150"
                        stroke="#0fbabd"
                        strokeWidth="2.5"
                        opacity="0.35"
                        className="tp-flow-line"
                        style={{ animationDelay: '0.8s' }}
                      />
                    </>
                  )}
                </svg>

                {/* Orbiting dot around center */}
                {isVisible && (
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="tp-orbit-dot">
                      <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_rgba(15,186,189,0.6)]" />
                    </div>
                  </div>
                )}

                {/* Node: Homeowner (top) */}
                <div
                  className={`absolute top-[5%] left-1/2 -translate-x-1/2 group ${
                    isVisible ? 'tp-node-enter tp-node-enter-d1' : 'opacity-0'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    {/* Pulse ring */}
                    <div className="relative">
                      {isVisible && (
                        <div
                          className="absolute inset-0 rounded-full bg-primary/20"
                          style={{ animation: 'tp-pulse-ring 3s ease-out infinite' }}
                        />
                      )}
                      <div className="relative w-24 h-24 rounded-full bg-white shadow-2xl flex items-center justify-center border-4 border-primary/20 group-hover:scale-110 transition-transform duration-300">
                        <span
                          className="material-symbols-outlined text-4xl text-primary"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          person
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 px-4 py-2 bg-white/70 backdrop-blur-xl rounded-full text-sm font-bold tracking-tight shadow-lg border border-primary/10">
                      Homeowner
                    </div>
                  </div>
                </div>

                {/* Node: Contractor (bottom-left) */}
                <div
                  className={`absolute bottom-[15%] left-[5%] group ${
                    isVisible ? 'tp-node-enter tp-node-enter-d2' : 'opacity-0'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      {isVisible && (
                        <div
                          className="absolute inset-0 rounded-full bg-primary/20"
                          style={{
                            animation: 'tp-pulse-ring 3s ease-out 1s infinite',
                          }}
                        />
                      )}
                      <div className="relative w-24 h-24 rounded-full bg-white shadow-2xl flex items-center justify-center border-4 border-primary/20 group-hover:scale-110 transition-transform duration-300">
                        <span
                          className="material-symbols-outlined text-4xl text-primary"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          construction
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 px-4 py-2 bg-white/70 backdrop-blur-xl rounded-full text-sm font-bold tracking-tight shadow-lg border border-primary/10">
                      Contractor
                    </div>
                  </div>
                </div>

                {/* Node: RenoNext Escrow (bottom-right) — glowing hub */}
                <div
                  className={`absolute bottom-[15%] right-[5%] group ${
                    isVisible ? 'tp-node-enter tp-node-enter-d3' : 'opacity-0'
                  }`}
                >
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      {/* Outer pulse rings */}
                      {isVisible && (
                        <>
                          <div
                            className="absolute -inset-3 rounded-full border-2 border-primary/30"
                            style={{
                              animation:
                                'tp-pulse-ring 3s ease-out 0.5s infinite',
                            }}
                          />
                          <div
                            className="absolute -inset-6 rounded-full border border-primary/15"
                            style={{
                              animation:
                                'tp-pulse-ring 3s ease-out 1.5s infinite',
                            }}
                          />
                        </>
                      )}
                      <div className="relative w-32 h-32 rounded-full bg-primary flex items-center justify-center border-8 border-white group-hover:scale-110 transition-transform duration-300 tp-escrow-glow">
                        <span
                          className="material-symbols-outlined text-5xl text-white"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          shield_with_heart
                        </span>
                      </div>
                    </div>
                    <div className="mt-4 px-6 py-2 bg-reno-dark text-white rounded-full text-sm font-bold tracking-tight shadow-xl">
                      RenoNext Escrow
                    </div>
                  </div>
                </div>

                {/* Central "Trust" Badge — enters with scale */}
                <div
                  className={`absolute inset-0 flex items-center justify-center ${
                    isVisible ? 'tp-badge-enter' : 'opacity-0'
                  }`}
                >
                  <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl flex flex-col items-center gap-2 shadow-2xl border border-primary/30">
                    <span
                      className="material-symbols-outlined text-primary text-3xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      verified_user
                    </span>
                    <div className="text-xs font-bold uppercase tracking-widest text-primary">
                      Active Protection
                    </div>
                    <div className="text-2xl font-black text-reno-dark">
                      100% Secured
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* ===== Vertical Diagram (Mobile/Tablet) ===== */}
            <div
              className={`xl:hidden relative py-4 mb-4 transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              }`}
            >
              {/* Vertical center line — gradient */}
              <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary/5 via-primary/40 to-primary/5 -translate-x-1/2" />
              {/* Flowing overlay on center line */}
              {isVisible && (
                <div
                  className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 overflow-hidden"
                >
                  <div
                    className="w-full h-8 bg-gradient-to-b from-transparent via-primary to-transparent opacity-40"
                    style={{
                      animation: 'tp-mobile-flow 2.5s linear infinite',
                    }}
                  />
                  <style
                    dangerouslySetInnerHTML={{
                      __html: `
                    @keyframes tp-mobile-flow {
                      0% { transform: translateY(-32px); }
                      100% { transform: translateY(400px); }
                    }
                  `,
                    }}
                  />
                </div>
              )}

              <div className="space-y-12 relative">
                {/* Node 1: Homeowner */}
                <div
                  className={`flex flex-col items-center transition-all duration-500 ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                >
                  <div className="w-14 h-14 rounded-full bg-white border border-primary/20 flex items-center justify-center shadow-float z-10">
                    <span
                      className="material-symbols-outlined text-primary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      person
                    </span>
                  </div>
                  <div className="mt-3 text-center">
                    <span className="block text-[10px] uppercase tracking-widest font-bold text-primary">
                      Originator
                    </span>
                    <span className="text-sm font-semibold">Homeowner</span>
                  </div>
                </div>

                {/* Node 2: Escrow (Center Hub) — pulsing */}
                <div
                  className={`flex flex-col items-center transition-all duration-500 delay-150 ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                >
                  <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center shadow-xl shadow-primary/20 z-10 tp-mobile-hub">
                    <div className="-rotate-45">
                      <span
                        className="material-symbols-outlined text-white text-3xl"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        account_balance_wallet
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 text-center">
                    <span className="block text-[10px] uppercase tracking-widest font-bold text-primary">
                      Verification Layer
                    </span>
                    <span className="text-base font-bold">
                      RenoNext Escrow
                    </span>
                  </div>
                </div>

                {/* Node 3: Contractor */}
                <div
                  className={`flex flex-col items-center transition-all duration-500 delay-300 ${
                    isVisible
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 translate-y-4'
                  }`}
                >
                  <div className="w-14 h-14 rounded-full bg-white border border-primary/20 flex items-center justify-center shadow-float z-10">
                    <span
                      className="material-symbols-outlined text-primary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      construction
                    </span>
                  </div>
                  <div className="mt-3 text-center">
                    <span className="block text-[10px] uppercase tracking-widest font-bold text-primary">
                      Execution
                    </span>
                    <span className="text-sm font-semibold">Contractor</span>
                  </div>
                </div>
              </div>
            </div>

            {/* ===== Bento Sidebar Cards (staggered entrance) ===== */}
            <div className="xl:col-span-4 flex flex-col gap-6">
              {/* Card 1: Vetting Engine */}
              <div
                className={`bg-white/70 backdrop-blur-xl p-7 rounded-2xl shadow-float hover:-translate-y-1 transition-all duration-500 group border border-primary/5 ${
                  cardVisible[0]
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                    <span
                      className="material-symbols-outlined"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      fact_check
                    </span>
                  </div>
                  <span className="px-3 py-1 bg-reno-green-100 text-reno-green-700 text-[10px] font-bold uppercase rounded-full">
                    Real-Time Vetting
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-5 text-reno-dark">
                  Vetting Engine
                </h3>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between items-center text-sm mb-1.5">
                      <span className="text-slate-500">
                        Identity Verification
                      </span>
                      <span className="font-bold text-primary">99.8%</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className={`bg-primary h-full rounded-full transition-all duration-[1500ms] ease-out ${
                          cardVisible[0] ? 'tp-bar-glow' : ''
                        }`}
                        style={{ width: cardVisible[0] ? '99.8%' : '0%' }}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between items-center text-sm mb-1.5">
                      <span className="text-slate-500">
                        License Validation
                      </span>
                      <span className="font-bold text-primary">Provincial</span>
                    </div>
                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                      <div
                        className="bg-primary/30 h-full rounded-full transition-all duration-[1500ms] delay-300 ease-out"
                        style={{ width: cardVisible[0] ? '100%' : '0%' }}
                      />
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 italic mt-3">
                    &ldquo;Continuous background monitoring ensures zero-gap
                    compliance — WSIB, insurance, OBC license.&rdquo;
                  </p>
                </div>
              </div>

              {/* Card 2: The Vault */}
              <div
                className={`bg-white/70 backdrop-blur-xl p-7 rounded-2xl shadow-float hover:-translate-y-1 transition-all duration-500 group border-l-4 border-l-primary border border-primary/5 ${
                  cardVisible[1]
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <span
                      className="material-symbols-outlined"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      lock
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-reno-dark">
                      The Vault
                    </h3>
                    <p className="text-xs text-slate-500">
                      Secure Capital Management
                    </p>
                  </div>
                </div>
                <div className="mb-5">
                  <div className="text-4xl font-extrabold tracking-tight text-reno-dark">
                    ${vaultAmount.toFixed(1)}M
                  </div>
                  <div className="text-xs font-medium text-slate-500 mt-1 uppercase tracking-wider">
                    Platform Volume Secured
                  </div>
                </div>
                <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                  <div className="flex items-center gap-2.5 text-xs font-semibold text-primary">
                    <span
                      className="material-symbols-outlined text-sm"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      security_update_good
                    </span>
                    Bank-held escrow accounts
                  </div>
                </div>
              </div>

              {/* Card 3: Milestone Tracker */}
              <div
                className={`bg-white/70 backdrop-blur-xl rounded-2xl shadow-float hover:-translate-y-1 transition-all duration-500 relative overflow-hidden group border border-primary/5 ${
                  cardVisible[2]
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                }`}
              >
                {/* Ambient glow */}
                <div className="absolute -top-4 -right-4 w-32 h-32 bg-primary/5 rounded-full blur-3xl pointer-events-none" />

                {/* Image area with gradient placeholder */}
                <div className="h-48 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-reno-dark via-[#0a3f40] to-reno-dark" />
                  {/* Architectural grid overlay */}
                  <div
                    className="absolute inset-0 opacity-10"
                    style={{
                      backgroundImage:
                        'linear-gradient(rgba(15,186,189,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(15,186,189,0.4) 1px, transparent 1px)',
                      backgroundSize: '24px 24px',
                    }}
                  />
                  {/* Decorative shapes — subtle parallax on hover */}
                  <div className="absolute top-8 left-8 w-20 h-14 border-2 border-white/20 rounded-lg group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500" />
                  <div className="absolute top-12 left-14 w-24 h-16 border border-primary/30 rounded-lg bg-primary/5 group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
                  <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-reno-dark/80 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end text-white">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-primary/50">
                        Current Phase
                      </span>
                      <h4 className="text-base font-bold">
                        Kitchen Cabinet Installation
                      </h4>
                    </div>
                    <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-semibold">
                      Phase 2 of 5
                    </span>
                  </div>
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full border-2 border-primary flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-primary">2</span>
                    </div>
                    <p className="text-sm text-slate-500">
                      Quality inspection verified. Funds pending release.
                    </p>
                  </div>
                  <Link
                    href="/how-it-works#vault"
                    className="flex items-center justify-center gap-2 w-full bg-reno-dark text-white py-3.5 rounded-xl font-bold text-sm tracking-wide hover:bg-reno-dark/90 active:scale-[0.98] transition-all duration-200"
                  >
                    <span className="material-symbols-outlined text-lg">
                      payments
                    </span>
                    See How Payments Work
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
