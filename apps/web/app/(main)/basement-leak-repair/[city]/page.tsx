import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowRight,
  CheckCircle,
  ChevronRight,
  MapPin,
  Phone,
  Shield,
  Star,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  getAllLeakRepairCitySlugs,
  getCityLeakRepairData,
  getNearbyLeakRepairCities,
  warningSignsData,
  repairMethods,
  diagnosisSteps,
  preventionTips,
  rebateProgramsData,
  getMethodPriceForCity,
} from '@/lib/data/basement-leak-repair';
import { getCityBySlug } from '@/lib/data/costs';

// ---------------------------------------------------------------------------
// Static params — 15 city pages
// ---------------------------------------------------------------------------
export async function generateStaticParams() {
  return getAllLeakRepairCitySlugs().map((city) => ({ city }));
}

// ---------------------------------------------------------------------------
// SEO metadata
// ---------------------------------------------------------------------------
interface PageProps {
  params: Promise<{ city: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const data = getCityLeakRepairData(city);
  if (!data) return { title: 'Not Found | RenoNext' };

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: {
      canonical: `https://renonext.com/basement-leak-repair/${city}`,
    },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      url: `https://renonext.com/basement-leak-repair/${city}`,
      siteName: 'RenoNext',
      type: 'website',
    },
  };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function BasementLeakRepairCityPage({ params }: PageProps) {
  const { city: citySlug } = await params;
  const data = getCityLeakRepairData(citySlug);
  if (!data) notFound();

  const cityMul = getCityBySlug(citySlug)!;
  const nearbyCities = getNearbyLeakRepairCities(citySlug);

  const pricingRows = repairMethods.map((method) => {
    const adjusted = getMethodPriceForCity(method, citySlug);
    return { name: method.name, min: adjusted.min, max: adjusted.max, unit: method.unit };
  });

  const fmt = (n: number) =>
    new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(n);

  // JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        name: `Basement Leak Repair in ${data.city}`,
        provider: {
          '@type': 'LocalBusiness',
          name: 'RenoNext',
          url: 'https://renonext.com',
        },
        areaServed: { '@type': 'City', name: data.city, addressRegion: 'ON', addressCountry: 'CA' },
        serviceType: 'Basement Leak Repair',
        description: data.metaDescription,
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
          { '@type': 'ListItem', position: 2, name: 'Services', item: 'https://renonext.com/services' },
          { '@type': 'ListItem', position: 3, name: 'Basement Leak Repair', item: 'https://renonext.com/services/waterproofing' },
          { '@type': 'ListItem', position: 4, name: data.city, item: `https://renonext.com/basement-leak-repair/${citySlug}` },
        ],
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ── 1. Hero ───────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-reno-dark py-20 md:py-28">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(15,186,189,0.15),transparent_60%)]" />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <nav className="mb-8 flex items-center gap-1.5 text-sm text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/services" className="hover:text-white transition-colors">Services</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <Link href="/services/waterproofing" className="hover:text-white transition-colors">Basement Leak Repair</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="text-primary">{data.city}</span>
          </nav>
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                <MapPin className="h-4 w-4" />
                {data.city}, {data.region}
              </div>
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                Basement Leak Repair in{' '}
                <span className="text-primary">{data.city}</span> — 2026 Guide
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
                {data.heroTagline}
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link href="/price-check">Get Price Check <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800" asChild>
                  <Link href="/contact"><Phone className="mr-2 h-5 w-5" />Contact Us</Link>
                </Button>
              </div>
              {/* Trust bar */}
              <div className="mt-8 flex flex-wrap gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1"><CheckCircle className="h-3.5 w-3.5 text-primary" />Free Assessment</span>
                <span className="flex items-center gap-1"><Shield className="h-3.5 w-3.5 text-primary" />Escrow Protected</span>
                <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 text-primary" />GPS-Verified Work</span>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <Image src="/images/pros/dryspace/exterior-2.webp" alt={`Basement leak repair in ${data.city}`} width={640} height={480} className="rounded-2xl shadow-2xl" priority />
              <div className="absolute -bottom-4 -left-4 rounded-xl bg-white p-4 shadow-float">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Shield className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-reno-dark">RenoNext Verified</p>
                    <p className="text-xs text-slate-500">Licensed + Insured + Bonded</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. Warning Signs ──────────────────────────────────── */}
      <section className="bg-[#f6f8f8] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="mb-2 text-center text-3xl font-bold text-reno-dark md:text-4xl">
            Warning Signs Your {data.city} Basement Needs Repair
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-slate-600">
            If you notice any of these signs in your {data.city} home, it&apos;s time for a professional leak assessment.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {warningSignsData.map((sign) => {
              const severityColors = {
                urgent: 'bg-red-50 text-red-700',
                moderate: 'bg-amber-50 text-amber-700',
                monitor: 'bg-blue-50 text-blue-700',
              };
              return (
                <Card key={sign.title} className="rounded-2xl border-0 bg-white shadow-float">
                  <CardContent className="p-6">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
                      <span className="material-symbols-outlined text-red-500">{sign.icon}</span>
                    </div>
                    <span className={`mb-2 inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold ${severityColors[sign.severity]}`}>
                      {sign.severity === 'urgent' ? 'Urgent' : sign.severity === 'moderate' ? 'Moderate' : 'Monitor'}
                    </span>
                    <h3 className="mb-2 text-base font-bold text-reno-dark">{sign.title}</h3>
                    <p className="text-sm text-slate-600">{sign.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 3. Diagnosis Methodology ──────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="mb-2 text-center text-3xl font-bold text-reno-dark md:text-4xl">
            How Professionals Diagnose Basement Leaks
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-slate-600">
            A proper diagnosis determines the most effective and cost-efficient repair method for your {data.city} home.
          </p>
          <div className="space-y-6">
            {diagnosisSteps.map((step) => (
              <div key={step.step} className="rounded-2xl border border-slate-100 p-6 shadow-sm">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                    <span className="text-lg font-bold text-primary">{step.step}</span>
                  </div>
                  <div className="flex-1">
                    <h3 className="mb-2 text-lg font-bold text-reno-dark">{step.title}</h3>
                    <p className="mb-3 text-sm text-slate-600">{step.description}</p>
                    <div className="flex flex-wrap gap-2">
                      <span className="text-xs font-semibold text-slate-400">Tools needed:</span>
                      {step.tools.map((tool) => (
                        <span key={tool} className="rounded-full bg-slate-50 px-2.5 py-1 text-xs text-slate-600">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Repair Methods Comparison ──────────────────────── */}
      <section className="bg-[#f6f8f8] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="mb-2 text-center text-3xl font-bold text-reno-dark md:text-4xl">
            Basement Leak Repair Methods — Comparison
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-slate-600">
            Different leak problems require different solutions. Here&apos;s how the main repair methods compare for {data.city} homes.
          </p>
          <div className="overflow-hidden rounded-2xl bg-white shadow-float">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-reno-dark text-white">
                    <th className="px-5 py-4 text-left text-sm font-semibold">Method</th>
                    <th className="px-5 py-4 text-left text-sm font-semibold">Best For</th>
                    <th className="px-5 py-4 text-left text-sm font-semibold">Price ({data.city})</th>
                    <th className="px-5 py-4 text-left text-sm font-semibold">Timeline</th>
                    <th className="hidden px-5 py-4 text-left text-sm font-semibold lg:table-cell">Effectiveness</th>
                  </tr>
                </thead>
                <tbody>
                  {repairMethods.map((method, i) => {
                    const adjusted = getMethodPriceForCity(method, citySlug);
                    return (
                      <tr key={method.id} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                        <td className="px-5 py-3 text-sm font-medium text-reno-dark">{method.name}</td>
                        <td className="px-5 py-3 text-sm text-slate-600">{method.bestFor}</td>
                        <td className="px-5 py-3 text-sm text-slate-600">
                          {fmt(adjusted.min)}–{fmt(adjusted.max)} <span className="text-xs text-slate-400">/ {method.unit}</span>
                        </td>
                        <td className="px-5 py-3 text-sm text-slate-600">{method.timeline}</td>
                        <td className="hidden px-5 py-3 text-sm text-slate-600 lg:table-cell">{method.effectiveness}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. Method Deep-Dive ────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="mb-2 text-center text-3xl font-bold text-reno-dark md:text-4xl">
            Basement Leak Repair Methods — How They Work
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-slate-600">
            Step-by-step process for each repair method with {data.city}-adjusted pricing.
          </p>
          <div className="space-y-16">
            {repairMethods.map((method, idx) => {
              const adjusted = getMethodPriceForCity(method, citySlug);
              const isEven = idx % 2 === 0;
              return (
                <div key={method.id} className={`grid items-center gap-8 lg:grid-cols-2 ${isEven ? '' : 'lg:[direction:rtl]'}`}>
                  <div className={isEven ? '' : 'lg:[direction:ltr]'}>
                    <div className="rounded-2xl bg-[#f6f8f8] p-8">
                      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                        <span className="material-symbols-outlined text-primary">construction</span>
                      </div>
                      <h3 className="text-2xl font-bold text-reno-dark">{method.name}</h3>
                      <p className="mt-2 text-sm font-medium text-primary">{method.bestFor}</p>
                    </div>
                  </div>
                  <div className={isEven ? '' : 'lg:[direction:ltr]'}>
                    <div className="mb-6">
                      <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">Process</h4>
                      <ol className="space-y-2">
                        {method.process.map((step, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                              {i + 1}
                            </span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <div className="rounded-lg bg-[#f6f8f8] px-4 py-2 shadow-sm">
                        <p className="text-xs text-slate-400">Price in {data.city}</p>
                        <p className="text-sm font-bold text-reno-dark">
                          {fmt(adjusted.min)}–{fmt(adjusted.max)}
                        </p>
                      </div>
                      <div className="rounded-lg bg-[#f6f8f8] px-4 py-2 shadow-sm">
                        <p className="text-xs text-slate-400">Timeline</p>
                        <p className="text-sm font-bold text-reno-dark">{method.timeline}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 6. City-Specific Causes ────────────────────────────── */}
      <section className="bg-[#f6f8f8] py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-bold text-reno-dark md:text-4xl">
            Why {data.city} Homes Get Basement Leaks
          </h2>
          <p className="mb-8 leading-relaxed text-slate-600">{data.cityContext}</p>
          <div className="rounded-2xl bg-white p-6 shadow-float">
            <h3 className="mb-4 text-lg font-bold text-reno-dark">Common Causes in {data.city}</h3>
            <ul className="space-y-3">
              {data.commonCauses.map((cause) => (
                <li key={cause} className="flex items-start gap-3">
                  <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary" />
                  <span className="text-sm text-slate-600">{cause}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ── 7. Seasonal Risk ───────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-bold text-reno-dark md:text-4xl">
            When {data.city} Basements Are Most at Risk
          </h2>
          <div className="rounded-2xl border-2 border-primary/20 bg-primary/5 p-6">
            <div className="mb-4 flex items-center gap-3">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1", fontSize: '32px' }}>
                calendar_month
              </span>
              <h3 className="text-lg font-bold text-reno-dark">Seasonal Leak Risk</h3>
            </div>
            <p className="leading-relaxed text-slate-600">{data.seasonalRisks}</p>
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-4">
            {[
              { season: 'Spring', icon: 'psychiatry', risk: 'Highest', color: 'bg-red-50 text-red-700' },
              { season: 'Summer', icon: 'rainy', risk: 'High', color: 'bg-amber-50 text-amber-700' },
              { season: 'Fall', icon: 'rainy_heavy', risk: 'Moderate', color: 'bg-yellow-50 text-yellow-700' },
              { season: 'Winter', icon: 'ac_unit', risk: 'Low', color: 'bg-blue-50 text-blue-700' },
            ].map((item) => (
              <div key={item.season} className="rounded-xl bg-white p-4 text-center shadow-sm">
                <span className="material-symbols-outlined mb-2 text-primary" style={{ fontSize: '28px' }}>
                  {item.icon}
                </span>
                <p className="mb-1 text-sm font-semibold text-reno-dark">{item.season}</p>
                <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${item.color}`}>
                  {item.risk}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. Prevention & Maintenance ─────────────────────────── */}
      <section className="bg-[#f6f8f8] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="mb-2 text-center text-3xl font-bold text-reno-dark md:text-4xl">
            How to Prevent Basement Leaks in {data.city}
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-slate-600">
            Proactive maintenance can catch small problems before they become costly repairs.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {preventionTips.map((category) => (
              <Card key={category.category} className="rounded-2xl border-0 bg-white shadow-float">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <span className="material-symbols-outlined text-primary">{category.icon}</span>
                  </div>
                  <h3 className="mb-4 text-base font-bold text-reno-dark">{category.category}</h3>
                  <ul className="space-y-2">
                    {category.tips.map((tip) => (
                      <li key={tip.task} className="text-sm">
                        <p className="font-medium text-reno-dark">{tip.task}</p>
                        <p className="text-xs text-slate-500">{tip.frequency}</p>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. Rebates ───────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="mb-2 text-center text-3xl font-bold text-reno-dark md:text-4xl">
            {rebateProgramsData.title}
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-slate-600">
            Many GTA municipalities offer rebates for basement leak prevention. Here are programs available near {data.city}.
          </p>
          {data.rebateInfo && (
            <div className="mb-8 rounded-2xl border-2 border-primary/20 bg-primary/5 p-6">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                  redeem
                </span>
                <div>
                  <h3 className="font-bold text-reno-dark">Your {data.city} Rebate</h3>
                  <p className="mt-1 text-sm text-slate-600">{data.rebateInfo}</p>
                </div>
              </div>
            </div>
          )}
          <div className="space-y-4">
            {rebateProgramsData.programs.map((prog) => (
              <div key={prog.municipality} className="rounded-xl bg-white p-5 shadow-sm">
                <h3 className="text-sm font-bold text-reno-dark">
                  {prog.municipality} — {prog.amount}
                </h3>
                <p className="mt-2 text-sm text-slate-600">{prog.details}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. Pricing Table ──────────────────────────────────── */}
      <section className="bg-[#f6f8f8] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="mb-2 text-center text-3xl font-bold text-reno-dark md:text-4xl">
            Basement Leak Repair Prices in {data.city}
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-slate-600">
            City-adjusted pricing based on {data.city} labour and material rates.
            {cityMul.overall !== 1 && (
              <> {data.city} pricing is approximately {Math.abs(Math.round((1 - cityMul.overall) * 100))}%{' '}
              {cityMul.overall < 1 ? 'lower' : 'higher'} than Toronto.</>
            )}
          </p>
          <div className="mx-auto max-w-4xl overflow-hidden rounded-2xl bg-white shadow-float">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-reno-dark text-white">
                  <th className="px-6 py-4 text-left text-sm font-semibold">Method</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Price Range</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Unit</th>
                </tr>
              </thead>
              <tbody>
                {pricingRows.map((row, i) => (
                  <tr key={row.name} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="px-6 py-4 text-sm font-medium text-reno-dark">{row.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{fmt(row.min)} – {fmt(row.max)}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{row.unit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-slate-400">
            Prices are estimates based on typical GTA projects. Actual costs depend on home size, leak severity, soil conditions, and scope.{' '}
            <Link href="/price-check" className="text-primary hover:underline">Get a personalized price check →</Link>
          </p>
        </div>
      </section>

      {/* ── 11. FAQ ───────────────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="mb-10 text-center text-3xl font-bold text-reno-dark md:text-4xl">
            Basement Leak Repair FAQ — {data.city}
          </h2>
          <div className="space-y-6">
            {data.faqs.map((faq) => (
              <div key={faq.question} className="rounded-2xl bg-[#f6f8f8] p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-reno-dark">{faq.question}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 12. Nearby Cities ──────────────────────────────────── */}
      {nearbyCities.length > 0 && (
        <section className="bg-[#f6f8f8] py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="mb-2 text-center text-3xl font-bold text-reno-dark md:text-4xl">
              Basement Leak Repair in Nearby Cities
            </h2>
            <p className="mx-auto mb-10 max-w-2xl text-center text-slate-600">
              Professional leak repair services throughout the Greater Toronto Area
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {nearbyCities.map((nearby) => (
                <Link
                  key={nearby.slug}
                  href={`/basement-leak-repair/${nearby.slug}`}
                  className="group rounded-2xl bg-white p-6 transition-shadow hover:shadow-float"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <h3 className="font-bold text-reno-dark group-hover:text-primary transition-colors">
                      {nearby.city}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500">{nearby.region}</p>
                  <p className="mt-2 text-sm font-medium text-primary">View leak repair info →</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 13. CTA ──────────────────────────────────────────── */}
      <section className="bg-reno-dark py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Fix Your Basement Leak in {data.city}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">
            Connect with RenoNext-verified waterproofing professionals. Bank-held escrow, GPS-verified proof of work, and transparent pricing.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/price-check">Get a Free Price Check <ArrowRight className="ml-2 h-5 w-5" /></Link>
            </Button>
            <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800" asChild>
              <Link href="/contact"><Phone className="mr-2 h-5 w-5" />Contact Us</Link>
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-400">
            <span className="flex items-center gap-1.5"><CheckCircle className="h-4 w-4 text-primary" />Free assessment</span>
            <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-primary" />Escrow-protected</span>
            <span className="flex items-center gap-1.5"><Star className="h-4 w-4 text-primary" />Verified contractors</span>
          </div>
          <div className="mt-12 border-t border-slate-700 pt-8">
            <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">Related Resources</p>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              <Link href={`/costs/waterproofing/${citySlug}`} className="text-slate-400 hover:text-primary transition-colors">
                Waterproofing Costs in {data.city}
              </Link>
              <span className="text-slate-700">|</span>
              <Link href="/services/waterproofing" className="text-slate-400 hover:text-primary transition-colors">
                Waterproofing Services
              </Link>
              <span className="text-slate-700">|</span>
              <Link href={`/best-waterproofing/${citySlug}`} className="text-slate-400 hover:text-primary transition-colors">
                Best Waterproofing in {data.city}
              </Link>
              <span className="text-slate-700">|</span>
              <Link href={`/basement-renovation-cost/${citySlug}`} className="text-slate-400 hover:text-primary transition-colors">
                Basement Renovation Costs
              </Link>
              <span className="text-slate-700">|</span>
              <Link href="/contracts" className="text-slate-400 hover:text-primary transition-colors">
                Contract Generator
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
