<script setup lang="ts">
import { type PmbStatus, PMB_STATUS_LABEL, PMB_STATUS_COLOR } from '~/composables/usePmb'

definePageMeta({ layout: 'admin' })

const route = useRoute()
const id = route.params.id as string
const { getDetail, updateStatus } = usePmb()

const data = ref<Awaited<ReturnType<typeof getDetail>> | null>(null)
const loading = ref(true)
const error = ref('')
const saving = ref(false)
const savedMsg = ref('')

const editStatus = ref<PmbStatus>('menunggu_verifikasi')
const editCatatan = ref('')

async function loadData() {
  loading.value = true
  try {
    data.value = await getDetail(id)
    editStatus.value = data.value.status
    editCatatan.value = data.value.catatan_admin ?? ''
  } catch (err: unknown) {
    error.value = err instanceof Error ? err.message : 'Gagal memuat data'
  } finally {
    loading.value = false
  }
}

async function handleSaveStatus() {
  saving.value = true
  savedMsg.value = ''
  try {
    await updateStatus(id, editStatus.value, editCatatan.value)
    if (data.value) {
      data.value.status = editStatus.value
      data.value.catatan_admin = editCatatan.value
    }
    savedMsg.value = 'Status berhasil disimpan.'
  } catch (err: unknown) {
    error.value = err instanceof Error ? err.message : 'Gagal menyimpan status'
  } finally {
    saving.value = false
  }
}

const statusOptions = [
  { label: 'Menunggu Verifikasi', value: 'menunggu_verifikasi' },
  { label: 'Diterima', value: 'diterima' },
  { label: 'Ditolak', value: 'ditolak' },
]

function formatDate(iso: string | null | undefined) {
  if (!iso) return '—'
  return new Date(iso).toLocaleDateString('id-ID', { day: '2-digit', month: 'long', year: 'numeric' })
}

const PRODI_LABEL: Record<string, string> = { manajemen: 'S1 Manajemen', akuntansi: 'S1 Akuntansi' }
function formatProdi(value: string | null | undefined) {
  if (!value) return '—'
  return PRODI_LABEL[value] ?? value
}

const previewOpen = ref(false)
const previewSrc = ref<string | null>(null)
function openPreview(src: string | null | undefined) {
  if (!src) return
  previewSrc.value = src
  previewOpen.value = true
}

onMounted(loadData)
</script>

<template>
  <div class="flex flex-col gap-4 max-w-3xl">

    <!-- Back -->
    <NuxtLink to="/admin/pmb" class="flex items-center gap-1 text-sm text-text-300 hover:text-text-100 w-fit">
      <UIcon name="i-lucide-arrow-left" class="w-4 h-4" /> Kembali ke daftar
    </NuxtLink>

    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-text-100">Detail Pendaftar</h1>
      <UBadge v-if="data" :color="PMB_STATUS_COLOR[data.status] as any" variant="soft" size="lg">
        {{ PMB_STATUS_LABEL[data.status] }}
      </UBadge>
    </div>

    <UAlert v-if="error" color="error" variant="soft" icon="i-lucide-alert-circle" :description="error" />

    <div v-if="loading" class="flex justify-center py-20">
      <UIcon name="i-lucide-loader-2" class="w-8 h-8 animate-spin text-primary-500" />
    </div>

    <template v-else-if="data">

      <!-- ── UPDATE STATUS ── -->
      <UCard>
        <template #header>
          <h2 class="font-semibold text-text-100">Ubah Status</h2>
        </template>
        <div class="flex flex-col gap-3">
          <UFormField label="Status">
            <USelect v-model="editStatus" :items="statusOptions" class="w-48" />
          </UFormField>
          <UFormField label="Catatan Admin">
            <UTextarea v-model="editCatatan" placeholder="Catatan internal (tidak ditampilkan ke pendaftar)..." :rows="3" class="w-full" />
          </UFormField>
          <div class="flex items-center gap-3">
            <UButton color="primary" :loading="saving" @click="handleSaveStatus">
              Simpan Status
            </UButton>
            <span v-if="savedMsg" class="text-sm text-green-600">{{ savedMsg }}</span>
          </div>
        </div>
      </UCard>

      <!-- ── INFO UMUM ── -->
      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <h2 class="font-semibold text-text-100">Info Umum</h2>
            <UBadge :color="data.tipe === 'baru' ? 'primary' : 'secondary'" variant="soft" class="capitalize">
              {{ data.tipe }}
            </UBadge>
          </div>
        </template>
        <div class="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
          <div class="text-text-300">Nomor Pendaftaran</div>
          <div class="font-mono font-bold text-text-100 text-lg tracking-widest">{{ data.nomor_pendaftaran }}</div>
          <div class="text-text-300">Tanggal Daftar</div>
          <div>{{ formatDate(data.created_at) }}</div>
        </div>
      </UCard>

      <!-- ── DATA BARU ── -->
      <template v-if="data.tipe === 'baru' && data.pmb_baru">
        <UCard>
          <template #header><h2 class="font-semibold text-text-100">Data Calon Mahasiswa/i</h2></template>
          <div class="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
            <div class="text-text-300">Nama</div><div class="font-medium">{{ data.pmb_baru.nama }}</div>
            <div class="text-text-300">Jenis Kelamin</div><div>{{ data.pmb_baru.jenis_kelamin }}</div>
            <div class="text-text-300">Agama</div><div>{{ data.pmb_baru.agama }}</div>
            <div class="text-text-300">Program Studi</div><div>{{ formatProdi(data.pmb_baru.program_studi) }}</div>
            <div class="text-text-300">NISN</div><div class="font-mono">{{ data.pmb_baru.nisn }}</div>
            <div class="text-text-300">NIK</div><div class="font-mono">{{ data.pmb_baru.nik }}</div>
            <div class="text-text-300">Tempat / Tgl Lahir</div><div>{{ data.pmb_baru.tempat_lahir }}, {{ formatDate(data.pmb_baru.tanggal_lahir) }}</div>
            <div class="text-text-300">Alamat Domisili</div><div>{{ data.pmb_baru.alamat_domisili }}</div>
            <div class="text-text-300">Status Pernikahan</div><div class="capitalize">{{ data.pmb_baru.status_pernikahan }}{{ data.pmb_baru.status_pernikahan_lainnya ? ` (${data.pmb_baru.status_pernikahan_lainnya})` : '' }}</div>
            <div class="text-text-300">Pekerjaan</div><div>{{ data.pmb_baru.pekerjaan }}</div>
            <div class="text-text-300">Nomor HP</div><div>{{ data.pmb_baru.no_hp }}</div>
          </div>
        </UCard>

        <UCard>
          <template #header><h2 class="font-semibold text-text-100">Data Akademik</h2></template>
          <div class="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
            <div class="text-text-300">Nama SMA/SMK/MTs</div><div>{{ data.pmb_baru.nama_sma }}</div>
            <div class="text-text-300">Jurusan</div><div>{{ data.pmb_baru.jurusan_sma || '—' }}</div>
            <div class="text-text-300">Tahun Masuk</div><div>{{ data.pmb_baru.tahun_masuk_sma }}</div>
            <div class="text-text-300">Tahun Lulus</div><div>{{ data.pmb_baru.tahun_lulus_sma }}</div>
          </div>
        </UCard>

        <UCard>
          <template #header><h2 class="font-semibold text-text-100">Data Orang Tua / Wali</h2></template>
          <div class="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
            <div class="text-text-300">Nama Ibu Kandung</div><div>{{ data.pmb_baru.nama_ibu_kandung }}</div>
            <div class="text-text-300">Nama Ayah Kandung</div><div>{{ data.pmb_baru.nama_ayah_kandung }}</div>
            <div class="text-text-300">Nama Wali</div><div>{{ data.pmb_baru.nama_wali }}</div>
            <div class="text-text-300">HP Orang Tua</div><div>{{ data.pmb_baru.no_hp_ortu }}</div>
            <div class="text-text-300">HP Wali</div><div>{{ data.pmb_baru.no_hp_wali }}</div>
            <div class="text-text-300">Pekerjaan Ibu</div><div>{{ data.pmb_baru.pekerjaan_ibu }}</div>
            <div class="text-text-300">Pekerjaan Ayah</div><div>{{ data.pmb_baru.pekerjaan_ayah }}</div>
            <div class="text-text-300">Pekerjaan Wali</div><div>{{ data.pmb_baru.pekerjaan_wali }}</div>
            <div class="text-text-300">Penghasilan Rata-Rata</div><div>{{ data.pmb_baru.penghasilan_rata_rata }}</div>
          </div>
        </UCard>

        <UCard>
          <template #header><h2 class="font-semibold text-text-100">Berkas</h2></template>
          <div class="grid grid-cols-2 gap-3">
            <div v-for="(item) in [
              { label: 'Ijazah / SKL', url: data.pmb_baru.berkas_ijazah_url },
              { label: 'KTP', url: data.pmb_baru.berkas_ktp_url },
              { label: 'Kartu Keluarga', url: data.pmb_baru.berkas_kk_url },
              { label: 'Akte Kelahiran', url: data.pmb_baru.berkas_akte_url },
            ]" :key="item.label">
              <div class="border border-neutral-200 dark:border-neutral-700 rounded-lg p-3 flex items-center justify-between gap-2">
                <span class="text-sm text-text-300">{{ item.label }}</span>
                <UButton v-if="item.url" icon="i-lucide-eye" size="xs" color="neutral" variant="ghost" @click="openPreview(item.url)" />
                <span v-else class="text-xs text-text-300">—</span>
              </div>
            </div>
          </div>
        </UCard>
      </template>

      <!-- ── DATA PINDAHAN ── -->
      <template v-else-if="data.tipe === 'pindahan' && data.pmb_pindahan">
        <UCard>
          <template #header><h2 class="font-semibold text-text-100">Data Mahasiswa/i Pindahan</h2></template>
          <div class="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
            <div class="text-text-300">Nama</div><div class="font-medium">{{ data.pmb_pindahan.nama }}</div>
            <div class="text-text-300">Program Studi yang Dituju</div><div>{{ formatProdi(data.pmb_pindahan.program_studi) }}</div>
            <div class="text-text-300">Jenis Kelamin</div><div>{{ data.pmb_pindahan.jenis_kelamin }}</div>
            <div class="text-text-300">Agama</div><div>{{ data.pmb_pindahan.agama }}</div>
            <div class="text-text-300">NIK</div><div class="font-mono">{{ data.pmb_pindahan.nik }}</div>
            <div class="text-text-300">NISN</div><div class="font-mono">{{ data.pmb_pindahan.nisn }}</div>
            <div class="text-text-300">NIM / NPM Lama</div><div class="font-mono">{{ data.pmb_pindahan.nim_lama }}</div>
            <div class="text-text-300">Tempat / Tgl Lahir</div><div>{{ data.pmb_pindahan.tempat_lahir }}, {{ formatDate(data.pmb_pindahan.tanggal_lahir) }}</div>
            <div class="text-text-300">Alamat Domisili</div><div>{{ data.pmb_pindahan.alamat_domisili }}</div>
            <div class="text-text-300">Status Pernikahan</div><div class="capitalize">{{ data.pmb_pindahan.status_pernikahan }}{{ data.pmb_pindahan.status_pernikahan_lainnya ? ` (${data.pmb_pindahan.status_pernikahan_lainnya})` : '' }}</div>
            <div class="text-text-300">Pekerjaan</div><div>{{ data.pmb_pindahan.pekerjaan }}</div>
            <div class="text-text-300">Nomor HP</div><div>{{ data.pmb_pindahan.no_hp }}</div>
          </div>
        </UCard>

        <UCard>
          <template #header><h2 class="font-semibold text-text-100">Data Akademik Kampus Sebelumnya</h2></template>
          <div class="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
            <div class="text-text-300">Nama Kampus</div><div>{{ data.pmb_pindahan.nama_kampus_lama }}</div>
            <div class="text-text-300">Program Studi</div><div>{{ data.pmb_pindahan.program_studi_lama }}</div>
            <div class="text-text-300">Tahun Masuk</div><div>{{ data.pmb_pindahan.tahun_masuk_lama }}</div>
          </div>
        </UCard>

        <UCard>
          <template #header><h2 class="font-semibold text-text-100">Berkas</h2></template>
          <div class="grid grid-cols-2 gap-3">
            <div v-for="(item) in [
              { label: 'Surat Mutasi', url: data.pmb_pindahan.berkas_surat_mutasi_url },
              { label: 'Transkrip Nilai', url: data.pmb_pindahan.berkas_transkrip_url },
              { label: 'Biodata PP/KTI', url: data.pmb_pindahan.berkas_biodata_pp_kti_url },
              { label: 'KTA / KTM Lama', url: data.pmb_pindahan.berkas_kta_url },
              { label: 'Kartu Keluarga', url: data.pmb_pindahan.berkas_kk_url },
              { label: 'Akte Kelahiran', url: data.pmb_pindahan.berkas_akte_url },
            ]" :key="item.label">
              <div class="border border-neutral-200 dark:border-neutral-700 rounded-lg p-3 flex items-center justify-between gap-2">
                <span class="text-sm text-text-300">{{ item.label }}</span>
                <UButton v-if="item.url" icon="i-lucide-eye" size="xs" color="neutral" variant="ghost" @click="openPreview(item.url)" />
                <span v-else class="text-xs text-text-300">—</span>
              </div>
            </div>
          </div>
        </UCard>
      </template>

    </template>

    <AdminImagePreviewModal v-model:open="previewOpen" :src="previewSrc" />
  </div>
</template>
