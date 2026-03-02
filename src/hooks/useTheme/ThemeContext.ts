import { createContext } from 'react';
import type { ThemeContextValue } from './useTheme.types';

export const ThemeContext = createContext<ThemeContextValue | null>(null);
