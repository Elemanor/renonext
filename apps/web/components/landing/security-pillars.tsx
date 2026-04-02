'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export function SecurityPillars() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [cardVisibility, setCardVisibility] = useState([false, false, false]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      setCardVisibility([true, true, true]);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            setTimeout(() => setCardVisibility([true, false, false]), 100);
            setTimeout(() => setCardVisibility([true, true, false]), 250);
            setTimeout(() => setCardVisibility([true, true, true]), 400);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 px-6 overflow-hidden bg-[#f6f8f8]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div
          className={`mb-14 md:mb-16 max-w-2xl transition-all duration-700 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          }`}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span
              className="material-symbols-outlined text-primary text-base"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified_user
            </span>
            <span className="text-sm font-semibold tracking-wide text-primary uppercase">
              The Trust Protocol
            </span>
          </div>

          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-reno-dark leading-tight mb-4">
            Built for visionaries,{' '}
            <span className="text-primary">secured</span> for peace of mind.
          </h2>
          <p className="text-slate-600 text-lg md:text-xl leading-relaxed">
            Every dollar is protected, every contractor is vetted, and every
            milestone is tracked — so you can focus on the vision, not the risk.
          </p>
        </div>

        {/* Three Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14 md:mb-16">
          {/* Card 1: Absolute Escrow Security */}
          <div
            className={`group relative bg-white rounded-2xl p-7 shadow-float transition-all duration-500 hover:-translate-y-1 hover:shadow-float-hover ${
              cardVisibility[0]
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '0ms' }}
          >
            {/* Ghost icon */}
            <span className="material-symbols-outlined absolute top-5 right-5 text-5xl text-primary/10 select-none pointer-events-none transition-colors duration-300 group-hover:text-primary/20">
              security
            </span>

            {/* Main icon */}
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
              <span
                className="material-symbols-outlined text-primary text-2xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                shield_lock
              </span>
            </div>

            <h3 className="font-display text-xl font-bold text-reno-dark mb-2">
              Absolute Escrow Security
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-5">
              Funds are held in a regulated escrow account until work is
              verified. No contractor touches your money until you approve each
              milestone.
            </p>

            <Link
              href="/how-it-works#vault"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary transition-colors"
            >
              Learn about protection
              <span className="material-symbols-outlined text-base">
                arrow_forward
              </span>
            </Link>
          </div>

          {/* Card 2: Top 5% Vetted Pros */}
          <div
            className={`group relative bg-white rounded-2xl p-7 shadow-float transition-all duration-500 hover:-translate-y-1 hover:shadow-float-hover ${
              cardVisibility[1]
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '150ms' }}
          >
            {/* Ghost icon */}
            <span className="material-symbols-outlined absolute top-5 right-5 text-5xl text-primary/10 select-none pointer-events-none transition-colors duration-300 group-hover:text-primary/20">
              architecture
            </span>

            {/* Main icon */}
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
              <span
                className="material-symbols-outlined text-primary text-2xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
            </div>

            <h3 className="font-display text-xl font-bold text-reno-dark mb-2">
              Top 5% Vetted Pros
            </h3>

            {/* Badge + stacked avatars row */}
            <div className="flex items-center gap-3 mb-4">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-xs font-bold text-primary">
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  workspace_premium
                </span>
                Top 5% Vetted
              </span>
              {/* Stacked avatars */}
              <div className="flex -space-x-2">
                {['#0fbabd', '#0D9FA1', '#08696A', '#E8AA42'].map(
                  (bg, i) => (
                    <div
                      key={i}
                      className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-bold"
                      style={{ backgroundColor: bg }}
                    >
                      {['DS', 'IF', 'MX', 'SP'][i]}
                    </div>
                  )
                )}
              </div>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed mb-5">
              WSIB-active, insured, OBC-licensed, and identity-verified. Only
              the most qualified contractors make it onto our platform.
            </p>

            <Link
              href="/pros"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary transition-colors"
            >
              Browse verified pros
              <span className="material-symbols-outlined text-base">
                arrow_forward
              </span>
            </Link>
          </div>

          {/* Card 3: Milestone-Based Payments */}
          <div
            className={`group relative bg-white rounded-2xl p-7 shadow-float transition-all duration-500 hover:-translate-y-1 hover:shadow-float-hover ${
              cardVisibility[2]
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '300ms' }}
          >
            {/* Ghost icon */}
            <span className="material-symbols-outlined absolute top-5 right-5 text-5xl text-primary/10 select-none pointer-events-none transition-colors duration-300 group-hover:text-primary/20">
              receipt_long
            </span>

            {/* Main icon */}
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-5">
              <span
                className="material-symbols-outlined text-primary text-2xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                payments
              </span>
            </div>

            <h3 className="font-display text-xl font-bold text-reno-dark mb-2">
              Milestone-Based Payments
            </h3>

            {/* Mini progress tracker */}
            <div className="mb-4">
              <div className="flex items-center gap-1 mb-2">
                {[
                  { label: 'Deposit', done: true },
                  { label: 'Framing', done: true },
                  { label: 'Rough-in', done: false },
                  { label: 'Final', done: false },
                ].map((phase, i) => (
                  <div key={i} className="flex items-center gap-1 flex-1">
                    {/* Dot */}
                    <div
                      className={`w-3 h-3 rounded-full flex-shrink-0 ${
                        phase.done
                          ? 'bg-primary'
                          : 'bg-slate-200 border border-slate-300'
                      }`}
                    />
                    {/* Bar (skip last) */}
                    {i < 3 && (
                      <div
                        className={`h-1 flex-1 rounded-full ${
                          phase.done ? 'bg-primary/30' : 'bg-slate-200'
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 font-medium">
                <span>Deposit</span>
                <span>Framing</span>
                <span>Rough-in</span>
                <span>Final</span>
              </div>
            </div>

            <p className="text-slate-600 text-sm leading-relaxed mb-5">
              Pay only when work is done and inspected. Our milestone system
              with 10% holdback ensures contractors deliver quality at every
              stage.
            </p>

            <Link
              href="/how-it-works#vault"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary transition-colors"
            >
              See how payments work
              <span className="material-symbols-outlined text-base">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>

        {/* Bottom Block: Architecture Infrastructure (desktop 2-col, mobile stacked) */}
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center transition-all duration-700 delay-300 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Left: Architectural image with glass overlay */}
          <div className="relative rounded-2xl overflow-hidden h-72 md:h-80 bg-reno-dark hidden lg:block">
            <Image
              src="/images/pros/dryspace/exterior-1.webp"
              alt="Verified RenoNext contractor completing foundation waterproofing with escrow-protected milestone payments"
              fill
              className="object-cover brightness-75"
              sizes="50vw"
            />

            {/* Glass overlay card */}
            <div className="absolute bottom-5 left-5 right-5 backdrop-blur-md bg-white/10 rounded-xl border border-white/20 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/60 text-xs font-medium uppercase tracking-wider mb-1">
                    Escrow Balance
                  </p>
                  <p className="text-white text-2xl font-bold tracking-tight">
                    $142,500
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className="material-symbols-outlined text-primary/50 text-xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    lock
                  </span>
                  {/* Stacked mini avatars */}
                  <div className="flex -space-x-1.5">
                    {['#0fbabd', '#E8AA42', '#0D9FA1'].map((bg, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full border-2 border-white/20"
                        style={{ backgroundColor: bg }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Infrastructure heading + checklist + CTA */}
          <div className="py-2">
            <h3 className="font-display text-2xl md:text-3xl font-bold text-reno-dark mb-6 leading-tight">
              Architecture-First{' '}
              <span className="text-primary">Infrastructure</span>
            </h3>

            <ul className="space-y-4 mb-8">
              {[
                {
                  icon: 'gavel',
                  title: 'Tier-1 Legal Contracts',
                  desc: 'CPA-compliant renovation contracts with automatic milestone schedules and 10% holdback protection.',
                },
                {
                  icon: 'timeline',
                  title: 'Real-time Progress Tracking',
                  desc: 'Photo-verified inspections at every stage. Your dashboard shows exactly where your money goes.',
                },
                {
                  icon: 'shield_lock',
                  title: 'Dispute Resolution Protocol',
                  desc: 'Built-in mediation with escrowed funds. If something goes wrong, you\'re never left holding the bag.',
                },
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span
                      className="material-symbols-outlined text-primary text-lg"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {item.icon}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-reno-dark mb-0.5">
                      {item.title}
                    </p>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </li>
              ))}
            </ul>

            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 px-6 py-3 bg-reno-dark text-white font-semibold rounded-xl hover:bg-reno-dark/90 transition-colors"
            >
              See How It Works
              <span className="material-symbols-outlined text-lg">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>

        {/* Trust Seal */}
        <div
          className={`mt-12 md:mt-14 flex items-center justify-center gap-3 transition-all duration-700 delay-500 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-white shadow-float border border-primary/10">
            <span
              className="material-symbols-outlined text-primary text-xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              shield_with_heart
            </span>
            <span className="text-sm font-semibold text-reno-dark">
              RenoNext Protection Guarantee
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
