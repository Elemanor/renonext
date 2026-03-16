import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowRight,
  CheckCircle,
  Shield,
  AlertTriangle,
  Clock,
  Gauge,
  Snowflake,
  MapPin,
  Star,
  ChevronRight,
  FileText,
  DollarSign,
  HardHat,
  Wrench,
  Gift,
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
import { services, getServiceBySlug } from '@/lib/data/services';
import { cityGuides } from '@/lib/data/secondary-suite-cities';
import { fetchProsByCategory } from '@/lib/supabase/queries/profiles';

// ---------------------------------------------------------------------------
// Static params — generate one page per trade at build time
// ---------------------------------------------------------------------------
export async function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

// ---------------------------------------------------------------------------
// SEO metadata
// ---------------------------------------------------------------------------
interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return { title: 'Service Not Found | RenoNext' };
  }

  return {
    title: service.metaTitle,
    description: service.metaDescription,
    openGraph: {
      title: service.metaTitle,
      description: service.metaDescription,
    },
  };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  // Fetch real pros for this category
  const { data: pros } = await fetchProsByCategory(service.categorySlug);

  // JSON-LD for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.metaDescription,
    provider: {
      '@type': 'Organization',
      name: 'RenoNext',
      url: 'https://renonext.com',
    },
    areaServed: {
      '@type': 'Province',
      name: 'Ontario',
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
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(29,107,63,0.06),transparent_50%)]" />
          <div className="container relative mx-auto px-4">
            {/* Breadcrumb */}
            <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
              <Link href="/" className="transition-colors hover:text-gray-900">
                Home
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link
                href="/pros"
                className="transition-colors hover:text-gray-900"
              >
                Services
              </Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="font-medium text-gray-900">
                {service.title}
              </span>
            </nav>

            <div className="mx-auto max-w-4xl">
              <h1 className="font-display text-4xl font-bold tracking-tight text-reno-dark md:text-5xl lg:text-6xl">
                {service.title}
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-gray-600 md:text-xl">
                {service.heroTagline}
              </p>

              {/* Overview cards */}
              <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                  <Clock className="mb-2 h-5 w-5 text-reno-teal" />
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Timeline
                  </p>
                  <p className="mt-1 text-sm font-bold text-gray-900">
                    {service.overview.timeline}
                  </p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                  <Gauge className="mb-2 h-5 w-5 text-reno-teal" />
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Difficulty
                  </p>
                  <p className="mt-1 text-sm font-bold text-gray-900">
                    {service.overview.difficulty}
                  </p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                  <DollarSign className="mb-2 h-5 w-5 text-reno-teal" />
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    Starting at
                  </p>
                  <p className="mt-1 text-sm font-bold text-gray-900">
                    {service.pricing.breakdowns[0]?.range.split(' - ')[0] || 'Varies'}
                  </p>
                </div>
                {service.overview.seasonal ? (
                  <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                    <Snowflake className="mb-2 h-5 w-5 text-reno-teal" />
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Season
                    </p>
                    <p className="mt-1 text-sm font-bold text-gray-900">
                      {service.overview.seasonal}
                    </p>
                  </div>
                ) : (
                  <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                    <FileText className="mb-2 h-5 w-5 text-reno-teal" />
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                      Permit
                    </p>
                    <p className="mt-1 text-sm font-bold text-gray-900">
                      {service.permits.obcRequired ? 'Required' : 'Usually not'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 2: What Is It? ── */}
        <section className="border-b border-gray-100 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="font-display text-3xl font-bold tracking-tight text-reno-dark md:text-4xl">
                What is {service.title.toLowerCase()}?
              </h2>
              <div className="mt-6 space-y-4 text-base leading-relaxed text-gray-600 md:text-lg">
                {service.whatIsIt.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* When you need it */}
              <div className="mt-10">
                <h3 className="text-lg font-bold text-gray-900">
                  When you need {service.title.toLowerCase()}
                </h3>
                <ul className="mt-4 space-y-3">
                  {service.whenYouNeedIt.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-reno-green" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 3: The Process ── */}
        <section className="border-b border-gray-100 bg-gray-50 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="text-center">
                <h2 className="font-display text-3xl font-bold tracking-tight text-reno-dark md:text-4xl">
                  The Process
                </h2>
                <p className="mt-3 text-gray-500">
                  Step-by-step — what happens from start to finish
                </p>
              </div>

              <div className="mt-12 space-y-0">
                {service.processSteps.map((step, i) => (
                  <div key={i} className="relative flex gap-6">
                    {/* Timeline line */}
                    <div className="flex flex-col items-center">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-reno-green text-sm font-bold text-white shadow-sm">
                        {i + 1}
                      </div>
                      {i < service.processSteps.length - 1 && (
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

        {/* ── Section 4: Permits & Building Code ── */}
        <section className="border-b border-gray-100 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-reno-teal/10">
                  <FileText className="h-5 w-5 text-reno-teal" />
                </div>
                <h2 className="font-display text-3xl font-bold tracking-tight text-reno-dark md:text-4xl">
                  Permits & Building Code
                </h2>
              </div>

              <div className="mt-8">
                <div className="flex items-center gap-2">
                  {service.permits.obcRequired ? (
                    <Badge className="bg-amber-100 text-amber-800 border-transparent hover:bg-amber-100">
                      <AlertTriangle className="mr-1.5 h-3.5 w-3.5" />
                      Permit Required
                    </Badge>
                  ) : (
                    <Badge className="bg-green-100 text-green-800 border-transparent hover:bg-green-100">
                      <CheckCircle className="mr-1.5 h-3.5 w-3.5" />
                      Permit Usually Not Required
                    </Badge>
                  )}
                </div>

                {service.permits.items.length > 0 && (
                  <div className="mt-6 overflow-hidden rounded-xl border border-gray-200">
                    <table className="w-full text-left text-sm">
                      <thead>
                        <tr className="border-b border-gray-200 bg-gray-50">
                          <th className="px-4 py-3 font-semibold text-gray-700">
                            Permit / Approval
                          </th>
                          <th className="px-4 py-3 font-semibold text-gray-700">
                            Authority
                          </th>
                          <th className="px-4 py-3 font-semibold text-gray-700">
                            Typical Cost
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {service.permits.items.map((item, i) => (
                          <tr
                            key={i}
                            className="border-b border-gray-100 last:border-0"
                          >
                            <td className="px-4 py-3 font-medium text-gray-900">
                              {item.name}
                            </td>
                            <td className="px-4 py-3 text-gray-600">
                              {item.authority}
                            </td>
                            <td className="px-4 py-3 text-gray-600">
                              {item.typical_cost}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                {service.permits.notes.length > 0 && (
                  <div className="mt-6 space-y-2">
                    {service.permits.notes.map((note, i) => (
                      <p key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gray-400" />
                        {note}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── Section 5: Pricing Guide ── */}
        <section className="border-b border-gray-100 bg-gray-50 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-reno-green/10">
                  <DollarSign className="h-5 w-5 text-reno-green" />
                </div>
                <h2 className="font-display text-3xl font-bold tracking-tight text-reno-dark md:text-4xl">
                  Pricing Guide
                </h2>
              </div>

              <p className="mt-4 max-w-2xl text-gray-600">
                {service.pricing.intro}
              </p>

              {/* Price cards */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {service.pricing.breakdowns.map((item, i) => (
                  <Card
                    key={i}
                    className="rounded-xl border-gray-200 bg-white shadow-sm"
                  >
                    <CardContent className="p-5">
                      <p className="text-sm font-medium text-gray-500">
                        {item.scope}
                      </p>
                      <p className="mt-2 text-xl font-bold tracking-tight text-gray-900">
                        {item.range}
                      </p>
                      {item.factors && (
                        <p className="mt-2 text-xs text-gray-400">
                          Depends on: {item.factors}
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Factors */}
              {service.pricing.factors.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400">
                    What affects the price
                  </h3>
                  <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                    {service.pricing.factors.map((factor, i) => (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-sm text-gray-600"
                      >
                        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-reno-teal" />
                        {factor}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* CTA */}
              <div className="mt-10 flex flex-col items-start gap-3 rounded-xl border border-reno-green/20 bg-reno-green/5 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-bold text-gray-900">
                    {service.pricing.ctaText}
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Get a ballpark estimate in under 2 minutes.
                  </p>
                </div>
                <Button
                  asChild
                  className="rounded-xl bg-reno-green px-6 py-2.5 text-sm font-semibold text-white hover:bg-reno-green/90"
                >
                  <Link href="/price-check">
                    Try Price Check
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* ── Rebate Banner ── */}
        <section className="border-b border-gray-100 py-0">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <Link
                href="/savings"
                className="group flex items-center gap-4 rounded-2xl border-2 border-reno-green/20 bg-reno-green/5 p-6 transition-all duration-200 hover:border-reno-green/40 hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-reno-green/10 transition-colors group-hover:bg-reno-green group-hover:text-white">
                  <Gift className="h-6 w-6 text-reno-green group-hover:text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-gray-900">
                    Reduce your cost — see available rebates and incentives
                  </p>
                  <p className="mt-0.5 text-sm text-gray-500">
                    GTA homeowners can stack federal, provincial, and municipal programs for significant savings.
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-reno-green transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── Section 6: Warnings (conditional) ── */}
        {service.warnings && (
          <section className="border-b border-gray-100 py-16 md:py-20">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-4xl">
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-6 md:p-8">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-6 w-6 text-amber-600" />
                    <h2 className="text-xl font-bold text-amber-900">
                      {service.warnings.title}
                    </h2>
                  </div>
                  <ul className="mt-4 space-y-3">
                    {service.warnings.items.map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-amber-800"
                      >
                        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Section 7: Verified Pros ── */}
        {pros.length > 0 && (
          <section className="border-b border-gray-100 bg-gray-50 py-16 md:py-20">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-4xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-reno-green/10">
                    <Shield className="h-5 w-5 text-reno-green" />
                  </div>
                  <div>
                    <h2 className="font-display text-3xl font-bold tracking-tight text-reno-dark md:text-4xl">
                      Verified {service.title} Pros
                    </h2>
                    <p className="mt-1 text-gray-500">
                      Licensed, insured, and approved on RenoNext
                    </p>
                  </div>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  {pros.map((pro) => (
                    <Link
                      key={pro.id}
                      href={`/pros/${pro.id}`}
                      className="group"
                    >
                      <Card className="h-full rounded-xl border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:border-reno-green/30">
                        <CardContent className="p-5">
                          {/* Photos strip */}
                          {pro.photos.length > 0 && (
                            <div className="mb-4 flex gap-2 overflow-hidden rounded-lg">
                              {pro.photos.slice(0, 3).map((url, i) => (
                                <div
                                  key={i}
                                  className="aspect-[4/3] flex-1 overflow-hidden rounded-md bg-gray-100"
                                >
                                  <img
                                    src={url}
                                    alt=""
                                    className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                  />
                                </div>
                              ))}
                            </div>
                          )}

                          <div className="flex items-start justify-between">
                            <div>
                              <h3 className="font-bold text-gray-900 group-hover:text-reno-green transition-colors">
                                {pro.company}
                              </h3>
                              <p className="mt-0.5 text-sm text-gray-500">
                                {pro.trade}
                              </p>
                            </div>
                            {pro.rating > 0 && (
                              <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2 py-1">
                                <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                                <span className="text-xs font-bold text-gray-900">
                                  {pro.rating}
                                </span>
                              </div>
                            )}
                          </div>

                          <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                            <MapPin className="h-3.5 w-3.5" />
                            {pro.location}
                          </div>

                          {/* Trust badges */}
                          <div className="mt-3 flex flex-wrap gap-1.5">
                            {pro.verified && (
                              <Badge className="rounded-full bg-green-50 text-[10px] font-semibold text-green-700 ring-1 ring-green-200/50 border-transparent hover:bg-green-50 px-2 py-0.5">
                                <CheckCircle className="mr-1 h-3 w-3" />
                                Verified
                              </Badge>
                            )}
                            {pro.wsib && (
                              <Badge className="rounded-full bg-blue-50 text-[10px] font-semibold text-blue-700 ring-1 ring-blue-200/50 border-transparent hover:bg-blue-50 px-2 py-0.5">
                                <Shield className="mr-1 h-3 w-3" />
                                WSIB
                              </Badge>
                            )}
                            {pro.insured && (
                              <Badge className="rounded-full bg-purple-50 text-[10px] font-semibold text-purple-700 ring-1 ring-purple-200/50 border-transparent hover:bg-purple-50 px-2 py-0.5">
                                <Shield className="mr-1 h-3 w-3" />
                                Insured
                              </Badge>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <Button
                    asChild
                    variant="outline"
                    className="rounded-xl border-gray-200 px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    <Link href="/pros">Browse All Pros</Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Section 8: Related Services ── */}
        <section className="border-b border-gray-100 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="font-display text-3xl font-bold tracking-tight text-reno-dark md:text-4xl">
                Related Services
              </h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {service.relatedServices.map((related) => (
                  <Link key={related.slug} href={`/services/${related.slug}`}>
                    <Card className="h-full rounded-xl border-gray-200 bg-white p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:border-reno-teal/30">
                      <div className="flex items-center gap-3">
                        <Wrench className="h-5 w-5 text-reno-teal" />
                        <h3 className="font-bold text-gray-900">
                          {related.name}
                        </h3>
                      </div>
                      <p className="mt-2 text-sm text-gray-500">
                        {related.why}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-reno-teal">
                        Learn more
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── City-Specific Guides (only for basement-second-unit) ── */}
        {service.slug === 'basement-second-unit' && (
          <section className="border-b border-gray-100 bg-gray-50 py-16 md:py-20">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-4xl">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-reno-teal/10">
                    <MapPin className="h-5 w-5 text-reno-teal" />
                  </div>
                  <div>
                    <h2 className="font-display text-3xl font-bold tracking-tight text-reno-dark md:text-4xl">
                      City-Specific Guides
                    </h2>
                    <p className="mt-1 text-gray-500">
                      Requirements vary by municipality — find your city
                    </p>
                  </div>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {cityGuides.map((city) => (
                    <Link key={city.slug} href={`/services/basement-second-unit/${city.slug}`}>
                      <Card className="h-full rounded-xl border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:border-reno-teal/30">
                        <CardContent className="p-5">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-reno-teal" />
                            <h3 className="font-bold text-gray-900">{city.city}</h3>
                          </div>
                          <p className="mt-1 text-xs text-gray-500">{city.region}</p>
                          <p className="mt-2 text-sm text-gray-600 line-clamp-2">{city.heroTagline}</p>
                          <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-reno-teal">
                            View guide
                            <ArrowRight className="h-3 w-3" />
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ── Section 9: FAQ ── */}
        <section className="py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-center font-display text-3xl font-bold tracking-tight text-reno-dark md:text-4xl">
                Common Questions
              </h2>
              <div className="mt-10">
                <Accordion type="single" collapsible className="w-full">
                  {service.faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`faq-${i}`}>
                      <AccordionTrigger className="text-left text-base font-semibold text-gray-900 hover:no-underline">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-600 leading-relaxed">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </section>

        {/* ── Bottom CTA ── */}
        <section className="bg-reno-dark py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
              Ready to start your {service.title.toLowerCase()} project?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-gray-400">
              Get matched with verified {service.title.toLowerCase()} pros in
              Ontario. Escrow-protected payments, GPS-verified work, and a
              permanent record of everything.
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
