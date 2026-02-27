'use client';

import { useState } from 'react';
import {
  Sun, Cloud, CloudRain, Wind, Droplets, Eye, Users, CheckCircle, Truck, Clock,
  Package, ClipboardCheck, Calendar, CheckCircle2, Circle, ChevronRight, MapPin,
  CloudSun, Sunrise, Sunset,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const teamMembers = [
  { id: '1', name: 'David Park', role: 'Engineered Oriented Wood Joists', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face', status: 'active' as const, onSiteToday: true },
  { id: '2', name: 'Marcus J.', role: 'Demo Roof Signer Laborer', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face', status: 'active' as const, onSiteToday: true },
  { id: '3', name: 'David Pack', role: 'Engineered Oriented Belted Joists', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face', status: 'active' as const, onSiteToday: false },
];

const hourlyForecast = [
  { time: 'Now', temp: 18, icon: Sun, precipitation: 0 },
  { time: '10AM', temp: 20, icon: CloudSun, precipitation: 0 },
  { time: '12PM', temp: 22, icon: Sun, precipitation: 0 },
  { time: '2PM', temp: 23, icon: Cloud, precipitation: 10 },
  { time: '4PM', temp: 21, icon: CloudRain, precipitation: 40 },
  { time: '6PM', temp: 19, icon: CloudRain, precipitation: 60 },
];

const deliveries = [
  { id: '1', item: '1.4 yd Dumpster Bin', eta: '11:30 AM', status: 'en-route' as const, supplier: 'WasteCo Express' },
  { id: '2', item: 'Engineered Lumber (14 pcs)', eta: '1:45 PM', status: 'scheduled' as const, supplier: 'TimberMax Supply' },
  { id: '3', item: 'Concrete Mix (8 bags)', eta: '8:15 AM', status: 'delivered' as const, supplier: 'ReadyMix Toronto' },
];

const inspections: { id: string; label: string; inspector: string; timeRange: string; status: 'upcoming' | 'in-progress' | 'completed' }[] = [
  { id: '1', label: 'Foundation Pour Inspection', inspector: 'City of Toronto', timeRange: '1 PM - 3 PM', status: 'upcoming' },
  { id: '2', label: 'Electrical Rough-In', inspector: 'ESA Ontario', timeRange: '3:30 PM - 4:30 PM', status: 'upcoming' },
  { id: '3', label: 'Site Grading Check', inspector: 'City of Toronto', timeRange: '9 AM - 10 AM', status: 'completed' },
];

const milestoneSteps = [
  { label: 'Site prep & grading', completed: true },
  { label: 'Excavation complete', completed: true },
  { label: 'Foundation pour', completed: false, active: true },
  { label: 'Framing inspection', completed: false },
  { label: 'Rough-in (electrical/plumbing)', completed: false },
  { label: 'Final walkthrough', completed: false },
];

type TabId = 'on-site' | 'deliveries' | 'inspections';

const tabs: { id: TabId; label: string; icon: typeof Users; count?: number }[] = [
  { id: 'on-site', label: 'On Site', icon: Users, count: 2 },
  { id: 'deliveries', label: 'Deliveries', icon: Truck, count: 3 },
  { id: 'inspections', label: 'Inspections', icon: ClipboardCheck, count: 2 },
];

export function WeatherHub() {
  const [activeTab, setActiveTab] = useState<TabId>('on-site');
  const [showMilestones, setShowMilestones] = useState(false);

  return (
    <div className="bg-[#141419] rounded-2xl border border-white/[0.06] shadow-lg shadow-black/20 overflow-hidden h-full lg:flex lg:flex-col">
      {/* Weather Hero */}
      <div className="relative overflow-hidden lg:flex-shrink-0">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-600/20 via-orange-500/10 to-blue-600/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#141419] via-transparent to-transparent" />
        <div className="relative p-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <motion.div className="w-14 h-14 lg:w-11 lg:h-11 rounded-2xl bg-amber-500/20 border border-amber-500/20 flex items-center justify-center" animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>
                <Sun className="w-7 h-7 lg:w-5 lg:h-5 text-amber-400" />
              </motion.div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-white text-3xl tracking-tight">18°</span>
                  <span className="text-white/40 text-sm">C</span>
                </div>
                <p className="text-white/50 text-xs mt-0.5">Partly Cloudy</p>
              </div>
            </div>
            <div className="flex items-center gap-3 bg-white/[0.04] rounded-xl px-3 py-2 border border-white/[0.04]">
              <div className="flex flex-col items-center gap-0.5"><Wind className="w-3.5 h-3.5 text-sky-400/70" /><span className="text-[9px] text-gray-500">12 km/h</span></div>
              <div className="w-[1px] h-5 bg-white/[0.06]" />
              <div className="flex flex-col items-center gap-0.5"><Droplets className="w-3.5 h-3.5 text-blue-400/70" /><span className="text-[9px] text-gray-500">45%</span></div>
              <div className="w-[1px] h-5 bg-white/[0.06]" />
              <div className="flex flex-col items-center gap-0.5"><Eye className="w-3.5 h-3.5 text-purple-400/70" /><span className="text-[9px] text-gray-500">10 km</span></div>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-3">
            <div className="flex items-center gap-1.5"><Sunrise className="w-3 h-3 text-amber-400/60" /><span className="text-[10px] text-gray-500">6:48 AM</span></div>
            <div className="flex items-center gap-1.5"><Sunset className="w-3 h-3 text-orange-400/60" /><span className="text-[10px] text-gray-500">7:42 PM</span></div>
            <div className="ml-auto"><span className="text-[10px] text-amber-400/80 bg-amber-400/10 px-2 py-0.5 rounded-md">Great conditions for work</span></div>
          </div>
          <div className="mt-4 lg:mt-3 flex gap-1 overflow-x-auto pb-1 scrollbar-none">
            {hourlyForecast.map((hour, i) => {
              const HourIcon = hour.icon;
              const isNow = i === 0;
              return (
                <motion.div key={hour.time} className={`flex flex-col items-center gap-1 px-2.5 lg:px-2 py-2 lg:py-1.5 rounded-xl min-w-[52px] lg:min-w-[44px] ${isNow ? 'bg-amber-500/15 border border-amber-500/20' : 'bg-white/[0.03] border border-transparent'}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 + 0.2 }}>
                  <span className={`text-[10px] ${isNow ? 'text-amber-400' : 'text-gray-500'}`}>{hour.time}</span>
                  <HourIcon className={`w-4 h-4 ${isNow ? 'text-amber-400' : 'text-gray-400'}`} />
                  <span className={`text-xs ${isNow ? 'text-white' : 'text-white/60'}`}>{hour.temp}°</span>
                  {hour.precipitation > 0 && (<div className="flex items-center gap-0.5"><Droplets className="w-2 h-2 text-blue-400/60" /><span className="text-[8px] text-blue-400/60">{hour.precipitation}%</span></div>)}
                </motion.div>
              );
            })}
          </div>
          <motion.div className="mt-3 lg:mt-2 flex items-center gap-2 bg-blue-500/10 border border-blue-500/15 rounded-lg px-3 py-2 lg:py-1.5" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
            <CloudRain className="w-3.5 h-3.5 text-blue-400 flex-shrink-0" />
            <p className="text-[11px] text-blue-300/80">Light rain expected around 4 PM. Outdoor work should wrap up by 3:30 PM.</p>
          </motion.div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-t border-white/[0.06] lg:flex-shrink-0">
        <div className="flex">
          {tabs.map((tab) => {
            const TabIcon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button key={tab.id} className={`flex-1 relative flex items-center justify-center gap-1.5 py-3 lg:py-2 transition-colors ${isActive ? 'text-white' : 'text-gray-500 hover:text-gray-400'}`} onClick={() => setActiveTab(tab.id)}>
                <TabIcon className="w-3.5 h-3.5" />
                <span className="text-xs">{tab.label}</span>
                {tab.count && (<span className={`text-[9px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-amber-500/20 text-amber-400' : 'bg-white/[0.06] text-gray-500'}`}>{tab.count}</span>)}
                {isActive && (<motion.div className="absolute bottom-0 left-3 right-3 h-[2px] bg-amber-400 rounded-full" layoutId="weatherTabIndicator" transition={{ type: 'spring', stiffness: 400, damping: 30 }} />)}
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div className="p-4 lg:p-3 lg:flex-1 lg:min-h-0 lg:overflow-y-auto">
        <AnimatePresence mode="wait">
          {activeTab === 'on-site' && (
            <motion.div key="on-site" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.2 }}>
              <OnSiteTab />
            </motion.div>
          )}
          {activeTab === 'deliveries' && (
            <motion.div key="deliveries" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.2 }}>
              <DeliveriesTab />
            </motion.div>
          )}
          {activeTab === 'inspections' && (
            <motion.div key="inspections" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }} transition={{ duration: 0.2 }}>
              <InspectionsTab showMilestones={showMilestones} setShowMilestones={setShowMilestones} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function OnSiteTab() {
  const onSite = teamMembers.filter((m) => m.onSiteToday);
  const offSite = teamMembers.filter((m) => !m.onSiteToday);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" /><span className="text-white/70 text-xs">{onSite.length} workers on site right now</span></div>
        <span className="text-[10px] text-gray-500">Last check-in: 7:52 AM</span>
      </div>
      <div className="space-y-2">
        {onSite.map((member, i) => (
          <motion.div key={member.id} className="flex items-center gap-3 bg-white/[0.03] rounded-xl p-3 border border-white/[0.04] hover:border-green-500/20 transition-colors" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <div className="relative">
              <div className="w-11 h-11 rounded-full p-[2px] bg-gradient-to-br from-green-500 to-emerald-500">
                <div className="w-full h-full rounded-full overflow-hidden bg-[#141419]"><img src={member.avatar} alt={member.name} className="w-full h-full object-cover" /></div>
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#141419] rounded-full flex items-center justify-center"><CheckCircle className="w-3 h-3 text-green-400" /></div>
            </div>
            <div className="flex-1 min-w-0"><p className="text-white/85 text-sm">{member.name}</p><p className="text-gray-500 text-[11px] truncate">{member.role}</p></div>
            <div className="flex flex-col items-end gap-0.5"><span className="text-green-400 text-[10px] bg-green-400/10 px-2 py-0.5 rounded-md">On Site</span><span className="text-[9px] text-gray-600">Arrived 7:30 AM</span></div>
          </motion.div>
        ))}
      </div>
      {offSite.length > 0 && (
        <div>
          <p className="text-gray-500 text-[10px] mb-2 uppercase tracking-wider">Expected Later</p>
          {offSite.map((member, i) => (
            <motion.div key={member.id} className="flex items-center gap-3 bg-white/[0.02] rounded-xl p-3 border border-white/[0.03] opacity-60" initial={{ opacity: 0 }} animate={{ opacity: 0.6 }} transition={{ delay: (onSite.length + i) * 0.08 }}>
              <div className="w-11 h-11 rounded-full p-[2px] bg-gradient-to-br from-gray-600 to-gray-700"><div className="w-full h-full rounded-full overflow-hidden bg-[#141419]"><img src={member.avatar} alt={member.name} className="w-full h-full object-cover" /></div></div>
              <div className="flex-1 min-w-0"><p className="text-white/60 text-sm">{member.name}</p><p className="text-gray-600 text-[11px] truncate">{member.role}</p></div>
              <div className="flex flex-col items-end gap-0.5"><span className="text-gray-500 text-[10px] bg-white/[0.04] px-2 py-0.5 rounded-md">Expected</span><span className="text-[9px] text-gray-600">~10:00 AM</span></div>
            </motion.div>
          ))}
        </div>
      )}
      <button className="w-full flex items-center justify-center gap-1.5 bg-white/[0.04] hover:bg-white/[0.06] transition-colors border border-white/[0.06] text-gray-400 text-xs h-9 rounded-xl"><Users className="w-3.5 h-3.5" /><span>View Full Team Schedule</span><ChevronRight className="w-3 h-3" /></button>
    </div>
  );
}

function DeliveriesTab() {
  const statusConfig = {
    'en-route': { label: 'En Route', color: 'text-sky-400', bg: 'bg-sky-400/10', dot: 'bg-sky-400' },
    scheduled: { label: 'Scheduled', color: 'text-amber-400', bg: 'bg-amber-400/10', dot: 'bg-amber-400' },
    delivered: { label: 'Delivered', color: 'text-green-400', bg: 'bg-green-400/10', dot: 'bg-green-400' },
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-sky-400 animate-pulse" /><span className="text-[10px] text-gray-400">1 En Route</span></div>
          <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-amber-400" /><span className="text-[10px] text-gray-400">1 Scheduled</span></div>
          <div className="flex items-center gap-1.5"><div className="w-1.5 h-1.5 rounded-full bg-green-400" /><span className="text-[10px] text-gray-400">1 Delivered</span></div>
        </div>
      </div>
      {deliveries.map((delivery, i) => {
        const config = statusConfig[delivery.status];
        return (
          <motion.div key={delivery.id} className={`rounded-xl p-3.5 border transition-colors ${delivery.status === 'en-route' ? 'bg-sky-500/[0.06] border-sky-500/15' : delivery.status === 'delivered' ? 'bg-green-500/[0.04] border-green-500/10' : 'bg-white/[0.03] border-white/[0.04]'}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <div className="flex items-start gap-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${delivery.status === 'en-route' ? 'bg-sky-500/15' : delivery.status === 'delivered' ? 'bg-green-500/15' : 'bg-amber-500/15'}`}>
                {delivery.status === 'delivered' ? <CheckCircle className="w-4 h-4 text-green-400" /> : delivery.status === 'en-route' ? <motion.div animate={{ x: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><Truck className="w-4 h-4 text-sky-400" /></motion.div> : <Package className="w-4 h-4 text-amber-400" />}
              </div>
              <div className="flex-1 min-w-0"><p className="text-white/85 text-sm">{delivery.item}</p><p className="text-gray-500 text-[11px] mt-0.5">{delivery.supplier}</p></div>
              <div className="flex flex-col items-end gap-1"><span className={`text-[10px] ${config.color} ${config.bg} px-2 py-0.5 rounded-md`}>{config.label}</span><div className="flex items-center gap-1"><Clock className="w-2.5 h-2.5 text-gray-600" /><span className="text-[10px] text-gray-500">{delivery.eta}</span></div></div>
            </div>
            {delivery.status === 'en-route' && (
              <div className="mt-3 pt-2 border-t border-white/[0.04]">
                <div className="flex items-center justify-between mb-1"><span className="text-[9px] text-gray-500">Dispatched at 9:15 AM</span><span className="text-[9px] text-sky-400">ETA {delivery.eta}</span></div>
                <div className="h-1 rounded-full bg-white/[0.06] overflow-hidden"><motion.div className="h-full rounded-full bg-gradient-to-r from-sky-600 to-cyan-400" initial={{ width: 0 }} animate={{ width: '55%' }} transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }} /></div>
              </div>
            )}
          </motion.div>
        );
      })}
      <button className="w-full flex items-center justify-center gap-1.5 bg-white/[0.04] hover:bg-white/[0.06] transition-colors border border-white/[0.06] text-gray-400 text-xs h-9 rounded-xl"><Truck className="w-3.5 h-3.5" /><span>View Delivery History</span><ChevronRight className="w-3 h-3" /></button>
    </div>
  );
}

function InspectionsTab({ showMilestones, setShowMilestones }: { showMilestones: boolean; setShowMilestones: (v: boolean) => void }) {
  const completedCount = milestoneSteps.filter((s) => s.completed).length;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between mb-1"><span className="text-gray-400 text-xs">Today&apos;s Inspections</span><span className="text-[10px] text-gray-500">{inspections.filter((i) => i.status !== 'completed').length} upcoming</span></div>
      {inspections.map((inspection, i) => (
        <motion.div key={inspection.id} className={`rounded-xl p-3.5 border ${inspection.status === 'completed' ? 'bg-green-500/[0.04] border-green-500/10' : inspection.status === 'in-progress' ? 'bg-amber-500/[0.06] border-amber-500/15' : 'bg-white/[0.03] border-white/[0.04]'}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
          <div className="flex items-start gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${inspection.status === 'completed' ? 'bg-green-500/15' : 'bg-indigo-500/15'}`}>
              {inspection.status === 'completed' ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : <ClipboardCheck className="w-4 h-4 text-indigo-400" />}
            </div>
            <div className="flex-1 min-w-0"><p className={`text-sm ${inspection.status === 'completed' ? 'text-gray-400 line-through' : 'text-white/85'}`}>{inspection.label}</p><div className="flex items-center gap-1 mt-1"><MapPin className="w-2.5 h-2.5 text-gray-600" /><span className="text-[10px] text-gray-500">{inspection.inspector}</span></div></div>
            <div className="flex flex-col items-end gap-1"><span className={`text-[10px] px-2 py-0.5 rounded-md ${inspection.status === 'completed' ? 'text-green-400 bg-green-400/10' : inspection.status === 'in-progress' ? 'text-amber-400 bg-amber-400/10' : 'text-indigo-400 bg-indigo-400/10'}`}>{inspection.status === 'completed' ? 'Passed' : inspection.status === 'in-progress' ? 'In Progress' : 'Upcoming'}</span><div className="flex items-center gap-1"><Calendar className="w-2.5 h-2.5 text-gray-600" /><span className="text-[10px] text-gray-500">{inspection.timeRange}</span></div></div>
          </div>
        </motion.div>
      ))}
      <div className="pt-2">
        <button className="w-full flex items-center justify-between bg-white/[0.03] hover:bg-white/[0.05] transition-colors border border-white/[0.04] rounded-xl px-3.5 py-3" onClick={() => setShowMilestones(!showMilestones)}>
          <div className="flex items-center gap-2"><ClipboardCheck className="w-3.5 h-3.5 text-indigo-400" /><span className="text-xs text-white/70">Project Milestones</span></div>
          <div className="flex items-center gap-2"><span className="text-indigo-400 text-[10px] bg-indigo-400/10 px-2 py-0.5 rounded-md">{completedCount}/{milestoneSteps.length}</span><motion.div animate={{ rotate: showMilestones ? 90 : 0 }} transition={{ duration: 0.2 }}><ChevronRight className="w-3.5 h-3.5 text-gray-500" /></motion.div></div>
        </button>
        <AnimatePresence>
          {showMilestones && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
              <div className="pt-3 space-y-0">
                {milestoneSteps.map((step, i) => (
                  <div key={step.label} className="flex items-center gap-3 py-1.5">
                    <div className="flex flex-col items-center w-5">
                      {step.completed ? <CheckCircle2 className="w-4 h-4 text-green-400" /> : step.active ? <div className="w-4 h-4 rounded-full border-2 border-amber-400 flex items-center justify-center"><div className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" /></div> : <Circle className="w-4 h-4 text-gray-700" />}
                      {i < milestoneSteps.length - 1 && <div className={`w-[2px] h-3 mt-0.5 ${step.completed ? 'bg-green-400/30' : 'bg-gray-700/40'}`} />}
                    </div>
                    <span className={`text-xs ${step.completed ? 'text-gray-500 line-through' : step.active ? 'text-white/80' : 'text-gray-600'}`}>
                      {step.label}{step.active && <span className="ml-1.5 text-[9px] text-amber-400 bg-amber-400/10 px-1.5 py-0.5 rounded">Current</span>}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
