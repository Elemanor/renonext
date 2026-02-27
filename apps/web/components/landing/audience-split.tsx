'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Shield, Briefcase, Check } from 'lucide-react';

export function AudienceSplit() {
  const [isVisible, setIsVisible] = useState(false);
  const [checksVisible, setChecksVisible] = useState({
    homeowner: [false, false, false],
    contractor: [false, false, false],
  });
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          // Stagger checkmark animations
          setTimeout(() => {
            setChecksVisible(prev => ({
              homeowner: [true, false, false],
              contractor: [true, false, false],
            }));
          }, 400);

          setTimeout(() => {
            setChecksVisible(prev => ({
              homeowner: [true, true, false],
              contractor: [true, true, false],
            }));
          }, 600);

          setTimeout(() => {
            setChecksVisible(prev => ({
              homeowner: [true, true, true],
              contractor: [true, true, true],
            }));
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

  const homeownerBenefits = [
    'Your money stays in escrow until work is verified',
    'See daily progress from your phone',
    'Own a permanent property record',
  ];

  const contractorBenefits = [
    'Get paid in 24 hours, every milestone',
    'One app replaces $400/mo in tools',
    'Build verified reputation automatically',
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 bg-reno-cream"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Homeowner Card */}
          <div
            className={`
              relative bg-white rounded-lg overflow-hidden
              transition-all duration-700 ease-out
              hover:-translate-y-1 hover:shadow-xl
              shadow-md
              ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}
            `}
            style={{
              borderLeft: '4px solid #1D6B3F',
            }}
          >
            {/* Border animation */}
            <div
              className="absolute top-0 left-0 w-1 bg-gradient-to-b from-reno-green to-reno-green-light transition-all duration-1000"
              style={{
                height: isVisible ? '100%' : '0%',
              }}
            />

            {/* Green gradient strip */}
            <div className="h-2 bg-gradient-to-r from-reno-green to-reno-green-light" />

            <div className="p-8 transition-colors duration-300 hover:bg-reno-green-light/20">
              {/* Icon */}
              <div className="mb-6">
                <div className="inline-flex p-4 bg-reno-green-light rounded-full">
                  <Shield className="w-8 h-8 text-reno-green" strokeWidth={2} />
                </div>
              </div>

              {/* Title */}
              <h3 className="font-display text-3xl mb-2 text-reno-dark">
                Homeowners
              </h3>

              {/* Tagline */}
              <p className="text-lg text-gray-600 mb-6 font-medium">
                Protect. See. Own.
              </p>

              {/* Benefits */}
              <ul className="space-y-4 mb-8">
                {homeownerBenefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="relative mt-1 flex-shrink-0">
                      {/* Checkmark circle */}
                      <div
                        className={`
                          w-5 h-5 rounded-full bg-reno-green flex items-center justify-center
                          transition-all duration-300
                          ${checksVisible.homeowner[idx] ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
                        `}
                      >
                        {/* Animated checkmark SVG */}
                        <svg
                          className="w-3 h-3 text-white"
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path
                            d="M2 6L5 9L10 3"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={checksVisible.homeowner[idx] ? 'animate-check-draw' : ''}
                            style={{
                              strokeDasharray: 12,
                              strokeDashoffset: checksVisible.homeowner[idx] ? 0 : 12,
                            }}
                          />
                        </svg>
                      </div>
                    </div>
                    <span className="text-gray-700 leading-relaxed">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link href="/signup">
                <button
                  className="
                    w-full py-3 px-6 bg-reno-green text-white rounded-lg font-medium
                    transition-all duration-300
                    hover:bg-reno-green/90 hover:shadow-lg
                    relative overflow-hidden group
                  "
                >
                  {/* Hover shimmer effect */}
                  <span
                    className="
                      absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                      -translate-x-full group-hover:translate-x-full transition-transform duration-700
                    "
                  />
                  <span className="relative">Start Project</span>
                </button>
              </Link>
            </div>
          </div>

          {/* Contractor Card */}
          <div
            className={`
              relative bg-white rounded-lg overflow-hidden
              transition-all duration-700 ease-out delay-150
              hover:-translate-y-1 hover:shadow-xl
              shadow-md
              ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}
            `}
            style={{
              borderLeft: '4px solid #3b82f6',
            }}
          >
            {/* Border animation */}
            <div
              className="absolute top-0 left-0 w-1 bg-gradient-to-b from-reno-green to-blue-300 transition-all duration-1000 delay-150"
              style={{
                height: isVisible ? '100%' : '0%',
              }}
            />

            {/* Blue gradient strip */}
            <div className="h-2 bg-gradient-to-r from-reno-green to-blue-400" />

            <div className="p-8 transition-colors duration-300 hover:bg-blue-50/30">
              {/* Icon */}
              <div className="mb-6">
                <div className="inline-flex p-4 bg-blue-50 rounded-full">
                  <Briefcase className="w-8 h-8 text-reno-green" strokeWidth={2} />
                </div>
              </div>

              {/* Title */}
              <h3 className="font-display text-3xl mb-2 text-reno-dark">
                Contractors
              </h3>

              {/* Tagline */}
              <p className="text-lg text-gray-600 mb-6 font-medium">
                Get paid. Run site. Build rep.
              </p>

              {/* Benefits */}
              <ul className="space-y-4 mb-8">
                {contractorBenefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <div className="relative mt-1 flex-shrink-0">
                      {/* Checkmark circle */}
                      <div
                        className={`
                          w-5 h-5 rounded-full bg-reno-green flex items-center justify-center
                          transition-all duration-300
                          ${checksVisible.contractor[idx] ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}
                        `}
                      >
                        {/* Animated checkmark SVG */}
                        <svg
                          className="w-3 h-3 text-white"
                          viewBox="0 0 12 12"
                          fill="none"
                        >
                          <path
                            d="M2 6L5 9L10 3"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            style={{
                              strokeDasharray: 12,
                              strokeDashoffset: checksVisible.contractor[idx] ? 0 : 12,
                            }}
                          />
                        </svg>
                      </div>
                    </div>
                    <span className="text-gray-700 leading-relaxed">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA Button */}
              <Link href="/join">
                <button
                  className="
                    w-full py-3 px-6 bg-reno-green text-white rounded-lg font-medium
                    transition-all duration-300
                    hover:bg-reno-green-dark hover:shadow-lg
                    relative overflow-hidden group
                  "
                >
                  {/* Hover shimmer effect */}
                  <span
                    className="
                      absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                      -translate-x-full group-hover:translate-x-full transition-transform duration-700
                    "
                  />
                  <span className="relative">Apply for Network</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes check-draw {
          to { stroke-dashoffset: 0; }
        }
        .animate-check-draw {
          animation: check-draw 0.3s ease-out forwards;
        }
      `}} />
    </section>
  );
}
