<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const colorMode = useColorMode();

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
        { label: "Tenaga Pengajar", icon: "i-lucide-users", to: "/profil/staff-pengajar" },
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
      label: "Kemahasiswaan",
      active: route.path.startsWith("/kemahasiswaan"),
      class: "text-base",
      children: [
        { label: "Kegiatan Kemahasiswaan", to: "/kemahasiswaan/kegiatan" },
        { label: "Form Pelacakan Alumni", to: "https://forms.gle/Qaj1qpYvZpUtTgvQ7", rel: "noopener", target: '_blank' },
        { label: "Form Pengguna Lulusan", to: "https://forms.gle/u2iqkcC8K5zXrmTu9", rel: "noopener", target: '_blank' },
        { label: "Jurnal Publikasi Dosen", to: "https://sinta.kemdiktisaintek.go.id/affiliations/profile/1168", rel: "noopener", target: '_blank' }
      ],
    },
    // {
    //   label: "Berita",
    //   to: "/berita",
    //   active: route.path.startsWith("/berita"),
    //   class: "text-base",
    // },
    // {
    //   label: "Kemahasiswaan",
    //   to: "/kemahasiswaan",
    //   active: route.path.startsWith("/kemahasiswaan"),
    //   class: "text-base",
    // },


    // 🔥 MENU BARU PMB
    {
      label: "Form PMB",
      to: "https://forms.gle/ZJbng9btnGg6HA2B6",
      rel: "noopener",
      target: '_blank',
      class: "text-base font-bold text-white bg-primary-600 px-4 py-2 rounded-lg hover:bg-primary-700 transition"
    }
  ];
});

function toggleColorMode() {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
}
</script>

<template>
  <UHeader :ui="{
    root: 'backdrop-filter-none !bg-secondary-500',
  }">
    <template #title>
      <div class="flex items-center gap-3 min-w-0">
        <AtomicLogo class="shrink-0" />
        <span class="text-white font-bold text-lg truncate whitespace-nowrap">
          STIE Taman Siswa Jakarta
        </span>
      </div>
    </template>

    <template #right>
      <div class="flex items-center gap-3">
        <div class="hidden md:block">
          <UNavigationMenu :items="items" color="neutral" :content-orientation="`vertical`" :ui="{
            list: 'gap-x-6',
            link: 'text-text-100',
            linkLabel: '',
            childList: 'p-5',
            childLinkIcon: 'mr-3 mt-1',
          }" />
        </div>

        <!-- Theme Toggle -->
        <button type="button" aria-label="Toggle dark mode"
          class="p-2 flex rounded-lg text-white hover:bg-white/10 transition-colors duration-200"
          @click="toggleColorMode">
          <UIcon :name="colorMode.value === 'dark' ? 'i-lucide-sun' : 'i-lucide-moon'" class="w-5 h-5" />
        </button>
      </div>
    </template>

    <template #body>
      <UNavigationMenu :items="items" color="neutral" orientation="vertical" />
      <!-- Mobile Theme Toggle -->
      <div class="mt-4 pt-4 border-t border-default">
        <button type="button"
          class="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors w-full hover:bg-elevated"
          @click="toggleColorMode">
          <UIcon :name="colorMode.value === 'dark' ? 'i-lucide-sun' : 'i-lucide-moon'" class="w-5 h-5" />
          <span class="text-sm font-medium">
            {{ colorMode.value === 'dark' ? 'Mode Terang' : 'Mode Gelap' }}
          </span>
        </button>
      </div>
    </template>
  </UHeader>
</template>

<style scoped></style>
