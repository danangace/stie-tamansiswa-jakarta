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
      label: "Profil",
      active: route.path.startsWith("/profil"),
      class: "text-base",
      children: [
        {
          label: "Profil STIE",
          description: "Profil Singkat Perguruan Tinggi",
          icon: "i-lucide-house",
          to: "/profil/tentang",
        },
        {
          label: "Visi dan Misi",
          icon: "i-lucide-eye",
          to: "/profil/visi-misi",
        },
        {
          label: "Struktur Organisasi",
          icon: "i-lucide-info",
          to: "/profil/struktur-organisasi",
        },
      ],
    },
    {
      label: "Akademik",
      active: route.path.startsWith("/program-studi"),
      class: "text-base",
      children: [
        {
          label: "S1 Manajemen",
          icon: "i-lucide-house",
          to: "/program-studi/manajemen",
        },
        {
          label: "S1 Akuntansi",
          icon: "i-lucide-eye",
          to: "/program-studi/akuntansi",
        },
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
  ];
});

const navigationMenuUIClass = {
  list: "gap-x-6",
  linkLabel: "text-neutral-100 font-semibold",
  childList: "p-5",
  childLinkIcon: "mr-3 mt-1",
};
</script>

<template>
  <UHeader :ui="{ root: 'backdrop-filter-none !bg-secondary-500' }">
    <template #title>
      <div class="flex items-center gap-3">
        <AtomicLogo />
        <span class="text-neutral-100 font-bold text-lg">
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
