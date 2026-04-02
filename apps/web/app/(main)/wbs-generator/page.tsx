'use client';

import { useState, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { PageHero } from '@/components/ui/page-hero';
import {
  serviceCosts,
  cityMultipliers,
  getCityAdjustedPrice,
  formatPrice,
  costCategories,
  type ServiceCostData,
  type CityMultiplier,
} from '@/lib/data/costs';
import {
  getWbsTemplate,
  calculatePhaseCost,
  calculateTotalDuration,
  type WbsTask,
  type WbsPhase,
  type WbsTemplate,
} from '@/lib/data/wbs';

// ── Constants ─────────────────────────────────────────────────────────────────
const TOTAL_STEPS = 3;

const serviceIcons: Record<string, string> = {
  underpinning: 'foundation',
  waterproofing: 'water_damage',
  'foundation-repair': 'home_repair_service',
  'concrete-works': 'concrete',
  masonry: 'wall',
  framing: 'carpenter',
  electrical: 'electric_bolt',
  plumbing: 'plumbing',
  handyman: 'handyman',
  hvac: 'heat_pump',
  insulation: 'thermostat',
  drains: 'water',
  painting: 'format_paint',
  cleaning: 'cleaning_services',
  additions: 'add_home',
  'basement-second-unit': 'house',
  roofing: 'roofing',
  demolition: 'demolition',
  decks: 'deck',
  'general-contractor': 'engineering',
  'project-management': 'assignment',
  'building-permit': 'description',
  drafting: 'draw',
  estimating: 'calculate',
  'equipment-rental': 'forklift',
};

const phaseColors: Record<string, string> = {
  'Pre-Construction': 'bg-blue-500',
  'Site Preparation': 'bg-amber-500',
  'Main Construction': 'bg-emerald-500',
  'Structural Work': 'bg-emerald-500',
  Demolition: 'bg-red-500',
  'Rough-In': 'bg-purple-500',
  Finishing: 'bg-teal-500',
  'Close-Out': 'bg-slate-500',
  Planning: 'bg-blue-500',
  Execution: 'bg-emerald-500',
  'Assessment & Design': 'bg-blue-500',
  'Permit Processing': 'bg-amber-500',
  Documentation: 'bg-purple-500',
  'Equipment Delivery': 'bg-amber-500',
  'Rental Period': 'bg-emerald-500',
  'Return & Close-Out': 'bg-slate-500',
  Installation: 'bg-emerald-500',
  'Mobilization & Setup': 'bg-amber-500',
  'Testing & Commissioning': 'bg-teal-500',
};

// Hex colors for Gantt bars (matching Tailwind classes above)
const phaseBarColors: Record<string, string> = {
  'Pre-Construction': '#3b82f6',
  'Site Preparation': '#f59e0b',
  'Main Construction': '#10b981',
  'Structural Work': '#10b981',
  Demolition: '#ef4444',
  'Rough-In': '#a855f7',
  Finishing: '#14b8a6',
  'Close-Out': '#64748b',
  Planning: '#3b82f6',
  Execution: '#10b981',
  'Assessment & Design': '#3b82f6',
  'Permit Processing': '#f59e0b',
  Documentation: '#a855f7',
  'Equipment Delivery': '#f59e0b',
  'Rental Period': '#10b981',
  'Return & Close-Out': '#64748b',
  Installation: '#10b981',
  'Mobilization & Setup': '#f59e0b',
  'Testing & Commissioning': '#14b8a6',
};

function getPhaseColor(phaseName: string): string {
  return phaseColors[phaseName] || 'bg-slate-400';
}

function getPhaseBarColor(phaseName: string): string {
  return phaseBarColors[phaseName] || '#94a3b8';
}

// ── Scheduler: forward-pass to compute start/end day for each task ──────────
interface ScheduledTask {
  code: string;
  name: string;
  durationDays: number;
  costPctOfTotal: number;
  dependsOn?: string[];
  startDay: number;
  endDay: number;
  phaseCode: string;
  phaseName: string;
}

function scheduleWbs(template: WbsTemplate): { tasks: ScheduledTask[]; totalDays: number } {
  const allTasks: { task: WbsTask; phaseCode: string; phaseName: string }[] = [];
  template.phases.forEach((phase) => {
    phase.tasks.forEach((task) => {
      allTasks.push({ task, phaseCode: phase.code, phaseName: phase.name });
    });
  });

  const scheduled = new Map<string, ScheduledTask>();

  // Topological resolution — iterate until all tasks are scheduled
  let remaining = allTasks.map((t) => t);
  let safetyCount = 0;
  while (remaining.length > 0 && safetyCount < 200) {
    safetyCount++;
    const nextRemaining: typeof remaining = [];
    for (const { task, phaseCode, phaseName } of remaining) {
      const deps = task.dependsOn || [];
      const allDepsScheduled = deps.every((d) => scheduled.has(d));
      if (allDepsScheduled) {
        let startDay = 0;
        for (const depCode of deps) {
          const dep = scheduled.get(depCode);
          if (dep && dep.endDay > startDay) startDay = dep.endDay;
        }
        scheduled.set(task.code, {
          ...task,
          startDay,
          endDay: startDay + task.durationDays,
          phaseCode,
          phaseName,
        });
      } else {
        nextRemaining.push({ task, phaseCode, phaseName });
      }
    }
    remaining = nextRemaining;
  }

  // If any tasks couldn't be scheduled (circular deps), place them at day 0
  for (const { task, phaseCode, phaseName } of remaining) {
    scheduled.set(task.code, {
      ...task,
      startDay: 0,
      endDay: task.durationDays,
      phaseCode,
      phaseName,
    });
  }

  const tasks = allTasks.map(({ task }) => scheduled.get(task.code)!);
  const totalDays = Math.max(...tasks.map((t) => t.endDay), 1);

  return { tasks, totalDays };
}

// ── Gantt Chart Component ───────────────────────────────────────────────────
const ROW_HEIGHT = 40;
const LABEL_WIDTH = 220;
const MIN_CHART_WIDTH = 700;

function GanttChart({ template, totalBudget }: { template: WbsTemplate; totalBudget: number }) {
  const { tasks, totalDays } = useMemo(() => scheduleWbs(template), [template]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredTask, setHoveredTask] = useState<string | null>(null);

  // Day markers — show every N days depending on total
  const dayStep = totalDays <= 14 ? 1 : totalDays <= 60 ? 5 : totalDays <= 120 ? 10 : 20;
  const dayMarkers: number[] = [];
  for (let d = 0; d <= totalDays; d += dayStep) dayMarkers.push(d);
  if (dayMarkers[dayMarkers.length - 1] !== totalDays) dayMarkers.push(totalDays);

  const chartHeight = tasks.length * ROW_HEIGHT + 40; // +40 for header

  // Build a task-index lookup for drawing arrows
  const taskIndexMap = new Map<string, number>();
  tasks.forEach((t, i) => taskIndexMap.set(t.code, i));

  return (
    <div className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-float transition-shadow print:rounded-lg print:shadow-none">
      <div className="flex items-center justify-between border-b border-slate-100 px-5 py-3.5 bg-gradient-to-r from-slate-50 to-white">
        <h3 className="text-sm font-bold text-reno-dark flex items-center gap-2">
          <span className="material-symbols-outlined text-primary text-lg" style={{ fontVariationSettings: "'FILL' 1" }}>timeline</span>
          Project Timeline
        </h3>
        <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full">{totalDays} days</span>
      </div>

      <div ref={containerRef} className="overflow-x-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100 print:overflow-visible">
        <div style={{ minWidth: `${MIN_CHART_WIDTH + LABEL_WIDTH}px` }} className="print:min-w-0">
          {/* Header row */}
          <div className="flex border-b border-slate-200 print:border-slate-300" style={{ height: 40 }}>
            <div
              className="shrink-0 flex items-center px-4 text-[10px] font-bold uppercase tracking-wider text-slate-500 border-r border-slate-200 bg-gradient-to-b from-slate-50 to-slate-100/50 print:px-2 print:bg-slate-50"
              style={{ width: LABEL_WIDTH }}
            >
              Task
            </div>
            <div className="flex-1 relative bg-gradient-to-b from-slate-50 to-slate-100/50">
              {dayMarkers.map((day) => (
                <div
                  key={day}
                  className="absolute top-0 bottom-0 flex items-center"
                  style={{ left: `${(day / totalDays) * 100}%` }}
                >
                  <span className="text-[10px] font-semibold text-slate-500 -translate-x-1/2 whitespace-nowrap">
                    Day {day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Task rows */}
          <div className="relative">
            {tasks.map((task, idx) => {
              const barLeft = (task.startDay / totalDays) * 100;
              const barWidth = Math.max((task.durationDays / totalDays) * 100, 0.5);
              const color = getPhaseBarColor(task.phaseName);
              const isCritical = task.durationDays >= 5;
              const isHovered = hoveredTask === task.code;
              const taskCost = totalBudget > 0 ? Math.round(totalBudget * (task.costPctOfTotal / 100)) : 0;

              return (
                <div
                  key={task.code}
                  className="flex group"
                  style={{ height: ROW_HEIGHT }}
                  onMouseEnter={() => setHoveredTask(task.code)}
                  onMouseLeave={() => setHoveredTask(null)}
                >
                  {/* Label */}
                  <div
                    className={`shrink-0 flex items-center gap-2 px-4 border-r border-b border-slate-100 truncate transition-colors ${
                      isHovered ? 'bg-primary/5' : 'bg-white group-hover:bg-slate-50/70'
                    }`}
                    style={{ width: LABEL_WIDTH }}
                  >
                    <span className="text-[10px] font-mono font-bold text-primary shrink-0">{task.code}</span>
                    <span className="text-xs text-slate-700 truncate group-hover:text-reno-dark transition-colors">{task.name}</span>
                  </div>

                  {/* Bar area */}
                  <div className={`flex-1 relative border-b border-slate-100 transition-colors ${isHovered ? 'bg-primary/5' : 'bg-white'}`}>
                    {/* Grid lines */}
                    {dayMarkers.map((day) => (
                      <div
                        key={day}
                        className="absolute top-0 bottom-0 border-l border-slate-100"
                        style={{ left: `${(day / totalDays) * 100}%` }}
                      />
                    ))}

                    {/* Bar with tooltip */}
                    <div className="relative group/bar">
                      <div
                        className={`absolute top-2 rounded-md transition-all cursor-pointer ${
                          isHovered ? 'shadow-lg scale-105' : 'shadow-sm hover:shadow-md'
                        }`}
                        style={{
                          left: `${barLeft}%`,
                          width: `${barWidth}%`,
                          height: ROW_HEIGHT - 16,
                          backgroundColor: color,
                          opacity: isCritical ? 0.95 : 0.8,
                          minWidth: 6,
                        }}
                      >
                        {/* Duration label on bar if wide enough */}
                        {barWidth > 5 && (
                          <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white drop-shadow">
                            {task.durationDays}d
                          </span>
                        )}

                        {/* Tooltip on hover */}
                        {isHovered && (
                          <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50 pointer-events-none print:hidden">
                            <div className="bg-reno-dark text-white text-xs rounded-lg px-3 py-2 shadow-xl whitespace-nowrap">
                              <div className="font-bold mb-1">{task.name}</div>
                              <div className="text-slate-300 space-y-0.5">
                                <div>Duration: {task.durationDays} days</div>
                                <div>Days {task.startDay}–{task.endDay}</div>
                                {totalBudget > 0 && <div>Cost: {formatPrice(taskCost)}</div>}
                                <div>Phase: {task.phaseName}</div>
                              </div>
                              {/* Arrow */}
                              <div className="absolute left-1/2 -translate-x-1/2 top-full w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-reno-dark"></div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Dependency arrows — SVG overlay */}
            <svg
              className="absolute pointer-events-none print:hidden"
              style={{ top: 0, left: LABEL_WIDTH, width: `calc(100% - ${LABEL_WIDTH}px)`, height: tasks.length * ROW_HEIGHT }}
            >
              <defs>
                <marker id="arrowhead" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
                  <path d="M0,0 L7,2.5 L0,5 L1.5,2.5 Z" fill="#0fbabd" fillOpacity="0.4" />
                </marker>
              </defs>
              {tasks.map((task) =>
                (task.dependsOn || []).map((depCode) => {
                  const depIdx = taskIndexMap.get(depCode);
                  const taskIdx = taskIndexMap.get(task.code);
                  if (depIdx === undefined || taskIdx === undefined) return null;

                  const dep = tasks[depIdx];
                  // Arrow from end of dependency bar → start of task bar
                  const fromX = `${(dep.endDay / totalDays) * 100}%`;
                  const fromY = depIdx * ROW_HEIGHT + ROW_HEIGHT / 2;
                  const toX = `${(task.startDay / totalDays) * 100}%`;
                  const toY = taskIdx * ROW_HEIGHT + ROW_HEIGHT / 2;

                  // Only draw if there's visual distance
                  const fromPct = (dep.endDay / totalDays) * 100;
                  const toPct = (task.startDay / totalDays) * 100;
                  if (Math.abs(fromPct - toPct) < 0.3 && Math.abs(fromY - toY) < ROW_HEIGHT * 1.5) return null;

                  return (
                    <line
                      key={`${depCode}-${task.code}`}
                      x1={fromX}
                      y1={fromY}
                      x2={toX}
                      y2={toY}
                      stroke="#0fbabd"
                      strokeOpacity="0.4"
                      strokeWidth={1.5}
                      strokeDasharray="4,3"
                      markerEnd="url(#arrowhead)"
                    />
                  );
                })
              )}
            </svg>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 border-t border-slate-100 px-5 py-3.5 bg-slate-50/50">
        {template.phases.map((phase) => (
          <div key={phase.code} className="flex items-center gap-2">
            <div className="h-3 w-3 rounded" style={{ backgroundColor: getPhaseBarColor(phase.name) }} />
            <span className="text-[11px] font-medium text-slate-600">{phase.name}</span>
          </div>
        ))}
        <div className="flex items-center gap-2 ml-auto print:hidden">
          <svg width="24" height="10">
            <line x1="0" y1="5" x2="22" y2="5" stroke="#0fbabd" strokeOpacity="0.4" strokeWidth={1.5} strokeDasharray="4,3" markerEnd="url(#arrowhead-legend)" />
            <defs>
              <marker id="arrowhead-legend" markerWidth="7" markerHeight="5" refX="7" refY="2.5" orient="auto">
                <path d="M0,0 L7,2.5 L0,5 L1.5,2.5 Z" fill="#0fbabd" fillOpacity="0.4" />
              </marker>
            </defs>
          </svg>
          <span className="text-[11px] font-medium text-slate-500">Dependency</span>
        </div>
      </div>
    </div>
  );
}

// ── Component ─────────────────────────────────────────────────────────────────
export default function WbsGeneratorPage() {
  const [step, setStep] = useState(1);
  const [direction, setDirection] = useState(1);

  // Step 1 state
  const [selectedService, setSelectedService] = useState<ServiceCostData | null>(null);

  // Step 2 state
  const [projectName, setProjectName] = useState('');
  const [selectedCity, setSelectedCity] = useState('toronto');
  const [scopeItems, setScopeItems] = useState<Record<string, boolean>>({});
  const [projectSize, setProjectSize] = useState('');

  // Step 3 state
  const [generatedWbs, setGeneratedWbs] = useState<WbsTemplate | null>(null);
  const [expandedPhases, setExpandedPhases] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'tree' | 'gantt'>('tree');

  const wbsOutputRef = useRef<HTMLDivElement>(null);

  // ── Navigation ────────────────────────────────────────────────────────────
  const goNext = () => {
    if (step === 1 && !selectedService) return;
    if (step === 2) {
      // Generate WBS
      const template = getWbsTemplate(selectedService!.slug);
      if (template) {
        setGeneratedWbs(template);
        setExpandedPhases(new Set(template.phases.map((p) => p.code)));
      }
    }
    setDirection(1);
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  };

  const goBack = () => {
    setDirection(-1);
    setStep((s) => Math.max(s - 1, 1));
  };

  const startOver = () => {
    setStep(1);
    setDirection(-1);
    setSelectedService(null);
    setProjectName('');
    setSelectedCity('toronto');
    setScopeItems({});
    setProjectSize('');
    setGeneratedWbs(null);
    setExpandedPhases(new Set());
    setViewMode('tree');
  };

  // ── Service selection ─────────────────────────────────────────────────────
  const handleServiceSelect = (service: ServiceCostData) => {
    setSelectedService(service);
    // Initialize scope items
    const items: Record<string, boolean> = {};
    service.includedInPrice.forEach((item) => {
      items[item] = true;
    });
    setScopeItems(items);
  };

  // ── Budget calculation ────────────────────────────────────────────────────
  const city = cityMultipliers.find((c) => c.slug === selectedCity);
  const totalBudget = selectedService
    ? (() => {
        const mainRange = selectedService.priceRanges.find((r) => r.unit === 'per project') || selectedService.priceRanges[0];
        if (!mainRange || !city) return 0;
        const adjusted = getCityAdjustedPrice(mainRange.minCAD, mainRange.maxCAD, mainRange.labourPct, mainRange.materialPct, city);
        return Math.round((adjusted.min + adjusted.max) / 2);
      })()
    : 0;

  // ── Helpers ───────────────────────────────────────────────────────────────
  const togglePhase = (code: string) => {
    setExpandedPhases((prev) => {
      const next = new Set(prev);
      if (next.has(code)) next.delete(code);
      else next.add(code);
      return next;
    });
  };

  const expandAll = () => {
    if (generatedWbs) {
      setExpandedPhases(new Set(generatedWbs.phases.map((p) => p.code)));
    }
  };

  const collapseAll = () => {
    setExpandedPhases(new Set());
  };

  const handlePrint = () => {
    window.print();
  };

  const handleCopy = () => {
    if (!generatedWbs || !selectedService) return;
    const displayName = projectName || `My ${selectedService.title} Project`;
    const cityName = city?.name || 'Toronto';

    let text = `WORK BREAKDOWN STRUCTURE\n`;
    text += `${'='.repeat(50)}\n`;
    text += `Project: ${displayName}\n`;
    text += `Service: ${selectedService.title}\n`;
    text += `Location: ${cityName}, Ontario\n`;
    text += `Generated: ${new Date().toLocaleDateString('en-CA')}\n`;
    text += `${'='.repeat(50)}\n\n`;

    generatedWbs.phases.forEach((phase) => {
      const phaseCost = calculatePhaseCost(phase, totalBudget);
      text += `${phase.code}  ${phase.name.toUpperCase()}`;
      if (totalBudget > 0) {
        text += `  (${formatPrice(phaseCost.min)} – ${formatPrice(phaseCost.max)})`;
      }
      text += `\n`;
      phase.tasks.forEach((task) => {
        const dep = task.dependsOn?.length ? ` [after ${task.dependsOn.join(', ')}]` : '';
        text += `  ${task.code}  ${task.name} — ${task.durationDays}d${dep}\n`;
      });
      text += `\n`;
    });

    const totalDays = calculateTotalDuration(generatedWbs.phases);
    text += `${'─'.repeat(50)}\n`;
    text += `Total Duration (sequential): ~${totalDays} days\n`;
    if (totalBudget > 0) {
      text += `Estimated Budget: ${formatPrice(Math.round(totalBudget * 0.85))} – ${formatPrice(Math.round(totalBudget * 1.15))}\n`;
      text += `Contingency (${selectedService.contingencyPct}%): ${formatPrice(Math.round(totalBudget * selectedService.contingencyPct / 100))}\n`;
    }
    text += `\nGenerated by RenoNext — renonext.com/wbs-generator\n`;

    navigator.clipboard.writeText(text);
  };

  // ── Scope items count ─────────────────────────────────────────────────────
  const enabledScopeCount = Object.values(scopeItems).filter(Boolean).length;

  // ── Animation variants ────────────────────────────────────────────────────
  const slideVariants = {
    enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
  };

  return (
    <>
      {/* SEO head */}
      <title>Free WBS Generator for Renovation Projects — Ontario 2026 | RenoNext</title>
      <meta
        name="description"
        content="Generate a professional Work Breakdown Structure for any renovation project in Ontario. 25 service types, 15 GTA cities, instant results. Free from RenoNext."
      />
      <link rel="canonical" href="https://renonext.com/wbs-generator" />

      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'SoftwareApplication',
            name: 'RenoNext WBS Generator',
            applicationCategory: 'BusinessApplication',
            operatingSystem: 'Web',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'CAD' },
            description:
              'Free Work Breakdown Structure generator for renovation projects in Ontario. Covers 25 service types across 15 GTA cities.',
            url: 'https://renonext.com/wbs-generator',
          }),
        }}
      />

      <style jsx global>{`
        @media print {
          @page {
            margin: 1.5cm;
            size: letter;
          }
          body {
            print-color-adjust: exact;
            -webkit-print-color-adjust: exact;
          }
          .scrollbar-thin {
            scrollbar-width: auto;
          }
        }
      `}</style>

      <div className="min-h-screen bg-[#f6f8f8] print:bg-white">
        {/* Hero */}
        <div className="print:hidden">
          <PageHero
            badge={{ icon: 'account_tree', text: 'Free Tool' }}
            title={
              <>
                WBS <span className="text-primary">Generator</span>
              </>
            }
            subtitle="Generate a professional Work Breakdown Structure for any renovation project. 25 service types, 15 GTA cities, cost estimates adjusted to your location."
            background="light"
          />
        </div>

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto px-6 lg:px-8 mb-10 print:hidden">
          <div className="flex items-center gap-3">
            {['Select Service', 'Project Details', 'Your WBS'].map((label, i) => {
              const stepNum = i + 1;
              const isActive = step === stepNum;
              const isDone = step > stepNum;
              return (
                <div key={label} className="flex flex-1 items-center gap-3">
                  <div className="flex items-center gap-2 min-w-0">
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-all duration-300 ${
                        isDone
                          ? 'bg-primary text-white ring-4 ring-primary/10'
                          : isActive
                          ? 'bg-primary text-white shadow-float scale-110'
                          : 'bg-slate-200 text-slate-400'
                      }`}
                    >
                      {isDone ? (
                        <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                      ) : (
                        stepNum
                      )}
                    </div>
                    <span
                      className={`text-sm font-semibold truncate hidden sm:block transition-colors ${
                        isActive ? 'text-reno-dark' : isDone ? 'text-primary' : 'text-slate-400'
                      }`}
                    >
                      {label}
                    </span>
                  </div>
                  {i < 2 && (
                    <div className={`h-1 flex-1 rounded-full transition-all duration-300 ${isDone ? 'bg-primary' : 'bg-slate-200'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Wizard Content */}
        <div className="max-w-6xl mx-auto px-6 lg:px-8 pb-32">
          <AnimatePresence mode="wait" custom={direction}>
            {/* ──────────────── STEP 1: Select Service ──────────────── */}
            {step === 1 && (
              <motion.div
                key="step1"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
                <div className="mb-8 text-center md:text-left">
                  <h2 className="text-3xl font-bold text-reno-dark">What type of renovation?</h2>
                  <p className="mt-2 text-base text-slate-600">Select the service type to generate a WBS template.</p>
                </div>

                {(costCategories as readonly string[]).map((category) => {
                  const services = serviceCosts.filter((s) => s.category === category);
                  return (
                    <div key={category} className="mb-10 last:mb-0">
                      <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.15em] text-slate-500 flex items-center gap-2">
                        <div className="h-px flex-1 bg-slate-200 hidden sm:block" style={{ maxWidth: '2rem' }} />
                        {category}
                      </h3>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {services.map((service) => {
                          const isSelected = selectedService?.slug === service.slug;
                          return (
                            <button
                              key={service.slug}
                              onClick={() => handleServiceSelect(service)}
                              className={`group relative flex flex-col items-center gap-3 rounded-2xl border-2 p-5 text-center transition-all duration-300 hover:shadow-float hover:-translate-y-1 ${
                                isSelected
                                  ? 'border-primary bg-primary/5 shadow-float scale-105'
                                  : 'border-slate-200 bg-white hover:border-primary/30'
                              }`}
                            >
                              {isSelected && (
                                <div className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white shadow-lg">
                                  <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>check</span>
                                </div>
                              )}
                              <div
                                className={`flex h-14 w-14 items-center justify-center rounded-xl transition-all duration-300 ${
                                  isSelected
                                    ? 'bg-primary text-white shadow-md'
                                    : 'bg-slate-100 text-slate-500 group-hover:bg-primary/10 group-hover:text-primary group-hover:scale-110'
                                }`}
                              >
                                <span className="material-symbols-outlined text-[24px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                  {serviceIcons[service.slug] || 'build'}
                                </span>
                              </div>
                              <div className="flex-1">
                                <span className={`text-sm font-semibold block transition-colors ${isSelected ? 'text-primary' : 'text-slate-700 group-hover:text-reno-dark'}`}>
                                  {service.title}
                                </span>
                                <span className="text-[11px] text-slate-400 mt-1 block">{service.typicalTimeline}</span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}

                {/* Next button */}
                <div className="mt-10 flex justify-center md:justify-end">
                  <button
                    onClick={goNext}
                    disabled={!selectedService}
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-10 py-4 text-base font-bold text-white shadow-float transition-all hover:shadow-float-hover hover:-translate-y-0.5 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-float disabled:saturate-50"
                  >
                    Continue
                    <span className="material-symbols-outlined text-xl">arrow_forward</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* ──────────────── STEP 2: Project Details ──────────────── */}
            {step === 2 && selectedService && (
              <motion.div
                key="step2"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
                <div className="mb-8 text-center md:text-left">
                  <h2 className="text-3xl font-bold text-reno-dark">Project Details</h2>
                  <p className="mt-2 text-base text-slate-600">Customize your {selectedService.title} WBS.</p>
                </div>

                <div className="grid gap-8 lg:grid-cols-2">
                  {/* Left column */}
                  <div className="space-y-6">
                    {/* Project Name */}
                    <div>
                      <label htmlFor="project-name" className="mb-2.5 block text-sm font-semibold text-reno-dark">
                        Project Name <span className="text-slate-400 font-normal">(optional)</span>
                      </label>
                      <input
                        id="project-name"
                        type="text"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        placeholder={`My ${selectedService.title} Project`}
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-reno-dark placeholder-slate-400 outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-slate-300"
                      />
                    </div>

                    {/* City */}
                    <div>
                      <label htmlFor="city" className="mb-2.5 block text-sm font-semibold text-reno-dark">
                        City <span className="text-slate-400 font-normal">(for cost adjustment)</span>
                      </label>
                      <div className="relative">
                        <select
                          id="city"
                          value={selectedCity}
                          onChange={(e) => setSelectedCity(e.target.value)}
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-reno-dark outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-slate-300 appearance-none cursor-pointer"
                        >
                          {cityMultipliers.map((c) => (
                            <option key={c.slug} value={c.slug}>
                              {c.name} ({c.region})
                            </option>
                          ))}
                        </select>
                        <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                          expand_more
                        </span>
                      </div>
                    </div>

                    {/* Project Size */}
                    <div>
                      <label htmlFor="project-size" className="mb-2.5 block text-sm font-semibold text-reno-dark">
                        Project Size <span className="text-slate-400 font-normal">(optional)</span>
                      </label>
                      <input
                        id="project-size"
                        type="text"
                        value={projectSize}
                        onChange={(e) => setProjectSize(e.target.value)}
                        placeholder="e.g. 800 sq ft, 3 rooms, 60 linear ft"
                        className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm text-reno-dark placeholder-slate-400 outline-none transition-all focus:border-primary focus:ring-4 focus:ring-primary/10 hover:border-slate-300"
                      />
                    </div>
                  </div>

                  {/* Right column — Scope checkboxes */}
                  <div>
                    <div className="mb-3 flex items-center justify-between">
                      <label className="text-sm font-semibold text-reno-dark">
                        Scope of Work
                      </label>
                      <span className="text-xs font-medium text-primary bg-primary/10 px-2.5 py-1 rounded-full">{enabledScopeCount} items</span>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white p-5 space-y-2.5 max-h-[360px] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-slate-100">
                      {selectedService.includedInPrice.map((item) => (
                        <label
                          key={item}
                          className="flex items-start gap-3 rounded-lg p-2.5 transition-all hover:bg-primary/5 cursor-pointer group"
                        >
                          <input
                            type="checkbox"
                            checked={scopeItems[item] ?? true}
                            onChange={(e) => setScopeItems((prev) => ({ ...prev, [item]: e.target.checked }))}
                            className="mt-0.5 h-4.5 w-4.5 rounded border-slate-300 text-primary focus:ring-primary/30 transition-all cursor-pointer"
                          />
                          <span className="text-sm text-slate-700 group-hover:text-reno-dark transition-colors leading-relaxed">{item}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="mt-10 flex items-center justify-between">
                  <button
                    onClick={goBack}
                    className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300"
                  >
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                    Back
                  </button>
                  <button
                    onClick={goNext}
                    className="inline-flex items-center gap-2 rounded-xl bg-primary px-10 py-4 text-base font-bold text-white shadow-float transition-all hover:shadow-float-hover hover:-translate-y-0.5"
                  >
                    Generate WBS
                    <span className="material-symbols-outlined text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>account_tree</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* ──────────────── STEP 3: Generated WBS ──────────────── */}
            {step === 3 && generatedWbs && selectedService && (
              <motion.div
                key="step3"
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.25, ease: 'easeInOut' }}
              >
                {/* Header */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between print:mb-3">
                  <div>
                    <h2 className="text-3xl font-bold text-reno-dark print:text-xl">
                      {projectName || `My ${selectedService.title} Project`}
                    </h2>
                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-slate-500">
                      <span className="inline-flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">construction</span>
                        {selectedService.title}
                      </span>
                      <span className="text-slate-300">•</span>
                      <span className="inline-flex items-center gap-1">
                        <span className="material-symbols-outlined text-base">location_on</span>
                        {city?.name || 'Toronto'}, Ontario
                      </span>
                      <span className="text-slate-300">•</span>
                      <span>{new Date().toLocaleDateString('en-CA')}</span>
                      {projectSize && (
                        <>
                          <span className="text-slate-300">•</span>
                          <span>{projectSize}</span>
                        </>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 print:hidden">
                    <button
                      onClick={expandAll}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition-all hover:bg-slate-50 hover:border-slate-300"
                    >
                      Expand All
                    </button>
                    <button
                      onClick={collapseAll}
                      className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-medium text-slate-600 transition-all hover:bg-slate-50 hover:border-slate-300"
                    >
                      Collapse All
                    </button>
                    <button
                      onClick={handleCopy}
                      className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2 text-xs font-medium text-slate-600 transition-all hover:bg-slate-50 hover:border-slate-300"
                    >
                      <span className="material-symbols-outlined text-sm">content_copy</span>
                      Copy
                    </button>
                    <button
                      onClick={handlePrint}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-bold text-white shadow-sm transition-all hover:shadow-md hover:bg-primary/90"
                    >
                      <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>print</span>
                      Print
                    </button>
                  </div>
                </div>

                {/* Project Summary */}
                {generatedWbs.summary && (
                  <div className="mb-8 rounded-2xl border border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10 p-6 print:rounded-lg print:p-3 print:mb-4 shadow-sm">
                    <div className="flex gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/20">
                        <span className="material-symbols-outlined text-primary text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                          info
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-reno-dark mb-2">What this project involves</p>
                        <p className="text-sm leading-relaxed text-slate-700">{generatedWbs.summary}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Summary Cards */}
                <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-4 print:grid-cols-4 print:gap-3 print:mb-4">
                  <div className="group rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:shadow-md hover:border-primary/30 print:rounded-lg print:p-2 print:hover:shadow-none">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-primary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>layers</span>
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Phases</div>
                    </div>
                    <div className="text-3xl font-extrabold text-reno-dark group-hover:text-primary transition-colors print:text-lg">{generatedWbs.phases.length}</div>
                  </div>
                  <div className="group rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:shadow-md hover:border-primary/30 print:rounded-lg print:p-2 print:hover:shadow-none">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-primary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>assignment</span>
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Tasks</div>
                    </div>
                    <div className="text-3xl font-extrabold text-reno-dark group-hover:text-primary transition-colors print:text-lg">
                      {generatedWbs.phases.reduce((sum, p) => sum + p.tasks.length, 0)}
                    </div>
                  </div>
                  <div className="group rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:shadow-md hover:border-primary/30 print:rounded-lg print:p-2 print:hover:shadow-none">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-primary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>schedule</span>
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Duration</div>
                    </div>
                    <div className="text-2xl font-extrabold text-reno-dark group-hover:text-primary transition-colors print:text-lg">
                      {generatedWbs.totalDurationDays.min}–{generatedWbs.totalDurationDays.max}
                      <span className="text-base font-semibold text-slate-400 ml-1">days</span>
                    </div>
                  </div>
                  <div className="group rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:shadow-md hover:border-primary/30 print:rounded-lg print:p-2 print:hover:shadow-none">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="material-symbols-outlined text-primary text-base" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
                      <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Budget Range</div>
                    </div>
                    <div className="text-lg font-extrabold text-reno-dark group-hover:text-primary transition-colors print:text-base">
                      {totalBudget > 0 ? (
                        <div className="flex flex-col">
                          <span>{formatPrice(Math.round(totalBudget * 0.85))}</span>
                          <span className="text-sm font-medium text-slate-400">to {formatPrice(Math.round(totalBudget * 1.15))}</span>
                        </div>
                      ) : (
                        <span className="text-slate-400 text-sm">Varies by scope</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* View Toggle */}
                <div className="mb-8 flex items-center gap-1 rounded-xl bg-slate-100 p-1.5 w-fit print:hidden shadow-sm">
                  <button
                    onClick={() => setViewMode('tree')}
                    className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all ${
                      viewMode === 'tree'
                        ? 'bg-white text-reno-dark shadow-md'
                        : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'
                    }`}
                  >
                    <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: viewMode === 'tree' ? "'FILL' 1" : "'FILL' 0" }}>account_tree</span>
                    WBS Tree
                  </button>
                  <button
                    onClick={() => setViewMode('gantt')}
                    className={`inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-all ${
                      viewMode === 'gantt'
                        ? 'bg-white text-reno-dark shadow-md'
                        : 'text-slate-500 hover:text-slate-700 hover:bg-white/50'
                    }`}
                  >
                    <span className="material-symbols-outlined text-base" style={{ fontVariationSettings: viewMode === 'gantt' ? "'FILL' 1" : "'FILL' 0" }}>timeline</span>
                    Timeline
                  </button>
                </div>

                {/* Gantt Chart View */}
                {viewMode === 'gantt' && (
                  <div className="mb-6">
                    {/* Mobile scroll hint */}
                    <div className="mb-3 flex items-center gap-2 text-xs text-slate-500 md:hidden print:hidden">
                      <span className="material-symbols-outlined text-sm text-primary">swipe</span>
                      Scroll horizontally to see the full timeline
                    </div>
                    <GanttChart template={generatedWbs} totalBudget={totalBudget} />
                  </div>
                )}

                {/* WBS Tree View */}
                <div ref={wbsOutputRef} className={`space-y-5 print:space-y-3 ${viewMode === 'gantt' ? 'hidden print:block' : ''}`}>
                  {generatedWbs.phases.map((phase) => {
                    const isExpanded = expandedPhases.has(phase.code);
                    const phaseCost = calculatePhaseCost(phase, totalBudget);
                    const phaseDuration = phase.tasks.reduce((sum, t) => sum + t.durationDays, 0);
                    const phasePct = phase.tasks.reduce((sum, t) => sum + t.costPctOfTotal, 0);

                    return (
                      <div
                        key={phase.code}
                        className="group rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all hover:shadow-md hover:border-primary/20 print:rounded-lg print:break-inside-avoid print:shadow-none"
                      >
                        {/* Phase header */}
                        <button
                          onClick={() => togglePhase(phase.code)}
                          className="flex w-full items-center gap-4 p-6 text-left transition-colors hover:bg-gradient-to-r hover:from-slate-50 hover:to-white print:p-3"
                        >
                          <div className={`h-12 w-2 rounded-full ${getPhaseColor(phase.name)} shadow-sm print:h-8 print:w-1.5`} />
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                              <span className="text-sm font-mono font-bold text-slate-400 bg-slate-100 px-2 py-0.5 rounded">{phase.code}</span>
                              <h3 className="text-lg font-bold text-reno-dark truncate print:text-sm">{phase.name}</h3>
                            </div>
                            <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-slate-500">
                              <span className="inline-flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-sm text-primary">assignment</span>
                                {phase.tasks.length} tasks
                              </span>
                              <span className="inline-flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-sm text-primary">schedule</span>
                                {phaseDuration} days
                              </span>
                              <span className="inline-flex items-center gap-1.5">
                                <span className="material-symbols-outlined text-sm text-primary">pie_chart</span>
                                {Math.round(phasePct)}% of budget
                              </span>
                              {totalBudget > 0 && (
                                <span className="inline-flex items-center gap-1.5 font-semibold text-slate-700">
                                  <span className="material-symbols-outlined text-sm text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>payments</span>
                                  {formatPrice(phaseCost.min)} – {formatPrice(phaseCost.max)}
                                </span>
                              )}
                            </div>
                          </div>
                          <span className="material-symbols-outlined text-slate-400 transition-transform duration-300 print:hidden" style={{ transform: isExpanded ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                            expand_more
                          </span>
                        </button>

                        {/* Phase description + Task list */}
                        {isExpanded && (
                          <div className="border-t border-slate-100 print:border-t-0">
                            {/* Phase description */}
                            {phase.description && (
                              <div className="px-6 py-4 bg-gradient-to-r from-slate-50/80 to-white border-b border-slate-100 print:px-3 print:py-2">
                                <div className="flex gap-3">
                                  <span className="material-symbols-outlined text-primary text-base mt-0.5 shrink-0" style={{ fontVariationSettings: "'FILL' 1" }}>info</span>
                                  <p className="text-sm leading-relaxed text-slate-700 print:text-xs">{phase.description}</p>
                                </div>
                              </div>
                            )}
                            <div className="divide-y divide-slate-50">
                              {phase.tasks.map((task) => {
                                const taskCostMin = totalBudget > 0 ? Math.round(totalBudget * (task.costPctOfTotal / 100) * 0.9) : 0;
                                const taskCostMax = totalBudget > 0 ? Math.round(totalBudget * (task.costPctOfTotal / 100) * 1.1) : 0;

                                return (
                                  <div key={task.code} className="px-6 py-4 hover:bg-slate-50/50 transition-colors print:px-3 print:py-2 print:hover:bg-transparent">
                                    <div className="flex items-start gap-4">
                                      <div className="w-14 shrink-0 pt-1">
                                        <span className="text-xs font-mono font-bold text-white bg-primary px-2 py-1 rounded">{task.code}</span>
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <p className="text-sm font-semibold text-reno-dark mb-1 print:text-xs">{task.name}</p>
                                        {task.dependsOn && task.dependsOn.length > 0 && (
                                          <p className="text-xs text-slate-500 mb-1 inline-flex items-center gap-1.5">
                                            <span className="material-symbols-outlined text-sm">arrow_right_alt</span>
                                            Depends on: <span className="font-mono font-medium">{task.dependsOn.join(', ')}</span>
                                          </p>
                                        )}
                                        {/* Task description */}
                                        {task.description && (
                                          <p className="mt-2 text-xs leading-relaxed text-slate-600 print:text-[10px] border-l-2 border-slate-200 pl-3">
                                            {task.description}
                                          </p>
                                        )}
                                      </div>
                                      <div className="shrink-0 text-right">
                                        <div className="inline-flex items-center gap-1 text-sm font-bold text-reno-dark bg-slate-100 px-2.5 py-1 rounded-lg print:text-xs print:px-1.5">
                                          <span className="material-symbols-outlined text-sm text-primary">schedule</span>
                                          {task.durationDays}d
                                        </div>
                                        {totalBudget > 0 && (
                                        <div className="text-xs text-slate-500 mt-1.5 font-medium">
                                          {formatPrice(taskCostMin)}–{formatPrice(taskCostMax)}
                                        </div>
                                      )}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Contingency note */}
                {totalBudget > 0 && (
                  <div className="mt-8 rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-amber-100/50 p-6 shadow-sm print:rounded-lg print:p-3 print:mt-4">
                    <div className="flex items-start gap-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-200/50">
                        <span className="material-symbols-outlined text-amber-700 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                          info
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-amber-900 mb-2">
                          Recommended Contingency: {selectedService.contingencyPct}%
                          <span className="ml-2 text-amber-700">({formatPrice(Math.round(totalBudget * selectedService.contingencyPct / 100))})</span>
                        </p>
                        <p className="text-xs leading-relaxed text-amber-800">
                          Costs are estimates based on {city?.name || 'Toronto'} market rates. Actual costs vary by project complexity,
                          site conditions, and contractor. Always get 3+ quotes.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* CTA section */}
                <div className="mt-10 grid gap-5 sm:grid-cols-2 print:hidden">
                  <Link
                    href="/contracts"
                    className="group flex items-center gap-5 rounded-2xl border-2 border-slate-200 bg-white p-6 transition-all hover:shadow-float hover:-translate-y-1 hover:border-primary/30"
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-white group-hover:scale-110 group-hover:shadow-md">
                      <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        description
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-base font-bold text-reno-dark mb-1 group-hover:text-primary transition-colors">Generate a Contract</p>
                      <p className="text-sm text-slate-600 leading-relaxed">Ontario-compliant contract for your {selectedService.title} project.</p>
                    </div>
                    <span className="material-symbols-outlined text-slate-400 transition-all group-hover:text-primary group-hover:translate-x-1">
                      arrow_forward
                    </span>
                  </Link>
                  <Link
                    href={`/costs/${selectedService.slug}`}
                    className="group flex items-center gap-5 rounded-2xl border-2 border-slate-200 bg-white p-6 transition-all hover:shadow-float hover:-translate-y-1 hover:border-primary/30"
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-white group-hover:scale-110 group-hover:shadow-md">
                      <span className="material-symbols-outlined text-[26px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        attach_money
                      </span>
                    </div>
                    <div className="flex-1">
                      <p className="text-base font-bold text-reno-dark mb-1 group-hover:text-primary transition-colors">Detailed Cost Guide</p>
                      <p className="text-sm text-slate-600 leading-relaxed">Full pricing breakdown for {selectedService.title} in {city?.name || 'your city'}.</p>
                    </div>
                    <span className="material-symbols-outlined text-slate-400 transition-all group-hover:text-primary group-hover:translate-x-1">
                      arrow_forward
                    </span>
                  </Link>
                </div>

                {/* Navigation */}
                <div className="mt-10 flex items-center justify-between print:hidden">
                  <button
                    onClick={goBack}
                    className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-slate-700 transition-all hover:bg-slate-50 hover:border-slate-300"
                  >
                    <span className="material-symbols-outlined text-lg">arrow_back</span>
                    Back
                  </button>
                  <button
                    onClick={startOver}
                    className="inline-flex items-center gap-2 rounded-xl border-2 border-primary/20 bg-primary/5 px-6 py-3.5 text-sm font-semibold text-primary transition-all hover:bg-primary/10 hover:border-primary/30"
                  >
                    <span className="material-symbols-outlined text-lg">restart_alt</span>
                    Start Over
                  </button>
                </div>

                {/* Print footer */}
                <div className="hidden print:block mt-8 pt-4 border-t border-slate-200 text-center">
                  <p className="text-xs text-slate-400">Generated by RenoNext — renonext.com/wbs-generator — {new Date().toLocaleDateString('en-CA')}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
}
