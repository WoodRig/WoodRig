import { products } from './catalog'
import type { Configuration } from '../types/catalog'

export function configurationOptions(productSlug: string) {
  return products.filter(({ slug }) => slug !== productSlug && (slug === 'pedals' || slug === 'accessories'))
}

export function parseConfiguration(productSlug: unknown, extras: unknown): Configuration | null {
  if (typeof productSlug !== 'string' || !products.some(({ slug }) => slug === productSlug)) return null

  const requested = Array.isArray(extras) ? extras : [extras]
  const accessorySlugs = configurationOptions(productSlug)
    .map(({ slug }) => slug)
    .filter((slug) => requested.includes(slug))
    .sort()

  return { productSlug, accessorySlugs }
}
