import { create } from 'zustand';
import type { Profile, UserRole } from '../types/user';

interface Session {
  access_token: string;
  refresh_token: string;
  expires_at?: number;
  user: {
    id: string;
    email?: string;
  };
}

interface AuthState {
  user: Profile | null;
  session: Session | null;
  role: UserRole | null;
  isLoading: boolean;
  isOnboarded: boolean;
}

interface AuthActions {
  setUser: (user: Profile | null) => void;
  setSession: (session: Session | null) => void;
  setRole: (role: UserRole | null) => void;
  setLoading: (loading: boolean) => void;
  clear: () => void;
  checkOnboarding: () => boolean;
}

const initialState: AuthState = {
  user: null,
  session: null,
  role: null,
  isLoading: true,
  isOnboarded: false,
};

export const useAuthStore = create<AuthState & AuthActions>()((set, get) => ({
  ...initialState,

  setUser: (user) => {
    const isOnboarded = user
      ? Boolean(user.full_name && user.role && user.is_verified)
      : false;
    set({ user, role: user?.role ?? null, isOnboarded });
  },

  setSession: (session) => {
    set({ session });
  },

  setRole: (role) => {
    set({ role });
  },

  setLoading: (isLoading) => {
    set({ isLoading });
  },

  clear: () => {
    set({ ...initialState, isLoading: false });
  },

  checkOnboarding: () => {
    const { user, role } = get();
    if (!user) return false;

    const hasBasicInfo = Boolean(user.full_name && user.phone);
    const hasRole = Boolean(role);
    const isOnboarded = hasBasicInfo && hasRole;

    set({ isOnboarded });
    return isOnboarded;
  },
}));
