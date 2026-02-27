'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Camera, MessageSquare, Phone, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

const actions = [
  { icon: Camera, label: 'Photo', color: 'bg-blue-500/20 text-blue-400' },
  { icon: MessageSquare, label: 'Message', color: 'bg-emerald-500/20 text-emerald-400' },
  { icon: Phone, label: 'Call', color: 'bg-amber-500/20 text-amber-400' },
  { icon: FileText, label: 'Report', color: 'bg-purple-500/20 text-purple-400' },
];

export function QuickActionFAB() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-20 right-4 z-50 lg:hidden">
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/40"
              onClick={() => setOpen(false)}
            />
            {/* Actions */}
            <div className="absolute bottom-14 right-0 flex flex-col items-end gap-2">
              {actions.map((action, i) => (
                <motion.button
                  key={action.label}
                  initial={{ opacity: 0, y: 10, scale: 0.8 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.8 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2"
                >
                  <span className="rounded-lg bg-[#1a1a22] px-2.5 py-1.5 text-xs font-medium text-white/80 shadow-lg">
                    {action.label}
                  </span>
                  <div className={cn('flex h-10 w-10 items-center justify-center rounded-full shadow-lg', action.color)}>
                    <action.icon className="h-[18px] w-[18px]" />
                  </div>
                </motion.button>
              ))}
            </div>
          </>
        )}
      </AnimatePresence>

      {/* FAB */}
      <motion.button
        onClick={() => setOpen(!open)}
        animate={{ rotate: open ? 45 : 0 }}
        transition={{ duration: 0.2 }}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 shadow-lg shadow-emerald-500/30"
      >
        <Plus className="h-6 w-6 text-white" />
      </motion.button>
    </div>
  );
}
