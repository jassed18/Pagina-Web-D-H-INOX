import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Phone, Mail, MapPin, Send, MessageCircle, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { ContactMessage, Product } from '../types';
import { safeParseJSON, safeStorage } from '../utils/browser';

const TARGET_EMAIL = 'dyhinoxsas@hotmail.com';

interface ContactSectionProps {
  products: Product[];
  preselectedProduct?: { name: string; trigger: number } | null;
}

export default function ContactSection({ products, preselectedProduct }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    productInterest: '',
    message: '',
  });
  const [isSending, setIsSending] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [fallbackMailtoUrl, setFallbackMailtoUrl] = useState<string | null>(null);

  useEffect(() => {
    if (preselectedProduct?.name) {
      setFormData((prev) => ({
        ...prev,
        productInterest: preselectedProduct.name,
      }));
    }
  }, [preselectedProduct]);

  const buildMailtoLink = (data: typeof formData) => {
    const subject = `Solicitud de Cotización D&H INOX SAS - ${data.name}`;
    const body = [
      `Nombre / Empresa: ${data.name}`,
      `Correo: ${data.email}`,
      `Teléfono: ${data.phone || 'No especificado'}`,
      `Equipo de Interés: ${data.productInterest || 'No especificado'}`,
      '',
      'Mensaje / Requerimientos Técnicos:',
      data.message,
    ].join('\n');

    return `mailto:${TARGET_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSending) return;

    const trimmedName = formData.name.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedPhone = formData.phone.trim();
    const trimmedMessage = formData.message.trim();

    if (!trimmedName || !trimmedEmail || !trimmedMessage) {
      setSubmitError('Por favor complete todos los campos obligatorios (*).');
      return;
    }

    setIsSending(true);
    setSubmitError(null);
    setIsSubmitted(false);
    setFallbackMailtoUrl(null);

    // 1. Save message locally so Admin Panel can also review it
    const existingMessages = safeParseJSON<ContactMessage[]>(
      safeStorage.getItem('dh_contact_messages'),
      []
    );

    const newMessage: ContactMessage = {
      id: 'msg-' + Date.now(),
      name: trimmedName,
      email: trimmedEmail,
      phone: trimmedPhone,
      productInterest: formData.productInterest,
      message: trimmedMessage,
      createdAt: new Date().toISOString(),
      status: 'nuevo',
    };

    safeStorage.setItem('dh_contact_messages', JSON.stringify([newMessage, ...existingMessages]));
    try {
      window.dispatchEvent(new Event('dh_messages_updated'));
    } catch {
      // Ignore event dispatch errors in legacy browsers
    }

    let emailDelivered = false;

    // 2. Try PHP handler (when hosted on Apache/Hostinger public_html with PHP)
    try {
      const phpPayload = new FormData();
      phpPayload.append('name', trimmedName);
      phpPayload.append('email', trimmedEmail);
      phpPayload.append('phone', trimmedPhone);
      phpPayload.append('productInterest', formData.productInterest);
      phpPayload.append('message', trimmedMessage);

      const phpRes = await fetch('./enviar.php', {
        method: 'POST',
        body: phpPayload,
      });

      const contentType = phpRes.headers.get('content-type') || '';
      if (phpRes.ok && contentType.includes('application/json')) {
        const phpData = await phpRes.json();
        if (phpData && phpData.success === true && phpData.mailSent === true) {
          emailDelivered = true;
        }
      }
    } catch {
      // Static hosting without PHP; continue to FormSubmit
    }

    // 3. If PHP mailer did not send the email (e.g. static Vite hosting / AI Studio), send via FormSubmit
    if (!emailDelivered) {
      try {
        const fsRes = await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            Nombre_o_Empresa: trimmedName,
            Correo_Cliente: trimmedEmail,
            Telefono: trimmedPhone || 'No especificado',
            Equipo_de_Interes: formData.productInterest || 'No especificado',
            Mensaje: trimmedMessage,
            _subject: `Nueva Solicitud de Cotización - D&H INOX SAS (${trimmedName})`,
            _replyto: trimmedEmail,
            _template: 'table',
            _captcha: 'false',
          }),
        });

        if (fsRes.ok) {
          const fsData = await fsRes.json();
          if (fsData && (fsData.success === true || fsData.success === 'true')) {
            emailDelivered = true;
          }
        }
      } catch {
        // Network or third-party block; handled below with direct mailto fallback
      }
    }

    setIsSending(false);

    if (emailDelivered) {
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        productInterest: '',
        message: '',
      });
      setTimeout(() => setIsSubmitted(false), 7000);
    } else {
      setFallbackMailtoUrl(buildMailtoLink({
        name: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone,
        productInterest: formData.productInterest,
        message: trimmedMessage,
      }));
      setSubmitError(
        `No se pudo completar el envío automático en este navegador o red. Use el botón "Enviar por Correo Directo" para enviarlo directamente a ${TARGET_EMAIL}.`
      );
    }
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
            <div className="space-y-4">
              {/* WhatsApp direct link card */}
              <a
                href="https://wa.me/573212749981?text=Hola%20D%26H%20Inox,%20quisiera%20solicitar%20asesor%C3%ADa%20acerca%20de%20sus%20productos."
                target="_blank"
                rel="noopener noreferrer"
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
                href={`mailto:${TARGET_EMAIL}`}
                className="group flex items-center gap-4 bg-red-50/70 border border-red-100 hover:border-red-300 rounded-2xl p-4 transition-all duration-300 shadow-sm"
              >
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <div className="text-[10px] font-mono text-red-700 uppercase tracking-widest font-bold">Correo Corporativo</div>
                  <div className="text-slate-900 font-bold text-sm mt-0.5 break-all group-hover:text-red-600 transition-colors">{TARGET_EMAIL}</div>
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

            <div className="p-4 bg-white rounded-2xl border border-slate-200 text-xs text-slate-600 leading-relaxed shadow-sm">
              <strong className="text-slate-900">Garantía de Calidad:</strong> Todas nuestras marmitas y pass-through se fabrican bajo estrictas normas de bioseguridad, utilizando soldaduras sanitarias TIG de penetración completa y pulido espejo en bordes internos para evitar acumulaciones patógenas.
            </div>
          </div>

          {/* Form Section (Right Side) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 p-6 md:p-8 relative overflow-hidden shadow-sm">
            <div className="mb-6">
              <h3 className="text-lg font-bold text-slate-900">Formulario de Solicitud de Cotización</h3>
              <p className="text-slate-600 text-xs mt-1">
                Diligencie este formulario para enviar su requerimiento directamente a <span className="font-mono font-semibold text-slate-800">{TARGET_EMAIL}</span>.
              </p>
            </div>

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
                    <strong className="font-bold">¡Requerimiento enviado con éxito a {TARGET_EMAIL}!</strong>
                    <p className="text-[11px] text-emerald-700 mt-0.5">
                      Su solicitud fue enviada por correo electrónico. Un asesor técnico se comunicará con usted en menos de 24 horas hábiles.
                    </p>
                  </div>
                </motion.div>
              )}

              {submitError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="mb-6 p-4 bg-amber-50 border border-amber-200 text-amber-900 rounded-xl text-xs space-y-2.5"
                >
                  <div className="flex items-start gap-2.5">
                    <AlertCircle size={18} className="text-amber-600 shrink-0 mt-0.5" />
                    <p>{submitError}</p>
                  </div>
                  {fallbackMailtoUrl && (
                    <a
                      href={fallbackMailtoUrl}
                      className="inline-flex items-center gap-2 px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg font-mono font-bold uppercase text-[11px] transition-colors"
                    >
                      <Mail size={14} />
                      Enviar por Correo Directo ({TARGET_EMAIL})
                    </a>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

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
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-colors"
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
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-colors"
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
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-colors"
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
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-3.5 py-2 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-red-500 focus:border-red-500 transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSending}
                className={`w-full bg-slate-950 hover:bg-slate-800 text-white font-mono uppercase tracking-wider text-xs font-bold py-3 px-4 rounded-xl shadow-md transition-all duration-300 flex items-center justify-center gap-2 mt-4 ${
                  isSending ? 'opacity-70 cursor-wait' : 'cursor-pointer'
                }`}
              >
                {isSending ? (
                  <>
                    <Loader2 size={14} className="animate-spin" />
                    Enviando a {TARGET_EMAIL}...
                  </>
                ) : (
                  <>
                    <Send size={14} />
                    Enviar Requerimiento
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
