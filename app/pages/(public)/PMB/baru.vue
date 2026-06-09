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
  nama_referensi: '', pekerjaan: '', no_hp: '',
  nama_sma: '', jurusan_sma: null, tahun_masuk_sma: new Date().getFullYear(), tahun_lulus_sma: new Date().getFullYear(),
  nama_ibu_kandung: '', nama_wali: '', no_hp_wali: '', pekerjaan_ayah: '', penghasilan_rata_rata: '',
  berkas_ijazah_url: null, berkas_ktp_url: '', berkas_kk_url: '', berkas_akte_url: '',
})

const berkasIjazah = ref<File | null>(null)
const berkasKtp = ref<File | null>(null)
const berkasKk = ref<File | null>(null)
const berkasAkte = ref<File | null>(null)

function onFileChange(key: 'ijazah' | 'ktp' | 'kk' | 'akte', e: Event) {
  const file = (e.target as HTMLInputElement).files?.[0] ?? null
  if (key === 'ijazah') berkasIjazah.value = file
  if (key === 'ktp') berkasKtp.value = file
  if (key === 'kk') berkasKk.value = file
  if (key === 'akte') berkasAkte.value = file
}

const agamaOptions = ['Islam', 'Kristen', 'Katolik', 'Hindu', 'Buddha', 'Konghucu']
const prodiOptions = [{ label: 'S1 Manajemen', value: 'manajemen' }, { label: 'S1 Akuntansi', value: 'akuntansi' }]
const statusOptions = ['lajang', 'menikah', 'lainnya']

async function handleSubmit() {
  if (!berkasKtp.value || !berkasKk.value || !berkasAkte.value) {
    error.value = 'KTP, Kartu Keluarga, dan Akte Kelahiran wajib diupload.'
    return
  }
  submitting.value = true
  error.value = ''
  try {
    const id = await submitBaru(form, {
      ijazah: berkasIjazah.value,
      ktp: berkasKtp.value,
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
        <h1 class="text-3xl font-bold text-text-100">Pendaftaran Mahasiswa Baru</h1>
        <p class="text-text-300 mt-1">Isi semua field yang wajib diisi dengan lengkap dan benar.</p>
      </div>

      <UAlert v-if="error" color="error" variant="soft" icon="i-lucide-alert-circle" :description="error" class="mb-6" />

      <form class="flex flex-col gap-6" @submit.prevent="handleSubmit">

        <!-- ── DATA CALON MAHASISWI ── -->
        <UCard>
          <template #header>
            <h2 class="font-semibold text-text-100">Data Calon Mahasiswi</h2>
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

            <UFormField label="Program Studi" required>
              <USelect v-model="form.program_studi" :items="prodiOptions" placeholder="Pilih program studi" class="w-full" />
            </UFormField>

            <div class="grid grid-cols-2 gap-4">
              <UFormField label="NISN" required>
                <UInput v-model="form.nisn" placeholder="Nomor Induk Siswa Nasional" class="w-full" />
              </UFormField>
              <UFormField label="NIK" required>
                <UInput v-model="form.nik" placeholder="Nomor Induk Kependudukan" class="w-full" />
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

            <UFormField label="Alamat Domisili" required>
              <UTextarea v-model="form.alamat_domisili" placeholder="Alamat lengkap tempat tinggal" :rows="2" class="w-full" />
            </UFormField>

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
            <h2 class="font-semibold text-text-100">Data Akademik</h2>
          </template>
          <div class="flex flex-col gap-4">
            <UFormField label="Nama SMA / SMK / MTs" required>
              <UInput v-model="form.nama_sma" placeholder="Nama sekolah" class="w-full" />
            </UFormField>
            <UFormField label="Jurusan">
              <UInput v-model="form.jurusan_sma" placeholder="IPA / IPS — kosongkan jika tidak ada" class="w-full" />
              <template #hint><span class="text-xs text-text-300">Opsional</span></template>
            </UFormField>
            <div class="grid grid-cols-2 gap-4">
              <UFormField label="Tahun Masuk SMA" required>
                <UInput v-model.number="form.tahun_masuk_sma" type="number" min="1990" :max="new Date().getFullYear()" class="w-full" />
              </UFormField>
              <UFormField label="Tahun Lulus SMA" required>
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
            <UFormField label="Nama Ibu Kandung" required>
              <UInput v-model="form.nama_ibu_kandung" placeholder="Nama lengkap ibu" class="w-full" />
            </UFormField>
            <UFormField label="Nama Orang Tua / Wali" required>
              <UInput v-model="form.nama_wali" placeholder="Nama orang tua atau wali" class="w-full" />
            </UFormField>
            <UFormField label="Nomor HP / WhatsApp Wali" required>
              <UInput v-model="form.no_hp_wali" placeholder="+62 8xx-xxxx-xxxx (aktif)" class="w-full" />
            </UFormField>
            <UFormField label="Pekerjaan Ayah Kandung" required>
              <UInput v-model="form.pekerjaan_ayah" placeholder="Pekerjaan ayah" class="w-full" />
            </UFormField>
            <UFormField label="Penghasilan Rata-Rata per Bulan" required>
              <UInput v-model="form.penghasilan_rata_rata" placeholder="Jumlah total dibagi 3 orang" class="w-full" />
              <template #hint><span class="text-xs text-text-300">Jumlah penghasilan orang tua dibagi 3</span></template>
            </UFormField>
          </div>
        </UCard>

        <!-- ── UPLOAD BERKAS ── -->
        <UCard>
          <template #header>
            <h2 class="font-semibold text-text-100">Upload Berkas</h2>
          </template>
          <div class="flex flex-col gap-4">
            <UFormField label="Ijazah / SKL">
              <input type="file" accept="image/*,.pdf" class="w-full text-sm text-text-300 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" @change="onFileChange('ijazah', $event)" />
              <template #hint><span class="text-xs text-text-300">Opsional — untuk yang sudah lulus</span></template>
            </UFormField>
            <UFormField label="KTP Mahasiswi" required>
              <input type="file" accept="image/*,.pdf" class="w-full text-sm text-text-300 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" @change="onFileChange('ktp', $event)" />
            </UFormField>
            <UFormField label="Kartu Keluarga (KK)" required>
              <input type="file" accept="image/*,.pdf" class="w-full text-sm text-text-300 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" @change="onFileChange('kk', $event)" />
            </UFormField>
            <UFormField label="Akte Kelahiran" required>
              <input type="file" accept="image/*,.pdf" class="w-full text-sm text-text-300 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-sm file:font-medium file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100" @change="onFileChange('akte', $event)" />
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
