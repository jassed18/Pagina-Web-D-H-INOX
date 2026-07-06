import React, { useState } from 'react';
import { Product } from '../types';
import { Sliders, CheckCircle, Clock, ChevronDown, ChevronUp, FileText, Settings, HeartHandshake, Eye } from 'lucide-react';

interface ProductCardProps {
  key?: string;
  product: Product;
  onSelectProduct?: (product: Product) => void;
  onInquire?: (productName: string) => void;
}

export default function ProductCard({ product, onSelectProduct, onInquire }: ProductCardProps) {
  const [expanded, setExpanded] = useState(false);

  // Schematic rendering based on category
  const renderSchematic = () => {
    if (product.category === 'marmita') {
      return (
        <svg viewBox="0 0 200 160" className="w-full h-40 max-w-[180px] text-slate-400 drop-shadow-md">
          {/* Stand and frame */}
          <line x1="40" y1="120" x2="160" y2="120" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
          <line x1="55" y1="120" x2="55" y2="60" stroke="#64748b" strokeWidth="8" />
          <line x1="145" y1="120" x2="145" y2="60" stroke="#64748b" strokeWidth="8" />
          
          {/* Kettle Bowl */}
          <rect x="65" y="45" width="70" height="60" rx="20" fill="url(#metalGrad)" stroke="#94a3b8" strokeWidth="3" />
          
          {/* Lid */}
          <path d="M 62,45 C 62,35 138,35 138,45 Z" fill="#64748b" stroke="#cbd5e1" strokeWidth="1.5" />
          <rect x="94" y="27" width="12" height="6" rx="2" fill="#334155" />
          
          {/* Agitator Motor */}
          <rect x="92" y="18" width="16" height="10" fill="#1e293b" rx="1" />
          
          {/* Left pivot and right controller handle */}
          <circle cx="55" cy="70" r="5" fill="#334155" />
          <circle cx="145" cy="70" r="5" fill="#334155" />
          <line x1="145" y1="70" x2="165" y2="55" stroke="#3b82f6" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="165" cy="55" r="4.5" fill="#ef4444" />
          
          {/* Castor wheels */}
          <circle cx="65" cy="126" r="6" fill="#1e293b" />
          <circle cx="135" cy="126" r="6" fill="#1e293b" />

          {/* Gradients */}
          <defs>
            <linearGradient id="metalGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f1f5f9" />
              <stop offset="50%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#64748b" />
            </linearGradient>
          </defs>
        </svg>
      );
    } else {
      // Pass-through schematic
      const cabinetsCount = product.id.includes('3') ? 3 : product.id.includes('2') ? 2 : 1;
      return (
        <svg viewBox="0 0 200 160" className="w-full h-40 max-w-[180px] text-slate-400 drop-shadow-md">
          {/* Outer Frame */}
          <rect x="65" y="15" width="70" height="130" rx="3" fill="url(#metalGrad2)" stroke="#94a3b8" strokeWidth="3" />
          
          {/* Cabinets separation lines */}
          {cabinetsCount === 1 && (
            <>
              {/* Single window */}
              <rect x="74" y="25" width="52" height="110" rx="2" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2" />
              <line x1="74" y1="80" x2="126" y2="80" stroke="#cbd5e1" strokeWidth="1" strokeDasharray="3" /> {/* Optional shelf */}
              {/* Chrome mechanical locks / handles */}
              <circle cx="118" cy="80" r="3" fill="#64748b" />
              <line x1="118" y1="80" x2="118" y2="87" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" />
            </>
          )}

          {cabinetsCount === 2 && (
            <>
              {/* Top window */}
              <rect x="74" y="23" width="52" height="52" rx="2" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2" />
              <circle cx="118" cy="50" r="3" fill="#64748b" />
              <line x1="118" y1="50" x2="118" y2="57" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />

              {/* Bottom window */}
              <rect x="74" y="85" width="52" height="52" rx="2" fill="#0f172a" stroke="#cbd5e1" strokeWidth="2" />
              <circle cx="118" cy="111" r="3" fill="#64748b" />
              <line x1="118" y1="111" x2="118" y2="118" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
            </>
          )}

          {cabinetsCount === 3 && (
            <>
              {/* 3 stacked cabins */}
              <rect x="74" y="21" width="52" height="34" rx="2" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.5" />
              <circle cx="118" cy="38" r="2.5" fill="#64748b" />
              
              <rect x="74" y="63" width="52" height="34" rx="2" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.5" />
              <circle cx="118" cy="80" r="2.5" fill="#64748b" />

              <rect x="74" y="105" width="52" height="34" rx="2" fill="#0f172a" stroke="#cbd5e1" strokeWidth="1.5" />
              <circle cx="118" cy="122" r="2.5" fill="#64748b" />
            </>
          )}

          {/* Top ventilation coupling pipe */}
          <rect x="92" y="5" width="16" height="10" fill="#64748b" stroke="#cbd5e1" strokeWidth="1" />
          <line x1="88" y1="5" x2="112" y2="5" stroke="#475569" strokeWidth="2.5" />

          {/* Gradients */}
          <defs>
            <linearGradient id="metalGrad2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="50%" stopColor="#cbd5e1" />
              <stop offset="100%" stopColor="#475569" />
            </linearGradient>
          </defs>
        </svg>
      );
    }
  };

  return (
    <div className="bento-card overflow-hidden flex flex-col justify-between">
      
      {/* Schematic Illustration Header */}
      <div className="p-6 bg-slate-50 border-b border-slate-100 flex items-center justify-center relative overflow-hidden group">
        
        {/* Decorative blueprint grids */}
        <div className="absolute inset-0 bg-grid-slate/30 pointer-events-none" />
        
        {renderSchematic()}

        <span className={`absolute top-4 right-4 px-2.5 py-0.5 rounded-full text-[9px] font-mono font-bold uppercase tracking-wider ${
          product.category === 'marmita' ? 'bg-orange-100 text-orange-700 border border-orange-200' : 'bg-blue-100 text-blue-700 border border-blue-200'
        }`}>
          {product.category === 'marmita' ? 'Marmitas & Mezcla' : 'Cámara Pass Through'}
        </span>

        {/* Action overlay to simulate */}
        {product.category === 'marmita' && onSelectProduct && (
          <button
            onClick={() => onSelectProduct(product)}
            className="absolute bottom-3 right-3 bg-white/90 hover:bg-slate-900 hover:text-white border border-slate-200 px-2.5 py-1 rounded-lg text-[10px] font-mono text-slate-700 flex items-center gap-1 transition-all shadow-sm"
            title="Abrir en el panel de control simulado"
          >
            <Sliders size={12} className="text-blue-600" />
            Simular Control
          </button>
        )}
      </div>

      {/* Main product card content */}
      <div className="p-6 flex-1 flex flex-col justify-between bg-white">
        
        <div>
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
            {product.status === 'disponible' ? (
              <span className="flex items-center gap-1 text-emerald-600 font-bold uppercase text-[9px]">
                <CheckCircle size={10} /> Entrega Inmediata
              </span>
            ) : (
              <span className="flex items-center gap-1 text-amber-600 font-bold uppercase text-[9px]">
                <Clock size={10} /> Fabricación Bajo Pedido
              </span>
            )}
          </div>

          <h3 className="text-lg font-bold text-slate-900 mt-1 font-sans tracking-tight">{product.name}</h3>
          <p className="text-xs text-blue-600 font-mono font-medium mt-0.5 italic">{product.subtitle}</p>
          
          <p className="text-slate-600 text-xs mt-3 leading-relaxed">{product.description}</p>

          {/* Core Specs Table (Horizontal grids) */}
          <div className="mt-4 pt-3 border-t border-slate-100">
            <h4 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-2">Ficha Técnica Básica</h4>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              {product.specifications.slice(0, 4).map((spec) => (
                <div key={spec.label} className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                  <div className="text-[9px] text-slate-400 font-bold uppercase">{spec.label}</div>
                  <div className="text-slate-800 mt-0.5 font-sans font-semibold line-clamp-1">{spec.value}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Collapsible fully detailed features list (Directly from PDFs) */}
          {expanded && (
            <div className="mt-4 pt-4 border-t border-slate-100 space-y-4 animate-fade-in text-xs">
              
              {/* General specs bullet list */}
              {product.generalSpecs.length > 0 && (
                <div>
                  <h4 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-2">Descripción General</h4>
                  <ul className="space-y-1.5 text-slate-600 list-disc pl-4 leading-relaxed">
                    {product.generalSpecs.map((spec, idx) => (
                      <li key={idx}>{spec}</li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Specific features with titles */}
              {product.features.map((featBlock, idx) => (
                <div key={idx} className="bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <h5 className="font-bold text-slate-800 flex items-center gap-1.5 mb-2 font-mono text-[10px] uppercase">
                    <Settings size={12} className="text-blue-600" />
                    {featBlock.title}
                  </h5>
                  <ul className="space-y-1 text-slate-600 list-inside list-decimal leading-relaxed pl-1">
                    {featBlock.items.map((item, idy) => (
                      <li key={idy} className="pl-1 text-[11px]">{item}</li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Extra technical parameters */}
              {product.specifications.length > 4 && (
                <div>
                  <h4 className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-widest mb-2">Otros Parámetros</h4>
                  <div className="space-y-1 text-slate-600 font-mono">
                    {product.specifications.slice(4).map((spec) => (
                      <div key={spec.label} className="flex justify-between border-b border-slate-100 py-1">
                        <span className="text-slate-400">{spec.label}:</span>
                        <span className="text-slate-800 font-sans">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          )}

        </div>

        {/* Card actions footer */}
        <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-3 bg-white">
          
          <button
            onClick={() => setExpanded(!expanded)}
            className="text-xs font-mono font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5 transition-colors focus:outline-none"
          >
            {expanded ? (
              <>
                <ChevronUp size={14} /> Ocultar Detalles
              </>
            ) : (
              <>
                <ChevronDown size={14} /> Ver Ficha Completa
              </>
            )}
          </button>

          {onInquire && (
            <button
              onClick={() => onInquire(product.name)}
              className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-mono font-bold uppercase tracking-wider shadow-sm hover:shadow transition-all cursor-pointer"
            >
              Cotizar
            </button>
          )}

        </div>

      </div>

    </div>
  );
}
