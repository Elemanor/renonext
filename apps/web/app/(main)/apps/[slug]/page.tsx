import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowRight,
  BarChart3,
  Bell,
  Box,
  Calculator,
  Camera,
  Check,
  ClipboardList,
  Clock,
  CloudRain,
  Crosshair,
  Download,
  Droplets,
  Eye,
  FileSpreadsheet,
  FileText,
  GitCompare,
  Layers,
  Link as LinkIcon,
  MapPin,
  MessageSquare,
  PenTool,
  Ruler,
  Users,
  WifiOff,
  Wrench,
} from 'lucide-react';

import { getAppBySlug, getAllAppSlugs, apps } from '@/lib/data/apps';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

// ---------------------------------------------------------------------------
// Icon mapping
// ---------------------------------------------------------------------------

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  AlertTriangle,
  BarChart3,
  Bell,
  Box,
  Calculator,
  Camera,
  ClipboardList,
  Clock,
  CloudRain,
  Crosshair,
  Download,
  Droplets,
  Eye,
  FileSpreadsheet,
  FileText,
  GitCompare,
  Layers,
  Link: LinkIcon,
  MapPin,
  MessageSquare,
  PenTool,
  Ruler,
  Users,
  WifiOff,
  Wrench,
};

// ---------------------------------------------------------------------------
// Static params generation
// ---------------------------------------------------------------------------

export async function generateStaticParams() {
  const slugs = getAllAppSlugs();
  return slugs.map((slug) => ({ slug }));
}

// ---------------------------------------------------------------------------
// Metadata generation
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const app = getAppBySlug(slug);

  if (!app) {
    return {
      title: 'App Not Found',
    };
  }

  return {
    title: `${app.name} | ${app.tagline} | RenoNext`,
    description: app.description,
    openGraph: {
      title: `${app.name} | ${app.tagline}`,
      description: app.description,
      type: 'website',
    },
  };
}

// ---------------------------------------------------------------------------
// Page component
// ---------------------------------------------------------------------------

export default async function AppPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const app = getAppBySlug(slug);

  if (!app) {
    notFound();
  }

  const otherApps = apps.filter((a) => a.slug !== slug);
  const HeroIcon = iconMap[app.icon];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className={`relative bg-gradient-to-br ${app.color} py-24 sm:py-32`}>
        <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,transparent,black)]" />
        <div className="container relative mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            {HeroIcon && (
              <div className="mb-6 flex justify-center">
                <div className="rounded-2xl bg-white/10 p-4 backdrop-blur-sm">
                  <HeroIcon className="h-16 w-16 text-white" />
                </div>
              </div>
            )}
            <h1 className="font-display mb-4 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
              {app.name}
            </h1>
            <p className="font-display mb-8 text-2xl text-white/90 sm:text-3xl">
              {app.tagline}
            </p>
            <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
              <Badge variant="secondary" className="bg-white/20 text-white backdrop-blur-sm">
                {app.audienceLabel}
              </Badge>
              <Badge variant="secondary" className="bg-white/20 text-white backdrop-blur-sm">
                {app.platform}
              </Badge>
            </div>
            <p className="font-body mx-auto max-w-3xl text-lg leading-relaxed text-white/95 sm:text-xl">
              {app.heroDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="bg-reno-cream py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="font-display mb-4 text-4xl font-bold text-reno-dark sm:text-5xl">
              Features
            </h2>
            <p className="font-body mx-auto max-w-2xl text-lg text-gray-700">
              Everything you need to get the job done, designed for the field.
            </p>
          </div>
          <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {app.features.map((feature, idx) => {
              const FeatureIcon = iconMap[feature.icon];
              return (
                <Card key={idx} className="bg-white shadow-lg transition-shadow hover:shadow-xl">
                  <CardHeader>
                    {FeatureIcon && (
                      <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-reno-green/10">
                        <FeatureIcon className="h-6 w-6 text-reno-green" />
                      </div>
                    )}
                    <CardTitle className="font-display text-xl font-bold text-reno-dark">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-body text-gray-700">{feature.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <h2 className="font-display mb-4 text-4xl font-bold text-reno-dark sm:text-5xl">
                Why {app.name}?
              </h2>
              <p className="font-body text-lg text-gray-700">
                Built for construction teams who need real results.
              </p>
            </div>
            <div className="space-y-4">
              {app.benefits.map((benefit, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-reno-green text-white">
                    <Check className="h-5 w-5" />
                  </div>
                  <p className="font-body text-lg text-gray-800">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="bg-gray-50 py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="font-display mb-4 text-4xl font-bold text-reno-dark sm:text-5xl">
              Use Cases
            </h2>
            <p className="font-body mx-auto max-w-2xl text-lg text-gray-700">
              Real scenarios from real construction sites.
            </p>
          </div>
          <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2">
            {app.useCases.map((useCase, idx) => (
              <Card key={idx} className="bg-white shadow-md transition-shadow hover:shadow-lg">
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-reno-teal/10 text-reno-teal">
                    <span className="font-display text-lg font-bold">{idx + 1}</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="font-body text-gray-800">{useCase}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshots Preview Section */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="font-display mb-4 text-4xl font-bold text-reno-dark sm:text-5xl">
              Screenshots
            </h2>
            <p className="font-body text-lg text-gray-700">
              A preview of what you'll see when you use {app.name}.
            </p>
          </div>
          <div className="mx-auto grid max-w-7xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {app.screenshots.map((screenshot, idx) => (
              <Card key={idx} className="overflow-hidden shadow-md">
                <div className="aspect-[9/16] bg-gradient-to-br from-gray-100 to-gray-200">
                  <div className="flex h-full items-center justify-center p-6 text-center">
                    <p className="font-display text-sm font-semibold text-gray-500">
                      {screenshot.label}
                    </p>
                  </div>
                </div>
                <CardContent className="p-4">
                  <p className="font-body text-sm text-gray-700">{screenshot.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Highlights Section */}
      <section className="bg-reno-cream py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <h2 className="font-display mb-4 text-4xl font-bold text-reno-dark sm:text-5xl">
              Tech Stack
            </h2>
            <p className="font-body mb-10 text-lg text-gray-700">
              Built with modern, production-ready technologies.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {app.techHighlights.map((tech, idx) => (
                <Badge
                  key={idx}
                  variant="outline"
                  className="border-reno-green bg-white px-4 py-2 text-sm font-medium text-reno-dark"
                >
                  {tech}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Other Apps Section */}
      <section className="bg-white py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center">
            <h2 className="font-display mb-4 text-4xl font-bold text-reno-dark sm:text-5xl">
              Explore the Full Suite
            </h2>
            <p className="font-body text-lg text-gray-700">
              {app.name} is part of RenoNext's complete construction toolkit.
            </p>
          </div>
          <div className="mx-auto grid max-w-6xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {otherApps.map((otherApp) => {
              const OtherIcon = iconMap[otherApp.icon];
              return (
                <Link key={otherApp.slug} href={`/apps/${otherApp.slug}`}>
                  <Card className="group h-full shadow-md transition-all hover:shadow-xl">
                    <CardHeader>
                      {OtherIcon && (
                        <div className="mb-3 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gray-100 transition-colors group-hover:bg-reno-green/10">
                          <OtherIcon className="h-6 w-6 text-gray-700 transition-colors group-hover:text-reno-green" />
                        </div>
                      )}
                      <CardTitle className="font-display text-lg font-bold text-reno-dark">
                        {otherApp.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="font-body text-gray-700">
                        {otherApp.tagline}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
          <div className="mt-10 text-center">
            <Button variant="outline" size="lg" asChild>
              <Link href="/apps">
                View All Apps
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-reno-dark py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-display mb-6 text-4xl font-bold text-white sm:text-5xl">
              Ready to try {app.name}?
            </h2>
            <p className="font-body mb-8 text-lg text-white/90">
              Join construction teams who are building smarter with RenoNext.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button size="lg" className="bg-reno-green hover:bg-reno-green/90" asChild>
                <Link href={app.ctaHref}>{app.ctaLabel}</Link>
              </Button>
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10" asChild>
                <Link href="/apps">Back to All Apps</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
