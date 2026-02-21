<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const route = useRoute();
const items = computed<NavigationMenuItem[]>(() => {
  return [
    {
      label: "Beranda",
      to: "/",
      class: "text-base",
    },
    {
      label: "Tentang Kami",
      active: route.path.startsWith("/profil"),
      class: "text-base",
      children: [
        { label: "Visi dan Misi", icon: "i-lucide-target", to: "/profil/visi-misi" },
        { label: "Sejarah STIE Taman Siswa", icon: "i-lucide-book-open", to: "/profil/tentang" },
        { label: "Struktur Organisasi", icon: "i-lucide-network", to: "/profil/struktur-organisasi" },
        { label: "Staff Pengajar", icon: "i-lucide-users", to: "/profil/staff-pengajar" },
        { label: "Kalender Akademik", icon: "i-lucide-calendar", to: "/profil/kalender-akademik" },
        { label: "Kerjasama", icon: "i-lucide-handshake", to: "/profil/kerjasama" },
        { label: "Akreditasi", icon: "i-lucide-award", to: "/profil/akreditasi" },
        { label: "Organisasi", icon: "i-lucide-building-2", to: "/profil/organisasi" },
      ],
    },
    {
      label: "Program Studi",
      active: route.path.startsWith("/program-studi"),
      class: "text-base",
      children: [
        { label: "S1 Manajemen", icon: "i-lucide-briefcase", to: "/program-studi/manajemen" },
        { label: "S1 Akuntansi", icon: "i-lucide-calculator", to: "/program-studi/akuntansi" },
      ],
    },
    {
      label: "Berita",
      to: "/berita",
      active: route.path.startsWith("/berita"),
      class: "text-base",
    },
    {
      label: "Kemahasiswaan",
      to: "/kemahasiswaan",
      active: route.path.startsWith("/kemahasiswaan"),
      class: "text-base",
    },

    // 🔥 MENU BARU PMB
    {
      label: "PMB",
      to: "https://forms.gle/ZJbng9btnGg6HA2B6",
      rel: "noopener",
      class: "text-base font-bold text-white bg-primary-600 px-4 py-2 rounded-lg hover:bg-primary-700 transition"
    }
  ];
});

const navigationMenuUIClass = {
  list: "gap-x-6",
  linkLabel: "font-semibold text-neutral-800 md:text-neutral-100",
  childList: "p-5",
  childLinkIcon: "mr-3 mt-1",
};
</script>

<template>
  <UHeader :ui="{ root: 'backdrop-filter-none !bg-secondary-500' }">
    <template #title>
      <div class="flex items-center gap-3 min-w-0">
        <AtomicLogo class="shrink-0" />
        <span
          class="text-neutral-100 font-bold text-lg truncate whitespace-nowrap"
        >
          STIE Taman Siswa Jakarta
        </span>
      </div>
    </template>
    <template #right>
      <div class="hidden md:block">
        <UNavigationMenu
          :ui="navigationMenuUIClass"
          :items="items"
          color="secondary"
          :content-orientation="`vertical`"
        />
      </div>
    </template>

    <template #body>
      <UNavigationMenu
        :ui="navigationMenuUIClass"
        :items="items"
        color="secondary"
        orientation="vertical"
      />
    </template>
  </UHeader>
</template>

<style scoped></style>
