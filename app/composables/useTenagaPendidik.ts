export interface TenagaPendidik {
  id: string
  nama: string
  jabatan: string
  foto_url: string | null
  urutan: number
  created_at: string
}

export type TenagaPendidikForm = Pick<TenagaPendidik, 'nama' | 'jabatan' | 'foto_url'>

export function useTenagaPendidik() {
  const supabase = useSupabase()

  async function getAll(): Promise<TenagaPendidik[]> {
    const { data, error } = await supabase
      .from('tenaga_pendidik')
      .select('*')
      .order('urutan', { ascending: true })
    if (error) throw error
    return data
  }

  async function create(form: TenagaPendidikForm): Promise<void> {
    const { data: maxRow } = await supabase
      .from('tenaga_pendidik')
      .select('urutan')
      .order('urutan', { ascending: false })
      .limit(1)
      .single()
    const urutan = maxRow ? maxRow.urutan + 1 : 1
    const { error } = await supabase.from('tenaga_pendidik').insert({ ...form, urutan })
    if (error) throw error
  }

  async function update(id: string, form: TenagaPendidikForm): Promise<void> {
    const { error } = await supabase.from('tenaga_pendidik').update(form).eq('id', id)
    if (error) throw error
  }

  async function remove(id: string): Promise<void> {
    const { error } = await supabase.from('tenaga_pendidik').delete().eq('id', id)
    if (error) throw error
  }

  async function reorder(list: TenagaPendidik[], id: string, direction: 'up' | 'down'): Promise<void> {
    const index = list.findIndex((item) => item.id === id)
    if (index === -1) return
    const swapIndex = direction === 'up' ? index - 1 : index + 1
    if (swapIndex < 0 || swapIndex >= list.length) return

    const current = list[index]
    const swap = list[swapIndex]
    if (!current || !swap) return

    const { error: e1 } = await supabase
      .from('tenaga_pendidik')
      .update({ urutan: swap.urutan })
      .eq('id', current.id)
    if (e1) throw e1

    const { error: e2 } = await supabase
      .from('tenaga_pendidik')
      .update({ urutan: current.urutan })
      .eq('id', swap.id)
    if (e2) throw e2
  }

  return { getAll, create, update, remove, reorder }
}
