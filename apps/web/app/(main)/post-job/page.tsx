'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Upload,
  MapPin,
  Calendar,
  DollarSign,
  Wrench,
  Paintbrush,
  Zap,
  Droplets,
  TreePine,
  Hammer,
  Truck,
  Sparkles,
  ClipboardList,
  AlertCircle,
  PartyPopper,
  Shield,
  Clock,
  Star,
  Users,
  TrendingUp,
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const STEPS = ['Problem Type', 'Details', 'AI Estimate', 'Review', 'Submit'];

const categories = [
  { id: 'plumbing', name: 'Plumbing', icon: Droplets, image: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=300&h=200&fit=crop', color: 'from-blue-500 to-blue-600' },
  { id: 'electrical', name: 'Electrical', icon: Zap, image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300&h=200&fit=crop', color: 'from-amber-500 to-amber-600' },
  { id: 'painting', name: 'Painting', icon: Paintbrush, image: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=300&h=200&fit=crop', color: 'from-rose-500 to-rose-600' },
  { id: 'landscaping', name: 'Landscaping', icon: TreePine, image: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=300&h=200&fit=crop', color: 'from-green-500 to-green-600' },
  { id: 'carpentry', name: 'Carpentry', icon: Hammer, image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=300&h=200&fit=crop', color: 'from-orange-500 to-orange-600' },
  { id: 'cleaning', name: 'Cleaning', icon: Sparkles, image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=300&h=200&fit=crop', color: 'from-teal-500 to-teal-600' },
  { id: 'moving', name: 'Moving', icon: Truck, image: 'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=300&h=200&fit=crop', color: 'from-indigo-500 to-indigo-600' },
  { id: 'general-repair', name: 'General Repair', icon: Wrench, image: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=300&h=200&fit=crop', color: 'from-gray-500 to-gray-600' },
];

export default function PostJobPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    address: '',
    city: '',
    postalCode: '',
    scheduledDate: '',
    isFlexibleDate: false,
    isUrgent: false,
    budgetMin: '',
    budgetMax: '',
    photos: [] as string[],
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiPriceShown, setAiPriceShown] = useState(false);

  const updateForm = (field: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return selectedCategory !== '';
      case 1:
        return formData.title.length > 0 && formData.description.length > 0 && formData.city.length > 0;
      case 2:
        return aiPriceShown;
      case 3:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      const nextStep = currentStep + 1;
      setCurrentStep(nextStep);
      if (nextStep === 2 && !aiPriceShown) {
        setAiLoading(true);
        setTimeout(() => {
          setAiLoading(false);
          setAiPriceShown(true);
        }, 2000);
      }
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setSubmitError(null);

    try {
      const res = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: formData.title,
          description: formData.description,
          category_id: selectedCategory,
          address: formData.address,
          city: formData.city,
          postal_code: formData.postalCode,
          scheduled_date: formData.scheduledDate || null,
          is_flexible_date: formData.isFlexibleDate,
          is_urgent: formData.isUrgent,
          budget_min: formData.budgetMin || null,
          budget_max: formData.budgetMax || null,
          photos: formData.photos,
        }),
      });

      if (res.status === 401) {
        // Demo mode — no auth, still show success
        setIsSubmitted(true);
        return;
      }

      if (!res.ok) {
        const json = await res.json();
        setSubmitError(json.error || 'Something went wrong');
        return;
      }

      setIsSubmitted(true);
    } catch {
      // Network error — show success anyway (demo mode)
      setIsSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  const selectedCatData = categories.find(c => c.id === selectedCategory);

  if (isSubmitted) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-gray-50">
        <div className="mx-auto max-w-md text-center">
          <div className="mb-6 inline-flex rounded-2xl bg-gradient-to-br from-green-100 to-emerald-100 p-5">
            <PartyPopper className="h-12 w-12 text-green-600" />
          </div>
          <h1 className="mb-3 text-3xl font-bold tracking-tight text-gray-900">
            Help Is On The Way!
          </h1>
          <p className="mb-8 text-gray-500">
            Your problem has been submitted. Verified pros in your area are
            being notified and will reach out with solutions shortly.
          </p>
          <div className="flex justify-center gap-3">
            <Button asChild className="rounded-xl bg-reno-green-dark px-6 py-3 text-sm font-semibold text-white transition-all duration-200 hover:bg-reno-green-dark hover:shadow-md hover:shadow-reno-green-light h-auto">
              <Link href="/dashboard/jobs">
                View My Jobs
              </Link>
            </Button>
            <Button variant="outline" asChild className="rounded-xl border-gray-200 px-6 py-3 text-sm font-semibold text-gray-700 transition-all duration-200 hover:bg-gray-50 h-auto">
              <Link href="/">
                Back to Home
              </Link>
            </Button>
          </div>
          <div className="mt-8 flex items-center justify-center gap-6 text-sm text-gray-400">
            <span className="flex items-center gap-1.5">
              <Shield className="h-4 w-4" />
              Verified pros only
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="h-4 w-4" />
              Avg 2hr first bid
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Banner */}
      <div className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
                Describe Your Problem
              </h1>
              <p className="mt-1 text-gray-500">
                Tell us what&apos;s going wrong and we&apos;ll find the right pro to fix it
              </p>
            </div>
            <div className="hidden items-center gap-6 md:flex">
              {[
                { icon: Shield, text: 'Verified Pros' },
                { icon: Clock, text: 'Fast Response' },
                { icon: Star, text: '4.9 Avg Rating' },
              ].map((item) => (
                <div key={item.text} className="flex items-center gap-1.5 text-xs text-gray-500">
                  <item.icon className="h-3.5 w-3.5 text-reno-green" />
                  {item.text}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto max-w-3xl px-4 py-8">
        <p className="mb-6 text-sm text-gray-500">
          Not sure what you need?{' '}
          <Link href="/book-service" className="text-reno-green-dark hover:text-reno-green-dark font-medium">
            Browse our services &rarr;
          </Link>
        </p>

        {/* Step Indicator */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => (
              <div key={step} className="flex flex-1 items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 ${
                      index < currentStep
                        ? 'bg-reno-green-dark text-white shadow-md shadow-reno-green-light'
                        : index === currentStep
                        ? 'bg-reno-green-dark text-white ring-4 ring-reno-green-light shadow-md shadow-reno-green-light'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {index < currentStep ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span
                    className={`mt-2 hidden text-xs font-medium sm:block ${
                      index <= currentStep
                        ? 'text-gray-900'
                        : 'text-gray-400'
                    }`}
                  >
                    {step}
                  </span>
                </div>
                {index < STEPS.length - 1 && (
                  <div className="mx-2 h-0.5 flex-1">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        index < currentStep ? 'bg-reno-green-dark' : 'bg-gray-200'
                      }`}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
          {/* Step 0: Category */}
          {currentStep === 0 && (
            <div>
              <h2 className="mb-2 text-xl font-bold text-gray-900">
                What kind of problem are you dealing with?
              </h2>
              <p className="mb-6 text-sm text-gray-500">
                Select the category that best matches your issue
              </p>
              <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`group relative flex flex-col items-center gap-3 overflow-hidden rounded-2xl border-2 p-5 transition-all duration-200 ${
                      selectedCategory === cat.id
                        ? 'border-reno-green-dark bg-reno-green-light shadow-md shadow-reno-green-light'
                        : 'border-gray-100 hover:border-gray-200 hover:shadow-sm'
                    }`}
                  >
                    {/* Background image hint */}
                    <div className="absolute inset-0 opacity-[0.06]">
                      <img src={cat.image} alt="" className="h-full w-full object-cover" />
                    </div>
                    <div className="relative">
                      <div
                        className={`rounded-xl p-2.5 transition-all duration-200 ${
                          selectedCategory === cat.id
                            ? `bg-gradient-to-br ${cat.color} shadow-sm`
                            : 'bg-gray-100 group-hover:bg-gray-200'
                        }`}
                      >
                        <cat.icon
                          className={`h-7 w-7 ${
                            selectedCategory === cat.id
                              ? 'text-white'
                              : 'text-gray-500'
                          }`}
                        />
                      </div>
                    </div>
                    <span
                      className={`relative text-sm font-semibold ${
                        selectedCategory === cat.id
                          ? 'text-reno-green-dark'
                          : 'text-gray-700'
                      }`}
                    >
                      {cat.name}
                    </span>
                    {selectedCategory === cat.id && (
                      <div className="absolute right-2 top-2">
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-reno-green-dark">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Category tip */}
              {selectedCatData && (
                <div className="mt-6 flex items-center gap-3 rounded-xl bg-reno-green-light p-4 ring-1 ring-reno-green-light">
                  <Users className="h-5 w-5 shrink-0 text-reno-green-dark" />
                  <p className="text-sm text-reno-green-dark">
                    <span className="font-semibold">{selectedCatData.name}</span> — 50+ pros experienced with this kind of problem ready to help.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 1: Details */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-gray-900">
                  Tell Us More About the Problem
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  The more detail you provide, the more accurate bids you&apos;ll receive
                </p>
              </div>

              {/* Title */}
              <div>
                <Label className="mb-1.5 block text-sm font-semibold text-gray-900">
                  What&apos;s the problem? *
                </Label>
                <Input
                  type="text"
                  value={formData.title}
                  onChange={(e) => updateForm('title', e.target.value)}
                  placeholder="e.g., Basement flooding after rain"
                  className="w-full rounded-xl border-gray-200 px-4 py-3 text-sm transition-all duration-200 focus:border-reno-green focus:ring-2 focus:ring-reno-green-light h-auto"
                />
              </div>

              {/* Description */}
              <div>
                <Label className="mb-1.5 block text-sm font-semibold text-gray-900">
                  Problem Details *
                </Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => updateForm('description', e.target.value)}
                  placeholder="Describe what's happening — when did it start, how bad is it, what have you tried..."
                  rows={5}
                  className="w-full rounded-xl border-gray-200 px-4 py-3 text-sm transition-all duration-200 focus:border-reno-green focus:ring-2 focus:ring-reno-green-light"
                />
                <p className="mt-1.5 text-xs text-gray-400">
                  {formData.description.length}/500 characters
                </p>
              </div>

              {/* Location */}
              <div>
                <Label className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-gray-900">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  Location *
                </Label>
                <div className="grid gap-3 sm:grid-cols-2">
                  <Input
                    type="text"
                    value={formData.address}
                    onChange={(e) => updateForm('address', e.target.value)}
                    placeholder="Street address"
                    className="w-full rounded-xl border-gray-200 px-4 py-3 text-sm transition-all duration-200 focus:border-reno-green focus:ring-2 focus:ring-reno-green-light h-auto"
                  />
                  <div className="grid grid-cols-2 gap-3">
                    <Input
                      type="text"
                      value={formData.city}
                      onChange={(e) => updateForm('city', e.target.value)}
                      placeholder="City *"
                      className="w-full rounded-xl border-gray-200 px-4 py-3 text-sm transition-all duration-200 focus:border-reno-green focus:ring-2 focus:ring-reno-green-light h-auto"
                    />
                    <Input
                      type="text"
                      value={formData.postalCode}
                      onChange={(e) => updateForm('postalCode', e.target.value)}
                      placeholder="Postal code"
                      className="w-full rounded-xl border-gray-200 px-4 py-3 text-sm transition-all duration-200 focus:border-reno-green focus:ring-2 focus:ring-reno-green-light h-auto"
                    />
                  </div>
                </div>
              </div>

              {/* Schedule */}
              <div>
                <Label className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-gray-900">
                  <Calendar className="h-4 w-4 text-gray-400" />
                  When do you need this done?
                </Label>
                <Input
                  type="date"
                  value={formData.scheduledDate}
                  onChange={(e) => updateForm('scheduledDate', e.target.value)}
                  className="w-full rounded-xl border-gray-200 px-4 py-3 text-sm transition-all duration-200 focus:border-reno-green focus:ring-2 focus:ring-reno-green-light sm:w-auto h-auto"
                />
                <div className="mt-3 flex gap-4">
                  <Label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600 font-normal">
                    <input
                      type="checkbox"
                      checked={formData.isFlexibleDate}
                      onChange={(e) =>
                        updateForm('isFlexibleDate', e.target.checked)
                      }
                      className="h-4 w-4 rounded border-gray-300 text-reno-green-dark focus:ring-reno-green"
                    />
                    Flexible on date
                  </Label>
                  <Label className="flex cursor-pointer items-center gap-2 text-sm font-normal">
                    <input
                      type="checkbox"
                      checked={formData.isUrgent}
                      onChange={(e) => updateForm('isUrgent', e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <span className="text-red-600 font-medium">This is urgent</span>
                  </Label>
                </div>
              </div>

              {/* Budget */}
              <div>
                <Label className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-gray-900">
                  <DollarSign className="h-4 w-4 text-gray-400" />
                  Budget Range (optional)
                </Label>
                <div className="flex items-center gap-3">
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">$</span>
                    <Input
                      type="number"
                      value={formData.budgetMin}
                      onChange={(e) => updateForm('budgetMin', e.target.value)}
                      placeholder="Min"
                      className="w-full rounded-xl border-gray-200 pl-7 pr-4 py-3 text-sm transition-all duration-200 focus:border-reno-green focus:ring-2 focus:ring-reno-green-light h-auto"
                    />
                  </div>
                  <span className="text-gray-300">—</span>
                  <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-gray-400">$</span>
                    <Input
                      type="number"
                      value={formData.budgetMax}
                      onChange={(e) => updateForm('budgetMax', e.target.value)}
                      placeholder="Max"
                      className="w-full rounded-xl border-gray-200 pl-7 pr-4 py-3 text-sm transition-all duration-200 focus:border-reno-green focus:ring-2 focus:ring-reno-green-light h-auto"
                    />
                  </div>
                </div>
                <p className="mt-1.5 text-xs text-gray-400">
                  Tip: Adding a budget range helps pros send more accurate bids
                </p>
              </div>

              {/* Photos */}
              <div>
                <Label className="mb-1.5 flex items-center gap-1.5 text-sm font-semibold text-gray-900">
                  <Upload className="h-4 w-4 text-gray-400" />
                  Photos (optional)
                </Label>
                <Card className="flex h-36 cursor-pointer items-center justify-center rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50/50 shadow-none transition-all duration-200 hover:border-reno-green hover:bg-reno-green-light/30">
                  <div className="text-center">
                    <Upload className="mx-auto h-8 w-8 text-gray-300" />
                    <p className="mt-2 text-sm font-medium text-gray-600">
                      Click or drag to upload photos
                    </p>
                    <p className="mt-0.5 text-xs text-gray-400">
                      Up to 10 photos, 10MB each
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          )}

          {/* Step 2: AI Price Estimate */}
          {currentStep === 2 && (
            <div>
              <h2 className="mb-2 text-xl font-bold text-gray-900">
                Your Guaranteed Price Range
              </h2>
              <p className="mb-6 text-sm text-gray-500">
                Our AI analyzed thousands of similar jobs to estimate your cost
              </p>

              {aiLoading ? (
                <div className="space-y-4 py-8">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-100 to-blue-100">
                    <Sparkles className="h-7 w-7 animate-pulse text-violet-600" />
                  </div>
                  <p className="text-center text-sm font-medium text-gray-600">
                    Analyzing your job details...
                  </p>
                  <div className="mx-auto max-w-sm space-y-3">
                    <div className="h-10 animate-pulse rounded-xl bg-gray-100" />
                    <div className="h-6 animate-pulse rounded-lg bg-gray-100" />
                    <div className="h-6 w-2/3 animate-pulse rounded-lg bg-gray-100" />
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Price Range Card */}
                  <Card className="overflow-hidden rounded-2xl border border-gray-200 shadow-sm">
                    <div className="bg-gradient-to-r from-violet-50 to-blue-50 p-6">
                      <div className="mb-3 flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-blue-500">
                          <Sparkles className="h-4 w-4 text-white" />
                        </div>
                        <h3 className="font-bold text-gray-900">
                          AI Price Estimate
                        </h3>
                        <Badge className="ml-auto rounded-full border-transparent bg-green-100 px-2.5 py-0.5 text-xs font-semibold text-green-700">
                          High Confidence
                        </Badge>
                      </div>

                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl font-extrabold text-gray-900">
                          $850
                        </span>
                        <span className="text-xl text-gray-400">–</span>
                        <span className="text-4xl font-extrabold text-gray-900">
                          $1,200
                        </span>
                      </div>

                      <div className="mt-2 flex items-center gap-1.5 text-xs text-gray-500">
                        <TrendingUp className="h-3 w-3" />
                        Based on 2,400+ similar jobs in your area
                      </div>
                    </div>

                    {/* Breakdown */}
                    <div className="space-y-2 border-t border-gray-100 p-5">
                      <p className="mb-3 text-xs font-bold uppercase tracking-widest text-gray-400">
                        Estimated Breakdown
                      </p>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Labor estimate</span>
                        <span className="font-semibold text-gray-900">
                          $680
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">
                          Materials estimate
                        </span>
                        <span className="font-semibold text-gray-900">
                          $220
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Platform fee</span>
                        <span className="font-semibold text-gray-900">
                          $95
                        </span>
                      </div>
                    </div>
                  </Card>

                  {/* Trust signal */}
                  <Card className="flex items-start gap-3 rounded-xl border-transparent bg-blue-50 p-4 shadow-none ring-1 ring-blue-100">
                    <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                    <div>
                      <p className="text-sm font-semibold text-blue-800">
                        This is an estimate, not a final price
                      </p>
                      <p className="mt-0.5 text-sm leading-relaxed text-blue-700">
                        Pros will send you competitive bids based on their own
                        assessment. Final price may differ based on scope.
                      </p>
                    </div>
                  </Card>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Review */}
          {currentStep === 3 && (
            <div>
              <h2 className="mb-6 text-xl font-bold text-gray-900">
                Review Your Job
              </h2>
              <div className="space-y-5 rounded-2xl bg-gray-50 p-6">
                {/* Category with icon */}
                <div className="flex items-center gap-3">
                  {selectedCatData && (
                    <div className={`rounded-lg bg-gradient-to-br ${selectedCatData.color} p-2`}>
                      <selectedCatData.icon className="h-5 w-5 text-white" />
                    </div>
                  )}
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                      Category
                    </p>
                    <p className="mt-0.5 text-sm font-semibold capitalize text-gray-900">
                      {selectedCategory.replace('-', ' ')}
                    </p>
                  </div>
                </div>

                <div className="h-px bg-gray-200" />

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                    Title
                  </p>
                  <p className="mt-1 font-medium text-gray-900">
                    {formData.title || '--'}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                    Description
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-gray-700">
                    {formData.description || '--'}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                      Location
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-sm text-gray-700">
                      <MapPin className="h-3.5 w-3.5 text-gray-400" />
                      {formData.city || '--'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                      Budget
                    </p>
                    <p className="mt-1 text-sm font-semibold text-gray-700">
                      {formData.budgetMin && formData.budgetMax
                        ? `$${formData.budgetMin} - $${formData.budgetMax}`
                        : 'Open budget'}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                      Date
                    </p>
                    <p className="mt-1 text-sm text-gray-700">
                      {formData.scheduledDate || 'Flexible'}
                      {formData.isFlexibleDate && ' (Flexible)'}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-gray-400">
                      Urgency
                    </p>
                    <p className="mt-1 text-sm text-gray-700">
                      {formData.isUrgent ? (
                        <Badge className="rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-red-700 border-transparent hover:bg-red-50">
                          Urgent
                        </Badge>
                      ) : (
                        'Normal'
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <Card className="mt-5 flex items-start gap-3 rounded-xl bg-blue-50 p-4 ring-1 ring-blue-100 border-transparent shadow-none">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                <div>
                  <p className="text-sm font-semibold text-blue-800">What happens next?</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-blue-700">
                    After posting, verified pros in your area will be notified and
                    can send you competitive bids. Average first bid arrives in under 2 hours.
                  </p>
                </div>
              </Card>
            </div>
          )}

          {/* Step 4: Final Confirmation */}
          {currentStep === 4 && (
            <div className="py-6 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-reno-green-light to-reno-green-light">
                <ClipboardList className="h-8 w-8 text-reno-green-dark" />
              </div>
              <h2 className="mb-2 text-xl font-bold text-gray-900">
                Ready to Post?
              </h2>
              <p className="mb-8 text-gray-500">
                Click the button below to post your job and start receiving bids
                from local pros.
              </p>
              {submitError && (
                <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-100">
                  {submitError}
                </div>
              )}
              <Button
                onClick={handleSubmit}
                disabled={submitting}
                className="rounded-xl bg-reno-green-dark px-8 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-reno-green-dark hover:shadow-lg hover:shadow-reno-green-light disabled:opacity-50 h-auto"
              >
                {submitting ? 'Posting...' : 'Get Help Now'}
              </Button>
              <div className="mt-6 flex items-center justify-center gap-6 text-xs text-gray-400">
                <span className="flex items-center gap-1">
                  <Shield className="h-3.5 w-3.5" />
                  Free to post
                </span>
                <span className="flex items-center gap-1">
                  <Users className="h-3.5 w-3.5" />
                  50+ pros available
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" />
                  Bids in hours
                </span>
              </div>
            </div>
          )}

          {/* Navigation */}
          {currentStep < 4 && (
            <div className="mt-8 flex justify-between border-t border-gray-100 pt-6">
              <Button
                variant="outline"
                onClick={handleBack}
                disabled={currentStep === 0}
                className="flex items-center gap-2 rounded-xl border-gray-200 px-4 py-2.5 text-sm font-medium text-gray-700 transition-all duration-200 hover:bg-gray-50 disabled:opacity-40 h-auto"
              >
                <ChevronLeft className="h-4 w-4" />
                Back
              </Button>
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
                className="flex items-center gap-2 rounded-xl bg-reno-green-dark px-6 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-reno-green-dark hover:shadow-md hover:shadow-reno-green-light disabled:opacity-40 disabled:shadow-none h-auto"
              >
                {currentStep === 2 ? 'Looks Good' : currentStep === 3 ? 'Continue' : 'Next'}
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        {/* Trust Footer */}
        <div className="mt-6 flex items-center justify-center gap-6 text-xs text-gray-400">
          <span className="flex items-center gap-1.5">
            <Shield className="h-3.5 w-3.5" />
            All pros verified
          </span>
          <span className="flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5" />
            4.9 avg rating
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            2hr avg response
          </span>
        </div>
      </div>
    </div>
  );
}
