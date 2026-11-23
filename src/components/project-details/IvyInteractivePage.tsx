import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ArrowLeft, Github, Play, Cpu, Database,
  CheckCircle2, Video, Sparkles, Monitor,
  Radio, Zap
} from 'lucide-react';
import { PROJECTS } from '../../data';
import { fixAssetUrl } from '../../utils/assets';
import { CornerReticles } from './ExhibitPrimitives';

interface IvyInteractivePageProps {
  onBack: () => void;
}

export default function IvyInteractivePage({ onBack }: IvyInteractivePageProps) {
  const [activeTab, setActiveTab] = useState<'video-demo' | 'hardware-stack' | 'live-diagram-sim' | 'vision-agi'>('video-demo');
  const [simQuery, setSimQuery] = useState<'calculus' | 'physics' | 'cs-tree'>('calculus');

  const ivyProject = PROJECTS.find(p => p.id === 'ivy-ai-tutor') || PROJECTS[7];
  const videoEmbedUrl = "https://www.youtube.com/embed/Qoeog1TC1S4";
  const videoShortsUrl = "https://www.youtube.com/shorts/Qoeog1TC1S4";

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-8 px-4 sm:px-6 max-w-6xl mx-auto text-left font-sans selection:bg-purple-500/20">

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
          Hardware Exhibit // ESP32-S3 Edge Companion
        </span>
      </div>

      {/* Architectural Hero Frame */}
      <div className="relative lab-hero border border-zinc-800 p-6 sm:p-9 mb-8 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-purple-400/75 to-transparent" />
        <div className="absolute -top-24 -right-24 w-80 h-80 bg-purple-500/12 rounded-full blur-3xl pointer-events-none" />
        <CornerReticles colorClass="border-purple-400/50" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-3">
              <span className="px-2.5 py-0.5 bg-purple-500/15 text-purple-300 border border-purple-500/30 text-[10px] font-mono font-bold uppercase tracking-wider">
                Physical AI Desk Tutor
              </span>
              <span className="px-2.5 py-0.5 bg-cyan-500/15 text-cyan-300 border border-cyan-500/30 text-[10px] font-mono font-bold uppercase tracking-wider">
                ESP32-S3 (N16R8)
              </span>
              <span className="px-2.5 py-0.5 bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-[10px] font-mono font-bold uppercase tracking-wider">
                Xiaozhi Voice Firmware
              </span>
              <span className="px-2.5 py-0.5 bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[10px] font-mono font-bold uppercase tracking-wider">
                Supabase Backend Engine
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-tight font-display leading-tight">
              IVY — ESP32-S3 Edge AI Desk Tutor
            </h1>
            <p className="text-zinc-300 text-sm sm:text-base mt-2 max-w-3xl font-light leading-relaxed">
              An intelligent physical desk companion and AI tutor built around the ESP32-S3 N16R8 microcontroller running Xiaozhi firmware and powered by a Supabase cloud backend to render interactive diagrams on screen.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2.5 shrink-0">
            <a
              href={ivyProject.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs uppercase tracking-wider font-bold border border-zinc-750 transition-colors"
              id="btn-ivy-github"
            >
              <Github className="w-4 h-4 text-zinc-300" />
              GitHub Profile
            </a>
            <a
              href={videoShortsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs uppercase tracking-wider font-bold transition-colors shadow-[0_0_25px_rgba(168,85,247,0.3)]"
              id="btn-ivy-youtube"
            >
              <Play className="w-4 h-4 fill-current" />
              Watch on YouTube
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-zinc-850 mb-8 pb-3">
        {[
          { id: 'video-demo', label: 'Video Showcase & Overview', icon: Video },
          { id: 'hardware-stack', label: 'Hardware Architecture (ESP32-S3)', icon: Cpu },
          { id: 'live-diagram-sim', label: 'On-Screen Diagram Simulator', icon: Monitor },
          { id: 'vision-agi', label: 'Edge AI Gadgets & AGI Vision', icon: Sparkles }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer border ${
                isActive
                  ? 'bg-zinc-100 text-zinc-950 border-zinc-100 shadow-lg font-black'
                  : 'bg-zinc-905 text-zinc-300 border-zinc-800 hover:text-white hover:border-zinc-600'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {/* TAB CONTENT: Video Showcase */}
        {activeTab === 'video-demo' && (
          <motion.div
            key="video-demo"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

              {/* Left: Embedded Video Player (7 Cols) */}
              <div className="lg:col-span-7 relative lab-surface border border-zinc-800 p-4 sm:p-6 space-y-4 overflow-hidden">
                <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 w-80 h-40 bg-purple-500/15 blur-3xl pointer-events-none" />
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3 relative z-10">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                    <h3 className="text-xs uppercase tracking-[0.25em] text-zinc-200 font-mono font-bold">
                      IVY Physical Hardware Demonstration
                    </h3>
                  </div>
                  <span className="text-[10px] font-mono text-purple-300 font-bold uppercase px-2 py-0.5 bg-purple-500/10 border border-purple-500/30">
                    YouTube Shorts
                  </span>
                </div>

                {/* Responsive Video Container with Sleek Bezel */}
                <div className="relative z-10 aspect-[9/16] max-w-[330px] mx-auto bg-zinc-950 border-[3px] border-zinc-750 ring-1 ring-purple-500/30 shadow-[0_24px_60px_-15px_rgba(0,0,0,0.95)] overflow-hidden rounded-2xl">
                  <iframe
                    src={`${videoEmbedUrl}?autoplay=0&rel=0`}
                    title="IVY — ESP32-S3 AI Desk Tutor Demonstration"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="relative z-10 flex items-center justify-between pt-2 text-xs font-mono text-zinc-400">
                  <span>Direct Link: <a href={videoShortsUrl} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">youtube.com/shorts/Qoeog1TC1S4</a></span>
                  <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Hardware Live</span>
                </div>
              </div>

              {/* Right: Product Photo & Story (5 Cols) */}
              <div className="lg:col-span-5 space-y-6">
                {/* Product Image Card */}
                <div className="lab-surface border border-zinc-800 p-4 space-y-3 group">
                  <div className="aspect-[16/10] bg-zinc-950 overflow-hidden border border-zinc-800 relative">
                    <img
                      src={fixAssetUrl(ivyProject.image)}
                      alt="IVY Desktop AI Tutor"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/60 via-transparent to-transparent pointer-events-none" />
                  </div>
                  <div className="text-xs font-mono text-zinc-400">
                    IVY Hardware Concept: Minimalist matte-black desk companion with high-res graphical display.
                  </div>
                </div>

                {/* Core Highlights */}
                <div className="lab-surface border border-zinc-800 p-6 space-y-4">
                  <h3 className="text-xs uppercase tracking-[0.25em] text-zinc-300 font-mono font-bold">
                    What Makes IVY Unique
                  </h3>

                  <ul className="space-y-3.5 text-xs sm:text-sm text-zinc-300 font-light">
                    <li className="flex items-start gap-2.5 p-2.5 bg-zinc-950/80 border border-zinc-850">
                      <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                      <span><strong className="text-white font-mono">Dedicated Physical Presence:</strong> Sits right on your study desk, eliminating the friction of opening browser tabs or switching away from textbooks.</span>
                    </li>
                    <li className="flex items-start gap-2.5 p-2.5 bg-zinc-950/80 border border-zinc-850">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span><strong className="text-white font-mono">Conversational Xiaozhi Firmware:</strong> Ultra-fast voice wake and speech interaction tailored for rapid Q&A.</span>
                    </li>
                    <li className="flex items-start gap-2.5 p-2.5 bg-zinc-950/80 border border-zinc-850">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span><strong className="text-white font-mono">Supabase Diagram Pipeline:</strong> Fetches and renders step-by-step schematics, formulas, and diagrams directly on the color display.</span>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </motion.div>
        )}

        {/* TAB CONTENT: Hardware Architecture */}
        {activeTab === 'hardware-stack' && (
          <motion.div
            key="hardware-stack"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            <div className="lab-surface border border-zinc-800 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2">
                <Cpu className="w-5 h-5 text-cyan-400" />
                <h3 className="text-xs uppercase tracking-[0.3em] text-zinc-300 font-mono font-bold">
                  ESP32-S3 Hardware & Firmware Pipeline
                </h3>
              </div>
              <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-light">
                IVY is powered by the <strong className="text-white font-semibold">ESP32-S3 (N16R8)</strong>—a dual-core Xtensa 32-bit LX7 microcontroller running at 240 MHz with 16MB Quad SPI Flash and 8MB Octal PSRAM. This hardware footprint provides the necessary memory headroom for buffering speech streams and rendering high-resolution graphics.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="lab-metric border border-zinc-800 border-t-2 border-t-cyan-400/75 p-6 space-y-3">
                <div className="w-9 h-9 bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                  <Cpu className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white font-mono">
                  ESP32-S3 N16R8 Silicon
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed font-light">
                  Dual-core 240 MHz compute with vector instructions specifically accelerating neural network and audio digital signal processing at the edge.
                </p>
              </div>

              <div className="lab-metric border border-zinc-800 border-t-2 border-t-purple-400/75 p-6 space-y-3">
                <div className="w-9 h-9 bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                  <Radio className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white font-mono">
                  Xiaozhi Voice Firmware
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed font-light">
                  Customized open-source voice AI firmware managing microphone I2S input, audio compression, wake word detection, and low-latency audio response playback.
                </p>
              </div>

              <div className="lab-metric border border-zinc-800 border-t-2 border-t-emerald-400/75 p-6 space-y-3">
                <div className="w-9 h-9 bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Database className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white font-mono">
                  Supabase Cloud Backend
                </h4>
                <p className="text-xs text-zinc-300 leading-relaxed font-light">
                  Cloud edge functions that process complex academic queries, generate structured SVG/bitmap diagram payloads, and sync learning history in PostgreSQL.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB CONTENT: Live Diagram Simulator */}
        {activeTab === 'live-diagram-sim' && (
          <motion.div
            key="live-diagram-sim"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            <div className="lab-surface border border-zinc-800 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2">
                <Monitor className="w-5 h-5 text-purple-400" />
                <h3 className="text-xs uppercase tracking-[0.3em] text-zinc-300 font-mono font-bold">
                  Interactive On-Screen Diagram Rendering Simulator
                </h3>
              </div>
              <p className="text-sm text-zinc-300 leading-relaxed font-light">
                Experience how IVY handles spoken academic questions, routes them to the Supabase backend, and renders live diagrams on its color screen.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Query Selector (5 Cols) */}
              <div className="lg:col-span-5 space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold block">
                  Select Student Voice Query
                </span>

                {[
                  {
                    id: 'calculus',
                    title: 'Calculus: Derivative of f(x) = x²',
                    voiceText: '"IVY, show me the geometric meaning of the derivative of x squared at x = 2"',
                    tag: 'Mathematics'
                  },
                  {
                    id: 'physics',
                    title: 'Physics: RLC Series Resonance',
                    voiceText: '"IVY, draw an RLC series circuit diagram and show the impedance resonance curve"',
                    tag: 'Physics'
                  },
                  {
                    id: 'cs-tree',
                    title: 'CS: Binary Search Tree Rotation',
                    voiceText: '"IVY, explain an AVL tree left-rotation with a balanced visual subtree"',
                    tag: 'Computer Science'
                  }
                ].map((q) => {
                  const isSelected = simQuery === q.id;
                  return (
                    <button
                      key={q.id}
                      onClick={() => setSimQuery(q.id as any)}
                      className={`w-full text-left p-4 border transition-all cursor-pointer space-y-2 ${
                        isSelected
                          ? 'bg-zinc-900 border-purple-400 shadow-[0_0_24px_rgba(168,85,247,0.14)] translate-x-1'
                          : 'bg-zinc-905 border-zinc-850 hover:border-zinc-700'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-mono font-bold text-white">{q.title}</span>
                        <span className={`px-2 py-0.5 text-[10px] font-mono uppercase font-bold ${isSelected ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40' : 'bg-zinc-850 text-zinc-300'}`}>
                          {q.tag}
                        </span>
                      </div>
                      <p className="text-xs text-zinc-400 italic">
                        {q.voiceText}
                      </p>
                    </button>
                  );
                })}
              </div>

              {/* Virtual IVY Display Stage (7 Cols) — Matte-Black Hardware Enclosure */}
              <div className="lg:col-span-7 lab-surface border border-zinc-800 p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">
                    Virtual IVY Display Preview (320x240 Color SPI)
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <Zap className="w-3 h-3" /> Supabase Edge Synced
                  </span>
                </div>

                {/* Realistic Matte-Black Hardware Casing */}
                <div className="max-w-[460px] mx-auto bg-gradient-to-b from-zinc-800 via-zinc-900 to-zinc-950 p-4 rounded-2xl border border-zinc-700 shadow-[0_30px_70px_-20px_rgba(0,0,0,0.95)] relative">
                  {/* Top hardware sensor bar */}
                  <div className="flex items-center justify-between px-2 pb-2.5 text-[9px] font-mono text-zinc-400">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399] animate-pulse" />
                      <span className="uppercase tracking-widest text-zinc-300">IVY // HW REV-1</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                      <span className="w-1.5 h-1.5 rounded-full bg-zinc-700" />
                      <span className="w-8 h-1 rounded-full bg-zinc-800 border border-zinc-700" />
                    </div>
                  </div>

                  {/* OLED Color SPI Screen */}
                  <div className="aspect-[4/3] w-full bg-[#060609] border-2 border-zinc-800 rounded-lg p-5 font-mono flex flex-col justify-between shadow-inner relative overflow-hidden">
                    <div className="pointer-events-none absolute inset-0 lab-scanlines opacity-50" />
                    <div className="pointer-events-none absolute -top-12 -left-12 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl" />

                    <div className="absolute top-2.5 right-3 text-[10px] text-zinc-500 z-10">
                      ESP32-S3 // 240MHz
                    </div>

                    <AnimatePresence mode="wait">
                      {simQuery === 'calculus' && (
                        <motion.div
                          key="calculus"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.22 }}
                          className="space-y-3 relative z-10"
                        >
                          <div className="text-xs text-purple-400 font-bold uppercase">
                            Calculus Tutor // Tangent Slope
                          </div>
                          <div className="bg-zinc-900/90 p-2.5 border border-zinc-800 text-xs text-zinc-200">
                            f(x) = x² &nbsp;→&nbsp; f&apos;(x) = 2x<br />
                            At x = 2: &nbsp;Slope m = 2(2) = 4<br />
                            Tangent: y - 4 = 4(x - 2)
                          </div>
                          <svg viewBox="0 0 200 80" className="w-full h-20 fill-none">
                            <line x1="10" y1="70" x2="190" y2="70" stroke="#27272a" strokeWidth="1" />
                            <line x1="20" y1="5" x2="20" y2="75" stroke="#27272a" strokeWidth="1" />
                            <motion.path
                              d="M 20 70 Q 100 65 180 10"
                              stroke="#22d3ee"
                              strokeWidth="2.5"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 0.7 }}
                            />
                            <motion.line
                              x1="60" y1="75" x2="140" y2="15"
                              stroke="#a855f7"
                              strokeWidth="2"
                              strokeDasharray="4,3"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ delay: 0.35 }}
                            />
                            <circle cx="100" cy="45" r="4.5" fill="#10b981" />
                          </svg>
                          <div className="text-[11px] text-zinc-300">
                            ● Point (2, 4) &nbsp;|&nbsp; Instantaneous Rate of Change = 4
                          </div>
                        </motion.div>
                      )}

                      {simQuery === 'physics' && (
                        <motion.div
                          key="physics"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.22 }}
                          className="space-y-3 relative z-10"
                        >
                          <div className="text-xs text-cyan-400 font-bold uppercase">
                            Physics Tutor // RLC Resonance
                          </div>
                          <div className="bg-zinc-900/90 p-2.5 border border-zinc-800 text-xs text-zinc-200">
                            f₀ = 1 / (2π√(LC))<br />
                            At resonance: X_L = X_C → Z = R (Min)
                          </div>
                          <svg viewBox="0 0 200 80" className="w-full h-20 fill-none">
                            <line x1="15" y1="75" x2="185" y2="75" stroke="#27272a" strokeWidth="1" />
                            <motion.path
                              d="M 20 75 Q 70 70 100 15 Q 130 70 180 75"
                              stroke="#34d399"
                              strokeWidth="2.5"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 0.7 }}
                            />
                            <line x1="100" y1="15" x2="100" y2="75" stroke="#ec4899" strokeWidth="1.5" strokeDasharray="3,3" />
                            <circle cx="100" cy="15" r="4" fill="#ec4899" />
                          </svg>
                          <div className="text-[11px] text-zinc-300">
                            Peak Current I_max at f₀ // Phase angle φ = 0°
                          </div>
                        </motion.div>
                      )}

                      {simQuery === 'cs-tree' && (
                        <motion.div
                          key="cs-tree"
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.22 }}
                          className="space-y-3 relative z-10"
                        >
                          <div className="text-xs text-emerald-400 font-bold uppercase">
                            Data Structures // AVL Left Rotation
                          </div>
                          <div className="bg-zinc-900/90 p-2.5 border border-zinc-800 text-xs text-zinc-200">
                            Balance Factor: BF(Root) = -2 (Right Heavy)<br />
                            Single Left Rotation: Right child becomes new Root
                          </div>
                          <div className="text-center text-xs text-zinc-200 py-2">
                            [A] ──Right──&gt; [B] &nbsp;&nbsp;⟹&nbsp;&nbsp; [B]<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[C]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;\<br />
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[A]&nbsp;&nbsp;&nbsp;[C]
                          </div>
                          <div className="text-[11px] text-zinc-300">
                            Restored O(log N) lookup height constraint
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    <div className="relative z-10 pt-2 border-t border-zinc-800 text-[10px] text-zinc-400 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
                        Audio State: Listening
                      </span>
                      <span>Battery: 100% (USB-C 5V)</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* TAB CONTENT: Vision & AGI */}
        {activeTab === 'vision-agi' && (
          <motion.div
            key="vision-agi"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25 }}
            className="space-y-8"
          >
            <div className="lab-surface border border-zinc-800 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-400" />
                <h3 className="text-xs uppercase tracking-[0.3em] text-zinc-300 font-mono font-bold">
                  Ambient AI Hardware & The Road to Everyday AGI
                </h3>
              </div>
              <p className="text-base text-zinc-200 leading-relaxed font-light">
                Building IVY stems from a core belief: Artificial General Intelligence (AGI) won’t just live in massive cloud server rooms. To truly empower human learning and daily productivity, intelligence must be physically embedded into compact, ambient hardware gadgets that live alongside us.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="lab-metric border border-zinc-800 border-t-2 border-t-purple-400/70 p-6 space-y-3">
                <h4 className="text-base font-bold text-white font-mono">
                  1. Beyond the Browser Tab
                </h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                  Today, AI interaction is locked behind browser windows and chat inputs that compete with social media notifications. A dedicated ambient device transforms the relationship: it becomes a focused, single-purpose study companion that responds immediately to voice and displays visual answers without distractions.
                </p>
              </div>

              <div className="lab-metric border border-zinc-800 border-t-2 border-t-cyan-400/70 p-6 space-y-3">
                <h4 className="text-base font-bold text-white font-mono">
                  2. Squeezing Edge Silicon
                </h4>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                  By optimizing memory bandwidth on the ESP32-S3 and pairing it with lightning-fast cloud functions, we can deliver high-level intelligence for a fraction of the cost of running heavyweight localized laptops, making high-end AI tutoring accessible to every student.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
