import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { serviceLanes } from './_data';

export function PathSelection() {
  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/60 via-white to-white" />
        <div className="absolute inset-0 bg-grid opacity-[0.14] [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_100%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
            What Brings You Here?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-gray-500">
            We already built a system for your exact situation.
          </p>
        </div>

        {/* 3-Lane Cards */}
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
          {serviceLanes.map((lane) => (
            <Link key={lane.title} href={lane.href} aria-label={`Go to ${lane.title}`} className="group block rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white">
              <Card
                className={[
                  'relative h-full overflow-hidden rounded-2xl border-2 bg-white p-0 shadow-sm transition-all duration-300',
                  'group-hover:-translate-y-1 group-hover:shadow-xl group-hover:border-gray-300',
                  'ring-1 ring-transparent group-hover:ring-gray-900/5',
                  'motion-reduce:transform-none',
                  lane.borderColor,
                ].join(' ')}
              >
                {/* Featured badge */}
                {lane.featured && (
                  <span className="absolute right-4 top-4 z-10 rounded-full bg-gray-900/90 px-2.5 py-1 text-[10px] font-bold text-white backdrop-blur">
                    Most popular
                  </span>
                )}

                {/* Card Header Image */}
                <div className="relative h-40 w-full overflow-hidden">
                  <img
                    src={lane.image}
                    alt=""
                    aria-hidden="true"
                    loading="lazy"
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent" />
                </div>

                {/* Gradient Top Bar */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${lane.color}`} />

                <div className="p-6 pb-5">
                  {/* Icon + Title */}
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className={`flex h-12 w-12 items-center justify-center rounded-xl ${lane.bgColor}`}
                    >
                      <lane.icon className={`h-6 w-6 ${lane.textColor}`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">{lane.title}</h3>
                      <p className="text-sm text-gray-500">{lane.subtitle}</p>
                    </div>
                  </div>

                  {/* Model Badge */}
                  <Badge
                    className={`mb-4 rounded-full border-transparent ${lane.bgColor} px-3 py-1 text-xs font-semibold ${lane.textColor}`}
                  >
                    {lane.model}
                  </Badge>

                  {/* Best For */}
                  <p className="mb-3 text-[11px] font-medium text-gray-400">
                    {lane.bestFor}
                  </p>

                  {/* Example Tags */}
                  <div className="mb-5 flex max-h-[52px] flex-wrap gap-1.5 overflow-hidden">
                    {lane.examples.map((ex) => (
                      <span
                        key={ex}
                        className="rounded-full border border-gray-200/70 bg-white px-2.5 py-0.5 text-[11px] font-medium text-gray-600"
                      >
                        {ex}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div
                    className={`flex items-center gap-2 text-sm font-semibold ${lane.textColor} transition-all duration-200 group-hover:gap-3`}
                  >
                    {lane.cta}
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
