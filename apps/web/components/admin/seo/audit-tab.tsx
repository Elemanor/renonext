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
import { Loader2, AlertTriangle, AlertCircle, Info, Wand2, ChevronLeft, ChevronRight } from 'lucide-react';

interface AuditIssue {
  url: string;
  issueType: string;
  severity: 'critical' | 'warning' | 'info';
  evidence: Record<string, unknown>;
  fixAction: string;
}

interface AuditResult {
  issues: AuditIssue[];
  total: number;
  offset: number;
  limit: number;
  summary: {
    totalPages: number;
    critical: number;
    warning: number;
    info: number;
  };
}

const severityConfig = {
  critical: { icon: AlertTriangle, color: 'bg-red-100 text-red-700 border-red-200' },
  warning: { icon: AlertCircle, color: 'bg-amber-100 text-amber-700 border-amber-200' },
  info: { icon: Info, color: 'bg-blue-100 text-blue-700 border-blue-200' },
};

const PAGE_SIZE = 50;

interface AuditTabProps {
  onFixWithAI?: (issue: AuditIssue) => void;
}

export function AuditTab({ onFixWithAI }: AuditTabProps) {
  const [result, setResult] = useState<AuditResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [severityFilter, setSeverityFilter] = useState('all');
  const [offset, setOffset] = useState(0);

  const loadAudit = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/admin/seo/audit?offset=${offset}&limit=${PAGE_SIZE}`);
      if (res.ok) {
        setResult(await res.json());
      }
    } catch (err) {
      console.error('Audit load failed:', err);
    }
    setLoading(false);
  }, [offset]);

  useEffect(() => {
    loadAudit();
  }, [loadAudit]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  if (!result) {
    return <p className="text-gray-500 text-center py-10">Failed to load audit results.</p>;
  }

  const filtered = severityFilter === 'all'
    ? result.issues
    : result.issues.filter((i) => i.severity === severityFilter);

  const totalPages = Math.ceil(result.total / PAGE_SIZE);
  const currentPage = Math.floor(offset / PAGE_SIZE) + 1;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Select value={severityFilter} onValueChange={setSeverityFilter}>
            <SelectTrigger className="w-40 h-9 rounded-lg border-gray-200">
              <SelectValue placeholder="All severities" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All ({result.total})</SelectItem>
              <SelectItem value="critical">Critical ({result.summary.critical})</SelectItem>
              <SelectItem value="warning">Warning ({result.summary.warning})</SelectItem>
              <SelectItem value="info">Info ({result.summary.info})</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <p className="text-sm text-gray-500">
          {result.summary.totalPages} pages audited
        </p>
      </div>

      <Card className="border-gray-200/60 shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/60">
              <TableHead className="w-[80px]">Severity</TableHead>
              <TableHead>URL</TableHead>
              <TableHead>Issue</TableHead>
              <TableHead className="hidden lg:table-cell">Fix Action</TableHead>
              <TableHead className="w-[100px] text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-10 text-gray-500">
                  No issues found for this filter.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((issue, idx) => {
                const sev = severityConfig[issue.severity];
                const SevIcon = sev.icon;
                return (
                  <TableRow key={`${issue.url}-${issue.issueType}-${idx}`}>
                    <TableCell>
                      <Badge variant="outline" className={`inline-flex items-center gap-1 text-xs rounded-full px-2 py-0.5 ${sev.color}`}>
                        <SevIcon className="h-3 w-3" />
                        {issue.severity}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-mono text-xs text-gray-600 max-w-[250px] truncate">
                      {issue.url.replace('https://renonext.com', '')}
                    </TableCell>
                    <TableCell className="text-sm text-gray-700">
                      {issue.issueType.replace(/_/g, ' ')}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-xs text-gray-500 max-w-[300px] truncate">
                      {issue.fixAction}
                    </TableCell>
                    <TableCell className="text-right">
                      {onFixWithAI && (
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-xs h-7 rounded-lg"
                          onClick={() => onFixWithAI(issue)}
                        >
                          <Wand2 className="h-3 w-3 mr-1" />
                          Fix
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </Card>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={offset === 0}
            onClick={() => setOffset(Math.max(0, offset - PAGE_SIZE))}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-gray-500">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            disabled={offset + PAGE_SIZE >= result.total}
            onClick={() => setOffset(offset + PAGE_SIZE)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
