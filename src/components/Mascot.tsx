import React, { useState } from 'react';
import { Sparkles, MessageCircle, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Mascot: React.FC = () => {
  const { theme, profile, triggerCelebration } = useApp();
  const isOcean = theme === 'ocean';

  const tips = isOcean
    ? [
        "Did you know? Studying in 25-minute Pomodoro intervals boosts memory retention by up to 40%!",
        "Newton's 3rd law pairs NEVER act on the same object. Keep your vectors aligned!",
        "Streak bonus active! 5 continuous days has earned you the Silver Orbit badge 🪐.",
        "Your Java constructor milestone is almost complete. Want to do a quick 2-minute quiz?",
        "Don't worry about mistakes—they are just the coordinates pointing straight to mastery!",
      ]
    : [
        "You are doing so wonderfully! Remember to hydrate and stretch between study sessions 🌸.",
        "Every page you revise today plants another blooming flower in your Learning Garden!",
        "5-Day streak! Your dedication is truly inspiring and magical ✨.",
        "Be kind to yourself when tackling tough concepts. Step by step does it!",
        "Ready to blossom? Reviewing your weak topic today will boost your confidence for the midterms!",
      ];

  const [currentTipIndex, setCurrentTipIndex] = useState(0);
  const [showSpeech, setShowSpeech] = useState(true);

  const nextTip = () => {
    setCurrentTipIndex((prev) => (prev + 1) % tips.length);
    triggerCelebration();
  };

  return (
    <div
      className={`p-4 rounded-3xl border transition-all duration-300 relative overflow-hidden ${
        isOcean
          ? 'bg-gradient-to-r from-slate-900/90 via-sky-950/80 to-slate-900/90 border-sky-800/40 text-slate-100 shadow-lg shadow-sky-950/40'
          : 'bg-gradient-to-r from-pink-50/90 via-rose-50/80 to-pink-50/90 border-pink-200/80 text-slate-900 shadow-md shadow-pink-100'
      }`}
    >
      {/* Background ambient stars or blossoms */}
      <div className="absolute -right-4 -bottom-4 text-7xl opacity-10 pointer-events-none select-none">
        {isOcean ? '🪐' : '🌸'}
      </div>

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 relative z-10">
        {/* Animated Mascot Avatar */}
        <div
          onClick={nextTip}
          className="relative cursor-pointer group flex-shrink-0"
          title="Click me for study motivation!"
        >
          <div
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-4xl sm:text-5xl shadow-md transition-all group-hover:scale-110 group-active:scale-95 animate-float ${
              isOcean
                ? 'bg-gradient-to-tr from-sky-600 to-indigo-600 border border-sky-400/40 shadow-sky-500/20'
                : 'bg-gradient-to-tr from-pink-400 to-rose-400 border border-pink-300 shadow-pink-400/20'
            }`}
          >
            {isOcean ? '🦉' : '🐰'}
          </div>
          <span
            className={`absolute -top-1 -right-1 text-xs px-1.5 py-0.5 rounded-full font-bold shadow ${
              isOcean
                ? 'bg-amber-400 text-slate-950'
                : 'bg-rose-500 text-white'
            }`}
          >
            {isOcean ? 'Cosmo' : 'Blossom'}
          </span>
        </div>

        {/* Mascot Message & Interaction */}
        <div className="flex-1 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-between gap-2 mb-1">
            <div className="flex items-center gap-1.5">
              <span className="font-heading font-bold text-sm sm:text-base">
                {isOcean ? 'Cosmo the Star Guide' : 'Blossom your Study Buddy'}
              </span>
              <span
                className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
                  isOcean ? 'bg-sky-500/20 text-sky-300' : 'bg-pink-100 text-pink-700'
                }`}
              >
                Study Companion
              </span>
            </div>

            <button
              onClick={nextTip}
              className={`text-xs flex items-center gap-1 opacity-70 hover:opacity-100 transition px-2 py-1 rounded-lg ${
                isOcean ? 'hover:bg-slate-800 text-sky-300' : 'hover:bg-pink-100 text-pink-600'
              }`}
            >
              <RefreshCw className="w-3 h-3" />
              <span>Next Tip</span>
            </button>
          </div>

          <p className="text-xs sm:text-sm text-slate-300 dark:text-slate-300 leading-relaxed max-w-2xl">
            {tips[currentTipIndex]}
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mt-2.5">
            <span
              className={`text-[11px] px-2.5 py-0.5 rounded-lg border font-medium ${
                isOcean
                  ? 'bg-slate-800/80 border-sky-800/60 text-sky-300'
                  : 'bg-white border-pink-200 text-pink-700'
              }`}
            >
              🔥 Streak: {profile.streak} Days
            </span>
            <span
              className={`text-[11px] px-2.5 py-0.5 rounded-lg border font-medium ${
                isOcean
                  ? 'bg-slate-800/80 border-sky-800/60 text-sky-300'
                  : 'bg-white border-pink-200 text-pink-700'
              }`}
            >
              🎯 Daily Goal: {profile.todayStudyMinutes}/{profile.dailyTargetMinutes}m
            </span>
            <span
              className={`text-[11px] px-2.5 py-0.5 rounded-lg border font-medium ${
                isOcean
                  ? 'bg-slate-800/80 border-sky-800/60 text-sky-300'
                  : 'bg-white border-pink-200 text-pink-700'
              }`}
            >
              ⭐ Level {profile.level}: {profile.levelTitle}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
