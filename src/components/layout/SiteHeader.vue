<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { ChevronDown, Menu, ShoppingBag, X } from 'lucide-vue-next'
import { categories } from '../../data/catalog'
import { useCartStore } from '../../stores/commerce'

const route = useRoute()
const cart = useCartStore()
const open = ref(false)
const productsOpen = ref(false)
const scrolled = ref(false)
const header = ref<HTMLElement>()
const productsNav = ref<HTMLElement>()
const mobileToggle = ref<HTMLButtonElement>()
const productsToggle = ref<HTMLButtonElement>()
const updateScroll = () => { scrolled.value = window.scrollY > 24 }

function closeNavigation() {
  open.value = false
  productsOpen.value = false
}

async function toggleNavigation() {
  open.value = !open.value
  if (!open.value) {
    productsOpen.value = false
    return
  }

  await nextTick()
  productsToggle.value?.focus()
}

function dismiss() {
  if (productsOpen.value) {
    productsOpen.value = false
    productsToggle.value?.focus()
  } else if (open.value) {
    closeNavigation()
    mobileToggle.value?.focus()
  }
}

function closeCurrentRoute(path: string) {
  if (route.path !== path) return

  const focusTarget = open.value ? mobileToggle.value : productsToggle.value
  closeNavigation()
  focusTarget?.focus()
}

function closeOnOutsidePointer(event: PointerEvent) {
  if (!(event.target instanceof Node)) return
  if (!header.value?.contains(event.target)) closeNavigation()
  else if (!productsNav.value?.contains(event.target)) productsOpen.value = false
}

function closeOnFocusOut(event: FocusEvent) {
  if (event.relatedTarget instanceof Node && !productsNav.value?.contains(event.relatedTarget)) {
    productsOpen.value = false
  }
}

watch(() => route.fullPath, closeNavigation)

onMounted(() => {
  updateScroll()
  window.addEventListener('scroll', updateScroll, { passive: true })
  document.addEventListener('pointerdown', closeOnOutsidePointer)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateScroll)
  document.removeEventListener('pointerdown', closeOnOutsidePointer)
})
</script>

<template>
  <header ref="header" class="site-header" :class="{ solid: scrolled || open || productsOpen || route.name !== 'home' }"
    @keydown.esc="dismiss">
    <div class="wrap bar">
      <RouterLink class="wordmark" to="/" aria-label="WoodRig, inicio">WOOD<span>RIG</span></RouterLink>
      <nav id="main-navigation" class="primary-nav" :class="{ 'nav-open': open }" aria-label="Principal">
        <div ref="productsNav" class="products-nav" @focusout="closeOnFocusOut">
          <button ref="productsToggle" type="button" class="products-toggle" :class="{ current: route.meta.catalog }"
            :aria-expanded="productsOpen" aria-controls="product-navigation" @click="productsOpen = !productsOpen">
            Productos <ChevronDown :size="16" aria-hidden="true" />
          </button>
          <ul v-show="productsOpen" id="product-navigation" class="products-panel">
            <li><RouterLink to="/productos" @click="closeCurrentRoute('/productos')">Todos los productos</RouterLink></li>
            <li v-for="category in categories" :key="category.slug">
              <RouterLink :to="'/' + category.slug" @click="closeCurrentRoute('/' + category.slug)">{{ category.name }}</RouterLink>
            </li>
          </ul>
        </div>
        <RouterLink to="/ingenieria" @click="open && closeCurrentRoute('/ingenieria')">Ingeniería</RouterLink>
        <RouterLink class="mobile-config" to="/configurador" @click="open && closeCurrentRoute('/configurador')">Configurador</RouterLink>
      </nav>
      <div class="tools">
        <RouterLink class="config-link" to="/configurador">Configurador</RouterLink>
        <RouterLink class="icon" to="/carrito" :aria-label="cart.count ? 'Carrito, ' + cart.count + (cart.count === 1 ? ' artículo' : ' artículos') : 'Carrito'">
          <ShoppingBag :size="20" aria-hidden="true" /><span v-if="cart.count">{{ cart.count }}</span>
        </RouterLink>
        <button ref="mobileToggle" class="icon menu-toggle" type="button" :aria-expanded="open" aria-controls="main-navigation"
          :aria-label="open ? 'Cerrar menú' : 'Abrir menú'" @click="toggleNavigation">
          <X v-if="open" :size="23" aria-hidden="true" /><Menu v-else :size="23" aria-hidden="true" />
        </button>
      </div>
    </div>
  </header>
</template>

<style scoped>
.site-header { position: sticky; top: 0; z-index: var(--layer-header); height: var(--header); margin-bottom: calc(-1 * var(--header)); border-bottom: 1px solid var(--line); transition: background var(--speed) var(--ease), box-shadow var(--speed) var(--ease); }
.solid { background: rgb(25 24 22 / .97); box-shadow: var(--shadow); }
.bar { height: 100%; display: flex; align-items: center; justify-content: space-between; gap: 1.25rem; }
.wordmark { font: 700 2rem/.85 'Barlow Condensed', sans-serif; letter-spacing: .035em; }
.wordmark span { color: var(--accent); }
.primary-nav, .tools { display: flex; align-items: center; gap: clamp(.75rem, 2vw, 2rem); }
.primary-nav, .config-link { font-size: .875rem; font-weight: 750; }
.primary-nav a, .products-toggle, .config-link, .icon { transition: color var(--speed) var(--ease), border-color var(--speed) var(--ease); }
.primary-nav a:hover, .primary-nav .router-link-exact-active, .products-toggle:hover, .products-toggle.current, .config-link:hover { color: var(--accent); }
.products-nav { position: relative; }
.products-toggle { display: flex; align-items: center; gap: .4rem; min-height: 2.75rem; border: 0; padding: 0 .25rem; background: none; }
.products-toggle[aria-expanded='true'] svg { transform: rotate(180deg); }
.products-panel { position: absolute; top: calc(100% + .45rem); left: 0; min-width: 12rem; margin: 0; padding: .4rem; list-style: none; background: var(--surface); border: 1px solid var(--line); border-radius: var(--radius); box-shadow: var(--shadow); }
.products-panel a { display: flex; align-items: center; min-height: 2.75rem; padding: .35rem .75rem; }
.products-panel li:first-child { border-bottom: 1px solid var(--line); }
.config-link { border: 1px solid var(--line); border-radius: var(--radius); padding: .5rem .85rem; }
.icon { display: flex; position: relative; align-items: center; justify-content: center; width: 2.75rem; min-height: 2.75rem; background: none; border: 0; }
.icon:hover { color: var(--accent); }
.icon span { position: absolute; inset: 0 0 auto auto; font-size: .75rem; }
.menu-toggle, .mobile-config { display: none; }

@media (max-width: 900px) {
  .primary-nav, .config-link { display: none; }
  .menu-toggle { display: flex; }
  .primary-nav.nav-open { display: grid; position: absolute; top: 100%; inset-inline: 0; gap: 0; padding: .75rem var(--gutter) 1.25rem; background: var(--surface); box-shadow: var(--shadow); max-height: calc(100dvh - var(--header)); overflow: auto; }
  .products-nav, .primary-nav > a { border-bottom: 1px solid var(--line); }
  .products-toggle, .primary-nav > a { width: 100%; padding: .65rem 0; font-size: 1.05rem; }
  .products-toggle { justify-content: space-between; }
  .products-panel { position: static; margin-bottom: .65rem; padding: 0 .5rem; box-shadow: none; }
  .mobile-config { display: block; }
}
</style>
