import { createTheme } from '@mui/material/styles';
import type { Theme } from './theme';

export const createMuiTheme = (theme: Theme) => {
  return createTheme({
    palette: {
      mode: theme.mode,
      primary: {
        main: theme.colors.primary,
      },
      secondary: {
        main: theme.colors.primaryDark,
      },
      success: {
        main: theme.colors.success,
      },
      warning: {
        main: theme.colors.warning,
      },
      error: {
        main: theme.colors.danger,
      },
      info: {
        main: theme.colors.info,
      },
      background: {
        default: theme.colors.background,
        paper: theme.colors.backgroundAlt,
      },
      text: {
        primary: theme.colors.text,
        secondary: theme.colors.textSecondary,
      },
      divider: theme.colors.border,
    },
    typography: {
      fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
    },
    shape: {
      borderRadius: parseInt(theme.radii.base, 10),
    },
  });
};
