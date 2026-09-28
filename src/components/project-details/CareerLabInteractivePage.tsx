import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, Github, ExternalLink, Video, BookOpen, 
  Users, ShieldCheck, Database, FileText, CheckCircle2, 
  Layers, Terminal, ChevronRight, Lock, Key, Globe, Search,
  Maximize2, Eye, Info, X, Sparkles, Building2, GraduationCap,
  Play, Compass, ShieldAlert, Cpu
} from 'lucide-react';
import { CAREER_LAB_DATA } from '../../data';
import { CareerLabScreenshot } from '../../types';
import { fixAssetUrl } from '../../utils/assets';

interface CareerLabInteractivePageProps {
  onBack: () => void;
}

export default function CareerLabInteractivePage({ onBack }: CareerLabInteractivePageProps) {
  const [activeTab, setActiveTab] = useState<'screenshots' | 'overview' | 'architecture' | 'counsellor-portal' | 'interactive-sim'>('screenshots');
  const [selectedScreenId, setSelectedScreenId] = useState<string>('screen-1');
  const [zoomedImage, setZoomedImage] = useState<{ src: string; title: string; caption: string } | null>(null);

  // Interactive Domain Validator Simulator state
  const [testEmail, setTestEmail] = useState<string>('student.25sh0363@hyd.silveroaks.co.in');
  const [validationResult, setValidationResult] = useState<{ valid: boolean; message: string; role: string } | null>(null);

  const selectedScreen = CAREER_LAB_DATA.screenshots.find(s => s.id === selectedScreenId) || CAREER_LAB_DATA.screenshots[0];

  const handleValidateEmail = () => {
    const trimmed = testEmail.trim().toLowerCase();
    const domainMatch = trimmed.match(/@([a-z0-9.-]+\.silveroaks\.co\.in|silveroaks\.co\.in)$/);
    
    if (domainMatch) {
      const isStaff = trimmed.includes('counsellor') || trimmed.includes('faculty') || trimmed.includes('staff');
      setValidationResult({
        valid: true,
        message: `Authorized Institutional Domain: "${domainMatch[0]}". Access granted to Silver Oaks Pathways network.`,
        role: isStaff ? 'Staff / Career Counsellor Role (Full Access)' : 'Student Role (Courses, CareerLab Uploads, Guidance)'
      });
    } else {
      setValidationResult({
        valid: false,
        message: `Access Denied: "${trimmed}" does not match the mandatory organizational domain pattern (@xxx.silveroaks.co.in).`,
        role: 'None (Restricted)'
      });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-8 px-4 sm:px-6 max-w-6xl mx-auto text-left font-sans selection:bg-cyan-500/20">
      
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
            <span className="px-2.5 py-0.5 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-[10px] font-mono font-bold uppercase tracking-wider">
              Multi-Campus Hub
            </span>
            <span className="px-2.5 py-0.5 bg-blue-500/10 text-blue-400 border border-blue-500/20 text-[10px] font-mono font-bold uppercase tracking-wider">
              TypeScript & React (TSX)
            </span>
            <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[10px] font-mono font-bold uppercase tracking-wider">
              Supabase Edge Functions
            </span>
            <span className="px-2.5 py-0.5 bg-purple-500/10 text-purple-400 border border-purple-500/20 text-[10px] font-mono font-bold uppercase tracking-wider">
              PostgreSQL DB
            </span>
            <span className="px-2.5 py-0.5 bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[10px] font-mono font-bold uppercase tracking-wider">
              Domain-Restricted: @xxx.silveroaks.co.in
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-white uppercase tracking-tight font-display">
            Silver Oaks Career Council — Pathways (CareerLab)
          </h1>
          <p className="text-zinc-300 text-sm mt-1 max-w-3xl font-light leading-relaxed">
            {CAREER_LAB_DATA.tagline}. Centralized digital platform for all students across Silver Oaks campuses to access career courses, blogs, and the flagship student-led expert interview initiative.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2.5 shrink-0">
          <a
            href={CAREER_LAB_DATA.githubRepo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-900 hover:bg-zinc-850 text-white font-mono text-xs uppercase tracking-wider font-bold border border-zinc-750 transition-colors"
            id="btn-careerlab-github"
          >
            <Github className="w-4 h-4 text-zinc-300" />
            GitHub Repo
          </a>
          <a
            href={CAREER_LAB_DATA.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-zinc-950 font-mono text-xs uppercase tracking-wider font-bold transition-colors shadow-lg shadow-cyan-900/30"
            id="btn-careerlab-live"
          >
            <ExternalLink className="w-4 h-4" />
            Visit Live Site (pathways.silveroaks.co.in)
          </a>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-zinc-850 mb-8 pb-3">
        {[
          { id: 'screenshots', label: 'Visual Interface Gallery', icon: Eye, count: 8 },
          { id: 'overview', label: 'CareerLab & Student Hub', icon: Video },
          { id: 'counsellor-portal', label: 'Staff & Counsellor Portal', icon: Users },
          { id: 'architecture', label: 'Cloud Architecture & Supabase', icon: Database },
          { id: 'interactive-sim', label: 'Domain Auth & Simulator', icon: ShieldCheck }
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
              {tab.count && (
                <span className={`px-1.5 py-0.2 text-[10px] ${isActive ? 'bg-zinc-900 text-white' : 'bg-zinc-800 text-zinc-300'}`}>
                  {tab.count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* TAB CONTENT: Visual Screenshots Gallery */}
      {activeTab === 'screenshots' && (
        <div className="space-y-8">
          <div className="bg-zinc-900/40 border border-zinc-800 p-5 rounded-none flex items-start gap-4">
            <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-sm font-bold text-white uppercase tracking-wider font-mono">
                Production Web Application Screenshots
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed font-light">
                High-resolution exhibits captured directly from the live platform at <span className="text-cyan-300 font-mono">pathways.silveroaks.co.in</span> and the Career Council repository. Select any screen below or click to zoom into full resolution.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Screen Selector Sidebar (4 Cols) */}
            <div className="lg:col-span-4 space-y-2">
              <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold mb-3">
                Select Platform Screen ({CAREER_LAB_DATA.screenshots.length} Exhibits)
              </h3>
              {CAREER_LAB_DATA.screenshots.map((screen, idx) => {
                const isSelected = screen.id === selectedScreenId;
                return (
                  <button
                    key={screen.id}
                    onClick={() => setSelectedScreenId(screen.id)}
                    className={`w-full text-left p-3.5 border transition-all cursor-pointer flex items-start gap-3 ${
                      isSelected
                        ? 'bg-zinc-900 border-cyan-500/80 shadow-md'
                        : 'bg-zinc-950/70 border-zinc-850 hover:border-zinc-700 hover:bg-zinc-900/40'
                    }`}
                  >
                    <span className={`font-mono text-xs font-bold px-2 py-0.5 shrink-0 ${isSelected ? 'bg-cyan-500 text-zinc-950' : 'bg-zinc-850 text-zinc-400'}`}>
                      0{idx + 1}
                    </span>
                    <div className="space-y-1 min-w-0">
                      <div className="text-xs font-bold text-white truncate font-mono">
                        {screen.title}
                      </div>
                      <div className="text-[11px] text-zinc-400 line-clamp-1">
                        {screen.caption}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Main Screen Preview Stage (8 Cols) */}
            <div className="lg:col-span-8 bg-zinc-900 border border-zinc-800 p-4 sm:p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-cyan-400 font-bold">
                    Active Viewport Exhibit
                  </span>
                  <h3 className="text-lg font-bold text-white font-mono">
                    {selectedScreen.title}
                  </h3>
                </div>

                <button
                  onClick={() => setZoomedImage({
                    src: fixAssetUrl(selectedScreen.imagePath),
                    title: selectedScreen.title,
                    caption: selectedScreen.caption
                  })}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-750 text-xs font-mono text-zinc-200 border border-zinc-700 transition cursor-pointer"
                >
                  <Maximize2 className="w-3.5 h-3.5" />
                  Full Zoom
                </button>
              </div>

              {/* High-res Image Preview */}
              <div 
                className="relative bg-zinc-950 border border-zinc-800 overflow-hidden cursor-zoom-in group aspect-[16/10] flex items-center justify-center"
                onClick={() => setZoomedImage({
                  src: fixAssetUrl(selectedScreen.imagePath),
                  title: selectedScreen.title,
                  caption: selectedScreen.caption
                })}
              >
                <img 
                  src={fixAssetUrl(selectedScreen.imagePath)} 
                  alt={selectedScreen.title}
                  className="w-full h-full object-contain filter group-hover:brightness-105 transition-all duration-300"
                />
                <div className="absolute inset-0 bg-zinc-950/20 group-hover:bg-transparent transition-colors" />
                <div className="absolute bottom-3 right-3 bg-zinc-950/90 border border-zinc-750 px-2.5 py-1 text-[11px] font-mono text-zinc-300 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3 h-3 text-cyan-400" />
                  Click to Expand
                </div>
              </div>

              <div className="bg-zinc-950 p-4 border border-zinc-850">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 block mb-1">
                  Exhibition Description
                </span>
                <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                  {selectedScreen.caption}
                </p>
              </div>
            </div>
          </div>

          {/* Quick Grid of all screenshots */}
          <div className="pt-6 border-t border-zinc-900 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold">
              All 8 Interface Captures (Click to View)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {CAREER_LAB_DATA.screenshots.map((s, idx) => (
                <div
                  key={s.id}
                  onClick={() => setSelectedScreenId(s.id)}
                  className={`bg-zinc-900 border p-2 cursor-pointer transition-all hover:border-zinc-600 ${
                    s.id === selectedScreenId ? 'border-cyan-500 shadow-md ring-1 ring-cyan-500/50' : 'border-zinc-800'
                  }`}
                >
                  <div className="aspect-[16/10] bg-zinc-950 overflow-hidden mb-2">
                    <img 
                      src={fixAssetUrl(s.imagePath)} 
                      alt={s.title}
                      className="w-full h-full object-cover filter grayscale group-hover:grayscale-0"
                    />
                  </div>
                  <div className="text-[11px] font-mono font-bold text-white truncate">
                    0{idx + 1}. {s.title}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: CareerLab & Student Hub Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-10">
          {/* Executive Overview */}
          <div className="bg-zinc-900 border border-zinc-800 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-cyan-400 rounded-full" />
              <h3 className="text-xs uppercase tracking-[0.3em] text-zinc-400 font-mono font-bold">
                Platform Mission & Institutional Scope
              </h3>
            </div>
            <p className="text-base text-zinc-200 leading-relaxed font-light">
              {CAREER_LAB_DATA.overview}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-zinc-800">
              <div className="bg-zinc-950 p-4 border border-zinc-850">
                <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">Audience & Reach</span>
                <div className="text-sm font-bold text-white font-mono">Multi-Campus Silver Oaks</div>
                <div className="text-xs text-zinc-400 mt-1">Students across all school campuses</div>
              </div>
              <div className="bg-zinc-950 p-4 border border-zinc-850">
                <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">Production URL</span>
                <div className="text-sm font-bold text-cyan-400 font-mono">pathways.silveroaks.co.in</div>
                <div className="text-xs text-zinc-400 mt-1">Live hosted institutional domain</div>
              </div>
              <div className="bg-zinc-950 p-4 border border-zinc-850">
                <span className="text-[10px] font-mono uppercase text-zinc-400 block mb-1">Security Restriction</span>
                <div className="text-sm font-bold text-emerald-400 font-mono">@xxx.silveroaks.co.in</div>
                <div className="text-xs text-zinc-400 mt-1">Strict organization email verification</div>
              </div>
            </div>
          </div>

          {/* Key Feature Pillars */}
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold">
              Core Platform Capabilities
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CAREER_LAB_DATA.keyFeatures.map((feat, idx) => (
                <div 
                  key={idx}
                  className="bg-zinc-900 border border-zinc-800 p-6 space-y-3 relative hover:border-zinc-700 transition"
                >
                  <div className="flex items-center justify-between">
                    <span className="px-2 py-0.5 bg-zinc-800 border border-zinc-700 text-zinc-300 text-[10px] font-mono uppercase font-bold">
                      {feat.category}
                    </span>
                    <span className="text-xs font-mono text-zinc-400">#0{idx + 1}</span>
                  </div>
                  <h4 className="text-base font-bold text-white font-mono">
                    {feat.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-light">
                    {feat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Step-by-Step Workflow */}
          <div className="bg-zinc-900 border border-zinc-800 p-6 sm:p-8 space-y-6">
            <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold">
              CareerLab Lifecycle & Student Journey
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {CAREER_LAB_DATA.workflowSteps.map((step) => (
                <div key={step.step} className="bg-zinc-950 p-4 border border-zinc-850 space-y-2">
                  <div className="w-7 h-7 bg-zinc-850 border border-zinc-700 flex items-center justify-center font-mono font-black text-xs text-cyan-400">
                    {step.step}
                  </div>
                  <h5 className="text-xs font-bold text-white font-mono">
                    {step.title}
                  </h5>
                  <p className="text-xs text-zinc-400 leading-relaxed font-light">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Staff & Counsellor Portal */}
      {activeTab === 'counsellor-portal' && (
        <div className="space-y-8">
          <div className="bg-zinc-900 border border-zinc-800 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-purple-400" />
              <h3 className="text-xs uppercase tracking-[0.3em] text-zinc-400 font-mono font-bold">
                Career Counsellor & Faculty Admin Architecture
              </h3>
            </div>
            <p className="text-sm sm:text-base text-zinc-200 leading-relaxed font-light">
              A central pillar of the platform is the **Staff & Counsellor Portal**. Built specifically for career counsellors, guidance leads, and school faculty, it provides administrative workflows to govern content, review student expert interviews, and publish institutional guidance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-zinc-900 border border-zinc-800 p-6 space-y-3">
              <div className="w-8 h-8 bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <Video className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white font-mono">
                CareerLab Interview Moderation
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed font-light">
                Career counsellors review student-recorded interview sessions with industry professionals, verify audio/video quality and content relevance, and approve them for school-wide broadcasting.
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-6 space-y-3">
              <div className="w-8 h-8 bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <BookOpen className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white font-mono">
                Courseware & Curriculum Curation
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed font-light">
                Faculty can create, structure, and categorize career tracks, higher education roadmaps, entrance examination preparation materials, and university application guides.
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-6 space-y-3">
              <div className="w-8 h-8 bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <FileText className="w-4 h-4" />
              </div>
              <h4 className="text-sm font-bold text-white font-mono">
                Editorial Knowledge Base
              </h4>
              <p className="text-xs text-zinc-300 leading-relaxed font-light">
                Publishing portal for guidance blogs, university admissions calendar updates, alumni insights, and campus-wide career council announcements.
              </p>
            </div>
          </div>

          {/* Counsellor Portal Exhibit */}
          <div className="bg-zinc-900 border border-zinc-800 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-300 font-bold">
                Staff Portal Interface Capture (Exhibits 05 & 06)
              </h4>
              <span className="text-[10px] font-mono text-cyan-400">Role-Gated Dashboard</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div 
                className="bg-zinc-950 border border-zinc-800 overflow-hidden cursor-pointer group p-2"
                onClick={() => setZoomedImage({
                  src: fixAssetUrl('career/careerlab_preview_5.png'),
                  title: 'Institutional Domain Authentication Screen',
                  caption: 'Enforces strict @xxx.silveroaks.co.in domain verification prior to granting access.'
                })}
              >
                <div className="aspect-[16/10] overflow-hidden bg-zinc-900 mb-2">
                  <img 
                    src={fixAssetUrl('career/careerlab_preview_5.png')} 
                    alt="Institutional Authentication"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="text-xs font-mono text-white font-bold">Institutional Domain Auth</div>
                <div className="text-[11px] text-zinc-400">Restricts entry to official school emails</div>
              </div>

              <div 
                className="bg-zinc-950 border border-zinc-800 overflow-hidden cursor-pointer group p-2"
                onClick={() => setZoomedImage({
                  src: fixAssetUrl('career/careerlab_preview_6.png'),
                  title: 'Staff & Career Counsellor Admin Portal',
                  caption: 'Admin backend for reviewing student submissions and publishing career tracks.'
                })}
              >
                <div className="aspect-[16/10] overflow-hidden bg-zinc-900 mb-2">
                  <img 
                    src={fixAssetUrl('career/careerlab_preview_6.png')} 
                    alt="Staff Portal Admin"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="text-xs font-mono text-white font-bold">Staff & Counsellor Admin Console</div>
                <div className="text-[11px] text-zinc-400">Manage courses, student interviews, and blogs</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Cloud Architecture & Supabase */}
      {activeTab === 'architecture' && (
        <div className="space-y-8">
          <div className="bg-zinc-900 border border-zinc-800 p-6 sm:p-8 space-y-6">
            <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold">
              Full-Stack Technical Architecture Breakdown
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-zinc-950 border border-zinc-850 p-5 space-y-3">
                <div className="flex items-center gap-2 text-cyan-400">
                  <Layers className="w-4 h-4" />
                  <span className="text-xs font-mono uppercase font-bold">Frontend Presentation Layer</span>
                </div>
                <div className="text-sm font-bold text-white font-mono">{CAREER_LAB_DATA.backendStack.engine}</div>
                <ul className="text-xs text-zinc-300 space-y-1.5 font-light list-disc pl-4">
                  <li>Strongly-typed React components written in TypeScript (TSX)</li>
                  <li>Modular single-page architecture built with Vite for sub-second hot updates</li>
                  <li>Custom responsive UI styled with Tailwind CSS across mobile, tablet, and desktop</li>
                  <li>Client-side state management for career tracks, media filters, and search indexing</li>
                </ul>
              </div>

              <div className="bg-zinc-950 border border-zinc-850 p-5 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400">
                  <Cpu className="w-4 h-4" />
                  <span className="text-xs font-mono uppercase font-bold">Serverless Edge Functions</span>
                </div>
                <div className="text-sm font-bold text-white font-mono">{CAREER_LAB_DATA.backendStack.edgeFunctions}</div>
                <ul className="text-xs text-zinc-300 space-y-1.5 font-light list-disc pl-4">
                  <li>Serverless Deno/TypeScript edge functions executing with minimal cold-start latency</li>
                  <li>Automated server-side email domain parser strictly validating <span className="font-mono text-cyan-300">@xxx.silveroaks.co.in</span></li>
                  <li>Metadata extraction and processing for student CareerLab video interview uploads</li>
                  <li>API endpoints facilitating counsellor approval pipelines and newsletter broadcasts</li>
                </ul>
              </div>

              <div className="bg-zinc-950 border border-zinc-850 p-5 space-y-3">
                <div className="flex items-center gap-2 text-purple-400">
                  <Database className="w-4 h-4" />
                  <span className="text-xs font-mono uppercase font-bold">PostgreSQL Relational Database</span>
                </div>
                <div className="text-sm font-bold text-white font-mono">{CAREER_LAB_DATA.backendStack.database}</div>
                <ul className="text-xs text-zinc-300 space-y-1.5 font-light list-disc pl-4">
                  <li>Structured relational schema storing student records, course enrollment, and interview media</li>
                  <li>PostgreSQL Row-Level Security (RLS) policies ensuring students only modify their own profile data</li>
                  <li>Staff authorization tables granting elevated permissions to verified career counsellors</li>
                </ul>
              </div>

              <div className="bg-zinc-950 border border-zinc-850 p-5 space-y-3">
                <div className="flex items-center gap-2 text-amber-400">
                  <ShieldCheck className="w-4 h-4" />
                  <span className="text-xs font-mono uppercase font-bold">Auth & Access Control</span>
                </div>
                <div className="text-sm font-bold text-white font-mono">{CAREER_LAB_DATA.backendStack.auth}</div>
                <ul className="text-xs text-zinc-300 space-y-1.5 font-light list-disc pl-4">
                  <li>Institutional email verification required before JWT token generation</li>
                  <li>Multi-campus isolation ensuring seamless collaboration across all Silver Oaks locations</li>
                  <li>Strict staff role boundary guarding the counsellor administrative console</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: Interactive Simulator */}
      {activeTab === 'interactive-sim' && (
        <div className="space-y-8">
          <div className="bg-zinc-900 border border-zinc-800 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
              <h3 className="text-xs uppercase tracking-[0.3em] text-zinc-400 font-mono font-bold">
                Interactive Domain Auth Validator Simulation
              </h3>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed font-light">
              Test how the Supabase Auth and Edge Function domain restriction algorithms validate organizational email addresses (<span className="text-emerald-300 font-mono">@xxx.silveroaks.co.in</span>) before granting access to courses, student CareerLab submissions, or counsellor administrative workflows.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 p-6 space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-mono uppercase tracking-wider text-zinc-400 block font-bold">
                Enter Email Address to Test
              </label>
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  placeholder="e.g. student.25sh0363@hyd.silveroaks.co.in"
                  className="flex-1 bg-zinc-950 border border-zinc-750 px-4 py-2.5 text-sm font-mono text-white focus:outline-none focus:border-cyan-400"
                />
                <button
                  onClick={handleValidateEmail}
                  className="px-5 py-2.5 bg-cyan-600 hover:bg-cyan-500 text-zinc-950 font-mono text-xs uppercase tracking-wider font-bold transition cursor-pointer shrink-0"
                >
                  Verify Domain Access
                </button>
              </div>
            </div>

            {/* Quick Test Presets */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <span className="text-[11px] font-mono text-zinc-400 mr-2">Try Presets:</span>
              {[
                { label: 'Student (Mighty Oaks)', val: 'student.25sh0363@hyd.silveroaks.co.in' },
                { label: 'Counsellor (Staff)', val: 'careercounsellor@bowrampet.silveroaks.co.in' },
                { label: 'General School Mail', val: 'info@silveroaks.co.in' },
                { label: 'External Personal (Denied)', val: 'randomuser@gmail.com' }
              ].map((p) => (
                <button
                  key={p.label}
                  onClick={() => {
                    setTestEmail(p.val);
                    setTimeout(() => {
                      const trimmed = p.val.trim().toLowerCase();
                      const match = trimmed.match(/@([a-z0-9.-]+\.silveroaks\.co\.in|silveroaks\.co\.in)$/);
                      if (match) {
                        const isStaff = trimmed.includes('counsellor') || trimmed.includes('staff');
                        setValidationResult({
                          valid: true,
                          message: `Authorized Institutional Domain: "${match[0]}". Access granted to Silver Oaks Pathways network.`,
                          role: isStaff ? 'Staff / Career Counsellor Role (Full Access)' : 'Student Role (Courses, CareerLab Uploads, Guidance)'
                        });
                      } else {
                        setValidationResult({
                          valid: false,
                          message: `Access Denied: "${trimmed}" does not match the mandatory organizational domain pattern (@xxx.silveroaks.co.in).`,
                          role: 'None (Restricted)'
                        });
                      }
                    }, 50);
                  }}
                  className="px-2.5 py-1 bg-zinc-800 hover:bg-zinc-750 text-[11px] font-mono text-zinc-300 border border-zinc-700 transition cursor-pointer"
                >
                  {p.label}
                </button>
              ))}
            </div>

            {/* Validation Feedback Display */}
            {validationResult && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-5 border ${
                  validationResult.valid
                    ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-300'
                    : 'bg-red-950/30 border-red-500/50 text-red-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  {validationResult.valid ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  ) : (
                    <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                  )}
                  <div className="space-y-1.5 min-w-0">
                    <div className="font-mono text-xs font-bold uppercase tracking-wider">
                      {validationResult.valid ? 'Authentication Succeeded' : 'Access Restricted'}
                    </div>
                    <div className="text-xs sm:text-sm font-mono text-zinc-200">
                      {validationResult.message}
                    </div>
                    <div className="text-xs font-mono text-zinc-400 pt-1">
                      Assigned Identity Role: <span className="font-bold text-white">{validationResult.role}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      )}

      {/* Lightbox / Zoom Modal */}
      <AnimatePresence>
        {zoomedImage && (
          <div 
            className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-zinc-950/90 backdrop-blur-md"
            onClick={() => setZoomedImage(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-5xl w-full bg-zinc-900 border border-zinc-700 p-3 sm:p-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-3">
                <div className="min-w-0 pr-4">
                  <h4 className="text-sm sm:text-base font-bold text-white font-mono truncate">
                    {zoomedImage.title}
                  </h4>
                  <p className="text-xs text-zinc-400 truncate">
                    {zoomedImage.caption}
                  </p>
                </div>
                <button
                  onClick={() => setZoomedImage(null)}
                  className="p-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-zinc-700 transition cursor-pointer shrink-0"
                  aria-label="Close Lightbox"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="max-h-[75vh] overflow-auto bg-zinc-950 border border-zinc-800 flex items-center justify-center p-2">
                <img 
                  src={zoomedImage.src} 
                  alt={zoomedImage.title}
                  className="max-h-[72vh] w-auto object-contain mx-auto"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
