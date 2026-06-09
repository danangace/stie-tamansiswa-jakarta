<script setup lang="ts">
import type { PmbPindahan_Form } from '~/composables/usePmb'

definePageMeta({ path: '/pmb/pindahan', title: 'Pendaftaran Pindahan / Mutasi' })

const { submitPindahan } = usePmb()
const router = useRouter()

const submitting = ref(false)
const error = ref('')

const form = reactive<PmbPindahan_Form>({
  nama: '', jenis_kelamin: '', nik: '', nim_lama: '',
  tempat_lahir: '', tanggal_lahir: '', agama: '',
  status_pernikahan: '', status_pernikahan_lainnya: null,
  pekerjaan: '', nama_referensi: '', no_hp: '',
  nama_kampus_lama: '', program_studi_lama: '', tahun_masuk_lama: new Date().getFullYear(),
  berkas_surat_tugas_url: null, berkas_transkrip_url: null,
  berkas_biodata_pp_kti_url: null, berkas_kta_url: null,
  berkas_kk_url: null, berkas_akte_url: null,
})

const berkasSuratTugas = ref<File | null>(null)
const berkasTranskrip = ref<File | null>(null)
const berkasBiodataPpKti = ref<File | null>(null)
const berkasKta = ref<File | null>(null)
const berkasKk = ref<File | null>(null)
const berkasAkte = ref<File | null>(null)

function onFileChange(key: string, e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0] ?? null
  if (key === 'surat_tugas') berkasSuratTugas.value = file
  if (key === 'transkrip') berkasTranskrip.value = file
  if (key === 'biodata_pp_kti') berkasBiodataPpKti.value = file
  if (key === 'kta') berkasKta.value = file
  if (key === 'kk') berkasKk.value = file
  if (key === 'akte') berkasAkte.value = file
}

const agamaOptions = ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu']
const statusOptions = ['lajang', 'menikah', 'lainnya']

async function handleSubmit() {
  submitting.value = true
  error.value = ''
  try {
    const id = await submitPindahan(form, {
      surat_tugas: berkasSuratTugas.value,
      transkrip: berkasTranskrip.value,
      biodata_pp_kti: berkasBiodataPpKti.value,
      kta: berkasKta.value,
      kk: berkasKk.value,
      akte: berkasAkte.value,
    })
    router.push(`/pmb/sukses?id=${id}`)
  } catch (err: unknown) {
    error.value = err instanceof Error ? err.message : 'Terjadi kesalahan, coba lagi.'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-neutral-900 py-12">
    <div class="max-w-2xl mx-auto px-4">

      <!-- Header -->
      <div class="mb-8">
        <NuxtLink to="/pmb" class="text-sm text-primary-600 hover:underline flex items-center gap-1 mb-4">
          <UIcon name="i-lucide-arrow-left" class="w-4 h-4" /> Kembali
        </NuxtLink>
        <h1 class="text-3xl font-bold text-text-100">Pendaftaran Pindahan / Mutasi</h1>
        <p class="text-text-300 mt-1">Isi semua field yang wajib diisi dengan lengkap dan benar.</p>
      </div>

      <UAlert v-if="error" color="error" variant="soft" icon="i-lucide-alert-circle" :description="error" class="mb-6" />

      <form class="flex flex-col gap-6" @submit.prevent="handleSubmit">

        <!-- ── DATA MAHASISWI PINDAHAN ── -->
        <UCard>
          <template #header>
            <h2 class="font-semibold text-text-100">Data Mahasiswi Pindahan</h2>
          </template>
          <div class="flex flex-col gap-4">
            <UFormField label="Nama Lengkap" required>
              <UInput v-model="form.nama" placeholder="Sesuai KTP" class="w-full" />
            </UFormField>

            <div class="grid grid-cols-2 gap-4">
              <UFormField label="Jenis Kelamin" required>
                <USelect v-model="form.jenis_kelamin" :items="['Laki-Laki', 'Perempuan']" placeholder="Pilih" class="w-full" />
              </UFormField>
              <UFormField label="Agama" required>
                <USelect v-model="form.agama" :items="agamaOptions" placeholder="Pilih" class="w-full" />
              </UFormField>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <UFormField label="NIK (Sesuai KTP)" required>
                <UInput v-model="form.nik" placeholder="Nomor Induk Kependudukan" class="w-full" />
              </UFormField>
              <UFormField label="NIM / NPM Kampus Lama" required>
                <UInput v-model="form.nim_lama" placeholder="NIM dari kampus sebelumnya" class="w-full" />
              </UFormField>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <UFormField label="Tempat Lahir" required>
                <UInput v-model="form.tempat_lahir" placeholder="Kota" class="w-full" />
              </UFormField>
              <UFormField label="Tanggal Lahir" required>
                <UInput v-model="form.tanggal_lahir" type="date" class="w-full" />
              </UFormField>
            </div>

            <UFormField label="Status Pernikahan" required>
              <USelect v-model="form.status_pernikahan" :items="statusOptions" placeholder="Pilih" class="w-full" />
            </UFormField>
            <UFormField v-if="form.status_pernikahan === 'lainnya'" label="Keterangan Status">
              <UInput v-model="form.status_pernikahan_lainnya" placeholder="Jelaskan status Anda" class="w-full" />
            </UFormField>

            <UFormField label="Nama Referensi" required>
              <UInput v-model="form.nama_referensi" placeholder="Nama orang yang mereferensikan Anda" class="w-full" />
            </UFormField>

            <div class="grid grid-cols-2 gap-4">
              <UFormField label="Pekerjaan" required>
                <UInput v-model="form.pekerjaan" placeholder="Pekerjaan saat ini" class="w-full" />
              </UFormField>
              <UFormField label="Nomor HP / WhatsApp" required>
                <UInput v-model="form.no_hp" placeholder="+62 8xx-xxxx-xxxx" class="w-full" />
              </UFormField>
            </div>
          </div>
        </UCard>

        <!-- ── DATA AKADEMIK ── -->
        <UCard>
          <template #header>
            <h2 class="font-semibold text-text-100">Data Akademik Kampus Sebelumnya</h2>
          </template>
          <div class="flex flex-col gap-4">
            <UFormField label="Nama Kampus / Universitas Sebelumnya" required>
              <UInput v-model="form.nama_kampus_lama" placeholder="Nama perguruan tinggi" class="w-full" />
            </UFormField>
            <UFormField label="Program Studi Sebelumnya" required>
              <UInput v-model="form.program_studi_lama" placeholder="Nama program studi" class="w-full" />
            </UFormField>
            <UFormField label="Tahun Masuk Kampus Sebelumnya" required>
              <UInput v-model.number="form.tahun_masuk_lama" type="number" min="1990" :max="new Date().getFullYear()" class="w-full" />
            </UFormField>
          </div>
        </UCard>

        <!-- ── UPLOAD BERKAS (OPSIONAL) ── -->
        <UCard>
          <template #header>
            <div class="flex items-center justify-between">
              <h2 class="font-semibold text-text-100">Upload Berkas</h2>
              <UBadge color="neutral" variant="soft">Semua Opsional</UBadge>
            </div>
          </template>
          <div class="flex flex-col gap-4">
            <UFormField label="Surat Tugas dari Kampus Sebelumnya">
              <input type="file" accept="image/*,.pdf" class="w-full text-sm text-text-300 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-neutral-100 file:text-neutral-700 hover:file:bg-neutral-200" @change="onFileChange('surat_tugas', $event)" />
            </UFormField>
            <UFormField label="Transkrip Nilai Kampus Sebelumnya">
              <input type="file" accept="image/*,.pdf" class="w-full text-sm text-text-300 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-neutral-100 file:text-neutral-700 hover:file:bg-neutral-200" @change="onFileChange('transkrip', $event)" />
            </UFormField>
            <UFormField label="Printout Biodata di PP / KTI">
              <input type="file" accept="image/*,.pdf" class="w-full text-sm text-text-300 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-neutral-100 file:text-neutral-700 hover:file:bg-neutral-200" @change="onFileChange('biodata_pp_kti', $event)" />
            </UFormField>
            <UFormField label="Kartu Tanda Anggota / KTM Kampus Lama">
              <input type="file" accept="image/*,.pdf" class="w-full text-sm text-text-300 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-neutral-100 file:text-neutral-700 hover:file:bg-neutral-200" @change="onFileChange('kta', $event)" />
            </UFormField>
            <UFormField label="Kartu Keluarga (KK)">
              <input type="file" accept="image/*,.pdf" class="w-full text-sm text-text-300 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-neutral-100 file:text-neutral-700 hover:file:bg-neutral-200" @change="onFileChange('kk', $event)" />
            </UFormField>
            <UFormField label="Akte Kelahiran">
              <input type="file" accept="image/*,.pdf" class="w-full text-sm text-text-300 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-neutral-100 file:text-neutral-700 hover:file:bg-neutral-200" @change="onFileChange('akte', $event)" />
            </UFormField>
          </div>
        </UCard>

        <UButton type="submit" color="primary" size="xl" block :loading="submitting">
          Kirim Pendaftaran
        </UButton>

      </form>
    </div>
  </div>
</template>
