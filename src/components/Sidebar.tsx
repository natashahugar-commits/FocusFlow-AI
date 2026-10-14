import React from 'react';
import {
  LayoutDashboard,
  Target,
  Sparkles,
  Award,
  BookOpen,
  Calendar,
  TrendingUp,
  Trophy,
  GraduationCap,
  Settings,
  HelpCircle,
  Flame,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ActivePage } from '../types';

interface SidebarProps {
  onOpenDemoTour: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ onOpenDemoTour }) => {
  const { activePage, setActivePage, theme, missions } = useApp();
  const isOcean = theme === 'ocean';

  const pendingMissionsCount = missions.filter((m) => m.completed && !m.claimed).length;

  const navItems: { id: ActivePage; label: string; icon: React.FC<{ className?: string }>; badge?: number | string }[] = [
    { id: 'dashboard', label: 'My Study World', icon: LayoutDashboard },
    { id: 'goals', label: 'My Goals & Targets', icon: Target },
    { id: 'tutor', label: 'AI Study Tutor', icon: Sparkles },
    { id: 'quizzes', label: 'Adaptive Quizzes', icon: Award },
    { id: 'progress', label: 'Progress & Analytics', icon: TrendingUp },
    { id: 'schedule', label: 'Study Schedule', icon: Calendar },
    { id: 'library', label: 'Material Library', icon: BookOpen },
    { id: 'subjects', label: 'My Subjects', icon: GraduationCap },
    { id: 'achievements', label: 'Achievements & Missions', icon: Trophy, badge: pendingMissionsCount > 0 ? pendingMissionsCount : undefined },
    { id: 'settings', label: 'Settings & Theme', icon: Settings },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col w-64 shrink-0 border-r min-h-[calc(100vh-4rem)] p-4 transition-colors duration-300 ${
          isOcean
            ? 'bg-slate-950/70 border-sky-950/60 text-slate-300'
            : 'bg-white/70 border-pink-100 text-slate-700'
        }`}
      >
        <div className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActivePage(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? isOcean
                      ? 'bg-sky-500/15 text-sky-300 border border-sky-500/30 font-semibold shadow-sm shadow-sky-500/10'
                      : 'bg-pink-100/80 text-pink-700 border border-pink-200 font-semibold shadow-sm'
                    : isOcean
                    ? 'hover:bg-slate-900/60 hover:text-white text-slate-400'
                    : 'hover:bg-pink-50/50 hover:text-slate-900 text-slate-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 transition-transform ${
                      isActive
                        ? isOcean
                          ? 'text-sky-400 scale-110'
                          : 'text-pink-600 scale-110'
                        : isOcean
                        ? 'text-slate-500'
                        : 'text-slate-400'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span
                    className={`text-[11px] px-2 py-0.5 rounded-full font-bold animate-pulse ${
                      isOcean
                        ? 'bg-amber-400 text-slate-950'
                        : 'bg-rose-500 text-white'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Mascot Mini Widget on desktop */}
        <div className="mt-auto pt-6">
          <div
            className={`p-3.5 rounded-2xl border text-xs relative overflow-hidden ${
              isOcean
                ? 'bg-gradient-to-br from-slate-900 to-sky-950/70 border-sky-800/40 text-sky-100'
                : 'bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200 text-pink-900'
            }`}
          >
            <div className="flex items-start gap-3">
              <span className="text-2xl animate-bounce">
                {isOcean ? '🦉' : '🐰'}
              </span>
              <div>
                <p className="font-semibold text-xs">
                  {isOcean ? 'Cosmo says:' : 'Blossom says:'}
                </p>
                <p className="text-[11px] opacity-80 mt-0.5 leading-relaxed">
                  "Every tiny concept mastered today unlocks your big achievement tomorrow!"
                </p>
              </div>
            </div>
            <button
              onClick={onOpenDemoTour}
              className={`mt-2.5 w-full py-1.5 px-2 rounded-lg text-center text-[11px] font-semibold transition ${
                isOcean
                  ? 'bg-sky-500/20 hover:bg-sky-500/30 text-sky-200 border border-sky-500/30'
                  : 'bg-pink-200/60 hover:bg-pink-200 text-pink-800 border border-pink-300'
              }`}
            >
              ✨ Run Demo Tour Guide
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <nav
        className={`md:hidden fixed bottom-0 left-0 right-0 z-40 border-t backdrop-blur-lg px-2 py-1.5 flex items-center justify-around transition-colors duration-300 ${
          isOcean
            ? 'bg-slate-950/95 border-sky-900/40 text-slate-300'
            : 'bg-white/95 border-pink-200 text-slate-600 shadow-lg'
        }`}
      >
        {[
          { id: 'dashboard', label: 'Home', icon: LayoutDashboard },
          { id: 'goals', label: 'Goals', icon: Target },
          { id: 'tutor', label: 'Tutor', icon: Sparkles },
          { id: 'quizzes', label: 'Quizzes', icon: Award },
          { id: 'progress', label: 'Analytics', icon: TrendingUp },
          { id: 'settings', label: 'Settings', icon: Settings },
        ].map((item) => {
          const Icon = item.icon;
          const isActive = activePage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id as ActivePage)}
              className={`flex flex-col items-center py-1 px-2 rounded-xl transition ${
                isActive
                  ? isOcean
                    ? 'text-sky-400 font-semibold'
                    : 'text-pink-600 font-semibold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-5 h-5 mb-0.5" />
              <span className="text-[10px]">{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
};
