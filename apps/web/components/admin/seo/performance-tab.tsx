'use client';

import { useState, useCallback, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { Loader2, Zap, RefreshCw } from 'lucide-react';

interface PageSpeedScore {
  id: string;
  url: string;
  strategy: string;
  performance_score: number;
  seo_score: number;
  accessibility_score: number;
  best_practices_score: number;
  fcp_ms: number;
  lcp_ms: number;
  cls: number;
  ttfb_ms: number;
  created_at: string;
}

export function PerformanceTab() {
  const [url, setUrl] = useState('https://renonext.com');
  const [strategy, setStrategy] = useState<'mobile' | 'desktop'>('mobile');
  const [scanning, setScanning] = useState(false);
  const [scores, setScores] = useState<PageSpeedScore[]>([]);
  const [loading, setLoading] = useState(true);

  const loadScores = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/seo/pagespeed');
      if (res.ok) {
        const data = await res.json();
        setScores(data.scores || []);
      }
    } catch (err) {
      console.error('Failed to load scores:', err);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    loadScores();
  }, [loadScores]);

  async function handleScan() {
    if (!url) return;
    setScanning(true);
    try {
      await fetch('/api/admin/seo/pagespeed', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url, strategy }),
      });
      // Poll for results after a delay
      setTimeout(() => {
        loadScores();
        setScanning(false);
      }, 15000);
    } catch (err) {
      console.error('Scan failed:', err);
      setScanning(false);
    }
  }

  function scoreColor(score: number): string {
    if (score >= 90) return 'text-reno-green-700 bg-reno-green-50';
    if (score >= 50) return 'text-amber-700 bg-amber-50';
    return 'text-red-700 bg-red-50';
  }

  return (
    <div className="space-y-4">
      <Card className="border-slate-200/60 shadow-sm">
        <CardContent className="p-5">
          <h3 className="font-semibold text-slate-900 mb-3">Trigger PageSpeed Scan</h3>
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              placeholder="https://renonext.com/services/underpinning"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1"
            />
            <Select value={strategy} onValueChange={(v) => setStrategy(v as 'mobile' | 'desktop')}>
              <SelectTrigger className="w-32 h-9 rounded-lg border-slate-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mobile">Mobile</SelectItem>
                <SelectItem value="desktop">Desktop</SelectItem>
              </SelectContent>
            </Select>
            <Button onClick={handleScan} disabled={scanning || !url} className="rounded-lg">
              {scanning ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Scanning...
                </>
              ) : (
                <>
                  <Zap className="h-4 w-4 mr-2" />
                  Scan
                </>
              )}
            </Button>
          </div>
          {scanning && (
            <p className="text-xs text-amber-600 mt-2">
              PageSpeed analysis is running in the background. Results will appear below.
            </p>
          )}
        </CardContent>
      </Card>

      <Card className="border-slate-200/60 shadow-sm overflow-hidden">
        <CardContent className="p-0">
          <div className="flex items-center justify-between px-5 py-3 border-b border-slate-100">
            <h3 className="font-semibold text-slate-900">Cached Scores</h3>
            <Button variant="ghost" size="sm" onClick={loadScores} className="h-7 text-xs rounded-lg">
              <RefreshCw className={`h-3 w-3 mr-1 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
            </div>
          ) : scores.length === 0 ? (
            <div className="text-center py-10 text-slate-500 text-sm">
              No scores yet. Trigger a scan above.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50/60">
                  <TableHead>URL</TableHead>
                  <TableHead className="text-center">Strategy</TableHead>
                  <TableHead className="text-center">Performance</TableHead>
                  <TableHead className="text-center">SEO</TableHead>
                  <TableHead className="text-center hidden md:table-cell">A11y</TableHead>
                  <TableHead className="text-center hidden lg:table-cell">FCP</TableHead>
                  <TableHead className="text-center hidden lg:table-cell">LCP</TableHead>
                  <TableHead className="text-center hidden lg:table-cell">CLS</TableHead>
                  <TableHead className="hidden sm:table-cell">Date</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {scores.map((score) => (
                  <TableRow key={score.id}>
                    <TableCell className="font-mono text-xs text-slate-600 max-w-[200px] truncate">
                      {score.url.replace('https://renonext.com', '') || '/'}
                    </TableCell>
                    <TableCell className="text-center text-xs text-slate-500">{score.strategy}</TableCell>
                    <TableCell className="text-center">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${scoreColor(score.performance_score)}`}>
                        {score.performance_score}
                      </span>
                    </TableCell>
                    <TableCell className="text-center">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${scoreColor(score.seo_score)}`}>
                        {score.seo_score}
                      </span>
                    </TableCell>
                    <TableCell className="text-center hidden md:table-cell">
                      <span className={`inline-block px-2 py-0.5 rounded text-xs font-medium ${scoreColor(score.accessibility_score)}`}>
                        {score.accessibility_score}
                      </span>
                    </TableCell>
                    <TableCell className="text-center hidden lg:table-cell text-xs text-slate-500">
                      {score.fcp_ms}ms
                    </TableCell>
                    <TableCell className="text-center hidden lg:table-cell text-xs text-slate-500">
                      {score.lcp_ms}ms
                    </TableCell>
                    <TableCell className="text-center hidden lg:table-cell text-xs text-slate-500">
                      {score.cls?.toFixed(3)}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-xs text-slate-500">
                      {new Date(score.created_at).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
