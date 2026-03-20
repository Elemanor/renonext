import Link from 'next/link';
import Image from 'next/image';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'For Homeowners | RenoNext',
  description:
    'Renovate with absolute certainty. Escrow-backed payments, vetted contractors, and real-time milestone tracking protect every dollar.',
};

export default function HomeownersPage() {
  return (
    <div className="min-h-screen">
      {/* ============================================= */}
      {/* HERO — Renovate with Absolute Certainty       */}
      {/* ============================================= */}
      <section className="relative min-h-[680px] lg:min-h-[780px] flex items-center overflow-hidden bg-[#f6f8f8]">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(15,186,189,0.06),transparent_60%)]" />

        <div className="relative z-10 max-w-7xl mx-auto w-full px-6 py-24 lg:py-32 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — Copy */}
          <div className="max-w-xl">
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-black text-reno-dark tracking-tight leading-[1.08] mb-6">
              Renovate with{' '}
              <br />
              <span className="text-primary">Absolute Certainty</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-500 leading-relaxed mb-10 max-w-lg">
              The RenoNext escrow-backed platform ensures your renovation funds
              are protected. We only release payments to contractors when
              milestones are met and you approve the work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/price-check"
                className="inline-flex items-center justify-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-bold text-lg shadow-float hover:-translate-y-0.5 hover:shadow-float-hover active:scale-[0.98] transition-all duration-200"
              >
                Start Your Project
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center justify-center gap-2 bg-white border border-gray-200 px-8 py-4 rounded-xl font-bold text-lg text-reno-dark hover:bg-gray-50 transition-colors"
              >
                View Protected Projects
              </Link>
            </div>
          </div>

          {/* Right — Floating UI Cards (desktop) */}
          <div className="relative hidden lg:block h-[500px]">
            {/* Escrow Card */}
            <div className="absolute top-8 right-8 w-72 p-6 rounded-2xl bg-white/80 backdrop-blur-xl shadow-float border border-primary/5 z-20 hover:-translate-y-1 hover:shadow-float-hover transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    account_balance_wallet
                  </span>
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-gray-400">
                  Escrow Secured
                </span>
              </div>
              <p className="text-gray-500 text-sm font-medium">
                Project Balance
              </p>
              <h3 className="text-3xl font-bold text-reno-dark tracking-tight">
                $45,000.00
              </h3>
              <div className="mt-3 h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-2/3 rounded-full" />
              </div>
              <p className="mt-2 text-xs text-gray-400 text-right">
                Phase 2 of 4
              </p>
            </div>

            {/* Contractor Card */}
            <div className="absolute bottom-16 left-0 w-80 p-5 rounded-2xl bg-white shadow-float z-30 hover:-translate-y-1 hover:shadow-float-hover transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100">
                  <Image
                    src="/images/pros/dryspace/hero.webp"
                    alt="DrySpace Waterproofing"
                    width={56}
                    height={56}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-bold text-reno-dark">
                    DrySpace Waterproofing
                  </h4>
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className="material-symbols-outlined text-xs"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                    ))}
                    <span className="text-gray-400 text-xs font-medium ml-1">
                      5.0
                    </span>
                  </div>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className="material-symbols-outlined text-primary text-lg"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified
                  </span>
                  <span className="text-xs font-bold text-gray-600 uppercase">
                    Verified Pro
                  </span>
                </div>
                <span className="px-2 py-1 rounded bg-amber-50 text-amber-600 text-[10px] font-black uppercase">
                  Gold Badge
                </span>
              </div>
            </div>

            {/* Milestone Card (blurred, background) */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 p-4 rounded-2xl bg-white/60 backdrop-blur-sm border border-primary/10 shadow-float z-10 scale-90 opacity-70">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-primary text-lg">
                  photo_camera
                </span>
                <span className="text-sm font-bold text-reno-dark">
                  Foundation Waterproofing
                </span>
              </div>
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                <Image
                  src="/images/pros/dryspace/exterior-1.webp"
                  alt="Waterproofing progress"
                  width={240}
                  height={135}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="mt-2 text-xs text-center font-medium text-gray-400">
                Awaiting Homeowner Approval
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* BENEFITS — Built on Trust                     */}
      {/* ============================================= */}
      <section className="py-20 md:py-28 px-6 bg-[#f6f8f8]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="font-display text-3xl md:text-4xl font-black text-reno-dark tracking-tight mb-4">
              Built on Trust, Delivered with Precision
            </h2>
            <p className="text-gray-500 text-lg">
              We&apos;ve redesigned the renovation experience to prioritize
              homeowner safety and contractor accountability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: 'shield_with_heart',
                title: 'Escrow Vault',
                desc: 'Your funds are held safely in a secure escrow account and only released when you approve the completed milestone.',
              },
              {
                icon: 'verified_user',
                title: 'Vetted Pros',
                desc: 'Only the top 5% of contractors pass our audit — license checks, insurance verification, WSIB, and identity confirmed.',
              },
              {
                icon: 'query_stats',
                title: 'Milestone Tracking',
                desc: 'Track progress in real-time with photo proof and time-stamped logs for every project phase.',
              },
            ].map((card) => (
              <div
                key={card.title}
                className="p-8 md:p-10 rounded-2xl bg-white shadow-float hover:-translate-y-1 hover:shadow-float-hover transition-all duration-300 group"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary mb-7 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <span
                    className="material-symbols-outlined text-3xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {card.icon}
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-reno-dark mb-3 tracking-tight">
                  {card.title}
                </h3>
                <p className="text-gray-500 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* HOW IT WORKS — 4 Steps                        */}
      {/* ============================================= */}
      <section className="py-20 md:py-28 px-6 bg-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -mr-48 -mt-48 pointer-events-none" />

        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="font-display text-3xl md:text-4xl font-black text-reno-dark tracking-tight text-center mb-16 md:mb-20">
            How it Works for Homeowners
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
            {[
              {
                num: '1',
                title: 'Define Project',
                desc: 'Outline your vision and budget. Our project advisors help you refine the scope for accurate bidding.',
              },
              {
                num: '2',
                title: 'Get Vetted Bids',
                desc: 'Receive detailed proposals from pre-screened contractors who specialize in your specific project type.',
              },
              {
                num: '3',
                title: 'Fund Escrow',
                desc: 'Deposit your project funds into the secure RenoNext vault. You retain control over all releases.',
              },
              {
                num: '4',
                title: 'Track & Approve',
                desc: 'Review milestone photos, approve successful phases, and release payments — all from your phone.',
              },
            ].map((step) => (
              <div key={step.num} className="relative">
                <div className="text-8xl font-black text-gray-50 absolute -top-10 -left-3 select-none pointer-events-none">
                  {step.num}
                </div>
                <div className="relative pt-6">
                  <h4 className="text-xl font-bold text-reno-dark mb-3">
                    {step.title}
                  </h4>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* SUCCESS STORIES — Real Results                 */}
      {/* ============================================= */}
      <section className="py-20 md:py-28 px-6 bg-[#f6f8f8]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-12">
            <div>
              <h2 className="font-display text-3xl md:text-4xl font-black text-reno-dark tracking-tight mb-3">
                Real Results, Verified Proof
              </h2>
              <p className="text-gray-500">
                Explore transformations powered by RenoNext contractors.
              </p>
            </div>
            <Link
              href="/pros"
              className="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all text-sm"
            >
              All Stories
              <span className="material-symbols-outlined text-base">
                arrow_forward
              </span>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Story 1 — DrySpace Waterproofing */}
            <div className="group rounded-2xl overflow-hidden bg-white shadow-float flex flex-col md:flex-row">
              <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden">
                <Image
                  src="/images/pros/dryspace/interior.webp"
                  alt="Completed waterproofing system"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur rounded text-[10px] font-black uppercase tracking-widest text-reno-dark">
                  Before &amp; After
                </div>
              </div>
              <div className="md:w-1/2 p-7 flex flex-col justify-center">
                <h3 className="text-xl font-bold text-reno-dark mb-2">
                  Basement Waterproofing
                </h3>
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="material-symbols-outlined text-primary text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    location_on
                  </span>
                  <span className="text-gray-500 text-xs font-bold uppercase tracking-wide">
                    Toronto, ON
                  </span>
                </div>
                <p className="text-gray-500 text-sm mb-5 italic">
                  &ldquo;The escrow system gave us the peace of mind to finally
                  fix our decade-old flooding issue.&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">JK</span>
                  </div>
                  <span className="text-sm font-bold text-reno-dark">
                    James K.
                  </span>
                </div>
              </div>
            </div>

            {/* Story 2 — Foundation Work */}
            <div className="group rounded-2xl overflow-hidden bg-white shadow-float flex flex-col md:flex-row">
              <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden">
                <Image
                  src="/images/pros/dryspace/exterior-2.webp"
                  alt="Foundation excavation and waterproofing"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, 25vw"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-white/90 backdrop-blur rounded text-[10px] font-black uppercase tracking-widest text-reno-dark">
                  Full Remodel
                </div>
              </div>
              <div className="md:w-1/2 p-7 flex flex-col justify-center">
                <h3 className="text-xl font-bold text-reno-dark mb-2">
                  Foundation &amp; Exterior
                </h3>
                <div className="flex items-center gap-2 mb-4">
                  <span
                    className="material-symbols-outlined text-primary text-sm"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    location_on
                  </span>
                  <span className="text-gray-500 text-xs font-bold uppercase tracking-wide">
                    Mississauga, ON
                  </span>
                </div>
                <p className="text-gray-500 text-sm mb-5 italic">
                  &ldquo;Seeing photo updates every week kept the project on
                  schedule and gave us complete visibility.&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-xs font-bold text-primary">MP</span>
                  </div>
                  <span className="text-sm font-bold text-reno-dark">
                    Maria P.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* FAQ                                           */}
      {/* ============================================= */}
      <section className="py-20 md:py-28 px-6 bg-white">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-display text-3xl md:text-4xl font-black text-reno-dark tracking-tight text-center mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-500 text-center mb-12">
            Everything you need to know about renovating with RenoNext.
          </p>

          <div className="space-y-3">
            {[
              {
                q: 'Is my money safe?',
                a: 'Yes. Your funds are held in a bank-grade escrow account. Neither you nor the contractor can access the money without verified milestone completion and mutual approval.',
              },
              {
                q: 'What if the contractor disappears?',
                a: 'Your remaining funds stay protected in the vault. You can request a full refund of unspent milestones, or hire a replacement contractor. The dispute resolution team mediates if needed.',
              },
              {
                q: 'What if I disagree with the work?',
                a: 'Every milestone includes GPS-stamped photos and third-party verification. You can withhold approval and request an independent inspector before payment is released.',
              },
              {
                q: 'Do I own the records?',
                a: 'Yes, 100%. Your HouseFax record is yours forever. Download it as a PDF, share it with buyers when selling, or use it for insurance claims.',
              },
              {
                q: 'How much does it cost?',
                a: 'Free to start — no platform fees upfront, no subscription, no credit card required. The 3% platform fee comes from the contractor side. You pay only for the work that gets done.',
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="group rounded-xl border border-gray-200 bg-white px-6 shadow-sm"
              >
                <summary className="flex items-center justify-between cursor-pointer py-5 text-left font-semibold text-reno-dark list-none [&::-webkit-details-marker]:hidden">
                  <div className="flex items-center gap-3">
                    <span className="material-symbols-outlined text-primary text-lg">
                      help
                    </span>
                    <span>{faq.q}</span>
                  </div>
                  <span className="material-symbols-outlined text-gray-400 text-lg transition-transform duration-200 group-open:rotate-180 ml-4 flex-shrink-0">
                    expand_more
                  </span>
                </summary>
                <div className="pt-1 pb-5 text-gray-500 leading-relaxed">
                  {faq.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================= */}
      {/* FINAL CTA — Dark                              */}
      {/* ============================================= */}
      <section className="py-20 md:py-28 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-reno-dark z-0">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'radial-gradient(#0fbabd 1px, transparent 1px)',
              backgroundSize: '30px 30px',
            }}
          />
        </div>
        <div className="max-w-4xl mx-auto relative z-10 text-center">
          <h2 className="font-display text-4xl md:text-5xl font-black text-white tracking-tight mb-6">
            Ready to Build with Confidence?
          </h2>
          <p className="text-gray-400 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Join homeowners who have eliminated renovation risk. Your dream home
            is one click away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/price-check"
              className="inline-flex items-center justify-center bg-primary text-white px-10 py-5 rounded-xl font-bold text-lg hover:scale-[1.03] active:scale-[0.98] transition-transform"
            >
              Start Your Project
            </Link>
            <Link
              href="/how-it-works"
              className="inline-flex items-center justify-center bg-white/10 text-white border border-white/20 px-10 py-5 rounded-xl font-bold text-lg hover:bg-white/20 transition-colors"
            >
              Talk to an Advisor
            </Link>
          </div>
          <div className="mt-10 flex items-center justify-center gap-8 text-gray-500 text-sm font-bold">
            <div className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-primary text-lg"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                security
              </span>
              Bank-Level Escrow
            </div>
            <div className="flex items-center gap-2">
              <span
                className="material-symbols-outlined text-primary text-lg"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
              Vetted Contractors
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
