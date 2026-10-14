/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Sidebar } from './components/Sidebar';
import { DemoTourModal } from './components/DemoTourModal';

import { LandingView } from './views/LandingView';
import { OnboardingView } from './views/OnboardingView';
import { DashboardView } from './views/DashboardView';
import { GoalsView } from './views/GoalsView';
import { TutorView } from './views/TutorView';
import { QuizzesView } from './views/QuizzesView';
import { LibraryView } from './views/LibraryView';
import { ProgressView } from './views/ProgressView';
import { ScheduleView } from './views/ScheduleView';
import { AchievementsView } from './views/AchievementsView';
import { SubjectsView } from './views/SubjectsView';
import { SettingsView } from './views/SettingsView';

const MainLayout: React.FC = () => {
  const { theme, activePage, setActivePage, toastMessage } = useApp();
  const [isDemoTourOpen, setIsDemoTourOpen] = useState(false);

  const isOcean = theme === 'ocean';

  // Landing page view
  if (activePage === 'landing') {
    return (
      <div className={`theme-${theme} min-h-screen ${isOcean ? 'bg-[#070d1e] text-slate-100' : 'bg-[#fff5f7] text-slate-900'}`}>
        <LandingView onStartOnboarding={() => setActivePage('onboarding')} />
      </div>
    );
  }

  // Onboarding view
  if (activePage === 'onboarding') {
    return (
      <div className={`theme-${theme} min-h-screen ${isOcean ? 'bg-[#070d1e] text-slate-100' : 'bg-[#fff5f7] text-slate-900'}`}>
        <OnboardingView onComplete={() => setActivePage('dashboard')} />
      </div>
    );
  }

  return (
    <div
      className={`theme-${theme} min-h-screen transition-colors duration-300 flex flex-col ${
        isOcean ? 'bg-[#070d1e] text-slate-100' : 'bg-[#fff5f7] text-slate-900'
      }`}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 animate-in slide-in-from-top-4 fade-in duration-300 pointer-events-none">
          <div
            className={`px-4 py-2.5 rounded-2xl shadow-xl border text-xs font-bold flex items-center gap-2 ${
              toastMessage.type === 'badge'
                ? 'bg-amber-400 text-slate-950 border-amber-300'
                : toastMessage.type === 'xp'
                ? isOcean
                  ? 'bg-sky-500 text-slate-950 border-sky-400'
                  : 'bg-pink-500 text-white border-pink-400'
                : isOcean
                ? 'bg-slate-900 text-sky-200 border-sky-800'
                : 'bg-white text-slate-800 border-pink-200 shadow-sm'
            }`}
          >
            <span>{toastMessage.text}</span>
          </div>
        </div>
      )}

      {/* Top Navbar */}
      <Navbar onOpenDemoTour={() => setIsDemoTourOpen(true)} />

      {/* Main Body with Sidebar */}
      <div className="flex-1 flex max-w-7xl w-full mx-auto">
        <Sidebar onOpenDemoTour={() => setIsDemoTourOpen(true)} />

        {/* Content Area */}
        <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 pb-24 md:pb-8">
          {activePage === 'dashboard' && <DashboardView />}
          {activePage === 'goals' && <GoalsView />}
          {activePage === 'tutor' && <TutorView />}
          {activePage === 'quizzes' && <QuizzesView />}
          {activePage === 'library' && <LibraryView />}
          {activePage === 'progress' && <ProgressView />}
          {activePage === 'schedule' && <ScheduleView />}
          {activePage === 'achievements' && <AchievementsView />}
          {activePage === 'subjects' && <SubjectsView />}
          {activePage === 'settings' && <SettingsView />}
        </main>
      </div>

      {/* Demo Tour Modal */}
      <DemoTourModal
        isOpen={isDemoTourOpen}
        onClose={() => setIsDemoTourOpen(false)}
      />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
