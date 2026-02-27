'use client';

import { useState } from 'react';
import { Shield, CheckCircle, ChevronDown, Wind, Eye, Ear, Droplets } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const hazardChecks = [
  { icon: Wind, label: 'Dust Levels', status: 'Normal', safe: true },
  { icon: Ear, label: 'Noise Exposure', status: 'Elevated', safe: false },
  { icon: Eye, label: 'Visibility', status: 'Clear', safe: true },
  { icon: Droplets, label: 'Chemical Exposure', status: 'None', safe: true },
];

export function HealthHazardStatus() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-[#141419] rounded-xl p-4 lg:p-3 border border-white/[0.06] cursor-pointer shadow-lg shadow-black/20" onClick={() => setExpanded(!expanded)}>
      <div className="flex items-center justify-between mb-3 lg:mb-2">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-green-500/20 flex items-center justify-center">
            <Shield className="w-3.5 h-3.5 text-green-500" />
          </div>
          <h2 className="text-white/90 text-sm tracking-tight">Site Safety Update</h2>
        </div>
        <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown className="w-4 h-4 text-gray-600" />
        </motion.div>
      </div>
      <div className="flex items-start gap-2.5">
        <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="text-white/80 text-sm">Air Quality:</span>
            <span className="text-green-400 text-sm">Safe</span>
            <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          </div>
          <p className="text-gray-500 text-xs mt-1 leading-relaxed">Negative air particulate zone cleared. Zero risk detected.</p>
        </div>
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }} className="overflow-hidden">
            <div className="mt-3 pt-3 border-t border-white/[0.06] space-y-2">
              {hazardChecks.map((check) => (
                <div key={check.label} className="flex items-center justify-between py-1.5">
                  <div className="flex items-center gap-2.5">
                    <check.icon className="w-3.5 h-3.5 text-gray-500" />
                    <span className="text-gray-400 text-xs">{check.label}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`text-xs ${check.safe ? 'text-green-400/80' : 'text-amber-400/80'}`}>{check.status}</span>
                    <div className={`w-1.5 h-1.5 rounded-full ${check.safe ? 'bg-green-400' : 'bg-amber-400'}`} />
                  </div>
                </div>
              ))}
              <button className="w-full mt-2 flex items-center justify-center gap-1.5 bg-white/[0.05] hover:bg-white/[0.08] transition-colors border border-white/[0.06] text-gray-400 text-xs h-8 rounded-lg" onClick={(e) => e.stopPropagation()}>
                <Shield className="w-3.5 h-3.5" />
                <span>View Full Safety Daily Sheet</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
