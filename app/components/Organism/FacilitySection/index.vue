<script setup lang="ts">
const facilities = [
  {
    title: "Laboratorium Komputer",
    description:
      "Fasilitas komputer modern dengan spesifikasi tinggi untuk menunjang pembelajaran teknologi informasi dan praktikum.",
    image:
      "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Perpustakaan Digital",
    description:
      "Akses ribuan buku dan jurnal internasional secara digital maupun fisik di perpustakaan yang nyaman.",
    image:
      "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Ruang Kelas Multimedia",
    description:
      "Ruang kelas yang dilengkapi dengan proyektor, AC, dan sound system untuk kenyamanan proses belajar mengajar.",
    image:
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Auditorium",
    description:
      "Gedung serbaguna untuk seminar, wisuda, dan kegiatan kemahasiswaan dengan kapasitas besar.",
    image:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?q=80&w=800&auto=format&fit=crop",
  },
];
</script>

<template>
  <div class="py-20 bg-white dark:bg-neutral-900">
    <div class="container mx-auto px-4">
      <div class="flex flex-col md:flex-row items-end justify-between mb-12">
        <div class="max-w-2xl">
          <h2 class="text-3xl font-bold text-gray-900 dark:text-neutral-100 mb-4">
            Sarana & Prasarana
          </h2>
          <p class="text-gray-600 dark:text-neutral-400">
            Fasilitas lengkap untuk menunjang kegiatan akademik dan non-akademik
            mahasiswa.
          </p>
        </div>
        <div class="hidden md:flex space-x-2">
          <!-- Custom Navigation Buttons could go here -->
        </div>
      </div>

      <UCarousel v-slot="{ item }" :items="facilities" :ui="{ item: 'basis-full md:basis-1/2 lg:basis-1/3 p-4' }"
        indicators class="pb-10">
        <div class="group relative overflow-hidden rounded-2xl h-80 cursor-pointer">
          <img :src="item.image" :alt="item.title"
            class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 text-white">
            <h3 class="text-xl font-bold mb-2">{{ item.title }}</h3>
            <p
              class="text-sm text-gray-200 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
              {{ item.description }}
            </p>
          </div>
        </div>
      </UCarousel>
    </div>
  </div>
</template>
