<script setup lang="ts">
const props = defineProps<{ modelValue: string }>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()

const CODES = [
  { code: '+62',  name: 'Indonesia' },
  { code: '+1',   name: 'USA / Kanada' },
  { code: '+44',  name: 'Inggris' },
  { code: '+60',  name: 'Malaysia' },
  { code: '+65',  name: 'Singapura' },
  { code: '+61',  name: 'Australia' },
  { code: '+81',  name: 'Jepang' },
  { code: '+82',  name: 'Korea Selatan' },
  { code: '+86',  name: 'Tiongkok' },
  { code: '+91',  name: 'India' },
  { code: '+966', name: 'Arab Saudi' },
  { code: '+971', name: 'Uni Emirat Arab' },
]

const countryCode = ref('+62')
const localNumber = ref('')
const open = ref(false)
const buttonRef = ref<HTMLButtonElement | null>(null)
const containerRef = ref<HTMLDivElement | null>(null)
const dropdownStyle = ref({ top: '0px', left: '0px', width: '200px' })

onMounted(() => {
  const v = props.modelValue
  if (v) {
    const found = CODES.find(c => v.startsWith(c.code))
    if (found) {
      countryCode.value = found.code
      localNumber.value = v.slice(found.code.length)
    } else {
      localNumber.value = v
    }
  }
  document.addEventListener('click', onOutsideClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', onOutsideClick)
})

function onOutsideClick(e: MouseEvent) {
  if (containerRef.value && !containerRef.value.contains(e.target as Node)) {
    open.value = false
  }
}

function toggleDropdown() {
  if (!open.value && containerRef.value) {
    const rect = containerRef.value.getBoundingClientRect()
    dropdownStyle.value = {
      top: `${rect.bottom + 4}px`,
      left: `${rect.left}px`,
      width: `${Math.max(rect.width, 200)}px`,
    }
  }
  open.value = !open.value
}

function selectCode(code: string) {
  countryCode.value = code
  open.value = false
  emit('update:modelValue', code + localNumber.value)
}

function emitValue() {
  emit('update:modelValue', countryCode.value + localNumber.value)
}
</script>

<template>
  <div ref="containerRef" class="relative w-full">

    <!-- Input field -->
    <div
      class="inline-flex items-center w-full rounded-md overflow-hidden
             ring ring-inset ring-(--ui-border-accented)
             focus-within:ring-2 focus-within:ring-inset focus-within:ring-primary
             transition-colors bg-(--ui-bg)"
    >
      <button
        ref="buttonRef"
        type="button"
        class="shrink-0 self-stretch flex items-center gap-1 px-2.5 text-sm
               bg-(--ui-bg-elevated) border-r border-(--ui-border-accented)
               text-(--ui-text-muted) hover:text-(--ui-text-highlighted)
               transition-colors focus:outline-none whitespace-nowrap"
        @click="toggleDropdown"
      >
        {{ countryCode }}
        <UIcon
          name="i-lucide-chevron-down"
          class="w-3 h-3 opacity-60 transition-transform"
          :class="open ? 'rotate-180' : ''"
        />
      </button>

      <input
        v-model="localNumber"
        type="text"
        inputmode="numeric"
        placeholder="8xx-xxxx-xxxx"
        class="flex-1 min-w-0 px-2.5 py-1.5 text-sm bg-transparent
               text-(--ui-text-highlighted) placeholder:text-(--ui-text-dimmed)
               focus:outline-none"
        @input="emitValue"
      />
    </div>

    <!-- Dropdown teleported to body to escape overflow-hidden parents -->
    <Teleport to="body">
      <div
        v-if="open"
        :style="dropdownStyle"
        class="fixed z-[200] bg-(--ui-bg) rounded-md shadow-xl
               ring-1 ring-(--ui-border-accented) overflow-y-auto max-h-60"
      >
        <button
          v-for="item in CODES"
          :key="item.code"
          type="button"
          class="w-full flex items-center gap-2 px-3 py-2 text-sm text-left
                 hover:bg-(--ui-bg-elevated) transition-colors"
          :class="countryCode === item.code
            ? 'text-(--ui-color-primary-500) font-medium'
            : 'text-(--ui-text)'"
          @click="selectCode(item.code)"
        >
          <span class="w-10 shrink-0 font-mono text-(--ui-text-muted)">{{ item.code }}</span>
          <span>{{ item.name }}</span>
        </button>
      </div>
    </Teleport>

  </div>
</template>
