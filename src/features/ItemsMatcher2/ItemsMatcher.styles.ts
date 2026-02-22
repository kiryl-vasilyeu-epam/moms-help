import { createSxStyles } from '@utils'

export const styles = createSxStyles({
  container: {
    p: 4,
    maxWidth: 1200,
    minWidth: 1200,
    mx: 'auto',
    mt: 4,
    background: '#FFF',
    borderRadius: 3,
  },
  title: {
    mb: 3,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  buttonRow: {
    display: 'flex',
    gap: 1,
    mb: 3,
    maxWidth: 1200,
    minWidth: 1200,
    mx: 'auto',
  },
  processButton: {
    color: 'white',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    transition: 'all 0.2s',
    '&:hover:not(:disabled)': { transform: 'scale(1.01)' },
    '&:disabled': { opacity: 0.8 },
  },
  clearButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  resultsSection: {
    maxWidth: 1200,
    minWidth: 1200,
    mx: 'auto',
    mt: 3,
  },
})
