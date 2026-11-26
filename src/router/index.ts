import { createRouter, createWebHistory } from 'vue-router'
import { site } from '../config/site'
import { categories } from '../data/catalog'
import { updatePageMetadata } from './metadata'

export const primaryNav = [
  { path: '/productos', label: 'Gama' },
  { path: '/cockpits', label: 'Cockpits' },
  { path: '/soportes', label: 'Soportes' },
  { path: '/accesorios', label: 'Accesorios' },
  { path: '/ingenieria', label: 'Ingeniería' },
]

const catalog = () => import('../views/CatalogView.vue')
const brand = () => import('../views/BrandView.vue')
const commerce = () => import('../views/CommerceView.vue')

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: () => import('../views/HomeView.vue') },
    { path: '/productos', component: catalog },
    { path: '/cockpits', component: () => import('../views/CockpitsView.vue') },
    ...categories.filter(({ slug }) => slug !== 'cockpits')
      .map(({ slug }) => ({ path: '/' + slug, component: catalog })),
    { path: '/configurador', component: () => import('../views/ConfiguratorView.vue') },
    { path: '/ingenieria', component: brand },
    { path: '/nosotros', component: brand },
    { path: '/compatibilidad', component: () => import('../views/CompatibilityView.vue') },
    { path: '/soporte', component: () => import('../views/SupportView.vue') },
    { path: '/carrito', component: commerce },
    { path: '/checkout', component: commerce },
    { path: '/cuenta', component: () => import('../views/AccountView.vue') },
    ...site.legal.map(({ path, id }) => ({
      path,
      component: () => import('../views/LegalView.vue'),
      meta: { legalId: id },
    })),
    { path: '/producto/:slug', name: 'product', component: () => import('../views/ProductView.vue') },
    { path: '/:pathMatch(.*)*', name: 'not-found', component: () => import('../views/NotFoundView.vue') },
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
