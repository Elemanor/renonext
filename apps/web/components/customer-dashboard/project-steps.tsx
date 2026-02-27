'use client';

import { Layers, CheckCircle2, Circle } from 'lucide-react';

const projectPhases = [
  { name: 'Site Preparation', status: 'completed' as const },
  { name: 'Foundation', status: 'completed' as const },
  { name: 'Framing', status: 'active' as const },
  { name: 'MEP Rough-In', status: 'upcoming' as const },
  { name: 'Interior Finishes', status: 'upcoming' as const },
  { name: 'Final Inspection', status: 'upcoming' as const },
];

const completedCount = projectPhases.filter((p) => p.status === 'completed').length;
const pct = Math.round((completedCount / projectPhases.length) * 100);

export function ProjectSteps() {
  return (
    <div className="bg-[#141419] rounded-xl p-4 lg:p-3 border border-white/[0.06] shadow-lg shadow-black/20 h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 lg:mb-2 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center">
            <Layers className="w-3.5 h-3.5 text-blue-400" />
          </div>
          <h2 className="text-white/90 text-sm tracking-tight">Project Phases</h2>
        </div>
        <span className="text-indigo-400 text-[10px] bg-indigo-400/10 px-2 py-0.5 rounded-md">
          {completedCount}/{projectPhases.length}
        </span>
      </div>

      {/* Phase list */}
      <div className="flex-1 space-y-1.5 min-h-0">
        {projectPhases.map((phase, i) => (
          <div
            key={phase.name}
            className={`flex items-center gap-2.5 rounded-lg px-2.5 py-1.5 ${
              phase.status === 'active'
                ? 'bg-amber-500/[0.08] border border-amber-500/15'
                : 'bg-white/[0.02] border border-transparent'
            }`}
          >
            {/* Status icon */}
            {phase.status === 'completed' ? (
              <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
            ) : phase.status === 'active' ? (
              <div className="w-4 h-4 rounded-full border-2 border-amber-400 flex items-center justify-center flex-shrink-0">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
              </div>
            ) : (
              <Circle className="w-4 h-4 text-gray-700 flex-shrink-0" />
            )}

            {/* Name */}
            <span
              className={`flex-1 text-xs ${
                phase.status === 'completed'
                  ? 'text-gray-500 line-through'
                  : phase.status === 'active'
                    ? 'text-white/90'
                    : 'text-gray-600'
              }`}
            >
              {phase.name}
            </span>

            {/* Badge */}
            {phase.status === 'active' && (
              <span className="text-[9px] text-amber-400 bg-amber-400/15 px-1.5 py-0.5 rounded flex-shrink-0">
                Current
              </span>
            )}
            <span
              className={`text-[9px] px-1.5 py-0.5 rounded flex-shrink-0 ${
                phase.status === 'completed'
                  ? 'bg-green-500/10 text-green-400'
                  : phase.status === 'active'
                    ? 'bg-amber-500/15 text-amber-400'
                    : 'bg-white/[0.04] text-gray-600'
              }`}
            >
              {i + 1}
            </span>
          </div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="mt-2 pt-2 border-t border-white/[0.06] flex-shrink-0">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] text-gray-500">Overall Progress</span>
          <span className="text-[10px] text-white/60">{pct}%</span>
        </div>
        <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>
    </div>
  );
}
