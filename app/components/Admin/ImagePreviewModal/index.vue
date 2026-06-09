<script setup lang="ts">
const props = defineProps<{
  src: string | null
  alt?: string
}>()

const open = defineModel<boolean>('open', { default: false })

const isPdf = computed(() => !!props.src && props.src.toLowerCase().includes('.pdf'))
</script>

<template>
  <UModal v-model:open="open" :ui="{ content: 'max-w-3xl' }">
    <template #content>
      <div class="p-2 flex flex-col gap-2">
        <div class="flex justify-end">
          <UButton
            v-if="src"
            icon="i-lucide-external-link"
            size="xs"
            color="neutral"
            variant="ghost"
            :to="src"
            target="_blank"
            label="Buka di tab baru"
          />
        </div>
        <iframe
          v-if="isPdf && src"
          :src="src"
          class="w-full rounded-lg border border-neutral-200 dark:border-neutral-700"
          style="height: 75vh"
        />
        <img
          v-else-if="src"
          :src="src"
          :alt="alt ?? 'Preview'"
          class="w-full h-auto max-h-[80vh] object-contain rounded-lg"
        />
      </div>
    </template>
  </UModal>
</template>
