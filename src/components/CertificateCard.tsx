import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Award, Eye, X, ShieldCheck, Image as ImageIcon, FileText } from 'lucide-react';
import { Certificate } from '../types';
import { fixAssetUrl } from '../utils/assets';

interface CertificateCardProps {
  cert: Certificate;
  key?: string;
}

export default function CertificateCard({ cert }: CertificateCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  return (
    <>
      <div 
        onClick={() => setIsOpen(true)}
        className="group p-4 bg-zinc-950 border border-zinc-800 hover:border-zinc-600 transition-all cursor-pointer flex flex-col justify-between space-y-4 text-left"
      >
        {/* Certificate Image Thumbnail Preview */}
        <div className="relative aspect-[1.414/1] w-full bg-white overflow-hidden border border-zinc-800 group-hover:border-zinc-500 transition-colors">
          <img 
            src={fixAssetUrl(cert.imageUrl)} 
            alt={cert.title} 
            className="w-full h-full object-contain pointer-events-none"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <span className="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1.5 bg-zinc-950/90 text-zinc-100 font-mono text-[10px] uppercase font-bold tracking-widest border border-zinc-700 flex items-center gap-1.5 shadow-lg">
              <Eye className="w-3.5 h-3.5" />
              View Full Certificate
            </span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider ${
              cert.issuerOrg === 'Google Cloud' 
                ? 'bg-blue-500/10 text-blue-400 border border-blue-500/30' 
                : cert.issuerOrg === 'IBM' 
                ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/30'
                : cert.issuerOrg === 'Plaksha University'
                ? 'bg-sky-500/10 text-sky-400 border border-sky-500/30'
                : cert.issuerOrg === 'IIIT Hyderabad'
                ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                : cert.issuerOrg === 'TEDx'
                ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30'
                : cert.issuerOrg === 'SOMUN'
                ? 'bg-purple-500/10 text-purple-400 border border-purple-500/30'
                : cert.issuerOrg === 'CII / Young Indians'
                ? 'bg-orange-500/10 text-orange-400 border border-orange-500/30'
                : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
            }`}>
              {cert.issuerOrg}
            </span>
            <span className="text-[10px] font-mono text-zinc-500">{cert.date}</span>
          </div>

          <div>
            <h4 className="text-base font-bold text-zinc-100 group-hover:text-white transition-colors font-display">
              {cert.title}
            </h4>
            <p className="text-xs text-zinc-400 font-sans mt-1 line-clamp-2 leading-relaxed">
              {cert.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5 pt-1">
            {cert.skills.slice(0, 3).map((skill, i) => (
              <span key={i} className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-[9px] font-mono text-zinc-400">
                {skill}
              </span>
            ))}
          </div>
        </div>

        <div className="pt-3 border-t border-zinc-850 flex items-center justify-between text-xs font-mono text-zinc-400">
          <span className="flex items-center gap-1.5 text-zinc-300 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            Verified Credential
          </span>
          <span className="flex items-center gap-1 text-zinc-400 group-hover:text-zinc-100 transition-colors text-[11px]">
            <Eye className="w-3.5 h-3.5" />
            Inspect
          </span>
        </div>
      </div>

      {/* Full Certificate Modal */}
      <AnimatePresence>
        {isOpen && (
          <div 
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-8 pt-16 sm:pt-12 bg-black/90 backdrop-blur-md overflow-y-auto"
            onClick={() => setIsOpen(false)}
          >
            {/* Dedicated Floating Top-Right Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="fixed top-4 right-4 z-[110] bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-100 hover:text-white px-3 py-2 shadow-2xl flex items-center gap-2 font-mono text-xs font-bold uppercase transition-colors cursor-pointer"
              aria-label="Close modal"
              id="certificate-modal-close-btn"
            >
              <X className="w-5 h-5 text-amber-400" />
              <span>Close</span>
            </button>

            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              className="relative w-full max-w-5xl bg-zinc-950 border border-zinc-800 shadow-2xl overflow-hidden my-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Top Header */}
              <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 bg-zinc-900 border-b border-zinc-800 sticky top-0 z-20">
                <div className="flex items-center gap-2.5">
                  <Award className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-200">
                    Official Certificate · {cert.issuerOrg}
                  </span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  <a
                    href={fixAssetUrl(cert.imageUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-300 hover:text-white transition-colors bg-zinc-800 px-3 py-1.5 border border-zinc-700"
                  >
                    <ImageIcon className="w-3.5 h-3.5" /> Full Image
                  </a>
                  {cert.pdfUrl && (
                    <a
                      href={fixAssetUrl(cert.pdfUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-zinc-300 hover:text-white transition-colors bg-zinc-800 px-3 py-1.5 border border-zinc-700"
                    >
                      <FileText className="w-3.5 h-3.5 text-red-400" /> Original PDF
                    </a>
                  )}
                  {cert.verificationUrl && (
                    <a
                      href={cert.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-emerald-400 hover:text-emerald-300 transition-colors bg-emerald-950/40 px-3 py-1.5 border border-emerald-800/60"
                    >
                      Verify Online <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 text-white transition-colors font-mono text-xs font-bold uppercase cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                    <span>Close</span>
                  </button>
                </div>
              </div>

              {/* Certificate Image Rendering Area */}
              <div className="p-4 sm:p-8 bg-zinc-950 flex items-center justify-center overflow-x-auto">
                <div className="w-full max-w-4xl bg-white shadow-2xl p-2 sm:p-4 rounded-sm border border-zinc-800">
                  <img 
                    src={fixAssetUrl(cert.imageUrl)} 
                    alt={cert.title} 
                    className="w-full h-auto object-contain block select-none max-h-[75vh]"
                  />
                </div>
              </div>

              {/* Modal Footer info */}
              <div className="p-4 bg-zinc-900 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-zinc-400">
                <span>Recipient: <strong className="text-white font-sans">{cert.recipient}</strong></span>
                {cert.verificationUrl && (
                  <span className="text-zinc-500 text-[11px] truncate max-w-md">
                    Credential Verification: <a href={cert.verificationUrl} target="_blank" rel="noopener noreferrer" className="text-emerald-400 hover:underline">{cert.verificationUrl}</a>
                  </span>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

