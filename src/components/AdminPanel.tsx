import React, { useState, useEffect } from 'react';
import { Product, ContactMessage } from '../types';
import { Lock, LogIn, LogOut, Plus, Trash2, Edit3, MessageCircle, FileText, CheckCircle, RefreshCw, X, Shield, Eye, Database } from 'lucide-react';

interface AdminPanelProps {
  products: Product[];
  onAddProduct: (prod: Product) => void;
  onEditProduct: (prod: Product) => void;
  onDeleteProduct: (id: string) => void;
  onRestoreDefaults: () => void;
  onClose: () => void;
}

export default function AdminPanel({
  products,
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onRestoreDefaults,
  onClose,
}: AdminPanelProps) {
  // Auth state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');

  // Tab state
  const [activeTab, setActiveTab] = useState<'productos' | 'mensajes'>('productos');

  // Product Form state
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formFields, setFormFields] = useState({
    name: '',
    category: 'marmita' as 'marmita' | 'passthrough',
    subtitle: '',
    description: '',
    status: 'disponible' as 'disponible' | 'bajo_pedido',
    generalSpecsStr: '',
    featuresStr: '', // comma or newline separated features
    specificationsStr: '', // Format Label:Value per line
  });

  // Contact messages state
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    // Read messages from localStorage
    const loadMessages = () => {
      const stored = localStorage.getItem('dh_contact_messages');
      if (stored) {
        setMessages(JSON.parse(stored));
      }
    };
    loadMessages();
    // Add event listener to capture new messages instantly
    window.addEventListener('storage', loadMessages);
    return () => window.removeEventListener('storage', loadMessages);
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
      setAuthError('');
    } else {
      setAuthError('Credenciales incorrectas. Intente con usuario: admin, clave: admin123');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername('');
    setPassword('');
  };

  // Open Form to ADD product
  const openAddForm = () => {
    setEditingProduct(null);
    setFormFields({
      name: '',
      category: 'marmita',
      subtitle: '',
      description: '',
      status: 'disponible',
      generalSpecsStr: '',
      featuresStr: '',
      specificationsStr: 'Capacidad: \nMaterial: \nCalentamiento: ',
    });
    setIsFormOpen(true);
  };

  // Open Form to EDIT product
  const openEditForm = (prod: Product) => {
    setEditingProduct(prod);
    setFormFields({
      name: prod.name,
      category: prod.category,
      subtitle: prod.subtitle,
      description: prod.description,
      status: prod.status,
      generalSpecsStr: prod.generalSpecs.join('\n'),
      featuresStr: prod.features.map(f => `${f.title}:\n${f.items.join('\n')}`).join('\n\n'),
      specificationsStr: prod.specifications.map(s => `${s.label}:${s.value}`).join('\n'),
    });
    setIsFormOpen(true);
  };

  // Handle Form Submission
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formFields.name || !formFields.description) return;

    // Parse structures
    const generalSpecs = formFields.generalSpecsStr.split('\n').filter(s => s.trim() !== '');
    
    // Parse specs Format "Label:Value"
    const specifications = formFields.specificationsStr.split('\n')
      .filter(line => line.includes(':'))
      .map(line => {
        const parts = line.split(':');
        return {
          label: parts[0].trim(),
          value: parts.slice(1).join(':').trim()
        };
      });

    // Parse features "Title:\nItem1\nItem2\n\nTitle2:\nItem1"
    const featureBlocks = formFields.featuresStr.split('\n\n').filter(b => b.trim() !== '');
    const features = featureBlocks.map(block => {
      const lines = block.split('\n').filter(l => l.trim() !== '');
      const title = lines[0].endsWith(':') ? lines[0].slice(0, -1).trim() : lines[0].trim();
      const items = lines.slice(1);
      return { title, items };
    });

    const productData: Product = {
      id: editingProduct ? editingProduct.id : 'prod-' + Date.now(),
      category: formFields.category,
      name: formFields.name,
      subtitle: formFields.subtitle,
      description: formFields.description,
      generalSpecs,
      features,
      specifications,
      status: formFields.status
    };

    if (editingProduct) {
      onEditProduct(productData);
    } else {
      onAddProduct(productData);
    }

    setIsFormOpen(false);
  };

  // Toggle Message status read/unread
  const toggleMessageStatus = (msgId: string) => {
    const updated = messages.map(m => {
      if (m.id === msgId) {
        return { ...m, status: m.status === 'nuevo' ? 'leido' : 'nuevo' } as ContactMessage;
      }
      return m;
    });
    setMessages(updated);
    localStorage.setItem('dh_contact_messages', JSON.stringify(updated));
  };

  const deleteMessage = (msgId: string) => {
    if (!confirm('¿Está seguro de eliminar este mensaje de contacto?')) return;
    const updated = messages.filter(m => m.id !== msgId);
    setMessages(updated);
    localStorage.setItem('dh_contact_messages', JSON.stringify(updated));
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
      
      {/* Central modal card */}
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-5xl shadow-2xl overflow-hidden flex flex-col my-8 max-h-[90vh]">
        
        {/* Header bar */}
        <div className="bg-gradient-to-r from-red-600 via-slate-800 to-blue-600 p-4 flex items-center justify-between text-white border-b border-slate-700 shrink-0">
          <div className="flex items-center gap-2">
            <Shield size={20} className="text-yellow-400" />
            <div>
              <h2 className="text-sm font-bold uppercase tracking-widest font-mono">Panel Administrativo D&H INOX</h2>
              <p className="text-[10px] text-slate-300 font-mono">Gestión de Catálogo y Solicitudes de Cotización</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800/60 hover:bg-slate-800 flex items-center justify-center text-white transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* 1. NOT LOGGED IN STATE */}
        {!isLoggedIn ? (
          <div className="p-8 max-w-md mx-auto w-full text-center my-12">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-blue-500 mx-auto mb-6 border border-slate-700 shadow-inner">
              <Lock size={32} />
            </div>
            <h3 className="text-xl font-bold text-slate-100 mb-2">Ingreso Autorizado</h3>
            <p className="text-slate-400 text-xs mb-6">
              Este panel permite modificar el catálogo de marmitas, agitadores y pass-throughs, además de ver solicitudes de clientes.
            </p>

            <form onSubmit={handleLogin} className="space-y-4 text-left">
              <div>
                <label className="block text-xs font-mono font-bold text-slate-400 uppercase mb-1">Usuario Administrativo</label>
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-mono font-bold text-slate-400 uppercase mb-1">Contraseña de Seguridad</label>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="admin123"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              {authError && (
                <div className="text-xs text-red-400 font-mono bg-red-950/40 p-2 rounded border border-red-900/30">
                  {authError}
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-mono text-xs font-bold uppercase py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                <LogIn size={14} /> Acceder al Panel
              </button>

              <div className="text-center pt-2">
                <span className="text-[10px] text-slate-500 font-mono">
                  * Pruebe con: admin / admin123
                </span>
              </div>
            </form>
          </div>
        ) : (
          /* 2. ADMIN PORTAL LOGGED IN STATE */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Navigation Tabs bar inside Panel */}
            <div className="bg-slate-950 px-6 py-2 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 shrink-0">
              <div className="flex gap-2">
                <button
                  onClick={() => setActiveTab('productos')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 ${
                    activeTab === 'productos'
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Database size={14} /> Gestión de Productos ({products.length})
                </button>
                <button
                  onClick={() => setActiveTab('mensajes')}
                  className={`px-4 py-1.5 rounded-lg text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-2 ${
                    activeTab === 'mensajes'
                      ? 'bg-red-600 text-white'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <MessageCircle size={14} /> Solicitudes de Cotización ({messages.length})
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={onRestoreDefaults}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs font-mono flex items-center gap-1 transition-colors"
                  title="Restaura la información original de los PDFs de D&H Inox"
                >
                  <RefreshCw size={12} /> Restaurar PDF por defecto
                </button>
                <button
                  onClick={handleLogout}
                  className="px-3 py-1 bg-red-950/60 border border-red-900/30 text-red-400 hover:bg-red-900 hover:text-white rounded text-xs font-mono flex items-center gap-1 transition-all"
                >
                  <LogOut size={12} /> Salir
                </button>
              </div>
            </div>

            {/* Panel Central Body Content (With custom scrolling) */}
            <div className="flex-1 overflow-y-auto p-6 bg-slate-900 text-slate-200">
              
              {/* TAB 1: PRODUCT MANAGEMENT */}
              {activeTab === 'productos' && (
                <div className="space-y-6">
                  
                  {/* Headline & Add Product Button */}
                  <div className="flex justify-between items-center bg-slate-950 p-4 rounded-xl border border-slate-800">
                    <div>
                      <h3 className="text-sm font-bold text-slate-100 font-mono">Listado General de Equipos</h3>
                      <p className="text-xs text-slate-400">Modifique los atributos, descripciones o añada nuevos productos al catálogo.</p>
                    </div>
                    <button
                      onClick={openAddForm}
                      className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-mono font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                    >
                      <Plus size={14} /> Añadir Equipo
                    </button>
                  </div>

                  {/* Products Editable Grid/Table */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {products.map((p) => (
                      <div key={p.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col justify-between hover:border-slate-700 transition-all">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold uppercase ${
                              p.category === 'marmita' ? 'bg-orange-600/10 text-orange-400 border border-orange-500/20' : 'bg-blue-600/10 text-blue-400 border border-blue-500/20'
                            }`}>
                              {p.category}
                            </span>
                            <span className={`text-[10px] font-mono font-bold uppercase ${
                              p.status === 'disponible' ? 'text-green-400' : 'text-yellow-400'
                            }`}>
                              ● {p.status.replace('_', ' ')}
                            </span>
                          </div>
                          
                          <h4 className="text-sm font-bold text-slate-100 mt-2 line-clamp-1">{p.name}</h4>
                          <p className="text-slate-400 text-xs mt-1 line-clamp-3 leading-relaxed">{p.description}</p>
                          
                          {/* List of Specs count */}
                          <div className="mt-3 flex gap-2 text-[10px] font-mono text-slate-500">
                            <span>{p.specifications.length} Atributos</span>
                            <span>•</span>
                            <span>{p.generalSpecs.length} Specs</span>
                          </div>
                        </div>

                        {/* Edit and Delete Buttons */}
                        <div className="mt-4 pt-3 border-t border-slate-800/80 flex gap-2 justify-end">
                          <button
                            onClick={() => openEditForm(p)}
                            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-mono flex items-center gap-1 transition-colors"
                          >
                            <Edit3 size={12} /> Editar
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`¿Está seguro de eliminar ${p.name}?`)) {
                                onDeleteProduct(p.id);
                              }
                            }}
                            className="px-2.5 py-1 bg-red-950/60 border border-red-900/30 text-red-400 hover:bg-red-900 hover:text-white rounded text-xs font-mono flex items-center gap-1 transition-all"
                          >
                            <Trash2 size={12} /> Eliminar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                </div>
              )}

              {/* TAB 2: CLIENT CONTACT REQUESTS */}
              {activeTab === 'mensajes' && (
                <div className="space-y-4">
                  <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 mb-6">
                    <h3 className="text-sm font-bold text-slate-100 font-mono">Bandeja de Entrada de Cotizaciones</h3>
                    <p className="text-xs text-slate-400">Mensajes enviados por usuarios interesados mediante el formulario de contacto.</p>
                  </div>

                  {messages.length === 0 ? (
                    <div className="text-center py-12 bg-slate-950/40 border border-dashed border-slate-800 rounded-xl">
                      <MessageCircle size={36} className="text-slate-600 mx-auto mb-3" />
                      <p className="text-slate-400 text-sm">No se han recibido solicitudes de contacto aún.</p>
                      <p className="text-slate-600 text-xs mt-1">Los mensajes enviados por los clientes aparecerán listados aquí en tiempo real.</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {messages.map((m) => (
                        <div
                          key={m.id}
                          className={`bg-slate-950 border rounded-xl p-4 transition-all ${
                            m.status === 'nuevo' ? 'border-red-500/30 bg-slate-950' : 'border-slate-800 bg-slate-950/55'
                          }`}
                        >
                          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-2 mb-3">
                            <div>
                              <span className="text-xs font-bold text-slate-200">{m.name}</span>
                              <span className="mx-2 text-slate-600">•</span>
                              <span className="text-xs text-slate-400 font-mono">{m.email}</span>
                              {m.phone && (
                                <>
                                  <span className="mx-2 text-slate-600">•</span>
                                  <span className="text-xs text-slate-400 font-mono">{m.phone}</span>
                                </>
                              )}
                            </div>
                            <div className="flex items-center gap-2 font-mono text-[10px]">
                              <span className="text-slate-500">{new Date(m.createdAt).toLocaleDateString()}</span>
                              <span className={`px-2 py-0.5 rounded font-bold uppercase ${
                                m.status === 'nuevo' ? 'bg-red-500/10 text-red-400 border border-red-500/20' : 'bg-slate-800 text-slate-500'
                              }`}>
                                {m.status}
                              </span>
                            </div>
                          </div>

                          {m.productInterest && (
                            <div className="mb-2">
                              <span className="text-[10px] font-mono text-blue-400 uppercase tracking-wider font-bold">Interesado en:</span>
                              <div className="text-slate-100 font-bold text-xs mt-0.5">{m.productInterest}</div>
                            </div>
                          )}

                          <p className="text-slate-300 text-sm leading-relaxed p-3 bg-slate-900/60 rounded-lg border border-slate-800/40">
                            {m.message}
                          </p>

                          <div className="mt-4 flex gap-2 justify-end">
                            <button
                              onClick={() => toggleMessageStatus(m.id)}
                              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-mono flex items-center gap-1 transition-colors"
                            >
                              <CheckCircle size={12} /> Marcar como {m.status === 'nuevo' ? 'Leído' : 'Nuevo'}
                            </button>
                            <button
                              onClick={() => deleteMessage(m.id)}
                              className="px-2.5 py-1 bg-red-950/60 border border-red-900/30 text-red-400 hover:bg-red-900 hover:text-white rounded text-xs font-mono flex items-center gap-1 transition-all"
                            >
                              <Trash2 size={12} /> Eliminar
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              )}

            </div>

          </div>
        )}

        {/* 3. FLOATING ADD/EDIT FORM MODAL */}
        {isFormOpen && (
          <div className="fixed inset-0 bg-slate-950/90 z-[60] flex items-center justify-center p-4 overflow-y-auto">
            <div className="bg-slate-900 border border-slate-700 rounded-xl w-full max-w-3xl shadow-2xl p-6 overflow-hidden max-h-[85vh] flex flex-col">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <h3 className="text-base font-bold text-slate-100 font-mono">
                  {editingProduct ? 'Editar Producto del Catálogo' : 'Añadir Nuevo Producto al Catálogo'}
                </h3>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white"
                >
                  <X size={14} />
                </button>
              </div>

              <form onSubmit={handleSaveProduct} className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono font-bold text-slate-400 uppercase mb-1">Nombre del Producto *</label>
                    <input
                      type="text"
                      required
                      value={formFields.name}
                      onChange={(e) => setFormFields({ ...formFields, name: e.target.value })}
                      placeholder="Ej. Marmita Especial 150 Galones"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-100 text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-mono font-bold text-slate-400 uppercase mb-1">Categoría del Producto</label>
                    <select
                      value={formFields.category}
                      onChange={(e) => setFormFields({ ...formFields, category: e.target.value as 'marmita' | 'passthrough' })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-100 text-xs focus:outline-none focus:border-blue-500"
                    >
                      <option value="marmita">Marmita (Kettles)</option>
                      <option value="passthrough">Pass Through (Transferencia)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono font-bold text-slate-400 uppercase mb-1">Subtítulo / Slogan *</label>
                    <input
                      type="text"
                      required
                      value={formFields.subtitle}
                      onChange={(e) => setFormFields({ ...formFields, subtitle: e.target.value })}
                      placeholder="Ej. Alta capacidad con doble camisa térmica"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-100 text-xs focus:outline-none focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-mono font-bold text-slate-400 uppercase mb-1">Disponibilidad</label>
                    <select
                      value={formFields.status}
                      onChange={(e) => setFormFields({ ...formFields, status: e.target.value as 'disponible' | 'bajo_pedido' })}
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-100 text-xs focus:outline-none focus:border-blue-500"
                    >
                      <option value="disponible">Disponible</option>
                      <option value="bajo_pedido">Bajo Pedido</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-mono font-bold text-slate-400 uppercase mb-1">Descripción del Producto *</label>
                  <textarea
                    required
                    rows={2}
                    value={formFields.description}
                    onChange={(e) => setFormFields({ ...formFields, description: e.target.value })}
                    placeholder="Escriba una descripción comercial y técnica del equipo..."
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-100 text-xs focus:outline-none focus:border-blue-500 resize-none"
                  />
                </div>

                <div>
                  <label className="block font-mono font-bold text-slate-400 uppercase mb-1">Especificaciones Generales (Una por línea)</label>
                  <textarea
                    rows={3}
                    value={formFields.generalSpecsStr}
                    onChange={(e) => setFormFields({ ...formFields, generalSpecsStr: e.target.value })}
                    placeholder="Fabricado en acero 304&#10;Capacidades: 50 a 150 Galones&#10;Operación neumática"
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-100 text-xs focus:outline-none focus:border-blue-500 font-mono"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono font-bold text-slate-400 uppercase mb-1">Atributos Clave (Formato Clave:Valor, una por línea)</label>
                    <textarea
                      rows={4}
                      value={formFields.specificationsStr}
                      onChange={(e) => setFormFields({ ...formFields, specificationsStr: e.target.value })}
                      placeholder="Capacidad: 100 Galones&#10;Material: Acero Inoxidable 304&#10;Presión: 15 PSI"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-100 text-xs focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block font-mono font-bold text-slate-400 uppercase mb-1">Bloques de Características Detalladas</label>
                    <p className="text-[10px] text-slate-500 mb-1">Formato: Título: seguido de los puntos específicos en líneas siguientes, separe bloques por doble línea.</p>
                    <textarea
                      rows={4}
                      value={formFields.featuresStr}
                      onChange={(e) => setFormFields({ ...formFields, featuresStr: e.target.value })}
                      placeholder="Sistemas de Seguridad:&#10;Paro de emergencia&#10;Termocupla de seguridad&#10;&#10;Detalles del Tanque:&#10;Camisa de calentamiento&#10;Acabado espejo sanitario"
                      className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-1.5 text-slate-100 text-xs focus:outline-none focus:border-blue-500 font-mono"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-800 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setIsFormOpen(false)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-mono uppercase text-xs"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-mono font-bold uppercase text-xs shadow-lg"
                  >
                    Guardar Producto
                  </button>
                </div>

              </form>

            </div>
          </div>
        )}

      </div>
    </div>
  );
}
