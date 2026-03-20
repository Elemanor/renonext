'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const homeownerBenefits = [
  { icon: 'account_balance', text: 'Your money stays in escrow until work is verified' },
  { icon: 'phone_iphone', text: 'See daily progress from your phone' },
  { icon: 'home_storage', text: 'Own a permanent property record' },
];

const contractorBenefits = [
  { icon: 'payments', text: 'Get paid in 24 hours, every milestone' },
  { icon: 'dashboard_customize', text: 'One app replaces $400/mo in tools' },
  { icon: 'workspace_premium', text: 'Build verified reputation automatically' },
];

export function AudienceSplit() {
  const [isVisible, setIsVisible] = useState(false);
  const [checksVisible, setChecksVisible] = useState({
    homeowner: [false, false, false],
    contractor: [false, false, false],
  });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      setChecksVisible({
        homeowner: [true, true, true],
        contractor: [true, true, true],
      });
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          setTimeout(() => {
            setChecksVisible({
              homeowner: [true, false, false],
              contractor: [true, false, false],
            });
          }, 400);

          setTimeout(() => {
            setChecksVisible({
              homeowner: [true, true, false],
              contractor: [true, true, false],
            });
          }, 600);

          setTimeout(() => {
            setChecksVisible({
              homeowner: [true, true, true],
              contractor: [true, true, true],
            });
          }, 800);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-28 px-6 bg-[#f6f8f8]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <header
          className={`text-center mb-14 transition-all duration-700 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-5">
            <span
              className="material-symbols-outlined text-sm"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              groups
            </span>
            Built for Both Sides
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-reno-dark leading-[1.1]">
            One Platform,{' '}
            <span className="text-primary italic">Two Wins</span>.
          </h2>
        </header>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {/* Homeowner Card */}
          <div
            className={`
              relative bg-white rounded-2xl overflow-hidden
              transition-all duration-700 ease-out
              hover:-translate-y-1 shadow-float hover:shadow-float-hover
              border border-primary/5
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
          >
            {/* Top accent bar */}
            <div className="h-1.5 bg-gradient-to-r from-primary to-primary/60" />

            <div className="p-8 md:p-10">
              {/* Icon + Title */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-primary text-2xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    shield
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-reno-dark">
                    Homeowners
                  </h3>
                  <p className="text-sm font-semibold text-primary tracking-wide">
                    Protect. See. Own.
                  </p>
                </div>
              </div>

              {/* Benefits */}
              <ul className="space-y-4 mb-8">
                {homeownerBenefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="relative mt-0.5 flex-shrink-0">
                      <div
                        className={`
                          w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center
                          transition-all duration-300
                          ${checksVisible.homeowner[idx] ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
                        `}
                      >
                        <span
                          className="material-symbols-outlined text-primary text-base"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {benefit.icon}
                        </span>
                      </div>
                    </div>
                    <span className="text-gray-600 leading-relaxed pt-1">
                      {benefit.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link
                href="/signup"
                className="
                  block w-full py-3.5 px-6 bg-primary text-white text-center rounded-xl font-semibold
                  transition-all duration-300
                  hover:bg-primary/90 hover:shadow-lg
                  relative overflow-hidden group
                "
              >
                <span
                  className="
                    absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                    -translate-x-full group-hover:translate-x-full transition-transform duration-700
                  "
                />
                <span className="relative inline-flex items-center gap-2">
                  Start Project
                  <span className="material-symbols-outlined text-lg">
                    arrow_forward
                  </span>
                </span>
              </Link>
            </div>
          </div>

          {/* Contractor Card */}
          <div
            className={`
              relative bg-white rounded-2xl overflow-hidden
              transition-all duration-700 ease-out delay-150
              hover:-translate-y-1 shadow-float hover:shadow-float-hover
              border border-primary/5
              ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
            `}
          >
            {/* Top accent bar */}
            <div className="h-1.5 bg-gradient-to-r from-[#E8AA42] to-[#E8AA42]/60" />

            <div className="p-8 md:p-10">
              {/* Icon + Title */}
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 rounded-2xl bg-[#E8AA42]/10 flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-[#E8AA42] text-2xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    construction
                  </span>
                </div>
                <div>
                  <h3 className="font-display text-2xl font-bold text-reno-dark">
                    Contractors
                  </h3>
                  <p className="text-sm font-semibold text-[#E8AA42] tracking-wide">
                    Get paid. Run site. Build rep.
                  </p>
                </div>
              </div>

              {/* Benefits */}
              <ul className="space-y-4 mb-8">
                {contractorBenefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="relative mt-0.5 flex-shrink-0">
                      <div
                        className={`
                          w-8 h-8 rounded-xl bg-[#E8AA42]/10 flex items-center justify-center
                          transition-all duration-300
                          ${checksVisible.contractor[idx] ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
                        `}
                      >
                        <span
                          className="material-symbols-outlined text-[#E8AA42] text-base"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {benefit.icon}
                        </span>
                      </div>
                    </div>
                    <span className="text-gray-600 leading-relaxed pt-1">
                      {benefit.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link
                href="/join"
                className="
                  block w-full py-3.5 px-6 bg-reno-dark text-white text-center rounded-xl font-semibold
                  transition-all duration-300
                  hover:bg-reno-dark/90 hover:shadow-lg
                  relative overflow-hidden group
                "
              >
                <span
                  className="
                    absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                    -translate-x-full group-hover:translate-x-full transition-transform duration-700
                  "
                />
                <span className="relative inline-flex items-center gap-2">
                  Apply for Network
                  <span className="material-symbols-outlined text-lg">
                    arrow_forward
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
