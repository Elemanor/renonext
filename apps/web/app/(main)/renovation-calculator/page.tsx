'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Calculator } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cityMultipliers, getCityBySlug, getCityAdjustedPrice } from '@/lib/data/costs';

const finishLevels = [
  { id: 'basic', name: 'Basic Finishing', icon: 'build', priceMin: 35, priceMax: 55, labourPct: 55, materialPct: 45, timeline: '4–6 weeks' },
  { id: 'mid-range', name: 'Mid-Range Finish', icon: 'home_improvement_and_tools', priceMin: 55, priceMax: 75, labourPct: 55, materialPct: 45, timeline: '6–10 weeks' },
  { id: 'full', name: 'Full Renovation', icon: 'star', priceMin: 65, priceMax: 100, labourPct: 50, materialPct: 50, timeline: '8–14 weeks' },
  { id: 'legal-apartment', name: 'Legal Apartment', icon: 'apartment', priceMin: 90, priceMax: 140, labourPct: 50, materialPct: 50, timeline: '12–20 weeks' },
];

const addOns = [
  { id: 'bathroom', name: 'Full Bathroom', icon: 'bathtub', minCost: 15000, maxCost: 35000, labourPct: 55, materialPct: 45 },
  { id: 'egress', name: 'Egress Windows', icon: 'window', minCost: 5000, maxCost: 10000, labourPct: 55, materialPct: 45 },
  { id: 'underpinning', name: 'Underpinning', icon: 'foundation', minCost: 50000, maxCost: 80000, labourPct: 60, materialPct: 40 },
  { id: 'waterproofing', name: 'Waterproofing', icon: 'water_drop', minCost: 3000, maxCost: 35000, labourPct: 55, materialPct: 45 },
  { id: 'entrance', name: 'Separate Entrance', icon: 'door_front', minCost: 8000, maxCost: 20000, labourPct: 60, materialPct: 40 },
];

const tips = [
  { icon: 'format_quote', title: 'Get Multiple Quotes', desc: 'Always compare at least 3 contractor estimates' },
  { icon: 'savings', title: 'Budget 10% Contingency', desc: 'Unexpected issues are common in basements' },
  { icon: 'water_drop', title: 'Waterproof First', desc: 'Address moisture before finishing' },
  { icon: 'description', title: 'Check Permits', desc: 'Most basement work requires building permits' },
  { icon: 'fact_check', title: 'Plan for Inspections', desc: 'Schedule inspections before closing walls' },
  { icon: 'trending_up', title: 'Consider Resale Value', desc: 'Legal apartments offer the best ROI' },
];

const relatedTools = [
  { title: 'Cost Guides', desc: 'Browse pricing by service & city', href: '/costs', icon: 'menu_book' },
  { title: 'Contract Generator', desc: 'Create compliant renovation contracts', href: '/contracts', icon: 'gavel' },
  { title: 'Price Check', desc: 'Get instant AI-powered estimates', href: '/price-check', icon: 'calculate' },
];

const fmt = (n: number) => new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD', maximumFractionDigits: 0 }).format(n);

export default function RenovationCalculatorPage() {
  const [city, setCity] = useState('toronto');
  const [sqft, setSqft] = useState(750);
  const [finishLevel, setFinishLevel] = useState('mid-range');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [calculated, setCalculated] = useState(false);

  const [results, setResults] = useState<{
    baseCostMin: number;
    baseCostMax: number;
    addOnCosts: { id: string; name: string; min: number; max: number }[];
    contingencyMin: number;
    contingencyMax: number;
    totalMin: number;
    totalMax: number;
    timeline: string;
  } | null>(null);

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.title = 'Basement Renovation Cost Calculator | RenoNext';
    }
  }, []);

  const handleCalculate = () => {
    const cityData = getCityBySlug(city);
    const level = finishLevels.find((l) => l.id === finishLevel);
    if (!level || !cityData) return;

    // Base cost
    const baseMin = level.priceMin * sqft;
    const baseMax = level.priceMax * sqft;
    const baseCostAdjusted = getCityAdjustedPrice(baseMin, baseMax, level.labourPct, level.materialPct, cityData);

    // Add-on costs
    const addOnCosts: { id: string; name: string; min: number; max: number }[] = [];
    let addOnTotalMin = 0;
    let addOnTotalMax = 0;

    selectedAddOns.forEach((id) => {
      const addOn = addOns.find((a) => a.id === id);
      if (addOn) {
        const adjusted = getCityAdjustedPrice(
          addOn.minCost,
          addOn.maxCost,
          addOn.labourPct,
          addOn.materialPct,
          cityData
        );
        addOnCosts.push({ id, name: addOn.name, min: adjusted.min, max: adjusted.max });
        addOnTotalMin += adjusted.min;
        addOnTotalMax += adjusted.max;
      }
    });

    // Subtotal
    const subtotalMin = baseCostAdjusted.min + addOnTotalMin;
    const subtotalMax = baseCostAdjusted.max + addOnTotalMax;

    // Contingency (10%)
    const contingencyMin = subtotalMin * 0.1;
    const contingencyMax = subtotalMax * 0.1;

    // Total
    const totalMin = subtotalMin + contingencyMin;
    const totalMax = subtotalMax + contingencyMax;

    // Timeline
    let baseWeeks = parseInt(level.timeline.split('–')[1].replace(/\D/g, ''), 10);
    selectedAddOns.forEach((id) => {
      if (id === 'underpinning') baseWeeks += 8;
      else if (id === 'waterproofing') baseWeeks += 2;
      else if (id === 'entrance') baseWeeks += 3;
      else if (id === 'bathroom') baseWeeks += 2;
      else if (id === 'egress') baseWeeks += 2;
    });
    const timelineStr = `${Math.max(4, baseWeeks - 4)}–${baseWeeks} weeks`;

    setResults({
      baseCostMin: baseCostAdjusted.min,
      baseCostMax: baseCostAdjusted.max,
      addOnCosts,
      contingencyMin,
      contingencyMax,
      totalMin,
      totalMax,
      timeline: timelineStr,
    });

    setCalculated(true);
  };

  const toggleAddOn = (id: string) => {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  return (
    <main className="bg-white">
      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary/80 py-20 md:py-28 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full mb-6">
            <Calculator className="w-5 h-5" />
            <span className="text-sm font-medium">Free Renovation Cost Calculator</span>
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
            Basement Renovation<br />Cost Calculator
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto">
            Get instant cost estimates for your basement project. City-adjusted pricing across 15 Ontario cities.
          </p>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Inputs */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-reno-dark mb-6">Project Details</h2>

                {/* City Selector */}
                <div className="mb-6">
                  <label htmlFor="city" className="block text-sm font-semibold text-reno-dark mb-2">
                    City
                  </label>
                  <select
                    id="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
                  >
                    {cityMultipliers.map((c) => (
                      <option key={c.slug} value={c.slug}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Square Footage */}
                <div className="mb-6">
                  <label htmlFor="sqft" className="block text-sm font-semibold text-reno-dark mb-2">
                    Square Footage: <span className="text-primary">{sqft.toLocaleString()} sq ft</span>
                  </label>
                  <div className="flex items-center gap-4">
                    <input
                      id="sqft"
                      type="range"
                      min="300"
                      max="2000"
                      step="50"
                      value={sqft}
                      onChange={(e) => setSqft(Number(e.target.value))}
                      className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                    <input
                      type="number"
                      min="300"
                      max="2000"
                      step="50"
                      value={sqft}
                      onChange={(e) => setSqft(Number(e.target.value))}
                      className="w-24 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none text-center"
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>300</span>
                    <span>2,000 sq ft</span>
                  </div>
                </div>

                {/* Finish Level */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-reno-dark mb-3">
                    Finish Level
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {finishLevels.map((level) => (
                      <button
                        key={level.id}
                        onClick={() => setFinishLevel(level.id)}
                        className={`p-4 border-2 rounded-xl text-left transition-all ${
                          finishLevel === level.id
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200 hover:border-primary/50'
                        }`}
                      >
                        <span
                          className="material-symbols-outlined text-3xl mb-2"
                          style={{ color: finishLevel === level.id ? '#0fbabd' : '#102122' }}
                        >
                          {level.icon}
                        </span>
                        <div className="font-semibold text-reno-dark mb-1">{level.name}</div>
                        <div className="text-sm text-gray-600">
                          {fmt(level.priceMin)}–{fmt(level.priceMax)}/sq ft
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Add-ons */}
                <div className="mb-6">
                  <label className="block text-sm font-semibold text-reno-dark mb-3">
                    Add-Ons (Optional)
                  </label>
                  <div className="space-y-3">
                    {addOns.map((addOn) => (
                      <label
                        key={addOn.id}
                        className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                          selectedAddOns.includes(addOn.id)
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200 hover:border-primary/50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedAddOns.includes(addOn.id)}
                          onChange={() => toggleAddOn(addOn.id)}
                          className="w-5 h-5 accent-primary cursor-pointer"
                        />
                        <span
                          className="material-symbols-outlined text-2xl"
                          style={{ color: selectedAddOns.includes(addOn.id) ? '#0fbabd' : '#102122' }}
                        >
                          {addOn.icon}
                        </span>
                        <div className="flex-1">
                          <div className="font-semibold text-reno-dark">{addOn.name}</div>
                          <div className="text-sm text-gray-600">
                            {fmt(addOn.minCost)}–{fmt(addOn.maxCost)}
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Calculate Button */}
                <Button
                  onClick={handleCalculate}
                  size="lg"
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold text-lg"
                >
                  <Calculator className="w-5 h-5 mr-2" />
                  Calculate Cost
                </Button>
              </div>
            </div>

            {/* Right Column - Results */}
            <div
              className={`transition-all duration-500 ${
                calculated ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
              }`}
            >
              {results && (
                <Card className="shadow-float rounded-2xl sticky top-8">
                  <CardContent className="p-8">
                    <h2 className="text-2xl font-bold text-reno-dark mb-6">Estimated Cost</h2>

                    {/* Total Range */}
                    <div className="bg-gradient-to-br from-primary to-primary/80 text-white p-6 rounded-xl mb-6">
                      <div className="text-sm font-medium mb-2">Total Project Cost</div>
                      <div className="text-3xl md:text-4xl font-extrabold">
                        {fmt(results.totalMin)} – {fmt(results.totalMax)}
                      </div>
                    </div>

                    {/* Breakdown Table */}
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-gray-700">Base Cost ({sqft} sq ft)</span>
                        <span className="font-semibold text-reno-dark">
                          {fmt(results.baseCostMin)}–{fmt(results.baseCostMax)}
                        </span>
                      </div>
                      {results.addOnCosts.map((addOn) => (
                        <div key={addOn.id} className="flex justify-between py-2 border-b border-gray-200">
                          <span className="text-gray-700">{addOn.name}</span>
                          <span className="font-semibold text-reno-dark">
                            {fmt(addOn.min)}–{fmt(addOn.max)}
                          </span>
                        </div>
                      ))}
                      <div className="flex justify-between py-2 border-b border-gray-200">
                        <span className="text-gray-700">Contingency (10%)</span>
                        <span className="font-semibold text-reno-dark">
                          {fmt(results.contingencyMin)}–{fmt(results.contingencyMax)}
                        </span>
                      </div>
                      <div className="flex justify-between py-3 border-t-2 border-reno-dark">
                        <span className="font-bold text-reno-dark text-lg">Total</span>
                        <span className="font-bold text-primary text-lg">
                          {fmt(results.totalMin)}–{fmt(results.totalMax)}
                        </span>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="bg-[#f6f8f8] p-4 rounded-lg mb-6">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="material-symbols-outlined text-primary text-xl">schedule</span>
                        <span className="font-semibold text-reno-dark">Estimated Timeline</span>
                      </div>
                      <div className="text-gray-700">{results.timeline}</div>
                    </div>

                    {/* ROI Box (Legal Apartment Only) */}
                    {finishLevel === 'legal-apartment' && (
                      <div className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-300 p-4 rounded-lg mb-6">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="material-symbols-outlined text-green-600 text-xl">payments</span>
                          <span className="font-semibold text-green-900">ROI Potential</span>
                        </div>
                        <div className="text-green-800 text-sm">
                          Monthly Rental Income: <strong>$1,700–$3,200/month</strong>
                        </div>
                      </div>
                    )}

                    {/* Print Button */}
                    <Button
                      onClick={() => window.print()}
                      variant="outline"
                      className="w-full border-2 border-primary text-primary hover:bg-primary hover:text-white"
                    >
                      <span className="material-symbols-outlined text-xl mr-2">print</span>
                      Print / Save Estimate
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Tips Section */}
      <section className="py-20 md:py-28 bg-[#f6f8f8]">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-reno-dark mb-4">
              Basement Renovation Tips
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Expert advice to help you plan and budget for your project
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tips.map((tip, idx) => (
              <Card key={idx} className="shadow-float rounded-2xl hover:shadow-float-hover transition-shadow">
                <CardContent className="p-6">
                  <span className="material-symbols-outlined text-4xl text-primary mb-3 block">
                    {tip.icon}
                  </span>
                  <h3 className="text-lg font-bold text-reno-dark mb-2">{tip.title}</h3>
                  <p className="text-gray-700">{tip.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-reno-dark mb-4">
              Related Tools
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Explore more free tools to plan your renovation
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {relatedTools.map((tool, idx) => (
              <Link key={idx} href={tool.href}>
                <Card className="shadow-float rounded-2xl hover:shadow-float-hover transition-all h-full group">
                  <CardContent className="p-6 flex flex-col h-full">
                    <span className="material-symbols-outlined text-5xl text-primary mb-4 group-hover:scale-110 transition-transform">
                      {tool.icon}
                    </span>
                    <h3 className="text-xl font-bold text-reno-dark mb-2">{tool.title}</h3>
                    <p className="text-gray-700 mb-4 flex-1">{tool.desc}</p>
                    <div className="flex items-center text-primary font-semibold group-hover:gap-2 transition-all">
                      Explore <ArrowRight className="w-5 h-5 ml-1" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-28 bg-gradient-to-br from-reno-dark to-reno-dark/90 text-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full mb-6">
            <CheckCircle className="w-5 h-5" />
            <span className="text-sm font-medium">Trusted by 10,000+ Homeowners</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Need a Pro for Your Project?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Browse verified contractors in your area, compare quotes, and start your basement renovation with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/pros">
              <Button size="lg" className="bg-white text-reno-dark hover:bg-gray-100 font-semibold">
                Browse Contractors
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/start-project">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-reno-dark font-semibold">
                Start Your Project
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
