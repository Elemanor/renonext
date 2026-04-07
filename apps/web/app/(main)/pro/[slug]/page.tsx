import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  getProBySlug,
  getAllProSlugs,
  getServiceCategories,
  getCategoryLabel,
} from '@/lib/data/pro-content';
import type { ProContent, ProProject, ProVideo, ProPhoto } from '@/lib/data/pro-content';

interface ProPageProps {
  params: Promise<{ slug: string }>;
}

// ─── Static Generation ───────────────────────────────────────────────

export async function generateStaticParams() {
  return getAllProSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: ProPageProps): Promise<Metadata> {
  const { slug } = await params;
  const pro = getProBySlug(slug);
  if (!pro) return { title: 'Pro Not Found | RenoNext' };

  const serviceList = pro.services.slice(0, 4).map((s) => s.name).join(', ');
  const title = `${pro.name} — ${pro.title} in ${pro.location} | RenoNext`;
  const description = `Hire ${pro.name} for ${serviceList} and more in the GTA. Real project photos, on-site videos, verified work. ${pro.hourlyRate ? `$${pro.hourlyRate.min}–$${pro.hourlyRate.max}/hr.` : ''}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'profile',
      url: `/pro/${slug}`,
    },
    alternates: {
      canonical: `/pro/${slug}`,
    },
  };
}

// ─── JSON-LD ─────────────────────────────────────────────────────────

function buildJsonLd(pro: ProContent) {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'HomeAndConstructionBusiness',
      name: pro.name,
      description: pro.bio,
      url: `https://renonext.com/pro/${pro.slug}`,
      image: pro.profileImage ? `https://renonext.com${pro.profileImage}` : pro.socials.instagram,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Toronto',
        addressRegion: 'ON',
        addressCountry: 'CA',
      },
      areaServed: pro.serviceAreas.map((city) => ({
        '@type': 'City',
        name: city,
      })),
      priceRange: pro.hourlyRate
        ? `$${pro.hourlyRate.min}–$${pro.hourlyRate.max}/hr`
        : undefined,
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Construction Services',
        itemListElement: pro.services.map((svc) => ({
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: svc.name,
            description: svc.description,
          },
        })),
      },
      sameAs: [pro.socials.youtube, pro.socials.instagram].filter(Boolean),
    },
    ...pro.videos.map((v) => ({
      '@context': 'https://schema.org',
      '@type': 'VideoObject',
      name: v.seoTitle,
      description: v.description,
      thumbnailUrl: `https://i.ytimg.com/vi/${v.youtubeId}/hq2.jpg`,
      uploadDate: '2024-01-01',
      contentUrl: `https://www.youtube.com/shorts/${v.youtubeId}`,
      embedUrl: `https://www.youtube.com/embed/${v.youtubeId}`,
    })),
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://renonext.com' },
        { '@type': 'ListItem', position: 2, name: 'Pros', item: 'https://renonext.com/pros' },
        { '@type': 'ListItem', position: 3, name: pro.name, item: `https://renonext.com/pro/${pro.slug}` },
      ],
    },
  ];
}

// ─── Page Component ──────────────────────────────────────────────────

export default async function ProProfilePage({ params }: ProPageProps) {
  const { slug } = await params;
  const pro = getProBySlug(slug);
  if (!pro) notFound();

  const jsonLdArray = buildJsonLd(pro);
  const serviceCategories = getServiceCategories(pro);
  const bcin = pro.certifications.find((c) => c.name.includes('BCIN'));
  const projectsWithImages = pro.projects.filter((p) => p.images && p.images.length > 0);
  const projectReviews = pro.projects.filter((p) => p.review);

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
        {/* ═══ HERO SECTION — Full-width with background ═══ */}
        <section className="relative bg-reno-dark overflow-hidden">
          {/* Background construction image with gradient overlay */}
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80"
              alt="Construction site background"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-reno-dark via-reno-dark/90 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-reno-dark/80 via-transparent to-transparent" />
          </div>

          {/* Hero content */}
          <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 pt-24 pb-32">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-slate-400 mb-8">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <Link href="/pros" className="hover:text-white transition-colors">Pros</Link>
              <span className="material-symbols-outlined text-xs">chevron_right</span>
              <span className="text-white font-medium">{pro.name}</span>
            </nav>

            {/* Name, title, and badges */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">{pro.name}</h1>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                <span className="text-xs font-bold tracking-wider text-white uppercase">Verified Pro</span>
              </div>
              {bcin && (
                <div className="flex items-center gap-2 bg-amber-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-amber-400/30">
                  <span className="material-symbols-outlined text-amber-400 text-lg">assured_workload</span>
                  <span className="text-xs font-bold tracking-wider text-amber-300 uppercase">BCIN Licensed</span>
                </div>
              )}
            </div>

            <p className="text-xl text-primary font-bold mb-3">{pro.title}</p>
            <div className="flex items-center gap-2 text-slate-300">
              <span className="material-symbols-outlined text-base">location_on</span>
              <span className="text-sm">{pro.location}</span>
            </div>
          </div>
        </section>

        {/* ── 3-Column Layout ── */}
        <div className="max-w-7xl mx-auto px-6 lg:px-8 pb-20">
          <div className="flex flex-col lg:flex-row gap-10">

            {/* ═══ LEFT SIDEBAR — Identity & Stats ═══ */}
            <aside className="w-full lg:w-[320px] shrink-0 -mt-20 space-y-6">
              {/* Profile Photo — overlapping hero */}
              <div className="relative">
                {pro.profileImage ? (
                  <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl bg-slate-200 ring-4 ring-white">
                    <img
                      src={pro.profileImage}
                      alt={`${pro.name} — ${pro.title}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="aspect-square rounded-2xl bg-primary/10 flex items-center justify-center ring-4 ring-white shadow-2xl">
                    <span className="text-8xl font-extrabold text-primary/30">{pro.name.charAt(0)}</span>
                  </div>
                )}
              </div>

              {/* Quick Stats — dramatic dark background */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-reno-dark p-4 rounded-xl shadow-sm text-center">
                  <div className="text-2xl font-extrabold text-white">{pro.projects.length}</div>
                  <div className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Projects</div>
                </div>
                <div className="bg-reno-dark p-4 rounded-xl shadow-sm text-center">
                  <div className="text-2xl font-extrabold text-white">{pro.services.length}</div>
                  <div className="text-[10px] uppercase tracking-widest font-bold text-slate-400">Services</div>
                </div>
              </div>

              {/* Response Time indicator */}
              <div className="bg-emerald-50 border border-emerald-200/50 rounded-xl p-4 flex items-center gap-3">
                <span className="material-symbols-outlined text-2xl text-emerald-600" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                <div>
                  <p className="text-xs font-bold text-emerald-800">Response Time</p>
                  <p className="text-sm font-bold text-emerald-700">&lt; 2 hours</p>
                </div>
              </div>

              {/* Reputation Card */}
              <div className="bg-reno-dark rounded-xl p-5 shadow-sm">
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">Reputation</h3>
                <div className="flex items-center gap-3 mb-3">
                  <div className="text-3xl font-extrabold text-white">4.9</div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-amber-400 text-lg"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >star</span>
                    ))}
                  </div>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2 mb-2 overflow-hidden">
                  <div className="bg-amber-400 h-full rounded-full" style={{ width: '98%' }} />
                </div>
                <p className="text-xs text-white/60">Based on {pro.projects.length} projects</p>
              </div>

              {/* Certifications compact */}
              <div className="bg-white rounded-xl p-5 shadow-sm border border-slate-100 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Certifications</h3>
                {pro.certifications.map((cert) => (
                  <div key={cert.name} className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-lg">{cert.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-reno-dark truncate">{cert.name}</p>
                    </div>
                    {cert.verified && (
                      <span className="material-symbols-outlined text-emerald-500 text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="flex gap-3">
                {pro.socials.youtube && (
                  <a href={pro.socials.youtube} target="_blank" rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-reno-dark px-4 py-3 text-sm font-bold text-white hover:bg-reno-dark/80 transition-colors">
                    <span className="material-symbols-outlined text-base">play_circle</span>
                    YouTube
                  </a>
                )}
                {pro.socials.instagram && (
                  <a href={pro.socials.instagram} target="_blank" rel="noopener noreferrer"
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-reno-dark px-4 py-3 text-sm font-bold text-white hover:bg-reno-dark/80 transition-colors">
                    <span className="material-symbols-outlined text-base">photo_camera</span>
                    Instagram
                  </a>
                )}
              </div>
            </aside>

            {/* ═══ CENTER — Main Content ═══ */}
            <section className="flex-grow space-y-12 min-w-0">
              {/* Bio */}
              <div>
                <h2 className="text-2xl font-bold text-reno-dark border-l-4 border-primary pl-5 mb-6">Professional Profile</h2>
                <div className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm">
                  <p className="text-lg leading-relaxed text-slate-600">{pro.bio}</p>
                </div>
              </div>

              {/* Equipment Section — show ALL equipment */}
              {pro.equipment.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-reno-dark border-l-4 border-primary pl-5 mb-6">Equipment & Tools</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {pro.equipment.map((item) => (
                      <div key={item.name} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm flex items-start gap-4">
                        <div className="bg-primary/10 p-3 rounded-xl shrink-0">
                          <span className="material-symbols-outlined text-primary text-2xl">{item.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-reno-dark mb-1">{item.name}</p>
                          <p className="text-sm text-slate-600">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Past Work Gallery — 1 big + 4 small */}
              {projectsWithImages.length > 0 && (
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-reno-dark border-l-4 border-primary pl-5">Past Work Gallery</h2>
                    <span className="text-sm font-bold text-primary">{pro.projects.length} projects</span>
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    {projectsWithImages.slice(0, 5).map((project, idx) => {
                      const thumb = project.images?.[0]
                        || (project.youtubeId ? `https://i.ytimg.com/vi/${project.youtubeId}/hqdefault.jpg` : null);
                      return (
                        <Link
                          key={project.id}
                          href={`/projects/${project.slug}`}
                          className={`group relative rounded-xl overflow-hidden bg-slate-200 block ${idx === 0 ? 'col-span-2 aspect-[16/9]' : 'aspect-square'}`}
                        >
                          {thumb ? (
                            <img
                              src={thumb}
                              alt={`${project.title} — ${project.location}`}
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                              <span className="material-symbols-outlined text-5xl text-primary/30">construction</span>
                            </div>
                          )}
                          {/* Always visible gradient with title */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent flex items-end p-5">
                            <div>
                              <p className="text-white font-bold">{project.title}</p>
                              <p className="text-white/70 text-sm">{project.location}</p>
                            </div>
                          </div>
                          {/* Enhanced hover overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-reno-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          {/* Cost badge */}
                          {project.stats?.cost && (
                            <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-sm rounded-lg px-3 py-1.5 text-sm font-bold text-white">
                              ${project.stats.cost.toLocaleString()}
                            </div>
                          )}
                          {/* Photo count */}
                          {project.images && project.images.length > 1 && (
                            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm rounded-lg px-2.5 py-1 text-xs font-bold text-white flex items-center gap-1">
                              <span className="material-symbols-outlined text-sm">photo_library</span>
                              {project.images.length}
                            </div>
                          )}
                          {/* Video icon */}
                          {project.youtubeId && (
                            <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-sm rounded-lg px-2.5 py-1 text-xs font-bold text-white flex items-center gap-1">
                              <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>play_circle</span>
                              Video
                            </div>
                          )}
                        </Link>
                      );
                    })}
                  </div>
                  {/* Show remaining projects as a list */}
                  {pro.projects.length > 5 && (
                    <div className="mt-6 space-y-2">
                      {pro.projects.slice(5).map((project) => (
                        <Link
                          key={project.id}
                          href={`/projects/${project.slug}`}
                          className="flex items-center gap-4 bg-white rounded-xl p-4 border border-slate-100 hover:shadow-float transition-shadow group"
                        >
                          <span className="material-symbols-outlined text-primary">arrow_forward</span>
                          <div className="flex-1 min-w-0">
                            <p className="font-bold text-reno-dark group-hover:text-primary transition-colors truncate">{project.title}</p>
                            <p className="text-xs text-slate-500">{project.location}</p>
                          </div>
                          {project.stats?.cost && (
                            <span className="text-sm font-bold text-reno-dark">${project.stats.cost.toLocaleString()}</span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* On-Site Videos */}
              {pro.videos.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-reno-dark border-l-4 border-primary pl-5 mb-6">On-Site Videos</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    {pro.videos.map((video) => (
                      <div key={video.id} className="bg-white rounded-xl overflow-hidden border border-slate-100 shadow-sm">
                        <div className="relative aspect-[9/16] max-h-[400px] bg-black">
                          <iframe
                            src={`https://www.youtube.com/embed/${video.youtubeId}?rel=0`}
                            title={video.seoTitle}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="absolute inset-0 w-full h-full"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-5">
                          <h3 className="font-bold text-reno-dark mb-1">{video.title}</h3>
                          <p className="text-sm text-slate-500">{video.location}</p>
                          <div className="flex flex-wrap gap-1.5 mt-3">
                            {video.tags.map((tag) => (
                              <span key={tag} className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">{tag}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Client Reviews — with decorative quote icon */}
              {projectReviews.length > 0 && (
                <div className="relative">
                  {/* Large decorative quote */}
                  <span className="material-symbols-outlined absolute -top-4 right-0 text-[120px] text-primary/5 pointer-events-none">
                    format_quote
                  </span>
                  <h2 className="text-2xl font-bold text-reno-dark border-l-4 border-primary pl-5 mb-6 relative z-10">Client Reviews</h2>
                  <div className="space-y-4 relative z-10">
                    {projectReviews.map((p) => (
                      <div key={p.id} className="p-6 bg-white rounded-xl shadow-sm border border-slate-100 space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <span
                                key={i}
                                className={`material-symbols-outlined text-base ${i < p.review!.rating ? 'text-amber-400' : 'text-slate-200'}`}
                                style={{ fontVariationSettings: "'FILL' 1" }}
                              >star</span>
                            ))}
                          </div>
                          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{p.city}</span>
                        </div>
                        <p className="text-reno-dark font-medium italic text-lg">&ldquo;{p.review!.comment}&rdquo;</p>
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-500">— {p.review!.name}, {p.review!.role}</span>
                          <Link href={`/projects/${p.slug}`} className="text-xs font-bold text-primary hover:underline">
                            View project
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Why Hire a Person — with subtle background */}
              {pro.whyNoPro.length > 0 && (
                <div className="relative rounded-2xl overflow-hidden">
                  {/* Subtle construction background */}
                  <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-reno-dark" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(15,186,189,0.08),transparent_60%)]" />
                    <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }} />
                  </div>
                  <div className="relative z-10 p-8">
                    <div className="inline-flex items-center gap-2 mb-4 rounded-full bg-primary/20 px-4 py-1.5 text-sm font-bold text-primary">
                      <span className="material-symbols-outlined text-base">lightbulb</span>
                      Why this works
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-6">Hire the Person, Not the Company</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {pro.whyNoPro.map((reason, i) => (
                        <div key={i} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
                          <span className="material-symbols-outlined text-primary mt-0.5 shrink-0 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                          <p className="text-sm text-slate-300 leading-relaxed">{reason}</p>
                        </div>
                      ))}
                    </div>
                    {/* Cost comparison */}
                    <div className="mt-6 grid grid-cols-2 gap-4">
                      <div className="bg-white/5 border border-white/10 rounded-xl p-5 text-center">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Typical Company</p>
                        <p className="text-2xl font-extrabold text-white/40 line-through">$80–$120/hr</p>
                      </div>
                      <div className="bg-primary/10 border border-primary/30 rounded-xl p-5 text-center">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">Hire me directly</p>
                        {pro.hourlyRate && (
                          <p className="text-2xl font-extrabold text-white">${pro.hourlyRate.min}–${pro.hourlyRate.max}/hr</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* ═══ RIGHT SIDEBAR — Booking ═══ */}
            <aside className="w-full lg:w-[340px] shrink-0">
              <div className="sticky top-28 bg-reno-dark p-8 rounded-2xl shadow-2xl text-white border-t-4 border-amber-400">
                {/* Quick Response indicator with pulse */}
                <div className="flex items-center gap-2 mb-6 text-sm">
                  <div className="relative">
                    <span className="material-symbols-outlined text-emerald-400 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>circle</span>
                    <span className="absolute inset-0 material-symbols-outlined text-emerald-400 text-lg animate-pulse" style={{ fontVariationSettings: "'FILL' 1" }}>circle</span>
                  </div>
                  <span className="text-white/80 font-semibold">Quick Response</span>
                </div>

                <div className="flex justify-between items-start mb-8">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/50 font-bold mb-2">Hourly Rate</div>
                    {pro.hourlyRate && (
                      <div className="flex items-baseline gap-1">
                        <span className="text-5xl font-extrabold text-white">${pro.hourlyRate.min}</span>
                        <span className="text-lg font-medium text-white/50">–${pro.hourlyRate.max}/hr</span>
                      </div>
                    )}
                  </div>
                  <div className="bg-primary/20 p-3 rounded-xl">
                    <span className="material-symbols-outlined text-primary text-3xl">payments</span>
                  </div>
                </div>

                <div className="space-y-3 mb-8">
                  <div className="flex items-center gap-3 text-sm">
                    <span className="material-symbols-outlined text-emerald-400 text-lg">calendar_today</span>
                    <span className="text-white/80">Available for new projects</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="material-symbols-outlined text-emerald-400 text-lg">verified_user</span>
                    <span className="text-white/80">BCIN Licensed & Insured</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="material-symbols-outlined text-emerald-400 text-lg">location_on</span>
                    <span className="text-white/80">{pro.serviceAreas.length} cities across the GTA</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <span className="material-symbols-outlined text-emerald-400 text-lg">construction</span>
                    <span className="text-white/80">{pro.projects.length} completed projects</span>
                  </div>
                </div>

                <a
                  href={`mailto:contact@renonext.com?subject=Hire ${pro.name}&body=Hi, I found ${pro.name}'s profile on RenoNext and I'm interested in getting a quote.`}
                  className="block w-full py-4 bg-primary text-white font-extrabold text-lg rounded-xl hover:bg-primary/80 transition-colors shadow-float text-center mb-3"
                >
                  Get a Quote
                </a>

                {/* Secondary Call button */}
                <a
                  href={`tel:+14165551234`}
                  className="block w-full py-3 bg-transparent border-2 border-white/20 text-white font-bold text-base rounded-xl hover:bg-white/10 transition-colors text-center flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-lg">phone</span>
                  Call Now
                </a>

                <p className="mt-4 text-center text-xs text-white/40">
                  No payment required. Get a free estimate.
                </p>

                {/* Equipment preview */}
                {pro.equipment.length > 0 && (
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <p className="text-[10px] uppercase tracking-widest font-bold text-white/40 mb-3">Tools & Equipment</p>
                    <div className="space-y-2">
                      {pro.equipment.map((item) => (
                        <div key={item.name} className="flex items-center gap-2 text-sm text-white/70">
                          <span className="material-symbols-outlined text-primary text-base">{item.icon}</span>
                          {item.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Service areas */}
                <div className="mt-6 pt-6 border-t border-white/10">
                  <p className="text-[10px] uppercase tracking-widest font-bold text-white/40 mb-3">Service Areas</p>
                  <div className="flex flex-wrap gap-1.5">
                    {pro.serviceAreas.map((city) => (
                      <span key={city} className="text-xs bg-white/10 rounded-lg px-2.5 py-1 text-white/60">{city}</span>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

          </div>
        </div>
      </div>
    </>
  );
}
