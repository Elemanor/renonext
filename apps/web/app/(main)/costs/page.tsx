import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, MapPin, Search } from 'lucide-react';
import {
  serviceCosts,
  cityMultipliers,
  costCategories,
  formatPrice,
} from '@/lib/data/costs';
import { ServiceCostCard } from '@/components/costs/service-cost-card';
import { BreadcrumbJsonLd } from '@/components/costs/breadcrumb-jsonld';

// ---------------------------------------------------------------------------
// SEO metadata
// ---------------------------------------------------------------------------
export const metadata: Metadata = {
  title: 'Renovation Cost Guides — Ontario 2026 | RenoNext',
  description:
    'How much does renovation work cost in Ontario? Browse 25 detailed cost guides with city-specific pricing for 15 GTA cities. Labour/material breakdowns, permit costs, rebates, and money-saving tips.',
  alternates: {
    canonical: 'https://renonext.com/costs',
  },
};

// ---------------------------------------------------------------------------
// Popular search links for SEO (high-value queries)
// ---------------------------------------------------------------------------
const popularSearches = [
  { label: 'Underpinning cost Toronto', href: '/costs/underpinning/toronto' },
  { label: 'Waterproofing cost Mississauga', href: '/costs/waterproofing/mississauga' },
  { label: 'Basement apartment cost Brampton', href: '/costs/basement-second-unit/brampton' },
  { label: 'Foundation repair cost Vaughan', href: '/costs/foundation-repair/vaughan' },
  { label: 'Electrical cost Markham', href: '/costs/electrical/markham' },
  { label: 'Roofing cost Oakville', href: '/costs/roofing/oakville' },
  { label: 'Concrete driveway cost Hamilton', href: '/costs/concrete-works/hamilton' },
  { label: 'HVAC cost Richmond Hill', href: '/costs/hvac/richmond-hill' },
  { label: 'Plumbing cost Ajax', href: '/costs/plumbing/ajax' },
  { label: 'Deck cost Burlington', href: '/costs/decks/burlington' },
  { label: 'Home addition cost Toronto', href: '/costs/additions/toronto' },
  { label: 'Painting cost Oshawa', href: '/costs/painting/oshawa' },
];

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function CostsHubPage() {
  const breadcrumbs = [
    { name: 'Home', href: '/' },
    { name: 'Cost Guides', href: '/costs' },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbs} />

      <div className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
        {/* ── Hero ─────────────────────────────────────── */}
        <section className="mb-12 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-reno-green">
            2026 Pricing Data
          </p>
          <h1 className="mt-3 font-display text-3xl leading-tight text-slate-900 sm:text-5xl">
            How Much Does a Renovation<br className="hidden sm:block" /> Cost in Ontario?
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">
            Real pricing data for 25 renovation services across 15 GTA cities.
            Labour and material breakdowns, permit costs, available rebates, and
            money-saving tips from verified contractors.
          </p>
        </section>

        {/* ── Service Grid by Category ────────────────── */}
        {costCategories.map((category) => {
          const services = serviceCosts.filter((s) => s.category === category);
          return (
            <section key={category} className="mb-12">
              <h2 className="mb-5 font-display text-2xl text-slate-900">{category}</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {services.map((svc) => (
                  <ServiceCostCard
                    key={svc.slug}
                    slug={svc.slug}
                    title={svc.title}
                    category={svc.category}
                    startingPrice={svc.startingPrice}
                    unit={svc.priceRanges[0]?.unit ?? ''}
                    timeline={svc.typicalTimeline}
                  />
                ))}
              </div>
            </section>
          );
        })}

        {/* ── Popular Searches ────────────────────────── */}
        <section className="mb-12">
          <h2 className="mb-4 font-display text-2xl text-slate-900">
            Popular Cost Searches
          </h2>
          <div className="flex flex-wrap gap-2">
            {popularSearches.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-700 transition-all hover:border-reno-green/30 hover:text-reno-green hover:shadow-sm"
              >
                <Search className="h-3 w-3 text-slate-400" />
                {s.label}
              </Link>
            ))}
          </div>
        </section>

        {/* ── City Selector ───────────────────────────── */}
        <section className="mb-12">
          <h2 className="mb-4 font-display text-2xl text-slate-900">
            Pricing by City
          </h2>
          <p className="mb-5 text-sm text-slate-500">
            Select a city to see adjusted pricing for all services.
            Labour and material multipliers based on Toronto (1.0x) baseline.
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {cityMultipliers.map((city) => {
              const diff = Math.round((city.overall - 1) * 100);
              return (
                <Link
                  key={city.slug}
                  href={`/costs/underpinning/${city.slug}`}
                  className="group flex flex-col rounded-xl border border-slate-200 bg-white p-3 transition-all hover:border-reno-green/30 hover:shadow-md"
                >
                  <div className="flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-slate-400 group-hover:text-reno-green" />
                    <span className="text-sm font-semibold text-slate-900">{city.name}</span>
                  </div>
                  <p className="mt-0.5 text-[10px] text-slate-400">{city.region}</p>
                  <span
                    className={`mt-2 self-start rounded-full px-2 py-0.5 text-[10px] font-medium ${
                      diff > 0
                        ? 'bg-red-50 text-red-600'
                        : diff < 0
                        ? 'bg-reno-green-50 text-reno-green-600'
                        : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {diff > 0 ? '+' : ''}{diff}% vs Toronto
                  </span>
                </Link>
              );
            })}
          </div>
        </section>

        {/* ── Report Banner ───────────────────────────── */}
        <section className="mb-12">
          <Link
            href="/renovation-cost-report"
            className="group flex items-center justify-between rounded-2xl bg-reno-dark p-6 transition-all hover:shadow-float-hover"
          >
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
                <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>analytics</span>
              </div>
              <div>
                <p className="font-bold text-white text-lg">2026 Ontario Renovation Cost Report</p>
                <p className="text-sm text-slate-400 mt-0.5">25 services, 15 cities, 375+ price points — free data report</p>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 text-slate-400 group-hover:text-primary transition-colors" />
          </Link>
        </section>

        {/* ── Cross-links ─────────────────────────────── */}
        <section className="mb-12 grid gap-4 sm:grid-cols-3">
          <Link
            href="/services"
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-reno-green/30 hover:shadow-md"
          >
            <div>
              <p className="font-semibold text-slate-900">Service Guides</p>
              <p className="text-xs text-slate-500">Process, permits &amp; warnings</p>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400" />
          </Link>
          <Link
            href="/savings"
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-reno-green/30 hover:shadow-md"
          >
            <div>
              <p className="font-semibold text-slate-900">Savings Calculator</p>
              <p className="text-xs text-slate-500">Rebates &amp; incentives by city</p>
            </div>
            <ArrowRight className="h-4 w-4 text-slate-400" />
          </Link>
          <Link
            href="/price-check"
            className="flex items-center justify-between rounded-xl border border-slate-200 bg-reno-green/5 p-5 transition-all hover:border-reno-green/30 hover:shadow-md"
          >
            <div>
              <p className="font-semibold text-reno-green">Price Check</p>
              <p className="text-xs text-slate-500">Instant estimate for your project</p>
            </div>
            <ArrowRight className="h-4 w-4 text-reno-green" />
          </Link>
        </section>

        {/* ── CTA ─────────────────────────────────────── */}
        <section className="rounded-2xl bg-reno-dark p-8 text-center sm:p-12">
          <h2 className="font-display text-2xl text-white sm:text-3xl">
            Not Sure What It&apos;ll Cost?
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm text-slate-400">
            Our Price Check tool gives you an instant estimate based on your
            project scope, location, and timeline. No signup required.
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
              className="flex items-center gap-2 rounded-lg border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-300 transition-colors hover:border-slate-500 hover:text-white"
            >
              Browse Pros
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
