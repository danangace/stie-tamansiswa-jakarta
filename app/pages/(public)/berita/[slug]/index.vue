<script setup lang="ts">
// Mock database for articles
const articlesDatabase: Record<
  string,
  {
    id: number;
    slug: string;
    title: string;
    excerpt: string;
    content: string;
    author: {
      name: string;
      avatar: string;
      bio: string;
    };
    coverImage: string;
    publishedAt: string;
    readTime: string;
    claps: number;
    comments: number;
  }
> = {
  "mahasiswa-stie-tamansiswa-raih-juara-1-kompetisi-akuntansi-nasional": {
    id: 1,
    slug: "mahasiswa-stie-tamansiswa-raih-juara-1-kompetisi-akuntansi-nasional",
    title:
      "Mahasiswa STIE Tamansiswa Raih Juara 1 Kompetisi Akuntansi Nasional",
    excerpt:
      "Prestasi membanggakan kembali diraih oleh mahasiswa STIE Tamansiswa Jakarta dalam ajang kompetisi nasional bidang akuntansi.",
    content: `
      <p>Prestasi membanggakan kembali diraih oleh mahasiswa STIE Tamansiswa Jakarta dalam ajang kompetisi nasional bidang akuntansi. Tim yang terdiri dari <strong>Muhammad Rizky</strong>, <strong>Siti Nurhaliza</strong>, dan <strong>Ahmad Fauzan</strong> berhasil meraih juara pertama dalam Kompetisi Akuntansi Nasional 2025 yang diselenggarakan di Universitas Indonesia.</p>
      
      <h2>Perjalanan Menuju Kemenangan</h2>
      <p>Kompetisi yang diikuti oleh lebih dari <em>150 tim dari seluruh Indonesia</em> ini menguji kemampuan peserta dalam berbagai aspek akuntansi, mulai dari akuntansi keuangan, akuntansi manajemen, hingga audit dan perpajakan.</p>
      
      <blockquote>"Kami sangat bersyukur bisa meraih juara pertama. Ini adalah hasil dari kerja keras dan bimbingan intensif dari dosen pembimbing kami." - Muhammad Rizky, Ketua Tim</blockquote>
      
      <p>Persiapan tim dilakukan secara intensif selama 3 bulan dengan bimbingan langsung dari <strong>Dr. Hendra Wijaya, M.Ak.</strong> selaku dosen pembimbing. Latihan soal, simulasi kompetisi, dan diskusi kelompok rutin dilakukan untuk mempertajam kemampuan analisis dan pemecahan masalah.</p>
      
      <h2>Tahapan Kompetisi</h2>
      <p>Kompetisi berlangsung dalam tiga tahap:</p>
      <ol>
        <li><strong>Babak Penyisihan Online</strong> - Ujian tertulis berbasis komputer yang menguji pengetahuan dasar akuntansi</li>
        <li><strong>Babak Semifinal</strong> - Studi kasus perusahaan dengan presentasi solusi</li>
        <li><strong>Babak Final</strong> - Business simulation game dan debat akuntansi</li>
      </ol>
      
      <figure>
        <img src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&h=400&fit=crop" alt="Tim STIE Tamansiswa menerima piala juara" />
        <figcaption>Tim STIE Tamansiswa saat menerima piala juara dari Rektor Universitas Indonesia</figcaption>
      </figure>
      
      <h2>Apresiasi dari Pimpinan Kampus</h2>
      <p>Ketua STIE Tamansiswa Jakarta, <strong>Prof. Dr. Sutanto, M.M.</strong>, menyampaikan apresiasi yang tinggi atas prestasi yang diraih:</p>
      
      <blockquote>"Prestasi ini membuktikan bahwa mahasiswa STIE Tamansiswa mampu bersaing di tingkat nasional. Kami akan terus mendukung mahasiswa untuk mengembangkan potensi mereka."</blockquote>
      
      <p>Sebagai bentuk apresiasi, pihak kampus akan memberikan:</p>
      <ul>
        <li>Beasiswa penuh untuk semester berikutnya</li>
        <li>Kesempatan magang di Kantor Akuntan Publik ternama</li>
        <li>Sertifikat penghargaan dan uang pembinaan</li>
      </ul>
      
      <h2>Dampak bagi Institusi</h2>
      <p>Kemenangan ini semakin memperkuat reputasi STIE Tamansiswa Jakarta sebagai institusi pendidikan tinggi yang berkualitas dalam bidang ekonomi dan akuntansi. Program studi Akuntansi yang telah terakreditasi <strong>A</strong> ini terus berkomitmen untuk menghasilkan lulusan yang kompeten dan siap bersaing di dunia kerja.</p>
      
      <p><em>Selamat kepada tim juara! Semoga prestasi ini menjadi inspirasi bagi mahasiswa lainnya untuk terus berprestasi.</em></p>
    `,
    author: {
      name: "Humas STIE",
      avatar:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
      bio: "Tim Hubungan Masyarakat STIE Tamansiswa Jakarta",
    },
    coverImage:
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=600&fit=crop",
    publishedAt: "10 Desember 2025",
    readTime: "5 menit",
    claps: 1098,
    comments: 24,
  },
  "seminar-nasional-ekonomi-digital-peluang-dan-tantangan-era-industri-4-0": {
    id: 2,
    slug: "seminar-nasional-ekonomi-digital-peluang-dan-tantangan-era-industri-4-0",
    title:
      "Seminar Nasional Ekonomi Digital: Peluang dan Tantangan di Era Industri 4.0",
    excerpt:
      "Menghadirkan pembicara dari berbagai perusahaan teknologi terkemuka untuk membahas masa depan ekonomi digital Indonesia.",
    content: `
      <p>STIE Tamansiswa Jakarta kembali menyelenggarakan Seminar Nasional bertajuk <strong>"Ekonomi Digital: Peluang dan Tantangan di Era Industri 4.0"</strong>. Acara yang diselenggarakan pada tanggal 8 Desember 2025 ini menghadirkan para pakar dan praktisi dari berbagai perusahaan teknologi terkemuka Indonesia.</p>
      
      <h2>Narasumber Berkompeten</h2>
      <p>Seminar ini menghadirkan empat narasumber utama:</p>
      <ol>
        <li><strong>Dr. Andi Gani Nena Wea</strong> - Chief Digital Officer Bank Mandiri</li>
        <li><strong>Nadiem Makarim</strong> - Founder Gojek (melalui video conference)</li>
        <li><strong>William Tanuwijaya</strong> - CEO Tokopedia</li>
        <li><strong>Prof. Dr. Rhenald Kasali</strong> - Guru Besar FEB UI</li>
      </ol>
      
      <figure>
        <img src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&h=400&fit=crop" alt="Suasana Seminar Nasional" />
        <figcaption>Suasana Seminar Nasional yang dihadiri lebih dari 500 peserta</figcaption>
      </figure>
      
      <h2>Topik yang Dibahas</h2>
      <p>Beberapa topik menarik yang dibahas dalam seminar ini meliputi:</p>
      <ul>
        <li>Transformasi digital dalam sektor perbankan</li>
        <li>Startup ecosystem di Indonesia</li>
        <li>E-commerce dan perubahan perilaku konsumen</li>
        <li>Kesiapan SDM menghadapi disrupsi digital</li>
      </ul>
      
      <blockquote>"Era digital bukan lagi masa depan, tapi sudah menjadi kenyataan hari ini. Yang tidak beradaptasi akan tertinggal." - Prof. Dr. Rhenald Kasali</blockquote>
      
      <h2>Antusiasme Peserta</h2>
      <p>Seminar yang dihadiri oleh lebih dari <em>500 peserta</em> ini mendapat respon yang sangat positif. Peserta tidak hanya berasal dari kalangan mahasiswa, tetapi juga dosen, pelaku UMKM, dan masyarakat umum.</p>
      
      <p>Sesi tanya jawab berlangsung sangat interaktif dengan berbagai pertanyaan seputar strategi memasuki era digital, peluang karir di industri teknologi, dan tips memulai startup.</p>
    `,
    author: {
      name: "Panitia Semnas",
      avatar:
        "https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=100&h=100&fit=crop&crop=face",
      bio: "Panitia Seminar Nasional STIE Tamansiswa Jakarta",
    },
    coverImage:
      "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=600&fit=crop",
    publishedAt: "8 Desember 2025",
    readTime: "4 menit",
    claps: 856,
    comments: 18,
  },
};

// Default article for unmatched slugs
const defaultArticle = {
  id: 0,
  slug: "",
  title: "Artikel Tidak Ditemukan",
  excerpt: "",
  content: "<p>Maaf, artikel yang Anda cari tidak ditemukan.</p>",
  author: {
    name: "Admin",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
    bio: "",
  },
  coverImage:
    "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1200&h=600&fit=crop",
  publishedAt: "-",
  readTime: "-",
  claps: 0,
  comments: 0,
};

// Get route params
const route = useRoute();
const router = useRouter();
const slug = route.params.slug as string;

// Simulate fetching article by slug
const isLoading = ref(true);
const article = ref(defaultArticle);

const fetchArticle = async () => {
  isLoading.value = true;
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (articlesDatabase[slug]) {
    article.value = articlesDatabase[slug];
  } else {
    article.value = defaultArticle;
  }

  isLoading.value = false;
};

// Fetch on mount
onMounted(() => {
  fetchArticle();
});

// Update page title
useHead({
  title: computed(() => article.value.title + " - STIE Tamansiswa Jakarta"),
});

// Format number helper
const formatNumber = (num: number) => {
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + "K";
  }
  return num.toString();
};

// Navigate back
const goBack = () => {
  router.push("/berita");
};
</script>

<template>
  <div class="bg-neutral-100 min-h-screen">
    <!-- Loading State -->
    <div v-if="isLoading" class="flex items-center justify-center min-h-screen">
      <div class="flex flex-col items-center gap-4">
        <svg
          class="animate-spin w-8 h-8 text-primary-500"
          fill="none"
          viewBox="0 0 24 24"
        >
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
        <span class="text-text-300">Memuat artikel...</span>
      </div>
    </div>

    <!-- Article Content -->
    <article v-else>
      <!-- Cover Image -->
      <div class="w-full h-[40vh] md:h-[50vh] relative">
        <img
          :src="article.coverImage"
          :alt="article.title"
          class="w-full h-full object-cover"
        />
        <div
          class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"
        ></div>

        <!-- Back Button -->
        <button
          @click="goBack"
          class="absolute top-4 left-4 md:top-6 md:left-6 flex items-center gap-2 text-white bg-black/30 hover:bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full transition-colors"
        >
          <svg
            class="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          <span class="text-sm font-medium">Kembali</span>
        </button>
      </div>

      <!-- Article Header -->
      <div class="container mx-auto px-4 max-w-3xl -mt-20 relative z-10">
        <div class="bg-white rounded-t-2xl px-6 md:px-10 pt-8 pb-6">
          <!-- Title -->
          <h1
            class="text-2xl md:text-4xl font-bold text-text-100 leading-tight mb-6"
          >
            {{ article.title }}
          </h1>

          <!-- Author & Meta -->
          <div
            class="flex flex-col sm:flex-row sm:items-center gap-4 pb-6 border-b border-neutral-400"
          >
            <div class="flex items-center gap-3">
              <img
                :src="article.author.avatar"
                :alt="article.author.name"
                class="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p class="font-semibold text-text-100">
                  {{ article.author.name }}
                </p>
                <p class="text-sm text-text-300">{{ article.author.bio }}</p>
              </div>
            </div>
            <div
              class="sm:ml-auto flex items-center gap-4 text-sm text-text-300"
            >
              <span>{{ article.publishedAt }}</span>
              <span>·</span>
              <span>{{ article.readTime }} baca</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Article Body -->
      <div class="container mx-auto px-4 max-w-3xl">
        <div class="bg-white px-6 md:px-10 py-8">
          <!-- WYSIWYG Content -->
          <div class="prose prose-lg max-w-none" v-html="article.content"></div>
        </div>
      </div>

      <!-- Article Footer -->
      <div class="container mx-auto px-4 max-w-3xl">
        <div class="bg-white rounded-b-2xl px-6 md:px-10 py-6">
          <!-- Engagement -->
          <div
            class="flex items-center justify-between py-4 border-t border-neutral-400"
          >
            <div class="flex items-center gap-6">
              <!-- Claps -->
              <button
                class="flex items-center gap-2 text-text-300 hover:text-primary-500 transition-colors"
              >
                <svg
                  class="w-6 h-6"
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
                <span class="font-medium">{{
                  formatNumber(article.claps)
                }}</span>
              </button>

              <!-- Comments -->
              <button
                class="flex items-center gap-2 text-text-300 hover:text-primary-500 transition-colors"
              >
                <svg
                  class="w-6 h-6"
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
                <span class="font-medium">{{ article.comments }}</span>
              </button>
            </div>

            <!-- Share -->
            <div class="flex items-center gap-3">
              <button
                class="p-2 text-text-300 hover:text-primary-500 hover:bg-primary-500/10 rounded-full transition-colors"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </button>
              <button
                class="p-2 text-text-300 hover:text-primary-500 hover:bg-primary-500/10 rounded-full transition-colors"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                  />
                </svg>
              </button>
            </div>
          </div>

          <!-- Author Card -->
          <div class="mt-6 p-6 bg-neutral-200 rounded-xl">
            <div class="flex items-start gap-4">
              <img
                :src="article.author.avatar"
                :alt="article.author.name"
                class="w-16 h-16 rounded-full object-cover"
              />
              <div class="flex-1">
                <p class="text-sm text-text-300 mb-1">Ditulis oleh</p>
                <p class="font-bold text-lg text-text-100 mb-2">
                  {{ article.author.name }}
                </p>
                <p class="text-text-300 text-sm">{{ article.author.bio }}</p>
              </div>
            </div>
          </div>

          <!-- Navigation -->
          <div class="mt-8 pt-6 border-t border-neutral-400">
            <button
              @click="goBack"
              class="flex items-center gap-2 text-primary-500 hover:text-primary-600 font-medium transition-colors"
            >
              <svg
                class="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Lihat semua artikel
            </button>
          </div>
        </div>
      </div>

      <!-- Bottom Spacing -->
      <div class="h-12"></div>
    </article>
  </div>
</template>

<style scoped>
/* Prose styles for WYSIWYG content */
.prose {
  color: var(--color-text-200);
  line-height: 1.8;
}

.prose :deep(h2) {
  color: var(--color-text-100);
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.prose :deep(h3) {
  color: var(--color-text-100);
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
}

.prose :deep(p) {
  margin-bottom: 1.25rem;
}

.prose :deep(strong) {
  color: var(--color-text-100);
  font-weight: 600;
}

.prose :deep(em) {
  font-style: italic;
}

.prose :deep(a) {
  color: var(--color-primary-500);
  text-decoration: underline;
}

.prose :deep(a:hover) {
  color: var(--color-primary-600);
}

.prose :deep(blockquote) {
  border-left: 4px solid var(--color-primary-500);
  padding-left: 1.5rem;
  margin: 1.5rem 0;
  font-style: italic;
  color: var(--color-text-200);
  background-color: var(--color-neutral-200);
  padding: 1rem 1.5rem;
  border-radius: 0 0.5rem 0.5rem 0;
}

.prose :deep(ul) {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 1.25rem;
}

.prose :deep(ol) {
  list-style-type: decimal;
  padding-left: 1.5rem;
  margin-bottom: 1.25rem;
}

.prose :deep(li) {
  margin-bottom: 0.5rem;
}

.prose :deep(figure) {
  margin: 2rem 0;
}

.prose :deep(figure img) {
  width: 100%;
  border-radius: 0.75rem;
  object-fit: cover;
}

.prose :deep(figcaption) {
  text-align: center;
  font-size: 0.875rem;
  color: var(--color-text-300);
  margin-top: 0.75rem;
  font-style: italic;
}

.prose :deep(img) {
  width: 100%;
  border-radius: 0.75rem;
  margin: 1.5rem 0;
}

.prose :deep(hr) {
  border: none;
  border-top: 1px solid var(--color-neutral-400);
  margin: 2rem 0;
}

.prose :deep(code) {
  background-color: var(--color-neutral-300);
  padding: 0.125rem 0.375rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
  font-family: monospace;
}

.prose :deep(pre) {
  background-color: var(--color-neutral-800);
  color: var(--color-neutral-100);
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  margin: 1.5rem 0;
}

.prose :deep(pre code) {
  background-color: transparent;
  padding: 0;
}

.prose :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1.5rem 0;
}

.prose :deep(th),
.prose :deep(td) {
  border: 1px solid var(--color-neutral-400);
  padding: 0.75rem;
  text-align: left;
}

.prose :deep(th) {
  background-color: var(--color-neutral-200);
  font-weight: 600;
  color: var(--color-text-100);
}
</style>
