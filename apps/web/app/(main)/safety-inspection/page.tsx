'use client';

import { useState } from 'react';
import Link from 'next/link';

const inspectionTypes = [
  {
    id: 'ladder',
    name: 'Ladder Inspection',
    icon: 'stairs',
    items: [
      { id: 'l1', text: 'Ladder is in good condition with no visible damage' },
      { id: 'l2', text: 'All rungs, steps, and rails are secure' },
      { id: 'l3', text: 'Non-slip feet/pads are in place and functional' },
      { id: 'l4', text: 'Ladder is set up on stable, level surface' },
      { id: 'l5', text: 'Extension ladder extends 3 feet above landing' },
      { id: 'l6', text: 'Ladder is tied off or secured at top' },
      { id: 'l7', text: 'No electrical hazards within 3 metres' },
      { id: 'l8', text: 'Worker maintains 3-point contact' },
    ],
  },
  {
    id: 'scaffold',
    name: 'Scaffold Inspection',
    icon: 'view_column',
    items: [
      { id: 's1', text: 'Scaffold erected by competent worker' },
      { id: 's2', text: 'Base plates and mudsills are in place' },
      { id: 's3', text: 'All cross braces are in place and pinned' },
      { id: 's4', text: 'Guardrails installed on all open sides (top rail, mid rail, toe board)' },
      { id: 's5', text: 'Planking is in good condition, secured, and fully decked' },
      { id: 's6', text: 'Access ladder is provided and secured' },
      { id: 's7', text: 'Scaffold is plumb, level, and square' },
      { id: 's8', text: 'Scaffold is tied to building at required intervals' },
      { id: 's9', text: 'No overloading — materials stored safely' },
    ],
  },
  {
    id: 'excavation',
    name: 'Excavation Inspection',
    icon: 'landscape',
    items: [
      { id: 'e1', text: 'Locate request completed (Ontario One Call)' },
      { id: 'e2', text: 'Shoring/sloping/benching installed per soil type' },
      { id: 'e3', text: 'Excavation edges free of spoil piles within 1 metre' },
      { id: 'e4', text: 'Barricades/guardrails installed around excavation' },
      { id: 'e5', text: 'Access/egress provided within 8 metres of any worker' },
      { id: 'e6', text: 'No water accumulation in excavation' },
      { id: 'e7', text: 'Adjacent structures monitored for movement' },
      { id: 'e8', text: 'Competent supervisor present when workers enter' },
    ],
  },
  {
    id: 'electrical',
    name: 'Electrical Safety',
    icon: 'bolt',
    items: [
      { id: 'el1', text: 'All electrical panels are accessible and labeled' },
      { id: 'el2', text: 'GFCI protection on all temporary power' },
      { id: 'el3', text: 'Extension cords in good condition, no damage' },
      { id: 'el4', text: 'Lockout/tagout procedures followed' },
      { id: 'el5', text: 'Minimum clearance from overhead power lines maintained' },
      { id: 'el6', text: 'Temporary wiring properly supported and protected' },
      { id: 'el7', text: 'Wet areas have appropriate electrical protection' },
    ],
  },
  {
    id: 'fall',
    name: 'Fall Protection',
    icon: 'trending_down',
    items: [
      { id: 'f1', text: 'Fall protection provided at heights over 3 metres' },
      { id: 'f2', text: 'Guardrails in place on all open edges' },
      { id: 'f3', text: 'Harness and lanyard inspected before use' },
      { id: 'f4', text: 'Anchor points rated for 22.2 kN (5,000 lbs)' },
      { id: 'f5', text: 'Fall protection plan posted and reviewed with crew' },
      { id: 'f6', text: 'Floor/roof openings covered and marked' },
      { id: 'f7', text: 'Workers trained in fall protection requirements' },
      { id: 'f8', text: 'Rescue plan in place for fall arrest systems' },
    ],
  },
  {
    id: 'housekeeping',
    name: 'Housekeeping & PPE',
    icon: 'cleaning_services',
    items: [
      { id: 'h1', text: 'Work area clean and free of trip hazards' },
      { id: 'h2', text: 'Walkways and access routes clear' },
      { id: 'h3', text: 'Waste disposed of properly, bins not overflowing' },
      { id: 'h4', text: 'All workers wearing required PPE (hard hat, boots, vest)' },
      { id: 'h5', text: 'Eye and hearing protection used where required' },
      { id: 'h6', text: 'First aid kit accessible and stocked' },
      { id: 'h7', text: 'Fire extinguisher accessible and inspected' },
      { id: 'h8', text: 'Material storage organized and stable' },
    ],
  },
  {
    id: 'fire',
    name: 'Fire Prevention',
    icon: 'local_fire_department',
    items: [
      { id: 'fi1', text: 'Hot work permit obtained for welding/cutting' },
      { id: 'fi2', text: 'Fire watch posted during and 30 min after hot work' },
      { id: 'fi3', text: 'Fire extinguisher within 6 metres of hot work' },
      { id: 'fi4', text: 'Combustible materials removed or protected' },
      { id: 'fi5', text: 'Emergency exits clear and marked' },
      { id: 'fi6', text: 'Propane tanks stored upright and secured' },
      { id: 'fi7', text: 'No smoking signs posted in restricted areas' },
    ],
  },
  {
    id: 'ppe',
    name: 'PPE Compliance',
    icon: 'safety',
    items: [
      { id: 'p1', text: 'CSA-approved hard hats worn by all workers' },
      { id: 'p2', text: 'CSA Grade 1 safety boots worn on site' },
      { id: 'p3', text: 'High-visibility vests/clothing worn' },
      { id: 'p4', text: 'Safety glasses worn where required' },
      { id: 'p5', text: 'Hearing protection used in high-noise areas' },
      { id: 'p6', text: 'Gloves appropriate for task being performed' },
      { id: 'p7', text: 'Respiratory protection used where required' },
      { id: 'p8', text: 'All PPE in good condition, not damaged' },
    ],
  },
];

export default function SafetyInspectionPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [inspectorName, setInspectorName] = useState('');
  const [siteAddress, setSiteAddress] = useState('');
  const [inspectionDate, setInspectionDate] = useState('');
  const [projectName, setProjectName] = useState('');
  const [responses, setResponses] = useState<Record<string, 'pass' | 'fail' | 'na'>>({});
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const selectedInspection = inspectionTypes.find((t) => t.id === selectedType);

  const handleResponse = (itemId: string, response: 'pass' | 'fail' | 'na') => {
    setResponses((prev) => ({ ...prev, [itemId]: response }));
    if (response !== 'fail') {
      // Clear notes if not fail
      setNotes((prev) => {
        const updated = { ...prev };
        delete updated[itemId];
        return updated;
      });
    }
  };

  const handleNote = (itemId: string, note: string) => {
    setNotes((prev) => ({ ...prev, [itemId]: note }));
  };

  const calculateProgress = () => {
    if (!selectedInspection) return 0;
    const totalItems = selectedInspection.items.length;
    const completedItems = selectedInspection.items.filter((item) => responses[item.id]).length;
    return Math.round((completedItems / totalItems) * 100);
  };

  const isComplete = () => {
    if (!selectedInspection) return false;
    return selectedInspection.items.every((item) => responses[item.id]);
  };

  const generateReport = () => {
    setShowResults(true);
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const resetInspection = () => {
    setSelectedType(null);
    setInspectorName('');
    setSiteAddress('');
    setInspectionDate('');
    setProjectName('');
    setResponses({});
    setNotes({});
    setShowResults(false);
  };

  const calculateScore = () => {
    if (!selectedInspection) return { pass: 0, fail: 0, na: 0, score: 0 };
    const pass = selectedInspection.items.filter((item) => responses[item.id] === 'pass').length;
    const fail = selectedInspection.items.filter((item) => responses[item.id] === 'fail').length;
    const na = selectedInspection.items.filter((item) => responses[item.id] === 'na').length;
    const score = pass + fail > 0 ? Math.round((pass / (pass + fail)) * 100) : 0;
    return { pass, fail, na, score };
  };

  return (
    <>
      <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #print-report,
          #print-report * {
            visibility: visible;
          }
          #print-report {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
          }
          .no-print {
            display: none !important;
          }
        }
      `}</style>

      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-[#f6f8f8] py-20">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-reno-dark mb-6">
              Safety Inspection Checklist
            </h1>
            <p className="text-xl text-slate-700 mb-6">
              OHSA-aligned construction safety checklists. Select an inspection type, complete the
              checklist, and print your report.
            </p>
            <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-float text-sm">
              <span className="material-symbols-outlined text-primary text-lg">verified</span>
              <span className="text-slate-700">
                Free Tool — 8 Inspection Types — Ontario OHSA Aligned
              </span>
            </div>
          </div>
        </section>

        {showResults && selectedInspection ? (
          // Results / Printable Report Section
          <section className="py-16">
            <div className="max-w-4xl mx-auto px-4">
              <div id="print-report" className="bg-white rounded-xl shadow-float p-8">
                {/* Report Header */}
                <div className="border-b-2 border-slate-200 pb-6 mb-6">
                  <h2 className="text-3xl font-display font-bold text-reno-dark mb-4">
                    {selectedInspection.name} Report
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="font-semibold text-slate-700">Inspector:</span>{' '}
                      <span className="text-slate-600">{inspectorName || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-700">Date:</span>{' '}
                      <span className="text-slate-600">{inspectionDate || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-700">Site Address:</span>{' '}
                      <span className="text-slate-600">{siteAddress || 'N/A'}</span>
                    </div>
                    <div>
                      <span className="font-semibold text-slate-700">Project:</span>{' '}
                      <span className="text-slate-600">{projectName || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-[#f6f8f8] rounded-lg p-6 mb-8">
                  <h3 className="text-xl font-display font-bold text-reno-dark mb-4">
                    Inspection Summary
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-reno-green-600">
                        {calculateScore().pass}
                      </div>
                      <div className="text-sm text-slate-600">Pass</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-600">{calculateScore().fail}</div>
                      <div className="text-sm text-slate-600">Fail</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-slate-500">{calculateScore().na}</div>
                      <div className="text-sm text-slate-600">N/A</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary">
                        {calculateScore().score}%
                      </div>
                      <div className="text-sm text-slate-600">Score</div>
                    </div>
                  </div>
                </div>

                {/* Detailed Results */}
                <div className="space-y-4 mb-8">
                  <h3 className="text-xl font-display font-bold text-reno-dark mb-4">
                    Detailed Results
                  </h3>
                  {selectedInspection.items.map((item) => {
                    const response = responses[item.id];
                    const note = notes[item.id];
                    return (
                      <div
                        key={item.id}
                        className={`border-l-4 p-4 rounded-r-lg ${
                          response === 'pass'
                            ? 'border-reno-green-500 bg-reno-green-50'
                            : response === 'fail'
                              ? 'border-red-500 bg-red-50'
                              : 'border-slate-400 bg-slate-50'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <p className="text-slate-800 mb-1">{item.text}</p>
                            {note && (
                              <div className="mt-2 text-sm text-slate-600 bg-white p-2 rounded">
                                <span className="font-semibold">Note:</span> {note}
                              </div>
                            )}
                          </div>
                          <div
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${
                              response === 'pass'
                                ? 'bg-reno-green-600 text-white'
                                : response === 'fail'
                                  ? 'bg-red-600 text-white'
                                  : 'bg-slate-500 text-white'
                            }`}
                          >
                            {response?.toUpperCase()}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap gap-4 justify-center no-print pt-6 border-t-2 border-slate-200">
                  <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-float hover:shadow-float-hover"
                  >
                    <span className="material-symbols-outlined">print</span>
                    Print Report
                  </button>
                  <button
                    onClick={resetInspection}
                    className="flex items-center gap-2 px-6 py-3 bg-white text-reno-dark rounded-lg hover:bg-slate-50 transition-colors border-2 border-slate-300"
                  >
                    <span className="material-symbols-outlined">refresh</span>
                    New Inspection
                  </button>
                </div>
              </div>
            </div>
          </section>
        ) : !selectedType ? (
          // Inspection Type Selector
          <section className="py-16 bg-white">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl font-display font-bold text-reno-dark text-center mb-12">
                Select Inspection Type
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {inspectionTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className="bg-white border-2 border-slate-200 rounded-xl p-6 hover:border-primary hover:-translate-y-1 hover:shadow-float-hover transition-all duration-200 text-left"
                  >
                    <span
                      className="material-symbols-outlined text-primary text-4xl mb-4 block"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {type.icon}
                    </span>
                    <h3 className="font-display font-bold text-reno-dark text-lg mb-2">
                      {type.name}
                    </h3>
                    <p className="text-sm text-slate-600">{type.items.length} checklist items</p>
                  </button>
                ))}
              </div>
            </div>
          </section>
        ) : (
          // Checklist Section
          <section className="py-16 bg-white">
            <div className="max-w-4xl mx-auto px-4">
              {/* Back Button */}
              <button
                onClick={() => setSelectedType(null)}
                className="flex items-center gap-2 text-primary hover:text-primary/80 mb-8 transition-colors"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                <span>Change Inspection Type</span>
              </button>

              {/* Header Info Form */}
              <div className="bg-[#f6f8f8] rounded-xl p-6 mb-8">
                <h2 className="text-2xl font-display font-bold text-reno-dark mb-6">
                  {selectedInspection?.name}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Inspector Name
                    </label>
                    <input
                      type="text"
                      value={inspectorName}
                      onChange={(e) => setInspectorName(e.target.value)}
                      className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-primary transition-colors"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Inspection Date
                    </label>
                    <input
                      type="date"
                      value={inspectionDate}
                      onChange={(e) => setInspectionDate(e.target.value)}
                      className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Site Address
                    </label>
                    <input
                      type="text"
                      value={siteAddress}
                      onChange={(e) => setSiteAddress(e.target.value)}
                      className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-primary transition-colors"
                      placeholder="123 Main St, Toronto, ON"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Project Name
                    </label>
                    <input
                      type="text"
                      value={projectName}
                      onChange={(e) => setProjectName(e.target.value)}
                      className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-primary transition-colors"
                      placeholder="Residential Renovation"
                    />
                  </div>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-slate-700">Progress</span>
                  <span className="text-sm font-semibold text-primary">
                    {calculateProgress()}%
                  </span>
                </div>
                <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${calculateProgress()}%` }}
                  />
                </div>
              </div>

              {/* Checklist Items */}
              <div className="space-y-4 mb-8">
                {selectedInspection?.items.map((item, index) => (
                  <div key={item.id} className="bg-white border-2 border-slate-200 rounded-xl p-6">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="flex-shrink-0 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-primary">{index + 1}</span>
                      </div>
                      <p className="flex-1 text-slate-800 pt-1">{item.text}</p>
                    </div>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => handleResponse(item.id, 'pass')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                          responses[item.id] === 'pass'
                            ? 'bg-reno-green-600 text-white border-reno-green-600'
                            : 'bg-white text-slate-700 border-slate-300 hover:border-reno-green-600'
                        }`}
                      >
                        <span className="material-symbols-outlined text-lg">check_circle</span>
                        Pass
                      </button>
                      <button
                        onClick={() => handleResponse(item.id, 'fail')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                          responses[item.id] === 'fail'
                            ? 'bg-red-600 text-white border-red-600'
                            : 'bg-white text-slate-700 border-slate-300 hover:border-red-600'
                        }`}
                      >
                        <span className="material-symbols-outlined text-lg">cancel</span>
                        Fail
                      </button>
                      <button
                        onClick={() => handleResponse(item.id, 'na')}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                          responses[item.id] === 'na'
                            ? 'bg-slate-500 text-white border-slate-500'
                            : 'bg-white text-slate-700 border-slate-300 hover:border-slate-500'
                        }`}
                      >
                        <span className="material-symbols-outlined text-lg">remove_circle</span>
                        N/A
                      </button>
                    </div>
                    {responses[item.id] === 'fail' && (
                      <div className="mt-4">
                        <label className="block text-sm font-semibold text-slate-700 mb-2">
                          Notes (required for failed items)
                        </label>
                        <textarea
                          value={notes[item.id] || ''}
                          onChange={(e) => handleNote(item.id, e.target.value)}
                          className="w-full px-4 py-2 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-primary transition-colors resize-none"
                          rows={3}
                          placeholder="Describe the issue and corrective action required..."
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Generate Report Button */}
              {isComplete() && (
                <div className="flex justify-center">
                  <button
                    onClick={generateReport}
                    className="flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-float hover:shadow-float-hover text-lg font-semibold"
                  >
                    <span className="material-symbols-outlined">description</span>
                    Generate Report
                  </button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Cross-links Section */}
        {!showResults && (
          <section className="bg-[#f6f8f8] py-16">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl font-display font-bold text-reno-dark text-center mb-12">
                More Safety Tools
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <Link
                  href="/jsa"
                  className="bg-white rounded-xl p-8 shadow-float hover:shadow-float-hover hover:-translate-y-1 transition-all duration-200"
                >
                  <span
                    className="material-symbols-outlined text-primary text-4xl mb-4 block"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    assignment
                  </span>
                  <h3 className="font-display font-bold text-xl text-reno-dark mb-2">
                    JSA Generator
                  </h3>
                  <p className="text-slate-600">
                    Create job safety analysis documents with hazard identification and controls.
                  </p>
                </Link>
                <Link
                  href="/toolbox-talk"
                  className="bg-white rounded-xl p-8 shadow-float hover:shadow-float-hover hover:-translate-y-1 transition-all duration-200"
                >
                  <span
                    className="material-symbols-outlined text-primary text-4xl mb-4 block"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    groups
                  </span>
                  <h3 className="font-display font-bold text-xl text-reno-dark mb-2">
                    Toolbox Talk Generator
                  </h3>
                  <p className="text-slate-600">
                    Generate safety meeting content with sign-in sheets and discussion points.
                  </p>
                </Link>
                <Link
                  href="/apps/safety-hub"
                  className="bg-white rounded-xl p-8 shadow-float hover:shadow-float-hover hover:-translate-y-1 transition-all duration-200"
                >
                  <span
                    className="material-symbols-outlined text-primary text-4xl mb-4 block"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    health_and_safety
                  </span>
                  <h3 className="font-display font-bold text-xl text-reno-dark mb-2">
                    Full Safety Platform
                  </h3>
                  <p className="text-slate-600">
                    Complete safety management system with training, inspections, and compliance.
                  </p>
                </Link>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        {!showResults && (
          <section className="bg-reno-dark py-20">
            <div className="max-w-4xl mx-auto px-4 text-center">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-6">
                Need a complete safety management platform?
              </h2>
              <p className="text-xl text-slate-300 mb-8">
                SafetyHub provides training, inspections, incident tracking, and compliance tools
                all in one place.
              </p>
              <Link
                href="/apps/safety-hub"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors shadow-float hover:shadow-float-hover text-lg font-semibold"
              >
                <span>Explore SafetyHub</span>
                <span className="material-symbols-outlined">arrow_forward</span>
              </Link>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
