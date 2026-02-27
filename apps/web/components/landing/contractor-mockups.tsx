'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, TrendingUp, Award, Zap, Camera, Lock, CheckCircle, FileText, AlertCircle, RefreshCw } from 'lucide-react';

/* ── 1. Live Verification Terminal (Replaces Verified Badge) ── */
export function LiveVerificationTerminal() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[420px] overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl font-mono">
      <div className="flex items-center justify-between border-b border-slate-800 bg-slate-950 px-4 py-3">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-slate-700" />
          <div className="h-3 w-3 rounded-full bg-slate-700" />
          <div className="h-3 w-3 rounded-full bg-slate-700" />
        </div>
        <div className="flex items-center gap-2">
          <RefreshCw className="h-3 w-3 animate-spin text-slate-500" />
          <p className="text-[10px] text-slate-400">system_audit.sh</p>
        </div>
      </div>

      <div className="p-6 text-sm">
        <div className="mb-6 flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded bg-blue-500/20 ring-1 ring-blue-500/50">
              <Award className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="font-bold text-white">PRO_ID: #8942</p>
              <p className="text-[10px] text-slate-500">Tier: Institutional</p>
            </div>
          </div>
          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/50">
            NETWORK ACTIVE
          </Badge>
        </div>

        <div className="space-y-3">
          {/* Identity Check */}
          <div className="flex items-center justify-between rounded bg-slate-800/50 px-3 py-2">
            <span className="text-slate-400">Biometric Identity</span>
            <AnimatePresence mode="wait">
              {step >= 0 ? (
                <motion.span key="id-pass" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-emerald-400 flex items-center gap-1.5"><CheckCircle className="h-3 w-3" /> VERIFIED</motion.span>
              ) : (
                <span className="text-slate-600">Pending...</span>
              )}
            </AnimatePresence>
          </div>

          {/* Liability Check */}
          <div className="flex items-center justify-between rounded bg-slate-800/50 px-3 py-2">
            <span className="text-slate-400">Commercial Liability</span>
            <AnimatePresence mode="wait">
              {step >= 1 ? (
                <motion.span key="ins-pass" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-emerald-400 flex items-center gap-1.5"><CheckCircle className="h-3 w-3" /> $2M ACTIVE</motion.span>
              ) : (
                <span className="text-slate-600 animate-pulse">Querying Database...</span>
              )}
            </AnimatePresence>
          </div>

          {/* WSIB Check */}
          <div className="flex items-center justify-between rounded bg-slate-800/50 px-3 py-2">
            <span className="text-slate-400">WSIB Clearance</span>
            <AnimatePresence mode="wait">
              {step >= 2 ? (
                <motion.span key="wsib-pass" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-emerald-400 flex items-center gap-1.5"><CheckCircle className="h-3 w-3" /> CLEAR</motion.span>
              ) : step >= 1 ? (
                <span className="text-slate-600 animate-pulse">Querying Provincial API...</span>
              ) : (
                <span className="text-slate-600">Pending...</span>
              )}
            </AnimatePresence>
          </div>
          
           {/* Final Output */}
           <div className="mt-4 pt-4 border-t border-slate-800 min-h-[40px]">
             <AnimatePresence mode="wait">
              {step === 3 && (
                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="text-xs text-blue-400">
                  &gt; ALL SYSTEMS NOMINAL. <br/>&gt; PREMIUM PRICING JUSTIFIED.
                </motion.div>
              )}
             </AnimatePresence>
           </div>
        </div>
      </div>
    </div>
  );
}

/* ── 2. Addendum Generation Terminal (Replaces Scope Protection) ── */
export function AddendumTerminal() {
  const [stage, setStage] = useState<'input' | 'analyzing' | 'locked'>('input');

  useEffect(() => {
    const cycle = () => {
      setStage('input');
      setTimeout(() => setStage('analyzing'), 2000);
      setTimeout(() => setStage('locked'), 4500);
    };
    
    cycle();
    const interval = setInterval(cycle, 8000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[460px] overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl font-mono">
      <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-950 px-4 py-3">
        <Lock className="h-4 w-4 text-emerald-500" />
        <p className="text-[10px] text-slate-400 uppercase tracking-widest">Margin Protection Protocol</p>
      </div>

      <div className="p-6 text-sm">
        {/* Mock Input Form */}
        <div className="mb-6 space-y-4 opacity-80">
           <div>
             <p className="text-[10px] text-slate-500 mb-1">DEVIATION DETECTED</p>
             <div className="border border-slate-700 bg-slate-800/50 rounded p-2 text-slate-300">
               Unexpected bedrock requires heavier machinery.
             </div>
           </div>
           <div className="flex gap-4">
             <div className="flex-1">
               <p className="text-[10px] text-slate-500 mb-1">PROPOSED COST</p>
               <div className="border border-slate-700 bg-slate-800/50 rounded p-2 text-white">
                 +$1,200.00
               </div>
             </div>
             <div className="flex-1">
               <p className="text-[10px] text-slate-500 mb-1">EVIDENCE</p>
               <div className="border border-slate-700 bg-slate-800/50 rounded p-2 text-emerald-400 flex items-center gap-2">
                 <Camera className="h-3 w-3" /> 2 Photos Attached
               </div>
             </div>
           </div>
        </div>

        {/* Dynamic Action Area */}
        <div className="relative h-24 rounded-lg bg-slate-950 p-4 border border-slate-800">
          <AnimatePresence mode="wait">
            {stage === 'input' && (
              <motion.div key="input" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-full items-center justify-center">
                <button className="flex items-center gap-2 rounded bg-blue-600 px-4 py-2 font-bold text-white transition-colors hover:bg-blue-500">
                  <FileText className="h-4 w-4" /> GENERATE ADDENDUM
                </button>
              </motion.div>
            )}
            
            {stage === 'analyzing' && (
              <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-full flex-col justify-center gap-2">
                <div className="flex items-center gap-3">
                  <Zap className="h-4 w-4 animate-pulse text-amber-500" />
                  <span className="text-amber-400 text-xs">AI Rate Benchmark Analysis...</span>
                </div>
                <div className="h-1 w-full bg-slate-800 rounded-full overflow-hidden">
                   <motion.div className="h-full bg-amber-500" initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 2 }} />
                </div>
              </motion.div>
            )}

            {stage === 'locked' && (
              <motion.div key="locked" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex h-full flex-col justify-center">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                  <div>
                    <p className="text-emerald-400 text-xs font-bold">RATES VERIFIED. CONTRACT LOCKED.</p>
                    <p className="text-slate-500 text-[10px] mt-0.5">Awaiting homeowner digital signature to resume work.</p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export function Badge({ className, children }: { className?: string, children: React.ReactNode }) {
    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${className}`}>
            {children}
        </span>
    )
}
