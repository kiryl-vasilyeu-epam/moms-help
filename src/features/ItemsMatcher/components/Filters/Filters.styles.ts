import { createStyles } from '@utils';

export const styles = createStyles({
  filterButtons: {
    display: 'flex',
    gap: '10px',
    marginBottom: '20px',
    flexWrap: 'wrap',
    alignItems: 'center',
    opacity: 1,
    transition: 'opacity 0.2s ease',
  },
  loadingIndicator: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    fontSize: '14px',
    color: '#666',
  },
  spinner: {
    display: 'inline-block',
    width: '16px',
    height: '16px',
    border: '2px solid #e0e0e0',
    borderTop: '2px solid #1976d2',
    borderRadius: '50%',
    animation: 'spin 0.8s linear infinite',
    '@keyframes spin': {
      to: { transform: 'rotate(360deg)' },
    },
  },
});
