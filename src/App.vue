<script setup lang="ts">
import SiteHeader from './components/layout/SiteHeader.vue'
import SiteFooter from './components/layout/SiteFooter.vue'
import { useSmoothWheel } from './composables/useSmoothWheel'

useSmoothWheel()
</script>

<template>
  <a class="skip-link" href="#contenido">Saltar al contenido</a>
  <SiteHeader />
  <main id="contenido" tabindex="-1">
    <RouterView v-slot="{ Component, route }">
      <div v-if="Component" :key="route.path" class="route-page">
        <component :is="Component" />
      </div>
    </RouterView>
  </main>
  <SiteFooter />
</template>
