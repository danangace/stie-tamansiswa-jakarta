<script setup lang="ts">
defineProps<{
  open: boolean
  title?: string
  description?: string
  loading?: boolean
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
  confirm: []
}>()
</script>

<template>
  <UModal :open="open" @update:open="emit('update:open', $event)">
    <template #content>
      <UCard>
        <template #header>
          <div class="flex items-center gap-2">
            <UIcon name="i-lucide-triangle-alert" class="w-5 h-5 text-red-500" />
            <h3 class="font-semibold text-text-100">{{ title ?? 'Konfirmasi Hapus' }}</h3>
          </div>
        </template>

        <p class="text-text-200 text-sm">
          {{ description ?? 'Apakah Anda yakin ingin menghapus data ini? Tindakan ini tidak dapat dibatalkan.' }}
        </p>

        <template #footer>
          <div class="flex justify-end gap-2">
            <UButton
              color="neutral"
              variant="outline"
              @click="emit('update:open', false)"
            >
              Batal
            </UButton>
            <UButton
              color="error"
              :loading="loading"
              @click="emit('confirm')"
            >
              Hapus
            </UButton>
          </div>
        </template>
      </UCard>
    </template>
  </UModal>
</template>
