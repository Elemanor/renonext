import { useState, useEffect, useCallback, useMemo } from 'react';
import { format } from 'date-fns';
import { useAuth } from '@/hooks/use-auth';
import { useGeolocation } from '@/hooks/use-geolocation';
import { supabase } from '@/lib/supabase';
import { isDemoMode } from '@renonext/shared/utils/demo-mode';
import { fmtHours } from '@renonext/shared/utils/formatters';
import { MOCK_ATTENDANCE } from '@/lib/mock/attendance';
import { FieldBarChart } from '@/components/charts/bar-chart';
import { MiniSparkline } from '@/components/charts/mini-sparkline';
import { CHART_COLORS } from '@renonext/shared/utils/chart-theme';
import { Users, Clock, AlertCircle, CheckCircle } from 'lucide-react';
import type { WorkerAttendance } from '@renonext/shared/types/field';

type ViewMode = 'my' | 'team';

export function AttendancePage() {
  const { user, membership } = useAuth();
  const { getCurrentPosition, loading: geoLoading } = useGeolocation();
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [records, setRecords] = useState<WorkerAttendance[]>([]);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('team');
  const isSupervisor = membership?.role && ['owner', 'admin', 'supervisor'].includes(membership.role);
  const demo = isDemoMode();
  const mock = MOCK_ATTENDANCE;

  const fetchRecords = useCallback(async () => {
    if (!membership?.organization_id) return;
    setLoading(true);
    try {
      let query = supabase
        .from('worker_attendance')
        .select('*')
        .eq('organization_id', membership.organization_id)
        .eq('date', selectedDate)
        .order('check_in_time', { ascending: true, nullsFirst: false });

      if (viewMode === 'my') {
        query = query.eq('worker_id', user!.id);
      }

      const { data, error } = await query;
      if (error) throw error;
      setRecords((data as WorkerAttendance[]) ?? []);
    } catch (err) {
      console.error('Failed to fetch attendance:', err);
    } finally {
      setLoading(false);
    }
  }, [membership?.organization_id, selectedDate, viewMode, user]);

  useEffect(() => {
    fetchRecords();
  }, [fetchRecords]);

  const myRecord = records.find((r) => r.worker_id === user?.id);

  async function handleCheckIn() {
    if (!user || !membership?.organization_id) return;
    setActionLoading(true);
    try {
      const loc = await getCurrentPosition();
      const { error } = await supabase.from('worker_attendance').upsert(
        {
          organization_id: membership.organization_id,
          worker_id: user.id,
          date: selectedDate,
          status: 'present',
          check_in_time: new Date().toISOString(),
          check_in_lat: loc?.lat ?? null,
          check_in_lng: loc?.lng ?? null,
          check_in_address: loc?.address ?? null,
          clock_events: [
            {
              type: 'check_in',
              timestamp: new Date().toISOString(),
              lat: loc?.lat ?? null,
              lng: loc?.lng ?? null,
              address: loc?.address ?? null,
            },
          ],
        },
        { onConflict: 'organization_id,worker_id,date' }
      );
      if (error) throw error;
      await fetchRecords();
    } catch (err) {
      console.error('Check-in failed:', err);
    } finally {
      setActionLoading(false);
    }
  }

  async function handleCheckOut() {
    if (!user || !myRecord) return;
    setActionLoading(true);
    try {
      const loc = await getCurrentPosition();
      const checkIn = myRecord.check_in_time
        ? new Date(myRecord.check_in_time)
        : null;
      const now = new Date();
      const totalHours =
        checkIn
          ? parseFloat(
              (
                (now.getTime() - checkIn.getTime()) / (1000 * 60 * 60) -
                (myRecord.break_minutes ?? 0) / 60
              ).toFixed(2)
            )
          : null;
      const events = Array.isArray(myRecord.clock_events)
        ? [...myRecord.clock_events]
        : [];
      events.push({
        type: 'check_out',
        timestamp: now.toISOString(),
        lat: loc?.lat ?? null,
        lng: loc?.lng ?? null,
        address: loc?.address ?? null,
      });

      const { error } = await supabase
        .from('worker_attendance')
        .update({
          check_out_time: now.toISOString(),
          check_out_lat: loc?.lat ?? null,
          check_out_lng: loc?.lng ?? null,
          check_out_address: loc?.address ?? null,
          total_hours: totalHours,
          overtime_hours:
            totalHours && totalHours > 8
              ? parseFloat((totalHours - 8).toFixed(2))
              : 0,
          clock_events: events,
        })
        .eq('id', myRecord.id);
      if (error) throw error;
      await fetchRecords();
    } catch (err) {
      console.error('Check-out failed:', err);
    } finally {
      setActionLoading(false);
    }
  }

  const presentCount = records.filter((r) => r.status === 'present').length;

  // Use mock data for display when demo or no data
  const showMock = demo || records.length === 0;
  const displayWorkers = useMemo(() => {
    if (!showMock) return null;
    return mock.workers;
  }, [showMock, mock.workers]);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Attendance</h1>
          <p className="mt-1 text-sm text-slate-500">
            GPS-tracked check-in / check-out
          </p>
        </div>
        {isSupervisor && (
          <div className="flex rounded-md border">
            <button
              onClick={() => setViewMode('team')}
              className={`px-3 py-1.5 text-sm font-medium ${viewMode === 'team' ? 'bg-blue-50 text-blue-700' : 'text-slate-600'}`}
            >
              Team
            </button>
            <button
              onClick={() => setViewMode('my')}
              className={`px-3 py-1.5 text-sm font-medium ${viewMode === 'my' ? 'bg-blue-50 text-blue-700' : 'text-slate-600'}`}
            >
              My
            </button>
          </div>
        )}
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <MiniStatCard
          icon={Users}
          iconColor="text-blue-600"
          iconBg="bg-blue-50"
          label="Total Workers"
          value={String(showMock ? mock.stats.totalWorkers : records.length)}
        />
        <MiniStatCard
          icon={Clock}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
          label="Avg Hours"
          value={fmtHours(showMock ? mock.stats.avgHours : 0)}
        />
        <MiniStatCard
          icon={AlertCircle}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
          label="Total OT"
          value={fmtHours(showMock ? mock.stats.totalOT : 0)}
          highlight={showMock ? mock.stats.totalOT > 0 : false}
        />
        <MiniStatCard
          icon={CheckCircle}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50"
          label="On-Time %"
          value={`${showMock ? mock.stats.onTimePercent : 0}%`}
        />
      </div>

      {/* Stacked Bar Chart — Weekly Hours */}
      <div>
        <h2 className="mb-2 text-sm font-semibold text-slate-900">Weekly Hours</h2>
        <FieldBarChart
          data={mock.weeklyHours}
          xKey="day"
          yKeys={['regular', 'overtime']}
          height={180}
          colors={[CHART_COLORS.primary, CHART_COLORS.warn]}
          stacked
          formatter={(v, name) => `${v}h ${name}`}
          ariaLabel="Weekly regular and overtime hours stacked bar chart"
        />
      </div>

      {/* Date + Check In/Out */}
      <div className="flex flex-wrap items-center gap-3">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="rounded-md border px-3 py-1.5 text-sm"
        />
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span className="inline-flex h-5 items-center rounded bg-green-100 px-1.5 text-xs font-medium text-green-700">
            {showMock ? mock.workers.filter((w) => w.status === 'present').length : presentCount}
          </span>
          present &middot;{' '}
          <span className="inline-flex h-5 items-center rounded bg-red-100 px-1.5 text-xs font-medium text-red-700">
            {showMock ? mock.workers.filter((w) => w.status === 'absent').length : records.length - presentCount}
          </span>
          absent
        </div>

        {selectedDate === format(new Date(), 'yyyy-MM-dd') && (
          <div className="ml-auto flex gap-2">
            {!myRecord?.check_in_time ? (
              <button
                onClick={handleCheckIn}
                disabled={actionLoading || geoLoading}
                className="rounded-md bg-green-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-green-700 disabled:opacity-50"
              >
                {actionLoading ? 'Locating...' : 'Check In'}
              </button>
            ) : !myRecord?.check_out_time ? (
              <button
                onClick={handleCheckOut}
                disabled={actionLoading || geoLoading}
                className="rounded-md bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {actionLoading ? 'Locating...' : 'Check Out'}
              </button>
            ) : (
              <span className="text-sm text-slate-500">Shift complete</span>
            )}
          </div>
        )}
      </div>

      {/* Records Table */}
      <div className="overflow-hidden rounded-lg border bg-white">
        {loading ? (
          <div className="flex items-center justify-center p-8 text-sm text-slate-400">
            Loading...
          </div>
        ) : (showMock && displayWorkers) ? (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-slate-50 text-left text-xs font-medium text-slate-500">
                <th className="px-4 py-2">Worker</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Check In</th>
                <th className="px-4 py-2">Check Out</th>
                <th className="px-4 py-2">Hours</th>
                <th className="px-4 py-2">OT</th>
                <th className="px-4 py-2">Location</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {displayWorkers.map((w) => (
                <tr key={w.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">{w.name}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      w.status === 'present' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {w.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">{w.checkIn ?? '-'}</td>
                  <td className="px-4 py-3 text-slate-600">{w.checkOut ?? '-'}</td>
                  <td className="px-4 py-3 text-slate-600">{w.hours > 0 ? fmtHours(w.hours) : '-'}</td>
                  <td className="px-4 py-3">
                    {w.overtime > 0 ? (
                      <span className="inline-flex items-center rounded bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-700">
                        {fmtHours(w.overtime)}
                      </span>
                    ) : '-'}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500">{w.location ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : records.length === 0 ? (
          <div className="p-8 text-center text-sm text-slate-400">
            No attendance records for this date
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-slate-50 text-left text-xs font-medium text-slate-500">
                <th className="px-4 py-2">Worker</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Check In</th>
                <th className="px-4 py-2">Check Out</th>
                <th className="px-4 py-2">Hours</th>
                <th className="px-4 py-2">OT</th>
                <th className="px-4 py-2">Location</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {records.map((rec) => (
                <tr key={rec.id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-medium text-slate-900">
                    {rec.worker_id === user?.id ? 'You' : rec.worker_id.slice(0, 8)}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                      rec.status === 'present' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                    }`}>
                      {rec.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {rec.check_in_time ? format(new Date(rec.check_in_time), 'h:mm a') : '-'}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {rec.check_out_time ? format(new Date(rec.check_out_time), 'h:mm a') : '-'}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {rec.total_hours != null ? fmtHours(rec.total_hours) : '-'}
                  </td>
                  <td className="px-4 py-3">
                    {rec.overtime_hours && rec.overtime_hours > 0 ? (
                      <span className="inline-flex items-center rounded bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-700">
                        {fmtHours(rec.overtime_hours)}
                      </span>
                    ) : '-'}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500">
                    {rec.check_in_address
                      ? rec.check_in_address.split(',').slice(0, 2).join(',')
                      : rec.check_in_lat
                        ? `${Number(rec.check_in_lat).toFixed(4)}, ${Number(rec.check_in_lng).toFixed(4)}`
                        : '-'}
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

/* ---------- Mini Stat Card ---------- */

function MiniStatCard({
  icon: Icon,
  iconColor,
  iconBg,
  label,
  value,
  highlight,
}: {
  icon: React.ElementType;
  iconColor: string;
  iconBg: string;
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="rounded-xl border bg-white p-3 transition-transform duration-200 hover:scale-[1.02]">
      <div className={`mb-1 flex h-7 w-7 items-center justify-center rounded-lg ${iconBg}`}>
        <Icon className={`h-3.5 w-3.5 ${iconColor}`} />
      </div>
      <p className={`text-lg font-bold tabular-nums ${highlight ? 'text-amber-600' : 'text-slate-900'}`}>
        {value}
      </p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}
