'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import {
  Shield, ShieldCheck, BadgeCheck, XCircle, CheckCircle,
  Lock, FileText, Download, Image as ImageIcon, Stamp,
  TrendingUp, Users, DollarSign, Clock, Target,
  FolderOpen, FileCheck, Camera, MapPin,
} from 'lucide-react';

/* ═══════════════════════════════════════════════════════
   1. ANIMATED COUNTER — counts up when scrolled into view
   ═══════════════════════════════════════════════════════ */
interface AnimatedCounterProps {
  end: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  label: string;
  sublabel?: string;
  icon: React.ReactNode;
  color: string;
}

export function AnimatedCounter({
  end,
  prefix = '',
  suffix = '',
  duration = 2000,
  label,
  sublabel,
  icon,
  color,
}: AnimatedCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, end, duration]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="text-center"
    >
      <div className={`mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl ${color}`}>
        {icon}
      </div>
      <p className="font-mono text-3xl font-black tracking-tight text-gray-900 md:text-4xl">
        {prefix}{count.toLocaleString()}{suffix}
      </p>
      <p className="mt-1 text-sm font-semibold text-gray-700">{label}</p>
      {sublabel && <p className="mt-0.5 text-xs text-gray-400">{sublabel}</p>}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════
   2. SOCIAL PROOF BAR — horizontal stats strip
   ═══════════════════════════════════════════════════════ */
interface SocialProofBarProps {
  variant?: 'light' | 'dark';
  stats: { value: string; label: string; icon: React.ReactNode }[];
}

export function SocialProofBar({ variant = 'light', stats }: SocialProofBarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const isDark = variant === 'dark';

  return (
    <div
      ref={ref}
      className={`rounded-2xl border px-6 py-8 md:px-10 ${
        isDark
          ? 'border-white/10 bg-white/5 backdrop-blur-sm'
          : 'border-gray-200/60 bg-white/80 shadow-lg backdrop-blur-sm'
      }`}
    >
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 15 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="text-center"
          >
            <div className={`mx-auto mb-2 flex h-5 w-5 items-center justify-center ${isDark ? 'text-emerald-400' : 'text-emerald-500'}`}>
              {stat.icon}
            </div>
            <p
              className={`font-mono text-2xl font-black tracking-tight ${
                isDark ? 'text-white' : 'text-gray-900'
              }`}
            >
              {stat.value}
            </p>
            <p className={`mt-1 text-xs ${isDark ? 'text-slate-400' : 'text-gray-500'}`}>
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   3. VETTING PIPELINE — animated reject/accept sequence
   ═══════════════════════════════════════════════════════ */
const applications = [
  { id: 'A-4821', name: 'Apex Foundations Ltd.', status: 'rejected' as const, reason: 'WSIB lapsed' },
  { id: 'A-4822', name: 'Northshore Concrete', status: 'rejected' as const, reason: 'No $2M liability' },
  { id: 'A-4823', name: 'Elite Structural Co.', status: 'accepted' as const, reason: 'All checks passed' },
  { id: 'A-4824', name: 'Metro Excavation Inc.', status: 'rejected' as const, reason: 'Background flag' },
  { id: 'A-4825', name: 'Precision Rebar Pro', status: 'accepted' as const, reason: 'All checks passed' },
];

export function VettingPipeline() {
  const [visibleIdx, setVisibleIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setVisibleIdx((prev) => (prev + 1) % applications.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mx-auto w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 shadow-2xl backdrop-blur-xl">
      <div className="border-b border-white/10 bg-slate-950 px-5 py-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            Vetting Pipeline — Live
          </p>
          <span className="flex items-center gap-1.5 text-[10px] text-emerald-400">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            Processing
          </span>
        </div>
      </div>

      <div className="p-5">
        <div className="mb-4 flex items-center justify-between text-xs text-slate-500">
          <span>Application</span>
          <span>Status</span>
        </div>

        <div className="space-y-2.5">
          {applications.map((app, i) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0.3 }}
              animate={{
                opacity: i === visibleIdx ? 1 : 0.3,
                scale: i === visibleIdx ? 1.02 : 1,
              }}
              transition={{ duration: 0.4 }}
              className={`flex items-center justify-between rounded-lg px-3 py-2.5 ${
                i === visibleIdx
                  ? app.status === 'rejected'
                    ? 'bg-red-500/10 ring-1 ring-red-500/20'
                    : 'bg-emerald-500/10 ring-1 ring-emerald-500/20'
                  : 'bg-slate-800/30'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-[10px] text-slate-500">{app.id}</span>
                <span className={`text-sm ${i === visibleIdx ? 'text-white' : 'text-slate-500'}`}>
                  {app.name}
                </span>
              </div>
              <AnimatePresence mode="wait">
                {i === visibleIdx && (
                  <motion.span
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0 }}
                    className={`flex items-center gap-1.5 text-xs font-bold ${
                      app.status === 'rejected' ? 'text-red-400' : 'text-emerald-400'
                    }`}
                  >
                    {app.status === 'rejected' ? (
                      <><XCircle className="h-3.5 w-3.5" /> DENIED</>
                    ) : (
                      <><CheckCircle className="h-3.5 w-3.5" /> APPROVED</>
                    )}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-3">
          <span className="text-[10px] text-slate-500">Acceptance Rate</span>
          <span className="font-mono text-sm font-bold text-white">18.4%</span>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   4. PROPERTY RECORD VIEWER — animated document system
   ═══════════════════════════════════════════════════════ */
const documents = [
  { name: 'Building Permit #2024-1847', type: 'permit', date: 'Jan 15, 2025', icon: FileCheck },
  { name: 'Foundation Inspection — PASS', type: 'inspection', date: 'Feb 03, 2025', icon: ShieldCheck },
  { name: 'Structural Engineer Stamp', type: 'certification', date: 'Feb 10, 2025', icon: Stamp },
  { name: 'Milestone 2 — 14 Photos', type: 'photos', date: 'Feb 18, 2025', icon: Camera },
  { name: 'Material Receipt — Concrete', type: 'receipt', date: 'Feb 20, 2025', icon: FileText },
  { name: 'GPS Attendance Log — Week 6', type: 'log', date: 'Feb 22, 2025', icon: MapPin },
];

export function PropertyRecordViewer() {
  const [activeDoc, setActiveDoc] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveDoc((prev) => (prev + 1) % documents.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="mx-auto w-full max-w-lg overflow-hidden rounded-2xl border border-gray-200/60 bg-white shadow-2xl">
      <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50 px-5 py-3">
        <div className="flex items-center gap-2">
          <FolderOpen className="h-4 w-4 text-blue-500" />
          <p className="text-sm font-bold text-gray-900">Property Vault</p>
        </div>
        <span className="rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-bold text-emerald-600 ring-1 ring-emerald-200">
          {documents.length} Records
        </span>
      </div>

      <div className="divide-y divide-gray-50">
        {documents.map((doc, i) => (
          <motion.div
            key={doc.name}
            animate={{
              backgroundColor: i === activeDoc ? 'rgba(59, 130, 246, 0.04)' : 'transparent',
            }}
            className="flex items-center justify-between px-5 py-3"
          >
            <div className="flex items-center gap-3">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-300 ${
                  i === activeDoc
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-50 text-gray-300'
                }`}
              >
                <doc.icon className="h-4 w-4" />
              </div>
              <div>
                <p
                  className={`text-sm transition-colors duration-300 ${
                    i === activeDoc ? 'font-semibold text-gray-900' : 'text-gray-400'
                  }`}
                >
                  {doc.name}
                </p>
                <p className="text-[10px] text-gray-400">{doc.date}</p>
              </div>
            </div>
            {i === activeDoc && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-600"
              >
                <CheckCircle className="h-3 w-3" /> Verified
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      <div className="border-t border-gray-100 bg-gray-50 px-5 py-3">
        <div className="flex items-center justify-between text-xs text-gray-400">
          <span>Permanent archive — immutable</span>
          <div className="flex items-center gap-1">
            <Lock className="h-3 w-3" />
            <span>Encrypted</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   5. FLOATING PARTICLES — ambient background element
   ═══════════════════════════════════════════════════════ */
export function FloatingParticles({ count = 6, color = 'bg-emerald-400' }: { count?: number; color?: string }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className={`absolute h-1 w-1 rounded-full ${color} opacity-20`}
          style={{
            left: `${10 + (i * 17) % 80}%`,
            top: `${15 + (i * 23) % 70}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 4 + i * 0.5,
            repeat: Infinity,
            delay: i * 0.7,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   6. TESTIMONIAL CARD — compact quote card
   ═══════════════════════════════════════════════════════ */
interface TestimonialProps {
  quote: string;
  name: string;
  role: string;
  variant?: 'light' | 'dark';
}

export function TestimonialCard({ quote, name, role, variant = 'light' }: TestimonialProps) {
  const isDark = variant === 'dark';
  return (
    <div
      className={`rounded-2xl border p-6 ${
        isDark
          ? 'border-white/10 bg-white/5 backdrop-blur-sm'
          : 'border-gray-200/60 bg-white shadow-sm'
      }`}
    >
      <p className={`text-sm italic leading-relaxed ${isDark ? 'text-slate-300' : 'text-gray-600'}`}>
        &ldquo;{quote}&rdquo;
      </p>
      <div className="mt-4 flex items-center gap-3">
        <div className={`h-8 w-8 rounded-full ${isDark ? 'bg-slate-700' : 'bg-gray-100'} flex items-center justify-center`}>
          <span className={`text-xs font-bold ${isDark ? 'text-white' : 'text-gray-600'}`}>
            {name.split(' ').map(n => n[0]).join('')}
          </span>
        </div>
        <div>
          <p className={`text-sm font-semibold ${isDark ? 'text-white' : 'text-gray-900'}`}>{name}</p>
          <p className={`text-xs ${isDark ? 'text-slate-500' : 'text-gray-400'}`}>{role}</p>
        </div>
      </div>
    </div>
  );
}
