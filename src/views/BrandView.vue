<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PageIntro from '../components/common/PageIntro.vue'
import { concept } from '../data/catalog'

const route = useRoute()
const engineering = {
  label: 'Ingeniería',
  title: 'Diseño que se entiende.',
  description: 'La geometría, los materiales y las uniones forman parte de la misma decisión de diseño.',
  image: concept.detail,
  alt: concept.detailAlt,
  caption: 'Estudio de la unión entre madera y acero',
  sections: [
    { title: 'Estructura', text: 'La triangulación ayuda a repartir los esfuerzos entre la base y el soporte del volante. Las dimensiones y la resistencia final se determinarán durante el prototipado.' },
    { title: 'Materiales', text: 'La madera laminada define la estructura visible. Las piezas de acero se concentran en las articulaciones y los puntos de unión.' },
    { title: 'Plegado', text: 'La posición plegada se estudia junto a la posición de conducción, para proteger la ergonomía y reducir el espacio ocupado entre sesiones.' },
  ],
}
const brand = {
  label: 'Sobre WoodRig',
  title: 'Correr también es cuestión de espacio.',
  description: 'WoodRig explora una forma de montar un equipo de simracing que encaje tanto en tu conducción como en tu casa.',
  image: concept.image,
  alt: concept.alt,
  caption: 'WoodRig Rally · Render conceptual',
  sections: [
    { title: 'Una idea de partida', text: 'Un setup vive en la misma habitación que tú. Por eso el espacio, la posición de conducción y el aspecto del conjunto se trabajan desde el primer concepto.' },
    { title: 'Crece a tu ritmo', text: 'La gama contempla tanto cockpits completos como soportes independientes para que puedas empezar por el componente que necesitas.' },
    { title: 'Del concepto al prototipo', text: 'Las imágenes muestran la dirección del proyecto. El paso siguiente es contrastar los conceptos con prototipos y equipos reales.' },
  ],
}
const page = computed(() => route.path === '/ingenieria' ? engineering : brand)
</script>

<template>
  <div class="wrap interior">
    <PageIntro :label="page.label" :title="page.title" :description="page.description" />
    <div class="interior-split">
      <figure>
        <img class="interior-image" :src="page.image" :alt="page.alt" width="1200" height="800" />
        <figcaption class="interior-caption">{{ page.caption }}</figcaption>
      </figure>
      <div class="editorial">
        <section v-for="section in page.sections" :key="section.title">
          <h2>{{ section.title }}</h2>
          <p class="lede">{{ section.text }}</p>
        </section>
      </div>
    </div>
    <div class="actions end">
      <RouterLink class="button" to="/productos">Explorar la gama</RouterLink>
      <RouterLink class="button outline" :to="route.path === '/ingenieria' ? '/compatibilidad' : '/ingenieria'">
        {{ route.path === '/ingenieria' ? 'Consultar compatibilidad' : 'Descubrir la ingeniería' }}
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.editorial section { border-top: 1px solid var(--line); padding-block: 1.15rem 1.55rem; }
.editorial h2 { font-size: 1.4rem; margin-bottom: .55rem; }
.end { margin-top: 2rem; }
</style>
