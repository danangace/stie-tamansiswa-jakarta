<script setup lang="ts">
definePageMeta({ path: '/pmb/sukses', title: 'Pendaftaran Berhasil' })

const route = useRoute()
const nomor = computed(() => route.query.nomor as string | undefined)
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 to-white dark:from-neutral-300 dark:to-neutral-200 flex items-center justify-center py-20 px-4">
    <div class="max-w-lg w-full bg-white dark:bg-neutral-400 rounded-2xl shadow-lg p-10 text-center">

      <div class="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/40 flex items-center justify-center mx-auto mb-6">
        <UIcon name="i-lucide-check" class="w-8 h-8 text-green-600 dark:text-green-400" />
      </div>

      <h1 class="text-2xl font-bold text-gray-900 dark:text-neutral-900 mb-2">Pendaftaran Berhasil!</h1>
      <p class="text-gray-500 dark:text-neutral-700 mb-6">
        Data Anda telah kami terima. Tim kami akan segera memproses pendaftaran Anda.
      </p>

      <div v-if="nomor" class="bg-neutral-50 dark:bg-neutral-500 rounded-xl p-4 mb-6">
        <p class="text-xs text-gray-500 dark:text-neutral-700 mb-1">Nomor Pendaftaran Anda</p>
        <p class="font-mono font-bold text-gray-900 dark:text-neutral-900 text-3xl tracking-widest">{{ nomor }}</p>
        <p class="text-xs text-gray-500 dark:text-neutral-700 mt-1">Simpan nomor ini untuk keperluan konfirmasi</p>
      </div>

      <div class="bg-primary-50 dark:bg-primary-400/20 rounded-xl p-4 mb-8 text-left">
        <p class="text-sm font-semibold text-gray-900 dark:text-neutral-900 mb-3">Langkah selanjutnya:</p>
        <div class="flex gap-3">
          <UIcon name="i-lucide-map-pin" class="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
          <div class="text-sm text-gray-500 dark:text-neutral-700">
            <p>Datang langsung ke kampus STIE Taman Siswa Jakarta pada jam operasional:</p>
            <p class="font-semibold text-gray-900 dark:text-neutral-900 mt-1">Senin – Jumat, pukul 16.00 – 20.00 WIB</p>
          </div>
        </div>
        <div class="flex gap-3 mt-3">
          <UIcon name="i-lucide-folder-open" class="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
          <p class="text-sm text-gray-500 dark:text-neutral-700">Bawa <span class="font-semibold text-gray-900 dark:text-neutral-900">semua berkas asli</span> yang telah diupload untuk keperluan verifikasi.</p>
        </div>
      </div>

      <div class="flex flex-col gap-3">
        <UButton color="primary" block size="lg" to="/pmb">
          Kembali ke Halaman PMB
        </UButton>
        <UButton
          color="neutral"
          variant="outline"
          block
          icon="i-lucide-message-circle"
          to="https://wa.me/6281318222894"
          target="_blank"
        >
          Hubungi via WhatsApp
        </UButton>
      </div>

    </div>
  </div>
</template>
