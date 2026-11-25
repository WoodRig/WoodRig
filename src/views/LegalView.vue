<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { site } from '../config/site'
import { legalPages } from '../data/legal'

const route = useRoute()
const page = computed(() => legalPages[String(route.meta.legalId)])
</script>

<template>
  <div v-if="page" class="wrap legal">
    <aside>
      <nav aria-label="Información legal">
        <p class="eyebrow">Información legal</p>
        <RouterLink v-for="item in site.legal" :key="item.path" :to="item.path">{{ item.name }}</RouterLink>
      </nav>
    </aside>
    <article aria-labelledby="legal-title">
      <h1 id="legal-title">{{ page.title }}</h1>
      <p class="lede">{{ page.intro }}</p>
      <p class="sample">Documento de ejemplo. El titular y los datos comerciales son ficticios y pueden sustituirse al preparar la publicación.</p>
      <section v-for="section in page.sections" :key="section.title">
        <h2>{{ section.title }}</h2>
        <p>{{ section.text }}</p>
      </section>
      <a class="text-link reference" :href="page.reference.url">{{ page.reference.label }}</a>
    </article>
  </div>
</template>

<style scoped>
.legal { display: grid; grid-template-columns: minmax(12rem, 1fr) minmax(0, 3fr); align-items: start; gap: clamp(2rem, 7vw, 7rem); padding-block: calc(var(--header) + 3.5rem) var(--section); }
aside { position: sticky; top: calc(var(--header) + 2rem); }
nav { display: grid; gap: .3rem; }
nav .eyebrow { margin-bottom: .5rem; }
nav a { padding: .5rem .75rem; border: 1px solid transparent; color: var(--muted); transition: color var(--speed) var(--ease), border-color var(--speed) var(--ease); }
nav a:hover, nav .router-link-exact-active { color: var(--accent); border-color: var(--line); }
article { max-width: 70ch; }
h1 { font-size: var(--section-title); }
.lede { margin-top: .8rem; }
.sample { margin-block: 1.8rem 2.5rem; padding: .85rem 1rem; border-left: 2px solid var(--accent); background: var(--soft); color: var(--ink); font-size: .9rem; }
section + section { margin-top: 1.7rem; }
h2 { font-size: 1.25rem; margin-bottom: .45rem; }
section p { color: var(--muted); }
.reference { display: inline-block; margin-top: 2rem; }
@media (max-width: 700px) {
  .legal { grid-template-columns: 1fr; padding-top: calc(var(--header) + 2.25rem); }
  aside { position: static; }
  nav { display: flex; flex-wrap: wrap; }
  nav .eyebrow { flex-basis: 100%; }
}
</style>
