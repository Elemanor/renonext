'use client';

import { useState, useEffect, useMemo, Suspense } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface QuizResult {
  score: number;
  total: number;
  passed: boolean;
  completedAt: string;
}

function CertificateContent() {
  const router = useRouter();
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [fullName, setFullName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const today = new Date().toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const certificateNumber = useMemo(() => {
    if (!quizResult) return '';
    const ts = new Date(quizResult.completedAt).getTime();
    return `WHMIS-${ts.toString(36).toUpperCase()}`;
  }, [quizResult]);

  useEffect(() => {
    const stored = sessionStorage.getItem('whmis-quiz-result');
    if (stored) {
      const parsed = JSON.parse(stored) as QuizResult;
      if (parsed.passed) {
        setQuizResult(parsed);
        setLoading(false);
        return;
      }
    }
    // Not passed or no result — redirect
    router.push('/whmis/quiz');
  }, [router]);

  const handleDownloadPDF = async () => {
    if (!quizResult || !fullName.trim()) return;

    setIsGeneratingPdf(true);
    try {
      const { pdf } = await import('@react-pdf/renderer');
      const { CertificatePDF } = await import('@/components/whmis/certificate-pdf');

      const blob = await pdf(
        <CertificatePDF
          fullName={fullName.trim()}
          companyName={companyName.trim() || undefined}
          score={quizResult.score}
          total={quizResult.total}
          completionDate={today}
          certificateNumber={certificateNumber}
        />
      ).toBlob();

      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `WHMIS-Certificate-${fullName.trim().replace(/\s+/g, '-')}.pdf`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('PDF generation failed:', err);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGeneratingPdf(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading || !quizResult) {
    return (
      <main className="min-h-screen bg-[#f6f8f8] flex items-center justify-center">
        <div className="text-center">
          <span className="material-symbols-outlined text-slate-300 text-5xl animate-spin mb-4 inline-block">
            progress_activity
          </span>
          <p className="text-slate-500">Loading...</p>
        </div>
      </main>
    );
  }

  const scorePercent = Math.round((quizResult.score / quizResult.total) * 100);

  return (
    <main className="min-h-screen bg-[#f6f8f8]">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="mx-auto max-w-5xl px-6 py-6">
          <Link
            href="/whmis"
            className="flex items-center gap-1.5 text-sm text-slate-500 hover:text-[#0fbabd] transition-colors mb-4"
          >
            <span className="material-symbols-outlined text-base">arrow_back</span>
            Course Overview
          </Link>
          <div className="flex items-center gap-3">
            <span
              className="material-symbols-outlined text-[#0fbabd] text-3xl"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              workspace_premium
            </span>
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-[#102122] tracking-tight">
                Your WHMIS Certificate
              </h1>
              <p className="text-slate-500">
                Score: {quizResult.score}/{quizResult.total} ({scorePercent}%) — Passed
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Form */}
          <div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8">
              <h2 className="text-xl font-bold text-[#102122] mb-6">Certificate Details</h2>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-bold text-[#102122] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-[#102122] focus:outline-none focus:ring-2 focus:ring-[#0fbabd]/50 focus:border-[#0fbabd]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#102122] mb-2">
                    Company Name <span className="text-slate-400 font-normal">(optional)</span>
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Enter your company name"
                    className="w-full px-4 py-3 rounded-xl border border-slate-300 text-[#102122] focus:outline-none focus:ring-2 focus:ring-[#0fbabd]/50 focus:border-[#0fbabd]"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#102122] mb-2">
                    Completion Date
                  </label>
                  <div className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-700">
                    {today}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-[#102122] mb-2">
                    Certificate Number
                  </label>
                  <div className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 font-mono text-sm">
                    {certificateNumber}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="mt-8 space-y-3">
                {fullName.trim() ? (
                  <>
                    <button
                      onClick={handleDownloadPDF}
                      disabled={isGeneratingPdf}
                      className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#0fbabd] to-[#0d9699] text-white px-6 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all hover:scale-[1.01] disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isGeneratingPdf ? (
                        <>
                          <span className="material-symbols-outlined animate-spin text-base">
                            progress_activity
                          </span>
                          Generating PDF...
                        </>
                      ) : (
                        <>
                          <span
                            className="material-symbols-outlined"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            download
                          </span>
                          Download PDF Certificate
                        </>
                      )}
                    </button>

                    <button
                      onClick={handlePrint}
                      className="w-full inline-flex items-center justify-center gap-2 bg-slate-100 text-slate-700 px-6 py-4 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                    >
                      <span className="material-symbols-outlined text-base">print</span>
                      Print Certificate
                    </button>
                  </>
                ) : (
                  <div className="text-center py-4 text-slate-400 text-sm">
                    Enter your name to generate the certificate
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Preview */}
          <div>
            <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 print:p-0 print:border-0 print:rounded-none">
              <h2 className="text-xl font-bold text-[#102122] mb-6 print:hidden">
                Certificate Preview
              </h2>

              {/* Certificate preview card */}
              <div className="border-2 border-slate-200 rounded-xl overflow-hidden aspect-[1.414/1] flex flex-col print:border-0 print:rounded-none">
                {/* Teal bar */}
                <div className="h-3 bg-gradient-to-r from-[#0fbabd] to-[#0d9699]" />

                <div className="flex-1 flex flex-col p-6 md:p-8">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm md:text-base font-bold text-[#0fbabd] tracking-wider">
                      RENONEXT
                    </span>
                    <span className="text-[8px] md:text-[10px] text-slate-400">
                      #{certificateNumber}
                    </span>
                  </div>
                  <div className="h-px bg-slate-200 mb-4" />

                  {/* Title */}
                  <div className="text-center mb-4">
                    <div className="text-[8px] md:text-[10px] text-slate-400 uppercase tracking-[3px] mb-2">
                      Certificate of Completion
                    </div>
                    <h3 className="text-lg md:text-2xl font-extrabold text-[#102122]">
                      WHMIS 2015 Training
                    </h3>
                    <p className="text-[10px] md:text-xs text-slate-500 mt-1">
                      Workplace Hazardous Materials Information System
                    </p>
                  </div>

                  {/* Name */}
                  <div className="text-center py-4 border-t border-b border-[#0fbabd] my-2">
                    <div className="text-[8px] md:text-[10px] text-slate-400 uppercase tracking-[3px] mb-2">
                      Presented To
                    </div>
                    <div className="text-xl md:text-2xl font-extrabold text-[#102122]">
                      {fullName || 'Your Name'}
                    </div>
                    {companyName && (
                      <div className="text-xs md:text-sm text-slate-500 mt-1">{companyName}</div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex justify-center gap-6 mt-4 text-center">
                    <div>
                      <div className="text-[7px] md:text-[8px] text-slate-400 uppercase tracking-widest">
                        Date
                      </div>
                      <div className="text-[10px] md:text-xs font-bold text-[#102122]">{today}</div>
                    </div>
                    <div>
                      <div className="text-[7px] md:text-[8px] text-slate-400 uppercase tracking-widest">
                        Score
                      </div>
                      <div className="text-[10px] md:text-xs font-bold text-[#102122]">
                        {quizResult.score}/{quizResult.total} ({scorePercent}%)
                      </div>
                    </div>
                    <div>
                      <div className="text-[7px] md:text-[8px] text-slate-400 uppercase tracking-widest">
                        Modules
                      </div>
                      <div className="text-[10px] md:text-xs font-bold text-[#102122]">7/7</div>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="mt-auto pt-3 border-t border-slate-200">
                    <p className="text-[7px] md:text-[8px] text-slate-400 text-center leading-relaxed">
                      This certificate confirms completion of generic WHMIS 2015 education.
                      Workplace-specific training must be provided by the employer.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function WHMISCertificatePage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-[#f6f8f8] flex items-center justify-center">
          <span className="material-symbols-outlined text-slate-300 text-5xl animate-spin">
            progress_activity
          </span>
        </main>
      }
    >
      <CertificateContent />
    </Suspense>
  );
}
