import { createStyles } from '@utils';

export const styles = createStyles({
  container: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    gap: '20px',
    maxWidth: '700px',
  },
  uploadSection: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '20px',
  },
});
