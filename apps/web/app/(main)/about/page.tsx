import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Building2,
  Users,
  Target,
  Eye,
  TrendingUp,
  Award,
  CheckCircle,
  Mail,
  Handshake,
  Sparkles,
  Code,
  LineChart,
  Rocket,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'About Us | RenoNext',
  description:
    'Building the operating system for construction. Learn about RenoNext\'s mission to make construction transparent, accountable, and reliable.',
};

const stats = [
  { value: '500+', label: 'Verified Pros' },
  { value: '1,200+', label: 'Jobs Completed' },
  { value: '$2M+', label: 'Held in Escrow' },
  { value: '98%', label: 'Satisfaction Rate' },
];

const teamRoles = [
  {
    role: 'CEO & Founder',
    name: 'Leadership',
    description: 'BCIN-certified designer, Quantity Surveyor, and visionary behind RenoNext',
    gradient: 'from-violet-500 to-blue-500',
    icon: Rocket,
  },
  {
    role: 'Head of Engineering',
    name: 'Technology',
    description: 'Building the technical infrastructure for construction 2.0',
    gradient: 'from-blue-500 to-emerald-500',
    icon: Code,
  },
  {
    role: 'Head of Operations',
    name: 'Operations',
    description: 'Scaling verification systems and contractor onboarding',
    gradient: 'from-emerald-500 to-amber-500',
    icon: CheckCircle,
  },
  {
    role: 'Head of Growth',
    name: 'Growth',
    description: 'Expanding the RenoNext network across Canada',
    gradient: 'from-amber-500 to-rose-500',
    icon: LineChart,
  },
];

const values = [
  {
    icon: Target,
    title: 'Mission',
    content:
      'To make every construction dollar accountable, every worker verified, and every homeowner confident.',
    color: 'emerald',
    bgGradient: 'from-emerald-500/10 to-emerald-600/5',
    borderColor: 'border-emerald-500/30',
    iconBg: 'bg-emerald-500/10',
    iconColor: 'text-emerald-400',
  },
  {
    icon: Eye,
    title: 'Vision',
    content:
      'A world where construction is as transparent and reliable as online banking.',
    color: 'violet',
    bgGradient: 'from-violet-500/10 to-violet-600/5',
    borderColor: 'border-violet-500/30',
    iconBg: 'bg-violet-500/10',
    iconColor: 'text-violet-400',
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-gray-950 via-gray-950 to-gray-900">
        {/* decorative grid */}
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:64px_64px]" />
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[120px]" />

        <div className="relative mx-auto max-w-5xl px-6 pb-24 pt-28 text-center sm:pt-36">
          <Badge className="mb-6 border-violet-500/30 bg-violet-500/10 text-violet-300 hover:bg-violet-500/10">
            <Sparkles className="mr-1.5 h-3.5 w-3.5" />
            Our Story
          </Badge>

          <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Building the{' '}
            <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              Operating System
            </span>
            <br />
            for Construction
          </h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-relaxed text-gray-400">
            We&apos;re transforming the construction industry in Canada by
            replacing trust based on reviews with trust based on verified data,
            escrow protection, and real-time transparency.
          </p>
        </div>
      </section>

      {/* MISSION & VISION */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-2">
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <Card
                  key={value.title}
                  className={`border ${value.borderColor} bg-gradient-to-br ${value.bgGradient} to-white shadow-lg`}
                >
                  <CardContent className="p-8">
                    <div
                      className={`mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl ${value.iconBg}`}
                    >
                      <Icon className={`h-7 w-7 ${value.iconColor}`} />
                    </div>
                    <h2 className="mb-4 text-2xl font-bold text-gray-900">
                      {value.title}
                    </h2>
                    <p className="text-lg leading-relaxed text-gray-700">
                      &ldquo;{value.content}&rdquo;
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FOUNDER STORY */}
      <section className="bg-white py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-12 text-center">
              <Badge
                variant="outline"
                className="mb-4 border-blue-200 text-blue-600"
              >
                <Users className="mr-1.5 h-3.5 w-3.5" />
                Our Founder
              </Badge>
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Built by Someone Who&apos;s Been There
              </h2>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-white to-gray-50 p-8 shadow-lg sm:p-12">
              <div className="space-y-6 text-lg leading-relaxed text-gray-700">
                <p>
                  RenoNext was founded by Pavel Vysotckii, a{' '}
                  <span className="font-semibold text-gray-900">
                    BCIN-certified building designer
                  </span>{' '}
                  and{' '}
                  <span className="font-semibold text-gray-900">
                    Quantity Surveyor
                  </span>{' '}
                  who saw the broken trust chain in residential construction
                  firsthand.
                </p>

                <p>
                  Working with contractors, clients, and municipalities, Pavel
                  experienced the industry&apos;s fundamental problems: homeowners
                  handing over deposits and hoping for the best, contractors
                  struggling with cash flow and client disputes, and workers
                  waiting weeks for payment.
                </p>

                <p>
                  With expertise in permits, estimating, and construction
                  management, Pavel recognized that the solution wasn&apos;t
                  another lead generation platform. The industry needed a
                  financial and operational infrastructure that could enforce
                  accountability at every step.
                </p>

                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-3 text-center">
                    <Award className="mx-auto mb-2 h-6 w-6 text-blue-600" />
                    <p className="text-sm font-semibold text-blue-900">
                      Understands Permits
                    </p>
                  </div>
                  <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-center">
                    <TrendingUp className="mx-auto mb-2 h-6 w-6 text-emerald-600" />
                    <p className="text-sm font-semibold text-emerald-900">
                      Understands Estimates
                    </p>
                  </div>
                  <div className="rounded-lg border border-violet-200 bg-violet-50 px-4 py-3 text-center">
                    <Handshake className="mx-auto mb-2 h-6 w-6 text-violet-600" />
                    <p className="text-sm font-semibold text-violet-900">
                      Understands Trust Gaps
                    </p>
                  </div>
                </div>

                <p className="mt-8 text-xl font-semibold text-gray-900">
                  RenoNext was built to fix it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS BAR */}
      <section className="border-y border-gray-200 bg-white py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, i) => (
              <div key={i} className="text-center">
                <p className="bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-sm font-medium text-gray-600">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TEAM */}
      <section className="bg-gray-50 py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <Badge
              variant="outline"
              className="mb-4 border-emerald-200 text-emerald-600"
            >
              <Users className="mr-1.5 h-3.5 w-3.5" />
              The Team
            </Badge>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Building the Future of Construction
            </h2>
            <p className="mt-4 text-lg text-gray-500">
              A team united by one mission: making construction transparent and
              accountable.
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {teamRoles.map((member) => {
              const Icon = member.icon;
              return (
                <Card
                  key={member.role}
                  className="border-gray-200 bg-white shadow-md transition-shadow hover:shadow-lg"
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br ${member.gradient} shadow-lg`}
                    >
                      <Icon className="h-9 w-9 text-white" />
                    </div>
                    <h3 className="mb-1 text-lg font-bold text-gray-900">
                      {member.role}
                    </h3>
                    <p className="mb-3 text-sm font-medium text-gray-500">
                      {member.name}
                    </p>
                    <p className="text-sm leading-relaxed text-gray-600">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* INVESTORS/PARTNERS CTA */}
      <section className="relative overflow-hidden bg-gray-950 py-24">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.015)_1px,transparent_1px)] bg-[size:48px_48px]" />
        <div className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[100px]" />

        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <Badge className="mb-6 border-violet-500/30 bg-violet-500/10 text-violet-300 hover:bg-violet-500/10">
            <Handshake className="mr-1.5 h-3.5 w-3.5" />
            Partner With Us
          </Badge>

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Interested in Partnering or Investing?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-gray-400">
            We&apos;re building the infrastructure that will power the next
            generation of construction in Canada. Join us on this journey.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/contact">
              <Button
                size="lg"
                className="w-full bg-gradient-to-r from-violet-600 to-blue-600 text-white hover:from-violet-500 hover:to-blue-500 sm:w-auto"
              >
                <Mail className="mr-2 h-4 w-4" />
                Investor Inquiry
              </Button>
            </Link>
            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="w-full border-gray-700 bg-white/5 text-white hover:bg-white/10 sm:w-auto"
              >
                <Building2 className="mr-2 h-4 w-4" />
                Partner With Us
              </Button>
            </Link>
          </div>

          <div className="mt-12 inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-6 py-2.5">
            <p className="text-sm font-semibold text-emerald-300">
              Backed by industry expertise and technical excellence
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
