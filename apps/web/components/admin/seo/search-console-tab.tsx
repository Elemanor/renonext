'use client';

import { useState, useCallback } from 'react';
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
import { Loader2, TrendingUp, Search, Target, Map, Globe, ArrowUpRight, ArrowDownRight } from 'lucide-react';

type View = 'keywords' | 'pages' | 'quick-wins' | 'sitemaps' | 'inspect';

interface AnalyticsRow {
  keys: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

interface QuickWin {
  query: string;
  page: string;
  impressions: number;
  clicks: number;
  ctr: number;
  position: number;
}

interface SitemapInfo {
  path: string;
  lastSubmitted?: string;
  isPending: boolean;
  errors?: number;
  warnings?: number;
  contents?: { type: string; submitted: number; indexed: number }[];
}

interface InspectionResult {
  inspectionResult?: {
    indexStatusResult?: {
      verdict: string;
      coverageState: string;
      lastCrawlTime?: string;
      pageFetchState?: string;
      crawledAs?: string;
      indexingState?: string;
    };
  };
}

export function SearchConsoleTab() {
  const [view, setView] = useState<View>('keywords');
  const [days, setDays] = useState('28');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Data states
  const [rows, setRows] = useState<AnalyticsRow[]>([]);
  const [quickWins, setQuickWins] = useState<QuickWin[]>([]);
  const [sitemaps, setSitemaps] = useState<SitemapInfo[]>([]);
  const [inspectUrl, setInspectUrl] = useState('https://renonext.com');
  const [inspectResult, setInspectResult] = useState<InspectionResult | null>(null);

  const loadData = useCallback(async (action?: View) => {
    const currentView = action || view;
    setLoading(true);
    setError('');

    try {
      if (currentView === 'inspect') {
        const res = await fetch(`/api/admin/seo/search-console?action=inspect&url=${encodeURIComponent(inspectUrl)}`);
        if (!res.ok) throw new Error((await res.json()).error);
        setInspectResult(await res.json());
      } else {
        const res = await fetch(`/api/admin/seo/search-console?action=${currentView}&days=${days}&limit=50`);
        if (!res.ok) throw new Error((await res.json()).error);
        const data = await res.json();

        if (currentView === 'quick-wins') {
          setQuickWins(data.wins || []);
        } else if (currentView === 'sitemaps') {
          setSitemaps(data.sitemaps || []);
        } else {
          setRows(data.rows || []);
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Request failed');
    }
    setLoading(false);
  }, [view, days, inspectUrl]);

  const views: { value: View; label: string; icon: typeof Search }[] = [
    { value: 'keywords', label: 'Keywords', icon: Search },
    { value: 'pages', label: 'Top Pages', icon: Globe },
    { value: 'quick-wins', label: 'Quick Wins', icon: Target },
    { value: 'sitemaps', label: 'Sitemaps', icon: Map },
    { value: 'inspect', label: 'URL Inspect', icon: TrendingUp },
  ];

  return (
    <div className="space-y-4">
      {/* View selector */}
      <div className="flex flex-wrap gap-2">
        {views.map((v) => (
          <Button
            key={v.value}
            variant={view === v.value ? 'default' : 'outline'}
            size="sm"
            className="rounded-lg text-sm"
            onClick={() => { setView(v.value); setRows([]); setQuickWins([]); setSitemaps([]); setInspectResult(null); }}
          >
            <v.icon className="h-3.5 w-3.5 mr-1.5" />
            {v.label}
          </Button>
        ))}
      </div>

      {/* Controls */}
      <Card className="border-gray-200/60 shadow-sm">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-3 items-end">
            {view !== 'sitemaps' && view !== 'inspect' && (
              <div>
                <label className="text-xs font-medium text-gray-500 mb-1 block">Date Range</label>
                <Select value={days} onValueChange={setDays}>
                  <SelectTrigger className="w-40 h-9 rounded-lg border-gray-200">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="7">Last 7 days</SelectItem>
                    <SelectItem value="28">Last 28 days</SelectItem>
                    <SelectItem value="90">Last 90 days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {view === 'inspect' && (
              <div className="flex-1">
                <label className="text-xs font-medium text-gray-500 mb-1 block">URL to Inspect</label>
                <Input
                  value={inspectUrl}
                  onChange={(e) => setInspectUrl(e.target.value)}
                  placeholder="https://renonext.com/services/underpinning"
                />
              </div>
            )}

            <Button onClick={() => loadData()} disabled={loading} className="rounded-lg h-9">
              {loading ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Search className="h-4 w-4 mr-2" />}
              {loading ? 'Loading...' : 'Fetch Data'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {error && (
        <div className="p-3 bg-red-50 text-red-700 text-sm rounded-lg">{error}</div>
      )}

      {/* Keywords / Pages table */}
      {(view === 'keywords' || view === 'pages') && rows.length > 0 && (
        <Card className="border-gray-200/60 shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/60">
                <TableHead>{view === 'keywords' ? 'Keyword' : 'Page'}</TableHead>
                <TableHead className="text-right">Clicks</TableHead>
                <TableHead className="text-right">Impressions</TableHead>
                <TableHead className="text-right">CTR</TableHead>
                <TableHead className="text-right">Position</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.map((row, i) => (
                <TableRow key={i}>
                  <TableCell className={`text-sm ${view === 'pages' ? 'font-mono text-xs text-gray-600 max-w-[300px] truncate' : 'text-gray-800'}`}>
                    {row.keys[0]?.replace('https://renonext.com', '') || '—'}
                  </TableCell>
                  <TableCell className="text-right text-sm font-medium">{row.clicks.toLocaleString()}</TableCell>
                  <TableCell className="text-right text-sm text-gray-600">{row.impressions.toLocaleString()}</TableCell>
                  <TableCell className="text-right text-sm">
                    <span className={row.ctr > 0.05 ? 'text-emerald-600' : 'text-gray-600'}>
                      {(row.ctr * 100).toFixed(1)}%
                    </span>
                  </TableCell>
                  <TableCell className="text-right text-sm">
                    <PositionBadge position={row.position} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* Quick Wins */}
      {view === 'quick-wins' && quickWins.length > 0 && (
        <Card className="border-gray-200/60 shadow-sm overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-amber-400 to-amber-600 opacity-60" />
          <CardContent className="p-0">
            <div className="px-5 py-3 border-b border-gray-100">
              <p className="text-xs text-gray-500">
                High-impression keywords at positions 5-20 with low CTR. Improving these titles/descriptions could yield quick traffic gains.
              </p>
            </div>
            <Table>
              <TableHeader>
                <TableRow className="bg-gray-50/60">
                  <TableHead>Keyword</TableHead>
                  <TableHead className="hidden md:table-cell">Page</TableHead>
                  <TableHead className="text-right">Impressions</TableHead>
                  <TableHead className="text-right">Clicks</TableHead>
                  <TableHead className="text-right">CTR</TableHead>
                  <TableHead className="text-right">Position</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {quickWins.map((win, i) => (
                  <TableRow key={i}>
                    <TableCell className="text-sm text-gray-800 font-medium">{win.query}</TableCell>
                    <TableCell className="hidden md:table-cell font-mono text-xs text-gray-500 max-w-[200px] truncate">
                      {win.page.replace('https://renonext.com', '')}
                    </TableCell>
                    <TableCell className="text-right text-sm">{win.impressions.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-sm">{win.clicks.toLocaleString()}</TableCell>
                    <TableCell className="text-right text-sm text-amber-600">{(win.ctr * 100).toFixed(1)}%</TableCell>
                    <TableCell className="text-right">
                      <PositionBadge position={win.position} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      {/* Sitemaps */}
      {view === 'sitemaps' && sitemaps.length > 0 && (
        <Card className="border-gray-200/60 shadow-sm overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/60">
                <TableHead>Sitemap</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center hidden md:table-cell">Errors</TableHead>
                <TableHead className="text-center hidden md:table-cell">Warnings</TableHead>
                <TableHead className="hidden lg:table-cell">Last Submitted</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sitemaps.map((sm, i) => (
                <TableRow key={i}>
                  <TableCell className="font-mono text-xs text-gray-600">{sm.path}</TableCell>
                  <TableCell className="text-center">
                    <Badge variant="outline" className={`text-xs rounded-full px-2 py-0.5 ${sm.isPending ? 'bg-amber-100 text-amber-700' : 'bg-emerald-100 text-emerald-700'}`}>
                      {sm.isPending ? 'Pending' : 'Processed'}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center hidden md:table-cell text-sm">
                    <span className={sm.errors ? 'text-red-600 font-medium' : 'text-gray-400'}>{sm.errors ?? 0}</span>
                  </TableCell>
                  <TableCell className="text-center hidden md:table-cell text-sm">
                    <span className={sm.warnings ? 'text-amber-600' : 'text-gray-400'}>{sm.warnings ?? 0}</span>
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-xs text-gray-500">
                    {sm.lastSubmitted ? new Date(sm.lastSubmitted).toLocaleDateString('en-CA') : '—'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      )}

      {/* URL Inspection */}
      {view === 'inspect' && inspectResult && (
        <Card className="border-gray-200/60 shadow-sm">
          <CardContent className="p-5 space-y-4">
            <h3 className="font-semibold text-gray-900">Inspection Result</h3>
            {(() => {
              const idx = inspectResult.inspectionResult?.indexStatusResult;
              if (!idx) return <p className="text-sm text-gray-500">No indexing data available.</p>;

              const isIndexed = idx.verdict === 'PASS';
              return (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className={`text-xs rounded-full px-3 py-1 ${isIndexed ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                      {isIndexed ? 'Indexed' : 'Not Indexed'}
                    </Badge>
                    <span className="text-sm text-gray-600">{idx.coverageState}</span>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                    <div>
                      <span className="text-xs text-gray-500 block">Last Crawl</span>
                      <span className="text-gray-800">{idx.lastCrawlTime ? new Date(idx.lastCrawlTime).toLocaleDateString('en-CA') : '—'}</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 block">Fetch State</span>
                      <span className="text-gray-800">{idx.pageFetchState || '—'}</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 block">Crawled As</span>
                      <span className="text-gray-800">{idx.crawledAs || '—'}</span>
                    </div>
                    <div>
                      <span className="text-xs text-gray-500 block">Indexing State</span>
                      <span className="text-gray-800">{idx.indexingState || '—'}</span>
                    </div>
                  </div>
                </div>
              );
            })()}
          </CardContent>
        </Card>
      )}

      {/* Empty state */}
      {!loading && !error && rows.length === 0 && quickWins.length === 0 && sitemaps.length === 0 && !inspectResult && (
        <Card className="border-gray-200/60 shadow-sm">
          <CardContent className="py-12 text-center text-gray-500 text-sm">
            Click &quot;Fetch Data&quot; to load Search Console data.
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function PositionBadge({ position }: { position: number }) {
  const rounded = Math.round(position * 10) / 10;
  const color = position <= 3
    ? 'text-emerald-700 bg-emerald-50'
    : position <= 10
      ? 'text-blue-700 bg-blue-50'
      : position <= 20
        ? 'text-amber-700 bg-amber-50'
        : 'text-gray-700 bg-gray-50';

  return (
    <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${color}`}>
      {rounded}
    </span>
  );
}
