'use client';

import { useState } from 'react';
import { AlertTriangle, ChevronDown, Clock, MapPin, Volume2, X } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';

export function WarningAlert() {
  const [expanded, setExpanded] = useState(false);
  const [dismissed, setDismissed] = useState(false);
  const x = useMotionValue(0);
  const opacity = useTransform(x, [-150, 0, 150], [0, 1, 0]);
  const bgOpacity = useTransform(x, [-150, -50, 0, 50, 150], [1, 0.3, 0, 0.3, 1]);

  if (dismissed) return null;

  return (
    <div className="relative overflow-hidden rounded-xl h-full">
      <motion.div className="absolute inset-0 bg-green-500/20 rounded-xl flex items-center justify-center" style={{ opacity: bgOpacity }}>
        <X className="w-6 h-6 text-green-400" />
      </motion.div>
      <motion.div
        className="rounded-xl overflow-hidden border border-orange-500/20 relative bg-[#141419] shadow-lg shadow-black/20 h-full flex flex-col"
        style={{ x, opacity }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.4}
        onDragEnd={(_, info) => { if (Math.abs(info.offset.x) > 120) setDismissed(true); }}
        onClick={() => setExpanded(!expanded)}
      >
        <div className="bg-gradient-to-r from-amber-600/90 to-orange-600/80 p-3.5 lg:p-3 flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0 mt-0.5">
            <AlertTriangle className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm tracking-tight">Expect Higher Noise Today</p>
            <p className="text-orange-100/70 text-xs mt-0.5">Sandblasting work nearby (Building Admin, ~1 block away)</p>
          </div>
          <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.25 }} className="flex-shrink-0 mt-1">
            <ChevronDown className="w-4 h-4 text-white/60" />
          </motion.div>
        </div>
        <div className="p-3.5 lg:p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              {['Heavy Equipment', 'Concrete Work', 'Welding'].map((a, i) => (
                <span key={i} className="text-[11px] text-gray-400 bg-white/[0.04] px-2 py-1 rounded-md">{a}</span>
              ))}
            </div>
            <span className="text-gray-600 text-[11px] flex-shrink-0 ml-2">10:08 AM</span>
          </div>
          <AnimatePresence>
            {expanded && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }} className="overflow-hidden">
                <div className="mt-3 pt-3 border-t border-white/[0.06] space-y-2.5">
                  <div className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-gray-500" /><span className="text-gray-400 text-xs">Expected duration: 2-3 hours</span></div>
                  <div className="flex items-center gap-2"><Volume2 className="w-3.5 h-3.5 text-gray-500" /><span className="text-gray-400 text-xs">Peak noise level: ~85 dB</span></div>
                  <div className="flex items-center gap-2"><MapPin className="w-3.5 h-3.5 text-gray-500" /><span className="text-gray-400 text-xs">Source: Adjacent lot, Building Admin</span></div>
                  <div className="mt-2 p-2.5 bg-orange-500/10 rounded-lg border border-orange-500/15">
                    <p className="text-orange-300/80 text-[11px]">We&apos;ll keep noise to a minimum. You may want to plan Zoom calls for after 3 PM today.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
