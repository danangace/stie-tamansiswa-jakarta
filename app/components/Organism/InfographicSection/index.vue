<script setup lang="ts">
const stats = [
  { label: "Mahasiswa Aktif", value: "2,500+", icon: "i-heroicons-users" },
  {
    label: "Alumni Sukses",
    value: "15,000+",
    icon: "i-heroicons-academic-cap",
  },
  {
    label: "Mitra Korporasi",
    value: "150+",
    icon: "i-heroicons-building-office-2",
  },
  { label: "Akreditasi", value: "B", icon: "i-heroicons-check-badge" },
];
</script>

<template>
  <div class="relative py-24 bg-primary-900 text-white overflow-hidden">
    <!-- Background World Map -->
    <div class="absolute inset-0 opacity-10 pointer-events-none">
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg"
        alt="World Map"
        class="w-full h-full object-cover grayscale invert"
      />
    </div>

    <div class="container mx-auto px-4 relative z-10">
      <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
        <div
          v-for="(stat, index) in stats"
          :key="index"
          class="p-6 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-colors duration-300"
        >
          <div class="text-4xl md:text-5xl font-bold mb-2 text-primary-200">
            {{ stat.value }}
          </div>
          <div
            class="text-sm md:text-base font-medium text-gray-300 uppercase tracking-wide"
          >
            {{ stat.label }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
