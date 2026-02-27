'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';
import { MeshGradient } from './_animations/mesh-gradient';
import { HeroLaptopScroll } from './_animations/hero-laptop-scroll';
import { HeroCustomerMobile } from './_animations/hero-customer-mobile';

/* ═══════════════════════════════════════════════════════════
   Stripe-inspired hero — mesh gradient + clean product UI
   Desktop: 400vh section, sticky grid (copy left, laptop right),
            copy fades as laptop zooms to fill viewport
   Mobile:  normal hero + HeroCustomerMobile scroll-zoom phone
   ═══════════════════════════════════════════════════════════ */

const ease: [number, number, number, number] = [0.22, 0.68, 0, 1.0];

export function HeroSection() {
  const prefersReduced = useReducedMotion();
  const skip = prefersReduced ?? false;

  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(true);

  /* ── Desktop scroll progress (whole section = scroll container) ── */
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });

  /* Copy fades out as laptop starts scaling past the grid (0.05 → 0.18) */
  const copyOpacity = useTransform(scrollYProgress, [0.05, 0.18], skip ? [1, 1] : [1, 0]);
  const copyY = useTransform(scrollYProgress, [0.05, 0.18], skip ? [0, 0] : [0, -60]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      {/* ═══ Hero section ═══ */}
      <section
        ref={sectionRef}
        className="relative overflow-x-clip bg-[#0f172a] lg:h-[400vh]"
      >
        {/* ── Mesh gradient background ── */}
        {isVisible && (
          <MeshGradient
            colorSets={[
              ['#06b6d4', '#8b5cf6', '#10b981', '#6366f1', '#ec4899'],
              ['#6366f1', '#a855f7', '#0ea5e9', '#8b5cf6', '#06b6d4'],
              ['#f59e0b', '#ef4444', '#8b5cf6', '#ec4899', '#6366f1'],
              ['#ec4899', '#f97316', '#a855f7', '#ef4444', '#f59e0b'],
            ]}
            speed={0.7}
            className="absolute inset-0 h-full w-full"
          />
        )}

        {/* ── Readability overlays ── */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#0f172a]/70 via-transparent to-transparent" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0f172a]/80 via-transparent to-transparent" />

        {/* ═══════════════════════════════════════
            DESKTOP: sticky grid, copy left + laptop right
            ═══════════════════════════════════════ */}
        <div className="hidden lg:block h-full">
          <div className="sticky top-0 h-screen">
            <div className="container relative z-10 mx-auto flex h-full items-center px-6">
              <div className="mx-auto w-full max-w-7xl grid grid-cols-[0.8fr,1.4fr] items-center gap-12">
                {/* Left — copy (fades out on scroll) */}
                <m.div className="max-w-xl" style={{ opacity: copyOpacity, y: copyY }}>
                  <m.h1
                    className="text-[2.75rem] font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[3.5rem]"
                    initial={skip ? false : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease }}
                  >
                    Construction infrastructure{' '}
                    <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent">
                      for modern builders
                    </span>
                  </m.h1>

                  <m.p
                    className="mt-6 text-lg leading-relaxed text-slate-300/80"
                    initial={skip ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease, delay: 0.1 }}
                  >
                    AI estimating, secured milestone payments, and live site
                    verification — unified in one platform. From permit to final
                    inspection, your project runs on a system.
                  </m.p>

                  <m.div
                    className="mt-10 flex items-center gap-4"
                    initial={skip ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease, delay: 0.2 }}
                  >
                    <Button
                      asChild
                      className="h-12 rounded-full bg-white px-7 text-[15px] font-semibold text-slate-900 shadow-lg transition-all duration-200 hover:bg-slate-100 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                    >
                      <Link href="/start-project">
                        Start now
                        <ArrowRight className="ml-1.5 h-4 w-4" />
                      </Link>
                    </Button>

                    <Button
                      asChild
                      variant="ghost"
                      className="h-12 rounded-full border border-white/[0.15] px-7 text-[15px] font-semibold text-white transition-all duration-200 hover:border-white/25 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                    >
                      <Link href="/contact">Contact sales</Link>
                    </Button>
                  </m.div>
                </m.div>

                {/* Right — laptop with scroll-zoom animation */}
                <m.div
                  initial={skip ? false : { opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease, delay: 0.3 }}
                >
                  <HeroLaptopScroll scrollYProgress={scrollYProgress} />
                </m.div>
              </div>
            </div>
          </div>
        </div>

        {/* ═══════════════════════════════════════
            MOBILE: normal hero copy + scroll-zoom phone
            ═══════════════════════════════════════ */}
        <div className="lg:hidden">
          <div className="container relative z-10 mx-auto px-6 pt-20 pb-0">
            <div className="max-w-xl">
              <m.h1
                className="text-[2.75rem] font-extrabold leading-[1.08] tracking-tight text-white sm:text-5xl"
                initial={skip ? false : { opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease }}
              >
                Construction infrastructure{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-emerald-400 to-blue-400 bg-clip-text text-transparent">
                  for modern builders
                </span>
              </m.h1>

              <m.p
                className="mt-6 text-lg leading-relaxed text-slate-300/80"
                initial={skip ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease, delay: 0.1 }}
              >
                AI estimating, secured milestone payments, and live site
                verification — unified in one platform. From permit to final
                inspection, your project runs on a system.
              </m.p>

              <m.div
                className="mt-10 flex items-center gap-4"
                initial={skip ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease, delay: 0.2 }}
              >
                <Button
                  asChild
                  className="h-12 rounded-full bg-white px-7 text-[15px] font-semibold text-slate-900 shadow-lg transition-all duration-200 hover:bg-slate-100 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
                >
                  <Link href="/start-project">
                    Start now
                    <ArrowRight className="ml-1.5 h-4 w-4" />
                  </Link>
                </Button>

                <Button
                  asChild
                  variant="ghost"
                  className="h-12 rounded-full border border-white/[0.15] px-7 text-[15px] font-semibold text-white transition-all duration-200 hover:border-white/25 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
                >
                  <Link href="/contact">Contact sales</Link>
                </Button>
              </m.div>
            </div>
          </div>

          {/* Phone scroll-zoom */}
          <div className="relative z-0 -mt-60">
            <HeroCustomerMobile />
          </div>
        </div>

        {/* ── Bottom gradient line ── */}
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/[0.08] to-transparent" />
      </section>
    </LazyMotion>
  );
}
