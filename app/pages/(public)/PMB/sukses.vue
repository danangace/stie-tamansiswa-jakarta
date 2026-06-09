<script setup lang="ts">
definePageMeta({ path: '/pmb/sukses', title: 'Pendaftaran Berhasil' })

const route = useRoute()
const id = computed(() => route.query.id as string | undefined)
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-primary-50 to-white dark:from-neutral-900 dark:to-neutral-800 flex items-center justify-center py-20 px-4">
    <div class="max-w-lg w-full bg-white dark:bg-neutral-800 rounded-2xl shadow-lg p-10 text-center">

      <div class="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center mx-auto mb-6">
        <UIcon name="i-lucide-check" class="w-8 h-8 text-green-600" />
      </div>

      <h1 class="text-2xl font-bold text-text-100 mb-2">Pendaftaran Berhasil!</h1>
      <p class="text-text-300 mb-6">
        Data Anda telah kami terima. Tim kami akan segera memproses pendaftaran Anda.
      </p>

      <div v-if="id" class="bg-neutral-50 dark:bg-neutral-700 rounded-xl p-4 mb-6">
        <p class="text-xs text-text-300 mb-1">Nomor Pendaftaran Anda</p>
        <p class="font-mono font-bold text-text-100 text-sm break-all">{{ id }}</p>
        <p class="text-xs text-text-300 mt-1">Simpan nomor ini untuk keperluan konfirmasi</p>
      </div>

      <div class="bg-primary-50 dark:bg-primary-900/30 rounded-xl p-4 mb-8 text-left">
        <p class="text-sm font-semibold text-text-100 mb-2">Langkah selanjutnya:</p>
        <ol class="text-sm text-text-300 space-y-1 list-decimal list-inside">
          <li>Tunggu konfirmasi dari pihak STIE Taman Siswa Jakarta</li>
          <li>Kami akan menghubungi Anda via WhatsApp / telepon</li>
          <li>Siapkan dokumen asli untuk proses verifikasi</li>
        </ol>
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
