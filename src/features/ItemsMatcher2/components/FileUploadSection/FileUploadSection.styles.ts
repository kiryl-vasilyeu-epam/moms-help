import { createSxStyles } from '@utils'

export const styles = createSxStyles({
  container: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 2,
    mb: 3,
  },
  uploadBox: {
    border: '2px dashed #667eea',
    borderRadius: 1,
    p: 2,
    textAlign: 'center',
    background: '#f8f9ff',
    transition: 'all 0.3s',
    '&:hover': {
      background: '#eef1ff',
      borderColor: '#764ba2',
    },
  },
  fileTitle: {
    color: '#667eea',
    mb: 1,
  },
  fileButton: {
    mb: 1,
    px: 3,
    py: 2,
    borderRadius: 2,
  },
  fileName: {
    color: '#666',
    display: 'block',
  },
})