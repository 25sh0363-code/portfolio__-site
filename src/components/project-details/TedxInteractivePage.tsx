import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, Github, ExternalLink, QrCode, Database, Mail, Cpu, Maximize2, X, Search, Check, AlertCircle, Camera, CheckCircle2,
  Calendar, Award, Users, BookOpen, Layout
} from 'lucide-react';
import { TEDX_DATA } from '../../data';
import { fixAssetUrl } from '../../utils/assets';

interface TedxInteractivePageProps {
  onBack: () => void;
}

interface MockAttendee {
  id: string;
  name: string;
  email: string;
  role: 'Speaker' | 'Delegate' | 'VIP' | 'Staff';
  ticketCode: string;
  status: 'Pending' | 'Checked In' | 'Invalid';
  checkinTime?: string;
}

export default function TedxInteractivePage({ onBack }: TedxInteractivePageProps) {
  const [activeTab, setActiveTab] = useState<'interactive' | 'pages' | 'screenshots' | 'architecture'>('interactive');
  const [zoomedImage, setZoomedImage] = useState<{ src: string; title: string } | null>(null);
  
  // Interactive Simulator State
  const [attendees, setAttendees] = useState<MockAttendee[]>([
    { id: '1', name: 'Dr. Aarav Mehta', email: 'aarav.mehta@university.edu', role: 'Speaker', ticketCode: 'TX-SPK-9021', status: 'Pending' },
    { id: '2', name: 'Ananya Iyer', email: 'ananya.iyer@gmail.com', role: 'Delegate', ticketCode: 'TX-DLG-4810', status: 'Pending' },
    { id: '3', name: 'Kabir Sharma', email: 'kabir.sharma@outlook.com', role: 'Delegate', ticketCode: 'TX-DLG-1154', status: 'Checked In', checkinTime: '10:14 AM' },
    { id: '4', name: 'Rohan Deshmukh', email: 'rohan.desh@yahoo.com', role: 'VIP', ticketCode: 'TX-VIP-3098', status: 'Pending' },
    { id: '5', name: 'Zoya Khan', email: 'zoya.k@silveroaks.edu.in', role: 'Staff', ticketCode: 'TX-STF-5502', status: 'Checked In', checkinTime: '08:45 AM' },
  ]);

  const [selectedScanId, setSelectedScanId] = useState<string>('1');
  const [scanning, setScanning] = useState<boolean>(false);
  const [scanResult, setScanResult] = useState<{
    success: boolean;
    message: string;
    attendee?: MockAttendee;
  } | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, []);

  const handleSimulateScan = () => {
    if (scanning) return;
    setScanning(true);
    setScanResult(null);

    // Simulate sub-300ms verification latency (280ms specifically)
    setTimeout(() => {
      setScanning(false);
      
      // Handle the "Invalid Ticket" special case
      if (selectedScanId === 'invalid') {
        setScanResult({
          success: false,
          message: 'INVALID PASS: Ticket signature hash verification failed.'
        });
        return;
      }

      const attendee = attendees.find(a => a.id === selectedScanId);
      if (!attendee) return;

      if (attendee.status === 'Checked In') {
        setScanResult({
          success: false,
          message: `DUPLICATE ENTRY: Pass already scanned today at ${attendee.checkinTime}.`,
          attendee
        });
        return;
      }

      // Mark Checked In
      const now = new Date();
      const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
      
      setAttendees(prev => prev.map(a => {
        if (a.id === selectedScanId) {
          return { ...a, status: 'Checked In', checkinTime: timeStr };
        }
        return a;
      }));

      setScanResult({
        success: true,
        message: 'PASS VERIFIED: Welcome to TEDxSilverOaks!',
        attendee: { ...attendee, status: 'Checked In', checkinTime: timeStr }
      });

    }, 350);
  };

  const filteredAttendees = attendees.filter(a => 
    a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.ticketCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    a.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full space-y-10 select-text pb-20">
      
      {/* Title / Back lockup */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-900 pb-6 text-left">
        <div className="space-y-1.5">
          <button 
            onClick={onBack}
            className="flex items-center gap-1 text-[11px] font-mono uppercase text-zinc-500 hover:text-zinc-200 transition cursor-pointer mb-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to engineering lab
          </button>
          <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-red-500 font-bold block">
            Custom Serverless Check-In & Onboarding Platform
          </span>
          <h1 className="text-3xl sm:text-4xl font-black text-white uppercase font-display tracking-tight">
            TEDxSilverOaks Digital Infrastructure
          </h1>
          <p className="text-xs text-zinc-400 font-mono">
            Repos: <a href={TEDX_DATA.githubRepoMain} target="_blank" rel="noreferrer" className="text-zinc-200 underline hover:text-red-400">tedx</a> · <a href={TEDX_DATA.githubRepoCheckin} target="_blank" rel="noreferrer" className="text-zinc-200 underline hover:text-red-400">tedx-checkin</a>
          </p>
        </div>

        <div className="flex gap-2">
          <a
            href={TEDX_DATA.githubRepoCheckin}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono font-bold uppercase tracking-wider hover:border-zinc-600 transition flex items-center gap-2"
          >
            <Github className="w-4 h-4" /> Scanner Repo
          </a>
          <a
            href={TEDX_DATA.githubRepoMain}
            target="_blank"
            rel="noreferrer"
            className="px-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-mono font-bold uppercase tracking-wider hover:border-zinc-600 transition flex items-center gap-2"
          >
            <Github className="w-4 h-4" /> Portal Repo
          </a>
        </div>
      </div>

      {/* Main Grid: Overview & Interactive Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Stats & Project Story */}
        <div className="lg:col-span-4 space-y-6 text-left">
          
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-2 font-mono">
            <div className="p-4 bg-zinc-900/60 border border-zinc-850">
              <span className="text-[10px] text-zinc-500 uppercase font-semibold block">Total Attendees</span>
              <span className="text-2xl font-bold tracking-tight text-white font-mono tabular-nums">200+</span>
            </div>
            <div className="p-4 bg-zinc-900/60 border border-zinc-850">
              <span className="text-[10px] text-zinc-500 uppercase font-semibold block">Gas Backend</span>
              <span className="text-2xl font-bold tracking-tight text-emerald-400 font-mono text-[11px] uppercase truncate">App Script API</span>
            </div>
            <div className="p-4 bg-zinc-900/60 border border-zinc-850">
              <span className="text-[10px] text-zinc-500 uppercase font-semibold block">Scan Latency</span>
              <span className="text-2xl font-bold tracking-tight text-cyan-400 font-mono tabular-nums">&lt;300ms</span>
            </div>
            <div className="p-4 bg-zinc-900/60 border border-zinc-850">
              <span className="text-[10px] text-zinc-500 uppercase font-semibold block">Platform Cost</span>
              <span className="text-2xl font-bold tracking-tight text-white font-mono tabular-nums">$0.00</span>
            </div>
          </div>

          {/* Project Story */}
          <div className="space-y-4 font-sans text-sm text-zinc-300 leading-relaxed font-light">
            <div className="p-4 bg-zinc-900/30 border border-zinc-900 space-y-2">
              <span className="text-[9px] font-mono uppercase tracking-widest text-red-500 font-bold block">Executive Summary</span>
              <p className="text-xs leading-relaxed text-zinc-400">
                {TEDX_DATA.overview}
              </p>
            </div>

            <div className="space-y-3 pt-2">
              <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold">
                Ecosystem Architecture Pillars
              </h3>
              <div className="space-y-2.5">
                {TEDX_DATA.architecture.map((arch, i) => (
                  <div key={i} className="p-3 bg-zinc-900/50 border border-zinc-850 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-white">{arch.component}</span>
                      <span className="text-[9px] font-mono text-cyan-400">{arch.tech}</span>
                    </div>
                    <p className="text-zinc-400 text-[11px] leading-relaxed">{arch.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

        {/* Right Column: Tabbed interactive environment */}
        <div className="lg:col-span-8 space-y-6">
          
          {/* Tabs header */}
          <div className="flex border-b border-zinc-850 gap-2 overflow-x-auto whitespace-nowrap">
            {[
              { id: 'interactive', label: 'Check-In Live Simulator' },
              { id: 'pages', label: 'Ecosystem Page Walkthrough' },
              { id: 'screenshots', label: 'Ecosystem Screenshots (5 Views)' },
              { id: 'architecture', label: 'System Flowchart & Specs' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`pb-2.5 px-2 text-xs font-mono uppercase tracking-wider font-bold transition-all cursor-pointer border-b-2 ${
                  activeTab === tab.id
                    ? 'border-red-500 text-white font-black'
                    : 'border-transparent text-zinc-400 hover:text-zinc-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* TAB 1: Live Simulator */}
          {activeTab === 'interactive' && (
            <div className="space-y-6">
              
              {/* Simulator Description banner */}
              <div className="p-4 bg-red-950/20 border border-red-900/40 rounded-none text-left">
                <span className="text-[10px] font-mono uppercase text-red-400 font-bold block">Interactive Laboratory Demo</span>
                <p className="text-[12px] text-zinc-300 leading-relaxed mt-1 font-sans">
                  We have simulated the high-speed staff camera scanner and Google Sheets backend databases below. Select a mock delegate badge, click <strong>"Simulate Camera Scan"</strong>, and witness the sub-300ms validation and instant synchronized Google Sheet update.
                </p>
              </div>

              {/* Simulation Workspace Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
                
                {/* Simulator Left Panel: Active QR Camera Frame */}
                <div className="bg-zinc-950 border border-zinc-800 p-5 flex flex-col justify-between text-left space-y-4">
                  <div>
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">Terminal Gate Client</span>
                    <h3 className="text-sm font-bold text-white uppercase tracking-tight">Gate Onboarding Terminal</h3>
                  </div>

                  {/* Camera Screen Simulator */}
                  <div className="relative aspect-video bg-zinc-900 border border-zinc-800 flex flex-col items-center justify-center overflow-hidden">
                    
                    {/* Simulated Scanner Elements */}
                    {scanning ? (
                      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 z-10">
                        <div className="w-10 h-10 border-2 border-red-500 border-t-transparent rounded-full animate-spin mb-2" />
                        <span className="text-[10px] font-mono text-red-400 uppercase tracking-widest animate-pulse">Scanning QR Pass...</span>
                      </div>
                    ) : (
                      <>
                        <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-red-500" />
                        <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-red-500" />
                        <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-red-500" />
                        <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-red-500" />
                        <div className="absolute left-0 right-0 h-0.5 bg-red-500/80 animate-bounce top-[30%]" />
                      </>
                    )}

                    <Camera className="w-12 h-12 text-zinc-700 mb-2" />
                    <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest">HTML5 Camera Live Capture</span>
                  </div>

                  {/* Simulator Select & Trigger controls */}
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-[10px] font-mono text-zinc-400 block font-semibold">Select Badge to Present to Scanner:</label>
                      <select
                        value={selectedScanId}
                        onChange={(e) => setSelectedScanId(e.target.value)}
                        className="w-full p-2.5 bg-zinc-900 border border-zinc-800 text-xs text-zinc-200 font-mono focus:border-red-500 outline-none"
                      >
                        <option value="1">Dr. Aarav Mehta (Speaker - Pending)</option>
                        <option value="2">Ananya Iyer (Delegate - Pending)</option>
                        <option value="3">Kabir Sharma (Delegate - Already Checked In)</option>
                        <option value="4">Rohan Deshmukh (VIP - Pending)</option>
                        <option value="5">Zoya Khan (Staff - Already Checked In)</option>
                        <option value="invalid">Compromised/Forged QR Ticket (Invalid Signature)</option>
                      </select>
                    </div>

                    <button
                      onClick={handleSimulateScan}
                      disabled={scanning}
                      className="w-full py-3 bg-red-600 hover:bg-red-500 text-white font-mono font-bold text-xs uppercase tracking-wider transition cursor-pointer flex items-center justify-center gap-2"
                    >
                      <QrCode className="w-4 h-4" /> Simulate Camera Scan
                    </button>
                  </div>

                  {/* Scan Result Indicator */}
                  <AnimatePresence mode="wait">
                    {scanResult && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className={`p-3 border text-xs font-mono flex items-start gap-2.5 ${
                          scanResult.success 
                            ? 'bg-emerald-950/40 border-emerald-800 text-emerald-400' 
                            : 'bg-rose-950/40 border-rose-800 text-rose-400'
                        }`}
                      >
                        {scanResult.success ? <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" /> : <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />}
                        <div className="space-y-0.5 text-left">
                          <span className="font-bold uppercase tracking-wide block">{scanResult.success ? 'CHECK-IN APPROVED' : 'CHECK-IN BLOCKED'}</span>
                          <p className="text-[11px] leading-relaxed text-zinc-300">{scanResult.message}</p>
                          {scanResult.attendee && (
                            <div className="text-[10px] text-zinc-400 mt-1 font-mono">
                              Code: {scanResult.attendee.ticketCode} | Scanned At: {scanResult.attendee.checkinTime}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Simulator Right Panel: Live Google Sheet Database */}
                <div className="bg-zinc-950 border border-zinc-800 p-5 flex flex-col justify-between text-left space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-widest block font-bold">Google Sheets Backend DB</span>
                      <span className="px-2 py-0.5 bg-emerald-950 border border-emerald-800 text-emerald-400 text-[8px] font-mono uppercase font-bold animate-pulse">Live Synced</span>
                    </div>
                    <h3 className="text-sm font-bold text-white uppercase tracking-tight">Sheet1: TEDxSilverOaks Attendance Registry</h3>
                  </div>

                  {/* Search Bar */}
                  <div className="relative">
                    <Search className="absolute left-3 top-2.5 w-3.5 h-3.5 text-zinc-500" />
                    <input
                      type="text"
                      placeholder="Query Sheet (Search Name, Code...)"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 text-xs text-zinc-300 font-mono outline-none focus:border-red-500"
                    />
                  </div>

                  {/* Sheets Table */}
                  <div className="flex-1 overflow-y-auto border border-zinc-900 max-h-[220px]">
                    <table className="w-full text-left font-mono text-[10px]">
                      <thead className="bg-zinc-900 text-zinc-400 sticky top-0 uppercase font-bold">
                        <tr className="border-b border-zinc-850">
                          <th className="p-2">Name</th>
                          <th className="p-2">Role</th>
                          <th className="p-2">Ticket Code</th>
                          <th className="p-2">Status</th>
                          <th className="p-2 text-right">Scanned At</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-900">
                        {filteredAttendees.map((att) => (
                          <tr key={att.id} className="hover:bg-zinc-900/40 text-zinc-300 transition-colors">
                            <td className="p-2 font-bold text-white">{att.name}</td>
                            <td className="p-2 text-zinc-400">{att.role}</td>
                            <td className="p-2 text-zinc-400 font-mono">{att.ticketCode}</td>
                            <td className="p-2">
                              <span className={`px-1.5 py-0.5 font-bold ${
                                att.status === 'Checked In' 
                                  ? 'text-emerald-400' 
                                  : 'text-amber-500'
                              }`}>
                                {att.status}
                              </span>
                            </td>
                            <td className="p-2 text-right text-zinc-500 font-mono font-medium">
                              {att.checkinTime || '—'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="pt-3 border-t border-zinc-900 flex justify-between items-center text-[10px] font-mono text-zinc-500">
                    <span>Database: live_registry_gas_api_v1</span>
                    <span className="text-zinc-400">Total Checked In: {attendees.filter(a => a.status === 'Checked In').length}/5</span>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* TAB 1.5: Ecosystem Page Walkthrough */}
          {activeTab === 'pages' && (
            <div className="space-y-6 text-left">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-red-500 font-bold block">
                  Interactive Site Directory
                </span>
                <h3 className="text-lg font-black text-white uppercase font-display">
                  Ecosystem Structure & Portal Walkthrough
                </h3>
                <p className="text-xs text-zinc-400 font-sans mt-1">
                  A high-fidelity layout overview detailing each page's specific routes, headers, and UI elements.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Page 1 */}
                <div className="p-5 bg-zinc-950 border border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                    <span className="text-xs font-bold text-white uppercase font-mono flex items-center gap-2">
                      <Layout className="w-4 h-4 text-red-500" />
                      1. Home Page / Hero Landing (`/`)
                    </span>
                    <span className="text-[9px] bg-red-950/20 text-red-400 px-2 py-0.5 border border-red-900/30">
                      Primary Entry
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                    Designed to match TED's core branding guidelines. Showcases the primary theme <strong>"Unveiling Maya: The Illusions of Reality"</strong> set for 20th Dec 2025 in Hyderabad, superimposed on a dark textured background with a custom monochrome face sketch. Features interactive buttons to register or view speakers.
                  </p>
                </div>

                {/* Page 2 */}
                <div className="p-5 bg-zinc-950 border border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                    <span className="text-xs font-bold text-white uppercase font-mono flex items-center gap-2">
                      <BookOpen className="w-4 h-4 text-red-500" />
                      2. About the Theme Section (`/#about`)
                    </span>
                    <span className="text-[9px] bg-red-950/20 text-red-400 px-2 py-0.5 border border-red-900/30">
                      Thematic Pillars
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                    Unpacks the conceptual meaning of <em>Maya</em> (illusions shaping human perception). Features three beautiful hover-reveal cards mapping the core focus tracks: <strong>Identity & Self</strong> (shaped expectations), <strong>Time & Efficiency</strong> (rushed lifestyles), and <strong>Connection & Distance</strong> (virtual links vs physical isolation).
                  </p>
                </div>

                {/* Page 3 */}
                <div className="p-5 bg-zinc-950 border border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                    <span className="text-xs font-bold text-white uppercase font-mono flex items-center gap-2">
                      <Award className="w-4 h-4 text-red-500" />
                      3. About TED Section (`/#about` / `/about`)
                    </span>
                    <span className="text-[9px] bg-red-950/20 text-red-400 px-2 py-0.5 border border-red-900/30">
                      Global Mission
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                    An educational portal explaining the origin of Technology, Entertainment, and Design (TED since 1984). It links global innovation principles directly with high school initiatives. Features a live stage action photograph from previous school-hosted TEDx conferences.
                  </p>
                </div>

                {/* Page 4 */}
                <div className="p-5 bg-zinc-950 border border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                    <span className="text-xs font-bold text-white uppercase font-mono flex items-center gap-2">
                      <Users className="w-4 h-4 text-red-500" />
                      4. Team Directory (`/team` / `/#team`)
                    </span>
                    <span className="text-[9px] bg-red-950/20 text-red-400 px-2 py-0.5 border border-red-900/30">
                      Staff Spotlights
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                    A directory spotlighting school organizers and technical officers. Prominently displays the custom <strong>Tech Head</strong> card of Class 11 developer Om Suraj Kashikar, utilizing a red neon glowing outer frame. Features portrait photos alongside details of coding, AI, and hardware specialties.
                  </p>
                </div>

                {/* Page 5 */}
                <div className="p-5 bg-zinc-950 border border-zinc-800 space-y-3 md:col-span-2">
                  <div className="flex items-center justify-between border-b border-zinc-900 pb-2">
                    <span className="text-xs font-bold text-white uppercase font-mono flex items-center gap-2">
                      <QrCode className="w-4 h-4 text-red-500" />
                      5. Staff Check-In & Scanner Console (`/staff`)
                    </span>
                    <span className="text-[9px] bg-red-950/20 text-red-400 px-2 py-0.5 border border-red-900/30">
                      Staff Operational Access
                    </span>
                  </div>
                  <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                    The mobile web check-in dashboard utilized by gate organizers during reception hours. Shows real-time crowd metrics (<strong>111 Checked In, 117 Registered, 6 Pending</strong>) and activates a live camera scanner with styled red borders and corner crop alignments, verifying scannable delegate passes in sub-300ms.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Screenshots Gallery */}
          {activeTab === 'screenshots' && (
            <div className="space-y-6 text-left">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-red-500 font-bold block">
                    Dynamic Ecosystem Gallery
                  </span>
                  <h3 className="text-lg font-black text-white uppercase font-display">
                    Ecosystem Walkthrough (5 Screens)
                  </h3>
                </div>
                <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
                  Click any screenshot to zoom full-screen
                </span>
              </div>

              {/* Grid of screenshots */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {TEDX_DATA.screenshots.map((screen) => (
                  <div
                    key={screen.id}
                    onClick={() => setZoomedImage({
                      src: fixAssetUrl(screen.imagePath),
                      title: `${screen.title} — ${screen.category}`
                    })}
                    className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden p-3 group cursor-pointer hover:border-red-500 transition-all flex flex-col justify-between"
                  >
                    <div className="relative rounded bg-black mb-3 overflow-hidden aspect-video flex items-center justify-center border border-zinc-850">
                      <img
                        src={fixAssetUrl(screen.imagePath)}
                        alt={screen.title}
                        className="max-w-full max-h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <Maximize2 className="w-5 h-5 text-red-500" />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-[9px] font-mono uppercase text-red-500 font-bold">
                          {screen.category}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-white tracking-tight line-clamp-1">
                        {screen.title}
                      </h4>
                      <p className="text-[11px] text-zinc-400 leading-normal font-light line-clamp-2">
                        {screen.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: System Flowchart / Apps Script Specs */}
          {activeTab === 'architecture' && (
            <div className="space-y-6 text-left">
              <div className="p-5 bg-zinc-900/40 border border-zinc-850 space-y-4">
                <span className="text-[10px] font-mono uppercase tracking-widest text-red-500 font-bold block">AppScript Backend Endpoint Documentation</span>
                <h3 className="text-md font-bold text-white uppercase tracking-tight font-display">REST API Specifications (`macros.js`)</h3>
                
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  We engineered custom Google Apps Script code deployed as a Web API executable. This bypasses typical hosting and middleware database bills completely. Below is a documentation schema mapping the core script endpoints:
                </p>

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 bg-zinc-950 border border-zinc-900 rounded space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.5 bg-emerald-950 border border-emerald-800 text-emerald-400 text-[8px] font-mono uppercase font-bold">POST</span>
                      <span className="font-bold text-white">/exec?action=register</span>
                    </div>
                    <p className="text-zinc-400 text-[11px] font-sans">
                      Registers a new delegate by creating a record in Sheet1. Allocates unique ticket ID hash, compiles verification token, and queues confirmation email.
                    </p>
                  </div>

                  <div className="p-3 bg-zinc-950 border border-zinc-900 rounded space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.5 bg-blue-950 border border-blue-800 text-blue-400 text-[8px] font-mono uppercase font-bold">GET</span>
                      <span className="font-bold text-white">/exec?action=verify&ticket=TX-DLG-XXXX</span>
                    </div>
                    <p className="text-zinc-400 text-[11px] font-sans">
                      Executes an instant indexed check of the registration ledger Sheet. Verifies authenticity, updates the check-in timestamp in Sheet2, and returns a JSON payload with check-in confirmation status.
                    </p>
                  </div>

                  <div className="p-3 bg-zinc-950 border border-zinc-900 rounded space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="px-1.5 py-0.5 bg-purple-950 border border-purple-800 text-purple-400 text-[8px] font-mono uppercase font-bold">CRON</span>
                      <span className="font-bold text-white">Trigger: sendConfirmationEmails()</span>
                    </div>
                    <p className="text-zinc-400 text-[11px] font-sans">
                      Triggers on registration complete to generate custom attendee tickets, render scannable high-resolution QR badges, and dispatch confirmation emails using the Google MailApp API.
                    </p>
                  </div>
                </div>
              </div>

              {/* Google Sheets DB Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 border border-zinc-850 bg-zinc-900/10 space-y-2 text-left">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-emerald-400" />
                    <span className="text-xs font-bold text-white">Sheets as a Database</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed font-light">
                    The backend leverages structured row indices, named ranges, and conditional formatting rules to emulate a lightweight transactional database with zero configuration overhead and instant backups.
                  </p>
                </div>

                <div className="p-4 border border-zinc-850 bg-zinc-900/10 space-y-2 text-left">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-cyan-400" />
                    <span className="text-xs font-bold text-white">Automated Ticket Dispatcher</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 leading-relaxed font-light">
                    When a registration's payment reference is approved, Apps Script executes an on-the-fly compile, merges spreadsheet columns with an HTML template, and dispatches scannable passes automatically.
                  </p>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>

      {/* Complete Visual Features Grid */}
      <div className="pt-10 border-t border-zinc-900 space-y-4 text-left">
        <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold">
          Ecosystem Operational Highlights
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TEDX_DATA.features.map((feat, idx) => (
            <div key={idx} className="p-4 bg-zinc-900/30 border border-zinc-850 space-y-1">
              <span className="text-xs font-bold text-white font-sans block">{feat.title}</span>
              <p className="text-xs text-zinc-400 font-light leading-relaxed font-sans">
                {feat.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Zoom Modal */}
      <AnimatePresence>
        {zoomedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomedImage(null)}
            className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 cursor-zoom-out"
          >
            <div className="relative max-w-4xl max-h-[90vh] flex flex-col items-center" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setZoomedImage(null)}
                className="absolute -top-10 right-0 text-white/70 hover:text-white flex items-center gap-1 font-mono text-xs uppercase cursor-pointer"
              >
                <X className="w-5 h-5" /> Close
              </button>
              <img
                src={zoomedImage.src}
                alt={zoomedImage.title}
                className="max-w-full max-h-[82vh] object-contain rounded-lg border border-zinc-700 shadow-2xl"
              />
              <span className="mt-3 text-xs text-zinc-300 font-mono font-medium text-center">
                {zoomedImage.title}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
