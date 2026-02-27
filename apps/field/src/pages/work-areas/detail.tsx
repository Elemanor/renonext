import { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import { format } from 'date-fns';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/lib/supabase';
import { isDemoMode } from '@renonext/shared/utils/demo-mode';
import { MOCK_WORK_AREAS } from '@/lib/mock/work-areas';
import { FieldAreaChart } from '@/components/charts/area-chart';
import { CHART_COLORS } from '@renonext/shared/utils/chart-theme';
import type { FieldWorkArea, DailyActivity, AreaPhoto } from '@renonext/shared/types/field';

export function WorkAreaDetailPage() {
  const { id } = useParams();
  const { user, membership } = useAuth();
  const [area, setArea] = useState<FieldWorkArea | null>(null);
  const [activities, setActivities] = useState<DailyActivity[]>([]);
  const [photos, setPhotos] = useState<AreaPhoto[]>([]);
  const [loading, setLoading] = useState(true);
  const [showActivityForm, setShowActivityForm] = useState(false);
  const [actDate, setActDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [actDescription, setActDescription] = useState('');
  const [actCrewCount, setActCrewCount] = useState('0');
  const [actHours, setActHours] = useState('');
  const [actNotes, setActNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const demo = isDemoMode();
  const mock = MOCK_WORK_AREAS;

  const fetchData = useCallback(async () => {
    if (!id) return;
    setLoading(true);
    const [areaRes, activitiesRes, photosRes] = await Promise.all([
      supabase.from('field_work_areas').select('*').eq('id', id).single(),
      supabase.from('field_daily_activities').select('*').eq('work_area_id', id).order('activity_date', { ascending: false }).limit(30),
      supabase.from('field_area_photos').select('*').eq('work_area_id', id).order('created_at', { ascending: false }).limit(20),
    ]);
    if (areaRes.data) setArea(areaRes.data as FieldWorkArea);
    if (activitiesRes.data) setActivities(activitiesRes.data as DailyActivity[]);
    if (photosRes.data) setPhotos(photosRes.data as AreaPhoto[]);
    setLoading(false);
  }, [id]);

  useEffect(() => { fetchData(); }, [fetchData]);

  async function handleAddActivity() {
    if (!id || !user) return;
    setSaving(true);
    try {
      const { error } = await supabase.from('field_daily_activities').insert({
        work_area_id: id, activity_date: actDate, description: actDescription,
        crew_count: parseInt(actCrewCount) || 0, hours_worked: actHours ? parseFloat(actHours) : null,
        progress_notes: actNotes || null, created_by_id: user.id,
      });
      if (error) throw error;
      setShowActivityForm(false); setActDescription(''); setActNotes(''); fetchData();
    } catch (err) {
      console.error('Failed to save activity:', err);
    } finally { setSaving(false); }
  }

  async function updateStatus(status: string) {
    if (!id) return;
    await supabase.from('field_work_areas').update({ status }).eq('id', id);
    fetchData();
  }

  async function updateStage(stage: string) {
    if (!id) return;
    await supabase.from('field_work_areas').update({ current_stage: stage }).eq('id', id);
    fetchData();
  }

  if (loading) {
    return <div className="space-y-3">{[1, 2, 3].map((i) => <div key={i} className="h-16 animate-pulse rounded-lg bg-slate-100" />)}</div>;
  }
  if (!area) {
    return <div className="p-8 text-center text-sm text-red-500">Work area not found</div>;
  }

  return (
    <div className="space-y-5">
      <Link to="/work-areas" className="text-sm text-blue-600 hover:underline">&larr; Back to Work Areas</Link>

      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{area.name}</h1>
          <p className="mt-1 text-sm text-slate-500">
            {area.building_category}{area.building_sub ? ` / ${area.building_sub}` : ''}
          </p>
        </div>
        <div className="flex gap-2">
          <select value={area.status} onChange={(e) => updateStatus(e.target.value)} className="rounded-md border px-2 py-1 text-sm">
            <option value="not_started">Not Started</option><option value="active">Active</option>
            <option value="on_hold">On Hold</option><option value="completed">Completed</option>
          </select>
          <select value={area.current_stage} onChange={(e) => updateStage(e.target.value)} className="rounded-md border px-2 py-1 text-sm">
            {['excavation','foundation','framing','rough_in','insulation','drywall','finishing','inspection','custom'].map((s) => (
              <option key={s} value={s}>{s.replace(/_/g, ' ')}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Daily Hours Chart (2-week trend) */}
      <div>
        <h2 className="mb-2 text-sm font-semibold text-slate-900">Daily Hours Worked (2 weeks)</h2>
        <FieldAreaChart
          data={mock.dailyHoursChart}
          xKey="date"
          yKeys={['hours']}
          height={160}
          colors={[CHART_COLORS.primary]}
          ariaLabel="Daily hours worked area chart"
        />
      </div>

      {/* Photos */}
      {photos.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold text-slate-900">Recent Photos</h2>
          <div className="mt-2 flex gap-2 overflow-x-auto pb-2">
            {photos.map((p) => (
              <img key={p.id} src={p.thumbnail_url || p.photo_url} alt={p.caption || 'Site photo'} className="h-24 w-24 shrink-0 rounded-md border object-cover" />
            ))}
          </div>
        </section>
      )}

      {/* Daily Activities */}
      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-900">Daily Activities ({activities.length})</h2>
          <button onClick={() => setShowActivityForm((p) => !p)} className="text-sm font-medium text-blue-600 hover:underline">
            {showActivityForm ? 'Cancel' : '+ Log Activity'}
          </button>
        </div>

        {showActivityForm && (
          <div className="mt-3 space-y-3 rounded-lg border bg-white p-4">
            <div className="grid gap-3 sm:grid-cols-3">
              <div>
                <label className="text-xs font-medium text-slate-500">Date</label>
                <input type="date" value={actDate} onChange={(e) => setActDate(e.target.value)} className="mt-1 w-full rounded border px-2 py-1.5 text-sm" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500">Crew Count</label>
                <input type="number" value={actCrewCount} onChange={(e) => setActCrewCount(e.target.value)} className="mt-1 w-full rounded border px-2 py-1.5 text-sm" />
              </div>
              <div>
                <label className="text-xs font-medium text-slate-500">Hours Worked</label>
                <input type="number" step="0.5" value={actHours} onChange={(e) => setActHours(e.target.value)} className="mt-1 w-full rounded border px-2 py-1.5 text-sm" />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">Description</label>
              <textarea value={actDescription} onChange={(e) => setActDescription(e.target.value)} rows={2} className="mt-1 w-full rounded border px-2 py-1.5 text-sm" />
            </div>
            <div>
              <label className="text-xs font-medium text-slate-500">Notes</label>
              <textarea value={actNotes} onChange={(e) => setActNotes(e.target.value)} rows={2} className="mt-1 w-full rounded border px-2 py-1.5 text-sm" />
            </div>
            <button onClick={handleAddActivity} disabled={saving || !actDescription.trim()} className="rounded-md bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50">
              {saving ? 'Saving...' : 'Save Activity'}
            </button>
          </div>
        )}

        <div className="mt-3 space-y-2">
          {activities.length === 0 ? (
            <p className="text-sm text-slate-400">No activities logged yet</p>
          ) : (
            activities.map((act) => (
              <div key={act.id} className="rounded-lg border bg-white p-3">
                <div className="flex items-center justify-between text-xs text-slate-500">
                  <span>{format(new Date(act.activity_date), 'MMM d, yyyy')}</span>
                  <span>{act.crew_count} crew · {act.hours_worked ?? '-'}h</span>
                </div>
                <p className="mt-1 text-sm text-slate-900">{act.description}</p>
                {act.progress_notes && <p className="mt-1 text-xs text-slate-500">{act.progress_notes}</p>}
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}
