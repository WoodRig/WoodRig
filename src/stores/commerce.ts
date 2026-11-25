import { defineStore } from 'pinia'
import { products } from '../data/catalog'
import type { CartItem, Configuration } from '../types/catalog'

interface DemoOrder {
  id: string
  date: string
  items: CartItem[]
}

export const useCartStore = defineStore('cart', {
  state: () => ({ items: [] as CartItem[], orders: [] as DemoOrder[] }),
  getters: {
    count: ({ items }) => items.reduce((sum, item) => sum + item.quantity, 0),
  },
  actions: {
    add(configuration: Configuration) {
      if (!products.some(({ slug }) => slug === configuration.productSlug)) return
      const accessorySlugs = [...new Set(configuration.accessorySlugs)].sort()
      const selection = { ...configuration, accessorySlugs }
      const id = JSON.stringify([selection.productSlug, selection.variantId, accessorySlugs])
      const item = this.items.find((line) => line.id === id)
      if (item) this.setQuantity(id, item.quantity + 1)
      else this.items.push({ id, configuration: selection, quantity: 1 })
    },
    setQuantity(id: string, quantity: number) {
      const item = this.items.find((line) => line.id === id)
      const next = Math.min(99, Math.max(1, Math.trunc(quantity) || 1))
      if (item) item.quantity = next
      return next
    },
    remove(id: string) {
      this.items = this.items.filter((item) => item.id !== id)
    },
    completeDemo() {
      if (!this.items.length) return
      const order = {
        id: 'WR-DEMO-' + String(this.orders.length + 1).padStart(3, '0'),
        date: new Date().toISOString(),
        items: this.items,
      }
      this.orders.unshift(order)
      this.items = []
      return order.id
    },
  },
})

export const useConfigurationStore = defineStore('configuration', {
  state: () => ({ selection: null as Configuration | null }),
})
