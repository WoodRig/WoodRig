import { createRouter, createWebHistory } from 'vue-router'
import { site } from '../config/site'
import { updatePageMetadata } from './metadata'

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
    { path: '/productos', component: catalog, meta: { title: 'Toda la gama', description: 'Explora los cockpits, soportes, accesorios y packs de simracing que WoodRig está desarrollando.' } },
    { path: '/cockpits', component: () => import('../views/CockpitsView.vue'), meta: { title: 'Comparar Formula y Rally' } },
    ...primaryNav.slice(1, 4).map(({ path, label }) => ({
      path, component: catalog, meta: { title: label, description: `Explora la familia ${label.toLowerCase()} de WoodRig y descubre sus propuestas para tu equipo de simracing.` },
    })),
    { path: '/configurador', component: () => import('../views/ConfiguratorView.vue'), meta: { title: 'Configurador', description: 'Elige un modelo WoodRig, combina componentes y comparte tu configuración de simracing.' } },
    { path: '/ingenieria', component: brand, meta: { title: 'Ingeniería', description: 'Descubre cómo WoodRig plantea la estructura, las uniones y los materiales de sus cockpits y soportes.' } },
    { path: '/nosotros', component: brand, meta: { title: 'Sobre WoodRig', description: 'Conoce la marca WoodRig y su enfoque para diseñar equipos de simracing que encajen en casa.' } },
    { path: '/compatibilidad', component: () => import('../views/CompatibilityView.vue'), meta: { title: 'Compatibilidad', description: 'Consulta qué debes medir en tu volante, pedalera y asiento antes de elegir un equipo WoodRig.' } },
    { path: '/soporte', component: () => import('../views/SupportView.vue'), meta: { title: 'Soporte', description: 'Consulta las preguntas frecuentes sobre la gama WoodRig, la compatibilidad y los pedidos de prueba.' } },
    { path: '/carrito', component: commerce, meta: { title: 'Carrito', privateDemo: true } },
    { path: '/checkout', component: commerce, meta: { title: 'Checkout de demostración', privateDemo: true } },
    { path: '/cuenta', component: () => import('../views/AccountView.vue'), meta: { title: 'Área de cliente', privateDemo: true } },
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

router.afterEach((to, _from, failure) => {
  if (!failure) updatePageMetadata(to)
})
