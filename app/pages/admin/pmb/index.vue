<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { type PmbPendaftar, type PmbTipe, PMB_STATUS_LABEL, PMB_STATUS_COLOR } from '~/composables/usePmb'
import * as XLSX from 'xlsx'

definePageMeta({ layout: 'admin' })

const { getAll, getAllForExport } = usePmb()
const exporting = ref(false)

const list = ref<PmbPendaftar[]>([])
const loading = ref(false)
const error = ref('')

const filterTipe = ref<PmbTipe | 'all'>('all')

const tipeOptions = [
  { label: 'Semua Jalur', value: 'all' },
  { label: 'Baru', value: 'baru' },
  { label: 'Pindahan', value: 'pindahan' },
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
    const filters = {
      tipe: filterTipe.value !== 'all' ? filterTipe.value : undefined,
    } as { tipe?: PmbTipe }

    // Fetch dengan join nama
    const supabase = useSupabase()
    let query = supabase
      .from('pmb_pendaftar')
      .select('*, pmb_baru(nama, program_studi, no_hp), pmb_pindahan(nama, program_studi, no_hp)')
      .order('created_at', { ascending: false })

    if (filters.tipe) query = query.eq('tipe', filters.tipe)

    const { data, error: err } = await query
    if (err) throw err

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

watch([filterTipe], loadData)
onMounted(loadData)

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
}

async function handleExportExcel() {
  exporting.value = true
  try {
    const rows = await getAllForExport()
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
      ])
    })

    const ws = XLSX.utils.aoa_to_sheet(sheetData)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, 'Data PMB')
    XLSX.writeFile(wb, `PMB_${new Date().toISOString().slice(0, 10)}.xlsx`)
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

    <!-- Filter -->
    <div class="flex items-center gap-3">
      <USelect v-model="filterTipe" :items="tipeOptions" class="w-40" />
    </div>

    <UCard>
      <UTable :data="listWithNama" :columns="columns" :loading="loading">
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
    </UCard>
  </div>
</template>
