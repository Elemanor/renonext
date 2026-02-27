'use client';

import {
  Users,
  Clock,
  AlertTriangle,
  CheckCircle,
  Download,
  FileSpreadsheet,
  MapPin,
  DollarSign,
  Calendar,
  Timer,
  Zap,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';

// ── Types ────────────────────────────────────────────────────────────────────

interface DayEntry {
  day: string;
  regular: number;
  ot: number;
  project: string;
  costCode: string;
  gpsVerified: boolean;
}

interface CostCodeEntry {
  code: string;
  hours: number;
  cost: number;
}

interface Worker {
  id: string;
  name: string;
  trade: string;
  rate: number;
  otRate: number;
  avatar: string | null;
  status: 'on_site' | 'off_site' | 'flagged';
  weeklyHours: DayEntry[];
  totalRegular: number;
  totalOT: number;
  totalHours: number;
  grossPay: number;
  flagged: boolean;
  flagReason?: string;
  costCodeBreakdown: CostCodeEntry[];
}

interface PayPeriod {
  start: string;
  end: string;
  status: 'in_progress' | 'ready_to_export' | 'exported';
  totalGross: number;
  totalHours: number;
  totalOT: number;
  workersCount: number;
  overtimeFlagged: number;
}

// ── Mock Data ────────────────────────────────────────────────────────────────

const payPeriod: PayPeriod = {
  start: 'Feb 3, 2026',
  end: 'Feb 9, 2026',
  status: 'in_progress',
  totalGross: 14680,
  totalHours: 312.5,
  totalOT: 18.5,
  workersCount: 8,
  overtimeFlagged: 2,
};

const workers: Worker[] = [
  {
    id: 'w-1',
    name: 'Marcus Johnson',
    trade: 'Electrician',
    rate: 48,
    otRate: 72,
    avatar: null,
    status: 'on_site',
    weeklyHours: [
      { day: 'Mon', regular: 8.5, ot: 0, project: 'Condo Tower Phase 2', costCode: 'Electrical Rough-In', gpsVerified: true },
      { day: 'Tue', regular: 9.0, ot: 0, project: 'Condo Tower Phase 2', costCode: 'Electrical Rough-In', gpsVerified: true },
      { day: 'Wed', regular: 7.5, ot: 0, project: 'Lakeview Townhomes', costCode: 'Panel Installation', gpsVerified: true },
      { day: 'Thu', regular: 8.0, ot: 0, project: 'Lakeview Townhomes', costCode: 'Panel Installation', gpsVerified: true },
      { day: 'Fri', regular: 8.0, ot: 0, project: 'Lakeview Townhomes', costCode: 'Wire Pulling', gpsVerified: true },
      { day: 'Sat', regular: 0, ot: 0, project: '\u2014', costCode: '\u2014', gpsVerified: false },
    ],
    totalRegular: 41.0,
    totalOT: 0,
    totalHours: 41.0,
    grossPay: 1968,
    flagged: false,
    costCodeBreakdown: [
      { code: 'Electrical Rough-In', hours: 17.5, cost: 840 },
      { code: 'Panel Installation', hours: 15.5, cost: 744 },
      { code: 'Wire Pulling', hours: 8.0, cost: 384 },
    ],
  },
  {
    id: 'w-2',
    name: 'Jake Torres',
    trade: 'Framer',
    rate: 42,
    otRate: 63,
    avatar: null,
    status: 'flagged',
    weeklyHours: [
      { day: 'Mon', regular: 8.0, ot: 2.0, project: 'Lakeview Townhomes', costCode: 'Framing', gpsVerified: true },
      { day: 'Tue', regular: 8.0, ot: 1.5, project: 'Lakeview Townhomes', costCode: 'Framing', gpsVerified: true },
      { day: 'Wed', regular: 8.0, ot: 2.0, project: 'Lakeview Townhomes', costCode: 'Framing', gpsVerified: true },
      { day: 'Thu', regular: 8.0, ot: 1.5, project: 'Lakeview Townhomes', costCode: 'Framing', gpsVerified: true },
      { day: 'Fri', regular: 8.0, ot: 3.0, project: 'Lakeview Townhomes', costCode: 'Framing', gpsVerified: true },
      { day: 'Sat', regular: 6.0, ot: 0, project: 'Lakeview Townhomes', costCode: 'Framing', gpsVerified: true },
    ],
    totalRegular: 44.0,
    totalOT: 12.0,
    totalHours: 56.0,
    grossPay: 2604,
    flagged: true,
    flagReason: 'Overtime: 56 hrs total (12 OT). Ontario threshold is 44 hrs.',
    costCodeBreakdown: [
      { code: 'Framing', hours: 56.0, cost: 2604 },
    ],
  },
  {
    id: 'w-3',
    name: 'Sarah Chen',
    trade: 'Plumber',
    rate: 52,
    otRate: 78,
    avatar: null,
    status: 'on_site',
    weeklyHours: [
      { day: 'Mon', regular: 8.0, ot: 0, project: '88 King St Retrofit', costCode: 'Drain Tile', gpsVerified: true },
      { day: 'Tue', regular: 8.0, ot: 0, project: '88 King St Retrofit', costCode: 'Drain Tile', gpsVerified: true },
      { day: 'Wed', regular: 8.0, ot: 0, project: '88 King St Retrofit', costCode: 'Drain Tile', gpsVerified: true },
      { day: 'Thu', regular: 8.0, ot: 0, project: '88 King St Retrofit', costCode: 'Pipe Fitting', gpsVerified: true },
      { day: 'Fri', regular: 7.5, ot: 0, project: '88 King St Retrofit', costCode: 'Pipe Fitting', gpsVerified: true },
      { day: 'Sat', regular: 0, ot: 0, project: '\u2014', costCode: '\u2014', gpsVerified: false },
    ],
    totalRegular: 39.5,
    totalOT: 0,
    totalHours: 39.5,
    grossPay: 2054,
    flagged: false,
    costCodeBreakdown: [
      { code: 'Drain Tile', hours: 24.0, cost: 1248 },
      { code: 'Pipe Fitting', hours: 15.5, cost: 806 },
    ],
  },
  {
    id: 'w-4',
    name: 'Dmitri Volkov',
    trade: 'Concrete Finisher',
    rate: 45,
    otRate: 67.5,
    avatar: null,
    status: 'flagged',
    weeklyHours: [
      { day: 'Mon', regular: 8.0, ot: 1.0, project: '88 King St Retrofit', costCode: 'Concrete Work', gpsVerified: true },
      { day: 'Tue', regular: 8.0, ot: 2.0, project: '88 King St Retrofit', costCode: 'Concrete Work', gpsVerified: true },
      { day: 'Wed', regular: 8.0, ot: 0, project: 'Condo Tower Phase 2', costCode: 'Foundation Patch', gpsVerified: true },
      { day: 'Thu', regular: 8.0, ot: 0, project: 'Condo Tower Phase 2', costCode: 'Foundation Patch', gpsVerified: false },
      { day: 'Fri', regular: 8.0, ot: 2.5, project: 'Condo Tower Phase 2', costCode: 'Slab Pour', gpsVerified: true },
      { day: 'Sat', regular: 5.0, ot: 0, project: '88 King St Retrofit', costCode: 'Concrete Work', gpsVerified: true },
    ],
    totalRegular: 44.0,
    totalOT: 5.5,
    totalHours: 49.5,
    grossPay: 2351.25,
    flagged: true,
    flagReason: 'Overtime: 49.5 hrs total (5.5 OT). Also: GPS not verified for Thu.',
    costCodeBreakdown: [
      { code: 'Concrete Work', hours: 24.0, cost: 1080 },
      { code: 'Foundation Patch', hours: 16.0, cost: 720 },
      { code: 'Slab Pour', hours: 9.5, cost: 551.25 },
    ],
  },
  {
    id: 'w-5',
    name: 'Kevin Park',
    trade: 'Drywall',
    rate: 40,
    otRate: 60,
    avatar: null,
    status: 'on_site',
    weeklyHours: [
      { day: 'Mon', regular: 8.0, ot: 0, project: 'Condo Tower Phase 2', costCode: 'Drywall Hang', gpsVerified: true },
      { day: 'Tue', regular: 8.0, ot: 0, project: 'Condo Tower Phase 2', costCode: 'Drywall Hang', gpsVerified: true },
      { day: 'Wed', regular: 8.0, ot: 0, project: 'Condo Tower Phase 2', costCode: 'Drywall Tape', gpsVerified: true },
      { day: 'Thu', regular: 8.0, ot: 0, project: 'Condo Tower Phase 2', costCode: 'Drywall Tape', gpsVerified: true },
      { day: 'Fri', regular: 7.0, ot: 0, project: 'Condo Tower Phase 2', costCode: 'Drywall Mud', gpsVerified: true },
      { day: 'Sat', regular: 0, ot: 0, project: '\u2014', costCode: '\u2014', gpsVerified: false },
    ],
    totalRegular: 39.0,
    totalOT: 0,
    totalHours: 39.0,
    grossPay: 1560,
    flagged: false,
    costCodeBreakdown: [
      { code: 'Drywall Hang', hours: 16.0, cost: 640 },
      { code: 'Drywall Tape', hours: 16.0, cost: 640 },
      { code: 'Drywall Mud', hours: 7.0, cost: 280 },
    ],
  },
];

// ── Helpers ──────────────────────────────────────────────────────────────────

const projectShortName: Record<string, string> = {
  'Condo Tower Phase 2': 'CT2',
  'Lakeview Townhomes': 'LVT',
  '88 King St Retrofit': '88K',
};

function shortProject(name: string): string {
  return projectShortName[name] || name;
}

function shortCode(code: string): string {
  if (code === '\u2014') return '\u2014';
  const words = code.split(' ');
  if (words.length === 1) return code.substring(0, 6);
  return words.map((w) => w[0]).join('');
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    minimumFractionDigits: amount % 1 === 0 ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

// ── Status Configs ───────────────────────────────────────────────────────────

const payPeriodStatusConfig = {
  in_progress: { label: 'In Progress', bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  ready_to_export: { label: 'Ready to Export', bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  exported: { label: 'Exported', bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
};

const workerStatusConfig: Record<string, { label: string; dotColor: string; pulse?: boolean }> = {
  on_site: { label: 'On Site', dotColor: 'bg-emerald-500' },
  off_site: { label: 'Off Site', dotColor: 'bg-gray-400' },
  flagged: { label: 'Flagged', dotColor: 'bg-amber-500', pulse: true },
};

// ── Worker Card Component ────────────────────────────────────────────────────

function WorkerCard({ worker }: { worker: Worker }) {
  const [expanded, setExpanded] = useState(false);
  const statusCfg = workerStatusConfig[worker.status];

  return (
    <Card
      className={`rounded-2xl border bg-white shadow-sm transition-all duration-200 hover:shadow-md ${
        worker.flagged ? 'border-amber-300' : 'border-gray-200'
      }`}
    >
      <CardContent className="p-0">
        {/* Worker Header */}
        <div className="border-b border-gray-100 p-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Avatar placeholder */}
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-sm font-bold text-gray-600">
                {worker.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-gray-900">{worker.name}</h3>
                  <span className="relative flex h-2.5 w-2.5">
                    {statusCfg.pulse && (
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                    )}
                    <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${statusCfg.dotColor}`} />
                  </span>
                </div>
                <div className="mt-0.5 flex items-center gap-2">
                  <Badge className="rounded-full border border-gray-200 bg-gray-50 px-2 py-0 text-[10px] font-medium text-gray-600">
                    {worker.trade}
                  </Badge>
                  <span className="text-xs text-gray-400">
                    ${worker.rate}/hr
                  </span>
                  {worker.otRate > 0 && (
                    <span className="text-xs text-gray-400">
                      OT: ${worker.otRate}/hr
                    </span>
                  )}
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">{formatCurrency(worker.grossPay)}</p>
              <p className="text-[10px] font-medium text-gray-400">gross pay</p>
            </div>
          </div>
        </div>

        {/* Weekly Hours Grid */}
        <div className="border-b border-gray-100 p-5">
          <div className="overflow-x-auto">
            <table className="w-full text-xs">
              <thead>
                <tr className="text-gray-400">
                  <th className="pb-2 pr-3 text-left font-medium" />
                  {worker.weeklyHours.map((d) => (
                    <th key={d.day} className="pb-2 text-center font-medium" style={{ minWidth: 52 }}>
                      {d.day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {/* Regular hours */}
                <tr>
                  <td className="py-1 pr-3 font-medium text-gray-500">Reg</td>
                  {worker.weeklyHours.map((d) => (
                    <td key={d.day} className="py-1 text-center font-semibold text-gray-900">
                      {d.regular > 0 ? d.regular : '\u2014'}
                    </td>
                  ))}
                </tr>
                {/* OT hours */}
                <tr>
                  <td className="py-1 pr-3 font-medium text-gray-500">OT</td>
                  {worker.weeklyHours.map((d) => (
                    <td key={d.day} className={`py-1 text-center font-semibold ${d.ot > 0 ? 'text-red-600' : 'text-gray-300'}`}>
                      {d.ot > 0 ? d.ot : '\u2014'}
                    </td>
                  ))}
                </tr>
                {/* Project */}
                <tr>
                  <td className="py-1 pr-3 font-medium text-gray-500">Project</td>
                  {worker.weeklyHours.map((d) => (
                    <td key={d.day} className="py-1 text-center text-gray-600">
                      {d.project === '\u2014' ? '\u2014' : shortProject(d.project)}
                    </td>
                  ))}
                </tr>
                {/* Cost Code */}
                <tr>
                  <td className="py-1 pr-3 font-medium text-gray-500">Code</td>
                  {worker.weeklyHours.map((d) => (
                    <td key={d.day} className="py-1 text-center text-gray-600" title={d.costCode}>
                      {shortCode(d.costCode)}
                    </td>
                  ))}
                </tr>
                {/* GPS */}
                <tr>
                  <td className="py-1 pr-3 font-medium text-gray-500">GPS</td>
                  {worker.weeklyHours.map((d) => (
                    <td key={d.day} className="py-1 text-center">
                      {d.regular === 0 && d.ot === 0 ? (
                        <span className="text-gray-300">\u2014</span>
                      ) : d.gpsVerified ? (
                        <CheckCircle className="mx-auto h-3.5 w-3.5 text-emerald-500" />
                      ) : (
                        <AlertTriangle className="mx-auto h-3.5 w-3.5 text-red-500" />
                      )}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary Row */}
        <div className="border-b border-gray-100 px-5 py-3">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-1 text-sm">
            <div className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5 text-gray-400" />
              <span className="text-gray-500">Regular:</span>
              <span className="font-bold text-gray-900">{worker.totalRegular} hrs</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Timer className="h-3.5 w-3.5 text-gray-400" />
              <span className="text-gray-500">OT:</span>
              <span className={`font-bold ${worker.totalOT > 0 ? 'text-red-600' : 'text-gray-900'}`}>
                {worker.totalOT} hrs
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-gray-400" />
              <span className="text-gray-500">Total:</span>
              <span className="font-bold text-gray-900">{worker.totalHours} hrs</span>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <DollarSign className="h-3.5 w-3.5 text-gray-400" />
              <span className="text-gray-500">Gross:</span>
              <span className="font-bold text-gray-900">{formatCurrency(worker.grossPay)}</span>
            </div>
          </div>
        </div>

        {/* Cost Code Breakdown (collapsible) */}
        <div className="border-b border-gray-100">
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex w-full items-center justify-between px-5 py-3 text-xs font-bold uppercase tracking-wider text-gray-400 transition-colors hover:bg-gray-50"
          >
            <span>Cost Code Breakdown</span>
            {expanded ? (
              <ChevronUp className="h-3.5 w-3.5" />
            ) : (
              <ChevronDown className="h-3.5 w-3.5" />
            )}
          </button>
          {expanded && (
            <div className="px-5 pb-4">
              <table className="w-full text-xs">
                <thead>
                  <tr className="border-b border-gray-100 text-gray-400">
                    <th className="pb-2 text-left font-medium">Cost Code</th>
                    <th className="pb-2 text-right font-medium">Hours</th>
                    <th className="pb-2 text-right font-medium">Cost</th>
                  </tr>
                </thead>
                <tbody>
                  {worker.costCodeBreakdown.map((cc) => (
                    <tr key={cc.code} className="border-b border-gray-50">
                      <td className="py-2 font-medium text-gray-700">{cc.code}</td>
                      <td className="py-2 text-right text-gray-600">{cc.hours}</td>
                      <td className="py-2 text-right font-semibold text-gray-900">
                        {formatCurrency(cc.cost)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="font-semibold">
                    <td className="pt-2 text-gray-900">Total</td>
                    <td className="pt-2 text-right text-gray-900">{worker.totalHours}</td>
                    <td className="pt-2 text-right text-gray-900">{formatCurrency(worker.grossPay)}</td>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>

        {/* Flag Banner */}
        {worker.flagged && worker.flagReason && (
          <div className="flex items-start gap-2.5 bg-red-50 px-5 py-3">
            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
            <p className="text-xs font-semibold text-red-700">
              FLAGGED: {worker.flagReason}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// ── Main Page ────────────────────────────────────────────────────────────────

export default function GCPayrollPage() {
  const periodCfg = payPeriodStatusConfig[payPeriod.status];
  const flaggedWorkers = workers.filter((w) => w.flagged);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Payroll</h1>
          <p className="mt-1 text-sm text-gray-500">
            Verified hours, overtime flags, cost codes &mdash; ready to export
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="h-auto rounded-xl border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700"
          >
            <Calendar className="mr-1.5 h-4 w-4" />
            Past Pay Periods
          </Button>
          <Button className="h-auto rounded-xl bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700">
            <Download className="mr-1.5 h-4 w-4" />
            Export to QuickBooks / ADP
          </Button>
        </div>
      </div>

      {/* Pay Period Banner */}
      <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <CardContent className="p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-blue-50 p-2.5">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Current Pay Period</p>
                <p className="text-lg font-bold text-gray-900">
                  {payPeriod.start} &ndash; {payPeriod.end}
                </p>
              </div>
            </div>
            <Badge
              className={`w-fit rounded-full border px-3 py-1 text-xs font-semibold ${periodCfg.bg} ${periodCfg.text} ${periodCfg.border}`}
            >
              {periodCfg.label}
            </Badge>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="rounded-xl bg-gray-50 p-3 text-center">
              <div className="flex items-center justify-center gap-1.5 text-gray-500">
                <Users className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">Workers</span>
              </div>
              <p className="mt-1 text-xl font-bold text-gray-900">{payPeriod.workersCount}</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-3 text-center">
              <div className="flex items-center justify-center gap-1.5 text-gray-500">
                <Clock className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">Total Hours</span>
              </div>
              <p className="mt-1 text-xl font-bold text-gray-900">{payPeriod.totalHours}</p>
            </div>
            <div className="rounded-xl bg-gray-50 p-3 text-center">
              <div className="flex items-center justify-center gap-1.5 text-gray-500">
                <Timer className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">OT Hours</span>
              </div>
              <p className={`mt-1 text-xl font-bold ${payPeriod.totalOT > 0 ? 'text-red-600' : 'text-gray-900'}`}>
                {payPeriod.totalOT}
              </p>
            </div>
            <div className="rounded-xl bg-gray-50 p-3 text-center">
              <div className="flex items-center justify-center gap-1.5 text-gray-500">
                <DollarSign className="h-3.5 w-3.5" />
                <span className="text-xs font-medium">Gross</span>
              </div>
              <p className="mt-1 text-xl font-bold text-gray-900">
                {formatCurrency(payPeriod.totalGross)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Overtime Alerts */}
      {flaggedWorkers.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-gray-900">Overtime Alerts</h2>
          {flaggedWorkers.map((worker) => (
            <Card
              key={worker.id}
              className="rounded-2xl border border-red-200 bg-red-50/50 shadow-none"
            >
              <CardContent className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className="rounded-lg bg-red-100 p-2">
                    <AlertTriangle className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-red-800">
                      {worker.name} &mdash; {worker.totalHours} hrs total ({worker.totalOT} OT)
                    </p>
                    {worker.flagReason && (
                      <p className="mt-0.5 text-xs text-red-600">{worker.flagReason}</p>
                    )}
                    <p className="mt-0.5 text-xs text-gray-500">Review before export.</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="h-auto shrink-0 rounded-lg border-red-200 bg-white px-3 py-1.5 text-xs font-medium text-red-700 hover:bg-red-50"
                >
                  Review
                  <ChevronRight className="ml-1 h-3.5 w-3.5" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Worker Cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-900">Worker Timesheets</h2>
        {workers.map((worker) => (
          <WorkerCard key={worker.id} worker={worker} />
        ))}
      </div>

      {/* Export Section */}
      <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-lg font-bold text-gray-900">
            <FileSpreadsheet className="h-5 w-5 text-emerald-600" />
            Ready to Export
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Checkboxes */}
          <div className="space-y-2.5">
            {[
              { label: 'Include verified hours only', checked: true },
              { label: 'Include cost code breakdown', checked: true },
              { label: 'Include overtime calculation', checked: true },
            ].map((opt) => (
              <label key={opt.label} className="flex items-center gap-2.5 text-sm text-gray-700">
                <div
                  className={`flex h-4.5 w-4.5 items-center justify-center rounded border ${
                    opt.checked
                      ? 'border-emerald-500 bg-emerald-500'
                      : 'border-gray-300 bg-white'
                  }`}
                  style={{ width: 18, height: 18 }}
                >
                  {opt.checked && <CheckCircle className="h-3 w-3 text-white" />}
                </div>
                {opt.label}
              </label>
            ))}
          </div>

          {/* Export Buttons */}
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button className="h-auto flex-1 rounded-xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700">
              <Download className="mr-2 h-4 w-4" />
              Export CSV for QuickBooks
            </Button>
            <Button className="h-auto flex-1 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blue-700">
              <Download className="mr-2 h-4 w-4" />
              Export CSV for ADP
            </Button>
          </div>

          {/* Disclaimer */}
          <p className="text-center text-xs text-gray-400">
            We calculate gross pay. Your accountant handles CPP, EI, and taxes. Clean data, zero headaches.
          </p>
        </CardContent>
      </Card>

      {/* What We Track vs What We Don't */}
      <Card className="rounded-2xl border border-gray-200 bg-gray-50/50 shadow-none">
        <CardContent className="p-6">
          <h3 className="mb-4 text-base font-bold text-gray-900">
            What We Track vs What We Don&apos;t
          </h3>
          <div className="grid gap-6 sm:grid-cols-2">
            {/* We Track */}
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-emerald-600">
                We Track
              </p>
              <div className="space-y-2.5">
                {[
                  { icon: MapPin, text: 'GPS-Verified Hours' },
                  { icon: AlertTriangle, text: 'Overtime Flags (44+ hrs Ontario)' },
                  { icon: FileSpreadsheet, text: 'Cost Code Allocation' },
                  { icon: Clock, text: 'Per-Project Hours' },
                  { icon: DollarSign, text: 'Gross Pay Calculation' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2.5">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100">
                      <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
                    </div>
                    <span className="text-sm text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* We Don't */}
            <div>
              <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
                We Don&apos;t
              </p>
              <div className="space-y-2.5">
                {[
                  'CPP/EI deductions',
                  'Income tax calculations',
                  'T4 generation',
                  'Benefits/pension',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-200">
                      <span className="text-xs font-bold text-gray-400">&times;</span>
                    </div>
                    <span className="text-sm text-gray-500">{item}</span>
                  </div>
                ))}
                <p className="mt-2 rounded-lg bg-gray-100 px-3 py-2 text-xs text-gray-500">
                  Leave that to QuickBooks, ADP, or your accountant.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
