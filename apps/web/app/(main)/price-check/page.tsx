'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, Upload, X, Download, CheckCircle2 } from 'lucide-react';
import { motion } from 'framer-motion';

type ProjectType = 'Bathroom' | 'Basement' | 'Kitchen' | 'Addition' | 'Other';
type Scope = 'Cosmetic Refresh' | 'Gut + Rebuild' | 'Structural Change';
type Timeline = 'ASAP' | '1-3 months' | '3-6 months' | 'Flexible';
type BudgetRange = 'Under $30K' | '$30K–$60K' | '$60K–$100K' | '$100K–$200K' | '$200K+' | 'Not sure';

interface FormData {
  projectType: ProjectType | null;
  size: string;
  scope: Scope | null;
  location: string;
  timeline: Timeline | null;
  budgetRange: BudgetRange | null;
  photos: File[];
  email: string;
}

interface ResultData {
  rangeMin: number;
  rangeMax: number;
  transactions: number;
  milestones: Array<{ name: string; cost: number }>;
  timelineWeeks: string;
  phases: Array<{ name: string; weeks: number }>;
}

export default function PriceCheckPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showResult, setShowResult] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    projectType: null,
    size: '',
    scope: null,
    location: '',
    timeline: null,
    budgetRange: null,
    photos: [],
    email: '',
  });
  const [contextualHint, setContextualHint] = useState<string>('');
  const [resultData, setResultData] = useState<ResultData | null>(null);

  const totalSteps = 8;

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Generate realistic result data based on project type
    const baseRanges: Record<ProjectType, { min: number; max: number }> = {
      Bathroom: { min: 18000, max: 28000 },
      Basement: { min: 42000, max: 58000 },
      Kitchen: { min: 35000, max: 52000 },
      Addition: { min: 85000, max: 125000 },
      Other: { min: 25000, max: 45000 },
    };

    const scopeMultipliers: Record<Scope, number> = {
      'Cosmetic Refresh': 0.7,
      'Gut + Rebuild': 1.2,
      'Structural Change': 1.6,
    };

    const projectType = formData.projectType || 'Other';
    const scope = formData.scope || 'Gut + Rebuild';
    const multiplier = scopeMultipliers[scope];

    const rangeMin = Math.round(baseRanges[projectType].min * multiplier);
    const rangeMax = Math.round(baseRanges[projectType].max * multiplier);
    const transactions = 847;

    // Fixed realistic amounts for Basement (most common use case)
    const milestones =
      projectType === 'Basement'
        ? [
            { name: 'Demolition', cost: 3200 },
            { name: 'Structural', cost: 8500 },
            { name: 'MEP (Mechanical, Electrical, Plumbing)', cost: 12400 },
            { name: 'Insulation + Drywall', cost: 7800 },
            { name: 'Finishing', cost: 13100 },
            { name: 'Contingency (10%)', cost: 4500 },
          ]
        : projectType === 'Bathroom'
        ? [
            { name: 'Demolition', cost: Math.round(rangeMin * 0.15) },
            { name: 'Plumbing & Electrical', cost: Math.round(rangeMin * 0.25) },
            { name: 'Tile & Fixtures', cost: Math.round(rangeMin * 0.3) },
            { name: 'Finishes', cost: Math.round(rangeMin * 0.2) },
            { name: 'Contingency (10%)', cost: Math.round(rangeMin * 0.1) },
          ]
        : projectType === 'Kitchen'
        ? [
            { name: 'Demolition', cost: Math.round(rangeMin * 0.12) },
            { name: 'Plumbing & Electrical', cost: Math.round(rangeMin * 0.18) },
            { name: 'Cabinetry & Counters', cost: Math.round(rangeMin * 0.35) },
            { name: 'Appliances & Fixtures', cost: Math.round(rangeMin * 0.2) },
            { name: 'Contingency (10%)', cost: Math.round(rangeMin * 0.15) },
          ]
        : [
            { name: 'Foundation', cost: Math.round(rangeMin * 0.25) },
            { name: 'Framing', cost: Math.round(rangeMin * 0.2) },
            { name: 'MEP', cost: Math.round(rangeMin * 0.18) },
            { name: 'Finishes', cost: Math.round(rangeMin * 0.22) },
            { name: 'Contingency (10%)', cost: Math.round(rangeMin * 0.15) },
          ];

    const phases =
      projectType === 'Basement'
        ? [
            { name: 'Demo', weeks: 1 },
            { name: 'Structural', weeks: 2 },
            { name: 'MEP', weeks: 2 },
            { name: 'Drywall', weeks: 1.5 },
            { name: 'Finishing', weeks: 3 },
          ]
        : projectType === 'Bathroom'
        ? [
            { name: 'Demo', weeks: 0.5 },
            { name: 'Rough-in', weeks: 1 },
            { name: 'Tile', weeks: 1.5 },
            { name: 'Finishing', weeks: 1 },
          ]
        : projectType === 'Kitchen'
        ? [
            { name: 'Demo', weeks: 1 },
            { name: 'Rough-in', weeks: 1.5 },
            { name: 'Cabinets', weeks: 2 },
            { name: 'Finishing', weeks: 1.5 },
          ]
        : [
            { name: 'Foundation', weeks: 3 },
            { name: 'Framing', weeks: 4 },
            { name: 'MEP', weeks: 3 },
            { name: 'Finishes', weeks: 6 },
          ];

    const totalWeeks = phases.reduce((sum, phase) => sum + phase.weeks, 0);
    const timelineWeeks = `${Math.floor(totalWeeks)}–${Math.ceil(totalWeeks + 2)} weeks`;

    setResultData({
      rangeMin,
      rangeMax,
      transactions,
      milestones,
      timelineWeeks,
      phases,
    });

    setIsSubmitting(false);
    setShowResult(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setFormData({ ...formData, photos: [...formData.photos, ...files] });
  };

  const removePhoto = (index: number) => {
    setFormData({
      ...formData,
      photos: formData.photos.filter((_, i) => i !== index),
    });
  };

  const handleDownloadPDF = () => {
    alert('PDF report will be sent to ' + formData.email);
  };

  const isStepComplete = () => {
    switch (currentStep) {
      case 1:
        return formData.projectType !== null;
      case 2:
        return formData.size.trim() !== '';
      case 3:
        return formData.scope !== null;
      case 4:
        return formData.location.trim() !== '';
      case 5:
        return formData.timeline !== null;
      case 6:
        return true; // Optional
      case 7:
        return true; // Optional
      case 8:
        return formData.email.trim() !== '' && formData.email.includes('@');
      default:
        return false;
    }
  };

  if (showResult && resultData) {
    const size = parseInt(formData.size) || 0;
    const projectTypeLabel = formData.projectType?.toLowerCase() || 'project';
    const scopeLabel = formData.scope?.toLowerCase() || 'renovation';
    const locationLabel = formData.location || 'GTA';

    return (
      <div className="min-h-screen bg-reno-cream py-12 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 bg-reno-green/10 rounded-full mb-6">
              <CheckCircle2 className="w-8 h-8 text-reno-green" />
            </div>
            <h1 className="font-display text-4xl md:text-5xl text-reno-dark mb-4">Your Fair Market Range</h1>
            <p className="text-reno-dark/70 text-lg">
              Based on {resultData.transactions.toLocaleString()} vault transactions · Updated monthly · Verified by P.QS
            </p>
          </motion.div>

          {/* Section A - The Range */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8 border border-reno-green/10"
          >
            <div className="text-center mb-8">
              <div className="font-display text-5xl md:text-6xl text-reno-green mb-3">
                ${resultData.rangeMin.toLocaleString()} – ${resultData.rangeMax.toLocaleString()}
              </div>
              <p className="text-reno-dark/70 text-lg mb-2">
                Fair market range for a {size}sf {projectTypeLabel} {scopeLabel} in {locationLabel}
              </p>
              <p className="text-reno-dark/50 text-sm">
                Based on {resultData.transactions} comparable vault transactions in your area
              </p>
            </div>

            {/* Range Bar Visualization */}
            <div className="mb-8">
              <div className="relative h-16 bg-reno-dark/5 rounded-lg overflow-hidden">
                {/* Budget segment */}
                <div className="absolute left-0 top-0 h-full w-[25%] flex items-center justify-center">
                  <span className="text-xs font-semibold text-reno-dark/40">Budget</span>
                </div>
                {/* Your Range segment (highlighted) */}
                <div
                  className="absolute top-0 h-full bg-reno-green/20 border-2 border-reno-green flex items-center justify-center"
                  style={{ left: '25%', width: '20%' }}
                >
                  <span className="text-xs font-semibold text-reno-green">Your Range</span>
                </div>
                {/* Premium segment */}
                <div className="absolute right-0 top-0 h-full w-[55%] flex items-center justify-center">
                  <span className="text-xs font-semibold text-reno-dark/40">Premium</span>
                </div>
              </div>
              <div className="flex justify-between mt-2 text-xs text-reno-dark/50">
                <span>${Math.round(resultData.rangeMin * 0.5).toLocaleString()}</span>
                <span>${Math.round(resultData.rangeMax * 2).toLocaleString()}</span>
              </div>
            </div>
          </motion.div>

          {/* Section B - Milestone Breakdown */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8 border border-reno-green/10"
          >
            <h3 className="font-display text-2xl text-reno-dark mb-2">Milestone Breakdown</h3>
            <p className="text-sm text-reno-dark/60 mb-6">
              This is how professional contractors budget. If a quote doesn't break down this way, ask why.
            </p>
            <div className="space-y-4">
              {resultData.milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.3 + (index * 0.1) }}
                  className="flex justify-between items-center py-3 border-b border-reno-dark/5"
                >
                  <span className="text-reno-dark/80">{milestone.name}</span>
                  <span className="font-semibold text-reno-dark">${milestone.cost.toLocaleString()}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Section C - Timeline Estimate (NEW) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-8 border border-reno-green/10"
          >
            <h3 className="font-display text-2xl text-reno-dark mb-2">Timeline Estimate</h3>
            <p className="text-lg text-reno-dark/70 mb-6">
              Typical duration: {resultData.timelineWeeks} for this scope
            </p>

            {/* Mini Gantt Chart */}
            <div className="space-y-3">
              {resultData.phases.map((phase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                  className="flex items-center gap-4"
                >
                  <div className="w-24 text-sm text-reno-dark/70 flex-shrink-0">{phase.name}</div>
                  <div className="flex-1 relative">
                    <div
                      className="h-8 bg-gradient-to-r from-reno-green to-reno-teal rounded flex items-center px-3"
                      style={{ width: `${(phase.weeks / 10) * 100}%` }}
                    >
                      <span className="text-xs font-semibold text-white">
                        {phase.weeks}w
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Section D - Three CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-reno-green/10"
          >
            <h3 className="font-display text-2xl text-reno-dark mb-6 text-center">Next Steps</h3>
            <div className="space-y-4">
              {/* Primary CTA */}
              <a
                href="/start-project"
                className="block w-full bg-reno-green hover:bg-reno-green/90 text-white font-semibold py-5 px-6 rounded-lg transition-all shadow-md hover:shadow-lg text-center text-lg"
              >
                Post this as a project — get 3 verified bids
              </a>
              {/* Upgrade CTA */}
              <a
                href="/contact"
                className="block w-full bg-white hover:bg-reno-amber-light border-2 border-reno-amber text-reno-amber font-semibold py-4 px-6 rounded-lg transition-colors text-center"
              >
                Get a certified QS review — $250
              </a>
              {/* Capture CTA */}
              <button
                onClick={handleDownloadPDF}
                className="w-full bg-transparent hover:bg-reno-dark/5 text-reno-dark border-2 border-reno-dark/10 hover:border-reno-dark/20 font-semibold py-4 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <Download className="w-5 h-5" />
                Download PDF report
              </button>
            </div>
          </motion.div>

          {/* Start Over */}
          <div className="text-center mt-8">
            <button
              onClick={() => {
                setShowResult(false);
                setCurrentStep(1);
                setFormData({
                  projectType: null,
                  size: '',
                  scope: null,
                  location: '',
                  timeline: null,
                  budgetRange: null,
                  photos: [],
                  email: '',
                });
                setContextualHint('');
              }}
              className="text-reno-green hover:text-reno-green-dark underline font-semibold"
            >
              Start a new price check
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-reno-cream py-12 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="font-display text-4xl md:text-5xl text-reno-dark mb-4">
            What should your renovation actually cost?
          </h1>
          <p className="text-reno-dark/70 text-lg mb-4">
            Not a quote. Not a guess. A fair market range based on real transaction data.
          </p>
          {/* Trust Strip */}
          <div className="inline-flex items-center gap-2 text-sm text-reno-dark/60 border border-reno-dark/10 rounded-full px-4 py-2 bg-white/50">
            <span>Based on 847 vault transactions</span>
            <span className="text-reno-dark/30">·</span>
            <span>Updated monthly</span>
            <span className="text-reno-dark/30">·</span>
            <span>Verified by P.QS</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-semibold text-reno-dark/70">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm font-semibold text-reno-green">
              {Math.round((currentStep / totalSteps) * 100)}% complete
            </span>
          </div>
          <div className="w-full bg-reno-dark/10 rounded-full h-3 shadow-inner">
            <div
              className="bg-gradient-to-r from-reno-green to-reno-teal h-3 rounded-full transition-all duration-500 shadow-sm"
              style={{ width: `${(currentStep / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 border border-reno-green/10">
          {/* Step 1: Project Type */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="font-display text-3xl text-reno-dark">What type of project is this?</h2>
              <div className="grid grid-cols-2 gap-4">
                {(['Bathroom', 'Basement', 'Kitchen', 'Addition', 'Other'] as ProjectType[]).map((type) => (
                  <button
                    key={type}
                    onClick={() => {
                      setFormData({ ...formData, projectType: type });
                      // Set contextual hint
                      if (type === 'Basement') {
                        setContextualHint('Basements in the GTA typically range from $35K–$85K depending on scope.');
                      } else if (type === 'Bathroom') {
                        setContextualHint('Bathroom renovations typically range from $15K–$45K depending on scope.');
                      } else if (type === 'Kitchen') {
                        setContextualHint('Kitchen renovations typically range from $30K–$75K depending on scope.');
                      } else {
                        setContextualHint('');
                      }
                    }}
                    className={`py-4 px-6 rounded-lg border-2 font-semibold transition-all ${
                      formData.projectType === type
                        ? 'border-reno-green bg-reno-green-light text-reno-green-dark'
                        : 'border-reno-dark/10 hover:border-reno-green/30 text-reno-dark/70 hover:text-reno-dark'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              {contextualHint && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-reno-green-light/30 border border-reno-green/20 rounded-lg p-4"
                >
                  <p className="text-sm text-reno-dark/70">{contextualHint}</p>
                </motion.div>
              )}
            </div>
          )}

          {/* Step 2: Size */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="font-display text-3xl text-reno-dark">Approximate size?</h2>
              <div>
                <div className="relative">
                  <input
                    type="number"
                    value={formData.size}
                    onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                    className="w-full py-4 px-6 pr-20 rounded-lg border-2 border-reno-dark/10 focus:border-reno-green focus:outline-none text-lg"
                    placeholder="e.g., 600"
                  />
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 text-reno-dark/50 font-semibold">
                    sqft
                  </span>
                </div>
                <div className="mt-3 bg-reno-cream/50 border border-reno-dark/10 rounded-lg p-4">
                  <p className="text-sm text-reno-dark/60 mb-2 font-semibold">Reference:</p>
                  <div className="flex flex-col gap-1 text-sm text-reno-dark/70">
                    <span>400sf ≈ 1-car garage</span>
                    <span>800sf ≈ typical basement</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Scope */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="font-display text-3xl text-reno-dark">What is the scope?</h2>
              <div className="grid grid-cols-1 gap-4">
                {(['Cosmetic Refresh', 'Gut + Rebuild', 'Structural Change'] as Scope[]).map((scope) => (
                  <button
                    key={scope}
                    onClick={() => setFormData({ ...formData, scope })}
                    className={`py-5 px-6 rounded-lg border-2 font-semibold text-left transition-all ${
                      formData.scope === scope
                        ? 'border-reno-green bg-reno-green-light text-reno-green-dark shadow-md'
                        : 'border-reno-dark/10 hover:border-reno-green/30 text-reno-dark/70 hover:text-reno-dark hover:shadow-sm'
                    }`}
                  >
                    <div className="font-bold text-xl">{scope}</div>
                    <div className="text-sm mt-1.5 opacity-70">
                      {scope === 'Cosmetic Refresh' && 'Paint, fixtures, flooring — no structural work'}
                      {scope === 'Gut + Rebuild' && 'Complete renovation with quality finishes'}
                      {scope === 'Structural Change' && 'Moving walls, major structural changes'}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Location */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="font-display text-3xl text-reno-dark">Where is the project located?</h2>
              <div>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full py-4 px-6 rounded-lg border-2 border-reno-dark/10 focus:border-reno-green focus:outline-none text-lg"
                  placeholder="e.g., Downtown Toronto, M5V 3A8"
                />
                <p className="text-sm text-reno-dark/50 mt-2">Enter neighbourhood or postal code (GTA)</p>
              </div>
            </div>
          )}

          {/* Step 5: Timeline */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <h2 className="font-display text-3xl text-reno-dark">When do you want to start?</h2>
              <div className="grid grid-cols-2 gap-4">
                {(['ASAP', '1-3 months', '3-6 months', 'Flexible'] as Timeline[]).map((timeline) => (
                  <button
                    key={timeline}
                    onClick={() => setFormData({ ...formData, timeline })}
                    className={`py-4 px-6 rounded-lg border-2 font-semibold transition-all ${
                      formData.timeline === timeline
                        ? 'border-reno-green bg-reno-green-light text-reno-green-dark'
                        : 'border-reno-dark/10 hover:border-reno-green/30 text-reno-dark/70 hover:text-reno-dark'
                    }`}
                  >
                    {timeline}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 6: Budget Range (Optional) */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <h2 className="font-display text-3xl text-reno-dark">Do you have a budget in mind?</h2>
              <p className="text-reno-dark/60">Optional – helps us refine the estimate</p>
              <div className="grid grid-cols-2 gap-4">
                {(['Under $30K', '$30K–$60K', '$60K–$100K', '$100K–$200K', '$200K+', 'Not sure'] as BudgetRange[]).map((budget) => (
                  <button
                    key={budget}
                    onClick={() => setFormData({ ...formData, budgetRange: budget })}
                    className={`py-4 px-6 rounded-lg border-2 font-semibold transition-all ${
                      formData.budgetRange === budget
                        ? 'border-reno-green bg-reno-green-light text-reno-green-dark'
                        : 'border-reno-dark/10 hover:border-reno-green/30 text-reno-dark/70 hover:text-reno-dark'
                    }`}
                  >
                    {budget}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 7: Photos (Optional) */}
          {currentStep === 7 && (
            <div className="space-y-6">
              <h2 className="font-display text-3xl text-reno-dark">Upload photos of the space</h2>
              <p className="text-reno-dark/60">Optional – helps us provide more accurate pricing</p>

              <div className="border-2 border-dashed border-reno-dark/20 rounded-lg p-8 text-center hover:border-reno-green/50 transition-colors">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="photo-upload"
                />
                <label htmlFor="photo-upload" className="cursor-pointer">
                  <Upload className="w-12 h-12 mx-auto mb-4 text-reno-dark/30" />
                  <p className="font-semibold text-reno-dark mb-1">Click to upload or drag and drop</p>
                  <p className="text-sm text-reno-dark/50">PNG, JPG up to 10MB each</p>
                </label>
              </div>

              {formData.photos.length > 0 && (
                <div className="grid grid-cols-3 gap-4">
                  {formData.photos.map((photo, index) => (
                    <div key={index} className="relative group">
                      <div className="aspect-square bg-reno-dark/5 rounded-lg flex items-center justify-center">
                        <span className="text-sm text-reno-dark/50">{photo.name}</span>
                      </div>
                      <button
                        onClick={() => removePhoto(index)}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 8: Email */}
          {currentStep === 8 && (
            <div className="space-y-6">
              <h2 className="font-display text-3xl text-reno-dark">Where should we send your report?</h2>
              <div>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full py-4 px-6 rounded-lg border-2 border-reno-dark/10 focus:border-reno-green focus:outline-none text-lg"
                  placeholder="your@email.com"
                />
                <p className="text-sm text-reno-dark/50 mt-2">
                  We'll send you a detailed PDF report with your price range and next steps
                </p>
              </div>
            </div>
          )}

          {/* Navigation */}
          <div className="flex gap-4 mt-10 pt-8 border-t border-reno-dark/10">
            {currentStep > 1 && (
              <button
                onClick={handleBack}
                className="flex items-center gap-2 px-6 py-3 rounded-lg border-2 border-reno-dark/10 hover:border-reno-dark/20 text-reno-dark transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back
              </button>
            )}
            <button
              onClick={handleNext}
              disabled={!isStepComplete() || isSubmitting}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-reno-green hover:bg-reno-green-dark text-white font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                'Calculating...'
              ) : currentStep === totalSteps ? (
                'Get My Price Range'
              ) : (
                <>
                  Next
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
            {(currentStep === 6 || currentStep === 7) && (
              <button
                onClick={handleNext}
                className="px-6 py-3 rounded-lg text-reno-dark/50 hover:text-reno-dark transition-colors"
              >
                Skip
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
