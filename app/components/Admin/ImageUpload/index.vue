<script setup lang="ts">
const props = defineProps<{
  modelValue: string | null
  bucket?: string
  folder?: string
}>()

const emit = defineEmits<{
  'update:modelValue': [value: string | null]
}>()

const { upload } = useStorage()
const loading = ref(false)
const error = ref('')
const fileInput = ref<HTMLInputElement | null>(null)

const bucket = computed(() => props.bucket ?? 'media')
const folder = computed(() => props.folder ?? 'uploads')

async function onFileChange(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return

  error.value = ''
  loading.value = true
  try {
    const url = await upload(bucket.value, folder.value, file)
    emit('update:modelValue', url)
  } catch (err: unknown) {
    error.value = err instanceof Error ? err.message : 'Upload gagal'
  } finally {
    loading.value = false
  }
}

function clearImage() {
  emit('update:modelValue', null)
  if (fileInput.value) fileInput.value.value = ''
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <div
      v-if="modelValue"
      class="relative w-32 h-32 rounded-lg overflow-hidden border border-neutral-500"
    >
      <img :src="modelValue" class="w-full h-full object-cover" alt="preview" />
      <button
        type="button"
        class="absolute top-1 right-1 bg-black/50 rounded-full p-0.5 text-white hover:bg-black/70"
        @click="clearImage"
      >
        <UIcon name="i-lucide-x" class="w-3.5 h-3.5" />
      </button>
    </div>

    <div class="flex items-center gap-2">
      <input
        ref="fileInput"
        type="file"
        accept="image/*"
        class="hidden"
        @change="onFileChange"
      />
      <UButton
        type="button"
        color="neutral"
        variant="outline"
        icon="i-lucide-upload"
        size="sm"
        :loading="loading"
        @click="fileInput?.click()"
      >
        {{ modelValue ? 'Ganti Foto' : 'Upload Foto' }}
      </UButton>
    </div>

    <p v-if="error" class="text-xs text-red-500">{{ error }}</p>
  </div>
</template>
