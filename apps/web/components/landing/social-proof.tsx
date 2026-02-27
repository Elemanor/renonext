import Image from 'next/image';
import { Star, Quote, BadgeCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { testimonials } from './_data';

const projectPhotos = [
  {
    src: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&fit=crop',
    alt: 'Electrical panel work — Jennifer S. project',
  },
  {
    src: 'https://images.unsplash.com/photo-1590479773265-7464e5d48118?w=800&fit=crop',
    alt: 'Foundation work — Robert K. project',
  },
  {
    src: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=800&fit=crop',
    alt: 'Interior renovation — Maria G. project',
  },
];

export function SocialProof() {
  return (
    <section className="relative overflow-hidden bg-white py-24 md:py-32">
      {/* background scaffold */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/60 via-white to-white" />
        <div className="absolute -left-24 top-24 h-72 w-72 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute -right-24 bottom-24 h-72 w-72 rounded-full bg-violet-500/5 blur-3xl" />
        <div className="absolute inset-0 bg-grid opacity-[0.12] [mask-image:radial-gradient(ellipse_at_center,black_55%,transparent_100%)]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <Badge
              variant="secondary"
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50 px-4 py-1.5 text-sm font-medium text-blue-700"
            >
              Testimonials
            </Badge>

            <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl lg:text-5xl">
              What Homeowners Say
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-lg text-gray-500">
              Real stories from people who booked a verified pro — and stayed in control.
            </p>
          </div>

          {/* Grid */}
          <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
            {testimonials.map((t, index) => {
              const photo = projectPhotos[index];
              return (
                <Card
                  key={index}
                  tabIndex={0}
                  className={[
                    'group relative overflow-hidden rounded-2xl border border-gray-200 bg-white/70 shadow-sm backdrop-blur transition-all duration-300',
                    'hover:-translate-y-1 hover:shadow-xl hover:ring-2 hover:ring-gray-900/5',
                    'focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white',
                    'motion-reduce:hover:translate-y-0',
                  ].join(' ')}
                >
                  {/* Project photo banner */}
                  {photo && (
                    <div className="relative h-36 w-full overflow-hidden">
                      <Image
                        src={photo.src}
                        alt={photo.alt}
                        fill
                        sizes="(max-width:768px) 100vw, 33vw"
                        quality={80}
                        className="object-cover"
                      />
                      {/* Gradient overlay fading to white */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white" />
                    </div>
                  )}

                  {/* subtle inner highlight */}
                  <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/40" />

                  {/* quote mark */}
                  <Quote className="pointer-events-none absolute right-7 top-7 h-10 w-10 text-blue-500/10" />

                  <CardContent className="p-8 pt-4">
                    {/* Stars */}
                    <div className="mb-4 flex items-center gap-2">
                      <div className="flex gap-1">
                        {Array.from({ length: t.rating }).map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <span className="text-xs font-medium text-gray-400">{t.rating}.0</span>
                    </div>

                    {/* Job type badge */}
                    <Badge
                      variant="secondary"
                      className="mb-4 rounded-full border border-blue-200/40 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700"
                    >
                      {t.jobType}
                    </Badge>

                    {/* Quote (clamped) */}
                    <div className="relative">
                      <p
                        className={[
                          'text-base leading-relaxed text-gray-600 md:text-[15px]',
                          'line-clamp-5 md:line-clamp-6',
                          'transition-all duration-300',
                          'group-hover:line-clamp-none group-focus:line-clamp-none',
                        ].join(' ')}
                      >
                        &ldquo;{t.quote}&rdquo;
                      </p>

                      {/* subtle "read more" hint when clamped */}
                      <div className="mt-2 text-xs font-semibold text-gray-400 opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus:opacity-100">
                        Read more
                      </div>
                    </div>

                    {/* Author */}
                    <div className="mt-8 flex items-center gap-4">
                      <Avatar className="h-12 w-12 ring-2 ring-gray-100">
                        <AvatarImage src={t.avatar} alt={t.name} />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-violet-600 text-sm font-bold text-white">
                          {t.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="truncate font-semibold text-gray-900">{t.name}</p>

                          {t.verified && (
                            <span className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                              <BadgeCheck className="h-3.5 w-3.5 text-emerald-600" />
                              Verified
                            </span>
                          )}
                        </div>
                        <p className="truncate text-sm text-gray-500">{t.role}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
