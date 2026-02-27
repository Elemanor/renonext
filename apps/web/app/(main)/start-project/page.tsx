'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Sparkles,
  Home,
  Building2,
  Building,
  Landmark,
  HardHat,
  Paintbrush,
  Zap,
  Droplets,
  ShieldCheck,
  ClipboardCheck,
  Camera,
  FileBarChart,
  FileText,
  Wrench,
  AlertTriangle,
  AlertCircle,
  Info,
  DollarSign,
  TrendingUp,
  PartyPopper,
  Users,
  Clock,
  Shield,
  Eye,
  Ruler,
  Truck,
  ArrowRight,
  Lock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';
import { Progress } from '@/components/ui/progress';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

const STEPS = [
  'Scope Definition',
  'Algorithmic Assessment',
  'Milestone Architecture',
  'Capital Requirements',
  'Vault Security',
  'Execute Protocol',
];

const PROPERTY_TYPES = [
  { id: 'detached', label: 'Detached', icon: Home },
  { id: 'semi', label: 'Semi-Detached', icon: Building2 },
  { id: 'townhouse', label: 'Townhouse', icon: Building },
  { id: 'condo', label: 'Condo', icon: Landmark },
] as const;

// ---------------------------------------------------------------------------
// Simulated AI Data
// ---------------------------------------------------------------------------

const SIMULATED_SCOPE = {
  summary:
    'Your project involves lowering the basement floor (underpinning) to gain full-height living space. This is a structural modification requiring engineered drawings, municipal permits, and specialized contractors. Typical scope includes shoring, excavation, new footings, waterproofing, and mechanical relocation.',
  confidence: 'High' as const,
  trades: [
    { name: 'Structural Engineer', required: true, icon: Ruler },
    { name: 'Underpinning Contractor', required: true, icon: HardHat },
    { name: 'Concrete Finisher', required: true, icon: Truck },
    { name: 'Waterproofing Specialist', required: true, icon: Droplets },
    { name: 'Plumber', required: true, icon: Wrench },
    { name: 'Electrician', required: false, icon: Zap },
    { name: 'HVAC Technician', required: false, icon: Building2 },
    { name: 'Painter / Finisher', required: false, icon: Paintbrush },
  ],
  permits: [
    {
      name: 'Building Permit',
      authority: 'City of Toronto',
      estimatedWeeks: 6,
    },
    {
      name: 'Shoring Permit',
      authority: 'City of Toronto',
      estimatedWeeks: 4,
    },
    {
      name: 'Plumbing Permit',
      authority: 'City of Toronto',
      estimatedWeeks: 3,
    },
  ],
  inspections: [
    { stage: 'Pre-construction survey', description: 'Existing conditions documented' },
    { stage: 'Shoring installation', description: 'Temporary supports verified' },
    { stage: 'Excavation depth', description: 'Soil bearing confirmed' },
    { stage: 'Footing reinforcement', description: 'Rebar placement inspected' },
    { stage: 'Concrete pour', description: 'Strength test scheduled' },
    { stage: 'Waterproofing membrane', description: 'Below-grade seal verified' },
    { stage: 'Final occupancy', description: 'All systems signed off' },
  ],
  risks: [
    {
      level: 'high' as const,
      title: 'Adjacent Property Settlement',
      description:
        'Excavation near party walls can cause neighbouring foundation movement. Requires shoring design by a licensed engineer.',
    },
    {
      level: 'medium' as const,
      title: 'Water Table Encounter',
      description:
        'Digging below grade may expose groundwater. Dewatering plan should be included in the scope.',
    },
    {
      level: 'low' as const,
      title: 'Permit Delays',
      description:
        'Municipal review timelines can vary. Applying early mitigates schedule risk.',
    },
  ],
  complexityScore: 8,
};

const SIMULATED_MILESTONES = [
  {
    stage: 1,
    title: 'Engineering & Permits',
    days: 21,
    paymentPercent: 10,
    plainDescription:
      'A structural engineer designs the underpinning plan. Permit applications are submitted to the city. You review and approve the engineered drawings.',
    whatToExpect:
      'You will receive detailed drawings showing exactly how the work will be done. The engineer will visit your home to assess existing conditions. Permit approval typically takes 4-6 weeks.',
    safetyNote: 'No physical work begins until permits are approved.',
  },
  {
    stage: 2,
    title: 'Shoring & Excavation',
    days: 14,
    paymentPercent: 25,
    plainDescription:
      'Temporary steel supports are installed to hold the existing foundation. The basement floor is excavated section by section to the new depth.',
    whatToExpect:
      'Heavy equipment will be on-site. Expect noise and vibration for 1-2 weeks. The crew works in small sections to maintain structural stability at all times.',
    safetyNote:
      'Shoring is inspected by the engineer before any excavation begins.',
  },
  {
    stage: 3,
    title: 'Concrete & Structural',
    days: 21,
    paymentPercent: 30,
    plainDescription:
      'New concrete footings and walls are poured to create the lowered floor. Rebar reinforcement is placed per the engineering design.',
    whatToExpect:
      'Concrete trucks will need driveway access. Each section is poured and must cure before the next. The engineer inspects rebar placement before every pour.',
    safetyNote: 'City inspector verifies footing depth and reinforcement.',
  },
  {
    stage: 4,
    title: 'Waterproofing & Drainage',
    days: 10,
    paymentPercent: 15,
    plainDescription:
      'Waterproof membranes are applied to all below-grade surfaces. A new drainage system (weeping tile) is installed around the perimeter.',
    whatToExpect:
      'This is critical for long-term protection. The membrane is applied in layers and inspected before backfilling. A sump pump may be recommended.',
    safetyNote: 'Waterproofing is inspected before any covering.',
  },
  {
    stage: 5,
    title: 'Mechanical & Finishing',
    days: 18,
    paymentPercent: 15,
    plainDescription:
      'Plumbing, electrical, and HVAC are relocated or extended to the new floor level. Basic finishing (subfloor, insulation) is completed.',
    whatToExpect:
      'Multiple trades work in sequence. Plumbing rough-in first, then electrical, then HVAC. Each requires a separate inspection before covering.',
    safetyNote: 'All mechanical work requires licensed tradespeople.',
  },
  {
    stage: 6,
    title: 'Final Inspection & Handover',
    days: 5,
    paymentPercent: 5,
    plainDescription:
      'The city conducts a final inspection. All documentation is compiled. You do a walkthrough and sign off on the completed work.',
    whatToExpect:
      'You will receive a binder with all permits, inspection records, warranties, and as-built drawings. Any deficiencies are corrected before final payment.',
    safetyNote: 'Final payment released only after your sign-off.',
  },
];

const SIMULATED_COST = {
  low: 65000,
  high: 95000,
  midpoint: 80000,
  breakdown: [
    { category: 'Engineering & Permits', low: 5000, high: 8000, icon: FileText },
    { category: 'Shoring & Excavation', low: 18000, high: 25000, icon: HardHat },
    { category: 'Concrete & Structural', low: 20000, high: 30000, icon: Truck },
    { category: 'Waterproofing', low: 8000, high: 12000, icon: Droplets },
    { category: 'Mechanical (Plumb/Elec/HVAC)', low: 10000, high: 15000, icon: Zap },
    { category: 'Finishing & Cleanup', low: 4000, high: 5000, icon: Paintbrush },
  ],
  marketComparison: [
    { label: 'Lowball Bid', value: 45000, percent: 37, color: 'bg-red-400' },
    { label: 'Your Estimate', value: 80000, percent: 67, color: 'bg-violet-500' },
    { label: 'GTA Average', value: 85000, percent: 71, color: 'bg-blue-400' },
    { label: 'Premium', value: 120000, percent: 100, color: 'bg-gray-300' },
  ],
  roi: {
    homeValueIncrease: '$40,000 — $70,000',
    squareFootage: '600 — 800 sq ft',
    roiPercent: '50 — 75%',
  },
};

const PROTECTIONS = [
  {
    id: 'escrowEnabled' as const,
    title: 'Escrow Protection',
    description:
      'Payments held in trust and released only when milestones are verified complete.',
    icon: Lock,
    alwaysOn: true,
  },
  {
    id: 'inspectionVerification' as const,
    title: 'Inspection Verification',
    description:
      'Independent inspectors verify work quality at every critical stage.',
    icon: ClipboardCheck,
    alwaysOn: false,
  },
  {
    id: 'photoDocumentation' as const,
    title: 'Photo Documentation',
    description:
      'Contractors upload timestamped, geotagged photos of progress daily.',
    icon: Camera,
    alwaysOn: false,
  },
  {
    id: 'progressReports' as const,
    title: 'Weekly Progress Reports',
    description:
      'Automated summary of work completed, upcoming tasks, and any issues.',
    icon: FileBarChart,
    alwaysOn: false,
  },
  {
    id: 'changeOrderApproval' as const,
    title: 'Change Order Approval',
    description:
      'Any scope or cost changes require your explicit approval before work proceeds.',
    icon: FileText,
    alwaysOn: false,
  },
  {
    id: 'warrantyTracking' as const,
    title: 'Warranty Tracking',
    description:
      'All warranties logged and tracked with automatic renewal reminders.',
    icon: ShieldCheck,
    alwaysOn: false,
  },
];

const LOADING_TEXTS_SCOPE = [
  'Identifying required trades...',
  'Checking permit requirements...',
  'Evaluating risk factors...',
  'Analyzing project complexity...',
];

const LOADING_TEXTS_MILESTONES = [
  'Sequencing work phases...',
  'Calculating durations...',
  'Mapping payment schedule...',
];

const LOADING_TEXTS_COST = [
  'Pulling market data...',
  'Comparing contractor rates...',
  'Calculating ROI...',
];

// ---------------------------------------------------------------------------
// Helper Components
// ---------------------------------------------------------------------------

function ShimmerLine({ className = '' }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-gray-200 ${className}`}
    />
  );
}

function CyclingText({ texts }: { texts: string[] }) {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % texts.length);
    }, 1200);
    return () => clearInterval(interval);
  }, [texts.length]);
  return (
    <p className="text-sm font-medium text-violet-600 transition-opacity duration-300">
      {texts[index]}
    </p>
  );
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD',
    maximumFractionDigits: 0,
  }).format(n);
}

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default function StartProjectPage() {
  // --- form state ---
  const [formData, setFormData] = useState({
    description: '',
    propertyType: '',
    city: '',
    postalCode: '',
  });

  const updateForm = (field: keyof typeof formData, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  // --- step state ---
  const [currentStep, setCurrentStep] = useState(0);

  // --- AI loading states ---
  const [scopeLoading, setScopeLoading] = useState(false);
  const [scopeRevealed, setScopeRevealed] = useState(false);
  const [milestonesLoading, setMilestonesLoading] = useState(false);
  const [milestonesRevealed, setMilestonesRevealed] = useState(false);
  const [costLoading, setCostLoading] = useState(false);
  const [costRevealed, setCostRevealed] = useState(false);
  const [animatedCost, setAnimatedCost] = useState(0);

  // --- protection toggles ---
  const [protectionConfig, setProtectionConfig] = useState({
    escrowEnabled: true,
    inspectionVerification: true,
    photoDocumentation: true,
    progressReports: true,
    changeOrderApproval: true,
    warrantyTracking: true,
  });

  // --- submit ---
  const [submitting, setSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // --- validation ---
  const canProceed = () => {
    switch (currentStep) {
      case 0:
        return (
          formData.description.length > 10 &&
          formData.propertyType !== '' &&
          formData.city.length > 0
        );
      case 1:
        return scopeRevealed;
      case 2:
        return milestonesRevealed;
      case 3:
        return costRevealed;
      case 4:
        return true;
      case 5:
        return true;
      default:
        return false;
    }
  };

  // --- navigation ---
  const handleNext = () => {
    if (currentStep >= STEPS.length - 1) return;
    const nextStep = currentStep + 1;
    setCurrentStep(nextStep);

    // Trigger AI simulation for steps 1-3
    if (nextStep === 1 && !scopeRevealed) {
      setScopeLoading(true);
      setTimeout(() => {
        setScopeLoading(false);
        setScopeRevealed(true);
      }, 2500);
    }
    if (nextStep === 2 && !milestonesRevealed) {
      setMilestonesLoading(true);
      setTimeout(() => {
        setMilestonesLoading(false);
        setMilestonesRevealed(true);
      }, 2000);
    }
    if (nextStep === 3 && !costRevealed) {
      setCostLoading(true);
      // Animate the counter
      const target = SIMULATED_COST.midpoint;
      const duration = 2800;
      const steps = 40;
      const increment = target / steps;
      let current = 0;
      const interval = setInterval(() => {
        current += increment;
        if (current >= target) {
          current = target;
          clearInterval(interval);
        }
        setAnimatedCost(Math.round(current));
      }, duration / steps);

      setTimeout(() => {
        setCostLoading(false);
        setCostRevealed(true);
        setAnimatedCost(target);
      }, 3000);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  const activeProtections = Object.values(protectionConfig).filter(Boolean).length;

  // =========================================================================
  // SUCCESS STATE
  // =========================================================================
  if (isSubmitted) {
    return (
      <div className="mx-auto flex min-h-[80vh] max-w-2xl flex-col items-center justify-center px-4 py-20 text-center">
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-lg shadow-emerald-200">
          <PartyPopper className="h-10 w-10 text-white" />
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
          Your Project Is Live!
        </h1>
        <p className="mt-3 text-lg text-gray-600">
          We&apos;re matching you with 5+ qualified, verified contractors now.
          Expect your first bids within 48 hours.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
          <span className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-emerald-500" />
            Escrow Protected
          </span>
          <span className="flex items-center gap-2">
            <Users className="h-4 w-4 text-blue-500" />
            5+ Qualified Contractors
          </span>
          <span className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-violet-500" />
            Bids in 48 hrs
          </span>
        </div>
        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild className="rounded-xl bg-gradient-to-r from-blue-600 to-violet-600 px-8 py-3 text-base font-semibold text-white shadow-lg shadow-blue-600/20 hover:brightness-110">
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
          <Button asChild variant="outline" className="rounded-xl px-8 py-3 text-base font-semibold">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  // =========================================================================
  // WIZARD
  // =========================================================================
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 md:py-16">
      {/* ---- Step Indicator ---- */}
      <div className="mb-10">
        <div className="flex items-center justify-between">
          {STEPS.map((label, index) => (
            <div key={label} className="flex flex-1 items-center">
              {/* Circle */}
              <div className="flex flex-col items-center">
                <div
                  className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-all duration-500 ${
                    index < currentStep
                      ? 'bg-reno-green-dark text-white shadow-md shadow-reno-green-light'
                      : index === currentStep
                        ? 'bg-reno-green-dark text-white ring-4 ring-reno-green-light shadow-md shadow-reno-green-light'
                        : 'bg-gray-100 text-gray-400'
                  }`}
                >
                  {index < currentStep ? (
                    <Check className="h-4 w-4" />
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={`mt-2 hidden text-xs font-medium sm:block ${
                    index <= currentStep ? 'text-reno-green-dark' : 'text-gray-400'
                  }`}
                >
                  {label}
                </span>
              </div>
              {/* Connecting line */}
              {index < STEPS.length - 1 && (
                <div
                  className={`mx-2 h-0.5 flex-1 transition-all duration-500 ${
                    index < currentStep ? 'bg-reno-green-dark' : 'bg-gray-200'
                  }`}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ================================================================= */}
      {/* STEP 0 — Scope Definition                                    */}
      {/* ================================================================= */}
      {currentStep === 0 && (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              Initialize Scope Definition
            </h2>
            <p className="mt-2 text-gray-500">
              Input your project requirements. The system will translate your parameters 
              into a standardized construction protocol.
            </p>
          </div>

          {/* Textarea */}
          <div>
            <Label htmlFor="description" className="text-sm font-semibold text-gray-700">
              Project Parameters
            </Label>
            <Textarea
              id="description"
              rows={5}
              placeholder="e.g. Lower basement floor by 2 feet to create a legal rental unit. Currently 6-foot ceilings, old furnace, moisture issues on back wall. 1950s semi-detached in Toronto."
              value={formData.description}
              onChange={(e) => updateForm('description', e.target.value)}
              className="mt-2 resize-none rounded-xl border-gray-200 text-base leading-relaxed focus:border-reno-green focus:ring-reno-green"
            />
            <p className="mt-2 flex items-center gap-1.5 text-xs text-gray-400">
              <Sparkles className="h-3 w-3" />
              Detailed parameters yield a higher fidelity algorithmic assessment.
            </p>
          </div>

          {/* Property Type */}
          <div>
            <Label className="text-sm font-semibold text-gray-700">
              Property Type
            </Label>
            <div className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {PROPERTY_TYPES.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => updateForm('propertyType', id)}
                  className={`flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all duration-200 ${
                    formData.propertyType === id
                      ? 'border-reno-green bg-reno-green-light text-reno-green-dark shadow-md shadow-reno-green-light'
                      : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-sm font-semibold">{label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* City + Postal */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="city" className="text-sm font-semibold text-gray-700">
                City
              </Label>
              <Input
                id="city"
                placeholder="e.g. Toronto"
                value={formData.city}
                onChange={(e) => updateForm('city', e.target.value)}
                className="mt-2 rounded-xl"
              />
            </div>
            <div>
              <Label htmlFor="postalCode" className="text-sm font-semibold text-gray-700">
                Postal Code (optional)
              </Label>
              <Input
                id="postalCode"
                placeholder="e.g. M4K 1A1"
                value={formData.postalCode}
                onChange={(e) => updateForm('postalCode', e.target.value)}
                className="mt-2 rounded-xl"
              />
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* STEP 1 — Algorithmic Assessment                                        */}
      {/* ================================================================= */}
      {currentStep === 1 && (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              Algorithmic Assessment
            </h2>
            <p className="mt-2 text-gray-500">
              The system has processed your parameters and structured the required 
              trade, permit, and inspection dependencies.
            </p>
          </div>

          {scopeLoading && (
            <div className="flex flex-col items-center gap-6 py-16">
              <div className="relative">
                <Sparkles className="h-12 w-12 animate-pulse text-violet-500" />
                <div className="absolute inset-0 animate-ping rounded-full bg-violet-200 opacity-20" />
              </div>
              <CyclingText texts={LOADING_TEXTS_SCOPE} />
              <div className="w-full max-w-md space-y-3">
                <ShimmerLine className="h-4 w-full" />
                <ShimmerLine className="h-4 w-5/6" />
                <ShimmerLine className="h-4 w-4/6" />
                <ShimmerLine className="h-10 w-full" />
                <ShimmerLine className="h-10 w-full" />
              </div>
            </div>
          )}

          {scopeRevealed && (
            <div className="space-y-8 animate-in fade-in duration-500">
              {/* Summary Card */}
              <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 p-6 text-white shadow-xl shadow-violet-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold">Project Summary</h3>
                    <p className="mt-2 text-sm leading-relaxed text-white/90">
                      {SIMULATED_SCOPE.summary}
                    </p>
                  </div>
                  <Badge className="shrink-0 ml-4 border-white/30 bg-white/20 text-white">
                    {SIMULATED_SCOPE.confidence} Confidence
                  </Badge>
                </div>
              </div>

              {/* Trades */}
              <div>
                <h3 className="mb-4 text-lg font-bold text-gray-900">
                  Required Trades
                </h3>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {SIMULATED_SCOPE.trades.map((trade) => {
                    const Icon = trade.icon;
                    return (
                      <div
                        key={trade.name}
                        className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                      >
                        <div
                          className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                            trade.required
                              ? 'bg-reno-green-light text-reno-green-dark'
                              : 'bg-gray-50 text-gray-400'
                          }`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-semibold text-gray-900">
                            {trade.name}
                          </p>
                        </div>
                        <Badge
                          variant={trade.required ? 'default' : 'secondary'}
                          className={
                            trade.required
                              ? 'bg-reno-green-light text-reno-green-dark'
                              : 'bg-gray-100 text-gray-500'
                          }
                        >
                          {trade.required ? 'Required' : 'Optional'}
                        </Badge>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Permits */}
              <div>
                <h3 className="mb-4 text-lg font-bold text-gray-900">
                  Permits Required
                </h3>
                <div className="space-y-3">
                  {SIMULATED_SCOPE.permits.map((permit) => (
                    <div
                      key={permit.name}
                      className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                    >
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-blue-500" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">
                            {permit.name}
                          </p>
                          <p className="text-xs text-gray-500">
                            {permit.authority}
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-blue-50 text-blue-600">
                        ~{permit.estimatedWeeks} weeks
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>

              {/* Inspections */}
              <div>
                <h3 className="mb-4 text-lg font-bold text-gray-900">
                  Inspections ({SIMULATED_SCOPE.inspections.length})
                </h3>
                <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
                  {SIMULATED_SCOPE.inspections.map((insp, i) => (
                    <div
                      key={insp.stage}
                      className={`flex items-center gap-3 px-4 py-3 ${
                        i < SIMULATED_SCOPE.inspections.length - 1
                          ? 'border-b border-gray-100'
                          : ''
                      }`}
                    >
                      <ClipboardCheck className="h-4 w-4 shrink-0 text-emerald-500" />
                      <div className="flex-1">
                        <span className="text-sm font-medium text-gray-900">
                          {insp.stage}
                        </span>
                        <span className="ml-2 text-sm text-gray-500">
                          — {insp.description}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risk Flags */}
              <div>
                <h3 className="mb-4 text-lg font-bold text-gray-900">
                  Risk Assessment
                </h3>
                <div className="space-y-3">
                  {SIMULATED_SCOPE.risks.map((risk) => {
                    const colors = {
                      high: 'border-red-200 bg-red-50',
                      medium: 'border-amber-200 bg-amber-50',
                      low: 'border-blue-200 bg-blue-50',
                    };
                    const iconColors = {
                      high: 'text-red-500',
                      medium: 'text-amber-500',
                      low: 'text-blue-500',
                    };
                    const badgeColors = {
                      high: 'bg-red-100 text-red-700',
                      medium: 'bg-amber-100 text-amber-700',
                      low: 'bg-blue-100 text-blue-700',
                    };
                    return (
                      <div
                        key={risk.title}
                        className={`rounded-xl border p-4 ${colors[risk.level]}`}
                      >
                        <div className="flex items-start gap-3">
                          <AlertTriangle
                            className={`mt-0.5 h-5 w-5 shrink-0 ${iconColors[risk.level]}`}
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <p className="text-sm font-semibold text-gray-900">
                                {risk.title}
                              </p>
                              <Badge className={badgeColors[risk.level]}>
                                {risk.level.charAt(0).toUpperCase() +
                                  risk.level.slice(1)}
                              </Badge>
                            </div>
                            <p className="mt-1 text-sm text-gray-600">
                              {risk.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Complexity Score */}
              <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-gray-900">
                    Complexity Score
                  </h3>
                  <span className="text-2xl font-extrabold text-violet-600">
                    {SIMULATED_SCOPE.complexityScore}/10
                  </span>
                </div>
                <Progress
                  value={SIMULATED_SCOPE.complexityScore * 10}
                  className="mt-3 h-3"
                />
                <p className="mt-2 text-sm text-gray-500">
                  This is a high-complexity project requiring licensed
                  professionals and multiple inspections.
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================================================================= */}
      {/* STEP 2 — Milestone Architecture                                           */}
      {/* ================================================================= */}
      {currentStep === 2 && (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              Milestone Architecture
            </h2>
            <p className="mt-2 text-gray-500">
              The project has been structured into discrete verification stages. 
              Capital is disbursed solely upon objective proof of completion.
            </p>
          </div>

          {milestonesLoading && (
            <div className="flex flex-col items-center gap-6 py-16">
              <div className="relative">
                <Sparkles className="h-12 w-12 animate-pulse text-violet-500" />
                <div className="absolute inset-0 animate-ping rounded-full bg-violet-200 opacity-20" />
              </div>
              <CyclingText texts={LOADING_TEXTS_MILESTONES} />
              <div className="w-full max-w-md space-y-4">
                {[...Array(6)].map((_, i) => (
                  <ShimmerLine key={i} className="h-16 w-full" />
                ))}
              </div>
            </div>
          )}

          {milestonesRevealed && (
            <div className="relative space-y-0 animate-in fade-in duration-500">
              {/* Vertical timeline line */}
              <div className="absolute left-[18px] top-2 hidden h-[calc(100%-2rem)] w-0.5 bg-gray-200 sm:block" />

              <Accordion type="multiple" className="space-y-4">
                {SIMULATED_MILESTONES.map((milestone, i) => (
                  <AccordionItem
                    key={milestone.stage}
                    value={`stage-${milestone.stage}`}
                    className="relative border-0"
                  >
                    <div className="flex gap-4">
                      {/* Timeline circle */}
                      <div className="relative z-10 hidden sm:block">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-reno-green-dark text-sm font-bold text-white shadow-md shadow-reno-green-light">
                          {milestone.stage}
                        </div>
                      </div>

                      {/* Card */}
                      <div className="flex-1 rounded-xl border border-gray-200 bg-white shadow-sm">
                        <AccordionTrigger className="px-4 py-4 hover:no-underline [&>svg]:h-5 [&>svg]:w-5">
                          <div className="flex flex-1 flex-col items-start gap-1 text-left sm:flex-row sm:items-center sm:gap-4">
                            <span className="text-sm font-bold text-gray-900 sm:hidden">
                              Stage {milestone.stage}:{' '}
                            </span>
                            <span className="text-sm font-bold text-gray-900">
                              {milestone.title}
                            </span>
                            <div className="flex items-center gap-2">
                              <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                                {milestone.days} days
                              </Badge>
                              <Badge className="bg-emerald-100 text-emerald-700">
                                {milestone.paymentPercent}% payment
                              </Badge>
                            </div>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4">
                          <p className="text-sm leading-relaxed text-gray-600">
                            {milestone.plainDescription}
                          </p>
                          <div className="mt-4 rounded-lg border border-blue-100 bg-blue-50 p-3">
                            <p className="flex items-center gap-2 text-xs font-semibold text-blue-700">
                              <Eye className="h-3.5 w-3.5" />
                              What to Expect
                            </p>
                            <p className="mt-1 text-sm text-blue-600">
                              {milestone.whatToExpect}
                            </p>
                          </div>
                          {milestone.safetyNote && (
                            <div className="mt-3 rounded-lg border border-amber-100 bg-amber-50 p-3">
                              <p className="flex items-center gap-2 text-xs font-semibold text-amber-700">
                                <AlertCircle className="h-3.5 w-3.5" />
                                Safety Note
                              </p>
                              <p className="mt-1 text-sm text-amber-600">
                                {milestone.safetyNote}
                              </p>
                            </div>
                          )}
                        </AccordionContent>
                      </div>
                    </div>
                  </AccordionItem>
                ))}
              </Accordion>

              {/* Total */}
              <div className="mt-6 flex items-center justify-between rounded-xl border-2 border-reno-green-light bg-reno-green-light p-4">
                <span className="text-sm font-bold text-reno-green-dark">
                  Total Duration
                </span>
                <span className="text-lg font-extrabold text-reno-green-dark">
                  ~{SIMULATED_MILESTONES.reduce((s, m) => s + m.days, 0)} days
                  ({Math.round(
                    SIMULATED_MILESTONES.reduce((s, m) => s + m.days, 0) / 7
                  )}{' '}
                  weeks)
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================================================================= */}
      {/* STEP 3 — Capital Requirements                                        */}
      {/* ================================================================= */}
      {currentStep === 3 && (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              Capital Requirements
            </h2>
            <p className="mt-2 text-gray-500">
              Algorithmic baseline pricing formulated using active market data 
              from verified professionals within your postal code.
            </p>
          </div>

          {costLoading && (
            <div className="flex flex-col items-center gap-6 py-16">
              <div className="relative">
                <Sparkles className="h-12 w-12 animate-pulse text-violet-500" />
                <div className="absolute inset-0 animate-ping rounded-full bg-violet-200 opacity-20" />
              </div>
              <CyclingText texts={LOADING_TEXTS_COST} />
              <div className="text-center">
                <p className="text-4xl font-extrabold text-gray-900 tabular-nums">
                  {formatCurrency(animatedCost)}
                </p>
              </div>
            </div>
          )}

          {costRevealed && (
            <div className="space-y-8 animate-in fade-in duration-500">
              {/* Hero Price Card */}
              <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-violet-600 to-blue-600 p-8 text-center text-white shadow-xl shadow-violet-200">
                <p className="text-sm font-semibold uppercase tracking-wider text-white/70">
                  Estimated Project Cost
                </p>
                <p className="mt-2 text-4xl font-extrabold tracking-tight sm:text-5xl">
                  {formatCurrency(SIMULATED_COST.low)} —{' '}
                  {formatCurrency(SIMULATED_COST.high)}
                </p>
                <p className="mt-2 text-sm text-white/80">
                  Based on current GTA market rates for basement underpinning
                </p>
              </div>

              {/* Breakdown */}
              <div>
                <h3 className="mb-4 text-lg font-bold text-gray-900">
                  Cost Breakdown
                </h3>
                <div className="space-y-3">
                  {SIMULATED_COST.breakdown.map((item) => {
                    const Icon = item.icon;
                    return (
                      <div
                        key={item.category}
                        className="flex items-center justify-between rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-50 text-gray-500">
                            <Icon className="h-5 w-5" />
                          </div>
                          <span className="text-sm font-semibold text-gray-900">
                            {item.category}
                          </span>
                        </div>
                        <span className="text-sm font-bold text-gray-700">
                          {formatCurrency(item.low)} — {formatCurrency(item.high)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Market Comparison */}
              <div>
                <h3 className="mb-4 text-lg font-bold text-gray-900">
                  Market Comparison
                </h3>
                <div className="space-y-3 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
                  {SIMULATED_COST.marketComparison.map((item) => (
                    <div key={item.label}>
                      <div className="flex items-center justify-between text-sm">
                        <span
                          className={`font-medium ${
                            item.label === 'Your Estimate'
                              ? 'font-bold text-violet-700'
                              : 'text-gray-600'
                          }`}
                        >
                          {item.label}
                        </span>
                        <span
                          className={`font-bold ${
                            item.label === 'Your Estimate'
                              ? 'text-violet-700'
                              : 'text-gray-700'
                          }`}
                        >
                          {formatCurrency(item.value)}
                        </span>
                      </div>
                      <div className="mt-1 h-3 w-full overflow-hidden rounded-full bg-gray-100">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${item.color}`}
                          style={{ width: `${item.percent}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ROI Card */}
              <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 p-6">
                <h3 className="flex items-center gap-2 text-lg font-bold text-emerald-900">
                  <TrendingUp className="h-5 w-5" />
                  Return on Investment
                </h3>
                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="rounded-xl bg-white p-4 text-center shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Home Value Increase
                    </p>
                    <p className="mt-1 text-lg font-extrabold text-emerald-700">
                      {SIMULATED_COST.roi.homeValueIncrease}
                    </p>
                  </div>
                  <div className="rounded-xl bg-white p-4 text-center shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      New Living Space
                    </p>
                    <p className="mt-1 text-lg font-extrabold text-emerald-700">
                      {SIMULATED_COST.roi.squareFootage}
                    </p>
                  </div>
                  <div className="rounded-xl bg-white p-4 text-center shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                      ROI
                    </p>
                    <p className="mt-1 text-lg font-extrabold text-emerald-700">
                      {SIMULATED_COST.roi.roiPercent}
                    </p>
                  </div>
                </div>
                <p className="mt-4 flex items-center gap-2 text-xs text-gray-500">
                  <Info className="h-3.5 w-3.5" />
                  Estimates based on real project data from licensed contractors
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================================================================= */}
      {/* STEP 4 — Vault Security                                         */}
      {/* ================================================================= */}
      {currentStep === 4 && (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              Vault Security Parameters
            </h2>
            <p className="mt-2 text-gray-500">
              Configure the capital protection safeguards for your project. 
              Core milestone vault protection is non-negotiable and permanently enabled.
            </p>
          </div>

          <div className="space-y-3">
            {PROTECTIONS.map((protection) => {
              const Icon = protection.icon;
              const isOn =
                protectionConfig[
                  protection.id as keyof typeof protectionConfig
                ];
              return (
                <div
                  key={protection.id}
                  className={`flex items-center gap-4 rounded-xl border-2 p-4 transition-all duration-200 ${
                    isOn
                      ? 'border-reno-green-light bg-reno-green-light/50'
                      : 'border-gray-200 bg-white'
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                      isOn
                        ? 'bg-reno-green-light text-reno-green-dark'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-gray-900">
                        {protection.title}
                      </p>
                      {protection.alwaysOn && (
                        <Badge className="bg-reno-green-light text-reno-green-dark">
                          Required
                        </Badge>
                      )}
                    </div>
                    <p className="mt-0.5 text-sm text-gray-500">
                      {protection.description}
                    </p>
                  </div>
                  {/* Toggle switch */}
                  <button
                    type="button"
                    role="switch"
                    aria-checked={isOn}
                    disabled={protection.alwaysOn}
                    onClick={() =>
                      setProtectionConfig((prev) => ({
                        ...prev,
                        [protection.id]: !prev[protection.id as keyof typeof prev],
                      }))
                    }
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-reno-green focus-visible:ring-offset-2 ${
                      protection.alwaysOn
                        ? 'cursor-not-allowed opacity-70'
                        : ''
                    } ${isOn ? 'bg-reno-green-dark' : 'bg-gray-200'}`}
                  >
                    <span
                      className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                        isOn ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              );
            })}
          </div>

          {/* Protection Score */}
          <div className="rounded-xl border-2 border-reno-green-light bg-reno-green-light p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-reno-green-dark">
                Protection Score
              </span>
              <span className="text-lg font-extrabold text-reno-green-dark">
                {activeProtections}/6 protections active
              </span>
            </div>
            <Progress
              value={(activeProtections / 6) * 100}
              className="mt-3 h-3"
            />
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* STEP 5 — Review & Launch                                          */}
      {/* ================================================================= */}
      {currentStep === 5 && (
        <div className="space-y-8">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
              Review & Launch
            </h2>
            <p className="mt-2 text-gray-500">
              Everything looks great. Review the summary below and launch your
              project to start receiving bids from qualified contractors.
            </p>
          </div>

          <Accordion type="multiple" defaultValue={['description', 'scope', 'milestones', 'cost', 'protections']} className="space-y-3">
            {/* Project Description */}
            <AccordionItem value="description" className="rounded-xl border border-gray-200 bg-white shadow-sm">
              <AccordionTrigger className="px-4 py-4 hover:no-underline">
                <span className="text-sm font-bold text-gray-900">
                  Project Description
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-4">
                <p className="text-sm text-gray-600">{formData.description}</p>
                <div className="mt-2 flex flex-wrap gap-2 text-xs text-gray-500">
                  <Badge variant="secondary">
                    {PROPERTY_TYPES.find((p) => p.id === formData.propertyType)
                      ?.label ?? formData.propertyType}
                  </Badge>
                  <Badge variant="secondary">{formData.city}</Badge>
                  {formData.postalCode && (
                    <Badge variant="secondary">{formData.postalCode}</Badge>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>

            {/* Scope */}
            <AccordionItem value="scope" className="rounded-xl border border-gray-200 bg-white shadow-sm">
              <AccordionTrigger className="px-4 py-4 hover:no-underline">
                <span className="text-sm font-bold text-gray-900">
                  Scope — {SIMULATED_SCOPE.trades.filter((t) => t.required).length} trades, {SIMULATED_SCOPE.permits.length} permits, {SIMULATED_SCOPE.inspections.length} inspections
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-4 space-y-3">
                <div className="flex flex-wrap gap-2">
                  {SIMULATED_SCOPE.trades
                    .filter((t) => t.required)
                    .map((t) => (
                      <Badge key={t.name} variant="secondary" className="bg-reno-green-light text-reno-green-dark">
                        {t.name}
                      </Badge>
                    ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {SIMULATED_SCOPE.permits.map((p) => (
                    <Badge key={p.name} variant="secondary" className="bg-blue-50 text-blue-600">
                      {p.name}
                    </Badge>
                  ))}
                </div>
                <p className="text-xs text-gray-500">
                  {SIMULATED_SCOPE.risks.length} risks identified — complexity{' '}
                  {SIMULATED_SCOPE.complexityScore}/10
                </p>
              </AccordionContent>
            </AccordionItem>

            {/* Milestones */}
            <AccordionItem value="milestones" className="rounded-xl border border-gray-200 bg-white shadow-sm">
              <AccordionTrigger className="px-4 py-4 hover:no-underline">
                <span className="text-sm font-bold text-gray-900">
                  Milestones — 6 stages,{' '}
                  {SIMULATED_MILESTONES.reduce((s, m) => s + m.days, 0)} days
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-4 space-y-2">
                {SIMULATED_MILESTONES.map((m) => (
                  <div
                    key={m.stage}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-gray-700">
                      {m.stage}. {m.title}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="text-gray-500">{m.days}d</span>
                      <Badge className="bg-emerald-100 text-emerald-700">
                        {m.paymentPercent}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>

            {/* Cost */}
            <AccordionItem value="cost" className="rounded-xl border border-gray-200 bg-white shadow-sm">
              <AccordionTrigger className="px-4 py-4 hover:no-underline">
                <span className="text-sm font-bold text-gray-900">
                  Cost Range — {formatCurrency(SIMULATED_COST.low)} to{' '}
                  {formatCurrency(SIMULATED_COST.high)}
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-4 space-y-2">
                {SIMULATED_COST.breakdown.map((item) => (
                  <div
                    key={item.category}
                    className="flex items-center justify-between text-sm"
                  >
                    <span className="text-gray-700">{item.category}</span>
                    <span className="font-medium text-gray-600">
                      {formatCurrency(item.low)} — {formatCurrency(item.high)}
                    </span>
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>

            {/* Protections */}
            <AccordionItem value="protections" className="rounded-xl border border-gray-200 bg-white shadow-sm">
              <AccordionTrigger className="px-4 py-4 hover:no-underline">
                <span className="text-sm font-bold text-gray-900">
                  Protections — {activeProtections}/6 active
                </span>
              </AccordionTrigger>
              <AccordionContent className="px-4">
                <div className="flex flex-wrap gap-2">
                  {PROTECTIONS.filter(
                    (p) =>
                      protectionConfig[p.id as keyof typeof protectionConfig]
                  ).map((p) => (
                    <Badge
                      key={p.id}
                      variant="secondary"
                      className="bg-emerald-50 text-emerald-700"
                    >
                      <Check className="mr-1 h-3 w-3" />
                      {p.title}
                    </Badge>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* What Happens Next */}
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-6">
            <h3 className="flex items-center gap-2 text-sm font-bold text-blue-900">
              <Info className="h-4 w-4" />
              What Happens Next?
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-blue-700">
              <li className="flex items-start gap-2">
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0" />
                Your project is posted to our verified contractor network
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0" />
                5+ qualified contractors review your scope and submit bids
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0" />
                Compare bids, reviews, and credentials in your dashboard
              </li>
              <li className="flex items-start gap-2">
                <ArrowRight className="mt-0.5 h-4 w-4 shrink-0" />
                Choose your contractor — payments protected by escrow
              </li>
            </ul>
          </div>

          {/* Launch CTA */}
          <div className="text-center">
            <Button
              onClick={handleSubmit}
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-600 to-violet-600 px-12 py-4 text-base font-semibold text-white shadow-lg shadow-blue-600/20 transition-all duration-200 hover:shadow-xl hover:brightness-110"
            >
              {submitting ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Launching...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Launch Project & Get Matched
                </>
              )}
            </Button>
            <div className="mt-6 flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              <span className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-emerald-500" />
                Escrow Protected
              </span>
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-500" />
                5+ Qualified Contractors
              </span>
              <span className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-violet-500" />
                Bids in 48 hrs
              </span>
            </div>
          </div>
        </div>
      )}

      {/* ================================================================= */}
      {/* NAVIGATION BAR                                                    */}
      {/* ================================================================= */}
      {currentStep < 5 && (
        <div className="mt-10 flex items-center justify-between border-t border-gray-100 pt-6">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 0}
            className="rounded-xl px-6"
          >
            <ChevronLeft className="mr-1 h-4 w-4" />
            Back
          </Button>
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="rounded-xl bg-gradient-to-r from-reno-green-dark to-reno-green px-8 text-white shadow-md shadow-reno-green-light hover:brightness-110 disabled:opacity-50"
          >
            {currentStep === 0 ? (
              <>
                <Sparkles className="mr-1 h-4 w-4" />
                Analyze My Project
              </>
            ) : currentStep === 1 ? (
              <>
                Build Milestone Plan
                <ChevronRight className="ml-1 h-4 w-4" />
              </>
            ) : currentStep === 2 ? (
              <>
                Calculate Costs
                <ChevronRight className="ml-1 h-4 w-4" />
              </>
            ) : currentStep === 3 ? (
              <>
                Set Up Protection
                <ChevronRight className="ml-1 h-4 w-4" />
              </>
            ) : (
              <>
                Review Everything
                <ChevronRight className="ml-1 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      )}
    </div>
  );
}
