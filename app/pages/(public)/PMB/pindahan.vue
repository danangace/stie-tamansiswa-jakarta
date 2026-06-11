<script setup lang="ts">
import type { PmbPindahan_Form } from '~/composables/usePmb'

definePageMeta({ path: '/pmb/pindahan', title: 'Pendaftaran Pindahan / Mutasi', ssr: false })

const { submitPindahan } = usePmb()
const router = useRouter()

const submitting = ref(false)
const error = ref('')

const form = reactive<PmbPindahan_Form>({
  program_studi: '', nama: '', jenis_kelamin: '', nik: '', nisn: '', nim_lama: '',
  tempat_lahir: '', tanggal_lahir: '', agama: '',
  alamat_domisili: '',
  status_pernikahan: '', status_pernikahan_lainnya: null,
  pekerjaan: '', no_hp: '',
  nama_kampus_lama: '', program_studi_lama: '', tahun_masuk_lama: new Date().getFullYear(),
  berkas_surat_mutasi_url: '', berkas_transkrip_url: '',
  berkas_biodata_pp_kti_url: '', berkas_kta_url: '',
  berkas_kk_url: '', berkas_akte_url: '',
})

const berkasSuratMutasi = ref<File | null>(null)
const berkasTranskrip = ref<File | null>(null)
const berkasBiodataPpKti = ref<File | null>(null)
const berkasKta = ref<File | null>(null)
const berkasKk = ref<File | null>(null)
const berkasAkte = ref<File | null>(null)

const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2 MB
const fileErrors = reactive<Record<string, string>>({})
const formErrors = reactive<Record<string, string | undefined>>({})

function validateField(key: string, value: string | null | undefined) {
  const v = (value ?? '').trim()
  if (key === 'nisn') {
    formErrors.nisn = /^\d{10}$/.test(v) ? undefined : 'NISN harus 10 digit angka'
  } else if (key === 'nik') {
    formErrors.nik = /^\d{16}$/.test(v) ? undefined : 'NIK harus 16 digit angka'
  } else if (key === 'nim_lama') {
    formErrors.nim_lama = /^\d+$/.test(v) ? undefined : 'NIM/NPM harus berupa angka'
  } else if (key === 'nama') {
    formErrors.nama = v ? undefined : 'Nama lengkap wajib diisi'
  } else if (key === 'jenis_kelamin') {
    formErrors.jenis_kelamin = v ? undefined : 'Jenis kelamin wajib dipilih'
  } else if (key === 'agama') {
    formErrors.agama = v ? undefined : 'Agama wajib dipilih'
  } else if (key === 'tempat_lahir') {
    formErrors.tempat_lahir = v ? undefined : 'Tempat lahir wajib diisi'
  } else if (key === 'tanggal_lahir') {
    formErrors.tanggal_lahir = v ? undefined : 'Tanggal lahir wajib diisi'
  } else if (key === 'alamat_domisili') {
    formErrors.alamat_domisili = v ? undefined : 'Alamat domisili wajib diisi'
  } else if (key === 'status_pernikahan') {
    formErrors.status_pernikahan = v ? undefined : 'Status pernikahan wajib dipilih'
  } else if (key === 'pekerjaan') {
    formErrors.pekerjaan = v ? undefined : 'Pekerjaan wajib diisi'
  } else if (key === 'program_studi') {
    formErrors.program_studi = v ? undefined : 'Program studi wajib dipilih'
  } else if (key === 'nama_kampus_lama') {
    formErrors.nama_kampus_lama = v ? undefined : 'Nama kampus wajib diisi'
  } else if (key === 'program_studi_lama') {
    formErrors.program_studi_lama = v ? undefined : 'Program studi wajib diisi'
  } else if (key === 'no_hp') {
    if (!v) {
      formErrors.no_hp = 'Nomor HP wajib diisi'
    } else if (!/^\+\d{8,15}$/.test(v)) {
      formErrors.no_hp = 'Nomor HP tidak valid (contoh: 081234567890)'
    } else {
      formErrors.no_hp = undefined
    }
  }
}

function validateAll(): boolean {
  validateField('program_studi', form.program_studi)
  validateField('nama', form.nama)
  validateField('jenis_kelamin', form.jenis_kelamin)
  validateField('agama', form.agama)
  validateField('nik', form.nik)
  validateField('nisn', form.nisn)
  validateField('nim_lama', form.nim_lama)
  validateField('tempat_lahir', form.tempat_lahir)
  validateField('tanggal_lahir', form.tanggal_lahir)
  validateField('alamat_domisili', form.alamat_domisili)
  validateField('status_pernikahan', form.status_pernikahan)
  validateField('pekerjaan', form.pekerjaan)
  validateField('nama_kampus_lama', form.nama_kampus_lama)
  validateField('program_studi_lama', form.program_studi_lama)
  validateField('no_hp', form.no_hp)
  return Object.values(formErrors).every(e => !e)
}

function onFileChange(key: string, e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0] ?? null
  fileErrors[key] = ''

  if (file) {
    if (file.type !== 'application/pdf') {
      fileErrors[key] = 'File harus berformat PDF.'
      input.value = ''
      return
    }
    if (file.size > MAX_FILE_SIZE) {
      fileErrors[key] = 'Ukuran file tidak boleh lebih dari 2 MB.'
      input.value = ''
      return
    }
  }

  if (key === 'surat_mutasi') berkasSuratMutasi.value = file
  if (key === 'transkrip') berkasTranskrip.value = file
  if (key === 'biodata_pp_kti') berkasBiodataPpKti.value = file
  if (key === 'kta') berkasKta.value = file
  if (key === 'kk') berkasKk.value = file
  if (key === 'akte') berkasAkte.value = file
}

const agamaOptions = ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu']
const prodiOptions = [{ label: 'S1 Manajemen', value: 'manajemen' }, { label: 'S1 Akuntansi', value: 'akuntansi' }]
const statusOptions = [
  { label: 'Lajang', value: 'lajang' },
  { label: 'Menikah', value: 'menikah' },
  { label: 'Lainnya', value: 'lainnya' },
]

async function handleSubmit() {
  if (!validateAll()) {
    error.value = 'Harap perbaiki kesalahan pada form di bawah.'
    return
  }
  if (!berkasSuratMutasi.value || !berkasTranskrip.value || !berkasBiodataPpKti.value
    || !berkasKta.value || !berkasKk.value || !berkasAkte.value) {
    error.value = 'Semua berkas wajib diupload.'
    return
  }
  submitting.value = true
  error.value = ''
  try {
    const { id, nomor } = await submitPindahan(form, {
      surat_mutasi: berkasSuratMutasi.value,
      transkrip: berkasTranskrip.value,
      biodata_pp_kti: berkasBiodataPpKti.value,
      kta: berkasKta.value,
      kk: berkasKk.value,
      akte: berkasAkte.value,
    })
    router.push(`/pmb/sukses?id=${id}&nomor=${nomor}`)
  } catch (err: unknown) {
    error.value = err instanceof Error ? err.message : 'Terjadi kesalahan, coba lagi.'
  } finally {
    submitting.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-neutral-50 dark:bg-neutral-300 py-12">
    <div class="max-w-2xl mx-auto px-4">

      <!-- Header -->
      <div class="mb-8">
        <NuxtLink to="/pmb" class="text-sm text-primary-600 dark:text-primary-300 hover:underline flex items-center gap-1 mb-4">
          <UIcon name="i-lucide-arrow-left" class="w-4 h-4" /> Kembali
        </NuxtLink>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-neutral-900">Pendaftaran Pindahan / Mutasi</h1>
        <p class="text-gray-500 dark:text-neutral-700 mt-1">Isi semua field yang wajib diisi dengan lengkap dan benar.</p>
      </div>

      <UAlert v-if="error" color="error" variant="soft" icon="i-lucide-alert-circle" :description="error" class="mb-6" />

      <form class="flex flex-col gap-6" @submit.prevent="handleSubmit">

        <!-- ── DATA MAHASISWI PINDAHAN ── -->
        <UCard>
          <template #header>
            <h2 class="font-semibold text-text-100">Data Mahasiswa/i Pindahan</h2>
          </template>
          <div class="flex flex-col gap-4">
            <UFormField label="Nama Lengkap" required :error="formErrors.nama">
              <UInput v-model="form.nama" placeholder="Sesuai KTP" class="w-full" @blur="validateField('nama', form.nama)" />
            </UFormField>

            <UFormField label="Program Studi yang Dituju" required :error="formErrors.program_studi">
              <USelect v-model="form.program_studi" :items="prodiOptions" placeholder="Pilih program studi" class="w-full" @update:model-value="validateField('program_studi', $event)" />
            </UFormField>

            <div class="grid grid-cols-2 gap-4">
              <UFormField label="Jenis Kelamin" required :error="formErrors.jenis_kelamin">
                <USelect v-model="form.jenis_kelamin" :items="['Laki-Laki', 'Perempuan']" placeholder="Pilih" class="w-full" @update:model-value="validateField('jenis_kelamin', $event)" />
              </UFormField>
              <UFormField label="Agama" required :error="formErrors.agama">
                <USelect v-model="form.agama" :items="agamaOptions" placeholder="Pilih" class="w-full" @update:model-value="validateField('agama', $event)" />
              </UFormField>
            </div>

            <div class="grid grid-cols-2 gap-4">
              <UFormField label="NIK (Sesuai KTP)" required :error="formErrors.nik">
                <UInput v-model="form.nik" placeholder="Nomor Induk Kependudukan" inputmode="numeric" pattern="[0-9]*" class="w-full" @blur="validateField('nik', form.nik)" />
              </UFormField>
              <UFormField label="NISN" required :error="formErrors.nisn">
                <UInput v-model="form.nisn" placeholder="Nomor Induk Siswa Nasional" inputmode="numeric" pattern="[0-9]*" class="w-full" @blur="validateField('nisn', form.nisn)" />
              </UFormField>
            </div>

            <UFormField label="NIM / NPM Kampus Lama" required :error="formErrors.nim_lama">
              <UInput v-model="form.nim_lama" placeholder="NIM dari kampus sebelumnya" inputmode="numeric" pattern="[0-9]*" class="w-full" @blur="validateField('nim_lama', form.nim_lama)" />
            </UFormField>

            <div class="grid grid-cols-2 gap-4">
              <UFormField label="Tempat Lahir" required :error="formErrors.tempat_lahir">
                <UInput v-model="form.tempat_lahir" placeholder="Kota" class="w-full" @blur="validateField('tempat_lahir', form.tempat_lahir)" />
              </UFormField>
              <UFormField label="Tanggal Lahir" required :error="formErrors.tanggal_lahir">
                <UInput v-model="form.tanggal_lahir" type="date" class="w-full" @blur="validateField('tanggal_lahir', form.tanggal_lahir)" />
              </UFormField>
            </div>

            <UFormField label="Alamat Domisili" required :error="formErrors.alamat_domisili">
              <UTextarea v-model="form.alamat_domisili" placeholder="Alamat lengkap tempat tinggal" :rows="2" class="w-full" @blur="validateField('alamat_domisili', form.alamat_domisili)" />
            </UFormField>

            <UFormField label="Status Pernikahan" required :error="formErrors.status_pernikahan">
              <USelect v-model="form.status_pernikahan" :items="statusOptions" placeholder="Pilih" class="w-full" @update:model-value="validateField('status_pernikahan', $event)" />
            </UFormField>
            <UFormField v-if="form.status_pernikahan === 'lainnya'" label="Jelaskan Status Pernikahan" required>
              <UInput v-model="form.status_pernikahan_lainnya" placeholder="Contoh: Duda, Janda, dll." class="w-full" />
            </UFormField>

            <div class="grid grid-cols-2 gap-4">
              <UFormField label="Pekerjaan" required :error="formErrors.pekerjaan">
                <UInput v-model="form.pekerjaan" placeholder="Pekerjaan saat ini" class="w-full" @blur="validateField('pekerjaan', form.pekerjaan)" />
              </UFormField>
              <UFormField label="Nomor HP / WhatsApp" required :error="formErrors.no_hp">
                <AtomicPhoneInput v-model="form.no_hp" class="w-full" @blur="validateField('no_hp', form.no_hp)" />
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
            <UFormField label="Nama Kampus / Universitas Sebelumnya" required :error="formErrors.nama_kampus_lama">
              <UInput v-model="form.nama_kampus_lama" placeholder="Nama perguruan tinggi" class="w-full" @blur="validateField('nama_kampus_lama', form.nama_kampus_lama)" />
            </UFormField>
            <UFormField label="Program Studi Sebelumnya" required :error="formErrors.program_studi_lama">
              <UInput v-model="form.program_studi_lama" placeholder="Nama program studi" class="w-full" @blur="validateField('program_studi_lama', form.program_studi_lama)" />
            </UFormField>
            <UFormField label="Tahun Masuk Kampus Sebelumnya" required>
              <UInput v-model.number="form.tahun_masuk_lama" type="number" min="1990" :max="new Date().getFullYear()" class="w-full" />
            </UFormField>
          </div>
        </UCard>

        <!-- ── UPLOAD BERKAS ── -->
        <UCard>
          <template #header>
            <h2 class="font-semibold text-text-100">Upload Berkas</h2>
          </template>
          <div class="flex flex-col gap-4">
            <UFormField label="Surat Mutasi dari Kampus Sebelumnya" required :error="fileErrors.surat_mutasi">
              <input type="file" accept=".pdf" class="w-full text-sm text-text-300 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-neutral-100 dark:file:bg-neutral-700 file:text-neutral-700 dark:file:text-neutral-900 hover:file:bg-neutral-200 dark:hover:file:bg-neutral-600" @change="onFileChange('surat_mutasi', $event)" />
              <template #hint><span class="text-xs text-text-300">PDF, maks. 2 MB</span></template>
            </UFormField>
            <UFormField label="Transkrip Nilai Kampus Sebelumnya" required :error="fileErrors.transkrip">
              <input type="file" accept=".pdf" class="w-full text-sm text-text-300 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-neutral-100 dark:file:bg-neutral-700 file:text-neutral-700 dark:file:text-neutral-900 hover:file:bg-neutral-200 dark:hover:file:bg-neutral-600" @change="onFileChange('transkrip', $event)" />
              <template #hint><span class="text-xs text-text-300">PDF, maks. 2 MB</span></template>
            </UFormField>
            <UFormField label="Printout Biodata di PP / KTI" required :error="fileErrors.biodata_pp_kti">
              <input type="file" accept=".pdf" class="w-full text-sm text-text-300 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-neutral-100 dark:file:bg-neutral-700 file:text-neutral-700 dark:file:text-neutral-900 hover:file:bg-neutral-200 dark:hover:file:bg-neutral-600" @change="onFileChange('biodata_pp_kti', $event)" />
              <template #hint><span class="text-xs text-text-300">PDF, maks. 2 MB</span></template>
            </UFormField>
            <UFormField label="Kartu Tanda Anggota / KTM Kampus Lama" required :error="fileErrors.kta">
              <input type="file" accept=".pdf" class="w-full text-sm text-text-300 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-neutral-100 dark:file:bg-neutral-700 file:text-neutral-700 dark:file:text-neutral-900 hover:file:bg-neutral-200 dark:hover:file:bg-neutral-600" @change="onFileChange('kta', $event)" />
              <template #hint><span class="text-xs text-text-300">PDF, maks. 2 MB</span></template>
            </UFormField>
            <UFormField label="Kartu Keluarga (KK)" required :error="fileErrors.kk">
              <input type="file" accept=".pdf" class="w-full text-sm text-text-300 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-neutral-100 dark:file:bg-neutral-700 file:text-neutral-700 dark:file:text-neutral-900 hover:file:bg-neutral-200 dark:hover:file:bg-neutral-600" @change="onFileChange('kk', $event)" />
              <template #hint><span class="text-xs text-text-300">PDF, maks. 2 MB</span></template>
            </UFormField>
            <UFormField label="Akte Kelahiran" required :error="fileErrors.akte">
              <input type="file" accept=".pdf" class="w-full text-sm text-text-300 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-neutral-100 dark:file:bg-neutral-700 file:text-neutral-700 dark:file:text-neutral-900 hover:file:bg-neutral-200 dark:hover:file:bg-neutral-600" @change="onFileChange('akte', $event)" />
              <template #hint><span class="text-xs text-text-300">PDF, maks. 2 MB</span></template>
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
