'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  ChevronDown,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/lib/auth/auth-context';

const hiwItems = [
  { icon: 'lock', label: 'The Vault', desc: 'Bank-held escrow. Money moves only when work is verified.', href: '/how-it-works#vault', badge: 'Core' },
  { icon: 'photo_camera', label: 'Proof Packages', desc: 'GPS photos, inspections, sign-offs — compiled automatically.', href: '/how-it-works#proof' },
  { icon: 'how_to_reg', label: 'Verified Pros', desc: 'Portfolios built from real work, not marketing.', href: '/how-it-works#pros' },
  { icon: 'balance', label: 'QS Disputes', desc: 'Professional measurement settles disagreements.', href: '/how-it-works#disputes' },
  { icon: 'home', label: 'HouseFax\u2122', desc: 'Permanent digital property record. Transfers on sale.', href: '/how-it-works#house-fax', badge: 'Unique' },
];

const serviceGroups = [
  {
    heading: 'Structural',
    items: [
      { label: 'Underpinning', href: '/services/underpinning' },
      { label: 'Foundation Repair', href: '/services/foundation-repair' },
      { label: 'Waterproofing', href: '/services/waterproofing' },
      { label: 'Concrete Works', href: '/services/concrete-works' },
      { label: 'Masonry', href: '/services/masonry' },
      { label: 'Framing', href: '/services/framing' },
    ],
  },
  {
    heading: 'Trades',
    items: [
      { label: 'Electrical', href: '/services/electrical' },
      { label: 'Plumbing', href: '/services/plumbing' },
      { label: 'HVAC', href: '/services/hvac' },
      { label: 'Insulation', href: '/services/insulation' },
      { label: 'Drains', href: '/services/drains' },
      { label: 'Painting', href: '/services/painting' },
      { label: 'Handyman', href: '/services/handyman' },
      { label: 'Cleaning', href: '/services/cleaning' },
    ],
  },
  {
    heading: 'Building',
    items: [
      { label: 'Home Additions', href: '/services/additions' },
      { label: 'Basement Second Unit', href: '/services/basement-second-unit' },
      { label: 'Roofing', href: '/services/roofing' },
      { label: 'Demolition', href: '/services/demolition' },
      { label: 'Decks', href: '/services/decks' },
    ],
  },
  {
    heading: 'Professional',
    items: [
      { label: 'General Contractor', href: '/services/general-contractor' },
      { label: 'Project Management', href: '/services/project-management' },
      { label: 'Building Permits', href: '/services/building-permit' },
      { label: 'Drafting', href: '/services/drafting' },
      { label: 'Estimating', href: '/services/estimating' },
      { label: 'Equipment Rental', href: '/services/equipment-rental' },
    ],
  },
];

const resourceItems = [
  { icon: 'security', label: 'Obsidian Sentinel', desc: 'Construction intelligence platform — 11 modules.', href: '/apps/sentinel' },
  { icon: 'verified_user', label: 'The Proof', desc: 'Immutable verification ledger — GPS-stamped records.', href: '/apps/the-proof' },
  { icon: 'location_on', label: 'LocalPro', desc: 'GPS check-in, photo logs, escrow vault for crews.', href: '/apps/local-pro' },
  { icon: 'engineering', label: 'FieldForce', desc: 'Worker check-in, attendance, project briefs.', href: '/apps/field-force' },
  { icon: 'smartphone', label: 'Apps', desc: '5 field + office apps for your crew.', href: '/apps' },
  { icon: 'attach_money', label: 'Cost Guides', desc: '25 trades, 15 cities, real pricing.', href: '/costs' },
  { icon: 'description', label: 'Contract Generator', desc: 'Free Ontario-compliant contracts.', href: '/contracts' },
  { icon: 'redeem', label: 'Savings Calculator', desc: 'See all rebates for your city.', href: '/savings' },
  { icon: 'menu_book', label: 'Blog', desc: 'Guides, market data, case studies.', href: '/blog' },
  { icon: 'help', label: 'Help Centre', desc: 'FAQ by role. How-to guides.', href: '/help' },
  { icon: 'info', label: 'About Us', desc: 'The team, BCIN + P.QS credentials.', href: '/about' },
  { icon: 'mail', label: 'Contact', desc: 'Inquiries, partnerships, press.', href: '/contact' },
];

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, profile, signOut, loading: authLoading } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hiwOpen, setHiwOpen] = useState(false);
  const [resOpen, setResOpen] = useState(false);
  const [svcOpen, setSvcOpen] = useState(false);
  const [mobileHiwOpen, setMobileHiwOpen] = useState(false);
  const [mobileSvcOpen, setMobileSvcOpen] = useState(false);
  const [mobileResOpen, setMobileResOpen] = useState(false);
  const hiwRef = useRef<HTMLDivElement>(null);
  const svcRef = useRef<HTMLDivElement>(null);
  const resRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setHiwOpen(false);
    setSvcOpen(false);
    setResOpen(false);
    setMobileHiwOpen(false);
    setMobileSvcOpen(false);
    setMobileResOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (hiwRef.current && !hiwRef.current.contains(e.target as Node)) setHiwOpen(false);
      if (svcRef.current && !svcRef.current.contains(e.target as Node)) setSvcOpen(false);
      if (resRef.current && !resRef.current.contains(e.target as Node)) setResOpen(false);
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setHiwOpen(false);
        setSvcOpen(false);
        setResOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
    router.refresh();
  };

  const dashboardHref =
    profile?.role === 'admin'
      ? '/admin'
      : profile?.role === 'pro'
      ? '/pro-dashboard'
      : '/dashboard';

  const settingsHref =
    profile?.role === 'pro'
      ? '/pro-dashboard/settings'
      : '/dashboard/settings';

  const displayName = profile?.full_name || user?.email || 'User';

  return (
    <>
      <header className="sticky top-0 z-50 w-full">
        <div
          className={`w-full transition-all duration-300 ease-out border-b ${
            scrolled
              ? 'border-slate-200 bg-white/90 shadow-sm backdrop-blur-2xl'
              : 'border-slate-200/60 bg-white/80 backdrop-blur-md'
          }`}
        >
          <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-3 lg:px-8">
            {/* Logo */}
            <Link href="/" className="flex shrink-0 items-center gap-2">
              <div className="size-6 text-[#0fbabd]">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" fill="currentColor" />
                </svg>
              </div>
              <span className="text-xl font-bold leading-tight tracking-tight text-slate-900">
                RenoNext
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-0.5 lg:flex">
              {/* How It Works (dropdown) */}
              <div ref={hiwRef} className="relative">
                <button
                  onClick={() => { setHiwOpen(!hiwOpen); setSvcOpen(false); setResOpen(false); }}
                  aria-expanded={hiwOpen}
                  aria-haspopup="true"
                  className="flex items-center gap-1 rounded-lg px-3.5 py-2 text-[13px] font-medium text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900"
                >
                  How It Works
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${hiwOpen ? 'rotate-180' : ''}`} />
                </button>
                {hiwOpen && (
                  <div role="menu" className="absolute left-0 top-full z-50 mt-2 w-[540px] rounded-xl border border-slate-200 bg-white p-3 shadow-xl">
                    <div className="grid grid-cols-2 gap-1">
                      {hiwItems.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setHiwOpen(false)}
                          role="menuitem"
                          className="group flex gap-3 rounded-lg p-3 transition-all duration-150 hover:bg-[#0fbabd]/5"
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#0fbabd]/10 text-[#0fbabd] group-hover:bg-[#0fbabd] group-hover:text-white transition-colors">
                            <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-slate-900">{item.label}</span>
                              {item.badge && (
                                <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold leading-none ${
                                  item.badge === 'Core' ? 'bg-[#0fbabd] text-white' : 'bg-[#0D9FA1] text-white'
                                }`}>
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className="mt-0.5 text-xs text-slate-500 leading-snug">{item.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-2 border-t border-slate-100 pt-2 px-3">
                      <p className="text-[11px] text-slate-400">These are anchor sections on one &quot;How It Works&quot; page &mdash; one scroll, one flow.</p>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/homeowners"
                className="rounded-lg px-3.5 py-2 text-[13px] font-medium text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900"
              >
                For Homeowners
              </Link>

              <Link
                href="/contractors"
                className="rounded-lg px-3.5 py-2 text-[13px] font-medium text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900"
              >
                For Contractors
              </Link>

              <Link
                href="/pros"
                className="rounded-lg px-3.5 py-2 text-[13px] font-medium text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900"
              >
                Browse Pros
              </Link>

              {/* Services (mega dropdown) */}
              <div ref={svcRef} className="relative">
                <button
                  onClick={() => { setSvcOpen(!svcOpen); setHiwOpen(false); setResOpen(false); }}
                  aria-expanded={svcOpen}
                  aria-haspopup="true"
                  className="flex items-center gap-1 rounded-lg px-3.5 py-2 text-[13px] font-medium text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900"
                >
                  Services
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${svcOpen ? 'rotate-180' : ''}`} />
                </button>
                {svcOpen && (
                  <div role="menu" className="absolute left-1/2 top-full z-50 mt-2 w-[540px] -translate-x-1/2 rounded-xl border border-slate-200 bg-white p-4 shadow-xl">
                    <div className="grid grid-cols-3 gap-4">
                      {serviceGroups.map((group) => (
                        <div key={group.heading}>
                          <p className="mb-2 px-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">{group.heading}</p>
                          <div className="flex flex-col gap-0.5">
                            {group.items.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setSvcOpen(false)}
                                role="menuitem"
                                className="rounded-lg px-2 py-1.5 text-sm text-slate-700 transition-all duration-150 hover:bg-[#0fbabd]/5 hover:text-[#0fbabd]"
                              >
                                {item.label}
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Resources (dropdown) */}
              <div ref={resRef} className="relative">
                <button
                  onClick={() => { setResOpen(!resOpen); setHiwOpen(false); setSvcOpen(false); }}
                  aria-expanded={resOpen}
                  aria-haspopup="true"
                  className="flex items-center gap-1 rounded-lg px-3.5 py-2 text-[13px] font-medium text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900"
                >
                  Resources
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${resOpen ? 'rotate-180' : ''}`} />
                </button>
                {resOpen && (
                  <div role="menu" className="absolute right-0 top-full z-50 mt-2 w-72 rounded-xl border border-slate-200 bg-white p-2 shadow-xl">
                    {resourceItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setResOpen(false)}
                        role="menuitem"
                        className="flex items-center gap-3 rounded-lg p-3 transition-all duration-150 hover:bg-slate-50"
                      >
                        <span className="material-symbols-outlined text-slate-400 text-[18px]">{item.icon}</span>
                        <div>
                          <span className="text-sm font-semibold text-slate-900">{item.label}</span>
                          <p className="text-xs text-slate-500">{item.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Check - teal accent text */}
              <Link
                href="/price-check"
                className="rounded-lg px-3.5 py-2 text-[13px] font-bold text-[#0fbabd] transition-all duration-200 hover:bg-[#0fbabd]/5"
              >
                Get a Price Check
              </Link>
            </nav>

            {/* Right Side */}
            <div className="hidden shrink-0 items-center gap-3 lg:flex">
              {!authLoading && user && profile ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="flex items-center gap-2 rounded-lg px-3 py-2 text-slate-700 hover:bg-slate-100"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#0fbabd] text-sm font-bold text-white">
                        {displayName.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm font-medium">{displayName.split(' ')[0]}</span>
                      <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 rounded-xl p-2 shadow-xl">
                    <DropdownMenuLabel className="px-3 py-2">
                      <p className="text-sm font-semibold text-slate-900">{displayName}</p>
                      <p className="text-xs capitalize text-slate-500">{profile.role} Account</p>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="cursor-pointer rounded-lg px-3 py-2.5">
                      <Link href={dashboardHref}>
                        <span className="material-symbols-outlined mr-2 text-slate-400 text-[18px]">dashboard</span>
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer rounded-lg px-3 py-2.5">
                      <Link href={settingsHref}>
                        <span className="material-symbols-outlined mr-2 text-slate-400 text-[18px]">settings</span>
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer rounded-lg px-3 py-2.5 text-red-600 hover:bg-red-50">
                      <span className="material-symbols-outlined mr-2 text-[18px]">logout</span>
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="rounded-lg px-4 py-2 text-sm font-medium text-slate-600 transition-all duration-200 hover:text-slate-900"
                  >
                    Log In
                  </Link>
                  <Link
                    href="/start-project"
                    className="flex items-center gap-2 rounded-lg bg-[#0fbabd] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-200 hover:bg-[#0fbabd]/90 hover:-translate-y-0.5"
                  >
                    Start Project
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex items-center justify-center rounded-lg p-2 text-slate-700 lg:hidden"
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>

          {/* Mobile Nav */}
          {mobileOpen && (
            <div className="border-t border-slate-200/60 bg-white px-5 pb-6 pt-4 lg:hidden">
              <div className="flex flex-col gap-1">
                {/* How It Works - Accordion */}
                <div>
                  <button
                    onClick={() => setMobileHiwOpen(!mobileHiwOpen)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    How It Works
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileHiwOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      mobileHiwOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="flex flex-col gap-0.5 pl-3 pt-1">
                      {hiwItems.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
                        >
                          <span className="material-symbols-outlined text-slate-400 text-[18px]">{item.icon}</span>
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <Link href="/homeowners" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  For Homeowners
                </Link>
                <Link href="/contractors" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  For Contractors
                </Link>
                <Link href="/pros" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50">
                  Browse Pros
                </Link>

                {/* Services - Accordion */}
                <div>
                  <button
                    onClick={() => setMobileSvcOpen(!mobileSvcOpen)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Services
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileSvcOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      mobileSvcOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="flex flex-col gap-0.5 pl-3 pt-1">
                      {serviceGroups.map((group) => (
                        <div key={group.heading}>
                          <p className="px-3 pt-2 pb-1 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">{group.heading}</p>
                          {group.items.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setMobileOpen(false)}
                              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-600 hover:bg-slate-50"
                            >
                              <span className="material-symbols-outlined text-slate-400 text-[16px]">build</span>
                              <span>{item.label}</span>
                            </Link>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Resources - Accordion */}
                <div>
                  <button
                    onClick={() => setMobileResOpen(!mobileResOpen)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-slate-700 hover:bg-slate-50"
                  >
                    Resources
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileResOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      mobileResOpen ? 'max-h-[400px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="flex flex-col gap-0.5 pl-3 pt-1">
                      {resourceItems.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-slate-600 hover:bg-slate-50"
                        >
                          <span className="material-symbols-outlined text-slate-400 text-[16px]">{item.icon}</span>
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <Link href="/price-check" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-3 text-sm font-bold text-[#0fbabd] hover:bg-[#0fbabd]/5">
                  Get a Price Check
                </Link>
                <div className="mt-4 flex flex-col gap-2">
                  <Link
                    href="/start-project"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-lg bg-[#0fbabd] px-5 py-3 text-sm font-semibold text-white"
                  >
                    Start Project
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  {!authLoading && !user && (
                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center rounded-lg border border-slate-200 px-5 py-3 text-sm font-medium text-slate-700"
                    >
                      Log In
                    </Link>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Mobile sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center gap-2 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur-xl lg:hidden">
        <Link
          href="/price-check"
          className="flex flex-1 items-center justify-center rounded-lg border border-[#0fbabd] px-4 py-2.5 text-sm font-semibold text-[#0fbabd]"
        >
          Price Check
        </Link>
        <Link
          href="/start-project"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-[#0fbabd] px-4 py-2.5 text-sm font-semibold text-white"
        >
          Start Project
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </>
  );
}
