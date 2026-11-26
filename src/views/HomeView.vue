<script setup lang="ts">
import HomeHero from '../components/home/HomeHero.vue'
import ProductCard from '../components/products/ProductCard.vue'
import { concept, products } from '../data/catalog'

const supports = products.filter(({ category }) => category.slug === 'soportes')
</script>

<template>
  <HomeHero />

  <section class="section space" aria-labelledby="space-title">
    <div class="wrap feature">
      <div>
        <h2 id="space-title" class="section-title">El espacio también forma parte del equipo.</h2>
        <p class="lede">Antes de elegir cockpit, mide el hueco de conducción y el lugar donde quieres guardarlo. Reserva sitio para cables, ajustes y acceso al asiento.</p>
        <RouterLink class="text-link" to="/compatibilidad">Qué medir antes de montar</RouterLink>
      </div>
      <figure>
        <img :src="concept.folding" :alt="concept.foldingAlt" width="1200" height="800" loading="lazy" />
        <figcaption>Estudio conceptual de recogida. El mecanismo y las dimensiones están pendientes de validación.</figcaption>
      </figure>
    </div>
  </section>

  <section class="section" aria-labelledby="supports-title">
    <div class="wrap supports">
      <div class="support-intro">
        <h2 id="supports-title" class="section-title">¿Ya tienes asiento?</h2>
        <p class="lede">Explora soportes independientes para montar el volante o los pedales en tu espacio actual.</p>
        <RouterLink class="text-link" to="/soportes">Ver soportes</RouterLink>
      </div>
      <div class="support-grid">
        <ProductCard v-for="item in supports" :key="item.slug" :product="item" />
      </div>
    </div>
  </section>

  <section class="section materials" aria-labelledby="materials-title">
    <div class="wrap feature">
      <figure>
        <img src="/images/woodrig-materials-v2.webp" alt="Muestras de madera laminada y metal negro mate" width="1200" height="800" loading="lazy" />
      </figure>
      <div>
        <h2 id="materials-title" class="section-title">Madera a la vista. Acero en las uniones.</h2>
        <p class="lede">Los prototipos exploran perfiles de madera laminada y refuerzos de acero negro. Consulta cómo planteamos la estructura y qué falta por ensayar.</p>
        <RouterLink class="text-link" to="/ingenieria">Ver el enfoque de ingeniería</RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.space { background: var(--soft); }
.materials { background: var(--black); }
.feature, .supports { display: grid; grid-template-columns: minmax(0, .85fr) minmax(0, 1.15fr); align-items: center; gap: clamp(2rem, 7vw, 7rem); }
.feature img { aspect-ratio: 1.5; object-fit: cover; }
.feature .lede, .support-intro .lede { margin-block: 1rem 1.25rem; }
.feature figcaption { margin-top: .55rem; color: var(--muted); font-size: .8rem; }
.materials .feature { grid-template-columns: minmax(0, 1.15fr) minmax(0, .85fr); }
.support-grid { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
@media (max-width: 760px) {
  .feature, .materials .feature, .supports { grid-template-columns: 1fr; }
  .materials figure { order: 1; }
}
@media (max-width: 470px) { .support-grid { grid-template-columns: 1fr; } }
</style>
