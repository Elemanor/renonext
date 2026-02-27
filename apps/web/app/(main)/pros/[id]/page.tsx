import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Star,
  MapPin,
  Clock,
  CheckCircle,
  Shield,
  ShieldCheck,
  Calendar,
  MessageSquare,
  Phone,
  ChevronRight,
  ThumbsUp,
  Award,
  Briefcase,
  Zap,
  Camera,
  Heart,
  Lock,
  CreditCard,
  PenLine,
  ClipboardList,
  TrendingUp,
  Fingerprint,
  FileCheck,
  GraduationCap,
  Umbrella,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import type { ProTier } from '@/components/pro-card';
import { WriteReviewDialog } from '@/components/write-review-dialog';

interface ProPageProps {
  params: Promise<{ id: string }>;
}

const mockPro = {
  id: '1',
  name: 'Marcus Johnson',
  headline: 'Licensed Electrician - 15 Years Experience',
  bio: 'I am a fully licensed and insured electrician with over 15 years of experience in residential and commercial electrical work. Specializing in panel upgrades, smart home installations, EV charger setups, and complete home rewiring. I take pride in clean, code-compliant work and clear communication throughout every project. Every job comes with a satisfaction guarantee.',
  avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
  coverUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1600&h=400&fit=crop',
  rating: 4.9,
  reviewCount: 127,
  hourlyRateMin: 65,
  hourlyRateMax: 85,
  categories: ['Electrical', 'Smart Home', 'Lighting', 'EV Chargers'],
  city: 'Toronto',
  province: 'ON',
  isVerified: true,
  idVerified: true,
  backgroundCheckPassed: true,
  responseTimeMinutes: 30,
  yearsExperience: 15,
  totalJobsCompleted: 342,
  isAvailable: true,
  memberSince: '2021-03-15',
  tier: 'top_rated' as ProTier,
  responseRate: 98,
};

const mockReviews = [
  {
    id: '1',
    reviewerName: 'Jennifer S.',
    reviewerAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    comment:
      'Marcus was absolutely fantastic! He upgraded our electrical panel and installed new outlets in our basement. Very professional, clean, and explained everything clearly. Would hire again in a heartbeat.',
    date: '2024-11-15',
    jobTitle: 'Electrical Panel Upgrade',
  },
  {
    id: '2',
    reviewerName: 'Robert K.',
    reviewerAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
    rating: 5,
    comment:
      'Installed an EV charger in our garage. Marcus was on time, provided a detailed quote, and finished ahead of schedule. The work was impeccable.',
    date: '2024-10-28',
    jobTitle: 'EV Charger Installation',
  },
  {
    id: '3',
    reviewerName: 'Linda M.',
    reviewerAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
    rating: 4,
    comment:
      'Good work on the kitchen lighting upgrade. Minor scheduling delay but Marcus communicated well and the final result was great.',
    date: '2024-10-05',
    jobTitle: 'Kitchen Lighting Installation',
  },
];

const mockGallery = [
  { id: '1', url: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?w=400&h=400&fit=crop', alt: 'Panel upgrade', category: 'Electrical Panel', projectAddress: '45 Queen St W', scope: 'Panel Upgrade — 200A', verifiedDate: 'Oct 2024', escrowVerified: true },
  { id: '2', url: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=400&fit=crop', alt: 'Smart home setup', category: 'Smart Home', projectAddress: '12 Lakeshore Blvd', scope: 'Full Smart Home Integration', verifiedDate: 'Sep 2024', escrowVerified: true },
  { id: '3', url: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&h=400&fit=crop', alt: 'EV charger install', category: 'EV Charger', projectAddress: '88 King St E', scope: 'Level 2 EV Charger Install', verifiedDate: 'Nov 2024', escrowVerified: true },
  { id: '4', url: 'https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=400&h=400&fit=crop', alt: 'Kitchen lighting', category: 'Lighting', projectAddress: '220 Dundas St', scope: 'Kitchen Pot Light Retrofit', verifiedDate: 'Aug 2024', escrowVerified: true },
  { id: '5', url: 'https://images.unsplash.com/photo-1524484485831-a92ffc0de03f?w=400&h=400&fit=crop', alt: 'Outlet installation', category: 'Electrical', projectAddress: '9 Bloor St W', scope: 'Outlet & Circuit Expansion', verifiedDate: 'Jul 2024', escrowVerified: true },
  { id: '6', url: 'https://images.unsplash.com/photo-1558002038-1055907df827?w=400&h=400&fit=crop', alt: 'Wiring project', category: 'Residential', projectAddress: '155 Yonge St', scope: 'Full Rewire — Knob & Tube', verifiedDate: 'Jun 2024', escrowVerified: true },
];

const mockCompliance = {
  identity: { verified: true, lastVerified: 'Feb 12, 2025' },
  wsib: { number: 'ON-12345678', status: 'active' as const, lastVerified: 'Today, 8:00 AM', expiry: 'Jan 2026' },
  insurance: { provider: 'Aviva Canada', coverage: '$5,000,000', lastVerified: 'Feb 8, 2025', expiry: 'Dec 2025' },
  license: { number: 'EC-7002189', issuer: 'ECRA/ESA Ontario', lastVerified: 'Feb 12, 2025' },
  safety: { certs: ['WHMIS', 'Fall Arrest', 'Confined Spaces'], lastVerified: 'Jan 20, 2025' },
};

export async function generateMetadata({
  params,
}: ProPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  return {
    title: `${mockPro.name} - Electrician | RenoNext`,
    description: mockPro.headline || `View ${mockPro.name}'s profile on RenoNext`,
    openGraph: {
      title: `${mockPro.name} - Electrician | RenoNext`,
      description: mockPro.headline || '',
    },
  };
}

export default async function ProProfilePage({ params }: ProPageProps) {
  const resolvedParams = await params;
  const pro = mockPro;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: pro.name,
    description: pro.headline,
    address: {
      '@type': 'PostalAddress',
      addressLocality: pro.city,
      addressRegion: pro.province,
      addressCountry: 'CA',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: pro.rating,
      reviewCount: pro.reviewCount,
    },
    priceRange: `$${pro.hourlyRateMin}-${pro.hourlyRateMax}/hr`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-gray-50">
        {/* Cover Image */}
        <div className="relative h-48 overflow-hidden md:h-64">
          <img
            src={pro.coverUrl}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent" />

          {/* Breadcrumb on cover */}
          <div className="absolute left-0 top-0 w-full">
            <div className="container mx-auto px-4 pt-4">
              <div className="flex items-center gap-2 text-sm text-white/70">
                <Link href="/" className="transition-colors hover:text-white">Home</Link>
                <ChevronRight className="h-3.5 w-3.5" />
                <Link href="/pros" className="transition-colors hover:text-white">Pros</Link>
                <ChevronRight className="h-3.5 w-3.5" />
                <span className="font-medium text-white">{pro.name}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Header - overlaps cover */}
        <div className="container mx-auto px-4">
          <div className="relative -mt-16 flex flex-col gap-5 sm:flex-row sm:items-end">
            {/* Avatar */}
            <div className="relative shrink-0">
              <Avatar className="h-32 w-32 rounded-2xl ring-4 ring-white shadow-xl">
                <AvatarImage src={pro.avatarUrl || undefined} alt={pro.name} className="rounded-2xl object-cover" />
                <AvatarFallback className="rounded-2xl bg-gradient-to-br from-reno-green to-reno-green-dark text-4xl font-bold text-white">
                  {pro.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              {pro.isAvailable && (
                <div className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full border-[3px] border-white bg-green-500 shadow-sm" />
              )}
            </div>

            {/* Name & Meta */}
            <div className="flex-1 pb-1">
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
                  {pro.name}
                </h1>
                {pro.isVerified && (
                  <CheckCircle className="h-6 w-6 fill-reno-green-dark text-white" />
                )}
                {pro.tier === 'top_rated' && (
                  <Badge className="tier-top-rated rounded-full px-3 py-1 text-xs font-bold border-0">
                    Top Rated
                  </Badge>
                )}
                {pro.tier === 'rising_talent' && (
                  <Badge className="tier-rising-talent rounded-full px-3 py-1 text-xs font-bold border-0">
                    Rising Talent
                  </Badge>
                )}
                {pro.tier === 'new' && (
                  <Badge className="tier-new rounded-full px-3 py-1 text-xs font-bold border-0">
                    New
                  </Badge>
                )}
              </div>
              <p className="mt-1 text-lg text-gray-600">
                {pro.headline}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Star className="h-5 w-5 fill-amber-400 text-amber-400" />
                  <span className="font-bold text-gray-900">{pro.rating}</span>
                  <span className="text-gray-400">({pro.reviewCount} reviews)</span>
                </div>
                <span className="flex items-center gap-1.5 text-gray-500">
                  <MapPin className="h-4 w-4" />
                  {pro.city}, {pro.province}
                </span>
                <span className="flex items-center gap-1.5 text-gray-500">
                  <Zap className="h-4 w-4" />
                  Responds in ~{pro.responseTimeMinutes} min
                </span>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="mt-5 flex flex-wrap gap-2">
            {pro.isVerified && (
              <Badge className="flex items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700 ring-1 ring-green-200/50 border-transparent hover:bg-green-50">
                <CheckCircle className="h-3.5 w-3.5" />
                Verified Pro
              </Badge>
            )}
            {pro.idVerified && (
              <Badge className="flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 ring-1 ring-blue-200/50 border-transparent hover:bg-blue-50">
                <Shield className="h-3.5 w-3.5" />
                ID Verified
              </Badge>
            )}
            {pro.backgroundCheckPassed && (
              <Badge className="flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1.5 text-xs font-semibold text-purple-700 ring-1 ring-purple-200/50 border-transparent hover:bg-purple-50">
                <Award className="h-3.5 w-3.5" />
                Background Checked
              </Badge>
            )}
          </div>

          {/* Trust & Compliance Terminal */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-slate-700 bg-slate-900 shadow-2xl relative">
            {/* Grid background overlay */}
            <div className="absolute inset-0 bg-blueprint opacity-10 pointer-events-none" />
            
            <div className="relative border-b border-slate-800 bg-slate-950/50 px-5 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Shield className="h-4 w-4 text-emerald-500" />
                <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Live Compliance Matrix</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 ring-1 ring-emerald-500/20">
                  <div className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
                  <span className="text-[9px] font-bold uppercase tracking-wider text-emerald-500">System Active</span>
                </div>
              </div>
            </div>

            <div className="relative grid grid-cols-2 gap-px bg-slate-800 md:grid-cols-5">
              {/* Identity Verified */}
              <div className="bg-slate-900 p-4 transition-colors hover:bg-slate-800/80">
                <Fingerprint className="mb-3 h-5 w-5 text-slate-400" />
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Identity</p>
                <p className="mt-1 font-mono text-sm font-semibold text-emerald-400">VERIFIED</p>
                <p className="mt-1 text-[9px] text-slate-500">Log: {mockCompliance.identity.lastVerified}</p>
              </div>
              {/* WSIB */}
              <div className="bg-slate-900 p-4 transition-colors hover:bg-slate-800/80">
                <Shield className="mb-3 h-5 w-5 text-slate-400" />
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">WSIB Clearance</p>
                <p className="mt-1 font-mono text-sm font-semibold text-emerald-400">ACTIVE</p>
                <p className="mt-1 font-mono text-[9px] text-slate-400">#{mockCompliance.wsib.number}</p>
              </div>
              {/* Insurance */}
              <div className="bg-slate-900 p-4 transition-colors hover:bg-slate-800/80">
                <Umbrella className="mb-3 h-5 w-5 text-slate-400" />
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Liability Coverage</p>
                <p className="mt-1 font-mono text-sm font-semibold text-blue-400">{mockCompliance.insurance.coverage}</p>
                <p className="mt-1 text-[9px] text-slate-500">Valid to: {mockCompliance.insurance.expiry}</p>
              </div>
              {/* Trade License */}
              <div className="bg-slate-900 p-4 transition-colors hover:bg-slate-800/80">
                <FileCheck className="mb-3 h-5 w-5 text-slate-400" />
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Trade License</p>
                <p className="mt-1 font-mono text-sm font-semibold text-emerald-400">VALID</p>
                <p className="mt-1 font-mono text-[9px] text-slate-400">#{mockCompliance.license.number}</p>
              </div>
              {/* Safety Training */}
              <div className="bg-slate-900 p-4 transition-colors hover:bg-slate-800/80">
                <GraduationCap className="mb-3 h-5 w-5 text-slate-400" />
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Safety Certifications</p>
                <p className="mt-1 font-mono text-sm font-semibold text-purple-400">3 ACTIVE</p>
                <p className="mt-1 text-[9px] text-slate-500">{mockCompliance.safety.certs.join(', ')}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {/* Left Column */}
            <div className="space-y-6 lg:col-span-2">
              {/* Performance Matrix */}
              <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-6">
                {[
                  { label: 'Platform Volume', value: String(pro.totalJobsCompleted), icon: Briefcase, badge: null },
                  { label: 'On-Time Delivery', value: '98%', icon: Clock, badge: { text: 'Top 5%', color: 'bg-emerald-50 text-emerald-700' } },
                  { label: 'Dispute Rate', value: '0%', icon: Shield, badge: { text: 'Flawless', color: 'bg-emerald-50 text-emerald-700' } },
                  { label: 'Avg Response', value: '12 min', icon: Zap, badge: null },
                  { label: 'Response Rate', value: `${pro.responseRate}%`, icon: TrendingUp, badge: null },
                  { label: 'Platform Tenure', value: `${pro.yearsExperience} yrs`, icon: Award, badge: null },
                ].map((stat) => (
                  <Card key={stat.label} className="rounded-2xl border-gray-200 bg-white p-4 text-center transition-all duration-200 hover:shadow-md">
                    <stat.icon className="mx-auto mb-1.5 h-5 w-5 text-slate-400" />
                    <p className="text-2xl font-bold tracking-tight text-gray-900">
                      {stat.value}
                    </p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-wider text-gray-500">{stat.label}</p>
                    {stat.badge && (
                      <span className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${stat.badge.color}`}>
                        {stat.badge.text}
                      </span>
                    )}
                  </Card>
                ))}
              </div>

              {/* About */}
              <Card className="rounded-2xl border-gray-200 bg-white p-6 md:p-8">
                <h2 className="mb-4 text-lg font-bold text-gray-900">Professional Overview</h2>
                <p className="whitespace-pre-line leading-relaxed text-gray-600">
                  {pro.bio}
                </p>

                <div className="mt-6 border-t border-gray-100 pt-6">
                  <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-400">
                    Approved Service Categories
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {pro.categories.map((cat) => (
                      <Badge
                        key={cat}
                        className="rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-200 border-transparent"
                      >
                        {cat}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>

              {/* Verified Proof Library */}
              <Card className="rounded-2xl border-gray-200 bg-white p-6 md:p-8">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50">
                      <Camera className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h2 className="text-lg font-bold text-gray-900">Verified Proof Library</h2>
                      <p className="text-xs text-gray-500">GPS-stamped milestone documentation</p>
                    </div>
                  </div>
                  <Button variant="outline" className="text-sm h-auto px-4 py-2 rounded-xl">
                    View Full Archive
                  </Button>
                </div>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                  {mockGallery.map((item) => (
                    <div
                      key={item.id}
                      className="group relative aspect-square cursor-pointer overflow-hidden rounded-xl border border-gray-200"
                    >
                      <img
                        src={item.url}
                        alt={item.alt}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />
                      
                      {/* Top Badges */}
                      <div className="absolute left-2 top-2 flex flex-col gap-1">
                        {item.escrowVerified && (
                          <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/90 px-2 py-1 backdrop-blur-sm shadow-sm">
                            <CheckCircle className="h-3 w-3 text-white" />
                            <span className="text-[9px] font-bold tracking-wider text-white uppercase">Vault Verified</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1.5 rounded-full bg-black/50 px-2 py-1 backdrop-blur-sm">
                          <MapPin className="h-3 w-3 text-white/80" />
                          <span className="font-mono text-[8px] font-medium text-white/80 tracking-wider">GPS TAGGED</span>
                        </div>
                      </div>

                      {/* Bottom Info */}
                      <div className="absolute bottom-0 left-0 w-full p-3 transform translate-y-1 transition-transform duration-300 group-hover:translate-y-0">
                        <p className="text-xs font-bold text-white truncate">{item.scope}</p>
                        <p className="font-mono text-[9px] text-emerald-400 mt-0.5">QS Appv: {item.verifiedDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Reviews */}
              <Card className="rounded-2xl border-gray-200 bg-white p-6 md:p-8">
                <div className="mb-6 flex items-center justify-between">
                  <h2 className="text-lg font-bold text-gray-900">
                    Reviews ({pro.reviewCount})
                  </h2>
                  <div className="flex items-center gap-3">
                    <WriteReviewDialog proName={pro.name}>
                      <Button
                        variant="outline"
                        className="flex items-center gap-1.5 rounded-xl border-reno-green-light px-3 py-1.5 text-xs font-semibold text-reno-green transition-all duration-200 hover:bg-reno-green-light h-auto"
                      >
                        <PenLine className="h-3.5 w-3.5" />
                        Write a Review
                      </Button>
                    </WriteReviewDialog>
                    <div className="flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1 ring-1 ring-amber-200/50">
                      <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-bold text-gray-900">{pro.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Star Distribution Chart */}
                <div className="mb-6 rounded-xl bg-gray-50 p-4">
                  {[
                    { stars: 5, pct: 80 },
                    { stars: 4, pct: 15 },
                    { stars: 3, pct: 3 },
                    { stars: 2, pct: 1 },
                    { stars: 1, pct: 1 },
                  ].map((row) => (
                    <div key={row.stars} className="flex items-center gap-2.5 py-1">
                      <span className="w-4 text-right text-xs font-semibold text-gray-600">{row.stars}</span>
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      <div className="flex-1 h-2 rounded-full bg-gray-200 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-amber-400 transition-all duration-500"
                          style={{ width: `${row.pct}%` }}
                        />
                      </div>
                      <span className="w-8 text-right text-xs text-gray-400">{row.pct}%</span>
                    </div>
                  ))}
                </div>

                <div className="space-y-6">
                  {mockReviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                      <div className="mb-3 flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={review.reviewerAvatar} alt={review.reviewerName} className="object-cover" />
                            <AvatarFallback className="bg-gray-100 text-sm font-semibold text-gray-600">
                              {review.reviewerName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-gray-900">
                              {review.reviewerName}
                            </p>
                            <p className="text-xs text-gray-400">
                              {review.jobTitle} &middot;{' '}
                              {new Date(review.date).toLocaleDateString('en-CA', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-0.5">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < review.rating
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-gray-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed text-gray-600">
                        {review.comment}
                      </p>
                      <Button
                        variant="ghost"
                        className="mt-2.5 flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs text-gray-400 transition-all duration-200 hover:bg-gray-50 hover:text-gray-600 h-auto"
                      >
                        <ThumbsUp className="h-3.5 w-3.5" />
                        Helpful
                      </Button>
                    </div>
                  ))}
                </div>

                <Button
                  asChild
                  variant="outline"
                  className="mt-6 w-full rounded-xl border-gray-200 py-2.5 text-sm font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-50 hover:shadow-sm"
                >
                  <Link href={`/pros/${pro.id}/reviews`}>
                    See All {pro.reviewCount} Reviews
                  </Link>
                </Button>
              </Card>
            </div>

            {/* Right Column - CTA */}
            <div className="space-y-6">
              <Card className="sticky top-20 rounded-2xl border-gray-200 bg-white p-6 shadow-sm">
                <div className="mb-5 text-center">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400">Verified Labor Rate</p>
                  <p className="mt-1 text-3xl font-bold tracking-tight text-gray-900">
                    ${pro.hourlyRateMin} - ${pro.hourlyRateMax}
                    <span className="text-base font-normal text-gray-400">
                      /hr
                    </span>
                  </p>
                </div>

                <div className="space-y-2.5">
                  <Button asChild className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-gray-800 hover:shadow-lg h-auto">
                    <Link href={`/post-job?pro=${pro.id}`}>
                      <Lock className="h-4 w-4" />
                      Draft Vault Contract
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border-2 border-emerald-600 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700 transition-all duration-200 hover:bg-emerald-100 h-auto"
                  >
                    <ClipboardList className="h-4 w-4" />
                    Submit Project Specs
                  </Button>
                  <Button
                    variant="outline"
                    className="flex w-full items-center justify-center gap-2 rounded-xl border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-50 h-auto"
                  >
                    <MessageSquare className="h-4 w-4 text-gray-400" />
                    Direct Inquiry
                  </Button>
                </div>

                <div className="mt-6 space-y-3 border-t border-gray-100 pt-5">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>
                      Network Member since{' '}
                      {new Date(pro.memberSince).toLocaleDateString('en-CA', {
                        month: 'long',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <Zap className="h-4 w-4 text-amber-400" />
                    <span>Avg response: {pro.responseTimeMinutes} min</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="h-2.5 w-2.5 rounded-full bg-emerald-500 shadow-sm shadow-emerald-200" />
                    <span className="font-semibold text-emerald-700">
                      Accepting new contracts
                    </span>
                  </div>
                </div>

                {/* Guarantee Badges */}
                <div className="mt-6 space-y-2.5 border-t border-gray-100 pt-5">
                  <div className="flex items-center gap-2.5 rounded-lg bg-slate-50 px-3 py-2.5 border border-slate-100">
                    <Lock className="h-4 w-4 text-slate-600" />
                    <span className="text-xs font-semibold text-slate-700">Vault-Protected Capital</span>
                  </div>
                  <div className="flex items-center gap-2.5 rounded-lg bg-slate-50 px-3 py-2.5 border border-slate-100">
                    <ShieldCheck className="h-4 w-4 text-slate-600" />
                    <span className="text-xs font-semibold text-slate-700">Dispute Mediation Included</span>
                  </div>
                </div>
              </Card>

              {/* Similar Pros */}
              <Card className="rounded-2xl border-gray-200 bg-white p-6">
                <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-gray-400">
                  Similar Pros
                </h3>
                <div className="space-y-4">
                  {[
                    { name: 'Alex Rivera', specialty: 'Electrician', rating: 4.8, avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face' },
                    { name: 'Priya Sharma', specialty: 'Smart Home Expert', rating: 4.9, avatar: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=100&h=100&fit=crop&crop=face' },
                    { name: 'Tom Chen', specialty: 'Electrician', rating: 4.7, avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=face' },
                  ].map((similar) => (
                    <div key={similar.name} className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={similar.avatar} alt={similar.name} className="object-cover" />
                        <AvatarFallback className="bg-gray-100 text-sm">{similar.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900 truncate">{similar.name}</p>
                        <p className="text-xs text-gray-500">{similar.specialty}</p>
                      </div>
                      <div className="flex items-center gap-1 shrink-0">
                        <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                        <span className="text-xs font-bold text-gray-700">{similar.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" asChild className="mt-4 w-full rounded-xl border-gray-200 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 h-auto">
                  <Link href="/pros">
                    Browse All Pros
                  </Link>
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
