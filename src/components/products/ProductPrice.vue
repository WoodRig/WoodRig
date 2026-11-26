<script lang="ts">
const currency = new Intl.NumberFormat('es-ES', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
})
</script>

<script setup lang="ts">
defineProps<{ price: number }>()
</script>

<template>
  <p class="price"><strong>{{ currency.format(price) }}</strong> <span>Precio orientativo</span></p>
</template>

<style scoped>
.price { display: flex; align-items: baseline; flex-wrap: wrap; gap: .15rem .65rem; margin-block: .75rem; }
.price strong { color: var(--ink); font-size: 1.3rem; }
.price span { color: var(--muted); font-size: .82rem; }
</style>
