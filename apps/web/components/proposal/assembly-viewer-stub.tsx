'use client';

import { Layers, Play, RotateCcw, Eye } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';

interface AssemblyViewerStubProps {
  stepCount: number;
}

export function AssemblyViewerStub({ stepCount }: AssemblyViewerStubProps) {
  const dots = Array.from({ length: Math.min(stepCount, 10) }, (_, i) => i + 1);

  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <Layers className="h-5 w-5 text-reno-green" />
        <h2 className="text-lg font-bold text-gray-900">Assembly Viewer</h2>
        <span className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-semibold text-violet-600">
          Coming Soon
        </span>
      </div>

      <Tabs defaultValue="3d" className="overflow-hidden rounded-2xl border bg-white shadow-sm">
        <TabsList className="w-full justify-start gap-0 rounded-none border-b bg-gray-50/80 p-0">
          {[
            { value: '3d', label: '3D View', icon: RotateCcw },
            { value: 'overlay', label: 'Step Overlay', icon: Layers },
            { value: 'section', label: 'Section Cut', icon: Eye },
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="flex items-center gap-1.5 rounded-none border-b-2 border-transparent px-4 py-3 text-xs font-medium data-[state=active]:border-reno-green data-[state=active]:bg-white data-[state=active]:text-reno-green-dark data-[state=active]:shadow-none"
            >
              <tab.icon className="h-3.5 w-3.5" />
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {['3d', 'overlay', 'section'].map((tab) => (
          <TabsContent key={tab} value={tab} className="mt-0">
            <div className="relative flex aspect-video items-center justify-center bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950">
              {/* Grid overlay */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2032%2032%22%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22none%22%20stroke%3D%22rgba(255%2C255%2C255%2C0.04)%22%3E%3Cpath%20d%3D%22M0%20.5H31.5V32%22%2F%3E%3C%2Fsvg%3E')] opacity-60" />

              <div className="relative text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur-sm">
                  <Play className="h-7 w-7 text-white/50" />
                </div>
                <p className="text-sm font-semibold text-white/70">
                  Interactive 3D Assembly Viewer
                </p>
                <p className="mt-1 text-xs text-white/40">
                  Watch your project come together — layer by layer
                </p>
              </div>

              {/* Corner accents */}
              <div className="absolute left-4 top-4 h-8 w-8 border-l-2 border-t-2 border-white/10 rounded-tl-lg" />
              <div className="absolute right-4 top-4 h-8 w-8 border-r-2 border-t-2 border-white/10 rounded-tr-lg" />
              <div className="absolute bottom-4 left-4 h-8 w-8 border-b-2 border-l-2 border-white/10 rounded-bl-lg" />
              <div className="absolute bottom-4 right-4 h-8 w-8 border-b-2 border-r-2 border-white/10 rounded-br-lg" />
            </div>
          </TabsContent>
        ))}

        {/* Step scrubber dots */}
        <div className="flex items-center justify-center gap-1.5 border-t border-gray-100 bg-gray-50/50 px-4 py-3">
          <span className="mr-2 text-[10px] font-medium text-gray-400">Step</span>
          {dots.map((n) => (
            <button
              key={n}
              className="flex h-7 w-7 items-center justify-center rounded-full text-[11px] font-semibold text-gray-400 ring-1 ring-gray-200 transition-all hover:bg-reno-green-light hover:text-reno-green-dark hover:ring-reno-green"
            >
              {n}
            </button>
          ))}
        </div>
      </Tabs>
    </section>
  );
}
