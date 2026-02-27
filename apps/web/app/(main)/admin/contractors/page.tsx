'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  Search,
  HardHat,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  ChevronRight,
  Building2,
  MapPin,
  Loader2,
  Users,
  FileSearch,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { GradientIcon } from '@/components/landing/_shared/gradient-icon';
import { ScrollReveal } from '@/components/landing/_animations/scroll-reveal';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

interface ContractorRow {
  user_id: string;
  company_name: string | null;
  city: string | null;
  province: string;
  years_experience: number | null;
  application_status: string;
  application_submitted_at: string | null;
  profile: {
    full_name: string;
    email: string;
  };
}

const statusConfig: Record<
  string,
  { label: string; icon: typeof Clock; color: string; bg: string }
> = {
  pending_review: {
    label: 'Pending Review',
    icon: Clock,
    color: 'bg-amber-100 text-amber-700 border-amber-200',
    bg: 'from-amber-400 to-amber-600',
  },
  approved: {
    label: 'Approved',
    icon: CheckCircle,
    color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    bg: 'from-emerald-400 to-emerald-600',
  },
  rejected: {
    label: 'Rejected',
    icon: XCircle,
    color: 'bg-red-100 text-red-700 border-red-200',
    bg: 'from-red-400 to-red-600',
  },
  changes_requested: {
    label: 'Changes Requested',
    icon: AlertCircle,
    color: 'bg-blue-100 text-blue-700 border-blue-200',
    bg: 'from-blue-400 to-blue-600',
  },
};

export default function AdminContractorsPage() {
  const [supabase] = useState(() => createSupabaseBrowserClient());
  const [contractors, setContractors] = useState<ContractorRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    async function fetch() {
      setLoading(true);
      let query = supabase
        .from('pro_profiles')
        .select(
          'user_id, company_name, city, province, years_experience, application_status, application_submitted_at, profile:profiles!pro_profiles_user_id_fkey(full_name, email)'
        )
        .neq('application_status', 'incomplete')
        .order('application_submitted_at', { ascending: false });

      if (statusFilter !== 'all') {
        query = query.eq('application_status', statusFilter);
      }

      const { data } = await query;

      if (data) {
        const rows = data.map((row: Record<string, unknown>) => {
          const profile = Array.isArray(row.profile) ? row.profile[0] : row.profile;
          return { ...row, profile } as ContractorRow;
        });
        setContractors(rows);
      }
      setLoading(false);
    }

    fetch();
  }, [supabase, statusFilter]);

  const filtered = contractors.filter((c) => {
    if (!search) return true;
    const q = search.toLowerCase();
    return (
      c.company_name?.toLowerCase().includes(q) ||
      c.profile?.full_name?.toLowerCase().includes(q) ||
      c.profile?.email?.toLowerCase().includes(q) ||
      c.city?.toLowerCase().includes(q)
    );
  });

  const counts = useMemo(() => {
    const map: Record<string, number> = { total: contractors.length };
    for (const c of contractors) {
      map[c.application_status] = (map[c.application_status] || 0) + 1;
    }
    return map;
  }, [contractors]);

  const summaryCards = [
    {
      key: 'total',
      label: 'Total',
      count: counts.total || 0,
      icon: Users,
      gradient: 'from-gray-400 to-gray-600',
      text: 'text-gray-700',
    },
    {
      key: 'pending_review',
      label: 'Pending',
      count: counts.pending_review || 0,
      icon: Clock,
      gradient: 'from-amber-400 to-amber-600',
      text: 'text-amber-700',
    },
    {
      key: 'approved',
      label: 'Approved',
      count: counts.approved || 0,
      icon: CheckCircle,
      gradient: 'from-emerald-400 to-emerald-600',
      text: 'text-emerald-700',
    },
    {
      key: 'rejected',
      label: 'Rejected',
      count: counts.rejected || 0,
      icon: XCircle,
      gradient: 'from-red-400 to-red-600',
      text: 'text-red-700',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <ScrollReveal>
        <div className="flex items-start gap-4">
          <GradientIcon
            icon={HardHat}
            gradient="from-reno-green to-reno-green-dark"
            size="md"
            glow
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Contractor Applications
            </h1>
            <p className="text-gray-500 mt-1">
              Review, approve, and manage contractor applications.
            </p>
          </div>
        </div>
      </ScrollReveal>

      {/* Summary Cards */}
      <ScrollReveal delay={0.1}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {summaryCards.map((card) => (
            <Card
              key={card.key}
              className="border-gray-200/60 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group cursor-default"
            >
              <div className={`h-1 w-full bg-gradient-to-r ${card.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />
              <CardContent className="p-4 flex items-center gap-3">
                <card.icon className={`h-5 w-5 ${card.text} shrink-0`} />
                <div>
                  <p className="text-2xl font-bold text-gray-900">{card.count}</p>
                  <p className="text-xs text-gray-500">{card.label}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollReveal>

      {/* Filters */}
      <ScrollReveal delay={0.15}>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-colors group-focus-within:text-reno-green" />
            <Input
              placeholder="Search by name, company, or email..."
              className="pl-10 h-11 rounded-xl border-gray-200 transition-all focus:border-reno-green focus:ring-reno-green/20"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full sm:w-52 h-11 rounded-xl border-gray-200">
              <SelectValue placeholder="All statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending_review">Pending Review</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
              <SelectItem value="changes_requested">Changes Requested</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </ScrollReveal>

      {/* Table */}
      <ScrollReveal delay={0.2}>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-reno-green-dark" />
            <p className="text-sm text-gray-400 mt-3">Loading applications...</p>
          </div>
        ) : filtered.length === 0 ? (
          <Card className="border-gray-200/60 shadow-sm">
            <CardContent className="text-center py-16">
              <div className="inline-flex mb-4">
                <GradientIcon
                  icon={search ? FileSearch : HardHat}
                  gradient="from-gray-300 to-gray-400"
                  size="md"
                />
              </div>
              <p className="font-semibold text-gray-700 text-lg">
                {search ? 'No matching applications' : 'No applications yet'}
              </p>
              <p className="text-sm text-gray-500 mt-1 max-w-sm mx-auto">
                {search
                  ? 'Try adjusting your search term or clearing the filter.'
                  : 'Contractor applications will appear here once submitted.'}
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card className="border-gray-200/60 shadow-xl shadow-gray-200/50 overflow-hidden">
            <div className="h-1 w-full bg-gradient-to-r from-reno-green via-secondary-500 to-reno-green" />
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/60">
                    <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Contractor
                    </th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 hidden md:table-cell">
                      Location
                    </th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 hidden lg:table-cell">
                      Experience
                    </th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Status
                    </th>
                    <th className="px-5 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-gray-500 hidden md:table-cell">
                      Submitted
                    </th>
                    <th className="px-5 py-3.5 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filtered.map((c) => {
                    const status = statusConfig[c.application_status];
                    const StatusIcon = status?.icon || Clock;
                    const initials = (c.profile?.full_name || '?')
                      .split(' ')
                      .map((w) => w[0])
                      .join('')
                      .slice(0, 2)
                      .toUpperCase();

                    return (
                      <tr
                        key={c.user_id}
                        className="transition-colors duration-150 hover:bg-reno-green-light/40 group"
                      >
                        <td className="px-5 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-reno-green-light to-reno-green-light flex items-center justify-center text-xs font-bold text-reno-green-dark shrink-0 ring-2 ring-white shadow-sm">
                              {initials}
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-gray-900 text-sm truncate">
                                {c.profile?.full_name || 'Unknown'}
                              </p>
                              {c.company_name && (
                                <p className="text-xs text-gray-500 flex items-center gap-1 mt-0.5 truncate">
                                  <Building2 className="h-3 w-3 shrink-0" />
                                  {c.company_name}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-4 hidden md:table-cell">
                          {c.city ? (
                            <span className="text-sm text-gray-600 flex items-center gap-1.5">
                              <MapPin className="h-3.5 w-3.5 text-gray-400" />
                              {c.city}, {c.province}
                            </span>
                          ) : (
                            <span className="text-sm text-gray-300">&mdash;</span>
                          )}
                        </td>
                        <td className="px-5 py-4 hidden lg:table-cell">
                          <span className="text-sm text-gray-600">
                            {c.years_experience
                              ? `${c.years_experience} years`
                              : '\u2014'}
                          </span>
                        </td>
                        <td className="px-5 py-4">
                          <Badge
                            variant="outline"
                            className={`inline-flex items-center gap-1.5 text-xs font-medium rounded-full px-2.5 py-0.5 ${status?.color || ''}`}
                          >
                            <StatusIcon className="h-3 w-3" />
                            {status?.label || c.application_status}
                          </Badge>
                        </td>
                        <td className="px-5 py-4 hidden md:table-cell">
                          <span className="text-sm text-gray-500">
                            {c.application_submitted_at
                              ? new Date(
                                  c.application_submitted_at
                                ).toLocaleDateString('en-CA', {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                })
                              : '\u2014'}
                          </span>
                        </td>
                        <td className="px-5 py-4 text-right">
                          <Button
                            asChild
                            size="sm"
                            variant="ghost"
                            className="rounded-lg text-reno-green-dark hover:text-reno-green-dark hover:bg-reno-green-light transition-all"
                          >
                            <Link href={`/admin/contractors/${c.user_id}`}>
                              Review
                              <ChevronRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-0.5" />
                            </Link>
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Card>
        )}
      </ScrollReveal>
    </div>
  );
}
