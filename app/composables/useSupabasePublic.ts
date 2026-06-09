import { createClient } from '@supabase/supabase-js'

/**
 * Membuat Supabase client langsung dari runtimeConfig.
 * Aman digunakan di server maupun client (tidak bergantung pada plugin .client.ts).
 */
export function useSupabasePublic() {
  const config = useRuntimeConfig()
  return createClient(config.public.supabaseUrl, config.public.supabaseAnonKey)
}
