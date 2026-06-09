<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { ProgramStudi, ProgramStudiForm } from '~/composables/useProgramStudi'
import type { MisiItem, StatistikItem } from '~/components/Admin/ListItemEditor/index.vue'

definePageMeta({ layout: 'admin' })

const { getAll, create, update, remove, reorder } = useProgramStudi()

const list = ref<ProgramStudi[]>([])
const loading = ref(false)
const error = ref('')

const modalOpen = ref(false)
const isEdit = ref(false)
const editId = ref<string | null>(null)
const saving = ref(false)

const emptyForm = (): ProgramStudiForm => ({
  slug: '',
  nama: '',
  departemen: '',
  deskripsi: '',
  visi: '',
  misi: [],
  statistik: [],
  foto_akreditasi_url: null,
  kaprodi_nama: '',
  kaprodi_posisi: '',
  kaprodi_foto_url: null,
  kaprodi_quote: '',
  kaprodi_email: '',
  kaprodi_telepon: '',
  urutan: 0,
})

const form = reactive<ProgramStudiForm>(emptyForm())

const confirmOpen = ref(false)
const deleteId = ref<string | null>(null)
const deleting = ref(false)
const reordering = ref(false)

const previewOpen = ref(false)
const previewSrc = ref<string | null>(null)
function openPreview(src: string | null) {
  if (!src) return
  previewSrc.value = src
  previewOpen.value = true
}

const columns: TableColumn<ProgramStudi>[] = [
  { accessorKey: 'nama', header: 'Nama Program Studi' },
  { accessorKey: 'departemen', header: 'Departemen' },
  { id: 'deskripsi', header: 'Deskripsi' },
  { id: 'kaprodi_foto', header: 'Foto Kaprodi' },
  { id: 'kaprodi', header: 'Kaprodi' },
  { id: 'akreditasi', header: 'Akreditasi' },
  { id: 'actions', header: '' },
]

async function loadData() {
  loading.value = true
  error.value = ''
  try {
    list.value = await getAll()
  } catch (err: unknown) {
    error.value = err instanceof Error ? err.message : 'Gagal memuat data'
  } finally {
    loading.value = false
  }
}

function openAdd() {
  isEdit.value = false
  editId.value = null
  Object.assign(form, emptyForm())
  modalOpen.value = true
}

function openEdit(item: ProgramStudi) {
  isEdit.value = true
  editId.value = item.id
  Object.assign(form, {
    slug: item.slug,
    nama: item.nama,
    departemen: item.departemen,
    deskripsi: item.deskripsi,
    visi: item.visi,
    misi: item.misi ? [...item.misi] : [],
    statistik: item.statistik ? [...item.statistik] : [],
    foto_akreditasi_url: item.foto_akreditasi_url,
    kaprodi_nama: item.kaprodi_nama,
    kaprodi_posisi: item.kaprodi_posisi,
    kaprodi_foto_url: item.kaprodi_foto_url,
    kaprodi_quote: item.kaprodi_quote,
    kaprodi_email: item.kaprodi_email,
    kaprodi_telepon: item.kaprodi_telepon,
    urutan: item.urutan,
  })
  modalOpen.value = true
}

function openDelete(id: string) {
  deleteId.value = id
  confirmOpen.value = true
}

async function handleSave() {
  saving.value = true
  try {
    if (isEdit.value && editId.value) {
      await update(editId.value, { ...form })
    } else {
      await create({ ...form })
    }
    modalOpen.value = false
    await loadData()
  } catch (err: unknown) {
    error.value = err instanceof Error ? err.message : 'Gagal menyimpan'
  } finally {
    saving.value = false
  }
}

async function handleDelete() {
  if (!deleteId.value) return
  deleting.value = true
  try {
    await remove(deleteId.value)
    confirmOpen.value = false
    await loadData()
  } catch (err: unknown) {
    error.value = err instanceof Error ? err.message : 'Gagal menghapus'
  } finally {
    deleting.value = false
  }
}

async function handleReorder(id: string, direction: 'up' | 'down') {
  reordering.value = true
  try {
    await reorder(list.value, id, direction)
    await loadData()
  } catch (err: unknown) {
    error.value = err instanceof Error ? err.message : 'Gagal mengubah urutan'
  } finally {
    reordering.value = false
  }
}

onMounted(loadData)
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex items-center justify-between">
      <h1 class="text-2xl font-bold text-text-100">Program Studi</h1>
      <UButton icon="i-lucide-plus" color="primary" @click="openAdd">
        Tambah
      </UButton>
    </div>

    <UAlert
      v-if="error"
      color="error"
      variant="soft"
      icon="i-lucide-alert-circle"
      :description="error"
    />

    <UCard>
      <UTable :data="list" :columns="columns" :loading="loading">

        <template #nama-cell="{ row }">
          <p class="font-medium text-text-100">{{ (row.original as ProgramStudi).nama }}</p>
        </template>

        <template #deskripsi-cell="{ row }">
          <p class="text-sm text-text-300 w-64 whitespace-normal break-words">
            {{ (row.original as ProgramStudi).deskripsi ?? '—' }}
          </p>
        </template>

        <template #kaprodi_foto-cell="{ row }">
          <img
            v-if="(row.original as ProgramStudi).kaprodi_foto_url"
            :src="(row.original as ProgramStudi).kaprodi_foto_url!"
            class="w-10 h-10 rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-primary-500 transition"
            alt="kaprodi"
            @click="openPreview((row.original as ProgramStudi).kaprodi_foto_url)"
          />
          <span v-else class="text-text-300 text-xs">—</span>
        </template>

        <template #kaprodi-cell="{ row }">
          <span class="text-sm">{{ (row.original as ProgramStudi).kaprodi_nama ?? '—' }}</span>
        </template>

        <template #akreditasi-cell="{ row }">
          <img
            v-if="(row.original as ProgramStudi).foto_akreditasi_url"
            :src="(row.original as ProgramStudi).foto_akreditasi_url!"
            class="w-10 h-10 rounded object-cover cursor-pointer hover:ring-2 hover:ring-primary-500 transition"
            alt="akreditasi"
            @click="openPreview((row.original as ProgramStudi).foto_akreditasi_url)"
          />
          <span v-else class="text-text-300 text-xs">—</span>
        </template>

        <template #actions-cell="{ row }">
          <div class="flex items-center gap-1 justify-end">
            <UButton
              icon="i-lucide-arrow-up"
              color="neutral"
              variant="ghost"
              size="sm"
              :disabled="reordering || list.indexOf(row.original as ProgramStudi) === 0"
              @click="handleReorder((row.original as ProgramStudi).id, 'up')"
            />
            <UButton
              icon="i-lucide-arrow-down"
              color="neutral"
              variant="ghost"
              size="sm"
              :disabled="reordering || list.indexOf(row.original as ProgramStudi) === list.length - 1"
              @click="handleReorder((row.original as ProgramStudi).id, 'down')"
            />
            <UButton
              icon="i-lucide-pencil"
              color="neutral"
              variant="ghost"
              size="sm"
              @click="openEdit(row.original as ProgramStudi)"
            />
            <UButton
              icon="i-lucide-trash-2"
              color="error"
              variant="ghost"
              size="sm"
              @click="openDelete((row.original as ProgramStudi).id)"
            />
          </div>
        </template>
      </UTable>
    </UCard>

    <!-- Modal Form -->
    <UModal :open="modalOpen" :ui="{ content: 'max-w-2xl' }" @update:open="modalOpen = $event">
      <template #content>
        <UCard>
          <template #header>
            <h3 class="font-semibold text-text-100">
              {{ isEdit ? 'Edit Program Studi' : 'Tambah Program Studi' }}
            </h3>
          </template>

          <form class="flex flex-col gap-6 max-h-[70vh] overflow-y-auto pr-1" @submit.prevent="handleSave">
            <!-- Info Umum -->
            <div class="flex flex-col gap-4">
              <p class="text-sm font-semibold text-text-300 uppercase tracking-wide">Info Umum</p>

              <div class="grid grid-cols-2 gap-4">
                <UFormField label="Slug" required>
                  <UInput v-model="form.slug" placeholder="akuntansi" class="w-full" />
                </UFormField>
                <UFormField label="Nama Program Studi" required>
                  <UInput v-model="form.nama" placeholder="Akuntansi" class="w-full" />
                </UFormField>
              </div>

              <UFormField label="Departemen">
                <UInput v-model="form.departemen" placeholder="Fakultas Ekonomi dan Bisnis" class="w-full" />
              </UFormField>

              <UFormField label="Deskripsi">
                <UTextarea v-model="form.deskripsi" placeholder="Deskripsi singkat program studi..." :rows="3" class="w-full" />
              </UFormField>

              <UFormField label="Visi">
                <UTextarea v-model="form.visi" placeholder="Visi program studi..." :rows="3" class="w-full" />
              </UFormField>
            </div>

            <USeparator />

            <!-- Misi -->
            <div class="flex flex-col gap-3">
              <p class="text-sm font-semibold text-text-300 uppercase tracking-wide">Misi</p>
              <AdminListItemEditor
                v-model:misi="form.misi as MisiItem[]"
                mode="misi"
                add-label="Tambah Misi"
              />
            </div>

            <USeparator />

            <!-- Statistik -->
            <div class="flex flex-col gap-3">
              <p class="text-sm font-semibold text-text-300 uppercase tracking-wide">Statistik</p>
              <AdminListItemEditor
                v-model:statistik="form.statistik as StatistikItem[]"
                mode="statistik"
                add-label="Tambah Statistik"
              />
            </div>

            <USeparator />

            <!-- Kaprodi -->
            <div class="flex flex-col gap-4">
              <p class="text-sm font-semibold text-text-300 uppercase tracking-wide">Kaprodi</p>

              <UFormField label="Foto Kaprodi">
                <AdminImageUpload v-model="form.kaprodi_foto_url" folder="program-studi/kaprodi" />
              </UFormField>

              <div class="grid grid-cols-2 gap-4">
                <UFormField label="Nama Kaprodi">
                  <UInput v-model="form.kaprodi_nama" placeholder="Nama lengkap" class="w-full" />
                </UFormField>
                <UFormField label="Posisi">
                  <UInput v-model="form.kaprodi_posisi" placeholder="Ketua Program Studi ..." class="w-full" />
                </UFormField>
              </div>

              <UFormField label="Quote">
                <UInput v-model="form.kaprodi_quote" placeholder="Kutipan inspiratif..." class="w-full" />
              </UFormField>

              <div class="grid grid-cols-2 gap-4">
                <UFormField label="Email">
                  <UInput v-model="form.kaprodi_email" placeholder="email@example.com" class="w-full" />
                </UFormField>
                <UFormField label="Telepon">
                  <UInput v-model="form.kaprodi_telepon" placeholder="+62 812-xxxx-xxxx" class="w-full" />
                </UFormField>
              </div>
            </div>

            <USeparator />

            <!-- Akreditasi -->
            <div class="flex flex-col gap-4">
              <p class="text-sm font-semibold text-text-300 uppercase tracking-wide">Akreditasi</p>
              <UFormField label="Foto Sertifikat Akreditasi">
                <AdminImageUpload v-model="form.foto_akreditasi_url" folder="program-studi/akreditasi" />
              </UFormField>
            </div>
          </form>

          <template #footer>
            <div class="flex justify-end gap-2">
              <UButton color="neutral" variant="outline" @click="modalOpen = false">
                Batal
              </UButton>
              <UButton color="primary" :loading="saving" @click="handleSave">
                Simpan
              </UButton>
            </div>
          </template>
        </UCard>
      </template>
    </UModal>

    <!-- Confirm Delete -->
    <AdminConfirmModal
      v-model:open="confirmOpen"
      :loading="deleting"
      @confirm="handleDelete"
    />

    <!-- Image Preview -->
    <AdminImagePreviewModal v-model:open="previewOpen" :src="previewSrc" />
  </div>
</template>
