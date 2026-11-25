<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { concept } from '../../data/catalog'

const section = ref<HTMLElement>()
let dispose = () => {}
let unmounted = false

onMounted(async () => {
  const query = '(min-width: 901px) and (prefers-reduced-motion: no-preference)'
  if (!window.matchMedia(query).matches) return
  const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
  if (unmounted || !section.value) return

  gsap.registerPlugin(ScrollTrigger)
  const media = gsap.matchMedia()
  media.add(query, () => {
    gsap.fromTo('.engineering-photo img', { scale: 1.16, yPercent: -3 }, {
      scale: 1.025,
      yPercent: 0,
      ease: 'none',
      scrollTrigger: { trigger: section.value, start: 'top bottom', end: 'bottom top', scrub: .55 },
    })
  }, section.value)
  dispose = () => media.revert()
})

onUnmounted(() => {
  unmounted = true
  dispose()
})
</script>

<template>
  <section id="ingenieria" ref="section" class="engineering section" aria-labelledby="engineering-title">
    <div class="wrap layout">
      <div class="intro">
        <p class="eyebrow">Ingeniería de producto</p>
        <h2 id="engineering-title" class="section-title">Cada unión tiene un propósito.</h2>
        <p class="lede">La estructura, los refuerzos y los puntos de anclaje se diseñan en conjunto. El objetivo es que cada pieza contribuya a mantener firme el cockpit durante la conducción.</p>
        <RouterLink class="text-link" to="/ingenieria">Conoce nuestro enfoque</RouterLink>
      </div>
      <figure>
        <div class="engineering-photo">
          <img :src="concept.detail" :alt="concept.detailAlt" width="1200" height="800" loading="lazy" />
        </div>
        <figcaption>Detalle conceptual · Unión entre madera y acero</figcaption>
      </figure>
    </div>
  </section>
</template>

<style scoped>
.engineering { background: var(--soft); }
.layout { display: grid; grid-template-columns: 5fr 7fr; gap: clamp(2rem, 6vw, 7rem); align-items: center; }
.intro h2 { margin-block: .75rem 1.15rem; text-wrap: initial; }
.intro a { display: inline-block; margin-top: 1.5rem; }
.engineering-photo { overflow: hidden; aspect-ratio: 1.34; background: var(--soft); }
.engineering-photo img { height: 100%; object-fit: cover; }
figcaption { color: var(--muted); font-size: .8rem; padding-top: .65rem; }
@media (max-width: 900px) { .layout { grid-template-columns: 1fr; } }
</style>
