<script setup lang="ts">
import PageIntro from '../components/common/PageIntro.vue'
</script>

<template>
  <div class="wrap interior">
    <PageIntro label="Error 404" title="Página no encontrada." description="Puedes volver al inicio o seguir explorando el catálogo." />
    <div class="actions">
      <RouterLink class="button" to="/">Volver al inicio</RouterLink>
      <RouterLink class="button outline" to="/productos">Explorar la gama</RouterLink>
    </div>
  </div>
</template>
