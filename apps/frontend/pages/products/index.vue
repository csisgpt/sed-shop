<script setup lang="ts">
import { useProductsStore } from '~/stores/products';
import { useRoute } from '#imports';

const store = useProductsStore();
const route = useRoute();
await store.fetchProducts(route.query.category as string | undefined);
</script>

<template>
  <div class="p-4 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
    <ProductCard v-for="p in store.products" :key="p.id" :product="p" />
  </div>
</template>
