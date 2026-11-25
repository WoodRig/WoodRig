<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import PageIntro from '../components/common/PageIntro.vue'
import { products } from '../data/catalog'
import { useCartStore } from '../stores/commerce'

const route = useRoute()
const cart = useCartStore()
const checkout = computed(() => route.path === '/checkout')
const orderId = ref('')
const lines = computed(() => cart.items.map((item) => ({
  ...item,
  product: products.find(({ slug }) => slug === item.configuration.productSlug),
  extras: item.configuration.accessorySlugs.map((slug) => products.find((item) => item.slug === slug)?.name).filter(Boolean),
})))

function updateQuantity(id: string, event: Event) {
  const value = (event.target as HTMLInputElement).valueAsNumber
  if (Number.isInteger(value) && value >= 1 && value <= 99) cart.setQuantity(id, value)
}

function changeQuantity(id: string, event: Event) {
  const input = event.target as HTMLInputElement
  input.value = String(cart.setQuantity(id, input.valueAsNumber))
}

function confirm() {
  orderId.value = cart.completeDemo() ?? ''
}
</script>

<template>
  <div class="wrap interior">
    <PageIntro label="Tienda de demostración" :title="checkout ? 'Revisa tu pedido' : 'Tu carrito'"
      :description="checkout ? 'Simula la confirmación del pedido con los artículos de tu carrito.' : 'Revisa los modelos, combinaciones y cantidades que has seleccionado.'" />

    <div v-if="orderId" class="interior-panel" role="status">
      <h2>Pedido de prueba confirmado</h2>
      <p>Referencia {{ orderId }}. Tu historial de esta sesión ya incluye el pedido.</p>
      <div class="actions"><RouterLink class="button" to="/cuenta">Ver historial</RouterLink></div>
    </div>

    <div v-else-if="!lines.length" class="interior-panel">
      <h2>Tu carrito está vacío</h2>
      <p>Explora la gama y añade el equipo que quieras probar.</p>
      <div class="actions"><RouterLink class="button" to="/productos">Explorar productos</RouterLink></div>
    </div>

    <div v-else class="interior-split">
      <ul class="interior-list lines">
        <li v-for="line in lines" :key="line.id">
          <img v-if="line.product?.media?.image" :src="line.product.media.image" alt="" width="960" height="640" />
          <div>
            <RouterLink class="text-link" :to="{ name: 'product', params: { slug: line.configuration.productSlug } }">{{ line.product?.name }}</RouterLink>
            <p v-if="line.extras.length" class="lede">{{ line.extras.join(' · ') }}</p>
            <p v-if="checkout">Cantidad {{ line.quantity }}</p>
            <div v-else class="line-actions">
              <label class="interior-field">Cantidad de {{ line.product?.name }}
                <input :value="line.quantity" type="number" min="1" max="99"
                  @input="updateQuantity(line.id, $event)" @change="changeQuantity(line.id, $event)" />
              </label>
              <button type="button" class="button outline" :aria-label="'Quitar ' + line.product?.name" @click="cart.remove(line.id)">Quitar</button>
            </div>
          </div>
        </li>
      </ul>
      <aside class="interior-panel">
        <h2>Resumen</h2>
        <p role="status">{{ cart.count }} {{ cart.count === 1 ? 'unidad' : 'unidades' }}</p>
        <p class="interior-note">Este flujo es de prueba. No se solicitan datos personales, no se realiza ningún cargo y no se envían productos.</p>
        <div class="actions">
          <button v-if="checkout" class="button" type="button" @click="confirm">Confirmar pedido de prueba</button>
          <RouterLink v-else to="/checkout" class="button">Revisar pedido</RouterLink>
          <RouterLink v-if="checkout" to="/carrito" class="text-link">Editar carrito</RouterLink>
        </div>
      </aside>
    </div>
  </div>
</template>

<style scoped>
.lines li { display: grid; grid-template-columns: clamp(5rem, 15vw, 10rem) 1fr; gap: 1rem; align-items: start; }
.lines img { border-radius: var(--radius); }
.line-actions { display: flex; flex-wrap: wrap; align-items: end; gap: .65rem; margin-top: .6rem; }
.line-actions label { margin: 0; font-size: .8rem; }
.line-actions input { width: 5.5rem; }
.line-actions button { min-height: 2.75rem; }
</style>
