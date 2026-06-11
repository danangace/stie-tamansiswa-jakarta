import { createClient } from '@supabase/supabase-js'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { config } from 'dotenv'

const __dirname = dirname(fileURLToPath(import.meta.url))
config({ path: resolve(__dirname, '../.env') })

const supabase = createClient(
  process.env.NUXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
)

const partners = [
  'Universitas Jayabaya',
  'Yayasan Islamic Center Alhuda Timah',
  'Sekolah Tinggi Ilmu Ekonomi Jaya Negara Tamansiswa Malang',
  'RW 01 Kelurahan Karang Anyar Kecamatan Sawah Besar Kota Administrasi Jakarta Pusat',
  'PKBM Taman Siswa Jakarta',
  'RW 19 Kelurahan Mustika Jaya Kecamatan Mustika Jaya Kota Bekasi',
  'PT. Duta Amanah Insani',
  'PT. Caturaga Tiara Persada',
  'LPK Kiraku Indonesia',
]

async function run() {
  console.log('🚀 Memulai seed partner...\n')

  await supabase.from('partner').delete().neq('id', '00000000-0000-0000-0000-000000000000')

  for (const nama of partners) {
    process.stdout.write(`💾 Insert "${nama}"... `)
    const { error } = await supabase.from('partner').insert({ nama })
    if (error) throw new Error(`Gagal: ${error.message}`)
    console.log('✓')
  }

  console.log(`\n✅ Selesai! ${partners.length} data partner berhasil disimpan.`)
}

run().catch((err) => {
  console.error('\n❌ Error:', err.message)
  process.exit(1)
})
