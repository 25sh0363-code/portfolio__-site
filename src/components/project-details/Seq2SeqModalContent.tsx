import { useState } from 'react';
import { Seq2SeqTranslationDetails } from '../../types';
import { Layers, Cpu, Terminal, CheckCircle2, AlertTriangle, FileCode, Sparkles } from 'lucide-react';

interface Seq2SeqModalContentProps {
  data: Seq2SeqTranslationDetails;
}

export default function Seq2SeqModalContent({ data }: Seq2SeqModalContentProps) {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'attention' | 'training' | 'validation' | 'structure' | 'reproduction'>('overview');
  const [selectedDecoding, setSelectedDecoding] = useState<number>(0);

  return (
    <div className="space-y-6">
      {/* Sub-navigation Tabs */}
      <div className="flex flex-wrap gap-1 border-b border-zinc-800 pb-3">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'attention', label: 'Cross-Attention Heatmap' },
          { id: 'training', label: 'Loss Curve (Epochs 9–29)' },
          { id: 'validation', label: 'Validation & BLEU' },
          { id: 'structure', label: 'Architecture & Files' },
          { id: 'reproduction', label: 'Reproduction' }
        ].map((tab) => (
          <button
            key={tab.id}
            id={`seq2seq-subtab-${tab.id}`}
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
              <span className="text-[10px] text-zinc-500 uppercase block">Model Architecture</span>
              <span className="text-lg font-black text-white">6 Enc + 6 Dec</span>
              <span className="text-[10px] text-zinc-400 block">d_model=256, h=8</span>
            </div>
            <div className="p-3 bg-zinc-900 border border-zinc-800">
              <span className="text-[10px] text-zinc-500 uppercase block">Dataset Pairs</span>
              <span className="text-lg font-black text-cyan-400">{data.dataset.totalSentencePairs}</span>
              <span className="text-[10px] text-zinc-400 block">Soikat/opus_books</span>
            </div>
            <div className="p-3 bg-zinc-900 border border-zinc-800">
              <span className="text-[10px] text-zinc-500 uppercase block">Loss Drop</span>
              <span className="text-lg font-black text-emerald-400">7.42 → 3.003</span>
              <span className="text-[10px] text-emerald-400 block">30 Epochs (M4 CPU)</span>
            </div>
            <div className="p-3 bg-zinc-900 border border-zinc-800">
              <span className="text-[10px] text-zinc-500 uppercase block">BLEU Score</span>
              <span className="text-lg font-black text-amber-400">{data.training.finalBleu.toFixed(4)}</span>
              <span className="text-[10px] text-zinc-400 block">Small-data threshold</span>
            </div>
          </div>

          {/* Model Scope Summary */}
          <div className="p-4 bg-zinc-900/60 border border-zinc-800 space-y-2">
            <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-bold block">
              Core Technical Objective
            </span>
            <p className="text-sm text-zinc-200 leading-relaxed font-light">
              Implement and train a Transformer architecture (&ldquo;Attention Is All You Need&rdquo;) from scratch in PyTorch without using <code className="text-cyan-300 font-mono">nn.Transformer</code>, translating English to Portuguese using the Soikat/opus_books dataset.
            </p>
          </div>

          {/* Dataset & Hardware Specs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 bg-zinc-900/40 border border-zinc-800 space-y-1">
              <span className="text-zinc-500 text-[10px] uppercase block">Hardware & Compute</span>
              <span className="text-white font-bold">{data.training.hardware}</span>
              <p className="text-zinc-400 text-[11px] font-sans">Batch size 16, Adam optimizer (eps=1e-9, lr=1e-4), label smoothing 0.1.</p>
            </div>
            <div className="p-3 bg-zinc-900/40 border border-zinc-800 space-y-1">
              <span className="text-zinc-500 text-[10px] uppercase block">Tokenization Scheme</span>
              <span className="text-white font-bold">{data.dataset.tokenizer}</span>
              <p className="text-zinc-400 text-[11px] font-sans">Max sequence length 220 tokens with [SOS], [EOS], [PAD], and [UNK].</p>
            </div>
          </div>
        </div>
      )}

      {/* ATTENTION HEATMAP SUBTAB */}
      {activeSubTab === 'attention' && (
        <div className="space-y-4">
          <div className="p-4 bg-zinc-900/50 border border-zinc-800 space-y-3">
            <span className="text-xs font-mono font-bold text-white uppercase block">
              Cross-Attention Heatmap (Layer 0, Head 0)
            </span>
            <p className="text-xs text-zinc-300 font-sans leading-relaxed">
              Input: <code className="text-emerald-400 font-mono font-bold">&ldquo;{data.attentionMapExample.inputSentence}&rdquo;</code>
            </p>
            <div className="overflow-x-auto">
              <table className="text-[10px] font-mono border-collapse">
                <thead>
                  <tr>
                    <th className="p-1 text-zinc-500 text-right">Target \ Source</th>
                    {data.attentionMapExample.sourceTokens.map((st, i) => (
                      <th key={i} className="p-1 text-zinc-300 text-center">{st}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {data.attentionMapExample.targetTokens.map((tt, r) => (
                    <tr key={r} className="border-t border-zinc-900">
                      <td className="p-1 text-emerald-400 text-right font-bold">{tt}</td>
                      {data.attentionMapExample.sourceTokens.map((_, c) => {
                        const val = data.attentionMapExample.matrix[r]?.[c] ?? 0.05;
                        return (
                          <td 
                            key={c} 
                            className="p-1 text-center font-bold"
                            style={{
                              backgroundColor: val > 0.3 ? '#e5df22' : val > 0.15 ? '#239379' : '#240b3b',
                              color: val > 0.3 ? '#000000' : '#ffffff'
                            }}
                          >
                            {val.toFixed(2)}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="text-[11px] text-zinc-400 font-sans">
              Generated via <code className="text-zinc-200">inference.py → visualize_attention()</code>. Brighter yellow indicates higher cross-attention weight.
            </p>
          </div>
        </div>
      )}

      {/* TRAINING CURVE SUBTAB */}
      {activeSubTab === 'training' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="p-4 bg-zinc-900/40 border border-zinc-800 space-y-3">
            <span className="text-xs font-bold text-white uppercase block">
              Training Loss per Epoch (Epochs 9–29)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {data.validationEpochsLoss.map((item) => (
                <div key={item.epoch} className="p-2 bg-zinc-950 border border-zinc-850 flex justify-between">
                  <span className="text-zinc-400">Epoch {item.epoch}:</span>
                  <span className="text-emerald-400 font-bold">{item.loss.toFixed(3)}</span>
                </div>
              ))}
            </div>
            <p className="text-[11px] text-zinc-400 font-sans pt-2">
              Loss dropped steadily from ~7.4 at Epoch 0 to 3.003 at Epoch 29, reaching its trough of 2.85 at Epoch 28.
            </p>
          </div>
        </div>
      )}

      {/* VALIDATION & BLEU SUBTAB */}
      {activeSubTab === 'validation' && (
        <div className="space-y-4">
          <div className="p-4 bg-zinc-950 border border-amber-900/50 space-y-2">
            <span className="text-xs font-mono font-bold text-amber-400 uppercase flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" />
              Final BLEU Score: 0.0000
            </span>
            <p className="text-xs text-zinc-300 font-sans leading-relaxed">
              BLEU-4 requires consecutive 4-word exact n-gram matches. With ~1,260 training sentence pairs, the model acquired Portuguese grammar, dialogue quotes, and punctuation formatting, but lacked the corpus breadth to score on BLEU-4 exact matches.
            </p>
          </div>

          <div className="space-y-2 font-mono text-xs">
            {data.sampleTranslations.map((s) => (
              <div key={s.id} className="p-3 bg-zinc-900/60 border border-zinc-800 space-y-1">
                <div className="text-zinc-400">EN: <span className="text-white font-sans">{s.sourceEn}</span></div>
                <div className="text-zinc-400">Ref: <span className="text-zinc-300 font-sans">{s.targetPtRef}</span></div>
                <div className="text-emerald-400 font-bold">Pred: <span className="font-sans">{s.predictedPt}</span></div>
                <div className="text-[11px] text-zinc-500 font-sans pt-1">{s.analysis}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* REPOSITORY STRUCTURE SUBTAB */}
      {activeSubTab === 'structure' && (
        <div className="space-y-4 font-mono text-xs">
          <div className="p-4 bg-zinc-900/50 border border-zinc-800 space-y-2">
            <span className="text-xs font-bold text-white uppercase block">Repository File Layout</span>
            <div className="space-y-1.5">
              {data.projectStructure.map((ps, i) => (
                <div key={i} className="p-2 bg-zinc-950 border border-zinc-850">
                  <span className="text-emerald-400 font-bold">{ps.file}</span>
                  <p className="text-zinc-400 font-sans text-xs">{ps.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* REPRODUCTION SUBTAB */}
      {activeSubTab === 'reproduction' && (
        <div className="space-y-4">
          <div className="p-4 bg-zinc-900/50 border border-zinc-800 space-y-2">
            <span className="text-xs font-mono font-bold text-white block">Execution Pipeline</span>
            <div className="p-3 bg-black/80 font-mono text-xs text-emerald-400 space-y-1.5 overflow-x-auto">
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
