'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  AttendanceShowcase,
  JSAFormShowcase,
  ConcreteShowcase,
  CertExpiryShowcase,
  WorkAreaShowcase,
  GanttShowcase,
} from '@/components/landing/jsa-showcases';
import { DashboardBrowserFrame } from '@/components/landing/dashboard-browser-frame';
import { SiteBriefing } from '@/components/dashboard/site-briefing';
import { EscrowStatus } from '@/components/dashboard/escrow-status';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
};

const stats = [
  { value: '25+', label: 'Field Modules' },
  { value: '±3m', label: 'GPS Accuracy' },
  { value: '<30s', label: 'Clock-In Time' },
  { value: '100%', label: 'Paperless' },
  { value: '0', label: 'Extra Cost to Client' },
  { value: '24hr', label: 'Proof Delivery' },
];

const modules = [
  {
    id: 'attendance',
    number: '01',
    headline: "Know who's on your site. Right now.",
    description:
      'GPS-verified clock-in from any phone. No paper timesheets, no manual roll calls, no buddy-punching.',
    accentColor: 'reno-green',
    showcase: <AttendanceShowcase />,
    bullets: [
      'Real-time headcount by trade',
      'GPS accuracy within 3 metres',
      'Automatic timesheet generation',
      'Late arrival alerts',
    ],
    textLeft: true,
  },
  {
    id: 'safety',
    number: '02',
    headline: "Safety forms that don't slow you down.",
    description:
      'Digital JSA forms with hazard checklists, crew sign-off, and automatic archiving. Done before the toolbox talk ends.',
    accentColor: 'amber-500',
    showcase: <JSAFormShowcase />,
    bullets: [
      'Pre-built hazard libraries',
      'Crew digital sign-off',
      'Auto-archived for audits',
      'Incident tracking built in',
    ],
    textLeft: false,
  },
  {
    id: 'schedule',
    number: '03',
    headline: 'Critical path. Not guesswork.',
    description:
      'Gantt-style scheduling built for construction. Dependencies, weather delays, crew assignments — see the real timeline.',
    accentColor: 'reno-teal',
    showcase: <GanttShowcase />,
    bullets: [
      'Drag-and-drop scheduling',
      'Dependency tracking',
      'Weather delay integration',
      'Crew workload balancing',
    ],
    textLeft: true,
  },
  {
    id: 'areas',
    number: '04',
    headline: 'Track progress by zone.',
    description:
      'Break your site into work areas and track completion percentage, active trades, and blockers per zone.',
    accentColor: 'reno-purple',
    showcase: <WorkAreaShowcase />,
    bullets: [
      'Zone-by-zone tracking',
      'Completion percentages',
      'Trade overlap detection',
      'Blocker flagging',
    ],
    textLeft: false,
  },
  {
    id: 'concrete',
    number: '05',
    headline: 'Every pour. Every load. Every slump test.',
    description:
      'Full concrete tracking from batch plant to placement. Tickets, slump tests, air content, pour temps — all timestamped.',
    accentColor: 'blue-500',
    showcase: <ConcreteShowcase />,
    bullets: [
      'Batch ticket capture',
      'Slump & air testing',
      'Pour temperature logging',
      'Placement photo proof',
    ],
    textLeft: true,
  },
  {
    id: 'compliance',
    number: '06',
    headline: 'Certs, tickets, incidents. All tracked.',
    description:
      'Worker certifications, trade tickets, safety incidents — tracked with expiry alerts so nothing slips through.',
    accentColor: 'amber-500',
    showcase: <CertExpiryShowcase />,
    bullets: [
      'Cert expiry warnings',
      'Trade ticket verification',
      'Incident log with photos',
      'Audit-ready reports',
    ],
    textLeft: false,
  },
];

const beforeItems = [
  '6 different tools',
  '$400/mo in subscriptions',
  '12h/week admin work',
  'Paper forms & manual uploads',
  '"Where are my photos?" emails',
  'Payment disputes',
];

const afterItems = [
  '1 unified app',
  '$0/mo for field app',
  '2h/week admin work',
  'Automatic GPS-tagged proof',
  'Client dashboard updates itself',
  'Vault-secured milestone payments',
];

export function PlatformPage() {
  const handleSeeItInAction = () => {
    document.getElementById('modules')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="bg-[#0a0a0f] text-white">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Dot Grid Background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255, 255, 255, 0.07) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative z-10 container mx-auto px-4 py-24">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-5xl mx-auto text-center"
          >
            <motion.h1
              variants={itemVariants}
              className="font-display text-5xl sm:text-6xl lg:text-7xl text-white mb-6"
            >
              Site Command.
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="font-body text-xl sm:text-2xl text-white/60 mb-12 max-w-3xl mx-auto"
            >
              GPS attendance. Safety forms. Concrete tracking. Schedule. RFIs.
              One app. Zero paper.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-20"
            >
              <Button
                variant="outline"
                size="lg"
                onClick={handleSeeItInAction}
                className="text-base bg-transparent border-white/20 text-white hover:bg-white/10 hover:border-white/30"
              >
                See It In Action
              </Button>
              <Button
                asChild
                size="lg"
                className="text-base bg-reno-green hover:bg-reno-green/90 text-white"
              >
                <Link href="/join">Request Access</Link>
              </Button>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
              variants={containerVariants}
              className="grid grid-cols-3 lg:grid-cols-6 gap-4 max-w-4xl mx-auto"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="bg-white/[0.05] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-6"
                >
                  <div className="font-mono text-2xl sm:text-3xl text-white mb-2">
                    {stat.value}
                  </div>
                  <div className="font-body text-xs sm:text-sm text-white/60">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Module Sections */}
      <div id="modules">
        {modules.map((module, index) => (
          <section
            key={module.id}
            className={index % 2 === 0 ? 'bg-[#0a0a0f]' : 'bg-[#0c0c12]'}
          >
            <div className="container mx-auto px-4 py-24">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                  !module.textLeft ? 'lg:grid-flow-dense' : ''
                }`}
              >
                {/* Text Column */}
                <div className={module.textLeft ? '' : 'lg:col-start-2'}>
                  <div className="font-mono text-xs tracking-widest text-white/30 uppercase mb-4">
                    {module.number}
                  </div>

                  <h2 className="font-display text-3xl sm:text-4xl text-white mb-6">
                    {module.headline}
                  </h2>

                  <p className="font-body text-lg text-white/60 mb-8">
                    {module.description}
                  </p>

                  <ul className="space-y-4">
                    {module.bullets.map((bullet, bulletIndex) => (
                      <li key={bulletIndex} className="flex items-start gap-3">
                        <div
                          className={`w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0 ${
                            module.accentColor === 'reno-green'
                              ? 'bg-reno-green'
                              : module.accentColor === 'reno-teal'
                              ? 'bg-reno-teal'
                              : module.accentColor === 'reno-purple'
                              ? 'bg-reno-purple'
                              : module.accentColor === 'amber-500'
                              ? 'bg-amber-500'
                              : 'bg-primary-500'
                          }`}
                        />
                        <span className="font-body text-white/70">
                          {bullet}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Showcase Column */}
                <div className={module.textLeft ? '' : 'lg:col-start-1'}>
                  <div className="transform scale-[0.85] origin-top">
                    {module.showcase}
                  </div>
                </div>
              </motion.div>
            </div>
          </section>
        ))}
      </div>

      {/* The Byproduct Section */}
      <section className="relative bg-[#0a0a0f] border-t border-white/5">
        {/* Dot Grid Background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255, 255, 255, 0.07) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative z-10 container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-12">
              <div className="font-mono text-xs tracking-widest text-white/30 uppercase mb-6">
                THE BYPRODUCT
              </div>

              <h2 className="font-display text-4xl sm:text-5xl text-white mb-8">
                Your client gets a command center.
                <br />
                You don't do extra work.
              </h2>

              <div className="bg-white/[0.05] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8 mb-12 max-w-3xl mx-auto">
                <p className="font-body text-xl italic text-white/80">
                  "You use it for your operations. The proof for the homeowner
                  is a byproduct."
                </p>
              </div>
            </div>

            <div className="mb-6">
              <DashboardBrowserFrame variant="green">
                <div className="space-y-6 p-6">
                  <SiteBriefing />
                  <EscrowStatus />
                </div>
              </DashboardBrowserFrame>
            </div>

            <p className="text-center font-body text-sm text-white/40 max-w-2xl mx-auto">
              The same data you enter for operations becomes a polished client
              dashboard automatically.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Before/After Section */}
      <section className="bg-[#0c0c12]">
        <div className="container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto"
          >
            {/* Before Card */}
            <div className="bg-white/[0.05] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-red-500" />
                <h3 className="font-display text-2xl text-red-500">Before</h3>
              </div>

              <ul className="space-y-4">
                {beforeItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 flex-shrink-0" />
                    <span className="font-body text-white/70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* After Card */}
            <div className="bg-white/[0.05] backdrop-blur-xl border border-white/[0.08] rounded-2xl p-8">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 rounded-full bg-reno-green" />
                <h3 className="font-display text-2xl text-reno-green">After</h3>
              </div>

              <ul className="space-y-4">
                {afterItems.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-reno-green mt-2 flex-shrink-0" />
                    <span className="font-body text-white/70">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="relative bg-[#0a0a0f]">
        {/* Dot Grid Background */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255, 255, 255, 0.07) 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        <div className="relative z-10 container mx-auto px-4 py-24">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl text-white mb-6">
              Built for the field. Not the office.
            </h2>

            <p className="font-body text-xl text-white/60 mb-12">
              Join the network of contractors who run their entire site from one
              app.
            </p>

            <Button
              asChild
              size="lg"
              className="text-lg px-8 py-6 bg-reno-green hover:bg-reno-green/90 text-white mb-8"
            >
              <Link href="/join">Request Early Access</Link>
            </Button>

            <p className="font-mono text-xs text-white/40">
              Application reviewed in 48 hours • No credit card required • Free
              for field app
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
