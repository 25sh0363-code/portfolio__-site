import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, Github, Globe, ExternalLink, QrCode, 
  Layers, CheckCircle2, ShieldCheck, Users, Calendar, 
  BookOpen, FileText, Camera, Maximize2, X, Terminal, Search, Check
} from 'lucide-react';
import { SOMUN_DATA } from '../../data';
import { fixAssetUrl } from '../../utils/assets';

interface SomunInteractivePageProps {
  onBack: () => void;
}

export default function SomunInteractivePage({ onBack }: SomunInteractivePageProps) {
  const [activeTab, setActiveTab] = useState<'pages' | 'register-shot' | 'ledger-shot' | 'scan-shot'>('pages');
  const [zoomedImage, setZoomedImage] = useState<{ src: string; title: string } | null>(null);

  const screenshotList = [
    {
      id: 'register-shot',
      title: '5-Step Delegate Registration Portal',
      urlPath: '/register',
      image: fixAssetUrl('/somun/somun-shot-1.png'),
      description: 'The 5-step delegate registration stepper collecting Personal Information, MUN Experience & Tiering, 3-tier Committee Preferences, Code of Conduct Terms, and Referral/Payment verification.',
      highlights: [
        'Step I: Personal Information (Name, Email, WhatsApp, Grade, Emergency Parent Contact)',
        'Step II: Experience & Tiering (MUN background & delegate level)',
        'Step III: Committee Preferences (Top 3 chamber choices & position papers)',
        'Step IV: Terms & Conditions (Delegate Code of Conduct)',
        'Step V: Referral & Payment Verification (UPI transaction reference check)'
      ]
    },
    {
      id: 'ledger-shot',
      title: 'Secretariat Verification Console & Ledger',
      urlPath: '/staff/ledger',
      image: fixAssetUrl('/somun/somun-shot-2.png'),
      description: 'The live secretariat control panel tracking 528 total delegate registrations, 471 fee-verified payments, automated bank credit feed matching, and 1-click email confirmation triggers.',
      highlights: [
        '528 Live Registrations (471 Fee Verified, 57 Single Registrations)',
        'Financial Tracker: ₹14,78,146.52 Invoiced / ₹13,18,575.78 Confirmed',
        'Automatic UTR cross-matching against bank credit feed',
        '1-Click Email Trigger Queue (Re-queue mails, View payment, Revert status)',
        'Search verified delegates by name, reference code, email, or UTR'
      ]
    },
    {
      id: 'scan-shot',
      title: 'Staff Gate Pass & Camera QR Check-In Scanner',
      urlPath: '/staff/scan',
      image: fixAssetUrl('/somun/somun-shot-3.png'),
      description: 'The staff-only gate pass verification interface utilizing live device cameras or manual reference code lookups to validate delegate QR passes across the 3-day event.',
      highlights: [
        'Live Device Camera QR Scanner integration',
        'Manual Reference Code Lookup fallback',
        'Strict 1-scan-per-day gate check-in rule across the 3-day conference',
        'Instant delegate record pull-up with council allocation verification'
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
            <Terminal className="w-3 h-3 text-zinc-400" /> Lead Tech Head & Systems Architect
          </span>
          <span className="px-2.5 py-0.5 bg-zinc-900 text-zinc-300 border border-zinc-800 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
            <Globe className="w-3 h-3 text-zinc-400" /> Live URL: somunhyd.in
          </span>
          <span className="px-2.5 py-0.5 bg-zinc-900 text-zinc-300 border border-zinc-800 text-[10px] uppercase tracking-wider">
            Silver Oaks International School (Bowrampet Campus)
          </span>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight uppercase font-display flex items-center gap-3">
              <span>SOMUN '26 — Official Web Engine</span>
            </h1>
            <p className="text-zinc-400 text-xs mt-2 max-w-3xl leading-relaxed font-sans font-light">
              Official web portal and platform architecture for SOMUN '26 (somunhyd.in) — Silver Oaks Model United Nations Eighth Edition (MMXXVI).
            </p>
          </div>

          <div className="flex flex-wrap gap-2.5 shrink-0">
            <a
              href="https://somunhyd.in"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-100 hover:bg-white text-zinc-950 font-mono text-xs uppercase tracking-wider font-bold transition-colors border border-zinc-100"
              id="btn-somun-live-site"
            >
              <Globe className="w-4 h-4" />
              Visit Live Site (somunhyd.in)
              <ExternalLink className="w-3 h-3" />
            </a>

            <a
              href={SOMUN_DATA.githubRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-white font-mono text-xs uppercase tracking-wider font-bold border border-zinc-700 transition-colors"
              id="btn-somun-github"
            >
              <Github className="w-4 h-4" />
              GitHub Repository
            </a>
          </div>
        </div>
      </div>

      {/* Feature Navigation Tabs */}
      <div className="flex flex-wrap gap-1 border-b border-zinc-800 pb-4 mb-8">
        {[
          { id: 'pages', label: '🌐 Website Structure & Pages (somunhyd.in)', icon: Globe },
          { id: 'register-shot', label: '📋 Registration Stepper', icon: FileText },
          { id: 'ledger-shot', label: '📊 Secretariat Ledger', icon: ShieldCheck },
          { id: 'scan-shot', label: '📷 Gate QR Scanner', icon: Camera }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              id={`tab-somun-${tab.id}`}
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
              Page Breakdown & Platform Features (somunhyd.in)
            </h2>
            <p className="text-xs text-zinc-400 font-sans mt-1 leading-relaxed">
              Complete user-facing and staff-facing page layout of the production portal built for the Silver Oaks Model United Nations Eighth Edition.
            </p>
          </div>

          {/* EMBEDDED PRODUCTION SCREENSHOTS GALLERY IN WEBSITE STRUCTURE */}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Page 1: Home Page */}
            <div className="p-5 bg-zinc-950 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                <span className="text-xs font-bold text-white uppercase font-mono flex items-center gap-2">
                  <Globe className="w-4 h-4 text-zinc-400" />
                  1. Home Page (`/`)
                </span>
                <span className="text-[9px] bg-zinc-900 text-zinc-400 px-2 py-0.5 border border-zinc-850">
                  Public Landing
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Primary landing hero featuring the conference slogan <em className="text-zinc-200">"Words, not war — resolve, don't rally"</em>, event dates, live gavel countdown timer, venue details (Silver Oaks Bowrampet Campus), and direct portal navigation.
              </p>
            </div>

            {/* Page 2: About Us */}
            <div className="p-5 bg-zinc-950 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                <span className="text-xs font-bold text-white uppercase font-mono flex items-center gap-2">
                  <Users className="w-4 h-4 text-zinc-400" />
                  2. About Us (`/about`)
                </span>
                <span className="text-[9px] bg-zinc-900 text-zinc-400 px-2 py-0.5 border border-zinc-850">
                  Secretariat & Vision
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Overview of the 8th Edition of SOMUN (MMXXVI), Secretariat team welcome addresses, school history, and diplomatic principles guiding the committee sessions.
              </p>
            </div>

            {/* Page 3: Committees */}
            <div className="p-5 bg-zinc-950 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                <span className="text-xs font-bold text-white uppercase font-mono flex items-center gap-2">
                  <Layers className="w-4 h-4 text-zinc-400" />
                  3. Committees (`/committees`)
                </span>
                <span className="text-[9px] bg-zinc-900 text-zinc-400 px-2 py-0.5 border border-zinc-850">
                  12 Chambers
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Comprehensive directory of all 12 committee chambers (DISEC, UNHRC, ECOSOC, UNODC, UNCTC, UNSCW, UNOOSA, HCC, ICC, AIPPM, MCU, IP) detailing agendas, Executive Board rosters, matrix allotments, and downloadable background guides.
              </p>
            </div>

            {/* Page 4: Itinerary */}
            <div className="p-5 bg-zinc-950 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                <span className="text-xs font-bold text-white uppercase font-mono flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-zinc-400" />
                  4. Itinerary (`/itinerary`)
                </span>
                <span className="text-[9px] bg-zinc-900 text-zinc-400 px-2 py-0.5 border border-zinc-850">
                  3-Day Schedule
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Hour-by-hour programme schedule covering Day 01 registration and opening ceremony, Day 02 committee debate sessions and Socials night, and Day 03 draft resolution voting and awards ceremony.
              </p>
            </div>

            {/* Page 5: Resources */}
            <div className="p-5 bg-zinc-950 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                <span className="text-xs font-bold text-white uppercase font-mono flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-zinc-400" />
                  5. Resources (`/resources`)
                </span>
                <span className="text-[9px] bg-zinc-900 text-zinc-400 px-2 py-0.5 border border-zinc-850">
                  Handbooks & ROP
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Delegate handbook repository containing Rules of Procedure (ROP), Position Paper writing guidelines, resolution formatting standards, and delegate FAQs.
              </p>
            </div>

            {/* Page 6: Registration Portal */}
            <div className="p-5 bg-zinc-950 border border-zinc-800 space-y-3">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                <span className="text-xs font-bold text-white uppercase font-mono flex items-center gap-2">
                  <FileText className="w-4 h-4 text-zinc-400" />
                  6. Registration Portal (`/register`)
                </span>
                <span className="text-[9px] bg-zinc-900 text-zinc-400 px-2 py-0.5 border border-zinc-850">
                  5-Step Form
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Interactive 5-step registration wizard managing individual delegates, school delegations, committee preferences, and payment reconciliation.
              </p>
            </div>

            {/* Page 7: Secretariat Console */}
            <div className="p-5 bg-zinc-950 border border-zinc-800 space-y-3 md:col-span-2">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                <span className="text-xs font-bold text-white uppercase font-mono flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-zinc-400" />
                  7. Staff Console & Gate Check-In (`/staff`)
                </span>
                <span className="text-[9px] bg-zinc-900 text-zinc-400 px-2 py-0.5 border border-zinc-850">
                  Staff Only Access
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                Restricted admin portal featuring the real-time financial verification ledger (tracking 528+ records) and live camera QR gate pass check-in scanner for Day 1-3 gate verification.
              </p>
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
                        <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
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
