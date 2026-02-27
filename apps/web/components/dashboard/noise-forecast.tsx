'use client';

import { Volume2 } from 'lucide-react';
import { AnimatedCard } from './animated-card';
import { noiseTimePoints } from '@/lib/mock-data/command-center';

function levelColor(level: number) {
  if (level >= 70) return 'from-red-500/60 to-orange-500/40';
  if (level >= 40) return 'from-amber-500/50 to-yellow-500/30';
  return 'from-emerald-500/40 to-teal-500/20';
}

function levelLabel(level: number) {
  if (level >= 70) return 'High';
  if (level >= 40) return 'Moderate';
  return 'Low';
}

export function NoiseForecast() {
  return (
    <AnimatedCard delay={0.3}>
      <div className="mb-3 flex items-center gap-2">
        <Volume2 className="h-4 w-4 text-gray-500" />
        <span className="text-xs font-medium text-white/80">Noise Forecast</span>
      </div>

      {/* Gradient bar */}
      <div className="mb-2 flex h-8 gap-px overflow-hidden rounded-lg">
        {noiseTimePoints.map((pt, i) => (
          <div
            key={i}
            className={`flex-1 bg-gradient-to-t ${levelColor(pt.level)} flex items-center justify-center`}
          >
            <span className="text-[9px] font-medium text-white/70">{levelLabel(pt.level)}</span>
          </div>
        ))}
      </div>

      {/* Time labels */}
      <div className="mb-3 flex">
        {noiseTimePoints.map((pt, i) => (
          <div key={i} className="flex-1 text-center text-[10px] text-gray-600">
            {pt.time}
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-4">
        {[
          { label: 'Low', color: 'bg-emerald-500/50' },
          { label: 'Moderate', color: 'bg-amber-500/50' },
          { label: 'High', color: 'bg-red-500/50' },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <div className={`h-2 w-2 rounded-full ${item.color}`} />
            <span className="text-[10px] text-gray-500">{item.label}</span>
          </div>
        ))}
      </div>
    </AnimatedCard>
  );
}
