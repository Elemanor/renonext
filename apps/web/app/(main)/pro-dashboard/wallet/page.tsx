'use client';

import {
  Wallet,
  DollarSign,
  Clock,
  CheckCircle,
  ArrowUpRight,
  ArrowDownRight,
  Send,
  Banknote,
  Camera,
  Receipt,
  TrendingUp,
  Calendar,
  MapPin,
  Zap,
  CreditCard,
  Smartphone,
  ChevronRight,
  Star,
  Shield,
  ScanLine,
  ClipboardList,
  Tag,
  Building2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const walletSummary = {
  availableBalance: '$2,840',
  pendingBalance: '$590',
  weeklyEarnings: '$1,960',
  monthlyEarnings: '$8,420',
  nextPayout: 'Friday, Feb 13',
  nextPayoutAmount: '$3,430',
};

const todayEarnings = {
  signedIn: '7:45 AM',
  signedOut: null,
  hoursToday: '6.5 hrs',
  earningsToday: '$310',
  rate: '$48/hr',
  job: 'Electrical Rough-In — Unit 12-16',
  project: 'Lakeview Townhomes',
};

const weeklyBreakdown = [
  { day: 'Mon', date: 'Feb 3', hours: 8.5, earnings: 408, job: 'Condo Tower Phase 2' },
  { day: 'Tue', date: 'Feb 4', hours: 9.0, earnings: 432, job: 'Condo Tower Phase 2' },
  { day: 'Wed', date: 'Feb 5', hours: 7.5, earnings: 360, job: 'Lakeview Townhomes' },
  { day: 'Thu', date: 'Feb 6', hours: 8.0, earnings: 384, job: 'Lakeview Townhomes' },
  { day: 'Fri', date: 'Feb 7', hours: 6.5, earnings: 310, job: 'Lakeview Townhomes', current: true },
  { day: 'Sat', date: 'Feb 8', hours: 0, earnings: 0, job: '—' },
];

const pendingExpenses = [
  {
    id: 'exp-1',
    description: 'Wire connectors & splice kits',
    vendor: 'Home Depot',
    amount: '$67.50',
    date: 'Feb 7, 2026',
    time: '11:23 AM',
    status: 'pending',
    receiptUploaded: true,
    ocrParsed: true,
    project: 'Lakeview Townhomes',
    category: 'Consumables',
    budgetImpact: 'Deducted from Electrical budget — $67.50 of $16,000',
  },
  {
    id: 'exp-2',
    description: 'ABS piping connectors',
    vendor: 'Home Hardware',
    amount: '$42.80',
    date: 'Feb 7, 2026',
    time: '8:45 AM',
    status: 'pending',
    receiptUploaded: true,
    ocrParsed: true,
    project: '88 King St Retrofit',
    category: 'Materials',
    budgetImpact: 'Deducted from Plumbing budget — $42.80 of $12,000',
  },
  {
    id: 'exp-3',
    description: 'Lunch — crew (4 people)',
    vendor: 'Tim Hortons',
    amount: '$58.40',
    date: 'Feb 6, 2026',
    time: '12:15 PM',
    status: 'approved',
    receiptUploaded: true,
    ocrParsed: true,
    project: 'Lakeview Townhomes',
    category: 'Meals',
    budgetImpact: 'Charged to project overhead',
  },
  {
    id: 'exp-4',
    description: 'Parking — downtown site',
    vendor: 'Green P',
    amount: '$24.00',
    date: 'Feb 5, 2026',
    time: '7:30 AM',
    status: 'approved',
    receiptUploaded: true,
    ocrParsed: false,
    project: 'Condo Tower Phase 2',
    category: 'Transportation',
    budgetImpact: 'Charged to project overhead',
  },
  {
    id: 'exp-5',
    description: 'Safety glasses (3 pairs)',
    vendor: 'Canadian Tire',
    amount: '$36.90',
    date: 'Feb 4, 2026',
    time: '6:50 AM',
    status: 'approved',
    receiptUploaded: true,
    ocrParsed: true,
    project: 'Condo Tower Phase 2',
    category: 'Safety Equipment',
    budgetImpact: 'Deducted from Safety budget — $36.90 of $2,000',
  },
];

const categoryBreakdown = [
  { name: 'Materials', amount: 110.30, pct: 45, color: 'bg-blue-500' },
  { name: 'Meals', amount: 58.40, pct: 24, color: 'bg-amber-500' },
  { name: 'Safety', amount: 36.90, pct: 15, color: 'bg-emerald-500' },
  { name: 'Transport', amount: 24.00, pct: 10, color: 'bg-violet-500' },
  { name: 'Consumables', amount: 15.20, pct: 6, color: 'bg-rose-400' },
];

const payoutHistory = [
  { id: 'po-1', date: 'Feb 7, 2026', amount: '$1,584', method: 'Auto-deposit', status: 'completed' },
  { id: 'po-2', date: 'Jan 31, 2026', amount: '$2,016', method: 'Auto-deposit', status: 'completed' },
  { id: 'po-3', date: 'Jan 28, 2026', amount: '$450', method: 'Instant Cash Out', status: 'completed', fee: '$4.50' },
  { id: 'po-4', date: 'Jan 24, 2026', amount: '$1,872', method: 'Auto-deposit', status: 'completed' },
];

const categoryColorMap: Record<string, string> = {
  Consumables: 'bg-rose-50 text-rose-700 border-rose-200',
  Materials: 'bg-blue-50 text-blue-700 border-blue-200',
  Meals: 'bg-amber-50 text-amber-700 border-amber-200',
  Transportation: 'bg-violet-50 text-violet-700 border-violet-200',
  'Safety Equipment': 'bg-emerald-50 text-emerald-700 border-emerald-200',
};

const snapSteps = [
  {
    icon: Camera,
    label: 'Snap Photo',
    desc: 'Take a photo of any receipt',
    color: 'text-violet-600 bg-violet-100',
  },
  {
    icon: ScanLine,
    label: 'OCR Reads It',
    desc: 'We extract vendor, amount, date automatically',
    color: 'text-blue-600 bg-blue-100',
  },
  {
    icon: ClipboardList,
    label: 'Assign It',
    desc: 'Select project and category',
    color: 'text-indigo-600 bg-indigo-100',
  },
  {
    icon: CheckCircle,
    label: 'Budget Updated',
    desc: 'Expense deducted from project budget instantly',
    color: 'text-emerald-600 bg-emerald-100',
  },
];

export default function WorkerWalletPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            My Wallet
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Earnings, payouts, and expense reimbursements
          </p>
        </div>
        <Button className="h-auto rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700">
          <Zap className="mr-1.5 h-4 w-4" />
          Cash Out Instantly
        </Button>
      </div>

      {/* Balance Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-2xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-white shadow-none">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-emerald-100 p-2.5">
                <Wallet className="h-5 w-5 text-emerald-600" />
              </div>
              <Badge className="rounded-full border-transparent bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                Available
              </Badge>
            </div>
            <p className="mt-3 text-sm font-medium text-gray-500">Available Balance</p>
            <p className="mt-1 text-3xl font-bold tracking-tight text-emerald-700">
              {walletSummary.availableBalance}
            </p>
            <Button className="mt-3 h-auto w-full rounded-xl bg-emerald-600 py-2.5 text-sm font-semibold text-white hover:bg-emerald-700">
              <Zap className="mr-1.5 h-4 w-4" />
              Cash Out Now — $2.50 fee
            </Button>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-amber-200 bg-amber-50/30 shadow-none">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-amber-100 p-2.5">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
            </div>
            <p className="mt-3 text-sm font-medium text-gray-500">Pending</p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-amber-700">
              {walletSummary.pendingBalance}
            </p>
            <p className="mt-1 text-xs text-gray-400">GPS verification in progress</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-gray-200 bg-white shadow-none">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-blue-50 p-2.5">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <p className="mt-3 text-sm font-medium text-gray-500">This Week</p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
              {walletSummary.weeklyEarnings}
            </p>
            <p className="mt-1 text-xs text-gray-400">5 days worked</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-gray-200 bg-white shadow-none">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-violet-50 p-2.5">
                <TrendingUp className="h-5 w-5 text-violet-600" />
              </div>
              <Badge className="rounded-full border-transparent bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                <TrendingUp className="mr-0.5 h-3 w-3" />
                12%
              </Badge>
            </div>
            <p className="mt-3 text-sm font-medium text-gray-500">This Month</p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
              {walletSummary.monthlyEarnings}
            </p>
            <p className="mt-1 text-xs text-gray-400">vs $7,520 last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Today's Earnings - Live Card */}
      <Card className="rounded-2xl border-2 border-emerald-200 bg-white shadow-sm">
        <CardContent className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500" />
              </span>
              <span className="text-sm font-bold text-emerald-700">ON SITE — EARNING</span>
            </div>
            <span className="text-2xl font-bold text-emerald-700">{todayEarnings.earningsToday}</span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-xs text-gray-500">Current Job</p>
              <p className="text-sm font-semibold text-gray-900">{todayEarnings.job}</p>
              <p className="text-xs text-gray-400">{todayEarnings.project}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Signed In</p>
              <p className="text-sm font-semibold text-gray-900">{todayEarnings.signedIn}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Hours Today</p>
              <p className="text-sm font-semibold text-gray-900">{todayEarnings.hoursToday}</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">Rate</p>
              <p className="text-sm font-semibold text-gray-900">{todayEarnings.rate}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Weekly Breakdown */}
      <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold text-gray-900">
            Weekly Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {weeklyBreakdown.map((day) => (
              <div
                key={day.day}
                className={`flex items-center gap-4 rounded-xl border p-3 ${
                  day.current
                    ? 'border-emerald-200 bg-emerald-50/50'
                    : day.hours > 0
                      ? 'border-gray-200'
                      : 'border-gray-100 bg-gray-50/50'
                }`}
              >
                <div className="w-16 shrink-0">
                  <p className="text-sm font-bold text-gray-900">{day.day}</p>
                  <p className="text-[10px] text-gray-500">{day.date}</p>
                </div>

                {/* Hours bar */}
                <div className="min-w-0 flex-1">
                  <div className="h-6 w-full rounded-full bg-gray-100">
                    {day.hours > 0 && (
                      <div
                        className={`flex h-6 items-center rounded-full px-3 ${
                          day.current
                            ? 'bg-emerald-500'
                            : 'bg-blue-500'
                        }`}
                        style={{ width: `${Math.min((day.hours / 10) * 100, 100)}%` }}
                      >
                        <span className="text-[10px] font-bold text-white">
                          {day.hours} hrs
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="w-20 shrink-0 text-right">
                  <p className={`text-sm font-bold ${day.earnings > 0 ? 'text-gray-900' : 'text-gray-300'}`}>
                    ${day.earnings}
                  </p>
                </div>

                {day.current && (
                  <Badge className="shrink-0 rounded-full border-transparent bg-emerald-100 px-2 py-0 text-[9px] font-bold text-emerald-700">
                    NOW
                  </Badge>
                )}
              </div>
            ))}
          </div>

          {/* Weekly total */}
          <div className="mt-3 flex items-center justify-between rounded-xl bg-gray-50 p-3">
            <span className="text-sm font-semibold text-gray-700">Weekly Total</span>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                {weeklyBreakdown.reduce((sum, d) => sum + d.hours, 0)} hrs
              </span>
              <span className="text-lg font-bold text-gray-900">
                ${weeklyBreakdown.reduce((sum, d) => sum + d.earnings, 0).toLocaleString()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Snap & Submit — Receipt Capture Card */}
      <Card className="relative overflow-hidden rounded-2xl border-2 border-violet-200 bg-gradient-to-br from-violet-50/80 via-white to-blue-50/80 shadow-sm">
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/5 via-transparent to-blue-500/5" />
        <CardContent className="relative p-6">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-blue-500">
              <Camera className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-gray-900">
                Snap &amp; Submit
              </h3>
              <p className="text-xs text-gray-500">Kill the shoebox. Receipts go digital instantly.</p>
            </div>
          </div>

          {/* Stepper */}
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {snapSteps.map((step, idx) => (
              <div key={step.label} className="relative flex flex-col items-center text-center">
                {/* connector line on sm+ */}
                {idx < snapSteps.length - 1 && (
                  <div className="absolute left-[calc(50%+24px)] top-5 hidden h-0.5 w-[calc(100%-48px)] bg-gradient-to-r from-violet-200 to-blue-200 sm:block" />
                )}
                <div className={`relative z-10 flex h-10 w-10 items-center justify-center rounded-xl ${step.color}`}>
                  <step.icon className="h-5 w-5" />
                </div>
                <p className="mt-2 text-xs font-bold text-gray-900">{step.label}</p>
                <p className="mt-0.5 text-[10px] leading-tight text-gray-500">{step.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-5 rounded-xl bg-white/70 p-3 text-center">
            <p className="text-xs text-gray-600">
              Buy screws at Home Depot. Snap the receipt. Done.
              <span className="font-semibold text-violet-700"> The expense is instantly deducted from that project&apos;s budget.</span>
            </p>
          </div>

          <div className="mt-4 flex justify-center">
            <Button className="h-auto rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-sm hover:from-violet-700 hover:to-blue-700">
              <Camera className="mr-1.5 h-4 w-4" />
              Snap a Receipt Now
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Enhanced Expense Reimbursement */}
        <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold text-gray-900">
                Expenses
              </CardTitle>
              <Button className="h-auto rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700">
                <Camera className="mr-1.5 h-3.5 w-3.5" />
                Upload Receipt
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {pendingExpenses.map((expense) => (
                <div
                  key={expense.id}
                  className="rounded-xl border border-gray-200 p-3 transition-all duration-200 hover:bg-gray-50"
                >
                  <div className="flex items-start gap-3">
                    {/* Receipt / OCR icon */}
                    <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                      expense.ocrParsed ? 'bg-violet-50' : 'bg-gray-100'
                    }`}>
                      {expense.ocrParsed ? (
                        <ScanLine className="h-4 w-4 text-violet-500" />
                      ) : (
                        <Receipt className="h-4 w-4 text-gray-400" />
                      )}
                    </div>

                    {/* Main info */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-sm font-bold text-gray-900">{expense.vendor}</p>
                          <p className="text-xs text-gray-500">{expense.description}</p>
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="text-sm font-bold text-gray-900">{expense.amount}</p>
                          <p className="text-[10px] text-gray-400">{expense.time}</p>
                        </div>
                      </div>

                      {/* Badges row */}
                      <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                        <Badge className={`rounded-full border px-1.5 py-0 text-[9px] font-semibold ${categoryColorMap[expense.category] || 'bg-gray-50 text-gray-700 border-gray-200'}`}>
                          <Tag className="mr-0.5 h-2.5 w-2.5" />
                          {expense.category}
                        </Badge>
                        <Badge className="rounded-full border border-gray-200 bg-gray-50 px-1.5 py-0 text-[9px] font-medium text-gray-600">
                          <Building2 className="mr-0.5 h-2.5 w-2.5" />
                          {expense.project}
                        </Badge>
                        <Badge
                          className={`rounded-full border-transparent px-1.5 py-0 text-[8px] font-semibold ${
                            expense.status === 'approved'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {expense.status === 'approved' ? (
                            <><CheckCircle className="mr-0.5 h-2.5 w-2.5" />Approved</>
                          ) : (
                            <><Clock className="mr-0.5 h-2.5 w-2.5" />Pending PM Approval</>
                          )}
                        </Badge>
                      </div>

                      {/* Budget impact */}
                      <p className="mt-1 text-[10px] text-gray-400">
                        {expense.budgetImpact}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Category Summary */}
            <div className="mt-4 rounded-xl border border-gray-100 bg-gray-50/80 p-3">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                This Week&apos;s Expenses by Category
              </p>
              <div className="space-y-1.5">
                {categoryBreakdown.map((cat) => (
                  <div key={cat.name} className="flex items-center gap-2">
                    <span className="w-20 shrink-0 text-[11px] font-medium text-gray-600">
                      {cat.name}
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="h-2 w-full rounded-full bg-gray-200">
                        <div
                          className={`h-2 rounded-full ${cat.color}`}
                          style={{ width: `${cat.pct}%` }}
                        />
                      </div>
                    </div>
                    <span className="w-14 shrink-0 text-right text-[11px] font-bold text-gray-700">
                      ${cat.amount.toFixed(2)}
                    </span>
                    <span className="w-8 shrink-0 text-right text-[10px] text-gray-400">
                      {cat.pct}%
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-2 flex items-center justify-between border-t border-gray-200 pt-2">
                <span className="text-xs font-bold text-gray-700">Total</span>
                <span className="text-sm font-bold text-gray-900">
                  ${categoryBreakdown.reduce((sum, c) => sum + c.amount, 0).toFixed(2)}
                </span>
              </div>
            </div>

            <p className="mt-3 text-center text-xs text-gray-400">
              Snap a receipt photo &mdash; OCR reads it &mdash; PM approves with one tap &mdash; budget updated instantly
            </p>
          </CardContent>
        </Card>

        {/* Payout History */}
        <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-bold text-gray-900">
                Payout History
              </CardTitle>
              <Badge className="rounded-full border-transparent bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700">
                Next: {walletSummary.nextPayout}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {payoutHistory.map((payout) => (
                <div
                  key={payout.id}
                  className="flex items-center gap-3 rounded-xl border border-gray-200 p-3"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
                    {payout.method === 'Instant Cash Out' ? (
                      <Zap className="h-4 w-4 text-amber-500" />
                    ) : (
                      <Banknote className="h-4 w-4 text-emerald-500" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">{payout.method}</p>
                    <p className="text-xs text-gray-500">{payout.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-emerald-600">{payout.amount}</p>
                    {payout.fee && (
                      <p className="text-[10px] text-gray-400">Fee: {payout.fee}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Payout methods */}
            <div className="mt-4 rounded-xl bg-gray-50 p-3">
              <p className="mb-2 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Payout Methods
              </p>
              <div className="flex gap-2">
                <Badge className="rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-700">
                  <CreditCard className="mr-1 h-3 w-3" />
                  TD Bank ****4821
                </Badge>
                <Badge className="rounded-full border border-gray-200 bg-white px-2.5 py-1 text-xs font-medium text-gray-700">
                  <Smartphone className="mr-1 h-3 w-3" />
                  e-Transfer
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
