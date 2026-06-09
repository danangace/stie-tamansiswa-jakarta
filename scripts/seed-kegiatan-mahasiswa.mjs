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

const kegiatan = [
  { judul: 'PKKMB', deskripsi: 'Program Pengenalan Kehidupan Kampus • STIE Tamansiswa Jakarta', file: 'PKKMB-STIETamanSiswaJakarta.jpeg' },
  { judul: 'Unit Kegiatan Mahasiswa', deskripsi: 'STIE Tamansiswa Jakarta', file: 'UnitKegiatanMahasiswa-STIETamanSiswaJakarta.jpeg' },
  { judul: 'Sosialisasi', deskripsi: 'STIE Tamansiswa Jakarta', file: 'Sosialisasi-STIETamanSiswaJakarta.jpeg' },
  { judul: 'Pelantikan Senat', deskripsi: 'STIE Tamansiswa Jakarta', file: 'PelantikanSenat-STIETamanSiswaJakarta.jpeg' },
  { judul: 'Zakat', deskripsi: 'STIE Tamansiswa Jakarta', file: 'Zakat-STIETamanSiswaJakarta.jpeg' },
  { judul: 'DIES Natalis 30 Tahun', deskripsi: 'STIE Tamansiswa Jakarta', file: 'DIESNatalies30Tahun-STIETamanSiswaJakarta.jpeg' },
  { judul: 'Buka Bersama', deskripsi: 'STIE Tamansiswa Jakarta', file: 'BukaBersama-StieTamanSiswaJakarta.jpeg' },
  { judul: 'Jalan Santai', deskripsi: 'STIE Tamansiswa Jakarta', file: 'JalanSantai-STIETamanSiswaJakarta.jpeg' },
  { judul: 'Hari Batik Nasional', deskripsi: 'STIE Tamansiswa Jakarta', file: 'HariBatikNasional-STIETamanSiswaJakarta.jpeg' },
  { judul: '17 Agustus', deskripsi: 'STIE Tamansiswa Jakarta', file: '17Agustus-STIETamanSiswaJakarta.jpeg' },
  { judul: 'Malam Keakraban', deskripsi: 'STIE Tamansiswa Jakarta', file: 'MalamKeakraban-STIETamanSiswaJakarta.jpeg' },
]

async function run() {
  console.log('🚀 Memulai seed kegiatan_mahasiswa...\n')

  await supabase.from('kegiatan_mahasiswa').delete().neq('id', '00000000-0000-0000-0000-000000000000')

  for (let i = 0; i < kegiatan.length; i++) {
    const { judul, deskripsi, file } = kegiatan[i]
    process.stdout.write(`💾 [${i + 1}/${kegiatan.length}] "${judul}"... `)

    const filePath = resolve(__dirname, `../public/img/kegiatan-kemahasiswaan/${file}`)
    const fileBuffer = readFileSync(filePath)
    const storagePath = `kegiatan-mahasiswa/${file}`

    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(storagePath, fileBuffer, { contentType: 'image/jpeg', upsert: true })
    if (uploadError) throw new Error(`Upload gagal: ${uploadError.message}`)

    const { data: urlData } = supabase.storage.from('media').getPublicUrl(storagePath)
    const foto_url = urlData.publicUrl

    const { error } = await supabase
      .from('kegiatan_mahasiswa')
      .insert({ judul, deskripsi, foto_url, urutan: i + 1 })
    if (error) throw new Error(`Insert gagal: ${error.message}`)

    console.log('✓')
  }

  console.log(`\n✅ Selesai! ${kegiatan.length} data kegiatan mahasiswa berhasil disimpan.`)
}

run().catch((err) => {
  console.error('\n❌ Error:', err.message)
  process.exit(1)
})
