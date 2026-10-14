import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Clock,
  CheckCircle2,
  AlertCircle,
  Plus,
  Sparkles,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ScheduleItem } from '../types';

export const ScheduleView: React.FC = () => {
  const {
    schedule,
    toggleScheduleItem,
    addScheduleItem,
    theme,
    profile,
    setActivePage,
  } = useApp();

  const isOcean = theme === 'ocean';

  const [showAddModal, setShowAddModal] = useState(false);
  const [newTopic, setNewTopic] = useState('');
  const [newSubject, setNewSubject] = useState(profile.subjects[0] || 'Physics');
  const [newDate, setNewDate] = useState(new Date().toISOString().split('T')[0]);
  const [newTime, setNewTime] = useState('04:30 PM - 05:00 PM');
  const [newDuration, setNewDuration] = useState(30);
  const [newPriority, setNewPriority] = useState<'high' | 'medium' | 'low'>('high');
  const [newReason, setNewReason] = useState('Targeted revision to raise diagnostic mastery.');

  const handleAddSession = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTopic.trim()) return;

    addScheduleItem({
      date: newDate,
      timeSlot: newTime,
      subject: newSubject,
      topic: newTopic,
      durationMinutes: Number(newDuration),
      priority: newPriority,
      reason: newReason,
      completed: false,
      type: 'revision',
    });

    setNewTopic('');
    setShowAddModal(false);
  };

  // Exam Countdown in days
  const today = new Date();
  const examDateObj = new Date(profile.examDate || '2026-11-05');
  const diffTime = examDateObj.getTime() - today.getTime();
  const daysUntilExam = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

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
              Smart Study Schedule
            </span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold">
            Adaptive Revision Timetable
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            AI automatically arranges daily study sessions prioritizing your weak topics and upcoming exam deadlines.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-transform hover:scale-105 self-start sm:self-auto ${
            isOcean
              ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-sky-500/30'
              : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-pink-500/30'
          }`}
        >
          <Plus className="w-4 h-4" />
          <span>Add Custom Study Session</span>
        </button>
      </div>

      {/* Exam Countdown Card */}
      <div
        className={`p-6 rounded-3xl border flex flex-col sm:flex-row items-center justify-between gap-4 ${
          isOcean
            ? 'bg-gradient-to-r from-slate-900 to-sky-950/80 border-sky-800 text-white'
            : 'bg-gradient-to-r from-rose-50 to-pink-50 border-pink-200 text-slate-900'
        }`}
      >
        <div className="flex items-center gap-4">
          <div
            className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 ${
              isOcean ? 'bg-sky-500/20 text-sky-300' : 'bg-pink-200 text-pink-700'
            }`}
          >
            ⏳
          </div>
          <div>
            <h2 className="font-heading font-extrabold text-lg sm:text-xl">
              Major Exam Countdown: {profile.examDate}
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Only <strong>{daysUntilExam} days</strong> remaining. Your schedule is dynamically balanced to cover all weak topics with zero cramming stress.
            </p>
          </div>
        </div>

        <div className="text-center sm:text-right shrink-0">
          <span className="text-3xl font-heading font-extrabold text-rose-400">
            {daysUntilExam} Days
          </span>
          <div className="text-[11px] text-slate-400">To Final Preparation</div>
        </div>
      </div>

      {/* Scheduled Sessions List */}
      <div className="space-y-3">
        <h2 className="font-heading font-bold text-lg">
          Upcoming Scheduled Sessions
        </h2>

        {schedule.map((item) => (
          <div
            key={item.id}
            className={`p-5 rounded-3xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
              item.completed
                ? isOcean
                  ? 'bg-slate-950/40 border-slate-800 opacity-60'
                  : 'bg-slate-50 border-slate-200 opacity-60'
                : isOcean
                ? 'bg-slate-900/80 border-sky-900/40 text-slate-100 hover:border-sky-700'
                : 'bg-white border-pink-100 text-slate-900 shadow-sm hover:border-pink-300'
            }`}
          >
            <div className="flex items-start gap-3.5">
              <button
                onClick={() => toggleScheduleItem(item.id)}
                className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition ${
                  item.completed
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : isOcean
                    ? 'bg-slate-800 hover:bg-slate-700 text-slate-400'
                    : 'bg-slate-200 hover:bg-slate-300 text-slate-600'
                }`}
                title={item.completed ? 'Mark pending' : 'Mark completed'}
              >
                {item.completed ? '✓' : '○'}
              </button>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      isOcean ? 'bg-sky-500/20 text-sky-300' : 'bg-pink-100 text-pink-700'
                    }`}
                  >
                    {item.subject}
                  </span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                      item.priority === 'high'
                        ? 'bg-rose-500/20 text-rose-400'
                        : item.priority === 'medium'
                        ? 'bg-amber-500/20 text-amber-400'
                        : 'bg-slate-800 text-slate-400'
                    }`}
                  >
                    {item.priority} Priority
                  </span>
                  <span className="text-[11px] text-slate-400">
                    📅 {item.date} • ⏰ {item.timeSlot}
                  </span>
                </div>

                <h3 className={`font-semibold text-sm sm:text-base ${item.completed ? 'line-through' : ''}`}>
                  {item.topic}
                </h3>

                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  💡 <strong className="text-slate-300">Why selected:</strong> {item.reason}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              <button
                onClick={() => setActivePage('tutor')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition flex items-center gap-1 ${
                  isOcean
                    ? 'border-sky-800/60 hover:bg-slate-800 text-sky-300'
                    : 'border-pink-200 hover:bg-pink-50 text-pink-700'
                }`}
              >
                <span>Study Now</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Session Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className={`w-full max-w-md p-6 rounded-3xl border shadow-2xl relative ${
              isOcean
                ? 'bg-slate-900 border-sky-800 text-slate-100'
                : 'bg-white border-pink-200 text-slate-900'
            }`}
          >
            <h2 className="font-heading font-bold text-xl mb-1">
              Add Study Session 📅
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              Schedule a focused review or practice block into your timetable.
            </p>

            <form onSubmit={handleAddSession} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                  Topic
                </label>
                <input
                  type="text"
                  required
                  value={newTopic}
                  onChange={(e) => setNewTopic(e.target.value)}
                  placeholder="e.g. Newton's 3rd Law Free Body Diagrams"
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
                    Priority
                  </label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className={`w-full px-3 py-2.5 rounded-xl border text-sm outline-none ${
                      isOcean
                        ? 'bg-slate-950 border-sky-800 text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                    Date
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

                <div>
                  <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                    Time Slot
                  </label>
                  <input
                    type="text"
                    value={newTime}
                    onChange={(e) => setNewTime(e.target.value)}
                    placeholder="04:30 PM - 05:00 PM"
                    className={`w-full px-3 py-2.5 rounded-xl border text-sm outline-none ${
                      isOcean
                        ? 'bg-slate-950 border-sky-800 text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                  Why is this scheduled? (Rationale)
                </label>
                <input
                  type="text"
                  value={newReason}
                  onChange={(e) => setNewReason(e.target.value)}
                  placeholder="e.g. Diagnostic score was below 50%"
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
                  onClick={() => setShowAddModal(false)}
                  className="w-1/3 py-2.5 rounded-xl text-xs font-semibold border border-slate-700 hover:bg-slate-800"
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
                  Save to Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
