# Debugging Realtime INSERTs

The `DELETE` working but `INSERT` failing is a classic sign of RLS policy blocking the *Realtime* service from broadcasting the *new* row to you, OR the client not having the right context.

## What to test
1.  **Refresh Both Tabs**: Ensuring both have valid sessions.
2.  **Add Bookmark**: Watch the console of the *other* tab.
3.  **Logs**: Look for `Realtime Event Received:`

## Potential Fixes if it fails
1.  **Check RLS Policy**: Ensure `select` policy is `auth.uid() = user_id`. (We did this).
2.  **Check Publication**: ensure `bookmarks` is in `supabase_realtime`. (The error 42710 confirmed this).

If you see `INSERT` in the console but no UI update -> React state issue.
If you see NO `INSERT` in console -> Supabase/RLS issue.
