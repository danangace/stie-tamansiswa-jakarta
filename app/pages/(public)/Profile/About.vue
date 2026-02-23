<script setup lang="ts">
definePageMeta({
  layout: "default",
  path: "/profil/tentang",
  title: "Tentang STIE Taman Siswa Jakarta",
});

const history = `
Sekolah Tinggi Ilmu Ekonomi Taman Siswa Jakarta didirikan pada tanggal 4 September 1993 di Jakarta dengan izin operasional dari pemerintah oleh Yayasan Perguruan Tamansiswa Cabang Jakarta. Tanggal tersebut sekaligus ditetapkan sebagai Dies Natalis STIE Taman Siswa Jakarta.

Sebagai bagian dari sistem pendidikan nasional yang berdasarkan Pancasila dan Undang-Undang Dasar 1945, STIE Taman Siswa Jakarta bertujuan menyiapkan peserta didik menjadi anggota masyarakat yang memiliki kemampuan, kecakapan, dan keterampilan dalam mengembangkan ilmu pengetahuan dan teknologi, serta mengupayakan penggunaannya bagi masyarakat, bangsa, dan negara sesuai dengan Undang-Undang No. 20 Tahun 2003 tentang Sistem Pendidikan Nasional dan Undang-Undang No. 12 Tahun 2012 tentang Pendidikan Tinggi.

STIE Taman Siswa Jakarta bernaung di bawah Yayasan Persatuan Perguruan Tamansiswa Yogyakarta dan merupakan bagian dari masyarakat ilmiah yang bersifat universal dengan mengedepankan ajaran Ki Hadjar Dewantara: Ing Ngarso Sung Tulodo, Ing Madya Mangun Karso, dan Tut Wuri Handayani.

Dalam menyongsong era globalisasi dan transformasi digital, STIE Taman Siswa Jakarta terus berkomitmen mengembangkan sumber daya manusia yang berkualitas, berintegritas, serta mampu berdaya saing nasional. Sejak berdiri pada tahun 1993, STIE Taman Siswa Jakarta telah menghasilkan lulusan yang tersebar di berbagai sektor pemerintahan, swasta, dan wirausaha.
`;

const accreditations = [
  "Izin Operasional Kopertis Wilayah III DKI Jakarta (4 September 1993).",
  "Surat DIKTI Nomor 161/D/O/1995 tentang Status Terdaftar.",
  "BAN-PT Nomor 019/BAN-PT/Ak-IV/VIII/2000 (10 Agustus 2000) Status Terakreditasi.",
  "Perpanjangan Operasional DIKTI Nomor 71/D/T/K-III/2009.",
  "Perpanjangan Izin Prodi Manajemen (Kopertis Wilayah III No. 2234/D/T/K-III/2009).",
  "Perpanjangan Izin Prodi Akuntansi (Kopertis Wilayah III No. 305/D/T/K-III/2009).",
  "BAN-PT Nomor 032/BAN-PT/Ak-XV/S1/X/2012 (18 Oktober 2012).",
  "SK BAN-PT Nomor 16/SK/BAN-PT/Akred/S/I/2018 (3 Januari 2018) – Akreditasi Prodi Akuntansi.",
  "SK BAN-PT Nomor 409/SK/BAN-PT/Akred/S/II/2018 (6 Februari 2018) – Akreditasi Prodi Manajemen.",
  "Akreditasi Program Studi Tahun 2024.",
  "Akreditasi Program Studi Tahun 2025.",
  "Akreditasi Sementara Institusi Tahun 2026."
];
</script>

<template>
  <div class="bg-white dark:bg-neutral-900 min-h-screen py-12 md:py-20">
    <div class="container mx-auto px-4 max-w-[1280px]">

      <!-- Header -->
      <div class="text-center mb-16">
        <span class="text-primary-600 dark:text-primary-300 font-semibold tracking-wider uppercase text-sm mb-2 block">
          Profil Kampus
        </span>
        <h1 class="text-3xl md:text-5xl font-bold text-gray-900 dark:text-neutral-100 mb-6">
          Mengenal Lebih Dekat <br class="hidden md:block" />
          STIE Taman Siswa Jakarta
        </h1>
        <p class="text-lg md:text-xl text-gray-500 dark:text-neutral-400 max-w-2xl mx-auto leading-relaxed">
          Perguruan tinggi ekonomi berbasis nilai Ketamansiswaan yang unggul dan berdaya saing nasional.
        </p>
      </div>

      <div class="max-w-3xl mx-auto">

        <!-- Hero Image -->
        <div class="mb-12 rounded-2xl overflow-hidden shadow-xl aspect-video relative group">
          <NuxtImg src="/img/sejarah.png" alt="Gedung Kampus STIE Taman Siswa Jakarta"
            class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
            width="1200" height="800" sizes="(max-width: 768px) 100vw, 1200px" format="webp" loading="lazy" />
          <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-60"></div>
        </div>

        <!-- History -->
        <section class="prose prose-lg prose-gray dark:prose-invert max-w-none mb-16">
          <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-neutral-100 mb-6">
            Sejarah Singkat
          </h2>
          <div class="text-gray-600 dark:text-neutral-400 leading-loose space-y-6 text-justify">
            <p v-for="(paragraph, index) in history.split('\n\n')" :key="index">
              {{ paragraph }}
            </p>
          </div>
        </section>

        <!-- Accreditation -->
        <section class="mb-20">
          <h2 class="text-2xl md:text-3xl font-bold text-gray-900 dark:text-neutral-100 mb-8 text-center">
            Legalitas & Akreditasi
          </h2>

          <div class="space-y-4">
            <div v-for="(item, index) in accreditations" :key="index"
              class="flex items-center gap-4 p-4 rounded-xl border border-gray-100 dark:border-neutral-700 hover:shadow-md dark:hover:shadow-neutral-800/50 transition">
              <div
                class="w-8 h-8 flex items-center justify-center rounded-full bg-primary-100 dark:bg-primary-800/30 text-primary-600 dark:text-primary-300 font-bold">
                {{ index + 1 }}
              </div>
              <p class="text-gray-600 dark:text-neutral-400 leading-relaxed">
                {{ item }}
              </p>
            </div>
          </div>
        </section>

        <!-- Rector Section -->
        <div
          class="bg-[#F9FAFC] dark:bg-[#2498D3] rounded-3xl p-8 md:p-10 border border-gray-100 dark:border-neutral-700 shadow-sm">
          <div class="flex flex-col md:flex-row items-center gap-8 md:gap-10">

            <div class="relative flex-shrink-0">
              <div
                class="w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-white dark:border-neutral-700 shadow-lg">
                <img src="/img/sejarah/denis-kristianto.jpeg" alt="Ketua STIE Taman Siswa Jakarta"
                  class="w-full h-full object-cover" />
              </div>
            </div>

            <div class="text-center md:text-left flex-1">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-neutral-100 mb-1">
                Denis Kristianto, S.E., M.M.
              </h3>
              <p class="text-primary-600 dark:text-neutral-100 font-medium uppercase tracking-wide text-sm mb-4">
                Ketua STIE Taman Siswa Jakarta
              </p>

              <blockquote class="text-gray-600 dark:text-neutral-400 italic leading-relaxed text-center md:text-left">
                "Kami bertekad untuk terus berinovasi dan memberikan layanan pendidikan terbaik bagi putra-putri bangsa.
                Mari bergabung bersama kami untuk masa depan yang gemilang."
              </blockquote>
            </div>

          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<style scoped></style>