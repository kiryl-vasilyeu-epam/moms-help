import { createSxStyles } from '@utils'

export const styles = createSxStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: 1.5,
    mb: 2,
  },
  statPaper: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    p: 2,
    borderRadius: 1,
    textAlign: 'center',
  },
  statLabel: {
    opacity: 0.9,
    display: 'block',
    mb: 0.5,
    fontSize: 13,
    fontWeight: 'bold',
    color: '#e4e4e4',
  },
  statValue: {
    fontWeight: 'bold',
    fontSize: 22,
  },
})