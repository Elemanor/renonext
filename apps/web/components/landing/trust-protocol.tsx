'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface ServiceCard {
  title: string;
  description: string;
  badge?: string;
  imageUrl: string;
  colSpan: string;
  height: string;
}

const services: ServiceCard[] = [
  {
    title: 'Underpinning',
    description: 'Structural underpinning from bench to full — increase ceiling height and add legal basements.',
    badge: '4+ Verified Pros',
    imageUrl: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=800&q=80',
    colSpan: 'md:col-span-8',
    height: 'h-[260px] sm:h-[340px] md:h-[500px]',
  },
  {
    title: 'Waterproofing',
    description: 'Interior and exterior waterproofing with lifetime warranties.',
    badge: '3+ Verified Pros',
    imageUrl: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=800&q=80',
    colSpan: 'md:col-span-4',
    height: 'h-[260px] sm:h-[340px] md:h-[500px]',
  },
  {
    title: 'Foundation Repair',
    description: 'Crack injection, structural reinforcement, and foundation stabilization.',
    imageUrl: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&q=80',
    colSpan: 'md:col-span-4',
    height: 'h-[220px] sm:h-[280px] md:h-[350px]',
  },
  {
    title: 'Basement Renovation',
    description: 'Full basement finishing from framing to final inspection.',
    imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&q=80',
    colSpan: 'md:col-span-4',
    height: 'h-[220px] sm:h-[280px] md:h-[350px]',
  },
  {
    title: 'Kitchen & Bath',
    description: 'Complete kitchen and bathroom renovations with escrow protection.',
    imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
    colSpan: 'md:col-span-4',
    height: 'h-[220px] sm:h-[280px] md:h-[350px]',
  },
];

export function TrustProtocol() {
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
    <section
      ref={sectionRef}
      className="relative py-20 md:py-28 overflow-hidden bg-[#f6f8f8]"
    >
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 relative">
        {/* Section Header */}
        <div
          className={`flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6 transition-all duration-700 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-6'
          }`}
        >
          <div>
            <span className="text-primary font-bold uppercase tracking-widest text-sm">
              Services
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-reno-dark mt-2">
              What We Cover
            </h2>
          </div>
          <Link
            href="/costs"
            className="text-primary font-bold flex items-center gap-2 hover:gap-4 transition-all group"
          >
            View All Services
            <span className="material-symbols-outlined">arrow_right_alt</span>
          </Link>
        </div>

        {/* Bento Grid */}
        <div
          className={`grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 transition-all duration-700 delay-200 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          {services.map((service, index) => (
            <div
              key={service.title}
              className={`group relative overflow-hidden rounded-3xl shadow-xl ${service.colSpan} ${service.height}`}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
            >
              {/* Background Image */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={service.imageUrl}
                  alt={service.title}
                  fill
                  className="object-cover opacity-60 group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-reno-dark via-reno-dark/60 to-transparent" />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 md:p-10">
                {service.badge && (
                  <span className="bg-primary text-white px-3 py-1 rounded-full text-xs font-bold mb-4 inline-block">
                    {service.badge}
                  </span>
                )}
                <h3 className="text-white text-xl sm:text-2xl md:text-4xl font-extrabold mb-1 sm:mb-2">
                  {service.title}
                </h3>
                <p className="text-white/70 text-sm md:text-base max-w-md leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Hover Border Glow */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/30 rounded-3xl transition-all duration-500 pointer-events-none" />
            </div>
          ))}
        </div>

        {/* Bottom CTA Bar */}
        <div
          className={`mt-8 sm:mt-12 flex flex-col md:flex-row items-center justify-between gap-4 sm:gap-6 p-5 sm:p-8 bg-white/70 backdrop-blur-xl rounded-2xl shadow-float border border-primary/10 transition-all duration-700 delay-500 ${
            isVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8'
          }`}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <span
                className="material-symbols-outlined text-primary text-2xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                shield_with_heart
              </span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-reno-dark">
                All Services Protected by Escrow
              </h3>
              <p className="text-sm text-slate-500">
                Every project backed by milestone payments and photo verification
              </p>
            </div>
          </div>
          <Link
            href="/how-it-works#vault"
            className="px-8 py-4 bg-reno-dark text-white rounded-xl font-bold text-sm tracking-wide hover:bg-reno-dark/90 active:scale-[0.98] transition-all duration-200 whitespace-nowrap flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">
              lock
            </span>
            See How It Works
          </Link>
        </div>
      </div>
    </section>
  );
}
