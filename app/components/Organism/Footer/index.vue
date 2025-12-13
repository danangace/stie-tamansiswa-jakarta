<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="bg-gray-900 text-white pt-20 pb-10">
    <div class="container mx-auto px-4">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <!-- Brand Column -->
        <div>
          <div class="flex items-center space-x-3 mb-6">
            <AtomicLogo />
            <span class="text-xl font-bold">STIE Tamansiswa</span>
          </div>
          <p class="text-gray-400 mb-6 leading-relaxed">
            Mencetak lulusan yang unggul, berkarakter, dan siap bersaing di era
            global dengan berlandaskan ajaran Tamansiswa.
          </p>
          <div class="flex space-x-4">
            <a
              href="#"
              class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-600 transition-colors"
            >
              <span class="i-heroicons-globe-alt w-5 h-5"></span>
            </a>
            <a
              href="#"
              class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-600 transition-colors"
            >
              <span class="i-heroicons-camera w-5 h-5"></span>
            </a>
            <a
              href="#"
              class="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary-600 transition-colors"
            >
              <span class="i-heroicons-video-camera w-5 h-5"></span>
            </a>
          </div>
        </div>

        <!-- Quick Links -->
        <div>
          <h3 class="text-lg font-bold mb-6">Tautan Cepat</h3>
          <ul class="space-y-4">
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-white transition-colors"
                >Tentang Kami</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-white transition-colors"
                >Program Studi</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-white transition-colors"
                >Pendaftaran (PMB)</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-white transition-colors"
                >Berita & Artikel</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-white transition-colors"
                >Karir</a
              >
            </li>
          </ul>
        </div>

        <!-- Academic -->
        <div>
          <h3 class="text-lg font-bold mb-6">Akademik</h3>
          <ul class="space-y-4">
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-white transition-colors"
                >S1 Manajemen</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-white transition-colors"
                >S1 Akuntansi</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-white transition-colors"
                >Kalender Akademik</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-white transition-colors"
                >Portal Mahasiswa</a
              >
            </li>
            <li>
              <a
                href="#"
                class="text-gray-400 hover:text-white transition-colors"
                >E-Library</a
              >
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div>
          <h3 class="text-lg font-bold mb-6">Hubungi Kami</h3>
          <ul class="space-y-4">
            <li class="flex items-start space-x-3 text-gray-400">
              <span
                class="i-heroicons-map-pin w-6 h-6 flex-shrink-0 mt-1"
              ></span>
              <span
                >Jl. Tamansiswa No. 1, Jakarta Selatan, DKI Jakarta 12345</span
              >
            </li>
            <li class="flex items-center space-x-3 text-gray-400">
              <span class="i-heroicons-phone w-5 h-5 flex-shrink-0"></span>
              <span>(021) 1234-5678</span>
            </li>
            <li class="flex items-center space-x-3 text-gray-400">
              <span class="i-heroicons-envelope w-5 h-5 flex-shrink-0"></span>
              <span>info@stie-tamansiswa.ac.id</span>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center"
      >
        <p class="text-gray-500 text-sm mb-4 md:mb-0">
          &copy; {{ currentYear }} STIE Tamansiswa Jakarta. All rights reserved.
        </p>
        <div class="flex space-x-6 text-sm text-gray-500">
          <a href="#" class="hover:text-white transition-colors"
            >Privacy Policy</a
          >
          <a href="#" class="hover:text-white transition-colors"
            >Terms of Service</a
          >
        </div>
      </div>
    </div>
  </footer>
</template>
