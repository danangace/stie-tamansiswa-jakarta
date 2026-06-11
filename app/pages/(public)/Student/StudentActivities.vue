<script setup lang="ts">
definePageMeta({
  title: "Kegiatan Kemahasiswaan",
  path: "/kemahasiswaan/kegiatan",
})

const supabase = useSupabasePublic()
const { data: activities } = await useAsyncData('kegiatan-mahasiswa-public', async () => {
  const { data, error } = await supabase
    .from('kegiatan_mahasiswa')
    .select('id, judul, deskripsi, foto_url')
    .order('urutan', { ascending: true })
  if (error) throw error
  return data ?? []
})

const selectedActivity = ref<{ judul: string; deskripsi: string | null; foto_url: string | null } | null>(null)
const isOpen = ref(false)

function openModal(activity: typeof selectedActivity.value) {
  selectedActivity.value = activity
  isOpen.value = true
}
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
            v-for="activity in activities"
            :key="activity.id"
            class="group cursor-pointer"
            @click="openModal(activity)"
          >
            <!-- Foto -->
            <div class="aspect-video rounded-2xl overflow-hidden bg-gray-100 dark:bg-gray-800 mb-4">
              <img
                v-if="activity.foto_url"
                :src="activity.foto_url"
                :alt="activity.judul"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div
                v-else
                class="w-full h-full flex items-center justify-center"
              >
                <UIcon name="i-lucide-image" class="w-12 h-12 text-gray-400" />
              </div>
            </div>

            <!-- Info -->
            <h2 class="font-bold text-gray-900 dark:text-white text-lg">
              {{ activity.judul }}
            </h2>
            <p v-if="activity.deskripsi" class="text-gray-500 dark:text-gray-400 text-sm mt-1">
              {{ activity.deskripsi }}
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
            v-if="selectedActivity?.foto_url"
            :src="selectedActivity.foto_url"
            :alt="selectedActivity.judul"
            class="w-full rounded-xl object-contain max-h-[80vh]"
          />
          <div class="mt-4 text-center">
            <h2 class="font-bold text-gray-900 dark:text-white text-xl">
              {{ selectedActivity?.judul }}
            </h2>
            <p v-if="selectedActivity?.deskripsi" class="text-gray-500 dark:text-gray-400 text-sm mt-1">
              {{ selectedActivity.deskripsi }}
            </p>
          </div>
        </div>
      </template>
    </UModal>
  </div>
</template>
