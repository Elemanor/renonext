'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { getModuleById, whmisPictograms, whmisModules, getPictogramById } from '@/lib/data/whmis-course';

export default function WHMISModulePage() {
  const params = useParams();
  const moduleId = Number(params.id);
  const mod = getModuleById(moduleId);

  if (!mod) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-[#f6f8f8]">
        <div className="text-center">
          <span className="material-symbols-outlined text-slate-300 text-6xl mb-4 block">error</span>
          <h1 className="text-2xl font-bold text-[#102122] mb-2">Module Not Found</h1>
          <p className="text-slate-500 mb-6">This module doesn&apos;t exist.</p>
          <Link
            href="/whmis"
            className="inline-flex items-center gap-2 bg-[#0fbabd] text-white px-6 py-3 rounded-xl font-bold"
          >
            Back to Course
          </Link>
        </div>
      </main>
    );
  }

  const totalModules = whmisModules.length;
  const prevModule = moduleId > 1 ? moduleId - 1 : null;
  const nextModule = moduleId < totalModules ? moduleId + 1 : null;
  const progressPercent = (moduleId / totalModules) * 100;
  const isPictogramModule = moduleId === 3;
  const isSDSModule = moduleId === 5;

  return (
    <main className="min-h-screen bg-[#f6f8f8]">
      {/* Top navigation bar */}
      <div className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="mx-auto max-w-7xl px-6 py-3">
          <div className="flex items-center justify-between">
            <Link
              href="/whmis"
              className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-[#0fbabd] transition-colors"
            >
              <span className="material-symbols-outlined text-base">arrow_back</span>
              Course Overview
            </Link>
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-[#102122]">
                Module {mod.order} of {totalModules}
              </span>
            </div>
            <div className="flex items-center gap-2">
              {prevModule && (
                <Link
                  href={`/whmis/module/${prevModule}`}
                  className="flex items-center gap-1 text-sm text-slate-500 hover:text-[#0fbabd] transition-colors"
                >
                  <span className="material-symbols-outlined text-base">chevron_left</span>
                  Prev
                </Link>
              )}
              {nextModule ? (
                <Link
                  href={`/whmis/module/${nextModule}`}
                  className="flex items-center gap-1 text-sm text-slate-500 hover:text-[#0fbabd] transition-colors"
                >
                  Next
                  <span className="material-symbols-outlined text-base">chevron_right</span>
                </Link>
              ) : (
                <Link
                  href="/whmis/quiz"
                  className="flex items-center gap-1 text-sm font-bold text-[#0fbabd] hover:underline"
                >
                  Take Quiz
                  <span className="material-symbols-outlined text-base">chevron_right</span>
                </Link>
              )}
            </div>
          </div>
          {/* Progress bar */}
          <div className="mt-2 h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#0fbabd] to-[#0d9699] rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Module header */}
      <section className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#0fbabd]/10 to-[#0d9699]/10 flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-[#0fbabd] text-xl"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  {mod.icon}
                </span>
              </div>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Module {mod.order}
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-[#102122] tracking-tight">
                  {mod.title}
                </h1>
              </div>
            </div>
            <p className="text-slate-500 text-lg max-w-2xl">{mod.description}</p>
          </div>
        </div>
      </section>

      {/* Content area */}
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Main content column */}
          <div className="lg:col-span-2 space-y-10">
            {/* Learning objectives */}
            <div className="bg-gradient-to-br from-[#0fbabd]/5 to-[#0d9699]/5 border border-[#0fbabd]/20 rounded-2xl p-6">
              <h3 className="text-sm font-bold text-[#0fbabd] uppercase tracking-widest mb-4 flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-base"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  target
                </span>
                Learning Objectives
              </h3>
              <ul className="space-y-2">
                {mod.learningObjectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <span
                      className="material-symbols-outlined text-[#0fbabd] text-base mt-0.5 flex-shrink-0"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      check_circle
                    </span>
                    {obj}
                  </li>
                ))}
              </ul>
            </div>

            {/* Sections */}
            {mod.sections.map((section, idx) => (
              <div key={idx} className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#102122] mb-5 flex items-center gap-2">
                  <span className="w-8 h-8 rounded-lg bg-[#0fbabd]/10 flex items-center justify-center text-sm font-extrabold text-[#0fbabd]">
                    {idx + 1}
                  </span>
                  {section.heading}
                </h2>

                <div className="space-y-4">
                  {section.paragraphs.map((para, pIdx) => (
                    <p key={pIdx} className="text-slate-600 leading-relaxed">
                      {para}
                    </p>
                  ))}
                </div>

                {/* Pictograms referenced in this section */}
                {section.pictogramIds && section.pictogramIds.length > 0 && (
                  <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4">
                    {section.pictogramIds.map((pId) => {
                      const pic = getPictogramById(pId);
                      if (!pic) return null;
                      return (
                        <div
                          key={pId}
                          className="bg-[#f6f8f8] rounded-xl border border-slate-200 p-4 flex flex-col items-center text-center"
                        >
                          <div className="w-16 h-16 mb-3 relative">
                            <Image
                              src={`/pictograms/${pic.svgFile}`}
                              alt={pic.name}
                              width={64}
                              height={64}
                              className="w-full h-full"
                            />
                          </div>
                          <h4 className="text-sm font-bold text-[#102122] mb-1">{pic.name}</h4>
                          <p className="text-xs text-slate-500">{pic.meaning}</p>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            ))}

            {/* Full pictogram gallery for Module 3 */}
            {isPictogramModule && (
              <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
                <h2 className="text-xl md:text-2xl font-bold text-[#102122] mb-6">
                  Complete Pictogram Reference
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  {whmisPictograms.map((pic) => (
                    <div
                      key={pic.id}
                      className="bg-[#f6f8f8] rounded-xl border border-slate-200 p-5 flex flex-col items-center text-center hover:shadow-md transition-shadow"
                    >
                      <div className="w-20 h-20 mb-3 relative">
                        <Image
                          src={`/pictograms/${pic.svgFile}`}
                          alt={pic.name}
                          width={80}
                          height={80}
                          className="w-full h-full"
                        />
                      </div>
                      <h4 className="text-base font-bold text-[#102122] mb-1">{pic.name}</h4>
                      <p className="text-xs text-slate-500 mb-3">{pic.meaning}</p>
                      <div className="flex flex-wrap gap-1 justify-center">
                        {pic.examples.map((ex, i) => (
                          <span
                            key={i}
                            className="text-[10px] font-medium bg-red-50 text-red-700 px-2 py-0.5 rounded-full"
                          >
                            {ex}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* SDS 16-section accordion for Module 5 */}
            {isSDSModule && <SDSSectionList />}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Key Facts */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6 sticky top-24">
              <h3 className="text-sm font-bold text-[#102122] uppercase tracking-widest mb-4 flex items-center gap-2">
                <span
                  className="material-symbols-outlined text-amber-500 text-base"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  lightbulb
                </span>
                Key Facts
              </h3>
              <div className="space-y-3">
                {mod.keyFacts.map((fact, i) => (
                  <div key={i} className="flex items-start gap-2.5">
                    <span className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-[10px] font-extrabold text-amber-700">{i + 1}</span>
                    </span>
                    <p className="text-sm text-slate-600 leading-relaxed">{fact}</p>
                  </div>
                ))}
              </div>

              {/* Estimated time */}
              <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2 text-sm text-slate-400">
                <span className="material-symbols-outlined text-base">schedule</span>
                ~{mod.estimatedMinutes} min read
              </div>
            </div>

            {/* Navigation card */}
            <div className="bg-white rounded-2xl border border-slate-200 p-6">
              <h3 className="text-sm font-bold text-[#102122] uppercase tracking-widest mb-4">
                Course Navigation
              </h3>
              <div className="space-y-1.5">
                {whmisModules.map((m) => (
                  <Link
                    key={m.id}
                    href={`/whmis/module/${m.id}`}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                      m.id === moduleId
                        ? 'bg-[#0fbabd]/10 text-[#0fbabd] font-bold'
                        : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-bold flex-shrink-0">
                      {m.order}
                    </span>
                    <span className="truncate">{m.title}</span>
                  </Link>
                ))}
                <Link
                  href="/whmis/quiz"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm text-slate-500 hover:bg-slate-50 hover:text-slate-700 transition-colors"
                >
                  <span
                    className="material-symbols-outlined text-base"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    quiz
                  </span>
                  <span>Final Quiz</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom navigation */}
      <section className="bg-white border-t border-slate-200">
        <div className="mx-auto max-w-7xl px-6 py-8">
          <div className="flex items-center justify-between">
            {prevModule ? (
              <Link
                href={`/whmis/module/${prevModule}`}
                className="flex items-center gap-2 text-slate-500 hover:text-[#0fbabd] transition-colors group"
              >
                <span className="material-symbols-outlined text-xl group-hover:-translate-x-1 transition-transform">
                  arrow_back
                </span>
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-widest">Previous</div>
                  <div className="text-sm font-bold">Module {prevModule}</div>
                </div>
              </Link>
            ) : (
              <div />
            )}
            {nextModule ? (
              <Link
                href={`/whmis/module/${nextModule}`}
                className="flex items-center gap-2 text-slate-500 hover:text-[#0fbabd] transition-colors group text-right"
              >
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-widest">Next</div>
                  <div className="text-sm font-bold">Module {nextModule}</div>
                </div>
                <span className="material-symbols-outlined text-xl group-hover:translate-x-1 transition-transform">
                  arrow_forward
                </span>
              </Link>
            ) : (
              <Link
                href="/whmis/quiz"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0fbabd] to-[#0d9699] text-white px-6 py-3 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
              >
                <span
                  className="material-symbols-outlined"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  quiz
                </span>
                Take the Quiz
              </Link>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

/* ================================================================
   SDS 16-Section Reference (Module 5 only)
   ================================================================ */
const sdsSections = [
  { num: 1, title: 'Identification', desc: 'Product identifier, manufacturer/supplier info, recommended use, restrictions, emergency phone number.' },
  { num: 2, title: 'Hazard Identification', desc: 'GHS classification, label elements (pictograms, signal words, hazard/precautionary statements), other hazards.' },
  { num: 3, title: 'Composition / Information on Ingredients', desc: 'Chemical name, common names, CAS numbers, concentration ranges for mixtures.' },
  { num: 4, title: 'First-Aid Measures', desc: 'Necessary measures by route of exposure (inhalation, skin, eye, ingestion), symptoms, and need for medical attention.' },
  { num: 5, title: 'Fire-Fighting Measures', desc: 'Suitable extinguishing media, specific hazards from the chemical, special protective equipment for firefighters.' },
  { num: 6, title: 'Accidental Release Measures', desc: 'Personal precautions, protective equipment, emergency procedures, containment and cleanup methods.' },
  { num: 7, title: 'Handling and Storage', desc: 'Safe handling practices, conditions for safe storage (temperature, incompatible materials, ventilation).' },
  { num: 8, title: 'Exposure Controls / Personal Protection', desc: 'Occupational exposure limits (OELs), engineering controls, PPE requirements (respiratory, hand, eye, skin).' },
  { num: 9, title: 'Physical and Chemical Properties', desc: 'Appearance, odour, pH, melting/boiling point, flash point, vapour pressure, density, solubility.' },
  { num: 10, title: 'Stability and Reactivity', desc: 'Chemical stability, possible hazardous reactions, conditions to avoid, incompatible materials, hazardous decomposition products.' },
  { num: 11, title: 'Toxicological Information', desc: 'Routes of exposure, symptoms, acute and chronic effects, LD50/LC50 data, carcinogenicity, mutagenicity.' },
  { num: 12, title: 'Ecological Information', desc: 'Toxicity to aquatic organisms, persistence, bioaccumulation potential, mobility in soil.' },
  { num: 13, title: 'Disposal Considerations', desc: 'Waste treatment methods, safe disposal of contaminated packaging, applicable regulations.' },
  { num: 14, title: 'Transport Information', desc: 'UN number, shipping name, transport hazard class, packing group, environmental hazards.' },
  { num: 15, title: 'Regulatory Information', desc: 'Safety, health, and environmental regulations specific to the product (WHMIS classification, CEPA, etc.).' },
  { num: 16, title: 'Other Information', desc: 'Date of SDS preparation or last revision, abbreviations, key references and data sources.' },
];

function SDSSectionList() {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
      <h2 className="text-xl md:text-2xl font-bold text-[#102122] mb-2">
        The 16 Sections of an SDS
      </h2>
      <p className="text-slate-500 text-sm mb-6">
        Every Safety Data Sheet follows this standardized 16-section format. Sections 1-8 are prepared by
        the supplier; sections 12-15 may vary by jurisdiction.
      </p>
      <div className="space-y-3">
        {sdsSections.map((s) => (
          <div
            key={s.num}
            className="flex items-start gap-3 p-4 rounded-xl bg-[#f6f8f8] border border-slate-100 hover:border-[#0fbabd]/20 transition-colors"
          >
            <span className="w-8 h-8 rounded-lg bg-[#0fbabd]/10 flex items-center justify-center text-sm font-extrabold text-[#0fbabd] flex-shrink-0">
              {s.num}
            </span>
            <div>
              <h4 className="text-sm font-bold text-[#102122]">{s.title}</h4>
              <p className="text-xs text-slate-500 mt-0.5">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
