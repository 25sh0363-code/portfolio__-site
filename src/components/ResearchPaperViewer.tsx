import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { fixAssetUrl } from '../utils/assets';
import { 
  Github, 
  ExternalLink, 
  FileText, 
  Cpu, 
  Layers, 
  Zap, 
  Activity, 
  HardDrive, 
  BarChart2, 
  Check, 
  Code2, 
  BookOpen, 
  Terminal,
  ShieldCheck,
  Server,
  Printer,
  Paperclip,
  CheckCircle2,
  ListOrdered,
  ArrowLeft
} from 'lucide-react';
import { RESEARCH_PAPER_DATA } from '../data';
import { MANUSCRIPT_CONTENT } from '../manuscriptData';

interface ResearchPaperViewerProps {
  onBack?: () => void;
}

export default function ResearchPaperViewer({ onBack }: ResearchPaperViewerProps) {
  const paper = RESEARCH_PAPER_DATA;
  const manuscript = MANUSCRIPT_CONTENT;

  // View Mode: 'manuscript' (Attached Full Original Paper) or 'interactive' (Interactive Benchmarks)
  const [viewMode, setViewMode] = useState<'manuscript' | 'interactive'>('manuscript');
  const [activeInteractiveSection, setActiveInteractiveSection] = useState<'benchmarks' | 'architecture' | 'generation' | 'reproduce'>('benchmarks');

  const pdfUrl = fixAssetUrl('papers/From_Python_to_Native_CPP_Transformer_Om_Suraj_Kashikar.pdf');

  const handleOpenPdf = () => {
    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <section className="py-8 sm:py-12 relative text-left" id="research-paper-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 space-y-8">

        {/* Optional Back to Projects Navigation Bar */}
        {onBack && (
          <div className="flex items-center justify-between pb-4 border-b border-zinc-900 no-print">
            <button
              onClick={onBack}
              id="paper-btn-back-to-projects"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 text-xs font-mono uppercase tracking-wider transition cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to All Projects
            </button>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest hidden sm:inline-block">
                Projects / Native C++ vs. Python Transformer
              </span>
            </div>
          </div>
        )}

        {/* Paper Header Card */}
        <div className="border border-zinc-800 bg-zinc-950 p-6 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-zinc-800/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-2.5 py-0.5 bg-zinc-100 text-zinc-950 text-[10px] font-mono font-black uppercase tracking-widest flex items-center gap-1.5">
              <Paperclip className="w-3 h-3 text-zinc-900" />
              Attached Original Research Paper
            </span>
            <span className="px-2.5 py-0.5 bg-zinc-900 text-zinc-400 text-[10px] font-mono border border-zinc-800 uppercase tracking-wider">
              High-Performance Deep Learning Systems
            </span>
            <span className="px-2.5 py-0.5 bg-zinc-900 text-zinc-400 text-[10px] font-mono border border-zinc-800 uppercase tracking-wider">
              NVIDIA RTX 4090
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white font-display uppercase tracking-tight leading-tight mb-4">
            {paper.paperTitle}
          </h1>

          <p className="text-zinc-400 text-base sm:text-lg font-light leading-relaxed max-w-4xl mb-6">
            {paper.subtitle}
          </p>

          {/* Author Byline & Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-zinc-900 text-xs text-zinc-400">
            <div>
              <span className="text-white font-bold text-sm block">{paper.author}</span>
              <span className="text-zinc-500 font-mono text-[11px]">{paper.institution}</span>
            </div>

            <div className="flex flex-wrap items-center gap-2 no-print">
              <a
                href={paper.githubRepo}
                target="_blank"
                rel="noreferrer"
                id="paper-github-link"
                className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 font-bold text-[11px] font-mono uppercase tracking-wider transition flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                GitHub Repository
              </a>
              
              <button
                onClick={handleOpenPdf}
                id="btn-view-pdf"
                className="px-4 py-2.5 bg-zinc-100 hover:bg-white text-zinc-950 font-black text-[11px] font-mono uppercase tracking-wider transition flex items-center gap-2 cursor-pointer shadow-md"
                title="View the original research paper PDF"
              >
                <FileText className="w-4 h-4 text-zinc-950" />
                View Original PDF
              </button>

              <button
                onClick={handlePrint}
                id="btn-print-paper"
                className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-800 font-mono text-[11px] uppercase tracking-wider transition flex items-center gap-2 cursor-pointer"
                title="Print or Save full paper"
              >
                <Printer className="w-3.5 h-3.5" />
                Print / Save PDF
              </button>
            </div>
          </div>
        </div>

        {/* 4 Core Empirical Headline Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-6 bg-zinc-905 border border-zinc-850 space-y-2">
            <div className="flex items-center justify-between text-zinc-500">
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Training Throughput</span>
              <Zap className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-3xl font-black text-white font-mono tracking-tight">
              1.63×
            </div>
            <p className="text-xs text-zinc-400 font-light leading-snug">
              C++ sustained ~97.5k toks/s vs. ~60.0k toks/s for Python (<span className="text-emerald-400 font-medium">+62.5% advantage</span>).
            </p>
          </div>

          <div className="p-6 bg-zinc-905 border border-zinc-850 space-y-2">
            <div className="flex items-center justify-between text-zinc-500">
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold">Inference Speed</span>
              <Activity className="w-4 h-4 text-cyan-400" />
            </div>
            <div className="text-3xl font-black text-white font-mono tracking-tight">
              190.6 <span className="text-sm text-zinc-500 font-normal">tok/s</span>
            </div>
            <p className="text-xs text-zinc-400 font-light leading-snug">
              C++ autoregressive median generation vs 129.0 tok/s in Python (<span className="text-emerald-400 font-medium">+47.8% speedup</span>).
            </p>
          </div>

          <div className="p-6 bg-zinc-905 border border-zinc-850 space-y-2">
            <div className="flex items-center justify-between text-zinc-500">
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold">GPU VRAM Footprint</span>
              <HardDrive className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-3xl font-black text-white font-mono tracking-tight">
              -69.8%
            </div>
            <p className="text-xs text-zinc-400 font-light leading-snug">
              Inference GPU memory dropped from 545 MB (Python) to 164.8 MB (C++ LibTorch).
            </p>
          </div>

          <div className="p-6 bg-zinc-905 border border-zinc-850 space-y-2">
            <div className="flex items-center justify-between text-zinc-500">
              <span className="text-[10px] font-mono uppercase tracking-widest font-bold">System RAM Usage</span>
              <Server className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-3xl font-black text-white font-mono tracking-tight">
              -18.0%
            </div>
            <p className="text-xs text-zinc-400 font-light leading-snug">
              Inference RAM reduced from 1,055 MB in Python to 864.7 MB in compiled native C++.
            </p>
          </div>
        </div>

        {/* Primary View Switcher: Original Manuscript vs Interactive Benchmark Suite */}
        <div className="border border-zinc-850 bg-zinc-950 p-2 flex flex-col sm:flex-row items-center justify-between gap-3 no-print">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setViewMode('manuscript')}
              id="viewmode-manuscript"
              className={`px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider transition cursor-pointer flex items-center gap-2 ${
                viewMode === 'manuscript'
                  ? 'bg-zinc-100 text-zinc-950 font-black shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <Paperclip className="w-3.5 h-3.5" />
              Attached Original Paper (Full Manuscript)
            </button>

            <button
              onClick={() => setViewMode('interactive')}
              id="viewmode-interactive"
              className={`px-4 py-2.5 text-xs font-mono font-bold uppercase tracking-wider transition cursor-pointer flex items-center gap-2 ${
                viewMode === 'interactive'
                  ? 'bg-zinc-100 text-zinc-950 font-black shadow-md'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
              }`}
            >
              <BarChart2 className="w-3.5 h-3.5" />
              Interactive Benchmark Suite
            </button>
          </div>

          <div className="text-[11px] font-mono text-zinc-500 pr-2 hidden sm:block">
            {viewMode === 'manuscript' ? 'Reading: Full Academic Paper' : 'Exploring: Interactive Metrics & Code'}
          </div>
        </div>

        {/* ============================================================== */}
        {/* VIEW MODE 1: ATTACHED ORIGINAL RESEARCH PAPER (MANUSCRIPT VIEW) */}
        {/* ============================================================== */}
        {viewMode === 'manuscript' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-10"
            id="full-manuscript-viewer"
          >
            {/* Academic Paper Cover & Abstract Box */}
            <div className="border border-zinc-800 bg-zinc-905 p-6 sm:p-10 space-y-6">
              <div className="border-b border-zinc-850 pb-6 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs font-mono text-zinc-500">
                  <span>Preprint / Independent Systems Study</span>
                  <span>Silver Oaks International, Hyderabad</span>
                </div>
                <h2 className="text-xl sm:text-3xl font-black text-white font-serif tracking-tight leading-tight">
                  {manuscript.title}
                </h2>
                <div className="text-xs font-mono text-zinc-400 pt-1">
                  <span className="text-zinc-200 font-bold">{manuscript.author}</span> · {manuscript.institution}
                </div>
              </div>

              {/* Abstract */}
              <div className="p-6 bg-zinc-950 border border-zinc-800 space-y-4">
                <h3 className="text-xs font-mono font-black uppercase tracking-widest text-zinc-300 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-zinc-400" />
                  Abstract
                </h3>
                <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-serif font-light text-justify">
                  {manuscript.abstract}
                </p>

                <div className="pt-4 border-t border-zinc-900 space-y-1">
                  <span className="text-[10px] uppercase font-mono tracking-widest text-zinc-500 font-bold block">
                    Central Research Question
                  </span>
                  <p className="text-zinc-200 text-sm font-serif italic">
                    "{manuscript.researchQuestion}"
                  </p>
                </div>
              </div>
            </div>

            {/* Section 1: Introduction */}
            <div className="border border-zinc-850 bg-zinc-905 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-black text-zinc-500">SECTION 1</span>
                <h3 className="text-xl font-bold text-white font-display uppercase tracking-tight">
                  Introduction & Motivation
                </h3>
              </div>
              <div className="space-y-3 text-sm sm:text-base text-zinc-300 font-light leading-relaxed font-sans">
                {manuscript.sections[0].paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>

            {/* Section 2: Dataset & Preprocessing Pipeline */}
            <div className="border border-zinc-850 bg-zinc-905 p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-black text-zinc-500">SECTION 2</span>
                <h3 className="text-xl font-bold text-white font-display uppercase tracking-tight">
                  Dataset & Preprocessing Pipeline
                </h3>
              </div>
              
              <div className="space-y-3 text-sm sm:text-base text-zinc-300 font-light leading-relaxed font-sans">
                {manuscript.sections[1].paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Data Pipeline Feature Strip */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2 font-mono text-xs">
                <div className="p-4 bg-zinc-950 border border-zinc-800 space-y-1">
                  <span className="text-[10px] text-zinc-500 uppercase block">Corpus Scale</span>
                  <span className="text-white font-bold">{paper.dataset.totalTrainingTokens}</span>
                </div>
                <div className="p-4 bg-zinc-950 border border-zinc-800 space-y-1">
                  <span className="text-[10px] text-zinc-500 uppercase block">Tokenizer & Vocab</span>
                  <span className="text-white font-bold">{paper.dataset.tokenizer} ({paper.dataset.vocabSize.toLocaleString()})</span>
                </div>
                <div className="p-4 bg-zinc-950 border border-zinc-800 space-y-1">
                  <span className="text-[10px] text-zinc-500 uppercase block">Packaging Standard</span>
                  <span className="text-white font-bold">uint16 Binary Shards (train.bin, val.bin)</span>
                </div>
              </div>
            </div>

            {/* Section 3: Architecture & Mathematical Formulation */}
            <div className="border border-zinc-850 bg-zinc-905 p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-black text-zinc-500">SECTION 3</span>
                <h3 className="text-xl font-bold text-white font-display uppercase tracking-tight">
                  Transformer Architecture & Mathematical Formulation
                </h3>
              </div>

              <div className="space-y-3 text-sm sm:text-base text-zinc-300 font-light leading-relaxed font-sans">
                {manuscript.sections[2].paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Mathematical Formulation Display Blocks */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 pt-2">
                <div className="p-5 bg-zinc-950 border border-zinc-800 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold block">
                    Scaled Dot-Product Causal Self-Attention
                  </span>
                  <div className="p-4 bg-zinc-900 border border-zinc-850 text-center font-mono text-sm text-zinc-200 overflow-x-auto">
                    Attention(Q, K, V) = softmax( (Q · Kᵀ) / √d_k + M ) · V
                  </div>
                  <p className="text-[11px] text-zinc-400 font-light">
                    where M is the causal lower-triangular mask enforcing autoregressive masking (M_ij = -∞ for j &gt; i).
                  </p>
                </div>

                <div className="p-5 bg-zinc-950 border border-zinc-800 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold block">
                    Position-Wise Feed-Forward Network
                  </span>
                  <div className="p-4 bg-zinc-900 border border-zinc-850 text-center font-mono text-sm text-zinc-200 overflow-x-auto">
                    FFN(x) = GELU( x · W₁ + b₁ ) · W₂ + b₂
                  </div>
                  <p className="text-[11px] text-zinc-400 font-light">
                    where W₁ ∈ ℝ^(384×1536) and W₂ ∈ ℝ^(1536×384) with tied input/output embedding representations.
                  </p>
                </div>
              </div>

              {/* Architecture Table */}
              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-bold block">
                  Table 1: Architecture Hyperparameters
                </span>
                <div className="overflow-x-auto border border-zinc-800">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-zinc-950 border-b border-zinc-800 text-zinc-400 uppercase text-[10px]">
                      <tr>
                        <th className="py-2.5 px-4">Parameter</th>
                        <th className="py-2.5 px-4">Value</th>
                        <th className="py-2.5 px-4">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-850 text-zinc-300">
                      <tr>
                        <td className="py-2.5 px-4 font-bold text-white">Model Architecture</td>
                        <td className="py-2.5 px-4">Decoder-Only Pre-LayerNorm</td>
                        <td className="py-2.5 px-4 text-zinc-400">GPT-2 style autoregressive decoder</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 font-bold text-white">Transformer Blocks (N)</td>
                        <td className="py-2.5 px-4">8 Layers</td>
                        <td className="py-2.5 px-4 text-zinc-400">Identical depth in Python and C++</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 font-bold text-white">Attention Heads (H)</td>
                        <td className="py-2.5 px-4">8 Heads</td>
                        <td className="py-2.5 px-4 text-zinc-400">Head dimension d_k = 48</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 font-bold text-white">Embedding Dimension (d_model)</td>
                        <td className="py-2.5 px-4">384</td>
                        <td className="py-2.5 px-4 text-zinc-400">Hidden layer vector width</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 font-bold text-white">MLP Width (d_ff)</td>
                        <td className="py-2.5 px-4">1,536</td>
                        <td className="py-2.5 px-4 text-zinc-400">4 × d_model expansion</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 font-bold text-white">Context Window (T)</td>
                        <td className="py-2.5 px-4">256 tokens</td>
                        <td className="py-2.5 px-4 text-zinc-400">Learned positional embeddings</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 font-bold text-white">Weight Tying</td>
                        <td className="py-2.5 px-4">Enabled</td>
                        <td className="py-2.5 px-4 text-zinc-400">Token embedding tied to lm_head</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Section 4: Hardware & Software Specifications */}
            <div className="border border-zinc-850 bg-zinc-905 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-black text-zinc-500">SECTION 4</span>
                <h3 className="text-xl font-bold text-white font-display uppercase tracking-tight">
                  Hardware & Software Test Rig Specifications
                </h3>
              </div>
              <div className="space-y-3 text-sm sm:text-base text-zinc-300 font-light leading-relaxed font-sans">
                {manuscript.sections[3].paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Rig Table */}
              <div className="overflow-x-auto border border-zinc-800">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-zinc-950 border-b border-zinc-800 text-zinc-400 uppercase text-[10px]">
                    <tr>
                      <th className="py-2.5 px-4">Subsystem</th>
                      <th className="py-2.5 px-4">Specification</th>
                      <th className="py-2.5 px-4">Details</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-850 text-zinc-300">
                    <tr>
                      <td className="py-2.5 px-4 font-bold text-white">Compute GPU</td>
                      <td className="py-2.5 px-4 text-amber-400">{paper.hardware.gpu}</td>
                      <td className="py-2.5 px-4 text-zinc-400">24 GB GDDR6X, Ada Lovelace</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-bold text-white">Driver & CUDA</td>
                      <td className="py-2.5 px-4">Driver {paper.hardware.driver} / CUDA {paper.hardware.cuda}</td>
                      <td className="py-2.5 px-4 text-zinc-400">Direct hardware driver stack</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-bold text-white">C++ Toolchain</td>
                      <td className="py-2.5 px-4">GCC {paper.hardware.compiler}, CMake {paper.hardware.cmake}</td>
                      <td className="py-2.5 px-4 text-zinc-400">-O3 -std=c++17 release flags</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-bold text-white">C++ Deep Learning</td>
                      <td className="py-2.5 px-4 text-emerald-400">LibTorch {paper.hardware.libTorchVersion} (CUDA)</td>
                      <td className="py-2.5 px-4 text-zinc-400">Full single precision (FP32)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-bold text-white">Python Toolchain</td>
                      <td className="py-2.5 px-4">Python {paper.hardware.pythonVersion}, PyTorch {paper.hardware.pyTorchVersion}</td>
                      <td className="py-2.5 px-4 text-zinc-400">CUDA Automatic Mixed Precision (AMP) + GradScaler</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-4 font-bold text-white">Host Infrastructure</td>
                      <td className="py-2.5 px-4">{paper.hardware.cloudProvider}</td>
                      <td className="py-2.5 px-4 text-zinc-400">Isolated cloud GPU instance</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Section 5: Training Methodology & Convergence Analysis */}
            <div className="border border-zinc-850 bg-zinc-905 p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-black text-zinc-500">SECTION 5</span>
                <h3 className="text-xl font-bold text-white font-display uppercase tracking-tight">
                  Training Methodology & Empirical Throughput
                </h3>
              </div>
              <div className="space-y-3 text-sm sm:text-base text-zinc-300 font-light leading-relaxed font-sans">
                {manuscript.sections[4].paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Training Throughput Contrast Card */}
              <div className="p-6 bg-zinc-950 border border-zinc-800 grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                <div className="space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold block">
                    Observed Training Throughput
                  </span>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-zinc-400">Python (PyTorch + AMP)</span>
                      <span className="text-zinc-200">~59k–62k toks/s (mid: 60.0k)</span>
                    </div>
                    <div className="w-full bg-zinc-900 h-2">
                      <div className="bg-zinc-500 h-2 w-[61%]" />
                    </div>
                  </div>
                  <div className="space-y-1 pt-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-emerald-400 font-bold">C++ (LibTorch FP32)</span>
                      <span className="text-emerald-400 font-bold">~95k–100k toks/s (mid: 97.5k)</span>
                    </div>
                    <div className="w-full bg-zinc-900 h-2">
                      <div className="bg-emerald-400 h-2 w-[100%]" />
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-zinc-900/60 border border-zinc-850 space-y-1 text-xs font-mono">
                  <div className="text-emerald-400 text-2xl font-black font-mono">1.63× (+62.5%)</div>
                  <div className="text-zinc-300 font-bold">Sustained Training Speedup</div>
                  <p className="text-[11px] text-zinc-400 font-light leading-snug">
                    Observed relative advantage across range boundaries spans 1.56× to 1.69×, despite C++ executing in full FP32 while Python used mixed precision.
                  </p>
                </div>
              </div>

              {/* Validation Loss Progression Table */}
              <div className="space-y-2 pt-2">
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-bold block">
                  Table 2: Validation Loss Progression (Held-Out Cross-Entropy Every 10k Steps)
                </span>
                <div className="overflow-x-auto border border-zinc-800">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-zinc-950 border-b border-zinc-800 text-zinc-400 uppercase text-[10px]">
                      <tr>
                        <th className="py-2 px-3">Step</th>
                        <th className="py-2 px-3">Python Val Loss</th>
                        <th className="py-2 px-3">C++ Val Loss</th>
                        <th className="py-2 px-3">Delta |Py - C++|</th>
                        <th className="py-2 px-3">Convergence State</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-850 text-zinc-300">
                      {paper.benchmarks.validationLoss.map((row) => (
                        <tr key={row.step} className={row.step === 99000 ? 'bg-zinc-900 font-bold text-white' : ''}>
                          <td className="py-2 px-3">Step {row.step.toLocaleString()}</td>
                          <td className="py-2 px-3">{row.python.toFixed(4)}</td>
                          <td className="py-2 px-3 text-emerald-400">{row.cpp.toFixed(4)}</td>
                          <td className="py-2 px-3 text-zinc-400">{Math.abs(row.python - row.cpp).toFixed(4)}</td>
                          <td className="py-2 px-3 text-zinc-400">
                            {row.step === 99000 ? 'Final Convergence (Matched)' : 'Active Optimization'}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="text-[11px] text-zinc-500 font-light italic">
                  Best recorded validation loss: Python achieved 1.4088 (Step 94,000); C++ achieved 1.4136 (Steps 95,000 and 99,000). Both models exhibited near-identical optimization dynamics.
                </p>
              </div>
            </div>

            {/* Section 6: Autoregressive Inference & Memory Allocation */}
            <div className="border border-zinc-850 bg-zinc-905 p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-black text-zinc-500">SECTION 6</span>
                <h3 className="text-xl font-bold text-white font-display uppercase tracking-tight">
                  Autoregressive Inference & Memory Allocation
                </h3>
              </div>
              <div className="space-y-3 text-sm sm:text-base text-zinc-300 font-light leading-relaxed font-sans">
                {manuscript.sections[5].paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>

              {/* Inference Benchmark Table */}
              <div className="space-y-2">
                <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider font-bold block">
                  Table 3: Autoregressive Inference Run Metrics (Context: "A small dog found a shiny ball")
                </span>
                <div className="overflow-x-auto border border-zinc-800">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="bg-zinc-950 border-b border-zinc-800 text-zinc-400 uppercase text-[10px]">
                      <tr>
                        <th className="py-2.5 px-4">Metric</th>
                        <th className="py-2.5 px-4">Python (PyTorch)</th>
                        <th className="py-2.5 px-4">C++ (LibTorch)</th>
                        <th className="py-2.5 px-4">Observed Advantage</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-850 text-zinc-300">
                      <tr>
                        <td className="py-2.5 px-4 font-bold text-white">Median Inference Throughput</td>
                        <td className="py-2.5 px-4">129.0 tok/s</td>
                        <td className="py-2.5 px-4 text-emerald-400 font-bold">190.6 tok/s</td>
                        <td className="py-2.5 px-4 text-emerald-400 font-bold">+47.8% (1.48× speedup)</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 font-bold text-white">Inference Latency</td>
                        <td className="py-2.5 px-4">0.61s (80 tokens)</td>
                        <td className="py-2.5 px-4">0.66s (126 tokens)</td>
                        <td className="py-2.5 px-4 text-zinc-400">57.5% more tokens in equivalent time</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 font-bold text-white">GPU VRAM During Generation</td>
                        <td className="py-2.5 px-4">545.0 MB</td>
                        <td className="py-2.5 px-4 text-purple-400 font-bold">164.78 MB</td>
                        <td className="py-2.5 px-4 text-purple-400 font-bold">-69.8% GPU memory footprint</td>
                      </tr>
                      <tr>
                        <td className="py-2.5 px-4 font-bold text-white">System RAM During Generation</td>
                        <td className="py-2.5 px-4">1,055.0 MB</td>
                        <td className="py-2.5 px-4 text-cyan-400 font-bold">864.7 MB</td>
                        <td className="py-2.5 px-4 text-cyan-400 font-bold">-18.0% host memory footprint</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Section 7: Systems & Architectural Discussion */}
            <div className="border border-zinc-850 bg-zinc-905 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-black text-zinc-500">SECTION 7</span>
                <h3 className="text-xl font-bold text-white font-display uppercase tracking-tight">
                  Systems & Architectural Discussion
                </h3>
              </div>
              <div className="space-y-3 text-sm sm:text-base text-zinc-300 font-light leading-relaxed font-sans">
                {manuscript.sections[6].paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>

            {/* Section 8: Threats to Validity & Limitations */}
            <div className="border border-zinc-850 bg-zinc-905 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-black text-zinc-500">SECTION 8</span>
                <h3 className="text-xl font-bold text-white font-display uppercase tracking-tight flex items-center gap-2">
                  <ShieldCheck className="w-5 h-5 text-zinc-400" />
                  Threats to Validity & Limitations
                </h3>
              </div>
              <ul className="space-y-2.5 text-sm sm:text-base text-zinc-300 font-light leading-relaxed font-sans">
                {manuscript.sections[7].paragraphs.map((p, idx) => (
                  <li key={idx} className="flex gap-2">
                    <span className="text-zinc-600 font-bold font-mono">[{idx + 1}]</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Section 9: Conclusion & Future Directions */}
            <div className="border border-zinc-850 bg-zinc-905 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-black text-zinc-500">SECTION 9</span>
                <h3 className="text-xl font-bold text-white font-display uppercase tracking-tight">
                  Conclusion & Future Directions
                </h3>
              </div>
              <div className="space-y-3 text-sm sm:text-base text-zinc-300 font-light leading-relaxed font-sans">
                {manuscript.sections[8].paragraphs.map((p, idx) => (
                  <p key={idx}>{p}</p>
                ))}
              </div>
            </div>

            {/* References & Literature Cited */}
            <div className="border border-zinc-850 bg-zinc-905 p-6 sm:p-8 space-y-4">
              <h3 className="text-sm font-mono font-bold uppercase tracking-widest text-zinc-300 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-zinc-400" />
                References & Literature Cited
              </h3>
              <ol className="space-y-2 text-xs text-zinc-400 font-mono">
                {paper.references.map((ref) => (
                  <li key={ref.id} className="flex gap-2">
                    <span className="text-zinc-500 font-bold">[{ref.id}]</span>
                    <span>
                      {ref.citation}
                      {ref.link && (
                        <a
                          href={ref.link}
                          target="_blank"
                          rel="noreferrer"
                          className="ml-2 text-zinc-300 hover:text-white underline"
                        >
                          [Link]
                        </a>
                      )}
                    </span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Appendix: Story Generation Samples */}
            <div className="border border-zinc-850 bg-zinc-905 p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold block">Appendix A</span>
                <h3 className="text-xl font-bold text-white font-display uppercase tracking-tight">
                  Qualitative Story Generation Comparison
                </h3>
              </div>

              <div className="p-4 bg-zinc-950 border border-zinc-800">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold block mb-1">
                  Evaluation Prompt
                </span>
                <p className="text-sm text-zinc-200 font-serif italic">
                  "{paper.qualitative.prompt}"
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-6 bg-zinc-950 border border-zinc-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                    <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold">
                      Python (PyTorch) Output
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500">80 tokens in 0.62s</span>
                  </div>
                  <p className="text-zinc-300 text-sm font-serif italic leading-relaxed">
                    "{paper.qualitative.python.output}"
                  </p>
                  <div className="pt-3 border-t border-zinc-900 grid grid-cols-2 gap-2 text-[10px] font-mono text-zinc-500">
                    <div>Rate: <span className="text-zinc-300">129.08 tok/s</span></div>
                    <div>VRAM: <span className="text-zinc-300">545.68 MB</span></div>
                    <div>RAM: <span className="text-zinc-300">1,055.78 MB</span></div>
                    <div>EOT: <span className="text-zinc-300">Emitted</span></div>
                  </div>
                </div>

                <div className="p-6 bg-zinc-950 border border-zinc-800 space-y-4">
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                    <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
                      C++ (LibTorch) Output
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400/80">126 tokens in 0.66s</span>
                  </div>
                  <p className="text-zinc-300 text-sm font-serif italic leading-relaxed">
                    "{paper.qualitative.cpp.output}"
                  </p>
                  <div className="pt-3 border-t border-zinc-900 grid grid-cols-2 gap-2 text-[10px] font-mono text-zinc-500">
                    <div>Rate: <span className="text-emerald-400 font-bold">190.6 tok/s</span></div>
                    <div>VRAM: <span className="text-purple-400 font-bold">164.78 MB</span></div>
                    <div>RAM: <span className="text-cyan-400 font-bold">864.7 MB</span></div>
                    <div>EOT: <span className="text-zinc-300">Emitted</span></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions for Manuscript Reader */}
            <div className="p-6 bg-zinc-950 border border-zinc-800 flex flex-wrap items-center justify-between gap-4 no-print">
              <div className="space-y-1">
                <span className="text-xs text-white font-bold block">Attached Research Paper Document</span>
                <span className="text-zinc-500 text-[11px] font-mono">Full manuscript text and experimental logs recorded on NVIDIA RTX 4090.</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={handleOpenPdf}
                  id="btn-view-pdf-bottom"
                  className="px-4 py-2.5 bg-zinc-100 hover:bg-white text-zinc-950 font-black text-xs font-mono uppercase tracking-wider transition flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <FileText className="w-4 h-4 text-zinc-950" />
                  View Original PDF
                </button>
                <button
                  onClick={handlePrint}
                  id="btn-print-bottom"
                  className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800 font-mono text-xs uppercase tracking-wider transition flex items-center gap-2 cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  Print / Save PDF
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {/* ============================================================== */}
        {/* VIEW MODE 2: INTERACTIVE BENCHMARK & METRICS SUITE             */}
        {/* ============================================================== */}
        {viewMode === 'interactive' && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
          >
            {/* Interactive Section Sub-Tabs */}
            <div className="flex flex-wrap gap-2 border-b border-zinc-900 pb-4">
              {[
                { id: 'benchmarks', label: '1. Empirical Benchmarks' },
                { id: 'architecture', label: '2. Transformer Architecture' },
                { id: 'generation', label: '3. Qualitative Text Output' },
                { id: 'reproduce', label: '4. Build & Reproduction' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveInteractiveSection(tab.id as any)}
                  id={`tab-interactive-${tab.id}`}
                  className={`px-4 py-2 text-xs font-mono font-bold uppercase tracking-wider transition cursor-pointer ${
                    activeInteractiveSection === tab.id
                      ? 'bg-zinc-100 text-zinc-950 font-black'
                      : 'bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-850'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Sub-Tab 1: Empirical Benchmarks */}
            {activeInteractiveSection === 'benchmarks' && (
              <div className="space-y-8">
                {/* Training Throughput Deep-Dive */}
                <div className="p-6 sm:p-8 bg-zinc-905 border border-zinc-850 space-y-6">
                  <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-850 pb-4">
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold block">Benchmark 1</span>
                      <h3 className="text-xl font-bold text-white font-display uppercase tracking-tight">
                        Sustained Training Throughput (Tokens / Second)
                      </h3>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-mono font-bold">
                      1.63× Throughput Advantage
                    </span>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-zinc-400">Python (PyTorch + CUDA AMP)</span>
                        <span className="text-zinc-200 font-bold">~59,000 – 62,000 toks/s (midpoint: 60,000)</span>
                      </div>
                      <div className="w-full bg-zinc-900 h-3 border border-zinc-800">
                        <div className="bg-zinc-500 h-full w-[61%]" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-emerald-400 font-bold">C++ (LibTorch FP32)</span>
                        <span className="text-emerald-400 font-bold">~95,000 – 100,000 toks/s (midpoint: 97,500)</span>
                      </div>
                      <div className="w-full bg-zinc-900 h-3 border border-zinc-800">
                        <div className="bg-emerald-400 h-full w-[100%]" />
                      </div>
                    </div>
                  </div>

                  <p className="text-xs text-zinc-400 font-light leading-relaxed">
                    {paper.benchmarks.training.note}
                  </p>
                </div>

                {/* Validation Loss Convergence */}
                <div className="p-6 sm:p-8 bg-zinc-905 border border-zinc-850 space-y-6">
                  <div className="space-y-1 border-b border-zinc-850 pb-4">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold block">Benchmark 2</span>
                    <h3 className="text-xl font-bold text-white font-display uppercase tracking-tight">
                      Validation Loss Convergence Trajectory
                    </h3>
                  </div>

                  <div className="overflow-x-auto border border-zinc-800">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-zinc-950 border-b border-zinc-800 text-zinc-400 uppercase text-[10px]">
                        <tr>
                          <th className="py-2.5 px-4">Step</th>
                          <th className="py-2.5 px-4">Python Val Loss</th>
                          <th className="py-2.5 px-4">C++ Val Loss</th>
                          <th className="py-2.5 px-4">Delta |Py - C++|</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-850 text-zinc-300">
                        {paper.benchmarks.validationLoss.map((row) => (
                          <tr key={row.step} className={row.step === 99000 ? 'bg-zinc-900 font-bold text-white' : ''}>
                            <td className="py-2.5 px-4">Step {row.step.toLocaleString()}</td>
                            <td className="py-2.5 px-4">{row.python.toFixed(4)}</td>
                            <td className="py-2.5 px-4 text-emerald-400">{row.cpp.toFixed(4)}</td>
                            <td className="py-2.5 px-4 text-zinc-400">{Math.abs(row.python - row.cpp).toFixed(4)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                    <div className="p-4 bg-zinc-950 border border-zinc-800 space-y-1">
                      <span className="text-[10px] text-zinc-500 uppercase block">Python Best Loss</span>
                      <span className="text-white font-bold">{paper.benchmarks.bestValLoss.python.loss}</span>
                      <span className="text-[10px] text-zinc-400 block">{paper.benchmarks.bestValLoss.python.step}</span>
                    </div>
                    <div className="p-4 bg-zinc-950 border border-zinc-800 space-y-1">
                      <span className="text-[10px] text-emerald-500 uppercase block">C++ Best Loss</span>
                      <span className="text-emerald-400 font-bold">{paper.benchmarks.bestValLoss.cpp.loss}</span>
                      <span className="text-[10px] text-zinc-400 block">{paper.benchmarks.bestValLoss.cpp.step}</span>
                    </div>
                  </div>
                </div>

                {/* Autoregressive Inference & Memory Allocation */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Inference Speed */}
                  <div className="p-6 bg-zinc-905 border border-zinc-850 space-y-4">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold block">
                      Inference Throughput
                    </span>
                    <h4 className="text-lg font-bold text-white font-display uppercase tracking-tight">
                      Autoregressive Token Generation
                    </h4>

                    <div className="space-y-3 text-xs font-mono">
                      <div className="p-3 bg-zinc-950 border border-zinc-800 flex justify-between items-center">
                        <span className="text-zinc-400">Python Median</span>
                        <span className="text-white font-bold">{paper.benchmarks.inference.pythonMedian} tok/s</span>
                      </div>
                      <div className="p-3 bg-zinc-950 border border-zinc-800 flex justify-between items-center">
                        <span className="text-emerald-400 font-bold">C++ Median</span>
                        <span className="text-emerald-400 font-bold">{paper.benchmarks.inference.cppMedian} tok/s</span>
                      </div>
                      <div className="p-3 bg-emerald-950/40 border border-emerald-800/60 text-emerald-400 font-bold text-center">
                        +{paper.benchmarks.inference.percentage} ({paper.benchmarks.inference.speedup}) Faster
                      </div>
                    </div>
                  </div>

                  {/* Memory Footprints */}
                  <div className="p-6 bg-zinc-905 border border-zinc-850 space-y-4">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold block">
                      Memory Efficiency
                    </span>
                    <h4 className="text-lg font-bold text-white font-display uppercase tracking-tight">
                      GPU VRAM & Host RAM
                    </h4>

                    <div className="space-y-3 text-xs font-mono">
                      <div className="p-3 bg-zinc-950 border border-zinc-800 space-y-1">
                        <div className="flex justify-between">
                          <span className="text-zinc-400">GPU VRAM</span>
                          <span className="text-purple-400 font-bold">{paper.benchmarks.memory.gpu.reduction}</span>
                        </div>
                        <div className="text-[10px] text-zinc-500">
                          Python: {paper.benchmarks.memory.gpu.python} MB → C++: {paper.benchmarks.memory.gpu.cpp} MB
                        </div>
                      </div>

                      <div className="p-3 bg-zinc-950 border border-zinc-800 space-y-1">
                        <div className="flex justify-between">
                          <span className="text-zinc-400">Host RAM</span>
                          <span className="text-emerald-400 font-bold">{paper.benchmarks.memory.ram.reduction}</span>
                        </div>
                        <div className="text-[10px] text-zinc-500">
                          Python: {paper.benchmarks.memory.ram.python} MB → C++: {paper.benchmarks.memory.ram.cpp} MB
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sub-Tab 2: Architecture Details */}
            {activeInteractiveSection === 'architecture' && (
              <div className="space-y-8">
                <div className="p-6 sm:p-8 bg-zinc-905 border border-zinc-850 space-y-6">
                  <div className="space-y-1 border-b border-zinc-850 pb-4">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold block">Model Specs</span>
                    <h3 className="text-xl font-bold text-white font-display uppercase tracking-tight">
                      Pre-LayerNorm Decoder-Only Architecture
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 text-xs font-mono">
                    <div className="p-3 bg-zinc-950 border border-zinc-800 space-y-1">
                      <span className="text-[10px] text-zinc-500 block uppercase">Context Length</span>
                      <span className="text-white font-bold">{paper.architecture.contextLength} tokens</span>
                    </div>
                    <div className="p-3 bg-zinc-950 border border-zinc-800 space-y-1">
                      <span className="text-[10px] text-zinc-500 block uppercase">Embedding Dim</span>
                      <span className="text-white font-bold">{paper.architecture.embeddingDim}</span>
                    </div>
                    <div className="p-3 bg-zinc-950 border border-zinc-800 space-y-1">
                      <span className="text-[10px] text-zinc-500 block uppercase">Attention Heads</span>
                      <span className="text-white font-bold">{paper.architecture.attentionHeads}</span>
                    </div>
                    <div className="p-3 bg-zinc-950 border border-zinc-800 space-y-1">
                      <span className="text-[10px] text-zinc-500 block uppercase">Head Dim</span>
                      <span className="text-white font-bold">{paper.architecture.headDim}</span>
                    </div>
                    <div className="p-3 bg-zinc-950 border border-zinc-800 space-y-1">
                      <span className="text-[10px] text-zinc-500 block uppercase">Blocks</span>
                      <span className="text-white font-bold">{paper.architecture.transformerBlocks}</span>
                    </div>
                    <div className="p-3 bg-zinc-950 border border-zinc-800 space-y-1">
                      <span className="text-[10px] text-zinc-500 block uppercase">MLP Hidden Dim</span>
                      <span className="text-white font-bold">{paper.architecture.mlpHiddenWidth} (4×)</span>
                    </div>
                    <div className="p-3 bg-zinc-950 border border-zinc-800 space-y-1">
                      <span className="text-[10px] text-zinc-500 block uppercase">Activation</span>
                      <span className="text-white font-bold">{paper.architecture.activation}</span>
                    </div>
                    <div className="p-3 bg-zinc-950 border border-zinc-800 space-y-1">
                      <span className="text-[10px] text-zinc-500 block uppercase">Weight Tying</span>
                      <span className="text-emerald-400 font-bold">{paper.architecture.weightTying}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sub-Tab 3: Qualitative Generation Samples */}
            {activeInteractiveSection === 'generation' && (
              <div className="p-6 sm:p-8 bg-zinc-905 border border-zinc-850 space-y-6">
                <div className="space-y-1 border-b border-zinc-850 pb-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold block">Text Samples</span>
                  <h3 className="text-xl font-bold text-white font-display uppercase tracking-tight">
                    Qualitative Story Generation Output
                  </h3>
                </div>

                <div className="p-4 bg-zinc-950 border border-zinc-800">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold block mb-1">
                    Evaluation Prompt
                  </span>
                  <p className="text-sm text-zinc-200 font-serif italic">
                    "{paper.qualitative.prompt}"
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-6 bg-zinc-950 border border-zinc-800 space-y-4">
                    <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                      <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold">
                        Python (PyTorch) Output
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500">80 tokens in 0.62s</span>
                    </div>
                    <p className="text-zinc-300 text-sm font-serif italic leading-relaxed">
                      "{paper.qualitative.python.output}"
                    </p>
                    <div className="pt-3 border-t border-zinc-900 grid grid-cols-2 gap-2 text-[10px] font-mono text-zinc-500">
                      <div>Rate: <span className="text-zinc-300">129.08 tok/s</span></div>
                      <div>VRAM: <span className="text-zinc-300">545.68 MB</span></div>
                      <div>RAM: <span className="text-zinc-300">1,055.78 MB</span></div>
                      <div>EOT: <span className="text-zinc-300">Emitted</span></div>
                    </div>
                  </div>

                  <div className="p-6 bg-zinc-950 border border-zinc-800 space-y-4">
                    <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                      <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold">
                        C++ (LibTorch) Output
                      </span>
                      <span className="text-[10px] font-mono text-emerald-400/80">126 tokens in 0.66s</span>
                    </div>
                    <p className="text-zinc-300 text-sm font-serif italic leading-relaxed">
                      "{paper.qualitative.cpp.output}"
                    </p>
                    <div className="pt-3 border-t border-zinc-900 grid grid-cols-2 gap-2 text-[10px] font-mono text-zinc-500">
                      <div>Rate: <span className="text-emerald-400 font-bold">190.6 tok/s</span></div>
                      <div>VRAM: <span className="text-purple-400 font-bold">164.78 MB</span></div>
                      <div>RAM: <span className="text-cyan-400 font-bold">864.7 MB</span></div>
                      <div>EOT: <span className="text-zinc-300">Emitted</span></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Sub-Tab 4: Build & Reproduction */}
            {activeInteractiveSection === 'reproduce' && (
              <div className="p-6 sm:p-8 bg-zinc-905 border border-zinc-850 space-y-6">
                <div className="space-y-1 border-b border-zinc-850 pb-4">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500 font-bold block">Terminal</span>
                  <h3 className="text-xl font-bold text-white font-display uppercase tracking-tight">
                    Reproduction Commands
                  </h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="p-5 bg-zinc-950 border border-zinc-800 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase text-zinc-400 font-bold">
                      <Terminal className="w-4 h-4 text-zinc-500" />
                      Python / PyTorch Pipeline
                    </div>
                    <pre className="p-4 bg-zinc-900 border border-zinc-850 text-xs font-mono text-zinc-300 overflow-x-auto leading-relaxed">
{paper.reproduction.python.join('\n')}
                    </pre>
                  </div>

                  <div className="p-5 bg-zinc-950 border border-zinc-800 space-y-3">
                    <div className="flex items-center gap-2 text-xs font-mono uppercase text-emerald-400 font-bold">
                      <Terminal className="w-4 h-4 text-emerald-400" />
                      C++ / LibTorch Build & Execution
                    </div>
                    <pre className="p-4 bg-zinc-900 border border-zinc-850 text-xs font-mono text-zinc-300 overflow-x-auto leading-relaxed">
{paper.reproduction.cpp.join('\n')}
                    </pre>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        )}

      </div>
    </section>
  );
}
