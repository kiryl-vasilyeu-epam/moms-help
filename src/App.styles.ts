import { createStyles } from '@utils'

export const styles = createStyles(({ colors, sizes }) => ({
  root: {
    position: 'relative',
    display: 'flex',
    height: '100vh',
    width: '100%',
    paddingLeft: sizes.sidebarWidth,
    background: colors.gradient,
    fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
  },

  main: {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
  },
}))

export const st = createStyles(({ colors }) => ({
  ham: {
    position: 'absolute',
    background: colors.gradient,
  }
}))