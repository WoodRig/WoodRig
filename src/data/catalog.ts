import type { Category, Product } from '../types/catalog'

export const concept = {
  image: '/images/woodrig-rally.webp',
  detail: '/images/woodrig-joint.webp',
  folding: '/images/woodrig-fold.webp',
  alt: 'Cockpit compacto con perfiles delgados de madera y asiento deportivo negro',
  detailAlt: 'Detalle conceptual de una articulación de acero negro sobre madera laminada',
  foldingAlt: 'Estudio de un bastidor de madera recogido en posición vertical',
}

const cockpits = { slug: 'cockpits', name: 'Cockpits' }
const stands = { slug: 'soportes', name: 'Soportes' }

function family(slug: string, name: string, category: Category, description: string, alt: string): Product {
  return { slug, name, category, description, media: { image: '/images/woodrig-' + slug + '.webp', alt } }
}

export const products = [
  family('formula', 'Formula', cockpits, 'Cockpit completo con una posición de conducción inspirada en la Fórmula.', 'Cockpit de madera con asiento bajo y reclinado'),
  family('rally', 'Rally', cockpits, 'Cockpit completo con una posición de conducción más vertical.', concept.alt),
  family('stand', 'Stand', stands, 'Soporte independiente para montar tu volante.', 'Soporte plegable de madera con un volante montado'),
  family('pedals', 'Pedals', stands, 'Soporte independiente y regulable para tu pedalera.', 'Pedalera inclinada sobre un soporte compacto de madera y metal'),
  family('accessories', 'Accessories', { slug: 'accesorios', name: 'Accesorios' }, 'Asientos, refuerzos y complementos para ampliar tu equipo.', 'Asiento deportivo negro con guías de montaje'),
  family('packs', 'Packs', { slug: 'packs', name: 'Packs' }, 'Combinaciones de la gama para montar tu equipo por etapas.', 'Conjunto con soportes separados de volante y pedales'),
]
