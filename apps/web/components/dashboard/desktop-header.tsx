'use client';

import { Search, Bell } from 'lucide-react';

export function DesktopHeader() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });

  return (
    <header className="hidden h-16 shrink-0 items-center justify-between border-b border-white/[0.06] px-6 lg:flex">
      {/* Search */}
      <div className="flex max-w-sm flex-1 items-center gap-2 rounded-xl bg-white/[0.04] px-3 py-2">
        <Search className="h-4 w-4 text-slate-600" />
        <input
          type="text"
          placeholder="Search…"
          className="w-full bg-transparent text-sm text-white/80 placeholder-slate-600 outline-none"
        />
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        <span className="text-xs text-slate-500">{today}</span>
        <button className="relative rounded-lg p-2 text-slate-500 transition-colors hover:bg-white/[0.06] hover:text-slate-300">
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-reno-green-500" />
        </button>
      </div>
    </header>
  );
}
