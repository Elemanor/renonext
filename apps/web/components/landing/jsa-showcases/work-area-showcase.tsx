'use client';

import { CheckCircle2, Circle, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const stages = [
  { name: 'Planning', status: 'complete' },
  { name: 'Layout', status: 'complete' },
  { name: 'Formwork', status: 'complete' },
  { name: 'Rebar', status: 'current' },
  { name: 'Waterstop', status: 'pending' },
  { name: 'Inspection', status: 'pending' },
  { name: 'Pour', status: 'pending' },
  { name: 'Curing', status: 'pending' },
  { name: 'Stripping', status: 'pending' },
] as const;

const infoCards = [
  { label: 'Workers Today', value: '6' },
  { label: 'Concrete Volume', value: '45m³' },
  { label: 'Open RFIs', value: '2' },
  { label: 'Photos', value: '23' },
];

const tasks = [
  {
    id: 1,
    title: 'Rebar placement — north wall',
    status: 'complete',
    time: '9:30 AM',
    assignee: null,
  },
  {
    id: 2,
    title: 'Rebar tying — south wall',
    status: 'in-progress',
    time: null,
    assignee: 'Jake W.',
  },
  {
    id: 3,
    title: 'Waterstop installation — east joint',
    status: 'pending',
    time: null,
    assignee: null,
  },
  {
    id: 4,
    title: 'Pre-pour inspection request',
    status: 'pending',
    time: null,
    assignee: null,
  },
] as const;

const photos = [
  { title: 'Rebar grid', time: '9:15 AM' },
  { title: 'North wall tie', time: '10:30 AM' },
  { title: 'Waterstop prep', time: '11:45 AM' },
  { title: 'South wall progress', time: '1:20 PM' },
];

export function WorkAreaShowcase() {
  return (
    <Card className="w-full border-2 shadow-lg">
      <CardHeader className="border-b bg-gradient-to-r from-reno-green-50 to-white">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-slate-900">
              Work Area: GEB — Foundation B2
            </CardTitle>
            <p className="mt-1 text-sm text-slate-500">
              GEBOOTH WasteWater Treatment Plant
            </p>
          </div>
          <Badge className="w-fit bg-reno-green-500 hover:bg-reno-green-600">
            Active
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 p-6">
        {/* Stage Progress Bar */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-slate-700">
            Stage Progress
          </h3>
          <div className="relative">
            {/* Desktop: Horizontal layout */}
            <div className="hidden md:flex items-center gap-1">
              {stages.map((stage, index) => (
                <div key={stage.name} className="flex flex-1 items-center">
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold',
                        stage.status === 'complete' &&
                          'bg-reno-green-500 text-white',
                        stage.status === 'current' &&
                          'bg-primary-500 text-white ring-4 ring-primary-100',
                        stage.status === 'pending' &&
                          'bg-slate-200 text-slate-500'
                      )}
                    >
                      {stage.status === 'complete' ? (
                        <CheckCircle2 className="h-4 w-4" />
                      ) : (
                        index + 1
                      )}
                    </div>
                    <span
                      className={cn(
                        'text-xs font-medium',
                        stage.status === 'current'
                          ? 'text-primary-700'
                          : 'text-slate-600'
                      )}
                    >
                      {stage.name}
                    </span>
                  </div>
                  {index < stages.length - 1 && (
                    <div
                      className={cn(
                        'mx-1 h-0.5 flex-1',
                        stage.status === 'complete'
                          ? 'bg-reno-green-500'
                          : 'bg-slate-200'
                      )}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Mobile: Vertical compact layout */}
            <div className="md:hidden space-y-2">
              {stages.map((stage, index) => (
                <div key={stage.name} className="flex items-center gap-3">
                  <div
                    className={cn(
                      'flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-semibold',
                      stage.status === 'complete' && 'bg-reno-green-500 text-white',
                      stage.status === 'current' &&
                        'bg-primary-500 text-white ring-2 ring-primary-100',
                      stage.status === 'pending' && 'bg-slate-200 text-slate-500'
                    )}
                  >
                    {stage.status === 'complete' ? (
                      <CheckCircle2 className="h-3 w-3" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span
                    className={cn(
                      'text-sm font-medium',
                      stage.status === 'current'
                        ? 'text-primary-700'
                        : 'text-slate-600'
                    )}
                  >
                    {stage.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {infoCards.map((card) => (
            <div
              key={card.label}
              className="rounded-lg border bg-slate-50 p-3 text-center"
            >
              <div className="text-2xl font-bold text-slate-900">
                {card.value}
              </div>
              <div className="mt-1 text-xs text-slate-600">{card.label}</div>
            </div>
          ))}
        </div>

        {/* Today's Tasks */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-slate-700">
            Today&apos;s Tasks
          </h3>
          <div className="space-y-2">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="flex items-start gap-3 rounded-lg border bg-white p-3 transition-all hover:border-slate-300 hover:shadow-sm"
              >
                <div className="mt-0.5">
                  {task.status === 'complete' && (
                    <CheckCircle2 className="h-5 w-5 text-reno-green-500" />
                  )}
                  {task.status === 'in-progress' && (
                    <Loader2 className="h-5 w-5 animate-spin text-primary-500" />
                  )}
                  {task.status === 'pending' && (
                    <Circle className="h-5 w-5 text-slate-300" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-slate-900">
                    {task.title}
                  </p>
                  <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                    {task.status === 'complete' && task.time && (
                      <span>Completed {task.time}</span>
                    )}
                    {task.status === 'in-progress' && (
                      <>
                        <span className="inline-flex items-center gap-1 rounded-full bg-primary-50 px-2 py-0.5 font-medium text-primary-700">
                          In Progress
                        </span>
                        {task.assignee && <span>({task.assignee})</span>}
                      </>
                    )}
                    {task.status === 'pending' && (
                      <span className="text-slate-400">Pending</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Photos */}
        <div>
          <h3 className="mb-3 text-sm font-semibold text-slate-700">
            Recent Photos
          </h3>
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            {photos.map((photo, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-lg border bg-gradient-to-br from-slate-100 to-slate-200 pb-[75%]"
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl opacity-30">📷</div>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-2 text-white">
                  <div className="text-xs font-medium">{photo.title}</div>
                  <div className="text-xs opacity-80">{photo.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
