<script setup lang="ts">
withDefaults(
  defineProps<{
    size?: number;
  }>(),
  {
    size: 40,
  }
);
</script>

<template>
  <img src="/img/logo-stie-tamansiswa.webp" :style="{ height: `${size}px` }" />
</template>

<style scoped></style>
