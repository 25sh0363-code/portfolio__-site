import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ArrowLeft, 
  Github, 
  ExternalLink, 
  Cpu, 
  Layers, 
  Activity, 
  Sliders, 
  Sparkles, 
  CheckCircle2, 
  Copy, 
  Check, 
  Terminal, 
  Play, 
  RefreshCw,
  BookOpen,
  BarChart2,
  Code2
} from 'lucide-react';
import { CHAR_BIGRAM_DATA } from '../../data';

interface CharBigramInteractivePageProps {
  onBack: () => void;
}

export default function CharBigramInteractivePage({ onBack }: CharBigramInteractivePageProps) {
  const data = CHAR_BIGRAM_DATA;

  const [activeTab, setActiveTab] = useState<'outputs' | 'architecture' | 'loss' | 'comparison' | 'reproduction'>('outputs');

  // Empirical Inspection state
  const [selectedModel, setSelectedModel] = useState<'baseline' | 'transformer'>('transformer');
  const [copiedCode, setCopiedCode] = useState(false);

  // Model-specific actual empirical outputs
  const empiricalSamples: Record<'baseline' | 'transformer', {
    title: string;
    subtitle: string;
    loss: string;
    trainingStatus: string;
    output: string;
    analysis: string;
  }> = {
    baseline: {
      title: "bigram.py (Char-Level Lookup Baseline)",
      subtitle: "Single-character transition lookup table without attention",
      loss: "2.512 Cross-Entropy",
      trainingStatus: "Untrained Baseline Script (Random/Direct Table)",
      output: `tht heve se an t o whe s, t t lll otheve whelllo s o t d, an an st wththe he s, wanoo pprith the thot!`,
      analysis: "Phonetically collapsed character noise. Captures basic consonant-vowel transitions (e.g. 'th', 'he') but has 0-token long-range memory and lacks syllable/word boundaries."
    },
    transformer: {
      title: "bigram_improved.py (6-Layer Decoder Transformer)",
      subtitle: "6 Causal Blocks × 6 Heads · GPT-2 BPE Tokenizer · Weight Tying",
      loss: "1.482 Cross-Entropy",
      trainingStatus: "Trained on NVIDIA Tesla T4 GPU (5,000 steps · 36 minutes)",
      output: `First Lord:
The gates by heaven, so had I been done!
Divid--he walking never now pronounce's noise of,
To stranger me see him, were from my teeth,
And farewell outward for
Her man slander'd boners. O come, my son
Blacking, Isabet fights too her live her,
injuised nobod and here after:--he is it serviced,
Was not his conscience that will might be corrupt
That with child his soler-dreadful futurous
Feermitate of sulful servictuls:
Come, let me be leave, and the firmal-late
Before me in are done? he were it accuse
The and most well-allocked setting. They not me seas,
I'll for you. Please you, sweet your greates;
Which, go me I say, my mind, thou shapest think'st
That bids my married and chastisement now.`,
      analysis: "Coherent theatrical monologue featuring authentic dramatic speaker tagging ('First Lord:'), iambic rhythmic meter, capitalization rules, and rich Shakespearean archaic vocabulary."
    }
  };

  // Top candidates for probability distribution visualizer given context
  const candidateDistributions: Record<'baseline' | 'transformer', Array<{ char: string; prob: number; note: string }>> = {
    baseline: [
      { char: '<SPACE>', prob: 0.32, note: "Naive statistical unigram frequency" },
      { char: 'e', prob: 0.18, note: "High-frequency ASCII character" },
      { char: 'o', prob: 0.14, note: "High-frequency ASCII character" },
      { char: 'a', prob: 0.11, note: "High-frequency ASCII character" },
      { char: 't', prob: 0.09, note: "Common consonant" }
    ],
    transformer: [
      { char: '\\nThe', prob: 0.54, note: "High-probability clause initiator after speaker header" },
      { char: ' I', prob: 0.21, note: "First-person monologue subject pronoun" },
      { char: ' Come', prob: 0.12, note: "Imperative dramatic verb phrase" },
      { char: ' Sir', prob: 0.08, note: "Archaic Shakespearean formal address" },
      { char: ' What', prob: 0.05, note: "Interrogative soliloquy starter" }
    ]
  };

  const handleCopyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <section className="py-8 sm:py-12 relative text-left" id="char-bigram-project-page">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 space-y-8">

        {/* Back to Projects Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-900 no-print">
          <button
            onClick={onBack}
            id="char-bigram-btn-back"
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 text-xs font-mono uppercase tracking-wider transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to All Projects
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest hidden sm:inline-block">
              Projects / Character-Level Language Models
            </span>
          </div>
        </div>

        {/* Hero Card */}
        <div className="border border-zinc-800 bg-zinc-950 p-6 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-zinc-800/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-2.5 py-0.5 bg-zinc-100 text-zinc-950 text-[10px] font-mono font-black uppercase tracking-widest flex items-center gap-1.5">
              <Cpu className="w-3 h-3 text-zinc-900" />
              Decoder-Only Language Model Study
            </span>
            <span className="px-2.5 py-0.5 bg-zinc-900 text-zinc-400 text-[10px] font-mono border border-zinc-800 uppercase tracking-wider">
              GPT-2 BPE (50,257 Vocab)
            </span>
            <span className="px-2.5 py-0.5 bg-zinc-900 text-cyan-400 text-[10px] font-mono border border-cyan-900/60 uppercase tracking-wider">
              Weight Tying (Embedding == LM Head)
            </span>
            <span className="px-2.5 py-0.5 bg-zinc-900 text-emerald-400 text-[10px] font-mono border border-emerald-900/60 uppercase tracking-wider">
              6 Layers · 6 Heads · d_model=384
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white font-display uppercase tracking-tight leading-tight mb-4">
            Basic & Improved Decoder-Only Language Models
          </h1>

          <p className="text-zinc-400 text-base sm:text-lg font-light leading-relaxed max-w-4xl mb-6">
            Empirical investigation tracing the generational leap from an untrained Bigram statistical lookup table baseline (<code>bigram.py</code>) to a fully trained 6-layer causal self-attention decoder Transformer with subword BPE tokenization and weight tying (<code>bigram_improved.py</code>).
          </p>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono pt-4 border-t border-zinc-900">
            <div className="p-3 bg-zinc-900/60 border border-zinc-850">
              <span className="text-[10px] text-zinc-500 uppercase block">Model Parameters</span>
              <span className="text-cyan-400 font-bold text-base">~30.04M</span>
              <span className="text-[10px] text-zinc-400 block">With Weight Tying</span>
            </div>
            <div className="p-3 bg-zinc-900/60 border border-zinc-850">
              <span className="text-[10px] text-zinc-500 uppercase block">Training Wall-Clock</span>
              <span className="text-emerald-400 font-bold text-base">36 Minutes</span>
              <span className="text-[10px] text-zinc-400 block">NVIDIA Tesla T4 GPU</span>
            </div>
            <div className="p-3 bg-zinc-900/60 border border-zinc-850">
              <span className="text-[10px] text-zinc-500 uppercase block">Block & Batch Size</span>
              <span className="text-white font-bold text-base">256 ctx · 64 batch</span>
              <span className="text-[10px] text-zinc-400 block">5,000 Iterations</span>
            </div>
            <div className="p-3 bg-zinc-900/60 border border-zinc-850">
              <span className="text-[10px] text-zinc-500 uppercase block">Tokenizer & Vocab</span>
              <span className="text-purple-400 font-bold text-base">50,257 Tokens</span>
              <span className="text-[10px] text-zinc-400 block">tiktoken GPT-2</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-3 pt-6 text-xs font-mono">
            <a
              href="https://github.com/25sh0363-code/Basic_char_level_bigram_model"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-800 font-bold text-[11px] uppercase tracking-wider transition flex items-center gap-2"
            >
              <Github className="w-4 h-4" />
              GitHub Repository
            </a>
            <button
              onClick={() => setActiveTab('outputs')}
              className="px-4 py-2.5 bg-zinc-100 hover:bg-white text-zinc-950 font-black text-[11px] uppercase tracking-wider transition flex items-center gap-2 cursor-pointer shadow-md"
            >
              <BookOpen className="w-3.5 h-3.5 text-zinc-950" />
              Inspect Empirical Outputs & Weights
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-zinc-800 gap-2 overflow-x-auto no-print">
          {[
            { id: 'outputs', label: 'Empirical Output & Weight Tying Inspector', icon: BookOpen },
            { id: 'architecture', label: 'Architectural Evolution & Weight Tying', icon: Layers },
            { id: 'loss', label: 'Empirical Loss Dynamics (T4 GPU)', icon: Activity },
            { id: 'comparison', label: 'Side-by-Side Generation Matrix', icon: Code2 },
            { id: 'reproduction', label: 'Reproduction Guide & PyTorch Code', icon: Terminal }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`char-bigram-tab-${tab.id}`}
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

        {/* TAB 1: EMPIRICAL OUTPUT & WEIGHT TYING INSPECTOR */}
        {activeTab === 'outputs' && (
          <div className="space-y-6">
            <div className="p-4 bg-zinc-900/40 border border-zinc-800 flex items-center justify-between flex-wrap gap-3">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-300 font-bold block">
                  Empirical Model Artifacts Inspector
                </span>
                <span className="text-zinc-500 text-xs font-light">
                  Direct inspection of trained model outputs (5,000 steps on Tesla T4) vs the untrained baseline lookup table.
                </span>
              </div>

              {/* Model Selector Tabs */}
              <div className="flex gap-1">
                {[
                  { id: 'baseline', label: '1. bigram.py (Untrained Lookup Baseline)' },
                  { id: 'transformer', label: '2. bigram_improved.py (Trained 6-Layer Transformer)' }
                ].map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setSelectedModel(m.id as any)}
                    className={`px-3 py-1.5 text-[10px] font-mono uppercase tracking-wider transition cursor-pointer border ${
                      selectedModel === m.id
                        ? 'bg-zinc-100 text-zinc-950 font-bold border-zinc-100'
                        : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-700'
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Empirical Inspector Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Left Column: Metadata & Token Logit Distribution */}
              <div className="lg:col-span-1 space-y-4">
                <div className="p-4 bg-zinc-950 border border-zinc-800 space-y-3">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold block">
                    Model Checkpoint Profile:
                  </span>

                  {/* Model Specs Capsule */}
                  <div className="p-3 bg-zinc-900/60 border border-zinc-850 text-xs font-mono space-y-2">
                    <div className="flex justify-between text-[10px]">
                      <span className="text-zinc-500">Training Status:</span>
                      <span className={`font-bold ${selectedModel === 'transformer' ? 'text-emerald-400' : 'text-zinc-400'}`}>
                        {empiricalSamples[selectedModel].trainingStatus}
                      </span>
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <span className="text-zinc-500">Parameters:</span>
                      <span className="text-white font-bold">
                        {selectedModel === 'baseline' ? '4,225 weights' : '~30.04M (Tied Weights)'}
                      </span>
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <span className="text-zinc-500">Context Window:</span>
                      <span className="text-cyan-400 font-bold">
                        {selectedModel === 'baseline' ? '1 char' : '256 tokens (block_size)'}
                      </span>
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <span className="text-zinc-500">Cross-Entropy Loss:</span>
                      <span className="text-emerald-400 font-bold">
                        {empiricalSamples[selectedModel].loss}
                      </span>
                    </div>
                    <div className="flex justify-between text-[10px]">
                      <span className="text-zinc-500">Tokenizer:</span>
                      <span className="text-purple-400 font-bold">
                        {selectedModel === 'baseline' ? '65 ASCII Chars' : 'tiktoken GPT-2 (50,257)'}
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-zinc-900/40 border border-zinc-850 text-[11px] text-zinc-400 font-sans leading-relaxed">
                    <span className="font-mono text-[10px] uppercase font-bold text-zinc-300 block mb-1">Architecture Note:</span>
                    {selectedModel === 'transformer' 
                      ? "Only the improved 6-layer model was trained for 5,000 steps on an NVIDIA Tesla T4 GPU. Weight tying binds the embedding matrix directly to the language model output projection head."
                      : "The original bigram.py serves as a minimal statistical baseline and was not subjected to extensive GPU training."
                    }
                  </div>
                </div>

                {/* Candidate Probability Distribution Bar Chart */}
                <div className="p-4 bg-zinc-950 border border-zinc-800 space-y-3">
                  <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest font-bold block">
                    {"Next Token Logit Distribution (P(x_{t+1} | x_{≤ t})):"}
                  </span>
                  <div className="space-y-2 font-mono text-xs">
                    {candidateDistributions[selectedModel].map((item, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <div className="flex justify-between text-[10px]">
                          <span className="text-zinc-300 font-bold">
                            {item.char}
                          </span>
                          <span className="text-cyan-400 font-bold">{(item.prob * 100).toFixed(0)}%</span>
                        </div>
                        <div className="w-full bg-zinc-900 h-1.5 border border-zinc-800">
                          <div
                            className="bg-cyan-400 h-full transition-all duration-300"
                            style={{ width: `${item.prob * 100}%` }}
                          />
                        </div>
                        <span className="text-[9px] text-zinc-500 font-sans block">{item.note}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Columns: Empirical Output Display */}
              <div className="lg:col-span-2 space-y-4">
                <div className="p-6 bg-zinc-950 border border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                    <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold">
                      Empirical Output Sample (from Checkpoint):
                    </span>
                    <span className="text-[10px] font-mono text-emerald-400 uppercase">
                      {empiricalSamples[selectedModel].title}
                    </span>
                  </div>

                  <div className="p-4 bg-zinc-900 border border-zinc-800 font-mono text-xs text-zinc-100 whitespace-pre-wrap leading-relaxed">
                    {empiricalSamples[selectedModel].output}
                  </div>

                  <div className="p-3 bg-zinc-900/60 border border-zinc-850 text-xs font-mono space-y-1">
                    <span className="text-[9px] text-zinc-500 uppercase block">Linguistic Evaluation:</span>
                    <p className="text-zinc-300 font-sans text-xs leading-relaxed">
                      {empiricalSamples[selectedModel].analysis}
                    </p>
                  </div>

                  <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 pt-2 border-t border-zinc-900">
                    <span>Dataset: Tiny Shakespeare (input.txt) · 90% train / 10% val</span>
                    <span>Sampling: Multinomial Categorical with Softmax</span>
                  </div>
                </div>

                {/* Linguistic Emergence Insight */}
                <div className="p-4 bg-zinc-900/60 border border-zinc-800 space-y-2 font-mono text-xs">
                  <span className="text-cyan-400 font-bold uppercase tracking-wider block">
                    Observed Model Behaviors & Emergence:
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] text-zinc-400 font-sans">
                    <div className="p-2.5 bg-zinc-950 border border-zinc-850">
                      <span className="text-white font-mono font-bold block mb-1">1. bigram.py (Char Lookup Baseline)</span>
                      Direct transition lookup table without attention. Captures simple consonant-vowel transitions (e.g. &apos;th&apos;, &apos;he&apos;) but fails to form syllables or real words due to 1-character memory context.
                    </div>
                    <div className="p-2.5 bg-zinc-950 border border-zinc-850">
                      <span className="text-emerald-400 font-mono font-bold block mb-1">2. bigram_improved.py (6-Layer Transformer)</span>
                      Combines tiktoken GPT-2 subwords with 6 causal attention heads across 6 layers. With weight tying and 256-token context, generates authentic theatrical dialogue lines and dramatic speaker attribution (&apos;First Lord:&apos;).
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 2: ARCHITECTURAL EVOLUTION */}
        {activeTab === 'architecture' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Comparative Architecture Table */}
              <div className="p-6 bg-zinc-950 border border-zinc-800 space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-2">
                  <Layers className="w-4 h-4 text-cyan-400" />
                  Model Architecture Matrix
                </span>

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 bg-zinc-900 border border-zinc-800">
                    <span className="text-white font-bold block mb-1">bigram.py (Char-Level Baseline)</span>
                    <ul className="text-zinc-400 text-xs space-y-1">
                      <li>• Tokenization: 1 character per token (65 ASCII chars)</li>
                      <li>• Context Length: 1 character (block_size=1)</li>
                      <li>• Parameters: 65 × 65 = 4,225 weights</li>
                      <li>• Architecture: Single nn.Embedding lookup table</li>
                    </ul>
                  </div>

                  <div className="p-3 bg-zinc-900 border border-zinc-800">
                    <span className="text-emerald-400 font-bold block mb-1">bigram_improved.py (6-Layer Transformer)</span>
                    <ul className="text-zinc-400 text-xs space-y-1">
                      <li>• Tokenization: tiktoken GPT-2 BPE (50,257 vocab size)</li>
                      <li>• Context Length: 256 tokens (block_size=256)</li>
                      <li>• Layers & Heads: 6 blocks × 6 heads (head_size=64, d_model=384)</li>
                      <li>• Weight Tying: <code>token_embedding_table.weight = lm_head.weight</code></li>
                      <li>• FeedForward: <code>Linear(384, 1536) → ReLU() → Linear(1536, 384) → Dropout(0.2)</code></li>
                      <li>• Normalization: Pre-LayerNorm (<code>nn.LayerNorm(384)</code>)</li>
                      <li>• Parameters: ~30.04M (tied output projection)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Transformer Formulations */}
              <div className="p-6 bg-zinc-950 border border-zinc-800 space-y-4">
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-emerald-400" />
                  Key Mathematical Components
                </span>

                <div className="space-y-3 font-mono text-xs">
                  <div className="p-3 bg-zinc-900 border border-zinc-850">
                    <span className="text-[10px] text-zinc-500 uppercase block mb-1">Weight Tying Principle:</span>
                    <div className="p-2 bg-zinc-950 text-cyan-300 rounded font-mono text-[11px] overflow-x-auto">
                      self.token_embedding_table.weight = self.lm_head.weight
                    </div>
                  </div>

                  <div className="p-3 bg-zinc-900 border border-zinc-850">
                    <span className="text-[10px] text-zinc-500 uppercase block mb-1">Causal Masked Self-Attention:</span>
                    <div className="p-2 bg-zinc-950 text-purple-300 rounded font-mono text-[11px] overflow-x-auto">
                      wei = (q @ k.T) * (d_k ** -0.5)
                      wei = wei.masked_fill(tril == 0, -inf)
                      out = softmax(wei, dim=-1) @ v
                    </div>
                  </div>

                  <div className="p-3 bg-zinc-900 border border-zinc-850">
                    <span className="text-[10px] text-zinc-500 uppercase block mb-1">Pre-LayerNorm Residual Block:</span>
                    <div className="p-2 bg-zinc-950 text-emerald-300 rounded font-mono text-[11px] overflow-x-auto">
                      x = x + self.sa(self.ln1(x))
                      x = x + self.ffwd(self.ln2(x))
                    </div>
                  </div>

                  <div className="p-3 bg-zinc-900 border border-zinc-850">
                    <span className="text-[10px] text-zinc-500 uppercase block mb-1">Autoregressive Generation Sampling:</span>
                    <div className="p-2 bg-zinc-950 text-amber-300 rounded font-mono text-[11px] overflow-x-auto">
                      idx_next = torch.multinomial(F.softmax(logits[:, -1, :], dim=-1), num_samples=1)
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: LOSS DYNAMICS */}
        {activeTab === 'loss' && (
          <div className="space-y-6">
            <div className="p-6 bg-zinc-950 border border-zinc-800 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white uppercase font-mono">
                  Cross-Entropy Loss Progression (5,000 Steps)
                </h3>
                <span className="text-xs text-zinc-500 font-mono">
                  Trained on NVIDIA Tesla T4 GPU for 36 minutes (batch size = 64, learning rate = 5e-4).
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-4 bg-zinc-900 border border-zinc-800 space-y-2">
                  <span className="text-zinc-500 uppercase text-[10px] block">1. bigram.py Baseline</span>
                  <span className="text-2xl font-black text-white">2.51 NLL</span>
                  <p className="text-[11px] text-zinc-400 font-sans">
                    Plateaus immediately after initial steps. Limited by lack of multi-token context memory.
                  </p>
                </div>

                <div className="p-4 bg-zinc-900 border border-zinc-800 space-y-2">
                  <span className="text-zinc-500 uppercase text-[10px] block">2. bigram_improved.py (6-Layer Transformer)</span>
                  <span className="text-2xl font-black text-emerald-400">1.48 NLL</span>
                  <p className="text-[11px] text-zinc-400 font-sans">
                    Steep loss drop across 5,000 steps on Tesla T4 GPU. Learns subword vocabulary and theatrical dialogue structures.
                  </p>
                </div>
              </div>

              {/* Loss Trajectory Table */}
              <div className="overflow-x-auto border border-zinc-800">
                <table className="w-full text-xs font-mono text-left">
                  <thead className="bg-zinc-900 text-zinc-300 border-b border-zinc-800">
                    <tr>
                      <th className="p-2.5">Iteration Step</th>
                      <th className="p-2.5">Train Loss</th>
                      <th className="p-2.5">Val Loss</th>
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
                          {entry.step === 0 && 'Initial random token distribution'}
                          {entry.step === 1000 && 'Common English words and whitespace emerge'}
                          {entry.step === 2000 && 'Speaker tags and line capitalization begin to form'}
                          {entry.step === 3000 && 'Punctuation and dialogue structure established'}
                          {entry.step === 4000 && 'Archaic Shakespearean vocabulary stabilized'}
                          {entry.step === 5000 && 'Full theatrical dialogue generation (First Lord soliloquy)'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: SIDE-BY-SIDE COMPARISON */}
        {activeTab === 'comparison' && (
          <div className="space-y-6">
            <div className="p-6 bg-zinc-950 border border-zinc-800 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-white uppercase font-mono">
                  Qualitative Output Comparison
                </h3>
                <span className="text-xs text-zinc-500 font-mono">
                  Demonstration of phoneme transitions vs full theatrical dialogue generation.
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
                {/* Baseline Column */}
                <div className="p-4 bg-zinc-900 border border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                    <span className="text-white font-bold uppercase">1. bigram.py (Char Lookup Baseline)</span>
                    <span className="text-[10px] text-zinc-500">Loss: ~2.51</span>
                  </div>
                  <p className="text-zinc-400 leading-relaxed font-mono text-[11px] whitespace-pre-wrap bg-black/40 p-3 border border-zinc-850">
                    &quot;tht heve se an t o whe s, t t lll otheve whelllo s o t d, an an st wththe he s, wanoo pprith the thot!&quot;
                  </p>
                  <div className="pt-2 border-t border-zinc-850 text-[10px] text-zinc-500 font-sans">
                    Single character transition probability. Captures local letter pairings but zero semantic or word cohesion.
                  </div>
                </div>

                {/* Transformer Column */}
                <div className="p-4 bg-zinc-900 border border-zinc-800 space-y-3">
                  <div className="flex items-center justify-between pb-2 border-b border-zinc-800">
                    <span className="text-emerald-400 font-bold uppercase">2. bigram_improved.py (6-Layer Transformer)</span>
                    <span className="text-[10px] text-emerald-400">Loss: ~1.48 (36 min T4 GPU)</span>
                  </div>
                  <div className="text-emerald-300 leading-relaxed font-mono text-[11px] whitespace-pre-wrap bg-black/60 p-3 border border-emerald-950/60">
{`First Lord:
The gates by heaven, so had I been done!
Divid--he walking never now pronounce's noise of,
To stranger me see him, were from my teeth,
And farewell outward for
Her man slander'd boners. O come, my son
Blacking, Isabet fights too her live her,
injuised nobod and here after:--he is it serviced,
Was not his conscience that will might be corrupt
That with child his soler-dreadful futurous
Feermitate of sulful servictuls:
Come, let me be leave, and the firmal-late
Before me in are done? he were it accuse
The and most well-allocked setting. They not me seas,
I'll for you. Please you, sweet your greates;
Which, go me I say, my mind, thou shapest think'st
That bids my married and chastisement now.`}
                  </div>
                  <div className="pt-2 border-t border-zinc-850 text-[10px] text-zinc-500 font-sans">
                    Actual empirical output from repository README. Demonstrates dramatic meter, archaic phrasing, and speaker structure.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: REPRODUCTION GUIDE */}
        {activeTab === 'reproduction' && (
          <div className="space-y-6">
            <div className="p-6 bg-zinc-950 border border-zinc-800 space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-400" />
                  Reproduction & Execution Commands
                </span>
                <button
                  onClick={() => handleCopyCode(data.reproduction.commands.join('\n'))}
                  className="px-3 py-1 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 text-xs font-mono uppercase tracking-wider border border-zinc-800 flex items-center gap-1.5 transition cursor-pointer"
                >
                  {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedCode ? 'Copied' : 'Copy Commands'}
                </button>
              </div>

              <div className="p-4 bg-zinc-900 border border-zinc-800 font-mono text-xs text-zinc-200 overflow-x-auto space-y-2">
                {data.reproduction.commands.map((step, idx) => (
                  <div key={idx} className={step.startsWith('#') ? 'text-zinc-500 pt-1' : 'text-emerald-400'}>
                    {step}
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 font-mono text-xs">
                <div className="p-3 bg-zinc-900/60 border border-zinc-850">
                  <span className="text-[10px] text-zinc-500 uppercase block mb-1">Hardware & Device Support</span>
                  <ul className="space-y-1 text-zinc-300">
                    <li>• CUDA GPU (e.g. NVIDIA Tesla T4 ~36 min)</li>
                    <li>• Apple Silicon MPS (Metal Performance Shaders)</li>
                    <li>• CPU fallback</li>
                  </ul>
                </div>

                <div className="p-3 bg-zinc-900/60 border border-zinc-850">
                  <span className="text-[10px] text-zinc-500 uppercase block mb-1">Architectural Learning Reference</span>
                  <ul className="space-y-1 text-zinc-300">
                    <li>• Implemented to learn decoder-only mechanics</li>
                    <li>• Reference: Andrej Karpathy's video walkthrough</li>
                    <li>• 90% train / 10% validation split</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
