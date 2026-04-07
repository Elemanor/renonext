'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { ChevronDown, ArrowRight } from 'lucide-react';
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

// Products mega menu data
const platformItems = [
  { icon: 'security', label: 'Obsidian Sentinel', desc: 'Construction intelligence platform — 11 modules.', href: '/apps/sentinel' },
  { icon: 'verified_user', label: 'The Proof', desc: 'Immutable verification ledger — GPS-stamped records.', href: '/apps/the-proof' },
  { icon: 'engineering', label: 'FieldForce', desc: 'Worker check-in, attendance, project briefs.', href: '/apps/field-force' },
  { icon: 'architecture', label: 'Precision Layer', desc: 'Blueprint viewer, markup tools, layer control.', href: '/apps/precision-layer' },
  { icon: 'location_on', label: 'LocalPro', desc: 'GPS check-in, photo logs, escrow vault.', href: '/apps/local-pro' },
  { icon: 'health_and_safety', label: 'Safety Hub', desc: 'JSA generator, WHMIS training, toolbox talks.', href: '/apps/safety-hub' },
];

const freeToolsItems = [
  { icon: 'attach_money', label: 'Cost Guides', desc: '25 trades, 15 cities, real pricing.', href: '/costs' },
  { icon: 'analytics', label: '2026 Cost Report', desc: 'Free data report — 375+ price points.', href: '/renovation-cost-report' },
  { icon: 'description', label: 'Contract Generator', desc: 'Free Ontario-compliant contracts.', href: '/contracts' },
  { icon: 'redeem', label: 'Savings Calculator', desc: 'See all rebates for your city.', href: '/savings' },
  { icon: 'shopping_cart', label: 'Shop', desc: 'Construction supplies & tools.', href: '/shop' },
  { icon: 'account_tree', label: 'WBS Generator', desc: 'Work breakdown for any reno.', href: '/wbs-generator' },
];

// How It Works data
const hiwItems = [
  { icon: 'lock', label: 'The Vault', desc: 'Bank-held escrow. Money moves only when work is verified.', href: '/how-it-works#vault', badge: 'Core' },
  { icon: 'photo_camera', label: 'Proof Packages', desc: 'GPS photos, inspections, sign-offs — compiled automatically.', href: '/how-it-works#proof' },
  { icon: 'how_to_reg', label: 'Verified Pros', desc: 'Portfolios built from real work, not marketing.', href: '/how-it-works#pros' },
  { icon: 'balance', label: 'QS Disputes', desc: 'Professional measurement settles disagreements.', href: '/how-it-works#disputes' },
  { icon: 'home', label: 'HouseFax™', desc: 'Permanent digital property record. Transfers on sale.', href: '/how-it-works#house-fax', badge: 'Unique' },
];

// Services data
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

// Resources simple dropdown data
const resourcesItems = [
  { icon: 'person', label: 'For Homeowners', href: '/homeowners' },
  { icon: 'construction', label: 'For Contractors', href: '/contractors' },
  { icon: 'menu_book', label: 'Blog', href: '/blog' },
  { icon: 'help', label: 'Help Centre', href: '/help' },
  { icon: 'info', label: 'About Us', href: '/about' },
  { icon: 'mail', label: 'Contact', href: '/contact' },
];

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, profile, signOut, loading: authLoading } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const [hiwOpen, setHiwOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);

  const productsRef = useRef<HTMLDivElement>(null);
  const hiwRef = useRef<HTMLDivElement>(null);
  const servicesRef = useRef<HTMLDivElement>(null);
  const resourcesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProductsOpen(false);
    setHiwOpen(false);
    setServicesOpen(false);
    setResourcesOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (productsRef.current && !productsRef.current.contains(e.target as Node)) setProductsOpen(false);
      if (hiwRef.current && !hiwRef.current.contains(e.target as Node)) setHiwOpen(false);
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) setServicesOpen(false);
      if (resourcesRef.current && !resourcesRef.current.contains(e.target as Node)) setResourcesOpen(false);
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setProductsOpen(false);
        setHiwOpen(false);
        setServicesOpen(false);
        setResourcesOpen(false);
        setMobileOpen(false);
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

  const closeAllDesktopMenus = () => {
    setProductsOpen(false);
    setHiwOpen(false);
    setServicesOpen(false);
    setResourcesOpen(false);
  };

  const isHome = pathname === '/';
  const isTransparent = isHome && !scrolled;

  return (
    <>
      <header className="sticky top-0 z-50 w-full">
        <div
          className={`w-full transition-all duration-300 ease-out ${
            scrolled
              ? 'bg-white/80 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,28,55,0.06)]'
              : isHome
                ? 'bg-transparent'
                : 'bg-white/80 backdrop-blur-xl'
          }`}
        >
          <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-3.5 lg:px-8">
            {/* Logo */}
            <Link href="/" className="flex shrink-0 items-center gap-2">
              <div className={`size-6 ${isTransparent ? 'text-white' : 'text-[#0fbabd]'} transition-colors duration-300`}>
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" fill="currentColor" />
                </svg>
              </div>
              <span className={`text-xl font-bold leading-tight tracking-tight ${isTransparent ? 'text-white' : 'text-slate-900'} transition-colors duration-300`}>
                RenoNext
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-1 lg:flex">
              {/* Products */}
              <div ref={productsRef} className="relative">
                <button
                  onClick={() => {
                    setProductsOpen(!productsOpen);
                    setHiwOpen(false);
                    setServicesOpen(false);
                    setResourcesOpen(false);
                  }}
                  aria-expanded={productsOpen}
                  aria-haspopup="true"
                  className={`flex items-center gap-1 rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors duration-300 ${isTransparent ? 'text-white/90 hover:text-white' : 'text-slate-700 hover:text-slate-900'}`}
                >
                  Products
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${productsOpen ? 'rotate-180' : ''}`} />
                </button>
                {productsOpen && (
                  <div
                    role="menu"
                    className="absolute left-0 top-full z-50 mt-2 w-[720px] rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.02)] border border-slate-100 bg-white overflow-hidden opacity-0 translate-y-2 animate-in fade-in slide-in-from-top-2 duration-200"
                    style={{ opacity: 1, transform: 'translateY(0)' }}
                  >
                    <div className="p-6">
                      <div className="grid grid-cols-2 gap-8">
                        {/* Platform column */}
                        <div>
                          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">Platform</p>
                          <div className="flex flex-col gap-1">
                            {platformItems.map((item) => (
                              <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setProductsOpen(false)}
                                role="menuitem"
                                className="group flex gap-3 rounded-lg p-3 transition-colors hover:bg-slate-50"
                              >
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0fbabd]/10 text-[#0fbabd] transition-colors group-hover:bg-[#0fbabd] group-hover:text-white">
                                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    {item.icon}
                                  </span>
                                </div>
                                <div className="min-w-0">
                                  <div className="text-sm font-bold text-slate-900">{item.label}</div>
                                  <p className="mt-0.5 text-xs text-slate-500 leading-snug">{item.desc}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>

                        {/* Free Tools column */}
                        <div>
                          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">Free Tools</p>
                          <div className="flex flex-col gap-1">
                            {freeToolsItems.map((item) => (
                              <Link
                                key={item.label}
                                href={item.href}
                                onClick={() => setProductsOpen(false)}
                                role="menuitem"
                                className="group flex gap-3 rounded-lg p-3 transition-colors hover:bg-slate-50"
                              >
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0fbabd]/10 text-[#0fbabd] transition-colors group-hover:bg-[#0fbabd] group-hover:text-white">
                                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                    {item.icon}
                                  </span>
                                </div>
                                <div className="min-w-0">
                                  <div className="text-sm font-bold text-slate-900">{item.label}</div>
                                  <p className="mt-0.5 text-xs text-slate-500 leading-snug">{item.desc}</p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Bottom bar */}
                    <div className="flex items-center justify-between bg-slate-50 px-6 py-4">
                      <span className="text-xs font-semibold text-slate-600">New: Safety Hub</span>
                      <Link
                        href="/apps"
                        onClick={() => setProductsOpen(false)}
                        className="flex items-center gap-1 text-xs font-semibold text-[#0fbabd] hover:text-[#0d9fa1] transition-colors"
                      >
                        View all products
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {/* How It Works */}
              <div ref={hiwRef} className="relative">
                <button
                  onClick={() => {
                    setHiwOpen(!hiwOpen);
                    setProductsOpen(false);
                    setServicesOpen(false);
                    setResourcesOpen(false);
                  }}
                  aria-expanded={hiwOpen}
                  aria-haspopup="true"
                  className={`flex items-center gap-1 rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors duration-300 ${isTransparent ? 'text-white/90 hover:text-white' : 'text-slate-700 hover:text-slate-900'}`}
                >
                  How It Works
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${hiwOpen ? 'rotate-180' : ''}`} />
                </button>
                {hiwOpen && (
                  <div
                    role="menu"
                    className="absolute left-0 top-full z-50 mt-2 w-[580px] rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.02)] border border-slate-100 bg-white overflow-hidden opacity-0 translate-y-2 animate-in fade-in slide-in-from-top-2 duration-200"
                    style={{ opacity: 1, transform: 'translateY(0)' }}
                  >
                    <div className="p-4">
                      <div className="grid grid-cols-2 gap-2">
                        {hiwItems.map((item) => (
                          <Link
                            key={item.label}
                            href={item.href}
                            onClick={() => setHiwOpen(false)}
                            role="menuitem"
                            className="group flex gap-3 rounded-lg p-3 transition-colors hover:bg-slate-50"
                          >
                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0fbabd]/10 text-[#0fbabd] transition-colors group-hover:bg-[#0fbabd] group-hover:text-white">
                              <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                                {item.icon}
                              </span>
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-bold text-slate-900">{item.label}</span>
                                {item.badge && (
                                  <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold leading-none ${
                                    item.badge === 'Core' ? 'bg-[#0fbabd] text-white' : 'bg-[#E8AA42] text-white'
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
                    </div>
                    <div className="bg-slate-50 px-4 py-3">
                      <p className="text-[11px] text-slate-500">These are anchor sections on one &quot;How It Works&quot; page — one scroll, one flow.</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Services */}
              <div ref={servicesRef} className="relative">
                <button
                  onClick={() => {
                    setServicesOpen(!servicesOpen);
                    setProductsOpen(false);
                    setHiwOpen(false);
                    setResourcesOpen(false);
                  }}
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                  className={`flex items-center gap-1 rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors duration-300 ${isTransparent ? 'text-white/90 hover:text-white' : 'text-slate-700 hover:text-slate-900'}`}
                >
                  Services
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${servicesOpen ? 'rotate-180' : ''}`} />
                </button>
                {servicesOpen && (
                  <div
                    role="menu"
                    className="absolute left-1/2 top-full z-50 mt-2 w-[640px] -translate-x-1/2 rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.02)] border border-slate-100 bg-white p-6 opacity-0 translate-y-2 animate-in fade-in slide-in-from-top-2 duration-200"
                    style={{ opacity: 1, transform: 'translateX(-50%) translateY(0)' }}
                  >
                    <div className="grid grid-cols-4 gap-6">
                      {serviceGroups.map((group) => (
                        <div key={group.heading}>
                          <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">{group.heading}</p>
                          <div className="flex flex-col gap-0.5">
                            {group.items.map((item) => (
                              <Link
                                key={item.href}
                                href={item.href}
                                onClick={() => setServicesOpen(false)}
                                role="menuitem"
                                className="rounded-lg px-2 py-1.5 text-sm text-slate-700 transition-colors hover:bg-slate-50 hover:text-[#0fbabd]"
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

              {/* Resources */}
              <div ref={resourcesRef} className="relative">
                <button
                  onClick={() => {
                    setResourcesOpen(!resourcesOpen);
                    setProductsOpen(false);
                    setHiwOpen(false);
                    setServicesOpen(false);
                  }}
                  aria-expanded={resourcesOpen}
                  aria-haspopup="true"
                  className={`flex items-center gap-1 rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors duration-300 ${isTransparent ? 'text-white/90 hover:text-white' : 'text-slate-700 hover:text-slate-900'}`}
                >
                  Resources
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${resourcesOpen ? 'rotate-180' : ''}`} />
                </button>
                {resourcesOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 top-full z-50 mt-2 w-64 rounded-2xl shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.02)] border border-slate-100 bg-white p-2 opacity-0 translate-y-2 animate-in fade-in slide-in-from-top-2 duration-200"
                    style={{ opacity: 1, transform: 'translateY(0)' }}
                  >
                    {resourcesItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setResourcesOpen(false)}
                        role="menuitem"
                        className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-slate-50"
                      >
                        <span className="material-symbols-outlined text-slate-400 text-[18px]">{item.icon}</span>
                        <span className="text-sm font-medium text-slate-900">{item.label}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/pros"
                className={`rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors duration-300 ${isTransparent ? 'text-white/90 hover:text-white' : 'text-slate-700 hover:text-slate-900'}`}
              >
                Browse Pros
              </Link>

              <Link
                href="/price-check"
                className={`rounded-lg px-3.5 py-2 text-[13px] font-semibold transition-colors duration-300 ${isTransparent ? 'text-white hover:text-[#0fbabd]' : 'text-[#0fbabd] hover:text-[#0d9fa1]'}`}
              >
                Price Check
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
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors duration-300 ${isTransparent ? 'text-white/90 hover:text-white' : 'text-slate-600 hover:text-slate-900'}`}
                  >
                    Log In
                  </Link>
                  <Link
                    href="/start-project"
                    className="rounded-full bg-[#0fbabd] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-200 hover:bg-[#0d9fa1] hover:shadow-lg"
                  >
                    Start Project
                  </Link>
                </>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`flex items-center justify-center rounded-lg p-2 lg:hidden transition-colors duration-300 ${isTransparent ? 'text-white' : 'text-slate-700'}`}
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Full-Screen Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-white lg:hidden overflow-y-auto">
          {/* Header with close button */}
          <div className="sticky top-0 z-50 flex items-center justify-between border-b border-slate-200 bg-white px-5 py-3.5">
            <Link href="/" onClick={() => setMobileOpen(false)} className="flex shrink-0 items-center gap-2">
              <div className="size-6 text-[#0fbabd]">
                <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                  <path d="M42.4379 44C42.4379 44 36.0744 33.9038 41.1692 24C46.8624 12.9336 42.2078 4 42.2078 4L7.01134 4C7.01134 4 11.6577 12.932 5.96912 23.9969C0.876273 33.9029 7.27094 44 7.27094 44L42.4379 44Z" fill="currentColor" />
                </svg>
              </div>
              <span className="text-xl font-bold leading-tight tracking-tight text-slate-900">
                RenoNext
              </span>
            </Link>
            <button
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-center rounded-lg p-2 text-slate-700"
            >
              <span className="material-symbols-outlined text-2xl">close</span>
            </button>
          </div>

          {/* Content */}
          <div className="px-5 py-6 pb-24">
            {/* Products Section */}
            <div className="mb-8">
              <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">Products</h3>
              <div className="space-y-1">
                <p className="px-3 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">Platform</p>
                {platformItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-slate-50"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0fbabd]/10 text-[#0fbabd]">
                      <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        {item.icon}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-slate-900">{item.label}</div>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                  </Link>
                ))}
                <p className="px-3 py-2 mt-4 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">Free Tools</p>
                {freeToolsItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-slate-50"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#0fbabd]/10 text-[#0fbabd]">
                      <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                        {item.icon}
                      </span>
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-slate-900">{item.label}</div>
                      <p className="text-xs text-slate-500">{item.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* How It Works Section */}
            <div className="mb-8">
              <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">How It Works</h3>
              <div className="space-y-1">
                {hiwItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-slate-50"
                  >
                    <span className="material-symbols-outlined text-slate-400 text-[20px]">{item.icon}</span>
                    <span className="text-sm font-medium text-slate-900">{item.label}</span>
                    {item.badge && (
                      <span className={`ml-auto rounded-full px-2 py-0.5 text-[9px] font-bold ${
                        item.badge === 'Core' ? 'bg-[#0fbabd] text-white' : 'bg-[#E8AA42] text-white'
                      }`}>
                        {item.badge}
                      </span>
                    )}
                  </Link>
                ))}
              </div>
            </div>

            {/* Services Section */}
            <div className="mb-8">
              <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">Services</h3>
              <div className="space-y-4">
                {serviceGroups.map((group) => (
                  <div key={group.heading}>
                    <p className="mb-1 px-3 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">{group.heading}</p>
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className="block rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-slate-50"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Resources Section */}
            <div className="mb-8">
              <h3 className="mb-4 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-400">Resources</h3>
              <div className="space-y-1">
                {resourcesItems.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center gap-3 rounded-lg p-3 transition-colors hover:bg-slate-50"
                  >
                    <span className="material-symbols-outlined text-slate-400 text-[20px]">{item.icon}</span>
                    <span className="text-sm font-medium text-slate-900">{item.label}</span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Browse Pros */}
            <Link
              href="/pros"
              onClick={() => setMobileOpen(false)}
              className="mb-2 block rounded-lg px-3 py-3 text-sm font-medium text-slate-900 transition-colors hover:bg-slate-50"
            >
              Browse Pros
            </Link>

            {/* Price Check */}
            <Link
              href="/price-check"
              onClick={() => setMobileOpen(false)}
              className="mb-8 block rounded-lg px-3 py-3 text-sm font-bold text-[#0fbabd] transition-colors hover:bg-[#0fbabd]/5"
            >
              Price Check
            </Link>

            {/* CTA Card */}
            <div className="rounded-2xl bg-slate-50 p-6">
              <h3 className="mb-2 text-lg font-bold text-slate-900">Ready to start?</h3>
              <p className="mb-4 text-sm text-slate-600">Get matched with verified contractors in your area.</p>
              <Link
                href="/start-project"
                onClick={() => setMobileOpen(false)}
                className="mb-3 flex items-center justify-center gap-2 rounded-full bg-[#0fbabd] px-6 py-3 text-sm font-semibold text-white shadow-md"
              >
                Start Project
                <ArrowRight className="h-4 w-4" />
              </Link>
              {!authLoading && !user && (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center text-sm font-medium text-slate-600"
                >
                  Log In
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Mobile sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center gap-2 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur-xl lg:hidden">
        <Link
          href="/price-check"
          className="flex flex-1 items-center justify-center rounded-full border-2 border-[#0fbabd] px-4 py-2.5 text-sm font-semibold text-[#0fbabd]"
        >
          Price Check
        </Link>
        <Link
          href="/start-project"
          className="flex flex-1 items-center justify-center gap-2 rounded-full bg-[#0fbabd] px-4 py-2.5 text-sm font-semibold text-white shadow-md"
        >
          Start Project
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </>
  );
}
