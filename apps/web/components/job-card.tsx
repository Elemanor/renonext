import Link from 'next/link';
import { MapPin, Calendar, DollarSign, Tag, Zap } from 'lucide-react';
import type { JobStatus } from '@renonext/shared/types';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface JobCardProps {
  id: string;
  title: string;
  category: string;
  status: JobStatus;
  city: string;
  createdAt: string;
  budgetMin: number | null;
  budgetMax: number | null;
  isUrgent: boolean;
  href?: string;
  actions?: React.ReactNode;
}

const statusConfig: Record<
  JobStatus,
  { label: string; className: string; dot: string }
> = {
  draft: { label: 'Draft', className: 'bg-gray-100 text-gray-600', dot: 'bg-gray-400' },
  posted: { label: 'Posted', className: 'bg-blue-50 text-blue-700', dot: 'bg-blue-500' },
  bidding: { label: 'Receiving Bids', className: 'bg-purple-50 text-purple-700', dot: 'bg-purple-500' },
  accepted: { label: 'Accepted', className: 'bg-cyan-50 text-cyan-700', dot: 'bg-cyan-500' },
  in_progress: { label: 'In Progress', className: 'bg-amber-50 text-amber-700', dot: 'bg-amber-500' },
  completed: { label: 'Completed', className: 'bg-green-50 text-green-700', dot: 'bg-green-500' },
  cancelled: { label: 'Cancelled', className: 'bg-gray-100 text-gray-500', dot: 'bg-gray-400' },
  disputed: { label: 'Disputed', className: 'bg-red-50 text-red-700', dot: 'bg-red-500' },
};

export function JobCard({
  id,
  title,
  category,
  status,
  city,
  createdAt,
  budgetMin,
  budgetMax,
  isUrgent,
  href,
  actions,
}: JobCardProps) {
  const statusInfo = statusConfig[status];
  const formattedDate = new Date(createdAt).toLocaleDateString('en-CA', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const formatBudget = () => {
    if (!budgetMin && !budgetMax) return 'Open budget';
    if (budgetMin && budgetMax) return `$${budgetMin} - $${budgetMax}`;
    if (budgetMin) return `From $${budgetMin}`;
    return `Up to $${budgetMax}`;
  };

  const content = (
    <Card className="rounded-2xl border border-gray-200 bg-white p-5 shadow-none transition-all duration-200 hover:border-gray-300 hover:shadow-md">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center gap-2">
            <h3 className="truncate font-semibold text-gray-900">{title}</h3>
            {isUrgent && (
              <Badge variant="destructive" className="inline-flex shrink-0 items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-700 hover:bg-red-50">
                <Zap className="h-3 w-3" />
                Urgent
              </Badge>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <Tag className="h-3 w-3" />
              {category}
            </span>
          </div>
        </div>
        <Badge
          className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${statusInfo.className}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${statusInfo.dot}`} />
          {statusInfo.label}
        </Badge>
      </div>

      <div className="mb-3 flex flex-wrap items-center gap-4 text-sm text-gray-500">
        <span className="flex items-center gap-1.5">
          <MapPin className="h-4 w-4 text-gray-400" />
          {city}
        </span>
        <span className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4 text-gray-400" />
          {formattedDate}
        </span>
        <span className="flex items-center gap-1.5 font-semibold text-gray-900">
          <DollarSign className="h-4 w-4 text-gray-400" />
          {formatBudget()}
        </span>
      </div>

      {actions && <div className="flex items-center gap-2 border-t border-gray-100 pt-3">{actions}</div>}
    </Card>
  );

  if (href) {
    return <Link href={href} className="block">{content}</Link>;
  }

  return content;
}
