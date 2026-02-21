import { createSxStyles, createStyles } from '@utils'

export const styles = createStyles({
  root: {
    display: 'flex',
    height: '100vh',
    width: '100%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
  },
})

export const stylesSx = createSxStyles({
  root: {
    display: 'flex',
    height: '100vh',
    width: '100%',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    fontFamily: `'Segoe UI', Tahoma, Geneva, Verdana, sans-serif`,
  },

  main: {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  },

  hamburgerButton: {
    position: 'fixed',
    top: 16,
    left: 16,
    zIndex: 10,
    bgcolor: 'rgba(0, 0, 0, 0.5)',
    color: 'white',
    '&:hover': {
      bgcolor: 'rgba(0, 0, 0, 0.7)',
    },
  },
})
