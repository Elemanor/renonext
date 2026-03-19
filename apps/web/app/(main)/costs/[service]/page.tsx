import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Lightbulb,
  ArrowRight,
  ChevronRight,
  DollarSign,
  FileText,
} from 'lucide-react';
import {
  getAllServiceSlugs,
  getServiceCostBySlug,
  formatPrice,
  formatPriceRange,
  serviceCosts,
} from '@/lib/data/costs';
import { services as servicePages } from '@/lib/data/services';
import { CostBreakdownTable } from '@/components/costs/cost-breakdown-table';
import { PriceRangeBar } from '@/components/costs/price-range-bar';
import { CityComparisonTable } from '@/components/costs/city-comparison-table';
import { BreadcrumbJsonLd } from '@/components/costs/breadcrumb-jsonld';
import { FaqJsonLd } from '@/components/costs/faq-jsonld';

// ---------------------------------------------------------------------------
// Static params — 25 service pages
// ---------------------------------------------------------------------------
export async function generateStaticParams() {
  return getAllServiceSlugs().map((s) => ({ service: s }));
}

// ---------------------------------------------------------------------------
// SEO metadata
// ---------------------------------------------------------------------------
interface ServiceCostPageProps {
  params: Promise<{ service: string }>;
}

export async function generateMetadata({ params }: ServiceCostPageProps): Promise<Metadata> {
  const { service } = await params;
  const svc = getServiceCostBySlug(service);

  if (!svc) return { title: 'Not Found | RenoNext' };

  const baseRange = svc.priceRanges[0];
  const rangeStr = baseRange ? formatPriceRange(baseRange.minCAD, baseRange.maxCAD) : '';

  return {
    title: `${svc.title} Cost in Ontario 2026 | ${rangeStr} | RenoNext`,
    description: `How much does ${svc.title.toLowerCase()} cost in Ontario? Prices from ${rangeStr}. See breakdowns by scope, labour/material split, city-by-city comparison, and money-saving tips.`,
    alternates: {
      canonical: `https://renonext.com/costs/${service}`,
    },
  };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function ServiceCostPage({ params }: ServiceCostPageProps) {
  const { service } = await params;
  const svc = getServiceCostBySlug(service);

  if (!svc) notFound();

  const primaryRange = svc.priceRanges[0];
  const servicePage = servicePages.find((s) => s.slug === service);
  const faqs = servicePage?.faqs?.slice(0, 5) ?? [];
  const permits = servicePage?.permits;

  // Related cost guides
  const relatedServices = servicePage?.relatedServices ?? [];
  const relatedCosts = relatedServices
    .map((r) => serviceCosts.find((sc) => sc.slug === r.slug))
    .filter((sc): sc is NonNullable<typeof sc> => sc !== undefined)
    .slice(0, 3);

  // JSON-LD
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${svc.title} in Ontario`,
    provider: {
      '@type': 'Organization',
      name: 'RenoNext',
      url: 'https://renonext.com',
    },
    areaServed: {
      '@type': 'AdministrativeArea',
      name: 'Ontario, Canada',
    },
    offers: primaryRange
      ? {
          '@type': 'AggregateOffer',
          lowPrice: primaryRange.minCAD,
          highPrice: primaryRange.maxCAD,
          priceCurrency: 'CAD',
          offerCount: 15,
        }
      : undefined,
  };

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Cost Guides', href: '/costs' },
    { name: svc.title, href: `/costs/${service}` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      {faqs.length > 0 && <FaqJsonLd faqs={faqs} />}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }}
      />

      <div className="mx-auto max-w-4xl px-5 py-12 lg:px-8">
        {/* Breadcrumbs */}
        <nav className="mb-8 flex items-center gap-1.5 text-xs text-gray-400">
          {breadcrumbs.map((bc, i) => (
            <span key={bc.href} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="h-3 w-3" />}
              {i < breadcrumbs.length - 1 ? (
                <Link href={bc.href} className="hover:text-gray-600">
                  {bc.name}
                </Link>
              ) : (
                <span className="text-gray-600">{bc.name}</span>
              )}
            </span>
          ))}
        </nav>

        {/* ── Hero ─────────────────────────────────────── */}
        <section className="mb-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
            {svc.category} · Cost Guide
          </p>
          <h1 className="mt-2 font-display text-3xl leading-tight text-gray-900 sm:text-4xl">
            How Much Does {svc.title} Cost in Ontario?
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            {svc.title} costs in Ontario range from{' '}
            {primaryRange && (
              <strong className="text-gray-900">
                {formatPriceRange(primaryRange.minCAD, primaryRange.maxCAD)}
              </strong>
            )}{' '}
            {primaryRange?.unit}. Prices vary by scope, city, and site conditions.
          </p>

          {/* Quick stats row */}
          <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-gray-200 bg-white p-3 text-center">
              <DollarSign className="mx-auto h-5 w-5 text-reno-green" />
              <p className="mt-1 text-lg font-bold text-gray-900">
                {primaryRange ? formatPrice(primaryRange.minCAD) : '—'}+
              </p>
              <p className="text-[10px] text-gray-500">Starting price</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-3 text-center">
              <Clock className="mx-auto h-5 w-5 text-reno-teal" />
              <p className="mt-1 text-sm font-bold text-gray-900">{svc.typicalTimeline}</p>
              <p className="text-[10px] text-gray-500">Timeline</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-3 text-center">
              <AlertTriangle className="mx-auto h-5 w-5 text-amber-500" />
              <p className="mt-1 text-lg font-bold text-gray-900">{svc.contingencyPct}%</p>
              <p className="text-[10px] text-gray-500">Recommended contingency</p>
            </div>
          </div>
        </section>

        {/* ── Cost Breakdown Table ────────────────────── */}
        <section className="mb-12">
          <h2 className="mb-4 font-display text-2xl text-gray-900">
            {svc.title} Cost Breakdown
          </h2>
          <CostBreakdownTable ranges={svc.priceRanges} />
        </section>

        {/* ── Visual Price Ranges ─────────────────────── */}
        <section className="mb-12">
          <h2 className="mb-4 font-display text-2xl text-gray-900">
            Price Ranges at a Glance
          </h2>
          <div className="space-y-4">
            {svc.priceRanges.map((r) => (
              <PriceRangeBar
                key={r.scope}
                min={r.minCAD}
                max={r.maxCAD}
                unit={r.unit}
                label={r.scope}
              />
            ))}
          </div>
        </section>

        {/* ── What's Included / Not Included ──────────── */}
        <section className="mb-12">
          <h2 className="mb-4 font-display text-2xl text-gray-900">
            What&apos;s Included vs Not Included
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/30 p-5">
              <h3 className="mb-3 flex items-center gap-2 font-semibold text-emerald-800">
                <CheckCircle className="h-4 w-4" />
                Typically Included
              </h3>
              <ul className="space-y-2">
                {svc.includedInPrice.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-500" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-red-200 bg-red-50/30 p-5">
              <h3 className="mb-3 flex items-center gap-2 font-semibold text-red-800">
                <XCircle className="h-4 w-4" />
                Not Included (Extra Cost)
              </h3>
              <ul className="space-y-2">
                {svc.notIncludedInPrice.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-gray-700">
                    <XCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-red-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── City Comparison (SEO magnet) ────────────── */}
        {primaryRange && (
          <section className="mb-12">
            <h2 className="mb-2 font-display text-2xl text-gray-900">
              {svc.title} Cost by City
            </h2>
            <p className="mb-4 text-sm text-gray-500">
              Prices adjusted for local labour rates and material costs across 15 GTA cities.
            </p>
            <CityComparisonTable
              serviceSlug={svc.slug}
              serviceTitle={svc.title}
              baseRange={primaryRange}
            />
          </section>
        )}

        {/* ── Permit Costs ────────────────────────────── */}
        {permits && permits.items.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 font-display text-2xl text-gray-900">
              Permit &amp; Engineering Costs
            </h2>
            <div className="space-y-3">
              {permits.items.map((item) => (
                <div
                  key={item.name}
                  className="flex items-start justify-between rounded-lg border border-gray-200 bg-white p-4"
                >
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.authority}</p>
                    {item.notes && (
                      <p className="mt-1 text-xs text-gray-400">{item.notes}</p>
                    )}
                  </div>
                  <p className="shrink-0 text-sm font-semibold text-gray-800">
                    {item.typical_cost}
                  </p>
                </div>
              ))}
            </div>
            <Link
              href={`/services/${service}`}
              className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-reno-green hover:underline"
            >
              <FileText className="h-3 w-3" />
              Full {svc.title.toLowerCase()} process &amp; permit guide
              <ArrowRight className="h-3 w-3" />
            </Link>
          </section>
        )}

        {/* ── Money-Saving Tips ───────────────────────── */}
        <section className="mb-12">
          <h2 className="mb-4 font-display text-2xl text-gray-900">
            Money-Saving Tips
          </h2>
          <div className="space-y-3">
            {svc.costTips.map((tip) => (
              <div
                key={tip}
                className="flex items-start gap-3 rounded-lg border border-gray-200 bg-white p-4"
              >
                <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                <p className="text-sm text-gray-700">{tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Related Cost Guides ─────────────────────── */}
        {relatedCosts.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 font-display text-2xl text-gray-900">
              Related Cost Guides
            </h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {relatedCosts.map((rc) => (
                <Link
                  key={rc.slug}
                  href={`/costs/${rc.slug}`}
                  className="group rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-reno-green/30 hover:shadow-md"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-gray-400">
                    {rc.category}
                  </p>
                  <p className="mt-1 font-semibold text-gray-900 group-hover:text-reno-green">
                    {rc.title}
                  </p>
                  <p className="mt-2 text-sm font-bold tabular-nums text-reno-green">
                    From {formatPrice(rc.startingPrice)}
                  </p>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* ── FAQs ────────────────────────────────────── */}
        {faqs.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 font-display text-2xl text-gray-900">
              {svc.title} Cost FAQs
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.q} className="rounded-lg border border-gray-200 bg-white p-5">
                  <h3 className="font-semibold text-gray-900">{faq.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-gray-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── CTA ─────────────────────────────────────── */}
        <section className="rounded-2xl bg-reno-dark p-8 text-center sm:p-12">
          <h2 className="font-display text-2xl text-white sm:text-3xl">
            Ready to Get {svc.title} Pricing?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-gray-400">
            Get instant pricing with our free Price Check tool, or browse vetted{' '}
            {svc.title.toLowerCase()} contractors in your area.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/price-check"
              className="flex items-center gap-2 rounded-lg bg-reno-green px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-reno-green-dark"
            >
              Get a Price Check
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/contracts"
              className="flex items-center gap-2 rounded-lg border border-gray-700 px-6 py-3 text-sm font-semibold text-gray-300 transition-colors hover:border-gray-500 hover:text-white"
            >
              <FileText className="h-4 w-4" />
              Generate a Contract
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
