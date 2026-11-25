<script setup lang="ts">
import { computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import ProductCard from '../components/products/ProductCard.vue'
import { products } from '../data/catalog'
import { useCartStore } from '../stores/commerce'

const route = useRoute()
const cart = useCartStore()
const product = computed(() => products.find((item) => item.slug === route.params.slug))
const missing = computed(() => route.name === 'not-found' || (route.name === 'product' && !product.value))
const title = computed(() => missing.value ? 'Página no encontrada' : product.value?.name ?? String(route.meta.title))
const catalog = computed(() => products.filter((item) => route.path === '/productos' || route.path === '/' + item.category.slug))
const messages: Record<string, string> = {
  '/carrito': 'Tu carrito está vacío. La compra se habilitará cuando la gama esté disponible.',
  '/checkout': 'El proceso de compra se habilitará cuando la gama esté disponible.',
  '/configurador': 'Aquí podrás montar tu WoodRig, elegir acabados y añadir accesorios cuando se validen las configuraciones.',
  '/ingenieria': 'Explora las decisiones de diseño que guían el desarrollo de WoodRig.',
  '/compatibilidad': 'Publicaremos las combinaciones de volantes, pedaleras y soportes a medida que se validen.',
  '/nosotros': 'WoodRig nace para desarrollar cockpits y soportes de simracing en madera estructural y metal negro mate.',
  '/soporte': 'Los canales de contacto y las preguntas frecuentes se publicarán cuando estén disponibles.',
  '/cuenta': 'El área de cliente estará disponible cuando se active la tienda.',
}
const message = computed(() => {
  if (missing.value) return 'La dirección no está disponible. Puedes seguir explorando la gama WoodRig.'
  if (product.value) return product.value.description
  if (route.path === '/carrito' && cart.count) return 'Artículos en el carrito: ' + cart.count
  return messages[route.path] ?? 'Explora los cockpits, soportes y accesorios de WoodRig.'
})

watchEffect(() => { document.title = title.value + ' | WoodRig' })
</script>

<template>
  <div class="provisional">
    <div class="wrap">
      <p class="eyebrow">{{ product?.category.name ?? 'WoodRig' }}</p>
      <h1>{{ title }}</h1>
      <p class="lede">{{ message }}</p>
      <figure v-if="product?.media?.image" class="product-figure">
        <img :src="product.media.image" :alt="product.media.alt || product.name" width="960" height="640" />
        <figcaption>Render conceptual</figcaption>
      </figure>
      <div v-if="catalog.length" class="product-grid">
        <ProductCard v-for="item in catalog" :key="item.slug" :product="item" />
      </div>
      <div v-else class="actions">
        <RouterLink v-if="route.path === '/ingenieria'" class="button" :to="{ name: 'home', hash: '#ingenieria' }">Ver la ingeniería</RouterLink>
        <RouterLink v-else class="button" to="/productos">Explorar la gama</RouterLink>
        <RouterLink class="button outline" to="/">Volver al inicio</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.provisional { min-height: 70svh; padding-block: calc(var(--header) + 4rem) var(--section); background: var(--surface); }
h1 { font-size: var(--title); margin: .55rem 0 1.25rem; }
.actions, .product-figure, .product-grid { margin-top: 2rem; }
.product-figure { max-width: 48rem; }
figcaption { color: var(--muted); margin-top: .65rem; font-size: .8rem; }
.product-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(min(100%, 17rem), 1fr)); gap: 1rem; }
</style>
