<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { type PmbPendaftar, type PmbTipe, type PmbStatus, PMB_STATUS_LABEL, PMB_STATUS_COLOR } from '~/composables/usePmb'
import * as XLSX from 'xlsx'

definePageMeta({ layout: 'admin' })

const { getAllForExport } = usePmb()
const exporting = ref(false)

const loading = ref(false)
const error = ref('')

const PAGE_SIZE = 20
const currentPage = ref(1)
const totalCount = ref(0)
const totalPages = computed(() => Math.ceil(totalCount.value / PAGE_SIZE))

const filterTipe = ref<PmbTipe | 'all'>('all')
const filterStatus = ref<PmbStatus | 'all'>('all')
const filterTahun = ref<string>('all')
const searchQuery = ref('')

const tahunOptions = ref<{ label: string, value: string }[]>([{ label: 'Semua Tahun', value: 'all' }])

async function loadTahunOptions() {
  const supabase = useSupabase()
  const { data } = await supabase
    .from('pmb_pendaftar')
    .select('nomor_pendaftaran')
    .not('nomor_pendaftaran', 'is', null)
  if (!data) return
  const prefixes = [...new Set(data.map((r: any) => (r.nomor_pendaftaran as string).slice(0, 2)))]
    .sort((a, b) => b.localeCompare(a))
  tahunOptions.value = [
    { label: 'Semua Tahun', value: 'all' },
    ...prefixes.map(p => ({ label: `20${p}`, value: p })),
  ]
  // Default ke tahun terbaru
  if (prefixes.length > 0) filterTahun.value = prefixes[0]!
}

const tipeOptions = [
  { label: 'Semua Jalur', value: 'all' },
  { label: 'Baru', value: 'baru' },
  { label: 'Pindahan', value: 'pindahan' },
]

const statusOptions = [
  { label: 'Semua Status', value: 'all' },
  { label: 'Menunggu Verifikasi', value: 'menunggu_verifikasi' },
  { label: 'Diterima', value: 'diterima' },
  { label: 'Ditolak', value: 'ditolak' },
]

// nama diambil dari relasi — kita fetch join
interface PmbPendaftarWithNama extends PmbPendaftar {
  nama?: string
  program_studi?: string
  no_hp?: string
}

const columns: TableColumn<PmbPendaftarWithNama>[] = [
  { accessorKey: 'id', header: 'No. Pendaftaran' },
  { accessorKey: 'created_at', header: 'Tanggal' },
  { accessorKey: 'tipe', header: 'Jalur' },
  { accessorKey: 'nama', header: 'Nama' },
  { accessorKey: 'program_studi', header: 'Program Studi' },
  { accessorKey: 'no_hp', header: 'No. WhatsApp' },
  { accessorKey: 'status', header: 'Status' },
  { id: 'actions', header: '' },
]
const listWithNama = ref<PmbPendaftarWithNama[]>([])

async function loadData() {
  loading.value = true
  error.value = ''
  try {
    const supabase = useSupabase()
    const from = (currentPage.value - 1) * PAGE_SIZE
    const to = from + PAGE_SIZE - 1
    const q = searchQuery.value.trim()

    let query = supabase
      .from('pmb_pendaftar')
      .select('*, pmb_baru(nama, program_studi, no_hp), pmb_pindahan(nama, program_studi, no_hp)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range(from, to)

    if (filterTipe.value !== 'all') query = query.eq('tipe', filterTipe.value)
    if (filterStatus.value !== 'all') query = query.eq('status', filterStatus.value)
    if (filterTahun.value !== 'all') query = query.like('nomor_pendaftaran', `${filterTahun.value}%`)

    if (q.length >= 3) {
      const [r1, r2] = await Promise.all([
        supabase.from('pmb_baru').select('pendaftar_id').or(`nama.ilike.%${q}%,no_hp.ilike.%${q}%`),
        supabase.from('pmb_pindahan').select('pendaftar_id').or(`nama.ilike.%${q}%,no_hp.ilike.%${q}%`),
      ])
      const ids = [...new Set([
        ...(r1.data?.map((r: any) => r.pendaftar_id) ?? []),
        ...(r2.data?.map((r: any) => r.pendaftar_id) ?? []),
      ])]
      const orParts = [`nomor_pendaftaran.ilike.%${q}%`]
      if (ids.length > 0) orParts.push(`id.in.(${ids.join(',')})`)
      query = query.or(orParts.join(','))
    }

    const { data, count, error: err } = await query
    if (err) throw err

    totalCount.value = count ?? 0
    listWithNama.value = (data ?? []).map((row: any) => {
      const baru = Array.isArray(row.pmb_baru) ? row.pmb_baru[0] : row.pmb_baru
      const pindahan = Array.isArray(row.pmb_pindahan) ? row.pmb_pindahan[0] : row.pmb_pindahan
      const prodiRaw = baru?.program_studi || pindahan?.program_studi || ''
      const prodiLabel: Record<string, string> = { manajemen: 'S1 Manajemen', akuntansi: 'S1 Akuntansi' }
      return {
        ...row,
        nama: baru?.nama || pindahan?.nama || '—',
        program_studi: prodiLabel[prodiRaw] || prodiRaw || '—',
        no_hp: baru?.no_hp || pindahan?.no_hp || '—',
      }
    })
  } catch (err: unknown) {
    error.value = err instanceof Error ? err.message : 'Gagal memuat data'
  } finally {
    loading.value = false
  }
}

let searchTimer: ReturnType<typeof setTimeout> | null = null
watch(searchQuery, (val) => {
  if (searchTimer) clearTimeout(searchTimer)
  if (val.length === 0) {
    currentPage.value = 1
    loadData()
    return
  }
  if (val.length < 3) return
  searchTimer = setTimeout(() => { currentPage.value = 1; loadData() }, 500)
})

watch([filterTipe, filterStatus, filterTahun], () => { currentPage.value = 1; loadData() })
watch(currentPage, loadData)
onMounted(async () => { await loadTahunOptions(); loadData() })

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
}

async function handleExportExcel() {
  if (filterTahun.value === 'all') {
    error.value = 'Pilih tahun terlebih dahulu sebelum export.'
    return
  }
  exporting.value = true
  error.value = ''
  try {
    const rows = await getAllForExport(filterTahun.value)
    const sheetData: any[][] = []

    // Header
    sheetData.push([
      'No', 'Nomor Pendaftaran', 'Jalur Pendaftaran', 'Status', 'Tanggal Daftar',
      // Baru
      'Nama', 'Jenis Kelamin', 'Agama', 'Program Studi', 'NISN', 'NIK',
      'Tempat Lahir', 'Tanggal Lahir', 'Alamat Domisili', 'Status Pernikahan',
      'Pekerjaan', 'No HP',
      'Nama SMA', 'Jurusan SMA', 'Tahun Masuk SMA', 'Tahun Lulus SMA',
      'Nama Ibu Kandung', 'Nama Wali', 'No HP Wali', 'Pekerjaan Ayah', 'Penghasilan Rata-Rata',
      // Pindahan
      'NIM Lama', 'Nama Kampus Lama', 'Program Studi Lama', 'Tahun Masuk Lama',
      // Dokumen (URL)
      'Berkas Ijazah', 'Berkas KTP', 'Berkas KK', 'Berkas Akte',
      'Berkas Surat Mutasi', 'Berkas Transkrip', 'Berkas Biodata PP/KTI', 'Berkas KTA', 'Berkas KK (Pindahan)', 'Berkas Akte (Pindahan)',
    ])

    rows.forEach((row, i) => {
      const b = row.pmb_baru
      const p = row.pmb_pindahan
      sheetData.push([
        i + 1,
        row.nomor_pendaftaran,
        row.tipe === 'baru' ? 'Baru' : 'Pindahan',
        PMB_STATUS_LABEL[row.status] ?? row.status,
        formatDate(row.created_at),
        b?.nama ?? p?.nama ?? '',
        b?.jenis_kelamin ?? p?.jenis_kelamin ?? '',
        b?.agama ?? p?.agama ?? '',
        b?.program_studi ?? '',
        b?.nisn ?? p?.nisn ?? '',
        b?.nik ?? p?.nik ?? '',
        b?.tempat_lahir ?? p?.tempat_lahir ?? '',
        b?.tanggal_lahir ?? p?.tanggal_lahir ?? '',
        b?.alamat_domisili ?? p?.alamat_domisili ?? '',
        b?.status_pernikahan ?? p?.status_pernikahan ?? '',
        b?.pekerjaan ?? p?.pekerjaan ?? '',
        b?.no_hp ?? p?.no_hp ?? '',
        b?.nama_sma ?? '',
        b?.jurusan_sma ?? '',
        b?.tahun_masuk_sma ?? '',
        b?.tahun_lulus_sma ?? '',
        b?.nama_ibu_kandung ?? '',
        b?.nama_wali ?? '',
        b?.no_hp_wali ?? '',
        b?.pekerjaan_ayah ?? '',
        b?.penghasilan_rata_rata ?? '',
        p?.nim_lama ?? '',
        p?.nama_kampus_lama ?? '',
        p?.program_studi_lama ?? '',
        p?.tahun_masuk_lama ?? '',
        // Dokumen Baru
        b?.berkas_ijazah_url ?? '',
        b?.berkas_ktp_url ?? '',
        b?.berkas_kk_url ?? '',
        b?.berkas_akte_url ?? '',
        // Dokumen Pindahan
        p?.berkas_surat_mutasi_url ?? '',
        p?.berkas_transkrip_url ?? '',
        p?.berkas_biodata_pp_kti_url ?? '',
        p?.berkas_kta_url ?? '',
        p?.berkas_kk_url ?? '',
        p?.berkas_akte_url ?? '',
      ])
    })

    const ws = XLSX.utils.aoa_to_sheet(sheetData)

    // Set hyperlinks pada cell yang berisi URL dokumen
    const DOC_START_COL = 29 // kolom ke-30 (index 29), setelah semua kolom data
    const range = XLSX.utils.decode_range(ws['!ref']!)
    for (let R = 1; R <= range.e.r; R++) {
      for (let C = DOC_START_COL; C <= range.e.c; C++) {
        const addr = XLSX.utils.encode_cell({ r: R, c: C })
        if (ws[addr] && typeof ws[addr].v === 'string' && ws[addr].v.startsWith('http')) {
          ws[addr].l = { Target: ws[addr].v }
        }
      }
    }
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Data PMB')
    XLSX.writeFile(wb, `PMB_20${filterTahun.value}.xlsx`)
  } catch (err: unknown) {
    error.value = err instanceof Error ? err.message : 'Gagal export Excel'
  } finally {
    exporting.value = false
  }
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-text-100">Pendaftaran Mahasiswa Baru (PMB)</h1>
      <UButton icon="i-lucide-download" color="neutral" variant="outline" :loading="exporting" @click="handleExportExcel">
        Export Excel
      </UButton>
    </div>

    <UAlert v-if="error" color="error" variant="soft" icon="i-lucide-alert-circle" :description="error" />

    <!-- Filter & Pencarian -->
    <div class="flex items-center justify-between gap-3">
      <UInput v-model="searchQuery" icon="i-lucide-search" placeholder="Cari nama, nomor, atau HP..." class="w-72" />
      <div class="flex items-center gap-3">
        <USelect v-model="filterStatus" :items="statusOptions" class="w-48" />
        <USelect v-model="filterTipe" :items="tipeOptions" class="w-40" />
        <USelect v-model="filterTahun" :items="tahunOptions" class="w-36" />
      </div>
    </div>

    <UCard>
      <UTable :data="listWithNama" :columns="columns" :loading="loading" class="cursor-pointer" @select="(row: any) => navigateTo(`/admin/pmb/${row.original.id}`)">
        <template #id-cell="{ row }">
          <span class="font-mono font-semibold text-text-100">{{ (row.original as PmbPendaftarWithNama).nomor_pendaftaran }}</span>
        </template>

        <template #created_at-cell="{ row }">
          <span class="text-sm text-text-300">{{ formatDate((row.original as PmbPendaftarWithNama).created_at) }}</span>
        </template>

        <template #tipe-cell="{ row }">
          <UBadge
            :color="(row.original as PmbPendaftarWithNama).tipe === 'baru' ? 'primary' : 'secondary'"
            variant="soft"
            class="capitalize"
          >
            {{ (row.original as PmbPendaftarWithNama).tipe }}
          </UBadge>
        </template>

        <template #nama-cell="{ row }">
          <span class="font-medium text-text-100">{{ (row.original as PmbPendaftarWithNama).nama }}</span>
        </template>

        <template #program_studi-cell="{ row }">
          <span class="text-sm text-text-300">{{ (row.original as PmbPendaftarWithNama).program_studi }}</span>
        </template>

        <template #no_hp-cell="{ row }">
          <span class="text-sm text-text-100 font-mono">{{ (row.original as PmbPendaftarWithNama).no_hp }}</span>
        </template>

        <template #status-cell="{ row }">
          <UBadge
            :color="PMB_STATUS_COLOR[(row.original as PmbPendaftarWithNama).status] as any"
            variant="soft"
            size="sm"
          >
            {{ PMB_STATUS_LABEL[(row.original as PmbPendaftarWithNama).status] }}
          </UBadge>
        </template>

        <template #actions-cell="{ row }">
          <UButton
            icon="i-lucide-eye"
            color="neutral"
            variant="ghost"
            size="sm"
            :to="`/admin/pmb/${(row.original as PmbPendaftarWithNama).id}`"
          />
        </template>
      </UTable>

      <div v-if="totalCount > 0" class="flex items-center justify-between px-4 py-3 border-t border-(--ui-border)">
        <span class="text-sm text-text-300">
          Menampilkan {{ (currentPage - 1) * PAGE_SIZE + 1 }}–{{ Math.min(currentPage * PAGE_SIZE, totalCount) }} dari {{ totalCount }} data
        </span>
        <UPagination v-model:page="currentPage" :total="totalCount" :items-per-page="PAGE_SIZE" />
      </div>
    </UCard>
  </div>
</template>
