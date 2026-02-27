'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Eye, Link2, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockContractorProposals, PROPOSAL_STATUS_STYLES } from '@/lib/mock-data/blueprints';
import { formatCurrency } from '@/lib/utils/format';
import type { ProposalStatus } from '@renonext/shared/types';

const statusFilters: Array<{ key: string; label: string }> = [
  { key: 'ALL', label: 'All' },
  { key: 'draft', label: 'Draft' },
  { key: 'sent', label: 'Sent' },
  { key: 'viewed', label: 'Viewed' },
  { key: 'accepted', label: 'Accepted' },
  { key: 'expired', label: 'Expired' },
];

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '—';
  return new Date(dateStr).toLocaleDateString('en-CA', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function ProposalsPage() {
  const [activeStatus, setActiveStatus] = useState('ALL');

  const filtered = activeStatus === 'ALL'
    ? mockContractorProposals
    : mockContractorProposals.filter((p) => p.status === activeStatus);

  const total = mockContractorProposals.length;
  const active = mockContractorProposals.filter((p) => p.status === 'sent' || p.status === 'viewed').length;
  const accepted = mockContractorProposals.filter((p) => p.status === 'accepted').length;
  const totalValue = mockContractorProposals.reduce((sum, p) => sum + (p.estimated_cost ?? 0), 0);

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            My Proposals
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Track sent proposals and create new ones
          </p>
        </div>
        <Link href="/pro-network/proposals/new">
          <Button className="h-auto rounded-xl bg-violet-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-violet-700 hover:shadow-md">
            <Plus className="mr-1.5 h-4 w-4" />
            Create New Proposal
          </Button>
        </Link>
      </div>

      {/* Summary cards */}
      <div className="mb-6 grid gap-4 sm:grid-cols-4">
        <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <CardContent className="p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Total</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{total}</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <CardContent className="p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Active</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{active}</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <CardContent className="p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Accepted</p>
            <p className="mt-1 text-2xl font-bold text-emerald-600">{accepted}</p>
          </CardContent>
        </Card>
        <Card className="rounded-2xl border border-gray-200 bg-white shadow-sm">
          <CardContent className="p-4">
            <p className="text-xs font-medium uppercase tracking-wider text-gray-500">Total Value</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">{formatCurrency(totalValue)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Status filter pills */}
      <div className="mb-6 flex flex-wrap gap-1.5">
        {statusFilters.map((opt) => (
          <Badge
            key={opt.key}
            className={`cursor-pointer rounded-full px-3 py-1 text-xs font-medium transition-all ${
              activeStatus === opt.key
                ? 'border-transparent bg-violet-100 text-violet-700'
                : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => setActiveStatus(opt.key)}
          >
            {opt.label}
          </Badge>
        ))}
      </div>

      {/* Proposal list */}
      <div className="space-y-3">
        {filtered.map((proposal) => {
          const style = PROPOSAL_STATUS_STYLES[proposal.status as ProposalStatus];
          return (
            <Card
              key={proposal.id}
              className="rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md"
            >
              <CardContent className="p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-sm font-bold text-gray-900">{proposal.title}</h3>
                      {style && (
                        <Badge className={`shrink-0 rounded-full border-transparent px-2.5 py-0.5 text-[10px] font-semibold ${style.bg} ${style.text}`}>
                          <span className={`mr-1 inline-block h-1.5 w-1.5 rounded-full ${style.dot}`} />
                          {style.label}
                        </Badge>
                      )}
                    </div>

                    {/* Meta dates */}
                    <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        Created {formatDate(proposal.created_at)}
                      </span>
                      {proposal.sent_at && (
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          Sent {formatDate(proposal.sent_at)}
                        </span>
                      )}
                      {proposal.viewed_at && (
                        <span className="flex items-center gap-1">
                          <Eye className="h-3 w-3" />
                          Viewed {formatDate(proposal.viewed_at)}
                        </span>
                      )}
                      {proposal.expires_at && (
                        <span className="text-gray-400">
                          Expires {formatDate(proposal.expires_at)}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Cost + duration */}
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      {proposal.estimated_cost ? formatCurrency(proposal.estimated_cost) : '—'}
                    </p>
                    {proposal.estimated_duration_days && (
                      <p className="text-xs text-gray-500">
                        {proposal.estimated_duration_days} days
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-3 flex items-center gap-2">
                  {proposal.status !== 'draft' && (
                    <Link href={`/proposal/${proposal.public_token}`}>
                      <Button
                        variant="outline"
                        className="h-auto rounded-lg border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700"
                      >
                        <Eye className="mr-1 h-3 w-3" />
                        View
                      </Button>
                    </Link>
                  )}
                  {proposal.status === 'draft' && (
                    <Link href={`/pro-network/proposals/new?blueprintId=${proposal.sequence_id}`}>
                      <Button
                        variant="outline"
                        className="h-auto rounded-lg border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700"
                      >
                        Continue Editing
                      </Button>
                    </Link>
                  )}
                  {proposal.public_token && proposal.status !== 'draft' && (
                    <Button
                      variant="outline"
                      className="h-auto rounded-lg border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700"
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `${window.location.origin}/proposal/${proposal.public_token}`
                        );
                        window.alert('Link copied to clipboard');
                      }}
                    >
                      <Link2 className="mr-1 h-3 w-3" />
                      Copy Link
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}

        {filtered.length === 0 && (
          <div className="rounded-2xl border border-dashed border-gray-300 py-12 text-center">
            <p className="text-sm text-gray-500">No proposals match this filter</p>
          </div>
        )}
      </div>
    </div>
  );
}
