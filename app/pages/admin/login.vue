<script setup lang="ts">
definePageMeta({
  layout: 'admin-bare',
})

const { signIn } = useAdminAuth()

const email = ref('')
const password = ref('')
const loading = ref(false)
const errorMessage = ref('')

async function handleLogin() {
  errorMessage.value = ''
  loading.value = true
  try {
    await signIn(email.value, password.value)
    await navigateTo('/admin')
  } catch (err: unknown) {
    if (err instanceof Error) {
      errorMessage.value = err.message
    } else {
      errorMessage.value = 'Login gagal. Periksa email dan password Anda.'
    }
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <UCard class="w-full max-w-sm shadow-xl">
    <template #header>
      <div class="flex flex-col items-center gap-2 py-2">
        <AtomicLogo />
        <h1 class="text-xl font-bold text-text-100">Login Admin</h1>
        <p class="text-sm text-text-300">STIE Taman Siswa Jakarta</p>
      </div>
    </template>

    <form class="flex flex-col gap-4" @submit.prevent="handleLogin">
      <UAlert
        v-if="errorMessage"
        color="error"
        variant="soft"
        icon="i-lucide-alert-circle"
        :description="errorMessage"
      />

      <UFormField label="Email" name="email">
        <UInput
          v-model="email"
          type="email"
          placeholder="admin@example.com"
          autocomplete="email"
          required
          class="w-full"
        />
      </UFormField>

      <UFormField label="Password" name="password">
        <UInput
          v-model="password"
          type="password"
          placeholder="••••••••"
          autocomplete="current-password"
          required
          class="w-full"
        />
      </UFormField>

      <UButton
        type="submit"
        color="primary"
        block
        :loading="loading"
        :disabled="loading"
      >
        Masuk
      </UButton>
    </form>
  </UCard>
</template>
