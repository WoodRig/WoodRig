import { defineStore } from 'pinia'
import { parseConfiguration } from '../data/configuration'
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
      const parsed = parseConfiguration(configuration.productSlug, configuration.accessorySlugs)
      if (!parsed) return
      const selection = { ...parsed, variantId: configuration.variantId }
      const id = cartItemId(selection)
      const item = this.items.find((line) => line.id === id)
      if (item) this.setQuantity(id, item.quantity + 1)
      else this.items.push({ id, configuration: selection, quantity: 1 })
    },
    setQuantity(id: string, quantity: number) {
      const item = this.items.find((line) => line.id === id)
      const next = clampQuantity(quantity)
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
      this.$patch((state) => {
        state.orders.unshift(order)
        state.items = []
      })
      return order.id
    },
  },
})

export const useConfigurationStore = defineStore('configuration', {
  state: () => ({ selection: null as Configuration | null }),
})

const storageKey = 'woodrig:demo-cart:v1'

function clampQuantity(quantity: number) {
  return Math.min(99, Math.max(1, Math.trunc(quantity) || 1))
}

function cartItemId(selection: Configuration) {
  return JSON.stringify([selection.productSlug, selection.variantId, selection.accessorySlugs])
}

function readRecord(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === 'object' && !Array.isArray(value)
    ? value as Record<string, unknown> : null
}

function readItems(value: unknown): CartItem[] {
  if (!Array.isArray(value)) return []

  const items = new Map<string, CartItem>()
  for (const candidate of value) {
    const item = readRecord(candidate)
    const saved = readRecord(item?.configuration)
    const configuration = parseConfiguration(saved?.productSlug, saved?.accessorySlugs)
    const quantity = item?.quantity
    if (!configuration || typeof quantity !== 'number' || !Number.isFinite(quantity) || quantity < 1) continue

    if (typeof saved?.variantId === 'string') configuration.variantId = saved.variantId
    const id = cartItemId(configuration)
    items.set(id, { id, configuration, quantity: clampQuantity(quantity + (items.get(id)?.quantity ?? 0)) })
  }
  return [...items.values()]
}

function readOrders(value: unknown): DemoOrder[] {
  if (!Array.isArray(value)) return []

  return value.flatMap((candidate): DemoOrder[] => {
    const order = readRecord(candidate)
    const id = order?.id
    const date = order?.date
    const items = readItems(order?.items)
    return typeof id === 'string' && /^WR-DEMO-\d+$/.test(id)
      && typeof date === 'string' && Number.isFinite(Date.parse(date)) && items.length
      ? [{ id, date, items }] : []
  })
}

export function persistDemoCart() {
  const cart = useCartStore()
  try {
    const saved = window.sessionStorage.getItem(storageKey)
    if (saved) {
      const state = readRecord(JSON.parse(saved))
      cart.$patch({ items: readItems(state?.items), orders: readOrders(state?.orders) })
    }
  } catch {
    // Storage can be blocked or contain data from an interrupted write.
  }

  cart.$subscribe((_mutation, state) => {
    try {
      window.sessionStorage.setItem(storageKey, JSON.stringify(state))
    } catch {
      // The demo can continue in memory when browser storage is unavailable.
    }
  }, { flush: 'sync' })
}
