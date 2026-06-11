# Supabase Schema & Migration Guide

Dokumen ini adalah **sumber kebenaran tunggal** untuk seluruh konfigurasi Supabase proyek STIE Taman Siswa Jakarta.

## Aturan Wajib

> **Setiap kali ada perubahan pada database** (tabel baru, kolom baru, perubahan RLS, perubahan storage policy) — dokumen ini **HARUS diperbarui** bersamaan dengan perubahan tersebut. Tanpa pengecualian.

Ketika Claude diminta setup database di akun Supabase baru, cukup jalankan semua SQL di dokumen ini secara berurutan.

---

## Langkah Migrasi ke Akun Supabase Baru

### 1. Buat Project Baru

1. Login ke [supabase.com](https://supabase.com) dengan akun baru
2. Klik **New Project**, isi nama dan password database
3. Tunggu project selesai dibuat (~2 menit)
4. Catat:
   - **Project URL**: `https://<ref>.supabase.co`
   - **Anon Key**: dari Settings → API
   - **Service Role Key**: dari Settings → API (jangan share ke publik)
   - **Project Ref**: bagian `<ref>` dari URL
   - **Management API PAT**: dari Account → Access Tokens (buat baru)

### 2. Update Environment Variables

Edit file `.env` di root project:

```env
NUXT_PUBLIC_SUPABASE_URL=https://<ref-baru>.supabase.co
NUXT_PUBLIC_SUPABASE_ANON_KEY=<anon-key-baru>
SUPABASE_SERVICE_ROLE_KEY=<service-role-key-baru>
```

### 3. Jalankan SQL Schema

Buka **SQL Editor** di Supabase dashboard (atau gunakan Management API), lalu jalankan SQL berikut **secara berurutan**:

#### 3a. Buat semua tabel

```sql
-- ── BANNER ───────────────────────────────────────────────────
CREATE TABLE banner (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  foto_url   text NOT NULL,
  urutan     integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ── TENAGA AHLI ──────────────────────────────────────────────
CREATE TABLE tenaga_ahli (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nama       text NOT NULL,
  jabatan    text NOT NULL,
  foto_url   text,
  quotes     text,
  urutan     integer,
  created_at timestamptz DEFAULT now()
);

-- ── TENAGA PENDIDIK ───────────────────────────────────────────
CREATE TABLE tenaga_pendidik (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nama       text NOT NULL,
  jabatan    text NOT NULL,
  foto_url   text,
  urutan     integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ── PARTNER ───────────────────────────────────────────────────
CREATE TABLE partner (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nama       text NOT NULL,
  urutan     integer,
  created_at timestamptz DEFAULT now()
);

-- ── KEGIATAN MAHASISWA ────────────────────────────────────────
CREATE TABLE kegiatan_mahasiswa (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  judul      text NOT NULL,
  deskripsi  text,
  foto_url   text,
  urutan     integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

-- ── PROGRAM STUDI ─────────────────────────────────────────────
CREATE TABLE program_studi (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug                text NOT NULL UNIQUE,
  nama                text NOT NULL,
  departemen          text,
  deskripsi           text,
  visi                text,
  misi                jsonb NOT NULL DEFAULT '[]',
  statistik           jsonb NOT NULL DEFAULT '[]',
  foto_akreditasi_url text,
  kaprodi_nama        text,
  kaprodi_posisi      text,
  kaprodi_foto_url    text,
  kaprodi_quote       text,
  kaprodi_email       text,
  kaprodi_telepon     text,
  urutan              integer NOT NULL DEFAULT 0,
  created_at          timestamptz NOT NULL DEFAULT now()
);

-- ── PMB: PENDAFTAR (parent) ───────────────────────────────────
CREATE TABLE pmb_pendaftar (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nomor_pendaftaran   varchar(6),        -- diisi otomatis oleh trigger, format YYnnnn mis. 260001
  tipe                text NOT NULL,     -- 'baru' | 'pindahan'
  status              text NOT NULL DEFAULT 'menunggu_verifikasi', -- 'menunggu_verifikasi' | 'diterima' | 'ditolak'
  catatan_admin       text,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);

-- Trigger untuk auto-generate nomor_pendaftaran (format YYnnnn, mis. 260001)
CREATE OR REPLACE FUNCTION set_nomor_pendaftaran()
RETURNS TRIGGER AS $$
DECLARE
  year_prefix text;
  next_seq    int;
BEGIN
  year_prefix := to_char(NOW(), 'YY');
  SELECT COALESCE(MAX(RIGHT(nomor_pendaftaran, 4)::int), 0) + 1
    INTO next_seq
    FROM pmb_pendaftar
   WHERE nomor_pendaftaran LIKE year_prefix || '%';
  NEW.nomor_pendaftaran := year_prefix || LPAD(next_seq::text, 4, '0');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_set_nomor_pendaftaran
BEFORE INSERT ON pmb_pendaftar
FOR EACH ROW EXECUTE FUNCTION set_nomor_pendaftaran();

-- ── PMB: MAHASISWA BARU ───────────────────────────────────────
CREATE TABLE pmb_baru (
  id                        uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pendaftar_id              uuid NOT NULL REFERENCES pmb_pendaftar(id),
  -- Data Calon Mahasiswi
  nama                      text NOT NULL,
  jenis_kelamin             text NOT NULL,
  agama                     text NOT NULL,
  program_studi             text NOT NULL,
  nisn                      text NOT NULL,
  nik                       text NOT NULL,
  tempat_lahir              text NOT NULL,
  tanggal_lahir             date NOT NULL,
  alamat_domisili           text NOT NULL,
  status_pernikahan         text NOT NULL,
  status_pernikahan_lainnya text,
  pekerjaan                 text NOT NULL,
  no_hp                     text NOT NULL,
  -- Data Akademik
  nama_sma                  text NOT NULL,
  jurusan_sma               text,
  tahun_masuk_sma           integer NOT NULL,
  tahun_lulus_sma           integer NOT NULL,
  -- Data Orang Tua / Wali
  nama_ibu_kandung          text NOT NULL,
  nama_wali                 text NOT NULL,
  no_hp_wali                text NOT NULL,
  pekerjaan_ayah            text NOT NULL,
  penghasilan_rata_rata     text NOT NULL,
  -- Upload Berkas
  berkas_ijazah_url         text,          -- opsional (belum lulus)
  berkas_ktp_url            text NOT NULL,
  berkas_kk_url             text NOT NULL,
  berkas_akte_url           text NOT NULL
);

-- Kolom tambahan pmb_baru (ditambah via ALTER TABLE setelah initial create)
ALTER TABLE pmb_baru ADD COLUMN IF NOT EXISTS nama_ayah_kandung text NOT NULL DEFAULT '';
ALTER TABLE pmb_baru ADD COLUMN IF NOT EXISTS no_hp_ortu        text NOT NULL DEFAULT '';
ALTER TABLE pmb_baru ADD COLUMN IF NOT EXISTS pekerjaan_ibu     text NOT NULL DEFAULT '';
ALTER TABLE pmb_baru ADD COLUMN IF NOT EXISTS pekerjaan_wali    text NOT NULL DEFAULT '';

-- ── PMB: MAHASISWA PINDAHAN ───────────────────────────────────
CREATE TABLE pmb_pindahan (
  id                        uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pendaftar_id              uuid NOT NULL REFERENCES pmb_pendaftar(id),
  -- Data Mahasiswi
  nama                      text NOT NULL,
  jenis_kelamin             text NOT NULL,
  nik                       text NOT NULL,
  nim_lama                  text NOT NULL,
  tempat_lahir              text NOT NULL,
  tanggal_lahir             date NOT NULL,
  agama                     text NOT NULL,
  status_pernikahan         text NOT NULL,
  status_pernikahan_lainnya text,
  pekerjaan                 text NOT NULL,
  no_hp                     text NOT NULL,
  -- Data Akademik Kampus Sebelumnya
  nama_kampus_lama          text NOT NULL,
  program_studi_lama        text NOT NULL,
  tahun_masuk_lama          integer NOT NULL,
  -- Upload Berkas (semua wajib)
  berkas_surat_mutasi_url   text NOT NULL,
  berkas_transkrip_url      text NOT NULL,
  berkas_biodata_pp_kti_url text NOT NULL,
  berkas_kta_url            text NOT NULL,
  berkas_kk_url             text NOT NULL,
  berkas_akte_url           text NOT NULL
);

-- Kolom tambahan pmb_pindahan (ditambah via ALTER TABLE setelah initial create)
ALTER TABLE pmb_pindahan ADD COLUMN IF NOT EXISTS nisn           text NOT NULL DEFAULT '';
ALTER TABLE pmb_pindahan ADD COLUMN IF NOT EXISTS alamat_domisili text NOT NULL DEFAULT '';
ALTER TABLE pmb_pindahan ADD COLUMN IF NOT EXISTS program_studi  text NOT NULL DEFAULT '';
```

#### 3b. Aktifkan Row Level Security (RLS)

```sql
ALTER TABLE banner             ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenaga_ahli        ENABLE ROW LEVEL SECURITY;
ALTER TABLE tenaga_pendidik    ENABLE ROW LEVEL SECURITY;
ALTER TABLE partner            ENABLE ROW LEVEL SECURITY;
ALTER TABLE kegiatan_mahasiswa ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_studi      ENABLE ROW LEVEL SECURITY;
ALTER TABLE pmb_pendaftar      ENABLE ROW LEVEL SECURITY;
ALTER TABLE pmb_baru           ENABLE ROW LEVEL SECURITY;
ALTER TABLE pmb_pindahan       ENABLE ROW LEVEL SECURITY;
```

#### 3c. Buat RLS Policies — Tabel Konten (baca publik, tulis admin)

```sql
-- banner
CREATE POLICY "public read banner"
  ON banner FOR SELECT USING (true);
CREATE POLICY "auth all banner"
  ON banner FOR ALL USING (auth.role() = 'authenticated');

-- tenaga_ahli
CREATE POLICY "public read tenaga_ahli"
  ON tenaga_ahli FOR SELECT USING (true);
CREATE POLICY "auth all tenaga_ahli"
  ON tenaga_ahli FOR ALL USING (auth.role() = 'authenticated');

-- tenaga_pendidik
CREATE POLICY "public read"
  ON tenaga_pendidik FOR SELECT USING (true);
CREATE POLICY "auth write"
  ON tenaga_pendidik FOR ALL USING (auth.role() = 'authenticated');

-- partner
CREATE POLICY "public read partner"
  ON partner FOR SELECT USING (true);
CREATE POLICY "auth all partner"
  ON partner FOR ALL USING (auth.role() = 'authenticated');

-- kegiatan_mahasiswa
CREATE POLICY "public read"
  ON kegiatan_mahasiswa FOR SELECT USING (true);
CREATE POLICY "auth write"
  ON kegiatan_mahasiswa FOR ALL USING (auth.role() = 'authenticated');

-- program_studi
CREATE POLICY "public read"
  ON program_studi FOR SELECT USING (true);
CREATE POLICY "auth write"
  ON program_studi FOR ALL USING (auth.role() = 'authenticated');
```

#### 3d. Buat RLS Policies — Tabel PMB (insert publik, baca/ubah admin)

```sql
-- pmb_pendaftar
CREATE POLICY "public insert"
  ON pmb_pendaftar FOR INSERT WITH CHECK (true);
CREATE POLICY "auth all"
  ON pmb_pendaftar FOR ALL USING (auth.role() = 'authenticated');

-- pmb_baru
CREATE POLICY "public insert"
  ON pmb_baru FOR INSERT WITH CHECK (true);
CREATE POLICY "auth all"
  ON pmb_baru FOR ALL USING (auth.role() = 'authenticated');

-- pmb_pindahan
CREATE POLICY "public insert"
  ON pmb_pindahan FOR INSERT WITH CHECK (true);
CREATE POLICY "auth all"
  ON pmb_pindahan FOR ALL USING (auth.role() = 'authenticated');
```

### 4. Buat Storage Bucket

Di SQL Editor, jalankan:

```sql
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true);
```

Atau lewat Supabase dashboard: **Storage → New Bucket**, nama `media`, centang **Public bucket**.

### 5. Buat Storage Policies

```sql
-- Siapapun bisa membaca file (public bucket)
CREATE POLICY "public read media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'media');

-- Hanya admin yang bisa upload file umum
CREATE POLICY "auth upload media"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'media' AND auth.role() = 'authenticated');

-- Siapapun bisa upload ke folder pmb/ (untuk form pendaftaran)
CREATE POLICY "public upload pmb"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'media' AND (storage.foldername(name))[1] = 'pmb');

-- Hanya admin yang bisa menghapus file
CREATE POLICY "auth delete media"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'media' AND auth.role() = 'authenticated');
```

### 6. Buat Admin User

Di Supabase dashboard: **Authentication → Users → Add User**, masukkan email dan password admin.

Atau via API:
```bash
curl -X POST 'https://<ref>.supabase.co/auth/v1/admin/users' \
  -H "apikey: <service-role-key>" \
  -H "Authorization: Bearer <service-role-key>" \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@example.com","password":"ganti-password-ini","email_confirm":true}'
```

### 7. Jalankan Seed Scripts

Seed scripts mengisi data awal dari file gambar di `public/img/`:

```bash
node scripts/seed-tenaga-ahli.mjs
node scripts/seed-tenaga-pendidik.mjs
node scripts/seed-partner.mjs
node scripts/seed-kegiatan-mahasiswa.mjs
node scripts/seed-program-studi.mjs
```

> **Catatan:** Seed scripts memerlukan `SUPABASE_SERVICE_ROLE_KEY` di `.env` dan file gambar di folder `public/img/`.

---

## Struktur Storage Bucket `media`

```
media/
├── banner/               # gambar banner hero section
├── tenaga-ahli/          # foto tenaga ahli & pimpinan
├── tenaga-pendidik/      # foto tenaga pendidik
├── partner/              # logo partner (jika ada)
├── program-studi/
│   ├── kaprodi/          # foto ketua program studi
│   └── akreditasi/       # foto sertifikat akreditasi
└── pmb/
    ├── baru/<pendaftar_id>/    # berkas pendaftar baru (ktp, kk, akte, ijazah)
    └── pindahan/<pendaftar_id>/ # berkas pendaftar pindahan
```

---

## Skema Database Lengkap

### `banner`

| Kolom       | Tipe        | Null | Default              | Keterangan             |
|-------------|-------------|------|----------------------|------------------------|
| id          | uuid        | NO   | gen_random_uuid()    | PK                     |
| foto_url    | text        | NO   |                      | URL dari storage media |
| urutan      | integer     | NO   | 0                    | Urutan tampil          |
| created_at  | timestamptz | NO   | now()                |                        |

**RLS:** public SELECT, authenticated ALL

---

### `tenaga_ahli`

| Kolom       | Tipe        | Null | Default              | Keterangan             |
|-------------|-------------|------|----------------------|------------------------|
| id          | uuid        | NO   | gen_random_uuid()    | PK                     |
| nama        | text        | NO   |                      |                        |
| jabatan     | text        | NO   |                      |                        |
| foto_url    | text        | YES  |                      | URL dari storage media |
| quotes      | text        | YES  |                      |                        |
| urutan      | integer     | YES  |                      | Urutan tampil          |
| created_at  | timestamptz | YES  | now()                |                        |

**RLS:** public SELECT, authenticated ALL

---

### `tenaga_pendidik`

| Kolom       | Tipe        | Null | Default              | Keterangan             |
|-------------|-------------|------|----------------------|------------------------|
| id          | uuid        | NO   | gen_random_uuid()    | PK                     |
| nama        | text        | NO   |                      |                        |
| jabatan     | text        | NO   |                      |                        |
| foto_url    | text        | YES  |                      | URL dari storage media |
| urutan      | integer     | NO   | 0                    | Urutan tampil          |
| created_at  | timestamptz | NO   | now()                |                        |

**RLS:** public SELECT, authenticated ALL

---

### `partner`

| Kolom       | Tipe        | Null | Default              | Keterangan   |
|-------------|-------------|------|----------------------|--------------|
| id          | uuid        | NO   | gen_random_uuid()    | PK           |
| nama        | text        | NO   |                      | Nama partner |
| urutan      | integer     | YES  |                      |              |
| created_at  | timestamptz | YES  | now()                |              |

**RLS:** public SELECT, authenticated ALL

---

### `kegiatan_mahasiswa`

| Kolom       | Tipe        | Null | Default              | Keterangan             |
|-------------|-------------|------|----------------------|------------------------|
| id          | uuid        | NO   | gen_random_uuid()    | PK                     |
| judul       | text        | NO   |                      |                        |
| deskripsi   | text        | YES  |                      |                        |
| foto_url    | text        | YES  |                      | URL dari storage media |
| urutan      | integer     | NO   | 0                    | Urutan tampil          |
| created_at  | timestamptz | NO   | now()                |                        |

**RLS:** public SELECT, authenticated ALL

---

### `program_studi`

| Kolom                | Tipe        | Null | Default           | Keterangan                                     |
|----------------------|-------------|------|-------------------|------------------------------------------------|
| id                   | uuid        | NO   | gen_random_uuid() | PK                                             |
| slug                 | text        | NO   |                   | UNIQUE — digunakan di URL (`/program-studi/:slug`) |
| nama                 | text        | NO   |                   | e.g. "S1 Manajemen"                           |
| departemen           | text        | YES  |                   |                                                |
| deskripsi            | text        | YES  |                   |                                                |
| visi                 | text        | YES  |                   |                                                |
| misi                 | jsonb       | NO   | `[]`              | Array of `{nomor: number, keterangan: string}` |
| statistik            | jsonb       | NO   | `[]`              | Array of `{nilai: string, keterangan: string}` |
| foto_akreditasi_url  | text        | YES  |                   |                                                |
| kaprodi_nama         | text        | YES  |                   |                                                |
| kaprodi_posisi       | text        | YES  |                   |                                                |
| kaprodi_foto_url     | text        | YES  |                   |                                                |
| kaprodi_quote        | text        | YES  |                   |                                                |
| kaprodi_email        | text        | YES  |                   |                                                |
| kaprodi_telepon      | text        | YES  |                   |                                                |
| urutan               | integer     | NO   | 0                 | Urutan tampil                                  |
| created_at           | timestamptz | NO   | now()             |                                                |

**RLS:** public SELECT, authenticated ALL

---

### `pmb_pendaftar` (parent)

| Kolom                | Tipe        | Null | Default           | Keterangan                                                    |
|----------------------|-------------|------|-------------------|---------------------------------------------------------------|
| id                   | uuid        | NO   | gen_random_uuid() | PK                                                            |
| nomor_pendaftaran    | varchar(6)  | YES  | trigger           | Auto-generate format `YYnnnn` mis. `260001`. Trigger `trg_set_nomor_pendaftaran` |
| tipe                 | text        | NO   |                   | `'baru'` atau `'pindahan'`                                    |
| status               | text        | NO   | `'menunggu_verifikasi'` | `'menunggu_verifikasi'` / `'diterima'` / `'ditolak'`    |
| catatan_admin        | text        | YES  |                   | Catatan internal admin, tidak ditampilkan ke user             |
| created_at           | timestamptz | NO   | now()             |                                                               |
| updated_at           | timestamptz | NO   | now()             |                                                               |

**RLS:** public INSERT, authenticated ALL

---

### `pmb_baru` (FK → pmb_pendaftar)

| Kolom                     | Tipe    | Null | Keterangan                             |
|---------------------------|---------|------|----------------------------------------|
| id                        | uuid    | NO   | PK                                     |
| pendaftar_id              | uuid    | NO   | FK → pmb_pendaftar.id                  |
| nama                      | text    | NO   |                                        |
| jenis_kelamin             | text    | NO   | `'Laki-Laki'` / `'Perempuan'`          |
| agama                     | text    | NO   |                                        |
| program_studi             | text    | NO   | `'manajemen'` / `'akuntansi'`          |
| nisn                      | text    | NO   | Nomor Induk Siswa Nasional             |
| nik                       | text    | NO   | Nomor Induk Kependudukan               |
| tempat_lahir              | text    | NO   |                                        |
| tanggal_lahir             | date    | NO   |                                        |
| alamat_domisili           | text    | NO   |                                        |
| status_pernikahan         | text    | NO   | `'lajang'` / `'menikah'` / `'lainnya'` |
| status_pernikahan_lainnya | text    | YES  | Diisi jika status = `'lainnya'`        |
| pekerjaan                 | text    | NO   |                                        |
| no_hp                     | text    | NO   |                                        |
| nama_sma                  | text    | NO   |                                        |
| jurusan_sma               | text    | YES  | Opsional (IPA/IPS)                     |
| tahun_masuk_sma           | integer | NO   |                                        |
| tahun_lulus_sma           | integer | NO   |                                        |
| nama_ibu_kandung          | text    | NO   |                                        |
| nama_wali                 | text    | NO   |                                        |
| no_hp_wali                | text    | NO   | Nomor HP wali                          |
| pekerjaan_ayah            | text    | NO   |                                        |
| nama_ayah_kandung         | text    | NO   | Default `''` — ditambah via ALTER TABLE |
| no_hp_ortu                | text    | NO   | Nomor HP orang tua. Default `''` — ditambah via ALTER TABLE |
| pekerjaan_ibu             | text    | NO   | Default `''` — ditambah via ALTER TABLE |
| pekerjaan_wali            | text    | NO   | Default `''` — ditambah via ALTER TABLE |
| penghasilan_rata_rata     | text    | NO   | Teks bebas, mis. "Rp 3.000.000"        |
| berkas_ijazah_url         | text    | YES  | Opsional — untuk yang belum lulus      |
| berkas_ktp_url            | text    | NO   |                                        |
| berkas_kk_url             | text    | NO   |                                        |
| berkas_akte_url           | text    | NO   |                                        |

**RLS:** public INSERT, authenticated ALL

---

### `pmb_pindahan` (FK → pmb_pendaftar)

| Kolom                     | Tipe    | Null | Keterangan                             |
|---------------------------|---------|------|----------------------------------------|
| id                        | uuid    | NO   | PK                                     |
| pendaftar_id              | uuid    | NO   | FK → pmb_pendaftar.id                  |
| nama                      | text    | NO   |                                        |
| jenis_kelamin             | text    | NO   |                                        |
| nik                       | text    | NO   |                                        |
| nim_lama                  | text    | NO   | NIM/NPM dari kampus sebelumnya         |
| tempat_lahir              | text    | NO   |                                        |
| tanggal_lahir             | date    | NO   |                                        |
| agama                     | text    | NO   |                                        |
| status_pernikahan         | text    | NO   |                                        |
| nisn                      | text    | NO   | Nomor Induk Siswa Nasional. Default `''` — ditambah via ALTER TABLE |
| alamat_domisili           | text    | NO   | Default `''` — ditambah via ALTER TABLE |
| program_studi             | text    | NO   | `'manajemen'` / `'akuntansi'`. Default `''` — ditambah via ALTER TABLE |
| status_pernikahan_lainnya | text    | YES  |                                        |
| pekerjaan                 | text    | NO   |                                        |
| no_hp                     | text    | NO   |                                        |
| nama_kampus_lama          | text    | NO   |                                        |
| program_studi_lama        | text    | NO   |                                        |
| tahun_masuk_lama          | integer | NO   |                                        |
| berkas_surat_mutasi_url   | text    | NO   | Surat mutasi dari kampus sebelumnya    |
| berkas_transkrip_url      | text    | NO   | Transkrip nilai kampus sebelumnya      |
| berkas_biodata_pp_kti_url | text    | NO   | Printout biodata PP/KTI                |
| berkas_kta_url            | text    | NO   | KTA/KTM kampus lama                    |
| berkas_kk_url             | text    | NO   |                                        |
| berkas_akte_url           | text    | NO   |                                        |

**RLS:** public INSERT, authenticated ALL

---

## Storage Policies Ringkasan

| Policy Name        | Operasi | Kondisi                                           | Tujuan                               |
|--------------------|---------|---------------------------------------------------|--------------------------------------|
| public read media  | SELECT  | `bucket_id = 'media'`                             | Semua file bisa dibaca publik        |
| auth upload media  | INSERT  | `bucket_id = 'media'` + authenticated             | Admin bisa upload file (via dashboard/seed) |
| public upload pmb  | INSERT  | `bucket_id = 'media'` + folder pertama = `'pmb'`  | Form PMB bisa upload berkas          |
| auth delete media  | DELETE  | `bucket_id = 'media'` + authenticated             | Hanya admin yang bisa hapus file     |

---

## Checklist Migrasi

- [ ] Project Supabase baru dibuat
- [ ] File `.env` diperbarui dengan URL dan key baru
- [ ] SQL Schema dijalankan (tabel + RLS + storage bucket + storage policies)
- [ ] Admin user dibuat di Authentication
- [ ] Seed scripts dijalankan (tenaga ahli, tenaga pendidik, partner, kegiatan, program studi)
- [ ] Test: halaman publik tampil data dari DB
- [ ] Test: login admin berhasil
- [ ] Test: CRUD di semua modul admin berfungsi
- [ ] Test: form PMB baru bisa submit + upload berkas
- [ ] Test: form PMB pindahan bisa submit + upload berkas
- [ ] Test: admin bisa lihat dan ubah status pendaftaran
