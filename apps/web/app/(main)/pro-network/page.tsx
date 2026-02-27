'use client';

import { useState } from 'react';
import {
  ClipboardList,
  DollarSign,
  Users,
  Shield,
  ArrowRight,
  CheckCircle,
  Clock,
  AlertTriangle,
  Star,
  TrendingUp,
  Building2,
  FileText,
  Banknote,
  Eye,
  HardHat,
} from 'lucide-react';
import { StatsCard } from '@/components/stats-card';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { WebAreaChart } from '@/components/charts/area-chart';
import { WebPieChart } from '@/components/charts/pie-chart';
import { WebBarChart } from '@/components/charts/bar-chart';

const stats = [
  {
    icon: ClipboardList,
    label: 'Active Tenders',
    value: '6',
    trend: { value: 20, isPositive: true },
    iconColor: 'text-violet-600',
    iconBg: 'bg-violet-50',
  },
  {
    icon: Users,
    label: 'Verified Subs',
    value: '42',
    trend: { value: 15, isPositive: true },
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50',
  },
  {
    icon: DollarSign,
    label: 'Total Contract Value',
    value: '$284K',
    trend: { value: 32, isPositive: true },
    iconColor: 'text-emerald-600',
    iconBg: 'bg-emerald-50',
  },
  {
    icon: Shield,
    label: 'Compliance Rate',
    value: '94%',
    trend: { value: 3, isPositive: true },
    iconColor: 'text-amber-600',
    iconBg: 'bg-amber-50',
  },
];

const bidVolumeTrend = [
  { week: 'W1', bids: 2 }, { week: 'W2', bids: 4 }, { week: 'W3', bids: 3 },
  { week: 'W4', bids: 6 }, { week: 'W5', bids: 5 }, { week: 'W6', bids: 8 },
  { week: 'W7', bids: 7 }, { week: 'W8', bids: 10 },
];

const compliancePie = [
  { name: 'Compliant', value: 94, color: '#10b981' },
  { name: 'Non-compliant', value: 6, color: '#ef4444' },
];

const contractValueByMonth = [
  { month: 'Jul', value: 42000 },
  { month: 'Aug', value: 38000 },
  { month: 'Sep', value: 55000 },
  { month: 'Oct', value: 61000 },
  { month: 'Nov', value: 48000 },
  { month: 'Dec', value: 40000 },
];

const activeTenders = [
  {
    id: 't-1',
    title: 'Drywall — 5,000 sq ft Board & Tape',
    project: 'Condo Tower Phase 2',
    bidsReceived: 3,
    bidsTarget: 5,
    closesIn: '3 days',
    topBid: '$18,500',
    status: 'open',
  },
  {
    id: 't-2',
    title: 'Electrical Rough-In — 24 Units',
    project: 'Lakeview Townhomes',
    bidsReceived: 5,
    bidsTarget: 5,
    closesIn: '1 day',
    topBid: '$34,200',
    status: 'closing',
  },
  {
    id: 't-3',
    title: 'Foundation Drain Tile — 400 LF',
    project: '88 King St Retrofit',
    bidsReceived: 2,
    bidsTarget: 4,
    closesIn: '5 days',
    topBid: '$12,800',
    status: 'open',
  },
];

const complianceAlerts = [
  {
    id: 'ca-1',
    type: 'expired',
    icon: AlertTriangle,
    iconColor: 'text-red-500',
    iconBg: 'bg-red-50',
    title: 'FastFinish Ltd. — WSIB clearance expired Jan 30',
    action: 'Payment blocked automatically',
  },
  {
    id: 'ca-2',
    type: 'expiring',
    icon: Clock,
    iconColor: 'text-amber-500',
    iconBg: 'bg-amber-50',
    title: 'Toronto Glazing Co. — WSIB expires in 14 days',
    action: 'Renewal reminder sent',
  },
  {
    id: 'ca-3',
    type: 'verified',
    icon: CheckCircle,
    iconColor: 'text-emerald-500',
    iconBg: 'bg-emerald-50',
    title: 'ProWall Inc. — all certifications current',
    action: 'Last verified 2 days ago',
  },
];

const recentBids = [
  {
    id: 'b-1',
    sub: 'ProWall Inc.',
    tender: 'Drywall — 5,000 sq ft',
    amount: '$18,500',
    crew: '8 workers',
    rating: 4.9,
    wsib: true,
    time: '2 hours ago',
  },
  {
    id: 'b-2',
    sub: 'GTA Drywall Co.',
    tender: 'Drywall — 5,000 sq ft',
    amount: '$21,200',
    crew: '5 workers',
    rating: 4.7,
    wsib: true,
    time: '5 hours ago',
  },
  {
    id: 'b-3',
    sub: 'Spark Electric',
    tender: 'Electrical Rough-In',
    amount: '$34,200',
    crew: '6 workers',
    rating: 4.8,
    wsib: true,
    time: '8 hours ago',
  },
  {
    id: 'b-4',
    sub: 'FastFinish Ltd.',
    tender: 'Drywall — 5,000 sq ft',
    amount: '$16,800',
    crew: '3 workers',
    rating: 4.5,
    wsib: false,
    time: '1 day ago',
  },
];

const mockSafetyGate = [
  { name: 'Mike Rodriguez', trade: 'Electrician', site: 'Condo Tower Phase 2', checkedIn: '7:30 AM', jsa: 'signed' as const, wsib: true },
  { name: 'James Chen', trade: 'Drywall', site: 'Condo Tower Phase 2', checkedIn: '7:15 AM', jsa: 'signed' as const, wsib: true },
  { name: 'Sarah Williams', trade: 'Painter', site: 'Lakeview Townhomes', checkedIn: '8:00 AM', jsa: 'pending' as const, wsib: true },
  { name: 'Tom Martinez', trade: 'Plumber', site: 'Lakeview Townhomes', checkedIn: '8:30 AM', jsa: 'overdue' as const, wsib: false },
];

const mockProjectPL = [
  { name: 'Condo Tower Phase 2', progress: 68, budget: 284000, spent: 192000, margin: 18.2, escrow: 85000 },
  { name: 'Lakeview Townhomes', progress: 45, budget: 156000, spent: 78000, margin: 12.5, escrow: 46800 },
  { name: '88 King St Retrofit', progress: 82, budget: 95000, spent: 89000, margin: 4.2, escrow: 5700 },
];

export default function ProNetworkDashboard() {
  const [safetyTab, setSafetyTab] = useState<'gate' | 'alerts'>('gate');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            GC Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage tenders, sub-trades, and compliance
          </p>
        </div>
        <Button
          asChild
          className="rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-violet-700 hover:shadow-md h-auto"
        >
          <Link href="/pro-network/tenders">
            <ClipboardList className="mr-1.5 h-4 w-4" />
            Post New Tender
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatsCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 lg:grid-cols-3">
        <WebAreaChart
          title="Bid Volume (8 weeks)"
          data={bidVolumeTrend}
          xKey="week"
          yKeys={['bids']}
          height={160}
          colors={['#8b5cf6']}
          gradient
          formatter={(v) => `${v} bids`}
          ariaLabel="Bid volume trend over 8 weeks"
        />
        <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-gray-900">Compliance Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <WebPieChart data={compliancePie} height={120} donut innerLabel="94%" />
          </CardContent>
        </Card>
        <WebBarChart
          title="Contract Value (6 mo)"
          data={contractValueByMonth}
          xKey="month"
          yKeys={['value']}
          height={160}
          layout="horizontal"
          colors={['#8b5cf6']}
          formatter={(v) => `$${(Number(v) / 1000).toFixed(0)}K`}
          ariaLabel="Contract value by month"
        />
      </div>

      {/* Active Tenders Quick View */}
      <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold text-gray-900">
              Active Tenders
            </CardTitle>
            <Button
              asChild
              variant="link"
              className="h-auto p-0 text-sm font-semibold text-violet-600 no-underline transition-colors duration-200 hover:text-violet-700 hover:no-underline"
            >
              <Link href="/pro-network/tenders">
                View All <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {activeTenders.map((tender) => (
              <div
                key={tender.id}
                className="flex items-center gap-4 rounded-xl border border-gray-200 p-4 transition-all duration-200 hover:border-violet-200 hover:bg-violet-50/30"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-violet-100">
                  <ClipboardList className="h-5 w-5 text-violet-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900">{tender.title}</p>
                  <p className="text-xs text-gray-500">{tender.project}</p>
                </div>
                <div className="hidden items-center gap-3 sm:flex">
                  <div className="text-center">
                    <p className="text-sm font-bold text-gray-900">
                      {tender.bidsReceived}/{tender.bidsTarget}
                    </p>
                    <p className="text-[10px] text-gray-500">bids</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm font-bold text-emerald-600">
                      {tender.topBid}
                    </p>
                    <p className="text-[10px] text-gray-500">top bid</p>
                  </div>
                </div>
                <Badge
                  className={`shrink-0 rounded-full border-transparent px-2.5 py-0.5 text-[10px] font-semibold ${
                    tender.status === 'closing'
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-emerald-50 text-emerald-700'
                  }`}
                >
                  {tender.status === 'closing'
                    ? `Closes in ${tender.closesIn}`
                    : `${tender.closesIn} left`}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Live P&L Widget */}
        <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2 text-lg font-bold text-gray-900">
                <TrendingUp className="h-5 w-5 text-violet-600" />
                Project P&L — Live
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockProjectPL.map((project) => (
                <div key={project.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold text-gray-900 truncate">{project.name}</p>
                    <Badge
                      className={`shrink-0 rounded-full border-transparent px-2 py-0.5 text-[10px] font-bold ${
                        project.margin >= 15
                          ? 'bg-emerald-50 text-emerald-700'
                          : project.margin >= 5
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-red-50 text-red-700'
                      }`}
                    >
                      {project.margin}% margin
                    </Badge>
                  </div>
                  <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        project.margin >= 15
                          ? 'bg-emerald-500'
                          : project.margin >= 5
                            ? 'bg-amber-500'
                            : 'bg-red-500'
                      }`}
                      style={{ width: `${project.progress}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[10px] text-gray-500">
                    <span>Escrow: ${(project.escrow / 1000).toFixed(1)}K</span>
                    <span>${(project.spent / 1000).toFixed(0)}K / ${(project.budget / 1000).toFixed(0)}K budget</span>
                  </div>
                </div>
              ))}
            </div>
            <Link
              href="/pro-network/financials"
              className="mt-4 flex items-center gap-1 text-sm font-semibold text-violet-600 transition-colors hover:text-violet-700"
            >
              View Full P&L <ArrowRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>

        {/* Incoming Bids */}
        <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-bold text-gray-900">
              Incoming Bids
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentBids.map((bid) => (
                <div
                  key={bid.id}
                  className={`rounded-xl border p-3 transition-all duration-200 ${
                    bid.wsib
                      ? 'border-gray-200 hover:bg-gray-50'
                      : 'border-red-200 bg-red-50/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-gray-900">
                          {bid.sub}
                        </p>
                        {bid.wsib ? (
                          <Badge className="rounded-full border-transparent bg-emerald-50 px-1.5 py-0 text-[8px] font-bold text-emerald-700">
                            WSIB OK
                          </Badge>
                        ) : (
                          <Badge className="rounded-full border-transparent bg-red-100 px-1.5 py-0 text-[8px] font-bold text-red-700">
                            WSIB EXPIRED
                          </Badge>
                        )}
                      </div>
                      <div className="mt-1 flex items-center gap-2 text-xs text-gray-500">
                        <span>{bid.crew}</span>
                        <span>|</span>
                        <div className="flex items-center gap-0.5">
                          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                          <span>{bid.rating}</span>
                        </div>
                        <span>|</span>
                        <span>{bid.time}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-base font-bold text-gray-900">
                        {bid.amount}
                      </p>
                      <p className="text-[10px] text-gray-500">
                        {bid.tender}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Safety Gate / Compliance Alerts — Tabbed */}
        <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex gap-1 rounded-lg bg-gray-100 p-0.5">
                <button
                  onClick={() => setSafetyTab('gate')}
                  className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                    safetyTab === 'gate'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Safety Gate
                </button>
                <button
                  onClick={() => setSafetyTab('alerts')}
                  className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${
                    safetyTab === 'alerts'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  Compliance
                </button>
              </div>
              {safetyTab === 'gate' && (
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-bold text-emerald-600">LIVE</span>
                </div>
              )}
              {safetyTab === 'alerts' && (
                <Button
                  asChild
                  variant="link"
                  className="h-auto p-0 text-sm font-semibold text-violet-600 no-underline transition-colors duration-200 hover:text-violet-700 hover:no-underline"
                >
                  <Link href="/pro-network/compliance">
                    View All <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            {safetyTab === 'gate' ? (
              <div className="space-y-3">
                {mockSafetyGate.map((worker) => (
                  <div
                    key={worker.name}
                    className="flex items-center gap-3 rounded-xl border border-gray-200 p-3 transition-all duration-200 hover:bg-gray-50"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-100">
                      <HardHat className="h-4 w-4 text-slate-600" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-gray-900 truncate">{worker.name}</p>
                        <Badge className="shrink-0 rounded-full border-transparent bg-slate-100 px-1.5 py-0 text-[9px] font-semibold text-slate-600">
                          {worker.trade}
                        </Badge>
                      </div>
                      <p className="text-[10px] text-gray-500">{worker.site} · In at {worker.checkedIn}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-1.5">
                      <Badge
                        className={`rounded-full border-transparent px-1.5 py-0 text-[8px] font-bold ${
                          worker.jsa === 'signed'
                            ? 'bg-emerald-50 text-emerald-700'
                            : worker.jsa === 'pending'
                              ? 'bg-amber-50 text-amber-700'
                              : 'bg-red-50 text-red-700'
                        }`}
                      >
                        JSA {worker.jsa === 'signed' ? '✓' : worker.jsa === 'pending' ? '⚠' : '✕'}
                      </Badge>
                      <Badge
                        className={`rounded-full border-transparent px-1.5 py-0 text-[8px] font-bold ${
                          worker.wsib
                            ? 'bg-emerald-50 text-emerald-700'
                            : 'bg-red-50 text-red-700'
                        }`}
                      >
                        WSIB {worker.wsib ? '✓' : '✕'}
                      </Badge>
                    </div>
                  </div>
                ))}
                <div className="rounded-xl bg-gray-50 p-3">
                  <p className="text-xs text-gray-500">
                    <span className="font-semibold text-gray-700">12 workers</span> across <span className="font-semibold text-gray-700">3 sites</span> · <span className="font-semibold text-emerald-600">92% JSA compliance</span>
                  </p>
                </div>
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  {complianceAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-start gap-3 rounded-xl border border-gray-200 p-3 transition-all duration-200 hover:bg-gray-50"
                    >
                      <div
                        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${alert.iconBg}`}
                      >
                        <alert.icon className={`h-4 w-4 ${alert.iconColor}`} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                          {alert.title}
                        </p>
                        <p className="text-xs text-gray-500">{alert.action}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 rounded-xl bg-gray-50 p-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-500">38 of 42 subs fully compliant</span>
                    <span className="font-semibold text-emerald-600">94%</span>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
