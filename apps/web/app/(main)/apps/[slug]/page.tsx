import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAppBySlug, getAllAppSlugs, apps } from '@/lib/data/apps';

// ---------------------------------------------------------------------------
// Material Symbols icon mapping from Lucide icon names
// ---------------------------------------------------------------------------
const materialIconMap: Record<string, string> = {
  AlertTriangle: 'warning',
  BarChart3: 'bar_chart',
  Bell: 'notifications',
  Box: 'inventory_2',
  Calculator: 'calculate',
  Camera: 'photo_camera',
  Check: 'check_circle',
  ClipboardList: 'assignment',
  Clock: 'schedule',
  CloudRain: 'cloud',
  Crosshair: 'gps_fixed',
  Download: 'download',
  Droplets: 'water_drop',
  Eye: 'visibility',
  FileSpreadsheet: 'table_chart',
  FileText: 'description',
  GitCompare: 'compare_arrows',
  Layers: 'layers',
  Link: 'link',
  MapPin: 'location_on',
  MessageSquare: 'chat',
  PenTool: 'edit',
  Ruler: 'straighten',
  Users: 'group',
  WifiOff: 'wifi_off',
  Wrench: 'build',
};

function getMaterialIcon(lucideIconName: string): string {
  return materialIconMap[lucideIconName] || 'extension';
}

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
    return { title: 'App Not Found' };
  }

  return {
    title: `${app.name} | ${app.tagline} | RenoNext`,
    description: app.description,
    alternates: {
      canonical: `/apps/${slug}`,
    },
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
  const heroIcon = getMaterialIcon(app.icon);

  // Pick top 3 features for the bento grid
  const bentoFeatures = app.features.slice(0, 3);
  const remainingFeatures = app.features.slice(3);

  return (
    <div className="min-h-screen bg-white">
      {/* ═══════════════════════════════════════════════════════════════
          Section 1 — Hero
      ═══════════════════════════════════════════════════════════════ */}
      <header className="relative overflow-hidden pt-20 pb-28 md:pt-28 md:pb-36 px-6 bg-[#f6f8f8]">
        {/* Glow effects */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-[400px] h-[400px] bg-[#E8AA42]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 lg:gap-16 items-center relative">
          {/* Left: Copy */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-3 py-1 rounded-full text-primary text-xs font-bold tracking-widest uppercase mb-6">
              <span
                className="material-symbols-outlined text-xs"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                security
              </span>
              RenoNext Powered
            </div>

            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-reno-dark leading-[1.05] mb-6">
              {app.name}
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 leading-relaxed mb-4 max-w-xl">
              {app.tagline}
            </p>

            {/* Badges */}
            <div className="flex flex-wrap gap-2 mb-6">
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold">
                {app.audienceLabel}
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#f6f8f8] text-slate-500 text-xs font-bold border border-slate-100">
                {app.platform}
              </span>
            </div>

            <p className="text-slate-500 leading-relaxed mb-8 max-w-xl">
              {app.heroDescription}
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href={app.ctaHref}
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-float hover:-translate-y-1 hover:shadow-float-hover transition-all duration-300"
              >
                {app.ctaLabel}
                <span className="material-symbols-outlined text-lg">
                  arrow_forward
                </span>
              </Link>
              <Link
                href="/apps"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white text-reno-dark font-bold rounded-xl border border-slate-200 hover:border-primary/30 hover:shadow-float transition-all duration-300"
              >
                All Apps
              </Link>
            </div>
          </div>

          {/* Right: App mockup illustration */}
          <div className="relative">
            <div className="relative z-20 lg:translate-x-8">
              {/* Tablet mockup */}
              <div className="relative bg-white/70 backdrop-blur-xl rounded-[2rem] p-4 shadow-float border border-white/20">
                <div className="rounded-[1.5rem] w-full h-[340px] md:h-[400px] bg-reno-dark overflow-hidden relative">
                  {/* Dashboard UI mock */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-slate-500 text-[10px] uppercase tracking-wider font-bold">
                          {app.name}
                        </p>
                        <p className="text-white text-lg font-bold mt-0.5">
                          Dashboard
                        </p>
                      </div>
                      <div className="px-2.5 py-1 rounded-full bg-primary/20 text-primary text-[10px] font-bold">
                        Live
                      </div>
                    </div>

                    {/* Stats row */}
                    <div className="grid grid-cols-3 gap-3">
                      {[
                        { label: 'Active', value: '12', icon: 'pending_actions' },
                        { label: 'Complete', value: '47', icon: 'check_circle' },
                        { label: 'Alerts', value: '3', icon: 'warning' },
                      ].map((stat) => (
                        <div
                          key={stat.label}
                          className="bg-white/10 rounded-xl p-3 border border-white/5"
                        >
                          <span className="material-symbols-outlined text-primary text-sm block mb-1">
                            {stat.icon}
                          </span>
                          <p className="text-white text-xl font-extrabold">
                            {stat.value}
                          </p>
                          <p className="text-slate-500 text-[9px] font-medium uppercase tracking-wider">
                            {stat.label}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Progress bars */}
                    <div className="space-y-3">
                      <div className="bg-white/10 p-3 rounded-xl border border-white/5">
                        <div className="flex justify-between mb-2">
                          <span className="text-xs text-white font-medium">
                            {app.features[0]?.title || 'Primary Task'}
                          </span>
                          <span className="text-xs text-primary font-bold">
                            85%
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: '85%' }}
                          />
                        </div>
                      </div>
                      <div className="bg-white/10 p-3 rounded-xl border border-white/5">
                        <div className="flex justify-between mb-2">
                          <span className="text-xs text-white font-medium">
                            {app.features[1]?.title || 'Secondary Task'}
                          </span>
                          <span className="text-xs text-[#E8AA42] font-bold">
                            45%
                          </span>
                        </div>
                        <div className="h-1.5 w-full bg-white/10 rounded-full">
                          <div
                            className="h-full bg-[#E8AA42] rounded-full"
                            style={{ width: '45%' }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone mockup overlap */}
              <div className="absolute -bottom-10 -left-6 w-40 md:w-48 z-30">
                <div className="bg-white/70 backdrop-blur-xl rounded-[2rem] p-2.5 shadow-float border border-white/40">
                  <div className="bg-white rounded-[1.5rem] p-3 space-y-3 h-64">
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] font-bold text-primary uppercase tracking-wider">
                        {app.name}
                      </span>
                      <span className="material-symbols-outlined text-slate-400 text-xs">
                        notifications
                      </span>
                    </div>
                    <div className="bg-[#f6f8f8] rounded-lg p-2.5">
                      <p className="text-[7px] text-slate-500 uppercase">
                        Quick Action
                      </p>
                      <p className="text-[10px] font-bold text-reno-dark">
                        {app.features[0]?.title || 'Start Task'}
                      </p>
                    </div>
                    <div className="bg-primary rounded-lg p-2.5 text-center">
                      <span className="material-symbols-outlined text-white text-lg">
                        {heroIcon}
                      </span>
                      <p className="text-[8px] text-white font-bold mt-1">
                        Open
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════
          Section 2 — Trust Bar
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-8 bg-white border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6 opacity-60 hover:opacity-100 transition-opacity duration-500">
          <span className="text-xs font-bold uppercase tracking-widest text-slate-500">
            Certified by the RenoNext Network
          </span>
          <div className="flex flex-wrap justify-center gap-8 md:gap-12 items-center">
            {[
              { icon: 'verified_user', label: 'TRUST-SEAL' },
              { icon: 'build_circle', label: 'VERIFIED' },
              { icon: 'token', label: 'ARCH-AUDIT' },
              { icon: 'monitoring', label: 'SAFE-PAY' },
            ].map((badge) => (
              <div
                key={badge.label}
                className="flex items-center gap-2 text-reno-dark"
              >
                <span
                  className="material-symbols-outlined text-primary text-lg"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {badge.icon}
                </span>
                <span className="font-bold text-sm tracking-tight">
                  {badge.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          Section 3 — Features Bento Grid (Top 3)
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-reno-dark mb-4">
              Engineered for Efficiency
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              Every tool you need to maximize performance and minimize downtime.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Feature 1: Large card (7-col) */}
            {bentoFeatures[0] && (
              <div className="md:col-span-7">
                <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-float hover:-translate-y-1 hover:shadow-float-hover transition-all duration-300 h-full flex flex-col justify-between overflow-hidden relative">
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-6">
                      <span
                        className="material-symbols-outlined"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {getMaterialIcon(bentoFeatures[0].icon)}
                      </span>
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold text-reno-dark mb-4">
                      {bentoFeatures[0].title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed max-w-md text-lg">
                      {bentoFeatures[0].description}
                    </p>
                  </div>

                  {/* Decorative UI element */}
                  <div className="mt-10 bg-[#f6f8f8] rounded-xl p-4 border border-slate-100">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-bold uppercase text-slate-400 tracking-wider">
                        Status Monitor
                      </span>
                      <span className="text-xs bg-amber-50 text-amber-700 px-2 py-0.5 rounded-full font-bold">
                        Action Required
                      </span>
                    </div>
                    <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full w-4/5" />
                    </div>
                    <div className="flex justify-between mt-2">
                      <span className="text-[10px] text-slate-400">
                        Last checked: 2h ago
                      </span>
                      <span className="text-[10px] text-primary font-bold">
                        12h remaining
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Feature 2: Accent card (5-col, primary bg) */}
            {bentoFeatures[1] && (
              <div className="md:col-span-5">
                <div className="bg-primary text-white rounded-[2rem] p-8 md:p-10 shadow-float hover:-translate-y-1 hover:shadow-float-hover transition-all duration-300 h-full relative overflow-hidden">
                  <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center mb-6">
                      <span
                        className="material-symbols-outlined"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {getMaterialIcon(bentoFeatures[1].icon)}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold mb-4">
                      {bentoFeatures[1].title}
                    </h3>
                    <p className="text-white/80 leading-relaxed mb-8">
                      {bentoFeatures[1].description}
                    </p>
                    <Link
                      href={app.ctaHref}
                      className="inline-flex items-center gap-2 bg-white text-primary px-6 py-3 rounded-full font-bold text-sm hover:bg-white/90 transition-colors"
                    >
                      Get Started
                      <span className="material-symbols-outlined text-sm">
                        {heroIcon}
                      </span>
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Feature 3: Full-width card (12-col) */}
            {bentoFeatures[2] && (
              <div className="md:col-span-12">
                <div className="bg-white rounded-[2rem] p-8 md:p-10 shadow-float hover:-translate-y-1 hover:shadow-float-hover transition-all duration-300 flex flex-col md:flex-row gap-10 items-center">
                  <div className="flex-1">
                    <div className="w-12 h-12 rounded-xl bg-[#E8AA42]/10 flex items-center justify-center text-[#E8AA42] mb-6">
                      <span
                        className="material-symbols-outlined"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {getMaterialIcon(bentoFeatures[2].icon)}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-reno-dark mb-4">
                      {bentoFeatures[2].title}
                    </h3>
                    <p className="text-slate-500 leading-relaxed mb-6 max-w-lg">
                      {bentoFeatures[2].description}
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#f6f8f8] rounded-lg text-xs font-medium text-slate-600 border border-slate-100">
                        <span
                          className="material-symbols-outlined text-primary text-sm"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check_circle
                        </span>
                        Verified Records
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#f6f8f8] rounded-lg text-xs font-medium text-slate-600 border border-slate-100">
                        <span
                          className="material-symbols-outlined text-primary text-sm"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          shield
                        </span>
                        Secure Storage
                      </span>
                    </div>
                  </div>
                  {/* Decorative side panel */}
                  <div className="flex-1 w-full bg-[#f6f8f8] rounded-2xl p-6 border border-slate-100">
                    <div className="space-y-3">
                      {app.features.slice(0, 4).map((f, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-3 p-3 bg-white rounded-xl border border-primary/5"
                        >
                          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <span className="material-symbols-outlined text-primary text-sm">
                              {getMaterialIcon(f.icon)}
                            </span>
                          </div>
                          <div>
                            <p className="text-xs font-bold text-reno-dark">
                              {f.title}
                            </p>
                            <p className="text-[10px] text-slate-400">
                              Active
                            </p>
                          </div>
                          <span className="ml-auto text-[10px] text-primary font-bold">
                            {['Live', 'Ready', 'Active', 'Online'][i % 4]}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          Section 4 — All Features Grid (remaining features)
      ═══════════════════════════════════════════════════════════════ */}
      {remainingFeatures.length > 0 && (
        <section className="py-16 md:py-20 px-6 bg-[#f6f8f8] border-y border-slate-100">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-reno-dark mb-8">
              More Capabilities
            </h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {remainingFeatures.map((feature, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl p-6 border border-primary/5 shadow-float hover:-translate-y-1 hover:shadow-float-hover transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    <span
                      className="material-symbols-outlined text-primary text-lg"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {getMaterialIcon(feature.icon)}
                    </span>
                  </div>
                  <h3 className="font-bold text-reno-dark mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════
          Section 5 — Benefits
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-reno-dark mb-3">
              Why {app.name}?
            </h2>
            <p className="text-slate-500 text-lg">
              Built for construction teams who need real results.
            </p>
          </div>
          <div className="space-y-3">
            {app.benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="flex items-start gap-4 bg-white rounded-2xl p-5 border border-primary/5 shadow-sm hover:shadow-float transition-all duration-300"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                  <span
                    className="material-symbols-outlined text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          Section 6 — Use Cases
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 px-6 bg-[#f6f8f8]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-reno-dark mb-3">
              Use Cases
            </h2>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Real scenarios from real construction sites.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 max-w-5xl mx-auto">
            {app.useCases.map((useCase, idx) => (
              <div
                key={idx}
                className="bg-white rounded-2xl p-6 border border-primary/5 shadow-float hover:-translate-y-1 hover:shadow-float-hover transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <span className="font-bold text-sm">{idx + 1}</span>
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Scenario
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed">{useCase}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          Section 7 — Tech Highlights
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-20 px-6 border-b border-slate-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-2xl md:text-3xl font-bold tracking-tight text-reno-dark mb-3">
            Tech Stack
          </h2>
          <p className="text-slate-500 mb-8">
            Built with modern, production-ready technologies.
          </p>
          <div className="flex flex-wrap justify-center gap-2.5">
            {app.techHighlights.map((tech, idx) => (
              <span
                key={idx}
                className="inline-flex items-center px-4 py-2 rounded-full bg-white border border-primary/10 text-sm font-medium text-reno-dark shadow-sm"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          Section 8 — Explore the Full Suite
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 md:py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-reno-dark mb-3">
              Explore the Full Suite
            </h2>
            <p className="text-slate-500 text-lg">
              {app.name} is part of RenoNext&apos;s complete construction
              toolkit.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4 max-w-6xl mx-auto">
            {otherApps.map((otherApp) => (
              <Link
                key={otherApp.slug}
                href={`/apps/${otherApp.slug}`}
                className="group"
              >
                <div className="h-full bg-white rounded-2xl border border-primary/5 shadow-float p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-float-hover">
                  <div className="w-10 h-10 rounded-xl bg-[#f6f8f8] flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                    <span className="material-symbols-outlined text-slate-500 group-hover:text-primary transition-colors">
                      {getMaterialIcon(otherApp.icon)}
                    </span>
                  </div>
                  <h3 className="font-bold text-reno-dark group-hover:text-primary transition-colors mb-1">
                    {otherApp.name}
                  </h3>
                  <p className="text-sm text-slate-500">{otherApp.tagline}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href="/apps"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white text-reno-dark font-semibold rounded-xl border border-slate-200 hover:border-primary/30 hover:shadow-float transition-all"
            >
              View All Apps
              <span className="material-symbols-outlined text-lg">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          Section 9 — Final CTA (Dark)
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-24 md:py-32 bg-reno-dark overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_70%_50%,rgba(15,186,189,0.12),transparent)] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">
            {/* Left: Copy */}
            <div className="max-w-xl text-center lg:text-left">
              <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight mb-6">
                Ready to scale your{' '}
                <span className="text-primary">workflow?</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-8">
                Download {app.name} today and join the RenoNext ecosystem of
                professional high-performance contractors.
              </p>
              <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                <Link
                  href="#"
                  className="group flex items-center gap-4 bg-white/5 border border-slate-700 hover:border-primary px-7 py-3 rounded-xl transition-all"
                >
                  <span
                    className="material-symbols-outlined text-3xl text-slate-400 group-hover:text-primary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    phone_iphone
                  </span>
                  <div className="text-left">
                    <p className="text-[10px] uppercase font-bold text-slate-500">
                      Available on
                    </p>
                    <p className="text-white text-lg font-bold">App Store</p>
                  </div>
                </Link>
                <Link
                  href="#"
                  className="group flex items-center gap-4 bg-white/5 border border-slate-700 hover:border-primary px-7 py-3 rounded-xl transition-all"
                >
                  <span
                    className="material-symbols-outlined text-3xl text-slate-400 group-hover:text-primary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    shop
                  </span>
                  <div className="text-left">
                    <p className="text-[10px] uppercase font-bold text-slate-500">
                      Get it on
                    </p>
                    <p className="text-white text-lg font-bold">Google Play</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Right: Phone mockup */}
            <div className="relative w-full max-w-xs">
              <div className="bg-primary/20 absolute inset-0 blur-3xl rounded-full pointer-events-none" />
              <div className="relative z-10 bg-reno-dark rounded-[2.5rem] p-3 border-4 border-slate-800 shadow-2xl lg:rotate-6">
                <div className="bg-white rounded-[2rem] p-5 space-y-4 h-[420px]">
                  {/* Notch */}
                  <div className="w-20 h-5 bg-reno-dark rounded-full mx-auto -mt-1" />

                  <div className="text-center">
                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-3">
                      <span
                        className="material-symbols-outlined text-primary text-2xl"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {heroIcon}
                      </span>
                    </div>
                    <p className="font-bold text-reno-dark">{app.name}</p>
                    <p className="text-[10px] text-slate-500">
                      RenoNext Ecosystem
                    </p>
                  </div>

                  <div className="space-y-2.5">
                    {app.features.slice(0, 3).map((f, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2.5 p-2.5 bg-[#f6f8f8] rounded-xl"
                      >
                        <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <span className="material-symbols-outlined text-primary text-sm">
                            {getMaterialIcon(f.icon)}
                          </span>
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-reno-dark">
                            {f.title}
                          </p>
                          <p className="text-[8px] text-slate-400">Tap to open</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
