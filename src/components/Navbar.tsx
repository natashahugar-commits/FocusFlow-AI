import React from 'react';
import {
  Sparkles,
  Flame,
  Sun,
  Moon,
  Compass,
  Heart,
  RotateCcw,
  Zap,
  Play,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

interface NavbarProps {
  onOpenDemoTour: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenDemoTour }) => {
  const { theme, setTheme, profile, activePage, setActivePage } = useApp();

  const isOcean = theme === 'ocean';

  return (
    <header
      className={`sticky top-0 z-40 backdrop-blur-md border-b transition-colors duration-300 ${
        isOcean
          ? 'bg-slate-950/80 border-sky-900/40 text-slate-100'
          : 'bg-white/85 border-pink-200/60 text-slate-900 shadow-sm'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <div
          onClick={() => setActivePage('dashboard')}
          className="flex items-center gap-3 cursor-pointer group select-none"
        >
          <div
            className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-lg shadow-md transition-transform group-hover:scale-105 ${
              isOcean
                ? 'bg-gradient-to-tr from-sky-500 to-blue-600 text-white shadow-sky-500/20'
                : 'bg-gradient-to-tr from-pink-400 to-rose-500 text-white shadow-pink-500/20'
            }`}
          >
            {isOcean ? '🪐' : '🌸'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight">
                LearnLoop{' '}
                <span className={isOcean ? 'text-sky-400' : 'text-pink-600'}>
                  AI
                </span>
              </span>
              <span
                className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                  isOcean
                    ? 'bg-sky-500/15 text-sky-300 border border-sky-500/30'
                    : 'bg-pink-100 text-pink-700 border border-pink-200'
                }`}
              >
                {isOcean ? 'Ocean Explorer 💙' : 'Pink Dreamland 🩷'}
              </span>
            </div>
            <p className="hidden md:block text-xs text-slate-400 font-medium">
              Turn Your Goals Into Achievements
            </p>
          </div>
        </div>

        {/* Center / Stats pills */}
        <div className="hidden lg:flex items-center gap-4">
          {/* Level & XP */}
          <div
            className={`flex items-center gap-2.5 px-3 py-1.5 rounded-xl border text-xs font-medium ${
              isOcean
                ? 'bg-slate-900/80 border-sky-800/40 text-sky-200'
                : 'bg-pink-50/70 border-pink-200 text-pink-900'
            }`}
          >
            <div
              className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs ${
                isOcean ? 'bg-sky-500 text-slate-950' : 'bg-pink-500 text-white'
              }`}
            >
              L{profile.level}
            </div>
            <div>
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold">{profile.levelTitle}</span>
                <span className="text-[11px] opacity-75">
                  {profile.xp} / {profile.nextLevelXp} XP
                </span>
              </div>
              <div className="w-24 h-1.5 bg-black/20 rounded-full overflow-hidden mt-0.5">
                <div
                  className={`h-full transition-all duration-500 ${
                    isOcean ? 'bg-sky-400' : 'bg-pink-500'
                  }`}
                  style={{
                    width: `${Math.min(
                      100,
                      Math.max(
                        10,
                        (profile.xp / (profile.nextLevelXp || 400)) * 100
                      )
                    )}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Streak Flame */}
          <div
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold ${
              isOcean
                ? 'bg-amber-950/30 border-amber-500/30 text-amber-300'
                : 'bg-amber-50 border-amber-200 text-amber-700'
            }`}
          >
            <Flame className="w-4 h-4 text-amber-400 fill-amber-400 animate-pulse" />
            <span>{profile.streak} Day Streak</span>
          </div>

          {/* Today's Target */}
          <div
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs ${
              isOcean
                ? 'bg-slate-900/60 border-slate-800 text-slate-300'
                : 'bg-white border-slate-200 text-slate-700'
            }`}
          >
            <Zap className="w-3.5 h-3.5 text-emerald-400" />
            <span>
              Target:{' '}
              <strong className="text-emerald-500">
                {profile.todayStudyMinutes}m
              </strong>{' '}
              / {profile.dailyTargetMinutes}m
            </span>
          </div>
        </div>

        {/* Right Action buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Hackathon Demo Walkthrough Button */}
          <button
            onClick={onOpenDemoTour}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition shadow-sm ${
              isOcean
                ? 'bg-gradient-to-r from-sky-600 to-blue-600 text-white hover:brightness-110 shadow-sky-600/30'
                : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white hover:brightness-105 shadow-pink-500/20'
            }`}
            title="Start Interactive Hackathon Demo Tour"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
            <span className="hidden sm:inline">Demo Tour</span>
          </button>

          {/* Instant Theme Switcher */}
          <button
            onClick={() => setTheme(isOcean ? 'pink' : 'ocean')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border transition-all ${
              isOcean
                ? 'bg-slate-900/90 hover:bg-slate-800 border-sky-700/50 text-sky-200 shadow-sm'
                : 'bg-pink-50/80 hover:bg-pink-100 border-pink-300/80 text-pink-700 shadow-sm'
            }`}
            title={`Switch to ${isOcean ? 'Pink Dreamland' : 'Ocean Explorer'} Theme`}
          >
            {isOcean ? (
              <>
                <Heart className="w-3.5 h-3.5 text-pink-400 fill-pink-400" />
                <span className="hidden md:inline">Pink Dream</span>
              </>
            ) : (
              <>
                <Compass className="w-3.5 h-3.5 text-sky-500" />
                <span className="hidden md:inline">Ocean Explorer</span>
              </>
            )}
          </button>

          {/* User Profile Mini */}
          <div
            onClick={() => setActivePage('settings')}
            className={`flex items-center gap-2 p-1.5 pr-2.5 rounded-xl border cursor-pointer transition hover:opacity-90 ${
              isOcean
                ? 'bg-slate-900/80 border-slate-800 hover:border-sky-600'
                : 'bg-white border-slate-200 hover:border-pink-300'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs text-white ${
                isOcean ? 'bg-sky-600' : 'bg-pink-500'
              }`}
            >
              {profile.nickname.charAt(0)}
            </div>
            <span className="text-xs font-semibold hidden sm:inline">
              {profile.nickname}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
