import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { services, getServiceBySlug } from '@/lib/data/services';
import { FaqJsonLd } from '@/components/costs/faq-jsonld';
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
// Icon helpers
// ---------------------------------------------------------------------------
const overviewIcons: Record<string, string> = {
  timeline: 'schedule',
  difficulty: 'speed',
  price: 'payments',
  seasonal: 'thermostat',
  permit: 'description',
};

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

  const startingPrice =
    service.pricing.breakdowns[0]?.range.split(' - ')[0] || 'Varies';

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <FaqJsonLd faqs={service.faqs} />

      <div className="min-h-screen bg-white">
        {/* ═══════════════════════════════════════════════════════════════
            Section 1 — Hero (Asymmetric)
        ═══════════════════════════════════════════════════════════════ */}
        <section className="relative overflow-hidden bg-[#f6f8f8] py-16 md:py-24">
          {/* Subtle radial glow */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_20%_30%,rgba(15,186,189,0.06),transparent_60%)] pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 relative">
            {/* Breadcrumb */}
            <nav className="mb-8 flex items-center gap-1.5 text-sm text-slate-400">
              <Link
                href="/"
                className="hover:text-reno-dark transition-colors"
              >
                Home
              </Link>
              <span className="material-symbols-outlined text-xs">
                chevron_right
              </span>
              <Link
                href="/pros"
                className="hover:text-reno-dark transition-colors"
              >
                Services
              </Link>
              <span className="material-symbols-outlined text-xs">
                chevron_right
              </span>
              <span className="font-medium text-reno-dark">
                {service.title}
              </span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
              {/* Left: Heading */}
              <div className="lg:col-span-7">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6">
                  <span
                    className="material-symbols-outlined text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                  RenoNext Verified Service
                </div>

                <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-reno-dark leading-[1.1] mb-5">
                  {service.title}
                </h1>
                <p className="text-lg md:text-xl text-slate-500 leading-relaxed max-w-2xl">
                  {service.heroTagline}
                </p>

                {/* CTA row */}
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link
                    href="/price-check"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow-float"
                  >
                    Get a Price Estimate
                    <span className="material-symbols-outlined text-lg">
                      arrow_forward
                    </span>
                  </Link>
                  <Link
                    href="/pros"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-white text-reno-dark font-semibold rounded-xl border border-slate-200 hover:border-primary/30 hover:shadow-float transition-all"
                  >
                    Browse Pros
                  </Link>
                </div>
              </div>

              {/* Right: Overview Stats Card */}
              <div className="lg:col-span-5">
                <div className="bg-white rounded-2xl shadow-float border border-primary/5 p-6 md:p-7 space-y-4">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                    Project Overview
                  </h3>

                  {/* Timeline */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#f6f8f8]">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-lg">
                          {overviewIcons.timeline}
                        </span>
                      </div>
                      <span className="font-medium text-sm text-reno-dark">
                        Timeline
                      </span>
                    </div>
                    <span className="font-bold text-primary text-sm">
                      {service.overview.timeline}
                    </span>
                  </div>

                  {/* Difficulty */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#f6f8f8]">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-lg">
                          {overviewIcons.difficulty}
                        </span>
                      </div>
                      <span className="font-medium text-sm text-reno-dark">
                        Difficulty
                      </span>
                    </div>
                    <span className="font-bold text-sm text-reno-dark">
                      {service.overview.difficulty}
                    </span>
                  </div>

                  {/* Starting Price */}
                  <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#f6f8f8]">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-lg">
                          {overviewIcons.price}
                        </span>
                      </div>
                      <span className="font-medium text-sm text-reno-dark">
                        Starting at
                      </span>
                    </div>
                    <span className="font-bold text-primary text-sm">
                      {startingPrice}
                    </span>
                  </div>

                  {/* Season or Permit */}
                  {service.overview.seasonal ? (
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#f6f8f8]">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                          <span className="material-symbols-outlined text-lg">
                            {overviewIcons.seasonal}
                          </span>
                        </div>
                        <span className="font-medium text-sm text-reno-dark">
                          Best Season
                        </span>
                      </div>
                      <span className="font-bold text-sm text-reno-dark">
                        {service.overview.seasonal}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#f6f8f8]">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                          <span className="material-symbols-outlined text-lg">
                            {overviewIcons.permit}
                          </span>
                        </div>
                        <span className="font-medium text-sm text-reno-dark">
                          Permit
                        </span>
                      </div>
                      <span className="font-bold text-sm text-reno-dark">
                        {service.permits.obcRequired
                          ? 'Required'
                          : 'Usually not'}
                      </span>
                    </div>
                  )}

                  {/* Floating trust badge */}
                  <div className="flex items-center gap-3 p-3.5 rounded-xl border border-primary/20 bg-white shadow-sm">
                    <span
                      className="material-symbols-outlined text-primary text-2xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      shield_with_heart
                    </span>
                    <div>
                      <p className="font-bold text-sm text-reno-dark">
                        Escrow Protected
                      </p>
                      <p className="text-[10px] text-slate-500">
                        Funds held until milestones verified
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            Section 2 — What Is It + When You Need It
        ═══════════════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-20 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
              {/* Left: What Is It */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-xs mb-4">
                  <span className="material-symbols-outlined text-sm">
                    info
                  </span>
                  Overview
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-reno-dark mb-6">
                  What is {service.title.toLowerCase()}?
                </h2>
                <div className="space-y-4 text-slate-600 leading-relaxed md:text-lg">
                  {service.whatIsIt.split('\n\n').map((para, i) => (
                    <p key={i}>{para}</p>
                  ))}
                </div>
              </div>

              {/* Right: When You Need It */}
              <div>
                <h3 className="font-display text-xl font-bold text-reno-dark mb-6">
                  When you need {service.title.toLowerCase()}
                </h3>
                <ul className="space-y-4">
                  {service.whenYouNeedIt.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span
                          className="material-symbols-outlined text-primary text-sm"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check_circle
                        </span>
                      </div>
                      <span className="text-slate-600 leading-relaxed">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            Section 3 — The Process (Timeline)
        ═══════════════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-20 bg-[#f6f8f8] border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-xs mb-4">
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  timeline
                </span>
                Step by Step
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-reno-dark">
                The Process
              </h2>
              <p className="mt-3 text-slate-500">
                What happens from start to finish
              </p>
            </div>

            <div className="space-y-0">
              {service.processSteps.map((step, i) => (
                <div key={i} className="relative flex gap-5">
                  {/* Timeline */}
                  <div className="flex flex-col items-center">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white shadow-float">
                      {i + 1}
                    </div>
                    {i < service.processSteps.length - 1 && (
                      <div className="w-px flex-1 bg-primary/20" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="pb-10">
                    <div className="flex items-baseline gap-3">
                      <h3 className="text-lg font-bold text-reno-dark">
                        {step.title}
                      </h3>
                      {step.duration && (
                        <span className="text-xs font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                          {step.duration}
                        </span>
                      )}
                    </div>
                    <p className="mt-1.5 text-slate-600">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            Section 4 — Pricing & Permits (Bento Grid)
        ═══════════════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            {/* Section header */}
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-xs mb-4">
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  payments
                </span>
                Pricing Transparency
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-reno-dark mb-3">
                Investment Guide
              </h2>
              <p className="text-slate-500 max-w-2xl text-lg">
                {service.pricing.intro}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {/* Price breakdown cards */}
              {service.pricing.breakdowns.map((item, i) => (
                <div
                  key={i}
                  className={`rounded-2xl p-6 border transition-all duration-300 hover:-translate-y-1 hover:shadow-float-hover ${
                    i === 0
                      ? 'bg-reno-dark text-white border-transparent md:col-span-2 lg:col-span-1'
                      : 'bg-white border-primary/5 shadow-float'
                  }`}
                >
                  {i === 0 && (
                    <span className="material-symbols-outlined text-primary/40 mb-3 block text-3xl">
                      diamond
                    </span>
                  )}
                  <p
                    className={`text-sm font-medium ${
                      i === 0 ? 'text-slate-400' : 'text-slate-500'
                    }`}
                  >
                    {item.scope}
                  </p>
                  <p
                    className={`mt-2 text-2xl font-extrabold tracking-tight ${
                      i === 0 ? 'text-white' : 'text-reno-dark'
                    }`}
                  >
                    {item.range}
                  </p>
                  {item.factors && (
                    <p
                      className={`mt-2 text-xs ${
                        i === 0 ? 'text-slate-500' : 'text-slate-400'
                      }`}
                    >
                      Depends on: {item.factors}
                    </p>
                  )}
                </div>
              ))}

              {/* Permit card */}
              <div className="rounded-2xl p-6 bg-white border border-primary/5 shadow-float">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className="material-symbols-outlined text-primary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    description
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    Permits
                  </span>
                </div>
                {service.permits.obcRequired ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-700 text-xs font-bold">
                    <span className="material-symbols-outlined text-sm">
                      warning
                    </span>
                    Permit Required
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                    <span
                      className="material-symbols-outlined text-sm"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    Usually Not Required
                  </span>
                )}
                {service.permits.items.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {service.permits.items.slice(0, 3).map((item, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between text-xs"
                      >
                        <span className="text-slate-600 truncate mr-2">
                          {item.name}
                        </span>
                        <span className="font-bold text-reno-dark whitespace-nowrap">
                          {item.typical_cost}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Price factors */}
            {service.pricing.factors.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-3">
                  What Affects the Price
                </h3>
                <div className="flex flex-wrap gap-2">
                  {service.pricing.factors.map((factor, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#f6f8f8] text-sm text-slate-600 border border-slate-100"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
                      {factor}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Pricing CTA */}
            <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-6 rounded-2xl bg-primary/5 border border-primary/10">
              <div>
                <p className="font-bold text-reno-dark">
                  {service.pricing.ctaText}
                </p>
                <p className="mt-1 text-sm text-slate-500">
                  Get a ballpark estimate in under 2 minutes.
                </p>
              </div>
              <Link
                href="/price-check"
                className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-colors shadow-float whitespace-nowrap"
              >
                Try Price Check
                <span className="material-symbols-outlined text-lg">
                  arrow_forward
                </span>
              </Link>
            </div>

            {/* Cross-links */}
            <div className="mt-5 flex flex-col sm:flex-row gap-4">
              <Link
                href={`/costs/${service.slug}`}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                <span className="material-symbols-outlined text-base">
                  bar_chart
                </span>
                Detailed cost breakdown with city-by-city pricing
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </Link>
              <Link
                href="/contracts"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
              >
                <span className="material-symbols-outlined text-base">
                  description
                </span>
                Free contract template for this service
                <span className="material-symbols-outlined text-sm">
                  arrow_forward
                </span>
              </Link>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            Section 4b — Permit Details Table (if permits exist)
        ═══════════════════════════════════════════════════════════════ */}
        {service.permits.items.length > 0 && (
          <section className="py-16 md:py-20 border-b border-slate-100 bg-[#f6f8f8]">
            <div className="max-w-4xl mx-auto px-6">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-primary text-lg"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    gavel
                  </span>
                </div>
                <div>
                  <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-reno-dark">
                    Permits & Building Code
                  </h2>
                  <p className="text-sm text-slate-500 mt-0.5">
                    Ontario Building Code requirements
                  </p>
                </div>
              </div>

              <div className="overflow-hidden rounded-2xl border border-primary/5 bg-white shadow-float">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-slate-100 bg-[#f6f8f8]">
                      <th className="px-5 py-3.5 font-bold text-xs uppercase tracking-widest text-slate-400">
                        Permit / Approval
                      </th>
                      <th className="px-5 py-3.5 font-bold text-xs uppercase tracking-widest text-slate-400">
                        Authority
                      </th>
                      <th className="px-5 py-3.5 font-bold text-xs uppercase tracking-widest text-slate-400">
                        Typical Cost
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {service.permits.items.map((item, i) => (
                      <tr
                        key={i}
                        className="border-b border-slate-50 last:border-0"
                      >
                        <td className="px-5 py-3.5 font-medium text-reno-dark">
                          {item.name}
                        </td>
                        <td className="px-5 py-3.5 text-slate-500">
                          {item.authority}
                        </td>
                        <td className="px-5 py-3.5 font-bold text-primary">
                          {item.typical_cost}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {service.permits.notes.length > 0 && (
                <div className="mt-5 space-y-2">
                  {service.permits.notes.map((note, i) => (
                    <p
                      key={i}
                      className="flex items-start gap-2 text-sm text-slate-500"
                    >
                      <span className="material-symbols-outlined text-primary/40 text-sm mt-0.5">
                        info
                      </span>
                      {note}
                    </p>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            Section 5 — Milestone Payment Architecture
        ═══════════════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-24 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Copy */}
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-xs mb-4">
                  <span
                    className="material-symbols-outlined text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    shield_lock
                  </span>
                  Payment Protection
                </div>
                <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-reno-dark mb-5 leading-tight">
                  Milestone-Verified{' '}
                  <span className="text-primary">Payment</span> Architecture
                </h2>
                <p className="text-slate-500 text-lg leading-relaxed mb-8">
                  Every {service.title.toLowerCase()} project on RenoNext uses
                  milestone-based escrow. Your funds are held securely and only
                  released when work is verified at each stage.
                </p>

                <ul className="space-y-4">
                  {[
                    {
                      icon: 'lock',
                      title: 'Escrow-Held Funds',
                      desc: 'Your money sits in a regulated escrow account, not the contractor\'s pocket.',
                    },
                    {
                      icon: 'verified',
                      title: 'Photo-Verified Milestones',
                      desc: 'Each phase is documented and verified before payment is released.',
                    },
                    {
                      icon: 'account_balance',
                      title: '10% Holdback Compliance',
                      desc: 'Automatic CPA-compliant holdback ensures warranty protection.',
                    },
                  ].map((item) => (
                    <li key={item.icon} className="flex gap-4">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span
                          className="material-symbols-outlined text-primary text-lg"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {item.icon}
                        </span>
                      </div>
                      <div>
                        <p className="font-semibold text-reno-dark">
                          {item.title}
                        </p>
                        <p className="text-sm text-slate-500 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>

                <Link
                  href="/how-it-works#vault"
                  className="mt-8 inline-flex items-center gap-2 px-6 py-3 bg-reno-dark text-white font-semibold rounded-xl hover:bg-reno-dark/90 transition-colors"
                >
                  See How Payments Work
                  <span className="material-symbols-outlined text-lg">
                    arrow_forward
                  </span>
                </Link>
              </div>

              {/* Right: Dashboard Preview */}
              <div className="relative rounded-2xl overflow-hidden bg-reno-dark p-6 md:p-8 shadow-2xl">
                {/* Glow */}
                <div className="absolute -right-8 -top-8 w-40 h-40 bg-primary/20 blur-3xl rounded-full pointer-events-none" />

                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <p className="text-slate-500 text-xs font-medium uppercase tracking-wider">
                        Project Center
                      </p>
                      <p className="text-white text-lg font-bold mt-0.5">
                        {service.title}
                      </p>
                    </div>
                    <div className="px-2.5 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-wider">
                      In Progress
                    </div>
                  </div>

                  {/* Milestone tracker */}
                  <div className="space-y-3">
                    {[
                      { label: 'Deposit', pct: '15%', done: true },
                      {
                        label: service.processSteps[1]?.title || 'Phase 1',
                        pct: '25%',
                        done: true,
                      },
                      {
                        label: service.processSteps[2]?.title || 'Phase 2',
                        pct: '30%',
                        done: false,
                        active: true,
                      },
                      { label: 'Final + Holdback', pct: '30%', done: false },
                    ].map((ms, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div
                          className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${
                            ms.done
                              ? 'bg-primary'
                              : ms.active
                                ? 'border-2 border-primary bg-transparent'
                                : 'border border-slate-600 bg-transparent'
                          }`}
                        >
                          {ms.done && (
                            <span className="material-symbols-outlined text-white text-xs">
                              check
                            </span>
                          )}
                          {ms.active && (
                            <div className="w-2 h-2 rounded-full bg-primary" />
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <span
                              className={`text-sm font-medium ${
                                ms.done
                                  ? 'text-slate-400'
                                  : ms.active
                                    ? 'text-white'
                                    : 'text-slate-500'
                              }`}
                            >
                              {ms.label}
                            </span>
                            <span
                              className={`text-xs font-bold ${
                                ms.done
                                  ? 'text-primary'
                                  : ms.active
                                    ? 'text-white'
                                    : 'text-slate-600'
                              }`}
                            >
                              {ms.pct}
                            </span>
                          </div>
                          {ms.done && (
                            <div className="h-1 bg-primary/30 rounded-full mt-1.5">
                              <div className="h-full bg-primary rounded-full w-full" />
                            </div>
                          )}
                          {ms.active && (
                            <div className="h-1 bg-slate-700 rounded-full mt-1.5">
                              <div className="h-full bg-primary rounded-full w-1/2" />
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Escrow balance */}
                  <div className="mt-6 pt-5 border-t border-slate-700/50 flex items-center justify-between">
                    <div>
                      <p className="text-slate-500 text-[10px] font-bold uppercase tracking-widest">
                        Escrow Balance
                      </p>
                      <p className="text-white text-xl font-extrabold tracking-tight mt-0.5">
                        {startingPrice.includes('$')
                          ? startingPrice
                          : `$${startingPrice}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className="material-symbols-outlined text-primary text-lg"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        lock
                      </span>
                      <span className="text-[10px] text-slate-500 font-medium">
                        Secured
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            Rebate Banner
        ═══════════════════════════════════════════════════════════════ */}
        <section className="py-6 border-b border-slate-100">
          <div className="max-w-4xl mx-auto px-6">
            <Link
              href="/savings"
              className="group flex items-center gap-4 rounded-2xl border border-primary/10 bg-primary/5 p-6 transition-all duration-300 hover:border-primary/30 hover:shadow-float"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary group-hover:text-white">
                <span
                  className="material-symbols-outlined text-primary text-2xl group-hover:text-white"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  savings
                </span>
              </div>
              <div className="min-w-0 flex-1">
                <p className="font-bold text-reno-dark">
                  Reduce your cost — see available rebates and incentives
                </p>
                <p className="mt-0.5 text-sm text-slate-500">
                  GTA homeowners can stack federal, provincial, and municipal
                  programs for significant savings.
                </p>
              </div>
              <span className="material-symbols-outlined text-primary transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </Link>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            Section 6 — Warnings (conditional)
        ═══════════════════════════════════════════════════════════════ */}
        {service.warnings && (
          <section className="py-16 md:py-20 border-b border-slate-100">
            <div className="max-w-4xl mx-auto px-6">
              <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-6 md:p-8">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center">
                    <span className="material-symbols-outlined text-amber-600 text-lg">
                      warning
                    </span>
                  </div>
                  <h2 className="text-xl font-bold text-amber-900">
                    {service.warnings.title}
                  </h2>
                </div>
                <ul className="space-y-3">
                  {service.warnings.items.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-amber-800"
                    >
                      <span className="material-symbols-outlined text-amber-500 text-sm mt-0.5">
                        error
                      </span>
                      <span className="text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            Section 7 — Verified Pros
        ═══════════════════════════════════════════════════════════════ */}
        {pros.length > 0 && (
          <section className="py-16 md:py-20 bg-[#f6f8f8] border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-primary text-lg"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified_user
                  </span>
                </div>
                <div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-reno-dark">
                    Verified {service.title} Pros
                  </h2>
                  <p className="text-slate-500 text-sm mt-0.5">
                    Licensed, insured, and approved on RenoNext
                  </p>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {pros.map((pro) => (
                  <Link
                    key={pro.id}
                    href={`/pros/${pro.id}`}
                    className="group"
                  >
                    <div className="h-full bg-white rounded-2xl border border-primary/5 shadow-float p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-float-hover">
                      {/* Photos strip */}
                      {pro.photos.length > 0 && (
                        <div className="mb-4 flex gap-2 overflow-hidden rounded-xl">
                          {pro.photos.slice(0, 3).map((url, i) => (
                            <div
                              key={i}
                              className="aspect-[4/3] flex-1 overflow-hidden rounded-lg bg-slate-100"
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
                          <h3 className="font-bold text-reno-dark group-hover:text-primary transition-colors">
                            {pro.company}
                          </h3>
                          <p className="mt-0.5 text-sm text-slate-500">
                            {pro.trade}
                          </p>
                        </div>
                        {pro.rating > 0 && (
                          <div className="flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-1">
                            <span
                              className="material-symbols-outlined text-amber-400 text-sm"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              star
                            </span>
                            <span className="text-xs font-bold text-reno-dark">
                              {pro.rating}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="mt-3 flex items-center gap-1.5 text-xs text-slate-500">
                        <span className="material-symbols-outlined text-sm">
                          location_on
                        </span>
                        {pro.location}
                      </div>

                      {/* Trust badges */}
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {pro.verified && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary/10 text-[10px] font-bold text-primary">
                            <span
                              className="material-symbols-outlined text-xs"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              verified
                            </span>
                            Verified
                          </span>
                        )}
                        {pro.wsib && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-primary-50 text-[10px] font-bold text-primary-700">
                            <span className="material-symbols-outlined text-xs">
                              shield
                            </span>
                            WSIB
                          </span>
                        )}
                        {pro.insured && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-purple-50 text-[10px] font-bold text-purple-700">
                            <span className="material-symbols-outlined text-xs">
                              verified_user
                            </span>
                            Insured
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-8 text-center">
                <Link
                  href="/pros"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-reno-dark font-semibold rounded-xl border border-slate-200 hover:border-primary/30 hover:shadow-float transition-all"
                >
                  Browse All Pros
                  <span className="material-symbols-outlined text-lg">
                    arrow_forward
                  </span>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            Section 8 — Trust Stats (Dark)
        ═══════════════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-20 bg-reno-dark border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-10">
              <h2 className="font-display text-2xl md:text-3xl font-bold text-white">
                Trusted by Ontario Homeowners
              </h2>
              <p className="text-slate-500 mt-2">
                RenoNext infrastructure protecting every{' '}
                {service.title.toLowerCase()} project
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  value: '$25M+',
                  label: 'Escrow Protected',
                  icon: 'account_balance',
                },
                {
                  value: '0.02%',
                  label: 'Dispute Rate',
                  icon: 'gpp_good',
                },
                {
                  value: '12k+',
                  label: 'Milestones Verified',
                  icon: 'verified',
                },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <span className="material-symbols-outlined text-primary text-3xl mb-3 block">
                    {stat.icon}
                  </span>
                  <p className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                    {stat.value}
                  </p>
                  <p className="text-slate-500 text-sm font-medium mt-2 uppercase tracking-wider">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            Section 9 — Related Services
        ═══════════════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-20 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-reno-dark mb-8">
              Related Services
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {service.relatedServices.map((related) => (
                <Link
                  key={related.slug}
                  href={`/services/${related.slug}`}
                  className="group"
                >
                  <div className="h-full bg-white rounded-2xl border border-primary/5 shadow-float p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-float-hover">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                        <span className="material-symbols-outlined text-primary text-lg">
                          construction
                        </span>
                      </div>
                      <h3 className="font-bold text-reno-dark group-hover:text-primary transition-colors">
                        {related.name}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-500 leading-relaxed">
                      {related.why}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-primary">
                      Learn more
                      <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">
                        arrow_forward
                      </span>
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            Section 10 — City-Specific Guides (basement-second-unit only)
        ═══════════════════════════════════════════════════════════════ */}
        {service.slug === 'basement-second-unit' && (
          <section className="py-16 md:py-20 bg-[#f6f8f8] border-b border-slate-100">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-primary text-lg"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    location_on
                  </span>
                </div>
                <div>
                  <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-reno-dark">
                    City-Specific Guides
                  </h2>
                  <p className="text-slate-500 text-sm mt-0.5">
                    Requirements vary by municipality — find your city
                  </p>
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {cityGuides.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/services/basement-second-unit/${city.slug}`}
                    className="group"
                  >
                    <div className="h-full bg-white rounded-2xl border border-primary/5 shadow-float p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-float-hover">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="material-symbols-outlined text-primary text-lg">
                          location_on
                        </span>
                        <h3 className="font-bold text-reno-dark group-hover:text-primary transition-colors">
                          {city.city}
                        </h3>
                      </div>
                      <p className="text-xs text-slate-400 mb-2">
                        {city.region}
                      </p>
                      <p className="text-sm text-slate-500 line-clamp-2">
                        {city.heroTagline}
                      </p>
                      <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-primary">
                        View guide
                        <span className="material-symbols-outlined text-sm transition-transform group-hover:translate-x-1">
                          arrow_forward
                        </span>
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══════════════════════════════════════════════════════════════
            Section 11 — FAQ
        ═══════════════════════════════════════════════════════════════ */}
        <section className="py-16 md:py-20">
          <div className="max-w-3xl mx-auto px-6">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-semibold text-xs mb-4">
                <span className="material-symbols-outlined text-sm">
                  help
                </span>
                FAQ
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-reno-dark">
                Common Questions
              </h2>
            </div>

            <div className="space-y-3">
              {service.faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group rounded-2xl border border-primary/5 bg-white shadow-sm overflow-hidden"
                >
                  <summary className="flex items-center justify-between cursor-pointer px-6 py-4 text-left font-semibold text-reno-dark hover:text-primary transition-colors list-none [&::-webkit-details-marker]:hidden">
                    <span className="pr-4">{faq.q}</span>
                    <span className="material-symbols-outlined text-slate-400 group-open:rotate-180 transition-transform duration-200 flex-shrink-0">
                      expand_more
                    </span>
                  </summary>
                  <div className="px-6 pb-5 text-slate-600 leading-relaxed border-t border-slate-50 pt-3">
                    {faq.a}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════════════════
            Section 12 — Bottom CTA
        ═══════════════════════════════════════════════════════════════ */}
        <section className="relative py-20 md:py-24 bg-reno-dark overflow-hidden">
          {/* Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />

          <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
            <span
              className="material-symbols-outlined text-primary text-5xl mb-6 block"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              rocket_launch
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Ready to start your{' '}
              <span className="text-primary">
                {service.title.toLowerCase()}
              </span>{' '}
              project?
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-slate-400 text-lg leading-relaxed">
              Get matched with verified {service.title.toLowerCase()} pros in
              Ontario. Escrow-protected payments, GPS-verified work, and a
              permanent record of everything.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/price-check"
                className="inline-flex items-center gap-2 px-8 py-3.5 bg-primary text-white font-bold rounded-xl hover:bg-primary/90 transition-colors shadow-float text-base"
              >
                Get a Price Estimate
                <span className="material-symbols-outlined text-lg">
                  arrow_forward
                </span>
              </Link>
              <Link
                href="/pros"
                className="inline-flex items-center gap-2 px-8 py-3.5 border border-slate-600 text-white font-semibold rounded-xl hover:bg-white/10 transition-colors text-base"
              >
                Browse Pros
              </Link>
            </div>

            {/* Trust seal */}
            <div className="mt-10 flex items-center justify-center gap-6 text-slate-600">
              {[
                { icon: 'verified_user', label: 'Escrow Protected' },
                { icon: 'gpp_good', label: 'Vetted Pros' },
                { icon: 'shield_with_heart', label: '10% Holdback' },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-1.5 text-xs font-medium"
                >
                  <span className="material-symbols-outlined text-primary/60 text-sm">
                    {badge.icon}
                  </span>
                  {badge.label}
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
