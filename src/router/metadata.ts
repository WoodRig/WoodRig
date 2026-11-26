import type { RouteLocationNormalized } from 'vue-router'
import { publicOrigin, searchPageFor } from '../data/search'

export function updatePageMetadata(route: RouteLocationNormalized) {
  const metadata = searchPageFor(route.path)
  const origin = publicOrigin(import.meta.env.VITE_SITE_URL)

  document.title = metadata.title
  setContent('meta[name="description"]', metadata.description)
  setContent('meta[property="og:title"]', metadata.title)
  setContent('meta[property="og:description"]', metadata.description)
  const existingImage = document.querySelector('meta[property="og:image"]')
  if (metadata.image) {
    const image = existingImage ?? document.createElement('meta')
    image.setAttribute('property', 'og:image')
    image.setAttribute('content', new URL(metadata.image, origin ?? window.location.origin).href)
    if (!existingImage) document.head.append(image)
  } else {
    existingImage?.remove()
  }
  setContent('meta[name="robots"]', metadata.noindex ? 'noindex, follow' : 'index, follow')

  const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]')
  if (!origin || metadata.noindex) {
    canonical?.remove()
  } else {
    const link = canonical ?? document.createElement('link')
    link.rel = 'canonical'
    link.href = new URL(route.path.toLowerCase().replace(/\/$/, '') || '/', origin).href
    if (!canonical) document.head.append(link)
  }
}

function setContent(selector: string, value: string) {
  document.querySelector(selector)?.setAttribute('content', value)
}
