import { useState, ReactNode } from 'react';
import { Check, Copy, Globe, Lock, Maximize2, Terminal } from 'lucide-react';

interface CornerReticlesProps {
  className?: string;
  colorClass?: string;
}

/** Precision 4-corner architectural reticle brackets */
export function CornerReticles({ className = '', colorClass = 'border-zinc-500/70' }: CornerReticlesProps) {
  return (
    <div className={`pointer-events-none absolute inset-0 z-20 ${className}`}>
      <span className={`absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 ${colorClass} transition-colors duration-300`} />
      <span className={`absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 ${colorClass} transition-colors duration-300`} />
      <span className={`absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 ${colorClass} transition-colors duration-300`} />
      <span className={`absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 ${colorClass} transition-colors duration-300`} />
    </div>
  );
}

interface BrowserFrameProps {
  url: string;
  label?: string;
  accentDotClass?: string;
  onExpand?: () => void;
  children: ReactNode;
  className?: string;
}

/** Sleek dark architectural browser viewport frame for web screenshots */
export function BrowserFrame({
  url,
  label,
  accentDotClass = 'bg-emerald-400',
  onExpand,
  children,
  className = ''
}: BrowserFrameProps) {
  return (
    <div className={`relative border border-zinc-800 bg-zinc-950 overflow-hidden shadow-2xl ${className}`}>
      {/* Chrome Top Bar */}
      <div className="flex items-center justify-between gap-3 px-3.5 py-2.5 bg-zinc-900/90 border-b border-zinc-800">
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 border border-zinc-600" />
          <span className="w-2.5 h-2.5 rounded-full bg-zinc-700 border border-zinc-600" />
          <span className={`w-2.5 h-2.5 rounded-full ${accentDotClass} opacity-80`} />
        </div>

        {/* Address Bar */}
        <div className="flex-1 max-w-md mx-auto flex items-center justify-center gap-1.5 px-3 py-1 bg-zinc-950 border border-zinc-800 text-[10px] font-mono text-zinc-300 truncate">
          <Lock className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
          <span className="truncate">{url}</span>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {label && (
            <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider text-zinc-400">
              <Globe className="w-3 h-3" />
              {label}
            </span>
          )}
          {onExpand && (
            <button
              onClick={onExpand}
              className="inline-flex items-center gap-1 px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-[10px] font-mono text-zinc-200 border border-zinc-700 transition cursor-pointer"
              title="Expand Fullscreen"
            >
              <Maximize2 className="w-3 h-3" />
              <span className="hidden sm:inline">Zoom</span>
            </button>
          )}
        </div>
      </div>

      {/* Viewport Content */}
      <div className="relative bg-black">{children}</div>
    </div>
  );
}

interface TerminalBlockProps {
  title: string;
  commands: string[];
  accentTextClass?: string;
  showPrompt?: boolean;
  copyText?: string;
}

/** Crisp dark terminal window with copy button */
export function TerminalBlock({
  title,
  commands,
  accentTextClass = 'text-emerald-400',
  showPrompt = true,
  copyText
}: TerminalBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    const payload =
      copyText ??
      commands
        .filter((c) => !c.trim().startsWith('#'))
        .join('\n');
    navigator.clipboard.writeText(payload);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  return (
    <div className="border border-zinc-800 bg-zinc-950 overflow-hidden shadow-lg">
      {/* Terminal Header */}
      <div className="flex items-center justify-between px-3.5 py-2 bg-zinc-900/90 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 mr-1">
            <span className="w-2 h-2 rounded-full bg-zinc-700" />
            <span className="w-2 h-2 rounded-full bg-zinc-700" />
            <span className="w-2 h-2 rounded-full bg-zinc-600" />
          </div>
          <Terminal className="w-3.5 h-3.5 text-zinc-400" />
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-300 font-bold">
            {title}
          </span>
        </div>

        <button
          onClick={handleCopy}
          className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-zinc-950 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 text-[10px] font-mono uppercase tracking-wider transition cursor-pointer"
        >
          {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>

      {/* Code Lines */}
      <div className="p-4 bg-[#070709] font-mono text-xs space-y-1.5 overflow-x-auto leading-relaxed">
        {commands.map((cmd, idx) => {
          const isComment = cmd.trim().startsWith('#');
          return (
            <div key={idx} className="flex items-start gap-2.5">
              {showPrompt && !isComment && (
                <span className="text-zinc-600 select-none shrink-0">$</span>
              )}
              <span className={isComment ? 'text-zinc-500 pt-1' : accentTextClass}>
                {cmd}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
