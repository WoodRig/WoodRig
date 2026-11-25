<script setup lang="ts">
import { computed, ref } from 'vue'
import PageIntro from '../components/common/PageIntro.vue'

const groups = {
  volante: { title: 'Volantes y bases', items: [
    'Mide la distancia entre centros de los orificios de montaje.',
    'Comprueba la orientación de montaje y el espacio para los conectores.',
    'Consulta en el manual el tipo y la profundidad de tornillo admitidos.',
  ] },
  pedales: { title: 'Pedaleras', items: [
    'Mide el ancho y el fondo de la base con todos los pedales instalados.',
    'Localiza los puntos de fijación y comprueba si puedes acceder desde debajo.',
    'Reserva espacio para el recorrido de los pedales y la salida del cable.',
  ] },
  asiento: { title: 'Asientos', items: [
    'Identifica si tu asiento se fija por los laterales o por la base.',
    'Mide la separación entre las guías o los soportes laterales.',
    'Comprueba el espacio que necesita el asiento para desplazarse o reclinarse.',
  ] },
}
const selected = ref<keyof typeof groups>('volante')
const group = computed(() => groups[selected.value])
</script>

<template>
  <div class="wrap interior">
    <PageIntro label="Compatibilidad" title="Comprueba tu equipo." description="Una guía de medidas para comparar tus componentes con las futuras fichas técnicas de WoodRig." />
    <div class="interior-split">
      <div class="interior-panel">
        <label class="interior-field">Tipo de componente
          <select v-model="selected">
            <option v-for="(item, key) in groups" :key="key" :value="key">{{ item.title }}</option>
          </select>
        </label>
        <section aria-live="polite">
          <h2>{{ group.title }}</h2>
          <ul class="interior-list"><li v-for="item in group.items" :key="item">{{ item }}</li></ul>
        </section>
      </div>
      <aside class="interior-panel">
        <h2>Estado de validación</h2>
        <p class="lede">La compatibilidad por marca y modelo está pendiente de pruebas. Estas medidas te ayudan a preparar la comprobación.</p>
        <div class="actions"><RouterLink class="text-link" to="/soporte">Consulta las preguntas frecuentes</RouterLink></div>
      </aside>
    </div>
  </div>
</template>
