import type { SupabaseClient } from '@supabase/supabase-js'

export default defineNuxtRouteMiddleware(async (to) => {
  if (!to.path.startsWith('/admin')) return
  if (import.meta.server) return

  const { $supabase } = useNuxtApp()
  const { data } = await ($supabase as SupabaseClient).auth.getSession()

  if (!data.session) {
    if (to.path !== '/admin/login') {
      return navigateTo('/admin/login')
    }
  } else {
    if (to.path === '/admin/login') {
      return navigateTo('/admin')
    }
  }
})
