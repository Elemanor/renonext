import { Metadata } from 'next';
import Link from 'next/link';
import { Search, Rocket, CreditCard, Briefcase, Settings, Shield, MessageCircle, Mail } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'Help Centre | RenoNext',
  description: 'Find answers to common questions about RenoNext. Get help with payments, project management, and more.',
};

const categories = [
  {
    icon: Rocket,
    title: 'Getting Started',
    count: '8 articles',
    color: 'text-blue-600 bg-blue-50',
  },
  {
    icon: CreditCard,
    title: 'Payments & Escrow',
    count: '12 articles',
    color: 'text-emerald-600 bg-emerald-50',
  },
  {
    icon: Briefcase,
    title: 'For Pros',
    count: '10 articles',
    color: 'text-violet-600 bg-violet-50',
  },
  {
    icon: Settings,
    title: 'Account & Settings',
    count: '6 articles',
    color: 'text-amber-600 bg-amber-50',
  },
  {
    icon: Shield,
    title: 'Trust & Safety',
    count: '9 articles',
    color: 'text-red-600 bg-red-50',
  },
];

const faqs = [
  {
    question: 'How does RenoNext work?',
    answer: 'RenoNext connects homeowners with verified construction professionals. Post a job with your requirements, receive proposals from qualified pros, review their credentials and past work, then hire with confidence. All payments are held securely in escrow until work is completed to your satisfaction.',
  },
  {
    question: 'Is my money safe with RenoNext?',
    answer: 'Yes. All payments are held in the RenoNext Safe, our secure escrow system. Funds are only released to the contractor when you approve completed milestones. If disputes arise, our mediation team ensures fair resolution for all parties.',
  },
  {
    question: 'How do I post a job?',
    answer: 'Click "Post a Job" in the header, describe your project requirements, upload any relevant photos or documents, and set your budget and timeline. Verified pros in your area will receive your posting and can submit proposals within 24-48 hours.',
  },
  {
    question: 'How are pros verified?',
    answer: 'All pros undergo a comprehensive verification process including license validation, insurance confirmation, background checks, and reference verification. Pros with BCIN certification receive additional badges for building code expertise.',
  },
  {
    question: 'What is the RenoNext Safe (escrow)?',
    answer: 'The RenoNext Safe is our escrow service that holds your payment securely until work is completed. When you accept a proposal, you fund the project milestones upfront. Funds are released to the contractor only when you approve each milestone, protecting both parties throughout the project.',
  },
  {
    question: 'How do milestone payments work?',
    answer: 'Projects are divided into milestones based on the scope of work. You fund all milestones upfront into escrow, and as your contractor completes each phase, you review and approve the work. Once approved, that milestone payment is released from escrow to the contractor.',
  },
  {
    question: 'What happens if I\'m not satisfied with the work?',
    answer: 'You have the right to dispute any milestone before approving payment. Our mediation team will review the work, consult both parties, and facilitate a resolution. Payments remain in escrow until the issue is resolved fairly.',
  },
  {
    question: 'How do I become a pro on RenoNext?',
    answer: 'Click "Sign Up as a Pro" and complete our verification process. You\'ll need to provide your business license, insurance documentation, and professional references. Once verified, you can start bidding on projects in your trade areas.',
  },
  {
    question: 'What fees does RenoNext charge?',
    answer: 'For homeowners, posting jobs and accepting proposals is free. We charge a small platform fee on funded projects to cover escrow services and payment processing. Contractors pay a small fee on accepted proposals and completed milestones. All fees are clearly disclosed before any transaction.',
  },
  {
    question: 'Can I cancel a job after posting?',
    answer: 'Yes, you can cancel a job posting at any time before accepting a proposal at no cost. Once you accept a proposal and fund the escrow, cancellation terms are governed by your contract with the professional and may include cancellation fees as outlined in the proposal.',
  },
  {
    question: 'How do I leave a review?',
    answer: 'After a project is completed and all milestones are paid, you\'ll receive a prompt to review your experience. Your honest feedback helps other homeowners make informed decisions and helps pros build their reputation on the platform.',
  },
  {
    question: 'What is BCIN and why does it matter?',
    answer: 'BCIN (Building Code Identification Number) is Ontario\'s certification system for construction professionals demonstrating expertise in building code compliance. Pros with BCIN certification have proven knowledge of structural, HVAC, plumbing, or other specialized building systems, ensuring work meets all safety and regulatory standards.',
  },
];

export default function HelpPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-reno-green-dark via-reno-green to-blue-500 py-20 md:py-28">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-bold text-white md:text-5xl lg:text-6xl">
              How Can We Help?
            </h1>
            <p className="mb-8 text-lg text-white/90 md:text-xl">
              Find answers to common questions or reach out to our support team.
            </p>

            {/* Decorative Search Bar */}
            <div className="relative mx-auto max-w-2xl">
              <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <Input
                type="text"
                placeholder="Search for answers..."
                className="h-14 w-full rounded-xl border-0 bg-white pl-12 pr-4 text-base shadow-lg ring-0 placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-white/50"
                disabled
              />
            </div>
          </div>
        </div>
      </section>

      {/* Category Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <Card
                  key={category.title}
                  className="group cursor-pointer transition-shadow hover:shadow-lg"
                >
                  <CardContent className="flex flex-col items-center p-6 text-center">
                    <div className={`mb-4 rounded-full p-4 ${category.color} transition-transform group-hover:scale-110`}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mb-2 text-lg font-semibold text-slate-900">
                      {category.title}
                    </h3>
                    <Badge variant="secondary" className="text-sm">
                      {category.count}
                    </Badge>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-slate-50 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl">
            <h2 className="mb-8 text-center text-3xl font-bold text-slate-900 md:text-4xl">
              Frequently Asked Questions
            </h2>

            <Card className="bg-white">
              <CardContent className="p-6">
                <Accordion type="single" collapsible className="w-full">
                  {faqs.map((faq, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left text-base font-medium text-slate-900 hover:text-reno-green-dark">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-slate-600">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <Card className="mx-auto max-w-3xl border-2 border-reno-green-light bg-gradient-to-br from-reno-green-light to-blue-50">
            <CardContent className="p-8 text-center md:p-12">
              <div className="mb-6 flex justify-center">
                <div className="rounded-full bg-reno-green-light p-4">
                  <MessageCircle className="h-8 w-8 text-reno-green-dark" />
                </div>
              </div>
              <h2 className="mb-4 text-2xl font-bold text-slate-900 md:text-3xl">
                Still need help?
              </h2>
              <p className="mb-8 text-lg text-slate-600">
                Can't find what you're looking for? Our support team is here to help.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Button asChild size="lg" className="gap-2">
                  <Link href="/contact">
                    <MessageCircle className="h-5 w-5" />
                    Contact Support
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="gap-2">
                  <a href="mailto:support@renonext.com">
                    <Mail className="h-5 w-5" />
                    Email Us
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}
