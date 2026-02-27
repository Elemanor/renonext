'use client';

import { useState } from 'react';
import { ClipboardCheck, Calendar, CheckCircle2, Circle, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const milestoneSteps = [
  { label: 'Site prep & grading', completed: true },
  { label: 'Excavation complete', completed: true },
  { label: 'Foundation pour', completed: false, active: true },
  { label: 'Framing inspection', completed: false },
  { label: 'Rough-in (electrical/plumbing)', completed: false },
  { label: 'Final walkthrough', completed: false },
];

export function InspectionsMilestones() {
  const [expanded, setExpanded] = useState(false);
  const completedCount = milestoneSteps.filter((s) => s.completed).length;

  return (
    <div className="bg-[#141419] rounded-xl p-4 lg:p-3.5 border border-white/[0.06] cursor-pointer shadow-lg shadow-black/20" onClick={() => setExpanded(!expanded)}>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-indigo-500/20 flex items-center justify-center">
            <ClipboardCheck className="w-3.5 h-3.5 text-indigo-400" />
          </div>
          <h2 className="text-white/90 text-sm tracking-tight">City Inspections &amp; Milestones</h2>
        </div>
        <motion.div animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <ChevronDown className="w-4 h-4 text-gray-600" />
        </motion.div>
      </div>
      <div className="flex items-start gap-3 bg-white/[0.02] rounded-lg p-3">
        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center flex-shrink-0">
          <Calendar className="w-4 h-4 text-indigo-400" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-amber-500 rounded-full" />
            <p className="text-white/80 text-sm">City of Toronto</p>
          </div>
          <p className="text-gray-500 text-xs mt-1">Scheduled between 1 PM - 3 PM</p>
        </div>
        <div className="flex-shrink-0">
          <span className="text-indigo-400 text-[10px] bg-indigo-400/10 px-2 py-0.5 rounded-md">{completedCount}/{milestoneSteps.length}</span>
        </div>
      </div>
      <AnimatePresence>
        {expanded && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }} className="overflow-hidden">
            <div className="mt-3 pt-3 border-t border-white/[0.06]">
              <p className="text-gray-500 text-[10px] mb-2">Project Milestones</p>
              <div className="space-y-0">
                {milestoneSteps.map((step, i) => (
                  <div key={step.label} className="flex items-center gap-3 py-1.5">
                    <div className="flex flex-col items-center w-5">
                      {step.completed ? (
                        <CheckCircle2 className="w-4 h-4 text-green-400" />
                      ) : step.active ? (
                        <div className="w-4 h-4 rounded-full border-2 border-amber-400 flex items-center justify-center">
                          <div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                        </div>
                      ) : (
                        <Circle className="w-4 h-4 text-gray-700" />
                      )}
                      {i < milestoneSteps.length - 1 && (
                        <div className={`w-[2px] h-3 mt-0.5 ${step.completed ? 'bg-green-400/30' : 'bg-gray-700/40'}`} />
                      )}
                    </div>
                    <span className={`text-xs ${step.completed ? 'text-gray-500 line-through' : step.active ? 'text-white/80' : 'text-gray-600'}`}>
                      {step.label}
                      {step.active && <span className="ml-1.5 text-[9px] text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">Current</span>}
                    </span>
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
