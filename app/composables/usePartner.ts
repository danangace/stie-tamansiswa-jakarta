export interface Partner {
  id: string
  nama: string
  urutan: number
  created_at: string
}

export type PartnerForm = Pick<Partner, 'nama'>

export function usePartner() {
  const supabase = useSupabase()

  async function getAll(): Promise<Partner[]> {
    const { data, error } = await supabase
      .from('partner')
      .select('*')
      .order('urutan', { ascending: true })
    if (error) throw error
    return data
  }

  async function create(form: PartnerForm): Promise<void> {
    const { data: maxRow } = await supabase
      .from('partner')
      .select('urutan')
      .order('urutan', { ascending: false })
      .limit(1)
      .single()
    const urutan = maxRow ? maxRow.urutan + 1 : 1
    const { error } = await supabase.from('partner').insert({ ...form, urutan })
    if (error) throw error
  }

  async function update(id: string, form: PartnerForm): Promise<void> {
    const { error } = await supabase.from('partner').update(form).eq('id', id)
    if (error) throw error
  }

  async function remove(id: string): Promise<void> {
    const { error } = await supabase.from('partner').delete().eq('id', id)
    if (error) throw error
  }

  async function reorder(list: Partner[], id: string, direction: 'up' | 'down'): Promise<void> {
    const index = list.findIndex((item) => item.id === id)
    if (index === -1) return
    const swapIndex = direction === 'up' ? index - 1 : index + 1
    if (swapIndex < 0 || swapIndex >= list.length) return

    const current = list[index]
    const swap = list[swapIndex]
    if (!current || !swap) return

    const { error: e1 } = await supabase
      .from('partner')
      .update({ urutan: swap.urutan })
      .eq('id', current.id)
    if (e1) throw e1

    const { error: e2 } = await supabase
      .from('partner')
      .update({ urutan: current.urutan })
      .eq('id', swap.id)
    if (e2) throw e2
  }

  return { getAll, create, update, remove, reorder }
}
