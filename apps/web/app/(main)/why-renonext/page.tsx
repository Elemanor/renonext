'use client';

import Link from 'next/link';
import {
  Shield,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  Lock,
  DollarSign,
  Truck,
  Home,
  FileCheck,
  Users,
  Zap,
  CreditCard,
  Package,
  Ruler,
  Building2,
  TrendingUp,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Target,
  Eye,
  Star,
  Award,
  Scale,
  Landmark,
  X,
  Camera,
  Fingerprint,
  CircleDollarSign,
  Banknote,
  ShieldCheck,
  FileText,
  Receipt,
  KeyRound,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

/* ───────────────────────── data ───────────────────────── */

const oldWayItems = [
  { text: 'Introduce client to contractor, then disappear' },
  { text: 'Trust based on 5-star reviews (fakeable)' },
  { text: '50% deposit and pray the contractor comes back' },
  { text: 'Paper receipts in a shoebox' },
  { text: 'No idea who actually shows up at your door' },
  { text: 'Disputes resolved by yelling' },
];

const localProWayItems = [
  { text: 'Stay in the middle of every transaction' },
  { text: 'Trust based on GPS, photos, and verified data' },
  { text: 'Milestone escrow \u2014 money released on proof of work' },
  { text: 'OCR receipts instantly deducted from project budget' },
  { text: 'Every worker verified with photo, license, and geofence' },
  { text: 'Disputes resolved by QS measurement' },
];

const pillars = [
  {
    number: '01',
    title: 'Trust Built with Physics, Not Reviews',
    accent: 'emerald',
    icon: Shield,
    bgGradient: 'from-emerald-500/10 to-emerald-600/5',
    borderColor: 'border-emerald-500/30',
    badgeClass: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
    numberColor: 'text-emerald-500',
    oldWay: '5-star reviews (fakeable, buyable, pressurable)',
    newWay: 'Hard Data',
    bullets: [
      {
        icon: MapPin,
        label: 'Geolocation',
        text: "Worker can't clock in unless GPS matches the site",
      },
      {
        icon: Camera,
        label: 'Timestamped Photos',
        text: "Milestone can't complete without photo proof",
      },
      {
        icon: Fingerprint,
        label: 'Biometric Verification',
        text: 'Each worker signs in on their own device',
      },
    ],
    conclusion:
      'A 5-star rating on RenoNext means "100% of milestones verified," not "My aunt wrote a nice review."',
  },
  {
    number: '02',
    title: 'Service Turned into a Financial Product',
    accent: 'violet',
    icon: CircleDollarSign,
    bgGradient: 'from-violet-500/10 to-violet-600/5',
    borderColor: 'border-violet-500/30',
    badgeClass: 'bg-violet-500/10 text-violet-400 border-violet-500/30',
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-400',
    numberColor: 'text-violet-500',
    oldWay: 'Pay 50% deposit and pray',
    newWay: 'Escrow as a Service',
    bullets: [
      {
        icon: Lock,
        label: 'RenoNext Safe',
        text: 'Client deposits into the RenoNext Safe',
      },
      {
        icon: CheckCircle,
        label: 'Programmatic Release',
        text: 'Money released when Dashboard Logic is satisfied (e.g., "Stage 3: Drywall Tape Photo Uploaded + Client Approved")',
      },
      {
        icon: Eye,
        label: 'Mutual Certainty',
        text: 'Contractor KNOWS the money is there. Client KNOWS it won\u2019t vanish.',
      },
    ],
    conclusion: 'Financial anxiety eliminated for both sides.',
  },
  {
    number: '03',
    title: 'Supply Chain Integration',
    accent: 'blue',
    icon: Truck,
    bgGradient: 'from-blue-500/10 to-blue-600/5',
    borderColor: 'border-blue-500/30',
    badgeClass: 'bg-blue-500/10 text-blue-400 border-blue-500/30',
    iconBg: 'bg-blue-500/10',
    iconColor: 'text-blue-400',
    numberColor: 'text-blue-500',
    oldWay: 'Contractor spends 2 hours/day driving to Home Depot',
    newWay: 'Just-in-Time Logistics',
    bullets: [
      {
        icon: Ruler,
        label: 'Smart Calculation',
        text: 'App knows "1000 sq ft of Drywall" \u2014 calculates material list',
      },
      {
        icon: Package,
        label: 'One-Click Delivery',
        text: 'Materials delivered by RenoNext Runner or partner',
      },
      {
        icon: Banknote,
        label: 'Stay on the Tools',
        text: 'Contractor stays on the tools, earning money. Project moves faster.',
      },
    ],
    conclusion: "We don't just move money. We move materials.",
  },
  {
    number: '04',
    title: 'The "House Fax" \u2014 Digital Twin of Your Home',
    accent: 'amber',
    icon: Home,
    bgGradient: 'from-amber-500/10 to-amber-600/5',
    borderColor: 'border-amber-500/30',
    badgeClass: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
    iconBg: 'bg-amber-500/10',
    iconColor: 'text-amber-400',
    numberColor: 'text-amber-500',
    oldWay: 'Paper invoice lost in 6 months. No proof of reno when selling.',
    newWay: 'Permanent Digital Asset',
    bullets: [
      {
        icon: FileText,
        label: "What's Behind the Walls?",
        text: 'Every photo, permit, inspection report, and material receipt compiled into a transferable digital record',
      },
      {
        icon: TrendingUp,
        label: 'Selling the House?',
        text: 'RenoNext Certified History adds provable value',
      },
      {
        icon: Receipt,
        label: 'Warranty Claim?',
        text: 'Every receipt, every photo, timestamped and immutable',
      },
    ],
    conclusion: 'A house with RenoNext history sells for more. Period.',
  },
  {
    number: '05',
    title: 'Automated Compliance \u2014 The GC Insurance Policy',
    accent: 'rose',
    icon: ShieldCheck,
    bgGradient: 'from-rose-500/10 to-rose-600/5',
    borderColor: 'border-rose-500/30',
    badgeClass: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
    iconBg: 'bg-rose-500/10',
    iconColor: 'text-rose-400',
    numberColor: 'text-rose-500',
    oldWay: "GC uses a messy rolodex. Don't know if sub's WSIB expired yesterday.",
    newWay: 'Compliance Gate',
    bullets: [
      {
        icon: AlertTriangle,
        label: 'Auto-Block',
        text: 'App blocks sub-trade from accepting tender if WSIB expired',
      },
      {
        icon: FileCheck,
        label: 'Certification Tracking',
        text: 'Certifications tracked automatically. Payment auto-blocked for non-compliant workers.',
      },
      {
        icon: Scale,
        label: 'Digital JSA',
        text: 'Digital Job Safety Analysis signed before every shift',
      },
    ],
    conclusion:
      'Zero liability gaps. The platform enforces professionalism even for small residential jobs.',
  },
];

const revenueStreams = [
  {
    icon: CreditCard,
    label: 'Transaction Fees',
    description: 'Interchange on every payment in the loop',
  },
  {
    icon: Zap,
    label: 'Instant Payout Fees',
    description: 'Workers pay $2.50 for instant cash out',
  },
  {
    icon: Package,
    label: 'Material Markup',
    description: 'Margin on in-app material orders',
  },
  {
    icon: Ruler,
    label: 'Design & Estimation',
    description: 'BCIN drawings + QS estimates',
  },
  {
    icon: Landmark,
    label: 'Future: Financing',
    description:
      'Contractor loans based on cash flow data. A contractor who runs $500K/year through the app is pre-approved.',
  },
];

const economySteps = [
  { label: 'Client Deposits', icon: Users, color: 'bg-blue-500' },
  { label: 'Escrow Vault', icon: Lock, color: 'bg-violet-500' },
  { label: 'GC Receives Milestone', icon: CheckCircle, color: 'bg-emerald-500' },
  { label: 'GC Pays Sub-Trades', icon: DollarSign, color: 'bg-amber-500' },
  { label: 'Sub Buys Materials', icon: Package, color: 'bg-blue-500' },
  { label: 'Workers Get Instant Pay', icon: Zap, color: 'bg-violet-500' },
  { label: 'Material Suppliers Paid', icon: Truck, color: 'bg-emerald-500' },
];

const moatPoints = [
  { icon: Zap, text: "Workers won't leave \u2014 their earnings are here" },
  { icon: Users, text: "GCs won't leave \u2014 their crew management is here" },
  { icon: Lock, text: "Clients won't leave \u2014 their escrow is here" },
  { icon: DollarSign, text: "Subs won't leave \u2014 their payments are here" },
];

/* ───────────────────────── page ───────────────────────── */

export default function WhyRenoNextPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ─── HERO ─── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-950 via-gray-950 to-gray-900">
        {/* decorative grid */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[120px]" />

        <div className="relative mx-auto max-w-5xl px-6 pb-24 pt-28 text-center sm:pt-36">
          <Badge className="mb-6 border-violet-500/30 bg-violet-500/10 text-violet-300 hover:bg-violet-500/10">
            <Sparkles className="mr-1.5 h-3.5 w-3.5" />
            Fintech &amp; Logistics for Construction
          </Badge>

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            This Isn&apos;t Another
            <br />
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              &ldquo;Find a Contractor&rdquo; App.
            </span>
          </h1>

          <div className="mx-auto mt-8 max-w-2xl space-y-4 text-lg leading-relaxed text-gray-400">
            <p>
              The market is flooded with contractor matching apps.
              <br className="hidden sm:inline" />
              They&apos;re all dating apps&nbsp;&mdash;&nbsp;they introduce you and walk
              away.
            </p>
            <p className="text-xl font-semibold text-gray-200">
              RenoNext stays in the middle of every transaction
              <br className="hidden sm:inline" />
              as the{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                Digital Superintendent.
              </span>
            </p>
          </div>

          <div className="mt-10">
            <Button
              size="lg"
              className="bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:from-violet-500 hover:to-blue-500"
              onClick={() =>
                document
                  .getElementById('pillars')
                  ?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              See How It Works
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* ─── THE FATAL FLAW ─── */}
      <section className="relative overflow-hidden bg-gray-50 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-16 text-center">
            <Badge variant="outline" className="mb-4 border-red-200 text-red-600">
              <AlertTriangle className="mr-1.5 h-3.5 w-3.5" />
              The Fatal Flaw
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Same problem. Radically different solution.
            </h2>
          </div>

          <div className="grid gap-8 lg:grid-cols-2">
            {/* Old Way */}
            <Card className="border-gray-200 bg-white/80 shadow-sm">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold text-gray-700">
                    The Old Way
                  </CardTitle>
                  <Badge
                    variant="secondary"
                    className="bg-gray-100 text-gray-500"
                  >
                    HomeStars / Jiffy / Thumbtack
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {oldWayItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100">
                      <X className="h-3.5 w-3.5 text-red-500" />
                    </div>
                    <span className="text-gray-600">{item.text}</span>
                  </div>
                ))}
                <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-3 text-center">
                  <p className="text-sm font-medium text-gray-500">
                    Marketing Companies&nbsp;&mdash;&nbsp;
                    <span className="text-gray-400">They sell leads</span>
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* RenoNext Way */}
            <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50/80 to-white shadow-md ring-1 ring-emerald-100">
              <CardHeader className="pb-4">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg font-bold text-gray-900">
                    The RenoNext Way
                  </CardTitle>
                  <Badge className="border-emerald-200 bg-emerald-100 text-emerald-700 hover:bg-emerald-100">
                    <Sparkles className="mr-1 h-3 w-3" />
                    Different
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {localProWayItems.map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
                    </div>
                    <span className="text-gray-700">{item.text}</span>
                  </div>
                ))}
                <div className="mt-6 rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-center">
                  <p className="text-sm font-medium text-emerald-700">
                    Fintech &amp; Logistics Company&nbsp;&mdash;&nbsp;
                    <span className="text-emerald-600">We sell security</span>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ─── 5 PILLARS ─── */}
      <section id="pillars" className="bg-gray-950 py-24">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-20 text-center">
            <Badge className="mb-4 border-white/10 bg-white/5 text-gray-300 hover:bg-white/5">
              <Target className="mr-1.5 h-3.5 w-3.5" />5 Pillars
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Why RenoNext Wins
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Five structural advantages that can&apos;t be copied with a weekend
              hackathon.
            </p>
          </div>

          <div className="space-y-12">
            {pillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <Card
                  key={pillar.number}
                  className={`border ${pillar.borderColor} bg-gradient-to-br ${pillar.bgGradient} to-gray-950 shadow-lg`}
                >
                  <CardContent className="p-8 sm:p-10">
                    {/* header row */}
                    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-xl ${pillar.iconBg}`}
                        >
                          <Icon className={`h-6 w-6 ${pillar.iconColor}`} />
                        </div>
                        <div>
                          <span
                            className={`text-sm font-bold uppercase tracking-widest ${pillar.numberColor}`}
                          >
                            Pillar {pillar.number}
                          </span>
                          <h3 className="text-xl font-bold text-white sm:text-2xl">
                            {pillar.title}
                          </h3>
                        </div>
                      </div>
                    </div>

                    {/* old vs new badges */}
                    <div className="mb-8 flex flex-col gap-3 sm:flex-row">
                      <div className="flex items-center gap-2 rounded-lg border border-gray-700/50 bg-gray-800/50 px-4 py-2">
                        <X className="h-4 w-4 text-red-400" />
                        <span className="text-sm text-gray-400">
                          <span className="font-medium text-gray-300">
                            Old Way:
                          </span>{' '}
                          {pillar.oldWay}
                        </span>
                      </div>
                      <div
                        className={`flex items-center gap-2 rounded-lg border px-4 py-2 ${pillar.borderColor} bg-white/5`}
                      >
                        <CheckCircle
                          className={`h-4 w-4 ${pillar.iconColor}`}
                        />
                        <span className="text-sm text-gray-300">
                          <span className="font-medium text-white">
                            RenoNext:
                          </span>{' '}
                          {pillar.newWay}
                        </span>
                      </div>
                    </div>

                    {/* bullets */}
                    <div className="mb-8 grid gap-4 sm:grid-cols-3">
                      {pillar.bullets.map((bullet) => {
                        const BIcon = bullet.icon;
                        return (
                          <div
                            key={bullet.label}
                            className="rounded-xl border border-gray-800 bg-gray-900/60 p-5"
                          >
                            <BIcon
                              className={`mb-3 h-5 w-5 ${pillar.iconColor}`}
                            />
                            <p className="mb-1 text-sm font-semibold text-white">
                              {bullet.label}
                            </p>
                            <p className="text-sm leading-relaxed text-gray-400">
                              {bullet.text}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    {/* conclusion */}
                    <div className="rounded-lg border border-gray-800 bg-gray-900/40 px-6 py-4">
                      <p className="text-base font-medium italic text-gray-300">
                        &ldquo;{pillar.conclusion}&rdquo;
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── THE CLOSED ECONOMIC LOOP ─── */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-5xl px-6">
          <div className="mb-16 text-center">
            <Badge
              variant="outline"
              className="mb-4 border-violet-200 text-violet-600"
            >
              <TrendingUp className="mr-1.5 h-3.5 w-3.5" />
              The Closed Loop
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              The RenoNext Economy
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              Every dollar tracked. Every transaction recorded.
              <br />
              Money never leaves the ecosystem until work is proven.
            </p>
          </div>

          {/* circular flow */}
          <div className="relative">
            {/* mobile: vertical flow */}
            <div className="flex flex-col items-center gap-3 sm:hidden">
              {economySteps.map((step, i) => {
                const SIcon = step.icon;
                return (
                  <div key={i} className="flex flex-col items-center">
                    <div
                      className={`flex h-14 w-14 items-center justify-center rounded-full text-white ${step.color}`}
                    >
                      <SIcon className="h-6 w-6" />
                    </div>
                    <p className="mt-2 text-center text-sm font-medium text-gray-700">
                      {step.label}
                    </p>
                    {i < economySteps.length - 1 && (
                      <ChevronRight className="my-1 h-5 w-5 rotate-90 text-gray-300" />
                    )}
                  </div>
                );
              })}
              {/* loop arrow back to top */}
              <div className="mt-2 rounded-full border-2 border-dashed border-violet-300 px-4 py-1.5">
                <span className="text-xs font-semibold text-violet-500">
                  Cycle Repeats
                </span>
              </div>
            </div>

            {/* desktop: horizontal wrap */}
            <div className="hidden flex-wrap items-center justify-center gap-2 sm:flex">
              {economySteps.map((step, i) => {
                const SIcon = step.icon;
                return (
                  <div key={i} className="flex items-center gap-2">
                    <div className="flex flex-col items-center">
                      <div
                        className={`flex h-16 w-16 items-center justify-center rounded-2xl text-white shadow-lg ${step.color}`}
                      >
                        <SIcon className="h-7 w-7" />
                      </div>
                      <p className="mt-2 max-w-[100px] text-center text-xs font-medium text-gray-700">
                        {step.label}
                      </p>
                    </div>
                    {i < economySteps.length - 1 && (
                      <ArrowRight className="mx-1 h-5 w-5 shrink-0 text-gray-300" />
                    )}
                  </div>
                );
              })}
              {/* loop indicator */}
              <div className="flex items-center gap-2">
                <ArrowRight className="mx-1 h-5 w-5 shrink-0 text-violet-400" />
                <div className="rounded-full border-2 border-dashed border-violet-300 px-4 py-2">
                  <span className="text-xs font-semibold text-violet-500">
                    Loop
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── REVENUE MODEL ─── */}
      <section className="bg-gray-50 py-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-16 text-center">
            <Badge
              variant="outline"
              className="mb-4 border-emerald-200 text-emerald-600"
            >
              <DollarSign className="mr-1.5 h-3.5 w-3.5" />
              Revenue Model
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              How RenoNext Makes Money
            </h2>
          </div>

          <div className="space-y-4">
            {revenueStreams.map((stream, i) => {
              const SIcon = stream.icon;
              return (
                <Card
                  key={i}
                  className="border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md"
                >
                  <CardContent className="flex items-center gap-5 p-5">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-100">
                      <SIcon className="h-6 w-6 text-gray-700" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {stream.label}
                      </p>
                      <p className="text-sm text-gray-500">
                        {stream.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          <div className="mt-12 rounded-xl border border-gray-200 bg-white p-8 text-center">
            <p className="text-lg text-gray-600">
              We&apos;re not selling leads at $15/each.
            </p>
            <p className="mt-2 text-xl font-bold text-gray-900">
              We&apos;re capturing 2&ndash;3% of every dollar that flows through
              construction.
            </p>
          </div>
        </div>
      </section>

      {/* ─── THE MOAT ─── */}
      <section className="relative overflow-hidden bg-gray-950 py-24">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-rose-600/5 blur-[100px]" />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Badge className="mb-6 border-rose-500/30 bg-rose-500/10 text-rose-300 hover:bg-rose-500/10">
            <KeyRound className="mr-1.5 h-3.5 w-3.5" />
            The Moat
          </Badge>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Why Competitors Can&apos;t Copy This
          </h2>

          <blockquote className="mx-auto mt-10 max-w-2xl">
            <p className="text-xl font-medium leading-relaxed text-gray-300 sm:text-2xl">
              &ldquo;A contractor might switch lead-gen apps.
              <br />
              But they will{' '}
              <span className="font-bold text-white">never</span> switch the app
              that holds their money and payroll.&rdquo;
            </p>
          </blockquote>

          <div className="mx-auto mt-12 grid max-w-2xl gap-4 sm:grid-cols-2">
            {moatPoints.map((point, i) => {
              const MIcon = point.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-xl border border-gray-800 bg-gray-900/60 px-5 py-4 text-left"
                >
                  <MIcon className="h-5 w-5 shrink-0 text-violet-400" />
                  <span className="text-sm text-gray-300">{point.text}</span>
                </div>
              );
            })}
          </div>

          <div className="mt-12 inline-block rounded-full border border-violet-500/30 bg-violet-500/10 px-6 py-2.5">
            <p className="text-sm font-semibold text-violet-300">
              Network effects + financial lock-in = unbreakable moat
            </p>
          </div>
        </div>
      </section>

      {/* ─── BOTTOM CTA ─── */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white py-24">
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-100/50 blur-[100px]" />

        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl">
            We&apos;re Not Building an App.
          </h2>
          <p className="mt-4 text-2xl font-bold sm:text-3xl">
            <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              We&apos;re Building the Operating System for Construction.
            </span>
          </p>

          <p className="mx-auto mt-6 max-w-xl text-lg text-gray-500">
            From Permit to Paint. From Payment to Payroll.
            <br />
            One platform. Every stakeholder. Zero gaps.
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link href="/post-job">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:from-violet-500 hover:to-blue-500 sm:w-auto"
              >
                <Home className="mr-2 h-4 w-4" />
                Join as Homeowner
              </Button>
            </Link>
            <Link href="/pros">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto"
              >
                <Building2 className="mr-2 h-4 w-4" />
                Join as Pro
              </Button>
            </Link>
            <Button
              size="lg"
              variant="ghost"
              className="w-full text-gray-600 sm:w-auto"
            >
              <Landmark className="mr-2 h-4 w-4" />
              Investor Inquiry
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
