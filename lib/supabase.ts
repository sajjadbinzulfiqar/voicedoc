import "server-only";

import { createClient } from "@supabase/supabase-js";

function getSupabaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL;
}

function getAnonKey() {
  return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
}

function getServiceRoleKey() {
  return process.env.SUPABASE_SERVICE_ROLE_KEY;
}

export function hasSupabaseEnv() {
  return Boolean(getSupabaseUrl() && getAnonKey() && getServiceRoleKey());
}

export function createSupabaseAdminClient() {
  const url = getSupabaseUrl();
  const serviceRoleKey = getServiceRoleKey();

  if (!url || !serviceRoleKey) {
    throw new Error("Supabase URL or service role key is not configured.");
  }

  return createClient(url, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
