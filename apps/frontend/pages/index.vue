<template>
  <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
    <ProductCard v-for="p in store.products" :key="p.id" :product="p" />
  </div>
</template>
<script setup lang="ts">
import { useProductsStore } from '~/stores/products'
import ProductCard from '~/components/ProductCard.vue'
const store = useProductsStore()
await store.fetchAll()
</script>
