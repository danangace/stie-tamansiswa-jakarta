<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <!-- Hero Section with Program Overview -->
    <section class="relative overflow-hidden bg-primary-600 dark:bg-primary-900 text-white py-20">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0 bg-gradient-to-r from-primary-500 to-primary-700"></div>
      </div>
      
      <UContainer class="relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <UBadge color="primary" variant="solid" size="lg" class="mb-6">
            {{ prodiData?.department }}
          </UBadge>
          
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {{ prodiData?.name }}
          </h1>
          
          <p class="text-xl md:text-2xl text-primary-100 leading-relaxed">
            {{ prodiData?.description }}
          </p>
        </div>
      </UContainer>
    </section>

    <!-- Head of Study Program Section -->
    <section class="py-20">
      <UContainer>
        <div class="max-w-6xl mx-auto">
          <UCard class="overflow-hidden">
            <div class="grid lg:grid-cols-2 gap-12 items-center">
              <!-- Photo Section -->
              <div class="order-2 lg:order-1">
                <div class="relative">
                  <!-- Decorative Background -->
                  <div class="absolute -top-6 -left-6 w-72 h-72 bg-primary-100 dark:bg-primary-900 rounded-3xl opacity-50"></div>
                  
                  <!-- Main Photo Container -->
                  <div class="relative z-10 overflow-hidden rounded-3xl shadow-2xl">
                    <img 
                      :src="kaprodiData?.photo" 
                      :alt="kaprodiData?.name"
                      class="w-full h-auto object-cover aspect-[3/4]"
                    />
                    
                    <!-- Overlay Gradient -->
                    <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                  </div>
                  
                  <!-- Floating Badge -->
                  <div class="absolute bottom-6 right-6 z-20">
                    <UBadge color="primary" variant="solid" size="lg" class="shadow-lg">
                      <UIcon name="i-heroicons-academic-cap" class="mr-2" />
                      {{ kaprodiData?.position }}
                    </UBadge>
                  </div>
                </div>
              </div>

              <!-- Info Section -->
              <div class="order-1 lg:order-2 space-y-8">
                <div>
                  <p class="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wider mb-3">
                    Kepala Program Studi
                  </p>
                  <h2 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-3">
                    {{ kaprodiData?.name }}
                  </h2>
                  <p class="text-xl text-gray-600 dark:text-gray-400">
                    {{ kaprodiData?.position }}
                  </p>
                </div>

                <!-- Quote Section -->
                <div class="relative pl-6 border-l-4 border-primary-500 dark:border-primary-400">
                  <UIcon 
                    name="i-heroicons-chat-bubble-left-right" 
                    class="absolute -left-3 top-0 text-primary-500 dark:text-primary-400 w-6 h-6 bg-white dark:bg-gray-800"
                  />
                  <blockquote class="text-lg md:text-xl text-gray-700 dark:text-gray-300 italic leading-relaxed">
                    "{{ kaprodiData?.quote }}"
                  </blockquote>
                </div>

                <!-- Contact Info -->
                <div class="flex flex-wrap gap-4 pt-6">
                  <UButton 
                    icon="i-heroicons-envelope" 
                    size="lg"
                    color="primary"
                    variant="solid"
                  >
                    {{ kaprodiData?.email }}
                  </UButton>
                  
                  <UButton 
                    icon="i-heroicons-phone" 
                    size="lg"
                    color="secondary"
                    variant="outline"
                  >
                    {{ kaprodiData?.phone }}
                  </UButton>
                </div>

                <!-- Credentials -->
                <div class="flex flex-wrap gap-3 pt-4">
                  <UBadge 
                    v-for="credential in kaprodiData?.credentials" 
                    :key="credential"
                    color="primary" 
                    variant="soft" 
                    size="md"
                  >
                    {{ credential }}
                  </UBadge>
                </div>
              </div>
            </div>
          </UCard>
        </div>
      </UContainer>
    </section>

    <!-- Vision & Mission Section -->
    <section class="py-20 bg-white dark:bg-gray-800">
      <UContainer>
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Visi & Misi
            </h2>
            <p class="text-lg text-gray-600 dark:text-gray-400">
              Komitmen kami dalam pendidikan berkualitas
            </p>
          </div>

          <div class="grid md:grid-cols-2 gap-8">
            <!-- Vision -->
            <UCard>
              <template #header>
                <div class="flex items-center gap-3">
                  <div class="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
                    <UIcon name="i-heroicons-eye" class="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Visi</h3>
                </div>
              </template>
              
              <p class="text-gray-700 dark:text-gray-300 leading-relaxed">
                {{ prodiData?.vision }}
              </p>
            </UCard>

            <!-- Mission -->
            <UCard>
              <template #header>
                <div class="flex items-center gap-3">
                  <div class="p-3 bg-primary-100 dark:bg-primary-900 rounded-lg">
                    <UIcon name="i-heroicons-rocket-launch" class="w-6 h-6 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h3 class="text-2xl font-bold text-gray-900 dark:text-white">Misi</h3>
                </div>
              </template>
              
              <ul class="space-y-3">
                <li 
                  v-for="(mission, index) in prodiData?.missions" 
                  :key="index"
                  class="flex items-start gap-3"
                >
                  <UBadge color="primary" variant="solid" size="xs" class="mt-1">
                    {{ index + 1 }}
                  </UBadge>
                  <span class="text-gray-700 dark:text-gray-300">{{ mission }}</span>
                </li>
              </ul>
            </UCard>
          </div>
        </div>
      </UContainer>
    </section>

    <!-- Statistics Section -->
    <section class="py-20">
      <UContainer>
        <div class="max-w-6xl mx-auto">
          <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
            <UCard v-for="stat in prodiData?.statistics" :key="stat.label" class="text-center">
              <div class="space-y-2">
                <div class="text-4xl font-bold text-primary-600 dark:text-primary-400">
                  {{ stat.value }}
                </div>
                <div class="text-sm text-gray-600 dark:text-gray-400">
                  {{ stat.label }}
                </div>
              </div>
            </UCard>
          </div>
        </div>
      </UContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
// Type definitions
interface KaprodiData {
  name: string
  position: string
  photo: string
  quote: string
  email: string
  phone: string
  credentials: string[]
}

interface ProdiData {
  slug: string
  name: string
  department: string
  description: string
  vision: string
  missions: string[]
  statistics: {
    label: string
    value: string
  }[]
  kaprodi: KaprodiData
}

// Dummy Data - Program Studi
const prodiList: ProdiData[] = [
  {
    slug: "akuntansi",
    name: "Akuntansi",
    department: "Fakultas Ekonomi dan Bisnis",
    description:
      "Program studi Akuntansi yang menghasilkan lulusan profesional di bidang akuntansi, keuangan, audit, dan perpajakan dengan integritas dan kompetensi global.",
    vision:
      "Menjadi program studi akuntansi unggulan yang berdaya saing nasional dan internasional.",
    missions: [
      "Menyelenggarakan pendidikan akuntansi yang berkualitas",
      "Mengembangkan penelitian di bidang akuntansi dan keuangan",
      "Menghasilkan lulusan yang profesional dan beretika",
      "Membangun kerja sama dengan dunia usaha dan industri"
    ],
    statistics: [
      { label: "Mahasiswa Aktif", value: "50+" },
      { label: "Dosen Tetap", value: "10" },
      { label: "Alumni", value: "2K+" },
      { label: "Mitra Industri", value: "5+" }
    ],
    kaprodi: {
      name: "Ika Baskara, S.E., M.M.",
      position: "Ketua Program Studi Akuntansi",
      photo:
        "/img/ketua-akuntansi.jpeg",
      quote:
        "Akuntansi yang Profesional, Beretika, dan Berdampak untuk Kemajuan Bangsa dan Masyarakat",
      email: "baskaraika@gmail.com",
      phone: "+62 812-8462-191",
      credentials: []
    }
  },
  {
    slug: "manajemen",
    name: "Manajemen",
    department: "Fakultas Ekonomi dan Bisnis",
    description:
      "Program studi Manajemen yang berfokus pada pengembangan kemampuan kepemimpinan, kewirausahaan, dan pengelolaan organisasi di era global.",
    vision:
      "Menjadi program studi manajemen unggulan dalam pengembangan pemimpin dan wirausaha masa depan.",
    missions: [
      "Menyelenggarakan pendidikan manajemen berbasis praktik",
      "Mengembangkan riset di bidang manajemen dan bisnis",
      "Mendorong jiwa kewirausahaan mahasiswa",
      "Menjalin kemitraan strategis dengan industri"
    ],
    statistics: [
      { label: "Mahasiswa Aktif", value: "200+" },
      { label: "Dosen Tetap", value: "15" },
      { label: "Alumni", value: "3K+" },
      { label: "Mitra Industri", value: "10+" }
    ],
    kaprodi: {
      name: "Ir. Tukirin, M.M. ",
      position: "Ketua Program Studi Manajemen",
      photo:
        "/img/ketua-manajemen.jpeg",
      quote:
        "Perbaikan Terus-Menerus untuk Kemajuan Bersama",
      email: "stiejakartatamsis@gmail.com",
      phone: "+62 818-891-517",
      credentials: []
    }
  }
]

const route = useRoute()

const slug = computed(() => route.params.slug as string | undefined)

console.log("slug source", route.params)
console.log("slug source", route.params.slug)
console.log("slug:", slug.value)

const prodiData = computed(() =>
  prodiList.find(p => p.slug === slug.value)
)

const kaprodiData = computed(() => prodiData.value?.kaprodi)

// Page metadata
useHead(() => ({
  title: `${prodiData.value?.name} - ${prodiData.value?.department}`,
  meta: [
    {
      name: "description",
      content: prodiData.value?.description
    }
  ]
}))
definePageMeta({
  path: "/program-studi/:slug",
});
</script>

<style scoped>
/* Additional custom styles if needed */
</style>