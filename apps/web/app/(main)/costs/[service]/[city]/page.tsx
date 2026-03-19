import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Lightbulb,
  ArrowRight,
  ChevronRight,
  DollarSign,
  HardHat,
  Landmark,
  FileText,
} from 'lucide-react';
import {
  getAllCostParams,
  getServiceCostBySlug,
  getCityBySlug,
  getCityAdjustedPrice,
  getNearbyCities,
  formatPrice,
  formatPriceRange,
  generateCityFaqs,
  type NumericPriceRange,
} from '@/lib/data/costs';
import { services as servicePages } from '@/lib/data/services';
import { allPrograms as rebatePrograms } from '@/lib/data/rebates';
import { CostBreakdownTable } from '@/components/costs/cost-breakdown-table';
import { PriceRangeBar } from '@/components/costs/price-range-bar';
import { NearbyCityCards } from '@/components/costs/nearby-city-cards';
import { BreadcrumbJsonLd } from '@/components/costs/breadcrumb-jsonld';
import { FaqJsonLd } from '@/components/costs/faq-jsonld';

// ---------------------------------------------------------------------------
// Static params — 375 city pages
// ---------------------------------------------------------------------------
export async function generateStaticParams() {
  return getAllCostParams();
}

// ---------------------------------------------------------------------------
// SEO metadata
// ---------------------------------------------------------------------------
interface CostCityPageProps {
  params: Promise<{ service: string; city: string }>;
}

export async function generateMetadata({ params }: CostCityPageProps): Promise<Metadata> {
  const { service, city } = await params;
  const svc = getServiceCostBySlug(service);
  const cty = getCityBySlug(city);

  if (!svc || !cty) return { title: 'Not Found | RenoNext' };

  const baseRange = svc.priceRanges[0];
  const adjusted = baseRange
    ? getCityAdjustedPrice(baseRange.minCAD, baseRange.maxCAD, baseRange.labourPct, baseRange.materialPct, cty)
    : { min: 0, max: 0 };

  return {
    title: (() => {
      const full = `${svc.title} Cost ${cty.name} | ${formatPriceRange(adjusted.min, adjusted.max)}`;
      return full.length <= 60 ? full : `${svc.title} Cost ${cty.name} | Pricing`;
    })(),
    description: (() => {
      const full = `How much does ${svc.title.toLowerCase()} cost in ${cty.name}? Prices from ${formatPriceRange(adjusted.min, adjusted.max)}. See labour vs material split, permit costs, rebates, and nearby city pricing.`;
      return full.length <= 160 ? full : `${svc.title} cost in ${cty.name}: ${formatPriceRange(adjusted.min, adjusted.max)}. Labour/material split, permits, rebates, and city comparison.`;
    })(),
    alternates: {
      canonical: `https://renonext.com/costs/${service}/${city}`,
    },
  };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function CostCityPage({ params }: CostCityPageProps) {
  const { service, city } = await params;
  const svc = getServiceCostBySlug(service);
  const cty = getCityBySlug(city);

  if (!svc || !cty) notFound();

  // Adjusted prices
  const adjustedRanges: (NumericPriceRange & { adjMin: number; adjMax: number })[] =
    svc.priceRanges.map((r) => {
      const { min, max } = getCityAdjustedPrice(r.minCAD, r.maxCAD, r.labourPct, r.materialPct, cty);
      return { ...r, adjMin: min, adjMax: max };
    });

  const primaryRange = adjustedRanges[0];

  // Rebates applicable to this service + city
  const serviceTypeMap: Record<string, string[]> = {
    structural: ['structural'],
    adu: ['adu'],
    energy: ['energy'],
    general: ['general'],
  };
  const matchTypes = serviceTypeMap[svc.projectType] || ['general'];
  const applicableRebates = rebatePrograms.filter(
    (p) =>
      p.status !== 'closed' &&
      p.projectTypes.some((t) => matchTypes.includes(t)) &&
      (p.coverage === 'all-ontario' || p.coverage.includes(cty.slug)),
  );
  const totalMaxRebate = applicableRebates.reduce((sum, p) => sum + p.maxValue, 0);

  // Permit data from services.ts
  const servicePage = servicePages.find((s) => s.slug === service);
  const permits = servicePage?.permits;

  // Process steps from services.ts
  const processSteps = servicePage?.processSteps;

  // FAQs
  const faqs = generateCityFaqs(svc, cty);

  // Nearby cities
  const nearbyCities = getNearbyCities(cty.slug);

  // JSON-LD: Service + AggregateOffer
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `${svc.title} in ${cty.name}`,
    provider: {
      '@type': 'Organization',
      name: 'RenoNext',
      url: 'https://renonext.com',
    },
    areaServed: {
      '@type': 'City',
      name: cty.name,
      containedInPlace: {
        '@type': 'AdministrativeArea',
        name: 'Ontario, Canada',
      },
    },
    offers: {
      '@type': 'AggregateOffer',
      lowPrice: primaryRange?.adjMin ?? 0,
      highPrice: primaryRange?.adjMax ?? 0,
      priceCurrency: 'CAD',
      offerCount: 10,
    },
  };

  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Cost Guides', href: '/costs' },
    { name: svc.title, href: `/costs/${service}` },
    { name: cty.name, href: `/costs/${service}/${city}` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />
      <FaqJsonLd faqs={faqs} />
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
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-reno-green/10 px-3 py-1 text-xs font-semibold text-reno-green">
              <MapPin className="h-3 w-3" />
              {cty.name}, Ontario
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-600">
              {cty.region}
            </span>
          </div>
          <h1 className="font-display text-3xl leading-tight text-gray-900 sm:text-4xl">
            {svc.title} Cost in {cty.name}
          </h1>
          <p className="mt-3 text-lg text-gray-600">
            {cty.name} {svc.title.toLowerCase()} prices are{' '}
            {cty.overall > 1
              ? `${Math.round((cty.overall - 1) * 100)}% above`
              : cty.overall < 1
              ? `${Math.round((1 - cty.overall) * 100)}% below`
              : 'at'}{' '}
            the Ontario baseline.{' '}
            {primaryRange && (
              <>
                Expect to pay{' '}
                <strong className="text-gray-900">
                  {formatPriceRange(primaryRange.adjMin, primaryRange.adjMax)}
                </strong>{' '}
                {primaryRange.unit}.
              </>
            )}
          </p>

          {/* Quick stats */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-lg border border-gray-200 bg-white p-3 text-center">
              <DollarSign className="mx-auto h-5 w-5 text-reno-green" />
              <p className="mt-1 text-lg font-bold text-gray-900">
                {primaryRange ? formatPrice(primaryRange.adjMin) : '—'}
              </p>
              <p className="text-[10px] text-gray-500">Starting from</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-3 text-center">
              <Clock className="mx-auto h-5 w-5 text-reno-teal" />
              <p className="mt-1 text-sm font-bold text-gray-900">{svc.typicalTimeline}</p>
              <p className="text-[10px] text-gray-500">Typical timeline</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-3 text-center">
              <AlertTriangle className="mx-auto h-5 w-5 text-amber-500" />
              <p className="mt-1 text-lg font-bold text-gray-900">{svc.contingencyPct}%</p>
              <p className="text-[10px] text-gray-500">Contingency</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-white p-3 text-center">
              <Landmark className="mx-auto h-5 w-5 text-reno-purple" />
              <p className="mt-1 text-lg font-bold text-gray-900">
                {applicableRebates.length > 0 ? formatPrice(totalMaxRebate) : '—'}
              </p>
              <p className="text-[10px] text-gray-500">Max rebates</p>
            </div>
          </div>
        </section>

        {/* ── Cost Breakdown ──────────────────────────── */}
        <section className="mb-12">
          <h2 className="mb-4 font-display text-2xl text-gray-900">
            {svc.title} Cost Breakdown — {cty.name}
          </h2>
          <CostBreakdownTable
            ranges={adjustedRanges.map((r) => ({
              scope: r.scope,
              minCAD: r.adjMin,
              maxCAD: r.adjMax,
              unit: r.unit,
              labourPct: r.labourPct,
              materialPct: r.materialPct,
            }))}
            cityName={cty.name}
          />
        </section>

        {/* ── Price Range Bars ────────────────────────── */}
        <section className="mb-12">
          <h2 className="mb-4 font-display text-2xl text-gray-900">
            Visual Price Ranges
          </h2>
          <div className="space-y-4">
            {adjustedRanges.map((r) => (
              <PriceRangeBar
                key={r.scope}
                min={r.adjMin}
                max={r.adjMax}
                unit={r.unit}
                label={r.scope}
              />
            ))}
          </div>
        </section>

        {/* ── Labour vs Material Split ────────────────── */}
        <section className="mb-12">
          <h2 className="mb-4 font-display text-2xl text-gray-900">
            Labour vs Materials in {cty.name}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-center gap-2 mb-3">
                <HardHat className="h-5 w-5 text-reno-teal" />
                <h3 className="font-semibold text-gray-900">Labour</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">{Math.round(cty.labour * 100)}%</p>
              <p className="text-sm text-gray-500">of Toronto baseline</p>
              <p className="mt-2 text-xs text-gray-400">
                {cty.labour < 1
                  ? `Labour costs in ${cty.name} are ${Math.round((1 - cty.labour) * 100)}% below Toronto rates due to lower overhead and competitive contractor markets.`
                  : cty.labour > 1
                  ? `Labour costs in ${cty.name} are ${Math.round((cty.labour - 1) * 100)}% above Toronto due to high demand and premium market conditions.`
                  : `Labour costs in ${cty.name} match the Toronto baseline.`}
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-5">
              <div className="flex items-center gap-2 mb-3">
                <FileText className="h-5 w-5 text-reno-green" />
                <h3 className="font-semibold text-gray-900">Materials</h3>
              </div>
              <p className="text-3xl font-bold text-gray-900">{Math.round(cty.material * 100)}%</p>
              <p className="text-sm text-gray-500">of Toronto baseline</p>
              <p className="mt-2 text-xs text-gray-400">
                Material costs are relatively stable across the GTA. {cty.name} sees{' '}
                {cty.material < 1
                  ? `${Math.round((1 - cty.material) * 100)}% savings on materials`
                  : 'comparable material costs'}{' '}
                compared to Toronto.
              </p>
            </div>
          </div>
        </section>

        {/* ── Professional Fees (if engineering required) ── */}
        {svc.requiresEngineering && permits && permits.items.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 font-display text-2xl text-gray-900">
              Professional Fees
            </h2>
            <p className="mb-4 text-sm text-gray-600">
              {svc.title} in {cty.name} may require engineering or professional design services.
              These costs are in addition to the construction estimate.
            </p>
            <div className="space-y-3">
              {permits.items
                .filter((item) =>
                  item.name.toLowerCase().includes('engineer') ||
                  item.name.toLowerCase().includes('drawing') ||
                  item.name.toLowerCase().includes('geotechnical') ||
                  item.name.toLowerCase().includes('architectural'),
                )
                .map((item) => (
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
          </section>
        )}

        {/* ── Permit Costs ────────────────────────────── */}
        {permits && permits.items.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 font-display text-2xl text-gray-900">
              Permit Costs in {cty.name}
            </h2>
            {cty.permitFeeNote && (
              <p className="mb-4 text-sm text-gray-600">{cty.permitFeeNote}</p>
            )}
            <div className="space-y-3">
              {permits.items.map((item) => (
                <div
                  key={item.name}
                  className="flex items-start justify-between rounded-lg border border-gray-200 bg-white p-4"
                >
                  <div>
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.authority}</p>
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
              Full permit process
              <ArrowRight className="h-3 w-3" />
            </Link>
          </section>
        )}

        {/* ── Available Rebates ───────────────────────── */}
        {applicableRebates.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 font-display text-2xl text-gray-900">
              Available Rebates in {cty.name}
            </h2>
            <div className="space-y-3">
              {applicableRebates.map((rebate) => (
                <div
                  key={rebate.id}
                  className="rounded-lg border border-gray-200 bg-white p-4"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{rebate.name}</p>
                      <p className="text-xs text-gray-500">{rebate.adminBody}</p>
                    </div>
                    <span className="shrink-0 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-bold text-emerald-600">
                      {rebate.amount}
                    </span>
                  </div>
                  <p className="mt-2 text-xs text-gray-600">{rebate.description}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {rebate.stackable && (
                      <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-medium text-blue-600">
                        Stackable
                      </span>
                    )}
                    {rebate.deadline && (
                      <span className="rounded bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-600">
                        {rebate.deadline}
                      </span>
                    )}
                    <span className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] font-medium text-gray-500">
                      {rebate.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            {primaryRange && totalMaxRebate > 0 && (
              <div className="mt-4 rounded-xl border-2 border-emerald-200 bg-emerald-50/50 p-4">
                <p className="text-sm font-semibold text-emerald-800">
                  Net Cost After Maximum Rebates
                </p>
                <p className="mt-1 text-2xl font-bold text-emerald-700">
                  {formatPriceRange(
                    Math.max(0, primaryRange.adjMin - totalMaxRebate),
                    Math.max(0, primaryRange.adjMax - totalMaxRebate),
                  )}
                </p>
                <p className="mt-1 text-xs text-emerald-600">
                  Based on {formatPrice(totalMaxRebate)} in maximum stackable rebates.
                  Actual amounts depend on eligibility and application.
                </p>
                <Link
                  href={`/savings/${city}`}
                  className="mt-2 inline-flex items-center gap-1 text-xs font-medium text-reno-green hover:underline"
                >
                  See all rebates for {cty.name}
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            )}
          </section>
        )}

        {/* ── Phase-by-Phase Cost Timeline ────────────── */}
        {processSteps && processSteps.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 font-display text-2xl text-gray-900">
              Phase-by-Phase Timeline
            </h2>
            <div className="space-y-3">
              {processSteps.map((step, i) => (
                <div
                  key={step.title}
                  className="flex gap-4 rounded-lg border border-gray-200 bg-white p-4"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-reno-green/10 text-sm font-bold text-reno-green">
                    {i + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-gray-900">{step.title}</p>
                      {step.duration && (
                        <span className="shrink-0 text-xs text-gray-500">{step.duration}</span>
                      )}
                    </div>
                    <p className="mt-1 text-xs text-gray-500 line-clamp-2">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ── Included / Not Included ─────────────────── */}
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

        {/* ── Nearby City Comparison ──────────────────── */}
        {nearbyCities.length > 0 && (
          <section className="mb-12">
            <h2 className="mb-4 font-display text-2xl text-gray-900">
              {svc.title} Costs in Nearby Cities
            </h2>
            <NearbyCityCards currentCitySlug={cty.slug} service={svc} />
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

        {/* ── FAQs ────────────────────────────────────── */}
        <section className="mb-12">
          <h2 className="mb-4 font-display text-2xl text-gray-900">
            {svc.title} Cost FAQs — {cty.name}
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

        {/* ── CTA ─────────────────────────────────────── */}
        <section className="rounded-2xl bg-reno-dark p-8 text-center sm:p-12">
          <h2 className="font-display text-2xl text-white sm:text-3xl">
            Get a {svc.title} Quote in {cty.name}
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-gray-400">
            RenoNext-verified contractors in {cty.name} are ready to quote your project.
            Real pricing, escrow-protected payments, proof-of-work documentation.
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
              href="/pros"
              className="flex items-center gap-2 rounded-lg border border-gray-700 px-6 py-3 text-sm font-semibold text-gray-300 transition-colors hover:border-gray-500 hover:text-white"
            >
              Browse Local Pros
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
