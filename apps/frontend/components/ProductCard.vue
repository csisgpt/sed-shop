<template>
  <div class="border rounded p-4 flex flex-col h-full">
    <img
      v-if="product.images[0]"
      :src="product.images[0].url"
      :alt="product.title"
      class="w-full h-48 object-cover"
    />
    <h3 class="mt-2 text-lg">{{ product.title }}</h3>
    <p class="text-gray-600 mt-auto">{{ formatPrice(product.variants[0]?.price) }}</p>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@sed-shop/shared-schemas';
import { useCurrency } from '~/composables/useCurrency';

const props = defineProps<{ product: Product }>();
const formatPrice = (price?: number) => (price ? useCurrency(price) : '');
</script>
