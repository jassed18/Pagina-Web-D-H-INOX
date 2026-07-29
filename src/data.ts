import { Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'marmita-automatica-volcable',
    category: 'marmita',
    name: 'Marmita Automática Volcable',
    subtitle: 'Solución inteligente con sistema de volteo motorizado',
    description: 'La Marmita Automática Volcable DYH ofrece control total sobre las variables críticas de cocción. Su pantalla táctil e interfaz inteligente permiten programar ciclos de cocción, volteo automatizado y control térmico preciso.',
    generalSpecs: [
      'Capacidades disponibles: 20, 40, 60, 80, 100 y 120 galones.',
      'Estructura compacta e higiénica totalmente en acero inoxidable Ref. 304.',
      'Sistema de volteo motorizado con seguro electromecánico de posición.',
      'Calentamiento por transferencia indirecta con glicerina biodegradable.',
      'Pantalla táctil interactiva con almacenamiento de programas de cocción.'
    ],
    features: [
      {
        title: 'Panel de Control y Pantalla Táctil',
        items: [
          'E-STOP: Paro de emergencia electromecánico de anulación inmediata de fuerza.',
          'TURN CONTROL: Volteo automático motorizado para descargue rápido y seguro.',
          'PANTALLA TÁCTIL INTELIGENTE (Delta / Xinje): Control de temperaturas, tiempos y programas.',
          'WATER FILL: Control del nivel de agua automatizado para llenado rápido de la olla.',
          'HEAT ALERTS: Indicador visual de calentamiento activo y alertas de seguridad.'
        ]
      },
      {
        title: 'Estructura y Tanque Sanitario',
        items: [
          'Chaqueta de calentamiento indirecto con fluido térmico / glicerina grado alimenticio.',
          'Válvula de seguridad por sobrepresión y termostato de protección térmica.',
          'Acabado sanitario de pulido espejo en bordes y soldaduras TIG de penetración completa.'
        ]
      }
    ],
    specifications: [
      { label: 'Capacidad', value: '20 - 120 Galones' },
      { label: 'Material', value: 'Acero Inoxidable Ref. 304' },
      { label: 'Controlador', value: 'Pantalla Táctil Inteligente' },
      { label: 'Sistema Volteo', value: 'Automático / Motorizado' },
      { label: 'Calentamiento', value: 'Gas Natural / Eléctrico / Vapor' },
      { label: 'Llenado Agua', value: 'Control Water Fill Automático' }
    ],
    status: 'disponible'
  },
  {
    id: 'marmita-automatica-volcable-agitador',
    category: 'marmita',
    name: 'Marmita Automática Volcable con Agitador',
    subtitle: 'Cocción homogénea con agitación constante de velocidad variable',
    description: 'Integra el sistema de volteo motorizado inteligente con un potente sistema de agitación constante. Ideal para sopas, cremas, salsas y preparaciones que requieren mezcla continua sin adherencia.',
    generalSpecs: [
      'Capacidades disponibles: 20 a 120 galones en acero inoxidable Ref. 304.',
      'Sistema de agitación con variador de frecuencia (VFD) integrado.',
      'Raspadores de teflón de grado alimenticio auto-ajustables.',
      'Pantalla táctil con control programable de velocidad de agitación y recetas.',
      'Volteo motorizado automático para descargue completo.'
    ],
    features: [
      {
        title: 'Agitación y Mezclado Inteligente',
        items: [
          'Mezclador de eje balanceado con sentido de rotación directo y reverso.',
          'Raspadores de teflón que barren continuamente las paredes evitando que el producto se adhiera.',
          'Modo MIXER automatizado sincronizado con la temperatura y el tiempo del ciclo.',
          'Variador de frecuencia VFD para regulación suave de la velocidad.'
        ]
      },
      {
        title: 'Automatización y Seguridad',
        items: [
          'Botón de paro de emergencia E-STOP y protección contra sobrecalentamiento.',
          'Pantalla táctil inteligente para programación y almacenamiento de recetas.',
          'Sistema automático de llenado de agua (Water Fill).'
        ]
      }
    ],
    specifications: [
      { label: 'Capacidad', value: '20 - 120 Galones' },
      { label: 'Material', value: 'Acero Inoxidable Ref. 304' },
      { label: 'Agitación', value: 'Mezclador Continuo con Raspadores Teflón' },
      { label: 'Regulación Speed', value: 'Variador VFD Electrónico' },
      { label: 'Controlador', value: 'Pantalla Táctil e Interfaz Inteligente' },
      { label: 'Sistema Volteo', value: 'Automático Motorizado' }
    ],
    status: 'disponible'
  },
  {
    id: 'marmita-automatica-volcable-agitador-doble-accion',
    category: 'marmita',
    name: 'Marmita Automática Volcable con Agitador de Doble Acción',
    subtitle: 'Máxima potencia para mezclas de alta densidad y viscosidad',
    description: 'Equipada con agitador tipo ancla de doble acción y motores tándem de alto torque. Diseñada para productos exigentes como arequipe, chocolates, mermeladas y masas pesadas que requieren esfuerzo mecánico superior.',
    generalSpecs: [
      'Capacidades de 20 a 120 galones totalmente en acero inoxidable sanitario Ref. 304.',
      'Sistema de agitación de doble acción para máxima homogeneidad.',
      'Raspadores de teflón de alto rendimiento para barrido periférico completo.',
      'Motoreductor trifásico tándem de alto torque con protección de sobrecarga.',
      'Pantalla táctil inteligente con gestión avanzada de recetas complejas.'
    ],
    features: [
      {
        title: 'Agitador Tipo Ancla Doble Acción',
        items: [
          'Mecanismo de doble acción de alta potencia para mezclas ultra densas.',
          'Raspadores de teflón auto-ajustables que evitan quemaduras y adherencias.',
          'Eje rectificado removible de fácil desmonte y desinfección sanitaria.',
          'Selección de velocidad e inversión de marcha electrónica por receta.'
        ]
      },
      {
        title: 'Control por Pantalla Táctil',
        items: [
          'Memorización de parámetros exactos de viscosidad, temperatura y tiempo.',
          'Supervisión gráfica de curvas de cocción en tiempo real.',
          'Volteo motorizado automático de inclinación progresiva.'
        ]
      }
    ],
    specifications: [
      { label: 'Capacidad', value: '20 - 120 Galones' },
      { label: 'Material', value: 'Acero Inoxidable Ref. 304 Sanitario' },
      { label: 'Tipo Agitador', value: 'Doble Acción Ancla con Raspadores Teflón' },
      { label: 'Motorización', value: 'Motoreductor Trifásico Tándem Alto Torque' },
      { label: 'Controlador', value: 'Pantalla Táctil Inteligente (Delta / Xinje)' },
      { label: 'Inclinación', value: 'Volteo Motorizado Automático' }
    ],
    status: 'disponible'
  },
  {
    id: 'pass-through-1-cabina',
    category: 'passthrough',
    name: 'Pass Through 1 Cabina DYH',
    subtitle: 'Cámara de transferencia higiénica simple para laboratorios',
    description: 'Cámara ideal para la transferencia segura de materiales entre áreas limpias y sucias. Su diseño con bordes redondeados y sellos magnéticos garantiza la máxima contención del aire de forma elegante.',
    generalSpecs: [
      'Manufacturado totalmente en lámina de acero inoxidable Calibre 18 Ref. 304 y 430.',
      'Marcos y vidrios templados de 5 mm de alta resistencia.',
      'Empaque de caucho con cinta magnética para sellado hermético.',
      'Internamente con bordes redondeados que no permiten focos de infección y facilitan la desinfección.'
    ],
    features: [
      {
        title: 'Sistemas de Seguridad y Ventilación',
        items: [
          'Incluye seguros mecánicos para puertas que impiden la apertura simultánea.',
          'Tubo superior de acople de 3” o 4” para sistema de extracción o inyección de aire.',
          'Rejilla intermedia con perforaciones decorativas y funcionales.',
          'Con posibilidad de entrepaño regulable para una mejor distribución del espacio interior.'
        ]
      }
    ],
    specifications: [
      { label: 'Capacidad', value: '1 Cabina / Compartimento' },
      { label: 'Material Exterior', value: 'Acero Inoxidable Calibre 18 Ref. 304/430' },
      { label: 'Vidrio', value: 'Templado de 5 mm' },
      { label: 'Sello', value: 'Empaque de Caucho con Cinta Magnética' },
      { label: 'Ventilación', value: 'Acople de 3" o 4" Superior' },
      { label: 'Opcionales', value: 'Entrepaño Removible / Seguros Electromagnéticos' }
    ],
    status: 'disponible'
  },
  {
    id: 'pass-through-2-cabinas',
    category: 'passthrough',
    name: 'Pass Through 2 Cabinas Verticales DYH',
    subtitle: 'Doble compartimento independiente para alto flujo de materiales',
    description: 'Perfecto para separar flujos de materiales de diferente naturaleza o aumentar la frecuencia de paso sin comprometer la pureza de las áreas limpias. Compartimentos apilados verticalmente de forma compacta.',
    generalSpecs: [
      'Estructura de acero inoxidable Calibre 18 Ref. 304 y 430 de alta resistencia.',
      'Dos compartimentos independientes sellados de forma individual.',
      'Vidrios templados de 5 mm con empaques magnéticos.',
      'Acabados sanitarios en bordes interiores.'
    ],
    features: [
      {
        title: 'Seguridad Operacional',
        items: [
          'Sistema de enclavamiento (interlock) para evitar la apertura de lados opuestos.',
          'Opción de Seguros Electromagnéticos de alta potencia con Sensor de Proximidad.',
          'Tubo superior de extracción centralizada para ambas cabinas.'
        ]
      }
    ],
    specifications: [
      { label: 'Capacidad', value: '2 Cabinas Independientes' },
      { label: 'Material', value: 'Acero Inoxidable Ref. 304 y 430' },
      { label: 'Espesor Vidrio', value: '5 mm Templado' },
      { label: 'Tipo de Cierre', value: 'Seguros Mecánicos o Electromagnéticos' },
      { label: 'Acople Aire', value: 'Tubo de Ventilación en Acero' }
    ],
    status: 'disponible'
  },
  {
    id: 'pass-through-3-cabinas',
    category: 'passthrough',
    name: 'Pass Through 3 Cabinas Integradas DYH',
    subtitle: 'Capacidad máxima de transferencia para quirófanos y salas blancas',
    description: 'La solución más completa para clínicas, farmacéuticas y laboratorios de alta exigencia. Tres cabinas independientes que agilizan el paso de múltiples elementos minimizando pérdidas de presión.',
    generalSpecs: [
      'Fabricación integral en acero inoxidable Ref. 304 para máxima asepsia.',
      'Tres compartimentos individuales con cierre hermético.',
      'Sello por cinta magnética de alta sujeción.',
      'Bordes redondeados e interior pulido espejo para evitar acumulación de bacterias.'
    ],
    features: [
      {
        title: 'Tecnología de Cierre y Sensores',
        items: [
          'Sistemas de Seguros Electromagnéticos avanzados.',
          'Indicadores LED de estado (Abierto / Cerrado) por cada cabina.',
          'Sensores de proximidad infrarrojos para apertura sin contacto manual (asepsia total).'
        ]
      }
    ],
    specifications: [
      { label: 'Capacidad', value: '3 Cabinas Verticales' },
      { label: 'Material', value: 'Acero Inoxidable Sanitario Ref. 304' },
      { label: 'Vidrio', value: 'Vidrio Templado de 5 mm' },
      { label: 'Cierre', value: 'Electromagnético con Sensor de Proximidad' },
      { label: 'Bordes Interiores', value: 'Redondeados sanitarios' }
    ],
    status: 'disponible'
  }
];
