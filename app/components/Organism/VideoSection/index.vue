<script setup lang="ts">
const isPlaying = ref(false);
const videoId = "dQw4w9WgXcQ"; // Example ID, replace with actual campus profile video
</script>

<template>
  <div class="py-24 bg-white dark:bg-neutral-900">
    <div class="container mx-auto px-4">
      <div class="max-w-4xl mx-auto text-center mb-12">
        <h2 class="text-3xl font-bold text-gray-900 dark:text-neutral-100 mb-4">Profil Kampus</h2>
        <p class="text-gray-600 dark:text-neutral-400">
          Saksikan video profil STIE Tamansiswa Jakarta untuk mengenal lebih
          dekat lingkungan akademik dan kegiatan kemahasiswaan kami.
        </p>
      </div>

      <div class="max-w-5xl mx-auto relative rounded-2xl overflow-hidden shadow-2xl aspect-video bg-gray-900 group">
        <div v-if="!isPlaying" class="absolute inset-0 cursor-pointer" @click="isPlaying = true">
          <img src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070&auto=format&fit=crop"
            alt="Video Thumbnail"
            class="w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
          <div class="absolute inset-0 flex items-center justify-center">
            <div
              class="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-white/50">
              <div
                class="w-0 h-0 border-t-[12px] border-t-transparent border-l-[24px] border-l-white border-b-[12px] border-b-transparent ml-1">
              </div>
            </div>
          </div>
        </div>

        <iframe v-else class="w-full h-full" :src="`https://www.youtube.com/embed/${videoId}?autoplay=1`"
          title="YouTube video player" frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen></iframe>
      </div>
    </div>
  </div>
</template>
