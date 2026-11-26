import { site } from '../config/site'
import { categories, products } from './catalog'

const description = 'Cockpits y soportes de simracing de madera y acero en desarrollo. Compara Rally y Formula y comprueba qué espacio necesita tu equipo.'
const image = '/images/woodrig-rally.webp'

interface SearchPage {
  title: string
  description: string
  image: string | null
  noindex: boolean
}

function page(label: string, summary: string, noindex = false, picture: string | null = image): SearchPage {
  return { title: label + ' | WoodRig', description: summary, image: picture, noindex }
}

export const homeSearchPage: SearchPage = {
  title: 'WoodRig | Cockpits de simracing de madera y acero',
  description,
  image,
  noindex: false,
}

export const missingSearchPage = page('Página no encontrada', 'Explora la gama de simracing de WoodRig.', true)

export const searchPages: Readonly<Record<string, SearchPage>> = {
  '/': homeSearchPage,
  '/productos': page('Catálogo conceptual de simracing', 'Explora las propuestas en orden de desarrollo, desde Pedals hasta Rally, sus accesorios y repuestos.'),
  ...Object.fromEntries(categories.map(({ slug, name, description: summary }) => [
    '/' + slug, page(name + ' de simracing', summary),
  ])),
  '/cockpits': page('Compara los cockpits Rally y Formula', 'Compara la postura vertical de Rally y la reclinada de Formula, y comprueba qué medir en casa.'),
  '/configurador': page('Configurador de simracing', 'Combina un concepto WoodRig con accesorios y comparte tu selección.'),
  '/ingenieria': page('Ingeniería y materiales', 'Descubre cómo WoodRig plantea la estructura, las uniones y los materiales de sus cockpits y soportes.'),
  '/nosotros': page('Sobre WoodRig', 'Conoce el proyecto y su enfoque para diseñar equipos de simracing que encajen en casa.'),
  '/compatibilidad': page('Compatibilidad y espacio para tu cockpit', 'Guía para medir el espacio disponible y revisar los anclajes del volante, la pedalera y el asiento.'),
  '/soporte': page('Soporte WoodRig', 'Consulta preguntas frecuentes sobre la gama, compatibilidad y pedidos de prueba.'),
  '/carrito': page('Carrito de prueba', 'Carrito de la demostración WoodRig.', true),
  '/checkout': page('Pedido de prueba', 'Confirmación de pedidos de demostración WoodRig.', true),
  '/cuenta': page('Historial de prueba', 'Historial de pedidos de demostración WoodRig.', true),
  ...Object.fromEntries(site.legal.map(({ path, name }) => [path, page(name, 'Borrador de la documentación de WoodRig.', true)])),
  ...Object.fromEntries(products.map((product) => [
    '/producto/' + product.slug, page(product.name, product.description, false, product.media?.image ?? null),
  ])),
}

export function searchPageFor(path: string) {
  return searchPages[path.toLowerCase().replace(/\/$/, '') || '/']
    ?? (path.startsWith('/producto/') ? page('Producto no encontrado', 'Esta familia no está disponible en el catálogo.', true) : missingSearchPage)
}

export function publicOrigin(value: string | undefined) {
  if (!value) return
  try {
    const url = new URL(value)
    if (url.protocol === 'https:' && url.href === url.origin + '/') return url.origin
  } catch {
    // A canonical origin is optional in development and preview.
  }
}
