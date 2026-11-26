<script setup lang="ts">
import { computed, ref } from 'vue'
import PageIntro from '../components/common/PageIntro.vue'
import { products } from '../data/catalog'

const models = products.filter(({ category }) => category.slug === 'cockpits')
const selected = ref('rally')
const active = computed(() => models.find(({ slug }) => slug === selected.value))
</script>

<template>
  <div class="wrap interior">
    <PageIntro label="Cockpits WoodRig" title="Dos formas de sentarte al volante."
      description="Compara la postura de Rally y Formula. Ambos modelos están en desarrollo." />

    <div class="models">
      <article v-for="model in models" :key="model.slug" class="model">
        <img v-if="model.media?.image" :src="model.media.image" :alt="model.media.alt ?? model.name" width="960" height="640" />
        <div>
          <h2>{{ model.name }}</h2>
          <p class="lede">{{ model.description }}</p>
          <RouterLink class="text-link" :to="{ name: 'product', params: { slug: model.slug } }">Ver ficha {{ model.name }}</RouterLink>
        </div>
      </article>
    </div>

    <section class="next" aria-labelledby="test-title">
      <div>
        <h2 id="test-title">Prueba una postura en tu configuración</h2>
        <p class="lede">Revisa el hueco, el acceso al asiento y el equipo que quieres montar. Las cotas de ambos conceptos están pendientes de validar.</p>
      </div>
      <div>
        <fieldset>
          <legend>Modelo de partida</legend>
          <label v-for="model in models" :key="model.slug">
            <input v-model="selected" type="radio" name="cockpit-model" :value="model.slug" /> {{ model.name }}
          </label>
        </fieldset>
        <div class="actions">
          <RouterLink class="button" :to="{ path: '/configurador', query: { modelo: selected } }">Probar {{ active?.name }}</RouterLink>
          <RouterLink class="text-link" to="/compatibilidad">Qué debo medir</RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.models { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: clamp(.9rem, 2vw, 2.5rem); }
.model { border-top: 1px solid var(--accent); background: var(--soft); }
.model img { aspect-ratio: 1.5; object-fit: cover; }
.model div { padding: clamp(1rem, 3vw, 2rem); }
.model h2 { font: 700 clamp(3rem, 6vw, 5rem)/.85 'Barlow Condensed', sans-serif; text-transform: uppercase; }
.model .lede { margin-block: .75rem 1.1rem; }
.next { margin-top: clamp(3rem, 6vw, 6rem); border-top: 1px solid var(--line); padding-top: 1.8rem; display: grid; grid-template-columns: 1fr 1fr; gap: 1.5rem 3rem; }
.next h2 { font-size: clamp(1.45rem, 3vw, 2.2rem); margin-bottom: .6rem; }
fieldset { border: 0; margin: 0 0 1rem; padding: 0; display: flex; flex-wrap: wrap; gap: .7rem 1.3rem; }
legend { padding: 0; margin-bottom: .4rem; font-weight: 800; }
label { display: inline-flex; align-items: center; gap: .45rem; min-height: 2.75rem; cursor: pointer; }
input { accent-color: var(--accent); }
@media (max-width: 670px) {
  .next, .models { grid-template-columns: 1fr; }
}
</style>
