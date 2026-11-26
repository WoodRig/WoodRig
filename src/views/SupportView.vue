<script setup lang="ts">
import PageIntro from '../components/common/PageIntro.vue'

const questions = [
  { question: '¿Cómo sé si mi volante o pedalera encajará?', answer: 'Consulta la guía de compatibilidad y reúne las medidas y los datos de montaje que indica el fabricante de tu equipo.', path: '/compatibilidad', link: 'Ver guía de compatibilidad' },
  { question: '¿Qué diferencia hay entre Formula y Rally?', answer: 'Formula parte de una posición más reclinada. Rally propone una postura más vertical. Las imágenes actuales muestran ambos conceptos.', path: '/cockpits', link: 'Ver cockpits' },
  { question: '¿Puedo comprar desde esta web?', answer: 'Puedes probar el catálogo, el configurador y la confirmación de un pedido de demostración. La tienda todavía no admite pagos ni envíos.', path: '/condiciones-de-compra', link: 'Ver condiciones de ejemplo' },
  { question: '¿Dónde consulto un pedido de prueba?', answer: 'El área de cliente recoge los pedidos confirmados en esta pestaña y los conserva al recargarla.', path: '/cuenta', link: 'Abrir área de cliente' },
]
</script>

<template>
  <div class="wrap interior">
    <PageIntro label="Soporte" title="¿En qué podemos ayudarte?" description="Resuelve las dudas más frecuentes sobre la gama, tu equipo y el flujo de demostración." />
    <div class="interior-split">
      <section aria-labelledby="faq-title">
        <h2 id="faq-title">Preguntas frecuentes</h2>
        <details v-for="item in questions" :key="item.question">
          <summary>{{ item.question }}</summary>
          <p class="lede">{{ item.answer }}</p>
          <RouterLink class="text-link" :to="item.path">{{ item.link }}</RouterLink>
        </details>
      </section>
      <aside class="interior-panel">
        <h2>Contacto</h2>
        <p class="lede">El canal de atención se publicará con el lanzamiento de la tienda. Mientras tanto, puedes consultar la guía y las condiciones de ejemplo.</p>
        <div class="actions"><RouterLink class="button outline" to="/envios-y-devoluciones">Envíos y devoluciones</RouterLink></div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
h2 { margin-bottom: 1rem; }
details { border-top: 1px solid var(--line); padding-block: .85rem; }
summary { cursor: pointer; font-weight: 750; padding-block: .25rem; }
details p { margin-block: .65rem; }
</style>
