import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, Github, ExternalLink, Play, Sparkles, Bot, BookOpen, 
  Calendar, Trophy, FileText, Smartphone, Server, Cpu, Database, 
  CheckCircle2, Layers, Terminal, ChevronRight, Share2, Star, Clock,
  Flame, HelpCircle, FileCheck, Network, Pin, Search, Plus, Filter, Send,
  Maximize2, Eye, Info
} from 'lucide-react';
import { SINOVATE_DATA } from '../../data';
import { SinovateScreenshot } from '../../types';

interface SinovateInteractivePageProps {
  onBack: () => void;
}

export default function SinovateInteractivePage({ onBack }: SinovateInteractivePageProps) {
  const [activeTab, setActiveTab] = useState<'screenshots' | 'video' | 'rag' | 'reproduction'>('screenshots');
  const [selectedScreenId, setSelectedScreenId] = useState<string>('home-screen');

  const selectedScreen = SINOVATE_DATA.screenshots.find(s => s.id === selectedScreenId) || SINOVATE_DATA.screenshots[0];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-8 px-4 sm:px-6 max-w-6xl mx-auto text-left font-sans selection:bg-cyan-500/20">
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-850 pb-6 mb-8">
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition-colors cursor-pointer mb-3"
            id="btn-back-to-portfolio"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects Portfolio
          </button>
          
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-mono font-bold uppercase tracking-wider">
              Flutter 3.x Client
            </span>
            <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-bold uppercase tracking-wider">
              FastAPI + LangChain
            </span>
            <span className="px-2.5 py-0.5 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[10px] font-mono font-bold uppercase tracking-wider">
              FAISS Vector Store (RAG)
            </span>
            <span className="px-2.5 py-0.5 bg-zinc-800 text-zinc-300 text-[10px] font-mono uppercase tracking-wider">
              OpenAI GPT-4o
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight font-display">
            SINOVATE — School Assistant
          </h1>
          <p className="text-zinc-400 text-sm mt-1 max-w-2xl font-light leading-relaxed">
            {SINOVATE_DATA.tagline} An all-in-one cross-platform AI study companion with curriculum-grounded retrieval, exam planning, structured smart notes, and worksheet studio.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2.5 shrink-0">
          <a
            href={SINOVATE_DATA.githubRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-900 hover:bg-zinc-850 text-white font-mono text-xs uppercase tracking-wider font-bold border border-zinc-750 transition-colors"
            id="btn-sinovate-github"
          >
            <Github className="w-4 h-4" />
            GitHub Repository
          </a>
          <a
            href={SINOVATE_DATA.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-600/90 hover:bg-red-600 text-white font-mono text-xs uppercase tracking-wider font-bold transition-colors"
            id="btn-sinovate-youtube"
          >
            <Play className="w-4 h-4 fill-current" />
            YouTube Link
          </a>
        </div>
      </div>

      {/* Main Feature Navigation Tabs */}
      <div className="flex flex-wrap gap-1 border-b border-zinc-800 pb-4 mb-8">
        {[
          { id: 'screenshots', label: '📱 Actual App Screenshots & UI Exhibit', icon: Smartphone },
          { id: 'video', label: '▶️ Embedded Video Player', icon: Play },
          { id: 'rag', label: '🧠 RAG & AI Architecture', icon: Network },
          { id: 'reproduction', label: '⚙️ Stack & Setup Guide', icon: Terminal }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`tab-sinovate-${tab.id}`}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 text-xs font-mono uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center gap-2 ${
                isActive
                  ? 'bg-zinc-100 text-zinc-950 font-black shadow'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900 border border-transparent'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: ACTUAL APP SCREENSHOTS & UI EXHIBIT */}
      {activeTab === 'screenshots' && (
        <div className="space-y-8">
          
          {/* Quick Screen Selector Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {SINOVATE_DATA.screenshots.map((screen) => {
              const isSelected = selectedScreenId === screen.id;
              return (
                <button
                  key={screen.id}
                  id={`screen-tab-${screen.id}`}
                  onClick={() => setSelectedScreenId(screen.id)}
                  className={`p-3 text-left border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-zinc-900 border-blue-500/80 ring-1 ring-blue-500/50 text-white'
                      : 'bg-zinc-950 border-zinc-850 hover:border-zinc-700 text-zinc-400'
                  }`}
                >
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 block mb-1">
                    {screen.category}
                  </span>
                  <span className="text-xs font-bold font-sans line-clamp-1 block text-zinc-200">
                    {screen.title}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Interactive Screen Display Stage */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Phone Mockup Frame (5 Cols) Rendering Authentic UI from Screenshots */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-[360px] bg-[#0c1017] border-4 border-zinc-800 rounded-[40px] p-3.5 shadow-2xl relative overflow-hidden ring-1 ring-zinc-700/60">
                
                {/* Top Status Bar (17:32 / 17:33, 5G, Battery) */}
                <div className="flex justify-between items-center px-4 py-1.5 text-[11px] text-zinc-300 font-sans border-b border-zinc-900/80 pb-2 mb-2">
                  <span className="font-semibold">{selectedScreen.id === 'calendar-view' || selectedScreen.id === 'exams-hub' ? '17:33' : '17:32'}</span>
                  <div className="w-20 h-3.5 bg-zinc-900 rounded-full mx-auto" />
                  <span className="text-[10px] tracking-tight text-zinc-400">5G 📶 100%</span>
                </div>

                {/* Mobile Viewport Body */}
                <div className="bg-[#0f141f] min-h-[580px] max-h-[640px] overflow-y-auto rounded-[28px] p-4 text-zinc-100 flex flex-col justify-between border border-zinc-800/80 relative font-sans shadow-inner">
                  
                  {/* SCREEN 1: HOME SCREEN (WhatsApp Image 2026-09-22 at 17.33.44.jpeg) */}
                  {selectedScreen.id === 'home-screen' && (
                    <div className="space-y-4 text-left">
                      {/* Top App Bar */}
                      <div className="flex justify-between items-center text-zinc-300 text-xs">
                        <div className="flex items-center gap-3">
                          <button className="p-1 text-zinc-300"><div className="w-4 h-0.5 bg-zinc-300 mb-1" /><div className="w-4 h-0.5 bg-zinc-300 mb-1" /><div className="w-4 h-0.5 bg-zinc-300" /></button>
                          <span className="flex items-center gap-1.5 text-[11px] text-blue-400 font-medium">
                            <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" /> Online
                          </span>
                        </div>
                        <div className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs font-bold text-zinc-300">
                          O
                        </div>
                      </div>

                      {/* Header Greeting */}
                      <div className="space-y-1">
                        <span className="text-xs text-zinc-400 font-normal">Good evening, Om Suraj</span>
                        <h3 className="text-2xl font-bold text-white tracking-tight leading-tight">
                          How can I help you today?
                        </h3>
                      </div>

                      {/* Primary Action Cards Grid */}
                      <div className="grid grid-cols-2 gap-2.5">
                        <div className="p-3.5 bg-[#171d2b] border border-zinc-800 rounded-2xl flex flex-col justify-between h-28 relative">
                          <div className="flex justify-between items-start">
                            <div className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center text-blue-400">
                              <Sparkles className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-zinc-400 text-xs">↗</span>
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white leading-tight">Chat with SINOVATE</div>
                            <div className="text-[10px] text-zinc-400 mt-0.5">Your AI study assistant</div>
                          </div>
                        </div>

                        <div className="p-3.5 bg-[#171d2b] border border-zinc-800 rounded-2xl flex flex-col justify-between h-28 relative">
                          <div className="flex justify-between items-start">
                            <div className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-400">
                              <Calendar className="w-3.5 h-3.5" />
                            </div>
                            <span className="text-zinc-400 text-xs">↗</span>
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white leading-tight">Upcoming Tests (10d)</div>
                            <div className="text-[10px] text-zinc-400 mt-0.5">No tests in next 10 days</div>
                          </div>
                        </div>
                      </div>

                      {/* Login Streak Card */}
                      <div className="p-3.5 bg-[#171d2b] border border-zinc-800 rounded-2xl flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                          <Flame className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white">Login Streak</div>
                          <div className="text-[10px] text-zinc-400">Start your streak today</div>
                        </div>
                      </div>

                      {/* History Section */}
                      <div className="space-y-2 pt-1">
                        <div className="flex justify-between items-center text-xs">
                          <span className="font-bold text-zinc-200 text-sm">History</span>
                          <span className="text-[11px] text-zinc-400 cursor-pointer hover:text-white">See all</span>
                        </div>

                        <div className="space-y-2">
                          <div className="p-3 bg-[#171d2b] border border-zinc-850 rounded-2xl flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-400">
                                <FileText className="w-4 h-4" />
                              </div>
                              <div className="text-left">
                                <div className="text-xs font-semibold text-white">New Chat</div>
                                <div className="text-[10px] text-zinc-400">No messages yet • 0 messages</div>
                              </div>
                            </div>
                            <div className="text-right flex flex-col items-end">
                              <span className="text-[10px] text-zinc-500">8:19 PM</span>
                              <span className="text-zinc-500 text-xs mt-0.5">❯</span>
                            </div>
                          </div>

                          <div className="p-3 bg-[#171d2b] border border-zinc-850 rounded-2xl flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-400">
                                <FileText className="w-4 h-4" />
                              </div>
                              <div className="text-left">
                                <div className="text-xs font-semibold text-white">explain me 2nd chapt...</div>
                                <div className="text-[10px] text-zinc-400">Certainly! The 2nd chapter of Class 1...</div>
                              </div>
                            </div>
                            <div className="text-right flex flex-col items-end">
                              <span className="text-[10px] text-zinc-500">7:13 PM</span>
                              <span className="text-zinc-500 text-xs mt-0.5">❯</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SCREEN 2: AI TUTOR CHAT (WhatsApp Image 2026-09-22 at 17.33.45.jpeg) */}
                  {selectedScreen.id === 'ai-tutor-chat' && (
                    <div className="space-y-3 text-left flex flex-col h-full justify-between">
                      <div className="space-y-3">
                        {/* Top Bar */}
                        <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                          <div className="flex items-center gap-2.5">
                            <div className="w-7 h-7 rounded-xl bg-blue-600 flex items-center justify-center text-white">
                              <Bot className="w-4 h-4" />
                            </div>
                            <span className="text-xs font-bold text-white">hey hi</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button className="text-[10px] text-zinc-400 hover:text-white flex items-center gap-1">
                              ≡ Clear chat
                            </button>
                            <div className="w-4 h-0.5 bg-zinc-400" />
                          </div>
                        </div>

                        {/* Chat Response Bubble matching screenshot text */}
                        <div className="p-3.5 bg-[#171d2b] border border-zinc-800 rounded-2xl space-y-2.5 text-[11px] text-zinc-300 leading-relaxed">
                          <p className="text-zinc-300">
                            ...character, further strengthening it.
                          </p>
                          <p className="text-zinc-300">
                            • In <strong>haloalkanes</strong>, the sp3 carbon does not allow such resonance, so the C–X bond remains a simple single bond, easier to break.
                          </p>
                          <div className="pt-1">
                            <strong className="text-white block mb-1">Why this is important:</strong>
                            <p className="text-zinc-300">
                              Understanding the role of hybridization helps explain why <strong>haloarenes</strong> resist nucleophilic substitution reactions, as the stronger, resonance-stabilized C–X bond requires more energy to break compared to the weaker C–X bond in haloalkanes. This concept is fundamental in organic reaction mechanisms and predicting reactivity trends.
                            </p>
                          </div>
                          <div className="flex justify-between items-center text-[10px] text-zinc-500 pt-1 border-t border-zinc-800/80">
                            <span>11:48 AM</span>
                            <span className="cursor-pointer hover:text-zinc-300">❐</span>
                          </div>
                        </div>
                      </div>

                      {/* Bottom Input Field */}
                      <div className="pt-2 flex items-center gap-2 bg-[#171d2b] border border-zinc-800 rounded-2xl px-3.5 py-2.5">
                        <span className="text-zinc-400 text-sm cursor-pointer">📎</span>
                        <input 
                          type="text" 
                          placeholder="Ask anything..." 
                          className="bg-transparent text-xs text-white focus:outline-none w-full placeholder:text-zinc-500"
                          readOnly
                        />
                        <button className="w-7 h-7 rounded-xl bg-blue-500 text-white flex items-center justify-center shrink-0">
                          ▶
                        </button>
                      </div>
                    </div>
                  )}

                  {/* SCREEN 3: WORKSHEET STUDIO (WhatsApp Image 2026-09-22 at 17.33.45 (2).jpeg) */}
                  {selectedScreen.id === 'worksheet-studio' && (
                    <div className="space-y-3 text-left">
                      {/* Top Bar */}
                      <div className="flex items-center gap-2 pb-1 text-zinc-300 text-xs font-bold">
                        <span>←</span>
                        <span>New Worksheet</span>
                      </div>

                      {/* Header Card */}
                      <div className="p-3.5 bg-[#171d2b] border border-zinc-800 rounded-2xl space-y-1">
                        <h4 className="text-sm font-bold text-white">Worksheet Studio</h4>
                        <p className="text-[10px] text-zinc-400">
                          Draft, customize, and save practice sheets in minutes.
                        </p>
                      </div>

                      {/* Create Worksheet Section */}
                      <div className="space-y-2 text-xs">
                        <span className="text-xs font-semibold text-zinc-200 block">Create Worksheet</span>
                        
                        {/* Title input */}
                        <div className="p-2.5 bg-[#171d2b] border border-zinc-800 rounded-xl text-zinc-400 text-[11px]">
                          Worksheet title
                        </div>

                        {/* Subject */}
                        <div className="p-2.5 bg-[#171d2b] border border-zinc-800 rounded-xl space-y-0.5">
                          <span className="text-[9px] text-zinc-500 block">Subject</span>
                          <span className="text-xs font-medium text-white">Physics</span>
                        </div>

                        {/* Topic */}
                        <div className="p-2.5 bg-[#171d2b] border border-zinc-800 rounded-xl text-zinc-400 text-[11px]">
                          Topic
                        </div>

                        {/* Question Count */}
                        <div className="p-2.5 bg-[#171d2b] border border-zinc-800 rounded-xl space-y-0.5">
                          <span className="text-[9px] text-zinc-500 block">Question count for AI draft</span>
                          <span className="text-xs font-medium text-white">5</span>
                        </div>

                        {/* Difficulty */}
                        <div className="p-2.5 bg-[#171d2b] border border-zinc-800 rounded-xl flex justify-between items-center">
                          <div>
                            <span className="text-[9px] text-zinc-500 block">Difficulty</span>
                            <span className="text-xs font-medium text-white">Medium</span>
                          </div>
                          <span className="text-zinc-400 text-xs">▼</span>
                        </div>

                        {/* Question Types */}
                        <div className="space-y-1.5 pt-1">
                          <span className="text-[10px] text-zinc-400 block">Question types (choose multiple)</span>
                          <div className="flex flex-wrap gap-1.5">
                            <span className="px-2.5 py-1 bg-[#1e2738] text-white border border-blue-500/40 rounded-full text-[10px] font-medium">✓ MCQs</span>
                            <span className="px-2.5 py-1 bg-[#171d2b] text-zinc-300 border border-zinc-800 rounded-full text-[10px]">PYQs</span>
                            <span className="px-2.5 py-1 bg-[#171d2b] text-zinc-300 border border-zinc-800 rounded-full text-[10px]">Short Answer</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            <span className="px-2.5 py-1 bg-[#171d2b] text-zinc-300 border border-zinc-800 rounded-full text-[10px]">3 Marks</span>
                            <span className="px-2.5 py-1 bg-[#171d2b] text-zinc-300 border border-zinc-800 rounded-full text-[10px]">4 Marks</span>
                            <span className="px-2.5 py-1 bg-[#171d2b] text-zinc-300 border border-zinc-800 rounded-full text-[10px]">5 Marks</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="grid grid-cols-2 gap-2 pt-2">
                          <button className="py-2.5 bg-[#171d2b] border border-zinc-700 text-zinc-200 rounded-xl text-xs font-medium">
                            Generate Draft
                          </button>
                          <button className="py-2.5 bg-blue-500 text-white rounded-xl text-xs font-medium">
                            Save Worksheet
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SCREEN 4: MY NOTES (WhatsApp Image 2026-09-22 at 17.33.45 (1).jpeg) */}
                  {selectedScreen.id === 'notes-screen' && (
                    <div className="space-y-4 text-left flex flex-col h-full justify-between">
                      <div className="space-y-4">
                        {/* Top Bar */}
                        <div className="flex items-center gap-3 pb-1 text-zinc-200 text-sm font-bold">
                          <span>←</span>
                          <span>My Notes</span>
                        </div>

                        {/* Banner Card */}
                        <div className="p-4 bg-[#171d2b] border border-zinc-800 rounded-2xl flex items-center gap-3.5">
                          <div className="w-9 h-9 rounded-xl bg-blue-600/30 text-blue-400 flex items-center justify-center">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div>
                            <h4 className="text-sm font-bold text-white">My Notes</h4>
                            <p className="text-[10px] text-zinc-400">
                              Tap a card to read and edit your saved notes.
                            </p>
                          </div>
                        </div>

                        {/* 2-Column Note Cards */}
                        <div className="grid grid-cols-2 gap-2.5">
                          <div className="p-3 bg-[#171d2b] border border-zinc-800 rounded-2xl space-y-1.5 flex flex-col justify-between h-36">
                            <div>
                              <div className="flex justify-between items-center text-zinc-400 text-xs mb-1">
                                <div className="w-5 h-5 rounded bg-blue-600/20 text-blue-400 flex items-center justify-center text-[10px]">📄</div>
                                <div className="flex items-center gap-1">
                                  <span>📌</span>
                                  <span>❯</span>
                                </div>
                              </div>
                              <h5 className="text-xs font-bold text-white leading-tight">
                                Electrostatic Potential and Ca...
                              </h5>
                              <div className="text-[10px] text-zinc-400 mt-1"># 📚 Overview</div>
                            </div>
                            <p className="text-[10px] text-zinc-500 line-clamp-2">
                              Electrostatics is a fun...
                            </p>
                          </div>

                          <div className="p-3 bg-[#171d2b] border border-zinc-800 rounded-2xl space-y-1.5 flex flex-col justify-between h-36">
                            <div>
                              <div className="flex justify-between items-center text-zinc-400 text-xs mb-1">
                                <div className="w-5 h-5 rounded bg-blue-600/20 text-blue-400 flex items-center justify-center text-[10px]">📄</div>
                                <div className="flex items-center gap-1">
                                  <span>📌</span>
                                  <span>❯</span>
                                </div>
                              </div>
                              <h5 className="text-xs font-bold text-white leading-tight">
                                Amines
                              </h5>
                              <div className="text-[10px] text-zinc-400 mt-1"># 📚 Overview</div>
                            </div>
                            <p className="text-[10px] text-zinc-500 line-clamp-2">
                              Amines are a fundame...
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Floating Action Button */}
                      <div className="flex justify-end pt-4">
                        <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg text-lg cursor-pointer">
                          +
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SCREEN 5: CALENDAR (WhatsApp Image 2026-09-22 at 17.33.45 (3).jpeg) */}
                  {selectedScreen.id === 'calendar-view' && (
                    <div className="space-y-3.5 text-left">
                      {/* Top Bar */}
                      <div className="flex items-center gap-3 pb-1 text-zinc-200 text-sm font-bold">
                        <span>←</span>
                        <span>Calendar</span>
                      </div>

                      {/* Header Banner */}
                      <div className="p-3.5 bg-[#171d2b] border border-zinc-800 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-xl bg-blue-600/30 text-blue-400 flex items-center justify-center">
                            <Calendar className="w-4 h-4" />
                          </div>
                          <div>
                            <h4 className="text-xs font-bold text-white">Calendar</h4>
                            <p className="text-[10px] text-zinc-400">Track tests, homework, and tasks in one place.</p>
                          </div>
                        </div>
                        <span className="w-6 h-6 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-xs text-zinc-300">⊕</span>
                      </div>

                      {/* 3 Metric Pills */}
                      <div className="grid grid-cols-3 gap-2">
                        <div className="p-2.5 bg-[#171d2b] border border-zinc-800 rounded-2xl space-y-0.5">
                          <div className="w-5 h-5 rounded bg-zinc-800 flex items-center justify-center text-[10px] text-zinc-400">❓</div>
                          <div className="text-sm font-bold text-white">0</div>
                          <div className="text-[10px] text-zinc-400">Tests</div>
                        </div>
                        <div className="p-2.5 bg-[#171d2b] border border-zinc-800 rounded-2xl space-y-0.5">
                          <div className="w-5 h-5 rounded bg-zinc-800 flex items-center justify-center text-[10px] text-zinc-400">📑</div>
                          <div className="text-sm font-bold text-white">0</div>
                          <div className="text-[10px] text-zinc-400">Homework</div>
                        </div>
                        <div className="p-2.5 bg-[#171d2b] border border-zinc-800 rounded-2xl space-y-0.5">
                          <div className="w-5 h-5 rounded bg-zinc-800 flex items-center justify-center text-[10px] text-zinc-400">✓</div>
                          <div className="text-sm font-bold text-white">0</div>
                          <div className="text-[10px] text-zinc-400">Tasks</div>
                        </div>
                      </div>

                      {/* September 2026 Calendar Grid */}
                      <div className="p-3 bg-[#171d2b] border border-zinc-800 rounded-2xl space-y-2">
                        <div className="flex justify-between items-center px-2">
                          <span className="text-xs text-zinc-400">‹</span>
                          <span className="text-xs font-semibold text-white">September 2026</span>
                          <span className="text-xs text-zinc-400">›</span>
                        </div>
                        <div className="grid grid-cols-7 gap-1 text-[10px] text-center text-zinc-400">
                          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d, i) => (
                            <span key={i} className="text-zinc-500 font-medium py-0.5">{d}</span>
                          ))}
                          <span className="text-zinc-600">30</span>
                          <span className="text-zinc-600">31</span>
                          <span>1</span><span>2</span><span>3</span><span>4</span><span>5</span>
                          <span>6</span><span>7</span><span>8</span><span>9</span><span>10</span><span>11</span><span>12</span>
                          <span>13</span><span>14</span><span>15</span><span>16</span><span>17</span><span>18</span><span>19</span>
                          <span>20</span><span>21</span>
                          <span className="w-6 h-6 mx-auto rounded-full bg-blue-500 text-white font-bold flex items-center justify-center shadow-lg shadow-blue-500/30">22</span>
                          <span>23</span><span>24</span><span>25</span><span>26</span>
                          <span>27</span><span>28</span><span>29</span><span>30</span>
                          <span className="text-zinc-600">1</span>
                          <span className="text-zinc-600">2</span>
                          <span className="text-zinc-600">3</span>
                        </div>
                      </div>

                      {/* Tests List Section */}
                      <div className="p-3 bg-[#171d2b] border border-zinc-800 rounded-2xl space-y-1">
                        <div className="flex items-center gap-1.5 text-xs font-semibold text-zinc-300">
                          <span className="text-[10px]">❓</span>
                          <span>Tests</span>
                        </div>
                        <p className="text-[10px] text-zinc-400">No Tests for the selected day.</p>
                      </div>
                    </div>
                  )}

                  {/* SCREEN 6: EXAMS HUB (WhatsApp Image 2026-09-22 at 17.33.46.jpeg) */}
                  {selectedScreen.id === 'exams-hub' && (
                    <div className="space-y-3.5 text-left">
                      {/* Top Bar */}
                      <div className="flex items-center gap-3 pb-1 text-zinc-200 text-sm font-bold">
                        <span>←</span>
                        <span>Exams Hub</span>
                      </div>

                      {/* Header Banner */}
                      <div className="p-3.5 bg-[#171d2b] border border-zinc-800 rounded-2xl space-y-1">
                        <h4 className="text-xs font-bold text-white">Exams Hub</h4>
                        <p className="text-[10px] text-zinc-400">
                          Tests, scores, and countdown planning in one place.
                        </p>
                      </div>

                      {/* Pill Tabs */}
                      <div className="flex bg-[#171d2b] border border-zinc-800 rounded-xl p-1 gap-1">
                        <button className="flex-1 py-1.5 bg-[#252f44] text-white rounded-lg text-xs font-bold flex items-center justify-center gap-1">
                          ✓ Tests
                        </button>
                        <button className="flex-1 py-1.5 text-zinc-400 rounded-lg text-xs font-medium flex items-center justify-center gap-1">
                          ⏱ Countdown
                        </button>
                      </div>

                      {/* Test Performance Card */}
                      <div className="p-3.5 bg-[#171d2b] border border-zinc-800 rounded-2xl space-y-2.5">
                        <div>
                          <h5 className="text-xs font-bold text-white">Test Performance</h5>
                          <p className="text-[10px] text-zinc-400">
                            Track tests, record scores, and visualize progress in one place.
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-1 font-sans">
                          <div className="p-2.5 bg-[#0f141f] border border-zinc-800/80 rounded-xl space-y-0.5">
                            <span className="text-[10px]">📑</span>
                            <div className="text-sm font-bold text-white">0</div>
                            <div className="text-[9px] text-zinc-400">Total tests</div>
                          </div>
                          <div className="p-2.5 bg-[#0f141f] border border-zinc-800/80 rounded-xl space-y-0.5">
                            <span className="text-[10px]">📈</span>
                            <div className="text-sm font-bold text-white">0</div>
                            <div className="text-[9px] text-zinc-400">Scored tests</div>
                          </div>
                          <div className="p-2.5 bg-[#0f141f] border border-zinc-800/80 rounded-xl space-y-0.5">
                            <span className="text-[10px]">✨</span>
                            <div className="text-sm font-bold text-white">-</div>
                            <div className="text-[9px] text-zinc-400">Avg score</div>
                          </div>
                          <div className="p-2.5 bg-[#0f141f] border border-zinc-800/80 rounded-xl space-y-0.5">
                            <span className="text-[10px]">📅</span>
                            <div className="text-sm font-bold text-white">-</div>
                            <div className="text-[9px] text-zinc-400">Next date</div>
                          </div>
                        </div>
                      </div>

                      {/* Add Test Section */}
                      <div className="space-y-1.5 text-xs">
                        <span className="text-xs font-semibold text-zinc-200 block">Add Test</span>
                        <div className="p-2.5 bg-[#171d2b] border border-zinc-800 rounded-xl text-zinc-400 text-[11px]">
                          Test title
                        </div>
                        <div className="p-2.5 bg-[#171d2b] border border-zinc-800 rounded-xl flex justify-between items-center text-xs">
                          <div>
                            <span className="text-[9px] text-zinc-500 block">Subject</span>
                            <span className="text-white font-medium">Physics</span>
                          </div>
                          <span className="text-zinc-400 text-xs">▼</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Universal Bottom Navigation Bar (Home, SINOVATE, Leaderboard, Settings) */}
                  <div className="flex justify-around items-center pt-2.5 border-t border-zinc-900/80 text-[10px] text-zinc-400">
                    <div className={`flex flex-col items-center gap-0.5 ${selectedScreen.id === 'home-screen' ? 'text-blue-400 font-bold' : ''}`}>
                      <span>🏠</span>
                      <span>Home</span>
                    </div>
                    <div className={`flex flex-col items-center gap-0.5 ${selectedScreen.id === 'ai-tutor-chat' ? 'text-blue-400 font-bold' : ''}`}>
                      <span>💬</span>
                      <span>SINOVATE</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                      <span>📊</span>
                      <span>Leaderboard</span>
                    </div>
                    <div className="flex flex-col items-center gap-0.5">
                      <span>⚙️</span>
                      <span>Settings</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Screen Highlights & Architectural Insights (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Screen Blueprint Card */}
              <div className="p-6 bg-zinc-900/60 border border-zinc-800 space-y-4">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-blue-400 font-bold block">
                      Screen Blueprint & Details
                    </span>
                    <h3 className="text-xl font-black text-white uppercase font-display">
                      {selectedScreen.title} — {selectedScreen.subtitle}
                    </h3>
                  </div>
                  <span className="px-2.5 py-1 bg-zinc-950 border border-zinc-750 text-zinc-300 text-[10px] font-mono uppercase">
                    {selectedScreen.category}
                  </span>
                </div>

                <div className="space-y-3">
                  <span className="text-xs font-bold text-zinc-300 uppercase tracking-wider block font-mono">
                    Key Features & Technical Implementations:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {selectedScreen.highlights.map((h, i) => (
                      <div key={i} className="p-3 bg-zinc-950 border border-zinc-850 text-xs text-zinc-300 flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-zinc-950 border border-zinc-850 space-y-2 font-mono text-xs">
                  <span className="text-zinc-500 uppercase tracking-widest block text-[10px]">
                    State Management & Data Flow
                  </span>
                  <p className="text-zinc-300 font-sans leading-relaxed text-xs">
                    {selectedScreen.mockData.extraDetails}
                  </p>
                </div>
              </div>

              {/* Complete Features Grid */}
              <div className="space-y-3">
                <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold">
                  All 8 Core Application Modules
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SINOVATE_DATA.features.map((feat, idx) => (
                    <div key={idx} className="p-3.5 bg-zinc-900/40 border border-zinc-850 text-left space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-white font-sans">{feat.title}</span>
                        <span className="text-[9px] font-mono text-blue-400 uppercase">{feat.category}</span>
                      </div>
                      <p className="text-[11px] text-zinc-400 leading-relaxed font-sans font-light">
                        {feat.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* TAB 2: EMBEDDED PLAYABLE VIDEO */}
      {activeTab === 'video' && (
        <div className="space-y-6">
          <div className="p-6 bg-zinc-900/60 border border-zinc-800 space-y-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-red-400 font-bold block">
                  Official YouTube Video Walkthrough
                </span>
                <h3 className="text-xl font-bold text-white font-display uppercase">
                  SINOVATE Full Application Walkthrough & Live Demo
                </h3>
              </div>
              <a
                href={SINOVATE_DATA.youtubeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold uppercase tracking-wider flex items-center gap-2 transition shrink-0"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Open on YouTube
              </a>
            </div>

            {/* Embedded Responsive YouTube Iframe Player */}
            <div className="relative w-full aspect-video bg-black border border-zinc-800 shadow-2xl overflow-hidden">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${SINOVATE_DATA.youtubeVideoId}?rel=0&modestbranding=1&enablejsapi=1`}
                title="SINOVATE School Assistant App Demo"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="absolute top-0 left-0 w-full h-full border-0"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-mono text-xs pt-2">
              <div className="p-3 bg-zinc-950 border border-zinc-850">
                <span className="text-zinc-500 uppercase block text-[10px]">Client Framework</span>
                <span className="text-white font-bold">Flutter (Dart) Mobile</span>
              </div>
              <div className="p-3 bg-zinc-950 border border-zinc-850">
                <span className="text-zinc-500 uppercase block text-[10px]">AI Pipeline</span>
                <span className="text-cyan-400 font-bold">LangChain + FAISS + GPT-4o</span>
              </div>
              <div className="p-3 bg-zinc-950 border border-zinc-850">
                <span className="text-zinc-500 uppercase block text-[10px]">Local Persistence</span>
                <span className="text-emerald-400 font-bold">SharedPreferences Offline Cache</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: RAG & AI ARCHITECTURE */}
      {activeTab === 'rag' && (
        <div className="space-y-6">
          <div className="p-6 bg-zinc-900/60 border border-zinc-800 space-y-6 text-left">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold block">
                Technical Blueprint
              </span>
              <h3 className="text-xl font-black text-white uppercase font-display">
                RAG Science Retrieval Pipeline & Offline Architecture
              </h3>
              <p className="text-zinc-400 text-xs font-light mt-1 max-w-2xl leading-relaxed">
                How SINOVATE connects high school textbooks, notes, and exam rubrics to OpenAI GPT-4o using semantic vector embeddings and FAISS index search.
              </p>
            </div>

            {/* RAG Pipeline Steps */}
            <div className="space-y-3">
              {SINOVATE_DATA.ragPipeline.map((step) => (
                <div key={step.step} className="p-4 bg-zinc-950 border border-zinc-850 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-7 h-7 rounded-none bg-purple-500/10 border border-purple-500/30 text-purple-400 font-mono text-xs font-bold flex items-center justify-center shrink-0">
                      0{step.step}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">{step.name}</h4>
                      <p className="text-xs text-zinc-400 font-light mt-0.5">{step.description}</p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-cyan-400 shrink-0 uppercase">
                    {step.tech}
                  </span>
                </div>
              ))}
            </div>

            {/* Architectural Modules Breakdown */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-4 border-t border-zinc-800">
              <div className="p-4 bg-zinc-950 border border-zinc-850 space-y-1">
                <span className="text-[10px] font-mono text-blue-400 uppercase font-bold">Client Layer</span>
                <h5 className="text-xs font-bold text-white">Flutter Cross-Platform</h5>
                <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                  Responsive Material 3 UI with persistent local caching via SharedPreferences and background timer workers.
                </p>
              </div>

              <div className="p-4 bg-zinc-950 border border-zinc-850 space-y-1">
                <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">API Backend</span>
                <h5 className="text-xs font-bold text-white">FastAPI Asynchronous</h5>
                <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                  Non-blocking Python async route handlers streaming responses and handling prompt sanitization.
                </p>
              </div>

              <div className="p-4 bg-zinc-950 border border-zinc-850 space-y-1">
                <span className="text-[10px] font-mono text-purple-400 uppercase font-bold">Cloud Sync</span>
                <h5 className="text-xs font-bold text-white">Google Apps Script</h5>
                <p className="text-[11px] text-zinc-400 font-light leading-relaxed">
                  Webhook endpoints updating global student leaderboard rankings by subject in real-time.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: REPRODUCTION & SETUP */}
      {activeTab === 'reproduction' && (
        <div className="space-y-6">
          <div className="p-6 bg-zinc-900/60 border border-zinc-800 space-y-6 text-left">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
                Deployment & Local Setup
              </span>
              <h3 className="text-xl font-black text-white uppercase font-display">
                Reproduction & Running SINOVATE Locally
              </h3>
              <p className="text-zinc-400 text-xs font-light mt-1 max-w-2xl">
                Commands to boot the FastAPI AI backend and run the Flutter mobile application on an Android/iOS emulator or physical device.
              </p>
            </div>

            {/* FastAPI Backend */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                1. FastAPI Backend Service Setup
              </span>
              <div className="p-4 bg-zinc-950 border border-zinc-800 font-mono text-xs text-zinc-300 space-y-1">
                {SINOVATE_DATA.reproduction.backend.map((cmd, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-zinc-600 select-none">$</span>
                    <span className="text-emerald-300">{cmd}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Flutter Client */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-blue-400 font-bold block">
                2. Flutter Mobile Application Launch
              </span>
              <div className="p-4 bg-zinc-950 border border-zinc-800 font-mono text-xs text-zinc-300 space-y-1">
                {SINOVATE_DATA.reproduction.flutter.map((cmd, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <span className="text-zinc-600 select-none">$</span>
                    <span className="text-blue-300">{cmd}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Environment Variables */}
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold block">
                3. Required Environment Configuration
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 font-mono text-xs">
                {SINOVATE_DATA.reproduction.environment.map((env, i) => (
                  <div key={i} className="p-3 bg-zinc-950 border border-zinc-850 space-y-0.5">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">{env.key}</span>
                      <span className="text-[9px] text-amber-400 uppercase">{env.required ? 'Required' : 'Optional'}</span>
                    </div>
                    <p className="text-[11px] text-zinc-400 font-sans">{env.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
