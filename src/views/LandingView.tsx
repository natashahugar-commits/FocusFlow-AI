import React from 'react';
import {
  Sparkles,
  ArrowRight,
  Target,
  Award,
  BookOpen,
  TrendingUp,
  Flame,
  CheckCircle2,
  Compass,
  Heart,
  Play,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LandingView: React.FC<{ onStartOnboarding: () => void }> = ({
  onStartOnboarding,
}) => {
  const { theme, setTheme, setActivePage } = useApp();
  const isOcean = theme === 'ocean';

  return (
    <div className="min-h-screen flex flex-col justify-between transition-colors duration-300">
      {/* Hero Section */}
      <div className="relative overflow-hidden pt-12 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Glow ambient background elements */}
        <div
          className={`absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-25 ${
            isOcean ? 'bg-sky-500' : 'bg-pink-400'
          }`}
        />

        <div className="text-center max-w-3xl mx-auto relative z-10">
          {/* Tag pill */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold mb-6 shadow-sm border backdrop-blur-md">
            <span className="text-base">{isOcean ? '🪐' : '🌸'}</span>
            <span className={isOcean ? 'text-sky-300' : 'text-pink-700'}>
              LearnLoop AI — Turn Your Goals Into Achievements
            </span>
          </div>

          {/* Main Title */}
          <h1 className="font-heading text-4xl sm:text-6xl font-extrabold tracking-tight leading-tight">
            Study Smarter. Level Up.{' '}
            <span
              className={`bg-clip-text text-transparent bg-gradient-to-r ${
                isOcean
                  ? 'from-sky-400 via-blue-400 to-indigo-300'
                  : 'from-pink-500 via-rose-400 to-purple-400'
              }`}
            >
              Become Your Best.
            </span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-slate-300 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            The personalized study companion for school & college students.
            Upload materials, ask the citation-grounded AI tutor, conquer weak
            topics with adaptive quizzes, and follow your visual achievement
            path.
          </p>

          {/* CTA Group */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onStartOnboarding}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg transition-transform hover:scale-105 ${
                isOcean
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-sky-500/30 hover:shadow-sky-500/50'
                  : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-pink-500/30 hover:shadow-pink-500/50'
              }`}
            >
              <span>Get Started (Onboarding)</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setActivePage('dashboard')}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl font-semibold text-sm sm:text-base flex items-center justify-center gap-2 border transition ${
                isOcean
                  ? 'bg-slate-900/80 hover:bg-slate-800 border-sky-800/60 text-sky-200'
                  : 'bg-white hover:bg-slate-50 border-pink-200 text-pink-700 shadow-sm'
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Explore Demo Dashboard</span>
            </button>
          </div>

          {/* Dual Theme Selector Preview */}
          <div className="mt-12 p-4 rounded-3xl border backdrop-blur-md max-w-xl mx-auto">
            <p className="text-xs font-semibold uppercase tracking-wider mb-3 text-slate-400">
              Choose Your Study Aesthetic Anytime
            </p>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setTheme('ocean')}
                className={`p-3 rounded-2xl border text-left transition flex items-center gap-3 ${
                  isOcean
                    ? 'bg-sky-950/80 border-sky-500 text-sky-200 ring-2 ring-sky-500/50'
                    : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-sky-500/20 text-sky-400 flex items-center justify-center text-xl">
                  💙
                </div>
                <div>
                  <div className="font-bold text-xs">Ocean Explorer</div>
                  <div className="text-[10px] opacity-75">
                    Cosmic stars, navy blues & rockets
                  </div>
                </div>
              </button>

              <button
                onClick={() => setTheme('pink')}
                className={`p-3 rounded-2xl border text-left transition flex items-center gap-3 ${
                  !isOcean
                    ? 'bg-pink-100/90 border-pink-500 text-pink-800 ring-2 ring-pink-500/50'
                    : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="w-10 h-10 rounded-xl bg-pink-100 text-pink-500 flex items-center justify-center text-xl">
                  🩷
                </div>
                <div>
                  <div className="font-bold text-xs">Pink Dreamland</div>
                  <div className="text-[10px] opacity-75">
                    Blossoms, sparkles & lavender glow
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div
            className={`p-6 rounded-3xl border transition-all ${
              isOcean
                ? 'bg-slate-900/70 border-sky-900/50 text-slate-200'
                : 'bg-white border-pink-100 text-slate-800 shadow-md'
            }`}
          >
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
                isOcean ? 'bg-sky-500/20 text-sky-400' : 'bg-pink-100 text-pink-600'
              }`}
            >
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg mb-2">
              AI Tutor with Real Citations
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Upload lecture slides or PDFs. Ask questions and get answers
              grounded in your exact textbook pages and timestamps—never fake
              citations.
            </p>
          </div>

          <div
            className={`p-6 rounded-3xl border transition-all ${
              isOcean
                ? 'bg-slate-900/70 border-sky-900/50 text-slate-200'
                : 'bg-white border-pink-100 text-slate-800 shadow-md'
            }`}
          >
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
                isOcean ? 'bg-sky-500/20 text-sky-400' : 'bg-pink-100 text-pink-600'
              }`}
            >
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg mb-2">
              Milestone Goal Journeys
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Break down challenging subjects like Java or Mechanics into
              actionable daily checkpoints with friendly progress rings and zero
              shame.
            </p>
          </div>

          <div
            className={`p-6 rounded-3xl border transition-all ${
              isOcean
                ? 'bg-slate-900/70 border-sky-900/50 text-slate-200'
                : 'bg-white border-pink-100 text-slate-800 shadow-md'
            }`}
          >
            <div
              className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 ${
                isOcean ? 'bg-sky-500/20 text-sky-400' : 'bg-pink-100 text-pink-600'
              }`}
            >
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-heading font-bold text-lg mb-2">
              Adaptive Quizzes & Weak Area AI
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Diagnose specific misconception patterns, earn XP points, level up
              from Beginner to Master, and watch your Learning Garden bloom.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        className={`py-6 border-t text-center text-xs transition ${
          isOcean
            ? 'border-sky-950 text-slate-500'
            : 'border-pink-100 text-slate-400'
        }`}
      >
        <p>LearnLoop AI — Turn Your Goals Into Achievements • Hackathon Edition</p>
      </footer>
    </div>
  );
};
