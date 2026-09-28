import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, Github, ExternalLink, Play, Cpu, Database, 
  Layers, Terminal, CheckCircle2, Video, Sparkles, Monitor, 
  Radio, HardDrive, ShieldCheck, Zap, BookOpen, Compass
} from 'lucide-react';
import { PROJECTS } from '../../data';
import { fixAssetUrl } from '../../utils/assets';

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
      
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-850 pb-6 mb-8">
        <div>
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-300 hover:text-white transition-colors cursor-pointer mb-3"
            id="btn-back-to-portfolio"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects Portfolio
          </button>
          
          <div className="flex flex-wrap items-center gap-2 mb-2">
            <span className="px-2.5 py-0.5 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[10px] font-mono font-bold uppercase tracking-wider">
              Physical AI Desk Tutor
            </span>
            <span className="px-2.5 py-0.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-mono font-bold uppercase tracking-wider">
              ESP32-S3 (N16R8)
            </span>
            <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-bold uppercase tracking-wider">
              Xiaozhi Voice Firmware
            </span>
            <span className="px-2.5 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-mono font-bold uppercase tracking-wider">
              Supabase Backend Engine
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight font-display">
            IVY — ESP32-S3 Edge AI Desk Tutor
          </h1>
          <p className="text-zinc-300 text-sm mt-1 max-w-3xl font-light leading-relaxed">
            An intelligent physical desk companion and AI tutor built around the ESP32-S3 N16R8 microcontroller running Xiaozhi firmware and powered by a Supabase cloud backend to render interactive diagrams on screen.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2.5 shrink-0">
          <a
            href={ivyProject.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-900 hover:bg-zinc-850 text-white font-mono text-xs uppercase tracking-wider font-bold border border-zinc-750 transition-colors"
            id="btn-ivy-github"
          >
            <Github className="w-4 h-4 text-zinc-300" />
            GitHub Profile
          </a>
          <a
            href={videoShortsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-purple-600 hover:bg-purple-500 text-white font-mono text-xs uppercase tracking-wider font-bold transition-colors shadow-lg shadow-purple-900/30"
            id="btn-ivy-youtube"
          >
            <Play className="w-4 h-4 fill-current" />
            Watch on YouTube
          </a>
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
                  ? 'bg-zinc-100 text-zinc-950 border-zinc-100 shadow-md font-black'
                  : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:text-white hover:border-zinc-700'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT: Video Showcase */}
      {activeTab === 'video-demo' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: Embedded Video Player (7 Cols) */}
            <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 p-4 sm:p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
                  <h3 className="text-xs uppercase tracking-[0.25em] text-zinc-300 font-mono font-bold">
                    IVY Physical Hardware Demonstration
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-purple-400 font-bold uppercase">
                  YouTube Shorts
                </span>
              </div>

              {/* Responsive Video Container */}
              <div className="relative aspect-[9/16] max-w-[340px] mx-auto bg-zinc-950 border border-zinc-750 shadow-2xl overflow-hidden rounded-lg">
                <iframe
                  src={`${videoEmbedUrl}?autoplay=0&rel=0`}
                  title="IVY — ESP32-S3 AI Desk Tutor Demonstration"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center justify-between pt-2 text-xs font-mono text-zinc-400">
                <span>Direct Link: <a href={videoShortsUrl} target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:underline">youtube.com/shorts/Qoeog1TC1S4</a></span>
                <span className="text-emerald-400 flex items-center gap-1"><CheckCircle2 className="w-3.5 h-3.5" /> Hardware Live</span>
              </div>
            </div>

            {/* Right: Product Photo & Story (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Product Image Card */}
              <div className="bg-zinc-900 border border-zinc-800 p-4 space-y-3">
                <div className="aspect-[16/10] bg-zinc-950 overflow-hidden border border-zinc-800">
                  <img 
                    src={fixAssetUrl(ivyProject.image)} 
                    alt="IVY Desktop AI Tutor"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="text-xs font-mono text-zinc-400">
                  IVY Hardware Concept: Minimalist matte-black desk companion with high-res graphical display.
                </div>
              </div>

              {/* Core Highlights */}
              <div className="bg-zinc-900 border border-zinc-800 p-6 space-y-4">
                <h3 className="text-xs uppercase tracking-[0.25em] text-zinc-300 font-mono font-bold">
                  What Makes IVY Unique
                </h3>

                <ul className="space-y-3 text-xs sm:text-sm text-zinc-300 font-light">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                    <span><strong className="text-white font-mono">Dedicated Physical Presence:</strong> Sits right on your study desk, eliminating the friction of opening browser tabs or switching away from textbooks.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                    <span><strong className="text-white font-mono">Conversational Xiaozhi Firmware:</strong> Ultra-fast voice wake and speech interaction tailored for rapid Q&A.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span><strong className="text-white font-mono">Supabase Diagram Pipeline:</strong> Fetches and renders step-by-step schematics, formulas, and diagrams directly on the color display.</span>
                  </li>
                </ul>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB CONTENT: Hardware Architecture */}
      {activeTab === 'hardware-stack' && (
        <div className="space-y-8">
          <div className="bg-zinc-900 border border-zinc-800 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2">
              <Cpu className="w-5 h-5 text-cyan-400" />
              <h3 className="text-xs uppercase tracking-[0.3em] text-zinc-300 font-mono font-bold">
                ESP32-S3 Hardware & Firmware Pipeline
              </h3>
            </div>
            <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-light">
              IVY is powered by the **ESP32-S3 (N16R8)**—a dual-core Xtensa 32-bit LX7 microcontroller running at 240 MHz with 16MB Quad SPI Flash and 8MB Octal PSRAM. This hardware footprint provides the necessary memory headroom for buffering speech streams and rendering high-resolution graphics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-zinc-900 border border-zinc-800 p-6 space-y-3">
              <div className="w-8 h-8 bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <Cpu className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white font-mono">
                ESP32-S3 N16R8 Silicon
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed font-light">
                Dual-core 240 MHz compute with vector instructions specifically accelerating neural network and audio digital signal processing at the edge.
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-6 space-y-3">
              <div className="w-8 h-8 bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Radio className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white font-mono">
                Xiaozhi Voice Firmware
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed font-light">
                Customized open-source voice AI firmware managing microphone I2S input, audio compression, wake word detection, and low-latency audio response playback.
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-6 space-y-3">
              <div className="w-8 h-8 bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
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
        </div>
      )}

      {/* TAB CONTENT: Live Diagram Simulator */}
      {activeTab === 'live-diagram-sim' && (
        <div className="space-y-8">
          <div className="bg-zinc-900 border border-zinc-800 p-6 sm:p-8 space-y-4">
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
              ].map((q) => (
                <button
                  key={q.id}
                  onClick={() => setSimQuery(q.id as any)}
                  className={`w-full text-left p-4 border transition-all cursor-pointer space-y-2 ${
                    simQuery === q.id 
                      ? 'bg-zinc-900 border-purple-500 shadow-md' 
                      : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-white">{q.title}</span>
                    <span className="px-2 py-0.5 bg-zinc-800 text-zinc-300 text-[10px] font-mono uppercase font-bold">{q.tag}</span>
                  </div>
                  <p className="text-xs text-zinc-400 italic">
                    {q.voiceText}
                  </p>
                </button>
              ))}
            </div>

            {/* Virtual IVY Display Stage (7 Cols) */}
            <div className="lg:col-span-7 bg-zinc-900 border border-zinc-800 p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <span className="text-xs font-mono uppercase tracking-widest text-purple-400 font-bold">
                  Virtual IVY Display Preview (320x240 Color SPI)
                </span>
                <span className="text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                  <Zap className="w-3 h-3" /> Supabase Edge Synced
                </span>
              </div>

              {/* Simulated Screen Box */}
              <div className="aspect-[4/3] max-w-[420px] mx-auto bg-zinc-950 border-4 border-zinc-800 rounded-lg p-5 font-mono flex flex-col justify-between shadow-2xl relative overflow-hidden">
                <div className="absolute top-2 right-2 text-[10px] text-zinc-400">
                  ESP32-S3 // 240MHz
                </div>

                {simQuery === 'calculus' && (
                  <div className="space-y-3">
                    <div className="text-xs text-purple-400 font-bold uppercase">
                      Calculus Tutor // Tangent Slope
                    </div>
                    <div className="bg-zinc-900 p-2.5 border border-zinc-750 text-xs text-zinc-200">
                      f(x) = x² &nbsp;→&nbsp; f&apos;(x) = 2x<br />
                      At x = 2: &nbsp;Slope m = 2(2) = 4<br />
                      Tangent: y - 4 = 4(x - 2)
                    </div>
                    {/* SVG Curve Plot */}
                    <svg viewBox="0 0 200 80" className="w-full h-20 stroke-cyan-400 fill-none">
                      <path d="M 20 70 Q 100 65 180 10" strokeWidth="2" />
                      <line x1="60" y1="75" x2="140" y2="15" stroke="#a855f7" strokeWidth="2" strokeDasharray="3,3" />
                      <circle cx="100" cy="45" r="4" fill="#10b981" />
                    </svg>
                    <div className="text-[11px] text-zinc-300">
                      ● Point (2, 4) &nbsp;|&nbsp; Instantaneous Rate of Change = 4
                    </div>
                  </div>
                )}

                {simQuery === 'physics' && (
                  <div className="space-y-3">
                    <div className="text-xs text-cyan-400 font-bold uppercase">
                      Physics Tutor // RLC Resonance
                    </div>
                    <div className="bg-zinc-900 p-2.5 border border-zinc-750 text-xs text-zinc-200">
                      f₀ = 1 / (2π√(LC))<br />
                      At resonance: X_L = X_C → Z = R (Min)
                    </div>
                    {/* SVG Bell Curve */}
                    <svg viewBox="0 0 200 80" className="w-full h-20 stroke-emerald-400 fill-none">
                      <path d="M 20 75 Q 70 70 100 15 Q 130 70 180 75" strokeWidth="2" />
                      <line x1="100" y1="15" x2="100" y2="75" stroke="#ec4899" strokeWidth="1.5" strokeDasharray="2,2" />
                      <circle cx="100" cy="15" r="3" fill="#ec4899" />
                    </svg>
                    <div className="text-[11px] text-zinc-300">
                      Peak Current I_max at f₀ // Phase angle φ = 0°
                    </div>
                  </div>
                )}

                {simQuery === 'cs-tree' && (
                  <div className="space-y-3">
                    <div className="text-xs text-emerald-400 font-bold uppercase">
                      Data Structures // AVL Left Rotation
                    </div>
                    <div className="bg-zinc-900 p-2.5 border border-zinc-750 text-xs text-zinc-200">
                      Balance Factor: BF(Root) = -2 (Right Heavy)<br />
                      Single Left Rotation: Right child becomes new Root
                    </div>
                    <div className="text-center text-xs text-zinc-300 py-2">
                      [A] ──Right──&gt; [B] &nbsp;&nbsp;⟹&nbsp;&nbsp; [B]<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[C]&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;/&nbsp;&nbsp;&nbsp;\<br />
                      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[A]&nbsp;&nbsp;&nbsp;[C]
                    </div>
                    <div className="text-[11px] text-zinc-300">
                      Restored O(log N) lookup height constraint
                    </div>
                  </div>
                )}

                <div className="pt-2 border-t border-zinc-800 text-[10px] text-zinc-400 flex items-center justify-between">
                  <span>Audio State: Listening</span>
                  <span>Battery: 100% (USB-C 5V)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Vision & AGI */}
      {activeTab === 'vision-agi' && (
        <div className="space-y-8">
          <div className="bg-zinc-900 border border-zinc-800 p-6 sm:p-8 space-y-4">
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
            <div className="bg-zinc-900 border border-zinc-800 p-6 space-y-3">
              <h4 className="text-base font-bold text-white font-mono">
                1. Beyond the Browser Tab
              </h4>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                Today, AI interaction is locked behind browser windows and chat inputs that compete with social media notifications. A dedicated ambient device transforms the relationship: it becomes a focused, single-purpose study companion that responds immediately to voice and displays visual answers without distractions.
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-6 space-y-3">
              <h4 className="text-base font-bold text-white font-mono">
                2. Squeezing Edge Silicon
              </h4>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                By optimizing memory bandwidth on the ESP32-S3 and pairing it with lightning-fast cloud functions, we can deliver high-level intelligence for a fraction of the cost of running heavyweight localized laptops, making high-end AI tutoring accessible to every student.
              </p>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
