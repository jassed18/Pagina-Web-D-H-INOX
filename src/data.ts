import { Product } from './types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'marmita-semi-automatica',
    category: 'marmita',
    name: 'Marmita Semi-Automática DYH',
    subtitle: 'Solución eficiente con control analógico avanzado',
    description: 'La Marmita Semi-Automática DYH combina la robustez del acero inoxidable 304 con un panel de control manual optimizado para operaciones de precisión. Ideal para procesos de cocción que requieren supervisión constante y flexibilidad operativa.',
    generalSpecs: [
      'Capacidades disponibles: 20, 40, 60, 80, 100 y 120 galones.',
      'Fabricada totalmente en acero inoxidable Ref. 304 (grado alimenticio).',
      'Material a prueba de ácidos y magnéticos.',
      'Calentamiento por gas natural (transferencia indirecta de calor por glicerina biodegradable).',
      'Opciones de calentamiento alternativo: Eléctrico o a Vapor.'
    ],
    features: [
      {
        title: 'Componentes del Tablero de Control',
        items: [
          'Botones de inclinamiento para el sistema de volteo de la olla.',
          'Botón de paro de emergencia (E-STOP) para detener de inmediato todos los accionamientos mecánicos.',
          'Interruptor Burner para encendido automático del quemador.',
          'Controlador digital de temperatura (PV/SV) para conocer la temperatura actual y programar el límite esperado.',
          'Botón selector para encendido y direccionamiento del agitador (rotación reversa o directa).'
        ]
      },
      {
        title: 'Detalles del Tanque y Estructura',
        items: [
          'Estructura de soporte robusta con ruedas giratorias de alta resistencia con freno.',
          'Tanque de cocción con chaqueta para fluido de transferencia de calor.',
          'Acabado sanitario de fácil limpieza.'
        ]
      }
    ],
    specifications: [
      { label: 'Capacidad', value: '20 - 120 Galones' },
      { label: 'Material', value: 'Acero Inoxidable Ref. 304' },
      { label: 'Calentamiento', value: 'Gas Natural / Eléctrico / Vapor' },
      { label: 'Fluido Térmico', value: 'Glicerina Grado Alimenticio / Biodegradable' },
      { label: 'Control Agitación', value: 'Selectores de dirección y velocidad' },
      { label: 'Movilidad', value: 'Ruedas con freno de seguridad' }
    ],
    status: 'disponible'
  },
  {
    id: 'marmita-automatica',
    category: 'marmita',
    name: 'Marmita Automática Inteligente DYH',
    subtitle: 'Control total digitalizado y automatización para recetas',
    description: 'La Marmita Automática DYH ofrece control absoluto sobre las variables críticas de cocción. Su pantalla táctil HMI permite guardar recetas, automatizar ciclos y asegurar la homogeneidad y repetibilidad del producto final.',
    generalSpecs: [
      'Capacidades disponibles: 20 a 120 galones.',
      'Estructura compacta e higiénica en acero inoxidable Ref. 304.',
      'Sistema de volteo motorizado y automatizado.',
      'Control preciso de temperatura, tiempo y velocidad de agitación.',
      'Sistemas de seguridad redundantes.'
    ],
    features: [
      {
        title: 'Interfaz HMI & Panel de Pantalla',
        items: [
          'E-STOP: Paro de emergencia electromecánico para anulación de fuerza.',
          'MIXER Mode: Selector automático/manual del modo de operación del mezclador basado en recetas.',
          'TURN CONTROL: Volteo automático motorizado para un descargue de alimentos rápido y seguro.',
          'PANTALLA HMI Delta/Xinje: Modificación intuitiva de velocidades, temperaturas y tiempos de cocción.',
          'WATER FILL: Control del nivel de agua automatizado para el llenado óptimo de la olla.',
          'HEAT: Indicador visual de encendido y sistema de alerta de fallas.'
        ]
      },
      {
        title: 'Control por Recetas',
        items: [
          'Memoria integrada para múltiples programas de cocción.',
          'Monitoreo gráfico en tiempo real de temperatura y ciclo.',
          'Control de velocidad de agitación proporcional (VFD).'
        ]
      }
    ],
    specifications: [
      { label: 'Capacidad', value: '20 - 120 Galones' },
      { label: 'Material', value: 'Acero Inoxidable Ref. 304' },
      { label: 'Controlador', value: 'Pantalla HMI Táctil (Delta / Xinje)' },
      { label: 'Volteo', value: 'Automático / Motorizado' },
      { label: 'Sistema de Llenado', value: 'Control Water Fill Automático' },
      { label: 'Velocidad de Agitación', value: 'Regulación Electrónica por Receta' }
    ],
    status: 'disponible'
  },
  {
    id: 'agitador-industrial',
    category: 'marmita',
    name: 'Agitador Tipo Ancla de Doble Acción',
    subtitle: 'Máxima potencia para mezclas densas y alimentos pesados',
    description: 'Diseñado específicamente para optimizar la transferencia de calor y mantener la homogeneidad en alimentos espesos. Evita que el producto se adhiera a las paredes del tanque gracias a sus raspadores activos.',
    generalSpecs: [
      'Manufacturado en acero inoxidable Ref. 304.',
      'Raspadores de teflón de grado alimenticio auto-ajustables.',
      'Accionado por motoreductor trifásico tándem de alto torque.',
      'Diseño desmontable para un mantenimiento rápido.'
    ],
    features: [
      {
        title: 'Características Destacadas',
        items: [
          'Diseño de tipo ancla para fácil desmonte y posterior descargue de la olla.',
          'Sistemas de doble acción para mayor potencia en mezclas densas o manejo de alimentos pesados.',
          'Raspadores de teflón que barren continuamente las paredes de la olla para evitar quemaduras o adherencias.',
          'Eje rectificado balanceado para evitar vibraciones en la marmita.'
        ]
      }
    ],
    specifications: [
      { label: 'Material', value: 'Acero Inoxidable Ref. 304' },
      { label: 'Raspadores', value: 'Teflón Grado Alimenticio' },
      { label: 'Motorización', value: 'Motoreductor Trifásico Tándem' },
      { label: 'Tipo de Diseño', value: 'Ancla Removible' },
      { label: 'Acción', value: 'Doble Acción Seleccionable' }
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
