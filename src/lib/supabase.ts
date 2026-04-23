import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL ?? "";
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY ?? "";

/**
 * Shared Supabase client for both server-side (Astro frontmatter) and
 * client-side (inline <script>) usage.
 *
 * When env vars are missing the client is still created — calls will fail
 * gracefully and components fall back to static data.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/** Returns true when Supabase credentials are configured. */
export function isSupabaseConfigured(): boolean {
  return supabaseUrl.length > 0 && supabaseAnonKey.length > 0;
}
