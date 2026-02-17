'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function addBookmark(formData: FormData) {
  const title = formData.get('title') as string
  const url = formData.get('url') as string
  
  if (!title || !url) return

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return

  const { error } = await supabase.from('bookmarks').insert({
    title,
    url,
    user_id: user.id
  })

  if (error) {
     console.error('Error adding bookmark:', error)
     return
  }

  revalidatePath('/')
}

export async function deleteBookmark(id: number) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return

  const { error } = await supabase.from('bookmarks').delete().match({ id, user_id: user.id })

  if (error) {
      console.error('Error deleting bookmark:', error)
      return
  }
  
  revalidatePath('/')
}
