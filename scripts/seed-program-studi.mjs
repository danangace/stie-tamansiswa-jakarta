import { createClient } from '@supabase/supabase-js'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { config } from 'dotenv'
import { readFileSync } from 'fs'

const __dirname = dirname(fileURLToPath(import.meta.url))
config({ path: resolve(__dirname, '../.env') })

const supabase = createClient(
  process.env.NUXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
)

async function uploadFile(localPath, storagePath) {
  const buffer = readFileSync(localPath)
  const { error } = await supabase.storage
    .from('media')
    .upload(storagePath, buffer, { contentType: 'image/jpeg', upsert: true })
  if (error) throw new Error(`Upload gagal (${storagePath}): ${error.message}`)
  const { data } = supabase.storage.from('media').getPublicUrl(storagePath)
  return data.publicUrl
}

const programStudi = [
  {
    slug: 'akuntansi',
    nama: 'Akuntansi',
    departemen: 'Fakultas Ekonomi dan Bisnis',
    deskripsi: 'Program studi Akuntansi yang menghasilkan lulusan profesional.',
    visi: 'Pada tahun 2025, menjadi Program Studi yang menghasilkan lulusan yang mampu menyinergikan perkembangan Ilmu Akuntansi dengan perkembangan Teknologi Informasi dan mengembangkan jiwa wirausaha berdasarkan prinsip ketamansiswaan',
    misi: [
      { nomor: 1, keterangan: 'Menyelenggarakan Pendidikan dan pengajaran dengan menghasilkan lulusan yang mampu menyinergikan perkembangan ilmu akuntasi dengan perkembangan teknologi informasi dan mengembangkan jiwa wirausaha berdasarkan prinsip ketamansiswaan' },
      { nomor: 2, keterangan: 'Menyelenggarakan kegiatan penelitian secara kreatif dan inovatif untuk menyinergikan perkembangan ilmu Akuntansi dengan perkembangan teknologi informasi dan mengembangkan jiwa wirausaha berdasarkan prinsip ketamansiswaan' },
      { nomor: 3, keterangan: 'Menyelenggarakan kegiatan pengabdian masyarakat yang berbasis pada sinerginya perkembangan ilmu Akuntansi dengan perkembangan teknologi informasi dan mengembangkan jiwa wirausaha berdasarkan prinsip ketamansiswaan' },
      { nomor: 4, keterangan: 'Melakukan kerjasama baik dalam dan luar negeri guna mendukung kegiatan tridharma perguruan tinggi' },
    ],
    statistik: [
      { nilai: '50+', keterangan: 'Mahasiswa Aktif' },
      { nilai: '5', keterangan: 'Dosen Tetap' },
      { nilai: '2K+', keterangan: 'Alumni' },
      { nilai: '5+', keterangan: 'Mitra Industri' },
    ],
    kaprodi_nama: 'Ika Baskara, S.E., M.M.',
    kaprodi_posisi: 'Ketua Program Studi Akuntansi',
    kaprodi_quote: 'Akuntansi yang Profesional dan Beretika.',
    kaprodi_email: 'baskaraika@gmail.com',
    kaprodi_telepon: '+62 812-8462-191',
    kaprodiFile: 'ketua-akuntansi.jpeg',
    akreditasiFile: 'banpt-akuntansi.jpeg',
    urutan: 1,
  },
  {
    slug: 'manajemen',
    nama: 'Manajemen',
    departemen: 'Fakultas Ekonomi dan Bisnis',
    deskripsi: 'Program studi Manajemen berfokus pada kepemimpinan.',
    visi: 'Pada tahun 2025, menjadi Program Studi yang menghasilkan lulusan yang mampu menyinergikan perkembangan ilmu Manajemen dengan perkembangan Teknologi Informasi dan mengembangkan jiwa wirausaha berdasarkan ketamansiswaan',
    misi: [
      { nomor: 1, keterangan: 'Menyelenggarakan pendidikan dan pengajaran dengan menghasilkan lulusan yang mampu menyinergikan perkembangan ilmu manajemen dengan perkembangan teknologi informasi dan mengembangkan jiwa wirausaha berdasarkan prinsip ketamansiswaan' },
      { nomor: 2, keterangan: 'Menyelenggarakan kegiatan penelitian secara kreatif dan inovatif untuk menyinergikan perkembangan ilmu manajemen dengan perkembangan teknologi informasi dan mengembangkan jiwa wirausaha berdasarkan prinsip ketamansiswaan' },
      { nomor: 3, keterangan: 'Menyelenggarakan kegiatan pengabdian masyarakat yang berbasis pada sinerginya perkembangan ilmu manajemen dengan perkembangan teknologi informasi dan mengembangkan jiwa wirausaha berdasarkan prinsip ketamansiswaan' },
      { nomor: 4, keterangan: 'Melakukan kerjasama baik dalam dan luar negeri guna mendukung kegiatan tridharma perguruan tinggi' },
    ],
    statistik: [
      { nilai: '200+', keterangan: 'Mahasiswa Aktif' },
      { nilai: '5', keterangan: 'Dosen Tetap' },
      { nilai: '3K+', keterangan: 'Alumni' },
      { nilai: '10+', keterangan: 'Mitra Industri' },
    ],
    kaprodi_nama: 'Ir. Tukirin, M.M.',
    kaprodi_posisi: 'Ketua Program Studi Manajemen',
    kaprodi_quote: 'Perbaikan Terus-Menerus untuk Kemajuan Bersama.',
    kaprodi_email: 'budiansharitukirin@gmail.com',
    kaprodi_telepon: '+62 818-891-517',
    kaprodiFile: 'ketua-manajemen.jpeg',
    akreditasiFile: 'banpt-manajemen.jpeg',
    urutan: 2,
  },
]

async function run() {
  console.log('🚀 Memulai seed program_studi...\n')

  await supabase.from('program_studi').delete().neq('id', '00000000-0000-0000-0000-000000000000')

  for (const prodi of programStudi) {
    console.log(`\n📚 "${prodi.nama}"`)

    process.stdout.write('   📸 Upload foto kaprodi... ')
    const kaprodi_foto_url = await uploadFile(
      resolve(__dirname, `../public/img/${prodi.kaprodiFile}`),
      `program-studi/kaprodi/${prodi.kaprodiFile}`,
    )
    console.log('✓')

    process.stdout.write('   📸 Upload foto akreditasi... ')
    const foto_akreditasi_url = await uploadFile(
      resolve(__dirname, `../public/img/${prodi.akreditasiFile}`),
      `program-studi/akreditasi/${prodi.akreditasiFile}`,
    )
    console.log('✓')

    process.stdout.write('   💾 Insert ke database... ')
    const { error } = await supabase.from('program_studi').insert({
      slug: prodi.slug,
      nama: prodi.nama,
      departemen: prodi.departemen,
      deskripsi: prodi.deskripsi,
      visi: prodi.visi,
      misi: prodi.misi,
      statistik: prodi.statistik,
      kaprodi_nama: prodi.kaprodi_nama,
      kaprodi_posisi: prodi.kaprodi_posisi,
      kaprodi_quote: prodi.kaprodi_quote,
      kaprodi_email: prodi.kaprodi_email,
      kaprodi_telepon: prodi.kaprodi_telepon,
      kaprodi_foto_url,
      foto_akreditasi_url,
      urutan: prodi.urutan,
    })
    if (error) throw new Error(`Insert gagal: ${error.message}`)
    console.log('✓')
  }

  console.log(`\n✅ Selesai! ${programStudi.length} data program studi berhasil disimpan.`)
}

run().catch((err) => {
  console.error('\n❌ Error:', err.message)
  process.exit(1)
})
