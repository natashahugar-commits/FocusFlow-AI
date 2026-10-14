import React from 'react';
import {
  X,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Award,
  BookOpen,
  Target,
  TrendingUp,
  LayoutDashboard,
  Calendar,
  Compass,
  Heart,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ActivePage, ThemeMode } from '../types';

interface DemoTourModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DemoTourModal: React.FC<DemoTourModalProps> = ({ isOpen, onClose }) => {
  const {
    theme,
    setTheme,
    setActivePage,
    triggerCelebration,
    awardXp,
  } = useApp();

  if (!isOpen) return null;

  const isOcean = theme === 'ocean';

  const demoSteps: {
    step: number;
    title: string;
    description: string;
    actionLabel: string;
    icon: React.FC<{ className?: string }>;
    execute: () => void;
  }[] = [
    {
      step: 1,
      title: 'Select or Toggle Theme',
      description: 'Experience dual aesthetics: high-energy Ocean Explorer 💙 vs dreamy Pink Dreamland 🩷 without resetting any study progress.',
      actionLabel: `Toggle to ${isOcean ? 'Pink Dreamland 🩷' : 'Ocean Explorer 💙'}`,
      icon: isOcean ? Compass : Heart,
      execute: () => {
        setTheme(isOcean ? 'pink' : 'ocean');
        triggerCelebration();
      },
    },
    {
      step: 2,
      title: 'Explore "My Study World" Dashboard',
      description: 'Inspect today’s study target, weekly activity graph, subject-wise breakdown, urgent weak-topic alert, and streak counters.',
      actionLabel: 'Go to Dashboard',
      icon: LayoutDashboard,
      execute: () => {
        setActivePage('dashboard');
        onClose();
      },
    },
    {
      step: 3,
      title: 'Open Material Library & Citations',
      description: 'Inspect indexed textbooks (Java OOP, Classical Mechanics, Genetics) with real extracted chunks and page/slide citations.',
      actionLabel: 'Go to Material Library',
      icon: BookOpen,
      execute: () => {
        setActivePage('library');
        onClose();
      },
    },
    {
      step: 4,
      title: 'Ask AI Study Tutor & Inspect Sources',
      description: 'Query concepts in Step-by-Step, Practice, or Hint mode with grounded source citations and external-knowledge labels.',
      actionLabel: 'Launch AI Tutor',
      icon: Sparkles,
      execute: () => {
        setActivePage('tutor');
        onClose();
      },
    },
    {
      step: 5,
      title: 'Take an Adaptive Quiz',
      description: 'Try multiple choice, short-answer, or numerical questions with instant diagnostic feedback, citations, and XP rewards.',
      actionLabel: 'Start Practice Quiz',
      icon: Award,
      execute: () => {
        setActivePage('quizzes');
        onClose();
      },
    },
    {
      step: 6,
      title: 'Identify Weak Topics & Mistake Patterns',
      description: 'View "My Mistake Patterns" analyzing recurring conceptual traps (e.g. Action-Reaction symmetry vs equilibrium).',
      actionLabel: 'View Analytics & Patterns',
      icon: TrendingUp,
      execute: () => {
        setActivePage('progress');
        onClose();
      },
    },
    {
      step: 7,
      title: 'Create an Interactive Revision Goal',
      description: 'Break complex subjects into micro-milestones with circular progress rings and supportive overdue coaching.',
      actionLabel: 'Open Goal Planner',
      icon: Target,
      execute: () => {
        setActivePage('goals');
        onClose();
      },
    },
    {
      step: 8,
      title: 'Complete a Study Mission & Earn XP',
      description: 'Claim daily mission board rewards, unlock achievements, and watch celebratory confetti.',
      actionLabel: 'Open Achievements & Missions',
      icon: Sparkles,
      execute: () => {
        setActivePage('achievements');
        onClose();
      },
    },
    {
      step: 9,
      title: 'Review Dynamic Study Schedule',
      description: 'See how upcoming exam deadlines and weak topics automatically shape an adaptive daily study schedule.',
      actionLabel: 'View Smart Schedule',
      icon: Calendar,
      execute: () => {
        setActivePage('schedule');
        onClose();
      },
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className={`w-full max-w-2xl max-h-[90vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden transition-all duration-300 ${
          isOcean
            ? 'bg-slate-900 border-sky-800 text-slate-100 shadow-sky-950/50'
            : 'bg-white border-pink-200 text-slate-900 shadow-pink-200/50'
        }`}
      >
        {/* Header */}
        <div
          className={`px-6 py-4 border-b flex items-center justify-between ${
            isOcean ? 'border-sky-950 bg-slate-950/60' : 'border-pink-100 bg-pink-50/50'
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`w-9 h-9 rounded-xl flex items-center justify-center text-lg ${
                isOcean ? 'bg-sky-500/20 text-sky-300' : 'bg-pink-100 text-pink-600'
              }`}
            >
              🚀
            </div>
            <div>
              <h2 className="font-heading font-bold text-lg">
                Hackathon Demo Guide (9-Step Flow)
              </h2>
              <p className="text-xs text-slate-400">
                Explore the complete end-to-end journey built for judges & users
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl opacity-70 hover:opacity-100 hover:bg-slate-800/50 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps List */}
        <div className="p-6 overflow-y-auto space-y-3 flex-1">
          {demoSteps.map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className={`p-3.5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                  isOcean
                    ? 'bg-slate-950/50 hover:bg-slate-950/80 border-sky-900/40'
                    : 'bg-slate-50/70 hover:bg-pink-50/50 border-slate-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 mt-0.5 ${
                      isOcean ? 'bg-sky-500 text-slate-950' : 'bg-pink-500 text-white'
                    }`}
                  >
                    {s.step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm flex items-center gap-2">
                      <Icon className="w-4 h-4 text-sky-400" />
                      {s.title}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                      {s.description}
                    </p>
                  </div>
                </div>

                <button
                  onClick={s.execute}
                  className={`self-end sm:self-center shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition ${
                    isOcean
                      ? 'bg-sky-600/30 hover:bg-sky-600 text-sky-200 hover:text-white border border-sky-500/40'
                      : 'bg-pink-100 hover:bg-pink-500 text-pink-700 hover:text-white border border-pink-200'
                  }`}
                >
                  <span>{s.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div
          className={`px-6 py-3.5 border-t flex items-center justify-between text-xs ${
            isOcean ? 'border-sky-950 bg-slate-950/60 text-slate-400' : 'border-pink-100 bg-pink-50/40 text-slate-500'
          }`}
        >
          <span>All 12 pages are interactive and persist real progress.</span>
          <button
            onClick={onClose}
            className={`font-semibold px-4 py-1.5 rounded-xl transition ${
              isOcean
                ? 'bg-sky-500 text-slate-950 hover:bg-sky-400'
                : 'bg-pink-500 text-white hover:bg-pink-600'
            }`}
          >
            Got it, Let's Explore!
          </button>
        </div>
      </div>
    </div>
  );
};
