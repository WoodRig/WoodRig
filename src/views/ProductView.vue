<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import PageIntro from '../components/common/PageIntro.vue'
import ProductCard from '../components/products/ProductCard.vue'
import { products } from '../data/catalog'
import { useCartStore } from '../stores/commerce'

const route = useRoute()
const cart = useCartStore()
const product = computed(() => products.find(({ slug }) => slug === route.params.slug))
const related = computed(() => {
  const current = product.value
  return current ? products.filter((item) => item.slug !== current.slug)
    .sort((a, b) => Number(b.category.slug === current.category.slug) - Number(a.category.slug === current.category.slug))
    .slice(0, 3) : []
})
const added = ref(false)

function add() {
  if (!product.value) return
  cart.add({ productSlug: product.value.slug, accessorySlugs: [] })
  added.value = true
}
</script>

<template>
  <div class="wrap interior">
    <template v-if="product">
      <PageIntro :label="product.category.name" :title="product.name" :description="product.description" />
      <div class="interior-split">
        <figure v-if="product.media?.image">
          <img class="interior-image" :src="product.media.image" :alt="product.media.alt || product.name" width="960" height="640" />
          <figcaption class="interior-caption">Render conceptual · {{ product.name }}</figcaption>
        </figure>
        <div class="interior-panel">
          <h2>Prepara tu equipo</h2>
          <p class="lede">Prueba esta familia en el configurador o añádela directamente a tu carrito de demostración.</p>
          <div class="actions">
            <button class="button" type="button" @click="add">Añadir al carrito</button>
            <RouterLink class="button outline" :to="{ path: '/configurador', query: { modelo: product.slug } }">Configurar</RouterLink>
          </div>
          <p v-if="added" class="added" role="status">Añadido al carrito. <RouterLink class="text-link" to="/carrito">Ver carrito</RouterLink></p>
          <p class="compatibility"><RouterLink class="text-link" to="/compatibilidad">Consultar compatibilidad</RouterLink></p>
        </div>
      </div>
      <section class="related" aria-labelledby="related-title">
        <h2 id="related-title" class="section-title">Sigue explorando</h2>
        <div class="interior-grid"><ProductCard v-for="item in related" :key="item.slug" :product="item" /></div>
      </section>
    </template>
    <template v-else>
      <PageIntro label="Catálogo" title="Producto no encontrado" description="Puedes seguir explorando las familias de WoodRig." />
      <RouterLink class="button" to="/productos">Ver catálogo</RouterLink>
    </template>
  </div>
</template>

<style scoped>
.related { margin-top: var(--section); }
.related h2 { margin-bottom: 1.75rem; }
.added, .compatibility { margin-top: 1.25rem; }
</style>
