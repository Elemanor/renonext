'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Briefcase } from 'lucide-react';

export function ProposalTopBar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-gray-200/60 bg-white/80 shadow-sm backdrop-blur-2xl'
          : 'bg-white'
      }`}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-reno-green to-reno-green-dark shadow-sm shadow-reno-green/20 transition-shadow duration-300 group-hover:shadow-md group-hover:shadow-reno-green/30">
            <Briefcase className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold tracking-tight text-gray-900">
            Reno<span className="bg-gradient-to-r from-reno-green-dark to-reno-green bg-clip-text text-transparent">Next</span>
          </span>
        </Link>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-reno-green-light px-3 py-1 text-xs font-semibold text-reno-green-dark">
            Proposal
          </span>
        </div>
      </div>
    </header>
  );
}
