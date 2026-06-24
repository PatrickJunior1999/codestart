import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { isSupabaseConfigured, supabase } from '../lib/supabase';
import type { Profile } from '../types';

type AppUser = {
  id: string;
  email: string;
  fullName: string;
  isDemo: boolean;
};

type SignUpData = {
  fullName: string;
  email: string;
  password: string;
  school?: string;
  classGroup?: string;
  lgpdConsent: boolean;
};

type AuthContextValue = {
  user: AppUser | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isDemoMode: boolean;
  isSupabaseReady: boolean;
  loginDemo: () => void;
  signInWithEmail: (email: string, password: string) => Promise<void>;
  signUpWithEmail: (data: SignUpData) => Promise<{ needsEmailConfirmation: boolean }>;
  sendPasswordReset: (email: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
  logout: () => Promise<void>;
};

const DEMO_STORAGE_KEY = 'codestart_demo_user';
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

function mapProfileToUser(profile: Profile): AppUser {
  return {
    id: profile.id,
    email: profile.email,
    fullName: profile.full_name,
    isDemo: false,
  };
}

function readDemoUser(): AppUser | null {
  const stored = localStorage.getItem(DEMO_STORAGE_KEY);
  if (!stored) return null;

  try {
    return JSON.parse(stored) as AppUser;
  } catch {
    localStorage.removeItem(DEMO_STORAGE_KEY);
    return null;
  }
}

async function loadProfile(session: Session): Promise<Profile> {
  if (!supabase) {
    throw new Error('Supabase não configurado.');
  }

  const { data, error } = await supabase
    .from('profiles')
    .select('id, full_name, email, school, class_group, role, lgpd_consent')
    .eq('id', session.user.id)
    .single();

  if (error) {
    throw new Error(`Não foi possível carregar o perfil: ${error.message}`);
  }

  return data as Profile;
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AppUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const hydrateSession = useCallback(async (session: Session | null) => {
    if (!session) {
      const demoUser = readDemoUser();
      setUser(demoUser);
      setProfile(null);
      setIsLoading(false);
      return;
    }

    const loadedProfile = await loadProfile(session);
    setProfile(loadedProfile);
    setUser(mapProfileToUser(loadedProfile));
    setIsLoading(false);
  }, []);

  useEffect(() => {
    let isMounted = true;

    async function initAuth() {
      if (!isSupabaseConfigured || !supabase) {
        if (!isMounted) return;
        setUser(readDemoUser());
        setIsLoading(false);
        return;
      }

      const { data } = await supabase.auth.getSession();
      if (!isMounted) return;

      try {
        await hydrateSession(data.session);
      } catch {
        setUser(readDemoUser());
        setProfile(null);
        setIsLoading(false);
      }
    }

    void initAuth();

    if (!isSupabaseConfigured || !supabase) {
      return () => {
        isMounted = false;
      };
    }

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      // Importante: não execute chamadas Supabase diretamente dentro deste callback.
      // O supabase-js pode travar chamadas futuras se outro método do cliente for aguardado
      // dentro de onAuthStateChange. Por isso adiamos a hidratação para o próximo ciclo.
      window.setTimeout(() => {
        if (!isMounted) return;

        if (event === 'SIGNED_OUT') {
          setUser(readDemoUser());
          setProfile(null);
          setIsLoading(false);
          return;
        }

        void hydrateSession(session).catch(() => {
          if (!isMounted) return;
          setUser(null);
          setProfile(null);
          setIsLoading(false);
        });
      }, 0);
    });

    return () => {
      isMounted = false;
      listener.subscription.unsubscribe();
    };
  }, [hydrateSession]);

  function loginDemo() {
    const demoUser: AppUser = {
      id: 'demo-user',
      email: 'aluno@codestart.demo',
      fullName: 'Aluno CodeStart',
      isDemo: true,
    };
    localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(demoUser));
    setUser(demoUser);
    setProfile(null);
  }

  async function signInWithEmail(email: string, password: string) {
    if (!supabase) {
      throw new Error('Supabase ainda não foi configurado. Use o modo demonstração ou configure o arquivo .env.');
    }

    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      const normalizedMessage = error.message.toLowerCase();
      if (normalizedMessage.includes('email not confirmed') || normalizedMessage.includes('not confirmed')) {
        throw new Error('Seu e-mail ainda não foi confirmado. Verifique sua caixa de entrada e clique no link de confirmação enviado pelo CodeStart.');
      }
      if (normalizedMessage.includes('rate limit') || normalizedMessage.includes('too many')) {
        throw new Error('Muitas tentativas em pouco tempo. Aguarde alguns minutos e tente novamente.');
      }
      throw new Error(error.message);
    }

    localStorage.removeItem(DEMO_STORAGE_KEY);

    // Atualiza o contexto antes de redirecionar, evitando piscar na tela protegida e voltar ao login.
    if (data.session) {
      await hydrateSession(data.session);
    }
  }

  async function signUpWithEmail(data: SignUpData) {
    if (!supabase) {
      throw new Error('Supabase ainda não foi configurado. Use o modo demonstração ou configure o arquivo .env.');
    }

    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/login?email_confirmed=1`,
        data: {
          full_name: data.fullName,
          school: data.school ?? null,
          class_group: data.classGroup ?? null,
          lgpd_consent: data.lgpdConsent,
        },
      },
    });

    if (error) {
      const normalizedMessage = error.message.toLowerCase();
      if (normalizedMessage.includes('rate limit') || normalizedMessage.includes('too many')) {
        throw new Error('Muitas tentativas em pouco tempo. Aguarde alguns minutos e tente novamente.');
      }
      throw new Error(error.message);
    }

    localStorage.removeItem(DEMO_STORAGE_KEY);

    return { needsEmailConfirmation: Boolean(authData.user && !authData.session) };
  }

  async function sendPasswordReset(email: string) {
    if (!supabase) {
      throw new Error('Supabase ainda não foi configurado.');
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/login`,
    });

    if (error) {
      throw new Error(error.message);
    }
  }

  async function refreshProfile() {
    if (!supabase) return;
    const { data } = await supabase.auth.getSession();
    await hydrateSession(data.session);
  }

  async function logout() {
    localStorage.removeItem(DEMO_STORAGE_KEY);
    if (supabase) {
      await supabase.auth.signOut();
    }
    setUser(null);
    setProfile(null);
  }

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      profile,
      isAuthenticated: Boolean(user),
      isLoading,
      isDemoMode: Boolean(user?.isDemo),
      isSupabaseReady: isSupabaseConfigured,
      loginDemo,
      signInWithEmail,
      signUpWithEmail,
      sendPasswordReset,
      refreshProfile,
      logout,
    }),
    [user, profile, isLoading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider.');
  }
  return context;
}
