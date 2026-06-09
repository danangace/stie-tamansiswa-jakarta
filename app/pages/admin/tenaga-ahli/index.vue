<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { TenagaAhli, TenagaAhliForm } from '~/composables/useTenagaAhli'

definePageMeta({ layout: 'admin' })

const { getAll, create, update, remove, reorder } = useTenagaAhli()

const list = ref<TenagaAhli[]>([])
const loading = ref(false)
const error = ref('')

// Slideover
const slideoverOpen = ref(false)
const isEdit = ref(false)
const editId = ref<string | null>(null)
const saving = ref(false)
const form = reactive<TenagaAhliForm>({
  nama: '',
  jabatan: '',
  foto_url: null,
  quotes: null,
})

// Confirm modal
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

const columns: TableColumn<TenagaAhli>[] = [
  { id: 'urutan', header: '#' },
  { id: 'foto_url', header: 'Foto' },
  { accessorKey: 'nama', header: 'Nama' },
  { accessorKey: 'jabatan', header: 'Jabatan' },
  { id: 'quotes', header: 'Quotes' },
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
  form.nama = ''
  form.jabatan = ''
  form.foto_url = null
  form.quotes = null
  slideoverOpen.value = true
}

function openEdit(item: TenagaAhli) {
  isEdit.value = true
  editId.value = item.id
  form.nama = item.nama
  form.jabatan = item.jabatan
  form.foto_url = item.foto_url
  form.quotes = item.quotes
  slideoverOpen.value = true
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
    slideoverOpen.value = false
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
      <h1 class="text-2xl font-bold text-text-100">Tenaga Ahli & Pimpinan</h1>
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
      <UTable
        :data="list"
        :columns="columns"
        :loading="loading"
      >
        <template #urutan-cell="{ row }">
          <span class="text-sm text-text-300 tabular-nums">
            {{ (row.original as TenagaAhli).urutan }}
          </span>
        </template>

        <template #foto_url-cell="{ row }">
          <img
            v-if="(row.original as TenagaAhli).foto_url"
            :src="(row.original as TenagaAhli).foto_url!"
            class="w-10 h-10 rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-primary-500 transition"
            alt="foto"
            @click="openPreview((row.original as TenagaAhli).foto_url)"
          />
          <div
            v-else
            class="w-10 h-10 rounded-full bg-neutral-400 flex items-center justify-center"
          >
            <UIcon name="i-lucide-user" class="w-5 h-5 text-neutral-700" />
          </div>
        </template>

        <template #quotes-cell="{ row }">
          <span class="text-sm text-text-300 italic line-clamp-2 max-w-xs">
            {{ (row.original as TenagaAhli).quotes ?? '-' }}
          </span>
        </template>

        <template #actions-cell="{ row }">
          <div class="flex items-center gap-1 justify-end">
            <UButton
              icon="i-lucide-arrow-up"
              color="neutral"
              variant="ghost"
              size="sm"
              :disabled="reordering || list.indexOf(row.original as TenagaAhli) === 0"
              @click="handleReorder((row.original as TenagaAhli).id, 'up')"
            />
            <UButton
              icon="i-lucide-arrow-down"
              color="neutral"
              variant="ghost"
              size="sm"
              :disabled="reordering || list.indexOf(row.original as TenagaAhli) === list.length - 1"
              @click="handleReorder((row.original as TenagaAhli).id, 'down')"
            />
            <UButton
              icon="i-lucide-pencil"
              color="neutral"
              variant="ghost"
              size="sm"
              @click="openEdit(row.original as TenagaAhli)"
            />
            <UButton
              icon="i-lucide-trash-2"
              color="error"
              variant="ghost"
              size="sm"
              @click="openDelete((row.original as TenagaAhli).id)"
            />
          </div>
        </template>
      </UTable>
    </UCard>

    <!-- Modal Form -->
    <UModal
      :open="slideoverOpen"
      :title="isEdit ? 'Edit Tenaga Ahli' : 'Tambah Tenaga Ahli'"
      @update:open="slideoverOpen = $event"
    >
      <template #content>
        <UCard>
          <template #header>
            <h3 class="font-semibold text-text-100">
              {{ isEdit ? 'Edit Tenaga Ahli' : 'Tambah Tenaga Ahli' }}
            </h3>
          </template>

          <form class="flex flex-col gap-4" @submit.prevent="handleSave">
            <UFormField label="Foto">
              <AdminImageUpload
                v-model="form.foto_url"
                folder="tenaga-ahli"
              />
            </UFormField>

            <UFormField label="Nama" required>
              <UInput v-model="form.nama" placeholder="Nama lengkap" class="w-full" />
            </UFormField>

            <UFormField label="Jabatan" required>
              <UInput v-model="form.jabatan" placeholder="Jabatan / posisi" class="w-full" />
            </UFormField>

            <UFormField label="Quotes">
              <UTextarea
                v-model="form.quotes"
                placeholder="Kutipan inspiratif..."
                :rows="3"
                class="w-full"
              />
            </UFormField>
          </form>

          <template #footer>
            <div class="flex justify-end gap-2">
              <UButton
                color="neutral"
                variant="outline"
                type="button"
                @click="slideoverOpen = false"
              >
                Batal
              </UButton>
              <UButton
                color="primary"
                :loading="saving"
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

    <!-- Image Preview -->
    <AdminImagePreviewModal v-model:open="previewOpen" :src="previewSrc" />
  </div>
</template>
