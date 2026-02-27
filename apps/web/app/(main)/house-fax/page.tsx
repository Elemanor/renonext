import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FileText,
  Package,
  Users,
  ClipboardCheck,
  Camera,
  Shield,
  Share2,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'HouseFax™ — Carfax for Your Home',
  description:
    'Every material. Every trade. Every inspection. Permanently documented. Digitally transferable.',
};

const features = [
  {
    icon: FileText,
    title: 'Property Overview',
    description: 'Complete project timeline, contractor details, and final value',
  },
  {
    icon: Package,
    title: 'Material Record',
    description: 'Every product installed with manufacturer details and specifications',
  },
  {
    icon: Users,
    title: 'Trade History',
    description: 'Verified record of all contractors and subcontractors who worked on site',
  },
  {
    icon: ClipboardCheck,
    title: 'Inspection Timeline',
    description: 'All inspections with pass/fail results and inspector notes',
  },
  {
    icon: Camera,
    title: 'Photo Timeline',
    description: 'Before, during, and after photos organized by milestone',
  },
  {
    icon: Shield,
    title: 'Warranty Tracker',
    description: 'Active warranties with expiry dates and claim information',
  },
  {
    icon: Share2,
    title: 'Shareable Link',
    description: 'Generate a secure link or QR code to share with buyers or appraisers',
  },
  {
    icon: ArrowRight,
    title: 'Transfer to Next Owner',
    description: 'Complete renovation history transfers when the property sells',
  },
];

const warrantyExamples = [
  {
    product: 'Kohler K-72218 Kitchen Faucet',
    term: 'Lifetime Limited',
    installed: 'Feb 3, 2026',
    installer: 'FlowRight Plumbing',
    status: 'expiring',
    daysLeft: 90,
  },
  {
    product: 'Schluter DITRA Uncoupling Membrane',
    term: '10 Year',
    installed: 'Jan 28, 2026',
    installer: 'Apex Builders',
    status: 'active',
    expiryDate: 'Jan 28, 2036',
  },
  {
    product: 'LP SolidStart LVL Beams',
    term: '20 Year Structural',
    installed: 'Jan 15, 2026',
    installer: 'Apex Builders',
    status: 'active',
    expiryDate: 'Jan 15, 2046',
  },
];

export default function HouseFaxPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-reno-teal-light py-20 lg:py-28">
        <div className="absolute inset-0 bg-gradient-to-br from-reno-teal/5 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Column */}
            <div className="flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-reno-teal/10 px-4 py-2 text-sm font-medium text-reno-teal mb-6 w-fit">
                <Shield className="h-4 w-4" />
                Introducing HouseFax™
              </div>
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-reno-dark mb-6">
                Carfax for your home.
              </h1>
              <p className="text-xl text-gray-700 mb-4">
                Every material. Every trade. Every inspection.{' '}
                <span className="font-semibold text-reno-teal">
                  Permanently documented.
                </span>{' '}
                Digitally transferable.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                When 42 Maple Drive sells in 2031, the buyer sees the verified
                renovation history. No guessing. No hidden work. Complete
                transparency.
              </p>
              <Link
                href="/house-fax/sample"
                className="inline-flex items-center gap-2 rounded-lg bg-reno-teal px-6 py-3 text-base font-semibold text-white transition hover:bg-reno-teal/90 w-fit"
              >
                See a Sample HouseFax™
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>

            {/* Right Column - Property Card Visual */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-md">
                <div className="rounded-2xl border-2 border-reno-teal/20 bg-white p-8 shadow-2xl">
                  <div className="mb-6 flex items-start justify-between">
                    <div>
                      <h3 className="font-display text-2xl text-reno-dark">
                        42 Maple Drive
                      </h3>
                      <p className="text-gray-600">Toronto, ON · M4K 1N2</p>
                    </div>
                    <div className="rounded-full bg-reno-teal/10 p-3">
                      <FileText className="h-6 w-6 text-reno-teal" />
                    </div>
                  </div>

                  <div className="space-y-3 border-t border-gray-200 pt-6">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Renovation Status
                      </span>
                      <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                        <CheckCircle2 className="h-3 w-3" />
                        Verified
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Completed</span>
                      <span className="text-sm font-semibold text-reno-dark">
                        February 2026
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        Project Value
                      </span>
                      <span className="text-sm font-semibold text-reno-dark">
                        $148,000
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Contractor</span>
                      <span className="text-sm font-semibold text-reno-teal">
                        Apex Builders
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 rounded-lg bg-reno-teal-light p-4">
                    <div className="flex items-center gap-2 text-sm font-medium text-reno-teal">
                      <Share2 className="h-4 w-4" />
                      Digitally Transferable
                    </div>
                    <p className="mt-1 text-xs text-gray-600">
                      Complete renovation record transfers to future owners
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Inside Section */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-reno-dark mb-4">
              What's inside a HouseFax™
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Every renovation project on RenoNext automatically generates a
              complete, verified record of all work performed.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="group rounded-xl border border-gray-200 bg-white p-6 transition hover:border-reno-teal hover:shadow-lg"
                >
                  <div className="mb-4 inline-flex rounded-lg bg-reno-teal-light p-3 text-reno-teal transition group-hover:bg-reno-teal group-hover:text-white">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="font-semibold text-lg text-reno-dark mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Warranty Tracking Section */}
      <section className="bg-reno-cream py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-16 text-center">
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl text-reno-dark mb-4">
              Warranty tracking that actually works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get notified before warranties expire. Know exactly what's covered
              and who to call when you need service.
            </p>
          </div>

          {/* Alert Example */}
          <div className="mx-auto max-w-4xl mb-8">
            <div className="rounded-lg border-2 border-amber-300 bg-amber-50 p-4 flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-semibold text-amber-900">
                  Your Kohler faucet warranty expires in 90 days.
                </p>
                <p className="text-sm text-amber-700 mt-1">
                  Installed by FlowRight Plumbing on Feb 3, 2026. Contact them
                  for service before May 3, 2026.
                </p>
              </div>
            </div>
          </div>

          {/* Warranty Table */}
          <div className="mx-auto max-w-6xl">
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50">
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Product
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Warranty Term
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Install Date
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Installer
                      </th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {warrantyExamples.map((warranty, index) => (
                      <tr key={index} className="hover:bg-gray-50">
                        <td className="px-6 py-4 text-sm font-medium text-reno-dark">
                          {warranty.product}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {warranty.term}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {warranty.installed}
                        </td>
                        <td className="px-6 py-4 text-sm text-reno-teal">
                          {warranty.installer}
                        </td>
                        <td className="px-6 py-4">
                          {warranty.status === 'active' ? (
                            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                              <CheckCircle2 className="h-3 w-3" />
                              Active until {warranty.expiryDate}
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                              <AlertCircle className="h-3 w-3" />
                              Expiring in {warranty.daysLeft} days
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 text-center">
            <Link
              href="/house-fax/sample"
              className="inline-flex items-center gap-2 rounded-lg bg-reno-teal px-8 py-4 text-lg font-semibold text-white transition hover:bg-reno-teal/90"
            >
              See a Sample HouseFax™
              <ArrowRight className="h-5 w-5" />
            </Link>
            <p className="mt-4 text-sm text-gray-600">
              View a complete renovation record for a real project
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
