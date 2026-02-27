'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Star,
  Shield,
  Clock,
  CheckCircle,
  MapPin,
  Calendar,
  DollarSign,
  Download,
  Zap,
  User,
  FileText,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { JobTimelineStepper } from '@/components/job-timeline-stepper';
import { CertificationBadges } from '@/components/certification-badges';
import { SignInLog } from '@/components/sign-in-log';
import { TaskPhotoCard } from '@/components/task-photo-card';
import { AIPriceCard } from '@/components/ai-price-card';
import { WeeklySchedule } from '@/components/weekly-schedule';
import { MaterialTracker } from '@/components/material-tracker';
import { getJobById } from '@/lib/mock-data/jobs';
import type { DetailedJob } from '@/lib/mock-data/jobs';

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

interface JobDetailContentProps {
  jobId: string;
}

export function JobDetailContent({ jobId }: JobDetailContentProps) {
  const job = getJobById(jobId);
  const [showReview, setShowReview] = useState(false);

  if (!job) {
    return (
      <div className="py-20 text-center">
        <p className="text-lg font-medium text-gray-900">Job not found</p>
        <Button asChild variant="link" className="mt-2 text-reno-green">
          <Link href="/dashboard/jobs">Back to Jobs</Link>
        </Button>
      </div>
    );
  }

  const stepIndex = getStepIndex(job);
  const timelineSteps = PIPELINE_STEPS.map((label, i) => {
    const event = job.timeline[i];
    return { label, timestamp: event?.timestamp };
  });

  return (
    <div>
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/dashboard/jobs"
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
            </div>
            <div className="mt-1 flex items-center gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {job.city}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(job.createdAt).toLocaleDateString('en-CA', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
              <span className="capitalize">{job.category}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Timeline Stepper */}
      <Card className="mb-6 rounded-2xl border border-gray-200 p-5 shadow-sm">
        <JobTimelineStepper steps={timelineSteps} currentStep={stepIndex} />
      </Card>

      {/* ===== BIDDING STATUS ===== */}
      {job.status === 'bidding' && (
        <div className="space-y-6">
          {/* AI Price Recap */}
          {job.aiPriceMin && job.aiPriceMax && job.aiConfidence && (
            <AIPriceCard
              min={job.aiPriceMin}
              max={job.aiPriceMax}
              confidence={job.aiConfidence}
              laborEstimate={job.aiLaborEstimate ?? 0}
              materialEstimate={job.aiMaterialEstimate ?? 0}
              platformFee={job.aiPlatformFee ?? 0}
            />
          )}

          {/* Matching Status */}
          <Card className="rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-100">
                <User className="h-5 w-5 text-purple-600" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">
                  Matching you with pros...
                </h3>
                <p className="text-sm text-gray-500">
                  {job.bids.length} bid{job.bids.length !== 1 ? 's' : ''}{' '}
                  received so far
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {job.bids.map((bid) => (
                <Card
                  key={bid.id}
                  className="rounded-xl border border-gray-200 p-4 shadow-none transition-all hover:shadow-sm"
                >
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12 ring-2 ring-gray-100">
                      <AvatarImage src={bid.proAvatar} alt={bid.proName} />
                      <AvatarFallback>{bid.proName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-gray-900">
                            {bid.proName}
                          </p>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <div className="flex items-center gap-0.5">
                              <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                              <span className="font-semibold text-gray-900">
                                {bid.proRating}
                              </span>
                            </div>
                            <span>({bid.proReviewCount} reviews)</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-gray-900">
                            ${bid.amount}
                          </p>
                          <p className="text-xs text-gray-500">
                            ~{bid.estimatedHours}h
                          </p>
                        </div>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {bid.proCertifications.map((cert) => (
                          <Badge
                            key={cert}
                            className="rounded-full border-transparent bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700"
                          >
                            <Shield className="mr-0.5 h-2.5 w-2.5" />
                            {cert}
                          </Badge>
                        ))}
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-gray-600">
                        {bid.message}
                      </p>
                      <div className="mt-3 flex gap-2">
                        <Button className="rounded-lg bg-reno-green px-4 py-1.5 text-xs font-semibold text-white hover:bg-reno-green-dark h-auto">
                          Accept Bid
                        </Button>
                        <Button
                          variant="outline"
                          className="rounded-lg border-gray-200 px-4 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 h-auto"
                        >
                          Decline
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* ===== ACCEPTED STATUS ===== */}
      {job.status === 'accepted' && job.assignedPro && (
        <div className="space-y-6">
          {/* Banner */}
          <Card className="flex items-center gap-3 rounded-2xl border-emerald-200 bg-emerald-50 p-4 shadow-none">
            <CheckCircle className="h-5 w-5 shrink-0 text-emerald-600" />
            <p className="text-sm font-medium text-emerald-800">
              Your pro is scheduled to start on{' '}
              {Object.entries(job.schedule).find(([, v]) => v)?.[0] ?? 'TBD'}
            </p>
          </Card>

          {/* Pro Profile */}
          <Card className="rounded-2xl border border-gray-200 p-6 shadow-sm">
            <div className="flex items-center gap-4 mb-5">
              <Avatar className="h-16 w-16 ring-2 ring-gray-100">
                <AvatarImage
                  src={job.assignedPro.avatar}
                  alt={job.assignedPro.name}
                />
                <AvatarFallback>{job.assignedPro.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-lg font-bold text-gray-900">
                  {job.assignedPro.name}
                </h3>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <div className="flex items-center gap-0.5">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-gray-900">
                      {job.assignedPro.rating}
                    </span>
                    <span>({job.assignedPro.reviewCount} reviews)</span>
                  </div>
                  <span>{job.assignedPro.yearsExperience} years exp.</span>
                </div>
              </div>
            </div>

            <CertificationBadges
              certifications={job.assignedPro.certifications}
              trainings={job.assignedPro.trainings}
            />
          </Card>

          {/* Schedule */}
          <WeeklySchedule schedule={job.schedule} />

          {/* Materials */}
          {job.materials.length > 0 && (
            <MaterialTracker materials={job.materials} />
          )}
        </div>
      )}

      {/* ===== IN PROGRESS STATUS ===== */}
      {job.status === 'in_progress' && job.assignedPro && (
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-2">
            {/* Today's Activity */}
            <Card className="rounded-2xl border border-gray-200 p-5 shadow-sm">
              <h3 className="mb-4 font-bold text-gray-900">
                Today&apos;s Activity
              </h3>
              <div className="space-y-3">
                {job.signInLog.length > 0 && (
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                      <Clock className="h-4 w-4 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        Pro signed in at{' '}
                        {job.signInLog[job.signInLog.length - 1].signIn}
                      </p>
                      <p className="text-xs text-gray-500">
                        {job.signInLog[job.signInLog.length - 1].signOut
                          ? `Signed out at ${job.signInLog[job.signInLog.length - 1].signOut}`
                          : 'Still on site'}
                      </p>
                    </div>
                  </div>
                )}
                {job.tasks
                  .filter((t) => t.status === 'in_progress')
                  .map((task) => (
                    <div key={task.id} className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-100">
                        <FileText className="h-4 w-4 text-amber-600" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900">
                          Current task: {task.name}
                        </p>
                        <Badge className="mt-0.5 rounded-full border-transparent bg-amber-50 px-2 py-0.5 text-[10px] font-medium text-amber-700">
                          In Progress
                        </Badge>
                      </div>
                    </div>
                  ))}
              </div>
            </Card>

            {/* Tasks */}
            <div>
              <h3 className="mb-3 font-bold text-gray-900">Tasks</h3>
              <div className="space-y-2">
                {job.tasks.map((task) => (
                  <TaskPhotoCard key={task.id} task={task} />
                ))}
              </div>
            </div>

            {/* Sign In/Out Log */}
            <div>
              <h3 className="mb-3 font-bold text-gray-900">
                Sign-In/Out Log
              </h3>
              <SignInLog logs={job.signInLog} />
            </div>

            {/* Schedule */}
            <WeeklySchedule schedule={job.schedule} />

            {/* Materials */}
            {job.materials.length > 0 && (
              <MaterialTracker materials={job.materials} />
            )}
          </div>

          {/* Sidebar — Pro Credentials */}
          <div className="space-y-6">
            <Card className="sticky top-8 rounded-2xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-12 w-12 ring-2 ring-gray-100">
                  <AvatarImage
                    src={job.assignedPro.avatar}
                    alt={job.assignedPro.name}
                  />
                  <AvatarFallback>{job.assignedPro.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-gray-900">
                    {job.assignedPro.name}
                  </p>
                  <div className="flex items-center gap-0.5 text-sm">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-semibold text-gray-900">
                      {job.assignedPro.rating}
                    </span>
                    <span className="text-gray-500">
                      ({job.assignedPro.reviewCount})
                    </span>
                  </div>
                </div>
              </div>

              <div className="mb-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Experience</span>
                  <span className="font-semibold text-gray-900">
                    {job.assignedPro.yearsExperience} years
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">License #</span>
                  <span className="font-mono text-xs font-semibold text-gray-900">
                    {job.assignedPro.licenseNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Insurance</span>
                  <span className="font-semibold text-green-700">
                    {job.assignedPro.insured ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>

              <CertificationBadges
                certifications={job.assignedPro.certifications}
                trainings={job.assignedPro.trainings}
              />
            </Card>
          </div>
        </div>
      )}

      {/* ===== COMPLETED STATUS ===== */}
      {job.status === 'completed' && (
        <div className="space-y-6">
          {/* Summary Card */}
          <Card className="rounded-2xl border border-gray-200 p-6 shadow-sm">
            <h3 className="mb-4 text-lg font-bold text-gray-900">
              Job Summary
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="rounded-xl bg-gray-50 p-4 text-center">
                <DollarSign className="mx-auto mb-1 h-5 w-5 text-gray-400" />
                <p className="text-2xl font-bold text-gray-900">
                  ${job.totalCost?.toLocaleString() ?? '—'}
                </p>
                <p className="text-xs text-gray-500">Total Cost</p>
              </div>
              <div className="rounded-xl bg-gray-50 p-4 text-center">
                <Clock className="mx-auto mb-1 h-5 w-5 text-gray-400" />
                <p className="text-2xl font-bold text-gray-900">
                  {job.totalHours ?? '—'}h
                </p>
                <p className="text-xs text-gray-500">Hours Worked</p>
              </div>
              <div className="rounded-xl bg-gray-50 p-4 text-center">
                <CheckCircle className="mx-auto mb-1 h-5 w-5 text-gray-400" />
                <p className="text-2xl font-bold text-gray-900">
                  {job.tasks.filter((t) => t.status === 'completed').length}/
                  {job.tasks.length}
                </p>
                <p className="text-xs text-gray-500">Tasks Done</p>
              </div>
            </div>
          </Card>

          {/* Before/After Photos */}
          {job.tasks.some((t) => t.photos.length > 0) && (
            <Card className="rounded-2xl border border-gray-200 p-6 shadow-sm">
              <h3 className="mb-4 font-bold text-gray-900">
                Before & After Photos
              </h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {job.tasks
                  .flatMap((t) => t.photos)
                  .map((photo, i) => (
                    <div
                      key={i}
                      className="group relative overflow-hidden rounded-xl"
                    >
                      <img
                        src={photo.url}
                        alt={photo.caption}
                        className="h-40 w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-2">
                        <p className="text-[10px] leading-tight text-white">
                          {photo.caption}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
            </Card>
          )}

          {/* Approve or Review */}
          {!job.isApproved ? (
            <Card className="rounded-2xl border-2 border-reno-green-light bg-reno-green-light p-6 shadow-sm">
              <h3 className="mb-2 text-lg font-bold text-gray-900">
                Approve & Release Payment
              </h3>
              <p className="mb-4 text-sm text-gray-600">
                Review the completed work and release the payment to your pro.
                Once approved, funds will be transferred within 24 hours.
              </p>
              <div className="flex gap-3">
                <Button className="rounded-xl bg-reno-green px-6 py-2.5 text-sm font-semibold text-white hover:bg-reno-green-dark h-auto">
                  Approve & Release Payment
                </Button>
                <Button
                  variant="outline"
                  className="rounded-xl border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 h-auto"
                >
                  <Download className="mr-1.5 h-4 w-4" />
                  Download Job Report
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="rounded-2xl border border-green-200 bg-green-50 p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="h-5 w-5 text-green-600" />
                <h3 className="font-bold text-green-900">
                  Job Approved & Payment Released
                </h3>
              </div>
              {job.reviewRating && (
                <div className="mt-3 rounded-xl bg-white p-4 border border-green-100">
                  <div className="flex items-center gap-1 mb-1.5">
                    {Array.from({ length: job.reviewRating }).map((_, i) => (
                      <Star
                        key={i}
                        className="h-4 w-4 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700">{job.reviewComment}</p>
                </div>
              )}
              {!job.reviewRating && !showReview && (
                <Button
                  onClick={() => setShowReview(true)}
                  variant="outline"
                  className="mt-3 rounded-xl border-green-200 px-4 py-2 text-sm font-semibold text-green-800 hover:bg-green-100 h-auto"
                >
                  <Star className="mr-1.5 h-4 w-4" />
                  Write a Review
                </Button>
              )}
              <Button
                variant="outline"
                className="mt-3 ml-2 rounded-xl border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 h-auto"
              >
                <Download className="mr-1.5 h-4 w-4" />
                Download Job Report
              </Button>
            </Card>
          )}

          {/* Pro info */}
          {job.assignedPro && (
            <Card className="rounded-2xl border border-gray-200 p-5 shadow-sm">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={job.assignedPro.avatar}
                    alt={job.assignedPro.name}
                  />
                  <AvatarFallback>{job.assignedPro.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-gray-900">
                    {job.assignedPro.name}
                  </p>
                  <div className="flex items-center gap-0.5 text-sm">
                    <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-semibold">{job.assignedPro.rating}</span>
                    <span className="text-gray-500">
                      ({job.assignedPro.reviewCount} reviews)
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          )}
        </div>
      )}

      {/* Draft status — minimal view */}
      {job.status === 'draft' && (
        <Card className="rounded-2xl border border-gray-200 p-6 shadow-sm text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100">
            <FileText className="h-7 w-7 text-gray-400" />
          </div>
          <h3 className="font-bold text-gray-900">Draft Job</h3>
          <p className="mt-1 text-sm text-gray-500">
            This job hasn&apos;t been published yet. Finish and publish to start
            receiving bids.
          </p>
          <Button
            asChild
            className="mt-4 rounded-xl bg-reno-green px-6 py-2.5 text-sm font-semibold text-white hover:bg-reno-green-dark h-auto"
          >
            <Link href="/post-job">Continue Editing</Link>
          </Button>
        </Card>
      )}
    </div>
  );
}
