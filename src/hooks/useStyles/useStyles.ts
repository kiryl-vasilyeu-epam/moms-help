import { useMemo } from 'react';
import { useTheme } from '@hooks/useTheme';
import type { StylesMap, StyleSheet } from '@utils';

/**
 * Hook that evaluates a stylesheet against the current theme.
 * Re-renders when theme changes, enabling live theme switching.
 *
 * @example
 * const stylesheet = createStyleSheet(({ colors }) => ({
 *   container: { background: colors.background }
 * }));
 *
 * const MyComponent = () => {
 *   const styles = useStyles(stylesheet);
 *   return <div css={styles.container} />;
 * };
 */
export const useStyles = <TStyles extends StylesMap>(
  stylesheet: StyleSheet<TStyles>,
): TStyles => {
  const { theme } = useTheme();
  const factory = stylesheet.__factory;

  return useMemo(() => factory(theme), [factory, theme]);
};
