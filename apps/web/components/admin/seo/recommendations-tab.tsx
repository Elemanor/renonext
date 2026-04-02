'use client';

import { useEffect, useState, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Loader2, Check, X, Eye, Rocket } from 'lucide-react';

interface Recommendation {
  id: string;
  url: string;
  recommendation_type: string;
  input_snapshot: Record<string, unknown>;
  output_json: Record<string, unknown>;
  status: string;
  tokens_used: number | null;
  created_at: string;
  approved_by: string | null;
  applied_by: string | null;
  applied_at: string | null;
}

const statusColors: Record<string, string> = {
  draft: 'bg-slate-100 text-slate-700 border-slate-200',
  approved: 'bg-reno-green-100 text-reno-green-700 border-reno-green-200',
  applied: 'bg-primary-100 text-primary-700 border-primary-200',
  dismissed: 'bg-red-100 text-red-700 border-red-200',
};

export function RecommendationsTab() {
  const [recs, setRecs] = useState<Recommendation[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [acting, setActing] = useState<string | null>(null);
  const [previewRec, setPreviewRec] = useState<Recommendation | null>(null);

  const loadRecs = useCallback(async () => {
    setLoading(true);
    try {
      const url = statusFilter === 'all'
        ? '/api/admin/seo/recommendations'
        : `/api/admin/seo/recommendations?status=${statusFilter}`;
      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setRecs(data.recommendations || []);
      }
    } catch (err) {
      console.error('Failed to load recommendations:', err);
    }
    setLoading(false);
  }, [statusFilter]);

  useEffect(() => {
    loadRecs();
  }, [loadRecs]);

  async function handleAction(id: string, action: 'approved' | 'applied' | 'dismissed') {
    setActing(id);
    try {
      const res = await fetch('/api/admin/seo/recommendations', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, action }),
      });
      if (res.ok) {
        await loadRecs();
      }
    } catch (err) {
      console.error('Action failed:', err);
    }
    setActing(null);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-slate-400" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40 h-9 rounded-lg border-slate-200">
            <SelectValue placeholder="All statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="draft">Drafts</SelectItem>
            <SelectItem value="approved">Approved</SelectItem>
            <SelectItem value="applied">Applied</SelectItem>
            <SelectItem value="dismissed">Dismissed</SelectItem>
          </SelectContent>
        </Select>
        <span className="text-sm text-slate-500">{recs.length} recommendations</span>
      </div>

      <Card className="border-slate-200/60 shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50/60">
              <TableHead>Status</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>URL</TableHead>
              <TableHead className="hidden md:table-cell">Created</TableHead>
              <TableHead className="hidden lg:table-cell">Tokens</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recs.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-slate-500">
                  No recommendations yet. Use the Generate tab to create content.
                </TableCell>
              </TableRow>
            ) : (
              recs.map((rec) => (
                <TableRow key={rec.id}>
                  <TableCell>
                    <Badge variant="outline" className={`text-xs rounded-full px-2 py-0.5 ${statusColors[rec.status] || ''}`}>
                      {rec.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-sm text-slate-700">
                    {rec.recommendation_type.replace(/_/g, ' ')}
                  </TableCell>
                  <TableCell className="font-mono text-xs text-slate-600 max-w-[200px] truncate">
                    {rec.url.replace('https://renonext.com', '') || '/'}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-xs text-slate-500">
                    {new Date(rec.created_at).toLocaleDateString('en-CA', { month: 'short', day: 'numeric' })}
                  </TableCell>
                  <TableCell className="hidden lg:table-cell text-xs text-slate-500">
                    {rec.tokens_used?.toLocaleString() || '—'}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-7 w-7 p-0 rounded-lg"
                        onClick={() => setPreviewRec(rec)}
                      >
                        <Eye className="h-3.5 w-3.5" />
                      </Button>
                      {rec.status === 'draft' && (
                        <>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-xs rounded-lg text-reno-green-600 hover:text-reno-green-700"
                            disabled={acting === rec.id}
                            onClick={() => handleAction(rec.id, 'approved')}
                          >
                            {acting === rec.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Check className="h-3 w-3 mr-1" />}
                            Approve
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-xs rounded-lg text-red-500 hover:text-red-600"
                            disabled={acting === rec.id}
                            onClick={() => handleAction(rec.id, 'dismissed')}
                          >
                            <X className="h-3 w-3 mr-1" />
                            Dismiss
                          </Button>
                        </>
                      )}
                      {rec.status === 'approved' && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs rounded-lg text-primary-600 hover:text-primary-700"
                          disabled={acting === rec.id}
                          onClick={() => handleAction(rec.id, 'applied')}
                        >
                          {acting === rec.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Rocket className="h-3 w-3 mr-1" />}
                          Apply
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </Card>

      <Dialog open={!!previewRec} onOpenChange={() => setPreviewRec(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Recommendation Preview</DialogTitle>
          </DialogHeader>
          {previewRec && (
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-medium text-slate-500 uppercase mb-1">Input</h4>
                <pre className="bg-slate-50 rounded-lg p-3 text-xs text-slate-600 overflow-x-auto whitespace-pre-wrap">
                  {JSON.stringify(previewRec.input_snapshot, null, 2)}
                </pre>
              </div>
              <div>
                <h4 className="text-xs font-medium text-slate-500 uppercase mb-1">AI Output</h4>
                <pre className="bg-reno-green-50 rounded-lg p-3 text-xs text-reno-green-800 overflow-x-auto whitespace-pre-wrap">
                  {JSON.stringify(previewRec.output_json, null, 2)}
                </pre>
              </div>
              {previewRec.applied_at && (
                <p className="text-xs text-slate-500">
                  Applied at: {new Date(previewRec.applied_at).toLocaleString()}
                </p>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
