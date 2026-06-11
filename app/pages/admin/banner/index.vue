<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Banner } from '~/composables/useBanner'

definePageMeta({ layout: 'admin' })

const { getAll, create, remove, reorder } = useBanner()

const list = ref<Banner[]>([])
const loading = ref(false)
const error = ref('')

const modalOpen = ref(false)
const saving = ref(false)
const selectedFile = ref<File | null>(null)
const previewUrl = ref<string | null>(null)
const previewConfirmed = ref(false)
const fileError = ref('')

const confirmOpen = ref(false)
const deleteId = ref<string | null>(null)
const deleteFotoUrl = ref<string | null>(null)
const deleting = ref(false)

const reordering = ref(false)

const columns: TableColumn<Banner>[] = [
  { id: 'urutan', header: 'No' },
  { id: 'preview', header: 'Preview' },
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
  selectedFile.value = null
  previewUrl.value = null
  previewConfirmed.value = false
  fileError.value = ''
  modalOpen.value = true
}

function onFileChange(e: Event) {
  const input = e.target as HTMLInputElement
  const file = input.files?.[0]
  fileError.value = ''
  previewUrl.value = null
  previewConfirmed.value = false
  if (!file) {
    selectedFile.value = null
    return
  }
  if (file.size > 5 * 1024 * 1024) {
    fileError.value = 'Ukuran file maksimal 5MB'
    selectedFile.value = null
    return
  }
  selectedFile.value = file
  previewUrl.value = URL.createObjectURL(file)
}

function openDelete(item: Banner) {
  deleteId.value = item.id
  deleteFotoUrl.value = item.foto_url
  confirmOpen.value = true
}

function closeModal() {
  if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
  modalOpen.value = false
}

async function handleSave() {
  if (!selectedFile.value) return
  saving.value = true
  try {
    await create(selectedFile.value)
    if (previewUrl.value) URL.revokeObjectURL(previewUrl.value)
    modalOpen.value = false
    await loadData()
  } catch (err: unknown) {
    error.value = err instanceof Error ? err.message : 'Gagal menyimpan'
  } finally {
    saving.value = false
  }
}

async function handleDelete() {
  if (!deleteId.value || !deleteFotoUrl.value) return
  deleting.value = true
  try {
    await remove(deleteId.value, deleteFotoUrl.value)
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
      <h1 class="text-2xl font-bold text-text-100">Banner</h1>
      <UButton icon="i-lucide-plus" color="primary" @click="openAdd">
        Tambah Banner
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
        <template #urutan-cell="{ row }">
          <span class="text-sm text-text-300 tabular-nums">
            {{ (row.original as Banner).urutan }}
          </span>
        </template>

        <template #preview-cell="{ row }">
          <img
            :src="(row.original as Banner).foto_url"
            class="h-12 w-20 object-cover rounded"
            alt="Banner preview"
          />
        </template>

        <template #actions-cell="{ row }">
          <div class="flex items-center gap-1 justify-end">
            <UButton
              icon="i-lucide-arrow-up"
              color="neutral"
              variant="ghost"
              size="sm"
              :disabled="reordering || list.indexOf(row.original as Banner) === 0"
              @click="handleReorder((row.original as Banner).id, 'up')"
            />
            <UButton
              icon="i-lucide-arrow-down"
              color="neutral"
              variant="ghost"
              size="sm"
              :disabled="reordering || list.indexOf(row.original as Banner) === list.length - 1"
              @click="handleReorder((row.original as Banner).id, 'down')"
            />
            <UButton
              icon="i-lucide-trash-2"
              color="error"
              variant="ghost"
              size="sm"
              @click="openDelete(row.original as Banner)"
            />
          </div>
        </template>
      </UTable>
    </UCard>

    <!-- Modal Tambah Banner -->
    <UModal :open="modalOpen" @update:open="(v) => { if (!v) closeModal() }">
      <template #content>
        <UCard>
          <template #header>
            <h3 class="font-semibold text-text-100">Tambah Banner</h3>
          </template>

          <div class="flex flex-col gap-4">
            <UFormField label="File Gambar" required>
              <input
                type="file"
                accept="image/*"
                class="block w-full text-sm text-text-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-50 file:text-primary-700 hover:file:bg-primary-100"
                @change="onFileChange"
              />
            </UFormField>
            <p v-if="fileError" class="text-sm text-red-500">{{ fileError }}</p>

            <!-- Preview 3:1 -->
            <div v-if="previewUrl" class="flex flex-col gap-2">
              <p class="text-sm font-medium text-text-200">Preview (rasio 3:1)</p>
              <div class="relative w-full aspect-[3/1] rounded-lg overflow-hidden bg-neutral-100">
                <img
                  :src="previewUrl"
                  class="w-full h-full object-cover object-center"
                  alt="Preview banner"
                />
              </div>
              <p class="text-xs text-text-300">
                Gambar akan di-crop dari tengah sesuai rasio di atas.
              </p>
              <UCheckbox
                v-model="previewConfirmed"
                label="Tampilan sudah sesuai, lanjutkan simpan"
              />
            </div>
          </div>

          <template #footer>
            <div class="flex justify-end gap-2">
              <UButton color="neutral" variant="outline" @click="closeModal">
                Batal
              </UButton>
              <UButton
                color="primary"
                :loading="saving"
                :disabled="!selectedFile || !previewConfirmed"
                @click="handleSave"
              >
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
  </div>
</template>
