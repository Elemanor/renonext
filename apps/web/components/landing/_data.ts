import {
  Zap,
  HardHat,
  Building2,
  Shield,
  ShieldCheck,
  Lock,
  LockKeyhole,
  CheckCircle,
  BadgeCheck,
  Headphones,
  type LucideIcon,
} from 'lucide-react';

/* ── Service Lanes (Path Selection) ── */
export interface ServiceLane {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  bestFor: string;
  model: string;
  cta: string;
  href: string;
  color: string;
  borderColor: string;
  bgColor: string;
  textColor: string;
  examples: string[];
  image: string;
  featured?: boolean;
}

export const serviceLanes: ServiceLane[] = [
  {
    icon: Zap,
    title: 'I Need Help Today',
    subtitle: 'Small tasks, repairs & emergencies',
    bestFor: 'Best for: Homeowners, tenants, property managers',
    model: 'Instant / Hourly',
    cta: 'Book a Tasker',
    href: '/book-service',
    color: 'from-blue-500 to-blue-600',
    borderColor: 'border-blue-200 hover:border-blue-400',
    bgColor: 'bg-blue-50',
    textColor: 'text-blue-600',
    examples: ['Mount a TV', 'LED Lights', 'Moving', 'Cleaning', 'Snow Removal'],
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&fit=crop',
  },
  {
    icon: HardHat,
    title: "I'm Planning a Renovation",
    subtitle: 'Major builds & renovations',
    bestFor: 'Best for: Homeowners, landlords, insurance restoration',
    model: 'Quoted / Milestones',
    cta: 'Start a Project',
    href: '/post-job',
    color: 'from-emerald-500 to-emerald-600',
    borderColor: 'border-emerald-200 hover:border-emerald-400',
    bgColor: 'bg-emerald-50',
    textColor: 'text-emerald-600',
    examples: ['Waterproofing', 'Underpinning', 'Additions', 'Roofing', 'Concrete'],
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&fit=crop',
    featured: true,
  },
  {
    icon: Building2,
    title: 'I Run Job Sites',
    subtitle: 'For GCs & professionals',
    bestFor: 'Best for: General contractors, developers, multi-site ops',
    model: 'Tender / Contract',
    cta: 'Find Trades',
    href: '/pro-network',
    color: 'from-violet-500 to-violet-600',
    borderColor: 'border-violet-200 hover:border-violet-400',
    bgColor: 'bg-violet-50',
    textColor: 'text-violet-600',
    examples: ['Drywallers', 'Drain Installers', 'Glass Fabricators', 'Plan Drafters', 'Electricians'],
    image: 'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&fit=crop',
  },
];

/* ── Proof Engine ── */
export interface ProofItem {
  text: string;
}

export interface ProofColumn {
  title: string;
  subtitle: string;
  icon: LucideIcon;
  colorClass: string;
  headerBg: string;
  iconColor: string;
  items: ProofItem[];
}

export const proofColumns: ProofColumn[] = [
  {
    title: 'Dispatch — Verified Labor',
    subtitle: 'Verified labor only',
    icon: ShieldCheck,
    colorClass: 'emerald',
    headerBg: 'bg-emerald-600',
    iconColor: 'text-emerald-500',
    items: [
      { text: 'Every pro is insured and background-checked' },
      { text: 'Safety certifications verified before dispatch' },
      { text: 'GPS clock-in confirms who is on your site' },
      { text: 'Digital ID card — know who you are letting in' },
    ],
  },
  {
    title: 'The Safe — Protected Money',
    subtitle: 'Funds locked until approved',
    icon: LockKeyhole,
    colorClass: 'blue',
    headerBg: 'bg-blue-600',
    iconColor: 'text-blue-500',
    items: [
      { text: 'Every dollar held in bonded escrow' },
      { text: 'Cost verified by a Quantity Surveyor before work starts' },
      { text: 'Funds released only when you approve the milestone' },
      { text: 'Built-in dispute protection if something goes wrong' },
    ],
  },
  {
    title: 'The Vault — Proof of Quality',
    subtitle: 'Photo proof + permanent record',
    icon: CheckCircle,
    colorClass: 'violet',
    headerBg: 'bg-violet-600',
    iconColor: 'text-violet-500',
    items: [
      { text: 'Permanent record of every job on your property' },
      { text: 'Photo proof uploaded at every milestone' },
      { text: 'Engineer stamps and certifications attached' },
      { text: 'Downloadable reports for insurance or resale' },
    ],
  },
];

export const proofStats: { value: string; label: string }[] = [];

/* ── Escrow Safe Steps ── */
export const escrowSteps = [
  {
    step: '1',
    title: 'Client Deposits',
    desc: 'Funds move into bonded escrow vault',
    colorBg: 'bg-blue-500/20',
    colorText: 'text-blue-400',
    ringColor: 'ring-blue-500/30',
  },
  {
    step: '2',
    title: 'Work Performed',
    desc: 'Pro completes milestone with photo proof',
    colorBg: 'bg-amber-500/20',
    colorText: 'text-amber-400',
    ringColor: 'ring-amber-500/30',
  },
  {
    step: '3',
    title: 'QS Verified',
    desc: 'Quantity Surveyor verifies scope and milestone requirements before release',
    colorBg: 'bg-violet-500/20',
    colorText: 'text-violet-400',
    ringColor: 'ring-violet-500/30',
  },
  {
    step: '4',
    title: 'Funds Released',
    desc: 'Client approves — pro paid within 24hrs',
    colorBg: 'bg-emerald-500/20',
    colorText: 'text-emerald-400',
    ringColor: 'ring-emerald-500/30',
  },
];

export const escrowTrustSignals = [
  'Bank-Grade Encryption',
  'Bonded Escrow Account',
  'QS-Verified Releases',
  'Dispute Resolution Built-In',
];

/* ── Testimonials ── */
export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
  avatar: string;
  verified: boolean;
  jobType: string;
}

export const testimonials: Testimonial[] = [
  {
    name: 'Jennifer S.',
    role: 'Homeowner in Toronto',
    quote:
      'I almost hired a guy off Facebook Marketplace. No insurance, no reviews, just a phone number. Then I found RenoNext — saw his WSIB clearance, background check, and 47 verified reviews instantly. Night and day.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&fit=crop&crop=face',
    verified: true,
    jobType: 'Electrical Panel Upgrade',
  },
  {
    name: 'Robert K.',
    role: 'Property Manager',
    quote:
      'Last year a contractor walked off a job with $8K of my client\'s money. With RenoNext the funds sit in escrow — the pro only gets paid when I verify the milestone. I sleep better now.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&fit=crop&crop=face',
    verified: true,
    jobType: 'Basement Waterproofing',
  },
  {
    name: 'Maria G.',
    role: 'Homeowner in Mississauga',
    quote:
      'My biggest fear was letting a stranger into my house while I was at work. RenoNext showed me a live dashboard — I could see exactly when he arrived, what he completed, and photos of every step. I felt in control the entire time.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&fit=crop&crop=face',
    verified: true,
    jobType: 'Interior Painting',
  },
];
