import { createClient } from '@supabase/supabase-js';

const rawSupabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;

const normalizeSupabaseUrl = (url?: string) => {
  if (!url) return undefined;

  return url
    .trim()
    .replace(/\/rest\/v1\/?$/, '')
    .replace(/\/$/, '');
};

const supabaseUrl = normalizeSupabaseUrl(rawSupabaseUrl);

const hasValidUrl = Boolean(
  supabaseUrl &&
    supabaseUrl.startsWith('https://') &&
    supabaseUrl.endsWith('.supabase.co') &&
    !supabaseUrl.includes('seu-projeto.supabase.co'),
);

const hasValidAnonKey = Boolean(
  supabaseAnonKey &&
    supabaseAnonKey.length > 30 &&
    !supabaseAnonKey.includes('sua-chave-anon-publica'),
);

export const isSupabaseConfigured = hasValidUrl && hasValidAnonKey;

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl!, supabaseAnonKey!, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null;
