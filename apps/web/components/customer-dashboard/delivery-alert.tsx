'use client';

import { useState, useEffect } from 'react';
import { Truck, Clock, X } from 'lucide-react';
import { motion, useMotionValue, useTransform } from 'framer-motion';

export function DeliveryAlert() {
  const [dismissed, setDismissed] = useState(false);
  const [minutesLeft, setMinutesLeft] = useState(206);
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
  const bgOpacity = useTransform(x, [-150, -50, 0, 50, 150], [1, 0.3, 0, 0.3, 1]);

  useEffect(() => {
    const interval = setInterval(() => setMinutesLeft((p) => Math.max(0, p - 1)), 60000);
    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(minutesLeft / 60);
  const mins = minutesLeft % 60;
  const progress = ((206 - minutesLeft) / 206) * 100;

  if (dismissed) return null;

  return (
    <div className="relative overflow-hidden rounded-xl">
      <motion.div className="absolute inset-0 bg-red-500/20 rounded-xl flex items-center justify-center" style={{ opacity: bgOpacity }}>
        <X className="w-6 h-6 text-red-400" />
      </motion.div>
      <motion.div
        className="bg-[#141419] rounded-xl p-4 border border-white/[0.06] relative shadow-lg shadow-black/20"
        style={{ x, opacity }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.4}
        onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 120) setDismissed(true); }}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-sky-500/15 flex items-center justify-center flex-shrink-0">
              <Truck className="w-4 h-4 text-sky-400" />
            </div>
            <div>
              <p className="text-white/90 text-sm tracking-tight">Delivery Alert</p>
              <p className="text-gray-500 text-xs mt-0.5">1.4 yd Dumpster Bin arriving</p>
            </div>
          </div>
          <div className="w-7 h-7 rounded-lg bg-white/[0.04] flex items-center justify-center flex-shrink-0">
            <Clock className="w-3.5 h-3.5 text-gray-500" />
          </div>
        </div>
        <div className="mt-3 pt-2 border-t border-white/[0.04]">
          <div className="flex items-center justify-between mb-1.5">
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-gray-500">ETA</span>
              <span className="text-[10px] text-sky-400">11:30 AM</span>
            </div>
            <span className="text-[10px] text-white/50">{hours > 0 ? `${hours}h ` : ''}{mins}m remaining</span>
          </div>
          <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden">
            <motion.div className="h-full rounded-full bg-gradient-to-r from-sky-600 to-cyan-500" initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }} />
          </div>
        </div>
      </motion.div>
    </div>
  );
}
