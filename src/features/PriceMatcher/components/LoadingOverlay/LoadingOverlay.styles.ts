import { createSxStyles } from '@utils'

export const styles = createSxStyles({
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2000,
    flexDirection: 'column',
  },
  content: {
    backgroundColor: 'white',
    p: 3,
    borderRadius: 2,
    textAlign: 'center',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
  },
  text: {
    fontSize: '1.2rem',
    mb: 2,
    fontWeight: 'bold',
  },
  progress: {
    fontSize: '0.95rem',
    color: '#666',
  },
})
