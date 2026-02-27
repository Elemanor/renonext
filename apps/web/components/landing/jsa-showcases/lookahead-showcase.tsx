'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { CheckCircle2, Loader2, Clock, AlertCircle } from 'lucide-react';

type DayStatus = 'complete' | 'in-progress' | 'scheduled';
type Priority = 'normal' | 'critical';

const weeks = [
  {
    title: 'Week 1',
    dates: 'Feb 24-28',
    status: 'current',
    days: [
      {
        day: 'Mon',
        task: 'Rebar installation — B2',
        status: 'in-progress' as DayStatus,
        priority: 'normal' as Priority,
      },
      {
        day: 'Tue',
        task: 'Waterstop + pre-pour inspection',
        status: 'scheduled' as DayStatus,
        priority: 'normal' as Priority,
      },
      {
        day: 'Wed',
        task: 'Concrete pour — 45m³ — B2',
        status: 'scheduled' as DayStatus,
        priority: 'critical' as Priority,
        weather: 'sunny',
      },
      {
        day: 'Thu',
        task: 'Curing begins — B2 | Formwork starts — Slab A',
        status: 'scheduled' as DayStatus,
        priority: 'normal' as Priority,
      },
      {
        day: 'Fri',
        task: 'Curing day 2 — B2',
        status: 'scheduled' as DayStatus,
        priority: 'normal' as Priority,
      },
    ],
  },
  {
    title: 'Week 2',
    dates: 'Mar 3-7',
    status: 'upcoming',
    days: [
      {
        day: 'Mon',
        task: 'Strip forms — B2 | Rebar — Slab A',
        status: 'scheduled' as DayStatus,
        priority: 'normal' as Priority,
      },
      {
        day: 'Tue',
        task: 'Backfill — B2 | Rebar continues',
        status: 'scheduled' as DayStatus,
        priority: 'normal' as Priority,
      },
      {
        day: 'Wed',
        task: 'RPS walls formwork',
        status: 'scheduled' as DayStatus,
        priority: 'normal' as Priority,
      },
      {
        day: 'Thu',
        task: 'Waterstop — Slab A',
        status: 'scheduled' as DayStatus,
        priority: 'normal' as Priority,
      },
      {
        day: 'Fri',
        task: 'Pre-pour inspection — Slab A',
        status: 'scheduled' as DayStatus,
        priority: 'normal' as Priority,
      },
    ],
  },
  {
    title: 'Week 3',
    dates: 'Mar 10-14',
    status: 'upcoming',
    days: [
      {
        day: 'Mon',
        task: 'Concrete pour — Slab A',
        status: 'scheduled' as DayStatus,
        priority: 'critical' as Priority,
      },
      {
        day: 'Tue',
        task: 'RPS walls rebar',
        status: 'scheduled' as DayStatus,
        priority: 'normal' as Priority,
      },
      {
        day: 'Wed',
        task: 'Site grading begins',
        status: 'scheduled' as DayStatus,
        priority: 'normal' as Priority,
      },
      {
        day: 'Thu',
        task: 'Curing — Slab A',
        status: 'scheduled' as DayStatus,
        priority: 'normal' as Priority,
      },
      {
        day: 'Fri',
        task: 'Strip forms — Slab A',
        status: 'scheduled' as DayStatus,
        priority: 'normal' as Priority,
      },
    ],
  },
] as const;

export function LookaheadShowcase() {
  return (
    <Card className="w-full border-2 shadow-lg">
      <CardHeader className="border-b bg-gradient-to-r from-purple-50 to-white">
        <CardTitle className="text-lg font-bold text-gray-900">
          3-Week Lookahead
        </CardTitle>
        <p className="mt-1 text-sm text-gray-500">
          Rolling schedule visibility
        </p>
      </CardHeader>

      <CardContent className="p-4 sm:p-6">
        <div className="grid gap-4 lg:grid-cols-3">
          {weeks.map((week, weekIndex) => (
            <div
              key={weekIndex}
              className={cn(
                'rounded-lg border-2 bg-white transition-all',
                week.status === 'current'
                  ? 'border-blue-500 shadow-md'
                  : 'border-gray-200'
              )}
            >
              {/* Week Header */}
              <div
                className={cn(
                  'border-b p-3',
                  week.status === 'current'
                    ? 'bg-blue-50'
                    : 'bg-gray-50'
                )}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-bold text-gray-900">
                      {week.title}
                    </div>
                    <div className="text-xs text-gray-600">{week.dates}</div>
                  </div>
                  {week.status === 'current' && (
                    <Badge className="bg-blue-500 hover:bg-blue-600">
                      Current
                    </Badge>
                  )}
                </div>
              </div>

              {/* Days */}
              <div className="space-y-2 p-3">
                {week.days.map((day, dayIndex) => (
                  <div
                    key={dayIndex}
                    className={cn(
                      'rounded-md border p-2 transition-all hover:shadow-sm',
                      day.status === 'complete' &&
                        'border-green-200 bg-green-50',
                      day.status === 'in-progress' &&
                        'border-blue-200 bg-blue-50',
                      day.status === 'scheduled' && 'border-gray-200 bg-white',
                      day.priority === 'critical' &&
                        'border-red-300 bg-red-50'
                    )}
                  >
                    {/* Day and Status */}
                    <div className="mb-1.5 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-semibold text-gray-700">
                          {day.day}
                        </span>
                        {'weather' in day && day.weather === 'sunny' && (
                          <span className="text-sm" title="Good weather">
                            ☀️
                          </span>
                        )}
                      </div>
                      <div>
                        {day.status === 'complete' && (
                          <CheckCircle2 className="h-3.5 w-3.5 text-green-600" />
                        )}
                        {day.status === 'in-progress' && (
                          <Loader2 className="h-3.5 w-3.5 animate-spin text-blue-600" />
                        )}
                        {day.status === 'scheduled' &&
                          day.priority === 'critical' && (
                            <AlertCircle className="h-3.5 w-3.5 text-red-600" />
                          )}
                        {day.status === 'scheduled' &&
                          day.priority === 'normal' && (
                            <Clock className="h-3.5 w-3.5 text-gray-400" />
                          )}
                      </div>
                    </div>

                    {/* Task */}
                    <div
                      className={cn(
                        'text-xs leading-tight',
                        day.status === 'complete' && 'text-green-900',
                        day.status === 'in-progress' && 'text-blue-900',
                        day.status === 'scheduled' &&
                          day.priority === 'critical' &&
                          'font-semibold text-red-900',
                        day.status === 'scheduled' &&
                          day.priority === 'normal' &&
                          'text-gray-700'
                      )}
                    >
                      {day.task}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Color Legend */}
        <div className="mt-6 rounded-lg border bg-gray-50 p-3">
          <div className="mb-2 text-xs font-semibold text-gray-700">
            Color Coding:
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs sm:flex sm:flex-wrap sm:gap-4">
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded border border-green-200 bg-green-50" />
              <span className="text-gray-600">Complete</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded border border-blue-200 bg-blue-50" />
              <span className="text-gray-600">In Progress</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded border border-gray-200 bg-white" />
              <span className="text-gray-600">Scheduled</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="h-3 w-3 rounded border border-red-300 bg-red-50" />
              <span className="text-gray-600">Critical</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
