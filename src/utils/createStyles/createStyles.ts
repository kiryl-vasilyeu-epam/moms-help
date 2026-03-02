import type {
  SxStylesMap,
  StylesMap,
  Theme,
  StyleSheet,
} from './createStyles.types';
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

/**
 * Creates a reactive stylesheet that evaluates against the current theme.
 * Use with useStyles() hook for live theme updates.
 *
 * @example
 * // In .styles.ts file:
 * export const stylesheet = createStyleSheet(({ colors }) => ({
 *   container: { background: colors.background }
 * }));
 *
 * // In component:
 * const styles = useStyles(stylesheet);
 * return <div css={styles.container} />;
 */
export function createStyleSheet<TStyles extends StylesMap>(
  factory: (theme: Theme) => TStyles,
): StyleSheet<TStyles> {
  return { __factory: factory };
}
