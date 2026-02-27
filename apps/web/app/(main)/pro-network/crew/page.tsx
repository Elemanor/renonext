'use client';

import {
  Users,
  Shield,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle,
  UserX,
  Lock,
  Eye,
  FileCheck,
  ChevronRight,
  DollarSign,
  Timer,
  Bell,
  Download,
  UserPlus,
  BarChart3,
  Radio,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

// ── Types ────────────────────────────────────────────────────────────────────

interface CrewMember {
  id: string;
  name: string;
  trade: string;
  role: string;
  rate: number;
  clockedIn: string | null;
  clockedOut: string | null;
  hoursToday: number;
  gpsVerified: boolean;
  insideGeofence: boolean;
  jsaSigned: boolean;
  wsibStatus: 'valid' | 'expiring' | 'expired';
  status: 'on_site' | 'not_arrived' | 'absent';
  expectedArrival?: string;
  note?: string;
}

interface Project {
  id: string;
  name: string;
  address: string;
  status: string;
  geofenceRadius: string;
  workersOnSite: number;
  approvedRoster: number;
  crew: CrewMember[];
}

interface GhostAlert {
  id: string;
  name: string;
  attemptTime: string;
  project: string;
  reason: string;
  action: string;
}

// ── Mock Data ────────────────────────────────────────────────────────────────

const crewSummary = {
  totalWorkers: 14,
  onSiteNow: 7,
  verifiedToday: 7,
  ghostAttempts: 1,
  totalHoursToday: 42.5,
  laborCostToday: 2040,
  avgRating: 4.7,
  wsibCompliant: 13,
};

const projects: Project[] = [
  {
    id: 'proj-1',
    name: 'Condo Tower Phase 2',
    address: '200 Front St W, Toronto',
    status: 'active',
    geofenceRadius: '50m',
    workersOnSite: 4,
    approvedRoster: 6,
    crew: [
      {
        id: 'c-1',
        name: 'Marcus Johnson',
        trade: 'Electrician',
        role: 'Lead',
        rate: 48,
        clockedIn: '7:30 AM',
        clockedOut: null,
        hoursToday: 5.0,
        gpsVerified: true,
        insideGeofence: true,
        jsaSigned: true,
        wsibStatus: 'valid',
        status: 'on_site',
      },
      {
        id: 'c-2',
        name: 'Kevin Park',
        trade: 'Drywall',
        role: 'Journeyman',
        rate: 40,
        clockedIn: '7:45 AM',
        clockedOut: null,
        hoursToday: 4.75,
        gpsVerified: true,
        insideGeofence: true,
        jsaSigned: true,
        wsibStatus: 'valid',
        status: 'on_site',
      },
      {
        id: 'c-3',
        name: 'Tony Ricci',
        trade: 'HVAC',
        role: 'Lead',
        rate: 52,
        clockedIn: '8:00 AM',
        clockedOut: null,
        hoursToday: 4.5,
        gpsVerified: true,
        insideGeofence: true,
        jsaSigned: true,
        wsibStatus: 'valid',
        status: 'on_site',
      },
      {
        id: 'c-4',
        name: 'Chris Adams',
        trade: 'Drywall',
        role: 'Apprentice',
        rate: 28,
        clockedIn: '8:15 AM',
        clockedOut: null,
        hoursToday: 4.25,
        gpsVerified: true,
        insideGeofence: false,
        jsaSigned: true,
        wsibStatus: 'valid',
        status: 'on_site',
      },
      {
        id: 'c-5',
        name: 'Raj Patel',
        trade: 'Plumber',
        role: 'Journeyman',
        rate: 50,
        clockedIn: null,
        clockedOut: null,
        hoursToday: 0,
        gpsVerified: false,
        insideGeofence: false,
        jsaSigned: false,
        wsibStatus: 'valid',
        status: 'not_arrived',
        expectedArrival: '1:00 PM',
      },
      {
        id: 'c-6',
        name: 'Amy Wu',
        trade: 'Painter',
        role: 'Journeyman',
        rate: 38,
        clockedIn: null,
        clockedOut: null,
        hoursToday: 0,
        gpsVerified: false,
        insideGeofence: false,
        jsaSigned: false,
        wsibStatus: 'expiring',
        status: 'not_arrived',
        expectedArrival: '2:00 PM',
      },
    ],
  },
  {
    id: 'proj-2',
    name: 'Lakeview Townhomes',
    address: '45 Lakeshore Blvd, Mississauga',
    status: 'active',
    geofenceRadius: '75m',
    workersOnSite: 3,
    approvedRoster: 4,
    crew: [
      {
        id: 'c-7',
        name: 'Jake Torres',
        trade: 'Framer',
        role: 'Lead',
        rate: 42,
        clockedIn: '7:00 AM',
        clockedOut: null,
        hoursToday: 5.5,
        gpsVerified: true,
        insideGeofence: true,
        jsaSigned: true,
        wsibStatus: 'valid',
        status: 'on_site',
      },
      {
        id: 'c-8',
        name: 'Sarah Chen',
        trade: 'Plumber',
        role: 'Lead',
        rate: 52,
        clockedIn: '7:15 AM',
        clockedOut: null,
        hoursToday: 5.25,
        gpsVerified: true,
        insideGeofence: true,
        jsaSigned: true,
        wsibStatus: 'valid',
        status: 'on_site',
      },
      {
        id: 'c-9',
        name: 'Dmitri Volkov',
        trade: 'Concrete',
        role: 'Journeyman',
        rate: 45,
        clockedIn: '8:00 AM',
        clockedOut: null,
        hoursToday: 4.5,
        gpsVerified: true,
        insideGeofence: true,
        jsaSigned: true,
        wsibStatus: 'valid',
        status: 'on_site',
      },
      {
        id: 'c-10',
        name: 'Luis Hernandez',
        trade: 'Laborer',
        role: 'General',
        rate: 28,
        clockedIn: null,
        clockedOut: null,
        hoursToday: 0,
        gpsVerified: false,
        insideGeofence: false,
        jsaSigned: false,
        wsibStatus: 'valid',
        status: 'absent',
        note: 'Called in sick',
      },
    ],
  },
];

const ghostWorkerAlerts: GhostAlert[] = [
  {
    id: 'ghost-1',
    name: 'Unknown \u2014 "John D."',
    attemptTime: '9:30 AM',
    project: 'Condo Tower Phase 2',
    reason: 'Not on approved roster. Attempted sign-in rejected.',
    action: 'blocked',
  },
];

const billingComparison = {
  subContractor: 'ProFrame Construction',
  invoiceClaim: { workers: 4, hours: 32, total: 2688 },
  verifiedActual: { workers: 3, hours: 24.5, total: 2058 },
  discrepancy: { workers: 1, hours: 7.5, savings: 630 },
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

function getInitials(name: string): string {
  return name
    .split(' ')
    .map((n) => n[0])
    .join('');
}

function getStatusRing(member: CrewMember): string {
  if (member.status === 'absent') return 'ring-2 ring-red-400';
  if (member.status === 'not_arrived') return 'ring-2 ring-gray-300';
  if (member.status === 'on_site' && !member.insideGeofence) return 'ring-2 ring-amber-400';
  if (member.status === 'on_site' && member.insideGeofence) return 'ring-2 ring-emerald-400';
  return 'ring-2 ring-gray-300';
}

function getStatusBg(member: CrewMember): string {
  if (member.status === 'absent') return 'bg-red-100 text-red-700';
  if (member.status === 'not_arrived') return 'bg-gray-100 text-gray-600';
  if (member.status === 'on_site' && !member.insideGeofence) return 'bg-amber-100 text-amber-700';
  return 'bg-emerald-100 text-emerald-700';
}

function getWsibBadge(status: string): { label: string; classes: string } {
  if (status === 'valid') return { label: 'Valid', classes: 'bg-emerald-50 text-emerald-700' };
  if (status === 'expiring') return { label: 'Expiring', classes: 'bg-amber-50 text-amber-700' };
  return { label: 'Expired', classes: 'bg-red-50 text-red-700' };
}

// ── Main Page ────────────────────────────────────────────────────────────────

export default function CrewManagementPage() {
  const [expandedProject, setExpandedProject] = useState<string | null>('proj-1');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Crew Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            GPS-verified time logs. Zero ghost workers. Zero billing fraud.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="h-auto rounded-xl border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700"
          >
            <UserPlus className="mr-1.5 h-4 w-4" />
            Add to Roster
          </Button>
          <Button className="h-auto rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700">
            <Download className="mr-1.5 h-4 w-4" />
            Export Time Logs
          </Button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Workers On Site Now */}
        <Card className="rounded-2xl border border-gray-200 bg-white shadow-none">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-emerald-50 p-2.5">
                <Users className="h-5 w-5 text-emerald-600" />
              </div>
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
              </span>
            </div>
            <p className="mt-3 text-sm font-medium text-gray-500">Workers On Site Now</p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
              {crewSummary.onSiteNow}{' '}
              <span className="text-base font-medium text-gray-400">of {crewSummary.totalWorkers}</span>
            </p>
          </CardContent>
        </Card>

        {/* Hours Today */}
        <Card className="rounded-2xl border border-gray-200 bg-white shadow-none">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-blue-50 p-2.5">
                <Timer className="h-5 w-5 text-blue-600" />
              </div>
              <Badge className="rounded-full border-transparent bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">
                LIVE
              </Badge>
            </div>
            <p className="mt-3 text-sm font-medium text-gray-500">Hours Today</p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
              {crewSummary.totalHoursToday} hrs
            </p>
            <p className="mt-0.5 text-xs text-gray-400">
              {formatCurrency(crewSummary.laborCostToday)} labor cost
            </p>
          </CardContent>
        </Card>

        {/* Ghost Attempts Blocked */}
        <Card className="rounded-2xl border border-red-200 bg-red-50/30 shadow-none">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-red-100 p-2.5">
                <UserX className="h-5 w-5 text-red-600" />
              </div>
              {crewSummary.ghostAttempts > 0 && (
                <Badge className="rounded-full border-transparent bg-red-100 px-2 py-0.5 text-xs font-semibold text-red-700">
                  ALERT
                </Badge>
              )}
            </div>
            <p className="mt-3 text-sm font-medium text-gray-500">Ghost Attempts Blocked</p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-red-700">
              {crewSummary.ghostAttempts}
            </p>
          </CardContent>
        </Card>

        {/* WSIB Compliant */}
        <Card className="rounded-2xl border border-gray-200 bg-white shadow-none">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-emerald-50 p-2.5">
                <Shield className="h-5 w-5 text-emerald-600" />
              </div>
              <Badge className="rounded-full border-transparent bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                {Math.round((crewSummary.wsibCompliant / crewSummary.totalWorkers) * 100)}%
              </Badge>
            </div>
            <p className="mt-3 text-sm font-medium text-gray-500">WSIB Compliant</p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
              {crewSummary.wsibCompliant}
              <span className="text-base font-medium text-gray-400">/{crewSummary.totalWorkers}</span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Ghost Worker Alert */}
      {ghostWorkerAlerts.length > 0 && (
        <Card className="rounded-2xl border-2 border-red-300 bg-red-50 shadow-sm">
          <CardContent className="p-5">
            <div className="flex items-start gap-3">
              <div className="rounded-xl bg-red-100 p-2.5">
                <UserX className="h-6 w-6 text-red-600" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-red-800">GHOST WORKER BLOCKED</h3>
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-red-500" />
                  </span>
                </div>
                {ghostWorkerAlerts.map((alert) => (
                  <div key={alert.id} className="mt-2">
                    <p className="text-sm text-red-700">
                      <span className="font-semibold">&ldquo;{alert.name.replace(/.*"(.+)"/, '$1')}&rdquo;</span>{' '}
                      attempted to sign in at{' '}
                      <span className="font-semibold">{alert.project}</span> at{' '}
                      <span className="font-semibold">{alert.attemptTime}</span>.
                    </p>
                    <p className="mt-1 text-sm text-red-700">
                      This person is <span className="font-bold">NOT</span> on the approved crew roster.
                      Sign-in was <span className="font-bold">REJECTED</span>. No hours logged. No payment will be generated.
                    </p>
                  </div>
                ))}
                <div className="mt-4 flex gap-2">
                  <Button
                    variant="outline"
                    className="h-auto rounded-lg border-red-300 bg-white px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50"
                  >
                    <Eye className="mr-1 h-3.5 w-3.5" />
                    View Attempt Details
                  </Button>
                  <Button
                    variant="outline"
                    className="h-auto rounded-lg border-red-300 bg-white px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50"
                  >
                    <Bell className="mr-1 h-3.5 w-3.5" />
                    Report to Client
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Invoice Truth Detector — Billing Comparison */}
      <Card className="rounded-2xl border border-amber-300 bg-amber-50/50 shadow-sm">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-amber-100 p-2.5">
              <BarChart3 className="h-6 w-6 text-amber-700" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-base font-bold text-amber-900">
                Invoice vs. Reality &mdash; {billingComparison.subContractor}
              </h3>

              {/* Comparison Table */}
              <div className="mt-4 overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-amber-200">
                      <th className="pb-2 pr-4 text-left font-medium text-amber-700" />
                      <th className="pb-2 px-4 text-right font-medium text-amber-700">Invoice Claims</th>
                      <th className="pb-2 px-4 text-right font-medium text-emerald-700">Verified (GPS)</th>
                      <th className="pb-2 pl-4 text-right font-bold text-gray-900">You Save</th>
                    </tr>
                  </thead>
                  <tbody className="text-gray-800">
                    <tr className="border-b border-amber-100">
                      <td className="py-2.5 pr-4 font-medium text-gray-600">Workers</td>
                      <td className="py-2.5 px-4 text-right">{billingComparison.invoiceClaim.workers}</td>
                      <td className="py-2.5 px-4 text-right font-semibold text-emerald-700">
                        {billingComparison.verifiedActual.workers}
                      </td>
                      <td className="py-2.5 pl-4 text-right font-bold text-red-600">
                        -{billingComparison.discrepancy.workers} ghost
                      </td>
                    </tr>
                    <tr className="border-b border-amber-100">
                      <td className="py-2.5 pr-4 font-medium text-gray-600">Hours</td>
                      <td className="py-2.5 px-4 text-right">{billingComparison.invoiceClaim.hours} hrs</td>
                      <td className="py-2.5 px-4 text-right font-semibold text-emerald-700">
                        {billingComparison.verifiedActual.hours} hrs
                      </td>
                      <td className="py-2.5 pl-4 text-right font-bold text-red-600">
                        -{billingComparison.discrepancy.hours} hrs
                      </td>
                    </tr>
                    <tr>
                      <td className="py-2.5 pr-4 font-medium text-gray-600">Total</td>
                      <td className="py-2.5 px-4 text-right">
                        {formatCurrency(billingComparison.invoiceClaim.total)}
                      </td>
                      <td className="py-2.5 px-4 text-right font-semibold text-emerald-700">
                        {formatCurrency(billingComparison.verifiedActual.total)}
                      </td>
                      <td className="py-2.5 pl-4 text-right font-bold text-emerald-700">
                        {formatCurrency(billingComparison.discrepancy.savings)} saved
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-4 text-xs text-amber-800">
                &ldquo;ProFrame billed for 4 workers &times; 8 hours. GPS data shows only 3 workers
                arrived, and one left 1.5 hours early. Auto-corrected invoice saves you{' '}
                <span className="font-bold">{formatCurrency(billingComparison.discrepancy.savings)}</span>.&rdquo;
              </p>

              <div className="mt-4 flex gap-2">
                <Button className="h-auto rounded-xl bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700">
                  <CheckCircle className="mr-1.5 h-3.5 w-3.5" />
                  Accept Verified Amount
                </Button>
                <Button
                  variant="outline"
                  className="h-auto rounded-xl border-amber-300 px-4 py-2 text-xs font-medium text-amber-800 hover:bg-amber-100"
                >
                  <AlertTriangle className="mr-1.5 h-3.5 w-3.5" />
                  Dispute with Sub
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Per-Project Crew Sections */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-900">Active Projects</h2>

        {projects.map((project) => {
          const isExpanded = expandedProject === project.id;
          return (
            <Card key={project.id} className="rounded-2xl border border-gray-200 bg-white shadow-sm">
              {/* Project Header */}
              <button
                onClick={() => setExpandedProject(isExpanded ? null : project.id)}
                className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  <div className="rounded-xl bg-blue-50 p-2.5">
                    <MapPin className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold text-gray-900">{project.name}</h3>
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                      </span>
                      <Badge className="rounded-full border-transparent bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-700">
                        LIVE
                      </Badge>
                    </div>
                    <p className="mt-0.5 text-xs text-gray-500">{project.address}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Badge className="rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-600">
                    <Radio className="mr-1 h-3 w-3" />
                    Geofence: {project.geofenceRadius}
                  </Badge>
                  <Badge className="rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-600">
                    <Users className="mr-1 h-3 w-3" />
                    {project.workersOnSite} on site / {project.approvedRoster} approved
                  </Badge>
                  <ChevronRight
                    className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                      isExpanded ? 'rotate-90' : ''
                    }`}
                  />
                </div>
              </button>

              {/* Crew Table */}
              {isExpanded && (
                <div className="border-t border-gray-100">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-100 bg-gray-50/50">
                          <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                            Worker
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                            Trade / Role
                          </th>
                          <th className="px-3 py-3 text-left text-xs font-semibold uppercase tracking-wider text-gray-400">
                            Clock In
                          </th>
                          <th className="px-3 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-400">
                            Hours
                          </th>
                          <th className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-400">
                            GPS
                          </th>
                          <th className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-400">
                            JSA
                          </th>
                          <th className="px-3 py-3 text-center text-xs font-semibold uppercase tracking-wider text-gray-400">
                            WSIB
                          </th>
                          <th className="px-3 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-400">
                            Rate
                          </th>
                          <th className="px-5 py-3 text-right text-xs font-semibold uppercase tracking-wider text-gray-400">
                            Cost Today
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {project.crew.map((member, idx) => {
                          const wsib = getWsibBadge(member.wsibStatus);
                          const costToday = member.hoursToday * member.rate;
                          return (
                            <tr
                              key={member.id}
                              className={`border-b border-gray-50 transition-colors hover:bg-gray-50/50 ${
                                member.status === 'absent' ? 'bg-red-50/20' : ''
                              } ${idx === project.crew.length - 1 ? 'border-b-0' : ''}`}
                            >
                              {/* Worker */}
                              <td className="px-5 py-3">
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${getStatusBg(member)} ${getStatusRing(member)}`}
                                  >
                                    {getInitials(member.name)}
                                  </div>
                                  <div>
                                    <p className="font-semibold text-gray-900">{member.name}</p>
                                    {member.status === 'absent' && member.note && (
                                      <p className="text-[10px] text-red-500">{member.note}</p>
                                    )}
                                  </div>
                                </div>
                              </td>

                              {/* Trade / Role */}
                              <td className="px-3 py-3">
                                <div className="flex flex-col gap-1">
                                  <Badge className="w-fit rounded-full border border-gray-200 bg-gray-50 px-2 py-0 text-[10px] font-medium text-gray-600">
                                    {member.trade}
                                  </Badge>
                                  <span className="text-[10px] text-gray-400">{member.role}</span>
                                </div>
                              </td>

                              {/* Clock In */}
                              <td className="px-3 py-3">
                                {member.clockedIn ? (
                                  <div className="flex items-center gap-1.5">
                                    <Clock className="h-3.5 w-3.5 text-emerald-500" />
                                    <span className="font-medium text-gray-900">{member.clockedIn}</span>
                                  </div>
                                ) : member.status === 'not_arrived' && member.expectedArrival ? (
                                  <span className="text-xs text-gray-400">
                                    Expected {member.expectedArrival}
                                  </span>
                                ) : member.status === 'absent' ? (
                                  <span className="text-xs font-medium text-red-500">Absent</span>
                                ) : (
                                  <span className="text-xs text-gray-300">&mdash;</span>
                                )}
                              </td>

                              {/* Hours */}
                              <td className="px-3 py-3 text-right">
                                <span
                                  className={`font-semibold ${
                                    member.hoursToday > 0 ? 'text-gray-900' : 'text-gray-300'
                                  }`}
                                >
                                  {member.hoursToday > 0 ? `${member.hoursToday}` : '\u2014'}
                                </span>
                              </td>

                              {/* GPS */}
                              <td className="px-3 py-3 text-center">
                                {member.gpsVerified && member.insideGeofence ? (
                                  <div className="flex items-center justify-center gap-1">
                                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                                    <span className="text-[10px] text-emerald-600">Verified</span>
                                  </div>
                                ) : member.gpsVerified && !member.insideGeofence ? (
                                  <div className="flex items-center justify-center gap-1">
                                    <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
                                    <span className="text-[10px] text-amber-600">Outside</span>
                                  </div>
                                ) : (
                                  <span className="text-xs text-gray-300">&mdash;</span>
                                )}
                              </td>

                              {/* JSA */}
                              <td className="px-3 py-3 text-center">
                                {member.jsaSigned ? (
                                  <div className="flex items-center justify-center gap-1">
                                    <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                                    <span className="text-[10px] text-emerald-600">Signed</span>
                                  </div>
                                ) : member.status === 'on_site' ? (
                                  <div className="flex items-center justify-center gap-1">
                                    <AlertTriangle className="h-3.5 w-3.5 text-red-500" />
                                    <span className="text-[10px] text-red-600">Missing</span>
                                  </div>
                                ) : (
                                  <span className="text-xs text-gray-300">&mdash;</span>
                                )}
                              </td>

                              {/* WSIB */}
                              <td className="px-3 py-3 text-center">
                                <Badge
                                  className={`rounded-full border-transparent px-2 py-0 text-[10px] font-semibold ${wsib.classes}`}
                                >
                                  {wsib.label}
                                </Badge>
                              </td>

                              {/* Rate */}
                              <td className="px-3 py-3 text-right">
                                <span className="text-xs text-gray-500">
                                  ${member.rate}/hr
                                </span>
                              </td>

                              {/* Cost Today */}
                              <td className="px-5 py-3 text-right">
                                <span
                                  className={`font-semibold ${
                                    costToday > 0 ? 'text-gray-900' : 'text-gray-300'
                                  }`}
                                >
                                  {costToday > 0 ? formatCurrency(costToday) : '\u2014'}
                                </span>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Project Footer Summary */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 bg-gray-50/50 px-5 py-3">
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Users className="h-3.5 w-3.5" />
                        {project.workersOnSite} on site
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3.5 w-3.5" />
                        {project.crew.reduce((sum, m) => sum + m.hoursToday, 0)} hrs total
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm">
                      <DollarSign className="h-3.5 w-3.5 text-gray-400" />
                      <span className="text-gray-500">Project cost today:</span>
                      <span className="font-bold text-gray-900">
                        {formatCurrency(
                          project.crew.reduce((sum, m) => sum + m.hoursToday * m.rate, 0)
                        )}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          );
        })}
      </div>

      {/* Anti-Subcontracting Lock */}
      <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-gray-100 p-3">
              <Lock className="h-6 w-6 text-gray-700" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-bold text-gray-900">The Anti-Subcontracting Lock</h3>
              <p className="mt-2 text-sm text-gray-600">
                You hire ABC Plumbing. But ABC secretly sends a cheaper, unqualified crew.
                With RenoNext&apos;s Roster Lock, that&apos;s impossible.
              </p>

              <div className="mt-5 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  How it works
                </h4>
                {[
                  {
                    step: '1',
                    text: 'You approve the crew roster before work starts',
                  },
                  {
                    step: '2',
                    text: 'Only approved workers can clock in via the geofenced app',
                  },
                  {
                    step: '3',
                    text: 'Unknown workers are automatically blocked',
                  },
                  {
                    step: '4',
                    text: 'You AND the client get instant alerts',
                  },
                ].map((item) => (
                  <div key={item.step} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-xs font-bold text-emerald-700">
                      {item.step}
                    </div>
                    <p className="text-sm text-gray-700">{item.text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-xl bg-emerald-50 px-4 py-3">
                <p className="text-sm font-semibold text-emerald-800">
                  Result: The team you hired is the team that shows up. Every time.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Digital JSA Section */}
      <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="rounded-xl bg-blue-50 p-3">
              <FileCheck className="h-6 w-6 text-blue-600" />
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="text-lg font-bold text-gray-900">
                Digital JSA &mdash; Safety Before the Clock Starts
              </h3>
              <p className="mt-2 text-sm text-gray-600">
                Every worker must sign a daily Job Safety Analysis on their phone before their clock
                starts. No signature = no hours logged = no pay.
              </p>

              <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Today&apos;s JSA Status
                </h4>
                <div className="mt-2 flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-emerald-500" />
                  <span className="text-sm font-semibold text-emerald-800">
                    7 of 7 active workers signed
                  </span>
                </div>
                <p className="mt-1 text-xs text-emerald-600">
                  Last signed: Jake Torres at 8:16 AM
                </p>
              </div>

              <p className="mt-4 text-sm text-gray-600">
                If an accident happens, you have a timestamped digital signature from that specific
                worker acknowledging the hazards. This is bulletproof liability protection.
              </p>

              <div className="mt-4 flex gap-2">
                <Button
                  variant="outline"
                  className="h-auto rounded-xl border-gray-200 px-4 py-2 text-xs font-medium text-gray-700"
                >
                  <Eye className="mr-1.5 h-3.5 w-3.5" />
                  View Today&apos;s JSA
                </Button>
                <Button
                  variant="outline"
                  className="h-auto rounded-xl border-gray-200 px-4 py-2 text-xs font-medium text-gray-700"
                >
                  <Download className="mr-1.5 h-3.5 w-3.5" />
                  Download Safety Report
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Bottom Stats — What This Feature Saves You */}
      <Card className="rounded-2xl border border-gray-200 bg-gray-50/50 shadow-none">
        <CardContent className="p-6">
          <h3 className="mb-5 text-center text-base font-bold text-gray-900">
            What This Feature Saves You
          </h3>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-100">
                <DollarSign className="h-6 w-6 text-emerald-600" />
              </div>
              <p className="mt-3 text-lg font-bold text-gray-900">10-15%</p>
              <p className="text-sm font-semibold text-gray-700">Labor Cost Savings</p>
              <p className="mt-1 text-xs text-gray-500">
                Eliminate time theft and ghost workers
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100">
                <FileCheck className="h-6 w-6 text-blue-600" />
              </div>
              <p className="mt-3 text-lg font-bold text-gray-900">100%</p>
              <p className="text-sm font-semibold text-gray-700">JSA Compliance</p>
              <p className="mt-1 text-xs text-gray-500">
                Every worker signs before every shift
              </p>
            </div>
            <div className="text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100">
                <Shield className="h-6 w-6 text-violet-600" />
              </div>
              <p className="mt-3 text-lg font-bold text-gray-900">Zero</p>
              <p className="text-sm font-semibold text-gray-700">Liability Gaps</p>
              <p className="mt-1 text-xs text-gray-500">
                Digital proof of who was on site, when
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
