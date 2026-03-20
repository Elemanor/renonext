import type { Metadata } from 'next';
import Link from 'next/link';
import { ScrollReveal } from '@/components/sentinel/scroll-reveal';
import {
  safetyModules,
  heroStats,
  jsaFormMock,
  templatePickerMock,
  templateCategories,
  crewMock,
  formTypes,
  formStats,
  riskColors,
} from '@/lib/data/safety';

export const metadata: Metadata = {
  title: 'SafetyHub — Safety Docs Done Before the Trucks Arrive | RenoNext',
  description:
    'JSA Generator, Toolbox Meetings, equipment inspections, crew sign-off, and instant PDF export — the construction safety app that eliminates paper forms.',
};

export default function SafetyPage() {
  return (
    <main className="overflow-hidden">
      {/* ================================================================
          SECTION 1 — HERO
          White bg, amber/orange safety accent
          ================================================================ */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-orange-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20 lg:py-28">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-600/10 to-orange-600/10 px-4 py-1.5 rounded-full border border-amber-500/20 mb-8">
                <span
                  className="material-symbols-outlined text-amber-600 text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  health_and_safety
                </span>
                <span className="text-xs font-bold uppercase tracking-widest text-amber-700">
                  Construction Safety App
                </span>
              </div>

              {/* Headline */}
              <h1 className="text-5xl md:text-7xl font-extrabold text-[#102122] leading-[1.05] tracking-tight mb-6">
                Safety docs done
                <br />
                <span className="bg-gradient-to-r from-amber-600 to-orange-700 bg-clip-text text-transparent">
                  before the trucks arrive.
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-lg md:text-xl text-gray-500 max-w-xl font-light leading-relaxed mb-10">
                JSA forms, toolbox talks, equipment inspections, crew sign-off,
                and instant PDF export — everything your safety program needs,
                built for the field.
              </p>

              {/* Stat pills */}
              <div className="flex flex-wrap gap-5">
                {heroStats.map((stat) => (
                  <div key={stat.label} className="flex flex-col">
                    <span className="text-[10px] uppercase tracking-widest text-gray-400 mb-1 font-medium">
                      {stat.label}
                    </span>
                    <div className="bg-gray-100 px-5 py-2.5">
                      <span className="font-black text-[#102122] text-lg">
                        {stat.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: Dashboard mockup with floating stat card */}
            <div className="relative hidden lg:block">
              <div className="absolute -inset-4 bg-amber-500/10 rounded-3xl blur-3xl opacity-40" />

              {/* Tablet-style dashboard frame */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border-8 border-white">
                <div className="bg-gradient-to-br from-[#1a2d3d] to-[#2c4a5e] aspect-[4/3] p-6 flex flex-col">
                  {/* Search bar */}
                  <div className="bg-white/10 rounded-xl px-4 py-2.5 flex items-center gap-2.5 mb-5 border border-white/5">
                    <span className="material-symbols-outlined text-gray-400 text-base">
                      search
                    </span>
                    <span className="text-xs text-gray-400">Search forms, crew, projects...</span>
                  </div>

                  {/* Stats bento grid */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {/* Active Inspections - full width */}
                    <div className="col-span-2 bg-gradient-to-br from-[#0fbabd] to-[#0d9699] rounded-xl p-4 border border-white/10">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-[9px] text-white/70 uppercase tracking-widest font-bold mb-1">Active Inspections</p>
                          <div className="flex items-end gap-2">
                            <span className="text-3xl font-extrabold text-white font-display">12</span>
                            <span className="text-xs font-bold text-emerald-300 mb-1">(+2)</span>
                          </div>
                        </div>
                        <span
                          className="material-symbols-outlined text-white text-2xl opacity-80"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          assignment
                        </span>
                      </div>
                    </div>
                    {/* Pending */}
                    <div className="bg-white/10 rounded-xl p-3 border border-white/5">
                      <p className="text-[8px] text-gray-400 uppercase tracking-widest font-bold mb-1">Pending</p>
                      <span className="text-2xl font-extrabold text-white font-display">04</span>
                    </div>
                    {/* High Risk */}
                    <div className="bg-white/10 rounded-xl p-3 border border-white/5">
                      <p className="text-[8px] text-gray-400 uppercase tracking-widest font-bold mb-1">High Risk</p>
                      <span className="text-2xl font-extrabold text-red-400 font-display">02</span>
                    </div>
                  </div>

                  {/* Create New JSA button */}
                  <div className="bg-gradient-to-r from-amber-600 to-orange-700 text-white py-3 rounded-xl text-center flex items-center justify-center gap-2 mb-5 shadow-lg">
                    <span
                      className="material-symbols-outlined text-lg"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      add_circle
                    </span>
                    <span className="text-xs font-extrabold tracking-tight">Create New JSA</span>
                  </div>

                  {/* Recent JSAs */}
                  <div className="space-y-2 flex-1">
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Recent JSAs</span>
                      <span className="text-[8px] font-bold text-amber-400">View All</span>
                    </div>
                    {/* JSA #1 */}
                    <div className="bg-white/5 rounded-lg p-2.5 border border-white/5">
                      <div className="flex items-start justify-between mb-1">
                        <span className="text-[8px] font-bold text-gray-400">#JSA-2024-081</span>
                        <span className="text-[7px] font-bold px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                          Approved
                        </span>
                      </div>
                      <p className="text-[10px] font-bold text-white mb-1">Excavation and Trenching</p>
                      <p className="text-[8px] text-gray-500 mb-2">Downtown Commercial Hub</p>
                      <div className="flex items-center justify-between">
                        <div className="flex -space-x-1.5">
                          <div className="w-5 h-5 rounded-full bg-amber-500 border border-white/20 flex items-center justify-center">
                            <span className="text-[7px] font-bold text-white">JD</span>
                          </div>
                          <div className="w-5 h-5 rounded-full bg-blue-500 border border-white/20 flex items-center justify-center">
                            <span className="text-[7px] font-bold text-white">AS</span>
                          </div>
                        </div>
                        <span className="text-[7px] text-gray-500">Updated 2h ago</span>
                      </div>
                    </div>
                    {/* JSA #2 */}
                    <div className="bg-white/5 rounded-lg p-2.5 border border-white/5">
                      <div className="flex items-start justify-between mb-1">
                        <span className="text-[8px] font-bold text-gray-400">#JSA-2024-085</span>
                        <span className="text-[7px] font-bold px-1.5 py-0.5 rounded-full bg-amber-500/20 text-amber-400">
                          In Progress
                        </span>
                      </div>
                      <p className="text-[10px] font-bold text-white mb-1">Scaffolding Erection - Block C</p>
                      <p className="text-[8px] text-gray-500 mb-2">Harbor View Residential</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <span
                            className="material-symbols-outlined text-amber-400 text-[10px]"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            warning
                          </span>
                          <span className="text-[7px] text-amber-400 font-bold">High Risk Area</span>
                        </div>
                        <span className="text-[7px] text-gray-500">Started 45m ago</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Phone mockup overlap */}
              <div className="absolute -bottom-10 -right-4 w-[180px] z-30">
                <div className="bg-zinc-900 rounded-[2.5rem] p-2 shadow-2xl border-[6px] border-zinc-800">
                  <div className="rounded-[2rem] overflow-hidden bg-[#f8faf8] flex flex-col h-[280px]">
                    {/* Mini JSA detail preview */}
                    <div className="px-3 pt-4 pb-2">
                      <div className="flex items-center gap-1.5 mb-1">
                        <span className="text-[8px] font-bold text-gray-600 bg-gray-200 px-2 py-0.5 rounded-full">
                          JSA #104
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        <span className="text-[7px] font-bold text-emerald-600">Active</span>
                      </div>
                      <h3 className="text-[11px] font-extrabold text-[#102122] mb-2">
                        Excavation &amp; Trenching
                      </h3>
                    </div>
                    {/* Step preview card */}
                    <div className="px-3 flex-1">
                      <div className="bg-white rounded-lg p-2 shadow-sm border-l-2 border-amber-500">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="w-4 h-4 rounded bg-amber-100 flex items-center justify-center text-[7px] font-bold text-amber-700">
                            01
                          </span>
                          <span className="text-[8px] font-bold text-[#102122]">
                            Site Perimeter Check
                          </span>
                        </div>
                        <p className="text-[7px] text-gray-500 mb-1">
                          Verify all utility markings and clearance zones
                        </p>
                        <div className="flex flex-wrap gap-1">
                          <span className="text-[6px] bg-red-50 text-red-600 px-1 py-0.5 rounded font-bold">
                            Utility Strike
                          </span>
                          <span className="text-[6px] bg-amber-50 text-amber-600 px-1 py-0.5 rounded font-bold">
                            Medium Risk
                          </span>
                        </div>
                      </div>
                    </div>
                    {/* CTA */}
                    <div className="px-3 pb-3 mt-auto">
                      <div className="bg-gradient-to-r from-amber-600 to-orange-700 text-white py-2 rounded-lg text-center">
                        <span className="text-[8px] font-bold">Open Full JSA</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating compliance card */}
              <div className="absolute -bottom-6 -left-6 bg-[#102122]/90 backdrop-blur-md p-5 rounded-xl border border-white/10 text-white shadow-2xl z-20">
                <div className="flex items-center gap-3">
                  <div className="bg-gradient-to-br from-amber-500 to-orange-600 p-2.5 rounded-lg">
                    <span
                      className="material-symbols-outlined text-white"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      verified_user
                    </span>
                  </div>
                  <div>
                    <div className="text-2xl font-black font-display">100%</div>
                    <div className="text-[9px] uppercase tracking-widest text-gray-400">MOL Compliant</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 2 — JSA STEP ENTRY FORM
          Dark bg with phone mockup of step entry form + feature copy
          ================================================================ */}
      <section className="bg-[#102122] py-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">
                JSA Generator
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-white mt-4 tracking-tight">
                From Template to Signed PDF
              </h2>
              <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-lg">
                Pick a template, confirm the hazards, assign controls, collect
                crew signatures — done before the first truck arrives.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              {/* Phone mockup — JSA Step Entry Form */}
              <div className="w-full max-w-[320px] flex-shrink-0">
                <div className="bg-zinc-900 rounded-[3rem] p-3 shadow-2xl border-[8px] border-zinc-800">
                  {/* Notch */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-32 h-6 bg-zinc-800 rounded-b-2xl" style={{ position: 'relative', margin: '-12px auto 0' }} />

                  <div className="rounded-[2.2rem] overflow-hidden bg-[#f8faf8] flex flex-col min-h-[560px]">
                    {/* App header - dark bar */}
                    <div className="px-5 pt-6 pb-3 flex justify-between items-center bg-[#162839]">
                      <span className="material-symbols-outlined text-white text-lg">
                        close
                      </span>
                      <span className="text-xs font-extrabold text-white tracking-tight">
                        SITESAFE
                      </span>
                      <div className="w-5"></div>
                    </div>

                    {/* Section header */}
                    <div className="px-5 pt-4 pb-2">
                      <span className="text-[8px] font-bold text-gray-500 uppercase tracking-widest bg-gray-100 px-2 py-0.5 rounded-full">
                        JSA STEP 04
                      </span>
                      <h3 className="text-base font-extrabold text-[#102122] tracking-tight mt-2">
                        Edit Job Step
                      </h3>
                      <p className="text-[9px] text-gray-500 mt-1">
                        Define the task, identify hazards, and assign control measures
                      </p>
                    </div>

                    {/* Form fields */}
                    <div className="px-5 pt-2 space-y-3 flex-1">
                      {/* Job Step Description */}
                      <div>
                        <label className="text-[8px] font-bold text-gray-600 uppercase tracking-widest block mb-1">
                          Job Step Description
                        </label>
                        <div className="bg-white rounded-lg px-3 py-2.5 border border-gray-200 min-h-[60px]">
                          <span className="text-[9px] text-[#102122] leading-relaxed">
                            Excavation of trench for electrical conduit installation near Zone B structural footings.
                          </span>
                        </div>
                      </div>

                      {/* Risk Level Selector */}
                      <div>
                        <label className="text-[8px] font-bold text-gray-600 uppercase tracking-widest block mb-1.5">
                          Risk Level
                        </label>
                        <div className="grid grid-cols-3 gap-2">
                          <div className="bg-white rounded-lg p-2.5 border border-gray-200 flex flex-col items-center gap-1.5 cursor-pointer">
                            <div className="w-4 h-4 rounded-full bg-emerald-500"></div>
                            <span className="text-[8px] font-bold text-gray-600">Low</span>
                          </div>
                          <div className="bg-white rounded-lg p-2.5 border-2 border-amber-500 flex flex-col items-center gap-1.5 cursor-pointer">
                            <div className="w-4 h-4 rounded-full bg-amber-500"></div>
                            <span className="text-[8px] font-bold text-amber-600">Medium</span>
                          </div>
                          <div className="bg-white rounded-lg p-2.5 border border-gray-200 flex flex-col items-center gap-1.5 cursor-pointer">
                            <div className="w-4 h-4 rounded-full bg-red-500"></div>
                            <span className="text-[8px] font-bold text-gray-600">High</span>
                          </div>
                        </div>
                      </div>

                      {/* Potential Hazards */}
                      <div>
                        <label className="text-[8px] font-bold text-gray-600 uppercase tracking-widest block mb-1 flex items-center gap-1">
                          <span
                            className="material-symbols-outlined text-amber-600 text-xs"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            warning
                          </span>
                          Potential Hazards
                        </label>
                        <div className="bg-white rounded-lg px-3 py-2.5 border border-gray-200">
                          <span className="text-[9px] text-[#102122] leading-relaxed">
                            Contact with unidentified underground utility lines; soil instability due to recent rainfall.
                          </span>
                        </div>
                      </div>

                      {/* Control Measures */}
                      <div>
                        <label className="text-[8px] font-bold text-gray-600 uppercase tracking-widest block mb-1 flex items-center gap-1">
                          <span
                            className="material-symbols-outlined text-emerald-600 text-xs"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            verified_user
                          </span>
                          Control Measures
                        </label>
                        <div className="bg-white rounded-lg px-3 py-2.5 border border-gray-200">
                          <span className="text-[9px] text-[#102122] leading-relaxed">
                            Hand-digging within 1m of marked services. Continuous spotter presence.
                          </span>
                        </div>
                      </div>

                      {/* PPE row */}
                      <div>
                        <label className="text-[8px] font-bold text-gray-600 uppercase tracking-widest block mb-1.5">
                          Required PPE
                        </label>
                        <div className="flex items-center gap-2">
                          <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                            <span className="text-amber-600 text-xs">🪖</span>
                          </div>
                          <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                            <span className="text-amber-600 text-xs">🥽</span>
                          </div>
                          <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center border border-amber-500/20">
                            <span className="text-amber-600 text-xs">🧤</span>
                          </div>
                          <div className="w-9 h-9 rounded-lg bg-white flex items-center justify-center border-2 border-dashed border-gray-300 cursor-pointer">
                            <span className="material-symbols-outlined text-gray-400 text-sm">
                              add
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Save Step button */}
                    <div className="mx-4 mb-4 mt-auto">
                      <div className="bg-gradient-to-r from-[#0fbabd] to-[#0d9699] text-white py-3 rounded-xl text-center flex items-center justify-center gap-2">
                        <span
                          className="material-symbols-outlined text-lg"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          save
                        </span>
                        <span className="text-xs font-extrabold tracking-tight">
                          Save Step
                        </span>
                      </div>
                    </div>

                    {/* Bottom nav */}
                    <div className="mt-auto flex justify-around items-center px-2 py-2.5 border-t border-gray-100">
                      {[
                        { icon: 'dashboard', label: 'Dashboard', active: false },
                        { icon: 'assignment', label: 'Forms', active: true },
                        { icon: 'groups', label: 'Crew', active: false },
                        { icon: 'folder', label: 'Docs', active: false },
                      ].map((tab) => (
                        <div
                          key={tab.label}
                          className={`flex flex-col items-center gap-0.5 ${
                            tab.active
                              ? 'bg-amber-500/10 px-2.5 py-1 rounded-lg'
                              : 'px-2.5 py-1'
                          }`}
                        >
                          <span
                            className={`material-symbols-outlined text-sm ${
                              tab.active ? 'text-amber-600' : 'text-gray-400'
                            }`}
                            style={
                              tab.active
                                ? { fontVariationSettings: "'FILL' 1" }
                                : undefined
                            }
                          >
                            {tab.icon}
                          </span>
                          <span
                            className={`text-[7px] font-medium ${
                              tab.active ? 'text-amber-600' : 'text-gray-400'
                            }`}
                          >
                            {tab.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Feature copy */}
              <div className="flex-1 space-y-8">
                <div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-3">
                    Hazard-first workflow
                  </h3>
                  <p className="text-gray-400 leading-relaxed max-w-lg">
                    Every JSA starts with the job steps. For each step, the app
                    suggests common hazards from its database — your crew confirms
                    or adds site-specific risks. Controls are auto-matched to each
                    hazard, then the whole form is locked and signed.
                  </p>
                </div>
                <div className="space-y-5">
                  {[
                    { icon: 'library_books', label: '15 trade-specific templates', desc: 'Excavation, concrete, steel, electrical, general — ready to go.' },
                    { icon: 'warning', label: 'Risk-rated hazard matrix', desc: 'High / Medium / Low ratings with color-coded badges on every step.' },
                    { icon: 'verified', label: 'Control auto-suggestions', desc: 'Database of 200+ controls matched to hazard types. Edit or add your own.' },
                  ].map((item) => (
                    <div key={item.label} className="flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0">
                        <span className="material-symbols-outlined text-amber-500 text-lg">
                          {item.icon}
                        </span>
                      </div>
                      <div>
                        <h4 className="text-white font-bold text-sm mb-0.5">
                          {item.label}
                        </h4>
                        <p className="text-gray-500 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================
          SECTION 3 — CORE CAPABILITIES
          White bg, 2×2 module grid
          ================================================================ */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <div className="text-center mb-16">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
                Core Modules
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#102122] mt-4 tracking-tight">
                Four Modules, Zero Paper
              </h2>
              <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
                Every module is designed for field conditions — gloved hands,
                bright sun, and no Wi-Fi.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {safetyModules.map((mod, i) => (
              <ScrollReveal key={mod.id} delay={i * 80}>
                <div className="bg-[#f6f8f8] p-8 rounded-xl border border-gray-100 h-full">
                  <div className="flex items-start gap-4 mb-5">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm border border-gray-100 flex-shrink-0">
                      <span className="material-symbols-outlined text-amber-600 text-xl">
                        {mod.icon}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-extrabold text-[#102122] text-lg">
                        {mod.name}
                      </h3>
                      <p className="text-xs text-amber-600 font-bold uppercase tracking-wider mt-0.5">
                        {mod.tagline}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed mb-5">
                    {mod.description}
                  </p>
                  <ul className="space-y-2">
                    {mod.features.map((feat) => (
                      <li
                        key={feat}
                        className="flex items-start gap-2 text-sm"
                      >
                        <span
                          className="material-symbols-outlined text-amber-500 text-base mt-0.5 flex-shrink-0"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          check_circle
                        </span>
                        <span className="text-gray-600">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 4 — JSA DETAILS + PPE & SIGN-OFF
          Gray bg, two phone mockups side by side
          ================================================================ */}
      <section className="bg-[#f6f8f8] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <div className="text-center mb-14">
              <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
                Deep Dive
              </span>
              <h2 className="text-4xl md:text-5xl font-extrabold text-[#102122] mt-4 tracking-tight">
                JSA Details + PPE &amp; Sign-off
              </h2>
              <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-lg">
                View complete JSA steps with hazard breakdown, then verify PPE
                and collect every crew member&apos;s signature before work begins.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* JSA Details phone */}
            <ScrollReveal>
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-extrabold text-[#102122] mb-6 tracking-tight">
                  JSA Details
                </h3>
                <div className="w-full max-w-[320px] bg-zinc-900 rounded-[3rem] p-3 shadow-2xl border-[8px] border-zinc-800">
                  <div className="rounded-[2.2rem] overflow-hidden bg-[#f8faf8] flex flex-col min-h-[520px]">
                    {/* Header */}
                    <div className="px-5 pt-6 pb-2 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-outlined text-[#102122] text-lg">
                          arrow_back
                        </span>
                        <span className="text-sm font-extrabold text-[#102122] tracking-tighter">
                          SITESAFE
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-gray-400 text-lg">
                        more_vert
                      </span>
                    </div>

                    <div className="px-5 pt-1 pb-2">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[8px] font-bold text-gray-600 bg-gray-200 px-2 py-0.5 rounded-full">
                          JSA #104
                        </span>
                        <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                          Status: Active
                        </span>
                      </div>
                      <h3 className="text-base font-extrabold text-[#0fbabd] tracking-tight">
                        Excavation and Trenching for Foundation
                      </h3>
                    </div>

                    {/* Info card */}
                    <div className="mx-4 bg-white rounded-xl p-3 shadow-sm mb-3">
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-[7px] text-gray-400 uppercase tracking-widest font-bold mb-0.5">Project</p>
                          <p className="text-[9px] font-bold text-[#102122]">Skyline Heights Phase II</p>
                        </div>
                        <div>
                          <p className="text-[7px] text-gray-400 uppercase tracking-widest font-bold mb-0.5">Supervisor</p>
                          <div className="flex items-center gap-1">
                            <p className="text-[9px] font-bold text-[#102122]">Marcus Thorne</p>
                            <span
                              className="material-symbols-outlined text-[#0fbabd] text-[10px]"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              verified
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Tab bar */}
                    <div className="px-5 flex gap-4 border-b border-gray-200 mb-3">
                      <div className="pb-2 border-b-2 border-amber-500">
                        <span className="text-[9px] font-bold text-amber-600 uppercase tracking-widest">Steps</span>
                      </div>
                      <div className="pb-2">
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">PPE</span>
                      </div>
                      <div className="pb-2">
                        <span className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">Sign-off</span>
                      </div>
                    </div>

                    {/* Step cards */}
                    <div className="mx-4 space-y-2 mb-3 flex-1">
                      {/* Step 1 */}
                      <div className="bg-white rounded-xl p-2.5 shadow-sm border-l-2 border-amber-500">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-[8px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
                            Step 01
                          </span>
                          <span className="text-[10px] font-bold text-[#102122]">
                            Site Perimeter Check
                          </span>
                        </div>
                        <p className="text-[8px] text-gray-500 mb-1.5 leading-relaxed">
                          Verify all utility markings, clearance zones, and underground service locations
                        </p>
                        <div className="flex flex-wrap gap-1">
                          <span className="text-[7px] bg-red-50 text-red-600 px-1.5 py-0.5 rounded font-bold">
                            Utility Strike
                          </span>
                          <span className="text-[7px] bg-red-50 text-red-600 px-1.5 py-0.5 rounded font-bold">
                            High Risk
                          </span>
                        </div>
                      </div>
                      {/* Step 2 */}
                      <div className="bg-white rounded-xl p-2.5 shadow-sm border-l-2 border-red-500">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span className="text-[8px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">
                            Step 02
                          </span>
                          <span className="text-[10px] font-bold text-[#102122]">
                            Excavation Commencement
                          </span>
                        </div>
                        <p className="text-[8px] text-gray-500 mb-1.5 leading-relaxed">
                          Begin trenching operations with spotter present and trench box ready
                        </p>
                        <div className="flex flex-wrap gap-1">
                          <span className="text-[7px] bg-red-50 text-red-600 px-1.5 py-0.5 rounded font-bold">
                            Cave-in
                          </span>
                          <span className="text-[7px] bg-red-50 text-red-600 px-1.5 py-0.5 rounded font-bold">
                            Critical Risk
                          </span>
                        </div>
                      </div>
                      {/* Add Step button */}
                      <div className="border-2 border-dashed border-gray-300 rounded-xl p-2.5 flex items-center justify-center gap-1.5 cursor-pointer hover:border-amber-500 hover:bg-amber-50/50 transition-colors">
                        <span className="material-symbols-outlined text-gray-400 text-sm">
                          add
                        </span>
                        <span className="text-[9px] font-bold text-gray-500">Add Step</span>
                      </div>
                    </div>

                    {/* Bottom nav */}
                    <div className="mt-auto flex justify-around items-center px-2 py-2.5 border-t border-gray-100">
                      {[
                        { icon: 'home', label: 'Home', active: true },
                        { icon: 'notifications', label: 'Alerts', active: false },
                        { icon: 'person', label: 'Profile', active: false },
                      ].map((tab) => (
                        <div
                          key={tab.label}
                          className={`flex flex-col items-center gap-0.5 ${
                            tab.active
                              ? 'bg-amber-500/10 px-3 py-1 rounded-lg'
                              : 'px-3 py-1'
                          }`}
                        >
                          <span
                            className={`material-symbols-outlined text-sm ${
                              tab.active ? 'text-amber-600' : 'text-gray-400'
                            }`}
                            style={
                              tab.active
                                ? { fontVariationSettings: "'FILL' 1" }
                                : undefined
                            }
                          >
                            {tab.icon}
                          </span>
                          <span
                            className={`text-[7px] font-medium ${
                              tab.active ? 'text-amber-600' : 'text-gray-400'
                            }`}
                          >
                            {tab.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* PPE & Sign-off phone */}
            <ScrollReveal delay={100}>
              <div className="flex flex-col items-center">
                <h3 className="text-xl font-extrabold text-[#102122] mb-6 tracking-tight">
                  PPE &amp; Sign-off
                </h3>
                <div className="w-full max-w-[320px] bg-zinc-900 rounded-[3rem] p-3 shadow-2xl border-[8px] border-zinc-800">
                  <div className="rounded-[2.2rem] overflow-hidden bg-[#f8faf8] flex flex-col min-h-[520px]">
                    {/* Header */}
                    <div className="px-5 pt-6 pb-2 flex justify-between items-center">
                      <span className="material-symbols-outlined text-[#102122] text-lg">
                        menu
                      </span>
                      <span className="text-sm font-extrabold text-[#102122] tracking-tighter">
                        SITESAFE
                      </span>
                      <span className="material-symbols-outlined text-gray-400 text-lg">
                        more_vert
                      </span>
                    </div>

                    <div className="px-5 pt-1 pb-2">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[8px] font-bold text-gray-600 bg-gray-200 px-2 py-0.5 rounded-full">
                          Site ID: #4492-B
                        </span>
                        <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                          ACTIVE SITE
                        </span>
                      </div>
                      <h2 className="text-lg font-extrabold text-[#102122] tracking-tight font-display">
                        PPE &amp; Sign-off
                      </h2>
                      <p className="text-[9px] text-gray-500 mt-0.5">
                        Required verification before entering Zone 4
                      </p>
                    </div>

                    {/* PPE grid */}
                    <div className="mx-4 mb-4">
                      <div className="flex items-center gap-2 mb-2 border-l-2 border-[#0fbabd] pl-2">
                        <span className="text-[9px] font-bold text-[#102122] uppercase tracking-widest">
                          Required PPE
                        </span>
                      </div>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-white rounded-lg p-3 flex flex-col items-center gap-1.5 border border-gray-200">
                          <span className="text-xl">🪖</span>
                          <span className="text-[8px] font-bold text-gray-600">Hard Hat</span>
                        </div>
                        <div className="bg-amber-50 rounded-lg p-3 flex flex-col items-center gap-1.5 border-2 border-amber-500">
                          <span className="text-xl">🦺</span>
                          <span className="text-[8px] font-bold text-amber-600">Hi-Vis</span>
                        </div>
                        <div className="bg-white rounded-lg p-3 flex flex-col items-center gap-1.5 border border-gray-200">
                          <span className="text-xl">🧤</span>
                          <span className="text-[8px] font-bold text-gray-600">Gloves</span>
                        </div>
                        <div className="bg-white rounded-lg p-3 flex flex-col items-center gap-1.5 border border-gray-200">
                          <span className="text-xl">🥽</span>
                          <span className="text-[8px] font-bold text-gray-600">Goggles</span>
                        </div>
                        <div className="bg-amber-50 rounded-lg p-3 flex flex-col items-center gap-1.5 border-2 border-amber-500">
                          <span className="text-xl">👢</span>
                          <span className="text-[8px] font-bold text-amber-600">Steel Toe</span>
                        </div>
                        <div className="bg-white rounded-lg p-3 flex flex-col items-center gap-1.5 border border-gray-200">
                          <span className="text-xl">🎧</span>
                          <span className="text-[8px] font-bold text-gray-600">Ears</span>
                        </div>
                      </div>
                    </div>

                    {/* Worker Sign-off */}
                    <div className="mx-4 mb-3 flex-1">
                      <div className="flex items-center gap-2 mb-2 border-l-2 border-[#0fbabd] pl-2">
                        <span className="text-[9px] font-bold text-[#102122] uppercase tracking-widest">
                          Worker Sign-off
                        </span>
                      </div>
                      <div className="space-y-2">
                        {/* Worker 1 */}
                        <div className="bg-white rounded-xl p-2.5 flex items-center gap-2.5 shadow-sm">
                          <div className="w-8 h-8 rounded-lg bg-blue-500 flex items-center justify-center flex-shrink-0">
                            <span className="text-[10px] font-bold text-white">NN</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-[10px] font-bold text-[#102122]">
                              Namer Names
                            </p>
                            <p className="text-[8px] text-gray-500">
                              Structural Lead
                            </p>
                          </div>
                          <div className="bg-gradient-to-r from-amber-600 to-orange-700 text-white px-2.5 py-1 rounded-lg">
                            <span className="text-[8px] font-bold">Tap to Sign</span>
                          </div>
                        </div>
                        {/* Worker 2 */}
                        <div className="bg-white rounded-xl p-2.5 flex items-center gap-2.5 shadow-sm">
                          <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center flex-shrink-0">
                            <span className="text-[10px] font-bold text-white">MS</span>
                          </div>
                          <div className="flex-1">
                            <p className="text-[10px] font-bold text-[#102122]">
                              Muher Smith
                            </p>
                            <p className="text-[8px] text-gray-500">
                              Site Inspector
                            </p>
                          </div>
                          <div className="bg-gradient-to-r from-amber-600 to-orange-700 text-white px-2.5 py-1 rounded-lg">
                            <span className="text-[8px] font-bold">Tap to Sign</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom nav */}
                    <div className="mt-auto flex justify-around items-center px-2 py-2.5 border-t border-gray-100">
                      {[
                        { icon: 'home', label: 'Home', active: false },
                        { icon: 'notifications', label: 'Alerts', active: true },
                        { icon: 'person', label: 'Profile', active: false },
                      ].map((tab) => (
                        <div
                          key={tab.label}
                          className={`flex flex-col items-center gap-0.5 ${
                            tab.active
                              ? 'bg-amber-500/10 px-3 py-1 rounded-lg'
                              : 'px-3 py-1'
                          }`}
                        >
                          <span
                            className={`material-symbols-outlined text-sm ${
                              tab.active ? 'text-amber-600' : 'text-gray-400'
                            }`}
                            style={
                              tab.active
                                ? { fontVariationSettings: "'FILL' 1" }
                                : undefined
                            }
                          >
                            {tab.icon}
                          </span>
                          <span
                            className={`text-[7px] font-medium ${
                              tab.active ? 'text-amber-600' : 'text-gray-400'
                            }`}
                          >
                            {tab.label}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 5 — FIVE FORM TYPES
          White bg, copy left + stacked form cards right
          ================================================================ */}
      <section className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            {/* Left: Copy */}
            <ScrollReveal>
              <div className="flex-1 space-y-6">
                <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
                  Complete Coverage
                </span>
                <h2 className="text-3xl md:text-4xl font-extrabold text-[#102122] tracking-tight">
                  Five Form Types,
                  <br />
                  One App
                </h2>
                <p className="text-gray-500 leading-relaxed max-w-lg">
                  Every safety document your site needs — from morning toolbox
                  talks to equipment pre-op checklists. Each form type is
                  purpose-built with field-tested layouts and auto-populated
                  project data.
                </p>
                <div className="space-y-3 pt-2">
                  {[
                    { icon: 'speed', text: 'Average completion time: 48 seconds' },
                    { icon: 'cloud_off', text: 'Works 100% offline — syncs later' },
                    { icon: 'history', text: 'Full audit trail on every form' },
                    { icon: 'translate', text: 'English and French support' },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-amber-600 text-lg">
                        {item.icon}
                      </span>
                      <span className="text-sm text-gray-600 font-medium">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>

            {/* Right: Stacked form type cards */}
            <ScrollReveal delay={100}>
              <div className="flex-1 w-full space-y-3">
                {formTypes.map((form, i) => (
                  <div
                    key={form.abbr}
                    className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-float hover:-translate-y-0.5 transition-all duration-300 flex items-center gap-4"
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${form.color} flex items-center justify-center flex-shrink-0`}>
                      <span
                        className="material-symbols-outlined text-white text-xl"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {form.icon}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5">
                        <h4 className="font-bold text-[#102122] text-sm">
                          {form.name}
                        </h4>
                        <span className="text-[8px] font-bold text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">
                          {form.abbr}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">
                        {form.description}
                      </p>
                    </div>
                    <span className="material-symbols-outlined text-gray-300 text-lg flex-shrink-0">
                      chevron_right
                    </span>
                  </div>
                ))}
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ================================================================
          SECTION 6 — DESKTOP JSA BROWSER FRAME + STATS
          Dark bg, desktop browser frame mockup + stat cards
          ================================================================ */}
      <section className="bg-[#102122] py-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6">
          <ScrollReveal>
            <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
              {/* Left: Desktop Browser Frame */}
              <div className="flex-1 w-full max-w-2xl">
                <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
                  {/* Browser chrome bar */}
                  <div className="bg-gray-100 px-4 py-2.5 flex items-center gap-3 border-b border-gray-200">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                    </div>
                    <div className="flex-1 bg-white rounded-md px-3 py-1">
                      <span className="text-[9px] text-gray-500">app.sitesafe.io/jsa/104</span>
                    </div>
                  </div>

                  {/* App content */}
                  <div className="bg-white">
                    {/* Dark nav bar */}
                    <div className="bg-[#162839] px-5 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                          <span
                            className="material-symbols-outlined text-white text-sm"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            health_and_safety
                          </span>
                        </div>
                        <span className="text-xs font-extrabold text-white tracking-tight">SITESAFE</span>
                      </div>
                      <div className="flex gap-6">
                        <div className="relative">
                          <span className="text-[9px] text-white font-bold">JSA Details</span>
                          <div className="absolute -bottom-3 left-0 right-0 h-0.5 bg-amber-500"></div>
                        </div>
                        <span className="text-[9px] text-white/60 font-medium">Required PPE</span>
                        <span className="text-[9px] text-white/60 font-medium">Team Sign-off</span>
                        <span className="text-[9px] text-white/60 font-medium">History</span>
                      </div>
                    </div>

                    {/* JSA Header */}
                    <div className="px-5 py-4 border-b border-gray-200">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <p className="text-[8px] text-gray-400 mb-1">Projects &gt; Downtown Commercial Hub &gt; JSA-104-DCH</p>
                          <h2 className="text-base font-extrabold text-[#102122] font-display">
                            Excavation and Trenching for Foundation
                          </h2>
                        </div>
                        <div className="bg-gradient-to-r from-amber-600 to-orange-700 text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5">
                          <span
                            className="material-symbols-outlined text-xs"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            picture_as_pdf
                          </span>
                          <span className="text-[8px] font-bold">Export PDF</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="text-[7px] text-gray-400 uppercase tracking-widest">Supervisor</p>
                          <p className="text-[9px] font-bold text-[#102122]">Mark Reynolds</p>
                        </div>
                        <div>
                          <p className="text-[7px] text-gray-400 uppercase tracking-widest">Date</p>
                          <p className="text-[9px] font-bold text-[#102122]">Oct 24, 2023</p>
                        </div>
                        <div className="ml-auto">
                          <span className="text-[8px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                            Approved
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Steps table */}
                    <div className="px-5 py-4">
                      <table className="w-full text-left">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-[8px] font-bold text-gray-500 uppercase tracking-widest pb-2">Step</th>
                            <th className="text-[8px] font-bold text-gray-500 uppercase tracking-widest pb-2">Potential Hazards</th>
                            <th className="text-[8px] font-bold text-gray-500 uppercase tracking-widest pb-2">Control Measures</th>
                            <th className="text-[8px] font-bold text-gray-500 uppercase tracking-widest pb-2 text-right">Risk Level</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-100">
                            <td className="py-2 pr-3">
                              <span className="text-[9px] font-bold text-[#102122]">
                                01 Inspect area for underground utilities
                              </span>
                            </td>
                            <td className="py-2 pr-3">
                              <span className="text-[8px] text-gray-600">
                                Electric shock, Gas leak, Service disruption
                              </span>
                            </td>
                            <td className="py-2 pr-3">
                              <span className="text-[8px] text-gray-600">
                                Call 811, Verify maps, Hand-dig 2ft
                              </span>
                            </td>
                            <td className="py-2 text-right">
                              <span className="text-[7px] font-bold px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700">
                                Medium
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2 pr-3">
                              <span className="text-[9px] font-bold text-[#102122]">
                                02 Excavating trench with heavy machinery
                              </span>
                            </td>
                            <td className="py-2 pr-3">
                              <span className="text-[8px] text-gray-600">
                                Cave-in, Rollover, Falling debris
                              </span>
                            </td>
                            <td className="py-2 pr-3">
                              <span className="text-[8px] text-gray-600">
                                Shoring, 2ft spoil pile, Spotter
                              </span>
                            </td>
                            <td className="py-2 text-right">
                              <span className="text-[7px] font-bold px-1.5 py-0.5 rounded-full bg-red-100 text-red-700">
                                High
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* Bottom grid */}
                    <div className="px-5 py-4 grid grid-cols-2 gap-4 bg-gray-50">
                      {/* Required PPE */}
                      <div>
                        <h4 className="text-[9px] font-bold text-gray-600 uppercase tracking-widest mb-2">
                          Required PPE
                        </h4>
                        <div className="grid grid-cols-4 gap-2">
                          <div className="bg-white rounded-lg p-2 flex flex-col items-center gap-1 border border-gray-200">
                            <span className="text-base">🪖</span>
                            <span className="text-[7px] font-bold text-gray-600">Hard Hat</span>
                          </div>
                          <div className="bg-white rounded-lg p-2 flex flex-col items-center gap-1 border border-gray-200">
                            <span className="text-base">🦺</span>
                            <span className="text-[7px] font-bold text-gray-600">Hi-Vis</span>
                          </div>
                          <div className="bg-white rounded-lg p-2 flex flex-col items-center gap-1 border border-gray-200">
                            <span className="text-base">🥽</span>
                            <span className="text-[7px] font-bold text-gray-600">Goggles</span>
                          </div>
                          <div className="bg-white rounded-lg p-2 flex flex-col items-center gap-1 border border-gray-200">
                            <span className="text-base">🧤</span>
                            <span className="text-[7px] font-bold text-gray-600">Gloves</span>
                          </div>
                        </div>
                      </div>
                      {/* Worker Sign-off */}
                      <div>
                        <h4 className="text-[9px] font-bold text-gray-600 uppercase tracking-widest mb-2">
                          Worker Sign-off
                        </h4>
                        <div className="space-y-1.5">
                          <div className="bg-white rounded-lg px-2 py-1.5 flex items-center gap-2 border border-gray-200">
                            <span
                              className="material-symbols-outlined text-emerald-600 text-xs"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              check_circle
                            </span>
                            <div className="flex-1">
                              <p className="text-[8px] font-bold text-[#102122]">James Lewis</p>
                              <p className="text-[7px] text-gray-500">Operator</p>
                            </div>
                          </div>
                          <div className="bg-white rounded-lg px-2 py-1.5 flex items-center gap-2 border border-gray-200">
                            <span
                              className="material-symbols-outlined text-emerald-600 text-xs"
                              style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                              check_circle
                            </span>
                            <div className="flex-1">
                              <p className="text-[8px] font-bold text-[#102122]">Tom Kincaid</p>
                              <p className="text-[7px] text-gray-500">Laborer</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Stats + copy */}
              <div className="flex-1 space-y-8">
                <div>
                  <span className="text-xs font-bold text-amber-500 uppercase tracking-widest">
                    PDF Export + Analytics
                  </span>
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mt-4">
                    Print-Ready,
                    <br />
                    MOL-Ready
                  </h2>
                  <p className="text-gray-400 leading-relaxed max-w-lg mt-4">
                    Every form generates a professionally formatted PDF with
                    embedded signatures, GPS coordinates, and project metadata.
                    Email it, print it, or save it — your compliance record is
                    always complete.
                  </p>
                </div>

                {/* Stat cards */}
                <div className="grid grid-cols-2 gap-3">
                  {formStats.map((stat) => (
                    <div
                      key={stat.label}
                      className="bg-white/5 border border-white/10 rounded-xl p-4"
                    >
                      <span className="text-[8px] uppercase tracking-widest text-gray-500 font-bold">
                        {stat.label}
                      </span>
                      <div className="flex items-end gap-2 mt-1">
                        <span className="text-2xl font-extrabold text-white">
                          {stat.value}
                        </span>
                        {stat.trend === 'up' && (
                          <span className="text-[9px] font-bold text-emerald-400 flex items-center gap-0.5 mb-1">
                            <span className="material-symbols-outlined text-[10px]">
                              trending_up
                            </span>
                            {stat.change}
                          </span>
                        )}
                        {stat.trend === 'neutral' && (
                          <span className="text-[9px] font-bold text-gray-500 mb-1">
                            {stat.change}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ================================================================
          SECTION 7 — CTA
          Dark with amber glow + trust badges
          ================================================================ */}
      <section className="relative bg-[#0a0e0f] py-24 overflow-hidden">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-amber-600/10 rounded-full blur-[150px] pointer-events-none" />
        {/* Dot grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #f59e0b 1px, transparent 0)', backgroundSize: '24px 24px' }}
        />

        <div className="mx-auto max-w-7xl px-6 text-center relative z-10">
          <ScrollReveal>
            <span
              className="material-symbols-outlined text-amber-500 text-5xl mb-6 inline-block"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              health_and_safety
            </span>

            <h2 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mt-4">
              Eliminate Paper
              <br />
              <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent">
                Safety Forms Today
              </span>
            </h2>

            <p className="text-gray-400 mt-6 max-w-xl mx-auto text-lg">
              JSA forms, toolbox talks, equipment inspections, crew sign-off,
              and instant PDF export — all in one app, built for the field.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10">
              <Link
                href="/jsa"
                className="bg-gradient-to-r from-amber-600 to-orange-700 hover:from-amber-500 hover:to-orange-600 text-white px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all shadow-lg shadow-amber-900/20"
              >
                Try JSA Generator Free
              </Link>
              <Link
                href="/toolbox-talk"
                className="bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-500 hover:to-indigo-600 text-white px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-all shadow-lg shadow-blue-900/20"
              >
                Try Toolbox Talk Free
              </Link>
              <Link
                href="/apps"
                className="border border-white/20 text-white hover:bg-white/5 px-8 py-4 rounded-xl font-bold text-sm uppercase tracking-wider transition-colors"
              >
                Explore All Apps
              </Link>
            </div>

            {/* Trust badges */}
            <div className="flex flex-wrap items-center justify-center gap-8 mt-14 pt-10 border-t border-white/10">
              {[
                { icon: 'verified_user', label: 'WSIB Compliant' },
                { icon: 'gavel', label: 'MOL Ready' },
                { icon: 'cloud_off', label: 'Offline-First' },
                { icon: 'lock', label: 'Encrypted' },
              ].map((badge) => (
                <div key={badge.label} className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-amber-500 text-lg">
                    {badge.icon}
                  </span>
                  <span className="text-white/60 text-xs font-bold uppercase tracking-widest">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
