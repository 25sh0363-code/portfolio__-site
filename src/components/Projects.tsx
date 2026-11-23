import { useState, useEffect, MouseEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, ExternalLink, Sparkles, BookOpen, Activity, Cpu, ArrowRight, Smartphone, Building2, ArrowUpRight } from 'lucide-react';
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
import JevSnakeInteractivePage from './project-details/JevSnakeInteractivePage';
import CareerLabInteractivePage from './project-details/CareerLabInteractivePage';
import IvyInteractivePage from './project-details/IvyInteractivePage';
import GenericProjectInteractivePage from './project-details/GenericProjectInteractivePage';
import ProjectPreviewModal from './ProjectPreviewModal';
import { CornerReticles } from './project-details/ExhibitPrimitives';

interface ProjectsProps {
  initialProjectId?: string | null;
  onClearProjectId?: () => void;
}

function getProjectAccent(project: Project): {
  topLine: string;
  spotlight: string;
  reticle: string;
} {
  if (project.isResearchPaper) {
    return {
      topLine: 'from-transparent via-emerald-400/70 to-transparent',
      spotlight: 'rgba(16, 185, 129, 0.11)',
      reticle: 'border-zinc-400/50 group-hover:border-emerald-400'
    };
  }
  if (project.careerLabDetails) {
    return {
      topLine: 'from-transparent via-cyan-400/70 to-transparent',
      spotlight: 'rgba(34, 211, 238, 0.11)',
      reticle: 'border-zinc-600/50 group-hover:border-cyan-400'
    };
  }
  if (project.ivyTutorDetails) {
    return {
      topLine: 'from-transparent via-purple-400/70 to-transparent',
      spotlight: 'rgba(168, 85, 247, 0.12)',
      reticle: 'border-zinc-600/50 group-hover:border-purple-400'
    };
  }
  if (project.sinovateDetails) {
    return {
      topLine: 'from-transparent via-blue-400/70 to-transparent',
      spotlight: 'rgba(59, 130, 246, 0.11)',
      reticle: 'border-zinc-600/50 group-hover:border-blue-400'
    };
  }
  if (project.diseaseTrackerDetails) {
    return {
      topLine: 'from-transparent via-rose-400/70 to-transparent',
      spotlight: 'rgba(244, 63, 94, 0.11)',
      reticle: 'border-zinc-600/50 group-hover:border-rose-400'
    };
  }
  if (project.somunDetails) {
    return {
      topLine: 'from-transparent via-amber-400/70 to-transparent',
      spotlight: 'rgba(251, 191, 36, 0.10)',
      reticle: 'border-zinc-600/50 group-hover:border-amber-400'
    };
  }
  if (project.jevSnakeDetails) {
    return {
      topLine: 'from-transparent via-emerald-400/70 to-transparent',
      spotlight: 'rgba(16, 185, 129, 0.11)',
      reticle: 'border-zinc-600/50 group-hover:border-emerald-400'
    };
  }
  if (project.tedxDetails) {
    return {
      topLine: 'from-transparent via-red-400/70 to-transparent',
      spotlight: 'rgba(239, 68, 68, 0.10)',
      reticle: 'border-zinc-600/50 group-hover:border-red-400'
    };
  }
  return {
    topLine: 'from-transparent via-zinc-300/60 to-transparent',
    spotlight: 'rgba(244, 244, 245, 0.08)',
    reticle: 'border-zinc-600/50 group-hover:border-zinc-200'
  };
}

interface ProjectCardProps {
  key?: string | number;
  project: Project;
  index: number;
  onClick: () => void;
}

function ProjectCard({ project, index, onClick }: ProjectCardProps) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0, active: false });
  const accent = getProjectAccent(project);
  const exhibitNumber = String(index + 1).padStart(2, '0');

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true
    });
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setMousePos(prev => ({ ...prev, active: false }))}
      className={`group relative flex flex-col justify-between lab-surface border ${
        project.isResearchPaper
          ? 'border-zinc-700 hover:border-zinc-300'
          : 'border-zinc-850 hover:border-zinc-500'
      } rounded-none overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-20px_rgba(0,0,0,0.95)] text-left cursor-pointer`}
      onClick={onClick}
      id={`project-card-${project.id}`}
    >
      {/* Top specular accent hairline */}
      <div className={`absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r ${accent.topLine} opacity-60 group-hover:opacity-100 transition-opacity duration-500 z-30`} />

      {/* Dynamic pointer-tracking obsidian spotlight */}
      <div
        className="pointer-events-none absolute inset-0 z-10 transition-opacity duration-500"
        style={{
          opacity: mousePos.active ? 1 : 0,
          background: `radial-gradient(460px circle at ${mousePos.x}px ${mousePos.y}px, ${accent.spotlight}, transparent 60%)`
        }}
      />

      {/* Precision 4-corner architectural reticles */}
      <CornerReticles colorClass={accent.reticle} />

      {/* Core content wrapper */}
      <div className="relative z-20">
        {/* Thumbnail Banner */}
        <div className="relative aspect-video overflow-hidden bg-zinc-950 border-b border-zinc-850">
          {/* Dark vignette & bottom scrim for ultra-crisp badge readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/35 to-zinc-950/30 group-hover:via-zinc-950/15 group-hover:to-transparent transition-all duration-500 z-10" />

          <img
            src={fixAssetUrl(project.image)}
            alt={project.title}
            className="w-full h-full object-cover filter grayscale contrast-115 group-hover:grayscale-0 group-hover:contrast-105 group-hover:scale-105 transition-all duration-700 ease-out"
            referrerPolicy="no-referrer"
          />

          {/* Subtle center hover cue */}
          <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="px-3.5 py-1.5 bg-zinc-950/85 backdrop-blur-md border border-zinc-600/80 text-[11px] font-mono font-bold uppercase tracking-widest text-white flex items-center gap-1.5 shadow-2xl translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
              <span>Inspect Exhibit</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </div>
          </div>

          {/* Top Badges */}
          <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between gap-2 z-20">
            {project.isResearchPaper ? (
              <div className="bg-zinc-100 text-zinc-950 px-2.5 py-1 text-[11px] font-mono font-black uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                <BookOpen className="w-3 h-3" />
                Original Research Paper
              </div>
            ) : project.careerLabDetails ? (
              <div className="bg-zinc-950/85 backdrop-blur-md text-cyan-300 border border-cyan-500/40 px-2.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                <Building2 className="w-3 h-3" />
                Multi-Campus Platform
              </div>
            ) : project.ivyTutorDetails ? (
              <div className="bg-zinc-950/85 backdrop-blur-md text-purple-300 border border-purple-500/40 px-2.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                <Cpu className="w-3 h-3" />
                ESP32-S3 Hardware Tutor
              </div>
            ) : project.translationDetails ? (
              <div className="bg-zinc-100 text-zinc-950 px-2.5 py-1 text-[11px] font-mono font-black uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                <Activity className="w-3 h-3" />
                Deep Seq2Seq Model
              </div>
            ) : project.charBigramDetails ? (
              <div className="bg-zinc-100 text-zinc-950 px-2.5 py-1 text-[11px] font-mono font-black uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                <Cpu className="w-3 h-3" />
                Generative LM Study
              </div>
            ) : project.sinovateDetails ? (
              <div className="bg-zinc-950/85 backdrop-blur-md text-blue-300 border border-blue-500/40 px-2.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                <Smartphone className="w-3 h-3" />
                Flutter + FastAPI App
              </div>
            ) : project.jevSnakeDetails ? (
              <div className="bg-zinc-950/85 backdrop-blur-md text-emerald-300 border border-emerald-500/40 px-2.5 py-1 text-[11px] font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-lg">
                <Cpu className="w-3 h-3" />
                OpenRouter System One
              </div>
            ) : (
              <div className="bg-zinc-950/85 backdrop-blur-md text-zinc-200 px-2.5 py-1 text-[11px] font-mono uppercase tracking-wider flex items-center gap-1.5 border border-zinc-750 shadow-lg">
                <Sparkles className="w-3 h-3 text-cyan-400" />
                Interactive App
              </div>
            )}

            <div className="flex items-center gap-1.5">
              <span className="bg-zinc-950/90 backdrop-blur-md border border-zinc-800 px-2 py-1 text-[10px] font-mono text-zinc-300 uppercase tracking-widest">
                {project.category}
              </span>
              <span className="bg-zinc-950/90 backdrop-blur-md border border-zinc-800 px-1.5 py-1 text-[10px] font-mono font-bold text-zinc-400 group-hover:text-white transition-colors">
                #{exhibitNumber}
              </span>
            </div>
          </div>

          {/* Bottom Stat Tags */}
          {project.isResearchPaper && (
            <div className="absolute bottom-3 left-3.5 right-3.5 z-20 flex flex-wrap gap-2">
              <span className="px-2.5 py-0.5 bg-zinc-950/90 backdrop-blur-sm text-emerald-400 border border-emerald-500/40 text-[11px] font-mono font-bold shadow">
                1.63× Speedup
              </span>
              <span className="px-2.5 py-0.5 bg-zinc-950/90 backdrop-blur-sm text-cyan-400 border border-cyan-500/40 text-[11px] font-mono font-bold shadow">
                69.8% VRAM Saved
              </span>
            </div>
          )}

          {project.translationDetails && (
            <div className="absolute bottom-3 left-3.5 right-3.5 z-20 flex flex-wrap gap-2">
              <span className="px-2.5 py-0.5 bg-zinc-950/90 backdrop-blur-sm text-emerald-400 border border-emerald-500/40 text-[11px] font-mono font-bold shadow">
                30 Epochs (M4)
              </span>
              <span className="px-2.5 py-0.5 bg-zinc-950/90 backdrop-blur-sm text-cyan-400 border border-cyan-500/40 text-[11px] font-mono font-bold shadow">
                7.42 → 3.00 Loss
              </span>
            </div>
          )}

          {project.charBigramDetails && (
            <div className="absolute bottom-3 left-3.5 right-3.5 z-20 flex flex-wrap gap-2">
              <span className="px-2.5 py-0.5 bg-zinc-950/90 backdrop-blur-sm text-cyan-400 border border-cyan-500/40 text-[11px] font-mono font-bold shadow">
                GPT-2 BPE Vocab
              </span>
              <span className="px-2.5 py-0.5 bg-zinc-950/90 backdrop-blur-sm text-emerald-400 border border-emerald-500/40 text-[11px] font-mono font-bold shadow">
                36 Min (T4 GPU)
              </span>
            </div>
          )}

          {project.sinovateDetails && (
            <div className="absolute bottom-3 left-3.5 right-3.5 z-20 flex flex-wrap gap-2">
              <span className="px-2.5 py-0.5 bg-zinc-950/90 backdrop-blur-sm text-blue-400 border border-blue-500/40 text-[11px] font-mono font-bold shadow">
                FAISS RAG Tutor
              </span>
              <span className="px-2.5 py-0.5 bg-zinc-950/90 backdrop-blur-sm text-emerald-400 border border-emerald-500/40 text-[11px] font-mono font-bold shadow">
                Worksheet Studio
              </span>
            </div>
          )}

          {project.diseaseTrackerDetails && (
            <div className="absolute bottom-3 left-3.5 right-3.5 z-20 flex flex-wrap gap-2">
              <span className="px-2.5 py-0.5 bg-zinc-950/90 backdrop-blur-sm text-rose-400 border border-rose-500/40 text-[11px] font-mono font-bold shadow">
                10 Countries (25 Yrs)
              </span>
              <span className="px-2.5 py-0.5 bg-zinc-950/90 backdrop-blur-sm text-cyan-400 border border-cyan-500/40 text-[11px] font-mono font-bold shadow">
                Polynomial ML
              </span>
            </div>
          )}

          {project.somunDetails && (
            <div className="absolute bottom-3 left-3.5 right-3.5 z-20 flex flex-wrap gap-2">
              <span className="px-2.5 py-0.5 bg-zinc-950/90 backdrop-blur-sm text-amber-400 border border-amber-500/40 text-[11px] font-mono font-bold shadow">
                12 Chambers
              </span>
              <span className="px-2.5 py-0.5 bg-zinc-950/90 backdrop-blur-sm text-emerald-400 border border-emerald-500/40 text-[11px] font-mono font-bold shadow">
                Tech Head
              </span>
            </div>
          )}

          {project.jevSnakeDetails && (
            <div className="absolute bottom-3 left-3.5 right-3.5 z-20 flex flex-wrap gap-2">
              <span className="px-2.5 py-0.5 bg-zinc-950/90 backdrop-blur-sm text-emerald-400 border border-emerald-500/40 text-[11px] font-mono font-bold shadow">
                25×25 Grid (160ms)
              </span>
              <span className="px-2.5 py-0.5 bg-zinc-950/90 backdrop-blur-sm text-red-400 border border-red-500/40 text-[11px] font-mono font-bold shadow">
                YouTube Video
              </span>
            </div>
          )}
        </div>

        {/* Body textuals */}
        <div className="p-6 space-y-3">
          <h3 className="text-xl sm:text-2xl font-extrabold text-zinc-50 font-display group-hover:text-white transition-colors uppercase leading-[1.08] tracking-tight">
            {project.title}
          </h3>
          <p className="text-zinc-300/90 text-sm sm:text-base leading-relaxed line-clamp-3 font-normal font-sans">
            {project.description}
          </p>
        </div>
      </div>

      {/* Footer specs */}
      <div className="relative z-20 px-6 pb-6 pt-2 space-y-4">
        {/* Tech stack top row */}
        <div className="flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 3).map((tech, idx) => (
            <span
              key={idx}
              className="px-2.5 py-1 bg-zinc-900/90 group-hover:bg-zinc-900 text-zinc-300 group-hover:text-zinc-100 rounded-none font-mono text-[11px] border border-zinc-800 group-hover:border-zinc-700 uppercase tracking-wider transition-colors"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span className="px-2.5 py-1 bg-zinc-950 text-zinc-400 rounded-none font-mono text-[11px] border border-zinc-850 uppercase">
              +{project.techStack.length - 3} More
            </span>
          )}
        </div>

        {/* Action Link Row */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-850/90">
          <span className="text-xs uppercase tracking-wider text-zinc-200 font-mono flex items-center gap-2 font-bold group-hover:text-white transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-zinc-500 group-hover:bg-zinc-100 transition-colors" />
            Preview Project Details
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1.5 duration-300 transform" />
          </span>

          <div className="flex gap-1.5" onClick={(e) => e.stopPropagation()}>
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noreferrer"
                className="p-2 text-zinc-300 hover:text-white bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-600 rounded-none transition-colors"
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
                className="p-2 text-zinc-300 hover:text-white bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-600 rounded-none transition-colors"
                title="Open External Demonstration / Video"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects({ initialProjectId, onClearProjectId }: ProjectsProps) {
  const [activeProjectPage, setActiveProjectPage] = useState<Project | null>(null);
  const [previewProject, setPreviewProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>('All');

  // Handle initial project selection from external navigation (e.g. Hero spotlight or What Drives Me popups)
  useEffect(() => {
    if (initialProjectId) {
      const found = PROJECTS.find(p => p.id === initialProjectId);
      if (found) {
        setActiveProjectPage(found);
        setPreviewProject(null);
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
    if (activeProjectPage.careerLabDetails || activeProjectPage.id === 'silveroaks-career-council') {
      return <CareerLabInteractivePage onBack={handleBackToProjects} />;
    }
    if (activeProjectPage.ivyTutorDetails || activeProjectPage.id === 'ivy-ai-tutor') {
      return <IvyInteractivePage onBack={handleBackToProjects} />;
    }
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
    if (activeProjectPage.jevSnakeDetails || activeProjectPage.id === 'jev-plays-snake') {
      return <JevSnakeInteractivePage onBack={handleBackToProjects} />;
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

  const getCategoryCount = (cat: string) =>
    cat === 'All' ? PROJECTS.length : PROJECTS.filter(p => p.category === cat).length;

  return (
    <section className="py-12 relative text-left" id="projects-section">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Section Heading */}
        <div className="relative flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6 border-b border-zinc-850 pb-10">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs uppercase tracking-[0.3em] text-zinc-300 font-mono font-bold">
                Consolidated Exhibits
              </span>
              <span className="text-[11px] font-mono text-zinc-500">
                [{String(filteredProjects.length).padStart(2, '0')} / {String(PROJECTS.length).padStart(2, '0')}]
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter uppercase font-display select-none">
              Engineering Lab
            </h2>
            <p className="text-zinc-300 max-w-xl text-base leading-relaxed font-light">
              Interactive deep learning systems, mobile AI applications, and empirical benchmarks built for maximum rigor and performance. Click any project to open its preview and interactive exhibit.
            </p>
          </div>

          {/* Dynamic Filter Tabs with Spring Active Pill */}
          <div className="flex flex-wrap items-center gap-1 border border-zinc-800 bg-zinc-905 p-1.5 rounded-none w-fit shrink-0 max-w-full shadow-lg">
            {categories.map((cat) => {
              const isActive = activeFilter === cat;
              const count = getCategoryCount(cat);
              return (
                <button
                  key={cat}
                  id={`filter-${cat.toLowerCase().replace(/\s+/g, '-')}`}
                  onClick={() => setActiveFilter(cat)}
                  className={`relative px-3 py-1.5 text-[11px] sm:text-xs uppercase tracking-wider font-bold transition-colors cursor-pointer rounded-none font-mono whitespace-nowrap flex items-center gap-1.5 ${
                    isActive ? 'text-zinc-950 font-black' : 'text-zinc-300 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="projects-filter-pill"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="absolute inset-0 bg-zinc-100 z-0"
                    />
                  )}
                  <span className="relative z-10">{cat}</span>
                  <span
                    className={`relative z-10 text-[10px] px-1 py-0.2 ${
                      isActive ? 'bg-zinc-950/15 text-zinc-950' : 'text-zinc-500'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={idx}
                onClick={() => handleCardClick(project)}
              />
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
