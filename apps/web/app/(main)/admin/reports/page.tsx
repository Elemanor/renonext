'use client';

import { useState } from 'react';
import {
  AlertTriangle,
  CheckCircle,
  Eye,
  MessageSquare,
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

interface Report {
  id: string;
  type: 'dispute' | 'complaint' | 'fraud' | 'safety';
  title: string;
  description: string;
  reportedBy: string;
  reportedUser: string;
  jobId: string | null;
  status: 'open' | 'investigating' | 'resolved' | 'dismissed';
  priority: 'low' | 'medium' | 'high' | 'critical';
  createdAt: string;
}

const mockReports: Report[] = [
  {
    id: 'R001',
    type: 'dispute',
    title: 'Job not completed as described',
    description: 'The pro left the project unfinished and is not responding to messages.',
    reportedBy: 'Alice Williams',
    reportedUser: 'James W.',
    jobId: 'J004',
    status: 'investigating',
    priority: 'high',
    createdAt: '2024-12-01',
  },
  {
    id: 'R002',
    type: 'complaint',
    title: 'Late arrival and overcharging',
    description: 'Pro arrived 2 hours late and charged more than the bid amount without prior agreement.',
    reportedBy: 'John Smith',
    reportedUser: 'David Park',
    jobId: 'J007',
    status: 'open',
    priority: 'medium',
    createdAt: '2024-11-30',
  },
  {
    id: 'R003',
    type: 'fraud',
    title: 'Fake reviews detected',
    description: 'Multiple reviews from same IP address. Possible review manipulation.',
    reportedBy: 'System',
    reportedUser: 'Unknown Pro',
    jobId: null,
    status: 'investigating',
    priority: 'critical',
    createdAt: '2024-11-28',
  },
  {
    id: 'R004',
    type: 'safety',
    title: 'Safety concern on job site',
    description: 'Client reports pro did not follow electrical safety protocols.',
    reportedBy: 'Carol Lee',
    reportedUser: 'Bob Martinez',
    jobId: 'J010',
    status: 'open',
    priority: 'high',
    createdAt: '2024-11-25',
  },
  {
    id: 'R005',
    type: 'dispute',
    title: 'Refund request for incomplete work',
    description: 'Client requesting full refund. Pro claims work was completed.',
    reportedBy: 'Dan Brown',
    reportedUser: 'Elena Rodriguez',
    jobId: 'J015',
    status: 'resolved',
    priority: 'medium',
    createdAt: '2024-11-20',
  },
];

const statusColors: Record<string, string> = {
  open: 'bg-blue-100 text-blue-700',
  investigating: 'bg-amber-100 text-amber-700',
  resolved: 'bg-green-100 text-green-700',
  dismissed: 'bg-gray-100 text-gray-500',
};

const priorityColors: Record<string, string> = {
  low: 'text-gray-500',
  medium: 'text-amber-500',
  high: 'text-orange-500',
  critical: 'text-red-600',
};

const typeIcons: Record<string, string> = {
  dispute: 'bg-purple-100',
  complaint: 'bg-blue-100',
  fraud: 'bg-red-100',
  safety: 'bg-orange-100',
};

export default function AdminReportsPage() {
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedReport, setSelectedReport] = useState<string | null>(null);

  const filteredReports = mockReports.filter(
    (report) => statusFilter === 'all' || report.status === statusFilter
  );

  const selected = mockReports.find((r) => r.id === selectedReport);

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold tracking-tight text-gray-900">
        Reports & Disputes
      </h1>

      {/* Stats */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {[
          { label: 'Open', count: mockReports.filter((r) => r.status === 'open').length, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Investigating', count: mockReports.filter((r) => r.status === 'investigating').length, color: 'text-amber-600', bg: 'bg-amber-50' },
          { label: 'Resolved', count: mockReports.filter((r) => r.status === 'resolved').length, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Total', count: mockReports.length, color: 'text-gray-900', bg: 'bg-gray-50' },
        ].map((stat) => (
          <Card key={stat.label} className={`rounded-2xl border border-gray-200 ${stat.bg} shadow-none text-center`}>
            <CardContent className="p-4">
              <p className={`text-2xl font-bold tracking-tight ${stat.color}`}>{stat.count}</p>
              <p className="text-xs font-medium text-gray-500">{stat.label}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filter */}
      <div className="mb-4">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px] rounded-xl border border-gray-200 px-4 py-2.5 text-sm transition-all duration-200 focus:border-reno-green focus:ring-2 focus:ring-reno-green-light">
            <SelectValue placeholder="All Reports" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Reports</SelectItem>
            <SelectItem value="open">Open</SelectItem>
            <SelectItem value="investigating">Investigating</SelectItem>
            <SelectItem value="resolved">Resolved</SelectItem>
            <SelectItem value="dismissed">Dismissed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Reports List */}
        <div className="flex-1 space-y-3">
          {filteredReports.map((report) => (
            <button
              key={report.id}
              onClick={() => setSelectedReport(report.id)}
              className={`w-full text-left`}
            >
              <Card
                className={`rounded-2xl border bg-white shadow-sm transition-all duration-200 hover:shadow-md ${
                  selectedReport === report.id ? 'border-reno-green ring-2 ring-reno-green-light' : 'border-gray-200'
                }`}
              >
                <CardContent className="p-4">
                  <div className="mb-2 flex items-start justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className={`rounded-xl p-2 ${typeIcons[report.type]}`}>
                        <AlertTriangle className={`h-4 w-4 ${priorityColors[report.priority]}`} />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">
                          {report.title}
                        </p>
                        <p className="text-xs text-gray-500">
                          {report.id} &middot; {report.type}
                        </p>
                      </div>
                    </div>
                    <Badge
                      className={`shrink-0 rounded-full px-2.5 py-0.5 text-xs font-medium capitalize border-transparent ${
                        statusColors[report.status]
                      }`}
                    >
                      {report.status}
                    </Badge>
                  </div>
                  <p className="mb-2 line-clamp-2 text-xs leading-relaxed text-gray-600">
                    {report.description}
                  </p>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span>
                      By: {report.reportedBy}
                    </span>
                    <span>
                      {new Date(report.createdAt).toLocaleDateString('en-CA', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                    <span className={`font-semibold capitalize ${priorityColors[report.priority]}`}>
                      {report.priority}
                    </span>
                  </div>
                </CardContent>
              </Card>
            </button>
          ))}
        </div>

        {/* Detail Panel */}
        {selected && (
          <Card className="w-full rounded-2xl border border-gray-200 bg-white shadow-sm lg:w-96">
            <CardHeader>
              <CardTitle className="text-lg font-bold text-gray-900">
                {selected.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                    Description
                  </p>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-700">
                    {selected.description}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                      Reported By
                    </p>
                    <p className="mt-1.5 text-sm font-medium text-gray-700">
                      {selected.reportedBy}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                      Reported User
                    </p>
                    <p className="mt-1.5 text-sm font-medium text-gray-700">
                      {selected.reportedUser}
                    </p>
                  </div>
                </div>
                {selected.jobId && (
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                      Related Job
                    </p>
                    <p className="mt-1.5 text-sm font-mono font-medium text-reno-green-dark">
                      {selected.jobId}
                    </p>
                  </div>
                )}

                <div className="border-t border-gray-100 pt-4">
                  <p className="mb-3 text-sm font-bold text-gray-900">
                    Actions
                  </p>
                  <div className="space-y-2">
                    <Button className="w-full rounded-xl bg-reno-green-dark px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-reno-green-dark hover:shadow-md hover:shadow-reno-green-light">
                      <MessageSquare className="h-4 w-4" />
                      Contact Parties
                    </Button>
                    <Button variant="outline" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50">
                      <CheckCircle className="h-4 w-4" />
                      Mark as Resolved
                    </Button>
                    <Button variant="outline" className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50">
                      <Eye className="h-4 w-4" />
                      View Full Details
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
