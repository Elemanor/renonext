import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'For Contractors — Scale Your Business with Absolute Certainty',
  description:
    'Join the only renovation platform where verified leads meet guaranteed escrow payments. No more chasing invoices. 24-hour payouts, high-intent leads, reduced fees.',
  alternates: {
    canonical: '/contractors',
  },
};

export default function ContractorsPage() {
  return (
    <div className="min-h-screen">
      {/* ===== Hero ===== */}
      <section className="relative px-6 pt-20 pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Copy */}
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary font-bold text-xs uppercase tracking-widest mb-6">
              <span
                className="material-symbols-outlined text-sm"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
              Verified Contractor Access
            </div>

            <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tighter leading-[1.1] text-reno-dark mb-8">
              Scale Your Business with{' '}
              <span className="text-primary">Absolute Certainty</span>
            </h1>

            <p className="text-xl text-slate-500 leading-relaxed mb-10 max-w-lg">
              Join the only renovation platform where verified leads meet
              guaranteed escrow payments. No more chasing invoices.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/join"
                className="bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl shadow-primary/30 hover:-translate-y-1 transition-all duration-300"
              >
                Join as a Pro
              </Link>
              <Link
                href="/how-it-works#vault"
                className="bg-white border-2 border-slate-200 text-reno-dark px-8 py-4 rounded-xl font-bold text-lg hover:border-primary/40 transition-all duration-300"
              >
                View Gold Perks
              </Link>
            </div>
          </div>

          {/* Right: Floating Cards */}
          <div className="relative h-[500px] hidden lg:block">
            {/* Background Glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-primary/10 blur-[100px] rounded-full" />

            {/* Contractor Tier Card */}
            <div className="absolute top-0 right-0 w-64 bg-white p-6 rounded-2xl shadow-float border border-primary/10 z-30">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-amber-500"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    stars
                  </span>
                </div>
                <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2 py-1 rounded">
                  GOLD LEVEL
                </span>
              </div>
              <p className="text-sm font-medium text-slate-500">
                Contractor Tier
              </p>
              <h4 className="text-2xl font-bold text-reno-dark">Gold Elite</h4>
            </div>

            {/* Recent Earnings Card */}
            <div className="absolute bottom-10 left-0 w-72 bg-reno-dark p-8 rounded-2xl shadow-2xl z-40">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-primary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    payments
                  </span>
                </div>
                <p className="text-slate-400 font-medium">Recent Earnings</p>
              </div>
              <div className="text-4xl font-bold text-white mb-2 tracking-tight">
                $42,850.00
              </div>
              <div className="flex items-center gap-2 text-primary text-sm font-bold">
                <span className="material-symbols-outlined text-sm">
                  trending_up
                </span>
                +12.5% this month
              </div>
            </div>

            {/* Verified Badge Card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/4 -translate-y-1/2 bg-white/60 backdrop-blur-md p-5 rounded-2xl border border-white shadow-xl z-20 w-48 text-center">
              <div className="w-16 h-16 bg-primary rounded-full mx-auto flex items-center justify-center mb-4 shadow-lg shadow-primary/40">
                <span
                  className="material-symbols-outlined text-white text-3xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  verified_user
                </span>
              </div>
              <p className="font-bold text-reno-dark">Verified Pro</p>
              <p className="text-xs text-slate-500">Background Checked</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== The Pro Advantage ===== */}
      <section className="bg-[#f6f8f8] py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-reno-dark mb-4">
              The Pro Advantage
            </h2>
            <div className="h-1.5 w-24 bg-primary mx-auto rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Guaranteed Payments */}
            <div className="group bg-white p-10 rounded-2xl shadow-float hover:shadow-float-hover hover:-translate-y-1 transition-all duration-500">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary transition-colors duration-300">
                <span
                  className="material-symbols-outlined text-primary group-hover:text-white transition-colors text-2xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  shield_with_heart
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold text-reno-dark mb-4">
                Guaranteed Payments
              </h3>
              <p className="text-slate-500 leading-relaxed">
                Funds are secured in RenoNext Escrow before you start. Automatic
                release upon milestone approval ensures zero payment friction.
              </p>
            </div>

            {/* High-Intent Leads */}
            <div className="group bg-white p-10 rounded-2xl shadow-float hover:shadow-float-hover hover:-translate-y-1 transition-all duration-500">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary transition-colors duration-300">
                <span
                  className="material-symbols-outlined text-primary group-hover:text-white transition-colors text-2xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  target
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold text-reno-dark mb-4">
                High-Intent Leads
              </h3>
              <p className="text-slate-500 leading-relaxed">
                Stop wasting time on &ldquo;just looking.&rdquo; Every project
                is vetted for budget, timeline, and architectural feasibility
                before it hits your dashboard.
              </p>
            </div>

            {/* Reduced Fees */}
            <div className="group bg-white p-10 rounded-2xl shadow-float hover:shadow-float-hover hover:-translate-y-1 transition-all duration-500">
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:bg-primary transition-colors duration-300">
                <span
                  className="material-symbols-outlined text-primary group-hover:text-white transition-colors text-2xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  percent
                </span>
              </div>
              <h3 className="font-display text-2xl font-bold text-reno-dark mb-4">
                Reduced Fees
              </h3>
              <p className="text-slate-500 leading-relaxed">
                Our Gold Tier contractors enjoy industry-low 1.5% transaction
                fees, letting you keep more of your hard-earned revenue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Built for the Transparent Guardian ===== */}
      <section className="py-28 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          {/* Left: Dashboard Visual */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl border border-slate-200 bg-white shadow-2xl overflow-hidden p-6 aspect-[4/3]">
              {/* Window chrome */}
              <div className="flex items-center gap-2 mb-8 border-b border-[#f6f8f8] pb-4">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-primary" />
                <div className="ml-4 h-4 w-40 bg-[#f6f8f8] rounded" />
              </div>
              {/* Dashboard skeleton */}
              <div className="grid grid-cols-4 gap-4 mb-8">
                <div className="h-20 bg-[#f6f8f8] rounded-xl" />
                <div className="h-20 bg-[#f6f8f8] rounded-xl" />
                <div className="h-20 bg-[#f6f8f8] rounded-xl" />
                <div className="h-20 bg-primary/10 rounded-xl" />
              </div>
              <div className="space-y-4">
                <div className="h-4 w-full bg-[#f6f8f8] rounded" />
                <div className="h-4 w-3/4 bg-[#f6f8f8] rounded" />
                <div className="h-4 w-1/2 bg-[#f6f8f8] rounded" />
              </div>

              {/* Floating Milestone Card */}
              <div className="absolute top-1/2 right-6 translate-y-4 bg-white p-4 rounded-xl shadow-2xl border-l-4 border-primary w-64 rotate-2">
                <div className="flex items-center gap-3 mb-2">
                  <span
                    className="material-symbols-outlined text-primary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-tighter">
                    Milestone Reached
                  </span>
                </div>
                <p className="text-sm font-bold text-reno-dark">
                  Foundation Complete
                </p>
                <div className="mt-2 flex justify-between items-center">
                  <span className="text-xs text-slate-500">
                    Payment Processing
                  </span>
                  <span className="text-xs font-bold text-primary">
                    $12,000.00
                  </span>
                </div>
              </div>

              {/* Floating Lead Card */}
              <div className="absolute bottom-8 left-6 bg-reno-dark p-4 rounded-xl shadow-2xl w-56 -rotate-1">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                    <span className="material-symbols-outlined text-primary text-sm">
                      mail
                    </span>
                  </div>
                  <span className="text-xs font-medium text-slate-400">
                    New High-Intent Lead
                  </span>
                </div>
                <p className="text-white text-sm font-bold">
                  Modern Loft Remodel
                </p>
                <p className="text-[10px] text-slate-500">
                  Budget: $150k &ndash; $200k
                </p>
              </div>
            </div>
          </div>

          {/* Right: Copy + Checklist */}
          <div className="order-1 lg:order-2">
            <h2 className="font-display text-4xl md:text-5xl font-extrabold tracking-tight text-reno-dark mb-8">
              Built for the{' '}
              <span className="text-primary">Transparent Guardian</span>
            </h2>
            <p className="text-lg text-slate-500 mb-12 leading-relaxed">
              The RenoNext dashboard is your command center. It provides total
              transparency for both you and your client, tracking every milestone
              from demolition to final walkthrough.
            </p>

            <ul className="space-y-6">
              {[
                {
                  title: 'Real-time Financial Tracking',
                  desc: 'See exactly where your money is at every stage of the project.',
                },
                {
                  title: 'Automated Compliance',
                  desc: 'Insurance and permit tracking built right into the workflow.',
                },
                {
                  title: 'Client Direct Messaging',
                  desc: 'Secure, logged communications to prevent project scope creep.',
                },
              ].map((item) => (
                <li key={item.title} className="flex items-start gap-4">
                  <div className="mt-1 w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                    <span
                      className="material-symbols-outlined text-primary text-sm"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      done
                    </span>
                  </div>
                  <div>
                    <h4 className="font-bold text-reno-dark">{item.title}</h4>
                    <p className="text-sm text-slate-500">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ===== DrySpace Testimonial ===== */}
      <section className="bg-[#e9efef] py-28 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-xl flex flex-col md:flex-row gap-12 items-center">
            {/* Image Grid */}
            <div className="w-full md:w-1/3">
              <div className="grid grid-cols-2 gap-2 rounded-2xl overflow-hidden shadow-lg aspect-square">
                <div className="relative">
                  <Image
                    src="/images/pros/dryspace/crack-repair.webp"
                    alt="Before: Foundation crack requiring waterproofing"
                    fill
                    className="object-cover"
                    sizes="150px"
                  />
                </div>
                <div className="relative">
                  <Image
                    src="/images/pros/dryspace/interior.webp"
                    alt="After: Completed waterproofed basement interior"
                    fill
                    className="object-cover"
                    sizes="150px"
                  />
                </div>
                <div className="relative">
                  <Image
                    src="/images/pros/dryspace/membrane.webp"
                    alt="Waterproof membrane installation"
                    fill
                    className="object-cover"
                    sizes="150px"
                  />
                </div>
                <div className="relative">
                  <Image
                    src="/images/pros/dryspace/exterior-2.webp"
                    alt="Exterior excavation and waterproofing"
                    fill
                    className="object-cover"
                    sizes="150px"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center px-2">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  Case Study: DrySpace
                </span>
                <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                  Basement Specialist
                </span>
              </div>
            </div>

            {/* Quote */}
            <div className="w-full md:w-2/3">
              <div className="flex gap-1 text-amber-400 mb-6">
                {[...Array(5)].map((_, i) => (
                  <span
                    key={i}
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                ))}
              </div>
              <blockquote className="text-2xl font-medium italic text-reno-dark mb-8 leading-relaxed">
                &ldquo;RenoNext solved our biggest headache: the 60-day payment
                cycle. Now we get paid as soon as the waterproof membrane is
                inspected. It changed our cash flow overnight.&rdquo;
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
                  <Image
                    src="/images/pros/dryspace/hero.webp"
                    alt="DrySpace Waterproofing"
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-bold text-reno-dark">
                    DrySpace Waterproofing
                  </p>
                  <p className="text-sm text-slate-500">
                    Sub-Grade Waterproofing Specialist, GTA
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Final CTA ===== */}
      <section className="py-28 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-display text-4xl md:text-6xl font-extrabold text-reno-dark mb-8 tracking-tighter">
            Ready to Elevate Your Craft?
          </h2>
          <p className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto">
            Take the first step toward a more professional, more profitable
            renovation business. Verification takes less than 5 minutes.
          </p>

          <div className="flex flex-col items-center gap-8">
            <Link
              href="/join"
              className="bg-primary text-white px-12 py-5 rounded-2xl font-bold text-xl shadow-2xl shadow-primary/30 hover:-translate-y-1 transition-all duration-300"
            >
              Start Your Application
            </Link>

            <div className="flex flex-wrap justify-center gap-8 opacity-60">
              {[
                { icon: 'verified', label: 'ISO Certified' },
                { icon: 'encrypted', label: 'Bank-Grade Security' },
                { icon: 'gavel', label: 'Escrow Protected' },
              ].map((badge) => (
                <div
                  key={badge.label}
                  className="flex items-center gap-2"
                >
                  <span
                    className="material-symbols-outlined text-primary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {badge.icon}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-widest text-reno-dark">
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
