import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, ExternalLink, Github, ArrowRight, Sparkles, BookOpen, Activity, 
  Cpu, Layers, CheckCircle2, Terminal, Play, HardDrive, Zap, Smartphone
} from 'lucide-react';
import { Project } from '../types';

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

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 pt-16 sm:pt-12 bg-zinc-950/80 backdrop-blur-md overflow-y-auto no-print"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-3xl bg-zinc-950 border border-zinc-700 shadow-2xl overflow-hidden my-auto text-left"
        onClick={(e) => e.stopPropagation()}
        id="project-preview-modal"
      >
        {/* Modal Header */}
        <div className="flex items-start justify-between p-5 sm:p-6 border-b border-zinc-800 bg-zinc-900/60">
          <div className="space-y-1.5 pr-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2 py-0.5 bg-zinc-800 border border-zinc-700 text-zinc-300 text-[9px] font-mono uppercase tracking-widest">
                {project.category}
              </span>
              {project.isResearchPaper && (
                <span className="px-2 py-0.5 bg-zinc-100 text-zinc-950 text-[9px] font-mono font-black uppercase tracking-wider flex items-center gap-1">
                  <BookOpen className="w-3 h-3" /> Original Research
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
            </div>

            <h3 className="text-xl sm:text-2xl font-black text-white uppercase font-display tracking-tight leading-tight">
              {project.title}
            </h3>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="p-2 text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition cursor-pointer shrink-0"
            id="btn-close-project-preview"
            aria-label="Close Preview"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Subtabs */}
        <div className="flex border-b border-zinc-800 bg-zinc-950 px-5 sm:px-6 pt-3 gap-2">
          {[
            { id: 'overview', label: 'Overview & Highlights' },
            { id: 'architecture', label: 'Architecture & Tech Stack' },
            { id: 'features', label: 'Key Features & Outcomes' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`pb-2.5 px-2 text-xs font-mono uppercase tracking-wider font-bold transition-all cursor-pointer border-b-2 ${
                activeTab === tab.id
                  ? 'border-zinc-100 text-zinc-50'
                  : 'border-transparent text-zinc-400 hover:text-zinc-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Body Content */}
        <div className="p-5 sm:p-6 max-h-[60vh] overflow-y-auto space-y-6">
          
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-5">
              
              {/* Key Quick Highlight Metrics */}
              {project.isResearchPaper && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono">
                  <div className="p-3 bg-zinc-900/80 border border-zinc-800">
                    <span className="text-[9px] text-zinc-500 uppercase block">Training Speedup</span>
                    <span className="text-lg font-black text-emerald-400">1.63×</span>
                    <span className="text-[9px] text-zinc-400 block">+62.5% tok/s</span>
                  </div>
                  <div className="p-3 bg-zinc-900/80 border border-zinc-800">
                    <span className="text-[9px] text-zinc-500 uppercase block">Inference Speed</span>
                    <span className="text-lg font-black text-cyan-400">1.48×</span>
                    <span className="text-[9px] text-zinc-400 block">190.6 tok/s</span>
                  </div>
                  <div className="p-3 bg-zinc-900/80 border border-zinc-800">
                    <span className="text-[9px] text-zinc-500 uppercase block">GPU VRAM</span>
                    <span className="text-lg font-black text-purple-400">-69.8%</span>
                    <span className="text-[9px] text-zinc-400 block">164.8 MB</span>
                  </div>
                  <div className="p-3 bg-zinc-900/80 border border-zinc-800">
                    <span className="text-[9px] text-zinc-500 uppercase block">Dataset Scale</span>
                    <span className="text-lg font-black text-amber-400">819.2M</span>
                    <span className="text-[9px] text-zinc-400 block">Tokens</span>
                  </div>
                </div>
              )}

              {project.translationDetails && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono">
                  <div className="p-3 bg-zinc-900/80 border border-zinc-800">
                    <span className="text-[9px] text-zinc-500 uppercase block">Encoder/Decoder</span>
                    <span className="text-lg font-black text-emerald-400">6 + 6</span>
                    <span className="text-[9px] text-zinc-400 block">Layers</span>
                  </div>
                  <div className="p-3 bg-zinc-900/80 border border-zinc-800">
                    <span className="text-[9px] text-zinc-500 uppercase block">Attention Heads</span>
                    <span className="text-lg font-black text-cyan-400">8 Heads</span>
                    <span className="text-[9px] text-zinc-400 block">d_model=256</span>
                  </div>
                  <div className="p-3 bg-zinc-900/80 border border-zinc-800">
                    <span className="text-[9px] text-zinc-500 uppercase block">Corpus Size</span>
                    <span className="text-lg font-black text-purple-400">1,404</span>
                    <span className="text-[9px] text-zinc-400 block">Pairs</span>
                  </div>
                  <div className="p-3 bg-zinc-900/80 border border-zinc-800">
                    <span className="text-[9px] text-zinc-500 uppercase block">Loss Drop</span>
                    <span className="text-lg font-black text-amber-400">7.4 → 3.0</span>
                    <span className="text-[9px] text-zinc-400 block">30 Epochs (M4)</span>
                  </div>
                </div>
              )}

              {project.charBigramDetails && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono">
                  <div className="p-3 bg-zinc-900/80 border border-zinc-800">
                    <span className="text-[9px] text-zinc-500 uppercase block">Model Architecture</span>
                    <span className="text-lg font-black text-cyan-400">6 Layers</span>
                    <span className="text-[9px] text-zinc-400 block">6 Heads</span>
                  </div>
                  <div className="p-3 bg-zinc-900/80 border border-zinc-800">
                    <span className="text-[9px] text-zinc-500 uppercase block">Tokenizer</span>
                    <span className="text-lg font-black text-emerald-400">GPT-2 BPE</span>
                    <span className="text-[9px] text-zinc-400 block">50,257 Vocab</span>
                  </div>
                  <div className="p-3 bg-zinc-900/80 border border-zinc-800">
                    <span className="text-[9px] text-zinc-500 uppercase block">Weight Tying</span>
                    <span className="text-lg font-black text-purple-400">Tied</span>
                    <span className="text-[9px] text-zinc-400 block">Embed = Head</span>
                  </div>
                  <div className="p-3 bg-zinc-900/80 border border-zinc-800">
                    <span className="text-[9px] text-zinc-500 uppercase block">Training Time</span>
                    <span className="text-lg font-black text-amber-400">36 Min</span>
                    <span className="text-[9px] text-zinc-400 block">Tesla T4 GPU</span>
                  </div>
                </div>
              )}

              {project.sinovateDetails && (
                <>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono">
                    <div className="p-3 bg-zinc-900/80 border border-zinc-800">
                      <span className="text-[9px] text-zinc-500 uppercase block">Client Stack</span>
                      <span className="text-lg font-black text-blue-400">Flutter</span>
                      <span className="text-[9px] text-zinc-400 block">iOS & Android</span>
                    </div>
                    <div className="p-3 bg-zinc-900/80 border border-zinc-800">
                      <span className="text-[9px] text-zinc-500 uppercase block">Backend API</span>
                      <span className="text-lg font-black text-emerald-400">FastAPI</span>
                      <span className="text-[9px] text-zinc-400 block">Async Python</span>
                    </div>
                    <div className="p-3 bg-zinc-900/80 border border-zinc-800">
                      <span className="text-[9px] text-zinc-500 uppercase block">RAG Engine</span>
                      <span className="text-lg font-black text-purple-400">FAISS</span>
                      <span className="text-[9px] text-zinc-400 block">Vector Index</span>
                    </div>
                    <div className="p-3 bg-zinc-900/80 border border-zinc-800">
                      <span className="text-[9px] text-zinc-500 uppercase block">AI Model</span>
                      <span className="text-lg font-black text-amber-400">GPT-4o</span>
                      <span className="text-[9px] text-zinc-400 block">LangChain</span>
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
                        className="text-[10px] font-mono text-zinc-400 hover:text-white flex items-center gap-1"
                      >
                        <span>Open on YouTube</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <div className="relative w-full aspect-video bg-black border border-zinc-800 overflow-hidden shadow-lg">
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
                  <div className="p-3 bg-zinc-900/80 border border-zinc-800">
                    <span className="text-[9px] text-zinc-500 uppercase block">Data Coverage</span>
                    <span className="text-lg font-black text-rose-400">25 Years</span>
                    <span className="text-[9px] text-zinc-400 block">2000 – 2025</span>
                  </div>
                  <div className="p-3 bg-zinc-900/80 border border-zinc-800">
                    <span className="text-[9px] text-zinc-500 uppercase block">Scope</span>
                    <span className="text-lg font-black text-cyan-400">10 × 6</span>
                    <span className="text-[9px] text-zinc-400 block">Countries × Diseases</span>
                  </div>
                  <div className="p-3 bg-zinc-900/80 border border-zinc-800">
                    <span className="text-[9px] text-zinc-500 uppercase block">ML Accuracy</span>
                    <span className="text-lg font-black text-emerald-400">R² ≥ 0.70+</span>
                    <span className="text-[9px] text-zinc-400 block">Polynomial Reg</span>
                  </div>
                  <div className="p-3 bg-zinc-900/80 border border-zinc-800">
                    <span className="text-[9px] text-zinc-500 uppercase block">Total Dataset</span>
                    <span className="text-lg font-black text-purple-400">156k+</span>
                    <span className="text-[9px] text-zinc-400 block">60 CSV Files</span>
                  </div>
                </div>
              )}

              {project.somunDetails && (
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 font-mono">
                  <div className="p-3 bg-zinc-900/80 border border-zinc-800">
                    <span className="text-[9px] text-zinc-500 uppercase block">Conference</span>
                    <span className="text-lg font-black text-amber-400">SOMUN '26</span>
                    <span className="text-[9px] text-zinc-400 block">Oct 30 – Nov 1</span>
                  </div>
                  <div className="p-3 bg-zinc-900/80 border border-zinc-800">
                    <span className="text-[9px] text-zinc-500 uppercase block">Chambers</span>
                    <span className="text-lg font-black text-blue-400">12 Councils</span>
                    <span className="text-[9px] text-zinc-400 block">DISEC to MCU</span>
                  </div>
                  <div className="p-3 bg-zinc-900/80 border border-zinc-800">
                    <span className="text-[9px] text-zinc-500 uppercase block">Payment Flow</span>
                    <span className="text-lg font-black text-emerald-400">Dynamic UPI</span>
                    <span className="text-[9px] text-zinc-400 block">Zero-Fee Gateway</span>
                  </div>
                  <div className="p-3 bg-zinc-900/80 border border-zinc-800">
                    <span className="text-[9px] text-zinc-500 uppercase block">Leadership</span>
                    <span className="text-lg font-black text-purple-400">Tech Head</span>
                    <span className="text-[9px] text-zinc-400 block">Official Portal</span>
                  </div>
                </div>
              )}

              {/* Long Description */}
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold block">
                  Project Summary & Motivation
                </span>
                <p className="text-zinc-300 font-sans text-sm leading-relaxed font-light">
                  {project.longDescription}
                </p>
              </div>

            </div>
          )}

          {/* TAB 2: ARCHITECTURE & TECH STACK */}
          {activeTab === 'architecture' && (
            <div className="space-y-5">
              <div className="space-y-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold block">
                  Declared Tech Stack
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {project.techStack.map((tech, i) => (
                    <span 
                      key={i}
                      className="px-2.5 py-1 bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 uppercase tracking-wider"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Research Paper Architecture details */}
              {project.isResearchPaper && project.paperData && (
                <div className="p-4 bg-zinc-900/50 border border-zinc-850 space-y-3 font-mono text-xs">
                  <span className="text-zinc-400 uppercase tracking-widest text-[10px] block font-bold">
                    Hardware & Benchmark Parameters
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-300 font-sans text-xs">
                    <div>• <strong>GPU:</strong> {project.paperData.hardware.gpu}</div>
                    <div>• <strong>Tokens:</strong> {project.paperData.dataset.totalTrainingTokens}</div>
                    <div>• <strong>Blocks / Heads:</strong> {project.paperData.architecture.transformerBlocks} Blocks / {project.paperData.architecture.attentionHeads} Heads</div>
                    <div>• <strong>Context Length:</strong> {project.paperData.architecture.contextLength} Tokens</div>
                  </div>
                </div>
              )}

              {/* Seq2Seq details */}
              {project.translationDetails && (
                <div className="p-4 bg-zinc-900/50 border border-zinc-850 space-y-3 font-mono text-xs">
                  <span className="text-zinc-400 uppercase tracking-widest text-[10px] block font-bold">
                    From-Scratch Layer Details
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-zinc-300 font-sans text-xs">
                    <div>• <strong>Model:</strong> Vaswani et al. Transformer (No nn.Transformer)</div>
                    <div>• <strong>Hardware:</strong> MacBook Air M4 CPU (30 Epochs)</div>
                    <div>• <strong>Loss Progress:</strong> 7.42 → 3.003</div>
                    <div>• <strong>Dataset:</strong> Soikat/opus_books (1,404 pairs)</div>
                  </div>
                </div>
              )}

              {/* SINOVATE architecture details */}
              {project.sinovateDetails && (
                <div className="p-4 bg-zinc-900/50 border border-zinc-850 space-y-3 font-mono text-xs">
                  <span className="text-zinc-400 uppercase tracking-widest text-[10px] block font-bold">
                    System Architecture Specification
                  </span>
                  <div className="space-y-1.5 text-zinc-300 font-sans text-xs">
                    <div>• <strong>Mobile Client:</strong> {project.sinovateDetails.architecture.mobileClient}</div>
                    <div>• <strong>Backend API:</strong> {project.sinovateDetails.architecture.backendApi}</div>
                    <div>• <strong>Retrieval Layer:</strong> {project.sinovateDetails.architecture.retrieval}</div>
                    <div>• <strong>AI Workflows:</strong> {project.sinovateDetails.architecture.aiWorkflows}</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: FEATURES */}
          {activeTab === 'features' && (
            <div className="space-y-4">
              <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold block">
                Key Features & Empirical Outcomes
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {project.features.map((feat, i) => (
                  <div key={i} className="p-3 bg-zinc-900/60 border border-zinc-850 text-xs text-zinc-300 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="font-sans leading-relaxed">{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Action Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-5 sm:p-6 border-t border-zinc-800 bg-zinc-900/80">
          
          {/* GitHub link if available */}
          <div>
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-white transition"
              >
                <Github className="w-4 h-4" />
                <span>View Source Code on GitHub</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>

          {/* Primary Action Buttons */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-mono uppercase tracking-wider font-bold border border-zinc-750 transition cursor-pointer"
            >
              Close
            </button>

            <button
              onClick={() => {
                onClose();
                onOpenFullProject(project);
              }}
              className="px-5 py-2.5 bg-zinc-100 hover:bg-white text-zinc-950 text-xs font-mono uppercase tracking-widest font-black transition flex items-center gap-2 cursor-pointer shadow-lg hover:shadow-zinc-100/10"
              id="btn-open-full-project-exhibit"
            >
              <span>Explore Full Interactive Exhibit</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </motion.div>
    </div>
  );
}
