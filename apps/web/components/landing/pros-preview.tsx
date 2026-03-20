'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

interface ProCardData {
  name: string;
  initials: string;
  gradientFrom: string;
  gradientTo: string;
  rating: number;
  projectCount: number;
  specialty: string;
  location: string;
}

const contractors: ProCardData[] = [
  {
    name: 'DrySpace Waterproofing',
    initials: 'DS',
    gradientFrom: '#0fbabd',
    gradientTo: '#0D9FA1',
    rating: 0,
    projectCount: 0,
    specialty: 'Waterproofing & Foundation',
    location: 'Toronto · GTA',
  },
  {
    name: 'Imperial Form',
    initials: 'IF',
    gradientFrom: '#3b82f6',
    gradientTo: '#60a5fa',
    rating: 0,
    projectCount: 0,
    specialty: 'Concrete & Masonry',
    location: 'Toronto · GTA',
  },
  {
    name: 'Spaders',
    initials: 'SP',
    gradientFrom: '#0D9FA1',
    gradientTo: '#14919B',
    rating: 0,
    projectCount: 0,
    specialty: 'Underpinning & Basements',
    location: 'Toronto · GTA',
  },
];

function ProCard({
  contractor,
  index,
  isVisible,
}: {
  contractor: ProCardData;
  index: number;
  isVisible: boolean;
}) {
  const isNewPro = contractor.rating === 0 && contractor.projectCount === 0;

  return (
    <div
      className={`
        bg-white rounded-2xl p-6 md:p-7 shadow-float
        transition-all duration-700 ease-out
        hover:-translate-y-1 hover:shadow-float-hover
        border border-primary/5
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Avatar and Badge */}
      <div className="flex items-start justify-between mb-5">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg"
          style={{
            background: `linear-gradient(135deg, ${contractor.gradientFrom}, ${contractor.gradientTo})`,
          }}
        >
          {contractor.initials}
        </div>

        {isNewPro ? (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10">
            <span
              className="material-symbols-outlined text-primary text-xs"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              fiber_new
            </span>
            <span className="text-xs font-bold text-primary">New</span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 bg-amber-50 px-3 py-1 rounded-full">
            <span
              className="material-symbols-outlined text-amber-400 text-sm"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              star
            </span>
            <span className="font-bold text-sm text-reno-dark">
              {contractor.rating.toFixed(1)}
            </span>
          </div>
        )}
      </div>

      {/* Name */}
      <h4 className="font-display text-xl font-bold text-reno-dark mb-1">
        {contractor.name}
      </h4>

      {/* Specialty */}
      <p className="text-sm text-gray-500 mb-4">{contractor.specialty}</p>

      {/* Location */}
      <div className="flex items-center gap-1.5 mb-5">
        <span className="material-symbols-outlined text-gray-400 text-base">
          location_on
        </span>
        <span className="text-sm text-gray-500">{contractor.location}</span>
      </div>

      {/* Trust badges row */}
      <div className="flex flex-wrap gap-2 mb-5">
        {['WSIB', 'Insured', 'Licensed'].map((badge) => (
          <div
            key={badge}
            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#f6f8f8] text-xs font-semibold text-gray-500"
          >
            <span
              className="material-symbols-outlined text-primary text-xs"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              check_circle
            </span>
            {badge}
          </div>
        ))}
      </div>

      {/* Verified Pro Badge */}
      <div className="inline-flex items-center gap-1.5 bg-primary/10 text-primary px-3 py-1.5 rounded-full text-sm font-semibold">
        <span
          className="material-symbols-outlined text-base"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          verified
        </span>
        Verified Pro
      </div>
    </div>
  );
}

export function ProsPreview() {
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-28 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header
          className={`text-center mb-14 transition-all duration-700 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-5">
            <span
              className="material-symbols-outlined text-sm"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              workspace_premium
            </span>
            Verified Network
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-reno-dark leading-[1.1]">
            Real Contractors.{' '}
            <span className="text-primary italic">Real Track Records.</span>
          </h2>
        </header>

        {/* Contractor Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {contractors.map((contractor, index) => (
            <ProCard
              key={contractor.name}
              contractor={contractor}
              index={index}
              isVisible={isVisible}
            />
          ))}
        </div>

        {/* CTA */}
        <div
          className={`
            text-center transition-all duration-700 delay-500
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          <Link
            href="/pros"
            className="
              inline-flex items-center gap-2 px-8 py-3.5
              bg-reno-dark text-white rounded-full font-semibold
              transition-all duration-300
              hover:bg-reno-dark/90 hover:shadow-lg hover:-translate-y-0.5
            "
          >
            Browse All Pros
            <span className="material-symbols-outlined text-lg">
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
