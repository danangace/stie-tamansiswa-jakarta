<script setup lang="ts">
definePageMeta({
  layout: "default",
  path: "/profil/tentang",
});

const history = `
STIE Tamansiswa Jakarta didirikan dengan semangat untuk mencerdaskan kehidupan bangsa melalui pendidikan ekonomi yang berkualitas. Berlandaskan ajaran Ki Hadjar Dewantara, kami berkomitmen untuk tidak hanya mencetak sarjana yang kompeten secara akademis, tetapi juga memiliki karakter luhur dan jiwa kebangsaan.

Sejak awal berdirinya, STIE Tamansiswa Jakarta terus berkembang mengikuti dinamika zaman dan kebutuhan industri. Kami telah meluluskan ribuan alumni yang kini berkiprah di berbagai sektor, baik pemerintahan, swasta, maupun wirausaha.

Perjalanan panjang kami diwarnai dengan berbagai pencapaian dan inovasi dalam kurikulum serta metode pembelajaran. Kami percaya bahwa pendidikan adalah kunci utama untuk membangun masa depan yang lebih baik, dan kami bangga menjadi bagian dari perjalanan sukses para mahasiswa kami.
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
          akademik, dan nilai-nilai luhur Tamansiswa.
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

              <blockquote class="text-gray-600 italic leading-relaxed relative">
                <span class="text-4xl text-gray-200 absolute -top-4 -left-2"
                  >"</span
                >
                Kami bertekad untuk terus berinovasi dan memberikan layanan
                pendidikan terbaik bagi putra-putri bangsa. Mari bergabung
                bersama kami untuk masa depan yang gemilang.
                <span class="text-4xl text-gray-200 absolute -bottom-8 -right-2"
                  >"</span
                >
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
