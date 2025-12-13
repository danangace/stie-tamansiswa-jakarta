<script setup lang="ts">
const partners = [
  { name: "Partner 1", logo: "https://placehold.co/150x50?text=Partner+1" },
  { name: "Partner 2", logo: "https://placehold.co/150x50?text=Partner+2" },
  { name: "Partner 3", logo: "https://placehold.co/150x50?text=Partner+3" },
  { name: "Partner 4", logo: "https://placehold.co/150x50?text=Partner+4" },
  { name: "Partner 5", logo: "https://placehold.co/150x50?text=Partner+5" },
  { name: "Partner 6", logo: "https://placehold.co/150x50?text=Partner+6" },
];
</script>

<template>
  <div class="py-12 bg-white border-b border-gray-100">
    <div class="container mx-auto px-4 mb-6">
      <h2
        class="text-center text-gray-500 font-medium uppercase tracking-wider text-sm"
      >
        Partner Kami
      </h2>
    </div>
    <div class="relative flex overflow-x-hidden group">
      <div
        class="animate-marquee whitespace-nowrap flex items-center space-x-16 px-8"
      >
        <div
          v-for="(partner, index) in [...partners, ...partners, ...partners]"
          :key="index"
          class="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
        >
          <img
            :src="partner.logo"
            :alt="partner.name"
            class="h-12 w-auto object-contain"
          />
        </div>
      </div>

      <div
        class="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center space-x-16 px-8"
      >
        <div
          v-for="(partner, index) in [...partners, ...partners, ...partners]"
          :key="`clone-${index}`"
          class="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
        >
          <img
            :src="partner.logo"
            :alt="partner.name"
            class="h-12 w-auto object-contain"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animate-marquee {
  animation: marquee 25s linear infinite;
}
.animate-marquee2 {
  animation: marquee2 25s linear infinite;
}

@keyframes marquee {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}
@keyframes marquee2 {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0%);
  }
}
</style>
