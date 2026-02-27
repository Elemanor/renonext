import type { Metadata } from "next";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Zap,
  Shield,
  Hammer,
  Layers,
  CheckCircle,
  ArrowRight
} from "lucide-react";

export const metadata: Metadata = {
  title: "Careers | RenoNext",
  description: "Join a team that's reimagining how construction works in Canada — from permits to payments.",
};

const CULTURE_VALUES = [
  {
    icon: Zap,
    title: "Move Fast, Build Right",
    description: "We ship weekly and iterate based on real contractor feedback.",
    color: "text-blue-600 bg-blue-50",
  },
  {
    icon: Shield,
    title: "Trust is Everything",
    description: "We handle people's money and livelihoods. We take that seriously.",
    color: "text-emerald-600 bg-emerald-50",
  },
  {
    icon: Hammer,
    title: "Builder Mentality",
    description: "Everyone here builds. No spectators.",
    color: "text-violet-600 bg-violet-50",
  },
  {
    icon: Layers,
    title: "Think in Systems",
    description: "We solve root causes, not symptoms.",
    color: "text-amber-600 bg-amber-50",
  },
];

const OPEN_POSITIONS = [
  {
    title: "Full-Stack Engineer",
    department: "Engineering",
    location: "Remote",
    description: "Build the platform that moves millions through construction.",
  },
  {
    title: "Product Designer",
    department: "Design",
    location: "Toronto, ON",
    description: "Design trust into every pixel of the homeowner and contractor experience.",
  },
  {
    title: "Operations Lead",
    department: "Operations",
    location: "Toronto, ON",
    description: "Manage the logistics that connect pros, materials, and homeowners.",
  },
  {
    title: "Sales Development Rep",
    department: "Growth",
    location: "Remote",
    description: "Help contractors discover a better way to run their business.",
  },
];

const BENEFITS = [
  "Competitive salary + equity",
  "Remote-friendly (Toronto HQ)",
  "Health & dental benefits",
  "Learning budget ($1,500/year)",
  "Flexible hours",
  "Build something that matters",
];

export default function CareersPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
              We&apos;re Hiring
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
              Build the Future of Construction Tech
            </h1>
            <p className="text-xl text-slate-300">
              Join a team that&apos;s reimagining how construction works in Canada — from permits to payments.
            </p>
          </div>
        </div>
      </section>

      {/* Culture Values */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {CULTURE_VALUES.map((value) => {
              const Icon = value.icon;
              return (
                <Card key={value.title}>
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className={`rounded-full p-3 ${value.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold">{value.title}</h3>
                        <p className="text-sm text-slate-600">{value.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">Open Positions</h2>
            </div>

            <div className="grid gap-6">
              {OPEN_POSITIONS.map((position) => (
                <Card key={position.title} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <h3 className="text-xl font-semibold">{position.title}</h3>
                          <div className="flex gap-2">
                            <Badge variant="outline">{position.department}</Badge>
                            <Badge variant="outline" className="text-slate-600">
                              {position.location}
                            </Badge>
                          </div>
                        </div>
                        <p className="text-sm text-slate-600">{position.description}</p>
                      </div>
                      <Button asChild className="md:shrink-0">
                        <Link href="mailto:careers@renonext.com">
                          Apply
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tight">What We Offer</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {BENEFITS.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-emerald-600 shrink-0 mt-0.5" />
                  <p className="text-slate-700">{benefit}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-16 md:py-24 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <div className="space-y-3">
              <h2 className="text-2xl font-bold tracking-tight">Don&apos;t see your role?</h2>
              <p className="text-slate-600">
                Send us your resume at careers@renonext.com — we&apos;re always looking for exceptional people.
              </p>
            </div>
            <Button size="lg" asChild>
              <Link href="mailto:careers@renonext.com">
                Send Your Resume
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
