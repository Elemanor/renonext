'use client';

import { useState } from 'react';
import {
  DollarSign,
  TrendingUp,
  Clock,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Download,
} from 'lucide-react';
import { StatsCard } from '@/components/stats-card';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { WebBarChart } from '@/components/charts/bar-chart';
import { WebLineChart } from '@/components/charts/line-chart';
import { CHART_COLORS } from '@renonext/shared/utils/chart-theme';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';

const earningsStats = [
  {
    icon: DollarSign,
    label: 'Total Earnings',
    value: '$24,350',
    trend: { value: 12, isPositive: true },
    iconColor: 'text-green-600',
    iconBg: 'bg-green-50',
  },
  {
    icon: TrendingUp,
    label: 'This Month',
    value: '$3,280',
    trend: { value: 8, isPositive: true },
    iconColor: 'text-blue-600',
    iconBg: 'bg-blue-50',
  },
  {
    icon: Clock,
    label: 'Pending',
    value: '$650',
    iconColor: 'text-amber-600',
    iconBg: 'bg-amber-50',
  },
  {
    icon: CreditCard,
    label: 'Next Payout',
    value: '$1,450',
    iconColor: 'text-purple-600',
    iconBg: 'bg-purple-50',
  },
];

const months = [
  { name: 'Jan', amount: 1200 },
  { name: 'Feb', amount: 1500 },
  { name: 'Mar', amount: 1800 },
  { name: 'Apr', amount: 2100 },
  { name: 'May', amount: 1600 },
  { name: 'Jun', amount: 2400 },
  { name: 'Jul', amount: 1800 },
  { name: 'Aug', amount: 2200 },
  { name: 'Sep', amount: 2800 },
  { name: 'Oct', amount: 3100 },
  { name: 'Nov', amount: 2900 },
  { name: 'Dec', amount: 3280 },
];

const incomeVsPayout = [
  { month: 'Jan', income: 1200, payout: 1000 },
  { month: 'Feb', income: 1500, payout: 1200 },
  { month: 'Mar', income: 1800, payout: 1500 },
  { month: 'Apr', income: 2100, payout: 1800 },
  { month: 'May', income: 1600, payout: 1600 },
  { month: 'Jun', income: 2400, payout: 2000 },
  { month: 'Jul', income: 1800, payout: 1800 },
  { month: 'Aug', income: 2200, payout: 2000 },
  { month: 'Sep', income: 2800, payout: 2400 },
  { month: 'Oct', income: 3100, payout: 2800 },
  { month: 'Nov', income: 2900, payout: 2900 },
  { month: 'Dec', income: 3280, payout: 2500 },
];

const transactions = [
  {
    id: '1',
    description: 'Kitchen faucet repair',
    client: 'John Smith',
    amount: 250,
    type: 'income' as const,
    date: '2024-12-01',
    status: 'completed',
  },
  {
    id: '2',
    description: 'Payout to bank account',
    client: null,
    amount: 1450,
    type: 'payout' as const,
    date: '2024-11-30',
    status: 'completed',
  },
  {
    id: '3',
    description: 'Bathroom rewiring',
    client: 'Jennifer S.',
    amount: 450,
    type: 'income' as const,
    date: '2024-11-28',
    status: 'completed',
  },
  {
    id: '4',
    description: 'EV charger installation',
    client: 'Robert K.',
    amount: 380,
    type: 'income' as const,
    date: '2024-11-25',
    status: 'completed',
  },
  {
    id: '5',
    description: 'Panel upgrade - 200A',
    client: 'Linda M.',
    amount: 650,
    type: 'income' as const,
    date: '2024-11-20',
    status: 'pending',
  },
];

export default function EarningsPage() {
  const [filterPeriod, setFilterPeriod] = useState('all');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Earnings</h1>
        <Button variant="outline" className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50">
          <Download className="h-4 w-4" />
          Export
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {earningsStats.map((stat) => (
          <StatsCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Monthly Earnings Bar Chart */}
      <WebBarChart
        title="Monthly Earnings"
        data={months}
        xKey="name"
        yKeys={['amount']}
        height={220}
        colors={[CHART_COLORS.primary]}
        formatter={(v) => `$${Number(v).toLocaleString()}`}
        ariaLabel="Monthly earnings bar chart"
      />

      {/* Income vs Payouts Line Chart */}
      <WebLineChart
        title="Income vs Payouts"
        data={incomeVsPayout}
        xKey="month"
        yKeys={['income', 'payout']}
        height={180}
        colors={[CHART_COLORS.success, CHART_COLORS.slate]}
        formatter={(v, name) => `$${Number(v).toLocaleString()} (${name})`}
        ariaLabel="Income vs payout line chart"
      />

      {/* Transactions */}
      <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold text-gray-900">Transactions</CardTitle>
            <Select value={filterPeriod} onValueChange={setFilterPeriod}>
              <SelectTrigger className="w-[140px] rounded-xl border border-gray-200 px-3 py-2 text-sm transition-all duration-200 focus:border-reno-green focus:ring-2 focus:ring-reno-green-light">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow className="border-b border-gray-100">
                <TableHead className="text-xs font-bold uppercase tracking-widest text-gray-400">Description</TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-widest text-gray-400">Date</TableHead>
                <TableHead className="text-xs font-bold uppercase tracking-widest text-gray-400">Status</TableHead>
                <TableHead className="text-right text-xs font-bold uppercase tracking-widest text-gray-400">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id} className="border-b border-gray-100 last:border-0">
                  <TableCell className="py-4">
                    <p className="text-sm font-medium text-gray-900">
                      {tx.description}
                    </p>
                    {tx.client && (
                      <p className="text-xs text-gray-500">{tx.client}</p>
                    )}
                  </TableCell>
                  <TableCell className="py-4 text-sm text-gray-500">
                    {new Date(tx.date).toLocaleDateString('en-CA', {
                      month: 'short',
                      day: 'numeric',
                    })}
                  </TableCell>
                  <TableCell className="py-4">
                    <Badge
                      className={`rounded-full px-2.5 py-0.5 text-xs font-medium border-transparent ${
                        tx.status === 'completed'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}
                    >
                      {tx.status === 'completed' ? 'Completed' : 'Pending'}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-4 text-right">
                    <span
                      className={`flex items-center justify-end gap-1 text-sm font-semibold ${
                        tx.type === 'income'
                          ? 'text-green-600'
                          : 'text-gray-900'
                      }`}
                    >
                      {tx.type === 'income' ? (
                        <ArrowUpRight className="h-4 w-4" />
                      ) : (
                        <ArrowDownRight className="h-4 w-4" />
                      )}
                      ${tx.amount.toLocaleString()}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Payout Settings */}
      <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-gray-900">
            Payout Settings
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between rounded-xl border border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
                <CreditCard className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  Bank Account ending in 4567
                </p>
                <p className="text-xs text-gray-500">
                  Weekly payouts every Friday
                </p>
              </div>
            </div>
            <Button variant="outline" className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50">
              Update
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
