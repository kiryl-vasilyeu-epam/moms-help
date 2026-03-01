import { createStyles } from '@utils';

export const styles = createStyles({
  container: {
    maxWidth: '600px',
    padding: '20px',
    borderRadius: '8px',
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    gap: '12px',
    background: 'rgb(244, 244, 244)',
    boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.31)',
    alignSelf: 'center',
  },
  newPercent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: '20px',
  },
  input: {
    width: '150px',
  },
});
