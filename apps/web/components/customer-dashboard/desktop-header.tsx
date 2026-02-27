'use client';

import { Bell, Search, Menu } from 'lucide-react';

export function DesktopHeader() {
  return (
    <div className="flex-shrink-0 z-40 bg-[#0a0a0f]/95 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="px-6 py-2 flex items-center justify-between">
        <div>
          <h1 className="text-white text-xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-gray-500 text-xs mt-0.5">Wednesday, February 25, 2026</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <div className="w-56 bg-white/[0.05] border border-white/[0.06] rounded-lg pl-9 pr-3 py-2 text-sm text-gray-500 flex items-center">
              Search updates, photos...
            </div>
          </div>
          <button className="relative w-9 h-9 rounded-lg bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center transition-colors group">
            <Bell className="w-[18px] h-[18px] text-gray-400 group-hover:text-gray-300" />
            <div className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          </button>
          <button className="w-9 h-9 rounded-lg bg-white/[0.05] hover:bg-white/[0.08] border border-white/[0.06] flex items-center justify-center transition-colors group">
            <Menu className="w-[18px] h-[18px] text-gray-400 group-hover:text-gray-300" />
          </button>
        </div>
      </div>
    </div>
  );
}
