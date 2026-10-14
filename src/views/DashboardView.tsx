import React, { useState } from 'react';
import {
  Sparkles,
  Flame,
  Clock,
  Target,
  Award,
  BookOpen,
  Calendar,
  TrendingUp,
  ArrowRight,
  Play,
  CheckCircle2,
  AlertCircle,
  Zap,
  ChevronRight,
  Compass,
  Trophy,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Mascot } from '../components/Mascot';

export const DashboardView: React.FC = () => {
  const {
    profile,
    updateProfile,
    theme,
    setActivePage,
    missions,
    goals,
    topicMastery,
    awardXp,
    triggerCelebration,
  } = useApp();

  const isOcean = theme === 'ocean';

  // Quick Study Timer session simulator
  const [isStudyingNow, setIsStudyingNow] = useState(false);
  const [studySessionSeconds, setStudySessionSeconds] = useState(0);

  const startQuickSession = () => {
    setIsStudyingNow(true);
  };

  const finishQuickSession = () => {
    setIsStudyingNow(false);
    const addedMinutes = 15;
    updateProfile({
      todayStudyMinutes: profile.todayStudyMinutes + addedMinutes,
      totalStudyMinutes: profile.totalStudyMinutes + addedMinutes,
    });
    awardXp(30, 'Completed 15-minute focused study session!');
    triggerCelebration();
  };

  // Weak topics filter
  const weakTopics = topicMastery.filter((t) => t.status === 'weak');

  // Today target percentage
  const targetPercent = Math.min(
    100,
    Math.round((profile.todayStudyMinutes / (profile.dailyTargetMinutes || 45)) * 100)
  );

  // Calculate days remaining until exam
  const today = new Date();
  const examDateObj = new Date(profile.examDate || '2026-11-05');
  const diffTime = examDateObj.getTime() - today.getTime();
  const daysUntilExam = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  // Mock weekly activity (Mon - Sun)
  const weeklyData = [
    { day: 'Mon', mins: 45, current: false },
    { day: 'Tue', mins: 50, current: false },
    { day: 'Wed', mins: 35, current: false },
    { day: 'Thu', mins: 60, current: false },
    { day: 'Fri', mins: 40, current: false },
    { day: 'Sat', mins: 55, current: false },
    { day: 'Sun', mins: profile.todayStudyMinutes, current: true },
  ];
  const maxWeeklyMins = 70;

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Top Hero Banner & Personalized Greeting */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden transition-all duration-300 ${
          isOcean
            ? 'bg-gradient-to-r from-slate-900 via-sky-950/80 to-slate-900 border-sky-800/50 text-white shadow-xl shadow-sky-950/50'
            : 'bg-gradient-to-r from-pink-50 via-rose-50 to-purple-50 border-pink-200/90 text-slate-900 shadow-md shadow-pink-100'
        }`}
      >
        {/* Ambient background decoration */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-15 pointer-events-none select-none flex items-center justify-center text-9xl">
          {isOcean ? '🚀' : '✨'}
        </div>

        <div className="relative z-10 max-w-3xl">
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span
              className={`text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider ${
                isOcean
                  ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                  : 'bg-pink-100 text-pink-700 border border-pink-200'
              }`}
            >
              📅 {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
            </span>
            <span
              className={`text-[11px] font-medium px-3 py-1 rounded-full ${
                isOcean ? 'bg-amber-400/15 text-amber-300' : 'bg-amber-100 text-amber-800'
              }`}
            >
              🔥 {profile.streak} Day Study Streak
            </span>
          </div>

          <h1 className="font-heading text-2xl sm:text-4xl font-extrabold tracking-tight">
            Welcome back, {profile.nickname}!{' '}
            <span className="inline-block animate-wave">✨</span>
          </h1>

          <p className="mt-2 text-xs sm:text-sm text-slate-300 dark:text-slate-300 leading-relaxed">
            "The secret of getting ahead is getting started. Today is your day to level up your knowledge and conquer any difficult topic!"
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {/* Big Start Studying button */}
            <button
              onClick={() => setActivePage('tutor')}
              className={`px-6 py-3 rounded-2xl font-bold text-sm flex items-center gap-2 shadow-lg transition-transform hover:scale-105 ${
                isOcean
                  ? 'bg-gradient-to-r from-sky-400 to-blue-500 text-slate-950 shadow-sky-500/30'
                  : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-pink-500/30'
              }`}
            >
              <Play className="w-4 h-4 fill-current" />
              <span>Start Studying with AI Tutor</span>
            </button>

            <button
              onClick={() => setActivePage('quizzes')}
              className={`px-5 py-3 rounded-2xl font-semibold text-xs sm:text-sm flex items-center gap-2 border transition ${
                isOcean
                  ? 'bg-slate-900/80 hover:bg-slate-800 border-sky-800 text-sky-200'
                  : 'bg-white hover:bg-slate-50 border-pink-200 text-pink-700'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Take Diagnostic Quiz</span>
            </button>

            {/* Quick 15-min boost session button */}
            {!isStudyingNow ? (
              <button
                onClick={startQuickSession}
                className={`px-4 py-3 rounded-2xl font-semibold text-xs flex items-center gap-1.5 transition ${
                  isOcean
                    ? 'hover:bg-slate-800/80 text-sky-300'
                    : 'hover:bg-pink-100/70 text-pink-700'
                }`}
              >
                <Clock className="w-4 h-4" />
                <span>+15m Quick Focus Log</span>
              </button>
            ) : (
              <button
                onClick={finishQuickSession}
                className="px-4 py-3 rounded-2xl font-bold text-xs bg-emerald-500 text-slate-950 hover:bg-emerald-400 flex items-center gap-1.5 shadow"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Log +15m Session (+30 XP)</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mascot encouragement interactive card */}
      <Mascot />

      {/* Grid: 4 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Today Target & Ring */}
        <div
          className={`p-5 rounded-3xl border flex items-center justify-between transition-all ${
            isOcean
              ? 'bg-slate-900/80 border-sky-900/50 text-slate-100'
              : 'bg-white border-pink-100 text-slate-800 shadow-sm'
          }`}
        >
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Today's Target
            </span>
            <div className="text-2xl font-heading font-extrabold mt-1">
              {profile.todayStudyMinutes}{' '}
              <span className="text-xs text-slate-400 font-normal">
                / {profile.dailyTargetMinutes} min
              </span>
            </div>
            <p className="text-[11px] text-emerald-400 font-medium mt-1">
              {targetPercent}% completed today
            </p>
          </div>

          {/* Progress Ring */}
          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-slate-800/40"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={isOcean ? 'text-sky-400' : 'text-pink-500'}
                strokeDasharray={`${targetPercent}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-[11px] font-bold">
              {targetPercent}%
            </span>
          </div>
        </div>

        {/* Card 2: Streak & Momentum */}
        <div
          className={`p-5 rounded-3xl border flex items-center justify-between transition-all ${
            isOcean
              ? 'bg-slate-900/80 border-sky-900/50 text-slate-100'
              : 'bg-white border-pink-100 text-slate-800 shadow-sm'
          }`}
        >
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Current Streak
            </span>
            <div className="text-2xl font-heading font-extrabold mt-1 flex items-center gap-1.5">
              <span>{profile.streak} Days</span>
              <Flame className="w-5 h-5 text-amber-400 fill-amber-400 animate-pulse" />
            </div>
            <p className="text-[11px] text-amber-400 font-medium mt-1">
              Silver Orbit badge unlocked
            </p>
          </div>
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${
              isOcean ? 'bg-amber-400/10 text-amber-300' : 'bg-amber-50 text-amber-600'
            }`}
          >
            🔥
          </div>
        </div>

        {/* Card 3: Level & XP Points */}
        <div
          className={`p-5 rounded-3xl border flex items-center justify-between transition-all ${
            isOcean
              ? 'bg-slate-900/80 border-sky-900/50 text-slate-100'
              : 'bg-white border-pink-100 text-slate-800 shadow-sm'
          }`}
        >
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Student Level
            </span>
            <div className="text-2xl font-heading font-extrabold mt-1">
              Level {profile.level}: {profile.levelTitle}
            </div>
            <p className="text-[11px] text-sky-400 font-medium mt-1">
              {profile.xp} / {profile.nextLevelXp} Total XP
            </p>
          </div>
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl font-bold ${
              isOcean ? 'bg-sky-500/20 text-sky-300' : 'bg-pink-100 text-pink-600'
            }`}
          >
            L{profile.level}
          </div>
        </div>

        {/* Card 4: Upcoming Exam Countdown */}
        <div
          className={`p-5 rounded-3xl border flex items-center justify-between transition-all ${
            isOcean
              ? 'bg-slate-900/80 border-sky-900/50 text-slate-100'
              : 'bg-white border-pink-100 text-slate-800 shadow-sm'
          }`}
        >
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Exam Countdown
            </span>
            <div className="text-2xl font-heading font-extrabold mt-1 text-rose-400">
              {daysUntilExam} Days
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              Physics & CS Midterm
            </p>
          </div>
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center text-xl ${
              isOcean ? 'bg-rose-500/20 text-rose-300' : 'bg-rose-50 text-rose-600'
            }`}
          >
            ⏳
          </div>
        </div>
      </div>

      {/* Main Grid: Weekly Chart & Weak Topics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Activity Chart (2 cols) */}
        <div
          className={`lg:col-span-2 p-6 rounded-3xl border transition-all ${
            isOcean
              ? 'bg-slate-900/80 border-sky-900/50 text-slate-100'
              : 'bg-white border-pink-100 text-slate-800 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="font-heading font-bold text-lg">
                Weekly Study Activity
              </h2>
              <p className="text-xs text-slate-400">
                Total study time logged across the last 7 days
              </p>
            </div>
            <span
              className={`text-xs px-3 py-1 rounded-xl font-semibold ${
                isOcean
                  ? 'bg-sky-500/10 text-sky-300 border border-sky-500/20'
                  : 'bg-pink-50 text-pink-700 border border-pink-200'
              }`}
            >
              Total: {profile.totalStudyMinutes} min
            </span>
          </div>

          {/* Bar Chart representation */}
          <div className="flex items-end justify-between gap-3 h-44 pt-6 px-2">
            {weeklyData.map((d) => {
              const heightPercent = Math.max(12, Math.round((d.mins / maxWeeklyMins) * 100));
              return (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-2 group">
                  <span className="text-[10px] font-semibold opacity-0 group-hover:opacity-100 transition text-slate-400">
                    {d.mins}m
                  </span>
                  <div className="w-full bg-slate-800/30 rounded-2xl h-32 flex items-end p-1 overflow-hidden">
                    <div
                      className={`w-full rounded-xl transition-all duration-700 group-hover:brightness-110 ${
                        d.current
                          ? isOcean
                            ? 'bg-gradient-to-t from-sky-600 to-sky-400 shadow-md shadow-sky-500/20'
                            : 'bg-gradient-to-t from-pink-500 to-rose-400 shadow-md shadow-pink-500/20'
                          : isOcean
                          ? 'bg-slate-700 hover:bg-slate-600'
                          : 'bg-pink-200 hover:bg-pink-300'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span
                    className={`text-xs font-medium ${
                      d.current ? (isOcean ? 'text-sky-300 font-bold' : 'text-pink-600 font-bold') : 'text-slate-400'
                    }`}
                  >
                    {d.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weak Topics Revision Alert Box */}
        <div
          className={`p-6 rounded-3xl border flex flex-col justify-between transition-all ${
            isOcean
              ? 'bg-gradient-to-b from-slate-900/90 to-rose-950/20 border-rose-900/40 text-slate-100'
              : 'bg-gradient-to-b from-white to-rose-50/50 border-rose-200 text-slate-800 shadow-sm'
          }`}
        >
          <div>
            <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider mb-2">
              <AlertCircle className="w-4 h-4" />
              <span>Priority Revision Focus</span>
            </div>
            <h2 className="font-heading font-bold text-lg mb-1">
              Weak Topics Needing Care
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              AI detected lower diagnostic scores in these areas. Revising them
              now will quickly elevate your score!
            </p>

            <div className="space-y-3">
              {weakTopics.slice(0, 2).map((topic) => (
                <div
                  key={topic.topicId}
                  className={`p-3 rounded-2xl border transition ${
                    isOcean
                      ? 'bg-slate-950/60 border-slate-800'
                      : 'bg-white border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="font-semibold">{topic.topicName}</span>
                    <span className="font-bold text-rose-400">
                      {topic.masteryScore}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800/40 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-rose-500 rounded-full"
                      style={{ width: `${topic.masteryScore}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">
                    {topic.mistakeCount} recorded misconception traps
                  </p>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setActivePage('tutor')}
            className="mt-4 w-full py-2.5 rounded-xl text-xs font-bold bg-rose-500 text-white hover:bg-rose-600 transition flex items-center justify-center gap-1.5"
          >
            <span>Revise Weak Topics in AI Tutor</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Active Goals & Daily Missions row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Study Goals */}
        <div
          className={`p-6 rounded-3xl border transition-all ${
            isOcean
              ? 'bg-slate-900/80 border-sky-900/50 text-slate-100'
              : 'bg-white border-pink-100 text-slate-800 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-bold text-lg flex items-center gap-2">
              <Target className="w-5 h-5 text-sky-400" />
              <span>Active Study Goals</span>
            </h2>
            <button
              onClick={() => setActivePage('goals')}
              className="text-xs text-sky-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <span>Manage Goals</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {goals.slice(0, 2).map((goal) => {
              const completedMilestones = goal.milestones.filter((m) => m.completed).length;
              const totalMilestones = goal.milestones.length;
              const percent = totalMilestones > 0 ? Math.round((completedMilestones / totalMilestones) * 100) : 0;

              return (
                <div
                  key={goal.id}
                  onClick={() => setActivePage('goals')}
                  className={`p-3.5 rounded-2xl border cursor-pointer transition hover:opacity-95 ${
                    isOcean
                      ? 'bg-slate-950/60 border-slate-800 hover:border-sky-700'
                      : 'bg-slate-50/70 border-slate-200 hover:border-pink-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs font-semibold mb-1">
                    <span>{goal.title}</span>
                    <span className={percent === 100 ? 'text-emerald-400' : 'text-sky-400'}>
                      {percent}%
                    </span>
                  </div>
                  <div className="w-full h-1.5 bg-slate-800/40 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${isOcean ? 'bg-sky-400' : 'bg-pink-500'}`}
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2">
                    <span>{goal.subject} • {completedMilestones}/{totalMilestones} checkpoints</span>
                    <span>Due: {goal.targetDate}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Daily Mission Board */}
        <div
          className={`p-6 rounded-3xl border transition-all ${
            isOcean
              ? 'bg-slate-900/80 border-sky-900/50 text-slate-100'
              : 'bg-white border-pink-100 text-slate-800 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-heading font-bold text-lg flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>Daily Mission Board</span>
            </h2>
            <button
              onClick={() => setActivePage('achievements')}
              className="text-xs text-sky-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <span>View All</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-2.5">
            {missions.map((m) => (
              <div
                key={m.id}
                className={`p-3 rounded-2xl border flex items-center justify-between gap-3 ${
                  isOcean
                    ? 'bg-slate-950/60 border-slate-800'
                    : 'bg-slate-50/70 border-slate-200'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div
                    className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold ${
                      m.completed
                        ? 'bg-emerald-500 text-slate-950'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {m.completed ? '✓' : '○'}
                  </div>
                  <div>
                    <p className={`text-xs font-semibold ${m.claimed ? 'line-through opacity-60' : ''}`}>
                      {m.title}
                    </p>
                    <p className="text-[10px] text-slate-400">
                      Reward: +{m.xpReward} XP
                    </p>
                  </div>
                </div>

                {m.completed && !m.claimed && (
                  <button
                    onClick={() => setActivePage('achievements')}
                    className="text-xs font-bold px-2.5 py-1 rounded-xl bg-amber-400 text-slate-950 hover:bg-amber-300 transition"
                  >
                    Claim XP
                  </button>
                )}
                {m.claimed && (
                  <span className="text-[11px] text-emerald-400 font-semibold">
                    Claimed
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
