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

const members = [
  { nama: 'Denis Kristianto, S.E., M.M.', jabatan: 'Ketua STIE Taman Siswa Jakarta', file: 'denis-kristianto.png' },
  { nama: 'Joko Suyono, S.Si., M.Pd', jabatan: 'Wakil Ketua I - Bid. Akademik', file: 'joko-suyono.png' },
  { nama: "Tamim Ma'ruf, S.Ag., M.M.", jabatan: 'Wakil Ketua II - Bid. Administrasi dan Umum', file: 'tamim-maruf.png' },
  { nama: 'Ir. Tukirin, M.M.', jabatan: 'Ketua Program Studi Manajemen', file: 'tukirin.png' },
  { nama: 'Ika Baskara, S.E., M.M.', jabatan: 'Ketua Program Studi Akuntansi', file: 'ika-baskara.png' },
  { nama: 'Gunadi, S.T., M.M.', jabatan: 'Ketua Bidang Kemahasiswaan', file: 'gunadi.png' },
  { nama: 'Rita Amelia, SE,MM,Ak,CA,CSFA', jabatan: 'Ketua Penjaminan Mutu', file: 'rita-amelia.png' },
  { nama: 'Esti Setiati, S.E., M.Ak.', jabatan: 'Kepala Internal Auditor', file: 'esti-setiati.png' },
  { nama: 'Laela Rahmawati, S. Ak., M.Ak.', jabatan: 'Kepala LPPM', file: 'laela-rahmawati.png' },
  { nama: 'Endang Dwi Lestari, M.Pd', jabatan: 'Dosen Manajemen', file: 'endang-dwi-lestari.png' },
  { nama: 'Ir. Yodi Orbawan', jabatan: 'Dosen Manajemen', file: 'yodi-orbawan.png' },
  { nama: 'Nurul Fahmi F, S.Pd., M.M.', jabatan: 'Dosen Manajemen dan Akuntansi', file: 'nurul-fahmi.png' },
  { nama: 'Sonny Tri Aresta April, S.E., M.M.', jabatan: 'Dosen Manajemen', file: 'sonny-tri-aresta-april.png' },
  { nama: 'Harseno, S.Pd., Gr.', jabatan: 'Kepala Bagian Administrasi Umum dan Keuangan', file: 'harseno.png' },
  { nama: 'Dwi Respati Mardani, S.M.', jabatan: 'Kepala Bagian Administrasi Akademik dan Admin Pusat Komputer', file: 'dwi-respati-mardani.png' },
  { nama: 'Nur Almira Shinta Putri, A.Md.A.B.', jabatan: 'Tata Usaha Administrasi Akademik dan Kemahasiswaan', file: 'nur-almira-shinta-putri.png' },
  { nama: 'Dadang Riski Marki, S.E.', jabatan: 'Tata Usaha Administrasi Kemahasiswaan, Alumni, dan Perpustakaan', file: 'dadang-riski-marki.png' },
]

async function run() {
  console.log('🚀 Memulai seed tenaga_pendidik...\n')

  await supabase.from('tenaga_pendidik').delete().neq('id', '00000000-0000-0000-0000-000000000000')

  for (let i = 0; i < members.length; i++) {
    const { nama, jabatan, file } = members[i]
    process.stdout.write(`💾 [${i + 1}/${members.length}] "${nama}"... `)

    const filePath = resolve(__dirname, `../public/img/faculty-members/${file}`)
    const fileBuffer = readFileSync(filePath)
    const storagePath = `tenaga-pendidik/${file}`

    const { error: uploadError } = await supabase.storage
      .from('media')
      .upload(storagePath, fileBuffer, { contentType: 'image/png', upsert: true })
    if (uploadError) throw new Error(`Upload gagal: ${uploadError.message}`)

    const { data: urlData } = supabase.storage.from('media').getPublicUrl(storagePath)
    const foto_url = urlData.publicUrl

    const { error } = await supabase
      .from('tenaga_pendidik')
      .insert({ nama, jabatan, foto_url, urutan: i + 1 })
    if (error) throw new Error(`Insert gagal: ${error.message}`)

    console.log('✓')
  }

  console.log(`\n✅ Selesai! ${members.length} data tenaga pendidik berhasil disimpan.`)
}

run().catch((err) => {
  console.error('\n❌ Error:', err.message)
  process.exit(1)
})
