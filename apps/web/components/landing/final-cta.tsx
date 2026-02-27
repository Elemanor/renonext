import Link from 'next/link';
import Image from 'next/image';
import {
  Wallet,
  Banknote,
  Receipt,
  BarChart3,
  ArrowRight,
  Sparkles,
  Shield,
  Clock,
  Award,
  CheckCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { GradientIcon } from './_shared/gradient-icon';

export function FinalCta() {
  return (
    <>
      {/* ===== Part A — Pro CTA ===== */}
      <section className="relative overflow-hidden bg-gray-50 py-24 md:py-32">
        {/* background scaffold */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/70 via-gray-50 to-gray-50" />
          <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-emerald-500/5 blur-3xl" />
          <div className="absolute -right-24 bottom-24 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />
          <div className="absolute inset-0 bg-grid opacity-[0.10] [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_100%)]" />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl">
            {/* subtle inner ring/highlight */}
            <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />
            <div className="pointer-events-none absolute inset-0 bg-dots opacity-[0.10]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-white/10" />

            <div className="grid items-center lg:grid-cols-2">
              {/* Left Content */}
              <div className="relative p-10 md:p-16">
                <Badge
                  variant="secondary"
                  className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-sm font-medium text-white/80"
                >
                  <Wallet className="h-4 w-4" />
                  The RenoNext Wallet
                </Badge>

                <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
                  Your Business.{' '}
                  <span className="bg-gradient-to-r from-emerald-400 to-blue-400 text-gradient">
                    Your Wallet. Your Rules.
                  </span>
                </h2>

                <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-300">
                  Stop chasing invoices. The RenoNext Wallet is your financial command center —
                  instant cash-outs, automated bookkeeping, expense tracking, and payroll.
                </p>

                <div className="mt-8 space-y-5">
                  <div className="flex items-start gap-3">
                    <GradientIcon icon={Banknote} gradient="from-emerald-400 to-emerald-600" size="sm" />
                    <div>
                      <span className="font-semibold text-white">Instant Cash-Out</span>
                      <p className="text-sm text-slate-400">
                        Milestone approved? Money in your account within 24 hours.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <GradientIcon icon={Receipt} gradient="from-blue-400 to-blue-600" size="sm" />
                    <div>
                      <span className="font-semibold text-white">Snap &amp; Submit Expenses</span>
                      <p className="text-sm text-slate-400">
                        Photograph a receipt. OCR reads it. Auto-categorized, auto-deducted.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <GradientIcon icon={BarChart3} gradient="from-violet-400 to-violet-600" size="sm" />
                    <div>
                      <span className="font-semibold text-white">Automated Bookkeeping</span>
                      <p className="text-sm text-slate-400">
                        Real-time P&amp;L, payroll calculator, and one-click CSV export.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                  <Button
                    asChild
                    className="rounded-full bg-white px-8 py-3.5 text-base font-semibold text-slate-900 shadow-lg transition-all duration-200 hover:bg-gray-100 hover:shadow-xl"
                  >
                    <Link href="/signup">
                      Join as a Pro
                      <ArrowRight className="h-5 w-5" aria-hidden="true" />
                    </Link>
                  </Button>

                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full border-2 border-white/20 bg-transparent px-8 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:border-white/30 hover:bg-white/10"
                  >
                    <Link href="/how-it-works-pros">Learn More</Link>
                  </Button>
                </div>
              </div>

              {/* Right Image */}
              <div className="relative hidden lg:block">
                <Image
                  src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&fit=crop"
                  alt="Professional at work"
                  width={800}
                  height={600}
                  quality={80}
                  sizes="40vw"
                  className="h-full min-h-[520px] w-full object-cover"
                />
                {/* stronger vignette for readability + polish */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-900/30 via-transparent to-transparent" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Bridge divider */}
      <div className="pointer-events-none relative -mt-1 h-px w-full overflow-hidden bg-gradient-to-r from-transparent via-slate-200/80 to-transparent" />

      {/* ===== Part B — Homeowner CTA ===== */}
      <section className="relative overflow-hidden bg-white py-24 md:py-32">
        {/* background scaffold */}
        <div aria-hidden className="pointer-events-none absolute inset-0 z-0">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/70 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-50/60 via-white to-white" />
          <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />
          <div className="absolute -right-24 bottom-24 h-72 w-72 rounded-full bg-violet-500/5 blur-3xl" />
          {/* Blueprint overlay */}
          <div className="absolute inset-0 bg-blueprint opacity-[0.04]" />
          {/* Subtle bg photo at very low opacity */}
          <Image
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&fit=crop"
            alt=""
            fill
            sizes="100vw"
            quality={80}
            className="object-cover opacity-[0.04]"
          />
        </div>

        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mx-auto mb-8">
              <GradientIcon
                icon={Sparkles}
                gradient="from-blue-500 to-violet-600"
                size="lg"
                glow
                className="mx-auto"
              />
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
              Snap a Photo. Get a Price. Pro Dispatched.
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-gray-500">
              Verified, insured pros are minutes away. Materials delivered to site.
              Real-time tracking from start to finish.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                className="shine rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-10 py-4 text-base font-semibold text-white shadow-lg shadow-blue-600/25 transition-all duration-200 hover:shadow-xl hover:shadow-blue-600/30 hover:brightness-110"
              >
                <Link href="/post-job">
                  Get Instant Estimate
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="rounded-full border-gray-200 bg-white px-10 py-4 text-base font-semibold text-gray-700 shadow-sm transition-all duration-200 hover:border-gray-300 hover:shadow-md"
              >
                <Link href="#how-it-works">See How It Works</Link>
              </Button>
            </div>

            {/* Mini trust signals */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-emerald-500" />
                <span>Verified Pros</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-500" />
                <span>Quick Response</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-amber-500" />
                <span>Quality Guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-violet-500" />
                <span>Secure Payments</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
