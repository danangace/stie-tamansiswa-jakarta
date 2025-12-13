<script setup lang="ts">
const partners = [
  {
    name: "Business Insider",
    logo: "https://placehold.co/200x80?text=Business+Insider",
  },
  {
    name: "The Jakarta Post",
    logo: "https://placehold.co/200x80?text=The+Jakarta+Post",
  },
  { name: "Metro TV", logo: "https://placehold.co/200x80?text=Metro+TV" },
  { name: "Astra", logo: "https://placehold.co/200x80?text=Astra" },
  {
    name: "Djarum Group",
    logo: "https://placehold.co/200x80?text=Djarum+Group",
  },
  { name: "Kompas", logo: "https://placehold.co/200x80?text=Kompas" },
];
</script>

<template>
  <div class="py-10 bg-white border-b border-gray-100">
    <div class="container mx-auto px-4 mb-9">
      <h2
        class="text-center text-gray-500 font-medium uppercase tracking-wider text-md"
      >
        Partner Kami
      </h2>
    </div>
    <div class="relative flex overflow-x-hidden group">
      <div
        class="animate-marquee whitespace-nowrap flex items-center space-x-20 px-8"
      >
        <div
          v-for="(partner, index) in [...partners, ...partners, ...partners]"
          :key="index"
          class="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
        >
          <img
            :src="partner.logo"
            :alt="partner.name"
            class="h-16 w-auto object-contain"
          />
        </div>
      </div>

      <div
        class="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center space-x-20 px-8"
      >
        <div
          v-for="(partner, index) in [...partners, ...partners, ...partners]"
          :key="`clone-${index}`"
          class="flex-shrink-0 grayscale hover:grayscale-0 transition-all duration-300 opacity-70 hover:opacity-100"
        >
          <img
            :src="partner.logo"
            :alt="partner.name"
            class="h-16 w-auto object-contain"
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
