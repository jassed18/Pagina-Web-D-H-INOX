import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, MapPin, Send, MessageCircle, CheckCircle } from 'lucide-react';
import { Product } from '../types';

interface ContactSectionProps {
  products: Product[];
}

export default function ContactSection({ products }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    productInterest: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Save message to localStorage so Admin can read it!
    const existingMessagesJson = localStorage.getItem('dh_contact_messages');
    const existingMessages = existingMessagesJson ? JSON.parse(existingMessagesJson) : [];
    
    const newMessage = {
      id: 'msg-' + Date.now(),
      ...formData,
      createdAt: new Date().toISOString(),
      status: 'nuevo'
    };

    localStorage.setItem('dh_contact_messages', JSON.stringify([newMessage, ...existingMessages]));

    setIsSubmitted(true);
    setFormData({
      name: '',
      email: '',
      phone: '',
      productInterest: '',
      message: '',
    });

    // Auto clear success alert after 5 seconds
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <section id="contacto" className="py-16 px-4 md:px-8 bg-slate-100/50 border-t border-slate-200">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-600">
            Atención Inmediata
          </span>
          <h2 className="text-3xl font-bold font-sans text-slate-900 mt-1 tracking-tight">
            Contáctanos hoy mismo
          </h2>
          <p className="text-slate-600 text-sm mt-2">
            Nuestros ingenieros especializados te asesorarán en el diseño y cotización de equipos industriales a la medida de tu empresa.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Quick Contact & Info Grid (Left Side) */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-6">
            
            {/* Quick Contact Cards */}
            <div className="space-y-4">
              
              {/* WhatsApp direct link card */}
              <a
                href="https://wa.me/573212749981?text=Hola%20D%26H%20Inox,%20quisiera%20solicitar%20asesor%C3%ADa%20acerca%20de%20sus%20productos."
                target="_blank"
                rel="noreferrer"
                className="group flex items-center gap-4 bg-emerald-50/70 border border-emerald-100 hover:border-emerald-300 rounded-2xl p-4 transition-all duration-300 shadow-sm"
              >
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform shrink-0">
                  <MessageCircle size={24} className="fill-white" />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-emerald-700 uppercase tracking-widest font-bold">WhatsApp Directo</div>
                  <div className="text-slate-900 font-bold text-base mt-0.5 group-hover:text-emerald-600 transition-colors">+57 321 2749981</div>
                  <div className="text-slate-600 text-xs">Asesoría técnica y cotizaciones inmediatas</div>
                </div>
              </a>

              {/* Teléfono Fijo card */}
              <a
                href="tel:6016786020"
                className="group flex items-center gap-4 bg-blue-50/70 border border-blue-100 hover:border-blue-300 rounded-2xl p-4 transition-all duration-300 shadow-sm"
              >
                <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-blue-700 uppercase tracking-widest font-bold">Línea Fija Bogotá</div>
                  <div className="text-slate-900 font-bold text-base mt-0.5 group-hover:text-blue-600 transition-colors">(601) 678 6020</div>
                  <div className="text-slate-600 text-xs">Atención de Lunes a Viernes de 8:00 AM a 5:30 PM</div>
                </div>
              </a>

              {/* Correo Electrónico card */}
              <a
                href="mailto:dyhsteelsas@hotmail.com"
                className="group flex items-center gap-4 bg-red-50/70 border border-red-100 hover:border-red-300 rounded-2xl p-4 transition-all duration-300 shadow-sm"
              >
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-red-700 uppercase tracking-widest font-bold">Correo Corporativo</div>
                  <div className="text-slate-900 font-bold text-sm mt-0.5 break-all group-hover:text-red-600 transition-colors">dyhsteelsas@hotmail.com</div>
                  <div className="text-slate-600 text-xs">Envíenos sus planos o requerimientos técnicos</div>
                </div>
              </a>

              {/* Dirección Física */}
              <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-2xl p-4 shadow-sm">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center text-slate-700 shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-bold">Planta de Fabricación</div>
                  <div className="text-slate-900 font-bold text-sm mt-0.5">Calle 181 b # 8 - 57</div>
                  <div className="text-slate-600 text-xs">Bogotá, Colombia</div>
                </div>
              </div>

            </div>

            {/* Informational Note */}
            <div className="p-4 bg-white rounded-2xl border border-slate-200 text-xs text-slate-600 leading-relaxed shadow-sm">
              <strong className="text-slate-900">Garantía de Calidad:</strong> Todas nuestras marmitas y pass-through se fabrican bajo estrictas normas de bioseguridad, utilizando soldaduras sanitarias TIG de penetración completa y pulido espejo en bordes internos para evitar acumulaciones patógenas.
            </div>

          </div>

          {/* Form Section (Right Side) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 md:p-8 relative overflow-hidden shadow-sm">
            
            {/* Header Form */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900">Formulario de Solicitud de Cotización</h3>
              <p className="text-slate-600 text-xs mt-1">
                Diligencie este formulario para recibir una propuesta formal y personalizada.
              </p>
            </div>

            {/* Success message animation */}
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl flex items-center gap-3 text-xs"
                >
                  <CheckCircle size={18} className="text-emerald-600 shrink-0" />
                  <div>
                    <strong className="font-bold">¡Mensaje Enviado con éxito!</strong>
                    <p className="text-[11px] text-emerald-700 mt-0.5">
                      Su requerimiento ha sido registrado. Un asesor técnico se comunicará con usted en menos de 24 horas hábiles.
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Main Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Nombre o Empresa *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ej. Alimentos del Valle S.A.S."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                    Número de Contacto
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="Ej. +57 300 123 4567"
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Correo Electrónico *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="compras@empresa.com"
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Equipo de Interés
                </label>
                <select
                  value={formData.productInterest}
                  onChange={(e) => setFormData({ ...formData, productInterest: e.target.value })}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-800 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-colors"
                >
                  <option value="">-- Seleccionar equipo (opcional) --</option>
                  {products.map((prod) => (
                    <option key={prod.id} value={prod.name}>
                      {prod.name}
                    </option>
                  ))}
                  <option value="Diseño Especial Personalizado">Diseño Especial Personalizado</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Mensaje / Requerimientos Técnicos *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Por favor, detalle la capacidad requerida (galones o cabinas), tipo de calentamiento preferido y cualquier especificación especial..."
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-slate-950 hover:bg-slate-800 text-white font-mono uppercase tracking-wider text-xs font-bold py-3 px-4 rounded-xl shadow-md transition-all duration-300 flex items-center justify-center gap-2 mt-4 cursor-pointer"
              >
                <Send size={14} />
                Enviar Requerimiento
              </button>

            </form>

          </div>

        </div>
      </div>
    </section>
  );
}
