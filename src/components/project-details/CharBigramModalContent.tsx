import { useState } from 'react';
import { CharLevelBigramDetails } from '../../types';
import { Sparkles, Terminal, Activity, ArrowRight, Layers, Sliders, Cpu, Play } from 'lucide-react';

interface CharBigramModalContentProps {
  data: CharLevelBigramDetails;
}

export default function CharBigramModalContent({ data }: CharBigramModalContentProps) {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'matrix' | 'generation' | 'temperatures' | 'training' | 'reproduction'>('overview');
  const [selectedTempIdx, setSelectedTempIdx] = useState<number>(1); // Default to T=0.7

  return (
    <div className="space-y-6">
      {/* Sub-navigation Tabs */}
      <div className="flex flex-wrap gap-1 border-b border-zinc-800 pb-3">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'matrix', label: 'Comparative Matrix' },
          { id: 'generation', label: 'Shakespeare Generation Showcase' },
          { id: 'temperatures', label: 'Temperature Sampling Study' },
          { id: 'training', label: 'GPU Training Dynamics' },
          { id: 'reproduction', label: 'Reproduction Guide' }
        ].map((tab) => (
          <button
            key={tab.id}
            id={`bigram-subtab-${tab.id}`}
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
              <span className="text-[10px] text-zinc-500 uppercase block">Model Parameters</span>
              <span className="text-xl font-black text-cyan-400">~30.04M</span>
              <span className="text-[10px] text-zinc-400 block">Weight Tying (Embedding == Head)</span>
            </div>
            <div className="p-3 bg-zinc-900 border border-zinc-800">
              <span className="text-[10px] text-zinc-500 uppercase block">Context Window</span>
              <span className="text-xl font-black text-white">256 ctx</span>
              <span className="text-[10px] text-zinc-400 block">block_size=256 subwords</span>
            </div>
            <div className="p-3 bg-zinc-900 border border-zinc-800">
              <span className="text-[10px] text-zinc-500 uppercase block">Loss Reduction</span>
              <span className="text-xl font-black text-emerald-400">2.51 → 1.48</span>
              <span className="text-[10px] text-emerald-400 block">Cross-Entropy Loss</span>
            </div>
            <div className="p-3 bg-zinc-900 border border-zinc-800">
              <span className="text-[10px] text-zinc-500 uppercase block">Tokenizer & Vocab</span>
              <span className="text-xl font-black text-purple-400">50,257</span>
              <span className="text-[10px] text-zinc-400 block">tiktoken GPT-2 BPE</span>
            </div>
          </div>

          {/* Evolution Narrative */}
          <div className="p-4 bg-zinc-900/60 border border-zinc-800 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold block">
              Architectural Evolutionary Study
            </span>
            <p className="text-sm text-zinc-200 leading-relaxed font-light">
              This experiment rigorously documents the generational leap from naive statistical character lookup tables (<code>bigram.py</code>) to a 6-layer causal autoregressive Transformer with subword BPE tokenization and weight tying (<code>bigram_improved.py</code>). Implemented from scratch to deeply learn decoder-only mechanics (inspired by Andrej Karpathy's video walkthroughs), the 6-layer, 6-head Transformer trained for 5,000 steps on an NVIDIA Tesla T4 GPU generates structured theatrical dialogue and dramatic soliloquies.
            </p>
          </div>

          {/* Dataset Character Vocabulary Specs */}
          <div className="p-4 bg-zinc-900/40 border border-zinc-850 space-y-2 font-mono text-xs">
            <span className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold block">
              Tokenizer & Subword Vocabulary
            </span>
            <div className="p-2.5 bg-black/50 border border-zinc-800 text-emerald-400 break-all leading-relaxed tracking-wider font-mono">
              {data.dataset.charactersList}
            </div>
            <div className="flex justify-between text-[10px] text-zinc-500">
              <span>Total Dataset Characters: {data.dataset.totalCharacters.toLocaleString()}</span>
              <span>Subword Tokens: 50,257 (tiktoken GPT-2)</span>
            </div>
          </div>
        </div>
      )}

      {/* COMPARATIVE MATRIX SUBTAB */}
      {activeSubTab === 'matrix' && (
        <div className="space-y-6">
          <div className="space-y-2">
            <h4 className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">
              Baseline Bigram vs. 6-Layer Causal Transformer Architecture
            </h4>
            <div className="overflow-x-auto border border-zinc-800">
              <table className="w-full text-xs font-mono text-left">
                <thead className="bg-zinc-900 text-zinc-300 border-b border-zinc-800">
                  <tr>
                    <th className="p-2.5">System Metric</th>
                    <th className="p-2.5 text-zinc-400">Baseline (bigram.py)</th>
                    <th className="p-2.5 text-emerald-400">Improved (bigram_improved.py)</th>
                    <th className="p-2.5">Architectural Delta</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-850 text-zinc-300">
                  {data.comparativeMatrix.map((row, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? 'bg-zinc-950' : 'bg-zinc-900/30'}>
                      <td className="p-2.5 font-bold text-white">{row.metric}</td>
                      <td className="p-2.5 text-zinc-400">{row.bigramBaseline}</td>
                      <td className="p-2.5 text-emerald-300 font-bold">{row.transformerImproved}</td>
                      <td className="p-2.5 text-cyan-400">{row.delta}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* SHAKESPEARE GENERATION SHOWCASE SUBTAB */}
      {activeSubTab === 'generation' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Baseline Bigram Output */}
            <div className="p-4 bg-zinc-900/40 border border-zinc-800 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
                  <span className="text-xs font-mono font-bold text-zinc-400 uppercase">
                    bigram.py (Baseline)
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">
                    Loss: 2.512 · Context: 1 char
                  </span>
                </div>
                <p className="text-xs text-zinc-400 font-mono leading-relaxed bg-black/40 p-3 border border-zinc-850 break-words">
                  "{data.baselineModel.sampleOutput}"
                </p>
              </div>
              <div className="pt-3 border-t border-zinc-850 text-[10px] font-mono text-zinc-500">
                <span>Evaluation: {data.baselineModel.generationPeculiarity}</span>
              </div>
            </div>

            {/* Improved 6-Layer Transformer Output */}
            <div className="p-4 bg-zinc-900/40 border border-zinc-800 space-y-3 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-zinc-800 pb-2 mb-3">
                  <span className="text-xs font-mono font-bold text-emerald-400 uppercase">
                    bigram_improved.py (6-Layer Transformer)
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400">
                    Loss: 1.482 · Context: 256 tokens
                  </span>
                </div>
                <div className="text-xs text-zinc-200 font-mono leading-relaxed bg-black/60 p-3 border border-emerald-950/60 whitespace-pre-wrap">
                  {data.improvedModel.sampleOutput}
                </div>
              </div>
              <div className="pt-3 border-t border-zinc-850 text-[10px] font-mono text-emerald-400">
                <span>Evaluation: Coherent dramatic dialogue with genuine Elizabethan poetic cadence.</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SAMPLING TEMPERATURES STUDY SUBTAB */}
      {activeSubTab === 'temperatures' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {data.samplingTemperatures.map((tempEntry, idx) => (
              <button
                key={idx}
                onClick={() => setSelectedTempIdx(idx)}
                className={`p-4 text-left border transition cursor-pointer ${
                  selectedTempIdx === idx
                    ? 'bg-zinc-900 border-zinc-100'
                    : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                }`}
              >
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs font-mono font-bold text-white">
                    Temperature = {tempEntry.temp}
                  </span>
                  <span className={`text-[10px] font-mono ${tempEntry.temp === 0.7 ? 'text-emerald-400 font-bold' : 'text-zinc-500'}`}>
                    {tempEntry.temp === 0.7 ? 'Optimal' : ''}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-zinc-400 block">
                  {tempEntry.setting}
                </span>
              </button>
            ))}
          </div>

          {/* Active Temperature Output Card */}
          <div className="p-4 bg-zinc-900/50 border border-zinc-800 space-y-3 font-mono">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-2">
              <span className="text-xs font-bold text-white uppercase">
                Generated Text at Temperature {data.samplingTemperatures[selectedTempIdx].temp}
              </span>
              <span className="text-[10px] text-zinc-500">
                P(x_i) ~ exp(z_i / {data.samplingTemperatures[selectedTempIdx].temp})
              </span>
            </div>

            <div className="p-4 bg-zinc-950 border border-zinc-850 font-mono text-xs text-zinc-200 whitespace-pre-wrap leading-relaxed">
              {data.samplingTemperatures[selectedTempIdx].generatedText}
            </div>

            <div className="p-3 bg-zinc-900/80 border border-zinc-850 text-xs font-mono space-y-1">
              <span className="text-[9px] text-zinc-500 uppercase block">Linguistic Analysis:</span>
              <p className="text-zinc-300 font-sans text-xs leading-relaxed">
                {data.samplingTemperatures[selectedTempIdx].linguisticAnalysis}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* TRAINING DYNAMICS SUBTAB */}
      {activeSubTab === 'training' && (
        <div className="space-y-6">
          <div className="space-y-2">
            <h4 className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">
              Transformer Training Loss Trajectory (5,000 Iterations on NVIDIA Tesla T4)
            </h4>
            <div className="overflow-x-auto border border-zinc-800">
              <table className="w-full text-xs font-mono text-left">
                <thead className="bg-zinc-900 text-zinc-300 border-b border-zinc-800">
                  <tr>
                    <th className="p-2.5">Iteration Step</th>
                    <th className="p-2.5">Training Loss</th>
                    <th className="p-2.5">Validation Loss</th>
                    <th className="p-2.5">Observed Linguistic State</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-850 text-zinc-300">
                  {data.trainingLossCurve.map((entry) => (
                    <tr key={entry.step} className={entry.step === 5000 ? 'bg-zinc-900/60 font-bold' : 'bg-zinc-950'}>
                      <td className="p-2.5 text-white">Step {entry.step.toLocaleString()}</td>
                      <td className="p-2.5 text-emerald-400">{entry.trainLoss.toFixed(2)}</td>
                      <td className="p-2.5 text-cyan-400">{entry.valLoss.toFixed(2)}</td>
                      <td className="p-2.5 text-zinc-400 font-sans text-xs">
                        {entry.step === 0 && 'Random character distribution'}
                        {entry.step === 500 && 'Word spaces and basic syllables formed'}
                        {entry.step === 1000 && 'Common English words (and, the, lord) emerge'}
                        {entry.step === 2000 && 'Character names and dialogue headers established'}
                        {entry.step === 3000 && 'Sentence boundaries and question marks stabilized'}
                        {entry.step === 4000 && 'Poetic line breaks and iambic meter evident'}
                        {entry.step === 5000 && 'Full dramatic Shakespearean dialogue generated'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* REPRODUCTION GUIDE SUBTAB */}
      {activeSubTab === 'reproduction' && (
        <div className="space-y-6">
          <div className="space-y-2">
            <h4 className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold">
              Requirements & Reproduction Commands
            </h4>
            <div className="p-3 bg-zinc-900 border border-zinc-800">
              <div className="flex flex-wrap gap-1">
                {data.reproduction.requirements.map((req, i) => (
                  <span key={i} className="px-2 py-0.5 bg-zinc-950 text-zinc-300 font-mono text-[10px] border border-zinc-850">
                    {req}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="p-4 bg-zinc-900/50 border border-zinc-800 space-y-2">
            <span className="text-xs font-mono font-bold text-white block">
              CLI Execution Commands
            </span>
            <div className="p-3 bg-black/70 font-mono text-xs text-emerald-400 space-y-1.5 overflow-x-auto">
              {data.reproduction.commands.map((cmd, i) => (
                <div key={i} className="text-zinc-300">
                  <span className="text-emerald-500">$ </span>
                  {cmd}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
