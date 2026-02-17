# Debugging RLS Blocking INSERT

You are authenticated! But RLS still seems to block the INSERT event.

## Action Request
Please run this SQL in Supabase Dashboard SQL Editor:

```sql
create policy "DEBUG_READ_ALL" on bookmarks for select using (true);
```

This will confirm if RLS is the culprit. After running it, add a bookmark. If you see the Realtime event, then we know RLS was the issue and we can fix it properly.
