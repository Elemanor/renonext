'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  ArrowLeft,
  FileText,
  Home,
  Users,
  DollarSign,
  Calendar,
  FileCheck,
  Download,
  Printer,
  CheckCircle2,
  Plus,
  Trash2,
  AlertCircle,
} from 'lucide-react';
import {
  type ContractTemplate,
  type ContractFormData,
  type MilestoneSchedule,
  contractTemplates,
  generateMilestoneSchedule,
  calculateHoldback,
  calculateHST,
  generateContractSections,
  generateContractReferenceNumber,
} from '@/lib/data/contracts';

const TOTAL_STEPS = 7;

const stepIcons = [
  FileText,
  Home,
  Users,
  DollarSign,
  Calendar,
  FileCheck,
  CheckCircle2,
];

const stepTitles = [
  'Service Type',
  'Project Details',
  'Parties',
  'Pricing & Milestones',
  'Timeline',
  'Additional Terms',
  'Review & Generate',
];

const propertyTypes = [
  { value: 'detached', label: 'Detached House' },
  { value: 'semi', label: 'Semi-Detached' },
  { value: 'townhouse', label: 'Townhouse' },
  { value: 'condo', label: 'Condo' },
] as const;

const permitResponsibilityOptions = [
  { value: 'contractor', label: 'Contractor obtains all permits' },
  { value: 'homeowner', label: 'Homeowner obtains all permits' },
] as const;

export default function ContractsPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedTemplate, setSelectedTemplate] = useState<ContractTemplate | null>(null);
  const [referenceNumber] = useState(() => generateContractReferenceNumber());
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const [formData, setFormData] = useState<ContractFormData>({
    // Project details
    projectAddress: '',
    propertyType: 'detached',
    squareFeet: undefined,
    workDescription: '',

    // Parties
    homeowner: {
      fullName: '',
      address: '',
      phone: '',
      email: '',
    },
    contractor: {
      businessName: '',
      address: '',
      phone: '',
      email: '',
      wsibNumber: '',
      insurancePolicy: '',
    },

    // Pricing
    totalPrice: 0,
    milestones: [],

    // Timeline
    startDate: '',
    completionDate: '',

    // Additional terms
    warrantyTerms: '',
    changeOrderPolicy:
      'All changes to the agreed scope of work must be documented in writing, signed by both parties, with revised pricing and timeline adjustments before work proceeds.',
    disputeResolution:
      'Disputes shall first be addressed through written notice and good-faith negotiation. If unresolved within 30 days, parties agree to non-binding mediation. Either party may then pursue resolution through the Ontario Small Claims Court.',
    permitResponsibility: 'contractor',
    materialSubstitution:
      'No material substitutions shall be made without written homeowner approval. Contractor must provide comparable specifications and any price differential for approval before proceeding.',
  });

  // Auto-generate milestones when template or totalPrice changes
  useEffect(() => {
    if (selectedTemplate && formData.totalPrice > 0) {
      const generatedMilestones = generateMilestoneSchedule(
        formData.totalPrice,
        selectedTemplate
      );
      setFormData((prev) => ({ ...prev, milestones: generatedMilestones }));
    }
  }, [selectedTemplate, formData.totalPrice]);

  // Pre-fill warranty terms when template is selected
  useEffect(() => {
    if (selectedTemplate && !formData.warrantyTerms) {
      const warrantyText = selectedTemplate.warrantyDefaults
        .map((w) => `${w.item}: Labour ${w.labourYears === 999 ? 'Lifetime' : w.labourYears + ' years'}, Material ${w.materialYears === 999 ? 'Lifetime' : w.materialYears + ' years'}`)
        .join('\n\n');
      setFormData((prev) => ({ ...prev, warrantyTerms: warrantyText }));
    }
  }, [selectedTemplate]);

  const isStepValid = (step: number): boolean => {
    switch (step) {
      case 1:
        return selectedTemplate !== null;
      case 2:
        return formData.projectAddress.trim().length > 0;
      case 3:
        return (
          formData.homeowner.fullName.trim().length > 0 &&
          formData.contractor.businessName.trim().length > 0
        );
      case 4:
        return formData.totalPrice > 0;
      case 5:
        return formData.startDate.length > 0;
      case 6:
      case 7:
        return true;
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (currentStep < TOTAL_STEPS && isStepValid(currentStep)) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSelectTemplate = (template: ContractTemplate) => {
    setSelectedTemplate(template);
    setFormData((prev) => ({
      ...prev,
      milestones: [],
      warrantyTerms: template.warrantyDefaults
        .map((w) => `${w.item}: Labour ${w.labourYears === 999 ? 'Lifetime' : w.labourYears + ' years'}, Material ${w.materialYears === 999 ? 'Lifetime' : w.materialYears + ' years'}`)
        .join('\n\n'),
    }));
  };

  const updateFormData = <K extends keyof ContractFormData>(
    key: K,
    value: ContractFormData[K]
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const updateMilestone = (index: number, field: keyof MilestoneSchedule, value: any) => {
    const updatedMilestones = [...formData.milestones];
    updatedMilestones[index] = { ...updatedMilestones[index], [field]: value };

    // Recalculate percentage if amount changed
    if (field === 'amount' && formData.totalPrice > 0) {
      updatedMilestones[index].percentage = (value / formData.totalPrice) * 100;
    }

    updateFormData('milestones', updatedMilestones);
  };

  const addCustomMilestone = () => {
    const newMilestone: MilestoneSchedule = {
      name: 'Custom Milestone',
      percentage: 0,
      amount: 0,
      description: '',
    };
    updateFormData('milestones', [...formData.milestones, newMilestone]);
  };

  const removeMilestone = (index: number) => {
    const updatedMilestones = formData.milestones.filter((_, i) => i !== index);
    updateFormData('milestones', updatedMilestones);
  };

  const handleStartOver = () => {
    setCurrentStep(1);
    setSelectedTemplate(null);
    setFormData({
      projectAddress: '',
      propertyType: 'detached',
      squareFeet: undefined,
      workDescription: '',
      homeowner: {
        fullName: '',
        address: '',
        phone: '',
        email: '',
      },
      contractor: {
        businessName: '',
        address: '',
        phone: '',
        email: '',
        wsibNumber: '',
        insurancePolicy: '',
      },
      totalPrice: 0,
      milestones: [],
      startDate: '',
      completionDate: '',
      warrantyTerms: '',
      changeOrderPolicy:
        'All changes to the agreed scope of work must be documented in writing, signed by both parties, with revised pricing and timeline adjustments before work proceeds.',
      disputeResolution:
        'Disputes shall first be addressed through written notice and good-faith negotiation. If unresolved within 30 days, parties agree to non-binding mediation. Either party may then pursue resolution through the Ontario Small Claims Court.',
      permitResponsibility: 'contractor',
      materialSubstitution:
        'No material substitutions shall be made without written homeowner approval. Contractor must provide comparable specifications and any price differential for approval before proceeding.',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDownloadPDF = async () => {
    if (!selectedTemplate) return;

    setIsGeneratingPdf(true);
    try {
      const { pdf } = await import('@react-pdf/renderer');
      const { ContractPDF } = await import('@/components/contracts/contract-pdf');
      const sections = generateContractSections(formData, selectedTemplate);
      const holdback = calculateHoldback(formData.totalPrice);
      const hstInfo = calculateHST(formData.totalPrice);

      const blob = await pdf(
        <ContractPDF
          formData={formData}
          sections={sections}
          referenceNumber={referenceNumber}
          holdback={holdback}
          hstInfo={hstInfo}
          template={selectedTemplate}
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `RenoNext-Contract-${referenceNumber}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('PDF generation failed:', err);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-reno-cream py-8 px-4 sm:py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="font-display text-4xl font-bold text-reno-dark sm:text-5xl">
            Contract Generator
          </h1>
          <p className="mt-3 text-lg text-reno-dark/70">
            Create a legally compliant renovation contract in minutes
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            {Array.from({ length: TOTAL_STEPS }, (_, i) => {
              const stepNum = i + 1;
              const StepIcon = stepIcons[i];
              const isComplete = stepNum < currentStep;
              const isCurrent = stepNum === currentStep;

              return (
                <div key={stepNum} className="flex flex-1 items-center">
                  <div className="relative flex flex-col items-center">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full border-2 transition-all ${
                        isComplete
                          ? 'border-reno-green bg-reno-green text-white'
                          : isCurrent
                          ? 'border-reno-green bg-white text-reno-green'
                          : 'border-slate-300 bg-white text-slate-400'
                      }`}
                    >
                      {isComplete ? (
                        <CheckCircle2 className="h-5 w-5" />
                      ) : (
                        <StepIcon className="h-5 w-5" />
                      )}
                    </div>
                    <span
                      className={`mt-2 hidden text-xs font-medium sm:block ${
                        isCurrent ? 'text-reno-green' : 'text-slate-500'
                      }`}
                    >
                      {stepTitles[i]}
                    </span>
                  </div>
                  {stepNum < TOTAL_STEPS && (
                    <div
                      className={`mx-2 h-0.5 flex-1 ${
                        isComplete ? 'bg-reno-green' : 'bg-slate-300'
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div className="mt-4 text-center sm:hidden">
            <span className="text-sm font-medium text-reno-green">
              Step {currentStep} of {TOTAL_STEPS}: {stepTitles[currentStep - 1]}
            </span>
          </div>
        </div>

        {/* Main Card */}
        <div className="overflow-hidden rounded-2xl border border-reno-green/10 bg-white shadow-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="p-6 sm:p-8"
            >
              {/* Step 1: Service Type */}
              {currentStep === 1 && (
                <div>
                  <h2 className="font-display mb-6 text-2xl font-bold text-reno-dark">
                    What type of project is this contract for?
                  </h2>
                  <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {contractTemplates.map((template) => (
                      <button
                        key={template.serviceSlug}
                        onClick={() => handleSelectTemplate(template)}
                        className={`group rounded-xl border-2 p-4 text-left transition-all hover:shadow-md ${
                          selectedTemplate?.serviceSlug === template.serviceSlug
                            ? 'border-reno-green bg-reno-green/5'
                            : 'border-slate-200 hover:border-reno-green/50'
                        }`}
                      >
                        <h3 className="font-display mb-2 text-lg font-semibold text-reno-dark">
                          {template.serviceName}
                        </h3>
                        <span
                          className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
                            selectedTemplate?.serviceSlug === template.serviceSlug
                              ? 'bg-reno-green text-white'
                              : 'bg-slate-100 text-slate-600 group-hover:bg-reno-green/10 group-hover:text-reno-green'
                          }`}
                        >
                          {template.category}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Step 2: Project Details */}
              {currentStep === 2 && (
                <div>
                  <h2 className="font-display mb-6 text-2xl font-bold text-reno-dark">
                    Tell us about the project
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-reno-dark">
                        Project Address *
                      </label>
                      <input
                        type="text"
                        value={formData.projectAddress}
                        onChange={(e) => updateFormData('projectAddress', e.target.value)}
                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-reno-green focus:outline-none focus:ring-2 focus:ring-reno-green/20"
                        placeholder="123 Main Street, Toronto, ON M1A 1A1"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-reno-dark">
                        Property Type
                      </label>
                      <div className="grid gap-3 sm:grid-cols-4">
                        {propertyTypes.map((type) => (
                          <button
                            key={type.value}
                            onClick={() => updateFormData('propertyType', type.value)}
                            className={`rounded-lg border-2 px-4 py-2.5 text-sm font-medium transition-all ${
                              formData.propertyType === type.value
                                ? 'border-reno-green bg-reno-green text-white'
                                : 'border-slate-200 bg-white text-slate-700 hover:border-reno-green/50'
                            }`}
                          >
                            {type.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-reno-dark">
                        Approximate Square Feet
                      </label>
                      <input
                        type="number"
                        value={formData.squareFeet || ''}
                        onChange={(e) =>
                          updateFormData(
                            'squareFeet',
                            e.target.value ? parseInt(e.target.value) : undefined
                          )
                        }
                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-reno-green focus:outline-none focus:ring-2 focus:ring-reno-green/20"
                        placeholder="2000"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-reno-dark">
                        Description of Work
                      </label>
                      <textarea
                        value={formData.workDescription}
                        onChange={(e) => updateFormData('workDescription', e.target.value)}
                        rows={3}
                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-reno-green focus:outline-none focus:ring-2 focus:ring-reno-green/20"
                        placeholder="Describe the scope of work to be performed..."
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Parties */}
              {currentStep === 3 && (
                <div>
                  <h2 className="font-display mb-6 text-2xl font-bold text-reno-dark">
                    Who's involved?
                  </h2>
                  <div className="grid gap-8 lg:grid-cols-2">
                    {/* Homeowner */}
                    <div className="space-y-4">
                      <h3 className="font-display text-lg font-semibold text-reno-dark">
                        Homeowner
                      </h3>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-reno-dark">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={formData.homeowner.fullName}
                          onChange={(e) =>
                            updateFormData('homeowner', {
                              ...formData.homeowner,
                              fullName: e.target.value,
                            })
                          }
                          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-reno-green focus:outline-none focus:ring-2 focus:ring-reno-green/20"
                          placeholder="John Smith"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-reno-dark">
                          Address
                        </label>
                        <input
                          type="text"
                          value={formData.homeowner.address}
                          onChange={(e) =>
                            updateFormData('homeowner', {
                              ...formData.homeowner,
                              address: e.target.value,
                            })
                          }
                          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-reno-green focus:outline-none focus:ring-2 focus:ring-reno-green/20"
                          placeholder="123 Main St, Toronto, ON"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-reno-dark">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={formData.homeowner.phone}
                          onChange={(e) =>
                            updateFormData('homeowner', {
                              ...formData.homeowner,
                              phone: e.target.value,
                            })
                          }
                          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-reno-green focus:outline-none focus:ring-2 focus:ring-reno-green/20"
                          placeholder="(416) 555-0100"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-reno-dark">
                          Email
                        </label>
                        <input
                          type="email"
                          value={formData.homeowner.email}
                          onChange={(e) =>
                            updateFormData('homeowner', {
                              ...formData.homeowner,
                              email: e.target.value,
                            })
                          }
                          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-reno-green focus:outline-none focus:ring-2 focus:ring-reno-green/20"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    {/* Contractor */}
                    <div className="space-y-4">
                      <h3 className="font-display text-lg font-semibold text-reno-dark">
                        Contractor
                      </h3>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-reno-dark">
                          Business Name *
                        </label>
                        <input
                          type="text"
                          value={formData.contractor.businessName}
                          onChange={(e) =>
                            updateFormData('contractor', {
                              ...formData.contractor,
                              businessName: e.target.value,
                            })
                          }
                          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-reno-green focus:outline-none focus:ring-2 focus:ring-reno-green/20"
                          placeholder="ABC Construction Inc."
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-reno-dark">
                          Address
                        </label>
                        <input
                          type="text"
                          value={formData.contractor.address}
                          onChange={(e) =>
                            updateFormData('contractor', {
                              ...formData.contractor,
                              address: e.target.value,
                            })
                          }
                          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-reno-green focus:outline-none focus:ring-2 focus:ring-reno-green/20"
                          placeholder="456 Business Blvd, Toronto, ON"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-reno-dark">
                          Phone
                        </label>
                        <input
                          type="tel"
                          value={formData.contractor.phone}
                          onChange={(e) =>
                            updateFormData('contractor', {
                              ...formData.contractor,
                              phone: e.target.value,
                            })
                          }
                          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-reno-green focus:outline-none focus:ring-2 focus:ring-reno-green/20"
                          placeholder="(416) 555-0200"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-reno-dark">
                          Email
                        </label>
                        <input
                          type="email"
                          value={formData.contractor.email}
                          onChange={(e) =>
                            updateFormData('contractor', {
                              ...formData.contractor,
                              email: e.target.value,
                            })
                          }
                          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-reno-green focus:outline-none focus:ring-2 focus:ring-reno-green/20"
                          placeholder="info@abcconstruction.com"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-reno-dark">
                          WSIB Number
                        </label>
                        <input
                          type="text"
                          value={formData.contractor.wsibNumber}
                          onChange={(e) =>
                            updateFormData('contractor', {
                              ...formData.contractor,
                              wsibNumber: e.target.value,
                            })
                          }
                          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-reno-green focus:outline-none focus:ring-2 focus:ring-reno-green/20"
                          placeholder="12345678"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-reno-dark">
                          Insurance Policy Number
                        </label>
                        <input
                          type="text"
                          value={formData.contractor.insurancePolicy}
                          onChange={(e) =>
                            updateFormData('contractor', {
                              ...formData.contractor,
                              insurancePolicy: e.target.value,
                            })
                          }
                          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-reno-green focus:outline-none focus:ring-2 focus:ring-reno-green/20"
                          placeholder="POL-2026-123456"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Pricing & Milestones */}
              {currentStep === 4 && (
                <div>
                  <h2 className="font-display mb-6 text-2xl font-bold text-reno-dark">
                    Payment schedule
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-reno-dark">
                        Total Contract Price *
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl text-slate-500">
                          $
                        </span>
                        <input
                          type="number"
                          value={formData.totalPrice || ''}
                          onChange={(e) =>
                            updateFormData(
                              'totalPrice',
                              e.target.value ? parseFloat(e.target.value) : 0
                            )
                          }
                          className="w-full rounded-lg border border-slate-300 py-3 pl-8 pr-4 text-xl font-semibold focus:border-reno-green focus:outline-none focus:ring-2 focus:ring-reno-green/20"
                          placeholder="50000"
                        />
                      </div>
                    </div>

                    {formData.totalPrice > 0 && formData.milestones.length > 0 && (
                      <div>
                        <div className="mb-4 flex items-center justify-between">
                          <h3 className="font-display text-lg font-semibold text-reno-dark">
                            Payment Milestones
                          </h3>
                          <button
                            onClick={addCustomMilestone}
                            className="flex items-center gap-2 rounded-lg bg-reno-green/10 px-3 py-1.5 text-sm font-medium text-reno-green hover:bg-reno-green/20"
                          >
                            <Plus className="h-4 w-4" />
                            Add Milestone
                          </button>
                        </div>

                        <div className="overflow-hidden rounded-lg border border-slate-200">
                          <table className="w-full">
                            <thead className="bg-slate-50">
                              <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-600">
                                  Milestone
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-600">
                                  %
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium uppercase text-slate-600">
                                  Amount
                                </th>
                                <th className="w-10 px-4 py-3"></th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-200 bg-white">
                              {formData.milestones.map((milestone, index) => (
                                <tr key={index}>
                                  <td className="px-4 py-3">
                                    <input
                                      type="text"
                                      value={milestone.name}
                                      onChange={(e) =>
                                        updateMilestone(index, 'name', e.target.value)
                                      }
                                      className="w-full rounded border border-slate-300 px-2 py-1 text-sm focus:border-reno-green focus:outline-none"
                                    />
                                  </td>
                                  <td className="px-4 py-3">
                                    <span className="text-sm font-medium text-slate-700">
                                      {milestone.percentage.toFixed(1)}%
                                    </span>
                                  </td>
                                  <td className="px-4 py-3">
                                    <div className="relative">
                                      <span className="absolute left-2 top-1/2 -translate-y-1/2 text-sm text-slate-500">
                                        $
                                      </span>
                                      <input
                                        type="number"
                                        value={milestone.amount}
                                        onChange={(e) =>
                                          updateMilestone(
                                            index,
                                            'amount',
                                            parseFloat(e.target.value) || 0
                                          )
                                        }
                                        className="w-full rounded border border-slate-300 py-1 pl-5 pr-2 text-sm focus:border-reno-green focus:outline-none"
                                      />
                                    </div>
                                  </td>
                                  <td className="px-4 py-3">
                                    {formData.milestones.length > 1 && (
                                      <button
                                        onClick={() => removeMilestone(index)}
                                        className="text-red-500 hover:text-red-700"
                                      >
                                        <Trash2 className="h-4 w-4" />
                                      </button>
                                    )}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        <div className="mt-4 space-y-2 rounded-lg bg-slate-50 p-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600">Subtotal</span>
                            <span className="font-medium text-slate-900">
                              ${formData.totalPrice.toLocaleString('en-CA', { minimumFractionDigits: 2 })}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600">10% Holdback</span>
                            <span className="font-medium text-slate-900">
                              ${calculateHoldback(formData.totalPrice).holdbackAmount.toLocaleString('en-CA', { minimumFractionDigits: 2 })}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600">HST (13%)</span>
                            <span className="font-medium text-slate-900">
                              ${calculateHST(formData.totalPrice).hst.toLocaleString('en-CA', { minimumFractionDigits: 2 })}
                            </span>
                          </div>
                          <div className="border-t border-slate-300 pt-2">
                            <div className="flex justify-between">
                              <span className="font-semibold text-slate-900">
                                Grand Total (with HST)
                              </span>
                              <span className="text-lg font-bold text-reno-green">
                                ${calculateHST(formData.totalPrice).total.toLocaleString('en-CA', { minimumFractionDigits: 2 })}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Step 5: Timeline */}
              {currentStep === 5 && (
                <div>
                  <h2 className="font-display mb-6 text-2xl font-bold text-reno-dark">
                    Project timeline
                  </h2>
                  <div className="space-y-6">
                    <div className="grid gap-6 sm:grid-cols-2">
                      <div>
                        <label className="mb-2 block text-sm font-medium text-reno-dark">
                          Start Date *
                        </label>
                        <input
                          type="date"
                          value={formData.startDate}
                          onChange={(e) => updateFormData('startDate', e.target.value)}
                          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-reno-green focus:outline-none focus:ring-2 focus:ring-reno-green/20"
                        />
                      </div>
                      <div>
                        <label className="mb-2 block text-sm font-medium text-reno-dark">
                          Estimated Completion Date
                        </label>
                        <input
                          type="date"
                          value={formData.completionDate}
                          onChange={(e) => updateFormData('completionDate', e.target.value)}
                          className="w-full rounded-lg border border-slate-300 px-4 py-2.5 focus:border-reno-green focus:outline-none focus:ring-2 focus:ring-reno-green/20"
                        />
                      </div>
                    </div>

                    <div className="flex gap-3 rounded-lg border border-primary-200 bg-primary-50 p-4">
                      <AlertCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-primary-600" />
                      <div className="text-sm text-primary-900">
                        <p className="font-medium">Timeline Disclaimer</p>
                        <p className="mt-1 text-primary-800">
                          Delays caused by weather, permit processing, or unforeseen conditions
                          are typically excluded from timeline guarantees.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 6: Additional Terms */}
              {currentStep === 6 && (
                <div>
                  <h2 className="font-display mb-6 text-2xl font-bold text-reno-dark">
                    Terms & conditions
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label className="mb-2 block text-sm font-medium text-reno-dark">
                        Warranty Terms
                      </label>
                      <textarea
                        value={formData.warrantyTerms}
                        onChange={(e) => updateFormData('warrantyTerms', e.target.value)}
                        rows={4}
                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 font-mono text-sm focus:border-reno-green focus:outline-none focus:ring-2 focus:ring-reno-green/20"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-reno-dark">
                        Change Order Policy
                      </label>
                      <textarea
                        value={formData.changeOrderPolicy}
                        onChange={(e) => updateFormData('changeOrderPolicy', e.target.value)}
                        rows={3}
                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-reno-green focus:outline-none focus:ring-2 focus:ring-reno-green/20"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-reno-dark">
                        Dispute Resolution
                      </label>
                      <textarea
                        value={formData.disputeResolution}
                        onChange={(e) => updateFormData('disputeResolution', e.target.value)}
                        rows={3}
                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-reno-green focus:outline-none focus:ring-2 focus:ring-reno-green/20"
                      />
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-reno-dark">
                        Permit Responsibility
                      </label>
                      <div className="space-y-2">
                        {permitResponsibilityOptions.map((option) => (
                          <label
                            key={option.value}
                            className="flex cursor-pointer items-center gap-3 rounded-lg border-2 border-slate-200 p-3 hover:border-reno-green/50"
                          >
                            <input
                              type="radio"
                              name="permitResponsibility"
                              value={option.value}
                              checked={formData.permitResponsibility === option.value}
                              onChange={(e) =>
                                updateFormData('permitResponsibility', e.target.value as any)
                              }
                              className="h-4 w-4 text-reno-green focus:ring-reno-green"
                            />
                            <span className="text-sm font-medium text-slate-700">
                              {option.label}
                            </span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-medium text-reno-dark">
                        Material Substitution Policy
                      </label>
                      <textarea
                        value={formData.materialSubstitution}
                        onChange={(e) =>
                          updateFormData('materialSubstitution', e.target.value)
                        }
                        rows={3}
                        className="w-full rounded-lg border border-slate-300 px-4 py-2.5 text-sm focus:border-reno-green focus:outline-none focus:ring-2 focus:ring-reno-green/20"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 7: Review & Generate */}
              {currentStep === 7 && selectedTemplate && (
                <div>
                  <h2 className="font-display mb-6 text-2xl font-bold text-reno-dark">
                    Review your contract
                  </h2>

                  {/* CPA Compliance Checklist */}
                  <div className="mb-6 rounded-lg border border-reno-green-200 bg-reno-green-50 p-4">
                    <h3 className="mb-3 font-semibold text-reno-green-900">
                      Consumer Protection Act Compliance
                    </h3>
                    <div className="grid gap-2 sm:grid-cols-2">
                      <div className="flex items-center gap-2 text-sm text-reno-green-800">
                        <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-reno-green-600" />
                        Written contract provided
                      </div>
                      <div className="flex items-center gap-2 text-sm text-reno-green-800">
                        <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-reno-green-600" />
                        Clear scope of work defined
                      </div>
                      <div className="flex items-center gap-2 text-sm text-reno-green-800">
                        <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-reno-green-600" />
                        Total price disclosed
                      </div>
                      <div className="flex items-center gap-2 text-sm text-reno-green-800">
                        <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-reno-green-600" />
                        Payment schedule specified
                      </div>
                      <div className="flex items-center gap-2 text-sm text-reno-green-800">
                        <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-reno-green-600" />
                        Timeline included
                      </div>
                      <div className="flex items-center gap-2 text-sm text-reno-green-800">
                        <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-reno-green-600" />
                        Warranty terms stated
                      </div>
                      <div className="flex items-center gap-2 text-sm text-reno-green-800">
                        <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-reno-green-600" />
                        Change order process
                      </div>
                      <div className="flex items-center gap-2 text-sm text-reno-green-800">
                        <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-reno-green-600" />
                        Dispute resolution mechanism
                      </div>
                      <div className="flex items-center gap-2 text-sm text-reno-green-800">
                        <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-reno-green-600" />
                        Insurance & WSIB verified
                      </div>
                      <div className="flex items-center gap-2 text-sm text-reno-green-800">
                        <CheckCircle2 className="h-4 w-4 flex-shrink-0 text-reno-green-600" />
                        10% holdback applied
                      </div>
                    </div>
                  </div>

                  {/* Contract Preview */}
                  <div className="mb-6 max-h-[600px] overflow-y-auto rounded-lg border border-slate-300 bg-white p-6">
                    <div className="mb-6 border-b border-slate-200 pb-4">
                      <h2 className="font-display mb-2 text-2xl font-bold text-reno-dark">
                        RENOVATION CONTRACT
                      </h2>
                      <p className="text-sm text-slate-600">
                        Reference: {referenceNumber}
                      </p>
                    </div>

                    {generateContractSections(formData, selectedTemplate).map((section, idx) => (
                      <div key={idx} className="mb-6">
                        <h2 className="font-display mb-3 text-lg font-bold text-reno-dark">
                          {section.title}
                        </h2>
                        <div className="whitespace-pre-wrap text-sm text-slate-700">
                          {section.content}
                        </div>
                      </div>
                    ))}

                    {/* Signatures Section */}
                    <div className="mt-8 border-t border-slate-300 pt-6">
                      <h2 className="font-display mb-4 text-lg font-bold text-reno-dark">
                        SIGNATURES
                      </h2>
                      <div className="grid gap-8 sm:grid-cols-2">
                        <div>
                          <p className="mb-1 text-sm font-medium text-slate-700">
                            Homeowner: {formData.homeowner.fullName}
                          </p>
                          <div className="mt-8 border-t border-slate-400 pt-1">
                            <p className="text-xs text-slate-500">Signature & Date</p>
                          </div>
                        </div>
                        <div>
                          <p className="mb-1 text-sm font-medium text-slate-700">
                            Contractor: {formData.contractor.businessName}
                          </p>
                          <div className="mt-8 border-t border-slate-400 pt-1">
                            <p className="text-xs text-slate-500">Signature & Date</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={handleDownloadPDF}
                      disabled={isGeneratingPdf}
                      className="flex items-center gap-2 rounded-lg bg-reno-green px-6 py-3 font-medium text-white shadow-md transition-all hover:bg-reno-green/90 disabled:bg-slate-400"
                    >
                      {isGeneratingPdf ? (
                        <>
                          <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                          Generating PDF...
                        </>
                      ) : (
                        <>
                          <Download className="h-5 w-5" />
                          Download PDF
                        </>
                      )}
                    </button>
                    <button
                      onClick={handlePrint}
                      className="flex items-center gap-2 rounded-lg border-2 border-reno-green bg-white px-6 py-3 font-medium text-reno-green transition-all hover:bg-reno-green/5"
                    >
                      <Printer className="h-5 w-5" />
                      Print Contract
                    </button>
                    <button
                      onClick={handleStartOver}
                      className="ml-auto text-sm font-medium text-slate-600 underline hover:text-reno-green"
                    >
                      Start Over
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          {currentStep < 7 && (
            <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-6 py-4 sm:px-8">
              <button
                onClick={handleBack}
                disabled={currentStep === 1}
                className="flex items-center gap-2 rounded-lg px-4 py-2 font-medium text-slate-700 transition-all hover:bg-slate-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="h-5 w-5" />
                Back
              </button>
              <button
                onClick={handleNext}
                disabled={!isStepValid(currentStep)}
                className="flex items-center gap-2 rounded-lg bg-reno-green px-6 py-2.5 font-medium text-white shadow-md transition-all hover:bg-reno-green/90 disabled:bg-slate-400 disabled:cursor-not-allowed"
              >
                Next
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
