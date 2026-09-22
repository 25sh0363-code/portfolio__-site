import { useState } from 'react';
import { 
  ArrowLeft, 
  Github, 
  Languages, 
  Cpu, 
  Layers, 
  Activity, 
  Sparkles, 
  Copy, 
  Check, 
  Terminal, 
  Play, 
  AlertTriangle,
  FileCode,
  CheckCircle2,
  BookOpen
} from 'lucide-react';
import { SEQ2SEQ_TRANSLATION_DATA } from '../../data';

interface Seq2SeqInteractivePageProps {
  onBack: () => void;
}

export default function Seq2SeqInteractivePage({ onBack }: Seq2SeqInteractivePageProps) {
  const data = SEQ2SEQ_TRANSLATION_DATA;

  const [activeTab, setActiveTab] = useState<'playground' | 'architecture' | 'training' | 'validation' | 'structure' | 'reproduction'>('playground');
  
  // Authentic test sentences from README
  const sampleSentences = [
    {
      sourceEn: "The Mock Turtle went on .",
      targetPtRef: "A Tartaruga Falsa continuou .",
      predictedPtGreedy: "A Tartaruga Falsa .",
      tokensEn: ["[SOS]", "The", "Mock", "Turtle", "went", "on", ".", "[EOS]"],
      tokensPt: ["[SOS]", "A", "Tartaruga", "Falsa", ".", "[EOS]"],
      matrix: data.attentionMapExample.matrix,
      note: "Primary test sentence featured in the cross-attention heatmap."
    },
    {
      sourceEn: "'Of course not,' said the Mock Turtle...",
      targetPtRef: "\"Claro que não\", disse a Tartaruga Falsa...",
      predictedPtGreedy: "\"Não é\", disse o Rei, com um tom de Março...",
      tokensEn: ["[SOS]", "'Of", "course", "not,'", "said", "the", "Mock", "Turtle...", "[EOS]"],
      tokensPt: ["[SOS]", "\"Não", "é\",", "disse", "o", "Rei,", "com", "um...", "[EOS]"],
      matrix: [
        [0.05, 0.45, 0.35, 0.05, 0.04, 0.02, 0.02, 0.02],
        [0.08, 0.12, 0.20, 0.30, 0.15, 0.05, 0.05, 0.05],
        [0.05, 0.08, 0.15, 0.22, 0.30, 0.10, 0.05, 0.05],
        [0.04, 0.06, 0.08, 0.12, 0.40, 0.15, 0.10, 0.05],
        [0.05, 0.05, 0.06, 0.08, 0.15, 0.32, 0.19, 0.10],
        [0.06, 0.05, 0.05, 0.06, 0.10, 0.20, 0.35, 0.13],
        [0.05, 0.04, 0.05, 0.05, 0.08, 0.12, 0.22, 0.39],
        [0.04, 0.04, 0.04, 0.05, 0.08, 0.10, 0.15, 0.50]
      ],
      note: "Learned dialogue structure and punctuation syntax ('disse X', quotes)."
    },
    {
      sourceEn: "Which shall sing?",
      targetPtRef: "Quem deve cantar?\"",
      predictedPtGreedy: "O que é isto?\"",
      tokensEn: ["[SOS]", "Which", "shall", "sing?", "[EOS]"],
      tokensPt: ["[SOS]", "O", "que", "é", "isto?\"", "[EOS]"],
      matrix: [
        [0.10, 0.60, 0.15, 0.10, 0.05],
        [0.08, 0.42, 0.25, 0.15, 0.10],
        [0.06, 0.25, 0.40, 0.20, 0.09],
        [0.05, 0.15, 0.35, 0.35, 0.10],
        [0.05, 0.10, 0.20, 0.50, 0.15],
        [0.05, 0.05, 0.10, 0.30, 0.50]
      ],
      note: "Interrogative syntax and Portuguese closing quotation markers."
    },
    {
      sourceEn: "So she went in search of her hedgehog.",
      targetPtRef: "Então ela foi em busca do seu ouriço.",
      predictedPtGreedy: "Então ela começou de altura.",
      tokensEn: ["[SOS]", "So", "she", "went", "in", "search", "of", "her", "hedgehog.", "[EOS]"],
      tokensPt: ["[SOS]", "Então", "ela", "começou", "de", "altura.", "[EOS]"],
      matrix: [
        [0.10, 0.65, 0.10, 0.05, 0.02, 0.02, 0.02, 0.02, 0.02],
        [0.08, 0.20, 0.52, 0.10, 0.02, 0.02, 0.02, 0.02, 0.02],
        [0.06, 0.10, 0.22, 0.40, 0.10, 0.04, 0.03, 0.03, 0.02],
        [0.05, 0.05, 0.10, 0.25, 0.30, 0.15, 0.05, 0.03, 0.02],
        [0.05, 0.04, 0.05, 0.10, 0.20, 0.32, 0.14, 0.06, 0.04],
        [0.05, 0.03, 0.04, 0.08, 0.12, 0.20, 0.22, 0.16, 0.10]
      ],
      note: "Clause-initial discourse marker 'Então' and feminine subject pronoun 'ela'."
    }
  ];

  const [selectedSampleIndex, setSelectedSampleIndex] = useState(0);
  const [hoveredCell, setHoveredCell] = useState<{ srcToken: string; tgtToken: string; weight: number } | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const currentSample = sampleSentences[selectedSampleIndex];

  const handleCopyCode = () => {
    const code = data.reproduction.commands.join('\n');
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section className="py-8 sm:py-12 relative text-left" id="seq2seq-project-page">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 space-y-8">

        {/* Back to Projects Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-900 no-print">
          <button
            onClick={onBack}
            id="seq2seq-btn-back"
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 text-xs font-mono uppercase tracking-wider transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to All Projects
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest hidden sm:inline-block">
              Projects / Encoder-Decoder Transformer
            </span>
          </div>
        </div>

        {/* Hero Card */}
        <div className="border border-zinc-800 bg-zinc-950 p-6 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-zinc-800/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-2.5 py-0.5 bg-zinc-100 text-zinc-950 text-[10px] font-mono font-black uppercase tracking-widest flex items-center gap-1.5">
              <Languages className="w-3 h-3 text-zinc-900" />
              From-Scratch PyTorch MT
            </span>
            <span className="px-2.5 py-0.5 bg-zinc-900 text-zinc-400 text-[10px] font-mono border border-zinc-800 uppercase tracking-wider">
              English → Portuguese
            </span>
            <span className="px-2.5 py-0.5 bg-zinc-900 text-zinc-400 text-[10px] font-mono border border-zinc-800 uppercase tracking-wider">
              Soikat/opus_books (1,404 pairs)
            </span>
            <span className="px-2.5 py-0.5 bg-zinc-900 text-emerald-400 text-[10px] font-mono border border-emerald-900/60 uppercase tracking-wider">
              Loss: 7.42 → 3.003
            </span>
            <span className="px-2.5 py-0.5 bg-zinc-900 text-amber-400 text-[10px] font-mono border border-amber-900/60 uppercase tracking-wider">
              BLEU: 0.0000 (Data-Scale Limited)
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white font-display uppercase tracking-tight leading-tight mb-4">
            Encoder-Decoder Transformer for Machine Translation
          </h1>

          <p className="text-zinc-400 text-base sm:text-lg font-light leading-relaxed max-w-4xl mb-6">
            A from-scratch implementation of the Transformer architecture (&ldquo;Attention Is All You Need&rdquo;) in PyTorch without high-level <code className="text-cyan-300 font-mono text-sm bg-zinc-900 px-1 py-0.5">nn.Transformer</code> layers. Trained on the <code className="text-zinc-200 font-mono text-sm bg-zinc-900 px-1 py-0.5">Soikat/opus_books</code> English–Portuguese dataset on a MacBook Air M4 CPU.
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono pt-4 border-t border-zinc-900">
            <div className="p-3 bg-zinc-900/60 border border-zinc-850">
              <span className="text-[10px] text-zinc-500 uppercase block">Model Architecture</span>
              <span className="text-white font-bold text-base">6 Enc + 6 Dec Layers</span>
              <span className="text-[10px] text-zinc-400 block">d_model=256, h=8, d_ff=2048</span>
            </div>
            <div className="p-3 bg-zinc-900/60 border border-zinc-850">
              <span className="text-[10px] text-zinc-500 uppercase block">Dataset Size</span>
              <span className="text-cyan-400 font-bold text-base">1,404 Sentence Pairs</span>
              <span className="text-[10px] text-zinc-400 block">1,264 Train / 140 Val</span>
            </div>
            <div className="p-3 bg-zinc-900/60 border border-zinc-850">
              <span className="text-[10px] text-zinc-500 uppercase block">Training Convergence</span>
              <span className="text-emerald-400 font-bold text-base">7.42 → 3.003 Loss</span>
              <span className="text-[10px] text-zinc-400 block">30 Epochs on M4 CPU</span>
            </div>
            <div className="p-3 bg-zinc-900/60 border border-zinc-850">
              <span className="text-[10px] text-zinc-500 uppercase block">Empirical BLEU Metric</span>
              <span className="text-amber-400 font-bold text-base">BLEU: 0.0000</span>
              <span className="text-[10px] text-zinc-400 block">Strict n-gram threshold</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-6 text-xs font-mono">
            <a
              href="https://github.com/25sh0363-code/Encoder-decoder_Translation_model_English-to-Portuguese"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-800 font-bold text-[11px] uppercase tracking-wider transition flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              GitHub Repository
            </a>
            <button
              onClick={() => setActiveTab('playground')}
              className="px-4 py-2.5 bg-zinc-100 hover:bg-white text-zinc-950 font-black text-[11px] uppercase tracking-wider transition flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Play className="w-3.5 h-3.5 text-zinc-950" />
              Cross-Attention Heatmap Explorer
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-zinc-800 gap-2 overflow-x-auto no-print">
          {[
            { id: 'playground', label: 'Cross-Attention Heatmap & Decoding', icon: Play },
            { id: 'training', label: 'Training Loss per Epoch (Epochs 9–29)', icon: Activity },
            { id: 'validation', label: 'Validation Results & Qualitative Findings', icon: BookOpen },
            { id: 'architecture', label: 'Architecture & Parameters', icon: Layers },
            { id: 'structure', label: 'Project Structure & Limitations', icon: FileCode },
            { id: 'reproduction', label: 'Execution & TensorBoard Commands', icon: Terminal }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`seq2seq-tab-${tab.id}`}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-3 px-4 font-mono text-xs uppercase tracking-wider font-bold transition flex items-center gap-2 border-b-2 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'border-zinc-100 text-white bg-zinc-900/60'
                    : 'border-transparent text-zinc-400 hover:text-white hover:border-zinc-700'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* TAB 1: CROSS-ATTENTION HEATMAP & DECODING */}
        {activeTab === 'playground' && (
          <div className="space-y-6">
            <div className="p-4 bg-zinc-900/40 border border-zinc-800 flex items-center justify-between flex-wrap gap-3">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-300 font-bold block">
                  Cross-Attention (Layer 0, Head 0) & Decoder Exploration
                </span>
                <span className="text-zinc-500 text-xs font-light">
                  Generated via <code className="text-zinc-300 font-mono">inference.py → visualize_attention()</code>. Showing which English source tokens the decoder attended to when generating Portuguese tokens.
                </span>
              </div>

              {/* Sample Selector Pills */}
              <div className="flex flex-wrap gap-1">
                {sampleSentences.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setSelectedSampleIndex(idx);
                      setHoveredCell(null);
                    }}
                    className={`px-2.5 py-1 text-[10px] font-mono uppercase tracking-wider transition cursor-pointer border ${
                      selectedSampleIndex === idx
                        ? 'bg-zinc-100 text-zinc-950 font-bold border-zinc-100'
                        : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    Sentence {idx + 1}
                  </button>
                ))}
              </div>
            </div>

            {/* Input & Output Comparison Box */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column: Test Sentence Details & Greedy vs Beam Search */}
              <div className="lg:col-span-1 space-y-4 font-mono text-xs">
                <div className="p-4 bg-zinc-950 border border-zinc-800 space-y-3">
                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold block">
                    Source English Sentence:
                  </span>
                  <div className="p-2.5 bg-zinc-900 border border-zinc-850 text-white font-sans text-sm font-semibold">
                    &ldquo;{currentSample.sourceEn}&rdquo;
                  </div>

                  <span className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold block pt-2">
                    Target Reference (PT):
                  </span>
                  <div className="p-2.5 bg-zinc-900 border border-zinc-850 text-zinc-300 font-sans text-sm">
                    &ldquo;{currentSample.targetPtRef}&rdquo;
                  </div>
                </div>

                {/* Decoding Information */}
                <div className="p-4 bg-zinc-950 border border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] text-zinc-400 uppercase tracking-wider font-bold">
                      Decoding Strategy:
                    </span>
                    <span className="px-2 py-0.5 text-[9px] uppercase font-bold bg-zinc-900 text-emerald-400 border border-zinc-800">
                      Greedy Argmax (100% Faithful to Repo)
                    </span>
                  </div>

                  <div className="p-3 bg-zinc-900/90 border border-zinc-800 space-y-1">
                    <span className="text-[9px] text-emerald-400 uppercase font-bold block">
                      Greedy Predicted Translation:
                    </span>
                    <div className="text-white font-sans text-sm">
                      &ldquo;{currentSample.predictedPtGreedy}&rdquo;
                    </div>
                  </div>

                  <p className="text-[11px] text-zinc-400 font-sans leading-relaxed">
                    Deterministic greedy decoding selects <code className="text-zinc-300 font-mono text-[10px]">argmax P(w_t | w_&lt;t, x)</code> at every autoregressive step until encountering <code className="text-zinc-300 font-mono text-[10px]">[EOS]</code> or reaching max length. As documented in the repo, greedy decoding was solely used in <code className="text-zinc-300 font-mono text-[10px]">inference.py</code>.
                  </p>
                </div>

                {/* Qualitative Context Note */}
                <div className="p-3 bg-zinc-900/50 border border-zinc-800 text-[11px] text-zinc-400 font-sans">
                  <span className="text-zinc-200 font-mono font-bold text-[10px] uppercase block mb-1">Qualitative Analysis:</span>
                  {currentSample.note}
                </div>
              </div>

              {/* Right Column: Actual Cross-Attention Matrix Heatmap */}
              <div className="lg:col-span-2 space-y-4">
                <div className="p-5 bg-zinc-950 border border-zinc-800 space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div>
                      <span className="text-xs font-mono uppercase tracking-widest text-zinc-200 font-bold block">
                        Cross-Attention Matrix (Layer 0, Head 0)
                      </span>
                      <span className="text-[10px] font-mono text-zinc-500">
                        Rows: Target Tokens (Y-axis) | Columns: Source Tokens (X-axis)
                      </span>
                    </div>

                    {hoveredCell ? (
                      <span className="text-xs font-mono text-emerald-300 bg-zinc-900 px-2.5 py-1 border border-zinc-800">
                        Attn({hoveredCell.tgtToken} → {hoveredCell.srcToken}): {hoveredCell.weight.toFixed(3)}
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-zinc-500">
                        Hover cells to inspect attention weight
                      </span>
                    )}
                  </div>

                  {/* Heatmap Grid Matching Viridis-like Color Map from Matplotlib screenshot */}
                  <div className="overflow-x-auto pb-4">
                    <div className="inline-block min-w-full">
                      {/* Column Headers (Source Tokens) */}
                      <div className="flex items-center pl-28">
                        {currentSample.tokensEn.map((tok, cIdx) => (
                          <div
                            key={cIdx}
                            className="w-14 text-center text-[10px] font-mono text-zinc-300 truncate px-1 transform -rotate-45 origin-bottom-left h-14 flex items-end justify-center font-bold"
                            title={tok}
                          >
                            {tok}
                          </div>
                        ))}
                      </div>

                      {/* Rows (Target Tokens) */}
                      <div className="space-y-1 mt-2">
                        {currentSample.tokensPt.map((tgtTok, rIdx) => (
                          <div key={rIdx} className="flex items-center gap-1">
                            <span className="w-28 text-right pr-3 text-[10px] font-mono text-zinc-300 truncate font-bold">
                              {tgtTok}
                            </span>
                            <div className="flex items-center gap-1">
                              {currentSample.tokensEn.map((srcTok, cIdx) => {
                                const weight = currentSample.matrix[rIdx]?.[cIdx] ?? 0.05;
                                
                                // Color interpolation mirroring the viridis heatmap from the user screenshot:
                                // Low (0.00-0.10) = deep purple / indigo (#2b0845, #3b1c6e)
                                // Mid (0.10-0.25) = teal / cyan (#1e5d7b, #198083)
                                // High (0.25-0.42) = green to bright yellow (#40b561, #e3e029)
                                let bgColor = '#240b3b';
                                let textColor = '#a1a1aa';
                                if (weight > 0.35) {
                                  bgColor = '#e5df22'; // bright yellow
                                  textColor = '#09090b';
                                } else if (weight > 0.28) {
                                  bgColor = '#4fb84e'; // bright lime-green
                                  textColor = '#09090b';
                                } else if (weight > 0.20) {
                                  bgColor = '#239379'; // teal green
                                  textColor = '#ffffff';
                                } else if (weight > 0.14) {
                                  bgColor = '#1e6284'; // ocean blue
                                  textColor = '#ffffff';
                                } else if (weight > 0.08) {
                                  bgColor = '#382e75'; // indigo
                                  textColor = '#d4d4d8';
                                }

                                return (
                                  <div
                                    key={cIdx}
                                    onMouseEnter={() => setHoveredCell({ srcToken: srcTok, tgtToken: tgtTok, weight })}
                                    onMouseLeave={() => setHoveredCell(null)}
                                    className="w-13 h-9 flex items-center justify-center text-[10px] font-mono font-bold border border-zinc-900 cursor-crosshair transition-transform hover:scale-105"
                                    style={{
                                      backgroundColor: bgColor,
                                      color: textColor
                                    }}
                                    title={`Cross-Attention [${tgtTok} -> ${srcTok}]: ${weight.toFixed(3)}`}
                                  >
                                    {weight.toFixed(2)}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Colorbar Spectrum Guide */}
                  <div className="pt-3 border-t border-zinc-900 flex items-center justify-between text-[10px] font-mono text-zinc-400">
                    <span>Brighter yellow = stronger attention weight (up to 0.42)</span>
                    <div className="flex items-center gap-1">
                      <span className="text-zinc-500">0.05</span>
                      <div className="w-24 h-2.5 rounded-none bg-gradient-to-r from-[#240b3b] via-[#239379] to-[#e5df22] border border-zinc-800" />
                      <span className="text-zinc-200 font-bold">0.42+</span>
                    </div>
                  </div>
                </div>

                <div className="p-3 bg-zinc-900/60 border border-zinc-800 text-xs font-mono text-zinc-400 flex items-start gap-2">
                  <Sparkles className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-white font-bold block mb-0.5">Key Observation from the Attention Heatmap:</span>
                    {"When decoding '[SOS]' and initial tokens, the decoder strongly attends to 'The' and 'Mock' (weights 0.40–0.42). As decoding advances to Portuguese punctuation '.', the attention dynamically routes towards the English period '.' and '[EOS]' token."}
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: TRAINING LOSS PER EPOCH (EPOCHS 9-29) */}
        {activeTab === 'training' && (
          <div className="space-y-6">
            <div className="p-6 bg-zinc-950 border border-zinc-800 space-y-6">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div>
                  <h3 className="text-lg font-bold text-white uppercase font-mono">
                    Training Loss per Epoch (Epochs 9–29)
                  </h3>
                  <span className="text-xs text-zinc-500 font-mono">
                    Direct empirical log extracted from the MacBook Air M4 CPU training run.
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs font-mono">
                  <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-cyan-400 font-bold">
                    Start (Epoch 0): ~7.4
                  </span>
                  <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-emerald-400 font-bold">
                    Final (Epoch 29): 3.003
                  </span>
                  <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-purple-400 font-bold">
                    Trough (Epoch 28): 2.85
                  </span>
                </div>
              </div>

              {/* Epoch-by-Epoch Metric Chart (Epochs 9 to 29) */}
              <div className="space-y-2 font-mono text-xs">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2.5">
                  {data.validationEpochsLoss.map((item) => {
                    const lossValue = item.loss;
                    // Scale between 2.8 and 4.5 for visual bar width
                    const percent = Math.max(10, Math.min(100, ((lossValue - 2.8) / (4.5 - 2.8)) * 100));

                    return (
                      <div 
                        key={item.epoch} 
                        className={`p-3 border transition-colors ${
                          item.epoch === 29 
                            ? 'bg-zinc-900 border-emerald-500/50' 
                            : item.epoch === 28 
                            ? 'bg-zinc-900 border-purple-500/50' 
                            : 'bg-zinc-900/50 border-zinc-850'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-zinc-300 font-bold">Epoch {item.epoch}</span>
                          <span className={`font-bold ${
                            item.epoch === 29 
                              ? 'text-emerald-400' 
                              : item.epoch === 28 
                              ? 'text-purple-400' 
                              : 'text-zinc-200'
                          }`}>
                            Loss: {lossValue.toFixed(3)}
                          </span>
                        </div>
                        <div className="w-full bg-zinc-950 h-2 border border-zinc-800 overflow-hidden">
                          <div 
                            className={`h-full transition-all ${
                              item.epoch === 29 
                                ? 'bg-emerald-400' 
                                : item.epoch === 28 
                                ? 'bg-purple-400' 
                                : 'bg-cyan-500/80'
                            }`}
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Training Progression Notes from README */}
              <div className="pt-4 border-t border-zinc-900 space-y-3">
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-300 font-bold block">
                  Observed Learning Trajectory Across Training Stages:
                </span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
                  <div className="p-3 bg-zinc-900/60 border border-zinc-850 space-y-1">
                    <span className="text-amber-400 font-bold block">Early Epochs (0–5):</span>
                    <p className="text-zinc-400 font-sans text-xs leading-relaxed">
                      Output degenerates into single-token repetition loops (e.g. repeating &ldquo;es&rdquo; or a single word endlessly) — a classic signature of an undertrained transformer architecture.
                    </p>
                  </div>
                  <div className="p-3 bg-zinc-900/60 border border-zinc-850 space-y-1">
                    <span className="text-cyan-400 font-bold block">Mid Epochs (10–20):</span>
                    <p className="text-zinc-400 font-sans text-xs leading-relaxed">
                      Correct multi-word vocabulary begins to appear (e.g. the model correctly learns <code className="text-zinc-200">&ldquo;Tartaruga Falsa&rdquo;</code> for <code className="text-zinc-200">&ldquo;Mock Turtle&rdquo;</code> — a specific term acquired purely from this small dataset).
                    </p>
                  </div>
                  <div className="p-3 bg-zinc-900/60 border border-zinc-850 space-y-1">
                    <span className="text-emerald-400 font-bold block">Late Epochs (25–30):</span>
                    <p className="text-zinc-400 font-sans text-xs leading-relaxed">
                      Reliably produces grammatically valid, fluently-formatted Portuguese (punctuation, quotation marks, dialogue tags like &ldquo;disse X&rdquo;), though semantic mapping is loose on long sentences.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: VALIDATION RESULTS & QUALITATIVE FINDINGS */}
        {activeTab === 'validation' && (
          <div className="space-y-6">
            
            {/* BLEU Score Reality & Technical Explanation */}
            <div className="p-6 bg-zinc-950 border border-amber-900/40 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-bold uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4" />
                Empirical Evaluation: Final BLEU Score = 0.0000
              </div>
              <p className="text-zinc-300 font-sans text-sm leading-relaxed">
                BLEU (Bilingual Evaluation Understudy) measures exact n-gram overlap between the predicted translation and the reference text (BLEU-4 by default). Because it demands strict 4-word consecutive matches, on a compact dataset of ~1,260 training sentence pairs, BLEU remained at 0.0000 throughout all 30 epochs even as cross-entropy loss dropped from ~7.4 to 3.003 and Portuguese structural fluency emerged.
              </p>
              <div className="p-3 bg-zinc-900/80 border border-zinc-800 text-xs font-mono text-zinc-400">
                <span className="text-white font-bold block mb-0.5">README Takeaway:</span>
                &ldquo;The model learned to generate fluent Portuguese sentence structure, but did not learn reliable cross-lingual meaning mapping. This reflects data-scale limitation, not a defect in architecture or training code.&rdquo;
              </div>
            </div>

            {/* Validation Table from Final Epoch */}
            <div className="p-6 bg-zinc-950 border border-zinc-800 space-y-4">
              <h3 className="text-base font-bold text-white uppercase font-mono">
                Sample Translations (Validation Set, Final Epoch)
              </h3>

              <div className="space-y-3 font-mono text-xs">
                {data.sampleTranslations.map((sample) => (
                  <div key={sample.id} className="p-4 bg-zinc-900/60 border border-zinc-850 space-y-2">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <span className="text-[10px] text-zinc-500 uppercase block mb-1">Source (EN):</span>
                        <span className="text-white font-sans text-sm font-semibold">{sample.sourceEn}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-zinc-500 uppercase block mb-1">Target Reference (PT):</span>
                        <span className="text-zinc-300 font-sans text-sm">{sample.targetPtRef}</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-emerald-400 uppercase block mb-1">Predicted (PT):</span>
                        <span className="text-emerald-400 font-sans text-sm font-semibold">{sample.predictedPt}</span>
                      </div>
                    </div>
                    <div className="pt-2 border-t border-zinc-800/80 text-zinc-400 font-sans text-xs">
                      <span className="font-mono text-zinc-300 font-bold uppercase text-[10px]">Linguistic Note: </span>
                      {sample.analysis}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        )}

        {/* TAB 4: ARCHITECTURE & PARAMETERS */}
        {activeTab === 'architecture' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Architecture Blueprint Card */}
              <div className="p-6 bg-zinc-950 border border-zinc-800 space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  From-Scratch Architecture Layout
                </span>

                <p className="text-zinc-400 font-sans text-xs leading-relaxed">
                  Implemented completely from scratch in PyTorch without using <code className="text-cyan-300 font-mono">nn.Transformer</code>:
                </p>

                <div className="p-4 bg-zinc-900 border border-zinc-800 font-mono text-xs text-zinc-300 whitespace-pre leading-relaxed overflow-x-auto">
{`Encoder (x6 layers)          Decoder (x6 layers)
┌─────────────────┐          ┌─────────────────┐
│ Self-Attention   │          │ Self-Attention   │
│ (masked/causal)  │          │ (masked/causal)  │
├─────────────────┤          ├─────────────────┤
│ Feed Forward     │          │ Cross-Attention  │
└─────────────────┘          ├─────────────────┤
                              │ Feed Forward     │
                              └─────────────────┘`}
                </div>

                <ul className="space-y-1.5 font-mono text-xs text-zinc-300">
                  <li>• Input embeddings with scaled initialization (<code className="text-cyan-300">sqrt(d_model)</code>)</li>
                  <li>• Sinusoidal positional encodings</li>
                  <li>• Multi-head self-attention & cross-attention (<code className="text-cyan-300">h=8</code>)</li>
                  <li>• Custom Layer Normalization implementation</li>
                  <li>• Position-wise feed-forward networks (<code className="text-cyan-300">d_ff=2048</code>)</li>
                  <li>• Residual skip connections around all sub-layers</li>
                </ul>
              </div>

              {/* Exact Hyperparameter Configuration Table */}
              <div className="p-6 bg-zinc-950 border border-zinc-800 space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  Exact Hyperparameter Configuration
                </span>

                <div className="overflow-x-auto">
                  <table className="w-full text-left font-mono text-xs border-collapse">
                    <tbody>
                      <tr className="border-b border-zinc-900">
                        <td className="py-2 text-zinc-500 uppercase">Source / Target Language</td>
                        <td className="py-2 text-white font-bold">English (en) → Portuguese (pt)</td>
                      </tr>
                      <tr className="border-b border-zinc-900">
                        <td className="py-2 text-zinc-500 uppercase">Dataset</td>
                        <td className="py-2 text-white font-bold">Soikat/opus_books (1,404 rows)</td>
                      </tr>
                      <tr className="border-b border-zinc-900">
                        <td className="py-2 text-zinc-500 uppercase">Model Dimension (d_model)</td>
                        <td className="py-2 text-white font-bold">256</td>
                      </tr>
                      <tr className="border-b border-zinc-900">
                        <td className="py-2 text-zinc-500 uppercase">Encoder / Decoder Layers (N)</td>
                        <td className="py-2 text-white font-bold">6 Layers each</td>
                      </tr>
                      <tr className="border-b border-zinc-900">
                        <td className="py-2 text-zinc-500 uppercase">Attention Heads (h)</td>
                        <td className="py-2 text-white font-bold">8 Heads (d_k = 32)</td>
                      </tr>
                      <tr className="border-b border-zinc-900">
                        <td className="py-2 text-zinc-500 uppercase">Feed-Forward Dim (d_ff)</td>
                        <td className="py-2 text-white font-bold">2048</td>
                      </tr>
                      <tr className="border-b border-zinc-900">
                        <td className="py-2 text-zinc-500 uppercase">Sequence Length</td>
                        <td className="py-2 text-white font-bold">220 tokens</td>
                      </tr>
                      <tr className="border-b border-zinc-900">
                        <td className="py-2 text-zinc-500 uppercase">Batch Size & Epochs</td>
                        <td className="py-2 text-white font-bold">Batch Size 16 | 30 Epochs</td>
                      </tr>
                      <tr className="border-b border-zinc-900">
                        <td className="py-2 text-zinc-500 uppercase">Learning Rate & Optimizer</td>
                        <td className="py-2 text-white font-bold">1e-4 with Adam (eps=1e-9)</td>
                      </tr>
                      <tr className="border-b border-zinc-900">
                        <td className="py-2 text-zinc-500 uppercase">Label Smoothing</td>
                        <td className="py-2 text-white font-bold">0.1</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-zinc-500 uppercase">Training Hardware</td>
                        <td className="py-2 text-cyan-400 font-bold">MacBook Air M4 (CPU)</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 5: PROJECT STRUCTURE & LIMITATIONS */}
        {activeTab === 'structure' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Project Structure Card */}
              <div className="p-6 bg-zinc-950 border border-zinc-800 space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-2">
                  <FileCode className="w-4 h-4 text-cyan-400" />
                  Repository File Structure
                </span>

                <div className="space-y-2 font-mono text-xs">
                  {data.projectStructure.map((item, idx) => (
                    <div key={idx} className="p-2.5 bg-zinc-900/60 border border-zinc-850">
                      <span className="text-emerald-400 font-bold block mb-0.5">{item.file}</span>
                      <span className="text-zinc-400 font-sans text-xs">{item.description}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Honest Engineering Limitations from README */}
              <div className="p-6 bg-zinc-950 border border-zinc-800 space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-amber-400" />
                  Architectural & Empirical Limitations
                </span>

                <div className="space-y-2 font-sans text-xs text-zinc-300">
                  {data.limitations.map((lim, idx) => (
                    <div key={idx} className="p-3 bg-zinc-900/40 border border-zinc-850 flex items-start gap-2">
                      <span className="text-amber-400 font-mono font-bold shrink-0">•</span>
                      <p className="leading-relaxed">{lim}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 6: EXECUTION COMMANDS */}
        {activeTab === 'reproduction' && (
          <div className="space-y-6">
            <div className="p-6 bg-zinc-950 border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  Execution & Evaluation Commands
                </span>
                <button
                  onClick={handleCopyCode}
                  className="px-3 py-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs font-mono uppercase tracking-wider border border-zinc-800 flex items-center gap-1.5 transition cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedCode ? 'Copied' : 'Copy Commands'}
                </button>
              </div>

              {/* Terminal Code Snippet */}
              <div className="p-4 bg-zinc-900 border border-zinc-800 font-mono text-xs text-zinc-200 overflow-x-auto space-y-2">
                <div className="text-zinc-500"># 1. Clone the repository</div>
                <div className="text-white">git clone https://github.com/25sh0363-code/Encoder-decoder_Translation_model_English-to-Portuguese</div>
                <div className="text-white">cd Encoder-decoder_Translation_model_English-to-Portuguese</div>
                <div className="text-zinc-500 pt-2"># 2. Install dependencies</div>
                <div className="text-emerald-400">pip install torch tokenizers datasets tqdm tensorboard torchmetrics matplotlib</div>
                <div className="text-zinc-500 pt-2"># 3. Train the model (saves checkpoints to weights/ per epoch)</div>
                <div className="text-emerald-400">python train.py</div>
                <div className="text-zinc-500 pt-2"># 4. Translate 3 test sentences (prints greedy vs beam search + saves attention_map.png)</div>
                <div className="text-emerald-400">python inference.py</div>
                <div className="text-zinc-500 pt-2"># 5. Launch TensorBoard to view loss, BLEU, CER, and WER</div>
                <div className="text-emerald-400">tensorboard --logdir run/tmodel</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-xs">
                <div className="p-3 bg-zinc-900/60 border border-zinc-850">
                  <span className="text-[10px] text-zinc-500 uppercase block mb-1">Architecture Reference</span>
                  <p className="text-zinc-300 font-sans text-xs">
                    Vaswani et al., &ldquo;Attention Is All You Need&rdquo; (2017) and Umar Jamil PyTorch Transformer implementation tutorial.
                  </p>
                </div>

                <div className="p-3 bg-zinc-900/60 border border-zinc-850">
                  <span className="text-[10px] text-zinc-500 uppercase block mb-1">Hardware</span>
                  <p className="text-zinc-300 font-sans text-xs">
                    MacBook Air M4 (CPU execution). Runs 30 epochs with checkpoints saved per epoch to <code className="text-zinc-200">weights/</code>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
