<script setup lang="ts">
import type { PmbBaru_Form } from '~/composables/usePmb'

definePageMeta({ path: '/pmb/baru', title: 'Pendaftaran Mahasiswa Baru' })

const { submitBaru } = usePmb()
const router = useRouter()

const submitting = ref(false)
const error = ref('')

const form = reactive<PmbBaru_Form>({
  nama: '', jenis_kelamin: '', agama: '', program_studi: '', nisn: '', nik: '',
  tempat_lahir: '', tanggal_lahir: '', alamat_domisili: '',
  status_pernikahan: '', status_pernikahan_lainnya: null,
  pekerjaan: '', no_hp: '',
  nama_sma: '', jurusan_sma: null, tahun_masuk_sma: new Date().getFullYear(), tahun_lulus_sma: new Date().getFullYear(),
  nama_ibu_kandung: '', nama_ayah_kandung: '', nama_wali: '',
  no_hp_ortu: '', no_hp_wali: '',
  pekerjaan_ibu: '', pekerjaan_ayah: '', pekerjaan_wali: '',
  penghasilan_rata_rata: '',
  berkas_ijazah_url: null, berkas_ktp_url: '', berkas_kk_url: '', berkas_akte_url: '',
})

const berkasIjazah = ref<File | null>(null)
const berkasKtp = ref<File | null>(null)
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
  } else if (key === 'nama') {
    formErrors.nama = v ? undefined : 'Nama lengkap wajib diisi'
  } else if (key === 'jenis_kelamin') {
    formErrors.jenis_kelamin = v ? undefined : 'Jenis kelamin wajib dipilih'
  } else if (key === 'agama') {
    formErrors.agama = v ? undefined : 'Agama wajib dipilih'
  } else if (key === 'program_studi') {
    formErrors.program_studi = v ? undefined : 'Program studi wajib dipilih'
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
  } else if (key === 'nama_sma') {
    formErrors.nama_sma = v ? undefined : 'Nama sekolah wajib diisi'
  } else if (key === 'nama_ibu_kandung') {
    formErrors.nama_ibu_kandung = v ? undefined : 'Nama ibu kandung wajib diisi'
  } else if (key === 'nama_ayah_kandung') {
    formErrors.nama_ayah_kandung = v ? undefined : 'Nama ayah kandung wajib diisi'
  } else if (key === 'nama_wali') {
    formErrors.nama_wali = v ? undefined : 'Nama wali wajib diisi'
  } else if (key === 'penghasilan_rata_rata') {
    formErrors.penghasilan_rata_rata = v ? undefined : 'Penghasilan rata-rata wajib diisi'
  } else if (key === 'no_hp' || key === 'no_hp_ortu' || key === 'no_hp_wali') {
    if (!v) {
      formErrors[key] = 'Nomor HP wajib diisi'
    } else if (!/^\+\d{8,15}$/.test(v)) {
      formErrors[key] = 'Nomor HP tidak valid (contoh: 081234567890)'
    } else {
      formErrors[key] = undefined
    }
  }
}

function validateAll(): boolean {
  validateField('nama', form.nama)
  validateField('jenis_kelamin', form.jenis_kelamin)
  validateField('agama', form.agama)
  validateField('program_studi', form.program_studi)
  validateField('nisn', form.nisn)
  validateField('nik', form.nik)
  validateField('tempat_lahir', form.tempat_lahir)
  validateField('tanggal_lahir', form.tanggal_lahir)
  validateField('alamat_domisili', form.alamat_domisili)
  validateField('status_pernikahan', form.status_pernikahan)
  validateField('pekerjaan', form.pekerjaan)
  validateField('nama_sma', form.nama_sma)
  validateField('nama_ibu_kandung', form.nama_ibu_kandung)
  validateField('nama_ayah_kandung', form.nama_ayah_kandung)
  validateField('nama_wali', form.nama_wali)
  validateField('penghasilan_rata_rata', form.penghasilan_rata_rata)
  validateField('no_hp', form.no_hp)
  validateField('no_hp_ortu', form.no_hp_ortu)
  validateField('no_hp_wali', form.no_hp_wali)
  return Object.values(formErrors).every(e => !e)
}

function onFileChange(key: 'ijazah' | 'ktp' | 'kk' | 'akte', e: Event) {
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

  if (key === 'ijazah') berkasIjazah.value = file
  if (key === 'ktp') berkasKtp.value = file
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
  if (!berkasKtp.value || !berkasKk.value || !berkasAkte.value) {
    error.value = 'KTP, Kartu Keluarga, dan Akte Kelahiran wajib diupload.'
    return
  }
  submitting.value = true
  error.value = ''
  try {
    form.penghasilan_rata_rata = form.penghasilan_rata_rata.replace(/\D/g, '')
    const { id, nomor } = await submitBaru(form, {
      ijazah: berkasIjazah.value,
      ktp: berkasKtp.value,
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
        <h1 class="text-3xl font-bold text-gray-900 dark:text-neutral-900">Pendaftaran Mahasiswa Baru</h1>
        <p class="text-gray-500 dark:text-neutral-700 mt-1">Isi semua field yang wajib diisi dengan lengkap dan benar.</p>
      </div>

      <UAlert v-if="error" color="error" variant="soft" icon="i-lucide-alert-circle" :description="error" class="mb-6" />

      <form class="flex flex-col gap-6" @submit.prevent="handleSubmit">

        <!-- ── DATA CALON MAHASISWI ── -->
        <UCard>
          <template #header>
            <h2 class="font-semibold text-text-100">Data Calon Mahasiswa/i</h2>
          </template>
          <div class="flex flex-col gap-4">
            <UFormField label="Nama Lengkap" required :error="formErrors.nama">
              <UInput v-model="form.nama" placeholder="Sesuai KTP" class="w-full" @blur="validateField('nama', form.nama)" />
            </UFormField>

            <div class="grid grid-cols-2 gap-4">
              <UFormField label="Jenis Kelamin" required :error="formErrors.jenis_kelamin">
                <USelect v-model="form.jenis_kelamin" :items="['Laki-Laki', 'Perempuan']" placeholder="Pilih" class="w-full" @update:model-value="validateField('jenis_kelamin', $event)" />
              </UFormField>
              <UFormField label="Agama" required :error="formErrors.agama">
                <USelect v-model="form.agama" :items="agamaOptions" placeholder="Pilih" class="w-full" @update:model-value="validateField('agama', $event)" />
              </UFormField>
            </div>

            <UFormField label="Program Studi" required :error="formErrors.program_studi">
              <USelect v-model="form.program_studi" :items="prodiOptions" placeholder="Pilih program studi" class="w-full" @update:model-value="validateField('program_studi', $event)" />
            </UFormField>

            <div class="grid grid-cols-2 gap-4">
              <UFormField label="NISN" required :error="formErrors.nisn">
                <UInput v-model="form.nisn" placeholder="Nomor Induk Siswa Nasional" inputmode="numeric" pattern="[0-9]*" class="w-full" @blur="validateField('nisn', form.nisn)" />
              </UFormField>
              <UFormField label="NIK" required :error="formErrors.nik">
                <UInput v-model="form.nik" placeholder="Nomor Induk Kependudukan" inputmode="numeric" pattern="[0-9]*" class="w-full" @blur="validateField('nik', form.nik)" />
              </UFormField>
            </div>

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
            <h2 class="font-semibold text-text-100">Data Akademik</h2>
          </template>
          <div class="flex flex-col gap-4">
            <UFormField label="Nama SMA/SMK/MA/MTs" required :error="formErrors.nama_sma">
              <UInput v-model="form.nama_sma" placeholder="Nama sekolah" class="w-full" @blur="validateField('nama_sma', form.nama_sma)" />
            </UFormField>
            <UFormField label="Jurusan">
              <UInput v-model="form.jurusan_sma" placeholder="IPA / IPS — kosongkan jika tidak ada" class="w-full" />
              <template #hint><span class="text-xs text-text-300">Opsional</span></template>
            </UFormField>
            <div class="grid grid-cols-2 gap-4">
              <UFormField label="Tahun Masuk SMA/SMK/MA/MTs" required>
                <UInput v-model.number="form.tahun_masuk_sma" type="number" min="1990" :max="new Date().getFullYear()" class="w-full" />
              </UFormField>
              <UFormField label="Tahun Lulus SMA/SMK/MA/MTs" required>
                <UInput v-model.number="form.tahun_lulus_sma" type="number" min="1990" :max="new Date().getFullYear() + 1" class="w-full" />
              </UFormField>
            </div>
          </div>
        </UCard>

        <!-- ── DATA ORANG TUA / WALI ── -->
        <UCard>
          <template #header>
            <h2 class="font-semibold text-text-100">Data Orang Tua / Wali</h2>
          </template>
          <div class="flex flex-col gap-4">
            <div class="grid grid-cols-2 gap-4">
              <UFormField label="Nama Ibu Kandung" required :error="formErrors.nama_ibu_kandung">
                <UInput v-model="form.nama_ibu_kandung" placeholder="Nama lengkap ibu" class="w-full" @blur="validateField('nama_ibu_kandung', form.nama_ibu_kandung)" />
              </UFormField>
              <UFormField label="Nama Ayah Kandung" required :error="formErrors.nama_ayah_kandung">
                <UInput v-model="form.nama_ayah_kandung" placeholder="Nama lengkap ayah" class="w-full" @blur="validateField('nama_ayah_kandung', form.nama_ayah_kandung)" />
              </UFormField>
            </div>
            <UFormField label="Nama Wali Mahasiswa/i" required :error="formErrors.nama_wali">
              <UInput v-model="form.nama_wali" placeholder="Nama wali (isi sama dengan ayah/ibu jika wali adalah orang tua)" class="w-full" @blur="validateField('nama_wali', form.nama_wali)" />
            </UFormField>
            <div class="grid grid-cols-2 gap-4">
              <UFormField label="Nomor HP / WhatsApp Orang Tua" required :error="formErrors.no_hp_ortu">
                <AtomicPhoneInput v-model="form.no_hp_ortu" class="w-full" @blur="validateField('no_hp_ortu', form.no_hp_ortu)" />
              </UFormField>
              <UFormField label="Nomor HP / WhatsApp Wali" required :error="formErrors.no_hp_wali">
                <AtomicPhoneInput v-model="form.no_hp_wali" class="w-full" @blur="validateField('no_hp_wali', form.no_hp_wali)" />
              </UFormField>
            </div>
            <div class="grid grid-cols-3 gap-4">
              <UFormField label="Pekerjaan Ibu" required>
                <UInput v-model="form.pekerjaan_ibu" placeholder="Pekerjaan ibu" class="w-full" />
              </UFormField>
              <UFormField label="Pekerjaan Ayah" required>
                <UInput v-model="form.pekerjaan_ayah" placeholder="Pekerjaan ayah" class="w-full" />
              </UFormField>
              <UFormField label="Pekerjaan Wali" required>
                <UInput v-model="form.pekerjaan_wali" placeholder="Pekerjaan wali" class="w-full" />
              </UFormField>
            </div>
            <UFormField label="Penghasilan Rata-Rata per Bulan" required :error="formErrors.penghasilan_rata_rata">
              <UInput v-model="form.penghasilan_rata_rata" placeholder="Contoh: Rp 3.000.000" class="w-full" @blur="validateField('penghasilan_rata_rata', form.penghasilan_rata_rata)" />
            </UFormField>
          </div>
        </UCard>

        <!-- ── UPLOAD BERKAS ── -->
        <UCard>
          <template #header>
            <h2 class="font-semibold text-text-100">Upload Berkas</h2>
          </template>
          <div class="flex flex-col gap-4">
            <UFormField label="Ijazah / SKL" :error="fileErrors.ijazah">
              <input type="file" accept=".pdf" class="w-full text-sm text-text-300 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 dark:file:bg-neutral-700 dark:file:text-neutral-900 dark:hover:file:bg-neutral-600" @change="onFileChange('ijazah', $event)" />
              <template #hint><span class="text-xs text-text-300">Opsional — untuk yang sudah lulus · PDF, maks. 2 MB</span></template>
            </UFormField>
            <UFormField label="KTP Mahasiswa/i" required :error="fileErrors.ktp">
              <input type="file" accept=".pdf" class="w-full text-sm text-text-300 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 dark:file:bg-neutral-700 dark:file:text-neutral-900 dark:hover:file:bg-neutral-600" @change="onFileChange('ktp', $event)" />
              <template #hint><span class="text-xs text-text-300">PDF, maks. 2 MB</span></template>
            </UFormField>
            <UFormField label="Kartu Keluarga (KK)" required :error="fileErrors.kk">
              <input type="file" accept=".pdf" class="w-full text-sm text-text-300 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 dark:file:bg-neutral-700 dark:file:text-neutral-900 dark:hover:file:bg-neutral-600" @change="onFileChange('kk', $event)" />
              <template #hint><span class="text-xs text-text-300">PDF, maks. 2 MB</span></template>
            </UFormField>
            <UFormField label="Akte Kelahiran" required :error="fileErrors.akte">
              <input type="file" accept=".pdf" class="w-full text-sm text-text-300 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100 dark:file:bg-neutral-700 dark:file:text-neutral-900 dark:hover:file:bg-neutral-600" @change="onFileChange('akte', $event)" />
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
