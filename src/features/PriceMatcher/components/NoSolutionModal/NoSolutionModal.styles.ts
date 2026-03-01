import { createSxStyles } from '@utils';

export const styles = createSxStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    overflowY: 'auto',
    maxHeight: '60vh',
  },
  title: {
    fontWeight: 'bold',
    fontSize: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  combination: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    background: 'rgb(243, 230, 230)',
    fontSize: '16px',
    padding: '10px',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
  },
  sumValue: {
    fontWeight: 'bold',
  },
  suffix: {
    color: 'rgb(120, 120, 120)',
    fontStyle: 'italic',
  },
});
