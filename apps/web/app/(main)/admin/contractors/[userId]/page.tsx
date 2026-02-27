'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ChevronLeft,
  Building2,
  Award,
  Shield,
  FileCheck,
  Camera,
  MapPin,
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Hash,
  CheckCircle,
  XCircle,
  AlertCircle,
  Download,
  Loader2,
  Clock,
  User,
  ExternalLink,
  Briefcase,
  Ruler,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GradientIcon } from '@/components/landing/_shared/gradient-icon';
import { ScrollReveal } from '@/components/landing/_animations/scroll-reveal';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { useAuth } from '@/lib/auth/auth-context';

interface ApplicationData {
  user_id: string;
  company_name: string | null;
  business_type: string | null;
  business_number: string | null;
  years_experience: number | null;
  address: string | null;
  city: string | null;
  province: string;
  bio: string | null;
  headline: string | null;
  license_number: string | null;
  license_type: string | null;
  license_province: string;
  license_expiry: string | null;
  bcin: string | null;
  insurance_provider: string | null;
  insurance_policy_number: string | null;
  insurance_coverage_amount: number | null;
  insurance_expiry: string | null;
  insurance_certificate_url: string | null;
  wsib_number: string | null;
  wsib_status: string | null;
  wsib_certificate_url: string | null;
  hourly_rate_min: number | null;
  hourly_rate_max: number | null;
  service_radius_km: number;
  portfolio_urls: string[];
  application_status: string;
  application_submitted_at: string | null;
  application_reviewed_at: string | null;
  application_notes: string | null;
  rejection_reason: string | null;
  profile: {
    full_name: string;
    email: string;
    phone: string | null;
    avatar_url: string | null;
    is_verified: boolean;
  };
}

const statusConfig: Record<
  string,
  { label: string; icon: typeof Clock; color: string; gradient: string }
> = {
  pending_review: {
    label: 'Pending Review',
    icon: Clock,
    color: 'bg-amber-100 text-amber-700 border-amber-200',
    gradient: 'from-amber-400 to-amber-600',
  },
  approved: {
    label: 'Approved',
    icon: CheckCircle,
    color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    gradient: 'from-emerald-400 to-emerald-600',
  },
  rejected: {
    label: 'Rejected',
    icon: XCircle,
    color: 'bg-red-100 text-red-700 border-red-200',
    gradient: 'from-red-400 to-red-600',
  },
  changes_requested: {
    label: 'Changes Requested',
    icon: AlertCircle,
    color: 'bg-blue-100 text-blue-700 border-blue-200',
    gradient: 'from-blue-400 to-blue-600',
  },
};

export default function AdminContractorDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const userId = params.userId as string;

  const [supabase] = useState(() => createSupabaseBrowserClient());
  const [data, setData] = useState<ApplicationData | null>(null);
  const [loading, setLoading] = useState(true);
  const [adminNotes, setAdminNotes] = useState('');
  const [rejectionReason, setRejectionReason] = useState('');
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [showRejectForm, setShowRejectForm] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const { data: app } = await supabase
        .from('pro_profiles')
        .select(
          '*, profile:profiles!pro_profiles_user_id_fkey(full_name, email, phone, avatar_url, is_verified)'
        )
        .eq('user_id', userId)
        .single();

      if (app) {
        const profile = Array.isArray(app.profile) ? app.profile[0] : app.profile;
        setData({ ...app, profile } as ApplicationData);
        setAdminNotes(app.application_notes || '');
      }
      setLoading(false);
    }

    fetchData();
  }, [supabase, userId]);

  const handleAction = async (
    action: 'approved' | 'rejected' | 'changes_requested'
  ) => {
    if (!user) return;
    setActionLoading(action);

    const updates: Record<string, unknown> = {
      application_status: action,
      application_reviewed_at: new Date().toISOString(),
      application_reviewed_by: user.id,
      application_notes: adminNotes || null,
    };

    if (action === 'approved') {
      await supabase
        .from('profiles')
        .update({ is_verified: true })
        .eq('id', userId);
    }

    if (action === 'rejected') {
      updates.rejection_reason = rejectionReason || null;
    }

    const { error } = await supabase
      .from('pro_profiles')
      .update(updates)
      .eq('user_id', userId);

    if (error) {
      alert(error.message);
      setActionLoading(null);
      return;
    }

    router.push('/admin/contractors');
    router.refresh();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <Loader2 className="h-8 w-8 animate-spin text-reno-green-dark" />
        <p className="text-sm text-gray-400 mt-3">Loading application...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="text-center py-24">
        <GradientIcon
          icon={XCircle}
          gradient="from-gray-300 to-gray-400"
          size="md"
          className="mx-auto mb-4"
        />
        <p className="text-gray-600 font-medium text-lg">Application not found</p>
        <p className="text-gray-400 text-sm mt-1">
          This application may have been removed or the link is invalid.
        </p>
        <Button asChild variant="outline" className="mt-6 rounded-xl">
          <Link href="/admin/contractors">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Applications
          </Link>
        </Button>
      </div>
    );
  }

  const status = statusConfig[data.application_status];
  const StatusIcon = status?.icon || Clock;
  const initials = (data.profile?.full_name || '?')
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const InfoRow = ({
    label,
    value,
    icon: Icon,
  }: {
    label: string;
    value: string | null | undefined;
    icon?: typeof Building2;
  }) => (
    <div className="flex items-start gap-3 py-2.5 group/row transition-colors rounded-lg px-2 -mx-2 hover:bg-gray-50">
      {Icon && (
        <div className="h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 group-hover/row:bg-reno-green-light transition-colors">
          <Icon className="h-4 w-4 text-gray-400 group-hover/row:text-reno-green transition-colors" />
        </div>
      )}
      <div className="min-w-0 pt-0.5">
        <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
          {label}
        </p>
        <p className="text-sm font-medium text-gray-900 break-words mt-0.5">
          {value || <span className="text-gray-300">&mdash;</span>}
        </p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Back Button */}
      <ScrollReveal>
        <Button
          asChild
          variant="ghost"
          size="sm"
          className="-ml-2 text-gray-500 hover:text-gray-700 rounded-lg"
        >
          <Link href="/admin/contractors">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Applications
          </Link>
        </Button>
      </ScrollReveal>

      {/* Profile Header */}
      <ScrollReveal delay={0.05}>
        <Card className="border-gray-200/60 shadow-xl shadow-gray-200/50 overflow-hidden">
          <div className={`h-1.5 w-full bg-gradient-to-r ${status?.gradient || 'from-gray-400 to-gray-600'}`} />
          <CardContent className="p-6 md:p-8">
            <div className="flex flex-col sm:flex-row items-start gap-5">
              {/* Avatar */}
              <div className="relative">
                <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-reno-green-light via-reno-green-light to-reno-teal-light flex items-center justify-center text-lg font-bold text-reno-green-dark ring-4 ring-white shadow-lg">
                  {initials}
                </div>
                {data.profile?.is_verified && (
                  <div className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full bg-emerald-500 flex items-center justify-center ring-2 ring-white">
                    <CheckCircle className="h-3.5 w-3.5 text-white" />
                  </div>
                )}
              </div>

              {/* Name + Meta */}
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                  <h1 className="text-2xl font-bold text-gray-900 truncate">
                    {data.profile?.full_name || 'Unknown Contractor'}
                  </h1>
                  <Badge
                    variant="outline"
                    className={`inline-flex items-center gap-1.5 text-xs font-medium rounded-full px-3 py-1 ${status?.color || ''} w-fit`}
                  >
                    <StatusIcon className="h-3 w-3" />
                    {status?.label || data.application_status}
                  </Badge>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-2 text-sm text-gray-500">
                  {data.company_name && (
                    <span className="flex items-center gap-1.5">
                      <Building2 className="h-3.5 w-3.5" />
                      {data.company_name}
                    </span>
                  )}
                  <span className="flex items-center gap-1.5">
                    <Mail className="h-3.5 w-3.5" />
                    {data.profile?.email}
                  </span>
                  {data.profile?.phone && (
                    <span className="flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5" />
                      {data.profile.phone}
                    </span>
                  )}
                  {data.application_submitted_at && (
                    <span className="flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5" />
                      Submitted{' '}
                      {new Date(data.application_submitted_at).toLocaleDateString(
                        'en-CA',
                        { month: 'short', day: 'numeric', year: 'numeric' }
                      )}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </ScrollReveal>

      {/* Info Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Business Info */}
        <ScrollReveal delay={0.1}>
          <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden h-full">
            <div className="h-1 w-full bg-gradient-to-r from-reno-green to-reno-green-dark opacity-60" />
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-3">
                <GradientIcon
                  icon={Building2}
                  gradient="from-reno-green to-reno-green-dark"
                  size="sm"
                />
                Business Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-0.5">
              <InfoRow
                label="Business Type"
                value={data.business_type?.replace('_', ' ')}
                icon={Briefcase}
              />
              <InfoRow label="Business Number" value={data.business_number} icon={Hash} />
              <InfoRow
                label="Experience"
                value={
                  data.years_experience ? `${data.years_experience} years` : null
                }
                icon={Clock}
              />
              <InfoRow label="Address" value={data.address} icon={MapPin} />
              <InfoRow
                label="Location"
                value={data.city ? `${data.city}, ${data.province}` : null}
                icon={MapPin}
              />
              <InfoRow label="Headline" value={data.headline} icon={User} />
              {data.bio && (
                <div className="pt-3 mt-2 border-t border-gray-100">
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                    Bio
                  </p>
                  <p className="text-sm text-gray-700 mt-1.5 whitespace-pre-wrap leading-relaxed">
                    {data.bio}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Credentials */}
        <ScrollReveal delay={0.15}>
          <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden h-full">
            <div className="h-1 w-full bg-gradient-to-r from-violet-400 to-violet-600 opacity-60" />
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-3">
                <GradientIcon
                  icon={Award}
                  gradient="from-violet-400 to-violet-600"
                  size="sm"
                />
                Credentials
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-0.5">
              <InfoRow label="License Number" value={data.license_number} icon={Award} />
              <InfoRow
                label="License Type"
                value={data.license_type?.replace('_', ' ')}
                icon={FileCheck}
              />
              <InfoRow label="License Province" value={data.license_province} icon={MapPin} />
              <InfoRow
                label="License Expiry"
                value={data.license_expiry}
                icon={Calendar}
              />
              {data.bcin && <InfoRow label="BCIN" value={data.bcin} icon={Hash} />}
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* Insurance */}
        <ScrollReveal delay={0.2}>
          <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden h-full">
            <div className="h-1 w-full bg-gradient-to-r from-emerald-400 to-emerald-600 opacity-60" />
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-3">
                <GradientIcon
                  icon={Shield}
                  gradient="from-emerald-400 to-emerald-600"
                  size="sm"
                />
                Insurance
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-0.5">
              <InfoRow label="Provider" value={data.insurance_provider} icon={Shield} />
              <InfoRow
                label="Policy Number"
                value={data.insurance_policy_number}
                icon={Hash}
              />
              <InfoRow
                label="Coverage"
                value={
                  data.insurance_coverage_amount
                    ? `$${data.insurance_coverage_amount.toLocaleString()}`
                    : null
                }
                icon={DollarSign}
              />
              <InfoRow
                label="Expiry"
                value={data.insurance_expiry}
                icon={Calendar}
              />
              {data.insurance_certificate_url && (
                <div className="pt-3 mt-2 border-t border-gray-100">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="rounded-lg border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                  >
                    <a
                      href={data.insurance_certificate_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      View Insurance Certificate
                    </a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </ScrollReveal>

        {/* WSIB */}
        <ScrollReveal delay={0.25}>
          <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden h-full">
            <div className="h-1 w-full bg-gradient-to-r from-blue-400 to-blue-600 opacity-60" />
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold flex items-center gap-3">
                <GradientIcon
                  icon={FileCheck}
                  gradient="from-blue-400 to-blue-600"
                  size="sm"
                />
                WSIB
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-0.5">
              <InfoRow
                label="Status"
                value={data.wsib_status?.replace('_', ' ')}
                icon={CheckCircle}
              />
              <InfoRow label="WSIB Number" value={data.wsib_number} icon={Hash} />
              {data.wsib_certificate_url && (
                <div className="pt-3 mt-2 border-t border-gray-100">
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="rounded-lg border-blue-200 text-blue-700 hover:bg-blue-50"
                  >
                    <a
                      href={data.wsib_certificate_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      View WSIB Certificate
                    </a>
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </ScrollReveal>
      </div>

      {/* Portfolio & Rates */}
      <ScrollReveal delay={0.3}>
        <Card className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-pink-400 to-rose-600 opacity-60" />
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-3">
              <GradientIcon
                icon={Camera}
                gradient="from-pink-400 to-rose-600"
                size="sm"
              />
              Portfolio & Rates
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 sm:grid-cols-3">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                    Hourly Rate
                  </p>
                  <p className="text-sm font-semibold text-gray-900 mt-0.5">
                    {data.hourly_rate_min || data.hourly_rate_max
                      ? `$${data.hourly_rate_min || '?'} \u2013 $${data.hourly_rate_max || '?'}`
                      : '\u2014'}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                  <Ruler className="h-4 w-4 text-gray-400" />
                </div>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                    Service Radius
                  </p>
                  <p className="text-sm font-semibold text-gray-900 mt-0.5">
                    {data.service_radius_km} km
                  </p>
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                  Portfolio Links
                </p>
                {data.portfolio_urls?.filter(Boolean).length > 0 ? (
                  <div className="space-y-1.5 mt-1.5">
                    {data.portfolio_urls.filter(Boolean).map((url, i) => (
                      <a
                        key={i}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-reno-green-dark hover:text-reno-green-dark hover:underline flex items-center gap-1.5 transition-colors"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        Link {i + 1}
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-300 mt-0.5">&mdash;</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </ScrollReveal>

      {/* Admin Actions */}
      <ScrollReveal delay={0.35}>
        <Card className="border-reno-green-light/60 shadow-lg shadow-reno-green-light/50 overflow-hidden">
          <div className="h-1.5 w-full bg-gradient-to-r from-reno-green via-reno-teal to-reno-green" />
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold flex items-center gap-3">
              <GradientIcon
                icon={User}
                gradient="from-reno-green to-reno-teal-dark"
                size="sm"
              />
              Admin Review
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {/* Existing review info */}
            {data.application_reviewed_at && (
              <div className="rounded-xl bg-gray-50 border border-gray-200/60 p-4">
                <p className="text-xs text-gray-500 flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" />
                  Last reviewed:{' '}
                  {new Date(data.application_reviewed_at).toLocaleString()}
                </p>
                {data.rejection_reason && (
                  <div className="mt-3 rounded-lg bg-red-50 border border-red-200 p-3">
                    <p className="text-sm text-red-700">
                      <strong>Rejection reason:</strong> {data.rejection_reason}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Notes textarea */}
            <div className="space-y-2">
              <Label htmlFor="admin-notes" className="text-sm font-medium">
                Admin Notes
              </Label>
              <Textarea
                id="admin-notes"
                placeholder="Add notes about this application..."
                rows={3}
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                className="rounded-xl border-gray-200 transition-all focus:border-reno-green focus:ring-reno-green/20 resize-none"
              />
            </div>

            {/* Rejection reason */}
            {showRejectForm && (
              <div className="space-y-3 rounded-xl border border-red-200 bg-red-50/50 p-5 animate-in fade-in slide-in-from-top-2 duration-300">
                <Label htmlFor="rejection-reason" className="text-red-700 text-sm font-medium">
                  Rejection Reason (visible to contractor)
                </Label>
                <Textarea
                  id="rejection-reason"
                  placeholder="Explain why this application is being rejected..."
                  rows={2}
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="rounded-xl border-red-200 focus:border-red-400 focus:ring-red-400/20 resize-none"
                />
                <div className="flex gap-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    className="rounded-lg"
                    onClick={() => handleAction('rejected')}
                    disabled={!!actionLoading}
                  >
                    {actionLoading === 'rejected' ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-1.5" />
                    ) : (
                      <XCircle className="h-4 w-4 mr-1.5" />
                    )}
                    Confirm Rejection
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-lg"
                    onClick={() => setShowRejectForm(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            {!showRejectForm && (
              <div className="flex flex-wrap gap-3 pt-2">
                <Button
                  onClick={() => handleAction('approved')}
                  disabled={!!actionLoading}
                  className="rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white shadow-lg shadow-emerald-600/25 hover:shadow-xl transition-all duration-300"
                >
                  {actionLoading === 'approved' ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <CheckCircle className="h-4 w-4 mr-2" />
                  )}
                  Approve
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleAction('changes_requested')}
                  disabled={!!actionLoading}
                  className="rounded-xl border-blue-300 text-blue-700 hover:bg-blue-50 transition-all duration-300"
                >
                  {actionLoading === 'changes_requested' ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <AlertCircle className="h-4 w-4 mr-2" />
                  )}
                  Request Changes
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowRejectForm(true)}
                  disabled={!!actionLoading}
                  className="rounded-xl border-red-300 text-red-700 hover:bg-red-50 transition-all duration-300"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </ScrollReveal>
    </div>
  );
}
