import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react';

interface AccessibilityState {
  darkMode: boolean;
  highContrast: boolean;
  largeButtons: boolean;
}

interface AccessibilityContextValue extends AccessibilityState {
  toggleDarkMode: () => void;
  toggleHighContrast: () => void;
  toggleLargeButtons: () => void;
}

const STORAGE_KEY = 'renonext-accessibility';

function loadSettings(): AccessibilityState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    // ignore
  }
  return { darkMode: false, highContrast: false, largeButtons: false };
}

const AccessibilityContext = createContext<AccessibilityContextValue | null>(null);

export function AccessibilityProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AccessibilityState>(loadSettings);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  // Apply dark class to <html>
  useEffect(() => {
    document.documentElement.classList.toggle('dark', state.darkMode);
  }, [state.darkMode]);

  // Apply high-contrast class
  useEffect(() => {
    document.documentElement.classList.toggle('high-contrast', state.highContrast);
  }, [state.highContrast]);

  const toggleDarkMode = useCallback(
    () => setState((s) => ({ ...s, darkMode: !s.darkMode })),
    [],
  );
  const toggleHighContrast = useCallback(
    () => setState((s) => ({ ...s, highContrast: !s.highContrast })),
    [],
  );
  const toggleLargeButtons = useCallback(
    () => setState((s) => ({ ...s, largeButtons: !s.largeButtons })),
    [],
  );

  return (
    <AccessibilityContext.Provider
      value={{ ...state, toggleDarkMode, toggleHighContrast, toggleLargeButtons }}
    >
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return ctx;
}
