import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { AddBookmark } from '@/components/add-bookmark'
import { RealtimeBookmarks } from '@/components/realtime-bookmarks'
import { SiteHeader } from '@/components/site-header'
import { SiteFooter } from '@/components/site-footer'

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
    .order('created_at', { ascending: true })

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader user={user} />

      <main className="flex-1 container max-w-4xl mx-auto px-4 py-8 flex flex-col items-center">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Your Bookmarks</h2>
            <p className="text-muted-foreground">
              Manage your links across devices in real-time.
            </p>
          </div>

          <AddBookmark />

          <RealtimeBookmarks serverBookmarks={bookmarks || []} userId={user.id} />
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
