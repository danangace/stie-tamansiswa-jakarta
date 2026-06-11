# Plan: Tambah Kolom Dokumen URL ke Export Excel PMB

**Tanggal:** 2026-06-10  
**Status:** Menunggu Approval

---

## Problem

Export Excel PMB saat ini tidak menyertakan URL dokumen yang diupload pendaftar (KTP, KK, Akte, Ijazah, dll). Admin tidak bisa mengakses dokumen langsung dari file Excel.

---

## Solusi

Tambahkan kolom-kolom URL dokumen di akhir sheet Excel. URL ini bisa di-klik langsung di Excel untuk membuka/download PDF dari Supabase Storage.

---

## Perubahan yang Diperlukan

### File: `app/pages/admin/pmb/index.vue` — fungsi `handleExportExcel()`

#### Header Row — tambah kolom baru setelah kolom existing:

**Dokumen Mahasiswa Baru:**
- `Berkas Ijazah`
- `Berkas KTP`
- `Berkas KK`
- `Berkas Akte`

**Dokumen Mahasiswa Pindahan:**
- `Berkas Surat Mutasi`
- `Berkas Transkrip`
- `Berkas Biodata PP/KTI`
- `Berkas KTA`
- `Berkas KK (Pindahan)`
- `Berkas Akte (Pindahan)`

#### Data Row — tambah nilai URL dari field database:

```js
// Baru
b?.berkas_ijazah_url ?? '',
b?.berkas_ktp_url ?? '',
b?.berkas_kk_url ?? '',
b?.berkas_akte_url ?? '',
// Pindahan
p?.berkas_surat_mutasi_url ?? '',
p?.berkas_transkrip_url ?? '',
p?.berkas_biodata_pp_kti_url ?? '',
p?.berkas_kta_url ?? '',
p?.berkas_kk_url ?? '',
p?.berkas_akte_url ?? '',
```

#### Hyperlink di Excel

Setelah `aoa_to_sheet`, loop semua cell yang berisi URL dan tambahkan `.l` (link) property agar Excel merender sebagai hyperlink yang bisa diklik:

```js
// Set hyperlinks untuk kolom dokumen
const range = XLSX.utils.decode_range(ws['!ref']!)
for (let R = 1; R <= range.e.r; R++) {
  for (let C = DOC_START_COL; C <= range.e.c; C++) {
    const addr = XLSX.utils.encode_cell({ r: R, c: C })
    if (ws[addr] && ws[addr].v) {
      ws[addr].l = { Target: ws[addr].v }
    }
  }
}
```

> `DOC_START_COL` = index kolom pertama dokumen (setelah semua kolom data existing = kolom ke-29, index 29)

---

## Catatan Teknis

- URL dokumen sudah full public URL (dari Supabase Storage public bucket)
- Format URL: `https://[project].supabase.co/storage/v1/object/public/media/pmb/...`
- Saat user klik URL di Excel → browser buka/download PDF langsung
- Tidak perlu perubahan database, composable, atau backend — hanya perubahan di fungsi export
- XLSX library (v0.18.5) yang sudah terinstall mendukung property `.l` untuk hyperlink

---

## Scope

- 1 file berubah: `app/pages/admin/pmb/index.vue`
- Tidak ada perubahan schema database
- Tidak ada perubahan composable
