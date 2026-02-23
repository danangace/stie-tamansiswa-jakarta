<script setup lang="ts">
definePageMeta({
  title: "Kegiatan Kemahasiswaan",
  path: "/kemahasiswaan/kegiatan",
});

const selectedActivity = ref<{ title: string; subtitle: string; image: string } | null>(null)
const isOpen = ref(false)

function openModal(activity: { title: string; subtitle: string; image: string }) {
  selectedActivity.value = activity
  isOpen.value = true
}

const activities = [
  {
    title: "PKKMB",
    subtitle: "Program Pengenalan Kehidupan Kampus • STIE Tamansiswa Jakarta",
    image: "/img/kegiatan-kemahasiswaan/PKKMB-STIETamanSiswaJakarta.jpeg",
  },
  {
    title: "Unit Kegiatan Mahasiswa",
    subtitle: "STIE Tamansiswa Jakarta",
    image: "/img/kegiatan-kemahasiswaan/UnitKegiatanMahasiswa-STIETamanSiswaJakarta.jpeg",
  },
  {
    title: "Sosialisasi",
    subtitle: "STIE Tamansiswa Jakarta",
    image: "/img/kegiatan-kemahasiswaan/Sosialisasi-STIETamanSiswaJakarta.jpeg",
  },
  {
    title: "Pelantikan Senat",
    subtitle: "STIE Tamansiswa Jakarta",
    image: "/img/kegiatan-kemahasiswaan/PelantikanSenat-STIETamanSiswaJakarta.jpeg",
  },
  {
    title: "Zakat",
    subtitle: "STIE Tamansiswa Jakarta",
    image: "/img/kegiatan-kemahasiswaan/Zakat-STIETamanSiswaJakarta.jpeg",
  },
  {
    title: "DIES Natalis 30 Tahun",
    subtitle: "STIE Tamansiswa Jakarta",
    image: "/img/kegiatan-kemahasiswaan/DIESNatalies30Tahun-STIETamanSiswaJakarta.jpeg",
  },
  {
    title: "Buka Bersama",
    subtitle: "STIE Tamansiswa Jakarta",
    image: "/img/kegiatan-kemahasiswaan/BukaBersama-STIETamanSiswaJakarta.jpeg",
  },
  {
    title: "Jalan Santai",
    subtitle: "STIE Tamansiswa Jakarta",
    image: "/img/kegiatan-kemahasiswaan/JalanSantai-STIETamanSiswaJakarta.jpeg",
  },
  {
    title: "Hari Batik Nasional",
    subtitle: "STIE Tamansiswa Jakarta",
    image: "/img/kegiatan-kemahasiswaan/HariBatikNasional-STIETamanSiswaJakarta.jpeg",
  },
  {
    title: "17 Agustus",
    subtitle: "STIE Tamansiswa Jakarta",
    image: "/img/kegiatan-kemahasiswaan/17Agustus-STIETamanSiswaJakarta.jpeg",
  },
  {
    title: "Malam Keakraban",
    subtitle: "STIE Tamansiswa Jakarta",
    image: "/img/kegiatan-kemahasiswaan/MalamKeakraban-STIETamanSiswaJakarta.jpeg",
  },
]
</script>

<template>
  <div>
    <div class="bg-white dark:bg-gray-900 min-h-screen py-12 md:py-20">
      <div class="container mx-auto px-4 max-w-6xl">

        <!-- Header -->
        <div class="text-center mb-16">
          <span class="text-primary-600 font-semibold tracking-wider uppercase text-sm mb-2 block">
            Kemahasiswaan
          </span>
          <h1 class="text-3xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Kegiatan Mahasiswa
          </h1>
          <p class="text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
            Dokumentasi berbagai kegiatan dan program kemahasiswaan STIE Tamansiswa Jakarta.
          </p>
        </div>

        <!-- Grid Kegiatan -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="(activity, index) in activities"
            :key="index"
            class="group cursor-pointer"
            @click="openModal(activity)"
          >
            <!-- Foto -->
            <div class="aspect-video rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 mb-4">
                <img
                :src="activity.image"
                :alt="activity.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            <!-- Info -->
            <h2 class="font-bold text-gray-900 dark:text-white text-lg">
              {{ activity.title }}
            </h2>
            <p class="text-gray-500 dark:text-gray-400 text-sm mt-1">
              {{ activity.subtitle }}
            </p>
          </div>
        </div>

      </div>
    </div>

    <!-- Modal -->
    <UModal v-model:open="isOpen">
      <template #content>
        <div class="p-4">
          <img
            :src="selectedActivity?.image"
            :alt="selectedActivity?.title"
            class="w-full rounded-xl object-contain max-h-[80vh]"
          />
          <div class="mt-4 text-center">
            <h2 class="font-bold text-gray-900 dark:text-white text-xl">
              {{ selectedActivity?.title }}
            </h2>
            <p class="text-gray-500 dark:text-gray-400 text-sm mt-1">
              {{ selectedActivity?.subtitle }}
            </p>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>