<template>
  <nav class="bg-gray-100 p-4">
    <ul class="flex flex-wrap gap-4">
      <li><NuxtLink to="/">خانه</NuxtLink></li>
      <li><NuxtLink to="/products">محصولات</NuxtLink></li>
      <li v-for="c in productStore.categories" :key="c.id">
        <NuxtLink :to="`/products?category=${c.slug}`">{{ c.name }}</NuxtLink>
      </li>
      <li class="ml-auto"><NuxtLink to="/cart">سبد خرید</NuxtLink></li>
    </ul>
  </nav>
</template>

<script setup lang="ts">
import { useProductsStore } from '~/stores/products';
const productStore = useProductsStore();
await productStore.fetchCategories();
</script>
