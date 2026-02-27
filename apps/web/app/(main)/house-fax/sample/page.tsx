'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  MapPin,
  Calendar,
  DollarSign,
  Clock,
  Building2,
  CheckCircle2,
  Image as ImageIcon,
  AlertCircle,
  ArrowRight,
  ExternalLink,
  QrCode,
  Share2,
  Shield,
  Package,
  ClipboardCheck,
  Users,
  Award,
  Download,
  ChevronRight,
  FileText,
  TrendingUp,
} from 'lucide-react';

// Data
const milestones = [
  {
    id: 1,
    phase: 'Demo & Excavation',
    dateRange: 'Nov 4 - Nov 8',
    photos: 8,
    inspection: 'N/A',
    vaultStatus: 'Paid',
    details: 'Foundation exposed, existing flooring removed, excavation to proper depth.',
  },
  {
    id: 2,
    phase: 'Underpinning',
    dateRange: 'Nov 11 - Nov 20',
    photos: 12,
    inspection: 'Footing Passed',
    vaultStatus: 'Paid',
    details: 'New footings poured, underpinning complete, structural integrity verified.',
  },
  {
    id: 3,
    phase: 'Waterproofing',
    dateRange: 'Nov 22 - Nov 28',
    photos: 6,
    inspection: 'N/A',
    vaultStatus: 'Paid',
    details: 'Delta MS wrap installed, drainage system complete, sump pit ready.',
  },
  {
    id: 4,
    phase: 'Framing',
    dateRange: 'Dec 1 - Dec 18',
    photos: 10,
    inspection: 'Framing Passed',
    vaultStatus: 'Paid',
    details: 'All walls framed, ceiling joists installed, openings verified.',
  },
  {
    id: 5,
    phase: 'Electrical + Plumbing',
    dateRange: 'Dec 20 - Jan 12',
    photos: 9,
    inspection: 'Rough-in Passed (Both)',
    vaultStatus: 'Paid',
    details: 'Wiring complete, panel upgraded, plumbing rough-in inspected.',
  },
  {
    id: 6,
    phase: 'Insulation + Drywall',
    dateRange: 'Jan 15 - Jan 28',
    photos: 7,
    inspection: 'Insulation Passed',
    vaultStatus: 'Paid',
    details: 'R-24 insulation, vapor barrier installed, drywall hung and taped.',
  },
  {
    id: 7,
    phase: 'Finishing',
    dateRange: 'Jan 30 - Feb 14',
    photos: 15,
    inspection: 'Final Passed',
    vaultStatus: 'Paid',
    details: 'Paint, trim, flooring, fixtures installed, final walkthrough complete.',
  },
];

const materials = [
  {
    product: 'Schluter DITRA 25',
    manufacturer: 'Schluter',
    sku: 'DITRA-25',
    qty: '240 sf',
    installer: 'Apex Builders',
    installDate: 'Jan 28, 2026',
    warranty: 'Active 10yr',
    status: 'active',
  },
  {
    product: 'Kohler Simplice Faucet',
    manufacturer: 'Kohler',
    sku: 'K-596-VS',
    qty: '1 unit',
    installer: 'FlowRight Plumbing',
    installDate: 'Feb 3, 2026',
    warranty: 'Lifetime',
    status: 'active',
  },
  {
    product: 'Roxul ComfortBatt R-24',
    manufacturer: 'Rockwool',
    sku: 'RXCB324',
    qty: '1200 sf',
    installer: 'Apex Builders',
    installDate: 'Jan 20, 2026',
    warranty: 'N/A',
    status: 'na',
  },
  {
    product: 'LP SolidStart I-Joist 11⅞"',
    manufacturer: 'LP Building',
    sku: 'LPI-20',
    qty: '14 pcs',
    installer: 'Apex Builders',
    installDate: 'Dec 8, 2025',
    warranty: 'Active 25yr',
    status: 'active',
  },
  {
    product: 'NuHeat Floor Heating',
    manufacturer: 'NuHeat',
    sku: 'NH-MAT-80',
    qty: '80 sf',
    installer: 'Spark Electric',
    installDate: 'Jan 26, 2026',
    warranty: 'Expiring 2036',
    status: 'expiring',
  },
  {
    product: 'Delta MS Foundation Wrap',
    manufacturer: 'Cosella-Dörken',
    sku: 'DELTA-MS',
    qty: '140 lf',
    installer: 'WP Solutions',
    installDate: 'Nov 25, 2025',
    warranty: 'Active 20yr',
    status: 'active',
  },
  {
    product: 'Benjamin Moore Advance',
    manufacturer: 'Benjamin Moore',
    sku: 'N319-80',
    qty: '12 gal',
    installer: 'TrueFinish Painting',
    installDate: 'Feb 8, 2026',
    warranty: 'Active 5yr',
    status: 'active',
  },
  {
    product: 'Lutron Caseta Switches',
    manufacturer: 'Lutron',
    sku: 'PD-6WCL-WH',
    qty: '8 units',
    installer: 'Spark Electric',
    installDate: 'Jan 18, 2026',
    warranty: 'Active 2yr',
    status: 'active',
  },
];

const inspections = [
  { id: 1, name: 'Footing', date: 'Nov 22, 2025', permit: 'P2025-11482', result: 'PASS' },
  { id: 2, name: 'Framing', date: 'Jan 3, 2026', permit: 'P2025-11482', result: 'PASS' },
  { id: 3, name: 'Plumbing Rough-in', date: 'Jan 10, 2026', permit: 'P2026-00134', result: 'PASS' },
  { id: 4, name: 'Electrical Rough-in', date: 'Jan 15, 2026', permit: 'P2026-00135', result: 'PASS' },
  { id: 5, name: 'Insulation', date: 'Jan 24, 2026', permit: 'P2025-11482', result: 'PASS' },
  { id: 6, name: 'Final / Occupancy', date: 'Feb 14, 2026', permit: 'P2025-11482', result: 'PASS' },
];

const trades = [
  { company: 'Apex Builders', trade: 'General Contractor', role: 'PM + Labour', hours: 640, wsib: true, insured: true },
  { company: 'FlowRight Plumbing', trade: 'Plumber', role: 'Rough-in + Finish', hours: 48, wsib: true, insured: true },
  { company: 'SparkLine Electric', trade: 'Electrician', role: 'Panel + Rough-in + Finish', hours: 56, wsib: true, insured: true },
  { company: 'WP Solutions Inc', trade: 'Waterproofing', role: 'Foundation wrap', hours: 24, wsib: true, insured: true },
  { company: 'Comfort HVAC', trade: 'HVAC', role: 'Ductwork + Mini-split', hours: 32, wsib: true, insured: true },
  { company: 'TileCraft', trade: 'Tiler', role: 'Bathroom + Laundry', hours: 40, wsib: true, insured: true },
];

const warranties = [
  { product: 'Underpinning', manufacturer: 'Apex Builders', term: 'Structural 25yr', installDate: 'Nov 20, 2025', expiryDate: 'Nov 20, 2050', installer: 'Apex Builders', status: 'active' },
  { product: 'Waterproofing', manufacturer: 'Cosella-Dörken', term: 'Product 20yr', installDate: 'Nov 25, 2025', expiryDate: 'Nov 25, 2045', installer: 'WP Solutions', status: 'active' },
  { product: 'Electrical Panel', manufacturer: 'Eaton', term: 'Product 10yr', installDate: 'Dec 22, 2025', expiryDate: 'Dec 22, 2035', installer: 'SparkLine Electric', status: 'expiring' },
  { product: 'Plumbing Fixtures', manufacturer: 'Kohler', term: 'Lifetime', installDate: 'Feb 3, 2026', expiryDate: 'Lifetime', installer: 'FlowRight Plumbing', status: 'active' },
  { product: 'Paint', manufacturer: 'Benjamin Moore', term: 'Workmanship 5yr', installDate: 'Feb 8, 2026', expiryDate: 'Feb 8, 2031', installer: 'TrueFinish Painting', status: 'active' },
  { product: 'Heated Floor', manufacturer: 'NuHeat', term: 'Product 10yr', installDate: 'Jan 26, 2026', expiryDate: 'Jan 26, 2036', installer: 'Spark Electric', status: 'expiring' },
];

const photoTimeline = [
  { week: 'Week 1', date: 'Nov 4-8', count: 8, phase: 'Demo & Excavation' },
  { week: 'Week 2', date: 'Nov 11-15', count: 6, phase: 'Underpinning' },
  { week: 'Week 3', date: 'Nov 18-22', count: 6, phase: 'Underpinning' },
  { week: 'Week 4', date: 'Nov 25-29', count: 6, phase: 'Waterproofing' },
  { week: 'Week 5', date: 'Dec 2-6', count: 5, phase: 'Framing' },
  { week: 'Week 6', date: 'Dec 9-13', count: 5, phase: 'Framing' },
  { week: 'Week 7', date: 'Dec 16-20', count: 3, phase: 'Framing' },
  { week: 'Week 8', date: 'Dec 23-27', count: 4, phase: 'Electrical' },
  { week: 'Week 9', date: 'Dec 30-Jan 3', count: 3, phase: 'Plumbing' },
  { week: 'Week 10', date: 'Jan 6-10', count: 2, phase: 'Plumbing' },
  { week: 'Week 11', date: 'Jan 13-17', count: 4, phase: 'Insulation' },
  { week: 'Week 12', date: 'Jan 20-24', count: 3, phase: 'Drywall' },
  { week: 'Week 13', date: 'Jan 27-31', count: 7, phase: 'Finishing' },
  { week: 'Week 14', date: 'Feb 3-7', count: 5, phase: 'Finishing' },
  { week: 'Week 15', date: 'Feb 10-14', count: 3, phase: 'Final' },
];

export default function SampleHouseFaxPage() {
  const [selectedMilestone, setSelectedMilestone] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white">
      {/* S1: Property Header - Dark */}
      <section className="bg-reno-dark text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          {/* Top Bar */}
          <div className="flex items-start justify-between mb-8">
            <div className="flex items-start gap-4">
              {/* Property Photo Placeholder */}
              <div className="w-24 h-24 rounded-lg bg-gray-800 flex items-center justify-center flex-shrink-0">
                <Building2 className="h-12 w-12 text-gray-600" />
              </div>
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-reno-teal/20 border border-reno-teal/40 mb-3">
                  <Shield className="h-4 w-4 text-reno-teal" />
                  <span className="text-sm font-medium text-reno-teal">RenoNext Verified</span>
                </div>
                <h1 className="font-display text-3xl sm:text-4xl mb-2">
                  Renovation Record — Verified by RenoNext
                </h1>
                <p className="text-gray-400 text-sm">
                  All data GPS-confirmed and cryptographically secured
                </p>
              </div>
            </div>
            {/* QR Code + Share */}
            <div className="hidden lg:flex flex-col items-end gap-3">
              <div className="w-24 h-24 rounded-lg bg-white flex items-center justify-center">
                <QrCode className="h-16 w-16 text-reno-dark" />
              </div>
              <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition">
                <Share2 className="h-4 w-4" />
                Share this record
              </button>
            </div>
          </div>

          {/* Property Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <div>
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                <MapPin className="h-4 w-4" />
                Location
              </div>
              <p className="text-xl font-semibold">Toronto, ON</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                <Building2 className="h-4 w-4" />
                Project Type
              </div>
              <p className="text-xl font-semibold">Basement Underpinning + Full Finish</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                <Calendar className="h-4 w-4" />
                Completed
              </div>
              <p className="text-xl font-semibold">February 2026</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                <Clock className="h-4 w-4" />
                Duration
              </div>
              <p className="text-xl font-semibold">14 weeks</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                <DollarSign className="h-4 w-4" />
                Total Value
              </div>
              <p className="text-xl font-semibold">$148,200</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-gray-400 text-sm mb-1">
                <Users className="h-4 w-4" />
                General Contractor
              </div>
              <Link href="/pros/apex" className="text-xl font-semibold text-reno-teal hover:underline inline-flex items-center gap-1">
                Apex Builders
                <ExternalLink className="h-4 w-4" />
              </Link>
              <div className="flex items-center gap-3 mt-1 text-xs text-gray-400">
                <span>Licensed</span>
                <span>•</span>
                <span>Insured</span>
                <span>•</span>
                <span className="text-reno-teal">Verified</span>
              </div>
            </div>
          </div>

          {/* Verification Badge */}
          <div className="rounded-lg border border-reno-teal/30 bg-reno-teal/10 p-4">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-reno-teal/20 p-2 flex-shrink-0">
                <CheckCircle2 className="h-5 w-5 text-reno-teal" />
              </div>
              <div>
                <h3 className="font-semibold text-reno-teal mb-1">RenoNext Verified Record</h3>
                <p className="text-sm text-gray-300">
                  All data collected automatically during construction via RenoNext's GPS tracking, crew management, and inspection integration systems. This record is immutable and cryptographically signed.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* S2: At-a-Glance Summary */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl text-reno-dark mb-8">At-a-Glance Summary</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
              <div className="rounded-xl border-2 border-reno-teal/20 bg-white p-6 text-center hover:shadow-lg transition">
                <div className="text-4xl font-display text-reno-teal mb-2">47</div>
                <div className="text-sm font-medium text-gray-600">GPS-verified photos</div>
              </div>
              <div className="rounded-xl border-2 border-reno-green/20 bg-white p-6 text-center hover:shadow-lg transition">
                <div className="text-4xl font-display text-reno-green mb-2">6</div>
                <div className="text-sm font-medium text-gray-600">City inspections passed</div>
              </div>
              <div className="rounded-xl border-2 border-reno-purple/20 bg-white p-6 text-center hover:shadow-lg transition">
                <div className="text-4xl font-display text-reno-purple mb-2">12</div>
                <div className="text-sm font-medium text-gray-600">Licensed trades</div>
              </div>
              <div className="rounded-xl border-2 border-reno-teal/20 bg-white p-6 text-center hover:shadow-lg transition">
                <div className="text-4xl font-display text-reno-teal mb-2">24</div>
                <div className="text-sm font-medium text-gray-600">Tracked materials (with SKUs)</div>
              </div>
              <div className="rounded-xl border-2 border-reno-purple/20 bg-white p-6 text-center hover:shadow-lg transition">
                <div className="text-4xl font-display text-reno-purple mb-2">8</div>
                <div className="text-sm font-medium text-gray-600">Active warranties</div>
              </div>
              <div className="rounded-xl border-2 border-reno-green/20 bg-reno-green-light p-6 text-center hover:shadow-lg transition">
                <div className="text-4xl font-display text-reno-green mb-2">0</div>
                <div className="text-sm font-medium text-reno-green">Open deficiencies</div>
              </div>
            </div>
            <p className="text-sm text-gray-600 text-center max-w-4xl mx-auto">
              All data collected automatically during construction via RenoNext's GPS tracking, crew management, and inspection integration systems.
            </p>
          </motion.div>
        </div>
      </section>

      {/* S3: Milestone Timeline */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl text-reno-dark mb-4">Milestone Timeline</h2>
            <p className="text-gray-600 mb-12">Click each milestone for detailed information</p>

            {/* Desktop: Horizontal Timeline */}
            <div className="hidden lg:block mb-12">
              <div className="relative">
                {/* Connecting Line */}
                <div className="absolute top-8 left-0 right-0 h-0.5 bg-gray-300" />

                {/* Milestone Nodes */}
                <div className="relative flex justify-between">
                  {milestones.map((milestone, index) => (
                    <button
                      key={milestone.id}
                      onClick={() => setSelectedMilestone(selectedMilestone === milestone.id ? null : milestone.id)}
                      className="flex flex-col items-center group"
                    >
                      <div className={`w-16 h-16 rounded-full border-4 flex items-center justify-center transition z-10 ${
                        selectedMilestone === milestone.id
                          ? 'bg-reno-teal border-reno-teal text-white'
                          : 'bg-white border-gray-300 text-gray-600 hover:border-reno-teal'
                      }`}>
                        <span className="text-lg font-bold">{index + 1}</span>
                      </div>
                      <div className="mt-4 text-center">
                        <div className="font-semibold text-sm text-reno-dark mb-1">{milestone.phase}</div>
                        <div className="text-xs text-gray-500">{milestone.dateRange}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Selected Milestone Details */}
              {selectedMilestone && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-8 rounded-xl border-2 border-reno-teal/20 bg-reno-teal-light p-6"
                >
                  {milestones.map((milestone) =>
                    milestone.id === selectedMilestone ? (
                      <div key={milestone.id}>
                        <h3 className="font-display text-2xl text-reno-dark mb-4">{milestone.phase}</h3>
                        <div className="grid grid-cols-4 gap-6 mb-4">
                          <div>
                            <div className="text-sm text-gray-600 mb-1">Date Range</div>
                            <div className="font-semibold text-reno-dark">{milestone.dateRange}</div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600 mb-1">Photos</div>
                            <div className="font-semibold text-reno-dark flex items-center gap-2">
                              <ImageIcon className="h-4 w-4" />
                              {milestone.photos}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600 mb-1">Inspection</div>
                            <div className="font-semibold text-reno-green flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4" />
                              {milestone.inspection}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600 mb-1">Vault Payment</div>
                            <div className="font-semibold text-reno-green flex items-center gap-2">
                              <CheckCircle2 className="h-4 w-4" />
                              {milestone.vaultStatus}
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-700">{milestone.details}</p>
                      </div>
                    ) : null
                  )}
                </motion.div>
              )}
            </div>

            {/* Mobile: Vertical Timeline */}
            <div className="lg:hidden space-y-4">
              {milestones.map((milestone, index) => (
                <div key={milestone.id} className="relative">
                  {index !== milestones.length - 1 && (
                    <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-gray-300" />
                  )}
                  <div className="rounded-xl border-2 border-gray-200 bg-white p-6 hover:border-reno-teal/40 transition">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-full bg-reno-teal text-white flex items-center justify-center font-bold text-lg flex-shrink-0">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg text-reno-dark mb-1">{milestone.phase}</h3>
                        <p className="text-sm text-gray-600 mb-3">{milestone.dateRange}</p>
                        <div className="flex flex-wrap gap-4 text-sm">
                          <div className="flex items-center gap-1 text-gray-600">
                            <ImageIcon className="h-4 w-4" />
                            {milestone.photos} photos
                          </div>
                          <div className="flex items-center gap-1 text-reno-green">
                            <CheckCircle2 className="h-4 w-4" />
                            {milestone.inspection}
                          </div>
                          <div className="flex items-center gap-1 text-reno-green">
                            <CheckCircle2 className="h-4 w-4" />
                            {milestone.vaultStatus}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* S4: Photo Timeline */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl text-reno-dark mb-4">Photo Timeline</h2>
            <p className="text-gray-600 mb-8">47 GPS-verified photos organized by construction week</p>

            {/* Scrollable Photo Timeline */}
            <div className="overflow-x-auto pb-4">
              <div className="flex gap-4 min-w-max">
                {photoTimeline.map((week) => (
                  <div key={week.week} className="w-48 flex-shrink-0">
                    <div className="rounded-xl border-2 border-gray-200 bg-white p-4 hover:shadow-lg transition">
                      <div className="w-full h-32 rounded-lg bg-gray-200 mb-3 flex items-center justify-center">
                        <ImageIcon className="h-12 w-12 text-gray-400" />
                      </div>
                      <div className="flex items-center gap-2 text-reno-teal text-xs mb-2">
                        <MapPin className="h-3 w-3" />
                        GPS Verified
                      </div>
                      <div className="font-semibold text-reno-dark mb-1">{week.week}</div>
                      <div className="text-xs text-gray-600 mb-2">{week.date}</div>
                      <div className="text-xs text-gray-500">{week.count} photos • {week.phase}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Before/After Section */}
            <div className="mt-12">
              <h3 className="font-display text-2xl text-reno-dark mb-6">Before & After</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="rounded-xl border-2 border-gray-200 bg-white p-6">
                  <div className="w-full h-64 rounded-lg bg-gray-200 mb-4 flex items-center justify-center">
                    <div className="text-center">
                      <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                      <div className="text-sm text-gray-500">Before: Bare concrete</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Nov 4, 2025</span>
                    <div className="flex items-center gap-2 text-xs text-reno-teal">
                      <Shield className="h-3 w-3" />
                      No edits detected
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border-2 border-gray-200 bg-white p-6">
                  <div className="w-full h-64 rounded-lg bg-gray-200 mb-4 flex items-center justify-center">
                    <div className="text-center">
                      <ImageIcon className="h-16 w-16 text-gray-400 mx-auto mb-2" />
                      <div className="text-sm text-gray-500">After: Finished space</div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-600">Feb 14, 2026</span>
                    <div className="flex items-center gap-2 text-xs text-reno-teal">
                      <Shield className="h-3 w-3" />
                      No edits detected
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* S5: Materials Registry */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl text-reno-dark mb-4">Materials Registry</h2>
            <p className="text-gray-600 mb-8">Complete inventory with SKUs, installation dates, and warranty tracking</p>

            <div className="overflow-hidden rounded-xl border-2 border-gray-200 shadow-lg">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-gray-50 border-b-2 border-gray-200">
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Product</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Manufacturer</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">SKU</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Qty</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Installer</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Install Date</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Warranty Status</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {materials.map((material, index) => (
                      <tr key={index} className="hover:bg-gray-50 transition">
                        <td className="px-6 py-4 text-sm font-medium text-reno-dark whitespace-nowrap">{material.product}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{material.manufacturer}</td>
                        <td className="px-6 py-4 text-sm text-gray-500 font-mono whitespace-nowrap">{material.sku}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{material.qty}</td>
                        <td className="px-6 py-4 text-sm text-reno-teal whitespace-nowrap">{material.installer}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">{material.installDate}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {material.status === 'active' && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 border border-green-200">
                              <CheckCircle2 className="h-3 w-3" />
                              {material.warranty}
                            </span>
                          )}
                          {material.status === 'expiring' && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 border border-amber-200">
                              <AlertCircle className="h-3 w-3" />
                              {material.warranty}
                            </span>
                          )}
                          {material.status === 'na' && (
                            <span className="inline-flex items-center gap-1 rounded-full bg-gray-50 px-3 py-1 text-xs font-semibold text-gray-600 border border-gray-200">
                              {material.warranty}
                            </span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* S6: Inspection History */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl text-reno-dark mb-4">Inspection History</h2>
            <p className="text-gray-600 mb-8">All city inspections passed — full compliance verified</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {inspections.map((inspection) => (
                <div key={inspection.id} className="rounded-xl border-2 border-gray-200 bg-white p-6 hover:shadow-lg transition">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                        <ClipboardCheck className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-reno-dark">{inspection.name}</h3>
                        <p className="text-sm text-gray-500">{inspection.date}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Permit #</span>
                      <span className="font-mono text-gray-900">{inspection.permit}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Inspector</span>
                      <span className="text-gray-500">City of Toronto</span>
                    </div>
                  </div>
                  <div className="pt-4 border-t border-gray-200">
                    <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-4 py-2 text-sm font-bold text-green-700 border-2 border-green-200">
                      <CheckCircle2 className="h-5 w-5" />
                      {inspection.result}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* S7: Trade Roster */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl text-reno-dark mb-4">Trade Roster</h2>
            <p className="text-gray-600 mb-8">All licensed, insured, and WSIB-registered contractors</p>

            <div className="space-y-4">
              {trades.map((trade, index) => (
                <div key={index} className="rounded-xl border-2 border-gray-200 bg-white p-6 hover:shadow-lg transition">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-reno-purple-light flex items-center justify-center flex-shrink-0">
                        <Users className="h-6 w-6 text-reno-purple" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-reno-dark">{trade.company}</h3>
                        <p className="text-sm text-gray-600">{trade.trade} • {trade.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right">
                        <div className="text-2xl font-bold text-reno-dark">{trade.hours}</div>
                        <div className="text-xs text-gray-500">hours logged</div>
                      </div>
                      <div className="flex gap-3">
                        {trade.wsib && (
                          <div className="flex items-center gap-1 text-xs text-green-700">
                            <CheckCircle2 className="h-4 w-4" />
                            WSIB
                          </div>
                        )}
                        {trade.insured && (
                          <div className="flex items-center gap-1 text-xs text-green-700">
                            <CheckCircle2 className="h-4 w-4" />
                            Insured
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* S8: Warranty Dashboard */}
      <section className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl text-reno-dark mb-4">Warranty Dashboard</h2>
            <p className="text-gray-600 mb-8">Track all warranties in one place — transfers with the property on sale</p>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {warranties.map((warranty, index) => (
                <div key={index} className="rounded-xl border-2 border-gray-200 bg-white p-6 hover:shadow-lg transition">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full flex-shrink-0 ${warranty.status === 'active' ? 'bg-green-500' : 'bg-amber-500'}`} />
                      <div>
                        <h3 className="font-semibold text-reno-dark">{warranty.product}</h3>
                        <p className="text-sm text-gray-500">{warranty.manufacturer}</p>
                      </div>
                    </div>
                    <Award className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Warranty Term</span>
                      <span className="font-semibold text-reno-dark">{warranty.term}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Install Date</span>
                      <span className="text-gray-900">{warranty.installDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Expires</span>
                      <span className={warranty.status === 'expiring' ? 'text-amber-700 font-semibold' : 'text-gray-900'}>{warranty.expiryDate}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Installer</span>
                      <span className="text-reno-teal">{warranty.installer}</span>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    {warranty.status === 'active' && (
                      <div className="inline-flex items-center gap-2 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700 border border-green-200">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        Active
                      </div>
                    )}
                    {warranty.status === 'expiring' && (
                      <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700 border border-amber-200">
                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                        Expiring Soon
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-6">
              <div className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-amber-900 mb-1">Want warranty tracking for your home?</h3>
                  <p className="text-sm text-amber-800">
                    Start a project with RenoNext and get automatic warranty tracking, expiry alerts, and seamless transfer on property sale.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* S9: Transfer on Sale */}
      <section className="bg-reno-purple text-white py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl mb-4">Transfer on Sale</h2>
            <p className="text-purple-100 mb-12 max-w-2xl">
              This HouseFax™ record transfers seamlessly to the new owner when the property is sold. All warranties, photos, and documentation stay with the home.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <FileText className="h-10 w-10 text-purple-200" />
                </div>
                <h3 className="font-semibold text-xl mb-2">Seller Shares</h3>
                <p className="text-purple-100 text-sm">
                  Share via QR code, link, or PDF during listing. Buyers see verified renovation history.
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <ChevronRight className="h-10 w-10 text-purple-200" />
                </div>
                <h3 className="font-semibold text-xl mb-2">Record Transfers</h3>
                <p className="text-purple-100 text-sm">
                  On closing, the HouseFax™ automatically transfers to the new owner's account.
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-10 w-10 text-purple-200" />
                </div>
                <h3 className="font-semibold text-xl mb-2">Value Preserved</h3>
                <p className="text-purple-100 text-sm">
                  Warranties transfer, photos stay, and the new owner gains full renovation transparency.
                </p>
              </div>
            </div>

            <div className="rounded-xl border-2 border-white/20 bg-white/10 p-8 text-center backdrop-blur-sm">
              <h3 className="font-display text-2xl mb-3">The Most Shareable Page on RenoNext</h3>
              <p className="text-purple-100 mb-6">
                This record can be shared via link, QR code, or PDF. It never expires and stays with the property forever.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <button className="inline-flex items-center gap-2 rounded-lg bg-white text-reno-purple px-6 py-3 font-semibold hover:bg-purple-50 transition">
                  <Share2 className="h-5 w-5" />
                  Share Record
                </button>
                <button className="inline-flex items-center gap-2 rounded-lg border-2 border-white text-white px-6 py-3 font-semibold hover:bg-white/10 transition">
                  <Download className="h-5 w-5" />
                  Download PDF
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* S10: Dark CTA Section */}
      <section className="bg-reno-dark text-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center"
          >
            <h2 className="font-display text-4xl sm:text-5xl mb-6">
              Get this for your home.
            </h2>
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Every renovation through RenoNext automatically creates a HouseFax™. Complete documentation, verified by GPS and city inspections, that stays with your property forever.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <Link
                href="/start-project"
                className="inline-flex items-center gap-2 rounded-lg bg-reno-green px-8 py-4 text-lg font-semibold text-white hover:bg-reno-green/90 transition"
              >
                Start a Project
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2 rounded-lg border-2 border-white text-white px-8 py-4 text-lg font-semibold hover:bg-white/10 transition"
              >
                Learn How It Works
                <ChevronRight className="h-5 w-5" />
              </Link>
            </div>

            <p className="text-gray-400">
              Already renovating?{' '}
              <Link href="/contractors" className="text-reno-teal hover:underline font-semibold">
                Ask your contractor to join the RenoNext network
              </Link>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
