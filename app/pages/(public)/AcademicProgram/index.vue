<script setup lang="ts">
definePageMeta({
  path: '/program-studi/:slug',
})

const route = useRoute()
const slug = computed(() => route.params.slug as string)

const supabase = useSupabasePublic()
const { data: prodiData } = await useAsyncData(
  () => `program-studi-${slug.value}`,
  async () => {
    const { data, error } = await supabase
      .from('program_studi')
      .select('*')
      .eq('slug', slug.value)
      .single()
    if (error) return null
    return data
  },
  { watch: [slug] },
)

useHead(() => ({
  title: prodiData.value?.nama ?? 'Program Studi',
}))
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">

    <!-- ================= HERO ================= -->
    <section class="relative overflow-hidden bg-primary-600 dark:bg-primary-900 text-white py-20">
      <div class="absolute inset-0 opacity-10 bg-gradient-to-r from-primary-500 to-primary-700"></div>

      <UContainer class="relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <UBadge color="primary" variant="solid" size="lg" class="mb-6">
            {{ prodiData?.departemen }}
          </UBadge>

          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            {{ prodiData?.nama }}
          </h1>

          <p class="text-xl text-primary-100">
            {{ prodiData?.deskripsi }}
          </p>
        </div>
      </UContainer>
    </section>

    <!-- ================= KAPRODI ================= -->
    <section v-if="prodiData?.kaprodi_nama" class="py-20">
      <UContainer>
        <UCard class="overflow-hidden">
          <div class="grid lg:grid-cols-2 gap-12 items-center">

            <!-- Foto -->
            <div>
              <div class="relative overflow-hidden rounded-3xl shadow-2xl">
                <img
                  :src="prodiData.kaprodi_foto_url ?? ''"
                  :alt="prodiData.kaprodi_nama"
                  class="w-full object-cover aspect-[3/4]"
                />
              </div>
            </div>

            <!-- Info -->
            <div class="space-y-6">
              <div>
                <p class="text-sm font-semibold text-primary-600 uppercase mb-2">
                  Kepala Program Studi
                </p>
                <h2 class="text-4xl font-bold text-gray-900 dark:text-white">
                  {{ prodiData.kaprodi_nama }}
                </h2>
                <p class="text-lg text-gray-600 dark:text-gray-400">
                  {{ prodiData.kaprodi_posisi }}
                </p>
              </div>

              <blockquote
                v-if="prodiData.kaprodi_quote"
                class="italic text-lg text-gray-700 dark:text-gray-300 border-l-4 border-primary-500 pl-6"
              >
                "{{ prodiData.kaprodi_quote }}"
              </blockquote>

              <div class="flex flex-wrap gap-4 pt-4">
                <UButton v-if="prodiData.kaprodi_email" icon="i-heroicons-envelope" color="primary">
                  {{ prodiData.kaprodi_email }}
                </UButton>
                <UButton v-if="prodiData.kaprodi_telepon" icon="i-heroicons-phone" color="secondary" variant="outline">
                  {{ prodiData.kaprodi_telepon }}
                </UButton>
              </div>
            </div>
          </div>
        </UCard>
      </UContainer>
    </section>

    <!-- ================= VISI MISI ================= -->
    <section class="py-20 bg-white dark:bg-gray-800">
      <UContainer>
        <div class="text-center mb-12">
          <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Visi & Misi
          </h2>
          <p class="text-gray-500 dark:text-gray-400">
            Arah dan tujuan Program Studi {{ prodiData?.nama }}
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-8">
          <!-- Visi -->
          <UCard class="border-t-4 border-primary-500">
            <template #header>
              <div class="flex items-center gap-3">
                <div class="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                  <UIcon name="i-heroicons-eye" class="text-primary-600 w-6 h-6" />
                </div>
                <h3 class="text-2xl font-bold">Visi</h3>
              </div>
            </template>
            <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
              {{ prodiData?.visi }}
            </p>
          </UCard>

          <!-- Misi -->
          <UCard class="border-t-4 border-primary-500">
            <template #header>
              <div class="flex items-center gap-3">
                <div class="p-2 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center">
                  <UIcon name="i-heroicons-rocket-launch" class="text-primary-600 w-6 h-6" />
                </div>
                <h3 class="text-2xl font-bold">Misi</h3>
              </div>
            </template>
            <ul class="space-y-3">
              <li
                v-for="misi in prodiData?.misi"
                :key="misi.nomor"
                class="flex items-center gap-3"
              >
                <span class="flex-shrink-0 w-7 h-7 bg-primary-100 dark:bg-primary-800/30 text-primary-600 dark:text-primary-300 rounded-full flex items-center justify-center text-sm font-bold">
                  {{ misi.nomor }}
                </span>
                <span>{{ misi.keterangan }}</span>
              </li>
            </ul>
          </UCard>
        </div>
      </UContainer>
    </section>

    <!-- ================= STATISTIK ================= -->
    <section v-if="prodiData?.statistik?.length" class="py-20">
      <UContainer>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <UCard
            v-for="stat in prodiData.statistik"
            :key="stat.keterangan"
            class="text-center"
          >
            <div class="text-3xl font-bold text-primary-600">
              {{ stat.nilai }}
            </div>
            <div class="text-sm text-gray-500">
              {{ stat.keterangan }}
            </div>
          </UCard>
        </div>
      </UContainer>
    </section>

    <!-- ================= AKREDITASI ================= -->
    <section v-if="prodiData?.foto_akreditasi_url" class="pt-20 pb-20 bg-gray-50 dark:bg-gray-900">
      <UContainer class="max-w-6xl">
        <div class="text-center mb-10">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            Akreditasi LAMEMBA
          </h2>
          <p class="text-gray-600 dark:text-gray-400">
            Sertifikat resmi akreditasi Program Studi {{ prodiData.nama }}
          </p>
        </div>

        <div class="w-full rounded-xl overflow-hidden shadow-xl">
          <img
            :src="prodiData.foto_akreditasi_url"
            :alt="'Sertifikat Akreditasi ' + prodiData.nama"
            class="w-full h-auto object-contain"
          />
        </div>
      </UContainer>
    </section>
  </div>
</template>
