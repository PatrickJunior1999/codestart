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
  resendConfirmationEmail: (email: string) => Promise<void>;
  updatePassword: (password: string) => Promise<void>;
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


function authRedirectUrl(path: string) {
  const origin = window.location.origin.replace(/\/$/, '');
  return `${origin}${path}`;
}

function translateAuthError(message: string) {
  const normalized = message.toLowerCase();

  if (normalized.includes('email not confirmed') || normalized.includes('not confirmed')) {
    return 'Seu e-mail ainda não foi confirmado. Verifique sua caixa de entrada antes de entrar.';
  }

  if (normalized.includes('invalid login credentials')) {
    return 'E-mail ou senha incorretos. Verifique os dados e tente novamente.';
  }

  if (normalized.includes('request rate limit') || normalized.includes('rate limit')) {
    return 'Muitas tentativas em pouco tempo. Aguarde alguns minutos antes de tentar novamente.';
  }

  return message;
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

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      // O Supabase recomenda evitar chamadas assíncronas diretas dentro do callback.
      // Adiamos a hidratação para impedir instabilidade de sessão em fluxos com e-mail.
      setTimeout(() => {
        void hydrateSession(session).catch(() => {
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

    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      throw new Error(translateAuthError(error.message));
    }

    localStorage.removeItem(DEMO_STORAGE_KEY);
  }

  async function signUpWithEmail(data: SignUpData) {
    if (!supabase) {
      throw new Error('Supabase ainda não foi configurado. Use o modo demonstração ou configure o arquivo .env.');
    }

    const { data: authData, error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: authRedirectUrl('/login?confirmed=1'),
        data: {
          full_name: data.fullName,
          school: data.school ?? null,
          class_group: data.classGroup ?? null,
          lgpd_consent: data.lgpdConsent,
        },
      },
    });

    if (error) {
      throw new Error(translateAuthError(error.message));
    }

    localStorage.removeItem(DEMO_STORAGE_KEY);

    return { needsEmailConfirmation: Boolean(authData.user && !authData.session) };
  }

  async function sendPasswordReset(email: string) {
    if (!supabase) {
      throw new Error('Supabase ainda não foi configurado.');
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: authRedirectUrl('/nova-senha'),
    });

    if (error) {
      throw new Error(translateAuthError(error.message));
    }
  }

  async function resendConfirmationEmail(email: string) {
    if (!supabase) {
      throw new Error('Supabase ainda não foi configurado.');
    }

    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo: authRedirectUrl('/login?confirmed=1'),
      },
    });

    if (error) {
      throw new Error(translateAuthError(error.message));
    }
  }

  async function updatePassword(password: string) {
    if (!supabase) {
      throw new Error('Supabase ainda não foi configurado.');
    }

    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      throw new Error(translateAuthError(error.message));
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
      resendConfirmationEmail,
      updatePassword,
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
