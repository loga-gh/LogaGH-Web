import { createBrowserClient as createSupabaseBrowserClient } from "@supabase/ssr";

export function createClient() {
    return createSupabaseBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
}

// Alias so components can import `createBrowserClient` directly
export const createBrowserClient = createClient;
