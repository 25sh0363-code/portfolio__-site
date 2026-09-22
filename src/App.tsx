import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Code2, GraduationCap, BookmarkCheck, MessageSquare, User, Menu, X, Landmark } from 'lucide-react';

// Custom component imports
import Hero from './components/Hero';
import Projects from './components/Projects';
import Resume from './components/Resume';
import LOR from './components/LOR';
import Contact from './components/Contact';
import SecretAdminModal from './components/SecretAdminModal';

// Static Data
import { HERO_BIO } from './data';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('about');
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSecretModalOpen, setIsSecretModalOpen] = useState(false);

  // Always scroll to top when changing navigation tabs or selecting a project
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [activeTab, selectedProjectId]);

  const handleOpenProject = (projectId: string) => {
    setSelectedProjectId(projectId);
    setActiveTab('projects');
  };

  const navItems = [
    { id: 'about', label: 'Overview' },
    { id: 'projects', label: 'Projects' },
    { id: 'resume', label: 'CV & Credentials' },
    { id: 'lor', label: 'Recommendations' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-50 font-sans selection:bg-zinc-100/10 selection:text-white">
      
      {/* Visual background atmospheric elements aligned with the bold minimalist style */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:24px_24px] opacity-20" />
      </div>

      {/* Header Sticky Navigation (Safe-space index 40) */}
      <header className="sticky top-0 z-40 w-full border-b border-zinc-900 bg-zinc-950/95 backdrop-blur-md no-print">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex h-20 items-center justify-between">
            
            {/* Logo initials */}
            <motion.button 
              onClick={() => {
                setSelectedProjectId(null);
                setActiveTab('about');
              }}
              className="flex flex-col hover:opacity-85 transition cursor-pointer text-left"
              id="nav-logo"
            >
              <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 mb-1 font-mono font-medium">Student Portfolio</span>
              <span className="text-2xl font-extrabold tracking-tighter italic font-serif text-white">OSK.</span>
            </motion.button>

            {/* Desktop Navigation Links */}
            <nav className="hidden md:flex items-center gap-10">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    id={`nav-item-${item.id}`}
                    onClick={() => {
                      if (item.id === 'projects') {
                        setSelectedProjectId(null);
                      }
                      setActiveTab(item.id);
                    }}
                    className={`relative py-1.5 text-[11px] uppercase tracking-widest font-bold transition-all cursor-pointer ${
                      isActive 
                        ? 'text-zinc-50 border-b border-zinc-50' 
                        : 'text-zinc-400 hover:text-zinc-50 border-b border-transparent hover:border-zinc-800'
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>

            {/* Mobile Navigation Trigger Button */}
            <div className="flex md:hidden">
              <button
                id="btn-mobile-trigger"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-zinc-400 hover:text-white rounded-lg transition"
                aria-label="Toggle Navigation Menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Nav Slide-out Panel */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden border-b border-zinc-900 bg-zinc-950 overflow-hidden"
              id="mobile-nav-panel"
            >
              <div className="space-y-1 px-4 py-4">
                {navItems.map((item) => {
                  return (
                    <button
                      key={item.id}
                      id={`mobile-nav-item-${item.id}`}
                      onClick={() => {
                        if (item.id === 'projects') {
                          setSelectedProjectId(null);
                        }
                        setActiveTab(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-4 py-3 text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
                        activeTab === item.id 
                          ? 'bg-zinc-900 text-white border border-zinc-805' 
                          : 'text-zinc-400 hover:bg-zinc-900/50 hover:text-white'
                      }`}
                    >
                      <span>{item.label}</span>
                      <span>→</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Main Container Stage (Safe-space index 20) */}
      <main className="relative z-10 px-4 sm:px-6 min-h-[calc(100vh-14rem)] flex flex-col justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="w-full"
          >
            {activeTab === 'about' && (
              <Hero 
                setActiveTab={setActiveTab} 
                onOpenProject={handleOpenProject}
                onSecretEntrance={() => setIsSecretModalOpen(true)}
              />
            )}
            {activeTab === 'projects' && (
              <Projects 
                initialProjectId={selectedProjectId}
                onClearProjectId={() => setSelectedProjectId(null)}
              />
            )}
            {activeTab === 'resume' && <Resume />}
            {activeTab === 'lor' && (
              <LOR 
                onNavigateToContact={() => setActiveTab('contact')}
                onNavigateToCredentials={() => setActiveTab('resume')}
              />
            )}
            {activeTab === 'contact' && <Contact />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Footer Branding line (Safe-space index 30) */}
      <footer className="border-t border-zinc-900 bg-zinc-950 py-10 mt-16 relative z-10 no-print">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-4">
            <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-zinc-500 font-mono font-semibold">
              Available for Internship 2026
            </span>
          </div>

          <div className="text-center sm:text-right font-mono text-[9px] text-zinc-600 uppercase tracking-[0.2em] space-y-1">
            <div>© {new Date().getFullYear()} Om Suraj Kashikar. Designed for Impact.</div>
            <div className="text-zinc-700">Physics & Creative Technology Joint Exhibits</div>
          </div>

        </div>
      </footer>

      {/* Secret Developer Console Modal */}
      <SecretAdminModal 
        isOpen={isSecretModalOpen} 
        onClose={() => setIsSecretModalOpen(false)} 
      />

    </div>
  );
}
