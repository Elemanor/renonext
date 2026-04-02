'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const trustPoints = [
  {
    icon: 'verified_user',
    text: 'Every pro is insured, background-checked, and WSIB verified',
  },
  {
    icon: 'account_balance',
    text: 'Funds held in bonded escrow — released only when you approve',
  },
  {
    icon: 'photo_camera',
    text: 'GPS-stamped photo proof at every milestone',
  },
  {
    icon: 'home_storage',
    text: 'Permanent property record transfers with your home',
  },
  {
    icon: 'support_agent',
    text: '24/7 dispute resolution built into every contract',
  },
];

export function TrustCredibility() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [visibleChecks, setVisibleChecks] = useState<boolean[]>(
    trustPoints.map(() => false)
  );

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      setVisibleChecks(trustPoints.map(() => true));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);

          trustPoints.forEach((_, idx) => {
            setTimeout(() => {
              setVisibleChecks((prev) => {
                const next = [...prev];
                next[idx] = true;
                return next;
              });
            }, 400 + idx * 200);
          });
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
      className="py-24 md:py-28 px-6 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <div
            className={`relative transition-all duration-1000 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-12'
            }`}
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-[4/3]">
              <Image
                src="/images/canvas/trust-hero.jpg"
                alt="Verified RenoNext professionals reviewing blueprints on a residential construction site"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />

              {/* Overlay badge */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="backdrop-blur-md bg-white/90 rounded-xl px-5 py-4 shadow-lg border border-primary/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <span
                        className="material-symbols-outlined text-white text-xl"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        verified
                      </span>
                    </div>
                    <div>
                      <p className="font-bold text-reno-dark text-sm">
                        RenoNext Verified Network
                      </p>
                      <p className="text-xs text-slate-500">
                        Only 23% of applicants are accepted
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-primary/15 rounded-2xl -z-10" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-primary/10 rounded-2xl -z-10" />
          </div>

          {/* Content Side */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 translate-x-12'
            }`}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-5">
              <span
                className="material-symbols-outlined text-sm"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                shield_with_heart
              </span>
              Our Promise
            </div>

            <h2 className="font-display text-4xl lg:text-5xl font-extrabold tracking-tight text-reno-dark leading-[1.1] mb-4">
              You&apos;re in Good Hands.
            </h2>

            <p className="text-lg text-slate-500 mb-10 leading-relaxed">
              Five commitments that define our network.
            </p>

            {/* Trust Points */}
            <ul className="space-y-3">
              {trustPoints.map((point, idx) => (
                <li
                  key={idx}
                  className={`flex items-start gap-4 p-3.5 rounded-xl transition-all duration-500 ${
                    visibleChecks[idx]
                      ? 'opacity-100 translate-x-0 bg-[#f6f8f8]'
                      : 'opacity-0 translate-x-6'
                  }`}
                >
                  <div className="flex-shrink-0 mt-0.5">
                    <div
                      className={`w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center transition-all duration-300 ${
                        visibleChecks[idx] ? 'scale-100' : 'scale-0'
                      }`}
                    >
                      <span
                        className="material-symbols-outlined text-primary text-lg"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {point.icon}
                      </span>
                    </div>
                  </div>
                  <span className="text-slate-600 text-base leading-relaxed pt-1">
                    {point.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
