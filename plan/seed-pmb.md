# Plan: Seeder PMB (50 Baru + 50 Pindahan)

**Tanggal:** 2026-06-11  
**Status:** Menunggu Approval

---

## File Baru

`scripts/seed-pmb.mjs`

---

## Cara Kerja

1. Hapus data pmb lama (`pmb_baru`, `pmb_pindahan`, `pmb_pendaftar`) agar tidak duplikat
2. Loop 50x insert `pmb_pendaftar` tipe `baru` → insert `pmb_baru`
3. Loop 50x insert `pmb_pendaftar` tipe `pindahan` → insert `pmb_pindahan`
4. Nomor pendaftaran di-generate otomatis oleh trigger DB
5. Berkas URL menggunakan placeholder string (tidak upload file sungguhan)
6. Status divariasikan: ~60% `menunggu_verifikasi`, ~25% `diterima`, ~15% `ditolak`

---

## Data yang Di-generate

**Nama**: pool 30 nama Indonesia (laki-laki & perempuan)  
**Agama**: Islam, Kristen, Katolik, Hindu, Buddha  
**Program Studi**: manajemen / akuntansi  
**SMA**: pool 20 nama SMA di Jakarta/Jawa  
**Kampus Lama** (pindahan): pool 15 nama universitas Indonesia  
**Tanggal lahir**: random antara 1998–2005  
**No HP**: format `+628xx-xxxx-xxxx`  
**Berkas URL**: `https://placeholder.internal/pmb/{tipe}/{field}.pdf`

---

## Pola (sama dengan seed lainnya)

```js
import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
// ...load env, buat client...

async function run() {
  // hapus data lama
  // insert 50 baru
  // insert 50 pindahan
}
run().catch(...)
```

---

## Jalankan

```bash
node scripts/seed-pmb.mjs
```
