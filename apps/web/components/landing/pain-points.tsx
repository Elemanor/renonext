'use client';

import { useEffect, useRef, useState } from 'react';

export function PainPoints() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [cardVisibility, setCardVisibility] = useState([false, false, false]);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setIsVisible(true);
      setCardVisibility([true, true, true]);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            // Stagger card animations
            setTimeout(() => setCardVisibility([true, false, false]), 100);
            setTimeout(() => setCardVisibility([true, true, false]), 300);
            setTimeout(() => setCardVisibility([true, true, true]), 500);
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
      className="relative py-24 px-6 overflow-hidden bg-reno-cream"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <h2
          className={`font-display text-4xl md:text-5xl lg:text-6xl text-reno-dark text-center mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Right now, renovating looks like this.
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: The Quote Lottery */}
          <PainPointCard
            isVisible={cardVisibility[0]}
            index={0}
            title="The Quote Lottery"
            subtitle="Which is real? None. They're all guesses."
            bgColor="bg-reno-red-light"
            borderColor="border-l-reno-red"
            illustration={<QuoteLotteryIllustration isVisible={cardVisibility[0]} />}
            hoverEffect="hover:shadow-xl hover:scale-[1.02] active:scale-[0.98]"
          />

          {/* Card 2: The Trust Fall */}
          <PainPointCard
            isVisible={cardVisibility[1]}
            index={1}
            title="The Trust Fall"
            subtitle="You hand $30K to someone you met once."
            bgColor="bg-reno-amber-light"
            borderColor="border-l-reno-amber"
            illustration={<TrustFallIllustration isVisible={cardVisibility[1]} />}
            hoverEffect="hover:shadow-xl hover:scale-[1.02]"
          />

          {/* Card 3: The Vanishing Act */}
          <PainPointCard
            isVisible={cardVisibility[2]}
            index={2}
            title="The Vanishing Act"
            subtitle='Something breaks in year 2. Contractor changed their number.'
            bgColor="bg-gray-100"
            borderColor="border-l-gray-400"
            illustration={<VanishingActIllustration isVisible={cardVisibility[2]} />}
            hoverEffect="hover:shadow-xl hover:scale-[1.02] hover:grayscale-[0.3]"
          />
        </div>
      </div>
    </section>
  );
}

interface PainPointCardProps {
  isVisible: boolean;
  index: number;
  title: string;
  subtitle: string;
  bgColor: string;
  borderColor: string;
  illustration: React.ReactNode;
  hoverEffect: string;
}

function PainPointCard({
  isVisible,
  index,
  title,
  subtitle,
  bgColor,
  borderColor,
  illustration,
  hoverEffect,
}: PainPointCardProps) {
  return (
    <div
      className={`
        ${bgColor} rounded-2xl p-6 border-l-4 ${borderColor}
        shadow-md transition-all duration-700 ease-out
        ${hoverEffect}
        ${
          isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-8'
        }
      `}
      style={{
        transitionDelay: `${index * 200}ms`,
      }}
    >
      {/* Illustration Area */}
      <div className="h-48 flex items-center justify-center mb-6">
        {illustration}
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-reno-dark mb-3">
        {title}
      </h3>

      {/* Subtitle */}
      <p className="text-gray-700 leading-relaxed">
        {subtitle}
      </p>
    </div>
  );
}

// Card 1: Quote Lottery Illustration
function QuoteLotteryIllustration({ isVisible }: { isVisible: boolean }) {
  const [prices, setPrices] = useState([0, 0, 0]);
  const targetPrices = [40000, 65000, 90000];

  useEffect(() => {
    if (!isVisible) return;

    const duration = 1500; // 1.5 seconds
    const steps = 60;
    const interval = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setPrices([
        Math.floor(targetPrices[0] * progress),
        Math.floor(targetPrices[1] * progress),
        Math.floor(targetPrices[2] * progress),
      ]);

      if (currentStep >= steps) {
        clearInterval(timer);
        setPrices(targetPrices);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [isVisible]);

  return (
    <svg
      viewBox="0 0 300 200"
      className="w-full h-full"
      style={{
        filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))',
      }}
    >
      {/* Price Tag 1 - Left (rotated -10deg) */}
      <g
        transform="translate(30, 40) rotate(-10)"
        className={`transition-all duration-700 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transformOrigin: '50px 70px' }}
      >
        <path
          d="M 0 20 L 10 0 L 90 0 L 100 20 L 90 140 L 10 140 Z"
          fill="#FFFFFF"
          stroke="#B83226"
          strokeWidth="2"
        />
        <circle cx="50" cy="30" r="8" fill="none" stroke="#B83226" strokeWidth="2" />
        <text
          x="50"
          y="90"
          textAnchor="middle"
          fontSize="20"
          fontWeight="bold"
          fill="#B83226"
        >
          ${(prices[0] / 1000).toFixed(0)}K
        </text>
      </g>

      {/* Price Tag 2 - Center */}
      <g
        transform="translate(100, 20)"
        className={`transition-all duration-700 delay-200 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <path
          d="M 0 20 L 10 0 L 90 0 L 100 20 L 90 150 L 10 150 Z"
          fill="#FFFFFF"
          stroke="#B83226"
          strokeWidth="2.5"
        />
        <circle cx="50" cy="35" r="10" fill="none" stroke="#B83226" strokeWidth="2.5" />
        <text
          x="50"
          y="100"
          textAnchor="middle"
          fontSize="24"
          fontWeight="bold"
          fill="#B83226"
        >
          ${(prices[1] / 1000).toFixed(0)}K
        </text>
      </g>

      {/* Price Tag 3 - Right (rotated +10deg) */}
      <g
        transform="translate(170, 40) rotate(10)"
        className={`transition-all duration-700 delay-400 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ transformOrigin: '50px 70px' }}
      >
        <path
          d="M 0 20 L 10 0 L 90 0 L 100 20 L 90 140 L 10 140 Z"
          fill="#FFFFFF"
          stroke="#B83226"
          strokeWidth="2"
        />
        <circle cx="50" cy="30" r="8" fill="none" stroke="#B83226" strokeWidth="2" />
        <text
          x="50"
          y="90"
          textAnchor="middle"
          fontSize="20"
          fontWeight="bold"
          fill="#B83226"
        >
          ${(prices[2] / 1000).toFixed(0)}K
        </text>
      </g>

      {/* Question Marks */}
      <g className={`transition-opacity duration-1000 delay-700 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <text x="65" y="175" fontSize="32" fill="#B83226" opacity="0.4">?</text>
        <text x="150" y="185" fontSize="32" fill="#B83226" opacity="0.4">?</text>
        <text x="235" y="175" fontSize="32" fill="#B83226" opacity="0.4">?</text>
      </g>
    </svg>
  );
}

// Card 2: Trust Fall Illustration
function TrustFallIllustration({ isVisible }: { isVisible: boolean }) {
  return (
    <svg viewBox="0 0 300 200" className="w-full h-full">
      {/* Hand */}
      <g
        className={`transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
        }`}
      >
        {/* Palm */}
        <ellipse cx="150" cy="50" rx="25" ry="30" fill="#F5E6D3" stroke="#B8860B" strokeWidth="2" />

        {/* Fingers */}
        <path d="M 130 45 Q 125 35 125 25" fill="none" stroke="#B8860B" strokeWidth="8" strokeLinecap="round" />
        <path d="M 140 40 Q 138 28 138 18" fill="none" stroke="#B8860B" strokeWidth="8" strokeLinecap="round" />
        <path d="M 150 38 Q 150 25 150 15" fill="none" stroke="#B8860B" strokeWidth="8" strokeLinecap="round" />
        <path d="M 160 40 Q 162 28 162 18" fill="none" stroke="#B8860B" strokeWidth="8" strokeLinecap="round" />
        <path d="M 170 45 Q 175 35 175 25" fill="none" stroke="#B8860B" strokeWidth="8" strokeLinecap="round" />

        {/* Wrist */}
        <rect x="135" y="70" width="30" height="15" rx="3" fill="#4A90E2" stroke="#2E5C8A" strokeWidth="1.5" />
      </g>

      {/* Falling Dollar Bills - Animated Loop */}
      <g className="animate-float-down">
        <Bill x={120} y={90} delay={0} isVisible={isVisible} />
        <Bill x={155} y={110} delay={0.3} isVisible={isVisible} />
        <Bill x={140} y={130} delay={0.6} isVisible={isVisible} />
        <Bill x={165} y={150} delay={0.9} isVisible={isVisible} />
      </g>

      {/* Void/Gap at bottom */}
      <g className={`transition-opacity duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
        <line x1="50" y1="185" x2="250" y2="185" stroke="#B8860B" strokeWidth="2" strokeDasharray="5,5" opacity="0.5" />
        <text x="150" y="200" textAnchor="middle" fontSize="14" fill="#B8860B" opacity="0.6">
          the void
        </text>
      </g>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pp-float-down {
          0% { transform: translateY(0); opacity: 0.8; }
          100% { transform: translateY(60px); opacity: 0; }
        }
        .animate-float-down { animation: pp-float-down 3s ease-in infinite; }
      `}} />
    </svg>
  );
}

function Bill({ x, y, delay, isVisible }: { x: number; y: number; delay: number; isVisible: boolean }) {
  return (
    <g
      style={{
        animation: isVisible ? `pp-float-down 3s ease-in ${delay}s infinite` : 'none',
      }}
    >
      <rect
        x={x}
        y={y}
        width="30"
        height="14"
        rx="2"
        fill="#85BB65"
        stroke="#5A7F45"
        strokeWidth="1"
      />
      <circle cx={x + 15} cy={y + 7} r="4" fill="#5A7F45" opacity="0.3" />
      <text
        x={x + 15}
        y={y + 10}
        textAnchor="middle"
        fontSize="8"
        fontWeight="bold"
        fill="#2D4A29"
      >
        $
      </text>
    </g>
  );
}

// Card 3: Vanishing Act Illustration
function VanishingActIllustration({ isVisible }: { isVisible: boolean }) {
  const [signalBars, setSignalBars] = useState([true, true, true, true]);
  const [showX, setShowX] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    // Fade out signal bars one by one
    const timers = [
      setTimeout(() => setSignalBars([true, true, true, false]), 800),
      setTimeout(() => setSignalBars([true, true, false, false]), 1200),
      setTimeout(() => setSignalBars([true, false, false, false]), 1600),
      setTimeout(() => setSignalBars([false, false, false, false]), 2000),
      setTimeout(() => setShowX(true), 2200),
    ];

    return () => timers.forEach(clearTimeout);
  }, [isVisible]);

  return (
    <svg viewBox="0 0 300 200" className="w-full h-full">
      {/* Phone */}
      <g
        className={`transition-all duration-700 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Phone body */}
        <rect x="90" y="30" width="120" height="150" rx="12" fill="#1A1A1A" stroke="#333" strokeWidth="3" />

        {/* Screen */}
        <rect x="100" y="45" width="100" height="120" rx="4" fill="#2A2A2A" />

        {/* Notch */}
        <rect x="130" y="40" width="40" height="8" rx="4" fill="#1A1A1A" />

        {/* Signal bars container */}
        <g transform="translate(110, 55)">
          {/* Bar 1 */}
          <rect
            x="0"
            y="15"
            width="8"
            height="5"
            rx="1"
            fill={signalBars[0] ? '#4CAF50' : '#666'}
            className="transition-all duration-300"
          />
          {/* Bar 2 */}
          <rect
            x="12"
            y="10"
            width="8"
            height="10"
            rx="1"
            fill={signalBars[1] ? '#4CAF50' : '#666'}
            className="transition-all duration-300"
          />
          {/* Bar 3 */}
          <rect
            x="24"
            y="5"
            width="8"
            height="15"
            rx="1"
            fill={signalBars[2] ? '#4CAF50' : '#666'}
            className="transition-all duration-300"
          />
          {/* Bar 4 */}
          <rect
            x="36"
            y="0"
            width="8"
            height="20"
            rx="1"
            fill={signalBars[3] ? '#4CAF50' : '#666'}
            className="transition-all duration-300"
          />
        </g>

        {/* Message text */}
        <text x="150" y="110" textAnchor="middle" fontSize="10" fill="#999">
          Number
        </text>
        <text x="150" y="125" textAnchor="middle" fontSize="10" fill="#999">
          disconnected
        </text>

        {/* Red X overlay */}
        {showX && (
          <g className="animate-pulse-slow">
            <line
              x1="125"
              y1="90"
              x2="175"
              y2="140"
              stroke="#EF4444"
              strokeWidth="6"
              strokeLinecap="round"
            />
            <line
              x1="175"
              y1="90"
              x2="125"
              y2="140"
              stroke="#EF4444"
              strokeWidth="6"
              strokeLinecap="round"
            />
          </g>
        )}

        {/* Home button */}
        <circle cx="150" cy="168" r="8" fill="none" stroke="#333" strokeWidth="2" />
      </g>

      {/* Ghost/fade effect */}
      {showX && (
        <g className="transition-opacity duration-500 opacity-20">
          <path
            d="M 80 50 Q 70 100 80 150"
            fill="none"
            stroke="#666"
            strokeWidth="2"
            strokeDasharray="4,4"
          />
          <path
            d="M 220 50 Q 230 100 220 150"
            fill="none"
            stroke="#666"
            strokeWidth="2"
            strokeDasharray="4,4"
          />
        </g>
      )}

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes pp-pulse-slow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        .animate-pulse-slow { animation: pp-pulse-slow 2s ease-in-out infinite; }
      `}} />
    </svg>
  );
}
