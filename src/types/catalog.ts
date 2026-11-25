export interface Category {
  slug: string
  name: string
}

export interface ProductMedia {
  image?: string
  alt?: string
  model?: { src: string; poster: string }
  assembly?: { src: string; poster: string }
  folding?: { src: string; poster: string }
}

export interface Product {
  slug: string
  name: string
  description: string
  category: Category
  media?: ProductMedia
}

export interface Variant {
  id: string
  name: string
}

export interface Accessory extends Product {
  compatibleProductSlugs?: string[]
}

export interface Pack extends Product {
  productSlugs?: string[]
}

export interface Configuration {
  productSlug: string
  variantId?: string
  accessorySlugs: string[]
}

export interface CartItem {
  id: string
  configuration: Configuration
  quantity: number
}
