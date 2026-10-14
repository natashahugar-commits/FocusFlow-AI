import React from 'react';
import {
  Trophy,
  Award,
  Sparkles,
  Flame,
  CheckCircle2,
  Lock,
  ArrowRight,
  TrendingUp,
  Star,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LEVEL_THRESHOLDS } from '../services/storage';

export const AchievementsView: React.FC = () => {
  const {
    profile,
    missions,
    claimMissionReward,
    weeklyChallenge,
    claimWeeklyReward,
    badges,
    theme,
    triggerCelebration,
  } = useApp();

  const isOcean = theme === 'ocean';

  const currentLevelObj =
    LEVEL_THRESHOLDS.find((l) => l.level === profile.level) || LEVEL_THRESHOLDS[0];

  const xpInCurrentTier = profile.xp - currentLevelObj.minXp;
  const tierRange = currentLevelObj.maxXp - currentLevelObj.minXp;
  const levelProgressPercent = Math.min(
    100,
    Math.max(5, Math.round((xpInCurrentTier / tierRange) * 100))
  );

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
            Gamification & Badges
          </span>
        </div>
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold">
          Achievements & Daily Mission Board
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Complete actual study tasks to earn XP, level up, and unlock rare badges.
        </p>
      </div>

      {/* Level Progression Hero */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden transition-all ${
          isOcean
            ? 'bg-gradient-to-r from-slate-900 via-sky-950/70 to-slate-900 border-sky-800 text-white shadow-xl shadow-sky-950/50'
            : 'bg-gradient-to-r from-pink-50 via-rose-50 to-purple-50 border-pink-200 text-slate-900 shadow-md shadow-pink-100'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 mb-6">
          <div className="flex items-center gap-4">
            <div
              className={`w-16 h-16 sm:w-20 sm:h-20 rounded-3xl flex items-center justify-center font-heading font-extrabold text-2xl sm:text-3xl shadow-lg ${
                isOcean
                  ? 'bg-gradient-to-tr from-sky-500 to-blue-600 text-slate-950 shadow-sky-500/30'
                  : 'bg-gradient-to-tr from-pink-500 to-rose-500 text-white shadow-pink-500/30'
              }`}
            >
              L{profile.level}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Current Rank
                </span>
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300">
                  {profile.streak} Day Streak 🔥
                </span>
              </div>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl">
                {profile.levelTitle}
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Total XP Earned: <strong className="text-sky-300">{profile.xp} XP</strong>
              </p>
            </div>
          </div>

          <div className="text-left sm:text-right">
            <div className="text-xs text-slate-400">Next Milestone</div>
            <div className="text-lg font-bold">
              {profile.nextLevelXp - profile.xp} XP to Level {profile.level + 1}
            </div>
          </div>
        </div>

        {/* Level Progression Progress Bar */}
        <div>
          <div className="flex justify-between text-xs font-semibold mb-1.5 opacity-80">
            <span>{currentLevelObj.title} ({currentLevelObj.minXp} XP)</span>
            <span>{levelProgressPercent}%</span>
            <span>Next Level ({currentLevelObj.maxXp} XP)</span>
          </div>
          <div className="w-full h-3 bg-black/30 rounded-full overflow-hidden p-0.5">
            <div
              className={`h-full rounded-full transition-all duration-700 ${
                isOcean
                  ? 'bg-gradient-to-r from-sky-400 to-blue-500 shadow-sm shadow-sky-400'
                  : 'bg-gradient-to-r from-pink-400 to-rose-500 shadow-sm shadow-pink-400'
              }`}
              style={{ width: `${levelProgressPercent}%` }}
            />
          </div>
        </div>

        {/* Levels Ladder */}
        <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between overflow-x-auto gap-3 text-center">
          {LEVEL_THRESHOLDS.map((tier) => {
            const isUnlocked = profile.level >= tier.level;
            const isCurrent = profile.level === tier.level;

            return (
              <div key={tier.level} className="flex-1 min-w-[70px]">
                <div
                  className={`w-8 h-8 mx-auto rounded-xl flex items-center justify-center font-bold text-xs mb-1 transition ${
                    isCurrent
                      ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-400/50 scale-110'
                      : isUnlocked
                      ? isOcean
                        ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                        : 'bg-pink-100 text-pink-700 border border-pink-200'
                      : 'bg-slate-800 text-slate-500 opacity-50'
                  }`}
                >
                  {isUnlocked ? '✓' : `L${tier.level}`}
                </div>
                <div className="text-[11px] font-bold">{tier.title}</div>
                <div className="text-[9px] text-slate-400">{tier.minXp} XP</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Grid: Daily Missions & Weekly Challenge */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Daily Mission Board (2 cols) */}
        <div
          className={`lg:col-span-2 p-6 rounded-3xl border transition-all ${
            isOcean
              ? 'bg-slate-900/80 border-sky-900/40 text-slate-100 shadow-md shadow-sky-950/20'
              : 'bg-white border-pink-100 text-slate-900 shadow-sm'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="font-heading font-bold text-xl flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                <span>Daily Mission Board</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Resets daily at midnight. Complete tasks to claim bonus XP rewards.
              </p>
            </div>
            <span
              className={`text-xs px-2.5 py-1 rounded-xl font-bold ${
                isOcean ? 'bg-sky-500/20 text-sky-300' : 'bg-pink-100 text-pink-700'
              }`}
            >
              {missions.filter((m) => m.claimed).length} / {missions.length} Claimed
            </span>
          </div>

          <div className="space-y-3">
            {missions.map((mission) => {
              return (
                <div
                  key={mission.id}
                  className={`p-4 rounded-2xl border transition flex items-center justify-between gap-4 ${
                    mission.claimed
                      ? isOcean
                        ? 'bg-slate-950/40 border-slate-800/60 opacity-60'
                        : 'bg-slate-50 border-slate-200 opacity-60'
                      : mission.completed
                      ? isOcean
                        ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-200'
                        : 'bg-emerald-50 border-emerald-200 text-emerald-900'
                      : isOcean
                      ? 'bg-slate-950/60 border-slate-800'
                      : 'bg-slate-50/70 border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-sm shrink-0 ${
                        mission.claimed
                          ? 'bg-slate-800 text-slate-500'
                          : mission.completed
                          ? 'bg-emerald-500 text-slate-950'
                          : isOcean
                          ? 'bg-slate-800 text-slate-400'
                          : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      {mission.claimed || mission.completed ? '✓' : '○'}
                    </div>

                    <div>
                      <h3 className={`font-semibold text-xs sm:text-sm ${mission.claimed ? 'line-through' : ''}`}>
                        {mission.title}
                      </h3>
                      <div className="text-[11px] text-slate-400 mt-0.5">
                        Progress: {mission.currentCount} / {mission.targetCount} {mission.unit} • Reward: +{mission.xpReward} XP
                      </div>
                    </div>
                  </div>

                  <div>
                    {mission.completed && !mission.claimed ? (
                      <button
                        onClick={() => claimMissionReward(mission.id)}
                        className="px-4 py-2 rounded-xl text-xs font-bold bg-amber-400 text-slate-950 hover:bg-amber-300 transition shadow animate-pulse"
                      >
                        Claim +{mission.xpReward} XP!
                      </button>
                    ) : mission.claimed ? (
                      <span className="text-xs text-emerald-400 font-bold px-2">
                        Claimed
                      </span>
                    ) : (
                      <span className="text-xs text-slate-500 font-medium px-2">
                        In Progress
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Weekly Challenge Card */}
        <div
          className={`p-6 rounded-3xl border flex flex-col justify-between transition-all ${
            isOcean
              ? 'bg-slate-900/80 border-sky-900/40 text-slate-100 shadow-md'
              : 'bg-white border-pink-100 text-slate-900 shadow-sm'
          }`}
        >
          <div>
            <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>Weekly Challenge</span>
            </div>
            <h2 className="font-heading font-bold text-xl mb-1">
              {weeklyChallenge.title}
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              {weeklyChallenge.description}
            </p>

            <div className="p-4 rounded-2xl bg-black/20 border border-white/5 space-y-2 mb-4">
              <div className="flex justify-between text-xs font-semibold">
                <span>Quizzes Completed</span>
                <span>{weeklyChallenge.current} / {weeklyChallenge.target}</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-400"
                  style={{
                    width: `${Math.min(100, Math.round((weeklyChallenge.current / weeklyChallenge.target) * 100))}%`,
                  }}
                />
              </div>
            </div>

            <div className="text-xs text-slate-400 space-y-1">
              <div>🎁 <strong>XP Reward:</strong> +{weeklyChallenge.xpReward} XP</div>
              <div>🏅 <strong>Exclusive Badge:</strong> {weeklyChallenge.badgeReward}</div>
            </div>
          </div>

          <div className="mt-6">
            {weeklyChallenge.completed && !weeklyChallenge.claimed ? (
              <button
                onClick={claimWeeklyReward}
                className="w-full py-3 rounded-2xl font-bold text-xs bg-amber-400 text-slate-950 hover:bg-amber-300 transition shadow"
              >
                Claim Weekly Rewards! ✨
              </button>
            ) : weeklyChallenge.claimed ? (
              <div className="text-center text-xs font-bold text-emerald-400 py-2">
                Challenge Completed & Claimed!
              </div>
            ) : (
              <div className="text-center text-xs text-slate-400 py-2">
                Keep practicing to complete before Sunday!
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Badge Showcase */}
      <div
        className={`p-6 sm:p-8 rounded-3xl border transition-all ${
          isOcean
            ? 'bg-slate-900/80 border-sky-900/40 text-slate-100 shadow-md'
            : 'bg-white border-pink-100 text-slate-900 shadow-sm'
        }`}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-heading font-bold text-xl flex items-center gap-2">
              <Award className="w-5 h-5 text-sky-400" />
              <span>Badge Trophy Cabinet</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Unlock rare achievements across streak consistency, quiz accuracy, and goal completions.
            </p>
          </div>
          <span className="text-xs font-bold text-amber-400">
            {badges.filter((b) => b.unlocked).length} / {badges.length} Unlocked
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {badges.map((badge) => {
            return (
              <div
                key={badge.id}
                className={`p-4 rounded-2xl border text-center transition flex flex-col items-center justify-between ${
                  badge.unlocked
                    ? isOcean
                      ? 'bg-sky-950/40 border-sky-500/40 text-sky-200 shadow-sm'
                      : 'bg-pink-50/70 border-pink-300 text-pink-900 shadow-sm'
                    : 'bg-slate-950/40 border-slate-800/60 opacity-50 text-slate-500'
                }`}
              >
                <div className="w-12 h-12 rounded-2xl bg-black/20 flex items-center justify-center text-2xl mb-2">
                  {badge.unlocked ? (
                    badge.rarity === 'gold' ? '🥇' : badge.rarity === 'cosmic' ? '🪐' : badge.rarity === 'dream' ? '🌸' : '⭐'
                  ) : (
                    <Lock className="w-5 h-5" />
                  )}
                </div>

                <div className="font-bold text-xs mb-1 line-clamp-1">
                  {badge.name}
                </div>

                <p className="text-[10px] opacity-75 line-clamp-2 leading-tight mb-2">
                  {badge.description}
                </p>

                <span
                  className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded-full ${
                    badge.unlocked
                      ? 'bg-emerald-500/20 text-emerald-400'
                      : 'bg-slate-800 text-slate-500'
                  }`}
                >
                  {badge.unlocked ? 'Unlocked' : 'Locked'}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
