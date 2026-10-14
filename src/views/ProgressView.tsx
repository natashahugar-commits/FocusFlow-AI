import React, { useState } from 'react';
import {
  TrendingUp,
  Award,
  AlertTriangle,
  Sparkles,
  BookOpen,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Compass,
  Heart,
  ChevronRight,
  Target,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { TopicMastery } from '../types';

export const ProgressView: React.FC = () => {
  const {
    topicMastery,
    quizAttempts,
    theme,
    profile,
    setActivePage,
  } = useApp();

  const isOcean = theme === 'ocean';

  // Toggle between Space Map & Learning Garden
  const [visualMode, setVisualMode] = useState<'auto' | 'garden' | 'space'>('auto');

  const activeVisual =
    visualMode === 'auto' ? (isOcean ? 'space' : 'garden') : visualMode;

  const strongTopics = topicMastery.filter(
    (t) => t.status === 'strong' || t.status === 'mastered'
  );
  const weakTopics = topicMastery.filter((t) => t.status === 'weak');
  const moderateTopics = topicMastery.filter((t) => t.status === 'moderate');

  // Overall average mastery
  const avgMastery =
    topicMastery.length > 0
      ? Math.round(
          topicMastery.reduce((acc, t) => acc + t.masteryScore, 0) /
            topicMastery.length
        )
      : 0;

  // Extract all mistake patterns across quiz attempts
  const allMistakes = quizAttempts.flatMap((qa) => qa.mistakes);

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
              Visual Learning Analytics
            </span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold">
            My Mastery & Knowledge Evolution
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Grounded assessment metrics, recurring error patterns, and interactive progress worlds.
          </p>
        </div>

        {/* Visual World Switcher */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl border text-xs bg-slate-900/50 border-slate-800">
          <button
            onClick={() => setVisualMode('space')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition flex items-center gap-1.5 ${
              activeVisual === 'space'
                ? 'bg-sky-500 text-slate-950 font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>🪐 Cosmic Star Map</span>
          </button>
          <button
            onClick={() => setVisualMode('garden')}
            className={`px-3 py-1.5 rounded-xl font-semibold transition flex items-center gap-1.5 ${
              activeVisual === 'garden'
                ? 'bg-pink-500 text-white font-bold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <span>🌸 Learning Garden</span>
          </button>
        </div>
      </div>

      {/* Hero Visual World: Cosmic Star Map OR Learning Garden */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden transition-all duration-500 ${
          activeVisual === 'space'
            ? 'bg-gradient-to-b from-slate-950 via-slate-900 to-sky-950 border-sky-800/50 text-slate-100 shadow-2xl shadow-sky-950/60'
            : 'bg-gradient-to-b from-rose-50 via-pink-50 to-emerald-50/30 border-pink-200 text-slate-900 shadow-xl shadow-pink-100'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 relative z-10">
          <div>
            <h2 className="font-heading font-extrabold text-xl sm:text-2xl flex items-center gap-2">
              {activeVisual === 'space' ? (
                <>
                  <span>✨ Celestial Constellation Map</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300">
                    {strongTopics.length} Stars Illuminated
                  </span>
                </>
              ) : (
                <>
                  <span>🌷 Blooming Learning Garden</span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-pink-100 text-pink-700">
                    {strongTopics.length} Blossoms in Bloom
                  </span>
                </>
              )}
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Every topic you practice elevates from a seed/starlet to full radiance based on real quiz performance.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start sm:self-auto">
            <span className="text-xs font-bold px-3 py-1.5 rounded-xl bg-black/20 backdrop-blur-sm border border-white/10">
              Overall Mastery: {avgMastery}%
            </span>
          </div>
        </div>

        {/* Visual Map Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 relative z-10">
          {topicMastery.map((topic) => {
            const isMastered = topic.status === 'mastered';
            const isStrong = topic.status === 'strong';
            const isWeak = topic.status === 'weak';

            return (
              <div
                key={topic.topicId}
                className={`p-4 rounded-2xl border flex flex-col items-center text-center transition-transform hover:scale-105 ${
                  activeVisual === 'space'
                    ? isMastered
                      ? 'bg-sky-950/80 border-sky-400/80 text-sky-200 ring-2 ring-sky-400/30 shadow-lg shadow-sky-500/20'
                      : isStrong
                      ? 'bg-slate-900/80 border-sky-600/50 text-slate-200'
                      : isWeak
                      ? 'bg-slate-950/80 border-rose-900/50 text-rose-300'
                      : 'bg-slate-950/60 border-slate-800 text-slate-300'
                    : isMastered
                    ? 'bg-white/90 border-pink-400 text-pink-900 ring-2 ring-pink-400/30 shadow-md'
                    : isStrong
                    ? 'bg-white/80 border-pink-200 text-slate-800'
                    : isWeak
                    ? 'bg-white/80 border-rose-300 text-rose-800'
                    : 'bg-white/70 border-slate-200 text-slate-700'
                }`}
              >
                {/* Visual Icon based on world */}
                <div className="text-3xl mb-2 animate-float">
                  {activeVisual === 'space' ? (
                    isMastered ? '🌟' : isStrong ? '⭐' : isWeak ? '☄️' : '✨'
                  ) : (
                    isMastered ? '🌺' : isStrong ? '🌸' : isWeak ? '🌱' : '🌷'
                  )}
                </div>

                <div className="font-bold text-xs line-clamp-1 mb-1">
                  {topic.topicName}
                </div>

                <div className="text-[10px] text-slate-400 mb-2">
                  {topic.subject}
                </div>

                <div className="w-full h-1.5 bg-black/20 rounded-full overflow-hidden mb-1">
                  <div
                    className={`h-full ${
                      isWeak
                        ? 'bg-rose-500'
                        : activeVisual === 'space'
                        ? 'bg-sky-400'
                        : 'bg-pink-500'
                    }`}
                    style={{ width: `${topic.masteryScore}%` }}
                  />
                </div>

                <span className="text-[10px] font-extrabold mt-0.5">
                  {topic.masteryScore}%
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Feature Section: "My Mistake Patterns" */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border transition-all ${
          isOcean
            ? 'bg-slate-900/80 border-rose-900/40 text-slate-100'
            : 'bg-white border-rose-200 text-slate-900 shadow-sm'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <div>
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider mb-1">
              <AlertTriangle className="w-4 h-4" />
              <span>Diagnostic Pattern Intelligence</span>
            </div>
            <h2 className="font-heading font-bold text-xl sm:text-2xl">
              My Mistake Patterns & Conceptual Traps
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              LearnLoop identifies recurring conceptual traps across your quiz attempts so you never repeat them on exams.
            </p>
          </div>

          <button
            onClick={() => setActivePage('tutor')}
            className="self-start sm:self-auto px-4 py-2 rounded-xl text-xs font-bold bg-rose-500 text-white hover:bg-rose-600 transition flex items-center gap-1.5 shadow"
          >
            <span>Revise with AI Tutor</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {allMistakes.length > 0 ? (
            allMistakes.map((mis) => (
              <div
                key={mis.id}
                className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                  isOcean
                    ? 'bg-slate-950/70 border-slate-800'
                    : 'bg-rose-50/40 border-rose-100'
                }`}
              >
                <div className="flex items-center justify-between text-rose-400 font-bold mb-1.5">
                  <span className="line-clamp-1">{mis.patternType}</span>
                  <span className="text-[10px] text-slate-400 font-normal">
                    {mis.date}
                  </span>
                </div>

                <p className="font-semibold text-slate-300 dark:text-slate-300 mb-2">
                  Question: "{mis.question}"
                </p>

                <div className="space-y-1 text-[11px] mb-3">
                  <div className="text-rose-400">
                    ❌ Your Answer: <em>"{mis.selectedAnswer}"</em>
                  </div>
                  <div className="text-emerald-400 font-medium">
                    ✓ Verified Correct: <em>"{mis.correctAnswer}"</em>
                  </div>
                </div>

                <div
                  className={`p-2.5 rounded-xl text-[11px] border ${
                    isOcean
                      ? 'bg-slate-900 border-sky-900/40 text-slate-300'
                      : 'bg-white border-slate-200 text-slate-700'
                  }`}
                >
                  <strong className="text-sky-300">Why this happens:</strong>{' '}
                  {mis.explanation}
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center p-6 text-slate-400 text-xs">
              No recent recurring mistakes recorded. Take more quizzes to discover patterns!
            </div>
          )}
        </div>
      </div>

      {/* Strong vs Weak Topics Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Strong Topics */}
        <div
          className={`p-6 rounded-3xl border transition-all ${
            isOcean
              ? 'bg-slate-900/80 border-emerald-900/40 text-slate-100'
              : 'bg-white border-emerald-100 text-slate-900 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            <h3 className="font-heading font-bold text-lg">
              Strong Topics ({strongTopics.length})
            </h3>
          </div>

          <div className="space-y-2.5">
            {strongTopics.map((topic) => (
              <div
                key={topic.topicId}
                className={`p-3 rounded-2xl border flex items-center justify-between text-xs ${
                  isOcean
                    ? 'bg-slate-950/60 border-slate-800'
                    : 'bg-emerald-50/40 border-emerald-100'
                }`}
              >
                <div>
                  <div className="font-semibold">{topic.topicName}</div>
                  <div className="text-[10px] text-slate-400">
                    {topic.subject} • {topic.quizzesTaken} quizzes taken
                  </div>
                </div>
                <span className="font-extrabold text-emerald-400">
                  {topic.masteryScore}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Weak Topics */}
        <div
          className={`p-6 rounded-3xl border transition-all ${
            isOcean
              ? 'bg-slate-900/80 border-rose-900/40 text-slate-100'
              : 'bg-white border-rose-100 text-slate-900 shadow-sm'
          }`}
        >
          <div className="flex items-center gap-2 mb-4">
            <AlertTriangle className="w-5 h-5 text-rose-400" />
            <h3 className="font-heading font-bold text-lg">
              Weak Topics Needing Revision ({weakTopics.length})
            </h3>
          </div>

          <div className="space-y-2.5">
            {weakTopics.map((topic) => (
              <div
                key={topic.topicId}
                className={`p-3 rounded-2xl border flex items-center justify-between text-xs ${
                  isOcean
                    ? 'bg-slate-950/60 border-slate-800'
                    : 'bg-rose-50/40 border-rose-100'
                }`}
              >
                <div>
                  <div className="font-semibold">{topic.topicName}</div>
                  <div className="text-[10px] text-slate-400">
                    {topic.subject} • {topic.mistakeCount} recorded mistakes
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-rose-400">
                    {topic.masteryScore}%
                  </span>
                  <button
                    onClick={() => setActivePage('tutor')}
                    className="p-1.5 rounded-lg bg-rose-500 text-white text-[10px] font-bold"
                  >
                    Revise
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
