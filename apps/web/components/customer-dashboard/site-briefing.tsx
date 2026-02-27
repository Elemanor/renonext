'use client';

import { HardHat, MapPin } from 'lucide-react';

export function ProgressRing({ current, total }: { current: number; total: number }) {
  const size = 52;
  const strokeWidth = 5;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = current / total;
  const offset = circumference * (1 - progress);

  return (
    <div className="relative flex items-center justify-center flex-shrink-0">
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth={strokeWidth} />
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="url(#progressGradient)" strokeWidth={strokeWidth} strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} className="transition-all duration-1000 ease-out" />
        <defs>
          <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-white/90 text-xs tracking-tight">{current}</span>
        <span className="text-gray-600 text-[8px] -mt-0.5">of {total}</span>
      </div>
    </div>
  );
}

export function SiteBriefing() {
  return (
    <div className="px-5 lg:px-0 pt-3 lg:pt-0 pb-2 lg:pb-0">
      <div className="flex items-center gap-2 mb-3 lg:mb-1.5">
        <div className="w-8 h-8 lg:w-6 lg:h-6 rounded-lg bg-amber-500/20 flex items-center justify-center">
          <HardHat className="w-[18px] h-[18px] lg:w-3.5 lg:h-3.5 text-amber-400" />
        </div>
        <h1 className="text-white/90 tracking-tight">Today&apos;s Site Briefing</h1>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 ml-1">
            <MapPin className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" />
            <p className="text-white/80">42 Maple Drive</p>
          </div>
          <p className="text-gray-500 text-sm mt-1.5 lg:mt-0.5 ml-1 tracking-tight">Great progress! Day 14 of 42 · Foundation Stage Complete</p>
        </div>
        <ProgressRing current={14} total={42} />
      </div>
    </div>
  );
}
