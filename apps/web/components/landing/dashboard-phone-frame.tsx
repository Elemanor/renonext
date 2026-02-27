'use client';

import { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface DashboardPhoneFrameProps {
  children: ReactNode;
  variant?: 'green' | 'teal';
}

const variants = {
  green: {
    primary: '#1D6B3F',
    secondary: '#0D7377',
    badgeClasses: 'border-reno-green/20 bg-reno-green/10 text-reno-green',
    dotClasses: 'bg-reno-green',
  },
  teal: {
    primary: '#0D7377',
    secondary: '#6B4E8D',
    badgeClasses: 'border-reno-teal/20 bg-reno-teal/10 text-reno-teal',
    dotClasses: 'bg-reno-teal',
  },
};

const ease = [0.22, 0.68, 0, 1] as const;

export function DashboardPhoneFrame({ children, variant = 'green' }: DashboardPhoneFrameProps) {
  const v = variants[variant];

  return (
    <div className="relative mx-auto w-full max-w-[340px]">
      {/* SVG background — blueprint grid + glow rings */}
      <svg
        className="pointer-events-none absolute left-1/2 top-1/2 z-0 -translate-x-1/2 -translate-y-1/2"
        width="500"
        height="720"
        viewBox="0 0 500 720"
        fill="none"
        aria-hidden
      >
        <defs>
          <pattern id={`pgrid-${variant}`} width="28" height="28" patternUnits="userSpaceOnUse">
            <circle cx="14" cy="14" r="0.8" fill={v.primary} opacity="0.10" />
          </pattern>
          <radialGradient id={`pglow-${variant}`} cx="50%" cy="48%" r="42%">
            <stop offset="0%" stopColor={v.primary} stopOpacity="0.14" />
            <stop offset="55%" stopColor={v.primary} stopOpacity="0.04" />
            <stop offset="100%" stopColor={v.primary} stopOpacity="0" />
          </radialGradient>
          <radialGradient id={`pglow2-${variant}`} cx="50%" cy="42%" r="28%">
            <stop offset="0%" stopColor={v.secondary} stopOpacity="0.08" />
            <stop offset="100%" stopColor={v.secondary} stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Dot grid */}
        <rect width="500" height="720" fill={`url(#pgrid-${variant})`} />

        {/* Concentric rings */}
        <circle cx="250" cy="360" r="230" stroke={v.primary} strokeWidth="0.5" opacity="0.10" />
        <circle cx="250" cy="360" r="185" stroke={v.primary} strokeWidth="0.5" opacity="0.07" strokeDasharray="5 7" />
        <circle cx="250" cy="360" r="140" stroke={v.secondary} strokeWidth="0.5" opacity="0.05" />

        {/* Radial glow layers */}
        <ellipse cx="250" cy="360" rx="210" ry="300" fill={`url(#pglow-${variant})`} />
        <ellipse cx="250" cy="320" rx="150" ry="200" fill={`url(#pglow2-${variant})`} />

        {/* Corner accent lines */}
        <line x1="40" y1="80" x2="40" y2="120" stroke={v.primary} strokeWidth="0.5" opacity="0.12" />
        <line x1="40" y1="80" x2="80" y2="80" stroke={v.primary} strokeWidth="0.5" opacity="0.12" />
        <line x1="460" y1="640" x2="460" y2="600" stroke={v.primary} strokeWidth="0.5" opacity="0.12" />
        <line x1="460" y1="640" x2="420" y2="640" stroke={v.primary} strokeWidth="0.5" opacity="0.12" />
      </svg>

      {/* Floating "Live Preview" badge */}
      <motion.div
        initial={{ opacity: 0, x: 12 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className={`absolute -right-2 top-10 z-20 flex items-center gap-1.5 rounded-full border px-3 py-1.5 shadow-lg backdrop-blur-sm sm:-right-8 ${v.badgeClasses}`}
      >
        <span className={`h-1.5 w-1.5 animate-pulse rounded-full ${v.dotClasses}`} />
        <span className="text-[10px] font-semibold tracking-wide">Live Preview</span>
      </motion.div>

      {/* Animated phone */}
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.93 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.8, ease }}
        className="relative z-10"
      >
        {/* Titanium outer frame */}
        <div
          className="relative rounded-[52px] p-[3px]"
          style={{
            background:
              'linear-gradient(145deg, #4a4a4f 0%, #2c2c30 25%, #1a1a1e 50%, #2c2c30 75%, #4a4a4f 100%)',
          }}
        >
          {/* Side buttons */}
          <div className="pointer-events-none">
            <div className="absolute -left-[5px] top-[100px] h-[28px] w-[3px] rounded-l-[2px]" style={{ background: 'linear-gradient(180deg, #4a4a4f, #2c2c30)' }} />
            <div className="absolute -left-[5px] top-[148px] h-[52px] w-[3px] rounded-l-[2px]" style={{ background: 'linear-gradient(180deg, #4a4a4f, #2c2c30)' }} />
            <div className="absolute -left-[5px] top-[210px] h-[52px] w-[3px] rounded-l-[2px]" style={{ background: 'linear-gradient(180deg, #4a4a4f, #2c2c30)' }} />
            <div className="absolute -right-[5px] top-[170px] h-[72px] w-[3px] rounded-r-[2px]" style={{ background: 'linear-gradient(180deg, #4a4a4f, #2c2c30)' }} />
          </div>

          {/* Inner bezel */}
          <div className="rounded-[49px] bg-black p-[2px]">
            <div className="relative overflow-hidden rounded-[47px] shadow-[inset_0_0_30px_rgba(0,0,0,0.6)]">
              {/* Dynamic Island */}
              <div className="absolute left-1/2 top-[11px] z-30 -translate-x-1/2">
                <div className="flex h-[30px] w-[110px] items-center justify-center rounded-full bg-black">
                  <div className="h-[10px] w-[10px] rounded-full bg-[#0c0c12] ring-1 ring-[#1e1e24]">
                    <div className="ml-[2px] mt-[2px] h-[6px] w-[6px] rounded-full bg-[#111116] ring-1 ring-[#1a1a20]">
                      <div className="ml-[1.5px] mt-[1.5px] h-[3px] w-[3px] rounded-full bg-[#1a1a30]" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Screen */}
              <div className="relative bg-[#0a0a0f]">
                {/* iOS status bar */}
                <div className="flex items-center justify-between px-7 pb-1 pt-[50px]">
                  <span className="text-[13px] font-semibold tracking-tight text-white">9:41</span>
                  <div className="flex items-center gap-[5px]">
                    <div className="flex items-end gap-[1.5px]">
                      <div className="h-[4px] w-[3px] rounded-[0.5px] bg-white" />
                      <div className="h-[6px] w-[3px] rounded-[0.5px] bg-white" />
                      <div className="h-[8px] w-[3px] rounded-[0.5px] bg-white" />
                      <div className="h-[10px] w-[3px] rounded-[0.5px] bg-white" />
                    </div>
                    <svg width="14" height="10" viewBox="0 0 14 10" className="ml-0.5 text-white">
                      <path d="M7 9.5a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z" fill="currentColor" />
                      <path d="M4.05 6.45a4.2 4.2 0 015.9 0" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                      <path d="M1.75 4.05a7.35 7.35 0 0110.5 0" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinecap="round" />
                    </svg>
                    <div className="relative ml-0.5 flex items-center">
                      <div className="relative h-[11px] w-[22px] rounded-[3px] border border-white/50">
                        <div className="absolute inset-[1.5px] rounded-[1.5px] bg-white" style={{ width: 'calc(100% - 3px)' }} />
                      </div>
                      <div className="ml-[1px] h-[4px] w-[1.5px] rounded-r-[1px] bg-white/50" />
                    </div>
                  </div>
                </div>

                {/* App header — bridges font systems */}
                <div className="flex items-center justify-between px-4 pb-2 pt-1">
                  <p className="font-display text-[15px] tracking-tight text-white/90">Your Dashboard</p>
                  <div className="flex h-6 w-6 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.04]">
                    <div className="h-1 w-1 rounded-full bg-white/40" />
                  </div>
                </div>

                {/* Dashboard widgets */}
                <div className="space-y-3 px-3 pb-4 pt-1">{children}</div>

                {/* Home indicator */}
                <div className="pb-3 pt-2">
                  <div className="mx-auto h-[4px] w-[120px] rounded-full bg-white/20" />
                </div>
              </div>

              {/* Glass reflection */}
              <div className="pointer-events-none absolute inset-0 z-20 rounded-[47px] bg-gradient-to-br from-white/[0.03] via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
