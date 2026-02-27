import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ChevronRight,
  Star,
  MapPin,
  Clock,
  ArrowRight,
  HelpCircle,
  Sparkles,
  Users,
  Shield,
  CheckCircle,
  Zap,
  TrendingUp,
  DollarSign,
  BadgeCheck,
  Lightbulb,
  ThumbsUp,
} from 'lucide-react';
import { ProCard } from '@/components/pro-card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

const categoryData: Record<
  string,
  {
    name: string;
    description: string;
    longDescription: string;
    heroImage: string;
    stats: { prosAvailable: number; avgRating: number; avgResponse: string };
    priceRange: string;
    whyHire: string[];
    faqs: { question: string; answer: string }[];
  }
> = {
  plumbing: {
    name: 'Plumbing',
    description: 'Licensed plumbers for repairs, installations, and emergencies',
    longDescription:
      'Find licensed, verified plumbing professionals for any job -- from leaky faucets and clogged drains to full bathroom remodels and emergency pipe repairs. All plumbers on RenoNext carry proper licensing and insurance for your peace of mind.',
    heroImage: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=1600&h=600&fit=crop',
    stats: { prosAvailable: 84, avgRating: 4.8, avgResponse: '45 min' },
    priceRange: '$75-150/hr',
    whyHire: ['Avoid costly water damage from DIY mistakes', 'Ensure code compliance and pass inspections', 'Access specialized tools and diagnostic equipment', 'Get warranty-backed work and peace of mind'],
    faqs: [
      {
        question: 'How much does a plumber typically charge?',
        answer:
          'Plumbing rates on RenoNext range from $75-$150/hr depending on the complexity of the job. Emergency and after-hours service may be higher. Post your job to get accurate quotes from local pros.',
      },
      {
        question: 'Are all plumbers on RenoNext licensed?',
        answer:
          'Yes, all plumbing professionals on RenoNext must provide valid licensing information. We verify credentials before allowing pros to bid on plumbing jobs.',
      },
      {
        question: 'How quickly can I get a plumber?',
        answer:
          'For emergencies, many plumbers on RenoNext offer same-day or next-day service. Average response time for bids is under 2 hours during business hours.',
      },
      {
        question: 'What if something goes wrong after the job?',
        answer:
          'All pros on RenoNext provide a satisfaction guarantee. If there are issues, you can reach out through the platform and the pro will address them. We also offer dispute resolution support.',
      },
    ],
  },
  electrical: {
    name: 'Electrical',
    description: 'Certified electricians for safe, code-compliant work',
    longDescription:
      'Connect with certified electricians for residential and commercial electrical work. From panel upgrades and wiring to smart home installations and EV chargers, our verified electricians ensure safe, code-compliant results.',
    heroImage: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=1600&h=600&fit=crop',
    stats: { prosAvailable: 67, avgRating: 4.9, avgResponse: '30 min' },
    priceRange: '$65-120/hr',
    whyHire: ['Prevent fire hazards from improper wiring', 'Meet Ontario electrical code requirements', 'Get ESA-certified inspection-ready work', 'Save time with professional diagnostics'],
    faqs: [
      {
        question: 'Do I need a permit for electrical work?',
        answer:
          'In Ontario, most electrical work beyond simple fixture swaps requires a permit. Your RenoNext electrician can help determine if permits are needed and handle the process.',
      },
      {
        question: 'How much does electrical work cost?',
        answer:
          'Electrical rates typically range from $65-$120/hr. Panel upgrades may cost $1,500-$3,000, while outlet installations start around $150-$250 per outlet.',
      },
      {
        question: 'Can electricians install EV chargers?',
        answer:
          'Yes! Many of our certified electricians specialize in EV charger installation, including Tesla Wall Connectors and other Level 2 chargers.',
      },
      {
        question: 'Is the electrical work insured?',
        answer:
          'All electricians on RenoNext carry valid insurance. You can view their insurance details on their profile before hiring.',
      },
    ],
  },
  painting: {
    name: 'Painting',
    description: 'Professional painters for interior and exterior projects',
    longDescription:
      'Transform your space with professional painters. Whether you need a single room refreshed or a full exterior paint job, our verified painters deliver clean, quality results on time and on budget.',
    heroImage: 'https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=1600&h=600&fit=crop',
    stats: { prosAvailable: 112, avgRating: 4.7, avgResponse: '1 hr' },
    priceRange: '$40-80/hr',
    whyHire: ['Get a flawless, streak-free finish', 'Proper prep work prevents peeling and cracking', 'Professionals handle lead paint safely', 'Complete a room in half the time'],
    faqs: [
      {
        question: 'How much does it cost to paint a room?',
        answer:
          'Interior painting typically costs $300-$800 per room depending on size, prep work, and paint quality. Get exact quotes by posting your job on RenoNext.',
      },
      {
        question: 'Do painters bring their own supplies?',
        answer:
          'Most professional painters bring tools and equipment. Paint and materials are usually an additional cost, though many pros can pick up supplies for you.',
      },
      {
        question: 'How long does a painting job take?',
        answer:
          'A single room typically takes 1-2 days. Full house interiors can take 3-7 days depending on size, prep work, and number of coats needed.',
      },
    ],
  },
  landscaping: {
    name: 'Landscaping',
    description: 'Expert landscapers for lawns, gardens, and outdoor spaces',
    longDescription:
      'From lawn care and garden design to hardscaping and tree services, our verified landscaping professionals can transform your outdoor space. Get matched with experienced landscapers who understand local climate and soil conditions.',
    heroImage: 'https://images.unsplash.com/photo-1558904541-efa843a96f01?w=1600&h=600&fit=crop',
    stats: { prosAvailable: 95, avgRating: 4.8, avgResponse: '2 hrs' },
    priceRange: '$40-75/hr',
    whyHire: ['Boost curb appeal and property value', 'Avoid plant damage from incorrect techniques', 'Access to commercial-grade equipment', 'Designs that thrive in local climate conditions'],
    faqs: [
      {
        question: 'What landscaping services are available?',
        answer:
          'Our landscapers offer lawn mowing, garden design, tree trimming, sod installation, patio and deck building, irrigation systems, and seasonal cleanups.',
      },
      {
        question: 'How much does landscaping cost?',
        answer:
          'Basic lawn care starts at $40-$60/visit. Larger projects like patio installation can range from $2,000-$15,000 depending on materials and scope.',
      },
    ],
  },
  carpentry: {
    name: 'Carpentry',
    description: 'Skilled carpenters for custom builds and repairs',
    longDescription:
      'Find skilled carpenters for custom furniture, cabinetry, deck building, framing, and general woodwork. Our verified carpenters bring years of craftsmanship to every project, big or small.',
    heroImage: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=1600&h=600&fit=crop',
    stats: { prosAvailable: 58, avgRating: 4.9, avgResponse: '1.5 hrs' },
    priceRange: '$50-90/hr',
    whyHire: ['Get precise, custom-fitted results', 'Avoid costly material waste from mistakes', 'Professional-grade joints and finishes', 'Structural work done safely and to code'],
    faqs: [
      {
        question: 'What types of carpentry work can I get?',
        answer:
          'Our carpenters handle everything from custom shelving and cabinets to deck building, framing, trim work, door installation, and furniture repair.',
      },
      {
        question: 'How are carpentry rates structured?',
        answer:
          'Most carpenters charge $50-$90/hr. Custom projects may have flat-rate quotes. Post your job to get specific estimates from multiple pros.',
      },
    ],
  },
  cleaning: {
    name: 'Cleaning',
    description: 'Reliable cleaning pros for homes and offices',
    longDescription:
      'Book trusted, background-checked cleaning professionals for one-time deep cleans, regular maintenance, move-in/out cleaning, and commercial spaces. Flexible scheduling and satisfaction guaranteed.',
    heroImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1600&h=600&fit=crop',
    stats: { prosAvailable: 143, avgRating: 4.7, avgResponse: '30 min' },
    priceRange: '$35-60/hr',
    whyHire: ['Deep cleaning beyond surface level', 'Professional products and equipment', 'Consistent results you can count on', 'Free up your time for things that matter'],
    faqs: [
      {
        question: 'How much does house cleaning cost?',
        answer:
          'Standard cleaning for a 2-3 bedroom home ranges from $120-$250. Deep cleaning typically costs 50-100% more. Prices vary by home size and condition.',
      },
      {
        question: 'Are cleaning supplies included?',
        answer:
          'Most cleaning pros bring their own supplies and equipment. If you have specific product preferences, let them know in your job description.',
      },
    ],
  },
  moving: {
    name: 'Moving',
    description: 'Professional movers for local and long-distance moves',
    longDescription:
      'Make your move stress-free with verified, insured moving professionals. Whether it\'s a studio apartment or a full house, our movers handle your belongings with care. Includes packing, loading, transport, and unpacking services.',
    heroImage: 'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?w=1600&h=600&fit=crop',
    stats: { prosAvailable: 76, avgRating: 4.6, avgResponse: '1 hr' },
    priceRange: '$80-150/hr',
    whyHire: ['Prevent damage to furniture and walls', 'Proper equipment for heavy items', 'Insurance coverage during transport', 'Faster completion with experienced teams'],
    faqs: [
      {
        question: 'How much does moving cost?',
        answer:
          'Local moves typically cost $80-$150/hr for a 2-person team plus truck. A full 1-bedroom apartment move averages $300-$600. Long-distance moves are quoted per job.',
      },
      {
        question: 'Is my stuff insured during the move?',
        answer:
          'All movers on RenoNext carry basic liability insurance. Many offer additional coverage options. Ask about insurance when reviewing bids.',
      },
    ],
  },
  'general-repair': {
    name: 'General Repair',
    description: 'Handymen and repair pros for all home maintenance',
    longDescription:
      'Need something fixed around the house? Our general repair professionals handle everything from drywall patches and door repairs to furniture assembly and minor installations. No job is too small.',
    heroImage: 'https://images.unsplash.com/photo-1581783898377-1c85bf937427?w=1600&h=600&fit=crop',
    stats: { prosAvailable: 128, avgRating: 4.7, avgResponse: '45 min' },
    priceRange: '$45-80/hr',
    whyHire: ['One pro handles multiple small tasks', 'Correct diagnosis before fixing', 'Proper tools for every repair', 'Avoid making the problem worse'],
    faqs: [
      {
        question: 'What counts as general repair?',
        answer:
          'General repair covers a wide range: drywall patching, door/window repairs, furniture assembly, mounting TVs, fixing squeaky floors, weather stripping, and more.',
      },
      {
        question: 'What are typical handyman rates?',
        answer:
          'General repair rates range from $45-$80/hr. Many handymen offer a minimum charge of $100-$150 for small jobs. Post your job for exact quotes.',
      },
    ],
  },
};

const defaultCategory = {
  name: 'Service',
  description: 'Professional service providers in your area',
  longDescription: 'Find top-rated professionals for this service category on RenoNext.',
  heroImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1600&h=600&fit=crop',
  stats: { prosAvailable: 50, avgRating: 4.7, avgResponse: '1 hr' },
  priceRange: '$40-100/hr',
  whyHire: ['Professional quality results', 'Save time and avoid mistakes', 'Licensed and insured work', 'Satisfaction guaranteed'],
  faqs: [],
};

const mockPros = [
  {
    id: '1',
    name: 'Marcus Johnson',
    headline: 'Licensed Professional - 15 Years Experience',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    rating: 4.9,
    reviewCount: 127,
    hourlyRateMin: 65,
    hourlyRateMax: 85,
    categories: ['Electrical', 'Smart Home'],
    city: 'Toronto',
    isVerified: true,
    responseTimeMinutes: 30,
    coverUrl: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=600&h=200&fit=crop',
    tier: 'top_rated' as const,
    completedJobs: 342,
    responseRate: 98,
    isOnline: true,
  },
  {
    id: '2',
    name: 'David Park',
    headline: 'Master Professional - Emergency Service Available',
    avatarUrl: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    rating: 4.8,
    reviewCount: 203,
    hourlyRateMin: 75,
    hourlyRateMax: 100,
    categories: ['Plumbing', 'Drain Cleaning'],
    city: 'Toronto',
    isVerified: true,
    responseTimeMinutes: 15,
    coverUrl: 'https://images.unsplash.com/photo-1585704032915-c3400ca199e7?w=600&h=200&fit=crop',
    tier: 'rising_talent' as const,
    completedJobs: 178,
    responseRate: 95,
    isOnline: false,
  },
  {
    id: '3',
    name: 'James Wilson',
    headline: 'Experienced Professional - Quality Guaranteed',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
    rating: 4.9,
    reviewCount: 156,
    hourlyRateMin: 55,
    hourlyRateMax: 80,
    categories: ['Carpentry', 'Decks'],
    city: 'Hamilton',
    isVerified: true,
    responseTimeMinutes: 120,
    coverUrl: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=600&h=200&fit=crop',
    tier: 'top_rated' as const,
    completedJobs: 289,
    responseRate: 92,
    isOnline: true,
  },
  {
    id: '4',
    name: 'Sarah Mitchell',
    headline: 'Detail-oriented pro with 10+ years experience',
    avatarUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face',
    rating: 5.0,
    reviewCount: 89,
    hourlyRateMin: 60,
    hourlyRateMax: 90,
    categories: ['Cleaning', 'Organization'],
    city: 'Mississauga',
    isVerified: true,
    responseTimeMinutes: 25,
    coverUrl: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&h=200&fit=crop',
    tier: 'new' as const,
    completedJobs: 42,
    responseRate: 100,
    isOnline: true,
  },
];

const mockRecentJobs = [
  {
    id: '1',
    title: 'Fix leaking kitchen faucet',
    city: 'Toronto',
    budget: '$100-200',
    postedAgo: '2 hours ago',
    bids: 4,
  },
  {
    id: '2',
    title: 'Install new bathroom sink',
    city: 'Mississauga',
    budget: '$300-500',
    postedAgo: '5 hours ago',
    bids: 7,
  },
  {
    id: '3',
    title: 'Water heater replacement',
    city: 'Brampton',
    budget: '$1,000-2,000',
    postedAgo: '1 day ago',
    bids: 12,
  },
];

const relatedCategories = [
  { slug: 'plumbing', name: 'Plumbing' },
  { slug: 'electrical', name: 'Electrical' },
  { slug: 'painting', name: 'Painting' },
  { slug: 'landscaping', name: 'Landscaping' },
  { slug: 'carpentry', name: 'Carpentry' },
  { slug: 'cleaning', name: 'Cleaning' },
  { slug: 'moving', name: 'Moving' },
  { slug: 'general-repair', name: 'General Repair' },
];

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const cat = categoryData[resolvedParams.slug] || defaultCategory;
  return {
    title: `${cat.name} Professionals | RenoNext`,
    description: cat.description,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const cat = categoryData[slug] || { ...defaultCategory, name: slug.charAt(0).toUpperCase() + slug.slice(1).replace('-', ' ') };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero with Background Image */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={cat.heroImage}
            alt=""
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/75 to-gray-900/60" />
        </div>

        <div className="relative">
          {/* Breadcrumb */}
          <div className="container mx-auto px-4 pt-6">
            <div className="flex items-center gap-2 text-sm text-white/60">
              <Link href="/" className="transition-colors hover:text-white">Home</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <Link href="/pros" className="transition-colors hover:text-white">Categories</Link>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="font-medium text-white">{cat.name}</span>
            </div>
          </div>

          {/* Hero Content */}
          <div className="container mx-auto px-4 pb-16 pt-12">
            <Badge className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm border-white/20 hover:bg-white/20">
              <Sparkles className="h-3 w-3" />
              {cat.name} Services
            </Badge>
            <h1 className="mt-4 text-4xl font-bold tracking-tight text-white md:text-5xl">
              {cat.name} Problems? We&apos;ve Got You Covered
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/80">
              {cat.longDescription}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-gray-900 transition-all duration-200 hover:bg-gray-100 hover:shadow-lg h-auto">
                <Link href={`/post-job?category=${slug}`}>
                  Describe Your {cat.name} Problem
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" className="inline-flex items-center gap-2 rounded-xl border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20 h-auto">
                <Link href={`/pros?category=${slug}`}>
                  Browse All Pros
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center justify-center gap-8 py-5 md:gap-16">
            <div className="flex items-center gap-2.5 text-sm">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-reno-green-light">
                <Users className="h-4 w-4 text-reno-green-dark" />
              </div>
              <div>
                <p className="font-bold text-gray-900">{cat.stats.prosAvailable}+ Pros</p>
                <p className="text-xs text-gray-500">Available now</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50">
                <Star className="h-4 w-4 text-amber-500" />
              </div>
              <div>
                <p className="font-bold text-gray-900">{cat.stats.avgRating} Average</p>
                <p className="text-xs text-gray-500">Customer rating</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50">
                <Zap className="h-4 w-4 text-green-600" />
              </div>
              <div>
                <p className="font-bold text-gray-900">{cat.stats.avgResponse}</p>
                <p className="text-xs text-gray-500">Avg response time</p>
              </div>
            </div>
            <div className="flex items-center gap-2.5 text-sm">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                <Shield className="h-4 w-4 text-blue-600" />
              </div>
              <div>
                <p className="font-bold text-gray-900">100% Verified</p>
                <p className="text-xs text-gray-500">Licensed & insured</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Price Range Indicator */}
      <section className="border-b border-gray-100 bg-gradient-to-r from-green-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-3 py-4">
            <DollarSign className="h-5 w-5 text-green-600" />
            <span className="text-sm font-medium text-gray-700">
              Typical cost:{' '}
              <span className="font-bold text-green-700">{cat.priceRange}</span>
            </span>
            <span className="text-xs text-gray-400">|</span>
            <span className="text-xs text-gray-500">Based on average rates in your area</span>
          </div>
        </div>
      </section>

      {/* How It Works Mini */}
      <section className="border-b border-gray-100 bg-gray-50 py-10">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { step: '1', title: 'Post Your Job', desc: 'Describe what you need and set your budget. It takes less than 2 minutes.' },
              { step: '2', title: 'Get Bids', desc: 'Verified pros send competitive bids. Compare profiles, ratings, and prices.' },
              { step: '3', title: 'Hire & Track', desc: 'Choose the best pro, track progress in real-time, and pay securely.' },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-reno-green-dark text-sm font-bold text-white shadow-sm shadow-reno-green-light">
                  {item.step}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-gray-500">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Hire a Pro? */}
      {cat.whyHire && cat.whyHire.length > 0 && (
        <section className="border-b border-gray-100 bg-white py-10">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl">
              <div className="mb-6 flex items-center gap-2.5">
                <div className="rounded-xl bg-amber-50 p-2">
                  <Lightbulb className="h-5 w-5 text-amber-600" />
                </div>
                <h2 className="text-xl font-bold text-gray-900">Why Hire a {cat.name} Pro?</h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                {cat.whyHire.map((reason, i) => (
                  <div key={i} className="flex items-start gap-3 rounded-xl bg-gray-50 p-4">
                    <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-green-500" />
                    <span className="text-sm leading-relaxed text-gray-700">{reason}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <div className="container mx-auto px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="space-y-10 lg:col-span-2">
            {/* Pros */}
            <div>
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-bold text-gray-900">
                  Top {cat.name} Pros
                </h2>
                <Link
                  href={`/pros?category=${slug}`}
                  className="flex items-center gap-1 text-sm font-semibold text-reno-green-dark transition-colors duration-200 hover:text-reno-green-dark"
                >
                  View All
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                {mockPros.map((pro) => (
                  <ProCard key={pro.id} {...pro} />
                ))}
              </div>
            </div>

            {/* FAQs */}
            {cat.faqs.length > 0 && (
              <Card className="rounded-2xl border-gray-200 bg-white p-6 md:p-8">
                <h2 className="mb-6 flex items-center gap-2.5 text-xl font-bold text-gray-900">
                  <div className="rounded-xl bg-reno-green-light p-2">
                    <HelpCircle className="h-5 w-5 text-reno-green-dark" />
                  </div>
                  Frequently Asked Questions
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {cat.faqs.map((faq, i) => (
                    <AccordionItem key={i} value={`faq-${i}`} className="border-gray-100">
                      <AccordionTrigger className="text-left font-semibold text-gray-900 hover:no-underline py-5">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-sm leading-relaxed text-gray-600 pb-5">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </Card>
            )}

            {/* Trust Banner */}
            <div className="flex items-center gap-4 rounded-2xl bg-gradient-to-r from-reno-green-light to-blue-50 p-6 ring-1 ring-reno-green-light">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-reno-green-dark shadow-sm shadow-reno-green-light">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Your Satisfaction, Guaranteed</h3>
                <p className="mt-0.5 text-sm text-gray-600">
                  Every pro is verified, insured, and rated by real customers. If you&apos;re not happy, we&apos;ll make it right.
                </p>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Jobs */}
            <Card className="rounded-2xl border-gray-200 bg-white p-6">
              <h3 className="mb-4 flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-400">
                <TrendingUp className="h-4 w-4" />
                Recent {cat.name} Jobs
              </h3>
              <div className="space-y-4">
                {mockRecentJobs.map((job) => (
                  <div key={job.id} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <p className="font-semibold text-gray-900">{job.title}</p>
                    <div className="mt-1.5 flex items-center gap-3 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {job.city}
                      </span>
                      <span className="font-medium text-gray-700">{job.budget}</span>
                    </div>
                    <div className="mt-1.5 flex items-center justify-between text-xs">
                      <span className="text-gray-400 flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {job.postedAgo}
                      </span>
                      <Badge className="rounded-full bg-green-50 px-2 py-0.5 text-xs font-medium text-green-700 border-transparent hover:bg-green-50">
                        {job.bids} bids
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Related Categories */}
            <Card className="rounded-2xl border-gray-200 bg-white p-6">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-gray-400">
                Browse Categories
              </h3>
              <div className="space-y-1">
                {relatedCategories.map((rc) => (
                  <Link
                    key={rc.slug}
                    href={`/categories/${rc.slug}`}
                    className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-all duration-200 ${
                      rc.slug === slug
                        ? 'bg-reno-green-light font-semibold text-reno-green-dark'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }`}
                  >
                    {rc.name}
                    <ChevronRight className="h-4 w-4 opacity-40" />
                  </Link>
                ))}
              </div>
            </Card>

            {/* CTA */}
            <Card className="overflow-hidden rounded-2xl border-0 bg-gradient-to-br from-reno-green-dark to-violet-600 p-6 text-center text-white shadow-lg shadow-reno-green-light/50">
              <div className="mb-3 inline-flex rounded-xl bg-white/15 p-3 backdrop-blur-sm">
                <CheckCircle className="h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-bold">
                Need {cat.name} Help?
              </h3>
              <p className="mb-5 text-sm leading-relaxed text-white/80">
                Post your job in 2 minutes and get bids from verified {cat.name.toLowerCase()} pros.
              </p>
              <Button asChild className="inline-flex w-full rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-reno-green-dark transition-all duration-200 hover:bg-reno-green-light hover:shadow-md h-auto">
                <Link href={`/post-job?category=${slug}`}>
                  Describe Your Problem
                </Link>
              </Button>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
