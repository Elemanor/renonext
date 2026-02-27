'use client';

import {
  Users,
  Search,
  Filter,
  Star,
  Shield,
  CheckCircle,
  AlertTriangle,
  Clock,
  MapPin,
  Phone,
  Mail,
  Eye,
  UserPlus,
  ClipboardList,
  Wrench,
  Zap,
  Hammer,
  Paintbrush,
  HardHat,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const trades = [
  'All Trades',
  'Drywall',
  'Electrical',
  'Plumbing',
  'Concrete',
  'Glazing',
  'HVAC',
  'Framing',
  'Painting',
  'Roofing',
];

const subs = [
  {
    id: 's-1',
    name: 'ProWall Inc.',
    trade: 'Drywall',
    contact: 'Mike Ramirez',
    phone: '416-555-0123',
    email: 'mike@prowall.ca',
    location: 'Toronto, ON',
    crewSize: 8,
    rating: 4.9,
    reviewCount: 67,
    completedJobs: 142,
    wsibStatus: 'active',
    wsibExpiry: 'Aug 15, 2026',
    certifications: ['WSIB', 'WHMIS', 'Working at Heights', 'First Aid'],
    specialties: ['Level 4/5 Finish', 'Fire-Rated', 'Sound Insulation', 'Metal Stud'],
    initials: 'PW',
    color: 'bg-violet-600',
    lastJobDate: 'Feb 2, 2026',
  },
  {
    id: 's-2',
    name: 'Spark Electric',
    trade: 'Electrical',
    contact: 'James Chen',
    phone: '416-555-0456',
    email: 'james@sparkelectric.ca',
    location: 'North York, ON',
    crewSize: 6,
    rating: 4.8,
    reviewCount: 54,
    completedJobs: 98,
    wsibStatus: 'active',
    wsibExpiry: 'Nov 30, 2026',
    certifications: ['WSIB', 'WHMIS', 'ESA Licensed', 'First Aid'],
    specialties: ['Residential Rough-In', 'EV Charging', 'Smart Panels', 'Service Upgrades'],
    initials: 'SE',
    color: 'bg-blue-600',
    lastJobDate: 'Jan 28, 2026',
  },
  {
    id: 's-3',
    name: 'GTA Drywall Co.',
    trade: 'Drywall',
    contact: 'Paulo Silva',
    phone: '905-555-0789',
    email: 'paulo@gtadrywall.ca',
    location: 'Mississauga, ON',
    crewSize: 5,
    rating: 4.7,
    reviewCount: 41,
    completedJobs: 76,
    wsibStatus: 'active',
    wsibExpiry: 'Jun 20, 2026',
    certifications: ['WSIB', 'WHMIS', 'Working at Heights'],
    specialties: ['Board & Tape', 'Acoustic Ceilings', 'Bulkheads'],
    initials: 'GD',
    color: 'bg-emerald-600',
    lastJobDate: 'Feb 4, 2026',
  },
  {
    id: 's-4',
    name: 'FastFinish Ltd.',
    trade: 'Drywall',
    contact: 'Tom Baker',
    phone: '647-555-0321',
    email: 'tom@fastfinish.ca',
    location: 'Scarborough, ON',
    crewSize: 3,
    rating: 4.5,
    reviewCount: 28,
    completedJobs: 52,
    wsibStatus: 'expired',
    wsibExpiry: 'Jan 30, 2026',
    certifications: ['WHMIS'],
    specialties: ['Board & Tape', 'Patching'],
    initials: 'FF',
    color: 'bg-gray-600',
    lastJobDate: 'Jan 15, 2026',
  },
  {
    id: 's-5',
    name: 'FormTech Inc.',
    trade: 'Concrete',
    contact: 'Andre Kovac',
    phone: '416-555-0654',
    email: 'andre@formtech.ca',
    location: 'Vaughan, ON',
    crewSize: 10,
    rating: 4.9,
    reviewCount: 83,
    completedJobs: 167,
    wsibStatus: 'active',
    wsibExpiry: 'Sep 10, 2026',
    certifications: ['WSIB', 'WHMIS', 'Confined Spaces', 'Working at Heights', 'First Aid'],
    specialties: ['ICF', 'Poured Walls', 'Flatwork', 'Rebar'],
    initials: 'FT',
    color: 'bg-amber-600',
    lastJobDate: 'Feb 6, 2026',
  },
  {
    id: 's-6',
    name: 'Toronto Glazing Co.',
    trade: 'Glazing',
    contact: 'Nina Petrova',
    phone: '416-555-0987',
    email: 'nina@toglazing.ca',
    location: 'Etobicoke, ON',
    crewSize: 6,
    rating: 4.8,
    reviewCount: 45,
    completedJobs: 89,
    wsibStatus: 'expiring',
    wsibExpiry: 'Feb 22, 2026',
    certifications: ['WSIB', 'WHMIS', 'Working at Heights', 'Fall Protection'],
    specialties: ['Curtain Wall', 'Storefront', 'Window Install', 'Skylight'],
    initials: 'TG',
    color: 'bg-sky-600',
    lastJobDate: 'Feb 1, 2026',
  },
];

const wsibStatusConfig = {
  active: {
    label: 'WSIB Active',
    color: 'bg-emerald-50 text-emerald-700',
    icon: CheckCircle,
    iconColor: 'text-emerald-500',
  },
  expiring: {
    label: 'WSIB Expiring',
    color: 'bg-amber-50 text-amber-700',
    icon: Clock,
    iconColor: 'text-amber-500',
  },
  expired: {
    label: 'WSIB Expired',
    color: 'bg-red-50 text-red-700',
    icon: AlertTriangle,
    iconColor: 'text-red-500',
  },
};

export default function SubTradesPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Sub-Trade Directory
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Browse, verify, and manage your sub-trade network
          </p>
        </div>
        <Button className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-violet-700 hover:shadow-md h-auto">
          <UserPlus className="mr-1.5 h-4 w-4" />
          Invite Sub-Trade
        </Button>
      </div>

      {/* Search & Filter Bar */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 shadow-sm">
          <Search className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-400">Search subs by name, trade, or location...</span>
        </div>
        <Button
          variant="outline"
          className="h-auto rounded-xl border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700"
        >
          <Filter className="mr-1.5 h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Trade Filter Tags */}
      <div className="mb-6 flex flex-wrap gap-2">
        {trades.map((trade, i) => (
          <Badge
            key={trade}
            className={`cursor-pointer rounded-full px-3 py-1.5 text-xs font-medium transition-all ${
              i === 0
                ? 'border-transparent bg-violet-100 text-violet-700'
                : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
            }`}
          >
            {trade}
          </Badge>
        ))}
      </div>

      {/* Sub-Trade Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {subs.map((sub) => {
          const wsibConfig = wsibStatusConfig[sub.wsibStatus as keyof typeof wsibStatusConfig];
          const WsibIcon = wsibConfig.icon;
          return (
            <Card
              key={sub.id}
              className={`rounded-2xl border shadow-sm transition-all duration-200 hover:shadow-md ${
                sub.wsibStatus === 'expired'
                  ? 'border-red-200 bg-red-50/20'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <CardContent className="p-5">
                {/* Top: Avatar + Name + WSIB Badge */}
                <div className="mb-4 flex items-start gap-3">
                  <Avatar className="h-12 w-12 shrink-0">
                    <AvatarFallback
                      className={`${sub.color} text-sm font-bold text-white`}
                    >
                      {sub.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-bold text-gray-900">{sub.name}</h3>
                      <Badge
                        className={`shrink-0 rounded-full border-transparent px-2 py-0 text-[9px] font-semibold ${wsibConfig.color}`}
                      >
                        <WsibIcon className={`mr-0.5 h-2.5 w-2.5 ${wsibConfig.iconColor}`} />
                        {wsibConfig.label}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-500">{sub.trade}</p>
                    <p className="text-xs text-gray-400">
                      Contact: {sub.contact}
                    </p>
                  </div>
                </div>

                {/* Stats Row */}
                <div className="mb-4 grid grid-cols-4 gap-2">
                  <div className="rounded-lg bg-gray-50 px-2 py-1.5 text-center">
                    <p className="text-sm font-bold text-gray-900">{sub.crewSize}</p>
                    <p className="text-[9px] text-gray-500">Crew</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 px-2 py-1.5 text-center">
                    <div className="flex items-center justify-center gap-0.5">
                      <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                      <span className="text-sm font-bold text-gray-900">{sub.rating}</span>
                    </div>
                    <p className="text-[9px] text-gray-500">{sub.reviewCount} reviews</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 px-2 py-1.5 text-center">
                    <p className="text-sm font-bold text-gray-900">{sub.completedJobs}</p>
                    <p className="text-[9px] text-gray-500">Jobs</p>
                  </div>
                  <div className="rounded-lg bg-gray-50 px-2 py-1.5 text-center">
                    <p className="text-sm font-bold text-gray-900">
                      {sub.certifications.length}
                    </p>
                    <p className="text-[9px] text-gray-500">Certs</p>
                  </div>
                </div>

                {/* Certifications */}
                <div className="mb-3 flex flex-wrap gap-1">
                  {sub.certifications.map((cert) => (
                    <Badge
                      key={cert}
                      className="rounded-full border-transparent bg-emerald-50 px-2 py-0.5 text-[9px] font-medium text-emerald-700"
                    >
                      <CheckCircle className="mr-0.5 h-2.5 w-2.5" />
                      {cert}
                    </Badge>
                  ))}
                </div>

                {/* Specialties */}
                <div className="mb-4 flex flex-wrap gap-1">
                  {sub.specialties.map((spec) => (
                    <Badge
                      key={spec}
                      className="rounded-full border border-gray-200 bg-white px-2 py-0.5 text-[9px] font-medium text-gray-600"
                    >
                      {spec}
                    </Badge>
                  ))}
                </div>

                {/* Location + WSIB Expiry */}
                <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {sub.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Shield className="h-3 w-3" />
                    WSIB expires: {sub.wsibExpiry}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex gap-2 border-t border-gray-100 pt-3">
                  <Button
                    variant="outline"
                    className="h-auto flex-1 rounded-xl border-gray-200 px-3 py-2 text-xs font-medium text-gray-700"
                  >
                    <Eye className="mr-1 h-3.5 w-3.5" />
                    View Profile
                  </Button>
                  <Button className="h-auto flex-1 rounded-xl bg-violet-600 px-3 py-2 text-xs font-semibold text-white hover:bg-violet-700">
                    <ClipboardList className="mr-1 h-3.5 w-3.5" />
                    Invite to Tender
                  </Button>
                </div>

                {/* Expired WSIB Warning */}
                {sub.wsibStatus === 'expired' && (
                  <div className="mt-3 flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2">
                    <AlertTriangle className="h-4 w-4 shrink-0 text-red-500" />
                    <span className="text-[11px] text-red-700">
                      WSIB expired — cannot be awarded tenders until renewed
                    </span>
                  </div>
                )}

                {/* Expiring WSIB Warning */}
                {sub.wsibStatus === 'expiring' && (
                  <div className="mt-3 flex items-center gap-2 rounded-lg bg-amber-50 px-3 py-2">
                    <Clock className="h-4 w-4 shrink-0 text-amber-500" />
                    <span className="text-[11px] text-amber-700">
                      WSIB expires {sub.wsibExpiry} — renewal reminder sent
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
