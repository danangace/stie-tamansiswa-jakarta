<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import { type PmbPendaftar, type PmbTipe, type PmbStatus, PMB_STATUS_LABEL, PMB_STATUS_COLOR } from '~/composables/usePmb'

definePageMeta({ layout: 'admin' })

const { getAll } = usePmb()

const list = ref<PmbPendaftar[]>([])
const loading = ref(false)
const error = ref('')

const filterTipe = ref<PmbTipe | ''>('')
const filterStatus = ref<PmbStatus | ''>('')

const tipeOptions = [
  { label: 'Semua Jalur', value: '' },
  { label: 'Baru', value: 'baru' },
  { label: 'Pindahan', value: 'pindahan' },
]
const statusOptions = [
  { label: 'Semua Status', value: '' },
  { label: 'Menunggu', value: 'menunggu' },
  { label: 'Diproses', value: 'diproses' },
  { label: 'Diterima', value: 'diterima' },
  { label: 'Ditolak', value: 'ditolak' },
]

const columns: TableColumn<PmbPendaftar>[] = [
  { id: 'tanggal', header: 'Tanggal' },
  { id: 'tipe', header: 'Jalur' },
  { id: 'nama', header: 'Nama' },
  { id: 'status', header: 'Status' },
  { id: 'actions', header: '' },
]

// nama diambil dari relasi — kita fetch join
interface PmbPendaftarWithNama extends PmbPendaftar {
  nama?: string
  program_studi?: string
}
const listWithNama = ref<PmbPendaftarWithNama[]>([])

async function loadData() {
  loading.value = true
  error.value = ''
  try {
    const filters = {
      tipe: filterTipe.value || undefined,
      status: filterStatus.value || undefined,
    } as { tipe?: PmbTipe; status?: PmbStatus }

    // Fetch dengan join nama
    const supabase = useSupabase()
    let query = supabase
      .from('pmb_pendaftar')
      .select('*, pmb_baru(nama, program_studi), pmb_pindahan(nama, program_studi_lama)')
      .order('created_at', { ascending: false })

    if (filters.tipe) query = query.eq('tipe', filters.tipe)
    if (filters.status) query = query.eq('status', filters.status)

    const { data, error: err } = await query
    if (err) throw err

    listWithNama.value = (data ?? []).map((row: any) => ({
      ...row,
      nama: row.pmb_baru?.nama ?? row.pmb_pindahan?.nama ?? '—',
      program_studi: row.pmb_baru?.program_studi ?? row.pmb_pindahan?.program_studi_lama ?? '—',
    }))
  } catch (err: unknown) {
    error.value = err instanceof Error ? err.message : 'Gagal memuat data'
  } finally {
    loading.value = false
  }
}

watch([filterTipe, filterStatus], loadData)
onMounted(loadData)

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-text-100">Pendaftaran Mahasiswa Baru (PMB)</h1>
    </div>

    <UAlert v-if="error" color="error" variant="soft" icon="i-lucide-alert-circle" :description="error" />

    <!-- Filter -->
    <div class="flex items-center gap-3">
      <USelect v-model="filterTipe" :items="tipeOptions" class="w-40" />
      <USelect v-model="filterStatus" :items="statusOptions" class="w-44" />
    </div>

    <UCard>
      <UTable :data="listWithNama" :columns="columns" :loading="loading">
        <template #tanggal-cell="{ row }">
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
          <div>
            <p class="font-medium text-text-100">{{ (row.original as PmbPendaftarWithNama).nama }}</p>
            <p class="text-xs text-text-300 capitalize">{{ (row.original as PmbPendaftarWithNama).program_studi }}</p>
          </div>
        </template>

        <template #status-cell="{ row }">
          <UBadge :color="PMB_STATUS_COLOR[(row.original as PmbPendaftarWithNama).status] as any" variant="soft">
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
