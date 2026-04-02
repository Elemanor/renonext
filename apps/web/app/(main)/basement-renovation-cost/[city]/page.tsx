import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, CheckCircle, X, Shield, Star, Phone, ChevronRight, MapPin } from 'lucide-react';
import {
  getAllRenovationCitySlugs,
  getCityRenovationData,
  getNearbyRenovationCities,
  finishLevels,
  projectSizes,
  componentCosts,
  costDrivers,
  permitRequirementsData,
  getPriceMatrix,
  getCityAdjustedSqFtPrice,
} from '@/lib/data/basement-renovation-cost';
import { getCityBySlug, getCityAdjustedPrice } from '@/lib/data/costs';

interface PageProps {
  params: Promise<{ city: string }>;
}

export async function generateStaticParams() {
  return getAllRenovationCitySlugs().map((city) => ({ city }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city: citySlug } = await params;
  const data = getCityRenovationData(citySlug);
  if (!data) return { title: 'Not Found | RenoNext' };

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: { canonical: `https://renonext.com/basement-renovation-cost/${citySlug}` },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      url: `https://renonext.com/basement-renovation-cost/${citySlug}`,
      siteName: 'RenoNext',
      type: 'website',
    },
  };
}

export default async function BasementRenovationCostCityPage({ params }: PageProps) {
  const { city: citySlug } = await params;
  const data = getCityRenovationData(citySlug);
  if (!data) notFound();

  const cityMul = getCityBySlug(citySlug)!;
  const nearbyCities = getNearbyRenovationCities(citySlug);
  const matrix = getPriceMatrix(citySlug);

  const fmt = (n: number) =>
    new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(n);

  // Helper to look up a matrix cell
  const matrixCell = (levelName: string, sqft: number) => {
    const row = matrix.find((r) => r.level === levelName && r.size === sqft);
    return row ? `${fmt(row.min)} – ${fmt(row.max)}` : '—';
  };

  // Lowest and highest across all matrix cells for JSON-LD
  const allMins = matrix.map((r) => r.min);
  const allMaxes = matrix.map((r) => r.max);
  const lowestPrice = Math.min(...allMins);
  const highestPrice = Math.max(...allMaxes);

  // JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: `Basement Renovation in ${data.city}`,
        description: `Professional basement renovation services in ${data.city}. Complete finish packages from basic to legal apartment conversions.`,
        provider: { '@type': 'Organization', name: 'RenoNext', url: 'https://renonext.com' },
        areaServed: { '@type': 'City', name: data.city },
        offers: {
          '@type': 'AggregateOffer',
          priceCurrency: 'CAD',
          lowPrice: lowestPrice,
          highPrice: highestPrice,
          offerCount: matrix.length,
        },
      },
      {
        '@type': 'FAQPage',
        mainEntity: data.faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://renonext.com' },
          { '@type': 'ListItem', position: 2, name: 'Costs', item: 'https://renonext.com/costs' },
          { '@type': 'ListItem', position: 3, name: 'Basement Renovation', item: 'https://renonext.com/basement-renovation-cost/toronto' },
          { '@type': 'ListItem', position: 4, name: data.city, item: `https://renonext.com/basement-renovation-cost/${citySlug}` },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── 1. Hero ─────────────────────────────────────────── */}
      <section className="bg-reno-dark py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <nav className="mb-8 flex items-center gap-2 text-sm text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/costs" className="hover:text-white transition-colors">Costs</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-white">{data.city}</span>
          </nav>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-6">
            Basement Renovation Cost in {data.city}
          </h1>
          <p className="max-w-3xl text-lg text-slate-300 md:text-xl">{data.heroTagline}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button size="lg" asChild>
              <Link href="/price-check">Start Your Price Check <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800" asChild>
              <Link href="/contracts">Contract Generator</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── 2. Price Matrix ────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="mb-2 text-center text-3xl font-bold text-reno-dark md:text-4xl">
            {data.city} Basement Renovation Pricing
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-slate-600">
            City-adjusted costs for 4 finish levels and 4 project sizes.
            {cityMul.overall !== 1 && (
              <> {data.city} is approximately {Math.abs(Math.round((1 - cityMul.overall) * 100))}%{' '}
              {cityMul.overall < 1 ? 'lower' : 'higher'} than Toronto.</>
            )}
          </p>
          <div className="mx-auto max-w-5xl overflow-x-auto">
            <table className="w-full bg-white shadow-float rounded-2xl overflow-hidden">
              <thead>
                <tr className="bg-reno-dark text-white">
                  <th className="px-4 py-4 text-left text-sm font-semibold">Project Size</th>
                  {finishLevels.map((l) => (
                    <th key={l.id} className="px-4 py-4 text-left text-sm font-semibold">{l.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {projectSizes.map((size, i) => (
                  <tr key={size.sqft} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="px-4 py-4 text-sm">
                      <span className="font-medium text-reno-dark">{size.label}</span>
                      <span className="block text-xs text-slate-500">{size.typicalHome}</span>
                    </td>
                    {finishLevels.map((l) => (
                      <td key={l.id} className="px-4 py-4 text-sm text-slate-600">{matrixCell(l.name, size.sqft)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 3. Finish Level Comparison ─────────────────────── */}
      <section className="bg-[#f6f8f8] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="mb-2 text-center text-3xl font-bold text-reno-dark md:text-4xl">Finish Level Comparison</h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-slate-600">Choose the right level for your budget and goals</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {finishLevels.map((level) => {
              const adj = getCityAdjustedSqFtPrice(level.pricePerSqFtMin, level.pricePerSqFtMax, level.labourPct, level.materialPct, citySlug);
              return (
                <Card key={level.id} className="rounded-2xl shadow-float">
                  <CardContent className="p-6">
                    <h3 className="text-lg font-bold text-reno-dark">{level.name}</h3>
                    <p className="mt-1 text-2xl font-bold text-primary">{fmt(adj.min)}–{fmt(adj.max)}<span className="text-sm font-normal text-slate-500">/sq ft</span></p>
                    <p className="mt-1 text-sm text-slate-500">{level.timeline}</p>
                    <div className="mt-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Includes</p>
                      <ul className="space-y-1">
                        {level.includes.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-slate-600">
                            <CheckCircle className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-green-600" />{item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-2">Not Included</p>
                      <ul className="space-y-1">
                        {level.excludes.map((item) => (
                          <li key={item} className="flex items-start gap-2 text-sm text-slate-400">
                            <X className="h-3.5 w-3.5 mt-0.5 flex-shrink-0 text-slate-400" />{item}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="mt-4 border-t border-slate-200 pt-3">
                      <p className="text-sm text-slate-600"><span className="font-semibold">Best for:</span> {level.bestFor}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. Component Cost Breakdown ────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="mb-2 text-center text-3xl font-bold text-reno-dark md:text-4xl">Component Cost Breakdown</h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-slate-600">Individual line items for a typical 750 sq ft basement in {data.city}</p>
          <div className="overflow-hidden rounded-2xl bg-white shadow-float">
            <table className="w-full">
              <thead>
                <tr className="bg-reno-dark text-white">
                  <th className="px-6 py-4 text-left text-sm font-semibold">Component</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Price Range</th>
                  <th className="hidden px-6 py-4 text-left text-sm font-semibold sm:table-cell">Unit</th>
                </tr>
              </thead>
              <tbody>
                {componentCosts.map((c, i) => {
                  const adj = getCityAdjustedPrice(c.basePriceMin, c.basePriceMax, c.labourPct, c.materialPct, cityMul);
                  return (
                    <tr key={c.name} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="px-6 py-4 text-sm font-medium text-reno-dark">{c.name}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{fmt(adj.min)} – {fmt(adj.max)}</td>
                      <td className="hidden px-6 py-4 text-sm text-slate-500 sm:table-cell">{c.unit}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 5. Cost Drivers ────────────────────────────────── */}
      <section className="bg-[#f6f8f8] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="mb-2 text-center text-3xl font-bold text-reno-dark md:text-4xl">What Drives Basement Renovation Costs?</h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-slate-600">Major add-ons and their impact on your total budget</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {costDrivers.map((driver) => (
              <Card key={driver.title} className="rounded-2xl shadow-float">
                <CardContent className="p-6">
                  <span className="material-symbols-outlined text-primary mb-3 block" style={{ fontSize: '32px' }}>{driver.icon}</span>
                  <h3 className="font-bold text-reno-dark">{driver.title}</h3>
                  <p className="mt-1 text-sm font-semibold text-amber-700 bg-amber-50 inline-block rounded px-2 py-0.5">{driver.impact}</p>
                  <p className="mt-3 text-sm text-slate-600">{driver.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. Timeline by Scope ───────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="mb-2 text-center text-3xl font-bold text-reno-dark md:text-4xl">Project Timeline by Scope</h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-slate-600">How long each finish level typically takes in {data.city}</p>
          <div className="space-y-6">
            {finishLevels.map((level, idx) => {
              const colors = ['bg-blue-500', 'bg-green-500', 'bg-amber-500', 'bg-purple-500'];
              const widths = ['25%', '42%', '58%', '83%'];
              return (
                <div key={level.id}>
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-reno-dark">{level.name}</h3>
                    <span className="text-sm text-slate-500">{level.timeline}</span>
                  </div>
                  <div className="h-8 rounded-full bg-slate-200 overflow-hidden">
                    <div className={`h-full rounded-full ${colors[idx]}`} style={{ width: widths[idx] }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 7. Permit Requirements ─────────────────────────── */}
      <section className="bg-[#f6f8f8] py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="mb-2 text-center text-3xl font-bold text-reno-dark md:text-4xl">Permit Requirements</h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-slate-600">{data.permitInfo}</p>
          <div className="space-y-3">
            {permitRequirementsData.map((row) => (
              <div key={row.scope} className="flex items-start gap-4 rounded-xl bg-white p-4 shadow-sm">
                <div className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full ${row.required ? 'bg-amber-50' : 'bg-green-50'}`}>
                  <span className="material-symbols-outlined" style={{ fontSize: '16px', color: row.required ? '#d97706' : '#16a34a' }}>
                    {row.required ? 'description' : 'check_circle'}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-reno-dark">
                    {row.scope}
                    <span className={`ml-2 rounded px-1.5 py-0.5 text-xs font-semibold ${row.required ? 'bg-amber-50 text-amber-700' : 'bg-green-50 text-green-700'}`}>
                      {row.required ? 'Permit Required' : 'No Permit'}
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-slate-500">{row.note}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. ROI & Rental Income ─────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="mb-2 text-center text-3xl font-bold text-reno-dark md:text-4xl">Return on Investment</h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-slate-600">Basement renovations offer strong returns in {data.city}</p>
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl bg-gradient-to-br from-primary/5 to-primary/10 border border-primary/20 p-8 text-center">
              <span className="material-symbols-outlined text-primary mb-3 block" style={{ fontSize: '48px', fontVariationSettings: "'FILL' 1" }}>trending_up</span>
              <p className="text-sm font-medium text-slate-500">Average ROI at Resale</p>
              <p className="mt-2 text-4xl font-bold text-primary">{data.roiData.percentReturn}</p>
              <p className="mt-2 text-sm text-slate-600">of renovation cost recouped at sale</p>
            </div>
            <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-amber-100/50 border border-amber-200/50 p-8 text-center">
              <span className="material-symbols-outlined text-amber-600 mb-3 block" style={{ fontSize: '48px', fontVariationSettings: "'FILL' 1" }}>payments</span>
              <p className="text-sm font-medium text-slate-500">Monthly Rental Income</p>
              <p className="mt-2 text-4xl font-bold text-amber-700">{data.roiData.rentalIncome}</p>
              <p className="mt-2 text-sm text-slate-600">from a legal basement apartment</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 9. City-Specific Context ───────────────────────── */}
      <section className="bg-[#f6f8f8] py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-bold text-reno-dark md:text-4xl">
            Why {data.city} Homeowners Renovate Their Basements
          </h2>
          <div className="rounded-2xl bg-white p-8 shadow-float border-l-4 border-primary">
            <p className="text-lg leading-relaxed text-slate-700">{data.cityContext}</p>
          </div>
        </div>
      </section>

      {/* ── 10. Common Add-Ons ─────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="mb-2 text-center text-3xl font-bold text-reno-dark md:text-4xl">Common Add-Ons for {data.city}</h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-slate-600">Popular upgrades that {data.city} homeowners include</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {data.commonAddOns.map((addon) => (
              <Card key={addon.name} className="rounded-2xl shadow-float">
                <CardContent className="p-6">
                  <h3 className="font-bold text-reno-dark">{addon.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-primary">{addon.price}</p>
                  <p className="mt-2 text-sm text-slate-600">{addon.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── 11. Pricing Summary Table ──────────────────────── */}
      <section className="bg-[#f6f8f8] py-20 md:py-28">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <h2 className="mb-2 text-center text-3xl font-bold text-reno-dark md:text-4xl">Quick Pricing Summary</h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-slate-600">At-a-glance costs for {data.city} basement renovations</p>
          <div className="overflow-x-auto rounded-2xl bg-white shadow-float">
            <table className="w-full">
              <thead>
                <tr className="bg-reno-dark text-white">
                  <th className="px-4 py-3 text-left text-sm font-semibold">Size</th>
                  {finishLevels.map((l) => (
                    <th key={l.id} className="px-4 py-3 text-left text-sm font-semibold">{l.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {projectSizes.map((size, i) => (
                  <tr key={size.sqft} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="px-4 py-3 text-sm font-medium text-reno-dark">{size.label}</td>
                    {finishLevels.map((l) => (
                      <td key={l.id} className="px-4 py-3 text-sm text-slate-600">{matrixCell(l.name, size.sqft)}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 12. FAQ ────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="mb-10 text-center text-3xl font-bold text-reno-dark md:text-4xl">
            Basement Renovation FAQ — {data.city}
          </h2>
          <div className="space-y-6">
            {data.faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl bg-white p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-reno-dark">{faq.question}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 13. Nearby Cities ──────────────────────────────── */}
      {nearbyCities.length > 0 && (
        <section className="bg-[#f6f8f8] py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="mb-2 text-center text-3xl font-bold text-reno-dark md:text-4xl">Renovation Costs in Nearby Cities</h2>
            <p className="mx-auto mb-10 max-w-2xl text-center text-slate-600">Compare basement renovation pricing across the GTA</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {nearbyCities.map((nearby) => (
                <Link key={nearby.slug} href={`/basement-renovation-cost/${nearby.slug}`} className="group rounded-2xl bg-white p-6 shadow-sm transition-shadow hover:shadow-float">
                  <div className="mb-3 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <h3 className="font-bold text-reno-dark group-hover:text-primary transition-colors">{nearby.city}</h3>
                  </div>
                  <p className="text-xs text-slate-500">{nearby.region}</p>
                  <p className="mt-2 text-sm font-medium text-primary">View renovation costs →</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 14. CTA ────────────────────────────────────────── */}
      <section className="bg-reno-dark py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold text-white md:text-4xl">Start Your Basement Renovation in {data.city}</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">
            Get accurate pricing, connect with verified contractors, and protect your investment with escrow.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/price-check">Start Your Price Check <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800" asChild>
              <Link href="/contact"><Phone className="mr-2 h-5 w-5" />Contact Us</Link>
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
            <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-primary" />Free estimates</span>
            <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-primary" />Escrow-protected</span>
            <span className="flex items-center gap-1.5"><Star className="h-4 w-4 text-primary" />Verified contractors</span>
          </div>
          <div className="mt-12 border-t border-slate-700 pt-8">
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Related Resources</p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <Link href={`/costs/basement-second-unit/${citySlug}`} className="text-slate-400 hover:text-primary transition-colors">Basement Apartment Cost</Link>
              <span className="text-slate-700">|</span>
              <Link href="/services/basement-second-unit" className="text-slate-400 hover:text-primary transition-colors">Second Unit Services</Link>
              <span className="text-slate-700">|</span>
              <Link href={`/best-underpinning/${citySlug}`} className="text-slate-400 hover:text-primary transition-colors">Underpinning in {data.city}</Link>
              <span className="text-slate-700">|</span>
              <Link href="/renovation-calculator" className="text-slate-400 hover:text-primary transition-colors">Renovation Calculator</Link>
              <span className="text-slate-700">|</span>
              <Link href="/contracts" className="text-slate-400 hover:text-primary transition-colors">Contract Generator</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
