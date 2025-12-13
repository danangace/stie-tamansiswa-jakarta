<script setup lang="ts">
const staff = [
  {
    name: "Dr. Nama Rektor, M.M.",
    position: "Rektor",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop",
    greeting:
      "Selamat datang di STIE Tamansiswa Jakarta. Kami berkomitmen mencetak lulusan berkualitas.",
  },
  {
    name: "Dr. Nama Wakil Rektor, M.Si.",
    position: "Wakil Rektor I",
    image:
      "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?q=80&w=800&auto=format&fit=crop",
    greeting:
      "Pendidikan adalah kunci kemajuan bangsa. Mari berinovasi bersama kami.",
  },
  {
    name: "Nama Dekan, S.E., M.Ak.",
    position: "Dekan Fakultas Ekonomi",
    image:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop",
    greeting:
      "Fakultas Ekonomi siap mengantarkan anda menjadi profesional yang handal.",
  },
];
</script>

<template>
  <div class="py-20 bg-gray-50">
    <div class="container mx-auto px-4">
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 mb-4">
          Tenaga Ahli & Pimpinan
        </h2>
        <p class="text-gray-600 max-w-2xl mx-auto">
          Berkenalan dengan para pimpinan yang mendedikasikan diri untuk
          kemajuan pendidikan di STIE Tamansiswa Jakarta.
        </p>
      </div>

      <UCarousel
        v-slot="{ item }"
        :items="staff"
        :ui="{ item: 'basis-full md:basis-1/2 lg:basis-1/3 p-4' }"
        indicators
        class="pb-10"
      >
        <div
          class="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden h-full flex flex-col"
        >
          <div class="h-64 overflow-hidden">
            <img
              :src="item.image"
              :alt="item.name"
              class="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
            />
          </div>
          <div class="p-6 flex-1 flex flex-col">
            <h3 class="text-xl font-bold text-gray-900">{{ item.name }}</h3>
            <p class="text-primary-600 font-medium mb-4">{{ item.position }}</p>
            <p class="text-gray-600 text-sm italic flex-1">
              "{{ item.greeting }}"
            </p>
          </div>
        </div>
      </UCarousel>
    </div>
  </div>
</template>
