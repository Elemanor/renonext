'use client';

import Link from 'next/link';
import {
  PartyPopper,
  FileSearch,
  ShieldCheck,
  CheckCircle,
  ArrowRight,
  Home,
  Sparkles,
  Clock,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GradientIcon } from '@/components/landing/_shared/gradient-icon';
import { ScrollReveal } from '@/components/landing/_animations/scroll-reveal';

const timeline = [
  {
    icon: FileSearch,
    title: 'Document Verification',
    desc: 'Our team verifies your license, insurance, and WSIB documentation.',
    time: '1-2 business days',
    gradient: 'from-blue-400 to-blue-600',
  },
  {
    icon: ShieldCheck,
    title: 'Application Review',
    desc: 'A RenoNext admin reviews your profile, experience, and credentials.',
    time: '2-3 business days',
    gradient: 'from-violet-400 to-violet-600',
  },
  {
    icon: CheckCircle,
    title: 'Approval & Activation',
    desc: 'Once approved, your profile goes live and you can start receiving jobs.',
    time: 'Instant after approval',
    gradient: 'from-emerald-400 to-emerald-600',
  },
];

const stats = [
  { icon: Clock, label: 'Avg. Review Time', value: '2 days', color: 'text-blue-600' },
  { icon: CheckCircle, label: 'Approval Rate', value: '82%', color: 'text-emerald-600' },
  { icon: Zap, label: 'First Job', value: '<1 week', color: 'text-violet-600' },
];

export default function JoinSuccessPage() {
  return (
    <div className="min-h-[80vh] relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-white to-blue-50/50" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[800px] h-[800px] rounded-full bg-emerald-100/30 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-blue-100/20 blur-3xl" />
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxIiBmaWxsPSJyZ2JhKDAsMCwwLDAuMDMpIi8+PC9zdmc+')] opacity-60" />

      {/* Confetti-like decorative elements */}
      <div className="absolute top-20 left-[15%] w-3 h-3 rounded-full bg-emerald-400/30 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }} />
      <div className="absolute top-32 right-[20%] w-2 h-2 rounded-full bg-blue-400/30 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '2.5s' }} />
      <div className="absolute top-16 right-[35%] w-4 h-4 rounded-full bg-violet-400/20 animate-bounce" style={{ animationDelay: '1s', animationDuration: '3.5s' }} />
      <div className="absolute top-40 left-[25%] w-2 h-2 rounded-full bg-reno-green/25 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '2.8s' }} />
      <div className="absolute top-24 left-[60%] w-3 h-3 rounded-full bg-reno-teal/20 animate-bounce" style={{ animationDelay: '0.8s', animationDuration: '3.2s' }} />

      <div className="relative container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-2xl mx-auto">
          {/* Celebration Header */}
          <ScrollReveal>
            <div className="text-center">
              <div className="mb-6 inline-flex">
                <GradientIcon
                  icon={PartyPopper}
                  gradient="from-emerald-400 to-blue-600"
                  size="lg"
                  glow
                />
              </div>

              <Badge className="mb-4 inline-flex items-center gap-2 rounded-full border-emerald-200 bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-700">
                <Sparkles className="h-4 w-4" />
                Application Submitted
              </Badge>

              <h1 className="text-3xl font-bold text-gray-900 md:text-4xl lg:text-5xl">
                You&apos;re on your way!
              </h1>
              <p className="mt-4 text-lg text-gray-600 max-w-lg mx-auto leading-relaxed">
                Thank you for applying to join the RenoNext network. We&apos;re reviewing your
                application and will notify you by email.
              </p>
            </div>
          </ScrollReveal>

          {/* Quick Stats */}
          <ScrollReveal delay={0.15}>
            <div className="grid grid-cols-3 gap-4 mt-10 mb-12">
              {stats.map((stat) => (
                <Card key={stat.label} className="border-gray-200/60 shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-4 text-center">
                    <stat.icon className={`h-5 w-5 mx-auto mb-2 ${stat.color}`} />
                    <p className="text-xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-gray-500 mt-0.5">{stat.label}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollReveal>

          {/* What Happens Next - Timeline */}
          <ScrollReveal delay={0.25}>
            <Card className="border-gray-200/60 shadow-xl shadow-gray-200/50 overflow-hidden">
              <div className="h-1 w-full bg-gradient-to-r from-emerald-500 via-blue-500 to-violet-500" />
              <CardContent className="p-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-8 text-center">
                  What happens next
                </h2>
                <div className="space-y-0">
                  {timeline.map((step, idx) => (
                    <div key={step.title} className="relative flex gap-5 pb-8 last:pb-0">
                      {/* Animated connector line */}
                      {idx < timeline.length - 1 && (
                        <div className="absolute left-6 top-14 bottom-0 w-0.5">
                          <div className="h-full w-full bg-gradient-to-b from-gray-200 to-gray-100 rounded-full" />
                        </div>
                      )}
                      <div className="shrink-0">
                        <GradientIcon
                          icon={step.icon}
                          gradient={step.gradient}
                          size="sm"
                          glow
                        />
                      </div>
                      <div className="pt-1.5">
                        <h3 className="font-semibold text-gray-900 text-base">{step.title}</h3>
                        <p className="mt-1 text-sm text-gray-600 leading-relaxed">{step.desc}</p>
                        <Badge
                          variant="outline"
                          className="mt-2 rounded-full text-xs font-medium border-gray-200 text-gray-500"
                        >
                          <Clock className="h-3 w-3 mr-1" />
                          {step.time}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </ScrollReveal>

          {/* Actions */}
          <ScrollReveal delay={0.35}>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="rounded-xl bg-gradient-to-r from-reno-green-dark to-reno-green hover:from-reno-green-dark hover:to-reno-green-dark text-white shadow-lg shadow-reno-green-dark/25 hover:shadow-xl transition-all duration-300"
              >
                <Link href="/">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-xl">
                <Link href="/pro-dashboard">
                  Go to Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </div>
  );
}
