'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export function FinalCtaAnimated() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
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
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-reno-dark py-16 sm:py-24 md:py-32"
    >
      {/* Subtle radial gradient background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(15,186,189,0.12),transparent_60%)]" />

      {/* Content */}
      <div
        className={`relative z-10 max-w-4xl mx-auto px-6 text-center transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        {/* Headline with static underline & strikethrough */}
        <h2 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
          Your home deserves a{' '}
          <span className="relative inline-block">
            <span className="relative z-10">system</span>
            <span
              className="absolute left-0 -bottom-1 w-full h-[3px] bg-[#0fbabd] rounded-full"
              aria-hidden="true"
            />
          </span>
          , not a{' '}
          <span className="relative inline-block">
            <span className="relative z-10">handshake</span>
            <span
              className="absolute left-0 top-1/2 w-full h-[2px] bg-red-500"
              aria-hidden="true"
            />
          </span>
          .
        </h2>

        {/* Subtext */}
        <p className="text-base sm:text-lg md:text-xl text-slate-300 mb-6 sm:mb-10">
          Stop gambling with six figures. Start building with protection.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12">
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-6 py-3.5 sm:px-10 sm:py-5 bg-[#0fbabd] text-white font-bold text-base sm:text-lg rounded-xl hover:scale-105 transition-transform w-full sm:w-auto justify-center"
          >
            Start a Project
            <span className="material-symbols-outlined text-xl">arrow_forward</span>
          </Link>

          <Link
            href="/price-check"
            className="inline-flex items-center gap-2 px-6 py-3.5 sm:px-10 sm:py-5 border-2 border-[#0fbabd] text-white font-bold text-base sm:text-lg rounded-xl hover:scale-105 transition-transform w-full sm:w-auto justify-center"
          >
            Get a Price Check
            <span className="material-symbols-outlined text-xl">arrow_forward</span>
          </Link>
        </div>

        {/* Trust footer */}
        <p className="text-sm text-slate-400">
          Trusted by homeowners and contractors across Ontario
        </p>
      </div>
    </section>
  );
}
