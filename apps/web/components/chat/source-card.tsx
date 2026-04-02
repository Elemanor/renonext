'use client';

import {
  DollarSign,
  FileText,
  BookOpen,
  Wrench,
  Building2,
  Repeat,
  Banknote,
  Upload,
} from 'lucide-react';

interface Source {
  type: string;
  name: string;
  section?: string | null;
  page?: number | null;
  metadata?: Record<string, unknown>;
}

const SOURCE_CONFIG: Record<string, { icon: typeof FileText; color: string; href?: (s: Source) => string }> = {
  cost_guide: {
    icon: DollarSign,
    color: 'bg-reno-green-500/10 text-reno-green-400 border-reno-green-500/20',
    href: (s) => `/costs/${(s.metadata?.slug as string) || ''}`,
  },
  blog: {
    icon: BookOpen,
    color: 'bg-primary-500/10 text-primary-400 border-primary-500/20',
    href: (s) => `/blog/${(s.metadata?.slug as string) || ''}`,
  },
  service: {
    icon: Wrench,
    color: 'bg-purple-500/10 text-purple-400 border-purple-500/20',
    href: (s) => `/services/${(s.metadata?.slug as string) || ''}`,
  },
  contract: {
    icon: FileText,
    color: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    href: () => '/contracts',
  },
  rebate: {
    icon: Banknote,
    color: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
  },
  obc: {
    icon: Building2,
    color: 'bg-red-500/10 text-red-400 border-red-500/20',
  },
  sequence: {
    icon: Repeat,
    color: 'bg-primary-500/10 text-primary-400 border-primary-500/20',
  },
  upload: {
    icon: Upload,
    color: 'bg-slate-500/10 text-slate-400 border-slate-500/20',
  },
};

export function SourceCard({ source }: { source: Source }) {
  const config = SOURCE_CONFIG[source.type] || SOURCE_CONFIG.upload;
  const Icon = config.icon;
  const href = config.href?.(source);
  const label = source.name + (source.page ? ` — p.${source.page}` : '');

  const content = (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${config.color}`}>
      <Icon className="h-3 w-3" />
      <span className="max-w-[180px] truncate">{label}</span>
    </span>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
        {content}
      </a>
    );
  }

  return content;
}
