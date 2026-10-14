import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import confetti from 'canvas-confetti';
import {
  ActivePage,
  Badge,
  DailyMission,
  Milestone,
  QuizAttempt,
  ScheduleItem,
  StudentProfile,
  StudyGoal,
  StudyMaterial,
  ThemeMode,
  TopicMastery,
  TutorChatMessage,
  WeeklyChallenge,
} from '../types';
import {
  calculateLevel,
  getStoredBadges,
  getStoredGoals,
  getStoredMaterials,
  getStoredMissions,
  getStoredProfile,
  getStoredQuizAttempts,
  getStoredSchedule,
  getStoredTopicMastery,
  getStoredTutorChat,
  getStoredWeeklyChallenge,
  resetToDemoData,
  saveBadges,
  saveGoals,
  saveMaterials,
  saveMissions,
  saveProfile,
  saveQuizAttempts,
  saveSchedule,
  saveTopicMastery,
  saveTutorChat,
  saveWeeklyChallenge,
} from '../services/storage';

interface AppContextType {
  theme: ThemeMode;
  setTheme: (theme: ThemeMode) => void;
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  profile: StudentProfile;
  updateProfile: (updates: Partial<StudentProfile>) => void;
  missions: DailyMission[];
  claimMissionReward: (missionId: string) => void;
  weeklyChallenge: WeeklyChallenge;
  claimWeeklyReward: () => void;
  badges: Badge[];
  goals: StudyGoal[];
  addGoal: (goal: Omit<StudyGoal, 'id' | 'createdAt' | 'completed'>) => void;
  toggleGoalMilestone: (goalId: string, milestoneId: string) => void;
  deleteGoal: (goalId: string) => void;
  materials: StudyMaterial[];
  addMaterial: (mat: StudyMaterial) => void;
  topicMastery: TopicMastery[];
  updateTopicMasteryScore: (topicId: string, scoreDelta: number, newMistake?: boolean) => void;
  quizAttempts: QuizAttempt[];
  recordQuizAttempt: (attempt: QuizAttempt) => void;
  schedule: ScheduleItem[];
  toggleScheduleItem: (itemId: string) => void;
  addScheduleItem: (item: Omit<ScheduleItem, 'id'>) => void;
  tutorChat: TutorChatMessage[];
  addTutorChatMessage: (msg: TutorChatMessage) => void;
  clearTutorChat: () => void;
  awardXp: (amount: number, reason?: string) => void;
  triggerCelebration: () => void;
  toastMessage: { text: string; type: 'xp' | 'badge' | 'success' | 'info' } | null;
  setToastMessage: (toast: { text: string; type: 'xp' | 'badge' | 'success' | 'info' } | null) => void;
  resetAllData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<StudentProfile>(getStoredProfile);
  const [theme, setThemeState] = useState<ThemeMode>(() => profile.theme || 'ocean');
  const [activePage, setActivePage] = useState<ActivePage>(() =>
    profile.onboardingCompleted ? 'dashboard' : 'landing'
  );
  const [missions, setMissions] = useState<DailyMission[]>(getStoredMissions);
  const [weeklyChallenge, setWeeklyChallenge] = useState<WeeklyChallenge>(getStoredWeeklyChallenge);
  const [badges, setBadges] = useState<Badge[]>(getStoredBadges);
  const [goals, setGoals] = useState<StudyGoal[]>(getStoredGoals);
  const [materials, setMaterials] = useState<StudyMaterial[]>(getStoredMaterials);
  const [topicMastery, setTopicMastery] = useState<TopicMastery[]>(getStoredTopicMastery);
  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>(getStoredQuizAttempts);
  const [schedule, setSchedule] = useState<ScheduleItem[]>(getStoredSchedule);
  const [tutorChat, setTutorChat] = useState<TutorChatMessage[]>(getStoredTutorChat);
  const [toastMessage, setToastMessage] = useState<{ text: string; type: 'xp' | 'badge' | 'success' | 'info' } | null>(null);

  useEffect(() => {
    saveProfile(profile);
  }, [profile]);

  useEffect(() => {
    saveMissions(missions);
  }, [missions]);

  useEffect(() => {
    saveWeeklyChallenge(weeklyChallenge);
  }, [weeklyChallenge]);

  useEffect(() => {
    saveBadges(badges);
  }, [badges]);

  useEffect(() => {
    saveGoals(goals);
  }, [goals]);

  useEffect(() => {
    saveMaterials(materials);
  }, [materials]);

  useEffect(() => {
    saveTopicMastery(topicMastery);
  }, [topicMastery]);

  useEffect(() => {
    saveQuizAttempts(quizAttempts);
  }, [quizAttempts]);

  useEffect(() => {
    saveSchedule(schedule);
  }, [schedule]);

  useEffect(() => {
    saveTutorChat(tutorChat);
  }, [tutorChat]);

  // Toast auto dismissal
  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3800);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  const setTheme = (newTheme: ThemeMode) => {
    setThemeState(newTheme);
    setProfile((prev) => ({ ...prev, theme: newTheme }));
  };

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: theme === 'ocean' ? ['#38bdf8', '#0284c7', '#818cf8', '#ffffff'] : ['#f472b6', '#db2777', '#c084fc', '#ffffff'],
      });
    } catch {
      // In case canvas is unavailable
    }
  };

  const awardXp = (amount: number, reason?: string) => {
    if (amount <= 0) return;
    setProfile((prev) => {
      const newXp = prev.xp + amount;
      const { level, title, nextXp } = calculateLevel(newXp);
      const leveledUp = level > prev.level;

      if (leveledUp) {
        triggerCelebration();
        setToastMessage({
          text: `🎉 LEVEL UP! You reached Level ${level}: ${title}! (+${amount} XP)`,
          type: 'badge',
        });
      } else {
        setToastMessage({
          text: `+${amount} XP Earned! ${reason ? `(${reason})` : ''}`,
          type: 'xp',
        });
      }

      return {
        ...prev,
        xp: newXp,
        level,
        levelTitle: title,
        nextLevelXp: nextXp,
      };
    });
  };

  const updateProfile = (updates: Partial<StudentProfile>) => {
    setProfile((prev) => ({ ...prev, ...updates }));
  };

  const claimMissionReward = (missionId: string) => {
    setMissions((prev) =>
      prev.map((m) => {
        if (m.id === missionId && m.completed && !m.claimed) {
          awardXp(m.xpReward, `Completed mission: ${m.title}`);
          triggerCelebration();
          return { ...m, claimed: true };
        }
        return m;
      })
    );
  };

  const claimWeeklyReward = () => {
    if (weeklyChallenge.completed && !weeklyChallenge.claimed) {
      awardXp(weeklyChallenge.xpReward, 'Weekly Challenge Completed!');
      triggerCelebration();
      setWeeklyChallenge((prev) => ({ ...prev, claimed: true }));
      // Unlock badge if needed
      setBadges((prev) =>
        prev.map((b) => (b.name === weeklyChallenge.badgeReward ? { ...b, unlocked: true, unlockedAt: new Date().toISOString() } : b))
      );
    }
  };

  const addGoal = (goalData: Omit<StudyGoal, 'id' | 'createdAt' | 'completed'>) => {
    const newGoal: StudyGoal = {
      ...goalData,
      id: `goal-${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      completed: false,
    };
    setGoals((prev) => [newGoal, ...prev]);
    setToastMessage({ text: `🎯 New study goal added: "${newGoal.title}"`, type: 'success' });
  };

  const toggleGoalMilestone = (goalId: string, milestoneId: string) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id !== goalId) return g;
        const updatedMilestones: Milestone[] = g.milestones.map((m) => {
          if (m.id === milestoneId) {
            const nextCompleted = !m.completed;
            if (nextCompleted) {
              awardXp(m.xpReward || 15, `Milestone completed: ${m.title}`);
              triggerCelebration();
            }
            return { ...m, completed: nextCompleted };
          }
          return m;
        });

        const allDone = updatedMilestones.length > 0 && updatedMilestones.every((m) => m.completed);
        if (allDone && !g.completed) {
          triggerCelebration();
          setToastMessage({ text: `🏆 Mastered Goal: "${g.title}"! All checkpoints complete!`, type: 'badge' });
        }
        return {
          ...g,
          milestones: updatedMilestones,
          completed: allDone,
        };
      })
    );
  };

  const deleteGoal = (goalId: string) => {
    setGoals((prev) => prev.filter((g) => g.id !== goalId));
    setToastMessage({ text: 'Goal removed', type: 'info' });
  };

  const addMaterial = (mat: StudyMaterial) => {
    setMaterials((prev) => [mat, ...prev]);
    setToastMessage({ text: `📚 Material indexed: "${mat.title}"`, type: 'success' });
  };

  const updateTopicMasteryScore = (topicId: string, scoreDelta: number, newMistake = false) => {
    setTopicMastery((prev) =>
      prev.map((tm) => {
        if (tm.topicId !== topicId) return tm;
        const newScore = Math.min(100, Math.max(10, tm.masteryScore + scoreDelta));
        let status: 'weak' | 'moderate' | 'strong' | 'mastered' = 'moderate';
        if (newScore < 55) status = 'weak';
        else if (newScore < 75) status = 'moderate';
        else if (newScore < 90) status = 'strong';
        else status = 'mastered';

        const bloom = Math.min(5, Math.max(1, Math.ceil(newScore / 20)));

        return {
          ...tm,
          masteryScore: newScore,
          status,
          bloomLevel: bloom,
          quizzesTaken: tm.quizzesTaken + 1,
          mistakeCount: newMistake ? tm.mistakeCount + 1 : tm.mistakeCount,
          lastPracticed: new Date().toISOString().split('T')[0],
        };
      })
    );
  };

  const recordQuizAttempt = (attempt: QuizAttempt) => {
    setQuizAttempts((prev) => [attempt, ...prev]);

    // Update mission for quiz completion
    setMissions((prev) =>
      prev.map((m) => {
        if (m.category === 'quiz') {
          return {
            ...m,
            currentCount: Math.min(m.targetCount, m.currentCount + 1),
            completed: true,
          };
        }
        return m;
      })
    );

    // Update Weekly Challenge progress
    setWeeklyChallenge((prev) => {
      const nextCount = prev.current + 1;
      return {
        ...prev,
        current: nextCount,
        completed: nextCount >= prev.target,
      };
    });

    // Check if 100% quiz badge unlockable
    if (attempt.percentage === 100) {
      setBadges((prev) =>
        prev.map((b) => (b.id === 'b3' ? { ...b, unlocked: true, unlockedAt: new Date().toISOString() } : b))
      );
      triggerCelebration();
    }
  };

  const toggleScheduleItem = (itemId: string) => {
    setSchedule((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const nextState = !item.completed;
          if (nextState) {
            awardXp(25, `Study session completed: ${item.topic}`);
            triggerCelebration();
          }
          return { ...item, completed: nextState };
        }
        return item;
      })
    );
  };

  const addScheduleItem = (itemData: Omit<ScheduleItem, 'id'>) => {
    const newItem: ScheduleItem = {
      ...itemData,
      id: `sch-${Date.now()}`,
    };
    setSchedule((prev) => [newItem, ...prev]);
    setToastMessage({ text: `📅 Revision scheduled for ${newItem.topic}`, type: 'success' });
  };

  const addTutorChatMessage = (msg: TutorChatMessage) => {
    setTutorChat((prev) => [...prev, msg]);
    // Mark concept mission complete
    setMissions((prev) =>
      prev.map((m) => {
        if (m.category === 'concept' && !m.completed) {
          return { ...m, currentCount: 1, completed: true };
        }
        return m;
      })
    );
  };

  const clearTutorChat = () => {
    setTutorChat([]);
  };

  const resetAllData = () => {
    resetToDemoData();
    setProfile(getStoredProfile());
    setMissions(getStoredMissions());
    setWeeklyChallenge(getStoredWeeklyChallenge());
    setBadges(getStoredBadges());
    setGoals(getStoredGoals());
    setMaterials(getStoredMaterials());
    setTopicMastery(getStoredTopicMastery());
    setQuizAttempts(getStoredQuizAttempts());
    setSchedule(getStoredSchedule());
    setTutorChat(getStoredTutorChat());
    setToastMessage({ text: 'Reset to demo dataset successfully!', type: 'info' });
  };

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        activePage,
        setActivePage,
        profile,
        updateProfile,
        missions,
        claimMissionReward,
        weeklyChallenge,
        claimWeeklyReward,
        badges,
        goals,
        addGoal,
        toggleGoalMilestone,
        deleteGoal,
        materials,
        addMaterial,
        topicMastery,
        updateTopicMasteryScore,
        quizAttempts,
        recordQuizAttempt,
        schedule,
        toggleScheduleItem,
        addScheduleItem,
        tutorChat,
        addTutorChatMessage,
        clearTutorChat,
        awardXp,
        triggerCelebration,
        toastMessage,
        setToastMessage,
        resetAllData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
