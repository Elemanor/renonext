'use client';

import { useEffect, useRef, useState } from 'react';
import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
} from 'framer-motion';

import { DesktopSidebar } from '@/components/customer-dashboard/desktop-sidebar';
import { DesktopHeader } from '@/components/customer-dashboard/desktop-header';
import { WeatherHub } from '@/components/customer-dashboard/weather-hub';
import { EscrowStatus } from '@/components/customer-dashboard/escrow-status';
import { ProgressPhotos } from '@/components/customer-dashboard/progress-photos';
import { NoiseActivityForecast } from '@/components/customer-dashboard/noise-activity-forecast';
import { HealthHazardStatus } from '@/components/customer-dashboard/health-hazard-status';
import { staggerContainer } from '@/components/customer-dashboard/animated-card';

/* ═══════════════════════════════════════════════════════════
   Desktop customer dashboard — rendered at 960px, CSS-scaled
   to fit the laptop frame. Same pattern as HeroDashboardV2.
   ═══════════════════════════════════════════════════════════ */

const NATIVE_W = 960;

const ease: [number, number, number, number] = [0.22, 0.68, 0, 1.0];

export function HeroCustomerDesktop() {
  const prefersReduced = useReducedMotion();
  const skip = prefersReduced ?? false;

  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0.625);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      setScale(entry.contentRect.width / NATIVE_W);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <LazyMotion features={domAnimation}>
      <div
        ref={containerRef}
        className="w-full overflow-hidden bg-[#0a0a0f]"
        style={{ aspectRatio: `${NATIVE_W} / 620` }}
      >
        <div
          className="origin-top-left"
          style={{
            width: NATIVE_W,
            transform: `scale(${scale})`,
          }}
        >
          <m.div
            initial={skip ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease }}
            className="flex select-none text-white"
            style={{ width: NATIVE_W, height: 620 }}
          >
            {/* ── Sidebar ── */}
            <DesktopSidebar />

            {/* ── Main content ── */}
            <div className="flex flex-1 flex-col overflow-hidden">
              <DesktopHeader />

              {/* Dashboard body */}
              <m.div
                variants={staggerContainer}
                initial={skip ? 'show' : 'hidden'}
                animate="show"
                className="flex-1 space-y-3 overflow-hidden p-4"
              >
                {/* Row 1: WeatherHub (large) + EscrowStatus + ProgressPhotos */}
                <div className="grid grid-cols-[1.3fr_1fr] gap-3">
                  <WeatherHub />
                  <div className="flex flex-col gap-3">
                    <EscrowStatus compact />
                    <ProgressPhotos />
                  </div>
                </div>

                {/* Row 2: NoiseActivityForecast + HealthHazardStatus */}
                <div className="grid grid-cols-2 gap-3">
                  <NoiseActivityForecast />
                  <HealthHazardStatus />
                </div>
              </m.div>
            </div>
          </m.div>
        </div>
      </div>
    </LazyMotion>
  );
}
