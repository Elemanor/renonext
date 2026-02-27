'use client';

import { useEffect, useRef, useState } from 'react';
import {
  Shield,
  Lock,
  Unlock,
  CheckCircle2,
  MapPin,
  Camera,
  Wallet,
  Clock,
  AlertCircle,
} from 'lucide-react';

export function VaultSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [balance, setBalance] = useState(0);
  const [activeStage, setActiveStage] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver for scroll-into-view animations
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

  // Animated balance counter
  useEffect(() => {
    if (!isVisible) return;

    const targetBalance = 85600;
    const duration = 2000; // 2 seconds
    const startTime = Date.now();

    const animateBalance = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setBalance(Math.floor(targetBalance * easeOutQuart));

      if (progress < 1) {
        requestAnimationFrame(animateBalance);
      }
    };

    requestAnimationFrame(animateBalance);
  }, [isVisible]);

  // Cycle through escrow stages
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % 4);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const milestones = [
    {
      title: 'Foundation Complete',
      amount: 28000,
      status: 'approved' as const,
      icon: CheckCircle2,
    },
    {
      title: 'Framing & Roof',
      amount: 18500,
      status: 'review' as const,
      icon: Clock,
    },
    {
      title: 'Electrical & Plumbing',
      amount: 22100,
      status: 'upcoming' as const,
      icon: AlertCircle,
    },
    {
      title: 'Interior Finish',
      amount: 17000,
      status: 'upcoming' as const,
      icon: AlertCircle,
    },
  ];

  const trustIndicators = [
    {
      icon: Shield,
      title: 'Bank-Level Security',
      description: 'FDIC-insured escrow accounts',
      color: 'from-emerald-500/10 to-emerald-600/20',
      hoverColor: 'group-hover:from-emerald-500/20 group-hover:to-emerald-600/30',
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-50',
    },
    {
      icon: MapPin,
      title: 'GPS Verification',
      description: 'Location-stamped progress proof',
      color: 'from-cyan-500/10 to-cyan-600/20',
      hoverColor: 'group-hover:from-cyan-500/20 group-hover:to-cyan-600/30',
      iconColor: 'text-cyan-600',
      iconBg: 'bg-cyan-50',
    },
    {
      icon: Camera,
      title: 'Photo Evidence',
      description: 'Visual documentation required',
      color: 'from-purple-500/10 to-purple-600/20',
      hoverColor: 'group-hover:from-purple-500/20 group-hover:to-purple-600/30',
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-50',
    },
  ];

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes vs-flow { 0% { stroke-dashoffset: 24; } 100% { stroke-dashoffset: 0; } }
        @keyframes vs-glow { 0%, 100% { opacity: 1; filter: drop-shadow(0 0 8px currentColor); } 50% { opacity: 0.6; filter: drop-shadow(0 0 12px currentColor); } }
        @keyframes vs-pulse-ring { 0% { transform: scale(1); opacity: 1; } 100% { transform: scale(1.5); opacity: 0; } }
        @keyframes vs-shimmer { 0% { background-position: -1000px 0; } 100% { background-position: 1000px 0; } }
        @keyframes vs-float { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-20px); } }
        @keyframes vs-float-delayed { 0%, 100% { transform: translateY(0px); } 50% { transform: translateY(-15px); } }
        @keyframes vs-grid-fade { 0%, 100% { opacity: 0.03; } 50% { opacity: 0.06; } }
        @keyframes vs-slideIn { from { opacity: 0; transform: translateX(-20px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes vs-progress-fill { from { stroke-dashoffset: 339; } to { stroke-dashoffset: 142; } }
        .flow-line { stroke-dasharray: 6 6; animation: vs-flow 1s linear infinite; }
        .stage-glow { animation: vs-glow 2s ease-in-out infinite; }
        .pulse-ring { animation: vs-pulse-ring 2s cubic-bezier(0, 0, 0.2, 1) infinite; }
        .shimmer-button { background-size: 1000px 100%; animation: vs-shimmer 3s infinite; }
        .float-1 { animation: vs-float 6s ease-in-out infinite; }
        .float-2 { animation: vs-float-delayed 8s ease-in-out infinite; }
        .animated-grid { animation: vs-grid-fade 4s ease-in-out infinite; }
        .slide-in-1 { animation: vs-slideIn 0.5s ease-out 0.1s both; }
        .slide-in-2 { animation: vs-slideIn 0.5s ease-out 0.2s both; }
        .slide-in-3 { animation: vs-slideIn 0.5s ease-out 0.3s both; }
        .slide-in-4 { animation: vs-slideIn 0.5s ease-out 0.4s both; }
        .progress-circle { animation: vs-progress-fill 1.5s ease-out 0.5s both; }
      `}} />

      <section
        ref={sectionRef}
        className="relative py-24 lg:py-32 bg-gradient-to-b from-white via-reno-cream/30 to-white overflow-hidden"
      >
        {/* Animated background grid */}
        <div className="absolute inset-0 animated-grid">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, #1D6B3F10 1px, transparent 1px),
                linear-gradient(to bottom, #1D6B3F10 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        {/* Floating particles */}
        <div className="absolute top-20 left-10 w-2 h-2 rounded-full bg-reno-green/20 float-1" />
        <div className="absolute top-40 right-20 w-3 h-3 rounded-full bg-reno-teal/20 float-2" />
        <div className="absolute bottom-32 left-1/4 w-2 h-2 rounded-full bg-reno-amber/20 float-1" />
        <div className="absolute bottom-20 right-1/3 w-3 h-3 rounded-full bg-reno-green/20 float-2" />

        <div className="container mx-auto px-4 relative">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-reno-green-light/50 text-reno-green-dark text-sm font-medium mb-6">
              <Lock className="w-4 h-4" />
              Smart Escrow Protection
            </div>
            <h2 className="font-display text-4xl lg:text-5xl xl:text-6xl text-reno-dark mb-6">
              Your Money, Secured
            </h2>
            <p className="text-lg lg:text-xl text-gray-600">
              Bank-held escrow accounts release payments only when work is verified.
              No more trust issues. No more disputes.
            </p>
          </div>

          {/* Animated Escrow Flow */}
          <div className="max-w-4xl mx-auto mb-16">
            <svg
              viewBox="0 0 800 120"
              className="w-full h-auto"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Connection lines with animated flow */}
              <line
                x1="100"
                y1="60"
                x2="250"
                y2="60"
                stroke={activeStage >= 1 ? '#1D6B3F' : '#E5E7EB'}
                strokeWidth="2"
                className={activeStage >= 1 ? 'flow-line' : ''}
              />
              <line
                x1="350"
                y1="60"
                x2="500"
                y2="60"
                stroke={activeStage >= 2 ? '#1D6B3F' : '#E5E7EB'}
                strokeWidth="2"
                className={activeStage >= 2 ? 'flow-line' : ''}
              />
              <line
                x1="600"
                y1="60"
                x2="750"
                y2="60"
                stroke={activeStage >= 3 ? '#1D6B3F' : '#E5E7EB'}
                strokeWidth="2"
                className={activeStage >= 3 ? 'flow-line' : ''}
              />

              {/* Stage 1: Fund */}
              <g transform="translate(50, 30)">
                <circle
                  cx="25"
                  cy="30"
                  r="28"
                  fill={activeStage === 0 ? '#E4F0E8' : '#F3F4F6'}
                  stroke={activeStage === 0 ? '#1D6B3F' : '#D1D5DB'}
                  strokeWidth="2"
                  className={activeStage === 0 ? 'stage-glow' : ''}
                />
                <circle
                  cx="25"
                  cy="30"
                  r="18"
                  fill={activeStage === 0 ? '#1D6B3F' : '#9CA3AF'}
                />
                <path
                  d="M 25 24 L 18 35 L 20 35 L 20 40 L 30 40 L 30 35 L 32 35 Z"
                  fill="white"
                />
                <text
                  x="25"
                  y="75"
                  textAnchor="middle"
                  className="text-sm font-medium"
                  fill={activeStage === 0 ? '#1D6B3F' : '#6B7280'}
                >
                  Fund
                </text>
              </g>

              {/* Stage 2: Secured */}
              <g transform="translate(275, 30)">
                <circle
                  cx="25"
                  cy="30"
                  r="28"
                  fill={activeStage === 1 ? '#E4F0E8' : '#F3F4F6'}
                  stroke={activeStage === 1 ? '#1D6B3F' : '#D1D5DB'}
                  strokeWidth="2"
                  className={activeStage === 1 ? 'stage-glow' : ''}
                />
                <circle
                  cx="25"
                  cy="30"
                  r="18"
                  fill={activeStage === 1 ? '#1D6B3F' : '#9CA3AF'}
                />
                <rect
                  x="18"
                  y="26"
                  width="14"
                  height="12"
                  rx="1"
                  fill="white"
                />
                <rect
                  x="22"
                  y="22"
                  width="6"
                  height="4"
                  rx="3"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                />
                <text
                  x="25"
                  y="75"
                  textAnchor="middle"
                  className="text-sm font-medium"
                  fill={activeStage === 1 ? '#1D6B3F' : '#6B7280'}
                >
                  Secured
                </text>
              </g>

              {/* Stage 3: Verified */}
              <g transform="translate(525, 30)">
                <circle
                  cx="25"
                  cy="30"
                  r="28"
                  fill={activeStage === 2 ? '#E4F0E8' : '#F3F4F6'}
                  stroke={activeStage === 2 ? '#1D6B3F' : '#D1D5DB'}
                  strokeWidth="2"
                  className={activeStage === 2 ? 'stage-glow' : ''}
                />
                <circle
                  cx="25"
                  cy="30"
                  r="18"
                  fill={activeStage === 2 ? '#1D6B3F' : '#9CA3AF'}
                />
                <path
                  d="M 20 30 L 23 33 L 30 26"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <text
                  x="25"
                  y="75"
                  textAnchor="middle"
                  className="text-sm font-medium"
                  fill={activeStage === 2 ? '#1D6B3F' : '#6B7280'}
                >
                  Verified
                </text>
              </g>

              {/* Stage 4: Released */}
              <g transform="translate(725, 30)">
                <circle
                  cx="25"
                  cy="30"
                  r="28"
                  fill={activeStage === 3 ? '#E4F0E8' : '#F3F4F6'}
                  stroke={activeStage === 3 ? '#1D6B3F' : '#D1D5DB'}
                  strokeWidth="2"
                  className={activeStage === 3 ? 'stage-glow' : ''}
                />
                <circle
                  cx="25"
                  cy="30"
                  r="18"
                  fill={activeStage === 3 ? '#1D6B3F' : '#9CA3AF'}
                />
                <rect
                  x="18"
                  y="26"
                  width="14"
                  height="12"
                  rx="1"
                  fill="white"
                />
                <path
                  d="M 22 22 Q 22 20 24 20 Q 26 20 26 22 L 26 26"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                />
                <text
                  x="25"
                  y="75"
                  textAnchor="middle"
                  className="text-sm font-medium"
                  fill={activeStage === 3 ? '#1D6B3F' : '#6B7280'}
                >
                  Released
                </text>
              </g>
            </svg>
          </div>

          {/* Interactive Vault Card */}
          <div className="max-w-2xl mx-auto mb-16">
            <div className="relative bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
              {/* Vault header */}
              <div className="relative bg-gradient-to-br from-reno-dark via-reno-dark to-gray-800 px-8 py-10">
                <div className="absolute inset-0 opacity-10">
                  <div
                    style={{
                      backgroundImage: `
                        linear-gradient(45deg, transparent 48%, rgba(255,255,255,0.1) 49%, rgba(255,255,255,0.1) 51%, transparent 52%),
                        linear-gradient(-45deg, transparent 48%, rgba(255,255,255,0.1) 49%, rgba(255,255,255,0.1) 51%, transparent 52%)
                      `,
                      backgroundSize: '20px 20px',
                    }}
                    className="w-full h-full"
                  />
                </div>

                <div className="relative">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-reno-green/20 flex items-center justify-center">
                        <Lock className="w-6 h-6 text-reno-green-light" />
                      </div>
                      <div>
                        <div className="text-gray-400 text-sm">Escrow Balance</div>
                        <div className="text-white/60 text-xs">Bank-held · 58% secured</div>
                      </div>
                    </div>

                    {/* Animated progress ring */}
                    <div className="relative w-16 h-16">
                      <svg className="transform -rotate-90 w-16 h-16">
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="6"
                          fill="none"
                        />
                        <circle
                          cx="32"
                          cy="32"
                          r="28"
                          stroke="#1D6B3F"
                          strokeWidth="6"
                          fill="none"
                          strokeDasharray="339"
                          strokeDashoffset="142"
                          strokeLinecap="round"
                          className={isVisible ? 'progress-circle' : ''}
                        />
                      </svg>
                      <div className="absolute inset-0 flex items-center justify-center text-white text-sm font-bold">
                        58%
                      </div>
                    </div>
                  </div>

                  <div className="text-5xl font-bold text-white mb-2">
                    ${balance.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Milestones */}
              <div className="p-8 space-y-4">
                {milestones.map((milestone, index) => {
                  const Icon = milestone.icon;
                  return (
                    <div
                      key={milestone.title}
                      className={`flex items-center justify-between p-4 rounded-lg border border-gray-100 bg-gray-50/50 transition-all hover:bg-gray-50 hover:border-gray-200 ${
                        isVisible ? `slide-in-${index + 1}` : 'opacity-0'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            milestone.status === 'approved'
                              ? 'bg-emerald-100'
                              : milestone.status === 'review'
                              ? 'bg-amber-100'
                              : 'bg-gray-100'
                          }`}
                        >
                          <Icon
                            className={`w-5 h-5 ${
                              milestone.status === 'approved'
                                ? 'text-emerald-600'
                                : milestone.status === 'review'
                                ? 'text-amber-600'
                                : 'text-gray-400'
                            }`}
                          />
                        </div>
                        <div>
                          <div className="font-medium text-gray-900">
                            {milestone.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            ${milestone.amount.toLocaleString()}
                          </div>
                        </div>
                      </div>

                      <div className="relative">
                        <div
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            milestone.status === 'approved'
                              ? 'bg-emerald-100 text-emerald-700'
                              : milestone.status === 'review'
                              ? 'bg-amber-100 text-amber-700'
                              : 'bg-gray-100 text-gray-500'
                          }`}
                        >
                          {milestone.status === 'approved'
                            ? 'Approved'
                            : milestone.status === 'review'
                            ? 'In Review'
                            : 'Upcoming'}
                        </div>
                        {milestone.status === 'review' && (
                          <div className="absolute inset-0 rounded-full">
                            <div className="pulse-ring absolute inset-0 rounded-full bg-amber-400" />
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Action button */}
              <div className="px-8 pb-8">
                <button
                  className="w-full bg-gradient-to-r from-reno-green to-reno-green-dark text-white font-semibold py-4 rounded-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 shimmer-button bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  <span className="relative flex items-center justify-center gap-2">
                    Approve Release
                    <Unlock className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Trust Indicators */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {trustIndicators.map((indicator, index) => {
              const Icon = indicator.icon;
              return (
                <div
                  key={indicator.title}
                  className={`group relative bg-white rounded-xl p-6 border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                    isVisible
                      ? `slide-in-${index + 2}`
                      : 'opacity-0'
                  }`}
                >
                  <div
                    className={`absolute inset-0 rounded-xl bg-gradient-to-br ${indicator.color} ${indicator.hoverColor} transition-all duration-300`}
                  />
                  <div className="relative">
                    <div
                      className={`w-12 h-12 rounded-lg ${indicator.iconBg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className={`w-6 h-6 ${indicator.iconColor}`} />
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900 mb-2">
                      {indicator.title}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {indicator.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
