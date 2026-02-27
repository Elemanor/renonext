import { create } from 'zustand';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info' | 'warning';
  title: string;
  message?: string;
  duration?: number;
}

type Theme = 'light' | 'dark';

interface UIState {
  theme: Theme;
  isMapView: boolean;
  activeTab: string;
  toasts: Toast[];
}

interface UIActions {
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
  toggleMapView: () => void;
  setMapView: (isMapView: boolean) => void;
  setActiveTab: (tab: string) => void;
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  clearToasts: () => void;
}

let toastCounter = 0;

export const useUIStore = create<UIState & UIActions>()((set, get) => ({
  theme: 'light',
  isMapView: false,
  activeTab: 'home',
  toasts: [],

  setTheme: (theme) => {
    set({ theme });
  },

  toggleTheme: () => {
    set((state) => ({
      theme: state.theme === 'light' ? 'dark' : 'light',
    }));
  },

  toggleMapView: () => {
    set((state) => ({ isMapView: !state.isMapView }));
  },

  setMapView: (isMapView) => {
    set({ isMapView });
  },

  setActiveTab: (tab) => {
    set({ activeTab: tab });
  },

  addToast: (toast) => {
    const id = `toast_${++toastCounter}_${Date.now()}`;
    const newToast: Toast = { ...toast, id };
    set((state) => ({ toasts: [...state.toasts, newToast] }));

    // Auto-remove after duration (default 4 seconds)
    const duration = toast.duration ?? 4000;
    if (duration > 0) {
      setTimeout(() => {
        get().removeToast(id);
      }, duration);
    }
  },

  removeToast: (id) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },

  clearToasts: () => {
    set({ toasts: [] });
  },
}));
