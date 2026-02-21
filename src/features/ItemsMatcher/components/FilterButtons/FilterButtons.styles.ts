import { createSxStyles } from '@utils'

export const styles = createSxStyles({
  container: {
    display: 'flex',
    gap: 1,
    mb: 2,
    flexWrap: 'wrap',
  },
  filterButton: {
    fontSize: 16,
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#667eea',
    color: '#667eea',
    '&.Mui-selected': { color: 'white', background: '#667eea' },
    '&:hover': { background: '#f8f9ff' },
  },
  filterButtonSelected: {
    fontSize: 16,
    borderWidth: 2,
    borderRadius: 2,
    color: 'white',
    background: '#667eea',
    borderColor: '#667eea',
    '&:hover': { background: '#667eea' },
  },
})