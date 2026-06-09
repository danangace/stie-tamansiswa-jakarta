export interface KegiatanMahasiswa {
  id: string
  judul: string
  deskripsi: string | null
  foto_url: string | null
  urutan: number
  created_at: string
}

export type KegiatanMahasiswaForm = Pick<KegiatanMahasiswa, 'judul' | 'deskripsi' | 'foto_url'>

export function useKegiatanMahasiswa() {
  const supabase = useSupabase()

  async function getAll(): Promise<KegiatanMahasiswa[]> {
    const { data, error } = await supabase
      .from('kegiatan_mahasiswa')
      .select('*')
      .order('urutan', { ascending: true })
    if (error) throw error
    return data
  }

  async function create(form: KegiatanMahasiswaForm): Promise<void> {
    const { data: maxRow } = await supabase
      .from('kegiatan_mahasiswa')
      .select('urutan')
      .order('urutan', { ascending: false })
      .limit(1)
      .single()
    const urutan = maxRow ? maxRow.urutan + 1 : 1
    const { error } = await supabase.from('kegiatan_mahasiswa').insert({ ...form, urutan })
    if (error) throw error
  }

  async function update(id: string, form: KegiatanMahasiswaForm): Promise<void> {
    const { error } = await supabase.from('kegiatan_mahasiswa').update(form).eq('id', id)
    if (error) throw error
  }

  async function remove(id: string): Promise<void> {
    const { error } = await supabase.from('kegiatan_mahasiswa').delete().eq('id', id)
    if (error) throw error
  }

  async function reorder(list: KegiatanMahasiswa[], id: string, direction: 'up' | 'down'): Promise<void> {
    const index = list.findIndex((item) => item.id === id)
    if (index === -1) return
    const swapIndex = direction === 'up' ? index - 1 : index + 1
    if (swapIndex < 0 || swapIndex >= list.length) return

    const current = list[index]
    const swap = list[swapIndex]
    if (!current || !swap) return

    const { error: e1 } = await supabase
      .from('kegiatan_mahasiswa')
      .update({ urutan: swap.urutan })
      .eq('id', current.id)
    if (e1) throw e1

    const { error: e2 } = await supabase
      .from('kegiatan_mahasiswa')
      .update({ urutan: current.urutan })
      .eq('id', swap.id)
    if (e2) throw e2
  }

  return { getAll, create, update, remove, reorder }
}
