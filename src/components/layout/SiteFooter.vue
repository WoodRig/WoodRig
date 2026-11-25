<script setup lang="ts">
import { site } from '../../config/site'

const productLinks = [
  { label: 'Toda la gama', path: '/productos' },
  { label: 'Cockpits', path: '/cockpits' },
  { label: 'Soportes', path: '/soportes' },
  { label: 'Accesorios', path: '/accesorios' },
  { label: 'Packs', path: '/packs' },
]
</script>

<template>
  <footer class="footer">
    <div class="wrap columns">
      <div>
        <RouterLink to="/" class="wordmark" aria-label="WoodRig, inicio">WOOD<span>RIG</span></RouterLink>
        <p lang="en">Crafted for performance.</p>
      </div>
      <nav aria-label="Productos">
        <p class="eyebrow">Gama WoodRig</p>
        <RouterLink v-for="item in productLinks" :key="item.path" :to="item.path">{{ item.label }}</RouterLink>
      </nav>
      <nav aria-label="Marca">
        <p class="eyebrow">WoodRig</p>
        <RouterLink to="/ingenieria">Ingeniería</RouterLink>
        <RouterLink to="/nosotros">Sobre WoodRig</RouterLink>
      </nav>
      <nav aria-label="Ayuda">
        <p class="eyebrow">Ayuda</p>
        <RouterLink to="/soporte">Soporte y contacto</RouterLink>
        <RouterLink to="/compatibilidad">Compatibilidad</RouterLink>
        <a v-if="site.email" :href="'mailto:' + site.email">{{ site.email }}</a>
        <a v-for="item in site.social" :key="item.url" :href="item.url">{{ item.name }}</a>
      </nav>
    </div>
    <div class="wrap baseline">
      <small>© {{ new Date().getFullYear() }} WoodRig</small>
      <nav class="legal-links" aria-label="Información legal">
        <RouterLink v-for="item in site.legal" :key="item.path" :to="item.path">{{ item.name }}</RouterLink>
      </nav>
    </div>
  </footer>
</template>

<style scoped>
.footer { padding-top: clamp(3.25rem, 6vw, 6rem); background: #131210; color: var(--paper); --line: rgb(244 242 238 / .16); --muted: #cbc2b7; --focus: var(--wood-light); }
.columns { display: grid; grid-template-columns: 1.5fr repeat(3, 1fr); gap: 2rem; }
.columns nav { display: grid; align-content: start; gap: .55rem; }
.columns nav .eyebrow { margin-bottom: .4rem; color: var(--wood-light); }
.columns a:not(.wordmark), .columns > div p, .baseline { color: var(--muted); font-size: .875rem; }
.columns a, .baseline a { transition: color var(--speed) var(--ease); }
.columns a:hover, .baseline a:hover { color: var(--paper); }
.wordmark { font: 700 2.7rem/.9 'Barlow Condensed', sans-serif; letter-spacing: .035em; }
.wordmark span { color: var(--wood-light); }
.columns > div p { margin-top: .7rem; }
.baseline { display: flex; flex-wrap: wrap; align-items: baseline; justify-content: space-between; gap: 1rem; margin-top: 3rem; padding-block: 1.25rem; border-top: 1px solid var(--line); }
.legal-links { display: flex; flex-wrap: wrap; gap: .55rem 1.3rem; }
.legal-links .router-link-exact-active { color: var(--accent); }
@media (max-width: 900px) { .columns { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 400px) { .columns { grid-template-columns: 1fr; } }
</style>
