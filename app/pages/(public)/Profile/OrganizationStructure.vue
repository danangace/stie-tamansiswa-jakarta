<script setup lang="ts">
definePageMeta({
  title: "Struktur Organisasi",
  path: "/profil/struktur-organisasi",
});

const organizationImage = "/img/struktur-organisasi.jpg";

</script>

<template>
  <div class="bg-white dark:bg-neutral-900 min-h-screen py-12 md:py-20">
    <div class="container mx-auto px-4 max-w-6xl">

      <!-- Header -->
      <div class="text-center mb-12">
        <span class="text-primary-600 dark:text-primary-300 font-semibold tracking-wider uppercase text-sm mb-2 block">
          Tata Kelola
        </span>

        <h1 class="text-3xl md:text-5xl font-bold text-gray-900 dark:text-neutral-100 mb-6">
          Struktur Organisasi
        </h1>

        <p class="text-gray-500 dark:text-neutral-400 max-w-2xl mx-auto">
          Struktur kepemimpinan dan tata kelola STIE Tamansiswa Jakarta dalam
          menjalankan visi dan misi perguruan tinggi.
        </p>
      </div>

      <!-- Full Image -->
      <div class="w-full">
        <NuxtImg :src="organizationImage" alt="Struktur Organisasi STIE Tamansiswa Jakarta" format="webp" quality="75"
          sizes="sm:100vw md:100vw lg:1200px" class="w-full h-auto object-contain rounded-2xl shadow-lg" />
      </div>

    </div>
  </div>
</template>