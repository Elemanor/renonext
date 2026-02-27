'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  DollarSign,
  Clock,
  Zap,
  Send,
  Eye,
  Filter,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface DisplayJob {
  id: string;
  title: string;
  category: string;
  city: string;
  distance: string;
  budgetMin: number | null;
  budgetMax: number | null;
  postedAgo: string;
  isUrgent: boolean;
}

const heatmapZones = [
  { area: 'Downtown Toronto', jobs: 12, intensity: 'high' },
  { area: 'North York', jobs: 8, intensity: 'high' },
  { area: 'Scarborough', jobs: 5, intensity: 'medium' },
  { area: 'Etobicoke', jobs: 3, intensity: 'low' },
  { area: 'Mississauga', jobs: 6, intensity: 'medium' },
];

const mockNearbyJobs: DisplayJob[] = [
  {
    id: 'nj-1',
    title: 'Fix leaking kitchen faucet',
    category: 'Plumbing',
    city: 'Toronto',
    distance: '2.1 km',
    budgetMin: 100,
    budgetMax: 300,
    postedAgo: '15 min ago',
    isUrgent: false,
  },
  {
    id: 'nj-2',
    title: 'Emergency pipe burst repair',
    category: 'Plumbing',
    city: 'Toronto',
    distance: '3.5 km',
    budgetMin: null,
    budgetMax: null,
    postedAgo: '30 min ago',
    isUrgent: true,
  },
  {
    id: 'nj-3',
    title: 'Install new light fixtures',
    category: 'Electrical',
    city: 'Toronto',
    distance: '4.8 km',
    budgetMin: 200,
    budgetMax: 500,
    postedAgo: '1 hr ago',
    isUrgent: false,
  },
  {
    id: 'nj-4',
    title: 'Paint master bedroom',
    category: 'Painting',
    city: 'Mississauga',
    distance: '7.2 km',
    budgetMin: 400,
    budgetMax: 800,
    postedAgo: '2 hrs ago',
    isUrgent: false,
  },
  {
    id: 'nj-5',
    title: 'Bathroom exhaust fan replacement',
    category: 'Electrical',
    city: 'Toronto',
    distance: '5.6 km',
    budgetMin: 150,
    budgetMax: 350,
    postedAgo: '3 hrs ago',
    isUrgent: false,
  },
];

const intensityColors = {
  high: 'bg-red-100 text-red-700 border-red-200',
  medium: 'bg-amber-100 text-amber-700 border-amber-200',
  low: 'bg-green-100 text-green-700 border-green-200',
};

function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins} min ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hr${hrs > 1 ? 's' : ''} ago`;
  const days = Math.floor(hrs / 24);
  return `${days} day${days > 1 ? 's' : ''} ago`;
}

export default function FindJobsPage() {
  const [jobs, setJobs] = useState<DisplayJob[]>(mockNearbyJobs);
  const [bidding, setBidding] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/jobs/available')
      .then((res) => res.json())
      .then((json) => {
        if (json.data && json.data.length > 0) {
          const mapped: DisplayJob[] = json.data.map(
            (j: Record<string, unknown>) => ({
              id: j.id as string,
              title: j.title as string,
              category:
                (j.category as Record<string, unknown>)?.name ?? 'General',
              city: (j.city as string) || 'Toronto',
              distance: '--',
              budgetMin: j.budget_min as number | null,
              budgetMax: j.budget_max as number | null,
              postedAgo: timeAgo(j.created_at as string),
              isUrgent: j.is_urgent as boolean,
            })
          );
          setJobs(mapped);
        }
      })
      .catch(() => {
        // Keep mock data on failure
      });
  }, []);

  const handleBid = async (jobId: string) => {
    setBidding(jobId);
    try {
      const res = await fetch('/api/bids', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          job_id: jobId,
          amount: 500,
          estimated_hours: 4,
          message: 'I can help with this job!',
        }),
      });

      if (res.status === 401) {
        alert('Sign in to bid on jobs');
        return;
      }

      if (!res.ok) {
        const json = await res.json();
        alert(json.error || 'Failed to submit bid');
        return;
      }

      alert('Bid submitted successfully!');
    } catch {
      alert('Sign in to bid on jobs');
    } finally {
      setBidding(null);
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Find Jobs
        </h1>
        <Button
          variant="outline"
          className="rounded-xl border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 h-auto"
        >
          <Filter className="mr-1.5 h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Map Placeholder / Heatmap */}
      <Card className="mb-6 overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
        <div className="relative h-48 bg-gradient-to-br from-blue-50 via-blue-100 to-sky-50">
          {/* Mock map with heatmap zones */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="grid grid-cols-3 gap-3 p-4">
              {heatmapZones.map((zone) => (
                <div
                  key={zone.area}
                  className={`rounded-xl border px-3 py-2 text-center ${intensityColors[zone.intensity as keyof typeof intensityColors]}`}
                >
                  <p className="text-xs font-bold">{zone.jobs} jobs</p>
                  <p className="text-[10px]">{zone.area}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="absolute bottom-3 left-3">
            <Badge className="rounded-full border-transparent bg-white/90 px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm backdrop-blur-sm">
              <MapPin className="mr-1 h-3 w-3 text-reno-green-dark" />
              Showing jobs within 15 km
            </Badge>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-gray-100 bg-gray-50 px-4 py-2.5">
          <span className="text-xs font-medium text-gray-500">
            {jobs.length} jobs available near you
          </span>
          <div className="flex items-center gap-3 text-[10px]">
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-red-400" />
              Hot
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-amber-400" />
              Medium
            </span>
            <span className="flex items-center gap-1">
              <span className="h-2 w-2 rounded-full bg-green-400" />
              Low
            </span>
          </div>
        </div>
      </Card>

      {/* Nearby Jobs List */}
      <div className="space-y-3">
        {jobs.map((job) => (
          <Card
            key={job.id}
            className="rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md"
          >
            <CardContent className="p-5">
              <div className="mb-2 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-gray-900">{job.title}</h3>
                    {job.isUrgent && (
                      <Badge
                        variant="destructive"
                        className="inline-flex items-center gap-0.5 rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-semibold text-red-700 hover:bg-red-50"
                      >
                        <Zap className="h-2.5 w-2.5" />
                        Urgent
                      </Badge>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">{job.category}</span>
                </div>
                <span className="text-xs text-gray-400">{job.postedAgo}</span>
              </div>

              <div className="mb-3 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                <span className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {job.city}
                  {job.distance !== '--' && (
                    <Badge className="ml-1 rounded-full border-transparent bg-blue-50 px-1.5 py-0 text-[10px] font-semibold text-blue-700">
                      {job.distance}
                    </Badge>
                  )}
                </span>
                {job.budgetMin && job.budgetMax && (
                  <span className="flex items-center gap-1 font-semibold text-gray-900">
                    <DollarSign className="h-4 w-4 text-gray-400" />$
                    {job.budgetMin} - ${job.budgetMax}
                  </span>
                )}
                {!job.budgetMin && !job.budgetMax && (
                  <span className="flex items-center gap-1">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    Open budget
                  </span>
                )}
              </div>

              <div className="flex gap-2 border-t border-gray-100 pt-3">
                <Button
                  onClick={() => handleBid(job.id)}
                  disabled={bidding === job.id}
                  className="rounded-xl bg-reno-green-dark px-4 py-2 text-sm font-semibold text-white transition-all duration-200 hover:bg-reno-green-dark hover:shadow-md hover:shadow-reno-green-light disabled:opacity-50 h-auto"
                >
                  <Send className="mr-1 h-4 w-4" />
                  {bidding === job.id ? 'Sending...' : 'Accept Job'}
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="rounded-xl border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 h-auto"
                >
                  <Link href={`/pro-dashboard/find-jobs/${job.id}`}>
                    <Eye className="mr-1 h-4 w-4" />
                    View Details
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
