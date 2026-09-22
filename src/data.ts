import { Project, ResumeItem, Recommendation, SkillCategory, ResearchPaperData, Seq2SeqTranslationDetails, CharLevelBigramDetails, SinovateDetails, DiseaseTrackerDetails, SomunDetails, TedxDetails, Certificate } from './types';

export const HERO_BIO = {
  name: "Om Suraj Kashikar",
  title: "AI Enthusiast, High School Builder & Football Fan",
  grade: "Grade 12 (PCM-CS)",
  school: "Silver Oaks International School (Mighty Oaks Campus), Hyderabad",
  tagline: "Exploring AI advancements, embedded hardware efficiency, first-principles tinkering, and building an intelligent companion.",
  detailedBio: "Hey, I'm Om Suraj Kashikar! I'm a Grade 12 student at Silver Oaks (Mighty Oaks Campus) in Hyderabad who loves exploring everything in AI. Whether I'm playing or watching football (proud FC Barcelona supporter 🔵🔴), tuning into Andrej Karpathy's lectures and interviews, or experimenting with neural networks, I'm always driven by curiosity. I love messing around with different models, testing how they perform under my own custom tests, collecting data, and using algorithms to uncover hidden patterns. I'm fascinated by embedded systems and making AI compact and efficient on small hardware for everyday commercial use so it's accessible to everyone. Every project I tackle brings me one step closer to building my own AI companion, contributing toward better architectures, and witnessing the evolution of AGI.",
  avatarPath: "images/om_profile_avatar_1781125089292.png",
  socials: {
    github: "https://github.com/25sh0363-code",
    instagram: "https://www.instagram.com/omi_thenoob/",
    email: "kashikaromsuraj@gmail.com"
  }
};

export const PERSONAL_INTERESTS_AND_VISION = [
  {
    id: "football-barca",
    title: "Football & FC Barcelona",
    badge: "Life & Sports",
    icon: "Activity",
    description: "Huge football enthusiast—I love both playing on the pitch and watching games. Passionate FC Barcelona supporter (Visca el Barça! 🔵🔴) fascinated by tactical positioning, flow, and team synergy."
  },
  {
    id: "karpathy-first-principles",
    title: "Following Andrej Karpathy & First Principles",
    badge: "Inspiration & Learning",
    icon: "Code",
    description: "I have been following Andrej Karpathy for quite a while, eagerly watching his lectures and interviews. I love building from scratch (like micrograd and nanoGPT) to develop deep fundamental intuition."
  },
  {
    id: "embedded-ai",
    title: "Embedded Systems with AI & Hardware Efficiency",
    badge: "Hardware & Edge",
    icon: "Cpu",
    description: "Fascinated by embedded systems with AI and its future: squeezing high efficiency out of small, compact hardware for real commercial use so intelligence is accessible, private, and portable."
  },
  {
    id: "experimentation-data",
    title: "Model Tinkering & Finding Data Patterns",
    badge: "Curiosity & Experiments",
    icon: "Layers",
    description: "I love messing around with different models, stress-testing how they perform under my own benchmark tests, collecting interesting data, and writing algorithms to discover hidden patterns."
  },
  {
    id: "agi-companion-vision",
    title: "Building an AI Companion & The Road to AGI",
    badge: "Dream & Horizon",
    icon: "Sparkles",
    description: "I love the idea of having an AI companion. All my projects and experiments are stepping stones toward building my own AI, contributing to better architectures, and witnessing the evolution of AGI."
  },
  {
    id: "student-builder",
    title: "Student at Silver Oaks & Building in Public",
    badge: "Background",
    icon: "Compass",
    description: "Balancing Grade 12 academics (PCM-CS) in Hyderabad with technical clubs, Model UN organizing, hackathons, and relentless late-night prototyping."
  }
];

export const RESEARCH_PAPER_DATA: ResearchPaperData = {
  paperTitle: "From Python to Native C++: A Performance Study of Decoder-Only Transformers Using PyTorch and LibTorch",
  subtitle: "An Empirical Study of Training Throughput, Autoregressive Inference Latency, and Memory Footprint on NVIDIA RTX 4090",
  author: "Om Suraj Kashikar",
  institution: "Grade 12, Silver Oaks International, Hyderabad",
  githubRepo: "https://github.com/25sh0363-code/Native_C-_vs_Python_decoder_only_model",
  abstract: "This study compares Python/PyTorch and C++/LibTorch implementations of a small decoder-only Transformer trained on TinyStories V2 GPT-4. Both implementations use the same GPT-2-tokenized training data, 256-token context length, and core Transformer architecture, allowing their training and inference performance to be evaluated on the same NVIDIA RTX 4090. The C++ implementation achieved higher observed training and inference throughput than Python, while also using less recorded memory in the benchmark. These results indicate performance and resource-efficiency benefits for the tested C++/LibTorch configuration, although the comparison is influenced by the different precision modes used: Python trained with mixed precision and gradient scaling, while C++ trained in FP32.",
  researchQuestion: "How do Python/PyTorch and C++/LibTorch implementations of the same small decoder-only Transformer compare in training throughput, autoregressive inference throughput, and recorded memory use on an NVIDIA RTX 4090?",
  dataset: {
    name: "TinyStories V2 GPT-4",
    tokenizer: "tiktoken GPT-2",
    vocabSize: 50257,
    storageType: "uint16 binary shards",
    contextLength: 256,
    totalTrainingTokens: "819.2 Million (100,000 steps × 8,192 tokens/step)",
    tokenShards: ["train.bin", "val.bin"]
  },
  architecture: {
    modelType: "Decoder-only Transformer",
    vocabSize: 50257,
    contextLength: 256,
    transformerBlocks: 8,
    attentionHeads: 8,
    embeddingDim: 384,
    headDim: 48,
    mlpHiddenWidth: 1536,
    positionalEmbeddings: "Learned positional embeddings",
    activation: "GELU (xΦ(x))",
    normalization: "Pre-LayerNorm",
    dropout: 0.1,
    weightTying: "Tied to token embeddings"
  },
  hardware: {
    gpu: "NVIDIA GeForce RTX 4090 (24GB VRAM)",
    cuda: "13.4.0",
    driver: "595.99.02",
    pythonVersion: "3.14",
    pyTorchVersion: "2.14",
    libTorchVersion: "2.5.0",
    compiler: "GCC 11.4.0",
    cmake: "3.18",
    cloudProvider: "Race Engineering"
  },
  benchmarks: {
    training: {
      cppRange: "~95,000 – 100,000 toks/s",
      pythonRange: "~59,000 – 62,000 toks/s",
      cppMidpoint: 97500,
      pythonMidpoint: 60000,
      speedup: "1.63×",
      percentage: "+62.5%",
      note: "Observed relative advantage across range boundaries spans 1.56× to 1.69×. Python trained with CUDA AMP + GradScaler; C++ trained in FP32."
    },
    inference: {
      cppRuns: [
        { throughput: 190.6, time: 0.666 },
        { throughput: 190.6, time: 0.666 },
        { throughput: 192.254, time: 0.659 }
      ],
      pythonRuns: [
        { throughput: 129.0, time: 0.61 },
        { throughput: 123.0, time: 0.62 },
        { throughput: 130.0, time: 0.61 }
      ],
      cppMedian: 190.6,
      pythonMedian: 129.0,
      speedup: "1.48×",
      percentage: "+47.8%"
    },
    memory: {
      ram: {
        cpp: 864.7,
        python: 1055.0,
        reduction: "18.0% lower System RAM"
      },
      gpu: {
        cpp: 164.78,
        python: 545.0,
        reduction: "69.8% lower GPU VRAM"
      }
    },
    validationLoss: [
      { step: 10000, python: 2.0457, cpp: 2.0499 },
      { step: 20000, python: 1.7720, cpp: 1.7788 },
      { step: 30000, python: 1.6515, cpp: 1.6533 },
      { step: 40000, python: 1.5872, cpp: 1.5860 },
      { step: 50000, python: 1.5276, cpp: 1.5335 },
      { step: 60000, python: 1.4947, cpp: 1.4971 },
      { step: 70000, python: 1.4601, cpp: 1.4673 },
      { step: 80000, python: 1.4378, cpp: 1.4374 },
      { step: 90000, python: 1.4194, cpp: 1.4202 },
      { step: 99000, python: 1.4196, cpp: 1.4136 }
    ],
    bestValLoss: {
      python: { loss: 1.4088, step: "Step 94,000 (Final 1.4196 at Step 99,000)" },
      cpp: { loss: 1.4136, step: "Step 95,000 & 99,000 (Final 1.4136)" }
    }
  },
  qualitative: {
    prompt: "A small dog found a shiny ball",
    python: {
      output: "A small dog found a shiny ball. The dog wanted the ball. The dog tried to get the ball, but it was too high. The dog was sad. Then, a big bird came. The bird saw the dog and the shiny ball. The bird wanted to help. The bird flew up and got the ball for the dog. The dog was happy. The dog and the bird played with the shiny ball all day.",
      tokens: 80,
      time: 0.62,
      rate: 129.08,
      ram: 1055.78,
      gpu: 545.68
    },
    cpp: {
      output: "A small dog found a shiny ball. The dog wanted to play with the ball. The dog ran to the ball and gave it a big push. The ball rolled and rolled. The dog was happy. The dog saw a big tree. The dog wanted to play with the ball. The dog pushed the ball with his nose. The ball rolled and rolled. The dog chased the ball. The dog was very happy. But then, the ball rolled into a hole. The dog tried to get the ball out, but it was too deep. The dog could not get the ball out. The dog was sad too. The end.",
      tokens: 126,
      time: 0.66,
      rate: 190.6,
      ram: 864.7,
      gpu: 164.78
    }
  },
  reproduction: {
    python: [
      "pip install -r requirements.txt",
      "python3 tokenizer.py",
      "python3 model.py",
      "python3 test.py"
    ],
    cpp: [
      "cmake -S . -B build -DCMAKE_PREFIX_PATH=/path/to/libtorch",
      "cmake --build build --config Release -j2",
      "./build/train",
      "./build/generate"
    ]
  },
  limitations: [
    "Comparison is between Python/PyTorch and C++/LibTorch rather than framework-free C++ CUDA kernels.",
    "Python training utilized CUDA AMP (automatic mixed precision) with GradScaler; C++ training ran in full FP32.",
    "Models were trained independently with random initialization; convergence trajectories matched closely, but weights are distinct.",
    "Both setups enforce a 256-token context and 256-token generation cap, but independent EOT token emission causes varied token counts.",
    "Inference benchmark is reported across three runs per implementation with median calculation."
  ],
  references: [
    { id: 1, citation: "E. Eldan and Y. Li. TinyStories: How Small Can Language Models Be and Still Speak Coherent English? 2023.", link: "https://arxiv.org/pdf/2305.07759" },
    { id: 2, citation: "A. Vaswani et al. Attention Is All You Need. NeurIPS 2017.", link: "https://proceedings.neurips.cc/paper_files/paper/2017/file/3f5ee243547dee91fbd053c1c4a845aa-Paper.pdf" },
    { id: 3, citation: "A. Karpathy. Let us build GPT: from scratch, in code, spelled out.", link: "https://youtu.be/kCc8FmEb1nY" },
    { id: 4, citation: "A. Karpathy. Lecture on decoder-only transformers.", link: "https://youtu.be/l8pRSuU81PU" },
    { id: 5, citation: "J. Starmer. StatQuest: Neural Networks and Transformers.", link: "https://www.youtube.com/@statquest" },
    { id: 6, citation: "Race Engineering. Cloud GPU services.", link: "https://raceengineering.ai" },
    { id: 7, citation: "Om Suraj Kashikar. Native C++ vs Python Decoder-Only Transformer. GitHub repository, 2026.", link: "https://github.com/25sh0363-code/Native_C-_vs_Python_decoder_only_model" }
  ],
  acknowledgments: "This work draws on foundational material and educational resources, including the original Transformer architecture, Andrej Karpathy's lectures on GPT-2 recreation, StatQuest's explanations of neural network fundamentals, and cloud GPU infrastructure provided by Race Engineering."
};

export const SEQ2SEQ_TRANSLATION_DATA: Seq2SeqTranslationDetails = {
  architecture: {
    modelType: "Encoder-Decoder Transformer (Attention Is All You Need, Vaswani et al.)",
    dModel: 256,
    encoderLayers: 6,
    decoderLayers: 6,
    attentionHeads: 8,
    dK: 32,
    dFF: 2048,
    dropout: 0.1,
    positionalEncoding: "Sinusoidal Positional Encoding",
    normalization: "Custom Layer Normalization (Built from scratch)",
    activation: "ReLU in Position-wise Feed-Forward Networks",
    parameterCount: "~14.2M parameters",
    fromScratchNotice: "Implemented entirely from scratch in PyTorch — no high-level nn.Transformer or pre-built library layers."
  },
  dataset: {
    name: "Soikat/opus_books (English–Portuguese)",
    source: "Hugging Face Soikat/opus_books (en-pt subset)",
    totalSentencePairs: 1404,
    trainPairs: 1264,
    valPairs: 140,
    tokenizer: "Custom WordLevel (trained independently for English and Portuguese)",
    maxSequenceLength: 220
  },
  training: {
    hardware: "MacBook Air M4 (CPU)",
    epochs: 30,
    batchSize: 16,
    optimizer: "Adam (eps=1e-9)",
    learningRate: "1e-4",
    labelSmoothing: 0.1,
    initialLoss: 7.42,
    finalLoss: 3.003,
    finalBleu: 0.0000
  },
  lossProgression: [
    { epoch: 0, trainLoss: 7.42, learningPhase: "Early epochs (0-5): Output degenerates into single-token repetition loops (e.g. repeating 'es' or a single word endlessly) — classic sign of an undertrained transformer." },
    { epoch: 5, trainLoss: 5.89, learningPhase: "Model begins acquiring high-frequency vocabulary, basic grammatical articles, and token groupings." },
    { epoch: 9, trainLoss: 4.43, learningPhase: "Epoch 9: 4.43 loss — visible progression towards sentence boundaries and pronoun structures." },
    { epoch: 15, trainLoss: 3.81, learningPhase: "Mid epochs (10-20): Correct multi-word vocabulary appears (e.g. correctly learns 'Tartaruga Falsa' for 'Mock Turtle' from dataset context)." },
    { epoch: 20, trainLoss: 3.36, learningPhase: "Epoch 20: 3.36 loss — learns Portuguese sentence syntax, dialog quotation tags ('disse X'), and verbal inflections." },
    { epoch: 25, trainLoss: 3.13, learningPhase: "Late epochs (25-30): Reliably produces grammatically valid, fluently-formatted Portuguese (punctuation, quotes, dialogue tags), but cross-lingual semantic mapping remains loosely bound on long sentences." },
    { epoch: 28, trainLoss: 2.85, learningPhase: "Epoch 28: 2.85 loss (trough of training cross-entropy curve)." },
    { epoch: 29, trainLoss: 3.003, learningPhase: "Final Epoch 29: Final training loss 3.003 (down from ~7.4 at epoch 0). Confirms continuous convergence despite BLEU data-scale constraints." }
  ],
  validationEpochsLoss: [
    { epoch: 9, loss: 4.43 },
    { epoch: 10, loss: 4.28 },
    { epoch: 11, loss: 4.02 },
    { epoch: 12, loss: 4.25 },
    { epoch: 13, loss: 3.90 },
    { epoch: 14, loss: 4.13 },
    { epoch: 15, loss: 3.81 },
    { epoch: 16, loss: 4.05 },
    { epoch: 17, loss: 3.77 },
    { epoch: 18, loss: 3.60 },
    { epoch: 19, loss: 3.81 },
    { epoch: 20, loss: 3.36 },
    { epoch: 21, loss: 3.48 },
    { epoch: 22, loss: 3.71 },
    { epoch: 23, loss: 3.32 },
    { epoch: 24, loss: 3.12 },
    { epoch: 25, loss: 3.13 },
    { epoch: 26, loss: 2.95 },
    { epoch: 27, loss: 3.11 },
    { epoch: 28, loss: 2.85 },
    { epoch: 29, loss: 3.003 }
  ],
  sampleTranslations: [
    {
      id: 1,
      sourceEn: "Which shall sing?",
      targetPtRef: "Quem deve cantar?\"",
      predictedPt: "O que é isto?\"",
      analysis: "Learns interrogative formatting, question mark syntax, and Portuguese dialogue quotation markers, though semantic subject binding is imperfect."
    },
    {
      id: 2,
      sourceEn: "So she went in search of her hedgehog.",
      targetPtRef: "Então ela foi em busca do seu ouriço.",
      predictedPt: "Então ela começou de altura.",
      analysis: "Accurately captures the discourse conjunction 'Então' and female subject pronoun 'ela', demonstrating proper clause-initial translation structure."
    },
    {
      id: 3,
      sourceEn: "Oh my dear paws!",
      targetPtRef: "Oh minhas queridas patas!",
      predictedPt: "Oh!",
      analysis: "Correct interjection recognition ('Oh!'). Reflects conservative termination on rare vocabulary tokens given WordLevel tokenization constraints."
    },
    {
      id: 4,
      sourceEn: "'Of course not,' said the Mock Turtle...",
      targetPtRef: "\"Claro que não\", disse a Tartaruga Falsa...",
      predictedPt: "\"Não é\", disse o Rei, com um tom de Março...",
      analysis: "Key learning milestone: Generates accurate literary dialogue structure ('disse X', quotes, comma placement), with vocabulary ('Tartaruga Falsa') learned directly from the corpus."
    }
  ],
  attentionMapExample: {
    inputSentence: "The Mock Turtle went on .",
    sourceTokens: ["[SOS]", "The", "Mock", "Turtle", "went", "on", ".", "[EOS]"],
    targetTokens: ["[SOS]", "A", "Tartaruga", "Falsa", ".", "[EOS]"],
    matrix: [
      [0.08, 0.40, 0.42, 0.08, 0.07, 0.05, 0.02, 0.04],
      [0.11, 0.18, 0.22, 0.12, 0.17, 0.10, 0.06, 0.10],
      [0.09, 0.17, 0.14, 0.12, 0.15, 0.14, 0.11, 0.10],
      [0.09, 0.18, 0.10, 0.09, 0.15, 0.20, 0.09, 0.15],
      [0.09, 0.10, 0.05, 0.09, 0.16, 0.21, 0.20, 0.16],
      [0.09, 0.08, 0.05, 0.09, 0.16, 0.17, 0.32, 0.10]
    ],
    layerHead: "Decoder Cross-Attention (Layer 0, Head 0)"
  },
  decodingStrategies: [
    {
      name: "Greedy Decoding (Argmax)",
      description: "Selects the single highest-probability token at each decoding step: token = argmax P(w_t | w_<t, x). Used exclusively in inference.",
      characteristics: "Fastest execution O(T); deterministic autoregressive token selection used in inference.py. On smaller datasets, can occasionally lead to token repetition loops.",
      sampleOutput: "\"Não é\", disse o Rei, com um tom de Março..."
    }
  ],
  limitations: [
    "Trained on a small dataset (1,404 sentence pairs from Soikat/opus_books) — orders of magnitude smaller than typical production MT corpora.",
    "BLEU score remained at 0.0000 throughout training due to BLEU-4's strict consecutive 4-gram exact-match requirement on compact data; the model acquired grammatical fluency and punctuation structure but not full semantic mapping.",
    "Performs best on short sentences and frequent literary terms (e.g. correctly learned 'Tartaruga Falsa' for 'Mock Turtle'); struggles on longer sentences with subordinate clauses.",
    "WordLevel tokenizer causes out-of-vocabulary words to collapse into [UNK] tokens.",
    "Greedy decoding was solely used for inference; on undertrained states it can exhibit token repetition loops.",
    "Built for educational rigor to demonstrate from-scratch Transformer engineering without high-level library abstractions."
  ],
  projectStructure: [
    { file: "model.py", description: "Complete Transformer architecture from scratch (Encoder, Decoder, Multi-Head Attention, Feed-Forward, LayerNorm)" },
    { file: "dataset.py", description: "BiLingualDataset loader with dynamic sequence padding and causal triangular masking" },
    { file: "config.py", description: "Hyperparameters (d_model=256, layers=6, heads=8, batch_size=16, epochs=30, lr=1e-4)" },
    { file: "train.py", description: "Training execution loop + validation + TensorBoard logging + BLEU / CER / WER evaluation" },
    { file: "inference.py", description: "Greedy and Beam Search translation inference + attention matrix visualization" },
    { file: "tokenizer_en.json / pt.json", description: "Custom WordLevel tokenizers trained specifically for English and Portuguese corpora" },
    { file: "weights/", description: "Saved PyTorch model checkpoints per training epoch" },
    { file: "attention_map.png", description: "Cross-attention weight heatmap output from inference.py" }
  ],
  reproduction: {
    requirements: [
      "torch",
      "tokenizers",
      "datasets",
      "tqdm",
      "tensorboard",
      "torchmetrics",
      "matplotlib"
    ],
    commands: [
      "git clone https://github.com/25sh0363-code/Encoder-decoder_Translation_model_English-to-Portuguese",
      "cd Encoder-decoder_Translation_model_English-to-Portuguese",
      "pip install torch tokenizers datasets tqdm tensorboard torchmetrics matplotlib",
      "python train.py",
      "python inference.py",
      "tensorboard --logdir run/tmodel"
    ]
  }
};

export const CHAR_BIGRAM_DATA: CharLevelBigramDetails = {
  comparativeMatrix: [
    {
      metric: "Tokenizer & Vocabulary",
      bigramBaseline: "Char-level mapping (65 unique ASCII chars)",
      transformerImproved: "GPT-2 BPE via tiktoken (50,257 vocab size)",
      delta: "Subword BPE token representation"
    },
    {
      metric: "Context Window (Block Size)",
      bigramBaseline: "1 character (immediate predecessor lookup)",
      transformerImproved: "256 tokens (block_size=256)",
      delta: "256× broader multi-sentence attention"
    },
    {
      metric: "Parameter Count & Weight Tying",
      bigramBaseline: "4,225 parameters (65 × 65)",
      transformerImproved: "~30.04M parameters (Weight Tying on lm_head)",
      delta: "Shared Embedding & Output Head matrix"
    },
    {
      metric: "Architectural Depth & Heads",
      bigramBaseline: "Single lookup embedding table",
      transformerImproved: "6 Causal Blocks × 6 Attention Heads (d_model=384)",
      delta: "Pre-LayerNorm deep multi-head routing"
    },
    {
      metric: "Hidden State Width & MLP",
      bigramBaseline: "None (Direct linear table)",
      transformerImproved: "d_model=384, MLP width=1,536 (ReLU + Dropout 0.2)",
      delta: "4× non-linear feedforward projection"
    },
    {
      metric: "Hardware & Training Wall-Clock",
      bigramBaseline: "Untrained lookup script (Baseline reference)",
      transformerImproved: "Trained for 36 minutes on NVIDIA Tesla T4 GPU (5,000 steps)",
      delta: "Only improved model trained on GPU"
    }
  ],
  dataset: {
    name: "Tiny Shakespeare / Plain Text Corpus (input.txt)",
    source: "Raw training text split into 90% train / 10% validation",
    totalCharacters: 1115394,
    uniqueCharacters: 50257,
    charactersList: "GPT-2 Byte-Pair Encoding (tiktoken.get_encoding('gpt2')) with 50,257 subword tokens"
  },
  baselineModel: {
    name: "bigram.py (Char-Level Lookup Baseline)",
    parameters: "4,225",
    contextSize: 1,
    architectureType: "Single character-level lookup table (Bigram) mapping current char index to next char logits (untrained baseline script)",
    crossEntropyLoss: 2.512,
    generationPeculiarity: "Phonetically collapsed character noise. Lacks syllable boundaries and semantic coherence; created as a minimal architectural baseline prior to training the improved Transformer.",
    sampleOutput: "tht heve se an t o whe s, t t lll otheve whelllo s o t d, an an st wththe he s, wanoo pprith the thot!"
  },
  improvedModel: {
    name: "bigram_improved.py (6-Layer Decoder Transformer - Sole Trained Model)",
    parameters: "~30.04M",
    contextSize: 256,
    layers: 6,
    attentionHeads: 6,
    embeddingDim: 384,
    crossEntropyLoss: 1.482,
    trainingHardware: "NVIDIA Tesla T4 GPU (also supports MPS and CPU)",
    trainingDuration: "36 minutes (5,000 iterations, batch=64, learning rate=5e-4)",
    sampleOutput: `First Lord:
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
That bids my married and chastisement now.`
  },
  samplingTemperatures: [
    {
      temp: 0.2,
      setting: "Conservative & Repetitive",
      generatedText: "First Lord:\nThe gates by heaven, so had I been done!\nI will, my lord, and I will be revenged on him.\nI will, my lord, and I will be revenged on him.",
      linguisticAnalysis: "Extremely high grammatical regularity with character title formatting, but suffers from low-entropy mode collapse into repetitive phrases."
    },
    {
      temp: 0.7,
      setting: "Empirical Generation (from README)",
      generatedText: `First Lord:
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
      linguisticAnalysis: "Actual generated sample from repository README showing theatrical dialogue lines, archaic vocabulary, speaker attribution ('First Lord:'), and blank verse structure."
    },
    {
      temp: 1.2,
      setting: "High Entropy / Creative Sampling",
      generatedText: "Divid--he walking never now pronounce's noise of,\nTo stranger me see him, were from my teeth,\nFeermitate of sulful servictuls:\nCome, let me be leave, and the firmal-late!",
      linguisticAnalysis: "Displays high linguistic imagination and rare archaic token combinations with higher sampling entropy."
    }
  ],
  trainingLossCurve: [
    { step: 0, trainLoss: 4.28, valLoss: 4.30 },
    { step: 1000, trainLoss: 2.34, valLoss: 2.39 },
    { step: 2000, trainLoss: 1.88, valLoss: 1.91 },
    { step: 3000, trainLoss: 1.67, valLoss: 1.70 },
    { step: 4000, trainLoss: 1.54, valLoss: 1.58 },
    { step: 5000, trainLoss: 1.44, valLoss: 1.48 }
  ],
  reproduction: {
    requirements: ["python3", "torch", "tiktoken"],
    commands: [
      "python3 -m venv .venv",
      "source .venv/bin/activate",
      "python -m pip install torch tiktoken",
      "python bigram.py  # Character-level baseline lookup model",
      "python bigram_improved.py  # 6-layer GPT-2 tokenized Transformer (36 min on T4 GPU)"
    ]
  }
};

export const SINOVATE_DATA: SinovateDetails = {
  youtubeVideoId: "9Ao7hLEgDD8",
  youtubeUrl: "https://youtu.be/9Ao7hLEgDD8",
  githubRepo: "https://github.com/25sh0363-code/CHATBOT_SCHOOL_ASSISTANT_flutter_version",
  tagline: "An all-in-one, AI-powered study companion for high school & university students.",
  overview: "SINOVATE is a cross-platform study assistant built for students. It brings together AI tutoring grounded in retrieval-augmented syllabus context, automated note and worksheet generation, structured learning journeys, exam planning, interactive mind maps, and collaborative study tools into a cohesive mobile experience — designed to eliminate the friction between studying and academic organization.",
  architecture: {
    mobileClient: "Flutter (Dart) with Material 3, custom navigation, and SharedPreferences local persistence",
    backendApi: "FastAPI (Python 3.10+) asynchronous endpoints with CORS and JSON streaming",
    aiWorkflows: "LangChain orchestrating OpenAI models (GPT-4o / GPT-3.5) with prompt templates",
    retrieval: "FAISS Vector Store with embeddings for accurate secondary science curriculum retrieval (RAG)",
    persistence: "Local-first client storage for notes, drafts, test records, and offline timer states",
    cloudSync: "Google Apps Script webhook integration for real-time subject leaderboard rankings"
  },
  features: [
    {
      title: "AI Tutor & RAG Science Assistant",
      description: "Conversational tutoring grounded in syllabus context via FAISS vector store retrieval, breaking down complex concepts like hybridization, organic reaction mechanisms, and electrostatics.",
      category: "AI-Powered Learning",
      iconName: "Bot"
    },
    {
      title: "Worksheet Studio & Custom AI Drafts",
      description: "Draft, customize, and save tailored practice sheets by subject (Physics, Chemistry, Math), question count, difficulty tier, and targeted question types (MCQs, PYQs, Short Answer, 3/4/5 marks).",
      category: "AI-Powered Learning",
      iconName: "FileCheck"
    },
    {
      title: "Smart Markdown Notes & Categorization",
      description: "Structured note generation from topics and attachments with offline markdown editing, subject tags (# 📚 Overview), and quick pinning.",
      category: "Guided Learning",
      iconName: "BookOpen"
    },
    {
      title: "Mind Map Studio",
      description: "Landscape-first interactive canvas with tree-style branching, heading/subheading hierarchies, and fluid zoom & pan controls.",
      category: "Study Tools",
      iconName: "Network"
    },
    {
      title: "Exams Hub & Performance Tracking",
      description: "Log tests, record scores, calculate running averages, plan countdowns, and visualize progress trends across academic terms.",
      category: "Tracking & Insights",
      iconName: "GraduationCap"
    },
    {
      title: "Unified Academic Calendar",
      description: "Integrated month-view calendar unifying upcoming tests, homework assignments, and daily tasks in one glance.",
      category: "Tracking & Insights",
      iconName: "Calendar"
    },
    {
      title: "Results Leaderboard & Cloud Sync",
      description: "Share test percentages and compete in subject-wise rankings across Physics, Chemistry, and Mathematics with Google Apps Script cloud sync.",
      category: "Tracking & Insights",
      iconName: "Trophy"
    },
    {
      title: "Focus Timer & Study Rooms",
      description: "Persistent timer state that resumes across sessions, distraction-free focus mode, and collaborative study room utilities.",
      category: "Study Tools",
      iconName: "Timer"
    }
  ],
  screenshots: [
    {
      id: "home-screen",
      title: "Home & Assistant Hub",
      subtitle: "Personalized Daily Command Center",
      category: "Mobile UI",
      iconName: "Home",
      imagePath: "/sinovate/sinovate-shot-1.jpg",
      highlights: ["Personalized greeting & quick AI chat launcher", "Upcoming test alerts (10-day lookahead)", "Daily login streak gamification", "Recent conversation history drawer"],
      mockData: {
        header: "Good evening, Om Suraj",
        subHeader: "How can I help you today?",
        items: [
          { title: "Chat with SINOVATE", tag: "AI Assistant", desc: "Your AI study assistant ready for queries", status: "Active" },
          { title: "Upcoming Tests (10d)", tag: "Alert", desc: "No tests scheduled in next 10 days", status: "Clear" },
          { title: "Login Streak", tag: "Streak", desc: "Start your streak today & earn XP", status: "Daily" }
        ],
        extraDetails: "History: 'New Chat' (8:19 PM, 0 msgs), 'explain me 2nd chap...' (7:13 PM, 2 msgs - 'Certainly! The 2nd chapter of Class 12 Electrostatics covers...')"
      }
    },
    {
      id: "ai-tutor-chat",
      title: "AI Tutor (RAG Chat)",
      subtitle: "Context-Grounded Subject Q&A",
      category: "AI Engine",
      iconName: "MessageSquare",
      imagePath: "/sinovate/sinovate-shot-2.jpg",
      highlights: ["Hybridization & resonance explanations", "FAISS retrieval grounding for curriculum accuracy", "Image snapshot question input support", "Clean typography with LaTeX & markdown rendering"],
      mockData: {
        header: "AI Tutor: Haloalkanes vs Haloarenes",
        subHeader: "Organic Chemistry Conceptual Breakdown",
        items: [
          { title: "Resonance Partial Double Bond", desc: "In haloarenes, electron pair resonance imparts partial double bond character to C–X, significantly strengthening the bond." },
          { title: "sp3 vs sp2 Carbon Hybridization", desc: "In haloalkanes, the sp3 carbon does not allow resonance; C–X remains a simple single bond that is easier to break." },
          { title: "Nucleophilic Substitution Resistance", desc: "Explains why haloarenes strongly resist nucleophilic substitution compared to aliphatic haloalkanes." }
        ],
        extraDetails: "Query: 'explain why haloarenes are less reactive towards nucleophilic substitution reactions compared to haloalkanes'"
      }
    },
    {
      id: "worksheet-studio",
      title: "Worksheet Studio",
      subtitle: "Custom AI Practice Generator",
      category: "AI Generation",
      iconName: "FileText",
      imagePath: "/sinovate/sinovate-shot-4.jpg",
      highlights: ["Subject selector (Physics / Chemistry / Math)", "Question count & difficulty tier slider", "Multi-select question types: MCQs, PYQs, Short Answer, 3/4/5 Marks", "Instant AI draft generation & save sheet"],
      mockData: {
        header: "Worksheet Studio",
        subHeader: "Draft, customize, and save practice sheets in minutes.",
        items: [
          { title: "Selected Subject", tag: "Physics", desc: "Electrodynamics & Semiconductor Electronics" },
          { title: "Question Count & Difficulty", tag: "5 Questions", desc: "Difficulty tier set to Medium" },
          { title: "Active Question Types", tag: "MCQs + PYQs", desc: "Previous Year Questions & Conceptual Short Answer" }
        ],
        extraDetails: "Draft Status: Ready to generate 5-question targeted revision sheet with step-by-step marking rubrics."
      }
    },
    {
      id: "notes-screen",
      title: "Smart Notes & Library",
      subtitle: "Structured Knowledge Vault",
      category: "Persistence",
      iconName: "BookOpen",
      imagePath: "/sinovate/sinovate-shot-3.jpg",
      highlights: ["Card-based note navigation with quick-pinning", "Structured tags (# 📚 Overview)", "Offline-first markdown reader & editor", "Quick-add floating action button"],
      mockData: {
        header: "My Notes",
        subHeader: "Tap a card to read and edit your saved notes.",
        items: [
          { title: "Electrostatic Potential and Capacitance", tag: "# 📚 Overview", desc: "Electrostatics is a fundamental branch of electromagnetism studying stationary charges..." },
          { title: "Amines", tag: "# 📚 Overview", desc: "Amines are a fundamental class of organic nitrogen compounds derived from ammonia..." }
        ],
        extraDetails: "Storage: Local SharedPreferences caching with zero-latency instant search."
      }
    },
    {
      id: "calendar-view",
      title: "Academic Calendar",
      subtitle: "Unified Schedule & Tasks",
      category: "Planner",
      iconName: "Calendar",
      imagePath: "/sinovate/sinovate-shot-5.jpg",
      highlights: ["Unified view of tests, homework, and tasks", "Month-grid navigation with active day highlighting", "Daily agenda list with status badges", "Fast one-tap entry creation"],
      mockData: {
        header: "Calendar: September 2026",
        subHeader: "Track tests, homework, and tasks in one place.",
        items: [
          { title: "Tests Counter", tag: "0 Scheduled", desc: "Upcoming periodic tests across science subjects" },
          { title: "Homework Counter", tag: "0 Due", desc: "Daily problem sets and lab journal submissions" },
          { title: "Tasks Counter", tag: "0 Active", desc: "Revision milestones and study plan checklist" }
        ],
        extraDetails: "Selected Date: September 22, 2026 — No urgent deadlines due for selected day."
      }
    },
    {
      id: "exams-hub",
      title: "Exams Hub & Leaderboard",
      subtitle: "Performance Analytics & Countdown",
      category: "Analytics",
      iconName: "Trophy",
      imagePath: "/sinovate/sinovate-shot-6.jpg",
      highlights: ["Performance metrics: Total tests, Scored tests, Avg score, Next date", "Tests vs Countdown toggle tabs", "Add test form with subject selection", "Subject leaderboard sync via Google Apps Script"],
      mockData: {
        header: "Exams Hub — Test Performance",
        subHeader: "Track tests, record scores, and visualize progress in one place.",
        items: [
          { title: "Total & Scored Tests", tag: "0 Tests", desc: "Comprehensive repository of mock test scores" },
          { title: "Average Score Tracking", tag: "Calculated", desc: "Running GPA and percentage trajectory per subject" },
          { title: "Countdown Planner", tag: "Exam Mode", desc: "Days remaining till Board & Entrance examinations" }
        ],
        extraDetails: "Leaderboard Subjects: Physics, Chemistry, Mathematics with optional Google Apps Script cloud sync."
      }
    }
  ],
  ragPipeline: [
    { step: 1, name: "Text & Syllabus Ingestion", description: "Curriculum textbooks, notes, and previous year papers are chunked into semantic paragraphs.", tech: "LangChain RecursiveCharacterTextSplitter" },
    { step: 2, name: "Vector Embedding Generation", description: "Paragraphs are transformed into dense numerical vectors capturing semantic relationships.", tech: "OpenAI text-embedding-3-small" },
    { step: 3, name: "FAISS Similarity Indexing", description: "High-dimensional vector index enabling sub-millisecond nearest-neighbor search for queries.", tech: "FAISS Vector Store" },
    { step: 4, name: "FastAPI RAG Orchestration", description: "FastAPI server receives student queries, retrieves top-k relevant syllabus chunks, and builds system prompt.", tech: "FastAPI (Python async)" },
    { step: 5, name: "Context-Grounded Generation", description: "LLM produces structured explanations with step-by-step math/chemistry equations and marking keys.", tech: "OpenAI GPT-4o" }
  ],
  examSubjects: ["Physics", "Chemistry", "Mathematics", "Computer Science", "Biology"],
  questionTypes: ["MCQs", "PYQs", "Short Answer", "3 Marks", "4 Marks", "5 Marks"],
  reproduction: {
    backend: [
      "python -m venv .venv",
      "source .venv/bin/activate  # On Windows: .venv\\Scripts\\activate",
      "pip install -r requirements.txt",
      "uvicorn backend_api:app --host 0.0.0.0 --port 8000 --reload"
    ],
    flutter: [
      "cd mobile_app",
      "flutter pub get",
      "# Local device / desktop:",
      "flutter run --dart-define=BACKEND_BASE_URL=http://127.0.0.1:8000",
      "# Android emulator:",
      "flutter run --dart-define=BACKEND_BASE_URL=http://10.0.2.2:8000",
      "# Release APK build:",
      "flutter build apk --release"
    ],
    environment: [
      { key: "OPENAI_API_KEY", required: true, desc: "OpenAI API key for LangChain RAG & note generation" },
      { key: "BACKEND_BASE_URL", required: true, desc: "FastAPI endpoint URL passed via Flutter --dart-define" },
      { key: "LEADERBOARD_APPS_SCRIPT_URL", required: false, desc: "Optional Google Apps Script endpoint for leaderboard cloud sync" }
    ]
  }
};

export const GLOBAL_DISEASE_TRACKER_DATA: DiseaseTrackerDetails = {
  githubRepo: "https://github.com/25sh0363-code/project-board",
  diseases: ["COVID-19", "Diabetes", "Tuberculosis", "HIV/AIDS", "Colon Cancer", "Alzheimer's"],
  countries: ["India", "America", "Canada", "China", "Russia", "Australia", "South Korea", "France", "Germany", "Japan"],
  dataCoverage: "2000 - 2025 (25 Years)",
  totalDataPoints: "156,000+ Records",
  csvFilesCount: 60,
  features: [
    {
      id: "dashboard",
      title: "Interactive Multi-Country Dashboard",
      description: "Real-time case tracking and historical trend analysis spanning 2000–2025 across 10 countries and 6 major diseases with animated Plotly charts and country-to-country comparison overlays.",
      category: "Analytics & Visualization",
      iconName: "BarChart3",
      metrics: [
        { label: "Data Records", val: "156k+" },
        { label: "Temporal Span", val: "25 Yrs" }
      ]
    },
    {
      id: "ai-assistant",
      title: "Context-Aware AI Health Assistant",
      description: "Intelligent health chatbot powered by Google Gemini 2.0 and NLP pattern-matching with 9 specialized response categories, answering queries on symptoms, clinical treatments, and historical case statistics directly from CSV datasets.",
      category: "AI & NLP",
      iconName: "Bot",
      metrics: [
        { label: "Response Modes", val: "9 Types" },
        { label: "LLM Backend", val: "Gemini 2.0" }
      ]
    },
    {
      id: "ml-predictions",
      title: "ML Forecasting & Epidemiological Analytics",
      description: "Machine Learning forecasting engine utilizing Polynomial Regression to predict disease trajectories 30 to 180 days into the future, reporting R² model accuracy, 7-day rolling growth rates, and multi-country heatmaps.",
      category: "Machine Learning",
      iconName: "TrendingUp",
      metrics: [
        { label: "Model Type", val: "Polynomial Reg" },
        { label: "Forecast Span", val: "30-180 Days" }
      ]
    },
    {
      id: "risk-calculator",
      title: "Multi-Factor Clinical Risk Calculator",
      description: "Personalized epidemiological risk assessment algorithm analyzing age, regional disease incidence, presenting symptoms, vaccination history, and pre-existing medical conditions with color-coded risk stratification.",
      category: "Clinical Assessment",
      iconName: "ShieldAlert",
      metrics: [
        { label: "Risk Levels", val: "3 Tiers" },
        { label: "Factors Analyzed", val: "5 Parameters" }
      ]
    },
    {
      id: "news-feed",
      title: "Real-Time Google News Feed",
      description: "Automated medical and epidemiological news aggregator utilizing feedparser to stream country- and disease-specific headlines directly via Google News RSS with one-click full-text references.",
      category: "Data Streaming",
      iconName: "Newspaper",
      metrics: [
        { label: "Feed Protocol", val: "RSS / XML" },
        { label: "Refresh Rate", val: "Real-Time" }
      ]
    },
    {
      id: "speech-tts",
      title: "Voice Search & Text-to-Speech (TTS)",
      description: "Hands-free accessibility integration utilizing SpeechRecognition for spoken voice query input and Google Text-to-Speech (gTTS) for clinical report audio playback.",
      category: "Accessibility & Voice",
      iconName: "Mic",
      metrics: [
        { label: "Voice Input", val: "SpeechRecog" },
        { label: "Audio Output", val: "gTTS 2.5.4" }
      ]
    }
  ],
  mlModels: [
    {
      name: "Polynomial Regression Forecaster",
      algorithm: "scikit-learn PolynomialFeatures (degree=2/3) + LinearRegression",
      forecastHorizon: "30 - 180 Days",
      metrics: "R² Coefficient ≥ 0.70+",
      description: "Fits non-linear trend curves over 25-year epidemiological time series to project future infection trajectories with 95% confidence intervals."
    },
    {
      name: "7-Day & 30-Day Rolling Moving Averages",
      algorithm: "Pandas rolling(window=7/30).mean()",
      forecastHorizon: "Real-time smoothing",
      metrics: "Noise Reduction",
      description: "Removes reporting lag, weekend reporting irregularities, and seasonal variance to expose true baseline transmission velocities."
    }
  ],
  sampleData: [
    {
      disease: "COVID-19",
      country: "India",
      totalCases: "45,038,000",
      annualAvg: "7,506,000",
      peakYear: "2021",
      trend: "Endemic Stable",
      yearlyTrend: [
        { year: 2020, cases: 10284000, deaths: 148900 },
        { year: 2021, cases: 24500000, deaths: 332000 },
        { year: 2022, cases: 8500000, deaths: 45000 },
        { year: 2023, cases: 1200000, deaths: 8500 },
        { year: 2024, cases: 450000, deaths: 2100 },
        { year: 2025, cases: 104000, deaths: 520, predicted: 95000 }
      ]
    },
    {
      disease: "Diabetes",
      country: "America",
      totalCases: "38,400,000",
      annualAvg: "1,536,000",
      peakYear: "2024",
      trend: "Upward Linear (+3.2% yr)",
      yearlyTrend: [
        { year: 2000, cases: 11000000, deaths: 69000 },
        { year: 2005, cases: 15800000, deaths: 75000 },
        { year: 2010, cases: 21100000, deaths: 69000 },
        { year: 2015, cases: 29000000, deaths: 79000 },
        { year: 2020, cases: 34200000, deaths: 102000 },
        { year: 2025, cases: 38400000, deaths: 106000, predicted: 39900000 }
      ]
    },
    {
      disease: "Tuberculosis",
      country: "India",
      totalCases: "2,800,000 / yr",
      annualAvg: "2,650,000",
      peakYear: "2018",
      trend: "Declining (-4.1% yr)",
      yearlyTrend: [
        { year: 2000, cases: 3200000, deaths: 480000 },
        { year: 2005, cases: 3100000, deaths: 430000 },
        { year: 2010, cases: 2950000, deaths: 390000 },
        { year: 2015, cases: 2800000, deaths: 350000 },
        { year: 2020, cases: 2400000, deaths: 320000 },
        { year: 2025, cases: 2100000, deaths: 280000, predicted: 1980000 }
      ]
    },
    {
      disease: "HIV/AIDS",
      country: "Global Aggregate",
      totalCases: "39,000,000",
      annualAvg: "1,560,000",
      peakYear: "2004",
      trend: "Controlled with ART",
      yearlyTrend: [
        { year: 2000, cases: 28000000, deaths: 1700000 },
        { year: 2005, cases: 33000000, deaths: 1900000 },
        { year: 2010, cases: 34000000, deaths: 1400000 },
        { year: 2015, cases: 36000000, deaths: 1000000 },
        { year: 2020, cases: 37500000, deaths: 680000 },
        { year: 2025, cases: 39000000, deaths: 630000, predicted: 39400000 }
      ]
    },
    {
      disease: "Alzheimer's",
      country: "Japan",
      totalCases: "6,000,000",
      annualAvg: "240,000",
      peakYear: "2025",
      trend: "Aging Demographic Surge",
      yearlyTrend: [
        { year: 2000, cases: 1500000, deaths: 12000 },
        { year: 2005, cases: 2100000, deaths: 16000 },
        { year: 2010, cases: 3200000, deaths: 22000 },
        { year: 2015, cases: 4400000, deaths: 29000 },
        { year: 2020, cases: 5300000, deaths: 35000 },
        { year: 2025, cases: 6000000, deaths: 41000, predicted: 6400000 }
      ]
    },
    {
      disease: "Colon Cancer",
      country: "America",
      totalCases: "153,000 / yr",
      annualAvg: "145,000",
      peakYear: "2023",
      trend: "Early-Onset Rise",
      yearlyTrend: [
        { year: 2000, cases: 130000, deaths: 56000 },
        { year: 2005, cases: 138000, deaths: 54000 },
        { year: 2010, cases: 142000, deaths: 51000 },
        { year: 2015, cases: 140000, deaths: 49000 },
        { year: 2020, cases: 147000, deaths: 52000 },
        { year: 2025, cases: 153000, deaths: 53000, predicted: 156000 }
      ]
    }
  ],
  reproduction: {
    prerequisites: [
      "Python 3.8+ (Python 3.10 or 3.11 recommended)",
      "pip package manager",
      "Git CLI"
    ],
    localSetup: [
      "git clone https://github.com/25sh0363-code/project-board.git",
      "cd project-board",
      "python -m venv .venv",
      "# Windows activate:",
      ".venv\\Scripts\\activate",
      "# Mac/Linux activate:",
      "source .venv/bin/activate",
      "pip install -r requirements.txt",
      "streamlit run app.py"
    ],
    dockerSetup: [
      "docker build -t global-disease-tracker .",
      "docker run -p 8501:8501 global-disease-tracker",
      "# Access at http://localhost:8501"
    ],
    environment: [
      { key: "GEMINI_API_KEY", required: false, desc: "Optional API key for Google Gemini 2.0 LLM health assistant expansion" },
      { key: "STREAMLIT_SERVER_PORT", required: false, desc: "Port configuration (defaults to 8501)" }
    ]
  }
};

export const SOMUN_DATA: SomunDetails = {
  conferenceDates: "October 30 — November 1, 2026",
  venue: "Silver Oaks International School, Bowrampet Campus · Hyderabad, India",
  role: "Tech Head @ SOMUN 2026",
  contactEmail: "somundelaffairs@gmail.com",
  githubRepo: "https://github.com/25sh0363-code/SOMUN-26",
  chambers: [
    {
      code: "DISEC",
      name: "Disarmament & International Security Committee",
      category: "General Assembly",
      agenda: "Regulation of autonomous lethal weapons systems & anti-satellite weapon proliferation in contested orbits",
      description: "Focuses on global security frameworks, nuclear de-escalation, and non-state cyberwarfare protocols."
    },
    {
      code: "UNHRC",
      name: "United Nations Human Rights Council",
      category: "Human Rights",
      agenda: "Safeguarding human rights in active territorial conflict zones & ethical governance of biometric state surveillance",
      description: "Deliberates on state compliance with Universal Declaration of Human Rights and asylum protections."
    },
    {
      code: "ECOSOC",
      name: "Economic & Social Council",
      category: "Economic",
      agenda: "Rebuilding sovereign debt frameworks & financing sustainable climate adaptation in emerging economies",
      description: "Coordinates sustainable development initiatives, global supply-chain resilience, and micro-finance access."
    },
    {
      code: "UNODC",
      name: "UN Office on Drugs & Crime",
      category: "Specialized Agency",
      agenda: "Combating cross-border synthetic opioid trafficking and illicit dark-web cryptocurrency money laundering",
      description: "Formulates inter-governmental forensic intelligence sharing and port interception mandates."
    },
    {
      code: "UNCTC",
      name: "Counter-Terrorism Committee",
      category: "Security Council Subsidiary",
      agenda: "Preventing cross-border radicalization networks and countering decentralized unmanned aerial attacks",
      description: "Monitors resolution enforcement against terrorist financing channels and foreign fighter pipelines."
    },
    {
      code: "UNSCW",
      name: "UN Special Committee on Women",
      category: "Human Rights & Equity",
      agenda: "Ensuring legal recourse and socioeconomic protection for women in humanitarian crisis zones",
      description: "Advances institutional parity, emergency healthcare protection, and post-conflict rehabilitation."
    },
    {
      code: "UNOOSA",
      name: "UN Office for Outer Space Affairs",
      category: "Specialized Council",
      agenda: "Governance of low-Earth orbital space debris remediation and resource extraction rights on extraterrestrial bodies",
      description: "Negotiates peaceful space utilization treaties and space traffic management standardization."
    },
    {
      code: "HCC",
      name: "Historic Crisis Committee (1962)",
      category: "Crisis Chamber",
      agenda: "The Cuban Missile Crisis: Cold War brinkmanship, maritime blockades, and secret backchannel diplomacy",
      description: "Fast-paced continuous crisis simulation with dynamic midnight cabinet directives and rapid military updates."
    },
    {
      code: "ICC",
      name: "International Criminal Court",
      category: "Legal & Jurisprudence",
      agenda: "Prosecuting war crimes under the Rome Statute and jurisdictional boundaries over non-signatory state actors",
      description: "Simulates full courtroom jurisprudence, witness testimonies, defense arguments, and legal verdicts."
    },
    {
      code: "AIPPM",
      name: "All India Political Parties Meet",
      category: "Indian Committee",
      agenda: "Deliberations on One Nation One Election framework, federal fiscal autonomy, and electoral expenditure transparency",
      description: "High-intensity regional parliamentary debate featuring diverse political party leaders and policy stakeholders."
    },
    {
      code: "MCU",
      name: "Marvel Cinematic Universe Crisis",
      category: "Specialized Crisis",
      agenda: "Post-Sokovia Accords crisis response, planetary defense against extraterrestrial incursions, and superhuman regulation",
      description: "Immersive fictional crisis simulation with individual character portfolios, covert resources, and press leaks."
    },
    {
      code: "IP",
      name: "International Press Corps",
      category: "Journalism & Media",
      agenda: "Live committee coverage, investigative journalism, press conferences, and breaking news bulletins",
      description: "Monitors all 11 debating chambers, holds delegates accountable, and produces the official SOMUN Daily Gazette."
    }
  ],
  registrationSteps: [
    {
      step: 1,
      title: "Personal Information",
      desc: "Delegate profile, grade (VIII–XII), institution affiliation, and emergency guardian contact details.",
      highlights: ["Grade eligibility validation", "Institutional affiliation tagging", "Emergency contact routing"]
    },
    {
      step: 2,
      title: "MUN Experience & Accolades",
      desc: "Comprehensive background assessment from first-time debaters to seasoned executive board members.",
      highlights: ["Experience tier classification", "First-timer procedure briefing flag", "Past awards tracking"]
    },
    {
      step: 3,
      title: "Committee & Portfolio Preferences",
      desc: "3 prioritized chamber selections with real-time portfolio availability matrices.",
      highlights: ["12 chamber dossiers", "Live allocation matrix preview", "Weighted preference engine"]
    },
    {
      step: 4,
      title: "Dynamic UPI Payment & QR Pass",
      desc: "Instant reference code generation, dynamic UPI amount calculation, transaction receipt validation, and QR entry pass issuance.",
      highlights: ["Zero-commission UPI QR scan", "Automated payment verification pipeline", "Instant reference ID & Day 01 QR entry pass"]
    }
  ],
  portalHighlights: [
    {
      title: "12 Chambers Dossiers & Background Guides",
      description: "Dedicated committee pages with detailed agendas, focus areas, downloadable study guides, and portfolio matrices.",
      icon: "Layers"
    },
    {
      title: "End-to-End 4-Step Registration Pipeline",
      description: "Streamlined registration portal supporting individual delegates and entire school delegations with automated reference tracking.",
      icon: "CheckCircle2"
    },
    {
      title: "Dynamic UPI Payment & Receipt Reconciliation",
      description: "Seamless on-screen UPI QR generator calculating the exact fee with delegate reference code, transaction ID capture, and screenshot verification.",
      icon: "Zap"
    },
    {
      title: "Automated Allotment & QR Delegate Pass",
      description: "Secretariat dashboard for portfolio allocation with automated confirmation emails and scannable QR passes for Day 01 check-in.",
      icon: "ShieldAlert"
    },
    {
      title: "Interactive 3-Day Programme Itinerary",
      description: "Complete chronological schedule from opening roll call, moderated caucuses, socials night, to the final closing plenary.",
      icon: "Calendar"
    },
    {
      title: "Live Gavel-In Countdown Clock",
      description: "Dynamic countdown clock ticking down to October 30, 2026 gavel drop at Silver Oaks International School.",
      icon: "Flame"
    }
  ],
  itinerary: [
    {
      day: "Day 01 — Friday, October 30, 2026",
      date: "Oct 30",
      events: [
        "08:00 AM — Registration & Delegate Kit Distribution (QR Check-in)",
        "09:30 AM — Grand Opening Ceremony & Keynote Address",
        "11:00 AM — First-Timer Rules of Procedure Briefing & Chamber Roll Call",
        "12:00 PM — Committee Session I (Setting the Agenda & Speaker's List)",
        "02:00 PM — Networking Lunch",
        "03:00 PM — Committee Session II (Moderated & Unmoderated Caucuses)",
        "05:30 PM — Day 01 Adjournment & Secretariat Debrief"
      ]
    },
    {
      day: "Day 02 — Saturday, October 31, 2026",
      date: "Oct 31",
      events: [
        "08:30 AM — Chamber Roll Call & Press Release Review",
        "09:00 AM — Committee Session III (Working Papers & Drafting Directives)",
        "12:30 PM — Lunch & Delegate Interaction",
        "01:30 PM — Committee Session IV (Crisis Introductions & Midnight Directives)",
        "04:30 PM — Draft Resolution Introductions & Q&A",
        "06:30 PM — SOMUN '26 Socials Night & Gala"
      ]
    },
    {
      day: "Day 03 — Sunday, November 1, 2026",
      date: "Nov 01",
      events: [
        "09:00 AM — Chamber Roll Call & Final Amendment Voting",
        "10:00 AM — Committee Session V (Voting on Draft Resolutions & Verdicts)",
        "01:00 PM — Farewell Lunch",
        "02:30 PM — Closing Plenary & Executive Board Feedback",
        "04:00 PM — Awards Ceremony (Best Delegate, High Commendation, Special Mention)",
        "05:30 PM — Final Gavel & Official Adjournment"
      ]
    }
  ]
};

export const TEDX_DATA: TedxDetails = {
  githubRepoCheckin: "https://github.com/25sh0363-code/tedx-checkin",
  githubRepoMain: "https://github.com/25sh0363-code/tedx",
  backendTech: "Google Sheets & Google Apps Script",
  tagline: "Custom-built, serverless digital portal and real-time QR check-in ecosystem powered by Google Sheets & Apps Script for TEDxSilverOaks.",
  overview: "For TEDxSilverOaks, rather than relying on expensive third-party ticketing platforms, we engineered a completely custom, lightweight, serverless ticketing and guest onboarding system from the ground up. This system comprises two key components: the main promotional/registration web portal and a specialized high-speed check-in mobile web app. Leveraging Google Sheets as a real-time relational database and Google Apps Script as the serverless micro-backend, we implemented instant QR-code generation, automatic transactional confirmation emails, and zero-latency check-in verification with QR scanning. The entire project was delivered under severe budget constraints, demonstrating high reliability and serving over 200+ attendees during the live event.",
  features: [
    {
      title: "Serverless Apps Script API",
      description: "Deployed custom Google Apps Script web app endpoints acting as REST APIs to process registrations, query seat availability, and validate check-ins directly within Google Sheets.",
      icon: "Cpu"
    },
    {
      title: "Real-time Google Sheets DB",
      description: "Utilized Google Sheets with complex query formulas, validation rules, and automated relational linking to act as a structured, low-latency, real-time database.",
      icon: "Database"
    },
    {
      title: "Transactional Email Engine",
      description: "Automated trigger system using Apps Script MailApp to compile customized HTML confirmation passes complete with embedded, dynamically-generated QR codes upon successful payment.",
      icon: "Mail"
    },
    {
      title: "High-Speed QR Scanner Web App",
      description: "Designed a dedicated, responsive mobile web check-in client with HTML5 camera scanning that authenticates passes in sub-300ms, preventing long entry queues.",
      icon: "QrCode"
    },
    {
      title: "Speaker Lineup & Agenda",
      description: "Implemented a fully responsive main portal with interactive sections showcasing TEDx speaker profiles, custom theme presentation timelines, and event guidelines.",
      icon: "Layers"
    }
  ],
  screenshots: [
    {
      id: "tedx-shot-1",
      title: "Unveiling Maya — Hero Landing Section",
      category: "Visitor Portal",
      imagePath: "tedx/Screenshot 2026-09-23 at 1.44.10 AM.png",
      description: "The public landing page for TEDx Silver Oaks (Bowrampet/Bachupally Campus), highlighting the theme 'Unveiling Maya: The Illusions of Reality' on 20th Dec 2025. It details a modern layout over a monochrome sketched eyes portrait and active red call-to-action buttons.",
      highlights: [
        "Top navigation bar (HOME, ABOUT, SPEAKERS, SCHEDULE, TEAM, FAQ) with red 'REGISTER' pill button",
        "Date and location badge: '20TH DEC 2025 • HYDERABAD' with calendar icon",
        "Two prominent rounded action buttons: 'JOIN THE EXPERIENCE →' and 'MEET OUR SPEAKERS'"
      ]
    },
    {
      id: "tedx-shot-2",
      title: "About the Theme — Exploring Maya",
      category: "Visitor Portal",
      imagePath: "tedx/Screenshot 2026-09-23 at 1.44.19 AM.png",
      description: "The conceptual section explaining 'Maya' as subtle yet powerful illusions shaping how we see the world. It maps out three distinct thematic pillars on the left alongside a gorgeous circular optical wave theme poster on the right.",
      highlights: [
        "Pillar I: 'Identity & Self' mapping fixed or shaped self-expectations",
        "Pillar II: 'Time & Efficiency' addressing time pressure in an efficient age",
        "Pillar III: 'Connection & Distance' exploring connection masking real distance"
      ]
    },
    {
      id: "tedx-shot-3",
      title: "About TED — Technology, Entertainment, Design",
      category: "Visitor Portal",
      imagePath: "tedx/Screenshot 2026-09-23 at 1.44.41 AM.png",
      description: "An educational section detailing TED's nonprofit mission to spread ideas and foster curiosity. Layout includes a stage photograph showing a previous speaker in action with a 'TEDx Silver Oaks Intl School Bachupally' stage sign.",
      highlights: [
        "Informational three-paragraph context detailing the nonprofit's history and values",
        "Left-aligned stage photograph showcasing previous event speaker on stage",
        "Small red-tinted 'TED' pill badge preceding the bold main heading"
      ]
    },
    {
      id: "tedx-shot-4",
      title: "Team Directory — Tech Head Spotlight",
      category: "Visitor Portal",
      imagePath: "tedx/Screenshot 2026-09-23 at 1.45.01 AM.png",
      description: "The official team profiles directory focusing on Tech Head Om Suraj Kashikar. Displays a portrait photo of Om alongside a detailed biography outlining his skills, technical management, and hobbies.",
      highlights: [
        "Profile card with a neon red border glow effect on a dark grid canvas",
        "Bio highlights: coding, AI, ML, hardware debugging, and active team leadership",
        "Department tag: 'TECH' in red, white bold header, and red underline accents"
      ]
    },
    {
      id: "tedx-shot-5",
      title: "Staff Gate Check-In & Scanner Portal",
      category: "Staff Operations",
      imagePath: "tedx/Screenshot 2026-09-23 at 1.46.43 AM.png",
      description: "The mobile-friendly live Staff Check-in Portal for the 'Maya: Illusions in Daily Life' event. Shows real-time check-in counts (111 Checked In, 117 Registered, 6 Pending) over a camera viewfinder scanning frame for immediate pass validation.",
      highlights: [
        "Real-time attendee stats tracker (111 checked in, 117 registered, 6 pending)",
        "Sleek square camera viewfinder scanner with red border outline and corner marks",
        "Wide red 'SCAN NEXT' sync button facilitating sequential scanning workflows"
      ]
    }
  ],
  architecture: [
    {
      component: "Frontend Clients",
      description: "Two distinct single-page apps: the main visitor/booking landing page and the staff mobile-first QR scanner console.",
      tech: "HTML5, Tailwind CSS, Javascript, html5-qrcode"
    },
    {
      component: "Serverless Micro-API",
      description: "Google Apps Script deployed as a Web App (executing as user) exposing HTTP POST and GET routes to bridge frontend client actions with the database.",
      tech: "Google Apps Script (GAS)"
    },
    {
      component: "Relational Database",
      description: "A secure, structured Google Sheet containing separate sheets for delegate registration records, check-in log history, and payment configuration keys.",
      tech: "Google Sheets Engine"
    },
    {
      component: "Pass Delivery & Automation",
      description: "An Apps Script trigger that compiles custom attendee passes from a template, embeds a unique SHA-256 encoded check-in QR code, and sends a PDF attachment via Gmail/MailApp API.",
      tech: "Google AppScript & Gmail API"
    }
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "native-cpp-transformer",
    title: "Native C++ vs. Python Decoder-Only Transformer (Research Paper)",
    description: "Empirical systems performance study and benchmark comparing Python/PyTorch vs. C++/LibTorch small decoder-only Transformers on TinyStories V2 using an NVIDIA RTX 4090.",
    longDescription: "A comprehensive empirical deep-learning systems paper investigating the runtime throughput and memory profile of modern autoregressive Transformer architectures across high-level Python/PyTorch and compiled native C++/LibTorch. Both implementations utilize identical pre-tokenized binary datasets (uint16 train.bin and val.bin produced via tiktoken GPT-2), a 256-token context window, and matching 8-block Pre-LayerNorm configurations. Evaluated on an NVIDIA RTX 4090 across 100,000 training steps (819.2 million tokens) and autoregressive inference runs, C++ demonstrated a 1.63× sustained training throughput advantage (97,500 vs 60,000 tokens/sec), 1.48× higher inference throughput (190.6 vs 129 tok/s), and a 69.8% reduction in GPU VRAM footprint during inference (164.8 MB vs 545 MB).",
    techStack: ["C++ (LibTorch 2.5)", "Python (PyTorch)", "CUDA 13.4", "NVIDIA RTX 4090", "CMake", "tiktoken GPT-2", "AdamW"],
    category: "AI & Data Science",
    githubLink: "https://github.com/25sh0363-code/Native_C-_vs_Python_decoder_only_model",
    liveLink: "https://github.com/25sh0363-code/Native_C-_vs_Python_decoder_only_model",
    features: [
      "1.63× Sustained Training Speedup (95,000–100,000 tokens/sec in C++ vs 59,000–62,000 in Python)",
      "1.48× Autoregressive Inference Throughput (190.6 median tok/s in C++ vs 129.0 tok/s in Python)",
      "69.8% GPU VRAM Footprint Reduction (164.8 MB in C++ vs 545.0 MB in Python during generation)",
      "18.0% System RAM Efficiency Advantage (864.7 MB in C++ vs 1,055 MB in Python)",
      "Identical binary data pipelines consuming uint16 token shards trained over 819.2 million tokens",
      "Near-identical convergence loss trajectories (Python final val loss 1.4196 vs C++ final val loss 1.4136)"
    ],
    image: "images/transformer_cpp_paper_1790071663605.jpg",
    isResearchPaper: true,
    paperData: RESEARCH_PAPER_DATA
  },
  {
    id: "somun-2026",
    title: "SOMUN '26 — Official Web Engine (somunhyd.in)",
    description: "Official web portal and platform architecture for SOMUN '26 (somunhyd.in) managing 12 committee chambers, 5-step registration stepper, financial verification ledger, and live QR check-in scanner.",
    longDescription: "Architected and built the official web application for SOMUN '26 (somunhyd.in) as Lead Tech Head. Designed a complete multi-page architecture spanning the Home Page (hero, countdown, 'Words, not war' motto), About Us (Secretariat welcome & vision), Committees (12 chambers including DISEC, UNHRC, ECOSOC with agendas and background guides), Itinerary (3-day schedule), Resources (Rules of Procedure & Delegate Handbook), a 5-step Delegate Registration Stepper, and a restricted Staff Console equipped with a live financial verification ledger (tracking 528+ registrations and ₹14.78L+ invoices) and a camera-based QR pass check-in scanner.",
    techStack: ["React", "TypeScript", "Tailwind CSS", "Vite", "HTML5 Canvas QR Engine", "somunhyd.in"],
    category: "Full-Stack",
    githubLink: "https://github.com/25sh0363-code/SOMUN-26",
    liveLink: "https://somunhyd.in",
    features: [
      "Live Production Domain: Deployed and accessible at somunhyd.in",
      "5-Step Registration Stepper: Manages personal information, tiering, committee choices, code of conduct, and payment reference",
      "Secretariat Financial Ledger: Real-time verification panel tracking 528+ registrations, 471 fee-verified payments, and email queues",
      "Staff Gate Scanner: Camera-based QR pass scanner for 1-scan-per-day check-in validation across the 3-day conference",
      "12 Committee Chambers: Full dossiers, agendas, matrix allocations, and downloadable background guides",
      "Interactive Resources: Rules of Procedure (ROP), Position Paper writing guidelines, and Delegate Handbooks"
    ],
    image: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=1200&auto=format&fit=crop",
    somunDetails: SOMUN_DATA
  },
  {
    id: "sinovate-school-assistant",
    title: "SINOVATE — School Assistant (Flutter & FastAPI)",
    description: "An all-in-one AI study companion and academic planner featuring RAG syllabus tutoring, automated worksheet generation, and offline-first persistence.",
    longDescription: "SINOVATE is a cross-platform mobile application built with Flutter and a FastAPI backend designed to remove friction from high school and university studying. It combines context-grounded AI tutoring via FAISS vector store retrieval, an automated Worksheet Studio capable of drafting subject-specific question sets across varied marks and difficulty tiers, offline Markdown note generation with local SharedPreferences caching, landscape Mind Map Studio, exam performance tracking, unified academic calendar, and a subject-wise competitive leaderboard with Google Apps Script cloud sync.",
    techStack: ["Flutter (Dart)", "FastAPI (Python)", "LangChain", "OpenAI GPT-4o", "FAISS Vector Store", "SharedPreferences", "Google Apps Script"],
    category: "Systems & Mobile",
    githubLink: "https://github.com/25sh0363-code/CHATBOT_SCHOOL_ASSISTANT_flutter_version",
    liveLink: "https://youtu.be/9Ao7hLEgDD8",
    features: [
      "AI Tutor with FAISS Vector Store RAG for accurate CBSE/Senior Secondary syllabus grounding",
      "Worksheet Studio generating custom practice sheets with customizable mark distributions (MCQs, PYQs, 3/4/5 marks)",
      "Smart Markdown note creator with local-first SharedPreferences persistence and topic tagging",
      "Interactive Mind Map Studio with zoom, pan, and hierarchical branching",
      "Exams Hub with test score analytics, running averages, and countdown planners",
      "Results Leaderboard with subject rankings (Physics, Chemistry, Math) and cloud sync",
      "YouTube video demo and 6 interactive mobile screen walkthroughs"
    ],
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop",
    sinovateDetails: SINOVATE_DATA
  },
  {
    id: "seq2seq-translation-transformer",
    title: "Encoder-Decoder Transformer (English to Portuguese MT)",
    description: "From-scratch PyTorch implementation of Vaswani et al. Transformer (no nn.Transformer) trained on Soikat/opus_books with cross-attention visualization.",
    longDescription: "A from-scratch implementation of the Transformer architecture ('Attention Is All You Need') in PyTorch without high-level nn.Transformer or pre-built library layers, trained on the Soikat/opus_books English–Portuguese parallel corpus (1,404 sentence pairs) on a MacBook Air M4 CPU. Features complete custom implementations of multi-head self-attention and cross-attention, sinusoidal positional encoding, custom Layer Normalization, feed-forward networks, greedy and beam search (beam size 3) decoding, and dynamic cross-attention heatmap visualization (Layer 0, Head 0). Across 30 epochs, training loss consistently decreased from ~7.4 to 3.003.",
    techStack: ["PyTorch (From Scratch)", "Python", "Cross-Attention", "WordLevel Tokenizer", "Beam Search", "TensorBoard", "M4 CPU"],
    category: "AI & Data Science",
    githubLink: "https://github.com/25sh0363-code/Encoder-decoder_Translation_model_English-to-Portuguese",
    liveLink: "https://github.com/25sh0363-code/Encoder-decoder_Translation_model_English-to-Portuguese",
    features: [
      "From-scratch PyTorch architecture: No nn.Transformer or pre-built attention blocks",
      "6 Encoder + 6 Decoder layers with 8 multi-head attention blocks (d_model=256, d_ff=2048)",
      "Trained on Soikat/opus_books (1,404 English–Portuguese pairs) on MacBook Air M4 CPU",
      "Empirical loss reduction: 7.42 → 3.003 across 30 epochs logged to TensorBoard",
      "Greedy decoding (argmax) autoregressive inference loop in inference.py",
      "Cross-attention weight heatmap visualization (Layer 0, Head 0) exported via Matplotlib"
    ],
    image: "images/seq2seq_translation_1790072936904.jpg",
    translationDetails: SEQ2SEQ_TRANSLATION_DATA
  },
  {
    id: "char-level-bigram-model",
    title: "Basic & Improved Decoder-Only Language Models",
    description: "Architectural comparison between a baseline character Bigram lookup model and an improved 6-layer Causal Transformer with GPT-2 BPE and weight tying.",
    longDescription: "A decoder-only generative language modeling study tracing the architectural evolution from a simple character-level Bigram lookup table (bigram.py) to a 6-layer causal self-attention Transformer (bigram_improved.py). Developed to understand decoder-only autoregressive mechanics from scratch (inspired by Andrej Karpathy's lectures), the improved model features tiktoken GPT-2 subword tokenization (50,257 vocab), 6 Pre-LayerNorm Transformer blocks with 6 attention heads (d_model=384, head_size=64), learned positional embeddings (block_size=256), feed-forward networks with ReLU activation and 0.2 dropout, and weight tying between the token embedding table and the output language modeling head. Trained for 5,000 steps on an NVIDIA Tesla T4 GPU in 36 minutes, generating rich dramatic theatrical dialogue.",
    techStack: ["Python", "PyTorch", "Causal Self-Attention", "tiktoken (GPT-2 BPE)", "Weight Tying", "CUDA / MPS", "NVIDIA T4"],
    category: "AI & Data Science",
    githubLink: "https://github.com/25sh0363-code/Basic_char_level_bigram_model",
    liveLink: "https://github.com/25sh0363-code/Basic_char_level_bigram_model",
    features: [
      "Comparative study: Character-level bigram.py baseline vs 6-layer bigram_improved.py Transformer",
      "GPT-2 Byte-Pair Encoding tokenizer (tiktoken, 50,257 vocabulary) for rich subword representation",
      "Weight tying: token embedding table weights shared directly with lm_head projection layer",
      "6 Pre-LayerNorm Transformer blocks with 6 causal attention heads (d_model=384, block_size=256)",
      "Trained for 5,000 steps on NVIDIA Tesla T4 GPU in 36 minutes (batch size 64, AdamW lr=5e-4)",
      "Autoregressive generation loop with multinomial sampling over softmax logits"
    ],
    image: "images/char_bigram_transformer_1790072916169.jpg",
    charBigramDetails: CHAR_BIGRAM_DATA
  },
  {
    id: "tedx-checkin-system",
    title: "TEDxSilverOaks Onboarding & Live Check-In Ecosystem",
    description: "Serverless web ticketing and high-speed mobile check-in engine using Google Sheets as a database and Google Apps Script as a back-end, serving 200+ delegates.",
    longDescription: "A lightweight, custom-engineered serverless ticketing and guest check-in ecosystem developed for TEDxSilverOaks to bypass expensive third-party ticketing tools. Features a highly-responsive user ticketing portal mapping inputs directly to Google Sheets via serverless Apps Script REST endpoints, automatic HTML confirmation email compilation with dynamic high-resolution scannable QR passes, and a dedicated, responsive Mobile Web Check-In console for staff utilizing the device camera to authenticate tickets in sub-300ms.",
    techStack: ["Google Apps Script", "Google Sheets API", "HTML5", "CSS3 / Tailwind", "Javascript (ES6)", "html5-qrcode", "REST API"],
    category: "Full-Stack",
    githubLink: "https://github.com/25sh0363-code/tedx-checkin",
    liveLink: "https://github.com/25sh0363-code/tedx",
    features: [
      "Dual Repository Architecture: Separated visitor portal and staff check-in scanning console",
      "Google Sheets Relational Database: Structured storage managing registration info, checkout statuses, and attendee limits",
      "Apps Script Serverless backend API exposing REST doGet/doPost webhook endpoints",
      "On-the-fly QR Code compilation containing individual SHA-256 validation digests",
      "Dedicated mobile-first gate control app scanning and verifying tickets in less than 300ms",
      "Automatic HTML confirmation pass sender executing via transactional Gmail API triggers"
    ],
    image: "tedx/Screenshot 2026-09-23 at 1.44.10 AM.png",
    tedxDetails: TEDX_DATA
  },
  {
    id: "global-disease-tracker-pro",
    title: "Global Disease Tracker Pro (Streamlit & ML)",
    description: "Comprehensive epidemiological tracking and analytical web app for 6 major diseases across 10 countries (2000–2025) with ML polynomial forecasting and Gemini AI.",
    longDescription: "Global Disease Tracker Pro is an interactive healthcare analytics platform and epidemiological monitoring suite built with Streamlit, Plotly, Pandas, and scikit-learn. Tracking 25 years of global health trends (2000–2025 across 60 curated country-disease CSV datasets and 156,000+ data points), it features real-time case tracking, dual-country comparative trend analysis, ML-powered Polynomial Regression disease forecasting (30–180 days out with R² accuracy metrics), a context-aware AI Health Assistant powered by Google Gemini 2.0 and NLP pattern matching, a 5-factor clinical risk calculator, live Google News RSS feeds, voice queries, and Text-to-Speech (gTTS) audio narration.",
    techStack: ["Streamlit", "Plotly", "Python (Pandas/NumPy)", "scikit-learn (Polynomial Regression)", "Google Gemini 2.0", "gTTS", "SpeechRecognition", "Feedparser"],
    category: "AI & Data Science",
    githubLink: "https://github.com/25sh0363-code/project-board",
    liveLink: "https://github.com/25sh0363-code/project-board",
    features: [
      "25-Year Historical Analytics (2000–2025) across 10 countries and 6 major diseases (156k+ data points)",
      "ML Forecasting Engine: Polynomial Regression models projecting 30–180 day future case trajectories with R² accuracy score",
      "Context-Aware AI Health Assistant powered by Google Gemini 2.0 and 9-category NLP pattern matching",
      "Interactive Plotly visualizer with country-to-country comparative overlays and 7-day rolling averages",
      "Multi-factor Disease Risk Calculator analyzing age, geography, symptoms, and vaccination status",
      "Live Medical News Aggregator via feedparser Google News RSS and gTTS audio narration"
    ],
    image: "https://images.unsplash.com/photo-1584483766114-2cea6facdf57?q=80&w=1200&auto=format&fit=crop",
    diseaseTrackerDetails: GLOBAL_DISEASE_TRACKER_DATA
  },
  {
    id: "teachers-day-class-act",
    title: "A Class Act — Teachers’ Day Tribute Web App",
    description: "A handcrafted interactive digital classroom experience built for XII-Innovators — featuring interactive chalkboards, digital register sign-ins, subject faculty profiles, and handwritten gratitude notes.",
    longDescription: "A Class Act transforms the memories, personalities, and gratitude of XII-Innovators into an interactive web experience inspired by chalkboards, notebooks, and school registers. Built with zero frameworks or build systems—pure HTML5, CSS3, Vanilla JS, Canvas API, and SVG.",
    techStack: ["Vanilla JS", "HTML5 Canvas API", "CSS3", "SVG", "Intersection Observer API", "Lucide Icons"],
    category: "Web App",
    githubLink: "https://github.com/25sh0363-code/teachersday",
    liveLink: "https://github.com/25sh0363-code/teachersday",
    features: [
      "Interactive Chalkboard Hero: Selectable chalk colors, erasing, and canvas drawing",
      "Subject Faculty Showcase: Dedicated profile cards for 13 teachers across 10 subjects",
      "Interactive School Register: Mark teachers present and watch the class fill up",
      "Digital Thank-You Card: Sign and seal personal appreciation messages",
      "Chalk-Drawn SVG Animations: Scroll-triggered illustrations and storytelling",
      "Pure Web Platform: Zero-framework architecture using HTML5, CSS3, Vanilla JS, Canvas API, and SVG"
    ],
    image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop"
  }
];

export const RESUME: ResumeItem[] = [
  // Education
  {
    id: "edu1",
    role: "Senior Secondary (Grade 11 & 12) — PCM-CS",
    organization: "Silver Oaks International School (Mighty Oaks Campus)",
    location: "Hyderabad, India",
    period: "2024 - Present (Class of 2026)",
    highlights: [
      "Specializing in Physics, Chemistry, Mathematics, and Computer Science (PCM-CS) under the CBSE curriculum",
      "Thriving in Silver Oaks' holistic development style of teaching which uniquely emphasizes putting character before competence",
      "Active in technical operations, Model UN event infrastructure, and software engineering initiatives across campus"
    ],
    category: "education"
  },
  {
    id: "edu2",
    role: "Secondary School (Grade 8 to 10)",
    organization: "Vignan (CBSE Board School)",
    location: "Hyderabad, India",
    period: "2021 - 2024 (Class 10 CBSE Board Completed)",
    highlights: [
      "Completed Class 8 through Class 10 under the CBSE curriculum with strong academic foundations in Mathematics and Science",
      "Developed foundational problem-solving intuition, computer programming interest, and analytical thinking"
    ],
    category: "education"
  },

  // Experience
  {
    id: "exp-research",
    role: "Author & Lead Researcher — Deep Learning Systems",
    organization: "Research Study (Cloud Infrastructure by Race Engineering)",
    location: "Hyderabad, India",
    period: "2026",
    highlights: [
      "Authored the research paper 'From Python to Native C++: A Performance Study of Decoder-Only Transformers Using PyTorch and LibTorch'",
      "Implemented matching 8-block decoder-only Transformer architectures across PyTorch and LibTorch, training 819.2M tokens on TinyStories V2 GPT-4 using identical uint16 binary shards",
      "Benchmarked on NVIDIA RTX 4090, establishing 1.63× training speedup (~97.5k vs ~60k toks/s), 1.48× autoregressive inference throughput (190.6 vs 129.0 tok/s), and 69.8% GPU VRAM reduction (164.8 MB vs 545.0 MB)",
      "Developed reproducible open-source repository with full CMake/LibTorch build systems and Python preprocessing scripts"
    ],
    category: "experience"
  },
  {
    id: "exp1",
    role: "Tech Head",
    organization: "TEDxSilverOaks",
    location: "Hyderabad, India",
    period: "2025 - 2026",
    highlights: [
      "Chief director overseeing the absolute technical pipeline, online presence design, and event queue structures",
      "Architected the dynamic guest onboarding system, managing zero-latency database checks and real-time registry logs",
      "Coordinated high-stakes AV desks during presentation hours, configuring multiple source switches with zero technical errors"
    ],
    category: "experience"
  },
  {
    id: "exp2",
    role: "Tech Head",
    organization: "SOMUN 2026 (Silver Oaks Model United Nations)",
    location: "Hyderabad, India",
    period: "2025 - 2026",
    highlights: [
      "Engineered and deployed the official production web application & registration platform for SOMUN '26 (October 30 – November 1, 2026 at Bowrampet Campus)",
      "Architected 12 committee dossiers (DISEC, UNHRC, AIPPM, MCU, IP, etc.) and an interactive 4-step registration portal for delegates and school delegations",
      "Built dynamic UPI payment gateway reconciliation with automated reference code generation, receipt verification, and scannable QR delegate check-in passes"
    ],
    category: "experience"
  },

  // Extracurriculars
  {
    id: "ext-cert-gcloud",
    role: "Certified: Transformer Models and BERT Model",
    organization: "Google Cloud Training (Authorized via Coursera)",
    location: "Online Certification",
    period: "Jul 25, 2026",
    highlights: [
      "Completed official Google Cloud specialization exploring Transformer architecture, Multi-Head Self-Attention, and BERT pretraining methodologies",
      "Credential ID: M49T6QB6Y7BS · Verified online via coursera.org/verify/M49T6QB6Y7BS"
    ],
    category: "extracurricular"
  },
  {
    id: "ext-cert-ibm",
    role: "Certified: Generative AI Language Modeling with Transformers",
    organization: "IBM (Authorized via Coursera)",
    location: "Online Certification",
    period: "Aug 16, 2026",
    highlights: [
      "Completed IBM course by Fateme Akbari, Joseph Santarcangelo, and Adrian Wang on generative NLP, decoder models, and attention mechanics",
      "Credential ID: IGQAUMCQIEX9 · Verified online via coursera.org/verify/IGQAUMCQIEX9"
    ],
    category: "extracurricular"
  },
  {
    id: "ext-cert-kaggle",
    role: "Certified: Intro to Machine Learning",
    organization: "Kaggle Learn (Certificate of Completion)",
    location: "Kaggle",
    period: "Feb 1, 2026",
    highlights: [
      "Completed hands-on machine learning track instructed by Dan Becker and Alexis Cook (Head of Kaggle Learn)",
      "Built model validation workflows, decision trees, random forests, and optimized scikit-learn parameter tuning"
    ],
    category: "extracurricular"
  },
  {
    id: "ext-cert-plaksha",
    role: "Workshop on Neural Networks: Going Deep with AI",
    organization: "Plaksha University",
    location: "Punjab / Virtual Cohort",
    period: "Jul 29, 2026",
    highlights: [
      "Completed advanced technical workshop on feature representation to deep neural architectures conducted by Plaksha University",
      "Certified under Dr. Arshdeep Sidhu, Assistant Dean - Admissions and Outreach"
    ],
    category: "extracurricular"
  },
  {
    id: "ext1",
    role: "Data Science & AI Workshop Scholar",
    organization: "International Institute of Information Technology (IIIT) Hyderabad",
    location: "Hyderabad, India",
    period: "2-Day Intensive Cohort",
    highlights: [
      "Selected as high school scholar delegate to attend the specialized two-day workshop on foundational AI and machine learning",
      "Participated in guided lab sessions on data preprocessing, matrix algebra, and classifier implementations"
    ],
    category: "extracurricular"
  },
  {
    id: "ext-somun-oc",
    role: "Organizing Committee Member - 7th Edition",
    organization: "SOMUN Secretariat (Silver Oaks Model United Nations)",
    location: "Hyderabad, India",
    period: "Oct 17-19, 2025",
    highlights: [
      "Organizing Committee member facilitating committee operations, debate floor management, and technical logistics across 3-day conference"
    ],
    category: "extracurricular"
  },
  {
    id: "ext-tedx-oc",
    role: "Technical Operations & Organizing Team",
    organization: "TEDxSilverOaks 2025",
    location: "Hyderabad, India",
    period: "Dec 20, 2025",
    highlights: [
      "Recognized with Certificate of Appreciation for technical infrastructure, stage operations, and AV engineering"
    ],
    category: "extracurricular"
  },
  {
    id: "ext-yi-parliament",
    role: "Chapter Delegate - Young Indians Parliament",
    organization: "Confederation of Indian Industry (CII) & Young Indians (Yi)",
    location: "Hyderabad, India",
    period: "Jun 29, 2025",
    highlights: [
      "Chapter level round participant in parliamentary debate, democratic dialogue, and civic policy sessions"
    ],
    category: "extracurricular"
  },
  {
    id: "ext-oaksfest-25",
    role: "Organiser & Skit Performer (Nukad Natak)",
    organization: "OAKSFEST '25 Cultural Festival (Silver Oaks)",
    location: "Hyderabad, India",
    period: "2025",
    highlights: [
      "Organised the festival's Character Parade, managing coordination, sequences, and stage queues for student participants",
      "Participated as a key performer in the street play (Nukad Natak), a traditional Indian format used to showcase moral narratives and positive social values",
      "Directed stage positioning, crowd logistics, and peer-to-peer engagement during major open-air theater sessions"
    ],
    category: "extracurricular"
  },
  {
    id: "ext-uni-fairs",
    role: "Co-Organiser — International University Fairs",
    organization: "Silver Oaks Career Counseling Cell",
    location: "Hyderabad, India",
    period: "Grade 11 (2024 - 2025)",
    highlights: [
      "Co-organised two extensive international university fairs hosted on-campus, serving as a liaison between visiting global delegates and student cohorts",
      "Coordinated stall setups, digital infrastructure mapping, guide orientations, and welcome protocols for over 30 international higher education institutions"
    ],
    category: "extracurricular"
  },
  {
    id: "ext-boards-beyond",
    role: "Student Lead & Speaker (Boards & Beyond)",
    organization: "Silver Oaks Academic Initiative",
    location: "Hyderabad, India",
    period: "August 2025 & August 2026",
    highlights: [
      "Conducted 'Boards & Beyond' orientation sessions targeting parents, illustrating the key educational value and career options of Informatics Practices (IP) in Class 11 & 12",
      "Led a dedicated team of 2 students for technical slide development, presentation scheduling, and curriculum highlighting, serving as team lead for consecutive seasons (August 2025 & August 2026)"
    ],
    category: "extracurricular"
  }
];

export const CERTIFICATES: Certificate[] = [
  {
    id: "cert-gcloud-transformer-bert",
    title: "Transformer Models and BERT Model",
    issuer: "Google Cloud Training",
    issuerOrg: "Google Cloud",
    recipient: "om suraj kashikar",
    date: "July 25, 2026",
    imageUrl: "certificates/coursera-google-cloud-transformer-bert-exact.png",
    pdfUrl: "certificates/Coursera-M49T6QB6Y7BS-2.pdf",
    verificationUrl: "https://coursera.org/verify/M49T6QB6Y7BS",
    verificationId: "M49T6QB6Y7BS",
    skills: ["Transformer Architectures", "BERT", "Self-Attention", "NLP Pretraining", "Google Cloud ML"],
    description: "Official course authorized by Google Cloud exploring deep Transformer architectures, bidirectional encoder representations (BERT), and attention mechanisms.",
    certificateType: "google-cloud"
  },
  {
    id: "cert-ibm-genai-transformers",
    title: "Generative AI Language Modeling with Transformers",
    issuer: "IBM",
    issuerOrg: "IBM",
    recipient: "om suraj kashikar",
    date: "August 16, 2026",
    imageUrl: "certificates/coursera-ibm-generative-ai-transformers-exact.png",
    pdfUrl: "certificates/Coursera-IGQAUMCQIEX9.pdf",
    instructors: ["Fateme Akbari", "Joseph Santarcangelo", "Adrian Wang"],
    verificationUrl: "https://coursera.org/verify/IGQAUMCQIEX9",
    verificationId: "IGQAUMCQIEX9",
    skills: ["Generative AI", "Causal Language Modeling", "Decoder Transformers", "Autoregressive Generation", "Attention Mechanics"],
    description: "Authorized by IBM and offered through Coursera, covering generative language modeling, decoder architectures, and transformer workflows.",
    certificateType: "ibm"
  },
  {
    id: "cert-kaggle-ml",
    title: "Intro to Machine Learning",
    issuer: "Kaggle Learn",
    issuerOrg: "Kaggle",
    recipient: "om suraj",
    date: "February 1, 2026",
    imageUrl: "certificates/om-suraj-kaggle-ml-exact.png",
    instructors: ["Dan Becker (Kaggle Instructor)", "Alexis Cook (Head of Kaggle Learn)"],
    skills: ["Model Validation", "Decision Trees", "Random Forests", "scikit-learn", "Hyperparameter Tuning"],
    description: "Hands-on foundation in model development, validation pipelines, decision trees, random forests, and scikit-learn on Kaggle.",
    certificateType: "kaggle"
  },
  {
    id: "cert-iiit-hyderabad-ds",
    title: "Technical Workshop on Data Science",
    issuer: "Remark Skill in Association with Infinium, IIIT Hyderabad",
    issuerOrg: "IIIT Hyderabad",
    recipient: "Om Suraj Kashikar",
    date: "October 4-5, 2025",
    imageUrl: "certificates/iiit-hyderabad-remarkskill-data-science.jpg",
    instructors: ["Vansh Agarwal (Felicity-Infinium, IIIT Hyderabad)", "Hitesh Kumar (Co-Founder, Remark Skill)"],
    skills: ["Data Science", "Python Analytics", "Data Preprocessing", "Feature Engineering", "IIIT Hyderabad Labs"],
    description: "Hands-on intensive technical workshop on applied data science, statistical analysis, and machine learning models hosted at IIIT Hyderabad.",
    certificateType: "iiit-hyderabad"
  },
  {
    id: "cert-tedx-silveroaks-2025",
    title: "TEDxSilverOaks Bachupally 2025 - Certificate of Appreciation",
    issuer: "TEDx & Silver Oaks International School",
    issuerOrg: "TEDx",
    recipient: "Om Suraj Kashikar",
    date: "December 20, 2025",
    imageUrl: "certificates/tedx-silveroaks-organizer.jpg",
    instructors: ["Dhanyatha Dosapati (Lead Organizer)", "Nisha Mathew (Co-Lead Organizer)"],
    skills: ["Technical Operations", "Live AV Engineering", "Event Leadership", "Logistics"],
    description: "Awarded for exceptional contributions to the technical operations and event infrastructure of TEDxSilverOaks 2025.",
    certificateType: "tedx"
  },
  {
    id: "cert-somun-7th-edition",
    title: "SOMUN 7th Edition - Certificate of Appreciation",
    issuer: "Silver Oaks Model United Nations Secretariat",
    issuerOrg: "SOMUN",
    recipient: "Om Suraj Kashikar",
    date: "October 17-19, 2025",
    imageUrl: "certificates/somun-7th-edition-appreciation.jpg",
    instructors: ["Hemant Reddy Palavalli (Secretary General)", "Rishabh Mohanty (Director General)", "Dr. Seetha Murty (Director Education)"],
    skills: ["Organizing Committee (OC)", "Vanijya Committee Operations", "Diplomatic Research", "Infrastructure"],
    description: "Recognized as Organizing Committee member for successful execution of the 7th edition of SOMUN across 3 days of international debate.",
    certificateType: "somun"
  },
  {
    id: "cert-young-indians-parliament",
    title: "Young Indians Parliament 2025 - Chapter Level Round",
    issuer: "Confederation of Indian Industry (CII) & Young Indians (Yi)",
    issuerOrg: "CII / Young Indians",
    recipient: "Mr. Om Suraj Kashikar",
    date: "June 29, 2025",
    imageUrl: "certificates/young-indians-parliament-cii-2025.jpg",
    instructors: ["Tarang Khurana (National Yi Chair)", "Sangeetha M (National Thalir Chair)", "Ashwin Agarwal (Chapter Chair)"],
    skills: ["Parliamentary Debate", "Democratic Dialogue", "Civic Awareness", "Public Policy", "Leadership"],
    description: "City Level Round delegate in the national youth parliament initiative organized by Yi & CII, commended for active civic leadership and parliamentary engagement in Hyderabad.",
    certificateType: "young-indians"
  },
  {
    id: "cert-plaksha-neural-networks",
    title: "Going Deep with AI - From Features to Neural Networks",
    issuer: "Plaksha University",
    issuerOrg: "Plaksha University",
    recipient: "Om Suraj Kashikar",
    date: "July 29, 2026",
    imageUrl: "certificates/plaksha-neural-networks.png",
    pdfUrl: "certificates/Plaksha-Neural-Networks.pdf",
    instructors: ["Dr. Arshdeep Sidhu (Assistant Dean - Admissions and Outreach, Plaksha University)"],
    skills: ["Neural Networks", "Feature Extraction", "Deep Learning Foundations", "Architectures"],
    description: "Hands-on workshop exploring the evolution of AI systems from statistical feature engineering to modern deep neural networks, conducted by Plaksha University.",
    certificateType: "plaksha"
  }
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    category: "Languages & Frameworks",
    skills: [
      { name: "Python (PyTorch & Data)", icon: "Cpu", level: 4 },
      { name: "TypeScript & JavaScript", icon: "Code", level: 4 },
      { name: "React (Vite)", icon: "Hexagon", level: 4 },
      { name: "C++ (LibTorch & STL)", icon: "FileCode", level: 3 },
      { name: "Tailwind CSS", icon: "Palette", level: 4 }
    ]
  },
  {
    category: "Machine Learning & AI",
    skills: [
      { name: "Transformer Architectures", icon: "Layers", level: 4 },
      { name: "Autoregressive NLP & Decoder Models", icon: "Activity", level: 3 },
      { name: "Model Validation & scikit-learn", icon: "BarChart", level: 4 },
      { name: "LibTorch C++ Integration", icon: "Server", level: 3 },
      { name: "Mixed Precision & CUDA Basics", icon: "Cpu", level: 3 }
    ]
  },
  {
    category: "Developer Tools & Math",
    skills: [
      { name: "Git & GitHub Workflows", icon: "GitBranch", level: 4 },
      { name: "Linux Environments & Shell", icon: "Server", level: 3 },
      { name: "CMake Build Configuration", icon: "Terminal", level: 3 },
      { name: "High School Calculus & Vectors", icon: "Percent", level: 4 }
    ]
  }
];

export const RECOMMENDATIONS: Recommendation[] = [];
