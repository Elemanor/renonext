'use client';

import { useState } from 'react';
import {
  Calendar,
  FileText,
  TrendingUp,
  Bell,
  CheckCircle2,
  Zap,
  Wrench,
  HardHat,
  ClipboardCheck,
  Circle,
  AlertCircle,
  AlertTriangle,
  Lock,
  DollarSign,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type TabValue = 'schedule' | 'reports' | 'progress' | 'alerts';

const tabs: { value: TabValue; label: string; icon: typeof Calendar }[] = [
  { value: 'schedule', label: 'Schedule', icon: Calendar },
  { value: 'reports', label: 'Reports', icon: FileText },
  { value: 'progress', label: 'Progress', icon: TrendingUp },
  { value: 'alerts', label: 'Alerts', icon: Bell },
];

const weekSchedule = [
  {
    day: 'Mon',
    date: 'Feb 24',
    task: 'Framing complete',
    icon: CheckCircle2,
    status: 'complete' as const,
    color: 'text-reno-green',
  },
  {
    day: 'Tue',
    date: 'Feb 25',
    task: 'Electrical rough-in',
    icon: Zap,
    status: 'in-progress' as const,
    color: 'text-reno-teal',
  },
  {
    day: 'Wed',
    date: 'Feb 26',
    task: 'Plumbing rough-in',
    icon: Wrench,
    status: 'scheduled' as const,
    color: 'text-gray-400',
  },
  {
    day: 'Thu',
    date: 'Feb 27',
    task: 'Insulation',
    icon: HardHat,
    status: 'scheduled' as const,
    color: 'text-gray-400',
  },
  {
    day: 'Fri',
    date: 'Feb 28',
    task: 'Inspection',
    icon: ClipboardCheck,
    status: 'scheduled' as const,
    color: 'text-gray-400',
  },
];

const milestones = [
  { name: 'Demo & Site Prep', progress: 100, amount: 3200, status: 'complete' as const },
  { name: 'Structural', progress: 100, amount: 8500, status: 'complete' as const },
  { name: 'Rough-in (MEP)', progress: 65, amount: 12400, status: 'in-progress' as const },
  { name: 'Insulation & Drywall', progress: 0, amount: 6800, status: 'locked' as const },
  { name: 'Finishes', progress: 0, amount: 8100, status: 'locked' as const },
  { name: 'Final Inspection', progress: 0, amount: 3000, status: 'locked' as const },
];

const alerts = [
  {
    type: 'urgent' as const,
    icon: AlertCircle,
    message: 'Inspection scheduled for tomorrow 10 AM',
    time: '2 hours ago',
    color: 'text-red-500',
    bg: 'bg-red-50',
  },
  {
    type: 'warning' as const,
    icon: AlertTriangle,
    message: 'Weather alert: Rain expected Thursday — outdoor work may pause',
    time: '5 hours ago',
    color: 'text-amber-500',
    bg: 'bg-amber-50',
  },
  {
    type: 'info' as const,
    icon: DollarSign,
    message: 'Milestone payment released: Structural — $8,500',
    time: '1 day ago',
    color: 'text-reno-green',
    bg: 'bg-reno-green-light',
  },
];

export function ClientDashboardShowcase() {
  const [activeTab, setActiveTab] = useState<TabValue>('schedule');

  return (
    <Card className="w-full overflow-hidden border-2 border-gray-200 shadow-xl">
      {/* Header */}
      <CardHeader className="border-b border-gray-200 bg-gradient-to-r from-white to-gray-50 pb-4">
        <div className="space-y-3">
          <div>
            <CardTitle className="text-xl font-bold text-gray-900">
              Basement Renovation — 321 Yonge St, Toronto
            </CardTitle>
            <div className="mt-2 flex items-center gap-3">
              <Badge className="bg-reno-green text-white hover:bg-reno-green">
                In Progress
              </Badge>
              <span className="text-sm text-gray-600">65% Complete</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="space-y-1.5">
            <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
              <div
                className="h-full rounded-full bg-gradient-to-r from-reno-green to-reno-teal transition-all"
                style={{ width: '65%' }}
              />
            </div>
          </div>
        </div>
      </CardHeader>

      {/* Tabs */}
      <div className="border-b border-gray-200 bg-white">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.value}
              onClick={() => setActiveTab(tab.value)}
              className={cn(
                'flex flex-1 items-center justify-center gap-2 border-b-2 px-4 py-3 text-sm font-medium transition-colors',
                activeTab === tab.value
                  ? 'border-reno-green text-reno-green'
                  : 'border-transparent text-gray-600 hover:text-gray-900'
              )}
            >
              <tab.icon className="h-4 w-4" />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <CardContent className="p-6">
        {activeTab === 'schedule' && (
          <div className="space-y-6">
            {/* Today's work */}
            <div className="rounded-lg bg-reno-teal-light p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-reno-teal">
                <Calendar className="h-4 w-4" />
                Today's Work
              </div>
              <p className="mt-2 text-sm text-gray-700">
                Framing inspection at 10 AM, Electrical rough-in continues
              </p>
            </div>

            {/* This week timeline */}
            <div>
              <h3 className="mb-3 text-sm font-semibold text-gray-900">This Week</h3>
              <div className="space-y-2">
                {weekSchedule.map((item) => (
                  <div
                    key={item.day}
                    className={cn(
                      'flex items-center gap-4 rounded-lg border p-3',
                      item.status === 'complete'
                        ? 'border-reno-green/30 bg-reno-green-light'
                        : item.status === 'in-progress'
                          ? 'border-reno-teal/30 bg-reno-teal-light'
                          : 'border-gray-200 bg-white'
                    )}
                  >
                    <item.icon className={cn('h-5 w-5', item.color)} />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-semibold text-gray-900">
                          {item.day}
                        </span>
                        <span className="text-xs text-gray-500">{item.date}</span>
                      </div>
                      <p className="text-sm text-gray-700">{item.task}</p>
                    </div>
                    {item.status === 'complete' && (
                      <CheckCircle2 className="h-4 w-4 text-reno-green" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Next milestone */}
            <div className="rounded-lg border-2 border-reno-purple/20 bg-reno-purple-light p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-reno-purple">
                <ClipboardCheck className="h-4 w-4" />
                Next Milestone
              </div>
              <p className="mt-2 text-sm font-medium text-gray-900">
                Rough-in Inspection — Feb 28
              </p>
            </div>
          </div>
        )}

        {activeTab === 'reports' && (
          <div className="space-y-4">
            {/* Latest report */}
            <div className="rounded-lg border-2 border-gray-200 bg-white p-4">
              <div className="mb-3 flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-900">Daily Report — Feb 27</h3>
                <Badge variant="secondary" className="bg-reno-green-light text-reno-green">
                  Latest
                </Badge>
              </div>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-reno-green" />
                  <div>
                    <p className="text-sm font-medium text-gray-900">
                      Crew on site: 4 workers
                    </p>
                    <p className="text-xs text-gray-500">8:02 AM - 3:45 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-reno-green" />
                  <p className="text-sm text-gray-700">
                    Tasks completed: Framing inspection passed
                  </p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-reno-green" />
                  <p className="text-sm text-gray-700">Photos uploaded: 12 new</p>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-reno-green" />
                  <p className="text-sm text-gray-700">
                    Materials delivered: Romex 14/2 wire, PEX pipe
                  </p>
                </div>
              </div>
            </div>

            {/* Previous report (collapsed) */}
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-gray-700">Daily Report — Feb 26</h3>
                <Button variant="ghost" size="sm" className="h-8 text-xs">
                  View
                </Button>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Electrical rough-in started, 3 workers on site
              </p>
            </div>
          </div>
        )}

        {activeTab === 'progress' && (
          <div className="space-y-6">
            {/* Milestone list */}
            <div className="space-y-3">
              {milestones.map((milestone, idx) => (
                <div
                  key={idx}
                  className={cn(
                    'rounded-lg border p-4',
                    milestone.status === 'complete'
                      ? 'border-reno-green/30 bg-reno-green-light'
                      : milestone.status === 'in-progress'
                        ? 'border-reno-teal/30 bg-reno-teal-light'
                        : 'border-gray-200 bg-gray-50'
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        {milestone.status === 'complete' && (
                          <CheckCircle2 className="h-5 w-5 text-reno-green" />
                        )}
                        {milestone.status === 'in-progress' && (
                          <Circle className="h-5 w-5 animate-pulse text-reno-teal" />
                        )}
                        {milestone.status === 'locked' && (
                          <Lock className="h-5 w-5 text-gray-400" />
                        )}
                        <h3 className="text-sm font-semibold text-gray-900">
                          {idx + 1}. {milestone.name}
                        </h3>
                      </div>
                      <div className="mt-2 flex items-center gap-3">
                        <div className="text-xs font-medium text-gray-600">
                          {milestone.progress}%
                        </div>
                        <div className="flex-1">
                          <div className="h-1.5 overflow-hidden rounded-full bg-gray-200">
                            <div
                              className={cn(
                                'h-full rounded-full transition-all',
                                milestone.status === 'complete'
                                  ? 'bg-reno-green'
                                  : milestone.status === 'in-progress'
                                    ? 'bg-reno-teal'
                                    : 'bg-gray-300'
                              )}
                              style={{ width: `${milestone.progress}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-gray-900">
                        ${milestone.amount.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {milestone.status === 'complete'
                          ? 'Released'
                          : milestone.status === 'in-progress'
                            ? 'In Progress'
                            : 'Locked'}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Budget summary */}
            <div className="rounded-lg border-2 border-gray-300 bg-white p-4">
              <h3 className="mb-3 text-sm font-bold text-gray-900">Budget Summary</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-gray-900">$42,000</div>
                  <div className="text-xs text-gray-500">Total</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-reno-green">$11,700</div>
                  <div className="text-xs text-gray-500">Released</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-reno-teal">$12,400</div>
                  <div className="text-xs text-gray-500">In Progress</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'alerts' && (
          <div className="space-y-3">
            {alerts.map((alert, idx) => (
              <div
                key={idx}
                className={cn('flex items-start gap-3 rounded-lg border p-4', alert.bg)}
              >
                <alert.icon className={cn('mt-0.5 h-5 w-5 shrink-0', alert.color)} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{alert.message}</p>
                  <p className="mt-1 text-xs text-gray-500">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
