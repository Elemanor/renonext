'use client';

import { useState } from 'react';
import { Lock, ShieldCheck, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const milestones = [
  { label: 'Deposit', amount: '$12,000', completed: true },
  { label: 'Excavation', amount: '$28,500', completed: true },
  { label: 'Foundation', amount: '$35,000', completed: false, active: true },
  { label: 'Framing', amount: '$42,000', completed: false },
  { label: 'Final', amount: '$22,500', completed: false },
];

export function EscrowStatus({ compact = false }: { compact?: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const totalFunds = 140000;
  const released = 40500;
  const progress = (released / totalFunds) * 100;

  return (
    <div
      className="bg-[#141419] rounded-xl p-4 lg:p-3 border border-white/[0.06] cursor-pointer shadow-lg shadow-black/20"
      onClick={() => setExpanded(!expanded)}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
            <Lock className="w-4 h-4 text-green-500" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-1.5">
              <span className="text-white/90 text-sm">Escrow Status</span>
              <ShieldCheck className="w-3.5 h-3.5 text-green-500" />
            </div>
            <p className="text-gray-500 text-xs mt-0.5">No funds were requested today</p>
          </div>
        </div>
        <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown className="w-4 h-4 text-gray-600" />
        </motion.div>
      </div>

      <div className="mt-3 lg:mt-2 pt-2">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-[10px] text-gray-500">Funds Released</span>
          <span className="text-[10px] text-white/60">${released.toLocaleString()} / ${totalFunds.toLocaleString()}</span>
        </div>
        <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-green-600 to-emerald-500"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
          />
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="mt-3 pt-3 border-t border-white/[0.06]">
              <p className="text-gray-500 text-[10px] mb-2.5">Milestone Payments</p>
              <div className="space-y-0">
                {milestones.map((m, i) => (
                  <div key={m.label} className="flex items-center gap-3 py-1.5">
                    <div className="flex flex-col items-center w-4">
                      <div className={`w-2.5 h-2.5 rounded-full border-2 ${m.completed ? 'bg-green-400 border-green-400' : m.active ? 'bg-transparent border-amber-400' : 'bg-transparent border-gray-700'}`} />
                      {i < milestones.length - 1 && (
                        <div className={`w-[2px] h-4 mt-0.5 ${m.completed ? 'bg-green-400/40' : 'bg-gray-700/50'}`} />
                      )}
                    </div>
                    <div className="flex items-center justify-between flex-1">
                      <span className={`text-xs ${m.completed ? 'text-gray-400' : m.active ? 'text-white/80' : 'text-gray-600'}`}>
                        {m.label}
                        {m.active && <span className="ml-1.5 text-[9px] text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">In Progress</span>}
                      </span>
                      <span className={`text-xs ${m.completed ? 'text-green-400/60 line-through' : 'text-gray-500'}`}>{m.amount}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
