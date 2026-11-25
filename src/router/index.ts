import { createRouter, createWebHistory } from 'vue-router'
import { site } from '../config/site'

export const primaryNav = [
  { path: '/cockpits', label: 'Cockpits' },
  { path: '/soportes', label: 'Soportes' },
  { path: '/accesorios', label: 'Accesorios' },
  { path: '/packs', label: 'Packs' },
  { path: '/ingenieria', label: 'Ingeniería' },
]

const pages = [
  { path: '/productos', label: 'Toda la gama' },
  ...primaryNav,
  { path: '/configurador', label: 'Configurador' },
  { path: '/compatibilidad', label: 'Compatibilidad' },
  { path: '/nosotros', label: 'Sobre WoodRig' },
  { path: '/soporte', label: 'Soporte' },
  { path: '/carrito', label: 'Carrito' },
  { path: '/checkout', label: 'Checkout' },
  { path: '/cuenta', label: 'Área de cliente' },
]

const provisional = () => import('../views/ProvisionalView.vue')

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
    ...pages.map(({ path, label }) => ({ path, component: provisional, meta: { title: label } })),
    ...site.legal.map(({ name, path, id }) => ({
      path,
      component: () => import('../views/LegalView.vue'),
      meta: { title: name, legalId: id },
    })),
    { path: '/producto/:slug', name: 'product', component: provisional },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: provisional },
  ],
  scrollBehavior(to, from, saved) {
    if (saved) return saved
    if (to.hash) {
      const offset = Number.parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0
      const smooth = from.path === to.path && from.matched.length > 0
        && window.matchMedia('(prefers-reduced-motion: no-preference)').matches
      return { el: to.hash, top: offset, behavior: smooth ? 'smooth' : 'instant' }
    }
    return { top: 0 }
  },
})

router.afterEach((to) => {
  document.title = to.meta.title ? String(to.meta.title) + ' | WoodRig' : 'WoodRig | Simracing con carácter'
})
