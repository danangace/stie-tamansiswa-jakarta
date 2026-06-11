import { createClient } from '@supabase/supabase-js'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { config } from 'dotenv'

const __dirname = dirname(fileURLToPath(import.meta.url))
config({ path: resolve(__dirname, '../.env') })

const SUPABASE_URL = process.env.NUXT_PUBLIC_SUPABASE_URL
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SERVICE_ROLE_KEY || SERVICE_ROLE_KEY.startsWith('isi_dengan')) {
  console.error('❌  Set SUPABASE_SERVICE_ROLE_KEY di file .env terlebih dahulu.')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY)

// ─── Pool Data ────────────────────────────────────────────────────────────────

const namaLaki = [
  'Ahmad Fauzi', 'Budi Santoso', 'Deni Kurniawan', 'Eko Prasetyo', 'Fajar Nugroho',
  'Gilang Ramadhan', 'Hendra Wijaya', 'Irfan Maulana', 'Joko Susanto', 'Kevin Pratama',
  'Lukman Hakim', 'Muhammad Rizki', 'Nanda Saputra', 'Oscar Firmansyah', 'Pandu Wicaksono',
  'Rafi Aditya', 'Satria Dharma', 'Teguh Hidayat', 'Umar Faris', 'Vino Gustiawan',
]

const namaPerempuan = [
  'Ayu Lestari', 'Bunga Permata', 'Citra Dewi', 'Dinda Rahayu', 'Elsa Fitria',
  'Fika Amelia', 'Gita Nuraini', 'Hana Safitri', 'Indah Puspita', 'Julia Anggraeni',
  'Kartika Sari', 'Larasati Putri', 'Melinda Cahyani', 'Nisa Rohmah', 'Olivia Maharani',
  'Putri Handayani', 'Rina Septiani', 'Sari Wulandari', 'Tika Nurhaliza', 'Vina Octavia',
]

const agamaList = ['Islam', 'Islam', 'Islam', 'Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha']
const prodiList = ['manajemen', 'akuntansi']
const statusPernikahanList = ['lajang', 'lajang', 'lajang', 'menikah']
const statusPmb = ['menunggu_verifikasi', 'menunggu_verifikasi', 'menunggu_verifikasi', 'diterima', 'diterima', 'ditolak']

const kotaList = [
  'Jakarta', 'Bogor', 'Depok', 'Tangerang', 'Bekasi', 'Bandung', 'Surabaya',
  'Semarang', 'Yogyakarta', 'Medan', 'Palembang', 'Makassar', 'Malang', 'Solo',
]

const smaList = [
  'SMA Negeri 1 Jakarta', 'SMA Negeri 3 Jakarta', 'SMA Negeri 8 Jakarta',
  'SMA Negeri 1 Bogor', 'SMA Negeri 2 Depok', 'SMA Negeri 1 Tangerang',
  'SMA Negeri 1 Bekasi', 'SMK Negeri 1 Jakarta', 'SMK Negeri 2 Jakarta',
  'SMA Muhammadiyah 1 Jakarta', 'SMA Al-Azhar Jakarta', 'SMA Tarakanita Jakarta',
  'SMA BPK Penabur Jakarta', 'SMA Labschool Kebayoran', 'SMA Negeri 1 Bandung',
  'SMA Negeri 3 Bandung', 'SMA Negeri 1 Surabaya', 'MAN 1 Jakarta',
  'MAN 2 Jakarta', 'SMA Perguruan Rakyat 1',
]

const pekerjaanList = [
  'Karyawan Swasta', 'Wiraswasta', 'Pegawai Negeri Sipil', 'Freelancer',
  'Mahasiswa', 'Belum Bekerja', 'Guru', 'Pedagang',
]

const pekerjaanOrtuList = [
  'Pegawai Negeri Sipil', 'Karyawan Swasta', 'Wiraswasta', 'Pedagang',
  'Petani', 'TNI/Polri', 'Guru', 'Dosen', 'Dokter', 'Ibu Rumah Tangga',
]

const penghasilanList = [
  'Rp 2.000.000', 'Rp 3.000.000', 'Rp 4.000.000', 'Rp 5.000.000',
  'Rp 7.500.000', 'Rp 10.000.000', 'Rp 15.000.000',
]

const kampusLamaList = [
  'Universitas Indonesia', 'Universitas Padjadjaran', 'Universitas Diponegoro',
  'Universitas Gadjah Mada', 'Universitas Brawijaya', 'Universitas Airlangga',
  'Universitas Bina Nusantara', 'Universitas Mercu Buana', 'Universitas Trisakti',
  'Universitas Tarumanagara', 'Universitas Gunadarma', 'Universitas Pancasila',
  'STIE YKPN', 'Universitas Nasional', 'Universitas Terbuka',
]

const prodiLamaList = [
  'Manajemen', 'Akuntansi', 'Ekonomi Pembangunan', 'Administrasi Bisnis',
  'Ilmu Ekonomi', 'Perbankan Syariah', 'Manajemen Keuangan',
]

const BERKAS_PLACEHOLDER = 'https://placeholder.internal/pmb'

// ─── Helper ───────────────────────────────────────────────────────────────────

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function randNama() {
  const isLaki = Math.random() > 0.5
  return {
    nama: isLaki ? pick(namaLaki) : pick(namaPerempuan),
    jenis_kelamin: isLaki ? 'Laki-Laki' : 'Perempuan',
  }
}

function randTanggalLahir() {
  const year = randInt(1998, 2005)
  const month = String(randInt(1, 12)).padStart(2, '0')
  const day = String(randInt(1, 28)).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function randNisn() {
  return String(randInt(1000000000, 9999999999))
}

function randNik() {
  return String(randInt(1000000000000000, 9999999999999999))
}

function randHp() {
  const prefix = pick(['0811', '0812', '0813', '0821', '0822', '0823', '0851', '0852', '0858'])
  return `+62${prefix.slice(1)}${randInt(10000000, 99999999)}`
}

// ─── Generate Records ─────────────────────────────────────────────────────────

function makeBaru(i) {
  const { nama, jenis_kelamin } = randNama()
  const kota = pick(kotaList)
  const tahunMasuk = randInt(2016, 2022)
  return {
    nama,
    jenis_kelamin,
    agama: pick(agamaList),
    program_studi: pick(prodiList),
    nisn: randNisn(),
    nik: randNik(),
    tempat_lahir: kota,
    tanggal_lahir: randTanggalLahir(),
    alamat_domisili: `Jl. ${pick(['Mawar', 'Melati', 'Kenanga', 'Anggrek', 'Dahlia'])} No. ${randInt(1, 99)}, ${kota}`,
    status_pernikahan: pick(statusPernikahanList),
    status_pernikahan_lainnya: null,
    pekerjaan: pick(pekerjaanList),
    no_hp: randHp(),
    nama_sma: pick(smaList),
    jurusan_sma: pick(['IPA', 'IPS', null]),
    tahun_masuk_sma: tahunMasuk,
    tahun_lulus_sma: tahunMasuk + 3,
    nama_ibu_kandung: pick(namaPerempuan),
    nama_ayah_kandung: pick(namaLaki),
    nama_wali: pick(namaLaki),
    no_hp_ortu: randHp(),
    no_hp_wali: randHp(),
    pekerjaan_ibu: pick(pekerjaanOrtuList),
    pekerjaan_ayah: pick(pekerjaanOrtuList),
    pekerjaan_wali: pick(pekerjaanOrtuList),
    penghasilan_rata_rata: pick(penghasilanList),
    berkas_ijazah_url: Math.random() > 0.4 ? `${BERKAS_PLACEHOLDER}/baru/seed-${i}/ijazah.pdf` : null,
    berkas_ktp_url: `${BERKAS_PLACEHOLDER}/baru/seed-${i}/ktp.pdf`,
    berkas_kk_url: `${BERKAS_PLACEHOLDER}/baru/seed-${i}/kk.pdf`,
    berkas_akte_url: `${BERKAS_PLACEHOLDER}/baru/seed-${i}/akte.pdf`,
  }
}

function makePindahan(i) {
  const { nama, jenis_kelamin } = randNama()
  const kota = pick(kotaList)
  const tahunMasuk = randInt(2019, 2023)
  return {
    nama,
    jenis_kelamin,
    agama: pick(agamaList),
    program_studi: pick(prodiList),
    nik: randNik(),
    nisn: randNisn(),
    nim_lama: `${randInt(20, 25)}${randInt(100000, 999999)}`,
    tempat_lahir: kota,
    tanggal_lahir: randTanggalLahir(),
    alamat_domisili: `Jl. ${pick(['Merdeka', 'Pahlawan', 'Sudirman', 'Diponegoro', 'Gatot Subroto'])} No. ${randInt(1, 99)}, ${kota}`,
    status_pernikahan: pick(statusPernikahanList),
    status_pernikahan_lainnya: null,
    pekerjaan: pick(pekerjaanList),
    no_hp: randHp(),
    nama_kampus_lama: pick(kampusLamaList),
    program_studi_lama: pick(prodiLamaList),
    tahun_masuk_lama: tahunMasuk,
    berkas_surat_mutasi_url: `${BERKAS_PLACEHOLDER}/pindahan/seed-${i}/surat-mutasi.pdf`,
    berkas_transkrip_url: `${BERKAS_PLACEHOLDER}/pindahan/seed-${i}/transkrip.pdf`,
    berkas_biodata_pp_kti_url: `${BERKAS_PLACEHOLDER}/pindahan/seed-${i}/biodata.pdf`,
    berkas_kta_url: `${BERKAS_PLACEHOLDER}/pindahan/seed-${i}/kta.pdf`,
    berkas_kk_url: `${BERKAS_PLACEHOLDER}/pindahan/seed-${i}/kk.pdf`,
    berkas_akte_url: `${BERKAS_PLACEHOLDER}/pindahan/seed-${i}/akte.pdf`,
  }
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function run() {
  console.log('🚀 Memulai seed PMB...\n')

  // Hapus data lama (urutan: child dulu, lalu parent)
  process.stdout.write('🗑️  Menghapus data PMB lama... ')
  const dummyId = '00000000-0000-0000-0000-000000000000'
  await supabase.from('pmb_baru').delete().neq('id', dummyId)
  await supabase.from('pmb_pindahan').delete().neq('id', dummyId)
  await supabase.from('pmb_pendaftar').delete().neq('id', dummyId)
  console.log('✓')

  // ── 50 Mahasiswa Baru ──────────────────────────────────────────────────────
  console.log('\n📋 Menyimpan 50 data PMB Baru...')
  let successBaru = 0

  for (let i = 1; i <= 50; i++) {
    const status = pick(statusPmb)

    const { data: pendaftar, error: e1 } = await supabase
      .from('pmb_pendaftar')
      .insert({ tipe: 'baru', status })
      .select('id, nomor_pendaftaran')
      .single()

    if (e1) { console.error(`\n❌ Gagal insert pendaftar baru #${i}:`, e1.message); continue }

    const { error: e2 } = await supabase
      .from('pmb_baru')
      .insert({ ...makeBaru(i), pendaftar_id: pendaftar.id })

    if (e2) { console.error(`\n❌ Gagal insert pmb_baru #${i}:`, e2.message); continue }

    process.stdout.write(`  [${String(i).padStart(2, '0')}] ${pendaftar.nomor_pendaftaran} (${status})\n`)
    successBaru++
  }

  // ── 50 Mahasiswa Pindahan ──────────────────────────────────────────────────
  console.log('\n📋 Menyimpan 50 data PMB Pindahan...')
  let successPindahan = 0

  for (let i = 1; i <= 50; i++) {
    const status = pick(statusPmb)

    const { data: pendaftar, error: e1 } = await supabase
      .from('pmb_pendaftar')
      .insert({ tipe: 'pindahan', status })
      .select('id, nomor_pendaftaran')
      .single()

    if (e1) { console.error(`\n❌ Gagal insert pendaftar pindahan #${i}:`, e1.message); continue }

    const { error: e2 } = await supabase
      .from('pmb_pindahan')
      .insert({ ...makePindahan(i), pendaftar_id: pendaftar.id })

    if (e2) { console.error(`\n❌ Gagal insert pmb_pindahan #${i}:`, e2.message); continue }

    process.stdout.write(`  [${String(i).padStart(2, '0')}] ${pendaftar.nomor_pendaftaran} (${status})\n`)
    successPindahan++
  }

  console.log(`\n✅ Selesai! ${successBaru} baru + ${successPindahan} pindahan berhasil disimpan.`)
}

run().catch((err) => {
  console.error('\n❌ Error:', err.message)
  process.exit(1)
})
