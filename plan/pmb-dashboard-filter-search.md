# Plan: Filter Status & Pencarian di Dashboard PMB

**Tanggal:** 2026-06-11  
**Status:** Menunggu Approval

---

## Perubahan

Satu file: `app/pages/admin/pmb/index.vue`

### 1. Tambah filter status

Tambah `ref` baru `filterStatus` dengan opsi:
- Semua Status
- Menunggu Verifikasi
- Diterima
- Ditolak

### 2. Tambah input pencarian

Tambah `ref` baru `searchQuery` (string). Pencarian dilakukan **client-side** pada data yang sudah diload — filter berdasarkan:
- Nama pendaftar
- Nomor pendaftaran
- No. HP

### 3. Logika filter

Filter tipe dan status dikirim ke query Supabase (server-side).  
Pencarian teks dilakukan client-side dengan `computed` dari `listWithNama`.

```js
const filteredList = computed(() => {
  const q = searchQuery.value.toLowerCase().trim()
  if (!q) return listWithNama.value
  return listWithNama.value.filter(r =>
    r.nama?.toLowerCase().includes(q) ||
    r.nomor_pendaftaran?.toLowerCase().includes(q) ||
    r.no_hp?.toLowerCase().includes(q)
  )
})
```

### 4. Update `loadData`

Tambahkan `filterStatus` ke query Supabase (seperti `filterTipe` yang sudah ada).

### 5. Update template

Baris filter menjadi:
```
[Semua Jalur ▾]  [Semua Status ▾]  [🔍 Cari nama / nomor...]
```

`UTable` menggunakan `filteredList` (computed) bukan langsung `listWithNama`.

---

## Tidak ada perubahan di

- Composable `usePmb.ts`
- Database
- File lain
