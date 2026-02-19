<script setup lang="ts">
definePageMeta({
  title: "Akreditasi",
  path: "/profil/akreditasi",
});

const pageImage = "/img/akreditasi.jpeg";
</script>

<template>
  <div class="bg-white min-h-screen py-12 md:py-20">
    <div class="container mx-auto px-4 max-w-6xl">
      
      <div class="text-center mb-12">
        <span
          class="text-primary-600 font-semibold tracking-wider uppercase text-sm mb-2 block"
        >
          Tata Kelola
        </span>

        <h1 class="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
          Akreditasi
        </h1>

        <p class="text-gray-500 max-w-2xl mx-auto">
          Status dan pencapaian akreditasi STIE Tamansiswa Jakarta sebagai
          bentuk komitmen terhadap mutu pendidikan tinggi.
        </p>
      </div>

      <div class="w-full">
        <img
          :src="pageImage"
          alt="Akreditasi STIE Tamansiswa Jakarta"
          class="w-full h-auto object-contain rounded-2xl shadow-lg"
        />
      </div>

    </div>
  </div>
</template>