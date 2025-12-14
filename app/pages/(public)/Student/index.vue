<template>
  <div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-700 dark:from-blue-900 dark:to-indigo-900 text-white py-20">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')]"></div>
      </div>
      
      <UContainer class="relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <UIcon name="i-heroicons-users" class="w-16 h-16 mx-auto mb-6" />
          <h1 class="text-5xl md:text-6xl font-bold mb-6">
            Kemahasiswaan
          </h1>
          <p class="text-xl md:text-2xl text-blue-100">
            Pusat Kegiatan dan Organisasi Mahasiswa
          </p>
        </div>
      </UContainer>
    </section>

    <!-- Organization Info Card Section -->
    <section class="py-20">
      <UContainer>
        <div class="max-w-6xl mx-auto">
          <UCard class="overflow-hidden">
            <div class="grid md:grid-cols-3 gap-8">
              <!-- Main Info -->
              <div class="md:col-span-2">
                <div class="flex items-center gap-3 mb-6">
                  <div class="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                    <UIcon name="i-heroicons-building-library" class="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h2 class="text-3xl font-bold text-gray-900 dark:text-white">
                      {{ organizationInfo.name }}
                    </h2>
                    <p class="text-gray-600 dark:text-gray-400">{{ organizationInfo.subtitle }}</p>
                  </div>
                </div>
                
                <p class="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  {{ organizationInfo.description }}
                </p>

                <div class="space-y-4">
                  <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Tujuan Organisasi</h3>
                  <ul class="space-y-3">
                    <li 
                      v-for="(goal, index) in organizationInfo.goals" 
                      :key="index"
                      class="flex items-start gap-3"
                    >
                      <UIcon name="i-heroicons-check-circle" class="w-6 h-6 text-green-500 flex-shrink-0 mt-0.5" />
                      <span class="text-gray-700 dark:text-gray-300">{{ goal }}</span>
                    </li>
                  </ul>
                </div>
              </div>

              <!-- Quick Stats -->
              <div class="space-y-4">
                <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-6 rounded-xl">
                  <div class="text-center">
                    <UIcon name="i-heroicons-user-group" class="w-12 h-12 mx-auto text-blue-600 dark:text-blue-400 mb-3" />
                    <div class="text-4xl font-bold text-blue-600 dark:text-blue-400">{{ organizationInfo.stats.totalMembers }}</div>
                    <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">Total Anggota</div>
                  </div>
                </div>

                <div class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-6 rounded-xl">
                  <div class="text-center">
                    <UIcon name="i-heroicons-calendar" class="w-12 h-12 mx-auto text-purple-600 dark:text-purple-400 mb-3" />
                    <div class="text-4xl font-bold text-purple-600 dark:text-purple-400">{{ organizationInfo.stats.totalEvents }}</div>
                    <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">Kegiatan per Tahun</div>
                  </div>
                </div>

                <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-6 rounded-xl">
                  <div class="text-center">
                    <UIcon name="i-heroicons-trophy" class="w-12 h-12 mx-auto text-green-600 dark:text-green-400 mb-3" />
                    <div class="text-4xl font-bold text-green-600 dark:text-green-400">{{ organizationInfo.stats.achievements }}</div>
                    <div class="text-sm text-gray-600 dark:text-gray-400 mt-1">Prestasi</div>
                  </div>
                </div>
              </div>
            </div>
          </UCard>
        </div>
      </UContainer>
    </section>

    <!-- Organization Structure Section -->
    <section class="py-20 bg-white dark:bg-gray-800">
      <UContainer>
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Struktur Organisasi
            </h2>
            <p class="text-lg text-gray-600 dark:text-gray-400">
              Senat Mahasiswa Program Studi
            </p>
          </div>

          <UCard>
            <div class="relative">
              <!-- Image Container with Overlay -->
              <div class="relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-900">
                <img 
                  :src="organizationStructure.image" 
                  :alt="organizationStructure.title"
                  class="w-full h-auto object-contain"
                />
                
                <!-- Download/View Button Overlay -->
                <div class="absolute bottom-4 right-4 flex gap-2">
                  <UButton 
                    icon="i-heroicons-magnifying-glass-plus"
                    size="lg"
                    color="white"
                    @click="openStructureModal"
                  >
                    Perbesar
                  </UButton>
                  <UButton 
                    icon="i-heroicons-arrow-down-tray"
                    size="lg"
                    color="primary"
                  >
                    Download
                  </UButton>
                </div>
              </div>

              <!-- Caption -->
              <div class="mt-4 text-center">
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  {{ organizationStructure.caption }}
                </p>
              </div>
            </div>
          </UCard>
        </div>
      </UContainer>
    </section>

    <!-- Student Activities Section with Carousel -->
    <section class="py-20">
      <UContainer>
        <div class="max-w-7xl mx-auto">
          <div class="flex justify-between items-center mb-12">
            <div>
              <h2 class="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Kegiatan Mahasiswa
              </h2>
              <p class="text-lg text-gray-600 dark:text-gray-400">
                Berbagai kegiatan dan acara yang dilaksanakan
              </p>
            </div>
            
            <!-- Carousel Navigation -->
            <div class="flex gap-2">
              <UButton 
                icon="i-heroicons-chevron-left"
                color="gray"
                variant="outline"
                @click="previousSlide"
                :disabled="currentSlide === 0"
              />
              <UButton 
                icon="i-heroicons-chevron-right"
                color="gray"
                variant="outline"
                @click="nextSlide"
                :disabled="currentSlide >= Math.ceil(activities.length / itemsPerView) - 1"
              />
            </div>
          </div>

          <!-- Carousel Container -->
          <div class="overflow-hidden">
            <div 
              class="flex transition-transform duration-500 ease-in-out gap-6"
              :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
            >
              <div 
                v-for="activity in activities" 
                :key="activity.id"
                class="flex-shrink-0"
                :style="{ width: `calc(${100 / itemsPerView}% - ${(itemsPerView - 1) * 24 / itemsPerView}px)` }"
              >
                <UCard class="h-full hover:shadow-xl transition-shadow duration-300">
                  <!-- Image -->
                  <div class="relative overflow-hidden rounded-lg mb-4 aspect-video bg-gray-200 dark:bg-gray-700">
                    <img 
                      :src="activity.image" 
                      :alt="activity.title"
                      class="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                    
                    <!-- Category Badge -->
                    <div class="absolute top-4 left-4">
                      <UBadge :color="getCategoryColor(activity.category)" variant="solid" size="lg">
                        {{ activity.category }}
                      </UBadge>
                    </div>
                  </div>

                  <!-- Content -->
                  <div class="space-y-3">
                    <!-- Date and Author -->
                    <div class="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                      <div class="flex items-center gap-1">
                        <UIcon name="i-heroicons-calendar" class="w-4 h-4" />
                        <span>{{ activity.date }}</span>
                      </div>
                      <div class="flex items-center gap-1">
                        <UIcon name="i-heroicons-user" class="w-4 h-4" />
                        <span>{{ activity.author }}</span>
                      </div>
                    </div>

                    <!-- Title -->
                    <h3 class="text-xl font-bold text-gray-900 dark:text-white line-clamp-2">
                      {{ activity.title }}
                    </h3>

                    <!-- Description -->
                    <p class="text-gray-600 dark:text-gray-400 line-clamp-3">
                      {{ activity.description }}
                    </p>

                    <!-- Stats -->
                    <div class="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                      <div class="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                        <UIcon name="i-heroicons-eye" class="w-4 h-4" />
                        <span>{{ activity.views }}</span>
                      </div>
                      <div class="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                        <UIcon name="i-heroicons-heart" class="w-4 h-4" />
                        <span>{{ activity.likes }}</span>
                      </div>
                    </div>

                    <!-- Read More Button -->
                    <UButton 
                      block
                      color="primary"
                      variant="soft"
                      trailing-icon="i-heroicons-arrow-right"
                    >
                      Baca Selengkapnya
                    </UButton>
                  </div>
                </UCard>
              </div>
            </div>
          </div>

          <!-- Carousel Indicators -->
          <div class="flex justify-center gap-2 mt-8">
            <button
              v-for="(_, index) in Math.ceil(activities.length / itemsPerView)"
              :key="index"
              @click="currentSlide = index"
              class="w-3 h-3 rounded-full transition-all duration-300"
              :class="currentSlide === index ? 'bg-blue-600 w-8' : 'bg-gray-300 dark:bg-gray-600'"
            />
          </div>
        </div>
      </UContainer>
    </section>
  </div>
</template>

<script setup lang="ts">
// Type definitions
interface OrganizationInfo {
  name: string;
  subtitle: string;
  description: string;
  goals: string[];
  stats: {
    totalMembers: string;
    totalEvents: string;
    achievements: string;
  };
}

interface OrganizationStructure {
  title: string;
  image: string;
  caption: string;
}

interface Activity {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  date: string;
  author: string;
  views: string;
  likes: string;
}

// Organization Info Data
const organizationInfo = ref<OrganizationInfo>({
  name: "Senat Mahasiswa",
  subtitle: "Organisasi Kemahasiswaan Program Studi",
  description: "Senat Mahasiswa merupakan organisasi intra kampus tertinggi di tingkat program studi yang berfungsi sebagai wadah aspirasi mahasiswa, pengembangan kepemimpinan, serta pelaksana kegiatan kemahasiswaan. Kami berkomitmen untuk menciptakan lingkungan akademik yang kondusif, mengembangkan soft skills mahasiswa, dan menjadi jembatan komunikasi antara mahasiswa dengan pihak program studi.",
  goals: [
    "Menyalurkan aspirasi dan memperjuangkan hak-hak mahasiswa",
    "Mengembangkan potensi dan kreativitas mahasiswa melalui berbagai kegiatan",
    "Membangun jiwa kepemimpinan dan kewirausahaan mahasiswa",
    "Menjalin kerjasama dengan berbagai pihak untuk kepentingan mahasiswa",
    "Menciptakan lingkungan kampus yang inklusif dan produktif"
  ],
  stats: {
    totalMembers: "250+",
    totalEvents: "45+",
    achievements: "15+"
  }
});

// Organization Structure Data
const organizationStructure = ref<OrganizationStructure>({
  title: "Struktur Organisasi Senat Mahasiswa 2024",
  image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop",
  caption: "Struktur Organisasi Senat Mahasiswa Periode 2024-2025"
});

// Student Activities Data
const activities = ref<Activity[]>([
  {
    id: 1,
    title: "Workshop UI/UX Design untuk Mahasiswa",
    description: "Senat Mahasiswa mengadakan workshop UI/UX Design yang menghadirkan praktisi profesional dari industri teknologi. Kegiatan ini bertujuan untuk meningkatkan kemampuan desain mahasiswa.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?w=800&h=500&fit=crop",
    category: "Workshop",
    date: "15 Des 2024",
    author: "Admin Senat",
    views: "1.2K",
    likes: "245"
  },
  {
    id: 2,
    title: "Bakti Sosial: Berbagi dengan Masyarakat",
    description: "Program bakti sosial yang dilaksanakan oleh mahasiswa untuk membantu masyarakat sekitar kampus. Kegiatan meliputi pembagian sembako dan edukasi kesehatan.",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=500&fit=crop",
    category: "Sosial",
    date: "12 Des 2024",
    author: "Divisi Sosial",
    views: "890",
    likes: "178"
  },
  {
    id: 3,
    title: "Turnamen E-Sports Antar Program Studi",
    description: "Kompetisi e-sports yang mempertandingkan berbagai game populer. Event ini bertujuan untuk mempererat tali silaturahmi antar mahasiswa.",
    image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=500&fit=crop",
    category: "Olahraga",
    date: "10 Des 2024",
    author: "Divisi Olahraga",
    views: "2.5K",
    likes: "567"
  },
  {
    id: 4,
    title: "Seminar Kewirausahaan Digital",
    description: "Menghadirkan entrepreneur sukses untuk berbagi pengalaman dan tips memulai bisnis digital di era modern. Cocok untuk mahasiswa yang ingin menjadi entrepreneur.",
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800&h=500&fit=crop",
    category: "Seminar",
    date: "8 Des 2024",
    author: "Divisi Akademik",
    views: "1.8K",
    likes: "423"
  },
  {
    id: 5,
    title: "Festival Seni dan Budaya Mahasiswa",
    description: "Ajang kreativitas mahasiswa dalam bidang seni dan budaya. Menampilkan berbagai pertunjukan musik, tari, teater, dan pameran seni.",
    image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=500&fit=crop",
    category: "Seni",
    date: "5 Des 2024",
    author: "Divisi Seni",
    views: "3.2K",
    likes: "892"
  },
  {
    id: 6,
    title: "Coaching Clinic: Persiapan Karir IT",
    description: "Sesi coaching untuk mempersiapkan mahasiswa menghadapi dunia kerja IT. Membahas tips interview, portfolio building, dan networking.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=500&fit=crop",
    category: "Karir",
    date: "1 Des 2024",
    author: "Career Center",
    views: "1.5K",
    likes: "334"
  }
]);

// Carousel state
const currentSlide = ref(0);
const itemsPerView = ref(3);

// Responsive items per view
onMounted(() => {
  updateItemsPerView();
  window.addEventListener('resize', updateItemsPerView);
});

onUnmounted(() => {
  window.removeEventListener('resize', updateItemsPerView);
});

const updateItemsPerView = () => {
  if (window.innerWidth < 768) {
    itemsPerView.value = 1;
  } else if (window.innerWidth < 1024) {
    itemsPerView.value = 2;
  } else {
    itemsPerView.value = 3;
  }
};

// Carousel methods
const nextSlide = () => {
  const maxSlide = Math.ceil(activities.value.length / itemsPerView.value) - 1;
  if (currentSlide.value < maxSlide) {
    currentSlide.value++;
  }
};

const previousSlide = () => {
  if (currentSlide.value > 0) {
    currentSlide.value--;
  }
};

// Helper function for category colors
const getCategoryColor = (category: string) => {
  const colors: Record<string, string> = {
    'Workshop': 'blue',
    'Sosial': 'green',
    'Olahraga': 'red',
    'Seminar': 'purple',
    'Seni': 'pink',
    'Karir': 'orange'
  };
  return colors[category] || 'gray';
};

// Modal for structure image
const openStructureModal = () => {
  // Implementation for opening modal/lightbox
  alert('Open structure in fullscreen modal');
};

// Page metadata
useHead({
  title: 'Kemahasiswaan - Organisasi Mahasiswa',
  meta: [
    {
      name: 'description',
      content: organizationInfo.value.description
    }
  ]
});
definePageMeta({
  title: "Kemahasiswaan",
  path: "/kemahasiswaan",
});
</script>

<style scoped>
/* Line clamp utilities */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
