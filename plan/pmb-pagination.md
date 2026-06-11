# Plan: Pagination di Dashboard PMB

**Tanggal:** 2026-06-11  
**Status:** Menunggu Approval

---

## File yang Berubah

Hanya `app/pages/admin/pmb/index.vue`

---

## Pendekatan: Server-side Pagination

Query ke Supabase pakai `.range(from, to)` per halaman. Ini lebih efisien daripada load semua data lalu slice di client — apalagi data bisa terus bertambah.

---

## Perubahan

### Script

1. Tambah `currentPage` ref (default 1) dan konstanta `PAGE_SIZE = 20`
2. `loadData` menggunakan `.range()` dan ambil total count via `{ count: 'exact', head: false }`
3. Tambah `totalCount` ref untuk hitung total halaman
4. Reset `currentPage` ke 1 saat filter/status berubah
5. `filteredList` (computed pencarian) tetap berjalan di atas data halaman aktif

### Template

Tambah komponen `UPagination` di bawah tabel:
```
[◀] [1] [2] [3] ... [5] [▶]   Menampilkan 1-20 dari 100 data
```

### Export Excel

Tetap menggunakan `getAllForExport()` yang fetch semua data tanpa `.range()` — tidak berubah.

---

## Catatan Teknis

- Pencarian (searchQuery) berjalan client-side pada data halaman aktif saja
- Ketika user mengetik di search, tidak reset pagination — hasil search dari halaman aktif
- Ketika filter tipe/status berubah → reset ke halaman 1 dan load ulang
