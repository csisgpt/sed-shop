<script setup lang="ts">
import { useProductsStore } from '@/stores/products'

const store = useProductsStore()
await store.fetchProducts()
</script>

<template>
  <div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
    <ProductCard v-for="p in store.items" :key="p.id" :product="p" />
  </div>
</template>
