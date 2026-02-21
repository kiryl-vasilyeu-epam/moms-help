import { createSxStyles } from '@utils'

export const styles = createSxStyles({
  modal: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000,
  },
  content: {
    backgroundColor: 'white',
    p: 3,
    borderRadius: 2,
    maxW: 500,
    boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    mb: 2,
  },
  message: {
    mb: 2,
    fontSize: '1rem',
    lineHeight: 1.6,
  },
  button: {
    px: 3,
    py: 1,
    backgroundColor: '#667eea',
    color: 'white',
    border: 'none',
    borderRadius: 1,
    cursor: 'pointer',
    fontWeight: 'bold',
  },
})
