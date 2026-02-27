'use client';

import { useState } from 'react';
import { LayoutDashboard, CalendarDays, FileText, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const tabs = [
  { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { id: 'schedule', icon: CalendarDays, label: 'Schedule' },
  { id: 'docs', icon: FileText, label: 'Docs' },
  { id: 'chat', icon: MessageCircle, label: 'Chat', badge: 2 },
];

export function BottomTabBar() {
  const [active, setActive] = useState('dashboard');

  return (
    <div className="absolute bottom-0 left-0 right-0 z-40">
      <div className="bg-[#0e0e14]/95 backdrop-blur-xl border-t border-white/[0.06] px-2 pt-1.5 pb-6 shadow-[0_-8px_32px_rgba(0,0,0,0.4)]">
        <div className="flex items-center justify-around">
          {tabs.map((tab) => {
            const isActive = active === tab.id;
            return (
              <button key={tab.id} className="relative flex flex-col items-center gap-0.5 py-1 px-4" onClick={() => setActive(tab.id)}>
                {isActive && (
                  <motion.div className="absolute -top-1.5 w-5 h-[2px] bg-amber-400 rounded-full" layoutId="tabIndicator" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />
                )}
                <div className="relative">
                  <tab.icon className={`w-5 h-5 transition-colors ${isActive ? 'text-white' : 'text-gray-600'}`} />
                  {tab.badge && (
                    <div className="absolute -top-1 -right-2 w-3.5 h-3.5 bg-red-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-[8px]">{tab.badge}</span>
                    </div>
                  )}
                </div>
                <span className={`text-[10px] transition-colors ${isActive ? 'text-white/80' : 'text-gray-600'}`}>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
