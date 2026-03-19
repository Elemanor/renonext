import type { Metadata } from 'next';
import Link from 'next/link';
import { ScrollReveal } from '@/components/sentinel/scroll-reveal';
import {
  precisionLayerModules,
  heroStats,
  mockProjects,
  recentDrawings,
  drawingLayers,
  markupTools,
} from '@/lib/data/precision-layer';

export const metadata: Metadata = {
  title: 'Precision Layer — Blueprint Drawing Reader & Markup Platform | RenoNext',
  description:
    'View, annotate, and manage construction blueprints with pixel-perfect rendering, real-time markup tools, layer toggles, and team collaboration — all in one platform.',
};

export default function PrecisionLayerPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* ═══════════════════════════════════════════════════════════════
          Section 1 — Hero (dark)
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative bg-[#102122] pt-28 pb-20 md:pt-36 md:pb-28 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E8AA42]/10 rounded-full blur-[160px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-primary/8 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/3 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left copy */}
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[#E8AA42]/15 rounded-full">
                <span
                  className="material-symbols-outlined text-[#E8AA42] text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  architecture
                </span>
                <span className="text-xs font-bold text-[#E8AA42] uppercase tracking-wider">
                  Drawing Platform
                </span>
              </div>

              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.05]">
                Precision{' '}
                <span className="text-[#E8AA42]">Layer</span>
              </h1>

              <p className="text-xl text-gray-400 leading-relaxed max-w-lg">
                View, annotate, and manage construction blueprints with pixel-perfect
                rendering, real-time markup tools, and team collaboration — all in one platform.
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-[#E8AA42] text-[#102122] font-bold rounded-2xl shadow-float hover:-translate-y-1 hover:shadow-float-hover transition-all duration-300"
                >
                  Request Early Access
                  <span className="material-symbols-outlined text-lg">arrow_forward</span>
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 text-white font-bold rounded-2xl hover:bg-white/20 transition-all duration-300"
                >
                  Book a Demo
                </Link>
              </div>
            </div>

            {/* Right: Mini mockup — Blueprint viewport preview */}
            <div className="relative">
              <div className="bg-[#0a0a0f] rounded-2xl border border-white/[0.08] shadow-2xl overflow-hidden">
                {/* Title bar */}
                <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
                  <div className="flex items-center gap-3">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                    </div>
                    <span className="text-[10px] text-gray-500 font-mono">precision.renonext.com/drawings/A-101</span>
                  </div>
                </div>

                {/* Content: Blueprint viewer mini */}
                <div className="relative p-6 bg-[#0c0e10] min-h-[320px]">
                  {/* Blueprint area */}
                  <div className="bg-white/5 rounded-lg border border-white/[0.06] h-60 relative overflow-hidden">
                    {/* Grid pattern */}
                    <div
                      className="absolute inset-0 opacity-20"
                      style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)',
                        backgroundSize: '24px 24px',
                      }}
                    />
                    {/* RFI pin */}
                    <div className="absolute top-8 left-12 w-20 h-20 border-2 border-dashed border-[#E8AA42] rounded-lg bg-[#E8AA42]/5 flex items-center justify-center">
                      <span className="bg-[#E8AA42] text-[#102122] text-[9px] font-bold px-2 py-0.5 rounded-full absolute -top-2.5">RFI-22</span>
                    </div>
                    {/* Drawing lines simulation */}
                    <div className="absolute top-1/3 left-1/4 w-32 h-px bg-white/20" />
                    <div className="absolute top-1/3 left-1/4 w-px h-20 bg-white/20" />
                    <div className="absolute top-[calc(1/3*100%+80px)] left-1/4 w-32 h-px bg-white/20" />
                    <div className="absolute top-1/3 right-1/4 w-px h-20 bg-white/20" />
                    <div className="absolute bottom-12 right-8 w-24 h-12 border border-white/10 rounded" />
                  </div>

                  {/* Bottom toolbar */}
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2 bg-[#232629]/80 px-4 py-2 rounded-full">
                      <span className="material-symbols-outlined text-white/60 text-sm">remove</span>
                      <span className="text-xs font-semibold text-white/80 min-w-[36px] text-center">85%</span>
                      <span className="material-symbols-outlined text-white/60 text-sm">add</span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-gray-500">
                      <span>Sheet</span>
                      <span className="font-bold text-white/80">01 / 24</span>
                    </div>
                  </div>

                  {/* Floating toolbar indicator */}
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 flex flex-col gap-1 bg-[#232629]/80 p-1.5 rounded-xl">
                    {markupTools.slice(0, 4).map((tool) => (
                      <div
                        key={tool.icon}
                        className={`w-8 h-8 flex items-center justify-center rounded-lg ${
                          tool.active
                            ? 'bg-[#E8AA42] text-[#102122]'
                            : 'text-gray-500'
                        }`}
                      >
                        <span className="material-symbols-outlined text-sm">{tool.icon}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Stats row */}
          <ScrollReveal>
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
              {heroStats.map((stat) => (
                <div
                  key={stat.label}
                  className="text-center p-4 bg-white/5 rounded-2xl border border-white/[0.06]"
                >
                  <div className="text-2xl md:text-3xl font-extrabold text-[#E8AA42]">{stat.value}</div>
                  <div className="text-xs text-gray-500 font-medium mt-1 uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          Section 2 — Blueprint Viewer (white bg)
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Copy */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8AA42]/10">
                  <span className="material-symbols-outlined text-[#E8AA42] text-sm">architecture</span>
                  <span className="text-xs font-bold text-[#E8AA42] uppercase tracking-wider">Blueprint Viewport</span>
                </div>
                <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-[#102122]">
                  Every Line,{' '}
                  <span className="text-[#E8AA42]">Every Detail</span>
                </h2>
                <p className="text-lg text-gray-500 leading-relaxed">
                  Full-screen drawing viewer with sub-pixel rendering at up to 400% zoom. Navigate
                  sheets, toggle layers, and pin RFI callouts — all without ever leaving the viewport.
                </p>
                <div className="space-y-4 pt-4">
                  {precisionLayerModules[0].features.map((feat) => (
                    <div key={feat} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#E8AA42]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[#E8AA42] text-xs">check</span>
                      </div>
                      <span className="text-sm text-gray-600 leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: Browser frame — Drawing Viewer */}
              <div className="bg-[#0a0a0f] rounded-2xl border border-gray-200/10 shadow-2xl overflow-hidden">
                {/* Title bar */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06] bg-[#0a0a0f]">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                  </div>
                  <div className="flex-1 bg-[#141419] rounded-lg px-3 py-1.5 text-[10px] text-gray-500 font-mono">
                    precision.renonext.com/drawings/A-101
                  </div>
                </div>

                {/* App header */}
                <div className="flex items-center justify-between px-5 py-3 bg-[#0c0e10]/80 border-b border-white/[0.04]">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#232629] flex items-center justify-center">
                      <span className="material-symbols-outlined text-white/60 text-sm">arrow_back</span>
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">A-101 Floor Plan</p>
                      <p className="text-[9px] text-gray-500 uppercase tracking-wider">Version 4.2 &bull; Issued 12 Oct 2023</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 bg-[#232629]/60 px-3 py-1.5 rounded-full">
                      <span className="material-symbols-outlined text-[#E8AA42] text-xs">history</span>
                      <span className="text-[10px] font-semibold text-white/60">REVISIONS</span>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-[#232629] flex items-center justify-center">
                      <span className="material-symbols-outlined text-white/60 text-sm">share</span>
                    </div>
                  </div>
                </div>

                {/* Drawing viewport */}
                <div className="relative bg-black min-h-[340px] flex items-center justify-center">
                  {/* Blueprint canvas */}
                  <div className="w-[92%] h-[260px] bg-white/[0.03] rounded-lg relative overflow-hidden border border-white/[0.04]">
                    {/* Grid */}
                    <div
                      className="absolute inset-0 opacity-15"
                      style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)',
                        backgroundSize: '20px 20px',
                      }}
                    />
                    {/* Room outlines */}
                    <div className="absolute top-6 left-8 w-32 h-24 border border-white/15 rounded" />
                    <div className="absolute top-6 left-44 w-24 h-24 border border-white/15 rounded" />
                    <div className="absolute top-[120px] left-8 w-56 h-20 border border-white/10 rounded" />
                    <div className="absolute top-6 right-12 w-28 h-28 border border-white/10 rounded" />
                    {/* RFI overlay */}
                    <div className="absolute top-10 left-16 w-24 h-20 border-2 border-dashed border-[#E8AA42] rounded-xl bg-[#E8AA42]/5">
                      <span className="bg-[#E8AA42] text-[#102122] text-[8px] font-bold px-1.5 py-0.5 rounded-full absolute -top-2 left-1/2 -translate-x-1/2 whitespace-nowrap">RFI-22</span>
                    </div>
                    {/* Dimension lines */}
                    <div className="absolute bottom-4 left-8 right-12 h-px bg-[#E8AA42]/30" />
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[7px] text-[#E8AA42]/60 font-mono">24&apos;-6&quot;</div>
                  </div>

                  {/* Floating markup toolbar */}
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-1 bg-[#232629]/80 backdrop-blur-xl p-1.5 rounded-2xl border-t border-l border-white/[0.06]">
                    {markupTools.map((tool) => (
                      <div
                        key={tool.icon}
                        className={`w-9 h-9 flex items-center justify-center rounded-xl transition-colors ${
                          tool.active
                            ? 'bg-gradient-to-br from-[#E8AA42] to-[#d5932b] text-[#102122] shadow-lg'
                            : 'text-gray-500 hover:bg-[#292c2f]'
                        }`}
                      >
                        <span
                          className="material-symbols-outlined text-sm"
                          style={tool.active ? { fontVariationSettings: "'FILL' 1" } : undefined}
                        >
                          {tool.icon}
                        </span>
                      </div>
                    ))}
                    <div className="h-px w-6 bg-white/[0.06] mx-auto my-0.5" />
                    <div className="flex items-center gap-1.5 px-2 py-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#E8AA42] animate-pulse" />
                      <span className="text-[8px] font-bold text-white/60 uppercase tracking-wider">LIVE</span>
                    </div>
                  </div>

                  {/* Bottom controls */}
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-6 bg-[#232629]/80 backdrop-blur-xl px-5 py-2.5 rounded-full border-t border-l border-white/[0.06]">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-white/40 text-sm">remove</span>
                      <span className="text-xs font-semibold text-white/80 min-w-[36px] text-center">85%</span>
                      <span className="material-symbols-outlined text-white/40 text-sm">add</span>
                    </div>
                    <div className="h-4 w-px bg-white/10" />
                    <div className="flex items-center gap-1.5 text-white/40">
                      <span className="material-symbols-outlined text-sm">fullscreen</span>
                      <span className="text-[10px] font-bold uppercase tracking-wider">Fit</span>
                    </div>
                    <div className="h-4 w-px bg-white/10" />
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-gray-500">Sheet</span>
                      <span className="text-xs font-bold text-white/80">01 / 24</span>
                    </div>
                  </div>

                  {/* Layer panel */}
                  <div className="absolute right-4 bottom-4 w-36 bg-[#232629]/80 backdrop-blur-xl rounded-xl border-t border-l border-white/[0.06] overflow-hidden">
                    <div className="px-3 py-2 border-b border-white/[0.06]">
                      <span className="text-[8px] font-extrabold uppercase tracking-widest text-gray-500">Layers</span>
                    </div>
                    <div className="p-1.5 space-y-0.5">
                      {drawingLayers.map((layer) => (
                        <div
                          key={layer.name}
                          className={`flex items-center justify-between px-2 py-1.5 rounded-lg ${
                            layer.active ? 'bg-[#232629]' : ''
                          }`}
                        >
                          <span className={`text-[10px] ${layer.active ? 'text-white' : 'text-gray-500'}`}>
                            {layer.name}
                          </span>
                          <span
                            className={`material-symbols-outlined text-xs ${
                              layer.visible
                                ? layer.active ? 'text-[#E8AA42]' : 'text-gray-500'
                                : 'text-gray-700'
                            }`}
                            style={layer.visible && layer.active ? { fontVariationSettings: "'FILL' 1" } : undefined}
                          >
                            {layer.visible ? 'visibility' : 'visibility_off'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          Section 3 — Module Features Grid (#f6f8f8)
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6 bg-[#f6f8f8]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-14">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8AA42]/10 text-[#E8AA42] font-semibold text-xs mb-4">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>apps</span>
                Full Platform
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-[#102122] mb-3">
                Five Precision Modules
              </h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                Every tool a project engineer needs to review, annotate, and manage
                construction drawings — from first sketch to final sign-off.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {precisionLayerModules.map((mod) => (
                <div
                  key={mod.id}
                  className="bg-white rounded-2xl border border-primary/5 shadow-float p-7 hover:-translate-y-1 hover:shadow-float-hover transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#E8AA42]/10 flex items-center justify-center mb-5">
                    <span
                      className="material-symbols-outlined text-[#E8AA42] text-xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {mod.icon}
                    </span>
                  </div>
                  <h3 className="font-display text-lg font-bold text-[#102122] mb-1">{mod.name}</h3>
                  <p className="text-xs text-[#E8AA42] font-semibold mb-3">{mod.tagline}</p>
                  <p className="text-sm text-gray-500 leading-relaxed mb-5">{mod.description}</p>
                  <div className="space-y-2">
                    {mod.features.slice(0, 3).map((feat) => (
                      <div key={feat} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E8AA42] flex-shrink-0 mt-1.5" />
                        <span className="text-xs text-gray-500">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          Section 4 — Drawing Dashboard (white bg)
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
              {/* Left: Browser frame — Dashboard */}
              <div className="bg-[#0a0a0f] rounded-2xl border border-gray-200/10 shadow-2xl overflow-hidden">
                {/* Title bar */}
                <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06] bg-[#0a0a0f]">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                  </div>
                  <div className="flex-1 bg-[#141419] rounded-lg px-3 py-1.5 text-[10px] text-gray-500 font-mono">
                    precision.renonext.com/dashboard
                  </div>
                </div>

                {/* App header */}
                <div className="flex items-center justify-between px-5 py-3 bg-[#0c0e10]/80 border-b border-white/[0.04]">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-[#E8AA42] text-sm">menu</span>
                    <span className="text-sm font-bold text-[#E8AA42]">Precision Layer</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-gray-500 text-sm">notifications</span>
                    <div className="w-6 h-6 rounded-full bg-[#d5932b] flex items-center justify-center text-[9px] font-bold text-[#102122]">S</div>
                  </div>
                </div>

                {/* Dashboard content */}
                <div className="p-5 bg-[#0c0e10] space-y-5">
                  {/* Welcome */}
                  <div>
                    <h3 className="text-lg font-bold text-white">Welcome Back, Sarah!</h3>
                    <p className="text-[10px] text-gray-500 mt-0.5">4 blueprints awaiting review &bull; 2 active threads</p>
                  </div>

                  {/* Recent Drawings */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">Recent Drawings</span>
                      <span className="text-[10px] text-[#E8AA42] font-semibold">See All</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {recentDrawings.map((drawing) => (
                        <div key={drawing.code} className="bg-[#171a1c] rounded-xl p-3 space-y-2">
                          <span className={`text-[8px] font-bold tracking-widest uppercase px-1.5 py-0.5 rounded ${
                            drawing.code === 'A-101'
                              ? 'bg-[#E8AA42]/15 text-[#E8AA42]'
                              : 'bg-[#febf2a]/10 text-[#febf2a]'
                          }`}>
                            {drawing.code}
                          </span>
                          <h4 className="text-sm font-bold text-white">{drawing.title}</h4>
                          <p className="text-[9px] text-gray-500">
                            {drawing.updatedAgo ? `Updated ${drawing.updatedAgo} by ${drawing.updatedBy}` : drawing.updatedBy}
                          </p>
                          <div className="flex items-center gap-3 text-gray-500">
                            <span className="flex items-center gap-1 text-[9px]">
                              <span className="material-symbols-outlined text-[10px]">layers</span>
                              {drawing.sheets} Sheets
                            </span>
                            {drawing.markups !== undefined && (
                              <span className="flex items-center gap-1 text-[9px]">
                                <span className="material-symbols-outlined text-[10px]">chat_bubble</span>
                                {drawing.markups} Markups
                              </span>
                            )}
                            {drawing.flags !== undefined && (
                              <span className="flex items-center gap-1 text-[9px] text-[#ff7351]">
                                <span className="material-symbols-outlined text-[10px]">warning</span>
                                {drawing.flags} Flag
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Active Projects */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-white">Active Projects</span>
                    {mockProjects.slice(0, 3).map((proj) => (
                      <div key={proj.name} className="bg-[#171a1c] rounded-xl p-3 flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-[#111416] flex items-center justify-center border border-white/[0.06]">
                          <span className="material-symbols-outlined text-[#E8AA42] text-sm">{proj.icon}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-bold text-white truncate">{proj.name}</span>
                            <span className="text-[10px] font-bold text-[#E8AA42]">{proj.completion}%</span>
                          </div>
                          <div className="mt-1 h-1 w-full bg-[#111416] rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-[#E8AA42] to-[#d5932b] rounded-full"
                              style={{ width: `${proj.completion}%` }}
                            />
                          </div>
                        </div>
                        <div className="text-center flex-shrink-0">
                          <p className="text-sm font-bold text-white">{proj.sheets}</p>
                          <p className="text-[8px] text-gray-500 uppercase tracking-wider">Sheets</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: Copy */}
              <div className="space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8AA42]/10">
                  <span className="material-symbols-outlined text-[#E8AA42] text-sm">home</span>
                  <span className="text-xs font-bold text-[#E8AA42] uppercase tracking-wider">Command Center</span>
                </div>
                <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-[#102122]">
                  Your Drawings,{' '}
                  <span className="text-[#E8AA42]">At a Glance</span>
                </h2>
                <p className="text-lg text-gray-500 leading-relaxed">
                  A personalized dashboard that surfaces recent drawings, active project progress,
                  team threads, and pending reviews — before you even open a blueprint.
                </p>
                <div className="space-y-4 pt-4">
                  {precisionLayerModules[4].features.map((feat) => (
                    <div key={feat} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-[#E8AA42]/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="material-symbols-outlined text-[#E8AA42] text-xs">check</span>
                      </div>
                      <span className="text-sm text-gray-600 leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          Section 5 — Project Management (#f6f8f8)
      ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-6 bg-[#f6f8f8]">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8AA42]/10 text-[#E8AA42] font-semibold text-xs mb-4">
                <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>apartment</span>
                Project Hub
              </div>
              <h2 className="font-display text-3xl md:text-4xl font-bold tracking-tight text-[#102122] mb-3">
                Every Project, Every Revision
              </h2>
              <p className="text-gray-500 text-lg max-w-2xl mx-auto">
                A bento-grid project dashboard with completion tracking, phase labels, and status badges.
                From pre-planning through final sign-off.
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            {/* Browser frame — Project Grid */}
            <div className="bg-[#0a0a0f] rounded-2xl border border-gray-200/10 shadow-2xl overflow-hidden">
              {/* Title bar */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-white/[0.06] bg-[#0a0a0f]">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                </div>
                <div className="flex-1 bg-[#141419] rounded-lg px-3 py-1.5 text-[10px] text-gray-500 font-mono">
                  precision.renonext.com/projects
                </div>
              </div>

              {/* App header */}
              <div className="flex items-center justify-between px-6 py-4 bg-[#0c0e10]/80 border-b border-white/[0.04]">
                <div>
                  <h3 className="text-xl font-bold text-white">My Projects</h3>
                  <p className="text-[10px] text-gray-500 mt-0.5">Manage and review your active architectural blueprints.</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1.5 bg-[#232629] px-4 py-2 rounded-full border border-white/[0.06]">
                    <span className="material-symbols-outlined text-white/40 text-sm">filter_list</span>
                    <span className="text-[10px] font-semibold text-white/60 uppercase tracking-wider">Filter</span>
                  </div>
                  <div className="flex items-center gap-1.5 bg-gradient-to-r from-[#E8AA42] to-[#d5932b] px-4 py-2 rounded-full">
                    <span className="material-symbols-outlined text-[#102122] text-sm">add</span>
                    <span className="text-[10px] font-bold text-[#102122]">New Project</span>
                  </div>
                </div>
              </div>

              {/* Project grid */}
              <div className="p-6 bg-[#0c0e10] grid md:grid-cols-3 gap-4">
                {/* Card 1 */}
                <div className="bg-[#171a1c] rounded-2xl overflow-hidden">
                  <div className="h-32 bg-gradient-to-br from-[#1a1a24] to-[#0c0e10] flex items-center justify-center relative">
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)',
                        backgroundSize: '16px 16px',
                      }}
                    />
                    <span className="material-symbols-outlined text-4xl text-white/10">architecture</span>
                    <div className="absolute top-3 right-3">
                      <span className="bg-[#E8AA42] text-[#102122] text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">Approved</span>
                    </div>
                  </div>
                  <div className="p-5 space-y-4">
                    <div>
                      <h4 className="text-base font-bold text-white">Skyline Residence</h4>
                      <p className="text-[9px] text-gray-500 uppercase tracking-wider mt-0.5">Phase 1: Foundation</p>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-gray-500 uppercase tracking-wider font-semibold">Completion</span>
                        <span className="text-[#E8AA42] font-bold">75%</span>
                      </div>
                      <div className="h-1 w-full bg-[#111416] rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#E8AA42] to-[#d5932b] rounded-full" style={{ width: '75%' }} />
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <span className="material-symbols-outlined text-xs">layers</span>
                        <span className="text-[10px]">124 Sheets</span>
                      </div>
                      <span className="material-symbols-outlined text-gray-600 text-sm">more_vert</span>
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="bg-[#171a1c] rounded-2xl overflow-hidden">
                  <div className="h-32 bg-gradient-to-br from-[#1a1a24] to-[#0c0e10] flex items-center justify-center relative">
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)',
                        backgroundSize: '16px 16px',
                      }}
                    />
                    <span className="material-symbols-outlined text-4xl text-white/10">hub</span>
                    <div className="absolute top-3 right-3">
                      <span className="bg-[#fddb42] text-[#5c4d00] text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">In Progress</span>
                    </div>
                  </div>
                  <div className="p-5 space-y-4">
                    <div>
                      <h4 className="text-base font-bold text-white">The Nexus Hub</h4>
                      <p className="text-[9px] text-gray-500 uppercase tracking-wider mt-0.5">Phase 3: Structural Steel</p>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-gray-500 uppercase tracking-wider font-semibold">Completion</span>
                        <span className="text-[#E8AA42] font-bold">42%</span>
                      </div>
                      <div className="h-1 w-full bg-[#111416] rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#E8AA42] to-[#d5932b] rounded-full" style={{ width: '42%' }} />
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <span className="material-symbols-outlined text-xs">layers</span>
                        <span className="text-[10px]">318 Sheets</span>
                      </div>
                      <span className="material-symbols-outlined text-gray-600 text-sm">more_vert</span>
                    </div>
                  </div>
                </div>

                {/* Card 3 — Draft/Import */}
                <div className="bg-[#171a1c] rounded-2xl overflow-hidden border border-dashed border-white/[0.08]">
                  <div className="h-32 bg-[#111416] flex flex-col items-center justify-center">
                    <span className="material-symbols-outlined text-3xl text-gray-700 mb-1">upload_file</span>
                    <span className="text-[9px] text-gray-600 uppercase tracking-wider">Import New Revision</span>
                  </div>
                  <div className="p-5 space-y-4">
                    <div>
                      <h4 className="text-base font-bold text-white">Harbor Point II</h4>
                      <p className="text-[9px] text-gray-500 uppercase tracking-wider mt-0.5">Phase: Pre-Planning</p>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-gray-500 uppercase tracking-wider font-semibold">Completion</span>
                        <span className="text-[#E8AA42] font-bold">12%</span>
                      </div>
                      <div className="h-1 w-full bg-[#111416] rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#E8AA42] to-[#d5932b] rounded-full" style={{ width: '12%' }} />
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <span className="material-symbols-outlined text-xs">layers</span>
                        <span className="text-[10px]">45 Sheets</span>
                      </div>
                      <span className="material-symbols-outlined text-gray-600 text-sm">more_vert</span>
                    </div>
                  </div>
                </div>

                {/* Card 4 — Wide archive card */}
                <div className="md:col-span-2 bg-[#171a1c] rounded-2xl overflow-hidden flex flex-col md:flex-row">
                  <div className="w-full md:w-2/5 h-32 md:h-auto bg-gradient-to-br from-[#1a1a24] to-[#0c0e10] flex items-center justify-center relative">
                    <div
                      className="absolute inset-0 opacity-8"
                      style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)',
                        backgroundSize: '16px 16px',
                      }}
                    />
                    <span className="material-symbols-outlined text-5xl text-white/10">park</span>
                  </div>
                  <div className="p-5 md:p-6 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="text-lg font-bold text-white">Vertical Gardens</h4>
                        <span className="bg-[#E8AA42] text-[#102122] text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">Archive</span>
                      </div>
                      <p className="text-[9px] text-gray-500 uppercase tracking-wider">Phase: Completed Maintenance</p>
                      <p className="text-xs text-gray-500 mt-3 leading-relaxed">Fully integrated mixed-use development with sustainable irrigation systems. Final inspection signed off Q3 2023.</p>
                    </div>
                    <div className="grid grid-cols-2 gap-6 mt-4 pt-4 border-t border-white/[0.06]">
                      <div>
                        <span className="text-[8px] text-gray-600 uppercase tracking-widest">Status</span>
                        <p className="text-sm font-bold text-white">100% Complete</p>
                      </div>
                      <div>
                        <span className="text-[8px] text-gray-600 uppercase tracking-widest">Architecture</span>
                        <p className="text-sm font-bold text-white">942 Sheets</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 5 */}
                <div className="bg-[#171a1c] rounded-2xl overflow-hidden">
                  <div className="h-32 bg-gradient-to-br from-[#1a1a24] to-[#0c0e10] flex items-center justify-center relative">
                    <div
                      className="absolute inset-0 opacity-10"
                      style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.06) 1px, transparent 1px)',
                        backgroundSize: '16px 16px',
                      }}
                    />
                    <span className="material-symbols-outlined text-4xl text-white/10">home_work</span>
                    <div className="absolute top-3 right-3">
                      <span className="bg-[#fddb42] text-[#5c4d00] text-[8px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full">In Progress</span>
                    </div>
                  </div>
                  <div className="p-5 space-y-4">
                    <div>
                      <h4 className="text-base font-bold text-white">Zenith Gallery</h4>
                      <p className="text-[9px] text-gray-500 uppercase tracking-wider mt-0.5">Phase 2: Interior MEP</p>
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[10px]">
                        <span className="text-gray-500 uppercase tracking-wider font-semibold">Completion</span>
                        <span className="text-[#E8AA42] font-bold">89%</span>
                      </div>
                      <div className="h-1 w-full bg-[#111416] rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-[#E8AA42] to-[#d5932b] rounded-full" style={{ width: '89%' }} />
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-3 border-t border-white/[0.06]">
                      <div className="flex items-center gap-1.5 text-gray-500">
                        <span className="material-symbols-outlined text-xs">layers</span>
                        <span className="text-[10px]">82 Sheets</span>
                      </div>
                      <span className="material-symbols-outlined text-gray-600 text-sm">more_vert</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
          Section 6 — CTA (dark)
      ═══════════════════════════════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 bg-[#102122] overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#E8AA42]/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <ScrollReveal>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
              Read Every Line.{' '}
              <span className="text-[#E8AA42]">Mark Every Detail.</span>
            </h2>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed mb-10">
              Precision Layer is the blueprint platform built for construction teams
              who demand pixel-perfect accuracy and real-time collaboration.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-[#E8AA42] text-[#102122] font-bold text-lg rounded-2xl shadow-float hover:-translate-y-1 hover:shadow-float-hover transition-all duration-300"
              >
                Request Early Access
                <span className="material-symbols-outlined text-xl">arrow_forward</span>
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white font-bold text-lg rounded-2xl hover:bg-white/20 transition-all duration-300"
              >
                Book a Demo
              </Link>
            </div>

            {/* Trust badges */}
            <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-gray-600">
              {[
                { icon: 'architecture', label: '5 Modules' },
                { icon: 'lock', label: 'Enterprise Security' },
                { icon: 'sync', label: 'Real-Time Sync' },
                { icon: 'wifi_off', label: 'Offline-Ready' },
              ].map((badge) => (
                <div key={badge.label} className="flex items-center gap-1.5 text-xs font-medium">
                  <span className="material-symbols-outlined text-[#E8AA42]/60 text-sm">{badge.icon}</span>
                  {badge.label}
                </div>
              ))}
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
