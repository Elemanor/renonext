// =============================================================================
// COMMAND CENTER — Mock Data + Types
// =============================================================================

export interface TeamMember {
  name: string;
  role: string;
  avatar: string;
  status: 'on-site' | 'en-route' | 'off-site';
}

export interface ProgressPhoto {
  id: string;
  src: string;
  alt: string;
  date: string;
  description: string;
}

export interface HourlyForecast {
  time: string;
  temp: number;
  icon: 'sun' | 'cloud-sun' | 'cloud' | 'cloud-rain';
  precipitation: number;
}

export interface Delivery {
  id: string;
  item: string;
  supplier: string;
  status: 'delivered' | 'en-route' | 'scheduled';
  eta?: string;
  time?: string;
}

export interface Inspection {
  id: string;
  type: string;
  inspector: string;
  status: 'completed' | 'upcoming' | 'in-progress';
  date: string;
  result?: 'passed' | 'failed';
}

export interface MilestoneStep {
  label: string;
  status: 'completed' | 'current' | 'upcoming';
  date?: string;
}

export interface EscrowData {
  total: number;
  released: number;
  held: number;
  progress: number;
  milestones: {
    label: string;
    amount: number;
    status: 'released' | 'pending' | 'locked';
    date?: string;
  }[];
}

export interface NoiseTimePoint {
  time: string;
  level: number; // 0-100
}

export interface WarningData {
  title: string;
  description: string;
  severity: 'warning' | 'alert' | 'info';
  details: string[];
  time: string;
}

// -----------------------------------------------------------------------------
// Data
// -----------------------------------------------------------------------------

export const teamMembers: TeamMember[] = [
  { name: 'Mike Dubois', role: 'Site Supervisor', avatar: 'MD', status: 'on-site' },
  { name: 'Jean-Pierre L.', role: 'Waterproofing Tech', avatar: 'JP', status: 'on-site' },
  { name: 'Carlos Mendes', role: 'Laborer', avatar: 'CM', status: 'en-route' },
];

export const progressPhotos: ProgressPhoto[] = [
  {
    id: 'ph-1',
    src: '/placeholder-excavation.jpg',
    alt: 'Foundation excavation complete',
    date: 'Mar 7',
    description: 'Excavation complete — foundation fully exposed',
  },
  {
    id: 'ph-2',
    src: '/placeholder-membrane.jpg',
    alt: 'Waterproof membrane applied',
    date: 'Mar 11',
    description: 'Blueskin WP200 membrane applied to foundation wall',
  },
  {
    id: 'ph-3',
    src: '/placeholder-drainage.jpg',
    alt: 'Drainage board installation',
    date: 'Mar 12',
    description: 'Protection board 60% installed',
  },
  {
    id: 'ph-4',
    src: '/placeholder-site.jpg',
    alt: 'Full site overview',
    date: 'Mar 13',
    description: 'Overall site progress — weeping tile delivery pending',
  },
];

export const hourlyForecast: HourlyForecast[] = [
  { time: '8 AM', temp: 4, icon: 'cloud', precipitation: 10 },
  { time: '10 AM', temp: 6, icon: 'cloud-sun', precipitation: 5 },
  { time: '12 PM', temp: 9, icon: 'sun', precipitation: 0 },
  { time: '2 PM', temp: 10, icon: 'sun', precipitation: 0 },
  { time: '4 PM', temp: 8, icon: 'cloud-sun', precipitation: 15 },
  { time: '6 PM', temp: 5, icon: 'cloud', precipitation: 30 },
];

export const deliveries: Delivery[] = [
  { id: 'del-1', item: 'Weeping Tile (60m)', supplier: 'BuildAll Supply', status: 'en-route', eta: '11:30 AM' },
  { id: 'del-2', item: 'Gravel — ¾" clear', supplier: 'Lafarge', status: 'scheduled', eta: 'Tomorrow 8 AM' },
  { id: 'del-3', item: 'Blueskin WP200 Membrane', supplier: 'HD Supply', status: 'delivered', time: 'Mar 11, 8 AM' },
];

export const inspections: Inspection[] = [
  { id: 'ins-1', type: 'Foundation Excavation', inspector: 'J. Thompson', status: 'completed', date: 'Mar 7', result: 'passed' },
  { id: 'ins-2', type: 'Membrane Application', inspector: 'J. Thompson', status: 'completed', date: 'Mar 11', result: 'passed' },
  { id: 'ins-3', type: 'Pre-Backfill Inspection', inspector: 'J. Thompson', status: 'upcoming', date: 'Mar 17' },
];

export const milestoneSteps: MilestoneStep[] = [
  { label: 'Excavation', status: 'completed', date: 'Mar 5–7' },
  { label: 'Waterproofing', status: 'completed', date: 'Mar 10–11' },
  { label: 'Protection Board', status: 'current', date: 'Mar 12–13' },
  { label: 'Drainage System', status: 'upcoming', date: 'Mar 14–15' },
  { label: 'Backfill', status: 'upcoming', date: 'Mar 17–18' },
  { label: 'Grading & Cleanup', status: 'upcoming', date: 'Mar 19–20' },
];

export const escrowData: EscrowData = {
  total: 18500,
  released: 7400,
  held: 11100,
  progress: 40,
  milestones: [
    { label: 'Mobilization', amount: 2775, status: 'released', date: 'Mar 3' },
    { label: 'Excavation Complete', amount: 4625, status: 'released', date: 'Mar 7' },
    { label: 'Waterproofing Complete', amount: 4625, status: 'pending', date: 'Est. Mar 15' },
    { label: 'Drainage & Backfill', amount: 3700, status: 'locked' },
    { label: 'Final Inspection & Cleanup', amount: 2775, status: 'locked' },
  ],
};

export const warningData: WarningData = {
  title: 'Noise Advisory',
  description: 'Heavy machinery between 8 AM – 4 PM today. Expect elevated noise near south wall.',
  severity: 'warning',
  details: [
    'Excavator backfill operations (8 AM – 12 PM)',
    'Compactor running intermittently (1 PM – 4 PM)',
    'Truck deliveries may cause brief road blockage',
  ],
  time: 'Today, 8 AM – 4 PM',
};

export const noiseTimePoints: NoiseTimePoint[] = [
  { time: '7 AM', level: 15 },
  { time: '9 AM', level: 85 },
  { time: '12 PM', level: 60 },
  { time: '3 PM', level: 75 },
  { time: '5 PM', level: 20 },
];

export const siteAddress = '47 Willowdale Ave, Toronto ON';
export const projectDay = 8;
export const projectTotalDays = 20;
