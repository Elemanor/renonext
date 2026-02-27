'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, ChevronDown, CheckCircle2, Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatedCard } from './animated-card';

const safetyChecks = [
  { label: 'Hard hats required', checked: true },
  { label: 'Safety boots on site', checked: true },
  { label: 'Dust masks near excavation', checked: true },
  { label: 'First aid kit accessible', checked: true },
  { label: 'Fire extinguisher on site', checked: false },
];

const aqiLevel = 42;
const aqiLabel = 'Good';
const aqiColor = 'text-emerald-400';

export function HealthHazard() {
  const [expanded, setExpanded] = useState(false);

  return (
    <AnimatedCard delay={0.35}>
      {/* AQI */}
      <div className="mb-3 flex items-center gap-2">
        <ShieldCheck className="h-4 w-4 text-emerald-400" />
        <span className="text-xs font-medium text-white/80">Health & Safety</span>
      </div>

      <div className="mb-3 flex items-baseline gap-2">
        <span className={cn('text-2xl font-bold tabular-nums', aqiColor)}>{aqiLevel}</span>
        <span className="text-xs text-gray-400">AQI — {aqiLabel}</span>
      </div>

      <div className="mb-3 h-1.5 overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${Math.min(aqiLevel, 100)}%` }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-green-400"
        />
      </div>

      {/* Safety checklist toggle */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between rounded-lg bg-white/[0.03] px-3 py-2"
      >
        <span className="text-[11px] text-gray-400">Safety Checklist</span>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-gray-500">
            {safetyChecks.filter(c => c.checked).length}/{safetyChecks.length}
          </span>
          <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.2 }}>
            <ChevronDown className="h-3.5 w-3.5 text-gray-600" />
          </motion.div>
        </div>
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="mt-2 space-y-1.5">
              {safetyChecks.map((check, i) => (
                <div key={i} className="flex items-center gap-2">
                  {check.checked ? (
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-emerald-400" />
                  ) : (
                    <Circle className="h-3.5 w-3.5 shrink-0 text-gray-600" />
                  )}
                  <span className={cn(
                    'text-[11px]',
                    check.checked ? 'text-gray-400' : 'text-gray-500'
                  )}>
                    {check.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatedCard>
  );
}
