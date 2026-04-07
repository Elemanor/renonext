'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

// ---------------------------------------------------------------------------
// Types & Constants
// ---------------------------------------------------------------------------

const SERVICES = [
  {
    id: 'underpinning',
    label: 'Underpinning',
    icon: 'foundation',
    description: 'Basement lowering, structural reinforcement, and bench footing extensions.',
    featured: true,
    tag: 'High Demand',
  },
  {
    id: 'waterproofing',
    label: 'Waterproofing',
    icon: 'water_damage',
    description: 'Interior and exterior waterproofing, drainage, and sump systems.',
  },
  {
    id: 'foundation-repair',
    label: 'Foundation Repair',
    icon: 'home_repair_service',
    description: 'Crack injection, wall stabilization, and structural repairs.',
  },
  {
    id: 'concrete',
    label: 'Concrete & Masonry',
    icon: 'domain',
    description: 'Flatwork, retaining walls, and masonry restoration.',
  },
  {
    id: 'electrical',
    label: 'Electrical',
    icon: 'electrical_services',
    description: 'Wiring, panel upgrades, and lighting installations.',
  },
  {
    id: 'plumbing',
    label: 'Plumbing',
    icon: 'plumbing',
    description: 'Pipe repair, fixture installation, and drainage systems.',
  },
  {
    id: 'kitchen',
    label: 'Kitchen Renovation',
    icon: 'kitchen',
    description: 'Cabinets, countertops, appliances, and full kitchen remodels.',
  },
  {
    id: 'bathroom',
    label: 'Bathroom Remodel',
    icon: 'bathtub',
    description: 'Fixtures, tiling, plumbing, and complete bathroom overhauls.',
  },
  {
    id: 'basement-unit',
    label: 'Basement Second Unit',
    icon: 'apartment',
    description: 'Legal basement apartment conversions with permits and code compliance.',
  },
  {
    id: 'addition',
    label: 'Home Addition',
    icon: 'add_home',
    description: 'Room additions, bump-outs, and structural extensions.',
  },
  {
    id: 'painting',
    label: 'Painting',
    icon: 'format_paint',
    description: 'Interior and exterior painting and surface preparation.',
  },
  {
    id: 'demolition',
    label: 'Demolition',
    icon: 'demolish',
    description: 'Structural removal, concrete breaking, and site clearing.',
  },
  {
    id: 'roofing',
    label: 'Roofing',
    icon: 'roofing',
    description: 'Shingle replacement, flat roofing, and leak repairs.',
  },
  {
    id: 'hvac',
    label: 'HVAC',
    icon: 'heat_pump',
    description: 'Heating, cooling, and ventilation systems.',
  },
  {
    id: 'general',
    label: 'General Renovation',
    icon: 'construction',
    description: 'Multi-trade coordinated renovations and full remodels.',
  },
];

const CITIES = [
  'Toronto', 'Mississauga', 'Brampton', 'Vaughan', 'Markham',
  'Richmond Hill', 'Aurora', 'Oakville', 'Burlington', 'Milton',
  'Ajax', 'Pickering', 'Oshawa', 'Whitby', 'Hamilton',
];

const TIME_SLOTS = [
  { id: 'morning', label: 'Morning', sub: '8 AM — 12 PM', icon: 'wb_sunny' },
  { id: 'afternoon', label: 'Afternoon', sub: '12 PM — 4 PM', icon: 'light_mode' },
  { id: 'evening', label: 'Evening', sub: '4 PM — 8 PM', icon: 'nights_stay' },
];

const BUDGET_RANGES = [
  { id: 'under-10k', label: 'Under $10K' },
  { id: '10-25k', label: '$10K — $25K' },
  { id: '25-50k', label: '$25K — $50K' },
  { id: '50-100k', label: '$50K — $100K' },
  { id: '100k-plus', label: '$100K+' },
];

// ---------------------------------------------------------------------------
// Utility: simple calendar
// ---------------------------------------------------------------------------
function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrev = new Date(year, month, 0).getDate();
  const days: { day: number; current: boolean }[] = [];
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({ day: daysInPrev - i, current: false });
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ day: i, current: true });
  }
  return days;
}

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------
export default function StartProjectPage() {
  const [step, setStep] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');

  // Step 1 state
  const [selectedService, setSelectedService] = useState<string | null>(null);

  // Step 2 state
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [budget, setBudget] = useState('');

  // Step 3 state
  const [timing, setTiming] = useState<'asap' | 'scheduled' | null>(null);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [calMonth, setCalMonth] = useState(() => new Date().getMonth());
  const [calYear, setCalYear] = useState(() => new Date().getFullYear());

  // Step 4 state
  const [matchCount, setMatchCount] = useState(0);
  const [matchDone, setMatchDone] = useState(false);

  // Scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  // Step 4 matching simulation
  useEffect(() => {
    if (step !== 3) return;
    setMatchCount(0);
    setMatchDone(false);
    const interval = setInterval(() => {
      setMatchCount((c) => {
        if (c >= 5) {
          clearInterval(interval);
          setTimeout(() => setMatchDone(true), 800);
          return 5;
        }
        return c + 1;
      });
    }, 600);
    return () => clearInterval(interval);
  }, [step]);

  // Filtered services
  const filteredServices = searchQuery.trim()
    ? SERVICES.filter(
        (s) =>
          s.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.description.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : SERVICES;

  const featured = filteredServices.find((s) => s.featured);
  const regular = filteredServices.filter((s) => !s.featured);

  // Calendar
  const calDays = getCalendarDays(calYear, calMonth);
  const today = new Date();
  const isCurrentMonth = calYear === today.getFullYear() && calMonth === today.getMonth();

  // Validation
  const canProceed = () => {
    switch (step) {
      case 0:
        return selectedService !== null;
      case 1:
        return description.length > 5 && city.length > 0;
      case 2:
        return timing !== null && (timing === 'asap' || (selectedDay !== null && selectedSlot !== null));
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };
  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const selectedServiceData = SERVICES.find((s) => s.id === selectedService);

  // =========================================================================
  // STEP 4 — Matching Screen
  // =========================================================================
  if (step === 3) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-reno-dark to-[#0a1a1b] text-white flex flex-col -mt-[60px] pt-[60px]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto w-full">
          <button
            onClick={() => setStep(2)}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <span className="material-symbols-outlined text-white/70">arrow_back</span>
          </button>
          <span className="text-xs font-bold tracking-widest uppercase text-primary bg-primary/20 px-3 py-1 rounded-full">
            Step 4 of 4
          </span>
          <div className="w-10" />
        </div>

        {/* Radar */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 relative overflow-hidden">
          {/* Radar Rings */}
          <div className="relative w-full max-w-lg h-[340px] sm:h-[400px] flex items-center justify-center">
            {[200, 300, 420].map((size) => (
              <div
                key={size}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/20"
                style={{ width: size, height: size }}
              />
            ))}

            {/* Scanning sweep */}
            <div
              className="absolute top-1/2 left-1/2 w-[210px] h-[210px] rounded-full -translate-x-1/2 -translate-y-1/2 animate-spin"
              style={{
                animationDuration: '4s',
                background: 'conic-gradient(from 0deg, rgba(15,186,189,0.15) 0%, transparent 25%)',
              }}
            />

            {/* Core */}
            <div className="relative z-10 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-[0_0_60px_rgba(15,186,189,0.4)]">
              <span
                className="material-symbols-outlined text-primary text-4xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                architecture
              </span>
            </div>

            {/* Floating pro nodes */}
            {matchCount >= 1 && (
              <div className="absolute top-[12%] left-[22%] animate-pulse">
                <div className="w-12 h-12 rounded-full border-2 border-primary bg-reno-dark flex items-center justify-center shadow-[0_0_20px_rgba(15,186,189,0.3)]">
                  <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                </div>
              </div>
            )}
            {matchCount >= 2 && (
              <div className="absolute bottom-[18%] right-[25%]">
                <div className="w-14 h-14 rounded-full border-2 border-primary bg-reno-dark flex items-center justify-center shadow-[0_0_20px_rgba(15,186,189,0.4)]">
                  <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>engineering</span>
                </div>
              </div>
            )}
            {matchCount >= 3 && (
              <div className="absolute top-[38%] right-[10%] opacity-80">
                <div className="w-10 h-10 rounded-full border-2 border-white/30 bg-reno-dark flex items-center justify-center">
                  <span className="material-symbols-outlined text-white/60 text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>construction</span>
                </div>
              </div>
            )}
            {matchCount >= 4 && (
              <div className="absolute bottom-[8%] left-[35%]">
                <div className="w-16 h-16 rounded-full border-2 border-primary bg-reno-dark flex items-center justify-center shadow-[0_0_25px_rgba(15,186,189,0.5)]">
                  <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
                </div>
              </div>
            )}
            {matchCount >= 5 && (
              <div className="absolute top-[18%] right-[35%] opacity-70">
                <div className="w-11 h-11 rounded-full border-2 border-[#E8AA42] bg-reno-dark flex items-center justify-center">
                  <span className="material-symbols-outlined text-[#E8AA42] text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>star</span>
                </div>
              </div>
            )}
          </div>

          {/* Matching text */}
          <div className="text-center mt-6 mb-8 z-20">
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight mb-4">
              {matchDone ? (
                <>
                  <span className="text-primary">{matchCount} Pros</span> Ready
                </>
              ) : (
                <>
                  Matching with top-rated pros{' '}
                  <br className="hidden sm:block" />
                  in your area...
                </>
              )}
            </h2>
            <div className="flex items-center justify-center gap-2 text-primary font-medium">
              {matchDone ? (
                <span className="material-symbols-outlined text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              ) : (
                <div className="w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
              )}
              <p className="text-base sm:text-lg">
                {matchDone
                  ? 'Your project is live — expect bids within 48 hours'
                  : `Found ${matchCount} verified contractors near you...`}
              </p>
            </div>
          </div>

          {/* Project Summary Card */}
          <div className="w-full max-w-3xl mx-auto mb-12 z-20">
            <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
              <div className="flex items-center justify-between mb-4">
                <span className="text-white/50 text-xs font-bold tracking-widest uppercase">Project Summary</span>
                <button onClick={() => setStep(1)} className="text-primary text-xs font-bold hover:underline">Edit Details</button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white">{selectedServiceData?.icon || 'construction'}</span>
                  </div>
                  <div>
                    <p className="text-white/40 text-[10px] uppercase font-bold tracking-wider">Service</p>
                    <p className="text-white font-semibold text-sm">{selectedServiceData?.label || 'General'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white">location_on</span>
                  </div>
                  <div>
                    <p className="text-white/40 text-[10px] uppercase font-bold tracking-wider">Location</p>
                    <p className="text-white font-semibold text-sm">{city || 'GTA'}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                    <span className="material-symbols-outlined text-white">schedule</span>
                  </div>
                  <div>
                    <p className="text-white/40 text-[10px] uppercase font-bold tracking-wider">Timeline</p>
                    <p className="text-white font-semibold text-sm">{timing === 'asap' ? 'ASAP' : 'Scheduled'}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CTA when done */}
          {matchDone && (
            <div className="w-full max-w-md mx-auto mb-16 z-20 flex flex-col gap-3">
              <Link
                href="/dashboard"
                className="w-full py-4 bg-primary text-white font-bold rounded-xl text-center text-lg shadow-lg shadow-primary/30 hover:brightness-110 transition-all flex items-center justify-center gap-2"
              >
                Go to Dashboard
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
              <p className="text-center text-xs text-white/40">
                You won&apos;t be charged until work is completed and approved.
              </p>
            </div>
          )}

          {/* Background blurs */}
          <div className="fixed inset-0 pointer-events-none -z-10">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/10 blur-[120px] rounded-full" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-reno-dark/50 blur-[120px] rounded-full" />
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // WIZARD STEPS 0-2
  // =========================================================================
  return (
    <div className="min-h-screen pb-32">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 pt-6 sm:pt-10">
        {/* Progress */}
        <div className="mb-8 sm:mb-12">
          <div className="flex justify-between items-end mb-4">
            <div>
              <span className="text-slate-500 font-bold text-xs tracking-widest uppercase mb-2 block">
                Step {step + 1} of 4
              </span>
              <div className="flex items-center gap-2 mt-2">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === step
                        ? 'w-12 bg-reno-dark'
                        : i < step
                          ? 'w-8 bg-primary'
                          : 'w-8 bg-slate-200'
                    }`}
                  />
                ))}
              </div>
            </div>
            <div className="hidden sm:block text-right">
              <span className="text-xs font-semibold text-slate-400">Progress</span>
              <p className="text-sm font-bold text-reno-dark">{Math.round(((step + 1) / 4) * 100)}% Complete</p>
            </div>
          </div>
        </div>

        {/* ================================================================= */}
        {/* STEP 0 — Service Selection                                        */}
        {/* ================================================================= */}
        {step === 0 && (
          <div>
            <div className="mb-8 sm:mb-10">
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-reno-dark leading-tight tracking-tight">
                What do you need help with?
              </h1>
            </div>

            {/* Search */}
            <div className="relative mb-8 sm:mb-10 group">
              <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-slate-400">search</span>
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for a service (e.g. Waterproofing, Kitchen...)"
                className="w-full h-14 sm:h-16 bg-white border-none rounded-xl pl-14 pr-6 text-base sm:text-lg text-reno-dark placeholder:text-slate-400 focus:ring-2 focus:ring-primary shadow-[0_4px_20px_rgba(0,0,0,0.04)] transition-shadow group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.07)] outline-none"
              />
            </div>

            {/* Bento Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 mb-10">
              {/* Featured Card */}
              {featured && (
                <button
                  onClick={() => setSelectedService(featured.id)}
                  className={`sm:col-span-2 group relative overflow-hidden rounded-2xl text-left aspect-[16/9] sm:aspect-auto sm:min-h-[220px] flex flex-col justify-end p-6 sm:p-8 cursor-pointer transition-all duration-300 active:scale-[0.98] ${
                    selectedService === featured.id
                      ? 'ring-4 ring-primary ring-offset-2'
                      : ''
                  }`}
                >
                  <div className="absolute inset-0 bg-reno-dark" />
                  <div className="absolute inset-0 bg-gradient-to-t from-reno-dark via-reno-dark/60 to-reno-dark/30" />
                  <div className="relative z-10">
                    {featured.tag && (
                      <div className="bg-[#E8AA42] text-reno-dark px-3 py-1 rounded-full text-xs font-bold w-fit mb-3 uppercase tracking-wider">
                        {featured.tag}
                      </div>
                    )}
                    <div className="flex items-center gap-3 mb-2">
                      <span className="material-symbols-outlined text-3xl text-white">{featured.icon}</span>
                      <h3 className="text-xl sm:text-2xl font-bold text-white">{featured.label}</h3>
                    </div>
                    <p className="text-white/70 text-sm max-w-md">{featured.description}</p>
                    {selectedService === featured.id && (
                      <div className="absolute top-4 right-4 w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <span className="material-symbols-outlined text-white text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                      </div>
                    )}
                  </div>
                </button>
              )}

              {/* Regular cards */}
              {regular.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setSelectedService(service.id)}
                  className={`group bg-white rounded-2xl p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-all flex flex-col justify-between min-h-[160px] sm:min-h-[180px] cursor-pointer active:scale-[0.97] text-left relative ${
                    selectedService === service.id
                      ? 'ring-2 ring-primary ring-offset-1'
                      : ''
                  }`}
                >
                  <div className="h-12 w-12 bg-[#f6f8f8] rounded-xl flex items-center justify-center text-reno-dark group-hover:bg-primary group-hover:text-white transition-colors">
                    <span className="material-symbols-outlined text-2xl">{service.icon}</span>
                  </div>
                  <div className="mt-3">
                    <h3 className="text-base sm:text-lg font-bold text-reno-dark mb-1">{service.label}</h3>
                    <p className="text-slate-500 text-xs sm:text-sm leading-relaxed">{service.description}</p>
                  </div>
                  {selectedService === service.id && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-white text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                    </div>
                  )}
                </button>
              ))}
            </div>

            {/* Custom quote banner */}
            <div className="flex flex-col sm:flex-row items-center justify-between bg-[#f6f8f8] p-5 sm:p-6 rounded-2xl gap-4">
              <div>
                <p className="text-sm font-semibold text-reno-dark">Need something else?</p>
                <p className="text-xs text-slate-500">Request a custom quote for specialized work</p>
              </div>
              <button className="w-full sm:w-auto bg-reno-dark text-white px-6 sm:px-8 py-3 rounded-xl font-bold hover:bg-reno-dark/90 transition-all active:scale-95 shadow-lg shadow-reno-dark/10 text-sm">
                Custom Quote
              </button>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* STEP 1 — Project Details                                          */}
        {/* ================================================================= */}
        {step === 1 && (
          <div>
            <div className="mb-8 sm:mb-10">
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-reno-dark leading-tight tracking-tight mb-3">
                Project Details
              </h1>
              <p className="text-slate-500 text-base sm:text-lg">
                Provide specific details to help our pros give you an accurate estimate.
              </p>
            </div>

            <div className="space-y-8 sm:space-y-10 max-w-2xl">
              {/* Description */}
              <div>
                <label className="block font-display font-bold text-reno-dark tracking-tight mb-3">
                  Project Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  placeholder="What needs to be done? Include dimensions, material preferences, or any specific challenges..."
                  className="w-full bg-white border-none rounded-xl p-4 text-reno-dark placeholder:text-slate-400/60 focus:ring-2 focus:ring-primary shadow-[0_4px_20px_rgba(0,0,0,0.04)] resize-none outline-none text-base"
                />
              </div>

              {/* City */}
              <div>
                <label className="block font-display font-bold text-reno-dark tracking-tight mb-3">
                  City
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {CITIES.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCity(c)}
                      className={`px-3 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                        city === c
                          ? 'bg-primary text-white shadow-md'
                          : 'bg-white text-slate-600 hover:bg-[#f6f8f8] shadow-sm'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              {/* Address */}
              <div>
                <label className="block font-display font-bold text-reno-dark tracking-tight mb-3">
                  Project Address
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary/50">location_on</span>
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Enter the street address (optional)"
                    className="w-full bg-white border-none rounded-xl py-4 pl-12 pr-4 focus:ring-2 focus:ring-primary text-reno-dark shadow-[0_4px_20px_rgba(0,0,0,0.04)] placeholder:text-slate-400/60 outline-none"
                  />
                </div>
              </div>

              {/* Budget */}
              <div>
                <label className="block font-display font-bold text-reno-dark tracking-tight mb-3">
                  Estimated Budget
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {BUDGET_RANGES.map((b) => (
                    <button
                      key={b.id}
                      onClick={() => setBudget(b.id)}
                      className={`px-3 py-3 rounded-xl text-xs sm:text-sm font-semibold transition-all text-center ${
                        budget === b.id
                          ? 'bg-primary text-white shadow-md'
                          : 'bg-white text-slate-600 hover:bg-[#f6f8f8] shadow-sm'
                      }`}
                    >
                      {b.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Photo Upload placeholder */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="block font-display font-bold text-reno-dark tracking-tight">
                    Upload Photos
                  </label>
                  <span className="text-xs font-semibold text-slate-400 bg-[#f6f8f8] px-2.5 py-1 rounded-lg">Optional</span>
                </div>
                <button className="w-full flex flex-col items-center justify-center p-8 sm:p-10 border-2 border-dashed border-slate-200 rounded-2xl bg-[#f6f8f8] hover:bg-white hover:border-primary/30 transition-colors group">
                  <span className="material-symbols-outlined text-4xl text-primary/30 group-hover:text-primary mb-3 transition-colors">add_a_photo</span>
                  <p className="font-display font-bold text-sm text-reno-dark">Add Photos</p>
                  <p className="text-xs text-slate-400 mt-1">Up to 10MB each</p>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* STEP 2 — Scheduling                                               */}
        {/* ================================================================= */}
        {step === 2 && (
          <div>
            <div className="mb-8 sm:mb-12">
              <h1 className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold text-reno-dark leading-tight tracking-tight mb-3">
                When should we start?
              </h1>
              <p className="text-slate-500 text-base sm:text-lg">
                Select your preferred timing. Our pros are ready when you are.
              </p>
            </div>

            <div className="space-y-5 max-w-2xl">
              {/* ASAP Option */}
              <button
                onClick={() => setTiming('asap')}
                className={`w-full text-left p-5 sm:p-6 rounded-2xl bg-white border-2 transition-all shadow-[0_10px_30px_-15px_rgba(16,33,34,0.1)] ${
                  timing === 'asap'
                    ? 'border-primary'
                    : 'border-transparent hover:border-primary/20'
                }`}
              >
                <div className="flex items-start gap-4 sm:gap-5">
                  <div className={`p-3 rounded-xl transition-transform ${timing === 'asap' ? 'bg-primary text-white scale-110' : 'bg-[#E8AA42]/10 text-[#E8AA42]'}`}>
                    <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>bolt</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg sm:text-xl font-bold text-reno-dark font-display">ASAP (within 24 hours)</h3>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                        timing === 'asap' ? 'border-primary bg-primary' : 'border-slate-300'
                      }`}>
                        {timing === 'asap' && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                      </div>
                    </div>
                    <p className="text-slate-500 mt-1 text-sm">Best for emergency repairs or immediate needs.</p>
                  </div>
                </div>
              </button>

              {/* Scheduled Option */}
              <div className="space-y-4">
                <button
                  onClick={() => setTiming('scheduled')}
                  className={`w-full text-left p-5 sm:p-6 rounded-2xl bg-white border-2 transition-all shadow-[0_10px_30px_-15px_rgba(16,33,34,0.1)] ${
                    timing === 'scheduled'
                      ? 'border-primary'
                      : 'border-transparent hover:border-primary/20'
                  }`}
                >
                  <div className="flex items-start gap-4 sm:gap-5">
                    <div className={`p-3 rounded-xl transition-transform ${timing === 'scheduled' ? 'bg-primary text-white scale-110' : 'bg-primary/10 text-primary'}`}>
                      <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>calendar_today</span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg sm:text-xl font-bold text-reno-dark font-display">Scheduled</h3>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                          timing === 'scheduled' ? 'border-primary bg-primary' : 'border-slate-300'
                        }`}>
                          {timing === 'scheduled' && <div className="w-2.5 h-2.5 rounded-full bg-white" />}
                        </div>
                      </div>
                      <p className="text-slate-500 mt-1 text-sm">Choose a specific date and time window.</p>
                    </div>
                  </div>
                </button>

                {/* Date & Time Picker */}
                {timing === 'scheduled' && (
                  <div className="bg-[#f6f8f8] rounded-2xl p-5 sm:p-8 space-y-6 sm:space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
                      {/* Calendar */}
                      <div className="space-y-3">
                        <label className="text-xs font-bold uppercase tracking-widest text-reno-dark flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm">event</span>
                          Select Date
                        </label>
                        <div className="bg-white rounded-xl p-4 shadow-sm">
                          <div className="flex items-center justify-between mb-4">
                            <span className="font-bold text-sm text-reno-dark">
                              {MONTH_NAMES[calMonth]} {calYear}
                            </span>
                            <div className="flex gap-1">
                              <button
                                onClick={() => {
                                  if (calMonth === 0) { setCalMonth(11); setCalYear(calYear - 1); }
                                  else setCalMonth(calMonth - 1);
                                }}
                                className="p-1 rounded-lg hover:bg-[#f6f8f8]"
                              >
                                <span className="material-symbols-outlined text-sm">chevron_left</span>
                              </button>
                              <button
                                onClick={() => {
                                  if (calMonth === 11) { setCalMonth(0); setCalYear(calYear + 1); }
                                  else setCalMonth(calMonth + 1);
                                }}
                                className="p-1 rounded-lg hover:bg-[#f6f8f8]"
                              >
                                <span className="material-symbols-outlined text-sm">chevron_right</span>
                              </button>
                            </div>
                          </div>
                          <div className="grid grid-cols-7 gap-1 text-center mb-2">
                            {['S','M','T','W','T','F','S'].map((d, i) => (
                              <span key={i} className="text-[10px] font-bold text-slate-400">{d}</span>
                            ))}
                          </div>
                          <div className="grid grid-cols-7 gap-1 text-center">
                            {calDays.map((d, i) => {
                              const isPast = isCurrentMonth && d.current && d.day < today.getDate();
                              const isSelected = d.current && d.day === selectedDay;
                              const isToday = isCurrentMonth && d.current && d.day === today.getDate();
                              return (
                                <button
                                  key={i}
                                  disabled={!d.current || isPast}
                                  onClick={() => d.current && !isPast && setSelectedDay(d.day)}
                                  className={`p-2 text-xs rounded-lg transition-all ${
                                    !d.current
                                      ? 'text-slate-300 cursor-default'
                                      : isPast
                                        ? 'text-slate-300 cursor-not-allowed'
                                        : isSelected
                                          ? 'bg-primary text-white font-bold'
                                          : isToday
                                            ? 'bg-primary/10 text-primary font-bold hover:bg-primary/20'
                                            : 'hover:bg-[#f6f8f8] cursor-pointer'
                                  }`}
                                >
                                  {d.day}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      {/* Time Slots */}
                      <div className="space-y-3">
                        <label className="text-xs font-bold uppercase tracking-widest text-reno-dark flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm">schedule</span>
                          Arrival Window
                        </label>
                        <div className="grid grid-cols-1 gap-2">
                          {TIME_SLOTS.map((slot) => (
                            <button
                              key={slot.id}
                              onClick={() => setSelectedSlot(slot.id)}
                              className={`p-3.5 text-sm text-left rounded-xl flex justify-between items-center transition-all ${
                                selectedSlot === slot.id
                                  ? 'bg-primary text-white shadow-md'
                                  : 'bg-white hover:bg-white/80 border border-slate-200'
                              }`}
                            >
                              <div>
                                <span className="font-semibold">{slot.label}</span>
                                <span className={`ml-2 text-xs ${selectedSlot === slot.id ? 'text-white/70' : 'text-slate-400'}`}>{slot.sub}</span>
                              </div>
                              <span className={`material-symbols-outlined text-base ${selectedSlot === slot.id ? 'text-white/80' : 'text-slate-400'}`}>{slot.icon}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* ================================================================= */}
        {/* NAVIGATION                                                        */}
        {/* ================================================================= */}
        <div className="max-w-2xl mt-12 sm:mt-16 flex flex-col gap-4">
          <button
            onClick={handleNext}
            disabled={!canProceed()}
            className="w-full py-4 sm:py-5 bg-[#E8AA42] text-reno-dark font-bold rounded-xl shadow-[0_4px_0_0_#b8862e] active:shadow-none active:translate-y-1 transition-all flex items-center justify-center gap-2 text-base sm:text-lg font-display disabled:opacity-40 disabled:cursor-not-allowed disabled:active:translate-y-0 disabled:active:shadow-[0_4px_0_0_#b8862e]"
          >
            {step === 0
              ? 'Continue'
              : step === 1
                ? 'Continue to Timeline'
                : 'Confirm & Find Pros'}
            <span className="material-symbols-outlined text-lg">arrow_forward</span>
          </button>
          {step > 0 && (
            <button
              onClick={handleBack}
              className="w-full py-3 text-slate-500 font-semibold rounded-xl hover:bg-[#f6f8f8] transition-colors text-sm"
            >
              Go Back
            </button>
          )}
          <p className="text-center text-xs text-slate-400">
            You won&apos;t be charged until the job is completed and approved.
          </p>
        </div>
      </div>
    </div>
  );
}
