import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, Power, Flame, RotateCw, RotateCcw, HelpCircle, RefreshCw, Layers, CheckCircle2, Sliders, Play, Pause, Square } from 'lucide-react';

interface Recipe {
  name: string;
  temp: number;
  speed: number;
  timeSec: number;
  doubleAction: boolean;
}

const RECIPES: Recipe[] = [
  { name: 'Arequipe / Dulce de Leche', temp: 98, speed: 75, timeSec: 120, doubleAction: true },
  { name: 'Salsa Boloñesa', temp: 85, speed: 40, timeSec: 90, doubleAction: false },
  { name: 'Mermelada de Fresa', temp: 92, speed: 60, timeSec: 60, doubleAction: false },
  { name: 'Chocolate Industrial', temp: 55, speed: 50, timeSec: 150, doubleAction: true },
  { name: 'Crema Pastelera', temp: 78, speed: 45, timeSec: 80, doubleAction: false }
];

export default function ControlPanelSimulator() {
  const [mode, setMode] = useState<'semi' | 'auto'>('semi');
  
  // General State
  const [isEstopActive, setIsEstopActive] = useState(false);
  const [tiltAction, setTiltAction] = useState<'dwn' | 'off' | 'up'>('off');
  const [tiltAngle, setTiltAngle] = useState(0); // 0 (upright) to 45 (tilted)

  // Semi-Auto Specific
  const [burnerActive, setBurnerActive] = useState(false);
  const [semiMixerDir, setSemiMixerDir] = useState<'rev' | 'off' | 'fwr'>('off');
  const [semiSpeed, setSemiSpeed] = useState<'low' | 'med' | 'high'>('low');
  const [semiTargetTemp, setSemiTargetTemp] = useState(85);
  const [semiCurrentTemp, setSemiCurrentTemp] = useState(24.5);

  // Auto Specific (HMI Screen State)
  const [hmiState, setHmiState] = useState<'stop' | 'running' | 'paused'>('stop');
  const [autoTargetTemp, setAutoTargetTemp] = useState(85);
  const [autoCurrentTemp, setAutoCurrentTemp] = useState(24.5);
  const [autoMixerSpeed, setAutoMixerSpeed] = useState(50); // percentage
  const [autoMixerDir, setAutoMixerDir] = useState<'FWR' | 'REV'>('FWR');
  const [autoTimeLeft, setAutoTimeLeft] = useState(90); // seconds
  const [autoWaterFill, setAutoWaterFill] = useState(false);
  const [autoHeatFault, setAutoHeatFault] = useState(false);
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState<number>(1); // default Salsa Boloñesa

  // Kettle internal simulation values
  const [kettleWaterLevel, setKettleWaterLevel] = useState(20); // 0 to 100
  const [mixerRotation, setMixerRotation] = useState(0);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const simulationRef = useRef<number | null>(null);

  // Mixer Rotation Animation loop
  useEffect(() => {
    let lastTime = performance.now();
    const updateMixer = (time: number) => {
      let speed = 0;
      if (!isEstopActive) {
        if (mode === 'semi') {
          if (semiMixerDir !== 'off') {
            const multi = semiMixerDir === 'fwr' ? 1 : -1;
            const speedVal = semiSpeed === 'low' ? 2 : semiSpeed === 'med' ? 5 : 9;
            speed = speedVal * multi;
          }
        } else {
          if (hmiState === 'running') {
            const multi = autoMixerDir === 'FWR' ? 1 : -1;
            speed = (autoMixerSpeed / 10) * multi;
          }
        }
      }
      if (speed !== 0) {
        setMixerRotation((prev) => (prev + speed) % 360);
      }
      simulationRef.current = requestAnimationFrame(updateMixer);
    };

    simulationRef.current = requestAnimationFrame(updateMixer);
    return () => {
      if (simulationRef.current) cancelAnimationFrame(simulationRef.current);
    };
  }, [mode, semiMixerDir, semiSpeed, hmiState, autoMixerSpeed, autoMixerDir, isEstopActive]);

  // Temperature and Water level simulation physics
  useEffect(() => {
    const interval = setInterval(() => {
      if (isEstopActive) {
        // Temperature cools down
        setSemiCurrentTemp(prev => Math.max(22.5, prev - 0.2));
        setAutoCurrentTemp(prev => Math.max(22.5, prev - 0.2));
        setBurnerActive(false);
        if (mode === 'auto') {
          setHmiState('stop');
          setAutoWaterFill(false);
        }
        return;
      }

      // Handle Tilt Action physics
      setTiltAngle((prev) => {
        if (tiltAction === 'up' && prev > 0) {
          return Math.max(0, prev - 1.5);
        }
        if (tiltAction === 'dwn' && prev < 45) {
          return Math.min(45, prev + 1.5);
        }
        return prev;
      });

      // Semi-auto thermodynamics
      if (burnerActive) {
        setSemiCurrentTemp((prev) => {
          if (prev < semiTargetTemp) {
            return parseFloat((prev + 0.45).toFixed(1));
          } else {
            // fluctuation around set temp
            return parseFloat((semiTargetTemp + (Math.sin(Date.now() / 1000) * 0.3)).toFixed(1));
          }
        });
      } else {
        setSemiCurrentTemp((prev) => Math.max(24.5, parseFloat((prev - 0.15).toFixed(1))));
      }

      // Auto thermodynamics and timers
      if (hmiState === 'running') {
        setAutoCurrentTemp((prev) => {
          if (prev < autoTargetTemp) {
            return parseFloat((prev + 0.6).toFixed(1));
          } else {
            return parseFloat((autoTargetTemp + (Math.sin(Date.now() / 800) * 0.2)).toFixed(1));
          }
        });

        setAutoTimeLeft((prev) => {
          if (prev > 0) {
            return prev - 1;
          } else {
            // Recipe complete
            setHmiState('stop');
            alert('¡Ciclo de receta completado con éxito!');
            return 0;
          }
        });
      } else {
        setAutoCurrentTemp((prev) => Math.max(24.5, parseFloat((prev - 0.2).toFixed(1))));
      }

      // Water filling simulation
      if (autoWaterFill) {
        setKettleWaterLevel((prev) => Math.min(100, prev + 2));
      }
    }, 200);

    return () => clearInterval(interval);
  }, [isEstopActive, burnerActive, semiTargetTemp, hmiState, autoTargetTemp, autoWaterFill, tiltAction, mode]);

  // Handle Recipe Selection
  const applyRecipe = (idx: number) => {
    const r = RECIPES[idx];
    setSelectedRecipeIndex(idx);
    setAutoTargetTemp(r.temp);
    setAutoMixerSpeed(r.speed);
    setAutoTimeLeft(r.timeSec);
  };

  const handleEstopToggle = () => {
    setIsEstopActive(!isEstopActive);
    if (!isEstopActive) {
      // Deactivate active states on E-STOP Press
      setBurnerActive(false);
      setSemiMixerDir('off');
      setHmiState('stop');
      setAutoWaterFill(false);
      setTiltAction('off');
    }
  };

  const resetSimulation = () => {
    setIsEstopActive(false);
    setTiltAngle(0);
    setTiltAction('off');
    setSemiCurrentTemp(24.5);
    setAutoCurrentTemp(24.5);
    setBurnerActive(false);
    setSemiMixerDir('off');
    setHmiState('stop');
    setAutoWaterFill(false);
    setKettleWaterLevel(20);
    applyRecipe(selectedRecipeIndex);
  };

  return (
    <div className="bento-card p-6 lg:p-8 max-w-6xl mx-auto overflow-hidden bg-white">
      
      {/* Header and Mode Selector */}
      <div className="flex flex-col md:flex-row items-center justify-between border-b border-slate-200 pb-6 mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 bg-red-50 text-red-700 text-[10px] font-mono font-bold tracking-wider rounded-full border border-red-100 uppercase">
              Simulador Interactivo
            </span>
            <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-mono font-bold tracking-wider rounded-full border border-blue-100 uppercase">
              Q-BOIL Series
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold font-sans text-slate-900 tracking-tight mt-1">
            Módulo de Control y Operación de Marmita
          </h3>
          <p className="text-slate-600 text-xs md:text-sm mt-0.5">
            Interactúa con los mandos para ver el funcionamiento físico de la marmita y agitación.
          </p>
        </div>

        {/* Mode Selector Tab */}
        <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200 self-center shadow-inner">
          <button
            onClick={() => setMode('semi')}
            className={`px-4 py-2 rounded-xl font-mono text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 ${
              mode === 'semi'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Sliders size={14} />
            Semi-Automática
          </button>
          <button
            onClick={() => setMode('auto')}
            className={`px-4 py-2 rounded-xl font-mono text-xs font-bold tracking-wider uppercase transition-all flex items-center gap-2 ${
              mode === 'auto'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers size={14} />
            Automática (HMI)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Side: Control Panel (Steel texture background) */}
        <div className="lg:col-span-7 bg-gradient-to-b from-slate-200 to-slate-400 text-slate-900 rounded-xl p-5 md:p-6 shadow-lg border border-white/60 relative">
          
          {/* Subtle Stainless Steel Look Overlays */}
          <div className="absolute inset-0 bg-radial-gradient from-white/10 to-transparent pointer-events-none rounded-xl" />
          
          {/* Panel Header */}
          <div className="flex items-center justify-between border-b border-slate-500/50 pb-4 mb-4">
            <span className="font-mono text-xs font-black tracking-widest text-slate-800 uppercase flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              D&H INOX - TABLERO INDUSTRIAL
            </span>
            <button
              onClick={resetSimulation}
              className="px-2 py-1 bg-slate-800 text-white hover:bg-slate-900 rounded-md font-mono text-[10px] uppercase flex items-center gap-1 transition-colors"
            >
              <RefreshCw size={10} /> Reajustar
            </button>
          </div>

          {/* SIMULATOR MODES */}
          
          {/* 1. SEMI AUTOMATIC PANEL */}
          {mode === 'semi' && (
            <div className="space-y-6">
              
              {/* Temperature Digital Controller (Matches PV/SV digital controller pág 7) */}
              <div className="bg-neutral-950 text-red-500 p-4 rounded-lg border-2 border-slate-600 shadow-inner font-mono flex justify-around items-center gap-4">
                <div className="text-center">
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">PV (Actual Temp)</div>
                  <div className="text-3xl font-black text-red-500 tracking-widest drop-shadow-[0_0_8px_rgba(239,68,68,0.5)]">
                    {semiCurrentTemp.toFixed(1)}°C
                  </div>
                </div>
                <div className="h-10 w-px bg-slate-800" />
                <div className="text-center">
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">SV (Set Limit)</div>
                  <div className="flex items-center justify-center gap-2 mt-1">
                    <button
                      onClick={() => setSemiTargetTemp(t => Math.max(25, t - 5))}
                      className="px-1.5 py-0.5 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded text-xs"
                    >
                      ▼
                    </button>
                    <span className="text-xl font-bold text-green-400 drop-shadow-[0_0_6px_rgba(74,222,128,0.4)]">
                      {semiTargetTemp}°C
                    </span>
                    <button
                      onClick={() => setSemiTargetTemp(t => Math.min(150, t + 5))}
                      className="px-1.5 py-0.5 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded text-xs"
                    >
                      ▲
                    </button>
                  </div>
                </div>
              </div>

              {/* Grid of Dials and Selectors */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                
                {/* Burner Selector (Gas Natural) */}
                <div className="bg-slate-300/80 p-3 rounded-lg border border-slate-400 flex flex-col items-center">
                  <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-2">QUEMADOR (Burner)</span>
                  <div className="flex gap-1.5">
                    <button
                      onClick={() => setBurnerActive(false)}
                      className={`px-3 py-1.5 rounded font-mono text-xs font-bold transition-all ${
                        !burnerActive ? 'bg-slate-800 text-white shadow' : 'bg-slate-200 text-slate-600'
                      }`}
                    >
                      OFF
                    </button>
                    <button
                      disabled={isEstopActive}
                      onClick={() => setBurnerActive(true)}
                      className={`px-3 py-1.5 rounded font-mono text-xs font-bold transition-all ${
                        burnerActive ? 'bg-orange-600 text-white shadow animate-pulse' : 'bg-slate-200 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      ON
                    </button>
                  </div>
                </div>

                {/* Agitator Selector (Rev / Off / Fwr) */}
                <div className="bg-slate-300/80 p-3 rounded-lg border border-slate-400 flex flex-col items-center">
                  <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-2">AGITADOR DIR</span>
                  <div className="flex gap-1 bg-slate-400/50 p-0.5 rounded">
                    {(['rev', 'off', 'fwr'] as const).map((dir) => (
                      <button
                        key={dir}
                        disabled={isEstopActive}
                        onClick={() => setSemiMixerDir(dir)}
                        className={`px-2 py-1 rounded font-mono text-[10px] font-bold uppercase transition-all ${
                          semiMixerDir === dir
                            ? 'bg-blue-600 text-white shadow'
                            : 'bg-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {dir}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Agitator Speed (Low / Med / High) */}
                <div className="bg-slate-300/80 p-3 rounded-lg border border-slate-400 flex flex-col items-center">
                  <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-2">VELOCIDAD MEZCLA</span>
                  <div className="flex gap-1 bg-slate-400/50 p-0.5 rounded">
                    {(['low', 'med', 'high'] as const).map((spd) => (
                      <button
                        key={spd}
                        disabled={isEstopActive}
                        onClick={() => setSemiSpeed(spd)}
                        className={`px-2 py-1 rounded font-mono text-[10px] font-bold uppercase transition-all ${
                          semiSpeed === spd
                            ? 'bg-indigo-600 text-white shadow'
                            : 'bg-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        {spd.substring(0, 3)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tilting System (Volteo de Olla) */}
                <div className="bg-slate-300/80 p-3 rounded-lg border border-slate-400 flex flex-col items-center col-span-2 sm:col-span-1">
                  <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-2">VOLTEO (TILT)</span>
                  <div className="flex gap-1 bg-slate-400/50 p-0.5 rounded w-full justify-around">
                    <button
                      disabled={isEstopActive}
                      onMouseDown={() => setTiltAction('dwn')}
                      onMouseUp={() => setTiltAction('off')}
                      onTouchStart={() => setTiltAction('dwn')}
                      onTouchEnd={() => setTiltAction('off')}
                      className={`flex-1 py-1 rounded font-mono text-[10px] font-bold transition-all ${
                        tiltAction === 'dwn' ? 'bg-red-500 text-white' : 'bg-slate-200 text-slate-700'
                      }`}
                      title="Bajar olla para descargar"
                    >
                      DWN ▼
                    </button>
                    <button
                      disabled={isEstopActive}
                      onMouseDown={() => setTiltAction('up')}
                      onMouseUp={() => setTiltAction('off')}
                      onTouchStart={() => setTiltAction('up')}
                      onTouchEnd={() => setTiltAction('off')}
                      className={`flex-1 py-1 rounded font-mono text-[10px] font-bold transition-all ${
                        tiltAction === 'up' ? 'bg-green-600 text-white' : 'bg-slate-200 text-slate-700'
                      }`}
                      title="Subir olla a posición inicial"
                    >
                      UP ▲
                    </button>
                  </div>
                </div>

                {/* Double Action Switch */}
                <div className="bg-slate-300/80 p-3 rounded-lg border border-slate-400 flex flex-col items-center col-span-2">
                  <span className="text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-1.5">DOBLE ACCIÓN (ANCLA + CENTRAL)</span>
                  <p className="text-[9px] text-slate-600 text-center leading-tight mb-2">
                    Activa agitador central independiente para mayor trituración y mezcla.
                  </p>
                  <div className="flex gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" disabled={isEstopActive} className="rounded text-blue-600" />
                      <span className="text-xs font-mono font-bold text-slate-800">Motor Secundario ACTIVO</span>
                    </label>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* 2. AUTOMATIC HMI SCREEN PANEL (Delta Screen pág 10) */}
          {mode === 'auto' && (
            <div className="space-y-4">
              
              {/* Blue glowing screen border */}
              <div className="bg-slate-950 text-emerald-400 rounded-lg p-4 border-4 border-slate-700 shadow-inner font-mono relative overflow-hidden">
                
                {/* Brand watermark inside screen */}
                <div className="absolute right-3 top-3 opacity-15 select-none pointer-events-none">
                  <span className="text-xl font-black text-white italic">D&H INOX</span>
                </div>

                {/* HMI Screen Top Bar */}
                <div className="flex justify-between items-center text-[10px] border-b border-emerald-500/30 pb-2 mb-3 text-slate-400">
                  <span>RECETA: <strong className="text-emerald-400">{RECIPES[selectedRecipeIndex].name}</strong></span>
                  <span>ESTADO: <strong className={hmiState === 'running' ? 'text-green-400 animate-pulse' : 'text-yellow-400'}>{hmiState.toUpperCase()}</strong></span>
                </div>

                {/* Screen Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  
                  {/* Temp Block */}
                  <div className="bg-slate-900/60 p-2 rounded border border-slate-800">
                    <div className="text-[9px] text-slate-400">TEMP (°C)</div>
                    <div className="flex justify-between items-baseline mt-1">
                      <span className="text-xs text-slate-500">PV:</span>
                      <span className="text-lg font-bold text-red-500">{autoCurrentTemp.toFixed(1)}</span>
                    </div>
                    <div className="flex justify-between items-baseline">
                      <span className="text-xs text-slate-500">SET (SV):</span>
                      <span className="text-sm font-bold text-green-400">{autoTargetTemp}</span>
                    </div>
                  </div>

                  {/* Mixer Block */}
                  <div className="bg-slate-900/60 p-2 rounded border border-slate-800">
                    <div className="text-[9px] text-slate-400">AGITADOR / MIXER</div>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-slate-500">VELOCIDAD:</span>
                      <span className="text-sm font-bold text-blue-400">{autoMixerSpeed}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-slate-500">DIRECCIÓN:</span>
                      <button
                        onClick={() => setAutoMixerDir(d => d === 'FWR' ? 'REV' : 'FWR')}
                        className="px-1 bg-slate-800 text-blue-300 rounded text-[10px] border border-blue-500/20"
                      >
                        {autoMixerDir} ⇅
                      </button>
                    </div>
                  </div>

                  {/* Timer Block */}
                  <div className="bg-slate-900/60 p-2 rounded border border-slate-800">
                    <div className="text-[9px] text-slate-400">TIEMPO RESTANTE</div>
                    <div className="text-xl font-bold text-center text-yellow-400 mt-2">
                      {Math.floor(autoTimeLeft / 60)}m {autoTimeLeft % 60}s
                    </div>
                  </div>

                </div>

                {/* Recipe Pre-selector Buttons right on Screen */}
                <div className="mt-4 pt-3 border-t border-slate-800">
                  <div className="text-[9px] text-slate-400 mb-1.5 font-bold uppercase tracking-wide">Cargar Programa Automático:</div>
                  <div className="flex flex-wrap gap-1">
                    {RECIPES.map((recipe, idx) => (
                      <button
                        key={recipe.name}
                        onClick={() => applyRecipe(idx)}
                        className={`px-2 py-1 rounded text-[10px] transition-all ${
                          selectedRecipeIndex === idx
                            ? 'bg-blue-600 text-white font-bold'
                            : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                        }`}
                      >
                        {recipe.name.split(' / ')[0]}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Screen Touch Controls (Start / Stop / Pause) */}
                <div className="mt-4 flex gap-2 justify-end border-t border-slate-800 pt-3">
                  <button
                    onClick={() => setHmiState('running')}
                    disabled={isEstopActive}
                    className={`px-3 py-1 bg-green-700 text-white rounded text-xs font-bold flex items-center gap-1 ${
                      hmiState === 'running' ? 'opacity-50' : 'hover:bg-green-600'
                    }`}
                  >
                    <Play size={10} /> INICIAR
                  </button>
                  <button
                    onClick={() => setHmiState('paused')}
                    className="px-3 py-1 bg-yellow-600 text-white rounded text-xs font-bold flex items-center gap-1 hover:bg-yellow-500"
                  >
                    <Pause size={10} /> PAUSA
                  </button>
                  <button
                    onClick={() => {
                      setHmiState('stop');
                      setAutoTimeLeft(RECIPES[selectedRecipeIndex].timeSec);
                    }}
                    className="px-3 py-1 bg-slate-800 text-slate-300 rounded text-xs font-bold flex items-center gap-1 hover:bg-slate-700"
                  >
                    <Square size={10} /> PARAR
                  </button>
                </div>

              </div>

              {/* Physical/Analog Switches below Screen */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 bg-slate-300/60 p-3 rounded-lg border border-slate-400">
                
                {/* Physical Estop Reset status light */}
                <div className="flex flex-col items-center justify-center p-1.5 bg-slate-200 rounded">
                  <span className="text-[8px] font-bold text-slate-700 uppercase tracking-tight">HEAT FAULT</span>
                  <div className={`w-4 h-4 rounded-full mt-1 border border-slate-500 ${autoHeatFault ? 'bg-red-600 animate-ping' : 'bg-slate-400'}`} />
                </div>

                {/* Llenado de Agua (Water Fill selector switch) */}
                <div className="flex flex-col items-center justify-center p-1.5 bg-slate-200 rounded">
                  <span className="text-[8px] font-bold text-slate-700 uppercase tracking-tight">WATER FILL</span>
                  <button
                    onClick={() => setAutoWaterFill(!autoWaterFill)}
                    className={`mt-1.5 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase transition-all ${
                      autoWaterFill ? 'bg-cyan-600 text-white shadow' : 'bg-slate-300 text-slate-700'
                    }`}
                  >
                    {autoWaterFill ? 'ON' : 'OFF'}
                  </button>
                </div>

                {/* Automatic Tilting Switch */}
                <div className="flex flex-col items-center justify-center p-1.5 bg-slate-200 rounded col-span-2">
                  <span className="text-[8px] font-bold text-slate-700 uppercase tracking-tight">CONTROL DE VOLTEO</span>
                  <div className="flex gap-2 mt-1 w-full justify-center">
                    <button
                      onMouseDown={() => setTiltAction('dwn')}
                      onMouseUp={() => setTiltAction('off')}
                      onTouchStart={() => setTiltAction('dwn')}
                      onTouchEnd={() => setTiltAction('off')}
                      className={`px-2 py-0.5 rounded text-[9px] font-bold ${tiltAction === 'dwn' ? 'bg-red-500 text-white' : 'bg-slate-300 text-slate-700'}`}
                    >
                      ABAJO
                    </button>
                    <button
                      onMouseDown={() => setTiltAction('up')}
                      onMouseUp={() => setTiltAction('off')}
                      onTouchStart={() => setTiltAction('up')}
                      onTouchEnd={() => setTiltAction('off')}
                      className={`px-2 py-0.5 rounded text-[9px] font-bold ${tiltAction === 'up' ? 'bg-green-600 text-white' : 'bg-slate-300 text-slate-700'}`}
                    >
                      ARRIBA
                    </button>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* EMERGENCY STOP BUTTON (CRITICAL SAFETY FEATURE FROM PDF) */}
          <div className="mt-6 pt-4 border-t border-slate-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`w-3.5 h-3.5 rounded-full border border-slate-600 ${isEstopActive ? 'bg-red-600 animate-ping' : 'bg-emerald-500'}`} />
              <span className="font-mono text-xs font-bold text-slate-800">
                {isEstopActive ? 'SISTEMA BLOQUEADO (E-STOP ACTIVO)' : 'SISTEMA SEGURO / OPERATIVO'}
              </span>
            </div>

            {/* Industrial Red Mushroom Button */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-red-700 uppercase tracking-tighter">PARO DE EMERGENCIA</span>
              <button
                onClick={handleEstopToggle}
                className={`w-14 h-14 rounded-full border-4 flex items-center justify-center font-bold font-mono text-xs text-white shadow-2xl transition-all ${
                  isEstopActive
                    ? 'bg-red-600 border-red-300 ring-4 ring-red-500/50 scale-95'
                    : 'bg-red-800 border-red-950 active:bg-red-900 active:scale-95'
                }`}
                title="Pulsar para parar de inmediato"
              >
                E-STOP
              </button>
            </div>
          </div>

        </div>

        {/* Right Side: Visual Kettle Simulation Container */}
        <div className="lg:col-span-5 bg-slate-950 rounded-xl p-5 border border-slate-800 text-white flex flex-col items-center justify-between min-h-[460px] relative">
          
          <div className="absolute top-3 left-3 text-[10px] font-mono text-slate-500 flex items-center gap-1">
            <HelpCircle size={12} />
            <span>Marmita Industrial Acero 304</span>
          </div>

          <div className="text-center w-full mb-2 mt-4">
            <h4 className="text-xs font-mono font-bold text-slate-400 uppercase tracking-widest">
              Vista del Tanque de Cocción
            </h4>
          </div>

          {/* Kettle Drawing Simulated by interactive HTML/CSS/SVG */}
          <div className="relative w-full flex items-center justify-center h-64 mt-4">
            
            {/* Tilt Wrapper */}
            <div
              className="relative transition-transform duration-200"
              style={{
                transform: `rotate(${tiltAngle}deg)`,
                transformOrigin: '50% 60%',
              }}
            >
              
              {/* Burner fire animation */}
              {burnerActive && (
                <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex gap-1 z-10">
                  <motion.div
                    animate={{ y: [0, -8, 0], scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 0.3 }}
                    className="w-4 h-8 bg-gradient-to-t from-red-600 via-orange-500 to-yellow-300 rounded-b-full blur-[1px]"
                  />
                  <motion.div
                    animate={{ y: [0, -12, 0], scale: [1, 1.4, 1] }}
                    transition={{ repeat: Infinity, duration: 0.25, delay: 0.1 }}
                    className="w-5 h-10 bg-gradient-to-t from-red-600 via-orange-500 to-yellow-300 rounded-b-full blur-[1px]"
                  />
                  <motion.div
                    animate={{ y: [0, -8, 0], scale: [1, 1.3, 1] }}
                    transition={{ repeat: Infinity, duration: 0.35, delay: 0.05 }}
                    className="w-4 h-8 bg-gradient-to-t from-red-600 via-orange-500 to-yellow-300 rounded-b-full blur-[1px]"
                  />
                </div>
              )}

              {/* Water filling stream overlay */}
              {autoWaterFill && (
                <div className="absolute -top-10 left-[40%] w-2 h-14 bg-gradient-to-b from-cyan-400 to-blue-500 opacity-80 blur-[0.5px] z-10 animate-pulse" />
              )}

              {/* Stainless Steel Tank Body */}
              <div className="w-44 h-40 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-500 rounded-b-[45px] border-2 border-slate-100 shadow-lg relative overflow-hidden flex flex-col justify-end">
                
                {/* Internal Liquid Simulation */}
                <div
                  className="w-full bg-gradient-to-t from-orange-800 to-orange-600 opacity-90 transition-all duration-300"
                  style={{
                    height: `${kettleWaterLevel}%`,
                  }}
                >
                  {/* Mixer Active Liquid Waves */}
                  {((semiMixerDir !== 'off' && !isEstopActive) || (hmiState === 'running' && !isEstopActive)) && (
                    <motion.div
                      animate={{ x: [-10, 10, -10] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="w-full h-1.5 bg-orange-500/40 rounded-t-full"
                    />
                  )}
                </div>

                {/* Agitador SVG - Rotating inside */}
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-40 h-28 pointer-events-none flex flex-col items-center">
                  
                  {/* Central drive shaft */}
                  <div className="w-1.5 h-16 bg-slate-600" />

                  {/* Agitator Blades representing "Tipo Ancla" with Teflon Scrapers (Pág 11) */}
                  <div
                    className="w-32 h-10 border-b-4 border-x-4 border-slate-700/80 rounded-b-2xl flex justify-between px-2"
                    style={{
                      transform: `rotateY(${mixerRotation}deg)`,
                      transformOrigin: '50% 0%',
                    }}
                  >
                    {/* Teflon scraper representations */}
                    <div className="w-1 h-6 bg-slate-300 rounded-full" />
                    <div className="w-1 h-6 bg-slate-300 rounded-full" />
                  </div>

                  {/* Secondary central blades if Double Action is on */}
                  <div
                    className="absolute top-8 w-16 h-4 bg-slate-800 border-y border-slate-600"
                    style={{
                      transform: `rotateY(${-mixerRotation * 1.5}deg)`,
                      transformOrigin: '50% 50%',
                    }}
                  />

                </div>

                {/* Glossy Highlights on metal */}
                <div className="absolute top-0 left-[20%] w-[1px] h-full bg-white/40" />
                <div className="absolute top-0 right-[25%] w-[1px] h-full bg-white/20" />
              </div>

              {/* Pivot brackets on side */}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-3.5 h-6 bg-slate-500 rounded-l-md border border-slate-400" />
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-3.5 h-6 bg-slate-500 rounded-r-md border border-slate-400" />

            </div>

            {/* Solid Floor Frame/Stand */}
            <div className="absolute bottom-6 w-56 h-3 bg-slate-800 border-b-2 border-slate-600 rounded" />
            <div className="absolute bottom-6 left-[15%] w-3 h-14 bg-slate-700 border-l border-slate-500" />
            <div className="absolute bottom-6 right-[15%] w-3 h-14 bg-slate-700 border-r border-slate-500" />
            
            {/* Castors with lock brakes (Ruedas con freno pág 5) */}
            <div className="absolute bottom-1 left-[12%] w-5 h-5 bg-slate-600 rounded-full border border-slate-400" />
            <div className="absolute bottom-1 right-[12%] w-5 h-5 bg-slate-600 rounded-full border border-slate-400" />
          </div>

          {/* Current Stats readout */}
          <div className="w-full bg-slate-900 border border-slate-800 rounded-lg p-3 text-xs font-mono space-y-1 text-slate-300">
            <div className="flex justify-between">
              <span>ÁNGULO INCLINACIÓN:</span>
              <span className={tiltAngle > 0 ? 'text-orange-400 font-bold' : 'text-emerald-400'}>
                {tiltAngle.toFixed(0)}° {tiltAngle > 0 && '(Descargando...)'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>NIVEL FLUIDO TÉRMICO (GLICERINA):</span>
              <span className="text-emerald-400">ÓPTIMO ✔</span>
            </div>
            <div className="flex justify-between">
              <span>ESTADO AGITACIÓN:</span>
              <span className={((semiMixerDir !== 'off' && !isEstopActive) || (hmiState === 'running' && !isEstopActive)) ? 'text-blue-400 animate-pulse' : 'text-slate-500'}>
                {((semiMixerDir !== 'off' && !isEstopActive) || (hmiState === 'running' && !isEstopActive)) ? 'ACTIVO (ROTANDO)' : 'DETENIDO'}
              </span>
            </div>
            <div className="flex justify-between">
              <span>NIVEL AGUA TANQUE:</span>
              <span>{kettleWaterLevel}%</span>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
