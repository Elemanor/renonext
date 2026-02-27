'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import {
  Menu,
  X,
  ChevronDown,
  User,
  Settings,
  LogOut,
  LayoutDashboard,
  Lock,
  Camera,
  UserCheck,
  Scale,
  Home,
  BookOpen,
  HelpCircle,
  Info,
  Mail,
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
  { icon: Lock, label: 'The Vault', desc: 'Bank-held escrow. Money moves only when work is verified.', href: '/how-it-works#vault', badge: 'Core' },
  { icon: Camera, label: 'Proof Packages', desc: 'GPS photos, inspections, sign-offs — compiled automatically.', href: '/how-it-works#proof' },
  { icon: UserCheck, label: 'Verified Pros', desc: 'Portfolios built from real work, not marketing.', href: '/how-it-works#pros' },
  { icon: Scale, label: 'QS Disputes', desc: 'Professional measurement settles disagreements.', href: '/how-it-works#disputes' },
  { icon: Home, label: 'HouseFax\u2122', desc: 'Permanent digital property record. Transfers on sale.', href: '/how-it-works#house-fax', badge: 'Unique' },
];

const resourceItems = [
  { icon: BookOpen, label: 'Blog', desc: 'Guides, market data, case studies.', href: '/blog' },
  { icon: HelpCircle, label: 'Help Centre', desc: 'FAQ by role. How-to guides.', href: '/help' },
  { icon: Info, label: 'About Us', desc: 'The team, BCIN + P.QS credentials.', href: '/about' },
  { icon: Mail, label: 'Contact', desc: 'Inquiries, partnerships, press.', href: '/contact' },
];

export function Navbar() {
  const router = useRouter();
  const pathname = usePathname();
  const { user, profile, signOut, loading: authLoading } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hiwOpen, setHiwOpen] = useState(false);
  const [resOpen, setResOpen] = useState(false);
  const [mobileHiwOpen, setMobileHiwOpen] = useState(false);
  const [mobileResOpen, setMobileResOpen] = useState(false);
  const hiwRef = useRef<HTMLDivElement>(null);
  const resRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setHiwOpen(false);
    setResOpen(false);
    setMobileHiwOpen(false);
    setMobileResOpen(false);
  }, [pathname]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (hiwRef.current && !hiwRef.current.contains(e.target as Node)) setHiwOpen(false);
      if (resRef.current && !resRef.current.contains(e.target as Node)) setResOpen(false);
    }
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        setHiwOpen(false);
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
          className={`w-full transition-all duration-300 ease-out ${
            scrolled
              ? 'border-b border-reno-border/60 bg-white/90 shadow-sm backdrop-blur-2xl'
              : 'border-b border-transparent bg-reno-dark'
          }`}
        >
          <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-3 lg:px-8">
            {/* Logo */}
            <Link href="/" className="flex shrink-0 items-center gap-1.5">
              <span className={`font-display text-xl tracking-tight ${scrolled ? 'text-reno-dark' : 'text-white'}`}>
                RenoNext
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden items-center gap-0.5 lg:flex">
              {/* How It Works (dropdown) */}
              <div ref={hiwRef} className="relative">
                <button
                  onClick={() => { setHiwOpen(!hiwOpen); setResOpen(false); }}
                  aria-expanded={hiwOpen}
                  aria-haspopup="true"
                  className={`flex items-center gap-1 rounded-lg px-3.5 py-2 text-[13px] font-medium transition-all duration-200 ${
                    scrolled
                      ? 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      : 'text-white/60 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  How It Works
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${hiwOpen ? 'rotate-180' : ''}`} />
                </button>
                {hiwOpen && (
                  <div role="menu" className="absolute left-0 top-full z-50 mt-2 w-[540px] rounded-xl border border-gray-200 bg-white p-3 shadow-xl">
                    <div className="grid grid-cols-2 gap-1">
                      {hiwItems.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setHiwOpen(false)}
                          role="menuitem"
                          className="group flex gap-3 rounded-lg p-3 transition-all duration-150 hover:bg-reno-green-light"
                        >
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-reno-green-light text-reno-green group-hover:bg-reno-green group-hover:text-white transition-colors">
                            <item.icon className="h-4 w-4" />
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-semibold text-gray-900">{item.label}</span>
                              {item.badge && (
                                <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold leading-none ${
                                  item.badge === 'Core' ? 'bg-reno-green text-white' : 'bg-reno-teal text-white'
                                }`}>
                                  {item.badge}
                                </span>
                              )}
                            </div>
                            <p className="mt-0.5 text-xs text-gray-500 leading-snug">{item.desc}</p>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="mt-2 border-t border-gray-100 pt-2 px-3">
                      <p className="text-[11px] text-gray-400">These are anchor sections on one &quot;How It Works&quot; page &mdash; one scroll, one flow.</p>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/homeowners"
                className={`rounded-lg px-3.5 py-2 text-[13px] font-medium transition-all duration-200 ${
                  scrolled
                    ? 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    : 'text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                For Homeowners
              </Link>

              <Link
                href="/contractors"
                className={`rounded-lg px-3.5 py-2 text-[13px] font-medium transition-all duration-200 ${
                  scrolled
                    ? 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    : 'text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                For Contractors
              </Link>

              <Link
                href="/pros"
                className={`rounded-lg px-3.5 py-2 text-[13px] font-medium transition-all duration-200 ${
                  scrolled
                    ? 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    : 'text-white/60 hover:bg-white/10 hover:text-white'
                }`}
              >
                Browse Pros
              </Link>

              {/* Resources (dropdown) */}
              <div ref={resRef} className="relative">
                <button
                  onClick={() => { setResOpen(!resOpen); setHiwOpen(false); }}
                  aria-expanded={resOpen}
                  aria-haspopup="true"
                  className={`flex items-center gap-1 rounded-lg px-3.5 py-2 text-[13px] font-medium transition-all duration-200 ${
                    scrolled
                      ? 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                      : 'text-white/60 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  Resources
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform ${resOpen ? 'rotate-180' : ''}`} />
                </button>
                {resOpen && (
                  <div role="menu" className="absolute right-0 top-full z-50 mt-2 w-72 rounded-xl border border-gray-200 bg-white p-2 shadow-xl">
                    {resourceItems.map((item) => (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={() => setResOpen(false)}
                        role="menuitem"
                        className="flex items-center gap-3 rounded-lg p-3 transition-all duration-150 hover:bg-gray-50"
                      >
                        <item.icon className="h-4 w-4 text-gray-400" />
                        <div>
                          <span className="text-sm font-semibold text-gray-900">{item.label}</span>
                          <p className="text-xs text-gray-500">{item.desc}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              {/* Price Check - green text */}
              <Link
                href="/price-check"
                className={`rounded-lg px-3.5 py-2 text-[13px] font-bold transition-all duration-200 ${
                  scrolled
                    ? 'text-reno-green hover:bg-reno-green-light'
                    : 'text-emerald-400 hover:bg-white/10 hover:text-emerald-300'
                }`}
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
                      className={`flex items-center gap-2 rounded-lg px-3 py-2 ${
                        scrolled ? 'text-gray-700 hover:bg-gray-100' : 'text-white/80 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-reno-green text-sm font-bold text-white">
                        {displayName.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm font-medium">{displayName.split(' ')[0]}</span>
                      <ChevronDown className="h-3.5 w-3.5 opacity-60" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56 rounded-xl p-2 shadow-xl">
                    <DropdownMenuLabel className="px-3 py-2">
                      <p className="text-sm font-semibold text-gray-900">{displayName}</p>
                      <p className="text-xs capitalize text-gray-500">{profile.role} Account</p>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild className="cursor-pointer rounded-lg px-3 py-2.5">
                      <Link href={dashboardHref}>
                        <LayoutDashboard className="mr-2 h-4 w-4 text-gray-400" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer rounded-lg px-3 py-2.5">
                      <Link href={settingsHref}>
                        <Settings className="mr-2 h-4 w-4 text-gray-400" />
                        Settings
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer rounded-lg px-3 py-2.5 text-red-600 hover:bg-red-50">
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Link
                    href="/login"
                    className={`rounded-lg px-4 py-2 text-sm font-medium transition-all duration-200 ${
                      scrolled
                        ? 'text-gray-600 hover:text-gray-900'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    Log In
                  </Link>
                  <Link
                    href="/start-project"
                    className="flex items-center gap-2 rounded-lg bg-reno-green px-5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-reno-green-dark"
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
              className={`flex items-center justify-center rounded-lg p-2 lg:hidden ${
                scrolled ? 'text-gray-700' : 'text-white'
              }`}
            >
              {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Nav */}
          {mobileOpen && (
            <div className="border-t border-gray-200/10 bg-white px-5 pb-6 pt-4 lg:hidden">
              <div className="flex flex-col gap-1">
                {/* How It Works - Accordion */}
                <div>
                  <button
                    onClick={() => setMobileHiwOpen(!mobileHiwOpen)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
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
                          className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50"
                        >
                          <item.icon className="h-3.5 w-3.5 text-gray-400" />
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <Link href="/homeowners" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  For Homeowners
                </Link>
                <Link href="/contractors" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  For Contractors
                </Link>
                <Link href="/pros" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Browse Pros
                </Link>

                {/* Resources - Accordion */}
                <div>
                  <button
                    onClick={() => setMobileResOpen(!mobileResOpen)}
                    className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50"
                  >
                    Resources
                    <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${mobileResOpen ? 'rotate-180' : ''}`} />
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      mobileResOpen ? 'max-h-[300px] opacity-100' : 'max-h-0 opacity-0'
                    }`}
                  >
                    <div className="flex flex-col gap-0.5 pl-3 pt-1">
                      {resourceItems.map((item) => (
                        <Link
                          key={item.label}
                          href={item.href}
                          onClick={() => setMobileOpen(false)}
                          className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-gray-600 hover:bg-gray-50"
                        >
                          <item.icon className="h-3.5 w-3.5 text-gray-400" />
                          <span>{item.label}</span>
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <Link href="/price-check" onClick={() => setMobileOpen(false)} className="rounded-lg px-3 py-3 text-sm font-bold text-reno-green hover:bg-reno-green-light">
                  Get a Price Check
                </Link>
                <div className="mt-4 flex flex-col gap-2">
                  <Link
                    href="/start-project"
                    onClick={() => setMobileOpen(false)}
                    className="flex items-center justify-center gap-2 rounded-lg bg-reno-green px-5 py-3 text-sm font-semibold text-white"
                  >
                    Start Project
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  {!authLoading && !user && (
                    <Link
                      href="/login"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center justify-center rounded-lg border border-gray-200 px-5 py-3 text-sm font-medium text-gray-700"
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
      <div className="fixed bottom-0 left-0 right-0 z-50 flex items-center gap-2 border-t border-gray-200 bg-white/95 px-4 py-3 backdrop-blur-xl lg:hidden">
        <Link
          href="/price-check"
          className="flex flex-1 items-center justify-center rounded-lg border border-reno-green px-4 py-2.5 text-sm font-semibold text-reno-green"
        >
          Price Check
        </Link>
        <Link
          href="/start-project"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-reno-green px-4 py-2.5 text-sm font-semibold text-white"
        >
          Start Project
          <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </div>
    </>
  );
}
