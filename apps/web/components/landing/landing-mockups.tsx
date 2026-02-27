'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, ShieldCheck, CheckCircle, Smartphone, DollarSign, Zap } from 'lucide-react';

/* ── Interactive Vault Status (Homeowner Page) ── */
export function VaultStatusWidget() {
  const [status, setStatus] = useState<'locked' | 'verifying' | 'released'>('locked');

  useEffect(() => {
    const timer = setInterval(() => {
      setStatus(prev => {
        if (prev === 'locked') return 'verifying';
        if (prev === 'verifying') return 'released';
        return 'locked';
      });
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[340px] overflow-hidden rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <Lock className="h-4 w-4" />
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-gray-400">Vault Status</p>
            <p className="text-sm font-bold text-gray-900">Project Milestone 3</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-xs font-medium text-gray-400">Locked Funds</p>
          <p className="text-sm font-bold text-gray-900">$14,500.00</p>
        </div>
      </div>

      <div className="relative h-2 w-full rounded-full bg-gray-100">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-emerald-500"
          initial={{ width: '30%' }}
          animate={{ 
            width: status === 'locked' ? '30%' : status === 'verifying' ? '75%' : '100%' 
          }}
          transition={{ duration: 1, ease: 'easeInOut' }}
        />
      </div>

      <div className="mt-6 flex flex-col items-center gap-3">
        <AnimatePresence mode="wait">
          {status === 'locked' && (
            <motion.div
              key="locked"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 rounded-full bg-blue-50 px-4 py-1.5 text-xs font-bold text-blue-600"
            >
              <Lock className="h-3 w-3" />
              FUNDS SECURED IN VAULT
            </motion.div>
          )}
          {status === 'verifying' && (
            <motion.div
              key="verifying"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 rounded-full bg-amber-50 px-4 py-1.5 text-xs font-bold text-amber-600"
            >
              <ShieldCheck className="h-3 w-3 animate-pulse" />
              QS VERIFYING MILESTONE...
            </motion.div>
          )}
          {status === 'released' && (
            <motion.div
              key="released"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-1.5 text-xs font-bold text-emerald-600"
            >
              <CheckCircle className="h-3 w-3" />
              FUNDS RELEASED TO PRO
            </motion.div>
          )}
        </AnimatePresence>

        <p className="text-center text-[11px] leading-relaxed text-gray-500">
          Neutral milestone-protected vault ensures your money only moves after proof of work.
        </p>
      </div>
    </div>
  );
}

/* ── Instant Payout Notification (Contractor Page) ── */
export function PayoutNotification() {
  const [active, setActive] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive(true);
      setTimeout(() => setActive(false), 3000);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[240px] w-full max-w-[300px] overflow-hidden rounded-3xl bg-slate-900 shadow-2xl ring-4 ring-slate-800">
      <div className="absolute inset-0 bg-blueprint opacity-10" />
      
      {/* Phone status bar */}
      <div className="flex h-6 items-center justify-between px-6 pt-2 text-[10px] text-white/40 font-medium">
        <span>9:41</span>
        <div className="flex items-center gap-1">
          <Zap className="h-2 w-2 fill-current" />
          <span>LTE</span>
        </div>
      </div>

      <div className="relative z-10 p-6">
        <div className="mb-4 h-1 w-8 rounded-full bg-white/10 mx-auto" />
        
        <AnimatePresence>
          {active && (
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              className="rounded-2xl bg-white/10 p-4 backdrop-blur-xl border border-white/20 shadow-2xl"
            >
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-500 shadow-lg shadow-emerald-500/40">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <div>
                  <p className="text-[13px] font-bold text-white">Payment Received</p>
                  <p className="text-[11px] text-white/60">Milestone: Foundation Pour</p>
                  <p className="mt-2 text-lg font-black text-emerald-400">$8,250.00</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!active && (
          <div className="flex flex-col items-center justify-center pt-8 text-center opacity-40">
            <Smartphone className="mb-2 h-8 w-8 text-white" />
            <p className="text-[10px] text-white uppercase tracking-[0.2em]">Waiting for proof...</p>
          </div>
        )}
      </div>
      
      {/* Home indicator */}
      <div className="absolute bottom-2 left-1/2 h-1 w-20 -translate-x-1/2 rounded-full bg-white/20" />
    </div>
  );
}
