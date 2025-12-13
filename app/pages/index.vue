<script setup lang="ts">
const route = useRoute();
console.log("Current route path:", route.path);
</script>

<template>
  <div class="p-8 bg-red-600">
    <h1 class="text-4xl font-bold text-white mb-4">
      Welcome to Your Nuxt 3 App
    </h1>
    <p class="text-lg text-gray-100 bg-red-500 p-4 rounded-lg shadow-lg">
      This is the home page. You can start editing this page by modifying
      <code class="bg-yellow-300 text-black px-2 py-1 rounded"
        >app/pages/index.vue</code
      >.
    </p>
  </div>
</template>

<style scoped></style>
