'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Trash2, ExternalLink } from 'lucide-react'
import { deleteBookmark } from '@/app/bookmarks/actions'
import { Card } from '@/components/ui/card'

interface Bookmark {
    id: number
    title: string
    url: string
    user_id: string
    created_at: string
}

export function RealtimeBookmarks({ serverBookmarks, userId }: { serverBookmarks: Bookmark[], userId: string }) {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>(serverBookmarks)
    const supabase = createClient()

    useEffect(() => {
        setBookmarks(serverBookmarks)
    }, [serverBookmarks])

    useEffect(() => {
        // Channel 1: INSERT and UPDATE (filtered by user_id)
        const dataChannel = supabase
            .channel('realtime-bookmarks-data')
            .on(
                'postgres_changes',
                {
                    event: 'INSERT',
                    schema: 'public',
                    table: 'bookmarks',
                    filter: `user_id=eq.${userId}`,
                },
                (payload) => {
                    console.log('INSERT payload:', payload.new)
                    setBookmarks((prev) => [...prev, payload.new as Bookmark])
                }
            )
            .on(
                'postgres_changes',
                {
                    event: 'UPDATE',
                    schema: 'public',
                    table: 'bookmarks',
                    filter: `user_id=eq.${userId}`,
                },
                (payload) => {
                    setBookmarks((prev) => prev.map((b) => b.id === payload.new.id ? payload.new as Bookmark : b))
                }
            )
            .subscribe()

        // Channel 2: DELETE (global, filter client-side if needed)
        // The DELETE payload might not have user_id if not REPLICA IDENTITY FULL
        const deleteChannel = supabase
            .channel('realtime-bookmarks-delete')
            .on(
                'postgres_changes',
                {
                    event: 'DELETE',
                    schema: 'public',
                    table: 'bookmarks',
                },
                (payload) => {
                    console.log('DELETE payload:', payload.old)
                    // Only delete if we have it in our state
                    setBookmarks((prev) => prev.filter((b) => b.id !== payload.old.id))
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(dataChannel)
            supabase.removeChannel(deleteChannel)
        }
    }, [supabase, userId])

    return (
        <div className="w-full space-y-4">
            {bookmarks.length === 0 ? (
                <div className="text-center p-8 border rounded-lg border-dashed text-muted-foreground bg-muted/50">
                    No bookmarks yet. Add one!
                </div>
            ) : (
                bookmarks.map((bookmark) => (
                    <Card
                        key={bookmark.id}
                        className="flex items-center justify-between p-4 group hover:shadow-md transition-all animate-in fade-in slide-in-from-bottom-2 duration-300"
                    >
                        <div className="flex-1 min-w-0 mr-4">
                            <h3 className="font-semibold truncate text-foreground">{bookmark.title}</h3>
                            <a
                                href={bookmark.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs text-muted-foreground hover:text-primary hover:underline flex items-center gap-1 truncate w-fit cursor-pointer mt-1"
                            >
                                {bookmark.url}
                                <ExternalLink className="h-3 w-3" />
                            </a>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteBookmark(bookmark.id)}
                            className="text-muted-foreground hover:text-destructive hover:bg-destructive/10 cursor-pointer opacity-70 group-hover:opacity-100 transition-opacity"
                        >
                            <Trash2 className="h-4 w-4" />
                            <span className="sr-only">Delete</span>
                        </Button>
                    </Card>
                ))
            )}
        </div>
    )
}
