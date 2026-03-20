'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  Zap,
  Building2,
  Hammer,
  DollarSign,
  Gift,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  CheckCircle,
  TrendingUp,
  Heart,
  FileText,
  ExternalLink,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  getProgramsByCity,
  calculateMaxSavings,
  getProgramsByLevel,
  getLevelLabel,
  getLevelColor,
  cityRebateSummaries,
  type ProjectType,
  type ProgramLevel,
  type RebateProgram,
} from '@/lib/data/rebates';

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
const regionGroups = [
  {
    label: 'Toronto',
    cities: [{ slug: 'toronto', name: 'Toronto' }],
  },
  {
    label: 'Peel Region',
    cities: [
      { slug: 'mississauga', name: 'Mississauga' },
      { slug: 'brampton', name: 'Brampton' },
    ],
  },
  {
    label: 'York Region',
    cities: [
      { slug: 'vaughan', name: 'Vaughan' },
      { slug: 'markham', name: 'Markham' },
      { slug: 'richmond-hill', name: 'Richmond Hill' },
      { slug: 'aurora', name: 'Aurora' },
    ],
  },
  {
    label: 'Durham Region',
    cities: [
      { slug: 'ajax', name: 'Ajax' },
      { slug: 'pickering', name: 'Pickering' },
      { slug: 'oshawa', name: 'Oshawa' },
      { slug: 'whitby', name: 'Whitby' },
    ],
  },
  {
    label: 'Halton Region',
    cities: [
      { slug: 'oakville', name: 'Oakville' },
      { slug: 'burlington', name: 'Burlington' },
      { slug: 'milton', name: 'Milton' },
    ],
  },
  {
    label: 'Hamilton',
    cities: [{ slug: 'hamilton', name: 'Hamilton' }],
  },
];

const projectTypeOptions: {
  type: ProjectType;
  label: string;
  desc: string;
  icon: typeof Home;
  range: string;
}[] = [
  {
    type: 'adu',
    label: 'Basement Apartment / Secondary Suite',
    desc: 'Legal secondary suite, garden suite, or laneway house',
    icon: Home,
    range: '$40K-$160K savings potential',
  },
  {
    type: 'energy',
    label: 'Energy Retrofit',
    desc: 'Insulation, windows, HVAC, heat pumps, solar',
    icon: Zap,
    range: '$5K-$30K savings potential',
  },
  {
    type: 'structural',
    label: 'Structural Work',
    desc: 'Foundation, waterproofing, underpinning',
    icon: Building2,
    range: '$3K-$30K savings potential',
  },
  {
    type: 'general',
    label: 'General Renovation',
    desc: 'Kitchen, bathroom, additions, whole-home',
    icon: Hammer,
    range: '$7K-$25K savings potential',
  },
];

const levelOrder: ProgramLevel[] = ['federal', 'provincial', 'regional', 'municipal', 'utility'];

// ---------------------------------------------------------------------------
// Animated counter
// ---------------------------------------------------------------------------
function AnimatedCounter({ value, prefix = '$' }: { value: number; prefix?: string }) {
  const [displayed, setDisplayed] = useState(0);
  const ref = useRef<number | null>(null);

  useEffect(() => {
    const start = displayed;
    const diff = value - start;
    if (diff === 0) return;

    const duration = 1200;
    const startTime = performance.now();

    function tick(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayed(Math.round(start + diff * eased));
      if (progress < 1) {
        ref.current = requestAnimationFrame(tick);
      }
    }

    ref.current = requestAnimationFrame(tick);
    return () => {
      if (ref.current) cancelAnimationFrame(ref.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <span>
      {prefix}
      {displayed.toLocaleString()}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------
export default function SavingsCalculatorPage() {
  const [step, setStep] = useState(1);
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<ProjectType[]>([]);
  const [budget, setBudget] = useState(100000);
  const [showResults, setShowResults] = useState(false);

  const cityName =
    regionGroups.flatMap((g) => g.cities).find((c) => c.slug === selectedCity)?.name || '';

  const toggleType = (t: ProjectType) => {
    setSelectedTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    );
  };

  const handleCalculate = () => {
    setShowResults(true);
  };

  // Computed results
  const programs = selectedCity ? getProgramsByCity(selectedCity) : [];
  const matchingPrograms = programs.filter((p) =>
    p.projectTypes.some((pt) => selectedTypes.includes(pt))
  );
  const totalSavings = selectedCity ? calculateMaxSavings(selectedCity, selectedTypes) : 0;
  const grouped = getProgramsByLevel(matchingPrograms);
  const netCost = Math.max(0, budget - totalSavings);

  // Rental income estimate (if ADU selected)
  const hasAdu = selectedTypes.includes('adu');
  const monthlyRental = hasAdu ? 1800 : 0;

  // Energy savings (if energy selected)
  const hasEnergy = selectedTypes.includes('energy');
  const annualEnergySavings = hasEnergy ? 2400 : 0;

  const canProceedStep1 = selectedCity !== '';
  const canProceedStep2 = selectedTypes.length > 0;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-reno-cream to-white py-16 md:py-24">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(15,186,189,0.06),transparent_50%)]" />
        <div className="container relative mx-auto px-4">
          <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
            <Link href="/" className="transition-colors hover:text-gray-900">Home</Link>
            <ChevronRight className="h-3.5 w-3.5" />
            <span className="font-medium text-gray-900">Savings Calculator</span>
          </nav>

          <div className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 rounded-full bg-reno-green/10 px-4 py-1.5 text-reno-green border-transparent hover:bg-reno-green/10">
              <Gift className="mr-1.5 h-3.5 w-3.5" />
              2026 Programs Updated
            </Badge>
            <h1 className="font-display text-4xl font-bold tracking-tight text-reno-dark md:text-5xl lg:text-6xl">
              How Much Can You Save?
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-gray-600 md:text-xl">
              GTA homeowners leave tens of thousands on the table. Federal, provincial, regional,
              municipal, and utility rebates stack up — but nobody tells you that. Until now.
            </p>
          </div>
        </div>
      </section>

      {/* Wizard */}
      <section className="border-b border-gray-100 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            {/* Progress bar */}
            <div className="mb-12">
              <div className="flex items-center justify-between">
                {[
                  { n: 1, label: 'Your City' },
                  { n: 2, label: 'Project Type' },
                  { n: 3, label: 'Budget' },
                ].map((s) => (
                  <div key={s.n} className="flex items-center gap-2">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-colors ${
                        step >= s.n
                          ? 'bg-reno-green text-white'
                          : 'bg-gray-200 text-gray-500'
                      }`}
                    >
                      {step > s.n ? (
                        <CheckCircle className="h-4 w-4" />
                      ) : (
                        s.n
                      )}
                    </div>
                    <span
                      className={`hidden text-sm font-medium sm:inline ${
                        step >= s.n ? 'text-gray-900' : 'text-gray-400'
                      }`}
                    >
                      {s.label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-3 h-2 rounded-full bg-gray-200">
                <motion.div
                  className="h-full rounded-full bg-reno-green"
                  initial={{ width: '0%' }}
                  animate={{ width: showResults ? '100%' : `${((step - 1) / 3) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {/* Step 1: Select City */}
              {step === 1 && !showResults && (
                <motion.div
                  key="step-1"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="font-display text-2xl font-bold text-reno-dark md:text-3xl">
                    Where is your property?
                  </h2>
                  <p className="mt-2 text-gray-500">
                    Select your city to see available programs in your area.
                  </p>

                  <div className="mt-8 space-y-6">
                    {regionGroups.map((group) => (
                      <div key={group.label}>
                        <p className="mb-3 text-xs font-bold uppercase tracking-[0.15em] text-gray-400">
                          {group.label}
                        </p>
                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                          {group.cities.map((city) => {
                            const count = getProgramsByCity(city.slug).length;
                            const isSelected = selectedCity === city.slug;
                            return (
                              <button
                                key={city.slug}
                                onClick={() => setSelectedCity(city.slug)}
                                className={`relative rounded-xl border-2 p-4 text-left transition-all duration-200 ${
                                  isSelected
                                    ? 'border-reno-green bg-reno-green/5 shadow-sm'
                                    : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                                }`}
                              >
                                <div className="flex items-center gap-2">
                                  <MapPin
                                    className={`h-4 w-4 ${isSelected ? 'text-reno-green' : 'text-gray-400'}`}
                                  />
                                  <span className="font-semibold text-gray-900">{city.name}</span>
                                </div>
                                <p className="mt-1 text-xs text-gray-500">
                                  {count} programs available
                                </p>
                                {isSelected && (
                                  <div className="absolute right-3 top-3">
                                    <CheckCircle className="h-5 w-5 text-reno-green" />
                                  </div>
                                )}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10 flex justify-end">
                    <Button
                      onClick={() => setStep(2)}
                      disabled={!canProceedStep1}
                      className="rounded-xl bg-reno-green px-8 py-3 text-sm font-semibold text-white hover:bg-reno-green/90 disabled:opacity-50"
                    >
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 2: Project Type */}
              {step === 2 && !showResults && (
                <motion.div
                  key="step-2"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="font-display text-2xl font-bold text-reno-dark md:text-3xl">
                    What are you planning?
                  </h2>
                  <p className="mt-2 text-gray-500">
                    Select all that apply — many programs cover multiple project types.
                  </p>

                  <div className="mt-8 grid gap-4 sm:grid-cols-2">
                    {projectTypeOptions.map((opt) => {
                      const isSelected = selectedTypes.includes(opt.type);
                      const Icon = opt.icon;
                      return (
                        <button
                          key={opt.type}
                          onClick={() => toggleType(opt.type)}
                          className={`relative rounded-xl border-2 p-5 text-left transition-all duration-200 ${
                            isSelected
                              ? 'border-reno-green bg-reno-green/5 shadow-sm'
                              : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-sm'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors ${
                                isSelected ? 'bg-reno-green text-white' : 'bg-gray-100 text-gray-500'
                              }`}
                            >
                              <Icon className="h-5 w-5" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{opt.label}</p>
                              <p className="mt-0.5 text-sm text-gray-500">{opt.desc}</p>
                              <p className="mt-2 text-xs font-semibold text-reno-green">{opt.range}</p>
                            </div>
                          </div>
                          {isSelected && (
                            <div className="absolute right-4 top-4">
                              <CheckCircle className="h-5 w-5 text-reno-green" />
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-10 flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setStep(1)}
                      className="rounded-xl border-gray-200 px-6 py-3 text-sm font-medium text-gray-700"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button
                      onClick={() => setStep(3)}
                      disabled={!canProceedStep2}
                      className="rounded-xl bg-reno-green px-8 py-3 text-sm font-semibold text-white hover:bg-reno-green/90 disabled:opacity-50"
                    >
                      Continue
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Step 3: Budget */}
              {step === 3 && !showResults && (
                <motion.div
                  key="step-3"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <h2 className="font-display text-2xl font-bold text-reno-dark md:text-3xl">
                    Your estimated budget
                  </h2>
                  <p className="mt-2 text-gray-500">
                    Drag the slider or type an amount. Don&apos;t worry — you can adjust later.
                  </p>

                  <div className="mt-10">
                    <div className="text-center">
                      <span className="font-display text-5xl font-bold text-reno-dark">
                        ${budget.toLocaleString()}
                      </span>
                    </div>

                    <div className="mt-8">
                      <input
                        type="range"
                        min={20000}
                        max={300000}
                        step={5000}
                        value={budget}
                        onChange={(e) => setBudget(Number(e.target.value))}
                        className="w-full accent-reno-green"
                      />
                      <div className="mt-2 flex justify-between text-xs text-gray-400">
                        <span>$20,000</span>
                        <span>$300,000</span>
                      </div>
                    </div>

                    {/* Hint */}
                    <div className="mt-6 rounded-xl bg-gray-50 p-4">
                      <p className="text-sm text-gray-600">
                        <strong>Typical ranges:</strong>{' '}
                        {selectedTypes.includes('adu') && 'Basement apartment: $60K-$140K. '}
                        {selectedTypes.includes('energy') && 'Energy retrofit: $15K-$50K. '}
                        {selectedTypes.includes('structural') && 'Structural work: $20K-$80K. '}
                        {selectedTypes.includes('general') && 'General renovation: $30K-$150K. '}
                      </p>
                    </div>
                  </div>

                  <div className="mt-10 flex justify-between">
                    <Button
                      variant="outline"
                      onClick={() => setStep(2)}
                      className="rounded-xl border-gray-200 px-6 py-3 text-sm font-medium text-gray-700"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Back
                    </Button>
                    <Button
                      onClick={handleCalculate}
                      className="rounded-xl bg-reno-green px-8 py-3 text-sm font-semibold text-white hover:bg-reno-green/90"
                    >
                      <Sparkles className="mr-2 h-4 w-4" />
                      Calculate My Savings
                    </Button>
                  </div>
                </motion.div>
              )}

              {/* Results */}
              {showResults && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* Summary Cards */}
                  <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    <Card className="rounded-xl border-reno-green/30 bg-reno-green/5 shadow-sm">
                      <CardContent className="p-5">
                        <Gift className="mb-2 h-5 w-5 text-reno-green" />
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                          Total Rebates
                        </p>
                        <p className="mt-1 text-2xl font-bold text-reno-green">
                          <AnimatedCounter value={totalSavings} />
                        </p>
                      </CardContent>
                    </Card>
                    <Card className="rounded-xl border-gray-200 bg-white shadow-sm">
                      <CardContent className="p-5">
                        <DollarSign className="mb-2 h-5 w-5 text-reno-teal" />
                        <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                          Net Project Cost
                        </p>
                        <p className="mt-1 text-2xl font-bold text-gray-900">
                          <AnimatedCounter value={netCost} />
                        </p>
                        <p className="mt-0.5 text-xs text-gray-400">
                          from ${budget.toLocaleString()} budget
                        </p>
                      </CardContent>
                    </Card>
                    {hasEnergy && (
                      <Card className="rounded-xl border-gray-200 bg-white shadow-sm">
                        <CardContent className="p-5">
                          <Zap className="mb-2 h-5 w-5 text-amber-500" />
                          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                            Energy Savings
                          </p>
                          <p className="mt-1 text-2xl font-bold text-gray-900">
                            <AnimatedCounter value={annualEnergySavings} />
                            <span className="text-base font-normal text-gray-500">/yr</span>
                          </p>
                        </CardContent>
                      </Card>
                    )}
                    {hasAdu && (
                      <Card className="rounded-xl border-gray-200 bg-white shadow-sm">
                        <CardContent className="p-5">
                          <Home className="mb-2 h-5 w-5 text-reno-purple" />
                          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
                            Rental Income
                          </p>
                          <p className="mt-1 text-2xl font-bold text-gray-900">
                            <AnimatedCounter value={monthlyRental} />
                            <span className="text-base font-normal text-gray-500">/mo</span>
                          </p>
                        </CardContent>
                      </Card>
                    )}
                  </div>

                  {/* Savings Stack */}
                  <div className="mb-8">
                    <h2 className="font-display text-2xl font-bold text-reno-dark md:text-3xl">
                      Your Savings Stack — {cityName}
                    </h2>
                    <p className="mt-2 text-gray-500">
                      {matchingPrograms.length} programs you may qualify for, totalling up to{' '}
                      <span className="font-bold text-reno-green">
                        ${totalSavings.toLocaleString()}
                      </span>
                    </p>
                  </div>

                  <div className="space-y-6">
                    {levelOrder.map((level) => {
                      const levelPrograms = grouped[level];
                      if (levelPrograms.length === 0) return null;

                      return (
                        <div key={level}>
                          <div className="mb-3 flex items-center gap-2">
                            <Badge
                              className={`rounded-full border-transparent px-2.5 py-0.5 text-xs font-bold ${getLevelColor(level)}`}
                            >
                              {getLevelLabel(level)}
                            </Badge>
                            <span className="text-sm text-gray-400">
                              {levelPrograms.length} program{levelPrograms.length > 1 ? 's' : ''}
                            </span>
                          </div>

                          <div className="space-y-3">
                            {levelPrograms.map((program, i) => (
                              <motion.div
                                key={program.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1, duration: 0.3 }}
                              >
                                <Card className="rounded-xl border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md">
                                  <CardContent className="p-5">
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                      <div className="min-w-0 flex-1">
                                        <div className="flex items-center gap-2">
                                          <h3 className="font-bold text-gray-900">
                                            {program.name}
                                          </h3>
                                          {program.status === 'upcoming' && (
                                            <Badge className="rounded-full bg-blue-100 text-blue-700 border-transparent text-[10px] px-2 py-0.5">
                                              Coming Soon
                                            </Badge>
                                          )}
                                          {program.deadline && (
                                            <Badge className="rounded-full bg-amber-100 text-amber-700 border-transparent text-[10px] px-2 py-0.5">
                                              {program.deadline}
                                            </Badge>
                                          )}
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">
                                          {program.adminBody}
                                        </p>
                                        <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                                          {program.description}
                                        </p>
                                      </div>
                                      <div className="flex shrink-0 items-center gap-3 sm:flex-col sm:items-end">
                                        <p className="text-xl font-bold text-reno-green">
                                          {program.amount}
                                        </p>
                                        <a
                                          href={program.applicationUrl}
                                          target="_blank"
                                          rel="noopener noreferrer"
                                          className="inline-flex items-center gap-1 text-xs font-semibold text-reno-teal transition-colors hover:text-reno-teal/80"
                                        >
                                          Apply
                                          <ExternalLink className="h-3 w-3" />
                                        </a>
                                      </div>
                                    </div>
                                  </CardContent>
                                </Card>
                              </motion.div>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Recalculate */}
                  <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setShowResults(false);
                        setStep(1);
                      }}
                      className="rounded-xl border-gray-200 px-6 py-3 text-sm font-medium text-gray-700"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" />
                      Start Over
                    </Button>
                    <Button asChild className="rounded-xl bg-reno-green px-6 py-3 text-sm font-semibold text-white hover:bg-reno-green/90">
                      <Link href={`/savings/${selectedCity}`}>
                        View All {cityName} Rebates
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="border-b border-gray-100 bg-gray-50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="text-center">
              <h2 className="font-display text-3xl font-bold tracking-tight text-reno-dark md:text-4xl">
                Why Renovate with Incentives?
              </h2>
              <p className="mx-auto mt-3 max-w-2xl text-gray-500">
                Most homeowners don&apos;t realize how much money is available. When you stack programs properly, the math changes completely.
              </p>
            </div>

            <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  icon: DollarSign,
                  title: 'Save Money',
                  desc: 'Stacked rebates reduce your upfront cost by 30-60%. Federal, provincial, regional, and municipal programs are designed to be combined.',
                  color: 'text-reno-green',
                  bg: 'bg-reno-green/10',
                },
                {
                  icon: Home,
                  title: 'Earn Income',
                  desc: 'A legal basement apartment in the GTA generates $1,500-$2,500/month. That\'s $18K-$30K per year in rental income.',
                  color: 'text-reno-purple',
                  bg: 'bg-reno-purple/10',
                },
                {
                  icon: TrendingUp,
                  title: 'Increase Value',
                  desc: 'Renovated homes sell for 15-25% more. A legal secondary suite adds even more — appraisers count rental income in valuations.',
                  color: 'text-reno-teal',
                  bg: 'bg-reno-teal/10',
                },
                {
                  icon: Heart,
                  title: 'Better Health',
                  desc: 'Modern insulation, ventilation, and waterproofing eliminate mold, improve air quality, and create a healthier living environment.',
                  color: 'text-rose-600',
                  bg: 'bg-rose-100',
                },
                {
                  icon: Zap,
                  title: 'Lower Bills',
                  desc: 'Energy upgrades save $1,500-$3,000 per year on heating, cooling, and electricity. Heat pumps alone can cut heating costs by 50%.',
                  color: 'text-amber-600',
                  bg: 'bg-amber-100',
                },
                {
                  icon: FileText,
                  title: 'HouseFax Record',
                  desc: 'Every improvement is documented in your permanent HouseFax record. Verified upgrades transfer to future buyers — increasing resale confidence.',
                  color: 'text-blue-600',
                  bg: 'bg-blue-100',
                },
              ].map((item) => (
                <Card key={item.title} className="rounded-xl border-gray-200 bg-white shadow-sm">
                  <CardContent className="p-6">
                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${item.bg}`}>
                      <item.icon className={`h-5 w-5 ${item.color}`} />
                    </div>
                    <h3 className="mt-4 text-lg font-bold text-gray-900">{item.title}</h3>
                    <p className="mt-2 text-sm text-gray-600 leading-relaxed">{item.desc}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* City Directory */}
      <section className="border-b border-gray-100 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="font-display text-3xl font-bold tracking-tight text-reno-dark md:text-4xl">
              Browse by City
            </h2>
            <p className="mt-3 text-gray-500">
              Detailed rebate directories for every major GTA city.
            </p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {cityRebateSummaries.map((city) => {
                const programCount = getProgramsByCity(city.slug).length;
                return (
                  <Link key={city.slug} href={`/savings/${city.slug}`}>
                    <Card className="h-full rounded-xl border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md hover:border-reno-green/30">
                      <CardContent className="p-5">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-reno-green" />
                            <h3 className="font-bold text-gray-900">{city.city}</h3>
                          </div>
                          <Badge className="rounded-full bg-reno-green/10 text-reno-green border-transparent text-xs px-2 py-0.5">
                            {programCount} programs
                          </Badge>
                        </div>
                        <p className="mt-1 text-xs text-gray-500">{city.region} Region</p>
                        <p className="mt-2 text-sm text-gray-600 line-clamp-2">{city.highlights[0]}</p>
                        <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-reno-green">
                          View all rebates
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-reno-dark py-16 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-white md:text-4xl">
            Ready to put these savings to work?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Start your project with RenoNext. Escrow-protected payments, verified pros, and every
            improvement documented in your HouseFax record.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              asChild
              className="rounded-xl bg-reno-green px-8 py-3 text-base font-semibold text-white hover:bg-reno-green/90"
            >
              <Link href="/start-project">
                Start Your Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-xl border-gray-600 px-8 py-3 text-base font-semibold text-white hover:bg-white/10"
            >
              <Link href="/price-check">Get a Price Check</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
