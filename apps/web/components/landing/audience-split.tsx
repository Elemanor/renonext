'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const steps = [
  {
    number: 1,
    title: 'Post Your Project',
    description:
      'Specify your location, renovation type, and budget. Our system analyzes your needs to find the perfect match.',
    icon: 'edit_square',
    circleBg: 'bg-[#f6f8f8]',
    circleText: 'text-reno-dark',
  },
  {
    number: 2,
    title: 'Get Matched',
    description:
      'Receive profiles of vetted contractors within 24 hours. Review ratings, past projects, and verified credentials.',
    icon: 'group_add',
    circleBg: 'bg-primary',
    circleText: 'text-white',
  },
  {
    number: 3,
    title: 'Build with Protection',
    description:
      'Secure escrow payments, milestone tracking, and full project documentation from start to finish.',
    icon: 'verified_user',
    circleBg: 'bg-reno-dark',
    circleText: 'text-white',
  },
];

export function AudienceSplit() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

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
      className="py-16 md:py-24 bg-[#f6f8f8] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-12 md:mb-20 transition-all duration-700 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          }`}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-reno-dark mb-4 sm:mb-6">
            Built for Speed & Security
          </h2>
          <p className="text-slate-500 text-base sm:text-lg max-w-2xl mx-auto">
            Our approach to renovation management means you're always three
            steps away from a finished job.
          </p>
        </div>

        {/* 3 Steps with Connecting Line */}
        <div
          className={`relative grid md:grid-cols-3 gap-8 md:gap-12 mb-12 md:mb-20 transition-all duration-700 delay-200 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          {/* Connecting gradient line - hidden on mobile */}
          <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-1 bg-gradient-to-r from-[#f6f8f8] via-primary to-reno-dark -z-0" />

          {steps.map((step, idx) => (
            <div
              key={step.number}
              className={`text-center transition-all duration-700 ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                transitionDelay: isVisible ? `${400 + idx * 150}ms` : '0ms',
              }}
            >
              {/* Numbered Circle */}
              <div className="relative z-10 flex justify-center mb-6">
                <div
                  className={`w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full ${step.circleBg} border-4 border-white shadow-xl flex items-center justify-center ${step.circleText} font-extrabold text-2xl md:text-3xl`}
                >
                  {step.number}
                </div>
              </div>

              {/* Icon */}
              <div className="flex justify-center mb-4">
                <span
                  className="material-symbols-outlined text-primary text-4xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {step.icon}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-xl font-bold text-reno-dark mb-3">
                {step.title}
              </h3>
              <p className="text-slate-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        <div
          className={`transition-all duration-700 delay-700 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="p-1 bg-gradient-to-r from-primary via-[#0D9FA1] to-primary rounded-[2rem]">
            <div className="bg-reno-dark rounded-[1.9rem] py-10 px-6 sm:py-12 md:py-16 md:px-20 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-10">
              {/* Left Text */}
              <div className="text-center md:text-left">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mb-2 sm:mb-3">
                  Ready to start building?
                </h3>
                <p className="text-slate-300 text-lg">
                  Join homeowners across Ontario building with protection.
                </p>
              </div>

              {/* Right Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 flex-shrink-0 w-full md:w-auto">
                <Link
                  href="/signup"
                  className="
                    px-6 py-3.5 sm:px-8 sm:py-4 bg-primary text-white rounded-xl font-semibold text-center text-sm sm:text-base
                    transition-all duration-300
                    hover:bg-primary/90 hover:shadow-lg hover:-translate-y-0.5
                    inline-flex items-center justify-center gap-2 whitespace-nowrap
                  "
                >
                  Start Your Renovation
                  <span className="material-symbols-outlined text-lg">
                    arrow_forward
                  </span>
                </Link>
                <Link
                  href="/pros"
                  className="
                    px-6 py-3.5 sm:px-8 sm:py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold text-center text-sm sm:text-base
                    transition-all duration-300
                    hover:bg-white hover:text-reno-dark hover:-translate-y-0.5
                    inline-flex items-center justify-center gap-2 whitespace-nowrap
                  "
                >
                  Browse Pros
                  <span className="material-symbols-outlined text-lg">
                    search
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
