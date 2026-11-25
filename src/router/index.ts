import { createRouter, createWebHistory } from 'vue-router'
import { site } from '../config/site'

export const primaryNav = [
  { path: '/cockpits', label: 'Cockpits' },
  { path: '/soportes', label: 'Soportes' },
  { path: '/accesorios', label: 'Accesorios' },
  { path: '/packs', label: 'Packs' },
  { path: '/ingenieria', label: 'Ingeniería' },
]

const catalog = () => import('../views/CatalogView.vue')
const brand = () => import('../views/BrandView.vue')
const commerce = () => import('../views/CommerceView.vue')

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
    { path: '/productos', component: catalog, meta: { title: 'Toda la gama' } },
    ...primaryNav.slice(0, 4).map(({ path, label }) => ({ path, component: catalog, meta: { title: label } })),
    { path: '/configurador', component: () => import('../views/ConfiguratorView.vue'), meta: { title: 'Configurador' } },
    { path: '/ingenieria', component: brand, meta: { title: 'Ingeniería' } },
    { path: '/nosotros', component: brand, meta: { title: 'Sobre WoodRig' } },
    { path: '/compatibilidad', component: () => import('../views/CompatibilityView.vue'), meta: { title: 'Compatibilidad' } },
    { path: '/soporte', component: () => import('../views/SupportView.vue'), meta: { title: 'Soporte' } },
    { path: '/carrito', component: commerce, meta: { title: 'Carrito' } },
    { path: '/checkout', component: commerce, meta: { title: 'Checkout de demostración' } },
    { path: '/cuenta', component: () => import('../views/AccountView.vue'), meta: { title: 'Área de cliente' } },
    ...site.legal.map(({ name, path, id }) => ({
      path,
      component: () => import('../views/LegalView.vue'),
      meta: { title: name, legalId: id },
    })),
    { path: '/producto/:slug', name: 'product', component: () => import('../views/ProductView.vue') },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFoundView.vue'), meta: { title: 'Página no encontrada' } },
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
