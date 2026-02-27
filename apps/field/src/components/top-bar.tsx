import { Bell, Cloud, CloudCheck } from 'lucide-react';
import { MOCK_DASHBOARD } from '@/lib/mock/dashboard';
import { useState, useEffect } from 'react';

export function TopBar() {
  const unread = MOCK_DASHBOARD.notifications.unread;
  const [syncing, setSyncing] = useState(false);

  // Simulate periodic syncing for UI demo
  useEffect(() => {
    const interval = setInterval(() => {
      setSyncing(true);
      setTimeout(() => setSyncing(false), 2000);
    }, 15000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4 md:hidden">
      <div className="flex items-center gap-2">
        <span className="text-sm font-bold tracking-tight text-slate-900">
          RenoNext <span className="text-blue-600">Field</span>
        </span>
        <div className="flex items-center gap-1 rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-medium text-slate-500 transition-all duration-500">
          {syncing ? (
            <>
              <Cloud className="h-3 w-3 animate-pulse text-blue-500" />
              <span>Syncing...</span>
            </>
          ) : (
            <>
              <CloudCheck className="h-3 w-3 text-emerald-500" />
              <span>Synced</span>
            </>
          )}
        </div>
      </div>

      <button className="relative flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 transition-colors hover:bg-slate-100">
        <Bell className="h-5 w-5" />
        {unread > 0 && (
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" />
        )}
      </button>
    </header>
  );
}
