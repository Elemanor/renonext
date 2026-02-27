'use client';

import { Sun, Wind, Droplets, Thermometer } from 'lucide-react';

export function WeatherBar() {
  return (
    <div className="mx-5 lg:mx-0 my-2 lg:my-0 bg-gradient-to-r from-[#141419] to-[#17171f] rounded-xl p-3.5 lg:p-3 border border-white/[0.06] shadow-lg shadow-black/20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 flex items-center justify-center">
            <Sun className="w-5 h-5 text-amber-400" />
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-white/90 text-lg tracking-tight">18°C</span>
              <span className="text-gray-500 text-[10px]">Partly Cloudy</span>
            </div>
            <p className="text-gray-600 text-[10px]">Sunset 7:42 PM</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-center gap-0.5">
            <Wind className="w-3.5 h-3.5 text-sky-400/70" />
            <span className="text-[9px] text-gray-500">12 km/h</span>
          </div>
          <div className="w-[1px] h-6 bg-white/[0.06]" />
          <div className="flex flex-col items-center gap-0.5">
            <Droplets className="w-3.5 h-3.5 text-blue-400/70" />
            <span className="text-[9px] text-gray-500">45%</span>
          </div>
          <div className="w-[1px] h-6 bg-white/[0.06]" />
          <div className="flex flex-col items-center gap-0.5">
            <Thermometer className="w-3.5 h-3.5 text-orange-400/70" />
            <span className="text-[9px] text-gray-500">UV 3</span>
          </div>
        </div>
      </div>
    </div>
  );
}
