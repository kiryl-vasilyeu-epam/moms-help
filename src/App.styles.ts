import { createSxStyles } from '@utils'

export const styles = createSxStyles({
  root: {
    display: 'flex',
    height: '100vh',
    width: '100%',
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
