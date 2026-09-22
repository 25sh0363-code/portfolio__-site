import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, ExternalLink, Sparkles, BookOpen, Activity, Cpu, ArrowRight, Smartphone } from 'lucide-react';
import { PROJECTS } from '../data';
import { Project } from '../types';
import { fixAssetUrl } from '../utils/assets';
import ResearchPaperViewer from './ResearchPaperViewer';
import Seq2SeqInteractivePage from './project-details/Seq2SeqInteractivePage';
import CharBigramInteractivePage from './project-details/CharBigramInteractivePage';
import SinovateInteractivePage from './project-details/SinovateInteractivePage';
import DiseaseTrackerInteractivePage from './project-details/DiseaseTrackerInteractivePage';
import SomunInteractivePage from './project-details/SomunInteractivePage';
import TeachersDayInteractivePage from './project-details/TeachersDayInteractivePage';
import TedxInteractivePage from './project-details/TedxInteractivePage';
import GenericProjectInteractivePage from './project-details/GenericProjectInteractivePage';
import ProjectPreviewModal from './ProjectPreviewModal';

interface ProjectsProps {
  initialProjectId?: string | null;
  onClearProjectId?: () => void;
}

export default function Projects({ initialProjectId, onClearProjectId }: ProjectsProps) {
  const [activeProjectPage, setActiveProjectPage] = useState<Project | null>(null);
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  // Handle initial project selection from external navigation (e.g. Hero spotlight)
  useEffect(() => {
    if (initialProjectId) {
      const found = PROJECTS.find(p => p.id === initialProjectId);
      if (found) {
        setPreviewProject(found);
      }
    }
  }, [initialProjectId]);

  // Scroll to top whenever an exhibit page is opened or closed
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [activeProjectPage]);

  const handleCardClick = (project: Project) => {
    setPreviewProject(project);
  };

  const handleOpenFullExhibit = (project: Project) => {
    setPreviewProject(null);
    setActiveProjectPage(project);
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  const handleBackToProjects = () => {
    setActiveProjectPage(null);
    onClearProjectId?.();
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  };

  // If a dedicated project page is active, render its full-screen interactive exhibit!
  if (activeProjectPage) {
    if (activeProjectPage.somunDetails || activeProjectPage.id === 'somun-2026') {
      return <SomunInteractivePage onBack={handleBackToProjects} />;
    }
    if (activeProjectPage.isResearchPaper || activeProjectPage.id === 'native-cpp-transformer') {
      return <ResearchPaperViewer onBack={handleBackToProjects} />;
    }
    if (activeProjectPage.translationDetails || activeProjectPage.id === 'seq2seq-translation-transformer') {
      return <Seq2SeqInteractivePage onBack={handleBackToProjects} />;
    }
    if (activeProjectPage.charBigramDetails || activeProjectPage.id === 'char-level-bigram-model') {
      return <CharBigramInteractivePage onBack={handleBackToProjects} />;
    }
    if (activeProjectPage.sinovateDetails || activeProjectPage.id === 'sinovate-school-assistant') {
      return <SinovateInteractivePage onBack={handleBackToProjects} />;
    }
    if (activeProjectPage.diseaseTrackerDetails || activeProjectPage.id === 'global-disease-tracker-pro') {
      return <DiseaseTrackerInteractivePage onBack={handleBackToProjects} />;
    }
    if (activeProjectPage.tedxDetails || activeProjectPage.id === 'tedx-checkin-system') {
      return <TedxInteractivePage onBack={handleBackToProjects} />;
    }
    if (activeProjectPage.id === 'teachers-day-class-act') {
      return <TeachersDayInteractivePage onBack={handleBackToProjects} />;
    }
    return <GenericProjectInteractivePage project={activeProjectPage} onBack={handleBackToProjects} />;
  }

  const categories = ['All', 'Full-Stack', 'AI & Data Science', 'Systems & Mobile', 'Web App'];

  const filteredProjects = activeFilter === 'All'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter);

  return (
    <section className="py-12 relative text-left" id="projects-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6 border-b border-zinc-900 pb-10">
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-mono font-bold block">Consolidated Exhibits</span>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter uppercase font-display select-none">
              Engineering Lab
            </h2>
            <p className="text-zinc-400 max-w-xl text-sm leading-relaxed font-light">
              Interactive deep learning systems, mobile AI applications, and empirical benchmarks built for maximum rigor and performance. Click any project to open its preview and interactive exhibit.
            </p>
          </div>

          {/* Dynamic Filter Tabs */}
          <div className="flex flex-wrap gap-1 border border-zinc-800 bg-zinc-950 p-1 rounded-none w-fit shrink-0">
            {categories.map((cat) => (
              <button
                key={cat}
                id={`filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setActiveFilter(cat)}
                className={`px-3 py-2 text-[10px] uppercase tracking-wider font-bold transition-all cursor-pointer rounded-none font-mono ${
                  activeFilter === cat
                    ? 'bg-zinc-100 text-zinc-950 font-black'
                    : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className={`group relative flex flex-col justify-between bg-zinc-905 border ${
                  project.isResearchPaper ? 'border-zinc-700 hover:border-zinc-300' : 'border-zinc-850 hover:border-zinc-500'
                } rounded-none overflow-hidden transition-colors text-left cursor-pointer`}
                onClick={() => handleCardClick(project)}
                id={`project-card-${project.id}`}
              >
                {/* Core content wrapper */}
                <div>
                  {/* Thumbnail Banner */}
                  <div className="relative aspect-video overflow-hidden bg-zinc-950 border-b border-zinc-900">
                    <div className="absolute inset-0 bg-zinc-950/40 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    <img 
                      src={fixAssetUrl(project.image)} 
                      alt={project.title}
                      className="w-full h-full object-cover filter grayscale contrast-110 group-hover:grayscale-0 transition-all duration-700"
                      referrerPolicy="no-referrer"
                    />
                    
                    {/* Top Badges */}
                    <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                      {project.isResearchPaper ? (
                        <div className="bg-zinc-100 text-zinc-950 px-2.5 py-1 text-[9px] font-mono font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                          <BookOpen className="w-3 h-3" />
                          Original Research Paper
                        </div>
                      ) : project.translationDetails ? (
                        <div className="bg-zinc-100 text-zinc-950 px-2.5 py-1 text-[9px] font-mono font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                          <Activity className="w-3 h-3" />
                          Deep Seq2Seq Model
                        </div>
                      ) : project.charBigramDetails ? (
                        <div className="bg-zinc-100 text-zinc-950 px-2.5 py-1 text-[9px] font-mono font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                          <Cpu className="w-3 h-3" />
                          Generative LM Study
                        </div>
                      ) : project.sinovateDetails ? (
                        <div className="bg-blue-500/20 text-blue-300 border border-blue-500/40 px-2.5 py-1 text-[9px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-md">
                          <Smartphone className="w-3 h-3" />
                          Flutter + FastAPI App
                        </div>
                      ) : (
                        <div className="bg-zinc-900/80 text-zinc-300 px-2.5 py-1 text-[9px] font-mono uppercase tracking-wider flex items-center gap-1.5 border border-zinc-800">
                          <Sparkles className="w-3 h-3 text-cyan-400" />
                          Interactive App
                        </div>
                      )}

                      <div className="bg-zinc-950 border border-zinc-800 px-2 py-1 text-[9px] font-mono text-zinc-400 uppercase tracking-widest">
                        {project.category}
                      </div>
                    </div>

                    {/* Bottom Stat Tags */}
                    {project.isResearchPaper && (
                      <div className="absolute bottom-3 left-4 right-4 z-20 flex gap-2">
                        <span className="px-2 py-0.5 bg-zinc-950/90 text-emerald-400 border border-emerald-900/60 text-[9px] font-mono font-bold">
                          1.63× Speedup
                        </span>
                        <span className="px-2 py-0.5 bg-zinc-950/90 text-cyan-400 border border-cyan-900/60 text-[9px] font-mono font-bold">
                          69.8% VRAM Saved
                        </span>
                      </div>
                    )}

                    {project.translationDetails && (
                      <div className="absolute bottom-3 left-4 right-4 z-20 flex gap-2">
                        <span className="px-2 py-0.5 bg-zinc-950/90 text-emerald-400 border border-emerald-900/60 text-[9px] font-mono font-bold">
                          30 Epochs (M4)
                        </span>
                        <span className="px-2 py-0.5 bg-zinc-950/90 text-cyan-400 border border-cyan-900/60 text-[9px] font-mono font-bold">
                          7.42 → 3.00 Loss
                        </span>
                      </div>
                    )}

                    {project.charBigramDetails && (
                      <div className="absolute bottom-3 left-4 right-4 z-20 flex gap-2">
                        <span className="px-2 py-0.5 bg-zinc-950/90 text-cyan-400 border border-cyan-900/60 text-[9px] font-mono font-bold">
                          GPT-2 BPE Vocab
                        </span>
                        <span className="px-2 py-0.5 bg-zinc-950/90 text-emerald-400 border border-emerald-900/60 text-[9px] font-mono font-bold">
                          36 Min (T4 GPU)
                        </span>
                      </div>
                    )}

                    {project.sinovateDetails && (
                      <div className="absolute bottom-3 left-4 right-4 z-20 flex gap-2">
                        <span className="px-2 py-0.5 bg-zinc-950/90 text-blue-400 border border-blue-900/60 text-[9px] font-mono font-bold">
                          FAISS RAG Tutor
                        </span>
                        <span className="px-2 py-0.5 bg-zinc-950/90 text-emerald-400 border border-emerald-900/60 text-[9px] font-mono font-bold">
                          Worksheet Studio
                        </span>
                      </div>
                    )}

                    {project.diseaseTrackerDetails && (
                      <div className="absolute bottom-3 left-4 right-4 z-20 flex gap-2">
                        <span className="px-2 py-0.5 bg-zinc-950/90 text-rose-400 border border-rose-900/60 text-[9px] font-mono font-bold">
                          10 Countries (25 Yrs)
                        </span>
                        <span className="px-2 py-0.5 bg-zinc-950/90 text-cyan-400 border border-cyan-900/60 text-[9px] font-mono font-bold">
                          Polynomial ML
                        </span>
                      </div>
                    )}

                    {project.somunDetails && (
                      <div className="absolute bottom-3 left-4 right-4 z-20 flex gap-2">
                        <span className="px-2 py-0.5 bg-zinc-950/90 text-amber-400 border border-amber-900/60 text-[9px] font-mono font-bold">
                          12 Chambers
                        </span>
                        <span className="px-2 py-0.5 bg-zinc-950/90 text-emerald-400 border border-emerald-900/60 text-[9px] font-mono font-bold">
                          Tech Head
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Body textuals */}
                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-extrabold text-zinc-50 font-display group-hover:text-white transition-colors uppercase leading-none">
                      {project.title}
                    </h3>
                    <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3 font-light font-sans">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Footer specs */}
                <div className="px-6 pb-6 pt-2 space-y-4">
                  {/* Tech stack top row */}
                  <div className="flex flex-wrap gap-1">
                    {project.techStack.slice(0, 3).map((tech, idx) => (
                      <span 
                        key={idx} 
                        className="px-2 py-0.5 bg-zinc-900 text-zinc-400 rounded-none font-mono text-[9px] border border-zinc-800 uppercase tracking-wider"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.techStack.length > 3 && (
                      <span className="px-2 py-0.5 bg-zinc-900 text-zinc-500 rounded-none font-mono text-[9px] border border-zinc-800 uppercase">
                        +{project.techStack.length - 3} More
                      </span>
                    )}
                  </div>

                  {/* Action Link Row */}
                  <div className="flex items-center justify-between pt-4 border-t border-zinc-900">
                    <span className="text-[10px] uppercase tracking-wider text-zinc-100 font-mono flex items-center gap-1.5 font-bold group-hover:text-white transition-colors">
                      Preview Project Details
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 duration-300 transform" />
                    </span>

                    <div className="flex gap-1.5" onClick={(e) => e.stopPropagation()}>
                      {project.githubLink && (
                        <a
                          href={project.githubLink}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 rounded-none transition-colors"
                          title="View Source on GitHub"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {project.liveLink && !project.isResearchPaper && (
                        <a
                          href={project.liveLink}
                          target="_blank"
                          rel="noreferrer"
                          className="p-2 text-zinc-400 hover:text-zinc-50 bg-zinc-900 border border-zinc-800 rounded-none transition-colors"
                          title="Open External Demonstration / Video"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

      </div>

      {/* Project Preview Modal */}
      <AnimatePresence>
        {previewProject && (
          <ProjectPreviewModal
            project={previewProject}
            onClose={() => setPreviewProject(null)}
            onOpenFullProject={handleOpenFullExhibit}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
