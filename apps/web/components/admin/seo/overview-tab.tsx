'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { AlertTriangle, AlertCircle, Info, FileText, Activity, Loader2 } from 'lucide-react';

interface AuditSummary {
  totalPages: number;
  critical: number;
  warning: number;
  info: number;
}

interface PageSpeedScore {
  id: string;
  url: string;
  strategy: string;
  performance_score: number;
  seo_score: number;
  accessibility_score: number;
  best_practices_score: number;
  created_at: string;
}

export function OverviewTab() {
  const [summary, setSummary] = useState<AuditSummary | null>(null);
  const [scores, setScores] = useState<PageSpeedScore[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const [auditRes, speedRes] = await Promise.all([
          fetch('/api/admin/seo/audit?limit=1'),
          fetch('/api/admin/seo/pagespeed'),
        ]);
        if (auditRes.ok) {
          const data = await auditRes.json();
          setSummary(data.summary);
        }
        if (speedRes.ok) {
          const data = await speedRes.json();
          setScores(data.scores || []);
        }
      } catch (err) {
        console.error('Failed to load overview:', err);
      }
      setLoading(false);
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
      </div>
    );
  }

  const cards = [
    {
      label: 'Total Pages',
      value: summary?.totalPages ?? '—',
      icon: FileText,
      color: 'text-gray-700',
      gradient: 'from-gray-400 to-gray-600',
    },
    {
      label: 'Critical Issues',
      value: summary?.critical ?? 0,
      icon: AlertTriangle,
      color: 'text-red-700',
      gradient: 'from-red-400 to-red-600',
    },
    {
      label: 'Warnings',
      value: summary?.warning ?? 0,
      icon: AlertCircle,
      color: 'text-amber-700',
      gradient: 'from-amber-400 to-amber-600',
    },
    {
      label: 'Info',
      value: summary?.info ?? 0,
      icon: Info,
      color: 'text-blue-700',
      gradient: 'from-blue-400 to-blue-600',
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {cards.map((card) => (
          <Card key={card.label} className="border-gray-200/60 shadow-sm overflow-hidden group">
            <div className={`h-1 w-full bg-gradient-to-r ${card.gradient} opacity-60 group-hover:opacity-100 transition-opacity`} />
            <CardContent className="p-4 flex items-center gap-3">
              <card.icon className={`h-5 w-5 ${card.color} shrink-0`} />
              <div>
                <p className="text-2xl font-bold text-gray-900">{card.value}</p>
                <p className="text-xs text-gray-500">{card.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {scores.length > 0 && (
        <Card className="border-gray-200/60 shadow-sm">
          <div className="h-1 w-full bg-gradient-to-r from-emerald-400 to-emerald-600 opacity-60" />
          <CardContent className="p-5">
            <div className="flex items-center gap-2 mb-4">
              <Activity className="h-5 w-5 text-emerald-600" />
              <h3 className="font-semibold text-gray-900">Recent PageSpeed Scores</h3>
            </div>
            <div className="space-y-3">
              {scores.slice(0, 5).map((score) => (
                <div key={score.id} className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 truncate max-w-[300px]">{score.url.replace('https://renonext.com', '')}</span>
                  <div className="flex gap-4">
                    <ScoreBadge label="Perf" value={score.performance_score} />
                    <ScoreBadge label="SEO" value={score.seo_score} />
                    <ScoreBadge label="A11y" value={score.accessibility_score} />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function ScoreBadge({ label, value }: { label: string; value: number }) {
  const color = value >= 90 ? 'text-emerald-700 bg-emerald-50' : value >= 50 ? 'text-amber-700 bg-amber-50' : 'text-red-700 bg-red-50';
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded text-xs font-medium ${color}`}>
      {label}: {value}
    </span>
  );
}
