import { createSxStyles } from '@utils'

export const styles = createSxStyles({
  container: {
    maxWidth: 1200,
    minWidth: 1200,
    mx: 'auto',
    mt: 3,
  },
  itemsCountBox: {
    textAlign: 'center',
    mb: 2,
    color: '#667eea',
    fontWeight: 'bold',
  },
  textFieldBox: {
    mt: 3,
    mb: 3,
  },
  buttonRow: {
    display: 'flex',
    gap: 2,
    justifyContent: 'center',
    mb: 3,
  },
  calculateButton: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    px: 3,
    py: 1.2,
    fontSize: '1rem',
    fontWeight: 'bold',
    textTransform: 'none',
    borderRadius: 1,
    border: 'none',
    cursor: 'pointer',
    transition: '0.3s',
    '&:hover': {
      transform: 'scale(1.01)',
      boxShadow: '0 4px 12px rgba(102, 126, 234, 0.4)',
    },
    '&:disabled': {
      opacity: 0.6,
      cursor: 'not-allowed',
      transform: 'none',
    },
  },
})
