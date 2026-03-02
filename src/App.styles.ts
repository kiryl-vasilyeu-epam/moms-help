import type { Theme } from '@/styles';

export const getStyles = (theme: Theme) => ({
  root: {
    position: 'relative' as const,
    display: 'flex',
    height: '100vh',
    paddingLeft: theme.sizes.sidebarWidth,
    background: theme.colors.gradient,
  },

  main: {
    width: '100%',
    display: 'flex',
    flex: 1,
    padding: '20px',
    justifyContent: 'center',
    alignItems: 'flex-start',
    overflowY: 'auto' as const,
  },
});

export const globalStyles = {
  '*': {
    margin: 0,
    padding: 0,
    fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif !important`,
  },
};
