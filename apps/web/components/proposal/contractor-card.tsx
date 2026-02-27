'use client';

import { Star, Clock, Briefcase, Award, MessageCircle } from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { BCINBadge } from '@/components/shared/bcin-badge';
import { CountUp } from '@/components/landing/_animations/count-up';
import { BODY } from '@/lib/ui/tokens';

interface ContractorProfile {
  full_name: string;
  avatar_url: string | null;
  is_verified: boolean;
}

interface ProProfile {
  bio: string;
  years_experience: number;
  avg_rating: number;
  total_reviews: number;
  total_jobs_completed: number;
  bcin: string;
  bcin_verified: boolean;
  response_time_minutes: number;
  company_name: string;
}

interface ContractorCardProps {
  profile: ContractorProfile;
  proProfile: ProProfile;
}

export function ContractorCard({ profile, proProfile }: ContractorCardProps) {
  const initials = profile.full_name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="space-y-4">
      {/* Header: avatar + name + rating */}
      <div className="flex items-center gap-3">
        <div className="relative">
          <Avatar className="h-14 w-14 ring-2 ring-white shadow-lg">
            <AvatarFallback className="bg-gradient-to-br from-primary to-primary/80 text-lg font-bold text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
          {profile.is_verified && (
            <div className="absolute -bottom-0.5 -right-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500 ring-2 ring-white">
              <Award className="h-3 w-3 text-white" />
            </div>
          )}
        </div>
        <div className="flex-1">
          <p className="font-bold text-foreground">{profile.full_name}</p>
          <p className="text-xs text-muted-foreground">{proProfile.company_name}</p>
          <div className="mt-0.5 flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.round(proProfile.avg_rating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'fill-muted text-muted'
                }`}
              />
            ))}
            <span className="ml-0.5 text-xs font-semibold tabular-nums text-foreground">{proProfile.avg_rating}</span>
            <span className="text-xs text-muted-foreground">({proProfile.total_reviews})</span>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-2">
        <Card>
          <CardContent className="p-2.5 text-center">
            <CountUp
              target={proProfile.years_experience}
              className="text-xl font-extrabold tabular-nums text-foreground"
            />
            <p className="text-[9px] font-medium uppercase tracking-wide text-muted-foreground">Years</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-2.5 text-center">
            <CountUp
              target={proProfile.total_jobs_completed}
              className="text-xl font-extrabold tabular-nums text-foreground"
            />
            <p className="text-[9px] font-medium uppercase tracking-wide text-muted-foreground">Jobs</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-2.5 text-center">
            <div className="flex items-center justify-center gap-0.5">
              <MessageCircle className="h-3 w-3 text-muted-foreground" />
              <span className="text-xl font-extrabold tabular-nums text-foreground">{proProfile.response_time_minutes}m</span>
            </div>
            <p className="text-[9px] font-medium uppercase tracking-wide text-muted-foreground">Response</p>
          </CardContent>
        </Card>
      </div>

      {/* BCIN */}
      {proProfile.bcin_verified && (
        <BCINBadge bcin={proProfile.bcin} verified />
      )}

      {/* Bio */}
      <p className={BODY}>
        {proProfile.bio}
      </p>
    </div>
  );
}
