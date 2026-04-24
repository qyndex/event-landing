import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || "http://localhost:54321";
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || "placeholder";

/**
 * Shared Supabase client for both server-side (Astro frontmatter) and
 * client-side (inline <script>) usage.
 *
 * When env vars are missing the client is still created — calls will fail
 * gracefully and components fall back to static data.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/** Returns true when real Supabase credentials are configured. */
export function isSupabaseConfigured(): boolean {
  return supabaseUrl !== "http://localhost:54321" && supabaseAnonKey !== "placeholder" && supabaseUrl.length > 0 && supabaseAnonKey.length > 0;
}
