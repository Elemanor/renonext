'use client';

import { useState } from 'react';
import { Search, Eye, XCircle, AlertTriangle } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from '@/components/ui/table';
import type { JobStatus } from '@renonext/shared/types';

interface AdminJob {
  id: string;
  title: string;
  client: string;
  pro: string | null;
  category: string;
  status: JobStatus;
  city: string;
  totalCost: number | null;
  createdAt: string;
}

const mockJobs: AdminJob[] = [
  { id: 'J001', title: 'Fix leaking kitchen faucet', client: 'John Smith', pro: 'Marcus Johnson', category: 'Plumbing', status: 'in_progress', city: 'Toronto', totalCost: 250, createdAt: '2024-12-01' },
  { id: 'J002', title: 'Install new light fixtures', client: 'Maria Garcia', pro: 'Sarah Chen', category: 'Electrical', status: 'completed', city: 'Mississauga', totalCost: 450, createdAt: '2024-11-28' },
  { id: 'J003', title: 'Paint master bedroom', client: 'James Wilson', pro: null, category: 'Painting', status: 'bidding', city: 'Toronto', totalCost: null, createdAt: '2024-12-02' },
  { id: 'J004', title: 'Outdoor deck repair', client: 'Alice Williams', pro: 'James W.', category: 'Carpentry', status: 'disputed', city: 'Oakville', totalCost: 1200, createdAt: '2024-11-20' },
  { id: 'J005', title: 'Spring yard cleanup', client: 'Carol Lee', pro: null, category: 'Landscaping', status: 'posted', city: 'Brampton', totalCost: null, createdAt: '2024-12-03' },
  { id: 'J006', title: 'Bathroom renovation', client: 'Bob Martinez', pro: 'Elena Rodriguez', category: 'General Repair', status: 'cancelled', city: 'Toronto', totalCost: null, createdAt: '2024-11-15' },
];

const statusColors: Record<JobStatus, string> = {
  draft: 'bg-gray-100 text-gray-600',
  posted: 'bg-blue-100 text-blue-700',
  bidding: 'bg-purple-100 text-purple-700',
  accepted: 'bg-cyan-100 text-cyan-700',
  in_progress: 'bg-amber-100 text-amber-700',
  completed: 'bg-green-100 text-green-700',
  cancelled: 'bg-gray-100 text-gray-500',
  disputed: 'bg-red-100 text-red-700',
};

const statusLabels: Record<JobStatus, string> = {
  draft: 'Draft',
  posted: 'Posted',
  bidding: 'Bidding',
  accepted: 'Accepted',
  in_progress: 'In Progress',
  completed: 'Completed',
  cancelled: 'Cancelled',
  disputed: 'Disputed',
};

export default function AdminJobsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredJobs = mockJobs.filter((job) => {
    const matchesSearch =
      !searchQuery ||
      job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || job.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold tracking-tight text-gray-900">
        Job Management
      </h1>

      {/* Filters */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search by title or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border border-gray-200 py-2.5 pl-10 pr-4 text-sm outline-none transition-all duration-200 focus:border-reno-green focus:ring-2 focus:ring-reno-green-light"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[160px] rounded-xl border border-gray-200 px-4 py-2.5 text-sm transition-all duration-200 focus:border-reno-green focus:ring-2 focus:ring-reno-green-light">
            <SelectValue placeholder="All Statuses" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="posted">Posted</SelectItem>
            <SelectItem value="bidding">Bidding</SelectItem>
            <SelectItem value="in_progress">In Progress</SelectItem>
            <SelectItem value="completed">Completed</SelectItem>
            <SelectItem value="disputed">Disputed</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Jobs Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="border-b border-gray-100 bg-gray-50/50">
              <TableHead className="px-4 py-3.5 text-xs font-bold uppercase tracking-widest text-gray-400">ID</TableHead>
              <TableHead className="px-4 py-3.5 text-xs font-bold uppercase tracking-widest text-gray-400">Job</TableHead>
              <TableHead className="px-4 py-3.5 text-xs font-bold uppercase tracking-widest text-gray-400">Client</TableHead>
              <TableHead className="px-4 py-3.5 text-xs font-bold uppercase tracking-widest text-gray-400">Pro</TableHead>
              <TableHead className="px-4 py-3.5 text-xs font-bold uppercase tracking-widest text-gray-400">Status</TableHead>
              <TableHead className="px-4 py-3.5 text-xs font-bold uppercase tracking-widest text-gray-400">Cost</TableHead>
              <TableHead className="px-4 py-3.5 text-xs font-bold uppercase tracking-widest text-gray-400">Date</TableHead>
              <TableHead className="px-4 py-3.5 text-xs font-bold uppercase tracking-widest text-gray-400">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredJobs.map((job) => (
              <TableRow
                key={job.id}
                className="border-b border-gray-100 transition-all duration-200 last:border-0 hover:bg-gray-50/50"
              >
                <TableCell className="px-4 py-3.5 font-mono text-sm text-gray-500">
                  {job.id}
                </TableCell>
                <TableCell className="px-4 py-3.5">
                  <p className="text-sm font-medium text-gray-900">
                    {job.title}
                  </p>
                  <p className="text-xs text-gray-500">{job.category} &middot; {job.city}</p>
                </TableCell>
                <TableCell className="px-4 py-3.5 text-sm text-gray-700">
                  {job.client}
                </TableCell>
                <TableCell className="px-4 py-3.5 text-sm text-gray-700">
                  {job.pro || <span className="text-gray-400">--</span>}
                </TableCell>
                <TableCell className="px-4 py-3.5">
                  <Badge
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium border-transparent ${
                      statusColors[job.status]
                    }`}
                  >
                    {statusLabels[job.status]}
                  </Badge>
                </TableCell>
                <TableCell className="px-4 py-3.5 text-sm font-medium text-gray-900">
                  {job.totalCost
                    ? `$${job.totalCost.toLocaleString()}`
                    : <span className="text-gray-400">--</span>}
                </TableCell>
                <TableCell className="px-4 py-3.5 text-sm text-gray-500">
                  {new Date(job.createdAt).toLocaleDateString('en-CA', {
                    month: 'short',
                    day: 'numeric',
                  })}
                </TableCell>
                <TableCell className="px-4 py-3.5">
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="rounded-xl p-1.5 text-gray-400 transition-all duration-200 hover:bg-gray-100 hover:text-gray-600"
                      title="View"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    {job.status === 'disputed' && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-xl p-1.5 text-amber-500 transition-all duration-200 hover:bg-amber-50 hover:text-amber-600"
                        title="Resolve Dispute"
                      >
                        <AlertTriangle className="h-4 w-4" />
                      </Button>
                    )}
                    {['posted', 'bidding', 'in_progress'].includes(
                      job.status
                    ) && (
                      <Button
                        variant="ghost"
                        size="icon"
                        className="rounded-xl p-1.5 text-red-400 transition-all duration-200 hover:bg-red-50 hover:text-red-600"
                        title="Cancel Job"
                      >
                        <XCircle className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <p className="mt-4 text-sm text-gray-500">
        Showing {filteredJobs.length} of {mockJobs.length} jobs
      </p>
    </div>
  );
}
