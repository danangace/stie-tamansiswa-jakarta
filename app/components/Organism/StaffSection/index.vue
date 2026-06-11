<script setup lang="ts">
const supabase = useSupabasePublic()

const { data: staff, status } = await useAsyncData('tenaga-ahli-public', async () => {
  const { data, error } = await supabase
    .from('tenaga_ahli')
    .select('id, nama, jabatan, foto_url, quotes')
    .order('urutan', { ascending: true })
  if (error) throw error
  return data ?? []
})
</script>

<template>
  <div class="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-neutral-900 dark:to-neutral-800">
    <div class="container mx-auto px-4">

      <!-- Header -->
      <div class="text-center mb-14">
        <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-neutral-100 mb-4">
          Tenaga Ahli & Pimpinan
        </h2>
        <p class="text-gray-600 dark:text-neutral-400 max-w-2xl mx-auto text-lg">
          Berkenalan dengan para pimpinan yang mendedikasikan diri untuk
          kemajuan pendidikan di STIE Tamansiswa Jakarta.
        </p>
      </div>

      <!-- Loading -->
      <div v-if="status === 'pending'" class="flex justify-center py-12">
        <UIcon name="i-lucide-loader-circle" class="w-8 h-8 animate-spin text-primary-500" />
      </div>

      <!-- Carousel -->
      <UCarousel
        v-else-if="staff && staff.length"
        v-slot="{ item }"
        :items="staff"
        :ui="{ item: 'basis-full md:basis-1/2 lg:basis-1/3 p-4 flex' }"
        indicators
        arrows
        loop
        :autoplay="{ delay: 3500 }"
        class="items-stretch"
      >
        <!-- Card -->
        <div
          class="bg-white dark:bg-[#2498D3] rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-full flex flex-col group"
        >
          <!-- Image -->
          <div class="relative h-72 overflow-hidden">
            <img
              :src="item.foto_url ?? '/img/staff/placeholder.png'"
              :alt="item.nama"
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          </div>

          <!-- Content -->
          <div class="p-6 flex flex-col flex-1">
            <!-- Name -->
            <h3 class="text-lg md:text-xl font-semibold text-gray-900 dark:text-neutral-100">
              {{ item.nama }}
            </h3>

            <!-- Position -->
            <p class="text-primary-600 dark:text-neutral-100 font-medium mt-1 line-clamp-2 min-h-[3rem]">
              {{ item.jabatan }}
            </p>

            <!-- Divider -->
            <div class="h-px bg-gray-200 dark:bg-neutral-700 my-4" />

            <!-- Quotes -->
            <div class="flex items-center justify-center min-h-[4.5rem] mt-auto text-center">
              <p v-if="item.quotes" class="text-gray-600 dark:text-neutral-400 text-sm italic line-clamp-3">
                "{{ item.quotes }}"
              </p>
            </div>
          </div>
        </div>
      </UCarousel>
    </div>
  </div>
</template>
