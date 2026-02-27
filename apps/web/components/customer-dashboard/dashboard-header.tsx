'use client';

import { useState } from 'react';
import { Bell } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const notifications = [
  { id: 1, text: 'Inspector confirmed visit at 1 PM', time: '2m ago', color: 'bg-indigo-400' },
  { id: 2, text: 'Dumpster delivery rescheduled to 11:45 AM', time: '18m ago', color: 'bg-sky-400' },
  { id: 3, text: 'Noise complaint filed by adjacent lot', time: '32m ago', color: 'bg-orange-400' },
];

export function DashboardHeader({ compact = false }: { compact?: boolean }) {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div className={compact ? 'px-5 pt-1 pb-3' : 'px-5 lg:px-0 pt-1 lg:pt-0 pb-3 lg:pb-0'}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-white/50 text-xs tracking-wide">Tuesday, Feb 25</p>
          <h1 className={`text-white/90 tracking-tight mt-0.5 ${compact ? 'text-[15px] font-semibold' : 'text-lg'}`}>
            Good morning, Sarah
          </h1>
        </div>
        <button
          className="relative w-10 h-10 rounded-full bg-white/[0.05] border border-white/[0.06] flex items-center justify-center hover:bg-white/[0.08] transition-colors"
          onClick={() => setShowNotifications(!showNotifications)}
        >
          <Bell className="w-[18px] h-[18px] text-white/70" />
          <div className="absolute -top-0.5 -right-0.5 w-[18px] h-[18px] bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-[9px]">3</span>
          </div>
        </button>
      </div>

      <AnimatePresence>
        {showNotifications && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mt-3 bg-[#141419] rounded-xl border border-white/[0.06] overflow-hidden">
              {notifications.map((n, i) => (
                <div
                  key={n.id}
                  className={`flex items-start gap-2.5 p-3 ${i < notifications.length - 1 ? 'border-b border-white/[0.04]' : ''}`}
                >
                  <div className={`w-2 h-2 rounded-full ${n.color} mt-1.5 flex-shrink-0`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-white/75 text-xs">{n.text}</p>
                    <p className="text-gray-600 text-[10px] mt-0.5">{n.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
