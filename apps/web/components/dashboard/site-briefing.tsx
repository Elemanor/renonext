'use client';

import { MapPin, Clock } from 'lucide-react';
import { AnimatedCard } from './animated-card';
import { siteAddress, projectDay, projectTotalDays, teamMembers } from '@/lib/mock-data/command-center';

const progressPercent = Math.round((projectDay / projectTotalDays) * 100);
const circumference = 2 * Math.PI * 18;
const strokeOffset = circumference - (progressPercent / 100) * circumference;

export function SiteBriefing() {
  return (
    <AnimatedCard className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between" delay={0}>
      {/* Left: progress ring + address */}
      <div className="flex items-center gap-4">
        <div className="relative flex h-12 w-12 shrink-0 items-center justify-center">
          <svg className="h-12 w-12 -rotate-90" viewBox="0 0 40 40">
            <circle cx="20" cy="20" r="18" fill="none" stroke="currentColor" strokeWidth="3" className="text-white/[0.06]" />
            <circle
              cx="20" cy="20" r="18" fill="none"
              stroke="currentColor" strokeWidth="3" strokeLinecap="round"
              strokeDasharray={circumference} strokeDashoffset={strokeOffset}
              className="text-emerald-400"
            />
          </svg>
          <span className="absolute text-[10px] font-bold text-white/90">{progressPercent}%</span>
        </div>
        <div>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <MapPin className="h-3 w-3" />
            {siteAddress}
          </div>
          <p className="mt-0.5 text-sm font-semibold text-white/90">
            Day {projectDay} of {projectTotalDays}
          </p>
        </div>
      </div>

      {/* Right: crew on site */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-gray-500" />
          <span className="text-xs text-gray-400">{teamMembers.filter(m => m.status === 'on-site').length} on site</span>
        </div>
        <div className="flex -space-x-2">
          {teamMembers.map((m) => (
            <div
              key={m.name}
              className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-[#141419] bg-gradient-to-br from-white/10 to-white/5 text-[9px] font-semibold text-white/70"
              title={`${m.name} — ${m.role}`}
            >
              {m.avatar}
            </div>
          ))}
        </div>
      </div>
    </AnimatedCard>
  );
}
