export type PmbTipe = 'baru' | 'pindahan'
export type PmbStatus = 'menunggu_verifikasi' | 'diterima' | 'ditolak'

export interface PmbPendaftar {
  id: string
  nomor_pendaftaran: string
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
  pekerjaan: string
  no_hp: string
  // Data Akademik
  nama_sma: string
  jurusan_sma: string | null
  tahun_masuk_sma: number
  tahun_lulus_sma: number
  // Data Orang Tua / Wali
  nama_ibu_kandung: string
  nama_ayah_kandung: string
  nama_wali: string
  no_hp_ortu: string
  no_hp_wali: string
  pekerjaan_ibu: string
  pekerjaan_ayah: string
  pekerjaan_wali: string
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
  program_studi: string
  nama: string
  jenis_kelamin: string
  nik: string
  nisn: string
  nim_lama: string
  tempat_lahir: string
  tanggal_lahir: string
  agama: string
  alamat_domisili: string
  status_pernikahan: string
  status_pernikahan_lainnya: string | null
  pekerjaan: string
  no_hp: string
  // Data Akademik
  nama_kampus_lama: string
  program_studi_lama: string
  tahun_masuk_lama: number
  // Upload Berkas (semua wajib)
  berkas_surat_mutasi_url: string
  berkas_transkrip_url: string
  berkas_biodata_pp_kti_url: string
  berkas_kta_url: string
  berkas_kk_url: string
  berkas_akte_url: string
}

export type PmbBaru_Form = Omit<PmbBaru, 'id' | 'pendaftar_id'>
export type PmbPindahan_Form = Omit<PmbPindahan, 'id' | 'pendaftar_id'>

export interface PmbPendaftarDetail extends PmbPendaftar {
  pmb_baru: PmbBaru | null
  pmb_pindahan: PmbPindahan | null
}

export const PMB_STATUS_LABEL: Record<PmbStatus, string> = {
  menunggu_verifikasi: 'Menunggu Verifikasi',
  diterima: 'Diterima',
  ditolak: 'Ditolak',
}

export const PMB_STATUS_COLOR: Record<PmbStatus, string> = {
  menunggu_verifikasi: 'neutral',
  diterima: 'success',
  ditolak: 'error',
}

export function usePmb() {
  const supabase = useSupabase()

  // ─── Upload berkas ──────────────────────────────────────────────
  async function uploadBerkas(file: File, folder: string, pendaftarId: string, name: string): Promise<string> {
    const path = `pmb/${folder}/${pendaftarId}/${name}.pdf`
    const { error } = await supabase.storage.from('media').upload(path, file, { upsert: true, contentType: 'application/pdf' })
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
  ): Promise<{ id: string; nomor: string }> {
    const { data: pendaftar, error: e1 } = await supabase
      .from('pmb_pendaftar')
      .insert({ tipe: 'baru' })
      .select('id, nomor_pendaftaran')
      .single()
    if (e1) throw e1

    const pid = pendaftar.id

    const [ktp_url, kk_url, akte_url] = await Promise.all([
      uploadBerkas(berkas.ktp, 'baru', pid, 'ktp'),
      uploadBerkas(berkas.kk, 'baru', pid, 'kk'),
      uploadBerkas(berkas.akte, 'baru', pid, 'akte'),
    ])
    const ijazah_url = berkas.ijazah ? await uploadBerkas(berkas.ijazah, 'baru', pid, 'ijazah') : null

    const { error: e2 } = await supabase.from('pmb_baru').insert({
      ...form,
      pendaftar_id: pid,
      berkas_ktp_url: ktp_url,
      berkas_kk_url: kk_url,
      berkas_akte_url: akte_url,
      berkas_ijazah_url: ijazah_url,
    })
    if (e2) throw e2

    return { id: pid, nomor: pendaftar.nomor_pendaftaran }
  }

  // ─── Submit PINDAHAN ────────────────────────────────────────────
  async function submitPindahan(
    form: PmbPindahan_Form,
    berkas: {
      surat_mutasi: File
      transkrip: File
      biodata_pp_kti: File
      kta: File
      kk: File
      akte: File
    },
  ): Promise<{ id: string; nomor: string }> {
    const { data: pendaftar, error: e1 } = await supabase
      .from('pmb_pendaftar')
      .insert({ tipe: 'pindahan' })
      .select('id, nomor_pendaftaran')
      .single()
    if (e1) throw e1

    const pid = pendaftar.id

    const [surat_mutasi_url, transkrip_url, biodata_url, kta_url, kk_url, akte_url] =
      await Promise.all([
        uploadBerkas(berkas.surat_mutasi, 'pindahan', pid, 'surat-mutasi'),
        uploadBerkas(berkas.transkrip, 'pindahan', pid, 'transkrip'),
        uploadBerkas(berkas.biodata_pp_kti, 'pindahan', pid, 'biodata-pp-kti'),
        uploadBerkas(berkas.kta, 'pindahan', pid, 'kta'),
        uploadBerkas(berkas.kk, 'pindahan', pid, 'kk'),
        uploadBerkas(berkas.akte, 'pindahan', pid, 'akte'),
      ])

    const { error: e2 } = await supabase.from('pmb_pindahan').insert({
      ...form,
      pendaftar_id: pid,
      berkas_surat_mutasi_url: surat_mutasi_url,
      berkas_transkrip_url: transkrip_url,
      berkas_biodata_pp_kti_url: biodata_url,
      berkas_kta_url: kta_url,
      berkas_kk_url: kk_url,
      berkas_akte_url: akte_url,
    })
    if (e2) throw e2

    return { id: pid, nomor: pendaftar.nomor_pendaftaran }
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
    // Supabase returns one-to-many as arrays; normalize to single object
    const raw = data as any
    return {
      ...raw,
      pmb_baru: Array.isArray(raw.pmb_baru) ? (raw.pmb_baru[0] ?? null) : raw.pmb_baru,
      pmb_pindahan: Array.isArray(raw.pmb_pindahan) ? (raw.pmb_pindahan[0] ?? null) : raw.pmb_pindahan,
    } as PmbPendaftarDetail
  }

  // ─── Admin: update status ───────────────────────────────────────
  async function updateStatus(id: string, status: PmbStatus, catatan?: string): Promise<void> {
    const payload: Partial<PmbPendaftar> = { status }
    if (catatan !== undefined) payload.catatan_admin = catatan
    const { error } = await supabase.from('pmb_pendaftar').update(payload).eq('id', id)
    if (error) throw error
  }

  // ─── Admin: export Excel ────────────────────────────────────────
  async function getAllForExport() {
    const { data, error } = await supabase
      .from('pmb_pendaftar')
      .select('*, pmb_baru(*), pmb_pindahan(*)')
      .order('nomor_pendaftaran', { ascending: true })
    if (error) throw error
    return (data as any[]).map(row => ({
      ...row,
      pmb_baru: Array.isArray(row.pmb_baru) ? (row.pmb_baru[0] ?? null) : row.pmb_baru,
      pmb_pindahan: Array.isArray(row.pmb_pindahan) ? (row.pmb_pindahan[0] ?? null) : row.pmb_pindahan,
    })) as PmbPendaftarDetail[]
  }

  return { submitBaru, submitPindahan, getAll, getDetail, updateStatus, getAllForExport }
}
