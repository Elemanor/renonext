'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Sun, Cloud, CloudSun, CloudRain, Droplets,
  Truck, ClipboardCheck, CheckCircle2, Clock, AlertCircle,
  ChevronRight,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatedCard } from './animated-card';
import {
  hourlyForecast,
  deliveries,
  inspections,
  milestoneSteps,
  type HourlyForecast,
  type Delivery,
  type Inspection,
} from '@/lib/mock-data/command-center';

const weatherIcons: Record<string, React.ElementType> = {
  sun: Sun,
  'cloud-sun': CloudSun,
  cloud: Cloud,
  'cloud-rain': CloudRain,
};

const tabs = [
  { id: 'on-site', label: 'On Site' },
  { id: 'deliveries', label: 'Deliveries' },
  { id: 'inspections', label: 'Inspections' },
] as const;

type TabId = (typeof tabs)[number]['id'];

function WeatherIcon({ icon, className }: { icon: string; className?: string }) {
  const Icon = weatherIcons[icon] || Cloud;
  return <Icon className={className} />;
}

function DeliveryStatusBadge({ status }: { status: Delivery['status'] }) {
  const styles: Record<string, string> = {
    delivered: 'bg-emerald-500/20 text-emerald-400',
    'en-route': 'bg-amber-500/20 text-amber-400',
    scheduled: 'bg-blue-500/20 text-blue-400',
  };
  return (
    <span className={cn('rounded-full px-2 py-0.5 text-[10px] font-medium', styles[status])}>
      {status === 'en-route' ? 'En Route' : status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
}

function InspectionStatusIcon({ status, result }: Pick<Inspection, 'status' | 'result'>) {
  if (status === 'completed' && result === 'passed') return <CheckCircle2 className="h-4 w-4 text-emerald-400" />;
  if (status === 'completed' && result === 'failed') return <AlertCircle className="h-4 w-4 text-red-400" />;
  if (status === 'in-progress') return <Clock className="h-4 w-4 text-amber-400" />;
  return <Clock className="h-4 w-4 text-blue-400" />;
}

export function WeatherHub() {
  const [activeTab, setActiveTab] = useState<TabId>('on-site');

  return (
    <AnimatedCard className="flex min-w-0 flex-col" delay={0.1}>
      {/* Weather hero */}
      <div className="mb-4 flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Today&apos;s Weather</p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-3xl font-bold tabular-nums text-white/90">6°C</span>
            <span className="text-sm text-gray-400">Overcast</span>
          </div>
          <div className="mt-1 flex items-center gap-1 text-xs text-blue-400">
            <Droplets className="h-3 w-3" />
            <span>10% precipitation</span>
          </div>
        </div>
        <Cloud className="h-10 w-10 text-gray-500" />
      </div>

      {/* Hourly strip */}
      <div className="mb-4 flex gap-3 overflow-x-auto pb-1">
        {hourlyForecast.map((h: HourlyForecast) => (
          <div key={h.time} className="flex shrink-0 flex-col items-center gap-1">
            <span className="text-[10px] text-gray-500">{h.time}</span>
            <WeatherIcon icon={h.icon} className="h-4 w-4 text-gray-400" />
            <span className="text-xs font-medium text-white/80">{h.temp}°</span>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="mb-3 flex gap-1 rounded-lg bg-white/[0.04] p-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'relative flex-1 rounded-md px-3 py-1.5 text-xs font-medium transition-colors',
              activeTab === tab.id ? 'text-white' : 'text-gray-500 hover:text-gray-400'
            )}
          >
            {activeTab === tab.id && (
              <motion.div
                layoutId="weather-tab"
                className="absolute inset-0 rounded-md bg-white/[0.08]"
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
              />
            )}
            <span className="relative z-10">{tab.label}</span>
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="min-h-0 flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'on-site' && (
            <motion.div
              key="on-site"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="space-y-2"
            >
              {/* Milestones timeline */}
              {milestoneSteps.map((step, i) => (
                <div key={step.label} className="flex items-start gap-3">
                  <div className="flex flex-col items-center">
                    <div
                      className={cn(
                        'h-2.5 w-2.5 rounded-full border-2',
                        step.status === 'completed' ? 'border-emerald-400 bg-emerald-400' :
                        step.status === 'current' ? 'border-emerald-400 bg-transparent' :
                        'border-gray-600 bg-transparent'
                      )}
                    />
                    {i < milestoneSteps.length - 1 && (
                      <div className={cn('mt-1 h-5 w-px', step.status === 'completed' ? 'bg-emerald-400/40' : 'bg-gray-700')} />
                    )}
                  </div>
                  <div className="-mt-0.5 min-w-0 flex-1">
                    <p className={cn(
                      'text-xs font-medium',
                      step.status === 'completed' ? 'text-gray-400' :
                      step.status === 'current' ? 'text-white/90' : 'text-gray-500'
                    )}>
                      {step.label}
                    </p>
                    {step.date && <p className="text-[10px] text-gray-600">{step.date}</p>}
                  </div>
                  {step.status === 'current' && (
                    <span className="shrink-0 rounded-full bg-emerald-500/20 px-2 py-0.5 text-[10px] font-medium text-emerald-400">
                      In Progress
                    </span>
                  )}
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'deliveries' && (
            <motion.div
              key="deliveries"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="space-y-2"
            >
              {deliveries.map((d: Delivery) => (
                <div key={d.id} className="flex items-center gap-3 rounded-xl bg-white/[0.03] p-3">
                  <Truck className={cn(
                    'h-4 w-4 shrink-0',
                    d.status === 'delivered' ? 'text-emerald-400' :
                    d.status === 'en-route' ? 'text-amber-400' : 'text-blue-400'
                  )} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium text-white/80">{d.item}</p>
                    <p className="text-[10px] text-gray-500">{d.supplier}</p>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <DeliveryStatusBadge status={d.status} />
                    <span className="text-[10px] text-gray-600">{d.eta || d.time}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeTab === 'inspections' && (
            <motion.div
              key="inspections"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
              transition={{ duration: 0.2 }}
              className="space-y-2"
            >
              {inspections.map((ins: Inspection) => (
                <div key={ins.id} className="flex items-center gap-3 rounded-xl bg-white/[0.03] p-3">
                  <InspectionStatusIcon status={ins.status} result={ins.result} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-xs font-medium text-white/80">{ins.type}</p>
                    <p className="text-[10px] text-gray-500">{ins.inspector} · {ins.date}</p>
                  </div>
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 text-gray-600" />
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AnimatedCard>
  );
}
