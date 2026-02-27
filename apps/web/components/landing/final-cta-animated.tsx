'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
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
      className="relative overflow-hidden bg-[#1A1A1A] py-24 md:py-32"
    >
      {/* Animated Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="orb orb-green" />
        <div className="orb orb-teal" />
        <div className="orb orb-purple" />
      </div>

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.03] noise-texture" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* Headline with Animated Underline & Strikethrough */}
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Your home deserves a{' '}
          <span className="relative inline-block">
            <span className="relative z-10">system</span>
            <svg
              className={`absolute left-0 -bottom-2 w-full h-3 transition-all duration-1000 ${
                isVisible ? 'animate-draw-underline' : 'opacity-0'
              }`}
              viewBox="0 0 200 12"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <path
                d="M0 6 Q50 3, 100 6 T200 6"
                stroke="#1D6B3F"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                className="underline-path"
              />
            </svg>
          </span>
          , not a{' '}
          <span className="relative inline-block">
            <span className="relative z-10">handshake</span>
            <span
              className={`absolute left-0 top-1/2 h-[2px] bg-red-500 transition-all duration-1000 ${
                isVisible ? 'w-full delay-500' : 'w-0'
              }`}
              aria-hidden="true"
            />
          </span>
          .
        </h2>

        {/* Subtext with Fade-in */}
        <p
          className={`text-lg md:text-xl text-gray-300 mb-10 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0 delay-700' : 'opacity-0 translate-y-4'
          }`}
        >
          Stop gambling with six figures. Start building with protection.
        </p>

        {/* CTA Buttons */}
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0 delay-1000' : 'opacity-0 translate-y-4'
          }`}
        >
          {/* Primary Button with Glow */}
          <Link
            href="/signup"
            className="group relative inline-flex items-center justify-center"
          >
            {/* Animated Glow Ring */}
            <span className="absolute inset-0 rounded-full bg-[#1D6B3F] blur-xl opacity-50 group-hover:opacity-75 animate-pulse-glow" />

            {/* Button */}
            <span className="relative inline-flex items-center gap-2 px-8 py-4 bg-[#1D6B3F] text-white font-semibold rounded-full transition-all duration-300 group-hover:scale-105 overflow-hidden">
              {/* Shine Sweep Effect */}
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              <span className="relative">Start a Project</span>
              <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </Link>

          {/* Outline Button with Animated Border */}
          <Link
            href="/price-check"
            className="group relative inline-flex items-center gap-2 px-8 py-4 font-semibold rounded-full transition-all duration-300 hover:scale-105 overflow-hidden border-2 border-[#1D6B3F] text-white hover:bg-[#1D6B3F]/10 animated-border"
          >
            Get a Price Check
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Trust Footer with Animated Separator */}
        <div
          className={`transition-all duration-1000 ${
            isVisible ? 'opacity-100 delay-1200' : 'opacity-0'
          }`}
        >
          {/* Animated Separator Line */}
          <div className="relative mb-6 h-[1px] max-w-md mx-auto">
            <div
              className={`absolute left-1/2 top-0 h-full bg-gradient-to-r from-transparent via-[#1D6B3F] to-transparent transition-all duration-1000 ${
                isVisible ? 'w-full -translate-x-1/2 delay-1200' : 'w-0 -translate-x-1/2'
              }`}
            />

            {/* Floating Particles */}
            <div className="floating-particles">
              <span className="particle particle-1" />
              <span className="particle particle-2" />
              <span className="particle particle-3" />
              <span className="particle particle-4" />
            </div>
          </div>

          <p className="text-sm text-gray-400 font-medium">
            Trusted by homeowners and contractors across Ontario
          </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .orb { position: absolute; border-radius: 50%; filter: blur(80px); opacity: 0.15; }
        .orb-green { width: 500px; height: 500px; background: #1D6B3F; top: -200px; left: -100px; animation: fc-drift-green 20s ease-in-out infinite; }
        .orb-teal { width: 400px; height: 400px; background: #0D7377; bottom: -150px; right: -50px; animation: fc-drift-teal 25s ease-in-out infinite; }
        .orb-purple { width: 450px; height: 450px; background: #6B4E8D; top: 50%; left: 50%; transform: translate(-50%, -50%); animation: fc-drift-purple 30s ease-in-out infinite; }
        @keyframes fc-drift-green { 0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.15; } 33% { transform: translate(50px, -30px) rotate(120deg); opacity: 0.2; } 66% { transform: translate(-30px, 40px) rotate(240deg); opacity: 0.1; } }
        @keyframes fc-drift-teal { 0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.15; } 40% { transform: translate(-60px, 30px) rotate(140deg); opacity: 0.2; } 80% { transform: translate(40px, -50px) rotate(280deg); opacity: 0.1; } }
        @keyframes fc-drift-purple { 0%, 100% { transform: translate(-50%, -50%) rotate(0deg); opacity: 0.12; } 50% { transform: translate(calc(-50% + 40px), calc(-50% - 40px)) rotate(180deg); opacity: 0.18; } }
        .noise-texture { background-image: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px), repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(255,255,255,0.03) 2px, rgba(255,255,255,0.03) 4px); }
        @keyframes fc-draw-underline { from { stroke-dasharray: 1000; stroke-dashoffset: 1000; } to { stroke-dasharray: 1000; stroke-dashoffset: 0; } }
        .animate-draw-underline .underline-path { animation: fc-draw-underline 1s ease-out forwards; }
        @keyframes fc-pulse-glow { 0%, 100% { transform: scale(1); opacity: 0.5; } 50% { transform: scale(1.1); opacity: 0.7; } }
        .animate-pulse-glow { animation: fc-pulse-glow 3s ease-in-out infinite; }
        @keyframes fc-border-cycle { 0%, 100% { border-color: #1D6B3F; } 50% { border-color: #0D7377; } }
        .animated-border { animation: fc-border-cycle 4s ease-in-out infinite; }
        .floating-particles { position: absolute; top: 0; left: 50%; transform: translateX(-50%); width: 100%; height: 60px; pointer-events: none; }
        .particle { position: absolute; width: 3px; height: 3px; background: #1D6B3F; border-radius: 50%; bottom: 0; opacity: 0; }
        .particle-1 { left: 30%; animation: fc-float-up 3s ease-in infinite; }
        .particle-2 { left: 45%; animation: fc-float-up 3.5s ease-in infinite 0.5s; }
        .particle-3 { left: 55%; animation: fc-float-up 3.2s ease-in infinite 1s; }
        .particle-4 { left: 70%; animation: fc-float-up 3.8s ease-in infinite 1.5s; }
        @keyframes fc-float-up { 0% { transform: translateY(0); opacity: 0; } 20% { opacity: 0.6; } 100% { transform: translateY(-60px); opacity: 0; } }
        @media (prefers-reduced-motion: reduce) { .orb, .animate-pulse-glow, .animated-border, .particle { animation: none !important; } .animate-draw-underline .underline-path { animation: none !important; stroke-dashoffset: 0; } }
      `}} />
    </section>
  );
}
