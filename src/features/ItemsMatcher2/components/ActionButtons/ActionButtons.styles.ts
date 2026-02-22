import { createSxStyles } from '@utils'

export const styles = createSxStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: 3,
  },
  downloadButton: {
    background: 'linear-gradient(135deg, #27ae60 0%, #229954 100%)',
    '&:hover': { transform: 'scale(1.01)', boxShadow: '0 4px 12px rgba(39, 174, 96, 0.3)' },
    transition: 'all 0.2s',
  },
  transferButton: {
    background: 'linear-gradient(135deg, #3498db 0%, #2980b9 100%)',
    '&:hover': { transform: 'scale(1.01)', boxShadow: '0 4px 12px rgba(52, 152, 219, 0.3)' },
    transition: 'all 0.2s',
  },
})