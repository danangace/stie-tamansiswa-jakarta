export function useStorage() {
  const supabase = useSupabase()

  async function upload(bucket: string, path: string, file: File): Promise<string> {
    const ext = file.name.split('.').pop()
    const fileName = `${Date.now()}.${ext}`
    const fullPath = `${path}/${fileName}`

    const { error } = await supabase.storage.from(bucket).upload(fullPath, file, {
      upsert: true,
    })
    if (error) throw error

    const { data } = supabase.storage.from(bucket).getPublicUrl(fullPath)
    return data.publicUrl
  }

  async function remove(bucket: string, url: string): Promise<void> {
    const urlObj = new URL(url)
    const pathParts = urlObj.pathname.split(`/object/public/${bucket}/`)
    if (pathParts.length < 2) return
    const filePath = pathParts[1] as string
    await supabase.storage.from(bucket).remove([filePath])
  }

  return { upload, remove }
}
