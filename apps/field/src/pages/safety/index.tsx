import { useState, useEffect, useCallback } from 'react';
import { format } from 'date-fns';
import { useAuth } from '@/hooks/use-auth';
import { supabase } from '@/lib/supabase';
import { isDemoMode } from '@renonext/shared/utils/demo-mode';
import { MOCK_SAFETY } from '@/lib/mock/safety';
import { FieldAreaChart } from '@/components/charts/area-chart';
import { FieldBarChart } from '@/components/charts/bar-chart';
import { MiniSparkline } from '@/components/charts/mini-sparkline';
import { CHART_COLORS } from '@renonext/shared/utils/chart-theme';
import { SignatureCanvas } from '@/components/signature-canvas';
import { ShieldCheck, Calendar, AlertTriangle, Ticket } from 'lucide-react';
import type {
  ToolboxMeeting,
  IncidentReport,
  SafetyCertificate,
  SafetyTicket,
} from '@renonext/shared/types/field';

type Tab = 'toolbox' | 'incidents' | 'certificates' | 'tickets';

export function SafetyCompliancePage() {
  const { user, membership } = useAuth();
  const [tab, setTab] = useState<Tab>('toolbox');
  const [meetings, setMeetings] = useState<ToolboxMeeting[]>([]);
  const [incidents, setIncidents] = useState<IncidentReport[]>([]);
  const [certificates, setCertificates] = useState<SafetyCertificate[]>([]);
  const [tickets, setTickets] = useState<SafetyTicket[]>([]);
  const [loading, setLoading] = useState(true);

  const [showToolboxForm, setShowToolboxForm] = useState(false);
  const [tbTopic, setTbTopic] = useState('');
  const [tbDescription, setTbDescription] = useState('');
  const [saving, setSaving] = useState(false);

  const [showIncidentForm, setShowIncidentForm] = useState(false);
  const [incDescription, setIncDescription] = useState('');
  const [incSeverity, setIncSeverity] = useState('minor');
  const [incDate, setIncDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [incLocation, setIncLocation] = useState('');

  const orgId = membership?.organization_id;
  const demo = isDemoMode();
  const mock = MOCK_SAFETY;

  const fetchData = useCallback(async () => {
    if (!orgId) return;
    setLoading(true);
    const [mtgs, incs, certs, tkts] = await Promise.all([
      supabase.from('toolbox_meetings').select('*').eq('organization_id', orgId).order('meeting_date', { ascending: false }).limit(30),
      supabase.from('incident_reports').select('*').eq('organization_id', orgId).is('deleted_at', null).order('incident_date', { ascending: false }).limit(30),
      supabase.from('safety_certificates').select('*').eq('organization_id', orgId).order('expiry_date', { ascending: true }).limit(50),
      supabase.from('safety_tickets').select('*').eq('organization_id', orgId).order('created_at', { ascending: false }).limit(30),
    ]);
    if (mtgs.data) setMeetings(mtgs.data as ToolboxMeeting[]);
    if (incs.data) setIncidents(incs.data as IncidentReport[]);
    if (certs.data) setCertificates(certs.data as SafetyCertificate[]);
    if (tkts.data) setTickets(tkts.data as SafetyTicket[]);
    setLoading(false);
  }, [orgId]);

  useEffect(() => { fetchData(); }, [fetchData]);

  async function createToolboxMeeting() {
    if (!user || !orgId || !tbTopic.trim()) return;
    setSaving(true);
    await supabase.from('toolbox_meetings').insert({
      organization_id: orgId,
      created_by_id: user.id,
      topic: tbTopic.trim(),
      description: tbDescription.trim() || null,
    });
    setShowToolboxForm(false);
    setTbTopic('');
    setTbDescription('');
    setSaving(false);
    fetchData();
  }

  async function createIncidentReport() {
    if (!user || !orgId || !incDescription.trim()) return;
    setSaving(true);
    await supabase.from('incident_reports').insert({
      organization_id: orgId,
      reported_by_id: user.id,
      incident_date: incDate,
      severity: incSeverity,
      description: incDescription.trim(),
      location: incLocation.trim() || null,
      status: 'submitted',
    });
    setShowIncidentForm(false);
    setIncDescription('');
    setIncLocation('');
    setSaving(false);
    fetchData();
  }

  const expiringSoonCount = certificates.filter((c) => {
    if (!c.expiry_date) return false;
    const diff = (new Date(c.expiry_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24);
    return diff > 0 && diff <= 30;
  }).length;

  const openTickets = tickets.filter((t) => t.status === 'open' || t.status === 'in_progress').length;

  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: 'toolbox', label: 'Toolbox', count: meetings.length },
    { key: 'incidents', label: 'Incidents', count: incidents.length },
    { key: 'certificates', label: 'Certs', count: demo ? mock.stats.expiringCerts : expiringSoonCount },
    { key: 'tickets', label: 'Tickets', count: demo ? mock.stats.openTickets : openTickets },
  ];

  return (
    <div className="space-y-5">
      <h1 className="text-2xl font-bold text-slate-900">Safety Compliance</h1>
      <p className="-mt-4 text-sm text-slate-500">
        Toolbox meetings, incident reports, certificates, and safety tickets
      </p>

      {/* Hero KPI + Stats */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {/* Days Without Incident — big hero */}
        <div className="col-span-2 flex items-center gap-4 rounded-xl border bg-white p-4 lg:col-span-1">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50">
            <span className="text-2xl font-black tabular-nums text-emerald-600">
              {mock.daysWithoutIncident}
            </span>
          </div>
          <div>
            <p className="text-xs text-slate-500">Days Without Incident</p>
            <MiniSparkline data={mock.safetyScore.trend} color={CHART_COLORS.success} />
          </div>
        </div>
        <SafetyStatCard icon={Calendar} label="Meetings This Month" value={String(mock.stats.meetingsThisMonth)} />
        <SafetyStatCard icon={AlertTriangle} label="Expiring Certs" value={String(mock.stats.expiringCerts)} highlight={mock.stats.expiringCerts > 0} />
        <SafetyStatCard icon={Ticket} label="Open Tickets" value={String(mock.stats.openTickets)} />
      </div>

      {/* Incident Trend Chart */}
      <div>
        <h2 className="mb-2 text-sm font-semibold text-slate-900">Incident Trend (6 months)</h2>
        <FieldAreaChart
          data={mock.incidentTrend}
          xKey="month"
          yKeys={['incidents']}
          height={160}
          colors={[CHART_COLORS.danger]}
          ariaLabel="Monthly incident trend showing decreasing incidents"
        />
      </div>

      {/* Cert Expiry Bar Chart */}
      <div>
        <h2 className="mb-2 text-sm font-semibold text-slate-900">Certificate Expiry</h2>
        <FieldBarChart
          data={mock.certExpiry}
          xKey="range"
          yKeys={['count']}
          height={140}
          colors={[CHART_COLORS.success]}
          ariaLabel="Certificate expiry distribution"
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 rounded-lg border bg-slate-50 p-1">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              tab === t.key
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            {t.label}
            {t.count > 0 && (
              <span className="ml-1 rounded-full bg-slate-200 px-1.5 py-0.5 text-xs">{t.count}</span>
            )}
          </button>
        ))}
      </div>

      <div>
        {loading ? (
          <div className="text-center text-sm text-slate-400">Loading...</div>
        ) : (
          <>
            {tab === 'toolbox' && (
              <div>
                <div className="flex justify-end">
                  <button onClick={() => setShowToolboxForm(true)} className="rounded-md bg-blue-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-blue-700">New Meeting</button>
                </div>
                {showToolboxForm && (
                  <div className="mt-3 space-y-3 rounded-lg border bg-white p-4">
                    <input value={tbTopic} onChange={(e) => setTbTopic(e.target.value)} placeholder="Topic" className="w-full rounded border px-3 py-1.5 text-sm" />
                    <textarea value={tbDescription} onChange={(e) => setTbDescription(e.target.value)} placeholder="Description / discussion points" rows={3} className="w-full rounded border px-3 py-1.5 text-sm" />
                    <div className="flex gap-2">
                      <button onClick={createToolboxMeeting} disabled={saving || !tbTopic.trim()} className="rounded bg-blue-600 px-3 py-1.5 text-sm font-medium text-white disabled:opacity-50">Save</button>
                      <button onClick={() => setShowToolboxForm(false)} className="text-sm text-slate-600">Cancel</button>
                    </div>
                  </div>
                )}
                <div className="mt-3 space-y-2">
                  {meetings.map((m) => (
                    <div key={m.id} className="rounded-lg border bg-white p-4">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-slate-900">{m.topic}</p>
                        <span className="text-xs text-slate-500">{format(new Date(m.meeting_date), 'MMM d, yyyy')}</span>
                      </div>
                      {m.description && <p className="mt-1 text-sm text-slate-600">{m.description}</p>}
                    </div>
                  ))}
                  {meetings.length === 0 && <p className="text-sm text-slate-400">No meetings recorded</p>}
                </div>
              </div>
            )}

            {tab === 'incidents' && (
              <div>
                <div className="flex justify-end">
                  <button onClick={() => setShowIncidentForm(true)} className="rounded-md bg-red-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-red-700">Report Incident</button>
                </div>
                {showIncidentForm && (
                  <div className="mt-3 space-y-3 rounded-lg border bg-white p-4">
                    <div className="grid gap-3 sm:grid-cols-3">
                      <div>
                        <label className="text-xs font-medium text-slate-500">Date</label>
                        <input type="date" value={incDate} onChange={(e) => setIncDate(e.target.value)} className="mt-1 w-full rounded border px-2 py-1.5 text-sm" />
                      </div>
                      <div>
                        <label className="text-xs font-medium text-slate-500">Severity</label>
                        <select value={incSeverity} onChange={(e) => setIncSeverity(e.target.value)} className="mt-1 w-full rounded border px-2 py-1.5 text-sm">
                          <option value="near_miss">Near Miss</option>
                          <option value="minor">Minor</option>
                          <option value="moderate">Moderate</option>
                          <option value="major">Major</option>
                          <option value="critical">Critical</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs font-medium text-slate-500">Location</label>
                        <input value={incLocation} onChange={(e) => setIncLocation(e.target.value)} className="mt-1 w-full rounded border px-2 py-1.5 text-sm" />
                      </div>
                    </div>
                    <textarea value={incDescription} onChange={(e) => setIncDescription(e.target.value)} placeholder="Describe the incident..." rows={3} className="w-full rounded border px-3 py-1.5 text-sm" />
                    <div className="flex gap-2">
                      <button onClick={createIncidentReport} disabled={saving || !incDescription.trim()} className="rounded bg-red-600 px-3 py-1.5 text-sm font-medium text-white disabled:opacity-50">Submit</button>
                      <button onClick={() => setShowIncidentForm(false)} className="text-sm text-slate-600">Cancel</button>
                    </div>
                  </div>
                )}
                <div className="mt-3 space-y-2">
                  {incidents.map((inc) => (
                    <div key={inc.id} className="flex rounded-lg border bg-white">
                      <div className={`w-1 shrink-0 rounded-l-lg ${
                        inc.severity === 'critical' || inc.severity === 'major'
                          ? 'bg-red-500'
                          : inc.severity === 'moderate'
                            ? 'bg-orange-500'
                            : 'bg-yellow-500'
                      }`} />
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                            inc.severity === 'critical' || inc.severity === 'major'
                              ? 'bg-red-100 text-red-700'
                              : inc.severity === 'moderate'
                                ? 'bg-orange-100 text-orange-700'
                                : 'bg-yellow-100 text-yellow-700'
                          }`}>{inc.severity}</span>
                          <span className="text-xs text-slate-500">{format(new Date(inc.incident_date), 'MMM d, yyyy')}</span>
                        </div>
                        <p className="mt-2 text-sm text-slate-900">{inc.description}</p>
                        {inc.location && <p className="mt-1 text-xs text-slate-500">Location: {inc.location}</p>}
                      </div>
                    </div>
                  ))}
                  {incidents.length === 0 && <p className="text-sm text-slate-400">No incidents reported</p>}
                </div>
              </div>
            )}

            {tab === 'certificates' && (
              <div className="overflow-hidden rounded-lg border bg-white">
                {certificates.length === 0 ? (
                  <div className="p-8 text-center text-sm text-slate-400">No certificates tracked</div>
                ) : (
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-slate-50 text-left text-xs text-slate-500">
                        <th className="px-4 py-2">Type</th>
                        <th className="px-4 py-2">Number</th>
                        <th className="px-4 py-2">Issued</th>
                        <th className="px-4 py-2">Expires</th>
                        <th className="px-4 py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {certificates.map((c) => {
                        const daysLeft = c.expiry_date
                          ? Math.ceil((new Date(c.expiry_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
                          : null;
                        return (
                          <tr key={c.id} className="hover:bg-slate-50">
                            <td className="px-4 py-3 font-medium">{c.certificate_type}</td>
                            <td className="px-4 py-3 text-slate-600">{c.certificate_number ?? '-'}</td>
                            <td className="px-4 py-3 text-slate-600">{format(new Date(c.issued_date), 'MMM d, yyyy')}</td>
                            <td className="px-4 py-3">
                              {c.expiry_date ? (
                                <span className={daysLeft != null && daysLeft <= 30 ? 'font-medium text-red-600' : 'text-slate-600'}>
                                  {format(new Date(c.expiry_date), 'MMM d, yyyy')}
                                  {daysLeft != null && daysLeft <= 30 && ` (${daysLeft}d)`}
                                </span>
                              ) : '-'}
                            </td>
                            <td className="px-4 py-3">
                              <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                c.status === 'active' ? 'bg-green-100 text-green-700' :
                                c.status === 'expired' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-600'
                              }`}>{c.status}</span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                )}
              </div>
            )}

            {tab === 'tickets' && (
              <div className="space-y-2">
                {tickets.length === 0 ? (
                  <p className="text-sm text-slate-400">No safety tickets</p>
                ) : (
                  tickets.map((t) => (
                    <div key={t.id} className="rounded-lg border bg-white p-4">
                      <div className="flex items-center justify-between">
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          t.severity === 'stop_work' ? 'bg-red-100 text-red-700' :
                          t.severity === 'major' ? 'bg-orange-100 text-orange-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>{t.severity.replace(/_/g, ' ')}</span>
                        <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                          t.status === 'open' ? 'bg-blue-100 text-blue-700' :
                          t.status === 'resolved' || t.status === 'closed' ? 'bg-green-100 text-green-700' :
                          'bg-yellow-100 text-yellow-700'
                        }`}>{t.status}</span>
                      </div>
                      <p className="mt-2 text-sm text-slate-900">{t.description}</p>
                      {t.corrective_action && <p className="mt-1 text-xs text-slate-500">Action: {t.corrective_action}</p>}
                      {t.due_date && <p className="mt-1 text-xs text-slate-400">Due: {format(new Date(t.due_date), 'MMM d, yyyy')}</p>}
                    </div>
                  ))
                )}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function SafetyStatCard({ icon: Icon, label, value, highlight }: { icon: React.ElementType; label: string; value: string; highlight?: boolean }) {
  return (
    <div className="rounded-xl border bg-white p-3 transition-transform duration-200 hover:scale-[1.02]">
      <Icon className={`mb-1 h-4 w-4 ${highlight ? 'text-red-500' : 'text-slate-400'}`} />
      <p className={`text-lg font-bold tabular-nums ${highlight ? 'text-red-600' : 'text-slate-900'}`}>{value}</p>
      <p className="text-xs text-slate-500">{label}</p>
    </div>
  );
}
