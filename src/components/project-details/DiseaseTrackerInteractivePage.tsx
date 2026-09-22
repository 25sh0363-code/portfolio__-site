import { useState } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, Github, ExternalLink, Activity, Sparkles, TrendingUp, 
  Bot, ShieldAlert, Newspaper, Mic, Volume2, Globe2, Terminal, 
  CheckCircle2, Flame, Layers, Database, Code2, HeartPulse, Zap,
  BookOpen, ChevronRight, Cpu
} from 'lucide-react';
import { GLOBAL_DISEASE_TRACKER_DATA } from '../../data';

interface DiseaseTrackerInteractivePageProps {
  onBack: () => void;
}

export default function DiseaseTrackerInteractivePage({ onBack }: DiseaseTrackerInteractivePageProps) {
  const [selectedHighlight, setSelectedHighlight] = useState<number>(0);

  const funHighlights = [
    {
      title: "156,000+ Data Points Across 25 Years",
      badge: "The Data Vault",
      icon: Database,
      tagline: "A quarter-century of global epidemiology in 60 CSV files.",
      narrative: "Instead of calling slow, rate-limited APIs, the project curates 60 structured CSV datasets spanning from 2000 to 2025 across 10 major nations (India, USA, China, Japan, Germany, France, Canada, Russia, Australia, South Korea). It tracks 6 critical health conditions: COVID-19, Diabetes, Tuberculosis, HIV/AIDS, Colon Cancer, and Alzheimer's.",
      funFact: "Every single country-disease pair has its own dedicated history file in content/history/ covering clinical epidemiology and local public health responses!"
    },
    {
      title: "Polynomial Regression ML Forecaster",
      badge: "The Math Engine",
      icon: TrendingUp,
      tagline: "Predicting future transmission 30 to 180 days ahead.",
      narrative: "Linear regression fails when diseases come in waves. Global Disease Tracker Pro uses scikit-learn Polynomial Regression (degrees 2 & 3) to capture non-linear curves, infection peaks, and seasonal waves. It calculates R² accuracy scores (consistently 70%+) and applies 7-day rolling moving averages to eliminate weekend reporting noise.",
      funFact: "The model runs directly in Python via Pandas & scikit-learn and updates dynamically in under 200 milliseconds when you slide the forecast horizon."
    },
    {
      title: "AI Health Assistant & Voice Integration",
      badge: "Gemini + gTTS",
      icon: Bot,
      tagline: "Speak your symptoms or ask complex epidemiological questions.",
      narrative: "Powered by Google Gemini 2.0 with a smart fallback pattern-matching engine supporting 9 distinct response types. You can ask natural questions like 'How many COVID cases in India in 2021?' or 'What are the first signs of diabetes?', and hear the answer spoken aloud using Google Text-to-Speech (gTTS).",
      funFact: "Includes voice recognition using SpeechRecognition, letting users search diseases and countries completely hands-free."
    },
    {
      title: "Multi-Factor Clinical Risk Calculator",
      badge: "Personalized Insights",
      icon: ShieldAlert,
      tagline: "Stratifying personal risk with 5 clinical dimensions.",
      narrative: "The Risk Calculator isn't just a random quiz — it cross-references user age, geographic location, reported acute symptoms, vaccination history, and existing comorbidities against the historical epidemiological baseline of that specific country.",
      funFact: "Provides instant color-coded risk tiers (Low, Moderate, High) alongside actionable, evidence-based medical recommendations."
    },
    {
      title: "Live Google News RSS Aggregator",
      badge: "Real-Time Pulse",
      icon: Newspaper,
      tagline: "Breaking medical updates right inside the dashboard.",
      narrative: "Uses Python's feedparser to stream real-time Google News RSS articles filtered by country and disease, delivering the top 5 most relevant medical headlines with direct source links.",
      funFact: "Keeps public health analysts updated on new WHO guidelines, clinical trials, and breakthrough treatments without leaving Streamlit."
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-8 px-4 sm:px-6 max-w-5xl mx-auto text-left font-sans selection:bg-rose-500/20">
      
      {/* Top Breadcrumb & Navigation */}
      <div className="border-b border-zinc-850 pb-6 mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-400 hover:text-white transition-colors cursor-pointer mb-4"
          id="btn-back-to-portfolio"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects Portfolio
        </button>

        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 bg-rose-500/10 text-rose-400 border border-rose-500/20 text-[10px] font-mono font-bold uppercase tracking-wider">
            Streamlit App
          </span>
          <span className="px-2.5 py-0.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-mono font-bold uppercase tracking-wider">
            Machine Learning (Polynomial Reg)
          </span>
          <span className="px-2.5 py-0.5 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[10px] font-mono font-bold uppercase tracking-wider">
            Google Gemini 2.0 AI
          </span>
          <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-bold uppercase tracking-wider">
            Plotly Visualizations
          </span>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase font-display flex items-center gap-3">
              <span>Global Disease Tracker Pro</span>
              <span className="text-xs px-2.5 py-1 bg-rose-600/20 border border-rose-500/30 text-rose-300 font-mono font-bold rounded-full">
                v3.0
              </span>
            </h1>
            <p className="text-zinc-400 text-sm mt-2 max-w-2xl font-light leading-relaxed">
              An intelligent, interactive public health platform that turns 25 years of complex epidemiological data into clear forecasts, interactive charts, and voice-assisted AI insights.
            </p>
          </div>

          <a
            href={GLOBAL_DISEASE_TRACKER_DATA.githubRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-900 hover:bg-zinc-850 text-white font-mono text-xs uppercase tracking-wider font-bold border border-zinc-750 transition-colors shrink-0"
            id="btn-disease-tracker-github"
          >
            <Github className="w-4 h-4" />
            View on GitHub
          </a>
        </div>
      </div>

      {/* 4 Big Numbers Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10 font-mono">
        <div className="p-4 bg-zinc-900/60 border border-zinc-800 space-y-1">
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">Time Horizon</span>
          <span className="text-2xl font-black text-rose-400">25 Years</span>
          <span className="text-[10px] text-zinc-400 block font-sans">2000 to 2025 Historicals</span>
        </div>

        <div className="p-4 bg-zinc-900/60 border border-zinc-800 space-y-1">
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">Global Footprint</span>
          <span className="text-2xl font-black text-cyan-400">10 Nations</span>
          <span className="text-[10px] text-zinc-400 block font-sans">Across 6 Major Diseases</span>
        </div>

        <div className="p-4 bg-zinc-900/60 border border-zinc-800 space-y-1">
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">Dataset Size</span>
          <span className="text-2xl font-black text-purple-400">156k+</span>
          <span className="text-[10px] text-zinc-400 block font-sans">60 Clean CSV Datasets</span>
        </div>

        <div className="p-4 bg-zinc-900/60 border border-zinc-800 space-y-1">
          <span className="text-[10px] text-zinc-500 uppercase tracking-widest block">ML Forecasts</span>
          <span className="text-2xl font-black text-emerald-400">70%+ R²</span>
          <span className="text-[10px] text-zinc-400 block font-sans">30 to 180-Day Predictions</span>
        </div>
      </div>

      {/* The Story & Highlights Selector */}
      <div className="space-y-6 mb-12">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-rose-400 font-bold block">
              Feature Deep-Dive & Architecture Story
            </span>
            <h2 className="text-xl font-bold text-white font-display uppercase">
              What Makes Global Disease Tracker Pro Special?
            </h2>
          </div>
          <span className="text-xs font-mono text-zinc-400">Click a feature below to explore</span>
        </div>

        {/* Feature Pills */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {funHighlights.map((item, idx) => {
            const Icon = item.icon;
            const isSelected = selectedHighlight === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedHighlight(idx)}
                className={`p-3 text-left border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-zinc-900 border-rose-500/80 ring-1 ring-rose-500/40 text-white'
                    : 'bg-zinc-950 border-zinc-850 hover:border-zinc-700 text-zinc-400'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <Icon className={`w-4 h-4 ${isSelected ? 'text-rose-400' : 'text-zinc-500'}`} />
                  <span className="text-[9px] font-mono text-zinc-500">0{idx + 1}</span>
                </div>
                <span className="text-xs font-bold font-sans line-clamp-2">
                  {item.badge}
                </span>
              </button>
            );
          })}
        </div>

        {/* Selected Highlight Expanded Card */}
        {(() => {
          const current = funHighlights[selectedHighlight];
          const Icon = current.icon;
          return (
            <div className="p-6 bg-zinc-900/60 border border-zinc-800 space-y-4 text-left">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center font-bold">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-rose-400 font-bold block">
                      {current.badge}
                    </span>
                    <h3 className="text-lg font-bold text-white font-display">
                      {current.title}
                    </h3>
                  </div>
                </div>
                <span className="text-xs font-mono text-zinc-400 italic">
                  "{current.tagline}"
                </span>
              </div>

              <p className="text-zinc-300 text-sm font-light leading-relaxed">
                {current.narrative}
              </p>

              <div className="p-3.5 bg-zinc-950 border border-zinc-800 flex items-start gap-3 text-xs">
                <span className="text-amber-400 text-base">💡</span>
                <div>
                  <strong className="text-white font-mono uppercase text-[10px] block mb-0.5">Behind The Scenes:</strong>
                  <p className="text-zinc-400 font-light leading-relaxed">{current.funFact}</p>
                </div>
              </div>
            </div>
          );
        })()}
      </div>

      {/* Scope Matrix: 6 Diseases × 10 Countries */}
      <div className="p-6 bg-zinc-900/60 border border-zinc-800 space-y-5 mb-12">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold block">
              Curated Epidemiological Scope
            </span>
            <h3 className="text-lg font-bold text-white font-display uppercase">
              Diseases & Global Coverage
            </h3>
          </div>
          <span className="text-xs font-mono text-zinc-400">60 Unique CSV Datasets</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-4 bg-zinc-950 border border-zinc-850 space-y-2">
            <span className="text-xs font-mono uppercase text-rose-400 font-bold block">
              🦠 6 Tracked Diseases
            </span>
            <div className="flex flex-wrap gap-1.5">
              {GLOBAL_DISEASE_TRACKER_DATA.diseases.map((d, i) => (
                <span key={i} className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 font-medium">
                  {d}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-zinc-400 font-light pt-1 leading-relaxed">
              Spans viral pandemics (COVID-19), infectious respiratory diseases (Tuberculosis), chronic metabolic conditions (Diabetes), immunology (HIV/AIDS), oncology (Colon Cancer), and neurodegenerative disorders (Alzheimer's).
            </p>
          </div>

          <div className="p-4 bg-zinc-950 border border-zinc-850 space-y-2">
            <span className="text-xs font-mono uppercase text-cyan-400 font-bold block">
              🌍 10 Partner Nations
            </span>
            <div className="flex flex-wrap gap-1.5">
              {GLOBAL_DISEASE_TRACKER_DATA.countries.map((c, i) => (
                <span key={i} className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 font-medium">
                  {c}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-zinc-400 font-light pt-1 leading-relaxed">
              Covers diverse geographic regions across North America, Europe, Asia, and Oceania with varied healthcare systems and diagnostic reporting densities.
            </p>
          </div>
        </div>
      </div>

      {/* Tech Stack & Running the App */}
      <div className="p-6 bg-zinc-900/60 border border-zinc-800 space-y-6">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div>
            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
              Python Ecosystem & Quick Start
            </span>
            <h3 className="text-lg font-bold text-white font-display uppercase">
              How To Run It Locally in 3 Steps
            </h3>
          </div>
          <span className="text-xs font-mono text-emerald-400 font-bold">Python 3.8+</span>
        </div>

        {/* Tech Stack Chips */}
        <div className="flex flex-wrap gap-1.5 font-mono text-xs">
          {["Streamlit (Frontend)", "Plotly (Charts)", "scikit-learn (ML)", "Pandas & NumPy", "Google Gemini 2.0", "gTTS (Voice)", "Feedparser (News)"].map((tech, i) => (
            <span key={i} className="px-3 py-1 bg-zinc-950 border border-zinc-800 text-zinc-300">
              {tech}
            </span>
          ))}
        </div>

        {/* 3 Step Run Guide */}
        <div className="space-y-3 font-mono text-xs">
          <div className="p-3.5 bg-zinc-950 border border-zinc-850 space-y-1">
            <span className="text-zinc-500 uppercase text-[10px] block">1. Clone & Set Up Virtual Environment:</span>
            <div className="text-emerald-400">git clone https://github.com/25sh0363-code/project-board.git</div>
            <div className="text-emerald-400">cd project-board && python -m venv .venv && source .venv/bin/activate</div>
          </div>

          <div className="p-3.5 bg-zinc-950 border border-zinc-850 space-y-1">
            <span className="text-zinc-500 uppercase text-[10px] block">2. Install Dependencies:</span>
            <div className="text-emerald-400">pip install -r requirements.txt</div>
          </div>

          <div className="p-3.5 bg-zinc-950 border border-zinc-850 space-y-1">
            <span className="text-zinc-500 uppercase text-[10px] block">3. Launch Streamlit:</span>
            <div className="text-emerald-400">streamlit run app.py</div>
            <span className="text-zinc-500 text-[10px] block font-sans pt-1">Opens locally at http://localhost:8501</span>
          </div>
        </div>
      </div>

    </div>
  );
}
