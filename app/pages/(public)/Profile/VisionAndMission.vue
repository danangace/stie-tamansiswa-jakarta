<script setup lang="ts">
definePageMeta({
  title: "Visi dan Misi",
  path: "/profil/visi-misi",
});

const vision = `
Pada tahun 2025, STIE Taman Siswa menjadi Perguruan Tinggi yang mampu menyinergikan Perkembangan Ilmu Akuntansi dan Manajemen dengan perkembangan Teknologi informasi dan mengembangkan jiwa wirausaha berdasarkan prinsip ketamansiswaan
`;

const missions = [
  "Menyelenggarakan kegiatan belajar mengajar secara kreatif dan inovatif dalam rangka menyinergikan perkembangan ilmu Akuntansi dan Manajemen dengan perkembangan teknologi informasi dan mengembangkan jiwa wirausaha berdasarkan prinsip ketamansiswaan",
  "Menyelenggarakan kegiatan penelitian secara kreatif dan inovatif untuk menyinergikan perkembangan ilmu Akuntansi dan Manajemen dengan perkembangan teknologi informasi dan mengembangkan jiwa wirausaha berdasarkan prinsip ketamansiswaan",
  "Menyelenggarakan kegiatan pengabdian masyarakat yang berbasis pada sinerginya perkembangan ilmu Akuntansi dan Manajemen dengan perkembangan teknologi informasi dan mengembangkan jiwa wirausaha berdasarkan prinsip ketamansiswaan",
  "Melakukan kerjasama baik dalam dan luar negeri guna mendukung kegiatan tridharma perguruan tinggi",
];

const coreValues = [
  "Integritas",
  "Kejujuran",
  "Tanggung jawab",
  "Transparansi",
  "Etika profesional",
  "Kepemimpinan",
  {
    title: "Prinsip Ketamansiswaan",
    subtitle: "Ing Ngarso Sung Tulodo, Ing Madya Mangun Karso, Tut Wuri Handayani"
  }
];
</script>

<template>
  <div class="bg-white dark:bg-neutral-900 min-h-screen py-12 md:py-20">
    <div class="container mx-auto px-4 max-w-[1280px]">

      <!-- Header -->
      <div class="text-center mb-16">
        <span class="text-primary-600 dark:text-primary-300 font-semibold tracking-wider uppercase text-sm mb-2 block">
          Landasan Kami
        </span>
        <h1 class="text-3xl md:text-5xl font-bold text-gray-900 dark:text-neutral-100 mb-6">
          Visi, Misi & Nilai Dasar
        </h1>
        <div class="w-24 h-1 bg-primary-500 mx-auto rounded-full"></div>
      </div>

      <div class="max-w-3xl mx-auto space-y-20">

        <!-- Vision -->
        <section class="text-center">
          <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-neutral-100 mb-8">
            Visi
          </h2>

          <div
            class="bg-primary-50 dark:bg-primary-900/20 rounded-3xl p-8 md:p-12 border border-primary-100 dark:border-primary-800/30 shadow-sm relative">
            <p class="text-xl md:text-2xl text-gray-800 dark:text-neutral-200 font-medium leading-relaxed">
              {{ vision }}
            </p>
          </div>
        </section>

        <!-- Mission -->
        <section>
          <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-neutral-100 mb-10 text-center">
            Misi
          </h2>

          <div class="space-y-5">
            <div v-for="(mission, index) in missions" :key="index"
              class="flex items-center cursor-pointer gap-4 p-5 rounded-xl border border-gray-100 dark:border-neutral-700 hover:shadow-md dark:hover:shadow-neutral-800/50 transition-all duration-300">
              <div
                class="flex-shrink-0 w-7 h-7 bg-primary-100 dark:bg-primary-800/30 text-primary-600 dark:text-primary-300 rounded-full flex items-center justify-center font-bold">
                {{ index + 1 }}
              </div>
              <p class="text-gray-600 dark:text-neutral-400 text-lg leading-relaxed">
                {{ mission }}
              </p>
            </div>
          </div>
        </section>

        <!-- Core Values -->
        <section>
          <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-neutral-100 mb-10 text-center">
            Nilai Dasar Institusi
          </h2>

          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div v-for="(value, index) in coreValues" :key="index" :class="[
              'p-4 cursor-pointer rounded-xl bg-gray-50 dark:bg-default border border-gray-100 dark:border-neutral-700 hover:bg-primary-50 dark:hover:bg-primary-900/20 hover:border-primary-200 dark:hover:border-primary-800/30 transition-all duration-300',
              index === coreValues.length - 1 ? 'sm:col-span-2 text-left sm:text-center' : ''
            ]">
              <p class="text-gray-700 dark:text-text-100 font-medium text-lg">
                <template v-if="typeof value === 'string'">
                  {{ value }}
                </template>

                <template v-else>
                  <span class="block">
                    {{ value.title }}
                  </span>
                  <span class="block text-base font-normal text-gray-500 dark:text-text-100 mt-1">
                    ({{ value.subtitle }})
                  </span>
                </template>
              </p>
            </div>
          </div>
        </section>

      </div>
    </div>
  </div>
</template>

<style scoped></style>