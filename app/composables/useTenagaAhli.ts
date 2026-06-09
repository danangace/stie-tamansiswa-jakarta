export interface TenagaAhli {
  id: string
  nama: string
  jabatan: string
  foto_url: string | null
  quotes: string | null
  urutan: number
  created_at: string
}

export type TenagaAhliForm = Pick<TenagaAhli, 'nama' | 'jabatan' | 'foto_url' | 'quotes'>

export function useTenagaAhli() {
  const supabase = useSupabase()

  async function getAll(): Promise<TenagaAhli[]> {
    const { data, error } = await supabase
      .from('tenaga_ahli')
      .select('*')
      .order('urutan', { ascending: true })
    if (error) throw error
    return data
  }

  async function create(form: TenagaAhliForm): Promise<void> {
    const { data: maxRow } = await supabase
      .from('tenaga_ahli')
      .select('urutan')
      .order('urutan', { ascending: false })
      .limit(1)
      .single()
    const urutan = maxRow ? maxRow.urutan + 1 : 1
    const { error } = await supabase.from('tenaga_ahli').insert({ ...form, urutan })
    if (error) throw error
  }

  async function update(id: string, form: TenagaAhliForm): Promise<void> {
    const { error } = await supabase.from('tenaga_ahli').update(form).eq('id', id)
    if (error) throw error
  }

  async function remove(id: string): Promise<void> {
    const { error } = await supabase.from('tenaga_ahli').delete().eq('id', id)
    if (error) throw error
  }

  async function reorder(list: TenagaAhli[], id: string, direction: 'up' | 'down'): Promise<void> {
    const index = list.findIndex((item) => item.id === id)
    if (index === -1) return
    const swapIndex = direction === 'up' ? index - 1 : index + 1
    if (swapIndex < 0 || swapIndex >= list.length) return

    const current = list[index]
    const swap = list[swapIndex]
    if (!current || !swap) return

    const { error: e1 } = await supabase
      .from('tenaga_ahli')
      .update({ urutan: swap.urutan })
      .eq('id', current.id)
    if (e1) throw e1

    const { error: e2 } = await supabase
      .from('tenaga_ahli')
      .update({ urutan: current.urutan })
      .eq('id', swap.id)
    if (e2) throw e2
  }

  return { getAll, create, update, remove, reorder }
}
