import {
  Home,
  Users,
  CalendarDays,
  ClipboardCheck,
  Camera,
  MessageCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollReveal } from './_animations/scroll-reveal';
import { HomeownerDashboardPreview } from './_animations/homeowner-dashboard-preview';

const features = [
  { icon: Users, text: "See who's at your home right now — names, trades, check-in times" },
  { icon: CalendarDays, text: "Week-ahead view with disruption warnings in plain language" },
  { icon: ClipboardCheck, text: "Inspection tracking with prerequisites and 'be home' alerts" },
  { icon: Camera, text: "Daily photo updates and milestone progress at a glance" },
  { icon: MessageCircle, text: "Decisions that need your input, highlighted and action-ready" },
];

export function HomeownerPreview() {
  return (
    <section className="relative overflow-hidden border-y border-gray-100 bg-white py-24 md:py-32">
      {/* Background scaffold */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray-200/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/70 via-white to-white" />
        <div className="absolute inset-0 bg-grid opacity-[0.08] [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_100%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mx-auto mb-14 max-w-3xl text-center">
            <Badge
              variant="secondary"
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-amber-50 px-4 py-1.5 text-sm font-medium text-amber-700"
            >
              <Home className="h-4 w-4" />
              Homeowner Dashboard
            </Badge>

            <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
              Your Home.{' '}
              <span className="bg-gradient-to-r from-amber-500 to-teal-500 text-gradient">
                Complete Peace of Mind.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
              Know exactly what&apos;s happening at your property — who&apos;s there, what&apos;s next,
              and when you need to act. No construction jargon, just clarity.
            </p>
          </div>

          {/* Split Layout */}
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: Feature List */}
            <div className="grid gap-3">
              {features.map((feature, i) => (
                <ScrollReveal key={feature.text} delay={i * 0.08}>
                  <div className="flex items-start gap-4 rounded-2xl border border-gray-200/60 bg-gray-50/50 p-4 shadow-sm backdrop-blur">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100">
                      <feature.icon className="h-5 w-5 text-amber-600" />
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
              <HomeownerDashboardPreview />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
