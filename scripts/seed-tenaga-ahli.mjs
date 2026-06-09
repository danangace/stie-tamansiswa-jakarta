import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { config } from 'dotenv'

const __dirname = dirname(fileURLToPath(import.meta.url))
config({ path: resolve(__dirname, '../.env') })

const SUPABASE_URL = process.env.NUXT_PUBLIC_SUPABASE_URL
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SERVICE_ROLE_KEY || SERVICE_ROLE_KEY.startsWith('isi_dengan')) {
  console.error('❌  Set SUPABASE_SERVICE_ROLE_KEY di file .env terlebih dahulu.')
  console.error('   Dapatkan dari: Supabase Dashboard → Settings → API → service_role key')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)

const staff = [
  {
    nama: 'Denis Kristianto, S.E., M.M.',
    jabatan: 'Ketua STIE Taman Siswa Jakarta',
    file: 'ketua-stie.png',
    quotes: 'Kita tidak mencetak pengikut; kita menempa pemimpin yang berani berdiri demi kebenaran',
  },
  {
    nama: 'Joko Suyono, S.Si., M.Pd.',
    jabatan: 'Wakil Ketua I Bid. Akademik',
    file: 'wk-i-stie.png',
    quotes: 'Mari Lakukan yang terbaik selagi ada kesempatan, mulai dari diri sendiri dan mulai dari sekarang',
  },
  {
    nama: "Tamim Ma'ruf, S.Ag., M.M.",
    jabatan: 'Wakil Ketua II Bid. Administrasi dan Umum',
    file: 'wk-ii-stie.png',
    quotes: 'Belajar memahami kehidupan untuk mensyukuri keadaan',
  },
  {
    nama: 'Ir. Tukirin, M.M.',
    jabatan: 'Ketua Program Studi Manajemen',
    file: 'kaprog-manajemen.png',
    quotes: 'Perbaikan Terus-Menerus untuk Kemajuan Bersama',
  },
  {
    nama: 'Ika Baskara, S.E., M.M.',
    jabatan: 'Ketua Program Studi Akuntansi',
    file: 'kaprog-akuntansi.png',
    quotes: 'Akuntansi yang Profesional, Beretika, dan Berdampak untuk Kemajuan Bangsa dan Masyarakat',
  },
]

async function uploadPhoto(file) {
  const filePath = resolve(__dirname, '../public/img/staff', file)
  const fileBuffer = readFileSync(filePath)
  const storagePath = `tenaga-ahli/${file}`

  const { error } = await supabase.storage
    .from('media')
    .upload(storagePath, fileBuffer, { contentType: 'image/png', upsert: true })

  if (error) throw new Error(`Upload ${file} gagal: ${error.message}`)

  const { data } = supabase.storage.from('media').getPublicUrl(storagePath)
  return data.publicUrl
}

async function run() {
  console.log('🚀 Memulai seed tenaga_ahli...\n')

  // Hapus data lama agar tidak duplikat
  const { error: deleteError } = await supabase.from('tenaga_ahli').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  if (deleteError) console.warn('⚠️  Tidak bisa hapus data lama:', deleteError.message)

  for (const person of staff) {
    process.stdout.write(`📤 Upload foto ${person.file}... `)
    const foto_url = await uploadPhoto(person.file)
    console.log('✓')

    process.stdout.write(`💾 Insert ${person.nama}... `)
    const { error } = await supabase.from('tenaga_ahli').insert({
      nama: person.nama,
      jabatan: person.jabatan,
      foto_url,
      quotes: person.quotes,
    })
    if (error) throw new Error(`Insert gagal: ${error.message}`)
    console.log('✓')
  }

  console.log('\n✅ Selesai! 5 data tenaga ahli berhasil disimpan.')
}

run().catch((err) => {
  console.error('\n❌ Error:', err.message)
  process.exit(1)
})
