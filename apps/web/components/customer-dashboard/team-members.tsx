'use client';

import { Users, CheckCircle } from 'lucide-react';

const teamData = [
  { name: 'David Park', role: 'Engineered Oriented\nWood Joists', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face', onSite: true },
  { name: 'Marcus J.', role: 'Demo Roof Signer\nLaborer', img: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face', onSite: true },
  { name: 'David Pack', role: 'Engineered Oriented\nBelted Joists', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face', onSite: false },
];

export function TeamMembers() {
  return (
    <div className="px-5 lg:px-0 py-3 lg:py-0">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
          <Users className="w-4 h-4 text-blue-400" />
        </div>
        <h2 className="text-white/90 text-sm tracking-tight">Who&apos;s on site today?</h2>
      </div>
      <div className="flex gap-5">
        {teamData.map((m) => (
          <div key={m.name} className="flex flex-col items-center">
            <div className="relative">
              <div className={`w-16 h-16 rounded-full p-[2px] ${m.onSite ? 'bg-gradient-to-br from-green-500 to-emerald-500' : 'bg-gradient-to-br from-gray-600 to-gray-700'}`}>
                <div className="w-full h-full rounded-full overflow-hidden bg-[#0a0a0f]">
                  <img src={m.img} alt={m.name} className="w-full h-full object-cover" />
                </div>
              </div>
              {m.onSite && (
                <div className="absolute -bottom-0.5 right-0 w-5 h-5 bg-[#0a0a0f] rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                </div>
              )}
              {m.onSite && (
                <div className="absolute -top-1 -right-1 bg-green-500 text-white text-[8px] px-1.5 py-0.5 rounded-full font-medium">Today</div>
              )}
            </div>
            <p className="text-white/85 text-xs mt-2 text-center">{m.name}</p>
            <p className="text-gray-500 text-[10px] text-center max-w-[80px] whitespace-pre-line leading-tight mt-0.5">{m.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
