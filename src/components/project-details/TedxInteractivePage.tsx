import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, Github, Globe, ExternalLink, 
  Layers, Check, Users, BookOpen, FileText, Camera, Maximize2, X, Terminal, Database, Server
} from 'lucide-react';
import { TEDX_DATA } from '../../data';
import { fixAssetUrl } from '../../utils/assets';

interface TedxInteractivePageProps {
  onBack: () => void;
}

export default function TedxInteractivePage({ onBack }: TedxInteractivePageProps) {
  const [activeTab, setActiveTab] = useState<'pages' | 'portal-shot' | 'team-shot' | 'scan-shot'>('pages');
  const [zoomedImage, setZoomedImage] = useState<{ src: string; title: string } | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const screenshotList = [
    {
      id: 'portal-shot',
      title: 'Visitor Portal — Hero Landing Section',
      urlPath: '/',
      image: fixAssetUrl('/tedx/tedx-shot-1.png'),
      description: "The primary visitor landing interface for TEDxSilverOaks, introducing the conference theme 'Unveiling Maya: The Illusions of Reality' on 20th Dec 2025. Set over a monochrome sketched portrait with distinct action triggers.",
      highlights: [
        "Navigation bar: HOME, ABOUT, SPEAKERS, SCHEDULE, TEAM, FAQ options",
        "Primary action button: 'REGISTER' linking directly to the registration form",
        "Dual engagement buttons: 'JOIN THE EXPERIENCE →' and 'MEET OUR SPEAKERS'",
        "Verified event metadata: '20TH DEC 2025 • HYDERABAD' with calendar indicator",
        "Clean monochrome aesthetic with subtle red brand accents"
      ],
      details: "The visitor portal is hosted as a standalone, lightweight web app (Repository: 25sh0363-code/tedx). When visitors register, their details are sent directly to a Google Apps Script webhook, which records them in Google Sheets and triggers an automated confirmation email with a unique QR code pass."
    },
    {
      id: 'team-shot',
      title: 'Team Directory — Technical Head Spotlight',
      urlPath: '/#team',
      image: fixAssetUrl('/tedx/tedx-shot-4.png'),
      description: "The official team profiles directory featuring Technical Head Om Suraj Kashikar. Renders a developer card with neon outer border styling, detailed biography, programming specializations, and departmental classification.",
      highlights: [
        "Department classification badge: Red 'TECH' identifier",
        "Developer biography highlighting full-stack engineering, AI/ML pipelines, and micro-controller debugging",
        "Grid-aligned team roster showcasing student leadership and cross-functional operations",
        "High-contrast dark-mode presentation with clean typography and structural spacing",
        "Documented credit as the primary architect behind the entire registration & scanner infrastructure"
      ],
      details: "As Lead Technical Developer, Om Suraj Kashikar conceived, developed, and deployed the entire digital infrastructure for TEDxSilverOaks under strict budget constraints, choosing an innovative Google Apps Script + Google Sheets architecture rather than paying for expensive commercial event platforms."
    },
    {
      id: 'scan-shot',
      title: 'Staff Gate Check-In & Camera QR Scanner',
      urlPath: '/staff',
      image: fixAssetUrl('/tedx/tedx-shot-5.png'),
      description: "The standalone, mobile-first gate pass check-in application deployed exclusively to event staff. Displays real-time attendance statistics (111 Checked In, 117 Registered, 6 Pending) alongside a live camera viewfinder for sub-300ms pass validation.",
      highlights: [
        "Real-time attendance counter: 111 Checked In / 117 Total Registered / 6 Pending Arrival",
        "Embedded device camera viewfinder with corner alignment guides and scanning frame",
        "'SCAN NEXT' rapid-flow trigger enabling seamless sequential gate admission",
        "Sub-300ms verification round-trip querying Google Sheets via Apps Script GET webhook",
        "Duplicate scan protection alerting staff if a ticket has already been used"
      ],
      details: "The staff portal is maintained in a completely separate repository (Repository: 25sh0363-code/tedx-checkin). Built with HTML5 and html5-qrcode, it runs entirely in mobile browsers without requiring native app store downloads. When a badge is scanned, it queries the Google Sheets ledger via Apps Script to verify validity and log the check-in timestamp."
    }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 py-8 px-4 sm:px-6 max-w-5xl mx-auto text-left font-mono selection:bg-zinc-800">
      
      {/* Top Breadcrumb & Header */}
      <div className="border-b border-zinc-800 pb-6 mb-8">
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
            <Terminal className="w-3 h-3 text-zinc-400" /> Lead Systems Architect & Tech Head
          </span>
          <span className="px-2.5 py-0.5 bg-zinc-900 text-zinc-300 border border-zinc-800 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
            <Database className="w-3 h-3 text-zinc-400" /> Database: Google Sheets
          </span>
          <span className="px-2.5 py-0.5 bg-zinc-900 text-zinc-300 border border-zinc-800 text-[10px] uppercase tracking-wider flex items-center gap-1">
            <Server className="w-3 h-3 text-zinc-400" /> Backend: Google Apps Script Webhooks
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase font-display flex items-center gap-3">
              <span>TEDxSilverOaks Digital Platform</span>
            </h1>
            <p className="text-zinc-400 text-xs mt-2 max-w-3xl leading-relaxed font-sans font-light">
              Official web platform and gate check-in system for TEDxSilverOaks. Built as two separate applications (visitor portal and staff scanner app) connected through Google Apps Script and Google Sheets for delegate registration, transactional QR email dispatch, and gate pass verification.
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 shrink-0">
            <a
              href={TEDX_DATA.githubRepoMain}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-100 hover:bg-white text-zinc-950 font-mono text-xs uppercase tracking-wider font-bold transition-colors border border-zinc-100"
              id="btn-tedx-main-repo"
            >
              <Github className="w-4 h-4" />
              Visitor Portal Repo
              <ExternalLink className="w-3 h-3" />
            </a>

            <a
              href={TEDX_DATA.githubRepoCheckin}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs uppercase tracking-wider font-bold border border-zinc-800 transition-colors"
              id="btn-tedx-checkin-repo"
            >
              <Github className="w-4 h-4" />
              Staff Scanner Repo
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>

      {/* Feature Navigation Tabs */}
      <div className="flex flex-wrap gap-1 border-b border-zinc-800 pb-4 mb-8">
        {[
          { id: 'pages', label: '🌐 Website Structure & Pages', icon: Globe },
          { id: 'portal-shot', label: '🖥️ Visitor Web Portal (`/`)', icon: FileText },
          { id: 'team-shot', label: '👨‍💻 Tech Head Bio (`/#team`)', icon: Users },
          { id: 'scan-shot', label: '📷 Staff Gate Scanner (`/staff`)', icon: Camera }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`tab-tedx-${tab.id}`}
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

      {/* TAB 1: WEBSITE STRUCTURE & PAGES */}
      {activeTab === 'pages' && (
        <div className="space-y-10">
          
          <div className="border-b border-zinc-800 pb-3">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold block">
              Official Site Architecture
            </span>
            <h2 className="text-xl font-bold text-white uppercase font-display">
              Page Breakdown & Platform Features
            </h2>
            <p className="text-xs text-zinc-400 font-sans mt-1 leading-relaxed">
              Complete layout detailing both public promotional content and the closed staff check-in scanner.
            </p>
          </div>

          {/* EMBEDDED PRODUCTION SCREENSHOTS GALLERY */}
          <div className="space-y-4">
            <div className="flex items-center justify-between border-b border-zinc-850 pb-2">
              <span className="text-xs font-bold text-white font-mono uppercase flex items-center gap-2">
                <Camera className="w-4 h-4 text-zinc-400" />
                Production Portal Web Screenshots (Click to Expand)
              </span>
              <span className="text-[10px] text-zinc-500 font-mono">3 Core Systems</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {screenshotList.map((shot) => (
                <div 
                  key={shot.id} 
                  className="bg-zinc-950 border border-zinc-800 group hover:border-zinc-700 transition-all cursor-pointer overflow-hidden flex flex-col justify-between"
                  onClick={() => setZoomedImage({ src: shot.image, title: shot.title })}
                >
                  <div className="relative aspect-video bg-zinc-900 border-b border-zinc-850 overflow-hidden">
                    <img 
                      src={shot.image} 
                      alt={shot.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white text-[11px] font-mono font-bold uppercase">
                      <Maximize2 className="w-3.5 h-3.5" /> Expand
                    </div>
                  </div>
                  <div className="p-3 space-y-1">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold block">{shot.urlPath}</span>
                    <h3 className="text-xs font-bold text-white uppercase font-mono line-clamp-1">{shot.title}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Page Breakdown Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Page 1: Hero Landing */}
            <div className="p-5 bg-zinc-950 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                <span className="text-xs font-bold text-white uppercase font-mono flex items-center gap-2">
                  <Globe className="w-4 h-4 text-zinc-400" />
                  1. Public Home / Hero Landing (`/`)
                </span>
                <span className="text-[9px] bg-zinc-900 text-zinc-400 px-2 py-0.5 border border-zinc-850">
                  Public Landing
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Clean monochromatic landing page introducing the <strong className="text-zinc-200">"Unveiling Maya: The Illusions of Reality"</strong> theme for 20th Dec 2025. Acts as the primary portal where visitors learn about the event, view the speaker lineup, and register for seats.
              </p>
            </div>

            {/* Page 2: About the Theme */}
            <div className="p-5 bg-zinc-950 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                <span className="text-xs font-bold text-white uppercase font-mono flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-zinc-400" />
                  2. About the Theme Section (`/#about`)
                </span>
                <span className="text-[9px] bg-zinc-900 text-zinc-400 px-2 py-0.5 border border-zinc-850">
                  Conference Theme
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Explores the philosophical core of Maya across three distinct tracks: <strong className="text-zinc-200">Identity & Self</strong>, <strong className="text-zinc-200">Time & Efficiency</strong>, and <strong className="text-zinc-200">Connection & Distance</strong>, accompanied by official event graphics.
              </p>
            </div>

            {/* Page 3: Team Directory */}
            <div className="p-5 bg-zinc-950 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                <span className="text-xs font-bold text-white uppercase font-mono flex items-center gap-2">
                  <Users className="w-4 h-4 text-zinc-400" />
                  3. Team Directory & Tech Head (`/#team`)
                </span>
                <span className="text-[9px] bg-zinc-900 text-zinc-400 px-2 py-0.5 border border-zinc-850">
                  Student Leadership
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Highlights the organizing student committee, specifically featuring <strong className="text-zinc-200">Om Suraj Kashikar</strong> as Technical Head with his technical bio, skillsets in full-stack web and ML development, and leadership credits.
              </p>
            </div>

            {/* Page 4: Staff Check-In Scanner */}
            <div className="p-5 bg-zinc-950 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                <span className="text-xs font-bold text-white uppercase font-mono flex items-center gap-2">
                  <Camera className="w-4 h-4 text-zinc-400" />
                  4. Staff Check-In & Scanner Console (`/staff`)
                </span>
                <span className="text-[9px] bg-zinc-900 text-zinc-400 px-2 py-0.5 border border-zinc-850">
                  Staff Only Portal
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                A dedicated, mobile-friendly check-in console built in a separate repository. Used by venue volunteers to scan delegate QR codes with device cameras, verify attendance against Google Sheets, and prevent duplicate entries.
              </p>
            </div>

          </div>

          {/* How The Two Apps Connect (Clean Explanation) */}
          <div className="bg-zinc-900/40 border border-zinc-800 p-5 space-y-3">
            <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider block border-b border-zinc-800 pb-2 flex items-center gap-2">
              <Layers className="w-3.5 h-3.5 text-zinc-400" />
              How the Two Separate Applications Connect via Google Apps Script & Sheets
            </span>
            <div className="space-y-3 text-xs font-sans text-zinc-300 leading-relaxed">
              <p>
                The <strong>Visitor Portal</strong> and the <strong>Staff Scanner Console</strong> are two distinct frontends deployed independently to keep public visitors and staff workflows completely separate:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1 font-mono text-[11px]">
                <div className="p-3 bg-zinc-950 border border-zinc-850 space-y-1">
                  <div className="font-bold text-white">1. Registration Form</div>
                  <div className="text-zinc-400 font-sans text-[11px]">User submits registration details on the visitor portal. An HTTP POST request sends the data to the Google Apps Script webhook.</div>
                </div>
                <div className="p-3 bg-zinc-950 border border-zinc-850 space-y-1">
                  <div className="font-bold text-white">2. Sheets & Email Pass</div>
                  <div className="text-zinc-400 font-sans text-[11px]">Apps Script adds a row in Google Sheets and triggers Gmail MailApp to automatically email the user an HTML pass with their unique QR code.</div>
                </div>
                <div className="p-3 bg-zinc-950 border border-zinc-850 space-y-1">
                  <div className="font-bold text-white">3. Gate Camera Scan</div>
                  <div className="text-zinc-400 font-sans text-[11px]">Volunteers scan passes on the staff app. An HTTP GET request verifies the ticket and updates the check-in status directly in Google Sheets in sub-300ms.</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* SCREENSHOT EXHIBIT TAB RENDERING */}
      {activeTab !== 'pages' && (
        <div className="space-y-6">
          {(() => {
            const currentShot = screenshotList.find(s => s.id === activeTab)!;
            return (
              <div className="space-y-6">
                
                <div className="border-b border-zinc-800 pb-3">
                  <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold block">
                    Actual Screenshot from {currentShot.urlPath}
                  </span>
                  <h2 className="text-xl font-bold text-white uppercase font-display">
                    {currentShot.title}
                  </h2>
                  <p className="text-xs text-zinc-400 font-sans mt-1">
                    {currentShot.description}
                  </p>
                </div>

                {/* Screenshot Display Card */}
                <div className="bg-zinc-950 border border-zinc-800 p-2 relative group overflow-hidden">
                  <div className="relative overflow-hidden bg-black aspect-video flex items-center justify-center">
                    <img
                      src={currentShot.image}
                      alt={currentShot.title}
                      className="w-full h-full object-contain"
                      referrerPolicy="no-referrer"
                    />

                    {/* Expand Zoom Button */}
                    <button
                      onClick={() => setZoomedImage({ src: currentShot.image, title: currentShot.title })}
                      className="absolute bottom-4 right-4 px-4 py-2 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700 text-white text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 transition-colors cursor-pointer shadow-xl"
                    >
                      <Maximize2 className="w-4 h-4" />
                      Expand High-Res Image
                    </button>
                  </div>
                </div>

                {/* Grounded Key Observations & Features List */}
                <div className="bg-zinc-900/40 border border-zinc-850 p-5 space-y-3">
                  <span className="text-[10px] text-zinc-400 uppercase font-bold tracking-wider block border-b border-zinc-800 pb-2">
                    Verified Material Observations & Features
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {currentShot.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300 font-sans">
                        <Check className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Engineering Overview Note */}
                <div className="p-4 bg-zinc-950 border border-zinc-850 text-xs text-zinc-400 font-sans leading-relaxed">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold block mb-1">Architecture Note:</span>
                  {currentShot.details}
                </div>

              </div>
            );
          })()}
        </div>
      )}

      {/* High-Res Image Zoom Modal */}
      <AnimatePresence>
        {zoomedImage && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4 bg-black/95 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative max-w-6xl w-full max-h-[90vh] bg-zinc-950 border border-zinc-800 p-4 overflow-hidden flex flex-col space-y-3"
            >
              <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                <span className="text-xs font-bold text-white uppercase font-mono">
                  {zoomedImage.title}
                </span>
                <button
                  onClick={() => setZoomedImage(null)}
                  className="p-1 text-zinc-400 hover:text-white cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="overflow-auto max-h-[80vh] flex items-center justify-center bg-black">
                <img
                  src={zoomedImage.src}
                  alt={zoomedImage.title}
                  className="w-auto h-auto max-w-full max-h-[75vh] object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
