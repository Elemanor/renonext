'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ChevronDown, CheckCircle2, Clock, Lock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatedCard } from './animated-card';
import { escrowData } from '@/lib/mock-data/command-center';

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(n);
}

const statusIcons = {
  released: CheckCircle2,
  pending: Clock,
  locked: Lock,
};

const statusColors = {
  released: 'text-emerald-400',
  pending: 'text-amber-400',
  locked: 'text-gray-600',
};

export function EscrowStatus() {
  const [expanded, setExpanded] = useState(false);

  return (
    <AnimatedCard className="flex flex-col" delay={0.2}>
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-between text-left"
      >
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-emerald-400" />
          <span className="text-xs font-medium text-white/80">Escrow Status</span>
        </div>
        <motion.div
          animate={{ rotate: expanded ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="h-4 w-4 text-gray-500" />
        </motion.div>
      </button>

      {/* Summary bar */}
      <div className="mt-3">
        <div className="mb-1.5 flex items-baseline justify-between">
          <span className="text-lg font-bold tabular-nums text-white/90">{formatCurrency(escrowData.released)}</span>
          <span className="text-[10px] text-gray-500">of {formatCurrency(escrowData.total)}</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-white/[0.06]">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${escrowData.progress}%` }}
            transition={{ duration: 0.8, delay: 0.3, ease: 'easeOut' }}
            className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
          />
        </div>
        <div className="mt-1 flex justify-between text-[10px] text-gray-500">
          <span>Released</span>
          <span>{formatCurrency(escrowData.held)} held</span>
        </div>
      </div>

      {/* Expandable milestones */}
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="mt-3 space-y-2 border-t border-white/[0.06] pt-3">
              {escrowData.milestones.map((ms, i) => {
                const Icon = statusIcons[ms.status];
                return (
                  <div key={i} className="flex items-center gap-3">
                    <Icon className={cn('h-3.5 w-3.5 shrink-0', statusColors[ms.status])} />
                    <div className="min-w-0 flex-1">
                      <p className={cn(
                        'truncate text-xs font-medium',
                        ms.status === 'locked' ? 'text-gray-600' : 'text-white/70'
                      )}>
                        {ms.label}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className={cn(
                        'text-xs font-medium tabular-nums',
                        ms.status === 'released' ? 'text-emerald-400' :
                        ms.status === 'pending' ? 'text-amber-400' : 'text-gray-600'
                      )}>
                        {formatCurrency(ms.amount)}
                      </p>
                      {ms.date && <p className="text-[10px] text-gray-600">{ms.date}</p>}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </AnimatedCard>
  );
}
