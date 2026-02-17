'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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
            className="flex w-full flex-col sm:flex-row items-center gap-2 mb-8"
        >
            <Input
                type="text"
                name="title"
                placeholder="Title"
                required
                className="flex-1"
            />
            <Input
                type="url"
                name="url"
                placeholder="URL (https://...)"
                required
                className="flex-1"
            />
            <Button type="submit" size="icon" className="shrink-0 cursor-pointer">
                <Plus className="h-4 w-4" />
                <span className="sr-only">Add Bookmark</span>
            </Button>
        </form>
    )
}
