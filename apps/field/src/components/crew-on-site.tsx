import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  Users,
  Clock,
  Coffee,
  LogOut,
  ChevronDown,
  ArrowRight,
} from 'lucide-react';

/* ─── Types ─── */

interface CrewMember {
  id: string;
  name: string;
  trade: string;
  status: 'on-site' | 'break' | 'checked-out';
  checkIn: string;
  avatar: string;
  photo?: string;
}

interface Props {
  crew: CrewMember[];
  onViewAll: () => void;
}

/* ─── Status config ─── */

const STATUS_CONFIG = {
  'on-site': { label: 'On Site', dot: 'bg-emerald-500', icon: Clock, text: 'text-emerald-700' },
  'break': { label: 'Break', dot: 'bg-amber-500', icon: Coffee, text: 'text-amber-700' },
  'checked-out': { label: 'Left', dot: 'bg-slate-400', icon: LogOut, text: 'text-slate-500' },
} as const;

/* ─── Component ─── */

export function CrewOnSitePanel({ crew, onViewAll }: Props) {
  const onSiteCount = crew.filter((c) => c.status === 'on-site').length;
  const breakCount = crew.filter((c) => c.status === 'break').length;
  const outCount = crew.filter((c) => c.status === 'checked-out').length;

  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-2xl border bg-white shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
            <Users className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-slate-900">Crew On Site</h3>
            <div className="flex items-center gap-2 text-[11px] text-slate-500">
              <span className="flex items-center gap-1">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {onSiteCount}
              </span>
              {breakCount > 0 && (
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                  {breakCount}
                </span>
              )}
              {outCount > 0 && (
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-400" />
                  {outCount}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600 lg:hidden"
        >
          <ChevronDown className={cn('h-4 w-4 transition-transform', expanded && 'rotate-180')} />
        </button>

        {/* Desktop count badge */}
        <span className="hidden lg:flex items-center justify-center rounded-full bg-blue-600 px-2.5 py-0.5 text-xs font-bold text-white tabular-nums">
          {onSiteCount + breakCount}
        </span>
      </div>

      {/* Worker list */}
      <div className={cn('lg:block', expanded ? 'block' : 'hidden')}>
        {/* Live indicator */}
        <div className="mx-4 mb-2 flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          <span className="text-[11px] font-medium text-emerald-700">
            {onSiteCount} active now
          </span>
        </div>

        {/* Workers */}
        <div className="max-h-[420px] overflow-y-auto px-2 scrollbar-hide">
          <AnimatePresence initial={false}>
            {crew.map((member, i) => {
              const cfg = STATUS_CONFIG[member.status];
              const initials = member.name
                .split(' ')
                .map((n) => n[0])
                .join('')
                .slice(0, 2);

              return (
                <motion.div
                  key={member.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04, duration: 0.25 }}
                  className={cn(
                    'flex items-center gap-3 rounded-xl px-2 py-2 transition-colors hover:bg-slate-50',
                    member.status === 'checked-out' && 'opacity-50',
                  )}
                >
                  {/* Avatar with status dot */}
                  <div className="relative shrink-0">
                    {member.photo ? (
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="h-9 w-9 rounded-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div
                        className="flex h-9 w-9 items-center justify-center rounded-full text-xs font-bold text-white"
                        style={{ backgroundColor: member.avatar }}
                      >
                        {initials}
                      </div>
                    )}
                    <span
                      className={cn(
                        'absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full ring-2 ring-white',
                        cfg.dot,
                      )}
                    />
                  </div>

                  {/* Info */}
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[13px] font-medium text-slate-900">
                      {member.name}
                    </p>
                    <span className="truncate text-[11px] text-slate-500">
                      {member.trade}
                    </span>
                  </div>

                  {/* Status + time */}
                  <div className="shrink-0 text-right">
                    <span className={cn('text-[10px] font-semibold', cfg.text)}>
                      {cfg.label}
                    </span>
                    <p className="text-[10px] tabular-nums text-slate-400">
                      {member.checkIn}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="border-t px-4 py-3">
          <button
            onClick={onViewAll}
            className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-slate-50 py-2 text-xs font-medium text-blue-600 transition-colors hover:bg-slate-100 hover:text-blue-700"
          >
            View Attendance <ArrowRight className="h-3 w-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
