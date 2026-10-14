import React from 'react';
import {
  GraduationCap,
  BookOpen,
  Award,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Target,
  CheckCircle2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SubjectsView: React.FC = () => {
  const {
    profile,
    topicMastery,
    materials,
    theme,
    setActivePage,
  } = useApp();

  const isOcean = theme === 'ocean';

  const subjectStats = profile.subjects.map((sub) => {
    const topics = topicMastery.filter((t) => t.subject === sub);
    const mats = materials.filter((m) => m.subject === sub);
    const avgScore =
      topics.length > 0
        ? Math.round(topics.reduce((acc, t) => acc + t.masteryScore, 0) / topics.length)
        : 70;

    return {
      name: sub,
      topics,
      materialCount: mats.length,
      avgScore,
      status: avgScore >= 80 ? 'Mastery Track' : avgScore >= 60 ? 'In Progress' : 'Needs Review',
    };
  });

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
            Curriculum & Subjects
          </span>
        </div>
        <h1 className="font-heading text-2xl sm:text-3xl font-extrabold">
          My Active Study Subjects
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 mt-1">
          Track syllabus coverage, indexed materials, and overall topic mastery per course.
        </p>
      </div>

      {/* Subject Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {subjectStats.map((sub) => (
          <div
            key={sub.name}
            className={`p-6 rounded-3xl border transition-all flex flex-col justify-between ${
              isOcean
                ? 'bg-slate-900/80 border-sky-900/40 text-slate-100 shadow-md shadow-sky-950/20'
                : 'bg-white border-pink-100 text-slate-900 shadow-sm'
            }`}
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-12 h-12 rounded-2xl flex items-center justify-center text-2xl ${
                      isOcean ? 'bg-sky-500/20 text-sky-400' : 'bg-pink-100 text-pink-600'
                    }`}
                  >
                    🎓
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-lg sm:text-xl">
                      {sub.name}
                    </h2>
                    <span className="text-xs text-slate-400">
                      {sub.materialCount} Indexed Documents • {sub.topics.length} Evaluated Topics
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-lg font-heading font-extrabold text-sky-400">
                    {sub.avgScore}%
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      sub.avgScore >= 80
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : sub.avgScore >= 60
                        ? 'bg-sky-500/20 text-sky-300'
                        : 'bg-rose-500/20 text-rose-400'
                    }`}
                  >
                    {sub.status}
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2 bg-slate-800/40 rounded-full overflow-hidden mb-6">
                <div
                  className={`h-full ${
                    sub.avgScore >= 80
                      ? 'bg-emerald-400'
                      : isOcean
                      ? 'bg-sky-400'
                      : 'bg-pink-500'
                  }`}
                  style={{ width: `${sub.avgScore}%` }}
                />
              </div>

              {/* Subtopics pill list */}
              <div className="space-y-2 mb-6">
                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Associated Topics
                </div>
                {sub.topics.length > 0 ? (
                  sub.topics.map((t) => (
                    <div
                      key={t.topicId}
                      className={`p-2.5 rounded-xl border flex items-center justify-between text-xs ${
                        isOcean
                          ? 'bg-slate-950/60 border-slate-800'
                          : 'bg-slate-50 border-slate-200'
                      }`}
                    >
                      <span className="font-medium">{t.topicName}</span>
                      <span
                        className={`font-bold ${
                          t.status === 'weak'
                            ? 'text-rose-400'
                            : t.status === 'mastered'
                            ? 'text-emerald-400'
                            : 'text-sky-300'
                        }`}
                      >
                        {t.masteryScore}%
                      </span>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-slate-500 italic">
                    Core syllabus topics initialized. Ready for diagnosis.
                  </p>
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-4 border-t border-slate-800/40 flex items-center gap-3">
              <button
                onClick={() => setActivePage('tutor')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1.5 ${
                  isOcean
                    ? 'bg-sky-500 hover:bg-sky-400 text-slate-950'
                    : 'bg-pink-500 hover:bg-pink-600 text-white'
                }`}
              >
                <span>Study in AI Tutor</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={() => setActivePage('quizzes')}
                className={`flex-1 py-2.5 rounded-xl text-xs font-semibold border transition ${
                  isOcean
                    ? 'border-sky-800 hover:bg-slate-800 text-sky-200'
                    : 'border-pink-200 hover:bg-pink-50 text-pink-700'
                }`}
              >
                Take Diagnostic Quiz
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
