import React, { useState, useEffect } from 'react';
import {
  Award,
  Clock,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowRight,
  RotateCcw,
  BookOpen,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { QuizQuestion, QuizAttempt, MistakeRecord } from '../types';
import { SAMPLE_QUIZZES } from '../services/storage';

export const QuizzesView: React.FC = () => {
  const {
    theme,
    profile,
    awardXp,
    triggerCelebration,
    recordQuizAttempt,
    updateTopicMasteryScore,
    setActivePage,
  } = useApp();

  const isOcean = theme === 'ocean';

  const [selectedTopicKey, setSelectedTopicKey] = useState<string>('java-oop');
  const [selectedDifficulty, setSelectedDifficulty] = useState<
    'beginner' | 'intermediate' | 'advanced'
  >('intermediate');
  const [isTimed, setIsTimed] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(180); // 3 minutes

  // Active quiz state
  const [quizInProgress, setQuizInProgress] = useState<boolean>(false);
  const [currentQuestions, setCurrentQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [quizCompletedAttempt, setQuizCompletedAttempt] = useState<QuizAttempt | null>(null);

  // Timer countdown
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (quizInProgress && isTimed && !isSubmitted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            handleCompleteQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [quizInProgress, isTimed, isSubmitted, timeLeft]);

  const handleStartQuiz = async () => {
    let questions = SAMPLE_QUIZZES[selectedTopicKey] || SAMPLE_QUIZZES['java-oop'];

    // Try fetching adaptive questions from backend if available
    try {
      const res = await fetch('/api/ai/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic: selectedTopicKey === 'java-oop' ? 'Java OOP' : 'Physics Mechanics',
          difficulty: selectedDifficulty,
          count: 3,
        }),
      });
      const data = await res.json();
      if (data.questions && data.questions.length > 0) {
        questions = data.questions;
      }
    } catch {
      // Use preloaded curriculum questions
    }

    setCurrentQuestions(questions);
    setCurrentIndex(0);
    setUserAnswers({});
    setIsSubmitted(false);
    setQuizCompletedAttempt(null);
    setTimeLeft(180);
    setQuizInProgress(true);
  };

  const handleSelectOption = (option: string) => {
    if (isSubmitted) return;
    setUserAnswers({ ...userAnswers, [currentIndex]: option });
  };

  const handleCompleteQuiz = () => {
    setIsSubmitted(true);

    let score = 0;
    const mistakes: MistakeRecord[] = [];

    currentQuestions.forEach((q, idx) => {
      const ans = (userAnswers[idx] || '').trim().toLowerCase();
      const correct = q.correctAnswer.trim().toLowerCase();

      if (ans === correct) {
        score++;
      } else {
        mistakes.push({
          id: `mis-${Date.now()}-${idx}`,
          question: q.question,
          selectedAnswer: userAnswers[idx] || 'Not answered',
          correctAnswer: q.correctAnswer,
          concept: q.conceptKey,
          explanation: q.explanation,
          patternType: `Misconception on ${q.conceptKey}`,
          date: new Date().toISOString().split('T')[0],
        });
      }
    });

    const total = currentQuestions.length;
    const percentage = Math.round((score / total) * 100);
    const xpEarned = Math.round((score / total) * 40) + 15;

    const attempt: QuizAttempt = {
      id: `attempt-${Date.now()}`,
      quizTitle: selectedTopicKey === 'java-oop' ? 'Java OOP Architecture' : 'Classical Mechanics Dynamics',
      subject: selectedTopicKey === 'java-oop' ? 'Computer Science' : 'Physics',
      topic: selectedTopicKey === 'java-oop' ? 'Object-Oriented Programming' : 'Classical Mechanics',
      difficulty: selectedDifficulty,
      score,
      total,
      percentage,
      date: new Date().toISOString().split('T')[0],
      xpEarned,
      mistakes,
    };

    setQuizCompletedAttempt(attempt);
    recordQuizAttempt(attempt);

    // Update real topic mastery based on assessment evidence
    const topicId = selectedTopicKey === 'java-oop' ? 'tm-3' : 'tm-1';
    const delta = percentage >= 80 ? 12 : percentage >= 50 ? 5 : -8;
    updateTopicMasteryScore(topicId, delta, mistakes.length > 0);

    awardXp(xpEarned, `Completed quiz with ${percentage}% score`);
    if (percentage >= 70) {
      triggerCelebration();
    }
  };

  const currentQ = currentQuestions[currentIndex];

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">{isOcean ? '🪐' : '🌸'}</span>
            <span
              className={`text-xs font-bold uppercase tracking-wider ${
                isOcean ? 'text-sky-400' : 'text-pink-600'
              }`}
            >
              Diagnostic & Adaptive Testing
            </span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold">
            Adaptive Quizzes & Concept Checks
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Every quiz evaluates genuine conceptual understanding and targets your weak topics.
          </p>
        </div>

        {quizInProgress && isTimed && !isSubmitted && (
          <div
            className={`px-4 py-2 rounded-2xl border font-mono font-bold text-sm flex items-center gap-2 ${
              timeLeft < 30 ? 'bg-rose-500/20 border-rose-500 text-rose-300 animate-pulse' : 'bg-slate-900 border-slate-800 text-sky-300'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>
              {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </span>
          </div>
        )}
      </div>

      {/* Quiz Configuration Screen (if not started) */}
      {!quizInProgress && (
        <div
          className={`p-6 sm:p-8 rounded-3xl border transition-all ${
            isOcean
              ? 'bg-slate-900/80 border-sky-900/40 text-slate-100 shadow-md shadow-sky-950/20'
              : 'bg-white border-pink-100 text-slate-900 shadow-sm'
          }`}
        >
          <h2 className="font-heading font-bold text-xl mb-1">
            Configure Your Practice Assessment
          </h2>
          <p className="text-xs text-slate-400 mb-6">
            Choose your subject, difficulty, and timing mode.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Topic selection */}
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">
                1. Select Topic
              </label>
              <div className="space-y-2">
                {[
                  { id: 'java-oop', title: 'Java OOP Principles', sub: 'Classes, Constructors, Dispatch' },
                  { id: 'physics-forces', title: "Newton's Laws & Dynamics", sub: 'Force Pairs, Conservation' },
                ].map((t) => (
                  <button
                    key={t.id}
                    onClick={() => setSelectedTopicKey(t.id)}
                    className={`w-full p-3 rounded-2xl border text-left transition ${
                      selectedTopicKey === t.id
                        ? isOcean
                          ? 'bg-sky-500/20 border-sky-400 text-sky-200'
                          : 'bg-pink-100 border-pink-400 text-pink-800'
                        : isOcean
                        ? 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    <div className="font-bold text-xs">{t.title}</div>
                    <div className="text-[10px] opacity-75">{t.sub}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Difficulty selection */}
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">
                2. Difficulty Level
              </label>
              <div className="space-y-2">
                {(['beginner', 'intermediate', 'advanced'] as const).map((diff) => (
                  <button
                    key={diff}
                    onClick={() => setSelectedDifficulty(diff)}
                    className={`w-full p-3 rounded-2xl border text-left capitalize transition font-bold text-xs ${
                      selectedDifficulty === diff
                        ? isOcean
                          ? 'bg-sky-500/20 border-sky-400 text-sky-200'
                          : 'bg-pink-100 border-pink-400 text-pink-800'
                        : isOcean
                        ? 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    {diff === 'beginner' && '🌱 Beginner (Fundamentals)'}
                    {diff === 'intermediate' && '⚡ Intermediate (Standard Exam)'}
                    {diff === 'advanced' && '🔥 Advanced (Challenging Edge Cases)'}
                  </button>
                ))}
              </div>
            </div>

            {/* Mode selection */}
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">
                3. Timing Mode
              </label>
              <div className="space-y-2">
                <button
                  onClick={() => setIsTimed(false)}
                  className={`w-full p-3 rounded-2xl border text-left transition ${
                    !isTimed
                      ? isOcean
                        ? 'bg-sky-500/20 border-sky-400 text-sky-200'
                        : 'bg-pink-100 border-pink-400 text-pink-800'
                      : isOcean
                      ? 'bg-slate-950/40 border-slate-800 text-slate-400'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  <div className="font-bold text-xs">☕ Untimed Practice</div>
                  <div className="text-[10px] opacity-75">Take all the time you need to think</div>
                </button>

                <button
                  onClick={() => setIsTimed(true)}
                  className={`w-full p-3 rounded-2xl border text-left transition ${
                    isTimed
                      ? isOcean
                        ? 'bg-sky-500/20 border-sky-400 text-sky-200'
                        : 'bg-pink-100 border-pink-400 text-pink-800'
                      : isOcean
                      ? 'bg-slate-950/40 border-slate-800 text-slate-400'
                      : 'bg-slate-50 border-slate-200 text-slate-600'
                  }`}
                >
                  <div className="font-bold text-xs">⏱️ Timed Challenge (3 min)</div>
                  <div className="text-[10px] opacity-75">Simulate actual exam test conditions</div>
                </button>
              </div>
            </div>
          </div>

          <button
            onClick={handleStartQuiz}
            className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-105 ${
              isOcean
                ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-sky-500/30'
                : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-pink-500/30'
            }`}
          >
            <span>Launch Quiz Now</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Active Quiz Question Interface */}
      {quizInProgress && currentQ && (
        <div
          className={`p-6 sm:p-8 rounded-3xl border transition-all ${
            isOcean
              ? 'bg-slate-900/90 border-sky-900/50 text-slate-100'
              : 'bg-white border-pink-100 text-slate-900 shadow-sm'
          }`}
        >
          {/* Progress Header */}
          <div className="flex items-center justify-between mb-6">
            <span className="text-xs font-bold text-sky-400 uppercase tracking-wider">
              Question {currentIndex + 1} of {currentQuestions.length}
            </span>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 capitalize">
              {currentQ.difficulty} • {currentQ.type}
            </span>
          </div>

          {/* Question text */}
          <h2 className="font-heading font-bold text-lg sm:text-xl leading-relaxed mb-6">
            {currentQ.question}
          </h2>

          {/* Question inputs by type */}
          {currentQ.type === 'multiple-choice' && currentQ.options && (
            <div className="space-y-3 mb-6">
              {currentQ.options.map((opt, optIdx) => {
                const isSelected = userAnswers[currentIndex] === opt;
                let optionStyle = isOcean
                  ? 'bg-slate-950/50 border-slate-800 text-slate-200 hover:border-slate-700'
                  : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-slate-300';

                if (isSelected) {
                  optionStyle = isOcean
                    ? 'bg-sky-500/20 border-sky-400 text-sky-200 ring-2 ring-sky-400/30'
                    : 'bg-pink-100 border-pink-400 text-pink-800 ring-2 ring-pink-400/30';
                }

                if (isSubmitted) {
                  const isCorrect = opt.trim().toLowerCase() === currentQ.correctAnswer.trim().toLowerCase();
                  if (isCorrect) {
                    optionStyle = 'bg-emerald-500/20 border-emerald-400 text-emerald-300 font-bold';
                  } else if (isSelected) {
                    optionStyle = 'bg-rose-500/20 border-rose-400 text-rose-300';
                  }
                }

                return (
                  <button
                    key={optIdx}
                    disabled={isSubmitted}
                    onClick={() => handleSelectOption(opt)}
                    className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm font-medium transition flex items-center justify-between ${optionStyle}`}
                  >
                    <span>{opt}</span>
                    {isSubmitted && opt.trim().toLowerCase() === currentQ.correctAnswer.trim().toLowerCase() && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {(currentQ.type === 'short-answer' || currentQ.type === 'numerical') && (
            <div className="mb-6">
              <label className="block text-xs font-semibold text-slate-400 mb-2">
                Type your answer:
              </label>
              <input
                type="text"
                disabled={isSubmitted}
                value={userAnswers[currentIndex] || ''}
                onChange={(e) => handleSelectOption(e.target.value)}
                placeholder={currentQ.type === 'numerical' ? 'e.g. 5' : 'e.g. Encapsulation'}
                className={`w-full px-4 py-3 rounded-2xl border text-sm outline-none ${
                  isOcean
                    ? 'bg-slate-950 border-sky-800 text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>
          )}

          {/* Diagnostic feedback after submission */}
          {isSubmitted && (
            <div
              className={`p-4 rounded-2xl border mb-6 text-xs leading-relaxed ${
                (userAnswers[currentIndex] || '').trim().toLowerCase() === currentQ.correctAnswer.trim().toLowerCase()
                  ? 'bg-emerald-950/40 border-emerald-800 text-emerald-200'
                  : 'bg-rose-950/40 border-rose-800 text-rose-200'
              }`}
            >
              <div className="flex items-center gap-2 font-bold mb-1 text-sm">
                {(userAnswers[currentIndex] || '').trim().toLowerCase() === currentQ.correctAnswer.trim().toLowerCase() ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Correct! Great reasoning.</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-rose-400" />
                    <span>Conceptual Gap Identified. Correct Answer: "{currentQ.correctAnswer}"</span>
                  </>
                )}
              </div>
              <p className="mt-1 opacity-90">{currentQ.explanation}</p>

              {currentQ.sourceCitation && (
                <div className="mt-2.5 pt-2 border-t border-current/20 flex items-center gap-1.5 font-semibold text-[11px]">
                  <BookOpen className="w-3.5 h-3.5" />
                  <span>Syllabus Source: {currentQ.sourceCitation.documentTitle} ({currentQ.sourceCitation.location})</span>
                </div>
              )}
            </div>
          )}

          {/* Navigation & Submission Buttons */}
          <div className="flex items-center justify-between pt-4 border-t border-slate-800/40">
            <button
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((prev) => prev - 1)}
              className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-700 disabled:opacity-30"
            >
              Previous
            </button>

            <div className="flex items-center gap-2">
              {currentIndex < currentQuestions.length - 1 ? (
                <button
                  onClick={() => setCurrentIndex((prev) => prev + 1)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-bold transition ${
                    isOcean ? 'bg-sky-500 text-slate-950 hover:bg-sky-400' : 'bg-pink-500 text-white hover:bg-pink-600'
                  }`}
                >
                  Next Question
                </button>
              ) : !isSubmitted ? (
                <button
                  onClick={handleCompleteQuiz}
                  className="px-6 py-2.5 rounded-xl text-xs font-bold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition shadow"
                >
                  Submit & Analyze Quiz
                </button>
              ) : (
                <button
                  onClick={() => {
                    setQuizInProgress(false);
                    setActivePage('progress');
                  }}
                  className={`px-6 py-2.5 rounded-xl text-xs font-bold transition ${
                    isOcean ? 'bg-sky-500 text-slate-950' : 'bg-pink-500 text-white'
                  }`}
                >
                  View Learning Analytics
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Quiz Completion Summary Banner */}
      {quizCompletedAttempt && (
        <div
          className={`p-6 rounded-3xl border animate-in fade-in ${
            isOcean
              ? 'bg-slate-900 border-sky-800 text-slate-100'
              : 'bg-white border-pink-200 text-slate-900'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">🏆</span>
                <h3 className="font-heading font-bold text-lg">
                  Assessment Completed! Score: {quizCompletedAttempt.score} / {quizCompletedAttempt.total} ({quizCompletedAttempt.percentage}%)
                </h3>
              </div>
              <p className="text-xs text-slate-400">
                You earned <strong>+{quizCompletedAttempt.xpEarned} XP</strong>. Your topic mastery has been updated with genuine assessment evidence.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleStartQuiz}
                className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-700 hover:bg-slate-800 transition flex items-center gap-1.5"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retake Quiz</span>
              </button>
              <button
                onClick={() => setActivePage('progress')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
                  isOcean ? 'bg-sky-500 text-slate-950' : 'bg-pink-500 text-white'
                }`}
              >
                Inspect Mistake Patterns
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
