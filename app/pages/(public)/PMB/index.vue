<script setup lang="ts">
definePageMeta({ path: '/pmb', title: 'Pendaftaran Mahasiswa Baru' })
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 to-white dark:from-neutral-300 dark:to-neutral-200 py-20">
    <div class="max-w-4xl mx-auto px-4">

      <!-- Header -->
      <div class="text-center mb-14">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-900 dark:text-neutral-900 mb-4">
          Penerimaan Mahasiswa Baru
        </h1>
        <p class="text-gray-600 dark:text-neutral-700 text-lg max-w-xl mx-auto">
          Pilih jalur pendaftaran yang sesuai dengan kondisi Anda.
        </p>
      </div>

      <!-- Pilihan jalur -->
      <div class="grid md:grid-cols-2 gap-6">

        <!-- BARU -->
        <NuxtLink to="/pmb/baru" class="group">
          <div class="h-full bg-white dark:bg-neutral-400 border-2 border-transparent group-hover:border-primary-500 rounded-2xl p-8 shadow-sm group-hover:shadow-xl transition-all duration-300 flex flex-col gap-4">
            <div class="w-14 h-14 rounded-xl bg-primary-100 dark:bg-primary-800 flex items-center justify-center">
              <UIcon name="i-lucide-user-plus" class="w-7 h-7 text-primary-600 dark:text-primary-100" />
            </div>
            <div class="flex-1">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-neutral-900 mb-2">Mahasiswa Baru</h2>
              <p class="text-gray-600 dark:text-neutral-700 text-sm leading-relaxed">
                Untuk lulusan SMA / SMK / MTs yang belum pernah kuliah sebelumnya dan ingin mendaftar sebagai mahasiswa baru.
              </p>
            </div>
            <div class="flex items-center gap-2 text-primary-600 dark:text-primary-300 font-semibold text-sm group-hover:gap-3 transition-all">
              Daftar Jalur Baru
              <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
            </div>
          </div>
        </NuxtLink>

        <!-- PINDAHAN -->
        <NuxtLink to="/pmb/pindahan" class="group">
          <div class="h-full bg-white dark:bg-neutral-400 border-2 border-transparent group-hover:border-secondary-500 rounded-2xl p-8 shadow-sm group-hover:shadow-xl transition-all duration-300 flex flex-col gap-4">
            <div class="w-14 h-14 rounded-xl bg-secondary-100 dark:bg-secondary-800 flex items-center justify-center">
              <UIcon name="i-lucide-repeat" class="w-7 h-7 text-secondary-600 dark:text-secondary-100" />
            </div>
            <div class="flex-1">
              <h2 class="text-2xl font-bold text-gray-900 dark:text-neutral-900 mb-2">Pindahan / Mutasi</h2>
              <p class="text-gray-600 dark:text-neutral-700 text-sm leading-relaxed">
                Untuk mahasiswa yang ingin pindah dari perguruan tinggi lain dan melanjutkan studi di STIE Taman Siswa Jakarta.
              </p>
            </div>
            <div class="flex items-center gap-2 text-secondary-600 dark:text-secondary-300 font-semibold text-sm group-hover:gap-3 transition-all">
              Daftar Jalur Pindahan
              <UIcon name="i-lucide-arrow-right" class="w-4 h-4" />
            </div>
          </div>
        </NuxtLink>
      </div>

      <!-- Info tambahan -->
      <div class="mt-10 text-center text-sm text-gray-500 dark:text-neutral-700">
        Ada pertanyaan? Hubungi kami via WhatsApp
        <a href="https://wa.me/6281318222894" target="_blank" class="text-primary-600 dark:text-primary-300 font-semibold hover:underline ml-1">
          081318222894
        </a>
      </div>

    </div>
  </div>
</template>
