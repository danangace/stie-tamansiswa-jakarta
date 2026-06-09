# Plan: Admin Dashboard CRUD

Sumber requirement: `requirements/admin-dashboard.md`

---

## Status Pengerjaan

| Modul | Database | Seed | Admin Page | Public Component |
|---|---|---|---|---|
| Tenaga Ahli & Pimpinan | ✅ | ✅ | ✅ | ✅ StaffSection |
| Partner | ✅ | ✅ | ✅ | ✅ PartnerSection |
| Tenaga Pendidik | ⬜ | ⬜ | ⬜ | — |
| Program Studi | ✅ | ✅ | ✅ | ✅ AcademicProgram |
| Kegiatan Mahasiswa | ⬜ | ⬜ | ⬜ | — |

> **Catatan:** Kolom `urutan` (integer) wajib ada di semua tabel. Urutan tampilan dikontrol via tombol ↑↓ di admin page. Tabel yang sudah selesai (`tenaga_ahli`, `partner`) perlu migrasi ALTER TABLE.

---

## 1. Database Schema (Supabase)

### `tenaga_ahli` ✅ — perlu ALTER untuk tambah `urutan`
| Kolom | Tipe | Keterangan |
|---|---|---|
| id | uuid (PK) | auto-generated |
| nama | text | |
| jabatan | text | |
| foto_url | text | URL dari Supabase Storage |
| quotes | text | |
| urutan | integer | urutan tampilan, default = row number berdasarkan created_at |
| created_at | timestamptz | auto |

### `partner` ✅ — perlu ALTER untuk tambah `urutan`
| Kolom | Tipe | Keterangan |
|---|---|---|
| id | uuid (PK) | |
| nama | text | |
| urutan | integer | urutan tampilan |
| created_at | timestamptz | auto |

### `tenaga_pendidik`
| Kolom | Tipe | Keterangan |
|---|---|---|
| id | uuid (PK) | |
| nama | text | |
| jabatan | text | |
| foto_url | text | URL dari Supabase Storage |
| urutan | integer | urutan tampilan |
| created_at | timestamptz | auto |

### `program_studi`
| Kolom | Tipe | Keterangan |
|---|---|---|
| id | uuid (PK) | |
| slug | text (UNIQUE) | identifier URL, e.g. `akuntansi`, `manajemen` |
| nama | text | nama program studi |
| departemen | text | e.g. "Fakultas Ekonomi dan Bisnis" |
| deskripsi | text | |
| visi | text | |
| misi | jsonb | Array: `[{ nomor: number, keterangan: string }]` |
| statistik | jsonb | Array: `[{ nilai: string, keterangan: string }]` |
| foto_akreditasi_url | text | URL dari Supabase Storage |
| kaprodi_nama | text | nama kaprodi |
| kaprodi_posisi | text | jabatan kaprodi |
| kaprodi_foto_url | text | URL foto kaprodi (Supabase Storage) |
| kaprodi_quote | text | kutipan kaprodi |
| kaprodi_email | text | email kaprodi |
| kaprodi_telepon | text | nomor telepon kaprodi |
| urutan | integer | urutan tampilan |
| created_at | timestamptz | auto |

### `kegiatan_mahasiswa`
| Kolom | Tipe | Keterangan |
|---|---|---|
| id | uuid (PK) | |
| judul | text | |
| deskripsi | text | |
| foto_url | text | URL dari Supabase Storage |
| urutan | integer | urutan tampilan |
| created_at | timestamptz | auto |

---

## 2. Supabase Storage

Bucket **`media`** (public read, authenticated write) ✅ sudah dibuat.

```
media/
├── tenaga-ahli/       ✅
├── tenaga-pendidik/
├── program-studi/
└── kegiatan-mahasiswa/
```

> SQL migration dijalankan via Supabase Management API (tidak perlu manual).

---

## 3. Pola Teknis (Ditemukan Selama Build)

Pola ini wajib diikuti di semua modul yang tersisa:

### Form: Modal, bukan Slideover
Semua form tambah/edit menggunakan `UModal` + `UCard` (bukan `USlideover`).

### UTable: typing @nuxt/ui v4
```ts
import type { TableColumn } from '@nuxt/ui'

const columns: TableColumn<T>[] = [
  { id: 'kolom_custom', header: 'Label' },      // untuk kolom dengan slot custom
  { accessorKey: 'nama', header: 'Nama' },       // untuk kolom data langsung
]
```
Di dalam slot cell, akses data via `row.original`:
```html
<template #kolom_custom-cell="{ row }">
  {{ (row.original as T).field }}
</template>
```

### Public Components: useSupabasePublic
Komponen publik (bukan admin) wajib gunakan `useSupabasePublic()` agar aman di SSR:
```ts
const supabase = useSupabasePublic()
const { data } = await useAsyncData('key', () => supabase.from('...').select('*'))
```

### Seed Script
Setiap modul yang punya data existing di public component dibuat seed script di `scripts/`.
Seed menggunakan `SUPABASE_SERVICE_ROLE_KEY` dari `.env`.

### Ordering: tombol ↑↓ di admin page
Setiap tabel punya kolom `urutan` (integer). Di admin page, tiap baris punya tombol ↑ dan ↓.

**Mekanisme swap:**
- Tombol ↑: tukar nilai `urutan` baris ini dengan baris di atasnya
- Tombol ↓: tukar nilai `urutan` baris ini dengan baris di bawahnya
- Tombol ↑ di-disable pada baris pertama, ↓ di-disable pada baris terakhir

**Composable helper** `reorder(list, id, direction)`:
```ts
async function reorder(id: string, direction: 'up' | 'down'): Promise<void>
```
Mencari index baris saat ini, swap `urutan` dengan tetangga, lalu update dua baris ke Supabase.

**Saat insert baru:** `urutan = (MAX urutan existing) + 1`

**`getAll()` order by:** `.order('urutan', { ascending: true })`

**Public components** juga order by `urutan`.

---

## 4. File yang Akan Dibuat / Diubah

### Infrastruktur (sudah selesai ✅)
| File | Status |
|---|---|
| `app/composables/useSupabase.ts` | ✅ |
| `app/composables/useSupabasePublic.ts` | ✅ |
| `app/composables/useAdminAuth.ts` | ✅ |
| `app/composables/useStorage.ts` | ✅ |
| `app/components/Admin/ImageUpload/index.vue` | ✅ |
| `app/components/Admin/ConfirmModal/index.vue` | ✅ |
| `app/layouts/admin.vue` | ✅ sidebar navigasi |
| `app/pages/admin/index.vue` | ✅ dashboard cards |

### Tenaga Ahli & Pimpinan — perlu update ordering
| File | Status |
|---|---|
| `app/composables/useTenagaAhli.ts` | ✅ → perlu tambah `reorder()` + update `getAll()` + update `create()` |
| `app/pages/admin/tenaga-ahli/index.vue` | ✅ → perlu tambah kolom + tombol ↑↓ |
| `app/components/Organism/StaffSection/index.vue` | ✅ → ubah order ke `urutan` |
| `scripts/seed-tenaga-ahli.mjs` | ✅ → (seed ulang tidak diperlukan, cukup ALTER + UPDATE) |

### Partner — perlu update ordering
| File | Status |
|---|---|
| `app/composables/usePartner.ts` | ✅ → perlu tambah `reorder()` + update `getAll()` + update `create()` |
| `app/pages/admin/partner/index.vue` | ✅ → perlu tambah tombol ↑↓ |
| `app/components/Organism/PartnerSection/index.vue` | ✅ → ubah order ke `urutan` |

### Tenaga Pendidik
| File | Keterangan |
|---|---|
| `app/composables/useTenagaPendidik.ts` | ✅ CRUD + reorder |
| `app/pages/admin/tenaga-pendidik/index.vue` | ✅ Modal form + confirm delete + tombol ↑↓ |
| `app/pages/(public)/Profile/FacultyMembers.vue` | Perlu update: fetch dari Supabase (17 data hardcoded) |
| `scripts/seed-tenaga-pendidik.mjs` | Seed 17 data + upload foto dari `/img/faculty-members/` |

### Kegiatan Mahasiswa
| File | Keterangan |
|---|---|
| `app/composables/useKegiatanMahasiswa.ts` | ✅ CRUD + reorder |
| `app/pages/admin/kegiatan-mahasiswa/index.vue` | ✅ Modal form + confirm delete + tombol ↑↓ |
| `app/pages/(public)/Student/StudentActivities.vue` | Perlu update: fetch dari Supabase (11 data hardcoded) |
| `scripts/seed-kegiatan-mahasiswa.mjs` | Seed 11 data + upload foto dari `/img/kegiatan-kemahasiswaan/` |

### Program Studi
| File | Keterangan |
|---|---|
| `app/composables/useProgramStudi.ts` | CRUD + reorder |
| `app/components/Admin/ListItemEditor/index.vue` | Form dinamis misi & statistik |
| `app/pages/admin/program-studi/index.vue` | Modal form + confirm delete + tombol ↑↓ |
| `app/pages/(public)/AcademicProgram/index.vue` | Update: fetch dari Supabase, ganti hardcoded data |
| `scripts/seed-program-studi.mjs` | Seed 2 data existing (akuntansi + manajemen) termasuk kaprodi & foto akreditasi |

---

## 5. Detail: Form Program Studi

Form dibagi menjadi beberapa section di dalam satu modal yang bisa di-scroll:

**Section 1 — Info Umum:**
- Slug (text, unique, lowercase)
- Nama Program Studi
- Departemen
- Deskripsi
- Visi

**Section 2 — Misi** (menggunakan `Admin/ListItemEditor`):
```
[ No. ] [ Keterangan                    ] [ Hapus ]
[  1  ] [ Menjadi institusi terkemuka   ] [  ×  ]
                                  [ + Tambah Misi ]
```

**Section 3 — Statistik** (menggunakan `Admin/ListItemEditor`):
```
[ Nilai  ] [ Keterangan   ] [ Hapus ]
[ 200+   ] [ Mahasiswa    ] [  ×  ]
                         [ + Tambah Statistik ]
```

**Section 4 — Kaprodi:**
- Foto Kaprodi (AdminImageUpload, folder: `program-studi/kaprodi`)
- Nama Kaprodi
- Posisi
- Quote
- Email
- Telepon

**Section 5 — Akreditasi:**
- Foto Akreditasi (AdminImageUpload, folder: `program-studi/akreditasi`)

---

## 6. Urutan Pengerjaan Sisa

1. **Migrasi ordering** — ALTER TABLE `tenaga_ahli` + `partner`, backfill nilai `urutan`, update composable + admin page + public component untuk kedua modul yang sudah jadi
2. **Tenaga Pendidik** — tabel (dengan `urutan`) + admin page + tombol ↑↓
3. **Program Studi** — tabel + ListItemEditor + admin page + tombol ↑↓
4. **Kegiatan Mahasiswa** — tabel + admin page + tombol ↑↓

---

## Jawaban Konfirmasi

- [x] **SQL migration** → dikerjakan via Supabase Management API
- [x] **Misi & Statistik** → form dinamis tambah/hapus baris
- [x] **Form edit/tambah** → modal (bukan slideover)
- [x] **Ordering** → kolom `urutan` integer di semua tabel, tombol ↑↓ di admin, order by urutan di public
