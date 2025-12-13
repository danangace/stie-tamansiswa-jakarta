<script setup lang="ts">
definePageMeta({
  title: "Struktur Organisasi",
  path: "/profil/struktur-organisasi",
});

const allStaff = [
  {
    name: "Ki H. Soedjono",
    position: "Ketua Yayasan",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop&crop=face",
  },
  {
    name: "Dr. H. Marzuki, M.M.",
    position: "Ketua STIE",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=500&fit=crop&crop=face",
  },
  {
    name: "Prof. Dr. H. Soemitro",
    position: "Ketua Senat Akademik",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop&crop=face",
  },
  {
    name: "Dr. Siti Aminah, M.Si.",
    position: "Wakil Ketua I Bidang Akademik",
    image:
      "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=400&h=500&fit=crop&crop=face",
  },
  {
    name: "H. Budi Santoso, S.E., M.Ak.",
    position: "Wakil Ketua II Bidang Keuangan",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=500&fit=crop&crop=face",
  },
  {
    name: "Drs. H. Ahmad Dahlan, M.M.",
    position: "Wakil Ketua III Bidang Kemahasiswaan",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop&crop=face",
  },
  {
    name: "Dr. Susanto",
    position: "Kaprodi Manajemen",
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=500&fit=crop&crop=face",
  },
  {
    name: "Siti Rahma, M.Ak.",
    position: "Kaprodi Akuntansi",
    image:
      "https://images.unsplash.com/photo-1594744803329-e58b31de8bf5?w=400&h=500&fit=crop&crop=face",
  },
  {
    name: "Dr. Rina Wati",
    position: "Kepala LPPM",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop&crop=face",
  },
  {
    name: "Drs. Joko Widodo",
    position: "Kepala LPM",
    image:
      "https://images.unsplash.com/photo-1548372290-8d01b6c8e78c?w=400&h=500&fit=crop&crop=face",
  },
  {
    name: "Andi Pratama, S.Kom.",
    position: "Kepala Bagian IT",
    image:
      "https://images.unsplash.com/photo-1463453091185-61582044d556?w=400&h=500&fit=crop&crop=face",
  },
  {
    name: "Sri Wahyuni, S.E.",
    position: "Kepala Bagian Keuangan",
    image:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=500&fit=crop&crop=face",
  },
];
</script>

<template>
  <div class="bg-white min-h-screen py-12 md:py-20">
    <div class="container mx-auto px-4 max-w-6xl">
      <!-- Header -->
      <div class="text-center mb-16">
        <span
          class="text-primary-600 font-semibold tracking-wider uppercase text-sm mb-2 block"
        >
          Tata Kelola
        </span>
        <h1 class="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
          Struktur Organisasi
        </h1>
        <p class="text-gray-500 max-w-2xl mx-auto">
          Struktur kepemimpinan dan tata kelola STIE Tamansiswa Jakarta dalam
          menjalankan visi dan misi perguruan tinggi.
        </p>
      </div>

      <!-- Staff Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="(person, index) in allStaff"
          :key="index"
          class="group cursor-pointer"
        >
          <!-- Photo -->
          <div
            class="aspect-[3/4] rounded-2xl overflow-hidden mb-4 bg-gray-100"
          >
            <img
              :src="person.image"
              :alt="person.name"
              class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
            />
          </div>
          <!-- Info -->
          <div class="text-center">
            <h3 class="font-bold text-gray-900 mb-1">{{ person.name }}</h3>
            <p class="text-gray-500 text-sm">{{ person.position }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
