'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { AlertTriangle, ChevronDown, X } from 'lucide-react';
import { AnimatedCard } from './animated-card';
import { warningData } from '@/lib/mock-data/command-center';

export function WarningAlert() {
  const [dismissed, setDismissed] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);

  if (dismissed) return null;

  return (
    <motion.div style={{ x, opacity }} drag="x" dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 100) setDismissed(true); }}
    >
      <AnimatedCard className="border-amber-500/20" delay={0.3}>
        {/* Header */}
        <div className="flex items-start gap-3">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-500/20">
            <AlertTriangle className="h-4 w-4 text-amber-400" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-amber-400">{warningData.title}</p>
              <button onClick={() => setDismissed(true)} className="rounded p-0.5 text-gray-600 hover:text-gray-400">
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className="mt-0.5 text-[11px] leading-relaxed text-gray-400">{warningData.description}</p>
            <p className="mt-1 text-[10px] text-gray-600">{warningData.time}</p>
          </div>
        </div>

        {/* Expand toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-2 flex w-full items-center justify-center gap-1 text-[10px] text-gray-500 hover:text-gray-400"
        >
          {expanded ? 'Less details' : 'More details'}
          <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="h-3 w-3" />
          </motion.div>
        </button>

        <AnimatePresence>
          {expanded && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="mt-2 space-y-1.5 border-t border-white/[0.06] pt-2">
                {warningData.details.map((d, i) => (
                  <li key={i} className="flex items-start gap-2 text-[11px] text-gray-400">
                    <span className="mt-1 block h-1 w-1 shrink-0 rounded-full bg-amber-500/60" />
                    {d}
                  </li>
                ))}
              </div>
            </motion.ul>
          )}
        </AnimatePresence>

        {/* Swipe hint */}
        <p className="mt-2 text-center text-[9px] text-gray-700">Swipe to dismiss</p>
      </AnimatedCard>
    </motion.div>
  );
}
