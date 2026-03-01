import { createStyles } from '@utils';

export const styles = createStyles(({ colors, sizes }) => ({
  root: {
    position: 'relative',
    display: 'flex',
    height: '100vh',
    paddingLeft: sizes.sidebarWidth,
    background: colors.gradient,
    fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
  },

  main: {
    width: '100%',
    display: 'flex',
    flex: 1,
    padding: '20px',
    justifyContent: 'center',
    alignItems: 'flex-start',
    overflowY: 'auto',
  },
}));

export const globalStyles = {
  '*': {
    margin: 0,
    padding: 0,
  },
};
