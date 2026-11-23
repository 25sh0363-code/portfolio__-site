import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft, Github, ExternalLink, Play, Smartphone,
  CheckCircle2, Terminal, Network, Maximize2, X, ArrowDown
} from 'lucide-react';
import { SINOVATE_DATA } from '../../data';
import { fixAssetUrl } from '../../utils/assets';
import { CornerReticles, TerminalBlock } from './ExhibitPrimitives';

interface SinovateInteractivePageProps {
  onBack: () => void;
}

export default function SinovateInteractivePage({ onBack }: SinovateInteractivePageProps) {
  const [activeTab, setActiveTab] = useState<'screenshots' | 'video' | 'rag' | 'reproduction'>('screenshots');
  const [selectedScreenId, setSelectedScreenId] = useState<string>('home-screen');
  const [zoomedImage, setZoomedImage] = useState<{ src: string; title: string } | null>(null);

  const selectedScreen = SINOVATE_DATA.screenshots.find(s => s.id === selectedScreenId) || SINOVATE_DATA.screenshots[0];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-8 px-4 sm:px-6 max-w-6xl mx-auto text-left font-sans selection:bg-cyan-500/20">

      {/* Breadcrumb Bar */}
      <div className="flex items-center justify-between pb-4 mb-6 border-b border-zinc-850">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono uppercase tracking-widest text-zinc-300 hover:text-white transition-colors cursor-pointer"
          id="btn-back-to-portfolio"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Projects Portfolio
        </button>
        <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest hidden sm:inline-block">
          Mobile AI Exhibit // Flutter + FastAPI + FAISS
        </span>
      </div>

      {/* Architectural Hero Frame */}
      <div className="relative lab-hero border border-zinc-800 p-6 sm:p-9 mb-8 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-blue-400/75 to-transparent" />
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
        <CornerReticles colorClass="border-blue-400/50" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 bg-blue-500/15 text-blue-300 border border-blue-500/30 text-[10px] font-mono font-bold uppercase tracking-wider">
                Flutter 3.x Client
              </span>
              <span className="px-2.5 py-0.5 bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold uppercase tracking-wider">
                FastAPI + LangChain
              </span>
              <span className="px-2.5 py-0.5 bg-purple-500/15 text-purple-300 border border-purple-500/30 text-[10px] font-mono font-bold uppercase tracking-wider">
                FAISS Vector Store (RAG)
              </span>
              <span className="px-2.5 py-0.5 bg-zinc-900 text-zinc-200 border border-zinc-750 text-[10px] font-mono uppercase tracking-wider">
                OpenAI GPT-4o
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight font-display leading-tight">
              SINOVATE — School Assistant
            </h1>
            <p className="text-zinc-300 text-sm sm:text-base mt-2 max-w-2xl font-light leading-relaxed">
              {SINOVATE_DATA.tagline} An all-in-one cross-platform AI study companion with curriculum-grounded retrieval, exam planning, structured smart notes, and worksheet studio.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2.5 shrink-0">
            <a
              href={SINOVATE_DATA.githubRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs uppercase tracking-wider font-bold border border-zinc-750 transition-colors"
              id="btn-sinovate-github"
            >
              <Github className="w-4 h-4" />
              GitHub Repository
            </a>
            <a
              href={SINOVATE_DATA.youtubeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-red-600/90 hover:bg-red-500 text-white font-mono text-xs uppercase tracking-wider font-bold transition-colors shadow-[0_0_25px_rgba(239,68,68,0.22)]"
              id="btn-sinovate-youtube"
            >
              <Play className="w-4 h-4 fill-current" />
              YouTube Link
            </a>
          </div>
        </div>
      </div>

      {/* Main Feature Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-zinc-850 pb-4 mb-8">
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
              className={`px-4 py-2.5 text-xs font-mono uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center gap-2 border ${
                isActive
                  ? 'bg-zinc-100 text-zinc-950 border-zinc-100 font-black shadow-lg'
                  : 'bg-zinc-905 text-zinc-300 border-zinc-800 hover:text-white hover:border-zinc-600'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {/* TAB 1: ACTUAL APP SCREENSHOTS & UI EXHIBIT */}
        {activeTab === 'screenshots' && (
          <motion.div
            key="screenshots"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            {/* Quick Screen Selector Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {SINOVATE_DATA.screenshots.map((screen) => {
                const isSelected = selectedScreenId === screen.id;
                return (
                  <button
                    key={screen.id}
                    id={`screen-tab-${screen.id}`}
                    onClick={() => setSelectedScreenId(screen.id)}
                    className={`p-3 text-left border transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-zinc-900 border-blue-400/90 ring-1 ring-blue-400/40 text-white shadow-[0_0_20px_rgba(59,130,246,0.14)] -translate-y-0.5'
                        : 'bg-zinc-905 border-zinc-850 hover:border-zinc-700 text-zinc-300'
                    }`}
                  >
                    <span className={`text-[10px] font-mono uppercase tracking-widest block mb-1 ${isSelected ? 'text-blue-400 font-bold' : 'text-zinc-400'}`}>
                      {screen.category}
                    </span>
                    <span className="text-xs font-bold font-sans line-clamp-1 block text-zinc-100">
                      {screen.title}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Interactive Screen Display Stage */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

              {/* Phone Mockup Frame (5 Cols) Rendering Authentic App Screenshots */}
              <div className="lg:col-span-5 flex flex-col items-center relative">
                <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-96 bg-blue-500/12 rounded-full blur-3xl" />

                <div className="w-full max-w-[340px] bg-gradient-to-b from-zinc-700 via-zinc-850 to-zinc-900 p-[3px] rounded-[46px] shadow-[0_32px_80px_-20px_rgba(0,0,0,0.95)] relative group">
                  <div className="bg-[#090c12] rounded-[43px] p-2.5 relative overflow-hidden">
                    {/* Dynamic Island Notch */}
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 w-24 h-5 bg-black rounded-full z-20 flex items-center justify-end pr-2 border border-zinc-800/80 pointer-events-none">
                      <div className="w-2 h-2 rounded-full bg-zinc-800 border border-zinc-700" />
                    </div>

                    {/* Real App Screenshot Image */}
                    <div
                      className="relative rounded-[34px] overflow-hidden bg-zinc-950 border border-zinc-800/80 cursor-pointer"
                      onClick={() => setZoomedImage({
                        src: fixAssetUrl(selectedScreen.imagePath),
                        title: `${selectedScreen.title} — ${selectedScreen.subtitle}`
                      })}
                    >
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={selectedScreen.id}
                          initial={{ opacity: 0, scale: 0.97 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 1.02 }}
                          transition={{ duration: 0.25 }}
                          src={fixAssetUrl(selectedScreen.imagePath)}
                          alt={selectedScreen.title}
                          className="w-full h-auto object-cover rounded-[34px] transition-transform duration-500 group-hover:scale-[1.02]"
                        />
                      </AnimatePresence>

                      {/* Click to Zoom Overlay */}
                      <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1.5 text-white font-mono text-xs font-bold uppercase tracking-wider backdrop-blur-[2px]">
                        <Maximize2 className="w-5 h-5 text-cyan-400" />
                        <span>Click to Zoom</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setZoomedImage({
                    src: fixAssetUrl(selectedScreen.imagePath),
                    title: `${selectedScreen.title} — ${selectedScreen.subtitle}`
                  })}
                  className="mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono text-blue-400 hover:text-blue-300 uppercase font-semibold cursor-pointer transition-colors"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  Open Fullscreen Screenshot
                </button>
              </div>

              {/* Screen Highlights & Architectural Insights (7 Cols) */}
              <div className="lg:col-span-7 space-y-6">

                {/* Screen Blueprint Card */}
                <div className="p-6 lab-surface border border-zinc-800 space-y-4">
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
                        <div key={i} className="p-3 lab-metric border border-zinc-850 text-xs text-zinc-200 flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="p-4 bg-zinc-950 border border-zinc-850 space-y-2 font-mono text-xs">
                    <span className="text-blue-400 uppercase tracking-widest block text-[10px] font-bold">
                      State Management & Data Flow
                    </span>
                    <p className="text-zinc-300 font-sans leading-relaxed text-xs">
                      {selectedScreen.mockData.extraDetails}
                    </p>
                  </div>
                </div>

                {/* Complete Features Grid */}
                <div className="space-y-3">
                  <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-300 font-bold">
                    All 8 Core Application Modules
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {SINOVATE_DATA.features.map((feat, idx) => (
                      <div key={idx} className="p-3.5 lab-metric border border-zinc-850 text-left space-y-1">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-xs font-bold text-white font-sans">{feat.title}</span>
                          <span className="text-[9px] font-mono text-blue-400 uppercase shrink-0">{feat.category}</span>
                        </div>
                        <p className="text-[11px] text-zinc-300 leading-relaxed font-sans font-light">
                          {feat.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>

            </div>

            {/* All 6 App Screenshots Gallery Grid */}
            <div className="pt-6 border-t border-zinc-850 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold block">
                    Complete Visual Gallery
                  </span>
                  <h3 className="text-lg font-black text-white uppercase font-display">
                    SINOVATE App UI Screenshots (6 Views)
                  </h3>
                </div>
                <span className="text-xs font-mono text-zinc-300">
                  Click any screenshot to zoom full screen
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {SINOVATE_DATA.screenshots.map((screen) => (
                  <div
                    key={screen.id}
                    onClick={() => setZoomedImage({
                      src: fixAssetUrl(screen.imagePath),
                      title: `${screen.title} — ${screen.subtitle}`
                    })}
                    className="lab-metric border border-zinc-800 rounded-2xl overflow-hidden p-2 group cursor-pointer hover:border-cyan-400/80 transition-all flex flex-col justify-between"
                  >
                    <div className="relative rounded-xl overflow-hidden bg-black mb-2">
                      <img
                        src={fixAssetUrl(screen.imagePath)}
                        alt={screen.title}
                        className="w-full h-auto object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Maximize2 className="w-4 h-4 text-cyan-400" />
                      </div>
                    </div>
                    <div className="text-left px-1">
                      <span className="text-[9px] font-mono uppercase text-cyan-400 block font-bold">
                        {screen.category}
                      </span>
                      <span className="text-[11px] font-bold text-zinc-200 line-clamp-1 block">
                        {screen.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </motion.div>
        )}

        {/* TAB 2: EMBEDDED PLAYABLE VIDEO */}
        {activeTab === 'video' && (
          <motion.div
            key="video"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <div className="p-6 lab-surface border border-zinc-800 space-y-4">
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
                <div className="p-3.5 lab-metric border border-zinc-850 border-t-2 border-t-blue-400/70">
                  <span className="text-zinc-400 uppercase block text-[10px]">Client Framework</span>
                  <span className="text-white font-bold">Flutter (Dart) Mobile</span>
                </div>
                <div className="p-3.5 lab-metric border border-zinc-850 border-t-2 border-t-cyan-400/70">
                  <span className="text-zinc-400 uppercase block text-[10px]">AI Pipeline</span>
                  <span className="text-cyan-400 font-bold">LangChain + FAISS + GPT-4o</span>
                </div>
                <div className="p-3.5 lab-metric border border-zinc-850 border-t-2 border-t-emerald-400/70">
                  <span className="text-zinc-400 uppercase block text-[10px]">Local Persistence</span>
                  <span className="text-emerald-400 font-bold">SharedPreferences Offline Cache</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 3: RAG & AI ARCHITECTURE */}
        {activeTab === 'rag' && (
          <motion.div
            key="rag"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <div className="p-6 sm:p-8 lab-surface border border-zinc-800 space-y-6 text-left">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-purple-400 font-bold block">
                  Technical Blueprint
                </span>
                <h3 className="text-xl font-black text-white uppercase font-display">
                  RAG Science Retrieval Pipeline & Offline Architecture
                </h3>
                <p className="text-zinc-300 text-xs font-light mt-1 max-w-2xl leading-relaxed">
                  How SINOVATE connects high school textbooks, notes, and exam rubrics to OpenAI GPT-4o using semantic vector embeddings and FAISS index search.
                </p>
              </div>

              {/* Connected RAG Pipeline Flow */}
              <div className="space-y-2">
                {SINOVATE_DATA.ragPipeline.map((step, idx) => (
                  <div key={step.step} className="space-y-2">
                    <div className="p-4 lab-metric border border-zinc-850 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                      <div className="flex items-start gap-3.5">
                        <div className="w-8 h-8 rounded-none bg-purple-500/15 border border-purple-500/40 text-purple-300 font-mono text-xs font-black flex items-center justify-center shrink-0">
                          0{step.step}
                        </div>
                        <div>
                          <h4 className="text-sm font-bold text-white">{step.name}</h4>
                          <p className="text-xs text-zinc-300 font-light mt-0.5">{step.description}</p>
                        </div>
                      </div>
                      <span className="px-2.5 py-1 bg-zinc-950 border border-cyan-500/30 text-[10px] font-mono text-cyan-300 shrink-0 uppercase font-bold">
                        {step.tech}
                      </span>
                    </div>
                    {idx < SINOVATE_DATA.ragPipeline.length - 1 && (
                      <div className="flex justify-start pl-7">
                        <ArrowDown className="w-4 h-4 text-purple-400/60" />
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Architectural Modules Breakdown */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-zinc-800">
                <div className="p-4 lab-metric border border-zinc-850 border-t-2 border-t-blue-400/70 space-y-1">
                  <span className="text-[10px] font-mono text-blue-400 uppercase font-bold">Client Layer</span>
                  <h5 className="text-xs font-bold text-white">Flutter Cross-Platform</h5>
                  <p className="text-[11px] text-zinc-300 font-light leading-relaxed">
                    Responsive Material 3 UI with persistent local caching via SharedPreferences and background timer workers.
                  </p>
                </div>

                <div className="p-4 lab-metric border border-zinc-850 border-t-2 border-t-emerald-400/70 space-y-1">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase font-bold">API Backend</span>
                  <h5 className="text-xs font-bold text-white">FastAPI Asynchronous</h5>
                  <p className="text-[11px] text-zinc-300 font-light leading-relaxed">
                    Non-blocking Python async route handlers streaming responses and handling prompt sanitization.
                  </p>
                </div>

                <div className="p-4 lab-metric border border-zinc-850 border-t-2 border-t-purple-400/70 space-y-1">
                  <span className="text-[10px] font-mono text-purple-400 uppercase font-bold">Cloud Sync</span>
                  <h5 className="text-xs font-bold text-white">Google Apps Script</h5>
                  <p className="text-[11px] text-zinc-300 font-light leading-relaxed">
                    Webhook endpoints updating global student leaderboard rankings by subject in real-time.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB 4: REPRODUCTION & SETUP */}
        {activeTab === 'reproduction' && (
          <motion.div
            key="reproduction"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-6"
          >
            <div className="p-6 sm:p-8 lab-surface border border-zinc-800 space-y-6 text-left">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
                  Deployment & Local Setup
                </span>
                <h3 className="text-xl font-black text-white uppercase font-display">
                  Reproduction & Running SINOVATE Locally
                </h3>
                <p className="text-zinc-300 text-xs font-light mt-1 max-w-2xl">
                  Commands to boot the FastAPI AI backend and run the Flutter mobile application on an Android/iOS emulator or physical device.
                </p>
              </div>

              {/* FastAPI Backend */}
              <TerminalBlock
                title="1. FastAPI Backend Service Setup"
                commands={SINOVATE_DATA.reproduction.backend}
                accentTextClass="text-emerald-300"
              />

              {/* Flutter Client */}
              <TerminalBlock
                title="2. Flutter Mobile Application Launch"
                commands={SINOVATE_DATA.reproduction.flutter}
                accentTextClass="text-blue-300"
              />

              {/* Environment Variables */}
              <div className="space-y-2.5">
                <span className="text-xs font-mono uppercase tracking-wider text-amber-400 font-bold block">
                  3. Required Environment Configuration
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                  {SINOVATE_DATA.reproduction.environment.map((env, i) => (
                    <div key={i} className="p-3.5 lab-metric border border-zinc-850 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">{env.key}</span>
                        <span className="text-[9px] px-1.5 py-0.5 bg-amber-500/10 border border-amber-500/30 text-amber-400 uppercase font-bold">
                          {env.required ? 'Required' : 'Optional'}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-300 font-sans">{env.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Fullscreen Zoom Modal */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomedImage(null)}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <div className="relative max-w-4xl max-h-[90vh] flex flex-col items-center">
              <button
                onClick={() => setZoomedImage(null)}
                className="absolute -top-10 right-0 text-white/70 hover:text-white flex items-center gap-1 font-mono text-xs uppercase cursor-pointer"
              >
                <X className="w-5 h-5" /> Close
              </button>
              <img
                src={zoomedImage.src}
                alt={zoomedImage.title}
                className="max-w-full max-h-[82vh] object-contain rounded-lg border border-zinc-700 shadow-2xl"
              />
              <span className="mt-3 text-sm text-zinc-300 font-mono font-medium text-center">
                {zoomedImage.title}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
