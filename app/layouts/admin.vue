<script setup lang="ts">
const signOut = import.meta.client ? useAdminAuth().signOut : async () => {}
const route = useRoute()

const navItems = [
  { label: 'Dashboard', to: '/admin', icon: 'i-lucide-layout-dashboard' },
  { label: 'Tenaga Ahli & Pimpinan', to: '/admin/tenaga-ahli', icon: 'i-lucide-users' },
  { label: 'Tenaga Pendidik', to: '/admin/tenaga-pendidik', icon: 'i-lucide-graduation-cap' },
  { label: 'Partner', to: '/admin/partner', icon: 'i-lucide-handshake' },
  { label: 'Program Studi', to: '/admin/program-studi', icon: 'i-lucide-book-open' },
  { label: 'Kegiatan Mahasiswa', to: '/admin/kegiatan-mahasiswa', icon: 'i-lucide-calendar' },
  { label: 'PMB', to: '/admin/pmb', icon: 'i-lucide-clipboard-list' },
]

function isActive(to: string) {
  if (to === '/admin') return route.path === '/admin'
  return route.path.startsWith(to)
}
</script>

<template>
  <div class="min-h-screen flex flex-col bg-neutral-200 dark:bg-neutral-300">
    <!-- Header -->
    <header class="bg-secondary-500 text-white px-6 py-4 flex items-center justify-between shadow z-10">
      <div class="flex items-center gap-3">
        <AtomicLogo class="shrink-0" />
        <span class="font-bold text-lg">Admin Panel</span>
      </div>
      <UButton
        color="neutral"
        variant="ghost"
        icon="i-lucide-log-out"
        class="text-white hover:bg-white/10"
        @click="signOut"
      >
        Keluar
      </UButton>
    </header>

    <div class="flex flex-1 overflow-hidden">
      <!-- Sidebar -->
      <aside class="w-56 bg-white dark:bg-neutral-200 border-r border-neutral-500 flex flex-col py-4 shrink-0">
        <nav class="flex flex-col gap-1 px-2">
          <NuxtLink
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors"
            :class="isActive(item.to)
              ? 'bg-primary-100 text-primary-700 dark:bg-primary-800 dark:text-white'
              : 'text-text-200 hover:bg-neutral-300 dark:hover:bg-neutral-300'"
          >
            <UIcon :name="item.icon" class="w-4 h-4 shrink-0" />
            {{ item.label }}
          </NuxtLink>
        </nav>
      </aside>

      <!-- Main content -->
      <main class="flex-1 p-6 overflow-y-auto">
        <slot />
      </main>
    </div>
  </div>
</template>
