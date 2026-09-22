import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, Github, ExternalLink, Heart, BookOpen, 
  Terminal, Award, PenTool, CheckSquare, Camera, Maximize2, X
} from 'lucide-react';
import { fixAssetUrl } from '../../utils/assets';

interface TeachersDayInteractivePageProps {
  onBack: () => void;
}

export default function TeachersDayInteractivePage({ onBack }: TeachersDayInteractivePageProps) {
  const [activeTab, setActiveTab] = useState<'screenshots' | 'overview' | 'features' | 'architecture'>('screenshots');
  const [zoomedImage, setZoomedImage] = useState<{ src: string; title: string } | null>(null);

  // 6 Actual High-Res Screenshots from the teachers folder
  const teacherScreenshots = [
    {
      id: 'shot-1',
      title: '1. Chalkboard Hero — Interactive Canvas Drawing',
      image: fixAssetUrl('/teachers/teacher-shot-1.png'),
      caption: 'Interactive chalkboard hero allows visitors to pick chalk colors from a wooden tray, write or draw on the board, and erase using canvas clearing algorithms.',
      highlights: [
        'Selectable chalk colors (White, Yellow, Cyan, Rose)',
        'Real-time HTML5 2D Canvas drawing engine',
        'One-click ERASE BOARD canvas clearing button',
        'Handwritten Caveat & Fraunces font pairings'
      ]
    },
    {
      id: 'shot-2',
      title: '2. Class Incharge Spotlight — Ms. Bhagya Lakshmi',
      image: fixAssetUrl('/teachers/teacher-shot-2.png'),
      caption: 'Dedicated spotlight honoring Ms. Bhagya Lakshmi (Mathematics Faculty & Class Incharge) — "The One Who Holds XII-Innovators Together".',
      highlights: [
        'Class Incharge field notes & student memories',
        'Mathematics faculty quote: "Where every problem meets its patient match"',
        'Personal gratitude message signed by XII-Innovators students',
        'Taped notebook page styling with custom badges'
      ]
    },
    {
      id: 'shot-3',
      title: '3. Faculty Roster & Class Matrix',
      image: fixAssetUrl('/teachers/teacher-shot-3.png'),
      caption: 'Interactive class matrix mapping 13 faculty members across 10 subjects as dedicated cards with tap-to-flip notes.',
      highlights: [
        'Ms. Bhagya Lakshmi - Mathematics Incharge',
        'Physics & Chemistry Faculty Spotlights',
        'Biology, Computer Science & Humanities Faculty Cards',
        'Interactive card hover and reveal animations'
      ]
    },
    {
      id: 'shot-4',
      title: '4. Faculty Showcase — Subject Notes & Quotes',
      image: fixAssetUrl('/teachers/teacher-shot-4.png'),
      caption: 'In-depth profile cards for each subject teacher with subject-specific icons, handwritten field notes, and personalized student appreciations.',
      highlights: [
        'Physics: "Making the universe feel logical and weightless"',
        'Chemistry: "Pure catalysts for learning and curiosity"',
        'Informatics Practices & English faculty highlights',
        'Custom paper card aesthetics with subtle drop shadows'
      ]
    },
    {
      id: 'shot-5',
      title: '5. Daily Register, Reversed — Attendance Sign-In',
      image: fixAssetUrl('/teachers/teacher-shot-5.png'),
      caption: 'Interactive school register where students reverse roles and mark their teachers present for the day across XII-Innovators.',
      highlights: [
        'Official Govt. Model High School Class Register layout',
        'Interactive name tapping to toggle PRESENT / ABSENT status',
        'Grade Incharge spotlight for Ms. Nisha Mathew',
        'Live roll-call status counter'
      ]
    },
    {
      id: 'shot-6',
      title: '6. Thank-You Tribute Card — Class Signature & Seal',
      image: fixAssetUrl('/teachers/teacher-shot-6.png'),
      caption: 'Heartfelt thank-you letter addressed to all 13 teachers, grade incharge Ms. Nisha Mathew, and headmaster Mr. Dermot Farrell.',
      highlights: [
        'Class-wide gratitude message',
        'Interactive SIGN THE CARD button triggering celebration effects',
        'Special acknowledgments to school & grade leadership',
        'Authentic student-written tribute copy'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-8 px-4 sm:px-6 max-w-5xl mx-auto text-left font-mono selection:bg-zinc-800">
      
      {/* Top Breadcrumb & Header */}
      <div className="border-b border-zinc-850 pb-6 mb-8">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-zinc-400 hover:text-white transition-colors cursor-pointer mb-4"
          id="btn-back-to-portfolio"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Projects Portfolio
        </button>

        {/* Minimalist Monochromatic Badges */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          <span className="px-2.5 py-0.5 bg-zinc-900 text-zinc-200 border border-zinc-800 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
            <Heart className="w-3 h-3 text-rose-400" /> Dedicated to XII-Innovators Faculty
          </span>
          <span className="px-2.5 py-0.5 bg-zinc-900 text-zinc-300 border border-zinc-800 text-[10px] uppercase tracking-wider">
            13 Teachers • 10 Subjects • 1 Class
          </span>
          <span className="px-2.5 py-0.5 bg-zinc-900 text-zinc-300 border border-zinc-800 text-[10px] uppercase tracking-wider">
            Zero Frameworks (Pure Vanilla JS)
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase font-display flex items-center gap-3">
              <span>A Class Act — Teachers’ Day</span>
            </h1>
            <p className="text-zinc-400 text-xs mt-2 max-w-3xl leading-relaxed font-sans font-light">
              An interactive, handcrafted digital classroom experience built for XII-Innovators — featuring interactive chalkboards, subject faculty profiles, digital register sign-ins, and handwritten gratitude notes.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 shrink-0">
            <a
              href="https://github.com/25sh0363-code/teachersday"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs uppercase tracking-wider font-bold border border-zinc-700 transition-colors"
              id="btn-teachersday-github"
            >
              <Github className="w-4 h-4" />
              GitHub Repository
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Feature Navigation Tabs */}
      <div className="flex flex-wrap gap-1 border-b border-zinc-800 pb-4 mb-8">
        {[
          { id: 'screenshots', label: '📸 Web App Screenshots (6 Views)', icon: Camera },
          { id: 'overview', label: '📖 Concept & Story', icon: BookOpen },
          { id: 'features', label: '🎨 Classroom Features', icon: PenTool },
          { id: 'architecture', label: '⚡ Zero-Framework Stack', icon: Terminal }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`tab-teachersday-${tab.id}`}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2.5 text-xs font-mono uppercase tracking-wider font-bold transition-all cursor-pointer flex items-center gap-2 rounded-none ${
                isActive
                  ? 'bg-zinc-100 text-zinc-950 font-black'
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-900 border border-zinc-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB: SCREENSHOTS GALLERY */}
      {activeTab === 'screenshots' && (
        <div className="space-y-8">
          <div className="border-b border-zinc-800 pb-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold block">
                Official Web App Walkthrough
              </span>
              <h2 className="text-xl font-bold text-white uppercase font-display">
                6 High-Res Screen Captures from A Class Act
              </h2>
            </div>
            <span className="text-[10px] font-mono bg-zinc-900 text-zinc-400 px-3 py-1 border border-zinc-800 self-start sm:self-auto">
              Click any image to expand in Fullscreen Modal
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {teacherScreenshots.map((shot) => (
              <div 
                key={shot.id} 
                className="bg-zinc-950 border border-zinc-800 overflow-hidden group hover:border-zinc-700 transition-all flex flex-col justify-between"
              >
                <div>
                  <div 
                    className="relative cursor-pointer overflow-hidden bg-zinc-900 aspect-video border-b border-zinc-850"
                    onClick={() => setZoomedImage({ src: shot.image, title: shot.title })}
                  >
                    <img 
                      src={shot.image} 
                      alt={shot.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 text-white text-xs font-mono font-bold uppercase tracking-wider">
                      <Maximize2 className="w-4 h-4" />
                      Expand Image
                    </div>
                  </div>

                  <div className="p-4 space-y-2">
                    <h3 className="text-sm font-bold text-white uppercase font-mono">{shot.title}</h3>
                    <p className="text-xs text-zinc-400 font-sans leading-relaxed">{shot.caption}</p>
                  </div>
                </div>

                <div className="p-4 pt-0">
                  <div className="border-t border-zinc-900 pt-3 space-y-1">
                    <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold block">Key Elements:</span>
                    <ul className="space-y-1">
                      {shot.highlights.map((h, i) => (
                        <li key={i} className="text-[11px] text-zinc-300 font-sans flex items-start gap-1.5">
                          <span className="text-zinc-600 font-mono">•</span>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 1: OVERVIEW */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          <div className="border-b border-zinc-800 pb-3">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold block">
              Handcrafted Dedicated Experience
            </span>
            <h2 className="text-xl font-bold text-white uppercase font-display">
              13 Teachers. 10 Subjects. 1 Class. ∞ Patience.
            </h2>
            <p className="text-xs text-zinc-400 font-sans mt-1 leading-relaxed">
              Instead of sending a generic text or static image greeting, <strong>A Class Act</strong> transforms the shared memories, personalities, and gratitude of an entire graduating class into an interactive web experience inspired by chalkboards, notebooks, school registers, and subject tributes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans text-xs">
            <div className="p-5 bg-zinc-950 border border-zinc-800 space-y-2">
              <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold block">Target Audience</span>
              <span className="text-base font-bold text-white block">XII-Innovators Faculty</span>
              <p className="text-zinc-400 text-[11px] leading-relaxed font-light">
                Built specifically for the teachers who taught more than what was on the official timetable.
              </p>
            </div>

            <div className="p-5 bg-zinc-950 border border-zinc-800 space-y-2">
              <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold block">Design Motif</span>
              <span className="text-base font-bold text-white block">Digital Classroom & Notebook</span>
              <p className="text-zinc-400 text-[11px] leading-relaxed font-light">
                Paper textures, wooden chalkboards, handwritten typography, and taped-up cards.
              </p>
            </div>

            <div className="p-5 bg-zinc-950 border border-zinc-800 space-y-2">
              <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold block">Build Philosophy</span>
              <span className="text-base font-bold text-white block">Pure Web Platform</span>
              <p className="text-zinc-400 text-[11px] leading-relaxed font-light">
                Zero build step, zero frameworks, 100% standard web technologies (HTML5, CSS3, Vanilla JS, Canvas API, SVG).
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: CLASSROOM FEATURES */}
      {activeTab === 'features' && (
        <div className="space-y-6">
          <div className="border-b border-zinc-800 pb-3">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold block">
              Interactive Design System
            </span>
            <h2 className="text-xl font-bold text-white uppercase font-display">
              Interactive Classroom Modules
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-sans">
            
            <div className="p-5 bg-zinc-950 border border-zinc-800 space-y-2">
              <span className="font-mono text-xs font-bold text-white uppercase flex items-center gap-2">
                <PenTool className="w-4 h-4 text-zinc-400" />
                1. Interactive Chalkboard Hero
              </span>
              <p className="text-zinc-400 leading-relaxed font-light">
                HTML5 Canvas chalkboard hero allowing visitors to select chalk colors, write or draw directly on the board, and erase their drawings.
              </p>
            </div>

            <div className="p-5 bg-zinc-950 border border-zinc-800 space-y-2">
              <span className="font-mono text-xs font-bold text-white uppercase flex items-center gap-2">
                <Award className="w-4 h-4 text-zinc-400" />
                2. Subject Faculty Cards
              </span>
              <p className="text-zinc-400 leading-relaxed font-light">
                Dedicated faculty cards mapping each teacher across 10 subjects with subject-specific parameters and custom student tribute messages.
              </p>
            </div>

            <div className="p-5 bg-zinc-950 border border-zinc-800 space-y-2">
              <span className="font-mono text-xs font-bold text-white uppercase flex items-center gap-2">
                <CheckSquare className="w-4 h-4 text-zinc-400" />
                3. Interactive Attendance Register
              </span>
              <p className="text-zinc-400 leading-relaxed font-light">
                A digital attendance ledger where students can check off teacher names and mark them present for the day.
              </p>
            </div>

            <div className="p-5 bg-zinc-950 border border-zinc-800 space-y-2">
              <span className="font-mono text-xs font-bold text-white uppercase flex items-center gap-2">
                <Heart className="w-4 h-4 text-rose-400" />
                4. Signed Thank-You Card & Gratitude Engine
              </span>
              <p className="text-zinc-400 leading-relaxed font-light">
                Digital tribute card allowing students to sign their names, seal their appreciation, and trigger celebratory animations.
              </p>
            </div>

          </div>
        </div>
      )}

      {/* TAB 4: ARCHITECTURE & TECH STACK */}
      {activeTab === 'architecture' && (
        <div className="space-y-6">
          <div className="border-b border-zinc-800 pb-3">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold block">
              Pure Native Web Implementation
            </span>
            <h2 className="text-xl font-bold text-white uppercase font-display">
              Zero-Framework Engineering
            </h2>
            <p className="text-xs text-zinc-400 font-sans mt-1 leading-relaxed">
              No React, no Vite, no node_modules dependencies — pure standard web platform execution.
            </p>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 p-6 space-y-4">
            <span className="text-[10px] text-zinc-400 uppercase font-bold block">
              Declared Technical Stack
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-zinc-900/60 border border-zinc-850">
                <span className="text-white font-bold block">HTML5 Semantic Structure</span>
                <span className="text-[11px] text-zinc-400 font-sans">Custom SVG chalk masks and accessible card containers.</span>
              </div>

              <div className="p-3 bg-zinc-900/60 border border-zinc-850">
                <span className="text-white font-bold block">CSS3 Layouts & Typography</span>
                <span className="text-[11px] text-zinc-400 font-sans">Custom paper textures, Fraunces, Caveat, & Space Mono font pairings.</span>
              </div>

              <div className="p-3 bg-zinc-900/60 border border-zinc-850">
                <span className="text-white font-bold block">Vanilla JavaScript & Canvas API</span>
                <span className="text-[11px] text-zinc-400 font-sans">Real-time 2D canvas drawing algorithms for chalkboard interaction.</span>
              </div>

              <div className="p-3 bg-zinc-900/60 border border-zinc-850">
                <span className="text-white font-bold block">Intersection Observer API</span>
                <span className="text-[11px] text-zinc-400 font-sans">Scroll-triggered chalk animations and reveal storytelling.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FULLSCREEN IMAGE MODAL */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md p-4 sm:p-8 flex flex-col items-center justify-center"
            onClick={() => setZoomedImage(null)}
          >
            <div className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center justify-center" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setZoomedImage(null)}
                className="absolute -top-10 right-0 text-zinc-400 hover:text-white p-2 transition-colors cursor-pointer flex items-center gap-1 font-mono text-xs uppercase"
              >
                <X className="w-5 h-5" /> Close [ESC]
              </button>
              
              <img 
                src={zoomedImage.src} 
                alt={zoomedImage.title} 
                className="max-w-full max-h-[80vh] object-contain border border-zinc-800 shadow-2xl"
              />

              <div className="mt-3 text-center">
                <span className="text-sm font-bold text-white uppercase font-mono">{zoomedImage.title}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
