import { CheckCircle } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { HowItWorksFlow } from './how-it-works-flow';

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden border-y border-gray-100 bg-white py-24 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/60 via-white to-white" />
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute -right-24 bottom-24 h-72 w-72 rounded-full bg-emerald-500/5 blur-3xl" />
        <div className="absolute inset-0 bg-dots opacity-[0.14]" />
        <div className="absolute inset-0 bg-grid opacity-[0.14] [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_100%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          {/* Header */}
          <div className="mb-14 text-center">
            <Badge
              variant="secondary"
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-sm font-medium text-gray-700"
            >
              How It Actually Works
            </Badge>

            <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
              Simple. Transparent.{' '}
              <span className="bg-gradient-to-r from-blue-600 to-emerald-500 text-gradient">
                You Stay in Control.
              </span>
            </h2>

            <p className="mx-auto mt-4 max-w-lg text-lg text-gray-500">
              From posting a job to paying your pro — every step is verified, tracked, and protected.
            </p>
          </div>

          {/* Interactive step flow */}
          <HowItWorksFlow />

          {/* Bottom — pricing conclusion */}
          <div className="mt-14 rounded-2xl border-2 border-emerald-200 bg-emerald-50 px-8 py-6 text-center">
            <div className="flex items-center justify-center gap-2">
              <CheckCircle className="h-5 w-5 text-emerald-600" />
              <p className="text-sm font-bold text-emerald-800">
                Free for homeowners. No hidden fees.
              </p>
            </div>
            <p className="mt-1.5 text-xs text-emerald-600">
              Pros pay a small platform fee only when they get paid. You pay $0 to post, match, or use escrow.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
