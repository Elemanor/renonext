'use client';

import {
  Shield,
  MapPin,
  Clock,
  CheckCircle,
  AlertTriangle,
  Bell,
  User,
  Users,
  Star,
  Lock,
  Eye,
  Camera,
  FileCheck,
  ChevronRight,
  Smartphone,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// ---------------------------------------------------------------------------
// Mock Data
// ---------------------------------------------------------------------------

const siteStatus = {
  projectName: 'Basement Waterproofing & Drain Tile',
  address: '47 Maple Grove Dr, Toronto',
  status: 'active' as const,
  workersOnSite: 3,
  approvedRoster: 4,
  todayStart: '7:45 AM',
  expectedEnd: '4:30 PM',
  currentTask: 'Rough-in Drains',
  taskStatus: 'in_progress',
  jsaCompleted: true,
  lastPhotoUploaded: '11:23 AM',
};

const approvedRoster = [
  {
    id: 'crew-1',
    name: 'Alex Vasquez',
    role: 'Foreman',
    trade: 'General',
    photo: null,
    rating: 4.9,
    jobsCompleted: 127,
    clockedIn: '7:45 AM',
    clockedOut: null,
    hoursToday: '4.5 hrs',
    gpsVerified: true,
    insideGeofence: true,
    certifications: ['WHMIS', 'Working at Heights', 'First Aid', 'Confined Spaces'],
    tradeLicense: 'ON-GEN-2024-4821',
    wsibVerified: true,
    jsaSigned: true,
    jsaSignedAt: '7:46 AM',
    approved: true,
    status: 'on_site' as const,
  },
  {
    id: 'crew-2',
    name: 'Sarah Johansson',
    role: 'Plumber',
    trade: 'Plumbing',
    photo: null,
    rating: 4.8,
    jobsCompleted: 84,
    clockedIn: '8:00 AM',
    clockedOut: null,
    hoursToday: '4.25 hrs',
    gpsVerified: true,
    insideGeofence: true,
    certifications: ['WHMIS', 'Working at Heights', 'Backflow Prevention'],
    tradeLicense: 'ON-PLM-2023-7293',
    wsibVerified: true,
    jsaSigned: true,
    jsaSignedAt: '8:01 AM',
    approved: true,
    status: 'on_site' as const,
  },
  {
    id: 'crew-3',
    name: 'Mike Torres',
    role: 'Apprentice',
    trade: 'Plumbing',
    photo: null,
    rating: 4.6,
    jobsCompleted: 23,
    clockedIn: '8:15 AM',
    clockedOut: null,
    hoursToday: '4 hrs',
    gpsVerified: true,
    insideGeofence: true,
    certifications: ['WHMIS', 'First Aid'],
    tradeLicense: 'ON-PLM-APP-2025-1104',
    wsibVerified: true,
    jsaSigned: true,
    jsaSignedAt: '8:16 AM',
    approved: true,
    status: 'on_site' as const,
  },
  {
    id: 'crew-4',
    name: 'David Kim',
    role: 'Electrician',
    trade: 'Electrical',
    photo: null,
    rating: 4.7,
    jobsCompleted: 56,
    clockedIn: null,
    clockedOut: null,
    hoursToday: '0 hrs',
    gpsVerified: false,
    insideGeofence: false,
    certifications: ['WHMIS', 'Working at Heights', '309A License'],
    tradeLicense: 'ON-ELE-309A-2024-5512',
    wsibVerified: true,
    jsaSigned: false,
    jsaSignedAt: null,
    approved: true,
    status: 'not_arrived' as const,
    expectedArrival: '1:00 PM',
  },
];

const notifications = [
  { id: 'n-1', time: '8:15 AM', message: 'Mike T. (Apprentice, Verified) clocked in', type: 'clock_in' as const },
  { id: 'n-2', time: '8:01 AM', message: 'Sarah J. (Plumber, Verified) clocked in. JSA signed.', type: 'clock_in' as const },
  { id: 'n-3', time: '7:46 AM', message: 'Alex V. (Foreman, Verified) clocked in. JSA signed. Daily briefing started.', type: 'clock_in' as const },
  { id: 'n-4', time: '7:45 AM', message: 'Site activated. Geofence armed at 47 Maple Grove Dr.', type: 'system' as const },
];

const todayTimeline = [
  { time: '7:45 AM', event: 'Site opened — Alex V. (Foreman) arrived', status: 'done' as const },
  { time: '7:46 AM', event: 'Daily JSA signed by all workers', status: 'done' as const },
  { time: '8:00 AM', event: 'Sarah J. + Mike T. arrived', status: 'done' as const },
  { time: '8:15 AM', event: 'Work started: Rough-in Drains', status: 'done' as const },
  { time: '11:23 AM', event: 'Progress photo uploaded (Drain layout)', status: 'done' as const },
  { time: '12:00 PM', event: 'Lunch break', status: 'current' as const },
  { time: '1:00 PM', event: 'David K. (Electrician) expected', status: 'upcoming' as const },
  { time: '4:30 PM', event: 'Estimated end of day', status: 'upcoming' as const },
];

const rosterAlert: { name: string; message: string; time: string } | null = null;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function getInitials(name: string) {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();
}

function roleColor(role: string) {
  switch (role) {
    case 'Foreman':
      return 'bg-amber-50 text-amber-700 border-amber-200';
    case 'Plumber':
      return 'bg-primary-50 text-primary-700 border-primary-200';
    case 'Apprentice':
      return 'bg-purple-50 text-purple-700 border-purple-200';
    case 'Electrician':
      return 'bg-reno-amber-50 text-reno-amber-700 border-reno-amber-200';
    default:
      return 'bg-slate-50 text-slate-700 border-slate-200';
  }
}

function tradeColor(trade: string) {
  switch (trade) {
    case 'General':
      return 'bg-slate-50 text-slate-600 border-slate-200';
    case 'Plumbing':
      return 'bg-cyan-50 text-cyan-700 border-cyan-200';
    case 'Electrical':
      return 'bg-reno-amber-50 text-reno-amber-700 border-reno-amber-200';
    default:
      return 'bg-slate-50 text-slate-600 border-slate-200';
  }
}

function notificationColor(type: string) {
  switch (type) {
    case 'clock_in':
      return 'text-reno-green-500';
    case 'system':
      return 'text-primary-500';
    case 'alert':
      return 'text-red-500';
    default:
      return 'text-slate-400';
  }
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default function SiteCrewPage() {
  const onSiteWorkers = approvedRoster.filter((w) => w.status === 'on_site');
  const notArrivedWorkers = approvedRoster.filter((w) => w.status === 'not_arrived');

  return (
    <div className="space-y-6">
      {/* ----------------------------------------------------------------- */}
      {/* Header                                                            */}
      {/* ----------------------------------------------------------------- */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">Site Crew</h1>
            {siteStatus.status === 'active' && (
              <Badge className="rounded-full border-transparent bg-reno-green-50 px-3 py-1 text-xs font-bold text-reno-green-700">
                <span className="relative mr-1.5 flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-reno-green-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-reno-green-500" />
                </span>
                LIVE
              </Badge>
            )}
          </div>
          <p className="mt-1 text-sm text-slate-500">
            See exactly who&apos;s in your home — verified and tracked
          </p>
        </div>
        <Button
          variant="outline"
          className="h-auto rounded-xl border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700"
        >
          <Eye className="mr-1.5 h-4 w-4" />
          View Job Details
        </Button>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Site Status Banner                                                */}
      {/* ----------------------------------------------------------------- */}
      <Card className="rounded-2xl border-2 border-reno-green-200 bg-gradient-to-br from-reno-green-50 to-white shadow-none">
        <CardContent className="p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-3">
              {/* Status headline */}
              <div className="flex items-center gap-2">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-reno-green-400 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-reno-green-500" />
                </span>
                <span className="text-lg font-bold text-reno-green-800">
                  SITE ACTIVE — {siteStatus.workersOnSite} Workers On Site
                </span>
              </div>

              {/* Address */}
              <div className="flex items-center gap-1.5 text-sm text-slate-600">
                <MapPin className="h-4 w-4 text-slate-400" />
                {siteStatus.address}
              </div>

              {/* Current task */}
              <div className="flex items-center gap-1.5 text-sm text-slate-600">
                <Clock className="h-4 w-4 text-slate-400" />
                Current Task: <span className="font-semibold text-slate-900">{siteStatus.currentTask}</span>
                <Badge className="ml-1 rounded-full border-transparent bg-amber-50 px-2 py-0.5 text-[10px] font-semibold text-amber-700">
                  In Progress
                </Badge>
              </div>

              {/* Schedule */}
              <div className="flex items-center gap-1.5 text-sm text-slate-600">
                <Clock className="h-4 w-4 text-slate-400" />
                Today: {siteStatus.todayStart} — Est. {siteStatus.expectedEnd}
              </div>

              {/* JSA */}
              <div className="flex items-center gap-1.5 text-sm text-slate-600">
                <FileCheck className="h-4 w-4 text-slate-400" />
                JSA Safety Briefing:{' '}
                <span className="font-semibold text-reno-green-700">
                  <CheckCircle className="mr-0.5 inline h-3.5 w-3.5" />
                  Completed
                </span>
              </div>

              {/* Last photo */}
              <div className="flex items-center gap-1.5 text-sm text-slate-600">
                <Camera className="h-4 w-4 text-slate-400" />
                Last Photo: {siteStatus.lastPhotoUploaded}
              </div>
            </div>

            {/* Summary counters */}
            <div className="flex gap-3 lg:shrink-0">
              <div className="flex flex-col items-center rounded-xl border border-reno-green-200 bg-white px-5 py-3">
                <span className="text-2xl font-bold text-reno-green-700">{siteStatus.workersOnSite}</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">On Site</span>
              </div>
              <div className="flex flex-col items-center rounded-xl border border-slate-200 bg-white px-5 py-3">
                <span className="text-2xl font-bold text-slate-700">{siteStatus.approvedRoster}</span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">Approved</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* ----------------------------------------------------------------- */}
      {/* Roster Lock Alert (only if rosterAlert is set)                    */}
      {/* ----------------------------------------------------------------- */}
      {rosterAlert && (
        <Card className="rounded-2xl border-2 border-red-300 bg-red-50 shadow-none">
          <CardContent className="p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100">
                  <AlertTriangle className="h-5 w-5 text-red-600" />
                </div>
                <div>
                  <p className="text-sm font-bold text-red-800">UNVERIFIED WORKER DETECTED</p>
                  <p className="mt-1 text-sm text-red-700">{rosterAlert.message}</p>
                  <p className="mt-0.5 text-xs text-red-500">{rosterAlert.time}</p>
                </div>
              </div>
              <div className="flex gap-2 sm:shrink-0">
                <Button className="h-auto rounded-lg bg-red-600 px-4 py-2 text-xs font-semibold text-white hover:bg-red-700">
                  Deny Access
                </Button>
                <Button
                  variant="outline"
                  className="h-auto rounded-lg border-red-300 px-4 py-2 text-xs font-semibold text-red-700 hover:bg-red-100"
                >
                  Contact GC
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* ----------------------------------------------------------------- */}
      {/* Who's On Site — Worker Cards                                      */}
      {/* ----------------------------------------------------------------- */}
      <div>
        <div className="mb-4 flex items-center gap-2">
          <Users className="h-5 w-5 text-slate-400" />
          <h2 className="text-lg font-bold text-slate-900">Who&apos;s On Site</h2>
          <Badge className="rounded-full border-transparent bg-reno-green-50 px-2.5 py-0.5 text-xs font-semibold text-reno-green-700">
            {onSiteWorkers.length} active
          </Badge>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {approvedRoster.map((worker) => {
            const isOnSite = worker.status === 'on_site';
            const isMuted = worker.status === 'not_arrived';

            return (
              <Card
                key={worker.id}
                className={`rounded-2xl border shadow-sm transition-all ${
                  isOnSite
                    ? 'border-reno-green-200 bg-white'
                    : 'border-slate-200 bg-slate-50/50'
                }`}
              >
                <CardContent className="p-5">
                  {/* Top: Avatar + Name + Badges */}
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <div
                      className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-full border-2 text-lg font-bold ${
                        isOnSite
                          ? 'border-reno-green-400 bg-reno-green-50 text-reno-green-700'
                          : 'border-slate-300 bg-slate-100 text-slate-400'
                      }`}
                    >
                      {getInitials(worker.name)}
                    </div>

                    <div className="min-w-0 flex-1">
                      {/* Name row */}
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`text-base font-bold ${isMuted ? 'text-slate-400' : 'text-slate-900'}`}>
                          {worker.name}
                        </span>
                        <Badge className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${roleColor(worker.role)}`}>
                          {worker.role}
                        </Badge>
                        <Badge className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold ${tradeColor(worker.trade)}`}>
                          {worker.trade}
                        </Badge>
                      </div>

                      {/* Clock status */}
                      {isOnSite ? (
                        <div className="mt-1 flex items-center gap-1.5 text-sm text-reno-green-700">
                          <span className="relative flex h-2 w-2">
                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-reno-green-400 opacity-75" />
                            <span className="relative inline-flex h-2 w-2 rounded-full bg-reno-green-500" />
                          </span>
                          Clocked in at {worker.clockedIn}
                        </div>
                      ) : (
                        <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-400">
                          <Clock className="h-3.5 w-3.5" />
                          Expected at {(worker as typeof approvedRoster[3]).expectedArrival}
                        </div>
                      )}

                      {/* GPS + Geofence badges */}
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {isOnSite && worker.gpsVerified && (
                          <Badge className="rounded-full border-transparent bg-reno-green-50 px-2 py-0.5 text-[10px] font-semibold text-reno-green-700">
                            <MapPin className="mr-0.5 h-3 w-3" />
                            GPS Verified
                          </Badge>
                        )}
                        {isOnSite && worker.insideGeofence && (
                          <Badge className="rounded-full border-transparent bg-reno-green-50 px-2 py-0.5 text-[10px] font-semibold text-reno-green-700">
                            <Shield className="mr-0.5 h-3 w-3" />
                            Inside Geofence
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="my-4 border-t border-slate-100" />

                  {/* Details grid */}
                  <div className={`space-y-2.5 text-sm ${isMuted ? 'text-slate-400' : 'text-slate-600'}`}>
                    {/* Rating */}
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <Star className={`h-4 w-4 ${isMuted ? 'text-slate-300' : 'fill-amber-400 text-amber-400'}`} />
                        <span className={isMuted ? '' : 'font-semibold text-slate-900'}>{worker.rating}</span>
                        <span className="text-xs text-slate-400">({worker.jobsCompleted} jobs)</span>
                      </span>
                      <span className="text-xs">
                        Hours today: <span className={`font-semibold ${isMuted ? '' : 'text-slate-900'}`}>{worker.hoursToday}</span>
                      </span>
                    </div>

                    {/* Trade License */}
                    <div className="flex items-center gap-1.5">
                      <Shield className={`h-4 w-4 ${isMuted ? 'text-slate-300' : 'text-primary-500'}`} />
                      <span className="text-xs">Trade License:</span>
                      <span className={`font-mono text-xs ${isMuted ? '' : 'font-semibold text-slate-900'}`}>
                        {worker.tradeLicense}
                      </span>
                    </div>

                    {/* WSIB */}
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className={`h-4 w-4 ${isMuted ? 'text-slate-300' : 'text-reno-green-500'}`} />
                      <span className="text-xs">WSIB:</span>
                      <span className={`text-xs font-semibold ${isMuted ? '' : 'text-reno-green-700'}`}>
                        Verified
                      </span>
                    </div>

                    {/* JSA */}
                    <div className="flex items-center gap-1.5">
                      {worker.jsaSigned ? (
                        <>
                          <CheckCircle className={`h-4 w-4 ${isMuted ? 'text-slate-300' : 'text-reno-green-500'}`} />
                          <span className="text-xs">JSA Signed:</span>
                          <span className={`text-xs font-semibold ${isMuted ? '' : 'text-reno-green-700'}`}>
                            at {worker.jsaSignedAt}
                          </span>
                        </>
                      ) : (
                        <>
                          <Clock className="h-4 w-4 text-slate-300" />
                          <span className="text-xs">JSA Signed:</span>
                          <span className="text-xs font-semibold text-slate-400">Pending</span>
                        </>
                      )}
                    </div>

                    {/* Certifications */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {worker.certifications.map((cert) => (
                        <Badge
                          key={cert}
                          variant="outline"
                          className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${
                            isMuted ? 'border-slate-200 text-slate-400' : 'border-slate-200 text-slate-600'
                          }`}
                        >
                          {cert}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* View Full Profile button */}
                  <div className="mt-4">
                    <Button
                      variant="outline"
                      className={`h-auto w-full rounded-xl border-slate-200 px-4 py-2 text-xs font-semibold ${
                        isMuted ? 'text-slate-400' : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <User className="mr-1.5 h-3.5 w-3.5" />
                      View Full Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* Push Notification Feed                                            */}
      {/* ----------------------------------------------------------------- */}
      <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <CardContent className="p-5">
          <div className="mb-4">
            <div className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-slate-400" />
              <h2 className="text-lg font-bold text-slate-900">Today&apos;s Notifications</h2>
            </div>
            <p className="mt-0.5 text-xs text-slate-400">
              You get notified every time a worker arrives or leaves
            </p>
          </div>

          <div className="space-y-3">
            {notifications.map((n) => (
              <div key={n.id} className="flex items-start gap-3">
                <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                  n.type === 'clock_in' ? 'bg-reno-green-50' : n.type === 'system' ? 'bg-primary-50' : 'bg-red-50'
                }`}>
                  <Clock className={`h-3.5 w-3.5 ${notificationColor(n.type)}`} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-slate-700">{n.message}</p>
                  <p className="mt-0.5 text-xs text-slate-400">{n.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* ----------------------------------------------------------------- */}
      {/* Today's Timeline                                                  */}
      {/* ----------------------------------------------------------------- */}
      <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <CardContent className="p-5">
          <div className="mb-5 flex items-center gap-2">
            <Clock className="h-5 w-5 text-slate-400" />
            <h2 className="text-lg font-bold text-slate-900">Today&apos;s Timeline</h2>
          </div>

          <div className="relative ml-3">
            {todayTimeline.map((entry, i) => {
              const isLast = i === todayTimeline.length - 1;
              return (
                <div key={i} className="flex gap-4 pb-6 last:pb-0">
                  {/* Vertical line + dot */}
                  <div className="relative flex flex-col items-center">
                    {/* Dot */}
                    {entry.status === 'done' ? (
                      <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-reno-green-500">
                        <CheckCircle className="h-3 w-3 text-white" />
                      </div>
                    ) : entry.status === 'current' ? (
                      <span className="relative flex h-4 w-4 shrink-0">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-reno-green-400 opacity-75" />
                        <span className="relative inline-flex h-4 w-4 rounded-full bg-reno-green-500" />
                      </span>
                    ) : (
                      <div className="h-4 w-4 shrink-0 rounded-full border-2 border-slate-300 bg-white" />
                    )}
                    {/* Line */}
                    {!isLast && (
                      <div
                        className={`w-0.5 flex-1 ${
                          entry.status === 'done' ? 'bg-reno-green-300' : 'bg-slate-200'
                        }`}
                      />
                    )}
                  </div>

                  {/* Content */}
                  <div className="-mt-0.5 pb-2">
                    <p className={`text-sm font-semibold ${
                      entry.status === 'done'
                        ? 'text-slate-900'
                        : entry.status === 'current'
                          ? 'text-reno-green-700'
                          : 'text-slate-400'
                    }`}>
                      {entry.event}
                    </p>
                    <p className={`text-xs ${
                      entry.status === 'upcoming' ? 'text-slate-300' : 'text-slate-400'
                    }`}>
                      {entry.time}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* ----------------------------------------------------------------- */}
      {/* "Stranger Danger Eliminated" Trust Card                           */}
      {/* ----------------------------------------------------------------- */}
      <Card className="rounded-2xl border-0 bg-gradient-to-br from-primary-600 via-reno-purple-600 to-reno-purple-700 shadow-lg">
        <CardContent className="p-6 sm:p-8">
          <div className="flex items-center gap-2">
            <Lock className="h-6 w-6 text-white/90" />
            <h2 className="text-xl font-bold text-white">Stranger Danger Eliminated</h2>
          </div>

          <blockquote className="mt-4 border-l-2 border-white/30 pl-4">
            <p className="text-sm italic text-white/80">
              &ldquo;I&apos;m at work, my wife is home with the kids, and there are three guys in my basement.&rdquo;
            </p>
            <cite className="mt-1 block text-xs font-semibold text-white/60">
              — Every Homeowner, Before RenoNext
            </cite>
          </blockquote>

          <div className="mt-6 space-y-3">
            {[
              'Every worker verified with photo ID and trade license',
              'GPS geofence confirms they\'re actually at YOUR address',
              'Daily safety briefing (JSA) signed before work starts',
              'Real-time notifications when anyone arrives or leaves',
              'Roster Lock: only approved workers can access your site',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2.5">
                <CheckCircle className="mt-0.5 h-4 w-4 shrink-0 text-reno-green-300" />
                <span className="text-sm text-white/90">{item}</span>
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-xl bg-white/10 p-4 backdrop-blur-sm">
            <p className="text-sm text-white/90">
              Unlike other apps, RenoNext doesn&apos;t just introduce you to a contractor.{' '}
              <span className="font-bold text-white">
                We verify every single person who walks through your door.
              </span>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* ----------------------------------------------------------------- */}
      {/* How It Works — 3 Steps                                            */}
      {/* ----------------------------------------------------------------- */}
      <Card className="rounded-2xl border border-slate-200 bg-slate-50 shadow-none">
        <CardContent className="p-6">
          <h3 className="mb-5 text-center text-sm font-bold uppercase tracking-wider text-slate-400">
            How It Works
          </h3>
          <div className="grid gap-4 sm:grid-cols-3">
            {/* Step 1 */}
            <div className="flex flex-col items-center rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-50">
                <FileCheck className="h-6 w-6 text-primary-600" />
              </div>
              <h4 className="mt-3 text-sm font-bold text-slate-900">Roster Approved</h4>
              <p className="mt-1 text-xs text-slate-500">
                You approve the crew list before work starts
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-reno-green-50">
                <MapPin className="h-6 w-6 text-reno-green-600" />
              </div>
              <h4 className="mt-3 text-sm font-bold text-slate-900">Geofence Armed</h4>
              <p className="mt-1 text-xs text-slate-500">
                Workers can only clock in within 50m of your home
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center rounded-xl border border-slate-200 bg-white p-5 text-center shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-50">
                <Smartphone className="h-6 w-6 text-amber-600" />
              </div>
              <h4 className="mt-3 text-sm font-bold text-slate-900">You&apos;re Notified</h4>
              <p className="mt-1 text-xs text-slate-500">
                Every arrival, departure, and task update — in real-time
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
