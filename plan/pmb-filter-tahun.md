# Plan: Filter Tahun di Dashboard PMB + Export per Tahun

**Tanggal:** 2026-06-11  
**Status:** Menunggu Approval

---

## File yang Berubah

Hanya `app/pages/admin/pmb/index.vue`

---

## Cara Kerja

### Filter tahun

- Dropdown "Semua Tahun" / "2026" / "2027" / dst.
- Opsi tahun di-fetch dynamis dari DB: `SELECT DISTINCT LEFT(nomor_pendaftaran, 2) FROM pmb_pendaftar ORDER BY 1 DESC`
- Dikonversi ke label `20XX` (e.g. `26` → `2026`)
- Filter dikirim ke Supabase query: `.like('nomor_pendaftaran', '26%')`
- Reset ke halaman 1 saat filter berubah (sama dengan filter lain)

### Export dengan wajib pilih tahun

- Tombol Export Excel tetap seperti sekarang
- Jika `filterTahun === 'all'` saat klik export → tampilkan error: *"Pilih tahun terlebih dahulu sebelum export"*
- Jika tahun sudah dipilih → export hanya data tahun tersebut (query `getAllForExport` dipass filter tahun)

### Perubahan pada `getAllForExport`

Tambah parameter opsional `tahun?: string` ke fungsi di `usePmb.ts`:
```ts
async function getAllForExport(tahun?: string) {
  let query = supabase.from('pmb_pendaftar').select(...)
  if (tahun) query = query.like('nomor_pendaftaran', `${tahun}%`)
  ...
}
```

---

## Layout filter bar (updated)

```
[Semua Jalur ▾]  [Semua Status ▾]  [Semua Tahun ▾]  [🔍 Cari...]
```

---

## Files

- `app/pages/admin/pmb/index.vue` — filter UI + logic + export guard
- `app/composables/usePmb.ts` — tambah parameter `tahun` ke `getAllForExport`
