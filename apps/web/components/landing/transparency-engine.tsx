import {
  Eye,
  CheckCircle,
  Clock,
  Users,
  DollarSign,
  Shield,
  ClipboardList,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { StripePanel } from './_animations/stripe-panel';
import { StripeLineMini } from './_animations/stripe-line-mini';
import { CountUp } from './_animations/count-up';
import { AnimatedProgress } from './_animations/animated-progress';
import { ScrollReveal } from './_animations/scroll-reveal';

const features = [
  { icon: Users, text: "Who's on site right now — GPS-verified clock-ins" },
  { icon: ClipboardList, text: "What's been completed — photo proof at every step" },
  { icon: DollarSign, text: "What's been paid — milestone-by-milestone breakdown" },
  { icon: Clock, text: "What's pending — tasks, inspections, deliveries" },
  { icon: Shield, text: "What's verified — WSIB, WHMIS, permits, all current" },
];

export function TransparencyEngine() {
  return (
    <section className="relative overflow-hidden border-y border-gray-100 bg-slate-50 py-24 md:py-32">
      {/* background scaffold */}
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
              <Eye className="h-4 w-4" />
              Total Transparency
            </Badge>

            <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
              Total Visibility.{' '}
              <span className="bg-gradient-to-r from-blue-600 to-violet-600 text-gradient">
                Zero Surprises.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
              Directories show you who to hire. We show you everything — before, during, and after.
            </p>
          </div>

          {/* Split Layout */}
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: Feature List (carded) */}
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

            {/* Right: Mock Live Dashboard */}
            <ScrollReveal delay={0.1}>
              <StripePanel>

                {/* Browser Chrome */}
                <div className="relative border-b border-gray-200 bg-white px-5 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-400" />
                    <span className="h-3 w-3 rounded-full bg-amber-400" />
                    <span className="h-3 w-3 rounded-full bg-green-400" />
                    <span className="ml-4 text-xs font-medium text-gray-400">
                      renonext.com/dashboard
                    </span>
                  </div>
                </div>

                {/* Dashboard Header */}
                <div className="relative border-b border-gray-100 bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-slate-400">LIVE DASHBOARD</p>
                      <p className="text-sm font-bold text-white">7 Cedar Court, Vaughan</p>
                    </div>
                    <Badge className="rounded-full border-transparent bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
                      <span className="relative mr-1.5 flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                      </span>
                      Live
                    </Badge>
                  </div>
                </div>

                {/* Spend Tracker chart */}
                <div className="border-b border-gray-100 px-6 py-3">
                  <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                    Spend Tracker
                  </p>
                  <StripeLineMini
                    points="0,65 45,60 90,52 135,48 180,35 225,28 270,22 320,18"
                    strokeClass="stroke-emerald-500"
                    fillClass="fill-emerald-500/10"
                  />
                </div>

                {/* Body (softer) */}
                <div className="bg-gradient-to-b from-gray-50 to-white p-4">
                  {/* Active Job */}
                  <div className="mb-3 rounded-xl border border-emerald-200 bg-white p-3 shadow-sm">
                    <div className="mb-2 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                        </span>
                        <span className="text-xs font-bold text-emerald-700">ACTIVE</span>
                      </div>
                      <span className="text-[10px] text-gray-400">Now</span>
                    </div>

                    <p className="text-sm font-semibold text-gray-900">
                      Kitchen renovation — Milestone 3
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                      <img
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&fit=crop&crop=face"
                        alt="Marco R."
                        loading="lazy"
                        className="h-5 w-5 rounded-full object-cover"
                      />
                      <span className="text-xs text-gray-500">Marco R. — Red Seal Carpenter</span>
                    </div>

                    {/* Task progress */}
                    <div className="mt-2">
                      <div className="flex items-center justify-between text-[10px] text-gray-500">
                        <span>Tasks: 2 of 4</span>
                        <CountUp target={50} suffix="%" className="text-[10px] text-gray-500" />
                      </div>
                      <div className="mt-1">
                        <AnimatedProgress value={50} barClass="bg-emerald-500" />
                      </div>
                    </div>
                  </div>

                  {/* Milestone payments (ledger style) */}
                  <div className="mb-3 overflow-hidden rounded-xl border border-gray-200 bg-white">
                    <div className="flex items-center justify-between px-3 py-2.5">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                        Milestone Payments
                      </p>
                      <span className="rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-[10px] font-semibold text-gray-600">
                        CAD
                      </span>
                    </div>

                    <div className="divide-y divide-gray-100">
                      {[
                        { name: 'Demo', amount: '$2,400', status: 'paid' as const },
                        { name: 'Framing', amount: '$3,800', status: 'paid' as const },
                        { name: 'Electrical rough-in', amount: '$2,200', status: 'current' as const },
                      ].map((m) => (
                        <div
                          key={m.name}
                          className={[
                            'flex items-center justify-between px-3 py-2 text-xs',
                            m.status === 'paid' ? 'bg-emerald-50/40' : 'bg-amber-50/40',
                          ].join(' ')}
                        >
                          <div className="flex items-center gap-2">
                            {m.status === 'paid' ? (
                              <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                            ) : (
                              <Clock className="h-3.5 w-3.5 text-amber-500" />
                            )}

                            <span className="font-medium text-gray-800">{m.name}</span>

                            {m.status === 'current' && (
                              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                                Current
                              </span>
                            )}

                            {m.status === 'paid' && (
                              <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                                Paid
                              </span>
                            )}
                          </div>

                          <span
                            className={
                              m.status === 'paid'
                                ? 'font-semibold text-emerald-700'
                                : 'font-semibold text-amber-700'
                            }
                          >
                            {m.amount}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* footer */}
                    <div className="flex items-center justify-between bg-gray-50 px-3 py-2.5 text-[11px]">
                      <span className="font-semibold text-gray-600">Released</span>
                      <CountUp target={6200} prefix="$" className="font-bold text-gray-900" />
                    </div>
                  </div>

                  {/* Cert badges */}
                  <div className="rounded-xl border border-gray-200 bg-white p-3">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Verified Certs
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {['WSIB', 'WHMIS', 'P.Eng', 'Heights', 'First Aid'].map((cert) => (
                        <Badge
                          key={cert}
                          className="rounded-full border-transparent bg-blue-50 px-2 py-0.5 text-[9px] font-medium text-blue-700"
                        >
                          <CheckCircle className="mr-0.5 h-2.5 w-2.5" />
                          {cert}
                        </Badge>
                      ))}
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
