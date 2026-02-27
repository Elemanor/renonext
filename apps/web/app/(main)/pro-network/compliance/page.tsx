'use client';

import {
  Shield,
  CheckCircle,
  AlertTriangle,
  Clock,
  Users,
  FileText,
  Download,
  RefreshCw,
  Star,
  ArrowRight,
  Ban,
  Banknote,
  Eye,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const complianceSummary = {
  totalSubs: 42,
  compliant: 38,
  expiringSoon: 3,
  expired: 1,
  blockedPayments: 1,
  totalBlockedAmount: '$16,800',
};

const certTypes = [
  { name: 'WSIB Clearance', required: true, compliant: 41, total: 42 },
  { name: 'WHMIS Training', required: true, compliant: 40, total: 42 },
  { name: 'Working at Heights', required: false, compliant: 28, total: 42 },
  { name: 'Confined Spaces', required: false, compliant: 15, total: 42 },
  { name: 'Fall Protection', required: false, compliant: 22, total: 42 },
  { name: 'First Aid / CPR', required: false, compliant: 35, total: 42 },
];

const subCompliance = [
  {
    name: 'FastFinish Ltd.',
    initials: 'FF',
    color: 'bg-gray-600',
    trade: 'Drywall',
    wsibStatus: 'expired',
    wsibExpiry: 'Jan 30, 2026',
    blockedPayment: '$16,800',
    certs: { wsib: false, whmis: true, heights: false, confined: false, fall: false, firstAid: false },
    lastVerified: 'Jan 15, 2026',
  },
  {
    name: 'Toronto Glazing Co.',
    initials: 'TG',
    color: 'bg-sky-600',
    trade: 'Glazing',
    wsibStatus: 'expiring',
    wsibExpiry: 'Feb 22, 2026',
    blockedPayment: null,
    certs: { wsib: true, whmis: true, heights: true, confined: false, fall: true, firstAid: false },
    lastVerified: 'Feb 1, 2026',
  },
  {
    name: 'QuickWire',
    initials: 'QW',
    color: 'bg-orange-600',
    trade: 'Electrical',
    wsibStatus: 'expiring',
    wsibExpiry: 'Mar 5, 2026',
    blockedPayment: null,
    certs: { wsib: true, whmis: true, heights: false, confined: false, fall: false, firstAid: true },
    lastVerified: 'Jan 28, 2026',
  },
  {
    name: 'Allied Electric',
    initials: 'AE',
    color: 'bg-indigo-600',
    trade: 'Electrical',
    wsibStatus: 'expiring',
    wsibExpiry: 'Mar 12, 2026',
    blockedPayment: null,
    certs: { wsib: true, whmis: true, heights: true, confined: false, fall: false, firstAid: true },
    lastVerified: 'Feb 3, 2026',
  },
];

const compliantSubs = [
  { name: 'ProWall Inc.', initials: 'PW', color: 'bg-violet-600', trade: 'Drywall', rating: 4.9, wsibExpiry: 'Aug 15, 2026', certsCount: 4 },
  { name: 'Spark Electric', initials: 'SE', color: 'bg-blue-600', trade: 'Electrical', rating: 4.8, wsibExpiry: 'Nov 30, 2026', certsCount: 4 },
  { name: 'FormTech Inc.', initials: 'FT', color: 'bg-amber-600', trade: 'Concrete', rating: 4.9, wsibExpiry: 'Sep 10, 2026', certsCount: 5 },
  { name: 'GTA Drywall Co.', initials: 'GD', color: 'bg-emerald-600', trade: 'Drywall', rating: 4.7, wsibExpiry: 'Jun 20, 2026', certsCount: 3 },
  { name: 'DrainPro GTA', initials: 'DP', color: 'bg-teal-600', trade: 'Plumbing', rating: 4.8, wsibExpiry: 'Oct 5, 2026', certsCount: 4 },
];

const wsibStatusStyles = {
  expired: { label: 'Expired', bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', icon: AlertTriangle, iconColor: 'text-red-500' },
  expiring: { label: 'Expiring Soon', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', icon: Clock, iconColor: 'text-amber-500' },
  active: { label: 'Active', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200', icon: CheckCircle, iconColor: 'text-emerald-500' },
};

export default function CompliancePage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Compliance Center
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            WSIB tracking, certification verification, and payment compliance
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="h-auto rounded-xl border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700"
          >
            <Download className="mr-1.5 h-4 w-4" />
            Export Report
          </Button>
          <Button className="h-auto rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-700">
            <RefreshCw className="mr-1.5 h-4 w-4" />
            Re-verify All
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-2xl border border-gray-200 bg-white shadow-none">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-emerald-50 p-2.5">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
              </div>
              <Badge className="rounded-full border-transparent bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                {Math.round((complianceSummary.compliant / complianceSummary.totalSubs) * 100)}%
              </Badge>
            </div>
            <p className="mt-3 text-sm font-medium text-gray-500">Fully Compliant</p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
              {complianceSummary.compliant} / {complianceSummary.totalSubs}
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-amber-200 bg-amber-50/30 shadow-none">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-amber-100 p-2.5">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
            </div>
            <p className="mt-3 text-sm font-medium text-gray-500">Expiring Soon</p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-amber-700">
              {complianceSummary.expiringSoon}
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-red-200 bg-red-50/30 shadow-none">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-red-100 p-2.5">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
            </div>
            <p className="mt-3 text-sm font-medium text-gray-500">Expired / Non-Compliant</p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-red-700">
              {complianceSummary.expired}
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-red-200 bg-red-50/30 shadow-none">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-red-100 p-2.5">
                <Ban className="h-5 w-5 text-red-600" />
              </div>
            </div>
            <p className="mt-3 text-sm font-medium text-gray-500">Blocked Payments</p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-red-700">
              {complianceSummary.totalBlockedAmount}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Certification Coverage */}
      <Card className="mb-6 rounded-2xl border border-gray-200 bg-white shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold text-gray-900">
            Certification Coverage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {certTypes.map((cert) => {
              const percentage = Math.round((cert.compliant / cert.total) * 100);
              return (
                <div key={cert.name}>
                  <div className="mb-1.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">{cert.name}</span>
                      {cert.required && (
                        <Badge className="rounded-full border-transparent bg-red-50 px-1.5 py-0 text-[8px] font-bold text-red-700">
                          REQUIRED
                        </Badge>
                      )}
                    </div>
                    <span className="text-sm font-semibold text-gray-700">
                      {cert.compliant}/{cert.total} ({percentage}%)
                    </span>
                  </div>
                  <div className="h-2.5 w-full rounded-full bg-gray-100">
                    <div
                      className={`h-2.5 rounded-full transition-all ${
                        percentage >= 90
                          ? 'bg-emerald-500'
                          : percentage >= 70
                            ? 'bg-amber-500'
                            : 'bg-red-500'
                      }`}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Attention Required */}
      <Card className="mb-6 rounded-2xl border border-red-200 bg-white shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            <CardTitle className="text-lg font-bold text-gray-900">
              Attention Required
            </CardTitle>
            <Badge className="rounded-full border-transparent bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-red-700">
              {subCompliance.length} subs
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {subCompliance.map((sub) => {
              const style = wsibStatusStyles[sub.wsibStatus as keyof typeof wsibStatusStyles];
              const StatusIcon = style.icon;
              return (
                <div
                  key={sub.name}
                  className={`rounded-xl border p-4 ${style.border} ${style.bg}`}
                >
                  <div className="flex items-start gap-3">
                    <Avatar className="h-10 w-10 shrink-0">
                      <AvatarFallback
                        className={`${sub.color} text-xs font-bold text-white`}
                      >
                        {sub.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">{sub.name}</h3>
                        <Badge
                          className={`rounded-full border-transparent px-2 py-0 text-[9px] font-semibold ${style.bg} ${style.text}`}
                        >
                          <StatusIcon className={`mr-0.5 h-2.5 w-2.5 ${style.iconColor}`} />
                          {style.label}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600">
                        {sub.trade} — WSIB {sub.wsibStatus === 'expired' ? 'expired' : 'expires'}{' '}
                        {sub.wsibExpiry}
                      </p>

                      {/* Cert grid */}
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {Object.entries(sub.certs).map(([key, value]) => (
                          <Badge
                            key={key}
                            className={`rounded-full border-transparent px-2 py-0.5 text-[9px] font-medium ${
                              value
                                ? 'bg-emerald-100 text-emerald-700'
                                : 'bg-gray-100 text-gray-400'
                            }`}
                          >
                            {value ? (
                              <CheckCircle className="mr-0.5 h-2.5 w-2.5" />
                            ) : (
                              <AlertTriangle className="mr-0.5 h-2.5 w-2.5" />
                            )}
                            {key.toUpperCase()}
                          </Badge>
                        ))}
                      </div>

                      {/* Blocked payment warning */}
                      {sub.blockedPayment && (
                        <div className="mt-2 flex items-center gap-2 rounded-lg bg-red-100 px-3 py-1.5">
                          <Ban className="h-3.5 w-3.5 text-red-600" />
                          <span className="text-xs font-semibold text-red-700">
                            Payment of {sub.blockedPayment} blocked until WSIB renewed
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex shrink-0 flex-col gap-1.5">
                      <Button
                        variant="outline"
                        className="h-auto rounded-lg border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700"
                      >
                        Send Reminder
                      </Button>
                      <Button
                        variant="outline"
                        className="h-auto rounded-lg border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700"
                      >
                        <Eye className="mr-1 h-3 w-3" />
                        Details
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Fully Compliant Subs */}
      <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-emerald-500" />
            <CardTitle className="text-lg font-bold text-gray-900">
              Fully Compliant
            </CardTitle>
            <Badge className="rounded-full border-transparent bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
              {compliantSubs.length} of {complianceSummary.totalSubs} shown
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {compliantSubs.map((sub) => (
              <div
                key={sub.name}
                className="flex items-center gap-3 rounded-xl border border-gray-200 p-3 transition-all duration-200 hover:bg-gray-50"
              >
                <Avatar className="h-9 w-9 shrink-0">
                  <AvatarFallback
                    className={`${sub.color} text-[10px] font-bold text-white`}
                  >
                    {sub.initials}
                  </AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-gray-900">{sub.name}</span>
                    <Badge className="rounded-full border-transparent bg-emerald-50 px-1.5 py-0 text-[8px] font-bold text-emerald-700">
                      <CheckCircle className="mr-0.5 h-2.5 w-2.5" />
                      ALL CLEAR
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-500">
                    {sub.trade} — {sub.certsCount} certs — WSIB valid until {sub.wsibExpiry}
                  </p>
                </div>
                <div className="flex items-center gap-1 text-xs text-gray-500">
                  <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                  {sub.rating}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
