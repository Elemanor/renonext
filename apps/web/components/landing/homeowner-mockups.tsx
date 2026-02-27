'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useReducedMotion, useMotionValueEvent } from 'framer-motion';
import { Lock, ShieldCheck, CheckCircle, Bell, Users, MapPin, Package, FileText, Zap, PauseCircle, Camera, HardHat, Droplets, Thermometer, Wind, ClipboardCheck, ChevronRight, AlertTriangle, Truck, Volume2, Sun, ChevronDown, Shield as ShieldIcon, LayoutDashboard, Calendar, FolderOpen, MessageSquare } from 'lucide-react';

/* ── 1. The Interactive Vault Widget ── */
export function PremiumVaultWidget() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => (prev + 1) % 4);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[400px] overflow-hidden rounded-3xl border border-slate-200/60 bg-white/80 p-8 shadow-2xl backdrop-blur-xl">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-50/50 via-transparent to-transparent pointer-events-none" />
      
      <div className="relative z-10 mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 shadow-lg">
            <Lock className="h-5 w-5 text-emerald-400" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Vault Balance</p>
            <p className="text-sm font-bold text-slate-900">Milestone 3: Foundation</p>
          </div>
        </div>
        <div className="text-right">
          <p className="font-mono text-xl font-black tracking-tight text-slate-900">$24,500<span className="text-sm text-slate-400">.00</span></p>
        </div>
      </div>

      {/* Progress Track */}
      <div className="relative mb-6 h-3 w-full rounded-full bg-slate-100 shadow-inner">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-emerald-400 to-blue-500 shadow-[0_0_10px_rgba(52,211,153,0.5)]"
          initial={{ width: '0%' }}
          animate={{ 
            width: step === 0 ? '25%' : step === 1 ? '50%' : step === 2 ? '75%' : '100%' 
          }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />
      </div>

      {/* Status Indicators */}
      <div className="relative h-[80px]">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div key="1" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col items-center text-center">
              <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-600">
                <Lock className="h-3.5 w-3.5" /> Capital Secured
              </span>
              <p className="text-xs text-slate-500">Funds locked in tier-1 infrastructure prior to start.</p>
            </motion.div>
          )}
          {step === 1 && (
            <motion.div key="2" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col items-center text-center">
              <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 ring-1 ring-blue-200">
                <Camera className="h-3.5 w-3.5 animate-pulse" /> Capturing Proof
              </span>
              <p className="text-xs text-slate-500">Contractor submitting GPS-stamped milestone photos.</p>
            </motion.div>
          )}
          {step === 2 && (
            <motion.div key="3" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col items-center text-center">
              <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700 ring-1 ring-amber-200">
                <ShieldCheck className="h-3.5 w-3.5" /> QS Verification
              </span>
              <p className="text-xs text-slate-500">Quantity Surveyor analyzing structural compliance.</p>
            </motion.div>
          )}
          {step === 3 && (
            <motion.div key="4" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col items-center text-center">
              <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 ring-1 ring-emerald-200 shadow-[0_0_15px_rgba(52,211,153,0.3)]">
                <CheckCircle className="h-3.5 w-3.5" /> Capital Released
              </span>
              <p className="text-xs text-slate-500">You approved. Contractor paid instantly.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ── 2. The Daily Site Briefing Feed ── */
export function LiveBriefingFeed() {
  const events = [
    { id: 1, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50', time: '07:15 AM', title: 'Crew Verified', desc: '3 workers passed biometric ID check.' },
    { id: 2, icon: MapPin, color: 'text-emerald-500', bg: 'bg-emerald-50', time: '07:30 AM', title: 'GPS Arrival', desc: 'Site mobilization confirmed.' },
    { id: 3, icon: Package, color: 'text-violet-500', bg: 'bg-violet-50', time: '09:45 AM', title: 'Material Drop', desc: '2 pallets of rebar delivered & scanned.' },
    { id: 4, icon: Bell, color: 'text-amber-500', bg: 'bg-amber-50', time: '11:00 AM', title: 'Noise Alert', desc: 'Jackhammering scheduled for 1:00 PM.' },
  ];

  return (
    <div className="relative mx-auto w-full max-w-[340px] overflow-hidden rounded-[2.5rem] border-[6px] border-slate-900 bg-slate-50 shadow-2xl">
      {/* Phone Notch */}
      <div className="absolute left-1/2 top-0 z-20 h-6 w-32 -translate-x-1/2 rounded-b-xl bg-slate-900" />
      
      <div className="bg-white px-6 pb-4 pt-10 shadow-sm relative z-10">
        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Live Briefing</p>
        <p className="text-xl font-bold text-slate-900">Today&apos;s Activity</p>
      </div>

      <div className="p-6 relative">
        {/* Timeline Line */}
        <div className="absolute left-[39px] top-6 bottom-6 w-0.5 bg-slate-200" />
        
        <div className="space-y-6">
          {events.map((event, i) => (
            <motion.div 
              key={event.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.8, duration: 0.5 }}
              className="relative z-10 flex gap-4"
            >
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${event.bg} shadow-sm ring-4 ring-slate-50`}>
                <event.icon className={`h-4 w-4 ${event.color}`} />
              </div>
              <div className="pt-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-slate-900">{event.title}</p>
                  <span className="font-mono text-[9px] text-slate-400">{event.time}</span>
                </div>
                <p className="mt-0.5 text-xs text-slate-500">{event.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── 3. The Change Order Terminal ── */
export function ChangeOrderTerminal() {
  const [analyzing, setAnalyzing] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setAnalyzing(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[460px] overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl font-mono">
      <div className="flex items-center gap-2 border-b border-slate-800 bg-slate-950 px-4 py-3">
        <div className="flex gap-1.5">
          <div className="h-3 w-3 rounded-full bg-red-500/20 ring-1 ring-red-500/50" />
          <div className="h-3 w-3 rounded-full bg-amber-500/20 ring-1 ring-amber-500/50" />
          <div className="h-3 w-3 rounded-full bg-emerald-500/20 ring-1 ring-emerald-500/50" />
        </div>
        <p className="ml-2 text-[10px] text-slate-400">addendum_protocol.exe</p>
      </div>

      <div className="p-6 text-sm">
        <div className="mb-4 flex items-center justify-between">
          <span className="text-slate-400">STATUS:</span>
          <span className="flex items-center gap-2 rounded bg-amber-500/10 px-2 py-1 text-amber-400 ring-1 ring-amber-500/20">
            <PauseCircle className="h-4 w-4" /> WORK PAUSED
          </span>
        </div>

        <div className="mb-6 rounded-lg border border-slate-800 bg-slate-950 p-4">
          <p className="mb-2 text-slate-500">// OUT-OF-SCOPE REQUEST DETECTED</p>
          <div className="flex justify-between text-slate-300">
            <span>Item:</span>
            <span className="text-white">Subsurface Water Mitigation</span>
          </div>
          <div className="flex justify-between text-slate-300 mt-1">
            <span>Requested By:</span>
            <span className="text-white">Contractor ID #4092</span>
          </div>
          <div className="flex justify-between text-slate-300 mt-1 border-t border-slate-800 pt-1">
            <span>Cost Variance:</span>
            <span className="text-red-400">+$2,400.00</span>
          </div>
        </div>

        <div className="relative h-16">
          <AnimatePresence mode="wait">
            {analyzing ? (
              <motion.div key="analyzing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-3">
                <Zap className="h-5 w-5 animate-pulse text-blue-500" />
                <span className="text-blue-400">AI Rate Check: Benchmarking against local GTA data...</span>
              </motion.div>
            ) : (
              <motion.div key="result" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="space-y-2">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                  <span className="text-emerald-400">Rates aligned with local baseline.</span>
                </div>
                <button className="mt-2 w-full rounded bg-emerald-500 py-2 font-bold text-slate-900 transition-colors hover:bg-emerald-400">
                  DIGITALLY SIGN & AUTHORIZE
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ── 4. Homeowner Hero Visualization (The Vault Core) ── */
export function HomeownerHeroVisualization() {
  return (
    <div className="relative mx-auto h-[500px] w-full max-w-[600px] perspective-[2000px]">
      {/* Background glow layers */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[300px] w-[300px] rounded-full bg-blue-500/20 blur-[100px]" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[200px] w-[200px] rounded-full bg-emerald-500/20 blur-[80px]" />

      <motion.div 
        className="relative h-full w-full transform-style-3d"
        animate={{ rotateY: [0, 5, -5, 0], rotateX: [10, 15, 10] }}
        transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
      >
        {/* Core Platform (The Vault) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[280px] w-[280px] rounded-full border border-white/10 bg-slate-900/50 backdrop-blur-2xl shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] flex items-center justify-center">
          
          {/* Inner Glowing Ring */}
          <motion.div 
            className="absolute inset-4 rounded-full border-[2px] border-dashed border-emerald-500/30"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
          />
          
          {/* Central Data Node */}
          <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-gradient-to-br from-slate-800 to-slate-950 border border-slate-700 shadow-2xl z-20">
             <div className="absolute inset-0 rounded-full bg-emerald-500/5" />
             <div className="text-center">
               <Lock className="mx-auto mb-2 h-8 w-8 text-emerald-400" />
               <p className="font-mono text-[10px] font-bold tracking-widest text-slate-300">SECURE</p>
               <p className="font-mono text-xs font-black tracking-tight text-emerald-400 mt-1">$45,000</p>
             </div>
             
             {/* Central Pulse */}
             <motion.div 
               className="absolute inset-0 rounded-full border border-emerald-400/50"
               animate={{ scale: [1, 1.5], opacity: [0.8, 0] }}
               transition={{ duration: 2, repeat: Infinity }}
             />
          </div>
        </div>

        {/* Orbiting Verification Nodes */}
        {/* Node 1: Photo Proof */}
        <motion.div 
          className="absolute left-1/2 top-1/2 -ml-8 -mt-8 h-16 w-16"
          style={{ originX: 0.5, originY: 0.5, x: '-50%', y: '-50%' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute -top-[160px] left-1/2 -translate-x-1/2 -rotate-90">
             <div className="flex flex-col items-center gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/30 bg-slate-900/80 backdrop-blur shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                  <Camera className="h-5 w-5 text-blue-400" />
                </div>
                <span className="rounded bg-blue-500/20 px-2 py-0.5 font-mono text-[8px] text-blue-300">GPS PROOF</span>
             </div>
          </div>
        </motion.div>

        {/* Node 2: QS Verification */}
        <motion.div 
          className="absolute left-1/2 top-1/2 -ml-8 -mt-8 h-16 w-16"
          style={{ originX: 0.5, originY: 0.5, x: '-50%', y: '-50%' }}
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute -bottom-[160px] left-1/2 -translate-x-1/2 rotate-90">
             <div className="flex flex-col items-center gap-2">
                <span className="rounded bg-amber-500/20 px-2 py-0.5 font-mono text-[8px] text-amber-300">QS CHECK</span>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-500/30 bg-slate-900/80 backdrop-blur shadow-[0_0_15px_rgba(245,158,11,0.3)]">
                  <ShieldCheck className="h-5 w-5 text-amber-400" />
                </div>
             </div>
          </div>
        </motion.div>

        {/* Node 3: Identity/Contractor */}
        <motion.div 
          className="absolute left-1/2 top-1/2 -ml-8 -mt-8 h-16 w-16"
          style={{ originX: 0.5, originY: 0.5, x: '-50%', y: '-50%' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear", delay: 5 }}
        >
          <div className="absolute top-1/2 -right-[160px] -translate-y-1/2">
             <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-violet-500/30 bg-slate-900/80 backdrop-blur shadow-[0_0_15px_rgba(139,92,246,0.3)]">
                  <Users className="h-5 w-5 text-violet-400" />
                </div>
                <span className="rounded bg-violet-500/20 px-2 py-0.5 font-mono text-[8px] text-violet-300 whitespace-nowrap">ID VERIFIED</span>
             </div>
          </div>
        </motion.div>

        {/* Floating Data Packets (Connecting lines) */}
        <svg className="absolute inset-0 h-full w-full pointer-events-none z-10" viewBox="0 0 600 500">
           {/* Top to Center */}
           <motion.path 
              d="M 300 90 L 300 170" 
              stroke="url(#blue-grad)" 
              strokeWidth="2" 
              strokeDasharray="4 4"
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: -20 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
           />
           {/* Bottom to Center */}
           <motion.path 
              d="M 300 410 L 300 330" 
              stroke="url(#amber-grad)" 
              strokeWidth="2" 
              strokeDasharray="4 4"
              initial={{ strokeDashoffset: 0 }}
              animate={{ strokeDashoffset: 20 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
           />
           
           <defs>
              <linearGradient id="blue-grad" x1="0" y1="0" x2="0" y2="1">
                 <stop offset="0%" stopColor="#60A5FA" stopOpacity="1" />
                 <stop offset="100%" stopColor="#60A5FA" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="amber-grad" x1="0" y1="1" x2="0" y2="0">
                 <stop offset="0%" stopColor="#FBBF24" stopOpacity="1" />
                 <stop offset="100%" stopColor="#FBBF24" stopOpacity="0" />
              </linearGradient>
           </defs>
        </svg>

        {/* Background Status Log */}
        <div className="absolute bottom-4 left-4 rounded-lg bg-slate-950/80 p-3 backdrop-blur border border-slate-800 font-mono text-[8px] text-slate-500 hidden sm:block">
          <p className="text-emerald-400 mb-1">Live Execution Log</p>
          <p>&gt; Initializing Vault Protocol...</p>
          <p>&gt; Capital Secured [TX: #4892]</p>
          <p className="animate-pulse text-white">&gt; Awaiting Verification Metadata...</p>
        </div>
      </motion.div>
    </div>
  );
}

/* ── 5. Site Briefing Phone — Hero Mockup ──
   Realistic iPhone 15 Pro frame + Figma design system:
   - bg: #0a0a0f  cards: #141419  border: white/[0.06]
   - Cards: rounded-xl p-4 shadow-lg shadow-black/20
   - Icons: w-7 h-7 rounded-lg colored-bg/20
   ─────────────────────────────────────────── */

/* SVG portrait avatar */
function Avatar({ skin, hair, id }: { skin: string; hair: string; id: string }) {
  return (
    <svg viewBox="0 0 64 64" className="h-full w-full">
      <defs>
        <radialGradient id={`s-${id}`} cx="50%" cy="40%" r="48%">
          <stop offset="0%" stopColor={skin} />
          <stop offset="100%" stopColor={hair} />
        </radialGradient>
      </defs>
      <circle cx="32" cy="32" r="32" fill={hair} opacity="0.35" />
      <ellipse cx="32" cy="62" rx="22" ry="16" fill={`url(#s-${id})`} />
      <rect x="25" y="38" width="14" height="10" rx="4" fill={skin} />
      <ellipse cx="32" cy="28" rx="14" ry="16" fill={skin} />
      <ellipse cx="32" cy="16" rx="15" ry="11" fill={hair} />
      <ellipse cx="18" cy="24" rx="3.5" ry="8" fill={hair} />
      <ellipse cx="46" cy="24" rx="3.5" ry="8" fill={hair} />
      <ellipse cx="26" cy="30" rx="2" ry="1.2" fill={hair} opacity="0.6" />
      <ellipse cx="38" cy="30" rx="2" ry="1.2" fill={hair} opacity="0.6" />
      <ellipse cx="30" cy="22" rx="7" ry="5" fill="white" opacity="0.07" />
    </svg>
  );
}

/* Progress ring — polished with glow effect */
function ProgressRing({ current, total, size = 56 }: { current: number; total: number; size?: number }) {
  const sw = 5;
  const r = (size - sw) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - current / total);
  return (
    <div className="relative flex shrink-0 items-center justify-center">
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-500/20 to-emerald-500/20 blur-md" />
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth={sw} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="url(#pg)" strokeWidth={sw} strokeLinecap="round" strokeDasharray={c} strokeDashoffset={offset} />
        <defs><linearGradient id="pg" x1="0%" y1="0%" x2="100%" y2="0%"><stop offset="0%" stopColor="#f59e0b"/><stop offset="100%" stopColor="#10b981"/></linearGradient></defs>
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-[11px] font-bold text-white">{current}</span>
        <span className="text-[7px] text-gray-500 -mt-0.5">of {total}</span>
      </div>
    </div>
  );
}

const teamData = [
  { name: 'David P.', role: 'Wood Joists', skin: '#c68642', hair: '#3b2314', id: 'x1', onSite: true },
  { name: 'Marcus J.', role: 'Laborer', skin: '#8d5524', hair: '#1a0f08', id: 'x2', onSite: true },
  { name: 'David K.', role: 'Belted Joists', skin: '#d4a574', hair: '#4a3222', id: 'x3', onSite: false },
];

const tabItems = [
  { label: 'Dashboard', icon: LayoutDashboard, active: true },
  { label: 'Schedule', icon: Calendar, active: false },
  { label: 'Docs', icon: FolderOpen, active: false },
  { label: 'Chat', icon: MessageSquare, active: false },
] as const;

const cardEase: [number, number, number, number] = [0.22, 0.68, 0, 1.0];

export function SiteBriefingPhone() {
  const prefersReduced = useReducedMotion();
  const skip = prefersReduced ?? false;

  const containerRef = useRef<HTMLDivElement>(null);
  const [targetScale, setTargetScale] = useState(1.2);

  useEffect(() => {
    const update = () => setTargetScale(Math.min(window.innerWidth / 320, 1.5));
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  /* ── Phase 1: Expand (0 → 0.35) ── */
  const phoneScale = useTransform(scrollYProgress, [0, 0.35], skip ? [1, 1] : [1, targetScale]);
  const frameOpacity = useTransform(scrollYProgress, [0.1, 0.3], skip ? [1, 1] : [1, 0]);
  const outerBR = useTransform(scrollYProgress, [0, 0.35], skip ? [52, 52] : [52, 0]);
  const innerBR = useTransform(scrollYProgress, [0, 0.35], skip ? [49, 49] : [49, 0]);
  const screenBR = useTransform(scrollYProgress, [0, 0.35], skip ? [47, 47] : [47, 0]);
  const glowOp = useTransform(scrollYProgress, [0, 0.25], skip ? [0.5, 0.5] : [0.5, 0]);

  /* ── Phase 2: Dashboard scroll (0.35 → 0.85) ── */
  const cardsY = useTransform(scrollYProgress, [0.35, 0.85], skip ? [0, 0] : [0, -300]);

  const vp = { once: true, amount: 0.2 as const };

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: skip ? 'auto' : '280vh' }}
    >
      <div className={skip ? 'relative' : 'sticky top-0 flex h-screen items-center justify-center overflow-hidden'}>
        <div className="relative mx-auto w-[320px]">

          {/* Pulsing ambient glow behind phone */}
          <motion.div
            className="absolute -inset-8 z-0 rounded-[4rem] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/[0.12] via-blue-500/[0.08] to-transparent blur-3xl"
            style={{ opacity: glowOp }}
          />

          {/* ── Scaled phone wrapper ── */}
          <motion.div className="relative z-10" style={{ scale: phoneScale }}>

            {/* Titanium outer frame */}
            <motion.div
              className="relative p-[3px]"
              style={{
                borderRadius: outerBR,
                background: 'linear-gradient(145deg, #4a4a4f 0%, #2c2c30 25%, #1a1a1e 50%, #2c2c30 75%, #4a4a4f 100%)',
              }}
            >
              {/* Side buttons — fade with frame */}
              <motion.div style={{ opacity: frameOpacity }} className="pointer-events-none">
                <div className="absolute -left-[5px] top-[100px] h-[28px] w-[3px] rounded-l-[2px]" style={{ background: 'linear-gradient(180deg, #4a4a4f, #2c2c30)' }} />
                <div className="absolute -left-[5px] top-[148px] h-[52px] w-[3px] rounded-l-[2px]" style={{ background: 'linear-gradient(180deg, #4a4a4f, #2c2c30)' }} />
                <div className="absolute -left-[5px] top-[210px] h-[52px] w-[3px] rounded-l-[2px]" style={{ background: 'linear-gradient(180deg, #4a4a4f, #2c2c30)' }} />
                <div className="absolute -right-[5px] top-[170px] h-[72px] w-[3px] rounded-r-[2px]" style={{ background: 'linear-gradient(180deg, #4a4a4f, #2c2c30)' }} />
              </motion.div>

              {/* Inner bezel ring */}
              <motion.div className="bg-black p-[2px]" style={{ borderRadius: innerBR }}>
                {/* Screen area */}
                <motion.div
                  className="relative h-[600px] overflow-hidden shadow-[inset_0_0_30px_rgba(0,0,0,0.6)]"
                  style={{ borderRadius: screenBR }}
                >

                  {/* ── Dynamic Island — fades with frame ── */}
                  <motion.div
                    className="absolute left-1/2 top-[11px] z-30 -translate-x-1/2"
                    style={{ opacity: frameOpacity }}
                  >
                    <div className="flex h-[30px] w-[110px] items-center justify-center rounded-full bg-black">
                      <div className="relative flex items-center gap-[10px]">
                        <div className="h-[10px] w-[10px] rounded-full bg-[#0c0c12] ring-1 ring-[#1e1e24]">
                          <div className="ml-[2px] mt-[2px] h-[6px] w-[6px] rounded-full bg-[#111116] ring-1 ring-[#1a1a20]">
                            <div className="ml-[1.5px] mt-[1.5px] h-[3px] w-[3px] rounded-full bg-[#1a1a30]" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* ── App content ── */}
                  <div className="relative h-full bg-[#0a0a0f]">

                    {/* iOS Status bar — stays pinned */}
                    <div className="sticky top-0 z-20 flex items-center justify-between bg-[#0a0a0f]/80 px-7 pb-1 pt-[50px] backdrop-blur-xl">
                      <span className="text-[13px] font-semibold tracking-tight text-white">9:41</span>
                      <div className="flex items-center gap-[5px]">
                        <div className="flex items-end gap-[1.5px]">
                          <div className="h-[4px] w-[3px] rounded-[0.5px] bg-white" />
                          <div className="h-[6px] w-[3px] rounded-[0.5px] bg-white" />
                          <div className="h-[8px] w-[3px] rounded-[0.5px] bg-white" />
                          <div className="h-[10px] w-[3px] rounded-[0.5px] bg-white" />
                        </div>
                        <svg width="14" height="10" viewBox="0 0 14 10" className="ml-0.5 text-white">
                          <path d="M7 9.5a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z" fill="currentColor"/>
                          <path d="M4.05 6.45a4.2 4.2 0 015.9 0" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
                          <path d="M1.75 4.05a7.35 7.35 0 0110.5 0" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round"/>
                        </svg>
                        <div className="relative ml-0.5 flex items-center">
                          <div className="relative h-[11px] w-[22px] rounded-[3px] border border-white/50">
                            <div className="absolute inset-[1.5px] rounded-[1.5px] bg-white" style={{ width: 'calc(100% - 3px)' }} />
                          </div>
                          <div className="ml-[1px] h-[4px] w-[1.5px] rounded-r-[1px] bg-white/50" />
                        </div>
                      </div>
                    </div>

                    {/* ── Scrollable content: header + cards ── */}
                    <motion.div style={{ y: cardsY }}>

                      {/* DashboardHeader */}
                      <motion.div
                        className="px-5 pb-3 pt-1"
                        {...(skip ? {} : { initial: { opacity: 0, y: 30 }, whileInView: { opacity: 1, y: 0 }, viewport: vp })}
                        transition={{ duration: 0.6, delay: 0.2, ease: cardEase }}
                      >
                        <p className="text-[10px] tracking-wide text-gray-500">Tuesday, Feb 25</p>
                        <div className="mt-0.5 flex items-center justify-between">
                          <p className="text-[15px] font-semibold tracking-tight text-white/90">Good morning, Sarah</p>
                          <div className="flex h-8 w-8 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.05]">
                            <Bell className="h-[14px] w-[14px] text-white/60" />
                          </div>
                        </div>
                      </motion.div>

                      <div className="space-y-3 px-4 pb-24">

                        {/* ── SiteBriefing card ── */}
                        <motion.div
                          className="group relative overflow-hidden rounded-xl border border-white/[0.08] bg-[#141419] p-4 shadow-lg shadow-black/20"
                          {...(skip ? {} : { initial: { opacity: 0, y: 50 }, whileInView: { opacity: 1, y: 0 }, viewport: vp })}
                          transition={{ duration: 0.6, delay: 0.4, ease: cardEase }}
                        >
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-amber-500/[0.03] via-transparent to-emerald-500/[0.03] pointer-events-none" />
                          <div className="relative mb-3.5 flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-500/30 to-amber-600/20 shadow-inner">
                                <HardHat className="h-[15px] w-[15px] text-amber-400" />
                              </div>
                              <p className="text-[13px] font-semibold tracking-tight text-white/95">Today&apos;s Site Briefing</p>
                            </div>
                            <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2 py-0.5 ring-1 ring-emerald-500/20">
                              <div className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                              <span className="text-[8px] font-semibold text-emerald-400">Live</span>
                            </div>
                          </div>
                          <div className="relative flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-1.5">
                                <MapPin className="h-[11px] w-[11px] shrink-0 text-gray-400" />
                                <span className="text-[12px] font-medium text-white/85">42 Maple Drive</span>
                              </div>
                              <p className="mt-2 text-[9px] leading-relaxed text-gray-500">Great progress! Day 14 of 42 · Foundation Stage</p>
                            </div>
                            <ProgressRing current={14} total={42} size={56} />
                          </div>
                        </motion.div>

                        {/* ── WeatherBar ── */}
                        <motion.div
                          className="relative overflow-hidden flex items-center justify-between rounded-xl border border-white/[0.08] p-4 shadow-lg shadow-black/20"
                          {...(skip ? {} : { initial: { opacity: 0, y: 50 }, whileInView: { opacity: 1, y: 0 }, viewport: vp })}
                          transition={{ duration: 0.6, delay: 0.7, ease: cardEase }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/[0.08] via-sky-500/[0.05] to-blue-500/[0.08]" />
                          <div className="absolute inset-0 bg-[#141419]" style={{ opacity: 0.85 }} />
                          <div className="relative flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-400/30 to-orange-500/20 shadow-inner">
                              <Sun className="h-[15px] w-[15px] text-amber-400" />
                            </div>
                            <div>
                              <div className="flex items-baseline gap-2">
                                <span className="text-[15px] font-semibold tracking-tight text-white">18°C</span>
                                <span className="text-[9px] text-gray-400">Partly Cloudy</span>
                              </div>
                              <p className="text-[8px] text-gray-600 mt-0.5">Sunset 7:42 PM</p>
                            </div>
                          </div>
                          <div className="relative flex items-center gap-3.5">
                            {[
                              { icon: Wind, val: '12 km/h', color: 'text-sky-400' },
                              { icon: Droplets, val: '45%', color: 'text-blue-400' },
                              { icon: Thermometer, val: 'UV 3', color: 'text-orange-400' },
                            ].map((m, i) => (
                              <React.Fragment key={m.val}>
                                {i > 0 && <div className="h-5 w-px bg-white/[0.08]" />}
                                <div className="flex flex-col items-center gap-1">
                                  <m.icon className={`h-3 w-3 ${m.color}`} />
                                  <span className="text-[8px] font-medium text-gray-400">{m.val}</span>
                                </div>
                              </React.Fragment>
                            ))}
                          </div>
                        </motion.div>

                        {/* ── TeamMembers ── */}
                        <motion.div
                          className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-[#141419] p-4 shadow-lg shadow-black/20"
                          {...(skip ? {} : { initial: { opacity: 0, y: 50 }, whileInView: { opacity: 1, y: 0 }, viewport: vp })}
                          transition={{ duration: 0.6, delay: 1.0, ease: cardEase }}
                        >
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/[0.03] via-transparent to-emerald-500/[0.03] pointer-events-none" />
                          <div className="relative mb-3.5 flex items-center gap-2.5">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500/30 to-blue-600/20 shadow-inner">
                              <Users className="h-[15px] w-[15px] text-blue-400" />
                            </div>
                            <p className="text-[13px] font-semibold tracking-tight text-white/95">Who&apos;s on site today?</p>
                          </div>
                          <div className="relative flex justify-around">
                            {teamData.map((m) => (
                              <div key={m.id} className="flex flex-col items-center">
                                <div className="relative">
                                  <div className={`rounded-full p-[2.5px] ${m.onSite ? 'bg-gradient-to-br from-emerald-400 to-green-500 shadow-lg shadow-emerald-500/25' : 'bg-gradient-to-br from-gray-700 to-gray-600'}`}>
                                    <div className="h-12 w-12 overflow-hidden rounded-full bg-[#0a0a0f]">
                                      <Avatar skin={m.skin} hair={m.hair} id={m.id} />
                                    </div>
                                  </div>
                                  {m.onSite && (
                                    <div className="absolute -bottom-0.5 right-0 flex h-[15px] w-[15px] items-center justify-center rounded-full bg-[#141419]">
                                      <CheckCircle className="h-[12px] w-[12px] text-emerald-400" />
                                    </div>
                                  )}
                                </div>
                                <p className="mt-2 text-[9px] font-medium text-white/85">{m.name}</p>
                                <p className="text-[8px] text-gray-500 mt-0.5">{m.role}</p>
                              </div>
                            ))}
                          </div>
                        </motion.div>

                        {/* ── NoiseActivityForecast ── */}
                        <motion.div
                          className="relative overflow-hidden rounded-xl border border-white/[0.08] bg-[#141419] p-4 shadow-lg shadow-black/20"
                          {...(skip ? {} : { initial: { opacity: 0, y: 50 }, whileInView: { opacity: 1, y: 0 }, viewport: vp })}
                          transition={{ duration: 0.6, delay: 1.3, ease: cardEase }}
                        >
                          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-500/[0.03] via-transparent to-pink-500/[0.03] pointer-events-none" />
                          <div className="relative mb-3.5 flex items-center justify-between">
                            <div className="flex items-center gap-2.5">
                              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-500/30 to-purple-600/20 shadow-inner">
                                <Volume2 className="h-[15px] w-[15px] text-purple-400" />
                              </div>
                              <p className="text-[13px] font-semibold tracking-tight text-white/95">Noise &amp; Activity Forecast</p>
                            </div>
                            <span className="flex items-center gap-0.5 text-[8px] font-medium text-gray-500">Details <ChevronRight className="h-[10px] w-[10px]" /></span>
                          </div>
                          <div className="relative mb-2 flex justify-between px-1 text-[8px] text-gray-500">
                            {['9:30 AM', '11 AM', '1 PM', '3 PM', '5 PM'].map((t, i) => (
                              <span key={t} className={i === 0 ? 'text-white/80 font-semibold' : 'font-medium'}>{t}</span>
                            ))}
                          </div>
                          <div className="relative flex h-3 gap-[1.5px] overflow-hidden rounded-full shadow-inner shadow-black/30">
                            <div className="flex-1 rounded-l-full bg-gradient-to-r from-red-500 to-orange-500 shadow-lg shadow-red-500/20" />
                            <div className="flex-1 bg-gradient-to-r from-orange-500 to-yellow-400 shadow-lg shadow-orange-500/20" />
                            <div className="flex-1 bg-gradient-to-r from-yellow-400 to-green-400 shadow-lg shadow-yellow-400/20" />
                            <div className="flex-1 rounded-r-full bg-gradient-to-r from-green-400 to-emerald-500 shadow-lg shadow-green-400/20" />
                          </div>
                          <div className="relative mt-3 flex items-center gap-4">
                            {[
                              { c: 'bg-red-500', l: 'High' },
                              { c: 'bg-orange-500', l: 'Med' },
                              { c: 'bg-yellow-400', l: 'Low' },
                              { c: 'bg-green-400', l: 'Quiet' },
                            ].map((x) => (
                              <div key={x.l} className="flex items-center gap-1.5">
                                <div className={`h-[6px] w-[6px] rounded-full ${x.c} shadow-sm`} />
                                <span className="text-[8px] font-medium text-gray-400">{x.l}</span>
                              </div>
                            ))}
                          </div>
                        </motion.div>

                        {/* ── WarningAlert ── */}
                        <motion.div
                          className="overflow-hidden rounded-xl border border-orange-500/30 shadow-lg shadow-orange-500/10"
                          {...(skip ? {} : { initial: { opacity: 0, y: 50 }, whileInView: { opacity: 1, y: 0 }, viewport: vp })}
                          transition={{ duration: 0.6, delay: 1.6, ease: cardEase }}
                        >
                          <div className="relative flex items-center gap-3 bg-gradient-to-r from-amber-600/95 to-orange-600/90 p-4">
                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white/25 shadow-inner">
                              <motion.div
                                animate={skip ? {} : { scale: [1, 1.1, 1] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                              >
                                <AlertTriangle className="h-[15px] w-[15px] text-white drop-shadow-sm" />
                              </motion.div>
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="text-[12px] font-semibold tracking-tight text-white">Expect Higher Noise Today</p>
                              <p className="mt-1 text-[9px] text-orange-50/80">Sandblasting nearby (~1 block)</p>
                            </div>
                            <ChevronDown className="h-4 w-4 shrink-0 text-white/60" />
                          </div>
                        </motion.div>

                      </div>
                    </motion.div>

                    {/* ── BottomTabBar — pinned at bottom ── */}
                    <div className="absolute bottom-0 left-0 right-0 z-20">
                      <div className="h-16 bg-gradient-to-t from-[#0a0a0f] to-transparent" />
                      <div className="border-t border-white/[0.06] bg-[#0e0e14]">
                        <div className="flex items-center justify-around px-2 pb-5 pt-2">
                          {tabItems.map((tab) => (
                            <div key={tab.label} className="flex flex-col items-center gap-[3px]">
                              {tab.active && <div className="h-[2px] w-5 rounded-full bg-amber-400" />}
                              <tab.icon className={`h-[16px] w-[16px] ${tab.active ? 'text-white/90' : 'text-gray-600'}`} />
                              <span className={`text-[9px] ${tab.active ? 'font-medium text-white/80' : 'text-gray-600'}`}>{tab.label}</span>
                            </div>
                          ))}
                        </div>
                        <div className="pb-2">
                          <div className="mx-auto h-[4px] w-[120px] rounded-full bg-white/25" />
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Glass reflection overlay — fades with frame */}
                  <motion.div
                    className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent"
                    style={{ opacity: frameOpacity, borderRadius: screenBR }}
                  />
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
