<script setup lang="ts">
import { computed } from "vue"

const phoneNumber = "6281318222894"

const message = `
Halo pak,
Saya ingin bertanya tentang Pendaftaran Mahasiswa Baru (PMB) di STIE Taman Siswa Jakarta
`

const waLink = computed(() => {
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
})
</script>

<template>
  <a
  :href="waLink"
  target="_blank"
  rel="noopener"
  aria-label="Tanya PMB via WhatsApp"
  class="fixed bottom-16 md:bottom-10 right-6 z-50
         flex items-center gap-3
         px-4 md:px-5
         h-14 md:h-16
         rounded-full shadow-xl
         bg-[#25D366] hover:bg-[#1ebe5d]
         transition-all duration-300
         hover:scale-105"
>
  <UIcon
    name="i-simple-icons-whatsapp"
    class="w-7 h-7 md:w-8 md:h-8 text-white shrink-0"
  />

  <span class="hidden md:inline text-white font-semibold whitespace-nowrap">
    Tanya PMB
  </span>
</a>
</template>