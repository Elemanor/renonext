'use client';

import { useEffect, useRef, useState } from 'react';
import {
  LazyMotion,
  domAnimation,
  m,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion';

import { DashboardHeader } from '@/components/customer-dashboard/dashboard-header';
import { SiteBriefing } from '@/components/customer-dashboard/site-briefing';
import { WeatherBar } from '@/components/customer-dashboard/weather-bar';
import { EscrowStatus } from '@/components/customer-dashboard/escrow-status';
import { WarningAlert } from '@/components/customer-dashboard/warning-alert';
import { DeliveryAlert } from '@/components/customer-dashboard/delivery-alert';
import { TeamMembers } from '@/components/customer-dashboard/team-members';
import { NoiseActivityForecast } from '@/components/customer-dashboard/noise-activity-forecast';
import { ProgressPhotos } from '@/components/customer-dashboard/progress-photos';
import { InspectionsMilestones } from '@/components/customer-dashboard/inspections-milestones';
import { HealthHazardStatus } from '@/components/customer-dashboard/health-hazard-status';
import { BottomTabBar } from '@/components/customer-dashboard/bottom-tab-bar';

/* ═══════════════════════════════════════════════════════════
   Mobile hero phone — starts 3D-tilted in hero viewport,
   on scroll straightens out → zooms in → frame fades →
   you're inside the dashboard (full-width, no phone chrome).

   Phase 0 (hero):      3D tilt, phone visible at small scale
   Phase 1 (0→0.15):    Rotate to flat, scale to 1.0
   Phase 2 (0.15→0.28): Frame fades, scale to fill viewport
   Phase 3 (0.22→0.85): Cards scroll (parallax)
   ═══════════════════════════════════════════════════════════ */

const cardEase: [number, number, number, number] = [0.22, 0.68, 0, 1.0];

export function HeroCustomerMobile() {
  const prefersReduced = useReducedMotion();
  const skip = prefersReduced ?? false;

  const containerRef = useRef<HTMLDivElement>(null);
  const [phoneWidth, setPhoneWidth] = useState(390);
  const [fillScale, setFillScale] = useState(1.1);

  useEffect(() => {
    const update = () => {
      const vw = window.innerWidth;
      const pw = Math.min(vw - 32, 420);
      setPhoneWidth(pw);
      // Scale so the screen content (inside 5px frame each side) fills viewport
      setFillScale(vw / (pw - 10));
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const startScale = Math.min(300 / phoneWidth, 0.8);
  const phoneHeight = Math.round(phoneWidth * 1.875);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  /* ── Phase 1: Straighten + scale (0 → 0.15) ── */
  const rotateX = useTransform(scrollYProgress, [0, 0.15], skip ? [0, 0] : [18, 0]);
  const rotateY = useTransform(scrollYProgress, [0, 0.15], skip ? [0, 0] : [-12, 0]);
  const rotateZ = useTransform(scrollYProgress, [0, 0.15], skip ? [0, 0] : [-8, 0]);

  /* ── Phase 1→2: Scale from small → 1.0 → fill viewport ── */
  const phoneScale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.28],
    skip ? [1, 1, 1] : [startScale, 1.0, fillScale],
  );

  /* ── Phase 2: Frame fades (0.12 → 0.25) ── */
  const frameOpacity = useTransform(scrollYProgress, [0.12, 0.25], skip ? [1, 1] : [1, 0]);
  const outerBR = useTransform(scrollYProgress, [0.12, 0.25], skip ? [52, 52] : [52, 0]);
  const innerBR = useTransform(scrollYProgress, [0.12, 0.25], skip ? [49, 49] : [49, 0]);
  const screenBR = useTransform(scrollYProgress, [0.12, 0.25], skip ? [47, 47] : [47, 0]);
  const glowOp = useTransform(scrollYProgress, [0, 0.18], skip ? [0.5, 0.5] : [0.5, 0]);

  /* ── Phase 3: Dashboard scroll (0.22 → 0.85) ── */
  const cardsY = useTransform(scrollYProgress, [0.22, 0.75], skip ? [0, 0] : [0, -phoneHeight * 1.2]);

  const vp = { once: true, amount: 0.2 as const };

  return (
    <LazyMotion features={domAnimation}>
      <div
        ref={containerRef}
        className="relative"
        style={{ height: skip ? 'auto' : '400vh' }}
      >
        {/* Removed overflow-hidden — parent section has overflow-x-clip */}
        <div
          className={
            skip
              ? 'relative'
              : 'sticky top-0 flex h-screen items-center justify-center'
          }
        >
          <div className="relative mx-auto" style={{ width: phoneWidth, perspective: '1200px' }}>
            {/* Pulsing ambient glow behind phone */}
            <m.div
              className="absolute -inset-8 z-0 rounded-[4rem] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/[0.12] via-blue-500/[0.08] to-transparent blur-3xl"
              style={{ opacity: glowOp }}
            />

            {/* ── Scaled + rotated phone wrapper ── */}
            <m.div
              className="relative z-10"
              style={{
                scale: phoneScale,
                rotateX,
                rotateY,
                rotateZ,
                transformStyle: 'preserve-3d',
              }}
            >
              {/* Titanium outer frame — bg matches screen so it disappears when gradient fades */}
              <m.div
                className="relative p-[3px] bg-[#0a0a0f]"
                style={{ borderRadius: outerBR }}
              >
                {/* Frame gradient overlay — fades with frame */}
                <m.div
                  className="absolute inset-0 z-0"
                  style={{
                    borderRadius: outerBR,
                    background:
                      'linear-gradient(145deg, #4a4a4f 0%, #2c2c30 25%, #1a1a1e 50%, #2c2c30 75%, #4a4a4f 100%)',
                    opacity: frameOpacity,
                  }}
                />

                {/* Side buttons — fade with frame */}
                <m.div style={{ opacity: frameOpacity }} className="pointer-events-none">
                  <div
                    className="absolute -left-[5px] top-[100px] h-[28px] w-[3px] rounded-l-[2px]"
                    style={{ background: 'linear-gradient(180deg, #4a4a4f, #2c2c30)' }}
                  />
                  <div
                    className="absolute -left-[5px] top-[148px] h-[52px] w-[3px] rounded-l-[2px]"
                    style={{ background: 'linear-gradient(180deg, #4a4a4f, #2c2c30)' }}
                  />
                  <div
                    className="absolute -left-[5px] top-[210px] h-[52px] w-[3px] rounded-l-[2px]"
                    style={{ background: 'linear-gradient(180deg, #4a4a4f, #2c2c30)' }}
                  />
                  <div
                    className="absolute -right-[5px] top-[170px] h-[72px] w-[3px] rounded-r-[2px]"
                    style={{ background: 'linear-gradient(180deg, #4a4a4f, #2c2c30)' }}
                  />
                </m.div>

                {/* Inner bezel ring — black fades, bg matches screen */}
                <m.div className="relative bg-[#0a0a0f] p-[2px]" style={{ borderRadius: innerBR }}>
                  <m.div
                    className="absolute inset-0 z-0 bg-black"
                    style={{ borderRadius: innerBR, opacity: frameOpacity }}
                  />

                  {/* Screen area */}
                  <m.div
                    className="relative z-10 overflow-hidden"
                    style={{ height: phoneHeight, borderRadius: screenBR }}
                  >
                    {/* Inset shadow — fades with frame */}
                    <m.div
                      className="pointer-events-none absolute inset-0 z-20 shadow-[inset_0_0_30px_rgba(0,0,0,0.6)]"
                      style={{ opacity: frameOpacity, borderRadius: screenBR }}
                    />

                    {/* ── Dynamic Island — fades with frame ── */}
                    <m.div
                      className="absolute left-1/2 top-[11px] z-30 -translate-x-1/2"
                      style={{ opacity: frameOpacity }}
                    >
                      <div className="flex h-[30px] w-[110px] items-center justify-center rounded-full bg-black">
                        <div className="relative flex items-center gap-[10px]">
                          <div className="h-[10px] w-[10px] rounded-full bg-[#0c0c12] ring-1 ring-[#1e1e24]">
                            <div className="ml-[2px] mt-[2px] h-[6px] w-[6px] rounded-full bg-[#111116] ring-1 ring-[#1a1a20]">
                              <div className="ml-[1.5px] mt-[1.5px] h-[3px] w-[3px] rounded-full bg-[#1a1a30]" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </m.div>

                    {/* ── App content ── */}
                    <div className="relative h-full bg-[#0a0a0f]">
                      {/* iOS Status bar — fades with frame */}
                      <div className="sticky top-0 z-20 bg-[#0a0a0f]/80 px-7 pb-1 pt-[50px] backdrop-blur-xl">
                        <m.div
                          className="flex items-center justify-between"
                          style={{ opacity: frameOpacity }}
                        >
                          <span className="text-[13px] font-semibold tracking-tight text-white">
                            9:41
                          </span>
                          <div className="flex items-center gap-[5px]">
                            <div className="flex items-end gap-[1.5px]">
                              <div className="h-[4px] w-[3px] rounded-[0.5px] bg-white" />
                              <div className="h-[6px] w-[3px] rounded-[0.5px] bg-white" />
                              <div className="h-[8px] w-[3px] rounded-[0.5px] bg-white" />
                              <div className="h-[10px] w-[3px] rounded-[0.5px] bg-white" />
                            </div>
                            <svg
                              width="14"
                              height="10"
                              viewBox="0 0 14 10"
                              className="ml-0.5 text-white"
                            >
                              <path
                                d="M7 9.5a1.25 1.25 0 100-2.5 1.25 1.25 0 000 2.5z"
                                fill="currentColor"
                              />
                              <path
                                d="M4.05 6.45a4.2 4.2 0 015.9 0"
                                stroke="currentColor"
                                strokeWidth="1.2"
                                fill="none"
                                strokeLinecap="round"
                              />
                              <path
                                d="M1.75 4.05a7.35 7.35 0 0110.5 0"
                                stroke="currentColor"
                                strokeWidth="1.2"
                                fill="none"
                                strokeLinecap="round"
                              />
                            </svg>
                            <div className="relative ml-0.5 flex items-center">
                              <div className="relative h-[11px] w-[22px] rounded-[3px] border border-white/50">
                                <div
                                  className="absolute inset-[1.5px] rounded-[1.5px] bg-white"
                                  style={{ width: 'calc(100% - 3px)' }}
                                />
                              </div>
                              <div className="ml-[1px] h-[4px] w-[1.5px] rounded-r-[1px] bg-white/50" />
                            </div>
                          </div>
                        </m.div>
                      </div>

                      {/* ── Scrollable content: header + cards ── */}
                      <m.div style={{ y: cardsY }}>
                        <m.div
                          className="px-5 pb-3 pt-1"
                          {...(skip
                            ? {}
                            : {
                                initial: { opacity: 0, y: 30 },
                                whileInView: { opacity: 1, y: 0 },
                                viewport: vp,
                              })}
                          transition={{ duration: 0.6, delay: 0.2, ease: cardEase }}
                        >
                          <DashboardHeader compact />
                        </m.div>

                        <div className="space-y-3 px-4 pb-20">
                          <m.div
                            {...(skip
                              ? {}
                              : {
                                  initial: { opacity: 0, y: 50 },
                                  whileInView: { opacity: 1, y: 0 },
                                  viewport: vp,
                                })}
                            transition={{ duration: 0.6, delay: 0.4, ease: cardEase }}
                          >
                            <SiteBriefing />
                          </m.div>

                          <m.div
                            {...(skip
                              ? {}
                              : {
                                  initial: { opacity: 0, y: 50 },
                                  whileInView: { opacity: 1, y: 0 },
                                  viewport: vp,
                                })}
                            transition={{ duration: 0.6, delay: 0.7, ease: cardEase }}
                          >
                            <WeatherBar />
                          </m.div>

                          <m.div
                            {...(skip
                              ? {}
                              : {
                                  initial: { opacity: 0, y: 50 },
                                  whileInView: { opacity: 1, y: 0 },
                                  viewport: vp,
                                })}
                            transition={{ duration: 0.6, delay: 1.0, ease: cardEase }}
                          >
                            <TeamMembers />
                          </m.div>

                          <m.div
                            {...(skip
                              ? {}
                              : {
                                  initial: { opacity: 0, y: 50 },
                                  whileInView: { opacity: 1, y: 0 },
                                  viewport: vp,
                                })}
                            transition={{ duration: 0.6, delay: 1.3, ease: cardEase }}
                          >
                            <NoiseActivityForecast />
                          </m.div>

                          <m.div
                            {...(skip
                              ? {}
                              : {
                                  initial: { opacity: 0, y: 50 },
                                  whileInView: { opacity: 1, y: 0 },
                                  viewport: vp,
                                })}
                            transition={{ duration: 0.6, delay: 1.6, ease: cardEase }}
                          >
                            <WarningAlert />
                          </m.div>

                          <m.div
                            {...(skip
                              ? {}
                              : {
                                  initial: { opacity: 0, y: 50 },
                                  whileInView: { opacity: 1, y: 0 },
                                  viewport: vp,
                                })}
                            transition={{ duration: 0.6, delay: 1.9, ease: cardEase }}
                          >
                            <DeliveryAlert />
                          </m.div>

                          <m.div
                            {...(skip
                              ? {}
                              : {
                                  initial: { opacity: 0, y: 50 },
                                  whileInView: { opacity: 1, y: 0 },
                                  viewport: vp,
                                })}
                            transition={{ duration: 0.6, delay: 2.2, ease: cardEase }}
                          >
                            <EscrowStatus />
                          </m.div>

                          <m.div
                            {...(skip
                              ? {}
                              : {
                                  initial: { opacity: 0, y: 50 },
                                  whileInView: { opacity: 1, y: 0 },
                                  viewport: vp,
                                })}
                            transition={{ duration: 0.6, delay: 2.5, ease: cardEase }}
                          >
                            <ProgressPhotos />
                          </m.div>

                          <m.div
                            {...(skip
                              ? {}
                              : {
                                  initial: { opacity: 0, y: 50 },
                                  whileInView: { opacity: 1, y: 0 },
                                  viewport: vp,
                                })}
                            transition={{ duration: 0.6, delay: 2.8, ease: cardEase }}
                          >
                            <InspectionsMilestones />
                          </m.div>

                          <m.div
                            {...(skip
                              ? {}
                              : {
                                  initial: { opacity: 0, y: 50 },
                                  whileInView: { opacity: 1, y: 0 },
                                  viewport: vp,
                                })}
                            transition={{ duration: 0.6, delay: 3.1, ease: cardEase }}
                          >
                            <HealthHazardStatus />
                          </m.div>
                        </div>
                      </m.div>

                      {/* Bottom tab bar — fixed at phone bottom */}
                      <BottomTabBar />
                    </div>

                    {/* Glass reflection overlay */}
                    <m.div
                      className="pointer-events-none absolute inset-0 z-20 bg-gradient-to-br from-white/[0.04] via-transparent to-transparent"
                      style={{ opacity: frameOpacity, borderRadius: screenBR }}
                    />
                  </m.div>
                </m.div>
              </m.div>
            </m.div>
          </div>
        </div>
      </div>
    </LazyMotion>
  );
}
