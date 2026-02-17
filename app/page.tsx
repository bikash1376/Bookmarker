import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { signOut } from './auth/actions'
import { Button } from '@/components/ui/button'
import { AddBookmark } from '@/components/add-bookmark'
import { RealtimeBookmarks } from '@/components/realtime-bookmarks'

export default async function Home() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login')
  }

  // Fetch bookmarks
  const { data: bookmarks } = await supabase
    .from('bookmarks')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: true })

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 text-black py-10 px-4">
      <header className="w-full max-w-4xl flex justify-between items-center mb-10">
        <h1 className="text-3xl font-bold text-gray-900">
          Bookmarker
        </h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 hidden sm:inline">{user.email}</span>
          <form action={signOut}>
            <Button variant="outline" size="sm">Sign Out</Button>
          </form>
        </div>
      </header>

      <main className="w-full max-w-md w-full flex flex-col items-center">
        <AddBookmark />
        <RealtimeBookmarks serverBookmarks={bookmarks || []} />
      </main>
    </div>
  )
}
