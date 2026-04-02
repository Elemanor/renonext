import Link from 'next/link';
import {
  Zap,
  Navigation,
  CreditCard,
  Package,
  Wrench,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { StripePanel } from './_animations/stripe-panel';
import { CountUp } from './_animations/count-up';
import { AnimatedProgress } from './_animations/animated-progress';
import { ScrollReveal } from './_animations/scroll-reveal';

const checklist = [
  { icon: Zap, text: 'Pre-verified dispatch — pro arrives within 2 hours' },
  { icon: Navigation, text: 'GPS tracking from accept to arrival' },
  { icon: CreditCard, text: 'Fixed pricing — no bidding, no surprises' },
  { icon: Package, text: 'Materials delivered to site — $0 for pros' },
];

export function SpeedLayer() {
  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/60 via-white to-white" />
        <div className="absolute inset-0 bg-grid opacity-[0.14] [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_100%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: Content */}
            <div>
              <Badge
                variant="secondary"
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-200 bg-primary-50 px-4 py-1.5 text-sm font-medium text-primary-700"
              >
                <Zap className="h-4 w-4" />
                Instant Dispatch
              </Badge>

              <h2 className="text-3xl font-bold tracking-tight text-slate-900 md:text-4xl lg:text-5xl">
                Safety Usually Means Slow.{' '}
                <span className="bg-gradient-to-r from-primary-600 to-primary-500 text-gradient">
                  Not Here.
                </span>
              </h2>

              <p className="mt-6 text-lg leading-relaxed text-slate-600">
                Every pro in our network is already verified, insured, and background-checked.
                That means when you book, we don&apos;t screen — we dispatch. On-demand booking,
                but for your home.
              </p>

              <div className="mt-8 grid gap-3">
                {checklist.map((item, i) => (
                  <ScrollReveal key={item.text} delay={i * 0.08}>
                    <div className="flex items-center gap-3 rounded-xl border border-slate-100 bg-white/70 p-3 shadow-sm transition motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-md">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                        <item.icon className="h-4 w-4" />
                      </div>
                      <span className="text-sm text-slate-700">{item.text}</span>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Button
                  asChild
                  className="rounded-full bg-gradient-to-r from-primary-600 to-primary-500 px-8 py-3 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl hover:brightness-110"
                >
                  <Link href="/book-service">
                    Book a Tasker Now
                    <ArrowRight className="h-5 w-5" />
                  </Link>
                </Button>

                <Link
                  href="#how-it-works"
                  className="text-sm font-semibold text-slate-600 underline-offset-4 hover:text-slate-900 hover:underline"
                >
                  See how it works
                </Link>
              </div>
            </div>

            {/* Right: Mock Booking UI */}
            <ScrollReveal delay={0.1}>
              <StripePanel>
                <div className="relative border-b border-slate-100 bg-gradient-to-r from-primary-600 to-primary-500 px-6 py-4">
                  <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/20" />
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-white">Book a Service</span>
                    <Badge className="rounded-full border-transparent bg-white/20 px-2.5 py-0.5 text-[10px] font-bold text-white">
                      Instant
                    </Badge>
                  </div>
                </div>

                <div className="bg-white p-5">
                  {/* Service selection */}
                  <div className="mb-4 grid grid-cols-4 gap-2">
                    {[
                      { icon: Wrench, label: 'Plumbing', active: true },
                      { icon: Zap, label: 'Electrical', active: false },
                      { icon: Package, label: 'Drywall', active: false },
                      { icon: Sparkles, label: 'Painting', active: false },
                    ].map((svc) => (
                      <button
                        key={svc.label}
                        type="button"
                        aria-pressed={svc.active}
                        className={[
                          'flex flex-col items-center gap-1 rounded-xl border p-3 text-center transition-all',
                          'cursor-pointer select-none active:scale-[0.99]',
                          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-500/40',
                          svc.active
                            ? 'border-primary-300 bg-primary-50 ring-2 ring-primary-200/50'
                            : 'border-slate-200 hover:border-primary-300 hover:bg-primary-50',
                        ].join(' ')}
                      >
                        <svc.icon className={`h-5 w-5 ${svc.active ? 'text-primary-600' : 'text-slate-600'}`} />
                        <span className={`text-[10px] font-medium ${svc.active ? 'text-primary-700' : 'text-slate-700'}`}>{svc.label}</span>
                      </button>
                    ))}
                  </div>

                  {/* Time picker */}
                  <div className="mb-4 rounded-xl border border-primary-200 bg-primary-50 p-3">
                    <p className="text-xs font-semibold text-primary-700">When do you need help?</p>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {['ASAP', 'Today 2PM', 'Tomorrow', 'Pick Date'].map((time, i) => (
                        <span
                          key={time}
                          className={`rounded-full px-3 py-1 text-[10px] font-medium ${
                            i === 0
                              ? 'bg-primary-600 text-white'
                              : 'border border-primary-200 bg-white text-primary-700'
                          }`}
                        >
                          {time}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Assigned Tasker */}
                  <div className="rounded-xl border border-reno-green-200 bg-reno-green-50 p-3">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <img
                          src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&fit=crop&crop=face"
                          alt="Alex W."
                          loading="lazy"
                          className="h-10 w-10 rounded-full object-cover"
                        />
                        <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3">
                          <span className="absolute inline-flex h-full w-full rounded-full bg-reno-green-400 opacity-75 motion-safe:animate-ping" />
                          <span className="relative inline-flex h-3 w-3 rounded-full border-2 border-white bg-reno-green-500" />
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-slate-900">Alex W. assigned</p>
                        <p className="text-xs text-slate-500">
                          4.9 stars — 8 min away — fully equipped
                        </p>
                      </div>
                      <CountUp target={45} prefix="$" suffix="/hr" className="text-lg font-bold text-reno-green-700" />
                    </div>
                    {/* Match confidence */}
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-[10px] text-slate-500">
                        <span>Match confidence</span>
                        <CountUp target={97} suffix="%" className="text-[10px] text-slate-500" />
                      </div>
                      <div className="mt-1">
                        <AnimatedProgress value={97} barClass="bg-reno-green-500" />
                      </div>
                    </div>
                  </div>
                </div>
              </StripePanel>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
