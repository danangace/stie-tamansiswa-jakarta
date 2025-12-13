<script setup lang="ts">
const news = [
  {
    title: "Mahasiswa STIE Tamansiswa Juara 1 Lomba Akuntansi Nasional",
    excerpt:
      "Prestasi membanggakan kembali diraih oleh mahasiswa STIE Tamansiswa Jakarta dalam ajang kompetisi nasional...",
    date: "12 Des 2025",
    author: "Humas",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Seminar Nasional Ekonomi Digital 2025",
    excerpt:
      "Menghadirkan pembicara dari berbagai perusahaan teknologi terkemuka untuk membahas masa depan ekonomi digital.",
    date: "10 Des 2025",
    author: "Panitia",
    image:
      "https://images.unsplash.com/photo-1544531586-fde5298cdd40?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Kunjungan Industri ke PT. Maju Mundur",
    excerpt:
      "Mahasiswa semester akhir melakukan kunjungan industri untuk melihat langsung proses operasional perusahaan.",
    date: "08 Des 2025",
    author: "Prodi Manajemen",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=800&auto=format&fit=crop",
  },
  {
    title: "Penerimaan Mahasiswa Baru Gelombang 1",
    excerpt:
      "Segera daftarkan diri anda untuk menjadi bagian dari keluarga besar STIE Tamansiswa Jakarta.",
    date: "01 Des 2025",
    author: "PMB",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=800&auto=format&fit=crop",
  },
];
</script>

<template>
  <div class="py-20 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900">Berita Terkini</h2>
        <NuxtLink
          to="/berita"
          class="text-primary-600 font-medium hover:text-primary-700"
          >Lihat Semua Berita &rarr;</NuxtLink
        >
      </div>

      <UCarousel
        v-slot="{ item }"
        :items="news"
        :ui="{ item: 'basis-full md:basis-1/2 lg:basis-1/3 p-4' }"
        class="pb-4"
      >
        <div
          class="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col border border-gray-100"
        >
          <div class="h-48 overflow-hidden relative">
            <img
              :src="item.image"
              :alt="item.title"
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
            <div
              class="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-800 shadow-sm"
            >
              {{ item.date }}
            </div>
          </div>
          <div class="p-6 flex-1 flex flex-col">
            <div class="flex items-center text-xs text-gray-500 mb-3 space-x-2">
              <span class="font-medium text-primary-600">{{
                item.author
              }}</span>
              <span>&bull;</span>
              <span>5 min read</span>
            </div>
            <h3
              class="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-primary-600 transition-colors cursor-pointer"
            >
              {{ item.title }}
            </h3>
            <p class="text-gray-600 text-sm line-clamp-3 mb-4 flex-1">
              {{ item.excerpt }}
            </p>
            <div class="mt-auto pt-4 border-t border-gray-100">
              <button
                class="text-sm font-medium text-gray-900 hover:text-primary-600 transition-colors flex items-center"
              >
                Baca Selengkapnya
                <span class="i-heroicons-arrow-right ml-1 w-4 h-4"></span>
              </button>
            </div>
          </div>
        </div>
      </UCarousel>
    </div>
  </div>
</template>
