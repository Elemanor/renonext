import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from 'react';
import type { User, Session } from '@supabase/supabase-js';
import type { OrganizationMember } from '@renonext/shared/types/field';
import { supabase } from '@/lib/supabase';

interface AuthState {
  user: User | null;
  session: Session | null;
  membership: OrganizationMember | null;
  loading: boolean;
}

interface AuthContextValue extends AuthState {
  signIn: (email: string, password: string) => Promise<void>;
  signInWithPin: (orgSlug: string, pin: string) => Promise<void>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    membership: null,
    loading: true,
  });

  // Fetch org membership for the current user
  const fetchMembership = useCallback(async (userId: string) => {
    const { data } = await supabase
      .from('organization_members')
      .select('*')
      .eq('user_id', userId)
      .eq('is_active', true)
      .limit(1)
      .single();

    return data as OrganizationMember | null;
  }, []);

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      let membership: OrganizationMember | null = null;
      if (session?.user) {
        membership = await fetchMembership(session.user.id);
      }
      setState({
        user: session?.user ?? null,
        session,
        membership,
        loading: false,
      });
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      let membership: OrganizationMember | null = null;
      if (session?.user) {
        membership = await fetchMembership(session.user.id);
      }
      setState({
        user: session?.user ?? null,
        session,
        membership,
        loading: false,
      });
    });

    return () => subscription.unsubscribe();
  }, [fetchMembership]);

  const signIn = useCallback(async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  }, []);

  const signInWithPin = useCallback(
    async (_orgSlug: string, _pin: string) => {
      // PIN-based auth: look up org member by slug + pin,
      // then sign in with their linked email.
      // This will be implemented when PIN auth flow is built.
      throw new Error('PIN auth not yet implemented');
    },
    []
  );

  const signOut = useCallback(async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  }, []);

  return (
    <AuthContext.Provider
      value={{ ...state, signIn, signInWithPin, signOut }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
