'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  LogIn,
  LogOut,
  Camera,
  Plus,
  CheckCircle,
  Clock,
  MapPin,
  Calendar,
  Zap,
  FileText,
  MessageSquare,
  Users,
  Image as ImageIcon,
  ClipboardCheck,
  FileEdit,
  DollarSign,
  Lock,
  CheckCircle2,
  AlertCircle,
  Send,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { JobTimelineStepper } from '@/components/job-timeline-stepper';
import { TaskPhotoCard } from '@/components/task-photo-card';
import { SignInLog } from '@/components/sign-in-log';
import { WeeklySchedule } from '@/components/weekly-schedule';
import { MaterialTracker } from '@/components/material-tracker';
import { getJobById } from '@/lib/mock-data/jobs';
import type { DetailedJob } from '@/lib/mock-data/jobs';
import { cn } from '@/lib/utils';

const PIPELINE_STEPS = [
  'Posted',
  'AI Price',
  'Pro Matched',
  'Materials',
  'In Progress',
  'Complete',
];

function getStepIndex(job: DetailedJob): number {
  if (job.isApproved) return 6;
  if (job.status === 'completed') return 5;
  if (job.status === 'in_progress') return 4;
  if (job.status === 'accepted') return 3;
  if (job.status === 'bidding') return 2;
  if (job.aiPriceMin) return 1;
  return 0;
}

// Mock data for new sections
const MOCK_MILESTONES = [
  {
    id: 'm1',
    name: 'Site Prep',
    percentage: 100,
    amount: 850,
    status: 'released' as const,
  },
  {
    id: 'm2',
    name: 'Rough-in',
    percentage: 100,
    amount: 2400,
    status: 'released' as const,
  },
  {
    id: 'm3',
    name: 'Pipe Replacement',
    percentage: 65,
    amount: 1800,
    status: 'pending' as const,
  },
  {
    id: 'm4',
    name: 'Testing',
    percentage: 0,
    amount: 600,
    status: 'locked' as const,
  },
  {
    id: 'm5',
    name: 'Final Inspection',
    percentage: 0,
    amount: 450,
    status: 'locked' as const,
  },
];

const MOCK_CREW = [
  {
    id: 'c1',
    name: 'Marcus Johnson',
    role: 'Lead Plumber',
    signInTime: '8:05 AM',
    hoursOnSite: 4.2,
  },
  {
    id: 'c2',
    name: 'Jake Williams',
    role: 'Apprentice',
    signInTime: '8:30 AM',
    hoursOnSite: 3.7,
  },
  {
    id: 'c3',
    name: 'Sofia Martinez',
    role: 'Helper',
    signInTime: '9:00 AM',
    hoursOnSite: 3.2,
  },
];

const MOCK_INSPECTIONS = [
  {
    id: 'i1',
    name: 'Plumbing Rough-in',
    scheduledDate: 'Feb 12',
    status: 'scheduled' as const,
  },
  {
    id: 'i2',
    name: 'Pressure Test',
    scheduledDate: null,
    status: 'required' as const,
  },
  {
    id: 'i3',
    name: 'Final Plumbing',
    scheduledDate: null,
    status: 'pending' as const,
  },
];

const MOCK_CHANGE_ORDERS = [
  {
    id: 'co1',
    name: 'Add shut-off valve to laundry',
    amount: 320,
    status: 'approved' as const,
  },
  {
    id: 'co2',
    name: 'Upgrade to PEX from copper',
    amount: 180,
    status: 'pending' as const,
  },
];

const MOCK_MESSAGES = [
  {
    id: 'msg1',
    sender: 'client',
    text: "How's the pipe repair going?",
    timestamp: 'Feb 4, 9:15 AM',
  },
  {
    id: 'msg2',
    sender: 'pro',
    text: 'Good progress! Extracted all water, replacing burst section now.',
    timestamp: 'Feb 4, 10:30 AM',
  },
  {
    id: 'msg3',
    sender: 'client',
    text: 'Great, any timeline changes?',
    timestamp: 'Feb 4, 2:00 PM',
  },
  {
    id: 'msg4',
    sender: 'pro',
    text: 'On track for Wednesday completion.',
    timestamp: 'Feb 4, 2:15 PM',
  },
];

type TabType =
  | 'overview'
  | 'schedule'
  | 'crew'
  | 'photos'
  | 'inspections'
  | 'change-orders'
  | 'comms';

interface ProJobDetailContentProps {
  jobId: string;
}

export function ProJobDetailContent({ jobId }: ProJobDetailContentProps) {
  const job = getJobById(jobId);
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [signedIn, setSignedIn] = useState(
    job?.signInLog.some((l) => !l.signOut) ?? false
  );
  const [dailyNotes, setDailyNotes] = useState('');
  const [newMessage, setNewMessage] = useState('');

  if (!job) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg font-medium text-gray-900">Job not found</p>
        <Button asChild variant="link" className="mt-2 text-reno-green">
          <Link href="/pro-dashboard/jobs">Back to Jobs</Link>
        </Button>
      </div>
    );
  }

  const stepIndex = getStepIndex(job);
  const timelineSteps = PIPELINE_STEPS.map((label, i) => {
    const event = job.timeline[i];
    return { label, timestamp: event?.timestamp };
  });

  // Calculate milestone totals
  const totalAmount = MOCK_MILESTONES.reduce((sum, m) => sum + m.amount, 0);
  const releasedAmount = MOCK_MILESTONES.filter(
    (m) => m.status === 'released'
  ).reduce((sum, m) => sum + m.amount, 0);
  const pendingAmount = MOCK_MILESTONES.filter(
    (m) => m.status === 'pending'
  ).reduce((sum, m) => sum + m.amount, 0);
  const remainingAmount = totalAmount - releasedAmount - pendingAmount;

  // Calculate crew hours
  const totalCrewHours = MOCK_CREW.reduce(
    (sum, c) => sum + c.hoursOnSite,
    0
  );

  // Calculate change order total
  const totalCOValue = MOCK_CHANGE_ORDERS.reduce(
    (sum, co) => sum + co.amount,
    0
  );
  const coPercentage =
    job.totalCost && job.totalCost > 0
      ? ((totalCOValue / job.totalCost) * 100).toFixed(1)
      : '0.0';

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <FileText className="h-4 w-4" /> },
    { id: 'schedule', label: 'Schedule', icon: <Calendar className="h-4 w-4" /> },
    { id: 'crew', label: 'Crew', icon: <Users className="h-4 w-4" /> },
    { id: 'photos', label: 'Photos', icon: <ImageIcon className="h-4 w-4" /> },
    { id: 'inspections', label: 'Inspections', icon: <ClipboardCheck className="h-4 w-4" /> },
    { id: 'change-orders', label: 'Change Orders', icon: <FileEdit className="h-4 w-4" /> },
    { id: 'comms', label: 'Comms', icon: <MessageSquare className="h-4 w-4" /> },
  ];

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/pro-dashboard/jobs"
          className="mb-3 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Jobs
        </Link>
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                {job.title}
              </h1>
              {job.isUrgent && (
                <Badge
                  variant="destructive"
                  className="inline-flex items-center gap-1 rounded-full bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-700 hover:bg-red-50"
                >
                  <Zap className="h-3 w-3" />
                  Urgent
                </Badge>
              )}
              <Badge
                className={cn(
                  'rounded-full border-transparent px-2.5 py-0.5 text-xs font-medium',
                  job.status === 'completed'
                    ? 'bg-green-50 text-green-700'
                    : job.status === 'in_progress'
                    ? 'bg-blue-50 text-blue-700'
                    : job.status === 'accepted'
                    ? 'bg-amber-50 text-amber-700'
                    : 'bg-gray-100 text-gray-600'
                )}
              >
                {job.status === 'completed'
                  ? 'Completed'
                  : job.status === 'in_progress'
                  ? 'In Progress'
                  : job.status === 'accepted'
                  ? 'Accepted'
                  : 'Bidding'}
              </Badge>
            </div>
            <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {job.address}, {job.city}
              </span>
              <span>Client: {job.clientName}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline */}
      <Card className="mb-6 rounded-2xl border border-gray-200 p-5 shadow-sm">
        <JobTimelineStepper steps={timelineSteps} currentStep={stepIndex} />
      </Card>

      {/* Sign In/Out Buttons */}
      {(job.status === 'in_progress' || job.status === 'accepted') && (
        <div className="mb-6 flex gap-3">
          {!signedIn ? (
            <Button
              onClick={() => setSignedIn(true)}
              className="h-auto flex-1 rounded-2xl bg-green-600 py-6 text-lg font-bold text-white hover:bg-green-700"
            >
              <LogIn className="mr-2 h-6 w-6" />
              Sign In to Job Site
            </Button>
          ) : (
            <Button
              onClick={() => setSignedIn(false)}
              variant="outline"
              className="h-auto flex-1 rounded-2xl border-2 border-red-200 py-6 text-lg font-bold text-red-700 hover:bg-red-50"
            >
              <LogOut className="mr-2 h-6 w-6" />
              Sign Out of Job Site
            </Button>
          )}
        </div>
      )}

      {/* Tab Navigation */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex gap-2 border-b border-gray-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-2 whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors',
                activeTab === tab.id
                  ? 'border-reno-green text-reno-green'
                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'
              )}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* Tab 1: Overview */}
        {activeTab === 'overview' && (
          <>
            {/* Milestone Tracker */}
            <Card className="rounded-2xl border border-gray-200 p-5 shadow-sm">
              <h3 className="mb-4 font-bold text-gray-900">
                Milestone Tracker & Payout Status
              </h3>

              {/* Summary Cards */}
              <div className="mb-5 grid grid-cols-2 gap-3 md:grid-cols-4">
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                  <p className="text-xs font-medium text-gray-500">Total</p>
                  <p className="mt-1 text-lg font-bold text-gray-900">
                    ${totalAmount.toLocaleString()}
                  </p>
                </div>
                <div className="rounded-xl border border-green-200 bg-green-50 p-3">
                  <p className="text-xs font-medium text-green-700">Released</p>
                  <p className="mt-1 text-lg font-bold text-green-700">
                    ${releasedAmount.toLocaleString()}
                  </p>
                </div>
                <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
                  <p className="text-xs font-medium text-amber-700">Pending</p>
                  <p className="mt-1 text-lg font-bold text-amber-700">
                    ${pendingAmount.toLocaleString()}
                  </p>
                </div>
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-3">
                  <p className="text-xs font-medium text-gray-500">Remaining</p>
                  <p className="mt-1 text-lg font-bold text-gray-900">
                    ${remainingAmount.toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Milestone List */}
              <div className="space-y-3">
                {MOCK_MILESTONES.map((milestone, index) => (
                  <div
                    key={milestone.id}
                    className="relative rounded-xl border border-gray-200 p-4"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-gray-900">
                            {index + 1}. {milestone.name}
                          </span>
                          {milestone.status === 'released' && (
                            <Badge className="rounded-full border-transparent bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700">
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              Released
                            </Badge>
                          )}
                          {milestone.status === 'pending' && (
                            <Badge className="rounded-full border-transparent bg-amber-50 px-2 py-0.5 text-xs font-medium text-amber-700">
                              <Clock className="mr-1 h-3 w-3" />
                              Pending
                            </Badge>
                          )}
                          {milestone.status === 'locked' && (
                            <Badge className="rounded-full border-transparent bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">
                              <Lock className="mr-1 h-3 w-3" />
                              Locked
                            </Badge>
                          )}
                        </div>
                        <div className="mt-2">
                          <div className="flex items-center justify-between text-xs text-gray-500">
                            <span>{milestone.percentage}% complete</span>
                            <span className="font-semibold text-gray-900">
                              ${milestone.amount.toLocaleString()}
                            </span>
                          </div>
                          <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-gray-100">
                            <div
                              className={cn(
                                'h-full transition-all',
                                milestone.status === 'released'
                                  ? 'bg-green-500'
                                  : milestone.status === 'pending'
                                  ? 'bg-amber-500'
                                  : 'bg-gray-300'
                              )}
                              style={{ width: `${milestone.percentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Tasks */}
            <Card className="rounded-2xl border border-gray-200 p-5 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="font-bold text-gray-900">Tasks</h3>
                <Button
                  variant="outline"
                  className="h-auto rounded-lg border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700"
                >
                  <Plus className="mr-1 h-3 w-3" />
                  Add Task
                </Button>
              </div>
              <div className="space-y-2">
                {job.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between rounded-xl border border-gray-200 p-3"
                  >
                    <div className="flex items-center gap-3">
                      <Badge
                        className={cn(
                          'rounded-full border-transparent px-2.5 py-0.5 text-xs font-medium',
                          task.status === 'completed'
                            ? 'bg-green-50 text-green-700'
                            : task.status === 'in_progress'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-gray-100 text-gray-600'
                        )}
                      >
                        {task.status === 'completed'
                          ? 'Done'
                          : task.status === 'in_progress'
                          ? 'Active'
                          : 'Pending'}
                      </Badge>
                      <span className="text-sm font-medium text-gray-900">
                        {task.name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        className="h-auto rounded-lg border-gray-200 px-2 py-1 text-xs"
                      >
                        <Camera className="h-3 w-3" />
                      </Button>
                      {task.status !== 'completed' && (
                        <Button className="h-auto rounded-lg bg-green-600 px-3 py-1 text-xs font-semibold text-white hover:bg-green-700">
                          <CheckCircle className="mr-1 h-3 w-3" />
                          Complete
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Materials */}
            {job.materials.length > 0 && (
              <MaterialTracker materials={job.materials} />
            )}
          </>
        )}

        {/* Tab 2: Schedule */}
        {activeTab === 'schedule' && (
          <>
            {/* Today's Plan */}
            <Card className="rounded-2xl border border-gray-200 p-5 shadow-sm">
              <h3 className="mb-3 font-bold text-gray-900">Today's Plan</h3>
              <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
                <div className="flex items-start gap-3">
                  <Calendar className="mt-0.5 h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-semibold text-blue-900">
                      {new Date().toLocaleDateString('en-US', {
                        weekday: 'long',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </p>
                    <p className="mt-1 text-sm text-blue-700">
                      Scheduled: 8:00 AM - 4:00 PM
                    </p>
                    <p className="mt-2 text-sm font-medium text-blue-900">
                      Focus: Pipe replacement and pressure testing
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Weekly Schedule */}
            <WeeklySchedule schedule={job.schedule} />
          </>
        )}

        {/* Tab 3: Crew on Site */}
        {activeTab === 'crew' && (
          <Card className="rounded-2xl border border-gray-200 p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold text-gray-900">Crew on Site</h3>
              <div className="rounded-lg bg-green-50 px-3 py-1.5">
                <p className="text-xs font-semibold text-green-700">
                  {totalCrewHours.toFixed(1)} total crew-hours today
                </p>
              </div>
            </div>
            <div className="space-y-3">
              {MOCK_CREW.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center justify-between rounded-xl border border-gray-200 p-4"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-reno-green text-lg font-bold text-white">
                      {member.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">
                        {member.name}
                      </p>
                      <p className="text-sm text-gray-500">{member.role}</p>
                      <div className="mt-1 flex items-center gap-3 text-xs text-gray-500">
                        <span className="flex items-center gap-1">
                          <LogIn className="h-3 w-3" />
                          Signed in {member.signInTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {member.hoursOnSite} hrs on site
                        </span>
                      </div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    className="h-auto rounded-lg border-red-200 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="mr-1 h-3 w-3" />
                    Sign Out
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Tab 4: Photos */}
        {activeTab === 'photos' && (
          <>
            {/* Photo Upload */}
            <Card className="rounded-2xl border border-gray-200 p-5 shadow-sm">
              <h3 className="mb-3 font-bold text-gray-900">Upload Photos</h3>
              <Card className="flex h-32 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 shadow-none transition-all hover:border-reno-green hover:bg-green-50/30">
                <div className="text-center">
                  <Camera className="mx-auto h-7 w-7 text-gray-300" />
                  <p className="mt-1.5 text-sm font-medium text-gray-600">
                    Upload before/during/after photos
                  </p>
                  <p className="mt-0.5 text-xs text-gray-400">
                    Click or drag to upload
                  </p>
                </div>
              </Card>
            </Card>

            {/* Photo Gallery */}
            {job.tasks.some((t) => t.photos.length > 0) && (
              <>
                <Card className="rounded-2xl border border-gray-200 p-5 shadow-sm">
                  <h3 className="mb-3 font-bold text-gray-900">
                    Before Photos
                  </h3>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                    {job.tasks
                      .flatMap((t) => t.photos)
                      .filter((p) => p.caption.toLowerCase().includes('before'))
                      .map((photo, i) => (
                        <div
                          key={i}
                          className="overflow-hidden rounded-xl border border-gray-200"
                        >
                          <img
                            src={photo.url}
                            alt={photo.caption}
                            className="aspect-square w-full object-cover"
                          />
                          <div className="bg-gray-50 p-2">
                            <p className="text-xs text-gray-600">
                              {photo.caption}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </Card>

                <Card className="rounded-2xl border border-gray-200 p-5 shadow-sm">
                  <h3 className="mb-3 font-bold text-gray-900">
                    During Work Photos
                  </h3>
                  <div className="space-y-3">
                    {job.tasks.map((task) => (
                      <TaskPhotoCard key={task.id} task={task} />
                    ))}
                  </div>
                </Card>

                <Card className="rounded-2xl border border-gray-200 p-5 shadow-sm">
                  <h3 className="mb-3 font-bold text-gray-900">
                    After Photos
                  </h3>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                    {job.tasks
                      .flatMap((t) => t.photos)
                      .filter((p) => p.caption.toLowerCase().includes('after'))
                      .map((photo, i) => (
                        <div
                          key={i}
                          className="overflow-hidden rounded-xl border border-gray-200"
                        >
                          <img
                            src={photo.url}
                            alt={photo.caption}
                            className="aspect-square w-full object-cover"
                          />
                          <div className="bg-gray-50 p-2">
                            <p className="text-xs text-gray-600">
                              {photo.caption}
                            </p>
                          </div>
                        </div>
                      ))}
                  </div>
                </Card>
              </>
            )}
          </>
        )}

        {/* Tab 5: Inspections */}
        {activeTab === 'inspections' && (
          <Card className="rounded-2xl border border-gray-200 p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold text-gray-900">Required Inspections</h3>
              <Button className="h-auto rounded-lg bg-reno-green px-3 py-2 text-xs font-semibold text-white hover:bg-reno-green-dark">
                <Plus className="mr-1 h-3 w-3" />
                Request Inspection
              </Button>
            </div>
            <div className="space-y-3">
              {MOCK_INSPECTIONS.map((inspection) => (
                <div
                  key={inspection.id}
                  className="flex items-center justify-between rounded-xl border border-gray-200 p-4"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900">
                        {inspection.name}
                      </p>
                      <Badge
                        className={cn(
                          'rounded-full border-transparent px-2.5 py-0.5 text-xs font-medium',
                          inspection.status === 'scheduled'
                            ? 'bg-blue-50 text-blue-700'
                            : inspection.status === 'required'
                            ? 'bg-amber-50 text-amber-700'
                            : 'bg-gray-100 text-gray-600'
                        )}
                      >
                        {inspection.status === 'scheduled'
                          ? 'Scheduled'
                          : inspection.status === 'required'
                          ? 'Required'
                          : 'Pending'}
                      </Badge>
                    </div>
                    {inspection.scheduledDate ? (
                      <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
                        <Calendar className="h-3.5 w-3.5" />
                        Scheduled for {inspection.scheduledDate}
                      </p>
                    ) : (
                      <p className="mt-1 text-sm text-gray-500">
                        Not scheduled yet
                      </p>
                    )}
                  </div>
                  {!inspection.scheduledDate && (
                    <Button
                      variant="outline"
                      className="h-auto rounded-lg border-gray-200 px-3 py-2 text-xs font-semibold text-gray-700"
                    >
                      Schedule
                    </Button>
                  )}
                </div>
              ))}
            </div>

            {/* Inspector Notes Section */}
            <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4">
              <h4 className="mb-2 flex items-center gap-2 text-sm font-semibold text-gray-700">
                <FileText className="h-4 w-4" />
                Inspector Notes
              </h4>
              <p className="text-sm text-gray-500">
                No inspection notes yet. Notes will appear here after
                inspections are completed.
              </p>
            </div>
          </Card>
        )}

        {/* Tab 6: Change Orders */}
        {activeTab === 'change-orders' && (
          <Card className="rounded-2xl border border-gray-200 p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-bold text-gray-900">Change Orders</h3>
              <Button className="h-auto rounded-lg bg-reno-green px-3 py-2 text-xs font-semibold text-white hover:bg-reno-green-dark">
                <Plus className="mr-1 h-3 w-3" />
                Create Change Order
              </Button>
            </div>

            {/* Summary */}
            <div className="mb-5 rounded-xl border border-blue-200 bg-blue-50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-900">
                    Total Change Orders
                  </p>
                  <p className="mt-1 text-2xl font-bold text-blue-900">
                    ${totalCOValue.toLocaleString()}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-blue-700">
                    +{coPercentage}% of contract
                  </p>
                  <p className="mt-1 text-xs text-blue-600">
                    {MOCK_CHANGE_ORDERS.length} change order
                    {MOCK_CHANGE_ORDERS.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
            </div>

            {/* Change Order List */}
            <div className="space-y-3">
              {MOCK_CHANGE_ORDERS.map((co) => (
                <div
                  key={co.id}
                  className="rounded-xl border border-gray-200 p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-gray-900">
                          {co.id.toUpperCase()}: "{co.name}"
                        </p>
                        <Badge
                          className={cn(
                            'rounded-full border-transparent px-2.5 py-0.5 text-xs font-medium',
                            co.status === 'approved'
                              ? 'bg-green-50 text-green-700'
                              : 'bg-amber-50 text-amber-700'
                          )}
                        >
                          {co.status === 'approved' ? (
                            <>
                              <CheckCircle2 className="mr-1 h-3 w-3" />
                              Approved
                            </>
                          ) : (
                            <>
                              <AlertCircle className="mr-1 h-3 w-3" />
                              Pending Review
                            </>
                          )}
                        </Badge>
                      </div>
                      <p className="mt-2 flex items-center gap-1 text-lg font-bold text-gray-900">
                        <DollarSign className="h-4 w-4" />
                        {co.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Tab 7: Client Comms */}
        {activeTab === 'comms' && (
          <Card className="rounded-2xl border border-gray-200 p-5 shadow-sm">
            <h3 className="mb-4 font-bold text-gray-900">
              Client Communication
            </h3>

            {/* Message Thread */}
            <div className="mb-4 space-y-3 rounded-xl border border-gray-200 bg-gray-50 p-4">
              {MOCK_MESSAGES.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'rounded-lg p-3',
                    message.sender === 'client'
                      ? 'bg-white'
                      : 'bg-reno-green text-white'
                  )}
                >
                  <p
                    className={cn(
                      'text-sm',
                      message.sender === 'client'
                        ? 'text-gray-900'
                        : 'text-white'
                    )}
                  >
                    {message.text}
                  </p>
                  <p
                    className={cn(
                      'mt-1 text-xs',
                      message.sender === 'client'
                        ? 'text-gray-500'
                        : 'text-green-100'
                    )}
                  >
                    {message.sender === 'client' ? 'Client' : 'You'} •{' '}
                    {message.timestamp}
                  </p>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="space-y-3">
              <Textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message to the client..."
                rows={3}
                className="rounded-xl border-gray-200 text-sm"
              />
              <Button className="w-full rounded-lg bg-reno-green py-3 text-sm font-semibold text-white hover:bg-reno-green-dark">
                <Send className="mr-2 h-4 w-4" />
                Send Message
              </Button>
            </div>
          </Card>
        )}

        {/* Daily Notes (visible on Overview tab only) */}
        {activeTab === 'overview' && (
          <>
            <Card className="rounded-2xl border border-gray-200 p-5 shadow-sm">
              <h3 className="mb-3 font-bold text-gray-900">Daily Notes</h3>
              <Textarea
                value={dailyNotes}
                onChange={(e) => setDailyNotes(e.target.value)}
                placeholder="Add progress notes for today..."
                rows={3}
                className="rounded-xl border-gray-200 text-sm"
              />
              <Button className="mt-3 h-auto rounded-lg bg-reno-green px-4 py-2 text-xs font-semibold text-white hover:bg-reno-green-dark">
                <MessageSquare className="mr-1 h-3 w-3" />
                Save Note
              </Button>
            </Card>

            {/* Sign-In Log */}
            {job.signInLog.length > 0 && (
              <div>
                <h3 className="mb-3 font-bold text-gray-900">
                  Your Sign-In/Out Log
                </h3>
                <SignInLog logs={job.signInLog} />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
