import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Briefcase, GraduationCap, Trophy, Globe, Award, Download, CheckSquare, Sparkles, Printer, ShieldCheck, ChevronLeft, ChevronRight, LayoutGrid, SlidersHorizontal } from 'lucide-react';
import { RESUME, SKILL_CATEGORIES, CERTIFICATES } from '../data';
import CertificateCard from './CertificateCard';

export default function Resume() {
  const [activeTab, setActiveTab] = useState<'all' | 'education' | 'experience' | 'extracurricular'>('all');
  const [certLayout, setCertLayout] = useState<'horizontal' | 'grid'>('horizontal');
  const certScrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (certScrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = certScrollRef.current;
      setCanScrollLeft(scrollLeft > 10);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScroll();
    const el = certScrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      return () => el.removeEventListener('scroll', checkScroll);
    }
  }, [certLayout]);

  const scrollCerts = (direction: 'left' | 'right') => {
    if (certScrollRef.current) {
      const offset = direction === 'left' ? -380 : 380;
      certScrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  const categories: { id: typeof activeTab; label: string; icon: any }[] = [
    { id: 'all', label: 'All Records', icon: Globe },
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'experience', label: 'Experience & Leadership', icon: Briefcase },
    { id: 'extracurricular', label: 'Co-Curriculars & Certifications', icon: Award }
  ];

  const filteredResume = activeTab === 'all'
    ? RESUME
    : RESUME.filter(item => item.category === activeTab);

  const handlePrint = () => {
    window.print();
  };

  const getProficiencyLabel = (level: number) => {
    switch (level) {
      case 5:
        return 'Advanced';
      case 4:
        return 'Proficient';
      case 3:
        return 'Working Knowledge';
      case 2:
        return 'Foundational';
      default:
        return 'Exploring';
    }
  };

  return (
    <section className="py-12 relative text-left">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6 border-b border-zinc-900 pb-10">
          <div className="space-y-3">
            <span className="text-xs uppercase tracking-[0.3em] text-zinc-300 font-mono font-bold block">Academic & Development</span>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter uppercase font-display select-none">
              Curriculum Vitae
            </h2>
            <p className="text-zinc-300 max-w-xl text-base leading-relaxed font-light">
              Official academic records, certified machine learning coursework, verified credentials, and high school extracurricular initiatives.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <button
              onClick={handlePrint}
              id="btn-print"
              className="px-5 py-3.5 bg-zinc-50 hover:bg-zinc-200 text-zinc-950 font-black text-xs uppercase tracking-[0.2em] transition-colors rounded-none flex items-center gap-2 cursor-pointer border border-zinc-50"
            >
              <Printer className="w-3.5 h-3.5" />
              Obtain PDF Transcript
            </button>
          </div>
        </div>

        {/* Dedicated Verified Certificates Gallery (Displayed when Extracurricular or All is selected) */}
        {(activeTab === 'all' || activeTab === 'extracurricular') && (
          <div className="mb-14 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-zinc-800 pb-3 gap-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <div>
                  <h3 className="text-sm font-mono uppercase tracking-widest text-zinc-200 font-bold">
                    Verified Credentials & Certificates
                  </h3>
                  <p className="text-sm text-zinc-300 font-mono">
                    {CERTIFICATES.length} credentials across Machine Learning, Neural Networks & Leadership
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {/* View switcher */}
                <div className="flex items-center bg-zinc-900 border border-zinc-800 p-0.5 text-xs font-mono">
                  <button
                    onClick={() => setCertLayout('horizontal')}
                    className={`px-2.5 py-1 flex items-center gap-1.5 transition-colors cursor-pointer ${
                      certLayout === 'horizontal' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-300 hover:text-white'
                    }`}
                    title="Horizontal Scroll View"
                  >
                    <SlidersHorizontal className="w-3 h-3" />
                    <span>Scroll</span>
                  </button>
                  <button
                    onClick={() => setCertLayout('grid')}
                    className={`px-2.5 py-1 flex items-center gap-1.5 transition-colors cursor-pointer ${
                      certLayout === 'grid' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-300 hover:text-white'
                    }`}
                    title="Grid View"
                  >
                    <LayoutGrid className="w-3 h-3" />
                    <span>Grid</span>
                  </button>
                </div>

                {/* Left/Right scroll buttons for horizontal mode */}
                {certLayout === 'horizontal' && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => scrollCerts('left')}
                      disabled={!canScrollLeft}
                      className="p-1.5 bg-zinc-900 hover:bg-zinc-800 disabled:opacity-30 disabled:hover:bg-zinc-900 text-zinc-300 border border-zinc-800 transition-colors cursor-pointer disabled:cursor-not-allowed"
                      aria-label="Scroll left"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => scrollCerts('right')}
                      disabled={!canScrollRight}
                      className="p-1.5 bg-zinc-900 hover:bg-zinc-800 disabled:opacity-30 disabled:hover:bg-zinc-900 text-zinc-300 border border-zinc-800 transition-colors cursor-pointer disabled:cursor-not-allowed"
                      aria-label="Scroll right"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {certLayout === 'horizontal' ? (
              <div className="relative group">
                <div
                  ref={certScrollRef}
                  className="flex gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth no-scrollbar"
                  style={{ scrollbarWidth: 'thin', scrollbarColor: '#3f3f46 transparent' }}
                >
                  {CERTIFICATES.map((cert) => (
                    <div 
                      key={cert.id} 
                      className="min-w-[300px] sm:min-w-[340px] md:min-w-[360px] max-w-[360px] shrink-0 snap-start"
                    >
                      <CertificateCard cert={cert} />
                    </div>
                  ))}
                </div>
                
                {/* Horizontal scroll subtle edge gradients to indicate more content */}
                {canScrollLeft && (
                  <div className="absolute left-0 top-0 bottom-4 w-8 bg-gradient-to-r from-zinc-950 to-transparent pointer-events-none" />
                )}
                {canScrollRight && (
                  <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-zinc-950 to-transparent pointer-events-none" />
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {CERTIFICATES.map((cert) => (
                  <CertificateCard key={cert.id} cert={cert} />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Main Grid: Resume Timeline vs Skills Info Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Timeline Items (7-Cols on LG) */}
          <div className="lg:col-span-7 space-y-8">
            
            {/* Horizontal timeline category tabs */}
            <div className="flex flex-wrap items-center gap-1 border border-zinc-800 bg-zinc-950 p-1 rounded-none w-fit shrink-0 max-w-full">
              {categories.map((cat) => {
                return (
                  <button
                    key={cat.id}
                    id={`resume-tab-${cat.id}`}
                    onClick={() => setActiveTab(cat.id)}
                    className={`px-2.5 sm:px-3 py-1.5 text-[11px] sm:text-xs uppercase tracking-wider font-bold transition-all cursor-pointer rounded-none font-mono whitespace-nowrap ${
                      activeTab === cat.id
                        ? 'bg-zinc-100 text-zinc-950 font-black'
                        : 'text-zinc-300 hover:text-white hover:bg-zinc-900'
                    }`}
                  >
                    {cat.label}
                  </button>
                );
              })}
            </div>

            {/* Timeline Tree */}
            <div className="relative pl-6 border-l border-zinc-900 space-y-8">
              <AnimatePresence mode="popLayout">
                {filteredResume.map((item, index) => {
                  return (
                    <motion.div
                      layout
                      key={item.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 10 }}
                      transition={{ delay: index * 0.04, duration: 0.3 }}
                      className="relative group text-left font-sans"
                    >
                      {/* Brutalist square anchor nodes for timeline tracking */}
                      <span className="absolute -left-[30px] top-1.5 flex h-3.5 w-3.5 items-center justify-center bg-zinc-950 border border-zinc-400 group-hover:bg-zinc-50 transition-colors">
                        <span className="h-1.5 w-1.5 bg-zinc-100" />
                      </span>

                      <div className="space-y-2">
                        {/* Period & Place Grid */}
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs font-mono">
                          <span className="text-zinc-950 font-black bg-zinc-100 px-2 py-0.5 uppercase tracking-wider">
                            {item.period}
                          </span>
                          <span className="text-zinc-300 font-bold">//</span>
                          <span className="text-zinc-300 uppercase tracking-widest text-xs">{item.location}</span>
                        </div>

                        {/* Title and Org headings */}
                        <div>
                          <h3 className="text-xl font-black text-zinc-100 leading-tight uppercase font-display">
                            {item.role}
                          </h3>
                          <p className="text-zinc-300 font-serif italic text-base mt-0.5">
                            {item.organization}
                          </p>
                        </div>

                        {/* Bullets highlighting accomplishments */}
                        <ul className="space-y-2.5 pt-2 pl-4 border-l border-zinc-900">
                          {item.highlights.map((bullet, idx) => (
                            <li key={idx} className="flex gap-2.5 items-start text-sm sm:text-base text-zinc-300 font-normal leading-relaxed">
                              <span className="text-zinc-300 mt-1.5 min-w-[6px]">▪</span>
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

          </div>

          {/* Right Column: Skills Portal Dashboard (5-Cols on LG) */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-24">
            
            {/* Interactive skills panel */}
            <div className="bg-zinc-950 border border-zinc-850 p-6 space-y-6 rounded-none">
              <div className="space-y-1">
                <h3 className="text-base font-mono text-zinc-200 uppercase tracking-widest font-black flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-zinc-300" />
                  Skill Proficiency Matrix
                </h3>
                <p className="text-sm text-zinc-300">
                  Grounded self-assessment reflecting real project experience and learning progress.
                </p>
              </div>

              <div className="space-y-6">
                {SKILL_CATEGORIES.map((cat, catIdx) => (
                  <div key={catIdx} className="space-y-3.5">
                    <h4 className="text-xs font-mono text-zinc-300 tracking-[0.25em] uppercase font-black">
                      {cat.category}
                    </h4>

                    <div className="space-y-4 bg-zinc-900/45 p-4 rounded-none border border-zinc-900">
                      {cat.skills.map((skill, skillIdx) => (
                        <div key={skillIdx} className="space-y-2">
                          <div className="flex items-center justify-between text-xs font-mono">
                            <span className="font-bold text-zinc-200 text-sm">{skill.name}</span>
                            <span className="text-zinc-300 uppercase text-xs tracking-wider">
                              {getProficiencyLabel(skill.level)}
                            </span>
                          </div>

                          {/* Monochromatic digital notch indicator */}
                          <div className="flex items-center gap-1 h-1.5">
                            {[1, 2, 3, 4, 5].map((bulletValue) => (
                              <div
                                key={bulletValue}
                                className={`h-full flex-1 transition-all duration-500 ${
                                  bulletValue <= skill.level
                                    ? 'bg-zinc-300'
                                    : 'bg-zinc-800'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Accolades Highlights Board */}
            <div className="bg-zinc-900/50 border border-zinc-850 p-6 text-left space-y-4 rounded-none">
              <h3 className="text-xs font-mono text-zinc-300 uppercase tracking-widest font-black flex items-center gap-2">
                <Award className="w-4 h-4 text-zinc-300" />
                Key Milestones
              </h3>
              
              <div className="space-y-3 text-sm text-zinc-300 font-light font-sans">
                <div className="flex items-start gap-2.5">
                  <span className="text-zinc-100 mt-0.5">•</span>
                  <p>Completed verified Google Cloud & IBM Transformer specializations.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-zinc-100 mt-0.5">•</span>
                  <p>1st Place Award at regional CBSE TechHack for crop health analytics.</p>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-zinc-100 mt-0.5">•</span>
                  <p>Tech Head for SOMUN 2026 conference portals and verification systems.</p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
