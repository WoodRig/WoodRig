import type { Category, Product } from '../types/catalog'

export const concept = {
  image: '/images/woodrig-rally.webp',
  detail: '/images/woodrig-joint.webp',
  folding: '/images/woodrig-fold.webp',
  alt: 'Cockpit de madera con asiento deportivo negro en una postura más vertical',
  detailAlt: 'Detalle conceptual de una articulación de acero negro sobre madera laminada',
  foldingAlt: 'Estudio de un bastidor de madera recogido en posición vertical',
}

const supports = { slug: 'soportes', name: 'Soportes', description: 'Plataformas independientes para volante y pedales. Pedals es la primera pieza que queremos probar.' }
const cockpits = { slug: 'cockpits', name: 'Cockpits', description: 'Rally es el primer cockpit previsto. Formula explora una postura más reclinada.' }
const accessories = { slug: 'accesorios', name: 'Accesorios', description: 'Placas e interfaces previstas para montar el volante, el cambio y el freno de mano.' }
const seats = { slug: 'asientos', name: 'Asientos', description: 'Asiento de referencia y adaptador de guías para estudiar postura, acceso y montaje.' }
const monitors = { slug: 'monitores', name: 'Monitores', description: 'Concepto de soporte independiente para colocar una pantalla frente al cockpit.' }
const spares = { slug: 'repuestos', name: 'Repuestos', description: 'Piezas de montaje y reposición previstas para las futuras versiones del chasis.' }
const packs = { slug: 'packs', name: 'Packs', description: 'Combinaciones en estudio que dependen de validar cada soporte por separado y en conjunto.' }

export const categories: readonly Category[] = [supports, cockpits, accessories, seats, monitors, spares, packs]

// Array order reflects development priority across the entire range.
export const products: Product[] = [
  {
    slug: 'pedals', name: 'Pedals', category: supports, demo: true,
    status: 'Primera muestra prevista',
    description: 'Plataforma baja para usar la pedalera en el suelo. Estudiamos cómo sujetar la silla y reutilizar la placa en un cockpit.',
    pending: ['Deslizamiento durante la frenada y retención de la silla.', 'Rigidez, patrones de montaje y espacio para los cables.'],
    media: { image: '/images/woodrig-pedals.webp', alt: 'Render de una pedalera sobre una plataforma de madera y metal' },
  },
  {
    slug: 'stand', name: 'Stand', category: supports, demo: true,
    status: 'Concepto en estudio',
    description: 'Soporte independiente para montar un volante con tu asiento habitual y estudiar su uso junto a Pedals.',
    pending: ['Estabilidad y flexión con el volante montado.', 'Altura, alcance, paso de piernas y unión con Pedals.'],
    media: { image: '/images/woodrig-stand.webp', alt: 'Render de un soporte de madera con un volante montado' },
  },
  {
    slug: 'rally', name: 'Rally', category: cockpits, demo: true,
    status: 'Primer cockpit previsto',
    description: 'Cockpit de postura más vertical. El primer diseño parte de un bastidor fijo que se pueda desmontar para transporte.',
    pending: ['Geometría del asiento, acceso y alcance del volante y la pedalera.', 'Rigidez del bastidor, estabilidad y resistencia de las uniones tras varios montajes.'],
    media: { image: concept.image, alt: concept.alt },
  },
  {
    slug: 'placa-volante', name: 'Placa de volante', category: accessories,
    status: 'Interfaz por definir',
    description: 'Placa sustituible para estudiar cómo montar distintas bases de volante en el bastidor.',
    pending: ['Patrones de tornillos, acceso a los conectores y recorrido de ajuste.', 'Flexión y giro de la placa con bases de referencia.'],
  },
  {
    slug: 'soporte-cambio-freno', name: 'Soporte para cambio y freno', category: accessories,
    status: 'Concepto en estudio',
    description: 'Brazo lateral para situar la palanca de cambio o el freno de mano al alcance del asiento.',
    pending: ['Montaje a la izquierda o derecha y espacio para accionar las palancas.', 'Rigidez de la unión lateral y desgaste con uso repetido.'],
  },
  {
    slug: 'adaptador-asiento', name: 'Adaptador y guías de asiento', category: seats,
    status: 'Interfaz por definir',
    description: 'Adaptador para montar guías de asiento de terceros y estudiar el recorrido de ajuste.',
    pending: ['Patrón de anclaje, recorrido útil y bloqueo con las guías seleccionadas.', 'Acceso a los tornillos y carga del conjunto montado.'],
  },
  {
    slug: 'accessories', name: 'Asiento de referencia', category: seats, demo: true,
    status: 'Selección de proveedor',
    description: 'Asiento de terceros previsto como referencia para definir la postura y la interfaz del Rally.',
    pending: ['Elección del modelo, anclajes y acceso al cockpit.', 'Incluido en el mismo bulto o enviado por separado, según coste y protección.'],
    media: { image: '/images/woodrig-accessories.webp', alt: 'Render conceptual de un asiento deportivo negro' },
  },
  {
    slug: 'soporte-monitor', name: 'Soporte de monitor individual', category: monitors,
    status: 'Concepto en estudio',
    description: 'Base independiente del cockpit para colocar una pantalla frente al asiento.',
    pending: ['Patrón VESA y margen de ajuste con pantallas de referencia.', 'Estabilidad, huella y transporte con la base desmontada.'],
  },
  {
    slug: 'kit-repuestos', name: 'Kit de montaje y repuestos', category: spares,
    status: 'Pendiente de despiece',
    description: 'Selección prevista de tornillos, insertos y apoyos identificados por versión de montaje.',
    pending: ['Inventario de piezas por revisión y forma de identificar cada recambio.', 'Par de montaje, repetición de uso y contenido final del kit.'],
  },
  {
    slug: 'formula', name: 'Formula', category: cockpits, demo: true,
    status: 'Exploración posterior',
    description: 'Cockpit de postura reclinada. Su desarrollo depende de lo que aprendamos con Rally y los primeros soportes.',
    pending: ['Acceso al asiento, altura de pedales y ajuste para distintas estaturas.', 'Piezas que se pueden reutilizar del Rally sin comprometer la postura.'],
    media: { image: '/images/woodrig-formula.webp', alt: 'Render de un cockpit de madera con asiento bajo y reclinado' },
  },
  {
    slug: 'packs', name: 'Pack de soportes', category: packs, demo: true,
    status: 'Pendiente de validar los soportes',
    description: 'Concepto de pedido conjunto con Stand y Pedals para quien ya dispone de asiento.',
    pending: ['Uso de ambos soportes con una misma silla y espacio para ajustar pedales.', 'Ahorro de preparación y transporte con un único envío.'],
    media: { image: '/images/woodrig-packs.webp', alt: 'Render conceptual de un soporte de volante y otro de pedales' },
  },
]
