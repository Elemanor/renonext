'use client';

import {
  TrendingUp,

  AlertTriangle,
  DollarSign,
  BarChart3,
  Activity,
  Target,
  Gauge,
  ArrowUpRight,
  ArrowDownRight,
  ChevronRight,
  CheckCircle,
  Clock,
  Zap,
  Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Stage {
  name: string;
  budgeted: number;
  actual: number;
  status: 'complete' | 'in_progress' | 'pending';
}

interface Project {
  id: string;
  name: string;
  address: string;
  jobValue: number;
  laborCostLive: number;
  materialCostLive: number;
  subContractCost: number;
  overheadAllocation: number;
  totalCostLive: number;
  currentMargin: number;
  estimatedMargin: number;
  marginStatus: 'healthy' | 'warning' | 'danger';
  percentComplete: number;
  percentSpent: number;
  cpi: number;
  spi: number;
  estimateAtCompletion: number;
  varianceAtCompletion: number;
  dailyLaborBurn: number;
  dailyMaterialBurn: number;
  daysRemaining: number;
  stages: Stage[];
}

const projects: Project[] = [
  {
    id: 'pl-1',
    name: 'Condo Tower Phase 2',
    address: '200 Front St W, Toronto',
    jobValue: 150000,
    laborCostLive: 42800,
    materialCostLive: 22600,
    subContractCost: 7000,
    overheadAllocation: 4200,
    totalCostLive: 76600,
    currentMargin: 48.9,
    estimatedMargin: 52.0,
    marginStatus: 'healthy',
    percentComplete: 55,
    percentSpent: 51,
    cpi: 1.08,
    spi: 1.02,
    estimateAtCompletion: 139200,
    varianceAtCompletion: 10800,
    dailyLaborBurn: 2400,
    dailyMaterialBurn: 800,
    daysRemaining: 32,
    stages: [
      { name: 'Demolition', budgeted: 12000, actual: 11200, status: 'complete' },
      { name: 'Framing', budgeted: 28000, actual: 26400, status: 'complete' },
      { name: 'Electrical Rough-In', budgeted: 22000, actual: 18600, status: 'in_progress' },
      { name: 'Plumbing Rough-In', budgeted: 18000, actual: 12400, status: 'in_progress' },
      { name: 'Drywall', budgeted: 35000, actual: 8000, status: 'in_progress' },
      { name: 'Finishing', budgeted: 25000, actual: 0, status: 'pending' },
      { name: 'Punch List', budgeted: 10000, actual: 0, status: 'pending' },
    ],
  },
  {
    id: 'pl-2',
    name: 'Lakeview Townhomes',
    address: '45 Lakeshore Blvd, Mississauga',
    jobValue: 84000,
    laborCostLive: 28400,
    materialCostLive: 14800,
    subContractCost: 5000,
    overheadAllocation: 2800,
    totalCostLive: 51000,
    currentMargin: 39.3,
    estimatedMargin: 45.0,
    marginStatus: 'warning',
    percentComplete: 50,
    percentSpent: 60.7,
    cpi: 0.82,
    spi: 0.91,
    estimateAtCompletion: 92400,
    varianceAtCompletion: -8400,
    dailyLaborBurn: 3200,
    dailyMaterialBurn: 1100,
    daysRemaining: 18,
    stages: [
      { name: 'Excavation', budgeted: 8000, actual: 8200, status: 'complete' },
      { name: 'Foundation', budgeted: 14000, actual: 15800, status: 'complete' },
      { name: 'Framing', budgeted: 22000, actual: 18600, status: 'in_progress' },
      { name: 'Electrical', budgeted: 16000, actual: 8400, status: 'in_progress' },
      { name: 'Plumbing', budgeted: 12000, actual: 0, status: 'pending' },
      { name: 'Interior Finishing', budgeted: 12000, actual: 0, status: 'pending' },
    ],
  },
  {
    id: 'pl-3',
    name: '88 King St Retrofit',
    address: '88 King St E, Toronto',
    jobValue: 50000,
    laborCostLive: 12400,
    materialCostLive: 8200,
    subContractCost: 0,
    overheadAllocation: 1400,
    totalCostLive: 22000,
    currentMargin: 56.0,
    estimatedMargin: 54.0,
    marginStatus: 'healthy',
    percentComplete: 42,
    percentSpent: 44,
    cpi: 0.95,
    spi: 1.05,
    estimateAtCompletion: 52600,
    varianceAtCompletion: -2600,
    dailyLaborBurn: 1800,
    dailyMaterialBurn: 600,
    daysRemaining: 24,
    stages: [
      { name: 'Assessment', budgeted: 3000, actual: 2800, status: 'complete' },
      { name: 'Drain Tile', budgeted: 15000, actual: 12400, status: 'in_progress' },
      { name: 'Waterproofing Membrane', budgeted: 12000, actual: 4800, status: 'in_progress' },
      { name: 'Concrete Work', budgeted: 10000, actual: 2000, status: 'pending' },
      { name: 'Final Inspection', budgeted: 5000, actual: 0, status: 'pending' },
      { name: 'Landscaping Restore', budgeted: 5000, actual: 0, status: 'pending' },
    ],
  },
];

const marginStatusConfig = {
  healthy: {
    label: 'Healthy',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
    icon: CheckCircle,
  },
  warning: {
    label: 'Warning',
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    border: 'border-amber-200',
    icon: AlertTriangle,
  },
  danger: {
    label: 'Danger',
    bg: 'bg-red-50',
    text: 'text-red-700',
    border: 'border-red-200',
    icon: AlertTriangle,
  },
};

const stageStatusConfig = {
  complete: {
    label: 'Complete',
    bg: 'bg-emerald-50',
    text: 'text-emerald-700',
  },
  in_progress: {
    label: 'In Progress',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
  },
  pending: {
    label: 'Pending',
    bg: 'bg-gray-50',
    text: 'text-gray-500',
  },
};

const totalRevenue = projects.reduce((sum, p) => sum + p.jobValue, 0);
const totalCostLive = projects.reduce((sum, p) => sum + p.totalCostLive, 0);
const portfolioMargin = ((totalRevenue - totalCostLive) / totalRevenue * 100).toFixed(1);
const atRiskCount = projects.filter((p) => p.marginStatus === 'warning' || p.marginStatus === 'danger').length;

function getBurnRateWarning(project: Project): string | null {
  if (project.marginStatus === 'healthy') return null;

  const overBudgetStages = project.stages.filter(
    (s) => s.status === 'complete' && s.actual > s.budgeted
  );

  if (overBudgetStages.length > 0) {
    const worstStage = overBudgetStages.reduce((worst, s) =>
      s.actual - s.budgeted > worst.actual - worst.budgeted ? s : worst
    );
    const overage = worstStage.actual - worstStage.budgeted;
    return `Warning: You are burning cash on the ${worstStage.name} stage. Labor exceeded estimate by $${overage.toLocaleString()}.`;
  }

  const totalLaborBudget = project.stages.reduce((sum, s) => sum + s.budgeted, 0);
  const laborBudgetRemaining = totalLaborBudget - project.totalCostLive;
  const daysOfBudget = Math.floor(laborBudgetRemaining / project.dailyLaborBurn);

  return `At current burn rate ($${project.dailyLaborBurn.toLocaleString()}/day labor), you will exhaust labor budget in ${daysOfBudget} days. ${project.daysRemaining} days of work remain.`;
}

export default function GCFinancialsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Live P&L
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Real-time profit margins — not last month&apos;s numbers
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            className="h-auto rounded-xl border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700"
          >
            <BarChart3 className="mr-1.5 h-4 w-4" />
            Export Report
          </Button>
          <Button className="h-auto rounded-xl bg-violet-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-violet-700">
            <Shield className="mr-1.5 h-4 w-4" />
            Set Alerts
          </Button>
        </div>
      </div>

      {/* Portfolio P&L Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-2xl border border-gray-200 bg-white shadow-none">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-violet-50 p-2.5">
                <DollarSign className="h-5 w-5 text-violet-600" />
              </div>
            </div>
            <p className="mt-3 text-sm font-medium text-gray-500">Total Revenue</p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
              ${totalRevenue.toLocaleString()}
            </p>
            <p className="mt-1 text-xs text-gray-400">
              Across {projects.length} active projects
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-gray-200 bg-white shadow-none">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-blue-50 p-2.5">
                <Activity className="h-5 w-5 text-blue-600" />
              </div>
            </div>
            <p className="mt-3 text-sm font-medium text-gray-500">Total Cost (Live)</p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-blue-600">
              ${totalCostLive.toLocaleString()}
            </p>
            <p className="mt-1 text-xs text-gray-400">GPS clock-ins + platform orders</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-gray-200 bg-white shadow-none">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-emerald-50 p-2.5">
                <Target className="h-5 w-5 text-emerald-600" />
              </div>
              <Badge className="rounded-full border-transparent bg-emerald-50 px-2 py-0.5 text-xs font-semibold text-emerald-700">
                <TrendingUp className="mr-0.5 h-3 w-3" />
                +2.1%
              </Badge>
            </div>
            <p className="mt-3 text-sm font-medium text-gray-500">Portfolio Margin</p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-emerald-600">
              {portfolioMargin}%
            </p>
            <p className="mt-1 text-xs text-gray-400">
              ${(totalRevenue - totalCostLive).toLocaleString()} total profit
            </p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-amber-200 bg-amber-50/30 shadow-none">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-amber-100 p-2.5">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
            </div>
            <p className="mt-3 text-sm font-medium text-gray-500">At-Risk Projects</p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-amber-700">
              {atRiskCount}
            </p>
            <p className="mt-1 text-xs text-amber-600">Margin dropped from estimate</p>
          </CardContent>
        </Card>
      </div>

      {/* Per-Project P&L Cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-gray-900">Per-Project P&L</h2>

        {projects.map((project) => {
          const config = marginStatusConfig[project.marginStatus];
          const StatusIcon = config.icon;
          const marginDollar = project.jobValue - project.totalCostLive;
          const burnWarning = getBurnRateWarning(project);
          const evmGap = project.percentSpent > project.percentComplete;
          const cpiHealthy = project.cpi >= 1.0;

          return (
            <Card
              key={project.id}
              className="rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md"
            >
              <CardContent className="p-0">
                {/* Project Header */}
                <div className="border-b border-gray-100 p-5">
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold text-gray-900">{project.name}</h3>
                        <Badge
                          className={`shrink-0 rounded-full border-transparent px-2.5 py-0.5 text-[10px] font-semibold ${config.bg} ${config.text}`}
                        >
                          <StatusIcon className="mr-0.5 h-3 w-3" />
                          {config.label}
                        </Badge>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{project.address}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">
                        ${project.jobValue.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500">Fixed Price Contract</p>
                    </div>
                  </div>
                </div>

                {/* P&L Section */}
                <div className="border-b border-gray-100 p-5">
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
                    Profit & Loss (Live)
                  </p>
                  <div className="space-y-2">
                    {/* Job Value */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Job Value</span>
                      <span className="text-sm font-semibold text-gray-900">
                        ${project.jobValue.toLocaleString()}
                      </span>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-dashed border-gray-200" />

                    {/* Labor */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Labor Cost (Live)
                        <span className="ml-1 text-[10px] text-gray-400">GPS clock-ins x rates</span>
                      </span>
                      <span className="text-sm font-medium text-red-600">
                        -${project.laborCostLive.toLocaleString()}
                      </span>
                    </div>

                    {/* Materials */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Material Cost (Live)
                        <span className="ml-1 text-[10px] text-gray-400">Platform orders</span>
                      </span>
                      <span className="text-sm font-medium text-red-600">
                        -${project.materialCostLive.toLocaleString()}
                      </span>
                    </div>

                    {/* Sub-Contract */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Sub-Contract Cost</span>
                      <span className="text-sm font-medium text-red-600">
                        -${project.subContractCost.toLocaleString()}
                      </span>
                    </div>

                    {/* Overhead */}
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">Overhead</span>
                      <span className="text-sm font-medium text-red-600">
                        -${project.overheadAllocation.toLocaleString()}
                      </span>
                    </div>

                    {/* Divider */}
                    <div className="border-t border-dashed border-gray-200" />

                    {/* Current Margin - Highlighted */}
                    <div
                      className={`flex items-center justify-between rounded-xl px-3 py-2.5 ${
                        project.marginStatus === 'healthy'
                          ? 'bg-emerald-50'
                          : project.marginStatus === 'warning'
                            ? 'bg-amber-50'
                            : 'bg-red-50'
                      }`}
                    >
                      <span
                        className={`text-sm font-bold ${
                          project.marginStatus === 'healthy'
                            ? 'text-emerald-800'
                            : project.marginStatus === 'warning'
                              ? 'text-amber-800'
                              : 'text-red-800'
                        }`}
                      >
                        Current Margin
                      </span>
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-sm font-bold ${
                            project.marginStatus === 'healthy'
                              ? 'text-emerald-700'
                              : project.marginStatus === 'warning'
                                ? 'text-amber-700'
                                : 'text-red-700'
                          }`}
                        >
                          ${marginDollar.toLocaleString()} ({project.currentMargin}%)
                        </span>
                        {project.marginStatus === 'healthy' ? (
                          <CheckCircle className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <AlertTriangle className="h-4 w-4 text-amber-500" />
                        )}
                      </div>
                    </div>

                    {/* Estimated Margin */}
                    <div className="flex items-center justify-between px-3">
                      <span className="text-xs text-gray-500">Estimated Margin</span>
                      <span className="text-xs font-medium text-gray-500">
                        {project.estimatedMargin}%
                        {project.currentMargin < project.estimatedMargin ? (
                          <span className="ml-1.5 text-amber-600">
                            <ArrowDownRight className="inline h-3 w-3" />
                            {(project.estimatedMargin - project.currentMargin).toFixed(1)}% below
                          </span>
                        ) : (
                          <span className="ml-1.5 text-emerald-600">
                            <ArrowUpRight className="inline h-3 w-3" />
                            {(project.currentMargin - project.estimatedMargin).toFixed(1)}% above
                          </span>
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* EVM Section */}
                <div className="border-b border-gray-100 p-5">
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
                    Earned Value Management
                  </p>

                  {/* Progress Bars */}
                  <div className="space-y-3">
                    {/* Work Done Bar */}
                    <div>
                      <div className="mb-1.5 flex items-center justify-between text-xs">
                        <span className="font-medium text-gray-600">Work Done</span>
                        <span className="font-semibold text-emerald-700">
                          {project.percentComplete}%
                        </span>
                      </div>
                      <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
                        <div
                          className="h-3 rounded-full bg-emerald-500 transition-all"
                          style={{ width: `${project.percentComplete}%` }}
                        />
                      </div>
                    </div>

                    {/* Budget Spent Bar */}
                    <div>
                      <div className="mb-1.5 flex items-center justify-between text-xs">
                        <span className="font-medium text-gray-600">Budget Spent</span>
                        <span
                          className={`font-semibold ${
                            evmGap ? 'text-red-600' : 'text-violet-700'
                          }`}
                        >
                          {project.percentSpent}%
                        </span>
                      </div>
                      <div className="h-3 w-full overflow-hidden rounded-full bg-gray-100">
                        <div
                          className={`h-3 rounded-full transition-all ${
                            evmGap ? 'bg-red-500' : 'bg-violet-500'
                          }`}
                          style={{ width: `${project.percentSpent}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Efficiency Indicator */}
                  <div
                    className={`mt-4 flex items-start gap-3 rounded-xl p-3 ${
                      cpiHealthy
                        ? 'border border-emerald-200 bg-emerald-50'
                        : 'border border-red-200 bg-red-50'
                    }`}
                  >
                    <Gauge
                      className={`mt-0.5 h-4 w-4 shrink-0 ${
                        cpiHealthy ? 'text-emerald-500' : 'text-red-500'
                      }`}
                    />
                    <div className="min-w-0 flex-1">
                      <p
                        className={`text-sm font-medium ${
                          cpiHealthy ? 'text-emerald-800' : 'text-red-800'
                        }`}
                      >
                        Efficiency: {project.cpi.toFixed(2)} —{' '}
                        {cpiHealthy
                          ? 'On track'
                          : `You will lose $${Math.abs(project.varianceAtCompletion).toLocaleString()} unless you speed up.`}
                      </p>
                      <div className="mt-1 flex items-center gap-4 text-xs text-gray-500">
                        <span>
                          CPI:{' '}
                          <span
                            className={`font-semibold ${
                              project.cpi >= 1.0 ? 'text-emerald-700' : 'text-red-600'
                            }`}
                          >
                            {project.cpi.toFixed(2)}
                          </span>
                        </span>
                        <span>
                          SPI:{' '}
                          <span
                            className={`font-semibold ${
                              project.spi >= 1.0 ? 'text-emerald-700' : 'text-red-600'
                            }`}
                          >
                            {project.spi.toFixed(2)}
                          </span>
                        </span>
                        <span>
                          EAC:{' '}
                          <span className="font-semibold text-gray-700">
                            ${project.estimateAtCompletion.toLocaleString()}
                          </span>
                        </span>
                        <span>
                          VAC:{' '}
                          <span
                            className={`font-semibold ${
                              project.varianceAtCompletion >= 0
                                ? 'text-emerald-700'
                                : 'text-red-600'
                            }`}
                          >
                            {project.varianceAtCompletion >= 0 ? '+' : ''}$
                            {project.varianceAtCompletion.toLocaleString()}
                          </span>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Burn Rate Alert */}
                {burnWarning && (
                  <div className="border-b border-gray-100 p-5">
                    <div
                      className={`flex items-start gap-3 rounded-xl p-3 ${
                        project.marginStatus === 'danger'
                          ? 'border border-red-200 bg-red-50'
                          : 'border border-amber-200 bg-amber-50'
                      }`}
                    >
                      <Zap
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          project.marginStatus === 'danger'
                            ? 'text-red-500'
                            : 'text-amber-500'
                        }`}
                      />
                      <div className="min-w-0 flex-1">
                        <p
                          className={`text-sm font-medium ${
                            project.marginStatus === 'danger'
                              ? 'text-red-800'
                              : 'text-amber-800'
                          }`}
                        >
                          {burnWarning}
                        </p>
                        <p className="mt-1 text-xs text-gray-500">
                          Daily burn: ${project.dailyLaborBurn.toLocaleString()} labor +{' '}
                          ${project.dailyMaterialBurn.toLocaleString()} materials ={' '}
                          ${(project.dailyLaborBurn + project.dailyMaterialBurn).toLocaleString()}/day
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        className="h-auto shrink-0 rounded-lg border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700"
                      >
                        Investigate
                      </Button>
                    </div>
                  </div>
                )}

                {/* Stage Breakdown */}
                <div className="p-5">
                  <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
                    Stage Breakdown
                  </p>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-gray-100">
                          <th className="pb-2 pr-4 text-left text-xs font-medium text-gray-500">
                            Stage
                          </th>
                          <th className="pb-2 pr-4 text-right text-xs font-medium text-gray-500">
                            Budgeted
                          </th>
                          <th className="pb-2 pr-4 text-right text-xs font-medium text-gray-500">
                            Actual
                          </th>
                          <th className="pb-2 pr-4 text-right text-xs font-medium text-gray-500">
                            Variance
                          </th>
                          <th className="pb-2 pr-4 text-center text-xs font-medium text-gray-500">
                            Status
                          </th>
                          <th className="pb-2 text-left text-xs font-medium text-gray-500">
                            Progress
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {project.stages.map((stage) => {
                          const variance = stage.budgeted - stage.actual;
                          const stageConfig = stageStatusConfig[stage.status];
                          const progressPercent =
                            stage.status === 'complete'
                              ? 100
                              : stage.status === 'pending'
                                ? 0
                                : stage.budgeted > 0
                                  ? Math.min(
                                      Math.round((stage.actual / stage.budgeted) * 100),
                                      100
                                    )
                                  : 0;

                          return (
                            <tr
                              key={stage.name}
                              className="border-b border-gray-50 last:border-0"
                            >
                              <td className="py-2.5 pr-4 font-medium text-gray-700">
                                {stage.name}
                              </td>
                              <td className="py-2.5 pr-4 text-right text-gray-600">
                                ${stage.budgeted.toLocaleString()}
                              </td>
                              <td className="py-2.5 pr-4 text-right font-medium text-gray-900">
                                ${stage.actual.toLocaleString()}
                              </td>
                              <td className="py-2.5 pr-4 text-right">
                                {stage.actual === 0 ? (
                                  <span className="text-gray-400">--</span>
                                ) : (
                                  <span
                                    className={`font-medium ${
                                      variance >= 0 ? 'text-emerald-600' : 'text-red-600'
                                    }`}
                                  >
                                    {variance >= 0 ? '+' : ''}${variance.toLocaleString()}
                                  </span>
                                )}
                              </td>
                              <td className="py-2.5 pr-4 text-center">
                                <Badge
                                  className={`rounded-full border-transparent px-2 py-0 text-[10px] font-semibold ${stageConfig.bg} ${stageConfig.text}`}
                                >
                                  {stageConfig.label}
                                </Badge>
                              </td>
                              <td className="py-2.5">
                                <div className="flex items-center gap-2">
                                  <div className="h-1.5 w-16 overflow-hidden rounded-full bg-gray-100">
                                    <div
                                      className={`h-1.5 rounded-full transition-all ${
                                        stage.status === 'complete'
                                          ? 'bg-emerald-500'
                                          : stage.status === 'in_progress'
                                            ? 'bg-blue-500'
                                            : 'bg-gray-200'
                                      }`}
                                      style={{ width: `${progressPercent}%` }}
                                    />
                                  </div>
                                  <span className="text-[10px] text-gray-400">
                                    {progressPercent}%
                                  </span>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Card Footer */}
                  <div className="mt-4 flex items-center justify-end">
                    <Button
                      variant="outline"
                      className="h-auto rounded-xl border-gray-200 px-3 py-2 text-xs font-medium text-gray-700"
                    >
                      <BarChart3 className="mr-1 h-3.5 w-3.5" />
                      Full Report
                      <ChevronRight className="ml-1 h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Bottom CTA Card */}
      <Card className="rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-blue-50 shadow-sm">
        <CardContent className="p-6">
          <div className="mb-4 flex items-center gap-2">
            <div className="rounded-xl bg-violet-100 p-2">
              <Zap className="h-5 w-5 text-violet-600" />
            </div>
            <div>
              <h3 className="font-bold text-gray-900">
                QuickBooks Looks Backward. RenoNext Looks Forward.
              </h3>
              <p className="text-xs text-gray-500">Real-time financial intelligence</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-gray-600">
            Traditional accounting tells you what happened last month. RenoNext tells you what&apos;s
            happening right now. Every GPS clock-in, every material order, every sub-trade invoice —
            calculated in real-time so you never get surprised by a loss.
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-2">
            <Badge className="rounded-full border-transparent bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm">
              <Clock className="mr-1 h-3 w-3 text-violet-500" />
              GPS Clock-ins
            </Badge>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <Badge className="rounded-full border-transparent bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm">
              <DollarSign className="mr-1 h-3 w-3 text-violet-500" />
              Live Cost Calc
            </Badge>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <Badge className="rounded-full border-transparent bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm">
              <TrendingUp className="mr-1 h-3 w-3 text-violet-500" />
              Margin Alert
            </Badge>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <Badge className="rounded-full border-transparent bg-white px-3 py-1.5 text-xs font-medium text-gray-700 shadow-sm">
              <Shield className="mr-1 h-3 w-3 text-violet-500" />
              No Surprises
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
