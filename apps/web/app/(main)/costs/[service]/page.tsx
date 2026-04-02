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
import { DeckViewerWrapper } from '@/components/3d/deck-viewer-wrapper';

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
    title: (() => {
      const full = `${svc.title} Cost Ontario | ${rangeStr}`;
      return full.length <= 60 ? full : `${svc.title} Cost Ontario | Pricing`;
    })(),
    description: (() => {
      const full = `How much does ${svc.title.toLowerCase()} cost in Ontario? Prices range from ${rangeStr}. See scope breakdowns, labour vs material split, city-by-city pricing, and tips to save.`;
      return full.length <= 160 ? full : `${svc.title} cost in Ontario: ${rangeStr}. Scope breakdowns, labour/material split, city pricing, and savings tips.`;
    })(),
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
        <nav className="mb-8 flex items-center gap-1.5 text-xs text-slate-400">
          {breadcrumbs.map((bc, i) => (
            <span key={bc.href} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="h-3 w-3" />}
              {i < breadcrumbs.length - 1 ? (
                <Link href={bc.href} className="hover:text-slate-600">
                  {bc.name}
                </Link>
              ) : (
                <span className="text-slate-600">{bc.name}</span>
              )}
            </span>
          ))}
        </nav>

        {/* ── Hero ─────────────────────────────────────── */}
        <section className="mb-12">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
            {svc.category} · Cost Guide
          </p>
          <h1 className="mt-2 font-display text-3xl leading-tight text-slate-900 sm:text-4xl">
            How Much Does {svc.title} Cost in Ontario?
          </h1>
          <p className="mt-3 text-lg text-slate-600">
            {svc.title} costs in Ontario range from{' '}
            {primaryRange && (
              <strong className="text-slate-900">
                {formatPriceRange(primaryRange.minCAD, primaryRange.maxCAD)}
              </strong>
            )}{' '}
            {primaryRange?.unit}. Prices vary by scope, city, and site conditions.
          </p>

          {/* Quick stats row */}
          <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-3">
            <div className="rounded-lg border border-slate-200 bg-white p-3 text-center">
              <DollarSign className="mx-auto h-5 w-5 text-reno-green" />
              <p className="mt-1 text-lg font-bold text-slate-900">
                {primaryRange ? formatPrice(primaryRange.minCAD) : '—'}+
              </p>
              <p className="text-[10px] text-slate-500">Starting price</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-3 text-center">
              <Clock className="mx-auto h-5 w-5 text-reno-teal" />
              <p className="mt-1 text-sm font-bold text-slate-900">{svc.typicalTimeline}</p>
              <p className="text-[10px] text-slate-500">Timeline</p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-3 text-center">
              <AlertTriangle className="mx-auto h-5 w-5 text-amber-500" />
              <p className="mt-1 text-lg font-bold text-slate-900">{svc.contingencyPct}%</p>
              <p className="text-[10px] text-slate-500">Recommended contingency</p>
            </div>
          </div>
        </section>

        {/* ── 3D Deck Viewer (decks only) ────────────── */}
        {service === 'decks' && (
          <section className="mb-12">
            <h2 className="mb-2 font-display text-2xl text-slate-900">
              Interactive 3D Deck Model
            </h2>
            <p className="mb-4 text-sm text-slate-500">
              Explore a typical 8&prime;&nbsp;&times;&nbsp;10&prime; deck build step by step — footings through railing.
            </p>
            <DeckViewerWrapper skpDownloadUrl="/models/deck-8x10.skp" />
          </section>
        )}

        {/* ── Cost Breakdown Table ────────────────────── */}
        <section className="mb-12">
          <h2 className="mb-4 font-display text-2xl text-slate-900">
            {svc.title} Cost Breakdown
          </h2>
          <CostBreakdownTable ranges={svc.priceRanges} />
        </section>

        {/* ── Visual Price Ranges ─────────────────────── */}
        <section className="mb-12">
          <h2 className="mb-4 font-display text-2xl text-slate-900">
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
          <h2 className="mb-4 font-display text-2xl text-slate-900">
            What&apos;s Included vs Not Included
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-reno-green-200 bg-reno-green-50/30 p-5">
              <h3 className="mb-3 flex items-center gap-2 font-semibold text-reno-green-800">
                <CheckCircle className="h-4 w-4" />
                Typically Included
              </h3>
              <ul className="space-y-2">
                {svc.includedInPrice.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
                    <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-reno-green-500" />
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
                  <li key={item} className="flex items-start gap-2 text-sm text-slate-700">
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
            <h2 className="mb-2 font-display text-2xl text-slate-900">
              {svc.title} Cost by City
            </h2>
            <p className="mb-4 text-sm text-slate-500">
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
            <h2 className="mb-4 font-display text-2xl text-slate-900">
              Permit &amp; Engineering Costs
            </h2>
            <div className="space-y-3">
              {permits.items.map((item) => (
                <div
                  key={item.name}
                  className="flex items-start justify-between rounded-lg border border-slate-200 bg-white p-4"
                >
                  <div>
                    <p className="font-medium text-slate-900">{item.name}</p>
                    <p className="text-xs text-slate-500">{item.authority}</p>
                    {item.notes && (
                      <p className="mt-1 text-xs text-slate-400">{item.notes}</p>
                    )}
                  </div>
                  <p className="shrink-0 text-sm font-semibold text-slate-800">
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
          <h2 className="mb-4 font-display text-2xl text-slate-900">
            Money-Saving Tips
          </h2>
          <div className="space-y-3">
            {svc.costTips.map((tip) => (
              <div
                key={tip}
                className="flex items-start gap-3 rounded-lg border border-slate-200 bg-white p-4"
              >
                <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" />
                <p className="text-sm text-slate-700">{tip}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Related Cost Guides ─────────────────────── */}
        {relatedCosts.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 font-display text-2xl text-slate-900">
              Related Cost Guides
            </h2>
            <div className="grid gap-3 sm:grid-cols-3">
              {relatedCosts.map((rc) => (
                <Link
                  key={rc.slug}
                  href={`/costs/${rc.slug}`}
                  className="group rounded-xl border border-slate-200 bg-white p-4 transition-all hover:border-reno-green/30 hover:shadow-md"
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                    {rc.category}
                  </p>
                  <p className="mt-1 font-semibold text-slate-900 group-hover:text-reno-green">
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
            <h2 className="mb-4 font-display text-2xl text-slate-900">
              {svc.title} Cost FAQs
            </h2>
            <div className="space-y-4">
              {faqs.map((faq) => (
                <div key={faq.q} className="rounded-lg border border-slate-200 bg-white p-5">
                  <h3 className="font-semibold text-slate-900">{faq.q}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">{faq.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Shop Cross-Link ────────────────────────── */}
        <section className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0fbabd]/10">
              <span className="material-symbols-outlined text-[#0fbabd]">shopping_cart</span>
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-slate-900">
                Shop Supplies for This Project
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Browse tools, materials, and safety gear for your {svc.title.toLowerCase()} project — curated for Canadian renovations.
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-[#0fbabd]/10 px-3 py-1.5 text-xs font-medium text-[#0fbabd] transition-colors hover:bg-[#0fbabd]/20"
                >
                  Browse All
                  <ChevronRight className="h-3 w-3" />
                </Link>
                <Link
                  href="/shop/safety-equipment"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-200"
                >
                  Safety Gear
                </Link>
                <Link
                  href="/shop/hand-tools"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-200"
                >
                  Hand Tools
                </Link>
                <Link
                  href="/shop/power-tools"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-200"
                >
                  Power Tools
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────── */}
        <section className="rounded-2xl bg-reno-dark p-8 text-center sm:p-12">
          <h2 className="font-display text-2xl text-white sm:text-3xl">
            Ready to Get {svc.title} Pricing?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-slate-400">
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
              className="flex items-center gap-2 rounded-lg border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
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
