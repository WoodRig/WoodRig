<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { concept } from '../../data/catalog'

const story = ref<HTMLElement>()
let dispose: (() => void) | undefined
let unmounted = false

onMounted(async () => {
  try {
    const [{ gsap }, { ScrollTrigger }] = await Promise.all([import('gsap'), import('gsap/ScrollTrigger')])
    const section = story.value
    if (unmounted || !section) return

    gsap.registerPlugin(ScrollTrigger)
    const media = gsap.matchMedia()
    media.add('(min-width: 960px) and (min-height: 680px) and (prefers-reduced-motion: no-preference)', () => {
      section.classList.add('motion')
      gsap.fromTo('.storage-frame', { clipPath: 'inset(0 0 100% 0)' }, {
        clipPath: 'inset(0 0 0% 0)',
        ease: 'none',
        scrollTrigger: {
          trigger: '.storage-step',
          start: 'top 83%',
          end: 'top 35%',
          scrub: true,
        },
      })
      return () => section.classList.remove('motion')
    }, section)
    dispose = () => media.revert()
  } catch {
    // The two stages are still available as static content.
  }
})

onUnmounted(() => {
  unmounted = true
  dispose?.()
})
</script>

<template>
  <section id="diseno" ref="story" class="story" aria-labelledby="space-title">
    <div class="wrap">
      <header class="story-header">
        <h2 id="space-title">El mismo espacio.<br />Dos momentos.</h2>
        <p class="lede">El sitio que ocupas para correr y el que necesitas para guardar el equipo son dos medidas distintas.</p>
      </header>

      <div class="story-grid">
        <figure class="drive-frame">
          <img :src="concept.image" :alt="concept.alt" width="1440" height="960" loading="lazy" />
          <figcaption>En uso · Concepto Rally</figcaption>
        </figure>
        <div class="drive-step">
          <h3>Cuando conduces</h3>
          <p class="lede">Mide el espacio desde la pedalera hasta el asiento. Deja margen para entrar, ajustar los pedales y pasar los cables.</p>
        </div>
        <figure class="storage-frame">
          <img :src="concept.folding" :alt="concept.foldingAlt" width="1200" height="800" loading="lazy" />
          <figcaption>Recogida · Estudio conceptual independiente</figcaption>
        </figure>
        <div class="storage-step">
          <h3>Cuando recoges</h3>
          <p class="lede">Mide el hueco de guardado y el paso más estrecho. La imagen explora una posible recogida. El primer Rally se plantea fijo y desmontable para el transporte.</p>
          <RouterLink class="text-link" to="/compatibilidad">Abrir la guía de medidas</RouterLink>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.story { background: var(--soft); padding-block: var(--section); }
.story-header { display: flex; align-items: end; justify-content: space-between; gap: 1.25rem 3rem; flex-wrap: wrap; padding-bottom: 2rem; border-bottom: 1px solid var(--line); }
.story-header h2 { font: 700 clamp(3.2rem, 8.6vw, 8rem)/.86 'Barlow Condensed', sans-serif; text-transform: uppercase; }
.story-header p { max-width: 32ch; }
.story-grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 1rem; padding-top: 1.75rem; }
figure { position: relative; background: var(--black); }
figure img { aspect-ratio: 1.55; object-fit: cover; }
figcaption { background: var(--black); color: var(--ink); font-size: .78rem; padding: .6rem .8rem; }
.drive-step { margin-bottom: 1.25rem; }
.story-grid h3 { font-size: clamp(1.65rem, 3vw, 2.55rem); margin-bottom: .65rem; }
.story-grid .text-link { display: inline-block; margin-top: 1rem; }

.motion .story-grid { grid-template-columns: minmax(0, 1.85fr) minmax(0, 1fr); gap: 0 clamp(2rem, 6vw, 6rem); align-items: start; }
.motion figure { position: sticky; top: calc(var(--header) + 1.25rem); grid-area: 1 / 1 / 3 / 2; }
.motion .storage-frame { z-index: 1; }
.motion figure img { max-height: calc(100svh - var(--header) - 7rem); }
.motion .drive-step, .motion .storage-step { grid-column: 2; min-height: 62svh; display: flex; align-items: flex-start; flex-direction: column; justify-content: center; }
.motion .drive-step { grid-row: 1; margin-bottom: 0; }
.motion .storage-step { grid-row: 2; }
</style>
