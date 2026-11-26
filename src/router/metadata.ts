import type { RouteLocationNormalized } from 'vue-router'
import { products } from '../data/catalog'

const defaults = {
  title: 'WoodRig | Simracing con carácter',
  description: 'Descubre WoodRig, una gama de cockpits y soportes de simracing en desarrollo, diseñada en torno a la estabilidad, el espacio y la modularidad.',
  image: '/images/woodrig-rally.webp',
}

export function updatePageMetadata(route: RouteLocationNormalized) {
  const product = route.name === 'product'
    ? products.find(({ slug }) => slug === route.params.slug)
    : undefined
  const missingProduct = route.name === 'product' && !product
  const label = product?.name ?? (missingProduct ? 'Producto no encontrado' : route.meta.title)
  const title = typeof label === 'string' ? label + ' | WoodRig' : defaults.title
  const description = product?.description ?? (missingProduct
    ? 'Esta familia no está disponible en el catálogo de WoodRig.'
    : typeof route.meta.description === 'string' ? route.meta.description : defaults.description)
  const image = new URL(product?.media?.image ?? defaults.image, window.location.origin).href

  document.title = title
  setContent('meta[name="description"]', description)
  setContent('meta[property="og:title"]', title)
  setContent('meta[property="og:description"]', description)
  setContent('meta[property="og:image"]', image)
  setContent('meta[name="robots"]', route.meta.privateDemo || missingProduct || route.name === 'not-found'
    ? 'noindex, follow' : 'index, follow')
}

function setContent(selector: string, value: string) {
  document.querySelector(selector)?.setAttribute('content', value)
}
