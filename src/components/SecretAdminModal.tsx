import { useState, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Lock, Unlock, Key, RefreshCw, Trash2, Mail, Copy, Check, X, ShieldAlert, CheckCircle2, Search, ExternalLink } from 'lucide-react';

interface SecretAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface DispatchedMessage {
  timestamp: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  source?: string;
}

const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbzWDhUPzU15BTYFcaA8AqBZNlVdise3-lVodvhRXxu1VX0KKMfhHp03GykIakWm9eB8/exec';

export default function SecretAdminModal({ isOpen, onClose }: SecretAdminModalProps) {
  const [passcode, setPasscode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState('');

  const [messages, setMessages] = useState<DispatchedMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedEmail, setCopiedEmail] = useState<string | null>(null);

  // Auto focus input when modal opens
  useEffect(() => {
    if (!isOpen) {
      setPasscode('');
      setAuthError('');
    }
  }, [isOpen]);

  // Load messages when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchMessages();
    }
  }, [isAuthenticated]);

  const handleAuthSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (passcode.trim() === 'omi123') {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('[ACCESS_DENIED] Invalid console key passcode.');
    }
  };

  const fetchMessages = async () => {
    setIsLoading(true);
    let loaded: DispatchedMessage[] = [];

    // 1. Read local dispatches backup from localStorage
    try {
      const localData = JSON.parse(localStorage.getItem('omi_portfolio_dispatches') || '[]');
      if (Array.isArray(localData)) {
        loaded = [...localData];
      }
    } catch (e) {
      console.warn('Error reading local dispatches cache:', e);
    }

    // 2. Fetch live dispatches from Google Apps Script WebApp
    try {
      const response = await fetch(`${APPS_SCRIPT_URL}?action=getMessages`, {
        method: 'GET',
        headers: { 'Accept': 'application/json' },
      });
      if (response.ok) {
        const json = await response.json();
        if (json && json.messages && Array.isArray(json.messages)) {
          // Merge remote messages avoiding duplicates
          json.messages.forEach((remoteMsg: any) => {
            const exists = loaded.some(
              m => m.timestamp === remoteMsg.timestamp && m.email === remoteMsg.email
            );
            if (!exists) {
              loaded.push({
                timestamp: remoteMsg.timestamp || new Date().toISOString(),
                name: remoteMsg.name || remoteMsg.Name || 'Anonymous',
                email: remoteMsg.email || remoteMsg.Email || 'No Email',
                subject: remoteMsg.subject || remoteMsg.Subject || 'No Subject',
                message: remoteMsg.message || remoteMsg.Message || '',
                source: 'Google Apps Script'
              });
            }
          });
        }
      }
    } catch (err) {
      console.info('Remote Apps Script GET note: direct fetch subject to Google redirect mode. Using cached dispatches.', err);
    }

    setMessages(loaded);
    setIsLoading(false);
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(email);
    setTimeout(() => setCopiedEmail(null), 2000);
  };

  const handleDeleteMessage = (indexToDelete: number) => {
    const updated = messages.filter((_, idx) => idx !== indexToDelete);
    setMessages(updated);
    try {
      localStorage.setItem('omi_portfolio_dispatches', JSON.stringify(updated));
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  };

  const handleClearAll = () => {
    if (confirm('Are you sure you want to clear all locally cached message logs?')) {
      setMessages([]);
      localStorage.removeItem('omi_portfolio_dispatches');
    }
  };

  if (!isOpen) return null;

  const filteredMessages = messages.filter(
    m =>
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-y-auto font-mono text-left">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden my-auto"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-zinc-900 border-b border-zinc-800 text-zinc-200">
            <div className="flex items-center gap-2.5">
              <Terminal className="w-4 h-4 text-zinc-100" />
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-100">
                {isAuthenticated ? '[CONSOLE_AUTHENTICATED] :: INBOX_DISPATCH' : '[SECRET_TERMINAL] :: AUTH_REQUIRED'}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1 text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!isAuthenticated ? (
            /* Passcode Verification Screen */
            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-400 uppercase tracking-widest font-bold">
                  <Lock className="w-3.5 h-3.5 text-zinc-100" />
                  RESTRICTED ADMIN ACCESS
                </div>
                <h3 className="text-xl font-bold text-white uppercase tracking-tight font-display">
                  Enter Developer Console Key
                </h3>
                <p className="text-xs text-zinc-400 font-sans leading-relaxed">
                  Provide your secret passcode to decrypt and access the portfolio dispatch log inbox.
                </p>
              </div>

              <form onSubmit={handleAuthSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold block">
                    Console Key Passcode
                  </label>
                  <div className="relative">
                    <Key className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3.5" />
                    <input
                      type="password"
                      autoFocus
                      value={passcode}
                      onChange={(e) => setPasscode(e.target.value)}
                      placeholder="Enter console key (omi123)..."
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-zinc-300 pl-10 pr-4 py-3 text-zinc-100 text-sm outline-none font-mono"
                    />
                  </div>
                </div>

                {authError && (
                  <div className="p-3 bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs flex items-center gap-2">
                    <ShieldAlert className="w-4 h-4 text-zinc-100 shrink-0" />
                    <span className="text-[11px]">{authError}</span>
                  </div>
                )}

                <div className="flex items-center justify-between pt-2">
                  <span className="text-[10px] text-zinc-600 uppercase">
                    Hint: "omi123"
                  </span>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-zinc-100 hover:bg-white text-zinc-950 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer border border-zinc-100"
                  >
                    Unlock Console
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Authenticated Messages Inspector Screen */
            <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
              
              {/* Toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-zinc-900/60 p-4 border border-zinc-850">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-zinc-950 border border-zinc-800">
                    <Mail className="w-4 h-4 text-zinc-100" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                      Portfolio Dispatch Inbox ({messages.length})
                    </h4>
                    <p className="text-[10px] text-zinc-500">
                      Connected Endpoint: script.google.com/macros/s/AKfycbz...
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={fetchMessages}
                    disabled={isLoading}
                    className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-bold uppercase transition-colors flex items-center gap-1.5 border border-zinc-700 cursor-pointer"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                    <span>Refresh</span>
                  </button>

                  <button
                    onClick={() => setIsAuthenticated(false)}
                    className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white text-xs font-bold uppercase transition-colors border border-zinc-800 cursor-pointer"
                  >
                    Lock Console
                  </button>
                </div>
              </div>

              {/* Search input */}
              <div className="relative">
                <Search className="w-4 h-4 text-zinc-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter messages by name, email, or content..."
                  className="w-full bg-zinc-900 border border-zinc-800 focus:border-zinc-500 pl-10 pr-4 py-2 text-xs text-zinc-200 outline-none"
                />
              </div>

              {/* Messages Listing */}
              <div className="space-y-4">
                {filteredMessages.length === 0 ? (
                  <div className="p-12 text-center bg-zinc-900/30 border border-zinc-850 space-y-2">
                    <Mail className="w-8 h-8 text-zinc-700 mx-auto" />
                    <p className="text-xs text-zinc-400 uppercase tracking-widest font-bold">
                      {messages.length === 0 ? 'No Dispatches Logged Yet' : 'No Messages Match Filter'}
                    </p>
                    <p className="text-[11px] text-zinc-600 font-sans max-w-sm mx-auto">
                      Form submissions through the Contact Station will be recorded here and posted directly to your Google Sheet.
                    </p>
                  </div>
                ) : (
                  filteredMessages.map((msg, idx) => (
                    <div 
                      key={idx}
                      className="p-5 bg-zinc-950 border border-zinc-800 space-y-3 relative group"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-zinc-900 pb-3">
                        <div className="space-y-0.5">
                          <span className="text-xs font-bold text-white uppercase block">
                            {msg.name}
                          </span>
                          <span className="text-[11px] text-zinc-400 flex items-center gap-2">
                            {msg.email}
                            <button
                              onClick={() => handleCopyEmail(msg.email)}
                              className="text-zinc-500 hover:text-white transition-colors cursor-pointer"
                              title="Copy Email"
                            >
                              {copiedEmail === msg.email ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                            </button>
                          </span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="text-[10px] text-zinc-500 bg-zinc-900 px-2 py-1 border border-zinc-850">
                            {new Date(msg.timestamp).toLocaleString()}
                          </span>

                          <button
                            onClick={() => handleDeleteMessage(idx)}
                            className="p-1 text-zinc-600 hover:text-red-400 transition-colors cursor-pointer"
                            title="Delete entry"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      <div className="space-y-1">
                        <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider block">
                          Subject: {msg.subject}
                        </span>
                        <p className="text-xs text-zinc-300 font-sans leading-relaxed whitespace-pre-wrap bg-zinc-900/40 p-3 border border-zinc-900">
                          {msg.message}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {messages.length > 0 && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={handleClearAll}
                    className="text-[10px] text-zinc-500 hover:text-red-400 uppercase tracking-widest transition-colors cursor-pointer"
                  >
                    Clear All Cache Logs
                  </button>
                </div>
              )}

            </div>
          )}

          {/* Footer Bar */}
          <div className="p-4 bg-zinc-900/80 border-t border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-[10px] text-zinc-500 font-mono">
            <span>OM_SURAJ_KASHIKAR :: ADMIN_CONSOLE</span>
            <span className="text-zinc-400">Why Apps Script over Supabase? Because Supabase databases sleep after 7 days of inactivity! 😴</span>
          </div>

        </motion.div>
      </div>
    </AnimatePresence>
  );
}
