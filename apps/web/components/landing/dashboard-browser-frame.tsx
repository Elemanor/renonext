'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import {
  LayoutDashboard,
  Calendar,
  FolderOpen,
  Shield,
  Users,
  MessageSquare,
  Settings,
} from 'lucide-react';

interface DashboardBrowserFrameProps {
  children: ReactNode;
  variant?: 'green' | 'teal';
}

const variants = {
  green: {
    primary: '#1D6B3F',
    secondary: '#0D7377',
    badgeClasses: 'border-reno-green/20 bg-reno-green/10 text-reno-green',
    dotClasses: 'bg-reno-green',
    lockColor: 'text-reno-green',
  },
  teal: {
    primary: '#0D7377',
    secondary: '#6B4E8D',
    badgeClasses: 'border-reno-teal/20 bg-reno-teal/10 text-reno-teal',
    dotClasses: 'bg-reno-teal',
    lockColor: 'text-reno-teal',
  },
};

const sidebarNav = [
  { icon: LayoutDashboard, active: true },
  { icon: Calendar, active: false },
  { icon: FolderOpen, active: false },
  { icon: Shield, active: false },
  { icon: Users, active: false },
  { icon: MessageSquare, active: false },
  { icon: Settings, active: false },
];

const ease = [0.22, 0.68, 0, 1] as const;

export function DashboardBrowserFrame({ children, variant = 'green' }: DashboardBrowserFrameProps) {
  const v = variants[variant];

  return (
    <div className="relative mx-auto w-full max-w-[600px]">
      {/* SVG background — blueprint grid + glow */}
      <svg
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2"
        width="700"
        height="560"
        viewBox="0 0 700 560"
        fill="none"
        aria-hidden
      >
        <defs>
          <pattern id={`bgrid-${variant}`} width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="14" cy="14" r="0.7" fill={v.primary} opacity="0.08" />
          </pattern>
          <radialGradient id={`bglow-${variant}`} cx="50%" cy="50%" r="45%">
            <stop offset="0%" stopColor={v.primary} stopOpacity="0.12" />
            <stop offset="50%" stopColor={v.primary} stopOpacity="0.03" />
            <stop offset="100%" stopColor={v.primary} stopOpacity="0" />
          </radialGradient>
        </defs>

        <rect width="700" height="560" fill={`url(#bgrid-${variant})`} />
        <circle cx="350" cy="280" r="260" stroke={v.primary} strokeWidth="0.5" opacity="0.08" />
        <circle cx="350" cy="280" r="200" stroke={v.primary} strokeWidth="0.5" opacity="0.05" strokeDasharray="5 8" />
        <ellipse cx="350" cy="280" rx="280" ry="220" fill={`url(#bglow-${variant})`} />

        {/* Corner brackets */}
        <line x1="30" y1="50" x2="30" y2="90" stroke={v.primary} strokeWidth="0.5" opacity="0.10" />
        <line x1="30" y1="50" x2="70" y2="50" stroke={v.primary} strokeWidth="0.5" opacity="0.10" />
        <line x1="670" y1="510" x2="670" y2="470" stroke={v.primary} strokeWidth="0.5" opacity="0.10" />
        <line x1="670" y1="510" x2="630" y2="510" stroke={v.primary} strokeWidth="0.5" opacity="0.10" />
      </svg>

      {/* Floating "Live Preview" badge */}
      <motion.div
        initial={{ opacity: 0, x: 12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className={`absolute -right-4 top-3 z-20 flex items-center gap-1.5 rounded-full border px-3 py-1.5 shadow-lg backdrop-blur-sm ${v.badgeClasses}`}
      >
        <span className={`h-1.5 w-1.5 animate-pulse rounded-full ${v.dotClasses}`} />
        <span className="text-[10px] font-semibold tracking-wide">Live Preview</span>
      </motion.div>

      {/* Animated browser window */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease }}
        className="relative z-10 overflow-hidden rounded-xl border border-white/[0.08] shadow-2xl shadow-black/40"
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-2 border-b border-white/[0.06] bg-[#1a1a1f] px-4 py-2.5">
          {/* Traffic lights */}
          <div className="flex gap-1.5">
            <div className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <div className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <div className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>

          {/* Active tab */}
          <div className="ml-3 flex items-center gap-2 rounded-t-md border-x border-t border-white/[0.06] bg-[#0a0a0f] px-4 py-1.5">
            <LayoutDashboard className="h-3 w-3 text-white/50" />
            <span className="text-[11px] font-medium text-white/60">Dashboard</span>
          </div>

          {/* URL bar */}
          <div className="flex flex-1 justify-end">
            <div className="flex items-center gap-2 rounded-md bg-white/[0.05] px-3 py-1">
              <svg className={`h-3 w-3 ${v.lockColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="text-[11px] text-gray-500">renonext.com/dashboard</span>
            </div>
          </div>
        </div>

        {/* Body: sidebar + content */}
        <div className="flex bg-[#0a0a0f]">
          {/* Mini sidebar */}
          <div className="flex w-12 shrink-0 flex-col items-center gap-1 border-r border-white/[0.04] bg-[#0e0e14] py-3">
            {sidebarNav.map((item, i) => (
              <div
                key={i}
                className={`flex h-8 w-8 items-center justify-center rounded-lg ${
                  item.active
                    ? 'bg-white/[0.08] text-white/80'
                    : 'text-gray-700 hover:text-gray-500'
                }`}
              >
                <item.icon className="h-[14px] w-[14px]" />
              </div>
            ))}
          </div>

          {/* Content area */}
          <div className="relative min-w-0 flex-1">
            {/* Subtle grid */}
            <div
              className="pointer-events-none absolute inset-0 opacity-[0.02]"
              style={{
                backgroundImage:
                  'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
            />

            {/* Header — bridges font systems */}
            <div className="flex items-center justify-between border-b border-white/[0.04] px-4 py-2.5">
              <p className="font-display text-sm tracking-tight text-white/90">Your Dashboard</p>
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                <span className="text-[10px] text-gray-500">47 Willowdale Ave</span>
              </div>
            </div>

            <div className="relative space-y-3 p-4">{children}</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
