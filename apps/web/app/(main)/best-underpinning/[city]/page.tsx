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
  getAllUnderpinningCitySlugs,
  getCityUnderpinningData,
  getNearbyUnderpinningCities,
  getUnderpinningServicePriceRange,
  underpinningServices,
  whatIsUnderpinning,
  angleOfReposeData,
  underpinningWarningSignsData,
  underpinningUseCasesData,
  underpinningDocumentationData,
  underpinningMethodComparisonData,
} from '@/lib/data/best-underpinning';
import { getCityBySlug, getCityAdjustedPrice } from '@/lib/data/costs';

// ---------------------------------------------------------------------------
// Static params — 15 city pages
// ---------------------------------------------------------------------------
export async function generateStaticParams() {
  return getAllUnderpinningCitySlugs().map((city) => ({ city }));
}

// ---------------------------------------------------------------------------
// SEO metadata
// ---------------------------------------------------------------------------
interface PageProps {
  params: Promise<{ city: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { city } = await params;
  const data = getCityUnderpinningData(city);
  if (!data) return { title: 'Not Found | RenoNext' };

  return {
    title: data.metaTitle,
    description: data.metaDescription,
    alternates: {
      canonical: `https://renonext.com/best-underpinning/${city}`,
    },
    openGraph: {
      title: data.metaTitle,
      description: data.metaDescription,
      url: `https://renonext.com/best-underpinning/${city}`,
      siteName: 'RenoNext',
      type: 'website',
    },
  };
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function BestUnderpinningCityPage({ params }: PageProps) {
  const { city: citySlug } = await params;
  const data = getCityUnderpinningData(citySlug);
  if (!data) notFound();

  const cityMul = getCityBySlug(citySlug)!;
  const nearbyCities = getNearbyUnderpinningCities(citySlug);

  // Build pricing table data
  const pricingRows = underpinningServices.map((svc) => {
    const adjusted = getCityAdjustedPrice(
      svc.basePriceMin, svc.basePriceMax, svc.labourPct, svc.materialPct, cityMul,
    );
    return { name: svc.name, min: adjusted.min, max: adjusted.max, timeline: svc.timeline };
  });

  const fmt = (n: number) =>
    new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(n);

  // JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LocalBusiness',
        '@id': `https://renonext.com/best-underpinning/${citySlug}#business`,
        name: `DrySpace Waterproofing — Underpinning ${data.city}`,
        description: `Professional underpinning and basement lowering services in ${data.city}. Bench footing, helical piles, foundation repair.`,
        url: 'https://renonext.com/pros/dryspace-waterproofing',
        areaServed: { '@type': 'City', name: data.city },
        address: { '@type': 'PostalAddress', addressLocality: data.city, addressRegion: 'ON', addressCountry: 'CA' },
        aggregateRating: { '@type': 'AggregateRating', ratingValue: '5.0', reviewCount: '0', bestRating: '5' },
      },
      {
        '@type': 'Service',
        name: `Underpinning in ${data.city}`,
        provider: { '@id': `https://renonext.com/best-underpinning/${citySlug}#business` },
        areaServed: { '@type': 'City', name: data.city },
        serviceType: 'Underpinning',
        offers: { '@type': 'AggregateOffer', priceCurrency: 'CAD', lowPrice: pricingRows[0].min, highPrice: pricingRows[1].max },
      },
      {
        '@type': 'FAQPage',
        mainEntity: data.faqs.map((faq) => ({
          '@type': 'Question', name: faq.question,
          acceptedAnswer: { '@type': 'Answer', text: faq.answer },
        })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://renonext.com' },
          { '@type': 'ListItem', position: 2, name: 'Underpinning', item: 'https://renonext.com/services/underpinning' },
          { '@type': 'ListItem', position: 3, name: data.city, item: `https://renonext.com/best-underpinning/${citySlug}` },
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
            <Link href="/services/underpinning" className="hover:text-white transition-colors">Underpinning</Link>
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
                Best Underpinning Contractors in{' '}
                <span className="text-primary">{data.city}</span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
                {data.heroTagline}. {data.cityContext.split('.').slice(0, 2).join('.')}.
              </p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" asChild>
                  <Link href="/price-check">Get a Free Quote <ArrowRight className="ml-2 h-5 w-5" /></Link>
                </Button>
                <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800" asChild>
                  <Link href="/pros/dryspace-waterproofing">View DrySpace Profile</Link>
                </Button>
              </div>
              {/* Trust bar */}
              <div className="mt-8 flex flex-wrap gap-4 text-xs text-slate-400">
                <span className="flex items-center gap-1"><CheckCircle className="h-3.5 w-3.5 text-primary" />Structural Engineer Certified</span>
                <span className="flex items-center gap-1"><Shield className="h-3.5 w-3.5 text-primary" />WSIB + Insured</span>
                <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5 text-primary" />GPS-Verified Work</span>
              </div>
            </div>
            <div className="relative hidden lg:block">
              <Image src="/images/pros/spaders/underpinning-finished.webp" alt={`Underpinning contractor working in ${data.city}`} width={640} height={480} className="rounded-2xl shadow-2xl" priority />
              <div className="absolute -bottom-4 -left-4 rounded-xl bg-white p-4 shadow-float">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10"><Shield className="h-5 w-5 text-primary" /></div>
                  <div>
                    <p className="text-sm font-semibold text-reno-dark">RenoNext Verified</p>
                    <p className="text-xs text-slate-500">WSIB + Insured + Licensed</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 2. What Is Underpinning (educational) ──────────────── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-bold text-reno-dark md:text-4xl">{whatIsUnderpinning.title}</h2>
          {whatIsUnderpinning.paragraphs.map((p, i) => (
            <p key={i} className="mb-4 text-slate-600 leading-relaxed">{p}</p>
          ))}
        </div>
      </section>

      {/* ── 3. Warning Signs ──────────────────────────────────── */}
      <section className="bg-[#f6f8f8] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="mb-2 text-center text-3xl font-bold text-reno-dark md:text-4xl">{underpinningWarningSignsData.title}</h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-slate-600">
            If you notice any of these signs in your {data.city} home, it may be time for a professional underpinning assessment.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {underpinningWarningSignsData.signs.map((sign) => (
              <Card key={sign.title} className="rounded-2xl border-0 bg-white shadow-float">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-50">
                    <span className="material-symbols-outlined text-red-500">{sign.icon}</span>
                  </div>
                  <h3 className="mb-2 text-base font-bold text-reno-dark">{sign.title}</h3>
                  <p className="text-sm text-slate-600">{sign.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. Use Cases — Why Underpin ─────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="mb-2 text-center text-3xl font-bold text-reno-dark md:text-4xl">{underpinningUseCasesData.title}</h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-slate-600">
            Underpinning is one of the highest-ROI home improvements for {data.city} homeowners — adding both space and value.
          </p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {underpinningUseCasesData.cases.map((c) => (
              <div key={c.title} className="rounded-2xl border border-slate-100 p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <span className="material-symbols-outlined text-primary">{c.icon}</span>
                </div>
                <h3 className="mb-2 text-lg font-bold text-reno-dark">{c.title}</h3>
                <p className="text-sm text-slate-600">{c.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. Featured Pro Card ──────────────────────────────── */}
      <section className="bg-[#f6f8f8] py-16 md:py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="mb-2 text-center text-3xl font-bold text-reno-dark md:text-4xl">
            Featured Underpinning Contractor in {data.city}
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-slate-600">
            RenoNext-verified contractor serving {data.city} and the Greater Toronto Area
          </p>
          <Link href="/pros/dryspace-waterproofing" className="group mx-auto block max-w-3xl overflow-hidden rounded-2xl bg-white shadow-float transition-shadow hover:shadow-float-hover">
            <div className="relative h-56 overflow-hidden sm:h-64">
              <Image src="/images/pros/spaders/excavation.webp" alt="DrySpace Waterproofing underpinning project in the GTA" fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
              <div className="absolute left-4 top-4 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-white">RenoNext Verified</div>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-bold text-reno-dark">DrySpace Waterproofing</h3>
                  <p className="mt-1 text-sm text-slate-500">Underpinning, Waterproofing &amp; Foundation Repair</p>
                </div>
                <div className="flex items-center gap-1 text-amber-500">
                  <Star className="h-4 w-4 fill-current" /><span className="text-sm font-semibold">5.0</span>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {['WSIB Active', 'Insured', 'OBC Licensed', 'Identity Verified', 'Structural Engineer Partner'].map((badge) => (
                  <span key={badge} className="inline-flex items-center gap-1 rounded-full bg-primary/8 px-3 py-1 text-xs font-medium text-primary">
                    <CheckCircle className="h-3 w-3" />{badge}
                  </span>
                ))}
              </div>
              <p className="mt-4 text-sm text-slate-600">
                Professional underpinning and foundation contractor serving {data.city} and the GTA.
                Bench footing underpinning, basement lowering, helical piles, and foundation crack repair.
                All work documented with GPS-verified photos through RenoNext.
              </p>
              <div className="mt-4 flex items-center text-sm font-medium text-primary">View Full Profile <ArrowRight className="ml-1 h-4 w-4" /></div>
            </div>
          </Link>
        </div>
      </section>

      {/* ── 6. Angle of Repose (unique educational content) ──── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="mb-6 text-3xl font-bold text-reno-dark md:text-4xl">{angleOfReposeData.title}</h2>
          {angleOfReposeData.paragraphs.map((p, i) => (
            <p key={i} className="mb-4 text-slate-600 leading-relaxed">{p}</p>
          ))}
          <div className="mt-8 rounded-2xl border-2 border-primary/20 bg-primary/5 p-6">
            <div className="flex items-start gap-3">
              <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>engineering</span>
              <div>
                <h3 className="font-bold text-reno-dark">Why This Matters for Your {data.city} Home</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Proper understanding of the angle of repose is what separates qualified underpinning contractors from unqualified ones.
                  A contractor who ignores soil mechanics risks catastrophic foundation failure. DrySpace works exclusively with licensed structural
                  engineers who calculate the safe excavation profile for every project.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. Method Comparison (Bench Footing vs Helical Pile) ── */}
      <section className="bg-[#f6f8f8] py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="mb-2 text-center text-3xl font-bold text-reno-dark md:text-4xl">{underpinningMethodComparisonData.title}</h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-slate-600">
            Understanding the difference helps you choose the right approach for your {data.city} home.
          </p>
          <div className="overflow-hidden rounded-2xl bg-white shadow-float">
            <table className="w-full">
              <thead>
                <tr className="bg-reno-dark text-white">
                  <th className="px-5 py-4 text-left text-sm font-semibold">Factor</th>
                  <th className="px-5 py-4 text-left text-sm font-semibold">Bench Footing</th>
                  <th className="px-5 py-4 text-left text-sm font-semibold">Helical Pile</th>
                </tr>
              </thead>
              <tbody>
                {underpinningMethodComparisonData.rows.map((row, i) => (
                  <tr key={row.factor} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="px-5 py-3 text-sm font-medium text-reno-dark">{row.factor}</td>
                    <td className="px-5 py-3 text-sm text-slate-600">{row.benchFooting}</td>
                    <td className="px-5 py-3 text-sm text-slate-600">{row.helicalPile}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ── 8. How We Underpin (services) ───────────────────── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="mb-2 text-center text-3xl font-bold text-reno-dark md:text-4xl">
            How We Underpin Your {data.city} Home
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-slate-600">
            Five core underpinning services with step-by-step process details and {data.city} pricing
          </p>
          <div className="space-y-16">
            {underpinningServices.map((service, idx) => {
              const priceRange = getUnderpinningServicePriceRange(service, citySlug);
              const isEven = idx % 2 === 0;
              return (
                <div key={service.name} className={`grid items-center gap-8 lg:grid-cols-2 ${isEven ? '' : 'lg:[direction:rtl]'}`}>
                  <div className={isEven ? '' : 'lg:[direction:ltr]'}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                      <Image src={service.image} alt={service.imageAlt} fill className="object-cover" />
                    </div>
                  </div>
                  <div className={isEven ? '' : 'lg:[direction:ltr]'}>
                    <h3 className="text-2xl font-bold text-reno-dark">{service.name}</h3>
                    <p className="mt-3 text-slate-600">{service.description}</p>
                    <div className="mt-6">
                      <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-slate-400">Process</h4>
                      <ol className="space-y-2">
                        {service.process.map((step, i) => (
                          <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                            <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">{i + 1}</span>
                            {step}
                          </li>
                        ))}
                      </ol>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-4">
                      <div className="rounded-lg bg-[#f6f8f8] px-4 py-2">
                        <p className="text-xs text-slate-400">Price in {data.city}</p>
                        <p className="text-sm font-bold text-reno-dark">{priceRange}</p>
                      </div>
                      <div className="rounded-lg bg-[#f6f8f8] px-4 py-2">
                        <p className="text-xs text-slate-400">Timeline</p>
                        <p className="text-sm font-bold text-reno-dark">{service.timeline}</p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 9. Why City Homes Need Underpinning ──────────────── */}
      <section className="bg-[#f6f8f8] py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="mb-2 text-center text-3xl font-bold text-reno-dark md:text-4xl">
            Why {data.city} Homes Need Underpinning
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-center text-slate-600">{data.cityContext}</p>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {data.challengeCards.map((card) => (
              <Card key={card.title} className="rounded-2xl border-0 bg-white shadow-float">
                <CardContent className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                    <span className="material-symbols-outlined text-primary">{card.icon}</span>
                  </div>
                  <h3 className="mb-2 text-lg font-bold text-reno-dark">{card.title}</h3>
                  <p className="text-sm text-slate-600">{card.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── 10. Common Issues + Neighborhoods ──────────────────── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-reno-dark md:text-4xl">
                Common Foundation Issues in {data.city}
              </h2>
              <ul className="space-y-4">
                {data.commonIssues.map((issue) => (
                  <li key={issue} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-red-50">
                      <span className="material-symbols-outlined text-red-500" style={{ fontSize: '16px' }}>warning</span>
                    </span>
                    <span className="text-slate-600">{issue}</span>
                  </li>
                ))}
              </ul>

              {/* Neighborhoods served */}
              {data.neighborhoods && data.neighborhoods.length > 0 && (
                <div className="mt-10">
                  <h3 className="mb-4 text-lg font-bold text-reno-dark">
                    {data.city} Neighborhoods We Serve
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {data.neighborhoods.map((n) => (
                      <span key={n} className="rounded-full bg-[#f6f8f8] px-3 py-1 text-sm text-slate-600 shadow-sm">{n}</span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="relative">
              <Image src="/images/pros/spaders/excavation.webp" alt={`Foundation underpinning excavation for ${data.city} home`} width={640} height={480} className="rounded-2xl shadow-float" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 11. Documentation Checklist ──────────────────────── */}
      <section className="bg-[#f6f8f8] py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <h2 className="mb-2 text-center text-3xl font-bold text-reno-dark md:text-4xl">{underpinningDocumentationData.title}</h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-slate-600">{underpinningDocumentationData.intro}</p>

          {data.permitInfo && (
            <div className="mb-8 rounded-2xl border-2 border-primary/20 bg-primary/5 p-6">
              <div className="flex items-start gap-3">
                <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                <div>
                  <h3 className="font-bold text-reno-dark">{data.city} Permit Requirements</h3>
                  <p className="mt-1 text-sm text-slate-600">{data.permitInfo}</p>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            {underpinningDocumentationData.items.map((item) => (
              <div key={item.document} className="flex items-start gap-4 rounded-xl bg-white p-5 shadow-sm">
                <div className="mt-0.5 flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <span className="material-symbols-outlined text-primary" style={{ fontSize: '18px' }}>description</span>
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-sm font-bold text-reno-dark">{item.document}</h3>
                    <span className="whitespace-nowrap rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-700">{item.cost}</span>
                  </div>
                  <p className="mt-1 text-sm text-slate-600">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-slate-500">{underpinningDocumentationData.tip}</p>
        </div>
      </section>

      {/* ── 12. Pricing Table ─────────────────────────────────── */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <h2 className="mb-2 text-center text-3xl font-bold text-reno-dark md:text-4xl">
            Underpinning Prices in {data.city}
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-center text-slate-600">
            City-adjusted pricing based on {data.city} labour and material rates.
            {cityMul.overall !== 1 && (
              <> {data.city} pricing is approximately {Math.abs(Math.round((1 - cityMul.overall) * 100))}%{' '}
              {cityMul.overall < 1 ? 'lower' : 'higher'} than Toronto.</>
            )}
          </p>
          <div className="mx-auto max-w-3xl overflow-hidden rounded-2xl bg-white shadow-float">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-100 bg-reno-dark text-white">
                  <th className="px-6 py-4 text-left text-sm font-semibold">Service</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold">Price Range</th>
                  <th className="hidden px-6 py-4 text-left text-sm font-semibold sm:table-cell">Timeline</th>
                </tr>
              </thead>
              <tbody>
                {pricingRows.map((row, i) => (
                  <tr key={row.name} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                    <td className="px-6 py-4 text-sm font-medium text-reno-dark">{row.name}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{fmt(row.min)} – {fmt(row.max)}</td>
                    <td className="hidden px-6 py-4 text-sm text-slate-500 sm:table-cell">{row.timeline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mx-auto mt-6 max-w-2xl text-center text-xs text-slate-400">
            Prices are estimates based on typical GTA projects. Actual costs depend on home size, depth increase, soil conditions, and scope.{' '}
            <Link href={`/costs/underpinning/${citySlug}`} className="text-primary hover:underline">See detailed cost breakdown →</Link>
          </p>
        </div>
      </section>

      {/* ── 13. FAQ ───────────────────────────────────────────── */}
      <section className="bg-[#f6f8f8] py-20 md:py-28">
        <div className="mx-auto max-w-3xl px-6 lg:px-8">
          <h2 className="mb-10 text-center text-3xl font-bold text-reno-dark md:text-4xl">
            Underpinning FAQ — {data.city}
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

      {/* ── 14. Nearby Cities ─────────────────────────────────── */}
      {nearbyCities.length > 0 && (
        <section className="py-20 md:py-28">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="mb-2 text-center text-3xl font-bold text-reno-dark md:text-4xl">Underpinning in Nearby Cities</h2>
            <p className="mx-auto mb-10 max-w-2xl text-center text-slate-600">DrySpace Waterproofing serves the entire Greater Toronto Area</p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {nearbyCities.map((nearby) => (
                <Link key={nearby.slug} href={`/best-underpinning/${nearby.slug}`} className="group rounded-2xl bg-[#f6f8f8] p-6 transition-shadow hover:shadow-float">
                  <div className="mb-3 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    <h3 className="font-bold text-reno-dark group-hover:text-primary transition-colors">{nearby.city}</h3>
                  </div>
                  <p className="text-xs text-slate-500">{nearby.region}</p>
                  <p className="mt-2 text-sm font-medium text-primary">View underpinning pros →</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 15. CTA ──────────────────────────────────────────── */}
      <section className="bg-reno-dark py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="text-3xl font-bold text-white md:text-4xl">Get a Free Underpinning Quote in {data.city}</h2>
          <p className="mx-auto mt-4 max-w-xl text-lg text-slate-300">
            Lower your basement with RenoNext-verified underpinning contractors. Bank-held escrow, GPS-verified proof of work, and transparent pricing.
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
              <Link href={`/costs/underpinning/${citySlug}`} className="text-slate-400 hover:text-primary transition-colors">Underpinning Costs in {data.city}</Link>
              <span className="text-slate-700">|</span>
              <Link href="/services/underpinning" className="text-slate-400 hover:text-primary transition-colors">Underpinning Services</Link>
              <span className="text-slate-700">|</span>
              <Link href={`/best-waterproofing/${citySlug}`} className="text-slate-400 hover:text-primary transition-colors">Waterproofing in {data.city}</Link>
              <span className="text-slate-700">|</span>
              <Link href={`/basement-renovation-cost/${citySlug}`} className="text-slate-400 hover:text-primary transition-colors">Renovation Cost in {data.city}</Link>
              <span className="text-slate-700">|</span>
              <Link href="/contracts" className="text-slate-400 hover:text-primary transition-colors">Contract Generator</Link>
              <span className="text-slate-700">|</span>
              <Link href="/pros/dryspace-waterproofing" className="text-slate-400 hover:text-primary transition-colors">DrySpace Waterproofing</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
