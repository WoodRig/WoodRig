import { products } from './catalog'
import type { Configuration } from '../types/catalog'

// Preserve existing demo links and orders without adding unvalidated interfaces to the checkout.
export const demoProducts = products.filter(({ demo }) => demo)

export function configurationOptions(productSlug: string) {
  return products.filter(({ slug }) => slug !== productSlug && (slug === 'pedals' || slug === 'accessories'))
}

export function parseConfiguration(productSlug: unknown, extras: unknown): Configuration | null {
  if (typeof productSlug !== 'string' || !demoProducts.some(({ slug }) => slug === productSlug)) return null

  const requested = Array.isArray(extras) ? extras : [extras]
  const accessorySlugs = configurationOptions(productSlug)
    .map(({ slug }) => slug)
    .filter((slug) => requested.includes(slug))
    .sort()

  return { productSlug, accessorySlugs }
}
