import {
  HardHat,
  Search,
  Star,
  Shield,
  Clock,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { ScrollReveal } from './_animations/scroll-reveal';
import { ContractorProfilePreview } from './_animations/contractor-profile-preview';

const features = [
  { icon: Search, text: "Search by trade, location, and availability — find the right pro in seconds" },
  { icon: Star, text: "Verified ratings and reviews from real homeowners, never fake or inflated" },
  { icon: Shield, text: "Every pro is background-checked, insured, and credential-verified" },
  { icon: Clock, text: "See response times, availability, and next open slot before you reach out" },
  { icon: HardHat, text: "Browse full portfolios with photos, project details, and cost breakdowns" },
];

export function ContractorShowcase() {
  return (
    <section className="relative overflow-hidden border-y border-gray-100 bg-slate-50 py-24 md:py-32">
      {/* Background scaffold */}
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
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-medium text-emerald-700"
            >
              <HardHat className="h-4 w-4" />
              Contractor Directory
            </Badge>

            <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
              Find Your Perfect Pro.{' '}
              <span className="bg-gradient-to-r from-emerald-600 to-violet-600 text-gradient">
                Verified &amp; Ready.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-600">
              Browse detailed contractor profiles with verified credentials, real reviews,
              and portfolio photos. Know exactly who you&apos;re hiring before they arrive.
            </p>
          </div>

          {/* Split Layout */}
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left: Feature List */}
            <div className="grid gap-3">
              {features.map((feature, i) => (
                <ScrollReveal key={feature.text} delay={i * 0.08}>
                  <div className="flex items-start gap-4 rounded-2xl border border-gray-200/60 bg-white/70 p-4 shadow-sm backdrop-blur">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-100">
                      <feature.icon className="h-5 w-5 text-emerald-600" />
                    </div>
                    <span className="pt-1 text-sm leading-relaxed text-gray-700">
                      {feature.text}
                    </span>
                  </div>
                </ScrollReveal>
              ))}
            </div>

            {/* Right: Mini Profile Dashboard */}
            <ScrollReveal delay={0.1}>
              <ContractorProfilePreview />
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
