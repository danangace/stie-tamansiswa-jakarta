# Plan: Server-side Search dengan Debounce di Dashboard PMB

**Tanggal:** 2026-06-11  
**Status:** Menunggu Approval

---

## File yang Berubah

Hanya `app/pages/admin/pmb/index.vue`

---

## Perubahan

### Hapus `filteredList` computed
Client-side filtering dihapus sepenuhnya. Tabel langsung pakai `listWithNama`.

### Debounce watcher pada `searchQuery`

```js
let searchTimer: ReturnType<typeof setTimeout> | null = null

watch(searchQuery, (val) => {
  if (searchTimer) clearTimeout(searchTimer)
  if (val.length === 0) {
    // Langsung reload tanpa search
    currentPage.value = 1; loadData(); return
  }
  if (val.length < 3) return // tunggu minimal 3 karakter, jangan hit API
  // Idle 500ms baru hit API
  searchTimer = setTimeout(() => { currentPage.value = 1; loadData() }, 500)
})
```

### Server-side search di `loadData`

Karena `nama` dan `no_hp` ada di tabel child (`pmb_baru`, `pmb_pindahan`), perlu 2 sub-query dulu:

1. Cari `pendaftar_id` di `pmb_baru` yang `nama` atau `no_hp` cocok
2. Cari `pendaftar_id` di `pmb_pindahan` yang `nama` atau `no_hp` cocok
3. Gabungkan semua ID dengan `nomor_pendaftaran` → filter utama dengan `.or()`

```js
const q = searchQuery.value.trim()
if (q.length >= 3) {
  const [r1, r2] = await Promise.all([
    supabase.from('pmb_baru').select('pendaftar_id').or(`nama.ilike.%${q}%,no_hp.ilike.%${q}%`),
    supabase.from('pmb_pindahan').select('pendaftar_id').or(`nama.ilike.%${q}%,no_hp.ilike.%${q}%`),
  ])
  const ids = [...new Set([
    ...(r1.data?.map(r => r.pendaftar_id) ?? []),
    ...(r2.data?.map(r => r.pendaftar_id) ?? []),
  ])]
  const orParts = [`nomor_pendaftaran.ilike.%${q}%`]
  if (ids.length > 0) orParts.push(`id.in.(${ids.join(',')})`)
  query = query.or(orParts.join(','))
}
```

Filter tipe, status, dan tahun tetap aktif bersamaan dengan search.

---

## Rules

| Kondisi | Aksi |
|---|---|
| `< 3 karakter` | Tidak hit API, tabel tetap tampil data normal |
| `>= 3 karakter, masih ketik` | Timer di-reset, belum hit API |
| `>= 3 karakter, idle 500ms` | Hit API dengan semua filter aktif |
| `dikosongkan` | Langsung reload tanpa search |
