import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/lib/supabase';
import { isDemoMode } from '@renonext/shared/utils/demo-mode';
import { MOCK_WORK_AREAS } from '@/lib/mock/work-areas';
import { FieldPieChart } from '@/components/charts/pie-chart';
import type { FieldWorkArea } from '@renonext/shared/types/field';

const STAGE_LABELS: Record<string, string> = {
  excavation: 'Excavation', foundation: 'Foundation', framing: 'Framing',
  rough_in: 'Rough-In', insulation: 'Insulation', drywall: 'Drywall',
  finishing: 'Finishing', inspection: 'Inspection', custom: 'Custom',
};

const STAGE_PROGRESS: Record<string, number> = {
  excavation: 12, foundation: 25, framing: 37, rough_in: 50,
  insulation: 62, drywall: 75, finishing: 87, inspection: 95,
};

const STATUS_STYLES: Record<string, string> = {
  not_started: 'bg-slate-100 text-slate-700',
  active: 'bg-green-100 text-green-700',
  on_hold: 'bg-yellow-100 text-yellow-700',
  completed: 'bg-blue-100 text-blue-700',
};

export function WorkAreasListPage() {
  const { membership } = useAuth();
  const [areas, setAreas] = useState<FieldWorkArea[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newName, setNewName] = useState('');
  const [search, setSearch] = useState('');
  const demo = isDemoMode();
  const mock = MOCK_WORK_AREAS;

  const fetchAreas = useCallback(async () => {
    if (!membership?.organization_id) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('field_work_areas').select('*').eq('organization_id', membership.organization_id).order('sequence_order');
    if (!error) setAreas((data as FieldWorkArea[]) ?? []);
    setLoading(false);
  }, [membership?.organization_id]);

  useEffect(() => { fetchAreas(); }, [fetchAreas]);

  async function handleCreate() {
    if (!newName.trim() || !membership?.organization_id) return;
    const { data: projects } = await supabase.from('projects').select('id').eq('organization_id', membership.organization_id).limit(1);
    if (!projects?.length) return;
    await supabase.from('field_work_areas').insert({
      organization_id: membership.organization_id, project_id: projects[0].id, name: newName.trim(), sequence_order: areas.length,
    });
    setNewName(''); setShowCreate(false); fetchAreas();
  }

  const showMock = demo || areas.length === 0;
  const filtered = areas.filter((a) =>
    !search || a.name.toLowerCase().includes(search.toLowerCase()) || a.building_category?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Work Areas</h1>
          <p className="mt-1 text-sm text-slate-500">Track progress by area with daily activities and photos</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700">
          New Area
        </button>
      </div>

      {/* Stage Distribution Pie */}
      <div>
        <h2 className="mb-2 text-sm font-semibold text-slate-900">Areas by Stage</h2>
        <FieldPieChart
          data={mock.stageDistribution}
          height={160}
          ariaLabel="Work areas by construction stage"
        />
      </div>

      {showCreate && (
        <div className="flex gap-2 rounded-lg border bg-white p-3">
          <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Area name (e.g. Building A - Level 2)" className="flex-1 rounded-md border px-3 py-1.5 text-sm" onKeyDown={(e) => e.key === 'Enter' && handleCreate()} />
          <button onClick={handleCreate} className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white">Create</button>
          <button onClick={() => setShowCreate(false)} className="rounded-md border px-3 py-1.5 text-sm text-slate-600">Cancel</button>
        </div>
      )}

      <input type="text" placeholder="Search areas..." value={search} onChange={(e) => setSearch(e.target.value)} className="rounded-md border px-3 py-1.5 text-sm" />

      {/* Summary cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {(['not_started', 'active', 'on_hold', 'completed'] as const).map((s) => {
          const count = showMock ? 0 : areas.filter((a) => a.status === s).length;
          return (
            <div key={s} className="rounded-xl border bg-white p-3 text-center transition-transform duration-200 hover:scale-[1.02]">
              <p className="text-2xl font-bold text-slate-900">{count}</p>
              <p className="text-xs capitalize text-slate-500">{s.replace(/_/g, ' ')}</p>
            </div>
          );
        })}
      </div>

      {/* Area list */}
      <div className="space-y-3">
        {loading ? (
          <div className="text-center text-sm text-slate-400">Loading...</div>
        ) : showMock ? (
          mock.areas.map((area) => (
            <div key={area.id} className="flex items-center justify-between rounded-lg border bg-white p-4 transition-all hover:shadow-sm">
              <div className="flex-1">
                <p className="font-medium text-slate-900">{area.name}</p>
                <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                  <span>{STAGE_LABELS[area.stage] ?? area.stage}</span>
                  <span>· {area.hoursWorked}h logged</span>
                </div>
                {/* Stage progress bar */}
                <div className="mt-2 h-1.5 w-full max-w-xs rounded-full bg-slate-100">
                  <div className="h-1.5 rounded-full bg-blue-500 transition-all" style={{ width: `${area.progress}%` }} />
                </div>
                <p className="mt-0.5 text-[10px] text-slate-400">{area.progress}% complete</p>
              </div>
              <span className="ml-2 shrink-0 rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                {STAGE_LABELS[area.stage] ?? area.stage}
              </span>
            </div>
          ))
        ) : filtered.length === 0 ? (
          <div className="text-center text-sm text-slate-400">No work areas found</div>
        ) : (
          filtered.map((area) => (
            <Link key={area.id} to={`/work-areas/${area.id}`} className="flex items-center justify-between rounded-lg border bg-white p-4 transition-all hover:shadow-sm">
              <div className="flex-1">
                <p className="font-medium text-slate-900">{area.name}</p>
                <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                  <span>{STAGE_LABELS[area.current_stage] ?? area.current_stage}</span>
                  {area.building_category && <><span>·</span><span>{area.building_category}</span></>}
                </div>
                {/* Stage progress bar */}
                <div className="mt-2 h-1.5 w-full max-w-xs rounded-full bg-slate-100">
                  <div className="h-1.5 rounded-full bg-blue-500 transition-all" style={{ width: `${STAGE_PROGRESS[area.current_stage] ?? 0}%` }} />
                </div>
              </div>
              <span className={`ml-2 shrink-0 rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[area.status]}`}>
                {area.status.replace(/_/g, ' ')}
              </span>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
