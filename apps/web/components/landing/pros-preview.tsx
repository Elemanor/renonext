'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Star, Check } from 'lucide-react';

interface ProCardData {
  name: string;
  initials: string;
  gradientFrom: string;
  gradientTo: string;
  rating: number;
  projectCount: number;
  proofCompletion: number;
  specialty: string;
  location: string;
  sparklineData: number[];
}

const contractors: ProCardData[] = [
  {
    name: 'Apex Builders',
    initials: 'AB',
    gradientFrom: '#1D6B3F',
    gradientTo: '#2D8B5F',
    rating: 4.9,
    projectCount: 30,
    proofCompletion: 95,
    specialty: 'General Contractor',
    location: 'Toronto',
    sparklineData: [70, 75, 82, 88, 90, 95],
  },
  {
    name: 'SparkLine Electric',
    initials: 'SE',
    gradientFrom: '#3b82f6',
    gradientTo: '#60a5fa',
    rating: 4.8,
    projectCount: 42,
    proofCompletion: 88,
    specialty: 'Electrical',
    location: 'Scarborough',
    sparklineData: [65, 72, 78, 82, 85, 88],
  },
  {
    name: 'FlowRight Plumbing',
    initials: 'FR',
    gradientFrom: '#0D7377',
    gradientTo: '#14919B',
    rating: 4.7,
    projectCount: 28,
    proofCompletion: 92,
    specialty: 'Plumbing',
    location: 'North York',
    sparklineData: [75, 78, 84, 86, 89, 92],
  },
];

function Sparkline({ data }: { data: number[] }) {
  const width = 60;
  const height = 20;
  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min;

  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      const y = height - ((value - min) / range) * height;
      return `${x},${y}`;
    })
    .join(' ');

  return (
    <svg width={width} height={height} className="inline-block ml-2">
      <polyline
        points={points}
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-gray-400"
      />
    </svg>
  );
}

function ProCard({
  contractor,
  index,
  isVisible
}: {
  contractor: ProCardData;
  index: number;
  isVisible: boolean;
}) {
  const [proofProgress, setProofProgress] = useState(0);

  useEffect(() => {
    if (isVisible) {
      const timeout = setTimeout(() => {
        setProofProgress(contractor.proofCompletion);
      }, 200 + index * 150);
      return () => clearTimeout(timeout);
    }
  }, [isVisible, contractor.proofCompletion, index]);

  return (
    <div
      className={`
        bg-white rounded-xl p-6 shadow-md
        transition-all duration-700 ease-out
        hover:-translate-y-1 hover:shadow-xl hover:scale-[1.02]
        border-2 border-gray-100 hover:border-reno-green
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
      `}
      style={{
        transitionDelay: `${index * 150}ms`,
      }}
    >
      {/* Avatar and Rating */}
      <div className="flex items-start justify-between mb-4">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl"
          style={{
            background: `linear-gradient(135deg, ${contractor.gradientFrom}, ${contractor.gradientTo})`,
          }}
        >
          {contractor.initials}
        </div>

        <div className="flex items-center gap-1 bg-reno-amber-light px-3 py-1 rounded-full">
          <Star className="w-4 h-4 fill-reno-amber text-reno-amber" />
          <span className="font-semibold text-reno-dark">{contractor.rating}</span>
        </div>
      </div>

      {/* Name */}
      <h4 className="font-display text-xl text-reno-dark mb-2">
        {contractor.name}
      </h4>

      {/* Projects and Proof Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span>{contractor.projectCount} verified projects</span>
          <Sparkline data={contractor.sparklineData} />
        </div>

        {/* Proof completion bar */}
        <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="absolute inset-y-0 left-0 bg-gradient-to-r from-reno-green to-reno-green-light rounded-full transition-all duration-1000 ease-out"
            style={{
              width: `${proofProgress}%`,
            }}
          />
        </div>
        <p className="text-xs text-gray-500 mt-1">
          {contractor.proofCompletion}% proof completion
        </p>
      </div>

      {/* Specialty and Location */}
      <p className="text-sm text-gray-600 mb-3">
        {contractor.specialty} · {contractor.location}
      </p>

      {/* Verified Badge */}
      <div className="inline-flex items-center gap-1.5 bg-reno-green-light text-reno-green px-3 py-1.5 rounded-full text-sm font-medium">
        <Check className="w-4 h-4" strokeWidth={3} />
        <span>Verified</span>
      </div>
    </div>
  );
}

export function ProsPreview() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

  // Support reduced motion
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      setIsVisible(true);
    }
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-24 px-4 bg-white"
    >
      <div className="max-w-7xl mx-auto">
        {/* Headline */}
        <h2
          className={`
            font-display text-4xl md:text-5xl text-center text-reno-dark mb-16
            transition-all duration-700
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
          `}
        >
          Choose like you&apos;re picking a barber.
        </h2>

        {/* Contractor Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
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
          <Link href="/contractors">
            <button
              className="
                inline-flex items-center gap-2 px-8 py-3
                bg-reno-dark text-white rounded-lg font-medium
                transition-all duration-300
                hover:bg-reno-dark/90 hover:shadow-lg hover:-translate-y-0.5
              "
            >
              <span>Browse All Pros</span>
              <svg
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
