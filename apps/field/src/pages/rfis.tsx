import { useState, useEffect, useCallback, useMemo } from 'react';
import { format } from 'date-fns';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/lib/supabase';
import { isDemoMode } from '@renonext/shared/utils/demo-mode';
import { MOCK_RFIS } from '@/lib/mock/rfis';
import { FieldPieChart } from '@/components/charts/pie-chart';
import { Clock } from 'lucide-react';
import type { FieldRFI } from '@renonext/shared/types/field';

const STATUS_STYLES: Record<string, string> = {
  draft: 'bg-slate-100 text-slate-600',
  open: 'bg-blue-100 text-blue-700',
  in_review: 'bg-yellow-100 text-yellow-700',
  answered: 'bg-green-100 text-green-700',
  closed: 'bg-slate-100 text-slate-500',
};

const PRIORITY_STYLES: Record<string, string> = {
  low: 'bg-slate-100 text-slate-600',
  medium: 'bg-blue-100 text-blue-600',
  high: 'bg-orange-100 text-orange-700',
  urgent: 'bg-red-100 text-red-700',
};

export function RFIsPage() {
  const { user, membership } = useAuth();
  const [rfis, setRfis] = useState<FieldRFI[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedRfi, setSelectedRfi] = useState<FieldRFI | null>(null);
  const [subject, setSubject] = useState('');
  const [question, setQuestion] = useState('');
  const [priority, setPriority] = useState('medium');
  const [saving, setSaving] = useState(false);
  const [responseText, setResponseText] = useState('');

  const demo = isDemoMode();
  const mock = MOCK_RFIS;

  const fetchRfis = useCallback(async () => {
    if (!membership?.organization_id) return;
    setLoading(true);
    let query = supabase
      .from('field_rfis')
      .select('*')
      .eq('organization_id', membership.organization_id)
      .is('deleted_at', null)
      .order('created_at', { ascending: false });
    if (statusFilter !== 'all') query = query.eq('status', statusFilter);
    const { data, error } = await query;
    if (!error) setRfis((data as FieldRFI[]) ?? []);
    setLoading(false);
  }, [membership?.organization_id, statusFilter]);

  useEffect(() => { fetchRfis(); }, [fetchRfis]);

  async function handleCreate() {
    if (!user || !membership?.organization_id || !subject.trim()) return;
    setSaving(true);
    const { data: projects } = await supabase
      .from('projects').select('id').eq('organization_id', membership.organization_id).limit(1);
    if (!projects?.length) { setSaving(false); return; }
    const rfiNumber = `RFI-${format(new Date(), 'yyyyMMdd')}-${String(rfis.length + 1).padStart(3, '0')}`;
    const { error } = await supabase.from('field_rfis').insert({
      organization_id: membership.organization_id,
      project_id: projects[0].id,
      rfi_number: rfiNumber,
      subject: subject.trim(),
      question: question.trim(),
      priority,
      created_by_id: user.id,
    });
    if (!error) { setShowCreate(false); setSubject(''); setQuestion(''); fetchRfis(); }
    setSaving(false);
  }

  async function handleRespond() {
    if (!selectedRfi || !responseText.trim() || !user) return;
    setSaving(true);
    await supabase.from('field_rfis').update({
      response: responseText.trim(),
      responded_by_id: user.id,
      responded_at: new Date().toISOString(),
      status: 'answered',
    }).eq('id', selectedRfi.id);
    await supabase.from('field_rfi_communications').insert({
      rfi_id: selectedRfi.id, sender_id: user.id, message: responseText.trim(), message_type: 'response',
    });
    setSelectedRfi(null); setResponseText(''); setSaving(false); fetchRfis();
  }

  const showMock = demo || rfis.length === 0;
  const openCount = showMock
    ? mock.items.filter((r) => r.status === 'open').length
    : rfis.filter((r) => r.status === 'open').length;
  const answeredCount = showMock
    ? mock.items.filter((r) => r.status === 'answered').length
    : rfis.filter((r) => r.status === 'answered').length;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">RFIs</h1>
          <p className="mt-1 text-sm text-slate-500">
            {openCount} open · {answeredCount} answered
          </p>
        </div>
        <button
          onClick={() => setShowCreate(true)}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          New RFI
        </button>
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <h2 className="mb-2 text-sm font-semibold text-slate-900">Status Distribution</h2>
          <FieldPieChart
            data={mock.statusDistribution}
            height={160}
            ariaLabel="RFI status distribution pie chart"
          />
        </div>
        <div className="flex items-center justify-center rounded-xl border bg-white p-4">
          <div className="text-center">
            <Clock className="mx-auto mb-2 h-6 w-6 text-slate-400" />
            <p className="text-3xl font-bold tabular-nums text-slate-900">{mock.avgResponseTime}d</p>
            <p className="text-xs text-slate-500">Avg Response Time</p>
          </div>
        </div>
      </div>

      {/* Create form */}
      {showCreate && (
        <div className="space-y-3 rounded-lg border bg-white p-4">
          <input value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="Subject" className="w-full rounded border px-3 py-1.5 text-sm" />
          <textarea value={question} onChange={(e) => setQuestion(e.target.value)} placeholder="Question / details" rows={3} className="w-full rounded border px-3 py-1.5 text-sm" />
          <div className="flex items-center gap-3">
            <select value={priority} onChange={(e) => setPriority(e.target.value)} className="rounded border px-2 py-1.5 text-sm">
              <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option><option value="urgent">Urgent</option>
            </select>
            <button onClick={handleCreate} disabled={saving || !subject.trim()} className="rounded-md bg-blue-600 px-4 py-1.5 text-sm font-medium text-white disabled:opacity-50">
              {saving ? 'Submitting...' : 'Submit RFI'}
            </button>
            <button onClick={() => setShowCreate(false)} className="text-sm text-slate-600 hover:underline">Cancel</button>
          </div>
        </div>
      )}

      {/* Filters */}
      <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="rounded-md border px-3 py-1.5 text-sm">
        <option value="all">All statuses</option>
        <option value="open">Open</option>
        <option value="in_review">In Review</option>
        <option value="answered">Answered</option>
        <option value="closed">Closed</option>
      </select>

      {/* RFI List */}
      <div className="space-y-2">
        {loading ? (
          <div className="text-center text-sm text-slate-400">Loading...</div>
        ) : (showMock ? mock.items : rfis.map((r) => ({
          id: r.id,
          number: r.rfi_number,
          subject: r.subject,
          status: r.status,
          priority: r.priority,
          createdAt: r.created_at,
          daysOpen: r.status === 'open' || r.status === 'in_review'
            ? Math.ceil((Date.now() - new Date(r.created_at).getTime()) / (1000 * 60 * 60 * 24))
            : 0,
        }))).map((rfi) => (
          <button
            key={rfi.id}
            onClick={() => !showMock && setSelectedRfi(rfis.find((r) => r.id === rfi.id) ?? null)}
            className="flex w-full items-center justify-between rounded-lg border bg-white p-4 text-left transition-all hover:shadow-sm"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-slate-400">{rfi.number}</span>
                <span className={`rounded-full px-1.5 py-0.5 text-xs font-medium ${PRIORITY_STYLES[rfi.priority]}`}>{rfi.priority}</span>
                {rfi.daysOpen > 0 && (
                  <span className="rounded bg-blue-50 px-1.5 py-0.5 text-[10px] font-medium text-blue-600">
                    {rfi.daysOpen}d open
                  </span>
                )}
                {'responseTime' in rfi && rfi.responseTime != null && (
                  <span className="rounded bg-emerald-50 px-1.5 py-0.5 text-[10px] font-medium text-emerald-600">
                    Answered in {(rfi as { responseTime: number }).responseTime}d
                  </span>
                )}
              </div>
              <p className="mt-1 font-medium text-slate-900">{rfi.subject}</p>
            </div>
            <span className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[rfi.status]}`}>
              {rfi.status.replace(/_/g, ' ')}
            </span>
          </button>
        ))}
      </div>

      {/* Detail modal */}
      {selectedRfi && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
          <div className="w-full max-w-lg rounded-lg bg-white p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <h2 className="font-bold text-slate-900">{selectedRfi.rfi_number}</h2>
              <button onClick={() => setSelectedRfi(null)} className="text-slate-400 hover:text-slate-600">&times;</button>
            </div>
            <p className="mt-2 font-medium">{selectedRfi.subject}</p>
            <p className="mt-1 text-sm text-slate-600">{selectedRfi.question}</p>
            {selectedRfi.response && (
              <div className="mt-3 rounded bg-green-50 p-3 text-sm text-green-900">
                <p className="text-xs font-medium text-green-700">Response:</p>
                <p className="mt-1">{selectedRfi.response}</p>
              </div>
            )}
            {selectedRfi.status !== 'answered' && selectedRfi.status !== 'closed' && (
              <div className="mt-4">
                <textarea value={responseText} onChange={(e) => setResponseText(e.target.value)} placeholder="Write a response..." rows={3} className="w-full rounded border px-3 py-1.5 text-sm" />
                <button onClick={handleRespond} disabled={saving || !responseText.trim()} className="mt-2 rounded-md bg-blue-600 px-4 py-1.5 text-sm font-medium text-white disabled:opacity-50">
                  {saving ? 'Sending...' : 'Submit Response'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
