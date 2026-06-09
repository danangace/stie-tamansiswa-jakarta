<script setup lang="ts">
definePageMeta({ layout: 'admin' })

const { session, initSession } = useAdminAuth()

onMounted(initSession)

const modules = [
  { label: 'Tenaga Ahli & Pimpinan', to: '/admin/tenaga-ahli', icon: 'i-lucide-users', color: 'text-primary-500' },
  { label: 'Tenaga Pendidik', to: '/admin/tenaga-pendidik', icon: 'i-lucide-graduation-cap', color: 'text-secondary-500' },
  { label: 'Partner', to: '/admin/partner', icon: 'i-lucide-handshake', color: 'text-primary-400' },
  { label: 'Program Studi', to: '/admin/program-studi', icon: 'i-lucide-book-open', color: 'text-secondary-400' },
  { label: 'Kegiatan Mahasiswa', to: '/admin/kegiatan-mahasiswa', icon: 'i-lucide-calendar', color: 'text-primary-600' },
]
</script>

<template>
  <div class="flex flex-col gap-6 max-w-4xl">
    <div>
      <h1 class="text-2xl font-bold text-text-100">Dashboard</h1>
      <p class="text-sm text-text-300 mt-1">
        Selamat datang, <span class="font-medium">{{ session?.user?.email }}</span>
      </p>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
      <NuxtLink
        v-for="mod in modules"
        :key="mod.to"
        :to="mod.to"
        class="bg-white dark:bg-neutral-200 rounded-xl p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow border border-neutral-500"
      >
        <UIcon :name="mod.icon" class="w-7 h-7" :class="mod.color" />
        <span class="text-sm font-semibold text-text-100">{{ mod.label }}</span>
      </NuxtLink>
    </div>
  </div>
</template>
