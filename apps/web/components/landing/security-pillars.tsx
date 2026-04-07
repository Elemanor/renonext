'use client';

import { useEffect, useRef, useState } from 'react';

const pillars = [
  {
    icon: 'verified_user',
    title: 'Background Checked',
    description:
      'Every professional undergoes a rigorous multi-step vetting process — WSIB, insurance, OBC license, identity verified.',
  },
  {
    icon: 'payments',
    title: 'Secure Escrow',
    description:
      'Payments are held securely and only released once milestones are completed and verified by you.',
  },
  {
    icon: 'map',
    title: 'Ontario Expertise',
    description:
      'Deeply rooted in Ontario with a network of verified local contractors across the GTA.',
  },
];

export function SecurityPillars() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
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
      className="bg-[#f6f8f8] py-14 sm:py-20 md:py-28"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {pillars.map((pillar, index) => (
            <div
              key={pillar.title}
              className={`group transition-all duration-700 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              {/* Icon Box */}
              <div className="w-14 h-14 rounded-xl bg-reno-dark flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110">
                <span
                  className="material-symbols-outlined text-primary text-3xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {pillar.icon}
                </span>
              </div>

              {/* Content */}
              <h3 className="font-display text-xl font-bold text-reno-dark mb-3">
                {pillar.title}
              </h3>
              <p className="text-slate-600 text-base leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
