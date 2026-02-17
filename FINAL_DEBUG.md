# Debugging with Explicit Filter

I've updated `RealtimeBookmarks` to listen specifically for your user ID:
`filter: user_id=eq.{your_user_id}`

## Why this helps
Sometimes Realtime + RLS gets confused about "new" rows. An explicit filter tells Supabase exactly what to send you.

## Test
1.  Refresh both tabs.
2.  Add a bookmark.
3.  Check the other tab.

If it works -> Problem Solved.
If not -> We must relax RLS (see DEBUG_RLS.md).
