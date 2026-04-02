'use client';

import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getQuizQuestions, whmisModules, type WHMISQuestion } from '@/lib/data/whmis-course';

export default function WHMISQuizPage() {
  const router = useRouter();
  const questions = useMemo(() => getQuizQuestions(20), []);
  const totalQuestions = questions.length;

  const [started, setStarted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answers, setAnswers] = useState<Array<{ questionId: number; selected: number; correct: boolean }>>([]);
  const [quizComplete, setQuizComplete] = useState(false);

  const currentQuestion: WHMISQuestion | undefined = questions[currentIndex];
  const progressPercent = ((currentIndex + (showExplanation ? 1 : 0)) / totalQuestions) * 100;

  const score = useMemo(() => {
    if (!quizComplete) return 0;
    return answers.filter((a) => a.correct).length;
  }, [quizComplete, answers]);

  const passed = score >= Math.ceil(totalQuestions * 0.8);

  const handleAnswer = useCallback(
    (optionIndex: number) => {
      if (showExplanation || !currentQuestion) return;
      setSelectedAnswer(optionIndex);
      setShowExplanation(true);
      setAnswers((prev) => [
        ...prev,
        {
          questionId: currentQuestion.id,
          selected: optionIndex,
          correct: optionIndex === currentQuestion.correctAnswer,
        },
      ]);
    },
    [showExplanation, currentQuestion],
  );

  const handleNext = useCallback(() => {
    if (currentIndex + 1 >= totalQuestions) {
      setQuizComplete(true);
      // Store results in sessionStorage for certificate page
      const finalAnswers = [
        ...answers,
      ];
      const finalScore = finalAnswers.filter((a) => a.correct).length;
      sessionStorage.setItem(
        'whmis-quiz-result',
        JSON.stringify({
          score: finalScore,
          total: totalQuestions,
          passed: finalScore >= Math.ceil(totalQuestions * 0.8),
          completedAt: new Date().toISOString(),
        }),
      );
    } else {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    }
  }, [currentIndex, totalQuestions, answers]);

  const moduleBreakdown = useMemo(() => {
    if (!quizComplete) return [];
    const byModule: Record<number, { correct: number; total: number }> = {};
    answers.forEach((a) => {
      const q = questions.find((qq) => qq.id === a.questionId);
      if (!q) return;
      if (!byModule[q.moduleId]) byModule[q.moduleId] = { correct: 0, total: 0 };
      byModule[q.moduleId].total++;
      if (a.correct) byModule[q.moduleId].correct++;
    });
    return Object.entries(byModule)
      .map(([mId, data]) => {
        const mod = whmisModules.find((m) => m.id === Number(mId));
        return { moduleId: Number(mId), title: mod?.title || `Module ${mId}`, ...data };
      })
      .sort((a, b) => a.moduleId - b.moduleId);
  }, [quizComplete, answers, questions]);

  // ============================================================
  // INTRO SCREEN
  // ============================================================
  if (!started) {
    return (
      <main className="min-h-screen bg-[#f6f8f8] flex items-center justify-center px-6">
        <div className="max-w-lg w-full text-center">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 shadow-sm">
            <span
              className="material-symbols-outlined text-[#0fbabd] text-5xl mb-6 inline-block"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              quiz
            </span>
            <h1 className="text-3xl font-extrabold text-[#102122] mb-3 tracking-tight">
              WHMIS Final Quiz
            </h1>
            <p className="text-slate-500 mb-8 text-lg">
              {totalQuestions} multiple-choice questions covering all 7 modules.
              You need <strong>80% or higher</strong> to earn your certificate.
            </p>

            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-[#f6f8f8] rounded-xl p-4">
                <div className="text-2xl font-extrabold text-[#102122]">{totalQuestions}</div>
                <div className="text-xs text-slate-500">Questions</div>
              </div>
              <div className="bg-[#f6f8f8] rounded-xl p-4">
                <div className="text-2xl font-extrabold text-[#102122]">80%</div>
                <div className="text-xs text-slate-500">Pass Mark</div>
              </div>
              <div className="bg-[#f6f8f8] rounded-xl p-4">
                <div className="text-2xl font-extrabold text-[#102122]">~15</div>
                <div className="text-xs text-slate-500">Minutes</div>
              </div>
            </div>

            <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 mb-8 text-left">
              <div className="flex items-start gap-2">
                <span className="material-symbols-outlined text-amber-600 text-lg flex-shrink-0">
                  info
                </span>
                <p className="text-xs text-amber-800">
                  You&apos;ll see the correct answer and explanation after each question.
                  Review the modules first if you haven&apos;t already.
                </p>
              </div>
            </div>

            <button
              onClick={() => setStarted(true)}
              className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#0fbabd] to-[#0d9699] text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
            >
              <span
                className="material-symbols-outlined"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                play_circle
              </span>
              Start Quiz
            </button>

            <Link
              href="/whmis"
              className="block mt-4 text-sm text-slate-400 hover:text-slate-600 transition-colors"
            >
              Back to Course Overview
            </Link>
          </div>
        </div>
      </main>
    );
  }

  // ============================================================
  // RESULTS SCREEN
  // ============================================================
  if (quizComplete) {
    const scorePercent = Math.round((score / totalQuestions) * 100);

    return (
      <main className="min-h-screen bg-[#f6f8f8] flex items-center justify-center px-6 py-12">
        <div className="max-w-2xl w-full">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 md:p-12 shadow-sm text-center">
            {/* Score circle */}
            <div
              className={`w-32 h-32 rounded-full mx-auto mb-6 flex flex-col items-center justify-center border-4 ${
                passed
                  ? 'border-reno-green-500 bg-reno-green-50'
                  : 'border-red-400 bg-red-50'
              }`}
            >
              <span className="text-3xl font-extrabold text-[#102122]">{scorePercent}%</span>
              <span className="text-xs text-slate-500">
                {score}/{totalQuestions}
              </span>
            </div>

            {passed ? (
              <>
                <span
                  className="material-symbols-outlined text-reno-green-500 text-4xl mb-2 inline-block"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  celebration
                </span>
                <h1 className="text-3xl font-extrabold text-[#102122] mb-2">
                  Congratulations!
                </h1>
                <p className="text-slate-500 mb-8 text-lg">
                  You passed the WHMIS 2015 quiz. You can now download your certificate.
                </p>
                <button
                  onClick={() => router.push('/whmis/certificate')}
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-[#0fbabd] to-[#0d9699] text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:scale-[1.02]"
                >
                  <span
                    className="material-symbols-outlined"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    workspace_premium
                  </span>
                  Get Your Certificate
                </button>
              </>
            ) : (
              <>
                <span
                  className="material-symbols-outlined text-red-400 text-4xl mb-2 inline-block"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  sentiment_dissatisfied
                </span>
                <h1 className="text-3xl font-extrabold text-[#102122] mb-2">
                  Not Quite
                </h1>
                <p className="text-slate-500 mb-8 text-lg">
                  You scored {scorePercent}% — you need 80% to pass. Review the modules
                  below and try again.
                </p>
                <div className="flex flex-wrap gap-3 justify-center">
                  <Link
                    href="/whmis/module/1"
                    className="inline-flex items-center gap-2 bg-[#0fbabd] text-white px-6 py-3 rounded-xl font-bold"
                  >
                    <span className="material-symbols-outlined text-base">menu_book</span>
                    Review Modules
                  </Link>
                  <button
                    onClick={() => {
                      setStarted(true);
                      setCurrentIndex(0);
                      setSelectedAnswer(null);
                      setShowExplanation(false);
                      setAnswers([]);
                      setQuizComplete(false);
                    }}
                    className="inline-flex items-center gap-2 bg-slate-100 text-slate-700 px-6 py-3 rounded-xl font-bold hover:bg-slate-200 transition-colors"
                  >
                    <span className="material-symbols-outlined text-base">refresh</span>
                    Retry Quiz
                  </button>
                </div>
              </>
            )}

            {/* Module breakdown */}
            <div className="mt-10 pt-8 border-t border-slate-100">
              <h3 className="text-sm font-bold text-[#102122] uppercase tracking-widest mb-4">
                Score by Module
              </h3>
              <div className="space-y-3">
                {moduleBreakdown.map((mb) => {
                  const pct = Math.round((mb.correct / mb.total) * 100);
                  const isGood = pct >= 80;
                  return (
                    <div key={mb.moduleId} className="flex items-center gap-3">
                      <div className="flex-1 text-left">
                        <div className="text-sm font-medium text-[#102122]">{mb.title}</div>
                        <div className="text-xs text-slate-400">
                          {mb.correct}/{mb.total} correct
                        </div>
                      </div>
                      <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${isGood ? 'bg-reno-green-500' : 'bg-red-400'}`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span
                        className={`text-sm font-bold ${isGood ? 'text-reno-green-600' : 'text-red-500'}`}
                      >
                        {pct}%
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  // ============================================================
  // QUESTION SCREEN
  // ============================================================
  return (
    <main className="min-h-screen bg-[#f6f8f8]">
      {/* Top bar */}
      <div className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-sm">
        <div className="mx-auto max-w-3xl px-6 py-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-slate-500">
              Question {currentIndex + 1} of {totalQuestions}
            </span>
            <span className="text-sm font-bold text-[#102122]">
              {answers.filter((a) => a.correct).length} correct so far
            </span>
          </div>
          <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#0fbabd] to-[#0d9699] rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* Question card */}
      <div className="mx-auto max-w-3xl px-6 py-12">
        {currentQuestion && (
          <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-10 shadow-sm">
            {/* Module tag */}
            <div className="mb-4">
              <span className="text-[10px] font-bold text-[#0fbabd] uppercase tracking-widest bg-[#0fbabd]/10 px-3 py-1 rounded-full">
                Module {currentQuestion.moduleId}
              </span>
            </div>

            {/* Question */}
            <h2 className="text-xl md:text-2xl font-bold text-[#102122] mb-8 leading-snug">
              {currentQuestion.question}
            </h2>

            {/* Options */}
            <div className="space-y-3">
              {currentQuestion.options.map((option, idx) => {
                let optionStyle = 'bg-[#f6f8f8] border-slate-200 hover:border-[#0fbabd]/40 hover:bg-[#0fbabd]/5 cursor-pointer';

                if (showExplanation) {
                  if (idx === currentQuestion.correctAnswer) {
                    optionStyle = 'bg-reno-green-50 border-reno-green-400 ring-2 ring-emerald-200';
                  } else if (idx === selectedAnswer && idx !== currentQuestion.correctAnswer) {
                    optionStyle = 'bg-red-50 border-red-400 ring-2 ring-red-200';
                  } else {
                    optionStyle = 'bg-slate-50 border-slate-200 opacity-60';
                  }
                } else if (selectedAnswer === idx) {
                  optionStyle = 'bg-[#0fbabd]/10 border-[#0fbabd]';
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={showExplanation}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-start gap-3 ${optionStyle}`}
                  >
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold ${
                        showExplanation && idx === currentQuestion.correctAnswer
                          ? 'bg-reno-green-500 text-white'
                          : showExplanation && idx === selectedAnswer
                            ? 'bg-red-400 text-white'
                            : 'bg-white border border-slate-300 text-slate-500'
                      }`}
                    >
                      {showExplanation && idx === currentQuestion.correctAnswer ? (
                        <span className="material-symbols-outlined text-base">check</span>
                      ) : showExplanation && idx === selectedAnswer ? (
                        <span className="material-symbols-outlined text-base">close</span>
                      ) : (
                        String.fromCharCode(65 + idx)
                      )}
                    </span>
                    <span className="text-sm md:text-base text-[#102122] font-medium pt-1">
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Explanation */}
            {showExplanation && (
              <div className="mt-6">
                <div
                  className={`p-5 rounded-xl border ${
                    selectedAnswer === currentQuestion.correctAnswer
                      ? 'bg-reno-green-50 border-reno-green-200'
                      : 'bg-amber-50 border-amber-200'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span
                      className={`material-symbols-outlined text-lg flex-shrink-0 ${
                        selectedAnswer === currentQuestion.correctAnswer
                          ? 'text-reno-green-600'
                          : 'text-amber-600'
                      }`}
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {selectedAnswer === currentQuestion.correctAnswer ? 'check_circle' : 'info'}
                    </span>
                    <div>
                      <p
                        className={`text-sm font-bold mb-1 ${
                          selectedAnswer === currentQuestion.correctAnswer
                            ? 'text-reno-green-800'
                            : 'text-amber-800'
                        }`}
                      >
                        {selectedAnswer === currentQuestion.correctAnswer ? 'Correct!' : 'Not quite.'}
                      </p>
                      <p className="text-sm text-slate-700">{currentQuestion.explanation}</p>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleNext}
                  className="mt-6 w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#0fbabd] to-[#0d9699] text-white px-8 py-4 rounded-xl text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:scale-[1.01]"
                >
                  {currentIndex + 1 >= totalQuestions ? (
                    <>
                      <span
                        className="material-symbols-outlined"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        fact_check
                      </span>
                      See Results
                    </>
                  ) : (
                    <>
                      Next Question
                      <span className="material-symbols-outlined">arrow_forward</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
