import { useState } from 'react';
import { ResearchPaperData } from '../../types';
import { fixAssetUrl } from '../../utils/assets';
import { FileText, ExternalLink, Download, HardDrive, Zap, Cpu, Sparkles, Terminal, Activity, Layers } from 'lucide-react';

interface NativeCppModalContentProps {
  paperData: ResearchPaperData;
}

export default function NativeCppModalContent({ paperData }: NativeCppModalContentProps) {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'benchmarks' | 'paper' | 'samples' | 'reproduction'>('overview');

  const pdfUrl = fixAssetUrl('papers/From_Python_to_Native_CPP_Transformer_Om_Suraj_Kashikar.pdf');

  return (
    <div className="space-y-6">
      {/* Sub-navigation Tabs */}
      <div className="flex flex-wrap gap-1 border-b border-zinc-800 pb-3">
        {[
          { id: 'overview', label: 'Overview & Highlights' },
          { id: 'benchmarks', label: 'Empirical Benchmarks' },
          { id: 'samples', label: 'Qualitative Text Samples' },
          { id: 'paper', label: 'Exact 17-Page Research Paper' },
          { id: 'reproduction', label: 'Hardware & Reproduction' }
        ].map((tab) => (
          <button
            key={tab.id}
            id={`cpp-subtab-${tab.id}`}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider font-bold transition-all cursor-pointer ${
              activeSubTab === tab.id
                ? 'bg-zinc-100 text-zinc-950 font-black'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* OVERVIEW SUBTAB */}
      {activeSubTab === 'overview' && (
        <div className="space-y-6">
          {/* Key KPI Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
            <div className="p-3 bg-zinc-900 border border-zinc-800">
              <span className="text-[10px] text-zinc-500 uppercase block">Training Speedup</span>
              <span className="text-xl font-black text-emerald-400">1.63×</span>
              <span className="text-[10px] text-zinc-400 block">+62.5% tok/s</span>
            </div>
            <div className="p-3 bg-zinc-900 border border-zinc-800">
              <span className="text-[10px] text-zinc-500 uppercase block">Inference Speedup</span>
              <span className="text-xl font-black text-cyan-400">1.48×</span>
              <span className="text-[10px] text-zinc-400 block">190.6 vs 129 tok/s</span>
            </div>
            <div className="p-3 bg-zinc-900 border border-zinc-800">
              <span className="text-[10px] text-zinc-500 uppercase block">GPU VRAM</span>
              <span className="text-xl font-black text-purple-400">-69.8%</span>
              <span className="text-[10px] text-zinc-400 block">164.8 vs 545 MB</span>
            </div>
            <div className="p-3 bg-zinc-900 border border-zinc-800">
              <span className="text-[10px] text-zinc-500 uppercase block">System RAM</span>
              <span className="text-xl font-black text-emerald-400">-18.0%</span>
              <span className="text-[10px] text-zinc-400 block">864.7 vs 1,055 MB</span>
            </div>
          </div>

          {/* Central Research Question Box */}
          <div className="p-4 bg-zinc-900/50 border border-zinc-800 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold block">
              Central Research Question
            </span>
            <p className="text-sm italic font-serif text-zinc-200 leading-relaxed border-l-2 border-zinc-600 pl-3">
              "{paperData.researchQuestion}"
            </p>
          </div>

          {/* Abstract */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">
              Research Abstract
            </h4>
            <p className="text-sm text-zinc-300 leading-relaxed font-light">
              {paperData.abstract}
            </p>
          </div>

          {/* Architecture Parameters Matrix */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">
              Model Architecture & Shared Pipeline
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
              <div className="p-2 bg-zinc-900/60 border border-zinc-850">
                <span className="text-zinc-500 block text-[9px]">Model Type</span>
                <span className="text-white font-bold">{paperData.architecture.modelType}</span>
              </div>
              <div className="p-2 bg-zinc-900/60 border border-zinc-850">
                <span className="text-zinc-500 block text-[9px]">Context Length</span>
                <span className="text-white font-bold">{paperData.architecture.contextLength} tokens</span>
              </div>
              <div className="p-2 bg-zinc-900/60 border border-zinc-850">
                <span className="text-zinc-500 block text-[9px]">Vocabulary</span>
                <span className="text-white font-bold">{paperData.architecture.vocabSize.toLocaleString()} (GPT-2 tiktoken)</span>
              </div>
              <div className="p-2 bg-zinc-900/60 border border-zinc-850">
                <span className="text-zinc-500 block text-[9px]">Blocks & Heads</span>
                <span className="text-white font-bold">{paperData.architecture.transformerBlocks} Blocks / {paperData.architecture.attentionHeads} Heads</span>
              </div>
              <div className="p-2 bg-zinc-900/60 border border-zinc-850">
                <span className="text-zinc-500 block text-[9px]">Embedding / MLP Width</span>
                <span className="text-white font-bold">{paperData.architecture.embeddingDim} / {paperData.architecture.mlpHiddenWidth}</span>
              </div>
              <div className="p-2 bg-zinc-900/60 border border-zinc-850">
                <span className="text-zinc-500 block text-[9px]">Weight Tying</span>
                <span className="text-white font-bold">Tied lm_head with token_emb</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* BENCHMARKS SUBTAB */}
      {activeSubTab === 'benchmarks' && (
        <div className="space-y-6">
          {/* Table: Training Throughput */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">
              Table 6: Training Throughput Comparison (100,000 steps, 819.2M tokens)
            </h4>
            <div className="overflow-x-auto border border-zinc-800">
              <table className="w-full text-xs font-mono text-left">
                <thead className="bg-zinc-900 text-zinc-300 border-b border-zinc-800">
                  <tr>
                    <th className="p-2.5">Implementation</th>
                    <th className="p-2.5">Sustained Throughput</th>
                    <th className="p-2.5">Relative Speedup</th>
                    <th className="p-2.5">Training Precision</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-850 text-zinc-300">
                  <tr className="bg-zinc-950">
                    <td className="p-2.5 font-bold text-white">C++ (LibTorch 2.5)</td>
                    <td className="p-2.5 text-emerald-400 font-bold">95,000 – 100,000 tok/s</td>
                    <td className="p-2.5 text-emerald-400 font-bold">1.63× (+62.5%)</td>
                    <td className="p-2.5 text-zinc-400">FP32</td>
                  </tr>
                  <tr className="bg-zinc-900/30">
                    <td className="p-2.5 font-bold text-zinc-400">Python (PyTorch)</td>
                    <td className="p-2.5 text-zinc-300">59,000 – 62,000 tok/s</td>
                    <td className="p-2.5 text-zinc-500">1.0× (Baseline)</td>
                    <td className="p-2.5 text-zinc-400">AMP + GradScaler</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Table: Inference Throughput Across Runs */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">
              Table 9 & 10: Autoregressive Inference Throughput Across Runs
            </h4>
            <div className="overflow-x-auto border border-zinc-800">
              <table className="w-full text-xs font-mono text-left">
                <thead className="bg-zinc-900 text-zinc-300 border-b border-zinc-800">
                  <tr>
                    <th className="p-2.5">Metric</th>
                    <th className="p-2.5">C++ Run 1</th>
                    <th className="p-2.5">C++ Run 2</th>
                    <th className="p-2.5">C++ Run 3</th>
                    <th className="p-2.5">Py Run 1</th>
                    <th className="p-2.5">Py Run 2</th>
                    <th className="p-2.5">Py Run 3</th>
                    <th className="p-2.5">Advantage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-850 text-zinc-300">
                  <tr className="bg-zinc-950">
                    <td className="p-2.5 font-bold text-white">Throughput</td>
                    <td className="p-2.5 text-cyan-400 font-bold">190.6 tok/s</td>
                    <td className="p-2.5 text-cyan-400 font-bold">190.6 tok/s</td>
                    <td className="p-2.5 text-cyan-400 font-bold">192.3 tok/s</td>
                    <td className="p-2.5">129.0 tok/s</td>
                    <td className="p-2.5">123.0 tok/s</td>
                    <td className="p-2.5">130.0 tok/s</td>
                    <td className="p-2.5 font-bold text-cyan-400">1.48× (Median)</td>
                  </tr>
                  <tr className="bg-zinc-900/30">
                    <td className="p-2.5 font-bold text-zinc-400">Total Time</td>
                    <td className="p-2.5">0.666 s</td>
                    <td className="p-2.5">0.666 s</td>
                    <td className="p-2.5">0.659 s</td>
                    <td className="p-2.5">0.610 s</td>
                    <td className="p-2.5">0.620 s</td>
                    <td className="p-2.5">0.610 s</td>
                    <td className="p-2.5 text-zinc-500">Output length dependent</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Table: Memory Footprint */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">
              Table 11 & 12: Inference Memory Reduction (Median)
            </h4>
            <div className="overflow-x-auto border border-zinc-800">
              <table className="w-full text-xs font-mono text-left">
                <thead className="bg-zinc-900 text-zinc-300 border-b border-zinc-800">
                  <tr>
                    <th className="p-2.5">Resource</th>
                    <th className="p-2.5">C++ Median</th>
                    <th className="p-2.5">Python Median</th>
                    <th className="p-2.5">Difference</th>
                    <th className="p-2.5">Reduction Percentage</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-850 text-zinc-300">
                  <tr className="bg-zinc-950">
                    <td className="p-2.5 font-bold text-white">System RAM</td>
                    <td className="p-2.5 text-emerald-400 font-bold">864.7 MB</td>
                    <td className="p-2.5 text-zinc-300">1,055.0 MB</td>
                    <td className="p-2.5 text-emerald-400 font-bold">-190.3 MB</td>
                    <td className="p-2.5 text-emerald-400 font-bold">18.0% Lower</td>
                  </tr>
                  <tr className="bg-zinc-900/30">
                    <td className="p-2.5 font-bold text-white">GPU VRAM</td>
                    <td className="p-2.5 text-purple-400 font-bold">164.78 MB</td>
                    <td className="p-2.5 text-zinc-300">545.00 MB</td>
                    <td className="p-2.5 text-purple-400 font-bold">-380.22 MB</td>
                    <td className="p-2.5 text-purple-400 font-bold">69.8% Lower</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Validation Loss Convergence */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">
              Validation Loss Convergence (Every 10k Steps)
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-xs font-mono">
              {paperData.benchmarks.validationLoss.map((entry) => (
                <div key={entry.step} className="p-2 bg-zinc-900/40 border border-zinc-850">
                  <span className="text-[9px] text-zinc-500 block">Step {entry.step.toLocaleString()}</span>
                  <div className="flex justify-between items-center text-xs mt-1">
                    <span className="text-zinc-400">Py: <strong className="text-white">{entry.python.toFixed(4)}</strong></span>
                    <span className="text-zinc-400">C++: <strong className="text-emerald-400">{entry.cpp.toFixed(4)}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* QUALITATIVE TEXT SAMPLES SUBTAB */}
      {activeSubTab === 'samples' && (
        <div className="space-y-6">
          <div className="p-3 bg-zinc-900/60 border border-zinc-800">
            <span className="text-[9px] font-mono text-zinc-500 uppercase block mb-1">Benchmark Prompt</span>
            <span className="text-sm font-serif italic text-white font-bold">
              "{paperData.qualitative.prompt}"
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* C++ Generated Story */}
            <div className="p-4 bg-zinc-900/40 border border-zinc-800 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                    C++ / LibTorch Output
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400">
                    190.6 tok/s · 164.8 MB VRAM
                  </span>
                </div>
                <p className="text-xs text-zinc-300 font-serif leading-relaxed italic whitespace-pre-wrap">
                  "{paperData.qualitative.cpp.output}"
                </p>
              </div>
              <div className="pt-3 border-t border-zinc-850/80 flex justify-between text-[10px] font-mono text-zinc-500">
                <span>Tokens: {paperData.qualitative.cpp.tokens}</span>
                <span>Time: {paperData.qualitative.cpp.time}s</span>
                <span>RAM: {paperData.qualitative.cpp.ram} MB</span>
              </div>
            </div>

            {/* Python Generated Story */}
            <div className="p-4 bg-zinc-900/40 border border-zinc-800 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
                  <span className="text-xs font-mono font-bold text-zinc-300 uppercase">
                    Python / PyTorch Output
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400">
                    129.1 tok/s · 545.7 MB VRAM
                  </span>
                </div>
                <p className="text-xs text-zinc-300 font-serif leading-relaxed italic whitespace-pre-wrap">
                  "{paperData.qualitative.python.output}"
                </p>
              </div>
              <div className="pt-3 border-t border-zinc-850/80 flex justify-between text-[10px] font-mono text-zinc-500">
                <span>Tokens: {paperData.qualitative.python.tokens}</span>
                <span>Time: {paperData.qualitative.python.time}s</span>
                <span>RAM: {paperData.qualitative.python.ram} MB</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* EXACT 17-PAGE PDF VIEWER SUBTAB */}
      {activeSubTab === 'paper' && (
        <div className="space-y-4">
          <div className="p-4 bg-zinc-900 border border-zinc-800 flex flex-wrap items-center justify-between gap-3">
            <div>
              <span className="text-xs font-mono font-bold text-white block">
                Official 17-Page Research Paper PDF
              </span>
              <span className="text-[10px] text-zinc-400 block font-mono">
                Om Suraj Kashikar · Grade 12, Silver Oaks International School
              </span>
            </div>
            <div className="flex items-center gap-2">
              <a
                href={pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="btn-open-pdf-external"
                className="px-3 py-2 bg-zinc-100 hover:bg-white text-zinc-950 font-mono font-black text-xs uppercase tracking-wider flex items-center gap-1.5 transition"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                Open PDF in Tab
              </a>
              <a
                href={pdfUrl}
                download="From_Python_to_Native_CPP_Transformer_Om_Suraj_Kashikar.pdf"
                id="btn-download-pdf-exact"
                className="px-3 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-mono font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition border border-zinc-700"
              >
                <Download className="w-3.5 h-3.5" />
                Download PDF
              </a>
            </div>
          </div>

          {/* Embedded PDF iframe */}
          <div className="border border-zinc-800 bg-zinc-950 relative w-full h-[580px] overflow-hidden">
            <iframe
              src={`${pdfUrl}#toolbar=1&navpanes=0`}
              title="From Python to Native C++ Research Paper"
              className="w-full h-full border-0"
            />
          </div>

          <p className="text-[10px] font-mono text-zinc-500 text-center">
            Contains all 17 pages, 18 tables, vector loss curves, architecture block diagrams, and hardware specifications.
          </p>
        </div>
      )}

      {/* REPRODUCTION & HARDWARE SUBTAB */}
      {activeSubTab === 'reproduction' && (
        <div className="space-y-6">
          {/* Hardware Specs */}
          <div className="space-y-2">
            <h4 className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">
              Experimental Hardware & Runtime Stack
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs font-mono">
              <div className="p-2 bg-zinc-900 border border-zinc-850">
                <span className="text-zinc-500 block text-[9px]">GPU</span>
                <span className="text-white font-bold">{paperData.hardware.gpu}</span>
              </div>
              <div className="p-2 bg-zinc-900 border border-zinc-850">
                <span className="text-zinc-500 block text-[9px]">CUDA / Driver</span>
                <span className="text-white font-bold">{paperData.hardware.cuda} / {paperData.hardware.driver}</span>
              </div>
              <div className="p-2 bg-zinc-900 border border-zinc-850">
                <span className="text-zinc-500 block text-[9px]">Python / PyTorch</span>
                <span className="text-white font-bold">{paperData.hardware.pythonVersion} / {paperData.hardware.pyTorchVersion}</span>
              </div>
              <div className="p-2 bg-zinc-900 border border-zinc-850">
                <span className="text-zinc-500 block text-[9px]">LibTorch / Compiler</span>
                <span className="text-white font-bold">LibTorch {paperData.hardware.libTorchVersion} (GCC 11.4)</span>
              </div>
              <div className="p-2 bg-zinc-900 border border-zinc-850">
                <span className="text-zinc-500 block text-[9px]">Build System</span>
                <span className="text-white font-bold">CMake 3.18</span>
              </div>
              <div className="p-2 bg-zinc-900 border border-zinc-850">
                <span className="text-zinc-500 block text-[9px]">Cloud Compute</span>
                <span className="text-white font-bold">{paperData.hardware.cloudProvider}</span>
              </div>
            </div>
          </div>

          {/* Reproduction Commands */}
          <div className="space-y-3">
            <h4 className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">
              Appendix C: Reproduction Commands
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-3 bg-zinc-900 border border-zinc-850 space-y-2">
                <span className="text-xs font-mono font-bold text-zinc-300 block">Python Setup</span>
                <div className="p-2.5 bg-black/60 font-mono text-[11px] text-zinc-300 space-y-1">
                  {paperData.reproduction.python.map((cmd, i) => (
                    <div key={i} className="text-emerald-400">$ {cmd}</div>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-zinc-900 border border-zinc-850 space-y-2">
                <span className="text-xs font-mono font-bold text-white block">C++ Native Build</span>
                <div className="p-2.5 bg-black/60 font-mono text-[11px] text-zinc-300 space-y-1">
                  {paperData.reproduction.cpp.map((cmd, i) => (
                    <div key={i} className="text-cyan-400">$ {cmd}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
