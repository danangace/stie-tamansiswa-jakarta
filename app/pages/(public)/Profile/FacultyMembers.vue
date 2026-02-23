<script setup lang="ts">
definePageMeta({
  title: "Staff Pengajar",
  path: "/profil/staff-pengajar",
});

const facultyMembers = [
  {
    name: "Denis Kristianto, S.E., M.M.",
    position: "Ketua STIE Taman Siswa Jakarta",
    image: "/img/faculty-members/denis-kristianto.png",
  },
  {
    name: "Joko Suyono, S.Pd., M.Pd",
    position: "Wakil Ketua I - Bid. Akademik",
    image: "/img/faculty-members/joko-suyono.png",
  },
  {
    name: "Tamim Ma'ruf, S.Ag., M.M.",
    position: "Wakil Ketua II - Bid. Administrasi dan Umum",
    image: "/img/faculty-members/tamim-maruf.png",
  },
  {
    name: "Ir. Tukirin, M.M.",
    position: "Ketua Program Studi Manajemen",
    image: "/img/faculty-members/tukirin.png",
  },
  {
    name: "Ika Baskara, S.E., M.M.",
    position: "Ketua Program Studi Akuntansi",
    image: "/img/faculty-members/ika-baskara.png",
  },
  {
    name: "Gunadi, S.T., M.M.",
    position: "Ketua Bidang Kemahasiswaan",
    image: "/img/faculty-members/gunadi.png",
  },
  {
    name: "Rita Amelia, SE,MM,Ak,CA,CSFA",
    position: "Ketua Penjaminan Mutu",
    image: "/img/faculty-members/rita-amelia.png",
  },
  {
    name: "Esti Setiati, S.E., M.Ak.",
    position: "Kepala Internal Auditor",
    image: "/img/faculty-members/esti-setiati.png",
  },
  {
    name: "Laela Rahmawati, S. Ak., M.Ak.",
    position: "Kepala LPPM",
    image: "/img/faculty-members/laela-rahmawati.png",
  },
  {
    name: "Endang Dwi Lestari, M.Pd",
    position: "Dosen Manajemen",
    image: "/img/faculty-members/endang-dwi-lestari.png",
  },
  {
    name: "Ir. Yodi Orbawan",
    position: "Dosen Manajemen",
    image: "/img/faculty-members/yodi-orbawan.png",
  },
  {
    name: "Nurul Fahmi F, S.Pd., M.M.",
    position: "Dosen Manajemen dan Akuntansi",
    image: "/img/faculty-members/nurul-fahmi.png",
  },
  {
    name: "Sonny Tri Aresta April, S.E., M.M.",
    position: "Dosen Manajemen",
    image: "/img/faculty-members/sonny-tri-aresta-april.png",
  },
  {
    name: "Harseno, S.Pd., Gr.",
    position: "Kepala Bagian Administrasi Umum dan Keuangan",
    image: "/img/faculty-members/harseno.png",
  },
  {
    name: "Dwi Respati Mardani, S.M.",
    position: "Kepala Bagian Administrasi Akademik dan Admin Pusat Komputer",
    image: "/img/faculty-members/dwi-respati-mardani.png",
  },
  {
    name: "Nur Almira Shinta Putri, A.Md.A.B.",
    position: "Tata Usaha Administrasi Akademik dan Kemahasiswaan",
    image: "/img/faculty-members/nur-almira-shinta-putri.png",
  },
  {
    name: "Dadang Riski Marki, S.E.",
    position: "Tata Usaha Administrasi Kemahasiswaan, Alumni, dan Perpustakaan",
    image: "/img/faculty-members/dadang-riski-marki.png",
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
          Sivitas Akademika
        </span>
        <h1 class="text-3xl md:text-5xl font-bold text-gray-900 mb-6">
          Pimpinan dan Tenaga Pengajar
        </h1>
        <p class="text-gray-500 max-w-2xl mx-auto">
          Profil pimpinan, dosen, dan tenaga kependidikan STIE Tamansiswa Jakarta yang berkomitmen dalam mendukung kualitas pendidikan dan pengembangan akademik.
        </p>
      </div>

      <!-- Staff Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div
          v-for="(member, index) in facultyMembers"
          :key="index"
          class="group cursor-pointer"
        >
          <!-- Photo -->
          <div
            class="aspect-3/4 rounded-2xl overflow-hidden mb-4 bg-gray-100"
          >
            <img
            :src="member.image"
            :alt="member.name"
            class="w-full h-full object-cover transition-all duration-500"
            />
          </div>
          <!-- Info -->
          <div class="text-center">
            <h3 class="font-bold text-gray-900 mb-1">{{ member.name }}</h3>
            <p class="text-gray-500 text-sm">{{ member.position }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
