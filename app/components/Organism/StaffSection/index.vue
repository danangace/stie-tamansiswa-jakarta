<script setup lang="ts">
const staff = [
  {
    name: "Denis Kristianto, S.E., M.M.",
    position: "Ketua STIE Taman Siswa Jakarta",
    image: "/img/staff/ketua-stie.png",
    greeting:
      "Kita tidak mencetak pengikut; kita menempa pemimpin yang berani berdiri demi kebenaran",
  },
  {
    name: "Joko Suyono, S.Pd., M.Pd.",
    position: "Wakil Ketua I Bid. Akademik",
    image: "/img/staff/wk-i-stie.png",
    greeting: "Mari Lakukan yang terbaik selagi ada kesempatan, mulai dari diri sendiri dan mulai dari sekarang",
  },
  {
    name: "Tamim Ma’ruf, S.Ag., M.M.",
    position: "Wakil Ketua II Bid. Administrasi dan Umum",
    image: "/img/staff/wk-ii-stie.png",
    greeting:
      "Belajar memahami kehidupan untuk mensyukuri keadaan",
  },
  {
    name: "Ir. Tukirin, M.M.",
    position: "Ketua Program Studi Manajemen",
    image: "/img/staff/kaprog-manajemen.png",
    greeting:
      "Perbaikan Terus-Menerus untuk Kemajuan Bersama",
  },
  {
    name: "Ika Baskara, S.E., M.M.",
    position: "Ketua Program Studi Akuntansi",
    image: "/img/staff/kaprog-akuntansi.png",
    greeting: "Akuntansi yang Profesional, Beretika, dan Berdampak untuk Kemajuan Bangsa dan Masyarakat",
  },
];
</script>

<template>
  <div class="py-24 bg-gradient-to-b from-gray-50 to-white">
    <div class="container mx-auto px-4">
      
      <!-- Header -->
      <div class="text-center mb-14">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Tenaga Ahli & Pimpinan
        </h2>
        <p class="text-gray-600 max-w-2xl mx-auto text-lg">
          Berkenalan dengan para pimpinan yang mendedikasikan diri untuk
          kemajuan pendidikan di STIE Tamansiswa Jakarta.
        </p>
      </div>

      <!-- Carousel -->
      <UCarousel
        v-slot="{ item }"
        :items="staff"
        :ui="{
          item: 'basis-full md:basis-1/2 lg:basis-1/3 p-4 flex'
        }"
        indicators
        arrows
        loop
        :autoplay="{ delay: 3500 }"
        class="items-stretch"
      >
        <!-- Card -->
        <div
          class="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col group"
        >
          <!-- Image -->
          <div class="relative h-72 overflow-hidden">
            <img
              :src="item.image"
              :alt="item.name"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>

          <!-- Content -->
          <div class="p-6 flex flex-col flex-1">

            <!-- Name -->
            <h3 class="text-lg md:text-xl font-semibold text-gray-900">
              {{ item.name }}
            </h3>

            <!-- Position -->
            <p
              class="text-primary-600 font-medium mt-1 
                     line-clamp-2 min-h-[3rem]"
            >
              {{ item.position }}
            </p>

            <!-- Divider -->
            <div class="h-px bg-gray-200 my-4"></div>

            <!-- Greeting -->
            <div
              class="flex items-center justify-center 
                    min-h-[4.5rem] mt-auto text-center"
            >
              <p
                v-if="item.greeting"
                class="text-gray-600 text-sm italic line-clamp-3"
              >
                "{{ item.greeting }}"
              </p>
            </div>
          </div>
        </div>
      </UCarousel>
    </div>
  </div>
</template>