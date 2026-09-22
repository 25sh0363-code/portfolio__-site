import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, FileText, Mail, Github, Instagram, BookOpen, Cpu, Code, Layers, Sparkles, Activity, Compass, Heart, Terminal } from 'lucide-react';
import { HERO_BIO, PERSONAL_INTERESTS_AND_VISION } from '../data';
import { fixAssetUrl } from '../utils/assets';

interface HeroProps {
  setActiveTab: (tab: string) => void;
  onOpenProject?: (projectId: string) => void;
  onSecretEntrance?: () => void;
}

export default function Hero({ setActiveTab, onOpenProject, onSecretEntrance }: HeroProps) {
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleAvatarClick = () => {
    clickCountRef.current += 1;
    
    if (clickTimerRef.current) {
      clearTimeout(clickTimerRef.current);
    }

    if (clickCountRef.current >= 3) {
      clickCountRef.current = 0;
      if (onSecretEntrance) {
        onSecretEntrance();
      }
    } else {
      clickTimerRef.current = setTimeout(() => {
        clickCountRef.current = 0;
      }, 1500);
    }
  };
  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cpu': return <Cpu className="w-4 h-4 text-cyan-400" />;
      case 'Code': return <Code className="w-4 h-4 text-emerald-400" />;
      case 'Layers': return <Layers className="w-4 h-4 text-amber-400" />;
      case 'Sparkles': return <Sparkles className="w-4 h-4 text-purple-400" />;
      case 'Activity': return <Activity className="w-4 h-4 text-rose-400" />;
      default: return <Compass className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <section id="about" className="py-12 md:py-20 relative overflow-hidden text-left">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 space-y-16">
        
        {/* Massive Bold Header Typography */}
        <div className="relative">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="text-[52px] sm:text-[90px] md:text-[120px] lg:text-[135px] leading-[0.85] font-black tracking-tighter uppercase font-display text-zinc-50 select-none break-words max-w-4xl"
            id="hero-title"
          >
            Om Suraj<br />Kashikar
          </motion.h1>
          
          {/* Tagline status strip */}
          <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-[10px] uppercase tracking-[0.25em] text-zinc-400 font-mono font-bold">
            <span className="text-zinc-200">{HERO_BIO.grade}</span>
            <span className="text-zinc-700">//</span>
            <span>Silver Oaks (Mighty Oaks Campus), Hyderabad</span>
            <span className="text-zinc-700">//</span>
            <span className="text-blue-400">FC Barcelona Supporter 🔵🔴</span>
            <span className="text-zinc-700">//</span>
            <span className="text-emerald-400">AI Explorer</span>
          </div>
        </div>

        {/* Dynamic Grid Layout containing the profile statement and portrait section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-zinc-900 pt-10">
          
          {/* Statement Column (8-Cols on LG) */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <h3 className="text-[10px] uppercase tracking-[0.3em] text-zinc-400 font-mono font-bold">
                  About Me
                </h3>
              </div>
              
              <div className="space-y-4 text-zinc-300 font-sans text-base sm:text-lg leading-relaxed font-light select-text max-w-2xl">
                <p>
                  Hey! I'm <strong className="text-white font-medium">Om Suraj Kashikar</strong>, a Grade 12 student at Silver Oaks (Mighty Oaks Campus) in Hyderabad with a deep fascination for artificial intelligence and where it's heading.
                </p>
                <p>
                  Outside of academics, you'll find me either playing or watching <strong className="text-white font-medium">football</strong> (huge <span className="text-rose-400 font-medium">FC Barcelona</span> fan 🔵🔴), or tuning into <strong className="text-white font-medium">Andrej Karpathy's</strong> lectures and interviews. I love building neural networks from first principles to truly understand what's happening underneath the hood.
                </p>
                <p>
                  I'm constantly messing around with different models, benchmarking their performance under my own tests, collecting datasets, and finding patterns with algorithms. I'm especially excited about <strong className="text-white font-medium">embedded AI</strong>—optimizing models to run efficiently on small hardware for compact commercial use. Every project brings me one step closer to building my own <strong className="text-emerald-400 font-medium">AI companion</strong> and contributing toward better architectures on the road to AGI.
                </p>
              </div>
            </div>

            {/* Casual Milestone mention (not dominating the page) */}
            <div 
              onClick={() => {
                if (onOpenProject) {
                  onOpenProject('research-cpp-transformer');
                } else {
                  setActiveTab('projects');
                }
              }}
              id="hero-research-note"
              className="p-4 bg-zinc-950/80 border border-zinc-900 hover:border-zinc-700 transition-all cursor-pointer group flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-zinc-900 border border-zinc-800 text-zinc-400 group-hover:text-zinc-200 transition-colors">
                  <Terminal className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold block">
                    Recent Research Study
                  </span>
                  <p className="text-xs text-zinc-300 font-medium mt-0.5">
                    Benchmarked Python vs. Native C++ Transformers on an RTX 4090
                  </p>
                </div>
              </div>
              <span className="text-[10px] font-mono text-zinc-400 group-hover:text-white flex items-center gap-1 shrink-0 font-bold uppercase">
                Explore Study <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
              </span>
            </div>

            {/* Quick Personal Attributes */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 border-t border-zinc-900 pt-6 text-left">
              <div className="space-y-1">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono font-bold block">Location</span>
                <p className="text-sm font-medium text-zinc-300">Hyderabad, India</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono font-bold block">Favorite Club</span>
                <p className="text-sm font-medium text-zinc-300">FC Barcelona 🔵🔴</p>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono font-bold block">Primary Ethos</span>
                <p className="text-sm font-medium text-zinc-300">First-Principles AI</p>
              </div>
            </div>

            {/* Button Controls */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                id="btn-projects"
                onClick={() => setActiveTab('projects')}
                className="group px-6 py-4 bg-zinc-100 hover:bg-white text-zinc-950 font-black text-xs uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2 cursor-pointer rounded-none border border-zinc-100"
              >
                Explore Projects
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                id="btn-resume"
                onClick={() => setActiveTab('resume')}
                className="group px-6 py-4 bg-zinc-900 hover:bg-zinc-850 text-white font-bold text-xs uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2 cursor-pointer rounded-none border border-zinc-800 hover:border-zinc-600"
              >
                <FileText className="w-3.5 h-3.5" />
                CV & Credentials
              </button>
              <button
                id="btn-research-paper"
                onClick={() => {
                  if (onOpenProject) {
                    onOpenProject('research-cpp-transformer');
                  } else {
                    setActiveTab('projects');
                  }
                }}
                className="group px-6 py-4 bg-transparent hover:bg-zinc-900 text-zinc-400 hover:text-white font-bold text-xs uppercase tracking-[0.2em] transition-colors flex items-center justify-center gap-2 cursor-pointer rounded-none border border-zinc-850 hover:border-zinc-700"
              >
                <BookOpen className="w-3.5 h-3.5" />
                Research Paper
              </button>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-4 border-t border-zinc-900 w-fit">
              <a 
                href={HERO_BIO.socials.github} 
                target="_blank" 
                rel="noopener noreferrer"
                id="link-github"
                className="p-3 text-zinc-400 hover:text-zinc-50 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-none transition-colors"
                aria-label="GitHub Profile"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href={HERO_BIO.socials.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                id="link-instagram"
                className="p-3 text-zinc-400 hover:text-pink-400 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-none transition-colors"
                aria-label="Instagram Profile"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href={`mailto:${HERO_BIO.socials.email}`}
                id="link-email"
                className="p-3 text-zinc-400 hover:text-zinc-50 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-none transition-colors"
                aria-label="Mail Dispatch"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Portrait column (4-Cols on LG) */}
          <div className="lg:col-span-4 flex justify-center lg:justify-end">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              onClick={handleAvatarClick}
              title="Click 3x to open secret terminal"
              className="relative w-64 h-80 shrink-0 bg-zinc-900 border border-zinc-800 p-2 shadow-2xl flex items-center justify-center group cursor-pointer select-none"
            >
              <div className="w-full h-full overflow-hidden bg-zinc-950 relative">
                <img 
                  src={fixAssetUrl(HERO_BIO.avatarPath)} 
                  alt={HERO_BIO.name}
                  className="w-full h-full object-cover filter grayscale contrast-110 group-hover:grayscale-0 transition-all duration-700 select-none"
                  referrerPolicy="no-referrer"
                />
                
                <span className="absolute top-0 left-0 w-2 h-2 border-t border-l border-zinc-700" />
                <span className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-zinc-700" />
              </div>

              <div className="absolute -bottom-4 right-4 bg-zinc-900 border border-zinc-800 text-[9px] font-mono uppercase tracking-widest px-2 py-1 text-zinc-400">
                Om_Suraj_Kashikar.png
              </div>
            </motion.div>
          </div>

        </div>

        {/* Interests, Passions & What Drives Me Bento Grid */}
        <div className="border-t border-zinc-900 pt-12 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-500 font-bold block">
                What Drives Me
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-zinc-100 font-display uppercase tracking-tight mt-1">
                Passions, Inspirations & The Road to AGI
              </h3>
            </div>
            <p className="text-xs font-mono text-zinc-500">
              Personal interests, daily curiosities & long-term goals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {PERSONAL_INTERESTS_AND_VISION.map((item) => (
              <div
                key={item.id}
                className="p-5 bg-zinc-950/80 border border-zinc-900 hover:border-zinc-750 transition-all flex flex-col justify-between space-y-4 group"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2 bg-zinc-900 border border-zinc-800 text-zinc-300 group-hover:border-zinc-600 transition-colors">
                      {getIcon(item.icon)}
                    </div>
                    <span className="text-[9px] font-mono uppercase font-bold tracking-widest px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-zinc-400">
                      {item.badge}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-zinc-200 font-sans tracking-tight group-hover:text-white transition-colors">
                      {item.title}
                    </h4>
                    <p className="text-xs text-zinc-400 font-light mt-2 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-zinc-900 flex items-center gap-1.5 text-[10px] font-mono text-zinc-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-700 group-hover:bg-emerald-400 transition-colors" />
                  <span>Personal Focus</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
