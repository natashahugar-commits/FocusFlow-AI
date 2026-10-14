import React, { useState } from 'react';
import {
  ArrowRight,
  Sparkles,
  BookOpen,
  Clock,
  Target,
  Calendar,
  Compass,
  Heart,
  Check,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ThemeMode } from '../types';

export const OnboardingView: React.FC<{ onComplete: () => void }> = ({
  onComplete,
}) => {
  const { profile, updateProfile, theme, setTheme, triggerCelebration } = useApp();

  const [step, setStep] = useState(1);
  const [nickname, setNickname] = useState(profile.nickname || 'Aria');
  const [educationLevel, setEducationLevel] = useState(
    profile.educationLevel || 'Undergraduate (Sophomore)'
  );
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>(
    profile.subjects || ['Computer Science', 'Physics', 'Calculus']
  );
  const [dailyMinutes, setDailyMinutes] = useState(profile.dailyTargetMinutes || 45);
  const [studyGoal, setStudyGoal] = useState(
    profile.studyGoal || 'Ace upcoming midterms and master Object-Oriented Java'
  );
  const [preferredTheme, setPreferredTheme] = useState<ThemeMode>(theme);
  const [examDate, setExamDate] = useState(profile.examDate || '2026-11-05');

  const availableSubjects = [
    'Computer Science',
    'Physics',
    'Calculus',
    'Biology',
    'Chemistry',
    'Data Structures',
    'Psychology',
    'World History',
  ];

  const educationLevels = [
    'High School (Junior)',
    'High School (Senior)',
    'College Freshman',
    'Undergraduate (Sophomore)',
    'Undergraduate (Junior/Senior)',
    'Graduate / Professional',
  ];

  const handleToggleSubject = (sub: string) => {
    if (selectedSubjects.includes(sub)) {
      if (selectedSubjects.length > 1) {
        setSelectedSubjects(selectedSubjects.filter((s) => s !== sub));
      }
    } else {
      setSelectedSubjects([...selectedSubjects, sub]);
    }
  };

  const handleFinish = () => {
    updateProfile({
      nickname: nickname.trim() || 'Student',
      educationLevel,
      subjects: selectedSubjects,
      dailyTargetMinutes: Number(dailyMinutes),
      studyGoal,
      theme: preferredTheme,
      examDate,
      onboardingCompleted: true,
    });
    setTheme(preferredTheme);
    triggerCelebration();
    onComplete();
  };

  const handleSkip = () => {
    updateProfile({ onboardingCompleted: true });
    onComplete();
  };

  const isOcean = preferredTheme === 'ocean';

  return (
    <div
      className={`min-h-screen py-10 px-4 flex items-center justify-center transition-colors duration-300 ${
        isOcean ? 'bg-slate-950 text-slate-100' : 'bg-rose-50/50 text-slate-900'
      }`}
    >
      <div
        className={`w-full max-w-xl p-6 sm:p-8 rounded-3xl border shadow-2xl relative transition-all duration-300 ${
          isOcean
            ? 'bg-slate-900/95 border-sky-800/60 shadow-sky-950/50'
            : 'bg-white border-pink-200/90 shadow-pink-200/40'
        }`}
      >
        {/* Step indicator */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <span className="text-xl">{isOcean ? '🪐' : '🌸'}</span>
            <span className="font-heading font-bold text-sm tracking-wide">
              Step {step} of 3
            </span>
          </div>
          <button
            onClick={handleSkip}
            className="text-xs text-slate-400 hover:text-slate-200 transition underline underline-offset-4"
          >
            Skip for now
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full h-1.5 bg-slate-800/40 rounded-full mb-8 overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              isOcean ? 'bg-sky-400' : 'bg-pink-500'
            }`}
            style={{ width: `${(step / 3) * 100}%` }}
          />
        </div>

        {/* Step 1: Nickname & Education */}
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="font-heading font-bold text-2xl">
                Welcome to LearnLoop AI! 👋
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Tell us a little bit about yourself so we can personalize your
                study space.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">
                What should we call you? (Nickname)
              </label>
              <input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="e.g. Aria, Alex, Liam"
                className={`w-full px-4 py-3 rounded-2xl border text-sm font-medium outline-none transition ${
                  isOcean
                    ? 'bg-slate-950/60 border-sky-800/50 text-white focus:border-sky-400'
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-pink-500'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">
                Education Level
              </label>
              <select
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value)}
                className={`w-full px-4 py-3 rounded-2xl border text-sm font-medium outline-none transition ${
                  isOcean
                    ? 'bg-slate-950 border-sky-800/50 text-white focus:border-sky-400'
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-pink-500'
                }`}
              >
                {educationLevels.map((lvl) => (
                  <option key={lvl} value={lvl} className="bg-slate-900 text-white">
                    {lvl}
                  </option>
                ))}
              </select>
            </div>

            {/* Preferred Theme Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">
                Select Your Initial Theme
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setPreferredTheme('ocean');
                    setTheme('ocean');
                  }}
                  className={`p-3 rounded-2xl border text-left transition flex items-center gap-3 ${
                    preferredTheme === 'ocean'
                      ? 'bg-sky-950/70 border-sky-400 ring-2 ring-sky-400/40 text-sky-200'
                      : 'bg-slate-950/30 border-slate-800 text-slate-400'
                  }`}
                >
                  <span className="text-2xl">💙</span>
                  <div>
                    <div className="font-bold text-xs">Ocean Explorer</div>
                    <div className="text-[10px] opacity-75">Blue cosmic vibe</div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setPreferredTheme('pink');
                    setTheme('pink');
                  }}
                  className={`p-3 rounded-2xl border text-left transition flex items-center gap-3 ${
                    preferredTheme === 'pink'
                      ? 'bg-pink-100 border-pink-500 ring-2 ring-pink-500/40 text-pink-800'
                      : 'bg-slate-950/30 border-slate-800 text-slate-400'
                  }`}
                >
                  <span className="text-2xl">🩷</span>
                  <div>
                    <div className="font-bold text-xs">Pink Dreamland</div>
                    <div className="text-[10px] opacity-75">Soft floral glow</div>
                  </div>
                </button>
              </div>
            </div>

            <button
              onClick={() => setStep(2)}
              className={`w-full py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition ${
                isOcean
                  ? 'bg-sky-500 hover:bg-sky-400 text-slate-950'
                  : 'bg-pink-500 hover:bg-pink-600 text-white'
              }`}
            >
              <span>Continue to Subjects</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Step 2: Subjects Selection */}
        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="font-heading font-bold text-2xl">
                What do you want to master? 📚
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Choose the primary subjects you'll be focusing on this semester.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {availableSubjects.map((sub) => {
                const isSelected = selectedSubjects.includes(sub);
                return (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => handleToggleSubject(sub)}
                    className={`p-3 rounded-2xl border text-left text-xs font-semibold transition flex items-center justify-between ${
                      isSelected
                        ? isOcean
                          ? 'bg-sky-500/20 border-sky-400 text-sky-200'
                          : 'bg-pink-100 border-pink-400 text-pink-800'
                        : isOcean
                        ? 'bg-slate-950/40 border-slate-800 text-slate-400 hover:border-slate-700'
                        : 'bg-slate-50 border-slate-200 text-slate-600'
                    }`}
                  >
                    <span>{sub}</span>
                    {isSelected && <Check className="w-4 h-4 text-emerald-400" />}
                  </button>
                );
              })}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(1)}
                className="w-1/3 py-3 rounded-2xl font-semibold text-xs border border-slate-700 hover:bg-slate-800/40 transition"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                className={`w-2/3 py-3 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition ${
                  isOcean
                    ? 'bg-sky-500 hover:bg-sky-400 text-slate-950'
                    : 'bg-pink-500 hover:bg-pink-600 text-white'
                }`}
              >
                <span>Set Study Target</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Daily Target & Exam Date */}
        {step === 3 && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div>
              <h2 className="font-heading font-bold text-2xl">
                Your Goals & Schedule 🎯
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Small consistent daily habits make achieving high marks
                effortless.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">
                Daily Study Target (Minutes)
              </label>
              <div className="grid grid-cols-4 gap-2 mb-2">
                {[25, 45, 60, 90].map((mins) => (
                  <button
                    key={mins}
                    type="button"
                    onClick={() => setDailyMinutes(mins)}
                    className={`py-2 rounded-xl text-xs font-bold border transition ${
                      dailyMinutes === mins
                        ? isOcean
                          ? 'bg-sky-500 border-sky-400 text-slate-950'
                          : 'bg-pink-500 border-pink-400 text-white'
                        : isOcean
                        ? 'bg-slate-950/40 border-slate-800 text-slate-300'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    {mins}m
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">
                Primary Study Goal
              </label>
              <input
                type="text"
                value={studyGoal}
                onChange={(e) => setStudyGoal(e.target.value)}
                placeholder="e.g. Ace upcoming midterms and master Java OOP"
                className={`w-full px-4 py-3 rounded-2xl border text-sm font-medium outline-none transition ${
                  isOcean
                    ? 'bg-slate-950/60 border-sky-800/50 text-white focus:border-sky-400'
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-pink-500'
                }`}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase text-slate-400 mb-2">
                Upcoming Major Exam Date
              </label>
              <input
                type="date"
                value={examDate}
                onChange={(e) => setExamDate(e.target.value)}
                className={`w-full px-4 py-3 rounded-2xl border text-sm font-medium outline-none transition ${
                  isOcean
                    ? 'bg-slate-950/60 border-sky-800/50 text-white focus:border-sky-400'
                    : 'bg-slate-50 border-slate-200 text-slate-900 focus:border-pink-500'
                }`}
              />
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setStep(2)}
                className="w-1/3 py-3 rounded-2xl font-semibold text-xs border border-slate-700 hover:bg-slate-800/40 transition"
              >
                Back
              </button>
              <button
                onClick={handleFinish}
                className={`w-2/3 py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition ${
                  isOcean
                    ? 'bg-gradient-to-r from-sky-400 to-blue-500 text-slate-950 shadow-sky-500/30 hover:brightness-110'
                    : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-pink-500/30 hover:brightness-105'
                }`}
              >
                <span>Enter My Study World ✨</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
