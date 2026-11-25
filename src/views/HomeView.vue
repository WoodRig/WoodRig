<script setup lang="ts">
import { Combine, FoldVertical, Layers3, Shield } from 'lucide-vue-next'
import HomeEngineering from '../components/home/HomeEngineering.vue'
import HomeHero from '../components/home/HomeHero.vue'
import ProductCard from '../components/products/ProductCard.vue'
import { concept, products } from '../data/catalog'

const pillars = [
  { icon: Shield, name: 'Estabilidad', text: 'Bases firmes y refuerzos pensados para limitar el movimiento.' },
  { icon: FoldVertical, name: 'Plegabilidad', text: 'Diseñado para recuperar espacio entre sesiones.' },
  { icon: Combine, name: 'Modularidad', text: 'Piezas independientes para construir tu equipo por etapas.' },
  { icon: Layers3, name: 'Diseño', text: 'Madera cálida y metal mate, a la vista.' },
]
</script>

<template>
  <HomeHero />

  <section id="diseno" class="principles section" aria-labelledby="principles-title">
    <div class="wrap">
      <div class="section-head">
        <div>
          <p class="eyebrow">El enfoque WoodRig</p>
          <h2 id="principles-title" class="section-title">Pensado para correr. <span class="accent">Diseñado para tu espacio.</span></h2>
        </div>
        <p class="lede">Tu equipo de simracing tiene que encajar en tu forma de conducir y en el lugar donde montas cada sesión.</p>
      </div>
      <ul class="pillars">
        <li v-for="item in pillars" :key="item.name">
          <component :is="item.icon" :size="27" :stroke-width="1.5" aria-hidden="true" />
          <h3>{{ item.name }}</h3>
          <p>{{ item.text }}</p>
        </li>
      </ul>
    </div>
  </section>

  <HomeEngineering />

  <section class="stability section" aria-labelledby="stability-title">
    <div class="wrap stability-copy">
      <p class="eyebrow">Estabilidad</p>
      <h2 id="stability-title" class="section-title">La estabilidad no es negociable.</h2>
      <p>Trabajamos con geometrías trianguladas, apoyos amplios y uniones reforzadas para limitar las flexiones y vibraciones del conjunto.</p>
      <ul>
        <li>Geometría triangulada</li>
        <li>Bases de apoyo amplias</li>
        <li>Puntos de anclaje reforzados</li>
      </ul>
    </div>
  </section>

  <section class="fold section" aria-labelledby="fold-title">
    <div class="wrap fold-layout">
      <div>
        <p class="eyebrow">Plegabilidad</p>
        <h2 id="fold-title" class="section-title">Compite cuando quieras. <span class="accent">Recupera tu espacio cuando termines.</span></h2>
        <p class="lede">Estamos desarrollando soluciones plegables para que el simulador pueda convivir con el resto de tu casa.</p>
      </div>
      <figure>
        <img :src="concept.folding" :alt="concept.foldingAlt" width="1200" height="800" loading="lazy" />
        <figcaption>Estudio conceptual de plegado</figcaption>
      </figure>
    </div>
  </section>

  <section class="modularity section" aria-labelledby="modularity-title">
    <div class="wrap">
      <div class="section-head">
        <div>
          <p class="eyebrow">Modularidad</p>
          <h2 id="modularity-title" class="section-title">Empieza con lo que necesitas. Amplía cuando quieras.</h2>
        </div>
        <p>Empieza con el volante o los pedales. Añade componentes a medida que tu equipo crezca y se confirmen las compatibilidades.</p>
      </div>
      <div class="modules">
        <RouterLink to="/soportes"><strong>Volante y pedales</strong><span>Soportes independientes</span></RouterLink>
        <RouterLink to="/cockpits"><strong>Cockpits</strong><span>Conjuntos de conducción</span></RouterLink>
        <RouterLink to="/accesorios"><strong>Accesorios</strong><span>Complementos para tu equipo</span></RouterLink>
      </div>
    </div>
  </section>

  <section id="gama" class="catalog section" aria-labelledby="catalog-title">
    <div class="wrap">
      <div class="section-head">
        <div>
          <p class="eyebrow">Catálogo</p>
          <h2 id="catalog-title" class="section-title">La gama WoodRig.</h2>
        </div>
        <RouterLink class="button outline" to="/productos">Ver catálogo</RouterLink>
      </div>
      <div class="catalog-grid">
        <ProductCard v-for="item in products" :key="item.slug" :product="item" />
      </div>
      <p class="catalog-note">Imágenes conceptuales de la gama WoodRig.</p>
    </div>
  </section>

  <section class="materials" aria-labelledby="materials-title">
    <div class="wrap materials-layout">
      <div>
        <p class="eyebrow">Materiales</p>
        <h2 id="materials-title" class="section-title">Madera por diseño. Metal por rendimiento.</h2>
        <p>La veta natural de la madera da carácter al conjunto. Los refuerzos de metal negro mate acompañan los puntos de unión.</p>
      </div>
      <figure>
        <img src="/images/woodrig-materials-v2.webp" alt="Muestras de madera laminada y metal negro mate" width="1200" height="800" loading="lazy" />
        <figcaption>Madera estructural y metal negro mate · Render conceptual</figcaption>
      </figure>
    </div>
  </section>

  <section class="closing section" aria-labelledby="closing-title">
    <div class="wrap">
      <p class="eyebrow" lang="en">Crafted for performance.</p>
      <h2 id="closing-title">Tu espacio. Tus reglas. <span>Tu WoodRig.</span></h2>
      <div class="actions">
        <RouterLink class="button" to="/productos">Explorar la gama</RouterLink>
        <RouterLink class="button outline" to="/nosotros">Descubrir WoodRig</RouterLink>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-head { display: flex; align-items: end; justify-content: space-between; gap: 2rem; margin-bottom: clamp(2.5rem, 5vw, 4.5rem); }
.section-head h2, .fold h2, .materials h2, .stability h2 { margin-top: .75rem; max-width: 20ch; }
.section-head > p { max-width: 34ch; color: var(--muted); }
.pillars { list-style: none; margin: 0; padding: 0; border-top: 1px solid var(--line); display: grid; grid-template-columns: repeat(4, minmax(0,1fr)); gap: 1.5rem 2rem; }
.pillars li { padding-block: 1.65rem 0; }
.pillars svg { color: var(--accent); }
.pillars h3 { font-size: 1.16rem; margin-block: .7rem .45rem; letter-spacing: -.025em; }
.pillars p { color: var(--muted); font-size: .93rem; }
.stability { border-bottom: 1px solid var(--line); }
.stability-copy { display: grid; grid-template-columns: 1fr 1fr; gap: .7rem clamp(2.5rem, 7vw, 8rem); align-items: start; }
.stability-copy .eyebrow, .stability-copy h2, .stability-copy > p:not(.eyebrow) { grid-column: 1; }
.stability-copy h2 { margin: 0; }
.stability-copy ul { grid-column: 2; grid-row: 2 / 4; padding: 0; margin: 0; list-style: none; }
.stability-copy li { border-top: 1px solid var(--line); padding-block: .85rem; font-size: .95rem; font-weight: 700; }
.stability-copy > p:not(.eyebrow), .materials p:not(.eyebrow) { margin-top: 1rem; max-width: 44ch; color: var(--muted); }
.fold-layout, .materials-layout { display: grid; grid-template-columns: 1fr 1fr; align-items: center; gap: clamp(2.25rem, 7vw, 8rem); }
.fold .lede { margin-top: 1.15rem; }
.fold figure img, .materials figure img { aspect-ratio: 3/2; object-fit: cover; border-radius: var(--radius); background: var(--soft); }
figcaption, .catalog-note { font-size: .8rem; margin-top: .75rem; color: var(--muted); }
.modularity, .materials { background: var(--soft); }
.modules { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
.modules a { display: grid; gap: .5rem; padding-block: 1.3rem; border-top: 1px solid var(--line); transition: border-color var(--speed) var(--ease); }
.modules a:hover { border-color: var(--accent); }
.modules strong { font-size: clamp(1.06rem, 2vw, 1.55rem); line-height: 1.25; }
.modules span { color: var(--muted); font-size: .9rem; }
.catalog-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: clamp(2rem, 4.75vw, 4.5rem) clamp(1.4rem, 3.3vw, 3.25rem); }
.catalog-note { margin-top: 1.5rem; }
.materials { padding-block: var(--section); }
.closing { text-align: center; }
.closing h2 { font-size: var(--section-title); margin: .8rem auto 1.55rem; max-width: 24ch; text-wrap: balance; }
.closing h2 span { color: var(--accent); }
.closing .actions { justify-content: center; }
@media (max-width: 900px) {
  .section-head { align-items: start; flex-direction: column; gap: 1rem; }
  .pillars { grid-template-columns: repeat(2, minmax(0,1fr)); }
  .fold-layout, .materials-layout { grid-template-columns: 1fr; }
  .catalog-grid { grid-template-columns: repeat(2, minmax(0,1fr)); }
}
@media (max-width: 600px) {
  .modules, .catalog-grid, .stability-copy { grid-template-columns: 1fr; }
  .stability-copy ul { grid-column: auto; grid-row: auto; margin-top: 1.25rem; }
}
</style>
