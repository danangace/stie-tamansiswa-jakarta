<script setup lang="ts">
export interface MisiItem {
  nomor: number
  keterangan: string
}

export interface StatistikItem {
  nilai: string
  keterangan: string
}

const props = defineProps<{
  mode: 'misi' | 'statistik'
  addLabel: string
}>()

const misiModel = defineModel<MisiItem[]>('misi', { default: () => [] })
const statistikModel = defineModel<StatistikItem[]>('statistik', { default: () => [] })

function addMisi() {
  misiModel.value = [
    ...misiModel.value,
    { nomor: misiModel.value.length + 1, keterangan: '' },
  ]
}

function removeMisi(index: number) {
  misiModel.value = misiModel.value
    .filter((_, i) => i !== index)
    .map((item, i) => ({ ...item, nomor: i + 1 }))
}

function addStatistik() {
  statistikModel.value = [
    ...statistikModel.value,
    { nilai: '', keterangan: '' },
  ]
}

function removeStatistik(index: number) {
  statistikModel.value = statistikModel.value.filter((_, i) => i !== index)
}
</script>

<template>
  <div class="flex flex-col gap-2">
    <!-- MISI mode -->
    <template v-if="mode === 'misi'">
      <div
        v-for="(item, index) in misiModel"
        :key="index"
        class="flex items-start gap-2"
      >
        <div class="w-8 h-9 flex items-center justify-center text-sm font-semibold text-text-300 flex-shrink-0">
          {{ item.nomor }}
        </div>
        <UInput
          :model-value="item.keterangan"
          placeholder="Keterangan misi..."
          class="flex-1"
          @update:model-value="(val) => { misiModel[index] = { ...item, keterangan: String(val) } }"
        />
        <UButton
          icon="i-lucide-x"
          color="error"
          variant="ghost"
          size="sm"
          @click="removeMisi(index)"
        />
      </div>
      <UButton
        icon="i-lucide-plus"
        color="neutral"
        variant="outline"
        size="sm"
        class="self-start"
        @click="addMisi"
      >
        {{ addLabel }}
      </UButton>
    </template>

    <!-- STATISTIK mode -->
    <template v-else>
      <div
        v-for="(item, index) in statistikModel"
        :key="index"
        class="flex items-center gap-2"
      >
        <UInput
          :model-value="item.nilai"
          placeholder="Nilai (mis: 200+)"
          class="w-28"
          @update:model-value="(val) => { statistikModel[index] = { ...item, nilai: String(val) } }"
        />
        <UInput
          :model-value="item.keterangan"
          placeholder="Keterangan (mis: Mahasiswa)"
          class="flex-1"
          @update:model-value="(val) => { statistikModel[index] = { ...item, keterangan: String(val) } }"
        />
        <UButton
          icon="i-lucide-x"
          color="error"
          variant="ghost"
          size="sm"
          @click="removeStatistik(index)"
        />
      </div>
      <UButton
        icon="i-lucide-plus"
        color="neutral"
        variant="outline"
        size="sm"
        class="self-start"
        @click="addStatistik"
      >
        {{ addLabel }}
      </UButton>
    </template>
  </div>
</template>
