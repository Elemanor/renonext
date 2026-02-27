'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, Shield, Lock, CreditCard, CheckCircle, Check } from 'lucide-react';

const footerLinks = {
  'For Homeowners': [
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'The Vault (Escrow)', href: '/how-it-works#vault' },
    { label: 'HouseFax\u2122', href: '/house-fax' },
    { label: 'Get a Price Check', href: '/price-check' },
    { label: 'Browse Pros', href: '/pros' },
    { label: 'Start a Project', href: '/start-project' },
  ],
  'For Contractors': [
    { label: 'Why RenoNext', href: '/contractors' },
    { label: 'Apply for Network', href: '/join' },
    { label: 'Pro Dashboard', href: '/pro-dashboard' },
    { label: 'Field App', href: '/contractors#field' },
    { label: '24hr Payouts', href: '/contractors#payouts' },
  ],
  Company: [
    { label: 'About Us', href: '/about' },
    { label: 'Blog', href: '/blog' },
    { label: 'Help Centre', href: '/help' },
    { label: 'Contact', href: '/contact' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Cookie Policy', href: '/privacy#cookies' },
  ],
};

export function Footer() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [error, setError] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    // Simulate submission
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      setEmail('');
      // Reset success message after 5 seconds
      setTimeout(() => setIsSubscribed(false), 5000);
    }, 800);
  };

  return (
    <footer className="relative overflow-hidden bg-reno-dark">
      <div className="mx-auto max-w-[1400px] px-5 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-6">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="/" className="mb-6 inline-block">
              <span className="font-display text-2xl text-white">RenoNext</span>
            </Link>
            <p className="mb-8 max-w-xs text-sm leading-relaxed text-gray-400">
              Bank-held escrow. GPS-verified proof. Fair market pricing.
              From permit to final inspection &mdash; protected by a system, not a handshake.
            </p>

            {/* Newsletter */}
            <div className="mb-8">
              <p className="mb-3 text-sm font-medium text-white">Stay in the loop</p>
              {isSubscribed ? (
                <div className="flex items-center gap-2 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-sm text-emerald-400">
                  <Check className="h-4 w-4" />
                  <span>Subscribed! Check your inbox.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                  <div className="flex gap-2">
                    <div className="relative flex-1">
                      <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Your email"
                        disabled={isSubmitting}
                        className="w-full rounded-lg border border-gray-800 bg-gray-900 py-2.5 pl-10 pr-4 text-sm text-gray-200 placeholder-gray-600 outline-none transition-all focus:border-reno-green focus:ring-1 focus:ring-reno-green/30 disabled:opacity-50"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="flex items-center justify-center rounded-lg bg-reno-green px-4 text-white transition-colors hover:bg-reno-green-dark disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      ) : (
                        <ArrowRight className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {error && (
                    <p className="text-xs text-red-400">{error}</p>
                  )}
                </form>
              )}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-5 text-xs font-bold uppercase tracking-[0.15em] text-gray-500">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-400 transition-colors duration-200 hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="mt-16 border-t border-gray-800/60 pt-8">
          <div className="mb-6 flex flex-wrap items-center justify-center gap-6">
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <CreditCard className="h-3.5 w-3.5 text-reno-green" />
              <span>Secure Payments</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Lock className="h-3.5 w-3.5 text-reno-teal" />
              <span>Bank-Held Escrow</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <Shield className="h-3.5 w-3.5 text-reno-purple" />
              <span>Licensed & Insured</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-500">
              <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
              <span>GPS Verified</span>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 border-t border-gray-800/60 pt-6 md:flex-row">
            <p className="text-sm text-gray-600">
              &copy; {new Date().getFullYear()} RenoNext Inc. Toronto, Canada.
            </p>
            <div className="flex gap-6">
              <Link href="/terms" className="text-sm text-gray-600 transition-colors hover:text-gray-300">Terms</Link>
              <Link href="/privacy" className="text-sm text-gray-600 transition-colors hover:text-gray-300">Privacy</Link>
              <Link href="/contact" className="text-sm text-gray-600 transition-colors hover:text-gray-300">Contact</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
