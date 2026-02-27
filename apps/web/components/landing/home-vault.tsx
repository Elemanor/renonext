import {
  Eye,
  Shield,
  Layers,
  Download,
  CheckCircle,
  Star,
  FileSearch,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { StripePanel } from './_animations/stripe-panel';
import { StripeLineMini } from './_animations/stripe-line-mini';
import { CountUp } from './_animations/count-up';
import { ScrollReveal } from './_animations/scroll-reveal';

const vaultFeatures = [
  {
    icon: Eye,
    title: 'Complete Job History',
    description:
      'Every pipe replaced, every wire fixed, every permit filed — a permanent digital record.',
  },
  {
    icon: Download,
    title: 'Downloadable Reports',
    description:
      'Export a full report for insurance, resale, or your own records. Like pulling a VIN report.',
  },
  {
    icon: Shield,
    title: 'Engineer & QS Stamps',
    description:
      'P.Eng stamps and QS verifications attached to every major job — proof that matters.',
  },
  {
    icon: Layers,
    title: 'Material Records',
    description:
      'Every material ordered, delivered, and installed — with receipts and specs attached.',
  },
];

export function HomeVault() {
  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32">
      {/* background scaffold */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/60 via-white to-white" />
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute -right-24 bottom-24 h-72 w-72 rounded-full bg-violet-500/5 blur-3xl" />
        <div className="absolute inset-0 bg-grid opacity-[0.12] [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_100%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Content */}
            <div>
              <Badge
                variant="secondary"
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-gray-50 px-4 py-1.5 text-sm font-medium text-gray-700"
              >
                <FileSearch className="h-4 w-4 text-blue-600" />
                Your Secret Weapon
              </Badge>

              <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
                The Home Vault.{' '}
                <span className="bg-gradient-to-r from-blue-600 to-violet-600 text-gradient">
                  Your Home&apos;s Verified Service Record.
                </span>
              </h2>

              <p className="mt-6 text-lg leading-relaxed text-gray-600">
                Every pipe replaced. Every wire fixed. Every certification verified.
                A permanent digital record of every job done on your property — with
                engineer stamps and photos to prove it.
              </p>

              {/* Feature list (carded like TransparencyEngine) */}
              <div className="mt-8 grid gap-3">
                {vaultFeatures.map((feature, i) => (
                  <ScrollReveal key={feature.title} delay={i * 0.08}>
                    <div
                      className={[
                        'group flex gap-4 rounded-2xl border border-gray-200/60 bg-white/70 p-4 shadow-sm backdrop-blur transition-all',
                        'hover:-translate-y-0.5 hover:shadow-md hover:ring-2 hover:ring-gray-900/5',
                        'motion-reduce:hover:translate-y-0',
                      ].join(' ')}
                    >
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100 ring-1 ring-blue-200/40">
                        <feature.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                        <p className="mt-0.5 text-sm leading-relaxed text-gray-500">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>

              {/* AR Teaser */}
              <div className="mt-8 rounded-2xl border border-violet-200/70 bg-violet-50 px-5 py-3">
                <p className="text-sm text-violet-700">
                  <span className="font-semibold">Coming soon:</span> AR walkthroughs.
                  Built on Apple ARKit + LiDAR.
                </p>
              </div>
            </div>

            {/* Right: Mock Home Vault Dashboard */}
            <ScrollReveal delay={0.1}>
              <StripePanel>

                {/* Browser Chrome */}
                <div className="relative border-b border-gray-200 bg-white px-5 py-3">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-red-400" />
                    <span className="h-3 w-3 rounded-full bg-amber-400" />
                    <span className="h-3 w-3 rounded-full bg-green-400" />
                    <span className="ml-4 text-xs font-medium text-gray-400">
                      renonext.com/home-vault
                    </span>

                    {/* subtle action */}
                    <span className="ml-auto inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-white px-2.5 py-0.5 text-[10px] font-semibold text-gray-600 shadow-sm">
                      <Download className="h-3 w-3" />
                      Download report
                    </span>
                  </div>
                </div>

                {/* Dashboard Header */}
                <div className="relative border-b border-gray-100 bg-gradient-to-r from-slate-800 to-slate-900 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-xs font-medium text-slate-400">HOME VAULT</p>
                      <p className="text-sm font-bold text-white">155 Oak Park Ave, Toronto</p>
                    </div>
                    <Badge className="rounded-full border-transparent bg-emerald-500/20 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
                      All Clear
                    </Badge>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-4 gap-px border-b border-gray-100 bg-gray-100">
                  {[
                    { label: 'Total Jobs', value: 8, dur: 1000 },
                    { label: 'Certifications', value: 6, dur: 1200 },
                    { label: 'Photos', value: 32, dur: 1400 },
                    { label: 'Reports', value: 8, dur: 1600 },
                  ].map((stat) => (
                    <div key={stat.label} className="bg-white px-4 py-3 text-center">
                      <CountUp target={stat.value} duration={stat.dur} className="text-lg font-bold text-gray-900" />
                      <p className="text-[10px] text-gray-500">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* Completed Jobs */}
                <div className="bg-gradient-to-b from-gray-50 to-white p-4">
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
                    Job History
                  </p>

                  {/* Annual Activity chart */}
                  <div className="mb-3">
                    <p className="mb-1 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Annual Activity
                    </p>
                    <StripeLineMini
                      points="0,70 40,65 80,58 120,50 160,45 200,38 240,30 280,22 320,15"
                      strokeClass="stroke-blue-500"
                      fillClass="fill-blue-500/10"
                    />
                  </div>

                  {/* Completed Job 1 */}
                  <div className="mb-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
                    <div className="mb-1 flex items-center justify-between">
                      <Badge className="rounded-full border-transparent bg-emerald-50 px-2 py-0 text-[9px] font-semibold text-emerald-600">
                        Completed &amp; Stamped
                      </Badge>
                      <span className="text-[10px] text-gray-400">3 days ago</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      HVAC system replacement
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <img
                        src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&fit=crop&crop=face"
                        alt="James T."
                        loading="lazy"
                        className="h-5 w-5 rounded-full object-cover"
                      />
                      <span className="text-xs text-gray-500">James T. — TSSA Certified</span>
                      <div className="ml-auto flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className="h-2.5 w-2.5 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Completed Job 2 */}
                  <div className="mb-3 rounded-xl border border-gray-200 bg-white p-3 shadow-sm">
                    <div className="mb-1 flex items-center justify-between">
                      <Badge className="rounded-full border-transparent bg-emerald-50 px-2 py-0 text-[9px] font-semibold text-emerald-600">
                        Completed &amp; Stamped
                      </Badge>
                      <span className="text-[10px] text-gray-400">2 weeks ago</span>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      Deck rebuild & waterproofing
                    </p>
                    <div className="mt-2 flex items-center gap-2">
                      <img
                        src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&fit=crop&crop=face"
                        alt="Priya S."
                        loading="lazy"
                        className="h-5 w-5 rounded-full object-cover"
                      />
                      <span className="text-xs text-gray-500">Priya S. — P.Eng Verified</span>
                      <div className="ml-auto flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className="h-2.5 w-2.5 fill-amber-400 text-amber-400"
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Certifications Bar */}
                  <div className="rounded-xl border border-gray-200 bg-white p-3">
                    <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                      Pro Certifications on File
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {['TSSA', 'ESA', 'P.Eng', 'WSIB', 'Heights', 'First Aid'].map(
                        (cert) => (
                          <Badge
                            key={cert}
                            className="rounded-full border-transparent bg-blue-50 px-2 py-0.5 text-[9px] font-medium text-blue-700"
                          >
                            <CheckCircle className="mr-0.5 h-2.5 w-2.5" />
                            {cert}
                          </Badge>
                        )
                      )}
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
