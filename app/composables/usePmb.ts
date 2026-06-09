export type PmbTipe = 'baru' | 'pindahan'
export type PmbStatus = 'menunggu' | 'diproses' | 'diterima' | 'ditolak'

export interface PmbPendaftar {
  id: string
  tipe: PmbTipe
  status: PmbStatus
  catatan_admin: string | null
  created_at: string
  updated_at: string
}

export interface PmbBaru {
  id: string
  pendaftar_id: string
  // Data Calon Mahasiswi
  nama: string
  jenis_kelamin: string
  agama: string
  program_studi: string
  nisn: string
  nik: string
  tempat_lahir: string
  tanggal_lahir: string
  alamat_domisili: string
  status_pernikahan: string
  status_pernikahan_lainnya: string | null
  nama_referensi: string
  pekerjaan: string
  no_hp: string
  // Data Akademik
  nama_sma: string
  jurusan_sma: string | null
  tahun_masuk_sma: number
  tahun_lulus_sma: number
  // Data Orang Tua / Wali
  nama_ibu_kandung: string
  nama_wali: string
  no_hp_wali: string
  pekerjaan_ayah: string
  penghasilan_rata_rata: string
  // Upload Berkas
  berkas_ijazah_url: string | null
  berkas_ktp_url: string
  berkas_kk_url: string
  berkas_akte_url: string
}

export interface PmbPindahan {
  id: string
  pendaftar_id: string
  // Data Mahasiswi
  nama: string
  jenis_kelamin: string
  nik: string
  nim_lama: string
  tempat_lahir: string
  tanggal_lahir: string
  agama: string
  status_pernikahan: string
  status_pernikahan_lainnya: string | null
  pekerjaan: string
  nama_referensi: string
  no_hp: string
  // Data Akademik
  nama_kampus_lama: string
  program_studi_lama: string
  tahun_masuk_lama: number
  // Upload Berkas (semua opsional)
  berkas_surat_tugas_url: string | null
  berkas_transkrip_url: string | null
  berkas_biodata_pp_kti_url: string | null
  berkas_kta_url: string | null
  berkas_kk_url: string | null
  berkas_akte_url: string | null
}

export type PmbBaru_Form = Omit<PmbBaru, 'id' | 'pendaftar_id'>
export type PmbPindahan_Form = Omit<PmbPindahan, 'id' | 'pendaftar_id'>

export interface PmbPendaftarDetail extends PmbPendaftar {
  pmb_baru: PmbBaru | null
  pmb_pindahan: PmbPindahan | null
}

export const PMB_STATUS_LABEL: Record<PmbStatus, string> = {
  menunggu: 'Menunggu',
  diproses: 'Diproses',
  diterima: 'Diterima',
  ditolak: 'Ditolak',
}

export const PMB_STATUS_COLOR: Record<PmbStatus, string> = {
  menunggu: 'neutral',
  diproses: 'info',
  diterima: 'success',
  ditolak: 'error',
}

export function usePmb() {
  const supabase = useSupabase()

  // ─── Upload berkas ──────────────────────────────────────────────
  async function uploadBerkas(file: File, folder: string, pendaftarId: string, name: string): Promise<string> {
    const ext = file.name.split('.').pop()
    const path = `pmb/${folder}/${pendaftarId}/${name}.${ext}`
    const { error } = await supabase.storage.from('media').upload(path, file, { upsert: true })
    if (error) throw error
    const { data } = supabase.storage.from('media').getPublicUrl(path)
    return data.publicUrl
  }

  // ─── Submit BARU ────────────────────────────────────────────────
  async function submitBaru(
    form: PmbBaru_Form,
    berkas: {
      ijazah?: File | null
      ktp: File
      kk: File
      akte: File
    },
  ): Promise<string> {
    // 1. Insert pendaftar
    const { data: pendaftar, error: e1 } = await supabase
      .from('pmb_pendaftar')
      .insert({ tipe: 'baru' })
      .select('id')
      .single()
    if (e1) throw e1

    const pid = pendaftar.id

    // 2. Upload berkas
    const [ktp_url, kk_url, akte_url] = await Promise.all([
      uploadBerkas(berkas.ktp, 'baru', pid, 'ktp'),
      uploadBerkas(berkas.kk, 'baru', pid, 'kk'),
      uploadBerkas(berkas.akte, 'baru', pid, 'akte'),
    ])
    const ijazah_url = berkas.ijazah ? await uploadBerkas(berkas.ijazah, 'baru', pid, 'ijazah') : null

    // 3. Insert data baru
    const { error: e2 } = await supabase.from('pmb_baru').insert({
      ...form,
      pendaftar_id: pid,
      berkas_ktp_url: ktp_url,
      berkas_kk_url: kk_url,
      berkas_akte_url: akte_url,
      berkas_ijazah_url: ijazah_url,
    })
    if (e2) throw e2

    return pid
  }

  // ─── Submit PINDAHAN ────────────────────────────────────────────
  async function submitPindahan(
    form: PmbPindahan_Form,
    berkas: {
      surat_tugas?: File | null
      transkrip?: File | null
      biodata_pp_kti?: File | null
      kta?: File | null
      kk?: File | null
      akte?: File | null
    },
  ): Promise<string> {
    const { data: pendaftar, error: e1 } = await supabase
      .from('pmb_pendaftar')
      .insert({ tipe: 'pindahan' })
      .select('id')
      .single()
    if (e1) throw e1

    const pid = pendaftar.id

    const uploadIfExists = async (file: File | null | undefined, name: string) =>
      file ? uploadBerkas(file, 'pindahan', pid, name) : null

    const [surat_tugas_url, transkrip_url, biodata_url, kta_url, kk_url, akte_url] =
      await Promise.all([
        uploadIfExists(berkas.surat_tugas, 'surat-tugas'),
        uploadIfExists(berkas.transkrip, 'transkrip'),
        uploadIfExists(berkas.biodata_pp_kti, 'biodata-pp-kti'),
        uploadIfExists(berkas.kta, 'kta'),
        uploadIfExists(berkas.kk, 'kk'),
        uploadIfExists(berkas.akte, 'akte'),
      ])

    const { error: e2 } = await supabase.from('pmb_pindahan').insert({
      ...form,
      pendaftar_id: pid,
      berkas_surat_tugas_url: surat_tugas_url,
      berkas_transkrip_url: transkrip_url,
      berkas_biodata_pp_kti_url: biodata_url,
      berkas_kta_url: kta_url,
      berkas_kk_url: kk_url,
      berkas_akte_url: akte_url,
    })
    if (e2) throw e2

    return pid
  }

  // ─── Admin: list ────────────────────────────────────────────────
  async function getAll(filters?: { tipe?: PmbTipe; status?: PmbStatus }): Promise<PmbPendaftar[]> {
    let query = supabase
      .from('pmb_pendaftar')
      .select('*')
      .order('created_at', { ascending: false })
    if (filters?.tipe) query = query.eq('tipe', filters.tipe)
    if (filters?.status) query = query.eq('status', filters.status)
    const { data, error } = await query
    if (error) throw error
    return data
  }

  // ─── Admin: detail ──────────────────────────────────────────────
  async function getDetail(id: string): Promise<PmbPendaftarDetail> {
    const { data, error } = await supabase
      .from('pmb_pendaftar')
      .select('*, pmb_baru(*), pmb_pindahan(*)')
      .eq('id', id)
      .single()
    if (error) throw error
    return data as PmbPendaftarDetail
  }

  // ─── Admin: update status ───────────────────────────────────────
  async function updateStatus(id: string, status: PmbStatus, catatan?: string): Promise<void> {
    const payload: Partial<PmbPendaftar> = { status }
    if (catatan !== undefined) payload.catatan_admin = catatan
    const { error } = await supabase.from('pmb_pendaftar').update(payload).eq('id', id)
    if (error) throw error
  }

  return { submitBaru, submitPindahan, getAll, getDetail, updateStatus }
}
