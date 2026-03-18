import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowRight, Wifi, MapPin, Layers, HardHat } from 'lucide-react';
import { apps } from '@/lib/data/apps';
import { Badge } from '@/components/ui/badge';

export const metadata: Metadata = {
  title: 'Construction Apps — Field, Office, Client | RenoNext',
  description:
    'Five purpose-built apps for field crews, project managers, and office teams. Offline-first, GPS-verified, and built for construction.',
};

export default function AppsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-reno-dark via-reno-dark to-gray-900 text-white">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-5" />
        <div className="relative mx-auto max-w-7xl px-6 py-24 lg:px-8 lg:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-display text-5xl font-bold leading-tight tracking-tight sm:text-6xl lg:text-7xl">
              The App Suite That Runs Your Operation
            </h1>
            <p className="mt-6 text-lg font-body leading-relaxed text-gray-300 sm:text-xl">
              Five purpose-built apps for field crews, project managers, and office teams.
              Offline-first. GPS-verified. Built for construction.
            </p>

            {/* Stats Badges */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <div className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 backdrop-blur-sm">
                <Layers className="h-5 w-5 text-reno-green" />
                <span className="font-body text-sm font-semibold">5 Apps</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 backdrop-blur-sm">
                <Wifi className="h-5 w-5 text-reno-teal" />
                <span className="font-body text-sm font-semibold">100% Offline-First</span>
              </div>
              <div className="flex items-center gap-2 rounded-lg border border-white/20 bg-white/10 px-4 py-2.5 backdrop-blur-sm">
                <HardHat className="h-5 w-5 text-reno-purple" />
                <span className="font-body text-sm font-semibold">Built for Construction</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Grid */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {apps.map((app) => (
              <Link
                key={app.slug}
                href={`/apps/${app.slug}`}
                className="group relative overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                {/* Gradient Top Stripe */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${app.color}`} />

                <div className="p-6">
                  {/* App Name & Tagline */}
                  <div className="mb-4">
                    <h3 className="font-display text-2xl font-bold text-reno-dark">
                      {app.name}
                    </h3>
                    <p className="mt-1.5 font-body text-sm leading-snug text-gray-600">
                      {app.tagline}
                    </p>
                  </div>

                  {/* Audience Badge */}
                  <Badge variant="secondary" className="mb-4 font-body">
                    {app.audienceLabel}
                  </Badge>

                  {/* Description */}
                  <p className="font-body text-sm leading-relaxed text-gray-700">
                    {app.description}
                  </p>

                  {/* Feature Highlights */}
                  <div className="mt-6 space-y-2.5">
                    {app.features.slice(0, 3).map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <div className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-reno-green" />
                        <span className="font-body text-xs leading-tight text-gray-600">
                          {feature.title}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Learn More Link */}
                  <div className="mt-6 flex items-center gap-1.5 font-body text-sm font-semibold text-reno-green group-hover:gap-2.5 transition-all">
                    <span>Learn More</span>
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why RenoNext Apps */}
      <section className="bg-reno-cream py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-4xl font-bold text-reno-dark sm:text-5xl">
              Why RenoNext Apps
            </h2>
            <p className="mt-4 font-body text-lg leading-relaxed text-gray-700">
              Purpose-built software for construction teams who work in the field, not just at a desk.
            </p>
          </div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Offline-First */}
            <div className="rounded-xl bg-white p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-reno-green/10">
                <Wifi className="h-6 w-6 text-reno-green" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-reno-dark">
                Offline-First
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-gray-600">
                Works on remote job sites with no signal. Data syncs automatically when
                connectivity returns.
              </p>
            </div>

            {/* GPS-Verified */}
            <div className="rounded-xl bg-white p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-reno-teal/10">
                <MapPin className="h-6 w-6 text-reno-teal" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-reno-dark">
                GPS-Verified
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-gray-600">
                Location proof on every action. Geofenced check-ins and site-specific data
                ensure accountability.
              </p>
            </div>

            {/* One Ecosystem */}
            <div className="rounded-xl bg-white p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-reno-purple/10">
                <Layers className="h-6 w-6 text-reno-purple" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-reno-dark">
                One Ecosystem
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-gray-600">
                All apps share data through the RenoNext platform. One login, one project
                database, zero duplicate entry.
              </p>
            </div>

            {/* Built for Gloves */}
            <div className="rounded-xl bg-white p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-orange-500/10">
                <HardHat className="h-6 w-6 text-orange-500" />
              </div>
              <h3 className="mt-5 font-display text-xl font-bold text-reno-dark">
                Built for Gloves
              </h3>
              <p className="mt-3 font-body text-sm leading-relaxed text-gray-600">
                Designed for field conditions, not office chairs. Large touch targets, simple
                workflows, and fast input.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-br from-reno-green to-reno-teal py-20 text-white">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-8">
          <h2 className="font-display text-4xl font-bold sm:text-5xl">
            Ready to modernize your operation?
          </h2>
          <p className="mt-4 font-body text-lg leading-relaxed text-white/90">
            Join construction companies using RenoNext apps to eliminate paper, improve
            compliance, and spend less time on admin.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-white px-8 py-4 font-body text-base font-semibold text-reno-green shadow-lg transition-all hover:shadow-xl hover:scale-105"
          >
            Get in Touch
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
