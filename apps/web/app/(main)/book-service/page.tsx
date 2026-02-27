import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Wrench,
  Zap,
  Paintbrush,
  Trees,
  Hammer,
  Sparkles,
  Truck,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Book a Service | RenoNext',
  description: 'Choose a service category and get matched with verified local pros in minutes.',
};

const services = [
  {
    slug: 'plumbing',
    title: 'Plumbing',
    description: 'Repairs, installations & emergencies',
    icon: Wrench,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
  },
  {
    slug: 'electrical',
    title: 'Electrical',
    description: 'Wiring, panels & smart home',
    icon: Zap,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-600',
  },
  {
    slug: 'painting',
    title: 'Painting',
    description: 'Interior & exterior painting',
    icon: Paintbrush,
    iconBg: 'bg-rose-100',
    iconColor: 'text-rose-600',
  },
  {
    slug: 'landscaping',
    title: 'Landscaping',
    description: 'Lawns, gardens & outdoor',
    icon: Trees,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
  },
  {
    slug: 'carpentry',
    title: 'Carpentry',
    description: 'Custom builds & woodwork',
    icon: Hammer,
    iconBg: 'bg-orange-100',
    iconColor: 'text-orange-600',
  },
  {
    slug: 'cleaning',
    title: 'Cleaning',
    description: 'Deep clean & maintenance',
    icon: Sparkles,
    iconBg: 'bg-cyan-100',
    iconColor: 'text-cyan-600',
  },
  {
    slug: 'moving',
    title: 'Moving',
    description: 'Local & long-distance moves',
    icon: Truck,
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-600',
  },
  {
    slug: 'general-repair',
    title: 'General Repair',
    description: 'Handyman & maintenance',
    icon: Wrench,
    iconBg: 'bg-slate-100',
    iconColor: 'text-slate-600',
  },
];

export default function BookServicePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-12">
          {/* Breadcrumb */}
          <nav className="text-sm text-slate-600 mb-6">
            <Link href="/" className="hover:text-slate-900">
              Home
            </Link>
            <span className="mx-2">/</span>
            <span className="text-slate-900">Services</span>
          </nav>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            What Do You Need Help With?
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Choose a category and get matched with verified local pros in minutes.
          </p>
        </div>
      </section>

      {/* Service Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <Link
                  key={service.slug}
                  href={`/post-job?category=${service.slug}`}
                  className="group"
                >
                  <Card className="h-full hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
                    <CardContent className="p-6">
                      {/* Icon Circle */}
                      <div className={`w-12 h-12 rounded-full ${service.iconBg} ${service.iconColor} flex items-center justify-center mb-4`}>
                        <Icon className="w-6 h-6" />
                      </div>

                      {/* Title */}
                      <h3 className="text-lg font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {service.title}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-slate-600 mb-4">
                        {service.description}
                      </p>

                      {/* Arrow Indicator */}
                      <div className="flex items-center text-blue-600 text-sm font-medium">
                        <span className="mr-1">View details</span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Bottom CTA Section */}
      <section className="py-16 bg-white border-t">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-3">
            Need something else?
          </h2>
          <p className="text-slate-600 mb-6 max-w-xl mx-auto">
            Don&apos;t see your service? Post a custom job and describe exactly what you need.
          </p>
          <Button asChild size="lg">
            <Link href="/post-job">Post a Custom Job</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
