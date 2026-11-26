<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Menu, ShoppingBag, X } from 'lucide-vue-next'
import { primaryNav } from '../../router'
import { useCartStore } from '../../stores/commerce'

const route = useRoute()
const cart = useCartStore()
const open = ref(false)
const scrolled = ref(false)
const toggle = ref<HTMLButtonElement>()
const updateScroll = () => { scrolled.value = window.scrollY > 24 }

function dismiss() {
  open.value = false
  toggle.value?.focus()
}

watch(() => route.fullPath, () => {
  open.value = false
})

onMounted(() => {
  updateScroll()
  window.addEventListener('scroll', updateScroll, { passive: true })
})

onUnmounted(() => window.removeEventListener('scroll', updateScroll))
</script>

<template>
  <header class="site-header" :class="{ solid: scrolled || open || route.name !== 'home' }"
    @keydown.esc="open && dismiss()">
    <div class="wrap bar">
      <RouterLink class="wordmark" to="/" aria-label="WoodRig, inicio">WOOD<span>RIG</span></RouterLink>
      <nav class="desktop-nav" aria-label="Principal">
        <RouterLink v-for="item in primaryNav" :key="item.path" :to="item.path">{{ item.label }}</RouterLink>
      </nav>
      <div class="tools">
        <RouterLink class="config-link" to="/configurador">Configurador</RouterLink>
        <RouterLink class="icon" to="/carrito" :aria-label="cart.count ? 'Carrito, ' + cart.count + (cart.count === 1 ? ' artículo' : ' artículos') : 'Carrito'">
          <ShoppingBag :size="20" aria-hidden="true" /><span v-if="cart.count">{{ cart.count }}</span>
        </RouterLink>
        <button ref="toggle" class="icon menu-toggle" type="button" :aria-expanded="open" aria-controls="menu-movil"
          :aria-label="open ? 'Cerrar menú' : 'Abrir menú'" @click="open = !open">
          <X v-if="open" :size="23" aria-hidden="true" /><Menu v-else :size="23" aria-hidden="true" />
        </button>
      </div>
    </div>
    <Transition name="menu">
      <nav v-show="open" id="menu-movil" class="mobile-nav" aria-label="Principal móvil">
        <RouterLink v-for="item in primaryNav" :key="item.path" :to="item.path" @click="item.path === route.path && dismiss()">{{ item.label }}</RouterLink>
        <RouterLink to="/configurador" @click="route.path === '/configurador' && dismiss()">Configurador</RouterLink>
      </nav>
    </Transition>
  </header>
</template>

<style scoped>
.site-header { position: sticky; top: 0; z-index: var(--layer-header); height: var(--header); margin-bottom: calc(-1 * var(--header)); border-bottom: 1px solid var(--line); transition: background var(--speed) var(--ease), box-shadow var(--speed) var(--ease); }
.solid { background: rgb(25 24 22 / .97); box-shadow: var(--shadow); }
.bar { height: 100%; display: flex; align-items: center; justify-content: space-between; gap: 1.25rem; }
.wordmark { font: 700 2rem/.85 'Barlow Condensed', sans-serif; letter-spacing: .035em; }
.wordmark span { color: var(--accent); }
.desktop-nav, .tools { display: flex; align-items: center; gap: clamp(.75rem, 2vw, 2rem); }
.desktop-nav, .config-link { font-size: .875rem; font-weight: 750; }
.desktop-nav a, .mobile-nav a, .config-link, .icon { transition: color var(--speed) var(--ease), border-color var(--speed) var(--ease); }
.desktop-nav a:hover, .desktop-nav .router-link-active, .mobile-nav .router-link-active, .config-link:hover { color: var(--accent); }
.config-link { border: 1px solid var(--line); border-radius: var(--radius); padding: .5rem .85rem; }
.icon { display: flex; position: relative; align-items: center; justify-content: center; width: 2.75rem; min-height: 2.75rem; background: none; border: 0; }
.icon:hover { color: var(--accent); }
.icon span { position: absolute; inset: 0 0 auto auto; font-size: .75rem; }
.menu-toggle, .mobile-nav { display: none; }
.menu-enter-active, .menu-leave-active { transition: opacity var(--speed) var(--ease), transform var(--speed) var(--ease); }
.menu-enter-from, .menu-leave-to { opacity: 0; transform: translateY(-.4rem); }

@media (max-width: 900px) {
  .desktop-nav, .config-link { display: none; }
  .menu-toggle { display: flex; }
  .mobile-nav { display: grid; position: absolute; top: 100%; inset-inline: 0; padding: .75rem var(--gutter) 1.25rem; background: var(--surface); box-shadow: var(--shadow); max-height: calc(100dvh - var(--header)); overflow: auto; }
  .mobile-nav a { padding: .65rem 0; border-bottom: 1px solid var(--line); font: 700 1.15rem var(--display); }
}
</style>
