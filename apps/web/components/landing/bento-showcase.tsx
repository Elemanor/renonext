import { Badge } from '@/components/ui/badge';
import { Layers } from 'lucide-react';
import { HeroBento } from './_animations/hero-bento';

export function BentoShowcase() {
  return (
    <section
      id="capabilities"
      className="relative overflow-hidden border-b border-gray-100 bg-slate-50 py-20 md:py-28"
    >
      {/* Background scaffold */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-slate-50 to-slate-50" />
        <div className="absolute inset-0 bg-grid opacity-[0.10] [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_100%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto mb-12 max-w-3xl text-center">
          <Badge
            variant="secondary"
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700"
          >
            <Layers className="h-4 w-4" />
            Everything You Need
          </Badge>

          <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
            One Platform.{' '}
            <span className="bg-gradient-to-r from-blue-600 to-violet-600 text-gradient">
              Complete Control.
            </span>
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-gray-600">
            Post jobs, verify contractors, lock payments in escrow, track work
            in real time, and build a permanent home service record — all in
            one platform.
          </p>
        </div>

        {/* Interactive bento — client island */}
        <HeroBento />
      </div>
    </section>
  );
}
