<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import PageIntro from '../components/common/PageIntro.vue'
import { products } from '../data/catalog'
import { useCartStore, useConfigurationStore } from '../stores/commerce'

const route = useRoute()
const cart = useCartStore()
const configuration = useConfigurationStore()
const options = products.filter(({ slug }) => slug === 'pedals' || slug === 'accessories')
const model = ref('')
const extras = ref<string[]>([])
const added = ref(false)
const product = computed(() => products.find(({ slug }) => slug === model.value))

watch(() => route.query.modelo, (requested) => {
  const selected = products.find(({ slug }) => slug === requested)
  model.value = selected?.slug ?? configuration.selection?.productSlug ?? 'rally'
  extras.value = configuration.selection?.productSlug === model.value
    ? [...configuration.selection.accessorySlugs] : []
}, { immediate: true })

watch([model, extras], () => {
  configuration.selection = { productSlug: model.value, accessorySlugs: [...extras.value] }
  added.value = false
}, { immediate: true })

function changeModel() {
  extras.value = []
}

function add() {
  if (!configuration.selection) return
  cart.add(configuration.selection)
  added.value = true
}
</script>

<template>
  <div class="wrap interior">
    <PageIntro label="Configurador" title="Compón tu equipo." description="Combina una familia con componentes adicionales y revisa tu selección antes de llevarla al carrito de demostración." />
    <div class="interior-split">
      <figure v-if="product?.media?.image">
        <img class="interior-image" :src="product.media.image" :alt="product.media.alt || product.name" width="960" height="640" />
        <figcaption class="interior-caption">{{ product.name }} · Render conceptual del modelo base</figcaption>
      </figure>
      <form class="interior-panel" @submit.prevent="add">
        <h2>Tu configuración</h2>
        <label class="interior-field">Modelo base
          <select v-model="model" @change="changeModel">
            <option v-for="item in products" :key="item.slug" :value="item.slug">{{ item.name }}</option>
          </select>
        </label>
        <fieldset class="extras">
          <legend>Componentes adicionales</legend>
          <label v-for="item in options.filter(({ slug }) => slug !== model)" :key="item.slug">
            <input v-model="extras" type="checkbox" :value="item.slug" /> {{ item.name }}
          </label>
        </fieldset>
        <p class="interior-note">Las combinaciones son ilustrativas. Consulta <RouterLink class="text-link" to="/compatibilidad">qué debes medir</RouterLink> para tu equipo.</p>
        <div class="actions"><button type="submit" class="button">Añadir al carrito</button></div>
        <p v-if="added" role="status">Configuración añadida. <RouterLink class="text-link" to="/carrito">Ver carrito</RouterLink></p>
      </form>
    </div>
  </div>
</template>

<style scoped>
.extras { border: 0; padding: 0; margin: 1.25rem 0; }
.extras label { display: flex; align-items: center; gap: .6rem; min-height: 2.6rem; }
input { accent-color: var(--accent); }
form > p[role="status"] { margin-top: 1rem; }
</style>
