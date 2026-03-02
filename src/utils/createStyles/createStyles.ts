import type { SxStylesMap, StylesMap, Theme } from './createStyles.types';
import { theme } from '@/styles';

// overloads
export function createStyles<TStyles extends StylesMap>(
  styles: TStyles,
): TStyles;

export function createStyles<TStyles extends StylesMap>(
  styles: (theme: Theme) => TStyles,
): TStyles;

// implementation
export function createStyles(styles: unknown) {
  if (typeof styles === 'function') {
    return styles(theme);
  }
  return styles;
}

// overloads for SX styles (MUI components)
export function createSxStyles<TStyles extends SxStylesMap>(
  styles: TStyles,
): TStyles;

export function createSxStyles<TStyles extends SxStylesMap>(
  styles: (theme: Theme) => TStyles,
): TStyles;

// implementation
export function createSxStyles(styles: unknown) {
  if (typeof styles === 'function') {
    return styles(theme);
  }
  return styles;
}
