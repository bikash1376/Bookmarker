"use client"

import Link from "next/link"
import { Bookmark, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { signOut } from "@/app/auth/actions"

interface SiteHeaderProps {
    user: {
        email?: string
        user_metadata?: {
            avatar_url?: string
            full_name?: string
        }
    }
}

export function SiteHeader({ user }: SiteHeaderProps) {
    const avatarUrl = user.user_metadata?.avatar_url
    const initials = user.email
        ? user.email.substring(0, 2).toUpperCase()
        : "U"

    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-14 items-center w-full max-w-4xl mx-auto px-4">
                <Link href="/" className="mr-6 flex items-center space-x-2 cursor-pointer">
                    <Bookmark className="h-6 w-6" />
                    <span className="font-bold inline-block">Bookmarker</span>
                </Link>
                <div className="flex flex-1 items-center justify-end space-x-4">
                    <ModeToggle />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="relative h-8 w-8 rounded-full cursor-pointer">
                                <Avatar className="h-8 w-8">
                                    <AvatarImage src={avatarUrl} alt={user.email} />
                                    <AvatarFallback>{initials}</AvatarFallback>
                                </Avatar>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="end" forceMount>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        {user.user_metadata?.full_name || "User"}
                                    </p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        {user.email}
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild className="cursor-pointer">
                                <form action={signOut} className="w-full">
                                    <button type="submit" className="flex w-full items-center">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </button>
                                </form>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header>
    )
}
