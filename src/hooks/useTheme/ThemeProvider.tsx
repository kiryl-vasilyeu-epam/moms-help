import { useMemo, useCallback, type ReactNode } from 'react';
import { CssBaseline, ThemeProvider as MuiThemeProvider } from '@mui/material';
import { createMuiTheme, lightTheme, darkTheme } from '@/styles';
import type { ThemeMode } from '@/styles';
import { ThemeContext } from './ThemeContext';
import { useLocalStorage } from '../useLocalStorage';
import { STORAGE_KEYS } from '@constants';

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [themeMode, setThemeMode] = useLocalStorage<ThemeMode>(
    STORAGE_KEYS.THEME_MODE,
    'light',
  );

  const theme = useMemo(
    () => (themeMode === 'dark' ? darkTheme : lightTheme),
    [themeMode],
  );
  const muiTheme = useMemo(() => createMuiTheme(theme), [theme]);

  const toggleTheme = useCallback(() => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light');
  }, [themeMode, setThemeMode]);

  const value = useMemo(
    () => ({
      theme,
      themeMode,
      toggleTheme,
      setThemeMode,
    }),
    [theme, themeMode, toggleTheme, setThemeMode],
  );

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
