export interface Banner {
  id: string
  foto_url: string
  urutan: number
  created_at: string
}

export function useBanner() {
  const supabase = useSupabase()
  const { upload, remove: removeFile } = useStorage()

  async function getAll(): Promise<Banner[]> {
    const { data, error } = await supabase
      .from('banner')
      .select('*')
      .order('urutan', { ascending: true })
    if (error) throw error
    return data
  }

  async function create(file: File): Promise<void> {
    const { data: maxRow } = await supabase
      .from('banner')
      .select('urutan')
      .order('urutan', { ascending: false })
      .limit(1)
      .single()
    const urutan = maxRow ? maxRow.urutan + 1 : 1

    const foto_url = await upload('media', 'banner', file)
    const { error } = await supabase.from('banner').insert({ foto_url, urutan })
    if (error) throw error
  }

  async function remove(id: string, foto_url: string): Promise<void> {
    const { error } = await supabase.from('banner').delete().eq('id', id)
    if (error) throw error
    await removeFile('media', foto_url)
  }

  async function reorder(list: Banner[], id: string, direction: 'up' | 'down'): Promise<void> {
    const index = list.findIndex((item) => item.id === id)
    if (index === -1) return
    const swapIndex = direction === 'up' ? index - 1 : index + 1
    if (swapIndex < 0 || swapIndex >= list.length) return

    const current = list[index]
    const swap = list[swapIndex]
    if (!current || !swap) return

    const { error: e1 } = await supabase
      .from('banner')
      .update({ urutan: swap.urutan })
      .eq('id', current.id)
    if (e1) throw e1

    const { error: e2 } = await supabase
      .from('banner')
      .update({ urutan: current.urutan })
      .eq('id', swap.id)
    if (e2) throw e2
  }

  return { getAll, create, remove, reorder }
}
