import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X, ExternalLink, Github, ArrowRight, BookOpen, Activity,
  Cpu, CheckCircle2, Play, Smartphone, QrCode, Building2
} from 'lucide-react';
import { Project } from '../types';
import { fixAssetUrl } from '../utils/assets';
import { CornerReticles } from './project-details/ExhibitPrimitives';

interface ProjectPreviewModalProps {
  project: Project | null;
  onClose: () => void;
  onOpenFullProject: (project: Project) => void;
}

export default function ProjectPreviewModal({
  project,
  onClose,
  onOpenFullProject
}: ProjectPreviewModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'architecture' | 'features'>('overview');

  useEffect(() => {
    setActiveTab('overview');
  }, [project?.id]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 pt-16 sm:pt-12 bg-zinc-950/85 backdrop-blur-md overflow-y-auto no-print"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 14 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-3xl bg-zinc-950 border border-zinc-750 shadow-[0_32px_90px_-20px_rgba(0,0,0,0.95)] overflow-hidden my-auto text-left"
        onClick={(e) => e.stopPropagation()}
        id="project-preview-modal"
      >
        <CornerReticles colorClass="border-zinc-500/80" />

        {/* Visual Hero Header with Subtle Banner Artwork */}
        <div className="relative overflow-hidden border-b border-zinc-800">
          {/* Background Thumbnail Wash */}
          <div className="absolute inset-0 pointer-events-none">
            <img
              src={fixAssetUrl(project.image)}
              alt=""
              aria-hidden="true"
              className="w-full h-full object-cover opacity-25 scale-105 filter blur-[2px] saturate-75"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/90 to-zinc-950/65" />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent" />
          </div>

          <div className="relative z-10 flex items-start justify-between p-5 sm:p-7 gap-4">
            <div className="space-y-2 pr-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2 py-0.5 bg-zinc-900/90 border border-zinc-700 text-zinc-200 text-[9px] font-mono uppercase tracking-widest">
                  {project.category}
                </span>
                {project.isResearchPaper && (
                  <span className="px-2 py-0.5 bg-zinc-100 text-zinc-950 text-[9px] font-mono font-black uppercase tracking-wider flex items-center gap-1">
                    <BookOpen className="w-3 h-3" /> Original Research
                  </span>
                )}
                {project.careerLabDetails && (
                  <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[9px] font-mono font-bold uppercase tracking-wider flex items-center gap-1">
                    <Building2 className="w-3 h-3" /> Multi-Campus Platform
                  </span>
                )}
                {project.ivyTutorDetails && (
                  <span className="px-2 py-0.5 bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[9px] font-mono font-bold uppercase tracking-wider flex items-center gap-1">
                    <Cpu className="w-3 h-3" /> ESP32-S3 Hardware Tutor
                  </span>
                )}
                {project.translationDetails && (
                  <span className="px-2 py-0.5 bg-zinc-100 text-zinc-950 text-[9px] font-mono font-black uppercase tracking-wider flex items-center gap-1">
                    <Activity className="w-3 h-3" /> Seq2Seq Model
                  </span>
                )}
                {project.charBigramDetails && (
                  <span className="px-2 py-0.5 bg-zinc-100 text-zinc-950 text-[9px] font-mono font-black uppercase tracking-wider flex items-center gap-1">
                    <Cpu className="w-3 h-3" /> Generative LM
                  </span>
                )}
                {project.sinovateDetails && (
                  <span className="px-2 py-0.5 bg-blue-500/20 text-blue-300 border border-blue-500/40 text-[9px] font-mono font-bold uppercase tracking-wider flex items-center gap-1">
                    <Smartphone className="w-3 h-3" /> Flutter App
                  </span>
                )}
                {project.tedxDetails && (
                  <span className="px-2 py-0.5 bg-red-500/20 text-red-300 border border-red-500/40 text-[9px] font-mono font-bold uppercase tracking-wider flex items-center gap-1">
                    <QrCode className="w-3 h-3" /> AppScript Web App
                  </span>
                )}
                {project.jevSnakeDetails && (
                  <span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[9px] font-mono font-bold uppercase tracking-wider flex items-center gap-1">
                    <Cpu className="w-3 h-3" /> TypeSafe JEV Agent
                  </span>
                )}
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white uppercase font-display tracking-tight leading-tight">
                {project.title}
              </h3>
            </div>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 text-zinc-300 hover:text-white bg-zinc-900/90 border border-zinc-750 hover:border-zinc-500 transition cursor-pointer shrink-0"
              id="btn-close-project-preview"
              aria-label="Close Preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Subtabs with Spring Indicator */}
        <div className="flex border-b border-zinc-850 bg-zinc-905 px-5 sm:px-7 pt-3 gap-4 overflow-x-auto">
          {[
            { id: 'overview', label: 'Overview & Highlights' },
            { id: 'architecture', label: 'Architecture & Tech Stack' },
            { id: 'features', label: 'Key Features & Outcomes' }
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as 'overview' | 'architecture' | 'features')}
                className={`relative pb-3 px-1 text-xs font-mono uppercase tracking-wider font-bold transition-colors cursor-pointer whitespace-nowrap ${
                  isActive ? 'text-white' : 'text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {tab.label}
                {isActive && (
                  <motion.span
                    layoutId="preview-modal-tab-underline"
                    transition={{ type: 'spring', stiffness: 450, damping: 34 }}
                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-zinc-100"
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Modal Body Content */}
        <div className="p-5 sm:p-7 max-h-[58vh] overflow-y-auto space-y-6 bg-zinc-950">
          <AnimatePresence mode="wait">
            {/* TAB 1: OVERVIEW */}
            {activeTab === 'overview' && (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                {/* Key Quick Highlight Metrics */}
                {project.isResearchPaper && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono">
                    <div className="p-3.5 lab-metric border border-zinc-800 border-t-2 border-t-emerald-400/70">
                      <span className="text-[9px] text-zinc-400 uppercase block">Training Speedup</span>
                      <span className="text-lg font-black text-emerald-400">1.63×</span>
                      <span className="text-[9px] text-zinc-300 block">+62.5% tok/s</span>
                    </div>
                    <div className="p-3.5 lab-metric border border-zinc-800 border-t-2 border-t-cyan-400/70">
                      <span className="text-[9px] text-zinc-400 uppercase block">Inference Speed</span>
                      <span className="text-lg font-black text-cyan-400">1.48×</span>
                      <span className="text-[9px] text-zinc-300 block">190.6 tok/s</span>
                    </div>
                    <div className="p-3.5 lab-metric border border-zinc-800 border-t-2 border-t-purple-400/70">
                      <span className="text-[9px] text-zinc-400 uppercase block">GPU VRAM</span>
                      <span className="text-lg font-black text-purple-400">-69.8%</span>
                      <span className="text-[9px] text-zinc-300 block">164.8 MB</span>
                    </div>
                    <div className="p-3.5 lab-metric border border-zinc-800 border-t-2 border-t-amber-400/70">
                      <span className="text-[9px] text-zinc-400 uppercase block">Dataset Scale</span>
                      <span className="text-lg font-black text-amber-400">819.2M</span>
                      <span className="text-[9px] text-zinc-300 block">Tokens</span>
                    </div>
                  </div>
                )}

                {project.translationDetails && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono">
                    <div className="p-3.5 lab-metric border border-zinc-800 border-t-2 border-t-emerald-400/70">
                      <span className="text-[9px] text-zinc-400 uppercase block">Encoder/Decoder</span>
                      <span className="text-lg font-black text-emerald-400">6 + 6</span>
                      <span className="text-[9px] text-zinc-300 block">Layers</span>
                    </div>
                    <div className="p-3.5 lab-metric border border-zinc-800 border-t-2 border-t-cyan-400/70">
                      <span className="text-[9px] text-zinc-400 uppercase block">Attention Heads</span>
                      <span className="text-lg font-black text-cyan-400">8 Heads</span>
                      <span className="text-[9px] text-zinc-300 block">d_model=256</span>
                    </div>
                    <div className="p-3.5 lab-metric border border-zinc-800 border-t-2 border-t-purple-400/70">
                      <span className="text-[9px] text-zinc-400 uppercase block">Corpus Size</span>
                      <span className="text-lg font-black text-purple-400">1,404</span>
                      <span className="text-[9px] text-zinc-300 block">Pairs</span>
                    </div>
                    <div className="p-3.5 lab-metric border border-zinc-800 border-t-2 border-t-amber-400/70">
                      <span className="text-[9px] text-zinc-400 uppercase block">Loss Drop</span>
                      <span className="text-lg font-black text-amber-400">7.4 → 3.0</span>
                      <span className="text-[9px] text-zinc-300 block">30 Epochs (M4)</span>
                    </div>
                  </div>
                )}

                {project.charBigramDetails && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono">
                    <div className="p-3.5 lab-metric border border-zinc-800 border-t-2 border-t-cyan-400/70">
                      <span className="text-[9px] text-zinc-400 uppercase block">Model Architecture</span>
                      <span className="text-lg font-black text-cyan-400">6 Layers</span>
                      <span className="text-[9px] text-zinc-300 block">6 Heads</span>
                    </div>
                    <div className="p-3.5 lab-metric border border-zinc-800 border-t-2 border-t-emerald-400/70">
                      <span className="text-[9px] text-zinc-400 uppercase block">Tokenizer</span>
                      <span className="text-lg font-black text-emerald-400">GPT-2 BPE</span>
                      <span className="text-[9px] text-zinc-300 block">50,257 Vocab</span>
                    </div>
                    <div className="p-3.5 lab-metric border border-zinc-800 border-t-2 border-t-purple-400/70">
                      <span className="text-[9px] text-zinc-400 uppercase block">Weight Tying</span>
                      <span className="text-lg font-black text-purple-400">Tied</span>
                      <span className="text-[9px] text-zinc-300 block">Embed = Head</span>
                    </div>
                    <div className="p-3.5 lab-metric border border-zinc-800 border-t-2 border-t-amber-400/70">
                      <span className="text-[9px] text-zinc-400 uppercase block">Training Time</span>
                      <span className="text-lg font-black text-amber-400">36 Min</span>
                      <span className="text-[9px] text-zinc-300 block">Tesla T4 GPU</span>
                    </div>
                  </div>
                )}

                {project.sinovateDetails && (
                  <>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono">
                      <div className="p-3.5 lab-metric border border-zinc-800 border-t-2 border-t-blue-400/70">
                        <span className="text-[9px] text-zinc-400 uppercase block">Client Stack</span>
                        <span className="text-lg font-black text-blue-400">Flutter</span>
                        <span className="text-[9px] text-zinc-300 block">iOS & Android</span>
                      </div>
                      <div className="p-3.5 lab-metric border border-zinc-800 border-t-2 border-t-emerald-400/70">
                        <span className="text-[9px] text-zinc-400 uppercase block">Backend API</span>
                        <span className="text-lg font-black text-emerald-400">FastAPI</span>
                        <span className="text-[9px] text-zinc-300 block">Async Python</span>
                      </div>
                      <div className="p-3.5 lab-metric border border-zinc-800 border-t-2 border-t-purple-400/70">
                        <span className="text-[9px] text-zinc-400 uppercase block">RAG Engine</span>
                        <span className="text-lg font-black text-purple-400">FAISS</span>
                        <span className="text-[9px] text-zinc-300 block">Vector Index</span>
                      </div>
                      <div className="p-3.5 lab-metric border border-zinc-800 border-t-2 border-t-amber-400/70">
                        <span className="text-[9px] text-zinc-400 uppercase block">AI Model</span>
                        <span className="text-lg font-black text-amber-400">GPT-4o</span>
                        <span className="text-[9px] text-zinc-300 block">LangChain</span>
                      </div>
                    </div>

                    {/* YouTube Video Player Embed */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-red-400 font-bold flex items-center gap-1.5">
                          <Play className="w-3 h-3 fill-current" /> Live Video Walkthrough
                        </span>
                        <a
                          href={project.sinovateDetails.youtubeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[10px] font-mono text-zinc-300 hover:text-white flex items-center gap-1"
                        >
                          <span>Open on YouTube</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <div className="relative w-full aspect-video bg-black border border-zinc-800 overflow-hidden shadow-xl">
                        <iframe
                          src={`https://www.youtube-nocookie.com/embed/${project.sinovateDetails.youtubeVideoId}?rel=0&modestbranding=1`}
                          title="SINOVATE Mobile App Walkthrough"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowFullScreen
                          className="absolute inset-0 w-full h-full border-0"
                        />
                      </div>
                    </div>
                  </>
                )}

                {project.diseaseTrackerDetails && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono">
                    <div className="p-3.5 lab-metric border border-zinc-800 border-t-2 border-t-rose-400/70">
                      <span className="text-[9px] text-zinc-400 uppercase block">Data Coverage</span>
                      <span className="text-lg font-black text-rose-400">25 Years</span>
                      <span className="text-[9px] text-zinc-300 block">2000 – 2025</span>
                    </div>
                    <div className="p-3.5 lab-metric border border-zinc-800 border-t-2 border-t-cyan-400/70">
                      <span className="text-[9px] text-zinc-400 uppercase block">Scope</span>
                      <span className="text-lg font-black text-cyan-400">10 × 6</span>
                      <span className="text-[9px] text-zinc-300 block">Countries × Diseases</span>
                    </div>
                    <div className="p-3.5 lab-metric border border-zinc-800 border-t-2 border-t-emerald-400/70">
                      <span className="text-[9px] text-zinc-400 uppercase block">ML Accuracy</span>
                      <span className="text-lg font-black text-emerald-400">R² ≥ 0.70+</span>
                      <span className="text-[9px] text-zinc-300 block">Polynomial Reg</span>
                    </div>
                    <div className="p-3.5 lab-metric border border-zinc-800 border-t-2 border-t-purple-400/70">
                      <span className="text-[9px] text-zinc-400 uppercase block">Total Dataset</span>
                      <span className="text-lg font-black text-purple-400">156k+</span>
                      <span className="text-[9px] text-zinc-300 block">60 CSV Files</span>
                    </div>
                  </div>
                )}

                {project.somunDetails && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono">
                    <div className="p-3.5 lab-metric border border-zinc-800 border-t-2 border-t-amber-400/70">
                      <span className="text-[9px] text-zinc-400 uppercase block">Conference</span>
                      <span className="text-lg font-black text-amber-400">SOMUN &apos;26</span>
                      <span className="text-[9px] text-zinc-300 block">Oct 30 – Nov 1</span>
                    </div>
                    <div className="p-3.5 lab-metric border border-zinc-800 border-t-2 border-t-blue-400/70">
                      <span className="text-[9px] text-zinc-400 uppercase block">Chambers</span>
                      <span className="text-lg font-black text-blue-400">12 Councils</span>
                      <span className="text-[9px] text-zinc-300 block">DISEC to MCU</span>
                    </div>
                    <div className="p-3.5 lab-metric border border-zinc-800 border-t-2 border-t-emerald-400/70">
                      <span className="text-[9px] text-zinc-400 uppercase block">Payment Flow</span>
                      <span className="text-lg font-black text-emerald-400">Dynamic UPI</span>
                      <span className="text-[9px] text-zinc-300 block">Zero-Fee Gateway</span>
                    </div>
                    <div className="p-3.5 lab-metric border border-zinc-800 border-t-2 border-t-purple-400/70">
                      <span className="text-[9px] text-zinc-400 uppercase block">Leadership</span>
                      <span className="text-lg font-black text-purple-400">Tech Head</span>
                      <span className="text-[9px] text-zinc-300 block">Official Portal</span>
                    </div>
                  </div>
                )}

                {project.jevSnakeDetails && (
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono">
                    <div className="p-3.5 lab-metric border border-zinc-800 border-t-2 border-t-emerald-400/70">
                      <span className="text-[9px] text-zinc-400 uppercase block">Model Brain</span>
                      <span className="text-lg font-black text-emerald-400">jev-latest</span>
                      <span className="text-[9px] text-zinc-300 block">OpenRouter System One</span>
                    </div>
                    <div className="p-3.5 lab-metric border border-zinc-800 border-t-2 border-t-cyan-400/70">
                      <span className="text-[9px] text-zinc-400 uppercase block">Decision Queue</span>
                      <span className="text-lg font-black text-cyan-400">Async Buffer</span>
                      <span className="text-[9px] text-zinc-300 block">Zero-Freeze Clock</span>
                    </div>
                    <div className="p-3.5 lab-metric border border-zinc-800 border-t-2 border-t-zinc-200/70">
                      <span className="text-[9px] text-zinc-400 uppercase block">Game Physics</span>
                      <span className="text-lg font-black text-white">25×25 (160ms)</span>
                      <span className="text-[9px] text-zinc-300 block">Relative Vocabulary</span>
                    </div>
                    <div className="p-3.5 lab-metric border border-zinc-800 border-t-2 border-t-red-400/70">
                      <span className="text-[9px] text-zinc-400 uppercase block">Observable Demo</span>
                      <span className="text-lg font-black text-red-400">YouTube</span>
                      <span className="text-[9px] text-zinc-300 block">YNtjOycLxgU</span>
                    </div>
                  </div>
                )}

                {/* Long Description */}
                <div className="p-4 lab-surface border border-zinc-850 space-y-2">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold block">
                    Project Summary & Motivation
                  </span>
                  <p className="text-zinc-200 font-sans text-sm leading-relaxed font-light">
                    {project.longDescription}
                  </p>
                </div>
              </motion.div>
            )}

            {/* TAB 2: ARCHITECTURE & TECH STACK */}
            {activeTab === 'architecture' && (
              <motion.div
                key="architecture"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="space-y-5"
              >
                <div className="space-y-2.5">
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold block">
                    Declared Tech Stack
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-200 uppercase tracking-wider"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Research Paper Architecture details */}
                {project.isResearchPaper && project.paperData && (
                  <div className="p-4 lab-surface border border-zinc-850 space-y-3 font-mono text-xs">
                    <span className="text-zinc-300 uppercase tracking-widest text-[10px] block font-bold">
                      Hardware & Benchmark Parameters
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-zinc-300 font-sans text-xs">
                      <div>• <strong className="text-white">GPU:</strong> {project.paperData.hardware.gpu}</div>
                      <div>• <strong className="text-white">Tokens:</strong> {project.paperData.dataset.totalTrainingTokens}</div>
                      <div>• <strong className="text-white">Blocks / Heads:</strong> {project.paperData.architecture.transformerBlocks} Blocks / {project.paperData.architecture.attentionHeads} Heads</div>
                      <div>• <strong className="text-white">Context Length:</strong> {project.paperData.architecture.contextLength} Tokens</div>
                    </div>
                  </div>
                )}

                {/* Seq2Seq details */}
                {project.translationDetails && (
                  <div className="p-4 lab-surface border border-zinc-850 space-y-3 font-mono text-xs">
                    <span className="text-zinc-300 uppercase tracking-widest text-[10px] block font-bold">
                      From-Scratch Layer Details
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-zinc-300 font-sans text-xs">
                      <div>• <strong className="text-white">Model:</strong> Vaswani et al. Transformer (No nn.Transformer)</div>
                      <div>• <strong className="text-white">Hardware:</strong> MacBook Air M4 CPU (30 Epochs)</div>
                      <div>• <strong className="text-white">Loss Progress:</strong> 7.42 → 3.003</div>
                      <div>• <strong className="text-white">Dataset:</strong> Soikat/opus_books (1,404 pairs)</div>
                    </div>
                  </div>
                )}

                {/* SINOVATE architecture details */}
                {project.sinovateDetails && (
                  <div className="p-4 lab-surface border border-zinc-850 space-y-3 font-mono text-xs">
                    <span className="text-zinc-300 uppercase tracking-widest text-[10px] block font-bold">
                      System Architecture Specification
                    </span>
                    <div className="space-y-1.5 text-zinc-300 font-sans text-xs">
                      <div>• <strong className="text-white">Mobile Client:</strong> {project.sinovateDetails.architecture.mobileClient}</div>
                      <div>• <strong className="text-white">Backend API:</strong> {project.sinovateDetails.architecture.backendApi}</div>
                      <div>• <strong className="text-white">Retrieval Layer:</strong> {project.sinovateDetails.architecture.retrieval}</div>
                      <div>• <strong className="text-white">AI Workflows:</strong> {project.sinovateDetails.architecture.aiWorkflows}</div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {/* TAB 3: FEATURES */}
            {activeTab === 'features' && (
              <motion.div
                key="features"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="space-y-4"
              >
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold block">
                  Key Features & Empirical Outcomes
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.features.map((feat, i) => (
                    <div key={i} className="p-3.5 lab-metric border border-zinc-850 text-xs text-zinc-200 flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span className="font-sans leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Modal Action Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-5 sm:px-7 border-t border-zinc-800 bg-zinc-905">
          {/* GitHub link if available */}
          <div>
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono text-zinc-300 hover:text-white transition"
              >
                <Github className="w-4 h-4" />
                <span>View Source Code on GitHub</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          {/* Primary Action Buttons */}
          <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white text-xs font-mono uppercase tracking-wider font-bold border border-zinc-750 transition cursor-pointer"
            >
              Close
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenFullProject(project);
              }}
              className="group px-5 py-2.5 bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-mono uppercase tracking-widest font-black transition flex items-center gap-2 cursor-pointer shadow-[0_0_25px_rgba(255,255,255,0.12)]"
              id="btn-open-full-project-exhibit"
            >
              <span>Explore Full Interactive Exhibit</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
