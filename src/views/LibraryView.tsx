import React, { useState } from 'react';
import {
  BookOpen,
  Upload,
  FileText,
  FileCode,
  Video,
  Presentation,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Search,
  Plus,
  Eye,
  Trash2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StudyMaterial } from '../types';

export const LibraryView: React.FC = () => {
  const {
    materials,
    addMaterial,
    theme,
    profile,
    setActivePage,
    awardXp,
    triggerCelebration,
  } = useApp();

  const isOcean = theme === 'ocean';

  const [selectedMaterial, setSelectedMaterial] = useState<StudyMaterial | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState('All');

  // Custom upload modal state
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadSubject, setUploadSubject] = useState(profile.subjects[0] || 'Computer Science');
  const [uploadTopic, setUploadTopic] = useState('');
  const [uploadType, setUploadType] = useState<'pdf' | 'slides' | 'notes' | 'video'>('pdf');

  const filteredMaterials = materials.filter((m) => {
    const matchesSearch =
      m.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.topic.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSub = selectedSubjectFilter === 'All' || m.subject === selectedSubjectFilter;
    return matchesSearch && matchesSub;
  });

  const handleSimulatedUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!uploadTitle.trim()) return;

    setIsUploading(true);
    setUploadProgress(15);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 90) {
          clearInterval(interval);
          return 90;
        }
        return prev + 25;
      });
    }, 250);

    setTimeout(() => {
      clearInterval(interval);
      setIsUploading(false);
      setUploadProgress(0);

      const newMat: StudyMaterial = {
        id: `mat-${Date.now()}`,
        title: uploadTitle.endsWith('.pdf') ? uploadTitle : `${uploadTitle}.${uploadType}`,
        subject: uploadSubject,
        topic: uploadTopic || 'Foundational Concepts',
        type: uploadType,
        fileSize: '3.4 MB',
        pagesOrSlides: uploadType === 'slides' ? 24 : 32,
        uploadedAt: new Date().toISOString().split('T')[0],
        status: 'ready',
        summary: `Indexed material on ${uploadTopic || uploadTitle} with extracted sections and citations ready for AI study queries.`,
        snippets: [
          {
            id: `sn-new-1`,
            location: 'Section 1, Page 3',
            pageOrSlide: 3,
            title: 'Core Fundamentals & Overview',
            text: `Detailed review of ${uploadTopic || uploadTitle} covering essential properties, definitions, and applications to coursework.`,
            keywords: ['fundamentals', 'overview', uploadSubject.toLowerCase()],
          },
        ],
      };

      addMaterial(newMat);
      setShowUploadModal(false);
      setUploadTitle('');
      setUploadTopic('');
      awardXp(25, 'Uploaded & indexed new study material');
      triggerCelebration();
    }, 1200);
  };

  const getFormatIcon = (type: string) => {
    switch (type) {
      case 'pdf':
        return <FileText className="w-5 h-5 text-rose-400" />;
      case 'slides':
        return <Presentation className="w-5 h-5 text-amber-400" />;
      case 'video':
        return <Video className="w-5 h-5 text-sky-400" />;
      default:
        return <FileCode className="w-5 h-5 text-emerald-400" />;
    }
  };

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
              Course Material Library
            </span>
          </div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold">
            Study Material Library & Indexed Notes
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            PDFs, lecture slides, notes, and video transcripts ready for citation-grounded tutor queries.
          </p>
        </div>

        <button
          onClick={() => setShowUploadModal(true)}
          className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-transform hover:scale-105 self-start sm:self-auto ${
            isOcean
              ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-sky-500/30'
              : 'bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-pink-500/30'
          }`}
        >
          <Upload className="w-4 h-4" />
          <span>Upload Study Material</span>
        </button>
      </div>

      {/* Search & Subject filter bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search documents, topics, or keywords..."
            className={`w-full pl-10 pr-4 py-2.5 rounded-2xl border text-xs outline-none transition ${
              isOcean
                ? 'bg-slate-900 border-sky-900/50 text-white placeholder-slate-500 focus:border-sky-400'
                : 'bg-white border-slate-200 text-slate-900 placeholder-slate-400 focus:border-pink-500'
            }`}
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
          {['All', ...profile.subjects].map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubjectFilter(sub)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                selectedSubjectFilter === sub
                  ? isOcean
                    ? 'bg-sky-500 text-slate-950 font-bold'
                    : 'bg-pink-500 text-white font-bold'
                  : isOcean
                  ? 'bg-slate-900 text-slate-400 hover:bg-slate-800'
                  : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Materials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredMaterials.map((mat) => (
          <div
            key={mat.id}
            className={`p-5 rounded-3xl border transition-all flex flex-col justify-between ${
              isOcean
                ? 'bg-slate-900/80 border-sky-900/40 text-slate-100 hover:border-sky-700/60'
                : 'bg-white border-pink-100 text-slate-900 shadow-sm hover:border-pink-300'
            }`}
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-10 h-10 rounded-2xl flex items-center justify-center ${
                      isOcean ? 'bg-slate-800' : 'bg-slate-100'
                    }`}
                  >
                    {getFormatIcon(mat.type)}
                  </div>
                  <div>
                    <h2 className="font-heading font-bold text-sm sm:text-base line-clamp-1">
                      {mat.title}
                    </h2>
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-full uppercase ${
                        isOcean ? 'bg-sky-500/15 text-sky-300' : 'bg-pink-100 text-pink-700'
                      }`}
                    >
                      {mat.subject} • {mat.topic}
                    </span>
                  </div>
                </div>

                <span className="text-[11px] font-semibold text-emerald-400 flex items-center gap-1 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Ready
                </span>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed mb-4 line-clamp-2">
                {mat.summary}
              </p>

              {/* Snippet pill tags */}
              <div className="flex flex-wrap items-center gap-1.5 mb-4">
                {mat.snippets.map((sn) => (
                  <span
                    key={sn.id}
                    className={`text-[10px] px-2 py-0.5 rounded-md border font-medium ${
                      isOcean
                        ? 'bg-slate-950/60 border-slate-800 text-sky-200'
                        : 'bg-slate-50 border-slate-200 text-slate-700'
                    }`}
                  >
                    📍 {sn.location}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="pt-3 border-t border-slate-800/40 flex items-center justify-between text-xs text-slate-400">
              <span className="text-[11px]">
                {mat.pagesOrSlides} pages/slides • {mat.fileSize}
              </span>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedMaterial(mat)}
                  className={`p-1.5 px-2.5 rounded-xl text-xs font-semibold border transition flex items-center gap-1 ${
                    isOcean
                      ? 'border-sky-800/60 hover:bg-slate-800 text-sky-300'
                      : 'border-pink-200 hover:bg-pink-50 text-pink-700'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Inspect Citations</span>
                </button>

                <button
                  onClick={() => setActivePage('tutor')}
                  className={`p-1.5 px-3 rounded-xl text-xs font-bold transition flex items-center gap-1 shadow-sm ${
                    isOcean
                      ? 'bg-sky-500 hover:bg-sky-400 text-slate-950'
                      : 'bg-pink-500 hover:bg-pink-600 text-white'
                  }`}
                >
                  <span>Ask Tutor</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Snippet Inspector Modal */}
      {selectedMaterial && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className={`w-full max-w-xl max-h-[85vh] flex flex-col p-6 rounded-3xl border shadow-2xl relative ${
              isOcean
                ? 'bg-slate-900 border-sky-800 text-slate-100'
                : 'bg-white border-pink-200 text-slate-900'
            }`}
          >
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800/40">
              <div>
                <h2 className="font-heading font-bold text-lg">
                  {selectedMaterial.title}
                </h2>
                <p className="text-xs text-slate-400">
                  {selectedMaterial.subject} • {selectedMaterial.pagesOrSlides} pages/slides • Indexed Citations
                </p>
              </div>
              <button
                onClick={() => setSelectedMaterial(null)}
                className="text-slate-400 hover:text-white p-2 rounded-xl"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 overflow-y-auto flex-1 pr-1">
              {selectedMaterial.snippets.map((sn) => (
                <div
                  key={sn.id}
                  className={`p-4 rounded-2xl border text-xs leading-relaxed ${
                    isOcean
                      ? 'bg-slate-950/80 border-sky-900/50'
                      : 'bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between text-sky-400 font-bold mb-1.5">
                    <span>{sn.title}</span>
                    <span className="underline">{sn.location}</span>
                  </div>
                  <p className="opacity-90 italic">"{sn.text}"</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {sn.keywords.map((kw, i) => (
                      <span
                        key={i}
                        className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300"
                      >
                        #{kw}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 mt-3 border-t border-slate-800/40 flex justify-end gap-2">
              <button
                onClick={() => setSelectedMaterial(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold border border-slate-700 hover:bg-slate-800"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setSelectedMaterial(null);
                  setActivePage('tutor');
                }}
                className={`px-4 py-2 rounded-xl text-xs font-bold ${
                  isOcean ? 'bg-sky-500 text-slate-950' : 'bg-pink-500 text-white'
                }`}
              >
                Query in AI Tutor
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            className={`w-full max-w-md p-6 rounded-3xl border shadow-2xl relative ${
              isOcean
                ? 'bg-slate-900 border-sky-800 text-slate-100'
                : 'bg-white border-pink-200 text-slate-900'
            }`}
          >
            <h2 className="font-heading font-bold text-xl mb-1">
              Upload Study Material 📚
            </h2>
            <p className="text-xs text-slate-400 mb-6">
              Upload lecture slides, textbooks, or notes. LearnLoop indexes them for accurate citations.
            </p>

            <form onSubmit={handleSimulatedUpload} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                  Document / Material Title
                </label>
                <input
                  type="text"
                  required
                  value={uploadTitle}
                  onChange={(e) => setUploadTitle(e.target.value)}
                  placeholder="e.g. AP Physics Mechanics Chapter 4"
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
                    value={uploadSubject}
                    onChange={(e) => setUploadSubject(e.target.value)}
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
                    Format Type
                  </label>
                  <select
                    value={uploadType}
                    onChange={(e) => setUploadType(e.target.value as any)}
                    className={`w-full px-3 py-2.5 rounded-xl border text-sm outline-none ${
                      isOcean
                        ? 'bg-slate-950 border-sky-800 text-white'
                        : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value="pdf">PDF Document</option>
                    <option value="slides">Lecture Slides</option>
                    <option value="notes">Study Notes</option>
                    <option value="video">Lecture Video</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold uppercase text-slate-400 mb-1">
                  Topic Focus
                </label>
                <input
                  type="text"
                  value={uploadTopic}
                  onChange={(e) => setUploadTopic(e.target.value)}
                  placeholder="e.g. Momentum and Collisions"
                  className={`w-full px-4 py-2.5 rounded-xl border text-sm outline-none ${
                    isOcean
                      ? 'bg-slate-950 border-sky-800 text-white'
                      : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              {/* Progress Bar when uploading */}
              {isUploading && (
                <div className="space-y-1 pt-2">
                  <div className="flex justify-between text-xs text-sky-400 font-semibold">
                    <span>Extracting text & OCR diagrams...</span>
                    <span>{uploadProgress}%</span>
                  </div>
                  <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-sky-400 transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="flex gap-3 pt-3">
                <button
                  type="button"
                  disabled={isUploading}
                  onClick={() => setShowUploadModal(false)}
                  className="w-1/3 py-2.5 rounded-xl text-xs font-semibold border border-slate-700 hover:bg-slate-800/50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading}
                  className={`w-2/3 py-2.5 rounded-xl text-xs font-bold transition shadow ${
                    isOcean
                      ? 'bg-sky-500 text-slate-950 hover:bg-sky-400'
                      : 'bg-pink-500 text-white hover:bg-pink-600'
                  }`}
                >
                  {isUploading ? 'Indexing...' : 'Index & Save Material'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
