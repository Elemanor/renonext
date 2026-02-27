'use client';

import {
  Wallet,
  Shield,
  Lock,
  CheckCircle,
  Clock,
  DollarSign,
  ArrowRight,
  Eye,
  Download,
  AlertTriangle,
  Star,
  Camera,
  FileText,
  Banknote,
  ChevronRight,
  CreditCard,
  TrendingUp,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const vaultSummary = {
  totalDeposited: '$58,000',
  inEscrow: '$32,500',
  released: '$20,500',
  refundable: '$5,000',
  activeProjects: 2,
};

const projects = [
  {
    id: 'ev-1',
    name: 'Basement Waterproofing',
    address: '42 Maple Drive, Toronto',
    contractor: 'David P. — Licensed, P.Eng Verified',
    contractorRating: 4.9,
    contractorAvatar: 'D',
    contractorColor: 'bg-blue-600',
    totalValue: 38000,
    deposited: 38000,
    released: 20500,
    inEscrow: 12500,
    refundable: 5000,
    milestones: [
      {
        name: 'Excavation Complete',
        amount: 5000,
        status: 'released',
        date: 'Jan 20, 2026',
        photos: 4,
        inspectionPassed: true,
      },
      {
        name: 'Foundation Membrane Applied',
        amount: 8000,
        status: 'released',
        date: 'Jan 28, 2026',
        photos: 6,
        inspectionPassed: true,
      },
      {
        name: 'Drain Tile Installed',
        amount: 7500,
        status: 'released',
        date: 'Feb 3, 2026',
        photos: 5,
        inspectionPassed: true,
      },
      {
        name: 'Backfill & Grading',
        amount: 7500,
        status: 'in_progress',
        date: null,
        photos: 2,
        inspectionPassed: false,
      },
      {
        name: 'Final Inspection & Landscaping',
        amount: 5000,
        status: 'locked',
        date: null,
        photos: 0,
        inspectionPassed: false,
      },
      {
        name: 'Warranty Holdback (90 days)',
        amount: 5000,
        status: 'holdback',
        date: null,
        photos: 0,
        inspectionPassed: false,
      },
    ],
  },
  {
    id: 'ev-2',
    name: 'Electrical Panel Upgrade',
    address: '42 Maple Drive, Toronto',
    contractor: 'Marcus J. — ESA Licensed',
    contractorRating: 4.9,
    contractorAvatar: 'M',
    contractorColor: 'bg-amber-600',
    totalValue: 20000,
    deposited: 20000,
    released: 0,
    inEscrow: 20000,
    refundable: 0,
    milestones: [
      {
        name: 'Permit & Panel Procurement',
        amount: 8000,
        status: 'in_progress',
        date: null,
        photos: 1,
        inspectionPassed: false,
      },
      {
        name: 'Rough-In & Wiring',
        amount: 6000,
        status: 'locked',
        date: null,
        photos: 0,
        inspectionPassed: false,
      },
      {
        name: 'ESA Inspection & Activation',
        amount: 4000,
        status: 'locked',
        date: null,
        photos: 0,
        inspectionPassed: false,
      },
      {
        name: 'Final Inspection',
        amount: 2000,
        status: 'locked',
        date: null,
        photos: 0,
        inspectionPassed: false,
      },
    ],
  },
];

const milestoneStatusConfig = {
  released: {
    label: 'Released',
    color: 'bg-emerald-50 text-emerald-700',
    icon: CheckCircle,
    iconColor: 'text-emerald-500',
  },
  in_progress: {
    label: 'In Progress',
    color: 'bg-amber-50 text-amber-700',
    icon: Clock,
    iconColor: 'text-amber-500',
  },
  locked: {
    label: 'Locked in Safe',
    color: 'bg-blue-50 text-blue-700',
    icon: Lock,
    iconColor: 'text-blue-500',
  },
  holdback: {
    label: 'Holdback',
    color: 'bg-violet-50 text-violet-700',
    icon: Shield,
    iconColor: 'text-violet-500',
  },
};

export default function ClientEscrowVaultPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            RenoNext Safe
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Your money is protected until the work is proven
          </p>
        </div>
        <Button
          variant="outline"
          className="h-auto rounded-xl border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700"
        >
          <Download className="mr-1.5 h-4 w-4" />
          Download Statement
        </Button>
      </div>

      {/* Vault Summary */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card className="rounded-2xl border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-white shadow-none">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-blue-100 p-2.5">
                <Lock className="h-5 w-5 text-blue-600" />
              </div>
              <Shield className="h-5 w-5 text-blue-300" />
            </div>
            <p className="mt-3 text-sm font-medium text-gray-500">In the Safe</p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-blue-700">
              {vaultSummary.inEscrow}
            </p>
            <p className="mt-1 text-xs text-blue-500">Protected until milestones verified</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-emerald-200 bg-emerald-50/30 shadow-none">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-emerald-100 p-2.5">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
            <p className="mt-3 text-sm font-medium text-gray-500">Released to Pros</p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-emerald-700">
              {vaultSummary.released}
            </p>
            <p className="mt-1 text-xs text-gray-400">Work verified & approved</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-gray-200 bg-white shadow-none">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-gray-100 p-2.5">
                <DollarSign className="h-5 w-5 text-gray-600" />
              </div>
            </div>
            <p className="mt-3 text-sm font-medium text-gray-500">Total Deposited</p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-gray-900">
              {vaultSummary.totalDeposited}
            </p>
            <p className="mt-1 text-xs text-gray-400">{vaultSummary.activeProjects} active projects</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-violet-200 bg-violet-50/30 shadow-none">
          <CardContent className="p-5">
            <div className="flex items-center justify-between">
              <div className="rounded-xl bg-violet-100 p-2.5">
                <Shield className="h-5 w-5 text-violet-600" />
              </div>
            </div>
            <p className="mt-3 text-sm font-medium text-gray-500">Warranty Holdback</p>
            <p className="mt-1 text-2xl font-bold tracking-tight text-violet-700">
              {vaultSummary.refundable}
            </p>
            <p className="mt-1 text-xs text-gray-400">Released after 90-day warranty</p>
          </CardContent>
        </Card>
      </div>

      {/* Trust Banner */}
      <Card className="rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50 to-white shadow-none">
        <CardContent className="flex items-center gap-4 p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-100">
            <Shield className="h-5 w-5 text-blue-600" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-gray-900">
              Your money never touches the contractor&apos;s account
            </p>
            <p className="text-xs text-gray-500">
              Funds are held in the RenoNext Safe and only released when you approve completed milestones
            </p>
          </div>
          <Badge className="shrink-0 rounded-full border-transparent bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
            <Lock className="mr-1 h-3 w-3" />
            Bank-Grade Security
          </Badge>
        </CardContent>
      </Card>

      {/* Project Escrow Details */}
      {projects.map((project) => {
        const releasedPercent = Math.round((project.released / project.totalValue) * 100);
        const escrowPercent = Math.round((project.inEscrow / project.totalValue) * 100);

        return (
          <Card
            key={project.id}
            className="rounded-2xl border border-gray-200 bg-white shadow-sm"
          >
            <CardContent className="p-0">
              {/* Project Header */}
              <div className="border-b border-gray-100 p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{project.name}</h3>
                    <p className="text-sm text-gray-500">{project.address}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <div
                        className={`flex h-7 w-7 items-center justify-center rounded-full ${project.contractorColor} text-[10px] font-bold text-white`}
                      >
                        {project.contractorAvatar}
                      </div>
                      <span className="text-sm text-gray-600">{project.contractor}</span>
                      <div className="flex items-center gap-0.5">
                        <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
                        <span className="text-xs text-gray-500">{project.contractorRating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">
                      ${project.totalValue.toLocaleString()}
                    </p>
                    <p className="text-xs text-gray-500">contract value</p>
                  </div>
                </div>

                {/* Fund Allocation Bar */}
                <div className="mt-4">
                  <div className="h-4 w-full overflow-hidden rounded-full bg-gray-100">
                    <div className="flex h-4">
                      <div
                        className="bg-emerald-500"
                        style={{ width: `${releasedPercent}%` }}
                      />
                      <div
                        className="bg-blue-500"
                        style={{ width: `${escrowPercent}%` }}
                      />
                    </div>
                  </div>
                  <div className="mt-2 flex items-center gap-6 text-xs">
                    <span className="flex items-center gap-1 text-emerald-600">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" />
                      Released: ${project.released.toLocaleString()}
                    </span>
                    <span className="flex items-center gap-1 text-blue-600">
                      <span className="h-2 w-2 rounded-full bg-blue-500" />
                      In Safe: ${project.inEscrow.toLocaleString()}
                    </span>
                    {project.refundable > 0 && (
                      <span className="flex items-center gap-1 text-violet-600">
                        <span className="h-2 w-2 rounded-full bg-violet-500" />
                        Holdback: ${project.refundable.toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Milestones */}
              <div className="p-5">
                <p className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-400">
                  Milestone Fund Allocation
                </p>
                <div className="space-y-2">
                  {project.milestones.map((milestone, i) => {
                    const config = milestoneStatusConfig[milestone.status as keyof typeof milestoneStatusConfig];
                    const StatusIcon = config.icon;
                    return (
                      <div
                        key={i}
                        className={`flex items-center gap-3 rounded-xl border p-3 ${
                          milestone.status === 'released'
                            ? 'border-emerald-100 bg-emerald-50/30'
                            : milestone.status === 'in_progress'
                              ? 'border-amber-200 bg-amber-50/30'
                              : milestone.status === 'holdback'
                                ? 'border-violet-100 bg-violet-50/20'
                                : 'border-gray-200'
                        }`}
                      >
                        {/* Status icon */}
                        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                          milestone.status === 'released'
                            ? 'bg-emerald-100'
                            : milestone.status === 'in_progress'
                              ? 'bg-amber-100 ring-2 ring-amber-300'
                              : milestone.status === 'holdback'
                                ? 'bg-violet-100'
                                : 'bg-gray-100'
                        }`}>
                          <StatusIcon className={`h-4 w-4 ${config.iconColor}`} />
                        </div>

                        {/* Milestone info */}
                        <div className="min-w-0 flex-1">
                          <p className={`text-sm font-medium ${
                            milestone.status === 'locked' ? 'text-gray-400' : 'text-gray-900'
                          }`}>
                            {milestone.name}
                          </p>
                          <div className="mt-0.5 flex items-center gap-2 text-xs text-gray-500">
                            {milestone.date && <span>{milestone.date}</span>}
                            {milestone.photos > 0 && (
                              <span className="flex items-center gap-0.5">
                                <Camera className="h-3 w-3" />
                                {milestone.photos} photos
                              </span>
                            )}
                            {milestone.inspectionPassed && (
                              <Badge className="rounded-full border-transparent bg-emerald-50 px-1.5 py-0 text-[8px] font-bold text-emerald-700">
                                <CheckCircle className="mr-0.5 h-2.5 w-2.5" />
                                Inspection Passed
                              </Badge>
                            )}
                          </div>
                        </div>

                        {/* Amount */}
                        <div className="text-right">
                          <p className={`text-sm font-bold ${
                            milestone.status === 'released'
                              ? 'text-emerald-600'
                              : milestone.status === 'in_progress'
                                ? 'text-amber-600'
                                : milestone.status === 'holdback'
                                  ? 'text-violet-600'
                                  : 'text-gray-400'
                          }`}>
                            ${milestone.amount.toLocaleString()}
                          </p>
                          <Badge
                            className={`rounded-full border-transparent px-1.5 py-0 text-[8px] font-semibold ${config.color}`}
                          >
                            {config.label}
                          </Badge>
                        </div>

                        {/* Approve button for in-progress */}
                        {milestone.status === 'in_progress' && (
                          <Button
                            className="h-auto shrink-0 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700"
                          >
                            Approve & Release
                          </Button>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* How It Works */}
      <Card className="rounded-2xl border border-gray-200 bg-gray-50 shadow-none">
        <CardContent className="p-6">
          <h3 className="mb-4 text-center text-sm font-bold uppercase tracking-wider text-gray-400">
            How the RenoNext Safe Works
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-3 text-sm">
            <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm">
              <CreditCard className="h-4 w-4 text-blue-500" />
              <span className="font-medium text-gray-700">You deposit</span>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm">
              <Lock className="h-4 w-4 text-blue-500" />
              <span className="font-medium text-gray-700">Held in Safe</span>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm">
              <Camera className="h-4 w-4 text-amber-500" />
              <span className="font-medium text-gray-700">Pro completes work</span>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm">
              <CheckCircle className="h-4 w-4 text-emerald-500" />
              <span className="font-medium text-gray-700">You approve</span>
            </div>
            <ChevronRight className="h-4 w-4 text-gray-400" />
            <div className="flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-2 shadow-sm">
              <Banknote className="h-4 w-4 text-emerald-500" />
              <span className="font-medium text-gray-700">Funds released</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
