export type ThemeMode = 'ocean' | 'pink';

export type StudentLevelTitle = 'Beginner' | 'Explorer' | 'Achiever' | 'Scholar' | 'Master';

export interface StudentProfile {
  nickname: string;
  educationLevel: string;
  subjects: string[];
  dailyTargetMinutes: number;
  studyGoal: string;
  examDate: string;
  theme: ThemeMode;
  level: number;
  levelTitle: StudentLevelTitle;
  xp: number;
  nextLevelXp: number;
  streak: number;
  totalStudyMinutes: number;
  todayStudyMinutes: number;
  onboardingCompleted: boolean;
  avatarSeed?: string;
}

export interface DailyMission {
  id: string;
  title: string;
  targetCount: number;
  currentCount: number;
  unit: string;
  xpReward: number;
  completed: boolean;
  claimed: boolean;
  category: 'concept' | 'quiz' | 'revision' | 'time';
}

export interface WeeklyChallenge {
  id: string;
  title: string;
  description: string;
  current: number;
  target: number;
  xpReward: number;
  badgeReward: string;
  completed: boolean;
  claimed: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
  rarity: 'bronze' | 'silver' | 'gold' | 'cosmic' | 'dream';
}

export interface Milestone {
  id: string;
  title: string;
  completed: boolean;
  xpReward: number;
}

export interface StudyGoal {
  id: string;
  title: string;
  subject: string;
  topic: string;
  targetDate: string;
  estimatedMinutes: number;
  completed: boolean;
  createdAt: string;
  milestones: Milestone[];
  notes?: string;
}

export interface MaterialSnippet {
  id: string;
  location: string;
  pageOrSlide: number;
  title: string;
  text: string;
  keywords: string[];
}

export interface StudyMaterial {
  id: string;
  title: string;
  subject: string;
  topic: string;
  type: 'pdf' | 'slides' | 'notes' | 'video';
  fileSize: string;
  pagesOrSlides: number;
  uploadedAt: string;
  status: 'ready' | 'processing';
  summary: string;
  snippets: MaterialSnippet[];
}

export interface Citation {
  docName: string;
  location: string;
  snippet: string;
}

export interface TutorChatMessage {
  id: string;
  sender: 'user' | 'tutor';
  text: string;
  timestamp: string;
  mode?: 'standard' | 'step-by-step' | 'hint' | 'practice';
  citations?: Citation[];
  isExternalKnowledge?: boolean;
  keyTakeaways?: string[];
  recommendedNextTopic?: string;
  hint?: string | null;
  language?: string;
  sourceEngine?: string;
}

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'short-answer' | 'numerical';
  topic: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  conceptKey: string;
  sourceCitation?: {
    documentTitle: string;
    location: string;
  };
}

export interface MistakeRecord {
  id: string;
  question: string;
  selectedAnswer: string;
  correctAnswer: string;
  concept: string;
  explanation: string;
  patternType: string;
  date: string;
}

export interface QuizAttempt {
  id: string;
  quizTitle: string;
  subject: string;
  topic: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  score: number;
  total: number;
  percentage: number;
  date: string;
  xpEarned: number;
  mistakes: MistakeRecord[];
}

export interface TopicMastery {
  topicId: string;
  topicName: string;
  subject: string;
  topic?: string;
  masteryScore: number; // 0 - 100
  status: 'weak' | 'moderate' | 'strong' | 'mastered';
  lastPracticed: string;
  quizzesTaken: number;
  mistakeCount: number;
  bloomLevel: number; // 1 to 5 for space star / blooming flower
}

export interface ScheduleItem {
  id: string;
  date: string;
  timeSlot: string;
  subject: string;
  topic: string;
  durationMinutes: number;
  priority: 'high' | 'medium' | 'low';
  reason: string;
  completed: boolean;
  type: 'revision' | 'quiz' | 'deep-study';
}

export type ActivePage =
  | 'landing'
  | 'onboarding'
  | 'dashboard'
  | 'subjects'
  | 'library'
  | 'tutor'
  | 'quizzes'
  | 'goals'
  | 'schedule'
  | 'progress'
  | 'achievements'
  | 'settings';
