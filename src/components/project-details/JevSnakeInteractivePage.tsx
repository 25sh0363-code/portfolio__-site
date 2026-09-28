import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, ExternalLink, Terminal, Tv, 
  Layers, ShieldAlert, CheckCircle2, Copy, Check, Radio,
  Clock, Play, Activity, Cpu, ArrowUpRight, FileCode, BookOpen, AlertCircle
} from 'lucide-react';
import { JEV_SNAKE_DATA } from '../../data';

interface JevSnakeInteractivePageProps {
  onBack: () => void;
}

export default function JevSnakeInteractivePage({ onBack }: JevSnakeInteractivePageProps) {
  const [activeTab, setActiveTab] = useState<'broadcast' | 'architecture' | 'gamelayer' | 'readme'>('broadcast');
  const [copiedCmd, setCopiedCmd] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [activeTab]);

  const handleCopyQuickStart = () => {
    navigator.clipboard.writeText('python3 -m http.server 8000');
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  return (
    <section className="min-h-screen bg-zinc-950 text-zinc-100 py-8 px-4 sm:px-6 max-w-5xl mx-auto text-left font-mono selection:bg-zinc-800">
      
      {/* Top Breadcrumb & Navigation */}
      <div className="border-b border-zinc-800 pb-6 mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-300 hover:text-white transition-colors cursor-pointer mb-4"
          id="btn-back-to-portfolio"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects Portfolio
        </button>

        {/* Status Strip Badges (From README) */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 bg-red-500/10 text-red-400 border border-red-500/30 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1.5 animate-pulse">
            <Radio className="w-3.5 h-3.5" />
            Video Broadcast On Air
          </span>
          <span className="px-2.5 py-0.5 bg-zinc-900 text-zinc-300 border border-zinc-800 text-[10px] uppercase tracking-wider flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            arcade.html (Single-File Architecture)
          </span>
          <span className="px-2.5 py-0.5 bg-zinc-900 text-zinc-300 border border-zinc-800 text-[10px] uppercase tracking-wider flex items-center gap-1.5">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            OpenRouter System One · jev-latest
          </span>
          <span className="px-2.5 py-0.5 bg-zinc-900 text-zinc-300 border border-zinc-800 text-[10px] uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            Asynchronous Decision Queue
          </span>
        </div>

        {/* Header Title & Direct YouTube Link */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-2 max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase font-display">
              JEV Plays Snake
            </h1>
            <p className="text-sm font-sans text-zinc-300 font-light leading-relaxed">
              A single-page Snake experiment in which JEV selects the next relative turn while the game keeps moving.
            </p>
          </div>

          <a
            href={JEV_SNAKE_DATA.youtubeUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="btn-watch-youtube"
            className="px-5 py-3 bg-red-600 hover:bg-red-500 text-white font-mono text-xs font-bold uppercase tracking-wider transition flex items-center gap-2 w-fit shrink-0 cursor-pointer shadow-lg"
          >
            <Tv className="w-4 h-4" /> Watch on YouTube <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Hero Video Broadcast Stage */}
      <div className="border border-zinc-800 bg-zinc-950 p-4 sm:p-6 mb-8 shadow-2xl relative">
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-zinc-900 text-[10px] uppercase tracking-widest text-zinc-300">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
            <span className="text-red-400 font-bold">PROJECT VIDEO BROADCAST</span>
            <span className="text-zinc-300">|</span>
            <span className="text-zinc-300 font-medium">"I Built a Snake Game… Then Let JEV AI Play It"</span>
          </div>
          <span className="hidden sm:inline text-zinc-300 font-mono">
            YouTube ID: {JEV_SNAKE_DATA.youtubeVideoId}
          </span>
        </div>

        {/* 16:9 Video Player */}
        <div className="relative aspect-video w-full bg-black border border-zinc-900 overflow-hidden shadow-2xl">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${JEV_SNAKE_DATA.youtubeVideoId}?rel=0&modestbranding=1`}
            title="JEV Plays Snake - Om Suraj Kashikar"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>

        {/* Live Observable Decision Metrics Strip (Directly from README) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 pt-4 border-t border-zinc-900 text-left mt-3">
          <div className="p-2.5 bg-zinc-900/60 border border-zinc-850">
            <span className="text-[9px] text-zinc-300 uppercase block font-bold">Grid Dimensions</span>
            <span className="text-xs font-bold text-white mt-0.5 block">25 × 25 Cells</span>
            <span className="text-[9px] text-zinc-300">Fixed Snake board</span>
          </div>
          <div className="p-2.5 bg-zinc-900/60 border border-zinc-850">
            <span className="text-[9px] text-zinc-300 uppercase block font-bold">Snake Tick Clock</span>
            <span className="text-xs font-bold text-emerald-400 mt-0.5 block">sTick = 160 ms</span>
            <span className="text-[9px] text-zinc-300">Configurable in UI</span>
          </div>
          <div className="p-2.5 bg-zinc-900/60 border border-zinc-850">
            <span className="text-[9px] text-zinc-300 uppercase block font-bold">Observed Latency</span>
            <span className="text-xs font-bold text-amber-400 mt-0.5 block">~400 ms</span>
            <span className="text-[9px] text-zinc-300">performance.now() RTT</span>
          </div>
          <div className="p-2.5 bg-zinc-900/60 border border-zinc-850">
            <span className="text-[9px] text-zinc-300 uppercase block font-bold">Decision Queue</span>
            <span className="text-xs font-bold text-cyan-400 mt-0.5 block">QUEUE_TARGET</span>
            <span className="text-[9px] text-zinc-300">Asynchronous buffer</span>
          </div>
          <div className="p-2.5 bg-zinc-900/60 border border-zinc-850">
            <span className="text-[9px] text-zinc-300 uppercase block font-bold">Relative Turns</span>
            <span className="text-xs font-bold text-purple-400 mt-0.5 block">5 Vocabulary</span>
            <span className="text-[9px] text-zinc-300">straight, left, right...</span>
          </div>
          <div className="p-2.5 bg-zinc-900/60 border border-zinc-850">
            <span className="text-[9px] text-zinc-300 uppercase block font-bold">Safety-Net</span>
            <span className="text-xs font-bold text-rose-400 mt-0.5 block">snakePilot()</span>
            <span className="text-[9px] text-zinc-300">Fatal move override</span>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex border-b border-zinc-800 mb-8 gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('broadcast')}
          className={`px-4 py-2.5 text-xs uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center gap-2 border-b-2 -mb-[2px] ${
            activeTab === 'broadcast'
              ? 'border-white text-white bg-zinc-900/50'
              : 'border-transparent text-zinc-300 hover:text-zinc-200 hover:bg-zinc-900/30'
          }`}
        >
          <Tv className="w-3.5 h-3.5 text-red-400" />
          Overview & Quick Start
        </button>

        <button
          onClick={() => setActiveTab('architecture')}
          className={`px-4 py-2.5 text-xs uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center gap-2 border-b-2 -mb-[2px] ${
            activeTab === 'architecture'
              ? 'border-white text-white bg-zinc-900/50'
              : 'border-transparent text-zinc-300 hover:text-zinc-200 hover:bg-zinc-900/30'
          }`}
        >
          <Layers className="w-3.5 h-3.5 text-emerald-400" />
          Single-File Architecture
        </button>

        <button
          onClick={() => setActiveTab('gamelayer')}
          className={`px-4 py-2.5 text-xs uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center gap-2 border-b-2 -mb-[2px] ${
            activeTab === 'gamelayer'
              ? 'border-white text-white bg-zinc-900/50'
              : 'border-transparent text-zinc-300 hover:text-zinc-200 hover:bg-zinc-900/30'
          }`}
        >
          <Activity className="w-3.5 h-3.5 text-cyan-400" />
          Game Layer & AI Latency
        </button>

        <button
          onClick={() => setActiveTab('readme')}
          className={`px-4 py-2.5 text-xs uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center gap-2 border-b-2 -mb-[2px] ${
            activeTab === 'readme'
              ? 'border-white text-white bg-zinc-900/50'
              : 'border-transparent text-zinc-300 hover:text-zinc-200 hover:bg-zinc-900/30'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5 text-amber-400" />
          Verbatim README
        </button>
      </div>

      {/* TAB 1: OVERVIEW & QUICK START */}
      {activeTab === 'broadcast' && (
        <div className="space-y-8 text-left">
          
          {/* Quick Start Card (From README) */}
          <div className="border border-zinc-800 bg-zinc-950 p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-900">
              <span className="text-[10px] uppercase tracking-widest text-zinc-300 font-bold block">
                Quick Start Instructions
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2 py-0.5">
                Zero Dependencies
              </span>
            </div>

            <p className="text-xs text-zinc-300 font-sans font-light leading-relaxed">
              The project has no build system, package manager, or runtime dependency. You run it using Python's built-in HTTP server:
            </p>

            <div className="p-4 bg-black border border-zinc-800 flex items-center justify-between gap-4 font-mono text-xs">
              <code className="text-emerald-400">python3 -m http.server 8000</code>
              <button
                onClick={handleCopyQuickStart}
                className="px-3 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-[10px] uppercase font-bold flex items-center gap-1.5 transition cursor-pointer"
              >
                {copiedCmd ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                {copiedCmd ? 'Copied' : 'Copy Command'}
              </button>
            </div>

            <p className="text-xs text-zinc-300 font-sans font-light leading-relaxed">
              Open <code className="text-zinc-200 bg-zinc-900 px-1.5 py-0.5 border border-zinc-800">http://localhost:8000/arcade.html</code>, select a brain, and press <strong>START ARCADE</strong>. The local autopilot needs no API key. Stop the server with <code className="text-zinc-200 bg-zinc-900 px-1 py-0.5">Ctrl-C</code>.
            </p>
          </div>

          {/* Observable Loop Telemetry Explanation */}
          <div className="border border-zinc-800 bg-zinc-950 p-6 sm:p-8 space-y-4">
            <span className="text-[10px] uppercase tracking-widest text-zinc-300 font-bold block">
              What the Page Makes Observable
            </span>
            <h3 className="text-xl font-bold uppercase text-white font-display">
              Inspecting the AI Decision Loop
            </h3>
            <p className="text-xs text-zinc-300 font-sans font-light leading-relaxed">
              {JEV_SNAKE_DATA.overview}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-4 border-t border-zinc-900 text-xs">
              <div className="p-3 bg-zinc-900/40 border border-zinc-850 space-y-1">
                <span className="text-white font-bold block">1. Model Choice & Probs</span>
                <p className="text-zinc-300 font-sans font-light text-[11px]">
                  Visual probability distribution bars for each relative movement option.
                </p>
              </div>
              <div className="p-3 bg-zinc-900/40 border border-zinc-850 space-y-1">
                <span className="text-white font-bold block">2. Request Latency</span>
                <p className="text-zinc-300 font-sans font-light text-[11px]">
                  Real-time round-trip latency measured via <code className="text-zinc-300">performance.now()</code>.
                </p>
              </div>
              <div className="p-3 bg-zinc-900/40 border border-zinc-850 space-y-1">
                <span className="text-white font-bold block">3. Pilot Recommendation</span>
                <p className="text-zinc-300 font-sans font-light text-[11px]">
                  Local BFS algorithm recommendation displayed alongside remote brain choices.
                </p>
              </div>
              <div className="p-3 bg-zinc-900/40 border border-zinc-850 space-y-1">
                <span className="text-white font-bold block">4. Score & Deaths</span>
                <p className="text-zinc-300 font-sans font-light text-[11px]">
                  Increments score upon eating food; resets run and tallies deaths upon collision.
                </p>
              </div>
              <div className="p-3 bg-zinc-900/40 border border-zinc-850 space-y-1">
                <span className="text-white font-bold block">5. Safety-Net Interventions</span>
                <p className="text-zinc-300 font-sans font-light text-[11px]">
                  Overrides fatal remote answers immediately before execution with the pilot's safest move.
                </p>
              </div>
              <div className="p-3 bg-zinc-900/40 border border-zinc-850 space-y-1">
                <span className="text-white font-bold block">6. Decision Queue Depth</span>
                <p className="text-zinc-300 font-sans font-light text-[11px]">
                  Maintains target buffer of planned moves so gameplay never stutters during network fetches.
                </p>
              </div>
            </div>
          </div>

          {/* Technology Stack Grid (Verbatim from README) */}
          <div className="border border-zinc-800 bg-zinc-950 p-6 sm:p-8 space-y-4">
            <span className="text-[10px] uppercase tracking-widest text-zinc-300 font-bold block">
              Technology Stack
            </span>
            <h3 className="text-xl font-bold uppercase text-white font-display">
              Zero Build Systems or Third-Party Packages
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
              {JEV_SNAKE_DATA.techStackDetailed.map((item, idx) => (
                <div key={idx} className="p-4 bg-zinc-900/30 border border-zinc-850 space-y-1 text-xs">
                  <span className="font-bold text-white block font-mono text-xs">{item.technology}</span>
                  <p className="text-zinc-300 font-sans font-light leading-relaxed text-[11px]">
                    {item.role}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 2: ARCHITECTURE & BRAINS */}
      {activeTab === 'architecture' && (
        <div className="space-y-8 text-left">
          
          {/* Architecture Pipeline Box */}
          <div className="border border-zinc-800 bg-zinc-950 p-6 sm:p-8 space-y-4">
            <span className="text-[10px] uppercase tracking-widest text-zinc-300 font-bold block">
              Architecture Overview
            </span>
            <h3 className="text-xl font-bold uppercase text-white font-display">
              Everything Contained in arcade.html
            </h3>
            
            <div className="p-4 bg-black border border-zinc-800 font-mono text-xs text-emerald-400 leading-relaxed overflow-x-auto">
              <pre>{`Browser UI
  -> brainAsk()
       -> Local autopilot: snakePilot()
       -> JEV: OpenRouter System One / jev-latest
       -> Chat mode: OpenRouter chat completions / selected model
  -> normalized relative turn
  -> queued decision
  -> safety validation
  -> Snake tick and Canvas render`}</pre>
            </div>

            <div className="space-y-3 pt-4 border-t border-zinc-900">
              <h4 className="text-xs uppercase tracking-wider font-bold text-white">Execution Steps:</h4>
              <div className="space-y-2">
                {JEV_SNAKE_DATA.architectureFlow.map((step, idx) => (
                  <div key={idx} className="p-3 bg-zinc-900/40 border border-zinc-850 flex items-start gap-3 text-xs">
                    <span className="px-2 py-0.5 bg-zinc-800 text-zinc-300 font-mono text-[10px] shrink-0 font-bold">
                      {step.step}
                    </span>
                    <span className="text-zinc-300 font-sans font-light">
                      {step.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Three Brain Modes */}
          <div className="border border-zinc-800 bg-zinc-950 p-6 sm:p-8 space-y-4">
            <span className="text-[10px] uppercase tracking-widest text-zinc-300 font-bold block">
              JEV & Model Sources
            </span>
            <h3 className="text-xl font-bold uppercase text-white font-display">
              The 3 Available Brain Modes
            </h3>

            <div className="grid grid-cols-1 gap-4 pt-2">
              {JEV_SNAKE_DATA.brains.map((brain, idx) => (
                <div key={idx} className="p-5 bg-zinc-900/30 border border-zinc-850 space-y-2 text-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pb-2 border-b border-zinc-850">
                    <span className="font-bold text-white font-mono text-sm">{brain.name}</span>
                    <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 w-fit">
                      {brain.modeType}
                    </span>
                  </div>
                  <div className="text-[10px] text-zinc-300 font-mono">
                    Endpoint: <code className="text-zinc-300 bg-zinc-900 px-1 py-0.5 border border-zinc-800">{brain.endpoint}</code>
                  </div>
                  <p className="text-zinc-300 font-sans font-light leading-relaxed text-xs">
                    {brain.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Deterministic Pilot & Safety Net */}
          <div className="border border-zinc-800 bg-zinc-950 p-6 sm:p-8 space-y-4">
            <span className="text-[10px] uppercase tracking-widest text-zinc-300 font-bold block">
              Deterministic Pilot & Safety Net
            </span>
            <h3 className="text-xl font-bold uppercase text-white font-display">
              {JEV_SNAKE_DATA.deterministicPilot.functionName}
            </h3>
            <p className="text-xs text-zinc-300 font-sans font-light leading-relaxed">
              `snakePilot()` is the local planning and safety layer. It evaluates candidate moves using:
            </p>

            <ul className="space-y-1.5 pl-4 text-xs font-sans text-zinc-300 list-disc">
              {JEV_SNAKE_DATA.deterministicPilot.features.map((feat, idx) => (
                <li key={idx} className="font-light">{feat}</li>
              ))}
            </ul>

            <div className="p-4 bg-zinc-900/50 border border-zinc-800 space-y-1.5 mt-4">
              <span className="text-[10px] font-mono uppercase text-rose-400 font-bold block">
                Safety-Net Interventions
              </span>
              <p className="text-xs text-zinc-300 font-sans font-light leading-relaxed">
                {JEV_SNAKE_DATA.deterministicPilot.safetyNet}
              </p>
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: GAME LAYER & AI LATENCY */}
      {activeTab === 'gamelayer' && (
        <div className="space-y-8 text-left">
          
          {/* Game Layer Rules */}
          <div className="border border-zinc-800 bg-zinc-950 p-6 sm:p-8 space-y-4">
            <span className="text-[10px] uppercase tracking-widest text-zinc-300 font-bold block">
              Game Layer Mechanics
            </span>
            <h3 className="text-xl font-bold uppercase text-white font-display">
              25 × 25 Discrete Grid
            </h3>
            <p className="text-xs text-zinc-300 font-sans font-light leading-relaxed">
              {JEV_SNAKE_DATA.gameLayer.description}
            </p>

            <div className="space-y-2 pt-3 border-t border-zinc-900">
              <span className="text-xs text-zinc-300 uppercase font-bold block">
                Relative Decision Vocabulary (Relative to Heading):
              </span>
              <div className="flex flex-wrap gap-2">
                {JEV_SNAKE_DATA.gameLayer.relativeVocabulary.map((vocab, idx) => (
                  <span 
                    key={idx} 
                    className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-xs font-mono text-emerald-400"
                  >
                    <code>{vocab}</code>
                  </span>
                ))}
              </div>
              <p className="text-[11px] text-zinc-300 font-sans pt-1">
                Note: <code className="text-zinc-300">uturn_left</code> and <code className="text-zinc-300">uturn_right</code> reverse direction and are normally fatal because the neck occupies the destination cell.
              </p>
            </div>
          </div>

          {/* AI Latency & Queue Strategy */}
          <div className="border border-zinc-800 bg-zinc-950 p-6 sm:p-8 space-y-4">
            <span className="text-[10px] uppercase tracking-widest text-zinc-300 font-bold block">
              AI Latency & Queue Decoupling
            </span>
            <h3 className="text-xl font-bold uppercase text-white font-display">
              Why 400ms Remote Requests Don't Freeze a 160ms Clock
            </h3>

            <div className="p-4 bg-black border border-zinc-800 font-mono text-xs text-zinc-300 space-y-2">
              <span className="text-[10px] text-zinc-300 block">// Measured in brainAsk() with performance.now():</span>
              <code className="text-emerald-400 block">{`const t0 = performance.now();
// request and response parsing
return { ...result, latency: Math.round(performance.now() - t0) };`}</code>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
              <div className="p-4 bg-zinc-900/40 border border-zinc-850 space-y-1.5 text-xs">
                <span className="text-white font-bold block">Empirical Round-Trip Latency</span>
                <p className="text-zinc-300 font-sans font-light leading-relaxed text-[11px]">
                  {JEV_SNAKE_DATA.latencyAnalysis.observedRoundTrip}: includes browser request overhead, network time, OpenRouter routing, model execution, and response parsing.
                </p>
              </div>

              <div className="p-4 bg-zinc-900/40 border border-zinc-850 space-y-1.5 text-xs">
                <span className="text-white font-bold block">The Decision Queue Buffer</span>
                <p className="text-zinc-300 font-sans font-light leading-relaxed text-[11px]">
                  {JEV_SNAKE_DATA.latencyAnalysis.queueStrategy}
                </p>
              </div>
            </div>

            <div className="p-3 bg-zinc-900/20 border border-zinc-800 text-[11px] text-zinc-300 font-mono">
              Timeouts: 8 seconds for JEV System One, 9 seconds for chat mode. Errors are recorded in the event log and shown in the status line.
            </div>
          </div>

          {/* Configuration & Files */}
          <div className="border border-zinc-800 bg-zinc-950 p-6 sm:p-8 space-y-4">
            <span className="text-[10px] uppercase tracking-widest text-zinc-300 font-bold block">
              Files & Runtime Configuration
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              {JEV_SNAKE_DATA.files.map((file, idx) => (
                <div key={idx} className="p-4 bg-zinc-900/40 border border-zinc-850 space-y-1">
                  <span className="font-bold text-emerald-400 font-mono block">{file.name}</span>
                  <p className="text-zinc-300 font-sans font-light text-[11px]">
                    {file.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      {/* TAB 4: VERBATIM README */}
      {activeTab === 'readme' && (
        <div className="border border-zinc-800 bg-zinc-950 p-6 sm:p-8 space-y-6 text-left font-mono">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-900">
            <span className="text-[10px] uppercase tracking-widest text-zinc-300 font-bold block">
              Project Documentation
            </span>
            <span className="text-[10px] text-zinc-300 bg-zinc-900 border border-zinc-800 px-2 py-0.5">
              README.md
            </span>
          </div>

          <div className="space-y-6 text-xs text-zinc-300 leading-relaxed font-sans font-light">
            <div>
              <h2 className="text-xl font-bold font-mono text-white mb-2"># JEV Plays Snake</h2>
              <p>
                A single-page Snake experiment in which JEV selects the next relative turn while the game keeps moving. The page makes the decision loop observable: it shows the model's choice, probabilities, confidence, request latency, pilot recommendation, score, deaths, and safety-net interventions.
              </p>
            </div>

            <div className="border-t border-zinc-900 pt-4">
              <h3 className="text-sm font-bold font-mono text-white uppercase mb-2">## Quick Start</h3>
              <p className="mb-2">The project has no build system, package manager, or runtime dependency.</p>
              <pre className="p-3 bg-black border border-zinc-800 font-mono text-xs text-emerald-400 mb-2">python3 -m http.server 8000</pre>
              <p>
                Open <code className="text-zinc-200 bg-zinc-900 px-1 py-0.5">http://localhost:8000/arcade.html</code>, select a brain, and press <strong>START ARCADE</strong>. The local autopilot needs no API key. Stop the server with <code className="text-zinc-200 bg-zinc-900 px-1 py-0.5">Ctrl-C</code>.
              </p>
            </div>

            <div className="border-t border-zinc-900 pt-4">
              <h3 className="text-sm font-bold font-mono text-white uppercase mb-2">## Technology Stack</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>HTML5:</strong> page structure, controls, modal configuration, and statistics panel.</li>
                <li><strong>CSS3:</strong> the dark terminal-style interface, layout, status colors, and probability bars.</li>
                <li><strong>Vanilla JavaScript:</strong> game state, decision orchestration, API requests, normalization, and safety checks. There are no frontend frameworks or third-party JavaScript packages.</li>
                <li><strong>HTML Canvas 2D:</strong> renders the 25 x 25 Snake board, grid, food, body, and interpolation between ticks.</li>
                <li><strong>Browser Fetch API:</strong> sends decision requests directly from the browser to OpenRouter.</li>
                <li><strong>requestAnimationFrame and timers:</strong> animation rendering runs separately from the fixed Snake tick clock, while asynchronous brain requests refill the decision queue.</li>
              </ul>
            </div>

            <div className="border-t border-zinc-900 pt-4">
              <h3 className="text-sm font-bold font-mono text-white uppercase mb-2">## Architecture</h3>
              <p className="mb-2">Everything is intentionally contained in <code className="text-zinc-200 bg-zinc-900 px-1 py-0.5">arcade.html</code>:</p>
              <pre className="p-3 bg-black border border-zinc-800 font-mono text-xs text-emerald-400 mb-2">{`Browser UI
  -> brainAsk()
       -> Local autopilot: snakePilot()
       -> JEV: OpenRouter System One / jev-latest
       -> Chat mode: OpenRouter chat completions / selected model
  -> normalized relative turn
  -> queued decision
  -> safety validation
  -> Snake tick and Canvas render`}</pre>
            </div>

            <div className="border-t border-zinc-900 pt-4">
              <h3 className="text-sm font-bold font-mono text-white uppercase mb-2">## AI Latency</h3>
              <p>
                The UI reports latency for each remote decision. It is measured in <code className="text-zinc-200 bg-zinc-900 px-1 py-0.5">brainAsk()</code> with <code className="text-zinc-200 bg-zinc-900 px-1 py-0.5">performance.now()</code> from immediately before the request or local decision until the result is normalized.
              </p>
              <p className="mt-2">
                For the current JEV setup, observed response latency is approximately <strong>400 ms</strong> in a typical run. That is an empirical round-trip figure, not a guaranteed model speed: it includes browser request overhead, network time, OpenRouter routing, model execution, and response parsing. The queue is intentionally maintained ahead of the live Snake state. Consequently, the game can continue ticking while the next JEV answer is being computed.
              </p>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
