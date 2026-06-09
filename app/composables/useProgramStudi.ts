import type { MisiItem, StatistikItem } from '~/components/Admin/ListItemEditor/index.vue'

export interface ProgramStudi {
  id: string
  slug: string
  nama: string
  departemen: string | null
  deskripsi: string | null
  visi: string | null
  misi: MisiItem[]
  statistik: StatistikItem[]
  foto_akreditasi_url: string | null
  kaprodi_nama: string | null
  kaprodi_posisi: string | null
  kaprodi_foto_url: string | null
  kaprodi_quote: string | null
  kaprodi_email: string | null
  kaprodi_telepon: string | null
  urutan: number
  created_at: string
}

export type ProgramStudiForm = Omit<ProgramStudi, 'id' | 'created_at'>

export function useProgramStudi() {
  const supabase = useSupabase()

  async function getAll(): Promise<ProgramStudi[]> {
    const { data, error } = await supabase
      .from('program_studi')
      .select('*')
      .order('urutan', { ascending: true })
    if (error) throw error
    return data
  }

  async function getBySlug(slug: string): Promise<ProgramStudi | null> {
    const { data, error } = await supabase
      .from('program_studi')
      .select('*')
      .eq('slug', slug)
      .single()
    if (error) return null
    return data
  }

  async function create(form: ProgramStudiForm): Promise<void> {
    const { data: maxRow } = await supabase
      .from('program_studi')
      .select('urutan')
      .order('urutan', { ascending: false })
      .limit(1)
      .single()
    const urutan = maxRow ? maxRow.urutan + 1 : 1
    const { error } = await supabase.from('program_studi').insert({ ...form, urutan })
    if (error) throw error
  }

  async function update(id: string, form: ProgramStudiForm): Promise<void> {
    const { error } = await supabase.from('program_studi').update(form).eq('id', id)
    if (error) throw error
  }

  async function remove(id: string): Promise<void> {
    const { error } = await supabase.from('program_studi').delete().eq('id', id)
    if (error) throw error
  }

  async function reorder(list: ProgramStudi[], id: string, direction: 'up' | 'down'): Promise<void> {
    const index = list.findIndex((item) => item.id === id)
    if (index === -1) return
    const swapIndex = direction === 'up' ? index - 1 : index + 1
    if (swapIndex < 0 || swapIndex >= list.length) return

    const current = list[index]
    const swap = list[swapIndex]
    if (!current || !swap) return

    const { error: e1 } = await supabase
      .from('program_studi')
      .update({ urutan: swap.urutan })
      .eq('id', current.id)
    if (e1) throw e1

    const { error: e2 } = await supabase
      .from('program_studi')
      .update({ urutan: current.urutan })
      .eq('id', swap.id)
    if (e2) throw e2
  }

  return { getAll, getBySlug, create, update, remove, reorder }
}
