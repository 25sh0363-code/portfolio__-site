export interface ResearchPaperData {
  paperTitle: string;
  subtitle: string;
  author: string;
  institution: string;
  githubRepo: string;
  abstract: string;
  researchQuestion: string;
  dataset: {
    name: string;
    tokenizer: string;
    vocabSize: number;
    storageType: string;
    contextLength: number;
    totalTrainingTokens: string;
    tokenShards: string[];
  };
  architecture: {
    modelType: string;
    vocabSize: number;
    contextLength: number;
    transformerBlocks: number;
    attentionHeads: number;
    embeddingDim: number;
    headDim: number;
    mlpHiddenWidth: number;
    positionalEmbeddings: string;
    activation: string;
    normalization: string;
    dropout: number;
    weightTying: string;
  };
  hardware: {
    gpu: string;
    cuda: string;
    driver: string;
    pythonVersion: string;
    pyTorchVersion: string;
    libTorchVersion: string;
    compiler: string;
    cmake: string;
    cloudProvider: string;
  };
  benchmarks: {
    training: {
      cppRange: string;
      pythonRange: string;
      cppMidpoint: number;
      pythonMidpoint: number;
      speedup: string;
      percentage: string;
      note: string;
    };
    inference: {
      cppRuns: { throughput: number; time: number }[];
      pythonRuns: { throughput: number; time: number }[];
      cppMedian: number;
      pythonMedian: number;
      speedup: string;
      percentage: string;
    };
    memory: {
      ram: { cpp: number; python: number; reduction: string };
      gpu: { cpp: number; python: number; reduction: string };
    };
    validationLoss: {
      step: number;
      python: number;
      cpp: number;
    }[];
    bestValLoss: {
      python: { loss: number; step: string };
      cpp: { loss: number; step: string };
    };
  };
  qualitative: {
    prompt: string;
    python: {
      output: string;
      tokens: number;
      time: number;
      rate: number;
      ram: number;
      gpu: number;
    };
    cpp: {
      output: string;
      tokens: number;
      time: number;
      rate: number;
      ram: number;
      gpu: number;
    };
  };
  reproduction: {
    python: string[];
    cpp: string[];
  };
  limitations: string[];
  references: { id: number; citation: string; link?: string }[];
  acknowledgments: string;
}

export interface Seq2SeqTranslationDetails {
  architecture: {
    modelType: string;
    dModel: number;
    encoderLayers: number;
    decoderLayers: number;
    attentionHeads: number;
    dK: number;
    dFF: number;
    dropout: number;
    positionalEncoding: string;
    normalization: string;
    activation: string;
    parameterCount: string;
    fromScratchNotice: string;
  };
  dataset: {
    name: string;
    source: string;
    totalSentencePairs: number;
    trainPairs: number;
    valPairs: number;
    tokenizer: string;
    maxSequenceLength: number;
  };
  training: {
    hardware: string;
    epochs: number;
    batchSize: number;
    optimizer: string;
    learningRate: string;
    labelSmoothing: number;
    initialLoss: number;
    finalLoss: number;
    finalBleu: number;
  };
  lossProgression: {
    epoch: number;
    trainLoss: number;
    valLoss?: number;
    learningPhase: string;
  }[];
  validationEpochsLoss: {
    epoch: number;
    loss: number;
  }[];
  sampleTranslations: {
    id: number;
    sourceEn: string;
    targetPtRef: string;
    predictedPt: string;
    analysis: string;
  }[];
  attentionMapExample: {
    inputSentence: string;
    sourceTokens: string[];
    targetTokens: string[];
    matrix: number[][]; // [targetIdx][sourceIdx]
    layerHead: string;
  };
  decodingStrategies: {
    name: string;
    beamSize?: number;
    description: string;
    characteristics: string;
    sampleOutput: string;
  }[];
  limitations: string[];
  projectStructure: { file: string; description: string }[];
  reproduction: {
    requirements: string[];
    commands: string[];
  };
}

export interface CharLevelBigramDetails {
  comparativeMatrix: {
    metric: string;
    bigramBaseline: string;
    transformerImproved: string;
    delta: string;
  }[];
  dataset: {
    name: string;
    source: string;
    totalCharacters: number;
    uniqueCharacters: number;
    charactersList: string;
  };
  baselineModel: {
    name: string;
    parameters: string;
    contextSize: number;
    architectureType: string;
    crossEntropyLoss: number;
    generationPeculiarity: string;
    sampleOutput: string;
  };
  improvedModel: {
    name: string;
    parameters: string;
    contextSize: number;
    layers: number;
    attentionHeads: number;
    embeddingDim: number;
    crossEntropyLoss: number;
    trainingHardware: string;
    trainingDuration: string;
    sampleOutput: string;
  };
  samplingTemperatures: {
    temp: number;
    setting: string;
    generatedText: string;
    linguisticAnalysis: string;
  }[];
  trainingLossCurve: {
    step: number;
    trainLoss: number;
    valLoss: number;
  }[];
  reproduction: {
    requirements: string[];
    commands: string[];
  };
}

export interface SinovateScreenshot {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  iconName: string;
  imagePath?: string;
  highlights: string[];
  mockData: {
    header: string;
    subHeader: string;
    items: {
      title: string;
      tag?: string;
      desc?: string;
      status?: string;
      meta?: string;
    }[];
    extraDetails?: string;
  };
}

export interface SinovateDetails {
  youtubeVideoId: string;
  youtubeUrl: string;
  githubRepo: string;
  tagline: string;
  overview: string;
  architecture: {
    mobileClient: string;
    backendApi: string;
    aiWorkflows: string;
    retrieval: string;
    persistence: string;
    cloudSync: string;
  };
  features: {
    title: string;
    description: string;
    category: 'AI-Powered Learning' | 'Guided Learning' | 'Study Tools' | 'Tracking & Insights' | 'Platform';
    iconName: string;
  }[];
  screenshots: SinovateScreenshot[];
  ragPipeline: {
    step: number;
    name: string;
    description: string;
    tech: string;
  }[];
  examSubjects: string[];
  questionTypes: string[];
  reproduction: {
    backend: string[];
    flutter: string[];
    environment: { key: string; required: boolean; desc: string }[];
  };
}

export interface DiseaseTrackerDetails {
  githubRepo: string;
  diseases: string[];
  countries: string[];
  dataCoverage: string;
  totalDataPoints: string;
  csvFilesCount: number;
  features: {
    id: string;
    title: string;
    description: string;
    category: string;
    iconName: string;
    metrics?: { label: string; val: string }[];
  }[];
  mlModels: {
    name: string;
    algorithm: string;
    forecastHorizon: string;
    metrics: string;
    description: string;
  }[];
  sampleData: {
    disease: string;
    country: string;
    totalCases: string;
    annualAvg: string;
    peakYear: string;
    trend: string;
    yearlyTrend: { year: number; cases: number; deaths: number; predicted?: number }[];
  }[];
  reproduction: {
    prerequisites: string[];
    localSetup: string[];
    dockerSetup: string[];
    environment: { key: string; required: boolean; desc: string }[];
  };
}

export interface SomunDetails {
  conferenceDates: string;
  venue: string;
  role: string;
  contactEmail: string;
  githubRepo: string;
  chambers: {
    code: string;
    name: string;
    category: string;
    agenda: string;
    description: string;
  }[];
  registrationSteps: {
    step: number;
    title: string;
    desc: string;
    highlights: string[];
  }[];
  portalHighlights: {
    title: string;
    description: string;
    icon: string;
  }[];
  itinerary: {
    day: string;
    date: string;
    events: string[];
  }[];
}

export interface TedxScreenshot {
  id: string;
  title: string;
  category: string;
  imagePath: string;
  description: string;
  highlights?: string[];
}

export interface TedxDetails {
  githubRepoCheckin: string;
  githubRepoMain: string;
  backendTech: string;
  tagline: string;
  overview: string;
  features: {
    title: string;
    description: string;
    icon: string;
  }[];
  screenshots: TedxScreenshot[];
  architecture: {
    component: string;
    description: string;
    tech: string;
  }[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  techStack: string[];
  category: 'Full-Stack' | 'AI & Data Science' | 'Systems & Mobile' | 'Web App';
  githubLink?: string;
  liveLink?: string;
  features: string[];
  image: string;
  isResearchPaper?: boolean;
  paperData?: ResearchPaperData;
  translationDetails?: Seq2SeqTranslationDetails;
  charBigramDetails?: CharLevelBigramDetails;
  sinovateDetails?: SinovateDetails;
  diseaseTrackerDetails?: DiseaseTrackerDetails;
  somunDetails?: SomunDetails;
  tedxDetails?: TedxDetails;
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issuerOrg: 'Kaggle' | 'Google Cloud' | 'IBM' | 'Coursera' | 'Plaksha University' | 'IIIT Hyderabad' | 'SOMUN' | 'TEDx' | 'CII / Young Indians' | 'Other';
  recipient: string;
  date: string;
  imageUrl: string;
  pdfUrl?: string;
  instructors?: string[];
  verificationUrl?: string;
  verificationId?: string;
  skills: string[];
  description: string;
  certificateType: 'kaggle' | 'google-cloud' | 'ibm' | 'plaksha' | 'iiit-hyderabad' | 'somun' | 'tedx' | 'young-indians' | 'general';
}

export interface Recommendation {
  id: string;
  writerName: string;
  writerTitle: string;
  organization: string;
  relationship: string;
  letterContent: string;
  date: string;
  tags: string[];
  isFeatured?: boolean;
}

export interface ResumeItem {
  id: string;
  role: string;
  organization: string;
  location: string;
  period: string;
  highlights: string[];
  category: 'education' | 'experience' | 'extracurricular' | 'awards';
}

export interface SkillCategory {
  category: string;
  skills: { name: string; icon: string; level: number }[]; // Level from 1-5
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
}
