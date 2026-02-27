import { useState, useEffect, useCallback, useMemo } from 'react';
import { format } from 'date-fns';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/lib/supabase';
import { isDemoMode } from '@renonext/shared/utils/demo-mode';
import { fmtPercent } from '@renonext/shared/utils/formatters';
import { MOCK_CONCRETE } from '@/lib/mock/concrete';
import { FieldBarChart } from '@/components/charts/bar-chart';
import { FieldPieChart } from '@/components/charts/pie-chart';
import { CHART_COLORS } from '@renonext/shared/utils/chart-theme';
import { Truck, Droplets, Target, Percent } from 'lucide-react';
import type { ConcreteOrder, ConcreteTruckLoad } from '@renonext/shared/types/field';

const STATUS_STYLES: Record<string, string> = {
  scheduled: 'bg-slate-100 text-slate-700',
  confirmed: 'bg-blue-100 text-blue-700',
  in_progress: 'bg-yellow-100 text-yellow-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
};

const TRUCK_STATUS_STYLES: Record<string, string> = {
  scheduled: 'bg-slate-100 text-slate-600',
  dispatched: 'bg-blue-100 text-blue-600',
  in_transit: 'bg-yellow-100 text-yellow-700',
  on_site: 'bg-green-100 text-green-700',
  pouring: 'bg-orange-100 text-orange-700',
  completed: 'bg-emerald-100 text-emerald-700',
};

export function ConcretePage() {
  const { membership } = useAuth();
  const [orders, setOrders] = useState<(ConcreteOrder & { truck_loads?: ConcreteTruckLoad[] })[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [dateFilter, setDateFilter] = useState('');
  const demo = isDemoMode();
  const mock = MOCK_CONCRETE;

  const fetchOrders = useCallback(async () => {
    if (!membership?.organization_id) return;
    setLoading(true);
    let query = supabase
      .from('concrete_orders')
      .select('*, concrete_truck_loads(*)')
      .eq('organization_id', membership.organization_id)
      .order('pour_date', { ascending: false })
      .limit(50);
    if (dateFilter) query = query.eq('pour_date', dateFilter);
    const { data, error } = await query;
    if (!error && data) setOrders(data as (ConcreteOrder & { truck_loads?: ConcreteTruckLoad[] })[]);
    setLoading(false);
  }, [membership?.organization_id, dateFilter]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  const showMock = demo || orders.length === 0;

  const totalPlanned = showMock
    ? mock.orders.reduce((s, o) => s + o.plannedVol, 0)
    : orders.reduce((s, o) => s + Number(o.planned_volume), 0);
  const totalActual = showMock
    ? mock.orders.reduce((s, o) => s + o.actualVol, 0)
    : orders.reduce((s, o) => s + (o.actual_volume ? Number(o.actual_volume) : 0), 0);
  const efficiency = totalPlanned > 0 ? Math.round((totalActual / totalPlanned) * 100) : 0;

  const pieData = useMemo(() => [
    { name: 'Delivered', value: Math.min(efficiency, 100), color: CHART_COLORS.success },
    { name: 'Remaining', value: Math.max(100 - efficiency, 0), color: '#e2e8f0' },
  ], [efficiency]);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Concrete Tracking</h1>
          <p className="mt-1 text-sm text-slate-500">Pour orders, truck loads, and quality metrics</p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        <ConcreteStatCard icon={Truck} label="Total Orders" value={String(showMock ? mock.orders.length : orders.length)} />
        <ConcreteStatCard icon={Droplets} label="Planned Volume" value={`${totalPlanned.toFixed(1)} m³`} />
        <ConcreteStatCard icon={Target} label="Actual Volume" value={`${totalActual.toFixed(1)} m³`} />
        <ConcreteStatCard icon={Percent} label="Efficiency" value={fmtPercent(efficiency)} />
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 lg:grid-cols-2">
        {/* Grouped Bar — Planned vs Actual */}
        <div>
          <h2 className="mb-2 text-sm font-semibold text-slate-900">Planned vs Actual Volume</h2>
          <FieldBarChart
            data={mock.volumeChart}
            xKey="order"
            yKeys={['planned', 'actual']}
            height={200}
            colors={[CHART_COLORS.primary, CHART_COLORS.success]}
            formatter={(v, name) => `${v} m³ (${name})`}
            ariaLabel="Planned vs actual concrete volume per order"
          />
        </div>

        {/* Donut — Efficiency */}
        <div>
          <h2 className="mb-2 text-sm font-semibold text-slate-900">Delivery Efficiency</h2>
          <FieldPieChart
            data={pieData}
            height={200}
            donut
            innerLabel={fmtPercent(Math.min(efficiency, 120))}
            ariaLabel="Concrete delivery efficiency donut chart"
          />
        </div>
      </div>

      {/* Date filter */}
      <div>
        <input
          type="date"
          value={dateFilter}
          onChange={(e) => setDateFilter(e.target.value)}
          className="rounded-md border px-3 py-1.5 text-sm"
        />
        {dateFilter && (
          <button onClick={() => setDateFilter('')} className="ml-2 text-sm text-blue-600 hover:underline">Clear</button>
        )}
      </div>

      {/* Orders List */}
      <div className="space-y-3">
        {loading ? (
          <div className="text-center text-sm text-slate-400">Loading...</div>
        ) : (showMock ? mock.orders : []).length === 0 && orders.length === 0 ? (
          <div className="text-center text-sm text-slate-400">No concrete orders found</div>
        ) : (
          (showMock ? mock.orders.map((o) => (
            <div key={o.id} className="rounded-lg border bg-white p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900">{o.code}</p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {o.supplier} · {o.pourDate} · {o.plannedVol} m³ planned
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-400">{o.loads} loads</span>
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[o.status]}`}>
                    {o.status.replace(/_/g, ' ')}
                  </span>
                </div>
              </div>
            </div>
          )) : orders.map((order) => {
            const expanded = expandedOrder === order.id;
            const loads = order.truck_loads ?? [];
            return (
              <div key={order.id} className="rounded-lg border bg-white">
                <button
                  onClick={() => setExpandedOrder(expanded ? null : order.id)}
                  className="flex w-full items-center justify-between p-4 text-left"
                >
                  <div>
                    <p className="font-medium text-slate-900">{order.order_code}</p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {order.supplier} · {format(new Date(order.pour_date), 'MMM d, yyyy')} · {Number(order.planned_volume)} m³ planned
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400">{loads.length} loads</span>
                    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_STYLES[order.status]}`}>
                      {order.status.replace(/_/g, ' ')}
                    </span>
                  </div>
                </button>
                {expanded && loads.length > 0 && (
                  <div className="border-t">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b bg-slate-50 text-left text-slate-500">
                          <th className="px-4 py-1.5">Load #</th>
                          <th className="px-4 py-1.5">Driver</th>
                          <th className="px-4 py-1.5">Volume</th>
                          <th className="px-4 py-1.5">Slump</th>
                          <th className="px-4 py-1.5">Arrival</th>
                          <th className="px-4 py-1.5">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {loads.map((load) => (
                          <tr key={load.id} className="hover:bg-slate-50">
                            <td className="px-4 py-2">{load.load_number}</td>
                            <td className="px-4 py-2">{load.driver_name ?? '-'}</td>
                            <td className="px-4 py-2">{load.volume ? `${Number(load.volume)} m³` : '-'}</td>
                            <td className="px-4 py-2">{load.slump_test != null ? Number(load.slump_test) : '-'}</td>
                            <td className="px-4 py-2">
                              {load.actual_arrival
                                ? format(new Date(load.actual_arrival), 'h:mm a')
                                : load.expected_arrival
                                  ? format(new Date(load.expected_arrival), 'h:mm a')
                                  : '-'}
                            </td>
                            <td className="px-4 py-2">
                              <span className={`rounded-full px-1.5 py-0.5 text-xs font-medium ${TRUCK_STATUS_STYLES[load.status]}`}>
                                {load.status.replace(/_/g, ' ')}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            );
          }))
        )}
      </div>
    </div>
  );
}

function ConcreteStatCard({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="rounded-xl border bg-white p-3 transition-transform duration-200 hover:scale-[1.02]">
      <Icon className="mb-1 h-4 w-4 text-slate-400" />
      <p className="text-lg font-bold tabular-nums text-slate-900">{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}
