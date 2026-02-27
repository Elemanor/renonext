import {
  HardHat,
  CalendarDays,
  Camera,
  Bell,
  BarChart3,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollReveal } from './_animations/scroll-reveal';
import { CommandCenterDashboard } from './_animations/command-center-dashboard';

const features = [
  { icon: CalendarDays, text: "Weekly schedule with disruption alerts — know when to expect noise, parking, or odor" },
  { icon: Camera, text: "Daily photo reports — see what was done, by how many workers, with full weather logs" },
  { icon: BarChart3, text: "Stage-by-stage progress — milestones, inspections, and gate requirements at a glance" },
  { icon: Bell, text: "Proactive notifications — action items, decisions needed, and payment confirmations" },
  { icon: HardHat, text: "Schedule confidence score — based on permits, inspections, and material readiness" },
];

export function CommandCenter() {
  return (
    <section className="relative overflow-hidden border-y border-gray-100 bg-slate-50 py-24 md:py-32">
      {/* Background scaffold — matches transparency-engine */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/70 via-slate-50 to-slate-50" />
        <div className="absolute inset-0 bg-grid opacity-[0.12] [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_100%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <Badge
              variant="secondary"
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700"
            >
              <HardHat className="h-4 w-4" />
              Project Command Center
            </Badge>

            <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
              Your Project.{' '}
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 text-gradient">
                Complete Visibility.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
              Clients get schedule updates, daily photo reports, and disruption alerts — without calling your crew.
            </p>
          </div>

          {/* Split Layout */}
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: Feature List */}
            <div className="grid gap-3">
              {features.map((feature, i) => (
                <ScrollReveal key={feature.text} delay={i * 0.08}>
                  <div className="flex items-start gap-4 rounded-2xl border border-gray-200/60 bg-white/70 p-4 shadow-sm backdrop-blur">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100">
                      <feature.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <span className="pt-1 text-sm leading-relaxed text-gray-700">
                      {feature.text}
                    </span>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Right: Mini Dashboard */}
            <ScrollReveal delay={0.1}>
              <CommandCenterDashboard />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
