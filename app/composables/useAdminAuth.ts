import type { Session } from '@supabase/supabase-js'

export function useAdminAuth() {
  const supabase = useSupabase()
  const session = useState<Session | null>('admin-session', () => null)

  async function initSession() {
    const { data } = await supabase.auth.getSession()
    session.value = data.session

    supabase.auth.onAuthStateChange((_event, newSession) => {
      session.value = newSession
    })
  }

  const isAuthenticated = computed(() => !!session.value)

  async function signIn(email: string, password: string) {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) throw error
    session.value = data.session
  }

  async function signOut() {
    await supabase.auth.signOut()
    session.value = null
    await navigateTo('/admin/login')
  }

  return { session, isAuthenticated, initSession, signIn, signOut }
}
