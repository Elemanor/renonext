'use client';

import { Volume2, ChevronRight } from 'lucide-react';

const timePoints = ['9:30 AM', '11 AM', '1:00 PM', '3:00 PM', '5:00 PM'];
const segments = [
  { color: 'from-red-600 to-orange-600', label: 'High' },
  { color: 'from-orange-600 to-yellow-500', label: 'Medium' },
  { color: 'from-yellow-500 to-green-500', label: 'Low' },
  { color: 'from-green-500 to-emerald-600', label: 'Quiet' },
];

export function NoiseActivityForecast() {
  return (
    <div className="bg-[#141419] rounded-xl p-4 lg:p-3 border border-white/[0.06] shadow-lg shadow-black/20 h-full">
      <div className="flex items-center justify-between mb-4 lg:mb-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-purple-500/20 flex items-center justify-center">
            <Volume2 className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <h2 className="text-white/90 text-sm tracking-tight">Today&apos;s Work &amp; Noise Levels</h2>
        </div>
        <button className="flex items-center gap-0.5 text-gray-500 text-[10px] hover:text-gray-400 transition-colors">
          <span>View details</span>
          <ChevronRight className="w-3 h-3" />
        </button>
      </div>
      <div className="relative">
        <div className="flex justify-between text-[10px] text-gray-500 mb-2 px-0.5">
          {timePoints.map((time, i) => (
            <span key={i} className={i === 0 ? 'text-white/70' : ''}>{time}</span>
          ))}
        </div>
        <div className="h-2.5 rounded-full overflow-hidden flex gap-[1px]">
          {segments.map((seg, i) => (
            <div key={i} className={`flex-1 bg-gradient-to-r ${seg.color} ${i === 0 ? 'rounded-l-full' : ''} ${i === segments.length - 1 ? 'rounded-r-full' : ''}`} />
          ))}
        </div>
        <div className="absolute left-[5%] top-0 bottom-0 flex flex-col items-center">
          <div className="w-[1px] h-full bg-white/30" />
        </div>
        <div className="flex items-center gap-3 mt-3">
          {[
            { color: 'bg-red-600', label: 'High' },
            { color: 'bg-orange-600', label: 'Med' },
            { color: 'bg-yellow-500', label: 'Low' },
            { color: 'bg-green-500', label: 'Quiet' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
              <span className="text-[9px] text-gray-500">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
