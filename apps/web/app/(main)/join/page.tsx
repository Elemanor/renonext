'use client';

import { useState, useCallback, useRef, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Building2,
  Award,
  Shield,
  Upload,
  Camera,
  FileText,
  Briefcase,
  MapPin,
  Phone,
  User,
  Hash,
  Calendar,
  DollarSign,
  Loader2,
  X,
  FileCheck,
  AlertCircle,
  Image as ImageIcon,
} from 'lucide-react';
import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Card, CardContent } from '@/components/ui/card';
import { useAuth } from '@/lib/auth/auth-context';
import { createSupabaseBrowserClient } from '@/lib/supabase/client';
import { MeshGradient } from '@/components/landing/_animations/mesh-gradient';
import { ScrollReveal } from '@/components/landing/_animations/scroll-reveal';
import { AnimatedProgress } from '@/components/landing/_animations/animated-progress';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STEPS = [
  'Business Info',
  'Credentials',
  'Insurance & WSIB',
  'Documents',
  'Portfolio & Rates',
  'Review & Submit',
];

const PROVINCES = [
  'ON', 'BC', 'AB', 'SK', 'MB', 'QC', 'NB', 'NS', 'PE', 'NL', 'YT', 'NT', 'NU',
] as const;

const BUSINESS_TYPES = [
  { value: 'sole_proprietor', label: 'Sole Proprietor' },
  { value: 'partnership', label: 'Partnership' },
  { value: 'corporation', label: 'Corporation' },
  { value: 'other', label: 'Other' },
] as const;

const WSIB_STATUSES = [
  { value: 'active', label: 'Active' },
  { value: 'expired', label: 'Expired' },
  { value: 'exempt', label: 'Exempt' },
  { value: 'not_applicable', label: 'Not Applicable' },
] as const;

const LICENSE_TYPES = [
  { value: 'general_contractor', label: 'General Contractor' },
  { value: 'electrical', label: 'Electrical' },
  { value: 'plumbing', label: 'Plumbing' },
  { value: 'hvac', label: 'HVAC' },
  { value: 'structural', label: 'Structural' },
  { value: 'roofing', label: 'Roofing' },
  { value: 'other', label: 'Other' },
] as const;

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface FormData {
  // Step 0: Business Info
  company_name: string;
  business_type: string;
  business_number: string;
  years_experience: string;
  address: string;
  city: string;
  province: string;
  phone: string;
  bio: string;
  headline: string;
  // Step 1: Credentials
  license_number: string;
  license_type: string;
  license_province: string;
  license_expiry: string;
  bcin: string;
  // Step 2: Insurance & WSIB
  insurance_provider: string;
  insurance_policy_number: string;
  insurance_coverage_amount: string;
  insurance_expiry: string;
  wsib_number: string;
  wsib_status: string;
  // Step 3: Documents (URLs after upload)
  insurance_certificate_url: string;
  wsib_certificate_url: string;
  // Step 4: Portfolio & Rates
  hourly_rate_min: string;
  hourly_rate_max: string;
  service_radius_km: string;
  portfolio_urls: string[];
}

const defaultFormData: FormData = {
  company_name: '',
  business_type: '',
  business_number: '',
  years_experience: '',
  address: '',
  city: '',
  province: 'ON',
  phone: '',
  bio: '',
  headline: '',
  license_number: '',
  license_type: '',
  license_province: 'ON',
  license_expiry: '',
  bcin: '',
  insurance_provider: '',
  insurance_policy_number: '',
  insurance_coverage_amount: '',
  insurance_expiry: '',
  wsib_number: '',
  wsib_status: '',
  insurance_certificate_url: '',
  wsib_certificate_url: '',
  hourly_rate_min: '',
  hourly_rate_max: '',
  service_radius_km: '50',
  portfolio_urls: [],
};

// ---------------------------------------------------------------------------
// Main Component
// ---------------------------------------------------------------------------

export default function JoinPage() {
  const router = useRouter();
  const { user, profile, loading: authLoading } = useAuth();
  const [currentStep, setCurrentStep] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward
  const [formData, setFormData] = useState<FormData>(defaultFormData);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Document upload states
  const [uploadingInsurance, setUploadingInsurance] = useState(false);
  const [uploadingWsib, setUploadingWsib] = useState(false);
  const [insuranceDragActive, setInsuranceDragActive] = useState(false);
  const [wsibDragActive, setWsibDragActive] = useState(false);
  const insuranceInputRef = useRef<HTMLInputElement>(null);
  const wsibInputRef = useRef<HTMLInputElement>(null);

  const updateField = useCallback(
    <K extends keyof FormData>(key: K, value: FormData[K]) => {
      setFormData((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  // Calculate completion percentage
  const completionPercentage = useMemo(() => {
    const fields = Object.entries(formData);
    const filledFields = fields.filter(([key, value]) => {
      if (key === 'portfolio_urls') return (value as string[]).filter(Boolean).length > 0;
      if (key === 'wsib_certificate_url') {
        // Only count if wsib is required
        if (formData.wsib_status === 'exempt' || formData.wsib_status === 'not_applicable') {
          return true;
        }
      }
      return value && value !== 'ON' && value !== '50';
    }).length;
    return Math.round((filledFields / fields.length) * 100);
  }, [formData]);

  // ── Auth guard ──
  if (authLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-reno-green-dark" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-reno-green-dark to-secondary-600 flex items-center justify-center mx-auto mb-6 shadow-lg">
            <Briefcase className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Sign up to get started
          </h1>
          <p className="text-gray-600 mb-6">
            Create a professional account to begin your contractor application.
          </p>
          <Button asChild className="bg-gradient-to-r from-reno-green-dark to-reno-green text-white">
            <Link href="/signup">Create Account</Link>
          </Button>
        </div>
      </div>
    );
  }

  if (profile?.role !== 'pro') {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-4">
          <AlertCircle className="w-12 h-12 text-amber-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Professional Account Required
          </h1>
          <p className="text-gray-600 mb-6">
            This application is for contractor accounts only. Please sign up as a professional.
          </p>
          <Button asChild variant="outline">
            <Link href="/signup">Sign Up as Professional</Link>
          </Button>
        </div>
      </div>
    );
  }

  // ── File upload handler ──
  const handleFileUpload = async (
    file: File,
    folder: string,
    setUploading: (v: boolean) => void,
    urlField: 'insurance_certificate_url' | 'wsib_certificate_url'
  ) => {
    setUploading(true);
    try {
      const supabase = createSupabaseBrowserClient();
      const ext = file.name.split('.').pop();
      const path = `${user.id}/${folder}-${Date.now()}.${ext}`;

      const { error } = await supabase.storage
        .from('contractor-documents')
        .upload(path, file, { upsert: true });

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from('contractor-documents')
        .getPublicUrl(path);

      updateField(urlField, urlData.publicUrl);
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  };

  // ── Drag and drop handlers ──
  const handleDrag = (e: React.DragEvent, setDragActive: (v: boolean) => void) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (
    e: React.DragEvent,
    folder: string,
    setUploading: (v: boolean) => void,
    setDragActive: (v: boolean) => void,
    urlField: 'insurance_certificate_url' | 'wsib_certificate_url'
  ) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file, folder, setUploading, urlField);
    }
  };

  // ── Validation ──
  const canProceed = (): boolean => {
    switch (currentStep) {
      case 0:
        return !!(
          formData.company_name.trim() &&
          formData.business_type &&
          formData.city.trim() &&
          formData.phone.trim() &&
          formData.headline.trim()
        );
      case 1:
        return !!(formData.license_number.trim() && formData.license_type);
      case 2:
        return !!(
          formData.insurance_provider.trim() &&
          formData.insurance_policy_number.trim() &&
          formData.wsib_status
        );
      case 3:
        return !!(
          formData.insurance_certificate_url &&
          (formData.wsib_status === 'exempt' ||
            formData.wsib_status === 'not_applicable' ||
            formData.wsib_certificate_url)
        );
      case 4:
        return true; // Optional step
      case 5:
        return agreedToTerms;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setDirection(1);
      setCurrentStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setDirection(-1);
      setCurrentStep((s) => s - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch('/api/contractor/application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          portfolio_urls: formData.portfolio_urls.filter(Boolean),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit application');
      }

      router.push('/join/success');
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Something went wrong');
      setSubmitting(false);
    }
  };

  // ── Step Content Renderers ──

  const renderBusinessInfo = () => (
    <div className="space-y-6">
      <Card className="border-gray-100 shadow-sm">
        <CardContent className="p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="company_name">Company Name *</Label>
              <div className="relative group">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-colors group-focus-within:text-reno-green-dark" />
                <Input
                  id="company_name"
                  placeholder="Your Company Inc."
                  className="pl-10 h-11 rounded-xl"
                  value={formData.company_name}
                  onChange={(e) => updateField('company_name', e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Business Type *</Label>
              <Select
                value={formData.business_type}
                onValueChange={(v) => updateField('business_type', v)}
              >
                <SelectTrigger className="h-11 rounded-xl">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {BUSINESS_TYPES.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-100 shadow-sm">
        <CardContent className="p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="business_number">Business Number</Label>
              <div className="relative group">
                <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-colors group-focus-within:text-reno-green-dark" />
                <Input
                  id="business_number"
                  placeholder="123456789"
                  className="pl-10 h-11 rounded-xl"
                  value={formData.business_number}
                  onChange={(e) => updateField('business_number', e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="years_experience">Years of Experience</Label>
              <Input
                id="years_experience"
                type="number"
                min="0"
                placeholder="10"
                className="h-11 rounded-xl"
                value={formData.years_experience}
                onChange={(e) => updateField('years_experience', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-100 shadow-sm">
        <CardContent className="p-5 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address">Business Address</Label>
            <div className="relative group">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-colors group-focus-within:text-reno-green-dark" />
              <Input
                id="address"
                placeholder="123 Main St"
                className="pl-10 h-11 rounded-xl"
                value={formData.address}
                onChange={(e) => updateField('address', e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="city">City *</Label>
              <Input
                id="city"
                placeholder="Toronto"
                className="h-11 rounded-xl"
                value={formData.city}
                onChange={(e) => updateField('city', e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Province</Label>
              <Select
                value={formData.province}
                onValueChange={(v) => updateField('province', v)}
              >
                <SelectTrigger className="h-11 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PROVINCES.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <div className="relative group">
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-colors group-focus-within:text-reno-green-dark" />
              <Input
                id="phone"
                type="tel"
                placeholder="(416) 555-0123"
                className="pl-10 h-11 rounded-xl"
                value={formData.phone}
                onChange={(e) => updateField('phone', e.target.value)}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-100 shadow-sm">
        <CardContent className="p-5 space-y-4">
          <div className="space-y-2">
            <Label htmlFor="headline">Professional Headline *</Label>
            <Input
              id="headline"
              placeholder="Licensed General Contractor | 15+ Years GTA Experience"
              className="h-11 rounded-xl"
              value={formData.headline}
              onChange={(e) => updateField('headline', e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="bio">About Your Business</Label>
            <Textarea
              id="bio"
              placeholder="Tell homeowners about your experience, specialties, and what sets your work apart..."
              rows={4}
              className="rounded-xl"
              value={formData.bio}
              onChange={(e) => updateField('bio', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderCredentials = () => (
    <div className="space-y-6">
      <Card className="border-gray-100 shadow-sm">
        <CardContent className="p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="license_number">License Number *</Label>
              <div className="relative group">
                <Award className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-colors group-focus-within:text-reno-green-dark" />
                <Input
                  id="license_number"
                  placeholder="LIC-123456"
                  className="pl-10 h-11 rounded-xl"
                  value={formData.license_number}
                  onChange={(e) => updateField('license_number', e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>License Type *</Label>
              <Select
                value={formData.license_type}
                onValueChange={(v) => updateField('license_type', v)}
              >
                <SelectTrigger className="h-11 rounded-xl">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {LICENSE_TYPES.map((t) => (
                    <SelectItem key={t.value} value={t.value}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-100 shadow-sm">
        <CardContent className="p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>License Province</Label>
              <Select
                value={formData.license_province}
                onValueChange={(v) => updateField('license_province', v)}
              >
                <SelectTrigger className="h-11 rounded-xl">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {PROVINCES.map((p) => (
                    <SelectItem key={p} value={p}>
                      {p}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="license_expiry">License Expiry</Label>
              <div className="relative group">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-colors group-focus-within:text-reno-green-dark" />
                <Input
                  id="license_expiry"
                  type="date"
                  className="pl-10 h-11 rounded-xl"
                  value={formData.license_expiry}
                  onChange={(e) => updateField('license_expiry', e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-100 shadow-sm">
        <CardContent className="p-5">
          <div className="space-y-2">
            <Label htmlFor="bcin">BCIN Number (Optional)</Label>
            <div className="relative group">
              <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-colors group-focus-within:text-reno-green-dark" />
              <Input
                id="bcin"
                placeholder="BCIN-000000"
                className="pl-10 h-11 rounded-xl"
                value={formData.bcin}
                onChange={(e) => updateField('bcin', e.target.value)}
              />
            </div>
            <p className="text-xs text-gray-500">
              Ontario Building Code Identification Number — required for Building Code designers
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderInsurance = () => (
    <div className="space-y-6">
      <Card className="border-gray-100 shadow-sm">
        <CardContent className="p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Shield className="h-4 w-4 text-reno-green-dark" />
            Liability Insurance
          </h3>
          <div className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="insurance_provider">Insurance Provider *</Label>
                <Input
                  id="insurance_provider"
                  placeholder="Intact Insurance"
                  className="h-11 rounded-xl"
                  value={formData.insurance_provider}
                  onChange={(e) => updateField('insurance_provider', e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="insurance_policy_number">Policy Number *</Label>
                <Input
                  id="insurance_policy_number"
                  placeholder="POL-123456"
                  className="h-11 rounded-xl"
                  value={formData.insurance_policy_number}
                  onChange={(e) =>
                    updateField('insurance_policy_number', e.target.value)
                  }
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="insurance_coverage_amount">Coverage Amount ($)</Label>
                <div className="relative group">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-colors group-focus-within:text-reno-green-dark" />
                  <Input
                    id="insurance_coverage_amount"
                    type="number"
                    min="0"
                    placeholder="2000000"
                    className="pl-10 h-11 rounded-xl"
                    value={formData.insurance_coverage_amount}
                    onChange={(e) =>
                      updateField('insurance_coverage_amount', e.target.value)
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="insurance_expiry">Insurance Expiry</Label>
                <div className="relative group">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-colors group-focus-within:text-reno-green-dark" />
                  <Input
                    id="insurance_expiry"
                    type="date"
                    className="pl-10 h-11 rounded-xl"
                    value={formData.insurance_expiry}
                    onChange={(e) => updateField('insurance_expiry', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-100 shadow-sm">
        <CardContent className="p-5">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <FileCheck className="h-4 w-4 text-reno-green-dark" />
            WSIB (Workplace Safety and Insurance Board)
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label>WSIB Status *</Label>
              <Select
                value={formData.wsib_status}
                onValueChange={(v) => updateField('wsib_status', v)}
              >
                <SelectTrigger className="h-11 rounded-xl">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {WSIB_STATUSES.map((s) => (
                    <SelectItem key={s.value} value={s.value}>
                      {s.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {formData.wsib_status === 'active' && (
              <div className="space-y-2">
                <Label htmlFor="wsib_number">WSIB Number</Label>
                <Input
                  id="wsib_number"
                  placeholder="1234567"
                  className="h-11 rounded-xl"
                  value={formData.wsib_number}
                  onChange={(e) => updateField('wsib_number', e.target.value)}
                />
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderDocuments = () => {
    const isInsurancePdf = formData.insurance_certificate_url.toLowerCase().includes('.pdf');
    const isWsibPdf = formData.wsib_certificate_url.toLowerCase().includes('.pdf');

    return (
      <div className="space-y-6">
        <p className="text-sm text-gray-600">
          Upload your documentation for verification. Accepted formats: PDF, JPEG, PNG, WebP (max 10MB each).
        </p>

        {/* Insurance Certificate */}
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                  <Shield className="h-4 w-4 text-reno-green-dark" />
                  Insurance Certificate *
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Proof of active liability insurance
                </p>
              </div>
              {formData.insurance_certificate_url && (
                <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-400 text-white border-0 shadow-sm">
                  <Check className="h-3 w-3 mr-1" />
                  Uploaded
                </Badge>
              )}
            </div>

            <input
              ref={insuranceInputRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png,.webp"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file)
                  handleFileUpload(file, 'insurance', setUploadingInsurance, 'insurance_certificate_url');
              }}
            />

            <div>
              {formData.insurance_certificate_url ? (
                <div className="rounded-xl bg-emerald-50 border-2 border-emerald-200 p-4">
                  <div className="flex items-center gap-3">
                    {isInsurancePdf ? (
                      <FileText className="h-6 w-6 text-emerald-600 shrink-0" />
                    ) : (
                      <ImageIcon className="h-6 w-6 text-emerald-600 shrink-0" />
                    )}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-emerald-900">Document uploaded successfully</p>
                      <p className="text-xs text-emerald-600 truncate">Ready for verification</p>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-emerald-600 hover:text-red-500 hover:bg-red-50 h-8 w-8 p-0 shrink-0"
                      onClick={() => updateField('insurance_certificate_url', '')}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  className={`rounded-xl border-2 border-dashed transition-all duration-200 ${
                    insuranceDragActive
                      ? 'border-reno-green bg-reno-green-light'
                      : 'border-gray-300 hover:border-reno-green hover:bg-gray-50'
                  }`}
                  onDragEnter={(e) => handleDrag(e, setInsuranceDragActive)}
                  onDragLeave={(e) => handleDrag(e, setInsuranceDragActive)}
                  onDragOver={(e) => handleDrag(e, setInsuranceDragActive)}
                  onDrop={(e) =>
                    handleDrop(e, 'insurance', setUploadingInsurance, setInsuranceDragActive, 'insurance_certificate_url')
                  }
                >
                  <div className="p-8 text-center">
                    {uploadingInsurance ? (
                      <div className="space-y-3">
                        <Loader2 className="h-10 w-10 mx-auto animate-spin text-reno-green-dark" />
                        <p className="text-sm text-gray-600">Uploading your document...</p>
                        <div className="max-w-xs mx-auto">
                          <AnimatedProgress value={65} barClass="bg-gradient-to-r from-reno-green-dark to-reno-green" />
                        </div>
                      </div>
                    ) : (
                      <>
                        <Upload className="h-10 w-10 mx-auto text-gray-400 mb-3" />
                        <p className="text-sm font-medium text-gray-900 mb-1">
                          Drop your file here, or click to browse
                        </p>
                        <p className="text-xs text-gray-500 mb-4">
                          PDF, JPEG, PNG, or WebP (max 10MB)
                        </p>
                        <Button
                          variant="outline"
                          size="sm"
                          className="rounded-xl"
                          onClick={() => insuranceInputRef.current?.click()}
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Choose File
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* WSIB Certificate */}
        {formData.wsib_status !== 'exempt' && formData.wsib_status !== 'not_applicable' && (
          <Card className="border-gray-200 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <FileCheck className="h-4 w-4 text-reno-green-dark" />
                    WSIB Certificate *
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    Proof of WSIB clearance
                  </p>
                </div>
                {formData.wsib_certificate_url && (
                  <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-400 text-white border-0 shadow-sm">
                    <Check className="h-3 w-3 mr-1" />
                    Uploaded
                  </Badge>
                )}
              </div>

              <input
                ref={wsibInputRef}
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.webp"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file)
                    handleFileUpload(file, 'wsib', setUploadingWsib, 'wsib_certificate_url');
                }}
              />

              <div>
                {formData.wsib_certificate_url ? (
                  <div className="rounded-xl bg-emerald-50 border-2 border-emerald-200 p-4">
                    <div className="flex items-center gap-3">
                      {isWsibPdf ? (
                        <FileText className="h-6 w-6 text-emerald-600 shrink-0" />
                      ) : (
                        <ImageIcon className="h-6 w-6 text-emerald-600 shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-emerald-900">Document uploaded successfully</p>
                        <p className="text-xs text-emerald-600 truncate">Ready for verification</p>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-emerald-600 hover:text-red-500 hover:bg-red-50 h-8 w-8 p-0 shrink-0"
                        onClick={() => updateField('wsib_certificate_url', '')}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div
                    className={`rounded-xl border-2 border-dashed transition-all duration-200 ${
                      wsibDragActive
                        ? 'border-reno-green bg-reno-green-light'
                        : 'border-gray-300 hover:border-reno-green hover:bg-gray-50'
                    }`}
                    onDragEnter={(e) => handleDrag(e, setWsibDragActive)}
                    onDragLeave={(e) => handleDrag(e, setWsibDragActive)}
                    onDragOver={(e) => handleDrag(e, setWsibDragActive)}
                    onDrop={(e) =>
                      handleDrop(e, 'wsib', setUploadingWsib, setWsibDragActive, 'wsib_certificate_url')
                    }
                  >
                    <div className="p-8 text-center">
                      {uploadingWsib ? (
                        <div className="space-y-3">
                          <Loader2 className="h-10 w-10 mx-auto animate-spin text-reno-green-dark" />
                          <p className="text-sm text-gray-600">Uploading your document...</p>
                          <div className="max-w-xs mx-auto">
                            <AnimatedProgress value={65} barClass="bg-gradient-to-r from-reno-green-dark to-reno-green" />
                          </div>
                        </div>
                      ) : (
                        <>
                          <Upload className="h-10 w-10 mx-auto text-gray-400 mb-3" />
                          <p className="text-sm font-medium text-gray-900 mb-1">
                            Drop your file here, or click to browse
                          </p>
                          <p className="text-xs text-gray-500 mb-4">
                            PDF, JPEG, PNG, or WebP (max 10MB)
                          </p>
                          <Button
                            variant="outline"
                            size="sm"
                            className="rounded-xl"
                            onClick={() => wsibInputRef.current?.click()}
                          >
                            <Upload className="h-4 w-4 mr-2" />
                            Choose File
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    );
  };

  const renderPortfolio = () => (
    <div className="space-y-6">
      <Card className="border-gray-100 shadow-sm">
        <CardContent className="p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="hourly_rate_min">Minimum Hourly Rate ($)</Label>
              <div className="relative group">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-colors group-focus-within:text-reno-green-dark" />
                <Input
                  id="hourly_rate_min"
                  type="number"
                  min="0"
                  placeholder="50"
                  className="pl-10 h-11 rounded-xl"
                  value={formData.hourly_rate_min}
                  onChange={(e) => updateField('hourly_rate_min', e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="hourly_rate_max">Maximum Hourly Rate ($)</Label>
              <div className="relative group">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-colors group-focus-within:text-reno-green-dark" />
                <Input
                  id="hourly_rate_max"
                  type="number"
                  min="0"
                  placeholder="150"
                  className="pl-10 h-11 rounded-xl"
                  value={formData.hourly_rate_max}
                  onChange={(e) => updateField('hourly_rate_max', e.target.value)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-100 shadow-sm">
        <CardContent className="p-5">
          <div className="space-y-2">
            <Label htmlFor="service_radius_km">Service Radius (km)</Label>
            <div className="relative group">
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-colors group-focus-within:text-reno-green-dark" />
              <Input
                id="service_radius_km"
                type="number"
                min="1"
                max="500"
                placeholder="50"
                className="pl-10 h-11 rounded-xl"
                value={formData.service_radius_km}
                onChange={(e) => updateField('service_radius_km', e.target.value)}
              />
            </div>
            <p className="text-xs text-gray-500">
              Maximum distance you're willing to travel for jobs
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="border-gray-100 shadow-sm">
        <CardContent className="p-5">
          <div className="space-y-2">
            <Label>Portfolio Links (Optional)</Label>
            <p className="text-xs text-gray-500 mb-3">
              Add links to your portfolio, website, or social media profiles
            </p>
            <div className="space-y-3">
              {formData.portfolio_urls.map((url, idx) => (
                <div key={idx} className="flex gap-2">
                  <div className="relative flex-1 group">
                    <Camera className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 transition-colors group-focus-within:text-reno-green-dark" />
                    <Input
                      placeholder="https://your-portfolio.com"
                      className="pl-10 h-11 rounded-xl"
                      value={url}
                      onChange={(e) => {
                        const updated = [...formData.portfolio_urls];
                        updated[idx] = e.target.value;
                        updateField('portfolio_urls', updated);
                      }}
                    />
                  </div>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="shrink-0 text-gray-400 hover:text-red-500 h-11 w-11"
                    onClick={() => {
                      const updated = formData.portfolio_urls.filter((_, i) => i !== idx);
                      updateField('portfolio_urls', updated);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
            {formData.portfolio_urls.length < 5 && (
              <Button
                variant="outline"
                size="sm"
                className="mt-2 rounded-xl"
                onClick={() =>
                  updateField('portfolio_urls', [...formData.portfolio_urls, ''])
                }
              >
                + Add Link
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );

  const renderReview = () => (
    <div className="space-y-6">
      {/* Completion Meter */}
      <Card className="border-reno-green-light bg-gradient-to-br from-reno-green-light to-white shadow-sm">
        <CardContent className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-semibold text-gray-900">Application Progress</h3>
              <p className="text-xs text-gray-600 mt-0.5">
                {completionPercentage}% of fields completed
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-reno-green-dark to-reno-green flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-reno-green/30">
                {completionPercentage}%
              </div>
            </div>
          </div>
          <AnimatedProgress
            value={completionPercentage}
            barClass="bg-gradient-to-r from-reno-green-dark via-reno-green to-secondary-500"
            delay={0.2}
          />
        </CardContent>
      </Card>

      <Accordion type="multiple" defaultValue={['business', 'credentials', 'insurance', 'portfolio']}>
        <ScrollReveal delay={0.1}>
          <AccordionItem value="business" className="border rounded-xl px-1 mb-3">
            <AccordionTrigger className="text-sm font-semibold hover:no-underline px-4">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-reno-green-dark" />
                Business Information
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4">
              <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm pt-2">
                <dt className="text-gray-500">Company</dt>
                <dd className="font-medium text-gray-900">{formData.company_name || '—'}</dd>
                <dt className="text-gray-500">Type</dt>
                <dd className="font-medium text-gray-900">
                  {BUSINESS_TYPES.find((t) => t.value === formData.business_type)?.label || '—'}
                </dd>
                <dt className="text-gray-500">Business #</dt>
                <dd className="font-medium text-gray-900">{formData.business_number || '—'}</dd>
                <dt className="text-gray-500">Experience</dt>
                <dd className="font-medium text-gray-900">
                  {formData.years_experience ? `${formData.years_experience} years` : '—'}
                </dd>
                <dt className="text-gray-500">Location</dt>
                <dd className="font-medium text-gray-900">
                  {formData.city ? `${formData.city}, ${formData.province}` : '—'}
                </dd>
                <dt className="text-gray-500">Phone</dt>
                <dd className="font-medium text-gray-900">{formData.phone || '—'}</dd>
                <dt className="text-gray-500">Headline</dt>
                <dd className="font-medium text-gray-900 col-span-2">{formData.headline || '—'}</dd>
              </dl>
            </AccordionContent>
          </AccordionItem>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <AccordionItem value="credentials" className="border rounded-xl px-1 mb-3">
            <AccordionTrigger className="text-sm font-semibold hover:no-underline px-4">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-reno-green-dark" />
                Credentials
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4">
              <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm pt-2">
                <dt className="text-gray-500">License #</dt>
                <dd className="font-medium text-gray-900">{formData.license_number || '—'}</dd>
                <dt className="text-gray-500">Type</dt>
                <dd className="font-medium text-gray-900">
                  {LICENSE_TYPES.find((t) => t.value === formData.license_type)?.label || '—'}
                </dd>
                <dt className="text-gray-500">Province</dt>
                <dd className="font-medium text-gray-900">{formData.license_province}</dd>
                <dt className="text-gray-500">Expiry</dt>
                <dd className="font-medium text-gray-900">{formData.license_expiry || '—'}</dd>
                {formData.bcin && (
                  <>
                    <dt className="text-gray-500">BCIN</dt>
                    <dd className="font-medium text-gray-900">{formData.bcin}</dd>
                  </>
                )}
              </dl>
            </AccordionContent>
          </AccordionItem>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <AccordionItem value="insurance" className="border rounded-xl px-1 mb-3">
            <AccordionTrigger className="text-sm font-semibold hover:no-underline px-4">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-reno-green-dark" />
                Insurance & WSIB
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4">
              <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm pt-2">
                <dt className="text-gray-500">Insurance Provider</dt>
                <dd className="font-medium text-gray-900">{formData.insurance_provider || '—'}</dd>
                <dt className="text-gray-500">Policy #</dt>
                <dd className="font-medium text-gray-900">{formData.insurance_policy_number || '—'}</dd>
                <dt className="text-gray-500">Coverage</dt>
                <dd className="font-medium text-gray-900">
                  {formData.insurance_coverage_amount
                    ? `$${Number(formData.insurance_coverage_amount).toLocaleString()}`
                    : '—'}
                </dd>
                <dt className="text-gray-500">WSIB Status</dt>
                <dd className="font-medium text-gray-900">
                  {WSIB_STATUSES.find((s) => s.value === formData.wsib_status)?.label || '—'}
                </dd>
                {formData.wsib_number && (
                  <>
                    <dt className="text-gray-500">WSIB #</dt>
                    <dd className="font-medium text-gray-900">{formData.wsib_number}</dd>
                  </>
                )}
                <dt className="text-gray-500">Insurance Cert</dt>
                <dd className="font-medium text-gray-900">
                  {formData.insurance_certificate_url ? (
                    <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-400 text-white border-0 text-xs shadow-sm">
                      <Check className="h-3 w-3 mr-1" />
                      Uploaded
                    </Badge>
                  ) : (
                    '—'
                  )}
                </dd>
                <dt className="text-gray-500">WSIB Cert</dt>
                <dd className="font-medium text-gray-900">
                  {formData.wsib_certificate_url ? (
                    <Badge className="bg-gradient-to-r from-emerald-500 to-emerald-400 text-white border-0 text-xs shadow-sm">
                      <Check className="h-3 w-3 mr-1" />
                      Uploaded
                    </Badge>
                  ) : formData.wsib_status === 'exempt' || formData.wsib_status === 'not_applicable' ? (
                    <span className="text-gray-400 text-xs">N/A</span>
                  ) : (
                    '—'
                  )}
                </dd>
              </dl>
            </AccordionContent>
          </AccordionItem>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <AccordionItem value="portfolio" className="border rounded-xl px-1">
            <AccordionTrigger className="text-sm font-semibold hover:no-underline px-4">
              <div className="flex items-center gap-2">
                <Camera className="h-4 w-4 text-reno-green-dark" />
                Portfolio & Rates
              </div>
            </AccordionTrigger>
            <AccordionContent className="px-4">
              <dl className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm pt-2">
                <dt className="text-gray-500">Hourly Rate</dt>
                <dd className="font-medium text-gray-900">
                  {formData.hourly_rate_min || formData.hourly_rate_max
                    ? `$${formData.hourly_rate_min || '?'} – $${formData.hourly_rate_max || '?'}`
                    : '—'}
                </dd>
                <dt className="text-gray-500">Service Radius</dt>
                <dd className="font-medium text-gray-900">{formData.service_radius_km} km</dd>
                <dt className="text-gray-500">Portfolio Links</dt>
                <dd className="font-medium text-gray-900">
                  {formData.portfolio_urls.filter(Boolean).length || 'None'}
                </dd>
              </dl>
            </AccordionContent>
          </AccordionItem>
        </ScrollReveal>
      </Accordion>

      {/* Terms */}
      <Card className="border-gray-200 shadow-sm">
        <CardContent className="p-5">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-1 accent-reno-green-dark w-4 h-4"
            />
            <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer">
              I certify that the information provided is accurate and complete. I agree to
              the{' '}
              <Link href="/terms" className="text-reno-green-dark hover:underline font-medium">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-reno-green-dark hover:underline font-medium">
                Privacy Policy
              </Link>
              , including the Contractor Code of Conduct.
            </label>
          </div>
        </CardContent>
      </Card>

      {submitError && (
        <div className="rounded-xl bg-red-50 border-2 border-red-200 px-4 py-3 text-sm text-red-700 flex items-start gap-2">
          <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
          <span>{submitError}</span>
        </div>
      )}
    </div>
  );

  const stepRenderers = [
    renderBusinessInfo,
    renderCredentials,
    renderInsurance,
    renderDocuments,
    renderPortfolio,
    renderReview,
  ];

  const stepIcons = [Building2, Award, Shield, Upload, Camera, FileText];

  // Animation variants
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  // ── Render ──
  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-gray-50">
        {/* Dark Hero Header */}
        <div className="relative bg-gray-900 overflow-hidden">
          <MeshGradient className="absolute inset-0 h-full w-full opacity-40" />
          <div className="absolute inset-0 bg-blueprint opacity-[0.03]" />

          <div className="relative container mx-auto px-4 py-12 md:py-16">
            <div className="max-w-3xl mx-auto text-center">
              <Badge className="mb-4 inline-flex items-center gap-2 rounded-full border-emerald-400/20 bg-emerald-500/10 px-4 py-1.5 text-sm font-medium text-emerald-400 backdrop-blur-sm">
                <Shield className="h-4 w-4" />
                Verified Contractor Program
              </Badge>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Join the{' '}
                <span className="bg-gradient-to-r from-reno-green via-secondary-400 to-emerald-400 bg-clip-text text-transparent">
                  RenoNext Network
                </span>
              </h1>

              <p className="text-lg text-gray-300 mb-6">
                Complete your application to become a verified contractor and access premium homeowner leads.
              </p>

              <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                <Check className="h-4 w-4 text-emerald-400" />
                <span>Step {currentStep + 1} of {STEPS.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="container mx-auto px-4 py-8 md:py-12">
          <div className="max-w-3xl mx-auto">
            {/* Enhanced Step Indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {STEPS.map((step, idx) => {
                  const StepIcon = stepIcons[idx];
                  const isActive = idx === currentStep;
                  const isCompleted = idx < currentStep;

                  return (
                    <div key={step} className="flex flex-1 items-center">
                      <div className="flex flex-col items-center relative">
                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                            isCompleted
                              ? 'border-emerald-500 bg-emerald-500 text-white shadow-lg shadow-emerald-500/30'
                              : isActive
                              ? 'border-reno-green-dark bg-reno-green-dark text-white shadow-lg shadow-reno-green-dark/40 animate-pulse'
                              : 'border-gray-300 bg-white text-gray-400'
                          }`}
                        >
                          {isCompleted ? (
                            <Check className="h-5 w-5" />
                          ) : (
                            <StepIcon className="h-5 w-5" />
                          )}
                        </div>
                        <span
                          className={`mt-2 text-xs font-medium leading-tight text-center max-w-[80px] ${
                            isActive ? 'text-reno-green-dark' : isCompleted ? 'text-emerald-600' : 'text-gray-400'
                          }`}
                        >
                          {step}
                        </span>
                      </div>
                      {idx < STEPS.length - 1 && (
                        <div className="relative flex-1 mx-3 h-1">
                          <div className="absolute inset-0 bg-gray-200 rounded-full" />
                          <div
                            className={`absolute inset-0 rounded-full transition-all duration-500 ${
                              idx < currentStep
                                ? 'bg-gradient-to-r from-emerald-500 to-emerald-400 shadow-sm shadow-emerald-500/30'
                                : 'bg-gray-200'
                            }`}
                            style={{
                              transform: idx < currentStep ? 'scaleX(1)' : 'scaleX(0)',
                              transformOrigin: 'left',
                            }}
                          />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-6">
              <AnimatedProgress
                value={((currentStep + 1) / STEPS.length) * 100}
                barClass="bg-gradient-to-r from-reno-green-dark via-reno-green to-secondary-500"
              />
            </div>

            {/* Animated Step Content */}
            <Card className="rounded-2xl border-gray-200/60 bg-white shadow-xl shadow-gray-200/50 overflow-hidden">
              <CardContent className="p-6 md:p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-6 flex items-center gap-2">
                  {(() => {
                    const StepIcon = stepIcons[currentStep];
                    return <StepIcon className="h-5 w-5 text-reno-green-dark" />;
                  })()}
                  {STEPS[currentStep]}
                </h2>

                <AnimatePresence mode="wait" custom={direction}>
                  <m.div
                    key={currentStep}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      x: { type: 'spring', stiffness: 300, damping: 30 },
                      opacity: { duration: 0.2 },
                    }}
                  >
                    {stepRenderers[currentStep]()}
                  </m.div>
                </AnimatePresence>
              </CardContent>
            </Card>

            {/* Sticky Bottom Navigation */}
            <div className="sticky bottom-0 mt-6 bg-white/80 backdrop-blur-lg rounded-2xl border border-gray-200/60 shadow-lg shadow-gray-200/50 p-4">
              <div className="flex items-center justify-between">
                <Button
                  variant="ghost"
                  onClick={handleBack}
                  disabled={currentStep === 0}
                  className="flex items-center gap-2 rounded-xl"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Back
                </Button>

                <span className="text-sm font-medium text-gray-500">
                  Step {currentStep + 1} of {STEPS.length}
                </span>

                {currentStep === STEPS.length - 1 ? (
                  <Button
                    onClick={handleSubmit}
                    disabled={!canProceed() || submitting}
                    className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white shadow-lg shadow-emerald-500/30 rounded-xl"
                  >
                    {submitting ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        Submit Application
                        <Check className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    onClick={handleNext}
                    disabled={!canProceed()}
                    className="bg-gradient-to-r from-reno-green-dark to-reno-green hover:from-reno-green-dark hover:to-reno-green-dark text-white shadow-lg shadow-reno-green/30 rounded-xl"
                  >
                    Next
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </LazyMotion>
  );
}
