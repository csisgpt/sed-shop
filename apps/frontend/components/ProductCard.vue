<template>
  <div class="border rounded p-4 flex flex-col">
    <img :src="product.image" :alt="product.title" class="mb-2 rounded" />
    <h3 class="font-bold mb-1">{{ product.title }}</h3>
    <p class="mb-2">{{ format(product.price) }}</p>
    <button class="mt-auto bg-blue-600 text-white py-1 px-2 rounded" @click="onAdd">
      افزودن به سبد
    </button>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import { useCurrency } from '~/composables/useCurrency'

const props = defineProps<{
  product: { id: string; title: string; price: number | string; image: string }
}>()

const emit = defineEmits<{ (e: 'add', product: typeof props.product): void }>()

const { format } = useCurrency()

function onAdd() {
  emit('add', props.product)
}
</script>
