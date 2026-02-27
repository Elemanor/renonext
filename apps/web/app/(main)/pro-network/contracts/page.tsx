'use client';

import {
  FileText,
  CheckCircle,
  Clock,
  DollarSign,
  Download,
  Eye,
  Search,
  Filter,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const contracts = [
  {
    id: 'c-1',
    title: 'Drywall Board & Tape — Condo Tower Phase 2',
    sub: 'ProWall Inc.',
    value: '$18,500',
    status: 'active',
    startDate: 'Feb 10, 2026',
    endDate: 'Mar 15, 2026',
    paid: '$7,400',
    remaining: '$11,100',
    milestones: { completed: 2, total: 4 },
  },
  {
    id: 'c-2',
    title: 'Glass & Glazing — Condo Tower Phase 2',
    sub: 'ClearView Glass',
    value: '$68,200',
    status: 'active',
    startDate: 'Feb 12, 2026',
    endDate: 'Apr 30, 2026',
    paid: '$0',
    remaining: '$68,200',
    milestones: { completed: 0, total: 6 },
  },
  {
    id: 'c-3',
    title: 'Concrete Forming — 12 Birch Ave',
    sub: 'FormTech Inc.',
    value: '$26,500',
    status: 'active',
    startDate: 'Feb 8, 2026',
    endDate: 'Mar 1, 2026',
    paid: '$13,250',
    remaining: '$13,250',
    milestones: { completed: 3, total: 5 },
  },
  {
    id: 'c-4',
    title: 'Electrical Rough-In — Lakeview Phase 1',
    sub: 'Spark Electric',
    value: '$28,600',
    status: 'completed',
    startDate: 'Dec 5, 2025',
    endDate: 'Jan 20, 2026',
    paid: '$28,600',
    remaining: '$0',
    milestones: { completed: 5, total: 5 },
  },
  {
    id: 'c-5',
    title: 'Foundation Waterproofing — 88 King St',
    sub: 'DrainPro GTA',
    value: '$14,200',
    status: 'completed',
    startDate: 'Jan 10, 2026',
    endDate: 'Feb 2, 2026',
    paid: '$14,200',
    remaining: '$0',
    milestones: { completed: 3, total: 3 },
  },
];

const statusConfig = {
  active: { label: 'Active', color: 'bg-emerald-50 text-emerald-700' },
  completed: { label: 'Completed', color: 'bg-gray-100 text-gray-600' },
  disputed: { label: 'Disputed', color: 'bg-red-50 text-red-700' },
};

export default function ContractsPage() {
  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Contracts
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Track active contracts, milestones, and payments
          </p>
        </div>
        <Button
          variant="outline"
          className="h-auto rounded-xl border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700"
        >
          <Download className="mr-1.5 h-4 w-4" />
          Export All
        </Button>
      </div>

      {/* Summary */}
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Card className="rounded-2xl border border-gray-200 bg-white shadow-none">
          <CardContent className="p-5">
            <p className="text-sm font-medium text-gray-500">Active Contracts</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {contracts.filter((c) => c.status === 'active').length}
            </p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border border-gray-200 bg-white shadow-none">
          <CardContent className="p-5">
            <p className="text-sm font-medium text-gray-500">Total Value</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">$156K</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border border-gray-200 bg-white shadow-none">
          <CardContent className="p-5">
            <p className="text-sm font-medium text-gray-500">Paid Out</p>
            <p className="mt-1 text-2xl font-bold text-emerald-600">$63,450</p>
          </CardContent>
        </Card>
      </div>

      {/* Contract List */}
      <div className="space-y-3">
        {contracts.map((contract) => {
          const config = statusConfig[contract.status as keyof typeof statusConfig];
          const progressPercent = Math.round(
            (contract.milestones.completed / contract.milestones.total) * 100
          );
          return (
            <Card
              key={contract.id}
              className="rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md"
            >
              <CardContent className="p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900">{contract.title}</h3>
                      <Badge
                        className={`shrink-0 rounded-full border-transparent px-2 py-0.5 text-[10px] font-semibold ${config.color}`}
                      >
                        {config.label}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                      Sub: {contract.sub} — {contract.startDate} to {contract.endDate}
                    </p>

                    {/* Milestone progress */}
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>
                          Milestones: {contract.milestones.completed} of{' '}
                          {contract.milestones.total}
                        </span>
                        <span>{progressPercent}%</span>
                      </div>
                      <div className="mt-1 h-2 w-full rounded-full bg-gray-100">
                        <div
                          className={`h-2 rounded-full transition-all ${
                            progressPercent === 100
                              ? 'bg-gray-400'
                              : 'bg-violet-500'
                          }`}
                          style={{ width: `${progressPercent}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex shrink-0 items-start gap-6">
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">{contract.value}</p>
                      <p className="text-xs text-gray-500">contract value</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-emerald-600">{contract.paid}</p>
                      <p className="text-xs text-gray-500">paid</p>
                    </div>
                    <Button
                      variant="outline"
                      className="h-auto rounded-lg border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700"
                    >
                      <Eye className="mr-1 h-3 w-3" />
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
