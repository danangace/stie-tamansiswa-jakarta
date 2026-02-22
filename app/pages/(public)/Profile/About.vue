<script setup lang="ts">
definePageMeta({
  layout: "default",
  path: "/profil/tentang",
});

const history = `
STIE Taman Siswa Jakarta merupakan bagian dari keluarga besar Perguruan Tamansiswa yang berlandaskan ajaran Ki Hadjar Dewantara. Semangat pendidikan yang diusung menempatkan pembentukan karakter, kemandirian, dan jiwa kebangsaan sebagai fondasi utama dalam proses pembelajaran.

Didirikan untuk menjawab kebutuhan pendidikan tinggi di bidang ekonomi, STIE Taman Siswa Jakarta memfokuskan pengembangan keilmuan pada Akuntansi dan Manajemen yang selaras dengan perkembangan dunia usaha dan teknologi informasi. Integrasi antara kompetensi akademik dan nilai-nilai ketamansiswaan menjadi ciri khas institusi ini.

Dalam perjalanannya, STIE Taman Siswa Jakarta terus beradaptasi terhadap dinamika zaman melalui penguatan kurikulum, peningkatan kualitas dosen, serta pengembangan kerja sama institusional. Komitmen tersebut diarahkan untuk mencetak lulusan yang profesional, berintegritas, dan memiliki jiwa kewirausahaan, sejalan dengan prinsip pendidikan yang diwariskan oleh Ki Hadjar Dewantara: Ing Ngarsa Sung Tuladha, Ing Madya Mangun Karsa, dan Tut Wuri Handayani.
`;
</script>

<template>
  <div class="bg-white min-h-screen py-12 md:py-20">
    <div class="container mx-auto px-4 max-w-[1280px]">
      <!-- Header Section -->
      <div class="text-center mb-12 md:mb-16">
        <span
          class="text-primary-600 font-semibold tracking-wider uppercase text-sm mb-2 block"
          >Profil Kampus</span
        >
        <h1
          class="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
        >
          Mengenal Lebih Dekat <br class="hidden md:block" />
          STIE Tamansiswa Jakarta
        </h1>
        <p
          class="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed"
        >
          Lembaga pendidikan tinggi yang mengedepankan integritas, keunggulan
          akademik, dan nilai-nilai luhur Taman Siswa.
        </p>
      </div>

      <!-- Main Content Area (Medium-style layout) -->
      <div class="max-w-3xl mx-auto">
        <!-- Hero Image -->
        <div
          class="mb-12 rounded-2xl overflow-hidden shadow-xl aspect-video relative group"
        >
          <NuxtImg
            src="/img/sejarah.png"
            alt="Gedung Kampus STIE Tamansiswa"
            class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            width="1200"
            height="800"
            sizes="(max-width: 768px) 100vw, 1200px"
            format="webp"
            loading="lazy"
          />
          <div
            class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"
          ></div>
        </div>

        <!-- History Content -->
        <div class="prose prose-lg prose-gray max-w-none mb-16">
          <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
            Sejarah Singkat
          </h2>
          <div class="text-gray-600 leading-loose space-y-6 text-justify">
            <p v-for="(paragraph, index) in history.split('\n\n')" :key="index">
              {{ paragraph }}
            </p>
          </div>
        </div>

        <!-- Divider -->
        <div class="w-full h-px bg-gray-200 my-12"></div>

        <!-- Rector Profile Section -->
        <div
          class="bg-gray-50 rounded-3xl p-8 md:p-10 border border-gray-100 shadow-sm"
        >
          <div class="flex flex-col md:flex-row items-center gap-8 md:gap-10">
            <!-- Rector Photo -->
            <div class="relative group flex-shrink-0">
              <div
                class="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white shadow-lg relative z-10"
              >
                <img
                  src="/img/sejarah/denis-kristianto.jpeg"
                  alt="Foto Ketua STIE"
                  class="w-full h-full object-cover"
                />
              </div>
              <!-- Decorative elements -->
              <div
                class="absolute -top-2 -right-2 w-12 h-12 bg-primary-100 rounded-full -z-0"
              ></div>
              <div
                class="absolute -bottom-2 -left-2 w-16 h-16 bg-primary-50 rounded-full -z-0"
              ></div>
            </div>

            <!-- Rector Message -->
            <div class="text-center md:text-left flex-1">
              <div class="mb-4">
                <h3 class="text-2xl font-bold text-gray-900 mb-1">
                  Denis Kristianto, S.E., M.M.
                </h3>
                <p
                  class="text-primary-600 font-medium uppercase tracking-wide text-sm"
                >
                  Ketua STIE Taman Siswa Jakarta
                </p>
              </div>

              <blockquote class="text-gray-600 italic leading-relaxed relative text-center">
                <span class="text-4xl text-gray-200 absolute -top-4 -left-2">"</span>
                Kami bertekad untuk terus berinovasi dan memberikan layanan pendidikan terbaik bagi putra-putri bangsa. Mari bergabung bersama kami untuk masa depan yang gemilang.
                <span class="text-4xl text-gray-200 absolute -bottom-8 -right-2">"</span>
              </blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom typography adjustments if needed */
</style>

<style scoped></style>
