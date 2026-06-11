<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { Partner, PartnerForm } from '~/composables/usePartner'

definePageMeta({ layout: 'admin' })

const { getAll, create, update, remove, reorder } = usePartner()

const list = ref<Partner[]>([])
const loading = ref(false)
const error = ref('')

const modalOpen = ref(false)
const isEdit = ref(false)
const editId = ref<string | null>(null)
const saving = ref(false)
const form = reactive<PartnerForm>({ nama: '' })

const confirmOpen = ref(false)
const deleteId = ref<string | null>(null)
const deleting = ref(false)

const reordering = ref(false)

const columns: TableColumn<Partner>[] = [
  { id: 'urutan', header: 'No' },
  { accessorKey: 'nama', header: 'Nama Partner' },
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
  modalOpen.value = true
}

function openEdit(item: Partner) {
  isEdit.value = true
  editId.value = item.id
  form.nama = item.nama
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
      <h1 class="text-2xl font-bold text-text-100">Partner</h1>
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
        <template #urutan-cell="{ row }">
          <span class="text-sm text-text-300 tabular-nums">
            {{ (row.original as Partner).urutan }}
          </span>
        </template>

        <template #actions-cell="{ row }">
          <div class="flex items-center gap-1 justify-end">
            <UButton
              icon="i-lucide-arrow-up"
              color="neutral"
              variant="ghost"
              size="sm"
              :disabled="reordering || list.indexOf(row.original as Partner) === 0"
              @click="handleReorder((row.original as Partner).id, 'up')"
            />
            <UButton
              icon="i-lucide-arrow-down"
              color="neutral"
              variant="ghost"
              size="sm"
              :disabled="reordering || list.indexOf(row.original as Partner) === list.length - 1"
              @click="handleReorder((row.original as Partner).id, 'down')"
            />
            <UButton
              icon="i-lucide-pencil"
              color="neutral"
              variant="ghost"
              size="sm"
              @click="openEdit(row.original as Partner)"
            />
            <UButton
              icon="i-lucide-trash-2"
              color="error"
              variant="ghost"
              size="sm"
              @click="openDelete((row.original as Partner).id)"
            />
          </div>
        </template>
      </UTable>
    </UCard>

    <!-- Modal Form -->
    <UModal :open="modalOpen" @update:open="modalOpen = $event">
      <template #content>
        <UCard>
          <template #header>
            <h3 class="font-semibold text-text-100">
              {{ isEdit ? 'Edit Partner' : 'Tambah Partner' }}
            </h3>
          </template>

          <form class="flex flex-col gap-4" @submit.prevent="handleSave">
            <UFormField label="Nama Partner" required>
              <UInput
                v-model="form.nama"
                placeholder="Nama institusi / perusahaan"
                class="w-full"
                autofocus
              />
            </UFormField>
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
  </div>
</template>
