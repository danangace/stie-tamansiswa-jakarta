# Plan: Dynamic Banner dari Dashboard Admin

**Tanggal:** 2026-06-11  
**Status:** Menunggu Approval

---

## Overview

Banner beranda saat ini hardcoded ke `/img/banner-1.png`. Kita pindahkan ke database agar admin bisa tambah/hapus/reorder banner lewat dashboard. Beranda akan menampilkan slider otomatis dari semua banner aktif.

---

## Database

### Tabel baru: `banner`

```sql
CREATE TABLE banner (
  id         uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  foto_url   text NOT NULL,
  urutan     integer NOT NULL DEFAULT 0,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE banner ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read banner" ON banner FOR SELECT USING (true);
CREATE POLICY "auth all banner"    ON banner FOR ALL USING (auth.role() = 'authenticated');
```

Storage: gambar banner disimpan di bucket `media` folder `banner/`.

---

## Files

| File | Aksi |
|------|------|
| `app/composables/useBanner.ts` | Baru — CRUD banner + upload foto |
| `app/pages/admin/banner/index.vue` | Baru — halaman admin manage banner |
| `app/components/Organism/HeroSection/index.vue` | Update — fetch dari DB |
| `app/layouts/admin.vue` | Update — tambah menu Banner di sidebar |
| `requirements/supabase-schema.md` | Update — tambah tabel banner |

---

## Composable `useBanner`

```ts
interface Banner { id, foto_url, urutan, created_at }
type BannerForm = { foto_url: string }

getAll()       // SELECT * ORDER BY urutan ASC
create(foto)   // upload + INSERT
remove(id)     // DELETE + hapus file dari storage
reorder(...)   // sama dengan usePartner
```

---

## Admin page `/admin/banner`

- Tabel: No | Preview (thumbnail) | Actions (↑ ↓ hapus)
- Tombol "Tambah Banner" → modal upload gambar (JPG/PNG/WEBP, maks 5MB)
- Tidak ada edit — jika ingin ganti, hapus lalu tambah baru
- Reorder dengan tombol ↑ ↓

---

## HeroSection

Ganti dari array statis ke `useAsyncData` fetch dari Supabase public:

```ts
const { data: banners } = await useAsyncData('banners', () =>
  useSupabasePublic().from('banner').select('foto_url').order('urutan')
)
const items = computed(() => banners.value?.map(b => b.foto_url) ?? ['/img/banner-1.png'])
```

Fallback ke banner-1.png jika DB kosong.

---

## Storage

Folder `media/banner/` — sudah ter-cover oleh policy `public read media` dan `auth upload media` yang ada.
