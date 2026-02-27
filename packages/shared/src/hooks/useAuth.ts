import { useEffect, useCallback } from 'react';
import { useAuthStore } from '../stores/authStore';
import { supabase } from '../api/supabase';
import * as authApi from '../api/auth';
import { getProfile } from '../api/profiles';
import type { UserRole } from '../types/user';

export function useAuth() {
  const {
    user,
    session,
    role,
    isLoading,
    isOnboarded,
    setUser,
    setSession,
    setLoading,
    clear,
  } = useAuthStore();

  // Listen for auth state changes
  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      if (currentSession?.user) {
        setSession(currentSession as unknown as Parameters<typeof setSession>[0]);
        getProfile(currentSession.user.id)
          .then((profile) => {
            setUser(profile);
          })
          .catch(() => {
            // Profile may not exist yet (new user)
            setLoading(false);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    });

    // Listen for changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, newSession) => {
      if (event === 'SIGNED_IN' && newSession?.user) {
        setSession(newSession as unknown as Parameters<typeof setSession>[0]);
        try {
          const profile = await getProfile(newSession.user.id);
          setUser(profile);
        } catch {
          // Profile not yet created
        }
      } else if (event === 'SIGNED_OUT') {
        clear();
      } else if (event === 'TOKEN_REFRESHED' && newSession) {
        setSession(newSession as unknown as Parameters<typeof setSession>[0]);
      }
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [setUser, setSession, setLoading, clear]);

  const signIn = useCallback(
    async (email: string, password: string) => {
      setLoading(true);
      try {
        const data = await authApi.signIn(email, password);
        return data;
      } finally {
        setLoading(false);
      }
    },
    [setLoading]
  );

  const signUp = useCallback(
    async (email: string, password: string, fullName: string, userRole: UserRole) => {
      setLoading(true);
      try {
        const data = await authApi.signUp(email, password, fullName, userRole);
        return data;
      } finally {
        setLoading(false);
      }
    },
    [setLoading]
  );

  const signOut = useCallback(async () => {
    await authApi.signOut();
    clear();
  }, [clear]);

  const signInWithGoogle = useCallback(async () => {
    return authApi.signInWithGoogle();
  }, []);

  const signInWithApple = useCallback(async () => {
    return authApi.signInWithApple();
  }, []);

  return {
    user,
    session,
    role,
    isLoading,
    isOnboarded,
    isAuthenticated: Boolean(session && user),
    signIn,
    signUp,
    signOut,
    signInWithGoogle,
    signInWithApple,
  };
}
