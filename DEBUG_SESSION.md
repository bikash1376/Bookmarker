# Debugging Realtime Session

1.  **Refresh Tabs**.
2.  **Open Console**.
3.  Look for: `Realtime Session: Authenticated as ...`

## Scenarios
-   **If "No Session"**: The client side `createClient` isn't syncing the session. This is the bug.
-   **If "Authenticated"**: We are hitting an edge case in Supabase RLS.

Report back the message!
