import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { HelpCircle, RefreshCw, Layers, CheckCircle2, Play, Pause, Square } from 'lucide-react';

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
  { name: 'Crema Pastelera', temp: 78, speed: 45, timeSec: 80, doubleAction: false },
];

export default function ControlPanelSimulator() {
  // General State
  const [isEstopActive, setIsEstopActive] = useState(false);
  const [tiltAction, setTiltAction] = useState<'dwn' | 'off' | 'up'>('off');
  const [tiltAngle, setTiltAngle] = useState(0); // 0 (upright) to 45 (tilted)

  // Automatic Intelligent Screen State
  const [hmiState, setHmiState] = useState<'stop' | 'running' | 'paused'>('stop');
  const [autoTargetTemp, setAutoTargetTemp] = useState(85);
  const [autoCurrentTemp, setAutoCurrentTemp] = useState(24.5);
  const [autoMixerSpeed, setAutoMixerSpeed] = useState(50);
  const [autoMixerDir, setAutoMixerDir] = useState<'FWR' | 'REV'>('FWR');
  const [autoTimeLeft, setAutoTimeLeft] = useState(90);
  const [autoWaterFill, setAutoWaterFill] = useState(false);
  const [autoHeatFault] = useState(false);
  const [selectedRecipeIndex, setSelectedRecipeIndex] = useState<number>(1);
  const [recipeCompleted, setRecipeCompleted] = useState(false);

  // Kettle internal simulation values
  const [kettleWaterLevel, setKettleWaterLevel] = useState(20);
  const [mixerRotation, setMixerRotation] = useState(0);

  const simulationRef = useRef<number | null>(null);
  const supportsPointerEvents = typeof window !== 'undefined' && 'PointerEvent' in window;

  // Mixer Rotation Animation loop (fallback safe for browsers without requestAnimationFrame)
  useEffect(() => {
    let active = true;
    const raf =
      typeof window !== 'undefined' && window.requestAnimationFrame
        ? window.requestAnimationFrame.bind(window)
        : (cb: FrameRequestCallback) => window.setTimeout(() => cb(Date.now()), 16);
    const cancelRaf =
      typeof window !== 'undefined' && window.cancelAnimationFrame
        ? window.cancelAnimationFrame.bind(window)
        : (id: number) => window.clearTimeout(id);

    const updateMixer = () => {
      if (!active) return;
      if (!isEstopActive && hmiState === 'running') {
        const multi = autoMixerDir === 'FWR' ? 1 : -1;
        const speed = (autoMixerSpeed / 10) * multi;
        if (speed !== 0) {
          setMixerRotation((prev) => (prev + speed) % 360);
        }
      }
      simulationRef.current = raf(updateMixer);
    };

    simulationRef.current = raf(updateMixer);
    return () => {
      active = false;
      if (simulationRef.current !== null) cancelRaf(simulationRef.current);
    };
  }, [hmiState, autoMixerSpeed, autoMixerDir, isEstopActive]);

  // Temperature, timer, tilt and water level simulation physics
  useEffect(() => {
    const interval = setInterval(() => {
      if (isEstopActive) {
        setAutoCurrentTemp((prev) => Math.max(22.5, parseFloat((prev - 0.2).toFixed(1))));
        setHmiState('stop');
        setAutoWaterFill(false);
        return;
      }

      setTiltAngle((prev) => {
        if (tiltAction === 'up' && prev > 0) {
          return Math.max(0, prev - 1.5);
        }
        if (tiltAction === 'dwn' && prev < 45) {
          return Math.min(45, prev + 1.5);
        }
        return prev;
      });

      if (hmiState === 'running') {
        setAutoCurrentTemp((prev) => {
          if (prev < autoTargetTemp) {
            return parseFloat((prev + 0.6).toFixed(1));
          }
          return parseFloat((autoTargetTemp + Math.sin(Date.now() / 800) * 0.2).toFixed(1));
        });

        setAutoTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      } else {
        setAutoCurrentTemp((prev) => Math.max(24.5, parseFloat((prev - 0.2).toFixed(1))));
      }

      if (autoWaterFill) {
        setKettleWaterLevel((prev) => Math.min(100, prev + 2));
      }
    }, 200);

    return () => clearInterval(interval);
  }, [isEstopActive, hmiState, autoTargetTemp, autoWaterFill, tiltAction]);

  // Handle recipe completion cleanly outside state updater (no window.alert)
  useEffect(() => {
    if (hmiState === 'running' && autoTimeLeft === 0) {
      setHmiState('stop');
      setRecipeCompleted(true);
    }
  }, [autoTimeLeft, hmiState]);

  const applyRecipe = (idx: number) => {
    const r = RECIPES[idx];
    setSelectedRecipeIndex(idx);
    setAutoTargetTemp(r.temp);
    setAutoMixerSpeed(r.speed);
    setAutoTimeLeft(r.timeSec);
    setRecipeCompleted(false);
  };

  const handleEstopToggle = () => {
    const next = !isEstopActive;
    setIsEstopActive(next);
    if (next) {
      setHmiState('stop');
      setAutoWaterFill(false);
      setTiltAction('off');
    }
  };

  const resetSimulation = () => {
    setIsEstopActive(false);
    setTiltAngle(0);
    setTiltAction('off');
    setAutoCurrentTemp(24.5);
    setHmiState('stop');
    setAutoWaterFill(false);
    setKettleWaterLevel(20);
    setRecipeCompleted(false);
    applyRecipe(selectedRecipeIndex);
  };

  const getTiltButtonHandlers = (dir: 'dwn' | 'up') => ({
    onPointerDown: () => {
      if (!isEstopActive) setTiltAction(dir);
    },
    onPointerUp: () => setTiltAction('off'),
    onPointerLeave: () => setTiltAction('off'),
    onPointerCancel: () => setTiltAction('off'),
    onMouseDown: () => {
      if (!supportsPointerEvents && !isEstopActive) setTiltAction(dir);
    },
    onMouseUp: () => {
      if (!supportsPointerEvents) setTiltAction('off');
    },
    onMouseLeave: () => {
      if (!supportsPointerEvents) setTiltAction('off');
    },
    onTouchStart: () => {
      if (!supportsPointerEvents && !isEstopActive) setTiltAction(dir);
    },
    onTouchEnd: () => {
      if (!supportsPointerEvents) setTiltAction('off');
    },
    onTouchCancel: () => {
      if (!supportsPointerEvents) setTiltAction('off');
    },
    onBlur: () => setTiltAction('off'),
    onContextMenu: (e: React.MouseEvent) => e.preventDefault(),
  });

  return (
    <div className="bento-card p-6 lg:p-8 max-w-6xl mx-auto overflow-hidden bg-white">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between border-b border-slate-200 pb-6 mb-6 gap-4">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 bg-red-50 text-red-700 text-[10px] font-mono font-bold tracking-wider rounded-full border border-red-100 uppercase">
              Simulador Interactivo
            </span>
            <span className="px-2.5 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-mono font-bold tracking-wider rounded-full border border-blue-100 uppercase">
              Sistema Inteligente DYH
            </span>
          </div>
          <h3 className="text-xl md:text-2xl font-bold font-sans text-slate-900 tracking-tight mt-1">
            Módulo de Control y Operación de Marmita Automática
          </h3>
          <p className="text-slate-600 text-xs md:text-sm mt-0.5">
            Interactúa con la pantalla táctil y mandos automatizados para controlar la cocción y agitación.
          </p>
        </div>

        <div className="flex bg-slate-900 px-4 py-2 rounded-xl text-white font-mono text-xs font-bold tracking-wider uppercase items-center gap-2 shadow-sm">
          <Layers size={14} className="text-blue-400" />
          Marmita Automática
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Side: Control Panel */}
        <div className="lg:col-span-7 bg-gradient-to-b from-slate-200 to-slate-400 text-slate-900 rounded-xl p-5 md:p-6 shadow-lg border border-white/60 relative">
          {/* Subtle Stainless Steel Look Overlay */}
          <div
            className="absolute inset-0 pointer-events-none rounded-xl"
            style={{ background: 'radial-gradient(circle at top left, rgba(255, 255, 255, 0.25), transparent 70%)' }}
          />

          {/* Panel Header */}
          <div className="relative flex items-center justify-between border-b border-slate-500/50 pb-4 mb-4">
            <span className="font-mono text-xs font-black tracking-widest text-slate-800 uppercase flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              D&amp;H INOX - SISTEMA INTELIGENTE
            </span>
            <button
              type="button"
              onClick={resetSimulation}
              className="px-2 py-1 bg-slate-800 text-white hover:bg-slate-900 rounded-md font-mono text-[10px] uppercase flex items-center gap-1 transition-colors"
            >
              <RefreshCw size={10} /> Reajustar
            </button>
          </div>

          {/* AUTOMATIC TOUCH SCREEN PANEL */}
          <div className="relative space-y-4">
            <div className="bg-slate-950 text-emerald-400 rounded-lg p-4 border-4 border-slate-700 shadow-inner font-mono relative overflow-hidden">
              <div className="absolute right-3 top-3 opacity-15 select-none pointer-events-none">
                <span className="text-xl font-black text-white italic">D&amp;H INOX</span>
              </div>

              <div className="flex justify-between items-center text-[10px] border-b border-emerald-500/30 pb-2 mb-3 text-slate-400">
                <span>RECETA: <strong className="text-emerald-400">{RECIPES[selectedRecipeIndex].name}</strong></span>
                <span>ESTADO: <strong className={hmiState === 'running' ? 'text-green-400 animate-pulse' : 'text-yellow-400'}>{hmiState.toUpperCase()}</strong></span>
              </div>

              {recipeCompleted && (
                <div className="mb-3 px-3 py-2 bg-emerald-900/50 border border-emerald-500/40 rounded text-[11px] text-emerald-300 flex items-center justify-between gap-2 animate-fade-in">
                  <span className="flex items-center gap-1.5 font-bold">
                    <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                    ¡Ciclo de receta completado con éxito!
                  </span>
                  <button
                    type="button"
                    onClick={() => applyRecipe(selectedRecipeIndex)}
                    className="px-2 py-0.5 bg-emerald-700 hover:bg-emerald-600 text-white rounded text-[10px]"
                  >
                    Reiniciar
                  </button>
                </div>
              )}

              {/* Screen Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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

                <div className="bg-slate-900/60 p-2 rounded border border-slate-800">
                  <div className="text-[9px] text-slate-400">AGITADOR / MIXER</div>
                  <div className="flex justify-between items-center mt-1">
                    <span className="text-xs text-slate-500">VELOCIDAD:</span>
                    <span className="text-sm font-bold text-blue-400">{autoMixerSpeed}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-500">DIRECCIÓN:</span>
                    <button
                      type="button"
                      onClick={() => setAutoMixerDir((d) => (d === 'FWR' ? 'REV' : 'FWR'))}
                      className="px-1.5 py-0.5 bg-slate-800 text-blue-300 rounded text-[10px] border border-blue-500/20"
                    >
                      {autoMixerDir} &#8645;
                    </button>
                  </div>
                </div>

                <div className="bg-slate-900/60 p-2 rounded border border-slate-800">
                  <div className="text-[9px] text-slate-400">TIEMPO RESTANTE</div>
                  <div className="text-xl font-bold text-center text-yellow-400 mt-2">
                    {Math.floor(autoTimeLeft / 60)}m {autoTimeLeft % 60}s
                  </div>
                </div>
              </div>

              {/* Recipe Pre-selector Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-800">
                <div className="text-[9px] text-slate-400 mb-1.5 font-bold uppercase tracking-wide">Cargar Programa Automático:</div>
                <div className="flex flex-wrap gap-1">
                  {RECIPES.map((recipe, idx) => (
                    <button
                      type="button"
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

              {/* Screen Touch Controls (Start / Pause / Stop) */}
              <div className="mt-4 flex flex-wrap gap-2 justify-end border-t border-slate-800 pt-3">
                <button
                  type="button"
                  onClick={() => {
                    if (autoTimeLeft === 0) {
                      setAutoTimeLeft(RECIPES[selectedRecipeIndex].timeSec);
                    }
                    setRecipeCompleted(false);
                    setHmiState('running');
                  }}
                  disabled={isEstopActive}
                  className={`px-3 py-1 bg-green-700 text-white rounded text-xs font-bold flex items-center gap-1 ${
                    hmiState === 'running' || isEstopActive ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'
                  }`}
                >
                  <Play size={10} /> INICIAR
                </button>
                <button
                  type="button"
                  onClick={() => setHmiState('paused')}
                  className="px-3 py-1 bg-yellow-600 text-white rounded text-xs font-bold flex items-center gap-1 hover:bg-yellow-500"
                >
                  <Pause size={10} /> PAUSA
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setHmiState('stop');
                    setRecipeCompleted(false);
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
              <div className="flex flex-col items-center justify-center p-1.5 bg-slate-200 rounded">
                <span className="text-[8px] font-bold text-slate-700 uppercase tracking-tight">HEAT FAULT</span>
                <div className={`w-4 h-4 rounded-full mt-1 border border-slate-500 ${autoHeatFault ? 'bg-red-600 animate-ping' : 'bg-slate-400'}`} />
              </div>

              <div className="flex flex-col items-center justify-center p-1.5 bg-slate-200 rounded">
                <span className="text-[8px] font-bold text-slate-700 uppercase tracking-tight">WATER FILL</span>
                <button
                  type="button"
                  onClick={() => {
                    if (!isEstopActive) setAutoWaterFill(!autoWaterFill);
                  }}
                  className={`mt-1.5 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase transition-all ${
                    autoWaterFill ? 'bg-cyan-600 text-white shadow' : 'bg-slate-300 text-slate-700'
                  }`}
                >
                  {autoWaterFill ? 'ON' : 'OFF'}
                </button>
              </div>

              <div className="flex flex-col items-center justify-center p-1.5 bg-slate-200 rounded col-span-2">
                <span className="text-[8px] font-bold text-slate-700 uppercase tracking-tight">CONTROL DE VOLTEO (Mantener)</span>
                <div className="flex gap-2 mt-1 w-full justify-center">
                  <button
                    type="button"
                    {...getTiltButtonHandlers('dwn')}
                    className={`px-2.5 py-1 rounded text-[9px] font-bold select-none touch-none ${
                      tiltAction === 'dwn' ? 'bg-red-500 text-white' : 'bg-slate-300 text-slate-700'
                    }`}
                  >
                    ABAJO
                  </button>
                  <button
                    type="button"
                    {...getTiltButtonHandlers('up')}
                    className={`px-2.5 py-1 rounded text-[9px] font-bold select-none touch-none ${
                      tiltAction === 'up' ? 'bg-green-600 text-white' : 'bg-slate-300 text-slate-700'
                    }`}
                  >
                    ARRIBA
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* EMERGENCY STOP BUTTON */}
          <div className="relative mt-6 pt-4 border-t border-slate-500/30 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`w-3.5 h-3.5 rounded-full border border-slate-600 ${isEstopActive ? 'bg-red-600 animate-ping' : 'bg-emerald-500'}`} />
              <span className="font-mono text-xs font-bold text-slate-800">
                {isEstopActive ? 'SISTEMA BLOQUEADO (E-STOP ACTIVO)' : 'SISTEMA SEGURO / OPERATIVO'}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono font-bold text-red-700 uppercase tracking-tighter">PARO DE EMERGENCIA</span>
              <button
                type="button"
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

          {/* Kettle Drawing */}
          <div className="relative w-full flex items-center justify-center h-64 mt-4">
            <div
              className="relative transition-transform duration-200"
              style={{
                transform: `rotate(${tiltAngle}deg)`,
                transformOrigin: '50% 60%',
              }}
            >
              {autoWaterFill && (
                <div className="absolute -top-10 left-[40%] w-2 h-14 bg-gradient-to-b from-cyan-400 to-blue-500 opacity-80 blur-[0.5px] z-10 animate-pulse" />
              )}

              {/* Stainless Steel Tank Body */}
              <div className="w-44 h-40 bg-gradient-to-r from-slate-400 via-slate-200 to-slate-500 rounded-b-[45px] border-2 border-slate-100 shadow-lg relative overflow-hidden flex flex-col justify-end">
                {/* Internal Liquid Simulation */}
                <div
                  className="w-full bg-gradient-to-t from-orange-800 to-orange-600 opacity-90 transition-all duration-300"
                  style={{ height: `${kettleWaterLevel}%` }}
                >
                  {hmiState === 'running' && !isEstopActive && (
                    <motion.div
                      animate={{ x: [-10, 10, -10] }}
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="w-full h-1.5 bg-orange-500/40 rounded-t-full"
                    />
                  )}
                </div>

                {/* Agitador rotating inside */}
                <div
                  className="absolute top-2 left-1/2 -translate-x-1/2 w-40 h-28 pointer-events-none flex flex-col items-center"
                  style={{ perspective: '600px' }}
                >
                  <div className="w-1.5 h-16 bg-slate-600" />
                  <div
                    className="w-32 h-10 border-b-4 border-x-4 border-slate-700/80 rounded-b-2xl flex justify-between px-2"
                    style={{
                      transform: `rotateY(${mixerRotation}deg)`,
                      transformOrigin: '50% 0%',
                    }}
                  >
                    <div className="w-1 h-6 bg-slate-300 rounded-full" />
                    <div className="w-1 h-6 bg-slate-300 rounded-full" />
                  </div>
                  <div
                    className="absolute top-8 w-16 h-4 bg-slate-800 border-y border-slate-600"
                    style={{
                      transform: `rotateY(${-mixerRotation * 1.5}deg)`,
                      transformOrigin: '50% 50%',
                    }}
                  />
                </div>

                <div className="absolute top-0 left-[20%] w-[1px] h-full bg-white/40" />
                <div className="absolute top-0 right-[25%] w-[1px] h-full bg-white/20" />
              </div>

              {/* Pivot brackets */}
              <div className="absolute -left-3 top-1/2 -translate-y-1/2 w-3.5 h-6 bg-slate-500 rounded-l-md border border-slate-400" />
              <div className="absolute -right-3 top-1/2 -translate-y-1/2 w-3.5 h-6 bg-slate-500 rounded-r-md border border-slate-400" />
            </div>

            {/* Floor Frame/Stand */}
            <div className="absolute bottom-6 w-56 h-3 bg-slate-800 border-b-2 border-slate-600 rounded" />
            <div className="absolute bottom-6 left-[15%] w-3 h-14 bg-slate-700 border-l border-slate-500" />
            <div className="absolute bottom-6 right-[15%] w-3 h-14 bg-slate-700 border-r border-slate-500" />
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
              <span className="text-emerald-400 flex items-center gap-1">
                ÓPTIMO <CheckCircle2 size={12} />
              </span>
            </div>
            <div className="flex justify-between">
              <span>ESTADO AGITACIÓN:</span>
              <span className={hmiState === 'running' && !isEstopActive ? 'text-blue-400 animate-pulse' : 'text-slate-500'}>
                {hmiState === 'running' && !isEstopActive ? 'ACTIVO (ROTANDO)' : 'DETENIDO'}
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
