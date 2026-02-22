<script setup lang="ts">
const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="bg-gray-900 text-gray-300">
    <div class="max-w-7xl mx-auto px-6 lg:px-8 py-20">

      <!-- Top Section -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">

        <!-- Brand -->
        <div class="lg:col-span-5">
          <div class="flex items-center space-x-3 mb-6">
            <AtomicLogo />
            <span class="text-2xl font-bold text-white">
              STIE Taman Siswa
            </span>
          </div>

          <p class="text-gray-400 leading-relaxed mb-8 max-w-md">
            Mencetak lulusan yang unggul, berkarakter, dan siap bersaing di era
            global dengan berlandaskan ajaran Tamansiswa.
          </p>

          <p class="text-lg font-semibold text-white mb-3">
            Ikuti Kami
          </p>
          <a
            href="https://instagram.com/stie_tamsisjakarta"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center space-x-3 
                   text-gray-400 hover:text-pink-500 
                   transition-all duration-300 group"
          >
            <!-- <div class="p-2 rounded-lg bg-gray-800 group-hover:bg-pink-500/10 transition"> -->
              <Icon name="fa-brands:instagram" class="w-5 h-5" />
            <!-- </div> -->
            <span class="text-base font-medium group-hover:underline">
              @stie_tamsisjakarta
            </span>
          </a>
        </div>

        <!-- Quick Links -->
        <div class="lg:col-span-2">
          <h3 class="text-white font-semibold text-lg mb-6">
            Tautan Cepat
          </h3>
          <ul class="space-y-4">
            <li>
              <a
                href="https://forms.gle/ZJbng9btnGg6HA2B6"
                class="hover:text-white transition-colors"
              >
                Pendaftaran (PMB)
              </a>
            </li>
            <li>
              <a
                href="https://jeb.stieykpn.ac.id/index.php/jeb"
                class="hover:text-white transition-colors"
              >
                Jurnal Bisnis dan Ekonomi
              </a>
            </li>
          </ul>
        </div>

        <!-- Academic -->
        <div class="lg:col-span-2">
          <h3 class="text-white font-semibold text-lg mb-6">
            Akademik
          </h3>
          <ul class="space-y-4">
            <li>
              <a
                href="/program-studi/manajemen"
                class="hover:text-white transition-colors"
              >
                S1 Manajemen
              </a>
            </li>
            <li>
              <a
                href="/program-studi/akuntansi"
                class="hover:text-white transition-colors"
              >
                S1 Akuntansi
              </a>
            </li>
          </ul>
        </div>

        <!-- Contact -->
        <div class="lg:col-span-3">
          <h3 class="text-white font-semibold text-lg mb-6">
            Hubungi Kami
          </h3>

          <ul class="space-y-5 text-gray-400">
            
            <!-- Alamat -->
            <li>
              <div class="flex items-start space-x-3">
                <UIcon 
                  name="i-heroicons-map-pin" 
                  class="w-5 h-5 shrink-0 mt-1"
                />
                <span>
                  Jl. Garuda No. 25, Kemayoran, Jakarta Pusat
                </span>
              </div>
            </li>

            <!-- Telepon Kantor -->
            <li>
              <a 
                href="tel:0214265630"
                class="flex items-center space-x-3 hover:text-white transition-colors"
              >
                <UIcon name="i-heroicons-phone" class="w-5 h-5 shrink-0"/>
                <span>(021) 4265630</span>
              </a>
            </li>

            <!-- HP -->
            <li>
              <a 
                href="https://wa.me/6281318222894"
                class="flex items-center space-x-3 hover:text-white transition-colors"
              >
                <UIcon name="i-heroicons-device-phone-mobile" class="w-5 h-5 shrink-0"/>
                <span>081318222894</span>
              </a>
            </li>

            <!-- Email -->
            <li>
              <a 
                href="mailto:stiejakartatamsis@gmail.com"
                class="flex items-center space-x-3 hover:text-white transition-colors"
              >
                <UIcon name="i-heroicons-envelope" class="w-5 h-5 shrink-0"/>
                <span>stiejakartatamsis@gmail.com</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom -->
      <div class="mt-16 pt-8 border-t border-gray-800 text-center">
        <p class="text-sm text-gray-500">
          &copy; {{ currentYear }} STIE Tamansiswa Jakarta. All rights reserved.
        </p>
      </div>

    </div>
  </footer>
</template>