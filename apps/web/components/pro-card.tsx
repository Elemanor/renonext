import Link from 'next/link';
import { Star, MapPin, Clock, CheckCircle, ArrowUpRight, Shield, Briefcase, Zap } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

export type ProTier = 'top_rated' | 'rising_talent' | 'new';

interface ProCardProps {
  id: string;
  name: string;
  headline: string | null;
  avatarUrl: string | null;
  rating: number;
  reviewCount: number;
  hourlyRateMin: number | null;
  hourlyRateMax: number | null;
  categories: string[];
  city: string | null;
  isVerified: boolean;
  responseTimeMinutes: number | null;
  coverUrl?: string | null;
  completedJobs?: number;
  responseRate?: number;
  tier?: ProTier;
  isOnline?: boolean;
}

const tierConfig: Record<ProTier, { label: string; className: string }> = {
  top_rated: { label: 'Top Rated', className: 'tier-top-rated' },
  rising_talent: { label: 'Rising Talent', className: 'tier-rising-talent' },
  new: { label: 'New', className: 'tier-new' },
};

export function ProCard({
  id,
  name,
  headline,
  avatarUrl,
  rating,
  reviewCount,
  hourlyRateMin,
  hourlyRateMax,
  categories,
  city,
  isVerified,
  responseTimeMinutes,
  coverUrl,
  completedJobs,
  responseRate,
  tier,
  isOnline,
}: ProCardProps) {
  const formatRate = () => {
    if (!hourlyRateMin && !hourlyRateMax) return 'Contact for rate';
    if (hourlyRateMin && hourlyRateMax) return `$${hourlyRateMin}-${hourlyRateMax}`;
    if (hourlyRateMin) return `From $${hourlyRateMin}`;
    return `Up to $${hourlyRateMax}`;
  };

  const formatResponseTime = () => {
    if (!responseTimeMinutes) return null;
    if (responseTimeMinutes < 60) return `${responseTimeMinutes}min`;
    const hours = Math.round(responseTimeMinutes / 60);
    return `${hours}hr`;
  };

  return (
    <Link href={`/pros/${id}`} className="group block">
      <Card className="shine relative overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-card transition-all duration-300 hover:border-reno-green-light hover:shadow-card-hover hover:scale-[1.02]">
        {/* Cover/Banner Area */}
        <div className="relative h-28 overflow-hidden">
          {coverUrl ? (
            <img
              src={coverUrl}
              alt=""
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-reno-green via-reno-green-dark to-violet-600" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

          {/* Tier Badge - top left */}
          {tier && (
            <div className="absolute left-3 top-3">
              <Badge className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold shadow-sm border-0 ${tierConfig[tier].className}`}>
                {tierConfig[tier].label}
              </Badge>
            </div>
          )}

          {/* Hover arrow */}
          <div className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 opacity-0 shadow-sm backdrop-blur-sm transition-all duration-300 group-hover:opacity-100">
            <ArrowUpRight className="h-4 w-4 text-gray-700" />
          </div>
        </div>

        {/* Avatar overlapping cover */}
        <div className="relative px-5">
          <div className="relative -mt-8 inline-block">
            <Avatar className="h-16 w-16 ring-[3px] ring-white shadow-md">
              <AvatarImage src={avatarUrl || undefined} alt={name} className="object-cover" />
              <AvatarFallback className="bg-gradient-to-br from-reno-green to-reno-green-dark text-xl font-bold text-white">
                {name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            {/* Online/Offline status dot */}
            <div className={`absolute -bottom-0.5 -right-0.5 ${isOnline ? 'online-dot' : 'offline-dot'}`} />
            {/* Verified shield - offset from avatar */}
            {isVerified && (
              <div className="absolute -bottom-0.5 -left-1 flex h-5 w-5 items-center justify-center rounded-full bg-white shadow-sm" title="Verified & Insured">
                <Shield className="h-3.5 w-3.5 fill-emerald-500 text-white" />
              </div>
            )}
          </div>
        </div>

        <CardContent className="px-5 pb-5 pt-3">
          {/* Name & Verified */}
          <div className="mb-0.5 flex items-center gap-1.5">
            <h3 className="font-bold text-gray-900 transition-colors duration-200 group-hover:text-reno-green-dark">
              {name}
            </h3>
          </div>

          {/* Rating + Jobs Completed */}
          <div className="mb-2 flex items-center gap-3 text-sm">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
              <span className="font-bold text-gray-900">{rating.toFixed(1)}</span>
              <span className="text-xs text-gray-400">({reviewCount})</span>
            </div>
            {completedJobs !== undefined && completedJobs > 0 && (
              <>
                <span className="text-gray-200">|</span>
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <Briefcase className="h-3 w-3" />
                  {completedJobs} jobs done
                </span>
              </>
            )}
          </div>

          {/* Headline */}
          {headline && (
            <p className="mb-3 line-clamp-2 text-sm leading-relaxed text-gray-500">{headline}</p>
          )}

          {/* Price - prominent left-aligned */}
          <div className="mb-3">
            <span className="text-xs text-gray-400">Starting from</span>
            <p className="text-lg font-bold tracking-tight text-gray-900">
              {formatRate()}
              <span className="text-sm font-normal text-gray-400">/hr</span>
            </p>
          </div>

          {/* Categories */}
          <div className="mb-3 flex flex-wrap gap-1.5">
            {categories.slice(0, 3).map((cat) => (
              <Badge
                key={cat}
                variant="secondary"
                className="rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-600 hover:bg-gray-100"
              >
                {cat}
              </Badge>
            ))}
            {categories.length > 3 && (
              <Badge
                variant="outline"
                className="rounded-full border-gray-200 px-2.5 py-0.5 text-xs font-medium text-gray-400"
              >
                +{categories.length - 3}
              </Badge>
            )}
          </div>

          {/* Footer stats */}
          <div className="flex items-center gap-3 border-t border-gray-100 pt-3 text-xs text-gray-400">
            {city && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {city}
              </span>
            )}
            {responseRate !== undefined && responseRate > 0 && (
              <span className="flex items-center gap-1">
                <Zap className="h-3.5 w-3.5" />
                {responseRate}% response
              </span>
            )}
            {!responseRate && formatResponseTime() && (
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" />
                {formatResponseTime()} response
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
