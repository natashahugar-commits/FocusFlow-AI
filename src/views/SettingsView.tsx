import React, { useState, useEffect } from 'react';
import {
  Settings,
  Compass,
  Heart,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  User,
  Clock,
  Calendar,
  Save,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ThemeMode } from '../types';

export const SettingsView: React.FC = () => {
  const {
    theme,
    setTheme,
    profile,
    updateProfile,
    resetAllData,
    triggerCelebration,
  } = useApp();

  const isOcean = theme === 'ocean';

  const [nickname, setNickname] = useState(profile.nickname);
  const [educationLevel, setEducationLevel] = useState(profile.educationLevel);
  const [dailyMinutes, setDailyMinutes] = useState(profile.dailyTargetMinutes);
  const [studyGoal, setStudyGoal] = useState(profile.studyGoal);
  const [examDate, setExamDate] = useState(profile.examDate);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const [backendStatus, setBackendStatus] = useState<{
    aiConfigured: boolean;
    model: string;
    checked: boolean;
  }>({ aiConfigured: false, model: 'gemini-3.8-flash', checked: false });

  useEffect(() => {
    fetch('/api/status')
      .then((res) => res.json())
      .then((data) => {
        setBackendStatus({
          aiConfigured: Boolean(data.aiConfigured),
          model: data.model || 'gemini-3.8-flash',
          checked: true,
        });
      })
      .catch(() => {
        setBackendStatus({
          aiConfigured: false,
          model: 'gemini-3.8-flash',
          checked: true,
        });
      });
  }, []);

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      nickname: nickname.trim() || 'Student',
      educationLevel,
      dailyTargetMinutes: Number(dailyMinutes),
      studyGoal,
      examDate,
    });
    setSaveSuccess(true);
    triggerCelebration();
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-xl">{isOcean ? '🪐' : '🌸'}</span>
          <span
            className={`text-xs font-bold uppercase tracking-wider ${
              isOcean ? 'text-sky-400' : 'text-pink-600'
            }`}
          >
            Preferences & Configuration
          </span>
        </div>
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold">
          Settings & Customization
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Switch dual themes instantly, configure profile preferences, and inspect AI engine status.
        </p>
      </div>

      {/* Dual Theme Selector */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border transition-all ${
          isOcean
            ? 'bg-slate-900/80 border-sky-900/40 text-slate-100 shadow-md'
            : 'bg-white border-pink-100 text-slate-900 shadow-sm'
        }`}
      >
        <h2 className="font-heading font-bold text-xl mb-1">
          Dual-Theme Experience System 🎨
        </h2>
        <p className="text-xs text-slate-400 mb-6">
          Switch between Ocean Explorer and Pink Dreamland anytime. All study progress, XP, and streak data remain 100% intact.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Option A: Ocean Explorer */}
          <div
            onClick={() => {
              setTheme('ocean');
              triggerCelebration();
            }}
            className={`p-5 rounded-2xl border cursor-pointer transition flex items-start gap-4 ${
              isOcean
                ? 'bg-sky-950/80 border-sky-400 ring-2 ring-sky-400/40 text-sky-100 shadow-lg shadow-sky-950/50'
                : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-sky-500/20 text-sky-400 flex items-center justify-center text-3xl shrink-0">
              💙
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base">Ocean Explorer</h3>
                {isOcean && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-sky-400 text-slate-950">
                    Active
                  </span>
                )}
              </div>
              <p className="text-xs opacity-80 mt-1 leading-relaxed">
                Sky blue, royal blue, navy, stars, celestial planets, and glowing blue progress rings. Energetic and adventurous.
              </p>
            </div>
          </div>

          {/* Option B: Pink Dreamland */}
          <div
            onClick={() => {
              setTheme('pink');
              triggerCelebration();
            }}
            className={`p-5 rounded-2xl border cursor-pointer transition flex items-start gap-4 ${
              !isOcean
                ? 'bg-pink-100/90 border-pink-500 ring-2 ring-pink-500/40 text-pink-900 shadow-lg shadow-pink-100'
                : 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl bg-pink-100 text-pink-500 flex items-center justify-center text-3xl shrink-0">
              🩷
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base">Pink Dreamland</h3>
                {!isOcean && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-pink-500 text-white">
                    Active
                  </span>
                )}
              </div>
              <p className="text-xs opacity-80 mt-1 leading-relaxed">
                Blush pink, rose quartz, pastel lavender, blooming blossoms, sparkles, and gentle pink progress rings. Dreamy and elegant.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Preferences Form */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border transition-all ${
          isOcean
            ? 'bg-slate-900/80 border-sky-900/40 text-slate-100 shadow-md'
            : 'bg-white border-pink-100 text-slate-900 shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-heading font-bold text-xl">
              Student Profile & Goals
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Customize your nickname, study target, and exam countdown.
            </p>
          </div>
          {saveSuccess && (
            <span className="text-xs font-bold text-emerald-400 flex items-center gap-1.5 animate-bounce">
              <CheckCircle2 className="w-4 h-4" /> Preferences Saved!
            </span>
          )}
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-4 max-w-2xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                Nickname
              </label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none ${
                  isOcean
                    ? 'bg-slate-950 border-sky-800 text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                Education Level
              </label>
              <input
                type="text"
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none ${
                  isOcean
                    ? 'bg-slate-950 border-sky-800 text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                Daily Study Target (Minutes)
              </label>
              <input
                type="number"
                min={15}
                step={5}
                value={dailyMinutes}
                onChange={(e) => setDailyMinutes(Number(e.target.value))}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none ${
                  isOcean
                    ? 'bg-slate-950 border-sky-800 text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                Upcoming Major Exam Date
              </label>
              <input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none ${
                  isOcean
                    ? 'bg-slate-950 border-sky-800 text-white'
                    : 'bg-slate-50 border-slate-200 text-slate-900'
                }`}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
              Primary Academic Goal
            </label>
            <input
              type="text"
              value={studyGoal}
              onChange={(e) => setStudyGoal(e.target.value)}
              className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none ${
                isOcean
                  ? 'bg-slate-950 border-sky-800 text-white'
                  : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            />
          </div>

          <button
            type="submit"
            className={`px-6 py-2.5 rounded-xl font-bold text-xs flex items-center gap-2 transition shadow ${
              isOcean
                ? 'bg-sky-500 text-slate-950 hover:bg-sky-400'
                : 'bg-pink-500 text-white hover:bg-pink-600'
            }`}
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </form>
      </div>

      {/* AI Intelligence Architecture & Reset */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* AI Status Card */}
        <div
          className={`p-6 rounded-3xl border ${
            isOcean
              ? 'bg-slate-900/80 border-sky-900/40 text-slate-100'
              : 'bg-white border-pink-100 text-slate-900'
          }`}
        >
          <h3 className="font-heading font-bold text-base mb-2 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-sky-400" />
            <span>AI Backend Diagnostics</span>
          </h3>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            LearnLoop operates with full transparency. When `GEMINI_API_KEY` is present in Secrets, it calls Google Gemini 3.8 Flash server-side. Otherwise, it runs the built-in local academic curriculum engine without faking credentials.
          </p>

          <div
            className={`p-3 rounded-2xl border text-xs font-semibold flex items-center gap-2 ${
              backendStatus.aiConfigured
                ? 'bg-emerald-950/40 border-emerald-800 text-emerald-300'
                : 'bg-amber-950/40 border-amber-800 text-amber-300'
            }`}
          >
            <span className="w-2.5 h-2.5 rounded-full bg-current animate-pulse" />
            <span>
              {backendStatus.aiConfigured
                ? 'Connected: Gemini 3.8 Flash Active'
                : 'Using Local Academic Engine (Demo Mode Active)'}
            </span>
          </div>
        </div>

        {/* Demo Data Reset Card */}
        <div
          className={`p-6 rounded-3xl border flex flex-col justify-between ${
            isOcean
              ? 'bg-slate-900/80 border-slate-800 text-slate-100'
              : 'bg-white border-slate-200 text-slate-900'
          }`}
        >
          <div>
            <h3 className="font-heading font-bold text-base mb-2 flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-amber-400" />
              <span>Judge & Tester Demo Reset</span>
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Quickly reset all goals, materials, quiz history, and missions back to the curated demo student state for a fresh demonstration.
            </p>
          </div>

          <button
            onClick={resetAllData}
            className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-800 hover:bg-slate-700 text-slate-200 transition border border-slate-700"
          >
            Reset All to Clean Demo Dataset
          </button>
        </div>
      </div>
    </div>
  );
};
