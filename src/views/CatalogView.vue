<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import PageIntro from '../components/common/PageIntro.vue'
import ProductCard from '../components/products/ProductCard.vue'
import { categories, products } from '../data/catalog'

const route = useRoute()
const search = ref('')
const category = computed(() => categories.find((item) => '/' + item.slug === route.path.replace(/\/$/, '').toLowerCase()))
const visible = computed(() => {
  const query = search.value.trim().toLocaleLowerCase('es')
  return products.filter((item) => (!category.value || item.category.slug === category.value.slug)
    && [item.name, item.description, item.category.name, item.status].some((value) => value.toLocaleLowerCase('es').includes(query)))
})
watch(() => route.path, () => { search.value = '' })
</script>

<template>
  <div class="wrap interior">
    <PageIntro label="Catálogo conceptual" :title="category?.name ?? 'Gama WoodRig'"
      :description="category?.description ?? 'Explora las propuestas en orden de desarrollo, desde la primera plataforma de pedales hasta las ampliaciones previstas.'" />
    <div class="toolbar">
      <nav aria-label="Categorías del catálogo">
        <RouterLink to="/productos">Toda la gama</RouterLink>
        <RouterLink v-for="item in categories" :key="item.slug" :to="'/' + item.slug">{{ item.name }}</RouterLink>
      </nav>
      <label class="interior-field">Buscar productos<input v-model="search" type="search" /></label>
    </div>
    <p class="count" role="status">{{ visible.length }} {{ visible.length === 1 ? 'resultado' : 'resultados' }}</p>
    <div v-if="visible.length" class="interior-grid">
      <ProductCard v-for="item in visible" :key="item.slug" :product="item" />
    </div>
    <div v-else class="interior-panel">
      <h2>Sin resultados</h2>
      <p>Prueba a buscar por nombre o categoría.</p>
      <button class="button outline" type="button" @click="search = ''">Limpiar búsqueda</button>
    </div>
  </div>
</template>

<style scoped>
.toolbar { display: flex; justify-content: space-between; align-items: end; flex-wrap: wrap; gap: 1.25rem; padding-bottom: 1.1rem; border-bottom: 1px solid var(--line); }
nav { display: flex; flex-wrap: wrap; gap: .5rem; }
nav a { border: 1px solid var(--line); padding: .55rem .85rem; border-radius: var(--radius); transition: border-color var(--speed), color var(--speed); }
nav a:hover, nav .router-link-exact-active { border-color: var(--accent); color: var(--accent); }
.interior-field { margin: 0; font-size: .875rem; }
.count { color: var(--muted); margin-block: 1rem 1.5rem; font-size: .9rem; }
.interior-panel button { margin-top: 1rem; }
</style>
