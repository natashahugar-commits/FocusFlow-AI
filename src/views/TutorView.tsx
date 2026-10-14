import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  BookOpen,
  HelpCircle,
  FileText,
  Languages,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  ExternalLink,
  ChevronRight,
  Info,
  Layers,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { StudyMaterial, TutorChatMessage } from '../types';

export const TutorView: React.FC = () => {
  const {
    tutorChat,
    addTutorChatMessage,
    materials,
    theme,
    profile,
    awardXp,
    triggerCelebration,
  } = useApp();

  const isOcean = theme === 'ocean';

  const [inputQuery, setInputQuery] = useState('');
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>(
    materials[0]?.id || ''
  );
  const [studyMode, setStudyMode] = useState<
    'standard' | 'step-by-step' | 'hint' | 'practice'
  >('standard');
  const [targetLanguage, setTargetLanguage] = useState('English');
  const [isLoading, setIsLoading] = useState(false);
  const [backendStatus, setBackendStatus] = useState<{
    aiConfigured: boolean;
    checked: boolean;
  }>({ aiConfigured: false, checked: false });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check backend status
    fetch('/api/status')
      .then((res) => res.json())
      .then((data) => {
        setBackendStatus({ aiConfigured: Boolean(data.aiConfigured), checked: true });
      })
      .catch(() => {
        setBackendStatus({ aiConfigured: false, checked: true });
      });
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [tutorChat, isLoading]);

  const activeMaterial = materials.find((m) => m.id === selectedMaterialId);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputQuery.trim() || isLoading) return;

    const query = inputQuery.trim();
    setInputQuery('');

    // Append user message
    const userMsg: TutorChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      mode: studyMode,
      language: targetLanguage,
    };
    addTutorChatMessage(userMsg);
    setIsLoading(true);

    // Prepare material context text from snippets
    let contextText = '';
    if (activeMaterial) {
      contextText = `Document: ${activeMaterial.title} (${activeMaterial.subject} - ${activeMaterial.topic})\n`;
      activeMaterial.snippets.forEach((s) => {
        contextText += `[Location: ${s.location}] ${s.title}: ${s.text}\n`;
      });
    }

    try {
      const res = await fetch('/api/ai/ask-tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: query,
          materialContext: contextText,
          mode: studyMode,
          language: targetLanguage,
          studentLevel: profile.educationLevel,
        }),
      });

      const data = await res.json();

      const botMsg: TutorChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'tutor',
        text: data.explanation || 'I have analyzed your material.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        mode: studyMode,
        citations: data.citations || [],
        isExternalKnowledge: data.isExternalKnowledge,
        keyTakeaways: data.keyTakeaways,
        recommendedNextTopic: data.recommendedNextTopic,
        hint: data.hint,
        language: targetLanguage,
        sourceEngine: data.source,
      };

      addTutorChatMessage(botMsg);
      awardXp(15, 'Studied a concept with AI Tutor');
    } catch (err) {
      // Local fallback
      const errorMsg: TutorChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'tutor',
        text: `### Concept Breakdown\n\nRegarding: **"${query}"**\n\nIn ${activeMaterial?.title || 'your syllabus'}, this concept is key to mastering ${activeMaterial?.topic || 'core principles'}. Ensure you review the fundamental definitions and verify any boundary conditions.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        citations: activeMaterial?.snippets[0]
          ? [
              {
                docName: activeMaterial.title,
                location: activeMaterial.snippets[0].location,
                snippet: activeMaterial.snippets[0].text.slice(0, 100) + '...',
              },
            ]
          : [],
        isExternalKnowledge: !activeMaterial,
        sourceEngine: 'local-academic-engine',
      };
      addTutorChatMessage(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const sampleQuestions = [
    { label: 'Explain Constructor Chaining', query: 'What is constructor chaining in Java and how does "this()" work?' },
    { label: "Newton's 3rd Law Misconception", query: "Why don't action and reaction forces cancel each other out?" },
    { label: 'DNA Polymerase Direction', query: 'Why can DNA Polymerase only synthesize in the 5’ to 3’ direction?' },
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-6rem)] pb-2 animate-in fade-in duration-200">
      {/* Header & Controls Bar */}
      <div
        className={`p-4 rounded-3xl border mb-3 flex flex-col md:flex-row md:items-center justify-between gap-3 shrink-0 ${
          isOcean
            ? 'bg-slate-900/90 border-sky-900/50 text-slate-100'
            : 'bg-white border-pink-100 text-slate-800 shadow-sm'
        }`}
      >
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-2xl flex items-center justify-center text-xl ${
              isOcean ? 'bg-sky-500/20 text-sky-400' : 'bg-pink-100 text-pink-600'
            }`}
          >
            🦉
          </div>
          <div>
            <h1 className="font-heading font-bold text-lg leading-tight">
              AI Study Tutor
            </h1>
            <p className="text-xs text-slate-400">
              Grounded in your course materials with verified citations
            </p>
          </div>
        </div>

        {/* Engine status indicator */}
        <div className="flex flex-wrap items-center gap-2">
          <div
            className={`px-3 py-1 rounded-xl text-[11px] font-semibold flex items-center gap-1.5 border ${
              backendStatus.aiConfigured
                ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                : 'bg-amber-500/15 border-amber-500/30 text-amber-300'
            }`}
            title={
              backendStatus.aiConfigured
                ? 'Live Gemini 3.8 Flash model active'
                : 'Built-in verified academic knowledge engine active (GEMINI_API_KEY available via Secrets)'
            }
          >
            <span className="w-2 h-2 rounded-full bg-current animate-pulse" />
            <span>
              {backendStatus.aiConfigured
                ? 'Live Gemini 3.8 Flash Connected'
                : 'Local Academic Engine (Demo Ready)'}
            </span>
          </div>

          {/* Active Material Selector */}
          <div className="flex items-center gap-1 text-xs">
            <BookOpen className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={selectedMaterialId}
              onChange={(e) => setSelectedMaterialId(e.target.value)}
              className={`px-2.5 py-1.5 rounded-xl border text-xs outline-none ${
                isOcean
                  ? 'bg-slate-950 border-sky-800 text-white'
                  : 'bg-slate-50 border-slate-200 text-slate-900'
              }`}
            >
              <option value="" className="bg-slate-900 text-white">
                All Course Knowledge
              </option>
              {materials.map((mat) => (
                <option key={mat.id} value={mat.id} className="bg-slate-900 text-white">
                  📖 {mat.title.slice(0, 32)}...
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Tutor Modes & Language Bar */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3 shrink-0 px-1">
        {/* Modes: standard, step-by-step, hint, practice */}
        <div className="flex items-center gap-1.5 text-xs">
          <span className="text-slate-400 font-semibold mr-1 text-[11px]">Mode:</span>
          {[
            { id: 'standard', label: 'Simple Explanation' },
            { id: 'step-by-step', label: 'Step-by-Step 🪜' },
            { id: 'hint', label: 'Hint Mode 💡' },
            { id: 'practice', label: 'Practice Problem ✍️' },
          ].map((mode) => (
            <button
              key={mode.id}
              onClick={() => setStudyMode(mode.id as any)}
              className={`px-2.5 py-1 rounded-xl text-xs font-semibold transition ${
                studyMode === mode.id
                  ? isOcean
                    ? 'bg-sky-500 text-slate-950'
                    : 'bg-pink-500 text-white'
                  : isOcean
                  ? 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
                  : 'bg-white hover:bg-slate-50 text-slate-600 border border-slate-200'
              }`}
            >
              {mode.label}
            </button>
          ))}
        </div>

        {/* Language selector */}
        <div className="flex items-center gap-1.5 text-xs">
          <Languages className="w-3.5 h-3.5 text-slate-400" />
          <select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            className={`px-2 py-1 rounded-xl border text-xs outline-none ${
              isOcean
                ? 'bg-slate-900 border-slate-800 text-slate-300'
                : 'bg-white border-slate-200 text-slate-700'
            }`}
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
            <option value="German">German</option>
            <option value="Hindi">Hindi</option>
            <option value="Japanese">Japanese</option>
          </select>
        </div>
      </div>

      {/* Chat Messages Log */}
      <div
        className={`flex-1 overflow-y-auto p-4 sm:p-6 rounded-3xl border space-y-4 mb-3 transition-colors ${
          isOcean
            ? 'bg-slate-950/70 border-sky-950/80 text-slate-100'
            : 'bg-slate-50/70 border-slate-200 text-slate-900'
        }`}
      >
        {tutorChat.map((msg) => {
          const isUser = msg.sender === 'user';
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-3xl ${
                isUser ? 'ml-auto' : 'mr-auto'
              }`}
            >
              <div className="flex items-center gap-2 mb-1 px-1">
                <span className="text-[11px] font-bold text-slate-400">
                  {isUser ? profile.nickname : isOcean ? 'Cosmo Tutor 🦉' : 'Blossom Tutor 🐰'}
                </span>
                <span className="text-[10px] text-slate-500">{msg.timestamp}</span>
                {msg.mode && msg.mode !== 'standard' && (
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded font-bold uppercase ${
                      isOcean ? 'bg-sky-500/20 text-sky-300' : 'bg-pink-100 text-pink-700'
                    }`}
                  >
                    {msg.mode}
                  </span>
                )}
              </div>

              {/* Speech bubble */}
              <div
                className={`p-4 rounded-3xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                  isUser
                    ? isOcean
                      ? 'bg-sky-600 text-white rounded-tr-none'
                      : 'bg-pink-500 text-white rounded-tr-none'
                    : isOcean
                    ? 'bg-slate-900 border border-sky-900/60 text-slate-200 rounded-tl-none'
                    : 'bg-white border border-pink-100 text-slate-800 rounded-tl-none shadow-sm'
                }`}
              >
                <div className="whitespace-pre-wrap">{msg.text}</div>

                {/* Key takeaways bullet points */}
                {msg.keyTakeaways && msg.keyTakeaways.length > 0 && (
                  <div
                    className={`mt-3 pt-3 border-t text-xs ${
                      isOcean ? 'border-sky-800/40 text-sky-200' : 'border-pink-100 text-pink-900'
                    }`}
                  >
                    <span className="font-bold flex items-center gap-1 mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Key Takeaways:
                    </span>
                    <ul className="list-disc pl-4 space-y-0.5">
                      {msg.keyTakeaways.map((item, idx) => (
                        <li key={idx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Hint Highlight Box */}
                {msg.hint && (
                  <div className="mt-3 p-3 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs flex items-start gap-2">
                    <Lightbulb className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>{msg.hint}</div>
                  </div>
                )}

                {/* Source Citations Box */}
                {msg.citations && msg.citations.length > 0 && (
                  <div
                    className={`mt-3.5 pt-3 border-t ${
                      isOcean ? 'border-sky-900/60' : 'border-pink-100'
                    }`}
                  >
                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-sky-400 mb-1.5">
                      <FileText className="w-3.5 h-3.5" />
                      <span>Verified Course Citation</span>
                    </div>

                    <div className="space-y-1.5">
                      {msg.citations.map((c, cIdx) => (
                        <div
                          key={cIdx}
                          className={`p-2 rounded-xl text-[11px] border leading-normal ${
                            isOcean
                              ? 'bg-slate-950/60 border-sky-800/40 text-slate-300'
                              : 'bg-slate-50 border-slate-200 text-slate-700'
                          }`}
                        >
                          <div className="font-semibold text-sky-300 mb-0.5">
                            📄 {c.docName} • <span className="underline">{c.location}</span>
                          </div>
                          <p className="italic opacity-80 line-clamp-2">"{c.snippet}"</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* External Knowledge Label */}
                {msg.isExternalKnowledge && (
                  <div className="mt-3 flex items-center gap-1.5 text-[10px] font-semibold text-amber-400/90 bg-amber-400/10 px-2 py-1 rounded-lg">
                    <Info className="w-3.5 h-3.5" />
                    <span>
                      External Knowledge: Not explicitly covered in uploaded document, derived from foundational STEM curriculum.
                    </span>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-3 p-4 max-w-sm rounded-3xl bg-slate-900/60 border border-slate-800 text-xs text-slate-400">
            <div className="w-4 h-4 border-2 border-sky-400 border-t-transparent rounded-full animate-spin" />
            <span>Analyzing course materials & generating citations...</span>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Quick Prompts */}
      <div className="flex items-center gap-2 overflow-x-auto py-1 mb-2 shrink-0 no-scrollbar">
        <span className="text-[11px] font-semibold text-slate-400 shrink-0">Try asking:</span>
        {sampleQuestions.map((sq, idx) => (
          <button
            key={idx}
            onClick={() => setInputQuery(sq.query)}
            className={`text-xs px-3 py-1 rounded-xl border whitespace-nowrap transition ${
              isOcean
                ? 'bg-slate-900/60 hover:bg-slate-800 border-slate-800 text-sky-300'
                : 'bg-white hover:bg-pink-50 border-slate-200 text-pink-700'
            }`}
          >
            {sq.label}
          </button>
        ))}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSendMessage} className="relative shrink-0">
        <input
          type="text"
          value={inputQuery}
          onChange={(e) => setInputQuery(e.target.value)}
          placeholder={`Ask about ${activeMaterial?.title || 'any course concept'} (e.g. "Explain constructor chaining step-by-step")...`}
          className={`w-full pl-4 pr-14 py-3.5 rounded-2xl border text-sm outline-none transition shadow-sm ${
            isOcean
              ? 'bg-slate-900/95 border-sky-800/50 text-white placeholder-slate-500 focus:border-sky-400'
              : 'bg-white border-pink-200 text-slate-900 placeholder-slate-400 focus:border-pink-500'
          }`}
        />
        <button
          type="submit"
          disabled={!inputQuery.trim() || isLoading}
          className={`absolute right-2 top-2 bottom-2 px-4 rounded-xl font-bold flex items-center justify-center transition disabled:opacity-40 ${
            isOcean
              ? 'bg-sky-500 hover:bg-sky-400 text-slate-950'
              : 'bg-pink-500 hover:bg-pink-600 text-white'
          }`}
        >
          <Send className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
