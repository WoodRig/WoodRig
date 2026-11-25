<script setup lang="ts">
import { ref } from 'vue'
import { ChevronDown } from 'lucide-vue-next'
import { concept } from '../../data/catalog'

const views = [
  { id: 'cockpit', label: 'Cockpit', caption: 'WoodRig Rally · Render conceptual' },
  { id: 'detail', label: 'Detalle', caption: 'Unión de madera y acero · Render conceptual' },
] as const

const activeView = ref<(typeof views)[number]>(views[0])
</script>

<template>
  <section class="hero" aria-labelledby="hero-title">
    <div class="stage">
      <div class="wrap stage-inner">
        <div class="hero-copy">
          <p class="eyebrow">Simracing · WoodRig</p>
          <h1 id="hero-title">Sin renunciar a la rigidez. <em>Ni a tu espacio.</em></h1>
          <p class="lede">Cockpits y soportes de madera y acero, pensados para montar tu equipo a tu ritmo y recuperar espacio entre sesiones.</p>
          <div class="actions">
            <RouterLink class="button" to="/productos">Explorar productos</RouterLink>
            <RouterLink class="text-link" :to="{ name: 'home', hash: '#ingenieria' }">Descubre la ingeniería</RouterLink>
          </div>
        </div>

        <figure class="hero-visual" :data-view="activeView.id">
          <div id="hero-scene" class="scene">
            <picture class="shot cockpit" :class="{ active: activeView.id === 'cockpit' }" :aria-hidden="activeView.id !== 'cockpit'">
              <source media="(max-width: 600px)" srcset="/images/woodrig-rally-small.webp" />
              <img :src="concept.image" :alt="concept.alt" width="1440" height="960" fetchpriority="high" />
            </picture>
            <picture class="shot detail" :class="{ active: activeView.id === 'detail' }" :aria-hidden="activeView.id !== 'detail'">
              <img :src="concept.detail" :alt="concept.detailAlt" width="1200" height="800" decoding="async" fetchpriority="low" />
            </picture>
          </div>
          <figcaption class="caption" aria-live="polite">{{ activeView.caption }}</figcaption>
        </figure>
      </div>
    </div>

    <div class="wrap hero-bar">
      <div class="view-picker" role="group" aria-label="Vista del producto">
        <button v-for="view in views" :key="view.id" type="button" :aria-pressed="activeView.id === view.id"
          aria-controls="hero-scene" @click="activeView = view">{{ view.label }}</button>
      </div>
      <RouterLink class="continue" :to="{ name: 'home', hash: '#diseno' }">
        Descubre WoodRig <ChevronDown :size="17" aria-hidden="true" />
      </RouterLink>
    </div>
  </section>
</template>

<style scoped>
.hero { --hero-surface: #211e1b; border-bottom: 1px solid var(--line); padding-top: var(--header); }
.stage { position: relative; isolation: isolate; overflow: clip; background: var(--hero-surface); }
.stage-inner { display: grid; align-items: center; min-height: clamp(34rem, 75svh, 51rem); }
.hero-copy { position: relative; z-index: 1; width: min(37%, 31rem); padding-block: 4rem; }
h1 { font-size: clamp(2.55rem, 4.1vw, 4.55rem); margin-block: 1rem 1.3rem; }
h1 em { display: block; color: var(--accent); font-style: normal; }
.lede { max-width: 34ch; }
.actions { gap: .85rem 1.3rem; margin-top: 1.7rem; }
.actions .text-link { font-size: .875rem; padding-block: .55rem; }

.hero-visual { position: absolute; inset: 0 0 0 34%; }
.scene { position: absolute; inset: 0; overflow: hidden; background: #594f47; }
.scene::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(90deg, var(--hero-surface), rgb(33 30 27 / .74) 8%, transparent 32%);
  pointer-events: none;
}
.shot { position: absolute; inset: 0; opacity: 0; transform: scale(1.04); transition: opacity .65s var(--ease), transform .95s var(--ease); }
.shot.active { opacity: 1; transform: scale(1); }
.shot img { height: 100%; object-fit: cover; object-position: center; }
.caption {
  position: absolute;
  inset: auto var(--gutter) 1.25rem auto;
  max-width: calc(100% - 2 * var(--gutter));
  padding: .34rem .65rem;
  background: rgb(25 24 22 / .92);
  border-radius: var(--radius);
  color: var(--ink);
  font-size: .78rem;
}

.hero-bar { display: flex; justify-content: space-between; align-items: center; gap: 1rem; min-height: 4.4rem; }
.view-picker { display: flex; align-items: stretch; align-self: stretch; gap: 1.5rem; }
.view-picker button {
  padding: .65rem .15rem;
  border: 0;
  border-bottom: 2px solid transparent;
  background: transparent;
  color: var(--muted);
  font-size: .875rem;
  font-weight: 750;
  transition: color var(--speed) var(--ease), border-color var(--speed) var(--ease);
}
.view-picker button:hover,
.view-picker button[aria-pressed='true'] { color: var(--accent); }
.view-picker button[aria-pressed='true'] { border-bottom-color: currentColor; }
.continue { display: inline-flex; min-height: 2.75rem; align-items: center; gap: .5rem; color: var(--muted); font-size: .85rem; font-weight: 750; transition: color var(--speed) var(--ease); }
.continue:hover { color: var(--accent); }

@media (max-width: 900px) {
  .stage-inner { width: 100%; min-height: 0; }
  .hero-copy { width: min(100% - 2 * var(--gutter), 38rem); margin-inline: var(--gutter); padding-block: 2.75rem 2rem; }
  h1 { font-size: clamp(2.25rem, 7vw, 3.8rem); }
  .hero-visual { position: relative; inset: auto; aspect-ratio: 3/2; }
  .scene::after { background: linear-gradient(var(--hero-surface), transparent 12%); }
  .caption { bottom: .65rem; }
}
@media (max-width: 380px) {
  .hero-bar { gap: .5rem; }
  .view-picker { gap: .85rem; }
  .continue { font-size: .78rem; }
}
</style>
