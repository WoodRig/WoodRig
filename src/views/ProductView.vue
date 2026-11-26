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
      <nav aria-label="Categoría" class="category"><RouterLink class="text-link" :to="'/' + product.category.slug">{{ product.category.name }}</RouterLink></nav>
      <PageIntro :label="product.status" :title="product.name" :description="product.description" />
      <div :class="{ 'interior-split': product.media?.image }">
        <figure v-if="product.media?.image">
          <img class="interior-image" :src="product.media.image" :alt="product.media.alt || product.name" width="960" height="640" />
          <figcaption class="interior-caption">Render conceptual · {{ product.name }}</figcaption>
        </figure>
        <div class="interior-panel">
          <h2>Qué queda por validar</h2>
          <ul class="interior-list"><li v-for="item in product.pending" :key="item">{{ item }}</li></ul>
          <p class="lede">Las especificaciones y la compatibilidad se publicarán cuando se comprueben con equipos reales.</p>
          <div class="actions">
            <RouterLink class="button" to="/compatibilidad">Consultar qué medir</RouterLink>
            <RouterLink v-if="product.demo" class="button outline" :to="{ path: '/configurador', query: { modelo: product.slug } }">Probar configuración</RouterLink>
          </div>
          <p v-if="added" class="added" role="status">Añadido al carrito. <RouterLink class="text-link" to="/carrito">Ver carrito</RouterLink></p>
          <button v-if="product.demo" class="button outline demo" type="button" @click="add">Añadir al carrito de prueba</button>
          <p v-if="product.category.slug === 'cockpits'" class="compare"><RouterLink class="text-link" to="/cockpits">Comparar Rally y Formula</RouterLink></p>
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
.added, .demo, .compare { margin-top: 1.25rem; }
.category { margin-bottom: .8rem; }
.interior-panel .interior-list { margin-bottom: 1.15rem; }
</style>
