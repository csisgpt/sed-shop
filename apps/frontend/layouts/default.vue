<template>
  <div>
    <Navbar />
    <main class="container mx-auto p-4">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import Navbar from '~/components/Navbar.vue'
</script>
