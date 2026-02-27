'use client';

import { useState } from 'react';
import { MapPin, DollarSign, Send, Eye, Briefcase } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { WebBarChart } from '@/components/charts/bar-chart';
import { CHART_COLORS } from '@renonext/shared/utils/chart-theme';
import type { JobStatus } from '@renonext/shared/types';

interface ProJob {
  id: string;
  title: string;
  category: string;
  city: string;
  budgetMin: number | null;
  budgetMax: number | null;
  postedAgo: string;
  status: JobStatus;
  clientName?: string;
  distance?: string;
  description: string;
}

const availableJobs: ProJob[] = [
  {
    id: '1',
    title: 'Replace bathroom exhaust fan',
    category: 'Electrical',
    city: 'Toronto',
    budgetMin: 150,
    budgetMax: 300,
    postedAgo: '30 min ago',
    status: 'posted',
    distance: '3.2 km',
    description: 'Need to replace old bathroom exhaust fan with a new quiet model. Fan opening is standard size.',
  },
  {
    id: '2',
    title: 'Install smart thermostat',
    category: 'Electrical',
    city: 'Mississauga',
    budgetMin: 100,
    budgetMax: 200,
    postedAgo: '2 hours ago',
    status: 'posted',
    distance: '8.5 km',
    description: 'Looking for someone to install a Nest thermostat. Current system is a standard HVAC setup.',
  },
  {
    id: '3',
    title: 'Outdoor lighting installation',
    category: 'Electrical',
    city: 'Toronto',
    budgetMin: 500,
    budgetMax: 1000,
    postedAgo: '5 hours ago',
    status: 'bidding',
    distance: '5.1 km',
    description: 'Install 8 pathway lights and 2 spotlights in the front yard. All fixtures purchased.',
  },
];

const activeJobs: ProJob[] = [
  {
    id: '4',
    title: 'Kitchen faucet repair',
    category: 'Plumbing',
    city: 'Toronto',
    budgetMin: null,
    budgetMax: null,
    postedAgo: '',
    status: 'in_progress',
    clientName: 'John Smith',
    description: 'Repair leaking kitchen faucet.',
  },
  {
    id: '5',
    title: 'Electrical panel upgrade',
    category: 'Electrical',
    city: 'Toronto',
    budgetMin: null,
    budgetMax: null,
    postedAgo: '',
    status: 'accepted',
    clientName: 'Maria Garcia',
    description: 'Upgrade 100A to 200A panel.',
  },
];

const completedJobs: ProJob[] = [
  {
    id: '6',
    title: 'Bathroom rewiring',
    category: 'Electrical',
    city: 'Oakville',
    budgetMin: null,
    budgetMax: null,
    postedAgo: '',
    status: 'completed',
    clientName: 'Jennifer S.',
    description: 'Complete bathroom electrical rewire.',
  },
];

const pipelineData = [
  { stage: 'Available', count: 12 },
  { stage: 'Bidding', count: 3 },
  { stage: 'Active', count: 2 },
  { stage: 'Completed', count: 8 },
];

const weeklyCompletions = [
  { week: 'W1', completed: 1 },
  { week: 'W2', completed: 2 },
  { week: 'W3', completed: 1 },
  { week: 'W4', completed: 0 },
  { week: 'W5', completed: 3 },
  { week: 'W6', completed: 1 },
  { week: 'W7', completed: 2 },
  { week: 'W8', completed: 1 },
];

type Tab = 'available' | 'active' | 'completed';

export default function ProJobsPage() {
  const [activeTab, setActiveTab] = useState<Tab>('available');

  const tabContent: Record<Tab, ProJob[]> = {
    available: availableJobs,
    active: activeJobs,
    completed: completedJobs,
  };

  const jobs = tabContent[activeTab];

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight text-gray-900">Jobs</h1>

      {/* Pipeline + Completions Charts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <WebBarChart
          title="Job Pipeline"
          data={pipelineData}
          xKey="stage"
          yKeys={['count']}
          height={160}
          layout="horizontal"
          colors={[CHART_COLORS.primary]}
          formatter={(v) => `${v} jobs`}
          ariaLabel="Job pipeline funnel"
        />
        <WebBarChart
          title="Weekly Completions"
          data={weeklyCompletions}
          xKey="week"
          yKeys={['completed']}
          height={160}
          colors={[CHART_COLORS.success]}
          formatter={(v) => `${v} completed`}
          ariaLabel="Weekly job completions"
        />
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as Tab)} className="mb-4">
        <TabsList className="flex w-full gap-1 rounded-xl bg-gray-100 p-1">
          {[
            { key: 'available' as Tab, label: 'Available Nearby', count: availableJobs.length },
            { key: 'active' as Tab, label: 'Active', count: activeJobs.length },
            { key: 'completed' as Tab, label: 'Completed', count: completedJobs.length },
          ].map((tab) => (
            <TabsTrigger
              key={tab.key}
              value={tab.key}
              className="flex-1 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-200 data-[state=active]:bg-white data-[state=active]:text-gray-900 data-[state=active]:shadow-sm data-[state=inactive]:text-gray-500 data-[state=inactive]:hover:text-gray-700"
            >
              {tab.label}
              <span className="ml-1.5 text-xs text-gray-400">
                ({tab.count})
              </span>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Job List */}
      <div className="space-y-3">
        {jobs.map((job) => (
          <Card
            key={job.id}
            className="rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <CardContent className="p-5">
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{job.title}</h3>
                  <span className="text-xs text-gray-500">{job.category}</span>
                </div>
                {activeTab === 'available' && (
                  <span className="text-xs text-gray-400">{job.postedAgo}</span>
                )}
                {activeTab === 'active' && (
                  <Badge
                    className={`rounded-full px-2.5 py-0.5 text-xs font-medium border-transparent ${
                      job.status === 'in_progress'
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-cyan-100 text-cyan-700'
                    }`}
                  >
                    {job.status === 'in_progress' ? 'In Progress' : 'Accepted'}
                  </Badge>
                )}
              </div>

              <p className="mb-3 text-sm leading-relaxed text-gray-600">{job.description}</p>

              <div className="mb-3 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {job.city}
                  {job.distance && ` (${job.distance})`}
                </span>
                {job.budgetMin && job.budgetMax && (
                  <span className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4" />
                    ${job.budgetMin} - ${job.budgetMax}
                  </span>
                )}
                {job.clientName && (
                  <span className="text-gray-600">
                    Client: {job.clientName}
                  </span>
                )}
              </div>

              <div className="flex gap-2 border-t border-gray-100 pt-3">
                {activeTab === 'available' && (
                  <>
                    <Button className="rounded-xl bg-reno-green-dark px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-reno-green-dark hover:shadow-md hover:shadow-reno-green-light">
                      <Send className="h-4 w-4" />
                      Send Bid
                    </Button>
                    <Button variant="outline" className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50">
                      <Eye className="h-4 w-4" />
                      View Details
                    </Button>
                  </>
                )}
                {activeTab === 'active' && (
                  <>
                    <Button className="rounded-xl bg-reno-green-dark px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-reno-green-dark hover:shadow-md hover:shadow-reno-green-light">
                      Manage Job
                    </Button>
                    <Button variant="outline" className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50">
                      Message Client
                    </Button>
                  </>
                )}
                {activeTab === 'completed' && (
                  <Button variant="outline" className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50">
                    View Summary
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}

        {jobs.length === 0 && (
          <div className="py-16 text-center">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100">
              <Briefcase className="h-7 w-7 text-gray-300" />
            </div>
            <p className="font-medium text-gray-900">No jobs in this category</p>
          </div>
        )}
      </div>
    </div>
  );
}
