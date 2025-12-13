<script setup lang="ts">
const items = [
  "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1562774053-701939374585?q=80&w=2086&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070&auto=format&fit=crop",
];
</script>

<template>
  <div class="relative h-screen w-full">
    <UCarousel
      v-slot="{ item }"
      :items="items"
      :ui="{ item: 'basis-full' }"
      class="h-full overflow-hidden"
      indicators
      :autoplay="{ delay: 5000 }"
    >
      <img
        :src="item"
        class="w-full h-full object-cover"
        draggable="false"
        alt="Hero Image"
      />
      <div
        class="absolute inset-0 bg-black/30 flex items-center justify-center"
      >
        <div class="text-center text-white px-4">
          <h1 class="text-4xl md:text-6xl font-bold mb-4">
            STIE Tamansiswa Jakarta
          </h1>
          <p class="text-xl md:text-2xl">
            Membangun Generasi Unggul dan Berkarakter
          </p>
        </div>
      </div>
    </UCarousel>
  </div>
</template>
