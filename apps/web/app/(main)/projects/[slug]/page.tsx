import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getProjectBySlug,
  getAllProjectSlugs,
} from '@/lib/data/pro-content';

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

// ─── Static Generation ───────────────────────────────────────────────

export async function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const result = getProjectBySlug(slug);
  if (!result) return { title: 'Project Not Found | RenoNext' };

  const { project, pro } = result;
  const cost = project.stats?.cost ? ` — $${project.stats.cost}` : '';
  const title = `${project.seoTitle}${cost}`;
  const description = `${project.description.slice(0, 150)}... By ${pro.name}, ${pro.title} in ${pro.location}.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'article',
      url: `/projects/${slug}`,
    },
    alternates: {
      canonical: `/projects/${slug}`,
    },
  };
}

// ─── JSON-LD ─────────────────────────────────────────────────────────

function buildJsonLd(project: ReturnType<typeof getProjectBySlug>) {
  if (!project) return [];
  const { project: p, pro } = project;

  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Service',
      name: p.title,
      description: p.description,
      provider: {
        '@type': 'Person',
        name: pro.name,
        url: `https://renonext.com/pro/${pro.slug}`,
      },
      areaServed: {
        '@type': 'City',
        name: p.city,
      },
      ...(p.stats?.cost && {
        offers: {
          '@type': 'Offer',
          price: p.stats.cost,
          priceCurrency: 'CAD',
        },
      }),
      ...(p.review && {
        review: {
          '@type': 'Review',
          reviewRating: {
            '@type': 'Rating',
            ratingValue: p.review.rating,
          },
          author: {
            '@type': 'Person',
            name: p.review.name,
          },
          reviewBody: p.review.comment,
        },
      }),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://renonext.com' },
        { '@type': 'ListItem', position: 2, name: 'Projects', item: 'https://renonext.com/projects' },
        { '@type': 'ListItem', position: 3, name: p.title, item: `https://renonext.com/projects/${p.slug}` },
      ],
    },
    ...(p.youtubeId
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'VideoObject',
            name: p.title,
            description: p.description,
            thumbnailUrl: `https://i.ytimg.com/vi/${p.youtubeId}/hqdefault.jpg`,
            contentUrl: `https://www.youtube.com/shorts/${p.youtubeId}`,
            embedUrl: `https://www.youtube.com/embed/${p.youtubeId}`,
          },
        ]
      : []),
    ...(p.images && p.images.length > 0
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'ImageGallery',
            name: `${p.title} — Project Photos`,
            about: p.description,
            image: p.images.map((img, i) => ({
              '@type': 'ImageObject',
              url: `https://renonext.com${img}`,
              name: `${p.title} — photo ${i + 1}`,
              contentLocation: {
                '@type': 'Place',
                name: p.location,
              },
            })),
          },
        ]
      : []),
  ];
}

// ─── Page ────────────────────────────────────────────────────────────

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const result = getProjectBySlug(slug);
  if (!result) notFound();

  const { project, pro } = result;
  const jsonLdArray = buildJsonLd(result);

  const statusLabel = project.status === 'in-progress' ? 'In Progress' : project.status === 'planned' ? 'Planned' : 'Completed';
  const statusIcon = project.status === 'in-progress' ? 'engineering' : project.status === 'planned' ? 'event' : 'check_circle';

  return (
    <>
      {jsonLdArray.map((ld, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(ld) }}
        />
      ))}

      <div className="min-h-screen bg-[#f6f8f8]">
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-10 pb-20">
          {/* ── Breadcrumb ── */}
          <nav className="mb-6 sm:mb-8 flex items-center gap-2 text-sm text-slate-500 font-medium">
            <Link href="/" className="hover:text-reno-dark transition-colors">Home</Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <Link href={`/pro/${pro.slug}`} className="hover:text-reno-dark transition-colors">{pro.name}</Link>
            <span className="material-symbols-outlined text-xs">chevron_right</span>
            <span className="text-reno-dark font-bold truncate">{project.neighbourhood}</span>
          </nav>

          {/* ── Grid: 8/4 ── */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 lg:gap-10 items-start">

            {/* ═══ LEFT COLUMN (8) ═══ */}
            <div className="md:col-span-8 space-y-6 sm:space-y-8">

              {/* Status + Title */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-reno-dark text-white rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>{statusIcon}</span>
                    {statusLabel}
                  </span>
                  <span className="text-slate-500 text-sm font-medium">ID: #{project.id.slice(0, 8).toUpperCase()}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-reno-dark tracking-tight leading-tight mb-3">
                  {project.title}
                </h1>
                <div className="flex flex-wrap items-center gap-2">
                  {project.services.map((svc) => (
                    <span
                      key={svc}
                      className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary"
                    >
                      {svc}
                    </span>
                  ))}
                </div>
              </div>

              {/* ── Transformation Photos ── */}
              {project.images && project.images.length >= 2 && (
                <div>
                  <h2 className="text-lg font-bold text-reno-dark flex items-center gap-2 mb-4">
                    <span className="material-symbols-outlined text-primary">layers</span>
                    Project Transformation
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="relative group overflow-hidden rounded-xl bg-slate-100">
                      <img
                        src={project.images[0]}
                        alt={`${project.title} — before`}
                        className="w-full h-56 sm:h-72 md:h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute bottom-3 left-3 bg-reno-dark/90 text-white px-4 py-1 rounded-lg text-sm font-bold backdrop-blur-md">
                        BEFORE
                      </div>
                    </div>
                    <div className="relative group overflow-hidden rounded-xl bg-slate-100">
                      <img
                        src={project.images[1]}
                        alt={`${project.title} — after`}
                        className="w-full h-56 sm:h-72 md:h-80 object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute bottom-3 left-3 bg-primary/90 text-white px-4 py-1 rounded-lg text-sm font-bold backdrop-blur-md">
                        AFTER
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Image gallery for projects with 1 image or 3+ images (skip if exactly 2 — shown as transformation above) */}
              {project.images && project.images.length !== 2 && project.images.length > 0 && (
                <div className="bg-white rounded-2xl p-3 sm:p-4 shadow-float">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-3">
                    {/* First image — large */}
                    <div className="col-span-2 row-span-2 group relative overflow-hidden rounded-xl">
                      <img
                        src={project.images[0]}
                        alt={`${project.title} — main view`}
                        className="w-full h-full min-h-[200px] sm:min-h-[300px] object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent">
                        <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1.5 text-xs font-bold text-white flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-sm">photo_library</span>
                          {project.images.length} photos
                        </div>
                      </div>
                    </div>
                    {/* Remaining images */}
                    {project.images.slice(1, 7).map((src, i) => (
                      <div key={src} className="group relative overflow-hidden rounded-xl aspect-square">
                        <img
                          src={src}
                          alt={`${project.title} — photo ${i + 2}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Video embed */}
              {project.youtubeId && (
                <div className="rounded-2xl overflow-hidden shadow-float bg-black">
                  <div className="relative aspect-[9/16] max-h-[500px] mx-auto">
                    <iframe
                      src={`https://www.youtube.com/embed/${project.youtubeId}?rel=0`}
                      title={project.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="absolute inset-0 w-full h-full"
                      loading="lazy"
                    />
                  </div>
                </div>
              )}

              {/* ── Project Overview Card ── */}
              <div className="bg-white p-5 sm:p-8 rounded-xl shadow-float border border-slate-200/50">
                <h3 className="text-lg font-bold text-reno-dark mb-4">Project Overview</h3>
                <p className="text-slate-600 text-base sm:text-lg leading-relaxed mb-6">
                  {project.description}
                </p>

                {/* Stats grid */}
                {project.stats && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {project.stats.sqft && (
                      <StatChip label="Square Feet" value={`${project.stats.sqft.toLocaleString()} SQ. FT.`} />
                    )}
                    {project.stats.duration && (
                      <StatChip label="Duration" value={project.stats.duration.toUpperCase()} />
                    )}
                    {project.stats.permits && (
                      <StatChip label="Permits" value={project.stats.permits.toUpperCase()} />
                    )}
                    {project.stats.cost && (
                      <StatChip label="Total Cost" value={`$${project.stats.cost.toLocaleString()}`} />
                    )}
                    {project.stats.wasteWeight && (
                      <StatChip label="Waste Weight" value={project.stats.wasteWeight.toUpperCase()} />
                    )}
                    {project.stats.disposal && (
                      <StatChip label="Disposal" value={project.stats.disposal.toUpperCase()} />
                    )}
                  </div>
                )}
              </div>

              {/* ── The Story / Challenge Card ── */}
              {project.story && (
                <div className="bg-white p-5 sm:p-8 rounded-xl shadow-float border border-slate-200/50">
                  <h3 className="text-lg font-bold text-reno-dark mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">auto_stories</span>
                    The Story Behind This Project
                  </h3>
                  <p className="text-slate-600 text-base leading-relaxed">{project.story}</p>
                </div>
              )}

              {/* ── Instagram Embed ── */}
              {project.instagramUrl && (
                <div className="space-y-3">
                  <h3 className="text-lg font-bold text-reno-dark flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary">photo_camera</span>
                    From Instagram
                  </h3>
                  <div className="bg-white rounded-2xl shadow-float overflow-hidden border border-slate-200/50">
                    <iframe
                      src={`${project.instagramUrl}embed`}
                      className="w-full border-0"
                      height="520"
                      loading="lazy"
                      title={`Instagram post — ${project.title}`}
                      allow="encrypted-media"
                    />
                  </div>
                </div>
              )}

              {/* ── Client Review ── */}
              {project.review && (
                <div className="relative bg-reno-dark text-white p-6 sm:p-10 rounded-xl overflow-hidden">
                  <div className="absolute -top-8 -right-8 opacity-[0.06]">
                    <span className="material-symbols-outlined text-[140px]">format_quote</span>
                  </div>
                  <div className="relative z-10">
                    <div className="flex gap-1 text-amber-400 mb-5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <span
                          key={i}
                          className={`material-symbols-outlined ${
                            i < project.review!.rating ? 'text-amber-400' : 'text-slate-700'
                          }`}
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          star
                        </span>
                      ))}
                    </div>
                    <blockquote className="text-lg sm:text-2xl font-medium leading-relaxed mb-6 sm:mb-8 italic">
                      &ldquo;{project.review.comment}&rdquo;
                    </blockquote>
                    <div className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-full bg-primary/20 flex items-center justify-center text-lg font-bold text-primary">
                        {project.review.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-bold">{project.review.name}</div>
                        <div className="text-slate-400 text-sm">{project.review.role}, {project.city}</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* ═══ RIGHT COLUMN / SIDEBAR (4) ═══ */}
            <div className="md:col-span-4 space-y-6">

              {/* ── Project Cost Card ── */}
              {project.stats?.cost && (
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-float border-b-4 border-primary">
                  <div className="text-xs text-slate-500 uppercase font-bold tracking-widest mb-2">Total Project Cost</div>
                  <div className="text-3xl sm:text-4xl font-black text-reno-dark mb-6 tracking-tighter">
                    ${project.stats.cost.toLocaleString()}<span className="text-base font-normal text-slate-400">.00</span>
                  </div>
                  <div className="space-y-3 pt-5 border-t border-slate-200/50">
                    {project.stats.duration && (
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-2 text-slate-500 font-medium text-sm">
                          <span className="material-symbols-outlined text-lg">schedule</span> Duration
                        </span>
                        <span className="text-reno-dark font-bold text-sm">{project.stats.duration}</span>
                      </div>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="flex items-center gap-2 text-slate-500 font-medium text-sm">
                        <span className="material-symbols-outlined text-lg">location_on</span> Location
                      </span>
                      <span className="text-reno-dark font-bold text-sm">{project.city}</span>
                    </div>
                    {project.stats.permits && (
                      <div className="flex justify-between items-center">
                        <span className="flex items-center gap-2 text-slate-500 font-medium text-sm">
                          <span className="material-symbols-outlined text-lg">description</span> Permits
                        </span>
                        <span className="text-reno-dark font-bold text-sm">{project.stats.permits}</span>
                      </div>
                    )}
                  </div>
                  <Link
                    href={`mailto:contact@renonext.com?subject=Project like: ${project.title}&body=Hi, I saw the project "${project.title}" on RenoNext and I'd like a quote for similar work.`}
                    className="block w-full text-center mt-6 bg-reno-dark text-white py-3.5 rounded-xl font-bold text-sm hover:bg-reno-dark/90 transition-all active:scale-[0.98]"
                  >
                    Get a Similar Quote
                  </Link>
                </div>
              )}

              {/* ── Contractor Profile Card ── */}
              <div className="bg-white p-5 sm:p-6 rounded-xl shadow-float border border-slate-200/50 sticky top-20">
                <div className="flex items-center gap-4 mb-5">
                  <div className="relative">
                    {pro.profileImage ? (
                      <img
                        src={pro.profileImage}
                        alt={pro.name}
                        className="w-14 h-14 rounded-xl object-cover"
                      />
                    ) : (
                      <div className="w-14 h-14 rounded-xl bg-primary/20 flex items-center justify-center text-xl font-extrabold text-primary">
                        {pro.name.charAt(0)}
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 bg-primary p-0.5 rounded-md">
                      <span className="material-symbols-outlined text-white text-xs" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                    </div>
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-reno-dark">{pro.name}</h4>
                    <p className="text-sm text-slate-500 font-medium">{pro.title}</p>
                  </div>
                </div>

                {/* Stats row */}
                <div className="flex items-center justify-between mb-5 bg-[#f6f8f8] p-3 rounded-lg">
                  <div className="text-center">
                    <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Projects</div>
                    <div className="font-bold text-reno-dark">{pro.projects.length}</div>
                  </div>
                  <div className="w-px h-8 bg-slate-300/50" />
                  <div className="text-center">
                    <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Location</div>
                    <div className="font-bold text-reno-dark text-xs">{project.city}</div>
                  </div>
                  <div className="w-px h-8 bg-slate-300/50" />
                  <div className="text-center">
                    <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Verified</div>
                    <div className="font-bold text-primary">
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    </div>
                  </div>
                </div>

                {/* Pulsing availability */}
                <div className="flex items-center gap-2 mb-4 p-3 rounded-lg bg-green-500/5 border border-green-500/15">
                  <div className="relative">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <div className="absolute inset-0 w-2 h-2 rounded-full bg-green-500 animate-ping" />
                  </div>
                  <span className="text-xs font-bold text-green-600">Available for New Projects</span>
                </div>

                {/* CTA */}
                <Link
                  href={`/pro/${pro.slug}`}
                  className="flex items-center justify-center gap-2 w-full text-reno-dark font-bold hover:text-primary transition-all py-2.5 group"
                >
                  View Full Profile
                  <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </Link>
              </div>

              {/* ── Map — neighbourhood level, no exact address ── */}
              {project.lat && project.lng && (
                <div className="rounded-xl overflow-hidden h-48 relative border border-slate-200/50 shadow-sm">
                  <iframe
                    src={`https://www.openstreetmap.org/export/embed.html?bbox=${project.lng - 0.045}%2C${project.lat - 0.03}%2C${project.lng + 0.045}%2C${project.lat + 0.03}&layer=mapnik`}
                    className="w-full h-full border-0"
                    title={`Area map — ${project.neighbourhood}, ${project.city}`}
                    loading="lazy"
                  />
                  <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-lg text-xs font-bold text-reno-dark shadow-sm flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                    {project.neighbourhood}, {project.city}
                  </div>
                </div>
              )}

              {/* ── More by Same Pro ── */}
              {pro.projects.filter((p) => p.slug !== project.slug).length > 0 && (
                <div className="bg-white rounded-xl p-5 sm:p-6 shadow-sm border border-slate-200/50">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
                    <span className="h-3 w-1 bg-primary rounded-full" />
                    More by {pro.name.split(' ')[0]}
                  </h3>
                  <div className="space-y-2">
                    {pro.projects
                      .filter((p) => p.slug !== project.slug)
                      .slice(0, 4)
                      .map((p) => (
                        <Link
                          key={p.slug}
                          href={`/projects/${p.slug}`}
                          className="flex items-start gap-3 p-2.5 rounded-lg hover:bg-[#f6f8f8] transition-colors group"
                        >
                          {p.youtubeId ? (
                            <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0">
                              <img
                                src={`https://i.ytimg.com/vi/${p.youtubeId}/default.jpg`}
                                alt={p.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            </div>
                          ) : p.images && p.images.length > 0 ? (
                            <div className="relative w-16 h-12 rounded-lg overflow-hidden shrink-0">
                              <img
                                src={p.images[0]}
                                alt={p.title}
                                className="w-full h-full object-cover"
                                loading="lazy"
                              />
                            </div>
                          ) : (
                            <div className="w-16 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                              <span className="material-symbols-outlined text-primary/30 text-sm">construction</span>
                            </div>
                          )}
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-bold text-reno-dark group-hover:text-primary transition-colors line-clamp-2">
                              {p.title}
                            </p>
                            <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                              <span className="material-symbols-outlined text-xs">location_on</span>
                              {p.location}
                            </p>
                          </div>
                        </Link>
                      ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

// ─── Sub-Components ──────────────────────────────────────────────────

function StatChip({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#f6f8f8] p-3 sm:p-4 rounded-lg">
      <div className="text-[10px] text-slate-500 uppercase font-bold tracking-widest mb-1">{label}</div>
      <div className="text-reno-dark font-bold text-xs sm:text-sm">{value}</div>
    </div>
  );
}
