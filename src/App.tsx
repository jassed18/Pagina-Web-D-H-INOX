import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Sliders,
  Database,
  Shield,
  MessageCircle,
  HelpCircle,
  Play,
  Instagram,
  Facebook,
  ChevronRight,
  Sparkles,
  Award,
  Users,
  ShieldCheck,
  CheckCircle2,
  ChevronDown
} from 'lucide-react';

import { Product } from './types';
import { INITIAL_PRODUCTS } from './data';
import BrandLogo from './components/BrandLogo';
import ProductCard from './components/ProductCard';
import ControlPanelSimulator from './components/ControlPanelSimulator';
import ContactSection from './components/ContactSection';
import AdminPanel from './components/AdminPanel';

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'todos' | 'marmita' | 'passthrough'>('todos');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [activeVideoPlaying, setActiveVideoPlaying] = useState(false);

  // Initialize products from localStorage or default
  useEffect(() => {
    const stored = localStorage.getItem('dh_products');
    if (stored) {
      try {
        setProducts(JSON.parse(stored));
      } catch (e) {
        setProducts(INITIAL_PRODUCTS);
      }
    } else {
      setProducts(INITIAL_PRODUCTS);
      localStorage.setItem('dh_products', JSON.stringify(INITIAL_PRODUCTS));
    }
  }, []);

  // Sync state changes with localStorage
  const saveProducts = (updated: Product[]) => {
    setProducts(updated);
    localStorage.setItem('dh_products', JSON.stringify(updated));
  };

  const handleAddProduct = (newProd: Product) => {
    const updated = [newProd, ...products];
    saveProducts(updated);
  };

  const handleEditProduct = (editedProd: Product) => {
    const updated = products.map((p) => (p.id === editedProd.id ? editedProd : p));
    saveProducts(updated);
  };

  const handleDeleteProduct = (id: string) => {
    const updated = products.filter((p) => p.id !== id);
    saveProducts(updated);
  };

  const handleRestoreDefaults = () => {
    if (confirm('¿Está seguro de restaurar el catálogo a los datos originales de los PDFs? Se perderán los cambios manuales.')) {
      saveProducts(INITIAL_PRODUCTS);
      alert('Se han restaurado los productos originales de D&H Inox.');
    }
  };

  // Trigger scroll to contact with product selection
  const handleInquireProduct = (productName: string) => {
    const contactSection = document.getElementById('contacto');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
      
      // Look for select field in DOM and trigger update
      const selectElement = document.querySelector('select') as HTMLSelectElement;
      if (selectElement) {
        selectElement.value = productName;
        // Trigger synthetic change event so React form state updates
        const event = new Event('change', { bubbles: true });
        selectElement.dispatchEvent(event);
      }
    }
  };

  // Scroll to simulator with focus/mode configuration
  const handleTriggerSimulation = (prod: Product) => {
    const simSection = document.getElementById('simulador');
    if (simSection) {
      simSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Filter products by selected category
  const filteredProducts = products.filter(
    (p) => selectedCategory === 'todos' || p.category === selectedCategory
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans selection:bg-slate-900 selection:text-white relative overflow-x-hidden">
      
      {/* Decorative ambient gradients */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-slate-200/40 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-[40%] right-10 w-[600px] h-[600px] bg-slate-200/30 rounded-full blur-[150px] pointer-events-none" />

      {/* FIXED HEADER / NAVBAR */}
      <nav className="sticky top-0 bg-white/85 backdrop-blur-md border-b border-slate-200 z-40 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          
          {/* Logo Brand with custom micro sizing for Navbar */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <BrandLogo size="sm" withSlogan={false} className="scale-90" />
            <div className="hidden sm:block">
              <span className="text-sm font-black tracking-widest font-display text-slate-900 uppercase block">D&H INOX SAS</span>
              <span className="text-[9px] font-mono tracking-wider text-slate-500 block -mt-1 uppercase">Calidad y Tecnología</span>
            </div>
          </div>

          {/* Nav items links */}
          <div className="hidden md:flex items-center gap-8 text-xs font-mono font-bold uppercase tracking-wider text-slate-600">
            <a href="#catalogo" className="hover:text-slate-900 transition-colors">Catálogo de Equipos</a>
            <a href="#simulador" className="hover:text-slate-900 transition-colors">Simulador HMI</a>
            <a href="#informacion" className="hover:text-slate-900 transition-colors">Video & Redes</a>
            <a href="#contacto" className="hover:text-slate-900 transition-colors">Atención y Contacto</a>
          </div>

          {/* Admin access trigger (Role-switching dashboard) */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAdminOpen(true)}
              className="px-3.5 py-1.5 bg-white hover:bg-slate-50 border border-slate-200 text-xs font-mono font-bold tracking-wider uppercase rounded-xl text-slate-800 flex items-center gap-1.5 transition-all shadow-sm"
            >
              <Shield size={13} className="text-slate-600" />
              <span>Modo Administrador</span>
            </button>
            <a
              href="#contacto"
              className="px-4 py-1.5 bg-slate-900 hover:bg-slate-800 text-xs font-mono font-bold tracking-wider uppercase rounded-xl text-white shadow-sm hidden sm:inline-block"
            >
              Cotizar Ahora
            </a>
          </div>

        </div>
      </nav>

      {/* HERO SECTION - Sleek and stunning display */}
      <section className="relative pt-8 pb-20 px-4 md:px-8 overflow-hidden bg-grid-slate/20 flex flex-col items-center justify-center min-h-[85vh]">
        
        {/* Subtle glowing ring behind main logo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-slate-200/50 blur-[80px] pointer-events-none animate-pulse" />

        <div className="max-w-4xl mx-auto text-center relative z-10 flex flex-col items-center">
          
          {/* Main animated Brand logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <BrandLogo size="lg" withSlogan={true} />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold font-sans tracking-tight text-slate-900 max-w-3xl leading-none">
              Soluciones de Alta Ingeniería en <span className="text-transparent bg-clip-text logo-gradient">Acero Inoxidable</span>
            </h1>
            
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
              Diseño, manufactura y automatización de Marmitas Industriales de alto rendimiento y Cámaras Pass-Through de máxima asepsia para clínicas y laboratorios.
            </p>
          </motion.div>

          {/* Quick Stats Banner (Trust Elements) */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl w-full mt-12 bg-white/80 p-5 rounded-3xl border border-slate-200/80 shadow-md backdrop-blur-sm text-center"
          >
            <div>
              <div className="text-lg sm:text-2xl font-bold font-mono text-slate-950">100%</div>
              <div className="text-[10px] text-slate-400 uppercase font-mono font-bold tracking-wider">Acero Inoxidable 304</div>
            </div>
            <div className="border-l border-slate-200">
              <div className="text-lg sm:text-2xl font-bold font-mono text-slate-950">20-120</div>
              <div className="text-[10px] text-slate-400 uppercase font-mono font-bold tracking-wider">Galones Capacidad</div>
            </div>
            <div className="border-l border-slate-200">
              <div className="text-lg sm:text-2xl font-bold font-mono text-slate-950">HMI</div>
              <div className="text-[10px] text-slate-400 uppercase font-mono font-bold tracking-wider">Control Delta/Xinje</div>
            </div>
            <div className="border-l border-slate-200">
              <div className="text-lg sm:text-2xl font-bold font-mono text-slate-950">Asepsia</div>
              <div className="text-[10px] text-slate-400 uppercase font-mono font-bold tracking-wider">Grado Farmacéutico</div>
            </div>
          </motion.div>

          {/* Call to Actions buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4 mt-10 justify-center"
          >
            <a
              href="#catalogo"
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center gap-2 cursor-pointer"
            >
              Ver Catálogo <ChevronRight size={14} />
            </a>
            <a
              href="#simulador"
              className="px-6 py-3 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-mono font-bold text-xs uppercase tracking-wider rounded-xl transition-all shadow-sm flex items-center gap-2"
            >
              Simulador HMI <Sliders size={14} className="text-slate-500" />
            </a>
          </motion.div>

          <a href="#catalogo" className="mt-16 text-slate-400 hover:text-slate-600 transition-colors flex flex-col items-center gap-1 text-xs">
            <span>Conozca más sobre D&H Inox</span>
            <ChevronDown size={14} className="animate-bounce" />
          </a>

        </div>
      </section>

      {/* INTERACTIVE SIMULATOR WRAPPER SECTION */}
      <section id="simulador" className="py-16 px-4 md:px-8 bg-slate-100/50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto">
          <ControlPanelSimulator />
        </div>
      </section>

      {/* CATALOG / PRODUCTS GRID SECTION */}
      <section id="catalogo" className="py-20 px-4 md:px-8 bg-slate-50 border-t border-slate-200 relative bg-grid-slate/10">
        <div className="max-w-7xl mx-auto">
          
          {/* Section titles */}
          <div className="flex flex-col md:flex-row items-baseline justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-mono font-bold uppercase tracking-widest text-blue-600">
                Línea de Productos
              </span>
              <h2 className="text-3xl font-bold font-sans tracking-tight text-slate-900 mt-1">
                Catálogo Técnico e Industrial
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                Equipos robustos de acero inoxidable diseñados para soportar los procesos más exigentes.
              </p>
            </div>

            {/* Filter Categories Selector Tabs */}
            <div className="flex bg-slate-100 p-1 rounded-2xl border border-slate-200 self-center shadow-inner">
              {(['todos', 'marmita', 'passthrough'] as const).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-[10px] sm:text-xs font-mono font-bold uppercase tracking-wider transition-all ${
                    selectedCategory === cat
                      ? 'bg-white text-slate-900 font-bold shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {cat === 'todos' ? 'Todos' : cat === 'marmita' ? 'Marmitas' : 'Pass Through'}
                </button>
              ))}
            </div>
          </div>

          {/* Core Catalog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((prod) => (
              <ProductCard
                key={prod.id}
                product={prod}
                onSelectProduct={handleTriggerSimulation}
                onInquire={handleInquireProduct}
              />
            ))}
          </div>

        </div>
      </section>

      {/* INFORMATIONAL & SOCIAL MEDIA SECTION (From PDF Page 13) */}
      <section id="informacion" className="py-16 px-4 md:px-8 bg-slate-100/50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-600">
              Multimedia e Información
            </span>
            <h2 className="text-3xl font-bold font-sans text-slate-900 mt-1 tracking-tight">
              D&H Inox en las Redes
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Conozca videos explicativos de nuestros equipos y manténgase al día con nuestras últimas entregas e innovaciones tecnológicas.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            
            {/* Interactive Informative Video Card */}
            <div className="bento-card p-6 flex flex-col justify-between relative overflow-hidden bg-white">
              <div className="absolute top-4 right-4 bg-red-100 text-red-700 border border-red-200 text-[9px] font-mono uppercase px-2 py-0.5 rounded-full font-bold">
                Explicativo
              </div>

              <div>
                <span className="text-slate-400 text-[10px] font-mono uppercase tracking-widest">Multimedia</span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">Video Informativo de Funcionamiento</h3>
                <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                  Vea en tiempo real cómo opera el sistema de volteo motorizado y los raspadores del agitador tipo ancla de nuestras marmitas.
                </p>
              </div>

              {/* Video Player representation */}
              <div className="bg-slate-900 rounded-2xl border border-slate-800 p-4 my-6 aspect-video flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-cover bg-center opacity-40 filter blur-[1px] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #334155, #0f172a)' }} />
                
                {/* Playing simulation state */}
                {activeVideoPlaying ? (
                  <div className="z-10 text-center animate-fade-in">
                    <span className="w-3 h-3 rounded-full bg-red-500 inline-block mr-1.5 animate-ping" />
                    <span className="text-xs font-mono font-bold text-red-400">REPRODUCIENDO SIMULACIÓN DE MAQUINARIA...</span>
                    <p className="text-[10px] text-slate-500 mt-2">Sistemas de doble camisa de glicerina biodegradable.</p>
                    <button
                      onClick={() => setActiveVideoPlaying(false)}
                      className="mt-4 px-3 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded text-xs"
                    >
                      Pausar Video
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setActiveVideoPlaying(true)}
                    className="z-10 w-16 h-16 bg-red-600 hover:bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg transition-transform hover:scale-105"
                  >
                    <Play size={32} className="ml-1" />
                  </button>
                )}
              </div>

              <a
                href="https://www.youtube.com"
                target="_blank"
                rel="noreferrer"
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-mono text-xs font-bold uppercase py-2.5 rounded-xl text-center flex items-center justify-center gap-2 transition-colors"
              >
                Ingresa Aquí al Canal Oficial
              </a>
            </div>

            {/* Social Media Links Card */}
            <div className="bento-card p-6 flex flex-col justify-between bg-white">
              
              <div>
                <span className="text-slate-400 text-[10px] font-mono uppercase tracking-widest">Siga Nuestro Trabajo</span>
                <h3 className="text-lg font-bold text-slate-900 mt-1">Canales Digitales</h3>
                <p className="text-slate-600 text-xs mt-2 leading-relaxed">
                  Compartimos registros visuales de nuestras instalaciones industriales, pruebas de hermeticidad y proyectos especiales terminados.
                </p>
              </div>

              {/* Grid of Redes Sociales (from Page 13) */}
              <div className="space-y-4 my-6">
                
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-pink-50 to-white border border-pink-100 hover:border-pink-300 rounded-xl transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-pink-600 to-amber-500 flex items-center justify-center text-white shadow group-hover:scale-105 transition-transform">
                    <Instagram size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-pink-600 font-bold uppercase tracking-wider">Instagram</span>
                    <div className="text-slate-800 font-bold text-sm mt-0.5">@dhsteelsas</div>
                  </div>
                </a>

                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-white border border-blue-100 hover:border-blue-300 rounded-xl transition-all group"
                >
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white shadow group-hover:scale-105 transition-transform">
                    <Facebook size={20} />
                  </div>
                  <div>
                    <span className="text-[10px] font-mono text-blue-600 font-bold uppercase tracking-wider">Facebook</span>
                    <div className="text-slate-800 font-bold text-sm mt-0.5">D&H Steel SAS</div>
                  </div>
                </a>

              </div>

              <div className="p-3 bg-slate-50 rounded-2xl text-[11px] text-slate-500 leading-normal text-center border border-slate-100">
                Síguenos para estar al día con innovaciones mecánicas de soldadura sanitaria y normas de calidad.
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* MOBILE OPTIMIZED CONTACT SECTION */}
      <ContactSection products={products} />

      {/* ELEGANT SYMMETRICAL FOOTER */}
      <footer className="bg-white py-12 px-4 md:px-8 border-t border-slate-200 text-slate-600 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 border-b border-slate-100 pb-8 mb-8">
          
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <BrandLogo size="sm" withSlogan={false} />
            <p className="text-[11px] text-slate-400 mt-2 max-w-sm leading-normal">
              D&H Steel S.A.S. - Fabricación y automatización de sistemas industriales de acero inoxidable. Bogotá, Colombia.
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-8 text-[11px] font-mono uppercase tracking-wider text-slate-500">
            <a href="#catalogo" className="hover:text-slate-800">Equipos</a>
            <a href="#simulador" className="hover:text-slate-800">Simulador</a>
            <a href="#contacto" className="hover:text-slate-800">Contacto</a>
            <button onClick={() => setIsAdminOpen(true)} className="hover:text-slate-800">Admin Portal</button>
          </div>

        </div>

        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 font-mono gap-4">
          <span>&copy; {new Date().getFullYear()} D&H INOX SAS. Todos los derechos reservados.</span>
          <span>Calidad y Tecnología • Soluciones en Acero Inoxidable</span>
        </div>
      </footer>

      {/* ADMIN PANEL ROUTE MODAL */}
      <AnimatePresence>
        {isAdminOpen && (
          <AdminPanel
            products={products}
            onAddProduct={handleAddProduct}
            onEditProduct={handleEditProduct}
            onDeleteProduct={handleDeleteProduct}
            onRestoreDefaults={handleRestoreDefaults}
            onClose={() => setIsAdminOpen(false)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
