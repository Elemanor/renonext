import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Hammer, Zap, Building2, Briefcase } from 'lucide-react';
import { services } from '@/lib/data/services';

export const metadata: Metadata = {
  title: 'All Services | RenoNext',
  description:
    'Browse 25 renovation and construction services in Ontario. Structural, trades, building, and professional services — with real pricing, process guides, and verified contractors.',
};

const serviceGroups = [
  {
    heading: 'Structural',
    description: 'Foundation, waterproofing, concrete, and masonry work.',
    icon: Building2,
    slugs: [
      'underpinning',
      'foundation-repair',
      'waterproofing',
      'concrete-works',
      'masonry',
      'framing',
    ],
  },
  {
    heading: 'Trades',
    description: 'Licensed and specialized trade services.',
    icon: Zap,
    slugs: [
      'electrical',
      'plumbing',
      'hvac',
      'insulation',
      'drains',
      'painting',
      'handyman',
      'cleaning',
    ],
  },
  {
    heading: 'Building',
    description: 'Major construction, renovations, and outdoor structures.',
    icon: Hammer,
    slugs: [
      'additions',
      'basement-second-unit',
      'roofing',
      'demolition',
      'decks',
    ],
  },
  {
    heading: 'Professional Services',
    description: 'Planning, permits, and project coordination.',
    icon: Briefcase,
    slugs: [
      'general-contractor',
      'project-management',
      'building-permit',
      'drafting',
      'estimating',
      'equipment-rental',
    ],
  },
];

export default function ServicesIndexPage() {
  return (
    <main className="bg-reno-cream min-h-screen">
      {/* Hero */}
      <section className="bg-reno-dark text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mb-4">
            All Services
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto">
            25 renovation and construction guides — real process steps, Ontario
            pricing, building code requirements, and verified contractors.
          </p>
        </div>
      </section>

      {/* Service Groups */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="space-y-16">
          {serviceGroups.map((group) => {
            const Icon = group.icon;
            const groupServices = group.slugs
              .map((slug) => services.find((s) => s.slug === slug))
              .filter(Boolean);

            return (
              <div key={group.heading}>
                <div className="flex items-center gap-3 mb-2">
                  <Icon className="w-6 h-6 text-reno-green" />
                  <h2 className="font-display text-2xl md:text-3xl text-reno-dark">
                    {group.heading}
                  </h2>
                </div>
                <p className="text-gray-600 mb-6 ml-9">{group.description}</p>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {groupServices.map((service) =>
                    service ? (
                      <Link
                        key={service.slug}
                        href={`/services/${service.slug}`}
                        className="group block bg-white rounded-xl border border-gray-200 p-5 hover:border-reno-green hover:shadow-md transition-all"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h3 className="font-semibold text-reno-dark group-hover:text-reno-green transition-colors">
                            {service.title}
                          </h3>
                          <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-reno-green transition-colors flex-shrink-0 mt-1" />
                        </div>
                        <p className="text-sm text-gray-500 mt-2 line-clamp-2">
                          {service.overview.summary}
                        </p>
                        <div className="flex items-center gap-3 mt-3 text-xs text-gray-400">
                          <span>{service.overview.timeline}</span>
                          <span className="w-1 h-1 rounded-full bg-gray-300" />
                          <span>{service.faqs.length} FAQs</span>
                        </div>
                      </Link>
                    ) : null
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-reno-green py-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="font-display text-3xl text-white mb-4">
            Not sure where to start?
          </h2>
          <p className="text-green-100 mb-8">
            Try our price check tool — answer a few questions and get a ballpark
            estimate for your project in 60 seconds.
          </p>
          <Link
            href="/price-check"
            className="inline-flex items-center gap-2 bg-white text-reno-green font-semibold px-6 py-3 rounded-lg hover:bg-green-50 transition-colors"
          >
            Price Check
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
