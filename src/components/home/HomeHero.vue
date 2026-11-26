<script setup lang="ts">
import { ArrowDownRight } from 'lucide-vue-next'
import { concept } from '../../data/catalog'
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="wrap hero-grid">
      <div class="hero-copy">
        <p class="state"><span></span> Rally · Primer cockpit previsto</p>
        <h1 id="hero-title">SIMRACING<br />EN CASA.</h1>
        <p class="intro">Cockpits y soportes de madera y acero para simracing en casa. La primera prueba empieza por los pedales.</p>
        <div class="actions">
          <RouterLink class="button" to="/productos">Explorar la gama <ArrowDownRight :size="16" aria-hidden="true" /></RouterLink>
          <RouterLink class="text-link" to="/cockpits">Comparar los cockpits</RouterLink>
        </div>
      </div>
      <figure class="product">
        <picture>
          <source media="(max-width: 600px)" srcset="/images/woodrig-rally-small.webp" />
          <img :src="concept.image" :alt="concept.alt" width="1440" height="960" fetchpriority="high" />
        </picture>
        <figcaption><strong>WoodRig Rally</strong><span>Render conceptual</span></figcaption>
      </figure>
    </div>
  </section>
</template>

<style scoped>
.hero { background: var(--black); padding-top: var(--header); }
.hero-grid { display: grid; grid-template-columns: minmax(0, .78fr) minmax(0, 1.22fr); align-items: center; min-height: min(47rem, 82svh); padding-block: clamp(2.5rem, 6vw, 6rem); }
.hero-copy { position: relative; z-index: 1; padding-bottom: 1rem; }
.state { color: var(--muted); display: flex; gap: .65rem; align-items: center; font-size: .78rem; }
.state span { width: .42rem; aspect-ratio: 1; border-radius: 50%; background: var(--accent); }
h1 { font: 700 clamp(4.25rem, 9vw, 9.6rem)/.78 'Barlow Condensed', sans-serif; letter-spacing: -.018em; margin-block: 1.25rem; }
.intro { color: var(--muted); max-width: 30ch; margin-block: 1.7rem; }
.button { gap: .6rem; }
.product { align-self: center; }
.product img { aspect-ratio: 1.5; object-fit: cover; }
figcaption { display: flex; justify-content: space-between; flex-wrap: wrap; gap: .2rem 1rem; color: var(--muted); border-bottom: 1px solid var(--line); padding-block: .55rem; font-size: .76rem; }
figcaption strong { color: var(--ink); }
@media (max-width: 760px) {
  .hero-grid { grid-template-columns: 1fr; gap: 2rem; min-height: auto; }
  .hero-copy { padding-bottom: 0; }
  h1 { font-size: clamp(4.15rem, 13vw, 7rem); }
  .intro { margin-block: 1.25rem; }
}
</style>
