'use client';

import {
  DollarSign,
  Briefcase,
  Star,
  Clock,
  ArrowRight,
  CheckCircle,
  MessageSquare,
  Calendar,
  MapPin,
  AlertTriangle,
  FileCheck,
  TrendingUp,
  Building2,
  Hammer,
  ChevronRight,
  Shield,
} from 'lucide-react';
import { StatsCard } from '@/components/stats-card';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { WebAreaChart } from '@/components/charts/area-chart';
import { CHART_COLORS } from '@renonext/shared/utils/chart-theme';
import { cn } from '@/lib/utils';

// Mock Data
const stats = [
  {
    icon: DollarSign,
    label: 'Total Earnings',
    value: '$24,350',
    trend: { value: 12, isPositive: true },
    iconColor: 'text-green-600',
    iconBg: 'bg-green-50',
  },
  {
    icon: Briefcase,
    label: 'Active Jobs',
    value: '3',
    trend: { value: 8, isPositive: true },
    iconColor: 'text-reno-green-dark',
    iconBg: 'bg-reno-green-light',
  },
  {
    icon: Star,
    label: 'Average Rating',
    value: '4.9',
    trend: { value: 2, isPositive: true },
    iconColor: 'text-amber-600',
    iconBg: 'bg-amber-50',
  },
  {
    icon: Clock,
    label: 'Avg Response',
    value: '28 min',
    trend: { value: 5, isPositive: true },
    iconColor: 'text-purple-600',
    iconBg: 'bg-purple-50',
  },
];

const activeProjects = [
  {
    id: '1',
    name: 'Pipe Burst Repair',
    address: '321 Yonge St',
    milestone: 'Replace pipe section',
    progress: 65,
    nextPayout: 425,
    payoutStatus: 'Pending' as const,
  },
  {
    id: '2',
    name: 'Bedroom Painting',
    address: '789 Dundas St W',
    milestone: 'Wall prep',
    progress: 20,
    nextPayout: 260,
    payoutStatus: 'Pending' as const,
  },
  {
    id: '3',
    name: 'Panel Upgrade',
    address: '100 College St',
    milestone: 'Rough-in complete',
    progress: 80,
    nextPayout: 680,
    payoutStatus: 'Released' as const,
  },
];

const incomingTenders = [
  {
    id: '1',
    title: 'Basement Waterproofing',
    project: 'Full foundation seal',
    budgetRange: '$8,500 - $12,000',
    daysRemaining: 2,
  },
  {
    id: '2',
    title: 'Kitchen Renovation',
    project: 'Complete kitchen remodel',
    budgetRange: '$28,000 - $35,000',
    daysRemaining: 5,
  },
  {
    id: '3',
    title: 'Deck Rebuild',
    project: 'Cedar deck with railings',
    budgetRange: '$6,200 - $8,500',
    daysRemaining: 7,
  },
];

const financialSummary = [
  {
    icon: DollarSign,
    label: 'Escrow Balance',
    value: '$12,450',
    description: 'Funds held for active projects',
    iconColor: 'text-reno-teal',
    iconBg: 'bg-reno-teal-light',
  },
  {
    icon: TrendingUp,
    label: 'Released This Month',
    value: '$8,200',
    description: 'Paid out in February',
    iconColor: 'text-green-600',
    iconBg: 'bg-green-50',
  },
  {
    icon: Clock,
    label: 'Pending Payouts',
    value: '$1,365',
    description: 'Awaiting milestone approval',
    iconColor: 'text-amber-600',
    iconBg: 'bg-amber-50',
  },
  {
    icon: Calendar,
    label: 'Projected This Quarter',
    value: '$28,000',
    description: 'Based on active contracts',
    iconColor: 'text-reno-purple',
    iconBg: 'bg-reno-purple-light',
  },
];

const upcomingInspections = [
  {
    id: '1',
    type: 'Plumbing Rough-in',
    date: 'Feb 12 at 10 AM',
    address: '321 Yonge St',
    status: 'Scheduled' as const,
  },
  {
    id: '2',
    type: 'Electrical Final',
    date: 'Feb 15 at 2 PM',
    address: '100 College St',
    status: 'Pending' as const,
  },
  {
    id: '3',
    type: 'Framing',
    date: 'Feb 18 at 9 AM',
    address: '42 Lakeshore Blvd',
    status: 'Requested' as const,
  },
];

const certifications = [
  {
    id: '1',
    name: 'WHMIS',
    expiryDate: '2026-01-10',
    daysRemaining: -48,
    status: 'expired' as const,
  },
  {
    id: '2',
    name: 'WSIB',
    expiryDate: '2026-06-01',
    daysRemaining: 93,
    status: 'warning' as const,
  },
  {
    id: '3',
    name: 'General Contractor License',
    expiryDate: '2026-06-01',
    daysRemaining: 93,
    status: 'warning' as const,
  },
  {
    id: '4',
    name: 'Working at Heights',
    expiryDate: '2028-03-01',
    daysRemaining: 732,
    status: 'ok' as const,
  },
];

const earningsLast30Days = [
  { day: 'Feb 14', amount: 0 }, { day: 'Feb 16', amount: 250 }, { day: 'Feb 18', amount: 250 },
  { day: 'Feb 20', amount: 450 }, { day: 'Feb 22', amount: 800 }, { day: 'Feb 24', amount: 800 },
  { day: 'Feb 26', amount: 1100 }, { day: 'Feb 28', amount: 1550 }, { day: 'Mar 2', amount: 1550 },
  { day: 'Mar 4', amount: 2000 }, { day: 'Mar 6', amount: 2380 }, { day: 'Mar 8', amount: 2780 },
  { day: 'Mar 10', amount: 3000 }, { day: 'Mar 12', amount: 3280 },
];

const recentActivity = [
  {
    id: '1',
    type: 'bid_accepted',
    icon: CheckCircle,
    iconColor: 'text-green-500',
    iconBg: 'bg-green-50',
    title: 'Bid accepted for "Kitchen faucet repair"',
    time: '2 hours ago',
  },
  {
    id: '2',
    type: 'new_message',
    icon: MessageSquare,
    iconColor: 'text-blue-500',
    iconBg: 'bg-blue-50',
    title: 'New message from John Smith about Panel Upgrade',
    time: '4 hours ago',
  },
  {
    id: '3',
    type: 'new_review',
    icon: Star,
    iconColor: 'text-amber-500',
    iconBg: 'bg-amber-50',
    title: 'New 5-star review from Jennifer S.',
    time: '1 day ago',
  },
  {
    id: '4',
    type: 'payment',
    icon: DollarSign,
    iconColor: 'text-green-500',
    iconBg: 'bg-green-50',
    title: 'Payment of $450 received for "Bathroom rewiring"',
    time: '2 days ago',
  },
];

function getPayoutStatusBadge(status: 'Pending' | 'Released' | 'Held') {
  const styles = {
    Pending: 'bg-amber-50 text-amber-700 border-amber-200',
    Released: 'bg-green-50 text-green-700 border-green-200',
    Held: 'bg-red-50 text-red-700 border-red-200',
  };
  return styles[status];
}

function getInspectionStatusBadge(status: 'Scheduled' | 'Pending' | 'Requested') {
  const styles = {
    Scheduled: 'bg-green-50 text-green-700 border-green-200',
    Pending: 'bg-amber-50 text-amber-700 border-amber-200',
    Requested: 'bg-blue-50 text-blue-700 border-blue-200',
  };
  return styles[status];
}

function getCertStatusBadge(status: 'expired' | 'warning' | 'ok') {
  const styles = {
    expired: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', label: 'EXPIRED' },
    warning: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', label: '' },
    ok: { bg: 'bg-green-50', text: 'text-green-700', border: 'border-green-200', label: 'OK' },
  };
  return styles[status];
}

export default function ProDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        <Button asChild variant="link" className="flex items-center gap-1.5 text-sm font-semibold text-reno-green-dark transition-colors duration-200 hover:text-reno-green-dark no-underline hover:no-underline">
          <Link href="/pro-dashboard/find-jobs">
            View Available Jobs <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* S1: Active Projects Strip */}
      <div>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Active Projects</h2>
          <Button asChild variant="link" className="text-sm font-semibold text-reno-green-dark transition-colors duration-200 hover:text-reno-green-dark no-underline hover:no-underline p-0 h-auto">
            <Link href="/pro-dashboard/jobs">View All</Link>
          </Button>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {activeProjects.map((project) => (
            <Link
              key={project.id}
              href={`/pro-dashboard/jobs/${project.id}`}
              className="block min-w-[320px] flex-shrink-0"
            >
              <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:border-reno-green-dark/20">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between mb-3">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-gray-900 truncate">{project.name}</h3>
                      <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                        <MapPin className="h-3.5 w-3.5" />
                        {project.address}
                      </p>
                    </div>
                    <Building2 className="h-5 w-5 text-gray-400 flex-shrink-0 ml-2" />
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex items-center justify-between text-sm mb-1.5">
                        <span className="text-gray-600 font-medium">{project.milestone}</span>
                        <span className="text-gray-900 font-semibold">{project.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-reno-green to-reno-teal rounded-full transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <div>
                        <p className="text-xs text-gray-500 mb-0.5">Next Payout</p>
                        <p className="text-lg font-bold text-gray-900">
                          ${project.nextPayout.toLocaleString()}
                        </p>
                      </div>
                      <Badge
                        className={cn(
                          'border rounded-full px-3 py-1 text-xs font-semibold',
                          getPayoutStatusBadge(project.payoutStatus)
                        )}
                      >
                        {project.payoutStatus}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* S2: Incoming Tenders Preview */}
      <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold text-gray-900">
              Incoming Tenders
            </CardTitle>
            <Button asChild variant="link" className="text-sm font-semibold text-reno-green-dark transition-colors duration-200 hover:text-reno-green-dark no-underline hover:no-underline p-0 h-auto">
              <Link href="/pro-network/tenders">View All</Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-3">
            {incomingTenders.map((tender) => (
              <Card
                key={tender.id}
                className="rounded-xl border border-gray-200 shadow-none transition-all duration-200 hover:bg-gray-50 hover:shadow-sm"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <Hammer className="h-5 w-5 text-reno-green-dark flex-shrink-0" />
                    <Badge className="bg-reno-purple-light text-reno-purple border-0 rounded-full px-2.5 py-0.5 text-xs font-semibold">
                      {tender.daysRemaining}d left
                    </Badge>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{tender.title}</h3>
                  <p className="text-sm text-gray-600 mb-2">{tender.project}</p>
                  <p className="text-sm font-semibold text-reno-green-dark mb-3">
                    {tender.budgetRange}
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="w-full rounded-xl border-gray-300 hover:border-reno-green-dark hover:bg-reno-green-light hover:text-reno-green-dark"
                  >
                    <Link href={`/pro-network/tenders/${tender.id}`}>
                      View Details
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* S3: Financial Summary Strip */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {financialSummary.map((item) => (
          <Card
            key={item.label}
            className="rounded-2xl border border-gray-200 bg-white shadow-none transition-all duration-200 hover:shadow-md"
          >
            <CardContent className="p-6">
              <div className={`inline-flex rounded-xl p-2.5 ${item.iconBg} mb-3`}>
                <item.icon className={`h-5 w-5 ${item.iconColor}`} />
              </div>
              <p className="text-sm font-medium text-gray-500 mb-1">{item.label}</p>
              <p className="text-2xl font-bold tracking-tight text-gray-900 mb-1">
                {item.value}
              </p>
              <p className="text-xs text-gray-400">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* S4: Upcoming Inspections */}
      <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <FileCheck className="h-5 w-5 text-reno-green-dark" />
            Upcoming Inspections
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingInspections.map((inspection) => (
              <div
                key={inspection.id}
                className="flex items-center justify-between p-4 rounded-xl border border-gray-200 transition-all duration-200 hover:bg-gray-50"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold text-gray-900">{inspection.type}</h3>
                    <Badge
                      className={cn(
                        'border rounded-full px-2.5 py-0.5 text-xs font-semibold',
                        getInspectionStatusBadge(inspection.status)
                      )}
                    >
                      {inspection.status}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      {inspection.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      {inspection.address}
                    </span>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400 flex-shrink-0 ml-4" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* S5: Certification & License Expiry Alerts */}
      <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Shield className="h-5 w-5 text-reno-green-dark" />
            Certifications & Licenses
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-2">
            {certifications.map((cert) => {
              const statusStyle = getCertStatusBadge(cert.status);
              return (
                <div
                  key={cert.id}
                  className="flex items-center justify-between p-4 rounded-xl border border-gray-200 transition-all duration-200 hover:bg-gray-50"
                >
                  <div className="flex-1 min-w-0 mr-3">
                    <h3 className="font-semibold text-gray-900 mb-1">{cert.name}</h3>
                    <p className="text-sm text-gray-600">
                      Expires {new Date(cert.expiryDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      {cert.status === 'expired' && (
                        <Badge
                          className={cn(
                            'border rounded-full px-2.5 py-0.5 text-xs font-semibold',
                            statusStyle.bg,
                            statusStyle.text,
                            statusStyle.border
                          )}
                        >
                          <AlertTriangle className="h-3 w-3 mr-1 inline" />
                          {statusStyle.label}
                        </Badge>
                      )}
                      {cert.status === 'warning' && (
                        <Badge
                          className={cn(
                            'border rounded-full px-2.5 py-0.5 text-xs font-semibold',
                            statusStyle.bg,
                            statusStyle.text,
                            statusStyle.border
                          )}
                        >
                          {cert.daysRemaining} days
                        </Badge>
                      )}
                      {cert.status === 'ok' && (
                        <Badge
                          className={cn(
                            'border rounded-full px-2.5 py-0.5 text-xs font-semibold',
                            statusStyle.bg,
                            statusStyle.text,
                            statusStyle.border
                          )}
                        >
                          <CheckCircle className="h-3 w-3 mr-1 inline" />
                          {statusStyle.label}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    className={cn(
                      'rounded-xl border-gray-300 hover:border-reno-green-dark hover:bg-reno-green-light hover:text-reno-green-dark flex-shrink-0',
                      cert.status === 'expired' && 'border-red-300 bg-red-50 text-red-700 hover:bg-red-100 hover:border-red-400'
                    )}
                  >
                    Renew
                  </Button>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* S6: Existing Elements - 30-Day Earnings Chart */}
      <WebAreaChart
        title="30-Day Earnings"
        data={earningsLast30Days}
        xKey="day"
        yKeys={['amount']}
        height={200}
        colors={[CHART_COLORS.primary]}
        gradient
        formatter={(v) => `$${Number(v).toLocaleString()}`}
        ariaLabel="Cumulative earnings over the last 30 days"
      />

      {/* S6: Existing Elements - Recent Activity */}
      <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold text-gray-900">
            Recent Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-start gap-3 rounded-xl p-2.5 transition-all duration-200 hover:bg-gray-50"
              >
                <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${activity.iconBg}`}>
                  <activity.icon
                    className={`h-4 w-4 ${activity.iconColor}`}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm text-gray-900">{activity.title}</p>
                  <p className="text-xs text-gray-400">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
