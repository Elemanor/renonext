'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function ProjectShowcase() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [metricsVisible, setMetricsVisible] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      setMetricsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setTimeout(() => setMetricsVisible(true), 400);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden bg-white"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <header
          className={`mb-12 md:mb-16 max-w-3xl transition-all duration-700 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6">
            <span
              className="material-symbols-outlined text-sm"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
            Verified Success Story
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-reno-dark leading-[1.1] mb-5">
            From <span className="text-primary italic">Flooded</span> to
            Fortress.
          </h2>
          <p className="text-lg text-slate-500 leading-relaxed">
            See how RenoNext&apos;s trust architecture enabled an ambitious
            basement waterproofing through vetted professionals and secure
            milestone payments.
          </p>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ===== Left Column: Data Cards ===== */}
          <div
            className={`lg:col-span-5 space-y-6 relative z-10 transition-all duration-700 delay-100 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Contractor Identity Card */}
            <div className="bg-white p-6 md:p-7 rounded-2xl shadow-float border border-primary/5 hover:-translate-y-1 transition-transform duration-300">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center overflow-hidden border border-slate-200">
                    <Image
                      src="/images/pros/dryspace/hero.webp"
                      alt="DrySpace Waterproofing"
                      width={48}
                      height={48}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold tracking-tight text-reno-dark">
                      DrySpace Waterproofing
                    </h3>
                    <p className="text-xs text-slate-500">
                      Sub-Grade Waterproofing Specialist
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-sm"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-slate-500 mt-0.5">
                    5.0 Customer Rating
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                {/* Escrow release speed */}
                <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#f6f8f8]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                      <span className="material-symbols-outlined text-lg">
                        payments
                      </span>
                    </div>
                    <span className="font-medium text-sm text-reno-dark">
                      Fastest Escrow Release
                    </span>
                  </div>
                  <span className="font-bold text-primary">24 Hours</span>
                </div>

                {/* Verified badge */}
                <div className="flex items-center gap-3 p-3.5 rounded-xl border border-primary/20 bg-white shadow-sm">
                  <span
                    className="material-symbols-outlined text-primary text-2xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    military_tech
                  </span>
                  <div>
                    <h4 className="font-bold text-sm text-reno-dark">
                      Verified Gold Pro
                    </h4>
                    <p className="text-[10px] text-slate-500">
                      Top 5% vetted performance tier
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Project Metrics Bento */}
            <div className="grid grid-cols-2 gap-4">
              <div
                className={`bg-[#f6f8f8] p-5 rounded-2xl transition-all duration-500 ${
                  metricsVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
              >
                <span className="material-symbols-outlined text-primary/40 mb-2 block">
                  speed
                </span>
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-1">
                  Completion
                </p>
                <p className="text-3xl font-extrabold text-primary tracking-tight">
                  18 <span className="text-base font-bold text-slate-400">Days</span>
                </p>
              </div>
              <div
                className={`bg-[#f6f8f8] p-5 rounded-2xl transition-all duration-500 delay-100 ${
                  metricsVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-4'
                }`}
              >
                <span className="material-symbols-outlined text-primary/40 mb-2 block">
                  security
                </span>
                <p className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-1">
                  Budget Safety
                </p>
                <p className="text-3xl font-extrabold text-primary tracking-tight">
                  100<span className="text-base font-bold text-slate-400">%</span>
                </p>
              </div>
            </div>

            {/* Dark Challenge Card */}
            <div
              className={`p-7 bg-reno-dark rounded-2xl text-white relative overflow-hidden transition-all duration-500 delay-200 ${
                metricsVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="absolute -right-8 -bottom-8 w-32 h-32 bg-primary/20 blur-3xl rounded-full pointer-events-none" />
              <div className="relative z-10">
                <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                  <span className="h-1 w-5 bg-primary rounded-full" />
                  The Challenge
                </h3>
                <p className="text-slate-400 text-sm leading-relaxed mb-5">
                  Severe structural water ingress had rendered this 1,200 sq.ft.
                  basement unusable for over a decade. DrySpace utilized
                  RenoNext&apos;s tiered milestone system to prove structural
                  integrity before moving to the high-end interior phase.
                </p>
                <Link
                  href="/pros"
                  className="inline-flex items-center gap-2 text-primary font-bold text-sm hover:gap-3 transition-all"
                >
                  View Full Case Study
                  <span className="material-symbols-outlined text-sm">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* ===== Right Column: Visual Showcase ===== */}
          <div
            className={`lg:col-span-7 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 items-stretch transition-all duration-700 delay-200 ${
              isVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Main After Image */}
            <div className="md:col-span-2 group relative h-[240px] sm:h-[360px] md:h-[460px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/images/pros/dryspace/interior.webp"
                alt="Completed interior waterproofing system by DrySpace Waterproofing"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 60vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex flex-col justify-end p-6 md:p-8">
                <div className="flex items-center gap-3 mb-2">
                  <span className="px-3 py-1 rounded-full bg-primary text-white text-[10px] font-bold uppercase tracking-widest">
                    After
                  </span>
                  <span className="text-white/60 text-xs font-medium uppercase tracking-widest">
                    Interior Waterproofing System
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-bold text-white">
                  Transparent Transformation
                </h3>
              </div>
            </div>

            {/* Before Image */}
            <div className="group relative rounded-2xl overflow-hidden aspect-[4/5] shadow-xl">
              <Image
                src="/images/pros/dryspace/crack-repair.webp"
                alt="Foundation crack before repair — DrySpace Waterproofing"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 30vw"
              />
              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500" />
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-widest border border-white/30">
                  Before
                </span>
              </div>
            </div>

            {/* Technical Detail Card */}
            <div className="bg-[#f6f8f8] rounded-2xl overflow-hidden aspect-[4/5] p-5 flex flex-col justify-between border border-primary/5">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-primary">
                  <span className="material-symbols-outlined text-lg">
                    architecture
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-widest">
                    Technical Specs
                  </span>
                </div>
                <div className="space-y-3">
                  {[
                    {
                      icon: 'layers',
                      title: 'Exterior Membrane',
                      desc: 'Full excavation with industrial-grade waterproofing membrane applied to foundation walls.',
                    },
                    {
                      icon: 'settings_input_component',
                      title: 'Dual Sump Array',
                      desc: 'Battery-backup sump pump system with 2,400 GPH throughput capacity.',
                    },
                    {
                      icon: 'air',
                      title: 'Drainage System',
                      desc: 'Interior French drain with dimpled membrane for permanent water management.',
                    },
                  ].map((spec) => (
                    <div key={spec.icon} className="flex gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span
                          className="material-symbols-outlined text-primary text-sm"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {spec.icon}
                        </span>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-reno-dark">
                          {spec.title}
                        </p>
                        <p className="text-[10px] text-slate-500 leading-relaxed">
                          {spec.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mini gallery strip */}
              <div className="flex gap-2 mt-4">
                {[
                  { src: '/images/pros/dryspace/membrane.webp', alt: 'Membrane' },
                  { src: '/images/pros/dryspace/sump-pump.webp', alt: 'Sump pump' },
                  { src: '/images/pros/dryspace/exterior-2.webp', alt: 'Excavation' },
                ].map((img) => (
                  <div
                    key={img.alt}
                    className="relative w-1/3 aspect-[4/3] rounded-lg overflow-hidden border border-white shadow-sm"
                  >
                    <Image
                      src={img.src}
                      alt={img.alt}
                      fill
                      className="object-cover"
                      sizes="100px"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Trust Bar */}
        <div
          className={`mt-16 md:mt-20 py-8 border-y border-primary/10 flex flex-wrap justify-center gap-8 md:gap-20 transition-all duration-700 delay-500 ${
            isVisible
              ? 'opacity-60 hover:opacity-100'
              : 'opacity-0'
          }`}
        >
          {[
            { icon: 'verified_user', label: 'ARCH-AUDIT' },
            { icon: 'gpp_good', label: 'TRUST-SEAL' },
            { icon: 'shield_with_heart', label: 'SAFE-PAY' },
          ].map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2 font-bold text-lg md:text-xl tracking-tighter text-reno-dark grayscale hover:grayscale-0 transition-all duration-500"
            >
              <span className="material-symbols-outlined text-primary">
                {badge.icon}
              </span>
              {badge.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
