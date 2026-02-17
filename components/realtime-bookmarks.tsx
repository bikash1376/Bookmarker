'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { Button } from '@/components/ui/button'
import { Trash2, ExternalLink } from 'lucide-react'
import { deleteBookmark } from '@/app/bookmarks/actions'

interface Bookmark {
    id: number
    title: string
    url: string
    user_id: string
    created_at: string
}

export function RealtimeBookmarks({ serverBookmarks }: { serverBookmarks: Bookmark[] }) {
    const [bookmarks, setBookmarks] = useState<Bookmark[]>(serverBookmarks)
    const supabase = createClient()

    useEffect(() => {
        // Sync with server data initially
        setBookmarks(serverBookmarks)
    }, [serverBookmarks])

    useEffect(() => {
        const channel = supabase
            .channel('realtime-bookmarks')
            .on(
                'postgres_changes',
                {
                    event: '*',
                    schema: 'public',
                    table: 'bookmarks',
                },
                (payload) => {
                    if (payload.eventType === 'INSERT') {
                        setBookmarks((prev) => [...prev, payload.new as Bookmark])
                    } else if (payload.eventType === 'DELETE') {
                        setBookmarks((prev) => prev.filter((b) => b.id !== payload.old.id))
                    } else if (payload.eventType === 'UPDATE') {
                        setBookmarks((prev) => prev.map((b) => b.id === payload.new.id ? payload.new as Bookmark : b))
                    }
                }
            )
            .subscribe()

        return () => {
            supabase.removeChannel(channel)
        }
    }, [supabase])

    return (
        <div className="w-full max-w-md space-y-4">
            {bookmarks.length === 0 ? (
                <p className="text-center text-gray-500">No bookmarks yet. Add one!</p>
            ) : (
                bookmarks.map((bookmark) => (
                    <div
                        key={bookmark.id}
                        className="flex items-center justify-between p-4 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="flex-1 min-w-0 mr-4">
                            <h3 className="font-medium truncate">{bookmark.title}</h3>
                            <a
                                href={bookmark.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-blue-500 hover:underline flex items-center gap-1 truncate"
                            >
                                {bookmark.url}
                                <ExternalLink className="h-3 w-3" />
                            </a>
                        </div>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => deleteBookmark(bookmark.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                        >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                ))
            )}
        </div>
    )
}
