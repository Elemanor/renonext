'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, Briefcase } from 'lucide-react';
import { JobCard } from '@/components/job-card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import type { JobStatus } from '@renonext/shared/types';

interface MockJob {
  id: string;
  title: string;
  category: string;
  status: JobStatus;
  city: string;
  createdAt: string;
  budgetMin: number | null;
  budgetMax: number | null;
  isUrgent: boolean;
  bidCount: number;
}

const mockJobs: MockJob[] = [
  {
    id: '1',
    title: 'Fix leaking kitchen faucet',
    category: 'Plumbing',
    status: 'bidding',
    city: 'Toronto',
    createdAt: '2024-12-01',
    budgetMin: 100,
    budgetMax: 300,
    isUrgent: false,
    bidCount: 4,
  },
  {
    id: '2',
    title: 'Install new light fixtures in living room',
    category: 'Electrical',
    status: 'in_progress',
    city: 'Toronto',
    createdAt: '2024-11-28',
    budgetMin: 200,
    budgetMax: 500,
    isUrgent: false,
    bidCount: 6,
  },
  {
    id: '3',
    title: 'Paint master bedroom',
    category: 'Painting',
    status: 'completed',
    city: 'Toronto',
    createdAt: '2024-11-15',
    budgetMin: 300,
    budgetMax: 600,
    isUrgent: false,
    bidCount: 3,
  },
  {
    id: '4',
    title: 'Emergency pipe burst repair',
    category: 'Plumbing',
    status: 'completed',
    city: 'Toronto',
    createdAt: '2024-11-10',
    budgetMin: null,
    budgetMax: null,
    isUrgent: true,
    bidCount: 2,
  },
  {
    id: '5',
    title: 'Spring yard cleanup',
    category: 'Landscaping',
    status: 'draft',
    city: 'Toronto',
    createdAt: '2024-12-02',
    budgetMin: 150,
    budgetMax: 300,
    isUrgent: false,
    bidCount: 0,
  },
];

type TabKey = 'active' | 'completed' | 'drafts';

const tabConfig: { key: TabKey; label: string; statuses: JobStatus[] }[] = [
  { key: 'active', label: 'Active', statuses: ['posted', 'bidding', 'accepted', 'in_progress'] },
  { key: 'completed', label: 'Completed', statuses: ['completed'] },
  { key: 'drafts', label: 'Drafts', statuses: ['draft'] },
];

export default function ClientJobsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [jobs, setJobs] = useState<MockJob[]>(mockJobs);

  useEffect(() => {
    fetch('/api/jobs/available')
      .then((res) => res.json())
      .then((json) => {
        if (json.data && json.data.length > 0) {
          const mapped: MockJob[] = json.data.map(
            (j: Record<string, unknown>) => ({
              id: j.id as string,
              title: j.title as string,
              category:
                (j.category as Record<string, unknown>)?.name ?? 'General',
              status: j.status as JobStatus,
              city: (j.city as string) || 'Toronto',
              createdAt: j.created_at as string,
              budgetMin: j.budget_min as number | null,
              budgetMax: j.budget_max as number | null,
              isUrgent: j.is_urgent as boolean,
              bidCount: 0,
            })
          );
          setJobs(mapped);
        }
      })
      .catch(() => {
        // Keep mock data on failure
      });
  }, []);

  const getFilteredJobs = (statuses: JobStatus[]) => {
    return jobs.filter(
      (job) =>
        statuses.includes(job.status) &&
        (!searchQuery || job.title.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };

  const renderJobActions = (job: MockJob) => (
    <>
      {job.status === 'bidding' && (
        <Badge className="bg-transparent border-transparent shadow-none px-0 text-sm font-semibold text-reno-green-dark hover:bg-transparent">
          {job.bidCount} bids received
        </Badge>
      )}
      {job.status === 'draft' && (
        <Button size="sm" className="rounded-lg bg-reno-green-dark px-3 py-1.5 text-xs font-semibold text-white transition-all duration-200 hover:bg-reno-green-dark h-auto">
          Publish
        </Button>
      )}
      {job.status === 'completed' && (
        <Button variant="outline" size="sm" className="rounded-lg border-gray-200 px-3 py-1.5 text-xs font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 h-auto">
          Leave Review
        </Button>
      )}
    </>
  );

  const renderJobsList = (statuses: JobStatus[]) => {
    const filteredJobs = getFilteredJobs(statuses);

    if (filteredJobs.length === 0) {
      return (
        <div className="py-16 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100">
            <Briefcase className="h-7 w-7 text-gray-300" />
          </div>
          <p className="font-medium text-gray-900">No jobs found</p>
          <Button asChild variant="link" className="mt-2 text-sm font-semibold text-reno-green-dark hover:text-reno-green-dark h-auto">
            <Link href="/post-job">
              Post your first job
            </Link>
          </Button>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {filteredJobs.map((job) => (
          <JobCard
            key={job.id}
            id={job.id}
            title={job.title}
            category={job.category}
            status={job.status}
            city={job.city}
            createdAt={job.createdAt}
            budgetMin={job.budgetMin}
            budgetMax={job.budgetMax}
            isUrgent={job.isUrgent}
            href={`/dashboard/jobs/${job.id}`}
            actions={renderJobActions(job)}
          />
        ))}
      </div>
    );
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">My Jobs</h1>
        <Button asChild className="inline-flex items-center gap-2 rounded-xl bg-reno-green-dark px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-reno-green-dark hover:shadow-md hover:shadow-reno-green-light h-auto">
          <Link href="/post-job">
            <Plus className="h-4 w-4" />
            Post New Job
          </Link>
        </Button>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="mb-4 flex w-full gap-1 rounded-xl bg-gray-100 p-1 h-auto">
          {tabConfig.map((tab) => {
            const count = jobs.filter((j) =>
              tab.statuses.includes(j.status)
            ).length;
            return (
              <TabsTrigger
                key={tab.key}
                value={tab.key}
                className="flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm data-[state=inactive]:text-gray-500 data-[state=inactive]:hover:text-gray-700"
              >
                {tab.label}
                <span className="ml-1.5 text-xs text-gray-400">
                  ({count})
                </span>
              </TabsTrigger>
            );
          })}
        </TabsList>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search jobs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-xl border-gray-200 py-2.5 pl-10 pr-4 text-sm transition-all duration-200 focus:border-reno-green focus:ring-2 focus:ring-reno-green-light h-auto"
          />
        </div>

        {/* Tab Content */}
        {tabConfig.map((tab) => (
          <TabsContent key={tab.key} value={tab.key} className="mt-0">
            {renderJobsList(tab.statuses)}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
