<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import SiteHeader from './components/layout/SiteHeader.vue'
import SiteFooter from './components/layout/SiteFooter.vue'

const { currentRoute } = useRouter()
const content = ref<HTMLElement>()

watch(currentRoute, (to, from) => {
  if (from.matched.length && to.path !== from.path && !to.hash) {
    content.value?.focus({ preventScroll: true })
  }
}, { flush: 'post' })
</script>

<template>
  <a class="skip-link" href="#contenido">Saltar al contenido</a>
  <SiteHeader />
  <main id="contenido" ref="content" tabindex="-1">
    <RouterView v-slot="{ Component, route }">
      <div v-if="Component" :key="route.path" class="route-page">
        <component :is="Component" />
      </div>
    </RouterView>
  </main>
  <SiteFooter />
</template>
