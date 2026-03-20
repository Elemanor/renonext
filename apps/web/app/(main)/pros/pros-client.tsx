'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Contractor {
  id: string;
  slug: string;
  company: string;
  trade: string;
  location: string;
  rating: number;
  reviewCount: number;
  projectCount: number;
  proofCompleteness: number;
  inspectionPassRate: number;
  disputeCount: number;
  lastJobDays: number;
  wsib: boolean;
  insured: boolean;
  verified: boolean;
  photos: string[];
}

interface ProsBrowserClientProps {
  contractors: Contractor[];
}

const tradeOptions = [
  'All Trades',
  'Kitchen & Bath',
  'Waterproofing',
  'Foundation Repair',
  'Concrete & Masonry',
  'Underpinning',
  'Electrical',
  'Plumbing',
  'Handyman',
  'HVAC',
];

export function ProsBrowserClient({ contractors }: ProsBrowserClientProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [tradeFilter, setTradeFilter] = useState('All Trades');
  const [showOnlyVerified, setShowOnlyVerified] = useState(false);

  const filteredContractors = useMemo(() => {
    return contractors.filter((c) => {
      if (showOnlyVerified && !c.verified) return false;

      if (tradeFilter !== 'All Trades') {
        if (!c.trade.toLowerCase().includes(tradeFilter.toLowerCase()))
          return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        if (
          !c.company.toLowerCase().includes(q) &&
          !c.trade.toLowerCase().includes(q) &&
          !c.location.toLowerCase().includes(q)
        )
          return false;
      }

      return true;
    });
  }, [contractors, searchQuery, tradeFilter, showOnlyVerified]);

  return (
    <div className="min-h-screen">
      {/* ===== Hero Section ===== */}
      <section className="relative pt-20 pb-32 px-6 overflow-hidden">
        {/* Mesh background */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold text-xs tracking-widest uppercase mb-6">
              Engineered Trust
            </span>
            <h1 className="font-display text-5xl md:text-6xl font-extrabold tracking-tighter leading-[1.1] text-reno-dark mb-8">
              Work with the{' '}
              <span className="text-primary">Top 5%</span> of Verified Pros.
            </h1>
            <p className="text-xl text-gray-500 leading-relaxed mb-10 max-w-lg">
              Our Discovery Engine matches you with elite professionals vetted
              through a multi-point architectural and financial integrity audit.
            </p>

            {/* Hero Search */}
            <div className="flex p-2 bg-white rounded-2xl shadow-float max-w-xl border border-primary/10">
              <div className="flex-1 flex items-center px-4 gap-3">
                <span className="material-symbols-outlined text-gray-400">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Trade, Project, or Location..."
                  className="w-full border-none focus:ring-0 bg-transparent text-reno-dark placeholder:text-gray-400 font-medium outline-none"
                />
              </div>
              <button className="bg-primary text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all shrink-0">
                Search
              </button>
            </div>
          </div>

          {/* Floating Trust Cards */}
          <div className="relative hidden lg:block h-[460px]">
            {/* Escrow Card */}
            <div className="absolute -top-8 left-0 w-64 p-6 bg-white rounded-2xl shadow-float border border-primary/5 z-20">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-amber-600"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    shield_with_heart
                  </span>
                </div>
                <div>
                  <div className="text-2xl font-bold text-reno-dark">$448M</div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                    Secured in Escrow
                  </div>
                </div>
              </div>
              <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-3/4 rounded-full" />
              </div>
            </div>

            {/* Verified Partners Card */}
            <div className="absolute top-24 right-0 w-72 p-6 bg-white rounded-2xl shadow-float border border-primary/5 z-10">
              <div className="flex items-center gap-4 mb-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-primary"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    verified_user
                  </span>
                </div>
                <span className="text-sm font-bold text-reno-dark">
                  Verified Gold Partners
                </span>
              </div>
              <div className="flex -space-x-3 mt-4">
                {['DS', 'IF', 'MX', 'SP'].map((initials, i) => (
                  <div
                    key={i}
                    className="w-10 h-10 rounded-full border-4 border-white flex items-center justify-center text-[10px] font-bold text-white"
                    style={{
                      backgroundColor: ['#0fbabd', '#0D9FA1', '#08696A', '#E8AA42'][i],
                    }}
                  >
                    {initials}
                  </div>
                ))}
                <div className="w-10 h-10 rounded-full border-4 border-white bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">
                  +{Math.max(0, contractors.length - 4)}
                </div>
              </div>
            </div>

            {/* Featured Project Image */}
            <div className="absolute bottom-0 left-8 right-8 h-72 rounded-[2rem] overflow-hidden shadow-2xl border border-primary/10">
              <Image
                src="/images/pros/dryspace/interior.webp"
                alt="Featured renovation project"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-reno-dark/60 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="text-xs uppercase tracking-widest font-bold opacity-80 mb-1">
                  Featured Project
                </div>
                <div className="text-lg font-bold">
                  Complete Basement Waterproofing
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Discovery Controls ===== */}
      <section className="px-6 max-w-7xl mx-auto mb-16">
        <div className="bg-white/60 backdrop-blur-xl p-6 rounded-2xl flex flex-wrap gap-6 md:gap-8 items-center border border-white shadow-float">
          {/* Trade Filter */}
          <div className="flex flex-col gap-1 flex-1 min-w-[180px]">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">
              Trade Specialization
            </label>
            <select
              value={tradeFilter}
              onChange={(e) => setTradeFilter(e.target.value)}
              className="bg-transparent border-none font-semibold text-reno-dark focus:ring-0 cursor-pointer"
            >
              {tradeOptions.map((trade) => (
                <option key={trade}>{trade}</option>
              ))}
            </select>
          </div>

          <div className="h-10 w-px bg-gray-200 hidden md:block" />

          {/* Verification Toggle */}
          <div className="flex flex-col gap-1 flex-1 min-w-[180px]">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">
              Verification Tier
            </label>
            <div className="flex items-center gap-2 mt-1">
              <button
                onClick={() => setShowOnlyVerified(true)}
                className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-widest transition-colors ${
                  showOnlyVerified
                    ? 'bg-amber-50 text-amber-700'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[14px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
                Gold Tier
              </button>
              <span className="text-gray-300 text-xs">/</span>
              <button
                onClick={() => setShowOnlyVerified(false)}
                className={`text-xs font-semibold transition-colors ${
                  !showOnlyVerified
                    ? 'text-primary'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                All Pros
              </button>
            </div>
          </div>

          <div className="h-10 w-px bg-gray-200 hidden md:block" />

          {/* Results Count */}
          <div className="flex flex-col gap-1 min-w-[120px]">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-400 ml-1">
              Results
            </label>
            <p className="font-semibold text-reno-dark">
              {filteredContractors.length} Pros Found
            </p>
          </div>
        </div>
      </section>

      {/* ===== Main Directory Grid ===== */}
      <section className="px-6 max-w-7xl mx-auto pb-24">
        {filteredContractors.length === 0 ? (
          <div className="py-20 text-center">
            <div className="w-20 h-20 bg-primary/10 rounded-full mx-auto flex items-center justify-center mb-6">
              <span className="material-symbols-outlined text-primary text-3xl">
                search_off
              </span>
            </div>
            <h3 className="font-display text-2xl font-bold text-reno-dark mb-2">
              No pros found
            </h3>
            <p className="text-gray-500 max-w-md mx-auto">
              Try adjusting your filters or search query to find verified
              contractors in your area.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredContractors.map((contractor, index) => (
              <ContractorCard key={contractor.id} contractor={contractor} />
            ))}

            {/* Success Story Card — injected after first 2 cards */}
            {filteredContractors.length >= 2 && (
              <div className="bg-primary p-8 rounded-2xl flex flex-col justify-between shadow-float relative overflow-hidden order-3">
                <div className="absolute -right-12 -top-12 w-48 h-48 bg-white/10 rounded-full blur-3xl" />
                <div className="relative z-10">
                  <span className="text-white/60 text-[10px] font-bold uppercase tracking-widest mb-4 block">
                    Success Story
                  </span>
                  <h3 className="text-2xl font-bold text-white mb-4 leading-tight">
                    &ldquo;RenoNext secured our $85k project from day
                    one.&rdquo;
                  </h3>
                  <p className="text-white/80 text-sm leading-relaxed mb-6">
                    DrySpace Waterproofing delivered 2 weeks early. Our escrow
                    system ensured every milestone was paid the moment inspection
                    cleared.
                  </p>
                </div>
                <div className="relative z-10 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white/20">
                    <Image
                      src="/images/pros/dryspace/hero.webp"
                      alt="DrySpace Waterproofing"
                      width={40}
                      height={40}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">
                      DrySpace Waterproofing
                    </div>
                    <div className="text-white/60 text-[10px] uppercase font-bold tracking-widest">
                      Sub-Grade Specialist, GTA
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Pro Edge Section — injected as wide card */}
            {filteredContractors.length >= 3 && (
              <div className="lg:col-span-2 bg-reno-dark rounded-3xl p-10 md:p-12 flex flex-col md:flex-row gap-12 items-center relative overflow-hidden shadow-float order-[6]">
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
                </div>
                <div className="relative z-10 md:w-1/2">
                  <h2 className="text-3xl md:text-4xl font-extrabold text-white tracking-tighter leading-tight mb-6">
                    The Pro Edge:{' '}
                    <br />
                    <span className="text-primary">
                      Secured Milestone Engine
                    </span>
                  </h2>
                  <p className="text-gray-400 leading-relaxed mb-8">
                    We don&apos;t just list pros; we back them. RenoNext holds
                    project funds in a neutral escrow vault, releasing payments
                    only when you approve the digital milestone sign-off.
                  </p>
                  <div className="flex flex-col gap-4">
                    {[
                      {
                        icon: 'assured_workload',
                        label: '100% Financial Insulation',
                      },
                      {
                        icon: 'architecture',
                        label: 'On-site Verification Checks',
                      },
                    ].map((item) => (
                      <div
                        key={item.icon}
                        className="flex items-center gap-4"
                      >
                        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                          <span className="material-symbols-outlined text-primary text-lg">
                            {item.icon}
                          </span>
                        </div>
                        <span className="text-white font-semibold">
                          {item.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="relative z-10 md:w-1/2 w-full">
                  <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                    <div className="text-xs font-bold text-primary uppercase tracking-[0.2em] mb-4">
                      Live Escrow Activity
                    </div>
                    <div className="space-y-4">
                      {[
                        {
                          label: 'Milestone 2: Rough-in',
                          status: 'RELEASED',
                          active: true,
                        },
                        {
                          label: 'Milestone 3: Drywall',
                          status: 'PENDING',
                          active: false,
                        },
                        {
                          label: 'Milestone 4: Finishes',
                          status: 'LOCKED',
                          active: false,
                        },
                      ].map((m, i) => (
                        <div
                          key={i}
                          className={`flex justify-between items-center py-2 ${
                            i < 2 ? 'border-b border-white/5' : ''
                          }`}
                        >
                          <div className="text-white text-sm">{m.label}</div>
                          <div
                            className={`text-xs font-bold px-2 py-1 rounded ${
                              m.active
                                ? 'text-primary bg-primary/10'
                                : 'text-gray-500 bg-white/5'
                            }`}
                          >
                            {m.status}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Bottom Dual CTA */}
        <div className="grid gap-6 md:grid-cols-2 mt-16">
          {/* Homeowners CTA */}
          <div className="bg-white rounded-2xl p-8 shadow-float border border-primary/5">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
              <span
                className="material-symbols-outlined text-primary text-2xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                check_circle
              </span>
            </div>
            <h2 className="font-display text-2xl font-bold text-reno-dark mb-3">
              Found someone you like?
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              Start a project with escrow protection. Your money is held safely
              until each milestone is verified.
            </p>
            <Link
              href="/price-check"
              className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl font-bold shadow-lg shadow-primary/20 hover:-translate-y-0.5 transition-all"
            >
              Start Project
              <span className="material-symbols-outlined text-lg">
                arrow_forward
              </span>
            </Link>
          </div>

          {/* Contractors CTA */}
          <div className="bg-white rounded-2xl p-8 shadow-float border border-primary/5">
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center mb-4">
              <span
                className="material-symbols-outlined text-amber-600 text-2xl"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                trending_up
              </span>
            </div>
            <h2 className="font-display text-2xl font-bold text-reno-dark mb-3">
              Want to be listed here?
            </h2>
            <p className="text-sm text-gray-500 leading-relaxed mb-6">
              Join the network. Get verified, build your reputation with real
              project data, and attract quality clients.
            </p>
            <Link
              href="/join"
              className="inline-flex items-center gap-2 bg-reno-dark text-white px-6 py-3 rounded-xl font-bold hover:-translate-y-0.5 transition-all"
            >
              Apply Now
              <span className="material-symbols-outlined text-lg">
                arrow_forward
              </span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ===== Contractor Card Component ===== */
function ContractorCard({ contractor }: { contractor: Contractor }) {
  const coverPhoto = contractor.photos[0];

  return (
    <Link
      href={`/pros/${contractor.id}`}
      className="group bg-white rounded-2xl border border-primary/5 shadow-float overflow-hidden hover:shadow-float-hover hover:-translate-y-1 transition-all duration-300 block"
    >
      {/* Cover Image */}
      <div className="relative h-48 overflow-hidden bg-[#f6f8f8]">
        {coverPhoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverPhoto}
            alt={`${contractor.company} work`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center">
              <span className="material-symbols-outlined text-gray-300 text-5xl block mb-2">
                construction
              </span>
              <span className="text-xs text-gray-400 font-medium">
                Portfolio Coming Soon
              </span>
            </div>
          </div>
        )}

        {/* Verification Badge */}
        <div className="absolute top-4 left-4">
          {contractor.verified ? (
            <span className="flex items-center gap-1 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black text-primary shadow-sm uppercase tracking-widest">
              <span
                className="material-symbols-outlined text-[14px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
              Gold Verified
            </span>
          ) : (
            <span className="flex items-center gap-1 px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black text-gray-500 shadow-sm uppercase tracking-widest border border-gray-100">
              <span
                className="material-symbols-outlined text-[14px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
              Verified
            </span>
          )}
        </div>

        {/* Hover overlay */}
        {contractor.photos.length > 1 && (
          <div className="absolute inset-0 bg-reno-dark/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
            <span className="text-white text-xs font-bold tracking-widest flex items-center gap-2">
              <span className="material-symbols-outlined">photo_library</span>
              VIEW PORTFOLIO
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-xl font-bold text-reno-dark group-hover:text-primary transition-colors">
              {contractor.company}
            </h3>
            <p className="text-sm text-gray-500 font-medium">
              {contractor.trade}
            </p>
          </div>
          {contractor.rating > 0 && (
            <div className="text-right">
              <div className="flex items-center text-amber-500 font-black text-lg">
                {contractor.rating.toFixed(1)}
                <span
                  className="material-symbols-outlined ml-1 text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  star
                </span>
              </div>
              <div className="text-[9px] font-bold text-gray-400 uppercase tracking-widest">
                {contractor.reviewCount} Reviews
              </div>
            </div>
          )}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-50">
          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              Location
            </div>
            <div className="text-sm font-bold text-reno-dark tracking-tight flex items-center gap-1">
              <span className="material-symbols-outlined text-sm text-gray-400">
                location_on
              </span>
              {contractor.location}
            </div>
          </div>
          <div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">
              Credentials
            </div>
            <div className="flex items-center gap-1.5">
              {contractor.wsib && (
                <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                  WSIB
                </span>
              )}
              {contractor.insured && (
                <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">
                  Insured
                </span>
              )}
            </div>
          </div>
        </div>

        {/* New to Platform indicator */}
        {contractor.verified &&
          contractor.proofCompleteness === 0 &&
          contractor.inspectionPassRate === 0 && (
            <div className="mt-4 pt-4 border-t border-gray-50">
              <div className="flex items-center gap-2 text-xs text-primary font-semibold">
                <span
                  className="material-symbols-outlined text-sm"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  new_releases
                </span>
                New to RenoNext — Trust metrics build with verified projects
              </div>
            </div>
          )}
      </div>
    </Link>
  );
}
