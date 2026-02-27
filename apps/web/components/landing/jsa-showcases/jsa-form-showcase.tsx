'use client';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, CheckCircle2, AlertTriangle } from 'lucide-react';

export function JSAFormShowcase() {
  const hazards = [
    {
      hazard: 'Working at heights >3m',
      risk: 'High',
      riskColor: 'bg-reno-red-50 text-reno-red-700 border-reno-red-200',
      controls: 'Harness, guardrails, buddy system',
      ppe: 'Hard hat, harness, boots',
    },
    {
      hazard: 'Concrete pour splash',
      risk: 'Medium',
      riskColor: 'bg-reno-amber-50 text-reno-amber-700 border-reno-amber-200',
      controls: 'Pour barriers, face shields',
      ppe: 'Goggles, gloves, boots',
    },
    {
      hazard: 'Rebar impalement',
      risk: 'High',
      riskColor: 'bg-reno-red-50 text-reno-red-700 border-reno-red-200',
      controls: 'Rebar caps, safe zone marking',
      ppe: 'Steel-toe, hard hat, vest',
    },
  ];

  const signatures = [
    { name: 'Marcus Johnson', signed: true },
    { name: 'Jake Williams', signed: true },
    { name: 'Sofia Martinez', signed: true },
    { name: 'David Park', signed: true },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="bg-reno-dark text-white px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5" />
            <div>
              <h3 className="font-semibold text-lg">Job Safety Analysis</h3>
              <p className="text-xs text-gray-400">Form #JSA-2026-0847</p>
            </div>
          </div>
          <Badge variant="secondary" className="bg-reno-green-50 text-reno-green-700">
            Active
          </Badge>
        </div>
      </div>

      <div className="p-6 space-y-6 bg-gray-50">
        {/* Project Info */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 space-y-2 text-sm">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-xs font-semibold text-gray-600">Project</span>
              <div className="text-gray-900">GEBOOTH WasteWater Plant</div>
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-600">Date</span>
              <div className="text-gray-900">Feb 27, 2026</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div>
              <span className="text-xs font-semibold text-gray-600">Work Area</span>
              <div className="text-gray-900">Foundation B2</div>
            </div>
            <div>
              <span className="text-xs font-semibold text-gray-600">Supervisor</span>
              <div className="text-gray-900">Marcus Johnson</div>
            </div>
          </div>
          <div>
            <span className="text-xs font-semibold text-gray-600">Work Description</span>
            <div className="text-gray-900 text-sm">
              Concrete forming and rebar installation for foundation wall B2
            </div>
          </div>
        </div>

        {/* Hazards Table */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Identified Hazards & Controls</h4>
          <div className="space-y-2">
            {hazards.map((hazard, idx) => (
              <Card key={idx} className="p-3 bg-white border-gray-200">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-reno-amber shrink-0 mt-0.5" />
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div className="font-semibold text-sm text-gray-900">{hazard.hazard}</div>
                      <Badge className={`${hazard.riskColor} border text-xs shrink-0`}>
                        {hazard.risk}
                      </Badge>
                    </div>
                    <div className="text-xs space-y-1">
                      <div>
                        <span className="font-semibold text-gray-700">Controls:</span>{' '}
                        <span className="text-gray-600">{hazard.controls}</span>
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">PPE:</span>{' '}
                        <span className="text-gray-600">{hazard.ppe}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Crew Signatures */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Crew Acknowledgment</h4>
          <div className="bg-white border border-gray-200 rounded-lg p-4">
            <div className="grid grid-cols-2 gap-3">
              {signatures.map((sig, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-reno-green shrink-0" />
                  <span className="text-sm text-gray-700">{sig.name}</span>
                </div>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200 text-xs text-gray-600 text-center">
              All crew members have acknowledged the hazards and controls
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
