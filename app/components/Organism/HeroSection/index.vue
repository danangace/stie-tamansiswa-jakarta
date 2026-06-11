<script setup lang="ts">
const { data: banners } = await useAsyncData('banners', async () => {
  const { data } = await useSupabasePublic()
    .from('banner')
    .select('foto_url')
    .order('urutan', { ascending: true })
  return data ?? []
})

const items = computed(() =>
  banners.value && banners.value.length > 0
    ? banners.value.map(b => b.foto_url)
    : ['/img/banner-1.png']
)
</script>

<template>
  <div class="relative w-full">
    <UCarousel
      v-slot="{ item }"
      :items="items"
      :ui="{ item: 'basis-full' }"
      class="h-full overflow-hidden"
      indicators
      :autoplay="{ delay: 5000 }"
    >
      <img
        :src="item"
        class="w-full h-full object-cover"
        draggable="false"
        alt="Hero Image"
      />
      <div
        class="absolute inset-0 bg-black/30 flex items-center justify-center"
      >
        <!-- <div class="text-center text-white px-4">
          <h1 class="text-4xl md:text-6xl font-bold mb-4">
            STIE Tamansiswa Jakarta
          </h1>
          <p class="text-xl md:text-2xl">
            Membangun Generasi Unggul dan Berkarakter
          </p>
        </div> -->
      </div>
    </UCarousel>
  </div>
</template>
