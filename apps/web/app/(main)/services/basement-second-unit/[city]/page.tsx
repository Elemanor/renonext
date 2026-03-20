import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowRight,
  CheckCircle,
  Shield,
  AlertCircle,
  Clock,
  DollarSign,
  FileText,
  ChevronRight,
  Home,
  MapPin,
  ExternalLink,
  Gift,
  Lightbulb,
  Wrench,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  cityGuides,
  getCityGuide,
  obcRequirements,
  type CitySecondaryGuide,
} from '@/lib/data/secondary-suite-cities';

// ---------------------------------------------------------------------------
// Static params — generate one page per city at build time
// ---------------------------------------------------------------------------
export async function generateStaticParams() {
  return cityGuides.map((c) => ({ city: c.slug }));
}

// ---------------------------------------------------------------------------
// SEO metadata
// ---------------------------------------------------------------------------
interface CityPageProps {
  params: Promise<{ city: string }>;
}

export async function generateMetadata({
  params,
}: CityPageProps): Promise<Metadata> {
  const { city } = await params;
  const guide = getCityGuide(city);

  if (!guide) {
    return { title: 'City Not Found | RenoNext' };
  }

  return {
    title: guide.metaTitle,
    description: guide.metaDescription,
    openGraph: {
      title: guide.metaTitle,
      description: guide.metaDescription,
    },
  };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function SecondarySuiteCityPage({
  params,
}: CityPageProps) {
  const { city } = await params;
  const guide = getCityGuide(city);

  if (!guide) {
    notFound();
  }

  // JSON-LD for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${guide.city} Secondary Suite Construction`,
    description: guide.metaDescription,
    provider: {
      '@type': 'Organization',
      name: 'RenoNext',
      url: 'https://renonext.com',
    },
    areaServed: {
      '@type': 'City',
      name: guide.city,
      addressRegion: 'Ontario',
      addressCountry: 'CA',
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-white">
        {/* ── Section 1: Hero ── */}
        <section className="relative overflow-hidden bg-gradient-to-b from-reno-cream to-white py-16 md:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(15,186,189,0.06),transparent_50%)]" />
          <div className="container relative mx-auto px-4">
            {/* Breadcrumb */}
            <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
              <Link href="/" className="transition-colors hover:text-gray-900">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link
                href="/services"
                className="transition-colors hover:text-gray-900"
              >
                Services
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link
                href="/services/basement-second-unit"
                className="transition-colors hover:text-gray-900"
              >
                Basement Second Unit
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="font-medium text-gray-900">{guide.city}</span>
            </nav>

            <div className="mx-auto max-w-4xl">
              <div className="mb-4 flex items-center gap-3">
                <Badge className="rounded-full bg-reno-green/10 text-reno-green border-transparent hover:bg-reno-green/10 px-3 py-1">
                  <MapPin className="mr-1.5 h-3.5 w-3.5" />
                  {guide.region}
                </Badge>
              </div>
              <h1 className="font-display text-4xl font-bold tracking-tight text-reno-dark md:text-5xl lg:text-6xl">
                {guide.city} Secondary Suite Guide
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-gray-600 md:text-xl">
                {guide.heroTagline}
              </p>

              {/* Overview cards */}
              <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
                <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                  <DollarSign className="mb-2 h-5 w-5 text-reno-teal" />
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Permit Fees
                  </p>
                  <p className="mt-1 text-sm font-bold text-gray-900">
                    {guide.permitProcess.fees}
                  </p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                  <Clock className="mb-2 h-5 w-5 text-reno-teal" />
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Timeline
                  </p>
                  <p className="mt-1 text-sm font-bold text-gray-900">
                    {guide.permitProcess.timeline}
                  </p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                  <MapPin className="mb-2 h-5 w-5 text-reno-teal" />
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Region
                  </p>
                  <p className="mt-1 text-sm font-bold text-gray-900">
                    {guide.region}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 2: Overview ── */}
        <section className="border-b border-gray-100 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="font-display text-3xl font-bold tracking-tight text-reno-dark md:text-4xl">
                Overview
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-gray-600 md:text-lg">
                {guide.overview.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 3: Requirements Table ── */}
        <section className="border-b border-gray-100 bg-gray-50 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-reno-green/10">
                  <FileText className="h-5 w-5 text-reno-green" />
                </div>
                <h2 className="font-display text-3xl font-bold tracking-tight text-reno-dark md:text-4xl">
                  {guide.city} Requirements
                </h2>
              </div>

              <div className="mt-8 overflow-hidden rounded-xl border border-gray-200 bg-white">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="px-4 py-3 font-semibold text-gray-700">
                        Requirement
                      </th>
                      <th className="px-4 py-3 font-semibold text-gray-700">
                        Standard
                      </th>
                      <th className="hidden px-4 py-3 font-semibold text-gray-700 md:table-cell">
                        Notes
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(guide.requirements).map(([key, req]) => (
                      <tr
                        key={key}
                        className="border-b border-gray-100 last:border-0"
                      >
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 shrink-0 text-reno-green" />
                            <span className="font-medium text-gray-900">
                              {req.label}
                            </span>
                          </div>
                        </td>
                        <td className="px-4 py-3 text-gray-600">{req.value}</td>
                        <td className="hidden px-4 py-3 text-xs text-gray-500 md:table-cell">
                          {req.notes || '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 4: Ontario Building Code Standards ── */}
        <section className="border-b border-gray-100 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="rounded-xl border-2 border-reno-teal/20 bg-reno-teal/5 p-6 md:p-8">
                <div className="flex items-center gap-3">
                  <Shield className="h-6 w-6 text-reno-teal" />
                  <h2 className="text-xl font-bold text-reno-dark md:text-2xl">
                    Ontario Building Code Standards (Apply Everywhere)
                  </h2>
                </div>
                <p className="mt-3 text-sm text-gray-600">
                  These OBC requirements apply to all secondary suites in
                  Ontario, regardless of municipality.
                </p>
                <ul className="mt-6 space-y-4">
                  {obcRequirements.map((req, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-reno-teal" />
                      <div>
                        <p className="font-semibold text-gray-900">
                          {req.label}:{' '}
                          <span className="font-normal text-gray-700">
                            {req.value}
                          </span>
                        </p>
                        {req.notes && (
                          <p className="mt-1 text-sm text-gray-500">
                            {req.notes}
                          </p>
                        )}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 5: Permit Process ── */}
        <section className="border-b border-gray-100 bg-gray-50 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="text-center">
                <h2 className="font-display text-3xl font-bold tracking-tight text-reno-dark md:text-4xl">
                  Permit Process
                </h2>
                <p className="mt-3 text-gray-500">
                  Step-by-step guide to getting your {guide.city} building
                  permit
                </p>
              </div>

              {/* Timeline summary */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <Card className="rounded-xl border-gray-200 bg-white shadow-sm">
                  <CardContent className="p-5">
                    <Clock className="mb-2 h-5 w-5 text-reno-teal" />
                    <p className="text-sm font-medium text-gray-500">
                      Total Timeline
                    </p>
                    <p className="mt-1 text-xl font-bold text-gray-900">
                      {guide.permitProcess.timeline}
                    </p>
                  </CardContent>
                </Card>
                <Card className="rounded-xl border-gray-200 bg-white shadow-sm">
                  <CardContent className="p-5">
                    <DollarSign className="mb-2 h-5 w-5 text-reno-teal" />
                    <p className="text-sm font-medium text-gray-500">
                      Permit Fees
                    </p>
                    <p className="mt-1 text-xl font-bold text-gray-900">
                      {guide.permitProcess.fees}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Steps */}
              <div className="mt-12 space-y-0">
                {guide.permitProcess.steps.map((step, i) => (
                  <div key={i} className="relative flex gap-6">
                    {/* Timeline line */}
                    <div className="flex flex-col items-center">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-reno-green text-sm font-bold text-white shadow-sm">
                        {i + 1}
                      </div>
                      {i < guide.permitProcess.steps.length - 1 && (
                        <div className="w-px flex-1 bg-gray-300" />
                      )}
                    </div>

                    {/* Content */}
                    <div className="pb-10">
                      <div className="flex items-baseline gap-3">
                        <h3 className="text-lg font-bold text-gray-900">
                          {step.title}
                        </h3>
                        {step.duration && (
                          <span className="text-xs font-medium text-gray-400">
                            {step.duration}
                          </span>
                        )}
                      </div>
                      <p className="mt-1.5 text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 6: Incentives & Rebates ── */}
        {guide.incentives.length > 0 && (
          <section className="border-b border-gray-100 py-16 md:py-20">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-4xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-reno-green/10">
                    <Gift className="h-5 w-5 text-reno-green" />
                  </div>
                  <h2 className="font-display text-3xl font-bold tracking-tight text-reno-dark md:text-4xl">
                    Incentives & Rebates
                  </h2>
                </div>
                <p className="mt-4 text-gray-600">
                  Federal and provincial programs that can help fund your
                  secondary suite project.{' '}
                  <Link
                    href={`/savings/${guide.slug}`}
                    className="inline-flex items-center gap-1 font-semibold text-reno-green hover:underline"
                  >
                    See all rebates available in {guide.city}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {guide.incentives.map((incentive, i) => (
                    <Card
                      key={i}
                      className="rounded-xl border-reno-green/20 bg-white shadow-sm"
                    >
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-bold text-gray-900">
                              {incentive.name}
                            </h3>
                            <p className="mt-1 text-2xl font-bold text-reno-green">
                              {incentive.amount}
                            </p>
                          </div>
                          {incentive.deadline && (
                            <Badge className="rounded-full bg-amber-100 text-amber-800 border-transparent hover:bg-amber-100 px-2 py-0.5 text-xs">
                              {incentive.deadline}
                            </Badge>
                          )}
                        </div>
                        <p className="mt-3 text-sm text-gray-600">
                          {incentive.details}
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <p className="flex items-start gap-2 text-sm text-gray-600">
                    <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                    <span>
                      <strong>Pro tip:</strong> You can stack federal and
                      provincial programs for up to $120,000 in combined
                      funding. Apply for federal programs first, then provincial.
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Section 7: Local Tips & Notes ── */}
        {guide.localNotes.length > 0 && (
          <section className="border-b border-gray-100 bg-gray-50 py-16 md:py-20">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-4xl">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-6 w-6 text-reno-teal" />
                  <h2 className="font-display text-3xl font-bold tracking-tight text-reno-dark md:text-4xl">
                    {guide.city}-Specific Tips
                  </h2>
                </div>
                <ul className="mt-6 space-y-3">
                  {guide.localNotes.map((note, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-reno-teal" />
                      <span className="text-gray-600">{note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* ── Section 8: Official Resources ── */}
        {guide.officialLinks.length > 0 && (
          <section className="border-b border-gray-100 py-16 md:py-20">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-4xl">
                <h2 className="font-display text-3xl font-bold tracking-tight text-reno-dark md:text-4xl">
                  Official Resources
                </h2>
                <div className="mt-6 space-y-3">
                  {guide.officialLinks.map((link, i) => (
                    <a
                      key={i}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 transition-all duration-200 hover:border-reno-teal/30 hover:shadow-md"
                    >
                      <span className="font-medium text-gray-900 group-hover:text-reno-teal">
                        {link.label}
                      </span>
                      <ExternalLink className="h-4 w-4 text-gray-400 group-hover:text-reno-teal" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Section 9: Nearby City Guides (CROSS-LINKING) ── */}
        {guide.nearbyGuides.length > 0 && (
          <section className="border-b border-gray-100 bg-gray-50 py-16 md:py-20">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-4xl">
                <h2 className="font-display text-3xl font-bold tracking-tight text-reno-dark md:text-4xl">
                  Secondary Suite Guides for Nearby Cities
                </h2>
                <p className="mt-3 text-gray-500">
                  Compare requirements and incentives in other Ontario
                  municipalities.
                </p>
                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {guide.nearbyGuides.map((slug) => {
                    const nearbyGuide = getCityGuide(slug);
                    if (!nearbyGuide) return null;
                    return (
                      <Link
                        key={slug}
                        href={`/services/basement-second-unit/${slug}`}
                      >
                        <Card className="h-full rounded-xl border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:border-reno-teal/30">
                          <CardContent className="p-5">
                            <div className="flex items-center gap-2">
                              <Home className="h-4 w-4 text-reno-teal" />
                              <h3 className="font-bold text-gray-900">
                                {nearbyGuide.city}
                              </h3>
                            </div>
                            <p className="mt-1 text-xs text-gray-500">
                              {nearbyGuide.region}
                            </p>
                            <div className="mt-3 flex items-center gap-4 text-xs text-gray-600">
                              <span>
                                <strong>Fees:</strong>{' '}
                                {nearbyGuide.permitProcess.fees}
                              </span>
                            </div>
                            <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-reno-teal">
                              View guide
                              <ArrowRight className="h-3 w-3" />
                            </span>
                          </CardContent>
                        </Card>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Section 10: Related Services ── */}
        <section className="border-b border-gray-100 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="font-display text-3xl font-bold tracking-tight text-reno-dark md:text-4xl">
                Related Services
              </h2>
              <p className="mt-3 text-gray-500">
                Common trades and services for basement apartment projects.
              </p>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Link href="/services/basement-second-unit">
                  <Card className="h-full rounded-xl border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:border-reno-teal/30">
                    <div className="flex items-center gap-3">
                      <Home className="h-5 w-5 text-reno-teal" />
                      <h3 className="font-bold text-gray-900">
                        Complete Guide
                      </h3>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Province-wide secondary suite guide with all requirements.
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-reno-teal">
                      Learn more
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </Card>
                </Link>
                <Link href="/services/underpinning">
                  <Card className="h-full rounded-xl border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:border-reno-teal/30">
                    <div className="flex items-center gap-3">
                      <Wrench className="h-5 w-5 text-reno-teal" />
                      <h3 className="font-bold text-gray-900">Underpinning</h3>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Excavate to lower floor and meet ceiling height
                      requirements.
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-reno-teal">
                      Learn more
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </Card>
                </Link>
                <Link href="/services/waterproofing">
                  <Card className="h-full rounded-xl border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:border-reno-teal/30">
                    <div className="flex items-center gap-3">
                      <Wrench className="h-5 w-5 text-reno-teal" />
                      <h3 className="font-bold text-gray-900">
                        Waterproofing
                      </h3>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Fix moisture issues before finishing basement apartment.
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-reno-teal">
                      Learn more
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </Card>
                </Link>
                <Link href="/services/electrical">
                  <Card className="h-full rounded-xl border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:border-reno-teal/30">
                    <div className="flex items-center gap-3">
                      <Wrench className="h-5 w-5 text-reno-teal" />
                      <h3 className="font-bold text-gray-900">Electrical</h3>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Panel upgrades, separate meters, and ESA permits.
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-reno-teal">
                      Learn more
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </Card>
                </Link>
                <Link href="/services/plumbing">
                  <Card className="h-full rounded-xl border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:border-reno-teal/30">
                    <div className="flex items-center gap-3">
                      <Wrench className="h-5 w-5 text-reno-teal" />
                      <h3 className="font-bold text-gray-900">Plumbing</h3>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Drain capacity, backwater valves, and separate water
                      meters.
                    </p>
                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-reno-teal">
                      Learn more
                      <ArrowRight className="h-3 w-3" />
                    </span>
                  </Card>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 11: FAQ ── */}
        {guide.faqs.length > 0 && (
          <section className="py-16 md:py-20">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-3xl">
                <h2 className="text-center font-display text-3xl font-bold tracking-tight text-reno-dark md:text-4xl">
                  Common Questions
                </h2>
                <div className="mt-10">
                  <Accordion type="single" collapsible className="w-full">
                    {guide.faqs.map((faq, i) => (
                      <AccordionItem key={i} value={`faq-${i}`}>
                        <AccordionTrigger className="text-left text-base font-semibold text-gray-900 hover:no-underline">
                          {faq.q}
                        </AccordionTrigger>
                        <AccordionContent className="leading-relaxed text-gray-600">
                          {faq.a}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Bottom CTA ── */}
        <section className="bg-reno-dark py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
              Get a Quote for Your {guide.city} Basement Apartment
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-gray-400">
              Connect with verified contractors who specialize in secondary
              suite construction. Escrow-protected payments, GPS-verified work,
              and permanent records.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                className="rounded-xl bg-reno-green px-8 py-3 text-base font-semibold text-white hover:bg-reno-green/90"
              >
                <Link href="/price-check">
                  Get a Price Estimate
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-xl border-gray-600 px-8 py-3 text-base font-semibold text-white hover:bg-white/10"
              >
                <Link href="/pros">Browse Pros</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
