import { motion } from 'motion/react';
import { Clock, Award, ArrowRight, FileCheck } from 'lucide-react';

interface LORProps {
  onNavigateToContact?: () => void;
  onNavigateToCredentials?: () => void;
}

export default function LOR({ onNavigateToCredentials }: LORProps) {
  return (
    <section className="py-12 relative text-left" id="section-recommendations">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 relative z-10 space-y-10">
        
        {/* Section Heading */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-zinc-900 pb-8">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[10px] uppercase tracking-[0.3em] text-amber-400 font-mono font-bold">
                Endorsements
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tighter uppercase font-display select-none">
              Recommendations
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed font-light">
              Letters of recommendation and official academic endorsements.
            </p>
          </div>

          <div>
            <span className="inline-flex items-center gap-2 px-3 py-1.5 bg-amber-500/10 border border-amber-500/20 text-amber-300 font-mono text-[10px] uppercase tracking-widest font-bold">
              <Clock className="w-3.5 h-3.5" />
              Status: Yet to Publish
            </span>
          </div>
        </div>

        {/* Clean Neutral Coming Soon Card */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-zinc-950 border border-zinc-800 p-8 sm:p-12 text-center space-y-6 relative overflow-hidden"
        >
          <div className="w-16 h-16 bg-zinc-900 border border-zinc-800 rounded-full flex items-center justify-center mx-auto text-amber-400">
            <FileCheck className="w-8 h-8" />
          </div>

          <div className="space-y-3 max-w-lg mx-auto">
            <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-500 font-bold block">
              Official Documentation
            </span>
            <h3 className="text-2xl font-black text-white uppercase font-display tracking-tight">
              Coming Soon — Yet to Publish
            </h3>
            <p className="text-zinc-400 text-sm leading-relaxed font-light">
              Official recommendation letters and faculty appreciation documents are currently being processed and will be published directly to this section soon.
            </p>
          </div>

          <div className="pt-4 border-t border-zinc-900/80 max-w-md mx-auto flex flex-col sm:flex-row items-center justify-center gap-4 text-xs font-mono text-zinc-500">
            <span>• Verification available upon request</span>
          </div>
        </motion.div>

        {/* Credentials Link Box */}
        <div className="p-6 bg-zinc-950/60 border border-zinc-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4 text-emerald-400" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                Verified Certificates & Credentials
              </h4>
            </div>
            <p className="text-xs text-zinc-400 font-light">
              Looking for verified workshop completion certificates and co-curricular awards?
            </p>
          </div>

          <button
            onClick={onNavigateToCredentials}
            className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-mono text-xs uppercase tracking-wider font-bold transition-colors shrink-0 flex items-center gap-2 cursor-pointer"
          >
            View CV & Credentials
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </section>
  );
}
