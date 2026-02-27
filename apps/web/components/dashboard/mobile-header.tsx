'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X } from 'lucide-react';

const notifications = [
  { id: 1, text: 'Weeping tile delivery en route — ETA 11:30 AM', time: '2m ago', type: 'delivery' as const },
  { id: 2, text: 'Inspection passed: Membrane Application', time: '1d ago', type: 'inspection' as const },
  { id: 3, text: 'Decision needed: Drainage board upgrade', time: '1d ago', type: 'action' as const },
];

export function MobileHeader() {
  const [showNotifs, setShowNotifs] = useState(false);

  return (
    <div className="relative px-4 pb-2 pt-4 lg:hidden">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-gray-500">Good morning,</p>
          <p className="text-sm font-semibold text-white/90">Sarah</p>
        </div>
        <button
          onClick={() => setShowNotifs(!showNotifs)}
          className="relative rounded-xl bg-white/[0.06] p-2.5"
        >
          <Bell className="h-[18px] w-[18px] text-gray-400" />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-emerald-500" />
        </button>
      </div>

      {/* Notification dropdown */}
      <AnimatePresence>
        {showNotifs && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-4 right-4 top-full z-50 mt-1 overflow-hidden rounded-2xl border border-white/[0.08] bg-[#1a1a22] shadow-xl shadow-black/40"
          >
            <div className="flex items-center justify-between p-3">
              <span className="text-xs font-medium text-white/80">Notifications</span>
              <button onClick={() => setShowNotifs(false)}>
                <X className="h-4 w-4 text-gray-500" />
              </button>
            </div>
            <div className="max-h-60 overflow-y-auto px-3 pb-3">
              {notifications.map((n) => (
                <div key={n.id} className="mb-2 rounded-xl bg-white/[0.04] p-3 last:mb-0">
                  <p className="text-[11px] leading-relaxed text-gray-300">{n.text}</p>
                  <p className="mt-1 text-[10px] text-gray-600">{n.time}</p>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
