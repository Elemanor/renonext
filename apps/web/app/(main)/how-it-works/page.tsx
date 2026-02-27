import Link from 'next/link';
import {
  Shield,
  Camera,
  CheckCircle2,
  Award,
  Scale,
  FileText,
  MapPin,
  ClipboardCheck,
  Hammer,
  ImageIcon,
  FileCheck,
  AlertTriangle,
  Lock,
  TrendingUp,
  Users,
  QrCode,
  ArrowRight,
} from 'lucide-react';
import {
  WorkAreaShowcase,
  GanttShowcase,
  LookaheadShowcase,
} from '@/components/landing/jsa-showcases';

export const metadata = {
  title: 'How It Works | RenoNext',
  description:
    'Bank-held escrow, proof-based payouts, verified contractors, and professional dispute resolution. How RenoNext protects homeowners and pays contractors fairly.',
};

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen">
      {/* Section 1: The Vault */}
      <section id="vault" className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-reno-green-light px-4 py-2 text-sm font-semibold text-reno-green">
              <Shield className="h-4 w-4" />
              Bank-Held Escrow
            </div>
            <h1 className="font-display text-4xl font-bold tracking-tight text-reno-dark sm:text-5xl md:text-6xl">
              The Vault
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Every project starts with full payment held in a bank-controlled
              escrow account. Not a promise. Not a deposit. The entire project
              amount.
            </p>
          </div>

          {/* Big Number */}
          <div className="mx-auto mt-16 max-w-2xl rounded-2xl bg-reno-green-light p-8 text-center md:p-12">
            <div className="font-display text-5xl font-bold text-reno-green md:text-6xl">
              $148,000
            </div>
            <div className="mt-2 text-lg font-semibold text-reno-green-dark">
              Bank-held, Milestone-protected
            </div>
            <div className="mt-4 text-sm text-gray-700">
              Kitchen + Bath Renovation • 12 Milestones • 8 Weeks
            </div>
          </div>

          {/* Vault States */}
          <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-3">
            <div className="rounded-xl border-2 border-green-500 bg-white p-6 shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <CheckCircle2 className="h-6 w-6 text-green-500" />
                <span className="font-semibold text-green-700">Safe</span>
              </div>
              <div className="text-sm text-gray-600">
                Proof submitted and verified. Payment released automatically.
              </div>
            </div>

            <div className="rounded-xl border-2 border-reno-amber bg-white p-6 shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <AlertTriangle className="h-6 w-6 text-reno-amber" />
                <span className="font-semibold text-reno-amber">Reviewing</span>
              </div>
              <div className="text-sm text-gray-600">
                Professional review in progress. Typical resolution: 24-48
                hours.
              </div>
            </div>

            <div className="rounded-xl border-2 border-reno-red bg-white p-6 shadow-sm">
              <div className="mb-3 flex items-center gap-2">
                <Lock className="h-6 w-6 text-reno-red" />
                <span className="font-semibold text-reno-red">
                  Action Required
                </span>
              </div>
              <div className="text-sm text-gray-600">
                Dispute hold active. Funds frozen until QS measurement
                complete.
              </div>
            </div>
          </div>

          {/* Two Audiences */}
          <div className="mx-auto mt-16 grid max-w-5xl gap-8 md:grid-cols-2">
            <div className="rounded-xl bg-gradient-to-br from-reno-teal-light to-white p-8">
              <h3 className="font-display text-2xl font-bold text-reno-dark">
                For Homeowners
              </h3>
              <p className="mt-4 text-gray-700">
                Your money is protected. Every dollar. If work stops, if quality
                fails, if disputes arise — the vault holds the line. You only
                pay for verified, completed work.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-reno-teal" />
                  <span>Zero risk of contractor abandonment</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-reno-teal" />
                  <span>Full refund protection for incomplete work</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-reno-teal" />
                  <span>Professional verification before every payment</span>
                </li>
              </ul>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-reno-purple-light to-white p-8">
              <h3 className="font-display text-2xl font-bold text-reno-dark">
                For Contractors
              </h3>
              <p className="mt-4 text-gray-700">
                The money is already there. No payment delays, no chasing
                invoices, no cash flow gaps. Complete the work, submit proof,
                get paid. Same day.
              </p>
              <ul className="mt-6 space-y-3 text-sm text-gray-600">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-reno-purple" />
                  <span>Guaranteed funds from day one</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-reno-purple" />
                  <span>Automated payments within 24 hours of proof</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-reno-purple" />
                  <span>Protection from frivolous payment disputes</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Dispute Hold Mechanics */}
          <div className="mx-auto mt-16 max-w-3xl rounded-xl border border-gray-200 bg-white p-8">
            <h3 className="font-display text-xl font-bold text-reno-dark">
              Dispute Hold Mechanics
            </h3>
            <p className="mt-4 text-gray-600">
              If homeowner and contractor disagree on payment, funds freeze
              automatically. A professional Quantity Surveyor measures the
              actual work completed. Their measurement determines the payout.
              Both parties agreed to this process before work began.
            </p>
            <div className="mt-6 rounded-lg bg-reno-amber-light p-4 text-sm text-gray-700">
              <strong>Example:</strong> Contractor says framing is 100% done,
              requests $24,000. Owner says it&apos;s only 60% complete. QS
              measures 75% completion. Contractor receives $18,000. Work
              continues.
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Proof Packages */}
      <section id="proof" className="bg-reno-cream py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-reno-green">
              <Camera className="h-4 w-4" />
              Proof-Based Payouts
            </div>
            <h2 className="font-display text-4xl font-bold tracking-tight text-reno-dark sm:text-5xl">
              Proof Packages
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Payments release when proof is complete. Not promises. Not
              estimates. Verified evidence of completed work.
            </p>
          </div>

          {/* What Triggers a Payout */}
          <div className="mx-auto mt-16 max-w-4xl">
            <h3 className="mb-8 text-center font-display text-2xl font-bold text-reno-dark">
              What Triggers a Payout
            </h3>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-xl bg-white p-6 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-reno-green-light">
                  <MapPin className="h-6 w-6 text-reno-green" />
                </div>
                <div className="font-semibold text-reno-dark">GPS Photos</div>
                <div className="mt-2 text-sm text-gray-600">
                  Location-stamped progress documentation
                </div>
                <div className="mt-3">
                  <CheckCircle2 className="mx-auto h-5 w-5 text-green-500" />
                </div>
              </div>

              <div className="rounded-xl bg-white p-6 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-reno-teal-light">
                  <ClipboardCheck className="h-6 w-6 text-reno-teal" />
                </div>
                <div className="font-semibold text-reno-dark">
                  Inspection Report
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  Third-party quality verification
                </div>
                <div className="mt-3">
                  <CheckCircle2 className="mx-auto h-5 w-5 text-green-500" />
                </div>
              </div>

              <div className="rounded-xl bg-white p-6 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-reno-purple-light">
                  <FileCheck className="h-6 w-6 text-reno-purple" />
                </div>
                <div className="font-semibold text-reno-dark">
                  Contractor Sign-Off
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  GC confirms milestone completion
                </div>
                <div className="mt-3">
                  <CheckCircle2 className="mx-auto h-5 w-5 text-green-500" />
                </div>
              </div>

              <div className="rounded-xl bg-white p-6 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-reno-amber-light">
                  <Award className="h-6 w-6 text-reno-amber" />
                </div>
                <div className="font-semibold text-reno-dark">
                  QS Verification
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  Professional measurement confirmation
                </div>
                <div className="mt-3">
                  <CheckCircle2 className="mx-auto h-5 w-5 text-green-500" />
                </div>
              </div>
            </div>
          </div>

          {/* Field Operations Grid */}
          <div className="mx-auto mt-20 max-w-6xl">
            <h3 className="mb-4 text-center font-display text-2xl font-bold text-reno-dark">
              Field Operations: Proof as a Byproduct
            </h3>
            <p className="mx-auto mb-12 max-w-2xl text-center text-gray-600">
              The contractor doesn&apos;t do extra work. Every field activity
              creates proof automatically.
            </p>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="group rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-reno-green hover:shadow-md">
                <Users className="mb-3 h-8 w-8 text-reno-green" />
                <h4 className="mb-2 font-semibold text-reno-dark">
                  Attendance Tracking
                </h4>
                <p className="text-sm text-gray-600">
                  Crew clock-in with GPS. Proves labor hours and site presence.
                </p>
              </div>

              <div className="group rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-reno-teal hover:shadow-md">
                <ClipboardCheck className="mb-3 h-8 w-8 text-reno-teal" />
                <h4 className="mb-2 font-semibold text-reno-dark">
                  Job Safety Analysis
                </h4>
                <p className="text-sm text-gray-600">
                  Daily safety briefings. Proves compliance and site conditions.
                </p>
              </div>

              <div className="group rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-reno-purple hover:shadow-md">
                <Hammer className="mb-3 h-8 w-8 text-reno-purple" />
                <h4 className="mb-2 font-semibold text-reno-dark">
                  Concrete Tracking
                </h4>
                <p className="text-sm text-gray-600">
                  Pour logs, strength tests, curing schedules. Proves material
                  quality.
                </p>
              </div>

              <div className="group rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-reno-green hover:shadow-md">
                <Camera className="mb-3 h-8 w-8 text-reno-green" />
                <h4 className="mb-2 font-semibold text-reno-dark">
                  Progress Photos
                </h4>
                <p className="text-sm text-gray-600">
                  GPS-stamped images at every milestone. Proves work completion.
                </p>
              </div>

              <div className="group rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-reno-teal hover:shadow-md">
                <ImageIcon className="mb-3 h-8 w-8 text-reno-teal" />
                <h4 className="mb-2 font-semibold text-reno-dark">
                  Drawing Markup
                </h4>
                <p className="text-sm text-gray-600">
                  As-built annotations. Proves deviations and change orders.
                </p>
              </div>

              <div className="group rounded-xl border border-gray-200 bg-white p-6 transition-all hover:border-reno-purple hover:shadow-md">
                <AlertTriangle className="mb-3 h-8 w-8 text-reno-purple" />
                <h4 className="mb-2 font-semibold text-reno-dark">
                  Deficiency Tracking
                </h4>
                <p className="text-sm text-gray-600">
                  Snag lists with photo evidence. Proves issue resolution.
                </p>
              </div>
            </div>
          </div>

          {/* Quote */}
          <div className="mx-auto mt-16 max-w-3xl rounded-xl border-l-4 border-reno-green bg-white p-8 shadow-sm">
            <p className="font-display text-xl italic text-gray-700">
              &quot;The contractor doesn&apos;t do extra work. Proof is a
              byproduct.&quot;
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Every normal field operation creates documentation that becomes
              payment proof.
            </p>
          </div>

          {/* Live System Showcase */}
          <div className="mx-auto mt-20 max-w-6xl">
            <div className="mb-12 text-center">
              <p className="text-sm font-semibold uppercase tracking-wider text-reno-teal">
                From the live system
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold text-reno-dark">
                This is what documentation looks like
              </h3>
            </div>

            <WorkAreaShowcase />

            <div className="mt-12 grid gap-8 lg:grid-cols-2">
              <GanttShowcase />
              <LookaheadShowcase />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Verified Pros */}
      <section id="pros" className="bg-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-reno-purple-light px-4 py-2 text-sm font-semibold text-reno-purple">
              <Award className="h-4 w-4" />
              Performance Data
            </div>
            <h2 className="font-display text-4xl font-bold tracking-tight text-reno-dark sm:text-5xl">
              Verified Pros
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              The barbershop concept: portfolios built from system data, not
              marketing claims. Real work, real costs, real outcomes.
            </p>
          </div>

          {/* Three Data Layers */}
          <div className="mx-auto mt-16 grid max-w-5xl gap-8 lg:grid-cols-3">
            <div className="rounded-xl bg-gradient-to-br from-reno-green-light to-white p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-reno-green text-white">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-reno-dark">
                Verified Work
              </h3>
              <p className="mt-3 text-gray-600">
                Every completed project with GPS photos, inspection reports, and
                owner ratings. Not testimonials — system records.
              </p>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-reno-teal-light to-white p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-reno-teal text-white">
                <TrendingUp className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-reno-dark">
                Real Cost Data
              </h3>
              <p className="mt-3 text-gray-600">
                Actual bids, actual budgets, actual change orders. See what
                similar projects really cost, not marketing estimates.
              </p>
            </div>

            <div className="rounded-xl bg-gradient-to-br from-reno-purple-light to-white p-8">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-reno-purple text-white">
                <Scale className="h-6 w-6" />
              </div>
              <h3 className="font-display text-xl font-bold text-reno-dark">
                Outcome Tracking
              </h3>
              <p className="mt-3 text-gray-600">
                On-time completion rate, budget variance, dispute history, QS
                findings. The data that matters.
              </p>
            </div>
          </div>

          {/* Preview Contractor Cards */}
          <div className="mx-auto mt-20 grid max-w-5xl gap-6 md:grid-cols-3">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-reno-green-light text-lg font-bold text-reno-green">
                  JM
                </div>
                <div>
                  <div className="font-semibold text-reno-dark">
                    Jordan Martinez Construction
                  </div>
                  <div className="text-xs text-gray-500">
                    Licensed GC • 12 years
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="font-display text-2xl font-bold text-reno-green">
                    30
                  </div>
                  <div className="text-xs text-gray-600">Projects</div>
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-reno-green">
                    4.9
                  </div>
                  <div className="text-xs text-gray-600">Rating</div>
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-reno-green">
                    100%
                  </div>
                  <div className="text-xs text-gray-600">On Time</div>
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-reno-green">
                    0
                  </div>
                  <div className="text-xs text-gray-600">Disputes</div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-reno-teal-light text-lg font-bold text-reno-teal">
                  AR
                </div>
                <div>
                  <div className="font-semibold text-reno-dark">
                    Atlas Renovations
                  </div>
                  <div className="text-xs text-gray-500">
                    Licensed GC • 8 years
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="font-display text-2xl font-bold text-reno-teal">
                    42
                  </div>
                  <div className="text-xs text-gray-600">Projects</div>
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-reno-teal">
                    4.8
                  </div>
                  <div className="text-xs text-gray-600">Rating</div>
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-reno-teal">
                    95%
                  </div>
                  <div className="text-xs text-gray-600">On Time</div>
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-reno-teal">
                    1
                  </div>
                  <div className="text-xs text-gray-600">Disputes</div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-reno-purple-light text-lg font-bold text-reno-purple">
                  EB
                </div>
                <div>
                  <div className="font-semibold text-reno-dark">
                    Elevation Builders
                  </div>
                  <div className="text-xs text-gray-500">
                    Licensed GC • 15 years
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="font-display text-2xl font-bold text-reno-purple">
                    58
                  </div>
                  <div className="text-xs text-gray-600">Projects</div>
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-reno-purple">
                    5.0
                  </div>
                  <div className="text-xs text-gray-600">Rating</div>
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-reno-purple">
                    98%
                  </div>
                  <div className="text-xs text-gray-600">On Time</div>
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-reno-purple">
                    0
                  </div>
                  <div className="text-xs text-gray-600">Disputes</div>
                </div>
              </div>
            </div>
          </div>

          {/* Not Marketing — Accountability */}
          <div className="mx-auto mt-16 max-w-2xl rounded-xl border-l-4 border-reno-purple bg-reno-purple-light p-8">
            <p className="font-display text-2xl font-bold text-reno-dark">
              Not marketing — accountability.
            </p>
            <p className="mt-4 text-gray-700">
              Every stat is pulled from escrow releases, inspection reports, and
              QS measurements. Contractors can&apos;t game the system. The work
              speaks for itself.
            </p>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Link
              href="/pros"
              className="inline-flex items-center gap-2 rounded-lg bg-reno-purple px-6 py-3 font-semibold text-white transition-all hover:bg-reno-purple/90"
            >
              Browse Verified Contractors
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Section 4: QS Dispute Resolution */}
      <section id="disputes" className="bg-reno-cream py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-reno-amber">
              <Scale className="h-4 w-4" />
              Fair Resolution
            </div>
            <h2 className="font-display text-4xl font-bold tracking-tight text-reno-dark sm:text-5xl">
              QS Dispute Resolution
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              When homeowner and contractor disagree, a professional Quantity
              Surveyor measures the actual work completed. No negotiation. Just
              measurement.
            </p>
          </div>

          {/* Three Columns Visual */}
          <div className="mx-auto mt-16 grid max-w-5xl gap-6 md:grid-cols-3">
            <div className="rounded-xl bg-white p-8 shadow-sm">
              <div className="mb-4 text-center">
                <div className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
                  GC Says
                </div>
                <div className="font-display text-5xl font-bold text-reno-red">
                  50%
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  Framing complete, ready for payment
                </div>
              </div>
              <div className="rounded-lg bg-reno-red-light p-4 text-center text-sm text-gray-700">
                Requesting $24,000 milestone release
              </div>
            </div>

            <div className="rounded-xl bg-white p-8 shadow-sm">
              <div className="mb-4 text-center">
                <div className="mb-2 text-sm font-semibold uppercase tracking-wide text-gray-500">
                  Owner Says
                </div>
                <div className="font-display text-5xl font-bold text-reno-amber">
                  20%
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  Only walls up, no inspection yet
                </div>
              </div>
              <div className="rounded-lg bg-reno-amber-light p-4 text-center text-sm text-gray-700">
                Willing to release only $9,600
              </div>
            </div>

            <div className="rounded-xl border-4 border-reno-green bg-white p-8 shadow-lg">
              <div className="mb-4 text-center">
                <div className="mb-2 text-sm font-semibold uppercase tracking-wide text-reno-green">
                  QS Measures
                </div>
                <div className="font-display text-5xl font-bold text-reno-green">
                  30%
                </div>
                <div className="mt-2 text-sm text-gray-600">
                  Professional site measurement
                </div>
              </div>
              <div className="rounded-lg bg-reno-green-light p-4 text-center text-sm font-semibold text-reno-green-dark">
                Payment: $14,400 ✓
              </div>
            </div>
          </div>

          {/* Explanation */}
          <div className="mx-auto mt-16 max-w-3xl">
            <h3 className="mb-6 text-center font-display text-2xl font-bold text-reno-dark">
              Professional Measurement Settles Disagreements
            </h3>
            <div className="space-y-6 rounded-xl bg-white p-8 shadow-sm">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-reno-green-light text-sm font-bold text-reno-green">
                    1
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-reno-dark">
                    Dispute Triggered
                  </h4>
                  <p className="mt-1 text-sm text-gray-600">
                    Either party can flag a disagreement. Funds freeze
                    immediately. No partial releases.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-reno-teal-light text-sm font-bold text-reno-teal">
                    2
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-reno-dark">
                    QS Site Visit
                  </h4>
                  <p className="mt-1 text-sm text-gray-600">
                    Licensed Quantity Surveyor inspects within 48 hours. Takes
                    measurements, photos, and detailed notes.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-reno-purple-light text-sm font-bold text-reno-purple">
                    3
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-reno-dark">
                    Binding Report
                  </h4>
                  <p className="mt-1 text-sm text-gray-600">
                    QS issues completion percentage. That number determines
                    payment. No appeals, no negotiation.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-reno-amber-light text-sm font-bold text-reno-amber">
                    4
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-reno-dark">
                    Automatic Release
                  </h4>
                  <p className="mt-1 text-sm text-gray-600">
                    Vault releases proportional payment. Work continues.
                    Remaining funds unlock when milestone actually completes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Agreement Box */}
          <div className="mx-auto mt-16 max-w-2xl rounded-xl border-l-4 border-reno-green bg-white p-8 shadow-sm">
            <p className="font-display text-xl font-bold text-reno-dark">
              &quot;You agreed to this process — it protects everyone.&quot;
            </p>
            <p className="mt-4 text-gray-700">
              Both homeowner and contractor sign the QS dispute resolution
              clause before work begins. It&apos;s in the contract. No
              surprises, no court, no lawyer fees. Just professional
              measurement.
            </p>
          </div>
        </div>
      </section>

      {/* Section 5: HouseFax */}
      <section id="house-fax" className="bg-gradient-to-br from-reno-teal-light to-white py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-reno-teal">
              <FileText className="h-4 w-4" />
              Permanent Record
            </div>
            <h2 className="font-display text-4xl font-bold tracking-tight text-reno-dark sm:text-5xl">
              HouseFax™
            </h2>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              After construction, the record lives forever. Every material,
              trade, inspection, photo, and warranty. The complete build history
              of your home.
            </p>
          </div>

          {/* What's Included */}
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="rounded-xl bg-white p-6 shadow-sm">
                <FileText className="mb-3 h-8 w-8 text-reno-teal" />
                <h3 className="mb-2 font-semibold text-reno-dark">
                  Complete Material Log
                </h3>
                <p className="text-sm text-gray-600">
                  Every product specification, supplier, installation date, and
                  warranty. Know exactly what&apos;s behind your walls.
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <Users className="mb-3 h-8 w-8 text-reno-teal" />
                <h3 className="mb-2 font-semibold text-reno-dark">
                  Trade Records
                </h3>
                <p className="text-sm text-gray-600">
                  Licensed contractor info for every system: electrical,
                  plumbing, HVAC, framing. Who did the work and when.
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <ClipboardCheck className="mb-3 h-8 w-8 text-reno-teal" />
                <h3 className="mb-2 font-semibold text-reno-dark">
                  Inspection History
                </h3>
                <p className="text-sm text-gray-600">
                  All municipal and third-party inspections with pass/fail
                  records and inspector notes.
                </p>
              </div>

              <div className="rounded-xl bg-white p-6 shadow-sm">
                <Camera className="mb-3 h-8 w-8 text-reno-teal" />
                <h3 className="mb-2 font-semibold text-reno-dark">
                  Photo Timeline
                </h3>
                <p className="text-sm text-gray-600">
                  GPS-stamped progress photos from foundation to final
                  walkthrough. Visual proof of quality.
                </p>
              </div>
            </div>
          </div>

          {/* Transferable + QR */}
          <div className="mx-auto mt-16 max-w-3xl rounded-xl bg-white p-8 shadow-lg">
            <div className="flex flex-col items-center gap-6 md:flex-row">
              <div className="flex-shrink-0">
                <div className="flex h-24 w-24 items-center justify-center rounded-xl bg-reno-teal-light">
                  <QrCode className="h-12 w-12 text-reno-teal" />
                </div>
              </div>
              <div className="flex-1 text-center md:text-left">
                <h3 className="font-display text-2xl font-bold text-reno-dark">
                  Transferable on Sale
                </h3>
                <p className="mt-2 text-gray-600">
                  HouseFax™ transfers to the new owner when you sell. Buyers see
                  the full construction record. No hidden defects, no unknown
                  history. Just transparency.
                </p>
                <p className="mt-4 text-sm text-gray-500">
                  Access via QR code at the property or secure web portal.
                  Lifetime cloud storage.
                </p>
              </div>
            </div>
          </div>

          {/* Use Cases */}
          <div className="mx-auto mt-16 max-w-5xl">
            <h3 className="mb-8 text-center font-display text-2xl font-bold text-reno-dark">
              Why HouseFax™ Matters
            </h3>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="rounded-xl bg-white p-6">
                <h4 className="mb-2 font-semibold text-reno-dark">
                  For Resale
                </h4>
                <p className="text-sm text-gray-600">
                  Show buyers exactly what renovations were done, by whom, and
                  with what materials. Increase home value with verified
                  records.
                </p>
              </div>

              <div className="rounded-xl bg-white p-6">
                <h4 className="mb-2 font-semibold text-reno-dark">
                  For Insurance
                </h4>
                <p className="text-sm text-gray-600">
                  Prove replacement costs and quality standards. Document major
                  systems for coverage disputes or claims.
                </p>
              </div>

              <div className="rounded-xl bg-white p-6">
                <h4 className="mb-2 font-semibold text-reno-dark">
                  For Maintenance
                </h4>
                <p className="text-sm text-gray-600">
                  Know when systems were installed, what products were used, and
                  when warranties expire. Plan repairs intelligently.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <Link
              href="/house-fax/sample"
              className="inline-flex items-center gap-2 rounded-lg bg-reno-teal px-6 py-3 font-semibold text-white transition-all hover:bg-reno-teal/90"
            >
              See a Sample HouseFax™
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
