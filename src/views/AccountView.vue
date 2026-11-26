<script setup lang="ts">
import PageIntro from '../components/common/PageIntro.vue'
import { products } from '../data/catalog'
import { useCartStore } from '../stores/commerce'

const cart = useCartStore()
const dateFormat = new Intl.DateTimeFormat('es-ES', { dateStyle: 'medium', timeZone: 'Europe/Madrid' })
const names = new Map(products.map(({ slug, name }) => [slug, name]))
</script>

<template>
  <div class="wrap interior">
    <PageIntro label="Área de cliente" title="Tus pedidos." description="Consulta los pedidos de demostración realizados en esta pestaña." />
    <div v-if="!cart.orders.length" class="interior-panel">
      <h2>Todavía no hay pedidos</h2>
      <p>Prueba el configurador o añade un producto al carrito para simular tu primer pedido.</p>
      <div class="actions"><RouterLink class="button" to="/productos">Explorar la gama</RouterLink></div>
    </div>
    <div v-else class="interior-grid">
      <article v-for="order in cart.orders" :key="order.id" class="interior-panel">
        <p class="eyebrow">Pedido de prueba</p>
        <h2>{{ order.id }}</h2>
        <time :datetime="order.date">{{ dateFormat.format(new Date(order.date)) }}</time>
        <ul class="interior-list">
          <li v-for="item in order.items" :key="item.id">
            {{ item.quantity }} × {{ names.get(item.configuration.productSlug) }}
            <span v-if="item.configuration.accessorySlugs.length">
              · {{ item.configuration.accessorySlugs.map((slug) => names.get(slug)).join(' · ') }}
            </span>
          </li>
        </ul>
      </article>
    </div>
  </div>
</template>
