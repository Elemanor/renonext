import { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/lib/supabase';
import { isDemoMode } from '@renonext/shared/utils/demo-mode';
import { fmtCurrency } from '@renonext/shared/utils/formatters';
import { MOCK_MATERIALS } from '@/lib/mock/materials';
import { FieldBarChart } from '@/components/charts/bar-chart';
import { CHART_COLORS } from '@renonext/shared/utils/chart-theme';
import { Package, Clock, DollarSign } from 'lucide-react';
import type { MaterialRequest, MaterialItem } from '@renonext/shared/types/field';

const STATUS_STYLES: Record<string, string> = {
  draft: 'bg-slate-100 text-slate-600',
  submitted: 'bg-blue-100 text-blue-700',
  approved: 'bg-green-100 text-green-700',
  ordered: 'bg-purple-100 text-purple-700',
  delivered: 'bg-emerald-100 text-emerald-700',
  cancelled: 'bg-red-100 text-red-700',
};

const URGENCY_BORDER: Record<string, string> = {
  low: 'border-l-slate-300',
  medium: 'border-l-blue-400',
  high: 'border-l-amber-500',
  critical: 'border-l-red-500',
};

export function MaterialsPage() {
  const { user, membership } = useAuth();
  const [requests, setRequests] = useState<MaterialRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [items, setItems] = useState<MaterialItem[]>([
    { name: '', quantity: 1, unit: 'ea', specifications: null, estimated_cost: null },
  ]);
  const [urgency, setUrgency] = useState('medium');
  const [neededBy, setNeededBy] = useState('');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const demo = isDemoMode();
  const mock = MOCK_MATERIALS;

  const fetchRequests = useCallback(async () => {
    if (!membership?.organization_id) return;
    setLoading(true);
    const { data } = await supabase
      .from('material_requests').select('*').eq('organization_id', membership.organization_id).order('created_at', { ascending: false }).limit(50);
    if (data) setRequests(data as MaterialRequest[]);
    setLoading(false);
  }, [membership?.organization_id]);

  useEffect(() => { fetchRequests(); }, [fetchRequests]);

  function addItem() {
    setItems((prev) => [...prev, { name: '', quantity: 1, unit: 'ea', specifications: null, estimated_cost: null }]);
  }
  function updateItem(idx: number, updates: Partial<MaterialItem>) {
    setItems((prev) => prev.map((it, i) => (i === idx ? { ...it, ...updates } : it)));
  }
  function removeItem(idx: number) {
    setItems((prev) => prev.filter((_, i) => i !== idx));
  }

  async function handleSubmit() {
    if (!user || !membership?.organization_id) return;
    const validItems = items.filter((i) => i.name.trim());
    if (!validItems.length) return;
    setSaving(true);
    const { data: projects } = await supabase.from('projects').select('id').eq('organization_id', membership.organization_id).limit(1);
    if (!projects?.length) { setSaving(false); return; }
    const totalCost = validItems.reduce((s, i) => s + (i.estimated_cost ?? 0) * i.quantity, 0);
    const { error } = await supabase.from('material_requests').insert({
      organization_id: membership.organization_id,
      project_id: projects[0].id,
      requested_by_id: user.id,
      items: validItems,
      urgency,
      needed_by_date: neededBy || null,
      total_estimated_cost: totalCost || null,
      notes: notes || null,
      status: 'submitted',
    });
    if (!error) {
      setShowCreate(false);
      setItems([{ name: '', quantity: 1, unit: 'ea', specifications: null, estimated_cost: null }]);
      setNotes('');
      fetchRequests();
    }
    setSaving(false);
  }

  const showMock = demo || requests.length === 0;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Material Requests</h1>
          <p className="mt-1 text-sm text-slate-500">Request and track construction materials</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          New Request
        </button>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-3 gap-3">
        <MatStatCard icon={Package} label="Total Requests" value={String(mock.stats.totalRequests)} />
        <MatStatCard icon={Clock} label="Pending Approval" value={String(mock.stats.pendingApproval)} />
        <MatStatCard icon={DollarSign} label="Est. Cost" value={fmtCurrency(mock.stats.totalEstimatedCost)} />
      </div>

      {/* Cost by Status Bar Chart */}
      <div>
        <h2 className="mb-2 text-sm font-semibold text-slate-900">Cost by Status</h2>
        <FieldBarChart
          data={mock.costByStatus}
          xKey="status"
          yKeys={['cost']}
          height={160}
          layout="horizontal"
          colors={[CHART_COLORS.primary]}
          formatter={(v) => fmtCurrency(v)}
          ariaLabel="Material cost by status horizontal bar chart"
        />
      </div>

      {/* Create form */}
      {showCreate && (
        <div className="space-y-3 rounded-lg border bg-white p-4">
          <h3 className="text-sm font-semibold text-slate-900">Items</h3>
          {items.map((item, idx) => (
            <div key={idx} className="flex gap-2">
              <input value={item.name} onChange={(e) => updateItem(idx, { name: e.target.value })} placeholder="Material name" className="flex-1 rounded border px-2 py-1.5 text-sm" />
              <input type="number" value={item.quantity} onChange={(e) => updateItem(idx, { quantity: Number(e.target.value) })} className="w-20 rounded border px-2 py-1.5 text-sm" />
              <select value={item.unit} onChange={(e) => updateItem(idx, { unit: e.target.value })} className="rounded border px-2 py-1.5 text-sm">
                <option value="ea">ea</option><option value="m">m</option><option value="m²">m²</option><option value="m³">m³</option>
                <option value="kg">kg</option><option value="ton">ton</option><option value="bag">bag</option><option value="roll">roll</option>
              </select>
              <input type="number" value={item.estimated_cost ?? ''} onChange={(e) => updateItem(idx, { estimated_cost: e.target.value ? Number(e.target.value) : null })} placeholder="$/unit" className="w-24 rounded border px-2 py-1.5 text-sm" />
              {items.length > 1 && (
                <button onClick={() => removeItem(idx)} className="text-sm text-red-500">&times;</button>
              )}
            </div>
          ))}
          <button onClick={addItem} className="text-sm text-blue-600 hover:underline">+ Add Item</button>
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <label className="text-xs font-medium text-slate-500">Urgency</label>
              <select value={urgency} onChange={(e) => setUrgency(e.target.value)} className="mt-1 w-full rounded border px-2 py-1.5 text-sm">
                <option value="low">Low</option><option value="medium">Medium</option><option value="high">High</option><option value="critical">Critical</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">Needed By</label>
              <input type="date" value={neededBy} onChange={(e) => setNeededBy(e.target.value)} className="mt-1 w-full rounded border px-2 py-1.5 text-sm" />
            </div>
          </div>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes..." rows={2} className="w-full rounded border px-2 py-1.5 text-sm" />
          <div className="flex gap-2">
            <button onClick={handleSubmit} disabled={saving} className="rounded-md bg-blue-600 px-4 py-1.5 text-sm font-medium text-white disabled:opacity-50">
              {saving ? 'Submitting...' : 'Submit Request'}
            </button>
            <button onClick={() => setShowCreate(false)} className="text-sm text-slate-600 hover:underline">Cancel</button>
          </div>
        </div>
      )}

      {/* Request list */}
      <div className="space-y-2">
        {loading ? (
          <div className="text-center text-sm text-slate-400">Loading...</div>
        ) : (showMock ? mock.requests : requests.map((req) => {
          const itemList = Array.isArray(req.items) ? (req.items as MaterialItem[]) : [];
          return {
            id: req.id,
            number: req.request_number ?? req.id.slice(0, 8),
            items: itemList.map((i) => i.name).filter(Boolean),
            urgency: req.urgency ?? 'medium',
            status: req.status,
            cost: req.total_estimated_cost ? Number(req.total_estimated_cost) : 0,
            neededBy: req.needed_by_date,
          };
        })).map((req) => (
          <div
            key={req.id}
            className={`rounded-lg border border-l-4 bg-white p-4 ${URGENCY_BORDER[req.urgency] ?? 'border-l-slate-300'}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">{req.number}</p>
                <p className="mt-0.5 font-medium text-slate-900">
                  {req.items.join(', ') || 'Material request'}
                </p>
              </div>
              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[req.status]}`}>
                {req.status}
              </span>
            </div>
            <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
              <span>{req.items.length} items</span>
              {req.cost > 0 && <span>· {fmtCurrency(req.cost)}</span>}
              {req.neededBy && <span>· Need by {typeof req.neededBy === 'string' ? format(new Date(req.neededBy), 'MMM d') : ''}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MatStatCard({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="rounded-xl border bg-white p-3 transition-transform duration-200 hover:scale-[1.02]">
      <Icon className="mb-1 h-4 w-4 text-slate-400" />
      <p className="text-lg font-bold tabular-nums text-slate-900">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}
