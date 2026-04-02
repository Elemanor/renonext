import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  ArrowRight,
  CheckCircle,
  Gift,
  DollarSign,
  ChevronRight,
  MapPin,
  ExternalLink,
  Zap,
  Home,
  TrendingUp,
  Heart,
  FileText,
  Calculator,
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
  getProgramsByCity,
  getCityRebateSummary,
  calculateMaxSavings,
  getProgramsByLevel,
  getLevelLabel,
  getLevelColor,
  cityRebateSummaries,
  type ProgramLevel,
} from '@/lib/data/rebates';

// ---------------------------------------------------------------------------
// Static params
// ---------------------------------------------------------------------------
export async function generateStaticParams() {
  return cityRebateSummaries.map((c) => ({ city: c.slug }));
}

// ---------------------------------------------------------------------------
// SEO metadata
// ---------------------------------------------------------------------------
interface CityPageProps {
  params: Promise<{ city: string }>;
}

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const { city } = await params;
  const summary = getCityRebateSummary(city);

  if (!summary) {
    return { title: 'City Not Found | RenoNext' };
  }

  return {
    title: summary.metaTitle,
    description: summary.metaDescription,
    openGraph: {
      title: summary.metaTitle,
      description: summary.metaDescription,
    },
  };
}

// ---------------------------------------------------------------------------
// Level order
// ---------------------------------------------------------------------------
const levelOrder: ProgramLevel[] = ['federal', 'provincial', 'regional', 'municipal', 'utility'];

// ---------------------------------------------------------------------------
// FAQ data by city type
// ---------------------------------------------------------------------------
function getCityFaqs(cityName: string, totalSavings: number, programCount: number) {
  return [
    {
      q: `How much can I save on renovations in ${cityName}?`,
      a: `${cityName} homeowners can access up to $${totalSavings.toLocaleString()} in stacked rebates, grants, and low-interest loans across ${programCount} federal, provincial, regional, municipal, and utility programs. The actual amount depends on your project type and eligibility.`,
    },
    {
      q: 'Can I stack multiple rebate programs?',
      a: 'Yes — most programs are designed to be stacked. You can typically combine a federal tax credit with a provincial grant, a regional forgivable loan, and utility rebates. Always check individual program rules, but stacking is encouraged by most administrators.',
    },
    {
      q: `Do I need to apply for ${cityName} rebates before starting work?`,
      a: 'For most programs, yes. Many require pre-approval or a pre-retrofit energy audit before work begins. Starting construction before applying can disqualify you. Check each program\'s requirements carefully and apply early.',
    },
    {
      q: 'What is a forgivable loan?',
      a: 'A forgivable loan is money you receive that you don\'t have to pay back, provided you meet the conditions (usually maintaining affordable rent for 15 years). If you sell the property or stop meeting conditions early, a pro-rated portion must be repaid.',
    },
  ];
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default async function CitySavingsPage({ params }: CityPageProps) {
  const { city } = await params;
  const summary = getCityRebateSummary(city);

  if (!summary) {
    notFound();
  }

  const programs = getProgramsByCity(city);
  const grouped = getProgramsByLevel(programs);
  const totalSavings = calculateMaxSavings(city, ['adu', 'energy', 'structural', 'general']);
  const aduSavings = calculateMaxSavings(city, ['adu']);
  const faqs = getCityFaqs(summary.city, totalSavings, programs.length);

  // Nearby cities
  const nearbySummaries = summary.nearbyGuides
    .map((slug) => getCityRebateSummary(slug))
    .filter(Boolean);

  // JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'GovernmentService',
    name: `${summary.city} Renovation Rebates & Incentives`,
    description: summary.metaDescription,
    provider: {
      '@type': 'Organization',
      name: 'RenoNext',
      url: 'https://renonext.com',
    },
    areaServed: {
      '@type': 'City',
      name: summary.city,
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
        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-gradient-to-b from-reno-cream to-white py-16 md:py-24">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(15,186,189,0.06),transparent_50%)]" />
          <div className="container relative mx-auto px-4">
            <nav className="mb-8 flex items-center gap-2 text-sm text-slate-500">
              <Link href="/" className="transition-colors hover:text-slate-900">Home</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link href="/savings" className="transition-colors hover:text-slate-900">Savings Calculator</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="font-medium text-slate-900">{summary.city}</span>
            </nav>

            <div className="mx-auto max-w-4xl">
              <div className="mb-4 flex items-center gap-3">
                <Badge className="rounded-full bg-reno-green/10 text-reno-green border-transparent hover:bg-reno-green/10 px-3 py-1">
                  <MapPin className="mr-1.5 h-3.5 w-3.5" />
                  {summary.region} Region
                </Badge>
                <Badge className="rounded-full bg-reno-green/10 text-reno-green border-transparent hover:bg-reno-green/10 px-3 py-1">
                  <Gift className="mr-1.5 h-3.5 w-3.5" />
                  {programs.length} Programs
                </Badge>
              </div>

              <h1 className="font-display text-4xl font-bold tracking-tight text-reno-dark md:text-5xl lg:text-6xl">
                {summary.city} Renovation Rebates & Incentives 2026
              </h1>
              <p className="mt-4 max-w-2xl text-lg text-slate-600 md:text-xl">
                {summary.heroTagline}
              </p>

              {/* Highlights */}
              <div className="mt-8 grid gap-3 sm:grid-cols-3">
                {summary.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
                    <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-reno-green" />
                    <span className="text-sm font-medium text-slate-900">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Savings Summary ── */}
        <section className="border-b border-slate-100 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <div className="rounded-2xl border-2 border-reno-green/20 bg-reno-green/5 p-8 text-center">
                <Gift className="mx-auto h-8 w-8 text-reno-green" />
                <h2 className="mt-4 font-display text-3xl font-bold text-reno-dark md:text-4xl">
                  Up to ${totalSavings.toLocaleString()} in combined savings
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-slate-600">
                  {summary.city} homeowners can stack {programs.length} federal, provincial,
                  {grouped.regional.length > 0 ? ' regional,' : ''}
                  {grouped.municipal.length > 0 ? ' municipal,' : ''} and utility programs.
                  Most are designed to be combined.
                </p>
                <div className="mt-6">
                  <Button
                    asChild
                    className="rounded-xl bg-reno-green px-8 py-3 text-sm font-semibold text-white hover:bg-reno-green/90"
                  >
                    <Link href="/savings">
                      <Calculator className="mr-2 h-4 w-4" />
                      Try the Savings Calculator
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Program Directory ── */}
        <section className="border-b border-slate-100 bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="font-display text-3xl font-bold tracking-tight text-reno-dark md:text-4xl">
                All Available Programs
              </h2>
              <p className="mt-3 text-slate-500">
                Every rebate, grant, loan, and incentive available to {summary.city} homeowners in 2026.
              </p>

              <div className="mt-10 space-y-8">
                {levelOrder.map((level) => {
                  const levelPrograms = grouped[level];
                  if (levelPrograms.length === 0) return null;

                  return (
                    <div key={level}>
                      <div className="mb-4 flex items-center gap-2">
                        <Badge className={`rounded-full border-transparent px-3 py-1 text-xs font-bold ${getLevelColor(level)}`}>
                          {getLevelLabel(level)}
                        </Badge>
                        <span className="text-sm text-slate-400">
                          {levelPrograms.length} program{levelPrograms.length > 1 ? 's' : ''}
                        </span>
                      </div>

                      <div className="space-y-4">
                        {levelPrograms.map((program) => (
                          <Card key={program.id} className="rounded-xl border-slate-200 bg-white shadow-sm">
                            <CardContent className="p-6">
                              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                <div className="min-w-0 flex-1">
                                  <div className="flex flex-wrap items-center gap-2">
                                    <h3 className="text-lg font-bold text-slate-900">
                                      {program.name}
                                    </h3>
                                    {program.status === 'upcoming' && (
                                      <Badge className="rounded-full bg-primary-100 text-primary-700 border-transparent text-[10px] px-2 py-0.5">
                                        Coming Soon
                                      </Badge>
                                    )}
                                    {program.deadline && (
                                      <Badge className="rounded-full bg-amber-100 text-amber-700 border-transparent text-[10px] px-2 py-0.5">
                                        {program.deadline}
                                      </Badge>
                                    )}
                                    {program.stackable && (
                                      <Badge className="rounded-full bg-reno-green-50 text-reno-green-700 border-transparent text-[10px] px-2 py-0.5">
                                        Stackable
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="mt-1 text-sm text-slate-500">{program.adminBody}</p>
                                  <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                                    {program.description}
                                  </p>

                                  {/* Eligibility */}
                                  <div className="mt-4">
                                    <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                                      Eligibility
                                    </p>
                                    <ul className="mt-2 space-y-1.5">
                                      {program.eligibility.map((item, i) => (
                                        <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                                          <CheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-reno-green" />
                                          {item}
                                        </li>
                                      ))}
                                    </ul>
                                  </div>

                                  {program.notes && (
                                    <p className="mt-3 text-xs text-slate-500 italic">{program.notes}</p>
                                  )}
                                </div>

                                <div className="flex shrink-0 flex-col items-start gap-3 sm:items-end">
                                  <p className="text-2xl font-bold text-reno-green">{program.amount}</p>
                                  <a
                                    href={program.applicationUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 rounded-lg bg-reno-green/10 px-4 py-2 text-sm font-semibold text-reno-green transition-colors hover:bg-reno-green/20"
                                  >
                                    Apply Now
                                    <ExternalLink className="h-3.5 w-3.5" />
                                  </a>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* ── Stacking Example ── */}
        <section className="border-b border-slate-100 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="font-display text-3xl font-bold tracking-tight text-reno-dark md:text-4xl">
                Stacking Example: Basement Apartment in {summary.city}
              </h2>
              <p className="mt-3 text-slate-500">
                Here&apos;s how a typical secondary suite project can stack incentives.
              </p>

              <div className="mt-8 space-y-3">
                {(() => {
                  const aduPrograms = programs.filter((p) =>
                    p.projectTypes.includes('adu') && p.status === 'active'
                  );
                  let runningTotal = 0;

                  return aduPrograms.map((program) => {
                    runningTotal += program.maxValue;
                    return (
                      <div
                        key={program.id}
                        className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          <Badge className={`shrink-0 rounded-full border-transparent px-2 py-0.5 text-[10px] font-bold ${getLevelColor(program.level)}`}>
                            {getLevelLabel(program.level)}
                          </Badge>
                          <div>
                            <p className="font-medium text-slate-900">{program.name}</p>
                            <p className="text-xs text-slate-500">{program.adminBody}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-reno-green">{program.amount}</p>
                          <p className="text-xs text-slate-400">
                            Running total: ${runningTotal.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    );
                  });
                })()}
              </div>

              <div className="mt-6 rounded-xl border-2 border-reno-green/30 bg-reno-green/5 p-6 text-center">
                <p className="text-sm font-medium text-slate-600">Total Potential Savings for a Basement Suite</p>
                <p className="mt-1 font-display text-3xl font-bold text-reno-green">
                  ${aduSavings.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Benefits Grid ── */}
        <section className="border-b border-slate-100 bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="font-display text-3xl font-bold tracking-tight text-reno-dark md:text-4xl">
                Beyond Rebates — The Full Picture
              </h2>
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { icon: Zap, title: 'Energy Savings', desc: 'Save $1,500-$3,000/yr on heating, cooling, and electricity with modern upgrades.', color: 'text-amber-500', bg: 'bg-amber-100' },
                  { icon: Home, title: 'Rental Income', desc: 'Legal basement apartments in the GTA earn $1,500-$2,500/mo in rental income.', color: 'text-reno-purple', bg: 'bg-reno-purple/10' },
                  { icon: TrendingUp, title: 'Property Value', desc: 'Renovated homes with legal suites sell for 15-25% more at resale.', color: 'text-reno-teal', bg: 'bg-reno-teal/10' },
                  { icon: Heart, title: 'Health & Comfort', desc: 'Better insulation, ventilation, and waterproofing mean no mold and clean air.', color: 'text-reno-red-600', bg: 'bg-reno-red-100' },
                  { icon: FileText, title: 'HouseFax Record', desc: 'Every improvement is documented in a permanent, transferable property record.', color: 'text-primary-600', bg: 'bg-primary-100' },
                  { icon: DollarSign, title: 'ROI in 3-5 Years', desc: 'Most renovation projects with stacked incentives pay for themselves in under 5 years.', color: 'text-reno-green', bg: 'bg-reno-green/10' },
                ].map((item) => (
                  <Card key={item.title} className="rounded-xl border-slate-200 bg-white shadow-sm">
                    <CardContent className="p-5">
                      <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${item.bg}`}>
                        <item.icon className={`h-4 w-4 ${item.color}`} />
                      </div>
                      <h3 className="mt-3 font-bold text-slate-900">{item.title}</h3>
                      <p className="mt-1.5 text-sm text-slate-600">{item.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Nearby Cities ── */}
        {nearbySummaries.length > 0 && (
          <section className="border-b border-slate-100 py-16 md:py-20">
            <div className="container mx-auto px-4">
              <div className="mx-auto max-w-4xl">
                <h2 className="font-display text-3xl font-bold tracking-tight text-reno-dark md:text-4xl">
                  Rebates in Nearby Cities
                </h2>
                <p className="mt-3 text-slate-500">
                  Compare incentives available in other GTA municipalities.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {nearbySummaries.map((nearby) => {
                    if (!nearby) return null;
                    const nearbyCount = getProgramsByCity(nearby.slug).length;
                    return (
                      <Link key={nearby.slug} href={`/savings/${nearby.slug}`}>
                        <Card className="h-full rounded-xl border-slate-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:border-reno-green/30">
                          <CardContent className="p-5">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <MapPin className="h-4 w-4 text-reno-green" />
                                <h3 className="font-bold text-slate-900">{nearby.city}</h3>
                              </div>
                              <Badge className="rounded-full bg-reno-green/10 text-reno-green border-transparent text-xs px-2 py-0.5">
                                {nearbyCount} programs
                              </Badge>
                            </div>
                            <p className="mt-1 text-xs text-slate-500">{nearby.region} Region</p>
                            <p className="mt-2 text-sm text-slate-600 line-clamp-2">{nearby.highlights[0]}</p>
                            <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-reno-green">
                              View rebates
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

        {/* ── Related Services ── */}
        <section className="border-b border-slate-100 bg-slate-50 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <h2 className="font-display text-3xl font-bold tracking-tight text-reno-dark md:text-4xl">
                Services That Qualify for Rebates
              </h2>
              <p className="mt-3 text-slate-500">
                These renovation services can qualify for one or more rebate programs.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {[
                  { label: 'Basement Second Unit', href: '/services/basement-second-unit', desc: 'Legal secondary suites' },
                  { label: 'Insulation', href: '/services/insulation', desc: 'Walls, attic, basement' },
                  { label: 'HVAC', href: '/services/hvac', desc: 'Heat pumps, furnaces' },
                  { label: 'Waterproofing', href: '/services/waterproofing', desc: 'Foundation, basement' },
                  { label: 'Underpinning', href: '/services/underpinning', desc: 'Lowering basement floor' },
                  { label: 'Foundation Repair', href: '/services/foundation-repair', desc: 'Structural repairs' },
                ].map((svc) => (
                  <Link key={svc.href} href={svc.href}>
                    <Card className="h-full rounded-xl border-slate-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:border-reno-teal/30">
                      <CardContent className="p-5">
                        <h3 className="font-bold text-slate-900">{svc.label}</h3>
                        <p className="mt-1 text-sm text-slate-500">{svc.desc}</p>
                        <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-reno-teal">
                          Learn more <ArrowRight className="h-3 w-3" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Cost Guides Cross-link ── */}
        <section className="border-b border-slate-100 py-10">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-4xl">
              <Link
                href={`/costs/underpinning/${city}`}
                className="group flex items-center gap-4 rounded-2xl border-2 border-reno-teal/20 bg-reno-teal/5 p-6 transition-all duration-200 hover:border-reno-teal/40 hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-reno-teal/10 transition-colors group-hover:bg-reno-teal group-hover:text-white">
                  <Calculator className="h-6 w-6 text-reno-teal group-hover:text-white" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-slate-900">
                    See how much renovation work costs in {summary?.city}
                  </p>
                  <p className="mt-0.5 text-sm text-slate-500">
                    25 detailed cost guides with labour/material breakdowns, permit fees, and money-saving tips.
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-reno-teal transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="border-b border-slate-100 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <h2 className="text-center font-display text-3xl font-bold tracking-tight text-reno-dark md:text-4xl">
                Common Questions
              </h2>
              <div className="mt-10">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`faq-${i}`}>
                      <AccordionTrigger className="text-left text-base font-semibold text-slate-900 hover:no-underline">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-600 leading-relaxed">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA ── */}
        <section className="bg-reno-dark py-16 md:py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
              See exactly how much you can save
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-slate-400">
              Use the Savings Calculator to find every rebate that applies to your specific
              project in {summary.city}. Select your project type and get a personalized savings stack.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                asChild
                className="rounded-xl bg-reno-green px-8 py-3 text-base font-semibold text-white hover:bg-reno-green/90"
              >
                <Link href="/savings">
                  <Calculator className="mr-2 h-4 w-4" />
                  Try the Calculator
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="rounded-xl border-slate-600 px-8 py-3 text-base font-semibold text-white hover:bg-white/10"
              >
                <Link href="/price-check">Get a Price Check</Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
