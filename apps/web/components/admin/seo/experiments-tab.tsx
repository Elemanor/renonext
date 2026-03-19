'use client';

import { useState, useCallback, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Loader2,
  FlaskConical,
  TrendingUp,
  TrendingDown,
  Minus,
  Clock,
  RefreshCw,
  Activity,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ExperimentWithStatus {
  id: string;
  recommendation_id: string | null;
  url: string;
  change_type: string;
  hypothesis: string | null;
  baseline_start: string | null;
  baseline_end: string | null;
  post_change_start: string | null;
  post_change_end: string | null;
  baseline_impressions: number | null;
  baseline_clicks: number | null;
  baseline_ctr: number | null;
  baseline_position: number | null;
  post_impressions: number | null;
  post_clicks: number | null;
  post_ctr: number | null;
  post_position: number | null;
  delta_impressions: number | null;
  delta_clicks: number | null;
  notes: string | null;
  created_at: string;
  status: 'baseline' | 'monitoring' | 'complete';
  daysRemaining: number;
  confidence: 'positive' | 'negative' | 'neutral' | 'pending';
}

interface CruxTrendPoint {
  date: string;
  lcp: number | null;
  cls: number | null;
  inp: number | null;
  fcp: number | null;
  ttfb: number | null;
}

const statusConfig = {
  baseline: { label: 'Baseline', color: 'bg-gray-100 text-gray-700', icon: Clock },
  monitoring: { label: 'Monitoring', color: 'bg-blue-100 text-blue-700', icon: Activity },
  complete: { label: 'Complete', color: 'bg-emerald-100 text-emerald-700', icon: FlaskConical },
};

const confidenceConfig = {
  positive: { label: 'Positive', color: 'text-emerald-700', icon: TrendingUp },
  negative: { label: 'Negative', color: 'text-red-600', icon: TrendingDown },
  neutral: { label: 'Neutral', color: 'text-gray-500', icon: Minus },
  pending: { label: 'Pending', color: 'text-gray-400', icon: Clock },
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------

export function ExperimentsTab() {
  const [experiments, setExperiments] = useState<ExperimentWithStatus[]>([]);
  const [loading, setLoading] = useState(true);
  const [collecting, setCollecting] = useState(false);
  const [cruxTrend, setCruxTrend] = useState<CruxTrendPoint[]>([]);
  const [cruxLoading, setCruxLoading] = useState(false);
  const [cruxFormFactor, setCruxFormFactor] = useState('PHONE');

  const loadExperiments = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/seo/experiments');
      if (res.ok) {
        const data = await res.json();
        setExperiments(data.experiments || []);
      }
    } catch (err) {
      console.error('Failed to load experiments:', err);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadExperiments();
  }, [loadExperiments]);

  async function handleCollectMetrics() {
    setCollecting(true);
    try {
      const res = await fetch('/api/admin/seo/experiments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'collect-post-metrics' }),
      });
      if (res.ok) {
        await loadExperiments();
      }
    } catch (err) {
      console.error('Failed to collect metrics:', err);
    }
    setCollecting(false);
  }

  async function loadCrux() {
    setCruxLoading(true);
    try {
      const res = await fetch(`/api/admin/seo/experiments?action=crux&formFactor=${cruxFormFactor}`);
      if (res.ok) {
        const data = await res.json();
        setCruxTrend(data.trend || []);
      }
    } catch (err) {
      console.error('CrUX fetch failed:', err);
    }
    setCruxLoading(false);
  }

  const monitoring = experiments.filter((e) => e.status === 'monitoring');
  const complete = experiments.filter((e) => e.status === 'complete');
  const positive = complete.filter((e) => e.confidence === 'positive');

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <SummaryCard label="Total Experiments" value={experiments.length} gradient="from-gray-400 to-gray-600" color="text-gray-700" />
        <SummaryCard label="Monitoring" value={monitoring.length} gradient="from-blue-400 to-blue-600" color="text-blue-700" />
        <SummaryCard label="Complete" value={complete.length} gradient="from-emerald-400 to-emerald-600" color="text-emerald-700" />
        <SummaryCard label="Positive Results" value={positive.length} gradient="from-violet-400 to-violet-600" color="text-violet-700" />
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Button onClick={handleCollectMetrics} disabled={collecting} variant="outline" className="rounded-lg">
          {collecting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <RefreshCw className="h-4 w-4 mr-2" />}
          Collect Post Metrics
        </Button>
      </div>

      {/* Experiments table */}
      {experiments.length === 0 ? (
        <Card className="border-gray-200/60 shadow-sm">
          <CardContent className="py-12 text-center text-gray-500 text-sm">
            No experiments yet. Apply a recommendation to start tracking.
          </CardContent>
        </Card>
      ) : (
        <Card className="border-gray-200/60 shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/60">
                <TableHead>Status</TableHead>
                <TableHead>URL</TableHead>
                <TableHead>Change</TableHead>
                <TableHead className="text-center hidden md:table-cell">Baseline</TableHead>
                <TableHead className="text-center hidden md:table-cell">Post</TableHead>
                <TableHead className="text-center hidden lg:table-cell">Delta Clicks</TableHead>
                <TableHead className="text-center">Result</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {experiments.map((exp) => {
                const sc = statusConfig[exp.status];
                const cc = confidenceConfig[exp.confidence];
                const ConfIcon = cc.icon;
                return (
                  <TableRow key={exp.id}>
                    <TableCell>
                      <Badge variant="outline" className={`text-xs rounded-full px-2 py-0.5 ${sc.color}`}>
                        {sc.label}
                        {exp.status === 'monitoring' && exp.daysRemaining > 0 && (
                          <span className="ml-1 opacity-70">({exp.daysRemaining}d)</span>
                        )}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs text-gray-600 max-w-[200px] truncate">
                      {exp.url.replace('https://renonext.com', '') || '/'}
                    </TableCell>
                    <TableCell className="text-sm text-gray-700">
                      {exp.change_type.replace(/_/g, ' ')}
                    </TableCell>
                    <TableCell className="text-center hidden md:table-cell text-xs text-gray-500">
                      {exp.baseline_clicks !== null ? (
                        <span>{exp.baseline_clicks} clicks / {exp.baseline_impressions} imp</span>
                      ) : '—'}
                    </TableCell>
                    <TableCell className="text-center hidden md:table-cell text-xs text-gray-500">
                      {exp.post_clicks !== null ? (
                        <span>{exp.post_clicks} clicks / {exp.post_impressions} imp</span>
                      ) : '—'}
                    </TableCell>
                    <TableCell className="text-center hidden lg:table-cell">
                      {exp.delta_clicks !== null ? (
                        <span className={`text-sm font-medium ${exp.delta_clicks > 0 ? 'text-emerald-600' : exp.delta_clicks < 0 ? 'text-red-600' : 'text-gray-500'}`}>
                          {exp.delta_clicks > 0 ? '+' : ''}{exp.delta_clicks}
                        </span>
                      ) : '—'}
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={`inline-flex items-center gap-1 text-xs font-medium ${cc.color}`}>
                        <ConfIcon className="h-3.5 w-3.5" />
                        {cc.label}
                      </span>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* CrUX Trends */}
      <Card className="border-gray-200/60 shadow-sm">
        <div className="h-1 w-full bg-gradient-to-r from-violet-400 to-violet-600 opacity-60" />
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity className="h-5 w-5 text-violet-600" />
              <h3 className="font-semibold text-gray-900">Core Web Vitals (CrUX)</h3>
            </div>
            <div className="flex items-center gap-2">
              <Select value={cruxFormFactor} onValueChange={setCruxFormFactor}>
                <SelectTrigger className="w-28 h-8 text-xs rounded-lg border-gray-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PHONE">Mobile</SelectItem>
                  <SelectItem value="DESKTOP">Desktop</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" onClick={loadCrux} disabled={cruxLoading} className="h-8 text-xs rounded-lg">
                {cruxLoading ? <Loader2 className="h-3 w-3 animate-spin mr-1" /> : <RefreshCw className="h-3 w-3 mr-1" />}
                Load
              </Button>
            </div>
          </div>

          {cruxTrend.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-6">
              Click &quot;Load&quot; to fetch CrUX history for renonext.com.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow className="bg-gray-50/60">
                    <TableHead>Week Ending</TableHead>
                    <TableHead className="text-center">LCP (ms)</TableHead>
                    <TableHead className="text-center">CLS</TableHead>
                    <TableHead className="text-center">INP (ms)</TableHead>
                    <TableHead className="text-center hidden md:table-cell">FCP (ms)</TableHead>
                    <TableHead className="text-center hidden md:table-cell">TTFB (ms)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cruxTrend.slice(-12).map((point) => (
                    <TableRow key={point.date}>
                      <TableCell className="text-xs text-gray-600">{point.date}</TableCell>
                      <TableCell className="text-center">
                        <CwvBadge value={point.lcp} thresholds={[2500, 4000]} unit="ms" />
                      </TableCell>
                      <TableCell className="text-center">
                        <CwvBadge value={point.cls !== null ? point.cls / 100 : null} thresholds={[0.1, 0.25]} unit="" decimals={3} />
                      </TableCell>
                      <TableCell className="text-center">
                        <CwvBadge value={point.inp} thresholds={[200, 500]} unit="ms" />
                      </TableCell>
                      <TableCell className="text-center hidden md:table-cell">
                        <CwvBadge value={point.fcp} thresholds={[1800, 3000]} unit="ms" />
                      </TableCell>
                      <TableCell className="text-center hidden md:table-cell">
                        <CwvBadge value={point.ttfb} thresholds={[800, 1800]} unit="ms" />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function SummaryCard({ label, value, gradient, color }: { label: string; value: number; gradient: string; color: string }) {
  return (
    <Card className="border-gray-200/60 shadow-sm overflow-hidden group">
      <div className={`h-1 w-full bg-gradient-to-r ${gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />
      <CardContent className="p-4 flex items-center gap-3">
        <FlaskConical className={`h-5 w-5 ${color} shrink-0`} />
        <div>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          <p className="text-xs text-gray-500">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

function CwvBadge({ value, thresholds, unit, decimals }: { value: number | null; thresholds: [number, number]; unit: string; decimals?: number }) {
  if (value === null) return <span className="text-xs text-gray-300">—</span>;
  const color = value <= thresholds[0]
    ? 'text-emerald-700 bg-emerald-50'
    : value <= thresholds[1]
      ? 'text-amber-700 bg-amber-50'
      : 'text-red-700 bg-red-50';
  const display = decimals !== undefined ? value.toFixed(decimals) : Math.round(value);
  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${color}`}>
      {display}{unit}
    </span>
  );
}
