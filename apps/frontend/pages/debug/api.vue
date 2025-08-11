<script setup lang="ts">
const api = useApiClient();
const result = ref<any>(null);
const error = ref<string | null>(null);

onMounted(async () => {
  const { data, error: err } = await api.GET('/v1/ping');
  if (err) error.value = (err as any)?.message ?? 'error';
  else result.value = data;
});
</script>

<template>
  <div class="p-6 space-y-4">
    <h1 class="text-2xl font-bold">API Client Debug</h1>
    <p class="text-gray-600">GET /api/v1/ping</p>
    <div v-if="error" class="text-red-600">Error: {{ error }}</div>
    <pre v-else class="bg-gray-100 p-4 rounded">{{ result }}</pre>
  </div>
</template>

<style scoped>
pre { white-space: pre-wrap; word-break: break-word; }
</style>

