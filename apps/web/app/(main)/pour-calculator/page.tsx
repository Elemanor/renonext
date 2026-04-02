'use client';

import { useState } from 'react';
import Link from 'next/link';

type ShapeType = 'slab' | 'footing' | 'column' | 'steps';

interface Dimensions {
  lengthFeet: number;
  lengthInches: number;
  widthFeet: number;
  widthInches: number;
  depthFeet: number;
  depthInches: number;
  diameter?: number; // for column
  rise?: number; // for steps
  run?: number; // for steps
  numberOfSteps?: number; // for steps
}

interface CalculationResult {
  cubicYards: number;
  cubicFeet: number;
  cubicMeters: number;
  bags40kg: number;
  bags60lb: number;
  bags80lb: number;
  trucksNeeded: number;
  costMin: number;
  costMax: number;
  weightTonnes: number;
  wasteAmount: number;
}

export default function PourCalculatorPage() {
  const [shape, setShape] = useState<ShapeType>('slab');
  const [dimensions, setDimensions] = useState<Dimensions>({
    lengthFeet: 0,
    lengthInches: 0,
    widthFeet: 0,
    widthInches: 0,
    depthFeet: 0,
    depthInches: 4,
    diameter: 0,
    rise: 0,
    run: 0,
    numberOfSteps: 0,
  });
  const [quantity, setQuantity] = useState(1);
  const [wasteFactor, setWasteFactor] = useState(10);
  const [calculated, setCalculated] = useState(false);
  const [result, setResult] = useState<CalculationResult | null>(null);

  const shapes = [
    {
      id: 'slab' as ShapeType,
      label: 'Slab',
      icon: 'crop_square',
      description: 'Flat concrete surface',
    },
    {
      id: 'footing' as ShapeType,
      label: 'Footing',
      icon: 'foundation',
      description: 'Foundation footing',
    },
    {
      id: 'column' as ShapeType,
      label: 'Column',
      icon: 'view_column',
      description: 'Cylindrical column',
    },
    {
      id: 'steps' as ShapeType,
      label: 'Steps',
      icon: 'stairs',
      description: 'Concrete stairs',
    },
  ];

  const wasteOptions = [
    { value: 5, label: '5%' },
    { value: 8, label: '8%' },
    { value: 10, label: '10%' },
    { value: 15, label: '15%' },
  ];

  const calculateVolume = (): void => {
    let cubicFeet = 0;

    if (shape === 'slab' || shape === 'footing') {
      const length = dimensions.lengthFeet + dimensions.lengthInches / 12;
      const width = dimensions.widthFeet + dimensions.widthInches / 12;
      const depth = dimensions.depthFeet + dimensions.depthInches / 12;
      cubicFeet = length * width * depth;
    } else if (shape === 'column') {
      const diameter = (dimensions.diameter || 0) / 12; // convert inches to feet
      const height = dimensions.depthFeet + dimensions.depthInches / 12;
      const radius = diameter / 2;
      cubicFeet = Math.PI * radius * radius * height;
    } else if (shape === 'steps') {
      const rise = (dimensions.rise || 0) / 12; // convert inches to feet
      const run = (dimensions.run || 0) / 12;
      const width = dimensions.widthFeet + dimensions.widthInches / 12;
      const numberOfSteps = dimensions.numberOfSteps || 0;

      // Calculate volume of steps (triangular prism approach)
      const totalRise = rise * numberOfSteps;
      const totalRun = run * numberOfSteps;
      cubicFeet = (totalRise * totalRun * width) / 2;
    }

    // Apply quantity
    cubicFeet *= quantity;

    // Calculate base volume in cubic yards
    const baseYards = cubicFeet / 27;

    // Add waste factor
    const wasteAmount = baseYards * (wasteFactor / 100);
    const cubicYards = baseYards + wasteAmount;

    // Calculate other metrics
    const cubicMeters = cubicYards * 0.764555;

    // Bag calculations (coverage in cubic feet)
    const bags80lb = Math.ceil((cubicFeet * (1 + wasteFactor / 100)) / 0.6);
    const bags60lb = Math.ceil((cubicFeet * (1 + wasteFactor / 100)) / 0.45);
    const bags40kg = Math.ceil((cubicFeet * (1 + wasteFactor / 100)) / 0.5);

    // Trucks (8 cubic yards per truck)
    const trucksNeeded = Math.ceil(cubicYards / 8);

    // Cost ($180-$220 per cubic yard in Ontario)
    const costMin = Math.round(cubicYards * 180);
    const costMax = Math.round(cubicYards * 220);

    // Weight (approximately 2 tonnes per cubic yard)
    const weightTonnes = parseFloat((cubicYards * 2).toFixed(2));

    setResult({
      cubicYards: parseFloat(cubicYards.toFixed(2)),
      cubicFeet: parseFloat(cubicFeet.toFixed(2)),
      cubicMeters: parseFloat(cubicMeters.toFixed(2)),
      bags40kg,
      bags60lb,
      bags80lb,
      trucksNeeded,
      costMin,
      costMax,
      weightTonnes,
      wasteAmount: parseFloat(wasteAmount.toFixed(2)),
    });

    setCalculated(true);
  };

  const handleCalculate = () => {
    calculateVolume();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#f6f8f8]">
      {/* Hero Section */}
      <section className="bg-[#f6f8f8] py-12 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-float mb-6">
            <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
              verified
            </span>
            <span className="text-sm font-medium text-reno-dark">
              Free Tool — No Sign-Up Required
            </span>
          </div>

          <h1 className="font-display text-4xl md:text-5xl font-bold text-reno-dark mb-4">
            Concrete Pour Calculator
          </h1>

          <p className="text-lg md:text-xl text-slate-700 max-w-2xl mx-auto">
            Calculate exactly how much concrete you need. Enter dimensions, get volume in cubic yards,
            truck count, and estimated cost.
          </p>
        </div>
      </section>

      {/* Calculator Form */}
      <section className="py-12 md:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-float p-6 md:p-8">
            {/* Step 1: Shape Selector */}
            <div className="mb-8">
              <h2 className="font-display text-2xl font-bold text-reno-dark mb-4">
                Step 1: Select Shape
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {shapes.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => {
                      setShape(s.id);
                      setCalculated(false);
                    }}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      shape === s.id
                        ? 'border-primary bg-primary/5 shadow-float'
                        : 'border-slate-200 hover:border-primary/50'
                    }`}
                  >
                    <span
                      className={`material-symbols-outlined text-4xl mb-2 ${
                        shape === s.id ? 'text-primary' : 'text-slate-400'
                      }`}
                      style={shape === s.id ? { fontVariationSettings: "'FILL' 1" } : {}}
                    >
                      {s.icon}
                    </span>
                    <div className="font-display font-semibold text-reno-dark">{s.label}</div>
                    <div className="text-xs text-slate-600 mt-1">{s.description}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Dimensions */}
            <div className="mb-8">
              <h2 className="font-display text-2xl font-bold text-reno-dark mb-4">
                Step 2: Enter Dimensions
              </h2>

              {(shape === 'slab' || shape === 'footing') && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Length
                    </label>
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={dimensions.lengthFeet}
                          onChange={(e) => {
                            setDimensions({ ...dimensions, lengthFeet: parseFloat(e.target.value) || 0 });
                            setCalculated(false);
                          }}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                          placeholder="0"
                        />
                        <span className="text-xs text-slate-500 mt-1 block">Feet</span>
                      </div>
                      <div className="flex-1">
                        <input
                          type="number"
                          min="0"
                          max="11"
                          step="1"
                          value={dimensions.lengthInches}
                          onChange={(e) => {
                            setDimensions({ ...dimensions, lengthInches: parseFloat(e.target.value) || 0 });
                            setCalculated(false);
                          }}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                          placeholder="0"
                        />
                        <span className="text-xs text-slate-500 mt-1 block">Inches</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Width
                    </label>
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={dimensions.widthFeet}
                          onChange={(e) => {
                            setDimensions({ ...dimensions, widthFeet: parseFloat(e.target.value) || 0 });
                            setCalculated(false);
                          }}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                          placeholder="0"
                        />
                        <span className="text-xs text-slate-500 mt-1 block">Feet</span>
                      </div>
                      <div className="flex-1">
                        <input
                          type="number"
                          min="0"
                          max="11"
                          step="1"
                          value={dimensions.widthInches}
                          onChange={(e) => {
                            setDimensions({ ...dimensions, widthInches: parseFloat(e.target.value) || 0 });
                            setCalculated(false);
                          }}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                          placeholder="0"
                        />
                        <span className="text-xs text-slate-500 mt-1 block">Inches</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {shape === 'slab' ? 'Thickness' : 'Depth'}
                    </label>
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={dimensions.depthFeet}
                          onChange={(e) => {
                            setDimensions({ ...dimensions, depthFeet: parseFloat(e.target.value) || 0 });
                            setCalculated(false);
                          }}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                          placeholder="0"
                        />
                        <span className="text-xs text-slate-500 mt-1 block">Feet</span>
                      </div>
                      <div className="flex-1">
                        <input
                          type="number"
                          min="0"
                          max="11"
                          step="1"
                          value={dimensions.depthInches}
                          onChange={(e) => {
                            setDimensions({ ...dimensions, depthInches: parseFloat(e.target.value) || 0 });
                            setCalculated(false);
                          }}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                          placeholder="4"
                        />
                        <span className="text-xs text-slate-500 mt-1 block">Inches</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {shape === 'column' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Diameter (inches)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="1"
                      value={dimensions.diameter}
                      onChange={(e) => {
                        setDimensions({ ...dimensions, diameter: parseFloat(e.target.value) || 0 });
                        setCalculated(false);
                      }}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="12"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Height
                    </label>
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={dimensions.depthFeet}
                          onChange={(e) => {
                            setDimensions({ ...dimensions, depthFeet: parseFloat(e.target.value) || 0 });
                            setCalculated(false);
                          }}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                          placeholder="0"
                        />
                        <span className="text-xs text-slate-500 mt-1 block">Feet</span>
                      </div>
                      <div className="flex-1">
                        <input
                          type="number"
                          min="0"
                          max="11"
                          step="1"
                          value={dimensions.depthInches}
                          onChange={(e) => {
                            setDimensions({ ...dimensions, depthInches: parseFloat(e.target.value) || 0 });
                            setCalculated(false);
                          }}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                          placeholder="0"
                        />
                        <span className="text-xs text-slate-500 mt-1 block">Inches</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {shape === 'steps' && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Rise per Step (inches)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.5"
                      value={dimensions.rise}
                      onChange={(e) => {
                        setDimensions({ ...dimensions, rise: parseFloat(e.target.value) || 0 });
                        setCalculated(false);
                      }}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="7"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Run per Step (inches)
                    </label>
                    <input
                      type="number"
                      min="0"
                      step="0.5"
                      value={dimensions.run}
                      onChange={(e) => {
                        setDimensions({ ...dimensions, run: parseFloat(e.target.value) || 0 });
                        setCalculated(false);
                      }}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="11"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Number of Steps
                    </label>
                    <input
                      type="number"
                      min="1"
                      step="1"
                      value={dimensions.numberOfSteps}
                      onChange={(e) => {
                        setDimensions({ ...dimensions, numberOfSteps: parseInt(e.target.value) || 0 });
                        setCalculated(false);
                      }}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="5"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Width
                    </label>
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <input
                          type="number"
                          min="0"
                          step="1"
                          value={dimensions.widthFeet}
                          onChange={(e) => {
                            setDimensions({ ...dimensions, widthFeet: parseFloat(e.target.value) || 0 });
                            setCalculated(false);
                          }}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                          placeholder="0"
                        />
                        <span className="text-xs text-slate-500 mt-1 block">Feet</span>
                      </div>
                      <div className="flex-1">
                        <input
                          type="number"
                          min="0"
                          max="11"
                          step="1"
                          value={dimensions.widthInches}
                          onChange={(e) => {
                            setDimensions({ ...dimensions, widthInches: parseFloat(e.target.value) || 0 });
                            setCalculated(false);
                          }}
                          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                          placeholder="0"
                        />
                        <span className="text-xs text-slate-500 mt-1 block">Inches</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Step 3: Quantity & Waste */}
            <div className="mb-8">
              <h2 className="font-display text-2xl font-bold text-reno-dark mb-4">
                Step 3: Quantity & Waste Factor
              </h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Quantity (how many {shape}s?)
                  </label>
                  <input
                    type="number"
                    min="1"
                    step="1"
                    value={quantity}
                    onChange={(e) => {
                      setQuantity(parseInt(e.target.value) || 1);
                      setCalculated(false);
                    }}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="1"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Waste Factor
                  </label>
                  <div className="grid grid-cols-4 gap-3">
                    {wasteOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          setWasteFactor(option.value);
                          setCalculated(false);
                        }}
                        className={`px-4 py-3 rounded-lg border-2 font-semibold transition-all ${
                          wasteFactor === option.value
                            ? 'border-primary bg-primary text-white'
                            : 'border-slate-200 text-slate-700 hover:border-primary/50'
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 mt-2">
                    Recommended: 10% for standard pours, 15% for complex shapes
                  </p>
                </div>
              </div>
            </div>

            {/* Calculate Button */}
            <button
              onClick={handleCalculate}
              className="w-full bg-primary hover:bg-primary/90 text-white font-display font-semibold text-lg px-8 py-4 rounded-lg shadow-float hover:shadow-float-hover transition-all"
            >
              Calculate Concrete Needed
            </button>
          </div>
        </div>
      </section>

      {/* Results Section */}
      {calculated && result && (
        <section className="py-12 md:py-16 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="material-symbols-outlined text-primary text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  check_circle
                </span>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-reno-dark">
                  {result.cubicYards} yd³
                </h2>
              </div>
              <p className="text-lg text-slate-700">
                Total concrete needed (includes {wasteFactor}% waste factor)
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="bg-[#f6f8f8] rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    straighten
                  </span>
                  <div>
                    <div className="text-sm text-slate-600 mb-1">Volume</div>
                    <div className="font-display text-2xl font-bold text-reno-dark">
                      {result.cubicFeet} ft³
                    </div>
                    <div className="text-sm text-slate-600 mt-1">
                      {result.cubicMeters} m³
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#f6f8f8] rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    shopping_bag
                  </span>
                  <div>
                    <div className="text-sm text-slate-600 mb-1">Bags Needed</div>
                    <div className="font-display text-2xl font-bold text-reno-dark">
                      {result.bags80lb}
                    </div>
                    <div className="text-xs text-slate-600 mt-1">
                      80lb bags ({result.bags60lb} × 60lb or {result.bags40kg} × 40kg)
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#f6f8f8] rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    local_shipping
                  </span>
                  <div>
                    <div className="text-sm text-slate-600 mb-1">Ready-Mix Trucks</div>
                    <div className="font-display text-2xl font-bold text-reno-dark">
                      {result.trucksNeeded}
                    </div>
                    <div className="text-sm text-slate-600 mt-1">
                      {result.trucksNeeded === 1 ? 'truck' : 'trucks'} (8 yd³ capacity)
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#f6f8f8] rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-[#E8AA42] text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    payments
                  </span>
                  <div>
                    <div className="text-sm text-slate-600 mb-1">Estimated Cost</div>
                    <div className="font-display text-2xl font-bold text-reno-dark">
                      ${result.costMin.toLocaleString()} - ${result.costMax.toLocaleString()}
                    </div>
                    <div className="text-sm text-slate-600 mt-1">
                      Ready-mix in Ontario
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#f6f8f8] rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    scale
                  </span>
                  <div>
                    <div className="text-sm text-slate-600 mb-1">Total Weight</div>
                    <div className="font-display text-2xl font-bold text-reno-dark">
                      {result.weightTonnes} tonnes
                    </div>
                    <div className="text-sm text-slate-600 mt-1">
                      Approximate
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#f6f8f8] rounded-xl p-6">
                <div className="flex items-start gap-3">
                  <span className="material-symbols-outlined text-primary text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                    add_circle
                  </span>
                  <div>
                    <div className="text-sm text-slate-600 mb-1">Waste Included</div>
                    <div className="font-display text-2xl font-bold text-reno-dark">
                      {result.wasteAmount} yd³
                    </div>
                    <div className="text-sm text-slate-600 mt-1">
                      {wasteFactor}% waste factor
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <button
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary text-primary font-semibold rounded-lg hover:bg-primary hover:text-white transition-all"
              >
                <span className="material-symbols-outlined">print</span>
                Print Results
              </button>
            </div>
          </div>
        </section>
      )}

      {/* Helpful Tips */}
      <section className="py-12 md:py-16 bg-[#f6f8f8]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-reno-dark text-center mb-10">
            Helpful Tips
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-float">
              <span className="material-symbols-outlined text-primary text-4xl mb-3" style={{ fontVariationSettings: "'FILL' 1" }}>
                info
              </span>
              <h3 className="font-display font-semibold text-lg text-reno-dark mb-2">
                Order Extra
              </h3>
              <p className="text-slate-700 text-sm">
                Always order 5-10% extra for waste and spillage. Running short mid-pour can be costly.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-float">
              <span className="material-symbols-outlined text-primary text-4xl mb-3" style={{ fontVariationSettings: "'FILL' 1" }}>
                height
              </span>
              <h3 className="font-display font-semibold text-lg text-reno-dark mb-2">
                Standard Thickness
              </h3>
              <p className="text-slate-700 text-sm">
                Standard slabs are 4 inches thick, garage slabs 6 inches, and driveways typically 4-6 inches.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-float">
              <span className="material-symbols-outlined text-primary text-4xl mb-3" style={{ fontVariationSettings: "'FILL' 1" }}>
                local_shipping
              </span>
              <h3 className="font-display font-semibold text-lg text-reno-dark mb-2">
                Truck Capacity
              </h3>
              <p className="text-slate-700 text-sm">
                Ready-mix trucks typically carry 8-10 cubic yards. Plan access and timing accordingly.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-float">
              <span className="material-symbols-outlined text-[#E8AA42] text-4xl mb-3" style={{ fontVariationSettings: "'FILL' 1" }}>
                attach_money
              </span>
              <h3 className="font-display font-semibold text-lg text-reno-dark mb-2">
                Ontario Pricing
              </h3>
              <p className="text-slate-700 text-sm">
                Concrete costs $180-$220/yd³ for ready-mix in Ontario. Prices vary by location and delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Related Tools */}
      <section className="py-12 md:py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-display text-3xl font-bold text-reno-dark text-center mb-10">
            Related Tools & Resources
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            <Link
              href="/costs/concrete-works"
              className="group bg-[#f6f8f8] rounded-xl p-6 hover:shadow-float transition-all"
            >
              <span className="material-symbols-outlined text-primary text-4xl mb-3 group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>
                payments
              </span>
              <h3 className="font-display font-semibold text-lg text-reno-dark mb-2">
                Concrete Pricing
              </h3>
              <p className="text-slate-700 text-sm mb-3">
                See detailed concrete pricing by city across Ontario.
              </p>
              <span className="text-primary font-semibold text-sm">
                View Pricing →
              </span>
            </Link>

            <Link
              href="/apps/the-proof"
              className="group bg-[#f6f8f8] rounded-xl p-6 hover:shadow-float transition-all"
            >
              <span className="material-symbols-outlined text-primary text-4xl mb-3 group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
              <h3 className="font-display font-semibold text-lg text-reno-dark mb-2">
                Track Pours
              </h3>
              <p className="text-slate-700 text-sm mb-3">
                Document your concrete pour with The Proof app.
              </p>
              <span className="text-primary font-semibold text-sm">
                Learn More →
              </span>
            </Link>

            <Link
              href="/contracts"
              className="group bg-[#f6f8f8] rounded-xl p-6 hover:shadow-float transition-all"
            >
              <span className="material-symbols-outlined text-primary text-4xl mb-3 group-hover:scale-110 transition-transform" style={{ fontVariationSettings: "'FILL' 1" }}>
                description
              </span>
              <h3 className="font-display font-semibold text-lg text-reno-dark mb-2">
                Generate Contract
              </h3>
              <p className="text-slate-700 text-sm mb-3">
                Create a professional concrete work contract.
              </p>
              <span className="text-primary font-semibold text-sm">
                Get Started →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-20 bg-reno-dark text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-4">
            Need a Pro for Your Concrete Project?
          </h2>
          <p className="text-lg text-slate-300 mb-8">
            Browse verified concrete contractors with transparent pricing and proof of work.
          </p>
          <Link
            href="/pros"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-display font-semibold text-lg px-8 py-4 rounded-lg shadow-float hover:shadow-float-hover transition-all"
          >
            Browse Contractors
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
