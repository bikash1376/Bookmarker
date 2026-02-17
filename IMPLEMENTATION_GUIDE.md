# Smart Bookmark App - Implementation & Troubleshooting Guide

## Features Implemented
- **Next.js App Router**: Modern framework usage.
- **Supabase Auth**: Google OAuth integration.
- **Realtime Sync**: Bookmarks update instantly.
- **Dark Mode**: Theme toggle.
- **Shadcn UI**: Polish and accessibility.

## Realtime Implementation Details
Implementing Realtime with RLS (Row Level Security) was the biggest challenge.

### The Problem
- **INSERT**: When inserting a row, the Realtime service checks if the *subscriber* can see the *new* row. With strict RLS (`auth.uid() = user_id`), sometimes the service filters out the event if the session context isn't perfect or if there's a race condition.
- **DELETE**: When deleting a row, the payload often contains only the `id` (Primary Key). It does **not** contain `user_id` unless the table has `REPLICA IDENTITY FULL`. This meant filtering by `user_id` caused DELETE events to be ignored.

### The Solution: Split Channels
We implemented a robust two-channel strategy in `RealtimeBookmarks`:

1.  **Channel 1 (INSERT/UPDATE)**: Subscribes with an explicit filter: `filter: "user_id=eq.{userId}"`.
    -   This forces the Realtime service to send events for rows owned by the user, bypassing some RLS ambiguity.
    
2.  **Channel 2 (DELETE)**: Subscribes to `DELETE` events **globally** without a filter.
    -   Since we filter `bookmarks` state in the client (`prev.filter(...)`), receiving extra delete events for IDs we don't have is harmless.
    -   This ensures we catch deletions even if the payload lacks metadata.

### Troubleshooting
If Realtime stops working:
1.  **Check SQL Publication**: run `alter publication supabase_realtime add table bookmarks;`
2.  **Check RLS**: Ensure policies allow `select`, `insert`, `delete` for authenticated users matches `user_id`.
3.  **Check Client Session**: Verify `createBrowserClient` is picking up the cookie.

## Development
Run: `npm run dev`
Deploy: Vercel + Supabase
