import { createSxStyles } from '@utils';

export const styles = createSxStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    display: 'flex',
    flexDirection: 'row',
    gap: '20px',
  },
  button: {
    width: 300,
  },
});
