<script setup lang="ts">
import type { Product } from '@sed-shop/shared-schemas';
import { useCurrency } from '~/composables/useCurrency';
const route = useRoute();
const config = useRuntimeConfig();
const { data: product } = await useFetch<Product>(
  `${config.public.apiBase}/products/${route.params.slug}`,
);
</script>

<template>
  <div v-if="product" class="p-4 space-y-4">
    <h1 class="text-2xl">{{ product.title }}</h1>
    <!-- prettier-ignore -->
    <img
        v-if="product.images[0]"
        :src="product.images[0].url"
        :alt="product.title"
        class="w-full max-w-md object-cover"
      >
    <p>{{ product.description }}</p>
    <p class="font-bold" v-if="product.variants[0]">
      {{ useCurrency(product.variants[0].price) }}
    </p>
  </div>
</template>
