'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  Briefcase,
  Star,
  Clock,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Shield,
  Loader2,
  Image as ImageIcon,
  FileCheck,
  XCircle,
  AlertCircle,
  ChevronRight,
} from 'lucide-react';
import { StatsCard } from '@/components/stats-card';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useAuth } from '@/lib/auth/auth-context';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';

interface ProData {
  id: string;
  company_name: string | null;
  avg_rating: number;
  total_reviews: number;
  total_jobs_completed: number;
  response_time_minutes: number | null;
  application_status: string;
  license_expiry: string | null;
  insurance_expiry: string | null;
  wsib_status: string | null;
  wsib_number: string | null;
  license_number: string | null;
  insurance_provider: string | null;
}

function getCertStatus(expiryDate: string | null): {
  status: 'expired' | 'warning' | 'ok' | 'unknown';
  daysRemaining: number;
} {
  if (!expiryDate) return { status: 'unknown', daysRemaining: 0 };
  const now = new Date();
  const exp = new Date(expiryDate);
  const diff = Math.ceil((exp.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  if (diff < 0) return { status: 'expired', daysRemaining: diff };
  if (diff < 90) return { status: 'warning', daysRemaining: diff };
  return { status: 'ok', daysRemaining: diff };
}

function getCertStatusBadge(status: 'expired' | 'warning' | 'ok' | 'unknown') {
  const styles = {
    expired: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200', label: 'EXPIRED' },
    warning: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200', label: '' },
    ok: { bg: 'bg-reno-green-50', text: 'text-reno-green-700', border: 'border-reno-green-200', label: 'OK' },
    unknown: { bg: 'bg-slate-50', text: 'text-slate-500', border: 'border-slate-200', label: 'NOT SET' },
  };
  return styles[status];
}

export default function ProDashboardPage() {
  const { user } = useAuth();
  const [supabase] = useState(() => createSupabaseBrowserClient());
  const [loading, setLoading] = useState(true);
  const [proData, setProData] = useState<ProData | null>(null);
  const [galleryCount, setGalleryCount] = useState(0);

  const fetchData = useCallback(async () => {
    if (!user) return;

    const { data: pro } = await supabase
      .from('pro_profiles')
      .select('id, company_name, avg_rating, total_reviews, total_jobs_completed, response_time_minutes, application_status, license_expiry, insurance_expiry, wsib_status, wsib_number, license_number, insurance_provider')
      .eq('user_id', user.id)
      .single();

    if (pro) {
      setProData(pro);

      // Get gallery count
      const { count } = await supabase
        .from('pro_gallery')
        .select('id', { count: 'exact', head: true })
        .eq('pro_profile_id', pro.id);

      setGalleryCount(count || 0);
    }

    setLoading(false);
  }, [user, supabase]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-reno-green-dark" />
        <p className="text-sm text-slate-400 mt-3">Loading dashboard...</p>
      </div>
    );
  }

  const appStatus = proData?.application_status || 'draft';
  const licenseStatus = getCertStatus(proData?.license_expiry ?? null);
  const insuranceStatus = getCertStatus(proData?.insurance_expiry ?? null);
  const wsibOk = proData?.wsib_status === 'active';

  const certifications = [
    ...(proData?.license_number
      ? [{
          name: 'Contractor License',
          expiryDate: proData.license_expiry,
          ...licenseStatus,
        }]
      : []),
    ...(proData?.insurance_provider
      ? [{
          name: 'Insurance',
          expiryDate: proData.insurance_expiry,
          ...insuranceStatus,
        }]
      : []),
    ...(proData?.wsib_number
      ? [{
          name: 'WSIB',
          expiryDate: null as string | null,
          status: wsibOk ? 'ok' as const : 'warning' as const,
          daysRemaining: 0,
        }]
      : []),
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-slate-900">Dashboard</h1>
        <Button asChild variant="link" className="flex items-center gap-1.5 text-sm font-semibold text-reno-green-dark transition-colors duration-200 hover:text-reno-green-dark no-underline hover:no-underline">
          <Link href="/pro-dashboard/gallery">
            My Portfolio <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>

      {/* Application Status Banner */}
      {appStatus !== 'approved' && (
        <Card className={cn(
          'rounded-2xl border shadow-sm overflow-hidden',
          appStatus === 'pending_review' && 'border-amber-200 bg-amber-50/50',
          appStatus === 'rejected' && 'border-red-200 bg-red-50/50',
          appStatus === 'changes_requested' && 'border-primary-200 bg-primary-50/50',
          appStatus === 'draft' && 'border-slate-200 bg-slate-50/50',
        )}>
          <CardContent className="p-5">
            <div className="flex items-center gap-3">
              {appStatus === 'pending_review' && (
                <>
                  <div className="p-2 rounded-xl bg-amber-100">
                    <Clock className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-amber-800">Application Under Review</p>
                    <p className="text-sm text-amber-700 mt-0.5">Your application is being reviewed by our team. We&apos;ll notify you once it&apos;s approved.</p>
                  </div>
                </>
              )}
              {appStatus === 'rejected' && (
                <>
                  <div className="p-2 rounded-xl bg-red-100">
                    <XCircle className="h-5 w-5 text-red-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-red-800">Application Rejected</p>
                    <p className="text-sm text-red-700 mt-0.5">Please review the feedback and re-submit your application.</p>
                  </div>
                  <Button asChild size="sm" className="rounded-xl bg-red-600 hover:bg-red-700 text-white">
                    <Link href="/join">Re-apply</Link>
                  </Button>
                </>
              )}
              {appStatus === 'changes_requested' && (
                <>
                  <div className="p-2 rounded-xl bg-primary-100">
                    <AlertCircle className="h-5 w-5 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-primary-800">Changes Requested</p>
                    <p className="text-sm text-primary-700 mt-0.5">The admin has requested changes to your application.</p>
                  </div>
                  <Button asChild size="sm" className="rounded-xl bg-primary-600 hover:bg-primary-700 text-white">
                    <Link href="/join">Update Application</Link>
                  </Button>
                </>
              )}
              {appStatus === 'draft' && (
                <>
                  <div className="p-2 rounded-xl bg-slate-200">
                    <FileCheck className="h-5 w-5 text-slate-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800">Complete Your Application</p>
                    <p className="text-sm text-slate-600 mt-0.5">Finish your application to get listed on RenoNext.</p>
                  </div>
                  <Button asChild size="sm" className="rounded-xl bg-reno-green hover:bg-reno-green/90 text-white">
                    <Link href="/join">Start Application</Link>
                  </Button>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          icon={Star}
          label="Average Rating"
          value={proData?.avg_rating ? proData.avg_rating.toFixed(1) : '--'}
          iconColor="text-amber-600"
          iconBg="bg-amber-50"
        />
        <StatsCard
          icon={Briefcase}
          label="Jobs Completed"
          value={String(proData?.total_jobs_completed || 0)}
          iconColor="text-reno-green-dark"
          iconBg="bg-reno-green-light"
        />
        <StatsCard
          icon={Clock}
          label="Avg Response"
          value={proData?.response_time_minutes ? `${proData.response_time_minutes} min` : '--'}
          iconColor="text-purple-600"
          iconBg="bg-purple-50"
        />
        <StatsCard
          icon={ImageIcon}
          label="Portfolio Photos"
          value={String(galleryCount)}
          iconColor="text-reno-purple-600"
          iconBg="bg-reno-purple-50"
        />
      </div>

      {/* Active Projects — empty state */}
      <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold text-slate-900">Active Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
              <Briefcase className="h-6 w-6 text-slate-400" />
            </div>
            <p className="text-slate-500 font-medium">No active projects yet</p>
            <p className="text-sm text-slate-400 mt-1 max-w-sm">
              Once you&apos;re approved and win bids, your active projects will appear here.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Incoming Tenders — empty state */}
      <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold text-slate-900">Incoming Tenders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center mb-4">
              <FileCheck className="h-6 w-6 text-slate-400" />
            </div>
            <p className="text-slate-500 font-medium">No tenders available</p>
            <p className="text-sm text-slate-400 mt-1 max-w-sm">
              New project tenders matching your categories will appear here.
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Certifications & Licenses */}
      {certifications.length > 0 && (
        <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Shield className="h-5 w-5 text-reno-green-dark" />
              Certifications & Licenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3 md:grid-cols-2">
              {certifications.map((cert) => {
                const statusStyle = getCertStatusBadge(cert.status);
                return (
                  <div
                    key={cert.name}
                    className="flex items-center justify-between p-4 rounded-xl border border-slate-200 transition-all duration-200 hover:bg-slate-50"
                  >
                    <div className="flex-1 min-w-0 mr-3">
                      <h3 className="font-semibold text-slate-900 mb-1">{cert.name}</h3>
                      {cert.expiryDate ? (
                        <p className="text-sm text-slate-600">
                          Expires {new Date(cert.expiryDate).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </p>
                      ) : (
                        <p className="text-sm text-slate-400">
                          {cert.name === 'WSIB' ? (wsibOk ? 'Active' : 'Inactive') : 'No expiry set'}
                        </p>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        {cert.status === 'expired' && (
                          <Badge
                            className={cn(
                              'border rounded-full px-2.5 py-0.5 text-xs font-semibold',
                              statusStyle.bg,
                              statusStyle.text,
                              statusStyle.border
                            )}
                          >
                            <AlertTriangle className="h-3 w-3 mr-1 inline" />
                            {statusStyle.label}
                          </Badge>
                        )}
                        {cert.status === 'warning' && (
                          <Badge
                            className={cn(
                              'border rounded-full px-2.5 py-0.5 text-xs font-semibold',
                              statusStyle.bg,
                              statusStyle.text,
                              statusStyle.border
                            )}
                          >
                            {cert.daysRemaining > 0 ? `${cert.daysRemaining} days` : statusStyle.label || 'Check status'}
                          </Badge>
                        )}
                        {cert.status === 'ok' && (
                          <Badge
                            className={cn(
                              'border rounded-full px-2.5 py-0.5 text-xs font-semibold',
                              statusStyle.bg,
                              statusStyle.text,
                              statusStyle.border
                            )}
                          >
                            <CheckCircle className="h-3 w-3 mr-1 inline" />
                            {statusStyle.label}
                          </Badge>
                        )}
                        {cert.status === 'unknown' && (
                          <Badge
                            className={cn(
                              'border rounded-full px-2.5 py-0.5 text-xs font-semibold',
                              statusStyle.bg,
                              statusStyle.text,
                              statusStyle.border
                            )}
                          >
                            {statusStyle.label}
                          </Badge>
                        )}
                      </div>
                    </div>
                    <Button
                      asChild
                      size="sm"
                      variant="outline"
                      className={cn(
                        'rounded-xl border-slate-300 hover:border-reno-green-dark hover:bg-reno-green-light hover:text-reno-green-dark flex-shrink-0',
                        cert.status === 'expired' && 'border-red-300 bg-red-50 text-red-700 hover:bg-red-100 hover:border-red-400'
                      )}
                    >
                      <Link href="/pro-dashboard/settings">
                        {cert.status === 'expired' ? 'Renew' : 'Manage'}
                      </Link>
                    </Button>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Quick Links */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Link href="/pro-dashboard/settings" className="block">
          <Card className="rounded-2xl border border-slate-200 bg-white shadow-none transition-all duration-200 hover:shadow-md hover:border-reno-green-dark/20 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900">Settings</p>
                <p className="text-sm text-slate-500 mt-0.5">Edit profile & service area</p>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-400" />
            </div>
          </Card>
        </Link>
        <Link href="/pro-dashboard/gallery" className="block">
          <Card className="rounded-2xl border border-slate-200 bg-white shadow-none transition-all duration-200 hover:shadow-md hover:border-reno-green-dark/20 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900">Portfolio</p>
                <p className="text-sm text-slate-500 mt-0.5">{galleryCount} photos uploaded</p>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-400" />
            </div>
          </Card>
        </Link>
        <Link href="/join" className="block">
          <Card className="rounded-2xl border border-slate-200 bg-white shadow-none transition-all duration-200 hover:shadow-md hover:border-reno-green-dark/20 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-slate-900">Application</p>
                <p className="text-sm text-slate-500 mt-0.5 capitalize">{appStatus.replace('_', ' ')}</p>
              </div>
              <ChevronRight className="h-5 w-5 text-slate-400" />
            </div>
          </Card>
        </Link>
      </div>
    </div>
  );
}
