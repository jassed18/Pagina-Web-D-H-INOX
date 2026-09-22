<?php
/**
 * D&H INOX SAS - Sitio Web Oficial en PHP / HTML / CSS
 * 100% Compatible con Hostinger (Sin apps Node.js)
 */

$products = [
  [
    'id' => 'marmita-automatica-volcable',
    'category' => 'marmita',
    'badge' => 'Marmitas & Mezcla',
    'badgeClass' => 'badge-marmita',
    'name' => 'Marmita Automática Volcable',
    'subtitle' => 'Solución inteligente con sistema de volteo motorizado',
    'description' => 'La Marmita Automática Volcable DYH ofrece control total sobre las variables críticas de cocción. Su pantalla táctil e interfaz inteligente permiten programar ciclos de cocción, volteo automatizado y control térmico preciso.',
    'specs' => [
      'Capacidades disponibles: 20, 40, 60, 80, 100 y 120 galones.',
      'Estructura compacta e higiénica totalmente en acero inoxidable Ref. 304.',
      'Sistema de volteo motorizado con seguro electromecánico de posición.',
      'Calentamiento por transferencia indirecta con glicerina biodegradable.',
      'Pantalla táctil interactiva con almacenamiento de programas de cocción.'
    ],
    'technical' => [
      'Capacidad' => '20 - 120 Galones',
      'Material' => 'Acero Inoxidable Ref. 304',
      'Controlador' => 'Pantalla Táctil Inteligente',
      'Sistema Volteo' => 'Automático / Motorizado',
      'Calentamiento' => 'Gas Natural / Eléctrico / Vapor',
      'Llenado Agua' => 'Control Water Fill Automático'
    ]
  ],
  [
    'id' => 'marmita-automatica-volcable-agitador',
    'category' => 'marmita',
    'badge' => 'Marmitas & Mezcla',
    'badgeClass' => 'badge-marmita',
    'name' => 'Marmita Automática Volcable con Agitador',
    'subtitle' => 'Cocción homogénea con agitación constante de velocidad variable',
    'description' => 'Integra el sistema de volteo motorizado inteligente con un potente sistema de agitación constante. Ideal para sopas, cremas, salsas y preparaciones que requieren mezcla continua sin adherencia.',
    'specs' => [
      'Capacidades disponibles: 20 a 120 galones en acero inoxidable Ref. 304.',
      'Sistema de agitación con variador de frecuencia (VFD) integrado.',
      'Raspadores de teflón de grado alimenticio auto-ajustables.',
      'Pantalla táctil con control programable de velocidad de agitación y recetas.',
      'Volteo motorizado automático para descargue completo.'
    ],
    'technical' => [
      'Capacidad' => '20 - 120 Galones',
      'Material' => 'Acero Inoxidable Ref. 304',
      'Agitación' => 'Mezclador Continuo con Raspadores Teflón',
      'Regulación Speed' => 'Variador VFD Electrónico',
      'Controlador' => 'Pantalla Táctil e Interfaz Inteligente',
      'Sistema Volteo' => 'Automático Motorizado'
    ]
  ],
  [
    'id' => 'marmita-automatica-volcable-agitador-doble-accion',
    'category' => 'marmita',
    'badge' => 'Marmitas & Mezcla',
    'badgeClass' => 'badge-marmita',
    'name' => 'Marmita Automática Volcable con Agitador de Doble Acción',
    'subtitle' => 'Máxima potencia para mezclas de alta densidad y viscosidad',
    'description' => 'Equipada con agitador tipo ancla de doble acción y motores tándem de alto torque. Diseñada para productos exigentes como arequipe, chocolates, mermeladas y masas pesadas que requieren esfuerzo mecánico superior.',
    'specs' => [
      'Capacidades de 20 a 120 galones totalmente en acero inoxidable sanitario Ref. 304.',
      'Sistema de agitación de doble acción para máxima homogeneidad.',
      'Raspadores de teflón de alto rendimiento para barrido periférico completo.',
      'Motoreductor trifásico tándem de alto torque con protección de sobrecarga.',
      'Pantalla táctil inteligente con gestión avanzada de recetas complejas.'
    ],
    'technical' => [
      'Capacidad' => '20 - 120 Galones',
      'Material' => 'Acero Inoxidable Ref. 304 Sanitario',
      'Tipo Agitador' => 'Doble Acción Ancla con Raspadores Teflón',
      'Motorización' => 'Motoreductor Trifásico Tándem Alto Torque',
      'Controlador' => 'Pantalla Táctil Inteligente (Delta / Xinje)',
      'Inclinación' => 'Volteo Motorizado Automático'
    ]
  ],
  [
    'id' => 'pass-through-1-cabina',
    'category' => 'passthrough',
    'badge' => 'Cámara Pass Through',
    'badgeClass' => 'badge-passthrough',
    'name' => 'Pass Through 1 Cabina DYH',
    'subtitle' => 'Cámara de transferencia higiénica simple para laboratorios',
    'description' => 'Cámara ideal para la transferencia segura de materiales entre áreas limpias y sucias. Su diseño con bordes redondeados y sellos magnéticos garantiza la máxima contención del aire de forma elegante.',
    'specs' => [
      'Manufacturado totalmente en lámina de acero inoxidable Calibre 18 Ref. 304 y 430.',
      'Marcos y vidrios templados de 5 mm de alta resistencia.',
      'Empaque de caucho con cinta magnética para sellado hermético.',
      'Internamente con bordes redondeados que no permiten focos de infección y facilitan la desinfección.'
    ],
    'technical' => [
      'Capacidad' => '1 Cabina / Compartimento',
      'Material Exterior' => 'Acero Inoxidable Calibre 18 Ref. 304/430',
      'Vidrio' => 'Templado de 5 mm',
      'Sello' => 'Empaque de Caucho con Cinta Magnética',
      'Ventilación' => 'Acople de 3" o 4" Superior',
      'Opcionales' => 'Entrepaño Removible / Seguros Electromagnéticos'
    ]
  ],
  [
    'id' => 'pass-through-2-cabinas',
    'category' => 'passthrough',
    'badge' => 'Cámara Pass Through',
    'badgeClass' => 'badge-passthrough',
    'name' => 'Pass Through 2 Cabinas Verticales DYH',
    'subtitle' => 'Doble compartimento independiente para alto flujo de materiales',
    'description' => 'Perfecto para separar flujos de materiales de diferente naturaleza o aumentar la frecuencia de paso sin comprometer la pureza de las áreas limpias. Compartimentos apilados verticalmente de forma compacta.',
    'specs' => [
      'Estructura de acero inoxidable Calibre 18 Ref. 304 y 430 de alta resistencia.',
      'Dos compartimentos independientes sellados de forma individual.',
      'Vidrios templados de 5 mm con empaques magnéticos.',
      'Acabados sanitarios en bordes interiores.'
    ],
    'technical' => [
      'Capacidad' => '2 Cabinas Independientes',
      'Material' => 'Acero Inoxidable Ref. 304 y 430',
      'Espesor Vidrio' => '5 mm Templado',
      'Tipo de Cierre' => 'Seguros Mecánicos o Electromagnéticos',
      'Acople Aire' => 'Tubo de Ventilación en Acero'
    ]
  ],
  [
    'id' => 'pass-through-3-cabinas',
    'category' => 'passthrough',
    'badge' => 'Cámara Pass Through',
    'badgeClass' => 'badge-passthrough',
    'name' => 'Pass Through 3 Cabinas Integradas DYH',
    'subtitle' => 'Capacidad máxima de transferencia para quirófanos y salas blancas',
    'description' => 'La solución más completa para clínicas, farmacéuticas y laboratorios de alta exigencia. Tres cabinas independientes que agilizan el paso de múltiples elementos minimizando pérdidas de presión.',
    'specs' => [
      'Fabricación integral en acero inoxidable Ref. 304 para máxima asepsia.',
      'Tres compartimentos individuales con cierre hermético.',
      'Sello por cinta magnética de alta sujeción.',
      'Bordes redondeados e interior pulido espejo para evitar acumulación de bacterias.'
    ],
    'technical' => [
      'Capacidad' => '3 Cabinas Verticales',
      'Material' => 'Acero Inoxidable Sanitario Ref. 304',
      'Vidrio' => 'Vidrio Templado de 5 mm',
      'Cierre' => 'Electromagnético con Sensor de Proximidad',
      'Bordes Interiores' => 'Redondeados sanitarios'
    ]
  ]
];
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>D&H Inox - Soluciones en Acero Inoxidable</title>
  <meta name="description" content="Diseño, manufactura y automatización de Marmitas Industriales y Cámaras Pass-Through en Acero Inoxidable 304. D&H Inox SAS Bogotá, Colombia.">
  <link rel="stylesheet" href="css/styles.css">
  <link rel="icon" type="image/jpeg" href="logo.jpg">
</head>
<body class="bg-grid">

  <!-- Ambient light glow backgrounds -->
  <div class="ambient-glow-1"></div>
  <div class="ambient-glow-2"></div>

  <!-- HEADER / BARRA DE NAVEGACIÓN -->
  <header class="navbar">
    <div class="container navbar-inner">
      <a href="#" class="brand-wrapper">
        <img src="logo.jpg" alt="D&H INOX SAS" class="brand-logo-img">
        <div>
          <span class="brand-title">D&H INOX SAS</span>
          <span class="brand-sub">Calidad y Tecnología</span>
        </div>
      </a>

      <nav class="nav-links">
        <a href="#catalogo">Catálogo de Equipos</a>
        <a href="#simulador">Sistema Inteligente</a>
        <a href="#multimedia">Video & Redes</a>
        <a href="#contacto">Atención y Contacto</a>
      </nav>

      <div>
        <a href="#contacto" class="btn-nav-quote">Cotizar Ahora</a>
      </div>
    </div>
  </header>

  <!-- SECCIÓN HERO PRINCIPAL -->
  <section class="hero-section">
    <div class="hero-logo-box">
      <img src="logo.jpg" alt="D&H Inox Logo" class="hero-main-logo">
    </div>

    <h1 class="hero-heading">
      Soluciones de Alta <span class="gradient-text">Calidad y Tecnología</span>
    </h1>

    <p class="hero-desc">
      Diseño, manufactura y automatización de Marmitas Industriales de alto rendimiento y Cámaras Pass-Through de máxima asepsia para clínicas y laboratorios.
    </p>

    <!-- Barra de Indicadores de Confianza -->
    <div class="trust-stats">
      <div class="stat-col">
        <div class="stat-value">100%</div>
        <div class="stat-label">Acero Inoxidable 304</div>
      </div>
      <div class="stat-col">
        <div class="stat-value">20-120</div>
        <div class="stat-label">Galones Capacidad</div>
      </div>
      <div class="stat-col">
        <div class="stat-value">Pantalla Táctil</div>
        <div class="stat-label">Control Delta / Xinje</div>
      </div>
      <div class="stat-col">
        <div class="stat-value">Asepsia</div>
        <div class="stat-label">Grado Farmacéutico</div>
      </div>
    </div>

    <!-- Botones de Acción -->
    <div class="hero-cta">
      <a href="#catalogo" class="btn-primary">Ver Catálogo de Equipos →</a>
      <a href="#simulador" class="btn-secondary">Probar Sistema Inteligente ⚙️</a>
    </div>
  </section>

  <!-- SECCIÓN: SIMULADOR DE PANEL INTELIGENTE Y FÍSICA DE MARMITA -->
  <section id="simulador" class="section-pad section-alt">
    <div class="container">
      <div class="section-header">
        <span class="section-eyebrow eyebrow-blue">Demostración en Vivo</span>
        <h2 class="section-title">Simulador de Pantalla Táctil HMI</h2>
        <p class="section-subtitle">
          Experimente cómo opera el software de control táctil de nuestras marmitas: seleccione recetas preconfiguradas, regule velocidades de agitación y active el sistema de volteo motorizado.
        </p>
      </div>

      <div class="simulator-box">
        <div class="sim-grid">
          
          <!-- Pantalla HMI Industrial -->
          <div class="hmi-panel">
            <div class="hmi-header">
              <span class="hmi-title">PANEL DE CONTROL DELTA / XINJE</span>
              <span id="sim-status-pill" class="hmi-status-pill pill-stopped">DETENIDO</span>
            </div>

            <!-- Selector de Recetas -->
            <label class="form-label" style="color: #94a3b8;">Receta Preconfigurada:</label>
            <select id="sim-recipe-select" class="recipe-selector">
              <option value="0">Arequipe / Dulce de Leche (98°C - 75% Agitación)</option>
              <option value="1" selected>Salsa Boloñesa (85°C - 40% Agitación)</option>
              <option value="2">Mermelada de Fresa (92°C - 60% Agitación)</option>
              <option value="3">Chocolate Industrial (55°C - 50% Agitación)</option>
              <option value="4">Crema Pastelera (78°C - 45% Agitación)</option>
            </select>

            <!-- Métricas en Tiempo Real -->
            <div class="hmi-metrics-grid">
              <div class="metric-card">
                <div class="metric-title">Temperatura Actual</div>
                <div id="sim-temp-current" class="metric-num temp">24.5°C</div>
              </div>
              <div class="metric-card">
                <div class="metric-title">Temperatura Meta</div>
                <div id="sim-temp-target" class="metric-num">85°C</div>
              </div>
              <div class="metric-card">
                <div class="metric-title">Velocidad Agitación</div>
                <div id="sim-speed-val" class="metric-num">50%</div>
              </div>
              <div class="metric-card">
                <div class="metric-title">Tiempo Restante</div>
                <div id="sim-time" class="metric-num">01:30</div>
              </div>
            </div>

            <!-- Controles Digitales -->
            <div class="hmi-controls">
              <div class="control-row">
                <span style="font-family: var(--font-mono); font-size: 0.75rem; color: #94a3b8;">Velocidad Agitador:</span>
                <input id="sim-speed-slider" type="range" min="10" max="100" value="50" class="range-slider">
              </div>

              <div class="control-row" style="flex-wrap: wrap; gap: 0.5rem;">
                <button id="btn-sim-dir" class="btn-tilt" style="background:#1e293b; color:#38bdf8; border-color:#334155;">
                  GIRO: DIRECTO (FWR)
                </button>
                <button id="btn-sim-water" class="btn-tilt" style="background:#1e293b; color:#38bdf8; border-color:#334155;">
                  💧 LLENADO AGUA (OFF)
                </button>
              </div>

              <!-- Botones de Acción HMI -->
              <div class="hmi-actions-bar">
                <button id="btn-sim-start" class="btn-hmi btn-hmi-start">▶ Iniciar Ciclo</button>
                <button id="btn-sim-stop" class="btn-hmi btn-hmi-stop">⏸ Detener</button>
              </div>

              <button id="btn-sim-estop" class="btn-hmi btn-hmi-estop" style="margin-top: 0.5rem;">
                PARO DE EMERGENCIA (E-STOP)
              </button>
            </div>
          </div>

          <!-- Visualizador Físico de la Marmita -->
          <div class="kettle-visualizer">
            <span style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--slate-500); text-transform: uppercase; font-weight: 700; margin-bottom: 1rem;">
              Visualizador de Tanque y Mecanismos
            </span>

            <div id="kettle-stage" class="kettle-stage">
              <!-- SVG de la Marmita Interactiva -->
              <svg viewBox="0 0 200 200" width="100%" height="100%">
                <!-- Base y soporte -->
                <line x1="30" y1="160" x2="170" y2="160" stroke="#475569" stroke-width="6" stroke-linecap="round"/>
                <line x1="50" y1="160" x2="50" y2="90" stroke="#64748b" stroke-width="8"/>
                <line x1="150" y1="160" x2="150" y2="90" stroke="#64748b" stroke-width="8"/>

                <!-- Olla / Tanque de Acero -->
                <path d="M 60,75 C 60,140 140,140 140,75 Z" fill="#94a3b8" stroke="#334155" stroke-width="3"/>
                
                <!-- Indicador de calor térmico -->
                <path id="kettle-heat-glow" d="M 63,78 C 63,136 137,136 137,78 Z" fill="#ef4444" opacity="0" style="transition: opacity 0.4s;"/>

                <!-- Agitador con paletas giratorias -->
                <g id="mixer-blades" class="mixer-blades" transform="translate(100, 100)">
                  <line x1="0" y1="-25" x2="0" y2="25" stroke="#1e293b" stroke-width="4"/>
                  <rect x="-24" y="-5" width="48" height="10" rx="3" fill="#0f172a"/>
                </g>

                <!-- Tapa Superior y Motor -->
                <rect x="75" y="45" width="50" height="20" rx="3" fill="#475569"/>
                <rect x="90" y="32" width="20" height="13" rx="2" fill="#1e293b"/>
                <circle cx="100" cy="27" r="4" fill="#38bdf8"/>
              </svg>
            </div>

            <!-- Controles de Volteo Motorizado -->
            <div style="width: 100%; margin-top: 1.5rem;">
              <span style="font-family: var(--font-mono); font-size: 0.65rem; color: var(--slate-600); text-transform: uppercase; font-weight: 700; display: block; margin-bottom: 0.5rem;">
                Control de Volteo Motorizado (Mantener presionado)
              </span>
              <div class="tilt-controls-bar">
                <button id="btn-tilt-down" class="btn-tilt">⤵ Inclinar / Bajar</button>
                <button id="btn-tilt-up" class="btn-tilt">⤴ Regresar a 0°</button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  </section>

  <!-- SECCIÓN: CATÁLOGO TÉCNICO E INDUSTRIAL -->
  <section id="catalogo" class="section-pad">
    <div class="container">
      <div class="section-header">
        <span class="section-eyebrow eyebrow-blue">Línea de Productos</span>
        <h2 class="section-title">Catálogo Técnico e Industrial</h2>
        <p class="section-subtitle">
          Equipos robustos de acero inoxidable diseñados para soportar los procesos más exigentes de la industria alimentaria, farmacéutica y clínica.
        </p>
      </div>

      <!-- Selector de Categorías -->
      <div class="filter-wrapper">
        <div class="filter-box">
          <button class="filter-btn active" data-category="todos">Todos</button>
          <button class="filter-btn" data-category="marmita">Marmitas</button>
          <button class="filter-btn" data-category="passthrough">Pass Through</button>
        </div>
      </div>

      <!-- Parrilla de Productos -->
      <div class="products-grid">
        <?php foreach ($products as $p): ?>
          <div class="product-card" data-category="<?php echo htmlspecialchars($p['category']); ?>">
            
            <!-- Esquema Técnico SVG -->
            <div class="card-schematic">
              <span class="card-badge <?php echo $p['badgeClass']; ?>">
                <?php echo $p['badge']; ?>
              </span>

              <?php if ($p['category'] === 'marmita'): ?>
                <svg viewBox="0 0 200 160" width="160" height="130">
                  <line x1="40" y1="120" x2="160" y2="120" stroke="#475569" stroke-width="6" stroke-linecap="round"/>
                  <line x1="55" y1="120" x2="55" y2="60" stroke="#64748b" stroke-width="8"/>
                  <line x1="145" y1="120" x2="145" y2="60" stroke="#64748b" stroke-width="8"/>
                  <rect x="65" y="45" width="70" height="60" rx="20" fill="#cbd5e1" stroke="#94a3b8" stroke-width="3"/>
                  <path d="M 62,45 C 62,35 138,35 138,45 Z" fill="#64748b" stroke="#cbd5e1" stroke-width="1.5"/>
                  <rect x="92" y="18" width="16" height="10" fill="#1e293b" rx="1"/>
                  <circle cx="55" cy="70" r="5" fill="#334155"/>
                  <circle cx="145" cy="70" r="5" fill="#334155"/>
                </svg>
              <?php else: ?>
                <svg viewBox="0 0 200 160" width="160" height="130">
                  <rect x="65" y="15" width="70" height="130" rx="4" fill="#cbd5e1" stroke="#94a3b8" stroke-width="3"/>
                  <rect x="74" y="25" width="52" height="50" rx="2" fill="#0f172a" stroke="#94a3b8" stroke-width="2"/>
                  <rect x="74" y="85" width="52" height="50" rx="2" fill="#0f172a" stroke="#94a3b8" stroke-width="2"/>
                  <rect x="92" y="5" width="16" height="10" fill="#64748b"/>
                </svg>
              <?php endif; ?>
            </div>

            <!-- Cuerpo de Información -->
            <div class="card-body">
              <h3 class="card-title"><?php echo htmlspecialchars($p['name']); ?></h3>
              <span class="card-sub"><?php echo htmlspecialchars($p['subtitle']); ?></span>
              <p class="card-desc"><?php echo htmlspecialchars($p['description']); ?></p>

              <!-- Especificaciones Clave -->
              <ul class="card-specs-list">
                <?php foreach (array_slice($p['specs'], 0, 3) as $spec): ?>
                  <li><?php echo htmlspecialchars($spec); ?></li>
                <?php endforeach; ?>
              </ul>

              <!-- Acordeón Desplegable -->
              <button class="specs-toggle">
                <span>Ficha Técnica Completa</span>
                <span class="toggle-icon">▼</span>
              </button>

              <div class="specs-content">
                <?php foreach ($p['technical'] as $key => $val): ?>
                  <div class="spec-row">
                    <span class="spec-key"><?php echo htmlspecialchars($key); ?>:</span>
                    <span class="spec-val"><?php echo htmlspecialchars($val); ?></span>
                  </div>
                <?php endforeach; ?>
              </div>
            </div>

            <!-- Acciones -->
            <div class="card-actions">
              <a href="#contacto" class="btn-card-quote btn-quote-trigger" data-product="<?php echo htmlspecialchars($p['name']); ?>">
                Cotizar Equipo
              </a>
              <?php if ($p['category'] === 'marmita'): ?>
                <a href="#simulador" class="btn-card-sim">Simular</a>
              <?php endif; ?>
            </div>

          </div>
        <?php endforeach; ?>
      </div>
    </div>
  </section>

  <!-- SECCIÓN: MULTIMEDIA Y REDES SOCIALES -->
  <section id="multimedia" class="section-pad section-alt">
    <div class="container">
      <div class="section-header">
        <span class="section-eyebrow eyebrow-red">Multimedia e Innovación</span>
        <h2 class="section-title">D&H Inox en las Redes</h2>
        <p class="section-subtitle">
          Vea videos explicativos de nuestros equipos en operación y siga nuestras entregas en toda Colombia.
        </p>
      </div>

      <div class="media-grid">
        <!-- Tarjeta de Video Informativo -->
        <div class="media-card">
          <div>
            <span style="font-family: var(--font-mono); font-size: 0.65rem; color: var(--slate-400); text-transform: uppercase; font-weight: 700;">
              Video Demostrativo
            </span>
            <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--slate-900); margin-top: 0.25rem;">
              Funcionamiento de Marmitas y Volteo
            </h3>
            <p style="font-size: 0.8rem; color: var(--slate-600); margin-top: 0.5rem;">
              Observe en tiempo real la eficiencia del volteo motorizado y los raspadores de teflón para evitar adherencias en alimentos densos.
            </p>
          </div>

          <div id="video-screen" class="video-screen">
            <button id="btn-play-video" class="play-circle" title="Reproducir Demostración">▶</button>
            <span style="font-family: var(--font-mono); font-size: 0.7rem; color: #cbd5e1; margin-top: 0.75rem;">
              Haga clic para reproducir simulación
            </span>
          </div>

          <a href="https://www.youtube.com" target="_blank" rel="noreferrer" class="btn-primary" style="text-align: center; justify-content: center;">
            Ingresar al Canal de YouTube
          </a>
        </div>

        <!-- Tarjeta de Redes Sociales -->
        <div class="media-card">
          <div>
            <span style="font-family: var(--font-mono); font-size: 0.65rem; color: var(--slate-400); text-transform: uppercase; font-weight: 700;">
              Canales Digitales
            </span>
            <h3 style="font-size: 1.25rem; font-weight: 700; color: var(--slate-900); margin-top: 0.25rem;">
              Síganos en Redes Sociales
            </h3>
            <p style="font-size: 0.8rem; color: var(--slate-600); margin-top: 0.5rem;">
              Compartimos registros fotográficos de soldadura sanitaria TIG, pruebas hidrostáticas y montajes clínicos.
            </p>
          </div>

          <div style="margin: 1.5rem 0;">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" class="social-link-item social-insta">
              <div class="social-icon-box icon-insta">📸</div>
              <div>
                <span style="font-family: var(--font-mono); font-size: 0.65rem; font-weight: 700; color: #db2777; text-transform: uppercase;">Instagram</span>
                <div style="font-weight: 700; font-size: 0.9rem; color: var(--slate-900);">@dhsteelsas</div>
              </div>
            </a>

            <a href="https://facebook.com" target="_blank" rel="noreferrer" class="social-link-item social-fb">
              <div class="social-icon-box icon-fb">👍</div>
              <div>
                <span style="font-family: var(--font-mono); font-size: 0.65rem; font-weight: 700; color: #2563eb; text-transform: uppercase;">Facebook</span>
                <div style="font-weight: 700; font-size: 0.9rem; color: var(--slate-900);">D&H Steel SAS</div>
              </div>
            </a>
          </div>

          <div style="padding: 0.75rem; background: var(--slate-50); border: 1px solid var(--slate-200); border-radius: 0.75rem; font-size: 0.75rem; color: var(--slate-500); text-align: center;">
            Contáctenos también por mensaje directo en cualquiera de nuestras plataformas oficiales.
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- SECCIÓN: CONTACTO Y COTIZACIÓN -->
  <section id="contacto" class="section-pad">
    <div class="container">
      <div class="section-header">
        <span class="section-eyebrow eyebrow-red">Atención Inmediata</span>
        <h2 class="section-title">Contáctanos Hoy Mismo</h2>
        <p class="section-subtitle">
          Nuestros ingenieros especializados te asesorarán en el diseño y cotización de equipos industriales a la medida de tu empresa.
        </p>
      </div>

      <div class="contact-grid">
        
        <!-- Tarjetas Rápidas de Contacto -->
        <div>
          <a href="https://wa.me/573212749981?text=Hola%20D%26H%20Inox,%20quisiera%20solicitar%20asesor%C3%ADa%20acerca%20de%20sus%20productos." target="_blank" rel="noreferrer" class="contact-quick-card card-whatsapp">
            <div class="contact-icon icon-whatsapp">💬</div>
            <div>
              <div style="font-family: var(--font-mono); font-size: 0.65rem; color: #047857; text-transform: uppercase; font-weight: 800;">WhatsApp Directo</div>
              <div style="font-size: 1.05rem; font-weight: 800; color: var(--slate-900);">+57 321 2749981</div>
              <div style="font-size: 0.75rem; color: var(--slate-600);">Atención técnica y cotizaciones instantáneas</div>
            </div>
          </a>

          <a href="tel:6016786020" class="contact-quick-card card-phone">
            <div class="contact-icon icon-phone">📞</div>
            <div>
              <div style="font-family: var(--font-mono); font-size: 0.65rem; color: #1d4ed8; text-transform: uppercase; font-weight: 800;">Línea Fija Bogotá</div>
              <div style="font-size: 1.05rem; font-weight: 800; color: var(--slate-900);">(601) 678 6020</div>
              <div style="font-size: 0.75rem; color: var(--slate-600);">Lunes a Viernes de 8:00 AM a 5:30 PM</div>
            </div>
          </a>

          <a href="mailto:dyhinoxsas@hotmail.com" class="contact-quick-card card-email">
            <div class="contact-icon icon-email">✉️</div>
            <div>
              <div style="font-family: var(--font-mono); font-size: 0.65rem; color: #b91c1c; text-transform: uppercase; font-weight: 800;">Correo Corporativo</div>
              <div style="font-size: 0.95rem; font-weight: 800; color: var(--slate-900);">dyhinoxsas@hotmail.com</div>
              <div style="font-size: 0.75rem; color: var(--slate-600);">Recepción de planos y pliegos de licitación</div>
            </div>
          </a>

          <div class="contact-quick-card">
            <div class="contact-icon icon-map">📍</div>
            <div>
              <div style="font-family: var(--font-mono); font-size: 0.65rem; color: var(--slate-500); text-transform: uppercase; font-weight: 800;">Planta de Fabricación</div>
              <div style="font-size: 0.95rem; font-weight: 800; color: var(--slate-900);">Calle 181 b # 8 - 57</div>
              <div style="font-size: 0.75rem; color: var(--slate-600);">Bogotá D.C., Colombia</div>
            </div>
          </div>
        </div>

        <!-- Formulario de Cotización PHP -->
        <div class="contact-form-box">
          <form id="contactForm" action="enviar.php" method="POST">
            <div class="form-group">
              <label class="form-label" for="name">Nombre y Apellidos *</label>
              <input type="text" id="name" name="name" class="form-input" placeholder="Ej: Ing. Carlos Pérez" required>
            </div>

            <div class="form-group">
              <label class="form-label" for="email">Correo Electrónico *</label>
              <input type="email" id="email" name="email" class="form-input" placeholder="nombre@empresa.com" required>
            </div>

            <div class="form-group">
              <label class="form-label" for="phone">Teléfono / Celular *</label>
              <input type="tel" id="phone" name="phone" class="form-input" placeholder="Ej: 310 123 4567" required>
            </div>

            <div class="form-group">
              <label class="form-label" for="productInterest">Equipo de Interés</label>
              <select id="productInterest" name="productInterest" class="form-select">
                <option value="Consulta General">Consulta General</option>
                <?php foreach ($products as $p): ?>
                  <option value="<?php echo htmlspecialchars($p['name']); ?>">
                    <?php echo htmlspecialchars($p['name']); ?>
                  </option>
                <?php endforeach; ?>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="message">Mensaje o Requerimiento Técnico *</label>
              <textarea id="message" name="message" class="form-textarea" placeholder="Describa su capacidad requerida, tipo de producto a procesar o medidas especiales..." required></textarea>
            </div>

            <button type="submit" class="btn-submit">Enviar Solicitud de Cotización →</button>

            <!-- Mensaje de respuesta AJAX -->
            <div id="formFeedback" class="form-feedback"></div>
          </form>
        </div>

      </div>
    </div>
  </section>

  <!-- PIE DE PÁGINA -->
  <footer class="footer">
    <div class="container">
      <div class="footer-top">
        <div style="display: flex; align-items: center; gap: 0.75rem;">
          <img src="logo.jpg" alt="D&H INOX SAS" style="height: 40px; border-radius: 8px;">
          <div>
            <span style="font-weight: 800; font-size: 0.85rem; color: var(--slate-900); display: block;">D&H INOX SAS</span>
            <span style="font-family: var(--font-mono); font-size: 0.65rem; color: var(--slate-500);">Soluciones de Alta Calidad y Tecnología</span>
          </div>
        </div>

        <div class="footer-links">
          <a href="#catalogo">Catálogo</a>
          <a href="#simulador">Simulador HMI</a>
          <a href="#multimedia">Multimedia</a>
          <a href="#contacto">Contacto</a>
        </div>
      </div>

      <div class="footer-bottom">
        <span>&copy; <?php echo date('Y'); ?> D&H INOX SAS. Todos los derechos reservados.</span>
        <span>Fabricado con Acero Inoxidable Ref. 304 Sanitario • Bogotá, Colombia</span>
      </div>
    </div>
  </footer>

  <!-- Scripts -->
  <script src="js/app.js"></script>
</body>
</html>
