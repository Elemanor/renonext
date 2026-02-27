'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import {
  m,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from 'framer-motion';

import { DesktopSidebar } from '@/components/customer-dashboard/desktop-sidebar';
import { DesktopHeader } from '@/components/customer-dashboard/desktop-header';
import { WeatherHub } from '@/components/customer-dashboard/weather-hub';
import { EscrowStatus } from '@/components/customer-dashboard/escrow-status';
import { ProgressPhotos } from '@/components/customer-dashboard/progress-photos';
import { NoiseActivityForecast } from '@/components/customer-dashboard/noise-activity-forecast';
import { HealthHazardStatus } from '@/components/customer-dashboard/health-hazard-status';
import { TeamMembers } from '@/components/customer-dashboard/team-members';
import { InspectionsMilestones } from '@/components/customer-dashboard/inspections-milestones';
import { WarningAlert } from '@/components/customer-dashboard/warning-alert';
import { DeliveryAlert } from '@/components/customer-dashboard/delivery-alert';
import { GanttChart } from '@/components/customer-dashboard/gantt-chart';
import { ProjectSteps } from '@/components/customer-dashboard/project-steps';
import { KanbanBoard } from '@/components/customer-dashboard/kanban-board';

/* ═══════════════════════════════════════════════════════════
   Desktop hero laptop — scroll-driven zoom animation.

   NATIVE_W = 1920 so that cssScale × fillScale ≈ 1.0.
   When zoomed to fill the viewport the dashboard looks like a
   real full-screen app (14 px text → ~14 px on screen), not a
   blown-up thumbnail.

   In the pre-zoom laptop view the text is small (~6 px) but the
   dashboard is decorative — colours / layout are the point,
   identical to how Apple & Stripe show product screenshots.

   Translate and scale live on SEPARATE elements to avoid CSS
   transform multiplication.
   ═══════════════════════════════════════════════════════════ */

const NATIVE_W = 1920;
const MIN_NATIVE_H = 900;
const MAX_NATIVE_H = 1200;
const DEFAULT_NATIVE_H = 1080;
const SCROLL_TRAVEL = 180;

/*
 * Screen center is always 39.5 CSS-px above the laptop visual center
 * (bezel 6 + screenH/2) − (screenH + 91)/2 = −39.5 regardless of native size.
 * The outer translate compensates by SCREEN_CENTER_OFFSET × fillScale.
 */
const SCREEN_CENTER_OFFSET = 39.5;

interface HeroLaptopScrollProps {
  scrollYProgress: MotionValue<number>;
}

export function HeroLaptopScroll({ scrollYProgress }: HeroLaptopScrollProps) {
  const prefersReduced = useReducedMotion();
  const skip = prefersReduced ?? false;

  const laptopRef = useRef<HTMLDivElement>(null);
  const [laptopWidth, setLaptopWidth] = useState(600);
  const [nativeH, setNativeH] = useState(DEFAULT_NATIVE_H);
  const [fillScale, setFillScale] = useState(2);
  const [centerOffsetX, setCenterOffsetX] = useState(0);

  const doMeasure = useCallback(() => {
    const el = laptopRef.current;
    if (!el) return;
    const vw = window.innerWidth;
    const vh = window.innerHeight;

    const parentW = el.parentElement?.clientWidth ?? vw * 0.55;
    const lw = Math.min(parentW, 820);
    setLaptopWidth(lw);

    const nh = Math.min(
      Math.max(Math.round(NATIVE_W * (vh / vw)), MIN_NATIVE_H),
      MAX_NATIVE_H,
    );
    setNativeH(nh);

    const sw = lw - 12;
    const sh = Math.round(nh * (lw / NATIVE_W));
    setFillScale(Math.max(vw / sw, vh / sh));

    const rect = el.getBoundingClientRect();
    setCenterOffsetX(vw / 2 - (rect.left + rect.width / 2));
  }, []);

  useEffect(() => {
    const raf = requestAnimationFrame(doMeasure);
    window.addEventListener('resize', doMeasure);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', doMeasure);
    };
  }, [doMeasure]);

  const cssScale = laptopWidth / NATIVE_W;
  const screenH = Math.round(nativeH * cssScale);
  const screenW = laptopWidth - 12;

  /* ── Phase 1: Straighten (0 → 0.12) ── */
  const rotateX = useTransform(scrollYProgress, [0, 0.12], skip ? [0, 0] : [20, 0]);
  const rotateY = useTransform(scrollYProgress, [0, 0.12], skip ? [0, 0] : [-16, 0]);
  const rotateZ = useTransform(scrollYProgress, [0, 0.12], skip ? [0, 0] : [-5, 0]);

  const screenCenterNudge = SCREEN_CENTER_OFFSET * fillScale;

  /* ── Phase 1→2: Translate to viewport center (OUTER layer) ── */
  const moveX = useTransform(
    scrollYProgress,
    [0.08, 0.25],
    skip ? [0, 0] : [0, centerOffsetX],
  );
  const moveY = useTransform(
    scrollYProgress,
    [0.08, 0.25],
    skip ? [0, 0] : [0, screenCenterNudge],
  );

  /* ── Phase 1→2: Scale to fill viewport (INNER layer) ── */
  const laptopScale = useTransform(
    scrollYProgress,
    [0, 0.12, 0.25],
    skip ? [1, 1, 1] : [1, 1, fillScale],
  );

  /* ── Phase 2: Frame fades (0.10 → 0.22) ── */
  const frameOpacity = useTransform(scrollYProgress, [0.10, 0.22], skip ? [1, 1] : [1, 0]);
  const borderRadius = useTransform(scrollYProgress, [0.10, 0.22], skip ? [16, 16] : [16, 0]);
  const glowOp = useTransform(scrollYProgress, [0, 0.18], skip ? [0.4, 0.4] : [0.4, 0]);

  /* ── Phase 3: Dashboard card scroll (native px) ── */
  const cardsY = useTransform(
    scrollYProgress,
    [0.25, 0.50],
    skip ? [0, 0] : [0, -SCROLL_TRAVEL],
  );

  return (
    <div style={{ perspective: '1800px' }}>
      <div ref={laptopRef} className="relative" style={{ width: laptopWidth }}>
        {/* Ambient glow */}
        <m.div
          className="absolute -inset-12 z-0 rounded-[4rem] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/[0.10] via-purple-500/[0.06] to-transparent blur-3xl"
          style={{ opacity: glowOp }}
        />

        {/* ═══ OUTER: translate (screen-pixel space) ═══ */}
        <m.div
          className="relative z-10"
          style={{
            x: moveX,
            y: moveY,
            transformStyle: 'preserve-3d' as const,
          }}
        >
          {/* ═══ INNER: rotate + scale (transform-origin: center) ═══ */}
          <m.div
            style={{
              scale: laptopScale,
              rotateX,
              rotateY,
              rotateZ,
              transformOrigin: 'center center',
              transformStyle: 'preserve-3d' as const,
            }}
          >
            <div className="relative">
              {/* ═══ Screen lid ═══ */}
              <m.div
                className="relative bg-[#1e293b] p-[6px]"
                style={{
                  borderRadius,
                  boxShadow:
                    '0 40px 100px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.03)',
                }}
              >
                {/* Metallic bezel */}
                <m.div
                  className="absolute inset-0 z-0"
                  style={{
                    borderRadius,
                    background:
                      'linear-gradient(145deg, #3a3a42 0%, #2a2a32 30%, #1e293b 50%, #2a2a32 70%, #3a3a42 100%)',
                    opacity: frameOpacity,
                  }}
                />

                {/* Webcam */}
                <m.div
                  className="absolute left-1/2 top-[2px] z-20 -translate-x-1/2"
                  style={{ opacity: frameOpacity }}
                >
                  <div className="flex h-[5px] w-[5px] items-center justify-center rounded-full bg-[#334155] ring-1 ring-[#475569]/40">
                    <div className="h-[2px] w-[2px] rounded-full bg-[#1e293b]" />
                  </div>
                </m.div>

                {/* ── Screen area ── */}
                <m.div
                  className="relative z-10 overflow-hidden bg-[#0a0a0f]"
                  style={{ borderRadius }}
                >
                  <m.div
                    className="pointer-events-none absolute inset-0 z-20 shadow-[inset_0_0_40px_rgba(0,0,0,0.5)]"
                    style={{ opacity: frameOpacity, borderRadius }}
                  />

                  {/* Dashboard (1920 × nativeH native, CSS-scaled to fit laptop) */}
                  <div
                    className="overflow-hidden"
                    style={{ height: screenH, width: screenW }}
                  >
                    <div
                      className="origin-top-left"
                      style={{
                        width: NATIVE_W,
                        transform: `scale(${cssScale})`,
                      }}
                    >
                      <div
                        className="flex select-none text-white"
                        style={{ width: NATIVE_W, height: nativeH }}
                      >
                        <DesktopSidebar />
                        <div className="flex flex-1 flex-col overflow-hidden">
                          <DesktopHeader />
                          <div className="flex-1 overflow-hidden">
                            <m.div
                              className="space-y-3 p-4"
                              style={{ y: cardsY }}
                            >
                              {/* Row 1: Weather + Photos & Gantt stacked */}
                              <div className="grid grid-cols-[2fr_1fr] gap-3">
                                <WeatherHub />
                                <div className="flex flex-col gap-3">
                                  <ProgressPhotos />
                                  <GanttChart />
                                </div>
                              </div>

                              {/* Row 2: Project Steps + Kanban Board */}
                              <div className="grid grid-cols-[1fr_1.5fr] gap-3">
                                <ProjectSteps />
                                <KanbanBoard />
                              </div>

                              {/* Row 3: Three compact info cards */}
                              <div className="grid grid-cols-3 gap-3">
                                <EscrowStatus compact />
                                <NoiseActivityForecast />
                                <DeliveryAlert />
                              </div>

                              {/* Row 4: Alerts + status */}
                              <div className="grid grid-cols-3 gap-3">
                                <HealthHazardStatus />
                                <WarningAlert />
                                <InspectionsMilestones />
                              </div>

                              {/* Row 5: Team */}
                              <div className="pb-4">
                                <TeamMembers />
                              </div>
                            </m.div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <m.div
                    className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent"
                    style={{ opacity: frameOpacity, borderRadius }}
                  />
                </m.div>
              </m.div>

              {/* Hinge */}
              <m.div
                className="h-[5px]"
                style={{
                  background: 'linear-gradient(to bottom, #475569, #334155, #1e293b)',
                  opacity: frameOpacity,
                }}
              />

              {/* Keyboard */}
              <m.div
                className="rounded-b-xl px-6 py-2"
                style={{
                  background: 'linear-gradient(to bottom, #1e293b, #1a2332)',
                  opacity: frameOpacity,
                }}
              >
                <div className="flex items-center justify-center">
                  <div className="h-[6px] w-20 rounded-full bg-[#334155]/40" />
                </div>
              </m.div>

              {/* Desk reflection */}
              <m.div
                className="mt-3 h-10 rounded-2xl bg-gradient-to-b from-white/[0.015] to-transparent blur-sm"
                style={{ opacity: frameOpacity }}
              />
            </div>
          </m.div>
        </m.div>
      </div>
    </div>
  );
}
