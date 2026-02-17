'use client'

import { Button } from '@/components/ui/button'
import { addBookmark } from '@/app/bookmarks/actions'
import { Plus } from 'lucide-react'
import { useRef } from 'react'

export function AddBookmark() {
    const formRef = useRef<HTMLFormElement>(null)

    return (
        <form
            action={async (formData) => {
                await addBookmark(formData)
                formRef.current?.reset()
            }}
            ref={formRef}
            className="flex w-full max-w-sm items-center space-x-2 mb-8"
        >
            <input
                type="text"
                name="title"
                placeholder="Title"
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <input
                type="url"
                name="url"
                placeholder="URL (https://...)"
                required
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Button type="submit" size="icon">
                <Plus className="h-4 w-4" />
            </Button>
        </form>
    )
}
