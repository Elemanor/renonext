'use client';

import Link from 'next/link';
import {
  Ruler,
  PenTool,
  Calculator,
  FileCheck,
  Hammer,
  Shield,
  Home,
  Award,
  Users,
  DollarSign,
  Clock,
  CheckCircle,
  ArrowRight,
  ChevronRight,
  Sparkles,
  Target,
  Zap,
  Scale,
  Building2,
  Pencil,
  XCircle,
  HelpCircle,
  AlertTriangle,
  Camera,
  Upload,
  BadgeCheck,
  FileText,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const problemCards = [
  {
    icon: XCircle,
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    borderColor: 'border-red-100',
    title: 'The Design-Cost Disconnect',
    steps: [
      'Architect draws something expensive',
      'Estimator says "too much money"',
      'Contractor says "can\'t build that"',
    ],
  },
  {
    icon: HelpCircle,
    color: 'text-amber-500',
    bgColor: 'bg-amber-50',
    borderColor: 'border-amber-100',
    title: 'The 3-Quote Nightmare',
    steps: [
      'Homeowner gets 3 quotes: $40K, $65K, $90K',
      'Confused and scared',
      'Picks the cheapest (mistake)',
    ],
  },
  {
    icon: AlertTriangle,
    color: 'text-orange-500',
    bgColor: 'bg-orange-50',
    borderColor: 'border-orange-100',
    title: 'The Permit Graveyard',
    steps: [
      'Permit takes 3 months',
      'GC waits around, loses crew',
      'Project dies or gets abandoned',
    ],
  },
];

const lifecycleSteps = [
  {
    step: 1,
    title: 'Design Studio',
    icon: PenTool,
    color: 'from-violet-500 to-violet-600',
    bgColor: 'bg-violet-50',
    textColor: 'text-violet-600',
    borderColor: 'border-violet-200',
    ringColor: 'ring-violet-500',
    description: 'Upload your idea \u2014 photos, sketches, Pinterest boards.',
    detail:
      'Our BCIN-qualified designer creates permit-ready drawings that are engineered for cost efficiency from day one.',
    badge: 'BCIN Certified \u2014 Ontario Building Code Qualified',
    badgeBg: 'bg-violet-100 text-violet-700',
    price: 'From $1,500',
  },
  {
    step: 2,
    title: 'Smart Estimate',
    icon: Calculator,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    borderColor: 'border-blue-200',
    ringColor: 'ring-blue-500',
    description:
      'Because WE drew the plans, we export the exact Bill of Materials.',
    detail:
      'No guessing. No 3 conflicting quotes. One verified price. Your drawings + Our data = 99% accurate estimate.',
    badge: 'QS-Verified \u2014 Professional Quantity Surveyor',
    badgeBg: 'bg-blue-100 text-blue-700',
    price: null,
  },
  {
    step: 3,
    title: 'Permit Express',
    icon: FileCheck,
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-600',
    borderColor: 'border-emerald-200',
    ringColor: 'ring-emerald-500',
    description:
      'We submit directly to the City of Toronto / Mississauga.',
    detail:
      'Our drawings are code-compliant from day one \u2014 no rejections. Average permit time: 3 weeks (vs. 3 months DIY).',
    badge: 'First-time pass rate: 98%',
    badgeBg: 'bg-emerald-100 text-emerald-700',
    price: null,
  },
  {
    step: 4,
    title: 'The Build',
    icon: Hammer,
    color: 'from-amber-500 to-amber-600',
    bgColor: 'bg-amber-50',
    textColor: 'text-amber-600',
    borderColor: 'border-amber-200',
    ringColor: 'ring-amber-500',
    description:
      'Permit-ready job posted to the Pro Network.',
    detail:
      'Contractors bid on COMPLETE packages \u2014 drawings + permit + materials. The GC doesn\'t wait. They start immediately.',
    badge: 'Contractors prefer permit-ready jobs',
    badgeBg: 'bg-amber-100 text-amber-700',
    price: null,
  },
  {
    step: 5,
    title: 'Compliance Lock',
    icon: Shield,
    color: 'from-rose-500 to-rose-600',
    bgColor: 'bg-rose-50',
    textColor: 'text-rose-600',
    borderColor: 'border-rose-200',
    ringColor: 'ring-rose-500',
    description:
      'Every inspection stage from your drawings becomes a dashboard checklist.',
    detail:
      'Photo evidence required at each milestone. Pre-inspection QA check before the City arrives.',
    badge: '100% inspection pass rate',
    badgeBg: 'bg-rose-100 text-rose-700',
    price: null,
  },
  {
    step: 6,
    title: 'House Fax Report',
    icon: Home,
    color: 'from-teal-500 to-teal-600',
    bgColor: 'bg-teal-50',
    textColor: 'text-teal-600',
    borderColor: 'border-teal-200',
    ringColor: 'ring-teal-500',
    description:
      'Every photo, permit, material receipt compiled into a permanent digital asset.',
    detail:
      'A verified service history for your home \u2014 increases resale value. Transferable to the next owner.',
    badge: 'Transferable to next owner',
    badgeBg: 'bg-teal-100 text-teal-700',
    price: null,
  },
];

const certifiedEstimateFeatures = [
  'Detailed Bill of Quantities',
  'Fair Market Value price range',
  'Material specifications',
  'Labor hour estimates',
  'Comparison benchmark for contractor quotes',
];

const unfairAdvantage = [
  {
    icon: PenTool,
    label: 'BCIN',
    role: 'Design',
    description: 'We draw it knowing the cost',
    color: 'from-violet-500 to-violet-600',
    bgColor: 'bg-violet-50',
    textColor: 'text-violet-600',
  },
  {
    icon: Calculator,
    label: 'QS',
    role: 'Cost',
    description: 'We estimate it knowing the design',
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
  },
  {
    icon: Target,
    label: 'PM',
    role: 'Execution',
    description: 'We manage it knowing the code',
    color: 'from-emerald-500 to-emerald-600',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-600',
  },
];

export default function DesignStudioPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden bg-gray-900">
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        {/* Gradient orbs */}
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

        <div className="container relative mx-auto px-4 py-24 md:py-32 lg:py-40">
          <div className="mx-auto max-w-4xl text-center">
            <Badge
              variant="secondary"
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/20 px-5 py-2 text-sm font-medium text-violet-300"
            >
              <Sparkles className="h-4 w-4" />
              RenoNext Design Studio
            </Badge>

            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-7xl">
              FROM PERMIT{' '}
              <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
                TO PAINT
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-2xl text-xl font-medium text-gray-300 md:text-2xl">
              One App. One Ecosystem. Zero Gaps.
            </p>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400">
              We design it. We permit it. We estimate it. We build it.
              <br className="hidden sm:block" />
              The first platform that owns the entire construction lifecycle
              &mdash; from architectural drawings to final inspection.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                className="rounded-full bg-gradient-to-r from-violet-500 to-blue-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-violet-500/25 transition-all duration-200 hover:shadow-xl hover:brightness-110"
              >
                <Link href="/post-job">
                  Start Your Project
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-full border-2 border-white/20 bg-transparent px-8 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:border-white/30 hover:bg-white/10"
              >
                <Link href="#certified-estimate">Talk to an Estimator</Link>
              </Button>
            </div>

            {/* Trust bar */}
            <div className="mt-14 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-violet-400" />
                <span>BCIN Certified</span>
              </div>
              <div className="hidden h-4 w-px bg-gray-700 sm:block" />
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-emerald-400" />
                <span>98% Permit Pass Rate</span>
              </div>
              <div className="hidden h-4 w-px bg-gray-700 sm:block" />
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-blue-400" />
                <span>P.QS Verified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== THE PROBLEM SECTION ===== */}
      <section className="border-b border-gray-100 bg-gray-50 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-red-500">
              The Problem
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Why Renovations Fail Before They Start
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-lg text-gray-500">
              The traditional process is broken. Architects, estimators, and
              contractors operate in silos &mdash; and homeowners pay the price.
            </p>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
            {problemCards.map((card) => (
              <Card
                key={card.title}
                className={`rounded-2xl border-2 ${card.borderColor} bg-white shadow-sm`}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl ${card.bgColor}`}
                    >
                      <card.icon className={`h-5 w-5 ${card.color}`} />
                    </div>
                    <CardTitle className="text-base font-bold text-gray-900">
                      {card.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {card.steps.map((step, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-100">
                          <XCircle className="h-3 w-3 text-red-500" />
                        </div>
                        <span className="text-sm text-gray-600">{step}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ===== THE RENONEXT WAY - VERTICAL INTEGRATION FLOW ===== */}
      <section className="relative bg-white py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="secondary"
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-sm font-medium text-violet-700"
            >
              <Zap className="h-4 w-4" />
              The RenoNext Way
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
              Vertical Integration.{' '}
              <span className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
                One Source of Truth.
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-gray-500">
              Six connected stages. One platform. Every step informed by the
              last.
            </p>
          </div>

          {/* Step Flow */}
          <div className="mx-auto mt-16 max-w-4xl">
            <div className="relative space-y-0">
              {lifecycleSteps.map((item, index) => (
                <div key={item.step} className="relative">
                  {/* Vertical connector line */}
                  {index < lifecycleSteps.length - 1 && (
                    <div className="absolute left-6 top-[4.5rem] z-0 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-gray-200 to-gray-100 md:left-8 md:block" />
                  )}

                  <div className="relative z-10 flex gap-4 pb-10 md:gap-6 md:pb-12">
                    {/* Step number circle */}
                    <div className="shrink-0">
                      <div
                        className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} text-lg font-bold text-white shadow-lg md:h-16 md:w-16 md:text-xl`}
                      >
                        {item.step}
                      </div>
                    </div>

                    {/* Content card */}
                    <Card
                      className={`flex-1 rounded-2xl border-2 ${item.borderColor} bg-white shadow-sm transition-all duration-300 hover:shadow-lg`}
                    >
                      <CardHeader className="pb-2">
                        <div className="flex flex-wrap items-center gap-3">
                          <div
                            className={`flex h-9 w-9 items-center justify-center rounded-lg ${item.bgColor}`}
                          >
                            <item.icon
                              className={`h-5 w-5 ${item.textColor}`}
                            />
                          </div>
                          <CardTitle className="text-lg font-bold text-gray-900 md:text-xl">
                            {item.title}
                          </CardTitle>
                          {item.price && (
                            <Badge
                              className={`ml-auto rounded-full border-transparent ${item.badgeBg} px-3 py-1 text-xs font-semibold`}
                            >
                              {item.price}
                            </Badge>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="mb-2 font-medium text-gray-800">
                          {item.description}
                        </p>
                        <p className="mb-3 text-sm leading-relaxed text-gray-500">
                          {item.detail}
                        </p>
                        <Badge
                          className={`rounded-full border-transparent ${item.badgeBg} px-3 py-1 text-xs font-semibold`}
                        >
                          <CheckCircle className="mr-1 h-3 w-3" />
                          {item.badge}
                        </Badge>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== CERTIFIED ESTIMATE SERVICE CARD ===== */}
      <section
        id="certified-estimate"
        className="border-y border-gray-100 bg-gray-50 py-20 md:py-28"
      >
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="grid gap-8 lg:grid-cols-2">
              {/* Certified Estimate Card */}
              <Card className="relative overflow-hidden rounded-2xl border-2 border-violet-200 bg-white shadow-lg">
                {/* Top accent */}
                <div className="h-1.5 w-full bg-gradient-to-r from-violet-500 to-blue-500" />

                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100">
                      <Ruler className="h-6 w-6 text-violet-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900">
                        The RenoNext Certified Estimate
                      </CardTitle>
                      <p className="text-2xl font-extrabold text-violet-600">
                        $250
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="mb-6 text-gray-600">
                    Don&apos;t get ripped off. Before you hire anyone, get a
                    Third-Party Verified Estimate from a Professional Quantity
                    Surveyor.
                  </p>

                  <div className="mb-6 space-y-3">
                    {certifiedEstimateFeatures.map((feature) => (
                      <div key={feature} className="flex items-center gap-3">
                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                          <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
                        </div>
                        <span className="text-sm font-medium text-gray-700">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="mb-6 rounded-xl border border-violet-100 bg-violet-50 p-4">
                    <p className="text-sm font-semibold italic text-violet-700">
                      &ldquo;Your Golden Ticket to negotiate with any
                      contractor.&rdquo;
                    </p>
                  </div>

                  <Button
                    asChild
                    className="w-full rounded-full bg-gradient-to-r from-violet-500 to-blue-500 py-3 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl hover:brightness-110"
                  >
                    <Link href="/post-job">
                      Get a Certified Estimate
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>

              {/* Fractional Estimator B2B Card */}
              <Card className="relative overflow-hidden rounded-2xl border-2 border-emerald-200 bg-white shadow-lg">
                {/* Top accent */}
                <div className="h-1.5 w-full bg-gradient-to-r from-emerald-500 to-teal-500" />

                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                      <Building2 className="h-6 w-6 text-emerald-600" />
                    </div>
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900">
                        For Contractors: On-Demand Estimation
                      </CardTitle>
                      <p className="text-sm text-gray-500">
                        Fractional Estimator
                      </p>
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  <p className="mb-4 text-gray-600">
                    Hate doing paperwork at 10 PM? Stop losing bids because
                    you&apos;re slow.
                  </p>

                  <div className="mb-6 rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                    <div className="flex items-center gap-2 text-sm text-emerald-700">
                      <Upload className="h-4 w-4 shrink-0" />
                      <span className="font-medium">Upload blueprints</span>
                      <ArrowRight className="h-3 w-3 shrink-0" />
                      <span className="font-medium">
                        We do the Quantity Takeoff
                      </span>
                      <ArrowRight className="h-3 w-3 shrink-0" />
                      <span className="font-medium">
                        Branded quote for your client
                      </span>
                    </div>
                  </div>

                  <p className="mb-6 text-sm text-gray-500">
                    Concrete volumes, linear ft of framing, drywall sheets
                    &mdash; all calculated by a professional QS.
                  </p>

                  <div className="mb-6 flex items-center gap-4">
                    <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-center">
                      <p className="text-lg font-bold text-gray-900">$200</p>
                      <p className="text-xs text-gray-500">per project</p>
                    </div>
                    <div className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-2 text-center">
                      <p className="text-lg font-bold text-gray-900">
                        24-48 hrs
                      </p>
                      <p className="text-xs text-gray-500">turnaround</p>
                    </div>
                  </div>

                  <Button
                    asChild
                    className="w-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 py-3 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl hover:brightness-110"
                  >
                    <Link href="/pro-network">
                      Upload Blueprints
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DISPUTE RESOLUTION CARD ===== */}
      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <Card className="overflow-hidden rounded-2xl border-2 border-gray-200 shadow-lg">
              {/* Top accent */}
              <div className="h-1.5 w-full bg-gradient-to-r from-gray-700 to-gray-900" />

              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100">
                    <Scale className="h-6 w-6 text-gray-700" />
                  </div>
                  <div>
                    <CardTitle className="text-xl font-bold text-gray-900">
                      The QS Audit &mdash; Escrow Dispute Resolution
                    </CardTitle>
                  </div>
                </div>
              </CardHeader>

              <CardContent>
                <div className="mb-6 space-y-3">
                  <div className="rounded-xl border border-red-100 bg-red-50 p-4">
                    <p className="text-sm font-medium text-red-700">
                      <span className="font-bold">Contractor says:</span>{' '}
                      &ldquo;I&apos;m 50% done, release the money.&rdquo;
                    </p>
                  </div>
                  <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
                    <p className="text-sm font-medium text-amber-700">
                      <span className="font-bold">Homeowner says:</span>{' '}
                      &ldquo;It looks like 20% done.&rdquo;
                    </p>
                  </div>
                  <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                    <p className="text-sm font-medium text-blue-700">
                      <span className="font-bold">Who decides?</span> RenoNext&apos;s
                      QS reviews the progress photos against the Bill of
                      Quantities.
                    </p>
                  </div>
                </div>

                <div className="mb-6 rounded-xl border border-gray-200 bg-gray-50 p-5">
                  <p className="text-sm font-medium text-gray-700">
                    <span className="font-bold">Example verdict:</span>{' '}
                    &ldquo;Based on photo evidence, only 30% of the rebar is
                    installed. Escrow will release $3,000, not $5,000.&rdquo;
                  </p>
                </div>

                <p className="text-center text-sm font-semibold text-gray-900">
                  This isn&apos;t guessing. This is professional measurement
                  based on industry-standard Method of Measurement.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ===== THE UNFAIR ADVANTAGE SECTION ===== */}
      <section className="relative overflow-hidden bg-gray-900 py-20 md:py-28">
        {/* Gradient orbs */}
        <div className="absolute -left-40 top-0 h-80 w-80 rounded-full bg-violet-500/10 blur-3xl" />
        <div className="absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-emerald-500/10 blur-3xl" />

        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="secondary"
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-500/20 px-4 py-1.5 text-sm font-medium text-amber-300"
            >
              <Sparkles className="h-4 w-4" />
              The Unfair Advantage
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
              Design + Cost + Execution.{' '}
              <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
                Unified.
              </span>
            </h2>
          </div>

          <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-3">
            {unfairAdvantage.map((item) => (
              <Card
                key={item.label}
                className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 shadow-lg backdrop-blur-sm"
              >
                <CardContent className="p-8 text-center">
                  <div
                    className={`mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} shadow-lg`}
                  >
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <Badge className="mb-3 rounded-full border-transparent bg-white/10 px-3 py-1 text-xs font-bold text-white">
                    {item.label}
                  </Badge>
                  <h3 className="mb-1 text-lg font-bold text-white">
                    {item.role}
                  </h3>
                  <p className="text-sm text-gray-400">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Center connector text */}
          <div className="mx-auto mt-12 max-w-2xl text-center">
            <p className="text-lg leading-relaxed text-gray-300">
              By combining{' '}
              <span className="font-semibold text-violet-400">Design</span> +{' '}
              <span className="font-semibold text-blue-400">Cost</span> +{' '}
              <span className="font-semibold text-emerald-400">Execution</span>
              , we eliminate the &ldquo;Broken Telephone&rdquo; game.
            </p>
            <p className="mt-2 text-xl font-bold text-white">
              One source of truth.
            </p>
          </div>
        </div>
      </section>

      {/* ===== BOTTOM CTA ===== */}
      <section className="bg-white py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-600 via-teal-600 to-violet-700 shadow-2xl">
            <div className="relative px-8 py-14 md:px-16 md:py-20">
              {/* Decorative elements */}
              <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/5 blur-2xl" />
              <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-white/5 blur-2xl" />

              <div className="relative text-center">
                <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">
                  Ready to go From Permit to Paint?
                </h2>
                <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/80">
                  Whether you&apos;re a homeowner starting a renovation or a GC
                  looking for permit-ready projects &mdash; RenoNext handles it
                  all.
                </p>

                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <Button
                    asChild
                    className="rounded-full bg-white px-8 py-3.5 text-base font-semibold text-gray-900 shadow-lg transition-all duration-200 hover:bg-gray-100 hover:shadow-xl"
                  >
                    <Link href="/post-job">
                      Start as Homeowner
                      <ArrowRight className="h-5 w-5" />
                    </Link>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-full border-2 border-white/30 bg-transparent px-8 py-3.5 text-base font-semibold text-white transition-all duration-200 hover:border-white/50 hover:bg-white/10"
                  >
                    <Link href="/pro-network">Join as Contractor</Link>
                  </Button>
                </div>

                {/* Author attribution */}
                <div className="mx-auto mt-14 max-w-lg rounded-2xl border border-white/10 bg-white/10 p-6 backdrop-blur-sm">
                  <div className="mb-3 flex items-center justify-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white/20 text-sm font-bold text-white">
                      PV
                    </div>
                    <div className="text-left">
                      <p className="font-semibold text-white">
                        Pavel Vysotckii, P.QS
                      </p>
                      <p className="text-sm text-white/60">
                        Head of Estimation &amp; Verification
                      </p>
                    </div>
                  </div>
                  <p className="text-sm italic leading-relaxed text-white/70">
                    &ldquo;Unlike other apps that guess, RenoNext is backed by
                    professional Quantity Surveying. Every major project is
                    reviewed by our internal Estimation Team to ensure Fair
                    Market Value.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
