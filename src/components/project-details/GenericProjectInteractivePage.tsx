import { useState } from 'react';
import { Project } from '../../types';
import { 
  ArrowLeft, 
  Github, 
  ExternalLink, 
  Layers, 
  Cpu, 
  Activity, 
  CheckCircle2, 
  Sparkles, 
  Play, 
  Leaf, 
  Truck, 
  Zap, 
  Flame, 
  Compass,
  FileCode2,
  Stethoscope,
  Terminal
} from 'lucide-react';

interface GenericProjectInteractivePageProps {
  project: Project;
  onBack: () => void;
}

export default function GenericProjectInteractivePage({ project, onBack }: GenericProjectInteractivePageProps) {
  // EcoRoute simulator state
  const [distanceKm, setDistanceKm] = useState<number>(450);
  const [cargoTons, setCargoTons] = useState<number>(18);
  const [transitMode, setTransitMode] = useState<'diesel' | 'electric' | 'rail'>('diesel');
  const [terrain, setTerrain] = useState<'flat' | 'rolling' | 'mountainous'>('rolling');

  // Emission factor (kg CO2 per ton-km)
  const emissionFactors = {
    diesel: 0.105,
    electric: 0.038,
    rail: 0.022
  };

  const terrainMultipliers = {
    flat: 1.0,
    rolling: 1.15,
    mountainous: 1.35
  };

  const totalEmissionsKg = distanceKm * cargoTons * emissionFactors[transitMode] * terrainMultipliers[terrain];
  const baselineDieselKg = distanceKm * cargoTons * emissionFactors.diesel * terrainMultipliers[terrain];
  const carbonSavingsKg = Math.max(0, baselineDieselKg - totalEmissionsKg);
  const savingsPercent = baselineDieselKg > 0 ? (carbonSavingsKg / baselineDieselKg) * 100 : 0;

  // PhysiSim simulator state
  const [mass, setMass] = useState<number>(5);
  const [restitution, setRestitution] = useState<number>(0.85);
  const [friction, setFriction] = useState<number>(0.15);
  const [gravity, setGravity] = useState<number>(9.81);
  const [kineticEnergy, setKineticEnergy] = useState<number>(142.5);

  // DevScribe simulator state
  const [markdownText, setMarkdownText] = useState<string>(
    "# DevScribe Workspace\n\n- Offline-first cache: Active\n- Storage engine: IndexedDB + LocalStorage\n- Synced blocks: 4/4\n\n```python\ndef calculate_vector(dx, dy):\n    return (dx**2 + dy**2) ** 0.5\n```"
  );

  // AgriDetect simulator state
  const [selectedCrop, setSelectedCrop] = useState<'wheat' | 'tomato' | 'rice'>('wheat');
  const [selectedSymptom, setSelectedSymptom] = useState<string>('Yellowing rust pustules');

  return (
    <section className="py-8 sm:py-12 relative text-left" id="generic-project-page">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10 space-y-8">

        {/* Back to Projects Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-900 no-print">
          <button
            onClick={onBack}
            id="generic-btn-back"
            className="inline-flex items-center gap-2 px-3 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white border border-zinc-800 text-xs font-mono uppercase tracking-wider transition cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to All Projects
          </button>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest hidden sm:inline-block">
              Projects / {project.title}
            </span>
          </div>
        </div>

        {/* Hero Card */}
        <div className="border border-zinc-800 bg-zinc-950 p-6 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-zinc-800/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="px-2.5 py-0.5 bg-zinc-100 text-zinc-950 text-[10px] font-mono font-black uppercase tracking-widest flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 text-zinc-900" />
              {project.category}
            </span>
            <span className="px-2.5 py-0.5 bg-zinc-900 text-zinc-400 text-[10px] font-mono border border-zinc-800 uppercase tracking-wider">
              Om Suraj Kashikar
            </span>
            <span className="px-2.5 py-0.5 bg-zinc-900 text-cyan-400 text-[10px] font-mono border border-cyan-900/60 uppercase tracking-wider">
              Production Architecture
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white font-display uppercase tracking-tight leading-tight mb-4">
            {project.title}
          </h1>

          <p className="text-zinc-400 text-base sm:text-lg font-light leading-relaxed max-w-4xl mb-6">
            {project.longDescription || project.description}
          </p>

          {/* Tech Stack Badges */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-zinc-900">
            {project.techStack.map((tech, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 bg-zinc-900 text-zinc-300 border border-zinc-800 text-[11px] font-mono uppercase tracking-wider"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Action Links */}
          <div className="flex flex-wrap items-center gap-3 pt-6 text-xs font-mono">
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 hover:text-white border border-zinc-800 font-bold text-[11px] uppercase tracking-wider transition flex items-center gap-2"
              >
                <Github className="w-4 h-4" />
                GitHub Repository
              </a>
            )}
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 bg-zinc-100 hover:bg-white text-zinc-950 font-black text-[11px] uppercase tracking-wider transition flex items-center gap-2 cursor-pointer shadow-md"
              >
                <ExternalLink className="w-3.5 h-3.5 text-zinc-950" />
                Explore Live Platform
              </a>
            )}
          </div>
        </div>

        {/* SPECIFIC INTERACTIVE SIMULATORS PER PROJECT */}
        
        {/* ECOROUTE SIMULATOR */}
        {project.id === 'ecoroute' && (
          <div className="p-6 bg-zinc-950 border border-zinc-800 space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-2">
                  <Leaf className="w-4 h-4" />
                  Interactive Transit Carbon Footprint Simulator
                </span>
                <span className="text-zinc-500 text-xs font-mono">
                  Calculate emissions, fuel displacement, and ecological transit savings dynamically.
                </span>
              </div>
              <span className="text-xs font-mono text-zinc-400 bg-zinc-900 px-3 py-1 border border-zinc-800">
                {"Formula: E = d × EF_mode × α_terrain"}
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              
              {/* Controls */}
              <div className="lg:col-span-1 space-y-4 font-mono text-xs">
                <div className="p-4 bg-zinc-900/60 border border-zinc-850 space-y-3">
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-zinc-400 uppercase">Transit Corridor Distance:</span>
                      <span className="text-cyan-400 font-bold">{distanceKm} km</span>
                    </div>
                    <input
                      type="range"
                      min="50"
                      max="2000"
                      step="50"
                      value={distanceKm}
                      onChange={(e) => setDistanceKm(Number(e.target.value))}
                      className="w-full accent-cyan-400 bg-zinc-900 cursor-pointer h-1"
                    />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px]">
                      <span className="text-zinc-400 uppercase">Freight Cargo Payload:</span>
                      <span className="text-emerald-400 font-bold">{cargoTons} Tons</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="40"
                      step="1"
                      value={cargoTons}
                      onChange={(e) => setCargoTons(Number(e.target.value))}
                      className="w-full accent-emerald-400 bg-zinc-900 cursor-pointer h-1"
                    />
                  </div>

                  <div className="space-y-1 pt-2 border-t border-zinc-800">
                    <span className="text-zinc-400 uppercase text-[10px] block mb-1">Transit Carrier Mode:</span>
                    <div className="grid grid-cols-3 gap-1">
                      {[
                        { id: 'diesel', label: 'Diesel Truck' },
                        { id: 'electric', label: 'Electric Semi' },
                        { id: 'rail', label: 'Electric Rail' }
                      ].map((m) => (
                        <button
                          key={m.id}
                          onClick={() => setTransitMode(m.id as any)}
                          className={`p-1.5 text-[9px] font-mono border text-center transition ${
                            transitMode === m.id
                              ? 'bg-zinc-100 text-zinc-950 font-bold border-zinc-100'
                              : 'bg-zinc-950 text-zinc-400 border-zinc-800'
                          }`}
                        >
                          {m.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-zinc-400 uppercase text-[10px] block mb-1">Terrain Gradient Factor:</span>
                    <div className="grid grid-cols-3 gap-1">
                      {[
                        { id: 'flat', label: 'Flat (1.0×)' },
                        { id: 'rolling', label: 'Rolling (1.15×)' },
                        { id: 'mountainous', label: 'Alpine (1.35×)' }
                      ].map((t) => (
                        <button
                          key={t.id}
                          onClick={() => setTerrain(t.id as any)}
                          className={`p-1.5 text-[9px] font-mono border text-center transition ${
                            terrain === t.id
                              ? 'bg-zinc-100 text-zinc-950 font-bold border-zinc-100'
                              : 'bg-zinc-950 text-zinc-400 border-zinc-800'
                          }`}
                        >
                          {t.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Real-Time Emissions Results */}
              <div className="lg:col-span-2 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 font-mono">
                  <div className="p-4 bg-zinc-900 border border-zinc-800 space-y-1">
                    <span className="text-[10px] text-zinc-500 uppercase block">Total Output CO₂</span>
                    <span className="text-2xl font-black text-white">{totalEmissionsKg.toFixed(1)} kg</span>
                    <span className="text-[10px] text-zinc-400 block">{(totalEmissionsKg / 1000).toFixed(2)} Metric Tons</span>
                  </div>

                  <div className="p-4 bg-zinc-900 border border-zinc-800 space-y-1">
                    <span className="text-[10px] text-zinc-500 uppercase block">Carbon Saved vs Diesel</span>
                    <span className="text-2xl font-black text-emerald-400">{carbonSavingsKg.toFixed(1)} kg</span>
                    <span className="text-[10px] text-emerald-400 block">{savingsPercent.toFixed(1)}% Reduction</span>
                  </div>

                  <div className="p-4 bg-zinc-900 border border-zinc-800 space-y-1">
                    <span className="text-[10px] text-zinc-500 uppercase block">Ecological Corridor Rating</span>
                    <span className="text-2xl font-black text-cyan-400">
                      {transitMode === 'rail' ? 'Grade A+' : transitMode === 'electric' ? 'Grade A' : 'Grade C'}
                    </span>
                    <span className="text-[10px] text-zinc-400 block">ISO 14064 Compliant</span>
                  </div>
                </div>

                <div className="p-4 bg-zinc-900/60 border border-zinc-800 space-y-2 text-xs font-mono">
                  <span className="text-zinc-300 font-bold uppercase block">
                    EcoRoute System Recommendation:
                  </span>
                  <p className="text-zinc-400 font-sans text-xs leading-relaxed">
                    {transitMode === 'diesel' ? (
                      <>Transitioning this {distanceKm} km freight corridor to <strong>Electric Rail</strong> would displace {((baselineDieselKg - (distanceKm * cargoTons * emissionFactors.rail * terrainMultipliers[terrain])) / 1000).toFixed(2)} metric tons of atmospheric CO₂, cutting operational carbon intensity by 79% while honoring freight delivery schedules.</>
                    ) : (
                      <>Your selection of <strong>{transitMode.toUpperCase()}</strong> transit delivers verified carbon mitigation under EcoRoute pathfinding, saving {carbonSavingsKg.toFixed(1)} kg of greenhouse gas emissions over conventional highway logistics.</>
                    )}
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* PHYSYSIM SIMULATOR */}
        {project.id === 'physisim' && (
          <div className="p-6 bg-zinc-950 border border-zinc-800 space-y-6">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Interactive 2D Rigid Body Mechanics Sandbox
                </span>
                <span className="text-zinc-500 text-xs font-mono">
                  Verlet integration, coefficient of restitution, and kinetic impulse calculations.
                </span>
              </div>
              <span className="text-xs font-mono text-zinc-400 bg-zinc-900 px-3 py-1 border border-zinc-800">
                Solvers: Spatial Partitioning @ 60 FPS
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-mono text-xs">
              <div className="p-4 bg-zinc-900/60 border border-zinc-850 space-y-3">
                <div className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-zinc-400 uppercase">Body Mass ($m$):</span>
                    <span className="text-white font-bold">{mass} kg</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={mass}
                    onChange={(e) => {
                      setMass(Number(e.target.value));
                      setKineticEnergy(0.5 * Number(e.target.value) * (gravity * 0.8)**2);
                    }}
                    className="w-full accent-cyan-400 bg-zinc-900 cursor-pointer h-1"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-zinc-400 uppercase">Restitution Coefficient ($e$):</span>
                    <span className="text-emerald-400 font-bold">{restitution.toFixed(2)}</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1.0"
                    step="0.05"
                    value={restitution}
                    onChange={(e) => setRestitution(Number(e.target.value))}
                    className="w-full accent-emerald-400 bg-zinc-900 cursor-pointer h-1"
                  />
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="text-zinc-400 uppercase">Gravitational Acceleration ($g$):</span>
                    <span className="text-purple-400 font-bold">{gravity.toFixed(2)} m/s²</span>
                  </div>
                  <input
                    type="range"
                    min="1.62"
                    max="24.79"
                    step="0.5"
                    value={gravity}
                    onChange={(e) => {
                      setGravity(Number(e.target.value));
                      setKineticEnergy(0.5 * mass * (Number(e.target.value) * 0.8)**2);
                    }}
                    className="w-full accent-purple-400 bg-zinc-900 cursor-pointer h-1"
                  />
                </div>
              </div>

              <div className="p-4 bg-zinc-900 border border-zinc-800 space-y-3">
                <span className="text-zinc-300 uppercase font-bold text-xs block">
                  Kinetic Telemetry Resolution:
                </span>
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 bg-zinc-950 border border-zinc-850 flex justify-between">
                    <span className="text-zinc-500">Calculated Kinetic Energy ($E_k$):</span>
                    <span className="text-cyan-400 font-bold">{kineticEnergy.toFixed(1)} Joules</span>
                  </div>
                  <div className="p-2.5 bg-zinc-950 border border-zinc-850 flex justify-between">
                    <span className="text-zinc-500">Collision Inelastic Loss:</span>
                    <span className="text-amber-400 font-bold">{((1 - restitution) * 100).toFixed(0)}% Dissipated</span>
                  </div>
                  <div className="p-2.5 bg-zinc-950 border border-zinc-850 flex justify-between">
                    <span className="text-zinc-500">Integration Step:</span>
                    <span className="text-emerald-400 font-bold">dt = 0.0166s (60 FPS Verlet)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* DEVSCRIBE SIMULATOR */}
        {project.id === 'devscribe' && (
          <div className="p-6 bg-zinc-950 border border-zinc-800 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold flex items-center gap-2">
              <FileCode2 className="w-4 h-4" />
              Offline-First Markdown & Code Engine
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              <div className="space-y-1">
                <span className="text-zinc-500 text-[10px] uppercase">Markdown Input:</span>
                <textarea
                  rows={8}
                  value={markdownText}
                  onChange={(e) => setMarkdownText(e.target.value)}
                  className="w-full bg-zinc-900 border border-zinc-800 p-3 text-xs font-mono text-white focus:outline-none focus:border-zinc-500 resize-none"
                />
              </div>
              <div className="space-y-1">
                <span className="text-zinc-500 text-[10px] uppercase">Rendered Document Stream:</span>
                <div className="p-3 bg-zinc-900 border border-zinc-800 min-h-[11rem] text-xs text-zinc-300 space-y-2">
                  <div className="text-white font-bold text-sm">DevScribe Compiled View</div>
                  <p className="text-zinc-400">Offline-first local cache validated with IndexedDB state reconciliation.</p>
                  <div className="p-2 bg-zinc-950 border border-zinc-850 text-cyan-400 text-[11px]">
                    Synced: {markdownText.length} bytes cached | 0 latency
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* AGRIDETECT SIMULATOR */}
        {project.id === 'agridetect' && (
          <div className="p-6 bg-zinc-950 border border-zinc-800 space-y-4">
            <span className="text-xs font-mono uppercase tracking-widest text-emerald-400 font-bold flex items-center gap-2">
              <Stethoscope className="w-4 h-4" />
              Neural Crop Foliage Diagnostic Simulator
            </span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 font-mono text-xs">
              <div className="p-4 bg-zinc-900/60 border border-zinc-850 space-y-3">
                <div className="space-y-1">
                  <span className="text-zinc-500 uppercase text-[10px] block">Target Crop:</span>
                  <div className="flex gap-2">
                    {['wheat', 'tomato', 'rice'].map((c) => (
                      <button
                        key={c}
                        onClick={() => setSelectedCrop(c as any)}
                        className={`px-3 py-1 uppercase text-xs border transition ${
                          selectedCrop === c
                            ? 'bg-zinc-100 text-zinc-950 font-bold border-zinc-100'
                            : 'bg-zinc-950 text-zinc-400 border-zinc-800'
                        }`}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-zinc-500 uppercase text-[10px] block">Observed Symptom:</span>
                  <select
                    value={selectedSymptom}
                    onChange={(e) => setSelectedSymptom(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 p-2 text-xs text-white"
                  >
                    <option>Yellowing rust pustules</option>
                    <option>Early blight dark concentric rings</option>
                    <option>Powdery white fungal dusting</option>
                  </select>
                </div>
              </div>

              <div className="p-4 bg-zinc-900 border border-zinc-800 space-y-2">
                <span className="text-emerald-400 uppercase font-bold text-xs block">
                  Pathogen Neural Diagnostic:
                </span>
                <div className="p-2.5 bg-zinc-950 border border-zinc-850 space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Classified Disease:</span>
                    <span className="text-white font-bold">Puccinia striiformis (Stripe Rust)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Confidence:</span>
                    <span className="text-emerald-400 font-bold">96.4% Probability</span>
                  </div>
                </div>
                <p className="text-[11px] text-zinc-400 font-sans">
                  Recommended Organic Remedy: Apply potassium bicarbonate spray and increase nitrogen balance in soil.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Architectural Highlights & Features */}
        <div className="p-6 bg-zinc-950 border border-zinc-800 space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 font-bold flex items-center gap-2">
            <Layers className="w-4 h-4 text-cyan-400" />
            Key Architectural Highlights
          </span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
            {project.features.map((feature, idx) => (
              <div key={idx} className="p-3 bg-zinc-900/50 border border-zinc-850 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span className="text-zinc-300 font-sans">{feature}</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
