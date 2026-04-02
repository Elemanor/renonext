'use client';

import { useState } from 'react';
import Link from 'next/link';

interface CrewEntry {
  trade: string;
  count: number;
  hours: number;
}

export default function DailyReportPage() {
  // Project Information
  const [projectName, setProjectName] = useState('');
  const [projectAddress, setProjectAddress] = useState('');
  const [reportDate, setReportDate] = useState('');
  const [reportNumber, setReportNumber] = useState('');
  const [preparedBy, setPreparedBy] = useState('');

  // Weather Conditions
  const [weather, setWeather] = useState<'sunny' | 'cloudy' | 'rainy' | 'snow' | 'windy' | ''>('');
  const [temperature, setTemperature] = useState('');
  const [windSpeed, setWindSpeed] = useState('');

  // Crew
  const [crewEntries, setCrewEntries] = useState<CrewEntry[]>([
    { trade: '', count: 0, hours: 0 },
    { trade: '', count: 0, hours: 0 },
    { trade: '', count: 0, hours: 0 },
  ]);

  // Work Details
  const [workCompleted, setWorkCompleted] = useState('');
  const [materialsReceived, setMaterialsReceived] = useState('');
  const [equipmentOnSite, setEquipmentOnSite] = useState('');

  // Delays
  const [delays, setDelays] = useState('');
  const [delayHours, setDelayHours] = useState('');

  // Safety & Visitors
  const [safetyNotes, setSafetyNotes] = useState('');
  const [visitorLog, setVisitorLog] = useState('');

  // Tomorrow
  const [tomorrowPlan, setTomorrowPlan] = useState('');

  // Preview
  const [showPreview, setShowPreview] = useState(false);

  const weatherOptions = [
    { value: 'sunny', label: 'Sunny', icon: 'wb_sunny' },
    { value: 'cloudy', label: 'Cloudy', icon: 'cloud' },
    { value: 'rainy', label: 'Rainy', icon: 'rainy' },
    { value: 'snow', label: 'Snow', icon: 'ac_unit' },
    { value: 'windy', label: 'Windy', icon: 'air' },
  ];

  const addCrewRow = () => {
    setCrewEntries([...crewEntries, { trade: '', count: 0, hours: 0 }]);
  };

  const updateCrewEntry = (index: number, field: keyof CrewEntry, value: string | number) => {
    const updated = [...crewEntries];
    updated[index] = { ...updated[index], [field]: value };
    setCrewEntries(updated);
  };

  const removeCrewEntry = (index: number) => {
    if (crewEntries.length > 1) {
      setCrewEntries(crewEntries.filter((_, i) => i !== index));
    }
  };

  const totalWorkers = crewEntries.reduce((sum, entry) => sum + (entry.count || 0), 0);
  const totalManHours = crewEntries.reduce((sum, entry) => sum + (entry.count || 0) * (entry.hours || 0), 0);

  const handlePreview = () => {
    setShowPreview(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <style jsx global>{`
        @media print {
          nav,
          footer,
          .no-print,
          .print-hide {
            display: none !important;
          }
          .print-show {
            display: block !important;
          }
          body {
            background: white !important;
          }
          .print-page-break {
            page-break-after: always;
          }
        }
      `}</style>

      <div className="min-h-screen bg-[#f6f8f8]">
        {/* Hero Section */}
        <section className="bg-[#f6f8f8] py-16 print-hide">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-float mb-6">
              <span className="material-symbols-outlined text-primary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
              <span className="text-xs font-semibold text-reno-dark">
                Free Tool — Ontario Construction Standard
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-reno-dark mb-6">
              Daily Field Report Generator
            </h1>
            <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto mb-8">
              Create professional daily construction reports in minutes. Fill in your site data, preview, and print — free, no sign-up.
            </p>
          </div>
        </section>

        {/* Report Form */}
        {!showPreview ? (
          <section className="py-12 print-hide">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              <div className="bg-white rounded-2xl shadow-float p-6 sm:p-8 lg:p-10">
                {/* A) Project Information */}
                <div className="mb-10">
                  <h2 className="text-lg font-bold text-reno-dark mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                      location_city
                    </span>
                    Project Information
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-semibold text-reno-dark mb-1.5 block">
                        Project Name
                      </label>
                      <input
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        placeholder="e.g., 123 Main Street Renovation"
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-reno-dark mb-1.5 block">
                        Project Address
                      </label>
                      <input
                        type="text"
                        value={projectAddress}
                        onChange={(e) => setProjectAddress(e.target.value)}
                        placeholder="e.g., 123 Main Street, Toronto, ON"
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-semibold text-reno-dark mb-1.5 block">
                          Report Date
                        </label>
                        <input
                          type="date"
                          value={reportDate}
                          onChange={(e) => setReportDate(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-semibold text-reno-dark mb-1.5 block">
                          Report Number
                        </label>
                        <input
                          type="number"
                          value={reportNumber}
                          onChange={(e) => setReportNumber(e.target.value)}
                          placeholder="e.g., 001"
                          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-reno-dark mb-1.5 block">
                        Prepared By
                      </label>
                      <input
                        type="text"
                        value={preparedBy}
                        onChange={(e) => setPreparedBy(e.target.value)}
                        placeholder="e.g., John Smith, Site Supervisor"
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* B) Weather Conditions */}
                <div className="mb-10">
                  <h2 className="text-lg font-bold text-reno-dark mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                      wb_cloudy
                    </span>
                    Weather Conditions
                  </h2>

                  <div className="mb-4">
                    <label className="text-sm font-semibold text-reno-dark mb-1.5 block">
                      Weather Type
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                      {weatherOptions.map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setWeather(option.value as any)}
                          className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                            weather === option.value
                              ? 'border-primary bg-primary/5'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <span className="material-symbols-outlined text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                            {option.icon}
                          </span>
                          <span className="text-xs font-semibold text-reno-dark">
                            {option.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-reno-dark mb-1.5 block">
                        Temperature (°C)
                      </label>
                      <input
                        type="number"
                        value={temperature}
                        onChange={(e) => setTemperature(e.target.value)}
                        placeholder="e.g., 22"
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-semibold text-reno-dark mb-1.5 block">
                        Wind Speed (km/h)
                      </label>
                      <input
                        type="number"
                        value={windSpeed}
                        onChange={(e) => setWindSpeed(e.target.value)}
                        placeholder="e.g., 15"
                        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                      />
                    </div>
                  </div>
                </div>

                {/* C) Crew On Site */}
                <div className="mb-10">
                  <h2 className="text-lg font-bold text-reno-dark mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                      groups
                    </span>
                    Crew On Site
                  </h2>

                  <div className="space-y-3">
                    {crewEntries.map((entry, index) => (
                      <div key={index} className="flex flex-col sm:flex-row gap-3">
                        <div className="flex-1">
                          <input
                            type="text"
                            value={entry.trade}
                            onChange={(e) => updateCrewEntry(index, 'trade', e.target.value)}
                            placeholder="Trade (e.g., Carpenters)"
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                          />
                        </div>
                        <div className="w-full sm:w-28">
                          <input
                            type="number"
                            value={entry.count || ''}
                            onChange={(e) => updateCrewEntry(index, 'count', parseInt(e.target.value) || 0)}
                            placeholder="Workers"
                            min="0"
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                          />
                        </div>
                        <div className="w-full sm:w-28">
                          <input
                            type="number"
                            value={entry.hours || ''}
                            onChange={(e) => updateCrewEntry(index, 'hours', parseInt(e.target.value) || 0)}
                            placeholder="Hours"
                            min="0"
                            step="0.5"
                            className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                          />
                        </div>
                        {crewEntries.length > 1 && (
                          <button
                            type="button"
                            onClick={() => removeCrewEntry(index)}
                            className="sm:w-12 h-12 flex items-center justify-center rounded-xl border border-slate-200 hover:border-red-300 hover:bg-red-50 transition-colors"
                          >
                            <span className="material-symbols-outlined text-red-500">
                              delete
                            </span>
                          </button>
                        )}
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={addCrewRow}
                    className="mt-4 flex items-center gap-2 px-4 py-2 rounded-xl border-2 border-dashed border-slate-300 hover:border-primary hover:bg-primary/5 transition-colors text-sm font-semibold text-reno-dark"
                  >
                    <span className="material-symbols-outlined text-primary">
                      add_circle
                    </span>
                    Add Crew
                  </button>

                  {totalWorkers > 0 && (
                    <div className="mt-4 p-4 bg-[#f6f8f8] rounded-xl">
                      <div className="flex justify-between text-sm font-semibold text-reno-dark">
                        <span>Total Workers:</span>
                        <span>{totalWorkers}</span>
                      </div>
                      <div className="flex justify-between text-sm font-semibold text-reno-dark mt-2">
                        <span>Total Man-Hours:</span>
                        <span>{totalManHours.toFixed(1)}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* D) Work Completed */}
                <div className="mb-10">
                  <h2 className="text-lg font-bold text-reno-dark mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                      task_alt
                    </span>
                    Work Completed Today
                  </h2>
                  <textarea
                    value={workCompleted}
                    onChange={(e) => setWorkCompleted(e.target.value)}
                    rows={4}
                    placeholder="Describe work completed today (e.g., Installed foundation formwork on north wall, poured 15 cubic meters of concrete, completed electrical rough-in for second floor)"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>

                {/* E) Materials Received */}
                <div className="mb-10">
                  <h2 className="text-lg font-bold text-reno-dark mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                      inventory_2
                    </span>
                    Materials Received
                  </h2>
                  <textarea
                    value={materialsReceived}
                    onChange={(e) => setMaterialsReceived(e.target.value)}
                    rows={3}
                    placeholder="List materials delivered today (e.g., 100 bags Portland cement, 20 sheets 4x8 plywood, electrical panel box)"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>

                {/* F) Equipment On Site */}
                <div className="mb-10">
                  <h2 className="text-lg font-bold text-reno-dark mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                      construction
                    </span>
                    Equipment On Site
                  </h2>
                  <textarea
                    value={equipmentOnSite}
                    onChange={(e) => setEquipmentOnSite(e.target.value)}
                    rows={3}
                    placeholder="List equipment present (e.g., Excavator, concrete mixer, scaffolding, generator)"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>

                {/* G) Delays & Issues */}
                <div className="mb-10">
                  <h2 className="text-lg font-bold text-reno-dark mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                      warning
                    </span>
                    Delays & Issues
                  </h2>
                  <textarea
                    value={delays}
                    onChange={(e) => setDelays(e.target.value)}
                    rows={3}
                    placeholder="Describe any delays or issues (e.g., Rain delay from 10am-2pm, waiting for inspector approval, missing materials)"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary mb-4"
                  />
                  <div>
                    <label className="text-sm font-semibold text-reno-dark mb-1.5 block">
                      Total Delay Hours
                    </label>
                    <input
                      type="number"
                      value={delayHours}
                      onChange={(e) => setDelayHours(e.target.value)}
                      placeholder="e.g., 4"
                      min="0"
                      step="0.5"
                      className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                    />
                  </div>
                </div>

                {/* H) Safety Observations */}
                <div className="mb-10">
                  <h2 className="text-lg font-bold text-reno-dark mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                      health_and_safety
                    </span>
                    Safety Observations
                  </h2>
                  <textarea
                    value={safetyNotes}
                    onChange={(e) => setSafetyNotes(e.target.value)}
                    rows={3}
                    placeholder="Note any safety observations, incidents, or concerns (e.g., All workers wore required PPE, completed fall protection inspection, no incidents)"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>

                {/* I) Visitor Log */}
                <div className="mb-10">
                  <h2 className="text-lg font-bold text-reno-dark mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                      badge
                    </span>
                    Visitor Log
                  </h2>
                  <textarea
                    value={visitorLog}
                    onChange={(e) => setVisitorLog(e.target.value)}
                    rows={2}
                    placeholder="Record site visitors (e.g., Building inspector John Doe, 2:30pm; Client Jane Smith, 4:00pm)"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>

                {/* J) Plan for Tomorrow */}
                <div className="mb-10">
                  <h2 className="text-lg font-bold text-reno-dark mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                      event
                    </span>
                    Plan for Tomorrow
                  </h2>
                  <textarea
                    value={tomorrowPlan}
                    onChange={(e) => setTomorrowPlan(e.target.value)}
                    rows={3}
                    placeholder="Outline tomorrow's planned work (e.g., Strip formwork, begin framing second floor, install plumbing rough-in)"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                  />
                </div>

                {/* Preview Button */}
                <button
                  onClick={handlePreview}
                  className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-4 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-float hover:shadow-float-hover"
                >
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    preview
                  </span>
                  Preview Report
                </button>
              </div>
            </div>
          </section>
        ) : (
          /* Report Preview */
          <section className="py-12">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-6 print-hide">
                <button
                  onClick={handlePrint}
                  className="flex-1 bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                    print
                  </span>
                  Print Report
                </button>
                <button
                  onClick={() => setShowPreview(false)}
                  className="flex-1 bg-slate-100 hover:bg-slate-200 text-reno-dark font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined">
                    edit
                  </span>
                  Edit Report
                </button>
              </div>

              {/* Report Document */}
              <div className="bg-white rounded-2xl shadow-float p-8 sm:p-12 print:shadow-none print:rounded-none">
                {/* Header */}
                <div className="border-b-2 border-slate-200 pb-6 mb-8">
                  <h1 className="text-3xl font-display font-bold text-reno-dark mb-2">
                    Daily Construction Field Report
                  </h1>
                  <div className="flex flex-col sm:flex-row sm:justify-between gap-2 text-sm text-slate-600">
                    <div>
                      <strong>Report #:</strong> {reportNumber || 'N/A'}
                    </div>
                    <div>
                      <strong>Date:</strong> {reportDate || 'N/A'}
                    </div>
                  </div>
                </div>

                {/* Project Information */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-reno-dark mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                      location_city
                    </span>
                    Project Information
                  </h2>
                  <div className="space-y-2 text-sm">
                    <div><strong>Project:</strong> {projectName || 'N/A'}</div>
                    <div><strong>Location:</strong> {projectAddress || 'N/A'}</div>
                    <div><strong>Prepared By:</strong> {preparedBy || 'N/A'}</div>
                  </div>
                </div>

                {/* Weather Conditions */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-reno-dark mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                      wb_cloudy
                    </span>
                    Weather Conditions
                  </h2>
                  <div className="space-y-2 text-sm">
                    <div><strong>Conditions:</strong> {weather ? weatherOptions.find(w => w.value === weather)?.label : 'N/A'}</div>
                    <div><strong>Temperature:</strong> {temperature ? `${temperature}°C` : 'N/A'}</div>
                    <div><strong>Wind Speed:</strong> {windSpeed ? `${windSpeed} km/h` : 'N/A'}</div>
                  </div>
                </div>

                {/* Crew On Site */}
                <div className="mb-8">
                  <h2 className="text-xl font-bold text-reno-dark mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                      groups
                    </span>
                    Crew On Site
                  </h2>
                  {crewEntries.filter(e => e.trade).length > 0 ? (
                    <>
                      <table className="w-full text-sm mb-4">
                        <thead className="bg-[#f6f8f8]">
                          <tr>
                            <th className="text-left py-2 px-3 font-semibold">Trade</th>
                            <th className="text-right py-2 px-3 font-semibold">Workers</th>
                            <th className="text-right py-2 px-3 font-semibold">Hours</th>
                            <th className="text-right py-2 px-3 font-semibold">Man-Hours</th>
                          </tr>
                        </thead>
                        <tbody>
                          {crewEntries.filter(e => e.trade).map((entry, index) => (
                            <tr key={index} className="border-b border-slate-100">
                              <td className="py-2 px-3">{entry.trade}</td>
                              <td className="text-right py-2 px-3">{entry.count}</td>
                              <td className="text-right py-2 px-3">{entry.hours}</td>
                              <td className="text-right py-2 px-3">{entry.count * entry.hours}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot className="bg-[#f6f8f8] font-semibold">
                          <tr>
                            <td className="py-2 px-3">Total</td>
                            <td className="text-right py-2 px-3">{totalWorkers}</td>
                            <td className="text-right py-2 px-3">—</td>
                            <td className="text-right py-2 px-3">{totalManHours.toFixed(1)}</td>
                          </tr>
                        </tfoot>
                      </table>
                    </>
                  ) : (
                    <p className="text-sm text-slate-500">No crew entries recorded.</p>
                  )}
                </div>

                {/* Work Completed */}
                {workCompleted && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-reno-dark mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                        task_alt
                      </span>
                      Work Completed Today
                    </h2>
                    <p className="text-sm whitespace-pre-wrap">{workCompleted}</p>
                  </div>
                )}

                {/* Materials Received */}
                {materialsReceived && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-reno-dark mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                        inventory_2
                      </span>
                      Materials Received
                    </h2>
                    <p className="text-sm whitespace-pre-wrap">{materialsReceived}</p>
                  </div>
                )}

                {/* Equipment On Site */}
                {equipmentOnSite && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-reno-dark mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                        construction
                      </span>
                      Equipment On Site
                    </h2>
                    <p className="text-sm whitespace-pre-wrap">{equipmentOnSite}</p>
                  </div>
                )}

                {/* Delays & Issues */}
                {(delays || delayHours) && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-reno-dark mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                        warning
                      </span>
                      Delays & Issues
                    </h2>
                    {delays && <p className="text-sm whitespace-pre-wrap mb-2">{delays}</p>}
                    {delayHours && <p className="text-sm"><strong>Total Delay Hours:</strong> {delayHours}</p>}
                  </div>
                )}

                {/* Safety Observations */}
                {safetyNotes && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-reno-dark mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                        health_and_safety
                      </span>
                      Safety Observations
                    </h2>
                    <p className="text-sm whitespace-pre-wrap">{safetyNotes}</p>
                  </div>
                )}

                {/* Visitor Log */}
                {visitorLog && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-reno-dark mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                        badge
                      </span>
                      Visitor Log
                    </h2>
                    <p className="text-sm whitespace-pre-wrap">{visitorLog}</p>
                  </div>
                )}

                {/* Plan for Tomorrow */}
                {tomorrowPlan && (
                  <div className="mb-8">
                    <h2 className="text-xl font-bold text-reno-dark mb-4 flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>
                        event
                      </span>
                      Plan for Tomorrow
                    </h2>
                    <p className="text-sm whitespace-pre-wrap">{tomorrowPlan}</p>
                  </div>
                )}

                {/* Signature Line */}
                <div className="mt-12 pt-6 border-t border-slate-200">
                  <div className="flex justify-between items-end">
                    <div className="flex-1">
                      <div className="border-b border-slate-400 w-64 mb-2"></div>
                      <p className="text-xs text-slate-600">Signature</p>
                    </div>
                    <div className="flex-1 text-right">
                      <div className="border-b border-slate-400 w-40 mb-2 ml-auto"></div>
                      <p className="text-xs text-slate-600">Date</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Related Resources */}
        <section className="bg-[#f6f8f8] py-16 print-hide">
          <div className="max-w-6xl mx-auto px-4 sm:px-6">
            <h2 className="text-3xl font-display font-bold text-reno-dark text-center mb-12">
              Related Tools & Resources
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Link
                href="/apps/the-proof"
                className="bg-white rounded-2xl p-6 shadow-float hover:shadow-float-hover transition-all group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      verified
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-reno-dark group-hover:text-primary transition-colors">
                    The Proof
                  </h3>
                </div>
                <p className="text-sm text-slate-600">
                  Verify your daily reports digitally with blockchain-backed timestamps and photo evidence.
                </p>
              </Link>

              <Link
                href="/contracts"
                className="bg-white rounded-2xl p-6 shadow-float hover:shadow-float-hover transition-all group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      description
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-reno-dark group-hover:text-primary transition-colors">
                    Contract Generator
                  </h3>
                </div>
                <p className="text-sm text-slate-600">
                  Generate a professional construction contract with milestone payments and CPA compliance.
                </p>
              </Link>

              <Link
                href="/apps/safety-hub"
                className="bg-white rounded-2xl p-6 shadow-float hover:shadow-float-hover transition-all group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                      health_and_safety
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-reno-dark group-hover:text-primary transition-colors">
                    SafetyHub
                  </h3>
                </div>
                <p className="text-sm text-slate-600">
                  Run safety inspections, generate JSAs, and access toolbox talks for your crew.
                </p>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-reno-dark py-16 print-hide">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-6">
              Automate Your Daily Reports
            </h2>
            <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
              Stop filling out paper forms. The Proof captures your site updates in real-time with photos, timestamps, and automated PDF generation.
            </p>
            <Link
              href="/apps/the-proof"
              className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-semibold px-8 py-4 rounded-xl transition-colors shadow-float-hover"
            >
              <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
                verified
              </span>
              Learn About The Proof
            </Link>
          </div>
        </section>
      </div>
    </>
  );
}
