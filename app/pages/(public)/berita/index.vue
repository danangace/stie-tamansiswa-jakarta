<script setup lang="ts">
definePageMeta({
  title: "Berita STIE Tamansiswa Jakarta",
});

// All available articles data
const allArticles = [
  {
    id: 1,
    slug: "mahasiswa-stie-tamansiswa-raih-juara-1-kompetisi-akuntansi-nasional",
    title:
      "Mahasiswa STIE Tamansiswa Raih Juara 1 Kompetisi Akuntansi Nasional",
    excerpt:
      "Prestasi membanggakan kembali diraih oleh mahasiswa STIE Tamansiswa Jakarta dalam ajang kompetisi nasional bidang akuntansi.",
    author: "Humas STIE",
    authorAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    date: "10 Des 2025",
    readTime: "5 menit",
    image:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop",
    claps: 1098,
    comments: 24,
  },
  {
    id: 2,
    slug: "seminar-nasional-ekonomi-digital-peluang-dan-tantangan-era-industri-4-0",
    title:
      "Seminar Nasional Ekonomi Digital: Peluang dan Tantangan di Era Industri 4.0",
    excerpt:
      "Menghadirkan pembicara dari berbagai perusahaan teknologi terkemuka untuk membahas masa depan ekonomi digital Indonesia.",
    author: "Panitia Semnas",
    authorAvatar:
      "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=100&h=100&fit=crop&crop=face",
    date: "8 Des 2025",
    readTime: "4 menit",
    image:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop",
    claps: 856,
    comments: 18,
  },
  {
    id: 3,
    slug: "pengumuman-jadwal-ujian-akhir-semester-ganjil-2025-2026",
    title: "Pengumuman: Jadwal Ujian Akhir Semester Ganjil 2025/2026",
    excerpt:
      "Berikut adalah jadwal lengkap pelaksanaan Ujian Akhir Semester (UAS) Ganjil Tahun Akademik 2025/2026 untuk seluruh program studi.",
    author: "Bagian Akademik",
    authorAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    date: "5 Des 2025",
    readTime: "3 menit",
    image:
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop",
    claps: 2500,
    comments: 93,
  },
  {
    id: 4,
    slug: "kunjungan-industri-ke-pt-bank-mandiri-melihat-langsung-operasional-perbankan",
    title:
      "Kunjungan Industri ke PT Bank Mandiri: Melihat Langsung Operasional Perbankan",
    excerpt:
      "Mahasiswa semester akhir melakukan kunjungan industri untuk melihat langsung proses operasional dan manajemen di dunia perbankan.",
    author: "Prodi Manajemen",
    authorAvatar:
      "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face",
    date: "1 Des 2025",
    readTime: "6 menit",
    image:
      "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=400&h=300&fit=crop",
    claps: 724,
    comments: 12,
  },
  {
    id: 5,
    slug: "workshop-penulisan-jurnal-ilmiah-untuk-dosen-dan-mahasiswa",
    title: "Workshop Penulisan Jurnal Ilmiah untuk Dosen dan Mahasiswa",
    excerpt:
      "LPPM STIE Tamansiswa mengadakan workshop intensif untuk meningkatkan kualitas dan kuantitas publikasi ilmiah civitas akademika.",
    author: "LPPM",
    authorAvatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
    date: "28 Nov 2025",
    readTime: "4 menit",
    image:
      "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?w=400&h=300&fit=crop",
    claps: 512,
    comments: 8,
  },
  {
    id: 6,
    slug: "pendaftaran-beasiswa-prestasi-akademik-semester-genap-2025-2026-dibuka",
    title:
      "Pendaftaran Beasiswa Prestasi Akademik Semester Genap 2025/2026 Dibuka",
    excerpt:
      "Kesempatan emas bagi mahasiswa berprestasi untuk mendapatkan beasiswa penuh. Pendaftaran dibuka hingga akhir Januari 2026.",
    author: "Bagian Kemahasiswaan",
    authorAvatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face",
    date: "25 Nov 2025",
    readTime: "3 menit",
    image:
      "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&h=300&fit=crop",
    claps: 1856,
    comments: 45,
  },
  {
    id: 7,
    slug: "tim-debat-stie-tamansiswa-lolos-ke-final-kompetisi-debat-ekonomi-nasional",
    title:
      "Tim Debat STIE Tamansiswa Lolos ke Final Kompetisi Debat Ekonomi Nasional",
    excerpt:
      "Setelah melewati babak penyisihan yang ketat, tim debat berhasil maju ke babak final yang akan diselenggarakan di Universitas Indonesia.",
    author: "UKM Debat",
    authorAvatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face",
    date: "22 Nov 2025",
    readTime: "5 menit",
    image:
      "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=400&h=300&fit=crop",
    claps: 924,
    comments: 32,
  },
  {
    id: 8,
    slug: "mou-dengan-bank-indonesia-kolaborasi-riset-dan-pengembangan-sdm",
    title: "MoU dengan Bank Indonesia: Kolaborasi Riset dan Pengembangan SDM",
    excerpt:
      "Penandatanganan MoU strategis untuk meningkatkan kualitas riset dan kompetensi lulusan di bidang ekonomi moneter.",
    author: "Humas STIE",
    authorAvatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    date: "18 Nov 2025",
    readTime: "4 menit",
    image:
      "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
    claps: 1245,
    comments: 28,
  },
  {
    id: 9,
    slug: "wisuda-periode-iii-tahun-2025-350-lulusan-siap-berkontribusi-untuk-bangsa",
    title:
      "Wisuda Periode III Tahun 2025: 350 Lulusan Siap Berkontribusi untuk Bangsa",
    excerpt:
      "Prosesi wisuda berlangsung khidmat dengan dihadiri oleh pejabat Kementerian Pendidikan dan tokoh masyarakat.",
    author: "Panitia Wisuda",
    authorAvatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
    date: "15 Nov 2025",
    readTime: "6 menit",
    image:
      "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=400&h=300&fit=crop",
    claps: 3200,
    comments: 156,
  },
  {
    id: 10,
    slug: "pelatihan-sertifikasi-kompetensi-akuntansi-bagi-mahasiswa-tingkat-akhir",
    title:
      "Pelatihan Sertifikasi Kompetensi Akuntansi bagi Mahasiswa Tingkat Akhir",
    excerpt:
      "Program persiapan menghadapi ujian sertifikasi profesi akuntansi yang diselenggarakan bekerja sama dengan IAI.",
    author: "Prodi Akuntansi",
    authorAvatar:
      "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=100&h=100&fit=crop&crop=face",
    date: "10 Nov 2025",
    readTime: "4 menit",
    image:
      "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop",
    claps: 678,
    comments: 19,
  },
];

// Pagination state
const itemsPerPage = 5;
const currentPage = ref(1);
const isLoading = ref(false);

// Computed articles to display
const articles = computed(() => {
  return allArticles.slice(0, currentPage.value * itemsPerPage);
});

// Check if there are more articles to load
const hasMore = computed(() => {
  return articles.value.length < allArticles.length;
});

// Load more function with simulated delay
const loadMore = async () => {
  isLoading.value = true;
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));
  currentPage.value++;
  isLoading.value = false;
};

const formatNumber = (num: number) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};

// Router navigation
const router = useRouter();

const navigateToArticle = (slug: string) => {
  router.push(`/berita/${slug}`);
};
</script>

<template>
  <div class="bg-neutral-100 min-h-screen">
    <div class="container mx-auto px-4 max-w-4xl py-8 md:py-12">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl md:text-4xl font-bold text-text-100 mb-2">
          Berita & Artikel
        </h1>
        <p class="text-text-300">
          Informasi terkini seputar kegiatan dan pengumuman kampus
        </p>
      </div>

      <!-- Articles List -->
      <div class="space-y-8">
        <article
          v-for="article in articles"
          :key="article.id"
          class="group cursor-pointer"
          @click="navigateToArticle(article.slug)"
        >
          <div class="flex gap-6">
            <!-- Content -->
            <div class="flex-1 min-w-0">
              <!-- Author Info -->
              <div class="flex items-center gap-2 mb-2">
                <img
                  :src="article.authorAvatar"
                  :alt="article.author"
                  class="w-6 h-6 rounded-full object-cover"
                />
                <span class="text-sm text-text-100 font-medium">{{
                  article.author
                }}</span>
              </div>

              <!-- Title & Excerpt -->
              <h2
                class="text-xl font-bold text-text-100 mb-1 group-hover:text-primary-500 transition-colors line-clamp-2"
              >
                {{ article.title }}
              </h2>
              <p
                class="text-text-300 text-sm mb-3 line-clamp-2 hidden md:block"
              >
                {{ article.excerpt }}
              </p>

              <!-- Meta -->
              <div class="flex items-center gap-3 text-sm text-text-300">
                <span>{{ article.date }}</span>
                <span class="hidden sm:inline">·</span>
                <span class="hidden sm:inline"
                  >{{ article.readTime }} baca</span
                >
                <div class="flex-1" />
                <div class="flex items-center gap-3">
                  <span class="flex items-center gap-1">
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    {{ formatNumber(article.claps) }}
                  </span>
                  <span class="flex items-center gap-1">
                    <svg
                      class="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                      />
                    </svg>
                    {{ article.comments }}
                  </span>
                </div>
              </div>
            </div>

            <!-- Thumbnail -->
            <div
              class="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 rounded-lg overflow-hidden bg-neutral-400"
            >
              <img
                :src="article.image"
                :alt="article.title"
                class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          <!-- Divider -->
          <div class="border-b border-neutral-500 mt-8" />
        </article>
      </div>

      <!-- Load More -->
      <div v-if="hasMore" class="mt-10 text-center">
        <button
          class="px-6 py-2.5 border border-neutral-600 text-text-200 rounded-full text-sm font-medium hover:bg-neutral-300 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="isLoading"
          @click="loadMore"
        >
          <span v-if="isLoading" class="flex items-center justify-center gap-2">
            <svg class="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Memuat...
          </span>
          <span v-else>Muat lebih banyak</span>
        </button>
      </div>

      <!-- End of articles message -->
      <div v-else class="mt-10 text-center">
        <p class="text-text-300 text-sm">Anda telah melihat semua artikel</p>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
