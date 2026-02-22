<script setup lang="ts">
definePageMeta({
  title: "Visi dan Misi",
  path: "/profil/visi-misi",
});

const missions = [
  "Menyelenggarakan kegiatan belajar-mengajar secara kreatif dan inovatif dalam rangka menyinergikan perkembangan ilmu Akuntansi dan Manajemen dengan perkembangan teknologi informasi dan mengembangkan jiwa wirausaha berdasarkan prinsip ketamansiswaan.",
  "Menyelenggarakan kegiatan penelitian secara kreatif dan inovatif untuk menyinergikan perkembangan ilmu Akuntansi dan manajemen dengan perkembangan teknologi informasi dan mengembangkan jiwa wirausaha berdasarkan prinsip ketamansiswaan.",
  "Menyelenggarakan kegiatan pengabdian masyarakat yang berbasis pada sinerginya perkembangan ilmu Akuntansi dan Manajemen dengan perkembangan teknologi informasi dan mengembangkan jiwa wirausaha berdasarkan prinsip ketamansiswaan.",
  "Melakukan kerjasama baik dalam dan luar negeri guna mendukung kegiatan tridharma perguruan tinggi."
];
</script>

<template>
  <div class="bg-white min-h-screen py-12 md:py-20">
    <div class="container mx-auto px-4 max-w-[1280px]">
      <!-- Header -->
      <div class="text-center mb-16">
        <span
          class="text-primary-600 font-semibold tracking-wider uppercase text-sm mb-2 block"
          >Landasan Kami</span
        >
        <h1 class="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
          Visi & Misi
        </h1>
        <div class="w-24 h-1 bg-primary-500 mx-auto rounded-full"></div>
      </div>

      <!-- Content Container -->
      <div class="max-w-3xl mx-auto space-y-16">
        <!-- Vision Section -->
        <div class="text-center">
          <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">
            Visi
          </h2>
          <div
            class="bg-primary-50 rounded-3xl p-8 md:p-12 border border-primary-100 shadow-sm relative overflow-hidden"
          >
            <!-- Decorative quote marks -->
            <span
              class="absolute top-4 left-6 text-6xl text-primary-200 font-serif opacity-50"
              >"</span
            >
            <span
              class="absolute bottom-0 right-6 text-6xl text-primary-200 font-serif opacity-50"
              >"</span
            >

            <p
              class="text-xl md:text-2xl text-gray-800 font-medium leading-relaxed relative z-10"
            >
              Pada tahun 2025, STIE Taman Siswa menjadi Perguruan Tinggi yang mampu menyinergikan Perkembangan Ilmu Akuntansi dan Manajemen dengan perkembangan Teknologi Informasi dan mengembangkan jiwa wirausaha berdasarkan prinsip ketamansiswaan.
            </p>
          </div>
        </div>

        <!-- Mission Section -->
        <div>
          <h2 class="text-2xl font-bold text-gray-900 mb-6 text-center">
            Misi
          </h2>
          <div class="space-y-4">
            <div
              v-for="(mission, index) in missions"
              :key="index"
              class="flex gap-4 p-4 rounded-xl hover:bg-gray-50 transition-colors duration-300 group"
            >
              <div
                class="flex-shrink-0 w-10 h-10 bg-white border-2 border-primary-100 text-primary-600 rounded-full flex items-center justify-center font-bold shadow-sm group-hover:border-primary-500 group-hover:bg-primary-500 group-hover:text-white transition-all duration-300"
              >
                {{ index + 1 }}
              </div>
              <p class="text-gray-600 text-lg leading-relaxed pt-1">
                {{ mission }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
