import { FileCheck, CalendarCheck, HardHat } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { HOVER_LIFT } from '@/lib/ui/motion';

const steps = [
  {
    icon: FileCheck,
    title: 'Accept & Confirm',
    description: 'Review the terms, accept the proposal, and we lock in your start date.',
    color: 'bg-primary',
  },
  {
    icon: CalendarCheck,
    title: 'Permits & Scheduling',
    description: 'Your contractor handles all permits and schedules the crew and inspections.',
    color: 'bg-violet-500',
  },
  {
    icon: HardHat,
    title: 'Work Begins',
    description: 'Get daily updates with photos. Payments release only as milestones are completed.',
    color: 'bg-emerald-500',
  },
];

export function WhatHappensNext() {
  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-foreground">What Happens Next</h2>
      <div className="grid gap-3 sm:grid-cols-3">
        {steps.map((step, i) => (
          <Card key={step.title} className={HOVER_LIFT}>
            <CardContent className="p-4">
              <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${step.color} shadow-sm`}>
                <step.icon className="h-5 w-5 text-white" />
              </div>
              <div className="mb-1 flex items-center gap-2">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-muted text-[10px] font-bold text-muted-foreground">
                  {i + 1}
                </span>
                <h3 className="text-sm font-bold text-foreground">{step.title}</h3>
              </div>
              <p className="text-xs leading-relaxed text-muted-foreground">{step.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
