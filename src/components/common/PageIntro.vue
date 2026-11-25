<script setup lang="ts">
defineProps<{ title: string; description: string; label: string }>()
</script>

<template>
  <header class="page-intro">
    <p class="eyebrow">{{ label }}</p>
    <h1>{{ title }}</h1>
    <p class="lede">{{ description }}</p>
    <slot />
  </header>
</template>

<style scoped>
.page-intro { padding-block: clamp(2rem, 7vw, 6rem) clamp(2rem, 5vw, 4.5rem); }
h1 { font-size: var(--title); margin-block: .75rem 1rem; text-wrap: balance; }
.lede { max-width: 56ch; }
</style>
