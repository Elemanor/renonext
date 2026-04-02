import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { whmisModules, whmisPictograms } from '@/lib/data/whmis-course';

export const metadata: Metadata = {
  title: 'Free WHMIS 2015 Training Course | RenoNext',
  description: 'Complete your WHMIS 2015 training online for free. Learn to identify hazards, read labels and Safety Data Sheets, and earn your certificate — no account required.',
  openGraph: {
    title: 'Free WHMIS 2015 Training Course | RenoNext',
    description: 'Complete your WHMIS 2015 training online for free. Learn to identify hazards, read labels and Safety Data Sheets, and earn your certificate — no account required.',
  },
};

const stats = [
  { label: 'Modules', value: '7', icon: 'menu_book' },
  { label: 'Questions', value: '20', icon: 'quiz' },
  { label: 'Duration', value: '~1 hr', icon: 'schedule' },
  { label: 'Certificate', value: 'Free', icon: 'workspace_premium' },
];

const learningOutcomes = [
  'Identify all 9 GHS pictograms and their meanings',
  'Read and interpret supplier and workplace labels',
  'Navigate all 16 sections of a Safety Data Sheet (SDS)',
  'Understand hazard classification for physical and health hazards',
  'Select appropriate Personal Protective Equipment (PPE)',
  'Know your rights: right to know, participate, and refuse unsafe work',
];

export default function WHMISLandingPage() {
  return (
    <main className="overflow-hidden">
      {/* ============================================================
          HERO SECTION
          ============================================================ */}
      <section className="relative bg-white overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/4 pointer-events-none" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-20 pb-16 lg:pt-28 lg:pb-20">
          <div className="max-w-3xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-600/10 to-cyan-600/10 px-4 py-1.5 rounded-full border border-teal-500/20 mb-8">
              <span
                className="material-symbols-outlined text-[#0fbabd] text-sm"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                school
              </span>
              <span className="text-xs font-bold uppercase tracking-widest text-teal-700">
                Free WHMIS Training
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-7xl font-extrabold text-[#102122] leading-[1.05] tracking-tight mb-6">
              WHMIS 2015
              <br />
              <span className="bg-gradient-to-r from-[#0fbabd] to-[#0d9699] bg-clip-text text-transparent">
                Training Course
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-slate-500 max-w-2xl mx-auto font-light leading-relaxed mb-10">
              Complete your Workplace Hazardous Materials Information System training
              online. Learn to identify hazards, read labels and Safety Data Sheets,
              and earn your certificate — all for free.
            </p>

            {/* CTA */}
            <Link
              href="/whmis/module/1"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0fbabd] to-[#0d9699] text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                play_circle
              </span>
              Start Course
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          STATS ROW
          ============================================================ */}
      <section className="bg-[#f6f8f8] border-y border-slate-200">
        <div className="mx-auto max-w-5xl px-6 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat) => (
              <div key={stat.label} className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center shadow-sm">
                  <span
                    className="material-symbols-outlined text-[#0fbabd] text-xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    {stat.icon}
                  </span>
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-[#102122]">{stat.value}</div>
                  <div className="text-xs text-slate-500 font-medium uppercase tracking-wider">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          PICTOGRAM PREVIEW
          ============================================================ */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-10">
            <span className="text-xs font-bold text-[#0fbabd] uppercase tracking-widest">
              You&apos;ll Learn to Identify
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-[#102122] mt-3 tracking-tight">
              9 GHS Hazard Pictograms
            </h2>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-4 max-w-4xl mx-auto">
            {whmisPictograms.map((p) => (
              <div key={p.id} className="flex flex-col items-center gap-2 group">
                <div className="w-16 h-16 relative transition-transform group-hover:scale-110">
                  <Image
                    src={`/pictograms/${p.svgFile}`}
                    alt={p.name}
                    width={64}
                    height={64}
                    className="w-full h-full"
                  />
                </div>
                <span className="text-[10px] font-bold text-slate-600 text-center leading-tight">
                  {p.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          MODULE GRID
          ============================================================ */}
      <section className="bg-[#f6f8f8] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="text-center mb-14">
            <span className="text-xs font-bold text-[#0fbabd] uppercase tracking-widest">
              Course Outline
            </span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-[#102122] mt-3 tracking-tight">
              7 Comprehensive Modules
            </h2>
            <p className="text-slate-500 mt-4 max-w-2xl mx-auto text-lg">
              Each module covers a critical aspect of WHMIS 2015. Complete all seven,
              then take the final quiz to earn your certificate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {whmisModules.map((mod) => (
              <Link
                key={mod.id}
                href={`/whmis/module/${mod.id}`}
                className="group bg-white rounded-2xl border border-slate-200 p-6 hover:shadow-lg hover:border-[#0fbabd]/30 transition-all"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0fbabd]/10 to-[#0d9699]/10 flex items-center justify-center flex-shrink-0 group-hover:from-[#0fbabd]/20 group-hover:to-[#0d9699]/20 transition-colors">
                    <span
                      className="material-symbols-outlined text-[#0fbabd] text-xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {mod.icon}
                    </span>
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                      Module {mod.order}
                    </div>
                    <h3 className="text-lg font-bold text-[#102122] group-hover:text-[#0fbabd] transition-colors leading-tight">
                      {mod.title}
                    </h3>
                  </div>
                </div>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">
                  {mod.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-slate-400 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">schedule</span>
                    ~{mod.estimatedMinutes} min
                  </span>
                  <span className="text-xs font-bold text-[#0fbabd] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    Start
                    <span className="material-symbols-outlined text-sm">arrow_forward</span>
                  </span>
                </div>
              </Link>
            ))}

            {/* Quiz Card */}
            <Link
              href="/whmis/quiz"
              className="group bg-gradient-to-br from-[#102122] to-[#1a3435] rounded-2xl border border-[#0fbabd]/20 p-6 hover:shadow-lg hover:border-[#0fbabd]/40 transition-all"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-[#0fbabd]/20 flex items-center justify-center flex-shrink-0">
                  <span
                    className="material-symbols-outlined text-[#0fbabd] text-xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    quiz
                  </span>
                </div>
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    Final Assessment
                  </div>
                  <h3 className="text-lg font-bold text-white group-hover:text-[#0fbabd] transition-colors leading-tight">
                    Take the Quiz
                  </h3>
                </div>
              </div>
              <p className="text-sm text-slate-400 leading-relaxed mb-4">
                20 multiple-choice questions covering all modules. Score 80% or higher
                to earn your certificate.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-500 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">timer</span>
                  ~15 min
                </span>
                <span className="text-xs font-bold text-[#0fbabd] flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  Begin Quiz
                  <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================================
          LEARNING OUTCOMES
          ============================================================ */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-5xl px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-bold text-[#0fbabd] uppercase tracking-widest">
                What You&apos;ll Learn
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-[#102122] mt-3 mb-8 tracking-tight">
                Key Learning Outcomes
              </h2>
              <div className="space-y-4">
                {learningOutcomes.map((outcome, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <span
                      className="material-symbols-outlined text-[#0fbabd] text-lg mt-0.5 flex-shrink-0"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    <span className="text-slate-700">{outcome}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Info card */}
            <div className="bg-gradient-to-br from-[#f6f8f8] to-white rounded-2xl border border-slate-200 p-8">
              <h3 className="text-xl font-bold text-[#102122] mb-4">About This Course</h3>
              <div className="space-y-4 text-sm text-slate-600 leading-relaxed">
                <p>
                  This free WHMIS 2015 training covers the <strong>generic education</strong> component
                  required under the Hazardous Products Act. It aligns with the Globally Harmonized
                  System of Classification and Labelling of Chemicals (GHS).
                </p>
                <p>
                  After completing all 7 modules and passing the quiz with 80% or higher,
                  you&apos;ll receive a downloadable PDF certificate of completion.
                </p>
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mt-4">
                  <div className="flex items-start gap-2">
                    <span className="material-symbols-outlined text-amber-600 text-lg flex-shrink-0">
                      info
                    </span>
                    <p className="text-xs text-amber-800">
                      <strong>Important:</strong> This course provides generic WHMIS education.
                      Employers must also provide workplace-specific training on the hazardous
                      products used at your particular workplace.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================
          BOTTOM CTA
          ============================================================ */}
      <section className="bg-gradient-to-br from-[#102122] to-[#1a3435] py-20">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <span
            className="material-symbols-outlined text-[#0fbabd] text-5xl mb-6 inline-block"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            workspace_premium
          </span>
          <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-4 tracking-tight">
            Ready to Get Certified?
          </h2>
          <p className="text-slate-400 mb-8 text-lg max-w-xl mx-auto">
            Start Module 1 and work through at your own pace. No account needed,
            no payment required.
          </p>
          <Link
            href="/whmis/module/1"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0fbabd] to-[#0d9699] text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
          >
            <span
              className="material-symbols-outlined"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              play_circle
            </span>
            Start Module 1
          </Link>
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm text-slate-500">
            <span className="flex items-center gap-1.5">
              <span
                className="material-symbols-outlined text-[#0fbabd] text-base"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                verified
              </span>
              Covers all WHMIS 2015 requirements
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="material-symbols-outlined text-[#0fbabd] text-base"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                workspace_premium
              </span>
              Certificate on completion
            </span>
            <span className="flex items-center gap-1.5">
              <span
                className="material-symbols-outlined text-[#0fbabd] text-base"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                lock_open
              </span>
              No account required
            </span>
          </div>
        </div>
      </section>
    </main>
  );
}
