import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/lib/supabase';
import { FileText, CheckCircle2, PenTool, FileEdit, ClipboardCheck, Users, ArrowUpFromLine, Forklift, Shield } from 'lucide-react';
import type { SafetyForm } from '@renonext/shared/types/field';

const STATUS_STYLES: Record<string, string> = {
  draft: 'bg-slate-100 text-slate-700',
  in_progress: 'bg-yellow-100 text-yellow-700',
  pending_signatures: 'bg-orange-100 text-orange-700',
  completed: 'bg-green-100 text-green-700',
  archived: 'bg-slate-100 text-slate-500',
};

const STATUS_FILTERS = [
  { key: 'all', label: 'All' },
  { key: 'draft', label: 'Draft' },
  { key: 'in_progress', label: 'In Progress' },
  { key: 'pending_signatures', label: 'Pending' },
  { key: 'completed', label: 'Completed' },
  { key: 'archived', label: 'Archived' },
] as const;

export function SafetyFormsListPage() {
  const { membership } = useAuth();
  const [forms, setForms] = useState<SafetyForm[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const fetchForms = useCallback(async () => {
    if (!membership?.organization_id) return;
    setLoading(true);
    try {
      let query = supabase
        .from('safety_forms')
        .select('*')
        .eq('organization_id', membership.organization_id)
        .is('deleted_at', null)
        .order('date', { ascending: false })
        .limit(100);

      if (statusFilter !== 'all') {
        query = query.eq('status', statusFilter);
      }

      const { data, error } = await query;
      if (error) throw error;
      setForms((data as SafetyForm[]) ?? []);
    } catch (err) {
      console.error('Failed to fetch safety forms:', err);
    } finally {
      setLoading(false);
    }
  }, [membership?.organization_id, statusFilter]);

  useEffect(() => {
    fetchForms();
  }, [fetchForms]);

  const filtered = forms.filter(
    (f) =>
      !search ||
      f.form_number.toLowerCase().includes(search.toLowerCase()) ||
      f.project_name?.toLowerCase().includes(search.toLowerCase()) ||
      f.site_address?.toLowerCase().includes(search.toLowerCase())
  );

  const totalCount = forms.length;
  const completedCount = forms.filter((f) => f.status === 'completed').length;
  const pendingCount = forms.filter((f) => f.status === 'pending_signatures').length;
  const draftCount = forms.filter((f) => f.status === 'draft').length;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Safety Forms (JSA)</h1>
          <p className="mt-1 text-sm text-slate-500">
            Job Safety Analysis forms with crew sign-off
          </p>
        </div>
        <Link
          to="/safety-forms/new"
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          + New JSA
        </Link>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <FormStatCard icon={FileText} label="Total Forms" value={String(totalCount)} />
        <FormStatCard icon={CheckCircle2} label="Completed" value={String(completedCount)} color="text-green-500" />
        <FormStatCard icon={PenTool} label="Pending Signatures" value={String(pendingCount)} color="text-orange-500" />
        <FormStatCard icon={FileEdit} label="Draft" value={String(draftCount)} />
      </div>

      {/* Quick Create — form types */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
        <Link
          to="/safety-forms/new"
          className="flex items-center gap-3 rounded-xl border bg-white p-3 transition-all duration-200 hover:shadow-sm hover:border-blue-200"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-50">
            <ClipboardCheck className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">JSA Generator</p>
            <p className="text-[11px] text-slate-500">Job Safety Analysis</p>
          </div>
        </Link>
        <Link
          to="/safety-forms/toolbox-meeting"
          className="flex items-center gap-3 rounded-xl border bg-white p-3 transition-all duration-200 hover:shadow-sm hover:border-emerald-200"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-50">
            <Users className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Toolbox Meeting</p>
            <p className="text-[11px] text-slate-500">Weekly safety talk</p>
          </div>
        </Link>
        <Link
          to="/safety-forms/scissor-lift"
          className="flex items-center gap-3 rounded-xl border bg-white p-3 transition-all duration-200 hover:shadow-sm hover:border-amber-200"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-amber-50">
            <ArrowUpFromLine className="h-5 w-5 text-amber-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Scissor Lift</p>
            <p className="text-[11px] text-slate-500">Pre-use inspection</p>
          </div>
        </Link>
        <Link
          to="/safety-forms/forklift"
          className="flex items-center gap-3 rounded-xl border bg-white p-3 transition-all duration-200 hover:shadow-sm hover:border-purple-200"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-purple-50">
            <Forklift className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Forklift</p>
            <p className="text-[11px] text-slate-500">Pre-shift inspection</p>
          </div>
        </Link>
        <Link
          to="/safety-forms/fall-protection"
          className="flex items-center gap-3 rounded-xl border bg-white p-3 transition-all duration-200 hover:shadow-sm hover:border-red-200"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50">
            <Shield className="h-5 w-5 text-red-600" />
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-900">Fall Protection Plan</p>
            <p className="text-[11px] text-slate-500">OSHA requirements</p>
          </div>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="text"
          placeholder="Search forms..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="rounded-md border px-3 py-1.5 text-sm"
        />
        <div className="flex flex-wrap gap-1.5">
          {STATUS_FILTERS.map((sf) => (
            <button
              key={sf.key}
              onClick={() => setStatusFilter(sf.key)}
              className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                statusFilter === sf.key
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {sf.label}
            </button>
          ))}
        </div>
      </div>

      {/* Form List */}
      <div className="overflow-hidden rounded-lg border bg-white">
        {loading ? (
          <div className="p-8 text-center text-sm text-slate-400">Loading...</div>
        ) : filtered.length === 0 ? (
          <div className="p-8 text-center text-sm text-slate-400">
            No safety forms found
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-slate-50 text-left text-xs font-medium text-slate-500">
                <th className="px-4 py-2">Form #</th>
                <th className="px-4 py-2">Date</th>
                <th className="px-4 py-2">Project / Site</th>
                <th className="px-4 py-2">Supervisor</th>
                <th className="px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {filtered.map((form) => (
                <tr key={form.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3">
                    <Link
                      to={`/safety-forms/${form.id}`}
                      className="font-medium text-primary-600 hover:underline"
                    >
                      {form.form_number}
                    </Link>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {format(new Date(form.date), 'MMM d, yyyy')}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {form.project_name || form.site_address || '-'}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {form.crew_supervisor || '-'}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[form.status] ?? STATUS_STYLES.draft}`}
                    >
                      {form.status.replace(/_/g, ' ')}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

function FormStatCard({ icon: Icon, label, value, color }: { icon: React.ElementType; label: string; value: string; color?: string }) {
  return (
    <div className="rounded-xl border bg-white p-3 transition-transform duration-200 hover:scale-[1.02]">
      <Icon className={`mb-1 h-4 w-4 ${color ?? 'text-slate-400'}`} />
      <p className="text-lg font-bold tabular-nums text-slate-900">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}
