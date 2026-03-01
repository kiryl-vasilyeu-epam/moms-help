import { createStyles } from '@utils';

export const styles = createStyles({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  loadingTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
  },
  loadingDetails: {
    display: 'block',
    marginTop: '10px',
  },
});
