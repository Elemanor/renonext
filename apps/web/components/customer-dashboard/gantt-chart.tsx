'use client';

import { Calendar, Clock } from 'lucide-react';

const phases = [
  { name: 'Foundation', left: 0, width: 22, status: 'done' as const },
  { name: 'Framing', left: 14, width: 24, status: 'active' as const, progress: 65 },
  { name: 'Electrical', left: 32, width: 22, status: 'upcoming' as const },
  { name: 'Plumbing', left: 36, width: 20, status: 'upcoming' as const },
  { name: 'Drywall', left: 52, width: 22, status: 'upcoming' as const },
  { name: 'Finishing', left: 68, width: 28, status: 'upcoming' as const },
];

const barStyle = {
  done: 'bg-gradient-to-r from-emerald-600 to-emerald-500',
  active: 'bg-gradient-to-r from-amber-600 to-amber-500',
  upcoming: 'border border-white/[0.08] bg-white/[0.03]',
} as const;

export function GanttChart() {
  return (
    <div className="bg-[#141419] rounded-xl p-4 lg:p-3 border border-white/[0.06] shadow-lg shadow-black/20 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 lg:mb-2 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-cyan-500/20 flex items-center justify-center">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
          </div>
          <h2 className="text-white/90 text-sm tracking-tight">Project Timeline</h2>
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3 text-gray-500" />
          <span className="text-gray-500 text-[10px]">Feb – Mar 2026</span>
        </div>
      </div>

      {/* Date axis */}
      <div className="flex justify-between text-[9px] text-gray-600 mb-1.5 pl-16 pr-1 flex-shrink-0">
        <span>Feb 1</span>
        <span>Feb 15</span>
        <span className="text-amber-400/70">Today</span>
        <span>Mar 15</span>
        <span>Mar 30</span>
      </div>

      {/* Chart rows */}
      <div className="relative flex-1 space-y-1">
        {/* Today marker */}
        <div
          className="absolute top-0 bottom-0 w-px z-10"
          style={{
            left: 'calc(3.5rem + 38% * (100% - 3.5rem))',
            background:
              'repeating-linear-gradient(to bottom, rgba(251,191,36,0.5) 0 3px, transparent 3px 6px)',
          }}
        />

        {phases.map((p) => (
          <div key={p.name} className="flex items-center gap-2 h-[18px]">
            <span className="w-14 flex-shrink-0 text-[10px] text-gray-400 truncate">
              {p.name}
            </span>
            <div className="flex-1 relative h-full rounded bg-white/[0.015]">
              <div
                className={`absolute top-0 bottom-0 rounded ${barStyle[p.status]}`}
                style={{ left: `${p.left}%`, width: `${p.width}%` }}
              >
                {p.status !== 'upcoming' && (
                  <span className="absolute inset-0 flex items-center justify-center text-[8px] text-white/80 font-medium">
                    {p.status === 'done' ? '100%' : `${p.progress}%`}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 mt-2 pt-2 border-t border-white/[0.06] flex-shrink-0">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-sm bg-emerald-500" />
          <span className="text-[9px] text-gray-500">Complete</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-sm bg-amber-500" />
          <span className="text-[9px] text-gray-500">Active</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-sm border border-white/[0.12] bg-white/[0.03]" />
          <span className="text-[9px] text-gray-500">Upcoming</span>
        </div>
      </div>
    </div>
  );
}
