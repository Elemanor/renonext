'use client';

import {
  Wallet,
  DollarSign,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  BarChart3,
  Eye,
  Send,
  Banknote,
  PieChart,
  Target,
  Hammer,
  Zap,
  Wrench,
  Paintbrush,
  HardHat,
  ChevronRight,
  Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const portfolioSummary = {
  totalBalance: '$142,800',
  pendingInflows: '$68,200',
  activeProjects: 3,
  totalBudget: '$284,000',
  totalSpent: '$141,200',
  projectedProfit: '$52,400',
  profitMargin: '18.4%',
};

const projectWallets = [
  {
    id: 'pw-1',
    name: 'Condo Tower Phase 2',
    address: '200 Front St W, Toronto',
    budget: 150000,
    spent: 72400,
    labor: 42800,
    materials: 22600,
    subcontracts: 7000,
    inEscrow: 48000,
    projectedProfit: 28600,
    profitMargin: 19.1,
    status: 'on_track',
    trades: ['Drywall', 'Electrical', 'Glazing', 'HVAC'],
    variances: [
      {
        trade: 'Drywall',
        type: 'labor',
        variance: -8,
        message: 'Drywall labor 8% under budget — crew ahead of schedule',
        severity: 'positive',
      },
    ],
  },
  {
    id: 'pw-2',
    name: 'Lakeview Townhomes',
    address: '45 Lakeshore Blvd, Mississauga',
    budget: 84000,
    spent: 48200,
    labor: 28400,
    materials: 14800,
    subcontracts: 5000,
    inEscrow: 20000,
    projectedProfit: 14800,
    profitMargin: 17.6,
    status: 'warning',
    trades: ['Electrical', 'Plumbing', 'Framing'],
    variances: [
      {
        trade: 'Framing',
        type: 'labor',
        variance: 15,
        message: 'Framing labor is 15% over budget. Crew clocked 20 extra hours.',
        severity: 'critical',
      },
      {
        trade: 'Plumbing',
        type: 'materials',
        variance: 7,
        message: 'Plumbing materials 7% over — copper price increase',
        severity: 'warning',
      },
    ],
  },
  {
    id: 'pw-3',
    name: '88 King St Retrofit',
    address: '88 King St E, Toronto',
    budget: 50000,
    spent: 20600,
    labor: 12400,
    materials: 8200,
    subcontracts: 0,
    inEscrow: 15000,
    projectedProfit: 9000,
    profitMargin: 18.0,
    status: 'on_track',
    trades: ['Drain Tile', 'Concrete', 'Waterproofing'],
    variances: [],
  },
];

const recentTransactions = [
  {
    id: 'tx-1',
    type: 'payout',
    description: 'ProWall Inc. — Milestone 2 payout',
    project: 'Condo Tower Phase 2',
    amount: '-$7,400',
    date: 'Feb 7, 2026',
    status: 'completed',
  },
  {
    id: 'tx-2',
    type: 'inflow',
    description: 'Client escrow release — Excavation complete',
    project: '88 King St Retrofit',
    amount: '+$10,000',
    date: 'Feb 6, 2026',
    status: 'completed',
  },
  {
    id: 'tx-3',
    type: 'material',
    description: 'Material order — ABS piping & fittings',
    project: '88 King St Retrofit',
    amount: '-$2,400',
    date: 'Feb 6, 2026',
    status: 'completed',
  },
  {
    id: 'tx-4',
    type: 'payout',
    description: 'Spark Electric — Weekly payout',
    project: 'Lakeview Townhomes',
    amount: '-$4,200',
    date: 'Feb 5, 2026',
    status: 'completed',
  },
  {
    id: 'tx-5',
    type: 'inflow',
    description: 'Client deposit — Milestone 3 escrow',
    project: 'Condo Tower Phase 2',
    amount: '+$18,000',
    date: 'Feb 4, 2026',
    status: 'pending',
  },
  {
    id: 'tx-6',
    type: 'expense',
    description: 'Expense reimbursement — site supplies (J. Chen)',
    project: 'Lakeview Townhomes',
    amount: '-$145',
    date: 'Feb 4, 2026',
    status: 'completed',
  },
];

const statusColors = {
  on_track: { label: 'On Track', bg: 'bg-reno-green-50', text: 'text-reno-green-700', icon: CheckCircle },
  warning: { label: 'Variance Alert', bg: 'bg-amber-50', text: 'text-amber-700', icon: AlertTriangle },
  over_budget: { label: 'Over Budget', bg: 'bg-red-50', text: 'text-red-700', icon: AlertTriangle },
};

const txTypeIcons = {
  payout: { icon: Send, color: 'text-primary-500', bg: 'bg-primary-50' },
  inflow: { icon: ArrowDownRight, color: 'text-reno-green-500', bg: 'bg-reno-green-50' },
  material: { icon: Package, color: 'text-reno-purple-500', bg: 'bg-reno-purple-50' },
  expense: { icon: Banknote, color: 'text-amber-500', bg: 'bg-amber-50' },
};

export default function GCWalletPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">
            Project Wallet
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Real-time job costing, payouts, and cash flow across all projects
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="h-auto rounded-xl border-slate-200 px-4 py-2.5 text-sm font-medium text-slate-700"
          >
            <BarChart3 className="mr-1.5 h-4 w-4" />
            Reports
          </Button>
          <Button className="h-auto rounded-xl bg-reno-purple-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-reno-purple-700">
            <Send className="mr-1.5 h-4 w-4" />
            Send Payout
          </Button>
        </div>
      </div>

      {/* Portfolio Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-2xl border border-slate-200 bg-white shadow-none">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-reno-purple-50 p-2.5">
                <Wallet className="h-5 w-5 text-reno-purple-600" />
              </div>
            </div>
            <p className="mt-3 text-sm font-medium text-slate-500">Total Balance</p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
              {portfolioSummary.totalBalance}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Across {portfolioSummary.activeProjects} projects
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-slate-200 bg-white shadow-none">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-primary-50 p-2.5">
                <Clock className="h-5 w-5 text-primary-600" />
              </div>
            </div>
            <p className="mt-3 text-sm font-medium text-slate-500">Pending Inflows</p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-primary-600">
              {portfolioSummary.pendingInflows}
            </p>
            <p className="mt-1 text-xs text-slate-400">From client escrow releases</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-slate-200 bg-white shadow-none">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-reno-green-50 p-2.5">
                <Target className="h-5 w-5 text-reno-green-600" />
              </div>
              <Badge className="rounded-full border-transparent bg-reno-green-50 px-2 py-0.5 text-xs font-semibold text-reno-green-700">
                <TrendingUp className="mr-0.5 h-3 w-3" />
                {portfolioSummary.profitMargin}
              </Badge>
            </div>
            <p className="mt-3 text-sm font-medium text-slate-500">Projected Profit</p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-reno-green-600">
              {portfolioSummary.projectedProfit}
            </p>
            <p className="mt-1 text-xs text-slate-400">All projects combined</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-amber-200 bg-amber-50/30 shadow-none">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-amber-100 p-2.5">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
            </div>
            <p className="mt-3 text-sm font-medium text-slate-500">Variance Alerts</p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-amber-700">2</p>
            <p className="mt-1 text-xs text-amber-600">Requires investigation</p>
          </CardContent>
        </Card>
      </div>

      {/* Project Wallets */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">Project Wallets</h2>

        {projectWallets.map((project) => {
          const budgetUsedPercent = Math.round((project.spent / project.budget) * 100);
          const config = statusColors[project.status as keyof typeof statusColors];
          const StatusIcon = config.icon;

          return (
            <Card
              key={project.id}
              className="rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md"
            >
              <CardContent className="p-0">
                {/* Project Header */}
                <div className="border-b border-slate-100 p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-slate-900">{project.name}</h3>
                        <Badge
                          className={`shrink-0 rounded-full border-transparent px-2.5 py-0.5 text-[10px] font-semibold ${config.bg} ${config.text}`}
                        >
                          <StatusIcon className="mr-0.5 h-3 w-3" />
                          {config.label}
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm text-slate-500">{project.address}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-slate-900">
                        ${project.budget.toLocaleString()}
                      </p>
                      <p className="text-xs text-slate-500">total budget</p>
                    </div>
                  </div>
                </div>

                {/* Real-Time Job Costing */}
                <div className="border-b border-slate-100 p-5">
                  <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-5">
                    <div>
                      <p className="text-xs font-medium text-slate-500">Spent (Live)</p>
                      <p className="text-lg font-bold text-slate-900">
                        ${project.spent.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500">Labor</p>
                      <p className="text-lg font-bold text-primary-600">
                        ${project.labor.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500">Materials</p>
                      <p className="text-lg font-bold text-reno-purple-600">
                        ${project.materials.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500">In Escrow</p>
                      <p className="text-lg font-bold text-amber-600">
                        ${project.inEscrow.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-medium text-slate-500">Projected Profit</p>
                      <p className="text-lg font-bold text-reno-green-600">
                        ${project.projectedProfit.toLocaleString()}
                        <span className="ml-1 text-xs font-medium">
                          ({project.profitMargin}%)
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* Budget Progress Bar */}
                  <div>
                    <div className="mb-1.5 flex items-center justify-between text-xs">
                      <span className="text-slate-500">Budget used</span>
                      <span className="font-semibold text-slate-700">{budgetUsedPercent}%</span>
                    </div>
                    <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100">
                      <div className="flex h-3">
                        <div
                          className="bg-primary-500 transition-all"
                          style={{ width: `${Math.round((project.labor / project.budget) * 100)}%` }}
                          title="Labor"
                        />
                        <div
                          className="bg-reno-purple-500 transition-all"
                          style={{ width: `${Math.round((project.materials / project.budget) * 100)}%` }}
                          title="Materials"
                        />
                        <div
                          className="bg-amber-500 transition-all"
                          style={{ width: `${Math.round((project.subcontracts / project.budget) * 100)}%` }}
                          title="Sub-contracts"
                        />
                      </div>
                    </div>
                    <div className="mt-1.5 flex items-center gap-4 text-[10px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-primary-500" />
                        Labor
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-reno-purple-500" />
                        Materials
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="h-2 w-2 rounded-full bg-amber-500" />
                        Sub-contracts
                      </span>
                      <span className="ml-auto">
                        ${(project.budget - project.spent).toLocaleString()} remaining
                      </span>
                    </div>
                  </div>
                </div>

                {/* Smart Variance Alerts */}
                {project.variances.length > 0 && (
                  <div className="border-b border-slate-100 p-5">
                    <p className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-400">
                      Smart Variance Alerts
                    </p>
                    <div className="space-y-2">
                      {project.variances.map((v, i) => (
                        <div
                          key={i}
                          className={`flex items-start gap-3 rounded-xl p-3 ${
                            v.severity === 'critical'
                              ? 'border border-red-200 bg-red-50'
                              : v.severity === 'warning'
                                ? 'border border-amber-200 bg-amber-50'
                                : 'border border-reno-green-200 bg-reno-green-50'
                          }`}
                        >
                          {v.severity === 'positive' ? (
                            <TrendingDown className="mt-0.5 h-4 w-4 shrink-0 text-reno-green-500" />
                          ) : (
                            <AlertTriangle
                              className={`mt-0.5 h-4 w-4 shrink-0 ${
                                v.severity === 'critical' ? 'text-red-500' : 'text-amber-500'
                              }`}
                            />
                          )}
                          <div className="min-w-0 flex-1">
                            <p
                              className={`text-sm font-medium ${
                                v.severity === 'critical'
                                  ? 'text-red-800'
                                  : v.severity === 'warning'
                                    ? 'text-amber-800'
                                    : 'text-reno-green-800'
                              }`}
                            >
                              {v.message}
                            </p>
                            <p className="mt-0.5 text-xs text-slate-500">
                              {v.trade} — {v.type} — {v.variance > 0 ? '+' : ''}{v.variance}% vs estimate
                            </p>
                          </div>
                          {v.severity !== 'positive' && (
                            <Button
                              variant="outline"
                              className="h-auto shrink-0 rounded-lg border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700"
                            >
                              Investigate
                            </Button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Active Trades */}
                <div className="flex items-center justify-between p-5">
                  <div className="flex flex-wrap gap-1.5">
                    {project.trades.map((trade) => (
                      <Badge
                        key={trade}
                        className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-0.5 text-[10px] font-medium text-slate-600"
                      >
                        {trade}
                      </Badge>
                    ))}
                  </div>
                  <Button
                    variant="outline"
                    className="h-auto rounded-xl border-slate-200 px-3 py-2 text-xs font-medium text-slate-700"
                  >
                    <Eye className="mr-1 h-3.5 w-3.5" />
                    Full Breakdown
                    <ChevronRight className="ml-1 h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Transactions */}
      <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold text-slate-900">
              Recent Transactions
            </CardTitle>
            <Button
              variant="outline"
              className="h-auto rounded-xl border-slate-200 px-3 py-2 text-xs font-medium text-slate-700"
            >
              View All
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {recentTransactions.map((tx) => {
              const txConfig = txTypeIcons[tx.type as keyof typeof txTypeIcons];
              const TxIcon = txConfig.icon;
              const isInflow = tx.amount.startsWith('+');
              return (
                <div
                  key={tx.id}
                  className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 transition-all duration-200 hover:bg-slate-50"
                >
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${txConfig.bg}`}
                  >
                    <TxIcon className={`h-4 w-4 ${txConfig.color}`} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-slate-900">{tx.description}</p>
                    <p className="text-xs text-slate-500">{tx.project} — {tx.date}</p>
                  </div>
                  <span
                    className={`text-sm font-bold ${
                      isInflow ? 'text-reno-green-600' : 'text-slate-900'
                    }`}
                  >
                    {tx.amount}
                  </span>
                  {tx.status === 'pending' && (
                    <Badge className="rounded-full border-transparent bg-amber-50 px-2 py-0 text-[9px] font-semibold text-amber-700">
                      Pending
                    </Badge>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* The Loop - Closed Economic System */}
      <Card className="rounded-2xl border border-reno-purple-200 bg-gradient-to-br from-reno-purple-50 to-primary-50 shadow-sm">
        <CardContent className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <div className="rounded-xl bg-reno-purple-100 p-2">
              <Wallet className="h-5 w-5 text-reno-purple-600" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900">The RenoNext Loop</h3>
              <p className="text-xs text-slate-500">Money stays in the ecosystem</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <Badge className="rounded-full border-transparent bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm">
              Client pays into Safe
            </Badge>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <Badge className="rounded-full border-transparent bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm">
              GC receives milestone
            </Badge>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <Badge className="rounded-full border-transparent bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm">
              GC pays sub-trades
            </Badge>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <Badge className="rounded-full border-transparent bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm">
              Sub buys materials
            </Badge>
            <ChevronRight className="h-4 w-4 text-slate-400" />
            <Badge className="rounded-full border-transparent bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm">
              Workers get instant pay
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
