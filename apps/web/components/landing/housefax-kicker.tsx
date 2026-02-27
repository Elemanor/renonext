'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { Camera, ClipboardCheck, Users, Package, Check } from 'lucide-react';

interface Stat {
  icon: React.ReactNode;
  value: number;
  label: string;
  color: string;
}

export function HouseFaxKicker() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);
  const [stats, setStats] = useState([
    { icon: <Camera className="w-5 h-5" />, value: 0, label: 'verified photos', color: '#0D7377', target: 47 },
    { icon: <ClipboardCheck className="w-5 h-5" />, value: 0, label: 'inspections passed', color: '#1D6B3F', target: 6 },
    { icon: <Users className="w-5 h-5" />, value: 0, label: 'licensed trades', color: '#0D7377', target: 12 },
    { icon: <Package className="w-5 h-5" />, value: 0, label: 'materials logged', color: '#1D6B3F', target: 24 },
  ]);
  const [verifiedVisible, setVerifiedVisible] = useState(false);
  const [timelineProgress, setTimelineProgress] = useState(0);
  const [supportingTextWords, setSupportingTextWords] = useState<string[]>([]);

  const supportingText = "Every material. Every trade. Every inspection. Permanently documented. Transferable to next owner.";

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

  // Animation sequence
  useEffect(() => {
    if (!isVisible) return;

    // Step 1: Header slides in
    setTimeout(() => setHeaderVisible(true), 300);

    // Step 2: Count up stats one by one
    const statTimers: NodeJS.Timeout[] = [];
    stats.forEach((stat, index) => {
      const startDelay = 800 + index * 600;
      const duration = 1000;
      const steps = 30;
      const increment = stat.target / steps;

      for (let i = 0; i <= steps; i++) {
        const timer = setTimeout(() => {
          setStats((prev) =>
            prev.map((s, idx) =>
              idx === index ? { ...s, value: Math.min(Math.round(increment * i), stat.target) } : s
            )
          );
        }, startDelay + (duration / steps) * i);
        statTimers.push(timer);
      }
    });

    // Step 3: Verified badge stamps in
    setTimeout(() => setVerifiedVisible(true), 3400);

    // Step 4: Timeline draws
    const timelineStart = 3800;
    const timelineDuration = 1200;
    const timelineSteps = 60;
    for (let i = 0; i <= timelineSteps; i++) {
      const timer = setTimeout(() => {
        setTimelineProgress((i / timelineSteps) * 100);
      }, timelineStart + (timelineDuration / timelineSteps) * i);
      statTimers.push(timer);
    }

    // Step 5: Supporting text word-by-word
    const words = supportingText.split(' ');
    words.forEach((word, index) => {
      const timer = setTimeout(() => {
        setSupportingTextWords((prev) => [...prev, word]);
      }, 5200 + index * 100);
      statTimers.push(timer);
    });

    return () => statTimers.forEach(clearTimeout);
  }, [isVisible]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden bg-gradient-to-b from-white to-reno-cream"
    >
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes hfk-float {
          0%, 100% { transform: translateY(0px) rotate(1deg); }
          50% { transform: translateY(-10px) rotate(1deg); }
        }
        @keyframes hfk-pulse-ring {
          0% { transform: scale(1); opacity: 0.8; }
          100% { transform: scale(1.5); opacity: 0; }
        }
        @keyframes hfk-fadeInWord {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: no-preference) {
          .hfk-floating-card { animation: hfk-float 6s ease-in-out infinite; }
          .hfk-pulse-ring { animation: hfk-pulse-ring 2s ease-out infinite; }
        }
        @media (prefers-reduced-motion: reduce) {
          .hfk-floating-card, .hfk-pulse-ring { animation: none !important; }
        }
      `}} />
      {/* Radial glow background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-reno-teal-light/30 via-transparent to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Title */}
        <h2
          className={`font-display text-4xl md:text-5xl lg:text-6xl text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          After construction:{' '}
          <span className="text-reno-teal">HouseFax™</span>
        </h2>

        {/* Animated Property Record Card */}
        <div className="max-w-3xl mx-auto mb-12">
          <div
            className={`relative bg-white rounded-2xl shadow-2xl p-8 md:p-10 transition-all duration-1000 ${
              isVisible
                ? 'opacity-100 translate-y-0 rotate-1 hover:rotate-0'
                : 'opacity-0 translate-y-12'
            }`}
            style={{
              transformStyle: 'preserve-3d',
              boxShadow: isVisible
                ? '0 25px 50px -12px rgba(13, 115, 119, 0.25)'
                : '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
            }}
          >
            <div className={isVisible ? 'hfk-floating-card' : ''}>
              {/* Property Header */}
              <div
                className={`border-b border-gray-200 pb-6 mb-8 transition-all duration-700 ${
                  headerVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
                }`}
              >
                <h3 className="text-2xl md:text-3xl font-display text-reno-dark mb-2">
                  42 Maple Drive
                </h3>
                <p className="text-gray-600">Toronto, ON M4E 3A1</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-4 transition-all duration-500 delay-${index * 100}`}
                    style={{
                      opacity: stat.value > 0 ? 1 : 0,
                      transform: stat.value > 0 ? 'translateY(0)' : 'translateY(10px)',
                    }}
                  >
                    {/* Circular Progress Ring */}
                    <div className="relative flex-shrink-0">
                      <svg className="w-16 h-16 transform -rotate-90">
                        {/* Background circle */}
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          fill="none"
                          stroke="#E5E7EB"
                          strokeWidth="4"
                        />
                        {/* Progress circle */}
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          fill="none"
                          stroke={stat.color}
                          strokeWidth="4"
                          strokeDasharray={`${2 * Math.PI * 28}`}
                          strokeDashoffset={`${
                            2 * Math.PI * 28 * (1 - stat.value / stat.target)
                          }`}
                          strokeLinecap="round"
                          className="transition-all duration-300"
                        />
                      </svg>
                      {/* Icon in center */}
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ color: stat.color }}
                      >
                        {stat.icon}
                      </div>
                    </div>

                    {/* Stat Text */}
                    <div>
                      <div className="text-3xl font-bold text-reno-dark tabular-nums">
                        {stat.value}
                      </div>
                      <div className="text-sm text-gray-600">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Verified Badge */}
              <div
                className={`inline-flex items-center gap-2 bg-reno-green text-white px-4 py-2 rounded-full font-semibold mb-8 transition-all duration-500 ${
                  verifiedVisible
                    ? 'opacity-100 scale-100'
                    : 'opacity-0 scale-50'
                }`}
                style={{
                  transformOrigin: 'left center',
                }}
              >
                <Check className="w-5 h-5" />
                <span>Verified</span>
              </div>

              {/* Timeline */}
              <div className="relative pt-4">
                <div className="flex justify-between items-center relative">
                  {/* Progress Line */}
                  <svg
                    className="absolute top-3 left-0 w-full h-1"
                    style={{ zIndex: 0 }}
                  >
                    <line
                      x1="2%"
                      y1="50%"
                      x2="98%"
                      y2="50%"
                      stroke="#E5E7EB"
                      strokeWidth="2"
                    />
                    <line
                      x1="2%"
                      y1="50%"
                      x2={`${2 + (96 * timelineProgress) / 100}%`}
                      y2="50%"
                      stroke="#0D7377"
                      strokeWidth="2"
                      className="transition-all duration-300"
                    />
                  </svg>

                  {/* Milestone Dots */}
                  {['Foundation', 'Framing', 'Mechanical', 'Final'].map(
                    (milestone, index) => {
                      const dotVisible = timelineProgress >= (index * 100) / 3;
                      return (
                        <div
                          key={index}
                          className="flex flex-col items-center relative z-10"
                          style={{ flex: 1 }}
                        >
                          <div
                            className={`w-6 h-6 rounded-full border-4 border-white transition-all duration-300 ${
                              dotVisible ? 'bg-reno-teal scale-100' : 'bg-gray-300 scale-75'
                            }`}
                          />
                          <span
                            className={`text-xs mt-2 text-gray-600 transition-opacity duration-300 ${
                              dotVisible ? 'opacity-100' : 'opacity-0'
                            }`}
                          >
                            {milestone}
                          </span>
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Supporting Text */}
        <p className="text-center text-lg md:text-xl text-gray-700 mb-8 max-w-3xl mx-auto min-h-[3rem]">
          {supportingTextWords.map((word, index) => (
            <span
              key={index}
              className="inline-block mr-2 transition-all duration-300"
              style={{
                opacity: 1,
                animation: `hfk-fadeInWord 0.3s ease-out ${index * 0.1}s both`,
              }}
            >
              {word}
            </span>
          ))}
        </p>

        {/* CTA Button with Pulse Ring */}
        <div className="flex justify-center">
          <div className="relative">
            <div
              className={`absolute inset-0 rounded-full bg-reno-teal hfk-pulse-ring ${
                isVisible ? 'opacity-100' : 'opacity-0'
              }`}
            />
            <Link
              href="/house-fax/sample"
              className={`relative inline-flex items-center gap-2 bg-reno-teal hover:bg-reno-teal/90 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-4'
              }`}
            >
              See a Sample
              <span className="text-xl">→</span>
            </Link>
          </div>
        </div>
      </div>

    </section>
  );
}
