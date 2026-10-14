import React, { useState } from 'react';
import {
  Target,
  Plus,
  CheckCircle2,
  Circle,
  Calendar,
  Clock,
  Sparkles,
  Trash2,
  Filter,
  HeartHandshake,
  ArrowRight,
  TrendingUp,
  Award,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StudyGoal } from '../types';

export const GoalsView: React.FC = () => {
  const {
    goals,
    addGoal,
    toggleGoalMilestone,
    deleteGoal,
    theme,
    awardXp,
    triggerCelebration,
    profile,
  } = useApp();

  const isOcean = theme === 'ocean';

  // Filters: 'all' | 'today' | 'week' | 'long-term' | 'completed' | 'overdue'
  const [filter, setFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New goal form state
  const [newTitle, setNewTitle] = useState('');
  const [newSubject, setNewSubject] = useState(profile.subjects[0] || 'Computer Science');
  const [newTopic, setNewTopic] = useState('');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [newMinutes, setNewMinutes] = useState(60);
  const [newMilestonesText, setNewMilestonesText] = useState(
    'Understand classes and objects\nLearn variables and methods\nPractise constructors\nComplete a quiz\nPass a final mastery test'
  );
  const [newNotes, setNewNotes] = useState('');

  const todayStr = new Date().toISOString().split('T')[0];

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const milestonesList = newMilestonesText
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .map((line, idx) => ({
        id: `ms-${Date.now()}-${idx}`,
        title: line,
        completed: false,
        xpReward: 20,
      }));

    addGoal({
      title: newTitle.trim(),
      subject: newSubject,
      topic: newTopic || 'General Topic',
      targetDate: newDate,
      estimatedMinutes: Number(newMinutes),
      milestones: milestonesList,
      notes: newNotes,
    });

    // Reset and close
    setNewTitle('');
    setNewTopic('');
    setNewNotes('');
    setIsModalOpen(false);
    triggerCelebration();
  };

  // Filter logic
  const filteredGoals = goals.filter((g) => {
    const isCompleted = g.completed || (g.milestones.length > 0 && g.milestones.every((m) => m.completed));
    const isOverdue = !isCompleted && g.targetDate < todayStr;

    if (filter === 'completed') return isCompleted;
    if (filter === 'overdue') return isOverdue;
    if (filter === 'today') return g.targetDate === todayStr;
    if (filter === 'pending') return !isCompleted;
    if (filter === 'long-term') return g.targetDate > todayStr;
    return true;
  });

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-200">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xl">{isOcean ? '🪐' : '🌸'}</span>
            <span
              className={`text-xs font-bold uppercase tracking-wider ${
                isOcean ? 'text-sky-400' : 'text-pink-600'
              }`}
            >
              Goal & Target Planner
            </span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold">
            My Study Goals & Milestone Journeys
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Break big academic mountains into bite-sized daily achievements.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-transform hover:scale-105 self-start sm:self-auto ${
            isOcean
              ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-sky-500/30'
              : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-pink-500/30'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>Create New Study Goal</span>
        </button>
      </div>

      {/* Gentle Supportive Banner for any overdue items */}
      {goals.some((g) => !g.completed && g.targetDate < todayStr) && (
        <div
          className={`p-4 rounded-2xl border flex items-center gap-3 text-xs leading-relaxed ${
            isOcean
              ? 'bg-sky-950/40 border-sky-800 text-sky-200'
              : 'bg-pink-50 border-pink-200 text-pink-900'
          }`}
        >
          <HeartHandshake className="w-5 h-5 text-amber-400 shrink-0" />
          <div>
            <strong className="font-semibold">Gentle Reminder:</strong> Life
            happens! If any target is past its original date, don't worry at all.
            You can reschedule or check off steps whenever you are ready. Your
            progress is always preserved!
          </div>
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {[
          { id: 'all', label: 'All Goals' },
          { id: 'pending', label: 'Pending' },
          { id: 'today', label: "Today's Targets" },
          { id: 'long-term', label: 'Upcoming / Long-Term' },
          { id: 'completed', label: 'Completed 🏆' },
          { id: 'overdue', label: 'Needs Reschedule 💙' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition ${
              filter === tab.id
                ? isOcean
                  ? 'bg-sky-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-pink-500 text-white font-bold shadow-sm'
                : isOcean
                ? 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border border-slate-800'
                : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Goals Cards List */}
      <div className="space-y-6">
        {filteredGoals.length === 0 ? (
          <div
            className={`p-10 text-center rounded-3xl border ${
              isOcean
                ? 'bg-slate-900/50 border-slate-800 text-slate-400'
                : 'bg-white border-slate-200 text-slate-500'
            }`}
          >
            <Target className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="text-sm font-semibold">No goals in this category.</p>
            <p className="text-xs opacity-70 mt-1">
              Create a new study target or select another filter!
            </p>
          </div>
        ) : (
          filteredGoals.map((goal) => {
            const completedCount = goal.milestones.filter((m) => m.completed).length;
            const totalCount = goal.milestones.length;
            const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
            const isGoalDone = percent === 100;
            const isOverdue = !isGoalDone && goal.targetDate < todayStr;

            return (
              <div
                key={goal.id}
                className={`p-6 rounded-3xl border transition-all ${
                  isOcean
                    ? 'bg-slate-900/80 border-sky-900/40 text-slate-100 shadow-md shadow-sky-950/20'
                    : 'bg-white border-pink-100 text-slate-900 shadow-sm'
                }`}
              >
                {/* Header of Goal Card */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase ${
                          isOcean
                            ? 'bg-sky-500/15 text-sky-300'
                            : 'bg-pink-100 text-pink-700'
                        }`}
                      >
                        {goal.subject}
                      </span>
                      {isOverdue && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300">
                          Supportive Catch-up
                        </span>
                      )}
                      {isGoalDone && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400">
                          Goal Mastered! ✨
                        </span>
                      )}
                    </div>
                    <h2 className="font-heading font-bold text-lg sm:text-xl">
                      {goal.title}
                    </h2>
                  </div>

                  <div className="flex items-center gap-3">
                    {/* Circular Progress Ring */}
                    <div className="flex items-center gap-2">
                      <div className="relative w-12 h-12 flex items-center justify-center">
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
                            strokeDasharray={`${percent}, 100`}
                            strokeWidth="3.5"
                            strokeLinecap="round"
                            stroke="currentColor"
                            fill="none"
                            d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                          />
                        </svg>
                        <span className="absolute text-[10px] font-bold">
                          {percent}%
                        </span>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold">{completedCount}/{totalCount}</div>
                        <div className="text-[10px] text-slate-400">Checkpoints</div>
                      </div>
                    </div>

                    <button
                      onClick={() => deleteGoal(goal.id)}
                      className="p-2 rounded-xl text-slate-500 hover:text-rose-400 hover:bg-slate-800/50 transition"
                      title="Delete Goal"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Linear progress bar */}
                <div className="w-full h-2 bg-slate-800/40 rounded-full mb-6 overflow-hidden">
                  <div
                    className={`h-full transition-all duration-500 ${
                      isGoalDone
                        ? 'bg-emerald-400'
                        : isOcean
                        ? 'bg-gradient-to-r from-sky-500 to-blue-400'
                        : 'bg-gradient-to-r from-pink-500 to-rose-400'
                    }`}
                    style={{ width: `${percent}%` }}
                  />
                </div>

                {/* Milestone Journey Path with Checkpoints along a path */}
                <div className="mb-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                    <span>Visual Milestone Journey</span>
                  </h3>

                  <div className="space-y-2">
                    {goal.milestones.map((milestone, idx) => {
                      return (
                        <div
                          key={milestone.id}
                          onClick={() => toggleGoalMilestone(goal.id, milestone.id)}
                          className={`p-3 rounded-2xl border flex items-center justify-between cursor-pointer transition select-none ${
                            milestone.completed
                              ? isOcean
                                ? 'bg-sky-950/40 border-sky-800/60 text-sky-200'
                                : 'bg-pink-50/80 border-pink-200 text-pink-900'
                              : isOcean
                              ? 'bg-slate-950/40 border-slate-800/80 hover:border-slate-700'
                              : 'bg-slate-50/80 border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <div
                              className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-xs ${
                                milestone.completed
                                  ? 'bg-emerald-500 text-slate-950'
                                  : isOcean
                                  ? 'bg-slate-800 text-slate-400'
                                  : 'bg-slate-200 text-slate-600'
                              }`}
                            >
                              {milestone.completed ? '✓' : idx + 1}
                            </div>
                            <span
                              className={`text-xs sm:text-sm font-medium ${
                                milestone.completed ? 'line-through opacity-80' : ''
                              }`}
                            >
                              {milestone.title}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <span
                              className={`text-[11px] font-semibold px-2 py-0.5 rounded-md ${
                                milestone.completed
                                  ? 'bg-emerald-500/20 text-emerald-400'
                                  : 'bg-slate-800/40 text-slate-400'
                              }`}
                            >
                              +{milestone.xpReward || 15} XP
                            </span>
                            {milestone.completed ? (
                              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                            ) : (
                              <Circle className="w-5 h-5 text-slate-500" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Goal Meta info */}
                <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400 pt-3 border-t border-slate-800/50">
                  <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      Target Date: <strong>{goal.targetDate}</strong>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      Est. Time: {goal.estimatedMinutes}m
                    </span>
                  </div>

                  {goal.notes && (
                    <span className="italic text-[11px] opacity-80">
                      Note: {goal.notes}
                    </span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Create Goal Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className={`w-full max-w-lg p-6 rounded-3xl border shadow-2xl relative max-h-[90vh] overflow-y-auto ${
              isOcean
                ? 'bg-slate-900 border-sky-800 text-slate-100'
                : 'bg-white border-pink-200 text-slate-900'
            }`}
          >
            <h2 className="font-heading font-bold text-xl mb-1">
              Create New Study Goal 🎯
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              Define your subject, target deadline, and daily milestone steps.
            </p>

            <form onSubmit={handleCreateGoal} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                  Goal Title
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Master Java Basics & OOP"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none ${
                    isOcean
                      ? 'bg-slate-950 border-sky-800 text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                    Subject
                  </label>
                  <select
                    value={newSubject}
                    onChange={(e) => setNewSubject(e.target.value)}
                    className={`w-full px-3 py-2.5 rounded-xl border text-sm outline-none ${
                      isOcean
                        ? 'bg-slate-950 border-sky-800 text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    {profile.subjects.map((sub) => (
                      <option key={sub} value={sub} className="bg-slate-900 text-white">
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                    Target Date
                  </label>
                  <input
                    type="date"
                    required
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className={`w-full px-3 py-2.5 rounded-xl border text-sm outline-none ${
                      isOcean
                        ? 'bg-slate-950 border-sky-800 text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                    Specific Topic
                  </label>
                  <input
                    type="text"
                    value={newTopic}
                    onChange={(e) => setNewTopic(e.target.value)}
                    placeholder="e.g. Constructors & Inheritance"
                    className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none ${
                      isOcean
                        ? 'bg-slate-950 border-sky-800 text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                    Estimated Minutes
                  </label>
                  <input
                    type="number"
                    value={newMinutes}
                    onChange={(e) => setNewMinutes(Number(e.target.value))}
                    min={10}
                    step={10}
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
                  Milestone Checkpoints (One per line)
                </label>
                <textarea
                  rows={4}
                  value={newMilestonesText}
                  onChange={(e) => setNewMilestonesText(e.target.value)}
                  placeholder="Understand classes&#10;Practice variables&#10;Complete diagnostic quiz"
                  className={`w-full p-3 rounded-xl border text-xs leading-relaxed outline-none font-mono ${
                    isOcean
                      ? 'bg-slate-950 border-sky-800 text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                  Personal Notes / Focus Strategy
                </label>
                <input
                  type="text"
                  value={newNotes}
                  onChange={(e) => setNewNotes(e.target.value)}
                  placeholder="e.g. Focus on edge cases and memory references"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none ${
                    isOcean
                      ? 'bg-slate-950 border-sky-800 text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="w-1/3 py-2.5 rounded-xl text-xs font-semibold border border-slate-700 hover:bg-slate-800/50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className={`w-2/3 py-2.5 rounded-xl text-xs font-bold transition shadow ${
                    isOcean
                      ? 'bg-sky-500 text-slate-950 hover:bg-sky-400'
                      : 'bg-pink-500 text-white hover:bg-pink-600'
                  }`}
                >
                  Add Study Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
