'use client';

import { useState } from 'react';
import { Plus, X, AlertTriangle, Truck, Camera, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const actions = [
  { icon: AlertTriangle, label: 'Report Issue', color: 'bg-orange-500' },
  { icon: Truck, label: 'Request Delivery', color: 'bg-sky-500' },
  { icon: Camera, label: 'Site Photo', color: 'bg-purple-500' },
  { icon: MessageSquare, label: 'Message Team', color: 'bg-green-500' },
];

export function QuickActionFAB() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-24 right-5 z-40 flex flex-col items-end gap-2.5">
      <AnimatePresence>
        {open && (
          <>
            <motion.div className="fixed inset-0 bg-black/50 backdrop-blur-[2px]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} onClick={() => setOpen(false)} />
            <div className="relative z-10 flex flex-col items-end gap-2">
              {actions.map((action, i) => (
                <motion.button key={action.label} className="flex items-center gap-2.5 group" initial={{ opacity: 0, y: 15, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.8 }} transition={{ duration: 0.25, delay: (actions.length - 1 - i) * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }} onClick={() => setOpen(false)}>
                  <span className="bg-[#1a1a24] text-white/80 text-xs px-3 py-1.5 rounded-lg border border-white/[0.06] opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{action.label}</span>
                  <div className={`w-11 h-11 rounded-full ${action.color} flex items-center justify-center shadow-lg`}>
                    <action.icon className="w-[18px] h-[18px] text-white" />
                  </div>
                </motion.button>
              ))}
            </div>
          </>
        )}
      </AnimatePresence>
      <motion.button
        className="relative z-10 w-[52px] h-[52px] rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center shadow-[0_8px_24px_rgba(251,146,60,0.4)]"
        onClick={() => setOpen(!open)}
        whileTap={{ scale: 0.92 }}
        animate={{ rotate: open ? 135 : 0 }}
        transition={{ duration: 0.25 }}
      >
        {open ? <X className="w-[22px] h-[22px] text-white" /> : <Plus className="w-[22px] h-[22px] text-white" />}
      </motion.button>
    </div>
  );
}
