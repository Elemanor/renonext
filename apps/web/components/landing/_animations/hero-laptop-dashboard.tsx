'use client';

import {
  CheckCircle2,
  Circle,
  Clock,
  DollarSign,
  LayoutDashboard,
  MapPin,
  Shield,
  TrendingUp,
  Users,
} from 'lucide-react';

/* ── Enhanced dashboard shown inside the hero laptop mockup ── */

const barData = [
  { h: 34, label: 'Jul' },
  { h: 48, label: 'Aug' },
  { h: 42, label: 'Sep' },
  { h: 62, label: 'Oct' },
  { h: 56, label: 'Nov' },
  { h: 78, label: 'Dec' },
  { h: 70, label: 'Jan' },
  { h: 52, label: 'Feb' },
  { h: 66, label: 'Mar' },
  { h: 84, label: 'Apr' },
  { h: 45, label: 'May' },
  { h: 92, label: 'Jun' },
];

const crew = [
  { initials: 'AN', name: 'Andre N.', gradient: 'from-blue-500 to-blue-600', status: 'online' as const },
  { initials: 'AH', name: 'Alex H.', gradient: 'from-rose-500 to-rose-600', status: 'online' as const },
  { initials: 'DP', name: 'David P.', gradient: 'from-amber-500 to-amber-600', status: 'online' as const },
  { initials: 'ED', name: 'Eduardo D.', gradient: 'from-emerald-500 to-emerald-600', status: 'online' as const },
];

const tasks = [
  { label: 'Permit Approved', status: 'done' as const, color: 'text-emerald-400', dot: 'bg-emerald-400' },
  { label: 'Rough Inspection', status: 'active' as const, color: 'text-amber-400', dot: 'bg-amber-400' },
  { label: 'Concrete Pour Scheduled', status: 'pending' as const, color: 'text-blue-400', dot: 'bg-blue-400' },
];

export function HeroLaptopDashboard() {
  return (
    <div className="select-none bg-[#0b0f18] font-sans text-white">
      {/* ── Dot-grid background ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.3]"
        style={{
          backgroundImage:
            'radial-gradient(circle, rgba(148,163,184,0.08) 1px, transparent 1px)',
          backgroundSize: '14px 14px',
        }}
      />

      {/* ── App top bar ── */}
      <div className="relative flex items-center justify-between border-b border-white/[0.06] bg-[#080c14] px-4 py-2">
        <div className="flex items-center gap-2">
          <div className="flex h-[18px] w-[18px] items-center justify-center rounded-md bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-sm shadow-emerald-500/20">
            <span className="text-[6px] font-black text-white">RN</span>
          </div>
          <span className="text-[10px] font-bold text-white/90 tracking-wide">RenoNext</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-semibold text-slate-400">
            Command Center
          </span>
          <div className="h-3 w-px bg-white/[0.08]" />
          <div className="flex items-center gap-1 text-[8px] text-slate-500">
            <Clock className="h-2 w-2" />
            <span className="tabular-nums">Feb 24, 2026</span>
          </div>
        </div>
      </div>

      {/* ── Dashboard content ── */}
      <div className="relative p-3.5 space-y-2.5">
        {/* ─── Top stats row ─── */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: 'Budget Used', value: '67%', icon: DollarSign, color: 'text-emerald-400', bg: 'bg-emerald-500/10', bar: 'bg-emerald-500', barW: '67%' },
            { label: 'Schedule', value: 'Day 145', icon: Clock, color: 'text-blue-400', bg: 'bg-blue-500/10', bar: 'bg-blue-500', barW: '52%' },
            { label: 'Safety Score', value: '94/100', icon: Shield, color: 'text-amber-400', bg: 'bg-amber-500/10', bar: 'bg-amber-500', barW: '94%' },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2"
            >
              <div className="flex items-center gap-1.5 mb-1">
                <div className={`flex h-4 w-4 items-center justify-center rounded ${stat.bg}`}>
                  <stat.icon className={`h-2 w-2 ${stat.color}`} />
                </div>
                <span className="text-[7px] font-semibold uppercase tracking-wider text-slate-500">
                  {stat.label}
                </span>
              </div>
              <p className={`text-[12px] font-extrabold tabular-nums leading-tight ${stat.color}`}>
                {stat.value}
              </p>
              <div className="mt-1.5 h-[2px] overflow-hidden rounded-full bg-white/[0.04]">
                <div
                  className={`h-full rounded-full ${stat.bar}`}
                  style={{ width: stat.barW }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* ─── Next Milestone Payment — hero card ─── */}
        <div className="rounded-xl border border-white/[0.08] bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent p-3.5 relative overflow-hidden">
          {/* Subtle card glow */}
          <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-emerald-500/[0.06] blur-2xl" />

          <div className="flex items-start justify-between relative">
            <div>
              <p className="text-[9px] font-medium uppercase tracking-wider text-slate-500">
                Next Milestone Payment
              </p>
              <p className="mt-1 text-[26px] font-extrabold tabular-nums leading-none tracking-tight text-white">
                $32,500
              </p>
            </div>
            <div className="flex items-center gap-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              <span className="text-[7px] font-bold uppercase tracking-wider text-emerald-400">
                Funds Secured in Vault
              </span>
            </div>
          </div>

          {/* Bar chart with labels */}
          <div className="mt-3">
            <div className="flex items-end gap-[3px] h-[48px]">
              {barData.map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div
                    className={`w-full rounded-t-[2px] ${
                      i === barData.length - 1
                        ? 'bg-gradient-to-t from-emerald-600 to-emerald-400 shadow-sm shadow-emerald-500/30'
                        : i >= barData.length - 3
                          ? 'bg-emerald-500/60'
                          : 'bg-emerald-500/20'
                    }`}
                    style={{ height: `${bar.h}%` }}
                  />
                </div>
              ))}
            </div>
            {/* X-axis labels */}
            <div className="flex gap-[3px] mt-1">
              {barData.map((bar, i) => (
                <span
                  key={i}
                  className={`flex-1 text-center text-[5px] tabular-nums ${
                    i === barData.length - 1 ? 'font-bold text-emerald-400' : 'text-slate-600'
                  }`}
                >
                  {bar.label}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Bottom row — Crew + Tasks ─── */}
        <div className="grid grid-cols-2 gap-2.5">
          {/* Verified Crew Attendance */}
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-3">
            <div className="flex items-center justify-between mb-2.5">
              <p className="text-[9px] font-medium uppercase tracking-wider text-slate-500">
                Verified Crew Attendance
              </p>
              <span className="text-[8px] font-bold tabular-nums text-emerald-400">
                4/6
              </span>
            </div>
            <div className="flex -space-x-1.5">
              {crew.map((w) => (
                <div key={w.initials} className="relative group">
                  <div
                    className={`flex h-[30px] w-[30px] items-center justify-center rounded-full bg-gradient-to-br ${w.gradient} ring-[1.5px] ring-[#0b0f18] shadow-sm`}
                  >
                    <span className="text-[7px] font-extrabold text-white">
                      {w.initials}
                    </span>
                  </div>
                  {/* Online indicator */}
                  <span className="absolute -bottom-px -right-px h-[5px] w-[5px] rounded-full bg-emerald-400 ring-[1.5px] ring-[#0b0f18]" />
                </div>
              ))}
              <div className="flex h-[30px] w-[30px] items-center justify-center rounded-full border border-dashed border-slate-600/60 ring-[1.5px] ring-[#0b0f18] bg-[#0b0f18]">
                <span className="text-[7px] font-bold text-slate-500">+2</span>
              </div>
            </div>
            {/* GPS verification note */}
            <div className="mt-2.5 flex items-center gap-1">
              <MapPin className="h-2 w-2 text-emerald-400/60" />
              <span className="text-[7px] text-slate-600">GPS verified on-site</span>
            </div>
          </div>

          {/* Task Tracker */}
          <div className="rounded-xl border border-white/[0.08] bg-white/[0.02] p-3">
            <div className="flex items-center justify-between mb-2.5">
              <p className="text-[9px] font-medium uppercase tracking-wider text-slate-500">
                Task Tracker
              </p>
              <span className="text-[8px] font-bold tabular-nums text-slate-400">
                1/3
              </span>
            </div>
            <div className="space-y-[7px]">
              {tasks.map((task) => (
                <div
                  key={task.label}
                  className="flex items-center gap-2 rounded-md border border-white/[0.04] bg-white/[0.02] px-2 py-[5px]"
                >
                  {task.status === 'done' ? (
                    <CheckCircle2 className={`h-3 w-3 shrink-0 ${task.color}`} />
                  ) : (
                    <div className="relative flex h-3 w-3 shrink-0 items-center justify-center">
                      <Circle className="h-3 w-3 text-slate-700" />
                      <div className={`absolute h-1 w-1 rounded-full ${task.dot} ${
                        task.status === 'active' ? 'animate-pulse' : 'opacity-40'
                      }`} />
                    </div>
                  )}
                  <span
                    className={`text-[8px] font-medium leading-tight ${
                      task.status === 'done'
                        ? 'text-slate-300'
                        : task.status === 'active'
                          ? 'text-slate-400'
                          : 'text-slate-500'
                    }`}
                  >
                    {task.label}
                  </span>
                  {task.status === 'done' && (
                    <span className="ml-auto text-[6px] font-bold text-emerald-500/60">DONE</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ─── Bottom status bar ─── */}
        <div className="flex items-center justify-between pt-1 border-t border-white/[0.04]">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-[6px] text-slate-600">
              <span className="h-1 w-1 rounded-full bg-emerald-400" />
              Live
            </span>
            <span className="text-[6px] tabular-nums text-slate-700">Latency: 24ms</span>
          </div>
          <div className="flex items-center gap-1.5">
            <TrendingUp className="h-2 w-2 text-emerald-500/40" />
            <span className="text-[6px] text-slate-700">v2.4.1</span>
          </div>
        </div>
      </div>
    </div>
  );
}
