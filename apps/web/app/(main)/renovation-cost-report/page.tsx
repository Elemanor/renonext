import type { Metadata } from 'next';
import Link from 'next/link';
import { PageHero } from '@/components/ui/page-hero';
import { Section } from '@/components/ui/section';
import { SectionHeader } from '@/components/ui/section-header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { BreadcrumbJsonLd } from '@/components/costs/breadcrumb-jsonld';
import {
  serviceCosts,
  cityMultipliers,
  costCategories,
  formatPrice,
  formatPriceRange,
  getCityAdjustedPrice,
  getServiceCostsByCategory,
} from '@/lib/data/costs';
import type { ServiceCostData, CityMultiplier, NumericPriceRange } from '@/lib/data/costs';

export const metadata: Metadata = {
  title: '2026 Ontario Renovation Cost Report — Real Pricing Data | RenoNext',
  description: 'Comprehensive 2026 renovation cost report for Ontario. 25 services, 15 GTA cities, labour vs material splits, city-by-city comparisons. Free data from real contractor pricing.',
  alternates: {
    canonical: 'https://renonext.com/renovation-cost-report',
  },
};

// Compute key findings from data
function getKeyFindings() {
  // Most expensive city
  const mostExpensiveCity = [...cityMultipliers].sort((a, b) => b.overall - a.overall)[0]!;

  // Most affordable city
  const mostAffordableCity = [...cityMultipliers].sort((a, b) => a.overall - b.overall)[0]!;

  // Highest cost service (look at per-project scopes)
  let highestCostService: { service: ServiceCostData; price: number } = {
    service: serviceCosts[0]!,
    price: 0,
  };
  serviceCosts.forEach((service) => {
    service.priceRanges.forEach((range) => {
      if (range.unit === 'per project' && range.maxCAD > highestCostService.price) {
        highestCostService = { service, price: range.maxCAD };
      }
    });
  });

  // Average labour/material split
  const allRanges = serviceCosts.flatMap((s) => s.priceRanges);
  const avgLabour = Math.round(
    allRanges.reduce((sum, r) => sum + r.labourPct, 0) / allRanges.length,
  );
  const avgMaterial = 100 - avgLabour;

  // Price spread between cities
  const priceSpread = Math.round(
    ((mostExpensiveCity.overall - mostAffordableCity.overall) / mostAffordableCity.overall) * 100,
  );

  // Services requiring engineering
  const engineeringCount = serviceCosts.filter((s) => s.requiresEngineering).length;

  return {
    mostExpensiveCity,
    mostAffordableCity,
    highestCostService,
    avgLabour,
    avgMaterial,
    priceSpread,
    engineeringCount,
  };
}

// Get top 10 most expensive renovations
function getTop10MostExpensive() {
  const projectScopes: Array<{
    service: ServiceCostData;
    range: NumericPriceRange;
  }> = [];

  serviceCosts.forEach((service) => {
    service.priceRanges.forEach((range) => {
      if (range.unit === 'per project') {
        projectScopes.push({ service, range });
      }
    });
  });

  return projectScopes
    .sort((a, b) => b.range.maxCAD - a.range.maxCAD)
    .slice(0, 10);
}

// Aggregate unique cost tips
function getTopCostTips() {
  const allTips: Array<{ category: string; tip: string }> = [];

  costCategories.forEach((category) => {
    const services = getServiceCostsByCategory(category);
    services.forEach((service) => {
      service.costTips.slice(0, 2).forEach((tip) => {
        allTips.push({ category, tip });
      });
    });
  });

  // Take 2-3 from each category for variety
  const tipsByCategory: Record<string, string[]> = {};
  allTips.forEach(({ category, tip }) => {
    if (!tipsByCategory[category]) tipsByCategory[category] = [];
    if (tipsByCategory[category]!.length < 3) {
      tipsByCategory[category]!.push(tip);
    }
  });

  return Object.values(tipsByCategory).flat().slice(0, 12);
}

export default function RenovationCostReportPage() {
  const keyFindings = getKeyFindings();
  const top10 = getTop10MostExpensive();
  const costTips = getTopCostTips();

  // Example city for table: waterproofing full perimeter
  const waterproofingService = serviceCosts.find((s) => s.slug === 'waterproofing')!;
  const waterproofingRange = waterproofingService.priceRanges.find(
    (r) => r.scope.includes('Full-perimeter'),
  )!;

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: '2026 Ontario Renovation Cost Report',
            description:
              'Comprehensive renovation pricing data across 25 services and 15 GTA cities. Real contractor rates, labour vs material splits, and city-by-city comparisons.',
            datePublished: '2026-03-27',
            dateModified: '2026-03-27',
            author: {
              '@type': 'Organization',
              name: 'RenoNext',
              url: 'https://renonext.com',
            },
            publisher: {
              '@type': 'Organization',
              name: 'RenoNext',
              url: 'https://renonext.com',
              logo: {
                '@type': 'ImageObject',
                url: 'https://renonext.com/logo-icon.svg',
              },
            },
            mainEntityOfPage: 'https://renonext.com/renovation-cost-report',
          }),
        }}
      />

      <BreadcrumbJsonLd
        items={[
          { name: 'Home', href: '/' },
          { name: 'Cost Guides', href: '/costs' },
          { name: '2026 Report', href: '/renovation-cost-report' },
        ]}
      />

      {/* Hero Section */}
      <PageHero
        badge={{ icon: 'analytics', text: '2026 Data Report' }}
        title="2026 Ontario Renovation Cost Report"
        subtitle="The most comprehensive renovation pricing data covering 25 services, 15 GTA cities, and real contractor rates. Updated Q1 2026 with verified pricing from Ontario's largest contractor network."
        background="dark"
        stats={[
          { value: '25', label: 'Services' },
          { value: '15', label: 'Cities' },
          { value: '4', label: 'Categories' },
          { value: '375+', label: 'Price Points' },
        ]}
      />

      {/* Key Findings */}
      <Section background="cream">
        <SectionHeader
          badge={{ icon: 'lightbulb', text: 'Key Insights' }}
          title="2026 Market Highlights"
          subtitle="Six data-driven findings from our analysis of Ontario renovation pricing."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {/* Most Expensive City */}
          <Card className="bg-white rounded-2xl shadow-float">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-primary text-2xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    trending_up
                  </span>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-reno-dark">
                    {keyFindings.mostExpensiveCity.name}
                  </div>
                  <div className="text-sm text-slate-600 mt-1">
                    Most Expensive City ({Math.round((keyFindings.mostExpensiveCity.overall - 1) * 100)}% above baseline)
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Most Affordable City */}
          <Card className="bg-white rounded-2xl shadow-float">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-green-600 text-2xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    trending_down
                  </span>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-reno-dark">
                    {keyFindings.mostAffordableCity.name}
                  </div>
                  <div className="text-sm text-slate-600 mt-1">
                    Most Affordable City ({Math.round((1 - keyFindings.mostAffordableCity.overall) * 100)}% below baseline)
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Highest Cost Service */}
          <Card className="bg-white rounded-2xl shadow-float">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-amber-600 text-2xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    construction
                  </span>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-reno-dark">
                    {formatPrice(keyFindings.highestCostService.price)}
                  </div>
                  <div className="text-sm text-slate-600 mt-1">
                    Highest Project Cost ({keyFindings.highestCostService.service.title})
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Labour/Material Split */}
          <Card className="bg-white rounded-2xl shadow-float">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-blue-600 text-2xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    pie_chart
                  </span>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-reno-dark">
                    {keyFindings.avgLabour}% / {keyFindings.avgMaterial}%
                  </div>
                  <div className="text-sm text-slate-600 mt-1">
                    Average Labour / Material Split
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Price Spread */}
          <Card className="bg-white rounded-2xl shadow-float">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-purple-600 text-2xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    compare_arrows
                  </span>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-reno-dark">
                    {keyFindings.priceSpread}%
                  </div>
                  <div className="text-sm text-slate-600 mt-1">
                    Price Spread Across GTA
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Engineering Required */}
          <Card className="bg-white rounded-2xl shadow-float">
            <CardContent className="pt-6">
              <div className="flex items-center gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-red-600 text-2xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    engineering
                  </span>
                </div>
                <div>
                  <div className="text-3xl font-extrabold text-reno-dark">
                    {keyFindings.engineeringCount}
                  </div>
                  <div className="text-sm text-slate-600 mt-1">
                    Services Require Engineering
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* City Cost Comparison Table */}
      <Section>
        <SectionHeader
          badge={{ icon: 'location_city', text: 'Regional Analysis' }}
          title="City-by-City Cost Comparison"
          subtitle="How labour and material costs vary across the Greater Toronto Area, with waterproofing as a benchmark service."
        />

        <div className="mt-12 overflow-x-auto rounded-2xl border border-slate-200 shadow-float">
          <table className="w-full">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-left text-sm font-bold text-reno-dark">City</th>
                <th className="px-6 py-4 text-left text-sm font-bold text-reno-dark">Region</th>
                <th className="px-6 py-4 text-center text-sm font-bold text-reno-dark">
                  Labour Multiplier
                </th>
                <th className="px-6 py-4 text-center text-sm font-bold text-reno-dark">
                  Material Multiplier
                </th>
                <th className="px-6 py-4 text-center text-sm font-bold text-reno-dark">
                  Overall
                </th>
                <th className="px-6 py-4 text-right text-sm font-bold text-reno-dark">
                  Waterproofing (Full Perimeter)
                </th>
              </tr>
            </thead>
            <tbody>
              {[...cityMultipliers]
                .sort((a, b) => b.overall - a.overall)
                .map((city, idx) => {
                  const adjusted = getCityAdjustedPrice(
                    waterproofingRange.minCAD,
                    waterproofingRange.maxCAD,
                    waterproofingRange.labourPct,
                    waterproofingRange.materialPct,
                    city,
                  );
                  const isHighest = idx === 0;
                  const isLowest = idx === cityMultipliers.length - 1;

                  return (
                    <tr
                      key={city.slug}
                      className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}
                    >
                      <td className="px-6 py-4 font-bold text-reno-dark">{city.name}</td>
                      <td className="px-6 py-4 text-sm text-slate-600">{city.region}</td>
                      <td className="px-6 py-4 text-center text-sm">
                        {isHighest || isLowest ? (
                          <Badge variant={isHighest ? 'default' : 'secondary'} className="rounded-full">
                            {city.labour.toFixed(2)}
                          </Badge>
                        ) : (
                          <span className="text-slate-700">{city.labour.toFixed(2)}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center text-sm">
                        {isHighest || isLowest ? (
                          <Badge variant={isHighest ? 'default' : 'secondary'} className="rounded-full">
                            {city.material.toFixed(2)}
                          </Badge>
                        ) : (
                          <span className="text-slate-700">{city.material.toFixed(2)}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-center font-bold">
                        {isHighest || isLowest ? (
                          <Badge variant={isHighest ? 'default' : 'secondary'} className="rounded-full">
                            {city.overall.toFixed(2)}
                          </Badge>
                        ) : (
                          <span className="text-reno-dark">{city.overall.toFixed(2)}</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-right font-bold text-reno-dark">
                        {formatPriceRange(adjusted.min, adjusted.max)}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-sm text-slate-600 text-center">
          Multipliers are relative to Toronto baseline (1.00). Waterproofing example uses full-perimeter
          exterior waterproofing scope (base: {formatPriceRange(waterproofingRange.minCAD, waterproofingRange.maxCAD)}).
        </p>
      </Section>

      {/* Service Cost Overview by Category */}
      <Section background="cream">
        <SectionHeader
          badge={{ icon: 'category', text: 'Service Breakdown' }}
          title="All 25 Services by Category"
          subtitle="Comprehensive pricing across structural, trades, building, and professional services."
        />

        <div className="mt-12 space-y-16">
          {costCategories.map((category) => {
            const services = getServiceCostsByCategory(category);
            return (
              <div key={category}>
                <h3 className="text-2xl font-bold text-reno-dark mb-6">{category}</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {services.map((service) => (
                    <Link key={service.slug} href={`/costs/${service.slug}`}>
                      <Card className="bg-white rounded-2xl shadow-float hover:shadow-float-hover transition-all hover:-translate-y-1 h-full">
                        <CardHeader>
                          <div className="flex items-start justify-between gap-2">
                            <CardTitle className="text-lg">{service.title}</CardTitle>
                            {service.requiresEngineering && (
                              <Badge variant="default" className="rounded-full text-xs">
                                Engineering
                              </Badge>
                            )}
                          </div>
                          <CardDescription className="mt-2">
                            Starting at <span className="font-bold text-primary">{formatPrice(service.startingPrice)}</span>
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2 text-sm text-slate-600">
                            <div className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-base">schedule</span>
                              {service.typicalTimeline}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-base">list</span>
                              {service.priceRanges.length} price{' '}
                              {service.priceRanges.length === 1 ? 'scope' : 'scopes'}
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="material-symbols-outlined text-base">percent</span>
                              {service.contingencyPct}% contingency
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Labour vs Material Analysis */}
      <Section>
        <SectionHeader
          badge={{ icon: 'pie_chart', text: 'Cost Breakdown' }}
          title="Labour vs Material Split by Service"
          subtitle="Understanding where your renovation dollars go helps you make smarter decisions."
        />

        <div className="mt-12 space-y-12">
          {costCategories.map((category) => {
            const services = getServiceCostsByCategory(category);
            return (
              <div key={category}>
                <h3 className="text-xl font-bold text-reno-dark mb-6">{category}</h3>
                <div className="space-y-4">
                  {services.map((service) => {
                    const mainRange = service.priceRanges[0]!;
                    return (
                      <div key={service.slug} className="bg-white rounded-xl shadow-float p-6">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-bold text-reno-dark">{service.title}</h4>
                          <span className="text-sm text-slate-600">
                            {formatPriceRange(mainRange.minCAD, mainRange.maxCAD)}
                          </span>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="flex-1 h-8 bg-slate-100 rounded-lg overflow-hidden flex">
                            <div
                              className="bg-primary flex items-center justify-center text-white text-sm font-bold"
                              style={{ width: `${mainRange.labourPct}%` }}
                            >
                              {mainRange.labourPct}%
                            </div>
                            <div
                              className="bg-slate-400 flex items-center justify-center text-white text-sm font-bold"
                              style={{ width: `${mainRange.materialPct}%` }}
                            >
                              {mainRange.materialPct}%
                            </div>
                          </div>
                        </div>

                        <div className="mt-2 flex items-center gap-6 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-primary"></div>
                            <span className="text-slate-600">Labour</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-slate-400"></div>
                            <span className="text-slate-600">Material</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      {/* Top 10 Most Expensive Renovations */}
      <Section background="cream">
        <SectionHeader
          badge={{ icon: 'workspace_premium', text: 'Premium Projects' }}
          title="Top 10 Most Expensive Renovations"
          subtitle="The highest-cost projects in Ontario, ranked by maximum project price."
        />

        <div className="mt-12 bg-white rounded-2xl shadow-float overflow-hidden">
          {top10.map((item, idx) => {
            const { service, range } = item;
            return (
              <div
                key={`${service.slug}-${idx}`}
                className={`p-6 flex items-center gap-6 ${
                  idx < top10.length - 1 ? 'border-b border-slate-200' : ''
                }`}
              >
                {/* Rank */}
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <span className="text-2xl font-extrabold text-primary">{idx + 1}</span>
                </div>

                {/* Service Details */}
                <div className="flex-1">
                  <Link
                    href={`/costs/${service.slug}`}
                    className="text-lg font-bold text-reno-dark hover:text-primary transition-colors"
                  >
                    {service.title}
                  </Link>
                  <p className="text-sm text-slate-600 mt-1">{range.scope}</p>
                </div>

                {/* Price Range */}
                <div className="text-right">
                  <div className="text-xl font-bold text-reno-dark">
                    {formatPriceRange(range.minCAD, range.maxCAD)}
                  </div>
                  <div className="text-sm text-slate-600 mt-1">{service.typicalTimeline}</div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-8 text-center">
          <Link href="/costs">
            <Button size="lg" className="shadow-float">
              View All Cost Guides
              <span className="material-symbols-outlined ml-2">arrow_forward</span>
            </Button>
          </Link>
        </div>
      </Section>

      {/* Money-Saving Tips */}
      <Section>
        <SectionHeader
          badge={{ icon: 'savings', text: 'Expert Advice' }}
          title="12 Money-Saving Tips from the Data"
          subtitle="Actionable cost tips aggregated from verified contractors across Ontario."
        />

        <div className="mt-12 grid gap-6 sm:grid-cols-2">
          {costTips.map((tip, idx) => (
            <Card key={idx} className="bg-white rounded-2xl shadow-float">
              <CardContent className="pt-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-primary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      lightbulb
                    </span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">{tip}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Methodology Note */}
      <Section background="cream">
        <SectionHeader
          badge={{ icon: 'science', text: 'Methodology' }}
          title="How We Built This Report"
          subtitle="Transparency in data sourcing and analysis."
        />

        <div className="mt-12 max-w-3xl mx-auto">
          <Card className="bg-white rounded-2xl shadow-float">
            <CardContent className="pt-8 space-y-4 text-slate-700 leading-relaxed">
              <div className="flex gap-4">
                <span
                  className="material-symbols-outlined text-primary flex-shrink-0"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified
                </span>
                <p>
                  <strong className="text-reno-dark">Based on verified contractor pricing</strong>{' '}
                  across the Greater Toronto Area from our network of licensed, insured contractors.
                </p>
              </div>

              <div className="flex gap-4">
                <span
                  className="material-symbols-outlined text-primary flex-shrink-0"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  calendar_month
                </span>
                <p>
                  <strong className="text-reno-dark">Prices reflect Q1 2026 market rates</strong>{' '}
                  including labour inflation, material costs, and seasonal demand patterns.
                </p>
              </div>

              <div className="flex gap-4">
                <span
                  className="material-symbols-outlined text-primary flex-shrink-0"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  location_on
                </span>
                <p>
                  <strong className="text-reno-dark">City multipliers based on labour and material cost variations</strong>{' '}
                  across 15 GTA municipalities, accounting for regional demand, permit fees, and contractor availability.
                </p>
              </div>

              <div className="flex gap-4">
                <span
                  className="material-symbols-outlined text-primary flex-shrink-0"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  update
                </span>
                <p>
                  <strong className="text-reno-dark">Updated quarterly</strong>{' '}
                  to reflect changing market conditions, new construction technologies, and regulatory updates.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* CTA Section */}
      <Section background="dark">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-bold bg-white/10 text-primary mb-6">
            <span className="material-symbols-outlined text-base">calculate</span>
            Get Your Project Estimate
          </div>

          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Ready to Get an Exact Quote for Your Project?
          </h2>

          <p className="mt-6 text-lg text-slate-400 leading-relaxed">
            Use our intelligent pricing engine to get an instant estimate tailored to your city, scope, and timeline.
            Or browse our complete library of cost guides for detailed breakdowns.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/price-check">
              <Button
                size="lg"
                className="bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg shadow-float hover:shadow-float-hover hover:-translate-y-0.5 transition-all"
              >
                <span className="material-symbols-outlined mr-2">calculate</span>
                Check Your Price
              </Button>
            </Link>

            <Link href="/costs">
              <Button
                size="lg"
                variant="outline"
                className="bg-white/10 border border-white/20 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-colors"
              >
                <span className="material-symbols-outlined mr-2">menu_book</span>
                Browse Cost Guides
              </Button>
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
