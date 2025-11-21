'use client';

import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'default' | 'dark' | 'high-contrast' | 'cardinal' | 'royal' | 'peony' | 'noir';

interface ThemeProviderProps {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
}

interface ThemeProviderState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const initialState: ThemeProviderState = {
  theme: 'default',
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = 'default',
  storageKey = 'inartact-theme',
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem(storageKey) as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, [storageKey]);

  useEffect(() => {
    if (!mounted) return;

    const root = window.document.documentElement;
    // Remove all potential theme classes
    root.classList.remove('default', 'dark', 'high-contrast', 'cardinal', 'royal', 'peony', 'noir');

    if (theme !== 'default') {
      root.classList.add(theme);
    }
    
    localStorage.setItem(storageKey, theme);
  }, [theme, storageKey, mounted]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      setTheme(theme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...{ value }}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};