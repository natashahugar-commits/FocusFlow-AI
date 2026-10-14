import {
  StudentProfile,
  DailyMission,
  WeeklyChallenge,
  Badge,
  StudyGoal,
  StudyMaterial,
  QuizQuestion,
  QuizAttempt,
  TopicMastery,
  ScheduleItem,
  TutorChatMessage,
  ThemeMode,
  StudentLevelTitle,
} from '../types';

const STORAGE_KEYS = {
  PROFILE: 'learnloop_profile',
  MISSIONS: 'learnloop_missions',
  WEEKLY_CHALLENGE: 'learnloop_weekly_challenge',
  BADGES: 'learnloop_badges',
  GOALS: 'learnloop_goals',
  MATERIALS: 'learnloop_materials',
  QUIZ_ATTEMPTS: 'learnloop_quiz_attempts',
  TOPIC_MASTERY: 'learnloop_topic_mastery',
  SCHEDULE: 'learnloop_schedule',
  TUTOR_CHAT: 'learnloop_tutor_chat',
};

export const LEVEL_THRESHOLDS = [
  { level: 1, title: 'Beginner' as StudentLevelTitle, minXp: 0, maxXp: 150 },
  { level: 2, title: 'Explorer' as StudentLevelTitle, minXp: 150, maxXp: 400 },
  { level: 3, title: 'Achiever' as StudentLevelTitle, minXp: 400, maxXp: 850 },
  { level: 4, title: 'Scholar' as StudentLevelTitle, minXp: 850, maxXp: 1500 },
  { level: 5, title: 'Master' as StudentLevelTitle, minXp: 1500, maxXp: 3000 },
];

export function calculateLevel(xp: number): { level: number; title: StudentLevelTitle; nextXp: number } {
  for (let i = LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
    const tier = LEVEL_THRESHOLDS[i];
    if (xp >= tier.minXp) {
      return {
        level: tier.level,
        title: tier.title,
        nextXp: tier.maxXp,
      };
    }
  }
  return { level: 1, title: 'Beginner', nextXp: 150 };
}

export const INITIAL_PROFILE: StudentProfile = {
  nickname: 'Aria',
  educationLevel: 'Undergraduate (Sophomore)',
  subjects: ['Computer Science', 'Physics', 'Calculus', 'Biology'],
  dailyTargetMinutes: 45,
  studyGoal: 'Master Object-Oriented Java & Ace Physics Midterm',
  examDate: '2026-11-05',
  theme: 'ocean',
  level: 2,
  levelTitle: 'Explorer',
  xp: 320,
  nextLevelXp: 400,
  streak: 5,
  totalStudyMinutes: 380,
  todayStudyMinutes: 28,
  onboardingCompleted: true,
  avatarSeed: 'cosmic-star',
};

export const INITIAL_MISSIONS: DailyMission[] = [
  {
    id: 'm1',
    title: 'Study one concept in AI Tutor',
    targetCount: 1,
    currentCount: 1,
    unit: 'concept',
    xpReward: 20,
    completed: true,
    claimed: true,
    category: 'concept',
  },
  {
    id: 'm2',
    title: 'Complete a diagnostic quiz',
    targetCount: 1,
    currentCount: 0,
    unit: 'quiz',
    xpReward: 30,
    completed: false,
    claimed: false,
    category: 'quiz',
  },
  {
    id: 'm3',
    title: 'Revise one weak topic',
    targetCount: 1,
    currentCount: 0,
    unit: 'topic',
    xpReward: 25,
    completed: false,
    claimed: false,
    category: 'revision',
  },
  {
    id: 'm4',
    title: "Reach today's study-time target (45 min)",
    targetCount: 45,
    currentCount: 28,
    unit: 'minutes',
    xpReward: 40,
    completed: false,
    claimed: false,
    category: 'time',
  },
];

export const INITIAL_WEEKLY_CHALLENGE: WeeklyChallenge = {
  id: 'wc1',
  title: 'Weekly Mastery Sprint',
  description: 'Complete 3 quizzes and study for at least 150 minutes this week.',
  current: 2,
  target: 3,
  xpReward: 100,
  badgeReward: 'Mastery Sprinter',
  completed: false,
  claimed: false,
};

export const INITIAL_BADGES: Badge[] = [
  {
    id: 'b1',
    name: 'Curious Starter',
    description: 'Began the learning journey and explored your first concept.',
    icon: 'Sparkles',
    unlocked: true,
    unlockedAt: '2026-10-08',
    rarity: 'bronze',
  },
  {
    id: 'b2',
    name: '5-Day Orbit Streak',
    description: 'Maintained a solid 5-day continuous learning streak.',
    icon: 'Flame',
    unlocked: true,
    unlockedAt: '2026-10-12',
    rarity: 'silver',
  },
  {
    id: 'b3',
    name: 'Quiz Master 100%',
    description: 'Scored a flawless 100% on any practice or diagnostic quiz.',
    icon: 'Award',
    unlocked: false,
    rarity: 'gold',
  },
  {
    id: 'b4',
    name: 'Goal Destroyer',
    description: 'Completed all sub-milestones of a major study goal.',
    icon: 'Target',
    unlocked: true,
    unlockedAt: '2026-10-11',
    rarity: 'cosmic',
  },
  {
    id: 'b5',
    name: 'Deep Diver',
    description: 'Logged over 300 minutes of focused study time.',
    icon: 'Clock',
    unlocked: true,
    unlockedAt: '2026-10-10',
    rarity: 'silver',
  },
  {
    id: 'b6',
    name: 'Weakness Conqueror',
    description: 'Turned a marked weak topic into a strong mastery status.',
    icon: 'TrendingUp',
    unlocked: false,
    rarity: 'dream',
  },
];

export const INITIAL_GOALS: StudyGoal[] = [
  {
    id: 'g1',
    title: 'Master Java Basics & OOP Principles',
    subject: 'Computer Science',
    topic: 'Object-Oriented Programming',
    targetDate: '2026-10-20',
    estimatedMinutes: 120,
    completed: false,
    createdAt: '2026-10-09',
    milestones: [
      { id: 'm1-1', title: 'Understand classes, objects, and state encapsulation', completed: true, xpReward: 15 },
      { id: 'm1-2', title: 'Learn variables, method signatures, and return values', completed: true, xpReward: 15 },
      { id: 'm1-3', title: 'Practise constructors, "this" keyword, and overloading', completed: false, xpReward: 20 },
      { id: 'm1-4', title: 'Complete OOP Diagnostic Quiz', completed: false, xpReward: 25 },
      { id: 'm1-5', title: 'Pass Final Mastery Test with > 85%', completed: false, xpReward: 35 },
    ],
    notes: 'Prioritize constructor chaining and avoid shadow variables.',
  },
  {
    id: 'g2',
    title: 'Conquer Newton’s Laws & Free Body Diagrams',
    subject: 'Physics',
    topic: 'Classical Mechanics',
    targetDate: '2026-10-25',
    estimatedMinutes: 90,
    completed: false,
    createdAt: '2026-10-10',
    milestones: [
      { id: 'm2-1', title: 'Review 1st and 2nd Law equations (F_net = ma)', completed: true, xpReward: 15 },
      { id: 'm2-2', title: 'Resolve inclined plane friction vectors', completed: false, xpReward: 20 },
      { id: 'm2-3', title: 'Practice 3rd Law Action-Reaction pairs', completed: false, xpReward: 20 },
      { id: 'm2-4', title: 'Ace Mechanics Quiz with 0 sign errors', completed: false, xpReward: 30 },
    ],
    notes: 'Watch out for normal force angle when incline theta changes.',
  },
  {
    id: 'g3',
    title: 'Master Derivatives & The Chain Rule',
    subject: 'Calculus',
    topic: 'Differential Calculus',
    targetDate: '2026-10-12',
    estimatedMinutes: 60,
    completed: true,
    createdAt: '2026-10-05',
    milestones: [
      { id: 'm3-1', title: 'Review Limit Definition of the Derivative', completed: true, xpReward: 15 },
      { id: 'm3-2', title: 'Master Power, Product, and Quotient Rules', completed: true, xpReward: 20 },
      { id: 'm3-3', title: 'Apply Chain Rule to composite functions', completed: true, xpReward: 25 },
    ],
    notes: 'Completed ahead of schedule with 92% mastery!',
  },
];

export const INITIAL_MATERIALS: StudyMaterial[] = [
  {
    id: 'mat-1',
    title: 'Java OOP Architecture & Design Patterns.pdf',
    subject: 'Computer Science',
    topic: 'Object-Oriented Programming',
    type: 'pdf',
    fileSize: '4.2 MB',
    pagesOrSlides: 68,
    uploadedAt: '2026-10-09',
    status: 'ready',
    summary: 'Comprehensive textbook guide covering encapsulation, constructor logic, inheritance hierarchies, and polymorphism.',
    snippets: [
      {
        id: 'sn-1',
        location: 'Chapter 2, Page 14',
        pageOrSlide: 14,
        title: 'Constructors & Memory Allocation',
        text: 'A constructor in Java is a special block of code called when an object is instantiated using the new keyword. Unlike regular methods, it possesses no explicit return type and shares the exact name with its class. When multiple constructors are defined, constructor chaining via this(...) must be the very first statement.',
        keywords: ['constructor', 'instantiation', 'this', 'overloading'],
      },
      {
        id: 'sn-2',
        location: 'Chapter 3, Page 29',
        pageOrSlide: 29,
        title: 'Polymorphism & Dynamic Method Dispatch',
        text: 'Dynamic method dispatch is the mechanism by which a call to an overridden method is resolved at runtime rather than compile time. The runtime type of the referenced object determines which version of an overridden method is executed.',
        keywords: ['polymorphism', 'override', 'dynamic dispatch', 'runtime'],
      },
    ],
  },
  {
    id: 'mat-2',
    title: 'AP Physics Mechanics: Forces & Momentum.pptx',
    subject: 'Physics',
    topic: 'Classical Mechanics',
    type: 'slides',
    fileSize: '8.7 MB',
    pagesOrSlides: 42,
    uploadedAt: '2026-10-10',
    status: 'ready',
    summary: 'Lecture slides detailing Newton’s three laws, friction coefficients, conservation of linear momentum, and elastic vs inelastic collisions.',
    snippets: [
      {
        id: 'sn-3',
        location: 'Slide 18',
        pageOrSlide: 18,
        title: 'Newton’s Third Law Pairs',
        text: 'Action and reaction forces ALWAYS act on distinct, separate objects. A classic misconception is that Normal Force and Gravity on a resting book constitute a 3rd Law pair; they do not, as both act on the book. The true reaction to gravity on the book is the gravitational pull of the book on the Earth.',
        keywords: ['newton', 'third law', 'action-reaction', 'normal force', 'misconception'],
      },
      {
        id: 'sn-4',
        location: 'Slide 31',
        pageOrSlide: 31,
        title: 'Conservation of Linear Momentum',
        text: 'In any closed, isolated system where the sum of external forces is zero (Sigma F_ext = 0), the total vector momentum is strictly conserved: P_initial = P_final. In inelastic collisions, kinetic energy is converted to thermal energy, but momentum is always preserved.',
        keywords: ['momentum', 'conservation', 'inelastic collision', 'isolated system'],
      },
    ],
  },
  {
    id: 'mat-3',
    title: 'Calculus II: Derivatives & Integration Formulas.notes',
    subject: 'Calculus',
    topic: 'Differential Calculus',
    type: 'notes',
    fileSize: '1.5 MB',
    pagesOrSlides: 28,
    uploadedAt: '2026-10-06',
    status: 'ready',
    summary: 'Hand-crafted study summary with cheat-sheets for power rules, chain rule, product rule, and definite integral transformations.',
    snippets: [
      {
        id: 'sn-5',
        location: 'Section 4, Page 8',
        pageOrSlide: 8,
        title: 'The Chain Rule Formulation',
        text: 'For composite function h(x) = f(g(x)), the derivative is h’(x) = f’(g(x)) * g’(x). Always differentiate the outermost function evaluated at the untouched inner function, then multiply by the derivative of the inner function.',
        keywords: ['chain rule', 'composite function', 'derivative', 'inner function'],
      },
    ],
  },
  {
    id: 'mat-4',
    title: 'Molecular Genetics: DNA Replication & Synthesis.mp4',
    subject: 'Biology',
    topic: 'Genetics',
    type: 'video',
    fileSize: '45.1 MB',
    pagesOrSlides: 35,
    uploadedAt: '2026-10-11',
    status: 'ready',
    summary: 'Video transcript and timestamped slides illustrating helicase, RNA primase, DNA polymerase III synthesis directionality, and Okazaki fragments.',
    snippets: [
      {
        id: 'sn-6',
        location: 'Timestamp 14:22',
        pageOrSlide: 14,
        title: 'DNA Polymerase Directionality',
        text: 'DNA Polymerase can only add new nucleotides in the 5’ to 3’ direction. Because DNA is antiparallel, the leading strand is synthesized continuously, while the lagging strand is synthesized discontinuously in Okazaki fragments joined by DNA Ligase.',
        keywords: ['dna', 'polymerase', '5 to 3', 'okazaki', 'lagging strand'],
      },
    ],
  },
];

export const INITIAL_TOPIC_MASTERY: TopicMastery[] = [
  {
    topicId: 'tm-1',
    topicName: 'Newton’s 3rd Law Action-Reaction',
    subject: 'Physics',
    masteryScore: 42,
    status: 'weak',
    lastPracticed: '2026-10-10',
    quizzesTaken: 2,
    mistakeCount: 4,
    bloomLevel: 2,
  },
  {
    topicId: 'tm-2',
    topicName: 'Conservation of Momentum in 2D',
    subject: 'Physics',
    masteryScore: 48,
    status: 'weak',
    lastPracticed: '2026-10-11',
    quizzesTaken: 2,
    mistakeCount: 3,
    bloomLevel: 2,
  },
  {
    topicId: 'tm-3',
    topicName: 'Constructors & Method Overloading',
    subject: 'Computer Science',
    topic: 'Object-Oriented Programming',
    masteryScore: 68,
    status: 'moderate',
    lastPracticed: '2026-10-11',
    quizzesTaken: 3,
    mistakeCount: 2,
    bloomLevel: 3,
  },
  {
    topicId: 'tm-4',
    topicName: 'Java Polymorphism & Dispatch',
    subject: 'Computer Science',
    topic: 'Object-Oriented Programming',
    masteryScore: 88,
    status: 'strong',
    lastPracticed: '2026-10-12',
    quizzesTaken: 4,
    mistakeCount: 1,
    bloomLevel: 4,
  },
  {
    topicId: 'tm-5',
    topicName: 'The Chain Rule & Power Rule',
    subject: 'Calculus',
    topic: 'Differential Calculus',
    masteryScore: 92,
    status: 'mastered',
    lastPracticed: '2026-10-12',
    quizzesTaken: 4,
    mistakeCount: 0,
    bloomLevel: 5,
  },
  {
    topicId: 'tm-6',
    topicName: 'DNA Replication Directionality (5’ to 3’)',
    subject: 'Biology',
    topic: 'Genetics',
    masteryScore: 94,
    status: 'mastered',
    lastPracticed: '2026-10-12',
    quizzesTaken: 5,
    mistakeCount: 0,
    bloomLevel: 5,
  },
];

export const INITIAL_QUIZ_ATTEMPTS: QuizAttempt[] = [
  {
    id: 'qa-1',
    quizTitle: 'Classical Dynamics & Force Systems',
    subject: 'Physics',
    topic: 'Classical Mechanics',
    difficulty: 'intermediate',
    score: 2,
    total: 5,
    percentage: 40,
    date: '2026-10-10',
    xpEarned: 20,
    mistakes: [
      {
        id: 'mr-1',
        question: 'Identify the reaction force to the Earth pulling down on an apple resting on a table.',
        selectedAnswer: 'The normal force of the table pushing up on the apple',
        correctAnswer: 'The gravitational force of the apple pulling up on the Earth',
        concept: 'Newton’s Third Law Pairs',
        explanation: 'Action and reaction forces must involve the exact same two interacting bodies swapped (Earth-Apple pair). Normal force involves the Table-Apple interface.',
        patternType: 'Conflating Equilibrium Balance with 3rd Law Pairs',
        date: '2026-10-10',
      },
      {
        id: 'mr-2',
        question: 'In a head-on perfectly inelastic collision between two carts, what happens to total momentum?',
        selectedAnswer: 'It drops to zero because energy is lost',
        correctAnswer: 'It is strictly conserved because no net external force acts',
        concept: 'Conservation of Linear Momentum',
        explanation: 'Inelastic collisions lose kinetic energy to heat/deformation, but momentum is always strictly conserved in closed systems.',
        patternType: 'Confusing Momentum Conservation with Kinetic Energy Conservation',
        date: '2026-10-10',
      },
    ],
  },
  {
    id: 'qa-2',
    quizTitle: 'Calculus Derivatives Diagnostic',
    subject: 'Calculus',
    topic: 'Differential Calculus',
    difficulty: 'beginner',
    score: 5,
    total: 5,
    percentage: 100,
    date: '2026-10-11',
    xpEarned: 45,
    mistakes: [],
  },
];

export const SAMPLE_QUIZZES: Record<string, QuizQuestion[]> = {
  'java-oop': [
    {
      id: 'q-j1',
      type: 'multiple-choice',
      topic: 'Object-Oriented Programming',
      difficulty: 'beginner',
      question: 'Which keyword in Java is used within a constructor to invoke another constructor in the same class?',
      options: ['super()', 'this()', 'new()', 'parent()'],
      correctAnswer: 'this()',
      explanation: 'The "this()" constructor call delegates initialization to another constructor in the identical class and must be the first line.',
      conceptKey: 'Constructor Delegation',
      sourceCitation: { documentTitle: 'Java OOP Architecture & Design Patterns.pdf', location: 'Page 14' },
    },
    {
      id: 'q-j2',
      type: 'multiple-choice',
      topic: 'Object-Oriented Programming',
      difficulty: 'intermediate',
      question: 'What is the primary benefit of dynamic method dispatch (runtime polymorphism)?',
      options: [
        'It speeds up compilation time',
        'It enables a subclass to supply its own specific implementation of a parent method invoked at runtime',
        'It restricts access to private fields',
        'It replaces the need for garbage collection',
      ],
      correctAnswer: 'It enables a subclass to supply its own specific implementation of a parent method invoked at runtime',
      explanation: 'Dynamic dispatch enables clean decoupling: client code calls a base interface/class method, and the specific subclass execution happens automatically at runtime.',
      conceptKey: 'Dynamic Method Dispatch',
      sourceCitation: { documentTitle: 'Java OOP Architecture & Design Patterns.pdf', location: 'Page 29' },
    },
    {
      id: 'q-j3',
      type: 'short-answer',
      topic: 'Object-Oriented Programming',
      difficulty: 'intermediate',
      question: 'What principle of OOP hides the internal state of an object and enforces access exclusively through public getter/setter methods?',
      correctAnswer: 'encapsulation',
      explanation: 'Encapsulation bundles the data (fields) and methods operating on them while restricting direct access to shield internal consistency.',
      conceptKey: 'Encapsulation',
      sourceCitation: { documentTitle: 'Java OOP Architecture & Design Patterns.pdf', location: 'Page 9' },
    },
    {
      id: 'q-j4',
      type: 'multiple-choice',
      topic: 'Object-Oriented Programming',
      difficulty: 'advanced',
      question: 'Can an abstract class in Java have constructors?',
      options: [
        'No, because abstract classes cannot be instantiated with new',
        'Yes, and they are invoked by subclasses via super() during initialization',
        'Only if all methods inside the class are declared static',
        'Only if the class implements the Serializable interface',
      ],
      correctAnswer: 'Yes, and they are invoked by subclasses via super() during initialization',
      explanation: 'Abstract classes have constructors to initialize common state inherited by concrete subclasses.',
      conceptKey: 'Abstract Class Inheritance',
      sourceCitation: { documentTitle: 'Java OOP Architecture & Design Patterns.pdf', location: 'Page 34' },
    },
    {
      id: 'q-j5',
      type: 'numerical',
      topic: 'Object-Oriented Programming',
      difficulty: 'beginner',
      question: 'How many default no-argument constructors does Java provide automatically if the programmer explicitly defines at least 1 custom parameterized constructor? (Enter a number)',
      correctAnswer: '0',
      explanation: 'Once a programmer writes any constructor explicitly, Java will NOT provide the default no-arg constructor unless explicitly defined.',
      conceptKey: 'Default Constructor Rules',
      sourceCitation: { documentTitle: 'Java OOP Architecture & Design Patterns.pdf', location: 'Page 15' },
    },
  ],
  'physics-forces': [
    {
      id: 'q-p1',
      type: 'multiple-choice',
      topic: 'Classical Mechanics',
      difficulty: 'intermediate',
      question: 'A 5 kg block rests on a table. Which pair represents a valid Newton’s 3rd Law pair?',
      options: [
        'Gravity on block and Normal force from table on block',
        'Gravitational pull of Earth on block and Gravitational pull of block on Earth',
        'Normal force of table on block and Static friction force',
        'Force of gravity and kinetic energy of block',
      ],
      correctAnswer: 'Gravitational pull of Earth on block and Gravitational pull of block on Earth',
      explanation: 'Newton’s Third Law pairs always involve two interacting bodies: Force of A on B and Force of B on A. Both forces never act on the same body.',
      conceptKey: 'Action-Reaction Symmetry',
      sourceCitation: { documentTitle: 'AP Physics Mechanics: Forces & Momentum.pptx', location: 'Slide 18' },
    },
    {
      id: 'q-p2',
      type: 'multiple-choice',
      topic: 'Classical Mechanics',
      difficulty: 'intermediate',
      question: 'In a collision on a frictionless track with no net external forces, which statement is GUARANTEED to be true?',
      options: [
        'Total kinetic energy is conserved',
        'Total vector momentum is conserved',
        'Both carts must bounce backwards',
        'Mechanical energy is conserved only if mass is equal',
      ],
      correctAnswer: 'Total vector momentum is conserved',
      explanation: 'Momentum is strictly conserved whenever net external force is zero, regardless of whether the collision is elastic or inelastic.',
      conceptKey: 'Conservation of Linear Momentum',
      sourceCitation: { documentTitle: 'AP Physics Mechanics: Forces & Momentum.pptx', location: 'Slide 31' },
    },
    {
      id: 'q-p3',
      type: 'numerical',
      topic: 'Classical Mechanics',
      difficulty: 'beginner',
      question: 'If a net force of 30 N acts on a 6 kg object, what is the acceleration in m/s^2? (Enter numeric answer)',
      correctAnswer: '5',
      explanation: 'Using Newton’s 2nd Law: a = F_net / m = 30 N / 6 kg = 5 m/s^2.',
      conceptKey: 'Newton’s Second Law',
      sourceCitation: { documentTitle: 'AP Physics Mechanics: Forces & Momentum.pptx', location: 'Slide 12' },
    },
  ],
};

export const INITIAL_SCHEDULE: ScheduleItem[] = [
  {
    id: 'sch-1',
    date: '2026-10-13',
    timeSlot: '04:30 PM - 05:00 PM',
    subject: 'Physics',
    topic: 'Newton’s 3rd Law Action-Reaction',
    durationMinutes: 30,
    priority: 'high',
    reason: 'Critical: Mastery is currently 42% and this appears frequently on the upcoming Midterm (Nov 5).',
    completed: false,
    type: 'revision',
  },
  {
    id: 'sch-2',
    date: '2026-10-13',
    timeSlot: '05:15 PM - 05:40 PM',
    subject: 'Physics',
    topic: 'Conservation of Momentum in 2D',
    durationMinutes: 25,
    priority: 'high',
    reason: 'Weak topic with 3 recorded mistake patterns in recent quiz.',
    completed: false,
    type: 'quiz',
  },
  {
    id: 'sch-3',
    date: '2026-10-14',
    timeSlot: '04:00 PM - 04:45 PM',
    subject: 'Computer Science',
    topic: 'Constructors & Method Overloading',
    durationMinutes: 45,
    priority: 'medium',
    reason: 'Advance Java Goal Milestone 3 to achieve 80%+ mastery.',
    completed: false,
    type: 'deep-study',
  },
  {
    id: 'sch-4',
    date: '2026-10-15',
    timeSlot: '05:00 PM - 05:30 PM',
    subject: 'Biology',
    topic: 'DNA Replication Directionality',
    durationMinutes: 30,
    priority: 'low',
    reason: 'Maintenance review: Mastery is strong at 94%, light spaced repetition keeps it fresh.',
    completed: false,
    type: 'revision',
  },
];

export const INITIAL_TUTOR_CHAT: TutorChatMessage[] = [
  {
    id: 'msg-1',
    sender: 'tutor',
    text: `Hello! I'm your **LearnLoop Study Tutor** 🚀. I have indexed your uploaded course materials for **Java OOP, Classical Mechanics, Calculus, and Genetics**.\n\nAsk me anything! You can request step-by-step breakdowns, test your knowledge with hints, or explore practice problems. What topic are we leveling up today?`,
    timestamp: '10:00 AM',
    citations: [
      {
        docName: 'Java OOP Architecture & Design Patterns.pdf',
        location: 'Indexed (68 pages)',
        snippet: 'Classes, Objects, Inheritance, Polymorphism',
      },
      {
        docName: 'AP Physics Mechanics: Forces & Momentum.pptx',
        location: 'Indexed (42 slides)',
        snippet: 'Newton’s Laws, Momentum, Collisions',
      },
    ],
  },
];

// Helper functions for persistent storage
export function getStoredProfile(): StudentProfile {
  const data = localStorage.getItem(STORAGE_KEYS.PROFILE);
  if (!data) return INITIAL_PROFILE;
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_PROFILE;
  }
}

export function saveProfile(profile: StudentProfile): void {
  localStorage.setItem(STORAGE_KEYS.PROFILE, JSON.stringify(profile));
}

export function getStoredMissions(): DailyMission[] {
  const data = localStorage.getItem(STORAGE_KEYS.MISSIONS);
  if (!data) return INITIAL_MISSIONS;
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_MISSIONS;
  }
}

export function saveMissions(missions: DailyMission[]): void {
  localStorage.setItem(STORAGE_KEYS.MISSIONS, JSON.stringify(missions));
}

export function getStoredWeeklyChallenge(): WeeklyChallenge {
  const data = localStorage.getItem(STORAGE_KEYS.WEEKLY_CHALLENGE);
  if (!data) return INITIAL_WEEKLY_CHALLENGE;
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_WEEKLY_CHALLENGE;
  }
}

export function saveWeeklyChallenge(wc: WeeklyChallenge): void {
  localStorage.setItem(STORAGE_KEYS.WEEKLY_CHALLENGE, JSON.stringify(wc));
}

export function getStoredBadges(): Badge[] {
  const data = localStorage.getItem(STORAGE_KEYS.BADGES);
  if (!data) return INITIAL_BADGES;
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_BADGES;
  }
}

export function saveBadges(badges: Badge[]): void {
  localStorage.setItem(STORAGE_KEYS.BADGES, JSON.stringify(badges));
}

export function getStoredGoals(): StudyGoal[] {
  const data = localStorage.getItem(STORAGE_KEYS.GOALS);
  if (!data) return INITIAL_GOALS;
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_GOALS;
  }
}

export function saveGoals(goals: StudyGoal[]): void {
  localStorage.setItem(STORAGE_KEYS.GOALS, JSON.stringify(goals));
}

export function getStoredMaterials(): StudyMaterial[] {
  const data = localStorage.getItem(STORAGE_KEYS.MATERIALS);
  if (!data) return INITIAL_MATERIALS;
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_MATERIALS;
  }
}

export function saveMaterials(materials: StudyMaterial[]): void {
  localStorage.setItem(STORAGE_KEYS.MATERIALS, JSON.stringify(materials));
}

export function getStoredTopicMastery(): TopicMastery[] {
  const data = localStorage.getItem(STORAGE_KEYS.TOPIC_MASTERY);
  if (!data) return INITIAL_TOPIC_MASTERY;
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_TOPIC_MASTERY;
  }
}

export function saveTopicMastery(tm: TopicMastery[]): void {
  localStorage.setItem(STORAGE_KEYS.TOPIC_MASTERY, JSON.stringify(tm));
}

export function getStoredQuizAttempts(): QuizAttempt[] {
  const data = localStorage.getItem(STORAGE_KEYS.QUIZ_ATTEMPTS);
  if (!data) return INITIAL_QUIZ_ATTEMPTS;
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_QUIZ_ATTEMPTS;
  }
}

export function saveQuizAttempts(attempts: QuizAttempt[]): void {
  localStorage.setItem(STORAGE_KEYS.QUIZ_ATTEMPTS, JSON.stringify(attempts));
}

export function getStoredSchedule(): ScheduleItem[] {
  const data = localStorage.getItem(STORAGE_KEYS.SCHEDULE);
  if (!data) return INITIAL_SCHEDULE;
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_SCHEDULE;
  }
}

export function saveSchedule(schedule: ScheduleItem[]): void {
  localStorage.setItem(STORAGE_KEYS.SCHEDULE, JSON.stringify(schedule));
}

export function getStoredTutorChat(): TutorChatMessage[] {
  const data = localStorage.getItem(STORAGE_KEYS.TUTOR_CHAT);
  if (!data) return INITIAL_TUTOR_CHAT;
  try {
    return JSON.parse(data);
  } catch {
    return INITIAL_TUTOR_CHAT;
  }
}

export function saveTutorChat(chat: TutorChatMessage[]): void {
  localStorage.setItem(STORAGE_KEYS.TUTOR_CHAT, JSON.stringify(chat));
}

export function resetToDemoData(): void {
  localStorage.removeItem(STORAGE_KEYS.PROFILE);
  localStorage.removeItem(STORAGE_KEYS.MISSIONS);
  localStorage.removeItem(STORAGE_KEYS.WEEKLY_CHALLENGE);
  localStorage.removeItem(STORAGE_KEYS.BADGES);
  localStorage.removeItem(STORAGE_KEYS.GOALS);
  localStorage.removeItem(STORAGE_KEYS.MATERIALS);
  localStorage.removeItem(STORAGE_KEYS.TOPIC_MASTERY);
  localStorage.removeItem(STORAGE_KEYS.QUIZ_ATTEMPTS);
  localStorage.removeItem(STORAGE_KEYS.SCHEDULE);
  localStorage.removeItem(STORAGE_KEYS.TUTOR_CHAT);
}
