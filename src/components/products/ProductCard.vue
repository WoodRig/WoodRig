<script setup lang="ts">
import type { Product } from '../../types/catalog'

defineProps<{ product: Product }>()
</script>

<template>
  <article class="card">
    <RouterLink :to="{ name: 'product', params: { slug: product.slug } }">
      <div class="product-media">
        <img v-if="product.media?.image" :src="product.media.image" :alt="product.media.alt || product.name"
          width="960" height="640" loading="lazy" decoding="async" />
      </div>
      <div class="info">
        <p class="eyebrow">{{ product.category.name }}</p>
        <h3>{{ product.name }}</h3>
        <p class="description">{{ product.description }}</p>
        <span class="text-link">Ver {{ product.name }}</span>
      </div>
    </RouterLink>
  </article>
</template>

<style scoped>
.card { min-width: 0; }
.card a { display: block; height: 100%; }
.product-media {
  aspect-ratio: 3/2;
  overflow: hidden;
  background: var(--soft);
  border-radius: var(--radius);
  & img { height: 100%; object-fit: cover; transition: transform .45s var(--ease); }
}
@media (hover: hover) and (prefers-reduced-motion: no-preference) {
  .card a:hover img { transform: scale(1.035); }
}
.info { padding-block: 1.2rem 1.5rem; border-bottom: 1px solid var(--line); }
.info h3 { font-size: 1.5rem; margin-block: .35rem .5rem; }
.description { color: var(--muted); }
.info .text-link { display: inline-block; margin-top: .9rem; font-size: .875rem; }
</style>
