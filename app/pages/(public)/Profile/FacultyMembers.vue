<script setup lang="ts">
definePageMeta({
  title: "Staff Pengajar",
  path: "/profil/staff-pengajar",
})

const supabase = useSupabasePublic()
const { data: facultyMembers } = await useAsyncData('tenaga-pendidik-public', async () => {
  const { data, error } = await supabase
    .from('tenaga_pendidik')
    .select('id, nama, jabatan, foto_url')
    .order('urutan', { ascending: true })
  if (error) throw error
  return data ?? []
})
</script>

<template>
  <div class="bg-white dark:bg-neutral-900 min-h-screen py-12 md:py-20">
    <div class="container mx-auto px-4 max-w-6xl">
      <!-- Header -->
      <div class="text-center mb-16">
        <span class="text-primary-600 dark:text-primary-300 font-semibold tracking-wider uppercase text-sm mb-2 block">
          Sivitas Akademika
        </span>
        <h1 class="text-3xl md:text-5xl font-bold text-gray-900 dark:text-neutral-100 mb-6">
          Pimpinan dan Tenaga Pengajar
        </h1>
        <p class="text-gray-500 dark:text-neutral-400 max-w-2xl mx-auto">
          Profil pimpinan, dosen, dan tenaga kependidikan STIE Tamansiswa Jakarta yang berkomitmen dalam mendukung
          kualitas pendidikan dan pengembangan akademik.
        </p>
      </div>

      <!-- Staff Grid -->
      <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        <div v-for="member in facultyMembers" :key="member.id" class="group cursor-pointer">
          <!-- Photo -->
          <div class="aspect-3/4 rounded-2xl overflow-hidden mb-4 bg-gray-100 dark:bg-neutral-800">
            <img
              v-if="member.foto_url"
              :src="member.foto_url"
              :alt="member.nama"
              class="w-full h-full object-cover transition-all duration-500"
            />
            <div
              v-else
              class="w-full h-full flex items-center justify-center"
            >
              <UIcon name="i-lucide-user" class="w-12 h-12 text-neutral-400" />
            </div>
          </div>
          <!-- Info -->
          <div class="text-center">
            <h3 class="font-bold text-gray-900 dark:text-neutral-100 mb-1">{{ member.nama }}</h3>
            <p class="text-gray-500 dark:text-neutral-400 text-sm">{{ member.jabatan }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
