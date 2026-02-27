import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function ManagedProjectsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl md:text-6xl">
            Let Us Handle Everything
          </h1>
          <p className="mt-6 text-xl text-slate-600 max-w-3xl mx-auto">
            From planning to completion, RenoNext manages your entire project.
            We assign expert contractors, handle all coordination, and keep you
            informed every step of the way.
          </p>
          <div className="mt-10">
            <Button asChild size="lg" className="bg-reno-green-dark hover:bg-reno-green-dark">
              <Link href="/managed/request">Request Managed Project</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Value Props */}
      <section className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <svg
                className="w-12 h-12 text-reno-green-dark"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Expert Project Management
            </h3>
            <p className="text-slate-600">
              Dedicated project managers with decades of construction experience
              oversee every detail.
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <svg
                className="w-12 h-12 text-reno-green-dark"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Vetted Contractors
            </h3>
            <p className="text-slate-600">
              Work with pre-screened, licensed professionals from our trusted
              network.
            </p>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="flex justify-center mb-4">
              <svg
                className="w-12 h-12 text-reno-green-dark"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Full Transparency
            </h3>
            <p className="text-slate-600">
              Real-time updates, detailed reports, and complete visibility into
              your project.
            </p>
          </Card>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8 bg-slate-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-slate-900">How It Works</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-reno-green-dark text-white flex items-center justify-center text-2xl font-bold">
                1
              </div>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Submit Request
            </h3>
            <p className="text-slate-600">
              Tell us about your project needs, timeline, and budget.
            </p>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-reno-green-dark text-white flex items-center justify-center text-2xl font-bold">
                2
              </div>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Get Matched
            </h3>
            <p className="text-slate-600">
              We review your request and assign the best contractor for your
              project.
            </p>
          </div>

          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-full bg-reno-green-dark text-white flex items-center justify-center text-2xl font-bold">
                3
              </div>
            </div>
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              Track Progress
            </h3>
            <p className="text-slate-600">
              Monitor your project with daily updates and milestone reports.
            </p>
          </div>
        </div>
      </section>

      {/* Pricing & CTA */}
      <section className="px-4 py-16 mx-auto max-w-7xl sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Ready to Get Started?
        </h2>
        <p className="text-xl text-slate-600 mb-2">
          Submit your project request today and let us handle the rest.
        </p>
        <p className="text-sm text-slate-500 mb-8">
          Starting from 30% management fee
        </p>
        <Button asChild size="lg" className="bg-reno-green-dark hover:bg-reno-green-dark">
          <Link href="/managed/request">Request Managed Project</Link>
        </Button>
      </section>
    </div>
  );
}
