<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">

    <!-- ================= HERO ================= -->
    <section class="relative overflow-hidden bg-primary-600 dark:bg-primary-900 text-white py-20">
      <div class="absolute inset-0 opacity-10 bg-gradient-to-r from-primary-500 to-primary-700"></div>

      <UContainer class="relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <UBadge color="primary" variant="solid" size="lg" class="mb-6">
            {{ prodiData?.department }}
          </UBadge>

          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            {{ prodiData?.name }}
          </h1>

          <p class="text-xl text-primary-100">
            {{ prodiData?.description }}
          </p>
        </div>
      </UContainer>
    </section>

    <!-- ================= KAPRODI ================= -->
    <section class="py-20">
      <UContainer>
        <UCard class="overflow-hidden">
          <div class="grid lg:grid-cols-2 gap-12 items-center">

            <!-- Foto -->
            <div>
              <div class="relative overflow-hidden rounded-3xl shadow-2xl">
                <img :src="kaprodiData?.photo" :alt="kaprodiData?.name" class="w-full object-cover aspect-[3/4]" />
              </div>
            </div>

            <!-- Info -->
            <div class="space-y-6">
              <div>
                <p class="text-sm font-semibold text-primary-600 uppercase mb-2">
                  Kepala Program Studi
                </p>
                <h2 class="text-4xl font-bold text-gray-900 dark:text-white">
                  {{ kaprodiData?.name }}
                </h2>
                <p class="text-lg text-gray-600 dark:text-gray-400">
                  {{ kaprodiData?.position }}
                </p>
              </div>

              <blockquote class="italic text-lg text-gray-700 dark:text-gray-300 border-l-4 border-primary-500 pl-6">
                "{{ kaprodiData?.quote }}"
              </blockquote>

              <div class="flex gap-4 pt-4">
                <UButton icon="i-heroicons-envelope" color="primary">
                  {{ kaprodiData?.email }}
                </UButton>

                <UButton icon="i-heroicons-phone" color="secondary" variant="outline">
                  {{ kaprodiData?.phone }}
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
            Arah dan tujuan Program Studi {{ prodiData?.name }}
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
              {{ prodiData?.vision }}
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
              <li v-for="(mission, index) in prodiData?.missions" :key="index" class="flex items-center gap-3">
                <span
                  class="flex-shrink-0 w-7 h-7 bg-primary-100 dark:bg-primary-800/30 text-primary-600 dark:text-primary-300 rounded-full flex items-center justify-center text-sm font-bold">
                  {{ index + 1 }}
                </span>
                <span>{{ mission }}</span>
              </li>
            </ul>
          </UCard>

        </div>
      </UContainer>
    </section>

    <!-- ================= STATISTIK ================= -->
    <section class="py-20">
      <UContainer>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <UCard v-for="stat in prodiData?.statistics" :key="stat.label" class="text-center">
            <div class="text-3xl font-bold text-primary-600">
              {{ stat.value }}
            </div>
            <div class="text-sm text-gray-500">
              {{ stat.label }}
            </div>
          </UCard>
        </div>
      </UContainer>
    </section>

    <!-- ================= AKREDITASI ================= -->
    <section class="pt-20 pb-20 bg-gray-50 dark:bg-gray-900">
      <UContainer class="max-w-6xl">

        <div class="text-center mb-10">
          <h2 class="text-3xl md:text-4xl font-bold mb-4">
            Akreditasi LAMEMBA
          </h2>

          <p class="text-gray-600 dark:text-gray-400">
            Sertifikat resmi akreditasi Program Studi {{ prodiData?.name }}
          </p>
        </div>

        <div class="w-full rounded-xl overflow-hidden shadow-xl">
          <img :src="prodiData?.accreditationImg" :alt="'Sertifikat Akreditasi ' + prodiData?.name"
            class="w-full h-auto object-contain" />
        </div>
      </UContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
interface KaprodiData {
  name: string
  position: string
  photo: string
  quote: string
  email: string
  phone: string
}

interface ProdiData {
  slug: string
  name: string
  department: string
  description: string
  vision: string
  missions: string[]
  statistics: { label: string; value: string }[]
  kaprodi: KaprodiData
  accreditationImg: string
}

const prodiList: ProdiData[] = [
  {
    slug: "akuntansi",
    name: "Akuntansi",
    department: "Fakultas Ekonomi dan Bisnis",
    description: "Program studi Akuntansi yang menghasilkan lulusan profesional.",
    vision: "Pada tahun 2025, menjadi Program Studi yang menghasilkan lulusan yang mampu menyinergikan perkembangan Ilmu Akuntansi dengan perkembangan Teknologi Informasi dan mengembangkan jiwa wirausaha berdasarkan prinsip ketamansiswaan",
    missions: [
      "Menyelenggarakan Pendidikan dan pengajaran dengan menghasilkan lulusan yang mampu menyinergikan perkembangan ilmu akuntasi dengan perkembangan teknologi informasi dan mengembangkan jiwa wirausaha berdasarkan prinsip ketamansiswaan",
      "Menyelenggarakan kegiatan penelitian secara kreatif dan inovatif untuk menyinergikan perkembangan ilmu Akuntansi dengan perkembangan teknologi informasi dan mengembangkan jiwa wirausaha berdasarkan prinsip ketamansiswaan",
      "Menyelenggarakan kegiatan pengabdian masyarakat yang berbasis pada sinerginya perkembangan ilmu Akuntansi dengan perkembangan teknologi informasi dan mengembangkan jiwa wirausaha berdasarkan prinsip ketamansiswaan",
      "Melakukan kerjasama baik dalam dan luar negeri guna mendukung kegiatan tridharma perguruan tinggi",
    ],
    statistics: [
      { label: "Mahasiswa Aktif", value: "50+" },
      { label: "Dosen Tetap", value: "5" },
      { label: "Alumni", value: "2K+" },
      { label: "Mitra Industri", value: "5+" }
    ],
    kaprodi: {
      name: "Ika Baskara, S.E., M.M.",
      position: "Ketua Program Studi Akuntansi",
      photo: "/img/ketua-akuntansi.jpeg",
      quote: "Akuntansi yang Profesional dan Beretika.",
      email: "baskaraika@gmail.com",
      phone: "+62 812-8462-191"
    },
    accreditationImg: "/img/banpt-akuntansi.jpeg"
  },
  {
    slug: "manajemen",
    name: "Manajemen",
    department: "Fakultas Ekonomi dan Bisnis",
    description: "Program studi Manajemen berfokus pada kepemimpinan.",
    vision: "Pada tahun 2025, menjadi Program Studi yang menghasilkan lulusan yang mampu menyinergikan perkembangan ilmu Manajemen dengan perkembangan Teknologi Informasi dan mengembangkan jiwa wirausaha berdasarkan ketamansiswaan",
    missions: [
      "Menyelenggarakan pendidikan dan pengajaran dengan menghasilkan lulusan yang mampu menyinergikan perkembangan ilmu manajemen dengan perkembangan teknologi informasi dan mengembangkan jiwa wirausaha berdasarkan prinsip ketamansiswaan",
      "Menyelenggarakan kegiatan penelitian secara kreatif dan inovatif untuk menyinergikan perkembangan ilmu manajemen dengan perkembangan teknologi informasi  dan mengembangkan jiwa wirausaha berdasarkan prinsip ketamansiswaan",
      "Menyelenggarakan kegiatan pengabdian masyarakat yang berbasis pada sinerginya perkembangan ilmu manajemen dengan perkembangan teknologi informasi dan mengembangkan jiwa wirausaha berdasarkan prinsip ketamansiswaan",
      "Melakukan kerjasama baik dalam dan luar negeri guna mendukung kegiatan tridharma perguruan tinggi",
    ],
    statistics: [
      { label: "Mahasiswa Aktif", value: "200+" },
      { label: "Dosen Tetap", value: "5" },
      { label: "Alumni", value: "3K+" },
      { label: "Mitra Industri", value: "10+" }
    ],
    kaprodi: {
      name: "Ir. Tukirin, M.M.",
      position: "Ketua Program Studi Manajemen",
      photo: "/img/ketua-manajemen.jpeg",
      quote: "Perbaikan Terus-Menerus untuk Kemajuan Bersama.",
      email: "budiansharitukirin@gmail.com",
      phone: "+62 818-891-517"
    },
    accreditationImg: "/img/banpt-manajemen.jpeg"
  }
]

const route = useRoute()
const slug = computed(() => route.params.slug as string)
const prodiData = computed(() =>
  prodiList.find(p => p.slug === slug.value)
)
const kaprodiData = computed(() => prodiData.value?.kaprodi)

definePageMeta({
  path: "/program-studi/:slug"
})

useHead(() => ({
  title: prodiData.value?.name
}))
</script>