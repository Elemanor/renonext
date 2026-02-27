import Link from 'next/link';
import type { Metadata } from 'next';
import {
  ArrowRight,
  Shield,
  Lock,
  Eye,
  CheckCircle,
  BadgeCheck,
  Camera,
  MapPin,
  FileText,
  TrendingUp,
  UserCheck,
  Star,
  HelpCircle,
  DollarSign,
  Clock,
  Home,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { DashboardPhoneFrame } from '@/components/landing/dashboard-phone-frame';
import { DashboardBrowserFrame } from '@/components/landing/dashboard-browser-frame';
import { EscrowStatus } from '@/components/dashboard/escrow-status';
import { SiteBriefing } from '@/components/dashboard/site-briefing';
import { WeatherHub } from '@/components/dashboard/weather-hub';
import { NoiseForecast } from '@/components/dashboard/noise-forecast';
import { ClientDashboardShowcase } from '@/components/landing/jsa-showcases/client-dashboard-showcase';
import { PhotoTimelineShowcase } from '@/components/landing/jsa-showcases/photo-timeline-showcase';

export const metadata: Metadata = {
  title: 'For Homeowners',
  description: 'Protect your money. See the work. Own the record forever.',
};

export default function HomeownersPage() {
  return (
    <div className="min-h-screen">
      {/* Section 1: Protect your money. */}
      <section className="relative overflow-hidden bg-white py-20 md:py-28 lg:py-36">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(29,107,63,0.08),transparent_50%)]" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Text content */}
              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-reno-green/20 bg-reno-green-light px-4 py-2 text-sm font-medium text-reno-green">
                  <Shield className="h-4 w-4" />
                  The Vault
                </div>

                <h1 className="font-display text-4xl font-bold leading-tight text-reno-dark md:text-5xl lg:text-6xl">
                  Protect your money.
                </h1>

                <p className="mt-6 text-lg leading-relaxed text-gray-700 md:text-xl">
                  Every dollar sits in a bank account that neither you nor the contractor can
                  touch alone.
                </p>

                <p className="mt-4 text-base leading-relaxed text-gray-600">
                  Your renovation funds are held in a neutral milestone vault. The contractor
                  can&apos;t withdraw without your approval. You can&apos;t withhold payment
                  unfairly. The system ensures both sides play by the rules.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="/how-it-works#vault"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-reno-green hover:text-reno-green-dark"
                  >
                    Learn how the Vault works
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>

                {/* Trust signals */}
                <div className="mt-10 space-y-4">
                  {[
                    {
                      icon: Lock,
                      text: 'Bank-grade security',
                      color: 'text-reno-green',
                    },
                    {
                      icon: CheckCircle,
                      text: 'Released only after verified proof',
                      color: 'text-reno-teal',
                    },
                    {
                      icon: Shield,
                      text: 'Built-in dispute resolution',
                      color: 'text-reno-purple',
                    },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-reno-cream">
                        <item.icon className={`h-5 w-5 ${item.color}`} />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{item.text}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Vault — interactive dashboard widget */}
              <div className="relative">
                {/* Phone frame (mobile + default) */}
                <div className="lg:hidden">
                  <DashboardPhoneFrame variant="green">
                    <EscrowStatus />
                  </DashboardPhoneFrame>
                </div>
                {/* Browser frame (lg+) */}
                <div className="hidden lg:block">
                  <DashboardBrowserFrame variant="green">
                    <EscrowStatus />
                  </DashboardBrowserFrame>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: See the work. Every day. */}
      <section className="relative overflow-hidden bg-reno-cream py-20 md:py-28 lg:py-36">
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Daily dashboard — interactive widgets */}
              <div className="order-2 lg:order-1">
                {/* Phone frame (mobile + default) */}
                <div className="lg:hidden">
                  <DashboardPhoneFrame variant="teal">
                    <SiteBriefing />
                    <WeatherHub />
                    <NoiseForecast />
                  </DashboardPhoneFrame>
                </div>
                {/* Browser frame (lg+) */}
                <div className="hidden lg:block">
                  <DashboardBrowserFrame variant="teal">
                    <SiteBriefing />
                    <WeatherHub />
                    <NoiseForecast />
                  </DashboardBrowserFrame>
                </div>
              </div>

              {/* Text content */}
              <div className="order-1 lg:order-2">
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-reno-teal/20 bg-reno-teal-light px-4 py-2 text-sm font-medium text-reno-teal">
                  <Eye className="h-4 w-4" />
                  Daily Dashboard
                </div>

                <h2 className="font-display text-4xl font-bold leading-tight text-reno-dark md:text-5xl">
                  See the work. Every day.
                </h2>

                <p className="mt-6 text-lg leading-relaxed text-gray-700">
                  You see everything from your phone. No surprises.
                </p>

                <div className="mt-8 space-y-6">
                  {[
                    {
                      icon: Clock,
                      title: 'Noise timeline',
                      desc: 'Know when the crew arrives and when they leave.',
                    },
                    {
                      icon: UserCheck,
                      title: 'Crew tracking',
                      desc: 'See exactly who is working in your home.',
                    },
                    {
                      icon: Camera,
                      title: 'Progress photos',
                      desc: 'GPS-stamped photos throughout the day.',
                    },
                    {
                      icon: FileText,
                      title: 'Work log',
                      desc: 'Daily summaries of completed tasks.',
                    },
                  ].map((feature) => (
                    <div key={feature.title} className="flex items-start gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                        <feature.icon className="h-6 w-6 text-reno-teal" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                        <p className="mt-1 text-sm text-gray-600">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Link
                    href="/how-it-works#proof"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-reno-teal hover:text-reno-teal/80"
                  >
                    See how daily tracking works
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            {/* Client Dashboard Showcase */}
            <div className="mt-16">
              <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-reno-teal">
                Your project dashboard
              </p>
              <h3 className="mb-8 font-display text-2xl font-bold text-reno-dark">
                Everything. Real-time. From your phone.
              </h3>
              <ClientDashboardShowcase />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Choose a contractor you can trust. */}
      <section className="relative overflow-hidden bg-white py-20 md:py-28 lg:py-36">
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            {/* Header */}
            <div className="mb-16 text-center">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-reno-purple/20 bg-reno-purple-light px-4 py-2 text-sm font-medium text-reno-purple">
                <BadgeCheck className="h-4 w-4" />
                Verified Contractors
              </div>

              <h2 className="font-display text-4xl font-bold leading-tight text-reno-dark md:text-5xl">
                Choose a contractor you can trust.
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-700">
                Verified portfolios, not marketing. GPS-tagged photos from real jobs, inspection
                pass rates, dispute history.
              </p>

              <p className="mt-4 font-display text-xl italic text-gray-600">
                Choose like you&apos;re picking a barber.
              </p>
            </div>

            {/* Contractor preview cards */}
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  name: 'Apex Foundations Ltd.',
                  specialty: 'Underpinning & Waterproofing',
                  rating: '4.9',
                  jobs: '127',
                  passRate: '98%',
                },
                {
                  name: 'Superior Concrete',
                  specialty: 'Foundation Repair',
                  rating: '4.8',
                  jobs: '203',
                  passRate: '96%',
                },
                {
                  name: 'Heritage Builders',
                  specialty: 'Structural & Framing',
                  rating: '4.9',
                  jobs: '89',
                  passRate: '99%',
                },
              ].map((contractor, idx) => (
                <div
                  key={idx}
                  className="group rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Avatar */}
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-xl bg-gradient-to-br from-reno-green to-reno-teal text-xl font-bold text-white">
                    {contractor.name[0]}
                  </div>

                  {/* Info */}
                  <h3 className="font-semibold text-gray-900">{contractor.name}</h3>
                  <p className="mt-1 text-sm text-gray-600">{contractor.specialty}</p>

                  {/* Stats */}
                  <div className="mt-4 grid grid-cols-3 gap-3 border-t border-gray-100 pt-4">
                    <div>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-reno-amber text-reno-amber" />
                        <span className="text-sm font-bold text-gray-900">
                          {contractor.rating}
                        </span>
                      </div>
                      <div className="text-xs text-gray-500">Rating</div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-gray-900">{contractor.jobs}</div>
                      <div className="text-xs text-gray-500">Jobs</div>
                    </div>
                    <div>
                      <div className="text-sm font-bold text-reno-green">
                        {contractor.passRate}
                      </div>
                      <div className="text-xs text-gray-500">Pass rate</div>
                    </div>
                  </div>

                  {/* Badges */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    <div className="flex items-center gap-1 rounded-full bg-reno-green-light px-2.5 py-1 text-xs font-medium text-reno-green">
                      <Shield className="h-3 w-3" />
                      Verified
                    </div>
                    <div className="flex items-center gap-1 rounded-full bg-reno-teal-light px-2.5 py-1 text-xs font-medium text-reno-teal">
                      <MapPin className="h-3 w-3" />
                      GPS Photos
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-center">
              <Link
                href="/pros"
                className="inline-flex items-center gap-2 text-sm font-semibold text-reno-purple hover:text-reno-purple/80"
              >
                Browse verified contractors
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Own the record forever. HouseFax™ */}
      <section className="relative overflow-hidden bg-gradient-to-br from-reno-teal-light to-white py-20 md:py-28 lg:py-36">
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-6xl">
            <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
              {/* Text content */}
              <div>
                <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-reno-teal/20 bg-white px-4 py-2 text-sm font-medium text-reno-teal">
                  <Home className="h-4 w-4" />
                  HouseFax™
                </div>

                <h2 className="font-display text-4xl font-bold leading-tight text-reno-dark md:text-5xl">
                  Own the record forever.
                </h2>

                <p className="mt-6 text-lg leading-relaxed text-gray-700">
                  Permanent digital record: materials, trades, inspections, warranties, photos.
                  Transferable when your home sells.
                </p>

                <p className="mt-4 font-display text-xl italic text-gray-600">
                  When your home sells, the buyer sees verified history.
                </p>

                <div className="mt-8 space-y-4">
                  {[
                    {
                      icon: FileText,
                      text: 'Every permit and inspection record',
                      color: 'text-reno-teal',
                    },
                    {
                      icon: Camera,
                      text: 'GPS-stamped photos with timestamps',
                      color: 'text-reno-purple',
                    },
                    {
                      icon: CheckCircle,
                      text: 'Material specs and warranties',
                      color: 'text-reno-green',
                    },
                    {
                      icon: TrendingUp,
                      text: 'Verified home value impact',
                      color: 'text-reno-amber',
                    },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white shadow-sm">
                        <item.icon className={`h-5 w-5 ${item.color}`} />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{item.text}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-8">
                  <Link
                    href="/house-fax/sample"
                    className="inline-flex items-center gap-2 text-sm font-semibold text-reno-teal hover:text-reno-teal/80"
                  >
                    View a sample HouseFax report
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>

              {/* HouseFax card mockup */}
              <div className="relative">
                <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-reno-teal/20 to-reno-purple/20 blur-2xl" />
                <div className="relative rounded-2xl border border-gray-200 bg-white p-8 shadow-xl">
                  {/* Header */}
                  <div className="mb-6 border-b border-gray-200 pb-4">
                    <div className="mb-2 flex items-center gap-2">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-reno-teal text-white">
                        <Home className="h-5 w-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">HouseFax™</h3>
                        <p className="text-xs text-gray-500">Property Record</p>
                      </div>
                    </div>
                  </div>

                  {/* Property info */}
                  <div className="mb-6">
                    <div className="text-sm font-medium text-gray-500">Property</div>
                    <div className="font-semibold text-gray-900">42 Maple Drive</div>
                    <div className="text-sm text-gray-600">Toronto, ON</div>
                  </div>

                  {/* Records */}
                  <div className="space-y-3">
                    {[
                      {
                        title: 'Foundation Underpinning',
                        date: 'Oct 2024',
                        value: '$85,600',
                        status: 'Verified',
                      },
                      {
                        title: 'Waterproofing System',
                        date: 'Nov 2024',
                        value: '$12,400',
                        status: 'Verified',
                      },
                      {
                        title: 'ESA Inspection',
                        date: 'Nov 2024',
                        value: 'Passed',
                        status: 'Certified',
                      },
                    ].map((record, idx) => (
                      <div
                        key={idx}
                        className="rounded-lg border border-gray-200 bg-gray-50 p-3"
                      >
                        <div className="mb-1 flex items-start justify-between">
                          <div className="text-sm font-semibold text-gray-900">
                            {record.title}
                          </div>
                          <div className="rounded-full bg-reno-green-light px-2 py-0.5 text-xs font-medium text-reno-green">
                            {record.status}
                          </div>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-600">
                          <span>{record.date}</span>
                          <span className="font-semibold">{record.value}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Footer */}
                  <div className="mt-6 rounded-lg bg-reno-teal-light p-3 text-center">
                    <div className="text-xs font-semibold text-reno-teal">
                      Transferable to new owner
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Photo Timeline Showcase */}
            <div className="mt-16">
              <PhotoTimelineShowcase />
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Pricing & FAQ */}
      <section className="relative overflow-hidden bg-reno-cream py-20 md:py-28 lg:py-36">
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            {/* Pricing header */}
            <div className="mb-16 text-center">
              <h2 className="font-display text-4xl font-bold leading-tight text-reno-dark md:text-5xl">
                Pricing & FAQ
              </h2>

              <div className="mx-auto mt-8 max-w-2xl rounded-2xl border border-reno-green/20 bg-white p-8 shadow-lg">
                <div className="mb-4 flex items-center justify-center gap-2">
                  <DollarSign className="h-6 w-6 text-reno-green" />
                  <h3 className="text-2xl font-bold text-reno-dark">Free to start</h3>
                </div>
                <p className="text-lg text-gray-700">
                  No platform fees upfront. No subscription. No credit card required.
                </p>
                <div className="mt-4 rounded-lg bg-reno-green-light p-4">
                  <p className="text-sm text-gray-700">
                    The 3% platform fee comes from the contractor side. You pay only for the
                    work that gets done.
                  </p>
                </div>
              </div>
            </div>

            {/* FAQ Accordion */}
            <div className="mb-12">
              <h3 className="mb-6 text-center text-2xl font-bold text-reno-dark">
                Frequently Asked Questions
              </h3>

              <Accordion type="single" collapsible className="space-y-4">
                <AccordionItem
                  value="item-1"
                  className="rounded-xl border border-gray-200 bg-white px-6 shadow-sm"
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="h-5 w-5 shrink-0 text-reno-green" />
                      <span>Is my money safe?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 text-gray-600">
                    Yes. Your funds are held in a bank-grade escrow account. Neither you nor the
                    contractor can access the money without verified milestone completion and
                    mutual approval. The vault uses the same infrastructure as major financial
                    institutions.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-2"
                  className="rounded-xl border border-gray-200 bg-white px-6 shadow-sm"
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="h-5 w-5 shrink-0 text-reno-green" />
                      <span>What if the contractor disappears?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 text-gray-600">
                    Your remaining funds stay protected in the vault. You can request a full
                    refund of unspent milestones, or hire a replacement contractor to complete
                    the work. The dispute resolution team mediates if needed, with photo evidence
                    and work logs as proof.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-3"
                  className="rounded-xl border border-gray-200 bg-white px-6 shadow-sm"
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="h-5 w-5 shrink-0 text-reno-green" />
                      <span>What if I disagree with the work?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 text-gray-600">
                    Every milestone includes GPS-stamped photos and third-party verification. If
                    you disagree with quality, you can withhold approval and request an
                    independent inspector. The work must match the scope and standards agreed in
                    the contract before payment is released.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-4"
                  className="rounded-xl border border-gray-200 bg-white px-6 shadow-sm"
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="h-5 w-5 shrink-0 text-reno-green" />
                      <span>Do I own the records?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 text-gray-600">
                    Yes, 100%. Your HouseFax record is yours forever. You can download it as a
                    PDF at any time, share it with buyers when selling, or use it for insurance
                    claims. The record stays with the property even if you change owners.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem
                  value="item-5"
                  className="rounded-xl border border-gray-200 bg-white px-6 shadow-sm"
                >
                  <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="h-5 w-5 shrink-0 text-reno-green" />
                      <span>How do inspections work?</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pt-2 text-gray-600">
                    For major milestones (foundation, framing, mechanical), mandatory inspections
                    are built into the schedule. The system automatically notifies you and the
                    contractor when an inspection is required. Payment is only released after the
                    inspection passes and results are uploaded to your project vault.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Final CTA */}
            <div className="rounded-2xl border border-reno-green/20 bg-gradient-to-br from-white to-reno-green-light p-8 text-center shadow-lg md:p-12">
              <h3 className="font-display text-3xl font-bold text-reno-dark md:text-4xl">
                Ready to protect your renovation?
              </h3>
              <p className="mx-auto mt-4 max-w-xl text-lg text-gray-700">
                Start your project with complete financial protection and full transparency.
              </p>

              <Button
                asChild
                size="lg"
                className="mt-8 h-14 rounded-full bg-reno-green px-8 text-base font-semibold text-white hover:bg-reno-green-dark"
              >
                <Link href="/start-project">
                  Start Your Project — Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>

              <p className="mt-4 text-sm text-gray-600">No credit card required</p>

              {/* Trust badges */}
              <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-reno-green" />
                  <span>Bank-grade security</span>
                </div>
                <div className="flex items-center gap-2">
                  <BadgeCheck className="h-4 w-4 text-reno-teal" />
                  <span>Verified contractors</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield className="h-4 w-4 text-reno-purple" />
                  <span>24/7 support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
